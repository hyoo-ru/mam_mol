namespace $ {

	type type_obj = {
		foo: {
			bar: {
				wee: {
					too: ()=> number
				}
				kek: string
			}
			lis: Array< number >
			prom: Promise< any >
		}
	}

	type type_obj_optional = {
		foo?: {
			bar?: {
				wee?: {
					too?: ()=> number
				}
				kek?: string
			}
			lis?: Array< number >
			prom?: Promise< any >
		}
	}

	type point = { x: number; y: number }


	type keys1 = $mol_type_assert<

		$mol_type_flat_keys<
			type_obj
		>,
		'foo.lis' | 'foo.prom' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type keys2 = $mol_type_assert<

		$mol_type_flat_keys<
			type_obj_optional
		>,
		'foo.lis' | 'foo.prom' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type keys3 = $mol_type_assert<

		$mol_type_flat_keys<
			{
				a: { prop1: string } | number | { prop2: number }
			}
		>,
		'a' | 'a.prop1' | 'a.prop2'

	>

	type keys4 = $mol_type_assert<

		$mol_type_flat_keys<
			{
				a: { prop1: { prop2: number } } | number | { prop3: number }
			}
		>,
		'a' | 'a.prop1.prop2' | 'a.prop3'

	>

	type keys5 = $mol_type_assert<

		$mol_type_flat_keys<
			{ a: { b: { c: { d: string } | number } } }
		>,
		'a.b.c' | 'a.b.c.d'

	>

	type keys_endpoint1 = $mol_type_assert<

		$mol_type_flat_keys<
			type_obj & { position: point },
			point
		>,
		'position' | 'foo.lis' | 'foo.prom' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type keys_endpoint2 = $mol_type_assert<

		$mol_type_flat_keys<
			{ a: { b: { c: { position: point } } } },
			point
		>,
		'a.b.c.position'

	>

	type all1 = $mol_type_assert<

		$mol_type_flat_keys_all<
			type_obj
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type all2 = $mol_type_assert<

		$mol_type_flat_keys_all<
			type_obj_optional
		>,
		'foo' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type all3 = $mol_type_assert<

		$mol_type_flat_keys_all<
			{
				a: { prop1: string } | number | { prop2: number }
			}
		>,
		'a' | 'a.prop1' | 'a.prop2'

	>

	type all4 = $mol_type_assert<

		$mol_type_flat_keys_all<
			{
				a: { prop1: { prop2: number } } | number | { prop3: number }
			}
		>,
		'a' | 'a.prop1' | 'a.prop1.prop2' | 'a.prop3'

	>

	type all5 = $mol_type_assert<

		$mol_type_flat_keys_all<
			{ a: { b: { c: { d: string } | number } } }
		>,
		'a' | 'a.b' | 'a.b.c' | 'a.b.c.d'

	>

	type all_endpoint1 = $mol_type_assert<

		$mol_type_flat_keys_all<
			type_obj & { position: point },
			point
		>,
		'foo' | 'position' | 'foo.bar' | 'foo.lis' | 'foo.prom' | 'foo.bar.wee' | 'foo.bar.kek' | 'foo.bar.wee.too'

	>

	type all_endpoint2 = $mol_type_assert<

		$mol_type_flat_keys_all<
			{ a: { b: { c: { position: point } } } },
			point
		>,
		'a' | 'a.b' | 'a.b.c' | 'a.b.c.position'

	>

}
