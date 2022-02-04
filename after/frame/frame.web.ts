namespace $ {

	export class $mol_after_frame extends $mol_object2 {

		static _promise = null as Promise<void> | null
		static _timeout = null as any

		static get promise() {

			if( this._promise ) return this._promise
			
			return this._promise = new Promise( done => {
				
				const complete = ()=> {
					this._promise = null
					clearTimeout( this._timeout )
					done()
				}
				
				requestAnimationFrame( complete )
				this._timeout = setTimeout( complete, 100 )
				
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
