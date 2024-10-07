namespace $ {

	/** Position in any resource. */
	export class $mol_span extends $mol_object2 {

		constructor(
			readonly uri: string ,
			readonly source: string ,
			readonly row: number ,
			readonly col: number ,
			readonly length: number ,
		) {
			super()
			this[ Symbol.toStringTag ] = this.uri + ( '#' + this.row + ':' + this.col + '/' + this.length )
		}

		/** Span for begin of unknown resource */
		static unknown = $mol_span.begin('?')

		/** Makes new span for begin of resource. */
		static begin( uri: string, source = '' ) {
			return new $mol_span( uri , source, 1 , 1 , 0 )
		}

		/** Makes new span for end of resource. */
		static end( uri: string , source: string ) {
			return new $mol_span( uri , source, 1 , source.length + 1 , 0 )
		}

		/** Makes new span for entire resource. */
		static entire( uri: string , source: string ) {
			return new $mol_span( uri , source, 1 , 1 , source.length )
		}

		toString() {
			return this[ Symbol.toStringTag ]
		}

		toJSON() {
			return {
				uri: this.uri,
				row: this.row,
				col: this.col,
				length: this.length
			}
		}

		/** Makes new error for this span. */
		error( message : string , Class = Error ) {
			return new Class( `${message} (${this})` )
		}

		/** Makes new span for same uri. */
		span( row : number , col : number , length : number ) {
			return new $mol_span( this.uri , this.source, row , col , length )
		}

		/** Makes new span after end of this. */
		after( length = 0 ) {
			return new $mol_span( this.uri , this.source, this.row , this.col + this.length , length )
		}

		/** Makes new span between begin and end. */
		slice( begin: number, end = -1 ) {
			let len = this.length
			
			if( begin < 0 ) begin += len
			if( end < 0 ) end += len

			if (begin < 0 || begin > len) this.$.$mol_fail( this.error( `Begin value '${begin}' out of range`, RangeError ) )
			if (end < 0 || end > len) this.$.$mol_fail( this.error( `End value '${end}' out of range`, RangeError ) )
			if (end < begin) this.$.$mol_fail( this.error( `End value '${end}' can't be less than begin value`, RangeError ) )

			return this.span( this.row , this.col + begin , end - begin )
		}

	}

}
