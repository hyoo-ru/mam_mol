# CROWD Ordered Set

## State format

```javascript
[ //   key   stamp
	[ "bar", +2001 ], // Alice inserts "bar" before "foo".
	[ "lol", +2002 ], // Bob inserts "lol" before "foo".
	[ "foo", +1001 ], // Alice inserts "foo" at the end.
	[ "kek", -3002 ], // Bob inserts "kek" at the end then cut it.
]
// items === [ "bar", "lol", "foo" ]
```

Items with negative stamps - tombstones.

## Patch format

Patch is full state dump.

## Mutations

- `insert( key: string | number, pos = 0 )`
- `cut( key: string | number )`
- `has( key: string | number )`
