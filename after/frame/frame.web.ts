namespace $ {

	export class $mol_after_frame extends $mol_object2 {

		static queue = new Set< ()=> void  >()
		static scheduled = 0

		static schedule( task : ()=> void ) {
			
			this.queue.add( task )
			
			if( this.scheduled ) return
			this.scheduled = requestAnimationFrame( ()=> this.run() )

		}

		static run() {

			this.scheduled = 0

			const promise = Promise.resolve()
			
			for( const task of this.queue ) {
				promise.then( task )
			}

			this.queue = new Set

		}

		constructor(
			public task : ()=> void ,
		) {

			super()
			
			const Frame = this.constructor as typeof $mol_after_frame
			Frame.schedule( task )
			
		}

		destructor() {
			const Frame = this.constructor as typeof $mol_after_frame
			Frame.queue.delete( this.task )
		}

	}
	
}
