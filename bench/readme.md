# $mol_bench

Benchmark results visualizer.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_bench_demo)

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

## Extends: [$mol_grid](https://github.com/hyoo-ru/mam_mol/tree/master/grid)
