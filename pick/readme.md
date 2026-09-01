# $mol_pick

Pop-up display and hide by mouse click, also hide by unfocus.

Based on [$mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.

## [Online demo](https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo)

## Usage example

```
<= Pick $mol_pick
	hint @ \Click to show popup
	trigger_content /
		<= popup_trigger \?
	bubble_content /
		<= popup_content @ \This is popup content
```

## Extends 

[$mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo)

## Properties

`trigger_content` will follow the `trigger_content` component.

**`trigger_content() : []`**

The array of trigger content. Click on trigger show/hide bubble.

**`bubble_content() : []`**

The array of popup content.
