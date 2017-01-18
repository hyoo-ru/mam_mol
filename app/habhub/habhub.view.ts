namespace $.$mol {
	
	export interface $mol_app_habhub_gist {
		id : number
		title : string
		body : string
	}
	
	export class $mol_app_habhub extends $.$mol_app_habhub {
		
		uriSource(){
			return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions'
		}
		
		gists() {
			return $mol_http_resource_json.item<{ items : $mol_app_habhub_gist[] }>( this.uriSource() ).json().items
		}
		
		gist_rows() : $mol_view[] {
			return this.gists().map( ( gist , index ) => this.Gist_row( index ) )
		}
		
		gist_content( index : number ) {
			const gist = this.gists()[ index ]
			return `# ${ gist.title }\n${ gist.body }`
		}
		
	}
	
}
