# $mol_labeler

Provides label before the content.

##[Online demo](https://mol.js.org/app/demo/-/#demo=mol_labeler)

## Usage examples

```
<= Count $mol_labeler
	title <= count_label @ \Count
	content /
		<= count 0
```

## Properties

**`label(): $mol_view_content[]`** - content of label which renders above.

**`title(): string`** - title renders as label by default.

**`Content(): any`** - content view.

**`content(): any[]`** - content of content view.
