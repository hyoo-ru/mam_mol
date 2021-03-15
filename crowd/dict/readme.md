# CROWD Dictionary

Map key to another CROWD Store.

## State Format

```javascript
[ //   key        value
	[ null,  [ /* Value Data */ ] ],
	[ 1,     [ /* Value Data */ ] ],
	[ "foo", [ /* Value Data */ ] ],
]
```

Size = Size( Keys ) + Size( InnerStoreData )

## Delta Format

Delta is partial state dump like:

```javascript
[ //   key        value
	[ null,  [ /* Value Data */ ] ],
	[ 1,     [ /* Value Data */ ] ],
	[ "foo", [ /* Value Data */ ] ],
]
```

Size = Size( ChangedKeys ) + Size( InnerStoreDeltas )

