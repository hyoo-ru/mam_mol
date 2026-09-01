namespace $ {

	export function $mol_test( set : { [ name : string ] : string | ( ( context : $ )=> void ) } ) {
		
		for( let name in set ) {

			const code = set[ name ]
			const test = ( typeof code === 'string' ) ? new Function( '' , code ) as ()=> void : code
			
			$mol_test_all.push( test )
		}

		$mol_test_schedule()
	}

	export let $mol_test_mocks = [] as Array< ( context : $ )=> void >

	export const $mol_test_all = [] as Array< ( context : $ )=> any >

	export async function $mol_test_run() {

		for( var test of $mol_test_all ) {

			let context = Object.create( $$ )
			for( let mock of $mol_test_mocks ) await mock( context )
			
			const res = test( context )
			if( $mol_promise_like( res ) ) {
				await new Promise( ( done, fail )=> {
					res.then( done, fail )
					setTimeout( ()=> fail( new Error( 'Test timeout: ' + test.name ) ), 1000 )
				} )
			}
			
		}
		
		$$.$mol_log3_done({
			place: '$mol_test',
			message: 'All tests passed',
			count: $mol_test_all.length,
		})
		
	}
	
	let scheduled = false
	export function $mol_test_schedule() {

		if( scheduled ) return
		scheduled = true

		setTimeout( async ()=> {
			
			scheduled = false
 			
			await $mol_test_run()
			$$.$mol_test_complete()
			
		} , 1000 )
		
	}

	$mol_test_mocks.push( context => {
		let seed = 0

		context.Math = Object.create( Math )
		context.Math.random = ()=> Math.sin( seed++ )

		const forbidden = [ 'XMLHttpRequest' , 'fetch' ] as const

		for( let api of forbidden ) {
			context[ api ] = new Proxy( function(){} as any , {
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
			} catch( error: any ) {
				console.assert( error.message === 'XMLHttpRequest is forbidden in tests' )
			}
		} ,

		'forbidden fetch'( $ ) {
			try {
				console.assert( void $.fetch('') )
			} catch( error: any ) {
				console.assert( error.message === 'fetch is forbidden in tests' )
			}
		} ,

	})

}
