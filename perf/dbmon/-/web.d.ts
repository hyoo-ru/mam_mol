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
    function $mol_log_debug(next?: string): string;
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

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }, force?: $mol_atom_force): {
            width: number;
            height: number;
        };
    }
}

declare namespace $ {
    var $mol_dom_context: Window & Pick<typeof globalThis, 'Node' | 'Element' | 'HTMLElement' | 'XMLHttpRequest' | 'DOMParser' | 'XMLSerializer'>;
}

declare namespace $ {
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

interface Window {
    cordova: any;
}
declare namespace $ {
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
         *  moving_hor?val false
         *  ```
         **/
        moving_hor(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  moving_vert?val false
         *  ```
         **/
        moving_vert(val?: any, force?: $mol_atom_force): any;
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
        scroll_top(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scroll_left?val 0
         *  ```
         **/
        scroll_left(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scroll_bottom?val 0
         *  ```
         **/
        scroll_bottom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scroll_right?val 0
         *  ```
         **/
        scroll_right(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_async *
         *  	^
         *  	scroll?event <=> event_scroll?event
         *  ```
         **/
        event_async(): {
            "scroll": (event?: any) => any;
        };
        /**
         *  ```
         *  event_scroll?event null
         *  ```
         **/
        event_scroll(event?: any, force?: $mol_atom_force): any;
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
    class $mol_list extends $mol_view {
        /**
         *  ```
         *  sub <= rows
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  rows /
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Empty null
         *  ```
         **/
        Empty(): any;
    }
}

declare namespace $.$$ {
    class $mol_list extends $.$mol_list {
        sub(): any[];
        row_offsets(): number[];
        row_context(index: number): $mol_ambient_context;
        sub_visible(): any[];
        minimal_height(): number;
    }
}

declare namespace $ {
    class $mol_plugin extends $mol_object {
        /**
         *  ```
         *  dom_node null
         *  ```
         **/
        dom_node(): any;
        /**
         *  ```
         *  attr_static *
         *  ```
         **/
        attr_static(): {};
        /**
         *  ```
         *  event *
         *  ```
         **/
        event(): {};
        /**
         *  ```
         *  event_async *
         *  ```
         **/
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
    class $mol_state_time extends $mol_object {
        static now(precision?: number, next?: number, force?: $mol_atom_force): number;
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
        width(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  height?val 0
         *  ```
         **/
        height(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  left?val 0
         *  ```
         **/
        left(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  right?val 0
         *  ```
         **/
        right(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  bottom?val 0
         *  ```
         **/
        bottom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  top?val 0
         *  ```
         **/
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
    class $mol_pop extends $mol_view {
        /**
         *  ```
         *  event * keydown?event <=> keydown?event
         *  ```
         **/
        event(): {
            "keydown": (event?: any) => any;
        };
        /**
         *  ```
         *  keydown?event null
         *  ```
         **/
        keydown(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  showed?val false
         *  ```
         **/
        showed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  plugins / <= Meter
         *  ```
         **/
        plugins(): any[];
        top(): any;
        bottom(): any;
        left(): any;
        right(): any;
        /**
         *  ```
         *  Meter $mol_meter
         *  	top => top
         *  	bottom => bottom
         *  	left => left
         *  	right => right
         *  ```
         **/
        Meter(): $mol_meter;
        /**
         *  ```
         *  sub /
         *  	<= Anchor
         *  	<= Bubble
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Anchor null
         *  ```
         **/
        Anchor(): any;
        /**
         *  ```
         *  Bubble $mol_pop_bubble
         *  	align <= align
         *  	content <= bubble_content
         *  	height_max <= height_max
         *  ```
         **/
        Bubble(): $mol_pop_bubble;
        /**
         *  ```
         *  align \bottom_center
         *  ```
         **/
        align(): string;
        /**
         *  ```
         *  bubble_content /
         *  ```
         **/
        bubble_content(): any[];
        /**
         *  ```
         *  height_max 9999
         *  ```
         **/
        height_max(): number;
    }
}
declare namespace $ {
    class $mol_pop_bubble extends $mol_scroll {
        /**
         *  ```
         *  sub <= content
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  content /
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  style *
         *  	^
         *  	maxHeight <= height_max
         *  ```
         **/
        style(): {
            "maxHeight": number;
        };
        /**
         *  ```
         *  height_max 9999
         *  ```
         **/
        height_max(): number;
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_pop_align <= align
         *  	tabindex 0
         *  ```
         **/
        attr(): {
            "mol_pop_align": string;
            "tabindex": number;
        };
        /**
         *  ```
         *  align \
         *  ```
         **/
        align(): string;
    }
}

declare namespace $.$$ {
    class $mol_pop extends $.$mol_pop {
        sub(): any[];
        height_max(): number;
        align(): string;
        keydown(event?: KeyboardEvent): void;
    }
}

declare namespace $ {
    class $mol_pop_over extends $mol_pop {
        /**
         *  ```
         *  showed <= hovered?val
         *  ```
         **/
        showed(): any;
        /**
         *  ```
         *  hovered?val false
         *  ```
         **/
        hovered(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  attr *
         *  	^
         *  	tabindex 0
         *  ```
         **/
        attr(): {
            "tabindex": number;
        };
        /**
         *  ```
         *  event *
         *  	^
         *  	mouseenter?event <=> event_show?event
         *  	mouseleave?event <=> event_hide?event
         *  ```
         **/
        event(): {
            "mouseenter": (event?: any) => any;
            "mouseleave": (event?: any) => any;
            "keydown": (event?: any) => any;
        };
        /**
         *  ```
         *  event_show?event null
         *  ```
         **/
        event_show(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_hide?event null
         *  ```
         **/
        event_hide(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_pop_over extends $.$mol_pop_over {
        event_show(event?: MouseEvent): void;
        event_hide(event?: MouseEvent): void;
        showed(): any;
    }
}

declare namespace $ {
    class $mol_perf_dbmon extends $mol_scroll {
        /**
         *  ```
         *  title \dbmon ($mol)
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Databases
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Databases $mol_list rows <= databases
         *  ```
         **/
        Databases(): $mol_list;
        /**
         *  ```
         *  databases /
         *  ```
         **/
        databases(): any[];
        /**
         *  ```
         *  Database!id $mol_view sub /
         *  	<= Name!id
         *  	<= Query_count!id
         *  	<= top_queries!id
         *  ```
         **/
        Database(id: any): $mol_view;
        /**
         *  ```
         *  Name!id $mol_view sub / <= name!id
         *  ```
         **/
        Name(id: any): $mol_view;
        /**
         *  ```
         *  name!id \
         *  ```
         **/
        name(id: any): string;
        /**
         *  ```
         *  Query_count!id $mol_perf_dbmon_query_count
         *  	label_mod <= query_count_label_mod!id
         *  	count <= query_count!id
         *  ```
         **/
        Query_count(id: any): $mol_perf_dbmon_query_count;
        /**
         *  ```
         *  query_count_label_mod!id \
         *  ```
         **/
        query_count_label_mod(id: any): string;
        /**
         *  ```
         *  query_count!id 0
         *  ```
         **/
        query_count(id: any): number;
        /**
         *  ```
         *  top_queries!id /
         *  ```
         **/
        top_queries(id: any): any[];
        /**
         *  ```
         *  Query!id $mol_perf_dbmon_query
         *  	elapsed <= query_elapsed!id
         *  	elapsed_mod <= query_elapsed_mod!id
         *  	value <= query_value!id
         *  ```
         **/
        Query(id: any): $mol_perf_dbmon_query;
        /**
         *  ```
         *  query_elapsed!id \
         *  ```
         **/
        query_elapsed(id: any): string;
        /**
         *  ```
         *  query_elapsed_mod!id \
         *  ```
         **/
        query_elapsed_mod(id: any): string;
        /**
         *  ```
         *  query_value!id \
         *  ```
         **/
        query_value(id: any): string;
    }
}
declare namespace $ {
    class $mol_perf_dbmon_query_count extends $mol_view {
        /**
         *  ```
         *  sub / <= Label
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Label $mol_view
         *  	attr * mol_perf_dbmon_query_count_label <= label_mod
         *  	sub / <= count
         *  ```
         **/
        Label(): $mol_view;
        /**
         *  ```
         *  label_mod \
         *  ```
         **/
        label_mod(): string;
        /**
         *  ```
         *  count 0
         *  ```
         **/
        count(): number;
    }
}
declare namespace $ {
    class $mol_perf_dbmon_query extends $mol_pop_over {
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  Anchor <= Elapsed
         *  ```
         **/
        Anchor(): $mol_view;
        /**
         *  ```
         *  Elapsed $mol_view
         *  	attr * mol_perf_dbmon_query_elapsed <= elapsed_mod
         *  	sub / <= elapsed
         *  ```
         **/
        Elapsed(): $mol_view;
        /**
         *  ```
         *  elapsed_mod \
         *  ```
         **/
        elapsed_mod(): string;
        /**
         *  ```
         *  elapsed \
         *  ```
         **/
        elapsed(): string;
        /**
         *  ```
         *  bubble_content / <= value
         *  ```
         **/
        bubble_content(): any[];
        /**
         *  ```
         *  value \
         *  ```
         **/
        value(): string;
        /**
         *  ```
         *  align \left_center
         *  ```
         **/
        align(): string;
    }
}

declare let ENV: any;
declare let Monitoring: any;
declare namespace $.$$ {
    class $mol_perf_dbmon extends $.$mol_perf_dbmon {
        data(): any;
        databases(): $mol_view[];
        name(id: string): any;
        last_sample(id: string): any;
        query_count(id: string): any;
        query_count_label_mod(id: string): any;
        top_queries_data(db: string): any;
        top_queries(db: string): $mol_perf_dbmon_query[];
        top_query(id: {
            db: string;
            query: string;
        }): any;
        query_elapsed(id: {
            db: string;
            query: string;
        }): any;
        query_elapsed_mod(id: {
            db: string;
            query: string;
        }): any;
        query_value(id: {
            db: string;
            query: string;
        }): any;
    }
}
