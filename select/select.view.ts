namespace $.$$ {

	/**
	 * Allow user to select value from various options and displays current value.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
	 */
	export class $mol_select extends $.$mol_select {
		
		@ $mol_mem
		filter_pattern( next? : string ) {
			this.focused()
			
			return next || ''
		}

		open() {
			this.showed( true )
		}
		
		@ $mol_mem
		options() {
			return Object.keys( this.dictionary() ) as readonly string[]
		}
		
		@ $mol_mem
		options_filtered() {
			let options = this.options()
			options = options.filter( $mol_match_text( this.filter_pattern() , ( id : string )=> [ this.option_label( id ) ] ) )

			const index = options.indexOf( this.value() )
			if( index >= 0 ) options = [ ... options.slice( 0 , index ) , ... options.slice( index + 1 ) ]
			
			return options
		}
		
		option_label( id : string ) {
			const value = this.dictionary()[ id ]
			return (value == null ? id : value) || this.option_label_default()
		}
		
		option_rows() {
			return this.options_filtered().map( ( option : string ) => this.Option_row( option ) )
		}
		
		@ $mol_mem
		option_focused( component? : $mol_view ) {
			if( component == null ) {
				for( let comp of this.nav_components() ) {
					if( comp && comp.focused() ) return comp
				}
				
				return null
			}
			
			if( this.showed() ) {
				component.focused( true )
			}
			
			return component
		}

		event_select( id : string , event? : MouseEvent ) {
			this.value( id )
			this.showed( false )
			event?.preventDefault()
		}
		
		nav_components() {
			if( this.options().length > 1 && this.Filter() ) {
				return [ this.Filter() , ... this.option_rows() ]
			} else {
				return this.option_rows()
			}
		}

		trigger_content() {
			return [
				... this.option_content( this.value() ),
				... this.trigger_enabled() ? [ this.Trigger_icon() ] : [],
			] as readonly $mol_view_content[]
		}
		
		menu_content() {
			return [
				... this.option_rows(),
				... ( this.options_filtered().length === 0 ) ? [ this.No_options() ] : []
			]
		}
		
	}
}
