namespace $ {
	export function $mol_view_tree2_to_text(this: $, tree2_module: $mol_tree2) {
		const locales: $mol_view_tree2_locales = {}
		const ts_module = this.$mol_view_tree2_ts_module(tree2_module, locales)
		const plain = ts_module.hack({
			'block': ( input, belt )=> [
				input.struct( 'indent', input.hack( belt ) )
			],
			'lines': ( input, belt )=> input.hack( belt ),
			'inline': ( input, belt )=> [
				input.struct( 'line', input.hack( belt ) )
			],
			'': input => [ input ],
		})
		return ts_module.list( plain )
	}
}
