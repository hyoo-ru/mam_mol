Error.stackTraceLimit = Infinity;

declare let _$_: { new(): {} } & typeof globalThis
declare class $ extends _$_ {}

namespace $ {
	export type $ = Omit< typeof $ , keyof typeof $$ > & typeof $$
	export declare class $$ extends $ {}
	namespace $$ {
		export type $$ = $
	}
}

module.exports = $
