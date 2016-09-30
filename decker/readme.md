# $mol_decker

The component which arrange content in multiple tabs.
 
## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_decker_demo)

## Usage example

```
$mol_decker 
	items /
		< stringerItem $mol_decker_item
			title \String fields
			content < stringerContent $mol_stringer_demo
		< clickerItem $mol_decker_item
			title \Buttons
			content < clickerContent $mol_clicker_demo
```

## Properties

**`items() : Array`**
Property where elements (components) should be placed.
 
# $mol_decker_item

**`title() : String`**
Title of the tab element

**`content() : Array`**
Content of the tab element
