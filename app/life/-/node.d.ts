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
    namespace $$ { }
    class $mol_object {
        static $: $mol_ambient_context;
        readonly $: $mol_ambient_context;
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
        static toString(): string;
        'object_owner()': any;
        object_owner(next?: any): any;
        'object_host()': any;
        object_host(next?: any): any;
        'object_field()': string;
        object_field(next?: string): string;
        object_id(next?: string): any;
        toString(): any;
        toJSON(): any;
        destructor(): void;
    }
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
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    function $mol_log(path: any, ...values: any[]): void;
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
    function $mol_log_group<Task extends Function, This>(name: string, task: Task): Task;
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
    var $mol_state_stack: Map<string, any>;
}

declare namespace $ {
    enum $mol_atom_status {
        obsolete = "obsolete",
        checking = "checking",
        pulling = "pulling",
        actual = "actual"
    }
    function $mol_atom_fence<Task extends () => any>(task: Task): any;
    class $mol_atom<Value = any> extends $mol_object {
        masters: Set<$mol_atom<any>> | null;
        slaves: Set<$mol_atom<any>> | null;
        status: $mol_atom_status;
        readonly handler: (next?: Value, force?: $mol_atom_force) => Value | void;
        'value()': Value | Error | undefined;
        constructor(id: string, handler?: (next?: Value, force?: $mol_atom_force) => Value | void);
        destructor(): void;
        unlink(): void;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value | undefined;
        _ignore: Value | undefined;
        set(next: Value): Value;
        push(next_raw?: Value | Error): Value;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): void;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        cache(next?: Value | Error): Error | Value;
        value(next?: Value, force?: $mol_atom_force): Value;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: Set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
        then<Next>(done: (prev?: Value) => Next, fail?: (error: Error) => Next): $mol_atom<any>;
        catch(fail: (error: Error) => Value): $mol_atom<any>;
    }
    function $mol_atom_current<Value = any>(): $mol_atom<Value>;
    class $mol_atom_wait extends Error {
        name: string;
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
        static toString(): string;
    }
    class $mol_atom_force_cache extends $mol_atom_force {
    }
    class $mol_atom_force_update extends $mol_atom_force {
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
    function $mol_mem<Host, Value>(obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>): void;
    function $mol_mem_key<Host, Key, Value>(obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>): void;
}

/// <reference types="node" />
declare namespace $ {
    function $mol_exec(dir: string, command: string, ...args: string[]): import("child_process").SpawnSyncReturns<Buffer>;
}

interface $node {
    [key: string]: any;
}
declare var $node: $node;

declare namespace $ {
}

