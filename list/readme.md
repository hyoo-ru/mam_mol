# $mol_list

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_list_demo_tree)

The list of rows with lazy/virtual rendering support based on `minimal_height` of rows. 

## Usage example

Static list:

```
<= Users $mol_list
	rows /$mol_view
		<= User_1 $mol_view
		<= User_2 $mol_view
		<= User_3 $mol_view
	Empty <= Users_empty $mol_paragraph
		title \No users
```

Dynamic list:

```
<= Items $mol_list
	rows <= list_items /
		<= Item*0 $mol_link
			title <= item_title* \
```

## Properties

`rows() : []`

Returns list of rows.

`Empty(): $mol_view`

Returns empty list placeholder.
