declare namespace $ { }
export = $;

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    namespace $$ {
        let $$: typeof $;
    }
    const $mol_ambient_ref: unique symbol;
    type $mol_ambient_context = (typeof globalThis) & (typeof $.$$) & (typeof $);
    function $mol_ambient(this: $mol_ambient_context | void, overrides: Partial<$mol_ambient_context>): $mol_ambient_context;
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
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    class $mol_object2 {
        static $: $mol_ambient_context;
        [$mol_ambient_ref]: $mol_ambient_context;
        get $(): $mol_ambient_context;
        set $(next: $mol_ambient_context);
        constructor(init?: (obj: any) => void);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static toString(): any;
        destructor(): void;
        toString(): any;
        toJSON(): any;
    }
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): <Host, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr: TypedPropertyDescriptor<(this: Host, ...args: Args) => Result>) => TypedPropertyDescriptor<(this: Host, ...args: Args) => Result>;
        static get field(): <Host, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    function $mol_dev_format_register(config: {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => false;
    } | {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => boolean;
        body: (val: any, config: any) => any;
    }): void;
    let $mol_dev_format_head: symbol;
    let $mol_dev_format_body: symbol;
    function $mol_dev_format_native(obj: any): any;
    function $mol_dev_format_auto(obj: any): any;
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    function $mol_dev_format_span(style: object, ...content: any[]): any[];
    let $mol_dev_format_div: any;
    let $mol_dev_format_ol: any;
    let $mol_dev_format_li: any;
    let $mol_dev_format_table: any;
    let $mol_dev_format_tr: any;
    let $mol_dev_format_td: any;
    let $mol_dev_format_accent: any;
    let $mol_dev_format_strong: any;
    let $mol_dev_format_string: any;
    let $mol_dev_format_shade: any;
    let $mol_dev_format_indent: any;
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    function $mol_log(path: any, ...values: any[]): void;
}

declare namespace $ {
    function $mol_log_group<Task extends Function, This>(name: string, task: Task): Task;
}

declare namespace $ {
    function $mol_log_context(next?: () => void): () => void;
}

declare namespace $ {
    function $mol_log_debug(next?: () => void): () => void;
}

declare namespace $ {
    var $mol_log_filter: (next?: string) => string;
}

declare namespace $ {
    class $mol_log2 extends $mol_wrapper {
        readonly host: any;
        readonly id: string;
        readonly args: any[];
        static current: $mol_log2;
        static wrap<This extends {
            $: $mol_ambient_context;
        }, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => any;
        constructor(host: any, id: string, args: any[]);
        stream: $mol_log2_line[];
        flush(): void;
        info(...values: any[]): void;
        static info(...values: any[]): void;
        static excludes: RegExp[];
        static prefix: any[];
    }
    class $mol_log2_indent extends $mol_wrapper {
        static wrap<This extends {
            $: $mol_ambient_context;
        }, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => any;
    }
    class $mol_log2_table extends $mol_log2 {
    }
    class $mol_log2_hidden extends $mol_log2 {
        flush(): void;
    }
    class $mol_log2_line extends Array<any> {
        constructor(...items: any[]);
    }
    class $mol_log2_token extends Array<any> {
        constructor(...items: any[]);
    }
    let $mol_log2_token_empty: $mol_log2_token;
    let $mol_log2_token_indent: $mol_log2_token;
    let $mol_log2_legend: $mol_log2_table;
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        promise: any;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_compare_any(a: any, b: any): boolean;
}

declare namespace $ {
    const $mol_conform_stack: any[];
    function $mol_conform<Target, Source>(target: Target, source: Source): Target;
    const $mol_conform_handlers: WeakMap<Object, (target: any, source: any) => any>;
    function $mol_conform_handler<Class>(cl: {
        new (...args: any[]): Class;
    }, handler: (target: Class, source: Class) => Class): void;
    function $mol_conform_array<Value, List extends {
        [index: number]: Value;
        length: number;
    }>(target: List, source: List): List;
}

