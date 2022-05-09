# $mol_book2

Root component for adaptivity to various screen sizes. Implements booklet UX.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_book2_demo)

## Usage example

```
$my_app $mol_book2
	pages /
		<= Menu $mol_page
		<= Main $mol_page
```

## Properties

`pages() : $mol_view[]`

The array of "pages". From left to right. Right page renders first.
