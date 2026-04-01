# $mol_schema

> Runtime typing schemas

## Schema API

- `.toString()` - identity of schema.
- `.check(val)` - type guard.
- `.guard(val)` - strict parser.
- `.cast(val)` - relaxed caster.
- `.default` - default value for casting.

## Leaf schemas

- `$mol_schema_enum(...options)` - some of constant values (first value as default).
- `$mol_schema_boolean` - true or false (default).
- `$mol_schema_string` - any string ("" as default).
  - `$mol_schema_pattern(regexp)` - string that matched to regexp ("" as default).
- `$mol_schema_float` - any number (NaN as default).
- `$mol_schema_integer` - integer number (0 as default).
- `$mol_schema_range(min,max)` - range of values between min (default) and max.
  - `$mol_schema_positive` - value >= 0
    - `$mol_schema_natural` - natural number from 0 (default).
  - `$mol_schema_negative` - value <= 0

## Composition schemas

- `$mol_schema_some(...variants)` - some of schemas (default of first as default).
  - `$mol_schema_maybe(schema)` - value or null or undefined (undefined as default).
- `$mol_schema_every(...schemas)` - every of schemas for same value (first default casted through all of them).
- `$mol_schema_list(item)` - array of same types schema ([] as default).
- `$mol_schema_dict(key,val)` - key-value dictionary schema ({} as default).
- `$mol_schema_record({...fields})` - object with typed fields (object with default fields values by default).

## Complex example

```ts
export abstract class $my_user_main extends $mol_schema_dict({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}

export abstract class $my_user_full extends $mol_schema_dict({
	... $my_user_full.Fields,
	bio: $mol_schema_string,
	flags: $mol_schema_dict( $mol_schema_string, $mol_schema_boolean ),
}) {}

export abstract class $my_article_full extends $mol_schema_partial({
	title: $mol_schema_string,
	body: $mol_schema_string,
	author: $my_user_full,
}) {}

export abstract class $my_article_search extends $mol_schema_some([
	$mol_schema_dict({
		data: $mol_schema_list( $my_article_full ),
	}),
	$mol_schema_dict({
		fail: $mol_schema_pattern( /^\w+$/ ),
	}),
]) {}
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

## Usage from NPM

```ts
import {
	$mol_schema_record: Rec,
	$mol_schema_string: Str,
	/// ...
} from 'mol_schema'

export class Article extends Rec({
	title: Str,
	body: Str,
}) {}
```
