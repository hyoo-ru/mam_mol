declare namespace $ { }
export = $;

declare namespace $ {
    namespace $$ {
        let $$: typeof $;
    }
    type $mol_ambient_context = (typeof globalThis) & (typeof $.$$) & (typeof $);
    function $mol_ambient(this: $mol_ambient_context, overrides: Partial<$mol_ambient_context>): $mol_ambient_context;
}

declare namespace $ {
    function $mol_class<Class extends any>(Class: Class): Class;
}

declare namespace $ {
    class $mol_object2 extends Object {
        static $: $mol_ambient_context;
        static get $$(): $mol_ambient_context;
        $: typeof $mol_object2.$;
        get $$(): $mol_ambient_context;
        constructor(init?: (obj: any) => void);
        static make<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: Instance) => void): Instance;
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
    let $mol_dev_format_div: any;
    let $mol_dev_format_span: any;
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
    function $mol_log_context(next?: () => void): () => void;
}

declare namespace $ {
    function $mol_log_debug(next?: string): string;
}

declare namespace $ {
    var $mol_log_filter: (next?: string) => string;
}

declare namespace $ {
    function $mol_log_group<Task extends Function, This>(name: string, task: Task): Task;
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
        /**
         * Enable all logs
         *
         * 	$mol_log2.excludes = []
         *
         * Exclude all atom logs:
         *
         * 	$mol_log2.excludes = [ , /˸|🠈|⏭|⏯|►|💤|☍|☌|✓|✔|✘|🕱|�/ ]
         *
         * Disable logs:
         *
         * 	$mol_log2.excludes = null
         */
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
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    class $mol_after_frame extends $mol_object2 {
        task: () => void;
        id: any;
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
    function $mol_fiber_sync<Args extends any[], Value = void, This = void>(request: (this: This, ...args: Args) => PromiseLike<Value>): (...args: Args) => Value;
    function $mol_fiber_warp(): Promise<void>;
    function $mol_fiber_fence(func: () => any): any;
    function $mol_fiber_unlimit<Result>(task: () => Result): Result;
    class $mol_fiber_solid extends $mol_wrapper {
        static func<This, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => Result;
    }
    class $mol_fiber<Value = any> extends $mol_wrapper {
        static wrap<This, Args extends any[], Result>(task: (this: This, ...args: Args) => Result): (this: This, ...args: Args) => any;
        static quant: number;
        static deadline: number;
        static liveline: number;
        static current: $mol_fiber<any>;
        static scheduled: $mol_after_frame;
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
    function $mol_atom2_value<Value>(task: () => Value): Value;
    class $mol_atom2<Value = any> extends $mol_fiber<Value> {
        static get current(): $mol_atom2<any>;
        static cached: boolean;
        static reap_task: $mol_fiber<any>;
        static reap_queue: $mol_atom2<any>[];
        static reap(atom: $mol_atom2): void;
        slaves: (number | $mol_fiber<any>)[];
        rescue(master: $mol_atom2, cursor: number): void;
        get(): Value;
        pull(): void | Value;
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
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_atom2_field<Host extends object, Field extends keyof Host, Value extends Host[Field]>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<Value>): any;
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends Object {
        static $: $mol_ambient_context;
        static get $$(): $mol_ambient_context;
        _$: $mol_ambient_context;
        get $(): $mol_ambient_context;
        set $(next: $mol_ambient_context);
        get $$(): $mol_ambient_context;
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
        static toString(): string;
        toString(): string;
        toJSON(): string;
        destructor(): void;
        [Symbol.toStringTag]: string;
    }
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
    function $mol_mem<Host extends object, Field extends keyof Host, Value>(proto: Host, name: Field, descr?: TypedPropertyDescriptor<(next?: Value, force?: $mol_mem_force) => Value>): any;
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }, force?: $mol_mem_force): {
            width: number;
            height: number;
        };
    }
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
    function $mol_atom2_autorun(calculate: () => any): $mol_atom2<unknown>;
}

declare namespace $ {
    var $mol_dom_context: Window & Pick<typeof globalThis, 'Node' | 'Element' | 'HTMLElement' | 'XMLHttpRequest' | 'DOMParser' | 'XMLSerializer'>;
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
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        promise: any;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
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
    function $mol_deprecated<Host extends {
        constructor: Function;
    }, Method extends Function>(message: string): (host: Host, field: string, descr: TypedPropertyDescriptor<Method>) => void;
}

declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
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
        minimal_height(): number;
        content_height(): number;
        dom_id(): string;
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
        attr(): {
            [key: string]: string | number | boolean | null;
        };
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
}

interface Window {
    cordova: any;
}
declare namespace $ {
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
    class $mol_state_time extends $mol_object {
        static now(precision?: number, next?: number): number;
    }
}

declare namespace $ {
    function $mol_font_canvas(next?: CanvasRenderingContext2D): CanvasRenderingContext2D;
}

declare namespace $ {
    function $mol_font_measure(size: number, face: string, text: string): number;
}

