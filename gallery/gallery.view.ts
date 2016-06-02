module $.$mol {
	export class $mol_gallery extends $.$mol_gallery {
		
		@ $mol_prop()
		childs() {
			return this.groupChilds([ ])
		}
		
		@ $mol_prop()
		groupItems( path : number[] ) {
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
		
		@ $mol_prop()
		groupChilds( path : number[] ) {
			var items = this.groupItems( path )
			if( items.length <= 2 ) return items.map( ( _ , index )=> this.item( path.concat( index ) ) )
			return [
				this.group( path.concat( 0 ) ) ,
				this.group( path.concat( 1 ) ) ,
			]
		}
		
		@ $mol_prop()
		group( path : number[] ) {
			return new $mol_view().setup( obj => {
				obj.childs = () => this.groupChilds( path )
			} )
		}
		
		@ $mol_prop()
		item( path : number[] ) {
			return new $mol_view().setup( obj => {
				obj.childs = () => this.groupItems( path )
			} )
		}
		
	}
}
