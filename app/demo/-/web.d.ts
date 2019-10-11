declare namespace $ { }
export = $;

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    function $mol_offline(uri?: string): void;
}

declare namespace $ {
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
    class $mol_card extends $mol_list {
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_card_status_type <= status
         *  ```
         **/
        attr(): {
            "mol_card_status_type": string;
        };
        /**
         *  ```
         *  status \
         *  ```
         **/
        status(): string;
        /**
         *  ```
         *  rows /
         *  	<= Content
         *  	<= Status
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Content $mol_view sub <= content
         *  ```
         **/
        Content(): $mol_view;
        /**
         *  ```
         *  content /
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  Status $mol_view
         *  	minimal_height 30
         *  	sub / <= status_text
         *  ```
         **/
        Status(): $mol_view;
        /**
         *  ```
         *  status_text <= status
         *  ```
         **/
        status_text(): string;
    }
}

declare namespace $.$$ {
    class $mol_card extends $.$mol_card {
        rows(): $mol_view[];
    }
}

declare namespace $ {
    class $mol_tiler extends $mol_view {
        /**
         *  ```
         *  sub / <= items
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  items /
         *  ```
         **/
        items(): any[];
    }
}

declare namespace $.$$ {
    class $mol_tiler extends $.$mol_tiler {
        sub(): $mol_view[];
        groupItems(path: number[]): readonly $mol_view[];
        groupChilds(path: number[]): $mol_view[];
        child(path: number[]): $mol_view;
        group(path: number[]): $mol_view;
        item(path: number[]): $mol_view;
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
    class $mol_icon_attach extends $mol_icon {
        /**
         *  ```
         *  path \M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z
         *  ```
         **/
        path(): string;
    }
}

declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
}

declare namespace $ {
    class $mol_attach extends $mol_card {
        /**
         *  ```
         *  Content $mol_tiler items <= content
         *  ```
         **/
        Content(): $mol_tiler;
        /**
         *  ```
         *  content /
         *  	<= items?val
         *  	<= Add
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  items?val /
         *  ```
         **/
        items(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Add $mol_attach_add file_new?val <=> attach_new?val
         *  ```
         **/
        Add(): $mol_attach_add;
        /**
         *  ```
         *  attach_new?val \
         *  ```
         **/
        attach_new(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Item!id $mol_attach_item title <= attach_title
         *  ```
         **/
        Item(id: any): $$.$mol_attach_item;
        /**
         *  ```
         *  attach_title \
         *  ```
         **/
        attach_title(): string;
    }
}
declare namespace $ {
    class $mol_attach_item extends $mol_link {
        /**
         *  ```
         *  url_thumb?val \
         *  ```
         **/
        url_thumb(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  uri?val <=> url_load?val
         *  ```
         **/
        uri(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  url_load?val \
         *  ```
         **/
        url_load(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  style *
         *  	^
         *  	backgroundImage <= style_bg
         *  ```
         **/
        style(): {
            "backgroundImage": string;
        };
        /**
         *  ```
         *  style_bg \
         *  ```
         **/
        style_bg(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	download <= title
         *  ```
         **/
        attr(): {
            "download": string;
            "href": string;
            "title": string;
            "target": string;
            "mol_link_current": boolean;
        };
        /**
         *  ```
         *  title \
         *  ```
         **/
        title(): string;
    }
}
declare namespace $ {
    class $mol_attach_add extends $mol_button_minor {
        /**
         *  ```
         *  minimal_height 60
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  file_new?val \
         *  ```
         **/
        file_new(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= Icon
         *  	<= Input
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Icon $mol_icon_attach
         *  ```
         **/
        Icon(): $mol_icon_attach;
        /**
         *  ```
         *  Input $mol_attach_add_input
         *  	event_capture?val <=> event_capture?val
         *  	event_picked?val <=> event_picked?val
         *  ```
         **/
        Input(): $mol_attach_add_input;
        /**
         *  ```
         *  event_capture?val null
         *  ```
         **/
        event_capture(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_picked?val null
         *  ```
         **/
        event_picked(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_attach_add_input extends $mol_view {
        /**
         *  ```
         *  dom_name \input
         *  ```
         **/
        dom_name(): string;
        /**
         *  ```
         *  attr *
         *  	^
         *  	type <= type
         *  	accept <= accept
         *  	multiple <= multiple
         *  ```
         **/
        attr(): {
            "type": string;
            "accept": string;
            "multiple": boolean;
        };
        /**
         *  ```
         *  type \file
         *  ```
         **/
        type(): string;
        /**
         *  ```
         *  accept \image/*;capture=camera
         *  ```
         **/
        accept(): string;
        /**
         *  ```
         *  multiple true
         *  ```
         **/
        multiple(): boolean;
        /**
         *  ```
         *  event_click?val <=> event_capture?val
         *  ```
         **/
        event_click(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_capture?val null
         *  ```
         **/
        event_capture(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event *
         *  	^
         *  	change?val <=> event_picked?val
         *  ```
         **/
        event(): {
            "change": (val?: any) => any;
        };
        /**
         *  ```
         *  event_picked?val null
         *  ```
         **/
        event_picked(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_attach extends $.$mol_attach {
        attach_new(next?: string): string;
    }
    class $mol_attach_item extends $.$mol_attach_item {
        style_bg(): string;
    }
    class $mol_attach_add extends $.$mol_attach_add {
        file_new(next?: string): string;
        event_capture(next?: Event): void;
        event_picked(next?: Event): void;
    }
}

declare namespace $ {
    class $mol_demo_small extends $mol_view {
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
    class $mol_attach_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Attach files an show them
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Filled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Filled $mol_attach items?val <=> filled_items?val
         *  ```
         **/
        Filled(): $mol_attach;
        /**
         *  ```
         *  filled_items?val /
         *  	<= Item1
         *  	<= Item2
         *  	<= Item3
         *  ```
         **/
        filled_items(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Item1 $mol_attach_item
         *  	url_thumb \mol/logo/logo.svg
         *  	url_load \logo/logo.svg
         *  ```
         **/
        Item1(): $$.$mol_attach_item;
        /**
         *  ```
         *  Item2 $mol_attach_item
         *  	url_thumb \mol/logo/logo.svg
         *  	url_load \logo/logo.svg
         *  ```
         **/
        Item2(): $$.$mol_attach_item;
        /**
         *  ```
         *  Item3 $mol_attach_item
         *  	url_thumb \mol/logo/logo.svg
         *  	url_load \logo/logo.svg
         *  ```
         **/
        Item3(): $$.$mol_attach_item;
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
    class $mol_bar_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Group of controls as one control
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Two
         *  	<= Three
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Two $mol_bar sub /
         *  	<= Two_mail
         *  	<= Two_submit
         *  ```
         **/
        Two(): $mol_bar;
        /**
         *  ```
         *  Two_mail $mol_string
         *  	hint <= mail_hint
         *  	value?val <=> mail?val
         *  ```
         **/
        Two_mail(): $mol_string;
        /**
         *  ```
         *  mail_hint \E-mail
         *  ```
         **/
        mail_hint(): string;
        /**
         *  ```
         *  mail?val \
         *  ```
         **/
        mail(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Two_submit $mol_button_minor title <= submit_title
         *  ```
         **/
        Two_submit(): $mol_button_minor;
        /**
         *  ```
         *  submit_title \Submit
         *  ```
         **/
        submit_title(): string;
        /**
         *  ```
         *  Three $mol_bar sub /
         *  	<= Three_mail
         *  	<= Three_confirm
         *  	<= Three_submit
         *  ```
         **/
        Three(): $mol_bar;
        /**
         *  ```
         *  Three_mail $mol_string
         *  	hint <= mail_hint
         *  	value?val <=> mail?val
         *  ```
         **/
        Three_mail(): $mol_string;
        /**
         *  ```
         *  Three_confirm $mol_check_box
         *  	title <= confirm_title
         *  	checked?val <=> confirmed?val
         *  ```
         **/
        Three_confirm(): $mol_check_box;
        /**
         *  ```
         *  confirm_title \Confirm
         *  ```
         **/
        confirm_title(): string;
        /**
         *  ```
         *  confirmed?val false
         *  ```
         **/
        confirmed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Three_submit $mol_button_minor title <= submit_title
         *  ```
         **/
        Three_submit(): $mol_button_minor;
    }
}

declare namespace $ {
    class $mol_portion_indicator extends $mol_view {
        /**
         *  ```
         *  style *
         *  	^
         *  	width <= width_style
         *  ```
         **/
        style(): {
            "width": string;
        };
        /**
         *  ```
         *  width_style \0
         *  ```
         **/
        width_style(): string;
    }
}
declare namespace $ {
    class $mol_portion extends $mol_view {
        /**
         *  ```
         *  portion 0
         *  ```
         **/
        portion(): number;
        /**
         *  ```
         *  sub / <= indicator
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  indicator $mol_portion_indicator width_style <= indicator_width_style
         *  ```
         **/
        indicator(): $mol_portion_indicator;
        /**
         *  ```
         *  indicator_width_style \0
         *  ```
         **/
        indicator_width_style(): string;
    }
}

declare namespace $.$$ {
    class $mol_portion extends $.$mol_portion {
        indicator_width_style(): string;
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
    class $mol_float extends $mol_view {
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
    class $mol_icon_sort extends $mol_icon {
        /**
         *  ```
         *  path \M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_sort_asc extends $mol_icon {
        /**
         *  ```
         *  path \M10,11V13H18V11H10M10,5V7H14V5H10M10,17V19H22V17H10M6,7H8.5L5,3.5L1.5,7H4V20H6V7Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_bench extends $mol_grid {
        /**
         *  ```
         *  records <= result
         *  ```
         **/
        records(): {};
        /**
         *  ```
         *  result *
         *  ```
         **/
        result(): {};
        /**
         *  ```
         *  col_sort?val \
         *  ```
         **/
        col_sort(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Col_head!id $mol_bench_head
         *  	event_click?val <=> event_sort_toggle!id?val
         *  	sub <= col_head_content!id
         *  ```
         **/
        Col_head(id: any): $mol_bench_head;
        /**
         *  ```
         *  event_sort_toggle!id?val null
         *  ```
         **/
        event_sort_toggle(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  col_head_content!id /
         *  	<= col_head_label!id
         *  	<= Col_head_sort!id
         *  ```
         **/
        col_head_content(id: any): any[];
        /**
         *  ```
         *  col_head_label!id /
         *  ```
         **/
        col_head_label(id: any): any[];
        /**
         *  ```
         *  Col_head_sort!id $mol_icon_sort_asc
         *  ```
         **/
        Col_head_sort(id: any): $mol_icon_sort_asc;
        /**
         *  ```
         *  cell_content_number!id /
         *  	<= result_value!id
         *  	<= Result_portion!id
         *  ```
         **/
        cell_content_number(id: any): any[];
        /**
         *  ```
         *  result_value!id \
         *  ```
         **/
        result_value(id: any): string;
        /**
         *  ```
         *  Result_portion!id $mol_portion portion <= result_portion!id
         *  ```
         **/
        Result_portion(id: any): $$.$mol_portion;
        /**
         *  ```
         *  result_portion!id 0
         *  ```
         **/
        result_portion(id: any): number;
    }
}
declare namespace $ {
    class $mol_bench_head extends $mol_float {
        /**
         *  ```
         *  horizontal false
         *  ```
         **/
        horizontal(): boolean;
        /**
         *  ```
         *  event *
         *  	^
         *  	click?val <=> event_click?val
         *  ```
         **/
        event(): {
            "click": (val?: any) => any;
        };
        /**
         *  ```
         *  event_click?val null
         *  ```
         **/
        event_click(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  attr *
         *  	^
         *  	title <= hint
         *  ```
         **/
        attr(): {
            "title": string;
        };
        /**
         *  ```
         *  hint @ \Click to sort by this column
         *  ```
         **/
        hint(): string;
    }
}

declare namespace $.$$ {
    class $mol_bench extends $.$mol_bench {
        col_sort(next?: string): string;
        row_ids(): string[][];
        result_value(id: {
            row: string[];
            col: string;
        }): any;
        result_number(id: {
            row: string[];
            col: string;
        }): number;
        result_value_max(col: string): number;
        result_portion(id: {
            row: string[];
            col: string;
        }): number;
        col_head_label(col: string): string[];
        event_sort_toggle(col: string, next?: Event): void;
        col_type(col: string): "number" | "text" | "branch";
        cell_content_number(id: {
            row: string[];
            col: string;
        }): any[];
        col_head_content(col: string): (string[] | $mol_icon_sort_asc)[];
    }
}

declare namespace $ {
    class $mol_bench_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Benchmarking results visualization
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= View
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  View $mol_bench
         *  	col_sort?val <=> col_sort?val
         *  	result <= result
         *  ```
         **/
        View(): $mol_bench;
        /**
         *  ```
         *  col_sort?val \mid
         *  ```
         **/
        col_sort(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  result *
         *  ```
         **/
        result(): {};
    }
}

declare namespace $.$$ {
    class $mol_bench_demo extends $.$mol_bench_demo {
        result(): {
            'bubble': {
                'algorithm': string;
                'min': string;
                'mid': string;
                'max': string;
            };
            'qsort': {
                'algorithm': string;
                'min': string;
                'mid': string;
                'max': string;
            };
        };
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
    class $mol_ghost extends $mol_view {
        /**
         *  ```
         *  Sub $mol_view
         *  ```
         **/
        Sub(): $mol_view;
    }
}

declare namespace $.$$ {
    class $mol_ghost extends $.$mol_ghost {
        dom_node(): Element;
        dom_tree(): Element;
        title(): string;
    }
}

declare namespace $ {
    class $mol_book extends $mol_view {
        /**
         *  ```
         *  sub <= pages_wrapped
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  pages_wrapped /
         *  ```
         **/
        pages_wrapped(): any[];
        /**
         *  ```
         *  pages /
         *  ```
         **/
        pages(): any[];
        /**
         *  ```
         *  plugins /
         *  	<= Meter
         *  	<= Touch
         *  ```
         **/
        plugins(): any[];
        width(): any;
        /**
         *  ```
         *  Meter $mol_meter width => width
         *  ```
         **/
        Meter(): $mol_meter;
        /**
         *  ```
         *  Touch $mol_touch
         *  	swipe_from_left?val <=> event_front_up?val
         *  	swipe_to_left?val <=> event_front_down?val
         *  ```
         **/
        Touch(): $mol_touch;
        /**
         *  ```
         *  event_front_up?val null
         *  ```
         **/
        event_front_up(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_front_down?val null
         *  ```
         **/
        event_front_down(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Page!index $mol_book_page
         *  	Sub <= page!index
         *  	visible <= page_visible!index
         *  ```
         **/
        Page(index: any): $mol_book_page;
        /**
         *  ```
         *  page!index null
         *  ```
         **/
        page(index: any): any;
        /**
         *  ```
         *  page_visible!index true
         *  ```
         **/
        page_visible(index: any): boolean;
        /**
         *  ```
         *  Placeholder $mol_book_placeholder title <= title
         *  ```
         **/
        Placeholder(): $mol_book_placeholder;
    }
}
declare namespace $ {
    class $mol_book_placeholder extends $mol_view {
        /**
         *  ```
         *  minimal_width 400
         *  ```
         **/
        minimal_width(): number;
        /**
         *  ```
         *  attr *
         *  	^
         *  	tabindex null
         *  ```
         **/
        attr(): {
            "tabindex": any;
        };
    }
}
declare namespace $ {
    class $mol_book_page extends $mol_ghost {
        /**
         *  ```
         *  attr *
         *  	^
         *  	tabindex 0
         *  	mol_book_page_focused <= focused
         *  	mol_book_page_visible <= visible
         *  ```
         **/
        attr(): {
            "tabindex": number;
            "mol_book_page_focused": boolean;
            "mol_book_page_visible": boolean;
        };
        /**
         *  ```
         *  visible true
         *  ```
         **/
        visible(): boolean;
    }
}

declare namespace $.$$ {
    class $mol_book extends $.$mol_book {
        pages_extended(): $mol_view[];
        break_point(): number;
        page(index: number): $mol_view;
        page_visible(index: number): boolean;
        pages_wrapped(): $mol_view[];
        title(): string;
        event_front_up(event?: Event): void;
        event_front_down(event?: Event): void;
        minimal_width(): any;
    }
}

declare namespace $ {
    class $mol_demo_large extends $mol_view {
    }
}

declare namespace $.$$ {
    class $mol_demo_large extends $.$mol_demo_large {
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $ {
    class $mol_book_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Adaprive layout for various sizes of screen
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= View
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  View $mol_book
         *  	Placeholder <= Placeholder
         *  	pages /
         *  		<= Addon
         *  		<= Main
         *  ```
         **/
        View(): $mol_book;
        /**
         *  ```
         *  Placeholder $mol_book_placeholder
         *  	minimal_width 200
         *  	sub / \ Placeholder
         *  ```
         **/
        Placeholder(): $mol_book_placeholder;
        /**
         *  ```
         *  Addon $mol_view
         *  	minimal_width 250
         *  	sub / \ Addon
         *  ```
         **/
        Addon(): $mol_view;
        /**
         *  ```
         *  Main $mol_view
         *  	minimal_width 400
         *  	sub / \ Main
         *  ```
         **/
        Main(): $mol_view;
    }
}

declare namespace $ {
    class $mol_button_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \All types of buttons in every states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Major_enabled
         *  	<= Major_disabled
         *  	<= Minor_enabled
         *  	<= Minor_disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Major_enabled $mol_button_major title <= major_label
         *  ```
         **/
        Major_enabled(): $mol_button_major;
        /**
         *  ```
         *  major_label @ \Click me!
         *  ```
         **/
        major_label(): string;
        /**
         *  ```
         *  Major_disabled $mol_button_major
         *  	title <= major_label
         *  	enabled false
         *  ```
         **/
        Major_disabled(): $mol_button_major;
        /**
         *  ```
         *  Minor_enabled $mol_button_minor title <= minor_label
         *  ```
         **/
        Minor_enabled(): $mol_button_minor;
        /**
         *  ```
         *  minor_label @ \Or click me..
         *  ```
         **/
        minor_label(): string;
        /**
         *  ```
         *  Minor_disabled $mol_button_minor
         *  	title <= minor_label
         *  	enabled false
         *  ```
         **/
        Minor_disabled(): $mol_button_minor;
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
    class $mol_calendar extends $mol_list {
        /**
         *  ```
         *  sub /
         *  	<= Title
         *  	<= Weekdays
         *  	<= Weeks
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Title $mol_view
         *  	minimal_height 24
         *  	sub / <= title
         *  ```
         **/
        Title(): $mol_view;
        /**
         *  ```
         *  title \
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  Weekdays $mol_view sub / <= weekdays
         *  ```
         **/
        Weekdays(): $mol_view;
        /**
         *  ```
         *  weekdays /
         *  ```
         **/
        weekdays(): any[];
        /**
         *  ```
         *  Weeks $mol_list rows / <= weeks
         *  ```
         **/
        Weeks(): $mol_list;
        /**
         *  ```
         *  weeks /
         *  ```
         **/
        weeks(): any[];
        /**
         *  ```
         *  Weekday!index $mol_calendar_day
         *  	holiday <= weekend!index
         *  	sub / <= weekday!index
         *  ```
         **/
        Weekday(index: any): $mol_calendar_day;
        /**
         *  ```
         *  weekend!index false
         *  ```
         **/
        weekend(index: any): boolean;
        /**
         *  ```
         *  weekday!index \
         *  ```
         **/
        weekday(index: any): string;
        /**
         *  ```
         *  Week!row $mol_view sub / <= week_days!row
         *  ```
         **/
        Week(row: any): $mol_view;
        /**
         *  ```
         *  week_days!row /
         *  ```
         **/
        week_days(row: any): any[];
        /**
         *  ```
         *  Day!day $mol_calendar_day
         *  	ghost <= day_ghost!day
         *  	holiday <= day_holiday!day
         *  	selected <= day_selected!day
         *  	sub <= day_content!day
         *  ```
         **/
        Day(day: any): $mol_calendar_day;
        /**
         *  ```
         *  day_ghost!day false
         *  ```
         **/
        day_ghost(day: any): boolean;
        /**
         *  ```
         *  day_holiday!day false
         *  ```
         **/
        day_holiday(day: any): boolean;
        /**
         *  ```
         *  day_selected!day false
         *  ```
         **/
        day_selected(day: any): boolean;
        /**
         *  ```
         *  day_content!day / <= day_text!day
         *  ```
         **/
        day_content(day: any): any[];
        /**
         *  ```
         *  day_text!day \
         *  ```
         **/
        day_text(day: any): string;
        /**
         *  ```
         *  month_string \
         *  ```
         **/
        month_string(): string;
        /**
         *  ```
         *  month_moment $mol_time_moment
         *  ```
         **/
        month_moment(): $mol_time_moment;
    }
}
declare namespace $ {
    class $mol_calendar_day extends $mol_view {
        /**
         *  ```
         *  minimal_height 32
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  minimal_width 36
         *  ```
         **/
        minimal_width(): number;
        /**
         *  ```
         *  attr *
         *  	mol_calendar_holiday <= holiday
         *  	mol_calendar_ghost <= ghost
         *  	mol_calendar_selected <= selected
         *  ```
         **/
        attr(): {
            "mol_calendar_holiday": boolean;
            "mol_calendar_ghost": boolean;
            "mol_calendar_selected": boolean;
        };
        /**
         *  ```
         *  holiday false
         *  ```
         **/
        holiday(): boolean;
        /**
         *  ```
         *  ghost false
         *  ```
         **/
        ghost(): boolean;
        /**
         *  ```
         *  selected false
         *  ```
         **/
        selected(): boolean;
    }
}

declare namespace $.$mol {
    class $mol_calendar extends $.$mol_calendar {
        month_moment(): $mol_time_moment;
        title(): string;
        day_first(): $mol_time_moment;
        day_last(): $mol_time_moment;
        day_draw_from(): $mol_time_moment;
        weekdays(): $mol_view[];
        weekday(index: number): string;
        weekend(index: number): boolean;
        weeks_count(): number;
        weeks(): $mol_view[];
        week_days(index: number): $mol_view[];
        day_text(day: string): string;
        day_holiday(day: string): boolean;
        day_ghost(day: string): boolean;
        day_selected(day: string): boolean;
    }
}

declare namespace $ {
    class $mol_calendar_demo_holiday extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Days of month 2018-01 with custom holidays
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  holidays /
         *  	\2018-01-01
         *  	\2018-01-02
         *  	\2018-01-03
         *  	\2018-01-04
         *  	\2018-01-05
         *  	\2018-01-06
         *  	\2018-01-07
         *  	\2018-01-08
         *  	\2018-01-13
         *  	\2018-01-14
         *  	\2018-01-20
         *  	\2018-01-21
         *  	\2018-01-27
         *  	\2018-01-28
         *  ```
         **/
        holidays(): any[];
        /**
         *  ```
         *  sub / <= Calendar
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Calendar $mol_calendar
         *  	month_string <= month
         *  	day_holiday!day <= holiday!day
         *  ```
         **/
        Calendar(): $mol_calendar;
        /**
         *  ```
         *  month \2018-01
         *  ```
         **/
        month(): string;
        /**
         *  ```
         *  holiday!day false
         *  ```
         **/
        holiday(day: any): boolean;
    }
}

declare namespace $.$$ {
    class $mol_calendar_demo_holiday extends $.$mol_calendar_demo_holiday {
        holiday(day: string): boolean;
    }
}

declare namespace $ {
    class $mol_calendar_demo_selection extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Days of month 2018-01 with custom selection
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  interval_config *
         *  	start \2018-01-10
         *  	end \2018-01-20
         *  ```
         **/
        interval_config(): {
            "start": string;
            "end": string;
        };
        /**
         *  ```
         *  sub / <= Calendar
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Calendar $mol_calendar
         *  	month_string <= month
         *  	day_selected!day <= selected!day
         *  ```
         **/
        Calendar(): $mol_calendar;
        /**
         *  ```
         *  month \2018-01
         *  ```
         **/
        month(): string;
        /**
         *  ```
         *  selected!day false
         *  ```
         **/
        selected(day: any): boolean;
    }
}

declare namespace $.$$ {
    class $mol_calendar_demo_selection extends $.$mol_calendar_demo_selection {
        interval(): $mol_time_interval;
        selected(day: string): boolean;
    }
}

declare namespace $ {
    class $mol_calendar_demo_simple extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Days of curret month
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Calendar
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Calendar $mol_calendar month_moment <= today
         *  ```
         **/
        Calendar(): $mol_calendar;
        /**
         *  ```
         *  today $mol_time_moment
         *  ```
         **/
        today(): $mol_time_moment;
    }
}

declare namespace $.$$ {
    class $mol_calendar_demo_simple extends $.$mol_calendar_demo_simple {
        month_name(): string;
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
    class $mol_card_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Cards with optional status
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Simple
         *  	<= Pending
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Simple $mol_card Content $mol_row sub / \Hello world!
         *  ```
         **/
        Simple(): $mol_card;
        /**
         *  ```
         *  Pending $mol_card
         *  	Content $mol_row sub / \Hello pending!
         *  	status \pending
         *  ```
         **/
        Pending(): $mol_card;
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
        graphs: () => readonly $mol_plot_graph[];
        graphs_front(): $mol_plot_graph[];
        graph_legends(): $mol_view[];
        graph_title(index: number): string;
        Graph_sample(index: number): any;
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
         *  	<= Plot
         *  	<= Legend
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Plot $mol_plot_pane
         *  	gap_left <= gap_left
         *  	gap_right <= gap_right
         *  	gap_bottom <= gap_bottom
         *  	gap_top <= gap_top
         *  	graphs <= graphs
         *  	hue_base?val <= hue_base
         *  	hue_shift?val <= hue_shift
         *  ```
         **/
        Plot(): $mol_plot_pane;
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
        /**
         *  ```
         *  Legend $mol_chart_legend graphs <= graphs
         *  ```
         **/
        Legend(): $mol_chart_legend;
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
    class $mol_plot_dot extends $.$mol_plot_dot {
        filled(): Set<number>;
        indexes(): number[];
        curve(): string;
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
    class $mol_plot_mark_cross extends $mol_plot_graph {
        /**
         *  ```
         *  labels /string
         *  ```
         **/
        labels(): readonly string[];
        /**
         *  ```
         *  title_x_gap 4
         *  ```
         **/
        title_x_gap(): number;
        /**
         *  ```
         *  threshold 16
         *  ```
         **/
        threshold(): number;
        /**
         *  ```
         *  graphs /$mol_plot_graph
         *  ```
         **/
        graphs(): readonly $mol_plot_graph[];
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
         *  sub /
         *  	<= Curve
         *  	<= Label_x
         *  	<= Label_y
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
         *  Label_x $mol_svg_text_box
         *  	pos_x <= title_x_pos_x
         *  	pos_y <= title_x_pos_y
         *  	text <= title_x
         *  ```
         **/
        Label_x(): $mol_svg_text_box;
        /**
         *  ```
         *  title_x_pos_x \0
         *  ```
         **/
        title_x_pos_x(): string;
        /**
         *  ```
         *  title_x_pos_y \100%
         *  ```
         **/
        title_x_pos_y(): string;
        /**
         *  ```
         *  title_x \
         *  ```
         **/
        title_x(): string;
        /**
         *  ```
         *  Label_y $mol_svg_text_box
         *  	pos_x <= title_y_pos_x
         *  	pos_y <= title_y_pos_y
         *  	text <= title_y
         *  ```
         **/
        Label_y(): $mol_svg_text_box;
        /**
         *  ```
         *  title_y_pos_x \0
         *  ```
         **/
        title_y_pos_x(): string;
        /**
         *  ```
         *  title_y_pos_y \0
         *  ```
         **/
        title_y_pos_y(): string;
        /**
         *  ```
         *  title_y \
         *  ```
         **/
        title_y(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {
        nearest(): {
            value: $mol_vector_2d<number>;
            scaled: $mol_vector_2d<number>;
            index: number;
        };
        curve(): string;
        title_x(): string;
        title_x_pos_x(): string;
        title_x_pos_y(): string;
        title_y(): string;
        title_y_pos_y(): string;
    }
}

declare namespace $ {
    class $mol_chart_demo_simple extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Simple chart with hadcoded series
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Chart
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Chart $mol_chart graphs /
         *  	<= Plan
         *  	<= Fact
         *  	<= Vert_ruler
         *  	<= Marker_hor
         *  	<= Marker_cross
         *  ```
         **/
        Chart(): $mol_chart;
        /**
         *  ```
         *  Plan $mol_plot_bar
         *  	title <= plan_title
         *  	series_y <= plan
         *  ```
         **/
        Plan(): $mol_plot_bar;
        /**
         *  ```
         *  plan_title @ \Plan
         *  ```
         **/
        plan_title(): string;
        /**
         *  ```
         *  plan /
         *  	10
         *  	20
         *  	30
         *  	40
         *  ```
         **/
        plan(): any[];
        /**
         *  ```
         *  Fact $mol_plot_group
         *  	title <= fact_title
         *  	series_y <= facts
         *  	graphs /
         *  		<= Fact_line
         *  		<= Fact_dots
         *  ```
         **/
        Fact(): $mol_plot_group;
        /**
         *  ```
         *  fact_title @ \Fact
         *  ```
         **/
        fact_title(): string;
        /**
         *  ```
         *  facts /
         *  	5
         *  	10
         *  	30
         *  ```
         **/
        facts(): any[];
        /**
         *  ```
         *  Fact_line $mol_plot_line
         *  ```
         **/
        Fact_line(): $mol_plot_line;
        /**
         *  ```
         *  Fact_dots $mol_plot_dot
         *  ```
         **/
        Fact_dots(): $mol_plot_dot;
        /**
         *  ```
         *  Vert_ruler $mol_plot_ruler_vert title <= vert_title
         *  ```
         **/
        Vert_ruler(): $mol_plot_ruler_vert;
        /**
         *  ```
         *  vert_title @ \pcs
         *  ```
         **/
        vert_title(): string;
        /**
         *  ```
         *  Marker_hor $mol_plot_mark_hor
         *  	title <= marker_hor_title
         *  	labels <= months
         *  ```
         **/
        Marker_hor(): $mol_plot_mark_hor;
        /**
         *  ```
         *  marker_hor_title @ \Months
         *  ```
         **/
        marker_hor_title(): string;
        /**
         *  ```
         *  months /string
         *  	\January
         *  	\February
         *  	\March
         *  	\April
         *  ```
         **/
        months(): readonly string[];
        /**
         *  ```
         *  Marker_cross $mol_plot_mark_cross
         *  	labels <= months
         *  	graphs /
         *  		<= Plan
         *  		<= Fact_dots
         *  ```
         **/
        Marker_cross(): $mol_plot_mark_cross;
    }
}

declare namespace $ {
    class $mol_plot_fill extends $mol_plot_graph {
        /**
         *  ```
         *  points /readonly[number,number]
         *  ```
         **/
        points(): readonly (readonly [number, number])[];
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
    class $mol_plot_fill extends $.$mol_plot_fill {
        indexes(): number[];
        curve(): string;
        back(): this[];
    }
}

declare namespace $ {
    class $mol_chart_demo_styles extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Chart with various styles of graphs.
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  samples_count 15
         *  ```
         **/
        samples_count(): number;
        /**
         *  ```
         *  sub / <= Chart
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Chart $mol_chart graphs <= graphs
         *  ```
         **/
        Chart(): $mol_chart;
        /**
         *  ```
         *  graphs /
         *  	<= Receipts
         *  	<= Receipts_confirmed
         *  	<= Maximum
         *  	<= Waste
         *  	<= Purchases
         *  	<= Taxes
         *  	<= Energy
         *  	<= Day
         *  ```
         **/
        graphs(): any[];
        /**
         *  ```
         *  Receipts $mol_plot_bar
         *  	title <= receipts_title
         *  	series_x <= series_x
         *  	series_y <= series_2_y
         *  ```
         **/
        Receipts(): $mol_plot_bar;
        /**
         *  ```
         *  receipts_title @ \Receipts
         *  ```
         **/
        receipts_title(): string;
        /**
         *  ```
         *  series_x /
         *  ```
         **/
        series_x(): any[];
        /**
         *  ```
         *  series_2_y /
         *  ```
         **/
        series_2_y(): any[];
        /**
         *  ```
         *  Receipts_confirmed $mol_plot_bar
         *  	title <= receipts_confirmed_title
         *  	series_x <= series_x
         *  	series_y <= series_3_y
         *  ```
         **/
        Receipts_confirmed(): $mol_plot_bar;
        /**
         *  ```
         *  receipts_confirmed_title @ \Confirmed receipts
         *  ```
         **/
        receipts_confirmed_title(): string;
        /**
         *  ```
         *  series_3_y /
         *  ```
         **/
        series_3_y(): any[];
        /**
         *  ```
         *  Maximum $mol_plot_dot
         *  	title <= maximum_title
         *  	series_x <= series_x
         *  	series_y <= series_1_y
         *  ```
         **/
        Maximum(): $mol_plot_dot;
        /**
         *  ```
         *  maximum_title @ \Maximum
         *  ```
         **/
        maximum_title(): string;
        /**
         *  ```
         *  series_1_y /
         *  ```
         **/
        series_1_y(): any[];
        /**
         *  ```
         *  Waste $mol_plot_line
         *  	type \dashed
         *  	title <= waste_title
         *  	series_x <= series_x
         *  	series_y <= series_4_y
         *  ```
         **/
        Waste(): $mol_plot_line;
        /**
         *  ```
         *  waste_title @ \Waste
         *  ```
         **/
        waste_title(): string;
        /**
         *  ```
         *  series_4_y /
         *  ```
         **/
        series_4_y(): any[];
        /**
         *  ```
         *  Purchases $mol_plot_group
         *  	title <= purchases_title
         *  	series_x <= series_x
         *  	series_y <= series_5_y
         *  	graphs /
         *  		<= Purchases_fill
         *  		<= Purchases_line
         *  		<= Purchases_dots
         *  ```
         **/
        Purchases(): $mol_plot_group;
        /**
         *  ```
         *  purchases_title @ \Purchases
         *  ```
         **/
        purchases_title(): string;
        /**
         *  ```
         *  series_5_y /
         *  ```
         **/
        series_5_y(): any[];
        /**
         *  ```
         *  Purchases_fill $mol_plot_fill
         *  ```
         **/
        Purchases_fill(): $mol_plot_fill;
        /**
         *  ```
         *  Purchases_line $mol_plot_line
         *  ```
         **/
        Purchases_line(): $mol_plot_line;
        /**
         *  ```
         *  Purchases_dots $mol_plot_dot
         *  ```
         **/
        Purchases_dots(): $mol_plot_dot;
        /**
         *  ```
         *  Taxes $mol_plot_group
         *  	title <= taxes_title
         *  	series_x <= series_x
         *  	series_y <= series_6_y
         *  	graphs /
         *  		<= Taxes_fill
         *  		<= Taxes_line
         *  		<= Taxes_dots
         *  ```
         **/
        Taxes(): $mol_plot_group;
        /**
         *  ```
         *  taxes_title @ \Taxes
         *  ```
         **/
        taxes_title(): string;
        /**
         *  ```
         *  series_6_y /
         *  ```
         **/
        series_6_y(): any[];
        /**
         *  ```
         *  Taxes_fill $mol_plot_fill
         *  ```
         **/
        Taxes_fill(): $mol_plot_fill;
        /**
         *  ```
         *  Taxes_line $mol_plot_line type \dashed
         *  ```
         **/
        Taxes_line(): $mol_plot_line;
        /**
         *  ```
         *  Taxes_dots $mol_plot_dot
         *  ```
         **/
        Taxes_dots(): $mol_plot_dot;
        /**
         *  ```
         *  Energy $mol_plot_ruler_vert title <= energy_title
         *  ```
         **/
        Energy(): $mol_plot_ruler_vert;
        /**
         *  ```
         *  energy_title @ \kJ
         *  ```
         **/
        energy_title(): string;
        /**
         *  ```
         *  Day $mol_plot_mark_hor
         *  	title <= day_title
         *  	series_x <= series_x
         *  ```
         **/
        Day(): $mol_plot_mark_hor;
        /**
         *  ```
         *  day_title @ \Day
         *  ```
         **/
        day_title(): string;
    }
}

declare namespace $.$$ {
    class $mol_chart_demo_styles extends $.$mol_chart_demo_styles {
        limit(): readonly [10, number];
        series_x(): number[];
        series_y(): number[];
        series_1_y(): number[];
        series_2_y(): number[];
        series_3_y(): number[];
        series_4_y(): number[];
        series_5_y(): number[];
        series_6_y(): number[];
    }
}

declare namespace $ {
    class $mol_chart_demo_forces extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Fake wheel forces
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  samples_count 10000
         *  ```
         **/
        samples_count(): number;
        /**
         *  ```
         *  points_max 600
         *  ```
         **/
        points_max(): number;
        /**
         *  ```
         *  sub / <= Chart
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Chart $mol_chart graphs /
         *  	<= Forces_left
         *  	<= Forces_right
         *  	<= Vert_ruler
         *  	<= Hor_ruler
         *  	<= Cross
         *  ```
         **/
        Chart(): $mol_chart;
        /**
         *  ```
         *  Forces_left $mol_plot_dot
         *  	title <= forces_left_title
         *  	series_x <= forces_left_x
         *  	series_y <= forces_left_y
         *  	points_max <= points_max
         *  ```
         **/
        Forces_left(): $mol_plot_dot;
        /**
         *  ```
         *  forces_left_title @ \Left wheel
         *  ```
         **/
        forces_left_title(): string;
        /**
         *  ```
         *  forces_left_x /number
         *  ```
         **/
        forces_left_x(): readonly number[];
        /**
         *  ```
         *  forces_left_y /number
         *  ```
         **/
        forces_left_y(): readonly number[];
        /**
         *  ```
         *  Forces_right $mol_plot_dot
         *  	title <= forces_right_title
         *  	series_x <= forces_right_x
         *  	series_y <= forces_right_y
         *  	points_max <= points_max
         *  ```
         **/
        Forces_right(): $mol_plot_dot;
        /**
         *  ```
         *  forces_right_title @ \Right wheel
         *  ```
         **/
        forces_right_title(): string;
        /**
         *  ```
         *  forces_right_x /number
         *  ```
         **/
        forces_right_x(): readonly number[];
        /**
         *  ```
         *  forces_right_y /number
         *  ```
         **/
        forces_right_y(): readonly number[];
        /**
         *  ```
         *  Vert_ruler $mol_plot_ruler_vert title <= vert_title
         *  ```
         **/
        Vert_ruler(): $mol_plot_ruler_vert;
        /**
         *  ```
         *  vert_title @ \kN
         *  ```
         **/
        vert_title(): string;
        /**
         *  ```
         *  Hor_ruler $mol_plot_ruler_hor
         *  	title <= hor_title
         *  	series_x <= forces_left_x
         *  ```
         **/
        Hor_ruler(): $mol_plot_ruler_hor;
        /**
         *  ```
         *  hor_title @ \cm
         *  ```
         **/
        hor_title(): string;
        /**
         *  ```
         *  Cross $mol_plot_mark_cross graphs /
         *  	<= Forces_left
         *  	<= Forces_right
         *  ```
         **/
        Cross(): $mol_plot_mark_cross;
    }
}

declare namespace $.$$ {
    class $mol_chart_demo_forces extends $.$mol_chart_demo_forces {
        generate_forces(): readonly [readonly number[], readonly number[]];
        forces_left(): readonly [readonly number[], readonly number[]];
        forces_right(): readonly [readonly number[], readonly number[]];
        forces_left_x(): readonly number[];
        forces_left_y(): readonly number[];
        forces_right_x(): readonly number[];
        forces_right_y(): readonly number[];
    }
}

declare namespace $ {
    class $mol_check_box_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Checkboxes in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Labeled_base
         *  	<= Labeled_checked
         *  	<= Labeled_disabled
         *  	<= Alone_base
         *  	<= Alone_checked
         *  	<= Alone_disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Labeled_base $mol_check_box
         *  	checked?val <=> base_checked?val
         *  	title <= c1Label
         *  ```
         **/
        Labeled_base(): $mol_check_box;
        /**
         *  ```
         *  base_checked?val false
         *  ```
         **/
        base_checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  c1Label @ \Base
         *  ```
         **/
        c1Label(): string;
        /**
         *  ```
         *  Labeled_checked $mol_check_box
         *  	title <= c2Label
         *  	checked?val <=> checked_checked?val
         *  ```
         **/
        Labeled_checked(): $mol_check_box;
        /**
         *  ```
         *  c2Label @ \Checked
         *  ```
         **/
        c2Label(): string;
        /**
         *  ```
         *  checked_checked?val true
         *  ```
         **/
        checked_checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Labeled_disabled $mol_check_box
         *  	title <= c6Label
         *  	checked true
         *  	enabled false
         *  ```
         **/
        Labeled_disabled(): $mol_check_box;
        /**
         *  ```
         *  c6Label @ \Disabled
         *  ```
         **/
        c6Label(): string;
        /**
         *  ```
         *  Alone_base $mol_check_box checked?val <=> base_checked?val
         *  ```
         **/
        Alone_base(): $mol_check_box;
        /**
         *  ```
         *  Alone_checked $mol_check_box checked?val <=> checked_checked?val
         *  ```
         **/
        Alone_checked(): $mol_check_box;
        /**
         *  ```
         *  Alone_disabled $mol_check_box
         *  	checked true
         *  	enabled false
         *  ```
         **/
        Alone_disabled(): $mol_check_box;
    }
}

declare namespace $ {
    class $mol_check_expand_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Checkbox-expand in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Labeled_base
         *  	<= Labeled_expanded
         *  	<= Empty_base
         *  	<= Empty_expanded
         *  	<= Disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Labeled_base $mol_check_expand
         *  	checked?val <=> base_expanded?val
         *  	title <= c1Label
         *  ```
         **/
        Labeled_base(): $$.$mol_check_expand;
        /**
         *  ```
         *  base_expanded?val false
         *  ```
         **/
        base_expanded(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  c1Label @ \Base
         *  ```
         **/
        c1Label(): string;
        /**
         *  ```
         *  Labeled_expanded $mol_check_expand
         *  	title <= c2Label
         *  	checked?val <=> expanded_expanded?val
         *  ```
         **/
        Labeled_expanded(): $$.$mol_check_expand;
        /**
         *  ```
         *  c2Label @ \Expanded
         *  ```
         **/
        c2Label(): string;
        /**
         *  ```
         *  expanded_expanded?val true
         *  ```
         **/
        expanded_expanded(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Empty_base $mol_check_expand checked?val <=> base_expanded?val
         *  ```
         **/
        Empty_base(): $$.$mol_check_expand;
        /**
         *  ```
         *  Empty_expanded $mol_check_expand checked?val <=> expanded_expanded?val
         *  ```
         **/
        Empty_expanded(): $$.$mol_check_expand;
        /**
         *  ```
         *  Disabled $mol_check_expand
         *  	title <= c5Label
         *  	disabled true
         *  ```
         **/
        Disabled(): $$.$mol_check_expand;
        /**
         *  ```
         *  c5Label @ \Non expandable
         *  ```
         **/
        c5Label(): string;
    }
}

declare namespace $ {
    class $mol_icon_check extends $mol_icon {
        /**
         *  ```
         *  path \M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_check_all extends $mol_icon {
        /**
         *  ```
         *  path \M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_group extends $mol_check_box {
        /**
         *  ```
         *  checks /$mol_check
         *  ```
         **/
        checks(): readonly $mol_check[];
        /**
         *  ```
         *  full true
         *  ```
         **/
        full(): boolean;
    }
}

declare namespace $.$$ {
    class $mol_check_group extends $.$mol_check_group {
        checked(next?: boolean): boolean;
        full(): boolean;
        Icon(): $mol_icon_tick | $mol_icon_check_all;
    }
}

declare namespace $ {
    class $mol_check_group_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Group of checkboxes
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= All
         *  	<= Partial
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  All $mol_check_group
         *  	title \SPECIAL
         *  	checks /
         *  		<= Strength
         *  		<= Perception
         *  		<= Endurance
         *  		<= Charisma
         *  		<= Intelligence
         *  		<= Agility
         *  		<= Luck
         *  ```
         **/
        All(): $mol_check_group;
        /**
         *  ```
         *  Partial $mol_list rows /
         *  	<= Strength
         *  	<= Perception
         *  	<= Endurance
         *  	<= Charisma
         *  	<= Intelligence
         *  	<= Agility
         *  	<= Luck
         *  ```
         **/
        Partial(): $mol_list;
        /**
         *  ```
         *  Strength $mol_check_box
         *  	title <= strength_title
         *  	checked?val <=> strength?val
         *  ```
         **/
        Strength(): $mol_check_box;
        /**
         *  ```
         *  strength_title \Strength
         *  ```
         **/
        strength_title(): string;
        /**
         *  ```
         *  strength?val false
         *  ```
         **/
        strength(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Perception $mol_check_box
         *  	title <= perception_title
         *  	checked?val <=> perception?val
         *  ```
         **/
        Perception(): $mol_check_box;
        /**
         *  ```
         *  perception_title \Perception
         *  ```
         **/
        perception_title(): string;
        /**
         *  ```
         *  perception?val true
         *  ```
         **/
        perception(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Endurance $mol_check_box
         *  	title <= endurance_title
         *  	checked?val <=> endurance?val
         *  ```
         **/
        Endurance(): $mol_check_box;
        /**
         *  ```
         *  endurance_title \Endurance
         *  ```
         **/
        endurance_title(): string;
        /**
         *  ```
         *  endurance?val false
         *  ```
         **/
        endurance(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Charisma $mol_check_box
         *  	title <= charisma_title
         *  	checked?val <=> charisma?val
         *  ```
         **/
        Charisma(): $mol_check_box;
        /**
         *  ```
         *  charisma_title \Charisma
         *  ```
         **/
        charisma_title(): string;
        /**
         *  ```
         *  charisma?val false
         *  ```
         **/
        charisma(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Intelligence $mol_check_box
         *  	title <= intelligence_title
         *  	checked?val <=> intelligence?val
         *  ```
         **/
        Intelligence(): $mol_check_box;
        /**
         *  ```
         *  intelligence_title \Intelligence
         *  ```
         **/
        intelligence_title(): string;
        /**
         *  ```
         *  intelligence?val true
         *  ```
         **/
        intelligence(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Agility $mol_check_box
         *  	title <= agility_title
         *  	checked?val <=> agility?val
         *  ```
         **/
        Agility(): $mol_check_box;
        /**
         *  ```
         *  agility_title \Agility
         *  ```
         **/
        agility_title(): string;
        /**
         *  ```
         *  agility?val true
         *  ```
         **/
        agility(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Luck $mol_check_box
         *  	title <= luck_title
         *  	checked?val <=> luck?val
         *  ```
         **/
        Luck(): $mol_check_box;
        /**
         *  ```
         *  luck_title \Luck
         *  ```
         **/
        luck_title(): string;
        /**
         *  ```
         *  luck?val true
         *  ```
         **/
        luck(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_check_icon extends $mol_check {
    }
}

declare namespace $ {
    class $mol_icon_microphone extends $mol_icon {
        /**
         *  ```
         *  path \M12,2C13.66,2 15,3.34 15,5V11C15,12.66 13.66,14 12,14C10.34,14 9,12.66 9,11V5C9,3.34 10.34,2 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7C7,13.76 9.24,16 12,16C14.76,16 17,13.76 17,11H19Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_icon_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Iconic checkboxes in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Base
         *  	<= Checked
         *  	<= Disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Base $mol_check_icon
         *  	Icon <= Base_icon
         *  	checked?val <=> base_checked?val
         *  ```
         **/
        Base(): $mol_check_icon;
        /**
         *  ```
         *  Base_icon $mol_icon_microphone
         *  ```
         **/
        Base_icon(): $mol_icon_microphone;
        /**
         *  ```
         *  base_checked?val false
         *  ```
         **/
        base_checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Checked $mol_check_icon
         *  	Icon <= Checked_icon
         *  	checked?val <=> checked_checked?val
         *  ```
         **/
        Checked(): $mol_check_icon;
        /**
         *  ```
         *  Checked_icon $mol_icon_microphone
         *  ```
         **/
        Checked_icon(): $mol_icon_microphone;
        /**
         *  ```
         *  checked_checked?val true
         *  ```
         **/
        checked_checked(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Disabled $mol_check_box
         *  	Icon <= Disabled_icon
         *  	checked true
         *  	enabled false
         *  ```
         **/
        Disabled(): $mol_check_box;
        /**
         *  ```
         *  Disabled_icon $mol_icon_microphone
         *  ```
         **/
        Disabled_icon(): $mol_icon_microphone;
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
    class $mol_nav extends $mol_plugin {
        /**
         *  ```
         *  cycle?val false
         *  ```
         **/
        cycle(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  mod_ctrl false
         *  ```
         **/
        mod_ctrl(): boolean;
        /**
         *  ```
         *  mod_shift false
         *  ```
         **/
        mod_shift(): boolean;
        /**
         *  ```
         *  mod_alt false
         *  ```
         **/
        mod_alt(): boolean;
        /**
         *  ```
         *  keys_x?val /
         *  ```
         **/
        keys_x(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  keys_y?val /
         *  ```
         **/
        keys_y(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  current_x?val \
         *  ```
         **/
        current_x(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  current_y?val \
         *  ```
         **/
        current_y(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_up?event null
         *  ```
         **/
        event_up(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_down?event null
         *  ```
         **/
        event_down(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_left?event null
         *  ```
         **/
        event_left(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event_right?event null
         *  ```
         **/
        event_right(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  event *
         *  	^
         *  	keydown?event <=> event_key?event
         *  ```
         **/
        event(): {
            "keydown": (event?: any) => any;
        };
        /**
         *  ```
         *  event_key?event null
         *  ```
         **/
        event_key(event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): void;
        event_up(event?: KeyboardEvent): void;
        event_down(event?: KeyboardEvent): void;
        event_left(event?: KeyboardEvent): void;
        event_right(event?: KeyboardEvent): void;
        index_y(): any;
        index_x(): any;
    }
}

declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => string[]): (variant: Variant) => boolean;
}

declare namespace $ {
    class $mol_select extends $mol_pop {
        /**
         *  ```
         *  dictionary *
         *  ```
         **/
        dictionary(): {};
        /**
         *  ```
         *  options /
         *  ```
         **/
        options(): any[];
        /**
         *  ```
         *  value?val \
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  Option_row!id $mol_button_minor
         *  	event_click?event <=> event_select!id?event
         *  	sub <= option_content!id
         *  ```
         **/
        Option_row(id: any): $mol_button_minor;
        /**
         *  ```
         *  event_select!id?event null
         *  ```
         **/
        event_select(id: any, event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  option_content!id / <= Option_label!id
         *  ```
         **/
        option_content(id: any): any[];
        /**
         *  ```
         *  Option_label!id $mol_dimmer
         *  	minimal_height 40
         *  	haystack <= option_label!id
         *  	needle <= filter_pattern?val
         *  ```
         **/
        Option_label(id: any): $mol_dimmer;
        /**
         *  ```
         *  option_label!id \
         *  ```
         **/
        option_label(id: any): string;
        /**
         *  ```
         *  filter_pattern?val \
         *  ```
         **/
        filter_pattern(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  No_options $mol_view sub / <= no_options_message
         *  ```
         **/
        No_options(): $mol_view;
        /**
         *  ```
         *  no_options_message @ \No options
         *  ```
         **/
        no_options_message(): string;
        /**
         *  ```
         *  plugins / <= Nav
         *  ```
         **/
        plugins(): any[];
        /**
         *  ```
         *  Nav $mol_nav
         *  	keys_y <= nav_components
         *  	current_y?component <=> option_focused?component
         *  	cycle?val <=> nav_cycle?val
         *  ```
         **/
        Nav(): $mol_nav;
        /**
         *  ```
         *  nav_components /
         *  	<= Filter
         *  	<= option_rows
         *  ```
         **/
        nav_components(): any[];
        /**
         *  ```
         *  option_focused?component null
         *  ```
         **/
        option_focused(component?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  nav_cycle?val true
         *  ```
         **/
        nav_cycle(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  showed?val <=> options_showed?val
         *  ```
         **/
        showed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  options_showed?val false
         *  ```
         **/
        options_showed(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Anchor <= Trigger
         *  ```
         **/
        Anchor(): $mol_button_minor;
        /**
         *  ```
         *  Trigger $mol_button_minor
         *  	click?event <=> open?event
         *  	sub <= trigger_content
         *  ```
         **/
        Trigger(): $mol_button_minor;
        /**
         *  ```
         *  open?event null
         *  ```
         **/
        open(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  trigger_content /
         *  	<= option_content_current
         *  	<= Filter
         *  	<= Trigger_icon
         *  ```
         **/
        trigger_content(): any[];
        /**
         *  ```
         *  option_content_current /
         *  ```
         **/
        option_content_current(): any[];
        /**
         *  ```
         *  Filter $mol_string
         *  	value?val <=> filter_pattern?val
         *  	hint <= filter_hint
         *  	debounce <= debounce
         *  ```
         **/
        Filter(): $mol_string;
        /**
         *  ```
         *  filter_hint <= hint
         *  ```
         **/
        filter_hint(): string;
        /**
         *  ```
         *  hint @ \Search..
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  debounce 200
         *  ```
         **/
        debounce(): number;
        /**
         *  ```
         *  Trigger_icon $mol_icon_chevron
         *  ```
         **/
        Trigger_icon(): $mol_icon_chevron;
        /**
         *  ```
         *  bubble_content / <= Menu
         *  ```
         **/
        bubble_content(): any[];
        /**
         *  ```
         *  Menu $mol_list rows <= menu_content
         *  ```
         **/
        Menu(): $mol_list;
        /**
         *  ```
         *  menu_content /
         *  	<= Filter
         *  	<= option_rows
         *  ```
         **/
        menu_content(): any[];
        /**
         *  ```
         *  option_rows /
         *  ```
         **/
        option_rows(): any[];
    }
}

declare namespace $.$$ {
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        open(): void;
        options_showed(next?: boolean): boolean;
        options(): string[];
        options_filtered(): string[];
        option_label(id: string): any;
        option_rows(): $mol_view[] | $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $mol_button_minor;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($mol_view | $mol_button_minor)[];
        option_content_current(): any[];
        trigger_content(): any[];
        menu_content(): ($mol_view | $mol_button_minor)[];
    }
}

declare namespace $ {
    class $mol_icon_cross extends $mol_icon {
        /**
         *  ```
         *  path \M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_search extends $mol_bar {
        /**
         *  ```
         *  query?val \
         *  ```
         **/
        query(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= Suggest
         *  	<= Clear
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Suggest $mol_select
         *  	value?val <=> suggest_selected?val
         *  	filter_pattern?val <=> suggest_selected?val
         *  	hint <= hint
         *  	filter_pattern?val <=> query?val
         *  	options_showed <= suggests_showed
         *  	options <= suggests
         *  	Trigger_icon null
         *  	debounce <= debounce
         *  ```
         **/
        Suggest(): $mol_select;
        /**
         *  ```
         *  suggest_selected?val \
         *  ```
         **/
        suggest_selected(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint @ \Search...
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  suggests_showed false
         *  ```
         **/
        suggests_showed(): boolean;
        /**
         *  ```
         *  suggests /
         *  ```
         **/
        suggests(): any[];
        /**
         *  ```
         *  debounce 200
         *  ```
         **/
        debounce(): number;
        /**
         *  ```
         *  Clear $mol_button_minor
         *  	sub / <= Clear_icon
         *  	event_click?val <=> event_clear?val
         *  ```
         **/
        Clear(): $mol_button_minor;
        /**
         *  ```
         *  Clear_icon $mol_icon_cross
         *  ```
         **/
        Clear_icon(): $mol_icon_cross;
        /**
         *  ```
         *  event_clear?val null
         *  ```
         **/
        event_clear(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_search extends $.$mol_search {
        suggests_showed(): boolean;
        suggest_selected(next?: string): void;
        sub(): ($mol_button_minor | $.$mol_select)[];
        event_clear(event?: Event): void;
    }
}

declare namespace $ {
    class $mol_code extends $mol_view {
        /**
         *  ```
         *  sub /
         *  	<= Manual
         *  	<= Scan
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Manual $mol_search
         *  	query?val <=> value?val
         *  	hint <= hint
         *  	debounce <= debounce
         *  ```
         **/
        Manual(): $mol_search;
        /**
         *  ```
         *  value?val \
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint <= format
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  format \
         *  ```
         **/
        format(): string;
        /**
         *  ```
         *  debounce 200
         *  ```
         **/
        debounce(): number;
        /**
         *  ```
         *  Scan $mol_button
         *  	event_click?val <=> event_scan?val
         *  	sub / <= scan_label
         *  ```
         **/
        Scan(): $mol_button;
        /**
         *  ```
         *  event_scan?val null
         *  ```
         **/
        event_scan(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  scan_label @ \Scan
         *  ```
         **/
        scan_label(): string;
    }
}

declare namespace $.$$ {
    class $mol_code extends $.$mol_code {
        scan_support(): boolean;
        Scan(): $.$mol_button;
        event_scan(): void;
    }
}

declare namespace $ {
    class $mol_code_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Barcode scanner with various formats support
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Qr
         *  	<= Matrix
         *  	<= Upc_e
         *  	<= Upc_a
         *  	<= Ean_8
         *  	<= Ean_13
         *  	<= Code_128
         *  	<= Code_39
         *  	<= Itf
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Qr $mol_code format \QR_CODE
         *  ```
         **/
        Qr(): $mol_code;
        /**
         *  ```
         *  Matrix $mol_code format \DATA_MATRIX
         *  ```
         **/
        Matrix(): $mol_code;
        /**
         *  ```
         *  Upc_e $mol_code format \UPC_E
         *  ```
         **/
        Upc_e(): $mol_code;
        /**
         *  ```
         *  Upc_a $mol_code format \UPC_A
         *  ```
         **/
        Upc_a(): $mol_code;
        /**
         *  ```
         *  Ean_8 $mol_code format \EAN_8
         *  ```
         **/
        Ean_8(): $mol_code;
        /**
         *  ```
         *  Ean_13 $mol_code format \EAN_13
         *  ```
         **/
        Ean_13(): $mol_code;
        /**
         *  ```
         *  Code_128 $mol_code format \CODE_128
         *  ```
         **/
        Code_128(): $mol_code;
        /**
         *  ```
         *  Code_39 $mol_code format \CODE_39
         *  ```
         **/
        Code_39(): $mol_code;
        /**
         *  ```
         *  Itf $mol_code format \ITF
         *  ```
         **/
        Itf(): $mol_code;
    }
}

declare namespace $ {
    function $mol_try<Result>(handler2: () => Result): Result | Error;
}

declare namespace $ {
    class $mol_date extends $mol_pop {
        /**
         *  ```
         *  Anchor <= Input
         *  ```
         **/
        Anchor(): $mol_string;
        /**
         *  ```
         *  Input $mol_string
         *  	value?val <=> value?val
         *  	hint <= hint
         *  	length_max 10
         *  ```
         **/
        Input(): $mol_string;
        /**
         *  ```
         *  value?val \
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint \YYYY-MM-DD
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  bubble_content / <= Calendar
         *  ```
         **/
        bubble_content(): any[];
        /**
         *  ```
         *  Calendar $mol_date_calendar
         *  	month_string <= value
         *  	day_selected!day <= day_selected!day
         *  	day_click!day?event <=> day_click!day?event
         *  ```
         **/
        Calendar(): $mol_date_calendar;
        /**
         *  ```
         *  day_selected!day false
         *  ```
         **/
        day_selected(day: any): boolean;
        /**
         *  ```
         *  day_click!day?event null
         *  ```
         **/
        day_click(day: any, event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  value_number?val NaN
         *  ```
         **/
        value_number(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  value_moment?val $mol_time_moment
         *  ```
         **/
        value_moment(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_date_calendar extends $mol_calendar {
        /**
         *  ```
         *  day_content!day / <= Day_button!day
         *  ```
         **/
        day_content(day: any): any[];
        /**
         *  ```
         *  Day_button!day $mol_button
         *  	title <= day_text!day
         *  	event_click?event <=> day_click!day?event
         *  ```
         **/
        Day_button(day: any): $mol_button;
        /**
         *  ```
         *  day_click!day?event null
         *  ```
         **/
        day_click(day: any, event?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_date extends $.$mol_date {
        value(val?: string): string;
        value_moment(val?: $mol_time_moment): $mol_time_moment;
        showed(next?: boolean): boolean;
        day_selected(day: string): boolean;
        day_click(day: string): void;
    }
}

declare namespace $ {
    class $mol_date_demo extends $mol_demo_small {
        /**
         *  ```
         *  sub / <= View
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  View $mol_view sub /
         *  	<= Date
         *  	<= Formatted
         *  ```
         **/
        View(): $mol_view;
        /**
         *  ```
         *  Date $mol_date value_moment?val <=> date?val
         *  ```
         **/
        Date(): $mol_date;
        /**
         *  ```
         *  date?val $mol_time_moment
         *  ```
         **/
        date(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Formatted $mol_view sub / <= formatted
         *  ```
         **/
        Formatted(): $mol_view;
        /**
         *  ```
         *  formatted \
         *  ```
         **/
        formatted(): string;
    }
}

declare namespace $.$$ {
    class $mol_date_demo extends $.$mol_date_demo {
        formatted(): any;
    }
}

declare namespace $ {
    class $mol_switch extends $mol_view {
        /**
         *  ```
         *  minimal_height 40
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  Option!id $mol_check
         *  	checked?val <=> option_checked!id?val
         *  	title <= option_title!id
         *  	enabled <= option_enabled!id
         *  ```
         **/
        Option(id: any): $mol_check;
        /**
         *  ```
         *  option_checked!id?val false
         *  ```
         **/
        option_checked(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  option_title!id \
         *  ```
         **/
        option_title(id: any): string;
        /**
         *  ```
         *  option_enabled!id <= enabled
         *  ```
         **/
        option_enabled(id: any): boolean;
        /**
         *  ```
         *  enabled true
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  value?val null
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  options *
         *  ```
         **/
        options(): {};
        /**
         *  ```
         *  sub <= items
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  items /
         *  ```
         **/
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
    class $mol_deck extends $mol_list {
        /**
         *  ```
         *  items / *
         *  	title \
         *  	Content $mol_view
         *  ```
         **/
        items(): any[];
        /**
         *  ```
         *  rows /
         *  	<= Switch
         *  	<= Content
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Switch $mol_switch
         *  	value?val <=> current?val
         *  	options <= switch_options
         *  ```
         **/
        Switch(): $mol_switch;
        /**
         *  ```
         *  current?val \0
         *  ```
         **/
        current(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  switch_options *
         *  ```
         **/
        switch_options(): {};
        /**
         *  ```
         *  Content null
         *  ```
         **/
        Content(): any;
    }
}

declare namespace $.$$ {
    class $mol_deck extends $.$mol_deck {
        current(next?: string): string;
        switch_options(): {
            [key: string]: () => string;
        };
        Content(): any;
    }
}

declare namespace $ {
    class $mol_deck_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Simple deck with tabbar
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Deck
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Deck $mol_deck items /
         *  	<= greeterItem
         *  	<= questerItem
         *  	<= commanderItem
         *  ```
         **/
        Deck(): $mol_deck;
        /**
         *  ```
         *  greeterItem *
         *  	title <= greeterLabel
         *  	Content <= greeterContent
         *  ```
         **/
        greeterItem(): {
            "title": string;
            "Content": $mol_row;
        };
        /**
         *  ```
         *  greeterLabel @ \Greeting
         *  ```
         **/
        greeterLabel(): string;
        /**
         *  ```
         *  greeterContent $mol_row sub / <= greeterMessager
         *  ```
         **/
        greeterContent(): $mol_row;
        /**
         *  ```
         *  greeterMessager $mol_view sub / <= greeterMessage
         *  ```
         **/
        greeterMessager(): $mol_view;
        /**
         *  ```
         *  greeterMessage @ \Hello, world!
         *  ```
         **/
        greeterMessage(): string;
        /**
         *  ```
         *  questerItem *
         *  	title <= questerLabel
         *  	Content <= questerContent
         *  ```
         **/
        questerItem(): {
            "title": string;
            "Content": $mol_row;
        };
        /**
         *  ```
         *  questerLabel @ \Question
         *  ```
         **/
        questerLabel(): string;
        /**
         *  ```
         *  questerContent $mol_row sub / <= questerMessager
         *  ```
         **/
        questerContent(): $mol_row;
        /**
         *  ```
         *  questerMessager $mol_view sub / <= questerMessage
         *  ```
         **/
        questerMessager(): $mol_view;
        /**
         *  ```
         *  questerMessage @ \How are you?
         *  ```
         **/
        questerMessage(): string;
        /**
         *  ```
         *  commanderItem *
         *  	title <= commanderLabel
         *  	Content <= commanderContent
         *  ```
         **/
        commanderItem(): {
            "title": string;
            "Content": $mol_row;
        };
        /**
         *  ```
         *  commanderLabel @ \Command
         *  ```
         **/
        commanderLabel(): string;
        /**
         *  ```
         *  commanderContent $mol_row sub / <= commanderMessager
         *  ```
         **/
        commanderContent(): $mol_row;
        /**
         *  ```
         *  commanderMessager $mol_view sub / <= commanderMessage
         *  ```
         **/
        commanderMessager(): $mol_view;
        /**
         *  ```
         *  commanderMessage @ \Let us do it right!
         *  ```
         **/
        commanderMessage(): string;
    }
}

declare namespace $ {
    class $mol_dimmer_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Text with highlighted found substring
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= one
         *  	<= two
         *  	<= three
         *  	<= four
         *  	<= five
         *  	<= six
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  one $mol_dimmer
         *  	haystack \Don't put all your eggs in one basket
         *  	needle \eggs
         *  ```
         **/
        one(): $mol_dimmer;
        /**
         *  ```
         *  two $mol_dimmer
         *  	haystack \Don't look a gift horse in the mouth.
         *  	needle \oo
         *  ```
         **/
        two(): $mol_dimmer;
        /**
         *  ```
         *  three $mol_dimmer
         *  	haystack \There is no word you are looking for
         *  	needle \luck
         *  ```
         **/
        three(): $mol_dimmer;
        /**
         *  ```
         *  four $mol_dimmer
         *  	haystack \ooAAooAAoo
         *  	needle \oo
         *  ```
         **/
        four(): $mol_dimmer;
        /**
         *  ```
         *  five $mol_dimmer
         *  	haystack \Let's search this string
         *  	needle \Let's search this string
         *  ```
         **/
        five(): $mol_dimmer;
        /**
         *  ```
         *  six $mol_dimmer
         *  	haystack \Let's search nothing
         *  	needle \
         *  ```
         **/
        six(): $mol_dimmer;
    }
}

declare namespace $ {
    class $mol_expander extends $mol_list {
        /**
         *  ```
         *  rows /
         *  	<= Label
         *  	<= Content
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Label $mol_view sub /
         *  	<= Trigger
         *  	<= tools
         *  ```
         **/
        Label(): $mol_view;
        /**
         *  ```
         *  Trigger $mol_check_expand
         *  	checked?val <=> expanded?val
         *  	label <= label
         *  ```
         **/
        Trigger(): $$.$mol_check_expand;
        /**
         *  ```
         *  expanded?val false
         *  ```
         **/
        expanded(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  label / <= title
         *  ```
         **/
        label(): any[];
        /**
         *  ```
         *  tools /
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Content $mol_view sub <= content
         *  ```
         **/
        Content(): $mol_view;
        /**
         *  ```
         *  content /
         *  ```
         **/
        content(): any[];
    }
}

declare namespace $.$$ {
    class $mol_expander extends $.$mol_expander {
        rows(): $mol_view[];
    }
}

declare namespace $ {
    class $mol_filler extends $mol_view {
        /**
         *  ```
         *  minimal_height 500
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  sub /
         *  	\Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.
         *  	\Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.
         *  	\Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.
         *  	\Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.
         *  	\Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.
         *  	\Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.
         *  	\Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.
         *  	\Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.
         *  ```
         **/
        sub(): any[];
    }
}

declare namespace $ {
    class $mol_expander_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Simple spoiler
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Expander
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Expander $mol_expander
         *  	title \Lorem Ipsum
         *  	Content $mol_filler
         *  ```
         **/
        Expander(): $mol_expander;
    }
}

declare namespace $ {
    class $mol_float_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Floating header example
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Scroll
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Scroll $mol_scroll sub /
         *  	<= Head
         *  	<= content
         *  ```
         **/
        Scroll(): $mol_scroll;
        /**
         *  ```
         *  Head $mol_float sub / <= Head_card
         *  ```
         **/
        Head(): $mol_float;
        /**
         *  ```
         *  Head_card $mol_card sub / <= Head_row
         *  ```
         **/
        Head_card(): $mol_card;
        /**
         *  ```
         *  Head_row $mol_row sub / <= Head_content
         *  ```
         **/
        Head_row(): $mol_row;
        /**
         *  ```
         *  Head_content $mol_view sub / \Float header
         *  ```
         **/
        Head_content(): $mol_view;
        /**
         *  ```
         *  content / <= Content
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  Content $mol_row sub /
         *  	<= Filler1
         *  	<= Filler2
         *  ```
         **/
        Content(): $mol_row;
        /**
         *  ```
         *  Filler1 $mol_filler
         *  ```
         **/
        Filler1(): $mol_filler;
        /**
         *  ```
         *  Filler2 $mol_filler
         *  ```
         **/
        Filler2(): $mol_filler;
    }
}

declare namespace $ {
    class $mol_form extends $mol_view {
        /**
         *  ```
         *  submit_blocked false
         *  ```
         **/
        submit_blocked(): boolean;
        /**
         *  ```
         *  event *
         *  	^
         *  	keydown?event <=> keydown?event
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
         *  submit?event null
         *  ```
         **/
        submit(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= Bar_fields
         *  	<= Bar_buttons
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Bar_fields $mol_view sub <= form_fields
         *  ```
         **/
        Bar_fields(): $mol_view;
        /**
         *  ```
         *  form_fields /
         *  ```
         **/
        form_fields(): any[];
        /**
         *  ```
         *  Bar_buttons $mol_row sub <= buttons
         *  ```
         **/
        Bar_buttons(): $mol_row;
        /**
         *  ```
         *  buttons /
         *  ```
         **/
        buttons(): any[];
    }
}

declare namespace $.$$ {
    class $mol_form extends $.$mol_form {
        submit_blocked(): boolean;
        keydown(next?: KeyboardEvent): void;
    }
}

declare namespace $ {
    class $mol_labeler extends $mol_view {
        /**
         *  ```
         *  sub /
         *  	<= Title
         *  	<= Content
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Title $mol_view sub <= label
         *  ```
         **/
        Title(): $mol_view;
        /**
         *  ```
         *  label / <= title
         *  ```
         **/
        label(): any[];
        /**
         *  ```
         *  Content $mol_view sub / <= content
         *  ```
         **/
        Content(): $mol_view;
        /**
         *  ```
         *  content null
         *  ```
         **/
        content(): any;
    }
}

declare namespace $ {
    class $mol_form_field extends $mol_labeler {
        /**
         *  ```
         *  label /
         *  	<= name
         *  	<= Bid
         *  ```
         **/
        label(): any[];
        /**
         *  ```
         *  name \
         *  ```
         **/
        name(): string;
        /**
         *  ```
         *  Bid $mol_view sub / <= bid
         *  ```
         **/
        Bid(): $mol_view;
        /**
         *  ```
         *  bid \
         *  ```
         **/
        bid(): string;
        /**
         *  ```
         *  Content <= control
         *  ```
         **/
        Content(): any;
        /**
         *  ```
         *  control null
         *  ```
         **/
        control(): any;
    }
}

declare namespace $ {
    class $mol_form_demo_bids extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Sign Up form demo
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  message_required @ \Required
         *  ```
         **/
        message_required(): string;
        /**
         *  ```
         *  message_no_spaces @ \No spaces!
         *  ```
         **/
        message_no_spaces(): string;
        /**
         *  ```
         *  message_need_more_letters @ \{count} or more letters
         *  ```
         **/
        message_need_more_letters(): string;
        /**
         *  ```
         *  sub /
         *  	<= Form
         *  	<= Message
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Form $mol_form
         *  	submit?val <=> submit?val
         *  	form_fields /
         *  		<= Name_first_field
         *  		<= Name_nick_field
         *  		<= Name_second_field
         *  		<= Sex_field
         *  	buttons / <= Submit
         *  ```
         **/
        Form(): $mol_form;
        /**
         *  ```
         *  submit?val null
         *  ```
         **/
        submit(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Name_first_field $mol_form_field
         *  	name <= name_first_label
         *  	bid <= name_first_bid
         *  	control <= Name_first_control
         *  ```
         **/
        Name_first_field(): $mol_form_field;
        /**
         *  ```
         *  name_first_label @ \First Name
         *  ```
         **/
        name_first_label(): string;
        /**
         *  ```
         *  name_first_bid \
         *  ```
         **/
        name_first_bid(): string;
        /**
         *  ```
         *  Name_first_control $mol_string
         *  	hint <= name_first_hint
         *  	value?val <=> name_first?val
         *  ```
         **/
        Name_first_control(): $mol_string;
        /**
         *  ```
         *  name_first_hint @ \Jack
         *  ```
         **/
        name_first_hint(): string;
        /**
         *  ```
         *  name_first?val \
         *  ```
         **/
        name_first(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Name_nick_field $mol_form_field
         *  	name <= name_nick_label
         *  	bid <= name_nick_bid
         *  	control <= Name_nick_control
         *  ```
         **/
        Name_nick_field(): $mol_form_field;
        /**
         *  ```
         *  name_nick_label @ \Nick Name
         *  ```
         **/
        name_nick_label(): string;
        /**
         *  ```
         *  name_nick_bid \
         *  ```
         **/
        name_nick_bid(): string;
        /**
         *  ```
         *  Name_nick_control $mol_string
         *  	hint <= name_nick_hint
         *  	value?val <=> name_nick?val
         *  ```
         **/
        Name_nick_control(): $mol_string;
        /**
         *  ```
         *  name_nick_hint @ \Capitan
         *  ```
         **/
        name_nick_hint(): string;
        /**
         *  ```
         *  name_nick?val \
         *  ```
         **/
        name_nick(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Name_second_field $mol_form_field
         *  	name <= name_second_label
         *  	bid <= name_second_bid
         *  	control <= Name_second_control
         *  ```
         **/
        Name_second_field(): $mol_form_field;
        /**
         *  ```
         *  name_second_label @ \Second Name
         *  ```
         **/
        name_second_label(): string;
        /**
         *  ```
         *  name_second_bid \
         *  ```
         **/
        name_second_bid(): string;
        /**
         *  ```
         *  Name_second_control $mol_string
         *  	hint <= name_second_hint
         *  	value?val <=> name_second?val
         *  ```
         **/
        Name_second_control(): $mol_string;
        /**
         *  ```
         *  name_second_hint @ \Sparrow
         *  ```
         **/
        name_second_hint(): string;
        /**
         *  ```
         *  name_second?val \
         *  ```
         **/
        name_second(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Sex_field $mol_form_field
         *  	name <= sex_label
         *  	bid <= sex_bid
         *  	control / <= Sex_control
         *  ```
         **/
        Sex_field(): $mol_form_field;
        /**
         *  ```
         *  sex_label @ \Sex
         *  ```
         **/
        sex_label(): string;
        /**
         *  ```
         *  sex_bid \
         *  ```
         **/
        sex_bid(): string;
        /**
         *  ```
         *  Sex_control $mol_switch
         *  	value?val <=> sex?val
         *  	options <= sex_options
         *  ```
         **/
        Sex_control(): $mol_switch;
        /**
         *  ```
         *  sex?val \
         *  ```
         **/
        sex(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sex_options *
         *  	male <= sex_option_male
         *  	intersex <= sex_option_intersex
         *  	female <= sex_option_female
         *  ```
         **/
        sex_options(): {
            "male": string;
            "intersex": string;
            "female": string;
        };
        /**
         *  ```
         *  sex_option_male @ \Male
         *  ```
         **/
        sex_option_male(): string;
        /**
         *  ```
         *  sex_option_intersex @ \Intersex
         *  ```
         **/
        sex_option_intersex(): string;
        /**
         *  ```
         *  sex_option_female @ \Female
         *  ```
         **/
        sex_option_female(): string;
        /**
         *  ```
         *  Submit $mol_button_major
         *  	sub / <= submit_text
         *  	click?val <=> submit?val
         *  	disabled <= submit_blocked
         *  ```
         **/
        Submit(): $mol_button_major;
        /**
         *  ```
         *  submit_text @ \Sign Up
         *  ```
         **/
        submit_text(): string;
        /**
         *  ```
         *  submit_blocked true
         *  ```
         **/
        submit_blocked(): boolean;
        /**
         *  ```
         *  Message $mol_view sub / <= message?val
         *  ```
         **/
        Message(): $mol_view;
        /**
         *  ```
         *  message?val \
         *  ```
         **/
        message(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_form_demo_bids extends $.$mol_form_demo_bids {
        name_first(next?: string): string;
        name_first_bid(): string;
        name_nick(next?: string): string;
        name_second(next?: string): string;
        name_second_bid(): string;
        sex(next?: string): string;
        sex_bid(): string;
        submit(next?: Event): void;
        submit_blocked(): boolean;
    }
}

declare namespace $ {
    function $mol_range_in<Item>(source: {
        item: (id: number) => Item;
        length: number;
    }): Item[];
    class $mol_range_common<Value> {
        item(id: number): Value;
        readonly length: number;
        readonly '0': Value;
        forEach(handle: (value?: Value, id?: number) => void): void;
        valueOf(): Value[];
        concat(...args: any[]): Value[];
        slice(start?: number, end?: number): $mol_range_lazy<Value>;
        map<ResValue>(proceed: (val: Value, id?: number) => ResValue): $mol_range_lazy<ResValue>;
        join(delim?: string): string;
        every(check: (value: Value, id: number) => boolean): boolean;
        some(check: (value: Value, id: number) => boolean): boolean;
    }
    class $mol_range_lazy<Value> extends $mol_range_common<Value> {
        private source;
        constructor(source?: {
            item(id: number): Value;
            length: number;
        });
        item(id: number): Value;
        readonly length: number;
    }
}

declare namespace $ {
    class $mol_grid_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Grid with large count of cells
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Grid
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Grid $mol_grid
         *  	row_height 40
         *  	records <= records
         *  	col_head_content!col <= col_head_content!col
         *  ```
         **/
        Grid(): $mol_grid;
        /**
         *  ```
         *  records *
         *  ```
         **/
        records(): {};
        /**
         *  ```
         *  col_head_content!col /
         *  ```
         **/
        col_head_content(col: any): any[];
    }
}

declare namespace $.$$ {
    class $mol_grid_demo extends $.$mol_grid_demo {
        records(): string[][];
        col_head_content(id: string): string[];
    }
}

declare namespace $ {
    class $mol_labeler_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Labeled content of some types
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Provider
         *  	<= Name
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Provider $mol_labeler
         *  	title \Provider
         *  	content \ACME Provider Inc.
         *  ```
         **/
        Provider(): $mol_labeler;
        /**
         *  ```
         *  Name $mol_labeler
         *  	title \User name
         *  	Content <= Name_control
         *  ```
         **/
        Name(): $mol_labeler;
        /**
         *  ```
         *  Name_control $mol_string
         *  	hint \Jack Sparrow
         *  	value?val <=> user_name?val
         *  ```
         **/
        Name_control(): $mol_string;
        /**
         *  ```
         *  user_name?val \
         *  ```
         **/
        user_name(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_link_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Some hyperlinks
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= This
         *  	<= Red
         *  	<= Green
         *  	<= Blue
         *  	<= External
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  This $mol_link sub / <= this_label
         *  ```
         **/
        This(): $mol_link;
        /**
         *  ```
         *  this_label @ \This page
         *  ```
         **/
        this_label(): string;
        /**
         *  ```
         *  Red $mol_link
         *  	arg * color \red
         *  	sub / <= red_label
         *  ```
         **/
        Red(): $mol_link;
        /**
         *  ```
         *  red_label @ \Red
         *  ```
         **/
        red_label(): string;
        /**
         *  ```
         *  Green $mol_link
         *  	arg * color \green
         *  	sub / <= green_label
         *  ```
         **/
        Green(): $mol_link;
        /**
         *  ```
         *  green_label @ \Green
         *  ```
         **/
        green_label(): string;
        /**
         *  ```
         *  Blue $mol_link
         *  	arg * color \blue
         *  	sub / <= blue_label
         *  ```
         **/
        Blue(): $mol_link;
        /**
         *  ```
         *  blue_label @ \Blue
         *  ```
         **/
        blue_label(): string;
        /**
         *  ```
         *  External $mol_link
         *  	uri \http://example.org
         *  	title \example.org
         *  	hint <= external_hint
         *  ```
         **/
        External(): $mol_link;
        /**
         *  ```
         *  external_hint @ \external link
         *  ```
         **/
        external_hint(): string;
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
    class $mol_link_iconed_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Link with icon
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Input
         *  	<= Output
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Input $mol_string value?val <=> uri?val
         *  ```
         **/
        Input(): $mol_string;
        /**
         *  ```
         *  uri?val \https://www.google.com/search?q=%24mol
         *  ```
         **/
        uri(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Output $mol_link_iconed uri <= uri?val
         *  ```
         **/
        Output(): $$.$mol_link_iconed;
    }
}

declare namespace $ {
    class $mol_list_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Large list of rows with dynamic content
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Scroll
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Scroll $mol_scroll sub / <= List
         *  ```
         **/
        Scroll(): $mol_scroll;
        /**
         *  ```
         *  List $mol_list rows <= rows
         *  ```
         **/
        List(): $mol_list;
        /**
         *  ```
         *  rows /
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Row!id $mol_expander
         *  	title <= row_text!id
         *  	content / <= Content!id
         *  ```
         **/
        Row(id: any): $mol_expander;
        /**
         *  ```
         *  row_text!id \
         *  ```
         **/
        row_text(id: any): string;
        /**
         *  ```
         *  Content!id $mol_row sub / <= Text
         *  ```
         **/
        Content(id: any): $mol_row;
        /**
         *  ```
         *  Text $mol_filler
         *  ```
         **/
        Text(): $mol_filler;
    }
}

declare namespace $.$$ {
    class $mol_list_demo extends $.$mol_list_demo {
        rows(): $mol_view[];
        row_text(id: number): string;
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
    class $mol_import extends $mol_object2 {
        static script(uri: string, next?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_map_yandex extends $mol_view {
        /**
         *  ```
         *  zoom?val 2
         *  ```
         **/
        zoom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  center?val /
         *  	0
         *  	0
         *  ```
         **/
        center(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  objects /
         *  ```
         **/
        objects(): any[];
    }
}

declare namespace $.$$ {
    class $mol_map_yandex extends $.$mol_map_yandex {
        static api(): any;
        api(next?: any, force?: $mol_atom_force): any;
        update(event?: any): void;
        render(): void;
    }
}

declare namespace $ {
    class $mol_map_yandex_mark extends $mol_object {
        /**
         *  ```
         *  pos /
         *  	0
         *  	0
         *  ```
         **/
        pos(): any[];
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  title \
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  content \
         *  ```
         **/
        content(): string;
    }
}

declare namespace $.$$ {
    class $mol_map_yandex_mark extends $.$mol_map_yandex_mark {
        object(): any;
    }
}

declare namespace $ {
    class $mol_map_yandex_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Simple Yandex Maps wrapper
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Map
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Map $mol_map_yandex
         *  	center?val <=> center?val
         *  	zoom?val <=> zoom?val
         *  	objects / <= Place
         *  ```
         **/
        Map(): $mol_map_yandex;
        /**
         *  ```
         *  center?val /
         *  	59.9
         *  	30.3
         *  ```
         **/
        center(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  zoom?val 10
         *  ```
         **/
        zoom(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Place $mol_map_yandex_mark
         *  	pos <= place_pos
         *  	title <= place_title
         *  	content <= place_content
         *  ```
         **/
        Place(): $mol_map_yandex_mark;
        /**
         *  ```
         *  place_pos /
         *  	59.9
         *  	30.3
         *  ```
         **/
        place_pos(): any[];
        /**
         *  ```
         *  place_title \Saint-Petersburg
         *  ```
         **/
        place_title(): string;
        /**
         *  ```
         *  place_content \It is Russia's second-largest city after Moscow
         *  ```
         **/
        place_content(): string;
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
    class $mol_message extends $mol_view {
        /**
         *  ```
         *  moment $mol_time_moment
         *  ```
         **/
        moment(): $mol_time_moment;
        /**
         *  ```
         *  sub /
         *  	<= Info
         *  	<= Avatar_link
         *  	<= Text
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Info $mol_row sub /
         *  	<= Name
         *  	<= Moment
         *  ```
         **/
        Info(): $mol_row;
        /**
         *  ```
         *  Name $mol_view sub / <= name
         *  ```
         **/
        Name(): $mol_view;
        /**
         *  ```
         *  name \
         *  ```
         **/
        name(): string;
        /**
         *  ```
         *  Moment $mol_view sub / <= moment_string
         *  ```
         **/
        Moment(): $mol_view;
        /**
         *  ```
         *  moment_string \
         *  ```
         **/
        moment_string(): string;
        /**
         *  ```
         *  Avatar_link $mol_link
         *  	uri <= avatar_link
         *  	sub / <= Avatar
         *  ```
         **/
        Avatar_link(): $mol_link;
        /**
         *  ```
         *  avatar_link \
         *  ```
         **/
        avatar_link(): string;
        /**
         *  ```
         *  Avatar $mol_image
         *  	title \
         *  	uri <= avatar
         *  ```
         **/
        Avatar(): $mol_image;
        /**
         *  ```
         *  avatar \
         *  ```
         **/
        avatar(): string;
        /**
         *  ```
         *  Text $mol_text text <= text
         *  ```
         **/
        Text(): $mol_text;
        /**
         *  ```
         *  text \
         *  ```
         **/
        text(): string;
    }
}

declare namespace $.$$ {
    class $mol_message extends $.$mol_message {
        moment_string(): string;
    }
}

declare namespace $ {
    class $mol_message_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Generic user message
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Message_short
         *  	<= Message_long
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Message_short $mol_message
         *  	name \Jin
         *  	moment $mol_time_moment
         *  	avatar \https://avatars3.githubusercontent.com/u/442988?v=4
         *  	avatar_link \https://github.com/nin-jin
         *  	text \Hello, **everybody!**
         *  ```
         **/
        Message_short(): $$.$mol_message;
        /**
         *  ```
         *  Message_long $mol_message
         *  	name \Great Teacher Onizuka
         *  	moment $mol_time_moment
         *  	avatar_link \https://en.wikipedia.org/wiki/Great_Teacher_Onizuka
         *  	text \The story focuses on 22-year-old ex-[bōsōzoku](https://en.wikipedia.org/wiki/Bōsōzoku) member Eikichi Onizuka, who becomes a teacher at a private middle school, Holy Forest Academy, in [Tokyo](https://en.wikipedia.org/wiki/Tokyo), [Japan](https://en.wikipedia.org/wiki/Japan). It won the 1998 [Kodansha Manga Award](https://en.wikipedia.org/wiki/Kodansha_Manga_Award) for shōnen and is a continuation of Tohru Fujisawa's other manga series [Shonan Junai Gumi](https://en.wikipedia.org/wiki/Shonan_Junai_Gumi) (lit. "Shōnan True Love Group") and Bad Company, both of which focus on the life of Onizuka before he becomes a teacher in Great Teacher Onizuka.
         *  ```
         **/
        Message_long(): $$.$mol_message;
    }
}

declare namespace $ {
    class $mol_meter_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Real time offset and size metering
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  plugins / <= Meter
         *  ```
         **/
        plugins(): any[];
        top(): any;
        height(): any;
        /**
         *  ```
         *  Meter $mol_meter
         *  	top => top
         *  	height => height
         *  ```
         **/
        Meter(): $mol_meter;
        /**
         *  ```
         *  sub /
         *  	<= Top
         *  	<= Height
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Top $mol_view sub /
         *  	\Offset from top:
         *  	<= top
         *  ```
         **/
        Top(): $mol_view;
        /**
         *  ```
         *  Height $mol_view sub /
         *  	\Component height:
         *  	<= height
         *  ```
         **/
        Height(): $mol_view;
    }
}

declare namespace $ {
    class $mol_icon_minus extends $mol_icon {
        /**
         *  ```
         *  path \M19,13H5V11H19V13Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_plus extends $mol_icon {
        /**
         *  ```
         *  path \M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_number extends $mol_view {
        /**
         *  ```
         *  precision_view <= precision
         *  ```
         **/
        precision_view(): number;
        /**
         *  ```
         *  precision 1
         *  ```
         **/
        precision(): number;
        /**
         *  ```
         *  precision_change <= precision
         *  ```
         **/
        precision_change(): number;
        /**
         *  ```
         *  value?val NaN
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub /
         *  	<= String
         *  	<= Dec
         *  	<= Inc
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  String $mol_string
         *  	type \number
         *  	value?val <=> value_string?val
         *  	hint <= hint
         *  	enabled <= string_enabled
         *  	debounce <= debounce
         *  ```
         **/
        String(): $mol_string;
        /**
         *  ```
         *  value_string?val \
         *  ```
         **/
        value_string(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  string_enabled <= enabled
         *  ```
         **/
        string_enabled(): boolean;
        /**
         *  ```
         *  enabled true
         *  ```
         **/
        enabled(): boolean;
        /**
         *  ```
         *  debounce 200
         *  ```
         **/
        debounce(): number;
        /**
         *  ```
         *  Dec $mol_button_minor
         *  	event_click?val <=> event_dec?val
         *  	enabled <= dec_enabled
         *  	sub / <= dec_icon
         *  ```
         **/
        Dec(): $mol_button_minor;
        /**
         *  ```
         *  event_dec?val null
         *  ```
         **/
        event_dec(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  dec_enabled <= enabled
         *  ```
         **/
        dec_enabled(): boolean;
        /**
         *  ```
         *  dec_icon $mol_icon_minus
         *  ```
         **/
        dec_icon(): $mol_icon_minus;
        /**
         *  ```
         *  Inc $mol_button_minor
         *  	event_click?val <=> event_inc?val
         *  	enabled <= inc_enabled
         *  	sub / <= inc_icon
         *  ```
         **/
        Inc(): $mol_button_minor;
        /**
         *  ```
         *  event_inc?val null
         *  ```
         **/
        event_inc(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  inc_enabled <= enabled
         *  ```
         **/
        inc_enabled(): boolean;
        /**
         *  ```
         *  inc_icon $mol_icon_plus
         *  ```
         **/
        inc_icon(): $mol_icon_plus;
    }
}

declare namespace $.$$ {
    class $mol_number extends $.$mol_number {
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): any;
    }
}

declare namespace $ {
    class $mol_number_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Number input control with various configuration
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= zero
         *  	<= one
         *  	<= two
         *  	<= three
         *  	<= four
         *  	<= five
         *  	<= six
         *  	<= seven
         *  	<= eight
         *  	<= nine
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  zero $mol_number
         *  ```
         **/
        zero(): $mol_number;
        /**
         *  ```
         *  one $mol_number value?val <=> year?val
         *  ```
         **/
        one(): $mol_number;
        /**
         *  ```
         *  year?val NaN
         *  ```
         **/
        year(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  two $mol_number
         *  	value?val <=> year?val
         *  	hint \2016
         *  ```
         **/
        two(): $mol_number;
        /**
         *  ```
         *  three $mol_number
         *  	value?val <=> age?val
         *  	hint \18-99
         *  	enabled false
         *  ```
         **/
        three(): $mol_number;
        /**
         *  ```
         *  age?val 32
         *  ```
         **/
        age(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  four $mol_number
         *  	value?val <=> year?val
         *  	string_enabled false
         *  ```
         **/
        four(): $mol_number;
        /**
         *  ```
         *  five $mol_number
         *  	value?val <=> age?val
         *  	dec_enabled false
         *  ```
         **/
        five(): $mol_number;
        /**
         *  ```
         *  six $mol_number
         *  	value?val <=> year?val
         *  	inc_enabled false
         *  ```
         **/
        six(): $mol_number;
        /**
         *  ```
         *  seven $mol_number
         *  	value?val <=> year?val
         *  	precision_change 10
         *  ```
         **/
        seven(): $mol_number;
        /**
         *  ```
         *  eight $mol_number
         *  	value?val <=> year?val
         *  	precision_view 0.01
         *  ```
         **/
        eight(): $mol_number;
        /**
         *  ```
         *  nine $mol_number
         *  	value?val <=> year?val
         *  	precision 1000
         *  ```
         **/
        nine(): $mol_number;
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
    class $mol_page_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Page with header, body and footer
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
         *  Page $mol_page
         *  	tools / <= Button
         *  	body / <= Content
         *  	foot / <= Foot_content
         *  ```
         **/
        Page(): $mol_page;
        /**
         *  ```
         *  Button $mol_button_minor title \Toolbar Button
         *  ```
         **/
        Button(): $mol_button_minor;
        /**
         *  ```
         *  Content $mol_row sub / <= Text
         *  ```
         **/
        Content(): $mol_row;
        /**
         *  ```
         *  Text $mol_filler
         *  ```
         **/
        Text(): $mol_filler;
        /**
         *  ```
         *  Foot_content $mol_row sub / <= Foot_text
         *  ```
         **/
        Foot_content(): $mol_row;
        /**
         *  ```
         *  Foot_text $mol_view sub / \Footer
         *  ```
         **/
        Foot_text(): $mol_view;
    }
}

declare namespace $ {
    class $mol_paginator extends $mol_view {
        /**
         *  ```
         *  sub /
         *  	<= Backward
         *  	<= Value
         *  	<= Forward
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Backward $mol_button_minor
         *  	hint <= backward_hint
         *  	click?event <=> backward?event
         *  	sub / <= Backward_icon
         *  ```
         **/
        Backward(): $mol_button_minor;
        /**
         *  ```
         *  backward_hint @ \Назад
         *  ```
         **/
        backward_hint(): string;
        /**
         *  ```
         *  backward?event null
         *  ```
         **/
        backward(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Backward_icon $mol_icon_chevron
         *  ```
         **/
        Backward_icon(): $mol_icon_chevron;
        /**
         *  ```
         *  Value $mol_view sub / <= value?val
         *  ```
         **/
        Value(): $mol_view;
        /**
         *  ```
         *  value?val 0
         *  ```
         **/
        value(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Forward $mol_button_minor
         *  	hint <= forward_hint
         *  	click?event <=> forward?event
         *  	sub / <= Forward_icon
         *  ```
         **/
        Forward(): $mol_button_minor;
        /**
         *  ```
         *  forward_hint @ \Вперёд
         *  ```
         **/
        forward_hint(): string;
        /**
         *  ```
         *  forward?event null
         *  ```
         **/
        forward(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Forward_icon $mol_icon_chevron
         *  ```
         **/
        Forward_icon(): $mol_icon_chevron;
    }
}

declare namespace $.$$ {
    class $mol_paginator extends $.$mol_paginator {
        backward(): void;
        forward(): void;
    }
}

declare namespace $ {
    class $mol_paginator_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Page switcher
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Pages
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Pages $mol_paginator value?val <=> page?val
         *  ```
         **/
        Pages(): $mol_paginator;
        /**
         *  ```
         *  page?val 0
         *  ```
         **/
        page(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_plot_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Dynamic lightweight graphs
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  count?val 20
         *  ```
         **/
        count(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  sub / <= Plot
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Plot $mol_plot_pane graphs /
         *  	<= Saturation
         *  	<= Input
         *  	<= Output
         *  	<= Voltage
         *  	<= Time
         *  ```
         **/
        Plot(): $mol_plot_pane;
        /**
         *  ```
         *  Saturation $mol_plot_group
         *  	series_y <= saturation_series
         *  	graphs /
         *  		<= Saturation_fill
         *  		<= Saturation_line
         *  ```
         **/
        Saturation(): $mol_plot_group;
        /**
         *  ```
         *  saturation_series /
         *  ```
         **/
        saturation_series(): any[];
        /**
         *  ```
         *  Saturation_fill $mol_plot_fill
         *  ```
         **/
        Saturation_fill(): $mol_plot_fill;
        /**
         *  ```
         *  Saturation_line $mol_plot_line type \dashed
         *  ```
         **/
        Saturation_line(): $mol_plot_line;
        /**
         *  ```
         *  Input $mol_plot_group
         *  	series_y <= input_series
         *  	graphs /
         *  		<= Input_line
         *  		<= Input_dots
         *  ```
         **/
        Input(): $mol_plot_group;
        /**
         *  ```
         *  input_series /
         *  ```
         **/
        input_series(): any[];
        /**
         *  ```
         *  Input_line $mol_plot_line
         *  ```
         **/
        Input_line(): $mol_plot_line;
        /**
         *  ```
         *  Input_dots $mol_plot_dot
         *  ```
         **/
        Input_dots(): $mol_plot_dot;
        /**
         *  ```
         *  Output $mol_plot_bar series_y <= output_series
         *  ```
         **/
        Output(): $mol_plot_bar;
        /**
         *  ```
         *  output_series /
         *  ```
         **/
        output_series(): any[];
        /**
         *  ```
         *  Voltage $mol_plot_ruler_vert title <= Voltage_title
         *  ```
         **/
        Voltage(): $mol_plot_ruler_vert;
        /**
         *  ```
         *  Voltage_title @ \V
         *  ```
         **/
        Voltage_title(): string;
        /**
         *  ```
         *  Time $mol_plot_ruler_hor title <= Time_title
         *  ```
         **/
        Time(): $mol_plot_ruler_hor;
        /**
         *  ```
         *  Time_title @ \ms
         *  ```
         **/
        Time_title(): string;
    }
}

declare namespace $.$$ {
    class $mol_plot_demo extends $.$mol_plot_demo {
        series_x(): number[];
        input_series(): number[];
        output_series(): number[];
        saturation_series(): number[];
    }
}

declare namespace $ {
    class $mol_pop_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Pop up block with various alignment
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Pop
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Pop $mol_pop
         *  	Anchor <= Show
         *  	showed <= showed
         *  	bubble_content / <= Content
         *  ```
         **/
        Pop(): $mol_pop;
        /**
         *  ```
         *  Show $mol_button_minor title <= show_text
         *  ```
         **/
        Show(): $mol_button_minor;
        /**
         *  ```
         *  show_text @ \?
         *  ```
         **/
        show_text(): string;
        /**
         *  ```
         *  showed <= focused
         *  ```
         **/
        showed(): boolean;
        /**
         *  ```
         *  Content $mol_row sub / <= bubble_hint
         *  ```
         **/
        Content(): $mol_row;
        /**
         *  ```
         *  bubble_hint @ \This is $mol_pop
         *  ```
         **/
        bubble_hint(): string;
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
    class $mol_pop_over_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Menu that opens on mouse over
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Menu
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Menu $mol_row sub /
         *  	<= File
         *  	<= Help
         *  ```
         **/
        Menu(): $mol_row;
        /**
         *  ```
         *  File $mol_pop_over
         *  	align \bottom_right
         *  	Anchor <= file_title
         *  	bubble_content / <= File_menu
         *  ```
         **/
        File(): $mol_pop_over;
        /**
         *  ```
         *  file_title @ \File
         *  ```
         **/
        file_title(): string;
        /**
         *  ```
         *  File_menu $mol_list rows /
         *  	<= Open
         *  	<= Export
         *  	<= Save
         *  ```
         **/
        File_menu(): $mol_list;
        /**
         *  ```
         *  Open $mol_button_minor title <= open_title
         *  ```
         **/
        Open(): $mol_button_minor;
        /**
         *  ```
         *  open_title @ \Open
         *  ```
         **/
        open_title(): string;
        /**
         *  ```
         *  Export $mol_button_minor title <= export_title
         *  ```
         **/
        Export(): $mol_button_minor;
        /**
         *  ```
         *  export_title @ \Export
         *  ```
         **/
        export_title(): string;
        /**
         *  ```
         *  Save $mol_button_minor title <= save_title
         *  ```
         **/
        Save(): $mol_button_minor;
        /**
         *  ```
         *  save_title @ \Save
         *  ```
         **/
        save_title(): string;
        /**
         *  ```
         *  Help $mol_pop_over
         *  	align \bottom_right
         *  	Anchor <= help_title
         *  	bubble_content / <= Help_menu
         *  ```
         **/
        Help(): $mol_pop_over;
        /**
         *  ```
         *  help_title @ \About
         *  ```
         **/
        help_title(): string;
        /**
         *  ```
         *  Help_menu $mol_list rows /
         *  	<= Updates
         *  	<= About
         *  ```
         **/
        Help_menu(): $mol_list;
        /**
         *  ```
         *  Updates $mol_button_minor title <= updates_title
         *  ```
         **/
        Updates(): $mol_button_minor;
        /**
         *  ```
         *  updates_title @ \Updates
         *  ```
         **/
        updates_title(): string;
        /**
         *  ```
         *  About $mol_button_minor title <= about_title
         *  ```
         **/
        About(): $mol_button_minor;
        /**
         *  ```
         *  about_title @ \About
         *  ```
         **/
        about_title(): string;
    }
}

declare namespace $ {
    class $mol_portion_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Progress bar in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Empty
         *  	<= Partial
         *  	<= Full
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Empty $mol_portion portion <= fist
         *  ```
         **/
        Empty(): $$.$mol_portion;
        /**
         *  ```
         *  fist 0
         *  ```
         **/
        fist(): number;
        /**
         *  ```
         *  Partial $mol_portion portion <= second
         *  ```
         **/
        Partial(): $$.$mol_portion;
        /**
         *  ```
         *  second 0.5
         *  ```
         **/
        second(): number;
        /**
         *  ```
         *  Full $mol_portion portion <= third
         *  ```
         **/
        Full(): $$.$mol_portion;
        /**
         *  ```
         *  third 1
         *  ```
         **/
        third(): number;
    }
}

declare namespace $ {
    class $mol_row_demo_form extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Some controls in one row with equal paddings and wrapping support
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Row
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Row $mol_row sub /
         *  	<= Name
         *  	<= Count
         *  	<= Progress
         *  	<= Publish
         *  	<= Drop
         *  ```
         **/
        Row(): $mol_row;
        /**
         *  ```
         *  Name $mol_search
         *  	hint <= name_hint
         *  	query?val <=> name?val
         *  	suggests /
         *  		<= suggest1
         *  		<= suggest2
         *  ```
         **/
        Name(): $mol_search;
        /**
         *  ```
         *  name_hint @ \Jack Sparrow
         *  ```
         **/
        name_hint(): string;
        /**
         *  ```
         *  name?val \
         *  ```
         **/
        name(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  suggest1 @ \Jack Sparrow
         *  ```
         **/
        suggest1(): string;
        /**
         *  ```
         *  suggest2 @ \Bruce Wayne
         *  ```
         **/
        suggest2(): string;
        /**
         *  ```
         *  Count $mol_number
         *  	hint <= count_hint
         *  	value?val <=> count?val
         *  ```
         **/
        Count(): $mol_number;
        /**
         *  ```
         *  count_hint @ \Count
         *  ```
         **/
        count_hint(): string;
        /**
         *  ```
         *  count?val null
         *  ```
         **/
        count(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Progress $mol_portion portion <= progress
         *  ```
         **/
        Progress(): $$.$mol_portion;
        /**
         *  ```
         *  progress 0.33
         *  ```
         **/
        progress(): number;
        /**
         *  ```
         *  Publish $mol_check_box
         *  	title <= publish_label
         *  	checked?val <=> publish?val
         *  ```
         **/
        Publish(): $mol_check_box;
        /**
         *  ```
         *  publish_label @ \Shared
         *  ```
         **/
        publish_label(): string;
        /**
         *  ```
         *  publish?val false
         *  ```
         **/
        publish(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Drop $mol_button_minor title <= drop_title
         *  ```
         **/
        Drop(): $mol_button_minor;
        /**
         *  ```
         *  drop_title @ \Drop
         *  ```
         **/
        drop_title(): string;
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
    class $mol_unit extends $mol_object {
        'valueOf()': number;
        constructor(value?: number);
        prefix(): string;
        postfix(): string;
        valueOf(): number;
        delimiter(): string;
        value_view(): string;
        toString(): string;
        static summ(a: $mol_unit, b: $mol_unit): any;
        mult(m: number): this;
    }
}

declare namespace $ {
    class $mol_unit_money extends $mol_unit {
    }
    class $mol_unit_money_usd extends $mol_unit_money {
        prefix(): string;
    }
    class $mol_unit_money_rur extends $mol_unit_money {
        postfix(): string;
    }
}

declare namespace $ {
    function $mol_stub_select_random<Value>(list: Value[]): Value;
    function $mol_stub_strings(prefix?: string, count?: number, length?: number): any[];
    function $mol_stub_code(length?: number): string;
    function $mol_stub_price(max?: number): $mol_unit_money_usd;
    function $mol_stub_product_name(): string;
    function $mol_stub_company_name_big(): string;
    function $mol_stub_company_name_small(): string;
    function $mol_stub_company_name(): string;
    function $mol_stub_person_name(): string;
    function $mol_stub_city(): string;
    function $mol_stub_time(maxShift?: number): $mol_time_moment;
}

declare namespace $ {
    class $mol_row_demo_products extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Product catalog
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  count 500
         *  ```
         **/
        count(): number;
        /**
         *  ```
         *  Product!id $mol_card
         *  	minimal_width 140
         *  	minimal_height 100
         *  	content / <= product_title!id
         *  ```
         **/
        Product(id: any): $mol_card;
        /**
         *  ```
         *  product_title!id \
         *  ```
         **/
        product_title(id: any): string;
        /**
         *  ```
         *  sub / <= Catalog
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Catalog $mol_scroll sub / <= Products
         *  ```
         **/
        Catalog(): $mol_scroll;
        /**
         *  ```
         *  Products $mol_row sub <= products
         *  ```
         **/
        Products(): $mol_row;
        /**
         *  ```
         *  products /
         *  ```
         **/
        products(): any[];
    }
}

declare namespace $.$$ {
    class $mol_row_demo_products extends $.$mol_row_demo_products {
        products(): $.$mol_card[];
        product_title(id: string): string;
    }
}

declare namespace $ {
    class $mol_scroll_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Simple scroll pane
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Scroll
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Scroll $mol_scroll sub / <= Content
         *  ```
         **/
        Scroll(): $mol_scroll;
        /**
         *  ```
         *  Content $mol_row sub /
         *  	<= One
         *  	<= Two
         *  	<= Tree
         *  ```
         **/
        Content(): $mol_row;
        /**
         *  ```
         *  One $mol_filler
         *  ```
         **/
        One(): $mol_filler;
        /**
         *  ```
         *  Two $mol_filler
         *  ```
         **/
        Two(): $mol_filler;
        /**
         *  ```
         *  Tree $mol_filler
         *  ```
         **/
        Tree(): $mol_filler;
    }
}

declare namespace $ {
    class $mol_search_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Simple search field with suggest
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Search
         *  ```
         **/
        sub(): any[];
        query(): any;
        /**
         *  ```
         *  Search $mol_search
         *  	query => query
         *  	suggests <= suggests
         *  ```
         **/
        Search(): $mol_search;
        /**
         *  ```
         *  suggests /
         *  ```
         **/
        suggests(): any[];
    }
}

declare namespace $.$$ {
    class $mol_search_demo extends $.$mol_search_demo {
        suggests(): any[];
    }
}

declare namespace $ {
    class $mol_section extends $mol_list {
        /**
         *  ```
         *  rows /
         *  	<= Head
         *  	<= Content
         *  ```
         **/
        rows(): any[];
        /**
         *  ```
         *  Head $mol_view sub / <= head
         *  ```
         **/
        Head(): $mol_view;
        /**
         *  ```
         *  head null
         *  ```
         **/
        head(): any;
        /**
         *  ```
         *  Content null
         *  ```
         **/
        Content(): any;
    }
}

declare namespace $ {
    class $mol_section_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Section with header
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Text
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Text $mol_row sub / <= Section
         *  ```
         **/
        Text(): $mol_row;
        /**
         *  ```
         *  Section $mol_section
         *  	head \Section header
         *  	Content <= Section_content
         *  ```
         **/
        Section(): $mol_section;
        /**
         *  ```
         *  Section_content $mol_filler
         *  ```
         **/
        Section_content(): $mol_filler;
    }
}

declare namespace $ {
    const $mol_colors: {
        aliceblue: string;
        antiquewhite: string;
        aqua: string;
        aquamarine: string;
        azure: string;
        beige: string;
        bisque: string;
        black: string;
        blanchedalmond: string;
        blue: string;
        blueviolet: string;
        brown: string;
        burlywood: string;
        cadetblue: string;
        chartreuse: string;
        chocolate: string;
        coral: string;
        cornflowerblue: string;
        cornsilk: string;
        crimson: string;
        cyan: string;
        darkblue: string;
        darkcyan: string;
        darkgoldenrod: string;
        darkgray: string;
        darkgreen: string;
        darkgrey: string;
        darkkhaki: string;
        darkmagenta: string;
        darkolivegreen: string;
        darkorange: string;
        darkorchid: string;
        darkred: string;
        darksalmon: string;
        darkseagreen: string;
        darkslateblue: string;
        darkslategrey: string;
        darkturquoise: string;
        darkviolet: string;
        deeppink: string;
        deepskyblue: string;
        dimgray: string;
        dimgrey: string;
        dodgerblue: string;
        firebrick: string;
        floralwhite: string;
        forestgreen: string;
        fuchsia: string;
        gainsboro: string;
        ghostwhite: string;
        gold: string;
        goldenrod: string;
        gray: string;
        green: string;
        greenyellow: string;
        grey: string;
        honeydew: string;
        hotpink: string;
        indianred: string;
        indigo: string;
        ivory: string;
        khaki: string;
        lavender: string;
        lavenderblush: string;
        lawngreen: string;
        lemonchiffon: string;
        lightblue: string;
        lightcoral: string;
        lightcyan: string;
        lightgoldenrodyellow: string;
        lightgray: string;
        lightgreen: string;
        lightgrey: string;
        lightpink: string;
        lightsalmon: string;
        lightseagreen: string;
        lightskyblue: string;
        lightslategray: string;
        lightslategrey: string;
        lightsteelblue: string;
        lightyellow: string;
        lime: string;
        limegreen: string;
        linen: string;
        magenta: string;
        maroon: string;
        mediumaquamarine: string;
        mediumblue: string;
        mediumorchid: string;
        mediumpurple: string;
        mediumseagreen: string;
        mediumslateblue: string;
        mediumspringgreen: string;
        mediumturquoise: string;
        mediumvioletred: string;
        midnightblue: string;
        mintcream: string;
        mistyrose: string;
        moccasin: string;
        navajowhite: string;
        navy: string;
        oldlace: string;
        olive: string;
        olivedrab: string;
        orange: string;
        orangered: string;
        orchid: string;
        palegoldenrod: string;
        palegreen: string;
        paleturquoise: string;
        palevioletred: string;
        papayawhip: string;
        peachpuff: string;
        peru: string;
        pink: string;
        plum: string;
        powderblue: string;
        purple: string;
        rebeccapurple: string;
        red: string;
        rosybrown: string;
        royalblue: string;
        saddlebrown: string;
        salmon: string;
        sandybrown: string;
        seagreen: string;
        seashell: string;
        sienna: string;
        silver: string;
        skyblue: string;
        slateblue: string;
        slategray: string;
        slategrey: string;
        snow: string;
        springgreen: string;
        steelblue: string;
        tan: string;
        teal: string;
        thistle: string;
        tomato: string;
        turquoise: string;
        violet: string;
        wheat: string;
        white: string;
        whitesmoke: string;
        yellow: string;
        yellowgreen: string;
    };
}

declare namespace $ {
    class $mol_select_demo_colors extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Color picker with filter and custom rows
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Color
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Color $mol_select
         *  	value?val <=> color?val
         *  	dictionary <= colors
         *  	option_label!id <= color_name!id
         *  	option_content!id <= option_content!id
         *  ```
         **/
        Color(): $mol_select;
        /**
         *  ```
         *  color?val \
         *  ```
         **/
        color(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  colors *
         *  ```
         **/
        colors(): {};
        /**
         *  ```
         *  color_name!id \
         *  ```
         **/
        color_name(id: any): string;
        /**
         *  ```
         *  option_content!id / <= Color_option!id
         *  ```
         **/
        option_content(id: any): any[];
        /**
         *  ```
         *  Color_option!id $mol_row
         *  	sub /
         *  		<= Color_preview!id
         *  		<= color_name!id
         *  	minimal_height 40
         *  ```
         **/
        Color_option(id: any): $mol_row;
        /**
         *  ```
         *  Color_preview!id $mol_select_colors_color_preview color <= option_color!id
         *  ```
         **/
        Color_preview(id: any): $mol_select_colors_color_preview;
        /**
         *  ```
         *  option_color!id \
         *  ```
         **/
        option_color(id: any): string;
    }
}
declare namespace $ {
    class $mol_select_colors_color_preview extends $mol_view {
        /**
         *  ```
         *  style *
         *  	^
         *  	background <= color
         *  ```
         **/
        style(): {
            "background": string;
        };
        /**
         *  ```
         *  color \
         *  ```
         **/
        color(): string;
    }
}

declare namespace $.$$ {
    class $mol_select_demo_colors extends $.$mol_select_demo_colors {
        color_name(id: string): string;
        option_color(id: string): any;
        colors(): {
            aliceblue: string;
            antiquewhite: string;
            aqua: string;
            aquamarine: string;
            azure: string;
            beige: string;
            bisque: string;
            black: string;
            blanchedalmond: string;
            blue: string;
            blueviolet: string;
            brown: string;
            burlywood: string;
            cadetblue: string;
            chartreuse: string;
            chocolate: string;
            coral: string;
            cornflowerblue: string;
            cornsilk: string;
            crimson: string;
            cyan: string;
            darkblue: string;
            darkcyan: string;
            darkgoldenrod: string;
            darkgray: string;
            darkgreen: string;
            darkgrey: string;
            darkkhaki: string;
            darkmagenta: string;
            darkolivegreen: string;
            darkorange: string;
            darkorchid: string;
            darkred: string;
            darksalmon: string;
            darkseagreen: string;
            darkslateblue: string;
            darkslategrey: string;
            darkturquoise: string;
            darkviolet: string;
            deeppink: string;
            deepskyblue: string;
            dimgray: string;
            dimgrey: string;
            dodgerblue: string;
            firebrick: string;
            floralwhite: string;
            forestgreen: string;
            fuchsia: string;
            gainsboro: string;
            ghostwhite: string;
            gold: string;
            goldenrod: string;
            gray: string;
            green: string;
            greenyellow: string;
            grey: string;
            honeydew: string;
            hotpink: string;
            indianred: string;
            indigo: string;
            ivory: string;
            khaki: string;
            lavender: string;
            lavenderblush: string;
            lawngreen: string;
            lemonchiffon: string;
            lightblue: string;
            lightcoral: string;
            lightcyan: string;
            lightgoldenrodyellow: string;
            lightgray: string;
            lightgreen: string;
            lightgrey: string;
            lightpink: string;
            lightsalmon: string;
            lightseagreen: string;
            lightskyblue: string;
            lightslategray: string;
            lightslategrey: string;
            lightsteelblue: string;
            lightyellow: string;
            lime: string;
            limegreen: string;
            linen: string;
            magenta: string;
            maroon: string;
            mediumaquamarine: string;
            mediumblue: string;
            mediumorchid: string;
            mediumpurple: string;
            mediumseagreen: string;
            mediumslateblue: string;
            mediumspringgreen: string;
            mediumturquoise: string;
            mediumvioletred: string;
            midnightblue: string;
            mintcream: string;
            mistyrose: string;
            moccasin: string;
            navajowhite: string;
            navy: string;
            oldlace: string;
            olive: string;
            olivedrab: string;
            orange: string;
            orangered: string;
            orchid: string;
            palegoldenrod: string;
            palegreen: string;
            paleturquoise: string;
            palevioletred: string;
            papayawhip: string;
            peachpuff: string;
            peru: string;
            pink: string;
            plum: string;
            powderblue: string;
            purple: string;
            rebeccapurple: string;
            red: string;
            rosybrown: string;
            royalblue: string;
            saddlebrown: string;
            salmon: string;
            sandybrown: string;
            seagreen: string;
            seashell: string;
            sienna: string;
            silver: string;
            skyblue: string;
            slateblue: string;
            slategray: string;
            slategrey: string;
            snow: string;
            springgreen: string;
            steelblue: string;
            tan: string;
            teal: string;
            thistle: string;
            tomato: string;
            turquoise: string;
            violet: string;
            wheat: string;
            white: string;
            whitesmoke: string;
            yellow: string;
            yellowgreen: string;
            '': string;
        };
    }
}

declare namespace $ {
    class $mol_select_demo_month extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Month picker with filter
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Month
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Month $mol_select
         *  	no_options_message \Not found
         *  	value?val <=> month?val
         *  	dictionary <= months
         *  ```
         **/
        Month(): $mol_select;
        /**
         *  ```
         *  month?val \jan
         *  ```
         **/
        month(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  months *
         *  	jan \January
         *  	feb \February
         *  	mar \March
         *  	apr \April
         *  	may \May
         *  	jun \June
         *  	jul \July
         *  	aug \August
         *  	sep \September
         *  	oct \October
         *  	nov \November
         *  	dec \December
         *  ```
         **/
        months(): {
            "jan": string;
            "feb": string;
            "mar": string;
            "apr": string;
            "may": string;
            "jun": string;
            "jul": string;
            "aug": string;
            "sep": string;
            "oct": string;
            "nov": string;
            "dec": string;
        };
    }
}

declare namespace $ {
    class $mol_select_demo_priority extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Priority picker
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Priority
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Priority $mol_select
         *  	Filter null
         *  	value?val <=> priority?val
         *  	options /
         *  		\Highest
         *  		\High
         *  		\Medium
         *  		\Low
         *  		\Lowest
         *  ```
         **/
        Priority(): $mol_select;
        /**
         *  ```
         *  priority?val \Lowest
         *  ```
         **/
        priority(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_speck extends $mol_view {
        /**
         *  ```
         *  attr * mol_theme \$mol_theme_accent
         *  ```
         **/
        attr(): {
            "mol_theme": string;
        };
        /**
         *  ```
         *  sub / <= value
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  value null
         *  ```
         **/
        value(): any;
    }
}

declare namespace $ {
    class $mol_icon_settings extends $mol_icon {
        /**
         *  ```
         *  path \M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_menu extends $mol_icon {
        /**
         *  ```
         *  path \M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_speck_demo extends $mol_demo_small {
        /**
         *  ```
         *  sub /
         *  	<= Link
         *  	<= String
         *  	<= Button
         *  	<= Card
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Link $mol_link sub /
         *  	<= Link_speck
         *  	<= Link_icon
         *  ```
         **/
        Link(): $mol_link;
        /**
         *  ```
         *  Link_speck $mol_speck value \β
         *  ```
         **/
        Link_speck(): $mol_speck;
        /**
         *  ```
         *  Link_icon $mol_icon_settings
         *  ```
         **/
        Link_icon(): $mol_icon_settings;
        /**
         *  ```
         *  String $mol_view sub /
         *  	<= String_speck
         *  	<= String_field
         *  ```
         **/
        String(): $mol_view;
        /**
         *  ```
         *  String_speck $mol_speck value <= string_speck
         *  ```
         **/
        String_speck(): $mol_speck;
        /**
         *  ```
         *  string_speck @ \New
         *  ```
         **/
        string_speck(): string;
        /**
         *  ```
         *  String_field $mol_string
         *  ```
         **/
        String_field(): $mol_string;
        /**
         *  ```
         *  Button $mol_button_minor sub /
         *  	<= Button_speck
         *  	<= Button_icon
         *  ```
         **/
        Button(): $mol_button_minor;
        /**
         *  ```
         *  Button_speck $mol_speck value <= notification_count
         *  ```
         **/
        Button_speck(): $mol_speck;
        /**
         *  ```
         *  notification_count 8
         *  ```
         **/
        notification_count(): number;
        /**
         *  ```
         *  Button_icon $mol_icon_menu
         *  ```
         **/
        Button_icon(): $mol_icon_menu;
        /**
         *  ```
         *  Card $mol_card
         *  	content / <= Card_speck
         *  	status <= card_status
         *  ```
         **/
        Card(): $mol_card;
        /**
         *  ```
         *  Card_speck $mol_speck
         *  ```
         **/
        Card_speck(): $mol_speck;
        /**
         *  ```
         *  card_status @ \Created
         *  ```
         **/
        card_status(): string;
    }
}

declare namespace $ {
    class $mol_speech extends $mol_plugin {
        static speaker(next?: SpeechSynthesis, force?: $mol_atom_force): SpeechSynthesis;
        static voices(): SpeechSynthesisVoice[];
        static say(text: string): void;
        static speaking(next?: boolean): boolean;
        static hearer(): any;
        static hearing(next?: boolean): boolean;
        static event_result(event?: Event & {
            results: Array<{
                transcript: string;
            }[] & {
                isFinal: boolean;
            }>;
        }): Event & {
            results: ({
                transcript: string;
            }[] & {
                isFinal: boolean;
            })[];
        };
        static recognitions(): ({
            transcript: string;
        }[] & {
            isFinal: boolean;
        })[];
        static commands(): string[];
        static text(): string;
        commands_skip(next?: number): number;
        render(): null;
        event_catch(found?: string[]): void;
        patterns(): readonly string[];
        matchers(): RegExp[];
        prefix(): string;
        suffix(): string;
    }
}

declare namespace $ {
    class $mol_speech_demo extends $mol_demo_small {
        /**
         *  ```
         *  sub /
         *  	<= Toggle
         *  	<= Message
         *  	<= Speak
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Toggle $mol_check_icon
         *  	Icon <= Toggle_icon
         *  	checked?val <=> hearing?val
         *  ```
         **/
        Toggle(): $mol_check_icon;
        /**
         *  ```
         *  Toggle_icon $mol_icon_microphone
         *  ```
         **/
        Toggle_icon(): $mol_icon_microphone;
        /**
         *  ```
         *  hearing?val false
         *  ```
         **/
        hearing(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Message $mol_view sub / <= message
         *  ```
         **/
        Message(): $mol_view;
        /**
         *  ```
         *  message \
         *  ```
         **/
        message(): string;
        /**
         *  ```
         *  Speak $mol_button_major
         *  	click?val <=> speak?val
         *  	sub / \Speak
         *  ```
         **/
        Speak(): $mol_button_major;
        /**
         *  ```
         *  speak?val false
         *  ```
         **/
        speak(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_speech_demo extends $.$mol_speech_demo {
        hearing(next?: boolean): boolean;
        message(): string;
        speak(): void;
    }
}

declare namespace $ {
    class $mol_string_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \String input field in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Simple
         *  	<= Hint
         *  	<= Filled
         *  	<= Disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Simple $mol_string value?val <=> name?val
         *  ```
         **/
        Simple(): $mol_string;
        /**
         *  ```
         *  name?val \
         *  ```
         **/
        name(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Hint $mol_string
         *  	hint \Batman
         *  	value?val <=> name?val
         *  ```
         **/
        Hint(): $mol_string;
        /**
         *  ```
         *  Filled $mol_string value?val <=> name2?val
         *  ```
         **/
        Filled(): $mol_string;
        /**
         *  ```
         *  name2?val \Jocker
         *  ```
         **/
        name2(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Disabled $mol_string
         *  	disabled true
         *  	value?val <=> name2?val
         *  ```
         **/
        Disabled(): $mol_string;
    }
}

declare namespace $ {
    class $mol_switch_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Color switchers in various state
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Enabled
         *  	<= Disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Enabled $mol_switch
         *  	value?val <=> color?val
         *  	options *
         *  		red <= option_red
         *  		green <= option_green
         *  		blue <= option_blue
         *  ```
         **/
        Enabled(): $mol_switch;
        /**
         *  ```
         *  color?val \red
         *  ```
         **/
        color(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  option_red @ \Red
         *  ```
         **/
        option_red(): string;
        /**
         *  ```
         *  option_green @ \Green
         *  ```
         **/
        option_green(): string;
        /**
         *  ```
         *  option_blue @ \Blue
         *  ```
         **/
        option_blue(): string;
        /**
         *  ```
         *  Disabled $mol_switch
         *  	value?val <=> color?val
         *  	enabled false
         *  	options *
         *  		red <= option_red
         *  		green <= option_green
         *  		blue <= option_blue
         *  ```
         **/
        Disabled(): $mol_switch;
    }
}

declare namespace $ {
    class $mol_text_demo extends $mol_demo_large {
        /**
         *  ```
         *  title @ \Markdow visualization example
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub / <= Scroll
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Scroll $mol_scroll sub / <= Text
         *  ```
         **/
        Scroll(): $mol_scroll;
        /**
         *  ```
         *  Text $mol_text text \
         *  	\# [Benchmarks](app/bench)
         *  	\## Benchmark 1
         *  	\### Benchmark 1.1
         *  	\#### Benchmark 1.1.1
         *  	\##### Benchmark 1.1.1.1
         *  	\
         *  	\* [$mol_app_bench_list](app/bench/list) - Frameworks comparison ([online](http://eigenmethod.github.io/mol/app/bench/#becnh=list#sort=fill#))
         *  	\* [ToDoMVC benchmark](https://github.com/eigenmethod/todomvc/tree/master/benchmark) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=http:%2F%2Feigenmethod.github.io%2Ftodomvc%2Fbenchmark%2F#sample=angular2%7Eangularjs%7Eknockoutjs%7Emol%7Epolymer%7Ereact-alt%7Evanillajs%7Evue#sort=fill#))
         *  	\* [WebPageTest - Loading progress of ToDOMVC applications on some frameworks](https://www.webpagetest.org/video/compare.php?tests=161217_V8_6RFK%2C161217_G9_6RFM%2C161217_YZ_6RFN%2C161217_DM_6RFP%2C161217_2B_6RFQ%2C161217_RJ_6RFR%2C161217_2R_6RFS%2C161217_H5_6RFT%2C161217_CW_6RFV&thumbSize=150&ival=100&end=all)
         *  	\* [Line charts comparison](app/bench/chart/rope) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=chart%2Frope%2F/sort=fill/sample=hcharts~mol))
         *  	\* [Bar charts comparison](app/bench/chart/bar) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=chart%2Fbar%2F/sort=fill/sample=hcharts~mol))
         *  	\
         *  	\# Quick start
         *  	\
         *  	\**Create MAM project**
         *  	\
         *  	\Easy way is checkout [this preconfigured ~~PMS~~MAM repository](http://github.com/eigenmethod/mam/) and start dev server:
         *  	\
         *  	\```sh
         *  	\git clone https://github.com/eigenmethod/mam.git ./mam && cd mam
         *  	\npm start
         *  	\```
         *  	\
         *  	\|           | **Column 1** | **Column 2** | **Column 3**
         *  	\|-----------|--------------|--------------|---------
         *  	\| **Row 1** | Cell 1x1     | Cell 2x1     | Cell 3x1
         *  	\| **Row 2** | Cell 1x2     | Cell 2x2     | Cell 3x2
         *  	\| **Row 3** | Cell 1x3     | Cell 2x3     | Cell 3x3
         *  	\| **Row 4** | Cell 1x4     | Cell 2x4     | Cell 3x4
         *  	\| **Row 5** | Cell 1x5     | Cell 2x5     | Cell 3x5
         *  	\| **Row 6** | Cell 1x6     | Cell 2x6     | Cell 3x6
         *  	\| **Row 7** | Cell 1x7     | Cell 2x7     | Cell 3x7
         *  	\| **Row 8** | Cell 1x8     | Cell 2x8     | Cell 3x8
         *  	\| **Row 9** | Cell 1x9     | Cell 2x9     | Cell 3x9
         *  	\
         *  	\Build status: [![Build Status](https://travis-ci.org/eigenmethod/mol.svg?branch=master)](https://travis-ci.org/eigenmethod/mol)
         *  	\
         *  ```
         **/
        Text(): $mol_text;
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
    class $mol_textarea_demo extends $mol_demo_small {
        /**
         *  ```
         *  title @ \Text input field in various states
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Empty_descr
         *  	<= Filled_descr
         *  	<= Disabled
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Empty_descr $mol_textarea
         *  	hint \source code
         *  	value?val <=> empty_descr?val
         *  ```
         **/
        Empty_descr(): $mol_textarea;
        /**
         *  ```
         *  empty_descr?val \
         *  ```
         **/
        empty_descr(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Filled_descr $mol_textarea value?val <=> filled_descr?val
         *  ```
         **/
        Filled_descr(): $mol_textarea;
        /**
         *  ```
         *  filled_descr?val \
         *  	\function hello( name = 'World' ) {
         *  	\	return `Hello, ${ name }!`
         *  	\}
         *  ```
         **/
        filled_descr(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Disabled $mol_textarea
         *  	enabled false
         *  	value?val <=> filled_descr?val
         *  ```
         **/
        Disabled(): $mol_textarea;
    }
}

declare namespace $ {
    class $mol_icon_mol extends $mol_icon {
        /**
         *  ```
         *  view_box \-39 0 287 326
         *  ```
         **/
        view_box(): string;
        /**
         *  ```
         *  path \M183.9,224.1c-4.6,0-8.8,1.3-12.5,3.4l-60.8-66.5V48.9c4.3-1.1,8.2-3.3,11.3-6.3l36.8,26.8c-0.7,2.3-1.1,4.8-1.1,7.4c0,13.7,11.1,24.8,24.8,24.8s24.8-11.1,24.8-24.8S196.2,52,182.5,52c-6.4,0-12.3,2.5-16.7,6.5l-37.2-27.1c0.6-2.1,0.9-4.3,0.9-6.5c0-13.7-11.1-24.8-24.8-24.8S79.9,11.1,79.9,24.8c0,2.6,0.4,5.1,1.2,7.5L42.3,59.2C37.8,54.7,31.6,52,24.8,52C11.1,52,0,63.1,0,76.8s11.1,24.8,24.8,24.8c4.1,0,8-1,11.5-2.8L97.7,166v110.9c-4.2,1.1-8,3.3-11,6.2l-36.8-26.8c0.7-2.3,1.1-4.8,1.1-7.4c0-13.7-11.1-24.8-24.8-24.8S1.4,235.2,1.4,248.9s11.1,24.8,24.8,24.8c6.4,0,12.3-2.5,16.7-6.5l37.2,27.1c-0.6,2.1-0.9,4.3-0.9,6.5c0,13.7,11.1,24.8,24.8,24.8s24.8-11.1,24.8-24.8c0-2.6-0.4-5.1-1.2-7.5l38.8-26.9c4.5,4.5,10.7,7.2,17.5,7.2c13.7,0,24.8-11.1,24.8-24.8S197.6,224.1,183.9,224.1z M182.5,64.9c6.5,0,11.9,5.3,11.9,11.9c0,6.5-5.3,11.9-11.9,11.9c-6.5,0-11.9-5.3-11.9-11.9C170.6,70.2,175.9,64.9,182.5,64.9z M104.7,12.9c6.5,0,11.9,5.3,11.9,11.9c0,6.5-5.3,11.9-11.9,11.9c-6.5,0-11.9-5.3-11.9-11.9C92.8,18.3,98.1,12.9,104.7,12.9z M24.8,88.6c-6.5,0-11.9-5.3-11.9-11.9c0-6.5,5.3-11.9,11.9-11.9s11.9,5.3,11.9,11.9C36.7,83.3,31.3,88.6,24.8,88.6z M45.8,89.9c2.4-3.8,3.8-8.3,3.8-13.2c0-2.2-0.3-4.3-0.8-6.3l39.3-27.3c2.7,2.5,6,4.4,9.6,5.4v98.2L45.8,89.9z M162.3,236.7c-2,3.6-3.2,7.8-3.2,12.2c0,2.2,0.3,4.3,0.9,6.3l-39.3,27.3c-2.8-2.6-6.2-4.5-10-5.5v-96.8L162.3,236.7z M26.2,260.7c-6.5,0-11.9-5.3-11.9-11.9c0-6.5,5.3-11.9,11.9-11.9c6.5,0,11.9,5.3,11.9,11.9C38.1,255.4,32.8,260.7,26.2,260.7z M104,312.7c-6.5,0-11.9-5.3-11.9-11.9c0-6.5,5.3-11.9,11.9-11.9c6.5,0,11.9,5.3,11.9,11.9C115.9,307.4,110.5,312.7,104,312.7z M183.9,260.7c-6.5,0-11.9-5.3-11.9-11.9c0-6.5,5.3-11.9,11.9-11.9c6.5,0,11.9,5.3,11.9,11.9C195.7,255.4,190.4,260.7,183.9,260.7z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    class $mol_app_demo_placeholder extends $mol_book_placeholder {
        /**
         *  ```
         *  sub / <= Content
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Content $mol_card content /
         *  	<= Title
         *  	<= Description
         *  	<= Advantages
         *  	<= Links
         *  ```
         **/
        Content(): $mol_card;
        /**
         *  ```
         *  Title $mol_view sub /
         *  	<= Logo
         *  	<= title
         *  ```
         **/
        Title(): $mol_view;
        /**
         *  ```
         *  Logo $mol_icon_mol
         *  ```
         **/
        Logo(): $mol_icon_mol;
        /**
         *  ```
         *  title \mol
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  Description $mol_view sub / <= description
         *  ```
         **/
        Description(): $mol_view;
        /**
         *  ```
         *  description @ \Reactive micro-modular ui framework. Very simple, but very powerful! $mol has small size of code, reactive architecture, components with adaptive design, that can be easily configured.
         *  ```
         **/
        description(): string;
        /**
         *  ```
         *  Advantages $mol_view sub /
         *  	<= Technology
         *  	<= Code
         *  	<= Programming
         *  ```
         **/
        Advantages(): $mol_view;
        /**
         *  ```
         *  Technology $mol_app_placeholder_advantage
         *  	image \mol/app/demo/placeholder/technology.svg
         *  	title <= technology
         *  ```
         **/
        Technology(): $mol_app_placeholder_advantage;
        /**
         *  ```
         *  technology @ \Flexible adaptive interface
         *  ```
         **/
        technology(): string;
        /**
         *  ```
         *  Code $mol_app_placeholder_advantage
         *  	image \mol/app/demo/placeholder/code_rate.svg
         *  	title <= code_rate
         *  ```
         **/
        Code(): $mol_app_placeholder_advantage;
        /**
         *  ```
         *  code_rate @ \Quick and easy development
         *  ```
         **/
        code_rate(): string;
        /**
         *  ```
         *  Programming $mol_app_placeholder_advantage
         *  	image \mol/app/demo/placeholder/programming.svg
         *  	title <= programming
         *  ```
         **/
        Programming(): $mol_app_placeholder_advantage;
        /**
         *  ```
         *  programming @ \High-speed applications
         *  ```
         **/
        programming(): string;
        /**
         *  ```
         *  Links $mol_row sub /
         *  	<= Github_link
         *  	<= Showcase_link
         *  ```
         **/
        Links(): $mol_row;
        /**
         *  ```
         *  Github_link $mol_link_iconed uri \https://github.com/eigenmethod/mol
         *  ```
         **/
        Github_link(): $$.$mol_link_iconed;
        /**
         *  ```
         *  Showcase_link $mol_link_iconed
         *  	title <= showcase_title
         *  	uri \https://showcase.hyoo.ru
         *  ```
         **/
        Showcase_link(): $$.$mol_link_iconed;
        /**
         *  ```
         *  showcase_title @ \Applications showcase
         *  ```
         **/
        showcase_title(): string;
    }
}
declare namespace $ {
    class $mol_app_placeholder_advantage extends $mol_view {
        /**
         *  ```
         *  sub /
         *  	<= Image
         *  	<= title
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Image $mol_image uri <= image
         *  ```
         **/
        Image(): $mol_image;
        /**
         *  ```
         *  image \
         *  ```
         **/
        image(): string;
        /**
         *  ```
         *  title \
         *  ```
         **/
        title(): string;
    }
}

declare namespace $ {
    class $mol_icon_source extends $mol_icon {
        /**
         *  ```
         *  path \M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z
         *  ```
         **/
        path(): string;
    }
}

declare namespace $ {
    function $mol_typeof(value: any): any;
}

declare namespace $ {
    type $mol_tree_path = Array<string | number | null>;
    type $mol_tree_hack = (input: $mol_tree, context: $mol_tree_context) => $mol_tree[];
    type $mol_tree_context = Record<string, $mol_tree_hack>;
    type $mol_tree_library = Record<string, $mol_tree_context>;
    class $mol_tree {
        type: string;
        data: string;
        sub: $mol_tree[];
        baseUri: string;
        row: number;
        col: number;
        constructor(config?: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        });
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        }): $mol_tree;
        static fromString(str: string, baseUri?: string): $mol_tree;
        static fromJSON(json: any, baseUri?: string): $mol_tree;
        readonly uri: string;
        toString(prefix?: string): string;
        toJSON(): any;
        readonly value: string;
        insert(value: $mol_tree, ...path: $mol_tree_path): $mol_tree;
        select(...path: $mol_tree_path): $mol_tree;
        filter(path: string[], value?: string): $mol_tree;
        transform(visit: (stack: $mol_tree[], sub: () => $mol_tree[]) => $mol_tree | null, stack?: $mol_tree[]): $mol_tree | null;
        hack(context: $mol_tree_context): $mol_tree;
        error(message: string): Error;
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
    function $mol_view_tree_value_type(val: $mol_tree): "string" | "object" | "number" | "null" | "locale" | "list" | "bool" | "dict" | "get" | "bind" | "put";
    function $mol_view_tree_compile(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}

declare namespace $ {
    class $mol_app_studio_field extends $mol_expander {
        /**
         *  ```
         *  path /
         *  ```
         **/
        path(): any[];
        /**
         *  ```
         *  Trigger $mol_app_studio_field_title
         *  	checked?val <=> expanded?val
         *  	Title <= Trigger_label
         *  	type <= type
         *  ```
         **/
        Trigger(): $mol_app_studio_field_title;
        /**
         *  ```
         *  expanded?val false
         *  ```
         **/
        expanded(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Trigger_label $mol_dimmer
         *  	needle <= highlight
         *  	haystack <= title
         *  ```
         **/
        Trigger_label(): $mol_dimmer;
        /**
         *  ```
         *  highlight \
         *  ```
         **/
        highlight(): string;
        /**
         *  ```
         *  tools /
         *  	<= Type
         *  	<= Object
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Type $mol_select
         *  	value?val <=> type?val
         *  	hint <= type_hint
         *  	Trigger_icon null
         *  	dictionary <= types
         *  ```
         **/
        Type(): $mol_select;
        /**
         *  ```
         *  type?val \null
         *  ```
         **/
        type(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  type_hint @ \Type...
         *  ```
         **/
        type_hint(): string;
        /**
         *  ```
         *  types *
         *  	get \<=
         *  	bind \<=>
         *  	object \Object
         *  	string \Text
         *  	locale \Localization
         *  	number \Number
         *  	bool \Flag
         *  	list \List
         *  	dict \Dictionary
         *  	null \None
         *  ```
         **/
        types(): {
            "get": string;
            "bind": string;
            "object": string;
            "string": string;
            "locale": string;
            "number": string;
            "bool": string;
            "list": string;
            "dict": string;
            "null": string;
        };
        /**
         *  ```
         *  Object $mol_select
         *  	value?val <=> class?val
         *  	options <= object_options
         *  	hint <= object_hint
         *  	Trigger_icon null
         *  ```
         **/
        Object(): $mol_select;
        /**
         *  ```
         *  class?val null
         *  ```
         **/
        class(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  object_options /
         *  ```
         **/
        object_options(): any[];
        /**
         *  ```
         *  object_hint @ \Class...
         *  ```
         **/
        object_hint(): string;
        /**
         *  ```
         *  content /
         *  	<= Bool
         *  	<= Number
         *  	<= String
         *  	<= Bind
         *  	<= List
         *  	<= Dict
         *  	<= Overs
         *  ```
         **/
        content(): any[];
        /**
         *  ```
         *  Bool $mol_switch
         *  	value?val <=> value_bool?val
         *  	options *
         *  		true \True
         *  		false \False
         *  ```
         **/
        Bool(): $mol_switch;
        /**
         *  ```
         *  value_bool?val null
         *  ```
         **/
        value_bool(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Number $mol_number
         *  	value?val <=> value_number?val
         *  	hint <= hint
         *  ```
         **/
        Number(): $mol_number;
        /**
         *  ```
         *  value_number?val NaN
         *  ```
         **/
        value_number(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  hint \
         *  ```
         **/
        hint(): string;
        /**
         *  ```
         *  String $mol_textarea
         *  	value?val <=> value_string?val
         *  	hint <= hint
         *  ```
         **/
        String(): $mol_textarea;
        /**
         *  ```
         *  value_string?val null
         *  ```
         **/
        value_string(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Bind $mol_select
         *  	value?val <=> bind?val
         *  	options <= bind_options
         *  	hint <= bind_hint
         *  	No_options <= Prop_add
         *  	Trigger_icon null
         *  ```
         **/
        Bind(): $mol_select;
        /**
         *  ```
         *  bind?val null
         *  ```
         **/
        bind(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  bind_options /
         *  ```
         **/
        bind_options(): any[];
        /**
         *  ```
         *  bind_hint @ \Property..
         *  ```
         **/
        bind_hint(): string;
        /**
         *  ```
         *  Prop_add $mol_button_minor
         *  	title <= prop_add_label
         *  	event_click?val <=> event_prop_add?val
         *  ```
         **/
        Prop_add(): $mol_button_minor;
        /**
         *  ```
         *  prop_add_label @ \Add property
         *  ```
         **/
        prop_add_label(): string;
        /**
         *  ```
         *  event_prop_add?val null
         *  ```
         **/
        event_prop_add(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  List $mol_list rows /
         *  	<= list_rows
         *  	<= Add
         *  ```
         **/
        List(): $mol_list;
        /**
         *  ```
         *  list_rows /
         *  ```
         **/
        list_rows(): any[];
        /**
         *  ```
         *  Add $mol_select
         *  	hint <= add_hint
         *  	value?val <=> add_item?val
         *  	dictionary <= item_types
         *  	Trigger_icon <= List_trigger_icon
         *  ```
         **/
        Add(): $mol_select;
        /**
         *  ```
         *  add_hint @ \Add item..
         *  ```
         **/
        add_hint(): string;
        /**
         *  ```
         *  add_item?val \
         *  ```
         **/
        add_item(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  item_types *
         *  	get \<=
         *  	string \Text
         *  	number \Number
         *  	bool \Flag
         *  	list \List
         *  	dict \Dictionary
         *  	null \None
         *  ```
         **/
        item_types(): {
            "get": string;
            "string": string;
            "number": string;
            "bool": string;
            "list": string;
            "dict": string;
            "null": string;
        };
        /**
         *  ```
         *  List_trigger_icon $mol_icon_plus
         *  ```
         **/
        List_trigger_icon(): $mol_icon_plus;
        /**
         *  ```
         *  Dict $mol_list rows /
         *  	<= pairs
         *  	<= Add_pair
         *  ```
         **/
        Dict(): $mol_list;
        /**
         *  ```
         *  pairs /
         *  ```
         **/
        pairs(): any[];
        /**
         *  ```
         *  Add_pair $mol_bar sub /
         *  	<= Add_pair_key
         *  	<= Add_pair_submit
         *  ```
         **/
        Add_pair(): $mol_bar;
        /**
         *  ```
         *  Add_pair_key $mol_search
         *  	hint <= add_pair_hint
         *  	query?val <=> add_pair_key?val
         *  	suggests <= key_suggests
         *  ```
         **/
        Add_pair_key(): $mol_search;
        /**
         *  ```
         *  add_pair_hint @ \Add key..
         *  ```
         **/
        add_pair_hint(): string;
        /**
         *  ```
         *  add_pair_key?val \
         *  ```
         **/
        add_pair_key(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  key_suggests /
         *  ```
         **/
        key_suggests(): any[];
        /**
         *  ```
         *  Add_pair_submit $mol_button_minor
         *  	event_click?val <=> add_pair?val
         *  	sub / <= Add_pair_submit_icon
         *  ```
         **/
        Add_pair_submit(): $mol_button_minor;
        /**
         *  ```
         *  add_pair?val \
         *  ```
         **/
        add_pair(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Add_pair_submit_icon $mol_icon_plus
         *  ```
         **/
        Add_pair_submit_icon(): $mol_icon_plus;
        /**
         *  ```
         *  Overs $mol_list rows /
         *  	<= overs
         *  	<= Add_over
         *  ```
         **/
        Overs(): $mol_list;
        /**
         *  ```
         *  overs /
         *  ```
         **/
        overs(): any[];
        /**
         *  ```
         *  Add_over $mol_select
         *  	hint <= add_over_hint
         *  	value?val <=> add_over?val
         *  	Trigger_icon <= Overs_trigger_icon
         *  	options <= over_options
         *  ```
         **/
        Add_over(): $mol_select;
        /**
         *  ```
         *  add_over_hint @ \Add override..
         *  ```
         **/
        add_over_hint(): string;
        /**
         *  ```
         *  add_over?val \
         *  ```
         **/
        add_over(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Overs_trigger_icon $mol_icon_plus
         *  ```
         **/
        Overs_trigger_icon(): $mol_icon_plus;
        /**
         *  ```
         *  over_options /
         *  ```
         **/
        over_options(): any[];
        /**
         *  ```
         *  Prop!id $mol_app_studio_field
         *  	path <= prop_path!id
         *  	prop_arg!id <= prop_arg!id
         *  	prop!path?val <=> prop!path?val
         *  	props!name?val <=> props!name?val
         *  	prop_value!id <= prop_value!id
         *  	bind_options <= bind_options
         *  	prop_add?val <=> prop_add?val
         *  	object_options <= object_options
         *  ```
         **/
        Prop(id: any): $mol_app_studio_field;
        /**
         *  ```
         *  prop_path!id /
         *  ```
         **/
        prop_path(id: any): any[];
        /**
         *  ```
         *  prop_arg!id *
         *  ```
         **/
        prop_arg(id: any): {};
        /**
         *  ```
         *  prop!path?val $mol_tree
         *  ```
         **/
        prop(path: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  props!name?val $mol_tree
         *  ```
         **/
        props(name: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  prop_value!id null
         *  ```
         **/
        prop_value(id: any): any;
        /**
         *  ```
         *  prop_add?val null
         *  ```
         **/
        prop_add(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_studio_field_title extends $mol_check_expand {
        /**
         *  ```
         *  attr *
         *  	^
         *  	mol_app_studio_field_title_type <= type
         *  ```
         **/
        attr(): {
            "mol_app_studio_field_title_type": string;
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
        /**
         *  ```
         *  type \null
         *  ```
         **/
        type(): string;
    }
}

declare namespace $.$$ {
    class $mol_app_studio_field extends $.$mol_app_studio_field {
        prop_current(next?: $mol_tree): $mol_tree;
        title(): string;
        title_arg(): {};
        value(next?: $mol_tree): $mol_tree;
        type(next?: string): "string" | "object" | "number" | "null" | "locale" | "list" | "bool" | "dict" | "get" | "bind" | "put";
        expanded(next?: boolean): boolean;
        class(next?: string): string;
        bind(next?: string): string;
        value_bool(next?: string): string;
        value_number(next?: string): string;
        value_string(next?: string): string;
        pairs(): $.$mol_app_studio_field[];
        overs(): $.$mol_app_studio_field[];
        hint(): any;
        tools(): $.$mol_select[];
        content(): ($.$mol_list | $.$mol_switch | $.$mol_number | $.$mol_textarea)[];
        item_value(index: number, next?: string): string;
        item_class(index: number, next?: string): string;
        list_rows(): $.$mol_app_studio_field[];
        prop_path(path: $mol_tree_path): (string | number)[];
        add_item(type?: string): string;
        over_options(): string[];
        add_over(name?: string): string;
        add_pair(event?: Event): string;
        event_prop_add(event?: Event): void;
    }
}

declare namespace $ {
    class $mol_app_studio extends $mol_book {
        /**
         *  ```
         *  value_overrided!id?val null
         *  ```
         **/
        value_overrided(id: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  pages /
         *  	<= Preview_page
         *  	<= Editor_page
         *  	<= Source_page
         *  ```
         **/
        pages(): any[];
        /**
         *  ```
         *  Preview_page $mol_page
         *  	title <= preview_title
         *  	tools /
         *  		<= Source_link
         *  		<= Edit
         *  		<= tools_main
         *  	body / <= Selector
         *  	minimal_width 400
         *  ```
         **/
        Preview_page(): $mol_page;
        /**
         *  ```
         *  preview_title @ \Preview:
         *  ```
         **/
        preview_title(): string;
        /**
         *  ```
         *  Source_link $mol_link
         *  	hint <= source_title
         *  	sub / <= Source_icon
         *  	arg <= source_arg
         *  ```
         **/
        Source_link(): $mol_link;
        /**
         *  ```
         *  Source_icon $mol_icon_source
         *  ```
         **/
        Source_icon(): $mol_icon_source;
        /**
         *  ```
         *  source_arg *
         *  	source \
         *  	path null
         *  ```
         **/
        source_arg(): {
            "source": string;
            "path": any;
        };
        /**
         *  ```
         *  Edit $mol_link
         *  	hint <= editor_title
         *  	sub / <= Edit_icon
         *  	arg *
         *  		path \
         *  		source null
         *  ```
         **/
        Edit(): $mol_link;
        /**
         *  ```
         *  Edit_icon $mol_icon_settings
         *  ```
         **/
        Edit_icon(): $mol_icon_settings;
        /**
         *  ```
         *  tools_main /
         *  ```
         **/
        tools_main(): any[];
        /**
         *  ```
         *  Selector $mol_app_studio_selector
         *  	sub / <= Block
         *  	path?val <=> path?val
         *  ```
         **/
        Selector(): $mol_app_studio_selector;
        /**
         *  ```
         *  Block $mol_view
         *  ```
         **/
        Block(): $mol_view;
        /**
         *  ```
         *  path?val /
         *  ```
         **/
        path(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Editor_page $mol_page
         *  	plugins / <= Speech_filter
         *  	title <= editor_title
         *  	event_top?val <=> event_front_up?val
         *  	tools / <= Editor_close
         *  	body /
         *  		<= Filter_bar
         *  		<= Fields
         *  	minimal_width 400
         *  ```
         **/
        Editor_page(): $mol_page;
        /**
         *  ```
         *  Speech_filter $mol_speech
         *  	event_catch?val <=> speech_filter?val
         *  	patterns <= speech_filter_patterns
         *  ```
         **/
        Speech_filter(): $mol_speech;
        /**
         *  ```
         *  speech_filter?val null
         *  ```
         **/
        speech_filter(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  speech_filter_patterns / \find (.+?)
         *  ```
         **/
        speech_filter_patterns(): any[];
        /**
         *  ```
         *  editor_title @ \Properties
         *  ```
         **/
        editor_title(): string;
        /**
         *  ```
         *  Editor_close $mol_link
         *  	sub / <= Editor_close_icon
         *  	arg <= editor_close_arg
         *  ```
         **/
        Editor_close(): $mol_link;
        /**
         *  ```
         *  Editor_close_icon $mol_icon_cross
         *  ```
         **/
        Editor_close_icon(): $mol_icon_cross;
        /**
         *  ```
         *  editor_close_arg * path null
         *  ```
         **/
        editor_close_arg(): {
            "path": any;
        };
        /**
         *  ```
         *  Filter_bar $mol_bar sub <= filter_bar_items
         *  ```
         **/
        Filter_bar(): $mol_bar;
        /**
         *  ```
         *  filter_bar_items /
         *  	<= Filter
         *  	<= Prop_add
         *  ```
         **/
        filter_bar_items(): any[];
        /**
         *  ```
         *  Filter $mol_search
         *  	hint <= filter_hint
         *  	query?val <=> prop_filter?val
         *  ```
         **/
        Filter(): $mol_search;
        /**
         *  ```
         *  filter_hint @ \Filter properties
         *  ```
         **/
        filter_hint(): string;
        /**
         *  ```
         *  prop_filter?val \
         *  ```
         **/
        prop_filter(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Prop_add $mol_button_minor
         *  	event_click?val <=> event_add?val
         *  	sub / <= Prop_add_icon
         *  	hint <= prop_add_hint
         *  ```
         **/
        Prop_add(): $mol_button_minor;
        /**
         *  ```
         *  event_add?val null
         *  ```
         **/
        event_add(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Prop_add_icon $mol_icon_plus
         *  ```
         **/
        Prop_add_icon(): $mol_icon_plus;
        /**
         *  ```
         *  prop_add_hint @ \Add this property
         *  ```
         **/
        prop_add_hint(): string;
        /**
         *  ```
         *  Fields $mol_list rows <= fields
         *  ```
         **/
        Fields(): $mol_list;
        /**
         *  ```
         *  fields /
         *  ```
         **/
        fields(): any[];
        /**
         *  ```
         *  Source_page $mol_page
         *  	title <= source_title
         *  	minimal_width 400
         *  	tools / <= Source_close
         *  	body / <= Source
         *  ```
         **/
        Source_page(): $mol_page;
        /**
         *  ```
         *  source_title @ \Source code
         *  ```
         **/
        source_title(): string;
        /**
         *  ```
         *  Source_close $mol_link
         *  	sub / <= Source_close_icon
         *  	arg <= source_close_arg
         *  ```
         **/
        Source_close(): $mol_link;
        /**
         *  ```
         *  Source_close_icon $mol_icon_cross
         *  ```
         **/
        Source_close_icon(): $mol_icon_cross;
        /**
         *  ```
         *  source_close_arg * source null
         *  ```
         **/
        source_close_arg(): {
            "source": any;
        };
        /**
         *  ```
         *  Source $mol_text text <= source
         *  ```
         **/
        Source(): $mol_text;
        /**
         *  ```
         *  source \
         *  ```
         **/
        source(): string;
        /**
         *  ```
         *  Placeholder null
         *  ```
         **/
        Placeholder(): any;
        /**
         *  ```
         *  Prop!id $mol_app_studio_field
         *  	path <= prop_path!id
         *  	prop!path?val <=> prop_default!path?val
         *  	props!name?val <=> props_all!name?val
         *  	prop_arg!id <= prop_arg!id
         *  	prop_value!id <= prop_value_base!id
         *  	bind_options <= prop_options
         *  	object_options <= view_options
         *  	prop_add?val <=> prop_add?val
         *  	highlight <= prop_filter
         *  ```
         **/
        Prop(id: any): $mol_app_studio_field;
        /**
         *  ```
         *  prop_path!id /
         *  ```
         **/
        prop_path(id: any): any[];
        /**
         *  ```
         *  prop_default!path?val $mol_tree
         *  ```
         **/
        prop_default(path: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  props_all!name?val $mol_tree
         *  ```
         **/
        props_all(name: any, val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  prop_arg!id *
         *  ```
         **/
        prop_arg(id: any): {};
        /**
         *  ```
         *  prop_value_base!id null
         *  ```
         **/
        prop_value_base(id: any): any;
        /**
         *  ```
         *  prop_options /
         *  ```
         **/
        prop_options(): any[];
        /**
         *  ```
         *  view_options /
         *  ```
         **/
        view_options(): any[];
        /**
         *  ```
         *  prop_add?val \
         *  ```
         **/
        prop_add(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  class_name_self?val \App
         *  ```
         **/
        class_name_self(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  class_name_base?val \$mol_view
         *  ```
         **/
        class_name_base(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  class_self?val $mol_tree
         *  ```
         **/
        class_self(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  classes $mol_tree
         *  ```
         **/
        classes(): $mol_tree;
    }
}
declare namespace $ {
    class $mol_app_studio_selector extends $mol_demo_large {
        /**
         *  ```
         *  event *
         *  	contextmenu?event <=> select?event
         *  	dblclick?event <=> select?event
         *  ```
         **/
        event(): {
            "contextmenu": (event?: any) => any;
            "dblclick": (event?: any) => any;
        };
        /**
         *  ```
         *  select?event null
         *  ```
         **/
        select(event?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  path?val /
         *  ```
         **/
        path(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $.$$ {
    class $mol_app_studio extends $.$mol_app_studio {
        pages(): $.$mol_page[];
        classes_static(): $mol_tree;
        classes(next?: $mol_tree): $mol_tree;
        class(name: string, next?: $mol_tree): $mol_tree;
        class_self(next?: $mol_tree): $mol_tree;
        props_self(name: string): $mol_tree;
        props_all(name: string, next?: $mol_tree, force?: $mol_atom_force): $mol_tree;
        view_class(name: string): any;
        filter_bar_items(): ($mol_button_minor | $.$mol_search)[];
        fields(): $.$mol_app_studio_field[];
        prop_overs(path: $mol_tree_path): string[];
        prop_path(path: $mol_tree_path): (string | number)[];
        prop_title(path: $mol_tree_path): string | number;
        prop_arg(path: $mol_tree_path): {
            path: string;
        };
        prop(path: $mol_tree_path, next?: $mol_tree): $mol_tree;
        prop_self(path: $mol_tree_path): $mol_tree;
        prop_type(path: $mol_tree_path): "string" | "object" | "number" | "null" | "locale" | "list" | "bool" | "dict" | "get" | "bind" | "put";
        prop_key(path: $mol_tree_path, next?: string): string;
        prop_next(path: $mol_tree_path, next?: string): string;
        prop_default(path: $mol_tree_path, next?: $mol_tree): $mol_tree;
        path(next?: $mol_tree_path): $mol_tree_path;
        view_options(): string[];
        prop_options(): string[];
        overrided_all(next?: {
            [key: string]: any;
        }): {
            [key: string]: any;
        };
        overrided(key: string, next?: any): any;
        prop_value_base(path: $mol_tree_path, next?: any): any;
        prop_class(path: $mol_tree_path, next?: string): string;
        prop_value_view(path: $mol_tree_path, next?: string): any;
        Element(path: $mol_tree_path): $mol_view;
        Block(): $mol_view;
        preview_title(): string;
        event_add(event?: Event): void;
        prop_add(name: string): void;
        speech_enabled(next?: boolean): boolean;
        speech_filter([filter]: string[]): void;
        source_show(): boolean;
        source(): string;
    }
    class $mol_app_studio_selector extends $.$mol_app_studio_selector {
        select(event?: Event): void;
    }
}

declare namespace $ {
    class $mol_status extends $mol_view {
        /**
         *  ```
         *  status null
         *  ```
         **/
        status(): any;
        /**
         *  ```
         *  minimal_height 24
         *  ```
         **/
        minimal_height(): number;
        /**
         *  ```
         *  minimal_width 0
         *  ```
         **/
        minimal_width(): number;
        /**
         *  ```
         *  sub / <= message
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  message \
         *  ```
         **/
        message(): string;
    }
}

declare namespace $.$$ {
    class $mol_status extends $.$mol_status {
        message(): any;
    }
}

declare namespace $ {
    class $mol_app_demo extends $mol_book {
        /**
         *  ```
         *  editor_title <= detail_title
         *  ```
         **/
        editor_title(): string;
        /**
         *  ```
         *  detail_title \$mol
         *  ```
         **/
        detail_title(): string;
        /**
         *  ```
         *  source_prefix \https://github.com/eigenmethod/mol/tree/master/
         *  ```
         **/
        source_prefix(): string;
        /**
         *  ```
         *  Placeholder $mol_app_demo_placeholder
         *  ```
         **/
        Placeholder(): $mol_app_demo_placeholder;
        /**
         *  ```
         *  pages <= blocks
         *  ```
         **/
        pages(): any[];
        /**
         *  ```
         *  blocks /
         *  ```
         **/
        blocks(): any[];
        /**
         *  ```
         *  attr * mol_theme <= theme
         *  ```
         **/
        attr(): {
            "mol_theme": any;
        };
        /**
         *  ```
         *  Menu $mol_app_demo_menu
         *  	hierarchy <= nav_hierarchy
         *  	option!id <= nav_option!id
         *  	filter?val <=> filter_string?val
         *  	theme?val <=> theme?val
         *  ```
         **/
        Menu(): $mol_app_demo_menu;
        /**
         *  ```
         *  nav_hierarchy null
         *  ```
         **/
        nav_hierarchy(): any;
        /**
         *  ```
         *  nav_option!id null
         *  ```
         **/
        nav_option(id: any): any;
        /**
         *  ```
         *  filter_string?val \
         *  ```
         **/
        filter_string(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  theme?val \$mol_theme_dark
         *  ```
         **/
        theme(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Detail $mol_app_demo_detail
         *  	minimal_width 600
         *  	title <= detail_title
         *  	source_link <= source_link
         *  	body / <= Detail_list
         *  	event_top?val <=> event_front_up?val
         *  ```
         **/
        Detail(): $mol_app_demo_detail;
        /**
         *  ```
         *  source_link \
         *  ```
         **/
        source_link(): string;
        /**
         *  ```
         *  Detail_list $mol_list rows <= main_content
         *  ```
         **/
        Detail_list(): $mol_list;
        /**
         *  ```
         *  main_content /
         *  ```
         **/
        main_content(): any[];
        /**
         *  ```
         *  Editor!id $mol_app_studio
         *  	minimal_width 1000
         *  	title <= editor_title
         *  	class_name_base <= selected_class_name
         *  	tools_main / <= Close
         *  ```
         **/
        Editor(id: any): $mol_app_studio;
        /**
         *  ```
         *  selected_class_name \
         *  ```
         **/
        selected_class_name(): string;
        /**
         *  ```
         *  Close $mol_link
         *  	sub / <= Close_icon
         *  	arg <= close_arg
         *  ```
         **/
        Close(): $mol_link;
        /**
         *  ```
         *  Close_icon $mol_icon_cross
         *  ```
         **/
        Close_icon(): $mol_icon_cross;
        /**
         *  ```
         *  close_arg * edit null
         *  ```
         **/
        close_arg(): {
            "edit": any;
        };
        /**
         *  ```
         *  Welcome $mol_scroll sub / <= Welcome_text
         *  ```
         **/
        Welcome(): $mol_scroll;
        /**
         *  ```
         *  Welcome_text $mol_text text <= welcome_text
         *  ```
         **/
        Welcome_text(): $mol_text;
        /**
         *  ```
         *  welcome_text \
         *  ```
         **/
        welcome_text(): string;
        /**
         *  ```
         *  Detail_empty_message $mol_status sub /
         *  	<= detail_empty_prefix
         *  	<= selected
         *  	<= detail_empty_postfix
         *  ```
         **/
        Detail_empty_message(): $mol_status;
        /**
         *  ```
         *  detail_empty_prefix @ \No one demo with prefix "
         *  ```
         **/
        detail_empty_prefix(): string;
        /**
         *  ```
         *  selected \
         *  ```
         **/
        selected(): string;
        /**
         *  ```
         *  detail_empty_postfix @ \"
         *  ```
         **/
        detail_empty_postfix(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_menu extends $mol_page {
        /**
         *  ```
         *  minimal_width 240
         *  ```
         **/
        minimal_width(): number;
        /**
         *  ```
         *  title @ \$mol demonstrations
         *  ```
         **/
        title(): string;
        /**
         *  ```
         *  sub /
         *  	<= Head
         *  	<= Filter
         *  	<= Nav
         *  	<= Themes
         *  ```
         **/
        sub(): any[];
        /**
         *  ```
         *  Filter $mol_search query?val <=> filter?val
         *  ```
         **/
        Filter(): $mol_search;
        /**
         *  ```
         *  filter?val \
         *  ```
         **/
        filter(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  Nav $mol_app_demo_nav
         *  	hierarchy <= hierarchy
         *  	record!id <= option!id
         *  	needle <= filter?val
         *  ```
         **/
        Nav(): $mol_app_demo_nav;
        /**
         *  ```
         *  hierarchy null
         *  ```
         **/
        hierarchy(): any;
        /**
         *  ```
         *  option!id null
         *  ```
         **/
        option(id: any): any;
        /**
         *  ```
         *  Themes $mol_switch
         *  	value?val <=> theme?val
         *  	options *
         *  		$mol_theme_light <= theme_light_title
         *  		$mol_theme_dark <= theme_dark_title
         *  ```
         **/
        Themes(): $mol_switch;
        /**
         *  ```
         *  theme?val \$mol_theme_dark
         *  ```
         **/
        theme(val?: any, force?: $mol_atom_force): any;
        /**
         *  ```
         *  theme_light_title @ \Light theme
         *  ```
         **/
        theme_light_title(): string;
        /**
         *  ```
         *  theme_dark_title @ \Dark theme
         *  ```
         **/
        theme_dark_title(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_detail extends $mol_page {
        /**
         *  ```
         *  tools /
         *  	<= Source_link
         *  	<= Edit
         *  	<= Close
         *  ```
         **/
        tools(): any[];
        /**
         *  ```
         *  Source_link $mol_link_iconed
         *  	title \
         *  	uri <= source_link
         *  	target \_blank
         *  ```
         **/
        Source_link(): $$.$mol_link_iconed;
        /**
         *  ```
         *  source_link \
         *  ```
         **/
        source_link(): string;
        /**
         *  ```
         *  Edit $mol_link
         *  	sub /
         *  		<= Edit_speck
         *  		<= Edit_icon
         *  	arg *
         *  		edit \
         *  		path \
         *  ```
         **/
        Edit(): $mol_link;
        /**
         *  ```
         *  Edit_speck $mol_speck value \β
         *  ```
         **/
        Edit_speck(): $mol_speck;
        /**
         *  ```
         *  Edit_icon $mol_icon_settings
         *  ```
         **/
        Edit_icon(): $mol_icon_settings;
        /**
         *  ```
         *  Close $mol_link
         *  	sub / <= Close_icon
         *  	arg <= close_arg
         *  ```
         **/
        Close(): $mol_link;
        /**
         *  ```
         *  Close_icon $mol_icon_cross
         *  ```
         **/
        Close_icon(): $mol_icon_cross;
        /**
         *  ```
         *  close_arg * demo null
         *  ```
         **/
        close_arg(): {
            "demo": any;
        };
    }
}
declare namespace $ {
    class $mol_app_demo_nav extends $mol_grid {
        /**
         *  ```
         *  row_height 40
         *  ```
         **/
        row_height(): number;
        /**
         *  ```
         *  hierarchy_col \title
         *  ```
         **/
        hierarchy_col(): string;
        /**
         *  ```
         *  Head null
         *  ```
         **/
        Head(): any;
        /**
         *  ```
         *  Option!id $mol_link
         *  	arg <= arg!id
         *  	sub /
         *  		<= Expand!id
         *  		<= Content!id
         *  ```
         **/
        Option(id: any): $mol_link;
        /**
         *  ```
         *  arg!id *
         *  ```
         **/
        arg(id: any): {};
        /**
         *  ```
         *  Expand!id $mol_check_expand
         *  	expanded?val <=> cell_expanded!id?val
         *  	level <= cell_level!id
         *  ```
         **/
        Expand(id: any): $$.$mol_check_expand;
        /**
         *  ```
         *  Content!id $mol_view sub / <= cell_content!id
         *  ```
         **/
        Content(id: any): $mol_view;
    }
}

declare namespace $.$$ {
    class $mol_app_demo extends $.$mol_app_demo {
        detail_title(): string;
        theme(next?: '$mol_theme_light' | '$mol_theme_dark'): any;
        names_demo_all(): string[];
        names_demo_filtered(): string[];
        nav_hierarchy(): {
            [prefix: string]: $mol_grid_node;
        };
        nav_option(id: string): {
            title: string;
        };
        selected(): string;
        selected_class_name(): string;
        editing(): boolean;
        Widget(name: string): $mol_view;
        names_demo(): string[];
        blocks(): $mol_view[];
        Placeholder(): $mol_app_demo_placeholder;
        main_content(): $mol_view[] | $.$mol_status[];
        logo_uri(): string;
        source_link(): string;
        chat_link(): string;
    }
    class $mol_app_demo_nav extends $.$mol_app_demo_nav {
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        arg(id: {
            row: string[];
            col: string;
        }): {
            'demo': string;
        };
    }
}
