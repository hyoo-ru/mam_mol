namespace $.$$ {
	export class $mol_app_hello extends $.$mol_app_hello {
		
		@ $mol_mem
		greeting() {
			let name = this.name()
			return name && `Hello, ${name}!`
		}
		
	}
}
