# $mol_book

Component is used for lazy add and/or remove screens depending on the size screen ( `page` ) size

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_book_demo)

## Usage example

```
$my_app $mol_book
	pages /
		<= Nav_bar $side_menu
			minimal_width 100
		<= Main $main_page
			minimal_width 400
```

## Properties

`pages() : $mol_view[]`

The array of "pages"
