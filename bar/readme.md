# $mol_bar

The component for grouping several components in one composite control.

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_bar)

## Usage examples
```
<= Search $mol_bar
	sub /
		< String $mol_string
			value?val <=> query?val \
		< Submit $mol_button_minor
			title <= submit_label @ \Submit
```
