namespace $ {
	export function $mol_view_tree2_escape(prop: $mol_tree2) {
		let escaped = JSON.stringify(prop.data)
		escaped = escaped.substring(1, escaped.length - 1)

		return escaped === prop.value ? prop : prop.data(escaped)
	}

	export const $mol_view_tree2_escape_quote = '"'

}
