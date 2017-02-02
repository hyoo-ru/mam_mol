# $mol_search

Component for search inputs with suggest and clearing support.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_search)

## Usage example

```
$my_words $mol_search
	query?val <=> word?val \
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
$my_search $mol_search
	suggests < autocompletes /
```
Where `autocompletes` it's a some function which should return `string[]`.

Also you have an ability to change `suggests` list dynamically depending of user typing at search input field.
To implement that you must bind a `query` of `$mol_search` input to your property like in this example:

``` 
$my_search $mol_search
	value?val <=> query?val \
	suggests <= autocompletes /
```
