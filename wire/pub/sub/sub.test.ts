namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new $mol_wire_pub
			const pub2 = new $mol_wire_pub
			const sub = new $mol_wire_pub_sub
			
			const bu1 = sub.begin()
			try {
				pub1.promote()
				pub2.promote()
				pub2.promote()
			} finally {
				sub.end( bu1 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( sub.pubs, [ pub1, pub2, pub2 ] )
			
			const bu2 = sub.begin()
			try {
				pub1.promote()
				pub1.promote()
				pub2.promote()
			} finally {
				sub.end( bu2 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( sub.pubs, [ pub1, pub1, pub2 ] )
			
		},
		
		'cyclic detection'( $ ) {
			
			const sub1 = new $mol_wire_pub_sub
			const sub2 = new $mol_wire_pub_sub
			
			const bu1 = sub1.begin()
			try {
				
				const bu2 = sub2.begin()
				try {
					
					$mol_assert_fail( ()=> sub1.promote(), 'Circular subscription' )
					
				} finally {
					sub2.end( bu2 )
				}
				
			} finally {
				sub1.end( bu1 )
			}
			
		},

	})
}
