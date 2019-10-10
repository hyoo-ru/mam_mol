declare namespace $ { }
export = $;

declare namespace $ {
    function $mol_fail(error: any): never;
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
    class $mol_func_sandbox {
        static _make: (contexts: Object[]) => (code: string) => () => void;
        static readonly make: any;
        constructor(...contexts: Object[]);
        contexts: Object[];
        _eval: (code: string) => () => void;
        readonly eval: any;
    }
}

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
    enum $mol_keyboard_code {
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
        slashBackLeft = 226,
        bracketClose = 221,
        quoteSingle = 222
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
        /**
         *  ```
         *  sub /
         *  	<= Head
         *  	<= Body
         *  	<= Foot
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Head $mol_view
         *  	attr * mol_theme \$mol_theme_base
         *  	sub <= head
         *  ```
         **/
        Head(): $mol_view;
        /**
         *  ```
         *  head /
         *  	<= Title
         *  	<= Tools
         *  ```
         **/
        head(): any[];
        /**
         *  ```
         *  Title $mol_button
         *  	sub / <= title
         *  	event_click?val <=> event_top?val
         *  ```
         **/
        Title(): $mol_button;
        /**
         *  ```
         *  event_top?val null
         *  ```
         **/
        event_top(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Tools $mol_view sub <= tools
         *  ```
         **/
        Tools(): $mol_view;
        /**
         *  ```
         *  tools /
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Body $mol_scroll
         *  	scroll_top?val <=> body_scroll_top?val
         *  	sub <= body
         *  ```
         **/
        Body(): $mol_scroll;
        /**
         *  ```
         *  body_scroll_top?val 0
         *  ```
         **/
        body_scroll_top(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  body /
         *  ```
         **/
        body(): any[];
        /**
         *  ```
         *  Foot $mol_view
         *  	attr * mol_theme \$mol_theme_base
         *  	sub <= foot
         *  ```
         **/
        Foot(): $mol_view;
        /**
         *  ```
         *  foot /
         *  ```
         **/
        foot(): any[];
    }
}

declare namespace $.$$ {
    class $mol_page extends $.$mol_page {
        body_scroll_top(next?: number): number;
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
    class $mol_image extends $mol_view {
        /**
         *  ```
         *  dom_name \img
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  field *
         *  	^
         *  	src <= uri
         *  	alt <= title
         *  ```
         **/
        field(): {
            "src": string;
            "alt": string;
        };
        /**
         *  ```
         *  uri \
         *  ```
         **/
        uri(): string;
    }
}

declare namespace $ {
    class $mol_link_iconed extends $mol_link {
        /**
         *  ```
         *  sub /
         *  	<= Icon
         *  	<= content
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Icon $mol_image uri <= icon
         *  ```
         **/
        Icon(): $mol_image;
        /**
         *  ```
         *  icon \
         *  ```
         **/
        icon(): string;
        /**
         *  ```
         *  content / <= title
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  title <= uri
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  host \
         *  ```
         **/
        host(): string;
    }
}

declare namespace $.$$ {
    class $mol_link_iconed extends $.$mol_link_iconed {
        icon(): string;
        host(): string;
        title(): string;
    }
}

declare namespace $ {
    class $mol_bar extends $mol_view {
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
    class $mol_float extends $mol_view {
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
        text_width(text?: any, force?: $mol_atom_force): any;
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
    class $mol_icon extends $mol_svg_root {
        /**
         *  ```
         *  view_box \0 0 24 24
         *  ```
         **/
        view_box(): string;
        /**
         *  ```
         *  minimal_width 16
         *  ```
         **/
        minimal_width(): number;
        /**
         *  ```
         *  minimal_height 16
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  sub / <= Path
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Path $mol_svg_path geometry <= path
         *  ```
         **/
        Path(): $mol_svg_path;
        /**
         *  ```
         *  path \
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_tick extends $mol_icon {
        /**
         *  ```
         *  path \M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_box extends $mol_check {
        /**
         *  ```
         *  Icon $mol_icon_tick
         *  ```
         **/
        Icon(): $mol_icon_tick;
    }
}

declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        /**
         *  ```
         *  path \M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_expand extends $mol_check {
        /**
         *  ```
         *  minimal_height 32
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  Icon $mol_icon_chevron
         *  ```
         **/
        Icon(): $mol_icon_chevron;
        /**
         *  ```
         *  level 0
         *  ```
         **/
        level(): number;
        /**
         *  ```
         *  style *
         *  	^
         *  	paddingLeft <= level_style
         *  ```
         **/
        style(): {
            "paddingLeft": string;
        };
        /**
         *  ```
         *  level_style \0px
         *  ```
         **/
        level_style(): string;
        /**
         *  ```
         *  checked?val <=> expanded?val
         *  ```
         **/
        checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  expanded?val false
         *  ```
         **/
        expanded(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  enabled <= expandable
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  expandable false
         *  ```
         **/
        expandable(): boolean;
    }
}

declare namespace $.$$ {
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}

declare namespace $ {
    class $mol_dimmer extends $mol_view {
        /**
         *  ```
         *  haystack \
         *  ```
         **/
        haystack(): string;
        /**
         *  ```
         *  needle \
         *  ```
         **/
        needle(): string;
        /**
         *  ```
         *  sub <= parts
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  parts /
         *  ```
         **/
        parts(): any[];
        /**
         *  ```
         *  Low!id $mol_view sub / <= string!id
         *  ```
         **/
        Low(id: any): $mol_view;
        /**
         *  ```
         *  string!id \
         *  ```
         **/
        string(id: any): string;
    }
}

declare namespace $.$$ {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
    }
}