declare namespace $ {
    function $mol_array_trim<Item>(array: Item[]): Item[];
}

declare namespace $ {
    const enum $mol_fiber_status {
        persist = -3,
        actual = -2,
        doubt = -1,
        obsolete = 0
    }
    function $mol_fiber_defer<Value = void>(calculate: () => Value): $mol_fiber<any>;
    function $mol_fiber_func<This, Args extends any[], Result>(calculate: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => Result;
    function $mol_fiber_root<Calculate extends (this: This, ...args: any[]) => Result, Result = void, This = void>(calculate: Calculate): Calculate;
    function $mol_fiber_method<Host, Value>(obj: Host, name: keyof Host, descr: TypedPropertyDescriptor<(this: Host, ...args: any[]) => Value>): TypedPropertyDescriptor<(this: Host, ...args: any[]) => Value>;
    function $mol_fiber_async<Args extends any[], Value>(task: (...args: Args) => Value): (...args: Args) => Promise<Value>;
    function $mol_fiber_sync<Args extends any[], Value = void, This = void>(request: (this: This, ...args: Args) => PromiseLike<Value>): (...args: Args) => Value;
    function $mol_fiber_warp(): Promise<void>;
    function $mol_fiber_fence(func: () => any): any;
    function $mol_fiber_unlimit<Result>(task: () => Result): Result;
    class $mol_fiber_solid extends $mol_wrapper {
        static func<This, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => Result;
    }
    class $mol_fiber<Value = any> extends $mol_wrapper {
        static wrap<Func extends (...args: any[]) => any>(task: Func): (this: ThisParameterType<Func>, ...args: Parameters<Func>) => any;
        static quant: number;
        static deadline: number;
        static liveline: number;
        static current: $mol_fiber<any>;
        static scheduled: $mol_after_tick;
        static queue: (() => PromiseLike<any>)[];
        static tick(): Promise<void>;
        static schedule(): Promise<any>;
        value: Value;
        error: Error | PromiseLike<Value>;
        cursor: $mol_fiber_status;
        masters: (number | $mol_fiber<any>)[];
        calculate: () => Value;
        schedule(): void;
        wake(): Value;
        push(value: Value): Value;
        fail(error: Error | PromiseLike<Value>): Error | PromiseLike<Value>;
        wait(promise: PromiseLike<Value>): PromiseLike<Value>;
        complete(): void;
        complete_master(master_index: number): void;
        pull(): void;
        update(): void;
        get(): Value;
        limit(): void;
        get master(): $mol_fiber;
        set master(next: $mol_fiber);
        rescue(master: $mol_fiber, master_index: number): void;
        obey(master: $mol_fiber, master_index: number): number;
        lead(slave: $mol_fiber, master_index: number): number;
        dislead(slave_index: number): void;
        disobey(master_index: number): void;
        obsolete_slaves(): void;
        obsolete(master_index: number): void;
        forget(): void;
        abort(): boolean;
        destructor(): void;
    }
    let $mol_fiber_token_runned: $mol_log2_token;
    let $mol_fiber_token_changed1: $mol_log2_token;
    let $mol_fiber_token_changed2: $mol_log2_token;
    let $mol_fiber_token_actualized: $mol_log2_token;
    let $mol_fiber_token_sleeped: $mol_log2_token;
    let $mol_fiber_token_failed: $mol_log2_token;
    let $mol_fiber_token_destructed: $mol_log2_token;
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
    }
}

