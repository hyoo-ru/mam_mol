namespace $.$$ {

	export class $mol_app_files_demo extends $.$mol_app_files_demo {

		render() {
			// Ensure for webdav resource are created at server
			$mol_http.resource( this.uri_root() ).text()
			return super.render()
		}	
		
	}

}
