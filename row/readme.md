# $mol_row

Horizontal list of blocks with indents between the elements.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_row)

## Usage example

```
$mol_row	
	sub /
		<= Progress $mol_portion
			portion <= progress 0.33
		<= Update $mol_button_minor
			sub /
				\ Update
```
