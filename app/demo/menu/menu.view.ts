namespace $.$$ {
	
	/** The component tags should be at the end of the list */
	const compare_names = ( a: string, b: string )=> {
		if ( a[ 0 ] === '$' && b[ 0 ] !== '$') return 1
		if ( a[ 0 ] !== '$' && b[ 0 ] === '$' ) return -1
		if ( a > b ) return 1
		if ( a < b ) return -1
		return 0
	}

	export class $mol_app_demo_menu extends $.$mol_app_demo_menu {

		@ $mol_mem
		override filter( next?: string ) {
			return this.$.$mol_state_session.value( 'filter' , next === '' ? null : next ) ?? super.filter() as string
		}
		
		// @ $mol_mem
		// override options() {
		// 	return this.names_filtered().map( id => this.Option( id ) )
		// }
		
		override option_arg( id: readonly string[] ) {
			return { 'demo' : id.at(-1)?.substring(1) }
		}
		
		override option_title( path_id: readonly string[] ) {
			const id = path_id.at(-1)!

			return id.replace( '_demo_', '/' ).replace( '_demo', '' )
		}

		override search_start( event?: Event ) {
			this.Filter().Query().bring()
			event?.preventDefault()
		}
		
		/** Filter string not empty and ends with space */
		@ $mol_mem
		filter_last_word_completed() {
			return /[^\s]+\s+$/.test( this.filter() )
		}

		/** Filter string uniq words */
		@ $mol_mem
		filter_words() {
			const filter = this.filter().trim()

			const words = filter !== '' ? filter.split( /\s+/ ) : []

			return [ ... new Set( words ) ].map( word => word.toLowerCase() )
		}

		@ $mol_mem
		override ids_tags() {
			const result = {} as Record<string, string[]>

			for (const name of this.names_filtered()) {
				let aspects = this.widget_aspects( name )
				result[name] = result[name] ?? []

				for (const tag of aspects) {
					result[name].push(tag)
				}
			}

			return result
		}


		@ $mol_mem
		override tags_dictionary() {
			const tag_weights = new Map<string, number>()

			for (const name of this.names()) {
				for (const tag of this.widget_tags( name )) {
					const weight = tag_weights.get(tag)
					tag_weights.set(tag, weight === undefined ? 0 : weight + 1)
				}
			}

			return [ ...tag_weights.entries() ]
				.filter( ( [ , weight ] ) => weight > 2 )
				.sort( ( [, aw ], [, bw ] ) => bw - aw )
				.reduce( ( acc, [ tag ] ) => {
					acc[ tag ] = tag
					return acc
				}, {} as Record<string, string>)
		}

		@ $mol_mem
		tags_filtered() {
			return [... new Set(
				this.names_filtered().flatMap( name => this.widget_tags( name ) )
			) ]
				.map( tag => tag.trim().toLowerCase() )
				.filter( tag => tag !== '')
				.sort( compare_names )
		}

		@ $mol_mem
		filter_suggests() {
			const filter_words = this.filter_words()

			if( filter_words.length === 0 ) return this.tags_filtered()

			const filtered_names = this.names_filtered()

			if( filtered_names.length <= 1 ) return []

			const tags = this.tags_filtered()

			const filter_last_word = filter_words.slice( -1 )[ 0 ]

			const filter_last_word_completed = this.filter_last_word_completed()
			
			/** Tags suggests */
			const suggests: string[] = []

			for( const tag of tags ) {
				if( filter_words.includes( tag ) ) continue

				if ( filter_last_word_completed ) {
					suggests.push(
						`${ filter_words.join( ' ' ) } ${ tag }`
					)
				} else if ( 
					tag.indexOf( filter_last_word ) === 0 &&
					( filter_last_word.length < tag.length )
				) {
					suggests.push(
						`${ filter_words.slice( 0, -1 ).join( ' ' ) } ${ tag }`
					)
				}
			}

			return suggests
		}

		@ $mol_mem
		names_filtered() {
			const words = this.filter_words()
			let names = this.names()

			const tags_selected = new Set(this.tags_selected())

			if (tags_selected.size > 0) names = names.filter(name =>
				this.widget_tags( name ).some(tag => tags_selected.has(tag))
			)

			if( words.length !== 0 ) {

				names = names.filter( name => {
					const title = this.widget_title( name )

					const component_keywords = [
						...( title ? [ title.toLowerCase() ] : [] ),
						...this.widget_tags( name )
					]

					return words.every(
						word => component_keywords.some( kw => kw.includes( word ) )
					)
				} )

			}

			return names
		}

	}
	
}
