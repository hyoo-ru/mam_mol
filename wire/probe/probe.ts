namespace $ {
	
	/** Run code without state changes */
	export function $mol_wire_probe< Value >(
		task : ()=> Value, def?: Value
	) : Value | undefined {
		
		const warm = $mol_wire_fiber.warm
		
		try {
			$mol_wire_fiber.warm = false
			const res = task()
			if( res === undefined ) return def
			return res
		} finally {
			$mol_wire_fiber.warm = warm
		}
		
	}
	
}
