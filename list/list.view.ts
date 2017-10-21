namespace $.$$ {
	export class $mol_list extends $.$mol_list {
		
		sub() {
			const rows = this.rows()
			return ( rows.length === 0 ) ? [ this.Empty() ] : rows
		}
		
		@ $mol_mem
		row_offsets() : number[] {
			var sub = this.sub()
			if( !sub ) return null
			
			let heightLimit = this.$.$mol_view_visible_height()
			var offset = 0
			
			var next : number[] = []
			for( let child of sub ) {
				next.push( offset )
				
				if( child instanceof $mol_view ) {
					offset += child.minimal_height()
				}
				
				if( offset > heightLimit ) break
			}
			
			return next
		}
		
		@ $mol_mem_key
		row_context( index : number ) {
			let context = this.context()
			let next = Object.create( context )
			next.$mol_view_visible_height = ()=> {
				const limit = context.$mol_view_visible_height()
				return limit - this.row_offsets()[ index ]
			}
			return next
		}
		
		@ $mol_mem
		sub_visible() {
			var sub = this.sub()
			if( !sub ) return sub
			
			var limit = this.row_offsets().length
			
			var next : $mol_view[] = []
			for( let i = 0 ; i < limit ; ++ i ) {
				const child = sub[ i ]
				if( child == null ) continue 
				if( child instanceof $mol_view ) {
					child.$ = this.row_context( i )
				}
				next.push( child )
			}
			
			return next
		}
		
		@ $mol_mem
		minimal_height() {
			var height = 0
			var sub = this.sub()
			if( sub ) sub.forEach( child => {
				if( child instanceof $mol_view ) {
					height += child.minimal_height()
				}
			} )
			return height
		}

	}
}
