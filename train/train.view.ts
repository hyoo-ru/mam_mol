namespace $.$mol {
	export class $mol_train extends $.$mol_train {
		
		sub() {
			return this.trailers().map( component => this.Trailer( component ) )
		}
		
		trailer_content( component: $mol_view ) {
			return component
		}
		
	}
}
