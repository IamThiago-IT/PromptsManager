# 🚀 PromptsManager

Gérez vos prompts comme des actifs, pas comme du texte dispersé.

**PromptsManager** est une application pour organiser, catégoriser et réutiliser les prompts utilisés avec l'IA.
Si vous travaillez avec ChatGPT, Copilot ou tout modèle génératif, vous savez que les bons prompts s'accumulent — et se perdent.

Ce projet résout ce problème.

---

## 🧠 Le Problème

Les utilisateurs professionnels de l'IA :

* Disperse les prompts dans Notion, bloc-notes, README et historique de chat
* Perd du temps à recréer des prompts qui fonctionnaient déjà
* N'a pas de contrôle de version
* Ne peut pas structurer les connaissances accumulées

Un bon prompt ne devrait pas dépendre de la mémoire.

---

## 🎯 La Solution

PromptsManager centralise vos prompts en un seul endroit, permettant de :

* 📂 Créer et enregistrer des prompts
* 🏷️ Organiser par catégories et tags
* 🔎 Rechercher rapidement
* ♻️ Réutiliser facilement
* 🧩 Structurer votre stratégie d'IA

L'idée est simple : traiter les prompts comme du code réutilisable.

---

## 🏗️ Structure du Projet

```
/src
  /components      # Sidebar, PromptEditor, PromptList, MarkdownPreview, etc.
  /services        # storage.ts (localStorage + Electron IPC)
  /hooks           # useToast.ts
  /types           # Prompt.ts
  App.tsx          # Composant principal
```

---

## ✨ Fonctionnalités

- **CRUD complet** - Créer, modifier et supprimer des prompts
- **Catégories et Tags** - Organisez vos prompts avec plusieurs tags
- **Favoris** - Marquez vos prompts préférés
- **Recherche et Filtres** - Filtrez par catégorie, tag ou texte
- **Tri** - Par date (récent/ancien), titre (A-Z/Z-A) ou favoris
- **Sauvegarde automatique** - Sauvegarde après 2 secondes d'inactivité
- **Annuler/Rétablir** - Historique d'édition dans l'éditeur (Ctrl+Z / Ctrl+Y)
- **Aperçu Markdown** - Visualiser le contenu formaté
- **Variables de Template** - Support de `{{variable}}` avec surlignage
- **Importer/Exporter** - JSON et Markdown
- **Sauvegarde** - Exporter toutes les données
- **Interface responsive** - Fonctionne sur desktop et web
- **Mode Desktop** - Version Electron pour desktop

---

## 🚀 Installation

Clonez le dépôt :

```bash
git clone https://github.com/IamThiago-IT/PromptsManager.git
```

Entrez dans le dossier du projet :

```bash
cd PromptsManager
```

Installez les dépendances :

```bash
npm install
```

Exécutez le projet :

```bash
npm run dev
```

### Scripts Disponibles

| Script | Description |
|--------|-----------|
| `npm run dev` | Démarrer le développement |
| `npm run dev:web` | Mode web uniquement |
| `npm run dev:desktop` | Mode desktop (Electron) |
| `npm run build:web` | Build pour le web |
| `npm run build:desktop` | Build desktop (Electron) |
| `npm run lint` | Vérifier le code |

---

## 📌 Roadmap

- [x] Système de catégories
- [x] Système de tags
- [x] Recherche et filtres
- [x] Tri (date, titre, favoris)
- [x] Export et import (JSON/Markdown)
- [x] Sauvegarde automatique
- [ ] Versionnage des prompts
- [ ] Sauvegarde automatique cloud
- [ ] Partage public
- [ ] Intégration API IA

---

## 🧩 Cas d'Usage

* Développeur organisant des prompts techniques
* Créateur sauvegardant des modèles de contenu
* Étudiant structurant des prompts éducatifs
* Professionnel automatisant les tâches avec l'IA

---

## 🤝 Contribution

Pour améliorer :

1. Forkez le projet
2. Créez une branche (`feature/nom-de-feature`)
3. Committez vos changements
4. Ouvrez une Pull Request

Les issues sont les bienvenues.

---

## 📄 Licence

MIT License

---

## 🔥 Pourquoi ça compte ?

L'IA est un multiplicateur de productivité.
Mais la productivité sans organisation devient du travail supplémentaire.

Si vous utilisez l'IA tous les jours et que vous enregistrez encore vos prompts dans un bloc-notes, vous fonctionnez en dessous de votre potentiel.

Les prompts sont des actifs.
Gérez-les comme tels.