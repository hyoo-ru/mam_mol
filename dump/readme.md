# $mol_dump

Dumps any JS values.

## Dump single value

```tree
<= $mol_dump_value
	value <= data *
		foo 123
		bar 456
```

## Dump multiple values

```tree
<= $mol_dump_value
	values <= log /
		\foo
		123
		456
```
