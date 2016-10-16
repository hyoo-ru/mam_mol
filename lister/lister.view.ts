module $.$mol {
	export class $mol_lister extends $.$mol_lister {
		
		@ $mol_mem()
		rowOffsets() : number[] {
			var childs = this.childs()
			if( !childs ) return null
			
			let heightLimit = this.contextSub().$mol_viewer_heightLimit()
			var offset = 0
			
			var next : number[] = []
			for( let child of childs ) {
				next.push( offset )
				
				if( child instanceof $mol_viewer ) {
					offset += child.heightMinimal()
				}
				
				if( offset > heightLimit ) break
			}
			
			return next
		}
		
		@ $mol_mem_key()
		rowContext( index : number ) {
			let context = this.contextSub()
			let next = Object.create( context )
			next.$mol_viewer_heightLimit = ()=> context.$mol_viewer_heightLimit() - this.rowOffsets()[ index ]
			return next
		}
		
		@ $mol_mem()
		childsVisible() {
			var childs = this.childs()
			if( !childs ) return childs
			
			var limit = this.rowOffsets().length
			
			var next : $mol_viewer[] = []
			for( let i = 0 ; i < limit ; ++ i ) {
				const child = childs[ i ]
				if( child == null ) continue 
				if( child instanceof $mol_viewer ) {
					child.context( this.rowContext( i ) )
				}
				next.push( child )
			}
			
			return next
		}
		
		heightMinimal() {
			var height = 0
			var childs = this.childs()
			if( childs ) childs.forEach( child => {
				if( child instanceof $mol_viewer ) {
					height += child.heightMinimal()
				}
			} )
			return height
		}
		
		minHeightStyle() {
			return this.heightMinimal() + 'px'
		}
		
	}
}
