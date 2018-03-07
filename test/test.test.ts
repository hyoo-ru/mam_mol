namespace $ {
	
	export function $mol_test( set : { [ name : string ] : string | ( ()=> void ) } ) {
		for( let name in set ) {
			const code = set[ name ]
			const test = ( typeof code === 'string' ) ? new Function( '' , code ) as ()=> void : code
			$mol_test_all.push( test )
		}
		$mol_test_schedule()
	}
	
	export const $mol_test_all = [] as Array< ()=> void >

	export function $mol_test_run() {
		for( var test of $mol_test_all ) test()
	}
	
	let scheduled = false
	export function $mol_test_schedule() {
		if( scheduled ) return
		scheduled = true

		setTimeout( $mol_log_group( '$mol_test_run()' , ()=> {
			scheduled = false
 			$mol_test_run()
		} ) )
	}
	
}
