# $mol_nav

Plugin which can navigate in list of items

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_nav_demo)

## Usage example
```
plugins /
	<= Nav $mol_nav
		keys_y <= component_list /
		current_y <=> selected_component -
```

## Properties

**`keys_y( keys? : $mol_view[] ) : $mol_view[]`**

Property `keys_y` is an array of items in which need navigate.
By default navigation fires on `up` or `down` key press.

**`keys_x( keys? : $mol_view[] ) : $mol_view[]`**

Property `keys_x` is an array of items in which need navigate.
By default navigation fires on `left` or `right` key press.

**`current_y( item? : any ) : any`**

Property `current_y` is an current item in `keys_y`.

**`current_x( item? : any ) : any`**

Property `current_x` is an current item in `keys_x`.

**`cycle( value? : boolean ) : boolean`**

Property `cycle` activate or disable cycle navigation ( If on last item we fires navigate on next item, it navigate on first item ).

## Modifiers

If true than check for same key are pressed.

**`mod_ctrl() : boolean`**
**`mod_shift() : boolean`**
**`mod_alt() : boolean`**
