namespace $ {
	
	export class $mol_speech extends $mol_plugin {
		
		@ $mol_mem
		static speaker( next? : SpeechSynthesis , force? : $mol_atom_force ) {

			const API = window.speechSynthesis

			if( API.getVoices().length ) return API

			const on_voices = ( event : SpeechSynthesisEvent )=> {
				if( !API.getVoices().length ) return
				this.speaker( API , $mol_atom_force_cache )
				API.removeEventListener( 'voiceschanged' , on_voices )
			}

			API.addEventListener( 'voiceschanged' , on_voices )
			
			throw new $mol_atom_wait( 'Waiting for voice..' )
		}

		@ $mol_mem
		static voices() {
			const lang = this.$.$mol_locale.lang()
			return this.speaker().getVoices().filter( voice => voice.lang.split('-')[0] === lang )
		}
		
		@ $mol_mem_key
		static say( text : string ) {
			
			const speaker = this.speaker()
			
			speaker.cancel()
			speaker.resume()
			
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
				this.event_result( null )
			}
			api.onresult = ( event : any )=> {
				this.event_result( event )
			}
			api.onerror = ( event : Event & { error : string } )=> {
				console.error( new Error( event.error ) )
				this.event_result( null )
			}
			api.onend = ( event : any )=> {
				if( this.hearing() ) api.start()
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

		@ $mol_mem
		static event_result( event? : Event & {
			results : Array< { transcript : string }[] & { isFinal : boolean } >
		} ) {
			this.hearer()
			return event
		}

		@ $mol_mem
		static recognitions() {

			const result = this.event_result()
			if( !result ) return []

			const results = this.event_result().results
			return ( [].slice.call( this.event_result().results ) as typeof results )
		}

		@ $mol_mem
		static commands() {
			return this.recognitions().map( result => result[0].transcript.toLowerCase().trim().replace( /[,\.]/g , '' ) )
		}
		
		@ $mol_mem
		static text() {
			return this.recognitions().map( result => result[0].transcript ).join( '' )
		}
		
		@ $mol_mem
		commands_skip( next = 0 ) {
			$mol_speech.hearing()
			return next
		}

		@ $mol_mem
		render() : null {

			const matchers = this.matchers()
			const commands = $mol_speech.commands()

			for( let i = this.commands_skip() ; i < commands.length ; ++ i ) {
				
				for( let matcher of matchers ) {
					
					const found = commands[i].match( matcher )
					if( !found ) continue
					
					new $mol_defer( ()=> {
						this.commands_skip( i + 1 )
						this.event_catch( found.slice( 1 ) )
					} )
					
					return null
				}

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
			return '[,\\s]+(?:please|would you kindly|пожалуйста|пожалуй 100|будь любезен|будь любезна|будь добра?)\.?$'
		}
		
	}
	
}
