$mol_view_tree2_test_sample_bind_left $mol_view
	default <= default_owner \test
	empty <= empty_owner
	indexed!key <= indexed_owner!key
	indexed_default!key <= indexed_default_owner!key null
	class <= class_owner $mol_view
	twice null
	class_indexed!key <= class_indexed_owner!key $mol_view
		title @ \some1
		some <= twice
		localized <= localized_owner!key @ \some1
		chain <= chain1 <= chain2 null
	arr /
		*
			loc <= loc_outer @ \test localize
		*
			loc <= loc_outer @ \test localize
