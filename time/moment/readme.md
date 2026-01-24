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
// same
new $mol_time_moment([ 2015, 6, 18, 17, 27, 58.65, 180 ])
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

// create moment by shift one to local offset
new $mol_time_moment( '2015-07-19T19:24+03:00' ).toOffset() // new $mol_time_moment( '2015-07-16T16:24+03:00' )
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

# Benchmarks

## Parsing

[![](https://i.imgur.com/03Nx1Q8.png)](https://perf.js.hyoo.ru/#prefix=const%20iso%20%3D%20'2015-07-20T07%3A48%3A28.338Z'%0A%0Alet%20res/sources=%5B%22res%20%3D%20new%20Date%28%20iso%20%29%22%2C%22res%20%3D%20new%20%24mol_time_moment%28%20iso%20%29%22%2C%22res%20%3D%20moment%28%20iso%20%29%22%2C%22res%20%3D%20luxon.DateTime.fromISO%28%20iso%20%29%22%2C%22res%20%3D%20dayjs%28%20iso%20%29%22%2C%22res%20%3D%20JSJoda.ZonedDateTime.parse%28iso%29%22%2C%22res%20%3D%20dateFns.parse%28%20iso%20%29%22%5D/postfix/prefixes=%5Bnull%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fmol_time_all%401.1.12%2Fweb.js'%5Cn%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fmoment.js%2F2.26.0%2Fmoment.min.js'%5Cn%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fluxon%401.24.1%2Fbuild%2Fglobal%2Fluxon.min.js'%5Cn%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fdayjs%401.8.21%2Fdayjs.min.js'%5Cn%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40js-joda%2Fcore%401.11.0%2Fdist%2Fjs-joda.js'%5Cn%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fdate-fns%2F1.30.1%2Fdate_fns.min.js'%5Cn%29%22%5D)

## Formatting by pattern

[![](https://i.imgur.com/taT7FVD.png)](https://perf.js.hyoo.ru/#prefix=const%20iso%20%3D%20'2015-07-20T07%3A48%3A28.338Z'%0A%0Alet%20res/sources=%5B%22res%20%3D%20iMol.toString%28'DD.MM.YYYY'%29%22%2C%22res%20%3D%20iMoment.format%28'DD.MM.YYYY'%29%22%2C%22res%20%3D%20iLuxon.toUTC%28%29%5Cn.toFormat%28'dd.MM.yyyy'%29%22%2C%22res%20%3D%20iDayJS.format%28'DD.MM.YYYY'%29%22%2C%22res%20%3D%20iJSJoda.format%28pattern%29%22%5D/postfix=%24mol_assert_equal%28%20res%2C%20'20.07.2015'%20%29/prefixes=%5B%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fmol_time_all%401.1.12%2Fweb.js'%5Cn%29%5Cnconst%20iMol%20%3D%20new%20%24mol_time_moment%28%20iso%20%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fmoment.js%2F2.26.0%2Fmoment.min.js'%5Cn%29%5Cnconst%20iMoment%20%3D%20moment%28%20iso%20%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fluxon%401.24.1%2Fbuild%2Fglobal%2Fluxon.min.js'%5Cn%29%5Cnconst%20iLuxon%20%3D%20luxon.DateTime.fromISO%28%20iso%20%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Funpkg.com%2Fdayjs%401.8.21%2Fdayjs.min.js'%5Cn%29%5Cnconst%20iDayJS%20%3D%20dayjs%28%20iso%20%29%22%2C%22%24mol_import.script%28%5Cn%5Ct'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40js-joda%2Fcore%401.11.0%2Fdist%2Fjs-joda.js'%5Cn%29%5Cnconst%20pattern%20%3D%20JSJoda.DateTimeFormatter.ofPattern%28'dd.MM.yyyy'%29%5Cnconst%20iJSJoda%20%3D%20JSJoda.ZonedDateTime.parse%28%20iso%20%29%22%5D)

## Localized output

[![](https://pbs.twimg.com/media/EjL10SqX0AEq1JS?format=png&name=large)](https://perf.js.hyoo.ru/#prefix=%24mol_import.script%28'https%3A%2F%2Funpkg.com%2Fmol_time_all%401.1.11%2Fweb.js'%29%0Aconst%20locale%20%3D%20%24mol_locale.lang%28%29%0A%0A%24mol_import.script%28'https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fmoment.js%2F2.26.0%2Fmoment-with-locales.min.js'%29%0Amoment.locale%28%20locale%20%29%0A%0A%24mol_import.script%28'https%3A%2F%2Funpkg.com%2Fluxon%401.24.1%2Fbuild%2Fglobal%2Fluxon.min.js'%29%0Aluxon.Settings.defaultLocale%20%3D%20locale%0A%0A%24mol_import.script%28'https%3A%2F%2Funpkg.com%2Fdayjs%401.8.21%2Fdayjs.min.js'%29%0A%24mol_import.script%28%60https%3A%2F%2Funpkg.com%2Fdayjs%401.8.21%2Flocale%2F%24%7Blocale%7D.js%60%29%0Adayjs.locale%28%20locale%20%29%0A%0A%24mol_import.script%28'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40js-joda%2Fcore%401.11.0%2Fdist%2Fjs-joda.min.js'%29%0A%24mol_import.script%28'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40js-joda%2Flocale_en'%29%0Aconst%20yodaPattern%20%3D%20JSJoda.DateTimeFormatter.ofPattern%28'dd%20MMMM%20yyyy'%29.withLocale%28JSJodaLocale.Locale.US%29%0A%0A%24mol_import.script%28'https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fdate-fns%2F1.30.1%2Fdate_fns.min.js'%29%0A%0Alet%20iso%20%3D%20'2015-07-20T07%3A48%3A28.338Z'%0Alet%20res/sources=%5B%22res%20%3D%20new%20%24mol_time_moment%28iso%29%5Cn.toString%28'DD%20Month%20YYYY'%29%22%2C%22res%20%3D%20moment%28iso%29%5Cn.format%28'DD%20MMMM%20YYYY'%29%22%2C%22res%20%3D%20luxon.DateTime.fromISO%28iso%29.toUTC%28%29%5Cn.toFormat%28'dd%20MMMM%20yyyy'%29%22%2C%22res%20%3D%20dayjs%28%20iso%20%29%5Cn.format%28'DD%20MMMM%20YYYY'%29%22%2C%22res%20%3D%20JSJoda.ZonedDateTime.parse%28iso%29%5Cn.format%28yodaPattern%29%22%2C%22res%20%3D%20dateFns.format%28%5Cn%5CtdateFns.parse%28%20iso%20%29%2C%5Cn%5Ct'DD%20MMMM%20YYYY'%2C%5Cn%29%22%5D/postfix=%24mol_assert_equal%28%20res%20%2C%20'20%20%D0%B8%D1%8E%D0%BB%D1%8F%202015'%20%29%0A)
