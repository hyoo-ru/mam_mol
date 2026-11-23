namespace $ {

	export class $mol_build2_convert_view_tree extends $mol_build2_convert {

		static match( file: $mol_file2 ): boolean {
			return /\.view\.tree$/.test( file.name() )
		}

		@ $mol_mem
		generated_artifacts() {
			return [
				this.locale(),
				this.script_map(),
				this.dts(),
				this.dts_map(),
			]
		}

		@ $mol_mem
		generated_sources() {
			return [
				this.script(),
			]
		}

		@ $mol_mem
		tree() {
			const source = this.source()
			
			const text = source.text()
			return this.$.$mol_tree2_from_string( text, source.path() )
		}

		@ $mol_mem
		compiled() {
			const tree = this.tree()
			return {
				script: this.$.$mol_tree2_js_to_text( this.$.$mol_view_tree2_to_js( tree ) ),
				dts: this.$.$mol_view_tree2_to_dts( tree ),
				locales: this.$.$mol_view_tree2_to_locale( tree ),
			}
		}

		@ $mol_mem
		script() {
			const source = this.source()

			const script = source.parent().resolve( `-view.tree/${ source.name() }.js` )
			script.text(
				this.$.$mol_tree2_text_to_string( this.compiled().script )
				+ '\n//# sourceMappingURL=' + this.script_map().relate( script.parent() )
			)

			return script
		}

		@ $mol_mem
		script_map() {
			const source = this.source()
			const map = source.parent().resolve( `-view.tree/${ source.name() }.js.map` )
			map.text( JSON.stringify( this.$.$mol_tree2_text_to_sourcemap( this.compiled().script ), null, '\t' ) )
			return map
		}

		@ $mol_mem
		dts() {
			const source = this.source()
			const dts = source.parent().resolve( `-view.tree/${ source.name() }.d.ts` )
			dts.text(
				this.$.$mol_tree2_text_to_string( this.compiled().dts )
				+ '\n//# sourceMappingURL=' + this.dts_map().relate( dts.parent() )
			)
			return dts
		}

		@ $mol_mem
		dts_map() {
			const source = this.source()
			const dts = source.parent().resolve( `-view.tree/${ source.name() }.d.ts.map` )
			const map = this.$.$mol_tree2_text_to_sourcemap( this.compiled().dts )
			delete map.sourcesContent
			map.file = source.name() + '.d.ts'
			map.sourceRoot = this.root().dir().relate( dts.parent() )
			dts.text( JSON.stringify( map, null, '\t' ) )
			return dts
		}

		@ $mol_mem
		locale() {
			const source = this.source()

			const locale = source.parent().resolve( `-view.tree/${ source.name() }.locale=en.json` )
			locale.text( JSON.stringify( this.compiled().locales, null, '\t' ) )
			
			return locale
		}
		
	}

}
