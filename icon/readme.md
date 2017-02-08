# $mol_icon

This is collection of SVG icons. Ported from [google/material-design-icons](https://github.com/google/material-design-icons) (Apache2 license).

Used icons will be compiled to JS and bundled with other scripts.

**[Online demo](https://eigenmethod.github.io/mol/#demo=mol_icon)**

## Usage

***.view.tree**

```tree
<= Attach_icon $mol_icon_attach
```

## Define custom icon

```
$my_plus $mol_icon
	path \M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z
```

## Properties

**`path() : stirng`**

Geometry description in svg-path format.
