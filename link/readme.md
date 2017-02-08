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

**`uri()`**

Returns new url.

```
<= Example $mol_link
	uri \http://example.org
	sub /
		\example.org
```

