namespace $.$$ {
	export class $mol_tiler extends $.$mol_tiler {
		
		@ $mol_mem
		sub() {
			return this.groupChilds([ ])
		}
		
		@ $mol_mem_key
		groupItems( path : number[] ) : $mol_view[] {
			var items = ( path.length === 0 )
				? this.items()
				: this.groupItems( path.slice( 0 , path.length - 1 ) ) 
			if( items.length < 2  ) return items
			
			if( path.length != 0 ) {
				var cut = Math.floor( items.length / 2 )
				items = path[ path.length  -1 ]
					? items.slice( cut )
					: items.slice( 0 , cut )
			}
			
			return items
		}
		
		@ $mol_mem_key
		groupChilds( path : number[] ) {
			var items = this.groupItems( path )
			if( items.length <= 2 ) return items.map( ( _ , index )=> this.item( path.concat( index ) ) )
			return [
				this.child( path.concat( 0 ) ) ,
				this.child( path.concat( 1 ) ) ,
			]
		}
		
		@ $mol_mem_key
		child( path : number[] ) {
			return ( this.groupItems( path ).length > 1 )
				? this.group( path )
				: this.item( path )
		}
		
		@ $mol_mem_key
		group( path : number[] ) : $mol_view {
			return $mol_view.make({
				sub : () => this.groupChilds( path )
			})
		}
		
		@ $mol_mem_key
		item( path : number[] ) : $mol_view {
			return $mol_view.make({
				sub : () => this.groupItems( path )
			})
		}
		
	}
}
