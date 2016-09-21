function $mol_build_start( paths : string[] ) {
	var build = $mol_build.relative( '.' )
	if( paths.length > 0 ) {
		process.argv.slice( 2 ).forEach( ( path : string )=> {
			path = build.root().resolve( path ).path()
			build.bundle({ path })
		} )
	} else {
		build.server().express()
	}
}

$mol_build_start( process.argv.slice( 2 ) )
