# $mol_pager

The component for creating page layout.

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_pager_demo)

## Properties

`title() : string`  
Property for setting page title.

`head() : Array`

Property which wraps subhead elements like title and so on.

`body : Array`  
In body can be placed the content.

`foot : Array`
Here can be placed the footer content

## Usage examples
```
$mol_pager
	title \Sign Up
	body $mol_app_signup
	foot $mol_rower_demo
```
