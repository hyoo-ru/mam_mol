declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    type $mol_log3_event<Fields> = {
        [key in string]: unknown;
    } & {
        time?: string;
        place: unknown;
        message: string;
    } & Fields;
    type $mol_log3_logger<Fields, Res = void> = (this: $, event: $mol_log3_event<Fields>) => Res;
    let $mol_log3_come: $mol_log3_logger<{}>;
    let $mol_log3_done: $mol_log3_logger<{}>;
    let $mol_log3_fail: $mol_log3_logger<{}>;
    let $mol_log3_warn: $mol_log3_logger<{
        hint: string;
    }>;
    let $mol_log3_rise: $mol_log3_logger<{}>;
    let $mol_log3_area: $mol_log3_logger<{}, () => void>;
    function $mol_log3_area_lazy(this: $, event: $mol_log3_event<{}>): () => void;
    let $mol_log3_stack: (() => void)[];
}

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    function $mol_delegate<Value extends object>(proto: Value, target: () => Value): Value;
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
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    class $mol_object2 {
        static $: typeof $$;
        [$mol_ambient_ref]: typeof $$;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): any;
        static toString(): any;
        destructor(): void;
        [Symbol.toPrimitive](hint: string): any;
        toString(): any;
        toJSON(): any;
    }
}

declare namespace $ {
    function $mol_deprecated(message: string): <Method extends (this: Host, ...args: readonly any[]) => any, Host extends { [key in Field]: Method; }, Field extends keyof Host>(host: Host, field: Field, descr: TypedPropertyDescriptor<Method>) => void;
}

declare namespace $ {
    const $mol_tree_convert: unique symbol;
    type $mol_tree_path = Array<string | number | null>;
    type $mol_tree_hack = (input: $mol_tree, context: $mol_tree_context) => readonly $mol_tree[];
    type $mol_tree_context = Record<string, $mol_tree_hack>;
    type $mol_tree_library = Record<string, $mol_tree_context>;
    class $mol_tree extends $mol_object2 {
        readonly type: string;
        readonly data: string;
        readonly sub: readonly $mol_tree[];
        readonly baseUri: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(config?: Partial<$mol_tree>);
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config?: Partial<$mol_tree>): $mol_tree;
        make(config: Partial<$mol_tree>): $mol_tree;
        make_data(value: string, sub?: readonly $mol_tree[]): $mol_tree;
        make_struct(type: string, sub?: readonly $mol_tree[]): $mol_tree;
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

declare namespace $ {
    function $mol_log3_node_make(level: keyof Console, output: 'stdout' | 'stderr', type: string, color: keyof typeof $node.colorette): (this: $, event: $mol_log3_event<{}>) => () => void;
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): (obj: object, name: PropertyKey, descr: PropertyDescriptor) => PropertyDescriptor;
        static get field(): <Host, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    class $mol_after_timeout extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_after_frame extends $mol_after_timeout {
        task: () => void;
        constructor(task: () => void);
    }
}

