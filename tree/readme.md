# $mol_tree

Tree format support (parsing, serialization, processing).

[Reference implementation on D](https://github.com/nin-jin/tree.d)

## Articles

* [Tree — убийца JSON, XML, YAML и иже с ними](https://github.com/nin-jin/slides/tree/master/tree) - Tree format description

## MAM Usage

```typescript
const users = $mol_tree.fromString(`
user
	name \\Jin
	age 35
user
	name \\John
	age 25
`);
```

## NPM Usage

```sh
npm install mol_tree
```

```typescript
import { mol_tree as Tree } from 'mol_tree'

const users = Tree.fromString(`
user
	name \\Jin
	age 35
user
	name \\John
	age 25
`);
```

[![Edit $mol_type example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/moltree-example-58uzh)
