declare namespace $ { }
export = $;

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
    class $mol_card extends $mol_list {
        attr(): {
            "mol_card_status_type": string;
        };
        status(): string;
        rows(): any[];
        Content(): $mol_view;
        content(): any[];
        Status(): $mol_view;
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
        sub(): any[];
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
    class $mol_icon_attach extends $mol_icon {
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
        Content(): $mol_tiler;
        content(): any[];
        items(val?: any, force?: $mol_atom_force): any;
        Add(): $mol_attach_add;
        attach_new(val?: any, force?: $mol_atom_force): any;
        Item(id: any): $$.$mol_attach_item;
        attach_title(): string;
    }
}
declare namespace $ {
    class $mol_attach_item extends $mol_link {
        url_thumb(val?: any, force?: $mol_atom_force): any;
        uri(val?: any, force?: $mol_atom_force): any;
        url_load(val?: any, force?: $mol_atom_force): any;
        style(): {
            "backgroundImage": string;
        };
        style_bg(): string;
        attr(): {
            "download": string;
            "href": string;
            "title": string;
            "target": string;
            "mol_link_current": boolean;
        };
        title(): string;
    }
}
declare namespace $ {
    class $mol_attach_add extends $mol_button_minor {
        minimal_height(): number;
        file_new(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Icon(): $mol_icon_attach;
        Input(): $mol_attach_add_input;
        event_capture(val?: any, force?: $mol_atom_force): any;
        event_picked(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_attach_add_input extends $mol_view {
        dom_name(): string;
        attr(): {
            "type": string;
            "accept": string;
            "multiple": boolean;
        };
        type(): string;
        accept(): string;
        multiple(): boolean;
        event_click(val?: any, force?: $mol_atom_force): any;
        event_capture(val?: any, force?: $mol_atom_force): any;
        event(): {
            "change": (val?: any) => any;
        };
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
    class $mol_attach_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Filled(): $mol_attach;
        filled_items(val?: any, force?: $mol_atom_force): any;
        Item1(): $$.$mol_attach_item;
        Item2(): $$.$mol_attach_item;
        Item3(): $$.$mol_attach_item;
    }
}

declare namespace $ {
    class $mol_bar extends $mol_view {
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
    class $mol_icon_tick extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_box extends $mol_check {
        Icon(): $mol_icon_tick;
    }
}

declare namespace $ {
    class $mol_bar_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Two(): $mol_bar;
        Two_mail(): $mol_string;
        mail_hint(): string;
        mail(val?: any, force?: $mol_atom_force): any;
        Two_submit(): $mol_button_minor;
        submit_title(): string;
        Three(): $mol_bar;
        Three_mail(): $mol_string;
        Three_confirm(): $mol_check_box;
        confirm_title(): string;
        confirmed(val?: any, force?: $mol_atom_force): any;
        Three_submit(): $mol_button_minor;
    }
}

declare namespace $ {
    class $mol_portion_indicator extends $mol_view {
        style(): {
            "width": string;
        };
        width_style(): string;
    }
}
declare namespace $ {
    class $mol_portion extends $mol_view {
        portion(): number;
        sub(): any[];
        indicator(): $mol_portion_indicator;
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
    class $mol_float extends $mol_view {
    }
}

declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_expand extends $mol_check {
        minimal_height(): number;
        Icon(): $mol_icon_chevron;
        level(): number;
        style(): {
            "paddingLeft": string;
        };
        level_style(): string;
        checked(val?: any, force?: $mol_atom_force): any;
        expanded(val?: any, force?: $mol_atom_force): any;
        enabled(): boolean;
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
        row_ids(): any[];
        row_id(index: any): any;
        col_ids(): any[];
        records(): {};
        record(id: any): any;
        hierarchy(): any;
        hierarchy_col(): string;
        sub(): any[];
        Table(): $$.$mol_grid_table;
        gap_top(): number;
        rows_visible(): any[];
        rows(): any[];
        Head(): $mol_grid_row;
        row_height(): number;
        head_cells(): any[];
        Row(id: any): $mol_grid_row;
        cells(id: any): any[];
        Cell(id: any): $mol_view;
        cell(id: any): any;
        Cell_text(id: any): $mol_grid_cell;
        cell_content_text(id: any): any[];
        cell_content(id: any): any[];
        Cell_number(id: any): $mol_grid_number;
        cell_content_number(id: any): any[];
        Col_head(id: any): $mol_float;
        col_head_content(id: any): any[];
        Cell_branch(id: any): $$.$mol_check_expand;
        cell_level(id: any): number;
        cell_expanded(id: any, val?: any, force?: $mol_atom_force): any;
        Cell_content(id: any): any[];
        Cell_dimmer(id: any): $mol_dimmer;
        needle(): string;
        cell_value(id: any): string;
    }
}
declare namespace $ {
    class $mol_grid_table extends $mol_view {
        dom_name(): string;
        style(): {
            "top": number;
        };
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_gap extends $mol_view {
        style(): {
            "top": number;
        };
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_row extends $mol_view {
        dom_name(): string;
        style(): {
            "height": number;
        };
        height(): number;
        sub(): any[];
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_grid_cell extends $mol_view {
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
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_sort_asc extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_bench extends $mol_grid {
        records(): {};
        result(): {};
        col_sort(val?: any, force?: $mol_atom_force): any;
        Col_head(id: any): $mol_bench_head;
        event_sort_toggle(id: any, val?: any, force?: $mol_atom_force): any;
        col_head_content(id: any): any[];
        col_head_label(id: any): any[];
        Col_head_sort(id: any): $mol_icon_sort_asc;
        cell_content_number(id: any): any[];
        result_value(id: any): string;
        Result_portion(id: any): $$.$mol_portion;
        result_portion(id: any): number;
    }
}
declare namespace $ {
    class $mol_bench_head extends $mol_float {
        horizontal(): boolean;
        event(): {
            "click": (val?: any) => any;
        };
        event_click(val?: any, force?: $mol_atom_force): any;
        attr(): {
            "title": string;
        };
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
        title(): string;
        sub(): any[];
        View(): $mol_bench;
        col_sort(val?: any, force?: $mol_atom_force): any;
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
    class $mol_ghost extends $mol_view {
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
        sub(): any[];
        pages_wrapped(): any[];
        pages(): any[];
        plugins(): any[];
        width(): any;
        Meter(): $mol_meter;
        Touch(): $mol_touch;
        event_front_up(val?: any, force?: $mol_atom_force): any;
        event_front_down(val?: any, force?: $mol_atom_force): any;
        Page(index: any): $mol_book_page;
        page(index: any): any;
        page_visible(index: any): boolean;
        Placeholder(): $mol_book_placeholder;
    }
}
declare namespace $ {
    class $mol_book_placeholder extends $mol_view {
        minimal_width(): number;
        attr(): {
            "tabindex": any;
        };
    }
}
declare namespace $ {
    class $mol_book_page extends $mol_ghost {
        attr(): {
            "tabindex": number;
            "mol_book_page_focused": boolean;
            "mol_book_page_visible": boolean;
        };
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
        title(): string;
        sub(): any[];
        View(): $mol_book;
        Placeholder(): $mol_book_placeholder;
        Addon(): $mol_view;
        Main(): $mol_view;
    }
}

declare namespace $ {
    class $mol_button_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Major_enabled(): $mol_button_major;
        major_label(): string;
        Major_disabled(): $mol_button_major;
        Minor_enabled(): $mol_button_minor;
        minor_label(): string;
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
        sub(): any[];
        Title(): $mol_view;
        title(): string;
        Weekdays(): $mol_view;
        weekdays(): any[];
        Weeks(): $mol_list;
        weeks(): any[];
        Weekday(index: any): $mol_calendar_day;
        weekend(index: any): boolean;
        weekday(index: any): string;
        Week(row: any): $mol_view;
        week_days(row: any): any[];
        Day(day: any): $mol_calendar_day;
        day_ghost(day: any): boolean;
        day_holiday(day: any): boolean;
        day_selected(day: any): boolean;
        day_content(day: any): any[];
        day_text(day: any): string;
        month_string(): string;
        month_moment(): $mol_time_moment;
    }
}
declare namespace $ {
    class $mol_calendar_day extends $mol_view {
        minimal_height(): number;
        minimal_width(): number;
        attr(): {
            "mol_calendar_holiday": boolean;
            "mol_calendar_ghost": boolean;
            "mol_calendar_selected": boolean;
        };
        holiday(): boolean;
        ghost(): boolean;
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
        title(): string;
        holidays(): any[];
        sub(): any[];
        Calendar(): $mol_calendar;
        month(): string;
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
        title(): string;
        interval_config(): {
            "start": string;
            "end": string;
        };
        sub(): any[];
        Calendar(): $mol_calendar;
        month(): string;
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
        title(): string;
        sub(): any[];
        Calendar(): $mol_calendar;
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
        title(): string;
        sub(): any[];
        Simple(): $mol_card;
        Pending(): $mol_card;
    }
}

declare namespace $ {
    class $mol_svg_group extends $mol_svg {
        dom_name(): string;
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
    class $mol_chart_legend extends $mol_scroll {
        graphs(): readonly $mol_plot_graph[];
        sub(): readonly $mol_view[];
        graph_legends(): readonly $mol_view[];
        Graph_legend(id: any): $mol_view;
        Graph_sample_box(id: any): $mol_view;
        Graph_sample(id: any): any;
        Graph_title(id: any): $mol_view;
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
        gap_hor(): number;
        gap_vert(): number;
        gap_left(): number;
        gap_right(): number;
        gap_bottom(): number;
        gap_top(): number;
        graphs(): readonly $mol_plot_graph[];
        sub(): any[];
        Plot(): $mol_plot_pane;
        hue_base(): number;
        hue_shift(): number;
        Legend(): $mol_chart_legend;
    }
}

declare namespace $ {
    class $mol_plot_bar extends $mol_plot_graph {
        style(): {
            "stroke-width": string;
            "color": string;
        };
        stroke_width(): string;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
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
        sub(): readonly $mol_plot_graph[];
        graphs_enriched(): readonly $mol_plot_graph[];
        graphs(): readonly $mol_plot_graph[];
        Sample(): $mol_plot_graph_sample;
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
        threshold(): number;
        spacing(): number;
        color_fill(): string;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
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
    class $mol_svg_rect extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        attr(): {
            "width": string;
            "height": string;
            "x": string;
            "y": string;
        };
        width(): string;
        height(): string;
        pos_x(): string;
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
        dom_name(): string;
        pos(): any[];
        attr(): {
            "x": string;
            "y": string;
            "text-anchor": string;
        };
        pos_x(): string;
        pos_y(): string;
        align(): string;
        sub(): any[];
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
        font_size(): number;
        sub(): any[];
        Back(): $mol_svg_rect;
        box_width(): string;
        box_height(): string;
        box_pos_x(): string;
        box_pos_y(): string;
        Text(): $mol_svg_text;
        pos_x(): string;
        pos_y(): string;
        align(): string;
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
        step(): number;
        scale_axis(): number;
        scale_step(): number;
        shift_axis(): number;
        dimensions_axis(): $mol_vector_range<number>;
        viewport_axis(): $mol_vector_range<number>;
        axis_points(): readonly number[];
        normalize(val?: any, force?: $mol_atom_force): any;
        precision(): number;
        sub(): any[];
        Background(): $mol_svg_rect;
        background_x(): string;
        background_y(): string;
        background_width(): string;
        background_height(): string;
        Curve(): $mol_svg_path;
        curve(): string;
        labels_formatted(): any[];
        Title(): $mol_svg_text_box;
        title_pos_x(): string;
        title_pos_y(): string;
        title_align(): string;
        Label(index: any): $mol_svg_text;
        label_pos(index: any): any[];
        label_pos_x(index: any): string;
        label_pos_y(index: any): string;
        label_text(index: any): string;
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
        title_align(): string;
        label_align(): string;
        title_pos_y(): string;
        label_pos_x(v: any): string;
        background_height(): string;
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
        title_align(): string;
        label_align(): string;
        title_pos_x(): string;
        title_pos_y(): string;
        label_pos_y(v: any): string;
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
        labels(): readonly string[];
        title_x_gap(): number;
        threshold(): number;
        graphs(): readonly $mol_plot_graph[];
        dimensions(): $mol_vector_2d<$mol_vector_range<number>>;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        Label_x(): $mol_svg_text_box;
        title_x_pos_x(): string;
        title_x_pos_y(): string;
        title_x(): string;
        Label_y(): $mol_svg_text_box;
        title_y_pos_x(): string;
        title_y_pos_y(): string;
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
        title(): string;
        sub(): any[];
        Chart(): $mol_chart;
        Plan(): $mol_plot_bar;
        plan_title(): string;
        plan(): any[];
        Fact(): $mol_plot_group;
        fact_title(): string;
        facts(): any[];
        Fact_line(): $mol_plot_line;
        Fact_dots(): $mol_plot_dot;
        Vert_ruler(): $mol_plot_ruler_vert;
        vert_title(): string;
        Marker_hor(): $mol_plot_mark_hor;
        marker_hor_title(): string;
        months(): readonly string[];
        Marker_cross(): $mol_plot_mark_cross;
    }
}

declare namespace $ {
    class $mol_plot_fill extends $mol_plot_graph {
        points(): readonly (readonly [number, number])[];
        threshold(): number;
        spacing(): number;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
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
        title(): string;
        samples_count(): number;
        sub(): any[];
        Chart(): $mol_chart;
        graphs(): any[];
        Receipts(): $mol_plot_bar;
        receipts_title(): string;
        series_x(): any[];
        series_2_y(): any[];
        Receipts_confirmed(): $mol_plot_bar;
        receipts_confirmed_title(): string;
        series_3_y(): any[];
        Maximum(): $mol_plot_dot;
        maximum_title(): string;
        series_1_y(): any[];
        Waste(): $mol_plot_line;
        waste_title(): string;
        series_4_y(): any[];
        Purchases(): $mol_plot_group;
        purchases_title(): string;
        series_5_y(): any[];
        Purchases_fill(): $mol_plot_fill;
        Purchases_line(): $mol_plot_line;
        Purchases_dots(): $mol_plot_dot;
        Taxes(): $mol_plot_group;
        taxes_title(): string;
        series_6_y(): any[];
        Taxes_fill(): $mol_plot_fill;
        Taxes_line(): $mol_plot_line;
        Taxes_dots(): $mol_plot_dot;
        Energy(): $mol_plot_ruler_vert;
        energy_title(): string;
        Day(): $mol_plot_mark_hor;
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
        title(): string;
        samples_count(): number;
        points_max(): number;
        sub(): any[];
        Chart(): $mol_chart;
        Forces_left(): $mol_plot_dot;
        forces_left_title(): string;
        forces_left_x(): readonly number[];
        forces_left_y(): readonly number[];
        Forces_right(): $mol_plot_dot;
        forces_right_title(): string;
        forces_right_x(): readonly number[];
        forces_right_y(): readonly number[];
        Vert_ruler(): $mol_plot_ruler_vert;
        vert_title(): string;
        Hor_ruler(): $mol_plot_ruler_hor;
        hor_title(): string;
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
        title(): string;
        sub(): any[];
        Labeled_base(): $mol_check_box;
        base_checked(val?: any, force?: $mol_atom_force): any;
        c1Label(): string;
        Labeled_checked(): $mol_check_box;
        c2Label(): string;
        checked_checked(val?: any, force?: $mol_atom_force): any;
        Labeled_disabled(): $mol_check_box;
        c6Label(): string;
        Alone_base(): $mol_check_box;
        Alone_checked(): $mol_check_box;
        Alone_disabled(): $mol_check_box;
    }
}

declare namespace $ {
    class $mol_check_expand_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Labeled_base(): $$.$mol_check_expand;
        base_expanded(val?: any, force?: $mol_atom_force): any;
        c1Label(): string;
        Labeled_expanded(): $$.$mol_check_expand;
        c2Label(): string;
        expanded_expanded(val?: any, force?: $mol_atom_force): any;
        Empty_base(): $$.$mol_check_expand;
        Empty_expanded(): $$.$mol_check_expand;
        Disabled(): $$.$mol_check_expand;
        c5Label(): string;
    }
}

declare namespace $ {
    class $mol_check_icon extends $mol_check {
    }
}

declare namespace $ {
    class $mol_icon_microphone extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_icon_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Base(): $mol_check_icon;
        Base_icon(): $mol_icon_microphone;
        base_checked(val?: any, force?: $mol_atom_force): any;
        Checked(): $mol_check_icon;
        Checked_icon(): $mol_icon_microphone;
        checked_checked(val?: any, force?: $mol_atom_force): any;
        Disabled(): $mol_check_box;
        Disabled_icon(): $mol_icon_microphone;
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
    class $mol_icon_cross extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_search extends $mol_bar {
        query(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Suggest(): $mol_select;
        suggest_selected(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        suggests_showed(): boolean;
        suggests(): any[];
        debounce(): number;
        Clear(): $mol_button_minor;
        Clear_icon(): $mol_icon_cross;
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
        sub(): any[];
        Manual(): $mol_search;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        format(): string;
        debounce(): number;
        Scan(): $mol_button;
        event_scan(val?: any, force?: $mol_atom_force): any;
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
        title(): string;
        sub(): any[];
        Qr(): $mol_code;
        Matrix(): $mol_code;
        Upc_e(): $mol_code;
        Upc_a(): $mol_code;
        Ean_8(): $mol_code;
        Ean_13(): $mol_code;
        Code_128(): $mol_code;
        Code_39(): $mol_code;
        Itf(): $mol_code;
    }
}

declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}

declare namespace $ {
    class $mol_date extends $mol_pop {
        Anchor(): $mol_string;
        Input(): $mol_string;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        bubble_content(): any[];
        Calendar(): $mol_date_calendar;
        day_selected(day: any): boolean;
        day_click(day: any, event?: any, force?: $mol_atom_force): any;
        value_number(val?: any, force?: $mol_atom_force): any;
        value_moment(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_date_calendar extends $mol_calendar {
        day_content(day: any): any[];
        Day_button(day: any): $mol_button;
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
        sub(): any[];
        View(): $mol_view;
        Date(): $mol_date;
        date(val?: any, force?: $mol_atom_force): any;
        Formatted(): $mol_view;
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
    class $mol_deck extends $mol_list {
        items(): any[];
        rows(): any[];
        Switch(): $mol_switch;
        current(val?: any, force?: $mol_atom_force): any;
        switch_options(): {};
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
        title(): string;
        sub(): any[];
        Deck(): $mol_deck;
        greeterItem(): {
            "title": string;
            "Content": $mol_row;
        };
        greeterLabel(): string;
        greeterContent(): $mol_row;
        greeterMessager(): $mol_view;
        greeterMessage(): string;
        questerItem(): {
            "title": string;
            "Content": $mol_row;
        };
        questerLabel(): string;
        questerContent(): $mol_row;
        questerMessager(): $mol_view;
        questerMessage(): string;
        commanderItem(): {
            "title": string;
            "Content": $mol_row;
        };
        commanderLabel(): string;
        commanderContent(): $mol_row;
        commanderMessager(): $mol_view;
        commanderMessage(): string;
    }
}

declare namespace $ {
    class $mol_dimmer_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        one(): $mol_dimmer;
        two(): $mol_dimmer;
        three(): $mol_dimmer;
        four(): $mol_dimmer;
        five(): $mol_dimmer;
        six(): $mol_dimmer;
    }
}

declare namespace $ {
    class $mol_expander extends $mol_list {
        rows(): any[];
        Label(): $mol_view;
        Trigger(): $$.$mol_check_expand;
        expanded(val?: any, force?: $mol_atom_force): any;
        label(): any[];
        tools(): any[];
        Content(): $mol_view;
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
        minimal_height(): number;
        sub(): any[];
    }
}

declare namespace $ {
    class $mol_expander_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Expander(): $mol_expander;
    }
}

declare namespace $ {
    class $mol_float_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        Head(): $mol_float;
        Head_card(): $mol_card;
        Head_row(): $mol_row;
        Head_content(): $mol_view;
        content(): any[];
        Content(): $mol_row;
        Filler1(): $mol_filler;
        Filler2(): $mol_filler;
    }
}

declare namespace $ {
    class $mol_form extends $mol_view {
        submit_blocked(): boolean;
        event(): {
            "keydown": (event?: any) => any;
        };
        keydown(event?: any, force?: $mol_atom_force): any;
        submit(event?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Bar_fields(): $mol_view;
        form_fields(): any[];
        Bar_buttons(): $mol_row;
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
        sub(): any[];
        Title(): $mol_view;
        label(): any[];
        Content(): $mol_view;
        content(): any;
    }
}

declare namespace $ {
    class $mol_form_field extends $mol_labeler {
        label(): any[];
        name(): string;
        Bid(): $mol_view;
        bid(): string;
        Content(): any;
        control(): any;
    }
}

declare namespace $ {
    class $mol_form_demo_bids extends $mol_demo_small {
        title(): string;
        message_required(): string;
        message_no_spaces(): string;
        message_need_more_letters(): string;
        sub(): any[];
        Form(): $mol_form;
        submit(val?: any, force?: $mol_atom_force): any;
        Name_first_field(): $mol_form_field;
        name_first_label(): string;
        name_first_bid(): string;
        Name_first_control(): $mol_string;
        name_first_hint(): string;
        name_first(val?: any, force?: $mol_atom_force): any;
        Name_nick_field(): $mol_form_field;
        name_nick_label(): string;
        name_nick_bid(): string;
        Name_nick_control(): $mol_string;
        name_nick_hint(): string;
        name_nick(val?: any, force?: $mol_atom_force): any;
        Name_second_field(): $mol_form_field;
        name_second_label(): string;
        name_second_bid(): string;
        Name_second_control(): $mol_string;
        name_second_hint(): string;
        name_second(val?: any, force?: $mol_atom_force): any;
        Sex_field(): $mol_form_field;
        sex_label(): string;
        sex_bid(): string;
        Sex_control(): $mol_switch;
        sex(val?: any, force?: $mol_atom_force): any;
        sex_options(): {
            "male": string;
            "intersex": string;
            "female": string;
        };
        sex_option_male(): string;
        sex_option_intersex(): string;
        sex_option_female(): string;
        Submit(): $mol_button_major;
        submit_text(): string;
        submit_blocked(): boolean;
        Message(): $mol_view;
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
        title(): string;
        sub(): any[];
        Grid(): $mol_grid;
        records(): {};
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
        title(): string;
        sub(): any[];
        Provider(): $mol_labeler;
        Name(): $mol_labeler;
        Name_control(): $mol_string;
        user_name(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_link_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        This(): $mol_link;
        this_label(): string;
        Red(): $mol_link;
        red_label(): string;
        Green(): $mol_link;
        green_label(): string;
        Blue(): $mol_link;
        blue_label(): string;
        External(): $mol_link;
        external_hint(): string;
    }
}

declare namespace $ {
    class $mol_image extends $mol_view {
        dom_name(): string;
        field(): {
            "src": string;
            "alt": string;
        };
        uri(): string;
    }
}

declare namespace $ {
    class $mol_link_iconed extends $mol_link {
        sub(): any[];
        Icon(): $mol_image;
        icon(): string;
        content(): any[];
        title(): string;
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
        title(): string;
        sub(): any[];
        Input(): $mol_string;
        uri(val?: any, force?: $mol_atom_force): any;
        Output(): $$.$mol_link_iconed;
    }
}

declare namespace $ {
    class $mol_list_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        List(): $mol_list;
        rows(): any[];
        Row(id: any): $mol_expander;
        row_text(id: any): string;
        Content(id: any): $mol_row;
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
        zoom(val?: any, force?: $mol_atom_force): any;
        center(val?: any, force?: $mol_atom_force): any;
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
        pos(): any[];
        hint(): string;
        title(): string;
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
        title(): string;
        sub(): any[];
        Map(): $mol_map_yandex;
        center(val?: any, force?: $mol_atom_force): any;
        zoom(val?: any, force?: $mol_atom_force): any;
        Place(): $mol_map_yandex_mark;
        place_pos(): any[];
        place_title(): string;
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
        uri_base(): string;
        text(): string;
        tokens(): any[];
        Quote(id: any): $mol_text;
        quote_text(id: any): string;
        Row(id: any): $mol_text_row;
        block_content(id: any): any[];
        block_type(id: any): string;
        Span(id: any): $mol_text_span;
        Link(id: any): $mol_text_link;
        Image(id: any): $mol_text_image;
        Header(id: any): $mol_text_header;
        header_level(id: any): number;
        header_content(id: any): any[];
        Table(id: any): $mol_grid;
        table_head_cells(id: any): any[];
        table_rows(id: any): any[];
        Table_row(id: any): $mol_grid_row;
        table_cells(id: any): any[];
        Table_cell(id: any): $mol_grid_cell;
        table_cell_content(id: any): any[];
        Table_cell_head(id: any): $mol_float;
    }
}
declare namespace $ {
    class $mol_text_row extends $mol_view {
        minimal_height(): number;
        attr(): {
            "mol_text_type": string;
        };
        type(): string;
    }
}
declare namespace $ {
    class $mol_text_header extends $mol_view {
        dom_name(): string;
        minimal_height(): number;
        attr(): {
            "mol_text_header_level": any;
        };
        level(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        content(): any[];
    }
}
declare namespace $ {
    class $mol_text_span extends $mol_view {
        dom_name(): string;
        attr(): {
            "mol_text_type": any;
        };
        type(val?: any, force?: $mol_atom_force): any;
        sub(): any;
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_link extends $mol_link_iconed {
        attr(): {
            "mol_text_type": any;
            "href": string;
            "title": string;
            "target": string;
            "download": string;
            "mol_link_current": boolean;
        };
        type(val?: any, force?: $mol_atom_force): any;
        uri(): any;
        link(val?: any, force?: $mol_atom_force): any;
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_image extends $mol_view {
        dom_name(): string;
        attr(): {
            "allowfullscreen": boolean;
            "mol_text_type": any;
            "data": any;
        };
        type(val?: any, force?: $mol_atom_force): any;
        link(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
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
        moment(): $mol_time_moment;
        sub(): any[];
        Info(): $mol_row;
        Name(): $mol_view;
        name(): string;
        Moment(): $mol_view;
        moment_string(): string;
        Avatar_link(): $mol_link;
        avatar_link(): string;
        Avatar(): $mol_image;
        avatar(): string;
        Text(): $mol_text;
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
        title(): string;
        sub(): any[];
        Message_short(): $$.$mol_message;
        Message_long(): $$.$mol_message;
    }
}

declare namespace $ {
    class $mol_meter_demo extends $mol_demo_small {
        title(): string;
        plugins(): any[];
        top(): any;
        height(): any;
        Meter(): $mol_meter;
        sub(): any[];
        Top(): $mol_view;
        Height(): $mol_view;
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
    class $mol_number_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        zero(): $mol_number;
        one(): $mol_number;
        year(val?: any, force?: $mol_atom_force): any;
        two(): $mol_number;
        three(): $mol_number;
        age(val?: any, force?: $mol_atom_force): any;
        four(): $mol_number;
        five(): $mol_number;
        six(): $mol_number;
        seven(): $mol_number;
        eight(): $mol_number;
        nine(): $mol_number;
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
    class $mol_page_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Page(): $mol_page;
        Button(): $mol_button_minor;
        Content(): $mol_row;
        Text(): $mol_filler;
        Foot_content(): $mol_row;
        Foot_text(): $mol_view;
    }
}

declare namespace $ {
    class $mol_paginator extends $mol_view {
        sub(): any[];
        Backward(): $mol_button_minor;
        backward_hint(): string;
        backward(event?: any, force?: $mol_atom_force): any;
        Backward_icon(): $mol_icon_chevron;
        Value(): $mol_view;
        value(val?: any, force?: $mol_atom_force): any;
        Forward(): $mol_button_minor;
        forward_hint(): string;
        forward(event?: any, force?: $mol_atom_force): any;
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
        title(): string;
        sub(): any[];
        Pages(): $mol_paginator;
        page(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_plot_demo extends $mol_demo_large {
        title(): string;
        count(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Plot(): $mol_plot_pane;
        Saturation(): $mol_plot_group;
        saturation_series(): any[];
        Saturation_fill(): $mol_plot_fill;
        Saturation_line(): $mol_plot_line;
        Input(): $mol_plot_group;
        input_series(): any[];
        Input_line(): $mol_plot_line;
        Input_dots(): $mol_plot_dot;
        Output(): $mol_plot_bar;
        output_series(): any[];
        Voltage(): $mol_plot_ruler_vert;
        Voltage_title(): string;
        Time(): $mol_plot_ruler_hor;
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
        title(): string;
        sub(): any[];
        Pop(): $mol_pop;
        Show(): $mol_button_minor;
        show_text(): string;
        showed(): boolean;
        Content(): $mol_row;
        bubble_hint(): string;
    }
}

declare namespace $ {
    class $mol_pop_over extends $mol_pop {
        showed(): any;
        hovered(val?: any, force?: $mol_atom_force): any;
        attr(): {
            "tabindex": number;
        };
        event(): {
            "mouseenter": (event?: any) => any;
            "mouseleave": (event?: any) => any;
            "keydown": (event?: any) => any;
        };
        event_show(event?: any, force?: $mol_atom_force): any;
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
        title(): string;
        sub(): any[];
        Menu(): $mol_row;
        File(): $mol_pop_over;
        file_title(): string;
        File_menu(): $mol_list;
        Open(): $mol_button_minor;
        open_title(): string;
        Export(): $mol_button_minor;
        export_title(): string;
        Save(): $mol_button_minor;
        save_title(): string;
        Help(): $mol_pop_over;
        help_title(): string;
        Help_menu(): $mol_list;
        Updates(): $mol_button_minor;
        updates_title(): string;
        About(): $mol_button_minor;
        about_title(): string;
    }
}

declare namespace $ {
    class $mol_portion_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Empty(): $$.$mol_portion;
        fist(): number;
        Partial(): $$.$mol_portion;
        second(): number;
        Full(): $$.$mol_portion;
        third(): number;
    }
}

declare namespace $ {
    class $mol_row_demo_form extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Row(): $mol_row;
        Name(): $mol_search;
        name_hint(): string;
        name(val?: any, force?: $mol_atom_force): any;
        suggest1(): string;
        suggest2(): string;
        Count(): $mol_number;
        count_hint(): string;
        count(val?: any, force?: $mol_atom_force): any;
        Progress(): $$.$mol_portion;
        progress(): number;
        Publish(): $mol_check_box;
        publish_label(): string;
        publish(val?: any, force?: $mol_atom_force): any;
        Drop(): $mol_button_minor;
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
        title(): string;
        count(): number;
        Product(id: any): $mol_card;
        product_title(id: any): string;
        sub(): any[];
        Catalog(): $mol_scroll;
        Products(): $mol_row;
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
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        Content(): $mol_row;
        One(): $mol_filler;
        Two(): $mol_filler;
        Tree(): $mol_filler;
    }
}

declare namespace $ {
    class $mol_search_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        query(): any;
        Search(): $mol_search;
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
        rows(): any[];
        Head(): $mol_view;
        head(): any;
        Content(): any;
    }
}

declare namespace $ {
    class $mol_section_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Text(): $mol_row;
        Section(): $mol_section;
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
        title(): string;
        sub(): any[];
        Color(): $mol_select;
        color(val?: any, force?: $mol_atom_force): any;
        colors(): {};
        color_name(id: any): string;
        option_content(id: any): any[];
        Color_option(id: any): $mol_row;
        Color_preview(id: any): $mol_select_colors_color_preview;
        option_color(id: any): string;
    }
}
declare namespace $ {
    class $mol_select_colors_color_preview extends $mol_view {
        style(): {
            "background": string;
        };
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
        title(): string;
        sub(): any[];
        Month(): $mol_select;
        month(val?: any, force?: $mol_atom_force): any;
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
        title(): string;
        sub(): any[];
        Priority(): $mol_select;
        priority(val?: any, force?: $mol_atom_force): any;
    }
}

declare namespace $ {
    class $mol_speck extends $mol_view {
        attr(): {
            "mol_theme": string;
        };
        sub(): any[];
        value(): any;
    }
}

declare namespace $ {
    class $mol_icon_settings extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_menu extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_speck_demo extends $mol_demo_small {
        sub(): any[];
        Link(): $mol_link;
        Link_speck(): $mol_speck;
        Link_icon(): $mol_icon_settings;
        String(): $mol_view;
        String_speck(): $mol_speck;
        string_speck(): string;
        String_field(): $mol_string;
        Button(): $mol_button_minor;
        Button_speck(): $mol_speck;
        notification_count(): number;
        Button_icon(): $mol_icon_menu;
        Card(): $mol_card;
        Card_speck(): $mol_speck;
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
        sub(): any[];
        Toggle(): $mol_check_icon;
        Toggle_icon(): $mol_icon_microphone;
        hearing(val?: any, force?: $mol_atom_force): any;
        Message(): $mol_view;
        message(): string;
        Speak(): $mol_button_major;
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
        title(): string;
        sub(): any[];
        Simple(): $mol_string;
        name(val?: any, force?: $mol_atom_force): any;
        Hint(): $mol_string;
        Filled(): $mol_string;
        name2(val?: any, force?: $mol_atom_force): any;
        Disabled(): $mol_string;
    }
}

declare namespace $ {
    class $mol_switch_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Enabled(): $mol_switch;
        color(val?: any, force?: $mol_atom_force): any;
        option_red(): string;
        option_green(): string;
        option_blue(): string;
        Disabled(): $mol_switch;
    }
}

declare namespace $ {
    class $mol_text_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        Text(): $mol_text;
    }
}

declare namespace $ {
    class $mol_textarea extends $mol_view {
        event(): {
            "keydown": (event?: any) => any;
        };
        press(event?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Edit(): $mol_string;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        enabled(): boolean;
        View(): $mol_text;
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
        title(): string;
        sub(): any[];
        Empty_descr(): $mol_textarea;
        empty_descr(val?: any, force?: $mol_atom_force): any;
        Filled_descr(): $mol_textarea;
        filled_descr(val?: any, force?: $mol_atom_force): any;
        Disabled(): $mol_textarea;
    }
}

declare namespace $ {
    class $mol_icon_mol extends $mol_icon {
        view_box(): string;
        path(): string;
    }
}

declare namespace $ {
    class $mol_app_demo_placeholder extends $mol_book_placeholder {
        sub(): any[];
        Content(): $mol_card;
        Title(): $mol_view;
        Logo(): $mol_icon_mol;
        title(): string;
        Description(): $mol_view;
        description(): string;
        Advantages(): $mol_view;
        Technology(): $mol_app_placeholder_advantage;
        technology(): string;
        Code(): $mol_app_placeholder_advantage;
        code_rate(): string;
        Programming(): $mol_app_placeholder_advantage;
        programming(): string;
        Links(): $mol_row;
        Github_link(): $$.$mol_link_iconed;
        Showcase_link(): $$.$mol_link_iconed;
        showcase_title(): string;
    }
}
declare namespace $ {
    class $mol_app_placeholder_advantage extends $mol_view {
        sub(): any[];
        Image(): $mol_image;
        image(): string;
        title(): string;
    }
}

declare namespace $ {
    class $mol_icon_source extends $mol_icon {
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
        path(): any[];
        Trigger(): $mol_app_studio_field_title;
        expanded(val?: any, force?: $mol_atom_force): any;
        Trigger_label(): $mol_dimmer;
        highlight(): string;
        tools(): any[];
        Type(): $mol_select;
        type(val?: any, force?: $mol_atom_force): any;
        type_hint(): string;
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
        Object(): $mol_select;
        class(val?: any, force?: $mol_atom_force): any;
        object_options(): any[];
        object_hint(): string;
        content(): any[];
        Bool(): $mol_switch;
        value_bool(val?: any, force?: $mol_atom_force): any;
        Number(): $mol_number;
        value_number(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        String(): $mol_textarea;
        value_string(val?: any, force?: $mol_atom_force): any;
        Bind(): $mol_select;
        bind(val?: any, force?: $mol_atom_force): any;
        bind_options(): any[];
        bind_hint(): string;
        Prop_add(): $mol_button_minor;
        prop_add_label(): string;
        event_prop_add(val?: any, force?: $mol_atom_force): any;
        List(): $mol_list;
        list_rows(): any[];
        Add(): $mol_select;
        add_hint(): string;
        add_item(val?: any, force?: $mol_atom_force): any;
        item_types(): {
            "get": string;
            "string": string;
            "number": string;
            "bool": string;
            "list": string;
            "dict": string;
            "null": string;
        };
        List_trigger_icon(): $mol_icon_plus;
        Dict(): $mol_list;
        pairs(): any[];
        Add_pair(): $mol_bar;
        Add_pair_key(): $mol_search;
        add_pair_hint(): string;
        add_pair_key(val?: any, force?: $mol_atom_force): any;
        key_suggests(): any[];
        Add_pair_submit(): $mol_button_minor;
        add_pair(val?: any, force?: $mol_atom_force): any;
        Add_pair_submit_icon(): $mol_icon_plus;
        Overs(): $mol_list;
        overs(): any[];
        Add_over(): $mol_select;
        add_over_hint(): string;
        add_over(val?: any, force?: $mol_atom_force): any;
        Overs_trigger_icon(): $mol_icon_plus;
        over_options(): any[];
        Prop(id: any): $mol_app_studio_field;
        prop_path(id: any): any[];
        prop_arg(id: any): {};
        prop(path: any, val?: any, force?: $mol_atom_force): any;
        props(name: any, val?: any, force?: $mol_atom_force): any;
        prop_value(id: any): any;
        prop_add(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_studio_field_title extends $mol_check_expand {
        attr(): {
            "mol_app_studio_field_title_type": string;
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
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
    class $mol_app_studio extends $mol_book {
        value_overrided(id: any, val?: any, force?: $mol_atom_force): any;
        pages(): any[];
        Preview_page(): $mol_page;
        preview_title(): string;
        Source_link(): $mol_link;
        Source_icon(): $mol_icon_source;
        source_arg(): {
            "source": string;
            "path": any;
        };
        Edit(): $mol_link;
        Edit_icon(): $mol_icon_settings;
        tools_main(): any[];
        Selector(): $mol_app_studio_selector;
        Block(): $mol_view;
        path(val?: any, force?: $mol_atom_force): any;
        Editor_page(): $mol_page;
        Speech_filter(): $mol_speech;
        speech_filter(val?: any, force?: $mol_atom_force): any;
        speech_filter_patterns(): any[];
        editor_title(): string;
        Editor_close(): $mol_link;
        Editor_close_icon(): $mol_icon_cross;
        editor_close_arg(): {
            "path": any;
        };
        Filter_bar(): $mol_bar;
        filter_bar_items(): any[];
        Filter(): $mol_search;
        filter_hint(): string;
        prop_filter(val?: any, force?: $mol_atom_force): any;
        Prop_add(): $mol_button_minor;
        event_add(val?: any, force?: $mol_atom_force): any;
        Prop_add_icon(): $mol_icon_plus;
        prop_add_hint(): string;
        Fields(): $mol_list;
        fields(): any[];
        Source_page(): $mol_page;
        source_title(): string;
        Source_close(): $mol_link;
        Source_close_icon(): $mol_icon_cross;
        source_close_arg(): {
            "source": any;
        };
        Source(): $mol_text;
        source(): string;
        Placeholder(): any;
        Prop(id: any): $mol_app_studio_field;
        prop_path(id: any): any[];
        prop_default(path: any, val?: any, force?: $mol_atom_force): any;
        props_all(name: any, val?: any, force?: $mol_atom_force): any;
        prop_arg(id: any): {};
        prop_value_base(id: any): any;
        prop_options(): any[];
        view_options(): any[];
        prop_add(val?: any, force?: $mol_atom_force): any;
        class_name_self(val?: any, force?: $mol_atom_force): any;
        class_name_base(val?: any, force?: $mol_atom_force): any;
        class_self(val?: any, force?: $mol_atom_force): any;
        classes(): $mol_tree;
    }
}
declare namespace $ {
    class $mol_app_studio_selector extends $mol_demo_large {
        event(): {
            "contextmenu": (event?: any) => any;
            "dblclick": (event?: any) => any;
        };
        select(event?: any, force?: $mol_atom_force): any;
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
        status(): any;
        minimal_height(): number;
        minimal_width(): number;
        sub(): any[];
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
        editor_title(): string;
        detail_title(): string;
        source_prefix(): string;
        Placeholder(): $mol_app_demo_placeholder;
        pages(): any[];
        blocks(): any[];
        attr(): {
            "mol_theme": any;
        };
        Menu(): $mol_app_demo_menu;
        nav_hierarchy(): any;
        nav_option(id: any): any;
        filter_string(val?: any, force?: $mol_atom_force): any;
        theme(val?: any, force?: $mol_atom_force): any;
        Detail(): $mol_app_demo_detail;
        source_link(): string;
        Detail_list(): $mol_list;
        main_content(): any[];
        Editor(id: any): $mol_app_studio;
        selected_class_name(): string;
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        close_arg(): {
            "edit": any;
        };
        Welcome(): $mol_scroll;
        Welcome_text(): $mol_text;
        welcome_text(): string;
        Detail_empty_message(): $mol_status;
        detail_empty_prefix(): string;
        selected(): string;
        detail_empty_postfix(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_menu extends $mol_page {
        minimal_width(): number;
        title(): string;
        sub(): any[];
        Filter(): $mol_search;
        filter(val?: any, force?: $mol_atom_force): any;
        Nav(): $mol_app_demo_nav;
        hierarchy(): any;
        option(id: any): any;
        Themes(): $mol_switch;
        theme(val?: any, force?: $mol_atom_force): any;
        theme_light_title(): string;
        theme_dark_title(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_detail extends $mol_page {
        tools(): any[];
        Source_link(): $mol_link;
        Source_icon(): $mol_icon_source;
        source_link(): string;
        Edit(): $mol_link;
        Edit_speck(): $mol_speck;
        Edit_icon(): $mol_icon_settings;
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        close_arg(): {
            "demo": any;
        };
    }
}
declare namespace $ {
    class $mol_app_demo_nav extends $mol_grid {
        row_height(): number;
        hierarchy_col(): string;
        Head(): any;
        Option(id: any): $mol_link;
        arg(id: any): {};
        Expand(id: any): $$.$mol_check_expand;
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
