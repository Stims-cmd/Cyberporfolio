# Portfolio — Bureau Virtuel

V1 fonctionnelle d'un portfolio sous forme de faux bureau / mini OS, 100% statique.

## ⚠️ Important pour tester en local

Ce projet charge des fichiers JSON via `fetch()`. Cela **ne fonctionne pas** en ouvrant
directement `index.html` depuis l'explorateur de fichiers (`file://...`) à cause des
restrictions CORS des navigateurs. Il faut un petit serveur local :

```bash
# Avec Python (déjà installé sur la plupart des systèmes)
cd portfolio
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Ou avec l'extension VS Code "Live Server".

## Déploiement sur GitHub Pages

1. Crée un repository GitHub (public).
2. Pousse tout le contenu de ce dossier `portfolio/` à la racine du repo.
3. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/ (root)`.
4. Ton site sera disponible sur `https://ton-pseudo.github.io/nom-du-repo/`.

Tous les chemins du projet sont relatifs (`./data/...`, `./css/...`) donc ça fonctionne
aussi bien à la racine d'un domaine qu'avec un sous-chemin de repo.

## Ce qu'il te reste à personnaliser

| Fichier | Contenu à remplacer |
|---|---|
| `index.html` | Titre, meta description, `[TON NOM]` |
| `data/projects.json` | Tes vrais projets |
| `data/skills.json` | Tes vraies compétences et niveaux |
| `data/journey.json` | Ton vrai parcours |
| `data/lab.json` | Tes expérimentations |
| `data/motorsport.json` | Tes événements rallye/motorsport |
| `js/apps/about.js` | Ta présentation |
| `js/apps/contact.js` | Tes vrais liens (email, LinkedIn...) |
| `js/apps/github.js` | Ton pseudo GitHub |
| `assets/cv/cv.pdf` | Ton CV (fichier à ajouter) |

## Fonctionnalités déjà en place

- Bureau avec icônes, système de fenêtres complet (ouvrir/fermer/minimiser/
  maximiser/déplacer/redimensionner/z-index/focus)
- Barre des tâches avec horloge, menu Start, restauration des fenêtres minimisées
- Projects : fiches détaillées reliées aux compétences
- Skills : diagrammes radar (Canvas natif, sans dépendance) cliquables, reliés aux projets
- Journey : timeline interactive
- LAB, Garage/Motorsport, CV, About, GitHub, Contact : fenêtres fonctionnelles
- Responsive (bureau adapté sur mobile, fenêtres plein écran, pas de drag tactile)
- Accessibilité : vrais boutons, `aria-label`, navigation clavier (Échap ferme une
  fenêtre), `prefers-reduced-motion` respecté, fallback `<noscript>`
- Deux easter eggs de démonstration (corbeille + raccourci clavier `Ctrl/Cmd+Alt+P`)

## Pour aller plus loin

- Ajouter de vraies images dans `assets/images/` et les référencer dans les JSON
- Étoffer le LAB avec de vraies mini-expériences interactives (Canvas/SVG/WebGL)
- Ajouter une galerie photo pour le Garage
- Automatiser la liste de repos GitHub via l'API si tu veux (structure déjà prévue
  dans `js/apps/github.js`)
