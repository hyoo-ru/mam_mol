namespace $ {

	type volume1 = $mol_type_assert<

		$mol_type_volume<
			{ a: number; b: string }
		>,
		{ a: number; b: string }

	>

	type volume2 = $mol_type_assert<

		$mol_type_volume<
			{
				'foo.bar': number
				'foo.wee': Array< string >
				'foo.too.kek': string | number
				'foo.too.lol': { ufo: boolean }
				'hey': 'hey'
			}
		>,
		{
			foo: {
				bar: number
				wee: Array< string >
				too: {
					kek: string | number
					lol: {
						ufo: boolean
					}
				}
			}
			hey: 'hey'
		}

	>

	type volume3 = $mol_type_assert<

		$mol_type_volume<
			{
				'jey': number | undefined
				'pou.lou': string | undefined
				'pou.dou.wou': number
				'pou.sow': boolean
				'jod.mim': { val: number } | undefined
			}
		>,
		{
			jey?: number | undefined
			pou: {
				lou?: string | undefined
				dou: {
					wou: number
				}
				sow: boolean
			}
			jod: {
				mim?: {
					val: number
				} | undefined
			}
		}

	>

}
