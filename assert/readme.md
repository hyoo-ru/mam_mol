# $mol_assert

Collection of assert functions.

**`$mol_assert_equal( ... args )`** - all arguments must be structural equal.

```typescript
$mol_assert_equal( [1], [1], [1] ) // Passes
$mol_assert_equal( [1], [1], [2] ) // Fails because 1 !== 2
```

**`$mol_assert_unique( ... args )`** - all arguments must not be structural equal to each other.

```typescript
$mol_assert_unique( [1], [2], [3] ) // Passes
$mol_assert_unique( [1], [1], [2] ) // Fails because 1 === 1
```

**`$mol_assert_fail( handler : ()=> any , ErrorRight? : any )`** - handler must throw an error.

```typescript
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } , 'lol' ) // Passes because throws right message
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } , 'xxx' ) // Fails because throws left message
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } , Error ) // Passes because throws right class
$mol_assert_fail( ()=>{ throw new Error( 'lol' ) } , RangeError ) // Fails because error isn't RangeError
```
