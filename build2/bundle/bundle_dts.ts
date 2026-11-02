namespace $ {

	export class $mol_build2_bundle_dts extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix().replace( /\.test$/, '' )
			const output = slice.pack().output()

			const target = output.resolve( `${ prefix }.d.ts` )
			const target_map = output.resolve( `${ prefix }.d.ts.map` )

			const sources = [ ... slice.files() ]
				.filter( file => /tsx?$/.test( file.ext() ) && !/\.(test|dev)\./.test( file.name() ) )
				.map( file => file.parent().resolve( file.name().replace( /(\.d)?\.tsx?$/, '.d.ts' ) ) )
				.filter( file => file.exists() )
			if( sources.length === 0 ) return []

			const concater = new $mol_sourcemap_builder( output.path() )

			for( const src of sources ) {
				if( !src.text() ) continue
				concater.add( src.text(), src.relate( output ) )
			}

			target.text( concater.content + '\nexport = $;\n//# sourceMappingURL=' + target_map.relate( output ) + '\n' )
			target_map.text( concater.toString() )

			this.log( target, Date.now() - start )

			return [ target, target_map ]
		}

	}

}
