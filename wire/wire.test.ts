namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new class extends $mol_wire_pub { p = 1 }
			const pub2 = new class extends $mol_wire_pub { p = 2 }
			
			let absorbed = [] as unknown[]
			const sub = new class extends $mol_wire_pub_sub {
				absorb( pub: unknown ) {
					absorbed.push( pub )
				}
			}
			
			const bu1 = sub.begin()
			try {
				$mol_wire?.promo( pub1 )
				$mol_wire?.promo( pub2 )
				$mol_wire?.promo( pub2 )
			} finally {
				sub.end( bu1 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( absorbed, [ pub1, pub2, pub2 ] )
			
			absorbed = []
			
			const bu2 = sub.begin()
			try {
				$mol_wire?.promo( pub1 )
				$mol_wire?.promo( pub1 )
				$mol_wire?.promo( pub2 )
			} finally {
				sub.end( bu2 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( absorbed, [ pub1, pub1, pub2 ] )
			
		},
		
	})
}
