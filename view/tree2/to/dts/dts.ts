namespace $ {
	const err = $mol_view_tree2_error_str

	function name_of(this: $, prop: $mol_tree2) {
		const name = prop.type
			? this.$mol_view_tree2_prop_parts(prop).name
			: prop.value

		if (! name) {
			this.$mol_fail(
				err`Required valid prop name at ${prop.span}`
			)
		}

		return prop.data(name)
	}
	
	function channel_signature( this: $, prop: $mol_tree2, ... val: $mol_tree2[] ) {
		const { name, key, next } = this.$mol_view_tree2_prop_parts(prop)

		if (next && ! val[0]?.value ) {
			this.$mol_fail(
				err`Type empty for next value at ${prop.span}`
			)
		}

		return prop.struct( 'line', [
			prop.data(name),
			prop.data('( '),
			... key ? [
				prop.data('id'),
				prop.data( ': any' + ( next ? ', ' : '' ) ),
			] : [],
			... next ? [
				prop.data('next'),
				prop.data( '?: ' ),
				... val,
				prop.data(' '),
			] : [],
			prop.data(')'),
		] )
		
	}

	function return_type(this: $, klass: $mol_tree2, input: $mol_tree2) {
		return [
			input.data( 'ReturnType< ' ),
			klass,
			input.data( '[\'' ),
			name_of.call(this,  input ),
			input.data( '\'] >' ),
		]
	}

	function parameters(this: $, klass: $mol_tree2, input: $mol_tree2, pick_index?: number) {
		const result = [
			input.data( 'Parameters< ' ),
			klass,
			input.data( '[\'' ),
			name_of.call(this,  input ),
			input.data( `'] >`),
		]

		if (pick_index !== undefined) {
			result.push(input.data(`[${pick_index}]`))
		}

		return result
	}

	function primitive_type(input: $mol_tree2) {
		let type = 'string'
		if (input.type && $mol_view_tree2_value_number(input.type)) type = 'number'

		if (input.type === 'true' || input.type === 'false') type = 'boolean'

		return input.data(type)
	}

	function readonly_arr(input: $mol_tree2, infered: readonly $mol_tree2[]) {
		return [
			input.data('readonly('),
			infered.length === 1 ? infered[0] : input.struct( 'indent', infered),
			input.data(')[]'),
		]
	}

	function type_enforce(this: $, name: $mol_tree2, a: readonly $mol_tree2[], b: readonly $mol_tree2[]) {
		return name.struct('line', [
			name.data(`type ${ name.value.replace(/<.*>/g, '') } = $mol_type_enforce<` ),
			name.struct( 'indent', [
				a[0].struct('line', a),
				a[0].data(','),
				b[0].struct('line', b),
			]),
			name.data( '>' ),
		])
	}

	export function $mol_view_tree2_to_dts(this: $, tree: $mol_tree2) {
		
		const descr = $mol_view_tree2_classes( tree )
		
		const types = [] as $mol_tree2[]
		
		for( const klass of descr.kids ) {
			
			let assert_count = 0
			const parent = this.$mol_view_tree2_child(klass)
			const props = this.$mol_view_tree2_class_props(klass)
			const aliases = [] as $mol_tree2[]
			const context = { objects: [] as $mol_tree2[] }
			const klass_name = klass.type.slice(1)
			types.push(
				klass.struct( 'line', [
					klass.data( 'export class ' ),
					klass.data( klass.type ),
					parent.data( ' extends ' ),
					parent.data( parent.type ),
					klass.data( ' {' ),
				] ),
				... props.map( prop => {
					
					const val = prop.hack({
						
						'null': val => {
							const kid = val.kids[0]

							return kid?.type
								? [ kid.data(kid.type), val.data( ' | null' ) ]
								: [ val.data( 'any' ) ]
						},
						
						'true': val => [ val.data( 'boolean' ) ],
						'false': val => [ val.data( 'boolean' ) ],
						
						'@': ( locale, belt )=> locale.hack( belt ),
						
						'<=>': (input) => return_type.call(this, klass.data( klass.type ), this.$mol_view_tree2_child(input)),
						'<=': (input) => return_type.call(this, klass.data( klass.type ), this.$mol_view_tree2_child(input)),
						'=>': () => [],

						'^': (input) => {
							const host = input.kids.length ? klass : parent
							return return_type.call(
								this,
								host.data(host.type),
								input.kids.length ? input.kids[0] : prop
							)
						},

						'=': (input) => {
							const left = input.kids[0]
							const right = left.kids[0]

							const left_parts = this.$mol_view_tree2_prop_parts(left)
							const right_parts = this.$mol_view_tree2_prop_parts(right)

							let conflict: 'next' | 'key' | undefined

							// if (left_parts.next && right_parts.next) conflict = 'next'
							if (left_parts.key && right_parts.key) conflict = 'key'

							if (conflict) {
								this.$mol_fail(err`Only one "${conflict}" allowed: ${
									left_parts[conflict]} at ${left.span} or ${
										right_parts[conflict]} at ${right.span}`)
							}

							const main = klass.data(klass.type)
							const prop_parts = this.$mol_view_tree2_prop_parts(prop)
							const method = prop.data(`${ klass.type }_${prop_parts.name}`)
							const second_main = left_parts.key || left_parts.next ? main : left.struct('line',
								return_type.call(this, main, left)
							)
							const second_key = left_parts.next || left_parts.key ? left : right

							if (prop_parts.key) {
								types.push( type_enforce.call(
									this,
									method.data(`${method.type}_${klass_name}_${++assert_count}`),
									parameters.call(this, main, prop, 0),
									parameters.call(this, second_main, second_key, 0),
								) )
							}

							if (prop_parts.next) {
								types.push( type_enforce.call(
									this,
									method.data(`${method.type}_${klass_name}_${++assert_count}`),
									parameters.call(this, main, prop, prop_parts.key ? 1 : 0),
									parameters.call(this, second_main, second_key, (left_parts.next ? left_parts : right_parts).key ? 1 : 0),
								) )
							}

							return return_type.call(
								this,
								left.struct('line',
									return_type.call(this, main, left)
								),
								name_of.call(this, right),
							)
						},

						'': ( input, belt, context )=> {

							if (input.type[0] === '*') {
								let unions = [] as $mol_tree2[]

								const hacked = ( [] as readonly $mol_tree2[] ).concat(
									... input.kids.map( kid => {
										if (kid.type[0] === '^') {
											unions = unions.concat(kid.data(' & '), kid.hack_self(belt, context))
											return []
										}

										const child = this.$mol_view_tree2_child(kid)
										const ret = child.hack_self( belt )

										return kid.struct( 'line', kid.type.match(/(?:\*|\?)/)
											? [
												channel_signature.call(this, kid, ...ret),
												kid.data(': '),
												...ret,
												kid.data( ',' ),
											]
											: [
												kid.data('\''),
												kid.data( kid.type || kid.value ),
												kid.data('\': '),
												...ret,
												kid.data( ',' ),
											],
										)
									} )
								)

								if (input.type.length > 1 || ! hacked.length) {
									return [
										input.data('Record<string, '),
										input.data(input.type.slice(1) || 'any'),
										input.data('>'),
										... unions
									]
								}

								return [
									input.data('({ '),
									input.struct( 'indent', hacked),
									input.data('}) '),
									... unions
								]

							}

							if( input.type[0] === '/' ) {
								const array_type = [
									input.type.length > 1
										? input.data(input.type.slice(1))
										: input.data('any')
									]

								if (array_type[0].value === 'any') {
									return readonly_arr(input, array_type)
								}

								for (const kid of input.kids) {
									let result = kid.hack_self(belt, context) as $mol_tree2[]

									const val = result[0].value

									if (val === 'string') {
										result = kid.value.includes('`')
											? [ kid.data(JSON.stringify(kid.value))]
											: [ kid.data('`'), kid , kid.data('`') ]
									} else if (val === 'boolean') result = [ kid.data(kid.type) ]
									else if (kid.type[0] === '^') {
										 result.push((kid.kids[0] ?? prop).data('[number]'))
									} else continue

									types.push(
										type_enforce.call(
											this,
											input.data(`${ klass.type }_${prop.type.replace(/[\?\*]*/g, '')}_${++assert_count}`),
											result,
											array_type
										)
									)
								}

								return readonly_arr(input, array_type)
							}

							if( $mol_view_tree2_class_match( input ) ) {
								const first = input.kids[0]
								if( first?.type[0] === '/' ) {

									const args = first.kids.map( (kid, index) => {
										const result = kid.hack_self(belt, context) as $mol_tree2[]
										if (index !== 0) result.unshift(kid.data(', '))

										return kid.struct('line', result)
									} )
										
									types.push(
										type_enforce.call(
											this,
											first.data(`${input.type}_${klass_name}_${++assert_count}`),
											[
												first.data('[ '),
												...args,
												first.data( ' ]' ),
											],
											[
												input.data( `ConstructorParameters< typeof `),
												input.data(input.type),
												input.data(` >`),
											],
										),
									)
									
								} else for( const over of input.kids ) {
									
									const name = name_of.call(this,  over )
									const bind = this.$mol_view_tree2_child(over)
									
									if( bind.type === '=>' ) continue
										
									types.push(
										type_enforce.call(
											this,
											over.data(`${ input.type }__${ name.value }_${klass_name}_${++assert_count}`),
											over.hack( belt ),
											return_type.call(
												this,
												input.data( input.type ),
												over,
											),
										)
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
							channel_signature.call(this, prop, ... val ), // Parameter, not Return
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
