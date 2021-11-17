# $mol_scroll

Scrolling pane.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_scroll_demo)

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
