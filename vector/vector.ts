namespace $ {

	export class $mol_vector< Value , Length extends number > extends Array< Value > {

		length : Length

		constructor( ... values : Value[] & { length : Length } ) { super( ... values ) }
		
		limited( this : $mol_vector< number , Length > , ... limit : [ number , number ][] & { length : Length } ) : this {
			
			return new ( this.constructor as any )( ... this.map( ( value , index )=> {
				
				const range = new $mol_vector_range( ... limit[ index ] )
				
				if( value < range.min ) return range.min
				if( value > range.max ) return range.max
				
				return value
			} ) )
			
		}

		added( this : $mol_vector< number , Length > , ... diff : number[] & { length : Length } ) : this {
			
			return new ( this.constructor as any )( ... this.map( ( value , index )=> value + diff[ index ] ) )
			
		}

		multed( this : $mol_vector< number , Length > , ... diff : number[] & { length : Length } ) : this {
			
			return new ( this.constructor as any )( ... this.map( ( value , index )=> value * diff[ index ] ) )
			
		}

	}

	export class $mol_vector_1d< Value > extends $mol_vector< Value , 1 > {
		[0]: Value
		get x() { return this[0] }
	}

	export class $mol_vector_2d< Value > extends $mol_vector< Value , 2 > {
		[0]: Value
		[1]: Value
		get x() { return this[0] }
		get y() { return this[1] }
	}

	export class $mol_vector_3d< Value > extends $mol_vector< Value , 3 > {
		[0]: Value
		[1]: Value
		[3]: Value
		get x() { return this[0] }
		get y() { return this[1] }
		get z() { return this[2] }
	}


	export class $mol_vector_range< Value > extends $mol_vector< Value , 2 > {
		[0]: Value
		[1]: Value
		get min() { return this[0] }
		get max() { return this[1] }
	}

}
