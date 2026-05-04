declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
        static $: $;
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
    function $node_internal_check(name: string): boolean;
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    function $node_autoinstall(this: typeof $, name: string): void;
}

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    class $mol_error_mix<Cause extends {} = {}> extends AggregateError {
        readonly cause: Cause;
        name: string;
        constructor(message: string, cause?: Cause, ...errors: readonly Error[]);
        static [Symbol.toPrimitive](): string;
        static toString(): string;
        static make(...params: ConstructorParameters<typeof $mol_error_mix>): $mol_error_mix<{}>;
    }
}

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    /** @deprecated use $ instead */
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
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
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    const $mol_key_handle: unique symbol;
    const $mol_key_store: WeakMap<object, string>;
}

declare namespace $ {
    class $mol_object2 {
        static $: $;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: $;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): any;
        static toString(): any;
        static toJSON(): any;
        static [$mol_key_handle](): any;
        destructor(): void;
        static destructor(): void;
        [Symbol.dispose](): void;
        toString(): string;
    }
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<This extends typeof $mol_object>(this: This, config: Partial<InstanceType<This>>): InstanceType<This>;
    }
}

declare namespace $ {
    function $mol_env(): Record<string, string | undefined>;
}

declare namespace $ {
}

declare namespace $ {
    /** Generates unique identifier. */
    function $mol_guid(length?: number, exists?: (id: string) => boolean): string;
}

declare namespace $ {
    /** Special status statuses. */
    enum $mol_wire_cursor {
        /** Update required. */
        stale = -1,
        /** Some of (transitive) pub update required. */
        doubt = -2,
        /** Actual state but may be dropped. */
        fresh = -3,
        /** State will never be changed. */
        final = -4
    }
}

declare namespace $ {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id?: string);
        [Symbol.toStringTag]: string;
        data: unknown[];
        static get [Symbol.species](): ArrayConstructor;
        /**
         * Index of first subscriber.
         */
        protected sub_from: number;
        /**
         * All current subscribers.
         */
        get sub_list(): readonly $mol_wire_sub[];
        /**
         * Has any subscribers or not.
         */
        get sub_empty(): boolean;
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub: $mol_wire_pub, pub_pos: number): number;
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos: number): void;
        /**
         * Called when last sub was unsubscribed.
         **/
        reap(): void;
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote(): void;
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh(): void;
        /**
         * Allow to put data to caches in the subtree.
         */
        complete(): void;
        get incompleted(): boolean;
        /**
         * Notify subscribers about self changes.
         */
        emit(quant?: $mol_wire_cursor): void;
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos: number, to_pos: number): void;
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos: number, self_pos: number): void;
    }
}

