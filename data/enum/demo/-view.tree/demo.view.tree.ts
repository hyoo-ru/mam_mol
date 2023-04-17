namespace $ {
	export class $mol_data_enum_demo_number extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\enum SexValues { male, female }
		 * 	\const Sex = $mol_data_enum( 'Sex', SexValues )
		 * 	\const sex = Sex( 0 ) // ✅
		 * 	\
		 * 	\Samples( 3 ) // ❌ 3 is not value of Sex enum
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "enum SexValues { male, female }\nconst Sex = $mol_data_enum( 'Sex', SexValues )\nconst sex = Sex( 0 ) // ✅\n\nSamples( 3 ) // ❌ 3 is not value of Sex enum"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\enum
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"enum"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Type/Number
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/Number"
			] as readonly any[]
		}
	}
	
	export class $mol_data_enum_demo_string extends $mol_example_code {
		
		/**
		 * ```tree
		 * code? \
		 * 	\enum SexValues { male = 'male', female = 'female' }
		 * 	\const Sex = $mol_data_enum( 'Sex', SexValues )
		 * 	\const sex = Sex( 'male' ) // ✅
		 * 	\
		 * 	\Samples( 'helicopter' ) // ❌ helicopter is not value of Sex enum
		 * ```
		 */
		@ $mol_mem
		code(next?: any) {
			if ( next !== undefined ) return next as never
			return "enum SexValues { male = 'male', female = 'female' }\nconst Sex = $mol_data_enum( 'Sex', SexValues )\nconst sex = Sex( 'male' ) // ✅\n\nSamples( 'helicopter' ) // ❌ helicopter is not value of Sex enum"
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\runtime
		 * 	\validation
		 * 	\enum
		 * ```
		 */
		tags() {
			return [
				"runtime",
				"validation",
				"enum"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * aspects /
		 * 	\Algorithm/Assert
		 * 	\Type/String
		 * ```
		 */
		aspects() {
			return [
				"Algorithm/Assert",
				"Type/String"
			] as readonly any[]
		}
	}
	
}

