namespace $ {

	/** Syntax error with cordinates and source line snippet. */
	export class $mol_error_syntax extends SyntaxError {
		constructor (
			message: string,
			line: string,
			public span: $mol_span,
		) {
			super(`${ message }\n${ span }\n${ line.substring( 0 , span.col - 1 ).replace( /\S/g, ' ' ) }${ ''.padEnd( span.length, '!' ) }\n${ line }`)
		}

	}

}
