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
		 * beep_play
		 * ```
		 */
		beep_play() {
			return this.Beep().play()
		}
		
		/**
		 * ```tree
		 * Beep $mol_audio_room
		 * 	play => beep_play
		 * 	duration 0.1
		 * 	input / <= Beep_vibe
		 * ```
		 */
		@ $mol_mem
		Beep() {
			const obj = new this.$.$mol_audio_room()
			
			obj.duration = () => 0.1
			obj.input = () => [
				this.Beep_vibe()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * noise_play
		 * ```
		 */
		noise_play() {
			return this.Noise().play()
		}
		
		/**
		 * ```tree
		 * Noise $mol_audio_room
		 * 	play => noise_play
		 * 	duration 1
		 * 	input / <= Noise_vibe
		 * ```
		 */
		@ $mol_mem
		Noise() {
			const obj = new this.$.$mol_audio_room()
			
			obj.duration = () => 1
			obj.input = () => [
				this.Noise_vibe()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Beep_play
		 * 	<= Noise_play
		 * ```
		 */
		sub() {
			return [
				this.Beep_play(),
				this.Noise_play()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \sound
		 * ```
		 */
		tags() {
			return [
				"sound"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Media/Audio
		 * ```
		 */
		aspects() {
			return [
				"Media/Audio"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Beep_vibe $mol_audio_vibe freq 440
		 * ```
		 */
		@ $mol_mem
		Beep_vibe() {
			const obj = new this.$.$mol_audio_vibe()
			
			obj.freq = () => 440
			
			return obj
		}
		
		/**
		 * ```tree
		 * noise_freq 440
		 * ```
		 */
		noise_freq() {
			return 440
		}
		
		/**
		 * ```tree
		 * Noise_vibe $mol_audio_vibe freq <= noise_freq
		 * ```
		 */
		@ $mol_mem
		Noise_vibe() {
			const obj = new this.$.$mol_audio_vibe()
			
			obj.freq = () => this.noise_freq()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Beep_play $mol_button_minor
		 * 	click <= beep_play
		 * 	title \Beep
		 * ```
		 */
		@ $mol_mem
		Beep_play() {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = () => this.beep_play()
			obj.title = () => "Beep"
			
			return obj
		}
		
		/**
		 * ```tree
		 * Noise_play $mol_button_minor
		 * 	click <= noise_play
		 * 	title \Noise
		 * ```
		 */
		@ $mol_mem
		Noise_play() {
			const obj = new this.$.$mol_button_minor()
			
			obj.click = () => this.noise_play()
			obj.title = () => "Noise"
			
			return obj
		}
	}
	
}

