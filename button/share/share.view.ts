namespace $.$$ {

	/**
	 * Button Share title() and uri() to other app
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_share_demo
	 */
	export class $mol_button_share extends $.$mol_button_share {
		
		capture() {
			return this.$.$mol_dom_context.document.body as any
		}
		
		uri() {
			return this.$.$mol_state_arg.href()
		}
		
		async click() {
			
			const title = this.title()
			const url = this.uri() ?? undefined
			const files = []
			
			let el = this.capture()
			if( el ) {
				if( el instanceof $mol_view ) el = el.dom_tree() as any
				const canvas = await $mol_dom_capture_canvas( el )
				const blob = await new Promise< Blob | null >( done => canvas.toBlob( done ) )
				const file = new File( [ blob! ], title + '.png', { type: blob!.type } )
				files.push( file )
			}
			
			await this.$.$mol_dom_context.navigator.share({ title, files, url })
			
		}
		
	}
}
