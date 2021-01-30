namespace $ {

	export function $mol_tree2_wasm_to_bin( code : $mol_tree2 ) {

		const bytes = ( bytes : ArrayLike< number > , span : $mol_span ) => $mol_tree2_bin_from_bytes( bytes , span ).kids

		const int = ( int : number , span : $mol_span ) => bytes( $mol_leb128_encode( int ) , span )
	
		const dyn = ( items : readonly $mol_tree2[] , span : $mol_span ) => [ ... int( items.length , span ) , ... items ]
	
		const str = ( str : string , span : $mol_span ) => dyn( $mol_tree2_bin_from_string( str , span ).kids , span )
	
		const prolog = [ 0 , 0x61 , 0x73 , 0x6d ]
		const version = [ 0x1 , 0 , 0 , 0 ]
		
		const section = (
			name: typeof $mol_wasm_section_types[ number ],
		)=> {
			return <
				Belt extends $mol_tree2_belt<any>,
				Context extends { up: string },
			>(
				input: $mol_tree2,
				belt: Belt,
				context: Context,
			) => {

				if( context.up !== 'module' ) {
					$mol_fail( input.error( `${ name } should be in module` ) )
				}
				
				context = {
					... context,
					up: input.type,
				}
				
				return [
					... bytes( [ $mol_wasm_section_types[ name ] ], input.span ),
					... dyn( input.hack( belt, context ), input.span ),
				]
	
			}
		}
		
		const import_ = (
			name: typeof $mol_wasm_import_types[ number ],
		)=> {
			return <
				Belt extends $mol_tree2_belt<any>,
				Context extends { up: string },
			>(
				input: $mol_tree2,
				belt: Belt,
				context: Context,
			) => {

				if( context.up !== 'import' ) {
					$mol_fail( input.error( `${ name } should be in import` ) )
				}
				
				return [
					... bytes( [ $mol_wasm_import_types[ name ] ], input.span ),
					... int( Number( input.kids[0].type ), input.span ),
				]
	
			}
		}
		
		return code.list([
			... bytes( prolog , code.span ) ,
			... bytes( version , code.span ) ,
			... code.hack({

				'' : ( input , belt )=> $mol_fail( input.error( `Unknown wasm node` ) ) ,
				
				'customsec' : section( 'custom' ) ,
				'typesec' : section( 'type' ) ,
				'importsec' : section( 'import' ) ,
		
				'functype': ( input, belt, context )=> {

					if( context.up !== 'typesec' ) {
						$mol_fail( input.error( `functype should be in typesec` ) )
					}
					
					return [
						... bytes( [ 0x60 ], input.span ),
						... input.hack( belt, context ),
					]
		
				} ,
		
				'import': ( input, belt, context )=> {

					if( context.up !== 'importsec' ) {
						$mol_fail( input.error( `import should be in importsec` ) )
					}
					
					context = {
						... context,
						up: input.type,
					}
					
					const ext = input.kids[0]
					
					return [
						... ( [] as $mol_tree2[] ).concat(
							... ext.type.split( '.' ).map( name => str( name, ext.span ) )
						),
						... ext.hack( {
							'': ( input , belt )=> $mol_fail( input.error( `Unknown import type` ) ) ,
							func: import_( 'func' ),
							table: import_( 'table' ),
							mem: import_( 'mem' ),
							global: import_( 'global' ),
						}, context ),
					]
					
				} ,
		
				'vec': ( input, belt, context )=> [
					... int( input.kids.length, input.span ),
					... input.hack( belt, context )
				],
		
				'name': input => str( input.text(), input.span ),
		
				'i32': input => bytes( [ 0x7F ], input.span ),
				'i64': input => bytes( [ 0x7E ], input.span ),
				'f32': input => bytes( [ 0x7D ], input.span ),
				'f64': input => bytes( [ 0x7C ], input.span ),

			} , {
				up: 'module',
				section: '',
			} )
		])

	}

}
