namespace $.$mol {
	
	export class $mol_app_demo extends $.$mol_app_demo {
		
		title() {
			const selected = this.selected()
			if( selected ) return `$${ selected }`
			
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
			const names = this.names_demo_all().filter( name => name.match( filter ) )
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
		
		detail_title() {
			return '$' + this.selected()
		}
		
		names_demo() {
			const prefix = this.selected()
			const namesAll = this.names_demo_all()
			const names = namesAll.filter( name => name.substring( 0 , prefix.length ) === prefix )
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
			sample.titler = ()=> null
			sample.name = ()=> name
			return sample
		}
		
		logo_uri() {
			return $mol_file.relative( '/mol/logo/logo.svg' ).path()
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
