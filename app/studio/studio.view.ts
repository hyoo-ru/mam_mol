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

		preview_tools() {
			return [ this.Source_link() , this.Edit() , ... this.tools_main() ]
		}

		@ $mol_mem
		classes_static() {
			const view_tree = '$mol_view $mol_object\n\ttitle \\\n\tsub /\n\tstyle *\n\tattr *\n\tevent *\n\tdom_name \\\n\n'
			const source = view_tree + $mol_fetch.text( 'web.view.tree' )
			const span = $mol_span.entire( 'web.view.tree', source.length )
			return this.$.$mol_view_tree2_classes( $mol_tree2.fromString( source, span ) )
		}
		
		@ $mol_mem
		classes( next? : $mol_tree2 ) {
			if( next ) return next
			
			return this.classes_static().insert( $mol_tree2.struct(this.class_name_base()) , this.class_name_self() , null )
		}
		
		@ $mol_mem_key
		class( name : string , next? : $mol_tree2) {
			if( next ) {
				this.classes( this.classes().insert( next , name ) )
			}
			const klass = this.classes().select( name )
			if( klass.kids.length == 0 ) return null

			return this.$.$mol_view_tree2_child(klass)
		}

		class_self( next? : $mol_tree2 ) {
			return this.class( this.class_name_self() , next )!
		}

		@ $mol_mem_key
		props_self( name : string ) {
			const def = this.class( name )
			if( !def ) return $mol_tree2.list([])
			
			return this.$.$mol_view_tree2_class_props( def )
		}
		
		@ $mol_mem_key
		props_all( name : string , next? : $mol_tree2 , force? : $mol_mem_force ) {
			if( next ) return next
			
			const props_all : { [ name : string ] : $mol_tree2 } = {}

			const collect = ( name : string )=> {

				const props = this.props_self( name )
				for( const prop of props.kids ) props_all[ prop.type ] = undefined as any
				
				const sup = this.class( name )
				if( sup ) collect( this.$.$mol_view_tree2_class_super( sup ).type )

				for( const prop of props.kids ) props_all[ prop.type ] = prop
			}

			collect( name )
			
			return this.classes().list(Object.keys( props_all ).map( name => props_all[ name ] ))
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ] as new () => $mol_view
		}

		filter_bar_items() {
			return [
				this.Filter() ,
				... this.prop_filter() ? [ this.Prop_add() ] : [] ,
			]
		}
		
		fields() {
			const path = this.path()

			return this.props_all( this.prop_class( path ) ).kids
				.filter( prop => !this.$.$mol_view_tree2_prop_key( prop ) )
				.filter( $mol_match_text( this.prop_filter() , ( prop : $mol_tree2 )=> [ this.$.$mol_view_tree2_prop_name( prop ) ] ) )
				.map( prop => this.Prop([ ... path , prop.type , null ]) )
		}

		prop_overs( path : $mol_tree2_path ) {
			return this.prop_default( path )?.kids.map( over => over.type ) ?? []
		}

		prop_path( path : $mol_tree2_path ) {
			return path
		}
		
		prop_title( path : $mol_tree2_path ) {
			return path[ path.length - 1 ]
		}

		prop_arg( path : $mol_tree2_path ) {
			return { path : path.join( ',' ) }
		}
		
		@ $mol_mem_key
		prop( path : $mol_tree2_path , next? : $mol_tree2 | null) {
			const props = this.props_all( this.class_name_self() )
			const sub = props.select( path[0] ).kids
			let prop = sub.length > 0 ? sub[0] : $mol_tree2.struct(String( path[0] ) )
			if( next ) {
				prop = prop.insert( next , ... path.slice(1) )
				this.class_self( this.class_self().insert( prop , 0 , path[0] ) )
				this.props_all( this.class_name_self() , undefined , $mol_mem_force_cache )
			}
			const kids = prop.select( ... path.slice(1) ).kids

			return kids.length > 0 ? kids[0] : null
		}
		
		@ $mol_mem_key
		prop_self( path : $mol_tree2_path ) {
			const kids = this.class_self().select( null , ... path ).kids

			return kids.length > 0 ? kids[0] : null
		}
		
		@ $mol_mem_key
		prop_type( path : $mol_tree2_path ) {
			const prop = this.prop( path )

			return ( prop && prop.type !== '-' ) ? this.$.$mol_view_tree2_value_type( prop ) : null
		}

		@ $mol_mem_key
		prop_key( path : $mol_tree2_path , next? : string ) {
			const prop = this.prop( path.slice( 0 , path.length - 1 ) )

			return prop ? this.$.$mol_view_tree2_prop_key( prop ) ?? '' : ''
		}

		@ $mol_mem_key
		prop_next( path : $mol_tree2_path , next? : string ) {
			const prop = this.prop( path.slice( 0 , path.length - 1 ) )

			return prop ? this.$.$mol_view_tree2_prop_next( prop ) ?? '' : ''
		}

		@ $mol_mem_key
		prop_default( path : $mol_tree2_path , next? : $mol_tree2 | null) {
			return this.prop( path , next )
		}

		path( next? : $mol_tree2_path ) : $mol_tree2_path {
			const str = $mol_state_arg.value( this.state_key( 'path' ) , next?.join( ',' ))
			return str?.split( ',' ) ?? []
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
			return this.props_all( this.class_name_self() ).kids.map( prop => prop.type )
		}

		@ $mol_mem
		overrided_all( next? : { [ key : string ] : any } ) {
			return next || {}
		}

		overrided( key : string , next? : any ) : any {
			return this.overrided_all( ( next === undefined ) ? undefined : { ... this.overrided_all() , [ key ] : next } )[ key ]
		}
		
		@ $mol_mem_key
		prop_value_base( path : $mol_tree2_path , next? : any ) : any {
			const path2 = path.slice()
			
			while( path2[ path2.length - 1 ] === null ) path2.pop()

			const element = this.Element([])
			const field = String( path2.shift() ).replace( /[?!].*/ , '' )
			
			let val = element[ field ] && element[ field ][ '$mol_app_studio_original' ]

			if( typeof val === 'function' ) {
				val = val.call( element , next )
				while( val && path2.length ) {
					const field = path2.shift()
					if( field == null ) continue
					val = val[ field ]
				}
			}

			return val ?? null
		}

		prop_class( path : $mol_tree2_path , next? : string ) : string {
			if( path.length === 0 ) return this.class_name_self()
			
			const over = this.overrided( `prop_class(${ JSON.stringify( path ) })` , next )
			if( over ) return over
			
			switch( this.prop_type( path ) ) {
				case 'get' : 
				case 'bind' : 
				case 'object' :
					return this.prop_default( path )?.type ?? ''
			}
			
			throw new Error( `Wrong type ${ this.prop_type( path ) }` )
		}

		prop_value_view( path : $mol_tree2_path , next? : string ) : any {
			const over = this.prop_self( path )
			
			switch( this.prop_type( path ) ) {
				case 'bool' : return over?.type === 'true'
				case 'string' : return over?.value
				case 'locale' : return over?.kids.length ? over.kids[0].value : undefined
				case 'number' : return over?.type
				case 'get' :
				case 'bind' : return over ? this.prop_value_view([ over.kids[0].type , null ]) : undefined
				case 'object' : return this.Element( path )
				case 'list' : return over?.kids.map( ( item , index )=> this.prop_value_view([ ... path , index ]) )
				case 'dict' : return over?.kids.reduce(
					( dict , item )=> ({
						... dict ,
						[ item.type ] : this.prop_value_view([
							... path ,
							item.type ,
							null
						])
					}),
					{}
				)
			}

			return null
		}

		@ $mol_mem_key
		Element( path : $mol_tree2_path ) : $mol_view {
			const prop_self = this.prop_self( path )

			const obj = ( path.length > 0 && !prop_self )
				? this.prop_value_base( path )
				: new( this.view_class( path.length === 0 || !prop_self ? this.class_name_base() : prop_self.type ) )
			
			if( !obj || typeof obj !== 'object' ) return obj

			const props = this.props_all( this.prop_class( path ) )
			
			for( let prop of props.kids ) {
				if( this.prop_key( [ ... path , prop.type ] ) ) continue
				
				const field = prop.type.replace( /[?!].*/ , '' )
				let value = obj[ field ]
				if( !value || value[ '$mol_app_studio_original' ] ) continue
					
				obj[ field ] = ( next? : any )=> {
					const val = this.prop_value_view([ ... path , prop.type , null ])
					if( next === undefined ) {
						if( val !== null ) return val
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

		event_add( event? : Event ) {
			this.prop_add( this.prop_filter() )
		}
		
		prop_add( name : string ) {
			this.prop( [ name ] , $mol_tree2.struct(name , [ new $mol_tree2_empty ]) )
		}

		speech_enabled( next? : boolean ) {
			return this.$.$mol_speech.hearing( next )
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

		select( event : Event ) {
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
