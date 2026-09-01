# $mol_regexp

Builds composable regular expression, which compiles to native RegExp. And generates a matching string for it.

## Instance API

### All Matched Substrings

```typescript
// [ 'foo', 'bar' ]
'foo bar'.match( word )
```

### Tokenize String

```typescript
// [ 'foo', 'bar' ]
for( const token of 'foo bar'.matchAll( word ) ) {
	
	// Full matched substring
	token[0]
	
	// Catched subgroups by names like `{ foo: 'bar', ... }`
	// `undefined` when token doesn't matched.
	token.groups
	
}
```

### Generate New String

#### Substitution

```typescript
// "foo@example.org"
mail.generate({
	dot_atom: 'foo',
	domain: 'example.org',
})
```

#### Validation

```typescript
// Error: "Wrong param: dot_atom=jin."
mail.generate({
	dot_atom: 'jin.',
	domain: 'example.org',
})
```

#### Default Value from Pattern

```typescript
// "jin: male"
sexism.generate({
	name: 'jin',
	male: true,
})
```

## Build Instance

[More examples in tests.](./regexp.test.ts)

### Fixed String

```typescript
// /:\)/gsu
const smile = $mol_regexp.from( ':)' )
```

| Matches
|--------
| :)

### Flags

```typescript
// /hello/gimsu
const hello = $mol_regexp.from( 'hello', {
	ignoreCase: true,
	multiline: true,
} )
```

| Matches
|--------
| hello
| HELLO

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

| Matches
|--------
| any
| a=+

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

### Unicode classes

```typescript
// /\p{Script=Cyrillic}/gsu
$mol_regexp.unicode_only( 'Script', 'Cyrillic' )

// /\P{Script=Cyrillic}/gsu
$mol_regexp.unicode_except( 'Script', 'Cyrillic' )

// /\p{Hex_Digit}/gsu
$mol_regexp.unicode_only( 'Hex_Digit' )

// /\P{Hex_Digit}/gsu
$mol_regexp.unicode_except( 'Hex_Digit' )
```

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

### Complex example

```typescript
const {
	begin, end,
	char_only, char_range,
	latin_only, slash_back,
	repeat_greedy, from,
} = $mol_regexp

const atom_char = char_only( latin_only, "!#$%&'*+/=?^`{|}~-" )
const atom = repeat_greedy( atom_char, 1 )
const dot_atom = from([ atom, repeat_greedy([ '.', atom ]) ])

const name_letter = char_only(
	char_range( 0x01, 0x08 ),
	0x0b, 0x0c,
	char_range( 0x0e, 0x1f ),
	0x21,
	char_range( 0x23, 0x5b ),
	char_range( 0x5d, 0x7f ),
)

const quoted_pair = from([
	slash_back,
	char_only(
		char_range( 0x01, 0x09 ),
		0x0b, 0x0c,
		char_range( 0x0e, 0x7f ),
	)
])

const name = repeat_greedy({ name_letter, quoted_pair })
const quoted_name = from([ '"', {name}, '"' ])

const local_part = from({ dot_atom, quoted_name })
const domain = dot_atom

const mail = from([ begin, local_part, '@', {domain}, end ])
```

| Matches   | domain | dot_atom | name | name_letter | quoted_name | quoted_pair
|-----------|--------|----------|------|-------------|-------------|------------
| a.b@c.d   | c.d    | a.b      |      |             |             |
| "a\n"@c.d | c.d    |          | a\n  |             | "a\n"       | \n

## Usage from NPM

```
npm install mol_regexp
```

[![](https://badgen.net/bundlephobia/minzip/mol_regexp)](https://bundlephobia.com/package/mol_regexp)

```javascript
import { $mol_regexp } from 'mol_regexp'
```

[Sandbox](https://codepen.io/nin-jin/pen/YzZvERo?editors=0011)
