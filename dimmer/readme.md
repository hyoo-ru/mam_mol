# $mol_dimmer

Output text with dimmed not matched substrings.

## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_dimmer)

## Usage example

```
<= Aphorism $mol_dimmer
	haystack <= aphorism \Don't put all your eggs in one basket
	needle <= query \eggs
```

## Properties

**`haystack() : string`**

Returns full text to output.

**`needle() : string`**

Returns substring to highlight.
