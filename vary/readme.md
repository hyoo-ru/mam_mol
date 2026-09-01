# $mol_vary

> Reference implementation of VaryPack - simple fast compact data binarization format.

## Key Features

- **Deduplication by reference**: same structures are stored as links to first entry. AKA "structured clone".
- **Intergated schema**: schema always stored with data. AKA "schema less".
- **Structural typing**: data mapped to classes by schema. Unique feature!
- **Decentralized extensibility**: custom types support without central registry. Unique feature!
- **Single-pass**: used auto-growable internal buffer.
- **Easy debug**: tiny ints are packed as is, special types are packed as char.

## Supported types

- Primitives: `null`, `undefined`, `boolean`, `number`, `bigint`, `string`.
- Buffers: `Uint*Array`, `Int*Array`, `BigUint64Array`, `BigInt64Array`, `Float*Array`.
- Objects: `Array`, `Object`, `Date`, `Map`, `Set`, `Element`.

## Comparison

- VaryPack: [$mol_vary](https://github.com/hyoo-ru/mam_mol/tree/master/vary) - reference implementation.
- CBOR: [cbor-x](https://github.com/kriszyp/cbor-x) - fastest implementation with all required extensions (which are standardized, although its don't have wide support).
- MsgPack: [msgpackr](https://github.com/kriszyp/msgpackr) - fastest implementaion with all required extensions (which incompatible with other libs).

|                | $mol_vary | cbor-x      | msgpackr
|----------------|-----------|-------------|---------
| Language       | ✅ TS     | ✅ TS+DTS  | ❌ JS+DTS
| Performance    | ⭕ 100%   | ✅ +20%    | ✅ +50%
| Packed Size    | ✅ 100%   | ❌ +40%    | ❌ +30%
| Lib Size       | ✅ 4KB    | ❌ 11 KB   | ❌ 11 KB
| Compatibility  | ✅ std    | ⭕ ext-std | ❌ ext

[Benchmark](https://perf.js.hyoo.ru/#!bench=j1peaq_k376h9) results:

### Chrome 142
![](https://habrastorage.org/webt/72/hw/dl/72hwdlo7d_ijur4as3epgiynkpc.png)

## API

### Usage from NPM

Install [mol_vary](https://www.npmjs.com/package/mol_vary):

```sh
npm install mol_vary
```

Add import: 

```ts
import { $mol_vary } from 'mol_vary'
```

### Binarization

```ts
const buffer = $mol_vary.pack( list )
```

### Pasing

```ts
const list = $mol_vary.take( buffer )
```

### Register custom types

```ts
class Foo {
	
	constructor(
		readonly a: number,
		readonly b: number,
	) {}
	
}

// Make isolated Vary
const Vary = $mol_vary.zone()

// Add custom type support
Vary.type(
	Foo, // Instance super class
	[ 'a', 'b' ], // Keys as shape
	foo => [ foo.a, foo.b ], // Vals extractor
	([ a, b ])=> new Foo( a, b ), // Factory from vals
)

// Usage
const buffer = Vary.pack([ new Foo( 3, 4 ) ])
const foo = Vary.take( buffer )[0]
```

## Internals

### Binary Layout

![](./diagram/layout.png)

### Examples

![](./diagram/examples.png)
