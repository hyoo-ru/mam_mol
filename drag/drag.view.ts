namespace $.$$ {
	
	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_drag_demo
	 */
	export class $mol_drag extends $.$mol_drag {

		@ $mol_mem
		status( next = 'ready' as 'ready' | 'drag' ) { return next }

		drag_start( event : DragEvent ) {

			setTimeout( ()=> this.status( 'drag' ) )

			const transfer = this.transfer()
			for( let type in transfer ) {
				event.dataTransfer!.setData( type , transfer[ type as keyof typeof transfer] )
			}

			event.dataTransfer!.setDragImage( this.image() , 0 , -32 )
			
			const effects = [] as string[]
			if( this.allow_copy() ) effects.push( 'Copy' )
			if( this.allow_link() ) effects.push( 'Link' )
			if( this.allow_move() ) effects.push( 'Move' )

			let effectAllowed = effects[0].toLowerCase() + effects.slice(1).join('')
			if( effectAllowed === 'copyLinkMove' ) effectAllowed = 'all'
			event.dataTransfer!.effectAllowed = effectAllowed as DataTransfer['effectAllowed']
			
			this.start( event )
			
		}
		
		drag_end( event : DragEvent ) {
			setTimeout( ()=> this.status( 'ready' ) )
			this.end( event )
		}

	}
}
