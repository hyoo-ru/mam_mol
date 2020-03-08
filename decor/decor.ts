namespace $ {

	export class $mol_decor< Value > {
		
		constructor(
			readonly value : Value
		) {}

		prefix() { return '' }
		valueOf() { return this.value }
		postfix() { return '' }

		toString(){
			return this.prefix() + this.valueOf() + this.postfix()
		}

	}

}
