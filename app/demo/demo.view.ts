namespace $.$mol {
	
	export class $mol_app_demo extends $.$mol_app_demo {
		
		title() {
			const selected = this.selected()
			if( selected ) return `$${ selected }`
			
			return super.title()
		}
		
		@ $mol_mem()
		welcomeText() {
			return $mol_http_resource.item( 'readme.md' ).text()
		}
		
		@ $mol_mem()
		namesDemoAll() {
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
		namesDemoFiltered() {
			const filter = this.filterString()
			const names = this.namesDemoAll().filter( name => name.match( filter ) )
			return names
		}
		
		@ $mol_mem()
		navigatorHierarchy() {
			const names = this.namesDemoFiltered()
			
			const hierarchy = {} as { [ prefix : string ] : $mol_grider_node }
			const root = hierarchy[ '' ] = {
				id : '' ,
				parent : null as $mol_grider_node ,
				childs : [] as $mol_grider_node[] ,
			}
			
			names.forEach( name => {
				const chunks = name.split( /(?=[_.-])/ )
				let branch = root
				for( let i = 1 ; i <= chunks.length ; ++ i ) {
					const prefix = chunks.slice( 0 , i ).join( '' )
					if( !hierarchy[ prefix ] ) {
						branch.childs.push( hierarchy[ prefix ] = {
							id : prefix ,
							parent : branch ,
							childs : [] as $mol_grider_node[] ,
						} )
					}
					branch = hierarchy[ prefix ]
				}
			} )
			
			hierarchy[ '' ].childs.map( child => reduce( child ) )
			
			function reduce( node : $mol_grider_node ) {
				if( names.indexOf( node.id ) >= 0 ) return node
				
				node.childs = node.childs.map( child => reduce( child ) )
				if( node.childs.length !== 1 ) return node
				
				node.childs[0].parent = node.parent
				return node.childs[0]
			}
			
			return hierarchy
		}
		
		navigatorOption( id : string ) {
			const parent = this.navigatorHierarchy()[ id ].parent
			const title = `$${ id }`.substring( parent.id.length + 1 ).replace( /^[-._]|[-._]demo$/g , '' )
			return { title }
		}
		
		selected() {
			return $mol_state_arg.value( this.stateKey( 'demo' ) ) || ''
		}

		@ $mol_mem_key()
		option( name : string ) {
			return new $mol_linker().setup( obj => {
				obj.childs = () => [ name ? ( '$' + name ) : 'All' ]
				obj.arg = () => ({ demo : ()=> name })
			} )
		}
		
		@ $mol_mem_key()
		widget( name : string ) {
			var Class : typeof $mol_viewer = (<{[index : string]:any}>$)[ '$' + name ]
			return new Class().setup( obj => {
				obj.statePrefix = () => this.statePrefix() + name + '.'
			} )
		}
		
		detailerTitle() {
			return '$' + this.selected()
		}
		
		namesDemo() {
			const prefix = this.selected()
			const namesAll = this.namesDemoAll()
			const names = namesAll.filter( name => name.substring( 0 , prefix.length ) === prefix )
			return names
		}
		
		@$mol_mem() 
		mainerContent() {
			switch( this.namesDemo().length ) {
				case 0 :
					return [ this.emptyDemoMessager() ]
				case 1 :
					return [ this.sampleLarge(this.namesDemo()[0]) ]
				default :
					return [ this.detailerRower() ]
			}
		}
		
		@ $mol_mem() 
		samples () {
			return this.namesDemo().map( name => this.sampleSmall( name ) )
		}
		
		@ $mol_mem_key()
		sampleSmall( name : string ) {
			const sample = new $mol_demo_small
			sample.name = ()=> name
			return sample
		}
		
		@ $mol_mem_key()
		sampleLarge(id: string) {
			const sample = new $mol_demo_large()
			sample.titler = ()=> null
			sample.name = ()=> id;
			return sample
		}
		
	}
	
	export class $mol_app_demo_navigator extends $.$mol_app_demo_navigator {
		
		celler( id : { row : string[] , col : string } ) : $mol_viewer {
			if( id.col === 'title' ) return this.linker( id )
			return super.celler( id )
		}
		
		arg( id : { row : string[] , col : string } ) {
			return { 'demo' : ()=> id.row[ id.row.length - 1 ] }
		}
		
	}
	
}
