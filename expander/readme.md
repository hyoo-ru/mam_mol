# $mol_expander

Component which expands any content on title click.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_expander)

## Usage example

```
<= Spoiler $mol_expander
	label / \Murder is..
	content / \majordomo
```

## Properties

**`label(): []`**  

Returns button content. 

**`content(): any`**  

Returns expandable content.

**`expanded( next? : boolean ): boolean`**

Returns showing state of content.
