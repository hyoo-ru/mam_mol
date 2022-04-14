# $mol_check

Checkbox UI component. See Variants for more concrete implementations.

## Variants

- [$mol_check_box](box) - simple checkbox
- [$mol_check_group](group) -  group of checkboxes
- [$mol_check_expand](expand) - expander for trees, lists, etc.
- [$mol_check_icon](icon) - icon checkbox

## Usage example

```
<= Spam $mol_check
	title <= spam_title @ \Send me some spam
```

## Properties

**`checked( next? : boolean ) : boolean`**

Returns checked state of checkbox. User can switch them when checkbox is enabled.
