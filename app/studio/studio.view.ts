namespace $.$mol {
	
	export type $mol_app_studio_prop_types = 'boolean' | 'number' | 'string' | '$mol_view' | 'List' | 'Dict' | 'any'
	
	export interface $mol_app_studio_prop {
		type : $mol_app_studio_prop_types
		keyed : boolean
		mutable : boolean
	}
	
	export interface $mol_app_studio_props {
		[ name : string ] : $mol_app_studio_prop
	}

	export class $mol_app_studio extends $.$mol_app_studio {
		
		@ $mol_mem()
		registry() {
			const registry : { [ name : string ] : $mol_app_studio_props } = {}

			for( let name in $ ) {
				if( typeof $[ name ] !== 'function' ) continue
				if(!( $[ name ].prototype instanceof $mol_view )) continue

				const props : $mol_app_studio_props = {}

				Object.keys( $[ name ].prototype ).forEach( prop => {
					if( prop === 'constructor' ) return
					if( typeof $[ name ].prototype[ name ] === 'function' ) return

					props[ prop ] = {
						type : 'any' ,
						keyed : false ,
						mutable : false ,
					}
				} )
				
				registry[ name ] = props
			}

			return registry
		}
		
		@ $mol_mem_key()
		props_self( name : string , next? : $mol_app_studio_props ) {
			return this.registry()[ name ]
		}
		
		@ $mol_mem_key()
		props_all( name : string ) : $mol_app_studio_props {
			let View = this.view_class( name )
			
			let props_all : $mol_app_studio_props = {}
			
			while( true ) {
				const props = this.props_self( View.toString() )
				if( !props ) break
				
				props_all = { ... props , ... props_all }
				View = Object.getPrototypeOf( View.prototype ).constructor
			}
			
			return props_all
		}
		
		props_current() {
			return this.props_all( this.Element_current().constructor.toString() )
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			const element = this.element_current()
			return Object.keys( this.props_current() ).map( prop => this.Prop({ element , prop }) )
		}
		
		prop_controls( id : { element : string , prop : string } ) {
			const type = this.prop_type( id )
			return [
				( type === 'any' ) ? this.Prop_type( id ) : null ,
				( type === 'boolean' ) ? this.Boolean_field( id ) : null ,
				( type === 'number' ) ? this.Number_field( id ) : null ,
				( type === 'string' ) ? this.String_field( id ) : null ,
				( type === '$mol_view' ) ? this.Element_field( id ) : null ,
				( type === 'List' ) ? this.List_field( id ) : null ,
			]
		}
		
		prop_title( id : { element : string , prop : string } ) {
			return id.prop
		}
		
		@ $mol_mem_key()
		prop_type( id : { element : string , prop : string } , next? : $mol_app_studio_prop_types ) {
			return next || this.props_all( this.parent() )[ id.prop ].type
		}
		
		value( id : { element : string , prop : string } ) {
			switch( this.props_all( this.Element( id.element ).constructor.toString() )[ id.prop ].type ) {
				case 'any' : return this.string_value( id ) || void null
				case 'number' : return this.number_value( id ) || void null
				case 'string' : return this.string_value( id ) || void null
				case '$mol_view' : return this.View( id )
				case 'List' : return this.View( id ) && [ this.View( id ) ]
				default : void null
			}
		}
		
		@ $mol_mem_key()
		View( id : { element : string , prop : string } ) {
			const view_name = this.string_value( id )
			if( !view_name ) return void null
			
			const View = this.view_class( view_name )
			return new View
		}
		
		parent() {
			return $mol_state_arg.value( this.state_key( 'block' ) ) || this.parent_default()
		}
		
		element_current() {
			return $mol_state_arg.value( this.state_key( 'element' ) ) || ''
		}
		
		Element_current() {
			return this.Element( this.element_current() )
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
		
		Element( element : string ) {
			if( !element ) return this.Block()
			
			const obj = this.Block()[ element ]()
			
			const props = this.props_all( obj.constructor.toString() )
			
			for( let prop in props ) {
				const value = obj[ prop ]
				
				obj[ prop ] = ()=> {
					const val = this.value({ element , prop })
					if( val !== void 0 ) return val
					
					return value && value.call( obj )
				}
			}
			
			return obj
		}
		
		@ $mol_mem()
		Block() {
			const props = this.props_all( this.parent() )
			
			const Class = this.view_class( this.parent() )
			const obj = new Class
			
			for( let prop in props ) {
				const value = obj[ prop ] 
				
				obj[ prop ] = ()=> {
					const val = this.value({ element : '' , prop })
					if( val !== void 0 ) return val
					
					return value && value.call( obj )
				}
			}
			
			return obj
		}
		
		editor_title() {
			return this.element_current() || this.parent()
		}
		
	}
	
}
