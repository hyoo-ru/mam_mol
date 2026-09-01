# $mol_range2

Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable.

# Creation

```ts
$mol_range2() // infinite number range from 0

$mol_range2( index => `#${ index + 1 }` ) // infinite range of custom values

$mol_range2( index => `#${ index + 1 }` , ()=> 10 ) // range of custom values that contains 10 elements
$mol_range2( index => `#${ index + 1 }` ).slice( 0 , 10 ) // same as above

$mol_range2().slice( 1 , 11 ) // numbers from 1 to 10
$mol_range2( index => index + 1 , ()=> 10 ) // same as above
```

# Convertation

```ts
// from native Array
const array = [ 1 , 2 , 3 ]
const range = $mol_range2( array )
```

```ts
// to native Array
const range = $mol_range2().slice( 1 , 11 ) 
const array = [ ... range ]
```

# Lazy methods

- concat
- map
- slice
- filter
- toReversed
- some
- every
- entries
- keys

# Non lazy methods

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

```ts
// iterate from 5 to 10
for( let i of $mol_range2().slice( 5 , 11 ) ) {
	/// ...
}
```

```ts
// infinite tasks
const tasks = $mol_range2( i => `task #${ i + 1 }` )

// infinite task rows
const task_rows = tasks.map( task => new Task_row( task ) )

// Only visible Task_row's will be created later
const task_rows_visible = task_rows.slice( offset , offset + limit )
```
