# CROWD Unordered Set

Unordered list of unique keys. Equivalent of dCRDT LWW-Element-Set with same properties.

## State format

```javascript
[ //   key   stamp
	[ "foo", +1001 ], // Alice adds "foo".
	[ "bar", +1002 ], // Bob adds "bar".
	[ "kek", -3002 ], // Alice adds "bar", but Bob removes it.
]
// items === new Set([ "foo", "bar" ])
```

Items with negative stamps - tombstones.

Size = Size( AddedAndRemovedKeys ) + 8B * Count( AddedAndRemovedKeys )

## Patch format

Patch is partial state dump like:

```javascript
[ //   key   stamp
	[ "kek", -3002 ], // Only two changes after +1002
]
```

Size = Size( ChangedKeys ) + 8B * Count( ChangedKeys )

## Mutations

- `add( key: string | number )`
- `remove( key: string | number )`
- `has( key: string | number )`
