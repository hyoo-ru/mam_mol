# $mol_deck

The component which arrange content in multiple tabs.
 
## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_deck)

## Usage example

```
<= Info $mol_deck
	items /
		<= Main $mol_deck_item
			title <= Main_title @ \Main info
			content /
				\Main
		<= Addon $mol_deck_item
			title <= Addon_title @ \Addition data
			content /
				\Addon
```

## Properties $mol_deck

**`items() : $mol_deck_item[]`**

Returns list of $mol_deck_item.
 
# $mol_deck_item

**`title() : String`**

Title of the tab element.

**`content() : []`**

Content of the tab element.
