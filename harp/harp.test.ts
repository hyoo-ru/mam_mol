namespace $ {
	
	function check< Query extends $mol_harp_query<any> >( str: string, query: Query ) {
		$mol_assert_like( str, $mol_harp_to_string( query ) )
		$mol_assert_like( query, $mol_harp_from_string( str ) )
	}
	
	$mol_test({

		'root' () {
			check( '', {} )
		} ,

		'only field' () {
			check(
				'user%3D777',
				{
					'user=777': {},
				},
			)
		} ,
		
		'primary key' () {
			check(
				'user=jin%2C777',
				{
					user: {
						'=': [[ 'jin,777' ]],
					},
				}
			)
		} ,
		
		'single fetch' () {
			check(
				'friend[age%24]',
				{
					friend: {
						age$: {},
					},
				}
			)
		} ,
		
		'fetch and primary key' () {
			check(
				'user=jin[friend]',
				{
					'user': {
						'=': [[ 'jin' ]],
						friend: {},
					},
				},
			)
		} ,
		
		'multiple fetch' () {
			check(
				'age;friend',
				{
					age: {},
					friend: {},
				},
			)
		} ,
		
		'deep fetch' () {
			check(
				'my[friend[age];name];stat',
				{
					my: {
						friend: {
							age: {},
						},
						name: {},
					},
					stat: {},
				},
			)
		} ,
		
		'orders' () {
			check(
				'+age;-name',
				{
					age: {
						'+': true
					},
					name: {
						'+': false
					},
				},
			)
		} ,
		
		'filter types' () {
			check(
				'sex=female;status@married',
				{
					sex: {
						'=': [[ 'female' ]],
					},
					status: {
						'@': [[ 'married' ]],
					},
				},
			)
		} ,
		
		'filter ranges' () {
			check(
				'sex=female;age=18&25;weight=&50;height=150&;hobby=paint,singing',
				{
					sex: {
						'=': [[ 'female' ]],
					},
					age: {
						'=': [[ '18', '25' ]],
					},
					weight: {
						'=': [[ '', '50' ]],
					},
					height: {
						'=': [[ '150', '' ]],
					},
					hobby: {
						'=': [ ['paint'], ['singing'] ],
					},
				},
			)
		} ,
		
		'slicing' () {
			check(
				'friend[_num=0&100]',
				{
					friend: {
						_num: { '=': [[ '0', '100' ]] },
					},
				},
			)
		} ,
		
		'complex' () {
			check(
				'pullRequest[state=closed,merged;+repository[name;private];-updateTime;_num=0&100]',
				{
					pullRequest: {
						state: {
							'=': [
								['closed'],
								['merged'],
							]
						},
						repository: {
							'+': true,
							name: {},
							private: {},
						},
						updateTime: {
							'+': false,
						},
						_num: {
							'=': [[ '0', '100' ]],
						},
					},
				},
			)
		} ,
		
	})
	
}
