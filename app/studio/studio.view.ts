namespace $.$mol {
	
	export class $mol_app_studio extends $.$mol_app_studio {

		pages() {
			return [
				this.Preview_page() ,
				( this.path() == null ) ? null : this.Editor_page() ,
			]
		}

		@ $mol_mem()
		classes() {
			const view_tree = '$mol_view $mol_object\n\ttitle \\\n\tsub /\n\n'
			return $mol_view_tree_classes( $mol_tree.fromString( view_tree + $mol_http.resource( '-/web.view.tree' ).text() ) )
		}
		
		@ $mol_mem_key()
		class( name : string ) {
			return this.classes().select( name ).sub[0]
		}

		@ $mol_mem_key()
		props_self( name : string ) {
			const def = this.class( name )
			if( !def ) return new $mol_tree
			
			return $mol_view_tree_class_props( def )
		}
		
		@ $mol_mem_key()
		props_all( name : string , next? : $mol_tree ) {
			if( next ) return next
			
			const props_all : { [ name : string ] : $mol_tree } = {}
			
			while( name ) {
				const props = this.props_self( name )
				for( let prop of props.sub ) props_all[ prop.type ] = props_all[ prop.type ] || prop
				
				const sup = this.class( name )
				if( !sup ) break
				
				name = $mol_view_tree_super_name( sup )
			}
			
			return this.classes().clone({ type : '' , sub : Object.keys( props_all ).map( name => props_all[ name ] ) })
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			const filter = this.prop_filter().toLowerCase()
			
			const path = this.path()
			return this.props_all( this.prop_class( path ) ).sub
			.filter( prop => !$mol_view_tree_prop_key( prop ) )
			.filter( prop => $mol_view_tree_prop_name( prop ).toLowerCase().indexOf( filter ) >= 0 )
			.map( prop => this.Prop([ ... path , prop.type ]) )
		}

		prop_overs( path : string[] ) {
			return this.prop_default( path ).sub.map( over => over.type )
		}

		prop_path( path : string[] ) {
			return path
		}
		
		prop_title( path : string[] ) {
			return path[ path.length - 1 ]
		}

		prop_arg( path : string[] ) {
			return { path : path.join( ',' ) }
		}
		
		@ $mol_mem_key()
		prop( path : string[] ) {
			if( path.length > 0 ) {
				const val = $mol_view_tree_prop_value( this.prop( path.slice( 0 , path.length - 1 ) ) )
				const over = val.select( path[ path.length - 1 ] ).sub[0]
				if( over ) return over
			}

			const class_name = this.prop_class( path.slice( 0 , path.length - 1 ) )
			return this.props_all( class_name ).select( path[ path.length - 1 ] ).sub[0] || $mol_tree.fromString( path[ path.length - 1 ] + ' null' ).sub[0]
		}
		
		@ $mol_mem_key()
		prop_type( path : string[] , next? : string ) {
			return this.overrided( `prop_type(${ JSON.stringify( path ) })` , next )
			|| $mol_view_tree_value_type( $mol_view_tree_prop_value( this.prop( path ) ) )
		}

		@ $mol_mem_key()
		prop_key( path : string[] , next? : string ) {
			return this.overrided( `prop_key(${ JSON.stringify( path ) })` , next ) || $mol_view_tree_prop_key( this.prop( path ) )
		}

		@ $mol_mem_key()
		prop_next( path : string[] , next? : string ) {
			return this.overrided( `prop_next(${ JSON.stringify( path ) })` , next ) || $mol_view_tree_prop_next( this.prop( path ) )
		}

		@ $mol_mem_key()
		prop_default( path : string[] , next? : $mol_tree ) {
			return /*this.overrided( `prop_default(${ JSON.stringify( path ) })` , next ) ||*/ $mol_view_tree_prop_value( this.prop( path ) )
		}

		block( next? : string ) : string {
			return $mol_state_arg.value( this.state_key( 'block' ) , next ) || this.block_default()
		}
		
		path( next? : string[] ) : string[] {
			const str = $mol_state_arg.value( this.state_key( 'path' ) , next && next.join( ',' ) )
			return ( str == null ) ? null : ( str ? str.split( ',' ) : [] )
		}
		
		@ $mol_mem()
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
		
		@ $mol_mem()
		prop_options() {
			return this.props_all( '$' + this.block() ).sub.map( prop => prop.type )
		}

		@ $mol_mem()
		overrided_all( next? : { [ key : string ] : any } ) {
			return next || {}
		}

		overrided( key : string , next? : any ) : any {
			return this.overrided_all( ( next === undefined ) ? undefined : { ... this.overrided_all() , [ key ] : next } )[ key ]
		}
		
		@ $mol_mem_key()
		prop_value_base( path : string[] , next? : any ) : any {
			const element = this.Element( path.slice( 0 , path.length - 1 ) )
			const field = path[ path.length - 1 ].replace( /[?!].*/ , '' )
			const base = element[ field ] && element[ field ][ '$mol_app_studio_original' ]
			return base && base.call( element , next )
		}

		prop_value( path : string[] ) {
			switch( this.prop_type( path ) ) {
				case 'bool' : return this.prop_value_base( path ) && this.prop_value_base( path ).toString()
				case 'object' : return this.prop_value_base( path ).constructor.toString()
				case 'get' : 
				case 'bind' : return this.prop_default( path ).sub[0] && this.prop_default( path ).sub[0].type
			}

			return this.prop_value_base( path )
		}

		prop_bool( path : string[] , next? : boolean ) {
			const over = this.overrided( `prop_string(${ JSON.stringify( path ) })` , next )
			if( over != null ) return over
			
			return this.prop_value_base( path )
		}

		prop_number( path : string[] , next? : number ) {
			const over = this.overrided( `prop_string(${ JSON.stringify( path ) })` , next )
			if( over != null ) return over
			
			return this.prop_value_base( path )
		}

		prop_string( path : string[] , next? : string ) {
			const over = this.overrided( `prop_string(${ JSON.stringify( path ) })` , next )
			if( over != null ) return over
			
			return this.prop_value_base( path )
		}

		prop_bind( path : string[] , next? : any ) {
			const over = this.overrided( `prop_value(${ JSON.stringify( path ) })` , next )
			if( over ) return over
			
			switch( this.prop_type( path ) ) {
				case 'get' : return this.prop_default( path ).sub[0] && this.prop_default( path ).sub[0].type
				case 'bind' : return this.prop_default( path ).sub[0].type && this.prop_default( path ).sub[0].type
			}

			throw new Error( 'Wrong path for bind: ' + path.join( '.' ) )
		}

		prop_class( path : string[] , next? : string ) : string {
			if( path.length === 0 ) return '$' + this.block()
			
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

		prop_value_view( path : string[] , next? : string ) : any {
			switch( this.prop_type( path ) ) {
				case 'bool' : {
					let value = this.prop_bool( path )
					return value ? ( value == 'true' ) : undefined
				}
				case 'string' : return this.prop_string( path ) || undefined
				case 'locale' : return this.prop_string( path ) || undefined
				case 'number' : return this.prop_number( path ) || undefined
				case 'get' :
				case 'bind' : {
					const prop =  this.overrided( `prop_bind(${ JSON.stringify( path ) })` )
					return prop ? this.Element([])[ prop.replace( /[?!].*/ , '' ) ]() : undefined
				}
				case 'object' : {
					return this.Element( path )
				}
				case 'list' : {
					if( !this.Prop( path ).list_rows().length ) return undefined
					return this.Prop( path ).list_rows().map( item => {
						switch( item.type() ) {
							case 'get' : return item.bind() ? this.prop_value_view([ item.bind() ]) : undefined
							case 'string' : return item.value_string()
						}
						throw new Error( 'Unsupported item type' )
					} )
				}
			}

			return undefined
		}

		@ $mol_mem_key()
		Element( path : string[] ) : $mol_view {

			const class_name = this.prop_class( path )
			const obj = ( path.length && !this.overrided( `prop_class(${ JSON.stringify( path ) })` ) )
				? this.prop_value_base( path )
				: new( this.view_class( class_name ) )
			
			if( !obj || typeof obj !== 'object' ) return obj

			const props = this.props_all( class_name )
			
			for( let prop of props.sub ) {
				if( this.prop_key( [ ... path , prop.type ] ) ) continue
				
				const field = prop.type.replace( /[?!].*/ , '' )
				let value = obj[ field ]
				if( !value || value[ '$mol_app_studio_original' ] ) continue
					
				obj[ field ] = ( next? : any )=> {
					const val = this.prop_value_view([ ... path , prop.type ])
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
			if( index === 0 ) return '$' + this.block()
			return this.path()[ index - 1 ]
		}
		
		crumb_path( index : number ) {
			if( index === 0 ) return ''
			return this.path().slice( 0 , index ).join( ',' )
		}

		event_add( event? : Event ) {
			this.prop_add( this.prop_filter() )
			this.prop_filter('')
		}
		
		prop_add( name : string ) {
			const class_name = this.prop_class([])
			const props = this.props_all( class_name )
			const prop = new $mol_tree({ type : name , sub : $mol_tree.fromString( 'null' ).sub })
			this.props_all( class_name , props.clone({
				sub : [ prop , ... props.sub ]
			}) )
		}

		speech_enabled( next? : boolean ) {
			return this.$.$mol_speech.listening( next )
		}

		speech_filter( [ filter ] : string[] ) {
			this.prop_filter( filter )
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
