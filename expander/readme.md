# $mol_expander

Component which expands any content on title click.

## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_expander)

## Usage example

```
<= Spoiler $mol_expander
	label / \Murder is..
	content / \majordomo
	Tools <= Spoiler_tools $mol_view
		sub /
			<= Lock_icon $mol_icon_lock
```

## Properties

**`label(): []`**  

Returns button content. 

**`content(): any`**  

Returns expandable content.

**`expanded( next? : boolean ): boolean`**

Returns showing state of content.

**`Tools(): $mol_view`**

To display additional items