declare namespace $ {
    class $mol_svg extends $mol_view {
        /**
         *  ```
         *  dom_name \svg
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  dom_name_space \http://www.w3.org/2000/svg
         *  ```
         **/
        dom_name_space(): string;
        /**
         *  ```
         *  text_width?text 0
         *  ```
         **/
        text_width(text?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  font_size 16
         *  ```
         **/
        font_size(): number;
        /**
         *  ```
         *  font_family \
         *  ```
         **/
        font_family(): string;
    }
}

declare namespace $.$$ {
    class $mol_svg extends $.$mol_svg {
        computed_style(): CSSStyleDeclaration;
        font_size(): number;
        font_family(): any;
        text_width(text: string): number;
    }
}

declare namespace $ {
    class $mol_svg_group extends $mol_svg {
        /**
         *  ```
         *  dom_name \g
         *  ```
         **/
        dom_name(): string;
    }
}

declare namespace $ {
    class $mol_vector<Value, Length extends number> extends Array<Value> {
        length: Length;
        constructor(...values: Value[] & {
            length: Length;
        });
        map<Res>(convert: (value: Value, index: number, array: this) => Res, self?: any): $mol_vector<Res, Length>;
        merged<Patch>(patches: readonly Patch[] & {
            length: Length;
        }, combine: (value: Value, patch: Patch) => Value): this;
        limited(this: $mol_vector<number, Length>, limits: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
        added0(this: $mol_vector<number, Length>, diff: number): this;
        added1(this: $mol_vector<number, Length>, diff: readonly number[] & {
            length: Length;
        }): this;
        multed0(this: $mol_vector<number, Length>, mult: number): this;
        multed1(this: $mol_vector<number, Length>, mults: readonly number[] & {
            length: Length;
        }): this;
        expanded1(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly number[] & {
            length: Length;
        }): this;
        expanded2(this: $mol_vector<$mol_vector_range<number>, Length>, point: readonly (readonly [number, number])[] & {
            length: Length;
        }): this;
    }
    class $mol_vector_1d<Value> extends $mol_vector<Value, 1> {
        [0]: Value;
        get x(): Value;
    }
    class $mol_vector_2d<Value> extends $mol_vector<Value, 2> {
        [0]: Value;
        [1]: Value;
        get x(): Value;
        get y(): Value;
    }
    class $mol_vector_3d<Value> extends $mol_vector<Value, 3> {
        [0]: Value;
        [1]: Value;
        [2]: Value;
        get x(): Value;
        get y(): Value;
        get z(): Value;
    }
    class $mol_vector_range<Value> extends $mol_vector<Value, 2> {
        [0]: Value;
        [1]: Value;
        get min(): Value;
        get max(): Value;
        get inversed(): $mol_vector_range<Value>;
        expanded0(value: Value): $mol_vector_range<Value>;
    }
    let $mol_vector_range_full: $mol_vector_range<number>;
    class $mol_vector_matrix<Width extends number, Height extends number> extends $mol_vector<readonly number[] & {
        length: Width;
    }, Height> {
        added2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
        multed2(diff: readonly (readonly number[] & {
            length: Width;
        })[] & {
            length: Height;
        }): this;
    }
}

declare namespace $ {
    class $mol_plot_graph extends $mol_svg_group {
        /**
         *  ```
         *  series_x /number
         *  ```
         **/
        series_x(): readonly number[];
        /**
         *  ```
         *  series_y /number
         *  ```
         **/
        series_y(): readonly number[];
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_plot_graph_type <= type
         *  ```
         **/
        attr(): {
            "mol_plot_graph_type": string;
        };
        /**
         *  ```
         *  type \solid
         *  ```
         **/
        type(): string;
        /**
         *  ```
         *  style *
         *  	^
         *  	color <= color
         *  ```
         **/
        style(): {
            "color": string;
        };
        /**
         *  ```
         *  color \
         *  ```
         **/
        color(): string;
        /**
         *  ```
         *  viewport $mol_vector_2d /
         *  	<= viewport_x
         *  	<= viewport_y
         *  ```
         **/
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  viewport_x $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        viewport_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  viewport_y $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        viewport_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  shift /number
         *  	0
         *  	0
         *  ```
         **/
        shift(): readonly number[];
        /**
         *  ```
         *  scale /number
         *  	1
         *  	1
         *  ```
         **/
        scale(): readonly number[];
        /**
         *  ```
         *  cursor_position $mol_vector_2d /
         *  	NaN
         *  	NaN
         *  ```
         **/
        cursor_position(): $mol_vector_2d<number>;
        /**
         *  ```
         *  dimensions_pane $mol_vector_2d /
         *  	<= dimensions_pane_x
         *  	<= dimensions_pane_y
         *  ```
         **/
        dimensions_pane(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions_pane_x $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_pane_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions_pane_y $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_pane_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions $mol_vector_2d /
         *  	<= dimensions_x
         *  	<= dimensions_y
         *  ```
         **/
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions_x $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions_y $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  size_real $mol_vector_2d /
         *  	0
         *  	0
         *  ```
         **/
        size_real(): $mol_vector_2d<number>;
        /**
         *  ```
         *  gap $mol_vector_2d /
         *  	<= gap_x
         *  	<= gap_y
         *  ```
         **/
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  gap_x $mol_vector_range /
         *  	0
         *  	0
         *  ```
         **/
        gap_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  gap_y $mol_vector_range /
         *  	0
         *  	0
         *  ```
         **/
        gap_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  indexes /number
         *  ```
         **/
        indexes(): readonly number[];
        /**
         *  ```
         *  points /readonly(number)[]
         *  ```
         **/
        points(): readonly (readonly number[])[];
        /**
         *  ```
         *  front /$mol_svg
         *  ```
         **/
        front(): readonly $mol_svg[];
        /**
         *  ```
         *  back /$mol_svg
         *  ```
         **/
        back(): readonly $mol_svg[];
        /**
         *  ```
         *  hue NaN
         *  ```
         **/
        hue(): number;
        /**
         *  ```
         *  Sample null
         *  ```
         **/
        Sample(): any;
    }
}
declare namespace $ {
    class $mol_plot_graph_sample extends $mol_view {
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_plot_graph_type <= type
         *  ```
         **/
        attr(): {
            "mol_plot_graph_type": string;
        };
        /**
         *  ```
         *  type \solid
         *  ```
         **/
        type(): string;
        /**
         *  ```
         *  style *
         *  	^
         *  	color <= color
         *  ```
         **/
        style(): {
            "color": string;
        };
        /**
         *  ```
         *  color \black
         *  ```
         **/
        color(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_graph extends $.$mol_plot_graph {
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        points(): readonly (readonly number[])[];
        series_x(): readonly number[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        color(): string;
        front(): readonly $.$mol_svg[];
    }
}

declare namespace $ {
    class $mol_scroll extends $mol_view {
        /**
         *  ```
         *  minimal_height 0
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  field *
         *  	^
         *  	scrollTop <= scroll_top?val
         *  	scrollLeft <= scroll_left?val
         *  	scrollBottom <= scroll_bottom?val
         *  	scrollRight <= scroll_right?val
         *  ```
         **/
        field(): {
            "scrollTop": any;
            "scrollLeft": any;
            "scrollBottom": any;
            "scrollRight": any;
        };
        /**
         *  ```
         *  scroll_top?val 0
         *  ```
         **/
        scroll_top(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scroll_left?val 0
         *  ```
         **/
        scroll_left(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scroll_bottom?val 0
         *  ```
         **/
        scroll_bottom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scroll_right?val 0
         *  ```
         **/
        scroll_right(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  event *
         *  	^
         *  	scroll?event <=> event_scroll?event
         *  ```
         **/
        event(): {
            "scroll": (event?: any) => any;
        };
        /**
         *  ```
         *  event_scroll?event null
         *  ```
         **/
        event_scroll(event?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  Strut $mol_view style * transform <= strut_transform
         *  ```
         **/
        Strut(): $mol_view;
        /**
         *  ```
         *  strut_transform \
         *  ```
         **/
        strut_transform(): string;
    }
}

declare namespace $.$$ {
    function $mol_scroll_top(): number;
    function $mol_scroll_left(): number;
    function $mol_scroll_moving(): boolean;
    class $mol_scroll extends $.$mol_scroll {
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        get $$(): $mol_ambient_context;
        strut_transform(): string;
        sub_visible(): readonly (string | number | boolean | Node | $mol_view)[];
    }
}

declare namespace $ {
    class $mol_chart_legend extends $mol_scroll {
        /**
         *  ```
         *  graphs /$mol_plot_graph
         *  ```
         **/
        graphs(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  sub <= graph_legends
         *  ```
         **/
        sub(): readonly $mol_view[];
        /**
         *  ```
         *  graph_legends /$mol_view
         *  ```
         **/
        graph_legends(): readonly $mol_view[];
        /**
         *  ```
         *  Graph_legend!id $mol_view sub /
         *  	<= Graph_sample_box!id
         *  	<= Graph_title!id
         *  ```
         **/
        Graph_legend(id: any): $mol_view;
        /**
         *  ```
         *  Graph_sample_box!id $mol_view sub / <= Graph_sample!id
         *  ```
         **/
        Graph_sample_box(id: any): $mol_view;
        /**
         *  ```
         *  Graph_sample!id null
         *  ```
         **/
        Graph_sample(id: any): any;
        /**
         *  ```
         *  Graph_title!id $mol_view sub / <= graph_title!id
         *  ```
         **/
        Graph_title(id: any): $mol_view;
        /**
         *  ```
         *  graph_title!id \
         *  ```
         **/
        graph_title(id: any): string;
    }
}

declare namespace $.$$ {
    class $mol_chart_legend extends $.$mol_chart_legend {
        graphs_front(): $.$mol_plot_graph[];
        graph_legends(): $mol_view[];
        graph_title(index: number): string;
        Graph_sample(index: number): any;
    }
}

declare namespace $ {
    class $mol_svg_root extends $mol_svg {
        /**
         *  ```
         *  dom_name \svg
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	viewBox <= view_box
         *  	preserveAspectRatio <= aspect
         *  ```
         **/
        attr(): {
            "viewBox": string;
            "preserveAspectRatio": string;
        };
        /**
         *  ```
         *  view_box \0 0 100 100
         *  ```
         **/
        view_box(): string;
        /**
         *  ```
         *  aspect \xMidYMid
         *  ```
         **/
        aspect(): string;
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

declare namespace $ {
    class $mol_meter extends $mol_plugin {
        /**
         *  ```
         *  zoom 1
         *  ```
         **/
        zoom(): number;
        /**
         *  ```
         *  width?val 0
         *  ```
         **/
        width(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  height?val 0
         *  ```
         **/
        height(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  left?val 0
         *  ```
         **/
        left(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  right?val 0
         *  ```
         **/
        right(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  bottom?val 0
         *  ```
         **/
        bottom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  top?val 0
         *  ```
         **/
        top(val?: any, force?: $mol_mem_force): any;
    }
}

declare namespace $.$$ {
    class $mol_meter extends $.$mol_meter {
        rect(): {
            left: number;
            top: number;
            right: number;
            bottom: number;
            width: number;
            height: number;
            zoom: number;
        };
        top(): number;
        bottom(): number;
        left(): number;
        right(): number;
        width(): number;
        height(): number;
        zoom(): number;
    }
}

declare namespace $ {
    class $mol_touch extends $mol_plugin {
        /**
         *  ```
         *  start_zoom?val 0
         *  ```
         **/
        start_zoom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  start_distance?val 0
         *  ```
         **/
        start_distance(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  zoom?val 1
         *  ```
         **/
        zoom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  start_pan?val /
         *  	0
         *  	0
         *  ```
         **/
        start_pan(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  pan?val /
         *  	0
         *  	0
         *  ```
         **/
        pan(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  pos?val /
         *  	NaN
         *  	NaN
         *  ```
         **/
        pos(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  start_pos?val null
         *  ```
         **/
        start_pos(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_precision 16
         *  ```
         **/
        swipe_precision(): number;
        /**
         *  ```
         *  swipe_right?val null
         *  ```
         **/
        swipe_right(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_bottom?val null
         *  ```
         **/
        swipe_bottom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_left?val null
         *  ```
         **/
        swipe_left(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_top?val null
         *  ```
         **/
        swipe_top(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_from_right?val null
         *  ```
         **/
        swipe_from_right(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_from_bottom?val null
         *  ```
         **/
        swipe_from_bottom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_from_left?val null
         *  ```
         **/
        swipe_from_left(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_from_top?val null
         *  ```
         **/
        swipe_from_top(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_to_right?val null
         *  ```
         **/
        swipe_to_right(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_to_bottom?val null
         *  ```
         **/
        swipe_to_bottom(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_to_left?val null
         *  ```
         **/
        swipe_to_left(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  swipe_to_top?val null
         *  ```
         **/
        swipe_to_top(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  style *
         *  	^
         *  	touch-action \none
         *  ```
         **/
        style(): {
            "touch-action": string;
        };
        /**
         *  ```
         *  event *
         *  	^
         *  	touchstart?event <=> event_start?event
         *  	touchmove?event <=> event_move?event
         *  	touchend?event <=> event_end?event
         *  	mousedown?event <=> event_start?event
         *  	mousemove?event <=> event_move?event
         *  	mouseup?event <=> event_end?event
         *  	mouseleave?event <=> event_leave?event
         *  	wheel?event <=> event_wheel?event
         *  ```
         **/
        event(): {
            "touchstart": (event?: any) => any;
            "touchmove": (event?: any) => any;
            "touchend": (event?: any) => any;
            "mousedown": (event?: any) => any;
            "mousemove": (event?: any) => any;
            "mouseup": (event?: any) => any;
            "mouseleave": (event?: any) => any;
            "wheel": (event?: any) => any;
        };
        /**
         *  ```
         *  event_start?event null
         *  ```
         **/
        event_start(event?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  event_move?event null
         *  ```
         **/
        event_move(event?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  event_end?event null
         *  ```
         **/
        event_end(event?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  event_leave?event null
         *  ```
         **/
        event_leave(event?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  event_wheel?event null
         *  ```
         **/
        event_wheel(event?: any, force?: $mol_mem_force): any;
    }
}

declare namespace $.$$ {
    class $mol_touch extends $.$mol_touch {
        rect(): DOMRect;
        event_start(event: TouchEvent | MouseEvent): void;
        event_leave(event: TouchEvent | MouseEvent): void;
        event_move(event: TouchEvent | MouseEvent): void;
        swipe_left(event?: TouchEvent | MouseEvent): void;
        swipe_right(event?: TouchEvent | MouseEvent): void;
        swipe_top(event?: TouchEvent | MouseEvent): void;
        swipe_bottom(event?: TouchEvent | MouseEvent): void;
        event_end(event?: TouchEvent | MouseEvent): void;
        event_wheel(event: WheelEvent): void;
    }
}

declare namespace $ {
    class $mol_plot_pane extends $mol_svg_root {
        /**
         *  ```
         *  aspect \none
         *  ```
         **/
        aspect(): string;
        /**
         *  ```
         *  hue_base?val NaN
         *  ```
         **/
        hue_base(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  hue_shift?val 111
         *  ```
         **/
        hue_shift(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  gap_hor 48
         *  ```
         **/
        gap_hor(): number;
        /**
         *  ```
         *  gap_vert 24
         *  ```
         **/
        gap_vert(): number;
        /**
         *  ```
         *  gap_left <= gap_hor
         *  ```
         **/
        gap_left(): number;
        /**
         *  ```
         *  gap_right <= gap_hor
         *  ```
         **/
        gap_right(): number;
        /**
         *  ```
         *  gap_top <= gap_vert
         *  ```
         **/
        gap_top(): number;
        /**
         *  ```
         *  gap_bottom <= gap_vert
         *  ```
         **/
        gap_bottom(): number;
        /**
         *  ```
         *  gap $mol_vector_2d /
         *  	<= gap_x
         *  	<= gap_y
         *  ```
         **/
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  gap_x $mol_vector_range /
         *  	<= gap_left
         *  	<= gap_right
         *  ```
         **/
        gap_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  gap_y $mol_vector_range /
         *  	<= gap_bottom
         *  	<= gap_top
         *  ```
         **/
        gap_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  shift_limit $mol_vector_2d /
         *  	<= shift_limit_x
         *  	<= shift_limit_y
         *  ```
         **/
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  shift_limit_x $mol_vector_range /
         *  	0
         *  	0
         *  ```
         **/
        shift_limit_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  shift_limit_y $mol_vector_range /
         *  	0
         *  	0
         *  ```
         **/
        shift_limit_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  shift_default /number
         *  	0
         *  	0
         *  ```
         **/
        shift_default(): readonly number[];
        /**
         *  ```
         *  shift?val /number
         *  	0
         *  	0
         *  ```
         **/
        shift(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scale_limit $mol_vector_2d /
         *  	<= scale_limit_x
         *  	<= scale_limit_y
         *  ```
         **/
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  scale_limit_x $mol_vector_range /
         *  	0
         *  	Infinity
         *  ```
         **/
        scale_limit_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  scale_limit_y $mol_vector_range /
         *  	0
         *  	Infinity
         *  ```
         **/
        scale_limit_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  scale_default /number
         *  	0
         *  	0
         *  ```
         **/
        scale_default(): readonly number[];
        /**
         *  ```
         *  scale?val /number
         *  	1
         *  	1
         *  ```
         **/
        scale(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scale_x?val 0
         *  ```
         **/
        scale_x(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  scale_y?val 0
         *  ```
         **/
        scale_y(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  size $mol_vector_2d /
         *  	0
         *  	0
         *  ```
         **/
        size(): $mol_vector_2d<number>;
        /**
         *  ```
         *  size_real $mol_vector_2d /
         *  	1
         *  	1
         *  ```
         **/
        size_real(): $mol_vector_2d<number>;
        /**
         *  ```
         *  dimensions_viewport $mol_vector_2d /
         *  	<= dimensions_viewport_x
         *  	<= dimensions_viewport_y
         *  ```
         **/
        dimensions_viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions_viewport_x $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_viewport_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions_viewport_y $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_viewport_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions $mol_vector_2d /
         *  	<= dimensions_x
         *  	<= dimensions_y
         *  ```
         **/
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions_x $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_x(): $mol_vector_range<number>;
        /**
         *  ```
         *  dimensions_y $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_y(): $mol_vector_range<number>;
        /**
         *  ```
         *  sub <= graphs_sorted
         *  ```
         **/
        sub(): readonly $mol_svg[];
        /**
         *  ```
         *  graphs_sorted /$mol_svg
         *  ```
         **/
        graphs_sorted(): readonly $mol_svg[];
        /**
         *  ```
         *  graphs_colored <= graphs_positioned
         *  ```
         **/
        graphs_colored(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  graphs_positioned <= graphs
         *  ```
         **/
        graphs_positioned(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  graphs /$mol_plot_graph
         *  ```
         **/
        graphs(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  cursor_position?val $mol_vector_2d /
         *  	NaN
         *  	NaN
         *  ```
         **/
        cursor_position(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  plugins /
         *  	^
         *  	<= Meter
         *  	<= Touch
         *  ```
         **/
        plugins(): readonly any[];
        width(): number;
        height(): number;
        /**
         *  ```
         *  Meter $mol_meter
         *  	width => width
         *  	height => height
         *  ```
         **/
        Meter(): $$.$mol_meter;
        /**
         *  ```
         *  Touch $mol_touch
         *  	zoom?val <=> scale_x?val
         *  	pan?val <=> shift?val
         *  	pos?val <=> cursor_position?val
         *  ```
         **/
        Touch(): $$.$mol_touch;
        /**
         *  ```
         *  event *
         *  	^
         *  	dblclick?event <=> reset?event
         *  ```
         **/
        event(): {
            "dblclick": (event?: any) => any;
        };
        /**
         *  ```
         *  reset?event null
         *  ```
         **/
        reset(event?: any, force?: $mol_mem_force): any;
    }
}

declare namespace $.$$ {
    class $mol_plot_pane extends $.$mol_plot_pane {
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        size(): $mol_vector_2d<number>;
        graph_hue(index: number): number;
        graphs_colored(): readonly $.$mol_plot_graph[];
        size_real(): $mol_vector_2d<number>;
        view_box(): string;
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        scale_default(): readonly [number, number];
        scale(next?: readonly [number, number], force?: $mol_mem_force): readonly [number, number];
        scale_x(next?: number): number;
        scale_y(next?: number): number;
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_default(): readonly [number, number];
        graph_touched: boolean;
        shift(next?: readonly [number, number], force?: $mol_mem_force): readonly [number, number];
        reset(event?: Event): void;
        graphs_positioned(): readonly $.$mol_plot_graph[];
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        graphs_sorted(): $.$mol_svg[];
    }
}

declare namespace $ {
    class $mol_chart extends $mol_view {
        /**
         *  ```
         *  gap_hor 48
         *  ```
         **/
        gap_hor(): number;
        /**
         *  ```
         *  gap_vert 24
         *  ```
         **/
        gap_vert(): number;
        /**
         *  ```
         *  gap_left <= gap_hor
         *  ```
         **/
        gap_left(): number;
        /**
         *  ```
         *  gap_right <= gap_hor
         *  ```
         **/
        gap_right(): number;
        /**
         *  ```
         *  gap_bottom <= gap_vert
         *  ```
         **/
        gap_bottom(): number;
        /**
         *  ```
         *  gap_top <= gap_vert
         *  ```
         **/
        gap_top(): number;
        /**
         *  ```
         *  graphs /$mol_plot_graph
         *  ```
         **/
        graphs(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  sub /
         *  	<= Legend
         *  	<= Plot
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Legend $mol_chart_legend graphs <= graphs_colored
         *  ```
         **/
        Legend(): $$.$mol_chart_legend;
        graphs_colored(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  Plot $mol_plot_pane
         *  	gap_left <= gap_left
         *  	gap_right <= gap_right
         *  	gap_bottom <= gap_bottom
         *  	gap_top <= gap_top
         *  	graphs <= graphs
         *  	graphs_colored => graphs_colored
         *  	hue_base?val <= hue_base
         *  	hue_shift?val <= hue_shift
         *  ```
         **/
        Plot(): $$.$mol_plot_pane;
        /**
         *  ```
         *  hue_base 140
         *  ```
         **/
        hue_base(): number;
        /**
         *  ```
         *  hue_shift 111
         *  ```
         **/
        hue_shift(): number;
    }
}

declare namespace $ {
    class $mol_svg_rect extends $mol_svg {
        /**
         *  ```
         *  dom_name \rect
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  pos /
         *  ```
         **/
        pos(): readonly any[];
        /**
         *  ```
         *  attr *
         *  	^
         *  	width <= width
         *  	height <= height
         *  	x <= pos_x
         *  	y <= pos_y
         *  ```
         **/
        attr(): {
            "width": string;
            "height": string;
            "x": string;
            "y": string;
        };
        /**
         *  ```
         *  width \0
         *  ```
         **/
        width(): string;
        /**
         *  ```
         *  height \0
         *  ```
         **/
        height(): string;
        /**
         *  ```
         *  pos_x \
         *  ```
         **/
        pos_x(): string;
        /**
         *  ```
         *  pos_y \
         *  ```
         **/
        pos_y(): string;
    }
}

declare namespace $.$$ {
    class $mol_svg_rect extends $.$mol_svg_rect {
        pos_x(): any;
        pos_y(): any;
    }
}

declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        /**
         *  ```
         *  dom_name \path
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	d <= geometry
         *  ```
         **/
        attr(): {
            "d": string;
        };
        /**
         *  ```
         *  geometry \
         *  ```
         **/
        geometry(): string;
    }
}

declare namespace $ {
    class $mol_svg_text extends $mol_svg {
        /**
         *  ```
         *  dom_name \text
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  pos /
         *  ```
         **/
        pos(): readonly any[];
        /**
         *  ```
         *  attr *
         *  	^
         *  	x <= pos_x
         *  	y <= pos_y
         *  	text-anchor <= align
         *  ```
         **/
        attr(): {
            "x": string;
            "y": string;
            "text-anchor": string;
        };
        /**
         *  ```
         *  pos_x \
         *  ```
         **/
        pos_x(): string;
        /**
         *  ```
         *  pos_y \
         *  ```
         **/
        pos_y(): string;
        /**
         *  ```
         *  align \middle
         *  ```
         **/
        align(): string;
        /**
         *  ```
         *  sub / <= text
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  text \
         *  ```
         **/
        text(): string;
    }
}

declare namespace $.$$ {
    class $mol_svg_text extends $.$mol_svg_text {
        pos_x(): any;
        pos_y(): any;
    }
}

declare namespace $ {
    class $mol_svg_text_box extends $mol_svg_group {
        /**
         *  ```
         *  font_size 16
         *  ```
         **/
        font_size(): number;
        /**
         *  ```
         *  sub /
         *  	<= Back
         *  	<= Text
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Back $mol_svg_rect
         *  	width <= box_width
         *  	height <= box_height
         *  	pos /
         *  		<= box_pos_x
         *  		<= box_pos_y
         *  ```
         **/
        Back(): $$.$mol_svg_rect;
        /**
         *  ```
         *  box_width \0.5rem
         *  ```
         **/
        box_width(): string;
        /**
         *  ```
         *  box_height \1rem
         *  ```
         **/
        box_height(): string;
        /**
         *  ```
         *  box_pos_x <= pos_x
         *  ```
         **/
        box_pos_x(): string;
        /**
         *  ```
         *  box_pos_y \0
         *  ```
         **/
        box_pos_y(): string;
        /**
         *  ```
         *  Text $mol_svg_text
         *  	pos /
         *  		<= pos_x
         *  		<= pos_y
         *  	align <= align
         *  	sub / <= text
         *  ```
         **/
        Text(): $$.$mol_svg_text;
        /**
         *  ```
         *  pos_x \0
         *  ```
         **/
        pos_x(): string;
        /**
         *  ```
         *  pos_y \100%
         *  ```
         **/
        pos_y(): string;
        /**
         *  ```
         *  align \start
         *  ```
         **/
        align(): string;
        /**
         *  ```
         *  text \
         *  ```
         **/
        text(): string;
    }
}

declare namespace $.$$ {
    class $mol_svg_text_box extends $.$mol_svg_text_box {
        box_width(): any;
        box_pos_x(): string;
        box_pos_y(): string;
    }
}

declare namespace $ {
    function $mol_math_round_expand(val: number, gap?: number): number;
}

declare namespace $ {
    class $mol_plot_ruler extends $mol_plot_graph {
        /**
         *  ```
         *  step 0
         *  ```
         **/
        step(): number;
        /**
         *  ```
         *  scale_axis 1
         *  ```
         **/
        scale_axis(): number;
        /**
         *  ```
         *  scale_step 1
         *  ```
         **/
        scale_step(): number;
        /**
         *  ```
         *  shift_axis 1
         *  ```
         **/
        shift_axis(): number;
        /**
         *  ```
         *  dimensions_axis $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        dimensions_axis(): $mol_vector_range<number>;
        /**
         *  ```
         *  viewport_axis $mol_vector_range /
         *  	Infinity
         *  	-Infinity
         *  ```
         **/
        viewport_axis(): $mol_vector_range<number>;
        /**
         *  ```
         *  axis_points /number
         *  ```
         **/
        axis_points(): readonly number[];
        /**
         *  ```
         *  normalize?val 0
         *  ```
         **/
        normalize(val?: any, force?: $mol_mem_force): any;
        /**
         *  ```
         *  precision 1
         *  ```
         **/
        precision(): number;
        /**
         *  ```
         *  sub /
         *  	<= Background
         *  	<= Curve
         *  	<= labels_formatted
         *  	<= Title
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Background $mol_svg_rect
         *  	pos_x <= background_x
         *  	pos_y <= background_y
         *  	width <= background_width
         *  	height <= background_height
         *  ```
         **/
        Background(): $$.$mol_svg_rect;
        /**
         *  ```
         *  background_x \0
         *  ```
         **/
        background_x(): string;
        /**
         *  ```
         *  background_y \0
         *  ```
         **/
        background_y(): string;
        /**
         *  ```
         *  background_width \100%
         *  ```
         **/
        background_width(): string;
        /**
         *  ```
         *  background_height \14
         *  ```
         **/
        background_height(): string;
        /**
         *  ```
         *  Curve $mol_svg_path geometry <= curve
         *  ```
         **/
        Curve(): $mol_svg_path;
        /**
         *  ```
         *  curve \
         *  ```
         **/
        curve(): string;
        /**
         *  ```
         *  labels_formatted /
         *  ```
         **/
        labels_formatted(): readonly any[];
        /**
         *  ```
         *  Title $mol_svg_text_box
         *  	pos_x <= title_pos_x
         *  	pos_y <= title_pos_y
         *  	align <= title_align
         *  	text <= title
         *  ```
         **/
        Title(): $$.$mol_svg_text_box;
        /**
         *  ```
         *  title_pos_x \0
         *  ```
         **/
        title_pos_x(): string;
        /**
         *  ```
         *  title_pos_y \100%
         *  ```
         **/
        title_pos_y(): string;
        /**
         *  ```
         *  title_align \start
         *  ```
         **/
        title_align(): string;
        /**
         *  ```
         *  Label!index $mol_svg_text
         *  	pos <= label_pos!index
         *  	text <= label_text!index
         *  	align <= label_align
         *  ```
         **/
        Label(index: any): $$.$mol_svg_text;
        /**
         *  ```
         *  label_pos!index /
         *  	<= label_pos_x!index
         *  	<= label_pos_y!index
         *  ```
         **/
        label_pos(index: any): readonly any[];
        /**
         *  ```
         *  label_pos_x!index \
         *  ```
         **/
        label_pos_x(index: any): string;
        /**
         *  ```
         *  label_pos_y!index \
         *  ```
         **/
        label_pos_y(index: any): string;
        /**
         *  ```
         *  label_text!index \
         *  ```
         **/
        label_text(index: any): string;
        /**
         *  ```
         *  label_align \
         *  ```
         **/
        label_align(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_ruler extends $.$mol_plot_ruler {
        labels_formatted(): $mol_svg_text[];
        step(): number;
        snap_to_grid(coord: number): number;
        axis_points(): number[];
        precision(): number;
        label_text(index: number): string;
        font_size(): number;
        back(): $mol_svg_path[];
        front(): readonly $.$mol_svg[];
    }
}

declare namespace $ {
    class $mol_plot_ruler_vert extends $mol_plot_ruler {
        /**
         *  ```
         *  title_align \end
         *  ```
         **/
        title_align(): string;
        /**
         *  ```
         *  label_align \end
         *  ```
         **/
        label_align(): string;
        /**
         *  ```
         *  title_pos_y \14
         *  ```
         **/
        title_pos_y(): string;
        /**
         *  ```
         *  label_pos_x!v <= title_pos_x
         *  ```
         **/
        label_pos_x(v: any): string;
        /**
         *  ```
         *  background_height \100%
         *  ```
         **/
        background_height(): string;
        /**
         *  ```
         *  background_width <= title_pos_x
         *  ```
         **/
        background_width(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
        dimensions_axis(): $mol_vector_range<number>;
        viewport_axis(): $mol_vector_range<number>;
        scale_axis(): number;
        scale_step(): number;
        shift_axis(): number;
        curve(): string;
        title_pos_x(): string;
        label_pos_y(index: number): string;
    }
}

declare namespace $ {
    class $mol_plot_ruler_hor extends $mol_plot_ruler {
        /**
         *  ```
         *  title_align \start
         *  ```
         **/
        title_align(): string;
        /**
         *  ```
         *  label_align \middle
         *  ```
         **/
        label_align(): string;
        /**
         *  ```
         *  title_pos_x \0
         *  ```
         **/
        title_pos_x(): string;
        /**
         *  ```
         *  title_pos_y \100%
         *  ```
         **/
        title_pos_y(): string;
        /**
         *  ```
         *  label_pos_y!v <= title_pos_y
         *  ```
         **/
        label_pos_y(v: any): string;
        /**
         *  ```
         *  background_width \100%
         *  ```
         **/
        background_width(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
        dimensions_axis(): $mol_vector_range<number>;
        viewport_axis(): $mol_vector_range<number>;
        scale_axis(): number;
        scale_step(): number;
        shift_axis(): number;
        curve(): string;
        label_pos_x(index: number): string;
        background_y(): string;
        background_height(): string;
    }
}

declare namespace $ {
    class $mol_plot_group extends $mol_plot_graph {
        /**
         *  ```
         *  sub <= graphs_enriched
         *  ```
         **/
        sub(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  graphs_enriched <= graphs
         *  ```
         **/
        graphs_enriched(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  graphs /$mol_plot_graph
         *  ```
         **/
        graphs(): readonly $mol_plot_graph[];
        /**
         *  ```
         *  Sample $mol_plot_graph_sample sub <= graph_samples
         *  ```
         **/
        Sample(): $mol_plot_graph_sample;
        /**
         *  ```
         *  graph_samples /$mol_view
         *  ```
         **/
        graph_samples(): readonly $mol_view[];
    }
}

declare namespace $.$$ {
    class $mol_plot_group extends $.$mol_plot_group {
        graphs_enriched(): readonly $.$mol_plot_graph[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        graph_samples(): any[];
        back(): $mol_plot_graph[];
        front(): $mol_plot_graph[];
    }
}

declare namespace $ {
    class $mol_plot_line extends $mol_plot_graph {
        /**
         *  ```
         *  threshold 4
         *  ```
         **/
        threshold(): number;
        /**
         *  ```
         *  spacing 2
         *  ```
         **/
        spacing(): number;
        /**
         *  ```
         *  color_fill \none
         *  ```
         **/
        color_fill(): string;
        /**
         *  ```
         *  sub / <= Curve
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Curve $mol_svg_path geometry <= curve
         *  ```
         **/
        Curve(): $mol_svg_path;
        /**
         *  ```
         *  curve \
         *  ```
         **/
        curve(): string;
        /**
         *  ```
         *  Sample $mol_plot_graph_sample
         *  	color <= color
         *  	type <= type
         *  ```
         **/
        Sample(): $mol_plot_graph_sample;
    }
}

declare namespace $.$$ {
    class $mol_plot_line extends $.$mol_plot_line {
        indexes(): number[];
        curve(): string;
    }
}

declare namespace $ {
    function $mol_coord_pack(a: number, b: number): number;
    function $mol_coord_high(key: number): number;
    function $mol_coord_low(key: number): number;
}

declare namespace $ {
    class $mol_plot_dot extends $mol_plot_graph {
        /**
         *  ```
         *  points_max Infinity
         *  ```
         **/
        points_max(): number;
        /**
         *  ```
         *  style *
         *  	^
         *  	stroke-width <= diameter
         *  ```
         **/
        style(): {
            "stroke-width": number;
            "color": string;
        };
        /**
         *  ```
         *  diameter 8
         *  ```
         **/
        diameter(): number;
        /**
         *  ```
         *  sub / <= Curve
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Curve $mol_svg_path geometry <= curve
         *  ```
         **/
        Curve(): $mol_svg_path;
        /**
         *  ```
         *  curve \
         *  ```
         **/
        curve(): string;
        /**
         *  ```
         *  Sample $mol_plot_graph_sample color <= color
         *  ```
         **/
        Sample(): $mol_plot_graph_sample;
    }
}

declare namespace $.$$ {
    class $mol_plot_dot extends $.$mol_plot_dot {
        filled(): Set<number>;
        indexes(): number[];
        curve(): string;
    }
}

declare namespace $ {
    class $mol_app_bench_chart_rope_mol extends $mol_view {
        /**
         *  ```
         *  sub / <= Chart
         *  ```
         **/
        sub(): readonly any[];
        /**
         *  ```
         *  Chart $mol_chart graphs /
         *  	<= Vert
         *  	<= Hor
         *  	<= graphs
         *  ```
         **/
        Chart(): $mol_chart;
        /**
         *  ```
         *  Vert $mol_plot_ruler_vert title \Val
         *  ```
         **/
        Vert(): $$.$mol_plot_ruler_vert;
        /**
         *  ```
         *  Hor $mol_plot_ruler_hor title \Iter
         *  ```
         **/
        Hor(): $$.$mol_plot_ruler_hor;
        /**
         *  ```
         *  graphs /
         *  ```
         **/
        graphs(): readonly any[];
        /**
         *  ```
         *  Graph!id $mol_plot_group
         *  	title <= graph_title!id
         *  	series_y <= series!id
         *  	graphs /
         *  		<= Line!id
         *  		<= Dots!id
         *  ```
         **/
        Graph(id: any): $$.$mol_plot_group;
        /**
         *  ```
         *  graph_title!id \
         *  ```
         **/
        graph_title(id: any): string;
        /**
         *  ```
         *  series!id /
         *  ```
         **/
        series(id: any): readonly any[];
        /**
         *  ```
         *  Line!id $mol_plot_line
         *  ```
         **/
        Line(id: any): $$.$mol_plot_line;
        /**
         *  ```
         *  Dots!id $mol_plot_dot
         *  ```
         **/
        Dots(id: any): $$.$mol_plot_dot;
    }
}

declare namespace $.$$ {
    interface $mol_app_bench_chart_rope_mol_data {
        sample: string;
        graphs: number[][];
    }
    class $mol_app_bench_chart_rope_mol extends $.$mol_app_bench_chart_rope_mol {
        static data(next?: $mol_app_bench_chart_rope_mol_data, force?: $mol_mem_force): $mol_app_bench_chart_rope_mol_data;
        graphs(): $mol_plot_group[];
        graph_title(id: number): string;
        series(id: number): number[];
    }
}
