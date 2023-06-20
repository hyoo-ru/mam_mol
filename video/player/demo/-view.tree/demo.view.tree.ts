namespace $ {
	export class $mol_video_player_demo extends $mol_example_large {
		
		/**
		 * ```tree
		 * title \Reactive video player
		 * ```
		 */
		title() {
			return "Reactive video player"
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Controls
		 * 	<= Player
		 * ```
		 */
		sub() {
			return [
				this.Controls(),
				this.Player()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * tags / \palyback
		 * ```
		 */
		tags() {
			return [
				"palyback"
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
		 * files
		 * ```
		 */
		files() {
			return this.Open().files()
		}
		
		/**
		 * ```tree
		 * Open $mol_button_open files => files
		 * ```
		 */
		@ $mol_mem
		Open() {
			const obj = new this.$.$mol_button_open()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Playing_icon $mol_icon_play
		 * ```
		 */
		@ $mol_mem
		Playing_icon() {
			const obj = new this.$.$mol_icon_play()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Playing $mol_check_icon
		 * 	checked? <=> playing?
		 * 	Icon <= Playing_icon
		 * ```
		 */
		@ $mol_mem
		Playing() {
			const obj = new this.$.$mol_check_icon()
			
			obj.checked = (next?: any) => this.playing(next)
			obj.Icon = () => this.Playing_icon()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Duration $mol_paragraph sub / <= duration
		 * ```
		 */
		@ $mol_mem
		Duration() {
			const obj = new this.$.$mol_paragraph()
			
			obj.sub = () => [
				this.duration()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Duration_labeler $mol_labeler
		 * 	title \Duration
		 * 	content / <= Duration
		 * ```
		 */
		@ $mol_mem
		Duration_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Duration"
			obj.content = () => [
				this.Duration()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Time $mol_number
		 * 	value? <=> time?
		 * 	precision_view 0.001
		 * ```
		 */
		@ $mol_mem
		Time() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.time(next)
			obj.precision_view = () => 0.001
			
			return obj
		}
		
		/**
		 * ```tree
		 * Time_labeler $mol_labeler
		 * 	title \Time
		 * 	content / <= Time
		 * ```
		 */
		@ $mol_mem
		Time_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Time"
			obj.content = () => [
				this.Time()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Volume $mol_number
		 * 	value? <=> volume?
		 * 	precision 0.001
		 * ```
		 */
		@ $mol_mem
		Volume() {
			const obj = new this.$.$mol_number()
			
			obj.value = (next?: any) => this.volume(next)
			obj.precision = () => 0.001
			
			return obj
		}
		
		/**
		 * ```tree
		 * Volume_labeler $mol_labeler
		 * 	title \Volume
		 * 	content / <= Volume
		 * ```
		 */
		@ $mol_mem
		Volume_labeler() {
			const obj = new this.$.$mol_labeler()
			
			obj.title = () => "Volume"
			obj.content = () => [
				this.Volume()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * Controls $mol_row sub /
		 * 	<= Open
		 * 	<= Playing
		 * 	<= Duration_labeler
		 * 	<= Time_labeler
		 * 	<= Volume_labeler
		 * ```
		 */
		@ $mol_mem
		Controls() {
			const obj = new this.$.$mol_row()
			
			obj.sub = () => [
				this.Open(),
				this.Playing(),
				this.Duration_labeler(),
				this.Time_labeler(),
				this.Volume_labeler()
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * uri \
		 * ```
		 */
		uri() {
			return ""
		}
		
		/**
		 * ```tree
		 * playing?
		 * ```
		 */
		playing(next?: any) {
			return this.Player().playing(next)
		}
		
		/**
		 * ```tree
		 * volume?
		 * ```
		 */
		volume(next?: any) {
			return this.Player().volume(next)
		}
		
		/**
		 * ```tree
		 * time?
		 * ```
		 */
		time(next?: any) {
			return this.Player().time(next)
		}
		
		/**
		 * ```tree
		 * duration
		 * ```
		 */
		duration() {
			return this.Player().duration()
		}
		
		/**
		 * ```tree
		 * Player $mol_video_player
		 * 	uri <= uri
		 * 	playing? => playing?
		 * 	volume? => volume?
		 * 	time? => time?
		 * 	duration => duration
		 * ```
		 */
		@ $mol_mem
		Player() {
			const obj = new this.$.$mol_video_player()
			
			obj.uri = () => this.uri()
			
			return obj
		}
	}
	
}

