namespace $ {
	export class $mol_code_demo extends $mol_demo_small {

		/**
		 * ```tree
		 * title @ \Barcode scanner with various formats support
		 * ```
		 */
		title() {
			return this.$.$mol_locale.text( '$mol_code_demo_title' )
		}

		/**
		 * ```tree
		 * sub /
		 * 	<= Qr
		 * 	<= Matrix
		 * 	<= Upc_e
		 * 	<= Upc_a
		 * 	<= Ean_8
		 * 	<= Ean_13
		 * 	<= Code_128
		 * 	<= Code_39
		 * 	<= Itf
		 * ```
		 */
		sub() {
			return [
				this.Qr(),
				this.Matrix(),
				this.Upc_e(),
				this.Upc_a(),
				this.Ean_8(),
				this.Ean_13(),
				this.Code_128(),
				this.Code_39(),
				this.Itf()
			] as readonly any[]
		}

		/**
		 * ```tree
		 * Qr $mol_code format \QR_CODE
		 * ```
		 */
		@ $mol_mem
		Qr() {
			const obj = new this.$.$mol_code()

			obj.format = () => "QR_CODE"

			return obj
		}

		/**
		 * ```tree
		 * Matrix $mol_code format \DATA_MATRIX
		 * ```
		 */
		@ $mol_mem
		Matrix() {
			const obj = new this.$.$mol_code()

			obj.format = () => "DATA_MATRIX"

			return obj
		}

		/**
		 * ```tree
		 * Upc_e $mol_code format \UPC_E
		 * ```
		 */
		@ $mol_mem
		Upc_e() {
			const obj = new this.$.$mol_code()

			obj.format = () => "UPC_E"

			return obj
		}

		/**
		 * ```tree
		 * Upc_a $mol_code format \UPC_A
		 * ```
		 */
		@ $mol_mem
		Upc_a() {
			const obj = new this.$.$mol_code()

			obj.format = () => "UPC_A"

			return obj
		}

		/**
		 * ```tree
		 * Ean_8 $mol_code format \EAN_8
		 * ```
		 */
		@ $mol_mem
		Ean_8() {
			const obj = new this.$.$mol_code()

			obj.format = () => "EAN_8"

			return obj
		}

		/**
		 * ```tree
		 * Ean_13 $mol_code format \EAN_13
		 * ```
		 */
		@ $mol_mem
		Ean_13() {
			const obj = new this.$.$mol_code()

			obj.format = () => "EAN_13"

			return obj
		}

		/**
		 * ```tree
		 * Code_128 $mol_code format \CODE_128
		 * ```
		 */
		@ $mol_mem
		Code_128() {
			const obj = new this.$.$mol_code()

			obj.format = () => "CODE_128"

			return obj
		}

		/**
		 * ```tree
		 * Code_39 $mol_code format \CODE_39
		 * ```
		 */
		@ $mol_mem
		Code_39() {
			const obj = new this.$.$mol_code()

			obj.format = () => "CODE_39"

			return obj
		}

		/**
		 * ```tree
		 * Itf $mol_code format \ITF
		 * ```
		 */
		@ $mol_mem
		Itf() {
			const obj = new this.$.$mol_code()

			obj.format = () => "ITF"

			return obj
		}
	}

}
