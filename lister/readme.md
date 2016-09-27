# $mol_lister

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_lister_demo)

The list of strings with lazy rendering.

## Usage example

```
$mol_lister
	rows
		\John
```
## Properties

`rowHeightMin()`

The minimal height of the string
Based on this value it is determined how many stings would be rendered, to fill viewport taking into account scrolling size.

`rows()`

Property by which we set the list of strings. It can be of an Array or a lazy range type. ([$mol_range](../range)).


