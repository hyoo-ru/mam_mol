namespace $ { export class $mol_expander_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Simple spoiler
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_expander_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Expander
	 *  ```
	 **/
	sub() {
		return [this.Expander()] as readonly any[]
	}

	/**
	 *  ```
	 *  Expander $mol_expander
	 *  	title \Lorem Ipsum
	 *  	Content <= Content
	 *  ```
	 **/
	@ $mol_mem
	Expander() {
		return (( obj )=>{
			obj.title = () => "Lorem Ipsum"
			obj.Content = () => this.Content()
			return obj
		})( new this.$.$mol_expander(  ) )
	}

	/**
	 *  ```
	 *  Content $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Content() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
	}

} }
//@ sourceMappingURL=/home/runner/work/mol/mol/mol/expander/demo/-view.tree/demo.view.tree.map