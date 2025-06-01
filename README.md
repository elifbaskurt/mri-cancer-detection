
# 🧠 MRI Cancer Detection (Frontend Prototype)

This project is a simple Flask-based web interface that allows users to upload MRI images and select the type of cancer they want to analyze. It is currently a **frontend prototype**, and no AI or machine learning model is integrated yet.

---

## 📌 Features

- 📁 Upload MRI images through the interface
- 🧬 Select from 8 different cancer types:
  - Brain, Breast, Cervical, Kidney, Lung and Colon, Lymph, Oral
- 🌐 Language selection support (English & Turkish)
- 🖥️ Clean and responsive interface with HTML/CSS
- ⚙️ Flask-based backend prepared for future AI integration

---


## 🚀 Installation Instructions

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/elifbaskurt/mri-cancer-detection.git
cd mri-cancer-detection
````

### 2. Create and activate a virtual environment (optional)

```bash
python -m venv venv
source venv/bin/activate      # For macOS/Linux
venv\Scripts\activate         # For Windows
```

### 3. Install Flask

```bash
pip install Flask
```

### 4. Run the app

```bash
python app.py
```

Now open your browser and go to `http://127.0.0.1:5000`.

---

## 📁 Project Structure

```
mri-cancer-detection/
├── static/
│   ├── uploads/
│   └── style.css
├── templates/
│   └── index.html
├── app.py
```

---

## 🔧 Future Enhancements (TODO)

* [ ] Integrate machine learning model for prediction
* [ ] Display uploaded MRI images
* [ ] Show prediction results
* [ ] Add validation for uploaded file formats (e.g., .jpg, .png)

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to suggest changes or enhancements, feel free to open an issue or fork the repository and submit a PR.

---

## 📬 Contact

Project maintained by [@elifbaskurt](https://github.com/elifbaskurt)
For questions or suggestions, feel free to reach out via GitHub.

---

© 2025 Elif Başkurt – All rights reserved.

```

