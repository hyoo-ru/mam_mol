# $mol_const

Returns closure that returns constant value. Value can be accessed by `"()"` field.

## Usage example

```typescript
namespace $ {
	
	const rnd = $mol_const( Math.random() )
	
	console.assert( rnd() === rnd['()'] )
	
}
```
