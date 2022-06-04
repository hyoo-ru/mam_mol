# $mol_dimmer

Output text with dimmed mismatched substrings.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_dimmer_demo)

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
