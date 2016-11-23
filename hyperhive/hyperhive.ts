declare var hhfw : any
declare var sqlitePlugin : any

namespace $ {
	export class $mol_hyperhive extends $mol_object {
		
		@ $mol_mem_key()
		static data< Value >( resource : { uri : string , table : string } , next? : Value , prev? : Value|Error ) : Value {
			
			if( typeof hhfw === 'undefined' ) {
				const uri = `${ resource.uri }${ resource.table }/table/${ resource.table }/`
				const res = $mol_http_resource_json.item< Value >( uri )
				res.credentials = $mol_const({})
				return res.json()
			}
			
			const handleError = ( message : string ) => {
				const error = new Error( `${ JSON.stringify( resource ) } ${ message }` )
				$mol_hyperhive.data( resource , void 0 , error )
			}
			
			document.addEventListener(
				'deviceready' , () => {
					
					hhfw.GetDeltaStream(
						resource.uri ,
						resource.table ,
						( result : any ) => {
							const db = sqlitePlugin.openDatabase(
								{
									name : "cpprun.db" ,
									location : 'default' ,
								}
							)
							hhfw.ReadFromStorage(
								db ,
								`${ resource.table }_$_${ resource.table }` ,
								( result2 : any ) => {
									const range = new $mol_range_lazy( result2.rows )
									$mol_hyperhive.data( resource , void 0 , range )
								} ,
								handleError ,
							)
						} ,
						handleError ,
					)
					
				}
			)
			
			throw new $mol_atom_wait( `Loading ${ resource.table } from ${ resource.uri }` )
		
		}
		
	}
}
