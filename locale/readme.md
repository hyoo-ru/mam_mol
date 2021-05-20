# $mol_locale

Simple solution for translation, interpolation and pluralization.

###### Translation ######

```tree
	text @ \Hello
```

en.json file automatically will be generated as *.tree.locale=cs.json `./-view.tree` directory. You need to copy it to component's directory and rename to target language and translate it. Method `$mol_locale.lang(language)` can be used for changing language.

###### Interpolation & pluralization ######

* Use `||||` as delimiter for plural forms.
* To interpolate use `%{ foo }` markup.
* Add to option suffix ` is plural` if there are more than one options for interpolating, e.g `%{ foo is plural }`. Otherwise 1st option will be used.
* Option for interpolating you can use: array (to get count of items); getter function; scalar string or number or boolean.

Examples:

```tree
$mol_locale_demo_row $mol_view
	index?val 0
	sub /
		<= text @ \I have %{index} fox |||| I have %{index} foxes
```

When more than one interpolated options: 

```
$mol_locale_demo $mol_demo_small
	title @ \Some Book
	count 1
	sub /
		<= test $mol_paragraph title @ \ %{title} - %{count is plural} page |||| %{title} - %{count} pages
```

Example of usage in code

```ts
title() {
	return this.$.$mol_locale.t({
		// "$mol_locale_demo_total_rows": "Total: %{items} row |||| Total: %{items} rows",
		key: '$mol_locale_demo_test',
		params: {items: 70}
	})
}
```
