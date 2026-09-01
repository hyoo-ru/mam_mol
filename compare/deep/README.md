# $mol_compare_deep

Deeply compares two values. Supports cyclic references. Uses cache to prevent multiple comparison of same pair.

## [Benchmark](https://perf.js.hyoo.ru/#!prefixes=%5B%22const%20compare%20%3D%20%24mol_compare_deep%22%2C%22const%20compare%20%3D%20%24mol_import.module%28%5Cn%5Ct'https%3A%2F%2Fesm.sh%2Fdeep-eql'%5Cn%29.default%22%2C%22const%20compare%20%3D%20%24mol_import.module%28%5Cn%5Ct'https%3A%2F%2Fesm.sh%2Fdeep-equal'%5Cn%29.default%22%2C%22const%20compare%20%3D%20%24mol_import.module%28%5Cn%5Ct'https%3A%2F%2Fesm.sh%2Ffast-equals'%5Cn%29.circularDeepEqual%22%5D/prefix=let%20base%20%3D%20%7B%7D%0Alet%20el%20%3D%20document.createElement%28%20'div'%20%29%0Alet%20res%20%3D%20false%0A%0Aconst%20make%20%3D%20%28%29%3D%3E%20%7B%0A%0A%09const%20next%20%3D%20%7B%0A%09%09val%3A%20%5B%20true%2C%201%2C%20'2'%20%5D%2C%0A%09%09obj%3A%20%5B%0A%09%09%09%2F3%2F%2C%0A%09%09%09el%2C%0A%09%09%09new%20Map%2C%0A%09%09%09new%20Set%2C%0A%09%09%09new%20Date%281%29%2C%0A%09%09%5D%2C%0A%09%7D%0A%0A%09next.obj.push%28%0A%09%09next%2C%0A%09%09next.val%2C%0A%09%09next.obj%2C%0A%09%29%0A%0A%09return%20next%0A%7D/sources=%5B%22const%20next%7B%23%7D%20%3D%20make%28%29%5Cnres%20%3D%20compare%28%20base%2C%20next%7B%23%7D%20%29%5Cnbase%20%3D%20next%7B%23%7D%22%2C%22const%20next%7B%23%7D%20%3D%20make%28%29%5Cnres%20%3D%20compare%28%20base%2C%20next%7B%23%7D%20%29%5Cnbase%20%3D%20next%7B%23%7D%22%2C%22const%20next%7B%23%7D%20%3D%20make%28%29%5Cnres%20%3D%20compare%28%20base%2C%20next%7B%23%7D%2C%20%7B%20strict%3A%20true%20%7D%20%29%5Cnbase%20%3D%20next%7B%23%7D%22%2C%22const%20next%7B%23%7D%20%3D%20make%28%29%5Cnres%20%3D%20compare%28%20base%2C%20next%7B%23%7D%20%29%5Cnbase%20%3D%20next%7B%23%7D%22%5D/postfix=const%20x%20%3D%20%5B1%5D%0A%24mol_assert_ok%28%20compare%28%0A%09%5B%7B%20a%3A%20%5B1%5D%2C%20b%3A%20%20x%20%20%7D%5D%2C%0A%09%5B%7B%20a%3A%20%20x%2C%20%20b%3A%20%5B1%5D%20%7D%5D%2C%0A%29%20%29%0A%0A%24mol_assert_not%28%20compare%28%20%7B%7D%2C%20make%28%29%20%29%20%29%0A%24mol_assert_ok%28%20compare%28%20make%28%29%2C%20make%28%29%20%29%20%29)

![](https://i.imgur.com/cpIehkv.png)

## Usage from MAM

```js
let x = { a: new Uint8Array([1]) }
let y = { a: new Uint8Array([1]) }
x.b = y
y.b = x

// true, equals
$mol_compare_deep( x, y )

// false, don't equals
$mol_compare_deep( new Uint8Array([1]), new Uint8Array([2]) )
```

## Usage from NPM

```sh
npm install mol_compare_deep
```

[![](https://badgen.net/bundlephobia/minzip/mol_compare_deep)](https://bundlephobia.com/package/mol_compare_deep)


**Import as ESM**

```js
import { $mol_compare_deep } from 'mol_compare_deep'
```

**Import as CJS**

```js
const { $mol_compare_deep } = require( 'mol_compare_deep' )
```
