// currentFile:yüklenen dosyanın adını global olarak tutmak için değişken tamnımlafık elif
// başlangıçta null yaparız çünkü henüz dosya yüklenmedi
let currentFile = null;

document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

// dosyamızı seçtiğimizde çalışacak asenkron fonksiyon
document.getElementById('imageInput').addEventListener('change', async (e) => {
    const file = e.target.files[0]; // seçilen ilk dosyayı aldık
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            // dosyayı /upload endpoint'ine POST isteğiyle gönderir  !!!!!
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            // sunucudan gelen JSON yanıtını js objesine dönüştürük
            const data = await response.json();
            
            // yükleme başarılıysa yapılacak işlemler:
            if (data.success) {
                // Yüklenen dosyanın adını global değişkende saklıyoruz
                currentFile = data.filename;
                // Yüklenen görseli önizleme alanında gösteriyoruz
                document.getElementById('previewImage').src = `/static/uploads/${data.filename}`;
                // Silme ve tahmin butonlarını aktif hale getiriyoruz
                document.getElementById('deleteBtn').disabled = false;
                document.getElementById('predictBtn').disabled = false;
            }
        } catch (error) {
            console.error('Yükleme hatası:', error);
        }
    }
});

// silme butonuna tıklandığında çalışacak asenkron fonksiyon:
document.getElementById('deleteBtn').addEventListener('click', async () => {
    // eğer yüklenmiş bir dosya varsa silme işlemini başlatıyoruz
    if (currentFile) {
        try {
            // Sunucuya dosya silme isteği gönderiyoruz
            const response = await fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // silinecek dosyanın adını JSON olarak gönderiyoruz
                body: JSON.stringify({ filename: currentFile })
            });
            // Sunucudan gelen yanıtı js obj dönüştüryoruz
            const data = await response.json();
            
            // Silme işlemi başarılıysa yapılacak temizlik işlemleri:
            if (data.success) {
                // Önizleme görselini temizliyoruz
                document.getElementById('previewImage').src = '';
                // Butonları devre dışı bırakıyoruz
                document.getElementById('deleteBtn').disabled = true;
                document.getElementById('predictBtn').disabled = true;
                // Tahmin sonucunu temizliyoruz
                document.getElementById('predictionResult').value = '';
                // Global dosya değişkenini sıfırlıyoruz
                currentFile = null;
            }
        } catch (error) {
            console.error('Silme hatası:', error);
        }
    }
});

// Tahmin butonuna tıklandığında çalışacak asenkron fonksiyon:
document.getElementById('predictBtn').addEventListener('click', async () => {
    // Eğer yüklenmiş bir dosya varsa tahmin işlemini başlatıyoruz
    if (currentFile) {
        try {
            // Sunucuya tahmin isteği gönderiyoruz
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Tahmin yapılacak dosyanın adını JSON olarak gönderiyoruz
                body: JSON.stringify({ filename: currentFile })
            });
            // Sunucudan gelen tahmin sonucunu js obj dönüştürürüz
            const data = await response.json();
            // Tahmin sonucunu textarea'ya yazdırıyoruz
            document.getElementById('predictionResult').value = data.prediction;
        } catch (error) {
            console.error('Tahmin hatası:', error);
        }
    }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('cancerTypeModal');
    const cancerTypeButtons = document.querySelectorAll('.cancer-type-btn');
    let selectedCancerType = null;

    // Store the selected cancer type
    cancerTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedCancerType = this.getAttribute('data-type');
            modal.style.display = 'none';
            // Store the selected type in localStorage
            localStorage.setItem('selectedCancerType', selectedCancerType);
        });
    });

    // Always show modal on page load
    modal.style.display = 'block';
});

// Language translation dictionaries
const translations = {
    en: {
        selectCancerType: 'Select Cancer Type',
        selectCancerTypeDesc: 'Please select the type of cancer you want to analyze:',
        brain: 'Brain',
        breast: 'Breast',
        cervical: 'Cervical',
        kidney: 'Kidney',
        lungandcolon: 'Lung and Colon',
        lymph: 'Lymph',
        oral: 'Oral',
        uploadFile: 'Upload File',
        deleteFile: 'Delete File',
        predict: 'Predict',
        imagePreview: 'Image Preview',
        predictionPlaceholder: 'Prediction result will be displayed here...',
        selectModel: 'Select Model:',
        language: 'Language:'
    },
    tr: {
        selectCancerType: 'Kanser Türü Seçin',
        selectCancerTypeDesc: 'Lütfen analiz etmek istediğiniz kanser türünü seçin:',
        brain: 'Beyin',
        breast: 'Meme',
        cervical: 'Servikal',
        kidney: 'Böbrek',
        lungandcolon: 'Akciğer ve Kolon',
        lymph: 'Lenf',
        oral: 'Ağız',
        uploadFile: 'Dosya Yükle',
        deleteFile: 'Dosyayı Sil',
        predict: 'Tahmin Et',
        imagePreview: 'Görsel Önizleme',
        predictionPlaceholder: 'Tahmin sonucu burada görüntülenecek...',
        selectModel: 'Model Seç:',
        language: 'Dil:'
    }
};

function updateLanguageTexts(lang) {
    // Modal
    document.querySelector('#cancerTypeModal h2').textContent = translations[lang].selectCancerType;
    document.querySelector('#cancerTypeModal p').textContent = translations[lang].selectCancerTypeDesc;
    const cancerBtns = document.querySelectorAll('.cancer-type-btn');
    const cancerTypes = ['brain', 'breast', 'cervical', 'kidney', 'lungandcolon', 'lymph', 'oral'];
    cancerBtns.forEach((btn, i) => {
        // Sadece ikon varsa, metni güncelle
        const icon = btn.querySelector('i, img');
        btn.innerHTML = '';
        if (icon) btn.appendChild(icon);
        btn.innerHTML += ' ' + translations[lang][cancerTypes[i]];
    });
    // Modal başlık ve açıklama
    document.querySelector('#cancerTypeModal h2').textContent = translations[lang].selectCancerType;
    document.querySelector('#cancerTypeModal p').textContent = translations[lang].selectCancerTypeDesc;

    // Upload section buttons
    document.getElementById('uploadBtn').textContent = translations[lang].uploadFile;
    document.getElementById('deleteBtn').textContent = translations[lang].deleteFile;
    document.getElementById('predictBtn').textContent = translations[lang].predict;

    // Image preview placeholder
    document.querySelector('.placeholder-text').textContent = translations[lang].imagePreview;

    // Result textarea placeholder
    document.getElementById('predictionResult').placeholder = translations[lang].predictionPlaceholder;

    // Model select label
    document.querySelector('label[for="modelSelect"]').textContent = translations[lang].selectModel;

    // Language select label
    document.querySelector('label[for="languageSelect"]').textContent = translations[lang].language;
}

// Language select functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    let lang = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = lang;
    updateLanguageTexts(lang);
    languageSelect.addEventListener('change', function() {
        lang = this.value;
        localStorage.setItem('selectedLanguage', lang);
        updateLanguageTexts(lang);
    });
}); 