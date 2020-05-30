namespace $.$$ {
	const d = '$'

	$mol_test( {
		'transform property'( $ ) {
			const tree = $mol_tree2.fromString(`
#hyoo_tree #mol_book2
	w <= Source_first #sub
		width!k?v => outer!k?v
		p1!x <= p2!x <= p3!x
			*
				test false
				t 123
	- qweqwe
	arg *
		num 1
		n null
		^
		- bla-bla
		^
			test
		q <= some @ \\test
		str \\str
		bool true
		q1 <= q2 #mo
	pages /
		123
		^
		*
			num 123
`.trim().replace(/\#/g, '$'))

			//console.log($mol_view_tree_compile(tree).script)
			console.log('--------------------------------------------------')
			console.log($.$mol_view_tree_compile2(tree).content)
		},
	} )
}
