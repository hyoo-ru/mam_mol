namespace $ {
	export class $mol_pop_over_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Menu that opens on mouse over
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_title' )
		}

		/**
		 * ```tree
		 * sub / <= Menu $mol_row sub /
		 * 	<= File $mol_pop_over
		 * 		align \bottom_right
		 * 		Anchor <= file_title @ \File
		 * 		bubble_content / <= File_menu $mol_list rows /
		 * 			<= Open $mol_button_minor title <= open_title @ \Open
		 * 			<= Export $mol_button_minor title <= export_title @ \Export
		 * 			<= Save $mol_button_minor title <= save_title @ \Save
		 * 	<= Help $mol_pop_over
		 * 		align \bottom_right
		 * 		Anchor <= help_title @ \About
		 * 		bubble_content / <= Help_menu $mol_list rows /
		 * 			<= Updates $mol_button_minor title <= updates_title @ \Updates
		 * 			<= About $mol_button_minor title <= about_title @ \About
		 * ```
		 */
		sub() {
			return [
				this.Menu()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Menu $mol_row sub /
		 * 	<= File $mol_pop_over
		 * 		align \bottom_right
		 * 		Anchor <= file_title @ \File
		 * 		bubble_content / <= File_menu $mol_list rows /
		 * 			<= Open $mol_button_minor title <= open_title @ \Open
		 * 			<= Export $mol_button_minor title <= export_title @ \Export
		 * 			<= Save $mol_button_minor title <= save_title @ \Save
		 * 	<= Help $mol_pop_over
		 * 		align \bottom_right
		 * 		Anchor <= help_title @ \About
		 * 		bubble_content / <= Help_menu $mol_list rows /
		 * 			<= Updates $mol_button_minor title <= updates_title @ \Updates
		 * 			<= About $mol_button_minor title <= about_title @ \About
		 * ```
		 */
		@ $mol_mem
		Menu() {
			const obj = new this.$.$mol_row()

			obj.sub = () => [
				this.File(),
				this.Help()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * File $mol_pop_over
		 * 	align \bottom_right
		 * 	Anchor <= file_title @ \File
		 * 	bubble_content / <= File_menu $mol_list rows /
		 * 		<= Open $mol_button_minor title <= open_title @ \Open
		 * 		<= Export $mol_button_minor title <= export_title @ \Export
		 * 		<= Save $mol_button_minor title <= save_title @ \Save
		 * ```
		 */
		@ $mol_mem
		File() {
			const obj = new this.$.$mol_pop_over()

			obj.align = () => "bottom_right"
			obj.Anchor = () => this.file_title()
			obj.bubble_content = () => [
				this.File_menu()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * file_title @ \File
		 * ```
		 */
		file_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_file_title' )
		}

		/**
		 * ```tree
		 * File_menu $mol_list rows /
		 * 	<= Open $mol_button_minor title <= open_title @ \Open
		 * 	<= Export $mol_button_minor title <= export_title @ \Export
		 * 	<= Save $mol_button_minor title <= save_title @ \Save
		 * ```
		 */
		@ $mol_mem
		File_menu() {
			const obj = new this.$.$mol_list()

			obj.rows = () => [
				this.Open(),
				this.Export(),
				this.Save()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Open $mol_button_minor title <= open_title @ \Open
		 * ```
		 */
		@ $mol_mem
		Open() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.open_title()

			return obj
		}

		/**
		 * ```tree
		 * open_title @ \Open
		 * ```
		 */
		open_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_open_title' )
		}

		/**
		 * ```tree
		 * Export $mol_button_minor title <= export_title @ \Export
		 * ```
		 */
		@ $mol_mem
		Export() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.export_title()

			return obj
		}

		/**
		 * ```tree
		 * export_title @ \Export
		 * ```
		 */
		export_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_export_title' )
		}

		/**
		 * ```tree
		 * Save $mol_button_minor title <= save_title @ \Save
		 * ```
		 */
		@ $mol_mem
		Save() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.save_title()

			return obj
		}

		/**
		 * ```tree
		 * save_title @ \Save
		 * ```
		 */
		save_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_save_title' )
		}

		/**
		 * ```tree
		 * Help $mol_pop_over
		 * 	align \bottom_right
		 * 	Anchor <= help_title @ \About
		 * 	bubble_content / <= Help_menu $mol_list rows /
		 * 		<= Updates $mol_button_minor title <= updates_title @ \Updates
		 * 		<= About $mol_button_minor title <= about_title @ \About
		 * ```
		 */
		@ $mol_mem
		Help() {
			const obj = new this.$.$mol_pop_over()

			obj.align = () => "bottom_right"
			obj.Anchor = () => this.help_title()
			obj.bubble_content = () => [
				this.Help_menu()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * help_title @ \About
		 * ```
		 */
		help_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_help_title' )
		}

		/**
		 * ```tree
		 * Help_menu $mol_list rows /
		 * 	<= Updates $mol_button_minor title <= updates_title @ \Updates
		 * 	<= About $mol_button_minor title <= about_title @ \About
		 * ```
		 */
		@ $mol_mem
		Help_menu() {
			const obj = new this.$.$mol_list()

			obj.rows = () => [
				this.Updates(),
				this.About()
			] as readonly any[]

			return obj
		}

		/**
		 * ```tree
		 * Updates $mol_button_minor title <= updates_title @ \Updates
		 * ```
		 */
		@ $mol_mem
		Updates() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.updates_title()

			return obj
		}

		/**
		 * ```tree
		 * updates_title @ \Updates
		 * ```
		 */
		updates_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_updates_title' )
		}

		/**
		 * ```tree
		 * About $mol_button_minor title <= about_title @ \About
		 * ```
		 */
		@ $mol_mem
		About() {
			const obj = new this.$.$mol_button_minor()

			obj.title = () => this.about_title()

			return obj
		}

		/**
		 * ```tree
		 * about_title @ \About
		 * ```
		 */
		about_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_about_title' )
		}
	}

}
