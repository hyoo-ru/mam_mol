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

		/** Element which is selected as a whole now. Resets when the selection collapses or leaves it. */
		@ $mol_mem
		static root( next?: Element | null ) {
			this.watcher()
			return next ?? null
		}

		@ $mol_mem
		static watcher() {
			const doc = this.$.$mol_dom_context.document
			return new $mol_dom_listener( doc, 'selectionchange', ()=> {
				const root = this.root()
				if( !root ) return
				const selection = doc.getSelection()
				if( selection?.rangeCount && !selection.isCollapsed && root.contains( selection.anchorNode ) ) return
				this.root( null )
			} )
		}

		static hosts = new WeakMap< Element, $mol_selection >()

		@ $mol_mem
		static listener() {
			const doc = this.$.$mol_dom_context.document
			return new $mol_dom_listener( doc, 'keydown', ( event: KeyboardEvent )=> this.keydown( event ), { passive: false } )
		}

		static keydown( event: KeyboardEvent ) {
			if( event.defaultPrevented ) return
			if( event.code !== 'KeyA' ) return
			if( !( event.ctrlKey || event.metaKey ) || event.altKey || event.shiftKey ) return
			const host = this.anchor()?.closest( '[mol_selection]' )
			const plugin = host && this.hosts.get( host )
			if( !plugin ) return
			event.preventDefault()
			plugin.select_all()
		}

		/** Element around the caret or the focus, null inside editable fields. */
		static anchor() {
			const doc = this.$.$mol_dom_context.document
			const active = doc.activeElement
			if( active?.matches( 'input, textarea, [contenteditable]' ) ) return null
			const selection = doc.getSelection()
			const node = selection?.rangeCount ? selection.anchorNode : null
			return ( node?.nodeType === 1 ? node as Element : node?.parentElement ) ?? active
		}

		override auto() {
			$mol_selection.listener()
			$mol_selection.hosts.set( this.dom_node(), this )
			this.copier()
		}

		@ $mol_mem
		copier() {
			return new $mol_dom_listener( this.dom_node(), 'copy', ( event: ClipboardEvent )=> this.copy( event ), { passive: false } )
		}

		/** Puts the source text into the clipboard instead of the rendered selection. */
		copy( event: ClipboardEvent ) {
			if( $mol_selection.root() !== this.dom_node() ) return
			const text = this.text()
			if( !text ) return
			event.clipboardData?.setData( 'text/plain', text )
			event.preventDefault()
		}

		select_all() {
			const node = this.dom_node()
			$mol_selection.root( node )
			this.$.$mol_dom_context.document.getSelection()?.selectAllChildren( node )
		}

	}

}
