# $mol_pop

`Bubble` that can be shown anchored to `Anchor` element.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_pop_demo)

## Usage example

```
<= Hint $mol_pop
	showed <= hint_showed? 0
	align \bottom_center
	Anchor <= Hint_trigger $mol_check
		title \?
		checked? <=> hint_showed? 0
	bubble_content /
		<= hint_message @ \You can see me wen you want.
```

## Properties

**`Anchor() : $mol_view`**

`Bubble` will follow the `Anchor` component.

**`bubble_content() : $mol_view[]`**

Content of `Bubble`.

**`showed() : boolean`**

Shows `Bubble` if `true`.

**`align() : string`**

Align of `Bubble` to `Anchor`.

## Supported aligns

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
