# $mol_search

Search input with suggest and clear button.

## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_search)

## Usage example

```
<= Words $mol_search
	query?val <=> word?val \
	suggests <= suggests /
		\delirious
		\stupendous
		\handsome
		\behave
		\crooked
```

## Properties

**`suggests() : string[]`**

Returns list of suggested strings.
