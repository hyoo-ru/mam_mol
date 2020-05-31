namespace $ {
	const ts = $node.typescript

	export function $mol_view_tree2_test_ts(source: string ) {
		return ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }})
	}
}
