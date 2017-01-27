# $mol_pop

Bubble that can be shown anchored to ancor element.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_pop)

## Usage example

```
$mol_pop
    showed?val <=> pop_showed?val
    align \bottom_center
	Anchor <= Checkbox $mol_check
	    sub / \Check to show
	    checked?val <=> pop_showed?val
	bubble_content /
		\Can you see me?
```

## Properties

**`Anchor() : $mol_view`**
A component respect of which will be shown a Bubble

**`bubble_content() : $mol_view[]`**
A list of components in Bubble

**`showed() : boolean`**
Show or Hide Bubble of options depending on the takes value.

**`align() : string`**
Returns a string and apply Bubble align
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
