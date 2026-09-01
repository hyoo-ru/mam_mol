namespace $ {

	/** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
	export class $mol_syntax2< Lexems extends { [ name : string ] : RegExp } = {} > {
		
		constructor(
			public lexems : Lexems
		) {

			for( let name in lexems ) {
				this.rules.push({
					name : name ,
					regExp : lexems[ name ] ,
					size : RegExp( '^$|' + lexems[ name ].source ).exec( '' )!.length - 1 , 
				})
			}

			const parts = '(' + this.rules.map( rule => rule.regExp.source ).join( ')|(' ) + ')'
			this.regexp = RegExp( `([\\s\\S]*?)(?:(${ parts })|$(?![^]))` , 'gmu' ) 
			
		}
		
		rules = [] as Array<{
			regExp : RegExp ,
			name : string ,
			size : number
		}>
		
		regexp : RegExp

		tokenize(
			text : string ,
			handle : ( name : string , found : string , chunks : string[] , offset : number )=> void ,
		) {
			
			let end = 0
				
			lexing : while( end < text.length ) {

				const start = end

				this.regexp.lastIndex = start
				var found = this.regexp.exec( text )!
				
				end = this.regexp.lastIndex
				if( start === end ) throw new Error( 'Empty token' )
				
				var prefix = found[ 1 ]
				if( prefix ) handle( '' , prefix , [ prefix ] , start )
				
				var suffix = found[ 2 ]
				if( !suffix ) continue

				let offset = 4
				for( let rule of this.rules ) {

					if( found[ offset - 1 ] ) {
						handle( rule.name , suffix , found.slice( offset, offset + rule.size ) , start + prefix.length )
						continue lexing
					}

					offset += rule.size + 1
				}

				$mol_fail( new Error( '$mol_syntax2 is broken' ) )

			}

		}
		
		parse(
			text : string ,
			handlers : { [ key in keyof Lexems | '' ] : ( found : string , chunks : string[] , offset : number )=> void } ,
		) : void {
			this.tokenize( text , ( name , ...args )=> handlers[ name ]( ... args ) )
		}

	}
	
}
