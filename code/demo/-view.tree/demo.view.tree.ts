namespace $ { export class $mol_code_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Barcode scanner with various formats support
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_code_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Qr
	 *  	<= Matrix
	 *  	<= Upc_e
	 *  	<= Upc_a
	 *  	<= Ean_8
	 *  	<= Ean_13
	 *  	<= Code_128
	 *  	<= Code_39
	 *  	<= Itf
	 *  ```
	 **/
	sub() {
		return [ this.Qr() , this.Matrix() , this.Upc_e() , this.Upc_a() , this.Ean_8() , this.Ean_13() , this.Code_128() , this.Code_39() , this.Itf() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Qr $mol_code format \QR_CODE
	 *  ```
	 **/
	@ $mol_mem
	Qr() {
		return (( obj )=>{
			obj.format = () => "QR_CODE"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Matrix $mol_code format \DATA_MATRIX
	 *  ```
	 **/
	@ $mol_mem
	Matrix() {
		return (( obj )=>{
			obj.format = () => "DATA_MATRIX"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Upc_e $mol_code format \UPC_E
	 *  ```
	 **/
	@ $mol_mem
	Upc_e() {
		return (( obj )=>{
			obj.format = () => "UPC_E"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Upc_a $mol_code format \UPC_A
	 *  ```
	 **/
	@ $mol_mem
	Upc_a() {
		return (( obj )=>{
			obj.format = () => "UPC_A"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Ean_8 $mol_code format \EAN_8
	 *  ```
	 **/
	@ $mol_mem
	Ean_8() {
		return (( obj )=>{
			obj.format = () => "EAN_8"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Ean_13 $mol_code format \EAN_13
	 *  ```
	 **/
	@ $mol_mem
	Ean_13() {
		return (( obj )=>{
			obj.format = () => "EAN_13"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Code_128 $mol_code format \CODE_128
	 *  ```
	 **/
	@ $mol_mem
	Code_128() {
		return (( obj )=>{
			obj.format = () => "CODE_128"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Code_39 $mol_code format \CODE_39
	 *  ```
	 **/
	@ $mol_mem
	Code_39() {
		return (( obj )=>{
			obj.format = () => "CODE_39"
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  Itf $mol_code format \ITF
	 *  ```
	 **/
	@ $mol_mem
	Itf() {
		return (( obj )=>{
			obj.format = () => "ITF"
			return obj
		})( new this.$.$mol_code(  ) )
	}

} }

