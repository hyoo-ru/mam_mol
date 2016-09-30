# $mol_const

Returns closure that returns constant value. Value can be accessed by `"()"` field.

## Usage example

```typescript
module $ {
	
	const foo = { bar : $mol_const( Math.random() ) }
	
	console.assert( foo.bar() === foo.bar() )
	console.assert( foo.bar() === foo.bar['()'] )
	
}
```
