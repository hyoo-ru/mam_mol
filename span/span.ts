namespace $ {

	/** Position in any resource. */
	export class $mol_span {

		constructor(
			readonly uri : string ,
			readonly row : number ,
			readonly col : number ,
			readonly length : number ,
		) {}

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
			return `${ this.uri }#${ this.row }:${ this.col }-${ this.length }`
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

	}

}
