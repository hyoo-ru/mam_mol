$mol_view_tree2_test_sample_bind_both $mol_view
	writable?val <=> writable_owner?val
	writable_default?val <=> writable_default_owner?val null
	class?val <=> class_owner?val $mol_view
	twice null
	class_writable?val <=> class_writable_owner?val $mol_view
		some?val <=> twice?val
		localized?val <=> localized_owner?val @ \some1
		chain?v <=> chain1?v <=> chain2?v null
