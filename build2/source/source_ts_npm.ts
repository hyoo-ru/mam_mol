namespace $ {

	type ts_Node = import('typescript').Node
	type ts_Identifier = import('typescript').Identifier
	type ts_ObjectBindingPattern = import('typescript').ObjectBindingPattern

	export class $mol_build2_source_ts_npm extends $mol_object2 {

		deps = new Set< string >()

		members = new Map< string, Set< string > | null >()

		aliases = new Map< string, string >()

		decls = new Map< string, number >()

		usages = new Map< string, ts_Identifier[] >()

		member_add( name: string, member: string ) {
			let existed = this.members.get( name )
			if( existed === null ) return
			if( !existed ) this.members.set( name, existed = new Set() )
			existed.add( member )
		}

		member_of( access: ts_Node ): string | null {
			const ts = $node.typescript
			const outer = access.parent

			if( ts.isPropertyAccessExpression( outer ) && outer.expression === access ) {
				return String( outer.name.escapedText )
			}
			if( ts.isElementAccessExpression( outer ) && outer.expression === access && ts.isStringLiteral( outer.argumentExpression ) ) {
				return outer.argumentExpression.text
			}

			return null
		}

		dep_note( node: ts_Identifier ) {
			const ts = $node.typescript
			const access = node.parent

			let name = ''
			if( ts.isPropertyAccessExpression( access ) && access.expression === node ) {
				name = String( access.name.escapedText )
			} else if( ts.isElementAccessExpression( access ) && access.expression === node && ts.isStringLiteral( access.argumentExpression ) ) {
				name = access.argumentExpression.text
			}
			if( !name ) return null

			this.deps.add( name )

			const member = this.member_of( access )

			if( member ) {

				this.member_add( name, member )

			} else {

				const outer = access.parent

				if( ts.isVariableDeclaration( outer ) && outer.initializer === access ) {

					if( ts.isIdentifier( outer.name ) ) {
						this.aliases.set( String( outer.name.escapedText ), name )
					} else if( ts.isObjectBindingPattern( outer.name ) ) {
						this.binding_members_add( name, outer.name )
					} else {
						this.members.set( name, null )
					}

				} else {
					this.members.set( name, null )
				}

			}

			return name
		}

		binding_members_add( name: string, pattern: ts_ObjectBindingPattern ) {
			const ts = $node.typescript

			for( const element of pattern.elements ) {

				if( element.dotDotDotToken ) return void this.members.set( name, null )

				const prop = element.propertyName ?? element.name

				if( ts.isIdentifier( prop ) ) this.member_add( name, String( prop.escapedText ) )
				else if( ts.isStringLiteral( prop ) ) this.member_add( name, prop.text )
				else return void this.members.set( name, null )

			}
		}

		ident_note( node: ts_Identifier ) {
			const ts = $node.typescript
			const parent = node.parent
			const name = String( node.escapedText )

			if( ts.isPropertyAccessExpression( parent ) && parent.name === node ) return
			if( ts.isPropertyAssignment( parent ) && parent.name === node ) return
			if( ts.isPropertySignature( parent ) && parent.name === node ) return
			if( ts.isMethodDeclaration( parent ) && parent.name === node ) return
			if( ts.isBindingElement( parent ) && parent.propertyName === node ) return
			if( ts.isQualifiedName( parent ) && parent.right === node ) return

			const is_decl =
				( ( ts.isVariableDeclaration( parent ) || ts.isParameter( parent ) || ts.isBindingElement( parent ) ) && parent.name === node )
				|| ( ( ts.isFunctionDeclaration( parent ) || ts.isClassDeclaration( parent ) ) && parent.name === node )

			if( is_decl ) {
				this.decls.set( name, ( this.decls.get( name ) ?? 0 ) + 1 )
			} else {
				let list = this.usages.get( name )
				if( !list ) this.usages.set( name, list = [] )
				list.push( node )
			}
		}

		aliases_apply() {
			for( const [ alias, name ] of this.aliases ) {

				if( this.members.get( name ) === null ) continue

				if( ( this.decls.get( alias ) ?? 1 ) > 1 ) {
					this.members.set( name, null )
					continue
				}

				for( const usage of this.usages.get( alias ) ?? [] ) {

					const member = this.member_of( usage )

					if( member ) {
						this.member_add( name, member )
					} else {
						this.members.set( name, null )
						break
					}

				}

			}
		}

	}

}
