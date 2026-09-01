# $mol_time

Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.

# Installation

## Direct

```html
<script src="https://unpkg.com/mol_time_all/web.js"></script>
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

- [$mol_time_moment](https://github.com/hyoo-ru/mam_mol/tree/master/time/moment)
- [$mol_time_duration](https://github.com/hyoo-ru/mam_mol/tree/master/time/duration)
- [$mol_time_interval](https://github.com/hyoo-ru/mam_mol/tree/master/time/interval)

# Articles

- [$mol_time — работаем с датами и временем правильно](https://habhub.hyoo.ru/#!author=nin-jin/repo=HabHub/article=28)
- [JavaScript нанобенчмарки и преждевременные тормоза](https://habhub.hyoo.ru/#!author=nin-jin/repo=HabHub/article=42)
