/** @jsx $mol_jsx */
namespace $ {
	
	export class $mol_rest_demo extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {
			if( msg.uri().pathname === '/' ) {
				msg.reply( $node.fs.readFileSync( './mol/rest/demo/index.html' ), { type: 'text/html' } )
			} else {
				msg.reply( null, { code: 404 } )
			}
		}
		
		@ $mol_mem crud() { return $mol_rest_demo_crud.make({}) }
		
	}
	$mol_rest_demo.serve()
	
	export class $mol_rest_demo_crud extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {
			// returns received query as json
			msg.reply({
				path: msg.uri().pathname,
				query: [ ... msg.uri().searchParams ],
			})
		}
		
		POST( msg: $mol_rest_message ) {
			// returns received body as is
			msg.reply( msg.data() )
		}
		
		PUT( msg: $mol_rest_message ) {
			// returns received type in xml
			msg.reply( <body>{ msg.type() }</body> )
		}
		
		DELETE( msg: $mol_rest_message ) {
			// returns empty body
			msg.reply( null )
		}
		
		@ $mol_mem nested() { return $mol_rest_demo_crud.make({}) }
		
	}
	
}
