# $mol_func_sandbox

Sandbox for javascript code from user.

## Example

```
const sandbox = new $mol_func_sandbox( Math ) // allow only mathematics
const func = sandbox.eval( 'return pow(2,2)' ) // create function
const result = func() // 4
```

## API

**constructor( ... contexts : Object[] )**

`contexts` contains global variables for code inside.

**eval( code : string ) : ()=> any**

Creates new function by source code.
