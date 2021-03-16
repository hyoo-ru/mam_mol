# CROWD Ordered Set

Ordered list of unique keys.

# Properties

- Left precedence. Key position relies on keys from left, non from right.
- Anchor to stable. Key position doesn't relies on key that moved after this.
- No interleaving. Sequence of left-to-right inserted keys will stay together after merge.

## State format

```javascript
{
	"values": [ "bar", "lol", "foo", "kek" ],
	"stamps": [ +2001, +2002, +1001, -3002 ],
}
// Alice inserts "foo" at the end.
// Alice inserts "bar" before "foo".
// Bob inserts "lol" before "foo".
// Bob inserts "kek" at the end then cut it.

.items === [ "bar", "lol", "foo" ]
```

Items with negative stamps - tombstones.

Size = Size( AddedAndRemovedKeys ) + 8 * Count( AddedAndRemovedKeys )

## Delta format

Delta is full state dump.

## Mutations

- `insert( key, pos? )` Pos points to the end by default.
- `cut( key )`
- `has( key )`

## Can be reinterpreted as

- [CROWD Register](../reg) then last value wins.
- [CROWD Unordered Set](../set) with reordering by version.
