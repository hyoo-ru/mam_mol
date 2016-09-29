# $mol_defer

Execute callback deferred but immediately. 

## Usage example

```typescript
module $ {
	
	new $mol_defer( ()=> {
		console.log( 1 )
	} )
	
	new $mol_defer( ()=> {
		throw new Error( ';-)' )
	} )
	
	new $mol_defer( ()=> {
		console.log( 2 )
	} )
	
	throw new Error( ':-(' )
}
```

Output:
```
Uncaught Error: :-(
2
Uncaught Error: ;-)
1
```

# API

**`$mol_defer.run()`**

Run deferred tasks instantly.
