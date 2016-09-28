module $ {
	
	export function $mol_test( code : string | { ( test : $mol_test_case ) : void } ) {
		$mol_test_all.push( new $mol_test_case( code ) )
	}
	
	export var $mol_test_all : $mol_test_case[] = []
	
	export var $mol_test_run = () => {
		for( var test of $mol_test_all ) {
			test.run()
		}
	}
	
	export class $mol_test_case {
		
		code : { ( test : $mol_test_case ) : void }
		
		constructor( code : string | { ( test : $mol_test_case ) : void } ) {
			if( typeof code === 'string' ) {
				this.code = <any> new Function( 'test' , code )
			} else {
				this.code = code
			}
		}
		
		run() {
			this.code.call( null , this )
		}
		
		done() {
		}
		
		ok( value : any ) {
			if( value ) return
			throw new Error( `Not true (${value})` )
		}
		
		not( value : any ) {
			if( !value ) return
			throw new Error( `Not false (${value})` )
		}
		
		fail( message : string ) {
			throw new Error( message )
		}
		
		equal< Value >( a : Value , b : Value ) {
			if( a === b ) return
			throw new Error( `Not equal (${a},${b})` )
		}
		
		unique< Value >( a : Value , b : Value ) {
			if( a !== b ) return
			throw new Error( `Not unique (${a},${b})` )
		}
		
	}

	/// Positive tests
	$mol_test( test => {
		test.ok( 1 )
		test.not( 0 )
		test.equal( 2 , 2 )
		test.unique( [ 3 ] , [ 3 ] )
		test.done()
	} )
	
}
