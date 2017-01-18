# $mol_deck

The component which arrange content in multiple tabs.
 
## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_deck)

## Usage example

```
$mol_deck 
	items /
		<= One $mol_deck_item
			title \Text1
			content <= OneFiller $mol_filler
		<= Two $mol_deck_item
			title \Text2
			content <= TwoFiller $mol_filler
```

## Properties

**`items() : Array`**
Property where elements (components) should be placed.
 
# $mol_deck_item

**`title() : String`**
Title of the tab element

**`content() : Array`**
Content of the tab element
