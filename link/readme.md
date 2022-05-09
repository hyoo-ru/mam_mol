# $mol_link

Dynamic hyperlink. It can to add, change or remove parameters. The link leads to current page would be stylized in other way.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_link_demo)

## Properties

**`arg() : { [ name : string ] : string }`**

Returns patch that will be applied to page URL. 

```
<= Close $mol_link
	arg *
		demo null
	sub /
		<= close_title @ \Close demo
```

**`uri() : string`**

Returns target URI.

```
<= Example $mol_link
	uri \http://example.org
	sub /
		\example.org
```

**`hint() : string`**

Returns hint that displays on hover.

```
<= Example $mol_link
	uri \http://example.org
	title \example.org
	hint \Open external link
```

**`target() : string`**

[Name of window](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) to open link.

```
<= External $mol_link
	uri \http://example.org
	title \example.org
	target \_blank
```

**`file_name() : string`**

Used to download files. See "Download" in [demo](./demo/demo.view.tree)
