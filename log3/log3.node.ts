namespace $ {

	export function $mol_log3_node_make(
		level : keyof Console ,
		output : 'stdout' | 'stderr',
		type : string ,
		color: ( str: string )=> string ,
	) {

		return function $mol_log3_logger(
			this : $ ,
			event : $mol_log3_event<{}> ,
		) {

			if( !event.time ) event = { ... event, time : new Date().toISOString() }

			let tree = this.$mol_tree2_from_json( event )
			tree = tree.struct( type, tree.kids )
			
			let str = color( tree.toString() )
			;( this.console[ level ] as any )( str )
	
			const self = this
			return ()=> self.console.groupEnd()

		}

	}

	$.$mol_log3_come = $mol_log3_node_make( 'info' , 'stdout' , 'come' , $mol_term_color.blue )
	$.$mol_log3_done = $mol_log3_node_make( 'info' , 'stdout' , 'done' , $mol_term_color.green )
	$.$mol_log3_fail = $mol_log3_node_make( 'error' , 'stderr' , 'fail' , $mol_term_color.red )
	$.$mol_log3_warn = $mol_log3_node_make( 'warn' , 'stderr' , 'warn' , $mol_term_color.yellow )
	$.$mol_log3_rise = $mol_log3_node_make( 'log' , 'stdout' , 'rise' , $mol_term_color.magenta )
	$.$mol_log3_area = $mol_log3_node_make( 'log' , 'stdout' , 'area' , $mol_term_color.cyan )

}
