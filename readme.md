# $mol

Reactive micro-modular ui framework. Very simple, but very powerful!

# Contents

- [Levels](#levels)
- [Features](#features)
- [Applications](https://showcase.hyoo.ru/)
- [Benchmarks](#benchmarks)
- [Articles](#articles)
- [Discussions](https://teleg.run/mam_mol)
- [Quick start](#quick-start)
- [Tutorials](#tutorials)
- [Rationale](#rationale)
- [Modules](#modules)
- [Contributors](#contributors)
- [Cool stuff](#cool-stuff)
- [Donate](#donate)

# Levels

1. **Library.** $mol is just set of small libs. Honor libs: jQuery, React, Redux, MobX.
2. **Low level framework.** $mol very flexible, but simple. Honor low fw: Angular, Vue, Ember.
3. **high level framework.** $mol has many costomizable ui components. Honor high fw: Ext, OpenUI5.
4. **Platform.** $mol doesn't fit it yet. Honor platforms: Drupal, SAP, 1C.

# Features

- [Zero configuration](#zero-configuration). Just checkout and use it.
- [Lazy rendering/evaluating/loading etc](#lazyness).
- [Full reactivity](#reactivity) in all application layers. Not only between View and ViewModel.
- [Automatic dependency tracking](#reactivity) between reactive containers. No need to manual publish/subscribe/unsubscribe and streams routing.
- [Effective state synchronization](mem) in right way. 
- Automatic include modules to package at compile time. No need to manual import them. [Just use it](#zero-configuration).
- Very small modules. [All of them are optional](#zero-configuration).
- Cross platform. [Support any environment](#zero-configuration) (NodeJS, Web browsers, Cordova).
- Static typing ([TypeScript](https://www.typescriptlang.org/)). Full IDE support.
- Full customization. No implementation hiding. [All aspects are overridable](#lego-components).
- [Lifecycle management](#reactivity). Automatic destroy of unnecessary objects.
- [Easy debugging](#debugging). User friendly id's of all objects. Quick access to all objects from console.
- Easy [user friendly logging](#debugging) of all state changes.
- Pseudosynchronous code. [Asynchrony is abstracted by reactivity](#reactivity). No callbacks/promises/streams hell. No async/await/yield virus.
- Automatic [BEM](https://en.bem.info/methodology/naming-convention/)-attributes generation for elements.

# Benchmarks

- [$hyoo_bench_list](https://github.com/hyoo-ru/bench.hyoo.ru/tree/master/list) - Frameworks comparison ([online](https://bench.hyoo.ru/list/#sort=fill/sample=angular-1-5-5~mol~native-html~react-15-3-2~native-dom))
- [ToDoMVC benchmark](https://github.com/eigenmethod/todomvc/tree/master/benchmark) ([online](https://eigenmethod.github.io/todomvc/benchmark/#sample=angular2%7Eangularjs%7Eknockoutjs%7Emol%7Epolymer%7Ereact-alt%7Evanillajs%7Evue#sort=fill#))
- [WebPageTest - Loading progress of ToDOMVC applications on some frameworks](https://www.webpagetest.org/video/compare.php?tests=161217_V8_6RFK%2C161217_G9_6RFM%2C161217_YZ_6RFN%2C161217_DM_6RFP%2C161217_2B_6RFQ%2C161217_RJ_6RFR%2C161217_2R_6RFS%2C161217_H5_6RFT%2C161217_CW_6RFV&thumbSize=150&ival=100&end=all)
- [Line charts comparison](https://github.com/hyoo-ru/bench.hyoo.ru/tree/master/chart/rope) ([online](https://bench.hyoo.ru/chart/rope/#sort=fill/sample=hcharts~mol))
- [Bar charts comparison](https://github.com/hyoo-ru/bench.hyoo.ru/tree/master/chart/bar) ([online](https://bench.hyoo.ru/chart/bar/#sort=fill/sample=hcharts~mol))
- [React vs React Fiber vs $mol](https://github.com/nin-jin/sierpinski) ([online](https://nin-jin.github.io/sierpinski))

# Articles

- [$mol — лучшее средство от геморроя](https://habr.com/ru/post/341146/) - Quick intoduction to $mol
- [$mol: реактивный микромодульный фреймворк](https://habrahabr.ru/post/311172/) - Сomprehensive $mol review
- [Объектное Реактивное Программирование](https://habrahabr.ru/post/330466/) - Features of Object Reactive Programming
- [Концепции автоматического тестирования](https://habr.com/ru/post/351430/) - Testing principles
- [Идеальный UI фреймворк](https://habrahabr.ru/post/276747/) - Problems of popular frameworks
- [Принципы написания кода](https://habrahabr.ru/post/236785/) - Code style principles

# Quick start

[Video of this process](https://www.youtube.com/watch?v=PyK3if5sgN0)

## Create MAM project

Easy way is checkout this [preconfigured MAM repository](http://github.com/eigenmethod/mam) and start dev server:

```sh
git clone https://github.com/eigenmethod/mam.git ./mam && cd mam
npm install && npm start
```

## Setup your editor

- Use MAM directory as root of your project in editor
- [Install VScode intellisense plugin for *.view.tree files](https://marketplace.visualstudio.com/items?itemName=valikov.tree-language-service)
- [Install plugin for *.tree files](https://github.com/nin-jin/tree.d#ide-support)
- [Install .editorconfig plugin](https://editorconfig.org/#download) or use this preferences: **TABs for indents, LF for line endings**.

## Create your application component

In examples we will use namespace `my` and application name `hello`, but you could use your own namespace and application name.

Add **web entry point** at `./my/hello/index.html`:

```html
<!-- Disable quirks mode -->
<!doctype html>

<!-- Allow height:100% in body -->
<html style=" height: 100% ">

<!-- Force utf-8 encoding -->
<meta charset="utf-8" />
	
<!-- Disable mobile browser auto zoom, $mol is adaptive -->
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
	
<!-- link to autogenerated js bundle -->
<script src="web.js"></script>

<!-- autobind component to element on load -->
<body mol_view_root="$my_hello">
```

Your application will be served at **`http://localhost:9080/my/hello/`**. Open it. You should refresh page to view your changes.

Add [**declarative component description**](view) at `./my/hello/hello.view.tree` with string input field and greeting message:

```tree
$my_hello $mol_view
	sub /
		<= Name $mol_string
			hint \Name
			value?val <=> name?val \
		<= message \
```

That will be automaticaly compiled to typescript code like this:

```typescript
namespace $ { export class $my_hello extends $mol_view {

	/// name?val \
	@ $mol_mem
	name( next = '' ) {
		return next
	}

	/// Name $mol_string 
	/// 	hint \Name
	/// 	value?val <=> name?val
	@ $mol_mem
	Name() {
		const obj = new $mol_string
		obj.hint = () => "Name" ,
		obj.value = next => this.name( next ) ,
		return obj
	}

	/// message \
	message() {
		return ""
	}

	/// sub / 
	/// 	<= Name
	/// 	<= message
	sub() {
		return [ this.Name() , this.message() ]
	}

} }
```

Add **your behaviour** at `./my/hello/hello.view.ts` by extending generated class:

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		
		message() {
			let name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
```

Add **tests for your behaviour** at `./my/hello/hello.test.ts`

```typescript
namespace $.$$ {

	$mol_test({

		'Generating greeting message'() {

			const app = new $my_hello
			app.name( 'Jin' )

			$mol_assert_equal( app.message() , 'Hello, Jin!' )

		}

	})

}
```

Add **styles** at `./my/hello/hello.view.css`:

```css
/* Styling BEM-block by autogenerated attribute */
[my_hello] {
	display: flex;
	flex-direction: column;
	align-items: center;
	font: 1.5rem/1 sans-serif;
	box-shadow: var(--mol_skin_light_outline);
	flex: 1 1 auto;
	align-self: stretch;
	margin: 0;
}

/* Styling BEM-element by autogenerated attribute */
[my_hello_name] {
	flex-grow: 0;
	margin: 1rem;
	width: 14rem;
}
```

[That is all!](https://mol.js.org/app/hello/)

# Tutorials

- [$mol_app_calc: вечеринка электронных таблиц](https://github.com/nin-jin/HabHub/issues/10)
- [$hyoo_bench: готовим JS бенчмарки быстро и просто](https://github.com/nin-jin/HabHub/issues/8)
- [$mol_app_habhub: чтение статей с GitHub](https://github.com/nin-jin/HabHub/issues/5)

# Rationale

## Zero configuration
Instead of ensuring configurable under any wanting, we better concentrate on, that all would worked good directly from the box and does not bother $mol's developer by a typical configure. (But, nevertheless it does not excludes setup for your needs if it is required)

For example if you download **[base MAM-project](http://github.com/eigenmethod/mam)** you'd have got that:

**Building of JS and CSS bundles for different platforms.** A bundle can be built for any module. In this bundle would be sources of that module and sources all other modules from which the module depends on. Also there would not redundant modules in the bundle.  

There are the full set of supports bundles:

- `-/web.js` - JS for browser
- `-/web.d.ts` - TypeScript definitions
- `-/web.test.js` - JS with tests for a browser
- `-/web.deps.json` - map of dependencies modules for browser
- `-/web.locale=en.json` - strings pulled from ```*.view.tree``` and ```*.locale=en.json``` sources
- `-/node.js` - JS for NodeJS
- `-/node.test.js` - JS with tests for NodeJS
- `-/node.deps.json` - a map of dependencies modules for NodeJS

**Support of Source Maps**. Sources are compiled and integrate to maps, they are fully self-sufficient.

**Development server**, witch would be compile bundles as needed. For example, when requested `http://localhost:9080/hyoo/todomvc/-/web.js` the `js` bundle is being built of `hyoo/todomvc` for `web` environment. Rebuilding would be occur only if some source file would be changed.

**Transpilling of modern CSS into CSS supported by browsers** ([postcss-cssnext](https://github.com/MoOx/postcss-cssnext)): vendor prefixes and variables etc.

**Transpilling [TypeScript](https://github.com/Microsoft/TypeScript) into JS**. 
In TS configuration enabled support decorators and disabled implicit `any` type, for prevent missing typing by change.

**Watching dependencies by fact of using** and inclusion the needed modules automatically at further bundle. You don't need to write `include` and `require` everything you need is to refer for essence by full name like `$mol_state_arg` and `$mol.state.arg` (looking at its definition) in `*.ts`, `*.view.ts`, `*.view.tree` and `*.jam.js` files. At CSS files its dependencies are looked for by entries like `[mol_check_checked]` , `[mol_check_checked=` and `.mol_check_checked`.

## Lego components

At $mol is used the component approach to the building of interface, however **every component is self-sufficient** and can be used as the self-sufficient application. Small components are aggregated inside of larger components etc.

Unlike another frameworks the $mol does not seek to isolate the insides of the components. Vice versa, there is comfortable mechanism is provided for developers for configuration them, it is not required from the creator of the component to do any additional gestures.

For example, to set the list of sub components you need to redefine `sub` property in view.tree

```tree
Confirm_delte $mol_row sub /
	<= Yes $mol_button_minor title \Yes
	<= No $mol_button_major title \No
```

Or the same code through TypeScript would be:

```typescript
@ $mol_mem
Confirm_delete() {
	return $mol_row.make({
		sub : ()=> [ this.Yes() , this.No() ] ,
	})
}
```

In both variants the compiler would verify existence of the property and accordance of the signature. In normal mode you don't need to work with fields of the object directly, so all definable properties 
are public and can be safely overloaded.

Details about viewers and `view.tree` language: [$mol_view](view).

## Lazyness

[$mol_view](view) implements lazy rendering. [$mol_scroll](scroll) is watching scroll's position and suggest to the embedded components about the view height. [$mol_list](list) knowing about the view height and minimal sizes of the embedded components, it excludes from rendering process the components that is not got into viewport for sure. And all other components can suggest it about their minimal size through `minimal_height` property.

```
$my_icon $mol_view
	minimal_height 16
```

At the result it come out than opening any window occur while instant time. It's independent of output data size. And since data would not be rendered, then any requests would not be proceeded. It's allowed us to download them partly, when they are needed. That features are possible due to reactive architecture, that are penetrated all layers of application.

## Reactivity

Unlike the control-flow architectures, in $mol was implemented the data-flow architecture. All applications are described as a set of classes, having properties. Every property is described as some function from another property (and properties of another classes too). Properties, to which were appealed while function processing were saved as dependencies of our property. In case of changing their values, all dependant on them properties would be invalidated cascaded. And appealing to non relevant property would lead to its pre-actualization.

In this way the whole application at the execution stage represents a huge tree of dependencies, at the root of the tree is located the special property, which in case of invalidation would actualize itself automatically. And as any property always knows, whether something depends from it or not, then it is given a simple and reliable mechanism of controlling lifecycle of objects - they creates if the dependence appears and are destroyed when nothing depend from it. It's solved two fundamental problem: resources leaks and cache invalidation. 

Besides, the reactive architecture allows us to abstract code elegantly from asynchronous operations. If the function can't return value at once, it can throws the `Promise`, it is marked part of the tree as "waiting of results". When the result would be retrieved - it could be inserted into property directly and application would be reconstructed for the new state.

```typescript
namespace $ {
	export class $my_greeter {
		
		@ $mol_mem
		greeting() : string {
			const user_name = $mol_fetch.json( 'https://example.org/profile' ).name
			return `Hello, ${ user_name }!`
		}
		
	}
}
```

Details: [$mol_mem](mem), [$mol_atom2](atom2).

## Debugging

A special attention is payed while developing $mol to debugging possibilities and researching of code's working process.

For every DOM-element is formed a people friendly `id` automatically like `$hyoo_todomvc.root(0).taskRow(0).titler()`, which is valid javascript code, this one could be executed at a console, received a link to the component, whom the component is corresponds to. Unfolding the content of the component you'd see names and values its fields like:

```
$hyoo_todomvc
    dom_node() : div#$hyoo_todomvc.root(0)
    task(1474385802391) : Object
    task(1474386443175) : Object
    taskRow(0) : $hyoo_todomvc_task_rowRow
    taskRow(1) : $hyoo_todomvc_task_rowRow
    taskrows() : Array[2]
```

The name of the field corresponds to calling the property, the content of the field would be available through. And thanks to naming classes and functions through underscoring you'd always get to know which class instance in front of you and could briefly find it at code by default searching by the substring.

# Modules

## Flow

- **[$mol_fiber](fiber)** - suspendable tasks
- **[$mol_atom2](atom2)** - reactive container
- **[$mol_log2](log2)** - logging
- **[$mol_import](import)** - dynamic sources import

## Object model

- **[$mol_mem](mem)** - reactive property decorator
- **[$mol_object](object)** - components base class

## Functions

- **[$mol_const](const)** - const value returning function
- **[$mol_func_name](func/name)** - name of function
- **[$mol_func_sandbox](func/sandbox)** - sandbox for safe code evaluation

## Collections

- **[$mol_range2](range2)** - lazy array
- **[$mol_maybe](maybe)** - [maybe monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#The_Maybe_monad)
- **[$mol_conform](conform)** - object tree reconciler
- **[$mol_dict](dict)** - usefull native `Map` extension

## [State modules](state)

- **[$mol_state_arg](state/arg)** - arguments state (location/argv)
- **[$mol_state_local](state/local)** - persistent local state (localStorage)
- **[$mol_state_session](state/session)** - session temporary state (sessionStorage)
- **[$mol_state_history](state/history)** - browser history bound state
- **[$mol_state_stack](state/stack)** - state of current stack of execution
- **[$mol_state_time](state/time)** - reactive current time stamp 

## Simple components

- **[$mol_view](view)** - reactive view model base class with lazy error-proof renderer
- **[$mol_ghost](ghost)** - node-less wrapper for another view
- **[$mol_filler](filler)** - lorem ipsum
- **[$mol_svg](svg)** - svg base components
- **[$mol_status](status)** - prints error status of some property
- **[$mol_speck](speck)** - attention speck

## Simple controls

- **[$mol_link](link)** - navigation link
- **[$mol_button](button)** - button
- **[$mol_check](check)** - check box
- **[$mol_switch](switch)** - radio buttons
- **[$mol_select](select)** - select with search and lazy rendering support
- **[$mol_string](string)** - one string input control
- **[$mol_textarea](textarea)** - multiple line input control
- **[$mol_search](search)** - search string with suggests support
- **[$mol_number](number)** - one number input control
- **[$mol_code](code)** - bar code scanner
- **[$mol_portion](portion)** - portion visualizer

## Layout components

- **[$mol_scroll](scroll)** - scroll pane with position saving
- **[$mol_tiler](tiler)** - items in row with balanced wrapping
- **[$mol_row](row)** - items in row with wrapping and padding between
- **[$mol_bar](bar)** - group of controls as own control
- **[$mol_list](list)** - vertical list of rows
- **[$mol_labeler](labeler)** - labeled content
- **[$mol_section](section)** - section with header
- **[$mol_book](book)** - horizontal stack of pages
- **[$mol_page](page)** - page with header, body and footer
- **[$mol_deck](deck)** - deck of panels with tab bar
- **[$mol_card](card)** - card with content

## Plugin components

- **[$mol_nav](nav)** - keyboard navigation
- **[$mol_meter](meter)** - real time element size monitoring

## Complex components

- **[$mol_form](form)** - forms with validators
- **[$mol_demo](demo)** - demonstrates widget in various screens
- **[$mol_attach](attach)** - preview list and attach button
- **[$mol_cost](cost)** - prints currency values
- **[$mol_message](message)** - user message

## Charts

- **[$mol_chart](chart)** - Plot pane with legend
- **[$mol_chart_legend](chart/legend)** - Simple legend for charts
- **[$mol_plot_pane](plot/pane)** - Pane for multiple graphs
- **[$mol_plot_graph](plot/graph)** - Plot graph base class
- **[$mol_plot_bar](plot/bar)** - Bar graph
- **[$mol_plot_line](plot/line)** - Linear graph
- **[$mol_plot_dot](plot/dot)** - Dots graph
- **[$mol_plot_fill](plot/fill)** - Filling graph
- **[$mol_plot_group](plot/group)** - Group of graph as single graph
- **[$mol_plot_ruler_vert](plot/ruler/vert)** - Verical ruler
- **[$mol_plot_ruler_hor](plot/ruler/hor)** - Horizontal ruler
- **[$mol_plot_mark_hor](plot/mark/hor)** - Horizontal markers

## Data formats

- **[$mol_tree](tree)** - [tree format](https://github.com/nin-jin/tree.d) (`view.tree` language descripted at [$mol_view](view))

## Math

- **[$mol_graph](graph)** - graph algorithms
- **[$mol_unit](unit)** - typed number value
- **[$mol_merge_dict](merge/dict)** - merge two dictionaries to new one

## Resources

- **[$mol_logo](logo)** - $mol logotypes
- **[$mol_icon](icon)** - css styled icons
- **[$mol_skin](skin)** - theming
- **[$mol_style](style)** - css-in-ts

## Testing

- **[$mol_test](test)** - unit testing
- **[$mol_stub](stub)** - stub data generators

## API

- **[$mol_window](window)** - reactive view port configuration
- **[$mol_fetch](fetch)** - Reactive [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **[$mol_webdav](webdav)** - Reactive [WebDAV](https://wikipedia.org/wiki/WebDAV) client
- **[$mol_file](file)** - isomorphic reactive file system wrapper
- **[$mol_exec](exec)** - synchronous execute of system command
- **[$mol_cordova](cordova)** - [Apache Cordova](https://cordova.apache.org) API

## Time

- **[$mol_time_moment](time/moment)** - [time moment](https://en.wikipedia.org/wiki/ISO_8601#Dates) representation with iso8601 support
- **[$mol_time_duration](time/duration)** - [time duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) representation with iso8601 support
- **[$mol_time_interval](time/interval)** - [time interval](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals) representation with iso8601 support
- **[$mol_state_time](state/time)** - reactive current time stamp 
- **[$mol_date](date)** - date picker
- **[$mol_calendar](calendar)** - days of month as table

## Maps

- **[$mol_map_yandex](map/yandex)** - [Yandex Maps](https://tech.yandex.ru/maps/doc/jsapi/2.1/)

## Web Services

- **[$mol_github](github)** - [GitHub API](https://developer.github.com/v3/)
- **[$mol_chat](chat)** - GitHub based comments everywere

## Building

- **[$mol_build](build)** - MAM builder
- **[$mol_build_server](build/server)** - MAM developer server

# Contributors

This project exists thanks to all the people who contribute.

- [nin-jin](https://github.com/nin-jin)
- [ar2r13](https://github.com/ar2r13)
- [zerkalica](https://github.com/zerkalica)
- [muleronko](https://github.com/muleronko)
- [slava-viktorov](https://github.com/slava-viktorov)
- [CONTRIBUTING](https://github.com/eigenmethod/mol/blob/master/CONTRIBUTING.md)

# Cool stuff

- **[Commits visualization](http://ghv.artzub.com/#repo=mol&user=eigenmethod&climit=100000)**
- **[Sources visualization](http://veniversum.me/git-visualizer/?owner=eigenmethod&repo=mol)**

# Donate

- **[Shut up and take my money](http://yasobe.ru/na/mol)**
