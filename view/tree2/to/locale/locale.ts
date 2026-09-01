namespace $ {

	export function $mol_view_tree2_to_locale(this: $, module: $mol_tree2) {
		const locales: Record<string, string> = {}
		const descr = $mol_view_tree2_classes( module )

		for( const klass of descr.kids ) {

			const props = this.$mol_view_tree2_class_props( klass )
			const acc = { chain: [] as string[] }

			for (const prop of props) {
				const { name } = this.$mol_view_tree2_prop_parts(prop)

				prop.hack<typeof acc>({
					'': ( input, belt, context )=> {
						if( input.type[0] === '@' ) {
							const chain = context.chain?.join('_')
							const path = `${ klass.type }_${ name }${chain.length ? `_${chain}` : ''}`
							locales[path] = input.kids[0].text()
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

								const oname = this.$mol_view_tree2_prop_parts( over ).name
								over.hack( belt, { ... context, chain: [ oname ] } )
		
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
