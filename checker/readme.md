# $mol_checker

A typical Checkbox element.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_checker_demo)

## Usage example
```
...
childs /	
	$mol_checker_ticker
		childs / \Checked
		checked true
		disabled true
```
## Properties

**`checked()`**

Property which state can be switched if a user clicked on element  

**`enabled()`**

Property is determine an ability of interacting to the component.

## Visualization

There are two separate component inherit from `$mol_checker`
 
**`mol_ticker`**
It looks like a default checkbox but uses a svg icon `check`

**`mol_expander`**
It looks like a chevron which can be rotate around itself.
