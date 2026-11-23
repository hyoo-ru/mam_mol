namespace $ {

	export class $mol_file2 extends $mol_file_node {

		protected static reset_subtree( file: $mol_file_base ) {
			const sub = $mol_wire_probe( ()=> file.sub() ) ?? []
			file.reset()
			for( const child of sub ) this.reset_subtree( child )
		}

		@ $mol_action
		static override flush() {

			for( const file of this.changed ) {
				try {

					const base = $node.path.resolve( this.base || $node.process.cwd() ).replace( /\\/g, '/' )
					const inside_base = ( file: $mol_file_base )=> {
						const path = file.path()
						return path === base || path.startsWith( base + '/' )
					}
					for( let parent = file.parent(); ; parent = parent.parent() ) {
						if( $mol_wire_probe( ()=> parent.sub() ) ) parent.sub( null )
						if( parent === parent.parent() ) break
					}

					this.reset_subtree( file )

					if( file.type() === 'dir' && inside_base( file ) ) {
						file.watcher()
						for( const child of file.sub() ) {
							if( child.type() === 'dir' && inside_base( child ) ) {
								child.watcher()
							}
						}
					}

				} catch( error ) {
					if( $mol_fail_catch( error ) ) $mol_fail_log( error )
				}
			}

			this.changed.clear()
			this.watching = true

		}

		@ $mol_mem
		override watcher() {

			const watch_path = this.path()
			if( !this.root() && !this.exists() ) return { destructor() {} }

			let watcher

			try {
				watcher = $node.fs.watch( watch_path )
			} catch( error: any ) {

				if( !( error instanceof Error ) ) error = new Error( 'Unknown watch error', { cause: error } )
				error.message += '\n' + watch_path

				if( this.root() || error.code !== 'ENOENT' ) {
					this.$.$mol_fail_log( error )
				}

				return { destructor() {} }
			}

			let destructed = false

			watcher.on( 'change', ( type: 'change' | 'rename', name )=> {

				let event_path = name?.toString()
				if( event_path ) {
					event_path = event_path.replace( /^[\\\/]*\?[\\\/]/, '' )
					if( !$node.path.isAbsolute( event_path ) ) event_path = $node.path.join( watch_path, event_path )
					event_path = $node.path.resolve( event_path ).replace( /\\/g, '/' )
				} else {
					event_path = watch_path
				}

				;( this.constructor as typeof $mol_file2 ).changed_add( type, event_path )
				if( type === 'rename' && event_path === watch_path ) {
					destructed = true
					watcher.close()
					setTimeout( ()=> $mol_wire_async( this ).watcher(), 500 )
				}

			} )

			watcher.on( 'error', e => this.$.$mol_fail_log( e ) )

			watcher.on( 'close', ()=> {
				if( !destructed ) {
					;( this.constructor as typeof $mol_file2 ).changed_add( 'rename', watch_path )
					setTimeout( ()=> $mol_wire_async( this ).watcher(), 500 )
				}
			} )

			return {
				destructor() {
					destructed = true
					watcher.close()
				},
			}

		}

	}

}
