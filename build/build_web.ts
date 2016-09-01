$mol_build.bundlers[ 'web.js' ] = build => {
	var sources = build.sourcesJS( build.target().path() )

	var bundle = build.target().resolve( `-/web.js` )
	var bundleMap = bundle.parent().resolve( `${bundle.name()}.map` )

	var concater = new $node[ 'concat-with-sourcemaps' ]( true, bundle.name(), '\n;\n' )

	sources.forEach( function( src ){
		if( !src.content() ) console.log( src.path() )
		var content = src.content().toString().replace( /^\/\/#\ssourceMappingURL=/mg , '//' )

		var srcMap = src.parent().resolve( src.name() + '.map' ).content()
		if( srcMap ) {
			var map = JSON.parse( srcMap )
			map.sourceRoot = src.parent().relate( bundle.parent() )
		}

		concater.add( src.relate( bundle.parent() ) , content , map && JSON.stringify( map ) )
	} )

	bundle.content( concater.content + '\n//# sourceMappingURL=' + bundleMap.relate( bundle.parent() ) )
	bundleMap.content( concater.sourceMap )

	return [ bundle , bundleMap ]
}
$mol_build.bundlers[ 'web.js.map' ] = build => build.bundle( 'web.js' )

$mol_build.bundlers[ 'web.css' ] = build => {
	var sources = build.sourcesAll( build.target().path() )
		.filter( src => /(css)$/.test( src.ext() ) )
	if( !sources.length ) return []

	var bundle = build.target().resolve( `-/web.css` )
	var bundleMap = bundle.parent().resolve( `${bundle.name()}.map` )

	var root = null //$node.postcss.root({})
	sources.forEach( src => {
		var root2 = $node.postcss.parse( src.content() , { from : src.path() } )
		root = root ? root.append( root2 ) : root2
	} )

	var cssnext = $node.cssnext
	var processor = $node.postcss( cssnext( null , {
		features : {
			customProperties: {
				preserve: true
			}
		}
	} ).plugins )
	var result = processor.process( root , { to : bundle.relate() , map : { inline : false } } )

	bundle.content( result.css )
	bundleMap.content( JSON.stringify( result.map , null , '\t' ) )

	return [ bundle , bundleMap ]
}
$mol_build.bundlers[ 'web.css.map' ] = build => build.bundle( 'web.css' )

$mol_build.bundlers[ 'web.deps.json' ] = build => {
	var graph = build.graph( build.target().path() )
	var list = build.sourcesAll( build.target().path() )
	
	var data = {
		files : list.map( src => src.relate( build.root() ) ) ,
		edgesIn : graph.edgesIn ,
		edgesOut : graph.edgesOut ,
	}

	var bundle = build.target().resolve( `-/web.deps.json` )
	bundle.content( JSON.stringify( data ) )

	return [ bundle ]
}
