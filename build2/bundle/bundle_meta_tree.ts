namespace $ {

	export class $mol_build2_bundle_meta_tree extends $mol_build2_bundle {

		@ $mol_mem_key
		slice_artifacts( slice: $mol_build2_package_slice ) {
			const start = Date.now()

			const prefix = slice.prefix()
			const root = this.root()
			
			const target = slice.pack().output().resolve( `${prefix}.meta.tree` )
			
			const files = slice.graph().sorted
			
			const named_metas: $mol_tree2[] = []
			files.forEach( file => {
				if( file.type() !== 'dir' ) return
				const meta = root.pack( file ).meta()
				if( meta.kids.length > 0 ) {
					named_metas.push( new $mol_tree2( meta.type, '/' + file.relate( root.dir() ), meta.kids, meta.span ) )
				}
			} )
			
			if( named_metas.length === 0 ) return []
			
			target.text( $mol_tree2.list( named_metas ).toString() )
			
			this.log( target, Date.now() - start )
			
			return [ target ]
		}

	}
	
}
