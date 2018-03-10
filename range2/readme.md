# $mol_range2

Lazy computable lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable.

# Creating

```
$mol_range2() // infinite number range from 0

$mol_range2( index => `#${ index + 1 }` ) // infinite range of custom values

$mol_range2( index => `#${ index + 1 }` , ()=> 10 ) // range of custom values that contains 10 elements
$mol_range2( index => `#${ index + 1 }` ).slice( 0 , 10 ) // same as above

$mol_range2().slice( 1 , 11 ) // numbers from 1 to 10
$mol_range2( index => index + 1 , ()=> 10 ) // same as above
```

# Convertation

```
// from Array
const array = [ 1 , 2 , 3 ]
const range = new $mol_range2_array( ... array )
```

```
// to Array
const range = $mol_range2().slice( 1 , 11 ) 
const array = [ ... range ]
```

# Lazy methods

- concat
- map
- slice
- some
- every
- entries
- keys

# Non lazy methods yet

- filter
- reduce
- reduceRight

# Forbidden mutable methods in derived ranges

- fill
- copyWithin
- pop
- push
- shift
- unshift
- reverse
- splice
- sort

# Examples

```
// iterate from 1 to 10
for( let i of $mol_range2().slice( 1 , 11 ) ) {
	/// ...
}
```

```
// infinite tasks
const tasks = $mol_range2( i => `task #${ i + 1 }` )

// infinite task rows
const task_rows = tasks.map( task => new Task_row( task ) )

// Only visible Task_row's will be created later
const task_rows_visible = task_rows.slice( offset , offset + limit )
```
