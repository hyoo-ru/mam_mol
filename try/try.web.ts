namespace $ {
	
	let error : any
	let result : any
	let handler : ()=> any
	
	/// Debugger will stop at exceptions but exception will be returned normally
	export function $mol_try_web< Result >( handler2 : ()=> Result ) : Result | Error {
		
		handler = handler2
		error = undefined
		result = undefined
		
		window.dispatchEvent( new Event( '$mol_try' ) )
		
		const error2 = error
		const result2 = result

		error = undefined
		result = undefined
		
		return error2 || result2
	}

	$.$mol_try = $mol_try_web
	
	self.addEventListener( '$mol_try' , ( event : any )=> {
		result = handler()
	} , true )
	
	self.addEventListener( 'error' , ( event : ErrorEvent )=> {
		error = event.error
	} , true )
	
} 
