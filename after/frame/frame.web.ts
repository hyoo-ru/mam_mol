namespace $ {

	export class $mol_after_frame extends $mol_object2 {

		static _promise = null as Promise<void> | null

		static get promise() {

			if( this._promise ) return this._promise
			
			return this._promise = new Promise( done => {
				
				const complete = ()=> {
					this._promise = null
					done()
				}
				
				if( typeof requestAnimationFrame === 'function' ) {
					requestAnimationFrame( complete )
				} else {
					setTimeout( complete, 16 )
				}
				
			} )

		}

		cancelled = false
		promise!: Promise<void>

		constructor(
			public task : ()=> void ,
		) {
			super()

			this.promise = $mol_after_frame.promise.then( ()=> {
				if( this.cancelled ) return
				task()
			} )

		}

		destructor() {
			this.cancelled = true
		}

	}
	
}
