namespace $ {
	export class $mol_audio_demo_vibe extends $mol_example_small {
		
		/**
		 * ```tree
		 * title \WebAudio API complex example
		 * ```
		 */
		title() {
			return "WebAudio API complex example"
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
		 * 	duration <= duration
		 * 	input / <= Beep_vibe
		 * ```
		 */
		@ $mol_mem
		Room() {
			const obj = new this.$.$mol_audio_room()
			
			obj.duration = () => this.duration()
			obj.input = () => [
				this.Beep_vibe()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * sub / <= List
		 * ```
		 */
		sub() {
			return [
				this.List()
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
		 * Beep_vibe $mol_audio_vibe
		 * 	freq <= frequency
		 * 	shape <= shape
		 * ```
		 */
		@ $mol_mem
		Beep_vibe() {
			const obj = new this.$.$mol_audio_vibe()
			
			obj.freq = () => this.frequency()
			obj.shape = () => this.shape()
			
			return obj
		}
		
		/**
		 * ```tree
		 * duration_label \Duration, s
		 * ```
		 */
		duration_label() {
			return "Duration, s"
		}
		
		/**
		 * ```tree
		 * duration? 0.5
		 * ```
		 */
		@ $mol_mem
		duration(next?: any) {
			if ( next !== undefined ) return next as never
			return 0.5
		}
		
		/**
		 * ```tree
		 * Duration_num $mol_number
		 * 	precision_change 0.05
		 * 	value? <=> duration?
		 * ```
		 */
		@ $mol_mem
		Duration_num() {
			const obj = new this.$.$mol_number()
			
			obj.precision_change = () => 0.05
			obj.value = (next?: any) => this.duration(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Duration $mol_labeler
		 * 	title <= duration_label
		 * 	content / <= Duration_num
		 * ```
		 */
		@ $mol_mem
		Duration() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.duration_label()
			obj.content = () => [
				this.Duration_num()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * frequency_label \Frequency, Hz
		 * ```
		 */
		frequency_label() {
			return "Frequency, Hz"
		}
		
		/**
		 * ```tree
		 * frequency? 700
		 * ```
		 */
		@ $mol_mem
		frequency(next?: any) {
			if ( next !== undefined ) return next as never
			return 700
		}
		
		/**
		 * ```tree
		 * Frequency_num $mol_number
		 * 	precision_change 50
		 * 	value? <=> frequency?
		 * ```
		 */
		@ $mol_mem
		Frequency_num() {
			const obj = new this.$.$mol_number()
			
			obj.precision_change = () => 50
			obj.value = (next?: any) => this.frequency(next)
			
			return obj
		}
		
		/**
		 * ```tree
		 * Frequency $mol_labeler
		 * 	title <= frequency_label
		 * 	content / <= Frequency_num
		 * ```
		 */
		@ $mol_mem
		Frequency() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.frequency_label()
			obj.content = () => [
				this.Frequency_num()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * shape_label \Shape
		 * ```
		 */
		shape_label() {
			return "Shape"
		}
		
		/**
		 * ```tree
		 * shape? null
		 * ```
		 */
		@ $mol_mem
		shape(next?: any) {
			if ( next !== undefined ) return next as never
			return null as any
		}
		
		/**
		 * ```tree
		 * Shape_select $mol_select
		 * 	Filter null
		 * 	value? <=> shape?
		 * 	options /$mol_audio_vibe_shape
		 * 		\sine
		 * 		\square
		 * 		\sawtooth
		 * 		\triangle
		 * ```
		 */
		@ $mol_mem
		Shape_select() {
			const obj = new this.$.$mol_select()
			
			obj.Filter = () => null as any
			obj.value = (next?: any) => this.shape(next)
			obj.options = () => [
				"sine",
				"square",
				"sawtooth",
				"triangle"
			] as readonly $mol_audio_vibe_shape[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Shape $mol_labeler
		 * 	title <= shape_label
		 * 	content / <= Shape_select
		 * ```
		 */
		@ $mol_mem
		Shape() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => this.shape_label()
			obj.content = () => [
				this.Shape_select()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Play_icon $mol_icon_play
		 * ```
		 */
		@ $mol_mem
		Play_icon() {
			const obj = new this.$.$mol_icon_play()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Play_button $mol_button_major
		 * 	click <= play
		 * 	sub /
		 * 		<= Play_icon
		 * 		\Play
		 * ```
		 */
		@ $mol_mem
		Play_button() {
			const obj = new this.$.$mol_button_major()
			
			obj.click = () => this.play()
			obj.sub = () => [
				this.Play_icon(),
				"Play"
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Button_row $mol_row sub / <= Play_button
		 * ```
		 */
		@ $mol_mem
		Button_row() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Play_button()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * List $mol_list rows /
		 * 	<= Duration
		 * 	<= Frequency
		 * 	<= Shape
		 * 	<= Button_row
		 * ```
		 */
		@ $mol_mem
		List() {
			const obj = new this.$.$mol_list()
			
			obj.rows = () => [
				this.Duration(),
				this.Frequency(),
				this.Shape(),
				this.Button_row()
			] as readonly any[]
			
			return obj
		}
	}
	
}

