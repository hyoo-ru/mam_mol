namespace $ {

	export namespace $$ { let $ }
	
	export function $mol_test( set : { [ name : string ] : string | ( ( context : $mol_ambient_context )=> void ) } ) {
		
		for( let name in set ) {

			const code = set[ name ]
			const test = ( typeof code === 'string' ) ? new Function( '' , code ) as ()=> void : code
			
			$mol_test_all.push( $mol_log_group( name , test ) )
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
		
		console.info( '$mol_test completed' , $mol_test_all.length )
	}
	
	let scheduled = false
	export function $mol_test_schedule() {

		if( scheduled ) return
		scheduled = true

		setTimeout( $mol_log_group( '$mol_test' , ()=> {
			scheduled = false
 			$mol_test_run()
		} ) , 500 )
		
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

	function connect() {
		const uri = document.location.origin.replace( /^http/ , 'ws' ) + document.location.pathname
		const socket = new $mol_dom_context.WebSocket( uri )
		socket.onclose = ()=> setTimeout( ()=> connect() , 1000 )
		socket.onmessage = message => {
			console.log(message)
			if( message.data !== '$mol_build_server:obsoleted' ) return
			$mol_dom_context.location.reload()
		}
	}
	connect()
	
}
