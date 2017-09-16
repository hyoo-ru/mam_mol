namespace $.$$ {
	
	export class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
		
		@ $mol_mem
		hierarchy() {
			const dict : { [ key : string ] : $mol_grid_node } = {}
			dict[ '' ] = {
				id : '' ,
				parent : null ,
				sub : [] ,
			}
			for( let i = 1 ; i < 30000 ; ++i ) {
				const parent = dict[ Math.floor( Math.random() * i ) || '' ] 
				const node = dict[ i ] = {
					id : `${ i || '' }` ,
					parent ,
					sub : [] as $mol_grid_node[] ,
				}
				parent.sub.push( node )
			}
			return dict
		}
		
		@ $mol_mem_key
		record( path : number[] ) {
			return {
				name : $mol_stub_person_name() ,
				age : Math.ceil( Math.random() * 50 ) ,
				sex : $mol_stub_select_random([ 'male' , 'female' ]) ,
				sexPrefer : $mol_stub_select_random([ 'male' , 'female' ]) ,
				birthDay : $mol_stub_time( - 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				birthCity : $mol_stub_city() ,
				deathDay : $mol_stub_time( 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				deathCity : $mol_stub_city() ,
				cityWork : $mol_stub_city() ,
				company : $mol_stub_company_name() ,
				phoneOS : $mol_stub_select_random([ 'iOS' , 'Android' , 'Windows' ]) ,
				fingersCount : 7 + Math.ceil( Math.random() * 3 )
			}
		}
		
	}
	
}
