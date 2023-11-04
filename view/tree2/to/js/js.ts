namespace $ {

	const err = $mol_view_tree2_error_str

	function name_of(this: $, prop: $mol_tree2 ) {
		return this.$mol_view_tree2_prop_parts(prop).name
	}
	
	function params_of( this: $, prop: $mol_tree2, bidi = true ) {
		
		const { key, next } = this.$mol_view_tree2_prop_parts(prop)

		return prop.struct( '(,)', [
			... key ? [ prop.struct( 'id' ) ] : [],
			... ( bidi && next ) ? [ prop.struct( 'next' ) ] : [],
		] )
		
	}
	
	function args_of( this: $, prop: $mol_tree2, bidi = true ) {
		return params_of.call(this, prop, bidi)	
	}

	function call_of(this: $, bind: $mol_tree2, bidi = true) {
		const child = this.$mol_view_tree2_child( bind )

		return bind.struct( '()', [
			child.struct( 'this' ),
			child.struct( '[]', [
				child.data( name_of.call( this, child ) ),
			] ),
			args_of.call(this, child, bidi ),
		] )
	}

	type Context = { chain?: string[] }
	
	const localized_string = $$.$mol_tree2_from_string(`
		()
			this
			[] \\$
			[] \\$mol_locale
			[] \\text
			(,) #key
	`, 'localized_string' )

	function klass_body(
		this: $,
		acc: {
			klass: $mol_tree2
			addons: $mol_tree2[]
			members: $mol_tree2[]
		},
		prop: $mol_tree2
	) {
		const { klass, members, addons } = acc
		const { name, key, next } = this.$mol_view_tree2_prop_parts(prop)

		const decorate = ()=> {
			return prop.struct( '()', [
				prop.struct( key ? '$mol_mem_key' : '$mol_mem' ),
				prop.struct( '(,)', [
					prop.struct( '()', [
						klass.struct( '$' ),
						prop.struct( '[]', [
							klass.data( klass.type ),
						] ),
						prop.struct( '[]', [
							prop.data( 'prototype' ),
						] ),
					] ),
					prop.data( name ),
				] ),
			] )
		}
		const op = prop.kids[0]
		const is_delegate = op?.type === '<=' || op?.type === '<=>'
		if( ! is_delegate && next ) addons.push( decorate() )
		
		const val = prop.hack<Context>({
			
			'@': ( locale, belt, context )=> {
				const chain = context.chain?.join('_')

				return localized_string.hack({
					'#key': key => [ locale.data( `${ klass.type }_${ name }${
						chain ? `_${chain}` : ''}` ) ],
				})
			},
			
			'<=': bind => [ call_of.call(this, bind, false) ],

			'<=>': bind => [ call_of.call(this, bind, true) ],
			
			'=>': bind => [],
			
			'^': ( ref )=> [
				ref.struct( '...', [
					ref.struct( '()', [
						ref.struct( ref.kids[0]?.type ? 'this' : 'super' ),
						ref.struct( '[]', [
							ref.data( ref.kids[0]?.type ? name_of.call(this, ref.kids[0]) : name ),
						] ),
						ref.struct( '(,)' )
					]),
				] ),
			],
			
			'': ( input, belt, context )=> {

				if( input.type[0] === '*' ) {
					return [
						input.struct('{,}',
						input.kids.map( field => {
							
							if( field.type === '^' ) return field.list([ field ]).hack( belt )[0]
							const field_name = (field.type || field.value).replace(/\?\w*$/, '')

							return field.struct( ':', [
								field.data( field_name ),
								field.kids[0].type === '<=>'
									? field.struct( '=>', [
										params_of.call(this, field ),
										... field.hack( belt ),
									] )
									: field.hack<Context>( belt, {... context, chain: [...context.chain ?? [], field_name] })[0],
							] )
							
						} ).filter( this.$mol_guard_defined )
						)
					]
				}
				
				if( input.type[0] === '/' ) return [
					input.struct( '[,]', input.hack( belt ) ),
				]
				if( input.type && (input.type.match(/[\+\-]*NaN/) || !Number.isNaN( Number( input.type ) ) ) ) return [
					input
				]

				if( /^[$A-Z]/.test( input.type ) ) {
					if( !next ) addons.push( decorate() )
					
					const overrides = [] as $mol_tree2[]
					
					for( const over of input.kids ) {
						
						if( over.type?.[0] === '/' ) continue
						
						const oname = name_of.call(this, over )
						const bind = over.kids[0]
						if( bind.type === '@' ) {
							overrides.push(
								over.struct( '=', [
									over.struct( '()', [
										over.struct( 'obj' ),
										over.struct( '[]', [
											over.data( oname ),
										] ),
									] ),
									over.struct( '=>', [
										params_of.call(this, over ),
										... localized_string.hack({
											'#key': key => [ bind.data( `${ klass.type }_${ name }_${ oname }` ) ],
										}),
									] ),
								] ),
							)
							
						} else if( bind.type === '=>' ) {
							
							const pr = bind.kids[0]
							
							members.push(
								pr.struct( '.', [
									pr.data( name_of.call(this, pr ) ),
									params_of.call(this, pr ),
									bind.struct( '{;}', [
										over.struct( 'return', [
											over.struct( '()', [
												over.struct( 'this' ),
												over.struct( '[]', [
													over.data( name ),
												] ),
												args_of.call(this, prop ),
												over.struct( '[]', [
													over.data( oname ),
												] ),
												args_of.call(this, over ),
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
											over.data( oname ),
										] ),
									] ),
									over.struct( '=>', [
										args_of.call(this, over ),
										over.struct( '()', over.hack( belt )),
									] ),
								] ),
							)
							
						}
						
					}
						
					return [
						input.struct( 'const', [
							input.struct( 'obj' ),
							input.struct( 'new', [
								input.struct( 'this' ),
								input.struct('[]', [
									input.data( '$' ),
								]),
								input.struct('[]', [
									input.data( input.type ),
								]),
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
				params_of.call(this, prop ),
				prop.struct( '{;}', [
					... next && ! is_delegate ? [
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

		return acc
	}

	export function $mol_view_tree2_to_js( this: $, descr: $mol_tree2 ) {
		
		descr = $mol_view_tree2_classes( descr )
		
		const definitions = [] as $mol_tree2[]
		
		for( const klass of descr.kids ) {

			const parent = klass.kids[0]
			const props = this.$mol_view_tree2_class_props( klass )
			const addons = [] as $mol_tree2[]
			const members = [] as $mol_tree2[]
			const acc = { klass, addons, members }

			for( const prop of props ) {
				try {
					klass_body.call( this, acc, prop )
				} catch (e: any) {
					e.message += ` at ${prop.span}`
					$mol_fail_hidden(e)
				}
			}

			definitions.push(
				klass.struct( '=', [
					klass.struct( '()', [
						klass.struct( '$' ),
						klass.struct( '[]', [
							klass.data( klass.type ),
						] ),
					] ),
					klass.struct( 'class', [
						klass.struct( klass.type ),
						parent.struct( 'extends', [
							parent.struct( '()', [
								parent.struct( '$' ),
								parent.struct( '[]', [
									parent.data( parent.type ),
								]),
							] ),
						] ),
						klass.struct( '{}', members ),
					] ),
				] ),
				... addons,
			)
			
		}

		return descr.list([
			descr.struct( ';', definitions )
		])
		
	}
}
