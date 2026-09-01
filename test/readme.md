# $mol_test

Defines and runs tests. For assertions you can use [$mol_assert](https://github.com/eigenmethod/mol/tree/master/assert).
See stack trace in console or enable "Pause on exceptions" to stop debugger on failed test.

## Example

```typescript
$mol_test({
    '2**3 = 8'() {
        $mol_assert_equal( 2**3 , 8 )
    } ,
    'async support' : 'async()=>{}' ,
})
```
