# $mol_view

The base class for all visual components. It provides the infrastructure for reactive lazy rendering, handling exceptions. By default it finds or creates a `div` without child node changing and additional attributes, fields and event handler creation. You can customize it by inheritance or properties overriding at instantiating.

## Properties

**`tagName()' = 'div'`**
It sets the name of the DOM-element creating for component, if the element with appropriate id is not presented at DOM yet.

**`nameSpace() = 'http://www.w3.org/1999/xhtml'`**

It sets the namespace for the DOM element. 

**`sub() = null `**
It sets the list of their child elements. In this list could be instances of `$mol_view`,
any DOM-elements or primitives like strings, numbers etc. If the list have not been set (by default), then the content of the DOM-element would not be changed in way, it's helpful for manual operating with DOM.

**`context( next? : $mol_view_context ) : $mol_view_context`**
Some rendering context. Parent node injects context to all rendered child components.

**`minimal_height()` = 0**

It is the minimum possible height of the component. It's set by hand with constant or some expression.This property is used for lazy rendering.

**`dom_node() : Element`**

It returns the DOM-element, to which the component is bounded to. At first the method tries to find the element by its id at DOM and only if it would have not been found - the method would create and remember a new one. 

**`dom_tree() : Element`**

It is the same as `dom_node`, but its guarantee, that the content, attributes and properties of the DOM-element should be in actual state.

**`attr() : { [ key : string ] : ()=> string|number|boolean }`**

It returns the dictionary of the DOM-attributes, which values would be set while rendering. Passing `null` or `false` as the value to the attribute would lead to removing the attribute.
Passing `true` is an equivalent to passing its name as value. `undefined` is just ignored.

**`field() : { [ key : string ] : ()=> any }`**

It returns the dictionary of fields, which is necessary to set to the DOM-element after rendering. By way of name of the field a path could be set to. For example `scrollTop` would be set scroll's position, or `style.backgroundPosition` would be set background's position.

**`event() : { [ key : string ] : ( event : Event )=> void }`**

It returns the dictionary of event handlers. The event handlers are bind to the DOM-element one time, when the value is set to `dom_node` property.

**`focused() : boolean`**

It determines, whether the component is focused or not at this time. If any inserted component would be focused, then its parent component would be focused also.

