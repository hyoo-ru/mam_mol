# $mol_book

Component for lazy add and/or remove pages depending on the container size. Supports pop left of front page that hides when it blurs.

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

`event_front_up( next? : Event ) : Event`

Pop left front page.

`event_front_down( next? : Event ) : Event`

Hide front page is its poped.
