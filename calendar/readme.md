# $mol_calendar

Draws all days of month as table.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_calendar)

## Usage example
```
<= Month $mol_calendar
	month_moment <= moment $mol_time_moment
```

## Properties

**`month_moment() : $mol_time_moment`**

Displayed month as moment.

**`month_string() : string`**

Displayed month as string in iso format like `2017-01`.

## Days modificators

**`day_selected( day : string ) : boolean`**

Returns true when day should be marked as selected. Current day is selected by default.

**`day_ghost( day : string ) : boolean`**

Returns true when day should be half visible. Days of other months are half-visible by default.

**`day_holiday( day : string ) : boolean`**

Returns true when day should be marked as holiday. Weekends are holidays by default.
