namespace $ {

	export class $mol_catcher {

		static handlers : Array< ( error : Error )=> any > | undefined

		static get active() {
			return this.handlers !== undefined
		}

		@ $mol_deprecated( 'Use $mol_fail_hidden approach.' )
		static run( task : ()=> any , fail : ( error : Error )=> any ) {
			
			if( this.handlers ) {

				this.handlers.push( fail )
				task()
				this.handlers.pop()

			} else {
				
				const handlers = this.handlers = [ fail ]
				let promise = new Promise( task ).catch( error => {
					for( const handler of handlers.reverse() ) promise = promise.catch( handler )
					throw error
				} )
				this.handlers = undefined

			}

		}

	}

}
