# Rationale

## Zero configuration
Instead of ensuring configurability by any means, $mol concentrates on everything working good directly out of the box and does not bother $mol's developer by a typical configuration process. (Nevertheless, this doesn't exclude setup for your needs if required)

For example if you download **[base MAM-project](http://github.com/hyoo-ru/mam)** you'll get this:

**Building of JS and CSS bundles for different platforms.** A bundle can be built for any module. This bundle would contain sources of that module and sources of all other modules on which that module depends on. There also would not be any redundant modules in the bundle.  

Here is a full set of supported bundles:

- `-/web.js` - JS for browser
- `-/web.d.ts` - TypeScript definitions
- `-/web.test.js` - JS with tests for a browser
- `-/web.deps.json` - map of dependencies modules for browser
- `-/web.locale=en.json` - strings pulled from ```*.view.tree``` and ```*.locale=en.json``` sources
- `-/node.js` - JS for NodeJS
- `-/node.test.js` - JS with tests for NodeJS
- `-/node.deps.json` - a map of dependencies modules for NodeJS

**Support of Source Maps**. Sources are compiled and integrate to maps, they are fully self-sufficient.

**Development server**, which compiles bundles as needed. For example, when `http://localhost:9080/hyoo/todomvc/-/web.js` is requested, the `js` bundle is built from `hyoo/todomvc` for `web` environment. Rebuilding occurs only if any source files are changed.

**Transpilling of modern CSS into CSS supported by browsers** ([postcss-cssnext](https://github.com/MoOx/postcss-cssnext)): vendor prefixes and variables etc.

**Transpilling [TypeScript](https://github.com/Microsoft/TypeScript) into JS**. 
In TS configuration enabled support decorators and disabled implicit `any` type, to prevent missing typing by change.

**Watching dependencies by fact of using** and automatic inclusion of the needed modules on further bundling. You don't need to write `include` and `require`. All you need is to refer instance by full name like `$mol_state_arg` and `$mol.state.arg` (depending on its definition) in `*.ts`, `*.view.ts`, `*.view.tree` and `*.jam.js` files. Dependencies in CSS files are looked for by entries like `[mol_check_checked]` , `[mol_check_checked=` and `.mol_check_checked`.

## Lego components

$mol uses the component approach to building interfaces, however **every component is self-sufficient** and can be used as a self-sufficient application. Small components are aggregated inside larger components etc.

Unlike another frameworks, $mol does not isolate the internals of its components. Vice versa, a comfortable mechanism is provided for developers to configure them, the creator of the component doesn't have to do any additional actions.

For example, to set the list of sub components you need to redefine `sub` property in view.tree

```tree
Confirm_delte $mol_row sub /
	<= Yes $mol_button_minor title \Yes
	<= No $mol_button_major title \No
```

Or the same code in TypeScript would be:

```typescript
@ $mol_mem
Confirm_delete() {
	return $mol_row.make({
		sub : ()=> [ this.Yes() , this.No() ] ,
	})
}
```

In both variants the compiler would verify the existence of the property and correspondence of the signature. Normally you don't need to work with fields of the object directly, all definable properties 
are public and can be safely overloaded.

Details about viewers and `view.tree` language: [$mol_view](view).

## Lazyness

[$mol_view](view) implements lazy rendering. [$mol_scroll](scroll) watches scroll position and suggests the view height to embedded components. [$mol_list](list) knows the view height and minimal sizes of the embedded components, it excludes components definitely outside viewport from rendering. And all other components report their minimal size through `minimal_height` property.

```
$my_icon $mol_view
	minimal_height 16
```

As the result opening of any window occurs instantly. It's independent from output data size. And since data would not be rendered, any requests would not be proceeded. This allows us to download them partly, when they are needed. Such a feature is possible due to reactive architecture, that penetrates through all layers of the application.

## Reactivity

Unlike control-flow architectures, $mol implements the data-flow architecture. All applications are defined as a set of classes having properties. Every property is defined as some function from another property (and properties of another classes too). Properties, which were called while processing a function are saved as dependencies of current property. When their values change, all dependent properties would be invalidated cascading. Calling a non relevant property would lead to its pre-actualization.

In this way the whole application at the execution stage represents a huge tree of dependencies, with a special property at the root of the tree, which in case of invalidation would actualize itself automatically. And as any property always knows, whether something depends on it or not, then it is given a simple and reliable mechanism of controlling lifecycle of objects - they are created when dependence appears and are destroyed when nothing depends on them. This solves two fundamental problems: resources leaks and cache invalidation. 

Besides, the reactive architecture allows us to abstract code elegantly from asynchronous operations. If the function can't return value at the moment, it can throw `Promise` and is marked as part of the tree as "waiting of results". When result is retrieved, it can be inserted into property directly and an application would be reconstructed for the new state.

```typescript
namespace $ {
	export class $my_greeter {
		
		@ $mol_mem
		greeting() : string {
			const user_name = $mol_fetch.json( 'https://example.org/profile/name' ) as string
			return `Hello, ${ user_name }!`
		}
		
	}
}
```

Details: [$mol_mem](mem), [$mol_atom2](atom2).

## Debugging

$mol pays special attention to debugging possibilities and research of how its code works.

A human friendly `id` is automatically formed for every DOM-element, e.g. `$hyoo_todomvc.root(0).taskRow(0).titler()`, which is a valid javascript code, that could be executed in a console, returning a link to the component, which the DOM-element corresponds to. Unfolding the content of the component you'd see names and values for its fields like:

```
$hyoo_todomvc
    dom_node() : div#$hyoo_todomvc.root(0)
    task(1474385802391) : Object
    task(1474386443175) : Object
    taskRow(0) : $hyoo_todomvc_task_rowRow
    taskRow(1) : $hyoo_todomvc_task_rowRow
    taskrows() : Array[2]
```

The name of the field corresponds to calling the property, the content of the field would be available through. And thanks to naming classes and functions by underscoring, you always know which class instance you're looking at and can briefly find it in the code by searching the substring.
