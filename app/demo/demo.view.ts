namespace $.$$ {
	
	export class $mol_app_demo extends $.$mol_app_demo {
		
		title() {
			const selected = this.selected()
			if( selected ) {
				const names = this.names_demo() 
				/*if( names.length === 1 ) {
					return `$${ selected.replace( /_demo.* / , '' ) }: ${ this.Sample_large( names[0] ).Widget().title() }`
				}*/
				return `$${ selected }`
			}
			
			return super.title()
		}
		
		@ $mol_mem
		names_demo_all() {
			var next : string[] = []
			for( var name in this.$ ) {
				if( !/^\$.*_demo($|_)/i.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof this.$[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next.sort()
		}
		
		@ $mol_mem
		names_demo_filtered() {
			const filter = this.filter_string().toLowerCase()
			const names = this.names_demo_all().filter( name => ( name.toLowerCase().indexOf( filter ) != -1 ) )
			return names
		}
		
		@ $mol_mem
		nav_hierarchy() {
			const names = this.names_demo_filtered()
			
			const hierarchy = {} as { [ prefix : string ] : $mol_grid_node }
			const root = hierarchy[ '' ] = {
				id : '' ,
				parent : null as $mol_grid_node ,
				sub : [] as $mol_grid_node[] ,
			}
			
			names.forEach( name => {
				const chunks = name.split( /(?=[_.-])/ )
				let branch = root
				for( let i = 1 ; i <= chunks.length ; ++ i ) {
					const prefix = chunks.slice( 0 , i ).join( '' )
					if( !hierarchy[ prefix ] ) {
						branch.sub.push( hierarchy[ prefix ] = {
							id : prefix ,
							parent : branch ,
							sub : [] as $mol_grid_node[] ,
						} )
					}
					branch = hierarchy[ prefix ]
				}
			} )
			
			hierarchy[ '' ].sub.map( child => reduce( child ) )
			
			function reduce( node : $mol_grid_node ) {
				if( names.indexOf( node.id ) >= 0 ) return node
				
				node.sub = node.sub.map( child => reduce( child ) )
				if( node.sub.length !== 1 ) return node
				
				node.sub[0].parent = node.parent
				return node.sub[0]
			}
			
			return hierarchy
		}
		
		nav_option( id : string ) {
			const parent = this.nav_hierarchy()[ id ].parent
			
			const title = `$${ id }`
			.substring( parent.id.length + 1 )
			.replace( /^[-._]|[-._]demo$/g , '' )
			.replace( /_/g , ' ' )
			.replace( /^(\w)/ , letter => letter.toUpperCase() )
			
			return { title }
		}
		
		selected() {
			return $mol_state_arg.value( 'demo' ) || ''
		}

		selected_class_name() {
			return '$' + this.selected()
		}

		editing() {
			return $mol_state_arg.value( 'edit' ) != null
		}

		@ $mol_mem_key
		Widget( name : string ) {
			const Class : typeof $mol_view = this.$[ '$' + name ]
			return new Class()
		}
		
		@ $mol_mem
		names_demo() {
			const selected = this.selected()
			const all = this.names_demo_all()
			
			const root = this.nav_hierarchy()[ selected ]
			if( !root ) return []

			const names : string[] = []
			const collect = ( node : typeof root )=> {
				const demo = `${ node.id }_demo`
				if( all.indexOf( demo ) !== -1 ) {
					if( names.indexOf( demo ) === -1 ) names.push( demo )
				} else if( all.indexOf( node.id ) !== -1 ) {
					if( names.indexOf( node.id ) === -1 ) names.push( node.id )
				} else {
					node.sub.forEach( child => collect( child ) )
				}
			}

			if( root.sub.length ) root.sub.forEach( child => collect( child ) )
			collect( root )
			
			return names
		}
		
		blocks() {
			let sub : $mol_view[] = []
			
			sub.push( this.Menu() )
			
			if( this.selected() ) {
				if( this.editing() && this.names_demo().length === 1 ) sub.push( ... this.Editor( this.selected() ).pages() )
				else sub.push( this.Detail() )
			}
			
			return sub
		}

		Placeholder() {
			return this.selected() ? null : super.Placeholder()
		}
		
		@ $mol_mem 
		main_content() {
			const names = this.names_demo()
			switch( names.length ) {
				case 0 :
					return [ this.Detail_empty_message() ]
				default :
					return this.names_demo().map( name => this.Widget( name ) )
			}
		}
		
		logo_uri() {
			return $mol_file.relative( '/mol/logo/logo.svg' ).path()
		}

		source_link(){
			var pieces = $mol_state_arg.value('demo').split('_').slice(1) 
			var source_link = this.source_prefix() + pieces.join('/')
			return source_link
		}

		chat_link() {
			return $mol_state_arg.make_link({ demo : this.selected() })
		}
		
	}
	
	export class $mol_app_demo_nav extends $.$mol_app_demo_nav {
		
		Cell( id : { row : string[] , col : string } ) : $mol_view {
			if( id.col === 'title' ) return this.Option( id )
			return super.cell( id )
		}
		
		link( id : { row : string[] , col : string } ) {
			return this.$.$mol_state_arg.make_link({ 'demo' : id.row[ id.row.length - 1 ] })
		}
		
	}
	
}