declare namespace $ {
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    function $mol_array_trim<Item>(array: Item[]): Item[];
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
    let $mol_dev_format_div: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_ol: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_li: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_table: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_tr: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_td: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_accent: (...args: any[]) => any[];
    let $mol_dev_format_strong: (...args: any[]) => any[];
    let $mol_dev_format_string: (...args: any[]) => any[];
    let $mol_dev_format_shade: (...args: any[]) => any[];
    let $mol_dev_format_indent: (...args: any[]) => any[];
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
    function $mol_fiber_method<Host extends object, Value>(obj: Host, name: keyof Host, descr: TypedPropertyDescriptor<(this: Host, ...args: any[]) => Value>): PropertyDescriptor;
    function $mol_fiber_async<Args extends any[], Value>(task: (...args: Args) => Value): (...args: Args) => Promise<Value>;
    function $mol_fiber_sync<Args extends any[], Value = void, This = void>(request: (this: This, ...args: Args) => PromiseLike<Value>): (...args: Args) => Value;
    function $mol_fiber_warp(): Promise<void>;
    function $mol_fiber_fence(func: () => any): any;
    function $mol_fiber_unlimit<Result>(task: () => Result): Result;
    class $mol_fiber_solid extends $mol_wrapper {
        static func<This, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => Result;
    }
    class $mol_fiber<Value = any> extends $mol_wrapper {
        static logs: boolean;
        static wrap<Func extends (...args: any[]) => any>(task: Func): (this: ThisParameterType<Func>, ...args: Parameters<Func>) => any;
        static quant: number;
        static deadline: number;
        static liveline: number;
        static current: $mol_fiber<any> | null;
        static scheduled: $mol_after_frame | null;
        static queue: (() => PromiseLike<any>)[];
        static tick(): Promise<void>;
        static schedule(): Promise<any>;
        cursor: $mol_fiber_status;
        masters: (number | $mol_fiber<any> | undefined)[];
        calculate: () => Value;
        _value: Value;
        get value(): Value;
        set value(next: Value);
        _error: Error | PromiseLike<Value> | null;
        get error(): null | Error | PromiseLike<Value>;
        set error(next: null | Error | PromiseLike<Value>);
        schedule(): void;
        wake(): Value | undefined;
        push(value: Value): Value;
        fail(error: Error): Error;
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
    function $mol_atom2_value<Value>(task: () => Value, next?: Value): Value | undefined;
    class $mol_atom2<Value = any> extends $mol_fiber<Value> {
        static logs: boolean;
        static get current(): $mol_atom2<any> | null;
        static cached: boolean;
        static cached_next: any;
        static reap_task: $mol_fiber<any> | null;
        static reap_queue: $mol_atom2<any>[];
        static reap(atom: $mol_atom2): void;
        slaves: (number | $mol_fiber<any> | undefined)[];
        rescue(master: $mol_atom2, cursor: number): void;
        subscribe(promise: Promise<unknown>): Promise<void>;
        get(): Value;
        pull(): void;
        get value(): Value;
        set value(next: Value);
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
        get fresh(): () => void;
        get alone(): boolean;
        get derived(): boolean;
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_atom2_autorun(calculate: () => any): $mol_atom2<unknown>;
}

declare namespace $ {
    type $mol_type_param<Func, Index extends number> = Func extends (...params: infer Params) => any ? Params[Index] : Func extends new (...params: infer Params2) => any ? Params2[Index] : never;
}

declare namespace $ {
    type $mol_type_result<Func> = Func extends (...params: any) => infer Result ? Result : Func extends new (...params: any) => infer Result ? Result : never;
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
    function $mol_mem<Host extends object, Field extends keyof Host, Prop extends Extract<Host[Field], (next?: any) => any>>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<Prop>): {
        value: ((this: Host, next?: $mol_type_param<Prop, 0> | undefined, force?: $mol_mem_force | undefined) => any) & {
            orig: Function;
        };
        enumerable?: boolean | undefined;
        configurable?: boolean | undefined;
        writable?: boolean | undefined;
        get?: (() => Prop) | undefined;
        set?: ((value: Prop) => void) | undefined;
    };
}

declare namespace $ {
    function $mol_key<Value>(value: Value): string | Value;
}

declare namespace $ {
    function $mol_mem_key<Host extends object, Field extends keyof Host, Prop extends Extract<Host[Field], (id: any, next?: any) => any>>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<Prop>): any;
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    type $mol_charset_encoding = 'utf8' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr';
    function $mol_charset_decode(value: Uint8Array, code?: $mol_charset_encoding): string;
}

declare namespace $ {
    function $mol_charset_encode(value: string): Uint8Array;
}

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
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
        watcher(): {
            destructor(): void;
        };
        exists(next?: boolean, force?: $mol_mem_force): boolean;
        type(): $mol_file_type;
        name(): string;
        ext(): string;
        abstract buffer(next?: Uint8Array, force?: $mol_mem_force): Uint8Array;
        text(next?: string, force?: $mol_mem_force): string;
        fail(error: Error): void;
        buffer_cached(buffer: Uint8Array): void;
        text_cached(content: string): void;
        abstract sub(): $mol_file[];
        abstract resolve(path: string): $mol_file;
        abstract relate(base?: $mol_file): string;
        abstract append(next: Uint8Array | string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
        size(): number;
    }
}

