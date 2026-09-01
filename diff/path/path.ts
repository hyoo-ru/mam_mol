namespace $ {

	export function $mol_diff_path< Item >( ... paths : Item[][] ) {

		const limit = Math.min( ... paths.map( path => path.length ) )

		lookup: for( var i = 0 ; i < limit ; ++i ) {

			const first = paths[0][i]

			for( let j = 1 ; j < paths.length ; ++j ) {
				if( paths[j][i] !== first ) break lookup
			}

		}

		return {
			prefix : paths[0].slice( 0 , i ) ,
			suffix : paths.map( path => path.slice( i ) ) ,
		}

	}

}
