# 📚 DevOps Portfolio Documentation

This repository contains the technical documentation for the **DevOps Portfolio** project, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## 🚀 Features

- Clean, modern documentation UI
- Modular structure for multiple topics (deployment, monitoring, etc.)
- Custom styles and responsive layout
- Written in Markdown, easy to maintain and extend

## 🛠️ Getting Started

1. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2. **Run documentation locally:**
    ```bash
    mkdocs serve
    ```
    Open [http://localhost:8000](http://localhost:8000) in your browser.

3. **Build static site:**
    ```bash
    mkdocs build
    ```
    Output will be in the `site/` directory (not included in version control).

## 🗂️ Structure
```
docs/
├── index.md
├── deployment.md
├── monitoring.md
├── images/
├── stylesheets/extra.css
└── javascripts/extra.js
mkdocs.yml
requirements.txt
.gitignore
README.md
```


## 🌐 Deployment

- Documentation is deployed as a static site via [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/).
- Build and deployment are fully automated using CI/CD.

---

*Made with ❤️ by Maria Vulcu*

