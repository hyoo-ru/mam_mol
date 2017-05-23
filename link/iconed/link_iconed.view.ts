namespace $.$mol {

	export class $mol_link_iconed extends $.$mol_link_iconed {

		icon(){
			return `http://favicon.yandex.net/favicon/${ this.host() }?color=0,0,255,0&size=32`
		}

		host(){
			const url = new URL( this.uri() )
			return url.hostname
		}

	}

}
