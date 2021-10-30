# MAM

**M**am owns **A**gnostic **M**odules.
This is base **MAM** project.

# Articles

- [MAM: сборка фронтенда без боли](https://habhub.hyoo.ru/#!author=nin-jin/repo=HabHub/article=18)

# Features

* **Agnostic modules.** Module is directory with mixed source files (JS, TS, CSS, JSON, HTML, Tree, images etc).
* **Automatic dependency tracking.** You don't need import/export - simply use namespaced names in accordance to directory structure, like `$mol_http_resource` / `$jin.time.moment` in `*.JAM.JS`/`*.TS` or `--mol_skin_light` / `[mol_page_title]` / `.my-header-avatar` in `*.CSS`.
* **Development server with automatic bundling on request**. Only if you use it then it will have bundled.
* **Build any module as standalone bundle**. You can develope thousand of modules in one project.
* **Cordova project generation**. Simply add `config.xml` to module and `-cordova` dir with cordova project will have generated.

# Cloud usage

[![Gitpod Online Dev Workspace](https://img.shields.io/badge/Gitpod-Online--Dev--Workspace-blue?logo=gitpod)](https://gitpod.io/#https://github.com/hyoo-ru/mam)


# Installation

**Checkout this repo (~2s):**

```sh
git clone https://github.com/hyoo-ru/mam.git ./mam && cd mam
```

## Linux limits

$mol_build and typescript uses inotify by default on Linux to monitor directories for changes. It's not uncommon to encounter a system limit on the number of files you can monitor.

/etc/sysctl.d/20-watch.conf

```
fs.inotify.max_user_watches=524288
fs.file-max=500000
```

# Development server

**Install node modules (~1m)**

```sh
npm install
```

**Build dev server from sources and start that (first ~15s, second ~10s):**

```sh
npm start
```

**Open simple $mol based ToDoMVC application (first ~4s, second ~0.3s):**

```sh
start http://localhost:9080/mol/app/todomvc/
```

**Open $mol demos application (first ~11s, second ~0.5s):**

```sh
start http://localhost:9080/mol/
```

# Manual building

* Execute `npm start mol/app/todomvc` to build ToDoMVC application (~13s).
* Execute `npm start mol` to build $mol demos application (~15s).
* Execute `npm start lib/pdfjs` to build PDFJS library (~1s).

# Custom package

[Video tutorial](https://www.youtube.com/watch?v=PyK3if5sgN0)

1. Create dir for your namespace. `my` in example.
2. Create dir for your module. `my/alert` in example.
3. Create module source file. `my/alert/alert.ts` with content `function $my_alert( msg : string ) { alert( msg ) }` in example.
4. Create dir for your application module. `my/app` in example.
5. Create application source file. `my/app/app.ts` with content `$my_alert( 'Hello, World!' )` in example.
6. Create application web entry point. `my/app/index.html` with content `<script src="-/web.js"></script>` in example.
7. Start development server: `npm start`
8. Open your application. `http://localhost:9080/my/app/-/test.html` in example.

# MAM based projects

- https://github.com/hyoo-ru?q=hyoo.ru
