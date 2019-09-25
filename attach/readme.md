# $mol_attach

Component that helps to upload files to server.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_attach)

## Usage example
```
<= Logos $mol_attach
	items?val <=> logos?val /
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

