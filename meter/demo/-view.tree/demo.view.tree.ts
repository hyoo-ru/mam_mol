namespace $ { export class $mol_meter_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Real time offset and size metering
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_meter_demo_title" )
	}

	/**
	 *  ```
	 *  plugins / <= Meter
	 *  ```
	 **/
	plugins() {
		return [ this.Meter() ] as readonly any[]
	}

	top() {
		return this.Meter().top(  )
	}

	height() {
		return this.Meter().height(  )
	}

	/**
	 *  ```
	 *  Meter $mol_meter
	 *  	top => top
	 *  	height => height
	 *  ```
	 **/
	@ $mol_mem
	Meter() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_meter(  ) )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Top
	 *  	<= Height
	 *  ```
	 **/
	sub() {
		return [ this.Top() , this.Height() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Top $mol_view sub /
	 *  	\Offset from top: 
	 *  	<= top
	 *  ```
	 **/
	@ $mol_mem
	Top() {
		return (( obj )=>{
			obj.sub = () => [ "Offset from top: " , this.top() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Height $mol_view sub /
	 *  	\Component height: 
	 *  	<= height
	 *  ```
	 **/
	@ $mol_mem
	Height() {
		return (( obj )=>{
			obj.sub = () => [ "Component height: " , this.height() ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

} }