declare namespace $ {
    function $mol_atom2_value<Value>(task: () => Value): Value | undefined;
    class $mol_atom2<Value = any> extends $mol_fiber<Value> {
        static get current(): $mol_atom2<any>;
        static cached: boolean;
        static reap_task: $mol_fiber<any>;
        static reap_queue: $mol_atom2<any>[];
        static reap(atom: $mol_atom2): void;
        slaves: (number | $mol_fiber<any>)[];
        rescue(master: $mol_atom2, cursor: number): void;
        get(): Value;
        pull(): void;
        _value: Value;
        get value(): Value;
        set value(next: Value);
        _error: Error | PromiseLike<Value>;
        get error(): null | Error | PromiseLike<Value>;
        set error(next: null | Error | PromiseLike<Value>);
        put(next: Value): Value;
        complete_master(master_index: number): void;
        obey(master: $mol_fiber, master_index: number): number;
        lead(slave: $mol_fiber, master_index: number): number;
        dislead(slave_index: number): void;
        obsolete(master_index?: number): void;
        doubt(master_index?: number): void;
        obsolete_slaves(): void;
        doubt_slaves(): void;
        get fresh(): (this: void) => void;
        get alone(): boolean;
        get derived(): boolean;
        destructor(): void;
    }
    let $mol_atom2_token_revalidation: $mol_log2_token;
    let $mol_atom2_token_stumbled: $mol_log2_token;
    let $mol_atom2_token_revalidated: $mol_log2_token;
    let $mol_atom2_token_leaded: $mol_log2_token;
    let $mol_atom2_token_disleaded: $mol_log2_token;
    let $mol_atom2_token_obsoleted: $mol_log2_token;
    let $mol_atom2_token_doubted: $mol_log2_token;
}

declare namespace $ {
    class $mol_mem_force extends Object {
        constructor();
        $mol_mem_force: boolean;
        static $mol_mem_force: boolean;
        static toString(): string;
    }
    class $mol_mem_force_cache extends $mol_mem_force {
    }
    class $mol_mem_force_update extends $mol_mem_force {
    }
    class $mol_mem_force_fail extends $mol_mem_force_cache {
    }
}

declare namespace $ {
    let $mol_mem_cached: typeof $mol_atom2_value;
    function $mol_mem_persist(): void;
    function $mol_mem<Host extends object, Field extends keyof Host, Value>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<(next?: Value, force?: $mol_mem_force) => Value>): any;
}

declare namespace $ {
    function $mol_dict_key(value: any): any;
    class $mol_dict<Key, Value> extends Map<Key, Value> {
        get(key: Key): Value;
        has(key: Key): boolean;
        set(key: Key, value: Value): this;
        delete(key: Key): boolean;
        forEach(back: (value: Value, key: Key, dict: Map<Key, Value>) => void, context?: any): void;
        [Symbol.iterator](): {
            [Symbol.iterator](): any;
            next(): IteratorResult<[Key, Value], any>;
        };
    }
}

declare namespace $ {
    function $mol_mem_key<Host extends object, Field extends keyof Host, Key, Value>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_mem_force) => Value>): any;
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_base64_decode(base64: string): Uint8Array;
}

declare namespace $ {
    function $mol_base64_decode_node(base64Str: string): Uint8Array;
}

declare namespace $ {
    function $mol_base64_encode(src: string | Uint8Array): string;
}

declare namespace $ {
    function $mol_base64_encode_node(str: string | Uint8Array): string;
}

declare namespace $ {
    type $mol_buffer_encoding = 'utf8' | 'base64';
    type $mol_buffer_encoding_full = $mol_buffer_encoding | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr' | 'utf-16be' | 'utf-16le' | 'x-user-defined' | 'replacement';
    class $mol_buffer extends $mol_object2 {
        native: Uint8Array;
        get length(): number;
        static from(value: string | Uint8Array, code?: $mol_buffer_encoding): $mol_buffer;
        toString(code?: $mol_buffer_encoding_full): string;
    }
}

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
    type $mol_file_content = string | $mol_buffer | Uint8Array;
    interface $mol_file_stat {
        type: $mol_file_type;
        size: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }
    class $mol_file_not_found extends Error {
    }
    abstract class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        parent(): $mol_file;
        abstract stat(next?: $mol_file_stat, force?: $mol_mem_force): $mol_file_stat;
        reset(): void;
        version(): string;
        abstract ensure(next?: boolean): boolean;
        abstract watcher(): {
            destructor(): void;
        };
        exists(next?: boolean): boolean;
        type(): $mol_file_type;
        name(): string;
        ext(): string;
        abstract buffer(next?: $mol_buffer, force?: $mol_mem_force): $mol_buffer;
        text(next?: string, force?: $mol_mem_force): string;
        fail(error: Error): void;
        buffer_cached(buffer: $mol_buffer): void;
        text_cached(content: string): void;
        abstract sub(): $mol_file[];
        abstract resolve(path: string): $mol_file;
        abstract relate(base?: $mol_file): string;
        abstract append(next: $mol_file_content): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
    }
}

