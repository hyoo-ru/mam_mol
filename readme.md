# $mol

Reactive micro-modular ui framework. Very simple, but very powerful.

# Concepts

* Full [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) in all application layers. Not only between View and ViewModel.
* Automatic dependency tracking between reactive containers. No need to manual (un)subscribe and streams routing.
* Cycle dependency detection.
* Effective state synchronization in right way. 
* Automatic modules import at compile time. No need to import them. Just use it.
* Very small modules. All of them are optional.
* Cross platform. Support any environment (NodeJS, WEB).
* Static typing ([TypeScript](https://www.typescriptlang.org/)). Full IDE support.
* Full customization. No realization hiding. All aspects are overridable.
* Lifecycle management. Automatic destroy of components.
* Easy debugging. No exception catching. User readable id's of all objects. Quick access to objects from console.
* Easy user friendly logging of all state changes.
* Pseudosynchronous code. Asynchrony abstracted by reactivity. No callback/promises/streams hell. No async/awiat virus.
* Automatic [BEM](https://en.bem.info/methodology/key-concepts/)-attributes generation for elements.
* Hot code change. Transparently to user.

# $mol modules

## [Demo applications](demo)

* [$mol_demo_all](demo/all) - demonstrates all components ([online](http://eigenmethod.github.io/mol/))
* [$mol_demo_form](demo/form) - typical form

## Benchmarks

* [$mol_perf](perf) - simple benchmark of rendering

## Core modules

* [$mol_atom](atom) - reactive containers
* [$mol_prop](prop) - reactive property decorator
* [$mol_object](object) - components base class
* [$mol_model](model) - reactive model base class
* [$mol_view](view) - reactive view model base class
* [$mol_log](log) - logging
* [$mol_test](test) - unit testing

## [State modules](state)

* [$mol_state_arg](state/arg) - arguments state (location/argv)
* [$mol_state_local](state/local) - persistent local state (localStorage)
* [$mol_state_session](state/session) - session temporaty state (sessionStorage)

## Simple controls

* [$mol_button](button) - buttons
* [$mol_stringer](stringer) - one string input control

## Layout components

* [$mol_gallery](gallery) - items in row with wrapping
* [$mol_toolbar](toolbar) - items in row with wrapping and padding between

## Data formats

* [$mol_tree](tree) - [tree format](https://github.com/nin-jin/tree.d)
