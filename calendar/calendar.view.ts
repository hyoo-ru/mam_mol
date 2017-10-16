namespace $.$mol {
	
 	export class $mol_calendar extends $.$mol_calendar {

		@ $mol_mem
		month_moment() {
			const moment = new $mol_time_moment( this.month_string() || undefined )
			return new $mol_time_moment({ year : moment.year , month : moment.month })
		}

		title() {
			return this.month_moment().toString( 'Month YYYY' )
		}

		@ $mol_mem
		day_first() {
			return this.month_moment().merge({ day : 0 })
		}

		@ $mol_mem
		day_last() {
			return this.day_first().shift( 'P1M' )
		}

		@ $mol_mem
		day_draw_from() {
			let weekday = this.day_first().weekday
			return this.day_first().shift({ day : - weekday })
		}

		@ $mol_mem
		weekdays() {
			const next : $mol_view[] = []
			for( let index = 0 ; index < 7 ; ++index ) {
				next.push( this.Weekday( index ) )
			}
			return next
		}

		@ $mol_mem_key
		weekday( index : number ){
			return this.day_draw_from().shift({ day : index }).toString( 'WD' )
		}

		weekend( index : number ){
			return [ 5 , 6 ].indexOf( index ) >= 0
		}

		@ $mol_mem
		weeks_count() {

			const interval = new $mol_time_interval({
				start : this.day_draw_from() , 
				end : this.day_last() ,
			})
			
			return Math.ceil( interval.duration.count({ day : 7 }) )
		}

		@ $mol_mem
		weeks() {
			const weeks : $mol_view[] = []
			let count = this.weeks_count()

			for( let i = 0; i < count; ++i ) {
				weeks.push( this.Week( i ) )
			}

			return weeks
		}

		@ $mol_mem_key
		week_days( index : number ) {
			const days : $mol_view[] = []
			
			let start = this.day_draw_from().shift({ day : index * 7 })
			
			for( let i = 0 ; i < 7 ; ++i ) {
				days.push( this.Day( start.shift({ day : i }).toString( 'YYYY-MM-DD' ) ) )
			}
			
			return days
		}

		@ $mol_mem_key
		day_text( day : string ) {
			return new $mol_time_moment( day ).toString( "D" )
		}

		@ $mol_mem_key
		day_holiday( day : string ) {
			return this.weekend( new $mol_time_moment( day ).weekday )
		}

		@ $mol_mem_key
		day_ghost( day : string ) {
			return new $mol_time_moment( day ).toString( 'YYYY-MM' ) !== this.day_first().toString( 'YYYY-MM' )
		}

		@ $mol_mem_key
		day_selected( day : string ) {
			return new $mol_time_moment().toString( 'YYYY-MM-DD' ) === day
		}

	 }

}
