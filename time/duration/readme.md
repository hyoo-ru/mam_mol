## $mol_time_duration

Immutable iso8601 time duration representation.

## Creating

```js
 // Zero duration
new $mol_time_duration()

// By milliseconds count
new $mol_time_duration( 60000 ) // 60 seconds (non 1 minute!)

// By iso8601 string
new $mol_time_duration( 'P1Y2M3DT4H5M6.7S' ) // all components are optional
new $mol_time_duration( 'PT' ) // zero duration

// By components
new $mol_time_duration({
	year : 1 ,
	month : 2 ,
	day : 3 ,
	hour : 4 ,
	minute : 5 ,
	second : 6.7 ,
})
```

## Getters

```js
// Component value (undefined by default)
duration.year // number
duration.month // number
duration.day // number
duration.hour // number
duration.minute // number
duration.second // number (fractional)

// Duration in milliseconds
new $mol_time_duration( 'PT1M' ).valueOf() // 60000

// Iso8601
new $mol_time_duration( 'PT1M0S' ).toString() // PT1M
new $mol_time_duration( 'PT1M0S' ).toJSON() // PT1M
```

## Arithmetic

```js
// Create duration as summ of one and another
new $mol_time_duration( 'PT1h' ).summ( 'PT1h1m' ) // new $mol_time_duration( 'PT2H2M' )

// Create duration as multiply of one to multiplier
// Attention! Can produce negative values that is not compatible with iso8601
new $mol_time_duration( 'PT1h' ).mult( -1 ) // new $mol_time_duration( 'PT-1H' )

// Count of another durations in
new $mol_time_duration( 'PT1h' ).count( 'PT1s' ) // 3600
```
