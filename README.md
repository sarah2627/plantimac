# IMAC INTELLIGENCE ARTIFICIELLE | Plantimac

## Presentation

**"Plantimac : grow your own plant !"**  
Plantimac is a mini-game integrated in a website. It consists in making your randomly generated plant grow.
* Plantimac uses L-System (artificial intelligence concept)
* The website is in French

>This project is created in the context of studies in [IMAC](https://www.ingenieur-imac.fr/).

###  Links
*https://github.com/sarah2627/plantimac*<br/>
*/*

###  Credits
* **Clara Daigmorte** - (https://github.com/ClawsDevlp)
* **Baptiste Ory** - (https://github.com/BaptisteOry)
* **Sarah Veysset** - (https://github.com/sarah2627)

## Quickstart

- You can clone the repository in your folder.

```bash
git clone https://github.com/sarah2627/plantimac.git
```

- Architecture of repository
````
├── assets (images and sounds)
├── styles (css)
├── utils (functions)
├── webgl
|     ├─ controls
|     ├─ game
|     |     └─ Game.js 
|     ├─ objects
|     |     ├─ environment (sky & sun)
|     |     ├─ plant (with L-System)
|     |     ├─ pot
|     |     ├─ rain
|     |     └─ sound
|     ├─ Webgl.js
|     ├─ index.html
|     └─ index.js
├─ package.json
├─ README.md
└─ .gitignore
````

- Install project
```console
npm i
```
- Launch project in dev mode
Using [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
```console
npm start
```
- Launch project for production
```console
npm run build
```

## Libraries used
* [ThreeJS] (https://threejs.org/) : uses WebGL
