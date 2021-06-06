# $mol_regexp

Builds native RegExp and generates new strings by regexp and substitution params.

## Build

### Fixed string

```typescript
// /:\)/gsu
const smile = $mol_regexp.from( ':)' )
```

### Flags

```typescript
// /hello/gimsu
const hello = $mol_regexp.from( 'hello', {
	ignoreCase: true,
	multiline: true,
} )
```

### From Other Regexp

```typescript
// /.../gmsu
const triplet = $mol_regexp.from(
	$mol_regexp.from(
		/.../,
		{ ignoreCase: true },
	),
	{ multiline: true },
)
```

### Char by code point

```typescript
// /\u{20}/gsu
const space = $mol_regexp.from( 32 )
```

### Inclusive char class

```typescript
// /[,;\u{20}\u{61}-\u{7a}\d]/gsu
const tags = $mol_regexp.char_only(
	',;', // chars
	32, // code of space
	$mol_regexp.char_range( 0x61, 0x7A ), // a-z
	$mol_regexp.decimal_only, // 0-9
)
```

| Matches
|--------
| foo, bar
| 0;1;10

### Exclusive char class

```typescript
// /[^,;\u{20}\u{61}-\u{7a}\d]/gsu
const tags = $mol_regexp.char_except(
	',;', // chars
	32, // code of space
	$mol_regexp.char_range( 0x61, 0x7A ), // a-z
	$mol_regexp.decimal_only, // 0-9
)
```

| Matches
|--------
| *=+
| ABC 

### Repeat non-greedy

```typescript
// Regexp: /(?:\n){1,2}?/gsu
const para_sep = $mol_regexp.repeat( '\n', 1, 2 )
```

| Matches
|--------
| \n 
| \n\n 

### Repeat greedy

```typescript
// /(?:\d){2,4}/
const year = $mol_regexp.repeat_greedy( $mol_regexp.decimal_only, 2, 4 )
```

| Matches
|--------
| 95
| 2020 

### Sequence and optional sequence

```typescript
// /(?:\d){2,4}(?:\.\.(?:\d){2,4}){0,1}/gsu
const life_years = $mol_regexp.from([ year, [ '..', year ] ])
```

| Matches
|--------
| 95..99 
| 2020 

### Catch groups

```typescript
const from = year
const to = year

// /(?:((?:\d){2,4}))(?:\.\.(?:((?:\d){2,4}))){0,1}/gsu
const life_years = $mol_regexp.from([ {from}, [ '..', {to} ] ])
```

| Matches | from | to
|---------|------|----
| 95..99  | 95   | 99
| 2020    | 2020 | 

### Сatch variants

```typescript
enum Sex {
	male = 'male',
	female = 'female',
}

// /(?:((?:(male)|(female))))/gsu
const sex = $mol_regexp.from( {Sex} )

// { Sex: string, male: string, female: string } | undefined
const res = [ ... text.matchAll( sex ) ][0].groups
```

| Matches | Sex    | male      | female
|---------|--------|-----------|-------
| male    | male   | male      | 
| female  | female |           | female
