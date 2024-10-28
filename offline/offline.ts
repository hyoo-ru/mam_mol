namespace $ {

	export class $mol_offline extends $mol_worker_service_plugin {
		constructor() {
			super()
			this.$.$mol_dom_context.addEventListener('message', e => {
				if (e.data === 'mol_build_obsolete') this.ignore_cache(this.value('ignore_cache', true))
			})
		}

		protected ignore_cache(next?: null | boolean) {
			return this.$.$mol_state_session.value(`${this}.ignore_cache()`, next)
		}

		@ $mol_mem
		override defaults() {
			const ignore_cache = this.ignore_cache()
			this.ignore_cache(null)

			return {
				ignore_cache: ignore_cache ?? false,
				blocked_urls: [
					'//cse.google.com/adsense/search/async-ads.js'
				]
			}
		}
	}

}
