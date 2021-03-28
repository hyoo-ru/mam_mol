namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new class extends $mol_wire_pub { p = 1 }
			const pub2 = new class extends $mol_wire_pub { p = 2 }
			
			let absorbed = [] as unknown[]
			const sub = new class extends $mol_wire_sub {
				wire_absorb( pub: unknown ) {
					absorbed.push( pub )
				}
			}
			
			const bu1 = sub.wire_begin()
			try {
				$mol_wire?.wire_promo( pub1 )
				$mol_wire?.wire_promo( pub2 )
				$mol_wire?.wire_promo( pub2 )
			} finally {
				sub.wire_end( bu1 )
			}
			
			pub1.wire_emit()
			pub2.wire_emit()
			
			$mol_assert_like( absorbed, [ pub1, pub2, pub2 ] )
			
			absorbed = []
			
			const bu2 = sub.wire_begin()
			try {
				$mol_wire?.wire_promo( pub1 )
				$mol_wire?.wire_promo( pub1 )
				$mol_wire?.wire_promo( pub2 )
			} finally {
				sub.wire_end( bu2 )
			}
			
			pub1.wire_emit()
			pub2.wire_emit()
			
			$mol_assert_like( absorbed, [ pub1, pub1, pub2 ] )
			
		},
		
	})
}
