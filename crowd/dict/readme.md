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

## Mutations

- `put( path: ':string', value: string | number | boolean )` - Put to Register
- `insert( path: '!string', key: string | number, pos = 0 )` - Insert to Ordered Set
- `cut( path: '!string', key: string | number )` - Cut from Ordered Set
- `add( path: '?string', key: string | number )` - Add to Unordered Set
- `remove( path: '?string', key: string | number )` - Remove from Unordered Set

