namespace $.$$ {
	export class $mol_button_demo extends $.$mol_button_demo {
		
		fail() {
			this.$.$mol_wait_timeout( 1000 )
			throw new Error( 'Demonstration Error' )
		}
		
	}
}
