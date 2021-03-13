# CROWD Unordered Set

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

## Patch format

Patch is partial state dump like:

```javascript
[ //   key   stamp
	[ "kek", -3002 ], // Only two changes after +1002
]
```

## Mutations

- `add( key: string | number )`
- `remove( key: string | number )`
