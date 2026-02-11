# $mol_key

Returns string key for any value.

- Primitives are returned as JSON (`true`, `12.34`).
- POJO's are returned as JSON with recursive `$mol_key` applying (`[123,{"foo":"A1B2C3D4"}]`, `{"foo":[123,"A1B2C3D4"]}"`).
- Result of `toJSON` calling is returned for objects with this method.
- GUID generated/reused for other objects (`"A1B2C3D4"`).

## NPM Usage

```ts
npm install mol_key
```

1KB [![](https://badgen.net/bundlephobia/minzip/mol_key)](https://bundlephobia.com/package/mol_key)

```ts
import { $mol_key as key } from 'mol_key'

// {"regexp":/foo/,"elems":[#FEB7B7JN,#XO9QW5P0]}
key({ regexp: /foo/, elems: [ document.head, document.body ] })
```
