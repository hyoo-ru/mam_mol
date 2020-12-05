# $mol_bench

Benchmark results visualisator.
 
## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_bench)

## Usage example

```
<= Result $mol_bench
	col_sort?val <=> result_sort?val \
	result?val <=> result_data?val *
```

## Properties

**`col_sort( next? : string ) : string`**

Field name for sorting.

**`result() : { [ row : string ] : { [ col : string ] : string } } `**

Dictionary of dictionaries of results.

## Extends: [$mol_grid](../grid)
