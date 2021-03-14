# CROWD Dictionary

Map string path to another CROWD Store.

## State Format

```javascript
[
	[ "#the.path", [ /* Counter Data */ ] ],
	[ ":some.path", [ /* Register Data */ ] ],
	[ "!another.path", [ /* Ordered Set Data */ ] ],
	[ "?path.too", [ /* Unordered Set Data */ ] ],
	[ "&and.path", [ /* Dictionary Data */ ] ],
]
```

Size = Size( Paths ) + Size( InnerStores )

## Delta Format

Delta is partial state dump like:

```javascript
[
	[ "#path", [ /* Counter Deltas */ ] ],
	[ ":path", [ /* Register Deltas */ ] ],
	[ "!path", [ /* Ordered Set Deltas */ ] ],
	[ "?path", [ /* Unordered Set Deltas */ ] ],
	[ "&path", [ /* Dictionary Deltas */ ] ],
]
```

Size = Size( ChangedPaths ) + Size( InnerStoreDeltas )

## Type Prefixes

- `#` - [CROWD Counter](../numb)
- `:` - [CROWD Register](../reg)
- `!` - [CROWD Ordered Set](../list)
- `?` - [CROWD Unordered Set](../set)
- `&` - [CROWD Dictionary](../dict)

## Access to Stores

- `numb( path: string )` Returns [CROWD Counter](../numb) for path
- `reg( path: string )` Returns [CROWD Register](../reg) for path
- `list( path: string )` - Returns [CROWD Ordered Set](../list) for path
- `set( path: string )` - Returns [CROWD Unordered Set](../set) for path
- `dict( path: string )` - Returns [CROWD Dictionary](../dict) for path

