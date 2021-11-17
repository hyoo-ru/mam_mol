# $mol_search

Search input with suggest and clear button.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_search_demo)

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
