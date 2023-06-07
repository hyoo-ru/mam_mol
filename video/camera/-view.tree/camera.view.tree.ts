namespace $ {
	export class $mol_video_camera extends $mol_video_player {
		
		/**
		 * ```tree
		 * controls false
		 * ```
		 */
		controls() {
			return false
		}
		
		/**
		 * ```tree
		 * style * transform <= transform
		 * ```
		 */
		style() {
			return {
				transform: this.transform()
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * video_constraints *
		 * 	facingMode <= facing
		 * 	aspectRatio <= aspect
		 * 	width * ideal <= width
		 * 	height * ideal <= height
		 * ```
		 */
		video_constraints() {
			return {
				facingMode: this.facing(),
				aspectRatio: this.aspect(),
				width: {
					ideal: this.width()
				} as Record< string, any >,
				height: {
					ideal: this.height()
				} as Record< string, any >
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * video_settings *
		 * 	brightness <= brightness
		 * 	sharpness <= sharpness
		 * 	contrast <= contrast
		 * 	saturation <= saturation
		 * 	advanced /
		 * 		* colorTemperature <= temperature
		 * 		* torch <= torch
		 * ```
		 */
		video_settings() {
			return {
				brightness: this.brightness(),
				sharpness: this.sharpness(),
				contrast: this.contrast(),
				saturation: this.saturation(),
				advanced: [
					{
						colorTemperature: this.temperature()
					} as Record< string, any >,
					{
						torch: this.torch()
					} as Record< string, any >
				] as readonly any[]
			} as Record< string, any >
		}
		
		/**
		 * ```tree
		 * transform \
		 * ```
		 */
		transform() {
			return ""
		}
		
		/**
		 * ```tree
		 * facing \user
		 * ```
		 */
		facing() {
			return "user"
		}
		
		/**
		 * ```tree
		 * aspect 1
		 * ```
		 */
		aspect() {
			return 1
		}
		
		/**
		 * ```tree
		 * size 720
		 * ```
		 */
		size() {
			return 720
		}
		
		/**
		 * ```tree
		 * width <= size
		 * ```
		 */
		width() {
			return this.size()
		}
		
		/**
		 * ```tree
		 * height <= size
		 * ```
		 */
		height() {
			return this.size()
		}
		
		/**
		 * ```tree
		 * brightness 128
		 * ```
		 */
		brightness() {
			return 128
		}
		
		/**
		 * ```tree
		 * sharpness 2
		 * ```
		 */
		sharpness() {
			return 2
		}
		
		/**
		 * ```tree
		 * contrast 32
		 * ```
		 */
		contrast() {
			return 32
		}
		
		/**
		 * ```tree
		 * saturation 64
		 * ```
		 */
		saturation() {
			return 64
		}
		
		/**
		 * ```tree
		 * temperature 4000
		 * ```
		 */
		temperature() {
			return 4000
		}
		
		/**
		 * ```tree
		 * torch false
		 * ```
		 */
		torch() {
			return false
		}
	}
	
}

