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
						
						const mxp = Math.ceil( m*x+p )
						const myp = Math.ceil( m*y+p )
						
						path += `M ${ mxp } ${ myp } l 0 0 ` + `M ${ 24-mxp } ${ myp } l 0 0 `
						
					}
				}
			}
			
			return path
		}
		
	}
}
