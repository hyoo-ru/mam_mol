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
        'objectClassNames()': string[];
        objectClassNames(): string[];
        private 'objectOwner()';
        objectOwner(next?: Object): Object;
        private 'objectField()';
        objectField(next?: string): string;
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
        obsoleteSlaves(): void;
        checkSlaves(): void;
        check(): void;
        obsolete(): Value;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobeyAll(): void;
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
        DOMTree(): Element;
        attr(): {
            [key: string]: () => string | number | boolean;
        };
        field(): {
            [key: string]: (next?: any) => any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        localizationContexts(): any;
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
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
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
    class $mol_svg_root extends $mol_viewer {
        tagName(): string;
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
    class $mol_svg_circle extends $mol_svg {
        tagName(): string;
        radius(): string;
        posX(): string;
        posY(): string;
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
    class $mol_grider extends $mol_scroller {
        rows(): any[];
        row(key: any): any;
        cols(): any[];
        records(): any[];
        record(key: any): any;
        hierarhyColumn(): string;
        rowersVisible(): any[];
        tabler(next?: any): $mol_viewer;
        childs(): any[];
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
        rowersVisible(): any[];
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
        colType(col: string): "text" | "branch" | "number";
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
        tabler(key: any, next?: any): $mol_grider;
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
declare namespace $.$mol {
    class $mol_texter extends $.$mol_texter {
        tokensFlow(): $mol_syntax_token[];
        rows(): ($.$mol_grider | $mol_texter_rower | $mol_texter_header)[];
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
        colType(col: string): "text" | "branch" | "number";
        cellerContentNumber(id: {
            row: string;
            col: string;
        }): any[];
        columnHeaderContent(col: string): any[];
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
        description(): string;
        descriptioner(next?: any): $mol_texter;
        results(): any;
        columnHeaderLabel(key: any): any[];
        resultsColSort(next?: any): any;
        resulter(next?: any): $mol_bencher;
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
        columnHeaderLabelSample(): string;
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
        columnHeaderLabel(col: string): string[];
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
declare namespace $ {
    class $mol_linker extends $mol_viewer {
        heightMinimal(): number;
        tagName(): string;
        uri(): string;
        current(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "href": () => any;
            "mol_linker_current": () => any;
        };
        arg(): {};
    }
}
declare namespace $.$mol {
    class $mol_linker extends $.$mol_linker {
        uri(): string;
        current(): boolean;
    }
}
declare namespace $ {
    class $mol_demo extends $mol_viewer {
        name(): string;
        title(): string;
        titler(next?: any): $mol_viewer;
        widget(): any;
        screener(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_demo extends $.$mol_demo {
        widget(): $mol_viewer;
    }
}
declare namespace $ {
    class $mol_demo_small extends $mol_demo {
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
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    class $mol_app_demo extends $mol_stacker {
        items(): any[];
        lister(next?: any): $mol_scroller;
        main(): any[];
        titleAddon(): string;
        options(): any[];
        optioner(next?: any): $mol_lister;
        menu(next?: any): $mol_pager;
        addon(): any[];
        welcomeText(): string;
        welcomeTexter(next?: any): $mol_texter;
        welcomer(next?: any): $mol_scroller;
    }
}
declare namespace $ {
    class $mol_app_demo_pager extends $mol_pager {
        backer_icon(next?: any): $mol_icon_chevron;
        backArg(): {
            "demo": () => any;
        };
        backer(next?: any): $mol_linker;
        head(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_demo extends $.$mol_app_demo {
        title(): string;
        main(): $mol_viewer[];
        welcomeText(): string;
        side(): boolean;
        namesDemo(): string[];
        options(): $mol_linker[];
        selected(): any;
        option(name: string): $mol_linker;
        widget(name: string): $mol_viewer;
        detailer(name: string): $mol_app_demo_pager;
    }
}
declare namespace $ {
    class $mol_statuser extends $mol_viewer {
        status(): any;
        message(): string;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_statuser extends $.$mol_statuser {
        message(): any;
    }
}
declare namespace $ {
    class $mol_app_habhub extends $mol_pager {
        title(): string;
        gisters(): any[];
        statuser(next?: any): $mol_statuser;
        lister(next?: any): $mol_lister;
        body(): any[];
        gistContent(key: any): string;
        gister(key: any, next?: any): $mol_texter;
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
        gisters(): $mol_viewer[];
        gistContent(index: number): string;
    }
}
declare namespace $ {
    class $mol_app_habhub_demo extends $mol_app_habhub {
    }
}
declare namespace $ {
    class $mol_stringer extends $mol_viewer {
        tagName(): string;
        enabled(): boolean;
        hint(): string;
        type(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "placeholder": () => any;
            "type": () => any;
        };
        disabled(): boolean;
        value(next?: any): any;
        valueChanged(next?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "disabled": () => any;
            "value": () => any;
        };
        eventChange(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (next?: any) => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_stringer extends $.$mol_stringer {
        eventChange(next?: Event): void;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_app_hello extends $mol_viewer {
        namerHint(): string;
        name(next?: any): any;
        namer(next?: any): $mol_stringer;
        greeting(): string;
        greeter(next?: any): $mol_viewer;
        childs(): any[];
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
    class $mol_rower extends $mol_viewer {
    }
}
declare namespace $ {
    class $mol_rower_sub extends $mol_viewer {
    }
}
declare namespace $ {
    class $mol_app_inventory extends $mol_viewer {
        domain(next?: any): $mol_app_inventory_domain;
        page(): any;
        childs(): any[];
        header(next?: any): $mol_app_inventory_header;
        enter(next?: any): $mol_app_inventory_enter;
        controller(next?: any): $mol_app_inventory_controller;
        keeper(next?: any): $mol_app_inventory_keeper;
        stats(next?: any): $mol_app_inventory_stats;
    }
}
declare namespace $ {
    class $mol_app_inventory_header extends $mol_rower {
        keeperLabel(): string;
        keeperLink(next?: any): $mol_linker;
        controlLabel(): string;
        controlLink(next?: any): $mol_linker;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory extends $.$mol_app_inventory {
        page(): $mol_viewer;
        pageName(next?: string): any;
    }
}
declare namespace $ {
    class $mol_app_inventory_stats extends $mol_pager {
        domain(next?: any): $mol_app_inventory_domain;
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
    class $mol_number extends $mol_viewer {
        precision(): number;
        precisionView(): number;
        precisionChange(): number;
        value(next?: any): any;
        eventDec(next?: any): any;
        enabled(): boolean;
        enabledDec(): boolean;
        decIcon(next?: any): $mol_icon_minus;
        decrementer(next?: any): $mol_number_clicker;
        valueString(next?: any): any;
        hint(): string;
        enabledStringer(): boolean;
        stringer(next?: any): $mol_stringer;
        eventInc(next?: any): any;
        enabledInc(): boolean;
        incIcon(next?: any): $mol_icon_plus;
        incrementer(next?: any): $mol_number_clicker;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_number_clicker extends $mol_clicker {
    }
}
declare namespace $.$mol {
    class $mol_number extends $.$mol_number {
        eventDec(next?: Event): void;
        eventInc(next?: Event): void;
        valueString(next?: string): any;
        eventWheel(next?: MouseWheelEvent): void;
        incrementer(): $mol_number_clicker;
        decrementer(): $mol_number_clicker;
    }
}
declare namespace $ {
    class $mol_switcher extends $mol_viewer {
        heightMinimal(): number;
        enabled(): boolean;
        optionChecked(key: any, next?: any): any;
        optionLabel(key: any): string;
        optioner(key: any, next?: any): $mol_checker;
        value(next?: any): any;
        options(): {};
        items(): any[];
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_switcher extends $.$mol_switcher {
        value(next?: any): any;
        options(): {
            [key: string]: () => string;
        };
        items(): $.$mol_checker[];
        optionLabel(key: string): string;
        optionChecked(key: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_inventory_positioner extends $mol_rower {
        position(): any;
        title(): string;
        titler(next?: any): $mol_viewer;
        description(): string;
        descriptioner(next?: any): $mol_viewer;
        producter(next?: any): $mol_viewer;
        count(next?: any): any;
        counter(next?: any): $mol_number;
        status(next?: any): any;
        statusLabelPending(): string;
        statusLabelApproved(): string;
        statusLabelRejected(): string;
        statuser(next?: any): $mol_switcher;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_positioner extends $.$mol_app_inventory_positioner {
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
    class $mol_coder extends $mol_viewer {
        value(next?: any): any;
        format(): string;
        hint(): string;
        manualer(next?: any): $mol_stringer;
        eventScan(next?: any): any;
        labelScan(): string;
        scanner(next?: any): $mol_clicker;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_coder extends $.$mol_coder {
        supportScan(): boolean;
        scanner(): $.$mol_clicker;
        eventScan(): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper extends $mol_pager {
        domain(next?: any): $mol_app_inventory_domain;
        positioners(): any[];
        body(): any[];
        position(key: any): any;
        positioner(key: any, next?: any): $mol_app_inventory_positioner;
        newCode(next?: any): any;
        newCodeHint(): string;
        coder(next?: any): $mol_coder;
        eventSubmit(next?: any): any;
        submitLabel(): string;
        submitter(next?: any): $mol_clicker_major;
        coderRower(next?: any): $mol_rower;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
        position(code: string): $mol_app_inventory_domain_position;
        newCode(next?: string): string;
        positioners(): $.$mol_app_inventory_positioner[];
        positions(): $mol_app_inventory_domain_position[];
        eventSubmit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_controller extends $mol_pager {
        domain(next?: any): $mol_app_inventory_domain;
        positioners(): any[];
        body(): any[];
        position(key: any): any;
        positioner(key: any, next?: any): $mol_app_inventory_positioner;
        eventSubmit(next?: any): any;
        submitLabel(): string;
        submitter(next?: any): $mol_clicker_major;
        controlsRower(next?: any): $mol_rower;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
        position(code: string): $mol_app_inventory_domain_position;
        positioners(): $.$mol_app_inventory_positioner[];
        positions(): $mol_app_inventory_domain_position[];
        eventSubmit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_form extends $mol_viewer {
        submitBlocked(): boolean;
        formFields(): any[];
        barFields(next?: any): $mol_viewer;
        buttons(): any[];
        barButtons(next?: any): $mol_rower;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_form extends $.$mol_form {
        submitBlocked(): boolean;
    }
}
declare namespace $ {
    class $mol_form_field extends $mol_viewer {
        name(): string;
        namer(next?: any): $mol_viewer;
        errors(): any[];
        errorer(next?: any): $mol_viewer;
        label(next?: any): $mol_viewer;
        control(): any;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_inventory_enter extends $mol_viewer {
        domain(next?: any): $mol_app_inventory_domain;
        entered(next?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(next?: any): any;
        loginControl(next?: any): $mol_stringer;
        loginField(next?: any): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(next?: any): any;
        passControl(next?: any): $mol_stringer;
        passwordField(next?: any): $mol_form_field;
        submitLabel(): string;
        eventSubmit(next?: any): any;
        submitBlocked(): boolean;
        submit(next?: any): $mol_clicker_major;
        form(next?: any): $mol_form;
        message(): string;
        childs(): any[];
        messageNoAccess(): string;
    }
}
declare var cpprun: any;
declare namespace $.$mol {
    class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
        eventSubmit(): void;
        message(): string;
    }
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
        rawTable<Row>(name: string): Row[];
        productsTable(): $mol_app_inventory_domain_product_raw[];
        positionsTable(): $mol_app_inventory_domain_product_raw[];
        productRowsById(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        productByCode(code: string): $mol_app_inventory_domain_product;
        productRowsByCode(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        positionsDict(): {
            [code: string]: $mol_app_inventory_domain_position_raw;
        };
        products(): $mol_app_inventory_domain_product[];
        product(code: string): $mol_app_inventory_domain_product;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        position(productCode: string): $mol_app_inventory_domain_position;
        positionCount(productCode: string, next?: number): any;
        positionStatus(productCode: string, next?: $mol_app_inventory_domain_position_status): any;
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
        count1(next?: any): any;
        status1(next?: any): any;
        positioner1(next?: any): $mol_app_inventory_positioner;
        title2(): string;
        description2(): string;
        count2(next?: any): any;
        status2(next?: any): any;
        positioner2(next?: any): $mol_app_inventory_positioner;
        positioners(): any[];
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
        valueView(): string;
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
    function $mol_stub_selectRandom<Value>(list: Value[]): Value;
    function $mol_stub_strings(prefix?: string, count?: number, length?: number): any[];
    function $mol_stub_code(length?: number): string;
    function $mol_stub_price(max?: number): $mol_unit_money_usd;
    function $mol_stub_productName(): string;
    function $mol_stub_companyNameBig(): string;
    function $mol_stub_companyNameSmall(): string;
    function $mol_stub_companyName(): string;
    function $mol_stub_personName(): string;
    function $mol_stub_city(): string;
    function $mol_stub_time(maxShift?: number): $jin.time.moment_class;
}
declare namespace $ {
    class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
        products(): $mol_app_inventory_domain_product[];
        product(code: string): $mol_app_inventory_domain_product;
        productByCode(code: string): $mol_app_inventory_domain_product;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        position(productCode: string): $mol_app_inventory_domain_position;
        positionCount(productCode: string, next?: number): number;
        positionStatus(productCode: string, next?: $mol_app_inventory_domain_position_status): $mol_app_inventory_domain_position_status;
        authentificated(): boolean;
        message(): string;
    }
}
declare namespace $ {
    class $mol_app_inventory_demo extends $mol_app_inventory {
        domain(next?: any): $mol_app_inventory_domain_mock;
    }
}
declare namespace $ {
    class $mol_app_inventory_enter_demo extends $mol_app_inventory_enter {
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper_demo extends $mol_app_inventory_keeper {
        domain(next?: any): $mol_app_inventory_domain_mock;
        title1(): string;
        description1(): string;
        count1(next?: any): any;
        status1(next?: any): any;
        positioner1(next?: any): $mol_app_inventory_positioner;
        title2(): string;
        description2(): string;
        count2(next?: any): any;
        status2(next?: any): any;
        positioner2(next?: any): $mol_app_inventory_positioner;
        positioners(next?: any): any;
    }
}
declare namespace $ {
    class $mol_app_quine extends $mol_pager {
        content(): string;
        texter(next?: any): $mol_texter;
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
    class $mol_app_report extends $mol_pager {
        title(): string;
        description(): string;
        descriptor(next?: any): $mol_viewer;
        headCells(): any[];
        headRower(next?: any): $mol_app_report_rower;
        rows(): any[];
        tabler(next?: any): $mol_app_report_tabler;
        body(): any[];
        rowerCells(key: any): any[];
        rower(key: any, next?: any): $mol_app_report_rower;
        cellContent(key: any): any;
        cellRows(key: any): number;
        cellCols(key: any): number;
        celler(key: any, next?: any): $mol_app_report_celler;
        cellValue(key: any, next?: any): any;
        texter(key: any, next?: any): $mol_viewer;
        stringer(key: any, next?: any): $mol_stringer;
        number(key: any, next?: any): $mol_number;
    }
}
declare namespace $ {
    class $mol_app_report_tabler extends $mol_viewer {
        tagName(): string;
        rows(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_rower extends $mol_viewer {
        tagName(): string;
        cells(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_celler extends $mol_viewer {
        tagName(): string;
        cols(): number;
        rows(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "colspan": () => any;
            "rowspan": () => any;
        };
        content(): any;
        childs(): any[];
    }
}
declare namespace $.$mol {
    interface $mol_app_report_formatCol {
        title: string;
        field?: string;
        childs?: $mol_app_report_formatCol[];
    }
    interface $mol_app_report_formatRow {
        title: string;
        field?: string;
        childs?: $mol_app_report_formatRow[];
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
        formatRows(): $mol_app_report_formatRow[];
        scheme(): {
            [field: string]: $mol_app_report_scheme;
        };
        data(): {
            [field: string]: string;
        };
        description(): string;
        headCells(): $mol_app_report_celler[];
        rows(): $mol_app_report_rower[];
        formatRow(pos: number[]): $mol_app_report_formatRow;
        rowerCells(pos: number[]): $mol_app_report_celler[];
        cellCols(pos: number[]): 0 | 1 | 3;
        cellContent(pos: number[]): $mol_viewer;
        cellValue(pos: number[], next: any): any;
        cellContentName(pos: number[]): string;
        cellContentType(pos: number[]): string;
        cellContentValue(pos: number[]): string;
    }
}
declare namespace $ {
    class $mol_app_report_demo extends $mol_app_report {
    }
}
declare namespace $ {
    class $mol_app_signup extends $mol_form {
        nameFirstLabel(): string;
        nameFirstErrors(): any[];
        nameFirstHint(): string;
        nameFirst(next?: any): any;
        nameFirstControl(next?: any): $mol_stringer;
        nameFirstField(next?: any): $mol_form_field;
        nameNickLabel(): string;
        nameNickErrors(): any[];
        nameNickHint(): string;
        nameNick(next?: any): any;
        nameNickControl(next?: any): $mol_stringer;
        nameNickField(next?: any): $mol_form_field;
        nameSecondLabel(): string;
        nameSecondErrors(): any[];
        nameSecondHint(): string;
        nameSecond(next?: any): any;
        nameSecondControl(next?: any): $mol_stringer;
        nameSecondField(next?: any): $mol_form_field;
        sexLabel(): string;
        sexErrors(): any[];
        sex(next?: any): any;
        sexOptionMale(): string;
        sexOptionIntersex(): string;
        sexOptionFemale(): string;
        sexOptions(): {
            "male": () => any;
            "intersex": () => any;
            "female": () => any;
        };
        sexControl(next?: any): $mol_switcher;
        sexField(next?: any): $mol_form_field;
        formFields(): any[];
        submitText(): string;
        eventSubmit(next?: any): any;
        submit(next?: any): $mol_clicker_major;
        buttons(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_signup extends $.$mol_app_signup {
        nameFirst(next?: string): any;
        nameFirstErrors(): string[];
        nameNick(next?: string): any;
        nameSecond(next?: string): any;
        nameSecondErrors(): string[];
        sex(next?: string): any;
        sexErrors(): string[];
        eventSubmit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_signup_dmeo extends $mol_app_signup {
    }
}
declare namespace $ {
    class $mol_carder extends $mol_lister {
        status(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_carder_status": () => any;
        };
        content(): any;
        contenter(next?: any): $mol_viewer;
        statusText(): string;
        statuser(next?: any): $mol_viewer;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_labeler extends $mol_viewer {
        titler(next?: any): $mol_viewer;
        content(): any;
        contenter(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_coster extends $mol_viewer {
        value(): any;
        prefix(): string;
        prefixer(next?: any): $mol_viewer;
        valueView(): string;
        mainer(next?: any): $mol_viewer;
        postfix(): string;
        postfixer(next?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_coster extends $.$mol_coster {
        value(): $mol_unit_money;
        prefix(): string;
        valueView(): string;
        postfix(): string;
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
    class $mol_app_supplies_domain_payMethod extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_debitor extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply_position extends $mol_object {
        name(): string;
        supplyMoment(): $jin.time.moment_class;
        division(): $mol_app_supplies_domain_supply_division;
        store(): $mol_app_supplies_domain_store;
        price(): $mol_unit_money;
        quantity(): number;
        cost(): $mol_unit_money;
    }
    class $mol_app_supplies_domain_attachment extends $mol_object {
        urlThumb(): string;
        urlLoad(): string;
    }
    class $mol_app_supplies_domain_person extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_contract extends $mol_object {
        id(): string;
    }
    class $mol_app_supplies_domain_ballanceUnit extends $mol_object {
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
        ballanceUnit(): $mol_app_supplies_domain_ballanceUnit;
        manager(): $mol_app_supplies_domain_person;
        contract(): $mol_app_supplies_domain_contract;
        payMethod(): $mol_app_supplies_domain_payMethod;
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
        supplyStatus(id: string, next?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
        supply(id: string): $mol_app_supplies_domain_supply;
        provider(id: string): $mol_app_supplies_domain_provider;
        consumer(id: string): $mol_app_supplies_domain_consumer;
        ballanceUnit(id: string): $mol_app_supplies_domain_ballanceUnit;
        division(id: string): $mol_app_supplies_domain_supply_division;
        supplyGroup(id: string): $mol_app_supplies_domain_supply_group;
        store(id: string): $mol_app_supplies_domain_store;
        person(id: string): $mol_app_supplies_domain_person;
        contract(id: string): $mol_app_supplies_domain_person;
        payMethod(id: string): $mol_app_supplies_domain_payMethod;
        debitor(id: string): $mol_app_supplies_domain_payMethod;
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
    class $mol_app_supplies_carder extends $mol_carder {
        supply(): any;
        heightMinimal(): number;
        arg(): {};
        linker(next?: any): $mol_linker;
        childs(): any[];
        codeTitle(): string;
        code(): string;
        codeItem(next?: any): $mol_labeler;
        costTitle(): string;
        cost(next?: any): $mol_unit_money;
        coster(next?: any): $mol_coster;
        costItem(next?: any): $mol_labeler;
        providerTitle(): string;
        providerName(): string;
        providerItem(next?: any): $mol_labeler;
        items(): any[];
        grouper(next?: any): $mol_rower;
        content(): $mol_rower;
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_carder extends $.$mol_app_supplies_carder {
        supply(): $mol_app_supplies_domain_supply;
        code(): string;
        providerName(): string;
        cost(): $mol_unit_money;
        status(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_carder_demo_pending extends $mol_app_supplies_carder {
        code(): string;
        providerName(): string;
        cost(next?: any): $mol_unit_money_usd;
        status(): string;
        arg(): {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_carder_demo_approved extends $mol_app_supplies_carder {
        code(): string;
        providerName(): string;
        cost(next?: any): $mol_unit_money_rur;
        status(): string;
        arg(): {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_carder_demo_selected extends $mol_app_supplies_carder {
        code(): string;
        providerName(): string;
        cost(next?: any): $mol_unit_money_usd;
        status(): string;
        arg(): {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_enter extends $mol_viewer {
        entered(next?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(next?: any): any;
        loginControl(next?: any): $mol_stringer;
        loginField(next?: any): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(next?: any): any;
        passControl(next?: any): $mol_stringer;
        passwordField(next?: any): $mol_form_field;
        submitLabel(): string;
        eventSubmit(next?: any): any;
        submitBlocked(): boolean;
        submit(next?: any): $mol_clicker_major;
        form(next?: any): $mol_form;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_enter extends $.$mol_app_supplies_enter {
        eventSubmit(): void;
    }
}
declare namespace $ {
    class $mol_app_supplies_lister extends $mol_pager {
        supplies(): any[];
        title(): string;
        searcherHint(): string;
        searchQuery(next?: any): any;
        searcher(next?: any): $mol_coder;
        searchPanel(next?: any): $mol_rower;
        childs(): any[];
        supplyRows(): any[];
        lister(next?: any): $mol_lister;
        body(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_lister extends $.$mol_app_supplies_lister {
        requests(): $mol_app_supplies_domain_supply[];
        supplyRows(): $mol_app_supplies_carder[];
        supplyRow(index: number): $mol_app_supplies_carder;
    }
}
declare namespace $ {
    class $mol_decker extends $mol_lister {
        items(): any[];
        current(next?: any): any;
        switcherOptions(): {};
        switcher(next?: any): $mol_switcher;
        content(): any;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_decker_item extends $mol_object {
        title(): string;
        content(): any;
    }
}
declare namespace $.$mol {
    class $mol_decker extends $.$mol_decker {
        current(next?: string): string;
        switcherOptions(): {
            [key: string]: () => string;
        };
        content(): any;
    }
}
declare namespace $ {
    class $mol_tiler extends $mol_viewer {
        items(): any[];
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_tiler extends $.$mol_tiler {
        childs(): $mol_viewer[];
        groupItems(path: number[]): $mol_viewer[];
        groupChilds(path: number[]): $mol_viewer[];
        child(path: number[]): $mol_viewer;
        group(path: number[]): $mol_viewer;
        item(path: number[]): $mol_viewer;
    }
}
declare namespace $ {
    class $mol_icon_attach extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_attacher extends $mol_carder {
        items(next?: any): any;
        attachNew(next?: any): any;
        adder(next?: any): $mol_attacher_adder;
        content(next?: any): any;
        contenter(next?: any): $mol_tiler;
    }
}
declare namespace $ {
    class $mol_attacher_item extends $mol_linker {
        urlThumb(next?: any): any;
        urlLoad(next?: any): any;
        uri(next?: any): any;
        styleBG(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.backgroundImage": () => any;
        };
        loadable(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "href": () => any;
            "mol_linker_current": () => any;
        } & {
            "download": () => any;
        };
    }
}
declare namespace $ {
    class $mol_attacher_adder extends $mol_clicker {
        tagName(): string;
        fileNew(): string;
        icon(next?: any): $mol_icon_attach;
        eventCapture(next?: any): any;
        eventPicked(next?: any): any;
        input(next?: any): $mol_attacher_adder_input;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_attacher_adder_input extends $mol_viewer {
        tagName(): string;
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
        eventCapture(next?: any): any;
        eventClick(next?: any): any;
        eventPicked(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "change": (next?: any) => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_attacher extends $.$mol_attacher {
        attachNew(next?: string): string;
        itemer(id: number): $mol_attacher_item;
    }
    class $mol_attacher_item extends $.$mol_attacher_item {
        styleBG(): string;
    }
    class $mol_attacher_adder extends $.$mol_attacher_adder {
        fileNew(next?: string): string;
        eventCapture(next?: Event): void;
        eventPicked(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_sectioner extends $mol_lister {
        head(): any;
        header(next?: any): $mol_viewer;
        content(): any;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_supplies_positioner extends $mol_carder {
        heightMinimal(): number;
        productLabel(): string;
        productName(): string;
        productItem(next?: any): $mol_labeler;
        costlabel(): string;
        cost(next?: any): $mol_unit_money;
        coster(next?: any): $mol_coster;
        costItem(next?: any): $mol_labeler;
        mainGroup(next?: any): $mol_rower;
        divisionLabel(): string;
        divisionName(): string;
        divisionItem(next?: any): $mol_labeler;
        priceLabel(): string;
        price(next?: any): $mol_unit_money;
        pricer(next?: any): $mol_coster;
        priceItem(next?: any): $mol_labeler;
        addonGroup(next?: any): $mol_rower;
        quantityLabel(): string;
        quantity(): string;
        quantityItem(next?: any): $mol_labeler;
        supplyDateLabel(): string;
        supplyDate(): string;
        supplyDateItem(next?: any): $mol_labeler;
        storeLabel(): string;
        storeName(): string;
        storeItem(next?: any): $mol_labeler;
        supplyGroup(next?: any): $mol_rower;
        grouper(next?: any): $mol_viewer;
        content(): $mol_viewer;
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_positioner extends $.$mol_app_supplies_positioner {
        position(): $mol_app_supplies_domain_supply_position;
        productName(): string;
        price(): $mol_unit_money;
        quantity(): string;
        cost(): $mol_unit_money;
        supplyDate(): any;
        divisionName(): string;
        storeName(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detailer extends $mol_pager {
        supply(): any;
        title(): string;
        backer_icon(next?: any): $mol_icon_chevron;
        backArg(): {
            "side": () => any;
            "supply": () => any;
        };
        backer(next?: any): $mol_linker;
        head(): any[];
        orgLabel(): string;
        providerLabel(): string;
        providerName(): string;
        providerItem(next?: any): $mol_labeler;
        customerLabel(): string;
        consumerName(): string;
        consumerItem(next?: any): $mol_labeler;
        supplyGroupLabel(): string;
        supplyGroupName(): string;
        supplyGroupItem(next?: any): $mol_labeler;
        ballanceUnitLabel(): string;
        ballanceUnitName(): string;
        ballanceUnitItem(next?: any): $mol_labeler;
        orgItems(): any[];
        orgContent(next?: any): $mol_rower;
        orgItem(next?: any): $mol_decker_item;
        consLabel(): string;
        contractLabel(): string;
        contractId(): string;
        contractItem(next?: any): $mol_labeler;
        payMethodLabel(): string;
        payMethodName(): string;
        payMethodItem(next?: any): $mol_labeler;
        managerLabel(): string;
        managerName(): string;
        managerItem(next?: any): $mol_labeler;
        debitodLabel(): string;
        debitorName(): string;
        debitorItem(next?: any): $mol_labeler;
        consItems(): any[];
        consContent(next?: any): $mol_rower;
        consItem(next?: any): $mol_decker_item;
        descrDecker(next?: any): $mol_decker;
        descrCarder(next?: any): $mol_carder;
        attachTitle(): string;
        attachments(): any[];
        attachNew(next?: any): any;
        attacher(next?: any): $mol_attacher;
        attachCarder(next?: any): $mol_sectioner;
        positionsTitle(): string;
        costLabel(): string;
        cost(next?: any): $mol_unit_money;
        coster(next?: any): $mol_coster;
        costItem(next?: any): $mol_labeler;
        posListerHead(): any[];
        positions(): any[];
        posLister(next?: any): $mol_sectioner;
        content(): any[];
        contenter(next?: any): $mol_lister;
        lister(next?: any): $mol_lister;
        body(): any[];
        approved(next?: any): any;
        approvedLabel(): string;
        approver(next?: any): $mol_checker_ticker;
        tools(): any[];
        controller(next?: any): $mol_rower;
        foot(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_detailer extends $.$mol_app_supplies_detailer {
        supply(): $mol_app_supplies_domain_supply;
        title(): string;
        approved(next?: boolean): boolean;
        providerName(): string;
        consumerName(): string;
        ballanceUnitName(): string;
        supplyGroupName(): string;
        managerName(): string;
        payMethodName(): string;
        debitorName(): string;
        contractId(): string;
        cost(): $mol_unit_money;
        status(): string;
        positions(): $mol_app_supplies_positioner[];
        position(index: number): $mol_app_supplies_positioner;
        attachments(): $mol_attacher_item[];
        attachment(index: number): $mol_attacher_item;
        attachNew(next?: string): void;
        bodier(): $mol_scroller;
        scrollTop(next?: number): number;
    }
}
declare namespace $ {
    class $mol_app_supplies_root extends $mol_stacker {
        entered(next?: any): any;
        enter(next?: any): $mol_app_supplies_enter;
        supplies(): any[];
        searchQuery(next?: any): any;
        lister(next?: any): $mol_app_supplies_lister;
        supply(): any;
        detailer(next?: any): $mol_app_supplies_detailer;
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_root extends $.$mol_app_supplies_root {
        entered(next?: boolean): boolean;
        childs(): $mol_viewer[];
        main(): $.$mol_app_supplies_detailer[];
        addon(): $.$mol_app_supplies_lister[] | $.$mol_app_supplies_enter[];
        title(): string;
        domain(): $mol_app_supplies_domain_mock;
        supplies(): $mol_app_supplies_domain_supply[];
        supplyId(next?: string): any;
        searchQuery(next?: string): string;
        supply(): $mol_app_supplies_domain_supply;
    }
}
declare namespace $ {
    class $mol_app_supplies_demo extends $mol_app_supplies_root {
    }
}
declare namespace $ {
    class $mol_app_supplies_positioner_demo extends $mol_app_supplies_positioner {
        productName(): string;
        price(next?: any): $mol_unit_money_usd;
        quantity(): string;
        cost(next?: any): $mol_unit_money_usd;
        supplyDate(): string;
        divisionName(): string;
        storeName(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detailer_demo extends $mol_app_supplies_detailer {
        title(): string;
        approved(next?: any): any;
        providerName(): string;
        cost(next?: any): $mol_unit_money_rur;
        consumerName(): string;
        supplyGroupName(): string;
        ballanceUnitName(): string;
        contractId(): string;
        payMethodName(): string;
        managerName(): string;
        debitorName(): string;
        pos1(next?: any): $mol_app_supplies_positioner_demo;
        pos2(next?: any): $mol_app_supplies_positioner_demo;
        pos3(next?: any): $mol_app_supplies_positioner_demo;
        pos4(next?: any): $mol_app_supplies_positioner_demo;
        pos5(next?: any): $mol_app_supplies_positioner_demo;
        positions(): any[];
        attachments(): any[];
    }
}
declare namespace $ {
    class $mol_app_taxon extends $mol_pager {
        hierarhyField(): string;
        records(): any[];
        record(key: any): any;
        rows(): any[];
        rowExpanded(key: any, next?: any): any;
        rowLevel(key: any): number;
        grider(next?: any): $mol_grider;
        bodier(): $mol_grider;
    }
}
declare namespace $.$mol {
    interface $mol_app_taxon_hierarhy_node {
        id: number;
        parent: $mol_app_taxon_hierarhy_node;
        childs: $mol_app_taxon_hierarhy_node[];
    }
    interface $mol_app_taxon_data_row {
        KeyId: number;
    }
    class $mol_app_taxon extends $.$mol_app_taxon {
        hierarhyUri(): string;
        hierarhy(): {
            [key: number]: $mol_app_taxon_hierarhy_node;
        };
        dataUri(): string;
        dataResource(id: number): $mol_http_resource_json<any>;
        dataTable(): $mol_app_taxon_data_row[];
        record(path: number[]): $mol_app_taxon_data_row;
        rowsSub(path: number[]): number[][];
        rowRoot(): number[];
        rows(): number[][];
        records(): $mol_app_taxon_data_row[];
        branchExpanded(path: number[], next?: boolean): boolean;
        rowLevel(id: {
            row: number[];
        }): number;
        rowExpanded(id: {
            row: number[];
        }, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_taxon_demo extends $mol_app_taxon {
        hierarhyField(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
        hierarhy(): {
            [key: number]: $mol_app_taxon_hierarhy_node;
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
    class $mol_barer extends $mol_viewer {
    }
}
declare namespace $ {
    class $mol_app_todomvc extends $mol_scroller {
        title(): string;
        titler(next?: any): $mol_viewer;
        allCompleterEnabled(): boolean;
        allCompleted(next?: any): any;
        allCompleter(next?: any): $mol_checker;
        taskNewTitle(next?: any): any;
        eventAdd(next?: any): any;
        adder(next?: any): $mol_app_todomvc_adder;
        headerContent(): any[];
        header(next?: any): $mol_viewer;
        taskers(): any[];
        lister(next?: any): $mol_lister;
        pendingMessage(): string;
        pendinger(next?: any): $mol_viewer;
        filterAllLabel(): string;
        filterAll(next?: any): $mol_linker;
        filterActiveLabel(): string;
        filterActive(next?: any): $mol_linker;
        filterCompletedLabel(): string;
        filterCompleted(next?: any): $mol_linker;
        filterOptions(): any[];
        filter(next?: any): $mol_barer;
        sanitizerEnabled(): boolean;
        eventSanitize(): any;
        sanitizerLabel(): string;
        sanitizer(next?: any): $mol_clicker_minor;
        footerContent(): any[];
        footer(next?: any): $mol_viewer;
        panels(): any[];
        paneler(next?: any): $mol_lister;
        pager(next?: any): $mol_lister;
        childs(): any[];
        taskCompleted(key: any, next?: any): any;
        taskTitle(key: any, next?: any): any;
        eventTaskDrop(key: any, next?: any): any;
        tasker(key: any, next?: any): $mol_app_todomvc_tasker;
    }
}
declare namespace $ {
    class $mol_app_todomvc_adder extends $mol_stringer {
        hint(): string;
        eventPress(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (next?: any) => any;
        } & {
            "keyup": (next?: any) => any;
        };
        eventDone(next?: any): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_tasker extends $mol_viewer {
        heightMinimal(): number;
        completed(next?: any): any;
        completer(next?: any): $mol_checker;
        titleHint(): string;
        title(next?: any): any;
        titler(next?: any): $mol_stringer;
        eventDrop(next?: any): any;
        dropper(next?: any): $mol_clicker;
        childs(): any[];
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_app_todomvc_tasker_completed": () => any;
        };
    }
}
interface $mol_app_todomvc_task {
    completed?: boolean;
    title?: string;
}
declare namespace $.$mol {
    class $mol_app_todomvc_adder extends $.$mol_app_todomvc_adder {
        eventPress(next?: KeyboardEvent): any;
    }
    class $mol_app_todomvc extends $.$mol_app_todomvc {
        taskIds(next?: number[]): number[];
        argCompleted(): any;
        groupsByCompleted(): {
            [index: string]: number[];
        };
        tasksFiltered(): number[];
        allCompleted(next?: boolean): boolean;
        allCompleterEnabled(): boolean;
        pendingMessage(): string;
        _idSeed: number;
        eventAdd(next: Event): void;
        taskers(): $mol_app_todomvc_tasker[];
        task(id: number, next?: $mol_app_todomvc_task): any;
        taskCompleted(index: number, next?: boolean): any;
        taskTitle(index: number, next?: string): any;
        eventTaskDrop(index: number, next?: Event): void;
        eventSanitize(): void;
        panels(): ($mol_viewer | $.$mol_lister)[];
        footerVisible(): boolean;
        sanitizerEnabled(): boolean;
    }
}
declare namespace $ {
    class $mol_app_todomvc_demo extends $mol_app_todomvc {
    }
}
declare namespace $ {
    class $mol_app_users extends $mol_viewer {
        filterHint(): string;
        query(next?: any): any;
        filter(next?: any): $mol_stringer;
        userRows(): any[];
        lister(next?: any): $mol_lister;
        body(): any[];
        bodier(next?: any): $mol_scroller;
        reloadLabel(): string;
        eventReload(next?: any): any;
        reloader(next?: any): $mol_clicker_minor;
        loaded(): boolean;
        addLabel(): string;
        eventAdd(next?: any): any;
        adder(next?: any): $mol_clicker_minor;
        changed(): boolean;
        saveLabel(): string;
        eventSave(next?: any): any;
        saver(next?: any): $mol_clicker_major;
        saverResult(): any;
        messager(next?: any): $mol_statuser;
        controller(next?: any): $mol_rower;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_users_item extends $mol_rower {
        heightMinimal(): number;
        title(next?: any): any;
        titler(next?: any): $mol_stringer;
        dropLabel(): string;
        eventDrop(next?: any): any;
        dropper(next?: any): $mol_clicker_minor;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_users extends $.$mol_app_users {
        queryArg(next?: string): any;
        query(next?: string): string;
        _queryTimer: number;
        master(): $mol_http_resource_json<{
            items: {
                login: string;
            }[];
        }>;
        childs(): $.$mol_stringer[];
        users(next?: string[]): string[];
        usersMaster(next?: string[], force?: $mol_atom_force): string[];
        saverResult(): string[];
        eventReload(next?: Event): void;
        eventAdd(next?: Event): void;
        eventUserDrop(id: number, next?: Event): void;
        changed(): boolean;
        loaded(): boolean;
        eventSave(next?: Event): void;
        body(): any[];
        userRows(): $mol_app_users_item[];
        userRow(id: number): $mol_app_users_item;
        userName(id: number, next?: string): string;
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
    class $mol_attacher_demo extends $mol_attacher {
    }
}
declare namespace $ {
    class $mol_attacher_demo_filled extends $mol_attacher {
        item0(next?: any): $mol_attacher_item;
        item1(next?: any): $mol_attacher_item;
        item2(next?: any): $mol_attacher_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_barer_demo_search extends $mol_barer {
        value(next?: any): any;
        stringer(next?: any): $mol_stringer;
        submitter(next?: any): $mol_clicker;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_barer_demo_login extends $mol_barer {
        value(next?: any): any;
        stringer(next?: any): $mol_stringer;
        rememberer(next?: any): $mol_checker_ticker;
        submitter(next?: any): $mol_clicker;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_bencher_demo extends $mol_bencher {
    }
}
declare namespace $.$mol {
    class $mol_bencher_demo extends $.$mol_bencher_demo {
        colSort(next?: string): string;
        results(): {
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
    class $mol_dimmer extends $mol_viewer {
        haystack(next?: any): any;
        needle(next?: any): any;
        parts(): any[];
        childs(): any[];
        string(key: any): string;
        low(key: any, next?: any): $mol_dimmer_low;
    }
}
declare namespace $ {
    class $mol_dimmer_low extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $.$mol {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): any;
        string(index: number): any;
    }
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
    class $mol_suggester extends $mol_viewer {
        suggests(): any[];
        eventPress(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "keydown": (next?: any) => any;
        };
        selectedRow(next?: any): any;
        focused(): boolean;
        suggest(key: any): string;
        eventRowerSelected(key: any, next?: any): any;
        selected(key: any): boolean;
        rower(key: any, next?: any): $mol_suggester_rower;
        value(next?: any): any;
        hint(): string;
        stringer(next?: any): $mol_stringer;
        suggestRows(): any[];
        lister(next?: any): $mol_lister;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_suggester_rower extends $mol_clicker {
        tagName(): string;
        eventSelected(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        } & {
            "mousedown": (next?: any) => any;
        };
        selected(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        } & {
            "mol_suggester_selected": () => any;
        };
        heightMinimal(): number;
        text(): string;
        prefix(): string;
        dimmer(next?: any): $mol_dimmer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_suggester extends $.$mol_suggester {
        contextSub(): $mol_viewer_context;
        suggestRows(): $mol_suggester_rower[];
        childs(): ($.$mol_lister | $.$mol_stringer)[];
        eventRowerSelected(index: number, next?: MouseEvent): void;
        selectedRow(next?: any): any;
        eventPress(next?: KeyboardEvent): void;
        focused(): boolean;
        selected(index: number): boolean;
        suggest(index: number): any;
    }
}
declare namespace $ {
    class $mol_rower_demo extends $mol_rower {
        heightMinimal(): number;
        helloHint(): string;
        title(next?: any): any;
        suggest1(): string;
        suggest2(): string;
        titler(next?: any): $mol_suggester;
        countHint(): string;
        count(next?: any): any;
        counter(next?: any): $mol_number;
        progress(): number;
        progresser(next?: any): $mol_portioner;
        publishLabel(): string;
        publish(next?: any): any;
        publisher(next?: any): $mol_checker_ticker;
        dropLabel(): string;
        eventLog(next?: any): any;
        buttonDrop(next?: any): $mol_clicker_minor;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_rower_demo extends $.$mol_rower_demo {
        eventLog(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_carder_demo extends $mol_carder {
        content(next?: any): $mol_rower_demo;
        status(): string;
    }
}
declare namespace $ {
    class $mol_checker_expander_demo extends $mol_rower {
        c1Label(): string;
        c1(next?: any): $mol_checker_expander;
        c2Label(): string;
        c2(next?: any): $mol_checker_expander;
        c3(next?: any): $mol_checker_expander;
        c4(next?: any): $mol_checker_expander;
        c5Label(): string;
        c5(next?: any): $mol_checker_expander;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo extends $mol_rower {
        c1Label(): string;
        c1(next?: any): $mol_checker_ticker;
        c2Label(): string;
        c2(next?: any): $mol_checker_ticker;
        c3(next?: any): $mol_checker_ticker;
        c4(next?: any): $mol_checker_ticker;
        c5(next?: any): $mol_checker_ticker;
        c6Label(): string;
        c6(next?: any): $mol_checker_ticker;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_clicker_demo extends $mol_rower {
        majorLabel(): string;
        events(next?: any): any;
        major(next?: any): $mol_clicker_major;
        majorDisabled(next?: any): $mol_clicker_major;
        minorLabel(): string;
        minor(next?: any): $mol_clicker_minor;
        minorDisabled(next?: any): $mol_clicker_minor;
        dangerLabel(): string;
        danger(next?: any): $mol_clicker_danger;
        dangerDisabled(next?: any): $mol_clicker_danger;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_clicker_demo extends $.$mol_clicker_demo {
        events(...diff: Event[]): void;
    }
}
declare namespace $ {
    class $mol_coder_demo extends $mol_rower {
        coder1(next?: any): $mol_coder;
        coder2(next?: any): $mol_coder;
        coder3(next?: any): $mol_coder;
        coder4(next?: any): $mol_coder;
        coder5(next?: any): $mol_coder;
        coder6(next?: any): $mol_coder;
        coder7(next?: any): $mol_coder;
        coder8(next?: any): $mol_coder;
        coder9(next?: any): $mol_coder;
        childs(): any[];
    }
}
declare namespace $ {
    function $mol_csv_parse(text: string, delimiter?: string): {
        [key: string]: any;
    }[];
}
declare namespace $ {
    class $mol_stringer_demo extends $mol_rower {
        name(next?: any): any;
        one(next?: any): $mol_stringer;
        twoHint(): string;
        two(next?: any): $mol_stringer;
        threeHint(): string;
        three(next?: any): $mol_stringer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_stringer_demo extends $.$mol_stringer_demo {
        name(next?: string): string;
    }
}
declare namespace $ {
    class $mol_decker_demo extends $mol_decker {
        stringerLabel(): string;
        stringerContent(next?: any): $mol_stringer_demo;
        stringerItem(next?: any): $mol_decker_item;
        buttonsLabel(): string;
        clickerContent(next?: any): $mol_clicker_demo;
        clickerItem(next?: any): $mol_decker_item;
        checkerLabel(): string;
        checkerContent(next?: any): $mol_checker_ticker_demo;
        checkerItem(next?: any): $mol_decker_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_demo_all extends $mol_viewer {
        name(): string;
        mediumLabel(): string;
        medium(next?: any): $mol_demo_medium;
        smallLabel(): string;
        small(next?: any): $mol_demo_small;
        largeLabel(): string;
        large(next?: any): $mol_demo_large;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_dimmer_demo extends $mol_rower {
        one(next?: any): $mol_dimmer;
        two(next?: any): $mol_dimmer;
        three(next?: any): $mol_dimmer;
        four(next?: any): $mol_dimmer;
        five(next?: any): $mol_dimmer;
        six(next?: any): $mol_dimmer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_expander extends $mol_lister {
        expanded(next?: any): any;
        label(): any[];
        labeler(next?: any): $mol_checker_expander;
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
    class $mol_filler extends $mol_viewer {
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_expander_demo extends $mol_expander {
        label(): any[];
        content(next?: any): $mol_filler;
    }
}
declare namespace $ {
    class $mol_lister_demo extends $mol_lister {
    }
}
declare namespace $.$mol {
    class $mol_lister_demo extends $.$mol_lister_demo {
        rows(): $mol_viewer[];
        rower(id: number): $mol_rower_demo;
    }
}
declare namespace $ {
    class $mol_floater_demo extends $mol_viewer {
        floaterContent(next?: any): $mol_carder_demo;
        floater(next?: any): $mol_floater;
        contenter(next?: any): $mol_lister_demo;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_form_demo extends $mol_form {
        loginLabel(): string;
        loginErrors(): any[];
        login(next?: any): any;
        loginControl(next?: any): $mol_stringer;
        loginField(next?: any): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(next?: any): any;
        passControl(next?: any): $mol_stringer;
        passwordField(next?: any): $mol_form_field;
        formFields(): any[];
        submitText(): string;
        eventSubmit(next?: any): any;
        submit(next?: any): $mol_clicker_major;
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
    class $mol_grider_demo extends $mol_grider {
        rowHeight(): number;
    }
}
declare namespace $.$mol {
    class $mol_grider_demo extends $.$mol_grider_demo {
        records(): string[][];
        columnHeaderContent(id: string): string[];
    }
}
declare namespace $ {
    class $mol_html_head extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $ {
    class $mol_html_body extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $ {
    class $mol_html_title extends $mol_viewer {
        tagName(): string;
        title(): string;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_html_meta extends $mol_viewer {
        tagName(): string;
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
    class $mol_html_link extends $mol_viewer {
        tagName(): string;
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
    class $mol_icon_demo extends $mol_rower {
        icons(): any[];
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_icon_demo extends $.$mol_icon_demo {
        names(): string[];
        icons(): $mol_viewer[];
        icon(name: string): $mol_viewer;
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
        userName(next?: any): any;
        content(next?: any): $mol_stringer;
    }
}
declare namespace $ {
    class $mol_linker_demo extends $mol_rower {
        labelRed(): string;
        linkRed(next?: any): $mol_linker;
        labelGreen(): string;
        linkGreen(next?: any): $mol_linker;
        labelBlue(): string;
        linkBlue(next?: any): $mol_linker;
        linkExternal(next?: any): $mol_linker;
        childs(): any[];
    }
}
declare namespace $ {
    function $mol_maybe<Value>(value: Value): Value[];
}
declare namespace $ {
    class $mol_number_demo extends $mol_rower {
        zero(next?: any): $mol_number;
        year(next?: any): any;
        one(next?: any): $mol_number;
        two(next?: any): $mol_number;
        age(next?: any): any;
        three(next?: any): $mol_number;
        four(next?: any): $mol_number;
        five(next?: any): $mol_number;
        six(next?: any): $mol_number;
        seven(next?: any): $mol_number;
        eight(next?: any): $mol_number;
        nine(next?: any): $mol_number;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_pager_demo extends $mol_pager {
        title(): string;
        signup(next?: any): $mol_app_signup;
        body(): any[];
        rower(next?: any): $mol_rower_demo;
        foot(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render extends $mol_viewer {
        title(): string;
        titler(next?: any): $mol_viewer;
        runnerLabel(): string;
        eventRun(next?: any): any;
        runner(next?: any): $mol_clicker_major;
        head(): any[];
        header(next?: any): $mol_viewer;
        rows(): any[];
        lister(next?: any): $mol_lister;
        contenter(next?: any): $mol_scroller;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render_row extends $mol_viewer {
        selected(next?: any): any;
        heightMinimal(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_perf_render_row_selected": () => any;
        };
        eventToggle(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        };
        label(): string;
        bar(next?: any): $mol_viewer;
        childs(): any[];
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
    class $mol_perf_uibench extends $mol_scroller {
        page(): any;
        childs(): any[];
        stateTable(): any;
        table(next?: any): $mol_perf_uibench_table;
        stateAnim(): any;
        anim(next?: any): $mol_perf_uibench_anim;
        stateTree(): any;
        tree(next?: any): $mol_perf_uibench_tree;
    }
}
declare namespace $ {
    class $mol_perf_uibench_table extends $mol_lister {
        state(): any;
        tagName(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        rows(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_row extends $mol_viewer {
        state(): any;
        heightMinimal(): number;
        tagName(): string;
        className(): string;
        id(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-id": () => any;
        };
        headerText(): string;
        header(next?: any): $mol_perf_uibench_table_cell;
        cells(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_cell extends $mol_viewer {
        tagName(): string;
        text(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-text": () => any;
        };
        eventClick(next?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any) => any;
        };
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim extends $mol_viewer {
        state(): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        items(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim_box extends $mol_viewer {
        id(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
            "data-id": () => any;
        };
        styleRadius(): string;
        styleColor(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.borderRadius": () => any;
            "style.background": () => any;
        };
        items(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree extends $mol_viewer {
        state(): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        stateRoot(): any;
        root(next?: any): $mol_perf_uibench_tree_branch;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_branch extends $mol_lister {
        state(): any;
        tagName(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_leaf extends $mol_viewer {
        heightMinimal(): number;
        tagName(): string;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "class": () => any;
        };
        text(): string;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_perf_uibench extends $.$mol_perf_uibench {
        state(next?: any): any;
        stateTable(): any;
        stateAnim(): any;
        stateTree(): any;
        page(): $mol_viewer;
    }
    class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {
        state(): {
            items: any[];
        };
        rows(): $mol_perf_uibench_table_row[];
        row(id: number): $mol_perf_uibench_table_row;
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
        eventClick(next?: Event): void;
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
        childs(): ($mol_perf_uibench_tree_leaf | $mol_perf_uibench_tree_branch)[];
        branch(i: number): $mol_perf_uibench_tree_branch;
        leaf(i: number): $mol_perf_uibench_tree_leaf;
    }
}
declare namespace $ {
    class $mol_portioner_demo extends $mol_rower {
        one(next?: any): $mol_portioner;
        two(next?: any): $mol_portioner;
        three(next?: any): $mol_portioner;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_scroller_demo extends $mol_scroller {
        one(next?: any): $mol_filler;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_scroller_demo_top extends $mol_scroller_demo {
        scrollTop(): number;
    }
}
declare namespace $ {
    class $mol_scroller_demo_middle extends $mol_scroller_demo {
        scrollTop(): number;
    }
}
declare namespace $ {
    class $mol_scroller_demo_bottom extends $mol_scroller_demo {
        scrollTop(): number;
    }
}
declare namespace $ {
    class $mol_sectioner_demo extends $mol_sectioner {
        head(): string;
        content(next?: any): $mol_filler;
    }
}
declare namespace $ {
    class $mol_stacker_demo extends $mol_stacker {
        mainContenter(next?: any): $mol_pager_demo;
        main(): any[];
        signup(next?: any): $mol_app_signup;
        addonContenter(next?: any): $mol_scroller;
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
    class $mol_suggester_demo extends $mol_rower {
        one(next?: any): $mol_suggester;
        twoHint(): string;
        suggest1(): string;
        suggest2(): string;
        suggest3(): string;
        suggest4(): string;
        suggest5(): string;
        two(next?: any): $mol_suggester;
        threeSuggests(): any[];
        threeCode(next?: any): any;
        three(next?: any): $mol_suggester;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_suggester_demo extends $.$mol_suggester_demo {
        threeSuggests(): any[];
    }
}
declare namespace $ {
    class $mol_switcher_demo_enabled extends $mol_switcher {
        color(next?: any): any;
        value(next?: any): any;
        options(): {} & {
            "red": () => any;
            "green": () => any;
            "blue": () => any;
        };
    }
}
declare namespace $ {
    class $mol_switcher_demo_disabled extends $mol_switcher {
        color(next?: any): any;
        value(next?: any): any;
        enabled(): boolean;
        optionRed(): string;
        optionGreen(): string;
        optionBlue(): string;
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
    class $mol_texter_demo extends $mol_texter {
        text(): string;
    }
}
declare namespace $ {
    class $mol_tree {
        type: string;
        data: string;
        childs: $mol_tree[];
        baseUri: string;
        row: number;
        col: number;
        constructor(config: {
            type?: string;
            value?: string;
            data?: string;
            childs?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        });
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config: {
            type?: string;
            value?: string;
            data?: string;
            childs?: $mol_tree[];
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
    function $mol_viewer_tree2ts(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}
