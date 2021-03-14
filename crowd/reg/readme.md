# CROWD Register

Single value store. Just CvRDT LWW-Register with same properties.

## State format

```javascript
[ //   key   stamp
	[ "bar", +2002 ], // Alice puts "foo" then Bob puts "bar".
]
// value === "bar"
```

Stamp is always non negative.

Size = Size( Value ) + 8

## Delta Format

Delta is full state dump.

## Mutations

- `put( value: string | number | boolean )`
