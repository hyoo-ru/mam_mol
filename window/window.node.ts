namespace $ {
	
	export class $mol_window extends $mol_object {
		
		static size( next? : {
			width : number
			height: number
		} ) {
			return next || {
				width : 1024 ,
				height : 768 ,
			}
		}
		
	}
	
}
