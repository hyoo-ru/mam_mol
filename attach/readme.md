# $mol_attach

Component that helps to upload files to server.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_attach)

## Usage example
```
$mol_attach_demo_filled $mol_attach
	items /
		<= Item1 $mol_attach_item
			url_thumb \/mol/logo/logo.svg
			url_load \/mol/logo/logo.svg
		<= Item2 $mol_attach_item
			url_thumb \/mol/logo/logo.svg
			url_load \/mol/logo/logo.svg
```

## Properties

**`url_thumb() : string`**

With the property user can specify the url path to the icon.

**`url_load() : string`**

Property that points to the url where to upload data.

