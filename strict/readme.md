# $mol_strict

Makes JS runtime more strict.

## Without $mol_strict

```javascript
class Foo extends Object {
	get name(){ return 'Jin' }
}
const foo = new Foo

`Hello, ${ foo }!`
// "Hello [object Object]!"

`In this month you have earned ${ foo / 1000 } thousand of dollars.`
// "In this month you have earned NaN thousand of dollars."

`Your "${ 'foo'[4] }" goal is finally achieved.`
// "Your "undefined" goal is finally achieved."

`There are still ${ foo.length - 1 } goals left and you will achieve success.`
// "There are still NaN goals left and you will achieve success."

`There are still ${ foo.length - 1 } goals left and you will achieve success.`
// "There are still NaN goals left and you will achieve success."

foo.__proto__= { name: 'moron' };
`See you later, ${ foo.name }.`
// "See you later, moron."
```

## With $mol_strict

```javascript
class Foo extends Object {
	get name(){ return 'Jin' }
}
const foo = new Foo

`Hello, ${ foo }!`
// TypeError: Field "Symbol(Symbol.toPrimitive)" is not defined

`In this month you have earned ${ foo / 1000 } thousand of dollars.`
// TypeError: Field "Symbol(Symbol.toPrimitive)" is not defined

`Your "${ 'foo'[4] }" goal is finally achieved.`
// TypeError: Field "4" is not defined

`There are still ${ foo.length - 1 } goals left and you will achieve success.`
// TypeError: Field "length" is not defined

foo.__proto__= { name: 'moron' };
`See you later, ${ foo.name }.`
// "See you later, Jin."
```

## Usage from MAM

At any `*.meta.tree`:

```tree
include \/mol/strict
```

## Usage from NPM

```javascript
import "mol_strict"
```

## Articles

- [$mol_strict: Как же меня `[object Object]` этот ваш `undefined` `NaN`!](https://habhub.hyoo.ru/#author=nin-jin/repo=HabHub/article=43)
