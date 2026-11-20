# Portfolio Personnel — Projet Monopage (Séances 5 & 6)

Portfolio monopage responsive conçu avec **HTML5**, **Tailwind CSS** et **jQuery**, prêt pour le déploiement sur **GitHub Pages**.

## Contenu
- [index.html](index.html) : Page unique sémantique (`header`, `#accueil`, `#projets`, `#cv`, `#contact`, modale de détails, `footer`).
- [js/app.js](js/app.js) : Interactions jQuery :
  - Menu burger responsive sur mobile
  - Filtrage dynamique des projets par catégorie (`data-categorie`) avec compteur
  - Modale de détail par projet (fermeture au clic extérieur ou `Échap`)
  - Surlignage du lien actif au scroll + bouton « Retour en haut »
  - Copie de l'e-mail en un clic et validation du formulaire de contact
- `assets/avatar.svg` : Portrait SVG avec attribut `alt`.
- `assets/cv-karim.pdf` : CV téléchargeable au format PDF.

## Personnalisation rapide avant soutenance
Remplacer dans `index.html` :
1. `karim@exemple.com` par ton adresse e-mail réelle.
2. Les liens `https://github.com/` et `https://www.linkedin.com/` par tes profils exacts.
3. Optionnel : remplacer `assets/avatar.svg` par ta photo (`assets/photo.jpg`).

## Déploiement GitHub Pages
```bash
git init -b main
git add .
git commit -m "Première version du portfolio"
git remote add origin https://github.com/<utilisateur>/<utilisateur>.github.io.git
git push -u origin main
```
Puis activer **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
