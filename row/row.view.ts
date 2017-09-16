namespace $.$$ {
	export class $mol_row extends $.$mol_row {
		
		@ $mol_mem
		item_offsets_top() : number[] {
			let next : number[] = []
			
			let sub = this.sub()
			if( !sub ) return next
			
			const context = this.context_sub()
			const widthLimit = context.$mol_view_visible_width()
			
			let allHeight = 0
			let rowWidth = 0
			let row_height = 0
			
			for( let child of sub ) {
				next.push( allHeight )
				
				if(!( child instanceof $mol_view )) continue
				
				const width = child.minimal_width()
				const height = child.minimal_height()
				
				rowWidth += width
				if( rowWidth > widthLimit ) {
					allHeight += row_height
					rowWidth = width
					row_height = height
				} else {
					row_height = Math.max( row_height , height )
				}
			}
			
			next.push( allHeight + row_height )
			
			return next
		}
		
		sub_visible() {
			const sub = this.sub()
			const visible = [] as typeof sub

			const context = this.context_sub()
			const heightLimit = context.$mol_view_visible_height()
			const offsets = this.item_offsets_top()

			let height = 0

			for( let i = 0 ; i < offsets.length - 1 ; ++i ) {
				if( offsets[ i ] > heightLimit ) break

				const child = sub[ i ]

				if( child instanceof $mol_view ) {
					child.context( context )
				}

				visible.push( child )
			}

			return visible
		}
		
		minimal_height() {
			const offsets = this.item_offsets_top()
			return offsets[ offsets.length - 1 ]
		}
		
	} 
}
