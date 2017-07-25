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
				( type === 'string' || type === '=>' ) ? this.String_field( path ) : null ,
				( type === 'locale' ) ? this.String_field( path ) : null ,
				( type === 'object' ) ? this.Element_field( path ) : null ,
				( type === 'get' ) ? this.Bind_field( path ) : null ,
				( type === 'bind' ) ? this.Bind_field( path ) : null ,
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
		prop( path : string[] ) {
			const class_name = this.element_class( path.slice( 0 , path.length - 1 ) )
			return this.props_all( class_name ).select( path[ path.length - 1 ] , '' )
		}
		
		@ $mol_mem_key()
		prop_type( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'type' , '' ).sub[0].value
		}

		@ $mol_mem_key()
		prop_key( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'key' , '' ).sub[0].value
		}

		@ $mol_mem_key()
		prop_next( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'next' , '' ).sub[0].value
		}

		@ $mol_mem_key()
		prop_default( path : string[] , next? : $mol_tree ) {
			return next || this.prop( path ).select( 'default' , '' ).sub[0]
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
				if(!( val.prototype instanceof $mol_object )) return false
				
				return true
			} )
		}
		
		@ $mol_mem()
		bind_options() {
			return this.props_all( '$' + this.block() ).sub.map( prop => prop.type )
		}

		@ $mol_mem_key()
		element_class( path : string[] ) : string {
			if( path.length === 0 ) return '$' + this.block()
			if( this.value_overrided( path ) ) return this.value_overrided( path )

			const parent_class = this.element_class( path.slice( 0 , path.length - 1 ) )
			return this.props_all( parent_class ).select( path[ path.length - 1 ] , 'default' , '' ).sub[0].type
		}
		
		@ $mol_mem_key()
		value_base( path : string[] , next? : any ) : any {
			const element = this.Element( path.slice( 0 , path.length - 1 ) )
			const base = Object.getPrototypeOf( element )[ path[ path.length - 1 ] ]
			return base.call( element , next )
		}

		@ $mol_mem_key()
		value_overrided( path : string[] , next? : any ) {
			this.prop_type( path )
			return next === undefined ? null : next
		}

		value_effective( path : string[] , next? : string ) {
			let value = this.value_overrided( path , next )
			if( value != null ) return value
			
			value = this.value_base( path )
			
			switch( this.prop_type( path ) ) {
				case 'boolean' : return this.value_base( path ).toString()
				case 'object' : return this.value_base( path ).constructor.toString()
				case 'get' : return this.prop_default( path ).sub[0].type
				case 'bind' : return this.prop_default( path ).sub[0].type
			}

			return value
		}

		value_view( path : string[] , next? : string ) {
			switch( this.prop_type( path ) ) {
				case 'boolean' : {
					let value = this.value_overrided( path , next )
					return value ? ( value == 'true' ) : this.value_base( path , next )
				}
				case 'string' : {
					return this.value_overrided( path , next ) || this.value_base( path , next )
				}
				case 'object' : {
					let value = this.value_overrided( path , next )
					return ( value == null ) ? this.value_base( path , next ) : this.Element( path )
				}
			}

			let value = this.value_overrided( path , next )
			return ( value == null ) ? this.value_base( path , next ) : value
		}

		@ $mol_mem_key()
		Element( path : string[] ) : $mol_view {

			const class_name = this.value_overrided( path ) || this.element_class( path )
			const obj = ( path.length && !this.value_overrided( path ) ) ? this.value_base( path ) : new( this.view_class( class_name ) )
			
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
		
		// preview_title() {
		// 	return '$' + this.block() + ": " + this.Element([]).title()
		// }

		// editor_title() {
		// 	return this.path().join(' / ')
		// }
		
	}
	
}
