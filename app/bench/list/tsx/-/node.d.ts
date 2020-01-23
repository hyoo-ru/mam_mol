declare namespace $ { }
export = $;

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    type $mol_type_partial_deep<Val> = {
        [field in keyof Val]?: $mol_type_partial_deep<Val[field]>;
    };
}

declare namespace $ {
    let $mol_jsx_prefix: string;
    let $mol_jsx_booked: Set<string>;
    let $mol_jsx_document: JSX.ElementClass['ownerDocument'];
}

declare namespace JSX {
    interface Element extends HTMLElement {
    }
    interface ElementClass {
        attributes: {};
        ownerDocument: Pick<Document, 'getElementById' | 'createElement'>;
        childNodes: Array<Node | string>;
        valueOf(): Element;
    }
    type IntrinsicElements = {
        [key in keyof HTMLElementTagNameMap]?: $.$mol_type_partial_deep<HTMLElementTagNameMap[key]>;
    };
    interface IntrinsicAttributes {
        id?: string;
    }
    interface ElementAttributesProperty {
        attributes: {};
    }
    interface ElementChildrenAttribute {
    }
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    function $mol_jsx_make<Props extends {
        id?: string;
    }, Children extends Array<Node | string>>(Elem: string | ((props: Props, ...children: Children) => Element) | typeof $mol_jsx_view, props: Props, ...childNodes: Children): Element;
}

declare namespace $ {
    namespace $$ {
        let $$: typeof $;
    }
    const $mol_ambient_ref: unique symbol;
    type $mol_ambient_context = (typeof globalThis) & (typeof $.$$) & (typeof $);
    function $mol_ambient(this: $mol_ambient_context, overrides: Partial<$mol_ambient_context>): $mol_ambient_context;
}

declare namespace $ {
    const $mol_owning_map: WeakMap<any, any>;
    function $mol_owning_allow<Having>(having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_get<Having, Owner extends object>(having: Having, Owner?: {
        new (): Owner;
    }): Owner | null;
    function $mol_owning_check<Owner, Having>(owner: Owner, having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_catch<Owner, Having>(owner: Owner, having: Having): boolean;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    class $mol_object2 extends Object {
        static $: $mol_ambient_context;
        [$mol_ambient_ref]: $mol_ambient_context;
        get $(): $mol_ambient_context;
        set $(next: $mol_ambient_context);
        constructor(init?: (obj: any) => void);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: Instance) => void): Instance;
        static toString(): any;
        destructor(): void;
        toString(): any;
        toJSON(): any;
    }
}

declare namespace $ {
    class $mol_jsx_view extends $mol_object2 {
        static of<This extends typeof $mol_jsx_view>(this: This, node: Element): InstanceType<This>;
        [Symbol.toStringTag]: string;
        attributes: Partial<Pick<this, Exclude<keyof this, 'valueOf'>>>;
        ownerDocument: typeof $mol_jsx_document;
        childNodes: Array<Node | string>;
        valueOf(): HTMLElement;
        render(): HTMLElement;
    }
}

declare namespace $ {
    function $mol_jsx_attach<Result>(next: typeof $mol_jsx_document, action: () => Result): Result;
}

declare namespace $ {
    class $mol_app_bench_list_tsx_item extends $mol_jsx_view {
        title: string;
        content: string;
        selected: boolean;
        onSelect(): void;
        render(): JSX.Element;
    }
    class $mol_app_bench_list_tsx extends $mol_jsx_view {
        static render(props: Pick<$mol_app_bench_list_tsx, 'data' | 'selected'>): JSX.Element;
        data: {
            sample: string;
            items: {
                id: number;
                title: string;
                content: string;
            }[];
        };
        selected: number;
        onItemSelect(item: {
            id: number;
        }): void;
        render(): JSX.Element;
    }
}

/// <reference types="node" />
declare namespace $ {
    function $mol_exec(dir: string, command: string, ...args: string[]): import("child_process").SpawnSyncReturns<Buffer>;
}
