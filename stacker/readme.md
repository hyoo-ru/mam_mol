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

`main() : Array`
The content of the main panel.

`addon() : Array`
The content of the the additional panel.

If it lacks of area then the additional panel collapses into narrow strip.
To expand addition panel and roll back you can click or swipe it. (Swiping is not supported yet)
The size of the additional panel is adjusted for the content size, but not to exceeds the half of the display.
