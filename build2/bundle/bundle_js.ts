namespace $ {

	export class $mol_build2_bundle_js extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix()
			const output = slice.pack().output()
			const script = output.resolve( `${prefix}.js` ) 
			const map = output.resolve( `${prefix}.js.map` ) 

			const concater = new this.$.$mol_sourcemap_builder( script.name(), ';' )
			concater.add( '#!/usr/bin/env node\n"use strict"' )

			if( /node/.test( prefix ) ) {
				concater.add( 'var exports = void 0' )
			} else {
				concater.add( 'function require'+'( path ){ return $node[ path ] }' )
			}
			concater.add( this.js_bootstrap(), 'mam.jam.js' )

			const files = [ ...slice.files() ].filter( file => {
				if( file.relate( this.root().dir() ) === 'mam.jam.js' ) return false
				if( !file.exists() ) return false
				return /\.[j]sx?$/.test( file.name() )
			} )

			for( const file of files ) {
				if( prefix === 'node' && /node_modules\//.test( file.relate( this.root().dir() ) ) ) continue

				this.module_add( concater, file, output )
			}

			const text = concater.content + `\n//# sourceMappingURL=${ map.relate( output ) }\n`
			script.text( text )
			map.text( JSON.stringify( concater.sourcemap ) )
			
			this.log( script, Date.now() - start )
			
			return [ script, map ]
		}

	}

}
