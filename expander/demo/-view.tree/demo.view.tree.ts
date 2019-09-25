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
		return [].concat( this.Expander() )
	}

	/**
	 *  ```
	 *  Expander $mol_expander
	 *  	title \Lorem Ipsum
	 *  	Content $mol_filler
	 *  ```
	 **/
	@ $mol_mem
	Expander() {
		return (( obj )=>{
			obj.title = () => "Lorem Ipsum"
			obj.Content = () => (( obj )=>{
			return obj
		})( new this.$.$mol_filler(  ) )
			return obj
		})( new this.$.$mol_expander(  ) )
	}

} }

