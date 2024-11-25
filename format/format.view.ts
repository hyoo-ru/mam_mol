namespace $.$$ {
	/**
	 * Formatted string input/output
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_format_demo
	 */
	export class $mol_format extends $.$mol_format {
		
		@ $mol_mem
		selection( [ from, to ] = [ 0, 0 ] ): number[] {
			
			const prev = $mol_wire_probe( ()=> this.selection() )
			if( !prev ) return [ 0, 100 ]
			
			if( from !== to ) return [ from, to ]
				
			const allow = this.allow()
			const value = this.value_changed()
			const filtered = [ ... value ].filter( letter => allow.includes( letter ) ).join( '' )
			const mask = this.mask( filtered )
			
			if( ( prev?.[0] ?? 0 ) >= from ) return [ from, to ]

			const lastAllow = (
				value.length - [ ... value ].reverse().findIndex( letter => allow.includes( letter ) )
			) % ( value.length + 1 )

			if( lastAllow < from ) {
				from = to = lastAllow
			}
		
			while( mask[ from ] && mask[ from ] !== '_' ) {
				++ from
				++ to
			}

			return [ from, to ]
		}
		
		@ $mol_mem
		value_changed( next?: string ) {
			
			const allow = this.allow()

			const normalize = ( val: string )=> {
				val = [ ... val ].filter( letter => allow.includes( letter ) ).join( '' )
				const letters = [ ... val ].reverse()
				return this.mask( val ).replace( /_/gu, ()=> letters.pop() ?? '_' ) + letters.reverse().join('')
			}
			
			if( next !== undefined ) {
				
				next = normalize( next )
				
				if( [ ... next ].filter( letter => allow.includes( letter ) ).join( '' ) ) {
					if( next.includes( '_' ) ) return next
				} else {
					next = ''
				}
				
			}
			
			return normalize( this.value( next ) )
			
		}
		
	}
}
