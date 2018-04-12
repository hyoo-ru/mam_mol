namespace $ {
	
	export type $mol_test_context = ( Window )&( typeof $.$$ )&( typeof $ )

	export function $mol_test( set : { [ name : string ] : string | ( ( context : $mol_test_context )=> void ) } ) {
		for( let name in set ) {
			const code = set[ name ]
			const test = ( typeof code === 'string' ) ? new Function( '' , code ) as ()=> void : code
			$mol_test_all.push( test )
		}
		$mol_test_schedule()
	}

	export let $mol_test_mocks = [] as Array< ( context : $mol_test_context )=> void >

	export const $mol_test_all = [] as Array< ( context : $mol_test_context )=> void >

	export function $mol_test_run() {
		for( var test of $mol_test_all ) {
			let context = Object.create( $$ )
			for( let mock of $mol_test_mocks ) mock( context )
			test( context )
		}
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
