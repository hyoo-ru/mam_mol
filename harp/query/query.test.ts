namespace $ {
	$mol_test({

		'root' () {
			
			const harp = $mol_harp_query.parse( '' )
			
			$mol_assert_equal( harp , undefined )

		} ,

		'only field' () {
			
			const harp = $mol_harp_query.parse( 'user%20777' )
			
			$mol_assert_equal( harp.name , 'user 777' )

			$mol_assert_equal( harp.toString() , 'user%20777' )

		} ,
		
		'primary key' () {
			
			const harp = $mol_harp_query.parse( 'user=jin%20777' )
			
			$mol_assert_equal( harp.name , 'user' )
			$mol_assert_equal( harp.values[0].min , 'jin 777' )
			$mol_assert_equal( harp.values[0].max , 'jin 777' )

			$mol_assert_equal( harp.toString() , 'user=jin%20777' )

		} ,
		
		'single fetch' () {

			const harp = $mol_harp_query.parse( '[age%24]' )
			
			$mol_assert_equal( harp.fetch.age$.name , 'age$' )
			
			$mol_assert_equal( harp.toString() , '[age%24]' )

		} ,
		
		'fetch and primary key' () {

			const harp = $mol_harp_query.parse( 'user=jin[friend]' )
			
			$mol_assert_equal( harp.name , 'user' )
			$mol_assert_equal( harp.values[0].min , 'jin' )
			$mol_assert_equal( harp.values[0].max , 'jin' )
			$mol_assert_equal( harp.fetch.friend.name , 'friend' )

		} ,
		
		'multiple fetch' () {

			const harp = $mol_harp_query.parse( '[age][friend]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.friend.name , 'friend' )

			$mol_assert_equal( harp.toString() , '[age][friend]' )

		} ,
		
		'deep fetch' () {

			const harp = $mol_harp_query.parse( '[friend[age]]' )
			
			$mol_assert_equal( harp.fetch.friend.name , 'friend' )
			$mol_assert_equal( harp.fetch.friend.fetch.age.name , 'age' )

			$mol_assert_equal( harp.toString() , '[friend[age]]' )

		} ,
		
		'no order' () {

			const harp = $mol_harp_query.parse( '[age]' )
			
			$mol_assert_equal( harp.order , undefined )

			$mol_assert_equal( harp.toString() , '[age]' )

		} ,
		
		'asc order' () {
			
			const harp = $mol_harp_query.parse( '[+age]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.order , '+' )

			$mol_assert_equal( harp.toString() , '[+age]' )

		} ,
		
		'desc order' () {
			
			const harp = $mol_harp_query.parse( '[-age]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.order , '-' )
			
			$mol_assert_equal( harp.toString() , '[-age]' )

		} ,
		
		'no filter' () {
			
			const harp = $mol_harp_query.parse( '[age]' )
			
			$mol_assert_equal( harp.fetch.age.filter , undefined )
			$mol_assert_equal( harp.fetch.age.values.length , 0 )
		
			$mol_assert_equal( harp.toString() , '[age]' )

		} ,
		
		'filter only' () {
			
			const harp = $mol_harp_query.parse( '[age=18]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.age.values[0].min , '18' )
			$mol_assert_equal( harp.fetch.age.values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=18]' )

		} ,
		
		'filter except' () {
			
			const harp = $mol_harp_query.parse( '[age@18]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '@' )
			$mol_assert_equal( harp.fetch.age.values[0].min , '18' )
			$mol_assert_equal( harp.fetch.age.values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age@18]' )

		} ,
		
		'filter between' () {
			
			const harp = $mol_harp_query.parse( '[age=10&18]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.age.values[0].min , '10' )
			$mol_assert_equal( harp.fetch.age.values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=10&18]' )

		} ,
		
		'filter before' () {
			
			const harp = $mol_harp_query.parse( '[age=&18]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.age.values[0].min , undefined )
			$mol_assert_equal( harp.fetch.age.values[0].max , '18' )
			
			$mol_assert_equal( harp.toString() , '[age=&18]' )

		} ,
		
		'filter after' () {
			
			const harp = $mol_harp_query.parse( '[age=18&]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.age.values[0].min , '18' )
			$mol_assert_equal( harp.fetch.age.values[0].max , undefined )
			
			$mol_assert_equal( harp.toString() , '[age=18&]' )

		} ,
		
		'value unescaping' () {
			
			const harp = $mol_harp_query.parse( '[age=10%2618]' )
			
			$mol_assert_equal( harp.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.age.values[0].min , '10&18' )
			$mol_assert_equal( harp.fetch.age.values[0].max , '10&18' )
			
			$mol_assert_equal( harp.toString() , '[age=10%2618]' )

		} ,
		
		'filter by list' () {
			
			const harp = $mol_harp_query.parse( '[size=M,L]' )
			
			$mol_assert_equal( harp.fetch.size.name , 'size' )
			$mol_assert_equal( harp.fetch.size.filter , '=' )
			$mol_assert_equal( harp.fetch.size.values[0].min , 'M' )
			$mol_assert_equal( harp.fetch.size.values[0].max , 'M' )
			$mol_assert_equal( harp.fetch.size.values[1].min , 'L' )
			$mol_assert_equal( harp.fetch.size.values[1].max , 'L' )
			
			$mol_assert_equal( harp.toString() , '[size=M,L]' )

		} ,

		'limit between' () {
			
			const harp = $mol_harp_query.parse( '[=0]' )
			
			$mol_assert_equal( harp.fetch[''].name , '' )
			$mol_assert_equal( harp.fetch[''].filter , '=' )
			$mol_assert_equal( harp.fetch[''].values[0].min , '0' )
			$mol_assert_equal( harp.fetch[''].values[0].max , '0' )
			
			$mol_assert_equal( harp.toString() , '[=0]' )

		} ,
		
		'complex uri' () {
			
			const harp = $mol_harp_query.parse( '[image[size@&XS,XL&]][user[age=18%26]]' )
			
			$mol_assert_equal( harp.name , '' )
			
			$mol_assert_equal( harp.fetch.image.name , 'image' )
			$mol_assert_equal( harp.fetch.image.fetch.size.name , 'size' )
			$mol_assert_equal( harp.fetch.image.fetch.size.filter , '@' )
			$mol_assert_equal( harp.fetch.image.fetch.size.values[0].min , undefined )
			$mol_assert_equal( harp.fetch.image.fetch.size.values[0].max , 'XS' )
			$mol_assert_equal( harp.fetch.image.fetch.size.values[1].min , 'XL' )
			$mol_assert_equal( harp.fetch.image.fetch.size.values[1].max , undefined )
			
			$mol_assert_equal( harp.fetch.user.name , 'user' )
			$mol_assert_equal( harp.fetch.user.fetch.age.name , 'age' )
			$mol_assert_equal( harp.fetch.user.fetch.age.filter , '=' )
			$mol_assert_equal( harp.fetch.user.fetch.age.values[0].min , '18&' )
			$mol_assert_equal( harp.fetch.user.fetch.age.values[0].max , '18&' )
			
			$mol_assert_equal( harp.toString() , '[image[size@&XS,XL&]][user[age=18%26]]' )
			
		} ,
		
	})
}
