namespace $.$mol {
	
	export class $mol_app_slides extends $.$mol_app_slides {
		
		pages() {
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
			const frame = this.Loader().render() as HTMLIFrameElement
			frame.contentWindow.postMessage( [ 'content' ] , '*' )
			window.onmessage = event => {
				if( event.data[ 0 ] !== 'done' ) return
				window.onmessage = null
				
				this.contents( event.data[ 1 ].split( /^(?=#)/mg ) )
			}
		}
		
		content() {
			return this.contents()[ this.slide() ]
		}
		
		speaker_content() {
			return this.content().replace( /^(?!>)[^]*?$(\r?\n?)*/mg , '' )
		}
		
		listener_content() {
			return this.content().replace( /^[>#][^]*?$(\r?\n?)*/mg , '' )
		}
		
		slide_title() {
			return this.content().replace( /[^]*?^#*([^]*?)$(\r?\n?)*[^]*/mg , '$1' )
		}
		
		slide_local( uri : string , next : number ) {
			return $mol_state_local.value( this.state_key( `slide_local(${ JSON.stringify( uri ) })` ) , next ) || 0
		}
		
		slide( next? : number ) {
			const count = this.contents().length
			
			if( next >= count ) next = 0
			if( next < 0 ) next = count - 1
			
			let str = ( next === void null ) ? void null : String( next )
			
			str = $mol_state_arg.value( this.state_key( 'slide' ) , str ) || void null
			
			return this.slide_local( this.uri_slides() , str && Number( str ) ) || 0
		}
		
		role( next? : 'speaker' | 'listener' ) {
			return $mol_state_arg.value( this.state_key( 'role' ) , next )
		}
		
		uri_slides() {
			return $mol_state_arg.value( this.state_key( 'slides' ) ) || this.uri_slides_default()
		}
		
	}
	
}
