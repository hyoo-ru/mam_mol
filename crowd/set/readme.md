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

Size = Size( AddedAndRemovedKeys ) + 8 * Count( AddedAndRemovedKeys )
```

Items with negative stamps - tombstones.

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ "kek" ],
	"stamps": [ -3002 ],
}
// Alice adds "kek", but Bob removes it.

Size = Size( ChangedKeys ) + 8 * Count( ChangedKeys )
```

## Views

- `items` Array of keys.
- `has( key )`

## Mutations

- `add( key )`
- `remove( key )`

## Can be reinterpreted as

- [CROWD Register](../reg) then last value wins.
- [CROWD Ordered Set](../list)
