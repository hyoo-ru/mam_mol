namespace $.$$ {

	$mol_test({

		'markdown rendered by marked from npm'() {
			const app = new $mol_build2_demo
			app.source( '# Title' )
			$mol_assert_equal( app.preview().trim(), '<h1>Title</h1>' )
		},

		'date formatted by date-fns from npm'() {
			$mol_assert_equal( $npm[ 'date-fns' ].format( new Date( 2026, 9, 31, 19, 5 ), 'dd.MM.yyyy HH:mm' ), '31.10.2026 19:05' )
		},

	})

}
