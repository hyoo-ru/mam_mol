namespace $.$$ {
	export class $mol_dump_list extends $.$mol_dump_list {
		
		@ $mol_mem
		sub() {
			return this.values().map( (_,index)=> this.Dump( index ) )
		}
		
		dump_value( index: number ) {
			return this.values()[ index ]
		}
		
		expand_all( event?: Event, blacklist = new Set ) {
			this.Dump(1).expand_all( event, blacklist )
		}
		
	}
}
