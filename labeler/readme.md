# $mol_labeler

Provides label before the content.

##[Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_labeler_demo)

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
