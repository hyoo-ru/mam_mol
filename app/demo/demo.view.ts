namespace $.$mol {
	
	export class $mol_app_demo extends $.$mol_app_demo {
		
		title() {
			const selected = this.selected()
			if( selected ) {
				const names = this.names_demo() 
				if( names.length === 1 ) {
					return `$${ selected.replace( /_demo.*/ , '' ) }: ${ this.Sample_large( names[0] ).widget().title() }`
				}
				return `$${ selected }`
			}
			
			return super.title()
		}
		
		@ $mol_mem()
		welcome_text() {
			return $mol_http_resource.item( 'readme.md' ).text()
		}
		
		@ $mol_mem()
		names_demo_all() {
			var next : string[] = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/i.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof (<{[index : string]:any}>$)[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next.sort()
		}
		
		@ $mol_mem()
		names_demo_filtered() {
			const filter = this.filter_string()
			const names = this.names_demo_all().filter( name => ( name.indexOf( filter ) != -1 ) )
			return names
		}
		
		@ $mol_mem()
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
			const title = `$${ id }`.substring( parent.id.length + 1 ).replace( /^[-._]|[-._]demo$/g , '' )
			return { title }
		}
		
		selected() {
			return $mol_state_arg.value( this.state_key( 'demo' ) ) || ''
		}

		@ $mol_mem_key()
		option( name : string ) {
			return new $mol_link().setup( obj => {
				obj.sub = () => [ name ? ( '$' + name ) : 'All' ]
				obj.arg = () => ({ demo : name })
			} )
		}
		
		@ $mol_mem_key()
		widget( name : string ) {
			const Class : typeof $mol_view = (<{[index : string]:any}>$)[ '$' + name ]
			return new Class()
		}
		
		@ $mol_mem()
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
			
			if( this.selected() ) sub.push( this.Detail() )
			else sub.unshift( this.Placeholder() )
			
			return sub
		}
		
		@ $mol_mem() 
		main_content() {
			const names = this.names_demo()
			switch( names.length ) {
				case 0 :
					return [ this.Detail_empty_message() ]
				case 1 :
					return [ this.Sample_large( names[0] ) ]
				default :
					return [ this.Detail_row() ]
			}
		}
		
		@ $mol_mem() 
		Samples () {
			return this.names_demo().map( name => this.Sample_small( name ) )
		}
		
		@ $mol_mem_key()
		Sample_small( name : string ) {
			const sample = new $mol_demo_small
			sample.name = ()=> name
			return sample
		}
		
		@ $mol_mem_key()
		Sample_large( name : string ) {
			const sample = new $mol_demo_large()
			sample.title = ()=> null
			sample.name = ()=> name
			return sample
		}
		
		logo_uri() {
			return $mol_file.relative( '/mol/logo/logo.svg' ).path()
		}

		 source_link(){
			var component_name = $mol_state_arg.value('demo').split('_')
			component_name = component_name.slice(1)

			const link_mol = 'https://github.com/eigenmethod/mol/tree/master/'

			var link_git = link_mol + component_name.join('/')

			return link_git

		}
		
	}
	
	export class $mol_app_demo_nav extends $.$mol_app_demo_nav {
		
		Cell( id : { row : string[] , col : string } ) : $mol_view {
			if( id.col === 'title' ) return this.Option( id )
			return super.cell( id )
		}
		
		arg( id : { row : string[] , col : string } ) {
			return { 'demo' : id.row[ id.row.length - 1 ] }
		}
		
	}
	
}
