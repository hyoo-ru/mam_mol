namespace $.$$ {
	export class $mol_drop extends $.$mol_drop {

		@ $mol_mem
		status( next = 'ready' as 'ready' | 'drag' ) { return next }

		_target = null as EventTarget | null

		enter( event : DragEvent ) {

			if( event.defaultPrevented ) return
			// if( !this.adopt( event.dataTransfer! ) ) return

			this.status( 'drag' )
			this._target = event.target
			
			event.dataTransfer!.dropEffect = 'move'
			event.preventDefault()
			
		}

		move( event : DragEvent ) {
			
			if( event.defaultPrevented ) return

			// if( !this.adopt( event.dataTransfer! ) ) return
			
			event.dataTransfer!.dropEffect = 'move'
			event.preventDefault()

		}

		leave( event : DragEvent ) {
			if( this._target === event.target ) {
				this.status( 'ready' )
			}
		}

		receive( transfer : unknown ) {
			return transfer as unknown
		}

		drop( event : DragEvent ) {

			if( event.defaultPrevented ) return

			event.preventDefault()

			setTimeout( ()=> this.status( 'ready' ) )
			
			const obj = this.adopt( event.dataTransfer! )
			if( !obj ) return

			this.receive( obj )

		}

	}
}
