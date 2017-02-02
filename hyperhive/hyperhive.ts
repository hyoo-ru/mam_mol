declare var hhfw : any
declare var sqlitePlugin : any

namespace $ {
	export class $mol_hyperhive extends $mol_object {
		
		@ $mol_mem_key()
		static initialize( params : { host : string , version : string , environment : string , project : string , application : string } ) {
			if( typeof hhfw === 'undefined' ) return this
			
			hhfw.Init( params.host , params.version , params.environment , params.project , params.application )
			hhfw.SetSslChecks( false )
			
			return this
		}
		
		@ $mol_mem_key()
		static authentificated( credentials : { login : string , password : string } , next? : boolean , force? : $mol_atom_force ) : boolean {
			if( typeof hhfw === 'undefined' ) return true
			hhfw.Auth(
				credentials.login ,
				credentials.password ,
				( message : any )=> this.authentificated( credentials , true , $mol_atom_force ) ,
				( message : any )=> this.authentificated( credentials , new Error( `${ JSON.stringify( credentials ) } ${ message }` ) as any , $mol_atom_force ) ,
			)
			throw new $mol_atom_wait( 'Authentification...' )
		}
		
		@ $mol_mem_key()
		static data< Value >( resource : { uri : string , table : string } , next? : any , force? : $mol_atom_force ) : Value {
			
			if( typeof hhfw === 'undefined' ) {
				const uri = `${ resource.uri }${ resource.table }/table/${ resource.table }/`
				const res = $mol_http_resource_json.item< Value >( uri )
				res.credentials = $mol_const({})
				return res.json()
			}
			
			const handleError = ( message : string ) => {
				const error = new Error( `${ JSON.stringify( resource ) } ${ message }` )
				$mol_hyperhive.data( resource , error , $mol_atom_force )
			}
			
			document.addEventListener(
				'deviceready' , () => {
					
					if( next === void 0 ) {
						hhfw.GetDeltaStream(
							`GET_${ resource.table }` ,
							( result : any ) => {
								console.debug( result )
								hhfw.QueryToResTable(
									`GET_${ resource.table }` ,
									`select * from GET_${ resource.table }_$_GET_${ resource.table }` ,
									( resp : string )=> {
										console.debug( resp.substring( 0 , 512 ) )
										$mol_hyperhive.data( resource , JSON.parse( resp ).data || null , $mol_atom_force )
									} ,
									handleError ,
								)
							} ,
							handleError ,
						)
					} else {
						hhfw.Post(
							`UPSERT_${ resource.table }` ,
							resource.table ,
							JSON.stringify( next ) ,
							( resp : any )=> {
								console.debug( resp )
								$mol_hyperhive.data( resource , void 0 , $mol_atom_force )
							} ,
							handleError
						)
					}
					
				}
			)
			
			throw new $mol_atom_wait( `Loading ${ resource.table } from ${ resource.uri }` )
		
		}
		
	}
}
