# $mol_dump

Dumps any JS values.

## Dump single value

```tree
<= Dump $mol_dump_value
	value <= data *
		foo 123
		bar 456
```

## Dump multiple values in a row

```tree
<= Log $mol_dump_list
	values <= log /
		\foo
		123
		456
```

## NPM Usage

[Sandox](https://codesandbox.io/s/mol-dump-lib-8ly34z?file=/index.html)

```js
import { $mol_view_component, $mol_dump_value } from "mol_dump_lib"
$mol_view_component( $mol_dump_value )
```

```html
<mol-dump-value value='{ "foo": 777 }'></mol-dump-value>
```

```js
el.view.value( [777] )
```