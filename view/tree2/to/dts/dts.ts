namespace $ {
	
	function name_of( prop: $mol_tree2 ) {
		return [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!.name
	}
	
	function params_of( prop: $mol_tree2, ... val: $mol_tree2[] ) {
		
		const { key, next } = [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
		
		return prop.struct( 'line', [
			prop.data('( '),
			... key ? [
				prop.data( 'id' ),
				prop.data(': any, '),
			] : [],
			... next ? [
				prop.data( 'next' ),
				prop.data('?: '),
				... val,
				prop.data(' '),
			] : [],
			prop.data(')'),
		] )
		
	}
	
	export function $mol_view_tree2_to_dts(this: $, descr: $mol_tree2) {
		
		descr = $mol_view_tree2_classes( descr )
		
		const types = [] as $mol_tree2[]
		
		for( const klass of descr.kids ) {

			const parent = klass.kids[0]
			const props = this.$mol_view_tree2_class_props(klass)
			const aliases = [] as $mol_tree2[]
			
			types.push(
				klass.struct( 'line', [
					klass.data( 'export class ' ),
					klass.data( klass.type ),
					parent.data( ' extends ' ),
					parent.data( parent.type ),
					klass.data( ' {' ),
				] ),
				... props.map( prop => {
					
					const { name, key, next } = [ ... prop.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
					
					const bind_res = ( bind: $mol_tree2 )=> [
						bind.data( 'ReturnType< ' ),
						klass.data( klass.type ),
						bind.data( '["' ),
						bind.kids[0].data( name_of( bind.kids[0] ) ),
						bind.data( '"] >' ),
					]
				
					const val = prop.hack({
						
						'null': ( val, belt )=> [ val.data( 'any' ) ],
						
						'true': ( val, belt )=> [ val.data( 'boolean' ) ],
						'false': ( val, belt )=> [ val.data( 'boolean' ) ],
						
						'@': ( locale, belt )=> locale.hack( belt ),
						
						'<=>': bind_res,
						'<=': bind_res,
						'=>': bind_res,
						
						'*': ( obj, belt )=> [
							
							... obj.select('^').kids.map( inherit => 
								inherit.struct( 'line', [
									inherit.data( 'ReturnType< ' ),
									parent.data( parent.type ),
									inherit.data( '["' ),
									prop.data( name ),
									inherit.data( '"] > & ' ),
								] )
							),
							
							obj.data('({ '),
							obj.struct( 'indent',
								obj.kids.map( field => {
									if( field.type === '^' ) return null
									const field_name = field.type.replace(/\?\w*$/, '')
									return field.struct( 'line', [
										field.data('\''),
										field.data( field_name ),
										field.data('\''),
										field.data( ': ' ),
										... field.hack( belt ),
										field.data( ',' ),
									] )
								} ).filter( this.$mol_guard_defined )
							),
							obj.data('})'),
							
						],
						
						'': ( input, belt )=> {
							
							if( input.type[0] === '/' ) return [
								input.data('readonly '),
								input.type.trim().length > 1 ? input.data( input.type.slice(1) ) : input.data('any'),
								input.data('[]'),
							]
							
							if( Number( input.type ).toString() === input.type.replace( /^\+/, '' ) ) return [
								input.data( 'number' ),
							]
							
							if( /^[$A-Z]/.test( input.type ) ) {
								
								const first = input.kids[0]
								if( first && first.type === '/' ) {
									
									types.push(
										first.data( `type ${ input.type }__${ this.$mol_guid() } = $mol_type_enforce< ` ),
										first.struct( 'indent', [
											first.struct( 'line', [
												... input.hack( belt ),
												input.data( ',' ),
											] ),
											input.data( `Parameters< ${ input.type } >` ),
										] ),
										input.data( '>' ),
									)
									
								} else {
								
									for( const over of input.kids ) {
										
										const name = name_of( over )
										const bind = over.kids[0]
										
										if( bind.type === '=>' ) {
											
											const pr = bind.kids[0]
											
											const res = [
												bind.data( 'ReturnType< ' ),
												klass.data( input.type ),
												bind.data( '["' ),
												over.data( name ),
												bind.data( '"] >' ),
											]
											
											aliases.push(
												pr.struct( 'indent', [
													pr.struct( 'line', [
														pr.data( name_of( pr ) ),
														bind.data( ': ' ),
														params_of( pr, ... res ),
														bind.data( '=> ' ),
														... res,
													] ),
												] ),
											)
										}
											
										types.push(
											over.data( `type ${ input.type }__${ name }_${ this.$mol_guid() } = $mol_type_enforce< ` ),
											over.struct( 'indent', [
												over.struct( 'line', [
													... over.hack( belt ),
													input.data( ',' ),
												] ),
												over.struct( 'line', [
													input.data( 'ReturnType< ' ),
													input.data( input.type ),
													input.data( '["' ),
													over.data( name ),
													input.data( '"] >' ),
												] ),
											] ),
											input.data( '>' ),
										)
										
									}
									
								}
								
								return [
									input.data( input.type ),
								]
								
							}
							
							return [
								input.data( input.type || 'string' ),
							]
							
						},
						
					})
	
					return prop.struct( 'indent', [
						prop.struct( 'line', [
							prop.data( name ),
							params_of( prop, ... val ),
							prop.data(': '),
							... val,
						] )
					] )
					
				} ),
				... aliases,
				klass.data( '}' ),
				descr.data(''),
			)
			
		}

		return descr.list([
			descr.data( 'declare namespace $ {' ),
			descr.data( '' ),
			descr.struct( 'indent', types ),
			descr.data( '}' ),
		])
		
	}
}
