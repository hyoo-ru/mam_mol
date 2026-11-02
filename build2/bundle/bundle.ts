namespace $ {

	/** Makes one bundle from all required sources. */
	export class $mol_build2_bundle extends $mol_object2 {
		
		root(): $mol_build2_root {
			return $mol_fail( new Error( 'root is not set' ) )
		}
		
		/** Artifacts shared by all slices of pack */
		@ $mol_mem_key
		pack_artifacts( _pack: $mol_build2_package ) {
			return [] as $mol_file2[]
		}

		/** Artifacts specific to a slice */
		@ $mol_mem_key
		slice_artifacts( _slice: $mol_build2_package_slice ) {
			return [] as $mol_file2[]
		}

		@ $mol_mem_key
		artifacts( slice: $mol_build2_package_slice ) {
			return [
				... this.pack_artifacts( slice.pack() ),
				... this.slice_artifacts( slice ),
			]
		}

		log( target: $mol_file2, duration: number ) {

			const path = target.relate( this.root().dir() )
			
			this.$.$mol_log3_done({
				place: this,
				duration: `${duration}ms`,
				message: `Built`, 
				path,
			})

		}

		js_bootstrap() {
			return this.root().dir().resolve( 'mam.jam.js' ).text()
		}

		module_key( file: $mol_file2 ) {
			return '/' + file.relate( this.root().dir() ).replace( /\.js$/, '' ).replace( /\.(tsx?|jsx?)$/, '' )
		}

		module_link( file: $mol_file2, content: string ) {

			const key = ( path: string )=> {
				const dep = this.root().source([ this.$.$mol_build2_source_js, file ])?.path_module( path )
				return dep ? JSON.stringify( this.module_key( dep ) ) : null
			}

			return content
				.replace( /\brequire\(\s*(['"])(\.{1,2}\/[^'"]+)\1\s*\)/g, ( str, _, path )=> {
					const found = key( path )
					return found ? `$node[ ${ found } ]` : str
				} )
				.replace( /\bimport\(\s*(['"])(\.{1,2}\/[^'"]+)\1\s*\)/g, ( str, _, path )=> {
					const found = key( path )
					return found ? `Promise.resolve( $node[ ${ found } ] )` : str
				} )

		}

		module_add( concater: $mol_sourcemap_builder, file: $mol_file2, output: $mol_file2 ) {

			const root = this.root().dir()
			const path = file.relate( root )
			const map = file.parent().resolve( file.name() + '.map' ).text() || undefined
			const npm = /(^|\/)node_modules\//.test( path )

			const text = file.text().replace( /^\/\/#\ssourceMappingURL=.*$/mg, '' )
			const content = npm ? text : this.module_link( file, text )

			const self_registering = /\/-npm\//.test( path )
			if( self_registering || !$mol_build2_source_js.commonjs.test( content ) ) {
				concater.add( content, file.relate( output ), map )
				return
			}

			const modules = root.resolve( 'node_modules' )
			const resolve = npm ? `id.replace( /^.\\//, "${ file.parent().relate( modules ) }/" )` : 'id'

			const full = file.relate( modules )
			const keys = npm
				? [ full.replace( /\/index\.js$/, '' ).replace( /\.js$/, '' ), full ]
				: [ this.module_key( file ) ]

			concater.add( `\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ ${ resolve } ] }; \n`, '-' )
			concater.add( content, file.relate( output ), map )
			concater.add( `\n${ keys.map( key => `$${''}node[ ${ JSON.stringify( key ) } ] = ` ).join( '' ) }module.${''}exports }.call( {}, {} )\n`, '-' )

		}
		
	}

}
