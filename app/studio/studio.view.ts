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
			const props_all : { [ name : string ] : $mol_tree } = {}
			
			while( name ) {
				const props = this.props_self( name )
				for( let prop of props.sub ) props_all[ prop.type ] = props_all[ prop.type ] || prop
				name = this.registry().select( name , 'super' , '' ).value
			}
			
			return this.registry().clone({ sub : Object.keys( props_all ).map( name => props_all[ name ] ) })
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			const path = this.path()
			return this.props_all( this.element_class( path ) ).sub
			.filter( prop => !prop.select( 'key' ).sub[0].value )
			.map( prop => this.Prop([ ... path , prop.type ]) )
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
			return this.props_all( class_name ).select( path[ path.length - 1 ] ).sub[0]
		}
		
		@ $mol_mem_key()
		prop_type( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'type' ).sub[0].value
		}

		@ $mol_mem_key()
		prop_key( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'key' ).sub[0].value
		}

		@ $mol_mem_key()
		prop_next( path : string[] , next? : string ) {
			return next || this.prop( path ).select( 'next' ).sub[0].value
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
				case 'bool' : return this.value_base( path ).toString()
				case 'object' : return this.value_base( path ).constructor.toString()
				case 'get' : return this.prop_default( path ).sub[0].type
				case 'bind' : return this.prop_default( path ).sub[0].type
			}

			return value
		}

		value_view( path : string[] , next? : string ) {
			switch( this.prop_type( path ) ) {
				case 'bool' : {
					let value = this.value_overrided( path )
					return value ? ( value == 'true' ) : undefined
				}
				case 'string' : {
					return this.value_overrided( path ) || undefined
				}
				case 'object' : {
					return this.Element( path )
				}
			}

			let value = this.value_overrided( path )
			return ( value == null ) ? undefined : value
		}

		@ $mol_mem_key()
		Element( path : string[] ) : $mol_view {

			const class_name = path.length && this.value_overrided( path ) || this.element_class( path )
			const obj = ( path.length && !this.value_overrided( path ) ) ? this.value_base( path ) : new( this.view_class( class_name ) )
			
			const props = this.props_all( class_name )
			
			for( let prop of props.sub ) {
				if( this.prop_key( [ ... path , prop.type ] ) ) continue
				
				let value = obj[ prop.type ]
				obj[ prop.type ] = ( next? : any )=> {
					const val = this.value_view( [ ... path , prop.type ] )
					if( val !== undefined ) return val
					return value.call( obj , next )
				}
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
