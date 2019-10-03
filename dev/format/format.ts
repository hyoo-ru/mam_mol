namespace $ {

	// https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
	$['devtoolsFormatters'] = $['devtoolsFormatters'] || []

	export function $mol_dev_format_register( config : {
		header : ( val : any , config : any )=> any
		hasBody : ( val : any , config : any )=> false
	} | {
		header : ( val : any , config : any )=> any
		hasBody : ( val : any , config : any )=> boolean
		body : ( val : any , config : any )=> any
	} ) {
		$['devtoolsFormatters'].push( config )
	}

	export let $mol_dev_format_head = Symbol( '$mol_dev_format_head' )
	export let $mol_dev_format_body = Symbol( '$mol_dev_format_body' )

	$mol_dev_format_register({

		header : ( val : any , config = false ) => {
			
			if( config ) return null

			if( !val ) return null
			
			if( $mol_dev_format_head in val ) {
				return val[ $mol_dev_format_head ]()
			}

			return null
			
		} ,
		
		hasBody : val => val[ $mol_dev_format_body ] ,

		body : val => val[ $mol_dev_format_body ]() ,

	})

	@ $mol_class
	export class $mol_dev_format_token extends Array<any> {

		constructor( ... items : any[] ) {
			super( ... items )
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_accent( ... this )
		}

	}

	export function $mol_dev_format_native( obj : any ) {
		
		if( typeof obj === 'undefined' ) return $mol_dev_format_shade( 'undefined' )
		if( typeof obj !== 'object' ) return obj

		return [
			'object' ,
			{
				object : obj ,
				config : true ,
			} ,
		]

	}

	export function $mol_dev_format_auto( obj : any ) {
		
		if( obj == null ) return $mol_dev_format_shade( String( obj ) )

		if( typeof obj === 'object' && $mol_dev_format_head in obj ) {
			return obj[ $mol_dev_format_head ]()
		}

		return [
			'object' ,
			{
				object : obj ,
				config : false ,
			} ,
		]

	}

	export function $mol_dev_format_element( element : string , style : object , ...content : any[] ) {
			
		const styles = [] as string[]
		
		for( let key in style ) styles.push( `${ key } : ${ style[key] }` )
		
		return [
			element ,
			{
				style : styles.join( ' ; ' ) ,
			} ,
			... content ,
		]

	}

	export let $mol_dev_format_div = $mol_dev_format_element.bind( null , 'div' )
	export let $mol_dev_format_span = $mol_dev_format_element.bind( null , 'span' )
	export let $mol_dev_format_ol = $mol_dev_format_element.bind( null , 'ol' )
	export let $mol_dev_format_li = $mol_dev_format_element.bind( null , 'li' )
	export let $mol_dev_format_table = $mol_dev_format_element.bind( null , 'table' )
	export let $mol_dev_format_tr = $mol_dev_format_element.bind( null , 'tr' )
	export let $mol_dev_format_td = $mol_dev_format_element.bind( null , 'td' )

	export let $mol_dev_format_accent = $mol_dev_format_span.bind( null , {
		'color' : 'magenta' ,
	} )

	export let $mol_dev_format_strong = $mol_dev_format_span.bind( null , {
		'font-weight' : 'bold' ,
	} )

	export let $mol_dev_format_string = $mol_dev_format_span.bind( null , {
		'color' : 'green',
	} )

	export let $mol_dev_format_shade = $mol_dev_format_span.bind( null , {
		'color' : 'gray',
	} )

	export let $mol_dev_format_indent = $mol_dev_format_div.bind( null , {
		'margin-left': '13px'
	} )

}
