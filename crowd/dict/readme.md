# CROWD Dictionary

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

## Patch Format

Patch is partial state dump like:

```javascript
[
	[ "#path", [ /* Counter Patches */ ] ],
	[ ":path", [ /* Register Patches */ ] ],
	[ "!path", [ /* Ordered Set Patches */ ] ],
	[ "?path", [ /* Unordered Set Patches */ ] ],
	[ "&path", [ /* Dictionary Patches */ ] ],
]
```

## Type Prefixes

`#` - [CROWD Counter](../numb)
`:` - [CROWD Register](../reg)
`!` - [CROWD Ordered Set](../list)
`?` - [CROWD Unordered Set](../set)
`&` - [CROWD Dictionary](../dict)

## Access to Stores

- `numb( path: string )` Returns [CROWD Counter](../numb) for path
- `reg( path: string )` Returns [CROWD Register](../reg) for path
- `list( path: string )` - Returns [CROWD Ordered Set](../list) for path
- `set( path: string )` - Returns [CROWD Unordered Set](../set) for path
- `dict( path: string )` - Returns [CROWD Dictionary](../dict) for path

