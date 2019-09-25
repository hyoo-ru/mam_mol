# $mol_map_yandex

Simple [Yandex Maps](https://tech.yandex.ru/maps/doc/jsapi/2.1/) wrapper.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_map_yandex)

## Usage example

```
<= Spb $mol_map_yandex
	center /
		60
		30
	zoom 10
	objects /
		<= Place $mol_map_yandex_mark
			pos <= place_pos /
				59.9
				30.3
			title <= place_title \Saint-Petersburg
			content <= place_content \It is Russia's second-largest city after Moscow
```

## Properties

**`zoom( next? : number ) : number`**

Zoom level.

**`center( next? : [ number , number ] ) : [ number , number ]`**

Position of center.

**`objects() : { object : ()=> any }[]`**

List of reactive map objects. Supported: [$mol_map_yandex_mark](mark).
