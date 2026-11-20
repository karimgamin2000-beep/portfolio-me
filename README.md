# KAK — Portfolio de KONATE ABDOUL KARIM

Portfolio personnel minimaliste et responsive présentant mon parcours en **Computer Science & Intelligence Artificielle** (Licence 2 à l'IIT, Côte d'Ivoire), mes réalisations techniques et mon CV interactif.

**Site en ligne :** https://karimgamin2000-beep.github.io/portfolio-me/

---

## Aperçu

- **Design minimaliste & adaptatif** : thème sombre par défaut avec bascule **clair / sombre** persistée (`localStorage`), lisible dès `360 px` jusqu'aux écrans larges.
- **Typographie éditoriale** : `Newsreader` (italique), `IBM Plex Sans` et `JetBrains Mono`.
- **Interactions jQuery** : menu mobile, filtrage dynamique des projets par catégorie avec compteur en direct, modale de détails accessible (`Échap` / clic extérieur), surlignage actif au défilement et copie rapide de l'adresse e-mail.
- **CV dédié & téléchargement PDF direct** : page CV A4 à deux colonnes (`cv.html`) + téléchargement instantané du fichier `CV-KONATE-ABDOUL-KARIM.pdf`.
- **Formulaire de contact fonctionnel** : envoi direct des messages vers `karimgamin2000@gmail.com` via FormSubmit (avec solution de repli `mailto:`).

---

## Projets présentés

| Projet | Description | Stack | Lien |
| --- | --- | --- | --- |
| **Web-Linux** | OS Linux dans le navigateur (bureau Ubuntu, 7 apps, terminal `lwsh`, VFS persistant) | HTML5, CSS3, Vanilla JS | [Démo live](https://linux-web-app.vercel.app) |
| **BiblioIIT** | Application console modulaire de gestion de bibliothèque avec détection des retards | Python 3, SQLite, `unittest` | [GitHub](https://github.com/karimgamin2000-beep/biblio-iit) |
| **SondagesIIT** | Site public de sondages et de votes avec interface d'administration | Python, Django 6.1, SQLite | [GitHub](https://github.com/karimgamin2000-beep) |
| **Portfolio Monopage** | Ce site vitrine minimaliste avec CV PDF et formulaire de contact | HTML5, Tailwind CSS, jQuery | [Site](https://karimgamin2000-beep.github.io/portfolio-me/) |

---

## Architecture du dépôt

```text
portfolio-me/
├── index.html             # Page principale (Hero, Projets, Parcours, Contact)
├── cv.html                # Page CV A4 deux colonnes
├── js/
│   ├── app.js             # Interactions jQuery, thème clair/sombre, envoi e-mail
│   └── cv-download.js     # Téléchargement direct du CV PDF
├── assets/
│   ├── karim-pro.jpg      # Portrait professionnel
│   ├── favicon.png        # Favicon circulaire
│   └── cv-karim.pdf       # CV au format A4 PDF
└── README.md
```

---

## Lancer en local

Aucune étape de build n'est requise :

```bash
git clone https://github.com/karimgamin2000-beep/portfolio-me.git
cd portfolio-me
```

Ouvrir `index.html` dans un navigateur ou démarrer un serveur local :

```bash
python -m http.server 8000
```

---

## Contact

- **E-mail** : karimgamin2000@gmail.com
- **GitHub** : [github.com/karimgamin2000-beep](https://github.com/karimgamin2000-beep)
- **LinkedIn** : [in/abdoul-karim-konate-15635b3b0](https://www.linkedin.com/in/abdoul-karim-konate-15635b3b0)
- **X** : [@Karimpromax1](https://x.com/Karimpromax1)
