namespace $ {

	export class $mol_build2_source_css extends $mol_build2_source {

		static refs = (()=> {
			const { repeat_greedy, latin_only } = $mol_regexp

			const word = repeat_greedy( latin_only, 1 )
			const attr_name = [ word, repeat_greedy([ '_', word ], 1 ) ] as const
			const fqn_name = [ word, repeat_greedy([ /[._]/, word ], 1 ) ] as const
			const attr_mark = $mol_regexp.vary([ '--', '[' ])

			return $mol_regexp.from({
				attr: [ attr_mark, { name: attr_name } ],
				fqn: [ '$', { name: fqn_name } ],
			}, { ignoreCase: true })
		})()

		static remarks = (()=> {
			const { repeat, char_any, line_end } = $mol_regexp

			return $mol_regexp.from({
				inline: [ '//', repeat( char_any ), line_end ],
				block: [ '/*', repeat( char_any ), '*/' ],
			})
		})()

		static match( file: $mol_file2 ): boolean {
			return /\.css?$/.test( file.name() )
		}

		@ $mol_mem
		deps() {
			const deps = super.deps()
			deps.set( this.lookup( 'mol/style/attach' ), 0 )

			if( /\.view\.css$/.test( this.file().name() ) ) {
				const tree = this.file().parent().resolve( this.file().name().replace( /css$/, 'tree' ) )
				deps.set( tree, 0 )
			}

			const scan = ( source: string )=> {
				for( const line of source.split( '\n' ) ) {
					const priority = this.priority( line )

					for( const token of line.matchAll( $mol_build2_source_css.refs ) ) {
						if( !token.groups ) continue

						const name = token.groups.name
						if( token.groups.attr ) {
							deps.set( this.lookup( name.replace( /[._-]/g , '/' ) ), priority )
						} else if( token.groups.fqn ) {
							deps.set( this.lookup( name.replace( /[._]/g , '/' ) ), priority )
						}
					}
				}
			}

			for( const token of String( this.file().text() ).matchAll( $mol_build2_source_css.remarks ) ) {
				if( !token.groups ) scan( token[0] )
			}

			return deps
		}

	}

}
