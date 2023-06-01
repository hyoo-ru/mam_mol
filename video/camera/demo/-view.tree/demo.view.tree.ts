namespace $ {
	export class $mol_video_camera_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Reactive video camera
		 * ```
		 */
		title() {
			return "Reactive video camera"
		}
		
		/**
		 * ```tree
		 * sub / <= Scroll
		 * ```
		 */
		sub() {
			return [
				this.Scroll()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \capture
		 * ```
		 */
		tags() {
			return [
				"capture"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Media/Video
		 * ```
		 */
		aspects() {
			return [
				"Media/Video"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Player $mol_video_camera
		 * 	torch <= torch
		 * 	brightness <= brightness
		 * 	sharpness <= sharpness
		 * 	contrast <= contrast
		 * 	saturation <= saturation
		 * 	temperature <= temperature
		 * ```
		 */
		@ $mol_mem
		Player() {
			const obj = new this.$.$mol_video_camera()
			
			obj.torch = () => this.torch()
			obj.brightness = () => this.brightness()
			obj.sharpness = () => this.sharpness()
			obj.contrast = () => this.contrast()
			obj.saturation = () => this.saturation()
			obj.temperature = () => this.temperature()
			
			return obj
		}
		
		/**
		 * ```tree
		 * View $mol_row sub / <= Player
		 * ```
		 */
		@ $mol_mem
		View() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Player()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * torch? false
		 * ```
		 */
		@ $mol_mem
		torch(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * Torch_icon $mol_icon_flashlight
		 * ```
		 */
		@ $mol_mem
		Torch_icon() {
			const obj = new this.$.$mol_icon_flashlight()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Torch $mol_check_icon
		 * 	checked? <=> torch?
		 * 	Icon <= Torch_icon
		 * ```
		 */
		@ $mol_mem
		Torch() {
			const obj = new this.$.$mol_check_icon()
			
			obj.checked = (next?: any) => this.torch(next)
			obj.Icon = () => this.Torch_icon()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Torch_labeler $mol_labeler
		 * 	title \Torch
		 * 	content / <= Torch
		 * ```
		 */
		@ $mol_mem
		Torch_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Torch"
			obj.content = () => [
				this.Torch()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * brightness? 128
		 * ```
		 */
		@ $mol_mem
		brightness(next?: any) {
			if ( next !== undefined ) return next as never
			return 128
		}
		
		/**
		 * ```tree
		 * Brightness $mol_number
		 * 	value? <=> brightness?
		 * 	precision_change 8
		 * ```
		 */
		@ $mol_mem
		Brightness() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.brightness(next)
			obj.precision_change = () => 8
			
			return obj
		}
		
		/**
		 * ```tree
		 * Brightness_labeler $mol_labeler
		 * 	title \Brightness
		 * 	content / <= Brightness
		 * ```
		 */
		@ $mol_mem
		Brightness_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Brightness"
			obj.content = () => [
				this.Brightness()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * sharpness? 3
		 * ```
		 */
		@ $mol_mem
		sharpness(next?: any) {
			if ( next !== undefined ) return next as never
			return 3
		}
		
		/**
		 * ```tree
		 * Sharpness $mol_number value? <=> sharpness?
		 * ```
		 */
		@ $mol_mem
		Sharpness() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.sharpness(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Sharpness_labeler $mol_labeler
		 * 	title \Sharpness
		 * 	content / <= Sharpness
		 * ```
		 */
		@ $mol_mem
		Sharpness_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Sharpness"
			obj.content = () => [
				this.Sharpness()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * contrast? 32
		 * ```
		 */
		@ $mol_mem
		contrast(next?: any) {
			if ( next !== undefined ) return next as never
			return 32
		}
		
		/**
		 * ```tree
		 * Contrast $mol_number
		 * 	value? <=> contrast?
		 * 	precision_change 4
		 * ```
		 */
		@ $mol_mem
		Contrast() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.contrast(next)
			obj.precision_change = () => 4
			
			return obj
		}
		
		/**
		 * ```tree
		 * Contrast_labeler $mol_labeler
		 * 	title \Contrast
		 * 	content / <= Contrast
		 * ```
		 */
		@ $mol_mem
		Contrast_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Contrast"
			obj.content = () => [
				this.Contrast()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * saturation? 64
		 * ```
		 */
		@ $mol_mem
		saturation(next?: any) {
			if ( next !== undefined ) return next as never
			return 64
		}
		
		/**
		 * ```tree
		 * Saturation $mol_number
		 * 	value? <=> saturation?
		 * 	precision_change 8
		 * ```
		 */
		@ $mol_mem
		Saturation() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.saturation(next)
			obj.precision_change = () => 8
			
			return obj
		}
		
		/**
		 * ```tree
		 * Saturation_labeler $mol_labeler
		 * 	title \Saturation
		 * 	content / <= Saturation
		 * ```
		 */
		@ $mol_mem
		Saturation_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Saturation"
			obj.content = () => [
				this.Saturation()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * temperature? 4000
		 * ```
		 */
		@ $mol_mem
		temperature(next?: any) {
			if ( next !== undefined ) return next as never
			return 4000
		}
		
		/**
		 * ```tree
		 * Temperature $mol_number
		 * 	value? <=> temperature?
		 * 	precision_change 100
		 * ```
		 */
		@ $mol_mem
		Temperature() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.temperature(next)
			obj.precision_change = () => 100
			
			return obj
		}
		
		/**
		 * ```tree
		 * Temperature_labeler $mol_labeler
		 * 	title \Temperature
		 * 	content / <= Temperature
		 * ```
		 */
		@ $mol_mem
		Temperature_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Temperature"
			obj.content = () => [
				this.Temperature()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Controls $mol_row sub /
		 * 	<= Torch_labeler
		 * 	<= Brightness_labeler
		 * 	<= Sharpness_labeler
		 * 	<= Contrast_labeler
		 * 	<= Saturation_labeler
		 * 	<= Temperature_labeler
		 * ```
		 */
		@ $mol_mem
		Controls() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Torch_labeler(),
				this.Brightness_labeler(),
				this.Sharpness_labeler(),
				this.Contrast_labeler(),
				this.Saturation_labeler(),
				this.Temperature_labeler()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Scroll $mol_scroll sub /
		 * 	<= View
		 * 	<= Controls
		 * ```
		 */
		@ $mol_mem
		Scroll() {
			const obj = new this.$.$mol_scroll()
			
			obj.sub = () => [
				this.View(),
				this.Controls()
			] as readonly any[]
			
			return obj
		}
	}
	
}

