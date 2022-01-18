namespace $ {
	
	export function $mol_wire_probe< Value >(
		task : ()=> Value, next?: Value
	) : Value | undefined {
		
		const warm = $mol_wire_fiber.warm
		
		try {
			$mol_wire_fiber.warm = false
			return task()
		} finally {
			$mol_wire_fiber.warm = warm
		}
		
	}
	
}
