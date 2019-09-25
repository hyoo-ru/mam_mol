namespace $ {
	export interface $mol_syntax_token {
		name : string
		found : string
		chunks : string[]
	}
	
	export class $mol_syntax {
		
		constructor( lexems : { [ name : string ] : RegExp } ) {
			this[ 'lexems()' ] = lexems
		}
		
		'lexems()' : { [ name : string ] : RegExp }
		lexems() {
			return this[ 'lexems()' ]
		}
		
		'rules()' : { regExp : RegExp , name : string , size : number }[]
		rules() {
			let rules = this[ 'rules()' ] 
			if( rules ) return rules
			
			rules = []
			let lexems = this.lexems()
			
			for( let name in lexems ) {
				rules.push({
					name : name ,
					regExp : lexems[ name ] ,
					size : RegExp( '^$|' + lexems[ name ].source ).exec( '' ).length - 1 , 
				})
			}
			
			return this[ 'rules()' ] = rules
		}
		
		'regExp()' : RegExp
		regExp() {
			let regExp = this[ 'regExp()' ]
			if( regExp ) return regExp
			
			const parts = '(' + this.rules().map( rule => rule.regExp.source ).join( ')|(' ) + ')'
			regExp = RegExp( `([^]*?)(?:(${parts})|$(?![^]))` , 'gm' ) 
			
			return this[ 'regExp()' ] = regExp
		}
		
		tokenize( text : string ) {
			const tokens : $mol_syntax_token[] = []
			
			const rules = this.rules()
			const regExp = this.regExp()
			const regExpSize = RegExp( '^$|' + regExp.source ).exec( '' ).length - 1
			
			let position = 0
				
			parsing : while( position < text.length ) {
				
				regExp.lastIndex = position
				var found = regExp.exec( text )
				
				if( position === regExp.lastIndex ) throw new Error( 'Empty token' )
				position = regExp.lastIndex
				
				var prefix = found[ 1 ]
				if( prefix ){
					tokens.push({
						name : '' ,
						found : prefix ,
						chunks : [] ,
					})
				}
				
				var suffix = found[ 2 ]
				if( suffix ){
					let offset= 4
					for( let rule of rules ) {
						if( found[ offset - 1 ] ){
							tokens.push({
								name : rule.name ,
								found : suffix ,
								chunks : found.slice( offset, offset + rule.size )
							})
							continue parsing
						}
						offset += rule.size + 1
					}
					throw new Error( 'Something wrong' )
				}
			}
			
			return tokens
		}
		
	}
}
