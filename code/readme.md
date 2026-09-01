# $mol_code

Machine readable code input. On Cordova displays button to call native scanner.

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_code_demo)

## Usage example

```
<= Product_code $mol_code
	format \EAN_13
	value? <=> product_code? \
```

## Properties

**`format() : String`**

Returns format for code scanning.

# Supported formats

- QR_CODE
- DATA_MATRIX
- UPC_E
- UPC_A
- EAN_8
- EAN_13
- CODE_128
- CODE_39
- ITF
