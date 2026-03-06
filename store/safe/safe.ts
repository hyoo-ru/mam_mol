namespace $ {
	export function $mol_store_safe(cb: () => ReturnType<typeof $mol_store_mock> | null) {
		const native = cb()
		if (! native ) return null

		try {
			native.setItem( '' , '' )
			native.removeItem( '' )
			return native
		} catch (error) {
			console.warn( error )
			return null
		}
	}
}
