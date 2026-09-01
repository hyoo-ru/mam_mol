namespace $.$$ {
	export class $mol_hint extends $.$mol_hint {
		
		
		@ $mol_mem
		keys_all() {
			return Object.keys( this.dictionary() )
		}
		
		@ $mol_mem
		keys_hidden( next?: string[] ) {
			return new Set( this.$.$mol_state_local.value( `${this}`, next ) ?? [] )
		}
		
		@ $mol_mem
		keys_allowed() {
			const hidden = this.keys_hidden()
			return this.keys_all().filter( key => !hidden.has( key ) )
		}
		
		@ $mol_mem
		key_picked() {
			return $mol_array_lottery( this.keys_allowed() )
		}
		
		@ $mol_mem
		title() {
			return this.dictionary()[ this.key_picked() ] ?? ''
		}
		
		@ $mol_mem
		sub() {
			return this.checked()
				? [ this.Icon(), this.title() ]
				: [ this.Icon() ]
		}
		
		@ $mol_mem
		hint() {
			return this.checked()
				? this.hint_close()
				: this.hint_open()
		}
		
		@ $mol_mem
		checked( next?: boolean ) {
			
			if( next === undefined ) return this.keys_allowed().length > 0
			
			if( next )  {
				
				if( this.keys_allowed().length === 0 ) {
					this.keys_hidden([])
				} 
				
			} else {
				
				this.keys_hidden([
					... this.keys_hidden(),
					this.key_picked(),
				])
					
			}
			
			return next
		}
		
	}
}
