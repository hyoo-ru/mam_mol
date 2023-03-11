namespace $.$$ {
	export class $mol_pick_time extends $.$mol_pick_time {

		trigger_content() {
			return [ this.value() || this.Icon() ]
		}

		@ $mol_mem
		value_moment( next?: $mol_time_moment ): $mol_time_moment {

			if( next === undefined ) {
				const moment = $mol_wire_probe( () => this.value_moment() )
				return time_with_moment( this.value(), moment )
			}

			this.value( next?.toString( 'hh:mm' ) || '' )

			return next
		}

		@ $mol_mem
		value( next?: string ): string {

			if( next === undefined ) {
				const moment = this.value_moment()
				return moment?.toString( 'hh:mm' ) || ''
			}

			this.value_moment( time_with_moment( next, this.value_moment() ) )

			return next
		}

		@ $mol_mem
		hour_selected( hour_str?: string ): string {

			if( hour_str === undefined ) {
				return this.value_moment().toString( 'h' )
			}

			const moment = this.value_moment()
			const minute = moment?.minute ?? 0
			const hour = Number( hour_str )
			this.value_moment( moment?.merge( { hour, minute } ) || new $mol_time_moment( { hour, minute } ) )

			return hour_str
		}

		@ $mol_mem
		minute_selected( minute_str?: string ) {

			if( minute_str === undefined ) {
				return this.value_moment().toString( 'm' )
			}

			const moment = this.value_moment()
			const hour = moment?.hour ?? new $mol_time_moment().hour
			const minute = Number( minute_str )
			this.value_moment( moment?.merge( { hour, minute } ) || new $mol_time_moment( { hour, minute } ) )

			this.showed( false )

			return minute_str
		}

		hour_options() {
			return {
				'0': '00', '1': '01', '2': '02', '3': '03', '4': '04', '5': '05',
				'6': '06', '7': '07', '8': '08', '9': '09', '10': '10', '11': '11',
				'12': '12', '13': '13', '14': '14', '15': '15', '16': '16', '17': '17',
				'18': '18', '19': '19', '20': '20', '21': '21', '22': '22', '23': '23',
			}
		}

		minute_options() {
			return {
				'0': '00', '5': '05', '10': '10', '15': '15', '20': '20', '25': '25',
				'30': '30', '35': '35', '40': '40', '45': '45', '50': '50', '55': '55',
			}
		}

	}

	function time_with_moment( value_str: string, moment?: $mol_time_moment ): $mol_time_moment {
		const [ hour, minute ] = value_str.split( ':' ).map( str => Number( str ) )
		if( value_str ) {
			return moment ?
				moment.merge( new $mol_time_moment( { hour, minute } ) ) :
				new $mol_time_moment( { hour, minute } )
		} else {
			return moment ?
				new $mol_time_moment( moment.toString( 'YYYY-MM-DD' ) ) :
				new $mol_time_moment( {} )
		}
	}
}
