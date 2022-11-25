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
