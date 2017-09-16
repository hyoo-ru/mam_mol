namespace $ {
	
	export class $mol_speech extends $mol_plugin {
		
		@ $mol_mem
		static api() {
			const API = window['SpeechRecognition'] || window['webkitSpeechRecognition'] || window['mozSpeechRecognition'] || window['msSpeechRecognition']
			
			const api = new API
			
			api.interimResults = true
			api.maxAlternatives = 1
			api.continuous = true
			api.lang = $mol_locale.lang()
			
			api.onnomatch = ( event : any )=> {
				this.text( '' )
			}
			api.onresult = ( event : any )=> {
				this.event_result( event )
			}
			api.onerror = ( event : Event & { error : string } )=> {
				console.error( new Error( event.error ) )
				this.text( '' )
				this.listening( false )
			}
			
			return api;
		}
		
		@ $mol_mem
		static listening( next? : boolean ) {
			if( next === undefined ) return false
			
			if( next ) {
				this.api().start()
			} else {
				this.api().stop()
			}
			
			return next
		}
		
		static event_result( event? : Event & { results : { transcript : string }[][] } ) {
			
			const text = [].slice.call( event.results )
			.map( ( result : any )=> {
				return result[0].transcript
			} )
			.join( '' )
			.toLowerCase()
			.trim()
			
			this.text( text )
		}
		
		@ $mol_mem
		static text( next = '' ) {
			return next
		}
		
		@ $mol_mem
		render() : null {
			const text = $mol_speech.text().replace( /[,\.]/g , '' )
			
			for( let matcher of this.matchers() ) {
				
				const found = text.match( matcher )
				if( !found ) continue
				
				new $mol_defer( ()=> this.event_catch( found.slice( 1 ).map( text => text.toLowerCase() ) ) )
				break
			}
			
			return null
		}
		
		event_catch( found? : string[] ) {
			console.log( found )
		}
		
		patterns() {
			return [] as string[]
		}
		
		@ $mol_mem
		matchers() {
			return this.patterns().map( pattern => {
				return new RegExp( this.prefix() + pattern + this.suffix() , 'i' )
			} )
		}
		
		prefix() {
			return ''
		}
		
		suffix() {
			return '[,\\s]+(?:please|would you kindly|пожалуйста|пожалуй 100|будь любезен)\.?$'
		}
		
	}
	
}
