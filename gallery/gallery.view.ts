namespace $.$$ {
	/**
	 * Gallery with file upload support.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
	 */
	export class $mol_gallery extends $.$mol_gallery {

		attach_new( files: File[] ) {
			this.items([
				... this.items(),
				... files.map( file => URL.createObjectURL( file ) ),
			])
		}

		item_uri( index: number ) {
			return this.items()[ index ]
		}

		item_drop( index: number, event?: Event ) {
			const items = this.items()
			this.items([
				... items.slice( 0, index ),
				... items.slice( index + 1 ),
			])
		}
		
		@ $mol_mem
		content() {
			const items_views = this.items().map( (_,i) => this.Item(i) )
			if( items_views.length <= 3 ) return [ ... items_views, this.Add() ]
			return [
				this.Side(0),
				this.Side(1),
				this.Add(),
			]
		}

		@ $mol_mem_key
		side_content( id: number ) {
			const items = this.items()
			const middle = items.length % 2
				? Math.ceil( items.length / 3 )
				: items.length / 2
			const range = id
				? [ middle, items.length ]
				: [ 0, middle ]
			return items.slice( ... range ).map( (_,i) => this.Item( range[0] + i ) )
		}
		
		side_size( id: number ) {
			return String( this.side_content( id ).length )
		}
		
	}
}
