namespace $ {
	
	function name_of( prop: $mol_tree2 ) {
		return [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!.name
	}
	
	function params_of( prop: $mol_tree2 ) {
		
		const { key, next } = [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
		
		return prop.struct( '(,)', [
			... key ? [ prop.struct( key.slice(1) || 'key' ) ] : [],
			... next ? [ prop.struct( next.slice(1) || 'next' ) ] : [],
		] )
		
	}
	
	export function $mol_view_tree2_to_js( this: $, descr: $mol_tree2 ) {
		
		descr = $mol_view_tree2_classes( descr )
		
		const definitions = [] as $mol_tree2[]
		
		for( const klass of descr.kids ) {

			const parent = klass.kids[0]
			const props = this.$mol_view_tree2_class_props( klass )
			const addons = [] as $mol_tree2[]
			const members = [] as $mol_tree2[]
			
			for( const prop of props ) {
				
				const { name, key, next } = [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
				
				const bind_res = ( bind: $mol_tree2 )=> {
					const res = bind.kids[0]
					return [
						bind.struct( '()', [
							res.struct( 'this' ),
							res.struct( '[]', [
								res.data( name_of( res ) ),
							] ),
							params_of( bind.kids[0] ),
						] ),
					]
				}
				
				const decorate = ()=> {
					return prop.struct( '()', [
						prop.struct( '__decorate' ),
						prop.struct( '(,)', [
							prop.struct( '[,]', [
								prop.struct( key ? '$mol_mem_key' : '$mol_mem' ),
							] ),
							prop.struct( '()', [
								klass.clone([]),
								prop.struct( '[]', [
									prop.data( 'prototype' ),
								] ),
							] ),
							prop.data( name ),
							prop.struct( 'null' ),
						] ),
					] )
				}
				
				const localize = ( suffix = '' )=> prop.struct( '()', [
					prop.struct( 'this' ),
					prop.struct( '[]', [
						prop.data( '$' )
					] ),
					prop.struct( '[]', [
						prop.data( '$' + 'mol_locale' )
					] ),
					prop.struct( '[]', [
						prop.data( 'text' )
					] ),
					prop.struct( '(,)', [
						prop.data( `${ klass.type }_${ name }${ suffix }` )
					] ),
				] )
				
				if( next ) addons.push( decorate() )
				
				const val = prop.hack({
					
					'@': ( locale, belt )=> [ localize() ],
					
					'<=>': bind_res,
					'<=': bind_res,
					'=>': bind_res,
					
					'^': ( ref )=> [
						ref.struct( '...', [
							ref.struct( '()', [
								ref.struct( 'super' ),
								ref.struct( '[]', [
									ref.data( name ),
								] ),
								ref.struct( '(,)' )
							]),
						] ),
					],
					
					'*': ( obj, belt )=> [
						
						obj.struct('{,}',
							obj.kids.map( field => field.struct( ':', [
								field.data( field.type ),
								field.struct( '()',
									field.hack( belt ),
								),
							] ) ).filter( this.$mol_guard_defined )
						),
						
					],
					
					'': ( input, belt )=> {
						
						if( input.type[0] === '/' ) return [
							input.struct( '[,]', input.hack( belt ) ),
						]
						
						if( input.type[0] === '$' ) {
							
							if( !next ) addons.push( decorate() )
							
							const overrides = [] as $mol_tree2[]
							
							for( const over of input.kids ) {
								
								if( over.type === '/' ) continue
								
								const name = name_of( over )
								const bind = over.kids[0]
								
								if( bind.type === '@' ) {
									
									overrides.push(
										over.struct( '=', [
											over.struct( '()', [
												over.struct( 'obj' ),
												over.struct( '[]', [
													over.data( name ),
												] ),
											] ),
											over.struct( '=>', [
												params_of( over ),
												localize( '_' + name ),
											] ),
										] ),
									)
									
								} else if( bind.type === '=>' ) {
									
									const pr = bind.kids[0]
									
									members.push(
										pr.struct( '.', [
											pr.data( name_of( pr ) ),
											params_of( pr ),
											bind.struct( '{;}', [
												over.struct( 'return', [
													over.struct( '()', [
														over.struct( 'this' ),
														over.struct( '[]', [
															over.data( name ),
														] ),
														params_of( over ),
													] ),
												] )
											] ),
										] ),
									)
									
								} else {
									
									overrides.push(
										over.struct( '=', [
											over.struct( '()', [
												over.struct( 'obj' ),
												over.struct( '[]', [
													over.data( name ),
												] ),
											] ),
											over.struct( '=>', [
												params_of( over ),
												over.struct( '()',
													over.hack( belt )
												),
											] ),
										] ),
									)
									
								}
								
							}
								
							return [
								input.struct( 'const', [
									input.struct( 'obj' ),
									input.struct( 'new', [
										input.struct( input.type ),
										input.struct( '(,)', input.select( '/', null ).hack( belt ) ),
									] ),
								] ),
								... overrides,
								input.struct( 'obj' ),
							]
							
						}
						
						return [ input ]
						
					},
					
				})

				members.push(
					prop.struct( '.', [
						prop.data( name ),
						params_of( prop ),
						prop.struct( '{;}', [
							... next ? [
								prop.struct( 'if', [
									prop.struct( '(!==)', [
										prop.struct( 'next' ),
										prop.struct( 'undefined' ),
									] ),
									prop.struct( 'return', [
										prop.struct( 'next' ),
									] ),
								] ),
							] : [],
							... val.slice( 0, -1 ),
							prop.struct( 'return', val.slice( -1 ) ),
						] ),
					] )
				)
				
			}
						
			definitions.push(
				klass.struct( 'class', [
					klass.struct( klass.type ),
					parent.struct( 'extends', [
						parent.struct( parent.type ),
					] ),
					klass.struct( '{;}', members ),
				] ),
				... addons
			)
			
		}

		return descr.list([
			descr.struct( ';', definitions )
		])
		
	}
}
