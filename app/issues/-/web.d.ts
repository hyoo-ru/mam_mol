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
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
    class $mol_http extends $mol_object {
        static resource(uri: string): $mol_http;
        static resource_absolute(uri: string): $mol_http;
        uri(): string;
        method_get(): string;
        method_put(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        headers(): {};
        response_type(): '' | 'text' | 'document' | 'json' | 'blob' | 'arraybuffer';
        'request()': XMLHttpRequest;
        request(): XMLHttpRequest;
        destructor(): void;
        response(next?: any, force?: $mol_atom_force): XMLHttpRequest;
        text(next?: string, force?: $mol_atom_force): string;
        xml(next?: string, force?: $mol_atom_force): Document;
        json<Content>(next?: Content, force?: $mol_atom_force): Content;
    }
}

declare namespace $ {
    function $mol_deprecated<Host, Method extends Function>(message: string): (host: Host, field: string, descr: TypedPropertyDescriptor<Method>) => void;
}

declare namespace $ {
    class $mol_http_resource extends $mol_http {
        static item(uri: string): $mol_http;
    }
    class $mol_http_resource_json {
        static item(uri: string): $mol_http;
    }
}

declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        static base: string;
        path(): string;
        parent(): $mol_file;
        name(): string;
        ext(): string;
        content(next?: string, force?: $mol_atom_force): string;
        resolve(path: string): $mol_file;
        relate(base?: $mol_file): void;
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
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}

declare namespace $ {
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string, force?: $mol_atom_force): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static dict_cut(except: string[]): {
            [key: string]: string;
        };
        static value(key: string, next?: string): string;
        static link(next: {
            [key: string]: string;
        }): string;
        static make_link(next: {
            [key: string]: string;
        }): string;
        static encode(str: string): string;
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
    class $mol_row extends $mol_view {
    }
}
declare namespace $ {
    class $mol_row_sub extends $mol_view {
    }
}

