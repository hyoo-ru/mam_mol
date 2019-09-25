# $mol_code

Machine readable code input. On Cordova displays button to call native scanner.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_code)

## Usage example

```
<= Product_code $mol_code
	format \EAN_13
	value?val <=> product_code?val \
```

## Properties

**'format() : String'**

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
