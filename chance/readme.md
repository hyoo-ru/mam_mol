# $mol_chance

Returns one of the values with the specified probability.

## API

```ts
$mol_chance( ... chance_list: Array< [ number, ( ()=> T ) ] > ): T
```

```ts
const color = $mol_chance(
	[ 60, ()=> 'black' ],
	[ 20, ()=> 'white' ],
	[ 15, ()=> 'red' ],
	[ 5, ()=> random_color() ],
)

// 60% that color will be black, 20% - white and so on...
// in 5% will be called function to generate random color.
```

Note: chances are normalized by their values sum. Example: chances [ 20, 50 ] will be converted to ~71% and ~29% respectively.
