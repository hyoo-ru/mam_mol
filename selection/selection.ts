namespace $ {

	/**
	 * Plugin which makes Ctrl+A select the whole owner and copy its source text instead of the rendered part.
	 * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
	 */
	export class $mol_selection extends $mol_plugin {

		/** Source text which goes to the clipboard while the whole owner is selected. */
		text() {
			return ''
		}

		static hosts = new WeakMap< Element, $mol_selection >()

		@ $mol_mem
		static listener() {
			const doc = this.$.$mol_dom_context.document
			return [
				new $mol_dom_listener( doc, 'keydown', ( event: KeyboardEvent )=> this.keydown( event ), { passive: false } ),
				new $mol_dom_listener( doc, 'copy', ( event: ClipboardEvent )=> this.copy( event ), { passive: false } ),
			]
		}

		static keydown( event: KeyboardEvent ) {
			if( event.defaultPrevented ) return
			if( event.code !== 'KeyA' ) return
			if( !( event.ctrlKey || event.metaKey ) || event.altKey || event.shiftKey ) return
			const plugin = this.plugin()
			if( !plugin ) return
			event.preventDefault()
			plugin.select_all()
		}

		static copy( event: ClipboardEvent ) {
			const plugin = this.plugin()
			if( !plugin?.text() || !plugin.selected() ) return
			event.clipboardData?.setData( 'text/plain', plugin.text() )
			event.preventDefault()
		}

		/** Plugin of the deepest owner around the caret or the focus, null inside editable fields. */
		static plugin() {
			const doc = this.$.$mol_dom_context.document
			const active = doc.activeElement
			if( active?.matches( 'input, textarea, [contenteditable]' ) ) return null
			const selection = doc.getSelection()
			const node = selection?.rangeCount ? selection.anchorNode : null
			const anchor = ( node?.nodeType === 1 ? node as Element : node?.parentElement ) ?? active
			const host = anchor?.closest( '[mol_selection]' )
			return host && this.hosts.get( host )
		}

		override auto() {
			$mol_selection.listener()
			$mol_selection.hosts.set( this.dom_node(), this )
		}

		select_all() {
			this.$.$mol_dom_context.document.getSelection()?.selectAllChildren( this.dom_node() )
		}

		/** Whole owner is selected. */
		selected() {
			const node = this.dom_node()
			const selection = this.$.$mol_dom_context.document.getSelection()
			return selection?.anchorNode === node && selection.focusNode === node && !selection.isCollapsed
		}

	}

}
