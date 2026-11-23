# $mol_selection

The [plugin](../plugin) which makes `Ctrl+A` (`Cmd+A`) put the owner source `text` into the clipboard. Nothing is selected or rendered for that, so rows hidden by [virtualization](../list) are not lost.

Bundled with [$mol_text](../text/text), where the source is the markdown. Hang it on any view which has a source text:

```tree
plugins /
	<= Selection $mol_selection
		text <= text
```

The deepest owner around the caret or the focus handles the key. Inputs, other editable fields and owners with an empty `text` are left to the browser.

## Properties

**`text(): string`**

Source text which goes to the clipboard on `Ctrl+A`.