declare namespace $ {
    class $mol_file_node extends $mol_file {
        static absolute(path: string): $mol_file_node;
        static relative(path: string): $mol_file_node;
        watcher(): {
            destructor(): void;
        };
        stat(next?: $mol_file_stat, force?: $mol_mem_force): $mol_file_stat;
        ensure(next?: boolean): boolean;
        buffer(next?: $mol_buffer, force?: $mol_mem_force): $mol_buffer;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: $mol_file): string;
        append(next: $mol_file_content): void;
    }
}

declare namespace $ {
    function $mol_atom2_autorun(calculate: () => any): $mol_atom2<unknown>;
}

declare namespace $ {
    const $mol_tree_convert: unique symbol;
    type $mol_tree_path = Array<string | number | null>;
    type $mol_tree_hack = (input: $mol_tree, context: $mol_tree_context) => readonly $mol_tree[];
    type $mol_tree_context = Record<string, $mol_tree_hack>;
    type $mol_tree_library = Record<string, $mol_tree_context>;
    class $mol_tree {
        readonly type: string;
        readonly data: string;
        readonly sub: readonly $mol_tree[];
        readonly baseUri: string;
        readonly row: number;
        readonly col: number;
        constructor(config?: Partial<$mol_tree>);
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config?: Partial<$mol_tree>): $mol_tree;
        make(config: Partial<$mol_tree>): $mol_tree;
        static fromString(str: string, baseUri?: string): $mol_tree;
        static fromJSON(json: any, baseUri?: string): $mol_tree;
        get uri(): string;
        toString(prefix?: string): string;
        toJSON(): any;
        get value(): string;
        insert(value: $mol_tree, ...path: $mol_tree_path): $mol_tree;
        select(...path: $mol_tree_path): $mol_tree;
        filter(path: string[], value?: string): $mol_tree;
        transform(visit: (stack: $mol_tree[], sub: () => $mol_tree[]) => $mol_tree | null, stack?: $mol_tree[]): $mol_tree | null;
        hack(context: $mol_tree_context): $mol_tree;
        error(message: string): Error;
    }
}

/// <reference types="node" />
declare namespace $ {
    function $mol_exec(dir: string, command: string, ...args: string[]): import("child_process").SpawnSyncReturns<Buffer>;
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }): {
            width: number;
            height: number;
        };
    }
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destructor(): void;
        static all: $mol_defer[];
        static timer: any;
        static scheduleNative: (handler: () => void) => any;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[]): Element[];
        static focus(event: FocusEvent): void;
        static blur(event: FocusEvent): void;
    }
}

declare namespace $ {
    function $mol_dom_qname(name: string): string;
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean | null;
    }): void;
}

declare namespace $ {
    function $mol_fail_catch(error: object): boolean;
}

declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    function $mol_func_name(func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    function $mol_deprecated(message: string): <Method extends (this: Host, ...args: readonly any[]) => any, Host extends { [key in Field]: Method; }, Field extends keyof Host>(host: Host, field: Field, descr: TypedPropertyDescriptor<Method>) => void;
}

declare namespace $ {
    type $mol_type_keys_extract<Input, Lower, Upper> = {
        [Field in keyof Input]: Lower extends Input[Field] ? never : Input[Field] extends Upper ? Field : never;
    }[keyof Input];
}

