# $mol_textarea

Input field to enter multiple line text.

## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_textarea_demo)

## Usage example

```tree
<= Description $mol_textarea
	value?val <=> description?val \
	hint <= description_hint @ \Descr
	enabled <= description_changeable true
```

## Properties

**`value( next? : string ) : string`**

Property `value` is a currently displayed text.

**`hint() : string`**

To display placeholder text on our `$mol_string` element we should use `hint` property.

**`enabled() : boolean`**

Allowed text changing or not.
