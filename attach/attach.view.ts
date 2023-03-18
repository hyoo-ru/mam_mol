namespace $.$$ {

	/**
	 * Component that helps to upload files to server.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_attach_demo
	 */
	export class $mol_attach extends $.$mol_attach {

		attach_new( files: File[] ) {
			this.items([
				... this.items(),
				... files.map( file => URL.createObjectURL( file ) ),
			])
		}

		@ $mol_mem
		content() {
			return [ ... this.items().map( (_,i) => this.Item(i) ) , this.Add() ]
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
		
	}

}
