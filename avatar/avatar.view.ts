namespace $.$$ {
	export class $mol_avatar extends $.$mol_avatar {
		
		@ $mol_mem
		path() {
			
			const id = $mol_hash_string( this.id() )
			const p = 2
			const m = 2.8
			
			let path = ''
			
			for( let x = 0; x < 4; ++x ) {
				for( let y = 0; y < 8; ++y ) {
					if( ( id >> ( x + y * 7 ) ) & 1 ) {
						path += `M ${ m*x+p } ${ m*y+p } l 0 0 `
							+ `M ${ 24-m*x-p } ${ m*y+p } l 0 0 `
					}
				}
			}
			
			return path
		}
		
	}
}
