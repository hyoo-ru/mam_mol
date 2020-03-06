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
		return [ this.Text() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Text $mol_row sub / <= Section
	 *  ```
	 **/
	@ $mol_mem
	Text() {
		return (( obj )=>{
			obj.sub = () => [ this.Section() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Section $mol_section
	 *  	head / \Section header
	 *  	Content <= Section_content
	 *  ```
	 **/
	@ $mol_mem
	Section() {
		return (( obj )=>{
			obj.head = () => [ "Section header" ] as readonly any[]
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

