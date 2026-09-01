namespace $.$$ {
	export class $mol_dump_demo extends $.$mol_dump_demo {
		
		@ $mol_mem
		value() {
			return {
				undefined: undefined,
				null: null,
				boolean: true,
				number: 12.34,
				string: 'Hello world!',
				regexp: /hello (world)/,
				date: new Date,
				set: new Set< any >([ 1234, 'string' ]),
				map: new Map< any, any >([
					[ 'string', 'string' ],
					[ { foo: 1e50 }, { bar: 1e-50 } ],
				]),
				array: [ 1, 2, 3 ],
				buffer: new Uint8Array([ 1, 2, 3 ]),
			}
		}
		
	}
}
