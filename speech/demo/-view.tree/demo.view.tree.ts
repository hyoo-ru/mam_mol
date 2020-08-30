namespace $ {
	export class $mol_speech_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * sub /
		 * 	<= Toggle $mol_check_icon
		 * 		Icon <= Toggle_icon $mol_icon_microphone
		 * 		checked?val <=> hearing?val false
		 * 	<= Message $mol_view sub / <= message \
		 * 	<= Speak $mol_button_major
		 * 		click?val <=> speak?val false
		 * 		sub / \Speak
		 * ```
		 */
		sub() {
			return [
				this.Toggle(),
				this.Message(),
				this.Speak()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Toggle $mol_check_icon
		 * 	Icon <= Toggle_icon $mol_icon_microphone
		 * 	checked?val <=> hearing?val false
		 * ```
		 */
		@ $mol_mem
		Toggle() {
			const obj = new this.$.$mol_check_icon()

			obj.Icon = () => this.Toggle_icon()
			obj.checked = (val?: any) => this.hearing(val)

			return obj
		}

		/**
		 * ```tree
		 * Toggle_icon $mol_icon_microphone
		 * ```
		 */
		@ $mol_mem
		Toggle_icon() {
			const obj = new this.$.$mol_icon_microphone()

			return obj
		}

		/**
		 * ```tree
		 * hearing?val false
		 * ```
		 */
		@ $mol_mem
		hearing(val?: any) {
			if ( val !== undefined ) return val
			return false
		}

		/**
		 * ```tree
		 * Message $mol_view sub / <= message \
		 * ```
		 */
		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.message()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * message \
		 * ```
		 */
		message() {
			return ""
		}

		/**
		 * ```tree
		 * Speak $mol_button_major
		 * 	click?val <=> speak?val false
		 * 	sub / \Speak
		 * ```
		 */
		@ $mol_mem
		Speak() {
			const obj = new this.$.$mol_button_major()

			obj.click = (val?: any) => this.speak(val)
			obj.sub = () => [
				"Speak"
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * speak?val false
		 * ```
		 */
		@ $mol_mem
		speak(val?: any) {
			if ( val !== undefined ) return val
			return false
		}
	}

}
