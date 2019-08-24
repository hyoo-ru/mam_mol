# $mol_after_timeout

Schedule function to be called after timeout in ms.

# Usage example

## Interactive control

```typescript
// Schedule
const deferred_task = new $mol_after_timeout( 1000 , ()=> alert( 'Hello!' ) )

// Unschedule
deferred_task.destructor()
```

## Reactive control

```typescript
// Schedule when first dependent has appeared
// Unschedule after last dependent has disappeared
@ $mol_mem
deferred_task() {
	return new $mol_after_timeout( 1000 , ()=> alert( 'Hello!' ) )
}
```
