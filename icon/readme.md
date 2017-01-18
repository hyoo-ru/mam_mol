# $mol_icon

This is collection of SVG icons. Ported from [google/material-design-icons](https://github.com/google/material-design-icons) (Apache2 license).

Used icons will be compiled to JS and bundled with other scripts.

**[Online demo](https://eigenmethod.github.io/mol/#demo=mol_icon_demo)**

## Usage

***.view.tree**

```tree
$my_attacher $mol_button
	sub /
		< icon $mol_icon_attach
```

***.view.css**

```
[my_attacher_icon]:hover {
	fill : blue;
}
```

## Define custom icon

```
$my_plus $mol_icon
	path \M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z
```

## Properties

**`path() : stirng`**

Geometry description in svg-path format.
