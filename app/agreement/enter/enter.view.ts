module $.$mol {
	export class $mol_app_agreement_enter extends $.$mol_app_agreement_enter {
		
		@ $mol_prop()
		entered( ...diff : boolean[] ) {
			return ( diff[0] === void 0 ) ? false : diff[0]
		}
		
		eventSubmit() {
			this.entered( true )
		}
		
	}
}
