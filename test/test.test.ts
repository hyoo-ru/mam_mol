namespace $ {
	
	export function $mol_test( set : { [ name : string ] : string | ( ()=> void ) } ) {
		for( let name in set ) $mol_test_all.push( new $mol_test_case( set[ name ] ) )
		$mol_test_schedule()
	}
	
	export var $mol_test_all : $mol_test_case[] = []
	
	export var $mol_test_run = () => {
		for( var test of $mol_test_all ) {
			test.run()
		}
	}
	
	export class $mol_test_case {
		
		code : ()=> void
		
		constructor( code : string | ( ()=> void ) ) {
			if( typeof code === 'string' ) {
				this.code = new Function( code ) as any
			} else {
				this.code = code
			}
		}
		
		run() {
			this.code()
		}
		
	}

	let scheduled = false
	export function $mol_test_schedule() {
		if( scheduled ) return
		scheduled = true

		setTimeout( ()=> {
			scheduled = false
 			$mol_test_run()
		} )
	}
	
}
