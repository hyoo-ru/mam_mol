namespace $ {

	export class $mol_build2_bundle_mjs extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const [ targetJS, targetJSMap ] = this.root().bundle( this.$.$mol_build2_bundle_js ).artifacts( slice )
			if (! targetJS) return []

			const targetMJS = targetJS.parent().resolve( targetJS.name().replace(/\.js$/, '.mjs') )
			targetMJS.text( targetJS.text().replace(/(^\/\/# sourceMappingURL.*)/m, 'export default $\n$1') )

			this.log( targetMJS, Date.now() - start )

			return [ targetMJS, targetJSMap ]
		}

	}

}
