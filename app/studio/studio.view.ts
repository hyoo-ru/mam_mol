namespace $.$$ {
	
	export class $mol_app_studio extends $.$mol_app_studio {

		pages() {
			return [
				this.Preview_page() ,
				... this.source_show()
					? [ this.Source_page() ]
					: ( this.path() == null )
						? []
						: [ this.Editor_page() ] ,
			]
		}

		@ $mol_mem
		classes_static() {
			const view_tree = '$mol_view $mol_object\n\ttitle \\\n\tsub /\n\tstyle *\n\tattr *\n\tevent *\n\tdom_name \\\n\n'
			const source = view_tree + $mol_http.resource( '-/web.view.tree' ).text()
			return $mol_view_tree_classes( $mol_tree.fromString( source ) )
		}
		
		@ $mol_mem
		classes( next? : $mol_tree ) {
			if( next ) return next
			
			return this.classes_static().insert( new $mol_tree({ type : this.class_name_base() }) , this.class_name_self() , null )
		}
		
		@ $mol_mem_key
		class( name : string , next? : $mol_tree ) {
			if( next !== undefined ) {
				this.classes( this.classes().insert( next , name ) )
			}
			return this.classes().select( name ).sub[0]
		}

		class_self( next? : $mol_tree ) {
			return this.class( this.class_name_self() , next )
		}

		@ $mol_mem_key
		props_self( name : string ) {
			const def = this.class( name )
			if( !def ) return new $mol_tree
			
			return $mol_view_tree_class_props( def )
		}
		
		@ $mol_mem_key
		props_all( name : string , next? : $mol_tree , force? : $mol_atom_force ) {
			if( next ) return next
			
			const props_all : { [ name : string ] : $mol_tree } = {}

			const collect = ( name : string )=> {
				const sup = this.class( name )
				if( sup ) collect( $mol_view_tree_super_name( sup ) )

				const props = this.props_self( name )
				for( let prop of props.sub ) props_all[ prop.type ] = prop
			}

			collect( name )
			
			return this.classes().clone({ type : '' , sub : Object.keys( props_all ).map( name => props_all[ name ] ) })
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			const path = this.path()
			return this.props_all( this.prop_class( path ) ).sub
			.filter( prop => !$mol_view_tree_prop_key( prop ) )
			.filter( $mol_match_text( this.prop_filter() , ( prop : $mol_tree )=> [ $mol_view_tree_prop_name( prop ) ] ) )
			.map( prop => this.Prop([ ... path , prop.type , null ]) )
		}

		prop_overs( path : $mol_tree_path ) {
			return this.prop_default( path ).sub.map( over => over.type )
		}

		prop_path( path : $mol_tree_path ) {
			return path
		}
		
		prop_title( path : $mol_tree_path ) {
			return path[ path.length - 1 ]
		}

		prop_arg( path : $mol_tree_path ) {
			return { path : path.join( ',' ) }
		}
		
		@ $mol_mem_key
		prop( path : $mol_tree_path , next? : $mol_tree ) {
			const props = this.props_all( this.class_name_self() )
			let prop = props.select( path[0] ).sub[0] || new $mol_tree({ type : String( path[0] ) })
			if( next ) {
				prop = prop.insert( next , ... path.slice(1) )
				this.class_self( this.class_self().insert( prop , 0 , path[0] ) )
				this.props_all( this.class_name_self() , undefined , $mol_atom_force_cache )
			}
			return prop.select( ... path.slice(1) ).sub[0]
		}
		
		@ $mol_mem_key
		prop_self( path : $mol_tree_path ) {
			return this.class_self().select( null , ... path ).sub[0]
		}
		
		@ $mol_mem_key
		prop_type( path : $mol_tree_path ) {
			const prop = this.prop( path )
			return ( prop && prop.type !== '-' ) ? $mol_view_tree_value_type( prop ) : undefined
		}

		@ $mol_mem_key
		prop_key( path : $mol_tree_path , next? : string ) {
			return $mol_view_tree_prop_key( this.prop( path.slice( 0 , path.length - 1 ) ) )
		}

		@ $mol_mem_key
		prop_next( path : $mol_tree_path , next? : string ) {
			return $mol_view_tree_prop_next( this.prop( path.slice( 0 , path.length - 1 ) ) )
		}

		@ $mol_mem_key
		prop_default( path : $mol_tree_path , next? : $mol_tree ) {
			return this.prop( path , next )
		}

		path( next? : $mol_tree_path ) : $mol_tree_path {
			const str = $mol_state_arg.value( this.state_key( 'path' ) , next && next.join( ',' ) )
			return ( str == null ) ? null : ( str ? str.split( ',' ) : [] )
		}
		
		@ $mol_mem
		view_options() {
			return Object.keys( $ ).filter( name => {
				if( name.length < 2 ) return false
				if( name[0] !== '$' ) return false
				
				const val = $[ name ]
				if( typeof val !== 'function' ) return false
				if(!( val.prototype instanceof $mol_object )) return false
				
				return true
			} )
		}
		
		@ $mol_mem
		prop_options() {
			return this.props_all( this.class_name_self() ).sub.map( prop => prop.type )
		}

		@ $mol_mem
		overrided_all( next? : { [ key : string ] : any } ) {
			return next || {}
		}

		overrided( key : string , next? : any ) : any {
			return this.overrided_all( ( next === undefined ) ? undefined : { ... this.overrided_all() , [ key ] : next } )[ key ]
		}
		
		@ $mol_mem_key
		prop_value_base( path : $mol_tree_path , next? : any ) : any {
			const path2 = path.slice()
			
			while( path2[ path2.length - 1 ] === null ) path2.pop()

			const element = this.Element([])
			const field = String( path2.shift() ).replace( /[?!].*/ , '' )
			
			let val = element[ field ] && element[ field ][ '$mol_app_studio_original' ]
			if( typeof val === 'function' ) {
				val = val.call( element , next )
				while( val && path2.length ) {
					const field = path2.shift()
					if( field === null ) continue
					val = val[ field ]
				}
			}

			return val
		}

		prop_class( path : $mol_tree_path , next? : string ) : string {
			if( path.length === 0 ) return this.class_name_self()
			
			const over = this.overrided( `prop_class(${ JSON.stringify( path ) })` , next )
			if( over ) return over
			
			switch( this.prop_type( path ) ) {
				case 'get' : 
				case 'bind' : 
				case 'object' :
					const def = this.prop_default( path )
					return def && def.type
			}
			
			throw new Error( `Wrong type ${ this.prop_type( path ) }` )
		}

		prop_value_view( path : $mol_tree_path , next? : string ) : any {
			const over = this.prop_self( path )
			
			switch( this.prop_type( path ) ) {
				case 'bool' : return over && ( over.type === 'true' )
				case 'string' : return over && over.value
				case 'locale' : return over && over.sub[0].value
				case 'number' : return over && over.type
				case 'get' :
				case 'bind' : return over && this.prop_value_view([ over.sub[0].type , null ])
				case 'object' : return this.Element( path )
				case 'list' : return over && over.sub.map( ( item , index )=> this.prop_value_view([ ... path , index ]) )
				case 'dict' : return over && over.sub.reduce( ( dict , item )=> ({ ... dict , [ item.type ] : this.prop_value_view([ ... path , item.type , null ]) }) , {} )
			}

			return undefined
		}

		@ $mol_mem_key
		Element( path : $mol_tree_path ) : $mol_view {

			const prop_self = this.prop_self( path )
			const obj = ( path.length && !prop_self )
				? this.prop_value_base( path )
				: new( this.view_class( path.length === 0 ? this.class_name_base() : prop_self.type ) )
			
			if( !obj || typeof obj !== 'object' ) return obj

			const props = this.props_all( this.prop_class( path ) )
			
			for( let prop of props.sub ) {
				if( this.prop_key( [ ... path , prop.type ] ) ) continue
				
				const field = prop.type.replace( /[?!].*/ , '' )
				let value = obj[ field ]
				if( !value || value[ '$mol_app_studio_original' ] ) continue
					
				obj[ field ] = ( next? : any )=> {
					const val = this.prop_value_view([ ... path , prop.type , null ])
					if( next === undefined ) {
						if( val !== undefined ) return val
					}
					return value.call( obj , next )
				}
				obj[ field ][ '$mol_app_studio_original' ] = value
			}
			
			return obj
		}
		
		Block() {
			return this.Element([])
		}
		
		preview_title() {
			return super.preview_title() + this.Element([]).title()
		}

		crumbs() {
			return [ this.Crumb(0) , ... this.path().map( ( name , index )=> this.Crumb( index + 1 ) ) ]
		}

		crumb_title( index : number ) {
			if( index === 0 ) return this.class_name_self()
			return this.path()[ index - 1 ]
		}
		
		crumb_path( index : number ) {
			if( index === 0 ) return ''
			return this.path().slice( 0 , index ).join( ',' )
		}

		event_add( event? : Event ) {
			this.prop_add( this.prop_filter() )
		}
		
		prop_add( name : string ) {
			this.prop( [ name ] , new $mol_tree({ type : name , sub : [ new $mol_tree ] }) )
		}

		speech_enabled( next? : boolean ) {
			return this.$.$mol_speech.listening( next )
		}

		speech_filter( [ filter ] : string[] ) {
			this.prop_filter( filter )
		}

		source_show() {
			return this.$.$mol_state_arg.value( this.state_key( 'source' ) ) != null
		}

		source() {
			return '```tree\n' + this.class_self() + '```'
		}
		
	}
	
	export class $mol_app_studio_selector extends $.$mol_app_studio_selector {

		select( event? : Event ) {
			const target = ( event.target as HTMLElement ).id
			const self = this.dom_node().id

			if( target.substring( 0 , self.length ) === self ) {
				const suffix = ( event.target as HTMLElement ).id.substring( this.dom_node().id.length + 1 );
				this.path( suffix.replace( /\(.*?\)/g , '' ).split( '.' ).filter( v => v ) )
			} else {
				this.path( JSON.parse( target.replace( /^.*?Element\(/g , '' ).replace( /\).*$/g , '' ) ) )
			}

			event.preventDefault()
		}

	}

}
