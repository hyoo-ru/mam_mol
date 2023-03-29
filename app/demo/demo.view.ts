namespace $.$$ {
	
	export class $mol_app_demo extends $.$mol_app_demo {

		@ $mol_mem_key
		component_name( name: string ) {
			return name.split( '_demo' )?.[ 0 ] ?? name
		}
		
		override detail_title() {
			const selected = this.selected()
			
			return selected ? this.component_name( selected ) : super.title()
		}

		override detail_description() {
			return this.Demo().title()
		}

		@ $mol_mem
		override names() {
			const next : string[] = []

			for( const name in this.$ ) {
				const ctor = this.$[name as keyof $]
				
				if( typeof ctor !== 'function' ) continue

				if( !$mol_func_is_class( ctor ) ) continue

				if( !( ctor.prototype instanceof $mol_example ) ) continue

				if ( this.demo_block_list().includes( name ) ) continue
				
				next.push( name )
			}

			return next.sort()
		}

		@ $mol_mem_key
		override widget_tags( name: string ) {
			const component_name = this.component_name( name )

			const tags = this.Widget( name ).tags().map( tag => tag.toLowerCase() )

			if( tags.length === 0 ) {

				console.warn( `Demo widget without tags: ${ name }` )

				return [ 'untagged', component_name ]

			} else {

				return [ ...tags, component_name ]

			}

		}

		@ $mol_mem_key
		override widget_title( name: string ) {
			return this.Widget( name ).title()
		}

		@ $mol_mem_key
		override widget_aspects( name: string ) {
			return this.Widget( name ).aspects()
		}

		override selected() {
			let value = $mol_state_arg.value( 'demo' ) || ''
			if (value && ! value.startsWith('$')) value = '$' + value

			return value
		}
		
		readme_page( next?: boolean ) {
			return $mol_state_session.value( 'readme', next ) ?? false
		}

		selected_class_name() {
			return this.selected()
		}

		@ $mol_mem_key
		Widget( name : string ) {
			return new (this.$ as any)[name] as $mol_example
		}
		
		@ $mol_mem
		names_demo() {
			const selected = this.selected()
			return [ selected ]
		}
		
		override pages() {
			let sub : $mol_view[] = []
			
			sub.push( this.Menu() )
			
			const selected = this.selected()
			if( !selected ) return sub
			
			sub.push( this.Detail( selected ) )
			
			const readme_page = this.readme_page()
			if ( readme_page ) sub.push( this.Readme_page() )
			
			sub.push( ... this.chat_pages( selected ) )
			
			return sub
		}

		override Demo() {
			return this.Widget( this.selected() )
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

		repo_dict() {
			// 🕵️
			return super.repo_dict() as Record<'mol' | (string & {}), string>
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
			const source = encodeURIComponent( `$${''}my_app ${ this.selected() }` )
			const pack = encodeURIComponent( this.$.$mol_state_arg.make_link({}) )
			return `https://studio.hyoo.ru/#!pack=${ pack }/source=${ source }/preview`
		}
		
	}

}
