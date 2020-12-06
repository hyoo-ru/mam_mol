Error.stackTraceLimit = Infinity;

declare let _$_: { new(): {} } & typeof globalThis
declare class $ extends _$_ {}

namespace $ {
	export type $ = typeof $$
	export declare class $$ extends $ {}
	namespace $$ {
		export type $$ = $
	}
}

module.exports = $
