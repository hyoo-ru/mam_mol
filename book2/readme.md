# $mol_book2

Root component for adaptivity to various sreen sizes. Implements booklet UX.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_book2_demo)

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
