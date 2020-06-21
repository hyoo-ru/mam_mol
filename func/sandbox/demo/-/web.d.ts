declare namespace $ { }
export = $;

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    class $mol_func_sandbox {
        static blacklist: Set<Function>;
        static whitelist: WeakSet<object>;
        static _make: (contexts: Object[]) => (code: string) => () => any;
        static get make(): ((contexts: Object[]) => (code: string) => () => any) | ((...args: Object[]) => (code: string) => () => any);
        constructor(...contexts: Object[]);
        contexts: Object[];
        _eval: ((code: string) => () => any) | undefined;
        get eval(): (code: string) => () => any;
    }
}