declare namespace $ {
    function $mol_compare_array<Value extends ArrayLike<unknown>>(a: Value, b: Value): boolean;
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
        buffer(next?: Uint8Array, force?: $mol_mem_force): Uint8Array;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: $mol_file): any;
        append(next: Uint8Array | string): undefined;
    }
}

declare namespace $ {
    function $mol_env(): Record<string, string | undefined>;
}

declare namespace $ {
}

declare namespace $ {
    function $mol_exec(this: $, dir: string, command: string, ...args: string[]): any;
}

declare namespace $ {
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        static unknown: $mol_span;
        static begin(uri: string, source?: string): $mol_span;
        static end(uri: string, source: string): $mol_span;
        static entire(uri: string, source: string): $mol_span;
        toString(): any;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        error(message: string, Class?: ErrorConstructor): Error;
        span(row: number, col: number, length: number): $mol_span;
        after(length?: number): $mol_span;
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    type $mol_tree2_path = Array<string | number | null>;
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    class $mol_tree2 extends Object {
        readonly type: string;
        readonly value: string;
        readonly kids: readonly $mol_tree2[];
        readonly span: $mol_span;
        constructor(type: string, value: string, kids: readonly $mol_tree2[], span: $mol_span);
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        text(): string;
        static fromString(str: string, uri?: string): $mol_tree2;
        toString(): string;
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        select(...path: $mol_tree2_path): $mol_tree2;
        filter(path: string[], value?: string): $mol_tree2;
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $ {
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    class $mol_view_tree2_error extends Error {
        readonly spans: readonly $mol_span[];
        constructor(message: string, spans: readonly $mol_span[]);
        toJSON(): {
            message: string;
            spans: readonly $mol_span[];
        };
    }
    class $mol_view_tree2_error_suggestions {
        readonly suggestions: readonly string[];
        constructor(suggestions: readonly string[]);
        toString(): string;
        toJSON(): readonly string[];
    }
    function $mol_view_tree2_error_str(strings: readonly string[], ...parts: readonly ($mol_span | readonly $mol_span[] | string | number | $mol_view_tree2_error_suggestions)[]): $mol_view_tree2_error;
}

declare namespace $ {
    function $mol_view_tree2_child(this: $, tree: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_classes(defs: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    type $mol_view_tree2_locales = Record<string, string>;
    class $mol_view_tree2_context extends $mol_object2 {
        protected parents: readonly $mol_view_tree2_prop[];
        protected locales: $mol_view_tree2_locales;
        protected methods: $mol_tree2[];
        readonly types: boolean;
        protected added_nodes: Map<string, {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        }>;
        protected array?: $mol_tree2 | undefined;
        constructor($: $, parents: readonly $mol_view_tree2_prop[], locales: $mol_view_tree2_locales, methods: $mol_tree2[], types?: boolean, added_nodes?: Map<string, {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        }>, array?: $mol_tree2 | undefined);
        protected clone(prefixes: readonly $mol_view_tree2_prop[], array?: $mol_tree2): $mol_view_tree2_context;
        parent(prefix: $mol_view_tree2_prop): $mol_view_tree2_context;
        root(): $mol_view_tree2_context;
        locale_disable(array: $mol_tree2): $mol_view_tree2_context;
        get_method({ name, src, key, next }: $mol_view_tree2_prop): {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        } | undefined;
        check_scope_vars({ name, key, next }: $mol_view_tree2_prop): undefined;
        index(owner: $mol_view_tree2_prop): number;
        method(index: number, method: $mol_tree2[]): void;
        protected locale_nodes: Map<string, $mol_tree2>;
        locale(operator: $mol_tree2): $mol_tree2;
    }
}

declare namespace $ {
    function $mol_view_tree2_normalize(this: $, defs: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_class_super(this: $, klass: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_class_props(this: $, klass: $mol_tree2): $mol_tree2[];
}

declare namespace $ {
    type $mol_type_equals<A, B> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? unknown : never;
}

declare namespace $ {
    type $mol_type_merge<Intersection> = Intersection extends (...a: any[]) => any ? Intersection : Intersection extends new (...a: any[]) => any ? Intersection : Intersection extends object ? $mol_type_merge_object<Intersection> extends Intersection ? unknown extends $mol_type_equals<$mol_type_merge_object<Intersection>, Intersection> ? Intersection : {
        [Key in keyof Intersection]: $mol_type_merge<Intersection[Key]>;
    } : Intersection : Intersection;
    type $mol_type_merge_object<Intersection> = {
        [Key in keyof Intersection]: Intersection[Key];
    };
}

declare namespace $ {
    type $mol_type_intersect<Union> = (Union extends any ? (_: Union) => void : never) extends ((_: infer Intersection) => void) ? Intersection : never;
}

declare namespace $ {
    type $mol_type_override<Base, Over> = Omit<Base, keyof Over> & Over;
}

declare namespace $ {
    type $mol_unicode_category = [$mol_unicode_category_binary] | ['General_Category', $mol_char_category_general] | ['Script', $mol_unicode_category_script] | ['Script_Extensions', $mol_unicode_category_script];
    type $mol_unicode_category_binary = 'ASCII' | 'ASCII_Hex_Digit' | 'Alphabetic' | 'Any' | 'Assigned' | 'Bidi_Control' | 'Bidi_Mirrored' | 'Case_Ignorable' | 'Cased' | 'Changes_When_Casefolded' | 'Changes_When_Casemapped' | 'Changes_When_Lowercased' | 'Changes_When_NFKC_Casefolded' | 'Changes_When_Titlecased' | 'Changes_When_Uppercased' | 'Dash' | 'Default_Ignorable_Code_Point' | 'Deprecated' | 'Diacritic' | 'Emoji' | 'Emoji_Component' | 'Emoji_Modifier' | 'Emoji_Modifier_Base' | 'Emoji_Presentation' | 'Extended_Pictographic' | 'Extender' | 'Grapheme_Base' | 'Grapheme_Extend' | 'Hex_Digit' | 'IDS_Binary_Operator' | 'IDS_Trinary_Operator' | 'ID_Continue' | 'ID_Start' | 'Ideographic' | 'Join_Control' | 'Logical_Order_Exception' | 'Lowercase' | 'Math' | 'Noncharacter_Code_Point' | 'Pattern_Syntax' | 'Pattern_White_Space' | 'Quotation_Mark' | 'Radical' | 'Regional_Indicator' | 'Sentence_Terminal' | 'Soft_Dotted' | 'Terminal_Punctuation' | 'Unified_Ideograph' | 'Uppercase' | 'Variation_Selector' | 'White_Space' | 'XID_Continue' | 'XID_Start';
    type $mol_char_category_general = 'Cased_Letter' | 'Close_Punctuation' | 'Connector_Punctuation' | 'Control' | 'Currency_Symbol' | 'Dash_Punctuation' | 'Decimal_Number' | 'Enclosing_Mark' | 'Final_Punctuation' | 'Format' | 'Initial_Punctuation' | 'Letter' | 'Letter_Number' | 'Line_Separator' | 'Lowercase_Letter' | 'Mark' | 'Math_Symbol' | 'Modifier_Letter' | 'Modifier_Symbol' | 'Nonspacing_Mark' | 'Number' | 'Open_Punctuation' | 'Other' | 'Other_Letter' | 'Other_Number' | 'Other_Punctuation' | 'Other_Symbol' | 'Paragraph_Separator' | 'Private_Use' | 'Punctuation' | 'Separator' | 'Space_Separator' | 'Spacing_Mark' | 'Surrogate' | 'Symbol' | 'Titlecase_Letter' | 'Unassigned' | 'Uppercase_Letter';
    type $mol_unicode_category_script = 'Adlam' | 'Ahom' | 'Anatolian_Hieroglyphs' | 'Arabic' | 'Armenian' | 'Avestan' | 'Balinese' | 'Bamum' | 'Bassa_Vah' | 'Batak' | 'Bengali' | 'Bhaiksuki' | 'Bopomofo' | 'Brahmi' | 'Braille' | 'Buginese' | 'Buhid' | 'Canadian_Aboriginal' | 'Carian' | 'Caucasian_Albanian' | 'Chakma' | 'Cham' | 'Chorasmian' | 'Cherokee' | 'Common' | 'Coptic' | 'Cuneiform' | 'Cypriot' | 'Cyrillic' | 'Deseret' | 'Devanagari' | 'Dives_Akuru' | 'Dogra' | 'Duployan' | 'Egyptian_Hieroglyphs' | 'Elbasan' | 'Elymaic' | 'Ethiopic' | 'Georgian' | 'Glagolitic' | 'Gothic' | 'Grantha' | 'Greek' | 'Gujarati' | 'Gunjala_Gondi' | 'Gurmukhi' | 'Han' | 'Hangul' | 'Hanifi_Rohingya' | 'Hanunoo' | 'Hatran' | 'Hebrew' | 'Hiragana' | 'Imperial_Aramaic' | 'Inherited' | 'Inscriptional_Pahlavi' | 'Inscriptional_Parthian' | 'Javanese' | 'Kaithi' | 'Kannada' | 'Katakana' | 'Kayah_Li' | 'Kharoshthi' | 'Khitan_Small_Script' | 'Khmer' | 'Khojki' | 'Khudawadi' | 'Lao' | 'Latin' | 'Lepcha' | 'Limbu' | 'Linear_A' | 'Linear_B' | 'Lisu' | 'Lycian' | 'Lydian' | 'Mahajani' | 'Makasar' | 'Malayalam' | 'Mandaic' | 'Manichaean' | 'Marchen' | 'Medefaidrin' | 'Masaram_Gondi' | 'Meetei_Mayek' | 'Mende_Kikakui' | 'Meroitic_Cursive' | 'Meroitic_Hieroglyphs' | 'Miao' | 'Modi' | 'Mongolian' | 'Mro' | 'Multani' | 'Myanmar' | 'Nabataean' | 'Nandinagari' | 'New_Tai_Lue' | 'Newa' | 'Nko' | 'Nushu' | 'Nyiakeng_Puachue_Hmong' | 'Ogham' | 'Ol_Chiki' | 'Old_Hungarian' | 'Old_Italic' | 'Old_North_Arabian' | 'Old_Permic' | 'Old_Persian' | 'Old_Sogdian' | 'Old_South_Arabian' | 'Old_Turkic' | 'Oriya' | 'Osage' | 'Osmanya' | 'Pahawh_Hmong' | 'Palmyrene' | 'Pau_Cin_Hau' | 'Phags_Pa' | 'Phoenician' | 'Psalter_Pahlavi' | 'Rejang' | 'Runic' | 'Samaritan' | 'Saurashtra' | 'Sharada' | 'Shavian' | 'Siddham' | 'SignWriting' | 'Sinhala' | 'Sogdian' | 'Sora_Sompeng' | 'Soyombo' | 'Sundanese' | 'Syloti_Nagri' | 'Syriac' | 'Tagalog' | 'Tagbanwa' | 'Tai_Le' | 'Tai_Tham' | 'Tai_Viet' | 'Takri' | 'Tamil' | 'Tangut' | 'Telugu' | 'Thaana' | 'Thai' | 'Tibetan' | 'Tifinagh' | 'Tirhuta' | 'Ugaritic' | 'Vai' | 'Wancho' | 'Warang_Citi' | 'Yezidi' | 'Yi' | 'Zanabazar_Square';
}

interface String {
    match<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.match]>;
    matchAll<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.matchAll]>;
}
declare namespace $ {
    type Groups_to_params<T> = {
        [P in keyof T]?: T[P] | boolean | undefined;
    };
    export type $mol_regexp_source = number | string | RegExp | {
        [key in string]: $mol_regexp_source;
    } | readonly [$mol_regexp_source, ...$mol_regexp_source[]];
    export type $mol_regexp_groups<Source extends $mol_regexp_source> = Source extends number ? {} : Source extends string ? {} : Source extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{
        [key in Extract<keyof Source, number>]: $mol_regexp_groups<Source[key]>;
    }[Extract<keyof Source, number>]>> : Source extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> ? {} : NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> : Source extends {
        readonly [key in string]: $mol_regexp_source;
    } ? $mol_type_merge<$mol_type_intersect<{
        [key in keyof Source]: $mol_type_merge<$mol_type_override<{
            readonly [k in Extract<keyof Source, string>]: string;
        }, {
            readonly [k in key]: Source[key] extends string ? Source[key] : string;
        }> & $mol_regexp_groups<Source[key]>>;
    }[keyof Source]>> : never;
    export class $mol_regexp<Groups extends Record<string, string>> extends RegExp {
        readonly groups: (Extract<keyof Groups, string>)[];
        constructor(source: string, flags?: string, groups?: (Extract<keyof Groups, string>)[]);
        [Symbol.matchAll](str: string): IterableIterator<$mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }>>;
        [Symbol.match](str: string): null | string[];
        [Symbol.split](str: string): string[];
        test(str: string): boolean;
        exec(str: string): $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }> | null;
        generate(params: Groups_to_params<Groups>): string | null;
        static repeat<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static repeat_greedy<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static optional<Source extends $mol_regexp_source>(source: Source): $mol_regexp<$mol_regexp_groups<Source>>;
        static force_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static forbid_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static from<Source extends $mol_regexp_source>(source: Source, { ignoreCase, multiline }?: Partial<Pick<RegExp, 'ignoreCase' | 'multiline'>>): $mol_regexp<$mol_regexp_groups<Source>>;
        static unicode_only(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static unicode_except(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static char_range(from: number, to: number): $mol_regexp<{}>;
        static char_only(...allowed: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static char_except(...forbidden: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static decimal_only: $mol_regexp<{}>;
        static decimal_except: $mol_regexp<{}>;
        static latin_only: $mol_regexp<{}>;
        static latin_except: $mol_regexp<{}>;
        static space_only: $mol_regexp<{}>;
        static space_except: $mol_regexp<{}>;
        static word_break_only: $mol_regexp<{}>;
        static word_break_except: $mol_regexp<{}>;
        static tab: $mol_regexp<{}>;
        static slash_back: $mol_regexp<{}>;
        static nul: $mol_regexp<{}>;
        static char_any: $mol_regexp<{}>;
        static begin: $mol_regexp<{}>;
        static end: $mol_regexp<{}>;
        static or: $mol_regexp<{}>;
        static line_end: $mol_regexp<{
            readonly win_end: string;
            readonly mac_end: string;
        }>;
    }
    export {};
}

declare namespace $ {
    function $mol_view_tree2_prop_split(this: $, src: $mol_tree2): {
        src: $mol_tree2;
        name: $mol_tree2;
        key: $mol_tree2 | undefined;
        next: $mol_tree2 | undefined;
    };
}

declare namespace $ {
    type $mol_view_tree2_prop = ReturnType<typeof $mol_view_tree2_prop_split>;
    function $mol_view_tree2_prop_name(this: $, prop: $mol_tree2): string;
    function $mol_view_tree2_prop_key(this: $, prop: $mol_tree2): string | undefined;
    function $mol_view_tree2_prop_next(this: $, prop: $mol_tree2): string | undefined;
}

declare namespace $ {
    function $mol_view_tree2_prop_quote(name: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    let $mol_view_tree2_prop_signature: $mol_regexp<{
        readonly name: string;
        readonly key: string;
        readonly next: string;
    }>;
}

declare namespace $ {
    function $mol_tree2_text_to_string(this: $, text: $mol_tree2): string;
}

declare namespace $ {
    function $mol_view_tree2_bind_both_parts(this: $, operator: $mol_tree2): {
        owner_parts: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        };
        default_value: $mol_tree2 | undefined;
    };
}

declare namespace $ {
    function $mol_view_tree2_bind_left_parts(this: $, operator: $mol_tree2, having_parts?: $mol_view_tree2_prop): {
        default_value: $mol_tree2 | undefined;
        owner_call_parts: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        };
        owner_parts: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        };
    };
}

declare namespace $ {
    function $mol_view_tree2_bind_right_parts(this: $, operator: $mol_tree2, having_parts: $mol_view_tree2_prop, factory: $mol_view_tree2_prop): {
        owner_parts: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        };
    };
}

declare namespace $ {
    function $mol_view_tree2_ts_bind_both(this: $, operator: $mol_tree2, context: $mol_view_tree2_context): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_bind_left(this: $, operator: $mol_tree2, context: $mol_view_tree2_context, having_parts?: $mol_view_tree2_prop): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_bind_right(this: $, operator: $mol_tree2, having_parts: $mol_view_tree2_prop, factory: $mol_view_tree2_prop, context: $mol_view_tree2_context): undefined;
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
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
        value(key: string, next?: Value): Value | null;
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
        static warn(key: string): null;
    }
}

declare namespace $ {
    function $mol_view_tree2_value_type(this: $, val: $mol_tree2): "string" | "object" | "number" | "get" | "null" | "locale" | "bool" | "dict" | "bind" | "put" | "list";
}

declare namespace $ {
    function $mol_view_tree2_value(this: $, value: $mol_tree2): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_ts_class(this: $, klass: $mol_tree2, locales: $mol_view_tree2_locales): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_ts_comment(this: $, item: $mol_tree2): $mol_tree2[];
    function $mol_view_tree2_ts_comment_doc(this: $, item: $mol_tree2): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_module(this: $, tree2_module: $mol_tree2, locales: $mol_view_tree2_locales): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_ts_compile(this: $, tree2_module: $mol_tree2): {
        script: string;
        locales: $mol_view_tree2_locales;
    };
}

declare namespace $ {
    function $mol_view_tree2_ts_function_declaration({ name, key, next }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next'>, types?: boolean): $mol_tree2;
    function $mol_view_tree2_ts_function_call({ name, key, next }: Pick<$mol_view_tree2_prop, 'name' | 'key' | 'next'>): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_ts_spread(this: $, spread_prop: $mol_tree2): $mol_tree2;
    class $mol_view_tree2_ts_spread_factory extends $mol_object2 {
        protected prop_parts?: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        } | undefined;
        protected super_spread: $mol_tree2 | undefined;
        constructor($: $, prop_parts?: {
            src: $mol_tree2;
            name: $mol_tree2;
            key: $mol_tree2 | undefined;
            next: $mol_tree2 | undefined;
        } | undefined);
        create(prop: $mol_tree2): $mol_tree2;
    }
}

declare namespace $ {
    function $mol_view_tree2_ts_locale(operator: $mol_tree2, context: $mol_view_tree2_context): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_value(this: $, src: $mol_tree2): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_dictionary(this: $, dictionary: $mol_tree2, dictionary_context: $mol_view_tree2_context, super_method?: $mol_view_tree2_prop): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_factory(this: $, klass: $mol_tree2, factory: $mol_view_tree2_prop, factory_context: $mol_view_tree2_context): $mol_tree2;
}

declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: Set<Node>;
        edges_out: Map<Node, Map<Node, Edge>>;
        edges_in: Map<Node, Map<Node, Edge>>;
        link_out(from: Node, to: Node, edge: Edge): void;
        link_in(to: Node, from: Node, edge: Edge): void;
        edge_out(from: Node, to: Node): NonNullable<Edge> | null;
        edge_in(to: Node, from: Node): NonNullable<Edge> | null;
        link(from: Node, to: Node, edge: Edge): void;
        unlink(from: Node, to: Node): void;
        acyclic(get_weight: (edge: Edge) => number): void;
        get sorted(): Set<Node>;
    }
}

