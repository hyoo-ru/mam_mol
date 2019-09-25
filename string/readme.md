# $mol_string

Input field to enter single line of text.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_string_demo)

## Usage example

```tree
<= Name $mol_string
	value?val <=> name?val \
	hint <= name_hint @ \Alice Smith
	enabled <= name_changeable true
```

## Properties

**`value( next? : string ) : string`**

Property `value` is a currently displayed string.

**`hint() : string`**

To display placeholder text on our `$mol_string` element we should use `hint` property.

**`enabled() : boolean`**

To turn off `$mol_string` we should use `enabled` property and set it to `false`. And if you don't want to turn off any element of `$mol_string` just write nothing.

**`debounce() : number`**

Debounce for value changing.
