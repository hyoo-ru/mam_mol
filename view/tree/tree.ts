namespace $ {

	export function $mol_view_tree_trim_remarks( def : $mol_tree ) {
		return def.transform( ( [ node ] , sub )=> ( node.type === '-' ) ? null : node.clone({ sub : sub() }) )
	}

	export function $mol_view_tree_classes( defs : $mol_tree ) {
		return $mol_view_tree_trim_remarks( defs )
	}

	export function $mol_view_tree_class_name( val : $mol_tree ) {
		return val.type
	}

	export function $mol_view_tree_super_name( val : $mol_tree ) {
		if( val.sub.length != 1 ) throw val.error( 'Wrong sub count' )
		return val.sub[0].type
	}

	export function $mol_view_tree_class_props( def : $mol_tree ) {
		const props : { [ key : string ] : $mol_tree } = {}
		
		const catch_prop = ( prop : $mol_tree )=> {
			if( prop.sub.length === 0 ) return
			
			props[ prop.type ] = undefined
			props[ prop.type ] = prop.clone({
				sub : [ prop.sub[0].transform( ( [ node , ... stack ] , sub )=> {

					if( [ '<=' , '<=>' , '=>' ].indexOf( node.type ) === -1 ) return node.clone({ sub : sub() })
					
					catch_prop( node.sub[0] )

					return node.clone({
						sub : [ node.sub[0].clone({
							sub : [
								node.sub[0].clone({
									type : '-' ,
									sub : [] ,
								})
							]
						}) ]
					})
					
				} )]
			})
		}

		def.sub[0].sub.map( catch_prop )

		
		return def.clone({
			type : '' ,
			sub : Object.keys( props ).map( name => props[ name ] ) ,
		})

	}

	export function $mol_view_tree_prop_name( prop : $mol_tree ) {
		return ( prop.type.match( /^\w+/ ) || [] )[0] || ''
	}

	export function $mol_view_tree_prop_key( prop : $mol_tree ) {
		return ( prop.type.match( /!(\w+)$/ ) || [] )[1] || ''
	}

	export function $mol_view_tree_prop_next( prop : $mol_tree ) {
		return ( prop.type.match( /\?(\w+)$/ ) || [] )[1] || ''
	}

	export function $mol_view_tree_prop_value( prop : $mol_tree ) {
		if( prop.sub.length != 1 ) throw prop.error( `Wrong sub count (${ prop.sub.length })` )
		return prop.sub[0]
	}

	export function $mol_view_tree_value_type( val : $mol_tree ) {
		
		switch( val.type ) {
			case 'true' : return 'bool'
			case 'false' : return 'bool'
			case 'null' : return 'null'
			case '*' : return 'dict'
			case '/' : return 'list'
			case '@' : return 'locale'
			case '' : return 'string'
			case '<=' : return 'get'
			case '<=>' : return 'bind'
			case '=>' : return 'put'
		}

		if( val.type[0] === '$' ) return 'object'

		if( Number( val.type ).toString() == val.type ) return 'number'

		throw val.error( 'Wrong value' )
	}

}
