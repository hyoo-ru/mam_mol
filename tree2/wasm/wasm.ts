namespace $ {

	export function $mol_tree2_wasm_to_bin( code : $mol_tree2 ) {

		const bytes = ( bytes : ArrayLike< number > , span : $mol_span ) => $mol_tree2_bin_from_bytes( bytes , span ).kids

		const int = ( int : number , span : $mol_span ) => bytes( $mol_leb128_encode( int ) , span )
	
		const array = ( items : readonly $mol_tree2[] , span : $mol_span ) => [ ... int( items.length , span ) , ... items ]
	
		const str = ( str : string , span : $mol_span ) => array( $mol_tree2_bin_from_string( str , span ).kids , span )
	
		return code.list( code.hack({

			'' : ( input , context )=> $mol_fail( input.error( `Unknown wasm node` ) ) ,
			
			'wasm.module' : ( input , belt )=> {

				const prolog = [ 0 , 0x61 , 0x73 , 0x6d ]
				const version = [ 0x1 , 0 , 0 , 0 ]
				
				return [
					... bytes( [ ... prolog , ... version ] , input.span ) ,
					... input.hack( belt , { up : input.type } ) ,
				]

		 	} ,
			
			'wasm.section' : ( input , belt , context ) => {

				if( context.up !== 'wasm.module' ) {
					$mol_fail( input.error( `wasm.section should be in wasm.module` ) )
				}
				
				return [
					... input.select( 'wasm.id' ).hack( belt , { up : input.type } ) ,
					... array( [
						... input.select( 'wasm.name' ).hack( belt , { up : input.type } ) ,
						... input.select( 'wasm.payload' ).hack( belt , { up : input.type } ) ,
					] , input.span ) ,
				]
	
			} ,
	
			'wasm.id' : ( input , belt , context ) => {

				if( context.up !== 'wasm.section' ) {
					$mol_fail( input.error( `wasm.id should be in wasm.section` ) )
				}
				
				const type_node = input.kids[0]
				if( !type_node ) $mol_fail( input.error( `wasm.id type shoud be defined` ) )
				
				const type = $mol_wasm_section_types[ type_node.type.substring( 5 ) ] as number
				if( type === undefined ) $mol_fail( type_node.error( `Unknown section type` ) )
				
				return bytes( [ type ] , type_node.span )
	
			} ,
	
			'wasm.name' : ( input , belt , context ) => {

				if( context.up !== 'wasm.section' ) {
					$mol_fail( input.error( `wasm.name should be in wasm.section` ) )
				}
				
				return str( input.value , input.span )
	
			} ,
	
			'wasm.payload' : ( input , belt , context ) => {

				if( context.up !== 'wasm.section' ) {
					$mol_fail( input.error( `wasm.payload should be in wasm.section` ) )
				}
				
				return input.hack( belt )
	
			} ,
	
		} , { up : '' } ) )

	}

}
