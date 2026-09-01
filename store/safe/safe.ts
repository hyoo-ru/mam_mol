namespace $ {
	export function $mol_store_safe<Store extends {
		setItem(key: string, value: string ): void
		removeItem(key: string): void
	}>(cb: () => Store | null) {
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
