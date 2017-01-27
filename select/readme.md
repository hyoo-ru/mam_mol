# $mol_select

Select element

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_select_demo)

## Usage example

```
$my_color_select $mol_select
	dictionary <= colors *
		red \Red
		green \Green
		blue \Blue
```

## Properties

**`dictionary()`**
Property which takes a dictionary with options (key) & values (value).

**`value()`**
Property which should be changed `value()` by select option, based on their own property `options()`.

**`options()`**
Keys are possible values of `value()` property. If the property is not defined, value is a keys of `dictionary()`

**`search_breakpoint()`**
The property takes a number. If options count more than the property, select activate a search string.

**`searchable()`**
Takes boolean and set search in select

**`option_content()`**
List of components in `Option()` component

**`option_label()`**
By default if  `Option()` not redefined, it has a textNode which takes a value from `option_label()`.
If `option_label()` property not redefined by user, value is `dictionary()[key]` or `key` 

**`no_options_message()`**
The property takes a string and show this string when `option_rows()` is empty.

**`options_showed()`**
Show or Hide List of options depending on the takes value (boolean type).

**`options_align()`**
Property extends from `$mol_pop`. Equals `align()` property

**`option_rows()`**
The list with `Option()` components

**`options_filtered()`**
Logic of filter `options()`
