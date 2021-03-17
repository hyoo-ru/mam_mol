# CROWD Counter

Number that can be shifted by any value. Equivalent of dCRDT PN-Counter with same properties.


## Properties

- Merges without lost of changes.
- Allows increase/decrease by any number.
- Allows negative and float values.

## State format

```javascript
{
	"values": [ +5, +4, -1 ],
	"stamps": [ +1001, +3002, -3003 ],
}
// Alice increases by 5.
// Bob increases by 3 then increases by 1.
// Carol decreases by 2 then increases by 1.

.value === 8

Size = 16 * ActorsInState
```

Stamp is always non negative.

## Delta format

Delta is partial state dump like:

```javascript
{
	"values": [ +4, -1 ],
	"stamps": [ +3002, -3003 ],
}
// Bob increases by 3 then increases by 1.
// Carol decreases by 2 then increases by 1.

Size = 16 * ActorsInDelta
```

## Views

- `value` Current value or `0` by default.

## Mutations

- `shift( diff )`

## Can be reinterpreted as

- [CROWD Register](../reg) then last value wins.
- [CROWD Unordered Set](../set) as set of summands.
- [CROWD Ordered Set](../list) as set of summands.
