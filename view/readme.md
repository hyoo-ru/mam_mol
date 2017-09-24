# $mol_view

The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions. By default it finds or creates a `div` without child node changing and additional attributes, fields and event handler creation. You can customize it by inheritance or properties overriding at instantiating.

## Properties

**`dom_name()' : string`**
Returns name of the DOM-element creating for component, if the element with appropriate id is not presented at DOM yet.

**`dom_name_space() = 'http://www.w3.org/1999/xhtml'`**

Returns namespaceURI for the DOM element. 

**`sub() : Array< $mol_view | Node | string | number | boolean > = null `**
Returns list of child components/elements/primitives. If the list have not been set (by default), then the content of the DOM-element would not be changed in way, it's helpful for manual operating with DOM.

**`context( next? : $mol_view_context ) : $mol_view_context`**
Some rendering context. Parent node injects context to all rendered child components.

**`minimal_height()` = 0**

Returns minimum possible height of the component. It's set by hand with constant or some expression.This property is used for lazy rendering.

**`dom_node() : Element`**

Returns DOM-element, to which the component is bounded to. At first the method tries to find the element by its id at DOM and only if it would have not been found - the method would create and remember a new one. 

**`dom_tree() : Element`**

Same as `dom_node`, but its guarantee, that the content, attributes and properties of the DOM-element should be in actual state.

**`attr() : { [ key : string ] : string | number | boolean }`**

Returns the dictionary of the DOM-attributes, which values would be set while rendering. Passing `null` or `false` as the value to the attribute would lead to removing the attribute.
Passing `true` is an equivalent to passing its name as value. `undefined` is just ignored.

**`field() : { [ key : string ] : any }`**

Returns dictionary of fields, which is necessary to set to the DOM-element after rendering.

**`style() : { [ key : string ] : string | number }`**

Returns dictionary of styles. Numbers will be convertes to string with "px" suffix.

**`event() : { [ key : string ] : ( event : Event )=> void }`**

Returns dictionary of event handlers. The event handlers are bind to the DOM-element one time, when the value is set to `dom_node` property. This handlers are synchronous and can be cancelled by ```preventDefault()```.

**`event_async() : { [ key : string ] : ( event : Event )=> void }`**

Returns dictionary of event handlers. The event handlers are bind to the DOM-element one time, when the value is set to `dom_node` property. This handlers are passive and can not be cancelled by ```preventDefault()```.

**`focused( next? : boolean ) : boolean`**

Determines, whether the component is focused or not at this time. If any inserted component would be focused, then its parent component would be focused also.

**`plugins() : Array< $mol_view > = null`**

It is an array of plugins. Plugin is a component which can be supplemented with the logic of the current components.
For example

In the example we create a list with navigation (using $mol_nav)

```
<= Options $mol_list
    plugins / 
        <= Nav $mol_nav
            keys_y <= options /
    rows <= options /
```

## *.view.tree

