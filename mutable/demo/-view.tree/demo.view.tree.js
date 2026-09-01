	($.$mol_mutable_demo) = class $mol_mutable_demo extends ($.$mol_example_code) {
		code(next){
			if(next !== undefined) return next;
			return "const articles_immutable = {\n\thello: {\n\t\ttitle: 'Hello, World',\n\t\ttags: [ 'javascript', 'immutablity' ],\n\t\tauthor: {\n\t\t\tname: 'Jin',\n\t\t},\n\t},\n}\n\nconst articles_mutable = $mol_mutable( articles_immutable )\n\narticles_mutable.hello.title( prev => prev + '!' )\narticles_mutable.hello.tags( prev => [ ... prev, 'hello' ] )\narticles_mutable.hello.author.name( ()=> 'John' )\narticles_mutable.bye( ()=> ({\n\ttitle: 'Bye, World!',\n\ttags: [],\n\tauthor: null,\n}) )\n\nconst articles_new = articles_mutable()";
		}
		tags(){
			return ["mutable", "immutable"];
		}
		aspects(){
			return ["Algorithm/Lens"];
		}
	};
	($mol_mem(($.$mol_mutable_demo.prototype), "code"));

//# sourceMappingURL=demo.view.tree.js.map