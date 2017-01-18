# $mol_link

The component have an ability to patch the link leading to the current page. It can to add, change or remove parameters.

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_link)

## Properties

**`arg() : { [ name : string ] : () => string }`**

The patch could be set as the dictionary like `{ color : ()=> 'red' , sidebar : null }`. 

```
$mol_link
	arg *
		color \red
		sidebar null
	sub /
		\Red
```

**`uri()`**

One more way to set the link in direct way.

```
$mol_link
	uri \http://example.org
	sub /
		\example.org
```

The link leads to current page would be stylized in other way.
