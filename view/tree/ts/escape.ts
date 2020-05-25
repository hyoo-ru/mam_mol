namespace $ {
	export function $mol_view_tree_ts_escape(prop: $mol_tree) {
		let escaped = JSON.stringify(prop.data)
		escaped = escaped.substring(1, escaped.length - 1)

		return escaped === prop.data ? prop : prop.make_data(escaped)
	}

	export const $mol_view_tree_ts_escape_quote = '"'

}
