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
		
		static head = new $mol_spell_morphs
		static prefix = new $mol_spell_morphs
		static root = new $mol_spell_morphs
		// static infix = new $mol_spell_morphs
		static postfix = new $mol_spell_morphs
		static foot = new $mol_spell_morphs
		
		static test( word: string ) {
			
			const head_max = Math.min( this.head.max, word.length - 2 )
			
			for( let i = head_max; i > 0; --i ) {
				const head = word.slice( 0, i )
				if( !this.head.has( head ) ) continue
				if( this.test_tail( word.slice( i ) ) ) return true
			}
			
			return this.test_tail( word )
		}
		
		static test_tail( word: string ) {
			
			const foot_max = Math.min( this.foot.max, word.length - 2 )
			
			for( let i = foot_max; i > 0; --i ) {
				const foot = word.slice( -i )
				if( !this.foot.has( foot ) ) continue
				if( this.test_body( word.slice( 0, -i ) ) ) return true
			}
			
			return this.test_body( word )
		}
		
		static test_body( word: string ) {
			
			if( !word ) return true
			
			const prefix_max = Math.min( this.prefix.max, word.length - 2 )
			
			for( let i = prefix_max; i > 0; --i ) {
				const prefix = word.slice( 0, i )
				if( !this.prefix.has( prefix ) ) continue
				if( this.test_body( word.slice( i ) ) ) return true
			}
			
			const postfix_max = Math.min( this.postfix.max, word.length - 2 )
			
			for( let i = postfix_max; i > 0; --i ) {
				const postfix = word.slice( -i )
				if( !this.postfix.has( postfix ) ) continue
				if( this.test_body( word.slice( 0, -i ) ) ) return true
			}
			
			const root_max = Math.min( this.root.max, word.length )
			
			for( let i = root_max; i > 0; --i ) {
				const root = word.slice( 0, i )
				if( !this.root.has( root ) ) continue
				if( this.test_body( word.slice( i ) ) ) return true
			}
			
			return false
		}
		
	}
}
