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

- `value` Current raw value or `null` by default.
- `bool` Current as `boolean` or `false` by default.
- `numb` Current as `number` or `0` by default.
- `str` Current as `string` or `""` by default.

## Mutations

- `value`
- `bool`
- `numb`
- `str`

## Can be reinterpreted as

- [CROWD Counter](../numb)
- [CROWD Ordered Set](../list)
