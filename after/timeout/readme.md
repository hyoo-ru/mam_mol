# $mol_after_timeout

Schedule function to be called after timeout in ms.

# Usage example

## Interactive control

```typescript
// Schedule
const timeout = new $mol_after_timeout( 1000 , ()=> alert( 'Hello!' ) )

// Unschedule
timeout.destructor()
```

## Reactive control

```typescript
// Schedule when first dependent has appeared
// Unschedule after last dependent has disappeared
@ $mol_mem
scheduled task() {
	return new $mol_after_timeout( 1000 , ()=> alert( 'Hello!' ) )
}
```
