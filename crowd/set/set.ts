namespace $ {
	
	/** CROWD Unordered Set */
	export class $mol_crowd_set extends $mol_crowd_store {
		
		protected readonly stamps = new Map< $mol_crowd_delta_value, number >()
		
		get items() {
			const delta = this.toJSON()
			return delta.values.filter(
				( _, index )=> delta.stamps[ index ] > 0
			)
		}
		
		has( val: $mol_crowd_delta_value ) {
			return this.stamps.get( val )! > 0
		}
		
		version_item( val: $mol_crowd_delta_value ) {
			return Math.abs( this.stamps.get( val ) ?? 0 )
		}
		
		toJSON( version_min = 0 ) {
			
			const delta = $mol_crowd_delta([],[])
			
			for( const [ key, stamp ] of this.stamps ) {
				
				if( this.stamper.version_from( stamp ) <= version_min ) continue
				
				delta.values.push( key )
				delta.stamps.push( stamp )
				
			}
			
			return delta
		}
		
		add(
			key: $mol_crowd_delta_value,
		) {
			
			if( this.has( key ) ) return this
			
			this.apply( $mol_crowd_delta(
				[ key ],
				[ this.stamper.genegate() ],
			) )
			
			return this
		}
		
		remove(
			key: $mol_crowd_delta_value
		) {
			
			if( !this.has( key ) ) return this
			
			this.apply( $mol_crowd_delta(
				[ key ],
				[ - this.stamper.genegate() ],
			) )
			
			return this
		}
		
		apply(
			delta: ReturnType< typeof $mol_crowd_delta >,
		) {
			
			for( let i = 0; i < delta.values.length; ++i ) {
				
				const key = delta.values[i]
				const stamp = delta.stamps[i]
				
				const version = this.stamper.version_from( stamp )
				if( this.version_item( key ) >= version ) continue
				
				this.stamps.set( key, stamp )
				this.stamper.feed( version )
				
			}
			
			return this
		}
		
	}
	
}
