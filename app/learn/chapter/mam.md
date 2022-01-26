# MAM - Mam owns language-Agnostic Modules

## What is MAM?

MAM is a modular system that uses a new way of working with code and organizing it. Agnostic means that the module is not locked into any concrete language. A module is a directory that contains files in different languages.

MAM is designed to automate the process of working with modules as much as possible and to remove the routine. Agreements are used instead of configurations. The application code is separated from the development environment code. Only used modules will be added to the bundle. A module is created in one action. The versioning system allows you to maintain only one version of a module - the latest. 

## Installation and setup VSCode

1. Clone the repository
```bash
git clone https://github.com/hyoo-ru/mam.git ./mam && cd mam
```

2. Install NPM dependencies
```bash
npm install
```

3. Install VSCode plugins
	- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
	- [vscode-language-tree](https://marketplace.visualstudio.com/items?itemName=nin-jin.vscode-language-tree)

4. You can also use Gitpod
[![Gitpod Online Dev Workspace](https://img.shields.io/badge/Gitpod-Online--Dev--Workspace-blue?logo=gitpod)](https://gitpod.io/#https://github.com/hyoo-ru/mam)

**No need to clone the repository for each project. This is done once!**

## Where is the MAM code located?

This repository depends on the NPM package [mam](https://www.npmjs.com/package/mam). The source of this package is the $mol_build module, located [here](https://github.com/hyoo-ru/mam_mol/tree/master/build). All of the MAM logic is implemented in this module. It was one of the first to be created and has long needed refactoring. A [prototype](https://github.com/hyoo-ru/mam/tree/new-builder/mam) of a new version of the builder has been created, but there are no resources to finalize it. Maybe someone would like to help?

## How to create a module?

1. Think of a name.
2. Create folder and the necessary files in it.

Conventionally, the modules can be divided into three types:
- Namespace.
- Module.
- Submodule.

### Namespace
This is the root folder for your modules. I use the `my` namespace for my small projects and experiments. $mol is used `mol`. If you will be using MAM in your company, you will have a namespace with the company name. If you are developing a library, you will create a namespace with the library name. That is, you just create a folder and give it the name you want.

The complete path will be as follows: `mam/mol`, `mam/my`.

There is a limitation, at this level you cannot create a file `index.html`. You need to create a module inside the namespace, and put it there.

### Module
Just a folder with the source code

### Submodule 
You can create modules to an unlimited depth. In practice, there are rarely more than 3-4 levels, if you have more than that, you may have a wrong way of decomposing your code into modules or a very large project.

Как создать модуль
	Как давать модулям имена(FQN)
	Что такое неймспейс в модульной системе и подмодули
Как использовать модуль в другом модуле
	Что делать если писать полное имя слишком длинно
	Как разруливаются циклические зависимости
	Кроссязыковые зависимости
Как собрать модуль
	Где конфигурация сборки
	Папки с минуса и что игнорится, а что переносится
	Из чего состоит бандл
	Как собирается бандл - уменьшеный размер бандла
	Как деплоить файлы
	Как включать модули в бандл вручную
Как изменить местоположение модуля
Какие типы файлов могут быть
Разделение кода на платформы
	- прочие примеры с разными типами файлов
Как модули версионируются
Как модули документируются
Как использовать npm пакеты на фронтенде
Как использовать npm пакеты на бекенде
Как автоматически пересобирать бекенд
Как выложить модуль в npm
Как настроить деплой на github pages
Использование CamelCase
Использование JavaScript
