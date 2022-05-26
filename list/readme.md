# $mol_list

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_list_demo)

The list of rows with lazy/virtual rendering support based on `minimal_height` of rows. 

## Usage example

```
<= Users $mol_list
	rows /$mol_view
		<= User_1 $mol_view
		<= User_2 $mol_view
		<= User_3 $mol_view
	Empty <= Users_empty $mol_paragraph
		title \No users
```

## Properties

`rows() : []`

Returns list of rows.

`Empty(): $mol_view`

Returns empty list placeholder.
