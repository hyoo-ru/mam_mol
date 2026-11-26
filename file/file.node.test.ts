namespace $ {

	function temp_dir( task: ( path: string )=> void ) {
		const path = $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'mol_file_' ) )
		try {
			task( path )
		} finally {
			$node.fs.rmSync( path, { recursive: true, force: true } )
		}
	}

	$mol_test({

		'dir listing watches the dir itself'() {
			temp_dir( path => {

				const watched = [] as string[]

				class File extends $mol_file_node {
					override watcher() {
						watched.push( this.path() )
						return { destructor() {} }
					}
				}

				File.absolute( path ).sub()

				$mol_assert_equal( watched.includes( path ), true )

			} )
		},

		'cached listing gets file that was absent before'() {
			temp_dir( path => {

				class File extends $mol_file_node {
					override watcher() {
						return { destructor() {} }
					}
				}

				$node.fs.writeFileSync( $node.path.join( path, 'a' ), '' )

				const dir = File.absolute( path )
				const added = dir.resolve( 'b' )

				$mol_assert_equal( added.exists(), false )
				$mol_assert_equal( dir.sub().map( file => file.name() ), [ 'a' ] )

				$node.fs.writeFileSync( added.path(), '' )
				File[ 'changed_add' ]( 'rename', added.path() )
				File.flush()

				$mol_assert_equal( dir.sub().map( file => file.name() ).sort(), [ 'a', 'b' ] )

			} )
		},

	})

}
