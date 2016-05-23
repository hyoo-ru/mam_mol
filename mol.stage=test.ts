/// Static initializer for subclasses
new $jin2_test( test => {
	
	var firstAClass : A
	var lastBClass : B
	
	class A {
		static initializer() {
			firstAClass = firstAClass || this
		}
	}
	
	class B extends A {
		static initializer() {
			super.initializer()
			lastBClass = this
		}
	}
	
	class C extends B {}
	class D extends C {}
	
	test.equal( firstAClass , B )
	test.equal( lastBClass , D )
	
} )
