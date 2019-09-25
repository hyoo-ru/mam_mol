namespace $ { export class $mol_section_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Section with header
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_section_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Text
	 *  ```
	 **/
	sub() {
		return [].concat( this.Text() )
	}

	/**
	 *  ```
	 *  Text $mol_row sub / <= Section
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Section() )
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Section $mol_section
	 *  	head \Section header
	 *  	Content <= Section_content
	 *  ```
	 **/
	@ $mol_mem
	Section() {
		return (( obj )=>{
			obj.head = () => "Section header"
			obj.Content = () => this.Section_content()
			return obj
		})( new this.$.$mol_section(  ) )
	}

	/**
	 *  ```
	 *  Section_content $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Section_content() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

} }

