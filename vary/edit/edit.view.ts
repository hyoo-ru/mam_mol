namespace $.$$ {
	export class $mol_vary_edit extends $.$mol_vary_edit {
		
		Vary() {
			return this.$.$mol_vary
		}
		
		@ $mol_mem
		type( next?: string ) {
			
			if( next !== undefined ) {
				if( next !== 'Null' ) return next
				this.value( null )
			}
			
			const val = this.value()
			if( val == null ) return 'Null'
			
			switch( typeof val ) {
				case 'boolean': return 'Bool'
				case 'bigint': return 'Bint'
				case 'number': return 'Real'
				case 'string': return 'Text'
			}
			
			if( Array.isArray( val ) ) return 'List'
			if( val instanceof Date ) return 'Date'
			
			return 'Tupl'
		}
		
		@ $mol_mem_key
		Type_icon( type: string ) {
			switch( type ) {
				case 'Bool': return this.Bool_icon()
				case 'Bint': return this.Bint_icon()
				case 'Real': return this.Real_icon()
				case 'Date': return this.Date_icon()
				case 'Text': return this.Text_icon()
				case 'List': return this.List_icon()
				case 'Tupl': return this.Tupl_icon()
			}
			return this.Null_icon()
		}
		
		@ $mol_mem
		bool( next?: boolean ) {
			return Boolean( this.value( next ) )
		}
		
		@ $mol_mem
		bint( next?: bigint ) {
			return BigInt( this.value( next ) ?? 0n )
		}
		
		@ $mol_mem
		real( next?: number ) {
			return Number( this.value( next ) )
		}
		
		@ $mol_mem
		date( next?: $mol_time_moment ) {
			return new $mol_time_moment( this.value( next?.native ) )
		}
		
		@ $mol_mem
		text( next?: string ) {
			return String( this.value( next ) ?? '' )
		}
		
		@ $mol_mem
		list( next?: readonly unknown[] ): readonly unknown[] {
			return [].concat( this.value( next ) )
		}
		
		@ $mol_mem
		tupl( next?: [ readonly string[], readonly unknown[] ] ): [ readonly string[], readonly unknown[] ] {
			let val = next ? this.Vary().rich( next[0] ?? [], next[1] ?? [ [], [] ] ) : undefined
			val = this.value( val ) ?? {}
			return this.Vary().lean( val )
		}
		
		@ $mol_mem
		head() {
			const type = this.type()
			return [
				... type === 'Bool' ? [ this.Bool() ] : [],
				... type === 'Bint' ? [ this.Bint() ] : [],
				... type === 'Real' ? [ this.Real() ] : [],
				... type === 'Date' ? [ this.Date() ] : [],
				... type === 'Text' ? [ this.Text() ] : [],
				... type === 'List' ? [ this.Item_add() ] : [],
				... type === 'Tupl' ? [ this.Field_add() ] : [],
			]
		}
		
		@ $mol_mem
		body() {
			switch( this.type() ) {
				case 'List': return this.list().map( ( _, index )=> this.Item( index ) )
				case 'Tupl': return this.tupl()[0].map( ( _, index )=> this.Item( index ) )
			}
			return []
		}
		
		@ $mol_mem_key
		item_key( index: number ) {
			switch( this.type() ) {
				case 'Tupl': return this.tupl()[0][ index ]
			}
			return index
		}
		
		@ $mol_mem_key
		item_val( index: number, next?: unknown ) {
			switch( this.type() ) {
				
				case 'List': {
					let list = this.list()
					if( next !== undefined ) list = this.list([
						... list.slice( 0, index ),
						... next === null ? [] : [ next ],
						... list.slice( index + 1 ),
					])
					return list[ index ]
				}
				
				case 'Tupl': {
					let tupl = this.tupl()
					if( next !== undefined ) tupl = this.tupl([
						[
							... tupl[0].slice( 0, index ),
							... next === null ? [] : [ tupl[0][ index ] ],
							... tupl[0].slice( index + 1 ),
						],
						[
							... tupl[1].slice( 0, index ),
							... next === null ? [] : [ next ],
							... tupl[1].slice( index + 1 ),
						],
					])
					return next === null ? null : tupl[1][ index ] ?? null
				}
				
			}
			return null
		}
		
		@ $mol_action
		item_add() {
			this.list([ undefined, ... this.list() ])
		}
		
		@ $mol_action
		field_add() {
			const tupl = this.tupl()
			this.tupl([
				[ this.Field_add().value(), ... tupl[0] ],
				[ undefined, ... tupl[1] ],
			])
			this.Field_add().value( '' )
		}
		
	}
}
