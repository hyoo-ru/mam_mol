# $mol_chat

Button to open embedded chat.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_chat_demo)

## Usage example

```
<= Chat $mol_chat
	seed <= seed \my-super-duper-id
	pages => chat_pages
```

## Properties

**`seed() : string`**

Global unique id of chat. Current host name by default.

**`pages() : $mol_page[]`**

List of chat pages. Render it where you want.
