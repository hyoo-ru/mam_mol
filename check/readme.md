# $mol_check

Checkbox UI component. See Variants for more concrete implementations.

## Variants

- [$mol_check_box](box) - simple checkbox
- [$mol_check_group](group) -  group of checkboxes
- [$mol_check_expand](expand) - expander for trees, lists, etc.
- [$mol_check_icon](icon) - icon checkbox

## [Online demos](https://mol.hyoo.ru/#!section=demos/filter=%20checkbox)

## Usage examples

### Basic

```
<= Spam $mol_check
	title <= spam_title @ \Send me some spam
```

### Box

```
<= Spam $mol_check_box
	title <= spam_title @ \Send me some spam
	checked?val <=> spam_needed?val true
	enabled <= spam_enabled false
```

## Properties

### Basic

**`checked( next? : boolean ) : boolean`**

Returns checked state of checkbox. User can switch them when checkbox is enabled.

### `box`, `expand`

**`enabled() : boolean`**

Returns true if checkbox can be switched by user.
