namespace $ { export class $mol_view_tree_test_simple extends $mol_view {

	/**
	 *  ```
	 *  some 1
	 *  ```
	 **/
	some() {
		return 1
	}

	/**
	 *  ```
	 *  bool true
	 *  ```
	 **/
	bool() {
		return true
	}

	/**
	 *  ```
	 *  str \test
	 *  ```
	 **/
	str() {
		return "test"
	}

	/**
	 *  ```
	 *  arr /
	 *  ```
	 **/
	arr() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  arr_string /string
	 *  ```
	 **/
	arr_string() {
		return [  ] as readonly ( string )[]
	}

} }

