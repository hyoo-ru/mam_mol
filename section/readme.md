# $mol_section

The component which contains head and content.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_section_demo)

## Usage example

With `content` property:

```
<= Info $mol_section
	head \Information
	content /
		<= Some_text $mol_view sub /
			\Quisque nec est eleifend nulla.
```

With `Content` property:

```
<= Info $mol_section
	head \Information
	Content $mol_filler
```

Use `h2` header (default is `h1`):

```
<= Info $mol_section
	level 2
```
