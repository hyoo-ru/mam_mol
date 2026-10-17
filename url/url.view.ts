namespace $.$$ {
	/**
	 * Url input field
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_url_demo
	 */
	export class $mol_url extends $.$mol_url {
		@$mol_mem
		check() {
			const v = this.value().toLowerCase().trim()
			if (!v || v.trim().length === 0) return 'required'
			if (v.includes(' ')) return 'no_spaces'

			try {
				new URL(v)
			} catch (e) {
				const protocolMatch = /^([^/]+):\/\//.exec(v)
				if (!protocolMatch) return 'need_protocol'
				if (!/^[a-zA-Z][a-zA-Z0-9+.-]*$/.test(protocolMatch[1])) return 'invalid_protocol'
				return 'invalid_format'
			}
		}
		@$mol_mem
		valid() {
			return this.check?.() === undefined
		}
		@$mol_mem
		bid() {
			const error = this.check?.()
			if (!error) return ''
			const message = this.message()
			if (typeof message === 'string') return message
			return message[error] ?? error
		}
		@$mol_mem
		href() {
			return this.valid() ? [this.value()] : []
		}
	}
}
