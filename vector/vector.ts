namespace $ {

	export class $mol_vector< Value , Length extends number > extends Array< Value > {

		get length() {
			return super.length as Length
		}

		constructor( ... values : Value[] & { length : Length } ) { super( ... values ) }
		
		map< Res >(
			convert : ( value : Value , index : number , array : this ) => Res ,
			self? : any ,
		) : $mol_vector< Res , Length > {
			return super.map( convert as any , self ) as any
		}

		merged< Patch >(
			patches : readonly Patch[] & { length : Length } ,
			combine : ( value : Value , patch : Patch ) => Value ,
		) : this {
			return this.map( ( value , index )=> combine( value , patches[ index ] ) ) as any
		}

		limited(
			this : $mol_vector< number , Length > ,
			limits : readonly ( readonly [ number , number ] )[] & { length : Length } ,
		) : this {
			return this.merged( limits , ( value , [ min , max ] )=> ( value < min ) ? min : ( value > max ) ? max : value ) as any
		}

		added0( this : $mol_vector< number , Length > , diff : number ) : this {
			return this.map( value => value + diff ) as any
		}

		added1( this : $mol_vector< number , Length > , diff : readonly number[] & { length : Length } ) : this {
			return this.merged( diff , ( a , b )=> a + b ) as any
		}

		substracted0( this : $mol_vector< number , Length > , diff : number ) : this {
			return this.map( value => value - diff ) as any
		}

		substracted1( this : $mol_vector< number , Length > , diff : readonly number[] & { length : Length } ) : this {
			return this.merged( diff , ( a , b )=> a - b ) as any
		}

		multed0( this : $mol_vector< number , Length > , mult : number ) : this {
			return this.map( value => value * mult ) as any
		}

		multed1(
			this : $mol_vector< number , Length > ,
			mults : readonly number[] & { length : Length } ,
		) : this {
			return this.merged( mults , ( a , b )=> a * b ) as any
		}

		divided0( this : $mol_vector< number , Length > , mult : number ) : this {
			return this.map( value => value / mult ) as any
		}

		divided1(
			this : $mol_vector< number , Length > ,
			mults : readonly number[] & { length : Length } ,
		) : this {
			return this.merged( mults , ( a , b )=> a / b ) as any
		}

		powered0( this : $mol_vector< number , Length > , mult : number ) : this {
			return this.map( value => value ** mult ) as any
		}

		expanded1(
			this : $mol_vector< $mol_vector_range< number > , Length > ,
			point : readonly number[] & { length : Length } ,
		) : this {
			return this.merged( point , ( range , value )=> range.expanded0( value ) ) as any
		}

		expanded2(
			this : $mol_vector< $mol_vector_range< number > , Length > ,
			point : readonly ( readonly [ number , number ] )[] & { length : Length } ,
		) : this {
			return this.merged( point , ( range1 , range2 )=> {
				let next = range1
				const Range = range1.constructor as typeof $mol_vector_range
				if (range1[0] > range2[0]) next = new Range(range2[0], next.max);
				if (range1[1] < range2[1]) next = new Range(next.min, range2[1])

				return next
			}) as any
		}

		center< Item extends $mol_vector< number, number > >(
			this : $mol_vector< Item , Length > ,
		) : Item {
			const Result = this[0].constructor as typeof $mol_vector
			return new Result( ... this[0].map( (_,i)=> this.reduce( ( sum, point )=> sum + point[i], 0 ) / this.length ) ) as any
		}

		distance(
			this : $mol_vector< $mol_vector< number, number >, Length > ,
		): number {
			let distance = 0
			
			for( let i = 1; i < this.length; ++i ) {
				distance += this[ i - 1 ].reduce( ( sum, min, j )=> sum + ( min - this[i][j] ) ** 2, 0 ) ** ( 1 / this[i].length )
			}
			
			return distance
		}

		transponed(
			this : $mol_vector< $mol_vector< number, number >, Length > ,
		): $mol_vector< $mol_vector< number, Length >, typeof this[0]['length'] > {
			return this[0].map( ( _, i )=> this.map( row => row[i] ) )
		}

		get x() { return this[0] }
		set x( next: Value ) { this[0] = next }
		
		get y() { return this[1] }
		set y( next: Value ) { this[1] = next }
		
		get z() { return this[2] }
		set z( next: Value ) { this[2] = next }
		
	}

	export class $mol_vector_1d< Value > extends $mol_vector< Value , 1 > { }

	export class $mol_vector_2d< Value > extends $mol_vector< Value , 2 > {}

	export class $mol_vector_3d< Value > extends $mol_vector< Value , 3 > {}

	export class $mol_vector_range< Value > extends $mol_vector< Value , 2 > {
		
		0: Value
		1: Value
		
		constructor( min: Value, max = min ) {
			super( min, max )
			this[0] = min
			this[1] = max
		}
		
		get min() { return this[0] }
		set min( next: Value ) { this[0] = next }
		
		get max() { return this[1] }
		set max( next: Value ) { this[1] = next }
		
		get inversed() {
			return new ( this.constructor as typeof $mol_vector_range )( this.max , this.min )
		}

		expanded0( value : Value ) {
			const Range = this.constructor as typeof $mol_vector_range
			let range = this as $mol_vector_range< Value >
			
			if( value > range.max ) range = new Range( range.min , value )
			if( value < range.min ) range = new Range( value , range.max )

			return range
		}

	}

	export let $mol_vector_range_full = new $mol_vector_range( Number.NEGATIVE_INFINITY , Number.POSITIVE_INFINITY )

	export class $mol_vector_matrix<
		Width extends number ,
		Height extends number ,
	> extends $mol_vector< readonly number[] & { length : Width } , Height > {

		added2(
			diff : readonly ( readonly number[] & { length : Width } )[] & { length : Height }
		) : this {
			return this.merged( diff , ( a , b )=> a.map( ( a2 , index ) => a2 + b[ index ] ) as any ) as any
		}

		multed2(
			diff : readonly ( readonly number[] & { length : Width } )[] & { length : Height }
		) : this {
			return this.merged( diff , ( a , b )=> a.map( ( a2 , index ) => a2 * b[ index ] ) as any ) as any
		}

	}

}
