namespace $ {

	export const $mol_tree_convert : unique symbol = Symbol( '$mol_tree_convert' )
	export type $mol_tree_path = Array< string | number | null >

	export type $mol_tree_hack = ( input : $mol_tree , context : $mol_tree_context )=> readonly $mol_tree[]
	export type $mol_tree_context = Record< string , $mol_tree_hack >
	export type $mol_tree_library = Record< string , $mol_tree_context >

	export class $mol_tree_syntax_error extends Error {
		constructor( line : string , row : number , col : number , reason : string, baseUri : string = 'unknown' ) {
			var pos_marker_prefix = line.replace(/[^\t]/, '').slice(0, col);
			var message = `Syntax error: ${reason}, at ${baseUri}:${row}:${col}\n${line}\n${pos_marker_prefix}^`

			super(message)
		}
	}
	
	/**
	 * Abstract Syntax Tree with human readable serialization.
	 * @see https://github.com/nin-jin/tree.d
	 */
	export class $mol_tree extends $mol_object2 {
		
		readonly type : string
		readonly data : string
		readonly sub : readonly $mol_tree[]
		readonly baseUri : string
		readonly row : number
		readonly col : number
		
		constructor( config : Partial<$mol_tree> = {} ) {

			super()

			this.type = config.type || ''
			
			if( config.value !== undefined ) {

				var sub = $mol_tree.values( config.value )
				
				if( config.type || sub.length > 1 ) {

					this.sub = [ ... sub , ...( config.sub || [] ) ]
					this.data = config.data || ''

				} else {

					this.data = sub[ 0 ].data
					this.sub = config.sub || []

				}

			} else {
				
				this.data = config.data || ''
				this.sub = config.sub || []

			}
			
			this.baseUri = config.baseUri || ''
			this.row = config.row || 0
			this.col = config.col || 0

		}
		
		static values( str : string , baseUri? : string ) {

			return str.split( '\n' ).map( ( data , index ) => new $mol_tree( {
				data : data ,
				baseUri : baseUri ,
				row : index + 1
			} ) )

		}
		
		/** Cloning node with overrides. */
		clone( config : Partial<$mol_tree> = {} ) {

			return new $mol_tree({
				type : ( 'type' in config ) ? config.type : this.type ,
				data : ( 'data' in config ) ? config.data : this.data ,
				sub : ( 'sub' in config ) ? config.sub : this.sub ,
				baseUri : ( 'baseUri' in config ) ? config.baseUri : this.baseUri ,
				row : ( 'row' in config ) ? config.row : this.row ,
				col : ( 'col' in config ) ? config.col : this.col ,
				value : config.value
			})

		}
		
		/** Makes new derived node. */
		make( config : Partial<$mol_tree> ) {

			return new $mol_tree({
				baseUri : this.baseUri ,
				row : this.row ,
				col : this.col ,
				... config ,
			})

		}
		