## view.tree
*view.tree* - is a declarative language of describing components, based on [format tree](https://github.com/nin-jin/tree.d). In a file could be plenty of components defined in series, but better way is put every component in a separate file, except very trivial cases.
To create a new component it's enough to inherit this from any existing one.
Names of the components should begin with `$` and be unique globally accordance with principles presented on [PMS](https://github.com/nin-jin/pms). For example, lets declare a component `$my_button` as a child from `$mol_view`:

```tree
$my_button $mol_view
```

It translates to (every *.view.tree code would be translated to *.view.tree.ts):

```typescript
namespace $ { export class $my_button extends $mol_view {} }
```
While inheritance there is a possibility to declare additional properties or overload existing (but types of properties should match). For example lets overload a `uri` property with `"https://example.org"` string, and `sub` - with array of one string `"Click me!"`, besides, lets declare a new property `target` with `"_top"` value by default. (it's important to mark that a value by default is necessary when declaring a property):  

```tree
$my_exampler $mol_link
	uri \https://example.org
	sub /
		\Click me!
	target \_top
```

```typescript
namespace $ { export class $my_exampler extends $mol_link {

	uri() {
		return "https://example.org"
	}

	sub() {
		return [].concat(  "Click me!" )
	}

	target() {
		return "_top"
	}

} }
```
Nodes beginning with `-` - would be ignored, it allows to use them for commenting and temporary disable subtree. Nodes beginning with `$` - is name of component. `/` - any list should begin with this symbol. `\` - should be preceded any  raw data, which can contain entirely any data until the end of the line. Numbers, booleans values and `null` is being wrote as it is, without any prefixes:

```tree
$my_values $mol_view
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

	sub() {
		return [].concat( 0 , 1.1 , true , false , <any> null , "I can contain any character! \\(\"o\")/" )
	}

} }
````
Dictionary (correspondence keys to their values) could be declared through a node `*`, through which are set values of attributes to DOM-element:

```tree
$my_number $mol_view
	tagName \input
	attr *
		type \number
		- attribute values must be a strings
		min \0
		max \20
```

```typescript
namespace $ { export class $my_number extends $mol_view {

	tagName() {
		return "input"
	}

	attr() {
		return $mol_merge_dict( super.attr() , {
			"type" : ()=> <any> "number" ,
			"min" : ()=> <any> "0" ,
			"max" : ()=> <any> "20" ,
		} )
	}

} }
```
We could set value in the same way for fields of a DOM-element:

```tree
$my_wonder $mol_view
	tagName \input
	field *
		value \Hello!
		style.transform \rotate( 180deg )
```

```typescript
namespace $ { export class $my_wonder extends $mol_view {

	tagName() {
		return "input"
	}

	field() {
		return $mol_merge_dict( super.field() , {
			"value" : ()=> <any> "Hello!" ,
			"style.transform" : ()=> <any> "rotate( 180deg )" ,
		} )
	}

} }
```
As a value we could bring not only constants, but also a content of another properties through one-way binding. For example, lets declare two text properties `hint` and `text`, and then use them for forming a dictionary `field` and a list `sub`:

```tree
$my_hint $mol_view
	hint \Default hint
	text \Default text
	field *
		title < hint 
	sub /
		< text
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
		return $mol_merge_dict( super.field() , {
			"title" : ()=> <any> this.hint() ,
		} )
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
		title < hint \Default hint 
	sub /
		< text \Default text
```
Reactions on DOM-events are required for two-way binding. For example, lets point out, that objects of `click` event is necessary to put in eventRemove property, which we declare right here and set it a default value `null`:

```tree
$my_remover $mol_view
	event *
		click > eventRemove null 
	sub /
		\Remove
```

```typescript
namespace $ { export class $my_remover extends $mol_view {

	@ $mol_prop()
	eventRemove( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : <any> null
	}

	event() {
		return $mol_merge_dict( super.event() , {
			"click" : ( ...diff : any[] )=> <any> this.eventRemove(  ...diff ) ,
		} )
	}

	sub() {
		return [].concat( "Remove" )
	}

} }
```
We could declare as value an instance of another class directly. In the next example it is being declared a property `lister`, and which value would be a component type of `$mol_list_demo`, and then it put into a list of child components `sub`:

```tree
$my_app $mol_view
	lister $mol_list_demo
	sub /
		< lister
```

```typescript
namespace $ { export class $my_app extends $mol_view {

	@ $mol_prop()
	lister( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_list_demo().setup( __ => { 
		} )
	}

	sub() {
		return [].concat( this.lister() )
	}

} }
```
A property of a nested component could be overloaded also: 

```tree
$my_name $mol_view
	sub /
		< info $mol_labeler
			title \Name
			content \Jin
```

```typescript
namespace $ { export class $my_name extends $mol_view {

	@ $mol_prop()
	info( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_labeler().setup( __ => { 
			__.title = () => "Name"
			__.content = () => "Jin"
		} )
	}

	sub() {
		return [].concat( this.info() )
	}

} }
```
Properties of parent and child component could be linked. At the following example we declare reactive property `name`, and we say to child component `input` use property `name` as its own property `value`, we also say to a child component `output` we want to property `name` to be outputted at inside of this one. In this way components `input` and `output` are become linked through parent's property `name` and changing value in `input` would lead to updating output:

```tree
$my_greeter $mol_view
	- ">" allows pushing to property
	> name \
	sub /
		< input $mol_string
			hint \Name
			value > name
		< output $mol_view
			sub /
				< name
```

```typescript
namespace $ { export class $my_greeter extends $mol_view {

	@ $mol_prop()
	name( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : ""
	}

	@ $mol_prop()
	input( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_string().setup( __ => { 
			__.hint = () => "Name"
			__.value = ( ...diff : any[] ) => this.name(  ...diff )
		} )
	}

	@ $mol_prop()
	output( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_view().setup( __ => { 
			__.sub = () => [].concat( this.name() )
		} )
	}

	sub() {
		return [].concat( this.input() , this.output() )
	}

} }
```

Бывают такие свойства, которые в зависимости от ключа возвращают разные значения. Типичный пример - строки списка. Каждая строка - отдельный компонент, доступный по уникальному ключу. Для объявления таких свойств используется суффикс `#`:

```tree
$my_tasks $mol_list
	sub < taskrows
	taskrows /
	taskRow# $mol_view
		sub / < taskTitle#
	taskTitle# < defaultTitle
	defaultTitle \
```

```typescript
namespace $ { export class $my_tasks extends $mol_list {

	sub() {
		return this.taskrows()
	}

	taskrows() {
		return [].concat(  )
	}

	@ $mol_prop()
	taskRow( key : any , ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_view().setup( __ => { 
			__.sub = () => [].concat( this.taskTitle( key ) )
		} )
	}

	taskTitle( key : any ) {
		return this.defaultTitle()
	}

	defaultTitle() {
		return ""
	}

} }
```
Here we declared the property `taskRow`, which takes on input some key and returns an unique instance of `$mol_view` for every key, with overloaded property `sub`, which outputs appropriate `taskTitle` for every `taskRow`, and in its turn `taskTitle` returns the content of property `defaultTitle` independently of the key, which is equal to empty string initially. Further overloading any of these properties, we could change any aspect of component behavior.

## view.ts
In addition to declarative description of component, next to it could be created a file of the same name with `view.ts` extension, where a behavior could be described. Using a special construction, it could be inherited from realization obtained of `view.tree` and it would be overloaded automatically by heir:  

For example we have following description into `./my/hello/hello.view.tree`:

```tree
$my_hello $mol_view sub /
	< input $mol_string
		hint \Name
		value > name \
	< message \
```
Here we declared 2 properties: `name` for getting value from `input` and `message` for output the value. It would be translated into following file `./my/hello/-/view.tree.ts/hello.view.tree.ts`: 

```typescript
namespace $ { export class $my_hello extends $mol_view {

	@ $mol_prop()
	name( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : ""
	}

	@ $mol_prop()
	input( ...diff : any[] ) {
		return ( diff[0] !== void 0 ) ? diff[0] : new $mol_string().setup( __ => { 
			__.hint = () => "Name"
			__.value = ( ...diff : any[] ) => this.name(  ...diff )
		} )
	}

	message() {
		return ""
	}

	sub() {
		return [].concat( this.input() , this.message() )
	}

} }
```
For now we could "mix" into this class our behavior through `./my/hello/hello.view.ts`:

```typescript
namespace $.$mol {
	export class $my_hello extends $.$my_hello {
		
		message() {
			let name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
```
Here we linked our properties `message` and `name` through the expression. So now wherever we use `$my_hello`, the value `message` would be depend on `name` property entered by a user.
