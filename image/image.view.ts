namespace $.$$ {
	export class $mol_image extends $.$mol_image {
		
		@ $mol_mem
		natural_width( next?: null | number ) {
			
			const dom = this.dom_node() as HTMLImageElement
			if( dom.naturalWidth ) return dom.naturalWidth
			
			const found = this.uri().match( /\bwidth=(\d+)/ )
			return found ? Number( found[1] ) : null! 
			
		}
		
		@ $mol_mem
		natural_height( next?: null | number ) {
			
			const dom = this.dom_node() as HTMLImageElement
			if( dom.naturalHeight ) return dom.naturalHeight
			
			const found = this.uri().match( /\bheight=(\d+)/ )
			return found ? Number( found[1] ) : null! 
			
		}
		
		load() {
			this.natural_width( null )
			this.natural_height( null )
		}
		
	}
}
