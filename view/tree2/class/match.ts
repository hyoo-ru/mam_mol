namespace $ {
	const class_regex = /^[$A-Z][$\w<>\[\]()"'?|]+$/

	export function $mol_view_tree2_class_match(klass?: $mol_tree2) {
		if (! klass?.type) return false
		if (klass.type === 'NaN' || klass.type === 'Infinity') return false

		return class_regex.test(klass.type)
	}
}
