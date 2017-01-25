# $mol_pop

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_pop)

## Usage example
```
$mol_my_pop $mol_pop
    showed?val <=> value?val
    align \bottom_center
	Anchor <= Checkbox $mol_check
	    sub / \Check to show
	    checked?val <=> value?val
	bubble_content / \Can you see me?
```

## Properties

**`Anchor()`**
A component respect of which will be shown a Bubble

**`bubble_content()`**
A list of components in Bubble

**`showed()`**
Show or Hide Bubble of options depending on the takes value (boolean type).

**`align()`**
Takes a string and apply Bubble align
