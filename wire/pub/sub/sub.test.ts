namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new $mol_wire_pub
			const pub2 = new $mol_wire_pub
			const sub = new $mol_wire_pub_sub
			
			const bu1 = sub.track_on()
			try {
				pub1.track_promote()
				pub2.track_promote()
				pub2.track_promote()
			} finally {
				sub.track_off( bu1 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( sub.pub_list, [ pub1, pub2, pub2 ] )
			
			const bu2 = sub.track_on()
			try {
				pub1.track_promote()
				pub1.track_promote()
				pub2.track_promote()
			} finally {
				sub.track_off( bu2 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( sub.pub_list, [ pub1, pub1, pub2 ] )
			
		},
		
		'cyclic detection'( $ ) {
			
			const sub1 = new $mol_wire_pub_sub
			const sub2 = new $mol_wire_pub_sub
			
			const bu1 = sub1.track_on()
			try {
				
				const bu2 = sub2.track_on()
				try {
					
					$mol_assert_fail( ()=> sub1.track_promote(), 'Circular subscription' )
					
				} finally {
					sub2.track_off( bu2 )
				}
				
			} finally {
				sub1.track_off( bu1 )
			}
			
		},

	})
}
