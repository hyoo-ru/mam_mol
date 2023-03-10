namespace $.$$ {
	export class $mol_pick_time extends $.$mol_pick_time {

		trigger_content() {
			return [ this.value() || this.Icon() ]
		}

		@ $mol_mem
		value_moment( next?: $mol_time_moment ): $mol_time_moment {

			let value = this.value()

			if( next === undefined ) {
				const moment = $mol_wire_probe( () => this.value_moment() )
				return time_with_moment( value, moment )
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

		hour_selected( hour: number ) {
			return this.value_moment()?.hour === hour
		}

		minute_selected( minute: number ) {
			return this.value_moment()?.minute === minute
		}

		hour_click( hour: number ) {
			const moment = this.value_moment()
			const minute = moment?.minute ?? 0
			this.value_moment( moment?.merge( { hour, minute } ) || new $mol_time_moment( { hour, minute } ) )
		}

		minute_click( minute: number ) {
			const moment = this.value_moment()
			const hour = moment?.hour ?? new $mol_time_moment().hour
			this.value_moment( moment?.merge( { hour, minute } ) || new $mol_time_moment( { hour, minute } ) )
			this.showed( false )
		}

		hour_matrix(): readonly any[] {
			return [
				[ 0, 1, 2, 3, 4, 5 ],
				[ 6, 7, 8, 9, 10, 11 ],
				[ 12, 13, 14, 15, 16, 17 ],
				[ 18, 19, 20, 21, 22, 23 ],
			]
		}

		minute_matrix(): readonly any[] {
			return [
				[ 0, 5, 10, 15, 20, 25 ],
				[ 30, 35, 40, 45, 50, 55 ],
			]
		}

	}

	export class $mol_pick_time_numbers extends $.$mol_pick_time_numbers {

		sub() {
			return this.number_matrix().map( ( arr, index ) => this.Column( index ) )
		}

		numbers( col_index: number ) {
			return this.number_matrix()[ col_index ].map( ( text: string ) => this.Number( text ) )
		}

		number_text( id: string ) {
			return String( 100 + id ).slice( 1 )
		}

		number_theme( number: string ) {
			return this.number_selected( number ) ? '$mol_theme_current' : super.number_theme( number )
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
