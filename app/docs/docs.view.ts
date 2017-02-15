namespace $.$mol {
	export class $mol_app_docs extends $.$mol_app_docs {
		
		pages() {
			return [ 
				this.last_item().type() === 'dir'
					? this.Placeholder()
					: null, 
				...this.items() 
			]
		}
		
		title() {
			return this.root().prop( 'displayname' )
		}
		
		dir( val?: string ) {
			return $mol_state_arg.value(this.state_key( 'dir' ), val ) || ''
		}
		
		last_item() {
			return this.dir() ? $mol_webdav.item( this.dir() ) : this.root()
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
		
		items() {
			const items = []
			const item_models = this.item_models()
			
			for( let item_model of item_models ) {
				if( item_model.type() === 'dir' ) items.push( this.Folder( item_model ) )
				else items.push( this.File( item_model ) )
			}
			
			return items
		}
		
		folder_title( folder: $mol_webdav ) {
			return folder.prop( 'displayname' ) || super.title()
		}
		
		folder_rows( folder: $mol_webdav ) {
			const items = folder.sub()
			const sub = []
			
			for( let item of items ) {
				sub.push( this.Folder_row( item ))
			}
			
			return sub
		}
		
		folder_row_title( item: $mol_webdav ) {
			return item.prop( 'displayname' )
		}
		
		folder_row_click( item: $mol_webdav, event?: MouseEvent ) {
			this.dir( item.uri() )
		}
		
		folder_row_icon( item: $mol_webdav ) {
			return item.type() === 'dir' ? this.Icon_folder() : null
			
		}
		
		file_src( file: $mol_webdav ) {
			return file.uri()
		}
		
		file_name ( file: $mol_webdav ) {
			return file.prop( 'displayname' )
		}
		
		file_mime( file: $mol_webdav ) {
			return file.prop( 'getcontenttype' )
		}
		
		root() {
			return $mol_webdav.item( this.webdav_url() )
		}
	}
}
