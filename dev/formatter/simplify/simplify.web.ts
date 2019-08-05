globalThis['devtoolsFormatters'].push({

	header : ( val : any , config : boolean ) => {
		
		if( config ) return null
		if( !val ) return null
		if( !val[ Symbol.toStringTag ] ) return null
		
		return [ 'object' , { object : val , config : true } ]
	} ,
	
	hasBody : ()=> false ,

})
