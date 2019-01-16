# $mol_syntax2 

Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token.

## Usage example

```typescript
const syntax = new $mol_syntax2({
	'brace-open' : /\{{2}/ ,
	'brace-close' : /\}{2}/ ,
	'placeholder' : /\{(\w+)\}/ ,
})

let res = ''
syntax.parse( 'I have {count} {{brackets}}.' , {
	'' : text => res += text ,
	'brace-open' : ()=> res += '{' ,
	'brace-close' : ()=> res += '}' ,
	'placeholder' : ( full , [ key ] )=> res += '$' + key ,
} )
// res === 'I have $count {brackets}.'
```

## Methods

**`tokenize( text : string , handle : Handle ) : void`**

Calls `handle` for every token. Arguments of `handle`:

* `name : string` - name of lexem
* `found : string` - matched substring
* `chunks : string[]` - captured chunks
* `offset : number` - offset of token start

**`parse( text : string , handlers : { [ key in keyof Lexems | '' ] : Handle } ) : void`**

Calls different `handle` for different tokens. Arguments of `handle`:

* `found : string` - matched substring
* `chunks : string[]` - captured chunks
* `offset : number` - offset of token start

# Installation

## Direct

```html
<script src="http://mol.js.org/syntax2/-/web.js"></script>
```

## NPM

```sh
npm install mol_syntax --save
```

### JavaScript

```js
const { $mol_syntax2 } = require( 'mol_syntax' )
```

### TypeScript

```ts
import { $mol_syntax2 } from 'mol_syntax'
```
