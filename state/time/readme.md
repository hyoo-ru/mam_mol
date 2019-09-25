# $mol_state_time

State of time moment.

## API

**```now( precision? : number ) : number```**

Returns timestamp that updates every ```precision``` ms. If ```precision``` is not defined, updates every animation frame.

## Usage example

```
@ $mol_mem
remaining_time( deadline : number ) {
	return deadline - $mol_state_time.now()
}
```
