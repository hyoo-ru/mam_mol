module $.$mol {
	export class $mol_texter extends $.$mol_texter {
		
		@ $mol_prop()
		tokensFlow() {
			return $mol_syntax_md_flow.tokenize( this.text() )
		}
		
		blockers() {
			return this.tokensFlow().map( ( token , index )=> {
				return this.blocker( index )
			} )
		}
		
		blockType( index : number ) {
			return this.tokensFlow()[ index ].name
		}
		
		blockContent( index : number ) {
			return [ this.tokensFlow()[ index ].found ]
		}
		
	}
}
