namespace $.$$ {
	
	export class $mol_app_demo_main extends $.$mol_app_demo_main {

		@ $mol_mem
		description() {
			return $mol_file.relative( 'mol/readme.md' ).content() as string
		}

	}
	
}
