namespace $ { export class $mol_pop_over_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Menu that opens on mouse over
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Menu
	 *  ```
	 **/
	sub() {
		return [this.Menu()] as readonly any[]
	}

	/**
	 *  ```
	 *  Menu $mol_row sub /
	 *  	<= File
	 *  	<= Help
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.sub = () => [this.File() , this.Help()] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  File $mol_pop_over
	 *  	align \bottom_right
	 *  	Anchor <= file_title
	 *  	bubble_content / <= File_menu
	 *  ```
	 **/
	@ $mol_mem
	File() {
		return (( obj )=>{
			obj.align = () => "bottom_right"
			obj.Anchor = () => this.file_title()
			obj.bubble_content = () => [this.File_menu()] as readonly any[]
			return obj
		})( new this.$.$mol_pop_over(  ) )
	}

	/**
	 *  ```
	 *  file_title @ \File
	 *  ```
	 **/
	file_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_file_title" )
	}

	/**
	 *  ```
	 *  File_menu $mol_list rows /
	 *  	<= Open
	 *  	<= Export
	 *  	<= Save
	 *  ```
	 **/
	@ $mol_mem
	File_menu() {
		return (( obj )=>{
			obj.rows = () => [this.Open() , this.Export() , this.Save()] as readonly any[]
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Open $mol_button_minor title <= open_title
	 *  ```
	 **/
	@ $mol_mem
	Open() {
		return (( obj )=>{
			obj.title = () => this.open_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  open_title @ \Open
	 *  ```
	 **/
	open_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_open_title" )
	}

	/**
	 *  ```
	 *  Export $mol_button_minor title <= export_title
	 *  ```
	 **/
	@ $mol_mem
	Export() {
		return (( obj )=>{
			obj.title = () => this.export_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  export_title @ \Export
	 *  ```
	 **/
	export_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_export_title" )
	}

	/**
	 *  ```
	 *  Save $mol_button_minor title <= save_title
	 *  ```
	 **/
	@ $mol_mem
	Save() {
		return (( obj )=>{
			obj.title = () => this.save_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  save_title @ \Save
	 *  ```
	 **/
	save_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_save_title" )
	}

	/**
	 *  ```
	 *  Help $mol_pop_over
	 *  	align \bottom_right
	 *  	Anchor <= help_title
	 *  	bubble_content / <= Help_menu
	 *  ```
	 **/
	@ $mol_mem
	Help() {
		return (( obj )=>{
			obj.align = () => "bottom_right"
			obj.Anchor = () => this.help_title()
			obj.bubble_content = () => [this.Help_menu()] as readonly any[]
			return obj
		})( new this.$.$mol_pop_over(  ) )
	}

	/**
	 *  ```
	 *  help_title @ \About
	 *  ```
	 **/
	help_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_help_title" )
	}

	/**
	 *  ```
	 *  Help_menu $mol_list rows /
	 *  	<= Updates
	 *  	<= About
	 *  ```
	 **/
	@ $mol_mem
	Help_menu() {
		return (( obj )=>{
			obj.rows = () => [this.Updates() , this.About()] as readonly any[]
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  Updates $mol_button_minor title <= updates_title
	 *  ```
	 **/
	@ $mol_mem
	Updates() {
		return (( obj )=>{
			obj.title = () => this.updates_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  updates_title @ \Updates
	 *  ```
	 **/
	updates_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_updates_title" )
	}

	/**
	 *  ```
	 *  About $mol_button_minor title <= about_title
	 *  ```
	 **/
	@ $mol_mem
	About() {
		return (( obj )=>{
			obj.title = () => this.about_title()
			return obj
		})( new this.$.$mol_button_minor(  ) )
	}

	/**
	 *  ```
	 *  about_title @ \About
	 *  ```
	 **/
	about_title() {
		return this.$.$mol_locale.text( "$mol_pop_over_demo_about_title" )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/pop/over/demo/-view.tree/demo.view.tree.map