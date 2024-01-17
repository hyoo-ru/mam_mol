namespace $ {
	export class $mol_mutable_demo extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\const articles_immutable = {
		 * 	\	hello: {
		 * 	\		title: 'Hello, World',
		 * 	\		tags: [ 'javascript', 'immutablity' ],
		 * 	\		author: {
		 * 	\			name: 'Jin',
		 * 	\		},
		 * 	\	},
		 * 	\}
		 * 	\
		 * 	\const articles_mutable = $mol_mutable( articles_immutable )
		 * 	\
		 * 	\articles_mutable.hello.title( prev => prev + '!' )
		 * 	\articles_mutable.hello.tags( prev => [ ... prev, 'hello' ] )
		 * 	\articles_mutable.hello.author.name( ()=> 'John' )
		 * 	\articles_mutable.bye( ()=> ({
		 * 	\	title: 'Bye, World!',
		 * 	\	tags: [],
		 * 	\	author: null,
		 * 	\}) )
		 * 	\
		 * 	\const articles_new = articles_mutable()
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "const articles_immutable = {\n\thello: {\n\t\ttitle: 'Hello, World',\n\t\ttags: [ 'javascript', 'immutablity' ],\n\t\tauthor: {\n\t\t\tname: 'Jin',\n\t\t},\n\t},\n}\n\nconst articles_mutable = $mol_mutable( articles_immutable )\n\narticles_mutable.hello.title( prev => prev + '!' )\narticles_mutable.hello.tags( prev => [ ... prev, 'hello' ] )\narticles_mutable.hello.author.name( ()=> 'John' )\narticles_mutable.bye( ()=> ({\n\ttitle: 'Bye, World!',\n\ttags: [],\n\tauthor: null,\n}) )\n\nconst articles_new = articles_mutable()"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\mutable
		 * 	\immutable
		 * ```
		 */
		tags() {
			return [
				"mutable",
				"immutable"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects / \Algorithm/Lens
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Lens"
			] as readonly any[]
		}
	}
	
}

