namespace $.$mol {
	export class $mol_app_files extends $.$mol_app_files {
		
		pages() {
			return [
				this.webdav_type( this.uri_current() ) === 'dir'
					? this.Placeholder()
					: null
				, 
				... this.webdavs().map( ( webdav ) => ( this.webdav_type( webdav.uri() ) === 'dir' )
					? this.Folder( webdav.uri() )
					: this.File( webdav.uri() )
				) ,
			]
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
		
		webdav( uri : string ) {
			return $mol_webdav.item( uri )
		}
		
		folder_row_current( uri : string ) {
			return this.webdavs().indexOf( this.webdav( uri ) ) !== -1
		}
		
		webdavs() {
			const root = this.root()
			const current = this.current()
			const webdavs = [ current ]
			
			let webdav = current
			
			while( webdav !== root) {
				webdav = webdav.parent()
				webdavs.unshift( webdav )
			}
			
			return webdavs
		}
		
		webdav_type( uri : string ) {
			const webdav = this.webdav( uri )
			if( webdav === this.root() || webdav.type() === 'dir' ) return 'dir'
			return 'file'
		}
		
		webdav_title( uri : string ) {
			const webdav = this.webdav( uri )
			if( webdav === this.root() ) return this.title_root()
			return webdav.prop( 'displayname' ) || ''
		}
		
		folder_rows( uri : string ) {
			return this.webdav( uri ).sub().map( webdav => this.Folder_row( webdav.uri() ) )
		}
		
		folder_row_arg( uri : string ) {
			return { 'current' : uri }
		}
		
		folder_row_icon( uri : string ) {
			return this.webdav_type( uri ) === 'dir' 
				? this.Icon_folder( uri ) 
				: this.Icon_file( uri )
		}
		
		folder_row_title( uri : string ) {
			return this.webdav( uri ).prop( 'displayname' )
		}
		
		file_uri( uri : string ) {
			return uri
		}
		
		file_mime( uri : string ) {
			return this.webdav( uri ).prop( 'getcontenttype' )
		}
		
		title() {
			return this.webdav_title( this.uri_current() )
		}
		
		page_tools( uri : string ) {
			return uri === this.uri_root()
				? this.tools_root()
				: [ this.Close( uri ) ]
		}
		
		close_arg( uri : string ) {
			return { 'current' : this.webdav( uri ).parent().uri() }
		}
		
	}
}
