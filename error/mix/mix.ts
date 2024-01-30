namespace $ {

	/** @deprecated Use AggregateError instead */
	export class $mol_error_mix extends Error {

		errors : Error[]

		constructor( message : string , ... errors : Error[] ) {

			super( message )
			
			this.errors = errors

			if( errors.length ) {

				const stacks = [ ... errors.map( error => error.stack ) , this.stack ]
				
				const diff = $mol_diff_path( ... stacks.map( stack => {
					if( !stack ) return []
					return stack.split( '\n' ).reverse()
				} ) )
				
				const head = diff.prefix.reverse().join( '\n' )
				const tails = diff.suffix.map( path => path.reverse().map( line => line.replace( /^(?!\s+at)/ , '\tat (.) ' ) ).join( '\n' ) ).join( '\n\tat (.) -----\n' )

				this.stack = `Error: ${ this.constructor.name }\n\tat (.) /"""\\\n${ tails }\n\tat (.) \\___/\n${ head }`
				this.message += errors.map( error => '\n' + error.message ).join( '' )

			}

		}

		toJSON() {
			return this.message
		}

	}

}
