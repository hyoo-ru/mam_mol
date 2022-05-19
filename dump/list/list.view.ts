namespace $.$$ {
	export class $mol_dump_list extends $.$mol_dump_list {
		
		@ $mol_mem
		sub() {
			return this.values().map( (_,index)=> this.Dump( index ) )
		}
		
		@ $mol_mem_key
		dump_value( index: number ) {
			return this.values()[ index ]
		}
		
	}
}
