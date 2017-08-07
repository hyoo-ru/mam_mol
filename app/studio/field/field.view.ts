namespace $.$mol {
	
	export class $mol_app_studio_field extends $.$mol_app_studio_field {

		controls() {
			const type = this.type()
			return [
				this.title() ? super.Title() : null ,
				this.Type() ,
				( type === 'bool' ) ? this.Bool() : null ,
				( type === 'number' ) ? this.Number() : null ,
				( type === 'string' ) ? this.String() : null ,
				( type === 'locale' ) ? this.String() : null ,
				( type === 'get' ) ? this.Prop() : null ,
				( type === 'bind' ) ? this.Prop() : null ,
				( [ 'object' ].indexOf( type ) >= 0 ) ? this.Object() : null ,
				( type === 'list' ) ? this.List() : null ,
				( type === 'get' && this.Prop().value() ) ? this.Prop_inner([ this.Prop().value() ]) : null ,
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
		rows( next? : $mol_view[] ) {
			return next || [] as $mol_view[]
		}

		add_item( type? : string ) : string {
			if( !type ) return null
			
			const item = this.Item( this.rows().length )
			item.type( type )
			this.rows([ ... this.rows() , item ])

			return null
		}

		event_prop_add( event? : Event ) {
			const name = this.Prop().filter_pattern()
			this.prop_add( name )
			this.Prop().value( name )
			this.Prop().filter_pattern( '' )
		}

	}

}
