# $mol_link

Dynamic hyperlink. It can to add, change or remove parameters. The link leads to current page would be stylized in other way.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_link)

## Properties

**`arg() : { [ name : string ] : string }`**

Returns patch that will be applied to page url. 

```
<= Close $mol_link
	arg *
		demo null
	sub /
		<= close_title @ \Close demo
```

**`uri() : string`**

Returns target uri.

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

