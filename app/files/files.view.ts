namespace $.$mol {
	export class $mol_app_files extends $.$mol_app_files {
		
		pages() {
			return [
				this.webdav_type( this.current() ) === 'dir'
					? this.Placeholder()
					: null
				, 
				... this.webdavs().map( ( webdav ) => ( this.webdav_type( webdav ) === 'dir' )
					? this.Folder( webdav )
					: this.File( webdav )
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
		
		folder_row_current( webdav : $mol_webdav ) {
			return this.webdavs().indexOf( webdav ) !== -1
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
		
		webdav_type( webdav : $mol_webdav ) {
			if( webdav === this.root() || webdav.type() === 'dir' ) return 'dir'
			return 'file'
		}
		
		webdav_title( webdav: $mol_webdav ) {
			if( webdav === this.root() ) return super.title()
			return webdav.prop( 'displayname' ) || ''
		}
		
		folder_rows( folder: $mol_webdav ) {
			const webdavs = folder.sub()
			const sub = []
			
			for( let webdav of webdavs ) {
				sub.push( this.Folder_row( webdav ))
			}
			
			return sub
		}
		
		folder_row_arg( webdav : $mol_webdav ) {
			return { 'current' : webdav.uri() }
		}
		
		folder_row_icon( webdav : $mol_webdav ) {
			return this.webdav_type( webdav ) === 'dir' 
				? this.Icon_folder( webdav ) 
				: this.Icon_file( webdav )
		}
		
		folder_row_title( webdav : $mol_webdav ) {
			return webdav.prop( 'displayname' )
		}
		
		file_src( file: $mol_webdav ) {
			return file.uri()
		}
		
		file_mime( file: $mol_webdav ) {
			return file.prop( 'getcontenttype' )
		}
		
		title() {
			return this.webdav_title( this.current() )
		}
		
		Close( webdav : $mol_webdav ) {
			return webdav !== this.root()
				? super.Close( webdav )
				: null
		}
		
		close_arg( webdav : $mol_webdav ) {
			return { 'current' : webdav.parent().uri() }
		}
		
	}
}
