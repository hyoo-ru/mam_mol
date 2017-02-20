namespace $.$mol {
	export class $mol_app_docs extends $.$mol_app_docs {
		
		pages() {
			if( this.item_type( this.current() ) === 'dir' ) {
				return [ this.Placeholder(), ...this.items() ]
			}
			return this.items()
		}
		
		uri_root( next?: string ) {
			return $mol_state_arg.value( this.state_key( 'root' ) , next ) || super.uri_root()
		}
		
		uri_current( next?: string ) {
			return $mol_state_arg.value( this.state_key( 'current' ) , next ) || super.uri_current()
		}
		
		root() {
			return $mol_webdav.item( this.uri_root() )
		}
		
		current() {
			return $mol_webdav.item( this.uri_current() )
		}
		
		items() {
			return this.item_models().map( ( item_model ) => {
				if( this.item_type( item_model ) === 'dir' ) return this.Folder( item_model )
				return this.File( item_model ) 
			} )
		}
		
		folder_row_current( item : $mol_webdav ) {
			return this.item_models().indexOf( item ) !== -1
		}
		
		item_models() {
			const root = this.root()
			const current = this.current()
			const items = [ current ]
			
			let current_item = current
			
			while( current_item !== root) {
				current_item = current_item.parent()
				items.unshift( current_item )
			}
			
			return items
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
		
		folder_row_arg( item: $mol_webdav ) {
			return { 'current' : item.uri() }
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
			return this.item_title( this.current() )
		}
		
		Close( item: $mol_webdav ) {
			return item !== this.root()
				? super.Close( item )
				: null
		}
		
		close_arg( item: $mol_webdav ) {
			return { 'current' : item.parent().uri() }
		}
		
	}
}
