namespace $ {
	
	export class $mol_tree {
		
		type : string
		data : string
		sub : $mol_tree[]
		baseUri : string
		row : number
		col : number
		
		constructor(
			config : {
				type? : string
				value? : string
				data? : string
				sub? : $mol_tree[]
				baseUri? : string
				row? : number
				col? : number
			}
		) {
			this.type = config.type || ''
			if( config.value ) {
				var sub = $mol_tree.values( config.value )
				if( config.type || sub.length > 1 ) {
					this.sub = sub.concat( config.sub || [] )
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
			return str.split( '\n' ).map(
				( data , index ) => new $mol_tree(
					{
						data : data ,
						baseUri : baseUri ,
						row : index + 1
					}
				)
			)
		}
		
		clone(
			config : {
				type? : string
				value? : string
				data? : string
				sub? : $mol_tree[]
				baseUri? : string
				row? : number
				col? : number
			}
		) {
			return new $mol_tree(
				{
					type : ( 'type' in config ) ? config.type : this.type ,
					data : ( 'data' in config ) ? config.data : this.data ,
					sub : ( 'sub' in config ) ? config.sub : this.sub ,
					baseUri : ( 'baseUri' in config ) ? config.baseUri : this.baseUri ,
					row : ( 'row' in config ) ? config.row : this.row ,
					col : ( 'col' in config ) ? config.col : this.col ,
					value : config.value
				}
			)
		}
		
		static fromString( str : string , baseUri? : string ) {
			
			var root = new $mol_tree( { baseUri : baseUri } )
			var stack = [ root ]
			
			var row = 0
			var lines = String( str ).split( /\n/ )
			lines.forEach(
				line => {
					++row
					
					var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?/.exec( line )
					if( !chunks ) new Error( `Syntax error at ${baseUri}#${row}\n${line}` )
					
					var indent = chunks[ 1 ]
					var path = chunks[ 2 ]
					var data = chunks[ 3 ]
					
					var deep = indent.length
					var types = path ? path.split( / +/ ) : []
					
					if( stack.length <= deep ) throw new Error( `Too many tabs at ${baseUri}#${row}\n${line}` )
					
					stack.length = deep + 1
					var parent = stack[ deep ];
					
					types.forEach(
						type => {
							if( !type ) return
							var next = new $mol_tree(
								{
									type : type ,
									baseUri : baseUri ,
									row : row
								}
							)
							parent.sub.push( next )	
							parent = next
						}
					)
					
					if( data ) {
						var next = new $mol_tree(
							{
								data : data.substring( 1 ) ,
								baseUri : baseUri ,
								row : row
							}
						)
						parent.sub.push( next )
						parent = next
					}
					
					stack.push( parent )
					
				}
			)
			
			return root
		}
		
		static fromJSON( json : any , baseUri = '' ) : $mol_tree {
			var type = $mol_typeof( json )
			switch( type ) {
				case 'Boolean' :
				case 'Null' :
				case 'Number' :
					return new $mol_tree(
						{
							type : String( json ) ,
							baseUri : baseUri
						}
					)
				case 'String' :
					return new $mol_tree(
						{
							value : json ,
							baseUri : baseUri
						}
					)
				case 'Array' :
					return new $mol_tree(
						{
							type : "list" ,
							sub : ( <any[]> json ).map( json => $mol_tree.fromJSON( json , baseUri ) )
						}
					)
				case 'Date' :
					return new $mol_tree(
						{
							type : "time" ,
							value : json.toISOString() ,
							baseUri : baseUri
						}
					)
				case 'Object' :
					var sub : $mol_tree[] = []
					for( var key in json ) {
						if( json[ key ] === undefined ) continue
						if( /^[^\n\t\\ ]+$/.test( key ) ) {
							var child = new $mol_tree(
								{
									type : key ,
									baseUri : baseUri
								}
							)
						} else {
							var child = new $mol_tree(
								{
									value : key ,
									baseUri : baseUri
								}
							)
						}
						child.sub.push(
							new $mol_tree(
								{
									type : ":" ,
									sub : [ $mol_tree.fromJSON( json[ key ] , baseUri ) ] ,
									baseUri : baseUri
								}
							)
						)
						sub.push( child )
					}
					return new $mol_tree(
						{
							type : "dict" ,
							sub : sub ,
							baseUri : baseUri
						}
					)
			}
			throw new Error( `Unsupported type (${type}) at ${baseUri}` )
		}
		
		get uri() {
			return this.baseUri + '#' + this.row + ':' + this.col
		}
		
		toString( prefix = '' ) : string {
			var output = ''
			
			if( this.type.length ) {
				if( !prefix.length ) {
					prefix = "\t";
				}
				output += this.type + " "
				if( this.sub.length == 1 ) {
					return output + this.sub[ 0 ].toString( prefix )
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
		
		toJSON() : any {
			if( !this.type ) return this.value
			
			if( this.type === '//' ) return undefined
			
			if( this.type === 'true' ) return true
			if( this.type === 'false' ) return false
			if( this.type === 'null' ) return null
			
			if( this.type === 'dict' ) {
				var obj = {}
				for( var child of this.sub ) {
					var key = child.type || child.value
					if( key === '//' ) continue
					var colon = child.select( ':' ).sub[ 0 ]
					if( !colon ) throw new Error( `Required colon after key at ${child.uri}` )
					var val = colon.sub[ 0 ].toJSON()
					if( val !== undefined ) (<any>obj)[ key ] = val
				}
				return obj
			}
			
			if( this.type === 'list' ) {
				var res : any[] = []
				this.sub.forEach(
					child => {
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
		
		select( ...path : string[] ) {
			if( typeof path === 'string' ) path = (<string>path).split( / +/ )
			
			var next = [ <$mol_tree>this ]
			for( var type of path ) {
				if( !next.length ) break
				var prev = next
				next = []
				for( var item of prev ) {
					for( var child of item.sub ) {
						if( child.type == type ) {
							next.push( child )
						}
					}
				}
			}
			return new $mol_tree( { sub : next } )
		}
		
		filter( path : string[] , value? : string ) {
			if( typeof path === 'string' ) path = (<string>path).split( / +/ )
			
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
		
	}
	
}
