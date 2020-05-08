namespace $ { export class $mol_frame_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  title @ \Another page inside that
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_frame_demo_title" )
	}

	/**
	 *  ```
	 *  sub / <= Frame
	 *  ```
	 **/
	sub() {
		return [this.Frame()] as readonly any[]
	}

	/**
	 *  ```
	 *  Frame $mol_frame uri \https://mol.js.org/
	 *  ```
	 **/
	@ $mol_mem
	Frame() {
		return (( obj )=>{
			obj.uri = () => "https://mol.js.org/"
			return obj
		})( new this.$.$mol_frame(  ) )
	}

} }
