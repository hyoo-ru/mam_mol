namespace $ {
	export class $mol_fetch_service extends $mol_service {
		protected static plugins = new Set<$mol_fetch_service>()

		protected static inited = false

		protected static override add(plugin: $mol_fetch_service) {
			this.plugins.add(plugin)
			if (! this.inited) this.$.$mol_service.add(new this)
			this.inited = true
		}

		static blocked_response() {
			return new Response(
				null,
				{
					status: 418,
					statusText: 'Blocked'
				},
			)
		}

		blocked(res: Request) { return false }
		modify(res: Request) { return null as null | Response | PromiseLike<Response> }
	}
}
