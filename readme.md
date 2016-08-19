# $mol

Reactive micro-modular ui framework. Very simple, but very powerful.

# Concepts

* Zero configuration. Just checkout and use it. 
* Full [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) in all application layers. Not only between View and ViewModel.
* Lazy rendering/evaluating/loading etc.
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
* [$mol_app_signup](app/signup) - simple form with persistence ([online](http://eigenmethod.github.io/mol/#demo=mol_app_signup))
* [$mol_app_todomvc](app/todomvc) - [ToDoMVC](http://todomvc.com/) realization ([online](http://eigenmethod.github.io/mol/#demo=mol_app_todomvc), [benchmark](https://github.com/nin-jin/todomvc/tree/master/benchmark))
* [$mol_app_users](app/users) - GitHub user "management" tool ([online](http://eigenmethod.github.io/mol/#demo=mol_app_users))

## [Benchmarks](perf)

* [$mol_perf_render](perf/render) - simple benchmark of rendering ([online](http://eigenmethod.github.io/mol/perf/render/))
* [ToDoMVC benchmark](https://github.com/nin-jin/todomvc/tree/master/benchmark)

## Object model

* [$mol_atom](atom) - reactive container
* [$mol_prop](prop) - reactive property decorator
* [$mol_object](object) - components base class
* [$mol_model](model) - reactive model base class
* [$mol_log](log) - logging
* [$mol_const](const) - const value returning function

## Collections

* [$mol_range](range) - lazy array
* [$mol_set](set) - [Set API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [$mol_dict](dict) - [Map API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [$mol_maybe](maybe) - [maybe monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#The_Maybe_monad)

## [State modules](state)

* [$mol_state_arg](state/arg) - arguments state (location/argv)
* [$mol_state_local](state/local) - persistent local state (localStorage)
* [$mol_state_session](state/session) - session temporaty state (sessionStorage)
* [$mol_state_stack](state/stack) - state of current stack of execution

## Communication modules

* [$mol_http_request](http/request) - Reactive HTTP Request
* [$mol_http_resource](http/resource) - Reactive REST HTTP resource

## Simple components

* [$mol_viewer](viewer) - reactive view model base class with lazy error-proof renderer
* [$mol_filler](filler) - lorem ipsum

## Simple controls

* [$mol_linker](linker) - navigation link
* [$mol_clicker](clicker) - button
* [$mol_checker](checker) - check boxe
* [$mol_switcher](switcher) - radio button
* [$mol_stringer](stringer) - one string input control
* [$mol_coder](coder) - bar code scanner

## Layout components

* [$mol_scroller](scroller) - scroll pane with position saving
* [$mol_tiler](tiler) - items in row with balanced wrapping
* [$mol_rower](rower) - items in row with wrapping and padding between
* [$mol_lister](lister) - vertical list of rows
* [$mol_stacker](stacker) - horizontal stack of panels
* [$mol_pager](pager) - page with header, body and footer
* [$mol_labeler](labeler) - labeled content

## Complex components

* [$mol_form](form) - forms with validators
* [$mol_demo](demo) - demonstrates widget in various screens

## Data formats

* [$mol_tree](tree) - [tree format](https://github.com/nin-jin/tree.d)

## Resources

* [$mol_logo](logo) - $mol logotypes
* [$mol_skin](skin) - theming

## Testing

* [$mol_test](test) - unit testing

## Flow

* [$mol_defer](defer) - deferred but immediate execution

## API

* [$mol_cordova](cordova) - [Apache Cordova](https://cordova.apache.org) API

