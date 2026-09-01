/** @jsx $mol_jsx */
namespace $ {
	
	export class $mol_rest_demo extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {
			if( msg.uri().pathname === '/' ) {
				msg.reply( $node.fs.readFileSync( './mol/rest/demo/index.html' ), { type: 'text/html' } )
			} else {
				msg.reply( null, { code: $mol_rest_code['Not Found'] } )
			}
		}
		
		@ $mol_memo.method test() { return $mol_rest_demo_test.make({}) }
		@ $mol_memo.method crud() { return $mol_rest_demo_crud.make({}) }
		
	}
	$mol_rest_demo.serve()
	
	export class $mol_rest_demo_test extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {
			// returns received query as json
			msg.reply({
				path: msg.uri().pathname,
				query: [ ... msg.uri().searchParams ],
			})
		}
		
		POST( msg: $mol_rest_message ) {
			// returns received body as is
			msg.reply( msg.data(), { type: msg.type() } )
		}
		
		PUT( msg: $mol_rest_message ) {
			// returns received type in xml
			msg.reply( <body>{ msg.type() }</body> )
		}
		
		DELETE( msg: $mol_rest_message ) {
			// returns empty body
			msg.reply( null )
		}
		
		@ $mol_memo.method nested() { return $mol_rest_demo_test.make({}) }
		
	}
	
	export class $mol_rest_demo_crud extends $mol_rest_resource {
		
		_objects = {} as Record< string, object >
		
		_id( msg: $mol_rest_message ) {
			return $mol_data_string( msg.uri().searchParams.get( 'id' )! )
		}
		
		_schema = $mol_data_record({
			title: $mol_data_string,
		})
		
		GET( msg: $mol_rest_message ) {
			
			const id = this._id( msg )
			
			const obj = this._objects[ id ]
			if( obj === undefined ) return msg.reply( null, { code: $mol_rest_code['Not Found'] } )
			
			msg.reply( obj )
			
		}
		
		POST( msg: $mol_rest_message ) {
			
			const id = $mol_guid( 8, id => !! this._objects[ id ] )
			const obj = this._schema( msg.data() as any )
			
			this._objects[ id ] = obj
			
			msg.reply( id )
			
		}
		
		PUT( msg: $mol_rest_message ) {
			
			const id = this._id( msg )
			const obj = this._schema( msg.data() as any )
			
			this._objects[ id ] = obj
			
			msg.reply( null )
			
		}
		
		DELETE( msg: $mol_rest_message ) {
			
			const id = this._id( msg )
			
			const obj = this._objects[ id ]
			if( obj === undefined ) return msg.reply( null, { code: $mol_rest_code['Not Found'] } )
			
			delete this._objects[ id ]
			
			msg.reply( null )
			
		}
		
	}
	
}
