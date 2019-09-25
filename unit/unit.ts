namespace $ {
	
	export class $mol_unit extends $mol_object {
		
		'valueOf()' : number
		
		constructor( value? : number ) {
			super()
			this[ 'valueOf()' ] = value
		}
		
		prefix() {
			return ''
		}
		
		postfix() {
			return ''
		}
		
		valueOf() {
			return this[ 'valueOf()' ]
		}
		
		delimiter() {
			return ' '
		}
		
		value_view() {
			return this.valueOf().toLocaleString()
		}
		
		toString() {
			return this.prefix() + this.value_view() + this.postfix()
		}
		
		static summ( a : $mol_unit , b : $mol_unit ) {
			var Class = a.constructor as any
			if( Class !== b.constructor ) throw new Error( `Not same measure: ${Class} , ${b.constructor}` )
			return new Class( a.valueOf() + b.valueOf() )
		}
		
		mult( m : number ) : this {
			var Class = this.constructor as any
			return new Class( this.valueOf() * m )
		}
		
	}
	
}