declare namespace $ {
    /** Generic subscriber interface */
    interface $mol_wire_sub extends $mol_wire_pub {
        temp: boolean;
        pub_list: $mol_wire_pub[];
        /**
         * Begin auto wire to publishers.
         * Returns previous auto subscriber that must me transfer to the `end`.
         */
        track_on(): $mol_wire_sub | null;
        /**
         * Returns next auto wired publisher. It can be easely repormoted.
         * Or promotes next publisher to auto wire its togeter.
         * Must be used only between `track_on` and `track_off`.
         */
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        pub_off(pub_pos: number): void;
        /**
         * Unsubscribes from unpromoted publishers.
         */
        track_cut(sub: $mol_wire_pub | null): void;
        /**
         * Ends auto wire to publishers.
         */
        track_off(sub: $mol_wire_pub | null): void;
        /**
         * Receive notification about publisher changes.
         */
        absorb(quant: $mol_wire_cursor, pos: number): void;
        /**
         * Unsubscribes from all publishers.
         */
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_wire_auto_sub: $mol_wire_sub | null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next?: $mol_wire_sub | null): $mol_wire_sub | null;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    const $mol_wire_affected: ($mol_wire_sub | number)[];
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
    const $mol_dev_format_head: unique symbol;
    const $mol_dev_format_body: unique symbol;
    function $mol_dev_format_native(obj: any): any[];
    function $mol_dev_format_auto(obj: any): any[];
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    let $mol_dev_format_span: (style: object, ...content: any[]) => any[];
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
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
        protected pub_from: number;
        protected cursor: $mol_wire_cursor;
        get temp(): boolean;
        get pub_list(): $mol_wire_pub[];
        track_on(): $mol_wire_sub | null;
        promote(): void;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        track_off(sub: $mol_wire_sub | null): void;
        pub_off(sub_pos: number): void;
        destructor(): void;
        track_cut(): void;
        complete(): void;
        complete_pubs(): void;
        absorb(quant?: $mol_wire_cursor, pos?: number): void;
        [$mol_dev_format_head](): any[];
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty(): boolean;
    }
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        static promise: Promise<void> | null;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    abstract class $mol_wire_fiber<Host, Args extends readonly unknown[], Result> extends $mol_wire_pub_sub {
        readonly task: (this: Host, ...args: Args) => Result;
        readonly host?: Host | undefined;
        static warm: boolean;
        static planning: Set<$mol_wire_fiber<any, any, any>>;
        static reaping: Set<$mol_wire_fiber<any, any, any>>;
        static plan_task: $mol_after_tick | null;
        static plan(): void;
        static sync(): void;
        cache: Result | Error | Promise<Result | Error>;
        get args(): Args;
        result(): Result | undefined;
        get incompleted(): boolean;
        field(): string;
        constructor(id: string, task: (this: Host, ...args: Args) => Result, host?: Host | undefined, args?: Args);
        plan(): this;
        reap(): void;
        toString(): string;
        toJSON(): string;
        [$mol_dev_format_head](): any[];
        [$mol_dev_format_body](): null;
        get $(): any;
        emit(quant?: $mol_wire_cursor): void;
        fresh(): this | undefined;
        refresh(): void;
        abstract put(next: Result | Error | Promise<Result | Error>): Result | Error | Promise<Result | Error>;
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync(): Awaited<Result>;
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async_raw(): Promise<Result>;
        async(): Promise<Result> & {
            destructor(): void;
        };
        step(): Promise<null>;
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    /** Logger event data */
    type $mol_log3_event<Fields> = {
        [key in string]: unknown;
    } & {
        /** Time of event creation */
        time?: string;
        /** Place of event creation */
        place: unknown;
        /** Short description of event */
        message: string;
    } & Fields;
    /** Logger function */
    type $mol_log3_logger<Fields, Res = void> = (this: $, event: $mol_log3_event<Fields>) => Res;
    /** Log begin of some task */
    let $mol_log3_come: $mol_log3_logger<{}>;
    /** Log end of some task */
    let $mol_log3_done: $mol_log3_logger<{}>;
    /** Log error */
    let $mol_log3_fail: $mol_log3_logger<{}>;
    /** Log warning message */
    let $mol_log3_warn: $mol_log3_logger<{
        hint: string;
    }>;
    /** Log some generic event */
    let $mol_log3_rise: $mol_log3_logger<{}>;
    /** Log begin of log group, returns func to close group */
    let $mol_log3_area: $mol_log3_logger<{}, () => void>;
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(this: $, event: $mol_log3_event<{}>): () => void;
    let $mol_log3_stack: (() => void)[];
}

declare namespace $ {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        /** Span for begin of unknown resource */
        static unknown: $mol_span;
        /** Makes new span for begin of resource. */
        static begin(uri: string, source?: string): $mol_span;
        /** Makes new span for end of resource. */
        static end(uri: string, source: string): $mol_span;
        /** Makes new span for entire resource. */
        static entire(uri: string, source: string): $mol_span;
        toString(): string;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        /** Makes new error for this span. */
        error(message: string, Class?: ErrorConstructor): Error;
        /** Makes new span for same uri. */
        span(row: number, col: number, length: number): $mol_span;
        /** Makes new span after end of this. */
        after(length?: number): $mol_span;
        /** Makes new span between begin and end. */
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    /** Path by types in tree. */
    type $mol_tree2_path = Array<string | number | null>;
    /** Hask tool for processing node. */
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    /** Collection of hask tools for processing tree. */
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        /** Type of structural node, `value` should be empty */
        readonly type: string;
        /** Content of data node, `type` should be empty */
        readonly value: string;
        /** Child nodes */
        readonly kids: readonly $mol_tree2[];
        /** Position in most far source resource */
        readonly span: $mol_span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type: string, 
        /** Content of data node, `type` should be empty */
        value: string, 
        /** Child nodes */
        kids: readonly $mol_tree2[], 
        /** Position in most far source resource */
        span: $mol_span);
        /** Makes collection node. */
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived collection node. */
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        /** Makes data node for any string. */
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived data node. */
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes struct node. */
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Makes new derived structural node. */
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        /** Makes new derived node with different kids id defined. */
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        /** Returns multiline text content. */
        text(): string;
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str: string, uri?: string): $mol_tree2;
        /** Serializes to tree format. */
        toString(): string;
        /** Makes new tree with node overrided by path. */
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        /** Makes new tree with node overrided by path. */
        update(value: readonly $mol_tree2[], ...path: $mol_tree2_path): readonly $mol_tree2[];
        /** Query nodes by path. */
        select(...path: $mol_tree2_path): $mol_tree2;
        /** Filter kids by path or value. */
        filter(path: string[], value?: string): $mol_tree2;
        hack_self<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): readonly $mol_tree2[];
        /** Transform tree through context with transformers */
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        /** Makes Error with node coordinates. */
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $ {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    function $mol_array_chunks<Item>(array: readonly Item[], rule: number | ((item: Item, index: number) => boolean)): Item[][];
}

