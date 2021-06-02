# $mol_type

Collection of TypeScript meta types for complex logic.

![Type Asserts](https://i.imgur.com/CNI5KvX.png)

# MAM Usage

```typescript
type first_of_tuple = $mol_type_assert<
	$mol_type_head<[ 1 , 2 , 3 ]> ,
	1
>
```

# NPM usage

```sh
npm install mol_type_all
```

```typescript
import {
	$mol_type_assert as Assert ,
	$mol_type_head as Head ,
} from 'mol_type_all'

type first_of_tuple = Assert<
	Head<[ 1 , 2 , 3 ]> ,
	1
>
```

[![Edit $mol_type example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/moltype-example-1ebxp)

# Similar Projects

- [`piotrwitek/utility-types`](https://github.com/piotrwitek/utility-types) - Collection of utility types, complementing TypeScript built-in mapped types and aliases (think "lodash" for static types).
- [`pirix-gh/ts-toolbelt`](https://github.com/pirix-gh/ts-toolbelt) - All the types you need for TypeScript.
- [`ksxnodemodules/typescript-tuple`](https://github.com/ksxnodemodules/typescript-tuple) - Generics to work with tuples in TypeScript 
