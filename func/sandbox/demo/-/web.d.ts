declare namespace $ { }
export = $;

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    class $mol_func_sandbox {
        static _make: (contexts: Object[]) => (code: string) => () => void;
        static get make(): ((contexts: Object[]) => (code: string) => () => void) | ((...args: Object[]) => (code: string) => any);
        constructor(...contexts: Object[]);
        contexts: Object[];
        _eval: ((code: string) => () => void) | undefined;
        get eval(): (code: string) => any;
    }
}
