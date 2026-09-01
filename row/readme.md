# $mol_row

Horizontal list of blocks with margins between and around that can wraps to next line.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_row_demo)

## Usage example

```tree
<= Stat $mol_row
	sub /
		<= Progress $mol_portion
			portion <= progress 0
		<= Update $mol_button_minor
			title <= update_title @ \Update
```
