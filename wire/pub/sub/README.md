# $mol_wire_pub_sub

Tiny pub/sub with automatic wiring support.

- All tracking operations have O(1) complexity.
- Circular subscription throws exception.
- Subscriber is publisher too and retransmits events.

## Handling events

```ts
class Logger extends $mol_wire_pub_sub {
	
	affect( quant?: number ) {
		
		// custom logic, quant = $mol_wire_cursor
		console.log( quant )
		
		// default logic (retransmit)
		super.affect( quant )
		
	}
	
}

const susi = new Logger
```

## Auto wire

```ts
const susi = new $mol_wire_pub_sub
const pepe = new $mol_wire_pub

const backup = susi.track_on() // Begin auto wire
try {
	pepe.promote() // Auto subscribe Susi to Pepe
} finally {
	susi.track_cut() // Unsubscribe Susi from unpromoted pubs
	susi.track_off( backup ) // Stop auto wire
}
```

## Firing events

```ts
pepe.emit() // Notify subscribers about changes
```
