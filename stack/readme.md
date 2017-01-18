# $mol_stack

Component is used for separating display to two sides (main panel and addition panel)

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_stack)

## Usage example

```
$mol_stack_demo $mol_stack
	main /
		<= Main_page $mol_page_demo
	addon /
		<= Addon_page $mol_scroll
			sub / 
				<= Signup $mol_app_signup
```

## Properties

`main() : Array`
The content of the main panel.

`addon() : Array`
The content of the the additional panel.

If it lacks of area then the additional panel collapses into narrow strip.
To expand addition panel and roll back you can click or swipe it. (Swiping is not supported yet)
The size of the additional panel is adjusted for the content size, but not to exceeds the half of the display.
