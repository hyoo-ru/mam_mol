# $mol_bar

The component for grouping several components in one composite control.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_bar_demo)

## Usage examples
```
<= Search $mol_bar
	sub /
		<= String $mol_string
			value? <=> query? \
		<= Submit $mol_button_minor
			title <= submit_label @ \Submit
```
