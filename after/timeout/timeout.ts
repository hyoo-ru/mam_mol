namespace $ {

	export class $mol_after_timeout extends $mol_object2 {

		id : any

		constructor(
			public delay : number ,
			public task : ()=> void ,
		) {
			super()
			this.id = setTimeout( task , delay )
		}

		destructor() {
			clearTimeout( this.id )
		}

	}
	
}
