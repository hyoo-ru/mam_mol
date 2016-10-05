module $.$mol {
	
	export interface $mol_app_habhub_gist {
		id : number
		title : string
		body : string
	}
	
	export class $mol_app_habhub extends $.$mol_app_habhub {
		
		gistNews() {
			const uri = 'https://api.github.com/search/issues?q=label:HabHub+label:ru+is:open&sort=reactions'
			const resource = $mol_http_resource_json.item<{ items : $mol_app_habhub_gist[] }>( uri )
			return resource.json().items
		}
		
		gisters() {
			return this.gistNews().map( ( gist , index ) => this.gister( index ) )
		}
		
		gistContent( index : number ) {
			const gist = this.gistNews()[ index ]
			return `#${gist.title}\n${gist.body}`
		}
		
	}
	
}
