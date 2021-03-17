# CROWD Tagged Union

Tagged Union of CROWD Stores.

# Properties

- Stores current type in the internal CROWD Register.
- Can dynamically change type of inner CROWD Store.
- Can cross merge different inner CROWD Stores.
- Same CROWD Store type may be defined with different tags. In example, CROWD Register may be known as "string", "number" etc.

## State Format

```javascript
{
	"values": [ type, ... inner_values ],
	"stamps": [ type_stamp, ... inner_stamps ],
}

Size = Size( TypeName ) + 8 + Size( InnerStoreStates )
```

## Delta Format

Delta is partial state dump like:

```javascript
{
	"values": [ type, ... inner_values ],
	"stamps": [ type_stamp, ... inner_stamps ],
}

Size = Size( TypeName ) + 8 + Size( InnerStoreDeltas )
```

## Views

- `as( type )` Returns inner store of defined type or `null` when current type is different of defined.

## Mutations

- `to( type )` Converts current inner store to defined type.
