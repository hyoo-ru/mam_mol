# $mol_linker

The component have an ability to patch the link leading to the current page. It can to add, change or remove parameters.

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_linker_demo)

## Properties

**`patch()`**

The patch could be set as the dictionary like `{ page : 'main' }`. 

```
$mol_linker
	arg * color \red
	childs / \Red
```

**`uri()`**

One more way to set the link in direct way.

```
$mol_linker
	uri \http://example.org
	childs / \example.org
```

The link leads to current page would be stylized in other way.
