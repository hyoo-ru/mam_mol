# $mol_page

The component for creating page layout.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_page)

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
