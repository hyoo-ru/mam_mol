namespace $ {

	export class $mol_build2_convert_glsl extends $mol_build2_convert {

		static match( file: $mol_file2 ): boolean {
			return /\.glsl$/.test( file.name() )
		}
		
		@ $mol_mem
		generated_sources() {
			const source = this.source()

			const name = source.name()
			const type = name.match( /\.(vert|frag)\./ )?.[1] ?? 'both'
			const script = source.parent().resolve( `-glsl/${ name }.ts` )
			
			const styles = source.text()
			const code = `namespace $ { $.$`+`mol_3d_glsl_${ type } += ${ JSON.stringify( styles ) } }\n`
			script.text( code )
			
			return [ script ]
		}

	}

}
