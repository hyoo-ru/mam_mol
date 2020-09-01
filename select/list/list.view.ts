namespace $.$$ {
	export class $mol_select_list extends $.$mol_select_list {

		value( val? : string[] ) {
			return super.value( val ) as string[]
		}

		pick( key : string ) {
			if( !key ) return
			this.value([ ... this.value() , key ])
			$mol_fiber_defer(()=> {
				this.Pick().Filter().focused( true )
				this.Pick().open()
			})
		}

		@ $mol_mem
		options() {
			return Object.keys( this.dictionary() )
		}

		@ $mol_mem
		options_pickable() {
			if( !this.enabled() ) return []
			const exists = new Set( this.value() )
			return this.options().filter( key => !exists.has( key ) )
		}

		option_title( key : string ) {
			const value = this.dictionary()[ key ] as string
			return value == null ? key : value
		}

		@ $mol_mem
		sub() {
			return [
				... this.value().map( key => this.Badge( key ) ),
				... this.options_pickable().length ? [ this.Pick() ] : [],
			]
		}

		remove( key : string ) {
			this.value( this.value().filter( val => val !== key ) )
		}

	}
}
