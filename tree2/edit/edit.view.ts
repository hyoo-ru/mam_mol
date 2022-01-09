namespace $.$$ {
	export class $mol_tree2_edit extends $.$mol_tree2_edit {
		
		@ $mol_mem
		self( next?: string ) {
			
			let value = this.value()
			
			if( next !== undefined ) {
				value = this.value(
					next
						? next[0] === '\\'
							? $mol_tree2.data( next.slice(1), value?.kids ?? [] )
							: $mol_tree2.struct( next, value?.kids ?? [] )
						: null
				)
			}
			
			if( !value ) return ''
			if( value.type ) return value.type
			if( value.value ) return '\\' + value.value
			return ''
			
		}
		
		@ $mol_mem
		self_suggests() {
			
			const current = this.self()
			
			return this.self_options()
			.filter(
				$mol_match_text( current, type => [ type ] )
			)
			.filter( type => type !== current )
			
		}
		
		@ $mol_mem
		self_options() {
			return [ 'foo', 'bar' ]
		}
		
		@ $mol_mem
		kids_count() {
			return this.value()?.kids.length ?? 0
		}
		
		@ $mol_mem
		kids_can_add() {
			const value = this.value()
			if( !value ) return false
			return true
		}
		
		@ $mol_mem
		kids() {
			const length = this.kids_count() + Number( this.kids_can_add() )
			return Array.from( { length }, ( _, index )=> this.Kid( index ) )
		}
		
		@ $mol_mem_key
		kid( index: number, next?: $mol_tree2 ) {
			
			let value = this.value()
			
			if( next !== undefined ) {
				value = this.value(
					value.insert( next, index )
				)
			}
			
			return value?.kids[ index ] ?? null
		}
		
	}
}
