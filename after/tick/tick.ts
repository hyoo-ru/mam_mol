namespace $ {

	export class $mol_after_tick extends $mol_object2 {

		promise : any
		cancelled = false

		constructor(
			public task : ()=> void ,
		) {
			super()
			this.promise = Promise.resolve().then( ()=> {
				if( this.cancelled ) return
				task()
			} )
		}

		destructor() {
			this.cancelled = true
		}

	}
	
}
