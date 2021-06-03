# $mol_regexp2

Builds native RegExp and generates new strings by regexp and substitution params.

## Build

### Char by code point

```typescript
// /\u{20}/gsu
const space = $mol_regexp2( 32 )
```

### Inclusive char class

```typescript
// /[,;\u{20}\u{61}-\u{7a}\d]/gsu
const tags = $mol_regexp2_char_only(
	',;', // chars
	32, // code of space
	$mol_regexp2_char_range( 0x61, 0x7A ), // a-z
	$mol_regexp2_decimal_only, // 0-9
)
```

| Matches
|--------
| foo, bar
| 0;1;10

### Exclusive char class

```typescript
// /[^,;\u{20}\u{61}-\u{7a}\d]/gsu
const tags = $mol_regexp2_char_except(
	',;', // chars
	32, // code of space
	$mol_regexp2_char_range( 0x61, 0x7A ), // a-z
	$mol_regexp2_decimal_only, // 0-9
)
```

| Matches
|--------
| *=+
| ABC 

### Repeat non-greedy

```typescript
// Regexp: /(?:\n){1,2}?/gsu
const para_sep = $mol_regexp2_repeat( '\n', 1, 2 )
```

| Matches
|--------
| \n 
| \n\n 

### Repeat greedy

```typescript
// /(?:\d){2,4}/
const year = $mol_regexp2_repeat_greedy( $mol_regexp2_decimal_only, 2, 4 )
```

| Matches
|--------
| 95
| 2020 

### Sequence and optional sequence

```typescript
// /(?:\d){2,4}(?:\.\.(?:\d){2,4}){0,1}/gsu
const life_years = $mol_regexp2([ year, [ '..', year ] ])
```

| Matches
|--------
| 95..99 
| 2020 

### Catch groups

```typescript
const from = year
const to = year

// /(?:(?<from>(?:\d){2,4}))(?:\.\.(?:(?<to>(?:\d){2,4}))){0,1}/gsu
const life_years = $mol_regexp2([ {from}, [ '..', {to} ] ])
```

| Matches | from | to
|---------|------|----
| 95..99  | 95   | 99
| 2020    | 2020 | undefined

### Non-catch variants

```typescript
// /(?:(?:\r){0,1}\n|\r)/gsu
const new_line = $mol_regexp2({
	_win: [ [ '\r' ], '\n' ],
	_mac: '\r',
})
```

| Matches
|--------
| \r\n 
| \n
| \r

### Сatch variants

```typescript
enum Sex {
	male = 'male',
	female = 'female',
}

// /(?:(?<Sex>(?:(?<male>male)|(?<female>female))))/gsu
const sex = $mol_regexp2( Sex )
```

| Matches | Sex    | male      | female
|---------|--------|-----------|-------
| male    | male   | male      | undefined
| female  | female | undefined | female
