namespace $.$$ {

	export class $mol_app_files extends $.$mol_app_files {
		
		pages() {
			return [
				... this.webdavs().map( ( webdav ) => ( this.webdav_type( webdav.uri() ) === 'dir' )
					? this.Folder( webdav.uri() )
					: this.File( webdav.uri() )
				) ,
			]
		}
		
		uri_root( next?: string ) {
			return $mol_state_arg.value( this.state_key( 'root' ) , next ) || this.uri_root_default()
		}
		
		uri_current( next?: string ) {
			return $mol_state_arg.value( this.state_key( 'current' ) , next ) || super.uri_current()
		}
		
		root() {
			return $mol_webdav.item( this.uri_root() )
		}
		
		current() {
			const root = this.uri_root()
			const current = this.uri_current()

			if( current.substring( 0 , root.length ) !== root ) return this.root()

			return $mol_webdav.item( current )
		}
		
		webdav( uri : string ) {
			const webdav = $mol_webdav.item( uri )
			webdav.credentials = ()=> this.credentials()
			return webdav
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
		
		folder_row_descr( uri : string ) {
			if( this.webdav_type( uri ) !== 'file' ) return ''
			
			const size = this.file_size( uri )
			return `${ size.toLocaleString() } B`
		}
		
		file_uri( uri : string ) {
			return uri
		}
		
		file_mime( uri : string ) {
			return this.webdav( uri ).prop( 'getcontenttype' )
		}
		
		file_size( uri : string ) {
			return Number( this.webdav( uri ).prop( 'getcontentlength' ) )
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

	export class $mol_app_files_folder extends $.$mol_app_files_folder {
		
		body() {
			return [
				... this.description() ? [ this.Description() ] : [] ,
				this.Folder_rows() ,
			]
		}
		
	}
	
}
