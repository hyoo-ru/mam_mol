# $mol

Reactive micro-modular ui framework. Very simple, but very powerful.

# Concepts

* Zero configuration. Just checkout and use it. 
* Full [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) in all application layers. Not only between View and ViewModel.
* Automatic dependency tracking between reactive containers. No need to manual (un)subscribe and streams routing.
* Cycle dependency detection.
* Effective state synchronization in right way. 
* Automatic include modules in package at compile time. No need to manual import them. Just use it.
* Very small modules. All of them are optional.
* Cross platform. Support any environment (NodeJS, WEB).
* Static typing ([TypeScript](https://www.typescriptlang.org/)). Full IDE support.
* Full customization. No realization hiding. All aspects are overridable.
* Lifecycle management. Automatic destroy of components.
* Easy debugging. No exception catching. User readable id's of all objects. Quick access to all objects from console.
* Easy user friendly logging of all state changes.
* Pseudosynchronous code. Asynchrony is abstracted by reactivity. No callbacks/promises/streams hell. No async/awiat/yield virus.
* Automatic [BEM](https://en.bem.info/methodology/naming-convention/)-attributes generation for elements.
* Hot code change. Transparently to user.

# $mol modules

## [Demo applications](demo)

* [$mol_app_demo](app/demo) - demonstrates all components ([online](http://eigenmethod.github.io/mol/))
* [$mol_app_signup](app/signup) - typical form

## [Benchmarks](perf)

* [$mol_perf_render](perf/render) - simple benchmark of rendering

## Core modules

* [$mol_atom](atom) - reactive containers
* [$mol_prop](prop) - reactive property decorator
* [$mol_object](object) - components base class
* [$mol_model](model) - reactive model base class
* [$mol_log](log) - logging
* [$mol_test](test) - unit testing
* [$mol_skin](skin) - theming
* [$mol_range](range) - lazy array

## [State modules](state)

* [$mol_state_arg](state/arg) - arguments state (location/argv)
* [$mol_state_local](state/local) - persistent local state (localStorage)
* [$mol_state_session](state/session) - session temporaty state (sessionStorage)

## Communication modules
* [$mol_http_request](http/request) - Reactive HTTP Request
* [$mol_http_resource](http/resource) - Reactive REST HTTP resource

## Simple components

* [$mol_viewer](viewer) - reactive view model base class
* [$mol_filler](filler) - lorem ipsum

## Simple controls

* [$mol_linker](linker) - navigation links
* [$mol_clicker](clicker) - buttons
* [$mol_checker](checker) - check boxes
* [$mol_switcher](switcher) - radio buttons
* [$mol_stringer](stringer) - one string input control

## Layout components

* [$mol_scroller](scroller) - scroll pane with position saving
* [$mol_tiler](tiler) - items in row with wrapping
* [$mol_rower](rower) - items in row with wrapping and padding between
* [$mol_lister](lister) - vertical list of rows with lazy rendering support
* [$mol_stacker](stacker) - horizontal stack of panels

## Complex components

* [$mol_form](form) - forms with validators

## Data formats

* [$mol_tree](tree) - [tree format](https://github.com/nin-jin/tree.d)

## Shims

* [$mol_set](set) - [Set API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [$mol_dict](dict) - [Map API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
