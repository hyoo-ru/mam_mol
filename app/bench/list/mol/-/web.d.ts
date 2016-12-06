declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static objectPath(): any;
        'objectClassNames()': string[];
        objectClassNames(): string[];
        private 'objectOwner()';
        objectOwner(next?: {
            objectPath(): string;
        }): {
            objectPath(): string;
        };
        private 'objectField()';
        objectField(next?: string): string;
        objectPath(next?: string): string;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
        static toString(): any;
        toString(): string;
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
        handler: (next?: Value | Error, force?: $mol_atom_force) => Value;
        host: {
            objectPath(): string;
            [key: string]: any;
        };
        field: string;
        masters: $mol_set<$mol_atom<any>>;
        slaves: $mol_set<$mol_atom<any>>;
        status: $mol_atom_status;
        autoFresh: boolean;
        'value()': Value;
        constructor(handler: (next?: Value | Error, force?: $mol_atom_force) => Value, host?: {
            objectPath(): string;
            [key: string]: any;
        }, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        objectPath(): string;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value;
        set(next: Value): Value;
        push(next: Value | Error): Error | Value;
        obsoleteSlaves(): void;
        checkSlaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobeyAll(): void;
        value(next?: Value, force?: $mol_atom_force): Error | Value;
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
    function $mol_atom_task<Value>(handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host extends {
        objectPath(): string;
    }, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>) => void;
    function $mol_mem_key<Host extends {
        objectPath(): string;
    }, Key, Value>(config?: {
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
        static text(context: string, key: string): string;
    }
}
declare namespace $ {
    var $mol_viewer_context: $mol_viewer_context;
    interface $mol_viewer_context {
        $mol_viewer_heightLimit(): number;
    }
    class $mol_viewer extends $mol_object {
        static root(id: number): $mol_viewer;
        title(): string;
        static statePrefix(): string;
        statePrefix(): any;
        stateKey(postfix: string): string;
        context(next?: $mol_viewer_context): $mol_viewer_context;
        contextSub(): $mol_viewer_context;
        tagName(): string;
        nameSpace(): string;
        childs(): (string | number | boolean | Node | $mol_viewer)[];
        childsVisible(): (string | number | boolean | Node | $mol_viewer)[];
        heightMinimal(): number;
        private 'DOMNode()';
        DOMNode(next?: Element): Element;
        static renderChilds(node: Element, childs: ($mol_viewer | Node | string | number | boolean)[]): void;
        static renderAttrs(node: Element, attrs: {
            [key: string]: () => string | number | boolean;
        }): void;
        static renderFields(node: Element, fields: {
            [key: string]: (next?: any) => any;
        }): void;
        DOMTree(next?: Element): Element;
        attr(): {
            [key: string]: () => string | number | boolean;
        };
        field(): {
            [key: string]: (next?: any) => any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        focused(): boolean;
        localizedText(postfix: string): string;
    }
}
interface Window {
    cordova: any;
}
declare namespace $ {
}
declare namespace $ {
    class $mol_viewer_selection extends $mol_object {
        static focused(next?: Element[]): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
}
declare namespace $ {
    class $mol_stacker extends $mol_viewer {
        side(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_stacker_side": () => any;
        };
        main(): any[];
        mainer(next?: any): $mol_viewer;
        addon(): any[];
        addoner(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_stacker extends $.$mol_stacker {
        side(next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_portioner_indicator extends $mol_viewer {
        widthStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.width": () => any;
        };
    }
}
declare namespace $ {
    class $mol_portioner extends $mol_viewer {
        portion(): number;
        indWidthStyle(): string;
        indicator(next?: any): $mol_portioner_indicator;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_portioner extends $.$mol_portioner {
        indWidthStyle(): string;
    }
}
declare namespace $ {
    class $mol_floater extends $mol_viewer {
        shiftStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.transform": () => any;
        };
        scrolling(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_floater_scrolling": () => any;
        };
    }
}
declare namespace $ {
    class $mol_scroller extends $mol_viewer {
        heightMinimal(): number;
        scrollTop(next?: any): any;
        scrollLeft(next?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "scrollTop": (next?: any) => any;
            "scrollLeft": (next?: any) => any;
        };
        eventScroll(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "scroll": (next?: any) => any;
            "overflow": (next?: any) => any;
            "underflow": (next?: any) => any;
        };
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    interface $mol_viewer_context {
        $mol_scroller_scrollTop(): number;
        $mol_scroller_moving(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_scroller extends $.$mol_scroller {
        scrollTop(next?: number): number;
        scrollLeft(next?: number): number;
        scrollBottom(next?: number): number;
        scrollRight(next?: number): number;
        eventScroll(next?: Event): void;
        moving(next?: boolean): boolean;
        contextSub(): $mol_viewer_context;
        shadowStyle(): string;
    }
}
declare namespace $.$mol {
    class $mol_floater extends $.$mol_floater {
        shiftStyle(): string;
        scrolling(): boolean;
    }
}
declare namespace $ {
    class $mol_clicker extends $mol_viewer {
        tagName(): string;
        enabled(): boolean;
        eventClick(next?: any): any;
        eventActivate(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        };
        disabled(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_clicker extends $.$mol_clicker {
        disabled(): boolean;
        eventActivate(next: Event): void;
    }
}
declare namespace $ {
    class $mol_clicker_button extends $mol_clicker {
    }
}
declare namespace $ {
    class $mol_clicker_major extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_clicker_minor extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_clicker_danger extends $mol_clicker_button {
    }
}
declare namespace $ {
    class $mol_checker extends $mol_clicker {
        checked(next?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        } & {
            "mol_checker_checked": (next?: any) => any;
        };
        icon(): any;
        label(): any[];
        labeler(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_checker extends $.$mol_checker {
        eventClick(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_svg extends $mol_viewer {
        tagName(): string;
        nameSpace(): string;
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        tagName(): string;
        geometry(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "d": () => any;
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
        pather(next?: any): $mol_svg_path;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_checker_expander extends $mol_checker {
        icon(next?: any): $mol_icon_chevron;
    }
}
declare namespace $ {
    class $mol_grider extends $mol_viewer {
        tagName(): string;
        rows(): any[];
        row(key: any): any;
        cols(): any[];
        records(): any[];
        record(key: any): any;
        hierarhyColumn(): string;
        rowers(): any[];
        rowHeight(): number;
        headerCellers(): any[];
        header(next?: any): $mol_grider_rower;
        gapTop(): number;
        gaperTop(next?: any): $mol_grider_gaper;
        gapBottom(): number;
        gaperBottom(next?: any): $mol_grider_gaper;
        cellers(key: any): any[];
        rower(key: any, next?: any): $mol_grider_rower;
        celler(key: any): any;
        cellerContent(key: any): any[];
        cellerContentText(key: any): any[];
        cellerText(key: any, next?: any): $mol_grider_celler;
        cellerContentNumber(key: any): any[];
        cellerNumber(key: any, next?: any): $mol_grider_number;
        columnHeaderContent(key: any): any[];
        columnHeader(key: any, next?: any): $mol_floater;
        rowLevel(key: any): number;
        rowExpanded(key: any, next?: any): any;
        cellerBranch(key: any, next?: any): $mol_grider_branch;
    }
}
declare namespace $ {
    class $mol_grider_gaper extends $mol_viewer {
        height(): number;
        heightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.height": () => any;
        };
    }
}
declare namespace $ {
    class $mol_grider_rower extends $mol_viewer {
        tagName(): string;
        height(): number;
        heightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.height": () => any;
        };
        cellers(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_grider_celler extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $ {
    class $mol_grider_number extends $mol_grider_celler {
    }
}
declare namespace $ {
    class $mol_grider_branch extends $mol_checker_expander {
        tagName(): string;
        level(): number;
        levelStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.paddingLeft": () => any;
        };
        expanded(next?: any): any;
        checked(next?: any): any;
        expandable(): boolean;
        enabled(): boolean;
        content(): any[];
        label(): any[];
    }
}
declare namespace $.$mol {
    class $mol_grider extends $.$mol_grider {
        childs(): any[];
        viewWindow(): {
            top: number;
            bottom: number;
            count: number;
        };
        gapTop(): number;
        gapBottom(): number;
        headerCellers(): $.$mol_floater[];
        columnHeaderContent(colId: string): string[];
        rowers(): $.$mol_grider_rower[];
        cellers(row: string): $mol_viewer[];
        colType(col: string): string;
        celler(id: {
            row: string;
            col: string;
        }): $mol_viewer;
        cellerContent(id: {
            row: string;
            col: string;
        }): any[];
        records(): any;
        record(row: string): any;
        rows(): string[];
        row(row: number): string;
        cols(): string[];
    }
    class $mol_grider_gaper extends $.$mol_grider_gaper {
        heightStyle(): string;
    }
    class $mol_grider_rower extends $.$mol_grider_rower {
        heightStyle(): string;
    }
    class $mol_grider_branch extends $.$mol_grider_branch {
        levelStyle(): string;
        expandable(): boolean;
    }
}
declare namespace $ {
    class $mol_icon_sort_asc extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_bencher extends $mol_grider {
        results(): any;
        resultsSorted(): any;
        records(): any;
        colSort(): string;
        eventSortToggle(key: any, next?: any): any;
        columnHeaderLabel(key: any): any[];
        columnHeaderSorter(key: any, next?: any): $mol_icon_sort_asc;
        columnHeaderContent(key: any): any[];
        columnHeader(key: any, next?: any): $mol_bencher_header;
        resultValue(key: any): string;
        resultPortion(key: any): number;
        resultPortioner(key: any, next?: any): $mol_portioner;
        cellerContentNumber(key: any): any[];
    }
}
declare namespace $ {
    class $mol_bencher_header extends $mol_floater {
        eventClick(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        };
        hint(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_floater_scrolling": () => any;
        } & {
            "title": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_bencher extends $.$mol_bencher {
        colSort(next?: string): any;
        resultsSorted(): any;
        resultValue(id: {
            row: string;
            col: string;
        }): any;
        resultNumber(id: {
            row: string;
            col: string;
        }): number;
        resultMaxValue(col: string): number;
        resultPortion(id: {
            row: string;
            col: string;
        }): number;
        columnHeaderLabel(col: string): string[];
        eventSortToggle(col: string, next?: Event): void;
        colType(col: string): string;
        cellerContentNumber(id: {
            row: string;
            col: string;
        }): any[];
        columnHeaderContent(col: string): any[];
    }
}
declare namespace $ {
    class $mol_lister extends $mol_viewer {
        minHeightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.minHeight": () => any;
        };
        rows(): any[];
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_lister extends $.$mol_lister {
        rowOffsets(): number[];
        rowContext(index: number): $mol_viewer_context;
        childsVisible(): any[];
        heightMinimal(): number;
        minHeightStyle(): string;
    }
}
declare namespace $ {
    class $mol_texter extends $mol_lister {
        text(): string;
        blockContent(key: any): any[];
        blockType(key: any): string;
        rower(key: any, next?: any): $mol_texter_rower;
        spanner(key: any, next?: any): $mol_texter_spanner;
        linker(key: any, next?: any): $mol_texter_linker;
        imager(key: any, next?: any): $mol_texter_imager;
        headerLevel(key: any): number;
        headerContent(key: any): any[];
        header(key: any, next?: any): $mol_texter_header;
        tablerHeaderCellers(key: any): any[];
        tablerRowers(key: any): any[];
        tablerGrider(key: any, next?: any): $mol_grider;
        tabler(key: any, next?: any): $mol_scroller;
        tablerCellers(key: any): any[];
        tablerRower(key: any, next?: any): $mol_grider_rower;
        tablerCellerContent(key: any): any[];
        tablerCeller(key: any, next?: any): $mol_grider_celler;
        tablerCellerHeader(key: any, next?: any): $mol_floater;
    }
}
declare namespace $ {
    class $mol_texter_rower extends $mol_viewer {
        heightMinimal(): number;
        type(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": () => any;
        };
    }
}
declare namespace $ {
    class $mol_texter_header extends $mol_viewer {
        tagName(): string;
        level(next?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_header_level": (next?: any) => any;
        };
        content(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_texter_spanner extends $mol_viewer {
        tagName(): string;
        type(next?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": (next?: any) => any;
        };
        content(next?: any): any;
        childs(next?: any): any;
    }
}
declare namespace $ {
    class $mol_texter_linker extends $mol_viewer {
        tagName(): string;
        type(next?: any): any;
        link(next?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": (next?: any) => any;
            "href": (next?: any) => any;
        };
        content(next?: any): any;
        childs(next?: any): any;
    }
}
declare namespace $ {
    class $mol_texter_imager extends $mol_viewer {
        tagName(): string;
        type(next?: any): any;
        link(next?: any): any;
        title(next?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": (next?: any) => any;
            "src": (next?: any) => any;
            "alt": (next?: any) => any;
        };
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
declare namespace $.$mol {
    class $mol_texter extends $.$mol_texter {
        tokensFlow(): $mol_syntax_token[];
        rows(): ($.$mol_scroller | $mol_texter_rower | $mol_texter_header)[];
        headerLevel(index: number): number;
        headerContent(index: number): ($mol_texter_spanner | $mol_texter_imager)[];
        blockType(index: number): string;
        cellContents(indexBlock: number): string[][];
        tablerRowers(blockId: number): $.$mol_grider_rower[];
        tablerHeaderCellers(blockId: number): $.$mol_floater[];
        tablerCellers(id: {
            block: number;
            row: number;
        }): $mol_grider_celler[];
        tablerCellerContent(id: {
            block: number;
            row: number;
            cell: number;
        }): ($mol_texter_spanner | $mol_texter_imager)[];
        text2spans(prefix: string, text: string): ($mol_texter_spanner | $mol_texter_imager)[];
        blockContent(indexBlock: number): ($mol_viewer | string)[];
    }
}
declare namespace $ {
    class $mol_pager extends $mol_viewer {
        titler(next?: any): $mol_viewer;
        head(): any[];
        header(next?: any): $mol_viewer;
        body(): any[];
        bodier(next?: any): $mol_scroller;
        foot(): any[];
        footer(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_icon_tick extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_checker_ticker extends $mol_checker {
        icon(next?: any): $mol_icon_tick;
    }
}
declare namespace $ {
    class $mol_app_bench extends $mol_stacker {
        tester(next?: any): $mol_app_bench_tester;
        results(): any;
        resultsColSort(next?: any): any;
        resulter(next?: any): $mol_bencher;
        description(): string;
        descriptioner(next?: any): $mol_texter;
        mainPage(next?: any): $mol_app_bench_mainer;
        main(): any[];
        addonerTitle(): string;
        menuOptions(): any[];
        menu(next?: any): $mol_lister;
        addonPage(next?: any): $mol_pager;
        addon(): any[];
        menuOptionerChecked(key: any, next?: any): any;
        menuOptionerTitle(key: any): string;
        menuOptioner(key: any, next?: any): $mol_checker_ticker;
    }
}
declare namespace $ {
    class $mol_app_bench_mainer extends $mol_pager {
        tester(): any;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_bench_tester extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_bench extends $.$mol_app_bench {
        bench(next?: string): any;
        sandbox(next?: HTMLIFrameElement, force?: $mol_atom_force): HTMLIFrameElement;
        'commandCurrent()': any[];
        commandCurrent(next?: any[], force?: $mol_atom_force): any[];
        commandResult<Result>(command: any[], next?: Result): Result;
        meta(): {
            title: {
                [lang: string]: string;
            };
            descr: {
                [lang: string]: string;
            };
            samples: {
                [step: string]: {
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
        samplesAll(next?: string[]): string[];
        samples(next?: string[]): string[];
        steps(next?: string[]): string[];
        title(): string;
        description(): string;
        resultsSample(sampleId: string): {
            [key: string]: any;
        };
        results(): {
            [sample: string]: {
                [step: string]: any;
            };
        };
        resultsColSort(next?: string): any;
        menuOptions(): $mol_checker_ticker[];
        menuOptionerTitle(sample: string): string;
        menuOptionerChecked(sample: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol extends $mol_scroller {
        sample(): string;
        header(next?: any): $mol_viewer;
        rowers(): any[];
        lister(next?: any): $mol_lister;
        childs(): any[];
        rowerSelected(key: any, next?: any): any;
        rowerTitle(key: any): string;
        rowerContent(key: any): string;
        rower(key: any, next?: any): $mol_app_bench_list_mol_rower;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol_rower extends $mol_viewer {
        selected(next?: any): any;
        heightMinimal(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_app_bench_list_mol_rower_selected": () => any;
        };
        eventToggle(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        };
        title(): string;
        titler(next?: any): $mol_viewer;
        content(): string;
        contenter(next?: any): $mol_viewer;
        childs(): any[];
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
        rowers(): $.$mol_app_bench_list_mol_rower[];
        rowerTitle(id: number): string;
        rowerContent(id: number): string;
        rowerSelected(id: number, next?: boolean): boolean;
        selectedId(next?: number): number;
    }
    class $mol_app_bench_list_mol_rower extends $.$mol_app_bench_list_mol_rower {
        eventToggle(next?: Event): void;
    }
}
