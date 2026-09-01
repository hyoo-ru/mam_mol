namespace $ {
	const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

	$mol_test({
		'jwt decode'() {
			$mol_assert_like(
				$mol_jwt_decode(token),
				{
					payload: {
						sub: "1234567890",
						name: "John Doe",
						iat: 1516239022
					},
					headers:{
						alg:"HS256",
						typ:"JWT"
					}
				}
			)
		},
	})
}
