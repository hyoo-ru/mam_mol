# CROWD Register

Single value store. Just CvRDT LWW-Register with same properties.

## State format

```javascript
{
	"values": [ "bar" ],
	"stamps": [ +2002 ],
}
// Alice puts "foo" then Bob puts "bar".

.value === "bar"

Size = Size( Value ) + 8
```

Stamp is always non negative.

## Delta Format

Delta is full state dump.

## Views

- `value` Current value or `null` by default.

## Mutations

- `put( value )`

## Can be reinterpreted as

- [CROWD Counter](../numb)
- [CROWD Ordered Set](../list)
