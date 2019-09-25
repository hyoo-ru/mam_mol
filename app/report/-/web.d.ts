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
    class $mol_state_time extends $mol_object {
        static now(precision?: number, next?: number, force?: $mol_atom_force): number;
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
    class $mol_pop extends $mol_view {
        event(): {
            "keydown": (event?: any) => any;
        };
        keydown(event?: any, force?: $mol_atom_force): any;
        showed(val?: any, force?: $mol_atom_force): any;
        plugins(): any[];
        top(): any;
        bottom(): any;
        left(): any;
        right(): any;
        Meter(): $mol_meter;
        sub(): any[];
        Anchor(): any;
        Bubble(): $mol_pop_bubble;
        align(): string;
        bubble_content(): any[];
        height_max(): number;
    }
}
declare namespace $ {
    class $mol_pop_bubble extends $mol_scroll {
        sub(): any[];
        content(): any[];
        style(): {
            "maxHeight": number;
        };
        height_max(): number;
        attr(): {
            "mol_pop_align": string;
            "tabindex": number;
        };
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
    class $mol_dimmer extends $mol_view {
        haystack(): string;
        needle(): string;
        sub(): any[];
        parts(): any[];
        Low(id: any): $mol_view;
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
    class $mol_nav extends $mol_plugin {
        cycle(val?: any, force?: $mol_atom_force): any;
        mod_ctrl(): boolean;
        mod_shift(): boolean;
        mod_alt(): boolean;
        keys_x(val?: any, force?: $mol_atom_force): any;
        keys_y(val?: any, force?: $mol_atom_force): any;
        current_x(val?: any, force?: $mol_atom_force): any;
        current_y(val?: any, force?: $mol_atom_force): any;
        event_up(event?: any, force?: $mol_atom_force): any;
        event_down(event?: any, force?: $mol_atom_force): any;
        event_left(event?: any, force?: $mol_atom_force): any;
        event_right(event?: any, force?: $mol_atom_force): any;
        event(): {
            "keydown": (event?: any) => any;
        };
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
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        debounce(): number;
        minimal_height(): number;
        autocomplete(): boolean;
        field(): {
            "disabled": boolean;
            "value": any;
            "placeholder": string;
            "type": any;
            "spellcheck": boolean;
            "autocomplete": string;
        };
        disabled(): boolean;
        value_changed(val?: any, force?: $mol_atom_force): any;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        type(val?: any, force?: $mol_atom_force): any;
        spellcheck(): boolean;
        autocomplete_native(): string;
        attr(): {
            "maxlength": number;
        };
        length_max(): number;
        event(): {
            "input": (event?: any) => any;
            "keydown": (event?: any) => any;
        };
        event_change(event?: any, force?: $mol_atom_force): any;
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
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        attr(): {
            "d": string;
        };
        geometry(): string;
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
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_list extends $mol_view {
        sub(): any[];
        rows(): any[];
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
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => string[]): (variant: Variant) => boolean;
}

declare namespace $ {
    class $mol_select extends $mol_pop {
        dictionary(): {};
        options(): any[];
        value(val?: any, force?: $mol_atom_force): any;
        minimal_height(): number;
        Option_row(id: any): $mol_button_minor;
        event_select(id: any, event?: any, force?: $mol_atom_force): any;
        option_content(id: any): any[];
        Option_label(id: any): $mol_dimmer;
        option_label(id: any): string;
        filter_pattern(val?: any, force?: $mol_atom_force): any;
        No_options(): $mol_view;
        no_options_message(): string;
        plugins(): any[];
        Nav(): $mol_nav;
        nav_components(): any[];
        option_focused(component?: any, force?: $mol_atom_force): any;
        nav_cycle(val?: any, force?: $mol_atom_force): any;
        showed(val?: any, force?: $mol_atom_force): any;
        options_showed(val?: any, force?: $mol_atom_force): any;
        Anchor(): $mol_button_minor;
        Trigger(): $mol_button_minor;
        open(event?: any, force?: $mol_atom_force): any;
        trigger_content(): any[];
        option_content_current(): any[];
        Filter(): $mol_string;
        filter_hint(): string;
        hint(): string;
        debounce(): number;
        Trigger_icon(): $mol_icon_chevron;
        bubble_content(): any[];
        Menu(): $mol_list;
        menu_content(): any[];
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
    class $mol_icon_minus extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_plus extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_number extends $mol_view {
        precision_view(): number;
        precision(): number;
        precision_change(): number;
        value(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        String(): $mol_string;
        value_string(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        string_enabled(): boolean;
        enabled(): boolean;
        debounce(): number;
        Dec(): $mol_button_minor;
        event_dec(val?: any, force?: $mol_atom_force): any;
        dec_enabled(): boolean;
        dec_icon(): $mol_icon_minus;
        Inc(): $mol_button_minor;
        event_inc(val?: any, force?: $mol_atom_force): any;
        inc_enabled(): boolean;
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
    class $mol_app_report extends $mol_page {
        title(): string;
        body(): any[];
        descriptor(): $mol_view;
        description(): string;
        tabler(): $mol_app_report_tabler;
        headRower(): $mol_app_report_rower;
        headCells(): any[];
        rows(): any[];
        rower(id: any): $mol_app_report_rower;
        rowerCells(id: any): any[];
        cell(id: any): $mol_app_report_cell;
        cell_content(id: any): any;
        cellrows(id: any): number;
        cellCols(id: any): number;
        texter(id: any): $mol_view;
        cell_value(id: any, val?: any, force?: $mol_atom_force): any;
        select(id: any): $mol_select;
        cell_options(id: any): {};
        number(id: any): $mol_number;
    }
}
declare namespace $ {
    class $mol_app_report_tabler extends $mol_view {
        dom_name(): string;
        sub(): any[];
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_rower extends $mol_view {
        dom_name(): string;
        sub(): any[];
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_cell extends $mol_view {
        dom_name(): string;
        attr(): {
            "colspan": number;
            "rowspan": number;
        };
        cols(): number;
        rows(): number;
        sub(): any[];
        content(): any;
    }
}

declare namespace $.$$ {
    interface $mol_app_report_formatCol {
        title: string;
        field?: string;
        sub?: $mol_app_report_formatCol[];
    }
    interface $mol_app_report_formatRow {
        title: string;
        field?: string;
        sub?: $mol_app_report_formatRow[];
    }
    interface $mol_app_report_scheme {
        type: string;
        mask?: string;
        unit?: string;
        options?: {
            [name: string]: string;
        };
    }
    class $mol_app_report extends $.$mol_app_report {
        formatCols(): $mol_app_report_formatCol[];
        format_rows(): $mol_app_report_formatRow[];
        scheme(): {
            [field: string]: $mol_app_report_scheme;
        };
        data(): {
            [field: string]: string;
        };
        description(): string;
        headCells(): $mol_app_report_cell[];
        rows(): $mol_app_report_rower[];
        formatRow(pos: number[]): $mol_app_report_formatRow;
        rowerCells(pos: number[]): $mol_app_report_cell[];
        cellCols(pos: number[]): 1 | 0 | 2;
        cell_content(pos: number[]): $mol_view;
        cell_options(pos: number[]): {
            [name: string]: string;
        };
        cell_value(pos: number[], next: any): any;
        cell_contentName(pos: number[]): string;
        cell_contentValue(pos: number[]): string;
    }
}
