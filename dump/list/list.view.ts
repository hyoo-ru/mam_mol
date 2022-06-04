namespace $.$$ {
	export class $mol_dump_list extends $.$mol_dump_list {
		
		@ $mol_mem
		sub() {
			return this.values().map( (_,index)=> this.Dump( index ) )
		}
		
		dump_value( index: number ) {
			return this.values()[ index ]
		}
		
	}
}
