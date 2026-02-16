namespace $ {
	
	export class $mol_spell_morphs extends Set<string> {
		
		readonly max: number = 0
		
		constructor( items: string[] = [] ) {
			
			super( items )
			
			for( const item of items ) {
				if( item.length <= this.max ) continue
				this.max = item.length
			}
			
		}
		
	}
	
	/**
	 * Draft of compact spell checker.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_spell_demo
	 */
	export class $mol_spell extends Object {
		
		constructor(
			readonly head = new $mol_spell_morphs,
			readonly prefix = new $mol_spell_morphs,
			readonly root = new $mol_spell_morphs,
			readonly postfix = new $mol_spell_morphs,
			readonly foot = new $mol_spell_morphs,
		) {
			super()
		}
		
		@ $mol_memo.method
		regexp_word() {
			return $mol_regexp.from([
				$mol_regexp.begin,
				$mol_regexp.repeat_greedy( this.regexp_token(), 1 ),
				$mol_regexp.end,
			])
		}
		
		@ $mol_memo.method
		regexp_token() {
			return $mol_regexp.from([
				{ head: $mol_regexp.repeat_greedy( this.regexp_head(), 0, 1 ) },
				{ prefix: $mol_regexp.repeat_greedy( this.regexp_prefix() ) },
				{ root: this.regexp_root() },
				{ postfix: $mol_regexp.repeat_greedy( this.regexp_postfix() ) },
				{ foot: $mol_regexp.repeat_greedy( this.regexp_foot(), 0, 1 ) },
				{ join: [[ '-' ]] },
			])
		}
		
		@ $mol_memo.method
		regexp_head() {
			return $mol_regexp.vary( [ ... this.head ], 'gsu' )
		}
		
		@ $mol_memo.method
		regexp_prefix() {
			return $mol_regexp.vary( [ ... this.prefix ], 'gsu' )
		}
		
		@ $mol_memo.method
		regexp_root() {
			return $mol_regexp.vary( [ ... this.root ], 'gsu' )
		}
		
		@ $mol_memo.method
		regexp_postfix() {
			return $mol_regexp.vary( [ ... this.postfix ], 'gsu' )
		}
		
		@ $mol_memo.method
		regexp_foot() {
			return $mol_regexp.vary( [ ... this.foot ], 'gsu' )
		}
		
		check( word: string ) {
			return this.regexp_word().test( word )
		}
		
		split( word: string ) {
			const found = [ ... word.matchAll( this.regexp_token() ) ]
			return found.flatMap( token => token.groups ? [
				token.groups?.head ?? '',
				... [ ... ( token.groups?.prefix ?? '' ).matchAll( this.regexp_prefix() ) ].map( f => f[0] ),
				token.groups?.root ?? '',
				... [ ... ( token.groups?.postfix ?? '' ).matchAll( this.regexp_postfix() ) ].map( f => f[0] ),
				token.groups?.foot ?? '',
				token.groups?.join ?? '',
			] : token[0] ).filter( Boolean )
		}
		
	}
}
