# $mol_schema

> Runtime typing schemas

## Schema API

- `toString` - identity of schema.
- `check(val)` - type guard.
- `guard(val)` - strict parser.
- `cast(val)` - relaxed caster.
- `default` - default value for casting.

## Leaf schemas

- `$mol_schema_enum` - some of constant values (first value as default).
- `$mol_schema_bool` - true or false (default).
- `$mol_schema_string` - any string ("" as default).
- `$mol_schema_float` - any number (NaN as default).
- `$mol_schema_integer` - integer number (0 as default).
- `$mol_schema_range` - range of values between min (default) and max.
  - `$mol_schema_positive` - value >= 0
    - `$mol_schema_natural` - natural number from 0 (default).
  - `$mol_schema_negative` - value <= 0

## Coposition schemas

- `$mol_schema_some` - some of schemas (default of first as default).
  - `$mol_schema_maybe` - value or null or undefined (undefined as default).
- `$mol_schema_every` - every of schemas (first default casted through all of them).
- `$mol_schema_list` - array of any values ([] as default).
- `$mol_schema_array` - typed by schema array ([] as default).
- `$mol_schema_object` - any object ({} as default).
- `$mol_schema_record` - object with typed fields (object with default fields values by default).

## Complex example

```ts
export abstract class $my_article_search extends $mol_schema_some([
	$mol_schema_record({
		fail: $mol_schema_string,
	}),
	$mol_schema_record({
		data: $mol_schema_array( $my_article_full ),
	}),
])

export abstract class $my_article_full extends $mol_schema_record({
	title: $mol_schema_string,
	body: $mol_schema_string,
	author: $my_user_main,
}) {}

export abstract class $my_user_main extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

```ts
response = $my_article_search.guard( response ) // Exception on wrong data
```

```ts
response = $my_article_search.cast( response ) // Defaults instead wrong data
```

```ts
if( $my_user_main.check( user ) ) {
	// user is $my_user_main now
}
```

```ts
const article = $my_article_full.default // default article state
```
