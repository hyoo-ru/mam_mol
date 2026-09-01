# $mol_link_lazy

Hyperlink with lazy generated (on `mousedown` event) URI. 

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_link_lazy_demo)

## Usage example

view.tree

```
<= Search $mol_link_lazy
	uri_generated <= uri_generated \
	file_name <= download_file \generated.csv
	sub /
		<= Download_icon $mol_icon_download
		<= download_label \Download
```

view.ts

```ts
override uri_generated() {
	const blob = new Blob( ['hello;world\nhello1;world2'] , { type: 'text/csv' } )
	return $mol_dom_context.URL.createObjectURL( blob )
}
```

## Extends [$mol_link](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_link_demo)

## Properties

**`uri_generated() : string`**

Returns the string that is set in the URI when the link is clicked (on `mousedown` event).