		/** Parses tree format to AST. */
		static fromString( str : string , baseUri? : string  ) : $mol_tree {
			var root = new $mol_tree( { baseUri : baseUri } )
			var stack = [ root ]

			var pos = 0, row = 0, min_indent = 0
			
			while( str.length > pos ) {
				var indent = 0
				var line_start = pos

				row++

				// read indent
				while( str.length > pos && str[ pos ] == '\t' ) {
					indent++
					pos++
				}

				if( ! root.sub.length ) {
					min_indent = indent
				}

				indent -= min_indent

				// invalid tab size
				if( indent < 0 || indent >= stack.length ) {
					// skip error line
					while( str.length > pos && str[ pos ] != '\n' ) {
						pos++
					}

					$mol_fail( new $mol_tree_syntax_error(
						str.slice( line_start , pos ) ,
						row ,
						1 ,
						`too ${indent < 0 ? 'low' : 'many'} tabs` ,
						baseUri ,
					) )
				}

				stack.length = indent + 1
				var parent = stack[ indent ]

				// parse types
				while( str.length > pos && str[ pos ] != '\\' && str[ pos ] != '\n' ) {
					// type can not contain space and tab
					var error_start = pos
					while( str.length > pos && ( str[ pos ] == ' ' || str[ pos ] == '\t' ) ) {
						pos++
					}
					if( pos > error_start ) {
						$mol_fail( new $mol_tree_syntax_error(
							str.slice( line_start , str.indexOf( '\n' , pos ) ) ,
							row ,
							error_start - line_start ,
							`type expected, '${str.slice( error_start , pos )}' given` ,
							baseUri ,
						) )
					}

					// read type
					var type_start = pos
					while( 
						str.length > pos && 
						str[ pos ] != '\\' && 
						str[ pos ] != ' ' && 
						str[ pos ] != '\t' && 
						str[ pos ] != '\n'
					) {
						pos++
					}
					if( pos > type_start ) {
						let next = new $mol_tree( { 
							type : str.slice( type_start , pos ) ,
							baseUri ,
							row ,
							col : type_start - line_start ,
						} )
						const parent_sub = parent.sub as $mol_tree[]
						parent_sub.push( next )
						parent = next
					}

					// read one space if exists
					if( str.length > pos && str[ pos ] == ' ' ) {
						pos++
					}
				}

				// read data
				if( str.length > pos && str[ pos ] == '\\' ) {
					var data_start = pos
					while( str.length > pos && str[ pos ] != '\n' ) {
						pos++
					}
					let next = new $mol_tree( { 
						data : str.slice( data_start + 1 , pos ) ,
						baseUri ,
						row ,
						col : data_start - line_start ,
					})
					const parent_sub = parent.sub as $mol_tree[]
					parent_sub.push( next )
					parent = next
				}

				// now must be end of text or new line character
				if( str.length > pos && str[ pos ] != '\n' ) {
					$mol_fail( new $mol_tree_syntax_error(
						str.slice( line_start , str.indexOf( '\n' , pos ) ) ,
						row ,
						pos - line_start ,
						`LF or EOF expected, '${str[pos]}' given` ,
						baseUri ,
					) )
				}

				stack.push( parent )
				pos++
			}

			return root
		}
		
		/**
		 * Parses json.tree lang to AST.
		 * @todo Move to $mol_tree_json_from
		 */
		static fromJSON( json : any , baseUri = '' ) : $mol_tree {

			switch( true ) {

				case typeof json === 'boolean' :
				case typeof json === 'number' :
				case json === null :

					return new $mol_tree({
						type : String( json ) ,
						baseUri : baseUri
					})
				
				case typeof json === 'string' :

					return new $mol_tree({
						value : json ,
						baseUri : baseUri
					})

				case Array.isArray( json ) :

					return new $mol_tree({
						type : "/" ,
						sub : ( json as any[] ).map( json => $mol_tree.fromJSON( json , baseUri ) )
					})

				case json instanceof Date :

					return new $mol_tree({
						value : json.toISOString() ,
						baseUri : baseUri
					})
				
				default :

					if( typeof json[ $mol_tree_convert ] === 'function' ) {
						return json[ $mol_tree_convert ]()
					}

					if( typeof json.toJSON === 'function' ) {
						return $mol_tree.fromJSON( json.toJSON() )
					}

					var sub : $mol_tree[] = []
					
					for( var key in json ) {

						if( json[ key ] === undefined ) continue

						const subsub = $mol_tree.fromJSON( json[ key ] , baseUri )
						
						if( /^[^\n\t\\ ]+$/.test( key ) ) {

							var child = new $mol_tree({
								type : key ,
								baseUri : baseUri ,
								sub : [ subsub ] ,
							} )
							
						} else {
							
							var child = new $mol_tree({
								value : key ,
								baseUri : baseUri ,
								sub : [ subsub ] ,
							} )

						}

						sub.push( child )
						
					}
					
					return new $mol_tree({
						type : "*" ,
						sub : sub ,
						baseUri : baseUri
					})
				
			}

		}
		
		get uri() {
			return this.baseUri + '#' + this.row + ':' + this.col
		}
		
		/** Serializas to tree format. */
		toString( prefix = '' ) : string {
			var output = ''
			
			if( this.type.length ) {
				if( !prefix.length ) {
					prefix = "\t";
				}
				output += this.type
				if( this.sub.length == 1 ) {
					return output + ' ' + this.sub[ 0 ].toString( prefix )
				}
				output += "\n"
			} else if( this.data.length || prefix.length ) {
				output += "\\" + this.data + "\n"
			}

			for( var child of this.sub ) {
				output += prefix
				output += child.toString( prefix + "\t" )
			}
			
			return output
		}
		
