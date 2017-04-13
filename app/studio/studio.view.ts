namespace $.$mol {

	export class $mol_app_studio extends $.$mol_app_studio {
		
		fields() {
			return Object.keys( this.registry()[ this.component() ] ).map( name => this.Field( name ) )
		}
		
		Field( name : string ) {
			switch( this.registry()[ this.component() ][ name ].type ) {
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
			switch( this.registry()[ this.component() ][ name ].type ) {
				case 'string' : return this.string_value( name ) || void null
				case '$mol_view' : return this.View( name )
				case 'List' : return this.View( name )
				default : void null
			}
		}
		
		@ $mol_mem_key()
		View( name : string ) {
			const Class = this.string_value( name )
			if( !Class ) return void null
			
			return new $[ Class ]
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
		Preview() {
			const props = this.registry()[ this.component() ]
			
			const Class = $[ this.component() ]
			const obj = new Class
			
			for( let name in props ) {
				const value = obj[ name ] 
				obj[ name ] = ()=> {
					const val = this.value( name )
					if( val !== void 0 ) return val
					return value.call( obj )
				}
			}
			
			return obj
		}
		
	}
	
}
