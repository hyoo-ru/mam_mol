namespace $ {
	export class $mol_speech_demo extends $mol_example_small {
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Toggle
		 * 	<= Message
		 * 	<= Speak
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
		 * tags /
		 * 	\speech
		 * 	\voice
		 * 	\recognition
		 * 	\dictation
		 * ```
		 */
		tags() {
			return [
				"speech",
				"voice",
				"recognition",
				"dictation"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Widget/Plugin
		 * 	\Media/Audio
		 * ```
		 */
		aspects() {
			return [
				"Widget/Plugin",
				"Media/Audio"
			] as readonly any[]
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
		 * hearing? false
		 * ```
		 */
		@ $mol_mem
		hearing(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Toggle $mol_check_icon
		 * 	Icon <= Toggle_icon
		 * 	checked? <=> hearing?
		 * ```
		 */
		@ $mol_mem
		Toggle() {
			const obj = new this.$.$mol_check_icon()
			
			obj.Icon = () => this.Toggle_icon()
			obj.checked = (next?: any) => this.hearing(next)
			
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
		 * Message $mol_row sub / <= message
		 * ```
		 */
		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.message()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * speak? null
		 * ```
		 */
		@ $mol_mem
		speak(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Speak $mol_button_major
		 * 	click? <=> speak?
		 * 	sub / \Speak
		 * ```
		 */
		@ $mol_mem
		Speak() {
			const obj = new this.$.$mol_button_major()
			
			obj.click = (next?: any) => this.speak(next)
			obj.sub = () => [
				"Speak"
			] as readonly any[]
			
			return obj
		}
	}
	
}

