# $mol_deck

The component which arrange content in multiple tabs.
 
## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_deck)

## Usage example

```
<= Info $mol_deck
	items /
		<= Main $mol_view
			title <= Main_title @ \Main info
			sub /
				\Main
		<= Addon $mol_view
			title <= Addon_title @ \Addition data
			sub /
				\Addon
```

## Properties $mol_deck

**`items() : $mol_view[]`**

Returns list of content elements. Property *title* will be display in tab.
