# $mol_time_interval

Immutable iso8601 time interval representation.

## Creating

```js
// By iso8601 string
new $mol_time_interval( '2015-07-19/2015-08-02' ) // by two moments
new $mol_time_interval( '2015-07-19/P14D' ) // by start moment and duration
new $mol_time_interval( 'P14D/2015-08-02' ) // by end moment and duration
new $mol_time_interval( '2015-07-19/' ) // by start moment and now
new $mol_time_interval( '/2015-08-02' ) // by now and end moment

// by components
new $mol_time_interval({
	start : '2015-07-19' , // $mol_time_moment_config
	end : '2015-08-02' , // $mol_time_moment_config
})
new $mol_time_interval({
	start : '2015-07-19' , // $mol_time_moment_config
	duration : 'P14D' , // $mol_time_duration_config
})
new $mol_time_interval({
	duration : 'P14D' , // $mol_time_duration_config
	end : '2015-08-02' , // $mol_time_moment_config
})
```

## Getters

```js
// Component value (third are calculated by defined two)
new $mol_time_interval( '2015/P1Y' ).end // new $mol_time_moment( '2016' )
new $mol_time_interval( 'P1Y/2016' ).start // new $mol_time_moment( '2015' )
new $mol_time_interval( '2015/2016' ).duration // new $mol_time_duration( 'PT31536000S' )

// iso8601
new $mol_time_interval( '2015-01/P1M' ).toString() // '2015-01/P1MT'
new $mol_time_interval( '2015-01/P1M' ).toJSON() // '2015-01/P1MT'
```
