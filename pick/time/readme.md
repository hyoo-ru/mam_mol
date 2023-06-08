# $mol_pick_time

Time picker.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_pick_time_demo)

## Properties

**`value( next? : string ) : string`**

Time in `hh:mm` format.

```
<= Time $mol_pick_time
	value? <=> time? \04:20
```

**`value_moment( next? : $mol_time_moment ) : $mol_time_moment`**

Instance $mol_time_moment. (The component only changes the time in moment. The date remains the same)

```
<= Time $mol_pick_time
	value_moment? <=> plan_date? $mol_time_moment
```
