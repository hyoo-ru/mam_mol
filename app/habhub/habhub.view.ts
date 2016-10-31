namespace $.$mol {
	
	interface Gist {
		id : number
		title : string
		body : string
	}
	
	export class $mol_app_habhub extends $.$mol_app_habhub {
		
		uriSource(){
			return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions'
		}
		
		gists() {
			return $mol_http_resource_json.item<{ items : Gist[] }>( this.uriSource() ).json().items
		}
		
		gisters() : $mol_viewer[] {
			return this.gists().map( ( gist , index ) => this.gister( index ) )
		}
		
		gistContent( index : number ) {
			const gist = this.gists()[ index ]
			return `# ${ gist.title }\n${ gist.body }`
		}
		
	}
	
}
