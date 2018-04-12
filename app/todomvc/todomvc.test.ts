namespace $.$$ {

	$mol_test({

		'task add'( $ ) {

			const app = $mol_app_todomvc.make({ $ })

			$mol_assert_equal( app.task_ids().toString() , '' )

			app.Add().value( 'test title' )
			app.Add().event_done()

			$mol_assert_equal( app.task_ids().toString() , '1' )
			$mol_assert_equal( app.Add().value() , '' )

		} ,

		'task rename'( $ ) {

			const app = $mol_app_todomvc.make({ $ })

			app.Add().value( 'test title' )
			app.Add().event_done()

			$mol_assert_equal( app.task_title( 1 ) , 'test title' )

			app.Task_row(1).Title().value( 'test title 2' )
			$mol_assert_equal( app.task_title( 1 ) , 'test title 2' )

		} ,

		'task toggle'( $ ) {

			const app = $mol_app_todomvc.make({ $ })

			app.task_title_new( 'test title' )
			app.event_add()

			$mol_assert_equal( app.task_completed( 1 ) , false )

			app.Task_row(1).Complete().event_click()
			$mol_assert_equal( app.task_completed( 1 ) , true )
			
			app.Task_row(1).Complete().event_click()
			$mol_assert_equal( app.task_completed( 1 ) , false )
			
		} ,

		'navigation'( $ ) {

			const app = $mol_app_todomvc.make({ $ })

			app.Add().value( 'test title' )
			app.Add().event_done()

			app.Add().value( 'test title 2' )
			app.Add().event_done()

			app.Task_row(1).Complete().event_click()

			$mol_assert_equal( app.task_ids_filtered().toString() , '1,2' )

			app.$.$mol_state_arg.href( app.Filter_completed().uri() )
			$mol_assert_equal( app.task_ids_filtered().toString() , '1' )
			
			app.$.$mol_state_arg.href( app.Filter_active().uri() )
			$mol_assert_equal( app.task_ids_filtered().toString() , '2' )
			
			app.$.$mol_state_arg.href( app.Filter_all().uri() )
			$mol_assert_equal( app.task_ids_filtered().toString() , '1,2' )
			
		} ,

	})

}
