# $mol_suggester

Component that suggests and helps to find anything.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_suggester_demo)

## Usage example
```
$mol_suggester_demo $mol_suggester
	focused true
	suggests /
		\delirious
		\stupendous
		\handsome
		\behave
		\crooked
```

## Properties

**`focused : boolean`**

Property `focused` is a state for displaying list. If this property is set to true then suggester would be always opened 
and closed if in other way. Don't set this parameter if you want suggester be dynamic.

**`suggests : Array<string>`**

Property `suggests` is an array to be shown while you typing or if focused set to true this array always be shown.
There is another way to set `suggests`. You can add a method for it:
```
$mol_suggester_demo $mol_suggester
	suggests < threeSuggests /
```
Where `threeSuggests` it's a some function which should return `Array<string>`

Also you have an ability to change `suggests` list dynamically depending of user typing at suggester input field.
For realization it you can bind a `value` of `suggester` input to your property like in this example:
``` 
$mol_suggester_demo $mol_suggester
	suggests < threeSuggests /
	value > demoCode \
```
Where `demoCode` it's a some function which should return `Array<string>`
