namespace $ {

	export class $mol_build2_bundle_css extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix()
			const output = slice.pack().output()

			const target = output.resolve( `${prefix}.css` )
			const target_map = output.resolve( `${prefix}.css.map` )

			const result = {
				css: '/* CSS compiles into js bundle now! */',
				map: '/* CSS compiles into js bundle now! */',
			}

			target.text( result.css )
			target_map.text( JSON.stringify( result.map, null, '\t' ) )

			this.log( target, Date.now() - start )

			return [ target, target_map ]
		}

	}

}
