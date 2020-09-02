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
		 * sub / <= Menu
		 * ```
		 */
		sub() {
			return [
				this.Menu()
			] as readonly any[]
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
		 * open_title @ \Open
		 * ```
		 */
		open_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_open_title' )
		}

		/**
		 * ```tree
		 * Open $mol_button_minor title <= open_title
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
		 * export_title @ \Export
		 * ```
		 */
		export_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_export_title' )
		}

		/**
		 * ```tree
		 * Export $mol_button_minor title <= export_title
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
		 * save_title @ \Save
		 * ```
		 */
		save_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_save_title' )
		}

		/**
		 * ```tree
		 * Save $mol_button_minor title <= save_title
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
		 * File_menu $mol_list rows /
		 * 	<= Open
		 * 	<= Export
		 * 	<= Save
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
		 * File $mol_pop_over
		 * 	align \bottom_right
		 * 	Anchor <= file_title
		 * 	bubble_content / <= File_menu
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
		 * help_title @ \About
		 * ```
		 */
		help_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_help_title' )
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
		 * Updates $mol_button_minor title <= updates_title
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
		 * about_title @ \About
		 * ```
		 */
		about_title() {
			return this.$.$mol_locale.text( '$mol_pop_over_demo_about_title' )
		}

		/**
		 * ```tree
		 * About $mol_button_minor title <= about_title
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
		 * Help_menu $mol_list rows /
		 * 	<= Updates
		 * 	<= About
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
		 * Help $mol_pop_over
		 * 	align \bottom_right
		 * 	Anchor <= help_title
		 * 	bubble_content / <= Help_menu
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
		 * Menu $mol_row sub /
		 * 	<= File
		 * 	<= Help
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
	}

}
