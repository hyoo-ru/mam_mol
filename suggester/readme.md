# $mol_suggester

Component that suggests text ends.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_suggester_demo)

## Usage example
```
$my_words $mol_suggester
	value > word \
	suggests /
		\delirious
		\stupendous
		\handsome
		\behave
		\crooked
```

## Properties

**`suggests() : string[]`**

Property `suggests` is an array to be shown while you typing.
There is another way to set `suggests`. You can add a method for it:
```
$my_searcher $mol_suggester
	suggests < autocompletes /
```
Where `threeSuggests` it's a some function which should return `string[]`.

Also you have an ability to change `suggests` list dynamically depending of user typing at suggester input field.
To implement that you must bind a `value` of `suggester` input to your property like in this example:
``` 
$my_searcher $mol_suggester
	value > query \
	suggests < autocompletes /
```
