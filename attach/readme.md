# $mol_attach

Component that helps to upload files to server.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_attach_demo)

## Usage example
```
<= Logos $mol_attach
	items? <=> logos? /
		<= Item1 $mol_attach_item
			url_thumb \/mol/logo/logo.svg
			url_load \/mol/logo/logo.svg
		<= Item2 $mol_attach_item
			url_thumb \/mol/logo/logo.svg
			url_load \/mol/logo/logo.svg
```

## Properties of $mol_attach

**`items( next? : $mol_attach_item[] ) : $mol_attach_item[]`**

Returns list of $mol_attach_item.

## Properties of $mol_attach_item

**`url_thumb() : string`**

Returns url path to the thumbnail.

**`url_load() : string`**

Returns url for download.

