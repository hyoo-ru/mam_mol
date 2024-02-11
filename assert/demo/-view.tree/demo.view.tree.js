	($.$mol_assert_demo) = class $mol_assert_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "$mol_assert_unique( [1], [2], [3] )\n$mol_assert_equal( [7] , [7], [7] )\n$mol_assert_fail( ()=> { throw Error( 'test' ) }, 'test' )\n$mol_assert_fail( ()=> { throw RangeError( 'test' ) }, RangeError )";
		}
		aspects(){
			return ["Algorithm/Assert", "Testing"];
		}
	};
	($mol_mem(($.$mol_assert_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map