namespace $.$$ {
	export class $mol_drop extends $.$mol_drop {

		@ $mol_mem
		status( next = 'ready' as 'ready' | 'drag' ) { return next }

		enter( event : DragEvent ) {

			if( event.defaultPrevented ) return
			if( event.target !== this.dom_node() ) return
			// if( !this.adopt( event.dataTransfer! ) ) return

			setTimeout( ()=> this.status( 'drag' ) )
			
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
			
			if( event.target !== this.dom_node() ) return
			
			setTimeout( ()=> this.status( 'ready' ) )
			
		}

		receive( transfer : DataTransfer ) {
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
