namespace $ {
	
	export class $mol_file_web extends $mol_file_webdav {

		static override base = $mol_dom_context.document?.currentScript
			? new URL( '.' , ($mol_dom_context.document.currentScript as any)['src'] ).toString()
			: ''

	}

	$.$mol_file = $mol_file_web
}
