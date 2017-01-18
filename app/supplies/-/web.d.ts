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
    class $mol_labeler extends $mol_view {
        dom_name(): string;
        Title(): $mol_view;
        content(): any;
        Content(): $mol_view;
        sub(): any[];
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
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
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
        supply_id(next?: string): string;
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
