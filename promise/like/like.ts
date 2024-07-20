namespace $ {
	
	export function $mol_promise_like( val: any ): val is Promise<any> {
		try {
			return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function'
		} catch {
			return false
		}
	}

}
