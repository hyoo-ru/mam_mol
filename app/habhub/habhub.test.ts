namespace $.$mol {
	
	$mol_test({
		'gist content is title + body'() {
			
			const app = new $mol_app_habhub
			
			app.gists = ()=> [
				{
					id : 1 ,
					title : 'hello' ,
					body : 'world' ,
				}
			]
			
			$mol_assert_equal( app.gist_content( 0 ) , '# hello\nworld' )
			
		}
	})
	
}
