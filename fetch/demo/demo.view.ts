namespace $.$$ {
	export class $mol_fetch_demo extends $.$mol_fetch_demo {
		
		@ $mol_mem
		fetch_data(){
			const data = $mol_fetch.json(this.url())
			this.data(JSON.stringify(data, null, 2))
		}

		@ $mol_mem
		data(next?: any) {
			return next ?? ''
		}
	}
}
