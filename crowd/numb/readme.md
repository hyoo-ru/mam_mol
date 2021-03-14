# CROWD Counter

## State format

```javascript
[ //actor stamp
	[ +5, +1001 ], // Alice increases by 5.
	[ +4, +3002 ], // Bob increases by 3 then increases by 1.
	[ -1, +3003 ], // Carol decreases by 2 then increases by 1.
]
// value === 8
```

Stamp is always non negative.

## Patch format

Patch is partial state dump like:

```javascript
[ //actor stamp
	[ +4, +3002 ], // Bob changed after +1001.
	[ -1, +3003 ], // Carol changed after +1001.
]
```

## Mutations

- `shift( diff: number )`
