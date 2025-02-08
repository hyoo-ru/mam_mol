namespace $ {
	// https://web.dev/learn/pwa/installation-prompt
	interface BeforeInstallEvent extends Event {
		prompt(): Promise<unknown>
		platforms: readonly string[]
		userChoise: Promise<{
			outcome: 'accepted' | 'dismissed'
		}>
	}

	export class $mol_offline_prompt extends $mol_object {
		@ $mol_mem
		protected static event() {
			const install = (event: Event) => {
				this.last(new this.$.$mol_offline_prompt(event as BeforeInstallEvent))
			}

			const win = this.$.$mol_dom_context
			win.addEventListener( 'beforeinstallprompt' , install)

			return {
				destructor: () => win.removeEventListener('beforeinstallprompt', install)
			}
		}

		@ $mol_mem
		static last(next?: $mol_offline_prompt) {
			this.event()
			return next ?? null
		}

		constructor(readonly native: BeforeInstallEvent) { super() }

		prompt() { return $mol_wire_sync(this.native).prompt() }
		choise_async() { return this.native.userChoise }
		choise() { return $mol_wire_sync(this).choise_async() }
	}

}
