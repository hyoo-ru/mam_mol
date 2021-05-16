namespace $ {

	export function $mol_tree2_wasm_to_bin( this: $, code : $mol_tree2 ) {

		const bytes = ( bytes : ArrayLike< number > , span : $mol_span ) => $mol_tree2_bin_from_bytes( bytes , span ).kids

		const int = ( int : number , span : $mol_span ) => bytes( $mol_leb128_encode( int ) , span )
	
		const dyn = ( items : readonly $mol_tree2[] , span : $mol_span ) => [ ... int( items.length , span ) , ... items ]
	
		const str = ( str : string , span : $mol_span ) => dyn( $mol_tree2_bin_from_string( str , span ).kids , span )
		
		const array_prolog = ( input: $mol_tree2, span = input.span )=> int( input.kids.length, span )
	
		const pending = ( input: $mol_tree2 )=> $mol_fail( input.error( 'Pending implementation' ) )
		
		const prolog = this.$mol_tree2_from_string( `
			\\00
			\\61
			\\73
			\\6D
			\\01
			\\00
			\\00
			\\00
		`, '$mol_tree2_wasm_to_bin_prolog' )
				
		const body = [] as $mol_tree2[]
		const types_mapping = new Map< string, number >()

		customs: {
			
			const customs = code.select( 'custom' )
			for( const custom of customs.kids ) {
				
				const name = custom.kids[0]
				const section = [] as $mol_tree2[]
				section.push( ... str( name.type, name.span ) )
				
				body.push( ... bytes( [ $mol_wasm_section_types.custom ], custom.span ) )
				body.push( ... dyn( section, custom.span ) )
				
			}
			
		}
		
		types: {
			
			const types = code.select( 'type' )
			if( types.kids.length === 0 ) break types
			
			const section = [] as $mol_tree2[]
			
			for( const type of types.kids ) {
				
				section.push( ... bytes( [ 0x60 ], type.span ) )
				
				const name = type.kids[0]
				types_mapping.set( name.type, types_mapping.size )
				
				const params = name.select( '=>', null )
				section.push( ... array_prolog( params ) )
				for( const param of params.kids ) {
					section.push( ... bytes( [ $mol_wasm_value_types[ param.type ] ], param.span ) )
				}
				
				const results = name.select( '<=', null )
				section.push( ... array_prolog( results ) )
				for( const result of results.kids ) {
					section.push(
						... bytes( [ $mol_wasm_value_types[ result.type ] ], result.span ),
					)
				}
				
			}
			
			body.push(
				... bytes( [ $mol_wasm_section_types.type ], prolog.span ),
				... dyn( [
					... array_prolog( types, prolog.span ),
					... section,
				], prolog.span ),
			)
			
		}
		
		imports: {
			
			const imports = code.select( 'import' )
			if( imports.kids.length === 0 ) break imports
			
			const section = [] as $mol_tree2[]
			
			for( const import_ of imports.kids ) {
				
				const path = import_.kids[0]
				const kind = path.kids[0]
				
				for( const name of path.type.split('.') ) {
					section.push( ... str( name, path.span ) )
				}
				
				if( kind.type === 'func' ) {
					
					const name = kind.kids[0]
					
					const index = types_mapping.get( name.type )
					if( index === undefined ) this.$mol_fail( name.error( 'Unknown type' ) )
					
					section.push(
						... bytes( [ $mol_wasm_import_types.func ], kind.span ),
						... int( index, name.span ),
					)
					
				}
				
			}
			
			body.push(
				... bytes( [ $mol_wasm_section_types.import ], prolog.span ),
				... dyn( [
					... array_prolog( imports, prolog.span ),
					... section,
				], prolog.span ),
			)
			
		}
		
		return code.list([
			... prolog.kids ,
			... body,
		])

	}

}
