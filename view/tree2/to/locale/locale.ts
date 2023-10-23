namespace $ {

	export function $mol_view_tree2_to_locale(this: $, module: $mol_tree2) {
		const locales: Record<string, string> = {}
		const descr = $mol_view_tree2_classes( module )

		for( const klass of descr.kids ) {

			const props = this.$mol_view_tree2_class_props( klass )
			const acc = { chain: [] as string[] }

			for (const prop of props) {
				const { name } = $mol_view_tree2_prop_signature_parts(prop)

				prop.hack<typeof acc>({
					'': ( input, belt, context )=> {
						if( input.type[0] === '@' ) {
							const chain = context.chain?.join('_')
							const path = `${ klass.type }_${ name }${chain.length ? `_${chain}` : ''}`
							locales[path] = input.kids[0].value
						}

						if( input.type[0] === '*' ) {
							for( const field of input.kids ) {
								if( field.type === '^' ) continue

								const field_name = field.type.replace(/\?\w*$/, '')

								field.hack( belt, {
									... context,
									chain: [
										...context.chain ?? [],
										field_name
									]
								})
							}
						}

						if( /^[$A-Z]/.test( input.type ) ) {
							for( const over of input.kids ) {
								if( over.type === '/' ) continue

								const oname = $mol_view_tree2_prop_signature_parts( over ).name
								const bind = over.kids[0]

								if( bind.type === '@' ) {
									const path = `${ klass.type }_${ name }_${ oname }`
									locales[path] = bind.kids[0].value
								}
		
							}
						}

						return [ input ]
					}
				}, acc)
			}
		}

		return locales
	}
}
