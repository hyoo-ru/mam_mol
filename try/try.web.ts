namespace $ {
	
	let error : Error
	let result : any
	let handler : ()=> any
	
	/// Debugger will stop at exceptions but exception will be returned normally
	export function $mol_try< Result >( handler2 : ()=> Result ) : Result|Error {
		
		handler = handler2
		error = void 0
		result = void 0
		
		window.dispatchEvent( new Event( '$mol_try' ) )
		
		const error2 = error
		const result2 = result

		error = void 0
		result = void 0
		
		return error2 || result2
	}
	
	window.addEventListener( '$mol_try' , ( event : any )=> {
		result = handler()
	} , true )
	
	window.addEventListener( 'error' , ( event : ErrorEvent )=> {
		error = event.error
	} , true )
	
} 
