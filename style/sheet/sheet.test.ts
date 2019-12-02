namespace $ {

	export class $mol_style_sheet_test1 extends $mol_view {
		Item() { return new $mol_view }
	}

	export class $mol_style_sheet_test2 extends $mol_view {
		List() { return new $mol_style_sheet_test1 }
	}

	$mol_test({

		'component block styles'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				display: 'block',
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'component block styles with pseudo class'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				':focus': {
					color: 'red',
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test]:focus {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'component block styles with pseudo element'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'::first-line': {
					color: 'red',
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test]::first-line {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'component block styles with media query'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'@media': {
					'print': {
						color: 'red',
						display: 'block',
					},
				},
			} )

			$mol_assert_equal( sheet , '@media print {\n[mol_style_sheet_test] {\n\tcolor: red;\n\tdisplay: block;\n}\n}\n' )
			
		},

		'component block styles with attribute value'() {
		
			class $mol_style_sheet_test extends $mol_view {
				attr() { return {
					mol_theme: '$mol_theme_dark'
				} }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'@' : {
					mol_theme: {
						'$mol_theme_dark': {
							color: 'red',
							display: 'block',
						},
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test][mol_theme="$mol_theme_dark"] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'component element styles'() {
		
			class $mol_style_sheet_test extends $mol_view {
				Item() { return new $mol_view }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				Item : {
					color: 'red',
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test_item] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'component element of element styles'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				List : {
					Item : {
						color: 'red',
						display: 'block',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2_list_item] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'inner component styles by class'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				$mol_style_sheet_test1 : {
					color: 'red',
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] [mol_style_sheet_test1] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

		'child component styles by class'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				'>' : {
					$mol_style_sheet_test1 : {
						color: 'red',
						display: 'block',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] > [mol_style_sheet_test1] {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

	})

}
