# $mol_number

Component for entering, incrementing and decrementing numeric values.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_number_demo)

## Usage example

```
<= Fees $mol_number
	value? <=> fees? null
	hint \0.01 .. 10.00
	enabled <= fees_changeable true
	precision0 .01
	value_min 0.01
	value_max 10
```

## Properties

**`value( next? : number ) : number`**

Property `value` is a currently displayed number.

**`hint() : string`**

Property `hint` inherits from `$mol_string` component.

**`enabled() : boolean`**

State of $mol_string component.

It is possible to set state for different part of component: input field, increase/decrease buttons:
* **`string_enabled() : boolean`**
* **`inc_enabled() : boolean`**
* **`dec_enabled() : boolean`**

**`precision() : number`**

Precision for input field step value for increase/decrease buttons. You can set individually precision and step value by using `precision_view` and `precision_change` properties.

**`precision_view() : boolean`**

Precision of the input field. For example, set `precision_view` to `0.01` for `0.xx` number format.

**`precision_change() : number`**

Step value for increase/decrease buttons.

**`value_min() : number`**

Limit the minimum value

**`value_max() : number`**

Limit the maximum value
