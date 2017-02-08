# $mol_switch 

Buttons which switching the sate;

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_switch_demo)

## Usage example

```
<= Color $mol_switch
	value?val <=> color?val \red
	options <= colors *
		red \Red
		green \Green
		blue \Blue
```

## Properties

**`value( next? ) : string`**

Property which should be changed `value()` by buttons based on their own property `options`.

**`options() : { [ key : string ] : any }`**

Keys are possible values of `value` property. That options are labels which would be visible to user.

**`enabled() : boolean`**

Property that turning on or off our switcher.