declare namespace $ {
    type $mol_type_pick<Input, Lower, Upper> = Pick<Input, $mol_type_keys_extract<Input, Lower, Upper>>;
}

declare namespace $ {
    const enum $mol_theme {
        back = "var(--mol_theme_back)",
        hover = "var(--mol_theme_hover)",
        current = "var(--mol_theme_current)",
        text = "var(--mol_theme_text)",
        control = "var(--mol_theme_control)",
        shade = "var(--mol_theme_shade)",
        line = "var(--mol_theme_line)",
        focus = "var(--mol_theme_focus)",
        field = "var(--mol_theme_field)"
    }
}

declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root<This extends typeof $mol_view>(this: This, id: number): InstanceType<This>;
        autorun(): $mol_atom2<unknown>;
        static autobind(): void;
        title(): string;
        focused(next?: boolean): boolean;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly (string | number | boolean | Node | $mol_view)[];
        sub_visible(): readonly (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        maximal_width(): number;
        minimal_height(): number;
        static watchers: Set<$mol_view>;
        view_rect(): ClientRect;
        view_rect_cache(next?: ClientRect): ClientRect;
        view_rect_watcher(): {
            destructor: () => boolean;
        };
        dom_id(): any;
        dom_node(next?: Element): Element;
        dom_tree(next?: Element): Element;
        dom_node_actual(): Element;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        view_names_owned(): string[];
        view_names(): string[];
        attr_static(): {
            [key: string]: string | number | boolean | null;
        };
        attr(): {};
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [key: string]: (event: Event) => void;
        };
        plugins(): readonly $mol_view[];
    }
    type $mol_view_all = $mol_type_pick<$mol_ambient_context, any, typeof $mol_view>;
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value, force?: $mol_mem_force): Value | null;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
    }
}

declare namespace $ {
    function $mol_view_tree_trim_remarks(def: $mol_tree): $mol_tree;
    function $mol_view_tree_classes(defs: $mol_tree): $mol_tree;
    function $mol_view_tree_class_name(val: $mol_tree): string;
    function $mol_view_tree_super_name(val: $mol_tree): string;
    function $mol_view_tree_class_props(def: $mol_tree): $mol_tree;
    function $mol_view_tree_prop_name(prop: $mol_tree): string;
    function $mol_view_tree_prop_key(prop: $mol_tree): string;
    function $mol_view_tree_prop_next(prop: $mol_tree): string;
    function $mol_view_tree_prop_value(prop: $mol_tree): $mol_tree;
    function $mol_view_tree_value_type(val: $mol_tree): "object" | "string" | "number" | "null" | "locale" | "bool" | "dict" | "get" | "bind" | "put" | "list";
    function $mol_view_tree_compile(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}

declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: {
            [id: string]: Node | undefined;
        };
        edgesOut: {
            [from: string]: {
                [to: string]: Edge;
            };
        };
        edgesIn: {
            [to: string]: {
                [from: string]: Edge;
            };
        };
        nodeEnsure(id: string): void;
        linkOut(from: string, to: string, edge: Edge): void;
        linkIn(to: string, from: string, edge: Edge): void;
        edgeOut(from: string, to: string): Edge;
        edgeIn(to: string, from: string): Edge;
        link(from: string, to: string, edge: Edge): void;
        unlink(from: string, to: string): void;
        cut_cycles(get_weight: (edge: Edge) => number): void;
        get sorted(): string[];
    }
}

declare namespace $ {
    const sourcemap_codec: typeof import("sourcemap-codec");
    type SourceMapLine = ReturnType<typeof sourcemap_codec.decode>[0];
    export interface $mol_sourcemap_raw {
        version: number;
        sources: string[];
        names: string[];
        sourceRoot?: string;
        sourcesContent?: (string | null)[];
        mappings: string;
        file: string;
    }
    export class $mol_sourcemap_builder {
        readonly file: string;
        readonly separator: string;
        version: number;
        protected sourceRoot: string;
        protected separator_count: number;
        constructor(file: string, separator?: string);
        protected chunks: string[];
        protected segment_lines: SourceMapLine[];
        protected sources: string[];
        protected source_indexes: Map<string, number>;
        protected names: string[];
        protected name_indexes: Map<string, number>;
        protected sourceContent: (null | string)[];
        get content(): string;
        get sourcemap(): $mol_sourcemap_raw;
        toJSON(): $mol_sourcemap_raw;
        toString(): string;
        protected add_chunk(content: string): void;
        protected add_content(content: string, file?: string): void;
        add(content: string, file?: string, raw?: $mol_sourcemap_raw | string): void;
    }
    export {};
}

