namespace $ {

	export class $mol_after_frame extends $mol_after_timeout {

		constructor(
			public task : ()=> void ,
		) {
			super( 16 , task )
		}

	}
	
}
