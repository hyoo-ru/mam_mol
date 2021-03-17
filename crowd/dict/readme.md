# CROWD Dictionary

Map key to another CROWD Store.

# Properties

- Can't contain other CROWD Dictionaries. Use flat representation of graphs.
- Can't contain different CROWD Stores. Use [CROWD Union](../union) to store its.

## State Format

```javascript
{
	"values": [ key1, ... values1, key2, ... values2, ... ],
	"stamps": [ 0, ... stamps1, 0, ... stamps2, ... ],
}

Size = Size( Keys ) + 8 * Count( Keys ) + Size( InnerStoreData )
```

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ key5, ... values5, key3, ... values3, ... ],
	"stamps": [ 0, ... stamps5, 0, ... stamps3, ... ],
}

Size = Size( ChangedKeys ) + 8 * Count( ChangedKeys ) + Size( InnerStoreDeltas )
```
