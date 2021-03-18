# CROWD Dictionary

Map key to another CROWD Store.

# Properties

- Can't contain different CROWD Stores. Use [CROWD Union](../union) to store its.

## State Format

```javascript
{
	"values": [ key1, ... values1, key2, ... values2, ... ],
	"stamps": [ size1, ... stamps1, szie2, ... stamps2, ... ],
}

Size = Size( Keys ) + 8 * Count( Keys ) + Size( InnerStoreData )
```

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ key5, ... values5, key3, ... values3, ... ],
	"stamps": [ size5, ... stamps5, size3, ... stamps3, ... ],
}

Size = Size( ChangedKeys ) + 8 * Count( ChangedKeys ) + Size( InnerStoreDeltas )
```

## Views

- `for( key )` Returns inner store for `key`.
