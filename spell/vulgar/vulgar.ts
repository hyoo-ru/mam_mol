namespace $ {
	
	export let $mol_spell_vulgar_roots = new Set([
		'залуп',
		'пидар',
		'говн',
		'пизд',
		'пизж',
		'пезд',
		'манд',
		'драч',
		'дроч',
		'шлюх',
		'пидр',
		'пзд',
		'сса',
		'жоп',
		'жеп',
		'бля',
		'хер',
		'йоб',
		'ипа',
		'ху',
		'еб',
		'ёб',
	])
	
	export let $mol_spell_vulgar = new class $mol_spell_vulgar extends $mol_spell {
		
		check( word: string ) {
			const found = [ ... word.matchAll( this.regexp_token() ) ]
			return found.some( chunk => $mol_spell_vulgar_roots.has( chunk.groups?.root ?? '' ) )
		}
		
	} (
		$mol_spell_any.head,
		$mol_spell_any.prefix,
		new Set([
			... $mol_spell_any.root,
			... $mol_spell_vulgar_roots,
		]),
		$mol_spell_any.postfix,
		$mol_spell_any.foot,
	)
	
}

