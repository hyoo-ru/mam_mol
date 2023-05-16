namespace $ {
	export class $mol_embed_youtube extends $mol_check {
		
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
		 * video_preview \
		 * ```
		 */
		video_preview() {
			return ""
		}
		
		/**
		 * ```tree
		 * video_id \
		 * ```
		 */
		video_id() {
			return ""
		}
		
		/**
		 * ```tree
		 * checked? <=> active?
		 * ```
		 */
		checked(next?: any) {
			return this.active(next)
		}
		
		/**
		 * ```tree
		 * sub /
		 * 	<= Image
		 * 	<= Hint
		 * 	<= Frame
		 * ```
		 */
		sub() {
			return [
				this.Image(),
				this.Hint(),
				this.Frame()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * active? false
		 * ```
		 */
		@ $mol_mem
		active(next?: any) {
			if ( next !== undefined ) return next as never
			return false
		}
		
		/**
		 * ```tree
		 * title \
		 * ```
		 */
		title() {
			return ""
		}
		
		/**
		 * ```tree
		 * Image $mol_image
		 * 	title <= title
		 * 	uri <= video_preview
		 * ```
		 */
		@ $mol_mem
		Image() {
			const obj = new this.$.$mol_image()
			
			obj.title = () => this.title()
			obj.uri = () => this.video_preview()
			
			return obj
		}
		
		/**
		 * ```tree
		 * Hint $mol_icon_youtube
		 * ```
		 */
		@ $mol_mem
		Hint() {
			const obj = new this.$.$mol_icon_youtube()
			
			return obj
		}
		
		/**
		 * ```tree
		 * video_embed \
		 * ```
		 */
		video_embed() {
			return ""
		}
		
		/**
		 * ```tree
		 * Frame $mol_frame
		 * 	title <= title
		 * 	uri <= video_embed
		 * ```
		 */
		@ $mol_mem
		Frame() {
			const obj = new this.$.$mol_frame()
			
			obj.title = () => this.title()
			obj.uri = () => this.video_embed()
			
			return obj
		}
	}
	
}

