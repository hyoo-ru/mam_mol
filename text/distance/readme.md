# $mol_text_distance

Calculates the lexicographical distance between two texts.

## Usage

```ts
// 0.18
$mol_text_distance(
	`little meerkat jumps over big elephant`,
	`over little elephant jumps big meerkat`,
)

// 0.66
$mol_text_distance(
	`A structural comparison of arbitrary objects is discussed.`,
	`Application of caching for correct comparison of cyclic references is disclosed.`,
)
```

## Algorithm

- A simple and fast.
- Normalized from 0 to 1.
- Rearrangement of words gives short distance.
- Independent of texts length.
- Independent of changes position.
- Complexity O(n).
- Memory usage O(log n).

## NPM Bundle

```sh
npm install mol_text_distance
```

1KB [![](https://badgen.net/bundlephobia/minzip/mol_text_distance)](https://bundlephobia.com/package/mol_text_distance)

```ts
import { $mol_text_distance } from 'mol_text_distance'
```
