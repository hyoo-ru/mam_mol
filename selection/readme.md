# $mol_selection

The [plugin](../plugin) which makes `Ctrl+A` (`Cmd+A`) select the whole content of the owner, including rows which are not rendered because of [virtualization](../list). Native copy works after that, no clipboard permissions are needed.

Bundled with [$mol_text](../text/text) and [$mol_page](../page). Hang it on any view:

```tree
plugins /
	<= Selection $mol_selection
```

The deepest owner around the caret or the focus handles the key. Inputs and other editable fields are left to the browser.

## Properties

**`static root(): Element | null`**

Element which content is selected now. `$mol_list` renders every row while it is inside. Resets when the selection collapses or leaves the element.
