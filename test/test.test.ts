namespace $ {

	export namespace $$ { let $ }
	
	export function $mol_test( set : { [ name : string ] : string | ( ( context : $mol_ambient_context )=> void ) } ) {
		
		for( let name in set ) {

			const code = set[ name ]
			const test = ( typeof code === 'string' ) ? new Function( '' , code ) as ()=> void : code
			
			$mol_test_all.push( test )
		}

		$mol_test_schedule()
	}

	export let $mol_test_mocks = [] as Array< ( context : $mol_ambient_context )=> void >

	export const $mol_test_all = [] as Array< ( context : $mol_ambient_context )=> void >

	export async function $mol_test_run() {

		for( var test of $mol_test_all ) {

			let context = Object.create( $$ )
			for( let mock of $mol_test_mocks ) await mock( context )
			
			await test( context )
		}
		
		$mol_ambient({}).$mol_log3_done({
			place : '$mol_test' , 
			message : 'Completed' ,
			count : $mol_test_all.length ,
		})
		
	}
	
	let scheduled = false
	export function $mol_test_schedule() {

		if( scheduled ) return
		scheduled = true

		setTimeout( ()=> {
			scheduled = false
 			$mol_test_run()
		} , 0 )
		
	}


	$mol_test_mocks.push( context => {
		let seed = 0

		context.Math = Object.create( Math )
		context.Math.random = ()=> Math.sin( seed++ )

		const forbidden = [ 'XMLHttpRequest' , 'fetch' ]

		for( let api of forbidden ) {
			context[ api ] = new Proxy( function(){} , {
				get() {
					$mol_fail_hidden( new Error( `${ api } is forbidden in tests` ) )
				} ,
				apply() {
					$mol_fail_hidden( new Error( `${ api } is forbidden in tests` ) )
				} ,
			} )
		}
		
	} )

	$mol_test({

		'mocked Math.random'( $ ) {
			console.assert( $.Math.random() === 0 )
			console.assert( $.Math.random() === Math.sin(1) )
		} ,

		'forbidden XMLHttpRequest'( $ ) {
			try {
				console.assert( void new $.XMLHttpRequest )
			} catch( error ) {
				console.assert( error.message === 'XMLHttpRequest is forbidden in tests' )
			}
		} ,

		'forbidden fetch'( $ ) {
			try {
				console.assert( void $.fetch('') )
			} catch( error ) {
				console.assert( error.message === 'fetch is forbidden in tests' )
			}
		} ,

	})

}
