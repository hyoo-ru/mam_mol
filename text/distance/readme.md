# $mol_text_distance

Calculates the lexicographical distance between two texts.

## Algorithm

- A simple and fast.
- Text profile based.
- Normalized from 0 (equal) to 1 (different).
- Rearrangement of words gives short distance.
- Different texts length support.
- Independent of changes position.
- Complexity O(n).
- Memory usage O(log n).
- For equal length texts it's a [metric](https://en.wikipedia.org/wiki/Metric_(mathematics)).

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

```ts
const profile1 = $mol_text_profile( `profile` )
const profile2 = $mol_text_profile( `prodir` )
const distance = $mol_text_profile_distance( profile1, profile2 ) // 0.54
```

## NPM Bundle

```sh
npm install mol_text_distance
```

1KB [![](https://badgen.net/bundlephobia/minzip/mol_text_distance)](https://bundlephobia.com/package/mol_text_distance)

```ts
import { $mol_text_distance } from 'mol_text_distance'
```
