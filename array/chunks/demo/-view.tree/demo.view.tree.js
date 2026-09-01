	($.$mol_array_chunks_demo) = class $mol_array_chunks_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const res = $mol_array_chunks(\n\t[ 1, 2, 3, 4, 5 ],\n\tn => n % 2,\n)";
		}
		aspects(){
			return ["Type/List", "Algorithm/Transform"];
		}
	};
	($mol_mem(($.$mol_array_chunks_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map