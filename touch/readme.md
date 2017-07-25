# $mol_touch

Plugin for touch gestures

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_touch_demo)

## Usage example

```
plugins /
	<= Touch $mol_touch
		zoom?val <=> zoom?val 1
		swipe_right?event <=> open_menu?event null
		swipe_left?event <=> close_menu?event null
```

## Properties

**`zoom( next? = 1 ) : number`**

Current zoom value.

## Swipe events

**`swipe_left( next? : Event ) : Event`**
**`swipe_right( next? : Event ) : Event`**
**`swipe_top( next? : Event ) : Event`**
**`swipe_bottom( next? : Event ) : Event`**
