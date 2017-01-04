namespace $.$mol {
	export class $mol_rower extends $.$mol_rower {
		
		@ $mol_mem()
		itemOffsetsTop() : number[] {
			let next : number[] = []
			
			let childs = this.childs()
			if( !childs ) return next
			
			const context = this.contextSub()
			const widthLimit = context.$mol_viewer_visibleWidth()
			
			let allHeight = 0
			let rowWidth = 0
			let rowHeight = 0
			
			for( let child of childs ) {
				next.push( allHeight )
				
				if(!( child instanceof $mol_viewer )) continue
				
				const width = child.widthMinimal()
				const height = child.heightMinimal()
				
				rowWidth += width
				if( rowWidth > widthLimit ) {
					allHeight += rowHeight
					rowWidth = width
					rowHeight = height
				} else {
					rowHeight = Math.max( rowHeight , height )
				}
			}
			
			next.push( allHeight + rowHeight )
			
			return next
		}
		
		childsVisible() {
			const childs = this.childs()
			const visible = [] as typeof childs

			const context = this.contextSub()
			const heightLimit = context.$mol_viewer_visibleHeight()
			const offsets = this.itemOffsetsTop()

			let height = 0

			for( let i = 0 ; i < offsets.length - 1 ; ++i ) {
				if( offsets[ i ] > heightLimit ) break

				const child = childs[ i ]

				if( child instanceof $mol_viewer ) {
					child.context( context )
				}

				visible.push( child )
			}

			return visible
		}
		
		heightMinimal() {
			const offsets = this.itemOffsetsTop()
			return offsets[ offsets.length - 1 ]
		}
		
		minHeightStyle() {
			return this.heightMinimal() + 'px'
		}
		
	} 
}
