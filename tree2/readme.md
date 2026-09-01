# $mol_tree2

Tools for working with [Tree format](https://github.com/nin-jin/tree.d)

## Import

```ts
const tree = $mol_tree2_from_string(`
	foo
		bar
		lol
	hello \\world
`)
```

```ts
const tree_json = $mol_tree2_from_json({ hello: [ 'world' ] })
```

```ts
const tree_xml = $mol_tree2_xml_from_dom( document.body )
```
