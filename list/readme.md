# $mol_list

##[Online demo](http://eigenmethod.github.io/mol/#demo=mol_list)

The list of rows with lazy rendering support based on `minimal_height` of rows. 

## Usage example

```
<= Users $mol_list
	rows /
		<= User_1 $mol_view
		<= User_2 $mol_view
		<= User_3 $mol_view
```

## Properties

`rows() : []`

Returns list of rows.
