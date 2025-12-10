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

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				width : '50%',
				height : '50px',
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n' )
			
		},

		'various functions'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { calc } = $mol_style_func

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				width : calc( `100% - 1px` ),
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n' )
			
		},

		'property groups'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				flex : {
					grow: 5,
					shrink: 10,
				}
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tflex-grow: 5;\n\tflex-shrink: 10;\n}\n' )
			
		},
		
		'custom properties'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'--isVariable': 'yes',
				'--is_variable': 'no',
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\t--is-variable: yes;\n\t--is_variable: no;\n}\n' )
			
		},
		
		'custom property groups'() {
			
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				'--variable' : {
					test1: '5px',
					test2: '10px',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\t--variable-test1: 5px;\n\t--variable-test2: 10px;\n}\n' )
			
		},

		'property shorthand'() {
		
			class $mol_style_sheet_test extends $mol_view {}
			
			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				padding: [ '5px' , 'auto' ],
				margin: [ '10px' , 'auto' ],
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n\tmargin: 10px auto;\n}\n' )
			
		},

		'sequenced values'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const { url } = $mol_style_func

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				background: {
					image: [ [url('foo')], [url('bar')] ],
					size: [[ 'cover' ], [ 'contain' ]],
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n\tbackground-size: cover,contain;\n}\n' )
			
		},

		'sequenced structs'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				box: {
					shadow: [
						{
							inset: true,
							x: 0,
							y: 0,
							blur: '0.5rem',
							spread: 0,
							color: 'red',
						},
						{
							inset: false,
							x: 0,
							y: 0,
							blur: '0.5rem',
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
				color: 'red',
				':focus': {
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:focus {\n\tdisplay: block;\n}\n' )
			
		},

		'component block styles with pseudo element'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				'::first-line': {
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]::first-line {\n\tdisplay: block;\n}\n' )
			
		},

		'component block styles with media query'() {
		
			class $mol_style_sheet_test extends $mol_view {}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				'@media': {
					'print': {
						display: 'block',
					},
					'(max-width: 640px)': {
						display: 'inline',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n@media print {\n[mol_style_sheet_test] {\n\tdisplay: block;\n}\n}\n@media (max-width: 640px) {\n[mol_style_sheet_test] {\n\tdisplay: inline;\n}\n}\n' )
			
		},

		'component block styles with attribute value'() {
		
			class $mol_style_sheet_test extends $mol_view {
				attr() { return {
					mol_theme: '$mol_theme_dark'
				} }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				'@' : {
					mol_theme: {
						'$mol_theme_dark': {
							display: 'block',
						},
					},
					disabled: {
						'true': {
							width: '100%',
						},
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n' )
			
		},

		'component block styles with attribute value (short syntax)'() {
		
			class $mol_style_sheet_test extends $mol_view {
				attr() { return {
					mol_theme: '$mol_theme_dark'
				} }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				'[mol_theme]': {
					'$mol_theme_dark': {
						display: 'block',
					},
				},
				'[disabled]': {
					'true': {
						width: '100%',
					},
					'false': {
						width: '50%',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n[mol_style_sheet_test]:where([disabled="false"]) {\n\twidth: 50%;\n}\n' )
			
		},

		'component element styles'() {
		
			class $mol_style_sheet_test extends $mol_view {
				Item() { return new $mol_view }
			}

			const sheet = $mol_style_sheet( $mol_style_sheet_test , {
				color: 'red',
				Item : {
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test_item] {\n\tdisplay: block;\n}\n' )
			
		},

		'component element of element styles'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				width: '100%',
				List : {
					color: 'red',
					Item : {
						display: 'block',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] {\n\twidth: 100%;\n}\n[mol_style_sheet_test2_list] {\n\tcolor: red;\n}\n[mol_style_sheet_test2_list_item] {\n\tdisplay: block;\n}\n' )
			
		},

		'component element styles with block attribute value'() {
		
			class $mol_style_sheet_test extends $mol_view {
				Item() { return new $mol_view }
				attr() { return {
					mol_theme: '$mol_theme_dark',
					disabled: true,
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
				color: 'red',
				$mol_style_sheet_test1 : {
					display: 'block',
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n' )
			
		},

		'child component styles by class'() {
		
			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				color: 'red',
				'>' : {
					$mol_style_sheet_test1 : {
						display: 'block',
					},
					$mol_style_sheet_test2 : {
						display: 'inline',
					},
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test2]) {\n\tdisplay: inline;\n}\n' )
			
		},

		'parent component styles by class'() {

			const sheet = $mol_style_sheet( $mol_style_sheet_test2 , {
				color: 'red',
				'^' : {
					$mol_style_sheet_test1 : {
						display: 'block',
					},
					$mol_style_sheet_test2 : {
						display: 'inline',
					},
					'@' : {
						'aria-selected' : {
							true : {
								color: 'blue'
							}
						}
					}
				},
			} )

			$mol_assert_equal( sheet , '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n:where([mol_style_sheet_test1]) [mol_style_sheet_test2] {\n\tdisplay: block;\n}\n:where([mol_style_sheet_test2]) [mol_style_sheet_test2] {\n\tdisplay: inline;\n}\n:where([aria-selected="true"]) [mol_style_sheet_test2] {\n\tcolor: blue;\n}\n' )

		},

	})

}