declare namespace $.$$ {
    class $mol_row extends $.$mol_row {
        item_offsets_top(): number[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
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
        /**
         *  ```
         *  dom_name \g
         *  ```
         **/
        dom_name(): string;
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
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  ```
         **/
        viewport(): $mol_vector_2d<$mol_vector_range<number>>;
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
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  ```
         **/
        dimensions_pane(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions $mol_vector_2d /
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  ```
         **/
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
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
         *  	$mol_vector_range /
         *  		0
         *  		0
         *  	$mol_vector_range /
         *  		0
         *  		0
         *  ```
         **/
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  indexes /number
         *  ```
         **/
        indexes(): readonly number[];
        /**
         *  ```
         *  points /readonly[number,number]
         *  ```
         **/
        points(): readonly (readonly [number, number])[];
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
        points(): (readonly [number, number])[];
        series_x(): number[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        color(): string;
        front(): this[];
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
    class $mol_touch extends $mol_plugin {
        /**
         *  ```
         *  start_zoom?val 0
         *  ```
         **/
        start_zoom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  start_distance?val 0
         *  ```
         **/
        start_distance(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  zoom?val 1
         *  ```
         **/
        zoom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  start_pan?val /
         *  	0
         *  	0
         *  ```
         **/
        start_pan(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  pan?val /
         *  	0
         *  	0
         *  ```
         **/
        pan(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  pos?val /
         *  	NaN
         *  	NaN
         *  ```
         **/
        pos(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  start_pos?val null
         *  ```
         **/
        start_pos(val?: any, force?: $mol_atom_force): any;
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
        swipe_right(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_bottom?val null
         *  ```
         **/
        swipe_bottom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_left?val null
         *  ```
         **/
        swipe_left(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_top?val null
         *  ```
         **/
        swipe_top(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_from_right?val null
         *  ```
         **/
        swipe_from_right(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_from_bottom?val null
         *  ```
         **/
        swipe_from_bottom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_from_left?val null
         *  ```
         **/
        swipe_from_left(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_from_top?val null
         *  ```
         **/
        swipe_from_top(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_to_right?val null
         *  ```
         **/
        swipe_to_right(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_to_bottom?val null
         *  ```
         **/
        swipe_to_bottom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_to_left?val null
         *  ```
         **/
        swipe_to_left(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  swipe_to_top?val null
         *  ```
         **/
        swipe_to_top(val?: any, force?: $mol_atom_force): any;
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
        event_start(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_move?event null
         *  ```
         **/
        event_move(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_end?event null
         *  ```
         **/
        event_end(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_leave?event null
         *  ```
         **/
        event_leave(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_wheel?event null
         *  ```
         **/
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
        hue_base(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hue_shift?val 111
         *  ```
         **/
        hue_shift(val?: any, force?: $mol_atom_force): any;
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
         *  	$mol_vector_range /
         *  		<= gap_left
         *  		<= gap_right
         *  	$mol_vector_range /
         *  		<= gap_bottom
         *  		<= gap_top
         *  ```
         **/
        gap(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  shift_limit $mol_vector_2d /
         *  	$mol_vector_range /
         *  		0
         *  		0
         *  	$mol_vector_range /
         *  		0
         *  		0
         *  ```
         **/
        shift_limit(): $mol_vector_2d<$mol_vector_range<number>>;
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
        shift(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scale_limit $mol_vector_2d /
         *  	$mol_vector_range /
         *  		0
         *  		Infinity
         *  	$mol_vector_range /
         *  		0
         *  		Infinity
         *  ```
         **/
        scale_limit(): $mol_vector_2d<$mol_vector_range<number>>;
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
        scale(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scale_x?val 0
         *  ```
         **/
        scale_x(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scale_y?val 0
         *  ```
         **/
        scale_y(val?: any, force?: $mol_atom_force): any;
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
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  ```
         **/
        dimensions_viewport(): $mol_vector_2d<$mol_vector_range<number>>;
        /**
         *  ```
         *  dimensions $mol_vector_2d /
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  	$mol_vector_range /
         *  		Infinity
         *  		-Infinity
         *  ```
         **/
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
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
        cursor_position(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  plugins /
         *  	<= Meter
         *  	<= Touch
         *  ```
         **/
        plugins(): any[];
        width(): any;
        height(): any;
        /**
         *  ```
         *  Meter $mol_meter
         *  	width => width
         *  	height => height
         *  ```
         **/
        Meter(): $mol_meter;
        /**
         *  ```
         *  Touch $mol_touch
         *  	zoom?val <=> scale_x?val
         *  	pan?val <=> shift?val
         *  	pos?val <=> cursor_position?val
         *  ```
         **/
        Touch(): $mol_touch;
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
    class $mol_plot_bar extends $mol_plot_graph {
        /**
         *  ```
         *  style *
         *  	^
         *  	stroke-width <= stroke_width
         *  ```
         **/
        style(): {
            "stroke-width": string;
            "color": string;
        };
        /**
         *  ```
         *  stroke_width \1rem
         *  ```
         **/
        stroke_width(): string;
        /**
         *  ```
         *  sub / <= Curve
         *  ```
         **/
        sub(): any[];
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
    class $mol_plot_bar extends $.$mol_plot_bar {
        indexes(): number[];
        curve(): string;
        stroke_width(): string;
        color(): string;
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
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
        pos(): any[];
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
        pos(): any[];
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
        sub(): any[];
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
        sub(): any[];
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
        Back(): $mol_svg_rect;
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
        Text(): $mol_svg_text;
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
        normalize(val?: any, force?: $mol_atom_force): any;
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
        sub(): any[];
        /**
         *  ```
         *  Background $mol_svg_rect
         *  	pos_x <= background_x
         *  	pos_y <= background_y
         *  	width <= background_width
         *  	height <= background_height
         *  ```
         **/
        Background(): $mol_svg_rect;
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
        labels_formatted(): any[];
        /**
         *  ```
         *  Title $mol_svg_text_box
         *  	pos_x <= title_pos_x
         *  	pos_y <= title_pos_y
         *  	align <= title_align
         *  	text <= title
         *  ```
         **/
        Title(): $mol_svg_text_box;
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
        Label(index: any): $mol_svg_text;
        /**
         *  ```
         *  label_pos!index /
         *  	<= label_pos_x!index
         *  	<= label_pos_y!index
         *  ```
         **/
        label_pos(index: any): any[];
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
        labels_formatted(): $.$mol_svg_text[];
        step(): number;
        snap_to_grid(coord: number): number;
        axis_points(): number[];
        precision(): number;
        label_text(index: number): string;
        font_size(): number;
        back(): $mol_svg_path[];
        front(): any;
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
    class $mol_plot_mark_hor extends $mol_plot_ruler_hor {
        /**
         *  ```
         *  labels /string
         *  ```
         **/
        labels(): readonly string[];
    }
}

declare namespace $.$$ {
    class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
        series_x(): number[];
        labels(): string[];
        visible_indexes(): number[];
        curve(): string;
        label_text(index: number): string;
        labels_formatted(): $.$mol_svg_text[];
        label_pos_x(index: number): string;
        label_pos_y(index: number): string;
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
    function $mol_range2<Item = number>(item?: (index: number) => Item, size?: () => number): Item[];
    class $mol_range2_array<Item> extends Array<Item> {
        concat(...tail: this[]): Item[];
        filter<Context>(check: (val: Item, index: number, list: Item[]) => boolean, context?: Context): Item[];
        forEach<Context>(proceed: (this: Context, val: Item, index: number, list: Item[]) => void, context?: Context): void;
        map<Item_out, Context>(proceed: (this: Context, val: Item, index: number, list: Item[]) => Item_out, context?: Context): Item_out[];
        reduce<Result>(merge: (result: Result, val: Item, index: number, list: Item[]) => Result, result?: Result): Result;
        slice(from?: number, to?: number): Item[];
        some<Context>(check: (this: Context, val: Item, index: number, list: Item[]) => boolean, context?: Context): boolean;
        every<Context = null>(check: (this: Context, val: Item, index: number, list: Item[]) => boolean, context?: Context): boolean;
    }
}

declare namespace $ {
    function $mol_class<Class extends any>(Class: Class): Class;
}

declare namespace $ {
    class $mol_object2 extends Object {
        static $: $mol_ambient_context;
        static readonly $$: $mol_ambient_context;
        $: typeof $mol_object2.$;
        readonly $$: $mol_ambient_context;
        constructor(init?: (obj: any) => void);
        static make<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: Instance) => void): Instance;
        static toString(): any;
        destructor(): void;
        toString(): any;
        toJSON(): any;
    }
}

declare namespace $ {
    class $mol_shared extends $mol_object2 {
        static cache<Value>(key: string, next?: Value): Value;
    }
}

declare namespace $ {
    class $mol_time_base {
        static patterns: any;
        static formatter(pattern: string): any;
        toString(pattern: string): string;
    }
}

declare namespace $ {
    type $mol_time_duration_config = number | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
    };
    class $mol_time_duration extends $mol_time_base {
        constructor(config?: $mol_time_duration_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        summ(config: $mol_time_duration_config): $mol_time_duration;
        mult(numb: number): $mol_time_duration;
        count(config: $mol_time_duration_config): number;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        static patterns: {
            '#Y': (duration: $mol_time_duration) => string;
            '#M': (duration: $mol_time_duration) => string;
            '#D': (duration: $mol_time_duration) => string;
            '#h': (duration: $mol_time_duration) => string;
            '#m': (duration: $mol_time_duration) => string;
            '#s': (duration: $mol_time_duration) => string;
            '+hh': (duration: $mol_time_duration) => string;
            'mm': (duration: $mol_time_duration) => string;
        };
    }
}

declare namespace $ {
    type $mol_time_moment_config = number | Date | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        offset?: $mol_time_duration_config;
    };
    class $mol_time_moment extends $mol_time_base {
        constructor(config?: $mol_time_moment_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly offset: $mol_time_duration;
        readonly weekday: number;
        private _native;
        readonly native: Date;
        private _normal;
        readonly normal: $mol_time_moment;
        merge(config: $mol_time_moment_config): $mol_time_moment;
        shift(config: $mol_time_duration_config): $mol_time_moment;
        toOffset(config: $mol_time_duration_config): $mol_time_moment;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        static patterns: {
            'YYYY': (moment: $mol_time_moment) => string;
            'AD': (moment: $mol_time_moment) => string;
            'YY': (moment: $mol_time_moment) => string;
            'Month': (moment: $mol_time_moment) => string;
            'DD Month': (moment: $mol_time_moment) => string;
            'D Month': (moment: $mol_time_moment) => string;
            'Mon': (moment: $mol_time_moment) => string;
            'DD Mon': (moment: $mol_time_moment) => string;
            'D Mon': (moment: $mol_time_moment) => string;
            '-MM': (moment: $mol_time_moment) => string;
            'MM': (moment: $mol_time_moment) => string;
            'M': (moment: $mol_time_moment) => string;
            'WeekDay': (moment: $mol_time_moment) => string;
            'WD': (moment: $mol_time_moment) => string;
            '-DD': (moment: $mol_time_moment) => string;
            'DD': (moment: $mol_time_moment) => string;
            'D': (moment: $mol_time_moment) => string;
            'Thh': (moment: $mol_time_moment) => string;
            'hh': (moment: $mol_time_moment) => string;
            'h': (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            'mm': (moment: $mol_time_moment) => string;
            'm': (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            'ss': (moment: $mol_time_moment) => string;
            's': (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            'sss': (moment: $mol_time_moment) => string;
            'Z': (moment: $mol_time_moment) => string;
        };
    }
}

declare namespace $ {
    type $mol_time_interval_config = string | {
        start?: $mol_time_moment_config;
        end?: $mol_time_moment_config;
        duration?: $mol_time_duration_config;
    };
    class $mol_time_interval extends $mol_time_base {
        constructor(config: $mol_time_interval_config);
        private _start;
        readonly start: $mol_time_moment;
        private _end;
        readonly end: $mol_time_moment;
        private _duration;
        readonly duration: $mol_time_duration;
        toJSON(): string;
        toString(): string;
    }
}

declare namespace $ {
    class $mol_app_issues extends $mol_page {
        /**
         *  ```
         *  title @ \Time of unresolving issues of GitHub projects
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  tools / <= Sources
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Sources $mol_link_iconed
         *  	uri \https://github.com/eigenmethod/mol/tree/master/app/issues
         *  	content /
         *  ```
         **/
        Sources(): $$.$mol_link_iconed;
        /**
         *  ```
         *  body /
         *  	<= Projects
         *  	<= Chart
         *  	<= Description
         *  ```
         **/
        body(): any[];
        /**
         *  ```
         *  Projects $mol_row sub <= projects
         *  ```
         **/
        Projects(): $mol_row;
        /**
         *  ```
         *  projects /
         *  ```
         **/
        projects(): any[];
        /**
         *  ```
         *  Chart $mol_plot_pane
         *  	gap_left 76
         *  	graphs /
         *  		<= Capacities
         *  		<= Capacities_ruler
         *  		<= Capacities_ruler_hor
         *  ```
         **/
        Chart(): $mol_plot_pane;
        /**
         *  ```
         *  Capacities $mol_plot_bar series_y <= capacities
         *  ```
         **/
        Capacities(): $mol_plot_bar;
        /**
         *  ```
         *  capacities /number
         *  ```
         **/
        capacities(): readonly number[];
        /**
         *  ```
         *  Capacities_ruler $mol_plot_ruler_vert title \Age, days
         *  ```
         **/
        Capacities_ruler(): $mol_plot_ruler_vert;
        /**
         *  ```
         *  Capacities_ruler_hor $mol_plot_mark_hor
         *  	title \Project
         *  	labels <= project_labels
         *  ```
         **/
        Capacities_ruler_hor(): $mol_plot_mark_hor;
        /**
         *  ```
         *  project_labels /string
         *  ```
         **/
        project_labels(): readonly string[];
        /**
         *  ```
         *  Description $mol_view sub / <= description
         *  ```
         **/
        Description(): $mol_view;
        /**
         *  ```
         *  description @ \Sum of ages of all open issues. Lower is better.
         *  ```
         **/
        description(): string;
        /**
         *  ```
         *  Project!index $mol_app_issues_project id?val <=> project_id!index?val
         *  ```
         **/
        Project(index: any): $mol_app_issues_project;
        /**
         *  ```
         *  project_id!index?val \
         *  ```
         **/
        project_id(index: any, val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_issues_project extends $mol_view {
        /**
         *  ```
         *  capacity 0
         *  ```
         **/
        capacity(): number;
        /**
         *  ```
         *  sub /
         *  	<= Input
         *  	<= Capacity
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Input $mol_view sub /
         *  	<= Id
         *  	<= Homepage
         *  ```
         **/
        Input(): $mol_view;
        /**
         *  ```
         *  Id $mol_string
         *  	hint \username/repo
         *  	value?val <=> id?val
         *  	debounce 1000
         *  ```
         **/
        Id(): $mol_string;
        /**
         *  ```
         *  id?val \
         *  ```
         **/
        id(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Homepage $mol_link_iconed
         *  	uri <= homepage
         *  	content /
         *  ```
         **/
        Homepage(): $$.$mol_link_iconed;
        /**
         *  ```
         *  homepage \
         *  ```
         **/
        homepage(): string;
        /**
         *  ```
         *  Capacity $mol_view
         *  	minimal_height 80
         *  	minimal_width 80
         *  	sub / <= capacity_text
         *  ```
         **/
        Capacity(): $mol_view;
        /**
         *  ```
         *  capacity_text \
         *  ```
         **/
        capacity_text(): string;
    }
}

declare namespace $.$$ {
    class $mol_app_issues extends $.$mol_app_issues {
        project_ids(next?: string[]): string[];
        projects(): $.$mol_app_issues_project[];
        project_id(index: number, next?: string): string;
        capacities(): number[];
        project_labels(): any[];
    }
    class $mol_app_issues_project extends $.$mol_app_issues_project {
        uri_project(): string;
        uri_issues(): string;
        project(): {
            open_issues_count: number;
            homepage: string;
        };
        homepage(): string;
        issues_page(page: number): {
            created_at: string;
        }[];
        issues(): {
            created_at: string;
        }[];
        capacity(): number;
        capacity_text(): string;
    }
}
