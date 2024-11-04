namespace $ {
	export class $mol_offline_web extends $mol_offline {
		@ $mol_mem
		static prompt() {
			this.$.$mol_offline_prompt.last()?.prompt()
		}
	}

	$.$mol_offline = $mol_offline_web
	$mol_service_plugin.$mol_offline = $.$mol_offline_web

	if (! $mol_service_ensure()) {
		new $mol_after_tick(() => $mol_offline_web.prompt())
	}
}
