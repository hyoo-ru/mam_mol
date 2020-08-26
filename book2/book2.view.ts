namespace $.$$ {

	export class $mol_book2 extends $.$mol_book2 {
		
		title() {
			return this.pages().map( page => page.title() ).reverse().join( ' | ' )
		}

		@ $mol_mem
		sub() {
			
			const next = [  ... this.pages().slice(),this.Placeholder() ]
			
			const prev = $mol_mem_cached( ()=> this.sub() ) ?? []
			
			for( let i = 1 ; i++ ; ) {
				
				const p = prev[ prev.length - i ]
				const n = next[ next.length - i ]
				
				if( !n ) break

				if( p === n ) continue

				new $mol_after_timeout( 100,()=> n.dom_node().scrollIntoView({ behavior : 'smooth' }) )
				break

			}

			return next
		}

	}

}
