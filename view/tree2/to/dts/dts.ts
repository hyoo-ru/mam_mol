namespace $ {
	function name_of(this: $, prop: $mol_tree2) {
		const name = prop.type
			? this.$mol_view_tree2_prop_parts(prop).name
			: prop.value

		if (! name) {
			this.$mol_fail(
				$mol_view_tree2_error_str`Required valid prop name at ${prop.span}`
			)
		}

		return prop.data(name)
	}
	
	function params_of( this: $, prop: $mol_tree2, ... val: $mol_tree2[] ) {
		
		const { key, next } = this.$mol_view_tree2_prop_parts(prop)
		
		return prop.struct( 'line', [
			prop.data('( '),
			... key ? [
				prop.data( 'id: ant' ),
				prop.data('any, '),
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

	function param_of(this: $, klass: $mol_tree2, input: $mol_tree2, index = 0) {
		return [
			input.data( 'Parameters< ' ),
			klass.data( klass.type ),
			input.data( '["' ),
			name_of.call(this,  input ),
			input.data( `"] >[${index}]` ),
		]
	}

	function return_type_raw(this: $, klass: $mol_tree2, input: $mol_tree2) {
		return [
			input.data( 'ReturnType< ' ),
			klass,
			input.data( '["' ),
			input,
			input.data( '"] >' ),
		]
	}

	function return_type(this: $, klass: $mol_tree2, input: $mol_tree2) {
		return return_type_raw.call(this, klass.data( klass.type ), name_of.call(this,  input ))
	}

	function bind_res( this: $, klass: $mol_tree2, bind: $mol_tree2 ) {
		const child = this.$mol_view_tree2_child(bind)

		return return_type.call(this, klass, child)
	}

	function primitive_type(input: $mol_tree2) {
		let type = 'string'
		if (input.type && (
			input.type.match(/[\+\-]*NaN/)
			|| !Number.isNaN( Number( input.type ) )
		)) type = 'number'

		if (input.type === 'true' || input.type === 'false') type = 'boolean'

		return input.data(type)
	}

	export function $mol_view_tree2_to_dts(this: $, tree: $mol_tree2) {
		
		const descr = $mol_view_tree2_classes( tree )
		
		const types = [] as $mol_tree2[]
		
		for( const klass of descr.kids ) {
			
			const parent = this.$mol_view_tree2_child(klass)
			const props = this.$mol_view_tree2_class_props(klass)
			const aliases = [] as $mol_tree2[]
			const context = { objects: [] as $mol_tree2[] }
			const br = bind_res.bind(this, klass)
			const rt = return_type.bind(this, klass)
			const rt_parent = return_type.bind(this, parent)
			const param_of_method = param_of.bind(this, klass)

			types.push(
				klass.struct( 'line', [
					klass.data( 'export class ' ),
					klass.data( klass.type ),
					parent.data( ' extends ' ),
					parent.data( parent.type ),
					klass.data( ' {' ),
				] ),
				... props.map( prop => {
					
					const name = name_of.call(this, prop)

					const val = prop.hack({
						
						'null': ( val, belt )=> [ val.data( 'any' ) ],
						
						'true': ( val, belt )=> [ val.data( 'boolean' ) ],
						'false': ( val, belt )=> [ val.data( 'boolean' ) ],
						
						'@': ( locale, belt )=> locale.hack( belt ),
						
						'<=>': br,
						'<=': br,
						'=>': br,
						'^': ( ref )=> [
							ref.struct( '...', [
								ref.struct( '()', [
									ref.struct( ref.kids[0]?.type ? 'this' : 'super' ),
									ref.struct( '[]', [
										name_of.call(this, ref.kids[0]?.type ? ref.kids[0] : prop),
									] ),
									ref.struct( '(,)' )
								]),
							] ),
						],
						'': ( input, belt )=> {
							if (input.type[0] === '*') {
								return [
									... input.select('^').kids.map( inherit => 
										inherit.struct( 'line', [
											...rt_parent(prop),
											inherit.data(' & '),
										] )
									),
									... input.type.trim().length > 1 || ! input.kids?.length
										? [
											input.data('Record<string, '),
											input.data(input.type.substring(1) || 'any'),
											input.data('>'),
										]
										: [
											// input.data('Record<string, any>'),
											input.data('({ '),
											input.struct( 'indent',
												input.kids.map( field => {
													if( field.type === '^' ) return null
													const field_name = (field.type || field.value).replace(/\?\w*$/, '')
													const child = field.kids[0]

													return field.struct( 'line', [
														field.data('\''),
														field.data( field_name ),
														field.data('\''),
														field.data( ': ' ),
														...child.type === '<=>' && child.kids[0].type.match(/\?|\*/)
															? [
																params_of.call(this, field, ...param_of_method(child.kids[0], 0) ),
																field.data(' => '),
																...field.hack( belt),
															]
															: field.hack( belt),
														field.data( ',' ),
													] )
												} ).filter( this.$mol_guard_defined )
											),
											input.data('})'),
										]
		
								]
							}

							if( input.type[0] === '/' ) {
								const hacked = [] as $mol_tree2[]
								const dupes = new Set<string>()
								let is_first = true

								for (const kid of input.kids) {
									if (kid.type[0] === '/') hacked.push(...kid.hack(belt))
									else if (kid.type[0] === '*') hacked.push(...kid.hack(belt))
									else if (kid.type === '^' || kid.type === '<=') {
										const first = kid.kids[0] ?? prop
										if (! is_first) hacked.push(kid.data(' | '))
										is_first = false
										hacked.push(...kid.kids[0] ? rt(first) : rt_parent(first))
										if (kid.type === '^') hacked.push(first.data('[number]'))
									} else {
										const pt = primitive_type(kid)
										if (dupes.has(pt.value)) continue
										dupes.add(pt.value)
										if (! is_first) hacked.push(kid.data(' | '))
										is_first = false
										hacked.push(pt)
									}
								}

								if (hacked.length) {
									types.push(
										input.struct('line', [
											input.data( `type `),
											klass.data(klass.type),
											klass.data('__'),
											name_of.call(this, prop),
											prop.data(` = $mol_type_enforce< ` ),
										]),
										input.struct( 'indent', [
											input.struct('line', [
												...rt(prop),
												input.data(','),
											]),
											input.struct('line', [
												input.data('readonly('),
												...hacked,
												input.data(')[]'),
											]),
										input.data( '>' ),
									]))
								}

								if (input.type.length > 1 && input.kids.length === 0) {
									hacked.push(input.data(input.type.slice(1)))
								}

								return [
									input.data('readonly ('),
									hacked.length ? input.struct('line', hacked) : input.data('any'),
									input.data(')[]'),
								]
							}

							if( /^[$A-Z]/.test( input.type ) ) {
								const first = input.kids[0]
								if( first?.type[0] === '/' ) {
									
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
									
								} else for( const over of input.kids ) {
									
									const name = name_of.call(this,  over )
									const bind = over.kids[0]
									
									if( bind.type === '=>' ) {
										
										const pr = bind.kids[0]
										
										const res = return_type_raw.call(
											this,
											klass.data( input.type ),
											name,
										)

										aliases.push(
											pr.struct( 'indent', [
												pr.struct( 'line', [
													name_of.call(this,  pr ),
													params_of.call(this, pr, ... res ),
													bind.data( ': ' ),
													... res,
												] ),
											] ),
										)
									}
										
									types.push(
										over.data( `type ${ input.type }__${ name.value }_${ this.$mol_guid() } = $mol_type_enforce< ` ),
										over.struct( 'indent', [
											over.struct( 'line', [
												... over.hack( belt ),
												input.data( ',' ),
											] ),
											over.struct( 'line', return_type.call(
												this,
												input,
												over,
											) ),
										] ),
										input.data( '>' ),
									)
								}
								
								return [
									input.data( input.type ),
								]
								
							}
							
							return [
								primitive_type(input)
							]
							
						},
						
					}, context)
	
					return prop.struct( 'indent', [
						prop.struct( 'line', [
							name_of.call(this, prop),
							params_of.call(this, prop, ... val ),
							prop.data(': '),
							... val,
						] )
					] )
					
				} ).filter($mol_guard_defined),
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
