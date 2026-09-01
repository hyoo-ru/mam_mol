namespace $.$$ {
	export class $mol_drop extends $.$mol_drop {

		@ $mol_mem
		status( next = 'ready' as 'ready' | 'drag' ) { return next }

		protected _target = null as EventTarget | null

		enter( event : DragEvent ) {

			if( event.defaultPrevented ) return
			if( !this.enabled() ) return
			// if( !this.adopt( event.dataTransfer! ) ) return

			const action = this.decide_action( event )
			event.dataTransfer!.dropEffect = action
			
			if( action !== 'none' ) this.status( 'drag' )
			this._target = event.target
			
			event.preventDefault()
			
		}

		move( event : DragEvent ) {
			
			if( event.defaultPrevented ) return
			if( !this.enabled() ) return

			// if( !this.adopt( event.dataTransfer! ) ) return
			
			event.dataTransfer!.dropEffect = this.decide_action( event )
			
			event.preventDefault()

		}
		
		decide_action( event: DragEvent ) {
			const allow = this.allow()
			if( allow.includes( 'move' ) && event.shiftKey ) return 'move'
			else if( allow.includes( 'copy' ) && event.ctrlKey ) return 'copy'
			else if( allow.includes( 'link' ) && event.altKey ) return 'link'
			else return allow[0]
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
