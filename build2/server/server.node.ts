namespace $ {

	export class $mol_build2_server extends $mol_rest_resource {

		_protocols = [ 'mol_build2_reload' ]

		@ $mol_mem
		builder() {
			const root = new this.$.$mol_build2_root
			root.ensure().pull_timeout_default = ()=> 5000
			return root
		}

		@ $mol_mem
		watch() {
			const watch = new this.$.$mol_build2_server_watch
			watch.host = $mol_const( this )
			return watch
		}

		@ $mol_mem
		slave() {
			const slave = new this.$.$mol_build2_server_slave
			slave.host = $mol_const( this )
			return slave
		}

		@ $mol_mem
		repl() {
			const repl = new this.$.$mol_build2_server_repl
			repl.host = $mol_const( this.slave() )
			return repl
		}

		@ $mol_mem_key
		pack( path: string ) {
			const dir = this.file( path.replace( /\/-\/.*$/, '' ) )
			return this.builder().pack( dir )
		}

		@ $mol_mem_key
		protected ensure( path: string ) {
			$mol_wire_solid()
			this.builder().ensure().ensure( this.file( path ).path() )
		}

		protected ensure_needed( path: string ) {
			return !/\/[^\/]*\.[^\/]*$/.test( path )
		}

		file( path: string ) {
			const root = this.builder().dir()
			const file = root.resolve( decodeURIComponent( path ).replace( /^\/+/, '' ) )
			const relative = file.relate( root )
			if( relative === '..' || relative.startsWith( '../' ) ) $mol_fail( new Error( 'Path is out of root' ) )
			return file
		}

		GET( msg: $mol_rest_message ) {
			try {
				const path = msg.uri().pathname
				
				if( path === '/.well-known/appspecific/com.chrome.devtools.json' ) {
					return this.reply_file( msg, this.devtools_workspace() )
				}

				if( /\/-\/[^/]+$/.test( path ) ) {
					this.generate( path )
					return this.reply_file( msg, this.file( path ) )
				}

				const file = this.file( path )
				if( this.ensure_needed( path ) ) this.ensure( path )

				if( file.type() === 'dir' ) return this.reply_dir( msg, file )
				if( file.exists() ) return this.reply_file( msg, file )

				return msg.reply( `${ path } not found`, { code: $mol_rest_code[ 'Not Found' ] } )

			} catch( error: any ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				const path = msg.uri().pathname
				const text = error.stack ?? String( error )
				this.$.$mol_log3_fail({
					place: `${ this }.GET()`,
					message: error.message ?? String( error ),
					stack: text,
					url: msg.uri(),
				})
				if( /\.js$/.test( path ) ) {
					return msg.reply( `console.error(${ JSON.stringify( text ) })`, {
						type: 'application/javascript;charset=utf-8',
					})
				}
				return msg.reply( text, {
					code: $mol_rest_code[ 'Internal Server Error' ],
					type: 'text/plain;charset=utf-8',
				})
			}
		}

		devtools_workspace() {
			const root = this.builder().dir()
			const file = root.resolve( '.well-known/appspecific/com.chrome.devtools.json' )
			if( file.exists() ) return file

			file.text( JSON.stringify({
				workspace: {
					root: root.path(),
					uuid: $node.crypto.randomUUID(),
				},
			}, null, '\t' ) )

			return file
		}

		@ $mol_mem_key
		generate( path: string ) {
			$mol_wire_solid()
			const matched = path.match( /^(.*?)\/-\/([^/]+)$/ )
			if( !matched ) return []

			if( matched[2] === 'web.css' ) {
				this.$.$mol_log3_warn({
					place: `${this}.generate()`,
					message: 'CSS compiles into JS bundle now',
					hint: 'Remove link to web.css',
				})
			}

			if( /^web\.js(?:\.map)?$/.test( matched[2] ) ) {
				return this.web_js_artifacts( matched[1] )
			}

			return this.requested_bundle_artifacts( matched[1], matched[2] )
		}

		requested_bundle_artifacts( path: string, name: string ) {
			const web_prod = this.pack( path ).slice( this.$.$mol_build2_package_slice_web_prod )
			const web_test = this.pack( path ).slice( this.$.$mol_build2_package_slice_web_test )
			const node_prod = this.pack( path ).slice( this.$.$mol_build2_package_slice_node_prod )
			const node_test = this.pack( path ).slice( this.$.$mol_build2_package_slice_node_test )
			const slice = ( prefix: string )=> {
				switch( prefix ) {
					case 'web': return web_prod
					case 'web.test': return web_test
					case 'node': return node_prod
					case 'node.test': return node_test
				}
				return null
			}

			if( name === 'test.html' ) return this.bundle_artifacts( this.$.$mol_build2_bundle_test_html, web_test )
			if( name === 'index.html' ) return this.bundle_artifacts( this.$.$mol_build2_bundle_index_html, web_prod )
			if( name === 'package.json' ) return this.bundle_artifacts( this.$.$mol_build2_bundle_package_json, web_prod )
			if( name === 'manifest.json' ) return this.bundle_artifacts( this.$.$mol_build2_bundle_manifest_json, web_prod )
			if( name === 'README.md' ) return this.bundle_artifacts( this.$.$mol_build2_bundle_readme, web_prod )

			const match = name.match( /^(web(?:\.test)?|node(?:\.test)?)\.(.+)$/ )
			if( !match ) return []

			const target = slice( match[1] )
			if( !target ) return []

			if( /^locale=[^/]+\.json$/.test( match[2] ) ) {
				return this.bundle_artifacts( this.$.$mol_build2_bundle_locale, target )
			}

			switch( match[2] ) {
				case 'js':
				case 'js.map':
					if( match[1] === 'web.test' ) [ ... web_prod.bundles_generated() ];
					if( match[1] === 'node.test' ) {
						[ ... web_prod.bundles_generated() ];
						[ ... web_test.bundles_generated() ];
						[ ... node_prod.bundles_generated() ];
					}
					return this.bundle_artifacts(
						/\.test$/.test( match[1] ) ? this.$.$mol_build2_bundle_test_js : this.$.$mol_build2_bundle_js,
						target,
					)
				case 'audit.js':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_audit_js, target )
				case 'css':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_css, target )
				case 'mjs':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_mjs, target )
				case 'baza':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_baza, target )
				case 'd.ts':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_dts, target )
				case 'meta.tree':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_meta_tree, target )
				case 'meta.json':
				case 'deps.json':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_meta, target )
				case 'view.tree':
					return this.bundle_artifacts( this.$.$mol_build2_bundle_view_tree, target )
			}

			return []
		}

		web_js_artifacts( path: string ) {
			const pack = this.pack( path )
			const slice = pack.slice( this.$.$mol_build2_package_slice_web_prod )
			return [
				... this.bundle_artifacts( this.$.$mol_build2_bundle_js, slice ),
				... this.bundle_artifacts( this.$.$mol_build2_bundle_meta, slice ),
			]
		}

		bundle_artifacts< Bundle extends typeof $mol_build2_bundle >( Bundle: Bundle, slice: $mol_build2_package_slice ) {
			const bundle = this.builder().bundle( Bundle )
			return bundle.artifacts( slice ) as $mol_file2[]
		}

		reply_dir( msg: $mol_rest_message, dir: $mol_file2 ) {
			if( dir.resolve( 'index.html' ).exists() || dir.resolve( 'index.xml.tree' ).exists() ) {
				return this.redirect( msg, `${ msg.uri().pathname.replace( /\/?$/, '/' ) }-/test.html${ msg.uri().search }` )
			}

			const root = this.builder().dir()
			const files = [
				{ name: '..', type: 'dir' },
				{ name: '-', type: 'dir' },
				... dir.sub().map( file => ({ name: file.name(), type: file.type() }) ),
				... dir.sub()
					.filter( file => /\.meta\.tree$/.test( file.name() ) )
					.flatMap( file => this.$.$mol_tree2_from_string( file.text(), file.path() ).select( 'pack', null ).kids )
					.map( pack => ({ name: pack.type, type: 'dir' }) ),
			]

			const links = files
				.filter( ( file, index, list )=> list.findIndex( item => item.name === file.name ) === index )
				.sort( $mol_compare_text( file => file.type + '/' + file.name ) )
				.map( file => {
					const href = file.name === '..' ? '../' : file.name + ( file.type === 'dir' ? '/' : '' )
					const icon = file.type === 'dir' ? '&#128193;' : '&#128196;'
					return `<a href="${ href }">${ icon } ${ file.name }</a>`
				} )
				.join( '\n' )

			return msg.reply( `<!doctype html>
				<meta charset="utf-8" />
				<title>${ dir.relate( root ) || '/' }</title>
				<style>
					body { box-sizing: border-box; display: flex; flex-direction: column; flex-wrap: wrap; height: 100vh; margin: 0; padding: .75rem; font: 1rem/1.5rem sans-serif }
					a { color: rgb(57, 115, 172); font-weight: 700; text-decoration: none }
					a:hover { background: hsl(0 0% 0% / .05) }
					a[href^="-"] { opacity: .5 }
				</style>
				${ links }`, {
				type: 'text/html;charset=utf-8',
			})
		}

		redirect( msg: $mol_rest_message, location: string ) {
			const output = ( msg.port as any ).output
			output?.setHeader?.( 'Location', location )
			output?.setHeader?.( 'Cache-Control', 'no-store, max-age=0' )
			return msg.reply( `Redirecting to ${ location }`, {
				code: $mol_rest_code[ 'Found' ],
				type: 'text/plain;charset=utf-8',
			})
		}

		reply_file( msg: $mol_rest_message, file: $mol_file2 ) {
			if( !file.exists() ) return msg.reply( `${ file.relate() } not found`, { code: $mol_rest_code[ 'Not Found' ] } )

			const output = ( msg.port as any ).output
			output?.setHeader?.( 'Cache-Control', 'no-store, max-age=0' )
			output?.setHeader?.( 'Pragma', 'no-cache' )
			output?.setHeader?.( 'Expires', '0' )

			if( file.name() === 'test.html' ) {
				return msg.reply( this.test_html( file ), {
					type: 'text/html;charset=utf-8',
				})
			}

			return msg.reply( file.buffer(), {
				type: $mol_file_extensions[ file.ext().replace( /^.*\./, '' ) ] ?? 'application/octet-stream',
			})
		}

		test_html( file: $mol_file2 ) {
			const version = file.parent().resolve( 'web.js' ).version()
			const audit = file.parent().resolve( 'web.audit.js' )
			const audit_version = audit.exists() ? audit.version() : version
			return file.text()
				.replace( /src="web\.js(?:\?[^"]*)?"/g, `src="web.js?v=${ version }"` )
				.replace( /audit\.src = 'web\.audit\.js(?:\?[^']*)?'/g, `audit.src = 'web.audit.js?v=${ audit_version }'` )
		}

		OPEN( msg: $mol_rest_message ) {
			const protocol = super.OPEN( msg )
			if( !protocol ) return ''

			const path = msg.uri().pathname.replace( /\/-.*/, '' )
			this.watch().open( msg.port, path )

			return protocol
		}

		CLOSE( msg: $mol_rest_message ) {
			this.watch().close( msg.port )
		}

		_auto() {
			this.slave()._auto()
			this.repl()._auto()
			this.watch()._auto()
		}

		static serve() {
			const port = Number( this.$.$mol_state_arg.value( 'port' ) || this.$.$mol_env().MAM_BUILD_SERVER_PORT || 9080 )
			return this.port( port )
		}

	}

}
