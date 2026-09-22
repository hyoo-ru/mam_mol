# $mol_hotkey2

Plugin which adds handlers for keyboard keys.

## Usage example
```
plugins /
	<= Hotkey $mol_hotkey2
		action *
			escape? <=> clear? null
			ctrl_enter? <=> submit? null
```

## Properties

**`action(): Record< string, ( event : KeyboardCode )=> void >`**

Handlers dictionary. See [$mol_keyboard_code](../keyboard/code/code.ts) for key names.

## Modifiers

Supported modifiers: **ctrl**, **alt**, **shift**. Order is important. Example:

```
ctrl_alt_shift_del? <=> reboot? null
```
