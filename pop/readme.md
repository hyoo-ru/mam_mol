# $mol_pop

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_pop)

## Usage example
```
$my_pop $mol_pop
    showed?val <=> pop_showed?val
    align \bottom_center
	Anchor <= Checkbox $mol_check
	    sub / \Check to show
	    checked?val <=> pop_showed?val
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
* `left_top`
* `left_center`
* `left_bottom`
* `right_top`
* `right_center`
* `right_bottom`
* `center`
* `top_left`
* `top_center`
* `top_right`
* `bottom_left`
* `bottom_center`
* `bottom_right`
