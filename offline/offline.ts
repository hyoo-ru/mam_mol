namespace $ {

	export class $mol_offline extends $mol_worker_service_plugin {
		constructor() {
			super()
			this.$.$mol_dom_context.addEventListener('message', e => {
				if (e.data === 'mol_build_obsolete') this.value('ignore_cache', true)
			})
		}

		override defaults() {
			return {
				ignore_cache: false,
				blocked_urls: [
					'//cse.google.com/adsense/search/async-ads.js'
				]
			}
		}
	}

}
