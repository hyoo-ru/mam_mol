# $mol_type

Collection of typescript meta types for complext logic.

# Installation

```sh
npm install mol_type_all
```

# Usage

```js
import {
	$mol_type_assert as Assert ,
	$mol_type_head as Head ,
} from 'mol_type_all'

// type test
type first_of_tuple = Assert<
	Head<[ 1 , 2 , 3 ]> ,
	1
>
```
