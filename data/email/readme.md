# $mol_data_email

Checks for E-Mail and returns string type.

	const From = $mol_data_email
	const from = From( 'jin@example.org' ) // ✅

	From( 'jin' ) // ❌ jin is not a /.+@.+/
