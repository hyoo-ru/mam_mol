# $mol_deck

The component which arrange content in multiple tabs.
 
## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_deck)

## Usage example

```
<= Info $mol_deck
	items /
		<= Main *
			title <= Main_title @ \Main info
			Content <= Main_content $mol_view
				<= sub /
					\Main
		<= Addon *
			title <= Addon_title @ \Addition data
			Content <= Addon_content $mol_view
				sub <= /
					\Addon
```

## Properties $mol_deck

**`items() : { title : string , Content : $mol_view }[]`**

Returns list of item config:
 
*`title : string`*

Title of the tab element.

*`Content : []`*

Content of the tab element.
