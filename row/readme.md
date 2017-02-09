# $mol_row

Horizontal list of blocks with margins between and around.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_row)

## Usage example

```tree
<= Stat $mol_row
	sub /
		<= Progress $mol_portion
			portion <= progress 0
		<= Update $mol_button_minor
			title <= update_title @ \Update
```
