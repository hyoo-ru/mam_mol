# $mol_linker

The component could patch a link to the current page adding to it the parameters. 

## [Online demo](http://eigenmethod.github.io/mol//#demo=mol_linker_demo)

## Properties

**`patch()`**

The patch could be set as the dictionary like `{ page : 'main' }`. 

```
$mol_linker
	patch : dict
		\color
			: \red
	childs / \Red
```

**`uri()`**

One more way to set the link in direct way.

```
$mol_linker
	uri \http://example.org
	childs / \example.org
```

The link leads to current page would be non clickable.
