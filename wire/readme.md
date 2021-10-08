# $mol_wire

Tiny pub/sub with automatic wiring support.

- All operations have O(1) complexity.
- Circular subscription throws exception.
- Subscriber is publisher too and retransmits events.

## Handling events

```ts
class Logger extends $mol_pub_sub {
	
	absorb( quant?: unknown ) {
		
		// custom logic
		console.log( quant )
		
		// default logic
		super.absorb( quant )
		
	}
	
}

const susi = new Logger
```

## Auto wire

```ts
const susi = new $mol_pub_sub
const pepe = new $mol_pub

const backup = susi.begin() // begin auto wire
try {
	pepe.promo() // Auto subscribe Susi to Pepe
} finally {
	susi.end( backup ) // Unsubscribe Susi from unpromoted pubs
}
```

## Firing events

```ts
pepe.emit() // Fire `undefined`
pepe.emit( new Error( 'Attention!' ) ) // Fire something else
```
