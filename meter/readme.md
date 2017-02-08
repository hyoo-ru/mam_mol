# $mol_meter

Plugin which get actual sizes and offsets 

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_meter_demo)

## Usage example
```
plugins /
	<= Meter $mol_meter
		width => cur_width
		height => cur_height
```

## Properties

**`width( value? : number ) : number`**

Property `width` is a actual width (`px`) of component.

**`height( value? : number ) : number`**

Property `height` is a actual height (`px`) of component.

**`top( value? : number ) : number`**

Property `top` is a actual offset from the top (`px`) of component.

**`bottom( value? : number ) : number`**

Property `bottom` is a actual offset from the bottom (`px`) of component.

**`right( value? : number ) : number`**

Property `right` is a actual offset from the right (`px`) of component.

**`left( value? : number ) : number`**

Property `left` is a actual offset from the left (`px`) of component.
