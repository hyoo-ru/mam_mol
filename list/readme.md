# $mol_list

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_list_demo_tree)

The list of rows with lazy/virtual rendering support based on `minimal_height` of rows.

> `$mol_list` should contain only components that inherits `$mol_view`. You should not place raw strings or numbers in list.

## Usage example

### Static list:

```
<= Users $mol_list
	rows /
		<= User_1 $mol_view
		<= User_2 $mol_view
		<= User_3 $mol_view
	Empty <= Users_empty $mol_paragraph
		title \No users
```

### Dynamic list:

```
<= Items $mol_list
	rows <= list_items /$mol_view

Item* $mol_link
	title <= item_title* \
```

> `list_items /$mol_view` [explain](https://mol.hyoo.ru/#!section=view.tree/source=%24example%20%24mol_object%0A%09list_items%20%2F%0A%09list_items_typed%20%2F%24mol_view%0A) - typed list of items

or similar form with `Item` under `list_items`

```
<= Items $mol_list
	rows <= list_items /
		<= Item*0 $mol_link
			title <= item_title* \
```

> `Item*0` [explain](https://mol.hyoo.ru/#!section=view.tree/source=%24my_example%20%24mol_object%0A%09foo%20%3C%3D%20spreads*foo%0A%09item_at_0%20%3C%3D%20items*0%0A) 

Override `list_items` in `view.ts` file:

```ts
@ $mol_mem_key
override item_title( id : string ) {
	return `Item#${ id }`
}

override list_items() {
	return this.list_items_ids().map( id => {
		return this.Item( id )
	} )
}

list_items_ids() { // declare your logic
	return [1,2,3]
}
```

## Properties

`rows() : []`

Returns list of rows.

`Empty(): $mol_view`

Returns empty list placeholder.
