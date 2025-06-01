#gerekli kütüphaneler:
from flask import Flask, render_template, request, jsonify  #flask için pyhton frameworkü
import os #dosya yönetimi için uploads falan tüm dosya işlemleri için
from werkzeug.utils import secure_filename  # Güvenli dosya adı oluşturmak için

app = Flask(__name__) #flask uygulaması oluşturduk.

# Dosya yükleme ayarları için
UPLOAD_FOLDER = 'static/uploads' #dosyaların yükleneceği klasörü oluşturduk
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'} #izin verilen dosya uzantıları

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER # upload klasörünü yolunu flask uygulamasının ayarlarına kaydeder

# Dosya uzantısı kontrolü yapan yardımcı fonksiyon
def allowed_file(filename):
        # Dosya adında nokta var mı ve uzantısı izin verilenler listesinde mi onu kontrol ediyo
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ana sayfa rotası
@app.route('/')
def index():
    # index.html sayfasını kullanıcıya gösteren burası elif
    return render_template('index.html')

# Dosya yükleme rotası sadece POST isteklerini kabul edr (güvenlik açısından iyi)
@app.route('/upload', methods=['POST'])   
def upload_file():
    # Gelen istekte 'file' anahtarı var mı kontrolü yaprz
    if 'file' not in request.files:             
        return jsonify({'error': 'Dosya seçilmedi'}), 400           
    
    # Dosyayı request'ten alıyoruz
    file = request.files['file']
    # Dosya adı boş mu kontrol ediyoruz
    if file.filename == '':
        return jsonify({'error': 'Dosya seçilmedi'}), 400
    
    # Dosya var ve uzantısı uygunsa işlemleri yaparız
    if file and allowed_file(file.filename):
        #  dosya adı oluşturuyoruz
        filename = secure_filename(file.filename)
        # Dosyanın tam yolunu oluşturuyoruz
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # Dosyayı kaydediyoruz
        file.save(filepath)
        # Başarılı yanıtı döndürüyoruz
        return jsonify({'success': True, 'filename': filename})

# Tahmin rotası (sadece POST istekleri kabul eder) 
@app.route('/predict', methods=['POST'])
def predict():
    #  görsel tahmin işlemlerinizi burada bakarızz
    # örnek bir yanıt döndürüyoruz ama şuanlık
    return jsonify({'prediction': 'Örnek tahmin sonucu'})

# Dosya silme rotası (sadece POST istekleri kabul eder)
@app.route('/delete', methods=['POST'])
def delete_file():
    # İstekten dosya adını alır
    filename = request.json.get('filename')
    if filename:
        # Dosyanın tam yolunu oluşturu
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # Dosya varsa sil
        if os.path.exists(filepath):
            os.remove(filepath)
            return jsonify({'success': True})
    return jsonify({'error': 'Dosya silinemedi'}), 400  #silme başarısız olursa hata döndğrğr

#dosya doğru çalışırsa otomatik çalılır 
if __name__ == '__main__':
    # Uploads klasörünü oluşturur (yoksa)
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    # Debug modunda uygulamayı çalıştırıyoruz
    app.run(debug=True) 