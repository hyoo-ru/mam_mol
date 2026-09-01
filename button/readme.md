# $mol_button

Simple button.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_button_demo)

## Usage example

Major button:

```
<= Submit $mol_button_major
	click? <=> submit? null
	title <= submit_label @ \Submit form
```

Minor button with custom content (icon and title):

```
<= Submit $mol_button_minor
	click? <=> submit? null
	sub /
		<= Submit_icon $mol_icon_cursor_default_click
		<= submit_label @ \Submit form
```

## Variations

[$mol_button_major](major) - Call-To-Action button

[$mol_button_minor](minor) - Generic button

[$mol_button_copy](copy) - Copy ```text()``` value to clipboard

[$mol_button_download](download) - Download file from ```uri()``` or a ```blob()```

[$mol_button_open](open) - File open button

[$mol_button_share](share) - Share ```title()``` and ```uri()``` to other app 

[$mol_button_typed](typed) - Button with basic styles for buttons

## Properties

**`enabled() : boolean`**

The button can only be pressed when it is enabled.

**`click( next? : Event ) : Event`**

Stores last event when button activated. Overload this property to do your action instead.
