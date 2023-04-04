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
				display: 'block',
				zIndex: 1,
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tdisplay: block;\n\tz-index: 1;\n}\n' )
			
		},

		'various units'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { px , per } = $mol_style_unit

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				width : per(50),
				height : px(50),
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n' )
			
		},

		'various functions'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { calc } = $mol_style_func
			const { px , per } = $mol_style_unit

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				width : calc( `${ per(100) } - ${ px(1) }` ),
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n' )
			
		},

		'property groups'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { px } = $mol_style_unit

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				flex : {
					grow : 5
				}
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tflex-grow: 5;\n}\n' )
			
		},
		
		'custom properties'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'--isVariable': 'yes',
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\t--is-variable: yes;\n}\n' )
			
		},
		
		'custom property groups'() {
			
			class $mol_style_sheet_test extends $mol_view {}

			const { px } = $mol_style_unit

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'--variable' : {
					test : px(5)
				}
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\t--variable-test: 5px;\n}\n' )
			
		},

		'property shorthand'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { px } = $mol_style_unit

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				padding : [ px(5) , 'auto' ]
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n}\n' )
			
		},

		'sequenced values'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { url } = $mol_style_func

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				background: {
					image: [ [url('foo')], [url('bar')] ],
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n}\n' )
			
		},

		'sequenced structs'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { rem } = $mol_style_unit
			const { hsla } = $mol_style_func

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				box: {
					shadow: [
						{
							inset: true,
							x: 0,
							y: 0,
							blur: rem(.5),
							spread: 0,
							color: 'red',
						},
						{
							inset: false,
							x: 0,
							y: 0,
							blur: rem(.5),
							spread: 0,
							color: 'blue',
						},
					],
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tbox-shadow: inset 0 0 0.5rem 0 red,0 0 0.5rem 0 blue;\n}\n' )
			
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

			$mol_assert_equal( sheet , '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
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

		'component element styles with block attribute value'() {
		
			class $mol_style_sheet_test extends $mol_view {
				Item() { return new $mol_view }
				attr() { return {
					mol_theme: '$mol_theme_dark'
				} }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'@' : {
					mol_theme: {
						'$mol_theme_dark': {
							Item: {
								color: 'red',
							},
						},
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) :where([mol_style_sheet_test_item]) {\n\tcolor: red;\n}\n' )
			
		},

		'inner component styles by class'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				$mol_style_sheet_test1 : {
					color: 'red',
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
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

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tcolor: red;\n\tdisplay: block;\n}\n' )
			
		},

	})

}
