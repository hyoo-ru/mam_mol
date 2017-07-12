namespace $.$mol {

	export class $mol_app_files_demo extends $.$mol_app_files_demo {

		@ $mol_mem_key()
		folder_rows( uri : string ) {
			
			// Ensure for webdav resource are created at server
			$mol_http.resource( this.uri_root() ).text()

			return super.folder_rows( uri )
		}	
		
	}

}