declare namespace $ {
    function $mol_diff_path<Item>(...paths: Item[][]): {
        prefix: Item[];
        suffix: Item[][];
    };
}

declare namespace $ {
    class $mol_error_mix extends Error {
        errors: Error[];
        constructor(message: string, ...errors: Error[]);
    }
}

declare namespace $ {
    function $mol_build_start(paths: string[]): void;
    class $mol_build extends $mol_object {
        static root(path: string): $mol_build;
        static relative(path: string): $mol_build;
        watch(): $mol_atom2<unknown>;
        server(): $mol_build_server;
        root(): $mol_file;
        mods({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        modsRecursive({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sources({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesSorted({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesAll({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        tsOptions(): import("typescript").CompilerOptions;
        tsSource({ path, target }: {
            path: string;
            target: number;
        }): import("typescript").SourceFile;
        tsPaths({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): string[];
        tsCompile({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): $mol_object;
        sourcesJS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesDTS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesCSS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        static dependors: {
            [index: string]: undefined | ((source: $mol_file) => {
                [index: string]: number;
            });
        };
        srcDeps(path: string): {
            [index: string]: number;
        };
        modDeps({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): {
            [index: string]: number;
        };
        dependencies({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): {
            [index: string]: number;
        };
        modEnsure(path: string): boolean;
        modMeta(path: string): $mol_tree;
        graph({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_graph<null, {
            priority: number;
        }>;
        bundleAll({ path }: {
            path: string;
        }): void;
        bundle({ path, bundle }: {
            path: string;
            bundle?: string;
        }): Object[];
        logBundle(target: $mol_file, duration: number): void;
        bundleJS({ path, exclude, bundle, moduleTarget }: {
            path: string;
            exclude: string[];
            bundle: string;
            moduleTarget?: string;
        }): $mol_file[];
        bundleTestJS({ path, exclude, bundle }: {
            path: string;
            exclude: string[];
            bundle: string;
        }): $mol_file[];
        bundleTestHtml({ path }: {
            path: string;
        }): $mol_file[];
        bundleDTS({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleViewTree({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        nodeDeps({ path, exclude }: {
            path: string;
            exclude: string[];
        }): string[];
        bundlePackageJSON({ path, exclude }: {
            path: string;
            exclude: string[];
        }): $mol_file[];
        bundleFiles({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCordova({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCSS({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleLocale({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleDepsJSON({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
    }
}

/// <reference types="node" />
declare namespace $ {
    class $mol_server extends $mol_object {
        express(): any;
        http(): import("http").Server;
        socket(): any;
        messageStart(port: number): string;
        expressHandlers(): any[];
        expressCompressor(): any;
        expressBodier(): any;
        expressFiler(): any;
        expressDirector(): any;
        expressIndex(): (req: any, res: any, next: () => void) => void;
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        bodyLimit(): string;
        cacheTime(): number;
        port(): number;
        rootPublic(): string;
    }
}

declare namespace $ {
    class $mol_build_server extends $mol_server {
        expressGenerator(): (req: any, res: any, next: () => any) => any;
        build(): $mol_build;
        generator(url: string): $mol_file[] | Object[];
        expressIndex(): (req: any, res: any, next: () => void) => void;
        port(): number;
    }
}

declare namespace $ {
    class $mol_plugin extends $mol_view {
        dom_node(next?: Element): Element;
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        render(): void;
    }
}
