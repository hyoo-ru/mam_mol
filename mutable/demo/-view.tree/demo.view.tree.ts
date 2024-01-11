namespace $ {
	export class $mol_mutable_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const person = [{id: '10', name: 'Jhon'}, false]
		 * 	\
		 * 	\const mut = $mol_mutable(person)
		 * 	\
		 * 	\mut[1].id(v => '42')
		 * 	\mut[1].name(() => 'Dave') 
		 * 	\mut[2]((v) => !v)
		 * 	\
		 * 	\const next = mut()
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const person = [{id: '10', name: 'Jhon'}, false]\n\nconst mut = $mol_mutable(person)\n\nmut[1].id(v => '42')\nmut[1].name(() => 'Dave') \nmut[2]((v) => !v)\n\nconst next = mut()"
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Mutable
		 * 	\Array
		 * ```
		 */
		aspects() {
			return [
				"Mutable",
				"Array"
			] as readonly any[]
		}
	}
	
}

