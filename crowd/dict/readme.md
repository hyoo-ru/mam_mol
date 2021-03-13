# CROWD Dictionary

## State format

```javascript
[
	[ ":some.path", [ /* Register Data */ ] ],
	[ "!another.path", [ /* Ordered Set Data */ ] ],
	[ "?path.too", [ /* Unordered Set Data */ ] ],
]
```

## Patch format

Patch is partial state dump like:

```javascript
[
	[ ":some.path", [ /* Register Data */ ] ],
	[ "!another.path", [ /* Ordered Set Data */ ] ],
	[ "?path.too", [ /* Unordered Set Data */ ] ],
]
```

## Access to stores

- `reg( path: string )` Returns [CROWD Register](../reg) for path
- `list( path: string )` - Returns [CROWD Ordered Set](../list) for path
- `set( path: string )` - Returns [CROWD Unordered Set](../set) for path

