namespace $.$mol {
	
	export class $mol_app_studio extends $.$mol_app_studio {

		pages() {
			return [
				this.Preview_page() ,
				( this.path() == null ) ? null : this.Editor_page() ,
			]
		}

		@ $mol_mem()
		registry() {
			const view_tree = '$mol_view $mol_object\n\ttitle \\\n\tsub /\n\n'
			return $mol_view_tree.fromString( view_tree + $mol_http.resource( '-/web.view.tree' ).text() )
		}
		
		@ $mol_mem_key()
		props_self( name : string ) {
			return this.registry().select( name , 'props' , '' )
		}
		
		@ $mol_mem_key()
		props_all( name : string ) {
			const props_all : $mol_tree[] = []
			
			while( name ) {
				const props = this.props_self( name )
				props_all.push( ... props.sub )
				name = this.registry().select( name , 'super' , '' ).value
			}
			
			return this.registry().clone({ sub : props_all })
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			const path = this.path()
			return this.props_all( this.element_class( path ) ).sub.map( prop => this.Prop([ ... path , prop.type ]) )
		}
		
		prop_controls( path : string[] ) {
			const type = this.prop_type( path )
			return [
				( type === 'any' ) ? this.Prop_type( path ) : null ,
				( type === 'boolean' ) ? this.Boolean_field( path ) : null ,
				( type === 'number' ) ? this.Number_field( path ) : null ,
				( type === 'string' ) ? this.String_field( path ) : null ,
				( type === 'localization' ) ? this.String_field( path ) : null ,
				( type === '$mol_object' ) ? this.Element_field( path ) : null ,
				//( type === 'Array' ) ? this.List_field( path ) : null ,
			]
		}
		
		prop_title( path : string[] ) {
			return path[ path.length - 1 ]
		}

		prop_path( path : string[] ) {
			return path.join( ',' )
		}
		
		@ $mol_mem_key()
		prop_type( path : string[] , next? : string ) {
			const class_name = this.element_class( path.slice( 0 , path.length - 1 ) )
			return next || this.props_all( class_name ).select( path[ path.length - 1 ] , 'type' , '' ).sub[0].value
		}
		
		value( path : string[] ) {
			switch( this.prop_type( path ) ) {
				case 'any' : return this.string_value( path ) || void null
				case 'boolean' : return $mol_maybe( this.boolean_value( path ) )[0]
				case 'number' : return this.number_value( path ) || void null
				case 'localization' : return this.string_value( path ) || void null
				case 'string' : return this.string_value( path ) || void null
				case '$mol_object' : return this.string_value( path ) ? this.Element( path ) : undefined
				case 'Array' : return null //this.Element( path ) && [ this.Element( path ) ]
				default : void null
			}
		}
		
		block( next? : string ) : string {
			return $mol_state_arg.value( this.state_key( 'block' ) , next ) || this.block_default()
		}
		
		path( next? : string[] ) {
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
				if(!( val.prototype instanceof $mol_view )) return false
				
				return true
			} )
		}
		
		@ $mol_mem_key()
		element_class( path : string[] ) : string {
			if( this.string_value( path ) ) return this.string_value( path )

			if( path.length === 0 ) return '$' + this.block()
			const parent_class = this.element_class( path.slice( 0 , path.length - 1 ) )
			return this.props_all( parent_class ).select( path[ path.length - 1 ] , 'value' , '' ).sub[0].type
		}
		
		@ $mol_mem_key()
		Element( path : string[] ) {

			const class_name = this.string_value( path ) || this.element_class( path )
			const obj = new( this.view_class( class_name ) )
			
			const props = this.props_all( class_name )
			
			for( let prop of props.sub ) {
				const value = Object.getPrototypeOf( obj )[ prop.type ]
				obj[ prop.type ] = ( ... args : any[] )=> {
					const val = this.value([ ... path , prop.type ])
					if( val != null ) return val
					
					return value && value.apply( obj , args )
				}
			}
			
			return obj
		}
		
		Block() {
			return this.Element([])
		}
		
		editor_title() {
			return [ '$' + this.block() , ... this.path() ].join(' / ')
		}
		
	}
	
}
