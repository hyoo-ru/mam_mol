# $mol_select

Allow user to select value from various options and displays current value.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_select)

## Usage example

```
<= Color $mol_select
	value?val <=> color?val \
	dictionary <= colors *
		red \Red
		green \Green
		blue \Blue
```

## Properties

**`dictionary() : { [ key : string ] : any }`**

Property which takes a dictionary with options (key) & values (value).

**`value() : string`**

Property which should be changed `value()` by select option, based on their own property `options()`.

**`options() : string[]`**

Keys are possible values of `value()` property. If the property is not defined, value is a keys of `dictionary()`

**`options_filtered() : string[]`**

Logic of filter `options()`

**`option_content() : $mol_view[]`**

List of components in `Option()` component

**`option_label() : string`**

By default if  `Option()` not redefined, it has a textNode which takes a value from `option_label()`.
If `option_label()` property not redefined by user, value is `dictionary()[key]` or `key` 

**`no_options_message() : string`**

The property takes a string and show this string when `option_rows()` is empty.

**`options_showed() : boolean`**

Show or Hide List of options.

**`options_align() : string`**

Property extends from `$mol_pop`. Equals `align()` property

**`option_rows() : $mol_view[]`**

The list with `Option()` components
