# $mol_book2_catalog

Variant of [$mol_book2](..) which draws menu in side bar on opens one of taken spreads.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_book2_catalog_demo)

## Usage example

```
<= Calatog $mol_book2_catalog
	param \size
	menu_title @ \Sizes
	menu_tools <= catalog_tools /
	spreads *
		small <= Small $mol_page
		medium <= Medium $mol_page
		large *
			page <= Large $mol_page
			menu_item_title \Custom item title
```

## Main Properties

`param(): string`

Location argument name.

`spreads(): Record< string, $mol_view >`

Dictionary which maps spread id to component.
