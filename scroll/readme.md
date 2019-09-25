# $mol_scroll

Scrolling pane.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_scroll)

## Usage example

```
<= Body $mol_scroll
	sub /
		<= Text $mol_filler 
```

## Properties

`scroll_top( offset? ) : number`

Scrolling offset from top corner.

`scroll_left( offset? ) : number`

Scrolling offset from left corner.

## Context extensions

`this.$.$mol_scroll_top() : number`

Scrolling offset from top corner.

`this.$.$mol_scroll_left() : number`

Scrolling offset from left corner.

`this.$.$mol_scroll_moving() : boolean`

True while scrolling changing. False when scrolling stops.
