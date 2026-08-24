namespace $ {

	/** The path segment interface of the issue. */
	export interface $mol_schema_standard_path_segment {
		/** The key representing a path segment. */
		readonly key: PropertyKey
	}

	/** The issue interface of the failure output. */
	export interface $mol_schema_standard_issue {
		/** The error message of the issue. */
		readonly message: string
		/** The path of the issue, if any. */
		readonly path?: ReadonlyArray< PropertyKey | $mol_schema_standard_path_segment > | undefined
	}

	/** The result interface if validation succeeds. */
	export interface $mol_schema_standard_success_result< Output = unknown > {
		/** The typed output value. */
		readonly value: Output
		/** A falsy value for `issues` indicates success. */
		readonly issues?: undefined
	}

	/** The result interface if validation fails. */
	export interface $mol_schema_standard_failure_result {
		/** The issues of failed validation. */
		readonly issues: ReadonlyArray< $mol_schema_standard_issue >
	}

	/** The result type of the validate function. */
	export type $mol_schema_standard_result< Output = unknown >
		= $mol_schema_standard_success_result< Output >
		| $mol_schema_standard_failure_result

	/** The options for the validate function. */
	export interface $mol_schema_standard_options {
		/** Explicit support for additional vendor-specific parameters, if needed. */
		readonly libraryOptions?: Record< string, unknown > | undefined
	}

	/** The Standard types interface. */
	export interface $mol_schema_standard_types< Input = unknown, Output = Input > {
		/** The input type of the schema. */
		readonly input: Input
		/** The output type of the schema. */
		readonly output: Output
	}

	/** The Standard Typed properties interface. */
	export interface $mol_schema_standard_typed_props< Input = unknown, Output = Input > {
		/** The version number of the standard. */
		readonly version: 1
		/** The vendor name of the schema library. */
		readonly vendor: string
		/** Inferred types associated with the schema. */
		readonly types?: $mol_schema_standard_types< Input, Output > | undefined
	}

	/** The Standard Schema properties interface. */
	export interface $mol_schema_standard_props< Input = unknown, Output = Input >
		extends $mol_schema_standard_typed_props< Input, Output > {

		/** Validates unknown input values. */
		readonly validate: (
			value: unknown,
			options?: $mol_schema_standard_options | undefined
		) => $mol_schema_standard_result< Output > | Promise< $mol_schema_standard_result< Output > >

	}

	/** The Standard Typed interface. This is a base type extended by other specs. */
	export interface $mol_schema_standard_typed< Input = unknown, Output = Input > {
		/** The Standard properties. */
		readonly '~standard': $mol_schema_standard_typed_props< Input, Output >
	}

	/** The Standard Schema interface. */
	export interface $mol_schema_standard< Input = unknown, Output = Input > {
		/** The Standard Schema properties. */
		readonly '~standard': $mol_schema_standard_props< Input, Output >
	}

	/** Infers the input type of a Standard Schema. */
	export type $mol_schema_standard_infer_input< Schema extends $mol_schema_standard_typed >
		= NonNullable< Schema[ '~standard' ][ 'types' ] >[ 'input' ]

	/** Infers the output type of a Standard Schema. */
	export type $mol_schema_standard_infer_output< Schema extends $mol_schema_standard_typed >
		= NonNullable< Schema[ '~standard' ][ 'types' ] >[ 'output' ]

	/**
	 * Converts thrown error to [Standard Schema](https://standardschema.dev) issues.
	 * Walks through nested `cause.error` and `AggregateError.errors`
	 * collecting path segments from `field`, `key` and `index`.
	 */
	export function $mol_schema_standard_issues(
		error: any,
		path: ReadonlyArray< PropertyKey | $mol_schema_standard_path_segment > = [],
	): ReadonlyArray< $mol_schema_standard_issue > {

		const cause = error?.cause ?? {}
		const segment = cause.field ?? cause.key ?? cause.index
		const deep: ReadonlyArray< PropertyKey | $mol_schema_standard_path_segment >
			= ( segment === undefined ) ? path : [ ...path, { key: segment } ]

		if( Array.isArray( error?.errors ) ) {
			return ( error.errors as readonly unknown[] )
				.flatMap( sub => $mol_schema_standard_issues( sub, deep ) )
		}

		if( cause.error ) return $mol_schema_standard_issues( cause.error, deep )

		const message = String( error?.message ?? error )
		return [ deep.length ? { message, path: deep } : { message } ]

	}

	/** Builds [Standard Schema v1](https://standardschema.dev) props for a schema class. */
	export function $mol_schema_standard_props_of<
		Schema extends typeof $mol_schema_any
	>( Schema: Schema ): $mol_schema_standard_props< unknown, Schema[ 'default' ] > {

		return {
			version: 1,
			vendor: '$mol_schema',
			validate( value ) {
				try {
					return { value: Schema.guard( value ) }
				} catch( error ) {
					return { issues: $mol_schema_standard_issues( error ) }
				}
			},
		}

	}

}
