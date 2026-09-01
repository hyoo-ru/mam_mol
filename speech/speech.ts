namespace $ {
	
	interface SpeechResultsEvent extends Event {
		resultIndex: number
		results: SpeechRecognitionResultList
	}
	
	/**
	 * Web Speech API
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_speech_demo
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
	 */
	export class $mol_speech extends $mol_plugin {
		
		static speaker_make() {
			return new Promise< SpeechSynthesis >( done => {

				const API = $mol_dom_context.speechSynthesis

				if( API.getVoices().length ) return done( API )

				const on_voices = ( event : Event )=> {
					if( !API.getVoices().length ) return
					API.removeEventListener( 'voiceschanged' , on_voices )
					done( API )
				}

				API.addEventListener( 'voiceschanged' , on_voices )
			
			} )
		}
		
		@ $mol_mem
		static speaker() {
			return $mol_wire_sync( this ).speaker_make()
		}

		@ $mol_mem
		static voices() {
			const lang = this.$.$mol_locale.lang()
			return this.speaker().getVoices().filter( voice => voice.lang.split('-')[0] === lang )
		}
		
		@ $mol_action
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
			
			$mol_wire_solid()

			let Api

			for (const prefix of ['', 'webkit', 'moz', 'ms']) {
				if (Api = (window as any)[prefix + 'SpeechRecognition']) {
					break
				}
			}
			
			const api = new Api
			
			api.interimResults = true
			api.maxAlternatives = 1
			api.continuous = true
			api.lang = $mol_locale.lang()
			
			api.onnomatch = ( event : any )=> {
				api.stop()
				return null
			}
			api.onresult = ( event: SpeechResultsEvent )=> {
				this.recognition_index( [ ... event.results ].filter( res => res.isFinal ).length )
				const recognition = event.results[ event.resultIndex ]
				const index = event.resultIndex + this.recognition_offset()
				this.recognition( index, recognition )
				return null
			}
			api.onerror = ( event : ErrorEvent )=> {
				if( event.error === 'no-speech' ) return null
				console.log(event)
				console.error( new Error( ( event as any ).error || event ) )
				api.stop()
				return null
			}
			api.onend = ( event : any )=> {
				if( this.recognition_index() > 0 ) {
					this.recognition_offset( this.recognition_offset() + this.recognition_index() )
				}
				this.recognition_index( -1 )
				if( this.hearing() ) api.start()
			}
			api.onspeechend = ( event : any )=> {
				api.stop()
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
		static recognition_index( next = -1 ) {
			$mol_wire_solid()
			return next
		}

		@ $mol_mem
		static recognition_offset( next = 0 ) {
			$mol_wire_solid()
			return next
		}
		
		@ $mol_mem_key
		static recognition( index: number, next?: SpeechRecognitionResult ) {
			$mol_wire_solid()
			return next ?? null
		}

		@ $mol_mem
		static recognitions() {

			if( !this.hearing() ) return []

			return $mol_range2(
				index => this.recognition( index )!,
				()=> Math.max( 0, this.recognition_index() + this.recognition_offset() ),
			)
			
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
			$mol_wire_solid()
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
					
					new $mol_after_work( 16, ()=> {
						this.commands_skip( i + 1 )
						$mol_wire_async( this ).event_catch( found.slice( 1 ) )
					} )
					
					return null
				}

			}
			
			return null
		}
		
		event_catch( found? : string[] ) {
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
			return '[,\\s]+(?:please|would you kindly|пожалуйста|пожалуй 100|будь любезен|будь любезна|будь добра?|плиз)\.?$'
		}
		
	}
	
}
