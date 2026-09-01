namespace $ {

	$mol_ambient({}).$mol_log3_come({
		request_id: 123456789,
		place: 'my_app.request()',
		message: 'GET',
		path: '/user=123',
		headers: { foo : 'bar' },
	})

	$mol_ambient({}).$mol_log3_rise({
		request_id: 123456789,
		place: 'my_app.session()',
		message: 'Query',
		query: 'select * from user where id = :id',
		params: { id : 123 },
	})

	$mol_ambient({}).$mol_log3_done({
		request_id: 123456789,
		place: 'my_app.request()',
		status: 200,
		message: 'OK',
		size: 123456,
		headers: { 'content-type' : 'application/json' },
	})

	$mol_ambient({}).$mol_log3_fail({
		request_id: 123456789,
		place: 'my_app.request()',
		status: 500,
		message: 'Internal Server Error',
		size: 123456,
	})

	$mol_ambient({}).$mol_log3_warn({
		request_id: 123456789,
		place: 'my_app.encoder()',
		message: 'Long execution',
		hint: 'Add more workers',
		file: 'storage/qawsedrf.avi',
		info: { size : 123456 , format : 'mp4' },
	})

}
