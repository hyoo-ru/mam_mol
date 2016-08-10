class $mol_unit extends $mol_object {
	
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
		return this['valueOf()']
	}
	
	delimiter() {
		return ' '
	}
	
	valueView() {
		return String( this.valueOf() ).split( /(?=(?:...)+$)/ ).join( this.delimiter() )
	}
	
	toString( ) {
		return this.prefix() + this.valueView() + this.postfix()
	}
	
}
