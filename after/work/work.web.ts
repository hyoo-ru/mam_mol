namespace $ {

	declare function requestIdleCallback( task : ()=> void , options? : { timeout : number } ) : any
	declare function cancelIdleCallback( id : any ) : void

	export class $mol_after_work extends $mol_object2 {

		id : any

		constructor(
			public delay : number ,
			public task : ()=> void ,
		) {
			super()
			this.id = requestIdleCallback( task , { timeout : delay } )
		}

		destructor() {
			cancelIdleCallback( this.id )
		}

	}
	
}
