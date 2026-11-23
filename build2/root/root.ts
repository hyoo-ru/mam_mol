namespace $ {

	export type $mol_build2_plugin = typeof $mol_build2_source | typeof $mol_build2_convert | typeof $mol_build2_bundle

	/** MAM Root of all sources. */
	export class $mol_build2_root extends $mol_object2 {

		static plugins = new Set< $mol_build2_plugin >()

		static plugin( Plugin: $mol_build2_plugin ) {
			this.plugins.add( Plugin )
		}

		static plugins_load( script: $mol_file2 ): $mol_build2_plugin[] {
			const plugins = this.plugins
			this.plugins = new Set

			try {
				$node.vm.runInThisContext( script.text(), { filename: script.path() } )
				return [ ... this.plugins ]
			} finally {
				this.plugins = plugins
			}
		}

		@ $mol_mem
		dir() {
			return this.$.$mol_file2.relative( '.' )
		}

		@ $mol_mem
		slice_classes(): ( typeof $mol_build2_package_slice )[] {
			return [
				this.$.$mol_build2_package_slice_web_prod,
				this.$.$mol_build2_package_slice_node_prod,
				this.$.$mol_build2_package_slice_web_test,
				this.$.$mol_build2_package_slice_node_test,
			]
		}

		@ $mol_mem
		source_classes(): ( typeof $mol_build2_source )[] {
			return [
				this.$.$mol_build2_source_dir,
				this.$.$mol_build2_source_js,
				this.$.$mol_build2_source_css,
				this.$.$mol_build2_source_view_tree,
				this.$.$mol_build2_source_view_ts,
				this.$.$mol_build2_source_ts,
				this.$.$mol_build2_source_meta_tree,
			]
		}

		@ $mol_mem
		convert_classes(): ( typeof $mol_build2_convert )[] {
			return [
				this.$.$mol_build2_convert_meta_tree,
				this.$.$mol_build2_convert_view_tree,
				this.$.$mol_build2_convert_glsl,
				this.$.$mol_build2_convert_css,
				this.$.$mol_build2_convert_bin,
				this.$.$mol_build2_convert_ts,
				this.$.$mol_build2_convert_npm,
			]
		}

		@ $mol_mem
		bundle_classes(): ( typeof $mol_build2_bundle )[] {
			return [
				this.$.$mol_build2_bundle_meta,
				this.$.$mol_build2_bundle_js,
				this.$.$mol_build2_bundle_mjs,
				this.$.$mol_build2_bundle_baza,
				this.$.$mol_build2_bundle_view_tree,
				this.$.$mol_build2_bundle_meta_tree,
				this.$.$mol_build2_bundle_locale,
				this.$.$mol_build2_bundle_index_html,
				this.$.$mol_build2_bundle_package_json,
				this.$.$mol_build2_bundle_npm_deps,
				this.$.$mol_build2_bundle_manifest_json,
				this.$.$mol_build2_bundle_readme,
				this.$.$mol_build2_bundle_files,
				this.$.$mol_build2_bundle_cordova,
			]
		}

		@ $mol_mem
		bundle_test_classes(): ( typeof $mol_build2_bundle )[] {
			return [
				this.$.$mol_build2_bundle_test_js,
				this.$.$mol_build2_bundle_test_html,
				this.$.$mol_build2_bundle_audit_js,
				this.$.$mol_build2_bundle_dts,
			]
		}

		@ $mol_mem_key
		pack( dir: $mol_file2 ) {
			const pack = new this.$.$mol_build2_package
			pack.root = $mol_const( this )
			pack.dir = $mol_const( dir )

			pack.ensure()

			return pack
		}

		@ $mol_mem
		ensure() {
			const ensure = new this.$.$mol_build2_root_ensure
			ensure.root = $mol_const( this )
			return ensure
		}

		@ $mol_mem_key
		source< Source extends typeof $mol_build2_source >( [ Source, file ]: [ Source, $mol_file2 ] ) {
			if( !Source.match( file ) ) return null
			
			const source = new Source
			source.root = $mol_const( this )
			source.file = $mol_const( file )
			return source as InstanceType< Source >
		}

		@ $mol_mem_key
		convert< Convert extends typeof $mol_build2_convert >( [ Convert, file ]: [ Convert, $mol_file2 ] ) {
			if( !Convert.match( file ) ) return null
			
			const convert = new Convert
			convert.root = $mol_const( this )
			convert.source = $mol_const( file )
			return convert as InstanceType< Convert >
		}

		@ $mol_mem_key
		bundle< Bundle extends typeof $mol_build2_bundle >( Bundle: Bundle ) {
			const bundle = new Bundle
			bundle.root = $mol_const( this )
			return bundle as InstanceType< Bundle >
		}

		@ $mol_mem
		ts_options() {
			const config = JSON.parse( this.dir().resolve( 'tsconfig.json' ).text() )
			const res = $node.typescript.parseJsonConfigFileContent( config, $node.typescript.sys, this.dir().path() )
			if( res.errors.length ) throw res.errors
			return res.options
		}

	}

}