declare namespace $ {
    var $mol_dom_context: Window & Pick<typeof globalThis, 'Node' | 'Element' | 'HTMLElement' | 'XMLHttpRequest' | 'DOMParser' | 'XMLSerializer'>;
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(next?: {
            start: number;
            end: number;
            id: string;
        }, force?: $mol_atom_force): {
            start: number;
            end: number;
            id: string;
        };
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
    function $mol_dom_render_events_async(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element, childNodes: NodeList | readonly (Node | string | number | boolean | {
        dom_tree: () => Node;
    })[]): void;
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
    function $mol_func_name(func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    namespace $$ { }
    namespace $mol { }
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        static autobind(): void;
        title(): string;
        focused(next?: boolean): boolean;
        context(next?: $mol_ambient_context): $mol_ambient_context;
        $: $mol_ambient_context;
        context_sub(): $mol_ambient_context;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly (string | number | boolean | Node | $mol_view)[];
        sub_visible(): readonly (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        minimal_height(): number;
        content_height(): number;
        dom_id(): any;
        dom_node(next?: Element): Element;
        dom_tree(next?: Element): Element;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        view_names_owned(): string[];
        view_names(): string[];
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        attr(): {
            [key: string]: string | number | boolean;
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

declare namespace $ {
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static value(key: string, next?: string): string;
        static link(next: any): string;
        static make_link(next: {
            [key: string]: any;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string;
        sub(postfix: string): $mol_state_arg;
        link(next: {
            [key: string]: string;
        }): string;
    }
}

declare namespace $ {
    class $mol_link extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        attr(): {
            "href": string;
            "title": string;
            "target": string;
            "download": string;
            "mol_link_current": boolean;
        };
        uri(): string;
        hint(): string;
        target(): string;
        file_name(): string;
        current(): boolean;
        sub(): any[];
        arg(): {};
        event(): {
            "click": (event?: any) => any;
        };
        click(event?: any, force?: $mol_atom_force): any;
        event_click(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_link extends $.$mol_link {
        uri(): string;
        current(): boolean;
        event_click(event?: Event): void;
        file_name(): string;
    }
}

declare namespace $ {
    class $mol_state_time extends $mol_object {
        static now(precision?: number, next?: number, force?: $mol_atom_force): number;
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
        dom_name(): string;
        dom_name_space(): string;
        text_width(text?: any, force?: $mol_atom_force): any;
        font_size(): number;
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
    class $mol_svg_root extends $mol_svg {
        dom_name(): string;
        attr(): {
            "viewBox": string;
            "preserveAspectRatio": string;
        };
        view_box(): string;
        aspect(): string;
    }
}

declare namespace $ {
    class $mol_vector<Value, Length extends number> extends Array<Value> {
        length: Length;
        constructor(...values: Value[] & {
            length: Length;
        });
        map: <Res>(convert: (value: Value, index: number, array: this) => Res, self?: any) => $mol_vector<Res, Length>;
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
        readonly x: Value;
    }
    class $mol_vector_2d<Value> extends $mol_vector<Value, 2> {
        [0]: Value;
        [1]: Value;
        readonly x: Value;
        readonly y: Value;
    }
    class $mol_vector_3d<Value> extends $mol_vector<Value, 3> {
        [0]: Value;
        [1]: Value;
        [2]: Value;
        readonly x: Value;
        readonly y: Value;
        readonly z: Value;
    }
    class $mol_vector_range<Value> extends $mol_vector<Value, 2> {
        [0]: Value;
        [1]: Value;
        readonly min: Value;
        readonly max: Value;
        readonly inversed: $mol_vector_range<Value>;
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
    class $mol_svg_group extends $mol_svg {
        dom_name(): string;
    }
}

declare namespace $ {
    class $mol_plot_graph extends $mol_svg_group {
        series_x(): readonly number[];
        series_y(): readonly number[];
        attr(): {
            "mol_plot_graph_type": string;
        };
        type(): string;
        style(): {
            "color": string;
        };
        color(): string;
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        shift(): readonly number[];
        scale(): readonly number[];
        cursor_position(): $mol_vector_2d<number>;
        dimensions_pane(): $mol_vector_2d<$mol_vector_range<number>>;
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        size_real(): $mol_vector_2d<number>;
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        indexes(): readonly number[];
        points(): readonly (readonly [number, number])[];
        front(): readonly $mol_svg[];
        back(): readonly $mol_svg[];
        hue(): number;
        Sample(): any;
    }
}
declare namespace $ {
    class $mol_plot_graph_sample extends $mol_view {
        attr(): {
            "mol_plot_graph_type": string;
        };
        type(): string;
        style(): {
            "color": string;
        };
        color(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_graph extends $.$mol_plot_graph {
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        points(): (readonly [number, number])[];
        series_x(): number[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        color(): string;
        front(): this[];
    }
}

declare namespace $ {
    class $mol_plugin extends $mol_object {
        dom_node(): any;
        attr_static(): {};
        event(): {};
        event_async(): {};
    }
}

declare namespace $.$$ {
    class $mol_plugin extends $.$mol_plugin {
        dom_node(): any;
        render(): any;
    }
}

declare namespace $ {
    class $mol_meter extends $mol_plugin {
        zoom(): number;
        width(val?: any, force?: $mol_atom_force): any;
        height(val?: any, force?: $mol_atom_force): any;
        left(val?: any, force?: $mol_atom_force): any;
        right(val?: any, force?: $mol_atom_force): any;
        bottom(val?: any, force?: $mol_atom_force): any;
        top(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_meter extends $.$mol_meter {
        rect(): {
            left: any;
            top: any;
            right: any;
            bottom: any;
            width: any;
            height: any;
            zoom: number;
        };
        top(): any;
        bottom(): any;
        left(): any;
        right(): any;
        width(): any;
        height(): any;
        zoom(): number;
    }
}

declare namespace $ {
    class $mol_touch extends $mol_plugin {
        start_zoom(val?: any, force?: $mol_atom_force): any;
        start_distance(val?: any, force?: $mol_atom_force): any;
        zoom(val?: any, force?: $mol_atom_force): any;
        start_pan(val?: any, force?: $mol_atom_force): any;
        pan(val?: any, force?: $mol_atom_force): any;
        pos(val?: any, force?: $mol_atom_force): any;
        start_pos(val?: any, force?: $mol_atom_force): any;
        swipe_precision(): number;
        swipe_right(val?: any, force?: $mol_atom_force): any;
        swipe_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_left(val?: any, force?: $mol_atom_force): any;
        swipe_top(val?: any, force?: $mol_atom_force): any;
        swipe_from_right(val?: any, force?: $mol_atom_force): any;
        swipe_from_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_from_left(val?: any, force?: $mol_atom_force): any;
        swipe_from_top(val?: any, force?: $mol_atom_force): any;
        swipe_to_right(val?: any, force?: $mol_atom_force): any;
        swipe_to_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_to_left(val?: any, force?: $mol_atom_force): any;
        swipe_to_top(val?: any, force?: $mol_atom_force): any;
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
        event_start(event?: any, force?: $mol_atom_force): any;
        event_move(event?: any, force?: $mol_atom_force): any;
        event_end(event?: any, force?: $mol_atom_force): any;
        event_leave(event?: any, force?: $mol_atom_force): any;
        event_wheel(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_touch extends $.$mol_touch {
        rect(): any;
        event_start(event?: TouchEvent | MouseEvent): void;
        event_leave(event?: TouchEvent | MouseEvent): void;
        event_move(event?: TouchEvent | MouseEvent): void;
        swipe_left(event?: TouchEvent | MouseEvent): void;
        swipe_right(event?: TouchEvent | MouseEvent): void;
        swipe_top(event?: TouchEvent | MouseEvent): void;
        swipe_bottom(event?: TouchEvent | MouseEvent): void;
        event_end(event?: TouchEvent | MouseEvent): void;
        event_wheel(event?: WheelEvent): void;
    }
}

declare namespace $ {
    class $mol_plot_pane extends $mol_svg_root {
        aspect(): string;
        hue_base(val?: any, force?: $mol_atom_force): any;
        hue_shift(val?: any, force?: $mol_atom_force): any;
        gap_hor(): number;
        gap_vert(): number;
        gap_left(): number;
        gap_right(): number;
        gap_top(): number;
        gap_bottom(): number;
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_default(): readonly number[];
        shift(val?: any, force?: $mol_atom_force): any;
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        scale_default(): readonly number[];
        scale(val?: any, force?: $mol_atom_force): any;
        scale_x(val?: any, force?: $mol_atom_force): any;
        scale_y(val?: any, force?: $mol_atom_force): any;
        size(): $mol_vector_2d<number>;
        size_real(): $mol_vector_2d<number>;
        dimensions_viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        sub(): readonly $mol_svg[];
        graphs_sorted(): readonly $mol_svg[];
        graphs_colored(): readonly $mol_plot_graph[];
        graphs_positioned(): readonly $mol_plot_graph[];
        graphs(): readonly $mol_plot_graph[];
        cursor_position(val?: any, force?: $mol_atom_force): any;
        plugins(): any[];
        width(): any;
        height(): any;
        Meter(): $mol_meter;
        Touch(): $mol_touch;
        event(): {
            "dblclick": (event?: any) => any;
        };
        reset(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_plot_pane extends $.$mol_plot_pane {
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        size(): $mol_vector_2d<number>;
        graph_hue(index: number): number;
        graphs_colored(): readonly $.$mol_plot_graph[];
        size_real(): $mol_vector_2d<any>;
        view_box(): string;
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        scale_default(): readonly [number, number];
        scale(next?: readonly [number, number], force?: $mol_atom_force): readonly [number, number];
        scale_x(next?: number): number;
        scale_y(next?: number): number;
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
        shift_default(): readonly [number, number];
        graph_touched: boolean;
        shift(next?: readonly [number, number], force?: $mol_atom_force): readonly [number, number];
        reset(event?: Event): void;
        graphs_positioned(): readonly $.$mol_plot_graph[];
        viewport(): $mol_vector_2d<$mol_vector_range<any>>;
        graphs_sorted(): $.$mol_svg[];
    }
}

declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        attr(): {
            "d": string;
        };
        geometry(): string;
    }
}

declare namespace $ {
    function $mol_coord_pack(a: number, b: number): number;
    function $mol_coord_high(key: number): number;
    function $mol_coord_low(key: number): number;
}

declare namespace $ {
    class $mol_plot_dot extends $mol_plot_graph {
        points_max(): number;
        style(): {
            "stroke-width": number;
            "color": string;
        };
        diameter(): number;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
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
    class $mol_app_life_map extends $mol_plot_pane {
        gap_hor(): number;
        gap_vert(): number;
        pan(val?: any, force?: $mol_atom_force): any;
        zoom(val?: any, force?: $mol_atom_force): any;
        scale(): any[];
        shift(): any;
        graphs(): any[];
        Points(): $mol_plot_dot;
        points_x(): readonly number[];
        points_y(): readonly number[];
        plugins(): any[];
        Touch(): $mol_touch;
        snapshot(): string;
        snapshot_current(): string;
        speed(): number;
        population(): number;
        event(): {
            "mousedown": (event?: any) => any;
            "mouseup": (event?: any) => any;
            "dblclick": (event?: any) => any;
        };
        draw_start(event?: any, force?: $mol_atom_force): any;
        draw_end(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_app_life_map extends $.$mol_app_life_map {
        state(next?: Set<number>): Set<number>;
        snapshot_current(): string;
        future(next?: Set<number>): Set<number>;
        population(): number;
        points_x(): number[];
        points_y(): number[];
        draw_start_pos(next?: number[]): number[];
        draw_start(event?: MouseEvent): void;
        draw_end(event?: MouseEvent): void;
        zoom(next?: any): number;
        pan(next?: number[]): number[];
    }
}

declare namespace $ {
    const enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        bracketClose = 221,
        quoteSingle = 222
    }
}

declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        minimal_height(): number;
        click(event?: any, force?: $mol_atom_force): any;
        event_click(event?: any, force?: $mol_atom_force): any;
        event(): {
            "click": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        event_activate(event?: any, force?: $mol_atom_force): any;
        event_key_press(event?: any, force?: $mol_atom_force): any;
        attr(): {
            "disabled": boolean;
            "role": string;
            "tabindex": number;
            "title": string;
        };
        disabled(): boolean;
        tab_index(): number;
        hint(): string;
        sub(): any[];
    }
}

declare namespace $.$$ {
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): void;
        tab_index(): number;
    }
}

declare namespace $ {
    class $mol_button_typed extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_major extends $mol_button_typed {
        attr(): {
            "mol_theme": string;
            "disabled": boolean;
            "role": string;
            "tabindex": number;
            "title": string;
        };
    }
}
declare namespace $ {
    class $mol_button_minor extends $mol_button_typed {
    }
}

declare namespace $ {
    class $mol_scroll extends $mol_view {
        minimal_height(): number;
        moving_hor(val?: any, force?: $mol_atom_force): any;
        moving_vert(val?: any, force?: $mol_atom_force): any;
        field(): {
            "scrollTop": any;
            "scrollLeft": any;
            "scrollBottom": any;
            "scrollRight": any;
        };
        scroll_top(val?: any, force?: $mol_atom_force): any;
        scroll_left(val?: any, force?: $mol_atom_force): any;
        scroll_bottom(val?: any, force?: $mol_atom_force): any;
        scroll_right(val?: any, force?: $mol_atom_force): any;
        event_async(): {
            "scroll": (event?: any) => any;
        };
        event_scroll(event?: any, force?: $mol_atom_force): any;
        Strut(): $mol_view;
        strut_transform(): string;
    }
}

declare namespace $.$$ {
    function $mol_scroll_top(): number;
    function $mol_scroll_left(): number;
    function $mol_scroll_moving(): boolean;
    function $mol_scroll_moving_vert(): boolean;
    function $mol_scroll_moving_hor(): boolean;
    class $mol_scroll extends $.$mol_scroll {
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        event_repos(next?: Event): void;
        _moving_task_timer: any;
        moving_task_stop(): void;
        moving(): any;
        context_sub(): $mol_ambient_context;
        strut_transform(): string;
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
    }
}

declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    class $mol_page extends $mol_view {
        sub(): any[];
        Head(): $mol_view;
        head(): any[];
        Title(): $mol_button;
        event_top(val?: any, force?: $mol_atom_force): any;
        Tools(): $mol_view;
        tools(): any[];
        Body(): $mol_scroll;
        body_scroll_top(val?: any, force?: $mol_atom_force): any;
        body(): any[];
        Foot(): $mol_view;
        foot(): any[];
    }
}

declare namespace $.$$ {
    class $mol_page extends $.$mol_page {
        body_scroll_top(next?: number): number;
    }
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

/// <reference types="node" />
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        watcher(): import("chokidar").FSWatcher;
        stat(next?: any, force?: $mol_atom_force): any;
        version(): any;
        exists(next?: boolean): boolean;
        parent(): $mol_file;
        type(): "dir" | "link" | "file" | "blocks" | "chars" | "fifo" | "socket";
        name(): string;
        ext(): string;
        content(next?: string | Buffer, force?: $mol_atom_force): string | Buffer;
        reader(): import("fs").ReadStream;
        writer(): import("fs").WriteStream;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: $mol_file): string;
        append(next: string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
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
    class $mol_icon extends $mol_svg_root {
        view_box(): string;
        minimal_width(): number;
        minimal_height(): number;
        sub(): any[];
        Path(): $mol_svg_path;
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_stored extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check extends $mol_button_minor {
        attr(): {
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
        checked(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Icon(): any;
        label(): any[];
        Title(): $mol_view;
        title(): string;
    }
}

declare namespace $.$$ {
    class $mol_check extends $.$mol_check {
        event_click(next?: Event): void;
    }
}

declare namespace $ {
    class $mol_switch extends $mol_view {
        minimal_height(): number;
        Option(id: any): $mol_check;
        option_checked(id: any, val?: any, force?: $mol_atom_force): any;
        option_title(id: any): string;
        option_enabled(id: any): boolean;
        enabled(): boolean;
        value(val?: any, force?: $mol_atom_force): any;
        options(): {};
        sub(): any[];
        items(): any[];
    }
}

declare namespace $.$$ {
    class $mol_switch extends $.$mol_switch {
        value(next?: any): any;
        options(): {
            [key: string]: string;
        };
        items(): $.$mol_check[];
        option_title(key: string): string;
        option_checked(key: string, next?: boolean): boolean;
    }
}

declare namespace $ {
    class $mol_app_life extends $mol_page {
        title(): string;
        tools(): any[];
        Store_link(): $mol_link;
        store_link(val?: any, force?: $mol_atom_force): any;
        store_link_hint(): string;
        Stored(): $mol_icon_stored;
        Time(): $mol_switch;
        speed(val?: any, force?: $mol_atom_force): any;
        time_slowest_label(): string;
        time_slow_label(): string;
        time_fast_label(): string;
        time_fastest_label(): string;
        sub(): any[];
        snapshot_current(): string;
        population(): number;
        Map(): $mol_app_life_map;
        snapshot(): string;
    }
}

declare namespace $.$$ {
    class $mol_app_life extends $.$mol_app_life {
        title(): string;
        store_link(): string;
        snapshot(): string;
    }
}
