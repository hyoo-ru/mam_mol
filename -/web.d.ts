declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static toString(): string;
        private 'object_owner()';
        object_owner(next?: Object): Object;
        private 'object_field()';
        object_field(next?: string): string;
        toString(): string;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
    }
}
declare namespace $ {
    class $mol_set<Value> {
        size: number;
        add(key: Value): this;
        delete(key: Value): void;
        has(key: Value): boolean;
        clear(): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        forEach(handler: (key: Value, value: Value) => void): void;
    }
    class $mol_set_shim<Value> implements $mol_set<Value> {
        _index: {
            [index: string]: Value[];
        };
        size: number;
        add(value: Value): this;
        has(value: Value): boolean;
        delete(value: Value): void;
        forEach(handle: (val: Value, key: Value) => void): void;
        keys(): Value[];
        values(): Value[];
        entries(): [Value, Value][];
        clear(): void;
    }
}
declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destroyed(next?: boolean): boolean;
        static all: $mol_defer[];
        static timer: number;
        static scheduleNative: (handler: () => void) => number;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}
declare namespace $ {
    class $mol_dict<Key, Value> {
        size: number;
        get(key: Key): Value;
        set(key: Key, value: Value): this;
        delete(key: Key): void;
        has(key: Key): boolean;
        clear(): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        forEach(handler: (value: Value, key: Key) => void): void;
    }
    class $mol_dict_shim<Key, Value> implements $mol_dict<Key, Value> {
        _keys: {
            [index: string]: Key[];
        };
        _values: {
            [index: string]: Value[];
        };
        size: number;
        set(key: Key, value: Value): this;
        get(key: Key): Value;
        has(key: Key): boolean;
        delete(key: Key): void;
        forEach(handle: (val: Value, key: Key) => void): void;
        keys(): Key[];
        values(): Value[];
        entries(): [Key, Value][];
        clear(): void;
    }
}
declare namespace $ {
    var $mol_state_stack: $mol_dict<string, any>;
}
declare var Proxy: any;
declare namespace $ {
    enum $mol_atom_status {
        obsolete,
        checking,
        pulling,
        actual,
    }
    class $mol_atom<Value> extends $mol_object {
        masters: $mol_set<$mol_atom<any>>;
        slaves: $mol_set<$mol_atom<any>>;
        status: $mol_atom_status;
        autoFresh: boolean;
        handler: (next?: Value | Error, force?: $mol_atom_force) => Value;
        host: {
            [key: string]: any;
        };
        field: string;
        constructor(host: any, handler: (next?: Value | Error, force?: $mol_atom_force) => Value, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        toString(): string;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value;
        set(next: Value): Value;
        push(next: Value | Error): Value;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        value(next?: Value, force?: $mol_atom_force): Value;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: $mol_set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
    }
    class $mol_atom_wait extends Error {
        message: string;
        name: string;
        constructor(message?: string);
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
    }
    function $mol_atom_task<Value>(host: any, handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>) => void;
    function $mol_mem_key<Host, Key, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>) => void;
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
    let $mol_view_context: $mol_view_context;
    interface $mol_view_context {
        $mol_view_visible_width(): number;
        $mol_view_visible_height(): number;
    }
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        title(): string;
        static state_prefix(): string;
        state_prefix(): any;
        state_key(postfix: string): string;
        context(next?: $mol_view_context): $mol_view_context;
        context_sub(): $mol_view_context;
        dom_name(): string;
        dom_name_space(): string;
        sub(): (string | number | boolean | Node | $mol_view)[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
        minimal_width(): number;
        private 'dom_node()';
        dom_node(next?: Element): Element;
        static render_sub(node: Element, sub: ($mol_view | Node | string | number | boolean)[]): void;
        static render_attr(node: Element, attrs: {
            [key: string]: () => string | number | boolean;
        }): void;
        static render_style(node: HTMLElement, styles: {
            [key: string]: () => string | number;
        }): void;
        static render_field(node: any, field: {
            [key: string]: (next?: any) => any;
        }): void;
        dom_tree(): HTMLElement;
        attr(): {
            [key: string]: () => string | number | boolean;
        };
        style(): {
            [key: string]: () => string | number;
        };
        field(): {
            [key: string]: (next?: any) => any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        locale_contexts(): string[];
    }
}
interface Window {
    cordova: any;
}
declare namespace $ {
}
declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    class $mol_scroll extends $mol_view {
        minimal_height(): number;
        scroll_top(val?: any): any;
        scroll_left(val?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "scrollTop": (val?: any) => any;
            "scrollLeft": (val?: any) => any;
        };
        event_scroll(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "scroll": (event?: any) => any;
            "overflow": (event?: any) => any;
            "underflow": (event?: any) => any;
        };
    }
}
declare namespace $ {
    interface $mol_view_context {
        $mol_scroll_scroll_top(): number;
        $mol_scroll_scroll_left(): number;
        $mol_scroll_moving(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number): number;
        scroll_left(next?: number): number;
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        moving(next?: boolean): boolean;
        context_sub(): $mol_view_context;
    }
}
declare namespace $ {
    class $mol_page extends $mol_view {
        Title(): $mol_view;
        head(): any[];
        Head(): $mol_view;
        body(): any[];
        Body(): $mol_scroll;
        foot(): any[];
        Foot(): $mol_view;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static value(key: string, next?: string): string;
        static link(next: {
            [key: string]: string;
        }): string;
        static make(next: {
            [key: string]: string;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string;
        sub(postfix: string): $mol_state_arg<{}>;
        link(next: {
            [key: string]: string;
        }): string;
    }
}
declare namespace $ {
    class $mol_stack extends $mol_view {
        side(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_stack_side": () => any;
        };
        main(): any[];
        Main(): $mol_view;
        addon(): any[];
        Addon(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_stack extends $.$mol_stack {
        side(next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_list extends $mol_view {
        style(): {
            [key: string]: () => string | number;
        } & {
            "minHeight": () => any;
        };
        rows(): any[];
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_list extends $.$mol_list {
        row_offsets(): number[];
        row_context(index: number): $mol_view_context;
        sub_visible(): any[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_float extends $mol_view {
        shiftStyle(): string;
        style(): {
            [key: string]: () => string | number;
        } & {
            "transform": () => any;
        };
        scrolling(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_float_scrolling": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_float extends $.$mol_float {
        shiftStyle(): string;
        scrolling(): boolean;
    }
}
declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        event_click(event?: any): any;
        event_activate(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (event?: any) => any;
        };
        disabled(): boolean;
        tab_index(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "role": () => any;
            "tabindex": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        tab_index(): string;
    }
}
declare namespace $ {
    class $mol_button_major extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_minor extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_danger extends $mol_button {
    }
}
declare namespace $ {
    class $mol_check extends $mol_button {
        checked(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "role": () => any;
            "tabindex": () => any;
        } & {
            "mol_check_checked": () => any;
            "aria-checked": () => any;
            "role": () => any;
        };
        Icon(): any;
        label(): any[];
        Label(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_check extends $.$mol_check {
        event_click(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_svg extends $mol_view {
        dom_name(): string;
        dom_name_space(): string;
    }
}
declare namespace $ {
    class $mol_svg_root extends $mol_view {
        dom_name(): string;
        viewBox(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "viewBox": () => any;
        };
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        geometry(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "d": () => any;
        };
    }
}
declare namespace $ {
    class $mol_svg_circle extends $mol_svg {
        dom_name(): string;
        radius(): string;
        pos_x(): string;
        pos_y(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "r": () => any;
            "cx": () => any;
            "cy": () => any;
        };
    }
}
declare namespace $ {
    class $mol_icon extends $mol_svg {
        viewBox(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "viewBox": () => any;
        };
        path(): string;
        pather(): $mol_svg_path;
        sub(): any[];
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
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_check_expand extends $mol_check {
        Icon(): $mol_icon_chevron;
        sub(): any[];
        level(): number;
        level_style(): string;
        style(): {
            [key: string]: () => string | number;
        } & {
            "paddingLeft": () => any;
        };
        expanded(val?: any): any;
        checked(val?: any): any;
        expandable(): boolean;
        enabled(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}
declare namespace $ {
    class $mol_dimmer extends $mol_view {
        haystack(): string;
        needle(): string;
        parts(): any[];
        sub(): any[];
        string(id: any): string;
        low(id: any): $mol_dimmer_low;
    }
}
declare namespace $ {
    class $mol_dimmer_low extends $mol_view {
        dom_name(): string;
    }
}
declare namespace $.$mol {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
    }
}
declare namespace $ {
    class $mol_grid extends $mol_scroll {
        row_ids(): any[];
        row_id(index: any): any;
        col_ids(): any[];
        records(): any[];
        record(id: any): any;
        hierarchy(): any;
        hierarchy_col(): string;
        gap_top(): number;
        gap_bottom(): number;
        rows_visible(): any[];
        Table(): $mol_grid_table;
        sub(): any[];
        rows(): any[];
        row_height(): number;
        head_cells(): any[];
        Head(): $mol_grid_row;
        cells(id: any): any[];
        Row(id: any): $mol_grid_row;
        cell(id: any): any;
        cell_content(id: any): any[];
        cell_content_text(id: any): any[];
        Cell_text(id: any): $mol_grid_cell;
        cell_content_number(id: any): any[];
        Cell_number(id: any): $mol_grid_number;
        col_head_content(id: any): any[];
        Col_head(id: any): $mol_float;
        cell_level(id: any): number;
        cell_expanded(id: any, val?: any): any;
        Cell_branch(id: any): $mol_check_expand;
        needle(): string;
        cell_value(id: any): string;
        Cell_dimmer(id: any): $mol_dimmer;
        Cell_content(id: any): any[];
    }
}
declare namespace $ {
    class $mol_grid_table extends $mol_view {
        dom_name(): string;
        gap_top(): number;
        gap_bottom(): number;
        style(): {
            [key: string]: () => string | number;
        } & {
            "marginTop": () => any;
            "marginBottom": () => any;
        };
    }
}
declare namespace $ {
    class $mol_grid_row extends $mol_view {
        dom_name(): string;
        height(): number;
        style(): {
            [key: string]: () => string | number;
        } & {
            "height": () => any;
        };
        cells(): any[];
        sub(): any[];
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
declare namespace $.$mol {
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
        gap_bottom(): number;
        head_cells(): $.$mol_float[];
        col_head_content(colId: string): string[];
        rows(): $mol_grid_row[];
        cells(row_id: string[]): $mol_view[];
        col_type(col_id: string): "text" | "number" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any;
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
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
    class $mol_grid_table extends $.$mol_grid_table {
        context_sub(): $mol_view_context;
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
}
declare namespace $ {
    class $mol_text extends $mol_list {
        text(): string;
        block_content(id: any): any[];
        block_type(id: any): string;
        Row(id: any): $mol_text_row;
        Span(id: any): $mol_text_spanner;
        Link(id: any): $mol_text_linker;
        Image(id: any): $mol_text_imager;
        header_level(id: any): number;
        header_content(id: any): any[];
        Header(id: any): $mol_text_header;
        table_head_cells(id: any): any[];
        table_rows(id: any): any[];
        Table(id: any): $mol_grid;
        table_cells(id: any): any[];
        Table_row(id: any): $mol_grid_row;
        table_cell_content(id: any): any[];
        Table_cell(id: any): $mol_grid_cell;
        Table_cell_head(id: any): $mol_float;
    }
}
declare namespace $ {
    class $mol_text_row extends $mol_view {
        minimal_height(): number;
        type(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_text_type": () => any;
        };
    }
}
declare namespace $ {
    class $mol_text_header extends $mol_view {
        dom_name(): string;
        level(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_text_header_level": () => any;
        };
        content(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_text_spanner extends $mol_view {
        dom_name(): string;
        type(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_text_type": () => any;
        };
        content(val?: any): any;
        sub(): any;
    }
}
declare namespace $ {
    class $mol_text_linker extends $mol_view {
        dom_name(): string;
        type(val?: any): any;
        link(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_text_type": () => any;
            "href": () => any;
        };
        content(val?: any): any;
        sub(): any;
    }
}
declare namespace $ {
    class $mol_text_imager extends $mol_view {
        dom_name(): string;
        type(val?: any): any;
        link(val?: any): any;
        title(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_text_type": () => any;
            "src": () => any;
            "alt": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_text extends $.$mol_text {
        tokens_flow(): $mol_syntax_token[];
        rows(): ($.$mol_grid | $mol_text_row | $mol_text_header)[];
        header_level(index: number): number;
        header_content(index: number): ($mol_text_spanner | $mol_text_imager)[];
        block_type(index: number): string;
        cell_contents(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $.$mol_float[];
        table_cells(id: {
            block: number;
            row: number;
        }): $mol_grid_cell[];
        table_cell_content(id: {
            block: number;
            row: number;
            cell: number;
        }): ($mol_text_spanner | $mol_text_imager)[];
        text2spans(prefix: string, text: string): ($mol_text_spanner | $mol_text_imager)[];
        block_content(indexBlock: number): ($mol_view | string)[];
    }
}
declare namespace $ {
    class $mol_portion_indicator extends $mol_view {
        widthStyle(): string;
        style(): {
            [key: string]: () => string | number;
        } & {
            "width": () => any;
        };
    }
}
declare namespace $ {
    class $mol_portion extends $mol_view {
        portion(): number;
        indWidthStyle(): string;
        indicator(): $mol_portion_indicator;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_portion extends $.$mol_portion {
        indWidthStyle(): string;
    }
}
declare namespace $ {
    class $mol_icon_sort_asc extends $mol_icon {
        path(): string;
    }
}
declare var localStorage: Storage;
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): any;
        prefix(): string;
        value(key: string, next?: Value): any;
    }
}
declare namespace $ {
}
declare namespace $ {
    class $mol_http_request extends $mol_object {
        uri(): string;
        method(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        body(): any;
        'native()': XMLHttpRequest;
        native(): XMLHttpRequest;
        destroyed(next?: boolean): boolean;
        response(next?: any, force?: $mol_atom_force): any;
        text(next?: string, force?: $mol_atom_force): string;
    }
}
declare namespace $ {
    var $mol_http_request_native: () => XMLHttpRequest;
}
declare namespace $ {
    class $mol_http_resource extends $mol_object {
        static item(uri: string): $mol_http_resource;
        uri(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        request(): $mol_http_request;
        text(next?: string, force?: $mol_atom_force): string;
    }
    class $mol_http_resource_json<Content> extends $mol_http_resource {
        static item<Content>(uri: string): $mol_http_resource_json<Content>;
        json(next?: Content, force?: $mol_atom_force): Content;
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang(next?: string): any;
        static texts(): $mol_locale_dict;
        static text(contexts: string[], key: string): string;
    }
}
declare namespace $ {
    class $mol_bench extends $mol_grid {
        result(): any;
        result_sorted(): any;
        records(): any;
        col_sort(val?: any): any;
        event_sort_toggle(id: any, val?: any): any;
        col_head_label(id: any): any[];
        Col_head_sort(id: any): $mol_icon_sort_asc;
        col_head_content(id: any): any[];
        Col_head(id: any): $mol_bench_head;
        result_value(id: any): string;
        result_portion(id: any): number;
        Result_portion(id: any): $mol_portion;
        cell_content_number(id: any): any[];
    }
}
declare namespace $ {
    class $mol_bench_head extends $mol_float {
        event_click(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (val?: any) => any;
        };
        hint(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_float_scrolling": () => any;
        } & {
            "title": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_bench extends $.$mol_bench {
        col_sort(next?: string): any;
        result_sorted(): any;
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
        col_type(col: string): "text" | "number" | "branch";
        cell_content_number(id: {
            row: string[];
            col: string;
        }): any[];
        col_head_content(col: string): any[];
    }
}
declare namespace $ {
    class $mol_app_bench extends $mol_stack {
        description(): string;
        Descr(): $mol_text;
        result(): any;
        result_col_title(id: any): any[];
        result_col_sort(val?: any): any;
        Result(): $mol_bench;
        Inform(): $mol_view;
        Sandbox(): $mol_view;
        Main_page(): $mol_page;
        main(): any[];
        addon_title(): string;
        menu_options(): any[];
        Menu(): $mol_list;
        Addon_page(): $mol_page;
        addon(): any[];
        menu_option_checked(id: any, val?: any): any;
        menu_option_title(id: any): string;
        Menu_option(id: any): $mol_check_box;
        result_col_title_sample(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_bench extends $.$mol_app_bench {
        bench(next?: string): any;
        sandbox(next?: HTMLIFrameElement, force?: $mol_atom_force): HTMLIFrameElement;
        'command_current()': any[];
        command_current(next?: any[], force?: $mol_atom_force): any[];
        command_result<Result>(command: any[], next?: Result): Result;
        meta(): {
            title: {
                [lang: string]: string;
            };
            descr: {
                [lang: string]: string;
            };
            samples: {
                [sample: string]: {
                    title: {
                        [lang: string]: string;
                    };
                };
            };
            steps: {
                [step: string]: {
                    title: {
                        [lang: string]: string;
                    };
                };
            };
        };
        samples_all(next?: string[]): string[];
        samples(next?: string[]): string[];
        steps(next?: string[]): string[];
        title(): string;
        description(): string;
        result_sample(sampleId: string): {
            [key: string]: any;
        };
        result(): {
            [sample: string]: {
                [step: string]: any;
            };
        };
        result_col_title(col_id: string): string[];
        result_col_sort(next?: string): any;
        menu_options(): $mol_check_box[];
        menu_option_title(sample: string): string;
        menu_option_checked(sample: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_bench_demo extends $mol_app_bench {
        bench(): string;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol extends $mol_scroll {
        sample(): string;
        Head(): $mol_view;
        rows(): any[];
        List(): $mol_list;
        sub(): any[];
        row_selected(id: any, val?: any): any;
        row_title(id: any): string;
        row_content(id: any): string;
        Row(id: any): $mol_app_bench_list_mol_row;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol_row extends $mol_check {
        selected(val?: any): any;
        minimal_height(): number;
        title(): string;
        Title(): $mol_view;
        content(): string;
        Content(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    interface $mol_app_bench_list_mol_data {
        sample: string;
        items: {
            id: number;
            title: string;
            content: string;
        }[];
    }
    class $mol_app_bench_list_mol extends $.$mol_app_bench_list_mol {
        static data(next?: $mol_app_bench_list_mol_data, force?: $mol_atom_force): $mol_app_bench_list_mol_data;
        sample(): string;
        items(): {
            id: number;
            title: string;
            content: string;
        }[];
        rows(): $mol_app_bench_list_mol_row[];
        row_title(id: number): string;
        row_content(id: number): string;
        row_selected(id: number, next?: boolean): boolean;
        selected_id(next?: number): number;
    }
}
declare namespace $ {
    interface $mol_dom_make_config {
        [key: string]: any;
        id: string;
        tagName?: string;
        namespaceURI?: string;
        childNodes?: NodeList | Array<Node | string | $mol_dom_make_config>;
    }
    function $mol_dom_make<tagName extends string>(config: $mol_dom_make_config): HTMLElement;
}
declare namespace JSX {
    interface Element extends HTMLElement {
    }
    interface ElementClass extends HTMLElement {
    }
    interface IntrinsicElements {
        a: any;
        abbr: any;
        address: any;
        area: any;
        article: any;
        aside: any;
        audio: any;
        b: any;
        base: any;
        bdi: any;
        bdo: any;
        big: any;
        blockquote: any;
        body: any;
        br: any;
        button: any;
        canvas: any;
        caption: any;
        cite: any;
        code: any;
        col: any;
        colgroup: any;
        data: any;
        datalist: any;
        dd: any;
        del: any;
        details: any;
        dfn: any;
        dialog: any;
        div: any;
        dl: any;
        dt: any;
        em: any;
        embed: any;
        fieldset: any;
        figcaption: any;
        figure: any;
        footer: any;
        form: any;
        h1: any;
        h2: any;
        h3: any;
        h4: any;
        h5: any;
        h6: any;
        head: any;
        header: any;
        hgroup: any;
        hr: any;
        html: any;
        i: any;
        iframe: any;
        img: any;
        input: any;
        ins: any;
        kbd: any;
        keygen: any;
        label: any;
        legend: any;
        li: any;
        link: any;
        main: any;
        map: any;
        mark: any;
        menu: any;
        menuitem: any;
        meta: any;
        meter: any;
        nav: any;
        noindex: any;
        noscript: any;
        object: any;
        ol: any;
        optgroup: any;
        option: any;
        output: any;
        p: any;
        param: any;
        picture: any;
        pre: any;
        progress: any;
        q: any;
        rp: any;
        rt: any;
        ruby: any;
        s: any;
        samp: any;
        script: any;
        section: any;
        select: any;
        small: any;
        source: any;
        span: any;
        strong: any;
        style: any;
        sub: any;
        summary: any;
        sup: any;
        table: any;
        tbody: any;
        td: any;
        textarea: any;
        tfoot: any;
        th: any;
        thead: any;
        time: any;
        title: any;
        tr: any;
        track: any;
        u: any;
        ul: any;
        var: any;
        video: any;
        wbr: any;
    }
}
declare namespace $ {
    function $mol_dom_jsx(tagName: string, props: $mol_dom_make_config, ...childNodes: Array<Node | string | $mol_dom_make_config>): HTMLElement;
}
declare namespace $ {
    class $mol_app_bench_list_tsx {
        static data: {
            sample: string;
            items: {
                id: number;
                title: string;
                content: string;
            }[];
        };
        static selected: number;
        static onClick(item: {
            id: number;
        }, event: MouseEvent): void;
        static render(): JSX.Element;
    }
}
declare namespace $ {
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        hint(): string;
        type(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "placeholder": () => any;
            "type": () => any;
        };
        disabled(): boolean;
        value(val?: any): any;
        value_changed(val?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "disabled": () => any;
            "value": () => any;
        };
        event_change(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (event?: any) => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_row extends $mol_view {
        style(): {
            [key: string]: () => string | number;
        } & {
            "minHeight": () => any;
        };
    }
}
declare namespace $ {
    class $mol_row_sub extends $mol_view {
    }
}
declare namespace $.$mol {
    class $mol_row extends $.$mol_row {
        item_offsets_top(): number[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_status extends $mol_view {
        status(): any;
        message(): string;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_status extends $.$mol_status {
        message(): any;
    }
}
declare namespace $ {
    class $mol_link extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        uri(): string;
        current(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "href": () => any;
            "mol_link_current": () => any;
        };
        arg(): {};
    }
}
declare namespace $.$mol {
    class $mol_link extends $.$mol_link {
        uri(): string;
        current(): boolean;
    }
}
declare namespace $ {
    class $mol_demo extends $mol_view {
        name(): string;
        title(): string;
        titler(): $mol_link;
        header(): $mol_view;
        widget(): any;
        screener(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_demo extends $.$mol_demo {
        widget(): $mol_view;
        title(): string;
    }
}
declare namespace $ {
    class $mol_demo_small extends $mol_demo {
        minimal_height(): number;
        minimal_width(): number;
    }
}
declare namespace $ {
    class $mol_demo_medium extends $mol_demo {
    }
}
declare namespace $ {
    class $mol_demo_large extends $mol_demo {
    }
}
declare namespace $ {
    class $mol_app_demo extends $mol_stack {
        detail_title(): string;
        Main_content(): any[];
        Detail(): $mol_app_demo_page;
        main(): any[];
        filter_hint(): string;
        filter_string(val?: any): any;
        Filter_string(): $mol_string;
        Nav_head(): $mol_row;
        nav_hierarchy(): any;
        nav_option(id: any): any;
        Nav(): $mol_app_demo_nav;
        Menu(): $mol_page;
        addon(): any[];
        welcome_text(): string;
        Welcome_text(): $mol_text;
        Welcome(): $mol_scroll;
        Samples(): any[];
        Detail_row(): $mol_row;
        detail_empty_prefix(): string;
        selected(): string;
        detail_empty_postfix(): string;
        Detail_empty_message(): $mol_status;
    }
}
declare namespace $ {
    class $mol_app_demo_page extends $mol_page {
        Back_icon(): $mol_icon_chevron;
        back_arg(): {
            "demo": () => any;
        };
        Back(): $mol_link;
        head(): any[];
    }
}
declare namespace $ {
    class $mol_app_demo_nav extends $mol_grid {
        row_height(): number;
        hierarchy_col(): string;
        Head(): any;
        arg(id: any): {};
        Expand(id: any): $mol_check_expand;
        Option(id: any): $mol_link;
    }
}
declare namespace $.$mol {
    class $mol_app_demo extends $.$mol_app_demo {
        title(): string;
        welcome_text(): string;
        names_demo_all(): string[];
        names_demo_filtered(): string[];
        nav_hierarchy(): {
            [prefix: string]: $mol_grid_node;
        };
        nav_option(id: string): {
            title: string;
        };
        selected(): any;
        option(name: string): $mol_link;
        widget(name: string): $mol_view;
        detail_title(): string;
        names_demo(): string[];
        Main_content(): $.$mol_status[] | $mol_demo_large[] | $.$mol_row[];
        Samples(): $mol_demo_small[];
        Sample_small(name: string): $mol_demo_small;
        Sample_large(name: string): $mol_demo_large;
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
            'demo': () => string;
        };
    }
}
declare namespace $ {
    class $mol_app_habhub extends $mol_page {
        title(): string;
        gists(): any[];
        status(): $mol_status;
        gist_rows(): any[];
        list(): $mol_list;
        body(): any[];
        gist_content(id: any): string;
        Gist_row(id: any): $mol_text;
        footer(): any;
    }
}
declare namespace $.$mol {
    interface $mol_app_habhub_gist {
        id: number;
        title: string;
        body: string;
    }
    class $mol_app_habhub extends $.$mol_app_habhub {
        uriSource(): string;
        gists(): $mol_app_habhub_gist[];
        gist_rows(): $mol_view[];
        gist_content(index: number): string;
    }
}
declare namespace $ {
    class $mol_app_habhub_demo extends $mol_app_habhub {
    }
}
declare namespace $ {
    class $mol_app_hello extends $mol_view {
        name_hint(): string;
        name(val?: any): any;
        Name(): $mol_string;
        greeting(): string;
        Greeting(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_hello extends $.$mol_app_hello {
        greeting(): string;
    }
}
declare namespace $ {
    class $mol_app_hello_demo extends $mol_app_hello {
    }
}
declare namespace $ {
    class $mol_app_inventory extends $mol_view {
        domain(): $mol_app_inventory_domain;
        Page(): any;
        sub(): any[];
        Head(): $mol_app_inventory_head;
        Enter(): $mol_app_inventory_enter;
        Controller(): $mol_app_inventory_controller;
        Keeper(): $mol_app_inventory_keeper;
        Stats(): $mol_app_inventory_stats;
    }
}
declare namespace $ {
    class $mol_app_inventory_head extends $mol_row {
        keeper_label(): string;
        Keeper_link(): $mol_link;
        control_label(): string;
        Control_link(): $mol_link;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory extends $.$mol_app_inventory {
        Page(): $mol_view;
        page_name(next?: string): any;
    }
}
declare namespace $ {
    class $mol_app_inventory_stats extends $mol_page {
        domain(): $mol_app_inventory_domain;
    }
}
declare namespace $ {
    class $mol_bar extends $mol_view {
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
    class $mol_number extends $mol_bar {
        precision(): number;
        precision_view(): number;
        precision_change(): number;
        value(val?: any): any;
        event_wheel(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "wheel": (val?: any) => any;
        };
        event_dec(val?: any): any;
        enabled(): boolean;
        dec_enabled(): boolean;
        dec_icon(): $mol_icon_minus;
        Dec(): $mol_button;
        value_string(val?: any): any;
        hint(): string;
        string_enabled(): boolean;
        String(): $mol_string;
        event_inc(val?: any): any;
        inc_enabled(): boolean;
        inc_icon(): $mol_icon_plus;
        Inc(): $mol_button;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_number extends $.$mol_number {
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): any;
        event_wheel(next?: MouseWheelEvent): void;
    }
}
declare namespace $ {
    class $mol_switch extends $mol_view {
        minimal_height(): number;
        option_checked(id: any, val?: any): any;
        option_title(id: any): string;
        enabled(): boolean;
        option_enabled(id: any): boolean;
        Option(id: any): $mol_check;
        value(val?: any): any;
        options(): {};
        items(): any[];
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_switch extends $.$mol_switch {
        value(next?: any): any;
        options(): {
            [key: string]: () => string;
        };
        items(): $.$mol_check[];
        option_title(key: string): string;
        option_checked(key: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_inventory_position extends $mol_row {
        position(): any;
        title(): string;
        Title(): $mol_view;
        description(): string;
        Description(): $mol_view;
        Product(): $mol_view;
        count(val?: any): any;
        Count(): $mol_number;
        status(val?: any): any;
        status_label_pending(): string;
        status_label_approved(): string;
        status_label_rejected(): string;
        Status(): $mol_switch;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_position extends $.$mol_app_inventory_position {
        position(): $mol_app_inventory_domain_position;
        title(): string;
        description(): string;
        count(next?: number): number;
        status(next?: $mol_app_inventory_domain_position_status): $mol_app_inventory_domain_position_status;
    }
}
declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
}
declare namespace $ {
    class $mol_code extends $mol_view {
        value(val?: any): any;
        format(): string;
        hint(): string;
        Manual(): $mol_string;
        event_scan(val?: any): any;
        scan_label(): string;
        Scan(): $mol_button;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_code extends $.$mol_code {
        scan_support(): boolean;
        Scan(): $.$mol_button;
        event_scan(): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper extends $mol_page {
        domain(): $mol_app_inventory_domain;
        position_rows(): any[];
        body(): any[];
        position(id: any): any;
        Position_row(id: any): $mol_app_inventory_position;
        code_new(val?: any): any;
        code_new_hint(): string;
        Code(): $mol_code;
        event_submit(event?: any): any;
        submit_label(): string;
        Submit(): $mol_button_major;
        Action_row(): $mol_row;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
        position(code: string): $mol_app_inventory_domain_position;
        code_new(next?: string): string;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_submit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_controller extends $mol_page {
        domain(): $mol_app_inventory_domain;
        position_rows(): any[];
        body(): any[];
        position(id: any): any;
        Position_row(id: any): $mol_app_inventory_position;
        event_submit(event?: any): any;
        submit_label(): string;
        Submit(): $mol_button_major;
        Controls_row(): $mol_row;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
        position(code: string): $mol_app_inventory_domain_position;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_submit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_form extends $mol_view {
        submit_blocked(): boolean;
        form_fields(): any[];
        barFields(): $mol_view;
        buttons(): any[];
        barButtons(): $mol_row;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_form extends $.$mol_form {
        submit_blocked(): boolean;
    }
}
declare namespace $ {
    class $mol_form_field extends $mol_view {
        name(): string;
        namer(): $mol_view;
        errors(): any[];
        bider(): $mol_view;
        label(): $mol_view;
        control(): any;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_app_inventory_enter extends $mol_view {
        domain(): $mol_app_inventory_domain;
        entered(val?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_string;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_string;
        passwordField(): $mol_form_field;
        submitLabel(): string;
        event_submit(event?: any): any;
        submit_blocked(): boolean;
        submit(): $mol_button_major;
        form(): $mol_form;
        message(): string;
        sub(): any[];
        messageNoAccess(): string;
    }
}
declare var cpprun: any;
declare namespace $.$mol {
    class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
        event_submit(): void;
        message(): string;
    }
}
declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    function $mol_range_in<Item>(source: {
        item: (id: number) => Item;
        length: number;
    }): Item[];
    class $mol_range_common<Value> {
        item(id: number): Value;
        length: number;
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
declare var hhfw: any;
declare var sqlitePlugin: any;
declare namespace $ {
    class $mol_hyperhive extends $mol_object {
        static data<Value>(resource: {
            uri: string;
            table: string;
        }, next?: any, force?: $mol_atom_force): Value;
    }
}
declare namespace $ {
    class $mol_app_inventory_domain extends $mol_object {
        table<Row>(name: string): Row[];
        products_table(): $mol_app_inventory_domain_product_raw[];
        positions_table(): $mol_app_inventory_domain_product_raw[];
        product_rows_by_id(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        product_by_code(code: string): $mol_app_inventory_domain_product;
        product_rows_by_code(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        positions_dict(): {
            [code: string]: $mol_app_inventory_domain_position_raw;
        };
        products(): $mol_app_inventory_domain_product[];
        product(code: string): $mol_app_inventory_domain_product;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        position(productCode: string): $mol_app_inventory_domain_position;
        position_count(productCode: string, next?: number): any;
        position_status(productCode: string, next?: $mol_app_inventory_domain_position_status): any;
        credentials(next?: {
            login: string;
            password: string;
        }): {
            login: string;
            password: string;
        };
        authentificated(): boolean;
        message(): string;
    }
    interface $mol_app_inventory_domain_product_raw {
        R_MATERIAL_ID: string;
        R_BARCODE: string;
        R_NAME: string;
    }
    interface $mol_app_inventory_domain_position_raw {
        R_BARCODE: string;
    }
    class $mol_app_inventory_domain_product extends $mol_object {
        code(): string;
        title(): string;
        description(): string;
    }
    class $mol_app_inventory_domain_position extends $mol_object {
        product(): $mol_app_inventory_domain_product;
        count(next?: number): number;
        status(next?: $mol_app_inventory_domain_position_status): $mol_app_inventory_domain_position_status;
    }
    enum $mol_app_inventory_domain_position_status {
        draft,
        pending,
        rejected,
        approved,
        completed,
    }
}
declare namespace $ {
    class $mol_app_inventory_controller_demo extends $mol_app_inventory_controller {
        title1(): string;
        description1(): string;
        count1(val?: any): any;
        status1(val?: any): any;
        Position1(): $mol_app_inventory_position;
        title2(): string;
        description2(): string;
        count2(val?: any): any;
        status2(val?: any): any;
        Position2(): $mol_app_inventory_position;
        position_rows(): any[];
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
        mult(m: number): any;
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
declare module $jin {
    function concater(funcs: (string | {
        (val?: any): string;
    })[]): (val?: any) => string;
}
declare module $jin.time {
    class base_class {
        static patterns: any;
        static formatter(pattern: string): any;
        toString(pattern: string): any;
    }
}
declare function $jin_type(value: any): any;
declare module $jin.time {
    interface duration_iconfig {
        year?: number | string;
        month?: number | string;
        day?: number | string;
        hour?: number | string;
        minute?: number | string;
        second?: number | string;
    }
    class duration_class extends $jin.time.base_class {
        static make(duration?: number | number[] | string | duration_iconfig): duration_class;
        _year: number;
        readonly year: number;
        _month: number;
        readonly month: number;
        _day: number;
        readonly day: number;
        _hour: number;
        readonly hour: number;
        _minute: number;
        readonly minute: number;
        _second: number;
        readonly second: number;
        constructor(config: duration_iconfig);
        summ(config: number | number[] | string | duration_iconfig): duration_class;
        sub(config: number | number[] | string | duration_iconfig): duration_class;
        valueOf(): number;
        toJSON(): any;
        toString(pattern?: string): any;
        static patterns: {
            '#Y': (duration: duration_class) => string;
            '#M': (duration: duration_class) => string;
            '#D': (duration: duration_class) => string;
            '#h': (duration: duration_class) => string;
            '#m': (duration: duration_class) => string;
            '#s': (duration: duration_class) => string;
            '+hh': (duration: duration_class) => string;
            'mm': (duration: duration_class) => string;
        };
    }
    var duration: any;
}
declare module $jin.time {
    interface moment_iconfig {
        year?: number | string;
        month?: number | string;
        day?: number | string;
        hour?: number | string;
        minute?: number | string;
        second?: number | string;
        offset?: number | number[] | string | $jin.time.duration_iconfig;
    }
    class moment_class extends $jin.time.base_class {
        static duration_class: typeof duration_class;
        static make(moment?: number | number[] | Date | string | moment_iconfig): moment_class;
        private _year;
        readonly year: number;
        private _month;
        readonly month: number;
        private _day;
        readonly day: number;
        private _hour;
        readonly hour: number;
        private _minute;
        readonly minute: number;
        private _second;
        readonly second: number;
        private _offset;
        readonly offset: duration_class;
        constructor(config: moment_iconfig);
        private _native;
        readonly native: Date;
        readonly normal: moment_class;
        readonly weekDay: number;
        merge(config: number | number[] | Date | string | moment_iconfig): moment_class;
        shift(config: number | number[] | string | $jin.time.duration_iconfig): moment_class;
        sub(config: number | number[] | Date | string | moment_iconfig): duration_class;
        toOffset(duration: number | number[] | string | $jin.time.duration_iconfig): moment_class;
        valueOf(): number;
        toJSON(): any;
        toString(pattern?: string): any;
        static patterns: {
            'YYYY': (moment: moment_class) => string;
            'AD': (moment: moment_class) => string;
            'YY': (moment: moment_class) => string;
            'Month': (moment: moment_class) => string;
            'Mon': (moment: moment_class) => string;
            '-MM': (moment: moment_class) => string;
            'MM': (moment: moment_class) => string;
            'M': (moment: moment_class) => string;
            'WeekDay': (moment: moment_class) => string;
            'WD': (moment: moment_class) => string;
            '-DD': (moment: moment_class) => string;
            'DD': (moment: moment_class) => string;
            'D': (moment: moment_class) => string;
            'Thh': (moment: moment_class) => string;
            'hh': (moment: moment_class) => string;
            'h': (moment: moment_class) => string;
            ':mm': (moment: moment_class) => string;
            'mm': (moment: moment_class) => string;
            'm': (moment: moment_class) => string;
            ':ss': (moment: moment_class) => string;
            'ss': (moment: moment_class) => string;
            's': (moment: moment_class) => string;
            '.sss': (moment: moment_class) => string;
            'sss': (moment: moment_class) => string;
            'Z': (moment: moment_class) => any;
        };
        static monthLong: string[];
        static monthShort: string[];
        static weekDayLong: string[];
        static weekDayShort: string[];
    }
    var moment: {
        [index: string]: typeof moment_class;
        (moment?: number | number[] | Date | string | moment_iconfig): moment_class;
    };
    class moment_class_ru extends moment_class {
        static monthLong: string[];
        static monthShort: string[];
        static weekDayLong: string[];
        static weekDayShort: string[];
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
    function $mol_stub_time(maxShift?: number): $jin.time.moment_class;
}
declare namespace $ {
    class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
        products(): $mol_app_inventory_domain_product[];
        product(code: string): $mol_app_inventory_domain_product;
        product_by_code(code: string): $mol_app_inventory_domain_product;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        position(productCode: string): $mol_app_inventory_domain_position;
        position_count(productCode: string, next?: number): number;
        position_status(productCode: string, next?: $mol_app_inventory_domain_position_status): $mol_app_inventory_domain_position_status;
        authentificated(): boolean;
        message(): string;
    }
}
declare namespace $ {
    class $mol_app_inventory_demo extends $mol_app_inventory {
        domain(): $mol_app_inventory_domain_mock;
    }
}
declare namespace $ {
    class $mol_app_inventory_enter_demo extends $mol_app_inventory_enter {
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper_demo extends $mol_app_inventory_keeper {
        domain(): $mol_app_inventory_domain_mock;
        title1(): string;
        description1(): string;
        count1(val?: any): any;
        status1(val?: any): any;
        position1(): $mol_app_inventory_position;
        title2(): string;
        description2(): string;
        count2(val?: any): any;
        status2(val?: any): any;
        position2(): $mol_app_inventory_position;
        position_rows(val?: any): any;
    }
}
declare namespace $ {
    class $mol_app_quine extends $mol_page {
        content(): string;
        texter(): $mol_text;
        body(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_quine extends $.$mol_app_quine {
        content(): string;
    }
}
declare namespace $ {
    class $mol_app_quine_demo extends $mol_app_quine {
    }
}
declare namespace $ {
    class $mol_app_report extends $mol_page {
        title(): string;
        description(): string;
        descriptor(): $mol_view;
        headCells(): any[];
        headRower(): $mol_app_report_rower;
        rows(): any[];
        tabler(): $mol_app_report_tabler;
        body(): any[];
        rowerCells(id: any): any[];
        rower(id: any): $mol_app_report_rower;
        cell_content(id: any): any;
        cellrows(id: any): number;
        cellCols(id: any): number;
        cell(id: any): $mol_app_report_cell;
        cell_value(id: any, val?: any): any;
        texter(id: any): $mol_view;
        stringer(id: any): $mol_string;
        number(id: any): $mol_number;
    }
}
declare namespace $ {
    class $mol_app_report_tabler extends $mol_view {
        dom_name(): string;
        rows(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_rower extends $mol_view {
        dom_name(): string;
        cells(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_cell extends $mol_view {
        dom_name(): string;
        cols(): number;
        rows(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "colspan": () => any;
            "rowspan": () => any;
        };
        content(): any;
        sub(): any[];
    }
}
declare namespace $.$mol {
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
        formatrows(): $mol_app_report_formatRow[];
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
        cellCols(pos: number[]): 0 | 1 | 3;
        cell_content(pos: number[]): $mol_view;
        cell_value(pos: number[], next: any): any;
        cell_contentName(pos: number[]): string;
        cell_contentType(pos: number[]): string;
        cell_contentValue(pos: number[]): string;
    }
}
declare namespace $ {
    class $mol_app_report_demo extends $mol_app_report {
    }
}
declare namespace $ {
    class $mol_app_signup extends $mol_form {
        message_required(): string;
        message_no_spaces(): string;
        message_need_more_letters(): string;
        name_first_label(): string;
        name_first_errors(): any[];
        name_first_hint(): string;
        name_first(val?: any): any;
        Name_first_control(): $mol_string;
        Name_first_field(): $mol_form_field;
        name_nick_label(): string;
        name_nick_errors(): any[];
        name_nick_hint(): string;
        name_nick(val?: any): any;
        Name_nick_control(): $mol_string;
        Name_nick_field(): $mol_form_field;
        name_second_label(): string;
        name_second_errors(): any[];
        name_second_hint(): string;
        name_second(val?: any): any;
        Name_second_control(): $mol_string;
        Name_second_field(): $mol_form_field;
        sex_label(): string;
        sex_errors(): any[];
        sex(val?: any): any;
        sex_option_male(): string;
        sex_option_intersex(): string;
        sex_option_female(): string;
        sex_options(): {
            "male": () => any;
            "intersex": () => any;
            "female": () => any;
        };
        Sex_control(): $mol_switch;
        Sex_field(): $mol_form_field;
        form_fields(): any[];
        submit_text(): string;
        event_submit(val?: any): any;
        Submit(): $mol_button_major;
        buttons(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_signup extends $.$mol_app_signup {
        name_first(next?: string): any;
        name_first_errors(): string[];
        name_nick(next?: string): any;
        name_second(next?: string): any;
        name_second_errors(): string[];
        sex(next?: string): any;
        sex_errors(): string[];
        event_submit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_signup_demo extends $mol_app_signup {
    }
}
declare namespace $ {
    class $mol_labeler extends $mol_view {
        dom_name(): string;
        Title(): $mol_view;
        content(): any;
        Content(): $mol_view;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_cost extends $mol_view {
        value(): any;
        prefix(): string;
        Prefix(): $mol_view;
        value_view(): string;
        Value(): $mol_view;
        postfix(): string;
        Postfix(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_cost extends $.$mol_cost {
        value(): $mol_unit_money;
        prefix(): string;
        value_view(): string;
        postfix(): string;
    }
}
declare namespace $ {
    class $mol_card extends $mol_list {
        status(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_card_status_type": () => any;
        };
        content(): any[];
        Content(): $mol_view;
        status_text(): string;
        Status(): $mol_view;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_supplies_domain_provider extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply_group extends $mol_object {
        id(): string;
        name(): string;
        manager(): $mol_app_supplies_domain_person;
    }
    class $mol_app_supplies_domain_supply_division extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_pay_method extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_debitor extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply_position extends $mol_object {
        name(): string;
        supply_moment(): $jin.time.moment_class;
        division(): $mol_app_supplies_domain_supply_division;
        store(): $mol_app_supplies_domain_store;
        price(): $mol_unit_money;
        quantity(): number;
        cost(): $mol_unit_money;
    }
    class $mol_app_supplies_domain_attachment extends $mol_object {
        url_thumb(): string;
        url_load(): string;
    }
    class $mol_app_supplies_domain_person extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_contract extends $mol_object {
        id(): string;
    }
    class $mol_app_supplies_domain_ballance_unit extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_consumer extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_store extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply extends $mol_object {
        id(): string;
        provider(): $mol_app_supplies_domain_provider;
        consumer(): $mol_app_supplies_domain_consumer;
        group(): $mol_app_supplies_domain_supply_group;
        status(next?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
        ballance_unit(): $mol_app_supplies_domain_ballance_unit;
        manager(): $mol_app_supplies_domain_person;
        contract(): $mol_app_supplies_domain_contract;
        pay_method(): $mol_app_supplies_domain_pay_method;
        debitor(): $mol_app_supplies_domain_debitor;
        positions(): $mol_app_supplies_domain_supply_position[];
        attachments(next?: $mol_app_supplies_domain_attachment[]): $mol_app_supplies_domain_attachment[];
        cost(): $mol_unit_money;
    }
    enum $mol_app_supplies_domain_supply_status {
        pending,
        approved,
    }
    class $mol_app_supplies_domain_mock extends $mol_object {
        supplies(): $mol_app_supplies_domain_supply[];
        positions(supply: string): $mol_app_supplies_domain_supply_position[];
        supply_status(id: string, next?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
        supply(id: string): $mol_app_supplies_domain_supply;
        provider(id: string): $mol_app_supplies_domain_provider;
        consumer(id: string): $mol_app_supplies_domain_consumer;
        ballance_unit(id: string): $mol_app_supplies_domain_ballance_unit;
        division(id: string): $mol_app_supplies_domain_supply_division;
        supply_group(id: string): $mol_app_supplies_domain_supply_group;
        store(id: string): $mol_app_supplies_domain_store;
        person(id: string): $mol_app_supplies_domain_person;
        contract(id: string): $mol_app_supplies_domain_person;
        pay_method(id: string): $mol_app_supplies_domain_pay_method;
        debitor(id: string): $mol_app_supplies_domain_pay_method;
        position(id: {
            supply: string;
            position: string;
        }): $mol_app_supplies_domain_supply_position;
        attachments(id: string, next?: $mol_app_supplies_domain_attachment[]): $mol_app_supplies_domain_attachment[];
        attachment(id: {
            supply: string;
            attachment: string;
        }): $mol_app_supplies_domain_attachment;
    }
}
declare namespace $ {
    class $mol_app_supplies_card extends $mol_link {
        supply(): any;
        status(): string;
        code_title(): string;
        code(): string;
        Code_item(): $mol_labeler;
        cost_title(): string;
        cost(): $mol_unit_money;
        Cost(): $mol_cost;
        Cost_item(): $mol_labeler;
        provider_title(): string;
        provider_name(): string;
        Provider_item(): $mol_labeler;
        items(): any[];
        Group(): $mol_row;
        Card(): $mol_card;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_card extends $.$mol_app_supplies_card {
        supply(): $mol_app_supplies_domain_supply;
        code(): string;
        provider_name(): string;
        cost(): $mol_unit_money;
        status(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_card_demo_pending extends $mol_app_supplies_card {
        code(): string;
        provider_name(): string;
        cost(): $mol_unit_money_usd;
        status(): string;
        arg(): {} & {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_card_demo_approved extends $mol_app_supplies_card {
        code(): string;
        provider_name(): string;
        cost(): $mol_unit_money_rur;
        status(): string;
        arg(): {} & {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_enter extends $mol_view {
        entered(val?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_string;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_string;
        passwordField(): $mol_form_field;
        submitLabel(): string;
        event_submit(val?: any): any;
        submit_blocked(): boolean;
        submit(): $mol_button_major;
        form(): $mol_form;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_enter extends $.$mol_app_supplies_enter {
        event_submit(): void;
    }
}
declare namespace $ {
    class $mol_app_supplies_list extends $mol_page {
        supplies(): any[];
        title(): string;
        search_hint(): string;
        search_query(val?: any): any;
        Search(): $mol_code;
        Search_panel(): $mol_row;
        sub(): any[];
        supply_rows(): any[];
        Supply_rows(): $mol_list;
        body(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_list extends $.$mol_app_supplies_list {
        requests(): $mol_app_supplies_domain_supply[];
        supply_rows(): $mol_app_supplies_card[];
        Supply_row(index: number): $mol_app_supplies_card;
    }
}
declare namespace $ {
    class $mol_deck extends $mol_list {
        items(): any[];
        current(val?: any): any;
        switch_options(): {};
        Switch(): $mol_switch;
        Content(): any;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_deck_item extends $mol_object {
        title(): string;
        Content(): any;
    }
}
declare namespace $.$mol {
    class $mol_deck extends $.$mol_deck {
        current(next?: string): string;
        switch_options(): {
            [key: string]: () => string;
        };
        Content(): any;
    }
}
declare namespace $ {
    class $mol_tiler extends $mol_view {
        items(): any[];
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_tiler extends $.$mol_tiler {
        sub(): $mol_view[];
        groupItems(path: number[]): $mol_view[];
        groupChilds(path: number[]): $mol_view[];
        child(path: number[]): $mol_view;
        group(path: number[]): $mol_view;
        item(path: number[]): $mol_view;
    }
}
declare namespace $ {
    class $mol_icon_attach extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_attach extends $mol_card {
        items(val?: any): any;
        attach_new(val?: any): any;
        Add(): $mol_attach_add;
        content(): any[];
        Content(): $mol_tiler;
        Item(id: any): $mol_attach_item;
    }
}
declare namespace $ {
    class $mol_attach_item extends $mol_link {
        url_thumb(val?: any): any;
        url_load(val?: any): any;
        uri(val?: any): any;
        style_bg(): string;
        style(): {
            [key: string]: () => string | number;
        } & {
            "backgroundImage": () => any;
        };
        loadable(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "href": () => any;
            "mol_link_current": () => any;
        } & {
            "download": () => any;
        };
    }
}
declare namespace $ {
    class $mol_attach_add extends $mol_button {
        dom_name(): string;
        file_new(val?: any): any;
        Icon(): $mol_icon_attach;
        event_capture(val?: any): any;
        event_picked(val?: any): any;
        Input(): $mol_attach_add_input;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_attach_add_input extends $mol_view {
        dom_name(): string;
        type(): string;
        accept(): string;
        multiple(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "type": () => any;
            "accept": () => any;
            "multiple": () => any;
        };
        event_capture(val?: any): any;
        event_click(val?: any): any;
        event_picked(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "change": (val?: any) => any;
        };
    }
}
declare namespace $.$mol {
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
    class $mol_section extends $mol_list {
        head(): any;
        Head(): $mol_view;
        Content(): any;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_supplies_position extends $mol_card {
        minimal_height(): number;
        product_title(): string;
        product_name(): string;
        Product_item(): $mol_labeler;
        cost_title(): string;
        cost(): $mol_unit_money;
        Cost(): $mol_cost;
        Cost_item(): $mol_labeler;
        Main_group(): $mol_row;
        division_title(): string;
        division_name(): string;
        Division_item(): $mol_labeler;
        price_label(): string;
        price(): $mol_unit_money;
        Price(): $mol_cost;
        Price_item(): $mol_labeler;
        Addon_group(): $mol_row;
        quantity_title(): string;
        quantity(): string;
        Quantity_item(): $mol_labeler;
        supply_date_title(): string;
        supply_date(): string;
        Supply_date_item(): $mol_labeler;
        store_title(): string;
        store_name(): string;
        Store_item(): $mol_labeler;
        Supply_group(): $mol_row;
        Row(): $mol_view;
        Content(): $mol_view;
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_position extends $.$mol_app_supplies_position {
        position(): $mol_app_supplies_domain_supply_position;
        product_name(): string;
        price(): $mol_unit_money;
        quantity(): string;
        cost(): $mol_unit_money;
        supply_date(): any;
        division_name(): string;
        store_name(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detail extends $mol_page {
        supply(): any;
        title(): string;
        Back_icon(): $mol_icon_chevron;
        backArg(): {
            "side": () => any;
            "supply": () => any;
        };
        Back(): $mol_link;
        head(): any[];
        org_title(): string;
        provider_title(): string;
        provider_name(): string;
        Provider(): $mol_labeler;
        customer_label(): string;
        consumer_name(): string;
        Consumer(): $mol_labeler;
        supply_group_title(): string;
        supply_group_name(): string;
        Supply_group(): $mol_labeler;
        ballance_unit_title(): string;
        ballance_unit_name(): string;
        Ballance_unit_item(): $mol_labeler;
        org_items(): any[];
        Org_content(): $mol_row;
        Org(): $mol_deck_item;
        cons_title(): string;
        contract_title(): string;
        contract_id(): string;
        Contract(): $mol_labeler;
        pay_method_title(): string;
        pay_method_name(): string;
        Pay_method(): $mol_labeler;
        manager_title(): string;
        manager_name(): string;
        Manager(): $mol_labeler;
        debitod_title(): string;
        debitor_name(): string;
        Debitor(): $mol_labeler;
        cons_items(): any[];
        Cons_content(): $mol_row;
        Cons(): $mol_deck_item;
        Descr_deck(): $mol_deck;
        Descr_card(): $mol_card;
        attach_title(): string;
        attachments(): any[];
        attach_new(val?: any): any;
        Attach(): $mol_attach;
        Attach_section(): $mol_section;
        positions_title(): string;
        cost_title(): string;
        cost(): $mol_unit_money;
        Cost_value(): $mol_cost;
        Cost(): $mol_labeler;
        positions_head(): any[];
        positions(): any[];
        Positions(): $mol_list;
        Positions_section(): $mol_section;
        content(): any[];
        Content(): $mol_list;
        List(): $mol_list;
        body(): any[];
        approved(val?: any): any;
        approved_title(): string;
        Approve(): $mol_check_box;
        tools(): any[];
        Tools(): $mol_row;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_detail extends $.$mol_app_supplies_detail {
        supply(): $mol_app_supplies_domain_supply;
        title(): string;
        approved(next?: boolean): boolean;
        provider_name(): string;
        consumer_name(): string;
        ballance_unit_name(): string;
        supply_group_name(): string;
        manager_name(): string;
        pay_method_name(): string;
        debitor_name(): string;
        contract_id(): string;
        cost(): $mol_unit_money;
        status(): string;
        positions(): $mol_app_supplies_position[];
        Position(index: number): $mol_app_supplies_position;
        attachments(): $mol_attach_item[];
        Attachment(index: number): $mol_attach_item;
        attach_new(next?: string): void;
        Body(): $mol_scroll;
        scroll_top(next?: number): number;
    }
}
declare namespace $ {
    class $mol_app_supplies_root extends $mol_stack {
        entered(val?: any): any;
        enter(): $mol_app_supplies_enter;
        supplies(): any[];
        search_query(val?: any): any;
        lister(): $mol_app_supplies_list;
        supply(): any;
        detailer(): $mol_app_supplies_detail;
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_root extends $.$mol_app_supplies_root {
        entered(next?: boolean): boolean;
        sub(): $mol_view[];
        main(): $.$mol_app_supplies_detail[];
        addon(): $.$mol_app_supplies_list[] | $.$mol_app_supplies_enter[];
        title(): string;
        domain(): $mol_app_supplies_domain_mock;
        supplies(): $mol_app_supplies_domain_supply[];
        supply_id(next?: string): any;
        search_query(next?: string): string;
        supply(): $mol_app_supplies_domain_supply;
    }
}
declare namespace $ {
    class $mol_app_supplies_demo extends $mol_app_supplies_root {
    }
}
declare namespace $ {
    class $mol_app_supplies_position_demo extends $mol_app_supplies_position {
        product_name(): string;
        price(): $mol_unit_money_usd;
        quantity(): string;
        cost(): $mol_unit_money_usd;
        supply_date(): string;
        division_name(): string;
        store_name(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detail_demo extends $mol_app_supplies_detail {
        title(): string;
        approved(val?: any): any;
        provider_name(): string;
        cost(): $mol_unit_money_rur;
        consumer_name(): string;
        supply_group_name(): string;
        ballance_unit_name(): string;
        contract_id(): string;
        pay_method_name(): string;
        manager_name(): string;
        debitor_name(): string;
        Pos1(): $mol_app_supplies_position_demo;
        Pos2(): $mol_app_supplies_position_demo;
        Pos3(): $mol_app_supplies_position_demo;
        Pos4(): $mol_app_supplies_position_demo;
        Pos5(): $mol_app_supplies_position_demo;
        positions(): any[];
        attachments(): any[];
    }
}
declare namespace $ {
    class $mol_app_taxon extends $mol_page {
        hierarchy(): any;
        hierarchy_field(): string;
        record(id: any): any;
        Grid(): $mol_grid;
        Body(): $mol_grid;
    }
}
declare namespace $.$mol {
    interface $mol_app_taxon_data_row {
        KeyId: number;
    }
    class $mol_app_taxon extends $.$mol_app_taxon {
        hierarchy_uri(): string;
        hierarchy(): {
            [key: string]: $mol_grid_node;
        };
        data_uri(): string;
        data_resource(id: string): $mol_http_resource_json<any>;
        data_table(): {
            [id: string]: $mol_app_taxon_data_row;
        };
        record(id: string): $mol_app_taxon_data_row;
    }
}
declare namespace $ {
    class $mol_app_taxon_demo extends $mol_app_taxon {
        hierarchy_field(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
        hierarchy(): {
            [key: string]: $mol_grid_node;
        };
        record(path: number[]): {
            name: string;
            age: number;
            sex: string;
            sexPrefer: string;
            birthDay: any;
            birthCity: string;
            deathDay: any;
            deathCity: string;
            cityWork: string;
            company: string;
            phoneOS: string;
            fingersCount: number;
        };
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
        bracketClose = 221,
        quoteSingle = 222,
    }
}
declare namespace $ {
    class $mol_app_todomvc extends $mol_scroll {
        title(): string;
        Title(): $mol_view;
        head_complete_enabled(): boolean;
        completed_all(val?: any): any;
        Head_complete(): $mol_check;
        task_title_new(val?: any): any;
        event_add(event?: any): any;
        Add(): $mol_app_todomvc_add;
        Head_content(): any[];
        Head(): $mol_view;
        task_rows(): any[];
        List(): $mol_list;
        pending_message(): string;
        Pending(): $mol_view;
        filter_all_label(): string;
        Filter_all(): $mol_link;
        filter_active_label(): string;
        Filter_active(): $mol_link;
        filter_completed_label(): string;
        Filter_completed(): $mol_link;
        filterOptions(): any[];
        Filter(): $mol_bar;
        sanitize_enabled(): boolean;
        event_sanitize(event?: any): any;
        sanitize_label(): string;
        Sanitize(): $mol_button_minor;
        foot_content(): any[];
        Foot(): $mol_view;
        panels(): any[];
        Panel(): $mol_list;
        Page(): $mol_list;
        sub(): any[];
        task_completed(id: any, val?: any): any;
        task_title(id: any, val?: any): any;
        event_task_drop(id: any, event?: any): any;
        Task_row(id: any): $mol_app_todomvc_task_row;
    }
}
declare namespace $ {
    class $mol_app_todomvc_add extends $mol_string {
        hint(): string;
        event_press(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (event?: any) => any;
        } & {
            "keyup": (event?: any) => any;
        };
        event_done(event?: any): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_task_row extends $mol_view {
        minimal_height(): number;
        completed(val?: any): any;
        Complete(): $mol_check;
        title_hint(): string;
        title(val?: any): any;
        Title(): $mol_string;
        event_drop(event?: any): any;
        Drop(): $mol_button;
        sub(): any[];
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_app_todomvc_task_row_completed": () => any;
        };
    }
}
interface $mol_app_todomvc_task {
    completed?: boolean;
    title?: string;
}
declare namespace $.$mol {
    class $mol_app_todomvc_add extends $.$mol_app_todomvc_add {
        event_press(next?: KeyboardEvent): any;
    }
    class $mol_app_todomvc extends $.$mol_app_todomvc {
        task_ids(next?: number[]): number[];
        arg_completed(): any;
        groups_completed(): {
            [index: string]: number[];
        };
        tasks_filtered(): number[];
        completed_all(next?: boolean): boolean;
        head_complete_enabled(): boolean;
        pending_message(): string;
        _id_seed: number;
        event_add(next: Event): void;
        task_rows(): $mol_app_todomvc_task_row[];
        task(id: number, next?: $mol_app_todomvc_task): any;
        task_completed(index: number, next?: boolean): any;
        task_title(index: number, next?: string): any;
        event_task_drop(index: number, next?: Event): void;
        event_sanitize(): void;
        panels(): ($mol_view | $.$mol_list)[];
        foot_visible(): boolean;
        sanitize_enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_app_todomvc_demo extends $mol_app_todomvc {
    }
}
declare namespace $ {
    class $mol_app_users extends $mol_page {
        filter_hint(): string;
        query(val?: any): any;
        Filter(): $mol_string;
        Head_row(): $mol_row;
        head(): any[];
        user_rows(): any[];
        List(): $mol_list;
        body(): any[];
        reload_label(): string;
        event_reload(val?: any): any;
        Reload(): $mol_button_minor;
        loaded(): boolean;
        add_label(): string;
        event_add(val?: any): any;
        Add(): $mol_button_minor;
        changed(): boolean;
        save_label(): string;
        event_save(val?: any): any;
        Save(): $mol_button_major;
        save_result(): any;
        Message(): $mol_status;
        Controller(): $mol_row;
        foot(): any[];
    }
}
declare namespace $ {
    class $mol_app_users_row extends $mol_row {
        minimal_height(): number;
        title(val?: any): any;
        Title(): $mol_string;
        drop_label(): string;
        event_drop(val?: any): any;
        Drop(): $mol_button_minor;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_users extends $.$mol_app_users {
        query_arg(next?: string): any;
        query(next?: string): string;
        _query_timer: number;
        master(): $mol_http_resource_json<{
            items: {
                login: string;
            }[];
        }>;
        sub(): $mol_view[];
        users(next?: string[]): string[];
        users_master(next?: string[], force?: $mol_atom_force): string[];
        save_result(): string[];
        event_reload(next?: Event): void;
        event_add(next?: Event): void;
        event_user_drop(id: number, next?: Event): void;
        changed(): boolean;
        loaded(): boolean;
        event_save(next?: Event): void;
        body(): any[];
        user_rows(): $mol_app_users_row[];
        User_row(id: number): $mol_app_users_row;
        user_name(id: number, next?: string): string;
    }
}
declare namespace $ {
    class $mol_app_users_demo extends $mol_app_users {
    }
}
declare namespace $ {
    function $mol_assert_ok(value: any): void;
    function $mol_assert_not(value: any): void;
    function $mol_assert_fail(handler: () => any, ErrorRight?: any): any;
    function $mol_assert_equal<Value>(a: Value, b: Value): void;
    function $mol_assert_unique<Value>(a: Value, b: Value): void;
}
declare namespace $ {
    class $mol_attach_demo_empty extends $mol_attach {
    }
}
declare namespace $ {
    class $mol_attach_demo_filled extends $mol_attach {
        Item1(): $mol_attach_item;
        Item2(): $mol_attach_item;
        Item3(): $mol_attach_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_bar_demo_search extends $mol_bar {
        value(val?: any): any;
        stringer(): $mol_string;
        submitter(): $mol_button;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_bar_demo_login extends $mol_bar {
        value(val?: any): any;
        stringer(): $mol_string;
        rememberer(): $mol_check_box;
        submitter(): $mol_button;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_bench_demo extends $mol_bench {
    }
}
declare namespace $.$mol {
    class $mol_bench_demo extends $.$mol_bench_demo {
        col_sort(next?: string): string;
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
    class $mol_button_demo_major_enabled extends $mol_button_major {
        label(): string;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_button_demo_minor_enabled extends $mol_button_minor {
        label(): string;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_button_demo_major_disabled extends $mol_button_major {
        label(): string;
        sub(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_button_demo_minor_disabled extends $mol_button_minor {
        label(): string;
        sub(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_button_demo_danger_enabled extends $mol_button_danger {
        label(): string;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_button_demo_danger_disabled extends $mol_button_danger {
        label(): string;
        sub(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_card_demo_status extends $mol_card {
        Content(): $mol_row;
        status(): string;
    }
}
declare namespace $ {
    class $mol_card_demo_hello extends $mol_card {
        Content(): $mol_row;
    }
}
declare namespace $ {
    class $mol_check_box_demo_labeled_base extends $mol_check_box {
        c1Label(): string;
        label(): any[];
    }
}
declare namespace $ {
    class $mol_check_box_demo_labeled_checked extends $mol_check_box {
        c2Label(): string;
        label(): any[];
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_check_box_demo_labeled_disabled extends $mol_check_box {
        c6Label(): string;
        label(): any[];
        checked(): boolean;
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_check_box_demo_alone_base extends $mol_check_box {
    }
}
declare namespace $ {
    class $mol_check_box_demo_alone_checked extends $mol_check_box {
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_check_box_demo_alone_disabled extends $mol_check_box {
        checked(): boolean;
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_check_expand_demo_labeled_base extends $mol_check_expand {
        c1Label(): string;
        label(): any[];
    }
}
declare namespace $ {
    class $mol_check_expand_demo_labeled_expanded extends $mol_check_expand {
        c2Label(): string;
        label(): any[];
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_check_expand_demo_empty_base extends $mol_check_expand {
    }
}
declare namespace $ {
    class $mol_check_expand_demo_empty_expanded extends $mol_check_expand {
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_check_expand_demo_disabled extends $mol_check_expand {
        c5Label(): string;
        label(): any[];
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_code_demo_qr extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_dataMatrix extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_upc_e extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_upc_a extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_ean_8 extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_ean_13 extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_code_128 extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_code_39 extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    class $mol_code_demo_itf extends $mol_code {
        format(): string;
    }
}
declare namespace $ {
    function $mol_csv_parse(text: string, delimiter?: string): {
        [key: string]: any;
    }[];
}
declare namespace $ {
    class $mol_deck_demo extends $mol_deck {
        greeterLabel(): string;
        greeterMessage(): string;
        greeterMessager(): $mol_view;
        greeterContent(): $mol_row;
        greeterItem(): $mol_deck_item;
        questerLabel(): string;
        questerMessage(): string;
        questerMessager(): $mol_view;
        questerContent(): $mol_row;
        questerItem(): $mol_deck_item;
        commanderLabel(): string;
        commanderMessage(): string;
        commanderMessager(): $mol_view;
        commanderContent(): $mol_row;
        commanderItem(): $mol_deck_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_demo_all extends $mol_view {
        name(): string;
        mediumLabel(): string;
        medium(): $mol_demo_medium;
        smallLabel(): string;
        small(): $mol_demo_small;
        largeLabel(): string;
        large(): $mol_demo_large;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_dimmer_demo extends $mol_row {
        one(): $mol_dimmer;
        two(): $mol_dimmer;
        three(): $mol_dimmer;
        four(): $mol_dimmer;
        five(): $mol_dimmer;
        six(): $mol_dimmer;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_expander extends $mol_list {
        expanded(val?: any): any;
        label(): any[];
        labeler(): $mol_check_expand;
        content(): any;
        rows(): any[];
    }
}
declare namespace $.$mol {
    class $mol_expander extends $.$mol_expander {
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_filler extends $mol_view {
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_expander_demo extends $mol_scroll {
        expander(): $mol_expander;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_float_demo extends $mol_scroll {
        floaterContent(): $mol_card_demo_hello;
        floater(): $mol_float;
        filler1(): $mol_filler;
        filler2(): $mol_filler;
        contenter(): $mol_row;
        content(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_form_demo extends $mol_form {
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_string;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_string;
        passwordField(): $mol_form_field;
        form_fields(): any[];
        submit_text(): string;
        event_submit(val?: any): any;
        submit(): $mol_button_major;
        buttons(): any[];
    }
}
declare let $mol_global: any;
declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: {
            [id: string]: Node;
        };
        edgesOut: {
            [from: string]: {
                [to: string]: Edge;
            };
        };
        edgesIn: {
            [to: string]: {
                [from: string]: Edge;
            };
        };
        nodeEnsure(id: string): void;
        linkOut(from: string, to: string, edge: Edge): void;
        linkIn(to: string, from: string, edge: Edge): void;
        edgeOut(from: string, to: string): Edge;
        edgeIn(to: string, from: string): Edge;
        link(one: string, two: string, edge: Edge): void;
        sorted(getWeight: (edge: Edge) => number): string[];
    }
}
declare namespace $ {
    class $mol_grid_demo extends $mol_grid {
        row_height(): number;
    }
}
declare namespace $.$mol {
    class $mol_grid_demo extends $.$mol_grid_demo {
        records(): string[][];
        col_head_content(id: string): string[];
    }
}
declare namespace $ {
    class $mol_html_head extends $mol_view {
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_html_body extends $mol_view {
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_html_title extends $mol_view {
        dom_name(): string;
        title(): string;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_html_meta extends $mol_view {
        dom_name(): string;
        name(): string;
        content(): string;
        charset(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "name": () => any;
            "content": () => any;
            "charset": () => any;
        };
    }
}
declare namespace $ {
    class $mol_html_link extends $mol_view {
        dom_name(): string;
        rel(): string;
        href(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "rel": () => any;
            "href": () => any;
        };
    }
}
declare namespace $ {
    class $mol_icon_demo extends $mol_row {
        icons(): any[];
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_icon_demo extends $.$mol_icon_demo {
        names(): string[];
        icons(): $mol_view[];
        icon(name: string): $mol_view;
    }
}
declare namespace $ {
    class $mol_labeler_demo_text extends $mol_labeler {
        title(): string;
        content(): string;
    }
}
declare namespace $ {
    class $mol_labeler_demo_stringer extends $mol_labeler {
        title(): string;
        hint(): string;
        user_name(val?: any): any;
        Content(): $mol_string;
    }
}
declare namespace $ {
    class $mol_link_demo extends $mol_row {
        labelRed(): string;
        linkRed(): $mol_link;
        labelGreen(): string;
        linkGreen(): $mol_link;
        labelBlue(): string;
        linkBlue(): $mol_link;
        linkExternal(): $mol_link;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[]): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
}
declare namespace $ {
    class $mol_suggest extends $mol_view {
        suggests(): any[];
        eventPress(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "keydown": (val?: any) => any;
        };
        selectedRow(val?: any): any;
        focused(): boolean;
        suggest(id: any): string;
        eventRowerSelected(id: any, val?: any): any;
        selected(id: any): boolean;
        rower(id: any): $mol_suggest_rower;
        value(val?: any): any;
        hint(): string;
        stringer(): $mol_string;
        suggestrows(): any[];
        lister(): $mol_list;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_suggest_rower extends $mol_button {
        dom_name(): string;
        eventSelected(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (event?: any) => any;
        } & {
            "mousedown": (val?: any) => any;
        };
        selected(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "role": () => any;
            "tabindex": () => any;
        } & {
            "mol_suggest_selected": () => any;
        };
        minimal_height(): number;
        text(): string;
        prefix(): string;
        dimmer(): $mol_dimmer;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_suggest extends $.$mol_suggest {
        context_sub(): $mol_view_context;
        suggestrows(): $mol_suggest_rower[];
        sub(): ($.$mol_list | $.$mol_string)[];
        eventRowerSelected(index: number, next?: MouseEvent): void;
        selectedRow(next?: any): any;
        eventPress(next?: KeyboardEvent): void;
        focused(): boolean;
        selected(index: number): boolean;
        suggest(index: number): any;
    }
}
declare namespace $ {
    class $mol_row_demo extends $mol_row {
        minimal_height(): number;
        helloHint(): string;
        title(val?: any): any;
        suggest1(): string;
        suggest2(): string;
        titler(): $mol_suggest;
        countHint(): string;
        count(val?: any): any;
        counter(): $mol_number;
        progress(): number;
        progresser(): $mol_portion;
        publishLabel(): string;
        publish(val?: any): any;
        publisher(): $mol_check_box;
        dropLabel(): string;
        buttonDrop(): $mol_button_minor;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_list_demo extends $mol_scroll {
        rows(): any[];
        lister(): $mol_list;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_list_demo extends $.$mol_list_demo {
        rows(): $mol_view[];
        rower(id: number): $mol_row_demo;
    }
}
declare namespace $ {
    function $mol_maybe<Value>(value: Value): Value[];
}
declare namespace $ {
    class $mol_number_demo extends $mol_row {
        zero(): $mol_number;
        year(val?: any): any;
        one(): $mol_number;
        two(): $mol_number;
        age(val?: any): any;
        three(): $mol_number;
        four(): $mol_number;
        five(): $mol_number;
        six(): $mol_number;
        seven(): $mol_number;
        eight(): $mol_number;
        nine(): $mol_number;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_page_demo extends $mol_page {
        title(): string;
        signup(): $mol_app_signup;
        body(): any[];
        rower(): $mol_row_demo;
        foot(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render extends $mol_view {
        title(): string;
        titler(): $mol_view;
        runnerLabel(): string;
        eventRun(val?: any): any;
        runner(): $mol_button_major;
        head(): any[];
        header(): $mol_view;
        rows(): any[];
        lister(): $mol_list;
        contenter(): $mol_scroll;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render_row extends $mol_view {
        selected(val?: any): any;
        minimal_height(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_perf_render_row_selected": () => any;
        };
        eventToggle(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (val?: any) => any;
        };
        label(): string;
        bar(): $mol_view;
        sub(): any[];
    }
}
declare namespace $.$mol {
    interface $mol_perf_render_item {
        id: number;
        label: string;
    }
    class $mol_perf_render extends $.$mol_perf_render {
        runnerLabel(next?: string): string;
        eventRun(next?: Event): void;
        rows(): $mol_perf_render_row[];
        row(id: number): $mol_perf_render_row;
        data(next?: $mol_perf_render_item[]): $mol_perf_render_item[];
        selectedItem(next?: number): number;
    }
    class $mol_perf_render_row extends $.$mol_perf_render_row {
        data(): {
            id: number;
            label: string;
        };
        label(): string;
        eventToggle(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_perf_uibench extends $mol_scroll {
        page(): any;
        sub(): any[];
        stateTable(): any;
        table(): $mol_perf_uibench_table;
        stateAnim(): any;
        anim(): $mol_perf_uibench_anim;
        stateTree(): any;
        tree(): $mol_perf_uibench_tree;
    }
}
declare namespace $ {
    class $mol_perf_uibench_table extends $mol_list {
        state(): any;
        dom_name(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_row extends $mol_view {
        state(): any;
        minimal_height(): number;
        dom_name(): string;
        className(): string;
        id(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-id": () => any;
        };
        headerText(): string;
        header(): $mol_perf_uibench_table_cell;
        cells(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_cell extends $mol_view {
        dom_name(): string;
        text(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-text": () => any;
        };
        event_click(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (val?: any) => any;
        };
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim extends $mol_view {
        state(): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        items(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim_box extends $mol_view {
        id(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-id": () => any;
        };
        styleRadius(): string;
        styleColor(): string;
        style(): {
            [key: string]: () => string | number;
        } & {
            "borderRadius": () => any;
            "background": () => any;
        };
        items(): any[];
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree extends $mol_view {
        state(): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        stateRoot(): any;
        root(): $mol_perf_uibench_tree_branch;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_branch extends $mol_list {
        state(): any;
        dom_name(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_leaf extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        text(): string;
        sub(): any[];
    }
}
declare namespace $.$mol {
    class $mol_perf_uibench extends $.$mol_perf_uibench {
        state(next?: any): any;
        stateTable(): any;
        stateAnim(): any;
        stateTree(): any;
        page(): $mol_view;
    }
    class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {
        state(): {
            items: any[];
        };
        rows(): $mol_perf_uibench_table_row[];
        rower(id: number): $mol_perf_uibench_table_row;
    }
    class $mol_perf_uibench_table_row extends $.$mol_perf_uibench_table_row {
        state(): {
            props: any[];
            active: boolean;
            id: number;
        };
        headerText(): string;
        id(): number;
        className(): string;
        cells(): $mol_perf_uibench_table_cell[];
        cell(id: number): $mol_perf_uibench_table_cell;
    }
    class $mol_perf_uibench_table_cell extends $.$mol_perf_uibench_table_cell {
        event_click(next?: Event): void;
    }
    class $mol_perf_uibench_anim extends $.$mol_perf_uibench_anim {
        state(): {
            items: any[];
        };
        items(): $mol_perf_uibench_anim_box[];
        item(i: number): $mol_perf_uibench_anim_box;
    }
    class $mol_perf_uibench_anim_box extends $.$mol_perf_uibench_anim_box {
        state(): {
            id: string;
            time: number;
        };
        id(): string;
        time(): number;
        styleRadius(): string;
        styleColor(): string;
    }
    class $mol_perf_uibench_tree extends $.$mol_perf_uibench_tree {
        state(): {
            root: any;
        };
        stateRoot(): any;
    }
    class $mol_perf_uibench_tree_branch extends $.$mol_perf_uibench_tree_branch {
        state(): {
            children: any[];
        };
        sub(): ($mol_perf_uibench_tree_leaf | $mol_perf_uibench_tree_branch)[];
        branch(i: number): $mol_perf_uibench_tree_branch;
        leaf(i: number): $mol_perf_uibench_tree_leaf;
    }
}
declare namespace $ {
    class $mol_portion_demo_empty extends $mol_portion {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_portion_demo_partial extends $mol_portion {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_portion_demo_full extends $mol_portion {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_scroll_demo extends $mol_scroll {
        One(): $mol_filler;
        Two(): $mol_filler;
        Tree(): $mol_filler;
        Row(): $mol_row;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_section_demo extends $mol_scroll {
        Section(): $mol_section;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_stack_demo extends $mol_stack {
        Hello(): $mol_card_demo_hello;
        Main_page(): $mol_scroll;
        main(): any[];
        Enter(): $mol_form_demo;
        Addon_page(): $mol_scroll;
        addon(): any[];
    }
}
declare namespace $ {
    class $mol_state_history<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): any;
        static id(next?: string): string;
    }
}
declare namespace $ {
    class $mol_string_demo_simple extends $mol_string {
    }
}
declare namespace $ {
    class $mol_string_demo_hint extends $mol_string {
        hint(): string;
    }
}
declare namespace $ {
    class $mol_string_demo_disabled extends $mol_string {
        hint(): string;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_suggest_demo_base extends $mol_suggest {
        query_suggests(): any[];
        suggests(): any[];
        query(val?: any): any;
        value(val?: any): any;
    }
}
declare namespace $ {
    class $mol_suggest_demo_empty extends $mol_suggest {
        focused(): boolean;
        value(): string;
        suggests(): any[];
    }
}
declare namespace $ {
    class $mol_suggest_demo_opened extends $mol_suggest {
        hint(): string;
        value(): string;
        focused(): boolean;
        selected_row(): number;
        suggest1(): string;
        suggest2(): string;
        suggest3(): string;
        suggest4(): string;
        suggest5(): string;
        suggests(): any[];
    }
}
declare namespace $.$mol {
    class $mol_suggest_demo_base extends $.$mol_suggest_demo_base {
        query_suggests(): any[];
    }
}
declare namespace $ {
    class $mol_switch_demo_enabled extends $mol_switch {
        color(val?: any): any;
        value(val?: any): any;
        option_red(): string;
        option_green(): string;
        option_blue(): string;
        options(): {} & {
            "red": () => any;
            "green": () => any;
            "blue": () => any;
        };
    }
}
declare namespace $ {
    class $mol_switch_demo_disabled extends $mol_switch {
        color(val?: any): any;
        value(val?: any): any;
        enabled(): boolean;
        option_red(): string;
        option_green(): string;
        option_blue(): string;
        options(): {} & {
            "red": () => any;
            "green": () => any;
            "blue": () => any;
        };
    }
}
declare namespace $ {
    function $mol_test(set: {
        [name: string]: string | (() => void);
    }): void;
    var $mol_test_all: $mol_test_case[];
    var $mol_test_run: () => void;
    class $mol_test_case {
        code: () => void;
        constructor(code: string | (() => void));
        run(): void;
    }
}
declare namespace $ {
    class $mol_text_demo extends $mol_scroll {
        texter(): $mol_text;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_tree {
        type: string;
        data: string;
        sub: $mol_tree[];
        baseUri: string;
        row: number;
        col: number;
        constructor(config: {
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
        select(...path: string[]): $mol_tree;
        filter(path: string[], value?: string): $mol_tree;
    }
}
declare namespace $ {
    function $mol_try<Result>(handler2: () => Result): Result | Error;
}
declare namespace $ {
    function $mol_view_tree2ts(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}
