# $mol_hotkey

Plugin which adds handlers for keyboard keys.

## Usage example
```
plugins /
	<= Hotkey $mol_hotkey
		key *
			escape?val <=> clear?val null
			enter?val <=> submit?val null
```

## Properties

**`key(): { [ key in keyof typeof $mol_keyboard_code ]? : ( event : KeyboardCode )=> void }`**

Handlers dictionary.

## Modifiers

If true than check for same key are pressed.

**`mod_ctrl() : boolean`**

**`mod_shift() : boolean`**

**`mod_alt() : boolean`**
