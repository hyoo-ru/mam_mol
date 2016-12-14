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
    class $mol_labeler extends $mol_viewer {
        titler(next?: any): $mol_viewer;
        content(): any;
        contenter(next?: any): $mol_viewer;
        childs(): any[];
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
    class $mol_rower extends $mol_viewer {
    }
}
declare namespace $ {
    class $mol_rower_sub extends $mol_viewer {
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
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
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
        supplyId(next?: string): string;
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
