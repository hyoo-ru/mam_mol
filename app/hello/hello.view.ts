namespace $.$$ {
	const sleep = $mol_fiber_sync( (n:number)=> new Promise<number>( done => setTimeout( done , n ) ) )
	export class $mol_app_hello extends $.$mol_app_hello {
		
		@ $mol_mem
		greeting() {
			let name = this.name()
			// sleep(1000)
			$mol_fetch.text( '/mol/index.html?' + name )
			return name && `Hello, ${name}!`
		}
		
	}
}
