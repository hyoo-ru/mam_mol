# $mol_vary

> VaryPack - simple fast compact data binarization format.

## Key Features

- **Deduplication by reference**: same structures are stored as links to first entry.
- **Intergated schema**: schema always stored with data.
- **Structural typing**: data mapped to classes by schema.
- **Decentralized extensibility**: custom types support without central registry.

## Comparison

- VaryPack: [$mol_vary](https://github.com/hyoo-ru/mam_mol/tree/master/vary) - reference implementation.
- CBOR: [cbor-x](https://github.com/kriszyp/cbor-x) - fastest implementation.
- MsgPack: [msgpackr](https://github.com/kriszyp/msgpackr) - fastest implementaion with all required extensions (which incompatible with other libs).

|                | $mol_vary | cbor-x    | msgpackr
|----------------|-----------|-----------|---------
| Language       | ✅ TS     | ✅ TS    | ❌ JS
| Performance    | 🆗 100%   | 🆗 100%  | ✅ +25%
| Packed Size    | 🆗 100%   | ❌ +33%  | ✅ +25%
| Lib Size       | ✅ 3KB    | ❌ 11 KB | ❌ 11 KB
| Compatible     | ✅ std    | ✅ std   | ❌ ext

[Benchmark](https://perf.js.hyoo.ru/#!bench=j1peaq_k376h9) results:

### Chrome 140
![](https://habrastorage.org/webt/mc/f_/9a/mcf_9andknqrhseh7u09kugoevo.png)

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
