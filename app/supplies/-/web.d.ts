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
        handler: (next?: Value | Error, prev?: Value | Error) => Value;
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
        constructor(handler: (next?: Value | Error, prev?: Value | Error) => Value, host?: {
            objectPath(): string;
            [key: string]: any;
        }, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        objectPath(): string;
        get(): Value;
        actualize(): void;
        pull(): any;
        _next: Value;
        set(next: Value, prev?: Value | Error): Value;
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
        value(next?: Value, prev?: Value): Error | Value;
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
    function $mol_atom_task<Value>(handler: () => Value): $mol_atom<any>;
}
declare namespace $ {
    function $mol_mem<Host extends {
        objectPath(): string;
    }, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, prev?: Value) => Value>) => void;
    function $mol_mem_key<Host extends {
        objectPath(): string;
    }, Key, Value>(config?: {
        lazy?: boolean;
    }): (obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, prev?: Value) => Value>) => void;
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
        static value<Value>(key: string, next?: Value, prev?: Value): any;
        prefix(): string;
        value(key: string, next?: Value): any;
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
        response(next?: any, prev?: any): any;
        text(next?: string): string;
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
        request(fresh?: boolean): $mol_http_request;
        text(next?: string, prev?: string): string;
        refresh(): void;
    }
    class $mol_http_resource_json<Content> extends $mol_http_resource {
        static item<Content>(uri: string): $mol_http_resource_json<Content>;
        json(next?: Content, prev?: Content): Content;
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
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static value(key: string, next?: string, prev?: string): string;
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
        contenter(next?: any, prev?: any): $mol_viewer;
        statusText(): string;
        statuser(next?: any, prev?: any): $mol_viewer;
        rows(): any[];
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
    class $mol_labeler extends $mol_viewer {
        titler(next?: any, prev?: any): $mol_viewer;
        content(): any;
        contenter(next?: any, prev?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_coster extends $mol_viewer {
        value(): any;
        prefix(): string;
        prefixer(next?: any, prev?: any): $mol_viewer;
        valueView(): string;
        mainer(next?: any, prev?: any): $mol_viewer;
        postfix(): string;
        postfixer(next?: any, prev?: any): $mol_viewer;
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
declare namespace $.$mol {
    class $mol_coster extends $.$mol_coster {
        value(): $mol_unit_money;
        prefix(): string;
        valueView(): string;
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
        status(next?: $mol_app_supplies_domain_supply_status, prev?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
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
        attachments(id: string, next?: $mol_app_supplies_domain_attachment[], prev?: $mol_app_supplies_domain_attachment[]): $mol_app_supplies_domain_attachment[];
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
        linker(next?: any, prev?: any): $mol_linker;
        childs(): any[];
        codeTitle(): string;
        code(): string;
        codeItem(next?: any, prev?: any): $mol_labeler;
        costTitle(): string;
        cost(next?: any, prev?: any): $mol_unit_money;
        coster(next?: any, prev?: any): $mol_coster;
        costItem(next?: any, prev?: any): $mol_labeler;
        providerTitle(): string;
        providerName(): string;
        providerItem(next?: any, prev?: any): $mol_labeler;
        items(): any[];
        grouper(next?: any, prev?: any): $mol_rower;
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
        cost(next?: any, prev?: any): $mol_unit_money_usd;
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
        cost(next?: any, prev?: any): $mol_unit_money_rur;
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
        cost(next?: any, prev?: any): $mol_unit_money_usd;
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
        mainer(next?: any, prev?: any): $mol_viewer;
        addon(): any[];
        addoner(next?: any, prev?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_stacker extends $.$mol_stacker {
        side(next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_form extends $mol_viewer {
        submitBlocked(): boolean;
        formFields(): any[];
        barFields(next?: any, prev?: any): $mol_viewer;
        buttons(): any[];
        barButtons(next?: any, prev?: any): $mol_rower;
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
        namer(next?: any, prev?: any): $mol_viewer;
        errors(): any[];
        errorer(next?: any, prev?: any): $mol_viewer;
        label(next?: any, prev?: any): $mol_viewer;
        control(): any;
        childs(): any[];
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
        value(next?: any, prev?: any): any;
        valueChanged(next?: any, prev?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "disabled": () => any;
            "value": () => any;
        };
        eventChange(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "input": (next?: any, prev?: any) => any;
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
    class $mol_clicker extends $mol_viewer {
        tagName(): string;
        enabled(): boolean;
        eventClick(next?: any, prev?: any): any;
        eventActivate(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "click": (next?: any, prev?: any) => any;
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
        entered(next?: any, prev?: any): any;
        loginLabel(): string;
        loginErrors(): any[];
        login(next?: any, prev?: any): any;
        loginControl(next?: any, prev?: any): $mol_stringer;
        loginField(next?: any, prev?: any): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        password(next?: any, prev?: any): any;
        passControl(next?: any, prev?: any): $mol_stringer;
        passwordField(next?: any, prev?: any): $mol_form_field;
        submitLabel(): string;
        eventSubmit(next?: any, prev?: any): any;
        submitBlocked(): boolean;
        submit(next?: any, prev?: any): $mol_clicker_major;
        form(next?: any, prev?: any): $mol_form;
        childs(): any[];
    }
}
declare namespace $.$mol {
    class $mol_app_supplies_enter extends $.$mol_app_supplies_enter {
        eventSubmit(): void;
    }
}
declare namespace $ {
    class $mol_scroller extends $mol_viewer {
        heightMinimal(): number;
        scrollTop(next?: any, prev?: any): any;
        scrollLeft(next?: any, prev?: any): any;
        field(): {
            [key: string]: (next?: any) => any;
        } & {
            "scrollTop": (next?: any, prev?: any) => any;
            "scrollLeft": (next?: any, prev?: any) => any;
        };
        eventScroll(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "scroll": (next?: any, prev?: any) => any;
            "overflow": (next?: any, prev?: any) => any;
            "underflow": (next?: any, prev?: any) => any;
        };
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value, prev?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value, prev?: Value): any;
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
        titler(next?: any, prev?: any): $mol_viewer;
        head(): any[];
        header(next?: any, prev?: any): $mol_viewer;
        body(): any[];
        bodier(next?: any, prev?: any): $mol_scroller;
        foot(): any[];
        footer(next?: any, prev?: any): $mol_viewer;
        childs(): any[];
    }
}
declare namespace $ {
    class $mol_coder extends $mol_viewer {
        value(next?: any, prev?: any): any;
        format(): string;
        hint(): string;
        manualer(next?: any, prev?: any): $mol_stringer;
        eventScan(next?: any, prev?: any): any;
        labelScan(): string;
        scanner(next?: any, prev?: any): $mol_clicker;
        childs(): any[];
    }
}
declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
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
        searchQuery(next?: any, prev?: any): any;
        searcher(next?: any, prev?: any): $mol_coder;
        searchPanel(next?: any, prev?: any): $mol_rower;
        childs(): any[];
        supplyRows(): any[];
        lister(next?: any, prev?: any): $mol_lister;
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
        pather(next?: any, prev?: any): $mol_svg_path;
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
        checked(next?: any, prev?: any): any;
        attr(): {
            [key: string]: () => string | number | boolean;
        } & {
            "disabled": () => any;
            "tabindex": () => any;
        } & {
            "mol_checker_checked": (next?: any, prev?: any) => any;
        };
        icon(): any;
        label(): any[];
        labeler(next?: any, prev?: any): $mol_viewer;
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
        optionChecked(key: any, next?: any, prev?: any): any;
        optionLabel(key: any): string;
        optioner(key: any, next?: any, prev?: any): $mol_checker;
        value(next?: any, prev?: any): any;
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
        current(next?: any, prev?: any): any;
        switcherOptions(): {};
        switcher(next?: any, prev?: any): $mol_switcher;
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
    class $mol_sectioner extends $mol_lister {
        head(): any;
        header(next?: any, prev?: any): $mol_viewer;
        content(): any;
        rows(): any[];
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
        items(next?: any, prev?: any): any;
        attachNew(next?: any, prev?: any): any;
        adder(next?: any, prev?: any): $mol_attacher_adder;
        content(next?: any, prev?: any): any;
        contenter(next?: any, prev?: any): $mol_tiler;
    }
}
declare namespace $ {
    class $mol_attacher_item extends $mol_linker {
        urlThumb(next?: any, prev?: any): any;
        urlLoad(next?: any, prev?: any): any;
        uri(next?: any, prev?: any): any;
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
        icon(next?: any, prev?: any): $mol_icon_attach;
        eventCapture(next?: any, prev?: any): any;
        eventPicked(next?: any, prev?: any): any;
        input(next?: any, prev?: any): $mol_attacher_adder_input;
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
        eventCapture(next?: any, prev?: any): any;
        eventClick(next?: any, prev?: any): any;
        eventPicked(next?: any, prev?: any): any;
        event(): {
            [key: string]: (event: Event) => void;
        } & {
            "change": (next?: any, prev?: any) => any;
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
    class $mol_icon_tick extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_checker_ticker extends $mol_checker {
        icon(next?: any, prev?: any): $mol_icon_tick;
    }
}
declare namespace $ {
    class $mol_app_supplies_detailer extends $mol_pager {
        supply(): any;
        title(): string;
        backer_icon(next?: any, prev?: any): $mol_icon_chevron;
        backArg(): {
            "side": () => any;
            "supply": () => any;
        };
        backer(next?: any, prev?: any): $mol_linker;
        head(): any[];
        orgLabel(): string;
        providerLabel(): string;
        providerName(): string;
        providerItem(next?: any, prev?: any): $mol_labeler;
        customerLabel(): string;
        consumerName(): string;
        consumerItem(next?: any, prev?: any): $mol_labeler;
        supplyGroupLabel(): string;
        supplyGroupName(): string;
        supplyGroupItem(next?: any, prev?: any): $mol_labeler;
        ballanceUnitLabel(): string;
        ballanceUnitName(): string;
        ballanceUnitItem(next?: any, prev?: any): $mol_labeler;
        orgItems(): any[];
        orgContent(next?: any, prev?: any): $mol_rower;
        orgItem(next?: any, prev?: any): $mol_decker_item;
        consLabel(): string;
        contractLabel(): string;
        contractId(): string;
        contractItem(next?: any, prev?: any): $mol_labeler;
        payMethodLabel(): string;
        payMethodName(): string;
        payMethodItem(next?: any, prev?: any): $mol_labeler;
        managerLabel(): string;
        managerName(): string;
        managerItem(next?: any, prev?: any): $mol_labeler;
        debitodLabel(): string;
        debitorName(): string;
        debitorItem(next?: any, prev?: any): $mol_labeler;
        consItems(): any[];
        consContent(next?: any, prev?: any): $mol_rower;
        consItem(next?: any, prev?: any): $mol_decker_item;
        descrDecker(next?: any, prev?: any): $mol_decker;
        descrCarder(next?: any, prev?: any): $mol_carder;
        attachTitle(): string;
        attachments(): any[];
        attachNew(next?: any, prev?: any): any;
        attacher(next?: any, prev?: any): $mol_attacher;
        attachCarder(next?: any, prev?: any): $mol_sectioner;
        positionsTitle(): string;
        costLabel(): string;
        cost(next?: any, prev?: any): $mol_unit_money;
        coster(next?: any, prev?: any): $mol_coster;
        costItem(next?: any, prev?: any): $mol_labeler;
        posListerHead(): any[];
        positions(): any[];
        posLister(next?: any, prev?: any): $mol_sectioner;
        content(): any[];
        contenter(next?: any, prev?: any): $mol_lister;
        lister(next?: any, prev?: any): $mol_lister;
        body(): any[];
        approved(next?: any, prev?: any): any;
        approvedLabel(): string;
        approver(next?: any, prev?: any): $mol_checker_ticker;
        tools(): any[];
        controller(next?: any, prev?: any): $mol_rower;
        foot(): any[];
    }
}
declare namespace $ {
    class $mol_app_supplies_positioner extends $mol_carder {
        heightMinimal(): number;
        productLabel(): string;
        productName(): string;
        productItem(next?: any, prev?: any): $mol_labeler;
        costlabel(): string;
        cost(next?: any, prev?: any): $mol_unit_money;
        coster(next?: any, prev?: any): $mol_coster;
        costItem(next?: any, prev?: any): $mol_labeler;
        mainGroup(next?: any, prev?: any): $mol_rower;
        divisionLabel(): string;
        divisionName(): string;
        divisionItem(next?: any, prev?: any): $mol_labeler;
        priceLabel(): string;
        price(next?: any, prev?: any): $mol_unit_money;
        pricer(next?: any, prev?: any): $mol_coster;
        priceItem(next?: any, prev?: any): $mol_labeler;
        addonGroup(next?: any, prev?: any): $mol_rower;
        quantityLabel(): string;
        quantity(): string;
        quantityItem(next?: any, prev?: any): $mol_labeler;
        supplyDateLabel(): string;
        supplyDate(): string;
        supplyDateItem(next?: any, prev?: any): $mol_labeler;
        storeLabel(): string;
        storeName(): string;
        storeItem(next?: any, prev?: any): $mol_labeler;
        supplyGroup(next?: any, prev?: any): $mol_rower;
        grouper(next?: any, prev?: any): $mol_viewer;
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
        entered(next?: any, prev?: any): any;
        enter(next?: any, prev?: any): $mol_app_supplies_enter;
        supplies(): any[];
        searchQuery(next?: any, prev?: any): any;
        lister(next?: any, prev?: any): $mol_app_supplies_lister;
        supply(): any;
        detailer(next?: any, prev?: any): $mol_app_supplies_detailer;
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
        price(next?: any, prev?: any): $mol_unit_money_usd;
        quantity(): string;
        cost(next?: any, prev?: any): $mol_unit_money_usd;
        supplyDate(): string;
        divisionName(): string;
        storeName(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detailer_demo extends $mol_app_supplies_detailer {
        title(): string;
        approved(next?: any, prev?: any): any;
        providerName(): string;
        cost(next?: any, prev?: any): $mol_unit_money_rur;
        consumerName(): string;
        supplyGroupName(): string;
        ballanceUnitName(): string;
        contractId(): string;
        payMethodName(): string;
        managerName(): string;
        debitorName(): string;
        pos1(next?: any, prev?: any): $mol_app_supplies_positioner_demo;
        pos2(next?: any, prev?: any): $mol_app_supplies_positioner_demo;
        pos3(next?: any, prev?: any): $mol_app_supplies_positioner_demo;
        pos4(next?: any, prev?: any): $mol_app_supplies_positioner_demo;
        pos5(next?: any, prev?: any): $mol_app_supplies_positioner_demo;
        positions(): any[];
        attachments(): any[];
    }
}
