namespace $.$$ {

	/**
	 * Dumps any JS values.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dump_demo
	 */
	export class $mol_dump_list extends $.$mol_dump_list {
		
		@ $mol_mem
		sub() {
			return this.values().map( (_,index)=> this.Dump( index ) )
		}
		
		dump_value( index: number ) {
			return this.values()[ index ]
		}
		
		expand_all( event?: Event ) {
			this.Dump(1).expanded( true )
		}
		
	}
}
