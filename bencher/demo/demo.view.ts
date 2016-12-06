namespace $.$mol {
	
	export class $mol_bencher_demo extends $.$mol_bencher_demo {
		
		@ $mol_mem()
		colSort( next? : string ) {
			return next || 'mid'
		}
		
		results() {
			return {
				'bubble' : {
					'algorithm' : 'bubble' ,
					'min' : '1 ms' ,
					'mid' : '50 ms' ,
					'max' : '1000 ms' ,
				} ,
				'qsort' : {
					'algorithm' : 'qsort' ,
					'min' : '2 ms' ,
					'mid' : '5 ms' ,
					'max' : '10 ms' ,
				} ,
			}
		}
		
	}
	
}
