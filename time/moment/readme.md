# $mol_time_moment

Immutable iso8601 time moment representation.

## Creating

```js
// current time in current time zone
new $mol_time_moment()

// by timestamp
new $mol_time_moment( 1437316165000 )

// by native Date
new $mol_time_moment( new Date )

// by iso8601 string
new $mol_time_moment( '2015-07-19T17:27:58.065+03:00' ) // full time
new $mol_time_moment( '2015-07-19T17:27:58.065' ) // time without offset (non local!)
new $mol_time_moment( '2015-07-19' ) // date without time (non 00:00:00)
new $mol_time_moment( 'T17:27' ) // time without date and seconds

// by components
new $mol_time_moment({
	year : 2015 ,
	month : 6 , // 0 - January
	day : 18 , // 0 - first day of month
	hour : 17 ,
	minute : 27 ,
	second : 58.65 , // fractional, no property "millisecond"
	offset : { // this is $mol_time_duration_config
		hour : 3 ,
		minute : 0 ,
	} ,
})
```

## Getters

```js
// Component value (undefined by default)
moment.year // number
moment.month // [ 0 .. 12 ]
moment.day // [ 0 .. 31 ]
moment.hour // [ 0 .. 23 ]
moment.minute // [ 0 .. 59 ]
moment.second // [ 0 .. 60 ) (fractional)
moment.offset // $mol_time_duration

// Day of week
moment.weekday // 0 - monday , 6 - sunday

// Timestamp
moment.valueOf() // count of milliseconds from unix epoch

// Native Date
moment.native // Date instance

// Iso8601 string
moment.toString()
moment.toJSON()
```

## Arithmetic

```js
// create moment by normalize one
new $mol_time_moment( '2015-07-35' ).normal // new $mol_time_moment( '2015-08-04' )

// create moment by merge one moment with another
new $mol_time_moment( '2015-07-19' ).merge({ month : 7 , day : 4 }) // new $mol_time_moment( '2015-08-05' )

// create moment by shift one by duration
new $mol_time_moment( '2015-07-19' ).shift( 'P16D' ) // new $mol_time_moment( '2015-08-04' )

// create moment by shift one to offset
new $mol_time_moment( '2015-07-19T19:24+03:00' ).toOffset( 'Z' ) // new $mol_time_moment( '2015-07-19T16:24+00:00' )
```

## Serialization

```js
new $mol_time_moment().toString( 'YYYY-MM-DD hh:mm (WeekDay)' ) // "2015-07-20 07:22 (monday)"
```

Mnemonics:
- single letter for numbers: *M* - month number, *D* - day of month.
- uppercase letters for dates, lowercase for times: *M* - month number , *m* - minutes number
- repeated letters for define register count: *YYYY* - full year, *YY* - shot year, *MM* - padded month number
- words for word representation: *Month* - month name, *WeekDay* - day of week name
- shortcuts: *WD* - short day of week, *Mon* - short month name.

## Comparison

### Native Date

- instance is timestamp representation (forever have time and timezone)
- instance is mutable object
- inconsistent, poor api
- zero lib size, but very large client code
- fastest

Speed of iso8601 serialization:
```js
var m = new Date ; console.time('test') ; for( var i = 0 ; i < 100000 ; ++i ) m.toISOString() ; console.timeEnd('test')
// 150ms
```

Speed of iso8601 parsing:
```js
console.time('test') ; for( var i = 0 ; i < 10000 ; ++i ) new Date( '2015-07-20T07:48:28.338+03:00' ) ; console.timeEnd('test')
// 20ms
```

### MomentJS

- instance is wrapper around native Date instance
- instance is timestamp representation (forever have time and timezone)
- instance is mutable object
- large lib size (100kb core + plugins)
- slow
- too more specific features, but some basics supports only by plugins

Speed of iso8601 serialization:
```js
var m = moment() ; console.time('test') ; for( var i = 0 ; i < 100000 ; ++i ) t.toISOString() ; console.timeEnd('test')
// 470ms
```

Speed of iso8601 parsing:
```js
console.time('test') ; for( var i = 0 ; i < 10000 ; ++i ) moment( '2015-07-20T07:48:28.338+03:00' ) ; console.timeEnd('test')
// 440ms
```

### $mol_time_moment

- all time components stores separately
- instance is immmutable object
- cool consistent api
- small lib size (23kb)
- fast

Speed of iso8601 serialization:
```js
var m = new $mol_time_moment() ; console.time('test') ; for( var i = 0 ; i < 100000 ; ++i ) m.toString() ; console.timeEnd('test')
// 150ms
```

Speed of iso8601 parsing:
```js
console.time('test') ; for( var i = 0 ; i < 10000 ; ++i ) $mol_time_moment( '2015-07-20T07:48:28.338+03:00' ) ; console.timeEnd('test')
// 40ms
```