*view.tree* - is a declarative language of describing components, based on [format tree](https://github.com/nin-jin/tree.d). In a file could be plenty of components defined in series, but better way is put every component in a separate file, except very trivial cases.
To create a new component it's enough to inherit this from any existing one.
Names of the components should begin with `$` and be unique globally accordance with principles presented on [MAM](https://github.com/eigenmethod/mam). For example, let's declare the component `$my_button` extended from `$mol_view`:

```tree
$my_button $mol_view
```

It translates to (every *.view.tree code would be translated to *.view.tree.ts):

```typescript
namespace $ { export class $my_button extends $mol_view {} }
```

While inheritance there is a possibility to declare additional properties or overload existing (but types of properties should match). For example lets overload a `uri` property with `"https://example.org"` string, and `sub` - with array of one string `"Click me!"`, besides, lets declare a new property `target` with `"_top"` value by default. (it's important to mark that a value by default is necessary when declaring a property):  

```tree
$my_example $mol_link
	uri \https://example.org
	sub /
		\Click me!
	target \_top
```

```typescript
namespace $ { export class $my_example extends $mol_link {

	uri() {
		return "https://example.org"
	}

	sub() {
		return [].concat( "Click me!" )
	}

	target() {
		return "_top"
	}

} }
```

Nodes beginning with `-` - would be ignored, it allows to use them for commenting and temporary disable subtree. Nodes beginning with `$` - is name of component. `/` - any list should begin with this symbol. `\` - should be preceded any raw data, which can contain entirely any data until the end of the line, `@` marks string for extraction to separate `*.locale=en.json` file. Numbers, booleans values and `null` is being wrote as it is, without any prefixes:

```tree
$my_values $mol_view
	title @ \Values example
	sub /
		0
		1.1
		true
		false
		null
		\I can contain any character! \("o")/
		- I
			am
				remark...
```

```typescript
namespace $ { export class $my_values extends $mol_view {

	title() {
		return this.$.$mol_locale.text( '$my_values_title' )
	}

	sub() {
		return [].concat( 0 , 1.1 , true , false , <any> null , "I can contain any character! \\(\"o\")/" )
	}

} }
````

Dictionary (correspondence keys to their values) could be declared through a node `*` (you can use `^` to inherit pairs from superclass), through which are set values of attributes to DOM-element:

```tree
$my_number $mol_view
	dom_name \input
	attr *
		^
		type \number
		- attribute values must be a strings
		min \0
		max \20
```

```typescript
namespace $ { export class $my_number extends $mol_view {

	dom_name() {
		return "input"
	}

	attr() {
		return { ...super.attr() ,
			"type" : "number" ,
			"min" : "0" ,
			"max" : "20" ,
		}
	}

} }
```

We could set value in the same way for fields of a DOM-element:

```tree
$my_scroll $mol_view
	field *
		^
		scrollTop 0
```

```typescript
namespace $ { export class $my_scroll extends $mol_view {

	field() {
		return { ...super.field() ,
			"scrollTop" : 0 ,
		}
	}

} }
```

And styles too:

```tree
$my_rotate $mol_view
	style *
		^
		transform \rotate( 180deg )
```

```typescript
namespace $ { export class $my_rotate extends $mol_view {

	style() {
		return { ...super.style() ,
			"transform" : "rotate( 180deg )" ,
		}
	}

} }
```

As a value we could bring not only constants, but also a content of another properties through one-way binding. For example, lets declare two text properties `hint` and `text`, and then use them for forming a dictionary `field` and a list `sub`:

```tree
$my_hint $mol_view
	hint \Default hint
	text \Default text
	field *
		^
		title <= hint -
	sub /
		<= text -
```

```typescript
namespace $ { export class $my_hint extends $mol_view {

	hint() {
		return "Default hint"
	}

	text() {
		return "Default text"
	}

	field() {
		return { ...super.field() ,
			"title" : this.hint() ,
		}
	}

	sub() {
		return [].concat( this.text() )
	}

} }
```

Often it is convenient to combine declaration of property and usage of this one. The next example is equals to the previous completely:

```tree
$my_hint $mol_view
	field *
		^
		title <= hint \Default hint 
	sub /
		<= text \Default text
```
Reactions on DOM-events are required for two-way binding. For example, lets point out, that objects of `click` event is necessary to put in eventRemove property, which we declare right here and set it a default value `null`:

```tree
$my_remover $mol_view
	event *
		^
		click?val <=> event_remove?val null 
	sub /
		\Remove
```

```typescript
namespace $ { export class $my_remover extends $mol_view {

	@ $mol_mem
	event_remove( next? : any ) {
		return ( next !== void 0 ) ? next : <any> null
	}

	event() {
		return { ...super.event() ,
			"click" : ( next? : any )=> this.event_remove( next ) ,
		}
	}

	sub() {
		return [].concat( "Remove" )
	}

} }
```

We could declare as value an instance of another class directly. In the next example it is being declared a property `List`, and which value would be a component type of `$mol_list_demo`, and then it put into a list of child components `sub`:

```tree
$my_app $mol_view
	List $mol_list_demo
	sub /
		<= List -
```

```typescript
namespace $ { export class $my_app extends $mol_view {

	@ $mol_mem
	List() {
		return new $mol_list_demo()
	}

	sub() {
		return [].concat( this.List() )
	}

} }
```

A property of a nested component could be overloaded also: 

```tree
$my_name $mol_view
	sub /
		<= Info $mol_label
			title \Name
			content \Jin
```

```typescript
namespace $ { export class $my_name extends $mol_view {

	@ $mol_mem
	Info() {
		return $mol_labeler.make({ 
			title : () => "Name" ,
			content : () => "Jin" ,
		})
	}

	sub() {
		return [].concat( this.Info() )
	}

} }

```
Properties of parent and child component could be linked. At the following example we declare reactive property `name`, and we say to child component `Input` use property `name` as its own property `value`, we also say to a child component `Output` we want to property `name` to be outputted at inside of this one. In this way components `Input` and `Output` are become linked through parent's property `name` and changing value in `Input` would lead to updating output:

```tree
$my_greeter $mol_view
	sub /
		<= Input $mol_string
			hint \Name
			value?val <=> name?val \
		<= Output $mol_view
			sub /
				name?val \
```

```typescript
namespace $ { export class $my_greeter extends $mol_view {

	@ $mol_mem
	name( next? : any ) {
		return ( next !== void 0 ) ? next : ""
	}

	@ $mol_mem
	Input() {
		return $mol_string.make({ 
			hint : () => "Name" ,
			value : ( next? : any ) => this.name( next ) ,
		})
	}

	@ $mol_mem
	Output() {
		return $mol_view.make({ 
			sub : () => [].concat( this.name() ) ,
		})
	}

	sub() {
		return [].concat( this.Input() , this.Output() )
	}

} }
```

`=>` - Right-side binding. It is binding type which returns actual value of an entity with which it works.
```
	$my_app $mol_scroll
		sub /
	 		<= Page $mol_page
				Title => Page_title -
				head /
					<= Back $mol_button_minor
						title \Back
					<= Page_title -
```
```typescript
namespace $ { export class $my_app extends $mol_scroll {

	Page_title(){
		return this.Page().Title()
	}

	/// Back $mol_button_minor title \Back
	@ $mol_mem
	Back() {
		return $mol_button_minor.make({ 
			title : () => "Back" ,
		})
	}

	/// Page $mol_page 
	/// 	Title => Page_title 
	/// 	head / 
	/// 		<= Back 
	/// 		<= Page_title
	@ $mol_mem
	Page() {
		return $mol_page.make({ 
			head : () => [].concat( this.Back() , this.Page_title() ) ,
		})
	}

	/// sub / <= Page
	sub() {
		return [].concat( this.Page() )
	}

} }
```

There are certain properties that depending on the key return different values. A typical example - a list of strings. Each line - a separate component that is available for the unique key. The listing of such properties is `!` after the name of the key:

```tree
$my_tasks $mol_list
	sub <= task_rows /
	Task_row!key $mol_view
		sub / <= task_title!key -
	task_title!key <= task_title_default \
```

```typescript
namespace $ { export class $my_tasks extends $mol_list {

	sub() {
		return this.task_rows()
	}

	task_rows() {
		return []
	}

	@ $mol_mem
	Task_row( key : any ) {
		return $mol_view.make({ 
			sub : () => [].concat( this.task_title( key ) ) ,
		})
	}

	task_title( key : any ) {
		return this.task_title_default()
	}

	task_title_default() {
		return ""
	}

} }
```

Here we declared the property `task_row`, which takes on input some key and returns an unique instance of `$mol_view` for every key, with overloaded property `sub`, which outputs appropriate `task_title` for every `task_row`, and in its turn `task_title` returns the content of property `default_title` independently of the key, which is equal to empty string initially. Further overloading any of these properties, we could change any aspect of component behavior. You can override `task_rows` in subclass to generate rows as you want. In example:

```
task_rows() {
	const rows = [] as $mol_view[]
	for( let i = 0 ; i < 10 ; ++ i ) rows.push( this.Task_row( i ) )
	return rows
}
```

**All special chars:**

- `-` - remarks, ignored by code generation
- `$` - component name prefix
- `/` - array
- `*` - dictionary (string keys, any values)
- `^` - return value of the same property from super class
- `\` - raw string
- `@` - localized string
- `<=` - read only provide property from owner to sub component
- `=>` - read only provide property from sub component to owner
- `<=>` - fully replace sub component property by owner's one
- `!` - property takes key as first argument
- `?` - property can be changed by provide additional optional argument

## view.ts

In addition to declarative description of component, next to it could be created a file of the same name with `view.ts` extension, where a behavior could be described. Using a special construction, it could be inherited from realization obtained of `view.tree` and it would be overloaded automatically by heir:  

For example we have following description into `./my/hello/hello.view.tree`:

```tree
$my_hello $mol_view
	sub /
		<= Input $mol_string
			hint \Name
			value <=> name?val \
		<= message \
```

Here we declared 2 properties: `name` for getting value from `Input` and `message` for output the value. It would be translated into following file `./my/hello/-/view.tree.ts/hello.view.tree.ts`: 

```typescript
namespace $ { export class $my_hello extends $mol_view {

	@ $mol_mem
	name( next? : any ) {
		return ( next !== void 0 ) ? next : ""
	}

	@ $mol_mem
	Input( next? : any ) {
		return $mol_string.make({ 
			hint : () => "Name" ,
			value : ( next? : any ) => this.name( next ) ,
		})
	}

	message() {
		return ""
	}

	sub() {
		return [].concat( this.Input() , this.message() )
	}

} }
```

For now we could "mix" into this class our behavior through `./my/hello/hello.view.ts`:

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		
		message() {
			const name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
```

Here we linked our properties `message` and `name` through the expression. So now wherever we use `$my_hello`, the value `message` would be depend on `name` property entered by a user.

## Articles

* [View formats](https://github.com/eigenmethod/mol/wiki/View-formats) - Comparison of component description formats (tree, xml, json)
* [React'ивные Panel'и](https://habrahabr.ru/post/314752/) - JSX vs view.tree
