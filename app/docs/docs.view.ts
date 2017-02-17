namespace $.$mol {
	export class $mol_app_docs extends $.$mol_app_docs {
		
		pages() {
			if( this.item_type( this.last_item() ) === 'dir' ) {
				return [ this.Placeholder(), ...this.items() ]
			}
			return this.items()
		}
		
		root() {
			return $mol_webdav.item( this.webdav_url() )
		}
		
		dir( val?: string ) {
			return $mol_state_arg.value(this.state_key( 'dir' ), val ) || this.webdav_url()
		}
		
		items() {
			return this.item_models().map( ( item_model ) => {
				if( this.item_type( item_model ) === 'dir' ) return this.Folder( item_model )
				return this.File( item_model ) 
			} )
		}
		
		item_models() {
			const root = this.root()
			const last_item = this.last_item()
			const items = [ last_item ]
			
			let current_item = last_item
			
			while( current_item !== root) {
				current_item = current_item.parent()
				items.unshift( current_item )
			}
			
			return items
		}
		
		last_item() {
			return this.dir() ? $mol_webdav.item( this.dir() ) : this.root()
		}
		
		item_type( item: $mol_webdav ) {
			if( item === this.root() || item.type() === 'dir' ) return 'dir'
			return 'file'
		}
		
		item_content( item: $mol_webdav ) {
			return this.item_type( item ) === 'dir'
				? [ this.Folder( item ) ]
				: [ this.File( item ) ]
		}
		
		item_title( item: $mol_webdav ) {
			if( item === this.root() ) return super.title()
			return item.prop( 'displayname' ) || super.title()
		}
		
		folder_rows( folder: $mol_webdav ) {
			const items = folder.sub()
			const sub = []
			
			for( let item of items ) {
				sub.push( this.Folder_row( item ))
			}
			
			return sub
		}
		
		folder_row_link( item: $mol_webdav ) {
			return { 'dir' : item.uri() }
		}
		
		folder_row_icon( item: $mol_webdav ) {
			return this.item_type( item ) === 'dir' 
				? this.Icon_folder( item ) 
				: this.Icon_file( item )
		}
		
		folder_row_title( item: $mol_webdav ) {
			return item.prop( 'displayname' )
		}
		
		file_src( file: $mol_webdav ) {
			return file.uri()
		}
		
		file_mime( file: $mol_webdav ) {
			return file.prop( 'getcontenttype' )
		}
		
		title() {
			return this.item_title( this.last_item() )
		}
		
		Close( item: $mol_webdav ) {
			return item === this.last_item() && item !== this.root()
				? super.Close( item )
				: null
		}
		
		close_link( item: $mol_webdav ) {
			return { 'dir' : item.parent().uri() }
		}
		
	}
}
