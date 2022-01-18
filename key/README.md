# $mol_key

Returns string key for any value.

- Primitives are returned as JSON (`true`, `12.34`).
- POJO's are returned as JSON with recursive `$mol_key` applying (`[123,{"foo":"A1B2C3D4"}]`, `{"foo":[123,"A1B2C3D4"]}"`).
- Result of `toJSON` calling is returned for objects with this method.
- Guid generated/reused for other objects (`"A1B2C3D4"`).
