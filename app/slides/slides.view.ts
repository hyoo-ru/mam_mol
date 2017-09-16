namespace $.$$ {
	
	export class $mol_app_slides extends $.$mol_app_slides {
		
		sub() {
			if( !this.contents() ) return [ this.Loader() ]
			
			const role = this.role()
			return [
				( role === 'listener' || !role ) ? this.Listener() : null ,
				( role === 'speaker' || !role ) ? this.Speaker() : null ,
			]
		}
		
		uri_base() {
			return this.uri_slides().replace( /[^/]*$/ , '' )
		}
		
		event_load() {
			const frame = this.Loader().dom_node() as HTMLIFrameElement
			frame.contentWindow.postMessage( [ 'content' ] , '*' )
			window.onmessage = event => {
				if( event.data[ 0 ] !== 'done' ) return
				window.onmessage = null
				
				this.contents( event.data[ 1 ] )
			}
		}
		
		@ $mol_mem
		content_pages() {
			const contents = this.contents().split( /^(?=#)/mg ) as string[]
			
			const pages = contents
			.map( content => {
				return {
					title : content.replace( /[^]*?^#*([^]*?)$(\r?\n?)*[^]*/mg , '$1' ) ,
					speaker : content.replace( /^(?!>)[^]*?$(\r?\n?)*/mg , '' ) ,
					listener : content.replace( /^[>#][^]*?$(\r?\n?)*/mg , '' ) ,
				}
			} )
			.filter( page => page.speaker || page.listener )
			
			return pages
		}
		
		title() {
			const page = this.content_pages()[ this.slide() ]
			if( !page ) return super.title()
			
			return page.title
		}
		
		speaker_content() {
			return this.content_pages()[ this.slide() ].speaker
		}
		
		listener_content() {
			return this.content_pages()[ this.slide() ].listener
		}
		
		slide_local( uri : string , next : number ) {
			return $mol_state_local.value( this.state_key( `slide_local(${ JSON.stringify( uri ) })` ) , next ) || 0
		}
		
		slide( next? : number ) {
			const count = this.content_pages().length
			
			if( next >= count ) next = 0
			if( next < 0 ) next = count - 1
			
			let str = ( next === undefined ) ? undefined : String( next )
			
			str = $mol_state_arg.value( this.state_key( 'slide' ) , str ) || undefined
			
			return this.slide_local( this.uri_slides() , str && Number( str ) ) || 0
		}
		
		role( next? : 'speaker' | 'listener' ) {
			return $mol_state_arg.value( this.state_key( 'role' ) , next )
		}
		
		uri_slides() {
			return $mol_state_arg.value( this.state_key( 'slides' ) ) || this.uri_slides_default()
		}
		
		event_next( next? : Event ) {
			this.slide( this.slide() + 1 )
		}
		
		event_prev( next? : Event ) {
			this.slide( this.slide() - 1 )
		}
		
		event_start( next? : Event ) {
			this.slide( 0 )
		}
		
		event_end( next? : Event ) {
			this.slide( -1 )
		}
		
		event_slide( [ numb ] : [ string ] ) {
			this.slide( Number( numb ) )
		}
		
		event_about( [ topic ] : [ string ] ) {
			let matcher = topic
			const pages = this.content_pages()
			
			while( matcher.length > 2 ) {
				
				for( let i = 0 ; i < pages.length ; ++i ) {
					if( !pages[i].title.toLowerCase().match( matcher ) ) continue
					
					this.slide( i )
					return
				}
				
				matcher = matcher.substring( 0 , matcher.length - 1 )
			}
		}
		
		speech_enabled( next? : boolean ) {
			return $mol_speech.listening( next )
		}
		
		@ $mol_mem
		timings() {
			return this.content_pages().map( page => page.speaker.length )
		}
		
		@ $mol_mem
		timing_total() {
			return this.timings().reduce( ( a , b )=> a + b , 0 )
		}
		
		@ $mol_mem
		progress() {
			const timing = this.timings().slice( 0 , this.slide() ).reduce( ( a , b )=> a + b , 0 )
			return timing / this.timing_total()
		}
		
	}
	
}
