namespace $.$$ {
	
	/**
	 * Allow user to select value from various options and displays current value.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
	 */
	export class $mol_select_list extends $.$mol_select_list {

		override value( val? : readonly string[] ) {
			return super.value( val ) as readonly string[]
		}

		@ $mol_mem
		override pick( key? : string ) {
			
			if( !key ) return ''
			this.value([ ... this.value() , key ])

			new $mol_after_frame(()=> {
				if( !this.pick_enabled() ) return
				if (this.filter_auto_clean()) this.Pick().filter_pattern( '' )
				this.Pick().Trigger().focused( true )
				this.Pick().open()
			})
			
			return ''
		}

		@ $mol_mem
		override options() {
			return Object.keys( this.dictionary() ) as readonly string[]
		}

		@ $mol_mem
		override options_pickable() : readonly string[] {
			
			if( !this.enabled() ) return []
			
			const exists = new Set( this.value() )
			return this.options().filter( key => !exists.has( key ) )
			
		}

		override option_title( key : string ) {
			const value = this.dictionary()[ key ] as string
			return value == null ? key : value
		}
		
		override badge_title( key: string ) {
			return this.option_title( key )
		}
		
		@ $mol_mem
		override pick_enabled() {
			return this.options_pickable().length > 0
		}

		override Badges() {
			return this.value()
				.map( id => this.Badge( id ) )
				.reverse()
		}

		@ $mol_mem
		override title() {
			return this.value().map( key => this.option_title( key ) ).join( ' + ' )
		}

		@ $mol_action
		override remove( key: string ) {
			this.value(this.value().filter(id => id !== key))
		}

	}
}
