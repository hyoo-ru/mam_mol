namespace $ {
	export class $mol_message extends $mol_view {

		/**
		 * ```tree
		 * moment $mol_time_moment
		 * ```
		 */
		@ $mol_mem
		moment() {
			const obj = new this.$.$mol_time_moment()

			return obj
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Info $mol_row sub /
		 * 		<= Name $mol_view sub / <= name \ 
		 * 		<= Moment $mol_view sub / <= moment_string \
		 * 	<= Avatar_link $mol_link
		 * 		uri <= avatar_link \
		 * 		sub / <= Avatar $mol_image
		 * 			title \
		 * 			uri <= avatar \
		 * 	<= Text $mol_text text <= text \
		 * ```
		 */
		sub() {
			return [
				this.Info(),
				this.Avatar_link(),
				this.Text()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Info $mol_row sub /
		 * 	<= Name $mol_view sub / <= name \ 
		 * 	<= Moment $mol_view sub / <= moment_string \
		 * ```
		 */
		@ $mol_mem
		Info() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.Name(),
				this.Moment()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Name $mol_view sub / <= name \
		 * ```
		 */
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.name()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * name \
		 * ```
		 */
		name() {
			return " "
		}

		/**
		 * ```tree
		 * Moment $mol_view sub / <= moment_string \
		 * ```
		 */
		@ $mol_mem
		Moment() {
			const obj = new this.$.$mol_view()

			obj.sub = () => [
				this.moment_string()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * moment_string \
		 * ```
		 */
		moment_string() {
			return ""
		}

		/**
		 * ```tree
		 * Avatar_link $mol_link
		 * 	uri <= avatar_link \
		 * 	sub / <= Avatar $mol_image
		 * 		title \
		 * 		uri <= avatar \
		 * ```
		 */
		@ $mol_mem
		Avatar_link() {
			const obj = new this.$.$mol_link()

			obj.uri = () => this.avatar_link()
			obj.sub = () => [
				this.Avatar()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * avatar_link \
		 * ```
		 */
		avatar_link() {
			return ""
		}

		/**
		 * ```tree
		 * Avatar $mol_image
		 * 	title \
		 * 	uri <= avatar \
		 * ```
		 */
		@ $mol_mem
		Avatar() {
			const obj = new this.$.$mol_image()

			obj.title = () => ""
			obj.uri = () => this.avatar()

			return obj
		}

		/**
		 * ```tree
		 * avatar \
		 * ```
		 */
		avatar() {
			return ""
		}

		/**
		 * ```tree
		 * Text $mol_text text <= text \
		 * ```
		 */
		@ $mol_mem
		Text() {
			const obj = new this.$.$mol_text()

			obj.text = () => this.text()

			return obj
		}

		/**
		 * ```tree
		 * text \
		 * ```
		 */
		text() {
			return ""
		}
	}

}
