namespace $ {

	export function $mol_log3_node_make(
		level : keyof Console ,
		output : 'stdout' | 'stderr',
		type : string ,
		color: keyof typeof $node.colorette ,
	) {

		return function $mol_log3_logger(
			this : $mol_ambient_context ,
			event : $mol_log3_event<{}> ,
		) {

			if( !event.time ) event = { time : new Date().toISOString() , ... event }

			const tree = this.$mol_tree.fromJSON( event ).clone({ type })
			let str = tree.toString()

			if( process[output].isTTY ) {
				str = $node.colorette[ color + 'Bright' ]( str )
			}

			this.console[ level ]( str )
	
			const self = this
			return ()=> self.console.groupEnd()

		}

	}

	$.$mol_log3_come = $mol_log3_node_make( 'info' , 'stdout' , 'come' , 'blue' )
	$.$mol_log3_done = $mol_log3_node_make( 'info' , 'stdout' , 'done' , 'green' )
	$.$mol_log3_fail = $mol_log3_node_make( 'error' , 'stderr' , 'fail' , 'red' )
	$.$mol_log3_warn = $mol_log3_node_make( 'warn' , 'stderr' , 'warn' , 'yellow' )
	$.$mol_log3_rise = $mol_log3_node_make( 'log' , 'stdout' , 'rise' , 'magenta' )
	$.$mol_log3_area = $mol_log3_node_make( 'log' , 'stdout' , 'area' , 'cyan' )

}
