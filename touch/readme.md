# $mol_touch

Plugin for touch gestures.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_touch_demo)

## Usage example

```
plugins /
	<= Touch $mol_touch
		zoom? <=> zoom? 1
		pan? <=> pan? /
			0
			0
		swipe_right?event <=> open_menu?event null
		swipe_left?event <=> close_menu?event null
```

## Properties

**`zoom( next? = 1 ) : number`** - zoom level

**`pan( next? = [ 0 , 0 ] ) : [ number , number ]`** - offset vector

## Swipe events

**`swipe_from_left( next? : Event ) : Event`** - from left edge

**`swipe_from_right( next? : Event ) : Event`** - from right edge

**`swipe_from_top( next? : Event ) : Event`** - from top edge

**`swipe_from_bottom( next? : Event ) : Event`** - from bottom edge

**`swipe_to_left( next? : Event ) : Event`** - to left not from edge

**`swipe_to_right( next? : Event ) : Event`** - to right not from edge

**`swipe_to_top( next? : Event ) : Event`** - to top not from edge

**`swipe_to_bottom( next? : Event ) : Event`** - to bottom not from edge
