namespace $ {
	$mol_test({

		'root' () {
			
			const harp = $mol_harp_query.parse( '' )
			
			$mol_assert_equal( harp , undefined )

		} ,

		'only field' () {
			
			const harp = $mol_harp_query.parse( 'user' )
			
			$mol_assert_equal( harp.name , 'user' )

			$mol_assert_equal( harp.toString() , 'user' )

		} ,
		
		'primary key' () {
			
			const harp = $mol_harp_query.parse( 'user=jin' )
			
			$mol_assert_equal( harp.name , 'user' )
			$mol_assert_equal( harp.values[0].min , 'jin' )
			$mol_assert_equal( harp.values[0].max , 'jin' )

			$mol_assert_equal( harp.toString() , 'user=jin' )

		} ,
		
		'single fetch' () {

			const harp = $mol_harp_query.parse( '[age]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			
			$mol_assert_equal( harp.toString() , '[age]' )

		} ,
		
		'fetch and primary key' () {

			const harp = $mol_harp_query.parse( 'user=jin[friend]' )
			
			$mol_assert_equal( harp.name , 'user' )
			$mol_assert_equal( harp.values[0].min , 'jin' )
			$mol_assert_equal( harp.values[0].max , 'jin' )
			$mol_assert_equal( harp.fetch[0].name , 'friend' )

		} ,
		
		'multiple fetch' () {

			const harp = $mol_harp_query.parse( '[age][friend]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[1].name , 'friend' )

			$mol_assert_equal( harp.toString() , '[age][friend]' )

		} ,
		
		'deep fetch' () {

			const harp = $mol_harp_query.parse( '[friend[age]]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'friend' )
			$mol_assert_equal( harp.fetch[0].fetch[0].name , 'age' )

			$mol_assert_equal( harp.toString() , '[friend[age]]' )

		} ,
		
		'no order' () {

			const harp = $mol_harp_query.parse( '[age]' )
			
			$mol_assert_equal( harp.order , undefined )

			$mol_assert_equal( harp.toString() , '[age]' )

		} ,
		
		'asc order' () {
			
			const harp = $mol_harp_query.parse( '[+age]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].order , 'asc' )

			$mol_assert_equal( harp.toString() , '[+age]' )

		} ,
		
		'desc order' () {
			
			const harp = $mol_harp_query.parse( '[-age]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].order , 'desc' )
			
			$mol_assert_equal( harp.toString() , '[-age]' )

		} ,
		
		'no filter' () {
			
			const harp = $mol_harp_query.parse( '[age]' )
			
			$mol_assert_equal( harp.fetch[0].filter , undefined )
			$mol_assert_equal( harp.fetch[0].values.length , 0 )
		
			$mol_assert_equal( harp.toString() , '[age]' )

		} ,
		
		'filter only' () {
			
			const harp = $mol_harp_query.parse( '[age=18]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '18' )
			$mol_assert_equal( harp.fetch[0].values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=18]' )

		} ,
		
		'filter except' () {
			
			const harp = $mol_harp_query.parse( '[age!=18]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'except' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '18' )
			$mol_assert_equal( harp.fetch[0].values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age!=18]' )

		} ,
		
		'filter between' () {
			
			const harp = $mol_harp_query.parse( '[age=10&18]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '10' )
			$mol_assert_equal( harp.fetch[0].values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=10&18]' )

		} ,
		
		'filter before' () {
			
			const harp = $mol_harp_query.parse( '[age=&18]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , undefined )
			$mol_assert_equal( harp.fetch[0].values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=&18]' )

		} ,
		
		'filter after' () {
			
			const harp = $mol_harp_query.parse( '[age=18&]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '18' )
			$mol_assert_equal( harp.fetch[0].values[0].max , undefined )
			
			$mol_assert_equal( harp.toString() , '[age=18&]' )

		} ,
		
		'value unescaping' () {
			
			const harp = $mol_harp_query.parse( '[age=10%2618]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '10&18' )
			$mol_assert_equal( harp.fetch[0].values[0].max , '10&18' )
			
			$mol_assert_equal( harp.toString() , '[age=10%2618]' )

		} ,
		
		'filter by list' () {
			
			const harp = $mol_harp_query.parse( '[size=M,L]' )
			
			$mol_assert_equal( harp.fetch[0].name , 'size' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , 'M' )
			$mol_assert_equal( harp.fetch[0].values[0].max , 'M' )
			$mol_assert_equal( harp.fetch[0].values[1].min , 'L' )
			$mol_assert_equal( harp.fetch[0].values[1].max , 'L' )
			
			$mol_assert_equal( harp.toString() , '[size=M,L]' )

		} ,

		'limit between' () {
			
			const harp = $mol_harp_query.parse( '[=0]' )
			
			$mol_assert_equal( harp.fetch[0].name , '' )
			$mol_assert_equal( harp.fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[0].values[0].min , '0' )
			$mol_assert_equal( harp.fetch[0].values[0].max , '0' )
			
			$mol_assert_equal( harp.toString() , '[=0]' )

		} ,
		
		'complex uri' () {
			
			const harp = $mol_harp_query.parse( '[user[size!=&XS,XL&]][user[age=18%26]]' )
			
			$mol_assert_equal( harp.name , '' )
			
			$mol_assert_equal( harp.fetch[0].name , 'user' )
			$mol_assert_equal( harp.fetch[0].fetch[0].name , 'size' )
			$mol_assert_equal( harp.fetch[0].fetch[0].filter , 'except' )
			$mol_assert_equal( harp.fetch[0].fetch[0].values[0].min , undefined )
			$mol_assert_equal( harp.fetch[0].fetch[0].values[0].max , 'XS' )
			$mol_assert_equal( harp.fetch[0].fetch[0].values[1].min , 'XL' )
			$mol_assert_equal( harp.fetch[0].fetch[0].values[1].max , undefined )
			
			$mol_assert_equal( harp.fetch[1].name , 'user' )
			$mol_assert_equal( harp.fetch[1].fetch[0].name , 'age' )
			$mol_assert_equal( harp.fetch[1].fetch[0].filter , 'only' )
			$mol_assert_equal( harp.fetch[1].fetch[0].values[0].min , '18&' )
			$mol_assert_equal( harp.fetch[1].fetch[0].values[0].max , '18&' )
			
			$mol_assert_equal( harp.toString() , '[user[size!=&XS,XL&]][user[age=18%26]]' )
			
		} ,
		
	})
}
