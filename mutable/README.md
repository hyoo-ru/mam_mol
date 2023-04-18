# $mol_mutable

Mutable way for immutable patch.

```ts
const prev = {
	foo: [ 1, 2, 3 ],
	bar: { lol: 'xxx' },
}

const mut = $mol_mutable( prev )
mut.foo[1]( v => -v )
mut.foo[1]( v => v + 2 )
console.log( mut.foo() ) // [ 1, 0 , 3 ]

const next = mut()
// prev !== next
// prev.foo == [ 1, 2, 3 ]
// next.foo == [ 1, 0, 3 ]
// prev.bar === next.bar
```
