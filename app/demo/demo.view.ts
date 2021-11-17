namespace $.$$ {
	
	/** The component tags should be at the end of the list */
	const compare_names = ( a: string, b: string )=> {
		if ( a[ 0 ] === '$' && b[ 0 ] !== '$') return 1
		if ( a[ 0 ] !== '$' && b[ 0 ] === '$' ) return -1
		if ( a > b ) return 1
		if ( a < b ) return -1
		return 0
	}

	export class $mol_app_demo extends $.$mol_app_demo {

		@ $mol_mem_key
		component_name( name: string ) {
			return '$'+ name.split( '_demo' )?.[ 0 ] ?? name
		}
		
		override detail_title() {
			const selected = this.selected()
			
			return selected ? this.component_name( selected ) : super.title()
		}

		override detail_description() {
			return this.Demo().title()
		}

		@ $mol_mem
		names_demo_all() {
			const next : string[] = []

			for( const name in this.$ ) {
				if( typeof this.$[ name ] !== 'function' ) continue

				if( !$mol_func_is_class( this.$[ name ] ) ) continue

				if( !( this.$[ name ].prototype instanceof $mol_example ) ) continue

				if ( this.demo_block_list().includes( name ) ) continue
				
				next.push( name.substring( 1 ) )
			}

			return next.sort()
		}

		@ $mol_mem_key
		widget_tags( name: string ) {
			const component_name = this.component_name( name )

			const tags = this.Widget()[ name ].tags().map( tag => tag.toLowerCase() )

			if( tags.length === 0 ) {

				console.warn( `Demo widget without tags: ${ name }` )

				return [ 'untagged', component_name ]

			} else {

				return [ ...tags, component_name ]

			}

		}

		@ $mol_mem_key
		widget_title( name: string ) {
			return this.Widget()[ name ].title()
		}

		filter() {
			return this.Menu().filter()
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
		override names_demo_filtered() {
			const words = this.filter_words()

			if( words.length !== 0 ) {

				return this.names_demo_all().filter( name => {
					const title = this.widget_title( name )

					const component_keywords = [
						...( title ? [ title.toLowerCase() ] : [] ),
						...this.widget_tags( name )
					]

					return words.every(
						word => component_keywords.some( kw => kw.includes( word ) )
					)
				} )

			} else {

				return this.names_demo_all()

			}
		}

		@ $mol_mem
		tags_demo_filtered() {
			return [... new Set(
				this.names_demo_filtered().flatMap( name => this.widget_tags( name ) )
			) ]
				.map( tag => tag.trim().toLowerCase() )
				.filter( tag => tag !== '')
				.sort( compare_names )
		}

		@ $mol_mem
		override filter_suggests() {
			const filter_words = this.filter_words()

			if( filter_words.length === 0 ) return this.tags_demo_filtered()

			const filtered_names = this.names_demo_filtered()

			if( filtered_names.length <= 1 ) return []

			const tags = this.tags_demo_filtered()

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

		override selected() {
			return $mol_state_arg.value( 'demo' ) || ''
		}
		
		readme_page() {
			return $mol_state_arg.value( 'readme' ) === ''
		}

		selected_class_name() {
			return '$' + this.selected()
		}

		@ $mol_mem
		Widget() {
			return $mol_atom2_dict({
				get : ( name : string )=> {
					const Class : typeof $mol_example = this.$[ '$' + name ]
					return new Class()
				}
			})
		}
		
		@ $mol_mem
		names_demo() {
			const selected = this.selected()
			return [ selected ]
		}
		
		override blocks() {
			let sub : $mol_view[] = []
			
			sub.push( this.Menu() )
			
			const selected = this.selected()
			if( selected ) {
				sub.push( this.Detail( selected ) )
				sub.push( ... this.chat_pages( selected ) )
			}
			
			const readme_page = this.readme_page()
			if ( readme_page && selected ) {
				sub.push( this.Readme_page() )
			}
			
			return sub
		}

		override Demo() {
			return this.Widget()[ this.selected() ]
		}
		
		override chat_seed( id: string ) {
			return '#!demo=' + id
		}
		
		logo_uri() {
			return $mol_file.relative( '/mol/logo/logo.svg' ).path()
		}

		override source_link() {
			
			const demo = $mol_state_arg.value('demo')
			if( !demo ) return this.source_prefix()

			const pieces = demo.split('_').slice(1)
			const source_link = this.source_prefix() + pieces.join('/')

			return source_link
		}
		
		@ $mol_mem_key
		name_parse( name: string ) {
			const split = name.replace( /_demo.*$/ , '' ).split('_')
			
			const keys = split.map( ( _ , index ) => split.slice( 0 , -1-index ).join('_') )
			const key = keys.find( key => this.repo_dict()[ key ] )
			
			if ( !key ) throw new Error(`${ this }.name_parse("${ name }"): Key "${ key }" not found`)

			const repo = this.repo_dict()[ key ]
			const module = split.slice( key.split('_').length )
			
			return { repo , module }
		}
		
		override repo() {
			return this.name_parse( $mol_state_arg.value( 'demo' )! ).repo
		}
		
		override module() {
			return this.name_parse( $mol_state_arg.value( 'demo' )! ).module
		}
		
		chat_link() {
			return $mol_state_arg.make_link({ demo : this.selected() })
		}
		
		@ $mol_mem
		override edit_uri() {
			const source = encodeURIComponent( `$${''}my_app $${ this.selected() }` )
			const pack = encodeURIComponent( this.$.$mol_state_arg.make_link({}) )
			return `https://studio.hyoo.ru/#!pack=${ pack }/source=${ source }/preview`
		}
		
	}
	
	export class $mol_app_demo_menu extends $.$mol_app_demo_menu {

		@ $mol_mem
		override filter( next?: string ) {
			return this.$.$mol_state_arg.value( 'filter' , next === '' ? null : next ) ?? super.filter()
		}
		
		@ $mol_mem
		override options() {
			return this.names().map( id => this.Option( id ) )
		}
		
		override option_arg( id: string ) {
			return { 'demo' : id }
		}
		
		override option_title( id: string ) {
			return '$'+ id.replace( '_demo_', '/' ).replace( '_demo', '' )
		}
		
	}

	export class $mol_app_demo_readme_not_found_error extends Error {
		constructor( public module: readonly string[] ) {
			super( 'Readme not found' )
		}
	}
	
	export class $mol_app_demo_readme extends $.$mol_app_demo_readme {

		link( module: readonly string[] ) {
			return this.link_template().replace( '{repo}', this.repo() ).replace( '{module}' , module.join('/') )
		}

		@ $mol_mem
		override readme() {
			let module = this.module()

			while( module.length ) {
				const res = this.$.$mol_fetch.request( this.link( module ) )

				if ( `${ res.status }`[0] === '2' ) return new $mol_fetch_response( res ).text() 

				else if ( res.status === 404 ) module = module.slice( 0 , -1 )

				else throw new Error( res.statusText || `HTTP Error ${ res.status }` )
			}
			
			throw new $mol_app_demo_readme_not_found_error( module )
		}

		@ $mol_mem
		override readme_content() {
			try {
				this.readme()
				return this.Readme()
			} catch ( err ) {
				if ( err instanceof $mol_app_demo_readme_not_found_error ) {
					return this.Not_found()
				}
				throw err
			}
		}
		
	}
	
}
