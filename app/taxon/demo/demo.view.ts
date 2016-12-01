namespace $.$mol {
	
	export class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
		
		@ $mol_mem()
		hierarhy() {
			const dict : { [ key : number ] : $mol_app_taxon_hierarhy_node } = {}
			dict[ 0 ] = {
				id : 0 ,
				parent : null ,
				childs : []
			}
			for( let i = 1 ; i < 30000 ; ++i ) {
				const parent = dict[ Math.floor( Math.random() * i ) ] 
				const node = dict[ i ] = {
					id : i ,
					parent ,
					childs : [] as $mol_app_taxon_hierarhy_node[] ,
				}
				parent.childs.push( node )
			}
			return dict
		}
		
		@ $mol_mem_key()
		record( path : number[] ) {
			return {
				name : $mol_stub_personName() ,
				age : Math.ceil( Math.random() * 50 ) ,
				sex : $mol_stub_selectRandom([ 'male' , 'female' ]) ,
				sexPrefer : $mol_stub_selectRandom([ 'male' , 'female' ]) ,
				birthDay : $mol_stub_time( - 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				birthCity : $mol_stub_city() ,
				deathDay : $mol_stub_time( 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				deathCity : $mol_stub_city() ,
				cityWork : $mol_stub_city() ,
				company : $mol_stub_companyName() ,
				phoneOS : $mol_stub_selectRandom([ 'iOS' , 'Android' , 'Windows' ]) ,
				fingersCount : 7 + Math.ceil( Math.random() * 3 )
			}
		}
		
	}
	
}
