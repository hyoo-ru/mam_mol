namespace $ {

	export class $mol_build2_source_dir extends $mol_build2_source {

		static match( file: $mol_file2 ): boolean {
			return file.type() === 'dir'
		}

		@ $mol_mem
		deps() {
			const deps = super.deps()
			const dir = this.file()
			
			const items = dir.sub().slice().sort( ( left, right )=> left.name().length - right.name().length )

			for( const item of items ) {
				if( item.type() !== 'file' ) continue
				if( !/^[a-z0-9]/i.test( item.name() ) ) continue
				deps.set( item, 0 )
			}

			if( dir !== this.root().dir() ) deps.set( dir.parent(), Number.MIN_SAFE_INTEGER )

			return deps
		}

	}

}
