namespace $ {
	export class $mol_view_tree2_error extends Error {
		constructor(
			message: string,
			readonly spans: readonly $mol_span[]
		) {
			super(message)
		}

		toJSON() {
			return {
				message: this.message,
				spans: this.spans
			}
		}
	}

	export class $mol_view_tree2_error_suggestions {
		constructor(
			readonly suggestions: readonly string[]
		) {}

		toString() {
			return this.suggestions.map(suggestion => `\`${suggestion}\``).join(', ')
		}

		toJSON() {
			return this.suggestions
		}
	}

	export function $mol_view_tree2_error_str(
		strings: readonly string[],
		...parts: readonly ($mol_span | readonly $mol_span[] | string | number | $mol_view_tree2_error_suggestions)[]
	) {
		const spans: $mol_span[] = []
		let suggestions: $mol_view_tree2_error_suggestions | undefined

		for (const part of parts) {
			if (part instanceof $mol_span) spans.push(part)
			if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span) spans.push(...part)
		}

		return new $mol_view_tree2_error(join(strings, parts), spans)
	}

	function join(strings: readonly string[], objects: readonly unknown[]) {
		let result = ''
		let obj_pos = 0
		let obj_len = objects.length

		for (const str of strings) {
			result += str
			if (obj_pos < obj_len) {
				const obj = objects[obj_pos++]
				if (Array.isArray(obj)) result += obj.map(item => `\`${item}\``).join(', ')
				else result += `\`${String(obj)}\``
			}
		}

		return result
	}
}
