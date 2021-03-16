# CROWD Tagged Union

Tagged Union of CROWD Stores.

# Properties

- Stores current type in the internal CROWD Register.
- Can dynamically change type of inner CROWD Store.
- Can cross merge different CROWD Stores.

## State Format

```javascript
{
	"values": [ type, ... inner_values ],
	"stamps": [ type_stamp, ... inner_stamps ],
}
```

Size = Size( TypeName ) + 8 + Size( InnerStoreStates )

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ type, ... inner_values ],
	"stamps": [ type_stamp, ... inner_stamps ],
}
```

Size = Size( TypeName ) + 8 + Size( InnerStoreDeltas )

## Mutations

- `to( type )`
