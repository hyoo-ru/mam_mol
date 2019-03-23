namespace $ {
	
	export class $mol_speech extends $mol_plugin {
		
		@ $mol_mem
		static speaker( next? : SpeechSynthesis , force? : $mol_atom_force ) {

			const API = window.speechSynthesis

			const on_voices = ( event : SpeechSynthesisEvent )=> {
				this.speaker( API , $mol_atom_force_cache )
				API.removeEventListener( 'voiceschanged' , on_voices )
			}

			API.addEventListener( 'voiceschanged' , on_voices )
			
			if( !API.getVoices().length ) throw new $mol_atom_wait( 'Waiting for voice..' )

			return API
		}

		@ $mol_mem
		static voices() {
			const lang = this.$.$mol_locale.lang()
			return this.speaker().getVoices().filter( voice => voice.lang.split('-')[0] === lang )
		}
		
		@ $mol_mem_key
		static say( text : string ) {
			
			const speaker = this.speaker()
			this.speaking( true )
			
			const rate = 1
			const voice = this.voices()[ this.voices().length - 1 ]
			const pitch = 1
			
			var utter = new SpeechSynthesisUtterance( text )
			
			utter.voice = voice
			utter.rate = rate
			utter.pitch = pitch
			
			speaker.speak( utter )
		}

		@ $mol_mem
		static speaking( next = true ) {
			
			if( next ) this.speaker().resume()
			else this.speaker().pause()
			
			return next
		}
		
		@ $mol_mem
		static hearer() {
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
				this.hearing( false )
			}
			
			return api;
		}
		
		@ $mol_mem
		static hearing( next? : boolean ) {
			if( next === undefined ) return false
			
			if( next ) {
				this.hearer().start()
			} else {
				this.hearer().stop()
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
