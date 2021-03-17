# CROWD Unordered Set

Unordered list of unique keys. Equivalent of dCRDT LWW-Element-Set with same properties.

# Properties

- Last Add/Remove Wins.
- Adding of already added do nothing.
- Removing of already removed or non existent do nothing.

## State format

```javascript
{
	"values": [ "foo", "bar", "kek" ],
	"stamps": [ +1001, +1002, -3002 ],
}
// Alice adds "foo".
// Bob adds "bar".
// Alice adds "kek", but Bob removes it.

.items === new Set([ "foo", "bar" ])
```

Items with negative stamps - tombstones.

Size = Size( AddedAndRemovedKeys ) + 8 * Count( AddedAndRemovedKeys )

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ "kek" ],
	"stamps": [ -3002 ],
}
// Alice adds "kek", but Bob removes it.
```

Size = Size( ChangedKeys ) + 8 * Count( ChangedKeys )

## Mutations

- `add( key )`
- `remove( key )`
- `has( key )`

## Can be reinterpreted as

- [CROWD Register](../reg) then last value wins.
- [CROWD Ordered Set](../list)
