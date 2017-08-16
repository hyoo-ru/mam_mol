namespace $.$mol {
	
	export class $mol_app_studio_field extends $.$mol_app_studio_field {

		title() {
			return this.prop_title( this.path() )
		}

		title_arg() {
			return this.prop_arg( this.path() )
		}

		type( next? : string ) {
			return this.prop_type( this.path() , next )
		}

		class( next? : string ) {
			return this.prop_class( this.path() , next )
		}

		bind( next? : string ) {
			return this.prop_bind( this.path() , next )
		}

		value_bool( next? : string ) {
			return String( this.prop_bool( this.path() , ( next === undefined ) ? undefined : next == 'true' ) )
		}

		value_number( next? : string ) {
			return this.prop_number( this.path() , next )
		}

		value_string( next? : string ) {
			return this.prop_string( this.path() , next )
		}

		overs( next? : any ) {
			return this.prop_overs( this.path() , next ).map( ( field : string )=> this.Prop([ ... this.path() , field ]) )
		}

		hint() {
			return this.prop_value( this.path() )
		}

		controls() {
			const type = this.type()
			return [
				this.title() ? super.Title() : null ,
				this.Type() ,
				( type === 'bool' ) ? this.Bool() : null ,
				( type === 'number' ) ? this.Number() : null ,
				( type === 'string' ) ? this.String() : null ,
				( type === 'locale' ) ? this.String() : null ,
				( type === 'get' ) ? this.Bind() : null ,
				( type === 'bind' ) ? this.Bind() : null ,
				( [ 'object' ].indexOf( type ) >= 0 ) ? this.Object() : null ,
				( type === 'list' ) ? this.List() : null ,
				( type === 'object' ) ? this.Overs() : null ,
				... ( [ 'get' , 'bind' ].indexOf( type ) >= 0 && this.bind() ) ? [ this.Prop([ this.Bind().value() ]) ] : [] ,
			]
		}

		@ $mol_mem_key()
		item_value( index : number , next? : string ) {
			return next
		}

		@ $mol_mem_key()
		item_class( index : number , next? : string ) {
			return next
		}

		@ $mol_mem()
		list_rows( next? : $mol_view[] ) {
			return next || [] as $mol_view[]
		}

		prop_path( path : string[] ) {
			return path
		}

		add_item( type? : string ) : string {
			if( !type ) return null
			
			const item = this.Item( this.list_rows().length )
			item.type( type )
			this.list_rows([ ... this.list_rows() , item ])

			return null
		}

		event_prop_add( event? : Event ) {
			const name = this.Bind().filter_pattern()
			this.prop_add( name )
			this.Bind().value( name )
			this.Bind().filter_pattern( '' )
		}

	}

}
