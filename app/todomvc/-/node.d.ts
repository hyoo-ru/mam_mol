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
    class $mol_string extends $mol_view {
        /**
         *  ```
         *  dom_name \input
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  enabled true
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  debounce 0
         *  ```
         **/
        debounce(): number;
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  autocomplete false
         *  ```
         **/
        autocomplete(): boolean;
        /**
         *  ```
         *  field *
         *  	^
         *  	disabled <= disabled
         *  	value <= value_changed?val
         *  	placeholder <= hint
         *  	type <= type?val
         *  	spellcheck <= spellcheck
         *  	autocomplete <= autocomplete_native
         *  ```
         **/
        field(): {
            "disabled": boolean;
            "value": any;
            "placeholder": string;
            "type": any;
            "spellcheck": boolean;
            "autocomplete": string;
        };
        /**
         *  ```
         *  disabled false
         *  ```
         **/
        disabled(): boolean;
        /**
         *  ```
         *  value_changed?val <=> value?val
         *  ```
         **/
        value_changed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  value?val \
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  type?val \text
         *  ```
         **/
        type(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  spellcheck false
         *  ```
         **/
        spellcheck(): boolean;
        /**
         *  ```
         *  autocomplete_native \
         *  ```
         **/
        autocomplete_native(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	maxlength <= length_max
         *  ```
         **/
        attr(): {
            "maxlength": number;
        };
        /**
         *  ```
         *  length_max Infinity
         *  ```
         **/
        length_max(): number;
        /**
         *  ```
         *  event *
         *  	^
         *  	input?event <=> event_change?event
         *  	keydown?event <=> event_key_press?event
         *  ```
         **/
        event(): {
            "input": (event?: any) => any;
            "keydown": (event?: any) => any;
        };
        /**
         *  ```
         *  event_change?event null
         *  ```
         **/
        event_change(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_key_press?event null
         *  ```
         **/
        event_key_press(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_string extends $.$mol_string {
        _timer: any;
        event_change(next?: Event): void;
        event_key_press(next?: KeyboardEvent): void;
        disabled(): boolean;
        autocomplete_native(): "on" | "off";
    }
}

declare namespace $ {
    class $mol_button extends $mol_view {
        /**
         *  ```
         *  enabled true
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  click?event null
         *  ```
         **/
        click(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_click?event null
         *  ```
         **/
        event_click(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event *
         *  	^
         *  	click?event <=> event_activate?event
         *  	keypress?event <=> event_key_press?event
         *  ```
         **/
        event(): {
            "click": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        /**
         *  ```
         *  event_activate?event null
         *  ```
         **/
        event_activate(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_key_press?event null
         *  ```
         **/
        event_key_press(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  attr *
         *  	^
         *  	disabled <= disabled
         *  	role \button
         *  	tabindex <= tab_index
         *  	title <= hint
         *  ```
         **/
        attr(): {
            "disabled": boolean;
            "role": string;
            "tabindex": number;
            "title": string;
        };
        /**
         *  ```
         *  disabled false
         *  ```
         **/
        disabled(): boolean;
        /**
         *  ```
         *  tab_index 0
         *  ```
         **/
        tab_index(): number;
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  sub / <= title
         *  ```
         **/
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
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_theme \$mol_theme_accent
         *  ```
         **/
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
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  dom_name \a
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	href <= uri
         *  	title <= hint
         *  	target <= target
         *  	download <= file_name
         *  	mol_link_current <= current
         *  ```
         **/
        attr(): {
            "href": string;
            "title": string;
            "target": string;
            "download": string;
            "mol_link_current": boolean;
        };
        /**
         *  ```
         *  uri \
         *  ```
         **/
        uri(): string;
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  target \_self
         *  ```
         **/
        target(): string;
        /**
         *  ```
         *  file_name \
         *  ```
         **/
        file_name(): string;
        /**
         *  ```
         *  current false
         *  ```
         **/
        current(): boolean;
        /**
         *  ```
         *  sub / <= title
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  arg *
         *  ```
         **/
        arg(): {};
        /**
         *  ```
         *  event *
         *  	^
         *  	click?event <=> click?event
         *  ```
         **/
        event(): {
            "click": (event?: any) => any;
        };
        /**
         *  ```
         *  click?event <=> event_click?event
         *  ```
         **/
        click(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_click?event null
         *  ```
         **/
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
    class $mol_check extends $mol_button_minor {
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_check_checked <= checked?val
         *  	aria-checked <= checked?val
         *  	role \checkbox
         *  ```
         **/
        attr(): {
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
        /**
         *  ```
         *  checked?val false
         *  ```
         **/
        checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= Icon
         *  	<= label
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Icon null
         *  ```
         **/
        Icon(): any;
        /**
         *  ```
         *  label / <= Title
         *  ```
         **/
        label(): any[];
        /**
         *  ```
         *  Title $mol_view sub / <= title
         *  ```
         **/
        Title(): $mol_view;
        /**
         *  ```
         *  title \
         *  ```
         **/
        title(): string;
    }
}

declare namespace $.$$ {
    class $mol_check extends $.$mol_check {
        event_click(next?: Event): void;
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
    class $mol_bar extends $mol_view {
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
    class $mol_app_todomvc extends $mol_scroll {
        /**
         *  ```
         *  title \Todos
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Page
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Page $mol_list rows /
         *  	<= Title
         *  	<= Panel
         *  ```
         **/
        Page(): $mol_list;
        /**
         *  ```
         *  Title $mol_view
         *  	minimal_height 176
         *  	sub / <= title
         *  ```
         **/
        Title(): $mol_view;
        /**
         *  ```
         *  Panel $mol_list rows <= panels
         *  ```
         **/
        Panel(): $mol_list;
        /**
         *  ```
         *  panels /
         *  	<= Head
         *  	<= List
         *  	<= Foot
         *  ```
         **/
        panels(): any[];
        /**
         *  ```
         *  Head $mol_view
         *  	minimal_height 64
         *  	sub <= Head_content
         *  ```
         **/
        Head(): $mol_view;
        /**
         *  ```
         *  Head_content /
         *  	<= Head_complete
         *  	<= Add
         *  ```
         **/
        Head_content(): any[];
        /**
         *  ```
         *  Head_complete $mol_check
         *  	enabled <= head_complete_enabled
         *  	checked?val <=> completed_all?val
         *  	title \❯
         *  ```
         **/
        Head_complete(): $mol_check;
        /**
         *  ```
         *  head_complete_enabled false
         *  ```
         **/
        head_complete_enabled(): boolean;
        /**
         *  ```
         *  completed_all?val false
         *  ```
         **/
        completed_all(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Add $mol_app_todomvc_add
         *  	value?val <=> task_title_new?val
         *  	event_done?event <=> event_add?event
         *  ```
         **/
        Add(): $mol_app_todomvc_add;
        /**
         *  ```
         *  task_title_new?val \
         *  ```
         **/
        task_title_new(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_add?event null
         *  ```
         **/
        event_add(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  List $mol_list rows <= task_rows
         *  ```
         **/
        List(): $mol_list;
        /**
         *  ```
         *  task_rows /
         *  ```
         **/
        task_rows(): any[];
        /**
         *  ```
         *  Foot $mol_view sub <= foot_content
         *  ```
         **/
        Foot(): $mol_view;
        /**
         *  ```
         *  foot_content /
         *  	<= Pending
         *  	<= Filter
         *  	<= Sweep
         *  ```
         **/
        foot_content(): any[];
        /**
         *  ```
         *  Pending $mol_view sub / <= pending_message
         *  ```
         **/
        Pending(): $mol_view;
        /**
         *  ```
         *  pending_message \0 items left
         *  ```
         **/
        pending_message(): string;
        /**
         *  ```
         *  Filter $mol_bar sub <= filterOptions
         *  ```
         **/
        Filter(): $mol_bar;
        /**
         *  ```
         *  filterOptions /
         *  	<= Filter_all
         *  	<= Filter_active
         *  	<= Filter_completed
         *  ```
         **/
        filterOptions(): any[];
        /**
         *  ```
         *  Filter_all $mol_link
         *  	sub / <= filter_all_label
         *  	arg * completed null
         *  ```
         **/
        Filter_all(): $mol_link;
        /**
         *  ```
         *  filter_all_label \All
         *  ```
         **/
        filter_all_label(): string;
        /**
         *  ```
         *  Filter_active $mol_link
         *  	sub / <= filter_active_label
         *  	arg * completed \false
         *  ```
         **/
        Filter_active(): $mol_link;
        /**
         *  ```
         *  filter_active_label \Active
         *  ```
         **/
        filter_active_label(): string;
        /**
         *  ```
         *  Filter_completed $mol_link
         *  	sub / <= filter_completed_label
         *  	arg * completed \true
         *  ```
         **/
        Filter_completed(): $mol_link;
        /**
         *  ```
         *  filter_completed_label \Completed
         *  ```
         **/
        filter_completed_label(): string;
        /**
         *  ```
         *  Sweep $mol_button_minor
         *  	enabled <= sweep_enabled
         *  	event_click?event <=> event_sweep?event
         *  	sub / <= sweep_label
         *  ```
         **/
        Sweep(): $mol_button_minor;
        /**
         *  ```
         *  sweep_enabled true
         *  ```
         **/
        sweep_enabled(): boolean;
        /**
         *  ```
         *  event_sweep?event null
         *  ```
         **/
        event_sweep(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sweep_label \Clear completed
         *  ```
         **/
        sweep_label(): string;
        /**
         *  ```
         *  Task_row!id $mol_app_todomvc_task_row
         *  	completed?val <=> task_completed!id?val
         *  	title?val <=> task_title!id?val
         *  	event_drop?event <=> event_task_drop!id?event
         *  ```
         **/
        Task_row(id: any): $mol_app_todomvc_task_row;
        /**
         *  ```
         *  task_completed!id?val false
         *  ```
         **/
        task_completed(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  task_title!id?val \
         *  ```
         **/
        task_title(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_task_drop!id?event null
         *  ```
         **/
        event_task_drop(id: any, event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_add extends $mol_string {
        /**
         *  ```
         *  hint \What needs to be done?
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  event *
         *  	^
         *  	keydown?event <=> event_press?event
         *  ```
         **/
        event(): {
            "keydown": (event?: any) => any;
            "input": (event?: any) => any;
        };
        /**
         *  ```
         *  event_press?event null
         *  ```
         **/
        event_press(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_done?event null
         *  ```
         **/
        event_done(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_task_row extends $mol_view {
        /**
         *  ```
         *  minimal_height 64
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  sub /
         *  	<= Complete
         *  	<= Title
         *  	<= Drop
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Complete $mol_check checked?val <=> completed?val
         *  ```
         **/
        Complete(): $mol_check;
        /**
         *  ```
         *  completed?val false
         *  ```
         **/
        completed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Title $mol_string
         *  	hint <= title_hint
         *  	value?val <=> title?val
         *  ```
         **/
        Title(): $mol_string;
        /**
         *  ```
         *  title_hint \Task title
         *  ```
         **/
        title_hint(): string;
        /**
         *  ```
         *  title?val \
         *  ```
         **/
        title(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Drop $mol_button_typed
         *  	sub / \✖
         *  	event_click?event <=> event_drop?event
         *  ```
         **/
        Drop(): $mol_button_typed;
        /**
         *  ```
         *  event_drop?event null
         *  ```
         **/
        event_drop(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_app_todomvc_task_row_completed <= completed?val
         *  ```
         **/
        attr(): {
            "mol_app_todomvc_task_row_completed": any;
        };
    }
}

interface $mol_app_todomvc_task {
    completed?: boolean;
    title?: string;
}
declare namespace $.$$ {
    class $mol_app_todomvc_add extends $.$mol_app_todomvc_add {
        event_press(next?: KeyboardEvent): any;
    }
    class $mol_app_todomvc extends $.$mol_app_todomvc {
        task_ids(next?: number[]): number[];
        arg_completed(): string;
        groups_completed(): {
            [index: string]: number[];
        };
        task_ids_filtered(): number[];
        completed_all(next?: boolean): boolean;
        head_complete_enabled(): boolean;
        pending_message(): string;
        new_id(): number;
        event_add(next?: Event): void;
        task_rows(): $mol_app_todomvc_task_row[];
        task(id: number, next?: $mol_app_todomvc_task): $mol_app_todomvc_task;
        task_completed(id: number, next?: boolean): boolean;
        task_title(id: number, next?: string): string;
        event_task_drop(id: number, next?: Event): void;
        event_sweep(): void;
        panels(): ($mol_view | $.$mol_list)[];
        foot_visible(): boolean;
        sweep_enabled(): boolean;
    }
}
