namespace $ {

	export class $mol_after_frame extends $mol_object2 {

		id : any

		constructor(
			public task : ()=> void ,
		) {
			super()
			this.id = requestAnimationFrame( task )
		}

		destructor() {
			cancelAnimationFrame( this.id )
		}

	}
	
}
