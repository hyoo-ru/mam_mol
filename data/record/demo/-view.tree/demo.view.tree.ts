namespace $ {
	export class $mol_data_record_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const Person = $mol_data_record({
		 * 	\	name: $mol_data_string,
		 * 	\	age: $mol_data_integer,
		 * 	\})
		 * 	\const person = Person({ name: 'jin', age: 100 }) // ✅
		 * 	\
		 * 	\Person({ name: 'jin' }) // ❌ ["age"] undefined is not a number
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const Person = $mol_data_record({\n\tname: $mol_data_string,\n\tage: $mol_data_integer,\n})\nconst person = Person({ name: 'jin', age: 100 }) // ✅\n\nPerson({ name: 'jin' }) // ❌ [\"age\"] undefined is not a number"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Assert
		 * 	\Type/Record
		 * ```
		 */
		aspects() {
			return [
				"Assert",
				"Type/Record"
			] as readonly any[]
		}
	}
	
}

