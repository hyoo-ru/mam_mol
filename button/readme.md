# $mol_button

Simple button.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_button)

## Usage example
```
<= Submit $mol_button_major
	event_click?val <=> event_submit?val null
	title <= submit_label @ \Submit form
```

## Variations

**`$mol_button_major`** - Call-To-Action button
**`$mol_button_minor`** - Generic button
**`$mol_button_danger`** - Destructive button

## Properties

**`enabled() : boolean`**

Button can be clicked when enable only.

**`event_click( next? : Event ) : Event`**

Stores last event when button activated. Overload this property to do your action instead.
