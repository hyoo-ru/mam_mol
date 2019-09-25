namespace $ {
	
	export function $mol_try< Result >( handler : ()=> Result ) : Result|Error {
		try {
			return handler()
		} catch( error ) {
			return error
		}
	}
	
} 
