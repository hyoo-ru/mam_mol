namespace $.$$ {
	export class $mol_select_list extends $.$mol_select_list {

		value( val? : string[] ) {
			return super.value( val ) as readonly string[]
		}

		pick( key : string ) {
			if( !key ) return ''
			
			this.value([ ... this.value() , key ])
			
			$mol_fiber_defer(()=> {
				if( !this.pick_enabled() ) return
				this.Pick().Trigger().focused( true )
				this.Pick().open()
			})
			
			return ''
		}

		@ $mol_mem
		options() {
			return Object.keys( this.dictionary() ) as readonly string[]
		}

		@ $mol_mem
		options_pickable() : readonly string[] {
			
			if( !this.enabled() ) return []
			
			const exists = new Set( this.value() )
			return this.options().filter( key => !exists.has( key ) )
			
		}

		option_title( key : string ) {
			const value = this.dictionary()[ key ] as string
			return value == null ? key : value
		}
		
		badge_title( index: number ) {
			return this.option_title( this.value()[ index ] )
		}
		
		@ $mol_mem
		pick_enabled() {
			return this.options_pickable().length > 0
		}

		@ $mol_mem
		sub() {
			return [
				... this.value().map( ( _, index )=> this.Badge( index ) ),
				this.Pick(),
			]
		}

		@ $mol_mem
		title() {
			return this.value().map( key => this.option_title( key ) ).join( ' + ' )
		}

		remove( index: number ) {
			const value = this.value()
			this.value([
				... value.slice( 0 , index ),
				... value.slice( index + 1 ),
			])
		}

	}
}
