namespace $ {
	export class $mol_audio_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \WebAudio API example
		 * ```
		 */
		title() {
			return "WebAudio API example"
		}
		
		/**
		 * ```tree
		 * play
		 * ```
		 */
		play() {
			return this.Room().play()
		}
		
		/**
		 * ```tree
		 * Room $mol_audio_room
		 * 	play => play
		 * 	duration 500
		 * 	input / <= Vibe
		 * ```
		 */
		@ $mol_mem
		Room() {
			const obj = new this.$.$mol_audio_room()
			
			obj.duration = () => 500
			obj.input = () => [
				this.Vibe()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub / <= Play
		 * ```
		 */
		sub() {
			return [
				this.Play()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\Audio
		 * 	\Sound
		 * ```
		 */
		tags() {
			return [
				"Audio",
				"Sound"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Vibe $mol_audio_vibe freq 440
		 * ```
		 */
		@ $mol_mem
		Vibe() {
			const obj = new this.$.$mol_audio_vibe()
			
			obj.freq = () => 440
			
			return obj
		}
		
		/**
		 * ```tree
		 * Play $mol_button_major
		 * 	click <= play
		 * 	title \Play
		 * ```
		 */
		@ $mol_mem
		Play() {
			const obj = new this.$.$mol_button_major()
			
			obj.click = () => this.play()
			obj.title = () => "Play"
			
			return obj
		}
	}
	
}