declare namespace $ {
    function $mol_tree2_from_json(json: any, span?: $mol_span): $mol_tree2;
}

declare namespace $ {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset: (str: string) => string;
        static bold: (str: string) => string;
        static italic: (str: string) => string;
        static underline: (str: string) => string;
        static inverse: (str: string) => string;
        static hidden: (str: string) => string;
        static strike: (str: string) => string;
        static gray: (str: string) => string;
        static red: (str: string) => string;
        static green: (str: string) => string;
        static yellow: (str: string) => string;
        static blue: (str: string) => string;
        static magenta: (str: string) => string;
        static cyan: (str: string) => string;
        static Gray: (str: string) => string;
        static Red: (str: string) => string;
        static Green: (str: string) => string;
        static Yellow: (str: string) => string;
        static Blue: (str: string) => string;
        static Magenta: (str: string) => string;
        static Cyan: (str: string) => string;
        static ansi(open: number, close: number): (str: string) => string;
    }
}

declare namespace $ {
    function $mol_log3_node_make(level: keyof Console, output: 'stdout' | 'stderr', type: string, color: (str: string) => string): (this: $, event: $mol_log3_event<{}>) => () => void;
}

declare namespace $ {
    /** One-shot fiber */
    class $mol_wire_task<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static getter<Host, Args extends readonly unknown[], Result>(task: (this: Host, ...args: Args) => Result): (host: Host, args: Args) => $mol_wire_task<Host, Args, Result>;
        get temp(): boolean;
        complete(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
        destructor(): void;
    }
}

declare namespace $ {
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    export function $mol_wire_sync<Host extends object>(obj: Host): ObjectOrFunctionResultAwaited<Host>;
    type FunctionResultAwaited<Some> = Some extends (...args: infer Args) => infer Res ? (...args: Args) => Awaited<Res> : Some;
    type ConstructorResultAwaited<Some> = Some extends new (...args: infer Args) => infer Res ? new (...args: Args) => Res : {};
    type MethodsResultAwaited<Host extends Object> = {
        [K in keyof Host]: FunctionResultAwaited<Host[K]>;
    };
    type ObjectOrFunctionResultAwaited<Some> = (Some extends (...args: any) => unknown ? FunctionResultAwaited<Some> : {}) & (Some extends Object ? MethodsResultAwaited<Some> & ConstructorResultAwaited<Some> : Some);
    export {};
}

declare namespace $ {
    type $mol_run_error_context = {
        pid?: number;
        stdout: Buffer | string;
        stderr: Buffer | string;
    };
    class $mol_run_error extends $mol_error_mix<{
        timeout_kill?: boolean;
        pid?: number;
        signal?: NodeJS.Signals | null;
        status?: number | null;
        command: string;
        dir: string;
    }> {
    }
    const $mol_run_spawn: (...args: Parameters<(typeof $node)["child_process"]["spawn"]>) => import("node:child_process").ChildProcess;
    const $mol_run_spawn_sync: (...args: Parameters<(typeof $node)["child_process"]["spawnSync"]>) => import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer>;
    type $mol_run_options = {
        command: readonly string[] | string;
        dir: string;
        timeout?: number;
        env?: Record<string, string | undefined>;
    };
    class $mol_run extends $mol_object {
        static async_enabled(): boolean;
        static spawn(options: $mol_run_options): import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer> | $mol_run_error_context;
        static spawn_async({ dir, sync, timeout, command, env }: $mol_run_options & {
            sync?: boolean;
        }): import("node:child_process").SpawnSyncReturns<string | NonSharedBuffer> | (Promise<$mol_run_error_context> & {
            destructor: () => void;
        });
        static error_message(res?: $mol_run_error_context): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    var $mol_dom: typeof globalThis;
}

declare namespace $ {
    /**
     * Sandbox for javascript code from user.
     * @see https://sandbox.js.hyoo.ru/
     */
    class $mol_func_sandbox {
        static blacklist: Set<Function>;
        static whitelist: WeakSet<WeakKey>;
        static _make: (contexts: Object[]) => (code: string) => () => any;
        static get make(): ((contexts: Object[]) => (code: string) => () => any) | ((...args: Record<string, any>[]) => (code: string) => () => any);
        constructor(...contexts: Object[]);
        contexts: Object[];
        _eval: ((code: string) => () => any) | undefined;
        get eval(): (code: string) => () => any;
    }
}

export = $;
//# sourceMappingURL=node.d.ts.map
