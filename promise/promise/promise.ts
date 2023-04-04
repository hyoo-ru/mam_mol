namespace $ {

	export function $mol_promise< Result = void >() {
		
		let done!: ( res: Result | PromiseLike< Result > )=> void
		let fail!: ( error?: any ) => void
		
		const promise = new Promise< Result >( ( d, f ) => {
			done = d
			fail = f
		} )
		
		return Object.assign( promise, {
			done,
			fail,
		} )
		
	}
	
}
