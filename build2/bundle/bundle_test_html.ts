namespace $ {

	export class $mol_build2_bundle_test_html extends $mol_build2_bundle {

		root_name( pack: $mol_build2_package ) {
			
			const root = this.root().dir()
			let dir = pack.dir()
			
			while( dir !== root ) {
				
				const name = '$' + dir.relate( root ).replaceAll( '/', '_' )
				const view = dir.resolve( `${ dir.name() }.view.tree` )
				
				if( view.exists() && view.text().includes( `${ name } ` ) ) return name
				
				dir = dir.parent()
				
			}
			
			return '$' + pack.dir().relate( root ).replaceAll( '/', '_' )
		}

		@ $mol_mem_key
		pack_artifacts( pack: $mol_build2_package ) {
			const start = Date.now()
			
			const source = pack.dir().resolve( 'index.html' )
			const res = pack.output().resolve( `test.html` )
			const name = this.root_name( pack )

			let content = source.exists()
				? source.text()
				: `<!doctype html><meta charset="utf-8" /><html mol_view_root><body mol_view_root="${name}"><script src="web.js" charset="utf-8"></script>`
			
			content = content.replace(
				/(<\/body>|$)/, `
				<script src="/mol/build2/server/client/client.js" charset="utf-8"></script>
				<script src="web.test.js" charset="utf-8"></script>
				<script>
					addEventListener( 'load', ()=> setTimeout( ()=> {
						const audit = document.createElement( 'script' )
						audit.src = 'web.audit.js'
						document.head.appendChild( audit )
					}, 500 ) )
				</script>
				$1`,
			)
			
			res.text( content )
			
			this.log( res, Date.now() - start )

			return [ res ]
		}

	}
	
}
