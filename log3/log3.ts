namespace $ {

	/** Logger event data */
	export type $mol_log3_event< Fields > = {
		[ key in string ] : unknown
	} & {
		
		/** Time of event creation */
		time? : string

		/** Place of event creation */
		place : unknown

		/** Short description of event */
		message : string

	} & Fields

	/** Logger function */
	export type $mol_log3_logger< Fields , Res = void > = (
		this : $ ,
		event : $mol_log3_event< Fields > ,
	)=> Res

	/** Log begin of some task */
	export declare let $mol_log3_come : $mol_log3_logger<{}>
	
	/** Log end of some task */
	export declare let $mol_log3_done : $mol_log3_logger<{}>
	
	/** Log error */
	export declare let $mol_log3_fail : $mol_log3_logger<{}>
	
	/** Log warning message */
	export declare let $mol_log3_warn : $mol_log3_logger<{ hint : string }>
	
	/** Log some generic event */
	export declare let $mol_log3_rise : $mol_log3_logger<{}>

	/** Log begin of log group, returns func to close group */
	export declare let $mol_log3_area : $mol_log3_logger< {} , ()=> void >

	/** Log begin of collapsed group only when some logged inside, returns func to close group */
	export function $mol_log3_area_lazy(
		this : $ ,
		event : $mol_log3_event<{}> ,
	) {

		const self = this.$
		const stack = self.$mol_log3_stack

		const deep = stack.length
		let logged = false

		stack.push( ()=> {
			logged = true
			self.$mol_log3_area.call( self , event )
		} )

		return ()=> {
			if( logged ) self.console.groupEnd()
			if( stack.length > deep ) stack.length = deep
		}

	}

	export let $mol_log3_stack = [] as ( ()=> void )[]

}
