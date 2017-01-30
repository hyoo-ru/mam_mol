declare var hhfw : any
declare var sqlitePlugin : any

namespace $ {
	export class $mol_hyperhive extends $mol_object {
		
		@ $mol_mem_key()
		static initialize( params : { host : string , version : string , environment : string , project : string , application : string } ) {
			if( typeof hhfw !== 'undefined' ) hhfw.Init( params.host , params.version , params.environment , params.project , params.application )
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
							resource.table ,
							( result : any ) => {
								hhfw.QueryToResTable(
									resource.table ,
									`select * from ${ resource.table }_$_${ resource.table }` ,
									( resp : string )=> {
										$mol_hyperhive.data( resource , JSON.parse( resp ).data || null , $mol_atom_force )
									} ,
									handleError ,
								)
							} ,
							handleError ,
						)
					} else {
						hhfw.Post(
							resource.table ,
							JSON.stringify( next ) ,
							( resp : any )=> {
								console.log( resp )
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
