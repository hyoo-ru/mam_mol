# $mol_button

Simple button.

## [Online demo](https://mol.js.org/app/demo/-/#demo=mol_button)

## Usage example

Major button:
```
<= Submit $mol_button_major
	event_click?val <=> event_submit?val null
	title <= submit_label @ \Submit form
```

Minor button with custom content (icon and title):
```
<= Submit $mol_button_minor
	event_click?val <=> event_submit?val null
	sub /
		<= Submit_icon $mol_icon_cursor_default_click
		<= submit_label @ \Submit form
```

## Variations

**`$mol_button_major`** - Call-To-Action button
**`$mol_button_minor`** - Generic button

## Properties

**`enabled() : boolean`**

Button can be clicked when enable only.

**`event_click( next? : Event ) : Event`**

Stores last event when button activated. Overload this property to do your action instead.
