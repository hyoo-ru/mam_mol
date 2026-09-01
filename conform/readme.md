# $mol_conform

Conforms two data structures to one with reference uniqueness for different content and reference identity for deep equal content.
This is same thing as React Reconciler but for any data. 

## Usage example

```typescript

class Point {
	constructor( public x = 0 , public y = 0 ) {}
}

$mol_conform_handler( Point , ( target : Point , source : Point )=> {
	if( target.x !== source.x ) return target
	if( target.y !== source.y ) return target
	return source
} )

const zero = new Point
const result = $mol_conform( target , source )

$mol_conform( [ new Point( 0 , 0 ) ] , [ zero ] ) // same as [ zero ]
$mol_conform( [ new Point( 0 , 1 ) ] , [ zero ] ) // not same as [ zero ]
```

# API

**`$mol_conform( target : Target , source : Source ) : Target`**

Conforms structures.

**`$mol_conform_handler( cl : typeof Class , handler : ( target : Class , source : Class )=> Class )`**

Provides custom conforming function for class (not for subclasses).

## Supported by default types

- Primitives: `Undefined`, `Null`, `Boolean`, `Number`, `String`.
- POJO: `Object`, `Array`, `TypedArray`.
- Native value objects: `Date`, `RegExp`.
