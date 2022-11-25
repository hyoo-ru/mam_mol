# $mol_lights

Switcher between light/dark themes (usually for `$mol_theme_auto` plugin).

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_lights_demo)

## Usage example

Sample usage:

```
plugins /
	<= Theme $mol_theme_auto
body /
	<= Lighter $mol_lights_toggle
```

Use:

**`$mol_lights_toggle`** - button for switching lights.


### Notes

Plugins are components without their own DOM element, but instead use the host DOM element (like Angular's directives)
