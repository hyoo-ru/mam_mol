# $mol_time

Small, simple, powerfull, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.

# Installation

## Direct

```html
<script src="http://mol.js.org/time/all/-/web.js"></script>
<script>
	alert( new $mol_time_moment() ) // alerts current time
</script>
```

## NPM

```sh
npm install mol_time_all
```

### JavaScript

```js
const Moment = require( 'mol_time_all' ).$mol_time_moment
console.log( new Moment().toString() ) // logs current time
```

### TypeScript

```js
import { $mol_time_moment as Moment } from 'mol_time_all'
console.log( new Moment().toString() ) // logs current time
```

# API

- [$mol_time_moment](moment)
- [$mol_time_duration](duration)
- [$mol_time_interval](interval)

# Articles

- [$mol_time — работаем с датами и временем правильно](https://habrahabr.ru/post/263041/)
