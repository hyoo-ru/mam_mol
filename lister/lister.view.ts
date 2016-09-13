module $.$mol {
	export class $mol_lister extends $.$mol_lister {
		
		childsVisible() {
			var heightAvailable = this.heightAvailable()
			var childs = this.childs()
			if( !childs ) return childs
			var next : $mol_viewer[] = []
			for( var child of childs ) {
				if( child == null ) continue 
				if( child instanceof $mol_viewer ) {
					child.heightAvailable( heightAvailable )
					heightAvailable -= child.heightMinimal()
				}
				next.push( child )
				if( heightAvailable < 0 ) break
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
