# $mol_page

The component for creating page layout.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_page_demo)

## Usage examples

```
<= Sign_up $mol_page
	title <= Sign_up_title @ \Sign Up
	body / <= Sign_up_form $mol_view
	foot null
```

## Properties

**`title() : string`**

Returns page title.

**`head() : []`**

Returns content of Head.

**`tools() : []`**

Returns content of toolbar in Head.

**`body() : []`**

Returns content of Body.

`foot() : []`

Returns content of Foot.

## Hint

You can hide the header - override `Head null`:

```
<= Page_without_head $mol_page
	Head null
	title <= Page_without_title @ \Sign Up
	body / <= Page_without_form $mol_view
	foot null
```

This will also work for the others: [Head](https://github.com/hyoo-ru/mam_mol/blob/master/page/page.view.tree#L4), [Body](https://github.com/hyoo-ru/mam_mol/blob/master/page/page.view.tree#L14), [Foot](https://github.com/hyoo-ru/mam_mol/blob/master/page/page.view.tree#L17).
