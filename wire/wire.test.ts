namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new class extends $mol_wire_pub { p = 1 }
			const pub2 = new class extends $mol_wire_pub { p = 2 }
			const sub = new $mol_wire_pub_sub
			
			const bu1 = sub.begin()
			try {
				pub1.promo()
				pub2.promo()
				pub2.promo()
			} finally {
				sub.end( bu1 )
			}
			
			pub1.emit( $mol_wire_stale )
			pub2.emit( $mol_wire_stale )
			
			$mol_assert_like( sub.wire_pubs, [ pub1, pub2, pub2 ] )
			
			const bu2 = sub.begin()
			try {
				pub1.promo()
				pub1.promo()
				pub2.promo()
			} finally {
				sub.end( bu2 )
			}
			
			pub1.emit( $mol_wire_stale )
			pub2.emit( $mol_wire_stale )
			
			$mol_assert_like( sub.wire_pubs, [ pub1, pub1, pub2 ] )
			
		},
		
		'cyclic detection'( $ ) {
			
			const sub1 = new $mol_wire_pub_sub
			const sub2 = new $mol_wire_pub_sub
			
			const bu1 = sub1.begin()
			try {
				
				const bu2 = sub2.begin()
				try {
					
					$mol_assert_fail( ()=> sub1.promo(), 'Circular subscription' )
					
				} finally {
					sub2.end( bu2 )
				}
				
			} finally {
				sub1.end( bu1 )
			}
			
		},

	})
}
