namespace $ {
	$mol_test({
		
		'Collect deps'() {
			
			const pub1 = new class extends $mol_wire_pub { p = 1 }
			const pub2 = new class extends $mol_wire_pub { p = 2 }
			
			let emited = [] as number[]
			const sub = new class extends $mol_wire_sub {
				stale( pub_pos: number ) {
					emited.push( pub_pos )
				}
			}
			
			const bu1 = sub.begin()
			try {
				$mol_wire_auto?.promo( pub1 )
				$mol_wire_auto?.promo( pub2 )
				$mol_wire_auto?.promo( pub2 )
			} finally {
				sub.end( bu1 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( emited, [ 0, 1, 2 ] )
			
			emited = []
			
			const bu2 = sub.begin()
			try {
				$mol_wire_auto?.promo( pub1 )
				$mol_wire_auto?.promo( pub1 )
				$mol_wire_auto?.promo( pub2 )
			} finally {
				sub.end( bu2 )
			}
			
			pub1.emit()
			pub2.emit()
			
			$mol_assert_like( emited, [ 0, 1, 2 ] )
			
		},
		
	})
}
