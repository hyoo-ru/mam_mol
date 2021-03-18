# CROWD Tuple

Tuple of CROWD Stores.

## State Format

```javascript
{
	"values": [ field1, ... values1, field2, ... values2, ... ],
	"stamps": [ size1, ... stamps1, szie2, ... stamps2, ... ],
}

Size = Size( Fields ) + 8 * Count( Fields ) + Size( InnerStoreStates )
```

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ field1, ... values1, field2, ... values2, ... ],
	"stamps": [ size1, ... stamps1, szie2, ... stamps2, ... ],
}

Size = Size( Fields ) + 8 * Count( Fields ) + Size( InnerStoreDeltas )
```

All fields always exists in state.

## Views

- `for( field )` Returns inner store for `field`.
