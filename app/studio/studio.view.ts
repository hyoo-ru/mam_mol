namespace $.$mol {
	
	export interface $mol_app_studio_prop {
		type : 'boolean' | 'number' | 'string' | '$mol_view' | 'List' | 'Dict' | 'any'
		keyed : boolean
		mutable : boolean
	}
	
	export interface $mol_app_studio_props {
		[ name : string ] : $mol_app_studio_prop
	}

	export class $mol_app_studio extends $.$mol_app_studio {
		
		@ $mol_mem_key()
		props( name : string , next? : $mol_app_studio_props ) {
			return this.registry()[ name ]
		}
		
		@ $mol_mem_key()
		props_all( name : string ) : $mol_app_studio_props {
			let View = this.view_class( name )
			
			let props_all : $mol_app_studio_props = {}
			
			while( true ) {
				const props = this.props( View.toString() )
				if( !props ) break
				
				props_all = { ... props , ... props_all }
				View = Object.getPrototypeOf( View.prototype ).constructor
			}
			
			return props_all
		}
		
		props_self() {
			return this.props_all( this.Element().constructor.toString() )
		}
		
		view_class( name : string ) {
			if( !$[ name ] ) throw new Error( `View class not found: ${name}` )
			return $[ name ]
		}
		
		fields() {
			return Object.keys( this.props_self() ).map( name => this.Field( name ) )
		}
		
		Field( name : string ) {
			switch( this.props_self()[ name ].type ) {
				case 'string' : return this.String_field( name )
				case '$mol_view' : return this.View_field( name )
				case 'List' : return this.List_field( name )
				default : null
			}
		}
		
		property_title( name : string ) {
			return name
		}
		
		value( name : string ) {
			switch( this.props_self()[ name ].type ) {
				case 'string' : return this.string_value( name ) || void null
				case '$mol_view' : return this.View( name )
				case 'List' : return this.View( name )
				default : void null
			}
		}
		
		string_hint( name : string ) {
			return this.Block()[ name ]()
		}
		
		view_hint( name : string ) {
			return this.Block()[ name ]().constructor.toString()
		}
		
		@ $mol_mem_key()
		View( name : string ) {
			const view_name = this.string_value( name )
			if( !view_name ) return void null
			
			const View = this.view_class( view_name )
			return new View
		}
		
		parent() {
			return $mol_state_arg.value( this.state_key( 'block' ) ) || super.parent()
		}
		
		element() {
			return $mol_state_arg.value( this.state_key( 'element' ) )
		}
		
		Element() {
			const element = this.element()
			if( !element ) return this.Block()
			
			return this.Block()[ element ]()
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
		
		@ $mol_mem()
		Block() {
			const Class = this.view_class( this.parent() )
			return new Class
		}
		
		@ $mol_mem()
		Block_wrapped() {
			const props = this.props_self()
			
			const obj = this.Block()
			
			for( let name in props ) {
				const value = obj[ name ] 
				obj[ name ] = ()=> {
					const val = this.value( name )
					if( val !== void 0 ) return val
					return value && value.call( obj )
				}
			}
			
			return obj
		}
		
		editor_title() {
			return this.element() || this.parent()
		}
		
	}
	
}
