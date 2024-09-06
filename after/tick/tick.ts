namespace $ {

	export class $mol_after_tick extends $mol_object2 {

		static promise = null as Promise<void> | null
		cancelled = false

		constructor(
			public task : ()=> void ,
		) {
			super()
			
			if( !$mol_after_tick.promise ) $mol_after_tick.promise = Promise.resolve().then( ()=> {
				$mol_after_tick.promise = null
			} )
			
			$mol_after_tick.promise.then( ()=> {
				if( this.cancelled ) return
				task()
			} )
			
		}

		destructor() {
			this.cancelled = true
		}

	}
	
}
