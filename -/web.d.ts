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
        cellerContent(id: {
            row: string[];
            col: string;
        }): any[];
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
        colSort(next?: string): any;
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
declare namespace $ {
    class $mol_rower extends $mol_viewer {
        minHeightStyle(): string;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "style.minHeight": () => any;
        };
    }
}
declare namespace $ {
    class $mol_rower_sub extends $mol_viewer {
    }
}
declare namespace $.$mol {
    class $mol_rower extends $.$mol_rower {
        itemOffsetsTop(): number[];
        childsVisible(): (string | number | boolean | Node | $mol_viewer)[];
        heightMinimal(): number;
        minHeightStyle(): string;
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
        titler(): $mol_linker;
        header(): $mol_viewer;
        widget(): any;
        screener(): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_demo extends $.$mol_demo {
        widget(): $mol_viewer;
        title(): string;
    }
}
declare namespace $ {
    class $mol_demo_small extends $mol_demo {
        heightMinimal(): number;
        widthMinimal(): number;
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
    class $mol_app_demo extends $mol_stacker {
        detailerTitle(): string;
        mainerContent(): any[];
        detailer(): $mol_app_demo_pager;
        main(): any[];
        titleAddon(): string;
        navigatorHierarchy(): any;
        navigatorOption(id: any): any;
        navigator(): $mol_app_demo_navigator;
        menu(): $mol_pager;
        addon(): any[];
        welcomeText(): string;
        welcomeTexter(): $mol_texter;
        welcomer(): $mol_scroller;
        samples(): any[];
        detailerRower(): $mol_rower;
        emptyDemoPrefix(): string;
        selected(): string;
        emptyDemoPostfix(): string;
        emptyDemoMessager(): $mol_statuser;
    }
}
declare namespace $ {
    class $mol_app_demo_pager extends $mol_pager {
        backer_icon(): $mol_icon_chevron;
        backArg(): {
            "demo": () => any;
        };
        backer(): $mol_linker;
        head(): any[];
    }
}
declare namespace $ {
    class $mol_app_demo_navigator extends $mol_grider {
        rowHeight(): number;
        hierarchyColumn(): string;
        header(): any;
        arg(id: any): {};
        expander(id: any): $mol_checker_expander;
        linker(id: any): $mol_linker;
    }
}
declare namespace $.$mol {
    class $mol_app_demo extends $.$mol_app_demo {
        title(): string;
        welcomeText(): string;
        namesDemo(): string[];
        navigatorHierarchy(): {
            [prefix: string]: $mol_grider_node;
        };
        navigatorOption(id: string): {
            title: string;
        };
        selected(): any;
        option(name: string): $mol_linker;
        widget(name: string): $mol_viewer;
        detailerTitle(): string;
        names(): string[];
        mainerContent(): $.$mol_statuser[] | $mol_demo_large[] | $.$mol_rower[];
        samples(): $mol_demo_small[];
        sampleSmall(name: string): $mol_demo_small;
        sampleLarge(name: string): $mol_demo_large;
    }
    class $mol_app_demo_navigator extends $.$mol_app_demo_navigator {
        celler(id: {
            row: string[];
            col: string;
        }): $mol_viewer;
        arg(id: {
            row: string[];
            col: string;
        }): {
            'demo': () => string;
        };
    }
}
declare namespace $ {
    class $mol_app_habhub extends $mol_pager {
        title(): string;
        gisters(): any[];
        statuser(): $mol_statuser;
        lister(): $mol_lister;
        body(): any[];
        gistContent(id: any): string;
        gister(id: any): $mol_texter;
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
        type(val?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "placeholder": () => any;
            "type": () => any;
        };
        disabled(): boolean;
        value(val?: any): any;
        valueChanged(val?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "disabled": () => any;
            "value": () => any;
        };
        eventChange(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (event?: any) => any;
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
        name(val?: any): any;
        namer(): $mol_stringer;
        greeting(): string;
        greeter(): $mol_viewer;
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
    class $mol_app_inventory extends $mol_viewer {
        domain(): $mol_app_inventory_domain;
        page(): any;
        childs(): any[];
        header(): $mol_app_inventory_header;
        enter(): $mol_app_inventory_enter;
        controller(): $mol_app_inventory_controller;
        keeper(): $mol_app_inventory_keeper;
        stats(): $mol_app_inventory_stats;
    }
}
declare namespace $ {
    class $mol_app_inventory_header extends $mol_rower {
        keeperLabel(): string;
        keeperLink(): $mol_linker;
        controlLabel(): string;
        controlLink(): $mol_linker;
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
        domain(): $mol_app_inventory_domain;
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
        value(val?: any): any;
        eventWheel(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "wheel": (val?: any) => any;
        };
        eventDec(val?: any): any;
        enabled(): boolean;
        enabledDec(): boolean;
        decIcon(): $mol_icon_minus;
        decrementer(): $mol_number_clicker;
        valueString(val?: any): any;
        hint(): string;
        enabledStringer(): boolean;
        stringer(): $mol_stringer;
        eventInc(val?: any): any;
        enabledInc(): boolean;
        incIcon(): $mol_icon_plus;
        incrementer(): $mol_number_clicker;
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
        optionChecked(id: any, val?: any): any;
        optionLabel(id: any): string;
        optioner(id: any): $mol_checker;
        value(val?: any): any;
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
        titler(): $mol_viewer;
        description(): string;
        descriptioner(): $mol_viewer;
        producter(): $mol_viewer;
        count(val?: any): any;
        counter(): $mol_number;
        status(val?: any): any;
        statusLabelPending(): string;
        statusLabelApproved(): string;
        statusLabelRejected(): string;
        statuser(): $mol_switcher;
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
        value(val?: any): any;
        format(): string;
        hint(): string;
        manualer(): $mol_stringer;
        eventScan(val?: any): any;
        labelScan(): string;
        scanner(): $mol_clicker;
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
        domain(): $mol_app_inventory_domain;
        positioners(): any[];
        body(): any[];
        position(id: any): any;
        positioner(id: any): $mol_app_inventory_positioner;
        newCode(val?: any): any;
        newCodeHint(): string;
        coder(): $mol_coder;
        eventSubmit(event?: any): any;
        submitLabel(): string;
        submitter(): $mol_clicker_major;
        coderRower(): $mol_rower;
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
        domain(): $mol_app_inventory_domain;
        positioners(): any[];
        body(): any[];
        position(id: any): any;
        positioner(id: any): $mol_app_inventory_positioner;
        eventSubmit(event?: any): any;
        submitLabel(): string;
        submitter(): $mol_clicker_major;
        controlsRower(): $mol_rower;
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
        barFields(): $mol_viewer;
        buttons(): any[];
        barButtons(): $mol_rower;
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
        namer(): $mol_viewer;
        errors(): any[];
        bider(): $mol_viewer;
        label(): $mol_viewer;
        control(): any;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_inventory_enter extends $mol_viewer {
        domain(): $mol_app_inventory_domain;
        entered(val?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_stringer;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_stringer;
        passwordField(): $mol_form_field;
        submitLabel(): string;
        eventSubmit(event?: any): any;
        submitBlocked(): boolean;
        submit(): $mol_clicker_major;
        form(): $mol_form;
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
        count1(val?: any): any;
        status1(val?: any): any;
        positioner1(): $mol_app_inventory_positioner;
        title2(): string;
        description2(): string;
        count2(val?: any): any;
        status2(val?: any): any;
        positioner2(): $mol_app_inventory_positioner;
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
        positioner1(): $mol_app_inventory_positioner;
        title2(): string;
        description2(): string;
        count2(val?: any): any;
        status2(val?: any): any;
        positioner2(): $mol_app_inventory_positioner;
        positioners(val?: any): any;
    }
}
declare namespace $ {
    class $mol_app_quine extends $mol_pager {
        content(): string;
        texter(): $mol_texter;
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
        descriptor(): $mol_viewer;
        headCells(): any[];
        headRower(): $mol_app_report_rower;
        rows(): any[];
        tabler(): $mol_app_report_tabler;
        body(): any[];
        rowerCells(id: any): any[];
        rower(id: any): $mol_app_report_rower;
        cellContent(id: any): any;
        cellRows(id: any): number;
        cellCols(id: any): number;
        celler(id: any): $mol_app_report_celler;
        cellValue(id: any, val?: any): any;
        texter(id: any): $mol_viewer;
        stringer(id: any): $mol_stringer;
        number(id: any): $mol_number;
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
        nameFirst(val?: any): any;
        nameFirstControl(): $mol_stringer;
        nameFirstField(): $mol_form_field;
        nameNickLabel(): string;
        nameNickErrors(): any[];
        nameNickHint(): string;
        nameNick(val?: any): any;
        nameNickControl(): $mol_stringer;
        nameNickField(): $mol_form_field;
        nameSecondLabel(): string;
        nameSecondErrors(): any[];
        nameSecondHint(): string;
        nameSecond(val?: any): any;
        nameSecondControl(): $mol_stringer;
        nameSecondField(): $mol_form_field;
        sexLabel(): string;
        sexErrors(): any[];
        sex(val?: any): any;
        sexOptionMale(): string;
        sexOptionIntersex(): string;
        sexOptionFemale(): string;
        sexOptions(): {
            "male": () => any;
            "intersex": () => any;
            "female": () => any;
        };
        sexControl(): $mol_switcher;
        sexField(): $mol_form_field;
        formFields(): any[];
        submitText(): string;
        eventSubmit(val?: any): any;
        submit(): $mol_clicker_major;
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
    class $mol_app_signup_demo extends $mol_app_signup {
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
        contenter(): $mol_viewer;
        statusText(): string;
        statuser(): $mol_viewer;
        rowers(): any[];
    }
}
declare namespace $ {
    class $mol_labeler extends $mol_viewer {
        tagName(): string;
        titler(): $mol_viewer;
        content(): any;
        contenter(): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_coster extends $mol_viewer {
        value(): any;
        prefix(): string;
        prefixer(): $mol_viewer;
        valueView(): string;
        mainer(): $mol_viewer;
        postfix(): string;
        postfixer(): $mol_viewer;
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
        arg(): {};
        linker(): $mol_linker;
        childs(): any[];
        codeTitle(): string;
        code(): string;
        codeItem(): $mol_labeler;
        costTitle(): string;
        cost(): $mol_unit_money;
        coster(): $mol_coster;
        costItem(): $mol_labeler;
        providerTitle(): string;
        providerName(): string;
        providerItem(): $mol_labeler;
        items(): any[];
        grouper(): $mol_rower;
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
        cost(): $mol_unit_money_usd;
        status(): string;
        arg(): {} & {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_carder_demo_approved extends $mol_app_supplies_carder {
        code(): string;
        providerName(): string;
        cost(): $mol_unit_money_rur;
        status(): string;
        arg(): {} & {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_carder_demo_selected extends $mol_app_supplies_carder {
        code(): string;
        providerName(): string;
        cost(): $mol_unit_money_usd;
        status(): string;
        arg(): {} & {
            "supply": () => any;
        };
    }
}
declare namespace $ {
    class $mol_app_supplies_enter extends $mol_viewer {
        entered(val?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_stringer;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_stringer;
        passwordField(): $mol_form_field;
        submitLabel(): string;
        eventSubmit(val?: any): any;
        submitBlocked(): boolean;
        submit(): $mol_clicker_major;
        form(): $mol_form;
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
        searchQuery(val?: any): any;
        searcher(): $mol_coder;
        searchPanel(): $mol_rower;
        childs(): any[];
        supplyRows(): any[];
        lister(): $mol_lister;
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
        current(val?: any): any;
        switcherOptions(): {};
        switcher(): $mol_switcher;
        content(): any;
        rowers(): any[];
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
        items(val?: any): any;
        attachNew(val?: any): any;
        adder(): $mol_attacher_adder;
        content(): any[];
        contenter(): $mol_tiler;
    }
}
declare namespace $ {
    class $mol_attacher_item extends $mol_linker {
        urlThumb(val?: any): any;
        urlLoad(val?: any): any;
        uri(val?: any): any;
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
        fileNew(val?: any): any;
        icon(): $mol_icon_attach;
        eventCapture(val?: any): any;
        eventPicked(val?: any): any;
        input(): $mol_attacher_adder_input;
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
        eventCapture(val?: any): any;
        eventClick(val?: any): any;
        eventPicked(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "change": (val?: any) => any;
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
        header(): $mol_viewer;
        content(): any;
        rowers(): any[];
    }
}
declare namespace $ {
    class $mol_app_supplies_positioner extends $mol_carder {
        heightMinimal(): number;
        productLabel(): string;
        productName(): string;
        productItem(): $mol_labeler;
        costlabel(): string;
        cost(): $mol_unit_money;
        coster(): $mol_coster;
        costItem(): $mol_labeler;
        mainGroup(): $mol_rower;
        divisionLabel(): string;
        divisionName(): string;
        divisionItem(): $mol_labeler;
        priceLabel(): string;
        price(): $mol_unit_money;
        pricer(): $mol_coster;
        priceItem(): $mol_labeler;
        addonGroup(): $mol_rower;
        quantityLabel(): string;
        quantity(): string;
        quantityItem(): $mol_labeler;
        supplyDateLabel(): string;
        supplyDate(): string;
        supplyDateItem(): $mol_labeler;
        storeLabel(): string;
        storeName(): string;
        storeItem(): $mol_labeler;
        supplyGroup(): $mol_rower;
        grouper(): $mol_viewer;
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
        backer_icon(): $mol_icon_chevron;
        backArg(): {
            "side": () => any;
            "supply": () => any;
        };
        backer(): $mol_linker;
        head(): any[];
        orgLabel(): string;
        providerLabel(): string;
        providerName(): string;
        providerItem(): $mol_labeler;
        customerLabel(): string;
        consumerName(): string;
        consumerItem(): $mol_labeler;
        supplyGroupLabel(): string;
        supplyGroupName(): string;
        supplyGroupItem(): $mol_labeler;
        ballanceUnitLabel(): string;
        ballanceUnitName(): string;
        ballanceUnitItem(): $mol_labeler;
        orgItems(): any[];
        orgContent(): $mol_rower;
        orgItem(): $mol_decker_item;
        consLabel(): string;
        contractLabel(): string;
        contractId(): string;
        contractItem(): $mol_labeler;
        payMethodLabel(): string;
        payMethodName(): string;
        payMethodItem(): $mol_labeler;
        managerLabel(): string;
        managerName(): string;
        managerItem(): $mol_labeler;
        debitodLabel(): string;
        debitorName(): string;
        debitorItem(): $mol_labeler;
        consItems(): any[];
        consContent(): $mol_rower;
        consItem(): $mol_decker_item;
        descrDecker(): $mol_decker;
        descrCarder(): $mol_carder;
        attachTitle(): string;
        attachments(): any[];
        attachNew(val?: any): any;
        attacher(): $mol_attacher;
        attachCarder(): $mol_sectioner;
        positionsTitle(): string;
        costLabel(): string;
        cost(): $mol_unit_money;
        coster(): $mol_coster;
        costItem(): $mol_labeler;
        posListerHead(): any[];
        positions(): any[];
        posLister(): $mol_sectioner;
        content(): any[];
        contenter(): $mol_lister;
        lister(): $mol_lister;
        body(): any[];
        approved(val?: any): any;
        approvedLabel(): string;
        approver(): $mol_checker_ticker;
        tools(): any[];
        controller(): $mol_rower;
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
        entered(val?: any): any;
        enter(): $mol_app_supplies_enter;
        supplies(): any[];
        searchQuery(val?: any): any;
        lister(): $mol_app_supplies_lister;
        supply(): any;
        detailer(): $mol_app_supplies_detailer;
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
        price(): $mol_unit_money_usd;
        quantity(): string;
        cost(): $mol_unit_money_usd;
        supplyDate(): string;
        divisionName(): string;
        storeName(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detailer_demo extends $mol_app_supplies_detailer {
        title(): string;
        approved(val?: any): any;
        providerName(): string;
        cost(): $mol_unit_money_rur;
        consumerName(): string;
        supplyGroupName(): string;
        ballanceUnitName(): string;
        contractId(): string;
        payMethodName(): string;
        managerName(): string;
        debitorName(): string;
        pos1(): $mol_app_supplies_positioner_demo;
        pos2(): $mol_app_supplies_positioner_demo;
        pos3(): $mol_app_supplies_positioner_demo;
        pos4(): $mol_app_supplies_positioner_demo;
        pos5(): $mol_app_supplies_positioner_demo;
        positions(): any[];
        attachments(): any[];
    }
}
declare namespace $ {
    class $mol_app_taxon extends $mol_pager {
        hierarchy(): any;
        hierarchyField(): string;
        record(id: any): any;
        grider(): $mol_grider;
        bodier(): $mol_grider;
    }
}
declare namespace $.$mol {
    interface $mol_app_taxon_data_row {
        KeyId: number;
    }
    class $mol_app_taxon extends $.$mol_app_taxon {
        hierarchyUri(): string;
        hierarchy(): {
            [key: string]: $mol_grider_node;
        };
        dataUri(): string;
        dataResource(id: string): $mol_http_resource_json<any>;
        dataTable(): {
            [id: string]: $mol_app_taxon_data_row;
        };
        record(id: string): $mol_app_taxon_data_row;
    }
}
declare namespace $ {
    class $mol_app_taxon_demo extends $mol_app_taxon {
        hierarchyField(): string;
    }
}
declare namespace $.$mol {
    class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
        hierarchy(): {
            [key: string]: $mol_grider_node;
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
    class $mol_app_todomvc extends $mol_scroller {
        title(): string;
        titler(): $mol_viewer;
        allCompleterEnabled(): boolean;
        allCompleted(val?: any): any;
        allCompleter(): $mol_checker;
        taskNewTitle(val?: any): any;
        eventAdd(event?: any): any;
        adder(): $mol_app_todomvc_adder;
        headerContent(): any[];
        header(): $mol_viewer;
        taskers(): any[];
        lister(): $mol_lister;
        pendingMessage(): string;
        pendinger(): $mol_viewer;
        filterAllLabel(): string;
        filterAll(): $mol_linker;
        filterActiveLabel(): string;
        filterActive(): $mol_linker;
        filterCompletedLabel(): string;
        filterCompleted(): $mol_linker;
        filterOptions(): any[];
        filter(): $mol_barer;
        sanitizerEnabled(): boolean;
        eventSanitize(event?: any): any;
        sanitizerLabel(): string;
        sanitizer(): $mol_clicker_minor;
        footerContent(): any[];
        footer(): $mol_viewer;
        panels(): any[];
        paneler(): $mol_lister;
        pager(): $mol_lister;
        childs(): any[];
        taskCompleted(id: any, val?: any): any;
        taskTitle(id: any, val?: any): any;
        eventTaskDrop(id: any, event?: any): any;
        tasker(id: any): $mol_app_todomvc_tasker;
    }
}
declare namespace $ {
    class $mol_app_todomvc_adder extends $mol_stringer {
        hint(): string;
        eventPress(event?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (event?: any) => any;
        } & {
            "keyup": (event?: any) => any;
        };
        eventDone(event?: any): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_tasker extends $mol_viewer {
        heightMinimal(): number;
        completed(val?: any): any;
        completer(): $mol_checker;
        titleHint(): string;
        title(val?: any): any;
        titler(): $mol_stringer;
        eventDrop(event?: any): any;
        dropper(): $mol_clicker;
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
        query(val?: any): any;
        filter(): $mol_stringer;
        userRows(): any[];
        lister(): $mol_lister;
        body(): any[];
        bodier(): $mol_scroller;
        reloadLabel(): string;
        eventReload(val?: any): any;
        reloader(): $mol_clicker_minor;
        loaded(): boolean;
        addLabel(): string;
        eventAdd(val?: any): any;
        adder(): $mol_clicker_minor;
        changed(): boolean;
        saveLabel(): string;
        eventSave(val?: any): any;
        saver(): $mol_clicker_major;
        saverResult(): any;
        messager(): $mol_statuser;
        controller(): $mol_rower;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_app_users_item extends $mol_rower {
        heightMinimal(): number;
        title(val?: any): any;
        titler(): $mol_stringer;
        dropLabel(): string;
        eventDrop(val?: any): any;
        dropper(): $mol_clicker_minor;
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
    class $mol_attacher_demo_empty extends $mol_attacher {
    }
}
declare namespace $ {
    class $mol_attacher_demo_filled extends $mol_attacher {
        item0(): $mol_attacher_item;
        item1(): $mol_attacher_item;
        item2(): $mol_attacher_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_barer_demo_search extends $mol_barer {
        value(val?: any): any;
        stringer(): $mol_stringer;
        submitter(): $mol_clicker;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_barer_demo_login extends $mol_barer {
        value(val?: any): any;
        stringer(): $mol_stringer;
        rememberer(): $mol_checker_ticker;
        submitter(): $mol_clicker;
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
    class $mol_carder_demo_status extends $mol_carder {
        content(): $mol_rower;
        status(): string;
    }
}
declare namespace $ {
    class $mol_carder_demo_hello extends $mol_carder {
        content(): $mol_rower;
    }
}
declare namespace $ {
    class $mol_checker_expander_demo_labeled_base extends $mol_checker_expander {
        c1Label(): string;
        label(): any[];
    }
}
declare namespace $ {
    class $mol_checker_expander_demo_labeled_expanded extends $mol_checker_expander {
        c2Label(): string;
        label(): any[];
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_expander_demo_empty_base extends $mol_checker_expander {
    }
}
declare namespace $ {
    class $mol_checker_expander_demo_empty_expanded extends $mol_checker_expander {
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_expander_demo_disabled extends $mol_checker_expander {
        c5Label(): string;
        label(): any[];
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_labeled_base extends $mol_checker_ticker {
        c1Label(): string;
        label(): any[];
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_labeled_checked extends $mol_checker_ticker {
        c2Label(): string;
        label(): any[];
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_labeled_disabled extends $mol_checker_ticker {
        c6Label(): string;
        label(): any[];
        checked(): boolean;
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_alone_base extends $mol_checker_ticker {
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_alone_checked extends $mol_checker_ticker {
        checked(): boolean;
    }
}
declare namespace $ {
    class $mol_checker_ticker_demo_alone_disabled extends $mol_checker_ticker {
        checked(): boolean;
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_clicker_demo_major_enabled extends $mol_clicker_major {
        label(): string;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_clicker_demo_minor_enabled extends $mol_clicker_minor {
        label(): string;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_clicker_demo_major_disabled extends $mol_clicker_major {
        label(): string;
        childs(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_clicker_demo_minor_disabled extends $mol_clicker_minor {
        label(): string;
        childs(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_clicker_demo_danger_enabled extends $mol_clicker_danger {
        label(): string;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_clicker_demo_danger_disabled extends $mol_clicker_danger {
        label(): string;
        childs(): any[];
        enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_coder_demo_qr extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_dataMatrix extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_upc_e extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_upc_a extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_ean_8 extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_ean_13 extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_code_128 extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_code_39 extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    class $mol_coder_demo_itf extends $mol_coder {
        format(): string;
    }
}
declare namespace $ {
    function $mol_csv_parse(text: string, delimiter?: string): {
        [key: string]: any;
    }[];
}
declare namespace $ {
    class $mol_decker_demo extends $mol_decker {
        greeterLabel(): string;
        greeterMessage(): string;
        greeterMessager(): $mol_viewer;
        greeterContent(): $mol_rower;
        greeterItem(): $mol_decker_item;
        questerLabel(): string;
        questerMessage(): string;
        questerMessager(): $mol_viewer;
        questerContent(): $mol_rower;
        questerItem(): $mol_decker_item;
        commanderLabel(): string;
        commanderMessage(): string;
        commanderMessager(): $mol_viewer;
        commanderContent(): $mol_rower;
        commanderItem(): $mol_decker_item;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_demo_all extends $mol_viewer {
        name(): string;
        mediumLabel(): string;
        medium(): $mol_demo_medium;
        smallLabel(): string;
        small(): $mol_demo_small;
        largeLabel(): string;
        large(): $mol_demo_large;
        childs(): any[];
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
    class $mol_dimmer_demo extends $mol_rower {
        one(): $mol_dimmer;
        two(): $mol_dimmer;
        three(): $mol_dimmer;
        four(): $mol_dimmer;
        five(): $mol_dimmer;
        six(): $mol_dimmer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_expander extends $mol_lister {
        expanded(val?: any): any;
        label(): any[];
        labeler(): $mol_checker_expander;
        content(): any;
        rowers(): any[];
    }
}
declare namespace $.$mol {
    class $mol_expander extends $.$mol_expander {
        rowers(): any[];
    }
}
declare namespace $ {
    class $mol_filler extends $mol_viewer {
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_expander_demo extends $mol_scroller {
        expander(): $mol_expander;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_floater_demo extends $mol_scroller {
        floaterContent(): $mol_carder_demo_hello;
        floater(): $mol_floater;
        filler1(): $mol_filler;
        filler2(): $mol_filler;
        contenter(): $mol_rower;
        content(): any[];
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_form_demo extends $mol_form {
        loginLabel(): string;
        loginErrors(): any[];
        login(val?: any): any;
        loginControl(): $mol_stringer;
        loginField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(val?: any): any;
        passControl(): $mol_stringer;
        passwordField(): $mol_form_field;
        formFields(): any[];
        submitText(): string;
        eventSubmit(val?: any): any;
        submit(): $mol_clicker_major;
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
        userName(val?: any): any;
        content(): $mol_stringer;
    }
}
declare namespace $ {
    class $mol_linker_demo extends $mol_rower {
        labelRed(): string;
        linkRed(): $mol_linker;
        labelGreen(): string;
        linkGreen(): $mol_linker;
        labelBlue(): string;
        linkBlue(): $mol_linker;
        linkExternal(): $mol_linker;
        childs(): any[];
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
        rower(id: any): $mol_suggester_rower;
        value(val?: any): any;
        hint(): string;
        stringer(): $mol_stringer;
        suggestRows(): any[];
        lister(): $mol_lister;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_suggester_rower extends $mol_clicker {
        tagName(): string;
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
            "mol_suggester_selected": () => any;
        };
        heightMinimal(): number;
        text(): string;
        prefix(): string;
        dimmer(): $mol_dimmer;
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
        title(val?: any): any;
        suggest1(): string;
        suggest2(): string;
        titler(): $mol_suggester;
        countHint(): string;
        count(val?: any): any;
        counter(): $mol_number;
        progress(): number;
        progresser(): $mol_portioner;
        publishLabel(): string;
        publish(val?: any): any;
        publisher(): $mol_checker_ticker;
        dropLabel(): string;
        eventLog(val?: any): any;
        buttonDrop(): $mol_clicker_minor;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_rower_demo extends $.$mol_rower_demo {
        eventLog(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_lister_demo extends $mol_scroller {
        rowers(): any[];
        lister(): $mol_lister;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_lister_demo extends $.$mol_lister_demo {
        rowers(): $mol_viewer[];
        rower(id: number): $mol_rower_demo;
    }
}
declare namespace $ {
    function $mol_maybe<Value>(value: Value): Value[];
}
declare namespace $ {
    class $mol_number_demo extends $mol_rower {
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
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_pager_demo extends $mol_pager {
        title(): string;
        signup(): $mol_app_signup;
        body(): any[];
        rower(): $mol_rower_demo;
        foot(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render extends $mol_viewer {
        title(): string;
        titler(): $mol_viewer;
        runnerLabel(): string;
        eventRun(val?: any): any;
        runner(): $mol_clicker_major;
        head(): any[];
        header(): $mol_viewer;
        rowers(): any[];
        lister(): $mol_lister;
        contenter(): $mol_scroller;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render_row extends $mol_viewer {
        selected(val?: any): any;
        heightMinimal(): number;
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
        bar(): $mol_viewer;
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
        rowers(): $mol_perf_render_row[];
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
        table(): $mol_perf_uibench_table;
        stateAnim(): any;
        anim(): $mol_perf_uibench_anim;
        stateTree(): any;
        tree(): $mol_perf_uibench_tree;
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
        header(): $mol_perf_uibench_table_cell;
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
        eventClick(val?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (val?: any) => any;
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
        root(): $mol_perf_uibench_tree_branch;
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
        rowers(): $mol_perf_uibench_table_row[];
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
    class $mol_portioner_demo_empty extends $mol_portioner {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_portioner_demo_partial extends $mol_portioner {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_portioner_demo_full extends $mol_portioner {
        portion(): number;
    }
}
declare namespace $ {
    class $mol_scroller_demo extends $mol_scroller {
        one(): $mol_filler;
        two(): $mol_filler;
        tree(): $mol_filler;
        rower(): $mol_rower;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_sectioner_demo extends $mol_scroller {
        one(): $mol_filler;
        two(): $mol_filler;
        three(): $mol_filler;
        sectioner(): $mol_sectioner;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_stacker_demo extends $mol_stacker {
        mainContenter(): $mol_pager_demo;
        main(): any[];
        signup(): $mol_app_signup;
        addonContenter(): $mol_scroller;
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
    class $mol_stringer_demo extends $mol_rower {
        name(val?: any): any;
        one(): $mol_stringer;
        twoHint(): string;
        two(): $mol_stringer;
        threeHint(): string;
        three(): $mol_stringer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_stringer_demo extends $.$mol_stringer_demo {
        name(next?: string): string;
    }
}
declare namespace $ {
    class $mol_suggester_demo extends $mol_rower {
        one(): $mol_suggester;
        twoHint(): string;
        suggest1(): string;
        suggest2(): string;
        suggest3(): string;
        suggest4(): string;
        suggest5(): string;
        two(): $mol_suggester;
        threeSuggests(): any[];
        threeCode(val?: any): any;
        three(): $mol_suggester;
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
        color(val?: any): any;
        value(val?: any): any;
        options(): {} & {
            "red": () => any;
            "green": () => any;
            "blue": () => any;
        };
    }
}
declare namespace $ {
    class $mol_switcher_demo_disabled extends $mol_switcher {
        color(val?: any): any;
        value(val?: any): any;
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
    class $mol_texter_demo extends $mol_scroller {
        texter(): $mol_texter;
        childs(): any[];
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
