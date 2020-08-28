namespace $ {

	/** Position in any resource. */
	export class $mol_span extends $mol_object2 {

		constructor(
			readonly uri : string ,
			readonly row : number ,
			readonly col : number ,
			readonly length : number ,
		) { super() }

		/** Span for begin of unknown resource */
		static unknown = $mol_span.begin('')

		/** Makes new span for begin of resource. */
		static begin( uri : string ) {
			return new $mol_span( uri , 0 , 0 , 0 )
		}

		/** Makes new span for entire resource. */
		static entire( uri : string , length : number ) {
			return new $mol_span( uri , 0 , 0 , length )
		}

		toString() {
			return `${ this.uri }#${ this.row }:${ this.col }/${ this.length }`
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
			return new Class( `${message}\n${this}` )
		}

		/** Makes new span for same uri. */
		span( row : number , col : number , length : number ) {
			return new $mol_span( this.uri , row , col , length )
		}

		/** Makes new span after end of this. */
		after( length : number ) {
			return new $mol_span( this.uri , this.row , this.col + this.length , length )
		}

		/** Makes new span between begin and end. */
		slice(begin: number, end: number) {
			let len = this.length

			if (begin < 0 || begin > len) return this.$.$mol_fail(`Begin value '${begin}' out of range ${this}`)

			len = len - begin

			if (end < 0 || end > len) return this.$.$mol_fail(`End value '${end}' out of range ${this}`)

			return this.span( this.row , this.col + begin , end )
		}

	}

}
