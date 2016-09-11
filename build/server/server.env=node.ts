class $mol_build_server extends $mol_server {
	
	expressGenerator() {
		return ( req : any , res : any , next : () => void )=> {
			try {
				return this.generator( req.url ) || next()
			} catch( error ) {
				$mol_atom_restore( error )
				throw error
			}
		}
	}
	
	build() : $mol_build {
		return null
	}

	@ $mol_prop()
	generator( path : string ) {
		var matched = path.match( /^((?:\/\w+)+)\/-\/(\w+(?:.\w+)+)$/ )
		if( !matched ) return null

		var build = this.build()
		
		var [ path , path , bundle ] = matched
		path = build.root().resolve( path ).path()

		build.bundle({ path , bundle })

		return <void> null
	}
	
	port() {
		return 80
	}

}
