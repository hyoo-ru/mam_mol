/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {
	$mol_test({

		'safe tag'() {
			$mol_assert_equal(
				$$.$mol_dom_safe([ <div>foo</div> ])[0],
				<div>foo</div>,
			)
		},

		'bad tag'() {
			$mol_assert_equal(
				$mol_dom_serialize( $$.$mol_dom_safe([ <script>alert('ahtung!')</script> ])[0] ),
				$mol_dom_serialize( <>alert('ahtung!')</> ),
			)
		},

		'common attr'() {
			$mol_assert_equal(
				$$.$mol_dom_safe([ <a id="foo">foo</a> ])[0],
				<a id="foo">foo</a>,
			)
		},

		'safe attr'() {
			$mol_assert_equal(
				$$.$mol_dom_safe([ <a href="https://example.org/">foo</a> ])[0],
				<a href="https://example.org/">foo</a>,
			)
		},

		'bad attr'() {
			$mol_assert_equal(
				$$.$mol_dom_safe([ <a onclick="alert('ahtung!')">foo</a> ])[0],
				<a>foo</a>,
			)
		},

		'danger attr'() {
			$mol_assert_equal(
				$$.$mol_dom_safe([ <a href="javascript:alert('ahtung!')">foo</a> ])[0],
				<a href="about:blank#javascript:alert('ahtung!')">foo</a>,
			)
		},

	})
}