declare namespace $ {
    const sourcemap_codec: any;
    type SourceMapLine = ReturnType<typeof sourcemap_codec.decode>[0];
    export interface $mol_sourcemap_raw {
        version: number;
        sources: string[];
        names: string[];
        sourceRoot?: string;
        sourcesContent?: (string | null)[];
        mappings: string | SourceMapLine[];
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
    function $mol_base64_encode(src: string | Uint8Array): string;
}

declare namespace $ {
    function $mol_base64_encode_node(str: string | Uint8Array): string;
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
        toJSON(): string;
    }
}

declare namespace $ {
    function $mol_build_start(this: $, paths: string[]): void;
    class $mol_build extends $mol_object {
        static root(path: string): $mol_build;
        static relative(path: string): $mol_build;
        server(): $mol_build_server;
        root(): $mol_file;
        metaTreeTranspile(path: string): $mol_file[];
        viewTreeTranspile(path: string): $mol_file[];
        cssTranspile(path: string): $mol_file[];
        mods({ path, exclude }: {
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
        tsOptions(): any;
        tsSource({ path, target }: {
            path: string;
            target: number;
        }): any;
        tsPaths({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): string[];
        tsHost({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): any;
        tsTranspiler({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): any;
        tsTranspile({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): any;
        tsService({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): {
            recheck: () => void;
            destructor: () => any;
        } | null;
        js_error(path: string, next?: Error | null): Error | null;
        js_content(path: string): {
            text: string;
            map: $mol_sourcemap_raw | undefined;
        };
        sourcesJS({ path, exclude }: {
            path: string;
            exclude: string[];
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
        }): $mol_graph<string, {
            priority: number;
        }>;
        bundleAllWeb({ path }: {
            path: string;
        }): null;
        bundleAllWebAudit({ path }: {
            path: string;
        }): void;
        bundleAllNode({ path }: {
            path: string;
        }): null;
        bundleAllNodeAudit({ path }: {
            path: string;
        }): void;
        bundleAll({ path }: {
            path: string;
        }): null;
        bundle({ path, bundle }: {
            path: string;
            bundle?: string;
        }): $mol_file[];
        logBundle(target: $mol_file, duration: number): void;
        bundleJS({ path, exclude, bundle, moduleTarget }: {
            path: string;
            exclude: string[];
            bundle: string;
            moduleTarget?: string;
        }): $mol_file[];
        bundleAuditJS({ path, exclude, bundle }: {
            path: string;
            exclude: string[];
            bundle: string;
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
        bundleReadmeMd({ path, exclude }: {
            path: string;
            exclude: string[];
        }): $mol_file[];
        bundlePackageJSON({ path, exclude }: {
            path: string;
            exclude: string[];
        }): $mol_file[];
        bundleIndexHtml({ path, exclude }: {
            path: string;
            exclude?: string[];
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

declare namespace $ {
    class $mol_server extends $mol_object {
        express(): any;
        http(): any;
        connections: Set<any>;
        socket(): any;
        expressHandlers(): any[];
        expressCompressor(): unknown;
        expressCors(): unknown;
        expressBodier(): any;
        expressFiler(): any;
        expressDirector(): unknown;
        expressIndex(): (req: typeof $node.express.request, res: typeof $node.express.response, next: () => void) => void;
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        bodyLimit(): string;
        cacheTime(): number;
        port(): number;
        rootPublic(): string;
    }
}

declare namespace $ {
    function $mol_fail_catch(error: object): boolean;
}

declare namespace $ {
    class $mol_build_server extends $mol_server {
        static trace: boolean;
        expressGenerator(): (req: typeof $node.express.request, res: typeof $node.express.response, next: () => any) => Promise<any> | undefined;
        build(): $mol_build;
        generate(url: string): $mol_file[];
        expressIndex(): (req: typeof $node.express.request, res: typeof $node.express.response, next: () => void) => void;
        port(): number;
        start(): any;
    }
}

declare namespace $ {
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    function $mol_view_tree2_ts_array_body(this: $, operator: $mol_tree2, parent_context: $mol_view_tree2_context, super_method?: $mol_view_tree2_prop): $mol_tree2;
}

declare namespace $ {
    function $mol_view_tree2_ts_array(this: $, operator: $mol_tree2, context: $mol_view_tree2_context, super_method?: $mol_view_tree2_prop | undefined): $mol_tree2[];
}

declare namespace $ {
    function $mol_view_tree2_ts_method_body(this: $, having_parts: $mol_view_tree2_prop, parent_context: $mol_view_tree2_context): undefined;
}

declare namespace $ {
    function $mol_view_tree2_ts_method(this: $, owner_parts: $mol_view_tree2_prop, body: $mol_tree2, types?: boolean): $mol_tree2[];
}

export = $;