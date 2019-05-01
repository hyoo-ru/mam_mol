namespace $.$$ {
	export class $mol_image2 extends $.$mol_image2 {

		@ $mol_mem
		background() {
			return this.links().map( link => `url("${ link }")` ).join( ' , ' )
		}

		@ $mol_mem
		height() {
			return `${ 100 / this.aspect() }%`
		}

	}
}
