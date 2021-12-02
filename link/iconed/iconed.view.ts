namespace $.$$ {

	export class $mol_link_iconed extends $.$mol_link_iconed {

		icon() {
			return `https://favicon.yandex.net/favicon/${ this.host() }?color=0,0,0,0&size=32&stub=1`
			// return `https://api.faviconkit.com/${ this.host() }/16`
		}

		@ $mol_mem
		host() {
			const base = this.$.$mol_state_arg.href()
			const url = new URL( this.uri() , base )
			return url.hostname
		}
		
		@ $mol_mem
		title() {
			return decodeURIComponent( this.uri().split( this.host() , 2 )[1] ).replace( /^\//, ' ' )
		}

		sub() {
			return [
				... this.host() ? [ this.Icon() ] : [],
				... this.content(),
			] as readonly any[]
		}

	}

}
