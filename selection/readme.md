# $mol_selection

The [plugin](../plugin) which makes `Ctrl+A` (`Cmd+A`) select the whole owner and puts its source `text` into the clipboard on copy. Nothing is rendered for that, so rows hidden by [virtualization](../list) are not lost and no clipboard permissions are needed.

Bundled with [$mol_text](../text/text), where the source is the markdown. Hang it on any view which has a source text:

```tree
plugins /
	<= Selection $mol_selection
		text <= text
```

The deepest owner around the caret or the focus handles the key. Inputs and other editable fields are left to the browser. A partial selection or an empty `text` is copied by the browser as usual.

## Properties

**`text(): string`**

Source text which goes to the clipboard while the whole owner is selected.
