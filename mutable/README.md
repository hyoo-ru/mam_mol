# $mol_mutable

Mutable way for immutable patch.

```ts
const prev = {
	foo: [ 1, 2, 3 ],
	bar: { lol: 'xxx' },
}

const mut = $mol_mutable( data )
mut.foo[1]( v => -v )
const next = mut()

// prev !== next
// next.foo == [ 1, -2, 3 ]
// prev.bar === next.bar
```