declare namespace $ {
    class $mol_grid extends $mol_scroll {
        /**
         *  ```
         *  row_ids /
         *  ```
         **/
        row_ids(): any[];
        /**
         *  ```
         *  row_id!index null
         *  ```
         **/
        row_id(index: any): any;
        /**
         *  ```
         *  col_ids /
         *  ```
         **/
        col_ids(): any[];
        /**
         *  ```
         *  records *
         *  ```
         **/
        records(): {};
        /**
         *  ```
         *  record!id null
         *  ```
         **/
        record(id: any): any;
        /**
         *  ```
         *  hierarchy null
         *  ```
         **/
        hierarchy(): any;
        /**
         *  ```
         *  hierarchy_col \
         *  ```
         **/
        hierarchy_col(): string;
        /**
         *  ```
         *  sub / <= Table
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Table $mol_grid_table
         *  	offset <= gap_top
         *  	sub / <= rows_visible
         *  ```
         **/
        Table(): $$.$mol_grid_table;
        /**
         *  ```
         *  gap_top 0
         *  ```
         **/
        gap_top(): number;
        /**
         *  ```
         *  rows_visible /
         *  ```
         **/
        rows_visible(): any[];
        /**
         *  ```
         *  rows /
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Head $mol_grid_row
         *  	height <= row_height
         *  	cells <= head_cells
         *  ```
         **/
        Head(): $mol_grid_row;
        /**
         *  ```
         *  row_height 40
         *  ```
         **/
        row_height(): number;
        /**
         *  ```
         *  head_cells /
         *  ```
         **/
        head_cells(): any[];
        /**
         *  ```
         *  Row!id $mol_grid_row
         *  	height <= row_height
         *  	cells <= cells!id
         *  ```
         **/
        Row(id: any): $mol_grid_row;
        /**
         *  ```
         *  cells!id /
         *  ```
         **/
        cells(id: any): any[];
        /**
         *  ```
         *  Cell!id $mol_view
         *  ```
         **/
        Cell(id: any): $mol_view;
        /**
         *  ```
         *  cell!id null
         *  ```
         **/
        cell(id: any): any;
        /**
         *  ```
         *  Cell_text!id $mol_grid_cell sub / <= cell_content_text!id
         *  ```
         **/
        Cell_text(id: any): $mol_grid_cell;
        /**
         *  ```
         *  cell_content_text!id <= cell_content!id
         *  ```
         **/
        cell_content_text(id: any): any[];
        /**
         *  ```
         *  cell_content!id /
         *  ```
         **/
        cell_content(id: any): any[];
        /**
         *  ```
         *  Cell_number!id $mol_grid_number sub / <= cell_content_number!id
         *  ```
         **/
        Cell_number(id: any): $mol_grid_number;
        /**
         *  ```
         *  cell_content_number!id <= cell_content!id
         *  ```
         **/
        cell_content_number(id: any): any[];
        /**
         *  ```
         *  Col_head!id $mol_float
         *  	dom_name \th
         *  	sub / <= col_head_content!id
         *  ```
         **/
        Col_head(id: any): $mol_float;
        /**
         *  ```
         *  col_head_content!id /
         *  ```
         **/
        col_head_content(id: any): any[];
        /**
         *  ```
         *  Cell_branch!id $mol_check_expand
         *  	level <= cell_level!id
         *  	label <= cell_content!id
         *  	expanded?val <=> cell_expanded!id?val
         *  ```
         **/
        Cell_branch(id: any): $$.$mol_check_expand;
        /**
         *  ```
         *  cell_level!id 0
         *  ```
         **/
        cell_level(id: any): number;
        /**
         *  ```
         *  cell_expanded!id?val false
         *  ```
         **/
        cell_expanded(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Cell_content!id / <= Cell_dimmer!id
         *  ```
         **/
        Cell_content(id: any): any[];
        /**
         *  ```
         *  Cell_dimmer!id $mol_dimmer
         *  	needle <= needle
         *  	haystack <= cell_value!id
         *  ```
         **/
        Cell_dimmer(id: any): $mol_dimmer;
        /**
         *  ```
         *  needle \
         *  ```
         **/
        needle(): string;
        /**
         *  ```
         *  cell_value!id \
         *  ```
         **/
        cell_value(id: any): string;
    }
}
declare namespace $ {
    class $mol_grid_table extends $mol_view {
        /**
         *  ```
         *  dom_name \table
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  style *
         *  	^
         *  	top <= offset
         *  ```
         **/
        style(): {
            "top": number;
        };
        /**
         *  ```
         *  offset 0
         *  ```
         **/
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_gap extends $mol_view {
        /**
         *  ```
         *  style *
         *  	^
         *  	top <= offset
         *  ```
         **/
        style(): {
            "top": number;
        };
        /**
         *  ```
         *  offset 0
         *  ```
         **/
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_row extends $mol_view {
        /**
         *  ```
         *  dom_name \tr
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  style *
         *  	^
         *  	height <= height
         *  ```
         **/
        style(): {
            "height": number;
        };
        /**
         *  ```
         *  height 40
         *  ```
         **/
        height(): number;
        /**
         *  ```
         *  sub <= cells
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  cells /
         *  ```
         **/
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_grid_cell extends $mol_view {
        /**
         *  ```
         *  dom_name \td
         *  ```
         **/
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_grid_number extends $mol_grid_cell {
    }
}

declare namespace $.$$ {
    interface $mol_grid_node {
        id: string;
        parent: $mol_grid_node;
        sub: $mol_grid_node[];
    }
    class $mol_grid extends $.$mol_grid {
        rows_visible(): any[];
        rows_visible_max(): number;
        view_window(): {
            top: number;
            bottom: number;
            count: number;
        };
        gap_top(): number;
        height(): number;
        content_height(): number;
        head_cells(): $mol_float[];
        col_head_content(colId: string): string[];
        rows(): $mol_grid_row[];
        cells(row_id: string[]): $mol_view[];
        col_type(col_id: string): "number" | "text" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any[];
        records(): any;
        record(id: string): any;
        record_ids(): string[];
        row_id(index: number): string;
        col_ids(): string[];
        hierarchy(): {
            [id: string]: $mol_grid_node;
        };
        row_sub_ids(row: string[]): string[][];
        row_root_id(): string[];
        cell_level(id: {
            row: string[];
        }): number;
        row_ids(): string[][];
        row_expanded(row_id: string[], next?: boolean): boolean;
        row_expanded_default(row_id: string[]): boolean;
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
    class $mol_grid_table extends $.$mol_grid_table {
        context_sub(): $mol_ambient_context;
    }
}

declare namespace $ {
    interface $mol_syntax_token {
        name: string;
        found: string;
        chunks: string[];
    }
    class $mol_syntax {
        constructor(lexems: {
            [name: string]: RegExp;
        });
        'lexems()': {
            [name: string]: RegExp;
        };
        lexems(): {
            [name: string]: RegExp;
        };
        'rules()': {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        rules(): {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        'regExp()': RegExp;
        regExp(): RegExp;
        tokenize(text: string): $mol_syntax_token[];
    }
}

declare namespace $ {
    var $mol_syntax_md_flow: $mol_syntax;
    var $mol_syntax_md_line: $mol_syntax;
    const $mol_syntax_md_code: $mol_syntax;
}

declare namespace $ {
    class $mol_text extends $mol_list {
        /**
         *  ```
         *  uri_base \
         *  ```
         **/
        uri_base(): string;
        /**
         *  ```
         *  text \
         *  ```
         **/
        text(): string;
        /**
         *  ```
         *  tokens /
         *  ```
         **/
        tokens(): any[];
        /**
         *  ```
         *  Quote!id $mol_text text <= quote_text!id
         *  ```
         **/
        Quote(id: any): $mol_text;
        /**
         *  ```
         *  quote_text!id \
         *  ```
         **/
        quote_text(id: any): string;
        /**
         *  ```
         *  Row!id $mol_text_row
         *  	sub <= block_content!id
         *  	type <= block_type!id
         *  ```
         **/
        Row(id: any): $mol_text_row;
        /**
         *  ```
         *  block_content!id /
         *  ```
         **/
        block_content(id: any): any[];
        /**
         *  ```
         *  block_type!id \
         *  ```
         **/
        block_type(id: any): string;
        /**
         *  ```
         *  Span!id $mol_text_span
         *  ```
         **/
        Span(id: any): $mol_text_span;
        /**
         *  ```
         *  Link!id $mol_text_link
         *  ```
         **/
        Link(id: any): $mol_text_link;
        /**
         *  ```
         *  Image!id $mol_text_image
         *  ```
         **/
        Image(id: any): $mol_text_image;
        /**
         *  ```
         *  Header!id $mol_text_header
         *  	level <= header_level!id
         *  	content <= header_content!id
         *  ```
         **/
        Header(id: any): $mol_text_header;
        /**
         *  ```
         *  header_level!id 0
         *  ```
         **/
        header_level(id: any): number;
        /**
         *  ```
         *  header_content!id /
         *  ```
         **/
        header_content(id: any): any[];
        /**
         *  ```
         *  Table!id $mol_grid
         *  	head_cells <= table_head_cells!id
         *  	rows <= table_rows!id
         *  ```
         **/
        Table(id: any): $mol_grid;
        /**
         *  ```
         *  table_head_cells!id /
         *  ```
         **/
        table_head_cells(id: any): any[];
        /**
         *  ```
         *  table_rows!id /
         *  ```
         **/
        table_rows(id: any): any[];
        /**
         *  ```
         *  Table_row!id $mol_grid_row cells <= table_cells!id
         *  ```
         **/
        Table_row(id: any): $mol_grid_row;
        /**
         *  ```
         *  table_cells!id /
         *  ```
         **/
        table_cells(id: any): any[];
        /**
         *  ```
         *  Table_cell!id $mol_grid_cell sub <= table_cell_content!id
         *  ```
         **/
        Table_cell(id: any): $mol_grid_cell;
        /**
         *  ```
         *  table_cell_content!id /
         *  ```
         **/
        table_cell_content(id: any): any[];
        /**
         *  ```
         *  Table_cell_head!id $mol_float sub <= table_cell_content!id
         *  ```
         **/
        Table_cell_head(id: any): $mol_float;
    }
}
declare namespace $ {
    class $mol_text_row extends $mol_view {
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_text_type <= type
         *  ```
         **/
        attr(): {
            "mol_text_type": string;
        };
        /**
         *  ```
         *  type \
         *  ```
         **/
        type(): string;
    }
}
declare namespace $ {
    class $mol_text_header extends $mol_view {
        /**
         *  ```
         *  dom_name \h
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  minimal_height 50
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_text_header_level <= level?val
         *  ```
         **/
        attr(): {
            "mol_text_header_level": any;
        };
        /**
         *  ```
         *  level?val 0
         *  ```
         **/
        level(val?: any, force?: $mol_atom_force): any;
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
    }
}
declare namespace $ {
    class $mol_text_span extends $mol_view {
        /**
         *  ```
         *  dom_name \span
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_text_type <= type?val
         *  ```
         **/
        attr(): {
            "mol_text_type": any;
        };
        /**
         *  ```
         *  type?val \
         *  ```
         **/
        type(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub <= content?val
         *  ```
         **/
        sub(): any;
        /**
         *  ```
         *  content?val /
         *  ```
         **/
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_link extends $mol_link_iconed {
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_text_type <= type?val
         *  ```
         **/
        attr(): {
            "mol_text_type": any;
            "href": string;
            "title": string;
            "target": string;
            "download": string;
            "mol_link_current": boolean; /**
             *  ```
             *  Row!id $mol_text_row
             *  	sub <= block_content!id
             *  	type <= block_type!id
             *  ```
             **/
        };
        /**
         *  ```
         *  type?val \
         *  ```
         **/
        type(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  uri <= link?val
         *  ```
         **/
        uri(): any;
        /**
         *  ```
         *  link?val \
         *  ```
         **/
        link(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  content?val /
         *  ```
         **/
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_image extends $mol_view {
        /**
         *  ```
         *  dom_name \object
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	allowfullscreen true
         *  	mol_text_type <= type?val
         *  	data <= link?val
         *  ```
         **/
        attr(): {
            "allowfullscreen": boolean;
            "mol_text_type": any;
            "data": any;
        };
        /**
         *  ```
         *  type?val \
         *  ```
         **/
        type(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  link?val \
         *  ```
         **/
        link(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub / <= title?val
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  title?val \
         *  ```
         **/
        title(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_text extends $.$mol_text {
        tokens(): $mol_syntax_token[];
        rows(): ($.$mol_grid | $.$mol_text | $mol_text_row | $mol_text_header)[];
        header_level(index: number): number;
        header_content(index: number): ($mol_text_span | $mol_text_link | $mol_text_image)[];
        quote_text(index: number): string;
        block_type(index: number): string;
        cell_contents(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $mol_float[];
        table_cells(id: {
            block: number;
            row: number;
        }): $mol_grid_cell[];
        table_cell_content(id: {
            block: number;
            row: number;
            cell: number;
        }): ($mol_text_span | $mol_text_link | $mol_text_image)[];
        uri_base(): string;
        uri_resolve(uri: string): string;
        text2spans(prefix: string, text: string): ($mol_text_span | $mol_text_link | $mol_text_image)[];
        code2spans(prefix: string, text: string): $mol_text_span[];
        block_content(indexBlock: number): ($mol_view | string)[];
    }
}

declare namespace $ {
    class $mol_textarea extends $mol_view {
        /**
         *  ```
         *  event * keydown?event <=> press?event
         *  ```
         **/
        event(): {
            "keydown": (event?: any) => any;
        };
        /**
         *  ```
         *  press?event null
         *  ```
         **/
        press(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= Edit
         *  	<= View
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Edit $mol_string
         *  	dom_name \textarea
         *  	value?val <=> value?val
         *  	hint <= hint
         *  	debounce 0
         *  	enabled <= enabled
         *  ```
         **/
        Edit(): $mol_string;
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
         *  enabled true
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  View $mol_text text <= text
         *  ```
         **/
        View(): $mol_text;
        /**
         *  ```
         *  text \
         *  ```
         **/
        text(): string;
    }
}

declare namespace $.$$ {
    class $mol_textarea extends $.$mol_textarea {
        text(): any;
        indent_inc(): void;
        indent_dec(): void;
        press(event: KeyboardEvent): void;
    }
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    class $mol_func_sandbox_demo extends $mol_page {
        /**
         *  ```
         *  title \JavaScript Sandbox Demo
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  tools / <= Source
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Source $mol_link_iconed
         *  	uri \https://github.com/eigenmethod/mol/tree/master/func/sandbox
         *  	title \
         *  ```
         **/
        Source(): $$.$mol_link_iconed;
        /**
         *  ```
         *  Sandbox $mol_func_sandbox
         *  ```
         **/
        Sandbox(): $mol_func_sandbox;
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
         *  body /
         *  	<= Input
         *  	<= Result
         *  	<= Snippets
         *  ```
         **/
        body(): any[];
        /**
         *  ```
         *  Input $mol_bar sub /
         *  	<= Code
         *  	<= Run
         *  ```
         **/
        Input(): $mol_bar;
        /**
         *  ```
         *  Code $mol_textarea
         *  	hint \return document.cookie
         *  	value?val <=> script?val
         *  ```
         **/
        Code(): $mol_textarea;
        /**
         *  ```
         *  script?val \
         *  ```
         **/
        script(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Run $mol_button_major
         *  	title \Hack
         *  	click?event <=> run?event
         *  ```
         **/
        Run(): $mol_button_major;
        /**
         *  ```
         *  run?event null
         *  ```
         **/
        run(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Result $mol_view sub / <= result?val
         *  ```
         **/
        Result(): $mol_view;
        /**
         *  ```
         *  result?val \
         *  ```
         **/
        result(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Snippets $mol_list rows <= snippets
         *  ```
         **/
        Snippets(): $mol_list;
        /**
         *  ```
         *  snippets /
         *  ```
         **/
        snippets(): any[];
        /**
         *  ```
         *  Snippet!id $mol_func_sandbox_demo_snippet code <= snippet_code!id
         *  ```
         **/
        Snippet(id: any): $$.$mol_func_sandbox_demo_snippet;
        /**
         *  ```
         *  snippet_code!id \
         *  ```
         **/
        snippet_code(id: any): string;
        /**
         *  ```
         *  snippet_codes /
         *  	\return document.cookie
         *  	\
         *  		\let evil = eval
         *  		\return evil( 'document.cookie' )
         *  	\
         *  		\let Function = ( ()=>{} ).constructor
         *  		\let getCookie = Function( 'return document.cookie' )
         *  		\return getCookie()
         *  	\
         *  		\let NumberProto = (0).__proto__
         *  		\NumberProto.toString = null
         *  ```
         **/
        snippet_codes(): any[];
    }
}
declare namespace $ {
    class $mol_func_sandbox_demo_snippet extends $mol_link {
        /**
         *  ```
         *  arg * script <= code
         *  ```
         **/
        arg(): {
            "script": string;
        };
        /**
         *  ```
         *  code \
         *  ```
         **/
        code(): string;
        /**
         *  ```
         *  sub / <= Text
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Text $mol_text text <= text
         *  ```
         **/
        Text(): $mol_text;
        /**
         *  ```
         *  text <= code
         *  ```
         **/
        text(): string;
    }
}

declare namespace $.$$ {
    class $mol_func_sandbox_demo extends $.$mol_func_sandbox_demo {
        script(next?: string): string;
        result(next?: string): string;
        run(): void;
        keydown(event: KeyboardEvent): void;
        snippets(): $mol_func_sandbox_demo_snippet[];
        snippet_code(index: number): any;
    }
    class $mol_func_sandbox_demo_snippet extends $.$mol_func_sandbox_demo_snippet {
        text(): string;
    }
}
