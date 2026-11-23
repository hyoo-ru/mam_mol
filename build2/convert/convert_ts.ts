namespace $ {

	export class $mol_build2_convert_ts extends $mol_build2_convert {

		static match( file: $mol_file2 ): boolean {
			return /tsx?$/.test( file.ext() )
		}

		@ $mol_mem
		generated_artifacts() {
			return [
				this.js(),
				this.map(),
			]
		}

		@ $mol_mem
		js() {
			const source = this.source()
			const res = this.transpile_out()

			const js = source.parent().resolve( source.name() + '.js' )

			const text = res.outputText.replace( /^\/\/#\ssourceMappingURL=[^\n]*/mg, '//' + source.relate() ) + '\n'

			js.text( text, 'virt' )
			js.text()
			return js
		}

		@ $mol_mem
		map() {
			const source = this.source()
			const res = this.transpile_out()
			const map = source.parent().resolve( source.name() + '.js.map' )
			map.text( res.sourceMapText ?? '', 'virt' )
			map.text()
			return map
		}

		@ $mol_mem
		transpile_out() {
			const source = this.source()

			const options = this.root().ts_options()
			const module = this.root().source([ this.$.$mol_build2_source_ts, source ])?.module()

			const res = $node.typescript.transpileModule( source.text(), {
				compilerOptions: module
					? { ... options, module: $node.typescript.ModuleKind.CommonJS, noEmitHelpers: false }
					: options,
				fileName: source.path(),
				reportDiagnostics: true,
			})

			if( res.diagnostics?.length ) {
				return $mol_fail( new Error(
					$node.typescript.formatDiagnosticsWithColorAndContext(
						res.diagnostics,
						{
							getCanonicalFileName: ( path: string )=> path,
							getCurrentDirectory: $node.typescript.sys.getCurrentDirectory,
							getNewLine: () => $node.typescript.sys.newLine,
						}
					)
				) )
			}

			return res
		}
		
	}

}
