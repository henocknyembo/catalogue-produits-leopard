# Catalogue Produits Leopard

Ce projet est un site statique (HTML/CSS/JS) pour présenter un catalogue de produits et permettre de générer un message WhatsApp avec la sélection.

---

## 🔥 Publication en ligne (accessible depuis n’importe quel téléphone)

### Option 1 — GitHub Pages (recommandé)
1. Crée un compte sur https://github.com (si tu n’en as pas).
2. Crée un nouveau dépôt (repository) et appelle-le par exemple `catalogue-produits-leopard`.

#### Option 1a — (recommandé) utiliser Git depuis l’ordinateur
1. Sur ton machine locale :
   ```bash
   cd /chemin/vers/catalogue-produits-leopard
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<TON_UTILISATEUR>/<NOM_DU_DEPOT>.git
   git push -u origin main
   ```

#### Option 1b — (sans Git) envoyer les fichiers via l’interface web GitHub
1. Dans ton dépôt GitHub, clique sur **Add file** > **Upload files**.
2. Glisse-dépose tous les fichiers et dossiers du projet (HTML, CSS, JS, images).
3. Clique sur **Commit changes**.

---

3. Dans les paramètres du dépôt GitHub > **Pages** (ou **Pages GitHub**), choisis la source :
   - Branche (branch) : `main`
   - Dossier (folder) : `/ (root)`
4. Après quelques secondes, GitHub Pages fournira une URL du type :
   `https://<TON_UTILISATEUR>.github.io/<NOM_DU_DEPOT>/`

✅ Tu pourras partager ce lien à n’importe quel téléphone, et il s’ouvrira dans n’importe quel navigateur.

---

### Option 2 — Netlify (sans GitHub, simple drag & drop)
1. Crée un compte sur https://netlify.com.
2. Clique sur **New site from Git** ou **Deploy manually**.
3. Si tu choisis **Deploy manually**, glisse-dépose le dossier `catalogue-produits-leopard`.
4. Netlify te fournira un lien du type `https://mignon-nom.netlify.app`.

---

## 🧰 Structure du projet

- `index.html` : page d’accueil avec code d’accès
- `catalogue.html` : catalogue et panier
- `services.html`, `contact.html` : pages supplémentaires
- `css/style.css` : styles
- `js/script.js` : logique (acces, panier, WhatsApp)
- `images/` : photos des produits

---

## ✨ Test local (avant publication)

Tu peux toujours tester localement avec Python :

```bash
cd /chemin/vers/catalogue-produits-leopard
python -m http.server 8000
```

Puis ouvrir : http://localhost:8000