		/**
		 * Serializes AST to json.tree lang.
		 * @todo Move to $mol_tree_json_to
		 */
		toJSON() : any {
			if( !this.type ) return this.value
			
			if( this.type === 'true' ) return true
			if( this.type === 'false' ) return false
			if( this.type === 'null' ) return null
			
			if( this.type === '*' ) {
				var obj = {}
				for( var child of this.sub ) {
					if( child.type === '-' ) continue
					var key = child.type || child.clone({ sub : child.sub.slice( 0 , child.sub.length - 1 ) }).value
					var val = child.sub[ child.sub.length - 1 ].toJSON()
					if( val !== undefined ) ( obj as any )[ key ] = val
				}
				return obj
			}
			
			if( this.type === '/' ) {
				var res : any[] = []
				this.sub.forEach(
					child => {
						if( child.type === '-' ) return
						var val = child.toJSON()
						if( val !== undefined ) res.push( val )
					}
				)
				return res
			}
			
			if( this.type === 'time' ) {
				return new Date( this.value )
			}
			
			if( String( Number( this.type ) ) == this.type.trim() ) return Number( this.type )
			
			throw new Error( `Unknown type (${this.type}) at ${this.uri}` )
		}
		
		get value() {
			var values : string[] = []
			for( var child of this.sub ) {
				if( child.type ) continue
				values.push( child.value )
			}
			return this.data + values.join( "\n" )
		}
		
		/** Makes new tree with node overrided by path. */
		insert( value : $mol_tree , ...path : $mol_tree_path ) : $mol_tree {
			if( path.length === 0 ) return value
			
			const type = path[0]
			if( typeof type === 'string' ) {

				let replaced = false
				const sub = this.sub.map( ( item , index )=> {
					if( item.type !== type ) return item
					replaced = true
					return item.insert( value , ... path.slice( 1 ) )
				} )
				
				if( !replaced ) sub.push( new $mol_tree({ type }).insert( value , ... path.slice( 1 ) ) )
				
				return this.clone({ sub })

			} else if( typeof type === 'number' ) {
				
				const sub = this.sub.slice()
				sub[ type ] = ( sub[ type ] || new $mol_tree ).insert( value , ... path.slice( 1 ) )
				
				return this.clone({ sub })

			} else {
				
				return this.clone({ sub : ( ( this.sub.length === 0 ) ? [ new $mol_tree() ] : this.sub ).map( item => item.insert( value , ... path.slice( 1 ) ) ) })

			}
		}

		/** Query nodes by path. */
		select( ...path : $mol_tree_path ) {
			var next = [ this as $mol_tree ]
			for( var type of path ) {
				if( !next.length ) break
				var prev = next
				next = []

				for( var item of prev ) {

					switch( typeof( type ) ) {

						case 'string' :
							for( var child of item.sub ) {
								if( !type || ( child.type == type ) ) {
									next.push( child )
								}
							}
							break;
						
						case 'number' :
							if( type < item.sub.length ) next.push( item.sub[ type ] )
							break;
						
						default : next.push( ... item.sub )
					}
				}
			}
			return new $mol_tree( { sub : next } )
		}
		
		/** Filter subnodes by path or value. */
		filter( path : string[] , value? : string ) {
			var sub = this.sub.filter(
				function( item ) {
					
					var found = item.select( ...path )
					
					if( value == null ) {
						return Boolean( found.sub.length )
					} else {
						return found.sub.some( child => child.value == value )
					}
				}
			)
			
			return new $mol_tree( { sub : sub } )
		}

		@ $mol_deprecated( 'Use $mol_tree:hack' )
		transform( visit : ( stack : $mol_tree[] , sub : ()=> $mol_tree[] )=> $mol_tree | null , stack : $mol_tree[] = [] ) : $mol_tree | null {
			const sub_stack = [ this , ...stack ]
			return visit( sub_stack , ()=> this.sub.map( node => node.transform( visit , sub_stack ) ).filter( n => n ) as $mol_tree[] )
		}

		/** Transform tree through context with transformers */
		hack( context : $mol_tree_context ) : $mol_tree {
			
			const sub = ( [] as $mol_tree[] ).concat( ... this.sub.map( child => {

				const handle = context[ child.type ] || context[ '' ]
				if( !handle ) $mol_fail( child.error( 'Handler not defined' ) )
				
				return handle( child , context )

			} ) )

			return this.clone({ sub })
		}

		/** Makes Error with node coordinates. */
		error( message : string ) {
			return new Error( `${message}:\n${ this } ${this.baseUri}:${this.row}:${this.col}` )
		}

	}
	
}
