# $mol_number

Component to view and edit some number value.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_number)

## Usage example

```
<= Fees $mol_number
	value?val <=> fees?val null
	hint \0.01 .. 10.00
	enabled <= fees_changeable true
	precision .01
```

## Properties

**`value( next? : number ) : number`**

Property `value` is a currently displayed number.

**`hint() : string`**

Property `hint` inherits from `$mol_string` component

**`enabled() : boolean`**

Property `enabled` inherits from $mol_string component

But in `$mol_number` added some features to manage states of any part of component like buttons or input field.
We can turn off `$mol_number` component separately. To do it we should use some of the following properties:
* **`dec_enabled() : boolean`** - property responds for state of decrease button
* **`inc_enabled() : boolean`** - property responds for state of increase button
* **`string_enabled() : boolean`** - property responds for state of input

**`precision() : number`**

`$mol_number` can display numbers in any format user select for. `precision` is alias for `precisionView` and `precisionChange`.

**`precision_view() : boolean`**

For example if we want to show a number in fixed-point notation
we should set to `precisionView` property to a value that would be less then `0`. For example if we want to display 
number in `0.xx` format we should set `precisionView` to `0.01`.  

**`precision_change() : number`**

Also we can set `$mol_number` how it should increase of decrease the value in it's input. If we set `precisionChange` any number,
the value in its input field will be increased or decreased on this number.
