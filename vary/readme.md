# $mol_vary

> VaryPack - simple fast compact data binarization format.

## Key Features

- **Total deduplication**: equal strucrures are stored as links to first entry.
- **Intergated schema**: schema always stored with data.
- **Structural typing**: data mapped to classes by schema.
- **Direct Acyclic Graph model**: same structures may have different placements without cost.

## Comparison

[Benchmark](https://perf.js.hyoo.ru/#!bench=j1peaq_k376h9) results:

### Chrome 140
![](https://habrastorage.org/webt/7x/np/yb/7xnpybsfmozfeaexormj7b2v45a.png)

## API

```ts
import { $mol_vary } from 'mol_vary'
```

### Binarization

```ts
const buffer = $mol_vary.pack( any_data )
```

### Pasing

```ts
const data = $mol_vary.take( buffer )
```

### Register custom types

```ts
class Foo {
	
	constructor(
		readonly a: number,
		readonly b: number,
	) {}
	
}

$mol_vary.type(
	( a = 0, b = 0 )=> new Foo( a, b ), // factory
	foo => [ // extractor
		[ 'a', 'b' ], // keys
		[ foo.a, foo.b ], // vals
	],
)
```
