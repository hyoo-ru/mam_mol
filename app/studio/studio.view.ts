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
			return this.prop_default( path ).sub.map( over => this.Prop([ ... path , over.type.replace( /[?!].*/ , '' ) ]) )
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
			return this.props_all( class_name ).select( path[ path.length - 1 ] ).sub[0] || $mol_tree.fromString( path[ path.length - 1 ] )
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
		bind_options() {
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
			const base = element[ path[ path.length - 1 ] ] && element[ path[ path.length - 1 ] ][ '$mol_app_studio_original' ]
			return base && base.call( element , next )
		}

		prop_value( path : string[] ) {
			switch( this.prop_type( path ) ) {
				case 'bool' : return this.prop_value_base( path ).toString()
				case 'object' : return this.prop_value_base( path ).constructor.toString()
				case 'get' : return this.prop_default( path ).sub[0] && this.prop_default( path ).sub[0].type
				case 'bind' : return this.prop_default( path ).sub[0].type
			}

			return this.prop_value_base( path )
		}

		prop_class( path : string[] , next? : string ) : string {
			if( path.length === 0 ) return '$' + this.block()
			if( this.Prop( path ).class() ) return this.Prop( path ).class()
			
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
					let value = this.Prop( path ).value()
					return value ? ( value == 'true' ) : undefined
				}
				case 'get' : {
					const prop = this.Prop( path ).value()
					return prop ? this.Element([])[ prop ]() : undefined
				}
				case 'object' : {
					return this.Element( path )
				}
				case 'list' : {
					if( !this.Prop( path ).rows().length ) return undefined
					return this.Prop( path ).rows().map( item => {
						switch( item.type() ) {
							case 'get' : return item.value() ? this.prop_value_view([ item.value() ]) : undefined
						}
						return item.value()
					} )
				}
			}

			return this.Prop( path ).value() || undefined
		}

		@ $mol_mem_key()
		Element( path : string[] ) : $mol_view {

			const class_name = this.prop_class( path )
			const obj = ( path.length && !this.Prop( path ).class() )
				? this.prop_value_base( path )
				: new( this.view_class( class_name ) )
			
			if( !obj || typeof obj !== 'object' ) return obj

			const props = this.props_all( class_name )
			
			for( let prop of props.sub ) {
				if( this.prop_key( [ ... path , prop.type ] ) ) continue
				
				let value = obj[ prop.type ]
				obj[ prop.type ] = ( next? : any )=> {
					const val = this.prop_value_view( [ ... path , prop.type ] )
					if( val !== undefined ) return val
					return value.call( obj , next )
				}
				obj[ prop.type ][ '$mol_app_studio_original' ] = value
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
