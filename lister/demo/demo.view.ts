module $.$mol {
	export class $mol_lister_demo extends $.$mol_lister_demo {
		
		rows() {
			var next : $mol_viewer[] = []
			for( var id = 0 ; id < 1000 ; ++id ) {
				next.push( this.rower( id ) )
			}
			return next
		}
		
		@ $mol_prop()
		rower( id : number ) {
			return new $mol_rower_demo().setup( obj => {
				obj.title = ()=> `Title #${id}`
			} )
		}
		
	}
}
