namespace $ {
	
	export class $mol_speech extends $mol_plugin {
		
		@ $mol_mem
		static speaker() {

			return $mol_fiber_sync( ()=> new Promise< SpeechSynthesis >( done => {

				const API = $mol_dom_context.speechSynthesis

				if( API.getVoices().length ) return done( API )

				const on_voices = ( event : Event )=> {
					if( !API.getVoices().length ) return
					API.removeEventListener( 'voiceschanged' , on_voices )
					done( API )
				}

				API.addEventListener( 'voiceschanged' , on_voices )
			
			} ) )()

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

			return null as null
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
			
			api.onnomatch = $mol_fiber_root( ( event : any )=> {
				this.event_result( null )
				return null
			})
			api.onresult = $mol_fiber_root(( event : any )=> {
				this.event_result( event )
				return null
			} )
			api.onerror = $mol_fiber_root( ( event : Event )=> {
				console.error( new Error( ( event as any ).error || event ) )
				this.event_result( null )
				return null
			} )
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
		static event_result( event? : null | Event & {
			results : Array< { transcript : string }[] & { isFinal : boolean } >
		} ) {
			return event || null
		}

		@ $mol_mem
		static recognitions() {

			if( !this.hearing() ) return []

			const result = this.event_result()
			if( !result ) return []

			const results = this.event_result()?.results ?? []
			return ( [].slice.call( results ) as typeof results )
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
						if( this.event_catch( found.slice( 1 ) ) ) {
							this.commands_skip( i + 1 )
						}
					} )
					
					return null
				}

			}
			
			return null
		}
		
		event_catch( found? : string[] ) {
			console.log( found )
			return false
		}
		
		patterns() {
			return [] as readonly string[]
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
