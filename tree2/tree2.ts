namespace $ {

	/** Path by types in tree. */
	export type $mol_tree2_path =
		Array< string | number | null >
	
	/** Hask tool for processing node. */
	export type $mol_tree2_hack< Context > =
		(
			input : $mol_tree2 ,
			belt : $mol_tree2_belt< Context > ,
			context : Context ,
		)=> readonly $mol_tree2[]

	/** Collection of hask tools for processing tree. */
	export type $mol_tree2_belt< Context > =
		Record< string , $mol_tree2_hack< Context > >

	/**
	 * Abstract Syntax Tree with human readable serialization.
	 * Avoid direct instantiation. Use static factories instead.
	 * @see https://github.com/nin-jin/tree.d
	 */
	export class $mol_tree2 extends $mol_object2 {
		
		constructor(

			/** Type of structural node, `value` should be empty */
			readonly type : string,
			
			/** Content of data node, `type` should be empty */
			readonly value : string,

			/** Child nodes */
			readonly kids : readonly $mol_tree2[],
			
			/** Position in most far source resource */
			readonly span : $mol_span,

		) { super() }
		
		/** Makes collection node. */
		static list(
			kids : readonly $mol_tree2[] ,
			span = $mol_span.unknown ,
		) {
			return new $mol_tree2( '' , '' , kids , span )
		}
		
		/** Makes new derived collection node. */
		list(
			kids : readonly $mol_tree2[] ,
		) {
			return $mol_tree2.list( kids , this.span )
		}

		/** Makes data node for any string. */
		static data(
			value : string ,
			kids = [] as readonly $mol_tree2[] ,
			span = $mol_span.unknown ,
		) {

			const chunks = value.split( '\n' )

			if( chunks.length > 1 ) {
			
				let kid_span = span.span( span.row , span.col , 0 )

				const data = chunks.map( chunk => {
					kid_span = kid_span.after( chunk.length )
					return new $mol_tree2( '' , value , [] , kid_span )
				} )

				kids = [ ... data , ... kids ]

				value = ''

			}

			return new $mol_tree2( '' , value , kids , span )

		}
		
		/** Makes new derived data node. */
		data(
			value : string ,
			kids = [] as readonly $mol_tree2[] ,
		) {
			return $mol_tree2.data( value , kids , this.span )
		}
		
		/** Makes struct node. */
		static struct(
			type : string ,
			kids = [] as readonly $mol_tree2[] ,
			span = $mol_span.unknown ,
		) {

			if( /[ \n\t\\]/.test( type ) ) {
				this.$.$mol_fail( span.error( `Wrong type ${ JSON.stringify( type ) }` ) )
			}

			return new $mol_tree2( type , '' , kids , span )

		}
		
		/** Makes new derived structural node. */
		struct(
			type : string ,
			kids = [] as readonly $mol_tree2[] ,
		) {
			return $mol_tree2.struct( type , kids , this.span )
		}

		/** Makes new derived node with different kids id defined. */
		clone( kids : readonly $mol_tree2[] ) {
			return new $mol_tree2( this.type , this.value , kids , this.span )
		}

		/** Returns multiline text content. */
		text() {

			var values : string[] = []
			
			for( var kid of this.kids ) {
				if( kid.type ) continue
				values.push( kid.value )
			}
			
			return this.value + values.join( '\n' )

		}
		
		/** Parses tree format. */
		static fromString( str : string , span = $mol_span.unknown ) {
			
			const root = $mol_tree2.data( '' , [] , span )
			const stack = [ root ]
			
			let row = 0
			const prefix = str.replace( /^\n?(\t*)[\s\S]*/ , '$1' )
			const lines = str.replace( new RegExp( '^\\t{0,' + prefix.length + '}' , 'mg' ) , '' ).split( '\n' )

			for( const line of lines ) {

				++row
				const line_span = span.span( row , 0 , line.length )
				
				const chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec( line )
				if( !chunks || chunks[4] ) {
					this.$.$mol_fail( line_span.error( `Syntax error\n${line}` , SyntaxError ) )
					continue
				}
				
				const indent = chunks[ 1 ]
				const path = chunks[ 2 ]
				const value = chunks[ 3 ]
				
				const deep = indent.length
				const types = path ? path.replace( / $/ , '' ).split( / +/ ) : []
				
				if( stack.length <= deep ) {
					this.$.$mol_fail( line_span.error( `Too many tabs\n${line}` , SyntaxError ) )
					continue
				}
				
				stack.length = deep + 1
				let parent = stack[ deep ];
				
				let col = deep
				for( const type of types ) {

					const type_span = span.span( row , col , type.length )

					if( !type ) {
						this.$.$mol_fail( type_span.error( `Unexpected space symbol\n${line}` , SyntaxError ) )
					}
					
					const next = $mol_tree2.struct( type , [] , type_span )
					
					const parent_sub = parent.kids as $mol_tree2[]
					parent_sub.push( next )	
					
					parent = next
					col += type.length + 1

				}
				
				if( value ) {

					const value_span = span.span( row , col , value.length )
					
					const next = new $mol_tree2( '' , value.substring( 1 ) , [] , value_span )

					const parent_sub = parent.kids as $mol_tree2[]
					parent_sub.push( next )
					
					parent = next

				}
				
				stack.push( parent )
				
			}
			
			return root
		}
		
		/** Serializas to tree format. */
		toString( prefix = '' ) : string {

			let output = ''
			
			if( this.type.length ) {
				
				if( !prefix.length ) {
					prefix = "\t";
				}

				output += this.type

				if( this.kids.length == 1 ) {
					return output + ' ' + this.kids[ 0 ].toString( prefix )
				}

				output += "\n"

			} else if( this.value.length || prefix.length ) {

				output += "\\" + this.value + "\n"

			}

			for( var child of this.kids ) {
				output += prefix
				output += child.toString( prefix + "\t" )
			}
			
			return output

		}
		
		/** Makes new tree with node overrided by path. */
		insert( value : $mol_tree2 , ...path : $mol_tree2_path ) : $mol_tree2 {

			if( path.length === 0 ) return value
			
			const type = path[0]
			if( typeof type === 'string' ) {

				let replaced = false
				const sub = this.kids.map( ( item , index )=> {
					if( item.type !== type ) return item
					replaced = true
					return item.insert( value , ... path.slice( 1 ) )
				} )
				
				if( !replaced ) {
					sub.push( this.struct( type , [] ).insert( value , ... path.slice( 1 ) ) )
				}
				
				return this.clone( sub )

			} else if( typeof type === 'number' ) {
				
				const sub = this.kids.slice()
				sub[ type ] = ( sub[ type ] || this.list([]) ).insert( value , ... path.slice( 1 ) )
				
				return this.clone( sub )

			} else {
				
				const kids = ( ( this.kids.length === 0 ) ? [ this.list([]) ] : this.kids )
				.map( item => item.insert( value , ... path.slice( 1 ) ) )

				return this.clone( kids )

			}

		}

		/** Query nodes by path. */
		select( ...path : $mol_tree2_path ) {

			let next = [ this as $mol_tree2 ]

			for( const type of path ) {

				if( !next.length ) break
				
				const prev = next
				next = []

				for( var item of prev ) {

					switch( typeof( type ) ) {

						case 'string' :

							for( var child of item.kids ) {
								if( !type || ( child.type == type ) ) {
									next.push( child )
								}
							}

							break
						
						case 'number' :

							if( type < item.kids.length ) next.push( item.kids[ type ] )
							
							break;
						
						default : next.push( ... item.kids )
					}
				}
			}

			return this.list( next )
			
		}
		
		/** Filter kids by path or value. */
		filter( path : string[] , value? : string ) {

			const sub = this.kids.filter( item => {
					
				var found = item.select( ...path )
				
				if( value === undefined ) {
					return Boolean( found.kids.length )
				} else {
					return found.kids.some( child => child.value == value )
				}
			
			} )
			
			return this.clone( sub )

		}

		/** Transform tree through context with transformers */
		hack< Context = never >( belt : $mol_tree2_belt< Context > , context? : Context ) {
			
			return ( [] as readonly $mol_tree2[] ).concat( ... this.kids.map( child => {

				const handle = belt[ Reflect.ownKeys( belt ).includes( child.type ) ? child.type : '' ]
				if( !handle ) {
					this.$.$mol_fail( child.error( `Hack not found.\nAllowed: ${ Object.keys( belt )}` ) )
				}
				
				return handle( child , belt , context! )

			} ) )

		}

		/** Makes Error with node coordinates. */
		error( message : string , Class = Error ) {
			return this.span.error( `${message}\n${this}` , Class )
		}

	}

	export class $mol_tree2_empty extends $mol_tree2 {
		constructor() {
			super( '' , '' , [] , $mol_span.unknown )
		}
	}
	
}
