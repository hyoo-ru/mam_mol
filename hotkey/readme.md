# $mol_hotkey

Plugin which adds handlers for keyboard keys.

## Usage example
```
plugins /
	<= Hotkey $mol_hotkey
		key *
			escape? <=> clear? null
			enter? <=> submit? null
```

## Properties

**`key(): { [ key in keyof typeof $mol_keyboard_code ]? : ( event : KeyboardCode )=> void }`**

Handlers dictionary. See [$mol_keyboard_code](https://github.com/eigenmethod/mol/blob/master/keyboard/code/code.ts) for key names.

## Modifiers

If true then check for same key are pressed.

**`mod_ctrl() : boolean`**

**`mod_shift() : boolean`**

**`mod_alt() : boolean`**
