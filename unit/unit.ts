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
			return String( this.valueOf() ).split( /(?=(?:...)+$)/ ).join( this.delimiter() )
		}
		
		toString() {
			return this.prefix() + this.value_view() + this.postfix()
		}
		
		static summ( a : $mol_unit , b : $mol_unit ) {
			var Class = a.Class()
			if( Class !== b.Class() ) throw new Error( `Not same measure: ${Class} , ${b.Class()}` )
			return new Class( a.valueOf() + b.valueOf() )
		}
		
		mult( m : number ) : this {
			var Class = this.Class()
			return new Class( this.valueOf() * m )
		}
		
	}
	
}
