namespace $.$$ {
	const src = `$${''}mol_deck_demo $${''}mol_demo_small
	title @ \\Simple deck with tabbar
	sub / <= Deck $${''}mol_deck items /
		<= greeterItem *
			title <= greeterLabel @ \\Greeting
			Content <= greeterContent $${''}mol_row sub / <= greeterMessager $${''}mol_view sub / <= greeterMessage @ \\Hello, world!
		<= questerItem *
			title <= questerLabel @ \\Question
			Content <= questerContent $${''}mol_row sub / <= questerMessager $${''}mol_view sub / <= questerMessage @ \\How are you?
		<= commanderItem *
			title <= commanderLabel @ \\Command
			Content <= commanderContent $${''}mol_row sub / <= commanderMessager $${''}mol_view sub / <= commanderMessage @ \\Let us do it right!`
	
	const dest = `title @ \Simple deck with tabbar
	sub / <= Deck
	Deck $${''}mol_deck items /
		<= greeterItem
		<= questerItem
		<= commanderItem
	greeterItem *
		title <= greeterLabel
		Content <= greeterContent
	greeterLabel @ \\Greeting
	greeterContent $${''}mol_row sub / <= greeterMessager
	greeterMessager $${''}mol_view sub / <= greeterMessage
	greeterMessage @ \\Hello, world!
	questerItem *
		title <= questerLabel
		Content <= questerContent
	questerLabel @ \\Question
	questerContent $${''}mol_row sub / <= questerMessager
	questerMessager $${''}mol_view sub / <= questerMessage
	questerMessage @ \\How are you?
	commanderItem *
		title <= commanderLabel
		Content <= commanderContent
	commanderLabel @ \\Command
	commanderContent $${''}mol_row sub / <= commanderMessager
	commanderMessager $${''}mol_view sub / <= commanderMessage
	commanderMessage @ \\Let us do it right!`

	$mol_test({
		'props'($) {
			const mod = $mol_tree2.fromString(src)
			const result = $.$mol_view_tree2_class_props(mod.kids[0]).toString()

			$mol_assert_equal(result, dest)
		} 
	})
}
