# $mol_type

Collection of TypeScript meta types for complex logic.

# Usage

## MAM

```typescript
type cutted_head = $mol_type_assert<
	$mol_type_tail<[ 1, 2, 3 ]>,
	[ 2, 3 ]
>
```

## NPM

```sh
npm install mol_type_all
```

```typescript
import {
	$mol_type_assert as Assert,
	$mol_type_tail as Tail,
} from 'mol_type_all'

type cutted_head = Assert<
	Tail<[ 1, 2, 3 ]>,
	[ 2, 3 ]
>
```

# Utilites

## Assertions

- [$mol_type_error](https://github.com/hyoo-ru/mam_mol/tree/master/type/error) - special type for errors with details.
- [$mol_type_assert](https://github.com/hyoo-ru/mam_mol/tree/master/type/assert) - fails type check on type inequality.
- [$mol_type_enforce](https://github.com/hyoo-ru/mam_mol/tree/master/type/enforce) - fails type check on type incompatibility.

```ts
// Actual result
type partial_record = $mol_type_assert<
	Partial<{ foo: 123 }>, // Some expression
	{ foo?: 123 } // Expected result
>
```

![Type Asserts](https://habrastorage.org/webt/a4/d3/d6/a4d3d643f36e4ac3f431b9dac7a1f2c5.png)

## Tuples

- [$mol_type_head](https://github.com/hyoo-ru/mam_mol/tree/master/type/head) - first item of tuple or never.
- [$mol_type_head_write](https://github.com/hyoo-ru/mam_mol/tree/master/type/head/write) - replaces first element of tuple.
- [$mol_type_tail](https://github.com/hyoo-ru/mam_mol/tree/master/type/tail) - tuple without first item.
- [$mol_type_foot](https://github.com/hyoo-ru/mam_mol/tree/master/type/foot) - last item of tuple or never.
- [$mol_type_reverse](https://github.com/hyoo-ru/mam_mol/tree/master/type/reverse) - makes reversed tuple.

## Algebraics

- [$mol_type_equals](https://github.com/hyoo-ru/mam_mol/tree/master/type/equals) - check for types equality.
- [$mol_type_access](https://github.com/hyoo-ru/mam_mol/tree/master/type/access) - takes type of property from wild union type.
- [$mol_type_filter_keys](https://github.com/hyoo-ru/mam_mol/tree/master/type/filter/keys) - records from union with provided property.
- [$mol_type_intersect](https://github.com/hyoo-ru/mam_mol/tree/master/type/intersect) - converts union to intersection.
- [$mol_type_merge](https://github.com/hyoo-ru/mam_mol/tree/master/type/merge) - merges intersection of records to one record.
- [$mol_type_keys_all](https://github.com/hyoo-ru/mam_mol/tree/master/type/keys/all) - all keys from all records from union.

## Strings

- [$mol_type_alphabet_*](https://github.com/hyoo-ru/mam_mol/tree/master/type/alphabet) - character classes.
- [$mol_type_string_split](https://github.com/hyoo-ru/mam_mol/tree/master/type/string/split) - splits string by separator.
- [$mol_type_string_join](https://github.com/hyoo-ru/mam_mol/tree/master/type/string/join) - joins strings by separator.

## Numbers

- [$mol_type_int_*](https://github.com/hyoo-ru/mam_mol/tree/master/type/int) - integer arithmetic (`+`, `-`, `*`, `/`, `^`, `..`, `()`, `<`)

## Functions

- [$mol_type_unary](https://github.com/hyoo-ru/mam_mol/tree/master/type/unary) - function/class with single param.
- [$mol_type_param](https://github.com/hyoo-ru/mam_mol/tree/master/type/param) - takes param type by index.
- [$mol_type_result](https://github.com/hyoo-ru/mam_mol/tree/master/type/result) - takes result/instance type.

## Records

- [$mol_type_immutable_deep](https://github.com/hyoo-ru/mam_mol/tree/master/type/immutable/deep) - recursive immutability.
- [$mol_type_mutable_deep](https://github.com/hyoo-ru/mam_mol/tree/master/type/mutable/deep) - recursive mutability.
- [$mol_type_partial_undefined](https://github.com/hyoo-ru/mam_mol/tree/master/type/partial/undefined) - makes all properties partial.
- [$mol_type_partial_deep](https://github.com/hyoo-ru/mam_mol/tree/master/type/partial/deep) - makes all properties partial deeply.
- [$mol_type_required_deep](https://github.com/hyoo-ru/mam_mol/tree/master/type/required/deep) - makes all properties required deeply.
- [$mol_type_nullable](https://github.com/hyoo-ru/mam_mol/tree/master/type/nullable) - makes all properties nullable.
- [$mol_type_writable](https://github.com/hyoo-ru/mam_mol/tree/master/type/writable) - makes all properties writable.
- [$mol_type_keys_extract](https://github.com/hyoo-ru/mam_mol/tree/master/type/keys/extract) - extracts key names from record by value type.
- [$mol_type_keys_exclude](https://github.com/hyoo-ru/mam_mol/tree/master/type/keys/exclude) - excludes key names from record by value type.
- [$mol_type_omit](https://github.com/hyoo-ru/mam_mol/tree/master/type/omit) - omits properties by value type.
- [$mol_type_pick](https://github.com/hyoo-ru/mam_mol/tree/master/type/pick) - pick properties by value type.
- [$mol_type_override](https://github.com/hyoo-ru/mam_mol/tree/master/type/override) - fully replaces properties.
- [$mol_type_case_*](https://github.com/hyoo-ru/mam_mol/tree/master/type/case) - converts keys/values to upper/lower/capital cases.

- [$mol_type_flat_camel](https://github.com/hyoo-ru/mam_mol/tree/master/type/flat/camel) - makes flat record from volume records tree.
- [$mol_type_flat_keys](https://github.com/hyoo-ru/mam_mol/tree/master/type/flat/keys) - takes keys paths from volume records tree.
- [$mol_type_volume](https://github.com/hyoo-ru/mam_mol/tree/master/type/volume) - makes volume records tree from flat record.
- [$mol_type_volume_value](https://github.com/hyoo-ru/mam_mol/tree/master/type/volume/value) - takes value from volume records tree by path.

# Similar Projects

- [`piotrwitek/utility-types`](https://github.com/piotrwitek/utility-types) - Collection of utility types, complementing TypeScript built-in mapped types and aliases (think "lodash" for static types).
- [`pirix-gh/ts-toolbelt`](https://github.com/pirix-gh/ts-toolbelt) - All the types you need for TypeScript.
- [`ksxnodemodules/typescript-tuple`](https://github.com/ksxnodemodules/typescript-tuple) - Generics to work with tuples in TypeScript 
