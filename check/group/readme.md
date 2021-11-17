# $mol_check_group

Checkbox for group of check boxes.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_check_group_demo)

## Usage example

```
<= All $mol_check_group
	title <= all_title @ \Check all
	checks <= all_check_boxes /
```

## Properties

**`checks() : $mol_chek`**

Returns array of [$mol_check](..) that should be controlled by $mol_check_group.

**`checked( next? : boolean ) : boolean`**

Returns true when some check boxes is checked. Toggles all checks on click.

**`enabled() : boolean`**

Returns true if checkbox can be switched by user.

**`fill() : boolean`**

Returns true when all check boxes is checked.
