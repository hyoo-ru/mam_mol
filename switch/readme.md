# $mol_switch 

Buttons which switching the sate;

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_switch_demo)

## Usage example

```
$mol_switch
	value > color \
	options *
		red \Red
		green \Green
		blue \Blue
```

## Properties

**`value()`**

Property which should be changed `value()` by buttons based on their own property `options`.

**`options()`**
Keys are possible values of `value` property. That options are labels which would be visible to user.


**`enabled()`**

Property that turning on or off our switcher.
