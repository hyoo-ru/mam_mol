# $mol_vary

> VaryPack - simple fast compact data binarization format.

## Key Features

- **Deduplication by reference**: same structures are stored as links to first entry.
- **Intergated schema**: schema always stored with data.
- **Structural typing**: data mapped to classes by schema.
- **Decentralized extensibility**: custom types support without central registry.

## Comparison

|                | $mol_vary | msgpackr | cbor-x | JSON
|----------------|-----------|----------|--------|--------
| Language       | TS        | JS       | TS     | Native
| Performance    | 1         | x2.5     | x2     | x0.8
| Size           | 1         | x2       | x2     | x2.5

[Benchmark](https://perf.js.hyoo.ru/#!bench=j1peaq_k376h9) results:

### Chrome 140
![](https://habrastorage.org/webt/gy/gd/lb/gygdlbfdqad8gdhbf-qddktgqh8.png)

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
	[ 'a', 'b' ], // keys for schema
	( a = 0, b = 0 )=> new Foo( a, b ), // factory
	foo => [ foo.a, foo.b ], // vals extractor
)
```
