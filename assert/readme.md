# $mol_assert

Collection of assert functions.

**`$mol_assert_equal< Value >( ... args : Value[] )`** - all arguments must be equal.

```
$mol_assert_equal( 1 , 1 , 2 ) // Fails because 1 !== 2
```

**`$mol_assert_unique< Value >( ... args : Value[] )`** - all arguments must be not equal to each other.

```
$mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
```

**`$mol_assert_fail( handler : ()=> any , ErrorRight? : any )`** - handler must throw an error.

```
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } ) // Passes because throws error
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } , RangeError ) // Fails because error isn't RangeError
```
