namespace $ {

	export function $mol_log3_web_make(
		level : $mol_type_keys_extract< Console, Function >,
		color : string,
	) {

		return function $mol_log3_logger(
			this : $ ,
			event : $mol_log3_event<{}> ,
		) {

			const pending = this.$mol_log3_stack.pop()
			if( pending ) pending()

			let tpl = '%c'
			const chunks = Object.values( event )

			for( let i = 0 ; i < chunks.length ; ++i ) {
				tpl += ( typeof chunks[i] === 'string' ) ? ' ▫ %s' : ' ▫ %o'
			}
	
			const style = `color:${color};font-weight:bolder`

			;( this.console[ level ] as any )( tpl , style , ... chunks )

			const self = this
			return ()=> self.console.groupEnd()

		}

	}

	$.$mol_log3_come = $mol_log3_web_make( 'info' , 'royalblue' )
	$.$mol_log3_done = $mol_log3_web_make( 'info' , 'forestgreen' )
	$.$mol_log3_fail = $mol_log3_web_make( 'error' , 'orangered' )
	$.$mol_log3_warn = $mol_log3_web_make( 'warn' , 'goldenrod' )
	$.$mol_log3_rise = $mol_log3_web_make( 'log' , 'magenta' )
	$.$mol_log3_area = $mol_log3_web_make( 'group' , 'cyan' )

}
