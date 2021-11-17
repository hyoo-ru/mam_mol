# $mol_card

Represents a common card. It can has several statuses at bottom line.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_card_demo)

## Usage example

```
<= User $mol_card
	content / <= user_name \
	status <= user_online_status \
```

## Properties

**`content(): []`**
  
Returns content of card.

**`status(): string`**  

Returns optional status string that will be placed at bottom line.
