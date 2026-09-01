# $mol_string

An input field for entering single line text.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_string_demo)

## Usage example

```tree
<= Name $mol_string
	value? <=> name? \
	hint <= name_hint @ \Alice Smith
	enabled <= name_changeable true
```

## Properties

**`value( next? : string ) : string`**

Property `value` is a currently displayed string.

**`hint() : string`**

Placeholder text in the absence of any value.

**`enabled() : boolean`**

Whether the input is interactive.
