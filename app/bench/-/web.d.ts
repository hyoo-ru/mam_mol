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
    let $mol_viewer_context: $mol_viewer_context;
    interface $mol_viewer_context {
        $mol_viewer_visibleWidth(): number;
        $mol_viewer_visibleHeight(): number;
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
        widthMinimal(): number;
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
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    class $mol_scroller extends $mol_viewer {
        heightMinimal(): number;
        scrollTop(val?: any): any;
        scrollLeft(val?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "scrollTop": (val?: any) => any;
            "scrollLeft": (val?: any) => any;
        };
        eventScroll(event?: any): any;
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
    interface $mol_viewer_context {
        $mol_scroller_scrollTop(): number;
        $mol_scroller_scrollLeft(): number;
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
    class $mol_pager extends $mol_viewer {
        titler(): $mol_viewer;
        head(): any[];
        header(): $mol_viewer;
        body(): any[];
        bodier(): $mol_scroller;
        foot(): any[];
        footer(): $mol_viewer;
        childs(): any[];
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
    class $mol_stacker extends $mol_viewer {
        side(): boolean;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_stacker_side": () => any;
        };
        main(): any[];
        mainer(): $mol_viewer;
        addon(): any[];
        addoner(): $mol_viewer;
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
        rowers(): any[];
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_lister extends $.$mol_lister {
        rowerOffsets(): number[];
        rowerContext(index: number): $mol_viewer_context;
        childsVisible(): any[];
        heightMinimal(): number;
        minHeightStyle(): string;
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
        enabled(): boolean;
        eventClick(event?: any): any;
        eventActivate(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (event?: any) => any;
        };
        disabled(): boolean;
        tabIndex(): string;
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
    class $mol_clicker extends $.$mol_clicker {
        disabled(): boolean;
        eventActivate(next: Event): void;
        tabIndex(): string;
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
        checked(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "role": () => any;
            "tabindex": () => any;
        } & {
            "mol_checker_checked": () => any;
        };
        icon(): any;
        label(): any[];
        labeler(): $mol_viewer;
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
        pather(): $mol_svg_path;
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
        icon(): $mol_icon_chevron;
        level(): number;
        levelStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.paddingLeft": () => any;
        };
        expanded(val?: any): any;
        checked(val?: any): any;
        expandable(): boolean;
        enabled(): boolean;
    }
}
declare namespace $.$mol {
    class $mol_checker_expander extends $.$mol_checker_expander {
        levelStyle(): string;
        expandable(): boolean;
    }
}
declare namespace $ {
    class $mol_dimmer extends $mol_viewer {
        haystack(): string;
        needle(): string;
        parts(): any[];
        childs(): any[];
        string(id: any): string;
        low(id: any): $mol_dimmer_low;
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
        strings(): string[];
        string(index: number): string;
    }
}
declare namespace $ {
    class $mol_grider extends $mol_scroller {
        rows(): any[];
        row(id: any): any;
        cols(): any[];
        records(): any[];
        record(id: any): any;
        hierarchy(): any;
        hierarchyColumn(): string;
        fieldId(): string;
        fieldParent(): string;
        rowersVisible(): any[];
        tabler(): $mol_viewer;
        childs(): any[];
        rowers(): any[];
        rowHeight(): number;
        headerCellers(): any[];
        header(): $mol_grider_rower;
        gapTop(): number;
        gaperTop(): $mol_grider_gaper;
        gapBottom(): number;
        gaperBottom(): $mol_grider_gaper;
        cellers(id: any): any[];
        rower(id: any): $mol_grider_rower;
        celler(id: any): any;
        cellerContent(id: any): any[];
        cellerContentText(id: any): any[];
        cellerText(id: any): $mol_grider_celler;
        cellerContentNumber(id: any): any[];
        cellerNumber(id: any): $mol_grider_number;
        columnHeaderContent(id: any): any[];
        columnHeader(id: any): $mol_floater;
        cellerLevel(id: any): number;
        cellerExpanded(id: any, val?: any): any;
        cellerBranch(id: any): $mol_checker_expander;
        needle(): string;
        cellerValue(id: any): string;
        cellerDimmer(id: any): $mol_dimmer;
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
declare namespace $.$mol {
    interface $mol_grider_node {
        id: string;
        parent: $mol_grider_node;
        childs: $mol_grider_node[];
    }
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
        cellers(row: string[]): $mol_viewer[];
        colType(col: string): "text" | "branch" | "number";
        celler(id: {
            row: string[];
            col: string;
        }): $mol_viewer;
        cellerValue(id: {
            row: string[];
            col: string;
        }): any;
        records(): any;
        record(id: string): any;
        ids(): string[];
        row(index: number): string;
        cols(): string[];
        hierarchy(): {
            [id: string]: $mol_grider_node;
        };
        rowsSub(row: string[]): string[][];
        rowRoot(): string[];
        cellerLevel(id: {
            row: string[];
        }): number;
        rows(): string[][];
        rowExpanded(row: string[], next?: boolean): boolean;
        cellerExpanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
    class $mol_grider_gaper extends $.$mol_grider_gaper {
        heightStyle(): string;
    }
    class $mol_grider_rower extends $.$mol_grider_rower {
        heightStyle(): string;
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
        blockContent(id: any): any[];
        blockType(id: any): string;
        rower(id: any): $mol_texter_rower;
        spanner(id: any): $mol_texter_spanner;
        linker(id: any): $mol_texter_linker;
        imager(id: any): $mol_texter_imager;
        headerLevel(id: any): number;
        headerContent(id: any): any[];
        header(id: any): $mol_texter_header;
        tablerHeaderCellers(id: any): any[];
        tablerRowers(id: any): any[];
        tabler(id: any): $mol_grider;
        tablerCellers(id: any): any[];
        tablerRower(id: any): $mol_grider_rower;
        tablerCellerContent(id: any): any[];
        tablerCeller(id: any): $mol_grider_celler;
        tablerCellerHeader(id: any): $mol_floater;
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
        level(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_header_level": () => any;
        };
        content(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_texter_spanner extends $mol_viewer {
        tagName(): string;
        type(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": () => any;
        };
        content(val?: any): any;
        childs(): any;
    }
}
declare namespace $ {
    class $mol_texter_linker extends $mol_viewer {
        tagName(): string;
        type(val?: any): any;
        link(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": () => any;
            "href": () => any;
        };
        content(val?: any): any;
        childs(): any;
    }
}
declare namespace $ {
    class $mol_texter_imager extends $mol_viewer {
        tagName(): string;
        type(val?: any): any;
        link(val?: any): any;
        title(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_texter_type": () => any;
            "src": () => any;
            "alt": () => any;
        };
    }
}
declare namespace $.$mol {
    class $mol_texter extends $.$mol_texter {
        tokensFlow(): $mol_syntax_token[];
        rowers(): ($.$mol_grider | $mol_texter_rower | $mol_texter_header)[];
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
        indicator(): $mol_portioner_indicator;
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
        colSort(val?: any): any;
        eventSortToggle(id: any, val?: any): any;
        columnHeaderLabel(id: any): any[];
        columnHeaderSorter(id: any): $mol_icon_sort_asc;
        columnHeaderContent(id: any): any[];
        columnHeader(id: any): $mol_bencher_header;
        resultValue(id: any): string;
        resultPortion(id: any): number;
        resultPortioner(id: any): $mol_portioner;
        cellerContentNumber(id: any): any[];
    }
}
declare namespace $ {
    class $mol_bencher_header extends $mol_floater {
        eventClick(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (val?: any) => any;
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
        colSort(next?: string): string;
        resultsSorted(): any;
        resultValue(id: {
            row: string[];
            col: string;
        }): any;
        resultNumber(id: {
            row: string[];
            col: string;
        }): number;
        resultMaxValue(col: string): number;
        resultPortion(id: {
            row: string[];
            col: string;
        }): number;
        columnHeaderLabel(col: string): string[];
        eventSortToggle(col: string, next?: Event): void;
        colType(col: string): "text" | "branch" | "number";
        cellerContentNumber(id: {
            row: string[];
            col: string;
        }): any[];
        columnHeaderContent(col: string): any[];
    }
}
declare namespace $ {
    class $mol_icon_tick extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_checker_ticker extends $mol_checker {
        icon(): $mol_icon_tick;
    }
}
declare namespace $ {
    class $mol_app_bench extends $mol_stacker {
        description(): string;
        descriptioner(): $mol_texter;
        results(): any;
        columnHeaderLabel(id: any): any[];
        resultsColSort(val?: any): any;
        resulter(): $mol_bencher;
        informator(): $mol_viewer;
        tester(): $mol_app_bench_tester;
        mainPage(): $mol_pager;
        main(): any[];
        addonerTitle(): string;
        menuOptions(): any[];
        menu(): $mol_lister;
        addonPage(): $mol_pager;
        addon(): any[];
        menuOptionerChecked(id: any, val?: any): any;
        menuOptionerTitle(id: any): string;
        menuOptioner(id: any): $mol_checker_ticker;
        columnHeaderLabelSample(): string;
    }
}
declare namespace $ {
    class $mol_app_bench_tester extends $mol_viewer {
        tagName(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_bench extends $.$mol_app_bench {
        bench(next?: string): string;
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
        resultsColSort(next?: string): string;
        menuOptions(): $mol_checker_ticker[];
        menuOptionerTitle(sample: string): string;
        menuOptionerChecked(sample: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_bench_demo extends $mol_app_bench {
        bench(): string;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol extends $mol_scroller {
        sample(): string;
        header(): $mol_viewer;
        rowers(): any[];
        lister(): $mol_lister;
        childs(): any[];
        rowerSelected(id: any, val?: any): any;
        rowerTitle(id: any): string;
        rowerContent(id: any): string;
        rower(id: any): $mol_app_bench_list_mol_rower;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol_rower extends $mol_viewer {
        selected(val?: any): any;
        heightMinimal(): number;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "mol_app_bench_list_mol_rower_selected": () => any;
        };
        eventToggle(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (event?: any) => any;
        };
        title(): string;
        titler(): $mol_viewer;
        content(): string;
        contenter(): $mol_viewer;
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
