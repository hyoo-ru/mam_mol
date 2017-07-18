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
			if( this.value_overrided( path ) ) return this.value_overrided( path )

			if( path.length === 0 ) return '$' + this.block()
			const parent_class = this.element_class( path.slice( 0 , path.length - 1 ) )
			return this.props_all( parent_class ).select( path[ path.length - 1 ] , 'value' , '' ).sub[0].type
		}
		
		@ $mol_mem_key()
		value_base( path : string[] ) : any {
			const element = this.Element( path.slice( 0 , path.length - 1 ) )
			const base = Object.getPrototypeOf( element )[ path[ path.length - 1 ] ]
			return base.apply( element )
		}

		@ $mol_mem_key()
		value_overrided( path : string[] , next? : any ) {
			return next
		}

		value_effective( path : string[] , next? : string ) {
			let value = this.value_overrided( path , next )
			if( value !== undefined ) return value
			
			value = this.value_base( path )
			if( this.value_base( path ) instanceof $mol_object ) value = this.value_base( path ).constructor.toString()

			return value
		}

		value_view( path : string[] , next? : string ) {
			let value = this.value_overrided( path , next )
			if( value === undefined ) return this.value_base( path )

			if( this.prop_type( path ) === '$mol_object' ) return this.Element( path )

			return value
		}

		@ $mol_mem_key()
		Element( path : string[] ) : $mol_view {

			if( path.length && !this.value_overrided( path ) ) return this.value_base( path )

			const class_name = this.value_overrided( path ) || this.element_class( path )
			const obj = new( this.view_class( class_name ) )
			
			const props = this.props_all( class_name )
			
			for( let prop of props.sub ) {
				obj[ prop.type ] = ( next? : any )=> {
					return this.value_view( [ ... path , prop.type ] , next )
				}
			}
			
			return obj
		}
		
		Block() {
			return this.Element([])
		}
		
		preview_title() {
			return '$' + this.block() + ": " + this.Element([]).title()
		}

		editor_title() {
			return this.path().join(' / ')
		}
		
	}
	
}
