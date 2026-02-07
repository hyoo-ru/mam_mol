namespace $ {
	$.$mol_build.start = () => {}

	const bundle_manifest = ( sources : { json? : any , web? : any , pkg? : any } )=> {
		const fs = $node.fs as typeof import( 'fs' )
		const os = $node.os as typeof import( 'os' )
		const path = $node.path as typeof import( 'path' )
		
		const base = $mol_file.base
		const root_dir = fs.mkdtempSync( path.join( os.tmpdir() , 'mol-build-' ) )
		const root = $mol_file.absolute( root_dir )
		const pack = root.resolve( 'pack' )
		
		try {
			
			if( sources.json ) pack.resolve( 'manifest.json' ).text( JSON.stringify( sources.json ) )
			if( sources.web ) pack.resolve( 'manifest.webmanifest' ).text( JSON.stringify( sources.web ) )
			if( sources.pkg ) pack.resolve( 'package.json' ).text( JSON.stringify( sources.pkg ) )
			
			const build = $mol_build.root( [ root.path() , [] ] )
			build.bundleManifestJSON( [ pack.path() ] )
			
			const json_file = pack.resolve( '-/manifest.json' )
			const web_file = pack.resolve( '-/manifest.webmanifest' )
			
			return {
				json : json_file.exists() ? JSON.parse( json_file.text() ) : null ,
				web : web_file.exists() ? JSON.parse( web_file.text() ) : null ,
			}
			
		} finally {
			fs.rmSync( root.path() , { recursive : true , force : true } )
			$mol_file.base = base
		}
	}

	const icons_sorted = ( icons : any[] )=> {
		if( !icons ) return []
		const size = ( icon : any )=> {
			const sizes = String( icon.sizes ?? '' )
			const match = /^(\d+)x(\d+)$/.exec( sizes )
			if( !match ) return 0
			if( match[1] !== match[2] ) return 0
			return Number( match[1] )
		}
		return icons.slice().sort( ( a , b )=> size( a ) - size( b ) )
	}
	
	const dict_sorted = ( dict : Record< string , string > )=> {
		if( !dict ) return [] as [ string , string ][]
		return Object.entries( dict ).sort( ( a , b )=> a[0].localeCompare( b[0] ) )
	}
	
	$mol_test( {
		
		'manifest json -> webmanifest fallback'() {
			
			const res = bundle_manifest({
				json : {
					name : 'Ext' ,
					description : 'Ext desc' ,
					icons : { '16' : 'icon16.png' , '48' : 'icon48.png' } ,
					manifest_version : 3 ,
				}
			})
			
			$mol_assert_equal( res.json.name , 'Ext' )
			$mol_assert_equal( res.json.short_name , 'Ext' )
			$mol_assert_equal( res.json.description , 'Ext desc' )
			$mol_assert_equal( res.json.manifest_version , 3 )
			$mol_assert_equal( res.json.action.default_popup , 'index.html' )
			$mol_assert_equal( res.json.action.default_title , 'Ext' )
			$mol_assert_equal( dict_sorted( res.json.icons ) , [
				[ '16' , 'icon16.png' ] ,
				[ '48' , 'icon48.png' ] ,
			] )
			
			$mol_assert_equal( res.web.name , 'Ext' )
			$mol_assert_equal( res.web.short_name , 'Ext' )
			$mol_assert_equal( res.web.description , 'Ext desc' )
			$mol_assert_equal( res.web.manifest_version , 3 )
			$mol_assert_equal( res.web.display , 'standalone' )
			$mol_assert_equal( res.web.start_url , '.' )
			$mol_assert_equal( res.web.theme_color , '#000000' )
			$mol_assert_equal( res.web.background_color , '#000000' )
			$mol_assert_equal( icons_sorted( res.web.icons ) , [
				{ src : 'icon16.png' , sizes : '16x16' , type : 'image/png' } ,
				{ src : 'icon48.png' , sizes : '48x48' , type : 'image/png' } ,
			] )
			
		} ,
		
		'manifest webmanifest -> json fallback'() {
			
			const res = bundle_manifest({
				web : {
					name : 'PWA' ,
					short_name : 'PW' ,
					display : 'standalone' ,
					icons : [
						{ src : 'icon-64.png' , sizes : '64x64' } ,
						{ src : 'icon-128.png' , sizes : '128x128' , type : 'image/png' } ,
					] ,
				}
			})
			
			$mol_assert_equal( res.json.name , 'PWA' )
			$mol_assert_equal( res.json.short_name , 'PW' )
			$mol_assert_equal( res.json.manifest_version , 3 )
			$mol_assert_equal( res.json.action.default_popup , 'index.html' )
			$mol_assert_equal( res.json.action.default_title , 'PWA' )
			$mol_assert_equal( dict_sorted( res.json.icons ) , [
				[ '128' , 'icon-128.png' ] ,
				[ '64' , 'icon-64.png' ] ,
			] )
			
			$mol_assert_equal( res.web.name , 'PWA' )
			$mol_assert_equal( res.web.short_name , 'PW' )
			$mol_assert_equal( res.web.display , 'standalone' )
			$mol_assert_equal( res.web.manifest_version , 3 )
			$mol_assert_equal( icons_sorted( res.web.icons ) , [
				{ src : 'icon-64.png' , sizes : '64x64' } ,
				{ src : 'icon-128.png' , sizes : '128x128' , type : 'image/png' } ,
			] )
			
		} ,
		
		'package json only -> both manifests'() {
			
			const res = bundle_manifest({
				pkg : {
					name : 'Pkg' ,
					description : 'Pkg desc' ,
					icon : 'icon.png' ,
				}
			})
			
			$mol_assert_equal( res.json.name , 'Pkg' )
			$mol_assert_equal( res.json.short_name , 'Pkg' )
			$mol_assert_equal( res.json.description , 'Pkg desc' )
			$mol_assert_equal( res.json.manifest_version , 3 )
			$mol_assert_equal( res.json.action.default_popup , 'index.html' )
			$mol_assert_equal( res.json.action.default_title , 'Pkg' )
			$mol_assert_equal( dict_sorted( res.json.icons ) , [
				[ '128' , 'icon.png' ] ,
			] )
			
			$mol_assert_equal( res.web.name , 'Pkg' )
			$mol_assert_equal( res.web.short_name , 'Pkg' )
			$mol_assert_equal( res.web.description , 'Pkg desc' )
			$mol_assert_equal( res.web.display , 'standalone' )
			$mol_assert_equal( res.web.start_url , '.' )
			$mol_assert_equal( res.web.manifest_version , 3 )
			$mol_assert_equal( res.web.theme_color , '#000000' )
			$mol_assert_equal( res.web.background_color , '#000000' )
			$mol_assert_equal( icons_sorted( res.web.icons ) , [
				{ src : 'icon.png' , sizes : 'any' , type : 'image/png' } ,
			] )
			
		} ,
		
		'merge icons from both manifests'() {
			
			const res = bundle_manifest({
				json : {
					name : 'Mix' ,
					icons : { '16' : 'a.png' } ,
				} ,
				web : {
					name : 'Mix' ,
					icons : [
						{ src : 'b.png' , sizes : '32x32' } ,
					] ,
				}
			})
			
			$mol_assert_equal( res.json.name , 'Mix' )
			$mol_assert_equal( res.json.short_name , 'Mix' )
			$mol_assert_equal( dict_sorted( res.json.icons ) , [
				[ '16' , 'a.png' ] ,
				[ '32' , 'b.png' ] ,
			] )
			
			$mol_assert_equal( res.web.name , 'Mix' )
			$mol_assert_equal( res.web.short_name , 'Mix' )
			$mol_assert_equal( icons_sorted( res.web.icons ) , [
				{ src : 'a.png' , sizes : '16x16' , type : 'image/png' } ,
				{ src : 'b.png' , sizes : '32x32' } ,
			] )
			
		} ,
		
	} )
}
