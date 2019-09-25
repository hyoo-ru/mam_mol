# $mol_touch

Plugin for touch gestures

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_touch_demo)

## Usage example

```
plugins /
	<= Touch $mol_touch
		zoom?val <=> zoom?val 1
		pan?val <=> pan?val /
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
