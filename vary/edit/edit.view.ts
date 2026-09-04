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
			
			const schema = this.schema()
			if( schema ) return schema
			
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
		
		type_mutable() {
			return ! this.schema()
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
				... type === 'List' ? [ this.Item_expand(), this.Item_add() ] : [],
				... type === 'Tupl' ? [ this.Item_expand(), this.Field_add() ] : [],
			]
		}
		
		@ $mol_mem
		body() {
			if( !this.expanded() ) return []
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
		
		text_selection( next?: readonly number[] ): readonly number[] {
			const sel = this.selection( next === undefined ? undefined : [ '', next[0], next[1] ] )
			if( sel[0] !== '' ) return [ 0, 0 ]
			return [ sel[1], sel[2] ]
		}
		
		item_selection( index: number, next?: readonly[ path: string, begin: number, end: number ] ): readonly[ path: string, begin: number, end: number ] {
			const prefix = '/' + index
			const sel = this.selection( next === undefined ? undefined : [ prefix + next[0], next[1], next[2] ] )
			if( !sel[0].startsWith( prefix ) ) return [ '', 0, 0 ]
			return [ sel[0].slice( prefix.length ), sel[1], sel[2] ]
		}
		
		_last_drop_index = 0
		
		transfer_vary( index: number ) {
			this._last_drop_index = 0
			const data = [
				this.item_val( index ),
				this.item_key( index ),
			]
			const buf = this.Vary().pack( data )
			return 'data:application/x-vary;base64,' + $mol_base64_encode( buf )
		}
		
		item_adopt( transfer: DataTransfer ) {
			const uri = transfer!.getData( 'text/uri-list' )
			const match = uri.match( /^data:application\/x-vary;base64,(.*)$/ )
			if( !match ) return null
			const buf = $mol_base64_decode( match[1] )
			return this.Vary().take( buf )
		}
		
		type_receive( [ val, key ]: [ any, string ] ) {
			this._last_drop_index = 0
			switch( this.type() ) {
				
				case 'List': {
					this.list([ val, ... this.list() ])
					return
				}
				
				case 'Tupl': {
					const tupl = this.tupl()
					this.tupl([
						[ key, ... tupl[0] ],
						[ val, ... tupl[1] ],
					])
				}
				
			}
		}
		
		item_receive( index: number, [ val, key ]: [ any, string ] ) {
			this._last_drop_index = index
			switch( this.type() ) {
				
				case 'List': {
					const list = this.list()
					this.list([
						... list.slice( 0, index + 1 ),
						val,
						... list.slice( index + 1 ),
					])
					return
				}
				
				case 'Tupl': {
					
					const tupl = this.tupl().map( list => [ ... list ] ) as [ any[], any[] ]
					
					const pos = tupl[0].indexOf( key )
					if( pos >=0 ) {
						tupl[0].splice( pos, 1 )
						tupl[1].splice( pos, 1 )
						if( pos < index ) index--
					}
					
					this.tupl([
						[
							... tupl[0].slice( 0, index + 1 ),
							key,
							... tupl[0].slice( index + 1 ),
						],
						[
							... tupl[1].slice( 0, index + 1 ),
							val,
							... tupl[1].slice( index + 1 ),
						],
					])
					
				}
				
			}
		}
		
		item_drag_end( index: number, event: DragEvent ) {
			if( event.dataTransfer?.dropEffect !== 'move' ) return
			if( this._last_drop_index <= index ) index++
			switch( this.type() ) {
				
				case 'List': {
					let list = this.list()
					this.list([
						... list.slice( 0, index ),
						... list.slice( index + 1 ),
					])
				}
				
			}
			return
		}
		
	}
}
