# $mol_stacker

Component is used for separating display to two sides (main panel and addition panel)

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_stacker_demo)

## Usage example

```
$mol_stacker_demo $mol_stacker
	main $mol_pager_demo
	addon $mol_scroller childs / 
		< signup $mol_app_signup
```

## Properties

`mainer()`

`addoner()`

If it lacks of area then the additional panel collapses into narrow strip.
To expand addition panel and roll back you can click or swipe it.
The size of the additional panel is adjusted for the content size, but not to exceeds the half of the display.
