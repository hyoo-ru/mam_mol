namespace $.$$ {

	export class $mol_link_iconed extends $.$mol_link_iconed {

		icon() {
			return `http://favicon.yandex.net/favicon/${ this.host() }?color=0,0,255,0&size=32`
		}

		@ $mol_mem
		host() {
			const url = new URL( this.uri() )
			return url.hostname
		}
		
		@ $mol_mem
		title() {
			return decodeURIComponent( this.uri().split( this.host() , 2 )[1] )
		}

	}

}
