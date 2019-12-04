function require( path ){ return $node[ path ] };
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../mol/" ) ] }; 
;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports;
//mol.js.map
;

$node[ "../mol/mol" ] = $node[ "../mol/mol.js" ] = module.exports }.call( {} , {} )
;
"use strict"
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
var $ = ( typeof module === 'object' ) ? Object.setPrototypeOf( module['export'+'s'] , self ) : self
$.$$ = $

$.$mol = $  // deprecated

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//fail.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//hidden.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_offline(uri = 'web.js') {
        if (typeof window === 'undefined') {
            self.addEventListener('install', (event) => {
                self['skipWaiting']();
            });
            self.addEventListener('activate', (event) => {
                self['clients'].claim();
                console.info('$mol_offline activated');
            });
            self.addEventListener('fetch', (event) => {
                event.respondWith(fetch(event.request)
                    .then(response => {
                    caches.open('v1')
                        .then(cache => cache.put(event.request, response));
                    return response.clone();
                })
                    .catch(error => {
                    return caches.match(event.request)
                        .catch(error2 => $.$mol_fail_hidden(error));
                }));
            });
            self.addEventListener('beforeinstallprompt', (event) => {
                console.log(event);
                event.prompt();
            });
        }
        else {
            if (navigator.serviceWorker)
                navigator.serviceWorker.register(uri);
            else if (location.protocol === 'http:')
                console.warn('HTTPS is required for service workers.');
            else
                console.warn('Service Worker is not supported.');
        }
    }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));
//offline.web.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_offline();
})($ || ($ = {}));
//install.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_class(Class) {
        Class[Symbol.toStringTag] = Class.name;
        if (!Class.prototype.hasOwnProperty(Symbol.toStringTag)) {
            Class.prototype[Symbol.toStringTag] = Class.name;
        }
        return Class;
    }
    $.$mol_class = $mol_class;
})($ || ($ = {}));
//class.js.map
;
"use strict";
var $;
(function ($) {
    let $$;
    (function ($$_1) {
    })($$ = $.$$ || ($.$$ = {}));
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//ambient.js.map
;
"use strict";
var $;
(function ($) {
    var $mol_object2_1;
    let $mol_object2 = $mol_object2_1 = class $mol_object2 extends Object {
        constructor(init) {
            super();
            if (init)
                init(this);
        }
        static get $$() { return this.$; }
        get $$() { return this.$; }
        static make(init) {
            return new this(init);
        }
        static toString() { return this[Symbol.toStringTag] || this.name; }
        destructor() { }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this.toString();
        }
    };
    $mol_object2.$ = $;
    $mol_object2 = $mol_object2_1 = __decorate([
        $.$mol_class
    ], $mol_object2);
    $.$mol_object2 = $mol_object2;
    Object.defineProperty($mol_object2.prototype, '$', { value: $mol_object2.$, enumerable: false, writable: true });
})($ || ($ = {}));
//object2.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $.$mol_object2 {
        constructor(task) {
            super();
            this.task = task;
            this.cancelled = false;
            this.promise = Promise.resolve().then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));
//tick.js.map
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));
//context.web.js.map
;
"use strict";
var $;
(function ($) {
    let all = [];
    let el = null;
    let timer = null;
    function $mol_style_attach(id, text) {
        all.push(`/* ${id} */\n\n${text}`);
        if (timer)
            return el;
        const doc = $.$mol_dom_context.document;
        el = doc.createElement('style');
        el.id = `$mol_style_attach`;
        doc.head.appendChild(el);
        timer = new $.$mol_after_tick(() => {
            el.innerHTML = '\n' + all.join('\n\n');
            all = [];
            el = null;
            timer = null;
        });
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));
//attach.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/theme/theme.css", "[mol_theme] , :root {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n}\n\n[mol_theme=\"$mol_theme_light\"] , :root {\n\t--mol_theme_back: hsl( 210 , 50% , 99% );\n\t--mol_theme_hover: rgba( 0 , 0 , 0 , .05 );\n\t--mol_theme_current: hsl( 210 , 100% , 80% );\n\t--mol_theme_text: rgba( 0 , 0 , 0 , .9 );\n\t--mol_theme_control: hsla( 210 , 60% , 35% , 1 );\n\t--mol_theme_shade: rgba( 0 , 0 , 0 , .5 );\n\t--mol_theme_line: rgba( 220 , 220 , 220 , 1 );\n\t--mol_theme_focus: hsla( 0 , 60% , 50% , 0.75 );\n\t--mol_theme_field: white;\n}\n\n[mol_theme=\"$mol_theme_dark\"] {\n\t--mol_theme_back: hsl( 210 , 50% , 10% );\n\t--mol_theme_hover: #333;\n\t--mol_theme_current: hsl( 210 , 100% , 20% );\n\t--mol_theme_text: rgba( 255 , 255 , 255 , .8 );\n\t--mol_theme_control: hsla( 210 , 60% , 70% , 1 );\n\t--mol_theme_shade: rgba( 255 , 255 , 255 , .5 );\n\t--mol_theme_line: rgba( 50 , 50 , 50 , 1 );\n\t--mol_theme_focus: rgba( 204 , 68 , 50 , .75 );\n\t--mol_theme_field: black;\n}\n\n[mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: hsla( 210 , 60% , 35% , 1 );\n\t--mol_theme_hover: rgba( 0 , 0 , 0 , .05 );\n\t--mol_theme_current: hsl( 210 , 100% , 20% );\n\t--mol_theme_text: white;\n\t--mol_theme_line: white;\n\t--mol_theme_control: white;\n}\n\n[mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: rgb(204, 68, 50);\n\t--mol_theme_hover: rgb(165, 56, 42);\n\t--mol_theme_text: white;\n\t--mol_theme_line: rgba( 50 , 50 , 50 , 1 );\n\t--mol_theme_control: white;\n}\n");
})($ || ($ = {}));
//theme.css.js.map
;
"use strict";
//theme.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/skin/skin.css", ":root {\n\t--mol_skin_font: 1rem/1.5 \"-apple-system\", BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n\t--mol_skin_font_monospace: Monaco, monospace;\n}\n\n/* Deprecated, use mol_theme instead */\n:root {\n\n\t--mol_skin_outline: 0 0 0 1px var(--mol_theme_line);\n\t\n\t--mol_skin_base: #3a8ccb;\n\t--mol_skin_base_text: white;\n\t\n\t--mol_skin_current: var(--mol_skin_base);\n\t--mol_skin_current_text: white;\n\t--mol_skin_current_line: #1471b8;\n\t\n\t--mol_skin_button: var(--mol_skin_card);\n\t--mol_skin_hover: rgba( 0 , 0 , 0 , .05 );\n\t\n\t--mol_skin_round: 0px;\n\t\n\t--mol_skin_focus_line: rgba( 0 , 0 , 0 , .2 );\n\t--mol_skin_focus_outline: 0 0 0 1px var(--mol_skin_focus_line);\n\t\n\t--mol_skin_float: var(--mol_skin_focus_outline);\n\n\t--mol_skin_passive: #eee;\n\t--mol_skin_passive_text: rgba( 0 , 0 , 0 , .5 );\n\t\n\t--mol_skin_light: #fcfcfc;\n\t--mol_skin_light_line: rgba( 230 , 230 , 230 , .75 );\n\t--mol_skin_light_text: rgba( 0 , 0 , 0 , .9 );\n\t--mol_skin_light_hover: #f7f7f7;\n\t--mol_skin_light_outline: 0 0 0 1px var(--mol_theme_line);\n\n\t--mol_skin_card: var(--mol_theme_back);\n\t--mol_skin_card_text: var(--mol_theme_text);\n\t\n\t--mol_skin_accent: #dd0e3e;\n\t--mol_skin_accent_text: white;\n\t--mol_skin_accent_hover: #c50d37;\n\n\t--mol_skin_warn: rgba( 255 , 50 , 50 , 0.75 );\n\t--mol_skin_warn_text: white;\n\t--mol_skin_warn_hover: color( var(--mol_skin_warn) lightness(-5%) );\n\n\t--mol_skin_good: #96DAA9;\n\t--mol_skin_good_text: black;\n\n\t--mol_skin_bad: #CC5252;\n\t--mol_skin_bad_text: white;\n}\n");
})($ || ($ = {}));
//skin.css.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_wrapper = class $mol_wrapper extends $.$mol_object2 {
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
    };
    $mol_wrapper = __decorate([
        $.$mol_class
    ], $mol_wrapper);
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//wrapper.js.map
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] = $['devtoolsFormatters'] || [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                return val[$.$mol_dev_format_head]();
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        if (typeof obj !== 'object')
            return obj;
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        if (typeof obj === 'object' && $.$mol_dev_format_head in obj) {
            return obj[$.$mol_dev_format_head]();
        }
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));
//format.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));
//maybe.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log(path, ...values) {
        if ($.$mol_log_filter() == null)
            return;
        path = String(path);
        if (path.indexOf($.$mol_log_filter()) === -1)
            return;
        const context = $.$mol_log_context();
        if (context)
            context();
        console.debug(path, ...values);
        if ($.$mol_log_debug() == null)
            return;
        if (path.indexOf($.$mol_log_debug()) === -1)
            return;
        debugger;
    }
    $.$mol_log = $mol_log;
})($ || ($ = {}));
//log.js.map
;
"use strict";
var $;
(function ($) {
    let context = null;
    function $mol_log_context(next = context) {
        return context = next;
    }
    $.$mol_log_context = $mol_log_context;
})($ || ($ = {}));
//log_context.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_debug(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_debug()');
            }
            else {
                sessionStorage.setItem('$mol_log_debug()', next);
            }
        }
        return sessionStorage.getItem('$mol_log_debug()');
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.web.js.map
;
"use strict";
var $;
(function ($) {
    let filter = undefined;
    $.$mol_log_filter = function $mol_log_filter(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_filter()');
            }
            else {
                sessionStorage.setItem('$mol_log_filter()', next);
            }
            filter = next;
        }
        if (filter !== undefined)
            return filter;
        return filter = sessionStorage.getItem('$mol_log_filter()');
    };
    if (typeof sessionStorage === 'undefined')
        $.$mol_log_filter = (next = null) => filter = next;
    if ($.$mol_log_filter() == null)
        console.info('Use $mol_log_filter( needle : string|null ) to toggle logs');
})($ || ($ = {}));
//log_filter.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_group(name, task) {
        const filter = $.$mol_log_filter();
        if (filter == null)
            return task;
        return function $mol_log_group_wrapper(...args) {
            let started = false;
            let prev = $.$mol_log_context();
            $.$mol_log_context(() => {
                if (prev)
                    prev();
                started = true;
                if (filter || prev)
                    console.group(name);
                else
                    console.groupCollapsed(name);
                $.$mol_log_context(prev = null);
            });
            try {
                return task.apply(this, args);
            }
            finally {
                if (started)
                    console.groupEnd();
                $.$mol_log_context(prev);
            }
        };
    }
    $.$mol_log_group = $mol_log_group;
})($ || ($ = {}));
//log_group.js.map
;
"use strict";
var $;
(function ($) {
    var $mol_log2_1;
    let $mol_log2 = $mol_log2_1 = class $mol_log2 extends $.$mol_wrapper {
        constructor(host, id, args) {
            super();
            this.host = host;
            this.id = id;
            this.args = args;
            this.stream = [];
            this[Symbol.toStringTag] = host ? `${host}.${id}` : id;
        }
        static wrap(task) {
            const Inner = this;
            const wrapped = function (...args) {
                const outer = $mol_log2_1.current;
                const inner = $mol_log2_1.current = new Inner(this, task.name, args);
                try {
                    return task.call(this, ...args);
                }
                finally {
                    $mol_log2_1.current = outer;
                    inner.flush();
                }
            };
            return wrapped;
        }
        flush() {
            if (this.stream.length === 0)
                return;
            console.debug(this);
        }
        info(...values) {
            this.stream.push(new $mol_log2_line(...$mol_log2_1.prefix, ...values));
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_span({}, ...$.$mol_maybe(this.host).map($.$mol_dev_format_auto), '.', $.$mol_dev_format_strong(this.id), '(', ...this.args.map($.$mol_dev_format_auto), ') ', $.$mol_dev_format_auto(this.stream));
        }
        static info(...values) {
            const excludes = $mol_log2_1.excludes;
            if (!excludes)
                return;
            const skip = excludes.some((regexp, index) => {
                return regexp && regexp.test(String(values[index])) || false;
            });
            if (skip)
                return;
            if (!$mol_log2_1.current) {
                console.warn(new Error(`$mol_log.current is not defined. Wrap entry point to $mol_log!`));
                $mol_log2_1.current = new $mol_log2_1(null, '$mol_log2_default', []);
                console.debug($mol_log2_1.current);
            }
            $mol_log2_1.current.info(...values);
        }
    };
    $mol_log2.current = null;
    $mol_log2.excludes = null;
    $mol_log2.prefix = [];
    $mol_log2 = $mol_log2_1 = __decorate([
        $.$mol_class
    ], $mol_log2);
    $.$mol_log2 = $mol_log2;
    class $mol_log2_indent extends $.$mol_wrapper {
        static wrap(task) {
            const Inner = this;
            const wrapped = function (...args) {
                try {
                    $mol_log2.prefix.push($.$mol_log2_token_indent);
                    return task.call(this, ...args);
                }
                finally {
                    $mol_log2.prefix.pop();
                }
            };
            return wrapped;
        }
    }
    $.$mol_log2_indent = $mol_log2_indent;
    let $mol_log2_table = class $mol_log2_table extends $mol_log2 {
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_span({}, $.$mol_dev_format_strong(`${this}(`), ...this.args.map($.$mol_dev_format_auto), $.$mol_dev_format_strong(`) `));
        }
        [$.$mol_dev_format_body]() {
            return $.$mol_dev_format_table({}, ...this.stream.map($.$mol_dev_format_auto));
        }
    };
    $mol_log2_table = __decorate([
        $.$mol_class
    ], $mol_log2_table);
    $.$mol_log2_table = $mol_log2_table;
    let $mol_log2_hidden = class $mol_log2_hidden extends $mol_log2 {
        flush() { }
    };
    $mol_log2_hidden = __decorate([
        $.$mol_class
    ], $mol_log2_hidden);
    $.$mol_log2_hidden = $mol_log2_hidden;
    let $mol_log2_line = class $mol_log2_line extends Array {
        constructor(...items) {
            super(...items);
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_tr({}, ...this.map(item => $.$mol_dev_format_td({}, $.$mol_dev_format_auto(item))));
        }
    };
    $mol_log2_line = __decorate([
        $.$mol_class
    ], $mol_log2_line);
    $.$mol_log2_line = $mol_log2_line;
    let $mol_log2_token = class $mol_log2_token extends Array {
        constructor(...items) {
            super(...items);
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_accent(...this);
        }
    };
    $mol_log2_token = __decorate([
        $.$mol_class
    ], $mol_log2_token);
    $.$mol_log2_token = $mol_log2_token;
    $.$mol_log2_token_empty = new $mol_log2_token('');
    $.$mol_log2_token_indent = new $mol_log2_token('\t');
    $.$mol_log2_legend = new $mol_log2_table(null, '$mol_log2_legend', []);
    if (!$mol_log2.excludes)
        $.$mol_log2_legend.info($.$mol_log2_token_empty, 'Use `$mol_log2.excludes : null | RegExp[]` to toggle logs');
})($ || ($ = {}));
//log2.js.map
;
"use strict";
var $;
(function ($) {
    console.debug($.$mol_log2_legend);
})($ || ($ = {}));
//log2.web.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $.$mol_object2 {
        constructor(task) {
            super();
            this.task = task;
            this.id = requestAnimationFrame(task);
        }
        destructor() {
            cancelAnimationFrame(this.id);
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//frame.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_compare_any(a, b) {
        if (a === b)
            return true;
        if (!Number.isNaN(a))
            return false;
        if (!Number.isNaN(b))
            return false;
        return true;
    }
    $.$mol_compare_any = $mol_compare_any;
})($ || ($ = {}));
//any.js.map
;
"use strict";
var $;
(function ($) {
    const cache = new WeakMap();
    $.$mol_conform_stack = [];
    function $mol_conform(target, source) {
        if ($.$mol_compare_any(target, source))
            return source;
        if (!target || typeof target !== 'object')
            return target;
        if (!source || typeof source !== 'object')
            return target;
        if (target instanceof Error)
            return target;
        if (source instanceof Error)
            return target;
        if (target['constructor'] !== source['constructor'])
            return target;
        if (cache.get(target))
            return target;
        cache.set(target, true);
        const conform = $.$mol_conform_handlers.get(target['constructor']);
        if (!conform)
            return target;
        if ($.$mol_conform_stack.indexOf(target) !== -1)
            return target;
        $.$mol_conform_stack.push(target);
        try {
            return conform(target, source);
        }
        finally {
            $.$mol_conform_stack.pop();
        }
    }
    $.$mol_conform = $mol_conform;
    $.$mol_conform_handlers = new WeakMap();
    function $mol_conform_handler(cl, handler) {
        $.$mol_conform_handlers.set(cl, handler);
    }
    $.$mol_conform_handler = $mol_conform_handler;
    function $mol_conform_array(target, source) {
        if (source.length !== target.length)
            return target;
        for (let i = 0; i < target.length; ++i) {
            if (!$.$mol_compare_any(source[i], target[i]))
                return target;
        }
        return source;
    }
    $mol_conform_handler(Array, $mol_conform_array);
    $mol_conform_handler(Uint8Array, $mol_conform_array);
    $mol_conform_handler(Uint16Array, $mol_conform_array);
    $mol_conform_handler(Uint32Array, $mol_conform_array);
    $mol_conform_handler(Object, (target, source) => {
        let count = 0;
        let equal = true;
        for (let key in target) {
            const conformed = $mol_conform(target[key], source[key]);
            if (conformed !== target[key]) {
                try {
                    target[key] = conformed;
                }
                catch (error) { }
                if (!$.$mol_compare_any(conformed, target[key]))
                    equal = false;
            }
            if (!$.$mol_compare_any(conformed, source[key]))
                equal = false;
            ++count;
        }
        for (let key in source)
            if (--count < 0)
                break;
        return (equal && count === 0) ? source : target;
    });
    $mol_conform_handler(Date, (target, source) => {
        if (target.getTime() === source.getTime())
            return source;
        return target;
    });
    $mol_conform_handler(RegExp, (target, source) => {
        if (target.toString() === source.toString())
            return source;
        return target;
    });
})($ || ($ = {}));
//conform.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_array_trim(array) {
        let last = array.length;
        while (last > 0) {
            --last;
            const value = array[last];
            if (value === undefined)
                array.pop();
            else
                break;
        }
        return array;
    }
    $.$mol_array_trim = $mol_array_trim;
})($ || ($ = {}));
//trim.js.map
;
"use strict";
var $;
(function ($) {
    var $mol_fiber_1;
    function $mol_fiber_defer(calculate) {
        const fiber = new $mol_fiber;
        fiber.calculate = calculate;
        fiber[Symbol.toStringTag] = calculate.name;
        fiber.schedule();
        return fiber;
    }
    $.$mol_fiber_defer = $mol_fiber_defer;
    function $mol_fiber_func(calculate) {
        console.warn('$mol_fiber_func is deprecated. Use $mol_fiber.func instead.');
        return $mol_fiber.func(calculate);
    }
    $.$mol_fiber_func = $mol_fiber_func;
    function $mol_fiber_root(calculate) {
        const wrapper = function (...args) {
            const fiber = new $mol_fiber();
            fiber.calculate = calculate.bind(this, ...args);
            return fiber.wake();
        };
        wrapper[Symbol.toStringTag] = calculate.name;
        return wrapper;
    }
    $.$mol_fiber_root = $mol_fiber_root;
    function $mol_fiber_method(obj, name, descr) {
        console.warn('$mol_fiber_method is deprecated. Use $mol_fiber.method instead.');
        return $mol_fiber.method(obj, name, descr);
    }
    $.$mol_fiber_method = $mol_fiber_method;
    function $mol_fiber_async(task) {
        return (...args) => new Promise($mol_fiber_root((done, fail) => {
            try {
                done(task(...args));
            }
            catch (error) {
                if ('then' in error)
                    return $.$mol_fail_hidden(error);
                fail(error);
            }
        }));
    }
    $.$mol_fiber_async = $mol_fiber_async;
    function $mol_fiber_sync(request) {
        return function $mol_fiber_sync_wrapper(...args) {
            const slave = $mol_fiber.current;
            let master = slave && slave.master;
            if (!master || master.constructor !== $mol_fiber) {
                master = new $mol_fiber;
                master.cursor = -3;
                master.error = request.call(this, ...args).then($.$mol_log2.func(master.push).bind(master), $.$mol_log2.func(master.fail).bind(master));
                const prefix = slave ? `${slave}/${slave.cursor / 2}:` : '/';
                master[Symbol.toStringTag] = prefix + (request.name || $mol_fiber_sync.name);
            }
            return master.get();
        };
    }
    $.$mol_fiber_sync = $mol_fiber_sync;
    async function $mol_fiber_warp() {
        const deadline = $mol_fiber.deadline;
        try {
            $mol_fiber.deadline = Number.POSITIVE_INFINITY;
            while ($mol_fiber.queue.length)
                await $mol_fiber.tick();
            return Promise.resolve();
        }
        finally {
            $mol_fiber.deadline = deadline;
        }
    }
    $.$mol_fiber_warp = $mol_fiber_warp;
    function $mol_fiber_fence(func) {
        const prev = $mol_fiber.current;
        try {
            $mol_fiber.current = null;
            return func();
        }
        finally {
            $mol_fiber.current = prev;
        }
    }
    $.$mol_fiber_fence = $mol_fiber_fence;
    function $mol_fiber_unlimit(task) {
        const deadline = $mol_fiber.deadline;
        try {
            $mol_fiber.deadline = Number.POSITIVE_INFINITY;
            return task();
        }
        finally {
            $mol_fiber.deadline = deadline;
        }
    }
    $.$mol_fiber_unlimit = $mol_fiber_unlimit;
    let $mol_fiber_solid = class $mol_fiber_solid extends $.$mol_wrapper {
        static func(task) {
            function wrapped(...args) {
                const deadline = $mol_fiber.deadline;
                try {
                    $mol_fiber.deadline = Number.POSITIVE_INFINITY;
                    return task.call(this, ...args);
                }
                catch (error) {
                    if ('then' in error)
                        $.$mol_fail(new Error('Solid fiber can not be suspended.'));
                    return $.$mol_fail_hidden(error);
                }
                finally {
                    $mol_fiber.deadline = deadline;
                }
            }
            return $mol_fiber.func(wrapped);
        }
    };
    $mol_fiber_solid = __decorate([
        $.$mol_class
    ], $mol_fiber_solid);
    $.$mol_fiber_solid = $mol_fiber_solid;
    let $mol_fiber = $mol_fiber_1 = class $mol_fiber extends $.$mol_wrapper {
        constructor() {
            super(...arguments);
            this.value = undefined;
            this.error = null;
            this.cursor = 0;
            this.masters = [];
        }
        static wrap(task) {
            return function (...args) {
                const slave = $mol_fiber_1.current;
                let master = slave && slave.master;
                if (!master || master.constructor !== $mol_fiber_1) {
                    master = new $mol_fiber_1;
                    master.calculate = task.bind(this, ...args);
                    const prefix = slave ? `${slave}/${slave.cursor / 2}:` : '/';
                    master[Symbol.toStringTag] = `${prefix}${task.name}`;
                }
                return master.get();
            };
        }
        static async tick() {
            while ($mol_fiber_1.queue.length > 0) {
                const now = Date.now();
                if (now >= $mol_fiber_1.deadline) {
                    $mol_fiber_1.schedule();
                    $mol_fiber_1.liveline = now;
                    return;
                }
                const task = $mol_fiber_1.queue.shift();
                await task();
            }
        }
        static schedule() {
            if (!$mol_fiber_1.scheduled) {
                $mol_fiber_1.scheduled = new $.$mol_after_frame(async () => {
                    const now = Date.now();
                    let quant = $mol_fiber_1.quant;
                    if ($mol_fiber_1.liveline) {
                        quant = Math.max(quant, Math.floor((now - $mol_fiber_1.liveline) / 2));
                        $mol_fiber_1.liveline = 0;
                    }
                    $mol_fiber_1.deadline = now + quant;
                    $mol_fiber_1.scheduled = null;
                    await $mol_fiber_1.tick();
                });
            }
            const promise = new this.$.Promise(done => this.queue.push(() => (done(), promise)));
            return promise;
        }
        schedule() {
            $mol_fiber_1.schedule().then(() => this.wake());
        }
        wake() {
            try {
                if (this.cursor > -2)
                    return this.get();
            }
            catch (error) {
                if ('then' in error)
                    return;
                $.$mol_fail_hidden(error);
            }
        }
        push(value) {
            value = this.$.$mol_conform(value, this.value);
            if (this.error || !Object.is(this.value, value)) {
                this.$.$mol_log2.info(this, $.$mol_fiber_token_changed1, value, $.$mol_fiber_token_changed2, this.error || this.value);
                this.obsolete_slaves();
                this.forget();
            }
            else {
                this.$.$mol_log2.info(this, $.$mol_fiber_token_actualized, value);
            }
            this.error = null;
            this.value = value;
            this.complete();
            return value;
        }
        fail(error) {
            this.complete();
            this.$.$mol_log2.info(this, $.$mol_fiber_token_failed, error);
            this.error = error;
            this.obsolete_slaves();
            return error;
        }
        wait(promise) {
            this.error = promise;
            this.$.$mol_log2.info(this, $.$mol_fiber_token_sleeped, promise);
            this.cursor = 0;
            return promise;
        }
        complete() {
            if (this.cursor <= -2)
                return;
            for (let index = 0; index < this.masters.length; index += 2) {
                this.complete_master(index);
            }
            this.cursor = -2;
        }
        complete_master(master_index) {
            this.disobey(master_index);
        }
        pull() {
            this.push(this.calculate());
        }
        update() {
            const slave = $mol_fiber_1.current;
            try {
                this.limit();
                $mol_fiber_1.current = this;
                this.$.$mol_log2.info(this, $.$mol_fiber_token_runned);
                this.pull();
            }
            catch (error) {
                if ('then' in error) {
                    if (!slave) {
                        const listener = () => this.wake();
                        error = error.then(listener, listener);
                    }
                    this.wait(error);
                }
                else {
                    this.fail(error);
                }
            }
            finally {
                $mol_fiber_1.current = slave;
            }
        }
        get() {
            if (this.cursor > 0) {
                this.$.$mol_fail(new Error(`Cyclic dependency at ${this}`));
            }
            const slave = $mol_fiber_1.current;
            if (slave)
                slave.master = this;
            if (this.cursor > -2)
                this.update();
            if (this.error)
                return this.$.$mol_fail_hidden(this.error);
            return this.value;
        }
        limit() {
            if (!$mol_fiber_1.deadline)
                return;
            if (!$mol_fiber_1.current)
                return;
            if (Date.now() < $mol_fiber_1.deadline)
                return;
            this.$.$mol_fail_hidden($mol_fiber_1.schedule());
        }
        get master() {
            return this.masters[this.cursor];
        }
        set master(next) {
            if (this.cursor === -1)
                return;
            const cursor = this.cursor;
            const prev = this.masters[this.cursor];
            if (prev !== next) {
                if (prev)
                    this.rescue(prev, cursor);
                this.masters[cursor] = next;
                this.masters[cursor + 1] = this.obey(next, cursor);
            }
            this.cursor = cursor + 2;
        }
        rescue(master, master_index) { }
        obey(master, master_index) { return -1; }
        lead(slave, master_index) { return -1; }
        dislead(slave_index) {
            this.destructor();
        }
        disobey(master_index) {
            const master = this.masters[master_index];
            if (!master)
                return;
            master.dislead(this.masters[master_index + 1]);
            this.masters[master_index] = undefined;
            this.masters[master_index + 1] = undefined;
            this.$.$mol_array_trim(this.masters);
        }
        obsolete_slaves() { }
        obsolete(master_index) { }
        forget() {
            this.value = undefined;
        }
        abort() {
            this.forget();
            return true;
        }
        destructor() {
            if (!this.abort())
                return;
            this.$.$mol_log2.info(this, $.$mol_fiber_token_destructed);
            this.complete();
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_native(this);
        }
    };
    $mol_fiber.quant = 32;
    $mol_fiber.deadline = 0;
    $mol_fiber.liveline = 0;
    $mol_fiber.current = null;
    $mol_fiber.scheduled = null;
    $mol_fiber.queue = [];
    __decorate([
        $.$mol_log2.method
    ], $mol_fiber.prototype, "wake", null);
    __decorate([
        $.$mol_log2_indent.method
    ], $mol_fiber.prototype, "update", null);
    $mol_fiber = $mol_fiber_1 = __decorate([
        $.$mol_class
    ], $mol_fiber);
    $.$mol_fiber = $mol_fiber;
    $.$mol_fiber_token_runned = new $.$mol_log2_token(' ► ');
    $.$mol_fiber_token_changed1 = new $.$mol_log2_token(' ˸ ');
    $.$mol_fiber_token_changed2 = new $.$mol_log2_token(' 🠈 ');
    $.$mol_fiber_token_actualized = new $.$mol_log2_token(' ✓ ');
    $.$mol_fiber_token_sleeped = new $.$mol_log2_token(' 💤 ');
    $.$mol_fiber_token_failed = new $.$mol_log2_token(' 🔥 ');
    $.$mol_fiber_token_destructed = new $.$mol_log2_token(' 🕱 ');
    $.$mol_log2_legend.info($.$mol_fiber_token_runned, '$mol_fiber starts execution');
    $.$mol_log2_legend.info(new $.$mol_log2_line($.$mol_fiber_token_changed1, $.$mol_fiber_token_changed2), '$mol_fiber value is changed to different value');
    $.$mol_log2_legend.info($.$mol_fiber_token_actualized, 'Actual $mol_fiber value is same as before');
    $.$mol_log2_legend.info($.$mol_fiber_token_sleeped, '$mol_fiber can not run now and awaits on promise');
    $.$mol_log2_legend.info($.$mol_fiber_token_failed, '$mol_fiber is failed and will be throw an Error or Promise');
    $.$mol_log2_legend.info($.$mol_fiber_token_destructed, '$mol_fiber fully destructed');
})($ || ($ = {}));
//fiber.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        if (!having)
            return false;
        if (typeof having !== 'object')
            return false;
        if (!('destructor' in having))
            return false;
        return true;
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//owning.js.map
;
"use strict";
var $;
(function ($) {
    var $mol_atom2_1;
    function $mol_atom2_value(task) {
        const cached = $mol_atom2.cached;
        try {
            $mol_atom2.cached = true;
            return task();
        }
        finally {
            $mol_atom2.cached = cached;
        }
    }
    $.$mol_atom2_value = $mol_atom2_value;
    let $mol_atom2 = $mol_atom2_1 = class $mol_atom2 extends $.$mol_fiber {
        constructor() {
            super(...arguments);
            this.slaves = [];
            this._value = undefined;
            this._error = null;
        }
        static get current() {
            const atom = $.$mol_fiber.current;
            if (atom instanceof $mol_atom2_1)
                return atom;
            return null;
        }
        static reap(atom) {
            this.reap_queue.push(atom);
            if (this.reap_task)
                return;
            this.reap_task = $.$mol_fiber_defer(() => {
                this.reap_task = null;
                while (true) {
                    const atom = this.reap_queue.pop();
                    if (!atom)
                        break;
                    if (!atom.alone)
                        continue;
                    atom.destructor();
                }
            });
        }
        rescue(master, cursor) {
            if (!(master instanceof $mol_atom2_1))
                return;
            const master_index = this.masters.length;
            const slave_index = this.masters[cursor + 1] + 1;
            master.slaves[slave_index] = master_index;
            this.masters.push(master, this.masters[cursor + 1]);
        }
        get() {
            if ($mol_atom2_1.cached)
                return this.value;
            const value = super.get();
            if (value === undefined)
                $.$mol_fail(new Error(`Not defined: ${this}`));
            return value;
        }
        pull() {
            if (this.cursor === 0)
                return super.pull();
            this.$.$mol_log2.info(this, $.$mol_atom2_token_revalidation);
            const masters = this.masters;
            for (let index = 0; index < masters.length; index += 2) {
                const master = masters[index];
                if (!master)
                    continue;
                try {
                    master.get();
                }
                catch (error) {
                    if ('then' in error)
                        $.$mol_fail_hidden(error);
                    this.cursor = 0;
                }
                if (this.cursor !== 0)
                    continue;
                this.$.$mol_log2.info(this, $.$mol_atom2_token_stumbled, this._error || this._value);
                return super.pull();
            }
            this.$.$mol_log2.info(this, $.$mol_atom2_token_revalidated, this._error || this._value);
            this.cursor = -2;
            return this.value;
        }
        get value() { return this._value; }
        set value(next) {
            const prev = this._value;
            if (prev && this.$.$mol_owning_check(this, prev))
                prev.destructor();
            if (next && this.$.$mol_owning_catch(this, next)) {
                next[Symbol.toStringTag] = this[Symbol.toStringTag];
                next[$.$mol_object_field] = this[$.$mol_object_field];
            }
            this._value = next;
        }
        get error() { return this._error; }
        set error(next) {
            const prev = this._error;
            if (prev && this.$.$mol_owning_check(this, prev))
                prev.destructor();
            if (next && this.$.$mol_owning_catch(this, next)) {
                next[Symbol.toStringTag] = this[Symbol.toStringTag];
                next[$.$mol_object_field] = this[$.$mol_object_field];
            }
            this._error = next;
        }
        put(next) {
            this.cursor = this.masters.length;
            next = this.push(next);
            this.cursor = -3;
            return next;
        }
        complete_master(master_index) {
            if (this.masters[master_index] instanceof $mol_atom2_1) {
                if (master_index >= this.cursor)
                    this.disobey(master_index);
            }
            else {
                this.disobey(master_index);
            }
        }
        obey(master, master_index) {
            return master.lead(this, master_index);
        }
        lead(slave, master_index) {
            this.$.$mol_log2.info(this, $.$mol_atom2_token_leaded, slave);
            const slave_index = this.slaves.length;
            this.slaves[slave_index] = slave;
            this.slaves[slave_index + 1] = master_index;
            return slave_index;
        }
        dislead(slave_index) {
            if (slave_index < 0)
                return;
            this.$.$mol_log2.info(this, $.$mol_atom2_token_disleaded, this.slaves[slave_index]);
            this.slaves[slave_index] = undefined;
            this.slaves[slave_index + 1] = undefined;
            $.$mol_array_trim(this.slaves);
            if (this.cursor > -3 && this.alone)
                $mol_atom2_1.reap(this);
        }
        obsolete(master_index = -1) {
            if (this.cursor > 0) {
                if (master_index >= this.cursor - 2)
                    return;
                const path = [];
                let current = this;
                collect: while (current) {
                    path.push(current);
                    current = current.masters[current.cursor - 2];
                }
                this.$.$mol_fail(new Error(`Obsoleted while calculation \n\n${path.join('\n')}\n`));
            }
            if (this.cursor === 0)
                return;
            this.$.$mol_log2.info(this, $.$mol_atom2_token_obsoleted, this._error || this._value);
            if (this.cursor !== -1)
                this.doubt_slaves();
            this.cursor = 0;
        }
        doubt(master_index = -1) {
            if (this.cursor > 0) {
                if (master_index >= this.cursor - 2)
                    return;
                const path = [];
                let current = this;
                collect: while (current) {
                    path.push(current);
                    current = current.masters[current.cursor - 2];
                }
                this.$.$mol_fail(new Error(`Doubted while calculation \n\n${path.join('\n')}\n`));
            }
            if (this.cursor >= -1)
                return;
            this.$.$mol_log2.info(this, $.$mol_atom2_token_doubted, this._error || this._value);
            this.cursor = -1;
            this.doubt_slaves();
        }
        obsolete_slaves() {
            for (let index = 0; index < this.slaves.length; index += 2) {
                const slave = this.slaves[index];
                if (slave)
                    slave.obsolete(this.slaves[index + 1]);
            }
        }
        doubt_slaves() {
            for (let index = 0; index < this.slaves.length; index += 2) {
                const slave = this.slaves[index];
                if (slave)
                    slave.doubt(this.slaves[index + 1]);
            }
        }
        get fresh() {
            return $.$mol_log2_hidden.func(() => {
                if (this.cursor !== -2)
                    return;
                this.cursor = 0;
                $.$mol_fiber_solid.run(() => this.update());
            });
        }
        get alone() {
            return this.slaves.length === 0;
        }
        get derived() {
            for (let index = 0; index < this.masters.length; index += 2) {
                if (this.masters[index])
                    return true;
            }
            return false;
        }
        destructor() {
            if (!this.abort())
                return;
            this.$.$mol_log2.info(this, $.$mol_fiber_token_destructed);
            this.cursor = -3;
            for (let index = 0; index < this.masters.length; index += 2) {
                this.complete_master(index);
            }
        }
    };
    $mol_atom2.cached = false;
    $mol_atom2.reap_task = null;
    $mol_atom2.reap_queue = [];
    __decorate([
        $.$mol_log2_indent.method
    ], $mol_atom2.prototype, "obsolete_slaves", null);
    __decorate([
        $.$mol_log2_indent.method
    ], $mol_atom2.prototype, "doubt_slaves", null);
    $mol_atom2 = $mol_atom2_1 = __decorate([
        $.$mol_class
    ], $mol_atom2);
    $.$mol_atom2 = $mol_atom2;
    $.$mol_atom2_token_revalidation = new $.$mol_log2_token(' ⏭ ');
    $.$mol_atom2_token_stumbled = new $.$mol_log2_token(' ⏯ ');
    $.$mol_atom2_token_revalidated = new $.$mol_log2_token(' ✔ ');
    $.$mol_atom2_token_leaded = new $.$mol_log2_token(' ☍ ');
    $.$mol_atom2_token_disleaded = new $.$mol_log2_token(' ☌ ');
    $.$mol_atom2_token_obsoleted = new $.$mol_log2_token(' ✘ ');
    $.$mol_atom2_token_doubted = new $.$mol_log2_token(' � ');
    $.$mol_log2_legend.info($.$mol_atom2_token_revalidation, '$mol_atom2 starts masters cheking for changes');
    $.$mol_log2_legend.info($.$mol_atom2_token_stumbled, '$mol_atom2 is obsoleted while masters checking');
    $.$mol_log2_legend.info($.$mol_atom2_token_revalidated, '$mol_atom2 is actual becasue there is no changed masters');
    $.$mol_log2_legend.info($.$mol_atom2_token_leaded, '$mol_atom2 leads some slave');
    $.$mol_log2_legend.info($.$mol_atom2_token_disleaded, '$mol_atom2 disleads some slave');
    $.$mol_log2_legend.info($.$mol_atom2_token_obsoleted, '$mol_atom2 is obsoleted because some master is changed');
    $.$mol_log2_legend.info($.$mol_atom2_token_doubted, '$mol_atom2 is doubted because some master is doubted or obsoleted');
})($ || ($ = {}));
//atom2.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_field(proto, name, descr) {
        if (!descr)
            descr = Object.getOwnPropertyDescriptor(proto, name);
        const get = descr ? (descr.get || $.$mol_const(descr.value)) : (() => undefined);
        const set = descr && descr.set || function (next) { get_cache(this).put(next); };
        const store = new WeakMap();
        Object.defineProperty(proto, name + "@", {
            get: function () {
                return store.get(this);
            }
        });
        const get_cache = (host) => {
            let cache = store.get(host);
            if (!cache) {
                cache = new $.$mol_atom2;
                cache.calculate = get.bind(host);
                cache[Symbol.toStringTag] = `${host}.${name}`;
                cache.abort = () => {
                    store.delete(host);
                    cache.forget();
                    return true;
                };
                store.set(host, cache);
            }
            return cache;
        };
        return {
            get() {
                return get_cache(this).get();
            },
            set,
        };
    }
    $.$mol_atom2_field = $mol_atom2_field;
})($ || ($ = {}));
//field.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends Object {
        constructor() {
            super(...arguments);
            this[Symbol.toStringTag] = `${this.constructor.name}.make()`;
        }
        static get $$() { return this.$; }
        get $() {
            if (this._$)
                return this._$;
            const owner = $_1.$mol_owning_get(this);
            return this._$ = (owner && owner.$$ || $);
        }
        set $(next) {
            this._$ = next;
        }
        get $$() { return this.$; }
        static make(config) {
            const instance = new this;
            for (let key in config)
                instance[key] = config[key];
            return instance;
        }
        static toString() {
            return this.name;
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this.toString();
        }
        destructor() { }
    }
    $mol_object.$ = $;
    __decorate([
        $_1.$mol_atom2_field
    ], $mol_object.prototype, "_$", void 0);
    $_1.$mol_object = $mol_object;
    Object.defineProperty($mol_object.prototype, '$', { value: $mol_object.$, enumerable: false, writable: true });
    $mol_object.prototype[Symbol.toStringTag] = '$mol_object.make()';
})($ || ($ = {}));
//object.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_mem_force = class $mol_mem_force extends Object {
        constructor() {
            super();
            this.$mol_mem_force = true;
        }
        static toString() { return this.name; }
    };
    $mol_mem_force.$mol_mem_force = true;
    $mol_mem_force = __decorate([
        $.$mol_class
    ], $mol_mem_force);
    $.$mol_mem_force = $mol_mem_force;
    class $mol_mem_force_cache extends $mol_mem_force {
    }
    $.$mol_mem_force_cache = $mol_mem_force_cache;
    class $mol_mem_force_update extends $mol_mem_force {
    }
    $.$mol_mem_force_update = $mol_mem_force_update;
    class $mol_mem_force_fail extends $mol_mem_force_cache {
    }
    $.$mol_mem_force_fail = $mol_mem_force_fail;
})($ || ($ = {}));
//force.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_mem(proto, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        Object.defineProperty(proto, name + "()", {
            get: function () {
                return store.get(this);
            }
        });
        const get_cache = (host) => {
            let cache = store.get(host);
            if (cache)
                return cache;
            let cache2 = new $.$mol_atom2;
            cache2.calculate = value.bind(host);
            cache2[Symbol.toStringTag] = `${host}.${name}()`;
            cache2.abort = () => {
                store.delete(host);
                cache2.forget();
                return true;
            };
            $.$mol_owning_catch(host, cache2);
            cache2[$.$mol_object_field] = name;
            store.set(host, cache2);
            return cache2;
        };
        return {
            value(next, force) {
                if (next === undefined) {
                    const cache = get_cache(this);
                    if (force === $.$mol_mem_force_cache)
                        cache.obsolete(Number.NaN);
                    if ($.$mol_atom2.current)
                        return cache.get();
                    else
                        return $.$mol_fiber.run(() => cache.get());
                }
                return $.$mol_fiber.run(() => {
                    if (force === $.$mol_mem_force_fail)
                        return get_cache(this).fail(next);
                    if (force !== $.$mol_mem_force_cache)
                        next = value.call(this, next);
                    return get_cache(this).put(next);
                });
            }
        };
    }
    $.$mol_mem = $mol_mem;
})($ || ($ = {}));
//mem.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $.$mol_object {
        static size(next, force) {
            return next || {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', $.$mol_fiber_root($.$mol_log_group(`$mol_window resize`, () => {
        $mol_window.size(undefined, $.$mol_mem_force_cache);
    })));
})($ || ($ = {}));
//window.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dict_key(value) {
        if (!value)
            return value;
        if (typeof value !== 'object')
            return value;
        if (Array.isArray(value))
            return value.join(' , ');
        if (Object.getPrototypeOf(Object.getPrototypeOf(value)) === null)
            return JSON.stringify(value);
        return value;
    }
    $.$mol_dict_key = $mol_dict_key;
    class $mol_dict extends Map {
        get(key) {
            return super.get($mol_dict_key(key));
        }
        has(key) {
            return super.has($mol_dict_key(key));
        }
        set(key, value) {
            return super.set($mol_dict_key(key), value);
        }
        delete(key) {
            return super.delete($mol_dict_key(key));
        }
        forEach(back, context) {
            return super.forEach((val, key, dict) => {
                if (typeof key === 'string')
                    key = JSON.parse(key);
                return back.call(this, val, key, dict);
            }, context);
        }
        [Symbol.iterator]() {
            const iterator = super[Symbol.iterator]();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    const iteration = iterator.next();
                    if (!iteration.done) {
                        const key = iteration.value[0];
                        if (typeof key === 'string')
                            iteration.value[0] = JSON.parse(key);
                    }
                    return iteration;
                }
            };
        }
    }
    $.$mol_dict = $mol_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_mem_key(proto, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        Object.defineProperty(proto, name + "()", {
            get: function () {
                return store.get(this);
            }
        });
        const get_cache = (host, key) => {
            let dict = store.get(host);
            if (!dict)
                store.set(host, dict = new $.$mol_dict);
            let cache = dict.get(key);
            if (cache)
                return cache;
            let cache2 = new $.$mol_atom2;
            cache2[Symbol.toStringTag] = `${host}.${name}(${JSON.stringify(key)})`;
            cache2.calculate = value.bind(host, key);
            cache2.abort = () => {
                dict.delete(key);
                if (dict.size === 0)
                    store.delete(host);
                cache2.forget();
                return true;
            };
            $.$mol_owning_catch(host, cache2);
            cache2[$.$mol_object_field] = name;
            dict.set(key, cache2);
            return cache2;
        };
        return {
            value(key, next, force) {
                if (next === undefined) {
                    const cache = get_cache(this, key);
                    if (force === $.$mol_mem_force_cache)
                        cache.obsolete();
                    if ($.$mol_atom2.current)
                        return cache.get();
                    else
                        return $.$mol_fiber.run(() => cache.get());
                }
                return $.$mol_fiber.run(() => {
                    if (force === $.$mol_mem_force_fail)
                        return get_cache(this, key).fail(next);
                    if (force !== $.$mol_mem_force_cache)
                        next = value.call(this, key, next);
                    return get_cache(this, key).put(next);
                });
            }
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//key.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_autorun(calculate) {
        return $.$mol_atom2.make(atom => {
            atom.calculate = calculate;
            atom.obsolete_slaves = atom.schedule;
            atom.doubt_slaves = atom.schedule;
            atom[Symbol.toStringTag] = calculate[Symbol.toStringTag] || calculate.name || '$mol_atom2_autorun';
            atom.schedule();
        });
    }
    $.$mol_atom2_autorun = $mol_atom2_autorun;
})($ || ($ = {}));
//autorun.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_defer extends $.$mol_object {
        constructor(run) {
            super();
            this.run = run;
            $mol_defer.add(this);
        }
        destructor() {
            $mol_defer.drop(this);
        }
        static schedule() {
            if (this.timer)
                return;
            this.timer = this.scheduleNative(() => {
                this.timer = null;
                this.run();
            });
        }
        static unschedule() {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = null;
        }
        static add(defer) {
            this.all.push(defer);
            this.schedule();
        }
        static drop(defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        }
        static run() {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.shift();)
                defer.run();
        }
    }
    $mol_defer.all = [];
    $mol_defer.timer = null;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? handler => requestAnimationFrame(handler)
        : handler => setTimeout(handler, 16);
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_view_selection = class $mol_view_selection extends $.$mol_object {
        static focused(next) {
            if (next === undefined)
                return [];
            const parents = [];
            let element = next[0];
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            new $.$mol_defer($.$mol_log2.func(() => {
                const element = $.$mol_atom2_value(() => this.focused())[0];
                if (element)
                    element.focus();
                else
                    $.$mol_dom_context.blur();
            }));
            return parents;
        }
        static focus(event) {
            this.focused([event.target]);
        }
        static blur(event) {
            this.focused([]);
        }
    };
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_log2.method
    ], $mol_view_selection, "focus", null);
    __decorate([
        $.$mol_log2.method
    ], $mol_view_selection, "blur", null);
    $mol_view_selection = __decorate([
        $.$mol_class
    ], $mol_view_selection);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
"use strict";
var $;
(function ($) {
    if ($.$mol_dom_context.document) {
        $.$mol_dom_context.document.addEventListener('focus', (event) => {
            new $.$mol_after_tick($.$mol_fiber_root(() => $.$mol_view_selection.focus(event)));
        }, true);
        $.$mol_dom_context.document.addEventListener('blur', (event) => {
            new $.$mol_after_tick($.$mol_fiber_root(() => $.$mol_view_selection.blur(event)));
        }, true);
    }
})($ || ($ = {}));
//selection.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false)
                el.removeAttribute(name);
            else
                el.setAttribute(name, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//attributes.js.map
;
"use strict";
var $;
(function ($) {
    const cacthed = new WeakMap();
    function $mol_fail_catch(error) {
        if (cacthed.get(error))
            return false;
        cacthed.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//catch.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const cur = style[name];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name] = `${val}px`;
            }
            if (cur !== val)
                style[name] = val;
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//styles.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));
//fields.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));
//children.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_func_name(func) {
        return func.name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//name.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_deprecated(message) {
        return (host, field, descr) => {
            const value = descr.value;
            descr.value = function $mol_deprecated_wrapper(...args) {
                console.warn(`${host.constructor.name}::${field} is deprecated. ${message}`);
                return value.call(this, ...args);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
"use strict";
//extract.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/view/view.css", "[mol_view] {\n\ttransition-property: background-color, height, width, min-height, min-width, max-width, max-height, transform;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tword-break: break-word;\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont: var(--mol_skin_font);\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t135deg,\n\t\trgba(255,220,220,1),\n\t\trgba(255,220,220,1) 11px,\n\t\trgba(255,255,220,1) 10px,\n\t\trgba(255,255,220,1) 20px\n\t);\n\tbackground-size: 28px 28px;\n\tcolor: black;\n}\n[mol_view][mol_view_error] * {\n\tbackground: none;\n}\n\n@keyframes mol_view_wait_move {\n\tfrom {\n\t\tbackground-position: 0 0;\n\t}\n\tto {\n\t\tbackground-position: 200vmax 0;\n\t}\n}\n\n@keyframes mol_view_wait_show {\n\tto {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\thsla( 0 , 0% , 50% , .1 ) 0% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 5% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 45% ,\n\t\t\thsla( 0 , 0% , 50% , .1 ) 50% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 55% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 95% ,\n\t\t\thsla( 0 , 0% , 50% , .1 ) 100%\n\t\t);\n\t\tbackground-size: 200vmax 200vmax;\n\t}\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait_show .5s .5s linear forwards , mol_view_wait_move 1s linear infinite;\n}\n\n[mol_view][mol_view_error=\"Promise\"] * {\n\t\tbackground: none;\n}\n");
})($ || ($ = {}));
//view.css.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $.$mol_object {
        static Root(id) {
            return new this;
        }
        autorun() {
            return $.$mol_atom2_autorun(() => {
                this.dom_tree();
                document.title = this.title();
                return this;
            });
        }
        static autobind() {
            const nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_node(nodes.item(i));
                view.autorun();
            }
        }
        title() {
            return this.constructor.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $.$mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return this.constructor.toString().replace('$', '') || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            const sub = this.sub();
            if (!sub)
                return sub;
            const context = this.$$;
            sub.forEach(child => {
                if (child instanceof $mol_view) {
                    child.$ = context;
                }
            });
            return sub;
        }
        minimal_width() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        }
        minimal_height() {
            return this.content_height();
        }
        content_height() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            const node = next || $.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $.$mol_const('<#' + id + '>');
            $.$mol_dom_render_attributes(node, this.attr_static());
            const events = this.event();
            for (let event_name in events) {
                node.addEventListener(event_name, $.$mol_log2.func($.$mol_fiber_root(events[event_name])), { passive: false });
            }
            return node;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            try {
                $.$mol_dom_render_attributes(node, { mol_view_error: null });
                for (let plugin of this.plugins()) {
                    if (plugin instanceof $.$mol_plugin) {
                        plugin.render();
                    }
                }
                this.render();
            }
            catch (error) {
                const need_catch = $.$mol_fail_catch(error);
                if (need_catch) {
                    $.$mol_dom_render_attributes(node, { mol_view_error: error.name || error.constructor.name });
                }
                if (error instanceof Promise)
                    $.$mol_fail_hidden(error);
                if (need_catch) {
                    try {
                        void (node.innerText = error.message);
                    }
                    catch (e) { }
                    console.error(error);
                }
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            const fields = this.field();
            $.$mol_dom_render_attributes(node, attr);
            $.$mol_dom_render_styles(node, style);
            $.$mol_dom_render_fields(node, fields);
            return node;
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view) ? child.dom_node() : String(child);
            });
            $.$mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        view_names_owned() {
            const names = [];
            let owner = $.$mol_owning_get(this, $mol_view);
            if (owner instanceof $mol_view) {
                const suffix = this[$.$mol_object_field];
                const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (let Class of owner.constructor.view_classes()) {
                    if (suffix in Class.prototype)
                        names.push($.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (let prefix of owner.view_names_owned()) {
                    names.push(prefix + suffix2);
                }
            }
            return names;
        }
        view_names() {
            const names = [];
            for (let name of this.view_names_owned()) {
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            for (let Class of this.constructor.view_classes()) {
                const name = $.$mol_func_name(Class);
                if (!name)
                    continue;
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {};
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return {};
        }
        plugins() {
            return [];
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_span({}, $.$mol_dev_format_native(this), $.$mol_dev_format_auto($.$mol_atom2_value(() => this.sub())));
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "autorun", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "content_height", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $.$mol_deprecated('Use $mol_view::event instead.')
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
"use strict";
var $;
(function ($) {
    if ($.$mol_dom_context.document) {
        const event_name = self.cordova ? 'deviceready' : 'DOMContentLoaded';
        $.$mol_dom_context.document.addEventListener(event_name, $.$mol_fiber_root($.$mol_log2.func((event) => {
            $.$mol_view.autobind();
            $.$mol_defer.run();
        })));
    }
})($ || ($ = {}));
//view.web.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: block;\n}\n\n[mol_list] > * {\n\tdisplay: block;\n}\n");
})($ || ($ = {}));
//list.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_list extends $.$mol_view {
        sub() {
            return this.rows();
        }
        rows() {
            return [];
        }
        Empty() {
            return null;
        }
    }
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            }
            row_offsets() {
                var sub = this.sub();
                let heightLimit = this.$.$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (let child of sub) {
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            }
            row_context(index) {
                return this.$.$mol_ambient({
                    $mol_view_visible_height: () => this.$.$mol_view_visible_height() - this.row_offsets()[index],
                });
            }
            sub_visible() {
                var sub = this.sub();
                if (!sub)
                    return sub;
                for (let i = 0; i < sub.length; ++i) {
                    const child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.$ = this.row_context(i);
                    }
                }
                var limit = this.row_offsets().length;
                var next = [];
                for (let i = 0; i < limit; ++i) {
                    const child = sub[i];
                    if (child == null)
                        continue;
                    next.push(child);
                }
                return next;
            }
            minimal_height() {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach((child) => {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//list.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/card/card.view.css", "[mol_card] {\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tborder-radius: var(--mol_skin_round);\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tflex-direction: column;\n}\n\n[mol_card_content] {\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_skin_round);\n\tmargin: 0;\n}\n\n[mol_card_status] {\n\tbackground: var(--mol_theme_line);\n\ttext-transform: capitalize;\n\tpadding: 0 1rem;\n\tline-height: 2;\n\tmargin: 0;\n}\n\n[mol_card_status_type=\"approved\"] {\n\t--mol_theme_line: hsl(140, 50%, 50%);\n}\n[mol_card_status] {\n\tbackground: var(--mol_theme_line);\n}\n");
})($ || ($ = {}));
//card.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_card extends $.$mol_list {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_card_status_type": this.status() }));
        }
        status() {
            return "";
        }
        rows() {
            return [this.Content(), this.Status()];
        }
        Content() {
            return ((obj) => {
                obj.sub = () => this.content();
                return obj;
            })(new this.$.$mol_view());
        }
        content() {
            return [];
        }
        Status() {
            return ((obj) => {
                obj.minimal_height = () => 30;
                obj.sub = () => [this.status_text()];
                return obj;
            })(new this.$.$mol_view());
        }
        status_text() {
            return this.status();
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_card.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_card.prototype, "Status", null);
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_card extends $.$mol_card {
            rows() {
                return [
                    this.Content(),
                    ...this.status_text() ? [this.Status()] : [],
                ];
            }
        }
        $$.$mol_card = $mol_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//card.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/tiler/tiler.view.css", "[mol_tiler] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n}\n\n[mol_tiler_group] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 2 1 auto;\n\talign-items: stretch;\n}\n\n[mol_tiler_item] {\n\tflex: 1 1 auto;\n\talign-items: stretch;\n\tdisplay: flex;\n}\n");
})($ || ($ = {}));
//tiler.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_tiler extends $.$mol_view {
        sub() {
            return this.items();
        }
        items() {
            return [];
        }
    }
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//tiler.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_tiler extends $.$mol_tiler {
            sub() {
                return this.groupChilds([]);
            }
            groupItems(path) {
                var items = (path.length === 0)
                    ? this.items()
                    : this.groupItems(path.slice(0, path.length - 1));
                if (items.length < 2)
                    return items;
                if (path.length != 0) {
                    var cut = Math.floor(items.length / 2);
                    items = path[path.length - 1]
                        ? items.slice(cut)
                        : items.slice(0, cut);
                }
                return items;
            }
            groupChilds(path) {
                var items = this.groupItems(path);
                if (items.length <= 2)
                    return items.map((_, index) => this.item(path.concat(index)));
                return [
                    this.child(path.concat(0)),
                    this.child(path.concat(1)),
                ];
            }
            child(path) {
                return (this.groupItems(path).length > 1)
                    ? this.group(path)
                    : this.item(path);
            }
            group(path) {
                return $.$mol_view.make({
                    sub: () => this.groupChilds(path)
                });
            }
            item(path) {
                return $.$mol_view.make({
                    sub: () => this.groupItems(path)
                });
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_tiler.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_tiler.prototype, "groupItems", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_tiler.prototype, "groupChilds", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_tiler.prototype, "child", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_tiler.prototype, "group", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_tiler.prototype, "item", null);
        $$.$mol_tiler = $mol_tiler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//tiler.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        let result = {};
        for (let key in target)
            result[key] = target[key];
        for (let key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $.$mol_object {
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        static href(next, force) {
            if (next === undefined)
                return $.$mol_dom_context.location.href;
            history.replaceState(history.state, $.$mol_dom_context.document.title, next);
            return next;
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#/)[1] || '';
            var chunks = href.split(/[\/\?#&;]/g);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    continue;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), { [key]: next });
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link($.$mol_merge_dict(this.dict_cut(Object.keys(next)), next));
        }
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                const val = next[key];
                chunks.push([key].concat(val ? [val] : []).map(this.encode).join('='));
            }
            return new URL('#' + chunks.join('/'), $.$mol_dom_context.location.href).toString();
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
    self.addEventListener('hashchange', $.$mol_fiber_root($.$mol_log_group('$mol_state_arg hashchange', (event) => {
        $mol_state_arg.href($.$mol_dom_context.location.href);
    })));
})($ || ($ = {}));
//arg.web.js.map
;
"use strict";
//exclude.js.map
;
"use strict";
//omit.js.map
;
"use strict";
//class.js.map
;
"use strict";
//element.js.map
;
"use strict";
//properties.js.map
;
"use strict";
//definition.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config) {
        let rules = [];
        const make_class = (prefix, suffix, config) => {
            const props = [];
            for (const key of Object.keys(config).reverse()) {
                if (/^[a-z]/.test(key)) {
                    const name = key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
                    const val = config[key];
                    props.push(`\t${name}: ${val};\n`);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix + '_' + key.toLowerCase(), suffix, config[key]);
                }
                else if (key[0] === '$') {
                    make_class(prefix + '] ' + key.replace('$', '['), suffix, config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type in types) {
                        make_class(prefix + '] > ' + type.replace('$', '['), suffix, types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name in attrs) {
                        for (let val in attrs[name]) {
                            make_class(prefix, suffix + '[' + name + '=' + JSON.stringify(val) + ']', attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media') {
                    const media = config[key];
                    for (let query in media) {
                        rules.push('}\n');
                        make_class(prefix, suffix, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else {
                    make_class(prefix, suffix + key, config[key]);
                }
            }
            if (props.length) {
                rules.push(`${prefix}${suffix} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class(Component.name.replace('$', '['), ']', config);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));
//sheet.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_style_define(Component, config) {
        return $.$mol_style_attach(Component.name, $.$mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));
//define.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_link extends $.$mol_view {
        minimal_height() {
            return 40;
        }
        dom_name() {
            return "a";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "href": this.uri(), "title": this.hint(), "target": this.target(), "download": this.file_name(), "mol_link_current": this.current() }));
        }
        uri() {
            return "";
        }
        hint() {
            return "";
        }
        target() {
            return "_self";
        }
        file_name() {
            return "";
        }
        current() {
            return false;
        }
        sub() {
            return [this.title()];
        }
        arg() {
            return ({});
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "click": (event) => this.click(event) }));
        }
        click(event, force) {
            return this.event_click(event);
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_link.prototype, "click", null);
    __decorate([
        $.$mol_mem
    ], $mol_link.prototype, "event_click", null);
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            current() {
                if (this.uri() === this.$.$mol_state_arg.href())
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) !== args[key])
                        return false;
                }
                return true;
            }
            event_click(event) {
                if (!event || event.defaultPrevented)
                    return;
                this.focused(false);
            }
            file_name() {
                return null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $.$mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
        $.$mol_style_define($mol_link, {
            textDecoration: 'none',
            color: "var(--mol_theme_control)",
            stroke: 'currentColor',
            cursor: 'pointer',
            padding: '.5rem',
            boxSizing: 'border-box',
            position: 'relative',
            ':hover': {
                backgroundColor: "var(--mol_theme_hover)",
            },
            ':focus': {
                outline: 'none',
                backgroundColor: "var(--mol_theme_hover)",
            },
            '@': {
                mol_link_current: {
                    'true': {
                        backgroundColor: "var(--mol_theme_current)",
                        color: "var(--mol_theme_text)",
                    }
                }
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//link.view.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tbackground-color: none;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n}\n[mol_button]:focus {\n\toutline: none;\n}\n\n[mol_button_typed] {\n\tjustify-content: center;\n\talign-content: center;\n\talign-items: center;\n\tvertical-align: middle;\n\ttext-align: center;\n\tpadding: .5rem 1rem;\n\tborder-radius: var(--mol_skin_round);\n}\n\n[mol_button_typed][disabled] {\n\tcolor: var(--mol_theme_text);\n\tpointer-events: none;\n}\n\n[mol_button_major] {\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n}\n\n[mol_button_minor] {\n\tcolor: var(--mol_theme_control);\n}\n\n[mol_button_major][disabled] {\n\topacity: .5;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus {\n\tcursor: pointer;\n\tbackground-color: var(--mol_theme_hover);\n}\n");
})($ || ($ = {}));
//button.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_button extends $.$mol_view {
        enabled() {
            return true;
        }
        minimal_height() {
            return 40;
        }
        click(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "click": (event) => this.event_activate(event), "keypress": (event) => this.event_key_press(event) }));
        }
        event_activate(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_key_press(event, force) {
            return (event !== void 0) ? event : null;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index(), "title": this.hint() }));
        }
        disabled() {
            return false;
        }
        tab_index() {
            return 0;
        }
        hint() {
            return "";
        }
        sub() {
            return [this.title()];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "click", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                this.event_click(next);
                this.click(next);
            }
            event_key_press(event) {
                if (event.keyCode === $.$mol_keyboard_code.enter) {
                    return this.event_activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//button.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_button_typed extends $.$mol_button {
    }
    $.$mol_button_typed = $mol_button_typed;
})($ || ($ = {}));
(function ($) {
    class $mol_button_major extends $.$mol_button_typed {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_theme": "$mol_theme_accent" }));
        }
    }
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    class $mol_button_minor extends $.$mol_button_typed {
    }
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $.$mol_object2 {
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));
//timeout.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $.$mol_object {
        static now(precision = 0, next) {
            if (precision > 0) {
                new $.$mol_after_timeout(precision, $.$mol_atom2.current.fresh);
            }
            else {
                new $.$mol_after_frame($.$mol_atom2.current.fresh);
            }
            return Date.now();
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));
//time.js.map
;
"use strict";
var $;
(function ($) {
    let canvas;
    function $mol_font_canvas(next = canvas) {
        if (!next)
            next = $.$mol_dom_context.document.createElement('canvas').getContext('2d');
        return canvas = next;
    }
    $.$mol_font_canvas = $mol_font_canvas;
})($ || ($ = {}));
//canvas.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_font_measure(size, face, text) {
        const canvas = $.$mol_font_canvas();
        canvas.font = size + 'px ' + face;
        return canvas.measureText(text).width;
    }
    $.$mol_font_measure = $mol_font_measure;
})($ || ($ = {}));
//measure.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg extends $.$mol_view {
        dom_name() {
            return "svg";
        }
        dom_name_space() {
            return "http://www.w3.org/2000/svg";
        }
        text_width(text, force) {
            return (text !== void 0) ? text : 0;
        }
        font_size() {
            return 16;
        }
        font_family() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_svg.prototype, "text_width", null);
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
//svg.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $.$mol_state_time.now();
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
            text_width(text) {
                return $.$mol_font_measure(this.font_size(), this.font_family(), text);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $.$mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $.$mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//svg.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//root.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_root extends $.$mol_svg {
        dom_name() {
            return "svg";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "viewBox": this.view_box(), "preserveAspectRatio": this.aspect() }));
        }
        view_box() {
            return "0 0 100 100";
        }
        aspect() {
            return "xMidYMid";
        }
    }
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
//root.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_path extends $.$mol_svg {
        dom_name() {
            return "path";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "d": this.geometry() }));
        }
        geometry() {
            return "";
        }
    }
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
//path.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1em;\n\tflex: 0 0 auto;\n\tvertical-align: -.1em;\n\twill-change: transform;\n}\n");
})($ || ($ = {}));
//icon.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        minimal_width() {
            return 16;
        }
        minimal_height() {
            return 16;
        }
        sub() {
            return [this.Path()];
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => this.path();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        path() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_attach extends $.$mol_icon {
        path() {
            return "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z";
        }
    }
    $.$mol_icon_attach = $mol_icon_attach;
})($ || ($ = {}));
//attach.view.tree.js.map
;
"use strict";
var cordova;
var $;
(function ($) {
    $.$mol_cordova = cordova || {
        plugins: {
            barcodeScanner: null
        }
    };
    function $mol_cordova_camera() {
        return navigator['camera'];
    }
    $.$mol_cordova_camera = $mol_cordova_camera;
})($ || ($ = {}));
//cordova.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/attach/attach.view.css", "[mol_attach_content] {\n\tjustify-content: flex-start;\n}\n\n[mol_attach_item] {\n\twidth: 5rem;\n\theight: 5rem;\n\tbackground: center no-repeat;\n\tborder-radius: var(--mol_skin_round);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tbackground-size: cover;\n\tflex: 1 0 5rem;\n}\n\n[mol_attach_add] {\n\tflex: 1 0 5rem;\n\twidth: 5rem;\n\theight: 5rem;\n\toverflow: hidden;\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tpadding: 0;\n\tposition: relative;\n\tmargin: 0;\n}\n\n[mol_attach_add_icon] {\n\twidth: 50%;\n\theight: 50%;\n}\n\n[mol_attach_add_input] {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tcursor: pointer;\n\topacity: 0;\n}\n");
})($ || ($ = {}));
//attach.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_attach extends $.$mol_card {
        Content() {
            return ((obj) => {
                obj.items = () => this.content();
                return obj;
            })(new this.$.$mol_tiler());
        }
        content() {
            return [];
        }
        items(val, force) {
            return (val !== void 0) ? val : [];
        }
        Add() {
            return ((obj) => {
                obj.file_new = (val) => this.attach_new(val);
                return obj;
            })(new this.$.$mol_attach_add());
        }
        attach_new(val, force) {
            return (val !== void 0) ? val : "";
        }
        Item(id) {
            return ((obj) => {
                obj.title = () => this.attach_title();
                return obj;
            })(new this.$.$mol_attach_item());
        }
        attach_title() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_attach.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach.prototype, "items", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach.prototype, "Add", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_attach.prototype, "Item", null);
    $.$mol_attach = $mol_attach;
})($ || ($ = {}));
(function ($) {
    class $mol_attach_item extends $.$mol_link {
        url_thumb(val, force) {
            return (val !== void 0) ? val : "";
        }
        uri(val, force) {
            return this.url_load(val);
        }
        url_load(val, force) {
            return (val !== void 0) ? val : "";
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "backgroundImage": this.style_bg() }));
        }
        style_bg() {
            return "";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "download": this.title() }));
        }
        title() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_attach_item.prototype, "url_thumb", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_item.prototype, "uri", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_item.prototype, "url_load", null);
    $.$mol_attach_item = $mol_attach_item;
})($ || ($ = {}));
(function ($) {
    class $mol_attach_add extends $.$mol_button_minor {
        minimal_height() {
            return 60;
        }
        file_new(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return [this.Icon(), this.Input()];
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_attach());
        }
        Input() {
            return ((obj) => {
                obj.event_capture = (val) => this.event_capture(val);
                obj.event_picked = (val) => this.event_picked(val);
                return obj;
            })(new this.$.$mol_attach_add_input());
        }
        event_capture(val, force) {
            return (val !== void 0) ? val : null;
        }
        event_picked(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_attach_add.prototype, "file_new", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add.prototype, "event_picked", null);
    $.$mol_attach_add = $mol_attach_add;
})($ || ($ = {}));
(function ($) {
    class $mol_attach_add_input extends $.$mol_view {
        dom_name() {
            return "input";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "type": this.type(), "accept": this.accept(), "multiple": this.multiple() }));
        }
        type() {
            return "file";
        }
        accept() {
            return "image/*;capture=camera";
        }
        multiple() {
            return true;
        }
        event_click(val, force) {
            return this.event_capture(val);
        }
        event_capture(val, force) {
            return (val !== void 0) ? val : null;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "change": (val) => this.event_picked(val) }));
        }
        event_picked(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_attach_add_input.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add_input.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_add_input.prototype, "event_picked", null);
    $.$mol_attach_add_input = $mol_attach_add_input;
})($ || ($ = {}));
//attach.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_attach extends $.$mol_attach {
            attach_new(next) {
                const items = this.items();
                const item = this.Item(items.length);
                item.url_thumb(next);
                item.url_load(next);
                this.items(items.concat(item));
            }
            content() {
                return [...this.items(), this.Add()];
            }
        }
        $$.$mol_attach = $mol_attach;
        class $mol_attach_item extends $.$mol_attach_item {
            style_bg() {
                return `url("${this.url_thumb()}")`;
            }
        }
        $$.$mol_attach_item = $mol_attach_item;
        class $mol_attach_add extends $.$mol_attach_add {
            file_new(next, force) {
                return next;
            }
            event_capture(next) {
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture((url) => {
                    this.file_new(url);
                }, (error) => {
                    this.file_new(error, $.$mol_mem_force_fail);
                }, {
                    quality: 50
                });
            }
            event_picked(next) {
                var files = [].slice.call(next.target.files);
                for (var file of files) {
                    this.file_new(URL.createObjectURL(file));
                }
            }
        }
        $$.$mol_attach_add = $mol_attach_add;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//attach.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/demo/small/small.view.css", "[mol_demo_small] {\n\tmax-width: 100%;\n\tposition: relative;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\tbox-sizing: border-box;\n\tflex: 0 0 auto;\n\talign-self: flex-start;\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tmargin: .5rem;\n\tpadding: .5rem;\n}\n\n[mol_demo_small] > * {\n\tmargin: .5rem;\n}\n");
})($ || ($ = {}));
//small.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_demo_small extends $.$mol_view {
    }
    $.$mol_demo_small = $mol_demo_small;
})($ || ($ = {}));
//small.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next, force) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => {
        if (!event.key)
            return;
        $.$mol_state_local.value(event.key, undefined, $.$mol_mem_force_cache);
    });
})($ || ($ = {}));
//local.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $.$mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror')[0];
        if (error)
            throw new Error(error.textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//parse.js.map
;
"use strict";
var $node = $node || {};
//node.web.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_fetch_response = class $mol_fetch_response extends $.$mol_object2 {
        constructor(native) {
            super();
            this.native = native;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const native = this.native;
            const mime = native.headers.get('content-type') || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            const response = this.native;
            const parse = $.$mol_fiber_sync(response.json);
            return parse.call(response);
        }
        buffer() {
            const response = this.native;
            const parse = $.$mol_fiber_sync(response.arrayBuffer);
            return parse.call(response);
        }
        xml() {
            return $.$mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $.$mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $.$mol_dom_parse(this.text(), 'text/html');
        }
    };
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "json", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "buffer", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch_response.prototype, "html", null);
    $mol_fetch_response = __decorate([
        $.$mol_class
    ], $mol_fetch_response);
    $.$mol_fetch_response = $mol_fetch_response;
    let $mol_fetch = class $mol_fetch extends $.$mol_object2 {
        static response(input, init) {
            const response = this.request(input, init);
            if (Math.floor(response.status / 100) === 2)
                return new $mol_fetch_response(response);
            throw new Error(response.statusText || `HTTP Error ${response.status}`);
        }
        static stream(input, init) {
            return this.response(input, init).stream();
        }
        static text(input, init) {
            return this.response(input, init).text();
        }
        static json(input, init) {
            return this.response(input, init).json();
        }
        static buffer(input, init) {
            this.response(input, init).buffer();
        }
        static xml(input, init) {
            return this.response(input, init).xml();
        }
        static xhtml(input, init) {
            return this.response(input, init).xhtml();
        }
        static html(input, init) {
            return this.response(input, init).html();
        }
    };
    $mol_fetch.request = $.$mol_fiber_sync((input, init = {}) => {
        if (typeof AbortController === 'function') {
            var controller = new AbortController();
            init.signal = controller.signal;
            const fiber = $.$mol_fiber.current;
            fiber.abort = () => {
                if (fiber.cursor === -2)
                    return true;
                controller.abort();
                return true;
            };
        }
        let native = $.$mol_dom_context.fetch;
        if (!native)
            native = $node['node-fetch'];
        return native(input, init);
    });
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "response", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "stream", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "text", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "json", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "buffer", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "xml", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "xhtml", null);
    __decorate([
        $.$mol_fiber.method
    ], $mol_fetch, "html", null);
    $mol_fetch = __decorate([
        $.$mol_class
    ], $mol_fetch);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));
//fetch.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_file extends $.$mol_object {
        static absolute(path) {
            return $mol_file.make({
                path: $.$mol_const(path)
            });
        }
        static relative(path) {
            return this.absolute(new URL(path, this.base).toString());
        }
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        }
        content(next, force) {
            return $.$mol_fetch.text(this.path());
        }
        resolve(path) {
            let res = this.path() + '/' + path;
            while (true) {
                let prev = res;
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            return this.constructor.absolute(res);
        }
        relate(base = this.constructor.relative('.')) {
            throw new Error('Not implemented yet');
        }
    }
    $mol_file.base = $.$mol_dom_context.document
        ? new URL('.', $.$mol_dom_context.document.currentScript['src']).toString()
        : '';
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.web.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $.$mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse($.$mol_file.relative(`web.locale=${lang}.json`).content().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ('then' in error)
                    $.$mol_fail_hidden(error);
                const def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        }
        static text(key) {
            for (let lang of [this.lang(), 'en']) {
                const text = this.texts(lang)[key];
                if (text)
                    return text;
                console.warn(`Not translated to "${lang}": ${key}`);
            }
            return `<${key}>`;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "text", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_attach_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_attach_demo_title");
        }
        sub() {
            return [this.Filled()];
        }
        Filled() {
            return ((obj) => {
                obj.items = (val) => this.filled_items(val);
                return obj;
            })(new this.$.$mol_attach());
        }
        filled_items(val, force) {
            return (val !== void 0) ? val : [this.Item1(), this.Item2(), this.Item3()];
        }
        Item1() {
            return ((obj) => {
                obj.url_thumb = () => "mol/logo/logo.svg";
                obj.url_load = () => "logo/logo.svg";
                return obj;
            })(new this.$.$mol_attach_item());
        }
        Item2() {
            return ((obj) => {
                obj.url_thumb = () => "mol/logo/logo.svg";
                obj.url_load = () => "logo/logo.svg";
                return obj;
            })(new this.$.$mol_attach_item());
        }
        Item3() {
            return ((obj) => {
                obj.url_thumb = () => "mol/logo/logo.svg";
                obj.url_load = () => "logo/logo.svg";
                return obj;
            })(new this.$.$mol_attach_item());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_attach_demo.prototype, "Filled", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_demo.prototype, "filled_items", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_demo.prototype, "Item1", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_demo.prototype, "Item2", null);
    __decorate([
        $.$mol_mem
    ], $mol_attach_demo.prototype, "Item3", null);
    $.$mol_attach_demo = $mol_attach_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/bar/bar.view.css", "[mol_bar] {\n\tdisplay: flex;\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tborder-radius: var(--mol_skin_round);\n}\n\n[mol_bar] > * {\n\tborder-radius: 0;\n}\n\n[mol_bar] > *:first-child {\n\tborder-top-left-radius: var(--mol_skin_round);\n\tborder-bottom-left-radius: var(--mol_skin_round);\n}\n\n[mol_bar] > *:not(:first-child) {\n\tmargin-left: 1px;\n}\n\n[mol_bar] > *:last-child {\n\tborder-top-right-radius: var(--mol_skin_round);\n\tborder-bottom-right-radius: var(--mol_skin_round);\n}\n");
})($ || ($ = {}));
//bar.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_bar extends $.$mol_view {
    }
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_skin_round);\n\twhite-space: nowrap;\n\toverflow: hidden;\n\tpadding: .5rem 1rem;\n\ttext-align: left;\n\tposition: relative;\n\tz-index: 0;\n\tfont: inherit;\n\tflex: 0 1 auto;\n\twidth: 100%;\n\tbackground: var(--mol_theme_field);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tmargin: 0;\n}\n\n[mol_string]:disabled {\n\tbackground-color: transparent;\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: 1;\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_focus);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//string.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_string extends $.$mol_view {
        dom_name() {
            return "input";
        }
        enabled() {
            return true;
        }
        debounce() {
            return 0;
        }
        minimal_height() {
            return 40;
        }
        autocomplete() {
            return false;
        }
        field() {
            return (Object.assign(Object.assign({}, super.field()), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type(), "spellcheck": this.spellcheck(), "autocomplete": this.autocomplete_native() }));
        }
        disabled() {
            return false;
        }
        value_changed(val, force) {
            return this.value(val);
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return "";
        }
        type(val, force) {
            return (val !== void 0) ? val : "text";
        }
        spellcheck() {
            return false;
        }
        autocomplete_native() {
            return "";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "maxlength": this.length_max() }));
        }
        length_max() {
            return Infinity;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "input": (event) => this.event_change(event), "keydown": (event) => this.event_key_press(event) }));
        }
        event_change(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_key_press(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "event_change", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "event_key_press", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                this.value(next.target.value);
            }
            event_key_press(next) {
                if (!next)
                    return;
                if (next.keyCode === $.$mol_keyboard_code.enter) {
                    this.value(next.target.value);
                }
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
        }
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//string.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\talign-items: flex-start;\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tpadding: .5rem;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n");
})($ || ($ = {}));
//check.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check extends $.$mol_button_minor {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        }
        checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        sub() {
            return [this.Icon(), this.label()];
        }
        Icon() {
            return null;
        }
        label() {
            return [this.Title()];
        }
        Title() {
            return ((obj) => {
                obj.sub = () => [this.title()];
                return obj;
            })(new this.$.$mol_view());
        }
        title() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check.prototype, "Title", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            event_click(next) {
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            }
            sub() {
                return [
                    ...$.$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//check.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_tick extends $.$mol_icon {
        path() {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        }
    }
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/check/box/box.view.css", "[mol_check_box_icon] {\n\tmargin: .25rem;\n\tborder-radius: var(--mol_skin_round);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_check]:not([mol_check_checked]) > [mol_check_box_icon] {\n\tfill: transparent;\n}\n\n[mol_check]:not([disabled]) > [mol_check_box_icon] {\n\tbackground: var(--mol_theme_field);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));
//box.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_box extends $.$mol_check {
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_tick());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_bar_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_bar_demo_title");
        }
        sub() {
            return [this.Two(), this.Three()];
        }
        Two() {
            return ((obj) => {
                obj.sub = () => [this.Two_mail(), this.Two_submit()];
                return obj;
            })(new this.$.$mol_bar());
        }
        Two_mail() {
            return ((obj) => {
                obj.hint = () => this.mail_hint();
                obj.value = (val) => this.mail(val);
                return obj;
            })(new this.$.$mol_string());
        }
        mail_hint() {
            return "E-mail";
        }
        mail(val, force) {
            return (val !== void 0) ? val : "";
        }
        Two_submit() {
            return ((obj) => {
                obj.title = () => this.submit_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        submit_title() {
            return "Submit";
        }
        Three() {
            return ((obj) => {
                obj.sub = () => [this.Three_mail(), this.Three_confirm(), this.Three_submit()];
                return obj;
            })(new this.$.$mol_bar());
        }
        Three_mail() {
            return ((obj) => {
                obj.hint = () => this.mail_hint();
                obj.value = (val) => this.mail(val);
                return obj;
            })(new this.$.$mol_string());
        }
        Three_confirm() {
            return ((obj) => {
                obj.title = () => this.confirm_title();
                obj.checked = (val) => this.confirmed(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        confirm_title() {
            return "Confirm";
        }
        confirmed(val, force) {
            return (val !== void 0) ? val : false;
        }
        Three_submit() {
            return ((obj) => {
                obj.title = () => this.submit_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Two", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Two_mail", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "mail", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Two_submit", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Three", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Three_mail", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Three_confirm", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "confirmed", null);
    __decorate([
        $.$mol_mem
    ], $mol_bar_demo.prototype, "Three_submit", null);
    $.$mol_bar_demo = $mol_bar_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/portion/portion.view.css", "[mol_portion] {\n\tdisplay: inline-flex;\n\tflex: 0 1 8rem;\n\twidth: 8rem;\n\tmax-height: calc( 1rem + 1.5em );\n\tmin-height: .5rem;\n\talign-self: stretch;\n\tvertical-align: inherit;\n\tborder-radius: var(--mol_skin_round);\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_portion_indicator] {\n\tbackground-color: var(--mol_skin_base);\n\tcolor: var(--mol_theme_control);\n\tborder-radius: var(--mol_skin_round);\n}\n");
})($ || ($ = {}));
//portion.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_portion_indicator extends $.$mol_view {
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "width": this.width_style() }));
        }
        width_style() {
            return "0";
        }
    }
    $.$mol_portion_indicator = $mol_portion_indicator;
})($ || ($ = {}));
(function ($) {
    class $mol_portion extends $.$mol_view {
        portion() {
            return 0;
        }
        sub() {
            return [this.indicator()];
        }
        indicator() {
            return ((obj) => {
                obj.width_style = () => this.indicator_width_style();
                return obj;
            })(new this.$.$mol_portion_indicator());
        }
        indicator_width_style() {
            return "0";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_portion.prototype, "indicator", null);
    $.$mol_portion = $mol_portion;
})($ || ($ = {}));
//portion.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_portion extends $.$mol_portion {
            indicator_width_style() {
                return this.portion() * 100 + '%';
            }
        }
        $$.$mol_portion = $mol_portion;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//portion.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_scroll extends $.$mol_view {
        minimal_height() {
            return 0;
        }
        field() {
            return (Object.assign(Object.assign({}, super.field()), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        }
        scroll_top(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_left(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_bottom(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_right(val, force) {
            return (val !== void 0) ? val : 0;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "scroll": (event) => this.event_scroll(event) }));
        }
        event_scroll(event, force) {
            return (event !== void 0) ? event : null;
        }
        Strut() {
            return ((obj) => {
                obj.style = () => ({
                    "transform": this.strut_transform(),
                });
                return obj;
            })(new this.$.$mol_view());
        }
        strut_transform() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "event_scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "Strut", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function $mol_scroll_top() {
            return 0;
        }
        $$.$mol_scroll_top = $mol_scroll_top;
        function $mol_scroll_left() {
            return 0;
        }
        $$.$mol_scroll_left = $mol_scroll_left;
        function $mol_scroll_moving() {
            return false;
        }
        $$.$mol_scroll_moving = $mol_scroll_moving;
        class $mol_scroll extends $.$mol_scroll {
            scroll_bottom(next) {
                return next || 0;
            }
            scroll_right(next) {
                return next || 0;
            }
            event_scroll(next) {
                const el = this.dom_node();
                const top = Math.max(0, el.scrollTop);
                const left = Math.max(0, el.scrollLeft);
                this.scroll_top(top);
                this.scroll_left(left);
                this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
            }
            get $$() {
                return this.$.$mol_ambient({
                    $mol_view_visible_height: () => {
                        const sizeWin = $.$mol_window.size();
                        const limit = this.$.$mol_view_visible_height();
                        return this.scroll_top() + Math.min(sizeWin.height, limit);
                    },
                    $mol_view_visible_width: () => {
                        const sizeWin = $.$mol_window.size();
                        const limit = this.$.$mol_view_visible_width();
                        return this.scroll_left() + Math.min(sizeWin.width, limit);
                    },
                    $mol_scroll_top: () => this.scroll_top(),
                    $mol_scroll_left: () => this.scroll_left(),
                });
            }
            strut_transform() {
                return `translate3d( 0 , ${this.content_height()}px , 0 )`;
            }
            sub_visible() {
                const sub = [
                    ...(this.sub() || []),
                    this.Strut(),
                ];
                const context = this.$$;
                sub.forEach(child => {
                    if (child instanceof $.$mol_view) {
                        child.$ = context;
                    }
                });
                return sub;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_atom2_field
        ], $mol_scroll.prototype, "$$", null);
        $$.$mol_scroll = $mol_scroll;
        $.$mol_style_define($mol_scroll, {
            display: 'block',
            overflow: 'auto',
            flex: '1 1 auto',
            alignSelf: 'stretch',
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            transform: 'translateZ(0)',
            boxShadow: `inset 0 0 0 .5px ${"var(--mol_theme_line)"}`,
            maxHeight: '100%',
            maxWidth: '100%',
            webkitOverflowScrolling: 'touch',
            background: 'none !important',
            '::-webkit-scrollbar': {
                width: '.5rem',
                height: '.5rem',
            },
            '::-webkit-scrollbar-corner': {
                background: "var(--mol_theme_line)",
            },
            '::-webkit-scrollbar-track': {
                background: "var(--mol_theme_line)",
            },
            '::-webkit-scrollbar-thumb': {
                background: "var(--mol_theme_control)",
            },
            '>': {
                $mol_view: {
                    transform: 'translateZ(0)',
                }
            },
            Strut: {
                position: 'absolute',
                top: '0',
                display: 'block',
                padding: '1px 1px 0 0',
                margin: '-1px 0 0 0',
                zIndex: '0',
                transition: 'none',
            },
            '@media': {
                'print': {
                    overflow: 'visible',
                }
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: 1;\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n}\n\n[mol_float_scrolling] {\n\topacity: 0;\n\ttransition-duration: 0;\n}\n");
})($ || ($ = {}));
//float.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_float extends $.$mol_view {
    }
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//float.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron extends $.$mol_icon {
        path() {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        }
    }
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n}\n\n[mol_check_expand][disabled] [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin: .25rem 0;\n}\n[mol_check_expand]:not([mol_check_checked]) > [mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n[mol_check_expand][mol_check_checked] > [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand]:hover > [mol_check_expand_icon] {\n\ttransform: scale(1.25);\n}\n\n[mol_check_expand][mol_check_checked]:hover > [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg) scale(1.25);\n}\n\n[mol_check_box_icon] + div:not(:empty) {\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));
//expand.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_expand extends $.$mol_check {
        minimal_height() {
            return 32;
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_chevron());
        }
        level() {
            return 0;
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "paddingLeft": this.level_style() }));
        }
        level_style() {
            return "0px";
        }
        checked(val, force) {
            return this.expanded(val);
        }
        expanded(val, force) {
            return (val !== void 0) ? val : false;
        }
        enabled() {
            return this.expandable();
        }
        expandable() {
            return false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "expanded", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//expand.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1.25 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//expand.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer_low] {\n\topacity: 0.66;\n}\n");
})($ || ($ = {}));
//dimmer.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_dimmer extends $.$mol_view {
        haystack() {
            return "";
        }
        needle() {
            return "";
        }
        sub() {
            return this.parts();
        }
        parts() {
            return [];
        }
        Low(id) {
            return ((obj) => {
                obj.sub = () => [this.string(id)];
                return obj;
            })(new this.$.$mol_view());
        }
        string(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_dimmer.prototype, "Low", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? strings[index] : this.Low(index));
                }
                return chunks;
            }
            strings() {
                return this.haystack().split(new RegExp(`(${this.needle()})`, 'gi'));
            }
            string(index) {
                return this.strings()[index];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 1 1 auto;\n\tposition: relative;\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: block; /** prevent full repaint on scroll **/\n\tposition: relative;\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\ttransform: translateZ(0);\n\tpadding: 0 1rem;\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n}\n\n[mol_grid_head] {\n\ttransform: none;\n}\n\n[mol_grid_head] > * {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_grid_cell_number] {\n\ttext-align: right;\n}\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));
//grid.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_grid extends $.$mol_scroll {
        row_ids() {
            return [];
        }
        row_id(index) {
            return null;
        }
        col_ids() {
            return [];
        }
        records() {
            return ({});
        }
        record(id) {
            return null;
        }
        hierarchy() {
            return null;
        }
        hierarchy_col() {
            return "";
        }
        sub() {
            return [this.Table()];
        }
        Table() {
            return ((obj) => {
                obj.offset = () => this.gap_top();
                obj.sub = () => this.rows_visible();
                return obj;
            })(new this.$.$mol_grid_table());
        }
        gap_top() {
            return 0;
        }
        rows_visible() {
            return [];
        }
        rows() {
            return [];
        }
        Head() {
            return ((obj) => {
                obj.height = () => this.row_height();
                obj.cells = () => this.head_cells();
                return obj;
            })(new this.$.$mol_grid_row());
        }
        row_height() {
            return 40;
        }
        head_cells() {
            return [];
        }
        Row(id) {
            return ((obj) => {
                obj.height = () => this.row_height();
                obj.cells = () => this.cells(id);
                return obj;
            })(new this.$.$mol_grid_row());
        }
        cells(id) {
            return [];
        }
        Cell(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view());
        }
        cell(id) {
            return null;
        }
        Cell_text(id) {
            return ((obj) => {
                obj.sub = () => this.cell_content_text(id);
                return obj;
            })(new this.$.$mol_grid_cell());
        }
        cell_content_text(id) {
            return this.cell_content(id);
        }
        cell_content(id) {
            return [];
        }
        Cell_number(id) {
            return ((obj) => {
                obj.sub = () => this.cell_content_number(id);
                return obj;
            })(new this.$.$mol_grid_number());
        }
        cell_content_number(id) {
            return this.cell_content(id);
        }
        Col_head(id) {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => this.col_head_content(id);
                return obj;
            })(new this.$.$mol_float());
        }
        col_head_content(id) {
            return [];
        }
        Cell_branch(id) {
            return ((obj) => {
                obj.level = () => this.cell_level(id);
                obj.label = () => this.cell_content(id);
                obj.expanded = (val) => this.cell_expanded(id, val);
                return obj;
            })(new this.$.$mol_check_expand());
        }
        cell_level(id) {
            return 0;
        }
        cell_expanded(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        Cell_content(id) {
            return [this.Cell_dimmer(id)];
        }
        Cell_dimmer(id) {
            return ((obj) => {
                obj.needle = () => this.needle();
                obj.haystack = () => this.cell_value(id);
                return obj;
            })(new this.$.$mol_dimmer());
        }
        needle() {
            return "";
        }
        cell_value(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $.$mol_mem
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_table extends $.$mol_view {
        dom_name() {
            return "table";
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "top": this.offset() }));
        }
        offset() {
            return 0;
        }
    }
    $.$mol_grid_table = $mol_grid_table;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_gap extends $.$mol_view {
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "top": this.offset() }));
        }
        offset() {
            return 0;
        }
    }
    $.$mol_grid_gap = $mol_grid_gap;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_row extends $.$mol_view {
        dom_name() {
            return "tr";
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "height": this.height() }));
        }
        height() {
            return 40;
        }
        sub() {
            return this.cells();
        }
        cells() {
            return [];
        }
    }
    $.$mol_grid_row = $mol_grid_row;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_cell extends $.$mol_view {
        dom_name() {
            return "td";
        }
    }
    $.$mol_grid_cell = $mol_grid_cell;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_number extends $.$mol_grid_cell {
    }
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//grid.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            rows_visible() {
                const rows = this.rows();
                const view_window = this.view_window();
                return [
                    this.Head(),
                    ...rows.slice(view_window.top, view_window.bottom),
                ];
            }
            rows_visible_max() {
                return Math.ceil(this.$.$mol_view_visible_height() / this.row_height());
            }
            view_window() {
                const rows = this.rows();
                const count = rows.length;
                const context = this.$$;
                const scrollTop = context.$mol_scroll_top();
                const top = Math.max(0, Math.floor(scrollTop / this.row_height()) - 1);
                const bottom = Math.min(count, top + this.rows_visible_max());
                return { top, bottom, count };
            }
            gap_top() {
                const view_window = this.view_window();
                return view_window.top * this.row_height();
            }
            height() {
                const view_window = this.view_window();
                return view_window.count * this.row_height();
            }
            content_height() {
                return this.rows().length * this.row_height();
            }
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return row_id.length < 3;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows_visible", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows_visible_max", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "view_window", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
        class $mol_grid_table extends $.$mol_grid_table {
            get $$() {
                return this.$.$mol_ambient({
                    $mol_scroll_top: () => this.$.$mol_scroll_top() - this.offset(),
                });
            }
        }
        __decorate([
            $.$mol_atom2_field
        ], $mol_grid_table.prototype, "$$", null);
        $$.$mol_grid_table = $mol_grid_table;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//grid.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_sort extends $.$mol_icon {
        path() {
            return "M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z";
        }
    }
    $.$mol_icon_sort = $mol_icon_sort;
})($ || ($ = {}));
//sort.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_sort_asc extends $.$mol_icon {
        path() {
            return "M10,11V13H18V11H10M10,5V7H14V5H10M10,17V19H22V17H10M6,7H8.5L5,3.5L1.5,7H4V20H6V7Z";
        }
    }
    $.$mol_icon_sort_asc = $mol_icon_sort_asc;
})($ || ($ = {}));
//asc.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/bench/bench.view.css", "[mol_bench] {\n\toverflow: auto;\n}\n\n[mol_bench_col_head] {\n\tcursor: pointer;\n}\n\n[mol_bench_cell_number] {\n\twhite-space: nowrap;\n\ttext-align: right;\n}\n\n[mol_bench_result_portion] {\n\tmargin-left: 1rem;\n}\n\n[mol_bench_col_head] > * {\n\tmargin: 0 .5rem;\n}\n\n[mol_bench_head] + [mol_bench_row] [mol_portion_indicator] {\n\tbackground: var(--mol_skin_accent);\n}\n");
})($ || ($ = {}));
//bench.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_bench extends $.$mol_grid {
        records() {
            return this.result();
        }
        result() {
            return ({});
        }
        col_sort(val, force) {
            return (val !== void 0) ? val : "";
        }
        Col_head(id) {
            return ((obj) => {
                obj.event_click = (val) => this.event_sort_toggle(id, val);
                obj.sub = () => this.col_head_content(id);
                return obj;
            })(new this.$.$mol_bench_head());
        }
        event_sort_toggle(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        col_head_content(id) {
            return [this.col_head_title(id), this.Col_head_sort(id)];
        }
        col_head_title(id) {
            return "";
        }
        Col_head_sort(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_sort_asc());
        }
        cell_content_number(id) {
            return [this.result_value(id), this.Result_portion(id)];
        }
        result_value(id) {
            return "";
        }
        Result_portion(id) {
            return ((obj) => {
                obj.portion = () => this.result_portion(id);
                return obj;
            })(new this.$.$mol_portion());
        }
        result_portion(id) {
            return 0;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_bench.prototype, "col_sort", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_bench.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_bench.prototype, "event_sort_toggle", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_bench.prototype, "Col_head_sort", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_bench.prototype, "Result_portion", null);
    $.$mol_bench = $mol_bench;
})($ || ($ = {}));
(function ($) {
    class $mol_bench_head extends $.$mol_float {
        horizontal() {
            return false;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "click": (val) => this.event_click(val) }));
        }
        event_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "title": this.hint() }));
        }
        hint() {
            return this.$.$mol_locale.text("$mol_bench_head_hint");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_bench_head.prototype, "event_click", null);
    $.$mol_bench_head = $mol_bench_head;
})($ || ($ = {}));
//bench.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_bench extends $.$mol_bench {
            col_sort(next) {
                return $.$mol_state_arg.value(this.state_key('sort'), next);
            }
            row_ids() {
                const result = this.result();
                const keys = Object.keys(result).map(key => ['', key]);
                const col = this.col_sort();
                if (col) {
                    keys.sort((a, b) => {
                        return this.result_number({ row: a, col }) - this.result_number({ row: b, col });
                    });
                }
                return keys;
            }
            result_value(id) {
                return this.result()[id.row[id.row.length - 1]][id.col];
            }
            result_number(id) {
                return parseInt(this.result_value(id), 10);
            }
            result_value_max(col) {
                let max = 0;
                const rows = this.row_ids();
                rows.forEach(row => {
                    const numb = this.result_number({ row, col });
                    if (numb > max)
                        max = numb;
                });
                return max;
            }
            result_portion(id) {
                return this.result_number(id) / this.result_value_max(id.col);
            }
            col_head_title(col) {
                return col;
            }
            event_sort_toggle(col, next) {
                this.col_sort(col);
            }
            col_type(col) {
                if (col === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col];
                if (!isNaN(parseFloat(val)))
                    return 'number';
                return 'text';
            }
            cell_content_number(id) {
                return [
                    this.result_value(id),
                    ...(this.col_sort() === id.col) ? [this.Result_portion(id)] : []
                ];
            }
            col_head_content(col) {
                return [
                    this.col_head_title(col),
                    ...(this.col_sort() === col) ? [this.Col_head_sort(col)] : []
                ];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_bench.prototype, "col_sort", null);
        __decorate([
            $.$mol_mem
        ], $mol_bench.prototype, "row_ids", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "result_value_max", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "col_type", null);
        $$.$mol_bench = $mol_bench;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bench.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_bench_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_bench_demo_title");
        }
        sub() {
            return [this.View()];
        }
        View() {
            return ((obj) => {
                obj.col_sort = (val) => this.col_sort(val);
                obj.result = () => this.result();
                return obj;
            })(new this.$.$mol_bench());
        }
        col_sort(val, force) {
            return (val !== void 0) ? val : "mid";
        }
        result() {
            return ({});
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_bench_demo.prototype, "View", null);
    __decorate([
        $.$mol_mem
    ], $mol_bench_demo.prototype, "col_sort", null);
    $.$mol_bench_demo = $mol_bench_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_bench_demo extends $.$mol_bench_demo {
            result() {
                return {
                    'bubble': {
                        'algorithm': 'bubble',
                        'min': '1 ms',
                        'mid': '11 ms',
                        'max': '99 ms',
                    },
                    'qsort': {
                        'algorithm': 'qsort',
                        'min': '2 ms',
                        'mid': '5 ms',
                        'max': '10 ms',
                    },
                };
            }
        }
        $$.$mol_bench_demo = $mol_bench_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $.$mol_view {
        dom_node(next) {
            const node = next || $.$mol_owning_get(this, $.$mol_view).dom_node();
            $.$mol_dom_render_attributes(node, this.attr_static());
            const events = this.event();
            for (let event_name in events) {
                node.addEventListener(event_name, $.$mol_log2.func($.$mol_fiber_root(events[event_name])), { passive: false });
            }
            return node;
        }
        attr_static() {
            return {};
        }
        event() {
            return {};
        }
        render() {
            this.dom_node_actual();
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plugin.prototype, "dom_node", null);
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//plugin.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_meter extends $.$mol_plugin {
        zoom() {
            return 1;
        }
        width(val, force) {
            return (val !== void 0) ? val : 0;
        }
        height(val, force) {
            return (val !== void 0) ? val : 0;
        }
        left(val, force) {
            return (val !== void 0) ? val : 0;
        }
        right(val, force) {
            return (val !== void 0) ? val : 0;
        }
        bottom(val, force) {
            return (val !== void 0) ? val : 0;
        }
        top(val, force) {
            return (val !== void 0) ? val : 0;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "width", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "height", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "left", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "right", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "top", null);
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_meter extends $.$mol_meter {
            rect() {
                const node = this.dom_node();
                const win = this.$.$mol_dom_context;
                if (node !== $.$mol_dom_context.document.body) {
                    new $.$mol_after_frame($.$mol_atom2.current.fresh);
                    try {
                        const { left, top, right, bottom, width, height } = node.getBoundingClientRect();
                        return { left, top, right, bottom, width, height, zoom: win.devicePixelRatio || 1 };
                    }
                    catch (error) {
                    }
                }
                const size = $.$mol_window.size();
                return {
                    zoom: win.devicePixelRatio || 1,
                    left: 0,
                    top: 0,
                    right: size.width,
                    bottom: size.height,
                    width: size.width,
                    height: size.height,
                };
            }
            top() {
                return this.rect().top;
            }
            bottom() {
                return this.rect().bottom;
            }
            left() {
                return this.rect().left;
            }
            right() {
                return this.rect().right;
            }
            width() {
                return this.rect().width;
            }
            height() {
                return this.rect().height;
            }
            zoom() {
                return this.rect().zoom;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "rect", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "top", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "left", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "right", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "height", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "zoom", null);
        $$.$mol_meter = $mol_meter;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//meter.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_touch extends $.$mol_plugin {
        start_zoom(val, force) {
            return (val !== void 0) ? val : 0;
        }
        start_distance(val, force) {
            return (val !== void 0) ? val : 0;
        }
        zoom(val, force) {
            return (val !== void 0) ? val : 1;
        }
        start_pan(val, force) {
            return (val !== void 0) ? val : [0, 0];
        }
        pan(val, force) {
            return (val !== void 0) ? val : [0, 0];
        }
        pos(val, force) {
            return (val !== void 0) ? val : [NaN, NaN];
        }
        start_pos(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_precision() {
            return 16;
        }
        swipe_right(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_bottom(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_left(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_top(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_from_right(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_from_bottom(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_from_left(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_from_top(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_to_right(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_to_bottom(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_to_left(val, force) {
            return (val !== void 0) ? val : null;
        }
        swipe_to_top(val, force) {
            return (val !== void 0) ? val : null;
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "touch-action": "none" }));
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "touchstart": (event) => this.event_start(event), "touchmove": (event) => this.event_move(event), "touchend": (event) => this.event_end(event), "mousedown": (event) => this.event_start(event), "mousemove": (event) => this.event_move(event), "mouseup": (event) => this.event_end(event), "mouseleave": (event) => this.event_leave(event), "wheel": (event) => this.event_wheel(event) }));
        }
        event_start(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_move(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_end(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_leave(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_wheel(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "start_zoom", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "start_distance", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "zoom", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "start_pan", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "pan", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "pos", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "start_pos", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_from_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_from_bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_from_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_from_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_to_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_to_bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_to_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "swipe_to_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "event_start", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "event_move", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "event_end", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "event_leave", null);
    __decorate([
        $.$mol_mem
    ], $mol_touch.prototype, "event_wheel", null);
    $.$mol_touch = $mol_touch;
})($ || ($ = {}));
//touch.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_touch extends $.$mol_touch {
            rect() {
                return this.dom_node().getBoundingClientRect();
            }
            event_start(event) {
                if (event.defaultPrevented)
                    return;
                this.start_pan(this.pan());
                let pos;
                if (event instanceof MouseEvent) {
                    if (event.buttons === 1) {
                        pos = [event.pageX, event.pageY];
                        this.start_pos(pos);
                    }
                }
                else if (event instanceof TouchEvent) {
                    if (event.touches.length === 1) {
                        pos = [event.touches[0].pageX, event.touches[0].pageY];
                        this.start_pos(pos);
                    }
                    if (event.touches.length === 2) {
                        const distance = ((event.touches[1].pageX - event.touches[0].pageX) ** 2 + (event.touches[1].pageY - event.touches[0].pageY) ** 2) ** .5;
                        this.start_distance(distance);
                        this.start_zoom(this.zoom());
                    }
                }
            }
            event_leave(event) {
                if (event.defaultPrevented)
                    return;
                if (event instanceof MouseEvent)
                    this.pos(super.pos());
            }
            event_move(event) {
                if (event.defaultPrevented)
                    return;
                const start_pan = this.start_pan();
                let pos;
                let cursor_pos;
                if (event instanceof MouseEvent) {
                    cursor_pos = [event.pageX, event.pageY];
                    if (event.buttons === 1)
                        pos = cursor_pos;
                    else
                        this.start_pos(null);
                }
                else if (event instanceof TouchEvent) {
                    cursor_pos = [event.touches[0].pageX, event.touches[0].pageY];
                    if (event.touches.length === 1)
                        pos = cursor_pos;
                    else
                        this.start_pos(null);
                }
                if (cursor_pos) {
                    const { left, top } = this.rect();
                    this.pos([
                        Math.max(0, Math.round(cursor_pos[0] - left)),
                        Math.max(0, Math.round(cursor_pos[1] - top)),
                    ]);
                }
                if (pos) {
                    const start_pos = this.start_pos();
                    if (!start_pos)
                        return;
                    if (this.pan !== $mol_touch.prototype.pan) {
                        this.pan([start_pan[0] + pos[0] - start_pos[0], start_pan[1] + pos[1] - start_pos[1]]);
                        event.preventDefault();
                    }
                    if (typeof TouchEvent === 'undefined')
                        return;
                    if (!(event instanceof TouchEvent))
                        return;
                    const precision = this.swipe_precision();
                    if ((this.swipe_right !== $mol_touch.prototype.swipe_right
                        || this.swipe_from_left !== $mol_touch.prototype.swipe_from_left
                        || this.swipe_to_right !== $mol_touch.prototype.swipe_to_right)
                        && pos[0] - start_pos[0] > precision * 2
                        && Math.abs(pos[1] - start_pos[1]) < precision) {
                        this.swipe_right(event);
                        event.preventDefault();
                    }
                    if ((this.swipe_left !== $mol_touch.prototype.swipe_left
                        || this.swipe_from_right !== $mol_touch.prototype.swipe_from_right
                        || this.swipe_to_left !== $mol_touch.prototype.swipe_to_left)
                        && start_pos[0] - pos[0] > precision * 2
                        && Math.abs(pos[1] - start_pos[1]) < precision) {
                        this.swipe_left(event);
                        event.preventDefault();
                    }
                    if ((this.swipe_bottom !== $mol_touch.prototype.swipe_bottom
                        || this.swipe_from_top !== $mol_touch.prototype.swipe_from_top
                        || this.swipe_to_bottom !== $mol_touch.prototype.swipe_to_bottom)
                        && pos[1] - start_pos[1] > precision * 2
                        && Math.abs(pos[0] - start_pos[0]) < precision) {
                        this.swipe_bottom(event);
                        event.preventDefault();
                    }
                    if ((this.swipe_top !== $mol_touch.prototype.swipe_top
                        || this.swipe_from_bottom !== $mol_touch.prototype.swipe_from_bottom
                        || this.swipe_to_top !== $mol_touch.prototype.swipe_to_top)
                        && start_pos[1] - pos[1] > precision * 2
                        && Math.abs(pos[0] - start_pos[0]) < precision) {
                        this.swipe_top(event);
                        event.preventDefault();
                    }
                }
                if (typeof TouchEvent === 'undefined')
                    return;
                if (!(event instanceof TouchEvent))
                    return;
                if (event.touches.length === 2) {
                    if (this.zoom === $mol_touch.prototype.zoom)
                        return;
                    const pos0 = [event.touches[0].pageX, event.touches[0].pageY];
                    const pos1 = [event.touches[1].pageX, event.touches[1].pageY];
                    const distance = ((pos1[0] - pos0[0]) ** 2 + (pos1[1] - pos0[1]) ** 2) ** .5;
                    const center = [pos1[0] / 2 + pos0[0] / 2, pos1[1] / 2 + pos0[1] / 2];
                    const start_zoom = this.start_zoom();
                    const mult = distance / this.start_distance();
                    this.zoom(start_zoom * mult);
                    const pan = [(start_pan[0] - center[0]) * mult + center[0], (start_pan[1] - center[1]) * mult + center[1]];
                    this.pan(pan);
                    event.preventDefault();
                }
            }
            swipe_left(event) {
                if (this.rect().right - this.start_pos()[0] < this.swipe_precision() * 2)
                    this.swipe_from_right(event);
                else
                    this.swipe_to_left(event);
                this.event_end(event);
            }
            swipe_right(event) {
                if (this.start_pos()[0] - this.rect().left < this.swipe_precision() * 2)
                    this.swipe_from_left(event);
                else
                    this.swipe_to_right(event);
                this.event_end(event);
            }
            swipe_top(event) {
                if (this.rect().bottom - this.start_pos()[1] < this.swipe_precision() * 2)
                    this.swipe_from_bottom(event);
                else
                    this.swipe_to_top(event);
                this.event_end(event);
            }
            swipe_bottom(event) {
                if (this.start_pos()[1] - this.rect().top < this.swipe_precision() * 2)
                    this.swipe_from_top(event);
                else
                    this.swipe_to_bottom(event);
                this.event_end(event);
            }
            event_end(event) {
                this.start_pos(null);
            }
            event_wheel(event) {
                if (this.pan !== $mol_touch.prototype.pan) {
                    event.preventDefault();
                }
                const zoom_prev = this.zoom() || 0.001;
                const zoom_next = zoom_prev * (1 - .1 * Math.sign(event.deltaY));
                const mult = zoom_next / zoom_prev;
                this.zoom(zoom_next);
                const pan_prev = this.pan();
                const center = [event.offsetX, event.offsetY];
                const pan_next = [(pan_prev[0] - center[0]) * mult + center[0], (pan_prev[1] - center[1]) * mult + center[1]];
                this.pan(pan_next);
            }
        }
        $$.$mol_touch = $mol_touch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//touch.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: true });
        }
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
})($ || ($ = {}));
//events.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_ghost extends $.$mol_view {
        Sub() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_ghost.prototype, "Sub", null);
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//ghost.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_ghost extends $.$mol_ghost {
            dom_node() {
                const node = this.Sub().dom_node();
                $.$mol_dom_render_attributes(node, this.attr_static());
                $.$mol_dom_render_events(node, this.event());
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                Sub.$ = this.$;
                const node = Sub.dom_tree();
                this.dom_node_actual();
                return node;
            }
            title() {
                return this.Sub().title();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_ghost.prototype, "dom_node", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//ghost.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/book/book.view.css", "[mol_book] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tjustify-content: flex-start;\n\toverflow: hidden;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\ttransform: translateZ( 0 );\n}\n\n[mol_book] > *:not([mol_book_page_visible]) {\n\tposition: absolute; \n\tleft: 0;\n\ttop: 0;\n}\n\n[mol_book] > [mol_book_page_focused]:not([mol_book_page_visible]) ~ * {\n\topacity: .25;\n\tpointer-events: none;\n\tz-index: -1;\n}\n\n[mol_book] > *:not([mol_book_page_visible]):not([mol_book_page_focused]) {\n\ttransform: translate3d( -100% , 0 , 0 );\n}\n\n[mol_book] > *:not([mol_book_page_visible]):not([mol_book_page_focused]) + *:before {\n\tcontent : '•••';\n\tposition: absolute;\n\ttop: 1rem;\n\tleft: 0;\n\tz-index: 1;\n\tpointer-events: none;\n\tcolor: var(--mol_skin_base_text);\n\ttransform: rotate(90deg);\n}\n\n[mol_book] > * {\n\tposition: relative;\n\t/* animation: mol_book_page_show linear .2s; */\n\ttransition-timing-function: linear;\n\tz-index: 0;\n\tmin-height: 100%;\n\tmax-height: 100%;\n}\n\n[mol_book_placeholder] {\n\tflex: 1000 1 400px;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tbackground: var(--mol_theme_field);\n\tz-index: -1;\n}\n\n[mol_book_placeholder]:hover {\n\toutline: none;\n}\n\n@keyframes mol_book_page_show {\n\tfrom {\n\t\ttransform: translateX( 100% );\n\t\topacity: 0;\n\t\tz-index: -1;\n\t}\n}\n\n[mol_book_page]:not(:first-child) {\n\tanimation: mol_book_page_show .25s ease-out;\n}\n");
})($ || ($ = {}));
//book.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_book extends $.$mol_view {
        sub() {
            return this.pages_wrapped();
        }
        pages_wrapped() {
            return [];
        }
        pages() {
            return [];
        }
        plugins() {
            return [this.Meter(), this.Touch()];
        }
        width() {
            return this.Meter().width();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter());
        }
        Touch() {
            return ((obj) => {
                obj.swipe_from_left = (val) => this.event_front_up(val);
                obj.swipe_to_left = (val) => this.event_front_down(val);
                return obj;
            })(new this.$.$mol_touch());
        }
        event_front_up(val, force) {
            return (val !== void 0) ? val : null;
        }
        event_front_down(val, force) {
            return (val !== void 0) ? val : null;
        }
        Page(index) {
            return ((obj) => {
                obj.Sub = () => this.page(index);
                obj.visible = () => this.page_visible(index);
                return obj;
            })(new this.$.$mol_book_page());
        }
        page(index) {
            return null;
        }
        page_visible(index) {
            return true;
        }
        Placeholder() {
            return ((obj) => {
                obj.title = () => this.title();
                return obj;
            })(new this.$.$mol_book_placeholder());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_book.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $mol_book.prototype, "Touch", null);
    __decorate([
        $.$mol_mem
    ], $mol_book.prototype, "event_front_up", null);
    __decorate([
        $.$mol_mem
    ], $mol_book.prototype, "event_front_down", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_book.prototype, "Page", null);
    __decorate([
        $.$mol_mem
    ], $mol_book.prototype, "Placeholder", null);
    $.$mol_book = $mol_book;
})($ || ($ = {}));
(function ($) {
    class $mol_book_placeholder extends $.$mol_view {
        minimal_width() {
            return 400;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "tabindex": null }));
        }
    }
    $.$mol_book_placeholder = $mol_book_placeholder;
})($ || ($ = {}));
(function ($) {
    class $mol_book_page extends $.$mol_ghost {
        attr_static() {
            return (Object.assign(Object.assign({}, super.attr_static()), { "tabindex": 0, "mol_book_page_visible": true }));
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_book_page_focused": this.focused(), "mol_book_page_visible": this.visible() }));
        }
        visible() {
            return true;
        }
    }
    $.$mol_book_page = $mol_book_page;
})($ || ($ = {}));
//book.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book extends $.$mol_book {
            pages_extended() {
                return [this.Placeholder(), ...this.pages()];
            }
            break_point() {
                const pages = this.pages_extended();
                const limit = this.width();
                let width = 0;
                for (var break_point = pages.length; break_point > 0; --break_point) {
                    const page = pages[break_point - 1];
                    if (!page)
                        continue;
                    const page_width = page.minimal_width();
                    if (width + page_width > limit)
                        break;
                    width += page_width;
                }
                if (width === 0)
                    --break_point;
                return break_point;
            }
            page(index) {
                return this.pages_extended()[index];
            }
            page_visible(index) {
                return index >= this.break_point();
            }
            pages_wrapped() {
                const pages = this.pages_extended();
                const extended = [];
                for (let i = 1; i < pages.length; ++i) {
                    if (pages[i])
                        extended.push(this.Page(i));
                }
                if (pages[0])
                    extended.push(this.Page(0));
                return extended;
            }
            title() {
                return this.pages().map(page => page.title()).reverse().join(' | ');
            }
            event_front_up(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                this.page(1).focused(true);
            }
            event_front_down(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                this.page(1).focused(false);
            }
            minimal_width() {
                return this.pages().reduce((sum, page) => page.minimal_width() + sum, 0);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "pages_extended", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "break_point", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "pages_wrapped", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "minimal_width", null);
        $$.$mol_book = $mol_book;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//book.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/demo/large/large.view.css", "[mol_demo_large] {\n\theight: 100%;\n\twidth: 100%;\n\toverflow: hidden;\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tposition: relative;\n\tflex: 1 0 auto;\n\tdisplay: flex;\n\talign-items: stretch;\n\tbox-sizing: border-box;\n\talign-self: stretch;\n}\n");
})($ || ($ = {}));
//large.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_demo_large extends $.$mol_view {
    }
    $.$mol_demo_large = $mol_demo_large;
})($ || ($ = {}));
//large.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_demo_large extends $.$mol_demo_large {
            minimal_height() {
                return $.$mol_window.size().height - 100;
            }
            minimal_width() {
                return this.$.$mol_window.size().width - 300;
            }
        }
        $$.$mol_demo_large = $mol_demo_large;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//large.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/book/demo/demo.view.css", "[mol_book_demo_placeholder], \n[mol_book_demo_main], \n[mol_book_demo_addon] {\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 2rem;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n}\n\n[mol_book_demo_placeholder][mol_view] {\n\tbackground-color: hsla(0, 100%, 50%, .2);\n}\n\n[mol_book_demo_addon] {\n\tbackground-color: hsla(240, 100%, 50%, .2);\n}\n\n[mol_book_demo_main] {\n\tbackground-color: hsla(120, 100%, 50%, .2);\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_book_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_book_demo_title");
        }
        sub() {
            return [this.View()];
        }
        View() {
            return ((obj) => {
                obj.Placeholder = () => this.Placeholder();
                obj.pages = () => [this.Addon(), this.Main()];
                return obj;
            })(new this.$.$mol_book());
        }
        Placeholder() {
            return ((obj) => {
                obj.minimal_width = () => 200;
                obj.sub = () => [" Placeholder"];
                return obj;
            })(new this.$.$mol_book_placeholder());
        }
        Addon() {
            return ((obj) => {
                obj.minimal_width = () => 250;
                obj.sub = () => [" Addon"];
                return obj;
            })(new this.$.$mol_view());
        }
        Main() {
            return ((obj) => {
                obj.minimal_width = () => 400;
                obj.sub = () => [" Main"];
                return obj;
            })(new this.$.$mol_view());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_book_demo.prototype, "View", null);
    __decorate([
        $.$mol_mem
    ], $mol_book_demo.prototype, "Placeholder", null);
    __decorate([
        $.$mol_mem
    ], $mol_book_demo.prototype, "Addon", null);
    __decorate([
        $.$mol_mem
    ], $mol_book_demo.prototype, "Main", null);
    $.$mol_book_demo = $mol_book_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_button_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_button_demo_title");
        }
        sub() {
            return [this.Major_enabled(), this.Major_disabled(), this.Minor_enabled(), this.Minor_disabled()];
        }
        Major_enabled() {
            return ((obj) => {
                obj.title = () => this.major_label();
                return obj;
            })(new this.$.$mol_button_major());
        }
        major_label() {
            return this.$.$mol_locale.text("$mol_button_demo_major_label");
        }
        Major_disabled() {
            return ((obj) => {
                obj.title = () => this.major_label();
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_button_major());
        }
        Minor_enabled() {
            return ((obj) => {
                obj.title = () => this.minor_label();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        minor_label() {
            return this.$.$mol_locale.text("$mol_button_demo_minor_label");
        }
        Minor_disabled() {
            return ((obj) => {
                obj.title = () => this.minor_label();
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_button_minor());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_button_demo.prototype, "Major_enabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_button_demo.prototype, "Major_disabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_button_demo.prototype, "Minor_enabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_button_demo.prototype, "Minor_disabled", null);
    $.$mol_button_demo = $mol_button_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg) => {
                return funcs.reduce((res, func) => res + func(arg), '');
            };
        }
        toString(pattern) {
            var Base = this.constructor;
            var formatter = Base.formatter(pattern);
            return formatter.call(Base, this);
        }
    }
    $mol_time_base.patterns = {};
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));
//base.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $.$mol_time_base {
        constructor(config = 0) {
            super();
            this.year = 0;
            this.month = 0;
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            if (typeof config === 'number') {
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    if (found[1])
                        this.year = Number(found[1]);
                    if (found[2])
                        this.month = Number(found[2]);
                    if (found[3])
                        this.day = Number(found[3]);
                    if (found[4])
                        this.hour = Number(found[4]);
                    if (found[5])
                        this.minute = Number(found[5]);
                    if (found[6])
                        this.second = Number(found[6]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
    }
    $mol_time_duration.patterns = {
        '#Y': (duration) => {
            if (!duration.year)
                return '';
            return duration.year + 'Y';
        },
        '#M': (duration) => {
            if (!duration.month)
                return '';
            return duration.month + 'M';
        },
        '#D': (duration) => {
            if (!duration.day)
                return '';
            return duration.day + 'D';
        },
        '#h': (duration) => {
            if (!duration.hour)
                return '';
            return duration.hour + 'H';
        },
        '#m': (duration) => {
            if (!duration.minute)
                return '';
            return duration.minute + 'M';
        },
        '#s': (duration) => {
            if (!duration.second)
                return '';
            return duration.second + 'S';
        },
        '+hh': (duration) => {
            var hour = duration.hour;
            var sign = '+';
            if (hour < 0) {
                sign = '-';
                hour = -hour;
            }
            return (hour < 10)
                ? (sign + '0' + hour)
                : (sign + hour);
        },
        'mm': (duration) => {
            return (duration.minute < 10)
                ? ('0' + duration.minute)
                : String(duration.minute);
        },
    };
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));
//duration.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_moment extends $.$mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number')
                config = new Date(config);
            if (typeof config === 'string') {
                var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d+)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = Number(parsed[1]);
                if (parsed[2])
                    this.month = Number(parsed[2]) - 1;
                if (parsed[3])
                    this.day = Number(parsed[3]) - 1;
                if (parsed[4])
                    this.hour = Number(parsed[4]);
                if (parsed[5])
                    this.minute = Number(parsed[5]);
                if (parsed[6])
                    this.second = Number(parsed[6]);
                if (parsed[7])
                    this.offset = new $.$mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                var offset = -config.getTimezoneOffset();
                this.offset = new $.$mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            if (config.offset !== undefined) {
                this.offset = new $.$mol_time_duration(config.offset);
            }
        }
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        get native() {
            if (this._native)
                return this._native;
            var utc = this.toOffset('Z');
            return this._native = new Date(Date.UTC((utc.year || 0), (utc.month || 0), (utc.day || 0) + 1, (utc.hour || 0), (utc.minute || 0), (utc.second && Math.floor(utc.second) || 0), (utc.second && Math.floor((utc.second - Math.floor(utc.second)) * 1000) || 0)));
        }
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native);
            return this._normal = new $mol_time_moment({
                year: (this.year === undefined) ? undefined : moment.year,
                month: (this.month === undefined) ? undefined : moment.month,
                day: (this.day === undefined) ? undefined : moment.day,
                hour: (this.hour === undefined) ? undefined : moment.hour,
                minute: (this.minute === undefined) ? undefined : moment.minute,
                second: (this.second === undefined) ? undefined : moment.second,
                offset: (this.offset === undefined) ? undefined : moment.offset,
            });
        }
        merge(config) {
            var moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: (moment.year === undefined) ? this.year : moment.year,
                month: (moment.month === undefined) ? this.month : moment.month,
                day: (moment.day === undefined) ? this.day : moment.day,
                hour: (moment.hour === undefined) ? this.hour : moment.hour,
                minute: (moment.minute === undefined) ? this.minute : moment.minute,
                second: (moment.second === undefined) ? this.second : moment.second,
                offset: (moment.offset === undefined) ? this.offset : moment.offset,
            });
        }
        shift(config) {
            var duration = new $.$mol_time_duration(config);
            var moment = new $mol_time_moment().merge(this);
            var second = (moment.second) + (duration.second || 0);
            var native = new Date((moment.year) + (duration.year || 0), (moment.month) + (duration.month || 0), (moment.day) + 1 + (duration.day || 0), (moment.hour) + (duration.hour || 0), (moment.minute) + (duration.minute || 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: (this.year === undefined) ? undefined : native.getFullYear(),
                month: (this.month === undefined) ? undefined : native.getMonth(),
                day: (this.day === undefined) ? undefined : native.getDate() - 1,
                hour: (this.hour === undefined) ? undefined : native.getHours(),
                minute: (this.minute === undefined) ? undefined : native.getMinutes(),
                second: (this.second === undefined) ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        toOffset(config) {
            const duration = new $.$mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            const moment = this.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ') {
            return super.toString(pattern);
        }
    }
    $mol_time_moment.patterns = {
        'YYYY': (moment) => {
            if (moment.year == null)
                return '';
            return String(moment.year);
        },
        'AD': (moment) => {
            if (moment.year == null)
                return '';
            return String(Math.floor(moment.year / 100) + 1);
        },
        'YY': (moment) => {
            if (moment.year == null)
                return '';
            return String(moment.year % 100);
        },
        'Month': (moment) => {
            if (moment.month == null)
                return '';
            return moment.native.toLocaleString(undefined, { month: 'long' });
        },
        'DD Month': (moment) => {
            return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'long' });
        },
        'D Month': (moment) => {
            return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'long' });
        },
        'Mon': (moment) => {
            if (moment.month == null)
                return '';
            return moment.native.toLocaleString(undefined, { month: 'short' });
        },
        'DD Mon': (moment) => {
            return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'short' });
        },
        'D Mon': (moment) => {
            return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'short' });
        },
        '-MM': (moment) => {
            if (moment.month == null)
                return '';
            return '-' + $mol_time_moment.patterns['MM'](moment);
        },
        'MM': (moment) => {
            if (moment.month == null)
                return '';
            var month = moment.month + 1;
            return (month < 10)
                ? ('0' + month)
                : ('' + month);
        },
        'M': (moment) => {
            if (moment.month == null)
                return '';
            return String(moment.month + 1);
        },
        'WeekDay': (moment) => {
            if (moment.weekday == null)
                return '';
            return moment.native.toLocaleString(undefined, { weekday: 'long' });
        },
        'WD': (moment) => {
            if (moment.weekday == null)
                return '';
            return moment.native.toLocaleString(undefined, { weekday: 'short' });
        },
        '-DD': (moment) => {
            if (moment.day == null)
                return '';
            return '-' + $mol_time_moment.patterns['DD'](moment);
        },
        'DD': (moment) => {
            if (moment.day == null)
                return '';
            var day = moment.day + 1;
            return (day < 10)
                ? ('0' + day)
                : String(day);
        },
        'D': (moment) => {
            if (moment.day == null)
                return '';
            return String(moment.day + 1);
        },
        'Thh': (moment) => {
            if (moment.hour == null)
                return '';
            return 'T' + $mol_time_moment.patterns['hh'](moment);
        },
        'hh': (moment) => {
            if (moment.hour == null)
                return '';
            return (moment.hour < 10)
                ? ('0' + moment.hour)
                : String(moment.hour);
        },
        'h': (moment) => {
            if (moment.hour == null)
                return '';
            return String(moment.hour);
        },
        ':mm': (moment) => {
            if (moment.minute == null)
                return '';
            return ':' + $mol_time_moment.patterns['mm'](moment);
        },
        'mm': (moment) => {
            if (moment.minute == null)
                return '';
            return (moment.minute < 10)
                ? ('0' + moment.minute)
                : String(moment.minute);
        },
        'm': (moment) => {
            if (moment.minute == null)
                return '';
            return String(moment.minute);
        },
        ':ss': (moment) => {
            if (moment.second == null)
                return '';
            return ':' + $mol_time_moment.patterns['ss'](moment);
        },
        'ss': (moment) => {
            if (moment.second == null)
                return '';
            var second = Math.floor(moment.second);
            return (second < 10)
                ? ('0' + second)
                : String(second);
        },
        's': (moment) => {
            if (moment.second == null)
                return '';
            return String(Math.floor(moment.second));
        },
        '.sss': (moment) => {
            if (moment.second == null)
                return '';
            if (moment.second - Math.floor(moment.second) === 0)
                return '';
            return '.' + $mol_time_moment.patterns['sss'](moment);
        },
        'sss': (moment) => {
            if (moment.second == null)
                return '';
            var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
            return (millisecond < 10)
                ? ('00' + millisecond)
                : (millisecond < 100)
                    ? ('0' + millisecond)
                    : String(millisecond);
        },
        'Z': (moment) => {
            var offset = moment.offset;
            if (!offset)
                return '';
            return offset.toString('+hh:mm');
        }
    };
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));
//moment.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_interval extends $.$mol_time_base {
        constructor(config) {
            super();
            if (typeof config === 'string') {
                var chunks = config.split('/');
                if (chunks[0]) {
                    if (chunks[0][0].toUpperCase() === 'P') {
                        this._duration = new $.$mol_time_duration(chunks[0]);
                    }
                    else {
                        this._start = new $.$mol_time_moment(chunks[0]);
                    }
                }
                else {
                    this._start = new $.$mol_time_moment();
                }
                if (chunks[1]) {
                    if (chunks[1][0].toUpperCase() === 'P') {
                        this._duration = new $.$mol_time_duration(chunks[1]);
                    }
                    else {
                        this._end = new $.$mol_time_moment(chunks[1]);
                    }
                }
                else {
                    this._end = new $.$mol_time_moment();
                }
                return;
            }
            if (config.start !== undefined)
                this._start = new $.$mol_time_moment(config.start);
            if (config.end !== undefined)
                this._end = new $.$mol_time_moment(config.end);
            if (config.duration !== undefined)
                this._duration = new $.$mol_time_duration(config.duration);
        }
        get start() {
            if (this._start)
                return this._start;
            return this._start = this._end.shift(this._duration.mult(-1));
        }
        get end() {
            if (this._end)
                return this._end;
            return this._end = this._start.shift(this._duration);
        }
        get duration() {
            if (this._duration)
                return this._duration;
            return this._duration = new $.$mol_time_duration(this._end.valueOf() - this._start.valueOf());
        }
        toJSON() { return this.toString(); }
        toString() {
            return (this._start || this._duration || '').toString() + '/' + (this._end || this._duration || '').toString();
        }
    }
    $.$mol_time_interval = $mol_time_interval;
})($ || ($ = {}));
//interval.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/calendar/calendar.view.css", "[mol_calendar] {\n\tdisplay: table;\n\tfont-family: monospace;\n\tfont-family: var(--mol_skin_font_monospace);\n}\n\n[mol_calendar_title] {\n\tdisplay: table-caption;\n\ttext-align: center;\n}\n\n[mol_calendar_weeks] {\n\tdisplay: table-row-group;\n}\n\n[mol_calendar_weekdays] ,\n[mol_calendar_week] {\n\tdisplay: table-row;\n}\n\n[mol_calendar_day] {\n\tdisplay: table-cell;\n\tpadding: .25rem .5rem;\n\ttext-align: center;\n\tword-break: normal;\n\tbox-shadow: none;\n}\n\n[mol_calendar_weekday] {\n\tborder-bottom: 1px solid var(--mol_theme_line);\n}\n\n[mol_calendar_holiday] {\n\tcolor: var(--mol_skin_base);\n}\n\n[mol_calendar_ghost] {\n\topacity: .25;\n}\n\n[mol_calendar_selected] {\n\tbackground: var(--mol_skin_base);\n\tcolor: var(--mol_skin_base_text);\n\tborder-radius: var(--mol_skin_round);\n}\n");
})($ || ($ = {}));
//calendar.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_calendar extends $.$mol_list {
        sub() {
            return [this.Title(), this.Weekdays(), this.Weeks()];
        }
        Title() {
            return ((obj) => {
                obj.minimal_height = () => 24;
                obj.sub = () => [this.title()];
                return obj;
            })(new this.$.$mol_view());
        }
        title() {
            return "";
        }
        Weekdays() {
            return ((obj) => {
                obj.sub = () => this.weekdays();
                return obj;
            })(new this.$.$mol_view());
        }
        weekdays() {
            return [];
        }
        Weeks() {
            return ((obj) => {
                obj.rows = () => this.weeks();
                return obj;
            })(new this.$.$mol_list());
        }
        weeks() {
            return [];
        }
        Weekday(index) {
            return ((obj) => {
                obj.holiday = () => this.weekend(index);
                obj.sub = () => [this.weekday(index)];
                return obj;
            })(new this.$.$mol_calendar_day());
        }
        weekend(index) {
            return false;
        }
        weekday(index) {
            return "";
        }
        Week(row) {
            return ((obj) => {
                obj.sub = () => this.week_days(row);
                return obj;
            })(new this.$.$mol_view());
        }
        week_days(row) {
            return [];
        }
        Day(day) {
            return ((obj) => {
                obj.ghost = () => this.day_ghost(day);
                obj.holiday = () => this.day_holiday(day);
                obj.selected = () => this.day_selected(day);
                obj.sub = () => this.day_content(day);
                return obj;
            })(new this.$.$mol_calendar_day());
        }
        day_ghost(day) {
            return false;
        }
        day_holiday(day) {
            return false;
        }
        day_selected(day) {
            return false;
        }
        day_content(day) {
            return [this.day_text(day)];
        }
        day_text(day) {
            return "";
        }
        month_string() {
            return "";
        }
        month_moment() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Weekdays", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Weeks", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Weekday", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Week", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Day", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "month_moment", null);
    $.$mol_calendar = $mol_calendar;
})($ || ($ = {}));
(function ($) {
    class $mol_calendar_day extends $.$mol_view {
        minimal_height() {
            return 32;
        }
        minimal_width() {
            return 36;
        }
        attr() {
            return ({
                "mol_calendar_holiday": this.holiday(),
                "mol_calendar_ghost": this.ghost(),
                "mol_calendar_selected": this.selected(),
            });
        }
        holiday() {
            return false;
        }
        ghost() {
            return false;
        }
        selected() {
            return false;
        }
    }
    $.$mol_calendar_day = $mol_calendar_day;
})($ || ($ = {}));
//calendar.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        class $mol_calendar extends $.$mol_calendar {
            month_moment() {
                const moment = new $.$mol_time_moment(this.month_string() || undefined);
                return new $.$mol_time_moment({ year: moment.year, month: moment.month });
            }
            title() {
                return this.month_moment().toString('Month YYYY');
            }
            day_first() {
                return this.month_moment().merge({ day: 0 });
            }
            day_last() {
                return this.day_first().shift('P1M');
            }
            day_draw_from() {
                let weekday = this.day_first().weekday;
                return this.day_first().shift({ day: -weekday });
            }
            weekdays() {
                const next = [];
                for (let index = 0; index < 7; ++index) {
                    next.push(this.Weekday(index));
                }
                return next;
            }
            weekday(index) {
                return this.day_draw_from().shift({ day: index }).toString('WD');
            }
            weekend(index) {
                return [5, 6].indexOf(index) >= 0;
            }
            weeks_count() {
                const interval = new $.$mol_time_interval({
                    start: this.day_draw_from(),
                    end: this.day_last(),
                });
                return Math.ceil(interval.duration.count({ day: 7 }));
            }
            weeks() {
                const weeks = [];
                let count = this.weeks_count();
                for (let i = 0; i < count; ++i) {
                    weeks.push(this.Week(i));
                }
                return weeks;
            }
            week_days(index) {
                const days = [];
                let start = this.day_draw_from().shift({ day: index * 7 });
                for (let i = 0; i < 7; ++i) {
                    days.push(this.Day(start.shift({ day: i }).toString('YYYY-MM-DD')));
                }
                return days;
            }
            day_text(day) {
                return new $.$mol_time_moment(day).toString("D");
            }
            day_holiday(day) {
                return this.weekend(new $.$mol_time_moment(day).weekday);
            }
            day_ghost(day) {
                return new $.$mol_time_moment(day).toString('YYYY-MM') !== this.day_first().toString('YYYY-MM');
            }
            day_selected(day) {
                return new $.$mol_time_moment().toString('YYYY-MM-DD') === day;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "month_moment", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_first", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_last", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_draw_from", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weekdays", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "weekday", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weeks_count", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weeks", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "week_days", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_text", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_holiday", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_ghost", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_selected", null);
        $mol.$mol_calendar = $mol_calendar;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//calendar.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_calendar_demo_holiday extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_calendar_demo_holiday_title");
        }
        holidays() {
            return ["2018-01-01", "2018-01-02", "2018-01-03", "2018-01-04", "2018-01-05", "2018-01-06", "2018-01-07", "2018-01-08", "2018-01-13", "2018-01-14", "2018-01-20", "2018-01-21", "2018-01-27", "2018-01-28"];
        }
        sub() {
            return [this.Calendar()];
        }
        Calendar() {
            return ((obj) => {
                obj.month_string = () => this.month();
                obj.day_holiday = (day) => this.holiday(day);
                return obj;
            })(new this.$.$mol_calendar());
        }
        month() {
            return "2018-01";
        }
        holiday(day) {
            return false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_calendar_demo_holiday.prototype, "Calendar", null);
    $.$mol_calendar_demo_holiday = $mol_calendar_demo_holiday;
})($ || ($ = {}));
//holiday.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_calendar_demo_holiday extends $.$mol_calendar_demo_holiday {
            holiday(day) {
                return this.holidays().indexOf(day) >= 0;
            }
        }
        $$.$mol_calendar_demo_holiday = $mol_calendar_demo_holiday;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//holiday.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_calendar_demo_selection extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_calendar_demo_selection_title");
        }
        interval_config() {
            return ({
                "start": "2018-01-10",
                "end": "2018-01-20",
            });
        }
        sub() {
            return [this.Calendar()];
        }
        Calendar() {
            return ((obj) => {
                obj.month_string = () => this.month();
                obj.day_selected = (day) => this.selected(day);
                return obj;
            })(new this.$.$mol_calendar());
        }
        month() {
            return "2018-01";
        }
        selected(day) {
            return false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_calendar_demo_selection.prototype, "Calendar", null);
    $.$mol_calendar_demo_selection = $mol_calendar_demo_selection;
})($ || ($ = {}));
//selection.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_calendar_demo_selection extends $.$mol_calendar_demo_selection {
            interval() {
                return new $.$mol_time_interval(this.interval_config());
            }
            selected(day) {
                const interval = this.interval();
                return (day >= interval.start.toString()) && (day < interval.end.toString());
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_calendar_demo_selection.prototype, "interval", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar_demo_selection.prototype, "selected", null);
        $$.$mol_calendar_demo_selection = $mol_calendar_demo_selection;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//selection.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_calendar_demo_simple extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_calendar_demo_simple_title");
        }
        sub() {
            return [this.Calendar()];
        }
        Calendar() {
            return ((obj) => {
                obj.month_moment = () => this.today();
                return obj;
            })(new this.$.$mol_calendar());
        }
        today() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_calendar_demo_simple.prototype, "Calendar", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar_demo_simple.prototype, "today", null);
    $.$mol_calendar_demo_simple = $mol_calendar_demo_simple;
})($ || ($ = {}));
//simple.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_calendar_demo_simple extends $.$mol_calendar_demo_simple {
            month_name() {
                return this.today().toString('Month YYYY');
            }
        }
        $$.$mol_calendar_demo_simple = $mol_calendar_demo_simple;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//simple.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/row/row.view.css", "[mol_row] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tpadding: .5rem;\n\tflex: 1 0 auto;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* border-radius: var(--mol_skin_round); */\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n}\n\n[mol_row] > * ,\n[mol_row_sub] > * {\n\tmargin: .5rem;\n\tmax-width: 100%;\n}\n\n[mol_row_sub] {\n\tmargin: 0;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n}\n");
})($ || ($ = {}));
//row.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_row extends $.$mol_view {
    }
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    class $mol_row_sub extends $.$mol_view {
    }
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_row extends $.$mol_row {
            item_offsets_top() {
                let next = [];
                let sub = this.sub();
                if (!sub)
                    return next;
                const context = this.$$;
                const widthLimit = context.$mol_view_visible_width();
                let allHeight = 0;
                let rowWidth = 0;
                let row_height = 0;
                for (let child of sub) {
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    const width = child.minimal_width();
                    const height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            }
            sub_visible() {
                const sub = this.sub();
                const context = this.$$;
                for (let i = 0; i < sub.length; ++i) {
                    const child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.$ = context;
                    }
                }
                const visible = [];
                const heightLimit = context.$mol_view_visible_height();
                const offsets = this.item_offsets_top();
                let height = 0;
                for (let i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    const child = sub[i];
                    visible.push(child);
                }
                return visible;
            }
            minimal_height() {
                const offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_row.prototype, "item_offsets_top", null);
        $$.$mol_row = $mol_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//row.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_card_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_card_demo_title");
        }
        sub() {
            return [this.Simple(), this.Pending()];
        }
        Simple() {
            return ((obj) => {
                obj.Content = () => this.Simple_content();
                return obj;
            })(new this.$.$mol_card());
        }
        Simple_content() {
            return ((obj) => {
                obj.sub = () => ["Hello world!"];
                return obj;
            })(new this.$.$mol_row());
        }
        Pending() {
            return ((obj) => {
                obj.Content = () => this.Pending_content();
                obj.status = () => "pending";
                return obj;
            })(new this.$.$mol_card());
        }
        Pending_content() {
            return ((obj) => {
                obj.sub = () => ["Hello pending!"];
                return obj;
            })(new this.$.$mol_row());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_card_demo.prototype, "Simple", null);
    __decorate([
        $.$mol_mem
    ], $mol_card_demo.prototype, "Simple_content", null);
    __decorate([
        $.$mol_mem
    ], $mol_card_demo.prototype, "Pending", null);
    __decorate([
        $.$mol_mem
    ], $mol_card_demo.prototype, "Pending_content", null);
    $.$mol_card_demo = $mol_card_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_group extends $.$mol_svg {
        dom_name() {
            return "g";
        }
    }
    $.$mol_svg_group = $mol_svg_group;
})($ || ($ = {}));
//group.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_vector extends Array {
        constructor(...values) { super(...values); }
        map(convert, self) {
            return super.map(convert, self);
        }
        merged(patches, combine) {
            return this.map((value, index) => combine(value, patches[index]));
        }
        limited(limits) {
            return this.merged(limits, (value, [min, max]) => (value < min) ? min : (value > max) ? max : value);
        }
        added0(diff) {
            return this.map(value => value + diff);
        }
        added1(diff) {
            return this.merged(diff, (a, b) => a + b);
        }
        multed0(mult) {
            return this.map(value => value * mult);
        }
        multed1(mults) {
            return this.merged(mults, (a, b) => a * b);
        }
        expanded1(point) {
            return this.merged(point, (range, value) => range.expanded0(value));
        }
        expanded2(point) {
            return this.merged(point, (range1, range2) => {
                let next = range1;
                const Range = range1.constructor;
                if (range1[0] > range2[0])
                    next = new Range(range2[0], next.max);
                if (range1[1] < range2[1])
                    next = new Range(next.min, range2[1]);
                return next;
            });
        }
    }
    $.$mol_vector = $mol_vector;
    class $mol_vector_1d extends $mol_vector {
        get x() { return this[0]; }
    }
    $.$mol_vector_1d = $mol_vector_1d;
    class $mol_vector_2d extends $mol_vector {
        get x() { return this[0]; }
        get y() { return this[1]; }
    }
    $.$mol_vector_2d = $mol_vector_2d;
    class $mol_vector_3d extends $mol_vector {
        get x() { return this[0]; }
        get y() { return this[1]; }
        get z() { return this[2]; }
    }
    $.$mol_vector_3d = $mol_vector_3d;
    class $mol_vector_range extends $mol_vector {
        get min() { return this[0]; }
        get max() { return this[1]; }
        get inversed() {
            return new this.constructor(this.max, this.min);
        }
        expanded0(value) {
            const Range = this.constructor;
            let range = this;
            if (value > range.max)
                range = new Range(range.min, value);
            if (value < range.min)
                range = new Range(value, range.max);
            return range;
        }
    }
    $.$mol_vector_range = $mol_vector_range;
    $.$mol_vector_range_full = new $mol_vector_range(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    class $mol_vector_matrix extends $mol_vector {
        added2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 + b[index]));
        }
        multed2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 * b[index]));
        }
    }
    $.$mol_vector_matrix = $mol_vector_matrix;
})($ || ($ = {}));
//vector.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/graph/graph.view.css", "[mol_plot_graph] {\n\tstroke: currentColor;\n}\n\n[mol_plot_graph_sample] {\n\tborder-width: 0;\n\tborder-style: solid;\n}\n\n[mol_plot_graph_type=\"dashed\"] {\n\tstroke-dasharray: 4 4;\n\tborder-style: dashed;\n}\n");
})($ || ($ = {}));
//graph.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_graph extends $.$mol_svg_group {
        series_x() {
            return [];
        }
        series_y() {
            return [];
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_plot_graph_type": this.type() }));
        }
        type() {
            return "solid";
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "color": this.color() }));
        }
        color() {
            return "";
        }
        viewport() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.viewport_x(), this.viewport_y()));
        }
        viewport_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        viewport_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        shift() {
            return [0, 0];
        }
        scale() {
            return [1, 1];
        }
        cursor_position() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(NaN, NaN));
        }
        dimensions_pane() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.dimensions_pane_x(), this.dimensions_pane_y()));
        }
        dimensions_pane_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions_pane_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.dimensions_x(), this.dimensions_y()));
        }
        dimensions_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        size_real() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(0, 0));
        }
        gap() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.gap_x(), this.gap_y()));
        }
        gap_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, 0));
        }
        gap_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, 0));
        }
        indexes() {
            return [];
        }
        points() {
            return [];
        }
        front() {
            return [];
        }
        back() {
            return [];
        }
        hue() {
            return NaN;
        }
        Sample() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "viewport", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "viewport_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "viewport_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "cursor_position", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions_pane", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions_pane_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions_pane_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "dimensions_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "size_real", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "gap", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "gap_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_graph.prototype, "gap_y", null);
    $.$mol_plot_graph = $mol_plot_graph;
})($ || ($ = {}));
(function ($) {
    class $mol_plot_graph_sample extends $.$mol_view {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_plot_graph_type": this.type() }));
        }
        type() {
            return "solid";
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "color": this.color() }));
        }
        color() {
            return "black";
        }
    }
    $.$mol_plot_graph_sample = $mol_plot_graph_sample;
})($ || ($ = {}));
//graph.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_graph extends $.$mol_plot_graph {
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            points() {
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const series_x = this.series_x();
                const series_y = this.series_y();
                return this.indexes().map(index => {
                    const point_x = Math.round(shift_x + series_x[index] * scale_x);
                    const point_y = Math.round(shift_y + series_y[index] * scale_y);
                    return [point_x, point_y];
                });
            }
            series_x() {
                return this.series_y().map((val, index) => index);
            }
            dimensions() {
                let next = new this.$.$mol_vector_2d($.$mol_vector_range_full.inversed, $.$mol_vector_range_full.inversed);
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    next = next.expanded1([series_x[i], series_y[i]]);
                }
                return next;
            }
            color() {
                const hue = this.hue();
                return hue ? `hsl( ${hue} , 100% , 35% )` : '';
            }
            front() {
                return [this];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_graph.prototype, "series_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_graph.prototype, "dimensions", null);
        $$.$mol_plot_graph = $mol_plot_graph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//graph.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/chart/legend/legend.view.css", "[mol_chart_legend] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex-direction: row;\n\tpadding: .5rem;\n\tmargin: .5rem;\n\tflex: 0 1 auto;\n}\n\n[mol_chart_legend_graph_legend] {\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tflex: 1 1 8rem;\n\tpadding: .5rem;\n}\n\n[mol_chart_legend_graph_title] {\n\tmargin: 0 .25rem;\n}\n\n[mol_chart_legend_graph_sample_box] {\n\tposition: relative;\n\twidth: 1.5rem;\n\tflex: none;\n}\n");
})($ || ($ = {}));
//legend.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_chart_legend extends $.$mol_scroll {
        graphs() {
            return [];
        }
        sub() {
            return this.graph_legends();
        }
        graph_legends() {
            return [];
        }
        Graph_legend(id) {
            return ((obj) => {
                obj.sub = () => [this.Graph_sample_box(id), this.Graph_title(id)];
                return obj;
            })(new this.$.$mol_view());
        }
        Graph_sample_box(id) {
            return ((obj) => {
                obj.sub = () => [this.Graph_sample(id)];
                return obj;
            })(new this.$.$mol_view());
        }
        Graph_sample(id) {
            return null;
        }
        Graph_title(id) {
            return ((obj) => {
                obj.sub = () => [this.graph_title(id)];
                return obj;
            })(new this.$.$mol_view());
        }
        graph_title(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_chart_legend.prototype, "Graph_legend", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_chart_legend.prototype, "Graph_sample_box", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_chart_legend.prototype, "Graph_title", null);
    $.$mol_chart_legend = $mol_chart_legend;
})($ || ($ = {}));
//legend.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_legend extends $.$mol_chart_legend {
            graphs_front() {
                return this.graphs().filter(graph => graph.Sample());
            }
            graph_legends() {
                return this.graphs_front().map((graph, index) => this.Graph_legend(index));
            }
            graph_title(index) {
                return this.graphs_front()[index].title();
            }
            Graph_sample(index) {
                return this.graphs_front()[index].Sample();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_chart_legend.prototype, "graphs_front", null);
        $$.$mol_chart_legend = $mol_chart_legend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//legend.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/pane/pane.view.css", "[mol_plot_pane] {\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tstroke-width: 2px;\n}\n");
})($ || ($ = {}));
//pane.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_pane extends $.$mol_svg_root {
        aspect() {
            return "none";
        }
        hue_base(val, force) {
            return (val !== void 0) ? val : NaN;
        }
        hue_shift(val, force) {
            return (val !== void 0) ? val : 111;
        }
        gap_hor() {
            return 48;
        }
        gap_vert() {
            return 24;
        }
        gap_left() {
            return this.gap_hor();
        }
        gap_right() {
            return this.gap_hor();
        }
        gap_top() {
            return this.gap_vert();
        }
        gap_bottom() {
            return this.gap_vert();
        }
        gap() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.gap_x(), this.gap_y()));
        }
        gap_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(this.gap_left(), this.gap_right()));
        }
        gap_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(this.gap_bottom(), this.gap_top()));
        }
        shift_limit() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.shift_limit_x(), this.shift_limit_y()));
        }
        shift_limit_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, 0));
        }
        shift_limit_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, 0));
        }
        shift_default() {
            return [0, 0];
        }
        shift(val, force) {
            return (val !== void 0) ? val : [0, 0];
        }
        scale_limit() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.scale_limit_x(), this.scale_limit_y()));
        }
        scale_limit_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, Infinity));
        }
        scale_limit_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(0, Infinity));
        }
        scale_default() {
            return [0, 0];
        }
        scale(val, force) {
            return (val !== void 0) ? val : [1, 1];
        }
        scale_x(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scale_y(val, force) {
            return (val !== void 0) ? val : 0;
        }
        size() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(0, 0));
        }
        size_real() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(1, 1));
        }
        dimensions_viewport() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.dimensions_viewport_x(), this.dimensions_viewport_y()));
        }
        dimensions_viewport_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions_viewport_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.dimensions_x(), this.dimensions_y()));
        }
        dimensions_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        sub() {
            return this.graphs_sorted();
        }
        graphs_sorted() {
            return [];
        }
        graphs_colored() {
            return this.graphs_positioned();
        }
        graphs_positioned() {
            return this.graphs();
        }
        graphs() {
            return [];
        }
        cursor_position(val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(NaN, NaN));
        }
        plugins() {
            return [...super.plugins(), this.Meter(), this.Touch()];
        }
        width() {
            return this.Meter().width();
        }
        height() {
            return this.Meter().height();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter());
        }
        Touch() {
            return ((obj) => {
                obj.zoom = (val) => this.scale_x(val);
                obj.pan = (val) => this.shift(val);
                obj.pos = (val) => this.cursor_position(val);
                return obj;
            })(new this.$.$mol_touch());
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "dblclick": (event) => this.reset(event) }));
        }
        reset(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "hue_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "hue_shift", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "gap", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "gap_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "gap_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "shift_limit", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "shift_limit_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "shift_limit_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "shift", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale_limit", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale_limit_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale_limit_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "scale_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "size", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "size_real", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions_viewport", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions_viewport_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions_viewport_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "dimensions_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "cursor_position", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "Touch", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_pane.prototype, "reset", null);
    $.$mol_plot_pane = $mol_plot_pane;
})($ || ($ = {}));
//pane.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_pane extends $.$mol_plot_pane {
            constructor() {
                super(...arguments);
                this.graph_touched = false;
            }
            dimensions() {
                const graphs = this.graphs();
                let next = new this.$.$mol_vector_2d($.$mol_vector_range_full.inversed, $.$mol_vector_range_full.inversed);
                for (let graph of graphs) {
                    next = next.expanded2(graph.dimensions());
                }
                return next;
            }
            size() {
                const dims = this.dimensions();
                return new this.$.$mol_vector_2d((dims.x.max - dims.x.min) || 1, (dims.y.max - dims.y.min) || 1);
            }
            graph_hue(index) {
                return (360 + (this.hue_base() + this.hue_shift() * index) % 360) % 360;
            }
            graphs_colored() {
                const graphs = this.graphs_positioned();
                for (let index = 0; index < graphs.length; index++) {
                    graphs[index].hue = () => this.graph_hue(index);
                }
                return graphs;
            }
            size_real() {
                return new this.$.$mol_vector_2d(this.width(), this.height());
            }
            view_box() {
                const size = this.size_real();
                return `0 0 ${size.x} ${size.y}`;
            }
            scale_limit() {
                const { x: { max: right }, y: { max: top } } = super.scale_limit();
                const gap = this.gap();
                const size = this.size();
                const real = this.size_real();
                const left = +(real.x - gap.x.min - gap.x.max) / size.x;
                const bottom = -(real.y - gap.y.max - gap.y.min) / size.y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(left, right), new this.$.$mol_vector_range(bottom, top));
            }
            scale_default() {
                const limits = this.scale_limit();
                return [limits.x.min, limits.y.min];
            }
            scale(next, force) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.scale_default();
                    next = $.$mol_atom2_value(() => this.scale()) || this.scale_default();
                }
                this.graph_touched = true;
                return new this.$.$mol_vector_2d(...next).limited(this.scale_limit());
            }
            scale_x(next) {
                return this.scale(next && [next, this.scale()[1]])[0];
            }
            scale_y(next) {
                return this.scale(next && [this.scale()[0], next])[1];
            }
            shift_limit() {
                const dims = this.dimensions();
                const [scale_x, scale_y] = this.scale();
                const size = this.size_real();
                const gap = this.gap();
                const left = gap.x.min - dims.x.min * scale_x;
                const right = size.x - gap.x.max - dims.x.max * scale_x;
                const top = gap.y.max - dims.y.max * scale_y;
                const bottom = size.y - gap.y.min - dims.y.min * scale_y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(right, left), new this.$.$mol_vector_range(bottom, top));
            }
            shift_default() {
                const limits = this.shift_limit();
                return [limits.x.min, limits.y.min];
            }
            shift(next, force) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.shift_default();
                    next = $.$mol_atom2_value(() => this.shift()) || this.shift_default();
                }
                this.graph_touched = true;
                return new this.$.$mol_vector_2d(...next).limited(this.shift_limit());
            }
            reset(event) {
                this.graph_touched = false;
                this.scale(this.scale_default(), $.$mol_mem_force_cache);
                this.shift(this.shift_default(), $.$mol_mem_force_cache);
            }
            graphs_positioned() {
                const graphs = this.graphs();
                for (let graph of graphs) {
                    graph.shift = () => this.shift();
                    graph.scale = () => this.scale();
                    graph.dimensions_pane = () => this.dimensions();
                    graph.viewport = () => this.viewport();
                    graph.size_real = () => this.size_real();
                    graph.cursor_position = () => this.cursor_position();
                    graph.gap = () => this.gap();
                }
                return graphs;
            }
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            graphs_sorted() {
                const graphs = this.graphs_colored();
                const sorted = [];
                for (let graph of graphs)
                    sorted.push(...graph.back());
                for (let graph of graphs)
                    sorted.push(...graph.front());
                return sorted;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "dimensions", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "size", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "graphs_colored", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "scale_limit", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "scale", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "shift_limit", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "shift_default", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "shift", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "graphs_positioned", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "viewport", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "graphs_sorted", null);
        $$.$mol_plot_pane = $mol_plot_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//pane.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/chart/chart.view.css", "[mol_chart] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-self: stretch;\n\tflex: 1 1 auto;\n\tpadding: .5rem;\n}\n\n[mol_chart_plot] {\n\tflex: 1 0 50%;\n\tmargin: .5rem;\n}\n");
})($ || ($ = {}));
//chart.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_chart extends $.$mol_view {
        gap_hor() {
            return 48;
        }
        gap_vert() {
            return 24;
        }
        gap_left() {
            return this.gap_hor();
        }
        gap_right() {
            return this.gap_hor();
        }
        gap_bottom() {
            return this.gap_vert();
        }
        gap_top() {
            return this.gap_vert();
        }
        graphs() {
            return [];
        }
        sub() {
            return [this.Legend(), this.Plot()];
        }
        Legend() {
            return ((obj) => {
                obj.graphs = () => this.graphs_colored();
                return obj;
            })(new this.$.$mol_chart_legend());
        }
        graphs_colored() {
            return this.Plot().graphs_colored();
        }
        Plot() {
            return ((obj) => {
                obj.gap_left = () => this.gap_left();
                obj.gap_right = () => this.gap_right();
                obj.gap_bottom = () => this.gap_bottom();
                obj.gap_top = () => this.gap_top();
                obj.graphs = () => this.graphs();
                obj.hue_base = (val) => this.hue_base();
                obj.hue_shift = (val) => this.hue_shift();
                return obj;
            })(new this.$.$mol_plot_pane());
        }
        hue_base() {
            return 140;
        }
        hue_shift() {
            return 111;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_chart.prototype, "Legend", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart.prototype, "Plot", null);
    $.$mol_chart = $mol_chart;
})($ || ($ = {}));
//chart.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/bar/bar.view.css", "[mol_plot_bar] {\n\tcolor: var(--mol_skin_base);\n\tstroke-linecap: butt;\n\tstroke-width: 1rem;\n}\n\n[mol_plot_bar_sample] {\n\tbackground: currentColor;\n\tposition: absolute;\n\ttop:0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n}\n");
})($ || ($ = {}));
//bar.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_bar extends $.$mol_plot_graph {
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "stroke-width": this.stroke_width() }));
        }
        stroke_width() {
            return "1rem";
        }
        sub() {
            return [this.Curve()];
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        Sample() {
            return ((obj) => {
                obj.color = () => this.color();
                return obj;
            })(new this.$.$mol_plot_graph_sample());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_bar.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_bar.prototype, "Sample", null);
    $.$mol_plot_bar = $mol_plot_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_bar extends $.$mol_plot_bar {
            indexes() {
                const { x: { min: viewport_left, max: viewport_right }, y: { min: viewport_bottom, max: viewport_top }, } = this.viewport();
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const indexes = [];
                const series_x = this.series_x();
                const series_y = this.series_y();
                let first_x = null;
                let last_x = null;
                for (let i = 0; i < series_x.length; i++) {
                    const scaled = [
                        Math.round(shift_x + series_x[i] * scale_x),
                        Math.round(shift_y + series_y[i] * scale_y),
                    ];
                    if (scaled[0] < viewport_left) {
                        first_x = i;
                        continue;
                    }
                    if (scaled[0] > viewport_right) {
                        if (last_x === null)
                            last_x = i;
                        continue;
                    }
                    if (scaled[1] < viewport_bottom)
                        continue;
                    if (scaled[1] > viewport_top)
                        continue;
                    if (first_x !== null)
                        indexes.push(first_x);
                    indexes.push(i);
                    if (last_x !== null)
                        indexes.push(last_x);
                    first_x = last_x = null;
                }
                if (first_x !== null)
                    indexes.push(first_x);
                if (last_x !== null)
                    indexes.push(last_x);
                return indexes;
            }
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                const [, shift_y] = this.shift();
                return points.map(point => `M ${point[0]} ${shift_y} V ${point[1]}`).join(' ');
            }
            stroke_width() {
                return (8 / Math.sqrt(this.indexes().length)).toPrecision(2) + '%';
            }
            color() {
                return `hsl( ${this.hue()} , 70% , 85% )`;
            }
            dimensions() {
                let next = new this.$.$mol_vector_2d($.$mol_vector_range_full.inversed, new this.$.$mol_vector_range(0, 0));
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    next = next.expanded1([series_x[i], series_y[i]]);
                }
                const gap = (next.x.max - next.x.min) / series_x.length || 0.00000001;
                next[0] = next.x.added1([-gap, gap]);
                return next;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_bar.prototype, "indexes", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_bar.prototype, "dimensions", null);
        $$.$mol_plot_bar = $mol_plot_bar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bar.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_group extends $.$mol_plot_graph {
        sub() {
            return this.graphs_enriched();
        }
        graphs_enriched() {
            return this.graphs();
        }
        graphs() {
            return [];
        }
        Sample() {
            return ((obj) => {
                obj.sub = () => this.graph_samples();
                return obj;
            })(new this.$.$mol_plot_graph_sample());
        }
        graph_samples() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_group.prototype, "Sample", null);
    $.$mol_plot_group = $mol_plot_group;
})($ || ($ = {}));
//group.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_group extends $.$mol_plot_group {
            graphs_enriched() {
                const graphs = this.graphs();
                for (let graph of graphs) {
                    graph.shift = () => this.shift();
                    graph.scale = () => this.scale();
                    graph.size_real = () => this.size_real();
                    graph.hue = () => this.hue();
                    graph.series_x = () => this.series_x();
                    graph.series_y = () => this.series_y();
                    graph.dimensions_pane = () => this.dimensions_pane();
                    graph.viewport = () => this.viewport();
                    graph.cursor_position = () => this.cursor_position();
                    graph.gap = () => this.gap();
                }
                return graphs;
            }
            dimensions() {
                const graphs = this.graphs();
                let next = new this.$.$mol_vector_2d($.$mol_vector_range_full.inversed, $.$mol_vector_range_full.inversed);
                for (let graph of graphs) {
                    next = next.expanded2(graph.dimensions());
                }
                return next;
            }
            graph_samples() {
                return this.graphs_enriched().map(graph => graph.Sample());
            }
            back() {
                const graphs = this.graphs_enriched();
                const next = [];
                for (let graph of graphs)
                    next.push(...graph.back());
                return next;
            }
            front() {
                const graphs = this.graphs_enriched();
                const next = [];
                for (let graph of graphs)
                    next.push(...graph.front());
                return next;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_group.prototype, "graphs_enriched", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_group.prototype, "dimensions", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_group.prototype, "graph_samples", null);
        $$.$mol_plot_group = $mol_plot_group;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//group.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/line/line.view.css", "[mol_plot_line] {\n\tcolor: var(--mol_skin_base);\n\tfill: none;\n\tstroke-linejoin: round;\n}\n\n[mol_plot_line_sample] {\n\theight: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tborder-width: 2px 0 0;\n\tposition: absolute;\n\ttop: .75em;\n\ttransform: translateY(-50%);\n}\n");
})($ || ($ = {}));
//line.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_line extends $.$mol_plot_graph {
        threshold() {
            return 4;
        }
        spacing() {
            return 2;
        }
        color_fill() {
            return "none";
        }
        sub() {
            return [this.Curve()];
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        Sample() {
            return ((obj) => {
                obj.color = () => this.color();
                obj.type = () => this.type();
                return obj;
            })(new this.$.$mol_plot_graph_sample());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_line.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_line.prototype, "Sample", null);
    $.$mol_plot_line = $mol_plot_line;
})($ || ($ = {}));
//line.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_line extends $.$mol_plot_line {
            indexes() {
                const threshold = this.threshold();
                const { x: { min: viewport_left, max: viewport_right }, y: { min: viewport_bottom, max: viewport_top }, } = this.viewport();
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const indexes = [];
                let last = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
                let first_x = null;
                let first_y = null;
                let last_x = null;
                let last_y = null;
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    const scaled = [
                        Math.round(shift_x + series_x[i] * scale_x),
                        Math.round(shift_y + series_y[i] * scale_y),
                    ];
                    if (Math.abs(scaled[0] - last[0]) < threshold
                        && Math.abs(scaled[1] - last[1]) < threshold)
                        continue;
                    last = scaled;
                    if (scaled[0] < viewport_left) {
                        first_x = i;
                        continue;
                    }
                    if (scaled[1] < viewport_bottom) {
                        first_y = i;
                        continue;
                    }
                    if (scaled[0] > viewport_right) {
                        if (last_x === null)
                            last_x = i;
                        continue;
                    }
                    if (scaled[1] > viewport_top) {
                        if (last_y === null)
                            last_y = i;
                        continue;
                    }
                    if (first_x !== null)
                        indexes.push(first_x);
                    if (first_y !== null)
                        indexes.push(first_y);
                    indexes.push(i);
                    if (last_x !== null)
                        indexes.push(last_x);
                    if (last_y !== null)
                        indexes.push(last_y);
                    first_x = first_y = last_x = last_y = null;
                }
                if (first_x !== null)
                    indexes.push(first_x);
                if (first_y !== null)
                    indexes.push(first_y);
                if (last_x !== null)
                    indexes.push(last_x);
                if (last_y !== null)
                    indexes.push(last_y);
                return indexes;
            }
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                const main = points.map(point => `L ${point.join(' ')}`).join(' ');
                return `M ${points[0].join(' ')} ${main}`;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_line.prototype, "indexes", null);
        $$.$mol_plot_line = $mol_plot_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//line.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_coord_pack(a, b) {
        return a << 16 | b & 0xFFFF;
    }
    $.$mol_coord_pack = $mol_coord_pack;
    function $mol_coord_high(key) {
        return key >> 16;
    }
    $.$mol_coord_high = $mol_coord_high;
    function $mol_coord_low(key) {
        return (key & 0xFFFF) << 16 >> 16;
    }
    $.$mol_coord_low = $mol_coord_low;
})($ || ($ = {}));
//coord.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/dot/dot.view.css", "[mol_plot_dot] {\n\tcolor: var(--mol_skin_base);\n\tstroke-linecap: round;\n\tfill: none;\n}\n\n[mol_plot_dot_sample] {\n\twidth: .5rem;\n\theight: .5rem;\n\tborder-radius: 1rem;\n\tbackground: currentColor;\n\tposition: absolute;\n\ttop: .75em;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n}\n");
})($ || ($ = {}));
//dot.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_dot extends $.$mol_plot_graph {
        points_max() {
            return Infinity;
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "stroke-width": this.diameter() }));
        }
        diameter() {
            return 8;
        }
        sub() {
            return [this.Curve()];
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        Sample() {
            return ((obj) => {
                obj.color = () => this.color();
                return obj;
            })(new this.$.$mol_plot_graph_sample());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_dot.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_dot.prototype, "Sample", null);
    $.$mol_plot_dot = $mol_plot_dot;
})($ || ($ = {}));
//dot.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_dot extends $.$mol_plot_dot {
            filled() {
                return new Set();
            }
            indexes() {
                const radius = this.diameter() / 2;
                const points_max = this.points_max();
                const viewport = this.viewport();
                const viewport_left = viewport.x.min - radius;
                const viewport_right = viewport.x.max + radius;
                const viewport_bottom = viewport.y.min - radius;
                const viewport_top = viewport.y.max + radius;
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                let last_x = Number.NEGATIVE_INFINITY;
                let last_y = Number.NEGATIVE_INFINITY;
                let spacing = 0;
                let filled = this.filled();
                let indexes;
                const series_x = this.series_x();
                const series_y = this.series_y();
                do {
                    indexes = [];
                    for (let i = 0; i < series_x.length; i++) {
                        const point_x = series_x[i];
                        const point_y = series_y[i];
                        const scaled_x = Math.round(shift_x + point_x * scale_x);
                        const scaled_y = Math.round(shift_y + point_y * scale_y);
                        if (Math.abs(scaled_x - last_x) < radius
                            && Math.abs(scaled_y - last_y) < radius)
                            continue;
                        last_x = scaled_x;
                        last_y = scaled_y;
                        if (scaled_x < viewport_left)
                            continue;
                        if (scaled_y < viewport_bottom)
                            continue;
                        if (scaled_x > viewport_right)
                            continue;
                        if (scaled_y > viewport_top)
                            continue;
                        if (spacing !== 0) {
                            const key = $.$mol_coord_pack(Math.round(point_x * scale_x / spacing) * spacing, Math.round(point_y * scale_y / spacing) * spacing);
                            if (filled.has(key))
                                continue;
                            filled.add(key);
                        }
                        indexes.push(i);
                        if (indexes.length > points_max)
                            break;
                    }
                    spacing += Math.ceil(radius);
                    filled.clear();
                } while (indexes.length > points_max);
                return indexes;
            }
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                return points.map(point => `M ${point.join(' ')} v 0`).join(' ');
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_dot.prototype, "filled", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_dot.prototype, "indexes", null);
        $$.$mol_plot_dot = $mol_plot_dot;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//dot.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_rect extends $.$mol_svg {
        dom_name() {
            return "rect";
        }
        pos() {
            return [];
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "width": this.width(), "height": this.height(), "x": this.pos_x(), "y": this.pos_y() }));
        }
        width() {
            return "0";
        }
        height() {
            return "0";
        }
        pos_x() {
            return "";
        }
        pos_y() {
            return "";
        }
    }
    $.$mol_svg_rect = $mol_svg_rect;
})($ || ($ = {}));
//rect.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_rect extends $.$mol_svg_rect {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_rect = $mol_svg_rect;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//rect.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/svg/text/text.view.css", "[mol_svg_text] {\n\tfill: currentColor;\n\tstroke: none;\n}\n");
})($ || ($ = {}));
//text.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_text extends $.$mol_svg {
        dom_name() {
            return "text";
        }
        pos() {
            return [];
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "x": this.pos_x(), "y": this.pos_y(), "text-anchor": this.align() }));
        }
        pos_x() {
            return "";
        }
        pos_y() {
            return "";
        }
        align() {
            return "middle";
        }
        sub() {
            return [this.text()];
        }
        text() {
            return "";
        }
    }
    $.$mol_svg_text = $mol_svg_text;
})($ || ($ = {}));
//text.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_text extends $.$mol_svg_text {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_text = $mol_svg_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//text.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/svg/text/box/box.view.css", "[mol_svg_text_box_back] {\n\tstroke: none;\n\tfill: var(--mol_theme_back);\n}\n");
})($ || ($ = {}));
//box.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_text_box extends $.$mol_svg_group {
        font_size() {
            return 16;
        }
        sub() {
            return [this.Back(), this.Text()];
        }
        Back() {
            return ((obj) => {
                obj.width = () => this.box_width();
                obj.height = () => this.box_height();
                obj.pos = () => [this.box_pos_x(), this.box_pos_y()];
                return obj;
            })(new this.$.$mol_svg_rect());
        }
        box_width() {
            return "0.5rem";
        }
        box_height() {
            return "1rem";
        }
        box_pos_x() {
            return this.pos_x();
        }
        box_pos_y() {
            return "0";
        }
        Text() {
            return ((obj) => {
                obj.pos = () => [this.pos_x(), this.pos_y()];
                obj.align = () => this.align();
                obj.sub = () => [this.text()];
                return obj;
            })(new this.$.$mol_svg_text());
        }
        pos_x() {
            return "0";
        }
        pos_y() {
            return "100%";
        }
        align() {
            return "start";
        }
        text() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_svg_text_box.prototype, "Back", null);
    __decorate([
        $.$mol_mem
    ], $mol_svg_text_box.prototype, "Text", null);
    $.$mol_svg_text_box = $mol_svg_text_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_text_box extends $.$mol_svg_text_box {
            box_width() {
                return this.text_width(this.text());
            }
            box_pos_x() {
                const align = this.align();
                if (align === 'end')
                    return `calc(${this.pos_x()} - ${this.box_width()})`;
                if (align === 'middle')
                    return `calc(${this.pos_x()} - ${Math.round(this.box_width() / 2)})`;
                return this.pos_x();
            }
            box_pos_y() {
                return `calc(${this.pos_y()} - ${this.font_size() - 2})`;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_svg_text_box.prototype, "box_width", null);
        $$.$mol_svg_text_box = $mol_svg_text_box;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//box.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_math_round_expand(val, gap = 1) {
        if (val === 0)
            return 0;
        const val_abs = Math.abs(val);
        const val_sign = val ? Math.round(val / val_abs) : 0;
        const digits = Math.floor(Math.log(val_abs) / Math.log(10));
        const precission = Math.pow(10, digits - gap);
        const val_expanded = precission * Math.ceil(val_abs / precission);
        return val_sign * val_expanded;
    }
    $.$mol_math_round_expand = $mol_math_round_expand;
})($ || ($ = {}));
//expand.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/ruler/ruler.view.css", "[mol_plot_ruler_curve] {\n\tcolor: var(--mol_theme_line);\n\tstroke-width: 1px;\n\tstroke: currentColor;\n}\n\n[mol_plot_ruler_label] {\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_plot_ruler_title] {\n\tcolor: var(--mol_theme_shade);\n\tbackground-color: var(--mol_theme_back);\n}\n\n[mol_plot_ruler_background] {\n\tstroke: none;\n\tfill: var(--mol_theme_back);\n\topacity: 0.8;\n}\n");
})($ || ($ = {}));
//ruler.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_ruler extends $.$mol_plot_graph {
        step() {
            return 0;
        }
        scale_axis() {
            return 1;
        }
        scale_step() {
            return 1;
        }
        shift_axis() {
            return 1;
        }
        dimensions_axis() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        viewport_axis() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        axis_points() {
            return [];
        }
        normalize(val, force) {
            return (val !== void 0) ? val : 0;
        }
        precision() {
            return 1;
        }
        sub() {
            return [this.Background(), this.Curve(), this.labels_formatted(), this.Title()];
        }
        Background() {
            return ((obj) => {
                obj.pos_x = () => this.background_x();
                obj.pos_y = () => this.background_y();
                obj.width = () => this.background_width();
                obj.height = () => this.background_height();
                return obj;
            })(new this.$.$mol_svg_rect());
        }
        background_x() {
            return "0";
        }
        background_y() {
            return "0";
        }
        background_width() {
            return "100%";
        }
        background_height() {
            return "14";
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        labels_formatted() {
            return [];
        }
        Title() {
            return ((obj) => {
                obj.pos_x = () => this.title_pos_x();
                obj.pos_y = () => this.title_pos_y();
                obj.align = () => this.title_align();
                obj.text = () => this.title();
                return obj;
            })(new this.$.$mol_svg_text_box());
        }
        title_pos_x() {
            return "0";
        }
        title_pos_y() {
            return "100%";
        }
        title_align() {
            return "start";
        }
        Label(index) {
            return ((obj) => {
                obj.pos = () => this.label_pos(index);
                obj.text = () => this.label_text(index);
                obj.align = () => this.label_align();
                return obj;
            })(new this.$.$mol_svg_text());
        }
        label_pos(index) {
            return [this.label_pos_x(index), this.label_pos_y(index)];
        }
        label_pos_x(index) {
            return "";
        }
        label_pos_y(index) {
            return "";
        }
        label_text(index) {
            return "";
        }
        label_align() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "dimensions_axis", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "viewport_axis", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "normalize", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "Background", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_ruler.prototype, "Title", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_plot_ruler.prototype, "Label", null);
    $.$mol_plot_ruler = $mol_plot_ruler;
})($ || ($ = {}));
//ruler.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_ruler extends $.$mol_plot_ruler {
            labels_formatted() {
                return this.axis_points().map((point, index) => this.Label(index));
            }
            step() {
                const scale = this.scale_step();
                const dims = this.dimensions_axis();
                const range = dims.max - dims.min;
                const min_width = (Math.abs(Math.log10(range)) + 2) * 15;
                const size = $.$mol_math_round_expand(range, -1);
                const count = Math.max(1, Math.pow(10, Math.floor(Math.log(size * scale / min_width) / Math.log(10))));
                let step = size / count;
                const step_max = min_width * 2 / scale;
                if (step > step_max)
                    step /= 2;
                if (step > step_max)
                    step /= 2;
                return Math.max(step, Math.abs(dims.min) / 1e10, Math.abs(dims.max) / 1e10);
            }
            snap_to_grid(coord) {
                const viewport = this.viewport_axis();
                const scale = this.scale_axis();
                const shift = this.shift_axis();
                const step = this.step();
                const val = Math.round(coord / step) * step;
                if (scale == 0)
                    return val;
                const step_scaled = step * scale;
                const scaled = val * scale + shift;
                let count = 0;
                if (scaled < viewport.min)
                    count = (scaled - viewport.min) / step_scaled;
                if (scaled > viewport.max)
                    count = (scaled - viewport.max) / step_scaled;
                return val - Math.floor(count) * step;
            }
            axis_points() {
                const dims = this.dimensions_axis();
                const start = this.snap_to_grid(dims.min);
                const end = this.snap_to_grid(dims.max);
                const step = this.step();
                const next = [];
                for (let val = start; val <= end; val += step) {
                    next.push(val);
                }
                return next;
            }
            precision() {
                const step = this.step();
                return Math.max(0, Math.min(15, (step - Math.floor(step)).toString().length - 2));
            }
            label_text(index) {
                const point = this.axis_points()[index];
                return point.toFixed(this.precision());
            }
            font_size() {
                return this.Background().font_size();
            }
            back() {
                return [this.Curve()];
            }
            front() {
                return [this.Background(), ...this.labels_formatted(), this.Title()];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler.prototype, "step", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler.prototype, "axis_points", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler.prototype, "precision", null);
        $$.$mol_plot_ruler = $mol_plot_ruler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//ruler.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/ruler/vert/vert.view.css", "[mol_plot_ruler_vert_label] {\n\ttransform: translateY( 4px );\n}\n");
})($ || ($ = {}));
//vert.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_ruler_vert extends $.$mol_plot_ruler {
        title_align() {
            return "end";
        }
        label_align() {
            return "end";
        }
        title_pos_y() {
            return "14";
        }
        label_pos_x(v) {
            return this.title_pos_x();
        }
        background_height() {
            return "100%";
        }
        background_width() {
            return this.title_pos_x();
        }
    }
    $.$mol_plot_ruler_vert = $mol_plot_ruler_vert;
})($ || ($ = {}));
//vert.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
            dimensions_axis() {
                return this.dimensions_pane().y;
            }
            viewport_axis() {
                return new this.$.$mol_vector_range(0, this.size_real().y);
            }
            scale_axis() {
                return this.scale()[1];
            }
            scale_step() {
                return -this.scale()[1];
            }
            shift_axis() {
                return this.shift()[1];
            }
            curve() {
                const [, shift] = this.shift();
                const [, scale] = this.scale();
                return this.axis_points().map(point => {
                    const scaled = point * scale + shift;
                    return `M 0 ${scaled.toFixed(3)} H 2000`;
                }).join(' ');
            }
            title_pos_x() {
                return String(this.gap().x.min);
            }
            label_pos_y(index) {
                return (this.axis_points()[index] * this.scale()[1] + this.shift()[1]).toFixed(3);
            }
        }
        $$.$mol_plot_ruler_vert = $mol_plot_ruler_vert;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//vert.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/ruler/hor/hor.view.css", "[mol_plot_ruler_hor_label] {\n\ttransform: translateY( -4px );\n}\n\n[mol_plot_ruler_hor_title] {\n\ttransform: translateY( -4px );\n}\n");
})($ || ($ = {}));
//hor.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_ruler_hor extends $.$mol_plot_ruler {
        title_align() {
            return "start";
        }
        label_align() {
            return "middle";
        }
        title_pos_x() {
            return "0";
        }
        title_pos_y() {
            return "100%";
        }
        label_pos_y(v) {
            return this.title_pos_y();
        }
        background_width() {
            return "100%";
        }
    }
    $.$mol_plot_ruler_hor = $mol_plot_ruler_hor;
})($ || ($ = {}));
//hor.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
            dimensions_axis() {
                return this.dimensions_pane().x;
            }
            viewport_axis() {
                return new this.$.$mol_vector_range(0, this.size_real().x);
            }
            scale_axis() {
                return this.scale()[0];
            }
            scale_step() {
                return this.scale()[0];
            }
            shift_axis() {
                return this.shift()[0];
            }
            curve() {
                const [shift] = this.shift();
                const [scale] = this.scale();
                return this.axis_points().map(point => {
                    const scaled = point * scale + shift;
                    return `M ${scaled.toFixed(3)} 1000 V 0`;
                }).join(' ');
            }
            label_pos_x(index) {
                return (this.axis_points()[index] * this.scale()[0] + this.shift()[0]).toFixed(3);
            }
            background_y() {
                return String(this.size_real()[1] - this.font_size());
            }
            background_height() {
                return String(this.font_size());
            }
        }
        $$.$mol_plot_ruler_hor = $mol_plot_ruler_hor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hor.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/mark/hor/hor.view.css", "[mol_plot_mark_hor_curve] {\n\tcolor: var(--mol_theme_line);\n\tstroke-width: .1%;\n\tstroke: currentColor;\n}\n\n[mol_plot_mark_hor_label] {\n\tcolor: var(--mol_theme_text);\n\ttransform: translateY( -4px );\n}\n\n[mol_plot_mark_hor_title] {\n\tcolor: var(--mol_theme_shade);\n\ttransform: translateY( -4px );\n}\n");
})($ || ($ = {}));
//hor.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_mark_hor extends $.$mol_plot_ruler_hor {
        labels() {
            return [];
        }
    }
    $.$mol_plot_mark_hor = $mol_plot_mark_hor;
})($ || ($ = {}));
//hor.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_mark_hor extends $.$mol_plot_mark_hor {
            series_x() {
                return this.labels().map((val, index) => index);
            }
            labels() {
                return this.series_x().map(val => String(val));
            }
            visible_indexes() {
                const series_x = this.series_x();
                const labels = this.labels();
                const [shift_x,] = this.shift();
                const [scale_x,] = this.scale();
                let step = this.step() * scale_x;
                const [[viewport_left, viewport_right]] = this.viewport();
                const size_x = viewport_right - viewport_left;
                const font_size = this.font_size();
                let indexes;
                let labels_width;
                do {
                    indexes = [];
                    labels_width = 0;
                    let last = 0;
                    let current = 0;
                    for (let i = 0; i < series_x.length; i++) {
                        const point_x = series_x[i];
                        const scaled_x = (shift_x + point_x * scale_x);
                        if (scaled_x < viewport_left)
                            continue;
                        if (scaled_x > viewport_right)
                            continue;
                        if (current === 0)
                            current = scaled_x;
                        if (scaled_x < current) {
                            last = i;
                            continue;
                        }
                        indexes.push(i);
                        current += step;
                        last = 0;
                        labels_width += font_size * (labels[i].length + 1);
                        if (labels_width > size_x)
                            break;
                    }
                    if (last !== 0) {
                        indexes.push(last);
                        labels_width += font_size * (labels[last].length + 1);
                    }
                    step *= 1.5;
                } while (labels_width > size_x && indexes.length > 2);
                return indexes;
            }
            curve() {
                const [shift] = this.shift();
                const [scale] = this.scale();
                const series_x = this.series_x();
                return this.visible_indexes().map(index => {
                    const scaled = series_x[index] * scale + shift;
                    return `M ${scaled.toFixed(3)} 1000 V 0`;
                }).join(' ');
            }
            label_text(index) {
                return this.labels()[index];
            }
            labels_formatted() {
                return this.visible_indexes().map(index => this.Label(index));
            }
            label_pos_x(index) {
                return (this.series_x()[index] * this.scale()[0] + this.shift()[0]).toFixed(3);
            }
            label_pos_y(index) {
                return this.title_pos_y();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_mark_hor.prototype, "series_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_mark_hor.prototype, "labels", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_mark_hor.prototype, "visible_indexes", null);
        $$.$mol_plot_mark_hor = $mol_plot_mark_hor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hor.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/mark/cross/cross.view.css", "[mol_plot_mark_cross_curve] {\n\tcolor: var(--mol_theme_focus);\n\tstroke-width: 1px;\n\tstroke: currentColor;\n}\n\n[mol_plot_mark_cross_label_x], [mol_plot_mark_cross_label_y] {\n\tcolor: var(--mol_theme_focus);\n\tfont-weight: bold;\n\tpointer-events: none;\n}\n\n[mol_plot_mark_cross_label_y] {\n\ttransform: translateY( 4px );\n}\n");
})($ || ($ = {}));
//cross.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_mark_cross extends $.$mol_plot_graph {
        labels() {
            return [];
        }
        title_x_gap() {
            return 4;
        }
        threshold() {
            return 16;
        }
        graphs() {
            return [];
        }
        dimensions() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_2d(this.dimensions_x(), this.dimensions_y()));
        }
        dimensions_x() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        dimensions_y() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_vector_range(Infinity, -Infinity));
        }
        sub() {
            return [this.Curve(), this.Label_x(), this.Label_y()];
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        Label_x() {
            return ((obj) => {
                obj.pos_x = () => this.title_x_pos_x();
                obj.pos_y = () => this.title_x_pos_y();
                obj.text = () => this.title_x();
                return obj;
            })(new this.$.$mol_svg_text_box());
        }
        title_x_pos_x() {
            return "0";
        }
        title_x_pos_y() {
            return "100%";
        }
        title_x() {
            return "";
        }
        Label_y() {
            return ((obj) => {
                obj.pos_x = () => this.title_y_pos_x();
                obj.pos_y = () => this.title_y_pos_y();
                obj.text = () => this.title_y();
                return obj;
            })(new this.$.$mol_svg_text_box());
        }
        title_y_pos_x() {
            return "0";
        }
        title_y_pos_y() {
            return "0";
        }
        title_y() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "dimensions", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "dimensions_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "dimensions_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "Label_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_mark_cross.prototype, "Label_y", null);
    $.$mol_plot_mark_cross = $mol_plot_mark_cross;
})($ || ($ = {}));
//cross.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {
            nearest() {
                let delta = this.threshold() ** 2;
                const [cursor_x, cursor_y] = this.cursor_position();
                if (Number.isNaN(cursor_x) || Number.isNaN(cursor_y))
                    return null;
                const graphs = this.graphs();
                let index = 0;
                let graph = null;
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                for (let current of graphs) {
                    const indexes = current.indexes();
                    const series_x = current.series_x();
                    const series_y = current.series_y();
                    for (let i of indexes) {
                        const point_x = shift_x + series_x[i] * scale_x;
                        const point_y = shift_y + series_y[i] * scale_y;
                        const diff = (point_x - cursor_x) ** 2 + (point_y - cursor_y) ** 2;
                        if (diff < delta) {
                            delta = diff;
                            index = i;
                            graph = current;
                        }
                    }
                }
                if (!graph)
                    return null;
                const value = new $.$mol_vector_2d(graph.series_x()[index], graph.series_y()[index]);
                const scaled = new $.$mol_vector_2d(shift_x + value.x * scale_x, shift_y + value.y * scale_y);
                return { value, scaled, index };
            }
            curve() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                return `M ${nearest.scaled.x.toFixed(3)} 1000 V 0 M 0 ${nearest.scaled.y.toFixed(3)} H 2000`;
            }
            title_x() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                const labels = this.labels();
                if (labels.length > nearest.index)
                    return labels[nearest.index];
                return String(nearest.value.x);
            }
            title_x_pos_x() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                const width = this.text_width(this.title_x());
                return (nearest.scaled.x - width / 2).toFixed(3);
            }
            title_x_pos_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                const pos = this.size_real().y - this.title_x_gap();
                return pos.toFixed(3);
            }
            title_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                return String(nearest.value.y);
            }
            title_y_pos_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                return nearest.scaled.y.toFixed(3);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_mark_cross.prototype, "nearest", null);
        $$.$mol_plot_mark_cross = $mol_plot_mark_cross;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//cross.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_chart_demo_simple extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_chart_demo_simple_title");
        }
        sub() {
            return [this.Chart()];
        }
        Chart() {
            return ((obj) => {
                obj.graphs = () => [this.Plan(), this.Fact(), this.Vert_ruler(), this.Marker_hor(), this.Marker_cross()];
                return obj;
            })(new this.$.$mol_chart());
        }
        Plan() {
            return ((obj) => {
                obj.title = () => this.plan_title();
                obj.series_y = () => this.plan();
                return obj;
            })(new this.$.$mol_plot_bar());
        }
        plan_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_simple_plan_title");
        }
        plan() {
            return [10, 20, 30, 40];
        }
        Fact() {
            return ((obj) => {
                obj.title = () => this.fact_title();
                obj.series_y = () => this.facts();
                obj.graphs = () => [this.Fact_line(), this.Fact_dots()];
                return obj;
            })(new this.$.$mol_plot_group());
        }
        fact_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_simple_fact_title");
        }
        facts() {
            return [5, 10, 30];
        }
        Fact_line() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_line());
        }
        Fact_dots() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        Vert_ruler() {
            return ((obj) => {
                obj.title = () => this.vert_title();
                return obj;
            })(new this.$.$mol_plot_ruler_vert());
        }
        vert_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_simple_vert_title");
        }
        Marker_hor() {
            return ((obj) => {
                obj.title = () => this.marker_hor_title();
                obj.labels = () => this.months();
                return obj;
            })(new this.$.$mol_plot_mark_hor());
        }
        marker_hor_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_simple_marker_hor_title");
        }
        months() {
            return ["January", "February", "March", "April"];
        }
        Marker_cross() {
            return ((obj) => {
                obj.labels = () => this.months();
                obj.graphs = () => [this.Plan(), this.Fact_dots()];
                return obj;
            })(new this.$.$mol_plot_mark_cross());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Chart", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Plan", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Fact", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Fact_line", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Fact_dots", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Vert_ruler", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Marker_hor", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_simple.prototype, "Marker_cross", null);
    $.$mol_chart_demo_simple = $mol_chart_demo_simple;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/fill/fill.view.css", "[mol_plot_fill] {\n\tstroke: none;\n\tstroke-width: 0;\n\topacity: .1;\n\tfill: currentColor;\n}\n\n[mol_plot_fill_sample] {\n\topacity: .1;\n\tbackground: currentColor;\n\tposition: absolute;\n\tbottom: 0;\n\ttop: .75em;\n\tleft: 0;\n\tright: 0;\n}\n");
})($ || ($ = {}));
//fill.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_fill extends $.$mol_plot_graph {
        points() {
            return [];
        }
        threshold() {
            return 4;
        }
        spacing() {
            return 2;
        }
        sub() {
            return [this.Curve()];
        }
        Curve() {
            return ((obj) => {
                obj.geometry = () => this.curve();
                return obj;
            })(new this.$.$mol_svg_path());
        }
        curve() {
            return "";
        }
        Sample() {
            return ((obj) => {
                obj.color = () => this.color();
                return obj;
            })(new this.$.$mol_plot_graph_sample());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_fill.prototype, "Curve", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_fill.prototype, "Sample", null);
    $.$mol_plot_fill = $mol_plot_fill;
})($ || ($ = {}));
//fill.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_fill extends $.$mol_plot_fill {
            indexes() {
                const threshold = this.threshold();
                const { x: { min: viewport_left, max: viewport_right }, y: { min: viewport_bottom, max: viewport_top }, } = this.viewport();
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const indexes = [];
                let last = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
                let first_x = null;
                let first_y = null;
                let last_x = null;
                let last_y = null;
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    const scaled = [
                        Math.round(shift_x + series_x[i] * scale_x),
                        Math.round(shift_y + series_y[i] * scale_y),
                    ];
                    if (Math.abs(scaled[0] - last[0]) < threshold
                        && Math.abs(scaled[1] - last[1]) < threshold)
                        continue;
                    last = scaled;
                    if (scaled[0] < viewport_left) {
                        first_x = i;
                        continue;
                    }
                    if (scaled[1] < viewport_bottom) {
                        first_y = i;
                        continue;
                    }
                    if (scaled[0] > viewport_right) {
                        last_x = i;
                        continue;
                    }
                    if (scaled[1] > viewport_top) {
                        last_y = i;
                        continue;
                    }
                    if (first_x !== null)
                        indexes.push(first_x);
                    if (first_y !== null)
                        indexes.push(first_y);
                    indexes.push(i);
                    if (last_x !== null)
                        indexes.push(last_x);
                    if (last_y !== null)
                        indexes.push(last_y);
                    first_x = first_y = last_x = last_y = null;
                }
                if (first_x !== null)
                    indexes.push(first_x);
                if (first_y !== null)
                    indexes.push(first_y);
                if (last_x !== null)
                    indexes.push(last_x);
                if (last_y !== null)
                    indexes.push(last_y);
                return indexes;
            }
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                const [, shift_y] = this.shift();
                const main = points.map(point => `L ${point.join(' ')}`).join(' ');
                return `M ${points[0].join(' ')} ${main} V ${shift_y} H ${points[0][0]}`;
            }
            back() {
                return [this];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_fill.prototype, "indexes", null);
        $$.$mol_plot_fill = $mol_plot_fill;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//fill.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_chart_demo_styles extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_title");
        }
        samples_count() {
            return 15;
        }
        sub() {
            return [this.Chart()];
        }
        Chart() {
            return ((obj) => {
                obj.graphs = () => this.graphs();
                return obj;
            })(new this.$.$mol_chart());
        }
        graphs() {
            return [this.Receipts(), this.Receipts_confirmed(), this.Maximum(), this.Waste(), this.Purchases(), this.Taxes(), this.Energy(), this.Day()];
        }
        Receipts() {
            return ((obj) => {
                obj.title = () => this.receipts_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_2_y();
                return obj;
            })(new this.$.$mol_plot_bar());
        }
        receipts_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_receipts_title");
        }
        series_x() {
            return [];
        }
        series_2_y() {
            return [];
        }
        Receipts_confirmed() {
            return ((obj) => {
                obj.title = () => this.receipts_confirmed_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_3_y();
                return obj;
            })(new this.$.$mol_plot_bar());
        }
        receipts_confirmed_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_receipts_confirmed_title");
        }
        series_3_y() {
            return [];
        }
        Maximum() {
            return ((obj) => {
                obj.title = () => this.maximum_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_1_y();
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        maximum_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_maximum_title");
        }
        series_1_y() {
            return [];
        }
        Waste() {
            return ((obj) => {
                obj.type = () => "dashed";
                obj.title = () => this.waste_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_4_y();
                return obj;
            })(new this.$.$mol_plot_line());
        }
        waste_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_waste_title");
        }
        series_4_y() {
            return [];
        }
        Purchases() {
            return ((obj) => {
                obj.title = () => this.purchases_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_5_y();
                obj.graphs = () => [this.Purchases_fill(), this.Purchases_line(), this.Purchases_dots()];
                return obj;
            })(new this.$.$mol_plot_group());
        }
        purchases_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_purchases_title");
        }
        series_5_y() {
            return [];
        }
        Purchases_fill() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_fill());
        }
        Purchases_line() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_line());
        }
        Purchases_dots() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        Taxes() {
            return ((obj) => {
                obj.title = () => this.taxes_title();
                obj.series_x = () => this.series_x();
                obj.series_y = () => this.series_6_y();
                obj.graphs = () => [this.Taxes_fill(), this.Taxes_line(), this.Taxes_dots()];
                return obj;
            })(new this.$.$mol_plot_group());
        }
        taxes_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_taxes_title");
        }
        series_6_y() {
            return [];
        }
        Taxes_fill() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_fill());
        }
        Taxes_line() {
            return ((obj) => {
                obj.type = () => "dashed";
                return obj;
            })(new this.$.$mol_plot_line());
        }
        Taxes_dots() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        Energy() {
            return ((obj) => {
                obj.title = () => this.energy_title();
                return obj;
            })(new this.$.$mol_plot_ruler_vert());
        }
        energy_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_energy_title");
        }
        Day() {
            return ((obj) => {
                obj.title = () => this.day_title();
                obj.series_x = () => this.series_x();
                return obj;
            })(new this.$.$mol_plot_mark_hor());
        }
        day_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_styles_day_title");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Chart", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Receipts", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Receipts_confirmed", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Maximum", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Waste", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Purchases", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Purchases_fill", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Purchases_line", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Purchases_dots", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Taxes", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Taxes_fill", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Taxes_line", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Taxes_dots", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Energy", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_styles.prototype, "Day", null);
    $.$mol_chart_demo_styles = $mol_chart_demo_styles;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_demo_styles extends $.$mol_chart_demo_styles {
            limit() {
                const shift = 10;
                return [shift, shift + this.samples_count()];
            }
            series_x() {
                const next = [];
                const [shift, limit] = this.limit();
                for (let i = shift; i < limit; i++)
                    next.push(i);
                return next;
            }
            series_y() {
                const [, limit] = this.limit();
                return this.series_x().map(i => Number((6.5 + Math.sin(8 * i / limit)).toFixed(3)));
            }
            series_1_y() {
                return this.series_y().map(val => (val - 1).toFixed(3)).map(Number);
            }
            series_2_y() {
                return this.series_y().map(val => (val - 2).toFixed(3)).map(Number);
            }
            series_3_y() {
                return this.series_y().map(val => (val - 3).toFixed(3)).map(Number);
            }
            series_4_y() {
                return this.series_y().map(val => (val - 4).toFixed(3)).map(Number);
            }
            series_5_y() {
                return this.series_y().map(val => (val - 5).toFixed(3)).map(Number);
            }
            series_6_y() {
                return this.series_y().map(val => (val - 6).toFixed(3)).map(Number);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_1_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_2_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_3_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_4_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_5_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_styles.prototype, "series_6_y", null);
        $$.$mol_chart_demo_styles = $mol_chart_demo_styles;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_chart_demo_forces extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_chart_demo_forces_title");
        }
        samples_count() {
            return 10000;
        }
        points_max() {
            return 600;
        }
        sub() {
            return [this.Chart()];
        }
        Chart() {
            return ((obj) => {
                obj.graphs = () => [this.Forces_left(), this.Forces_right(), this.Vert_ruler(), this.Hor_ruler(), this.Cross()];
                return obj;
            })(new this.$.$mol_chart());
        }
        Forces_left() {
            return ((obj) => {
                obj.title = () => this.forces_left_title();
                obj.series_x = () => this.forces_left_x();
                obj.series_y = () => this.forces_left_y();
                obj.points_max = () => this.points_max();
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        forces_left_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_forces_forces_left_title");
        }
        forces_left_x() {
            return [];
        }
        forces_left_y() {
            return [];
        }
        Forces_right() {
            return ((obj) => {
                obj.title = () => this.forces_right_title();
                obj.series_x = () => this.forces_right_x();
                obj.series_y = () => this.forces_right_y();
                obj.points_max = () => this.points_max();
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        forces_right_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_forces_forces_right_title");
        }
        forces_right_x() {
            return [];
        }
        forces_right_y() {
            return [];
        }
        Vert_ruler() {
            return ((obj) => {
                obj.title = () => this.vert_title();
                return obj;
            })(new this.$.$mol_plot_ruler_vert());
        }
        vert_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_forces_vert_title");
        }
        Hor_ruler() {
            return ((obj) => {
                obj.title = () => this.hor_title();
                obj.series_x = () => this.forces_left_x();
                return obj;
            })(new this.$.$mol_plot_ruler_hor());
        }
        hor_title() {
            return this.$.$mol_locale.text("$mol_chart_demo_forces_hor_title");
        }
        Cross() {
            return ((obj) => {
                obj.graphs = () => [this.Forces_left(), this.Forces_right()];
                return obj;
            })(new this.$.$mol_plot_mark_cross());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Chart", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Forces_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Forces_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Vert_ruler", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Hor_ruler", null);
    __decorate([
        $.$mol_mem
    ], $mol_chart_demo_forces.prototype, "Cross", null);
    $.$mol_chart_demo_forces = $mol_chart_demo_forces;
})($ || ($ = {}));
//forces.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_demo_forces extends $.$mol_chart_demo_forces {
            generate_forces() {
                const samples_count = this.samples_count();
                const max_x = 600;
                const base_y = 80;
                const amplitude = 5;
                const freq = 50;
                const series_x = [];
                const series_y = [];
                const ratio = max_x / samples_count;
                for (let i = 0; i < samples_count; i++) {
                    const deviation = Math.random() > 0.6 ? (Math.random() * 3) : Math.random();
                    const value = Number((base_y + Math.sin((freq / samples_count) * i) * amplitude * deviation).toFixed(3));
                    series_x.push(Number(Number(i * ratio).toFixed(3)));
                    series_y.push(value);
                }
                return [series_x, series_y];
            }
            forces_left() {
                return this.generate_forces();
            }
            forces_right() {
                return this.generate_forces();
            }
            forces_left_x() {
                return this.forces_left()[0];
            }
            forces_left_y() {
                return this.forces_left()[1];
            }
            forces_right_x() {
                return this.forces_right()[0];
            }
            forces_right_y() {
                return this.forces_right()[1];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_forces.prototype, "forces_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart_demo_forces.prototype, "forces_right", null);
        $$.$mol_chart_demo_forces = $mol_chart_demo_forces;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//forces.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_box_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_check_box_demo_title");
        }
        sub() {
            return [this.Labeled_base(), this.Labeled_checked(), this.Labeled_disabled(), this.Alone_base(), this.Alone_checked(), this.Alone_disabled()];
        }
        Labeled_base() {
            return ((obj) => {
                obj.checked = (val) => this.base_checked(val);
                obj.title = () => this.c1Label();
                return obj;
            })(new this.$.$mol_check_box());
        }
        base_checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        c1Label() {
            return this.$.$mol_locale.text("$mol_check_box_demo_c1Label");
        }
        Labeled_checked() {
            return ((obj) => {
                obj.title = () => this.c2Label();
                obj.checked = (val) => this.checked_checked(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        c2Label() {
            return this.$.$mol_locale.text("$mol_check_box_demo_c2Label");
        }
        checked_checked(val, force) {
            return (val !== void 0) ? val : true;
        }
        Labeled_disabled() {
            return ((obj) => {
                obj.title = () => this.c6Label();
                obj.checked = () => true;
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_check_box());
        }
        c6Label() {
            return this.$.$mol_locale.text("$mol_check_box_demo_c6Label");
        }
        Alone_base() {
            return ((obj) => {
                obj.checked = (val) => this.base_checked(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        Alone_checked() {
            return ((obj) => {
                obj.checked = (val) => this.checked_checked(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        Alone_disabled() {
            return ((obj) => {
                obj.checked = () => true;
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_check_box());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Labeled_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "base_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Labeled_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "checked_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Labeled_disabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Alone_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Alone_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_box_demo.prototype, "Alone_disabled", null);
    $.$mol_check_box_demo = $mol_check_box_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_expand_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_check_expand_demo_title");
        }
        sub() {
            return [this.Labeled_base(), this.Labeled_expanded(), this.Empty_base(), this.Empty_expanded(), this.Disabled()];
        }
        Labeled_base() {
            return ((obj) => {
                obj.checked = (val) => this.base_expanded(val);
                obj.title = () => this.c1Label();
                return obj;
            })(new this.$.$mol_check_expand());
        }
        base_expanded(val, force) {
            return (val !== void 0) ? val : false;
        }
        c1Label() {
            return this.$.$mol_locale.text("$mol_check_expand_demo_c1Label");
        }
        Labeled_expanded() {
            return ((obj) => {
                obj.title = () => this.c2Label();
                obj.checked = (val) => this.expanded_expanded(val);
                return obj;
            })(new this.$.$mol_check_expand());
        }
        c2Label() {
            return this.$.$mol_locale.text("$mol_check_expand_demo_c2Label");
        }
        expanded_expanded(val, force) {
            return (val !== void 0) ? val : true;
        }
        Empty_base() {
            return ((obj) => {
                obj.checked = (val) => this.base_expanded(val);
                return obj;
            })(new this.$.$mol_check_expand());
        }
        Empty_expanded() {
            return ((obj) => {
                obj.checked = (val) => this.expanded_expanded(val);
                return obj;
            })(new this.$.$mol_check_expand());
        }
        Disabled() {
            return ((obj) => {
                obj.title = () => this.c5Label();
                obj.disabled = () => true;
                return obj;
            })(new this.$.$mol_check_expand());
        }
        c5Label() {
            return this.$.$mol_locale.text("$mol_check_expand_demo_c5Label");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "Labeled_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "base_expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "Labeled_expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "expanded_expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "Empty_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "Empty_expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand_demo.prototype, "Disabled", null);
    $.$mol_check_expand_demo = $mol_check_expand_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_check extends $.$mol_icon {
        path() {
            return "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
        }
    }
    $.$mol_icon_check = $mol_icon_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_check_all extends $.$mol_icon {
        path() {
            return "M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z";
        }
    }
    $.$mol_icon_check_all = $mol_icon_check_all;
})($ || ($ = {}));
//all.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_group extends $.$mol_check_box {
        checks() {
            return [];
        }
        full() {
            return true;
        }
    }
    $.$mol_check_group = $mol_check_group;
})($ || ($ = {}));
//group.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_group extends $.$mol_check_group {
            checked(next) {
                if (next !== undefined) {
                    for (const check of this.checks()) {
                        check.checked(next);
                    }
                }
                return this.checks().some(check => check.checked());
            }
            full() {
                return this.checks().every(check => check.checked());
            }
            Icon() {
                return this.full() ? new $.$mol_icon_check_all : new $.$mol_icon_tick;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_check_group.prototype, "checked", null);
        __decorate([
            $.$mol_mem
        ], $mol_check_group.prototype, "full", null);
        __decorate([
            $.$mol_mem
        ], $mol_check_group.prototype, "Icon", null);
        $$.$mol_check_group = $mol_check_group;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//group.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/check/group/demo/demo.view.css", "[mol_check_group_demo] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n}\n\n[mol_check_group_demo_partial] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[mol_check_group_demo_all] {\n\tbox-shadow: 0 1px 0 0px var(--mol_theme_line);\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_group_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_check_group_demo_title");
        }
        sub() {
            return [this.All(), this.Partial()];
        }
        All() {
            return ((obj) => {
                obj.title = () => "SPECIAL";
                obj.checks = () => [this.Strength(), this.Perception(), this.Endurance(), this.Charisma(), this.Intelligence(), this.Agility(), this.Luck()];
                return obj;
            })(new this.$.$mol_check_group());
        }
        Partial() {
            return ((obj) => {
                obj.rows = () => [this.Strength(), this.Perception(), this.Endurance(), this.Charisma(), this.Intelligence(), this.Agility(), this.Luck()];
                return obj;
            })(new this.$.$mol_list());
        }
        Strength() {
            return ((obj) => {
                obj.title = () => this.strength_title();
                obj.checked = (val) => this.strength(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        strength_title() {
            return "Strength";
        }
        strength(val, force) {
            return (val !== void 0) ? val : false;
        }
        Perception() {
            return ((obj) => {
                obj.title = () => this.perception_title();
                obj.checked = (val) => this.perception(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        perception_title() {
            return "Perception";
        }
        perception(val, force) {
            return (val !== void 0) ? val : true;
        }
        Endurance() {
            return ((obj) => {
                obj.title = () => this.endurance_title();
                obj.checked = (val) => this.endurance(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        endurance_title() {
            return "Endurance";
        }
        endurance(val, force) {
            return (val !== void 0) ? val : false;
        }
        Charisma() {
            return ((obj) => {
                obj.title = () => this.charisma_title();
                obj.checked = (val) => this.charisma(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        charisma_title() {
            return "Charisma";
        }
        charisma(val, force) {
            return (val !== void 0) ? val : false;
        }
        Intelligence() {
            return ((obj) => {
                obj.title = () => this.intelligence_title();
                obj.checked = (val) => this.intelligence(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        intelligence_title() {
            return "Intelligence";
        }
        intelligence(val, force) {
            return (val !== void 0) ? val : true;
        }
        Agility() {
            return ((obj) => {
                obj.title = () => this.agility_title();
                obj.checked = (val) => this.agility(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        agility_title() {
            return "Agility";
        }
        agility(val, force) {
            return (val !== void 0) ? val : true;
        }
        Luck() {
            return ((obj) => {
                obj.title = () => this.luck_title();
                obj.checked = (val) => this.luck(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        luck_title() {
            return "Luck";
        }
        luck(val, force) {
            return (val !== void 0) ? val : true;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "All", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Partial", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Strength", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "strength", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Perception", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "perception", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Endurance", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "endurance", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Charisma", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "charisma", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Intelligence", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "intelligence", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Agility", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "agility", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "Luck", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_group_demo.prototype, "luck", null);
    $.$mol_check_group_demo = $mol_check_group_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon][mol_check_checked] {\n\tcolor: var(--mol_skin_accent);\n}\n");
})($ || ($ = {}));
//icon.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_icon extends $.$mol_check {
    }
    $.$mol_check_icon = $mol_check_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_microphone extends $.$mol_icon {
        path() {
            return "M12,2C13.66,2 15,3.34 15,5V11C15,12.66 13.66,14 12,14C10.34,14 9,12.66 9,11V5C9,3.34 10.34,2 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7C7,13.76 9.24,16 12,16C14.76,16 17,13.76 17,11H19Z";
        }
    }
    $.$mol_icon_microphone = $mol_icon_microphone;
})($ || ($ = {}));
//microphone.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_check_icon_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_check_icon_demo_title");
        }
        sub() {
            return [this.Base(), this.Checked(), this.Disabled()];
        }
        Base() {
            return ((obj) => {
                obj.Icon = () => this.Base_icon();
                obj.checked = (val) => this.base_checked(val);
                return obj;
            })(new this.$.$mol_check_icon());
        }
        Base_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_microphone());
        }
        base_checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        Checked() {
            return ((obj) => {
                obj.Icon = () => this.Checked_icon();
                obj.checked = (val) => this.checked_checked(val);
                return obj;
            })(new this.$.$mol_check_icon());
        }
        Checked_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_microphone());
        }
        checked_checked(val, force) {
            return (val !== void 0) ? val : true;
        }
        Disabled() {
            return ((obj) => {
                obj.Icon = () => this.Disabled_icon();
                obj.checked = () => true;
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_check_box());
        }
        Disabled_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_microphone());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Base", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Base_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "base_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Checked_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "checked_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Disabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_icon_demo.prototype, "Disabled_icon", null);
    $.$mol_check_icon_demo = $mol_check_icon_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/pop/pop.view.css", "[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop]:hover {\n\tz-index: 4;\n}\n\n[mol_pop_bubble] {\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tborder-radius: var(--mol_skin_round);\n\tposition: absolute;\n\tz-index: 3;\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\toverflow: hidden;\n\toverflow-y: auto;\n\tword-break: normal;\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n\n[mol_pop_align=\"left_top\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"left_center\"] {\n\ttransform: translate(-100%, -50%);\n\tleft: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"left_bottom\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"right_top\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"right_center\"] {\n\ttransform: translate(100%, -50%);\n\tright: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"right_bottom\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"center\"] {\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n[mol_pop_align=\"top_left\"] {\n\tright: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_right\"] {\n\tleft: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"bottom_left\"] {\n\tright: 0;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_right\"] {\n\tleft: 0;\n\ttop: 100%;\n}\n");
})($ || ($ = {}));
//pop.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_pop extends $.$mol_view {
        event() {
            return ({
                "keydown": (event) => this.keydown(event),
            });
        }
        keydown(event, force) {
            return (event !== void 0) ? event : null;
        }
        showed(val, force) {
            return (val !== void 0) ? val : false;
        }
        plugins() {
            return [this.Meter()];
        }
        top() {
            return this.Meter().top();
        }
        bottom() {
            return this.Meter().bottom();
        }
        left() {
            return this.Meter().left();
        }
        right() {
            return this.Meter().right();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter());
        }
        sub() {
            return [this.Anchor(), this.Bubble()];
        }
        Anchor() {
            return null;
        }
        Bubble() {
            return ((obj) => {
                obj.align = () => this.align();
                obj.content = () => this.bubble_content();
                obj.height_max = () => this.height_max();
                return obj;
            })(new this.$.$mol_pop_bubble());
        }
        align() {
            return "bottom_center";
        }
        bubble_content() {
            return [];
        }
        height_max() {
            return 9999;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_pop.prototype, "keydown", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop.prototype, "showed", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop.prototype, "Bubble", null);
    $.$mol_pop = $mol_pop;
})($ || ($ = {}));
(function ($) {
    class $mol_pop_bubble extends $.$mol_scroll {
        sub() {
            return this.content();
        }
        content() {
            return [];
        }
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "maxHeight": this.height_max() }));
        }
        height_max() {
            return 9999;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_pop_align": this.align(), "tabindex": 0 }));
        }
        align() {
            return "";
        }
    }
    $.$mol_pop_bubble = $mol_pop_bubble;
})($ || ($ = {}));
//pop.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop extends $.$mol_pop {
            sub() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Bubble()] : [],
                ];
            }
            height_max() {
                return this.$.$mol_window.size().height * 0.33;
            }
            align() {
                const viewport = this.$.$mol_window.size();
                const vert = this.top() > (viewport.height - this.bottom()) ? 'top' : 'bottom';
                const hor = this.left() > (viewport.width - this.right()) ? 'left' : 'right';
                return `${vert}_${hor}`;
            }
            keydown(event) {
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $.$mol_keyboard_code.escape) {
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//pop.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_nav extends $.$mol_plugin {
        cycle(val, force) {
            return (val !== void 0) ? val : false;
        }
        mod_ctrl() {
            return false;
        }
        mod_shift() {
            return false;
        }
        mod_alt() {
            return false;
        }
        keys_x(val, force) {
            return (val !== void 0) ? val : [];
        }
        keys_y(val, force) {
            return (val !== void 0) ? val : [];
        }
        current_x(val, force) {
            return (val !== void 0) ? val : "";
        }
        current_y(val, force) {
            return (val !== void 0) ? val : "";
        }
        event_up(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_down(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_left(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_right(event, force) {
            return (event !== void 0) ? event : null;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "keydown": (event) => this.event_key(event) }));
        }
        event_key(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "cycle", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "keys_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "keys_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "current_x", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "current_y", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "event_up", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "event_down", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "event_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "event_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_nav.prototype, "event_key", null);
    $.$mol_nav = $mol_nav;
})($ || ($ = {}));
//nav.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $.$mol_keyboard_code.up: return this.event_up(event);
                    case $.$mol_keyboard_code.down: return this.event_down(event);
                    case $.$mol_keyboard_code.left: return this.event_left(event);
                    case $.$mol_keyboard_code.right: return this.event_right(event);
                    case $.$mol_keyboard_code.pageUp: return this.event_up(event);
                    case $.$mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                const keys = this.keys_y();
                if (keys.length < 2)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                const keys = this.keys_y();
                if (keys.length < 2)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                const keys = this.keys_x();
                if (keys.length < 2)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                const keys = this.keys_x();
                if (keys.length < 2)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//nav.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));
//text.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_anchor] {\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tjustify-content: space-between;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_bubble] {\n\tmin-width: 100%;\n}\n\n[mol_select_filter] {\n\tz-index: 2;\n\topacity: 1 !important;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: .5rem 1rem;\n\ttext-align: left;\n\tmin-height: 1.5em;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: left;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: .5em 1rem;\n\ttext-align: left;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n}\n\n[mol_select_trigger_icon] {\n\ttransform: rotateZ(90deg);\n\tmargin: .5rem .5rem .5rem -1rem;\n}\n:hover > [mol_select_trigger_icon] {\n\ttransform: rotateZ(90deg) scale(1.25);\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));
//select.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_select extends $.$mol_pop {
        dictionary() {
            return ({});
        }
        options() {
            return [];
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        minimal_height() {
            return 40;
        }
        Option_row(id) {
            return ((obj) => {
                obj.event_click = (event) => this.event_select(id, event);
                obj.sub = () => this.option_content(id);
                return obj;
            })(new this.$.$mol_button_minor());
        }
        event_select(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        option_content(id) {
            return [this.Option_label(id)];
        }
        Option_label(id) {
            return ((obj) => {
                obj.minimal_height = () => 40;
                obj.haystack = () => this.option_label(id);
                obj.needle = () => this.filter_pattern();
                return obj;
            })(new this.$.$mol_dimmer());
        }
        option_label(id) {
            return "";
        }
        filter_pattern(val, force) {
            return (val !== void 0) ? val : "";
        }
        No_options() {
            return ((obj) => {
                obj.sub = () => [this.no_options_message()];
                return obj;
            })(new this.$.$mol_view());
        }
        no_options_message() {
            return this.$.$mol_locale.text("$mol_select_no_options_message");
        }
        plugins() {
            return [...super.plugins(), this.Nav()];
        }
        Nav() {
            return ((obj) => {
                obj.keys_y = () => this.nav_components();
                obj.current_y = (component) => this.option_focused(component);
                obj.cycle = (val) => this.nav_cycle(val);
                return obj;
            })(new this.$.$mol_nav());
        }
        nav_components() {
            return [];
        }
        option_focused(component, force) {
            return (component !== void 0) ? component : null;
        }
        nav_cycle(val, force) {
            return (val !== void 0) ? val : true;
        }
        showed(val, force) {
            return this.options_showed(val);
        }
        options_showed(val, force) {
            return (val !== void 0) ? val : false;
        }
        Anchor() {
            return this.Trigger();
        }
        Trigger() {
            return ((obj) => {
                obj.click = (event) => this.open(event);
                obj.sub = () => this.trigger_content();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        open(event, force) {
            return (event !== void 0) ? event : null;
        }
        trigger_content() {
            return [];
        }
        bubble_content() {
            return [this.Menu()];
        }
        Menu() {
            return ((obj) => {
                obj.rows = () => this.menu_content();
                return obj;
            })(new this.$.$mol_list());
        }
        menu_content() {
            return [];
        }
        option_content_current() {
            return [];
        }
        Filter() {
            return ((obj) => {
                obj.value = (val) => this.filter_pattern(val);
                obj.hint = () => this.filter_hint();
                obj.debounce = () => this.debounce();
                return obj;
            })(new this.$.$mol_string());
        }
        filter_hint() {
            return this.hint();
        }
        hint() {
            return this.$.$mol_locale.text("$mol_select_hint");
        }
        debounce() {
            return 200;
        }
        Trigger_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_chevron());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "value", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_select.prototype, "Option_row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_select.prototype, "event_select", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_select.prototype, "Option_label", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "filter_pattern", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "No_options", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "Nav", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "option_focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "nav_cycle", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "showed", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "options_showed", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "Trigger", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "open", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "Filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_select.prototype, "Trigger_icon", null);
    $.$mol_select = $mol_select;
})($ || ($ = {}));
//select.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                if (!this.focused())
                    return '';
                return next || '';
            }
            open() {
                this.options_showed(true);
            }
            options_showed(next = false) {
                this.focused();
                return next;
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($.$mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return value == null ? id : value;
            }
            option_rows() {
                if (this.options_filtered().length === 0)
                    return [this.No_options()];
                let options = this.options_filtered().map((option) => this.Option_row(option));
                return options;
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return this.Filter();
                }
                if (this.options_showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.focused(false);
            }
            nav_components() {
                return [this.Filter(), ...this.option_rows()];
            }
            option_content_current() {
                return this.option_content(this.value());
            }
            trigger_content() {
                return (!this.value() && this.Filter())
                    ? [this.Filter()]
                    : [...this.option_content_current(), this.Trigger_icon()];
            }
            menu_content() {
                return (this.value() && this.Filter())
                    ? [this.Filter(), ...this.option_rows()]
                    : this.option_rows();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "options_showed", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//select.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_cross extends $.$mol_icon {
        path() {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        }
    }
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//cross.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_suggest] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_clear] {\n\tmargin: 0;\n\tflex: none;\n}\n\n[mol_search_clear_icon] {\n}\n");
})($ || ($ = {}));
//search.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_search extends $.$mol_bar {
        query(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return [this.Suggest(), this.Clear()];
        }
        Suggest() {
            return ((obj) => {
                obj.value = (val) => this.suggest_selected(val);
                obj.filter_pattern = (val) => this.suggest_selected(val);
                obj.hint = () => this.hint();
                obj.filter_pattern = (val) => this.query(val);
                obj.options_showed = () => this.suggests_showed();
                obj.options = () => this.suggests();
                obj.Trigger_icon = () => null;
                obj.debounce = () => this.debounce();
                return obj;
            })(new this.$.$mol_select());
        }
        suggest_selected(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return this.$.$mol_locale.text("$mol_search_hint");
        }
        suggests_showed() {
            return false;
        }
        suggests() {
            return [];
        }
        debounce() {
            return 200;
        }
        Clear() {
            return ((obj) => {
                obj.sub = () => [this.Clear_icon()];
                obj.event_click = (val) => this.event_clear(val);
                return obj;
            })(new this.$.$mol_button_minor());
        }
        Clear_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_cross());
        }
        event_clear(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "query", null);
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "Suggest", null);
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "suggest_selected", null);
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "Clear", null);
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "Clear_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_search.prototype, "event_clear", null);
    $.$mol_search = $mol_search;
})($ || ($ = {}));
//search.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search extends $.$mol_search {
            suggests_showed() {
                if (!this.focused())
                    return false;
                return this.suggests().length > 1;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.Suggest().Filter().focused(true);
                this.query(next);
            }
            sub() {
                return [
                    this.Suggest(),
                    ...(this.query().length > 0) ? [this.Clear()] : [],
                ];
            }
            event_clear(event) {
                this.query('');
            }
        }
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//search.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/code/code.view.css", "[mol_code] {\n\tdisplay: inline-flex;\n\tflex: 1 1 8rem;\n}\n\n[mol_code_manual] {\n\tflex: 1 1 auto;\n}\n");
})($ || ($ = {}));
//code.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_code extends $.$mol_view {
        sub() {
            return [this.Manual(), this.Scan()];
        }
        Manual() {
            return ((obj) => {
                obj.query = (val) => this.value(val);
                obj.hint = () => this.hint();
                obj.debounce = () => this.debounce();
                return obj;
            })(new this.$.$mol_search());
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return this.format();
        }
        format() {
            return "";
        }
        debounce() {
            return 200;
        }
        Scan() {
            return ((obj) => {
                obj.event_click = (val) => this.event_scan(val);
                obj.sub = () => [this.scan_label()];
                return obj;
            })(new this.$.$mol_button());
        }
        event_scan(val, force) {
            return (val !== void 0) ? val : null;
        }
        scan_label() {
            return this.$.$mol_locale.text("$mol_code_scan_label");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_code.prototype, "Manual", null);
    __decorate([
        $.$mol_mem
    ], $mol_code.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_code.prototype, "Scan", null);
    __decorate([
        $.$mol_mem
    ], $mol_code.prototype, "event_scan", null);
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_code extends $.$mol_code {
            scan_support() {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            }
            sub() {
                return [
                    this.Manual(),
                    ...this.scan_support() ? [this.Scan()] : [],
                ];
            }
            event_scan() {
                $.$mol_cordova.plugins.barcodeScanner.scan((result) => {
                    if (result.cancelled)
                        return;
                    this.value(result.text);
                }, (error) => {
                    alert("Scanning failed: " + error);
                });
            }
        }
        $$.$mol_code = $mol_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//code.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_code_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_code_demo_title");
        }
        sub() {
            return [this.Qr(), this.Matrix(), this.Upc_e(), this.Upc_a(), this.Ean_8(), this.Ean_13(), this.Code_128(), this.Code_39(), this.Itf()];
        }
        Qr() {
            return ((obj) => {
                obj.format = () => "QR_CODE";
                return obj;
            })(new this.$.$mol_code());
        }
        Matrix() {
            return ((obj) => {
                obj.format = () => "DATA_MATRIX";
                return obj;
            })(new this.$.$mol_code());
        }
        Upc_e() {
            return ((obj) => {
                obj.format = () => "UPC_E";
                return obj;
            })(new this.$.$mol_code());
        }
        Upc_a() {
            return ((obj) => {
                obj.format = () => "UPC_A";
                return obj;
            })(new this.$.$mol_code());
        }
        Ean_8() {
            return ((obj) => {
                obj.format = () => "EAN_8";
                return obj;
            })(new this.$.$mol_code());
        }
        Ean_13() {
            return ((obj) => {
                obj.format = () => "EAN_13";
                return obj;
            })(new this.$.$mol_code());
        }
        Code_128() {
            return ((obj) => {
                obj.format = () => "CODE_128";
                return obj;
            })(new this.$.$mol_code());
        }
        Code_39() {
            return ((obj) => {
                obj.format = () => "CODE_39";
                return obj;
            })(new this.$.$mol_code());
        }
        Itf() {
            return ((obj) => {
                obj.format = () => "ITF";
                return obj;
            })(new this.$.$mol_code());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Qr", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Matrix", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Upc_e", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Upc_a", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Ean_8", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Ean_13", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Code_128", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Code_39", null);
    __decorate([
        $.$mol_mem
    ], $mol_code_demo.prototype, "Itf", null);
    $.$mol_code_demo = $mol_code_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    let error;
    let result;
    let handler;
    function $mol_try(handler2) {
        handler = handler2;
        error = undefined;
        result = undefined;
        window.dispatchEvent(new Event('$mol_try'));
        const error2 = error;
        const result2 = result;
        error = undefined;
        result = undefined;
        return error2 || result2;
    }
    $.$mol_try = $mol_try;
    self.addEventListener('$mol_try', (event) => {
        result = handler();
    }, true);
    self.addEventListener('error', (event) => {
        error = event.error;
    }, true);
})($ || ($ = {}));
//try.web.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/date/date.view.css", "[mol_date_input] {\n\tbox-sizing: content-box;\n\twidth: 10ch;\n}\n\n[mol_date_bubble] {\n\tpadding: .5rem;\n}\n\n[mol_date_calendar_day] {\n\tpadding: 0;\n}\n\n[mol_date_calendar_day_button] {\n\twidth: 100%;\n\tpadding: .25rem .5rem;\n\tjustify-content: center;\n\tcursor: pointer;\n}\n");
})($ || ($ = {}));
//date.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_date extends $.$mol_pop {
        Anchor() {
            return this.Input();
        }
        Input() {
            return ((obj) => {
                obj.value = (val) => this.value(val);
                obj.hint = () => this.hint();
                obj.length_max = () => 10;
                return obj;
            })(new this.$.$mol_string());
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return "YYYY-MM-DD";
        }
        bubble_content() {
            return [this.Calendar()];
        }
        Calendar() {
            return ((obj) => {
                obj.month_string = () => this.value();
                obj.day_selected = (day) => this.day_selected(day);
                obj.day_click = (day, event) => this.day_click(day, event);
                return obj;
            })(new this.$.$mol_date_calendar());
        }
        day_selected(day) {
            return false;
        }
        day_click(day, event, force) {
            return (event !== void 0) ? event : null;
        }
        value_number(val, force) {
            return (val !== void 0) ? val : NaN;
        }
        value_moment(val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_date.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $mol_date.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_date.prototype, "Calendar", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_date.prototype, "day_click", null);
    __decorate([
        $.$mol_mem
    ], $mol_date.prototype, "value_number", null);
    __decorate([
        $.$mol_mem
    ], $mol_date.prototype, "value_moment", null);
    $.$mol_date = $mol_date;
})($ || ($ = {}));
(function ($) {
    class $mol_date_calendar extends $.$mol_calendar {
        day_content(day) {
            return [this.Day_button(day)];
        }
        Day_button(day) {
            return ((obj) => {
                obj.title = () => this.day_text(day);
                obj.event_click = (event) => this.day_click(day, event);
                return obj;
            })(new this.$.$mol_button());
        }
        day_click(day, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_date_calendar.prototype, "Day_button", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_date_calendar.prototype, "day_click", null);
    $.$mol_date_calendar = $mol_date_calendar;
})($ || ($ = {}));
//date.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_date extends $.$mol_date {
            value(val) {
                if (val === '')
                    val = null;
                const moment1 = $.$mol_try(() => val && new $.$mol_time_moment(val.replace(/-$/, '')));
                if (moment1 instanceof Error)
                    return val;
                const moment2 = this.value_moment(moment1);
                return moment2 && moment2.toString('YYYY-MM-DD');
            }
            value_moment(val) {
                const stamp = this.value_number(val && val.valueOf());
                return isNaN(stamp) ? null : new $.$mol_time_moment(stamp);
            }
            showed(next) {
                const moment = $.$mol_try(() => new $.$mol_time_moment(this.value()));
                if (moment instanceof Error)
                    return false;
                if (moment.year === undefined)
                    return false;
                if (moment.month === undefined)
                    return false;
                if (!this.focused(next))
                    return false;
                return true;
            }
            day_selected(day) {
                return this.value() === day;
            }
            day_click(day) {
                this.value(day);
                this.showed(false);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_date.prototype, "value", null);
        __decorate([
            $.$mol_mem
        ], $mol_date.prototype, "value_moment", null);
        $$.$mol_date = $mol_date;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//date.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/date/demo/demo.view.css", "[mol_date_demo_formatted] {\n\tpadding: .5rem 1rem;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_date_demo extends $.$mol_demo_small {
        sub() {
            return [this.View()];
        }
        View() {
            return ((obj) => {
                obj.sub = () => [this.Date(), this.Formatted()];
                return obj;
            })(new this.$.$mol_view());
        }
        Date() {
            return ((obj) => {
                obj.value_moment = (val) => this.date(val);
                return obj;
            })(new this.$.$mol_date());
        }
        date(val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
        Formatted() {
            return ((obj) => {
                obj.sub = () => [this.formatted()];
                return obj;
            })(new this.$.$mol_view());
        }
        formatted() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_date_demo.prototype, "View", null);
    __decorate([
        $.$mol_mem
    ], $mol_date_demo.prototype, "Date", null);
    __decorate([
        $.$mol_mem
    ], $mol_date_demo.prototype, "date", null);
    __decorate([
        $.$mol_mem
    ], $mol_date_demo.prototype, "Formatted", null);
    $.$mol_date_demo = $mol_date_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_date_demo extends $.$mol_date_demo {
            formatted() {
                return this.date() && this.date().toString('DD Month YYYY');
            }
        }
        $$.$mol_date_demo = $mol_date_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/switch/switch.view.css", "[mol_switch] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_skin_round);\n\tbox-shadow: inset 0 0 0 .5px var(--mol_theme_line);\n\tpadding: .5rem;\n}\n\n[mol_switch_option] {\n\tflex: 0 1 auto;\n\tpadding: .25rem .5rem;\n}\n\n[mol_switch_option][mol_check_checked] {\n\tbackground: var(--mol_theme_current);\n\tcolor: var(--mol_theme_text);\n\tcolor: inherit;\n\tz-index: 1;\n}\n");
})($ || ($ = {}));
//switch.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_switch extends $.$mol_view {
        minimal_height() {
            return 40;
        }
        Option(id) {
            return ((obj) => {
                obj.checked = (val) => this.option_checked(id, val);
                obj.title = () => this.option_title(id);
                obj.enabled = () => this.option_enabled(id);
                return obj;
            })(new this.$.$mol_check());
        }
        option_checked(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        option_title(id) {
            return "";
        }
        option_enabled(id) {
            return this.enabled();
        }
        enabled() {
            return true;
        }
        value(val, force) {
            return (val !== void 0) ? val : null;
        }
        options() {
            return ({});
        }
        sub() {
            return this.items();
        }
        items() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_switch extends $.$mol_switch {
            value(next) {
                return $.$mol_state_session.value(`${this}.value()`, next);
            }
            options() {
                return {};
            }
            items() {
                return Object.keys(this.options()).map(key => this.Option(key));
            }
            option_title(key) {
                return this.options()[key];
            }
            option_checked(key, next) {
                if (next === void 0)
                    return this.value() == key;
                this.value(next ? key : null);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_switch.prototype, "items", null);
        $$.$mol_switch = $mol_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//switch.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_deck extends $.$mol_list {
        items() {
            return [({
                    "title": "",
                    "Content": this.Content(),
                })];
        }
        Content() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view());
        }
        rows() {
            return [this.Switch(), this.Content()];
        }
        Switch() {
            return ((obj) => {
                obj.value = (val) => this.current(val);
                obj.options = () => this.switch_options();
                return obj;
            })(new this.$.$mol_switch());
        }
        current(val, force) {
            return (val !== void 0) ? val : "0";
        }
        switch_options() {
            return ({});
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "Switch", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "current", null);
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
//deck.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_deck extends $.$mol_deck {
            current(next) {
                return $.$mol_state_session.value(`${this}.current()`, next) || '0';
            }
            switch_options() {
                let options = {};
                this.items().forEach((item, index) => {
                    options[String(index)] = item.title;
                });
                return options;
            }
            Content() {
                return this.items()[this.current()].Content;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_deck.prototype, "Content", null);
        $$.$mol_deck = $mol_deck;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//deck.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_deck_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_deck_demo_title");
        }
        sub() {
            return [this.Deck()];
        }
        Deck() {
            return ((obj) => {
                obj.items = () => [this.greeterItem(), this.questerItem(), this.commanderItem()];
                return obj;
            })(new this.$.$mol_deck());
        }
        greeterItem() {
            return ({
                "title": this.greeterLabel(),
                "Content": this.greeterContent(),
            });
        }
        greeterLabel() {
            return this.$.$mol_locale.text("$mol_deck_demo_greeterLabel");
        }
        greeterContent() {
            return ((obj) => {
                obj.sub = () => [this.greeterMessager()];
                return obj;
            })(new this.$.$mol_row());
        }
        greeterMessager() {
            return ((obj) => {
                obj.sub = () => [this.greeterMessage()];
                return obj;
            })(new this.$.$mol_view());
        }
        greeterMessage() {
            return this.$.$mol_locale.text("$mol_deck_demo_greeterMessage");
        }
        questerItem() {
            return ({
                "title": this.questerLabel(),
                "Content": this.questerContent(),
            });
        }
        questerLabel() {
            return this.$.$mol_locale.text("$mol_deck_demo_questerLabel");
        }
        questerContent() {
            return ((obj) => {
                obj.sub = () => [this.questerMessager()];
                return obj;
            })(new this.$.$mol_row());
        }
        questerMessager() {
            return ((obj) => {
                obj.sub = () => [this.questerMessage()];
                return obj;
            })(new this.$.$mol_view());
        }
        questerMessage() {
            return this.$.$mol_locale.text("$mol_deck_demo_questerMessage");
        }
        commanderItem() {
            return ({
                "title": this.commanderLabel(),
                "Content": this.commanderContent(),
            });
        }
        commanderLabel() {
            return this.$.$mol_locale.text("$mol_deck_demo_commanderLabel");
        }
        commanderContent() {
            return ((obj) => {
                obj.sub = () => [this.commanderMessager()];
                return obj;
            })(new this.$.$mol_row());
        }
        commanderMessager() {
            return ((obj) => {
                obj.sub = () => [this.commanderMessage()];
                return obj;
            })(new this.$.$mol_view());
        }
        commanderMessage() {
            return this.$.$mol_locale.text("$mol_deck_demo_commanderMessage");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "Deck", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "greeterContent", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "greeterMessager", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "questerContent", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "questerMessager", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "commanderContent", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck_demo.prototype, "commanderMessager", null);
    $.$mol_deck_demo = $mol_deck_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_dimmer_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_dimmer_demo_title");
        }
        sub() {
            return [this.one(), this.two(), this.three(), this.four(), this.five(), this.six()];
        }
        one() {
            return ((obj) => {
                obj.haystack = () => "Don't put all your eggs in one basket";
                obj.needle = () => "eggs";
                return obj;
            })(new this.$.$mol_dimmer());
        }
        two() {
            return ((obj) => {
                obj.haystack = () => "Don't look a gift horse in the mouth.";
                obj.needle = () => "oo";
                return obj;
            })(new this.$.$mol_dimmer());
        }
        three() {
            return ((obj) => {
                obj.haystack = () => "There is no word you are looking for";
                obj.needle = () => "luck";
                return obj;
            })(new this.$.$mol_dimmer());
        }
        four() {
            return ((obj) => {
                obj.haystack = () => "ooAAooAAoo";
                obj.needle = () => "oo";
                return obj;
            })(new this.$.$mol_dimmer());
        }
        five() {
            return ((obj) => {
                obj.haystack = () => "Let's search this string";
                obj.needle = () => "Let's search this string";
                return obj;
            })(new this.$.$mol_dimmer());
        }
        six() {
            return ((obj) => {
                obj.haystack = () => "Let's search nothing";
                obj.needle = () => "";
                return obj;
            })(new this.$.$mol_dimmer());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "one", null);
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "two", null);
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "three", null);
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "four", null);
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "five", null);
    __decorate([
        $.$mol_mem
    ], $mol_dimmer_demo.prototype, "six", null);
    $.$mol_dimmer_demo = $mol_dimmer_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n\tflex: 1 1 auto;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n}\n");
})($ || ($ = {}));
//expander.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_expander extends $.$mol_list {
        rows() {
            return [this.Label(), this.Content()];
        }
        Label() {
            return ((obj) => {
                obj.sub = () => [this.Trigger(), this.Tools()];
                return obj;
            })(new this.$.$mol_view());
        }
        Trigger() {
            return ((obj) => {
                obj.checked = (val) => this.expanded(val);
                obj.label = () => this.label();
                return obj;
            })(new this.$.$mol_check_expand());
        }
        expanded(val, force) {
            return (val !== void 0) ? val : false;
        }
        label() {
            return [this.title()];
        }
        Tools() {
            return null;
        }
        Content() {
            return ((obj) => {
                obj.sub = () => this.content();
                return obj;
            })(new this.$.$mol_view());
        }
        content() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_expander.prototype, "Label", null);
    __decorate([
        $.$mol_mem
    ], $mol_expander.prototype, "Trigger", null);
    __decorate([
        $.$mol_mem
    ], $mol_expander.prototype, "expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_expander.prototype, "Content", null);
    $.$mol_expander = $mol_expander;
})($ || ($ = {}));
//expander.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
        }
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//expander.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/filler/filler.view.css", "[mol_filler] {\n\ttext-align: left;\n}\n");
})($ || ($ = {}));
//filler.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_filler extends $.$mol_view {
        minimal_height() {
            return 500;
        }
        sub() {
            return ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel."];
        }
    }
    $.$mol_filler = $mol_filler;
})($ || ($ = {}));
//filler.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_expander_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_expander_demo_title");
        }
        sub() {
            return [this.Expander()];
        }
        Expander() {
            return ((obj) => {
                obj.title = () => "Lorem Ipsum";
                obj.Content = () => this.Content();
                return obj;
            })(new this.$.$mol_expander());
        }
        Content() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_expander_demo.prototype, "Expander", null);
    __decorate([
        $.$mol_mem
    ], $mol_expander_demo.prototype, "Content", null);
    $.$mol_expander_demo = $mol_expander_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_float_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_float_demo_title");
        }
        sub() {
            return [this.Scroll()];
        }
        Scroll() {
            return ((obj) => {
                obj.sub = () => [this.Head(), this.Content()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        Head() {
            return ((obj) => {
                obj.sub = () => [this.Head_card()];
                return obj;
            })(new this.$.$mol_float());
        }
        Head_card() {
            return ((obj) => {
                obj.sub = () => [this.Head_row()];
                return obj;
            })(new this.$.$mol_card());
        }
        Head_row() {
            return ((obj) => {
                obj.sub = () => [this.Head_content()];
                return obj;
            })(new this.$.$mol_row());
        }
        Head_content() {
            return ((obj) => {
                obj.sub = () => ["Float header"];
                return obj;
            })(new this.$.$mol_view());
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [this.Filler1(), this.Filler2()];
                return obj;
            })(new this.$.$mol_row());
        }
        Filler1() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
        Filler2() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Head", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Head_card", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Head_row", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Head_content", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Filler1", null);
    __decorate([
        $.$mol_mem
    ], $mol_float_demo.prototype, "Filler2", null);
    $.$mol_float_demo = $mol_float_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/labeler/labeler.view.css", "[mol_labeler] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n\tcursor: inherit;\n}\n\n[mol_labeler_title] {\n\tcolor: var(--mol_theme_shade);\n\tfont-size: .875rem;\n}\n\n[mol_labeler_content] {\n\tdisplay: flex;\n}\n");
})($ || ($ = {}));
//labeler.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_labeler extends $.$mol_view {
        sub() {
            return [this.Title(), this.Content()];
        }
        Title() {
            return ((obj) => {
                obj.sub = () => this.label();
                return obj;
            })(new this.$.$mol_view());
        }
        label() {
            return [this.title()];
        }
        Content() {
            return ((obj) => {
                obj.sub = () => this.content();
                return obj;
            })(new this.$.$mol_view());
        }
        content() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_labeler.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/form/field/field.view.css", "[mol_form_field] {\n\talign-items: stretch;\n}\n\n[mol_form_field_bid] {\n\tcolor: var(--mol_skin_accent);\n\tmargin-left: .5rem;\n\tdisplay: inline-block;\n}\n");
})($ || ($ = {}));
//field.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_form_field extends $.$mol_labeler {
        label() {
            return [this.name(), this.Bid()];
        }
        name() {
            return "";
        }
        Bid() {
            return ((obj) => {
                obj.sub = () => [this.bid()];
                return obj;
            })(new this.$.$mol_view());
        }
        bid() {
            return "";
        }
        Content() {
            return this.control();
        }
        control() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_form_field.prototype, "Bid", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/form/form.css", "[mol_form_bar_fields] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[mol_form_bar_fields] > * {\n\tmargin: .5rem;\n}\n\n[mol_form_bar_buttons] {\n\tbox-shadow: none;\n\tpadding: 0;\n}\n\n[mol_form_bar_buttons] > * {\n\tflex: 1 1 auto;\n}\n");
})($ || ($ = {}));
//form.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_form extends $.$mol_view {
        submit_blocked() {
            return false;
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "keydown": (event) => this.keydown(event) }));
        }
        keydown(event, force) {
            return (event !== void 0) ? event : null;
        }
        submit(event, force) {
            return (event !== void 0) ? event : null;
        }
        sub() {
            return [this.Bar_fields(), this.Bar_buttons()];
        }
        Bar_fields() {
            return ((obj) => {
                obj.sub = () => this.form_fields();
                return obj;
            })(new this.$.$mol_view());
        }
        form_fields() {
            return [];
        }
        Bar_buttons() {
            return ((obj) => {
                obj.sub = () => this.buttons();
                return obj;
            })(new this.$.$mol_row());
        }
        buttons() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_form.prototype, "keydown", null);
    __decorate([
        $.$mol_mem
    ], $mol_form.prototype, "submit", null);
    __decorate([
        $.$mol_mem
    ], $mol_form.prototype, "Bar_fields", null);
    __decorate([
        $.$mol_mem
    ], $mol_form.prototype, "Bar_buttons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form extends $.$mol_form {
            submit_blocked() {
                return this.form_fields().some(field => field.bid());
            }
            keydown(next) {
                if (next.ctrlKey && next.keyCode === $.$mol_keyboard_code.enter && !this.submit_blocked())
                    this.submit(event);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_form.prototype, "submit_blocked", null);
        $$.$mol_form = $mol_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//form.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/form/demo/bids/bids.view.css", "[mol_form_demo_bids] {\n\tflex-direction: column;\n}\n\n[mol_form_demo_bids_message] {\n\tpadding: .5rem;\n}\n");
})($ || ($ = {}));
//bids.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_form_demo_bids extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_title");
        }
        message_required() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_message_required");
        }
        message_no_spaces() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_message_no_spaces");
        }
        message_need_more_letters() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_message_need_more_letters");
        }
        sub() {
            return [this.Form(), this.Message()];
        }
        Form() {
            return ((obj) => {
                obj.submit = (val) => this.submit(val);
                obj.form_fields = () => [this.Name_first_field(), this.Name_nick_field(), this.Name_second_field(), this.Sex_field()];
                obj.buttons = () => [this.Submit()];
                return obj;
            })(new this.$.$mol_form());
        }
        submit(val, force) {
            return (val !== void 0) ? val : null;
        }
        Name_first_field() {
            return ((obj) => {
                obj.name = () => this.name_first_label();
                obj.bid = () => this.name_first_bid();
                obj.control = () => this.Name_first_control();
                return obj;
            })(new this.$.$mol_form_field());
        }
        name_first_label() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_first_label");
        }
        name_first_bid() {
            return "";
        }
        Name_first_control() {
            return ((obj) => {
                obj.hint = () => this.name_first_hint();
                obj.value = (val) => this.name_first(val);
                return obj;
            })(new this.$.$mol_string());
        }
        name_first_hint() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_first_hint");
        }
        name_first(val, force) {
            return (val !== void 0) ? val : "";
        }
        Name_nick_field() {
            return ((obj) => {
                obj.name = () => this.name_nick_label();
                obj.bid = () => this.name_nick_bid();
                obj.control = () => this.Name_nick_control();
                return obj;
            })(new this.$.$mol_form_field());
        }
        name_nick_label() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_nick_label");
        }
        name_nick_bid() {
            return "";
        }
        Name_nick_control() {
            return ((obj) => {
                obj.hint = () => this.name_nick_hint();
                obj.value = (val) => this.name_nick(val);
                return obj;
            })(new this.$.$mol_string());
        }
        name_nick_hint() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_nick_hint");
        }
        name_nick(val, force) {
            return (val !== void 0) ? val : "";
        }
        Name_second_field() {
            return ((obj) => {
                obj.name = () => this.name_second_label();
                obj.bid = () => this.name_second_bid();
                obj.control = () => this.Name_second_control();
                return obj;
            })(new this.$.$mol_form_field());
        }
        name_second_label() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_second_label");
        }
        name_second_bid() {
            return "";
        }
        Name_second_control() {
            return ((obj) => {
                obj.hint = () => this.name_second_hint();
                obj.value = (val) => this.name_second(val);
                return obj;
            })(new this.$.$mol_string());
        }
        name_second_hint() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_name_second_hint");
        }
        name_second(val, force) {
            return (val !== void 0) ? val : "";
        }
        Sex_field() {
            return ((obj) => {
                obj.name = () => this.sex_label();
                obj.bid = () => this.sex_bid();
                obj.control = () => this.Sex_control();
                return obj;
            })(new this.$.$mol_form_field());
        }
        sex_label() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_sex_label");
        }
        sex_bid() {
            return "";
        }
        Sex_control() {
            return ((obj) => {
                obj.value = (val) => this.sex(val);
                obj.options = () => this.sex_options();
                return obj;
            })(new this.$.$mol_switch());
        }
        sex(val, force) {
            return (val !== void 0) ? val : "";
        }
        sex_options() {
            return ({
                "male": this.sex_option_male(),
                "intersex": this.sex_option_intersex(),
                "female": this.sex_option_female(),
            });
        }
        sex_option_male() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_sex_option_male");
        }
        sex_option_intersex() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_sex_option_intersex");
        }
        sex_option_female() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_sex_option_female");
        }
        Submit() {
            return ((obj) => {
                obj.sub = () => [this.submit_text()];
                obj.click = (val) => this.submit(val);
                obj.disabled = () => this.submit_blocked();
                return obj;
            })(new this.$.$mol_button_major());
        }
        submit_text() {
            return this.$.$mol_locale.text("$mol_form_demo_bids_submit_text");
        }
        submit_blocked() {
            return true;
        }
        Message() {
            return ((obj) => {
                obj.sub = () => [this.message()];
                return obj;
            })(new this.$.$mol_view());
        }
        message(val, force) {
            return (val !== void 0) ? val : "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Form", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "submit", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_first_field", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_first_control", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "name_first", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_nick_field", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_nick_control", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "name_nick", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_second_field", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Name_second_control", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "name_second", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Sex_field", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Sex_control", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "sex", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Submit", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "Message", null);
    __decorate([
        $.$mol_mem
    ], $mol_form_demo_bids.prototype, "message", null);
    $.$mol_form_demo_bids = $mol_form_demo_bids;
})($ || ($ = {}));
//bids.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form_demo_bids extends $.$mol_form_demo_bids {
            name_first(next) {
                return $.$mol_state_local.value(this.state_key('name_first'), next) || '';
            }
            name_first_bid() {
                const value = this.name_first();
                if (!value)
                    return this.message_required();
                if (value.indexOf(' ') !== -1)
                    return this.message_no_spaces();
            }
            name_nick(next) {
                return $.$mol_state_local.value(this.state_key('name_nick'), next) || '';
            }
            name_second(next) {
                return $.$mol_state_local.value(this.state_key('name_second'), next) || '';
            }
            name_second_bid() {
                const value = this.name_second();
                if (!value)
                    return this.message_required();
                if (value.indexOf(' ') !== -1)
                    return this.message_no_spaces();
                if (value.length < 3)
                    return this.message_need_more_letters().replace('{count}', '3');
            }
            sex(next) {
                return $.$mol_state_local.value(this.state_key('sex'), next) || '';
            }
            sex_bid() {
                if (!this.sex())
                    return this.message_required();
                return '';
            }
            submit(next) {
                this.message(`Hello, ${this.sex()} ${this.name_first()} (${this.name_nick()}) ${this.name_second()}!`);
            }
            submit_blocked() {
                return this.Form().submit_blocked();
            }
        }
        $$.$mol_form_demo_bids = $mol_form_demo_bids;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bids.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_range2(item = index => index, size = () => Number.POSITIVE_INFINITY) {
        return new Proxy(new $mol_range2_array(), {
            get(target, field) {
                if (typeof field === 'string') {
                    if (field === 'length')
                        return size();
                    const index = Number(field);
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return target[field];
            },
            set(target, field) {
                return $.$mol_fail(new TypeError('Lazy range is read only'));
            },
            ownKeys(target) {
                return [...Array(size())].map((v, i) => String(i)).concat('length');
            },
            getOwnPropertyDescriptor(target, field) {
                if (field === "length")
                    return {
                        value: size(),
                        writable: true,
                        enumerable: false,
                        configurable: false,
                    };
                const index = Number(field);
                if (index === Math.trunc(index))
                    return {
                        get: () => this.get(target, field, this),
                        enumerable: true,
                        configurable: true,
                    };
                return Object.getOwnPropertyDescriptor(target, field);
            }
        });
    }
    $.$mol_range2 = $mol_range2;
    class $mol_range2_array extends Array {
        concat(...tail) {
            if (tail.length === 0)
                return this;
            if (tail.length > 1) {
                let list = this;
                for (let item of tail)
                    list = list.concat(item);
                return list;
            }
            return $mol_range2(index => index < this.length ? this[index] : tail[0][index - this.length], () => this.length + tail[0].length);
        }
        filter(check, context) {
            const filtered = new $mol_range2_array();
            for (let index = 0; index < this.length; ++index) {
                const item = this[index];
                if (check.call(context, item, index, this))
                    filtered.push(item);
            }
            return filtered;
        }
        forEach(proceed, context) {
            for (let [key, value] of this.entries())
                proceed.call(context, value, key, this);
        }
        map(proceed, context) {
            return $mol_range2(index => proceed.call(context, this[index], index, this), () => this.length);
        }
        reduce(merge, result) {
            let index = 0;
            if (arguments.length === 1) {
                result = this[index++];
            }
            for (; index < this.length; ++index) {
                result = merge(result, this[index], index, this);
            }
            return result;
        }
        slice(from = 0, to = this.length) {
            return $mol_range2(index => this[from + index], () => Math.min(to, this.length) - from);
        }
        some(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (check.call(context, this[index], index, this))
                    return true;
            }
            return false;
        }
        every(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (!check.call(context, this[index], index, this))
                    return false;
            }
            return true;
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));
//range2.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_grid_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_grid_demo_title");
        }
        rows() {
            return 1000;
        }
        cols() {
            return 20;
        }
        sub() {
            return [this.Grid()];
        }
        Grid() {
            return ((obj) => {
                obj.row_height = () => 40;
                obj.records = () => this.records();
                obj.col_head_content = (col) => this.col_head_content(col);
                return obj;
            })(new this.$.$mol_grid());
        }
        records() {
            return ({});
        }
        col_head_content(col) {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_grid_demo.prototype, "Grid", null);
    $.$mol_grid_demo = $mol_grid_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid_demo extends $.$mol_grid_demo {
            records() {
                return $.$mol_range2(index => $.$mol_range2(colId => colId === 0 ? `Row ${index + 1}` : `Row ${index + 1} Cell ${colId}`, () => this.cols()), () => this.rows());
            }
            col_head_content(id) {
                if (id == '0')
                    return [];
                return [`Col ${id}`];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_grid_demo.prototype, "records", null);
        $$.$mol_grid_demo = $mol_grid_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_labeler_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_labeler_demo_title");
        }
        sub() {
            return [this.Provider(), this.Name()];
        }
        Provider() {
            return ((obj) => {
                obj.title = () => "Provider";
                obj.content = () => ["ACME Provider Inc."];
                return obj;
            })(new this.$.$mol_labeler());
        }
        Name() {
            return ((obj) => {
                obj.title = () => "User name";
                obj.Content = () => this.Name_control();
                return obj;
            })(new this.$.$mol_labeler());
        }
        Name_control() {
            return ((obj) => {
                obj.hint = () => "Jack Sparrow";
                obj.value = (val) => this.user_name(val);
                return obj;
            })(new this.$.$mol_string());
        }
        user_name(val, force) {
            return (val !== void 0) ? val : "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_labeler_demo.prototype, "Provider", null);
    __decorate([
        $.$mol_mem
    ], $mol_labeler_demo.prototype, "Name", null);
    __decorate([
        $.$mol_mem
    ], $mol_labeler_demo.prototype, "Name_control", null);
    __decorate([
        $.$mol_mem
    ], $mol_labeler_demo.prototype, "user_name", null);
    $.$mol_labeler_demo = $mol_labeler_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_link_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_link_demo_title");
        }
        sub() {
            return [this.This(), this.Red(), this.Green(), this.Blue(), this.External()];
        }
        This() {
            return ((obj) => {
                obj.sub = () => [this.this_label()];
                return obj;
            })(new this.$.$mol_link());
        }
        this_label() {
            return this.$.$mol_locale.text("$mol_link_demo_this_label");
        }
        Red() {
            return ((obj) => {
                obj.arg = () => ({
                    "color": "red",
                });
                obj.sub = () => [this.red_label()];
                return obj;
            })(new this.$.$mol_link());
        }
        red_label() {
            return this.$.$mol_locale.text("$mol_link_demo_red_label");
        }
        Green() {
            return ((obj) => {
                obj.arg = () => ({
                    "color": "green",
                });
                obj.sub = () => [this.green_label()];
                return obj;
            })(new this.$.$mol_link());
        }
        green_label() {
            return this.$.$mol_locale.text("$mol_link_demo_green_label");
        }
        Blue() {
            return ((obj) => {
                obj.arg = () => ({
                    "color": "blue",
                });
                obj.sub = () => [this.blue_label()];
                return obj;
            })(new this.$.$mol_link());
        }
        blue_label() {
            return this.$.$mol_locale.text("$mol_link_demo_blue_label");
        }
        External() {
            return ((obj) => {
                obj.uri = () => "http://example.org";
                obj.title = () => "example.org";
                obj.hint = () => this.external_hint();
                return obj;
            })(new this.$.$mol_link());
        }
        external_hint() {
            return this.$.$mol_locale.text("$mol_link_demo_external_hint");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_link_demo.prototype, "This", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_demo.prototype, "Red", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_demo.prototype, "Green", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_demo.prototype, "Blue", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_demo.prototype, "External", null);
    $.$mol_link_demo = $mol_link_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tborder-radius: var(--mol_skin_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//image.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_image extends $.$mol_view {
        dom_name() {
            return "img";
        }
        field() {
            return (Object.assign(Object.assign({}, super.field()), { "src": this.uri(), "alt": this.title() }));
        }
        uri() {
            return "";
        }
    }
    $.$mol_image = $mol_image;
})($ || ($ = {}));
//image.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: center;\n\tcolor: var(--mol_theme_control);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\tmargin-right: 2px;\n\theight: 1em;\n\tvertical-align: -10%;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: invert(1);\n}\n");
})($ || ($ = {}));
//iconed.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_link_iconed extends $.$mol_link {
        sub() {
            return [this.Icon()];
        }
        Icon() {
            return ((obj) => {
                obj.uri = () => this.icon();
                return obj;
            })(new this.$.$mol_image());
        }
        icon() {
            return "";
        }
        content() {
            return [this.title()];
        }
        title() {
            return this.uri();
        }
        host() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_link_iconed.prototype, "Icon", null);
    $.$mol_link_iconed = $mol_link_iconed;
})($ || ($ = {}));
//iconed.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
            }
            host() {
                const url = new URL(this.uri());
                return url.hostname;
            }
            title() {
                return decodeURIComponent(this.uri().split(this.host(), 2)[1]);
            }
            sub() {
                return [this.Icon(), ...this.content()];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $.$mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//iconed.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/link/iconed/demo/demo.view.css", "[mol_link_iconed_demo_input] {\n\tdisplay: block;\n\tmargin: .5rem;\n}\n\n[mol_link_iconed_demo_output] {\n\tdisplay: block;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_link_iconed_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_link_iconed_demo_title");
        }
        sub() {
            return [this.Input(), this.Output()];
        }
        Input() {
            return ((obj) => {
                obj.value = (val) => this.uri(val);
                return obj;
            })(new this.$.$mol_string());
        }
        uri(val, force) {
            return (val !== void 0) ? val : "https://www.google.com/search?q=%24mol";
        }
        Output() {
            return ((obj) => {
                obj.uri = () => this.uri();
                return obj;
            })(new this.$.$mol_link_iconed());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_link_iconed_demo.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_iconed_demo.prototype, "uri", null);
    __decorate([
        $.$mol_mem
    ], $mol_link_iconed_demo.prototype, "Output", null);
    $.$mol_link_iconed_demo = $mol_link_iconed_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_list_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_list_demo_title");
        }
        sub() {
            return [this.Scroll()];
        }
        Scroll() {
            return ((obj) => {
                obj.sub = () => [this.List()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        List() {
            return ((obj) => {
                obj.rows = () => this.rows();
                return obj;
            })(new this.$.$mol_list());
        }
        rows() {
            return [];
        }
        Row(id) {
            return ((obj) => {
                obj.title = () => this.row_text(id);
                obj.content = () => [this.Content(id)];
                return obj;
            })(new this.$.$mol_expander());
        }
        row_text(id) {
            return "";
        }
        Content(id) {
            return ((obj) => {
                obj.sub = () => [this.Text()];
                return obj;
            })(new this.$.$mol_row());
        }
        Text() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_list_demo.prototype, "Scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_list_demo.prototype, "List", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_list_demo.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_list_demo.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_list_demo.prototype, "Text", null);
    $.$mol_list_demo = $mol_list_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list_demo extends $.$mol_list_demo {
            rows() {
                var next = [];
                for (var id = 0; id < 1000; ++id) {
                    next.push(this.Row(id));
                }
                return next;
            }
            row_text(id) {
                return `Row #${id + 1}`;
            }
        }
        $$.$mol_list_demo = $mol_list_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_import extends $.$mol_object2 {
        static script(uri, next, force) {
            const doc = $.$mol_dom_context.document;
            const found = doc.querySelector(`script[src="${uri}"]`);
            if (found)
                return $.$mol_dom_context;
            return $.$mol_fail_hidden(new Promise((done, fail) => {
                const script = doc.createElement('script');
                script.src = uri;
                script.onload = () => done($.$mol_dom_context);
                script.onerror = () => fail(new Error(`Can not import ${uri}`));
                doc.head.appendChild(script);
            }));
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_import, "script", null);
    $.$mol_import = $mol_import;
})($ || ($ = {}));
//import.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/map/yandex/yandex.view.css", "[mol_map_yandex] {\n\tflex: auto;\n\talign-self: stretch;\n\tbox-shadow: var(--mol_skin_light_outline);\n\tmix-blend-mode: exclusion;\n\tfilter: invert(1);\n}\n");
})($ || ($ = {}));
//yandex.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_map_yandex extends $.$mol_view {
        zoom(val, force) {
            return (val !== void 0) ? val : 2;
        }
        center(val, force) {
            return (val !== void 0) ? val : [0, 0];
        }
        objects() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex.prototype, "zoom", null);
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex.prototype, "center", null);
    $.$mol_map_yandex = $mol_map_yandex;
})($ || ($ = {}));
//yandex.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_map_yandex extends $.$mol_map_yandex {
            static api() {
                return $.$mol_import.script(`https://api-maps.yandex.ru/2.1/?lang=${$.$mol_locale.lang()}`).ymaps;
            }
            api(next, force) {
                const ymaps = $mol_map_yandex.api();
                const load_map = $.$mol_fiber_sync(() => new Promise(done => ymaps.ready(done)));
                load_map();
                const api = new ymaps.Map(this.dom_node(), {
                    center: [0, 0],
                    zoom: 0,
                });
                api.controls.remove('fullscreenControl');
                api.controls.remove('typeSelector');
                api.events.add(['actionend'], (event) => {
                    new $.$mol_after_frame($.$mol_fiber_root(() => {
                        this.update(event);
                    }));
                });
                return api;
            }
            update(event) {
                this.zoom(this.api().getZoom());
                this.center(this.api().getCenter());
            }
            render() {
                const api = this.api();
                api.setCenter(this.center(), this.zoom());
                api.geoObjects.removeAll();
                for (let obj of this.objects()) {
                    api.geoObjects.add(obj.object());
                }
                this.dom_node_actual();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_map_yandex.prototype, "api", null);
        $$.$mol_map_yandex = $mol_map_yandex;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//yandex.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_map_yandex_mark extends $.$mol_object {
        pos() {
            return [0, 0];
        }
        hint() {
            return "";
        }
        title() {
            return "";
        }
        content() {
            return "";
        }
    }
    $.$mol_map_yandex_mark = $mol_map_yandex_mark;
})($ || ($ = {}));
//mark.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_map_yandex_mark extends $.$mol_map_yandex_mark {
            object() {
                const ymaps = $$.$mol_map_yandex.api();
                return new ymaps.Placemark(this.pos(), {
                    hintContent: this.hint(),
                    iconContent: this.title(),
                    balloonContent: this.content(),
                }, {
                    preset: "islands#redStretchyIcon",
                });
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_map_yandex_mark.prototype, "object", null);
        $$.$mol_map_yandex_mark = $mol_map_yandex_mark;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mark.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_map_yandex_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_map_yandex_demo_title");
        }
        sub() {
            return [this.Map()];
        }
        Map() {
            return ((obj) => {
                obj.center = (val) => this.center(val);
                obj.zoom = (val) => this.zoom(val);
                obj.objects = () => [this.Place()];
                return obj;
            })(new this.$.$mol_map_yandex());
        }
        center(val, force) {
            return (val !== void 0) ? val : [59.9, 30.3];
        }
        zoom(val, force) {
            return (val !== void 0) ? val : 10;
        }
        Place() {
            return ((obj) => {
                obj.pos = () => this.place_pos();
                obj.title = () => this.place_title();
                obj.content = () => this.place_content();
                return obj;
            })(new this.$.$mol_map_yandex_mark());
        }
        place_pos() {
            return [59.9, 30.3];
        }
        place_title() {
            return "Saint-Petersburg";
        }
        place_content() {
            return "It is Russia's second-largest city after Moscow";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex_demo.prototype, "Map", null);
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex_demo.prototype, "center", null);
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex_demo.prototype, "zoom", null);
    __decorate([
        $.$mol_mem
    ], $mol_map_yandex_demo.prototype, "Place", null);
    $.$mol_map_yandex_demo = $mol_map_yandex_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_syntax {
        constructor(lexems) {
            this['lexems()'] = lexems;
        }
        lexems() {
            return this['lexems()'];
        }
        rules() {
            let rules = this['rules()'];
            if (rules)
                return rules;
            rules = [];
            let lexems = this.lexems();
            for (let name in lexems) {
                rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            return this['rules()'] = rules;
        }
        regExp() {
            let regExp = this['regExp()'];
            if (regExp)
                return regExp;
            const parts = '(' + this.rules().map(rule => rule.regExp.source).join(')|(') + ')';
            regExp = RegExp(`([^]*?)(?:(${parts})|$(?![^]))`, 'gm');
            return this['regExp()'] = regExp;
        }
        tokenize(text) {
            const tokens = [];
            const rules = this.rules();
            const regExp = this.regExp();
            const regExpSize = RegExp('^$|' + regExp.source).exec('').length - 1;
            let position = 0;
            parsing: while (position < text.length) {
                regExp.lastIndex = position;
                var found = regExp.exec(text);
                if (position === regExp.lastIndex)
                    throw new Error('Empty token');
                position = regExp.lastIndex;
                var prefix = found[1];
                if (prefix) {
                    tokens.push({
                        name: '',
                        found: prefix,
                        chunks: [],
                    });
                }
                var suffix = found[2];
                if (suffix) {
                    let offset = 4;
                    for (let rule of rules) {
                        if (found[offset - 1]) {
                            tokens.push({
                                name: rule.name,
                                found: suffix,
                                chunks: found.slice(offset, offset + rule.size)
                            });
                            continue parsing;
                        }
                        offset += rule.size + 1;
                    }
                    throw new Error('Something wrong');
                }
            }
            return tokens;
        }
    }
    $.$mol_syntax = $mol_syntax;
})($ || ($ = {}));
//syntax.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_syntax_md_flow = new $.$mol_syntax({
        'quote': /^((?:(?:> )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^(#+)(\s*)(.*?)$([\n\r]*)/,
        'list': /^((?:(?:\s?[*+-]|\d+\.)\s+(?:[^]*?)$(?:\r?\n?))+)((?:\r?\n)*)/,
        'code': /^(```\s*)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/,
    });
    $.$mol_syntax_md_line = new $.$mol_syntax({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'strike': /~~(.+?)~~/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
    });
    $.$mol_syntax_md_code = new $.$mol_syntax({
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /\w+:\/\/\S*/,
        'code-comment-inline': /\/\/.*?$/,
        'code-string': /(?:".*?"|'.*?'|`.*?`|\/.+?\/[gmi]*|(?:^|[ \t])\\[^\n]*\n)/,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+(?=\()/,
        'code-field': /(?:\.\w+|[\w-]+\??\s*:(?!\/\/))/,
        'code-keyword': /\b(class|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|let|const|for|do|while|until|in|of|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void)\b/,
        'code-global': /[$]\w*/,
        'code-decorator': /@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>`~!\?@#\$%&\*_\+\\\/\|'";:\.,\^]/,
    });
})($ || ($ = {}));
//md.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/text/text.view.css", "[mol_text] {\n\tline-height: 1.5;\n\tbox-sizing: border-box;\n\tmax-width: 60rem;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tpadding: .5rem;\n\tborder-radius: var(--mol_skin_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_row] {\n\tmargin: .5rem;\n\toverflow: auto;\n\tmax-width: 100%;\n}\n\n[mol_text_type=\"block\"] {\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\tpadding: .5rem;\n\tfont-weight: 500;\n\tmargin: 0;\n}\n\n[mol_text_header_level=\"1\"] {\n\tfont-size: 1.5em;\n}\n\n[mol_text_header_level=\"2\"] {\n\tfont-size: 1.3em;\n}\n\n[mol_text_header_level=\"3\"] {\n\tfont-size: 1.1em;\n}\n\n[mol_text_header_level=\"4\"] {\n\tfont-size: 1.1em;\n\tfont-style: italic;\n}\n\n[mol_text_header_level=\"5\"] {\n\tfont-size: 1.1em;\n\tfont-weight: normal;\n\tfont-style: italic;\n}\n\n[mol_text_type=\"list-item\"] {\n\tdisplay: list-item;\n}\n\n[mol_text_type=\"list-item\"]:before {\n\tcontent: '•';\n\tmargin-right: 1ch;\n}\n\n[mol_text_table] {\n\tmax-width: 100%;\n\tmax-height: 75vh;\n\toverflow: auto;\n\tmargin: .5rem;\n\tflex-grow: 0;\n}\n\n[mol_text_type=\"code-indent\"] ,\n[mol_text_type=\"code\"] {\n\tfont-family: var(--mol_skin_font_monospace);\n\twhite-space: pre-wrap;\n\tborder-radius: var(--mol_skin_round);\n}\n\n[mol_text_type=\"text-link\"] {\n\tcolor: var(--mol_theme_control);\n\ttext-decoration: none;\n\tpadding: 0;\n}\n\n[mol_text_link]:hover ,\n[mol_text_link]:focus {\n\toutline: none;\n}\n\n[mol_text_image] {\n\tmax-width: 100%;\n\tmax-height: 75vh;\n\tobject-fit: scale-down;\n}\n\n[mol_text_type=\"strong\"] {\n\tfont-weight: bolder;\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"strike\"] {\n\ttext-decoration: line-through;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"code-keyword\"] {\n\tcolor: hsl(0, 70%, 60%);\n}\n\n[mol_text_type=\"code-field\"] {\n\tcolor: hsl(300, 70%, 60%);\n}\n\n[mol_text_type=\"code-tag\"] {\n\tcolor: hsl(330, 70%, 60%);\n}\n\n[mol_text_type=\"code-global\"] {\n\tcolor: hsl(210, 80%, 60%);\n}\n\n[mol_text_type=\"code-decorator\"] {\n\tcolor: hsl(180, 40%, 60%);\n}\n\n[mol_text_type=\"code-punctuation\"] {\n\topacity: .5;\n}\n\n[mol_text_type=\"code-string\"] {\n\tcolor: hsl(90, 40%, 50%);\n}\n\n[mol_text_type=\"code-number\"] {\n\tcolor: hsl(60, 70%, 30%);\n}\n\n[mol_text_type=\"code-call\"] {\n\tcolor: hsl(270, 60%, 60%);\n}\n\n[mol_text_type=\"code-link\"] {\n\tcolor: hsl(240, 60%, 60%);\n}\n\n[mol_text_type=\"code-comment-inline\"] ,\n[mol_text_type=\"code-comment-block\"] {\n\topacity: .5;\n}\n\n[mol_text_type=\"code-docs\"] {\n\topacity: .75;\n}\n");
})($ || ($ = {}));
//text.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_text extends $.$mol_list {
        uri_base() {
            return "";
        }
        text() {
            return "";
        }
        tokens() {
            return [];
        }
        Quote(id) {
            return ((obj) => {
                obj.text = () => this.quote_text(id);
                return obj;
            })(new this.$.$mol_text());
        }
        quote_text(id) {
            return "";
        }
        Row(id) {
            return ((obj) => {
                obj.sub = () => this.block_content(id);
                obj.type = () => this.block_type(id);
                return obj;
            })(new this.$.$mol_text_row());
        }
        block_content(id) {
            return [];
        }
        block_type(id) {
            return "";
        }
        Span(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_text_span());
        }
        Link(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_text_link());
        }
        Image(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_text_image());
        }
        Header(id) {
            return ((obj) => {
                obj.level = () => this.header_level(id);
                obj.content = () => this.header_content(id);
                return obj;
            })(new this.$.$mol_text_header());
        }
        header_level(id) {
            return 0;
        }
        header_content(id) {
            return [];
        }
        Table(id) {
            return ((obj) => {
                obj.head_cells = () => this.table_head_cells(id);
                obj.rows = () => this.table_rows(id);
                return obj;
            })(new this.$.$mol_grid());
        }
        table_head_cells(id) {
            return [];
        }
        table_rows(id) {
            return [];
        }
        Table_row(id) {
            return ((obj) => {
                obj.cells = () => this.table_cells(id);
                return obj;
            })(new this.$.$mol_grid_row());
        }
        table_cells(id) {
            return [];
        }
        Table_cell(id) {
            return ((obj) => {
                obj.sub = () => this.table_cell_content(id);
                return obj;
            })(new this.$.$mol_grid_cell());
        }
        table_cell_content(id) {
            return [];
        }
        Table_cell_head(id) {
            return ((obj) => {
                obj.sub = () => this.table_cell_content(id);
                return obj;
            })(new this.$.$mol_float());
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Quote", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Span", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Link", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Image", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Header", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Table", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Table_row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Table_cell", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_text.prototype, "Table_cell_head", null);
    $.$mol_text = $mol_text;
})($ || ($ = {}));
(function ($) {
    class $mol_text_row extends $.$mol_view {
        minimal_height() {
            return 40;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_text_type": this.type() }));
        }
        type() {
            return "";
        }
    }
    $.$mol_text_row = $mol_text_row;
})($ || ($ = {}));
(function ($) {
    class $mol_text_header extends $.$mol_view {
        dom_name() {
            return "h";
        }
        minimal_height() {
            return 50;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_text_header_level": this.level() }));
        }
        level(val, force) {
            return (val !== void 0) ? val : 0;
        }
        sub() {
            return this.content();
        }
        content() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_text_header.prototype, "level", null);
    $.$mol_text_header = $mol_text_header;
})($ || ($ = {}));
(function ($) {
    class $mol_text_span extends $.$mol_view {
        dom_name() {
            return "span";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_text_type": this.type() }));
        }
        type(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return this.content();
        }
        content(val, force) {
            return (val !== void 0) ? val : [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_text_span.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_span.prototype, "content", null);
    $.$mol_text_span = $mol_text_span;
})($ || ($ = {}));
(function ($) {
    class $mol_text_link extends $.$mol_link {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_text_type": this.type() }));
        }
        type(val, force) {
            return (val !== void 0) ? val : "";
        }
        uri() {
            return this.link();
        }
        link(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return this.content();
        }
        content(val, force) {
            return (val !== void 0) ? val : [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_text_link.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_link.prototype, "link", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_link.prototype, "content", null);
    $.$mol_text_link = $mol_text_link;
})($ || ($ = {}));
(function ($) {
    class $mol_text_image extends $.$mol_view {
        dom_name() {
            return "object";
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "allowfullscreen": true, "mol_text_type": this.type(), "data": this.link() }));
        }
        type(val, force) {
            return (val !== void 0) ? val : "";
        }
        link(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return [this.title()];
        }
        title(val, force) {
            return (val !== void 0) ? val : "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_text_image.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_image.prototype, "link", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_image.prototype, "title", null);
    $.$mol_text_image = $mol_text_image;
})($ || ($ = {}));
//text.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text extends $.$mol_text {
            tokens() {
                return this.$.$mol_syntax_md_flow.tokenize(this.text());
            }
            rows() {
                return this.tokens().map((token, index) => {
                    switch (token.name) {
                        case 'table': return this.Table(index);
                        case 'header': return this.Header(index);
                        case 'quote': return this.Quote(index);
                    }
                    return this.Row(index);
                });
            }
            header_level(index) {
                return this.tokens()[index].chunks[0].length;
            }
            header_content(index) {
                return this.text2spans(`${index}`, this.tokens()[index].chunks[2]);
            }
            quote_text(index) {
                return this.tokens()[index].chunks[0].replace(/^> /mg, '');
            }
            block_type(index) {
                return this.tokens()[index].name;
            }
            cell_contents(indexBlock) {
                return this.tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_contents(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_contents(blockId)[0]
                    .map((cell, cellId) => this.Table_cell_head({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_contents(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_content(id) {
                return this.text2spans(`${id.block}/${id.row}/${id.cell}`, this.cell_contents(id.block)[id.row][id.cell]);
            }
            uri_base() {
                return $.$mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                const url = new URL(uri, this.uri_base());
                return url.toString();
            }
            text2spans(prefix, text) {
                return this.$.$mol_syntax_md_line.tokenize(text).map((token, index) => {
                    const id = `${prefix}/${index}`;
                    switch (token.name) {
                        case 'text-link': {
                            if (/^(\w+script+:)+/.test(token.chunks[1])) {
                                const span = this.Span(id);
                                span.content(this.text2spans(id, token.chunks[0]));
                                return span;
                            }
                            else {
                                const span = this.Link(id);
                                span.type(token.name);
                                span.link(this.uri_resolve(token.chunks[1]));
                                span.content(this.text2spans(id, token.chunks[0]));
                                return span;
                            }
                        }
                        case 'image-link': {
                            const span = this.Image(token.chunks[1]);
                            span.type(token.name);
                            span.link(this.uri_resolve(token.chunks[1]));
                            span.title(token.chunks[0]);
                            return span;
                        }
                        case 'code3':
                        case 'code': {
                            const span = this.Span(id);
                            span.type('code');
                            span.content(this.code2spans(id, token.chunks[0]));
                            return span;
                        }
                    }
                    const span = this.Span(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map((text, index) => this.text2spans(`${id}/${index}`, text)))
                        : [token.found]);
                    return span;
                });
            }
            code2spans(prefix, text) {
                return this.$.$mol_syntax_md_code.tokenize(text).map((token, index) => {
                    const id = `${prefix}/${index}`;
                    const span = this.Span(id);
                    span.type(token.name);
                    switch (token.name) {
                        case 'code-docs': {
                            span.content(this.text2spans(`${id}/${index}`, token.found));
                            return span;
                        }
                        case 'code-string': {
                            span.content([token.found[0], ...this.code2spans(`${id}/${index}`, token.found.slice(1, token.found.length - 1)), token.found[token.found.length - 1]]);
                            return span;
                        }
                        default: {
                            span.content([token.found]);
                            return span;
                        }
                    }
                });
            }
            block_content(indexBlock) {
                const token = this.tokens()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans(`${indexBlock}`, token.chunks[2]);
                    case 'list': return this.text2spans(`${indexBlock}`, token.chunks[0]);
                    case 'code': return this.code2spans(`${indexBlock}`, token.chunks[2]);
                    case 'code-indent': return this.code2spans(`${indexBlock}`, token.chunks[0].replace(/[\n\r]*$/, '\n').replace(/^\t/gm, ''));
                }
                return this.text2spans(`${indexBlock}`, token.chunks[0]);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_text.prototype, "tokens", null);
        __decorate([
            $.$mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "cell_contents", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "table_cell_content", null);
        __decorate([
            $.$mol_fiber.method
        ], $mol_text.prototype, "text2spans", null);
        __decorate([
            $.$mol_fiber.method
        ], $mol_text.prototype, "code2spans", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "block_content", null);
        $$.$mol_text = $mol_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//text.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/message/message.view.css", "[mol_message] {\n\tmax-width: 58rem;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n}\n\n[mol_message_avatar_link] {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: none;\n\tpadding: 0;\n}\n\n[mol_message_avatar] {\n\twidth: 3.5rem;\n\theight: 3.5rem;\n}\n\n[mol_message_text] {\n\tflex: 1000 1 10rem;\n}\n\n[mol_message_info] {\n\tflex: 1 1 100%;\n\tpadding: 0;\n\tbox-shadow: none;\n\tdisplay: flex;\n\talign-items: baseline;\n\tjustify-content: space-between;\n\tfont-size: .75rem;\n\tline-height: 1rem;\n}\n\n[mol_message_info] > * {\n\tmargin: 0;\n}\n\n[mol_message_name] {\n\tfont-weight: bolder;\n}\n");
})($ || ($ = {}));
//message.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_message extends $.$mol_view {
        moment() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
        sub() {
            return [this.Info(), this.Avatar_link(), this.Text()];
        }
        Info() {
            return ((obj) => {
                obj.sub = () => [this.Name(), this.Moment()];
                return obj;
            })(new this.$.$mol_row());
        }
        Name() {
            return ((obj) => {
                obj.sub = () => [this.name()];
                return obj;
            })(new this.$.$mol_view());
        }
        name() {
            return " ";
        }
        Moment() {
            return ((obj) => {
                obj.sub = () => [this.moment_string()];
                return obj;
            })(new this.$.$mol_view());
        }
        moment_string() {
            return "";
        }
        Avatar_link() {
            return ((obj) => {
                obj.uri = () => this.avatar_link();
                obj.sub = () => [this.Avatar()];
                return obj;
            })(new this.$.$mol_link());
        }
        avatar_link() {
            return "";
        }
        Avatar() {
            return ((obj) => {
                obj.title = () => "";
                obj.uri = () => this.avatar();
                return obj;
            })(new this.$.$mol_image());
        }
        avatar() {
            return "";
        }
        Text() {
            return ((obj) => {
                obj.text = () => this.text();
                return obj;
            })(new this.$.$mol_text());
        }
        text() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "moment", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Info", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Name", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Moment", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Avatar_link", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Avatar", null);
    __decorate([
        $.$mol_mem
    ], $mol_message.prototype, "Text", null);
    $.$mol_message = $mol_message;
})($ || ($ = {}));
//message.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_message extends $.$mol_message {
            moment_string() {
                return this.moment().toString('YYYY-MM-DD hh:mm:ss');
            }
        }
        $$.$mol_message = $mol_message;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//message.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_message_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_message_demo_title");
        }
        sub() {
            return [this.Message_short(), this.Message_long()];
        }
        Message_short() {
            return ((obj) => {
                obj.name = () => "Jin";
                obj.moment = () => this.created();
                obj.avatar = () => "https://avatars3.githubusercontent.com/u/442988?v=4";
                obj.avatar_link = () => "https://github.com/nin-jin";
                obj.text = () => "Hello, **everybody!**";
                return obj;
            })(new this.$.$mol_message());
        }
        created() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment());
        }
        Message_long() {
            return ((obj) => {
                obj.name = () => "Great Teacher Onizuka";
                obj.moment = () => this.created();
                obj.avatar_link = () => "https://en.wikipedia.org/wiki/Great_Teacher_Onizuka";
                obj.text = () => "The story focuses on 22-year-old ex-[bōsōzoku](https://en.wikipedia.org/wiki/Bōsōzoku) member Eikichi Onizuka, who becomes a teacher at a private middle school, Holy Forest Academy, in [Tokyo](https://en.wikipedia.org/wiki/Tokyo), [Japan](https://en.wikipedia.org/wiki/Japan). It won the 1998 [Kodansha Manga Award](https://en.wikipedia.org/wiki/Kodansha_Manga_Award) for shōnen and is a continuation of Tohru Fujisawa's other manga series [Shonan Junai Gumi](https://en.wikipedia.org/wiki/Shonan_Junai_Gumi) (lit. \"Shōnan True Love Group\") and Bad Company, both of which focus on the life of Onizuka before he becomes a teacher in Great Teacher Onizuka.";
                return obj;
            })(new this.$.$mol_message());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_message_demo.prototype, "Message_short", null);
    __decorate([
        $.$mol_mem
    ], $mol_message_demo.prototype, "created", null);
    __decorate([
        $.$mol_mem
    ], $mol_message_demo.prototype, "Message_long", null);
    $.$mol_message_demo = $mol_message_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/meter/demo/demo.view.css", "[mol_meter_demo] {\n\talign-self: stretch;\n\tjustify-content: flex-start;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_meter_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_meter_demo_title");
        }
        plugins() {
            return [this.Meter()];
        }
        top() {
            return this.Meter().top();
        }
        height() {
            return this.Meter().height();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter());
        }
        sub() {
            return [this.Top(), this.Height()];
        }
        Top() {
            return ((obj) => {
                obj.sub = () => ["Offset from top: ", this.top()];
                return obj;
            })(new this.$.$mol_view());
        }
        Height() {
            return ((obj) => {
                obj.sub = () => ["Component height: ", this.height()];
                return obj;
            })(new this.$.$mol_view());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_meter_demo.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter_demo.prototype, "Top", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter_demo.prototype, "Height", null);
    $.$mol_meter_demo = $mol_meter_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_minus extends $.$mol_icon {
        path() {
            return "M19,13H5V11H19V13Z";
        }
    }
    $.$mol_icon_minus = $mol_icon_minus;
})($ || ($ = {}));
//minus.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_plus extends $.$mol_icon {
        path() {
            return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
        }
    }
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//plus.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number]:hover {\n\tz-index: 2;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\ttext-align: right;\n\tposition: relative;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n\n[mol_number_inc] ,\n[mol_number_dec] {\n\tmargin: 0;\n\tflex: 0 0 auto;\n\tposition: absolute;\n\tpadding: .75rem;\n\tdisplay: none;\n\tz-index: 1;\n}\n\n[mol_number_inc] {\n\tleft: calc( 100% - .75rem );\n}\n\n[mol_number_dec] {\n\tright: calc( 100% - .75rem );\n}\n\n[mol_number]:focus-within [mol_number_inc]:not([disabled]) ,\n[mol_number]:focus-within [mol_number_dec]:not([disabled]) {\n\tdisplay: flex;\n}\n\n[mol_number_inc_icon] ,\n[mol_number_dec_icon] {\n\tdisplay: block;\n\twidth: 1rem;\n\theight: 1rem;\n}\n");
})($ || ($ = {}));
//number.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_number extends $.$mol_view {
        precision_view() {
            return this.precision();
        }
        precision() {
            return 1;
        }
        precision_change() {
            return this.precision();
        }
        value(val, force) {
            return (val !== void 0) ? val : NaN;
        }
        sub() {
            return [this.String(), this.Dec(), this.Inc()];
        }
        String() {
            return ((obj) => {
                obj.type = () => "number";
                obj.value = (val) => this.value_string(val);
                obj.hint = () => this.hint();
                obj.enabled = () => this.string_enabled();
                obj.debounce = () => this.debounce();
                return obj;
            })(new this.$.$mol_string());
        }
        value_string(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return "";
        }
        string_enabled() {
            return this.enabled();
        }
        enabled() {
            return true;
        }
        debounce() {
            return 200;
        }
        Dec() {
            return ((obj) => {
                obj.event_click = (val) => this.event_dec(val);
                obj.enabled = () => this.dec_enabled();
                obj.sub = () => [this.dec_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        event_dec(val, force) {
            return (val !== void 0) ? val : null;
        }
        dec_enabled() {
            return this.enabled();
        }
        dec_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_minus());
        }
        Inc() {
            return ((obj) => {
                obj.event_click = (val) => this.event_inc(val);
                obj.enabled = () => this.inc_enabled();
                obj.sub = () => [this.inc_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        event_inc(val, force) {
            return (val !== void 0) ? val : null;
        }
        inc_enabled() {
            return this.enabled();
        }
        inc_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_plus());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "String", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "value_string", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "Dec", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "event_dec", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "dec_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "Inc", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "event_inc", null);
    __decorate([
        $.$mol_mem
    ], $mol_number.prototype, "inc_icon", null);
    $.$mol_number = $mol_number;
})($ || ($ = {}));
//number.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_number extends $.$mol_number {
            event_dec(next) {
                this.value((this.value() || 0) - this.precision_change());
            }
            event_inc(next) {
                this.value((Number(this.value()) || 0) + this.precision_change());
            }
            value_string(next) {
                if (next !== void 0) {
                    this.value(next === '' ? null : Number(next));
                }
                const precisionView = this.precision_view();
                const value = next ? Number(next) : this.value();
                if (value === null)
                    return '';
                if (precisionView >= 1) {
                    return (value / precisionView).toFixed();
                }
                else {
                    const fixedNumber = Math.log(1 / precisionView) / Math.log(10);
                    return value.toFixed(fixedNumber);
                }
            }
        }
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//number.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_number_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_number_demo_title");
        }
        sub() {
            return [this.zero(), this.one(), this.two(), this.three(), this.four(), this.five(), this.six(), this.seven(), this.eight(), this.nine()];
        }
        zero() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_number());
        }
        one() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                return obj;
            })(new this.$.$mol_number());
        }
        year(val, force) {
            return (val !== void 0) ? val : NaN;
        }
        two() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.hint = () => "2016";
                return obj;
            })(new this.$.$mol_number());
        }
        three() {
            return ((obj) => {
                obj.value = (val) => this.age(val);
                obj.hint = () => "18-99";
                obj.enabled = () => false;
                return obj;
            })(new this.$.$mol_number());
        }
        age(val, force) {
            return (val !== void 0) ? val : 32;
        }
        four() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.string_enabled = () => false;
                return obj;
            })(new this.$.$mol_number());
        }
        five() {
            return ((obj) => {
                obj.value = (val) => this.age(val);
                obj.dec_enabled = () => false;
                return obj;
            })(new this.$.$mol_number());
        }
        six() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.inc_enabled = () => false;
                return obj;
            })(new this.$.$mol_number());
        }
        seven() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.precision_change = () => 10;
                return obj;
            })(new this.$.$mol_number());
        }
        eight() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.precision_view = () => 0.01;
                return obj;
            })(new this.$.$mol_number());
        }
        nine() {
            return ((obj) => {
                obj.value = (val) => this.year(val);
                obj.precision = () => 1000;
                return obj;
            })(new this.$.$mol_number());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "zero", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "one", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "year", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "two", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "three", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "age", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "four", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "five", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "six", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "seven", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "eight", null);
    __decorate([
        $.$mol_mem
    ], $mol_number_demo.prototype, "nine", null);
    $.$mol_number_demo = $mol_number_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_page extends $.$mol_view {
        sub() {
            return [this.Head(), this.Body(), this.Foot()];
        }
        Head() {
            return ((obj) => {
                obj.attr = () => ({
                    "mol_theme": "$mol_theme_base",
                });
                obj.sub = () => this.head();
                return obj;
            })(new this.$.$mol_view());
        }
        head() {
            return [this.Title(), this.Tools()];
        }
        Title() {
            return ((obj) => {
                obj.sub = () => [this.title()];
                obj.event_click = (val) => this.event_top(val);
                return obj;
            })(new this.$.$mol_button());
        }
        event_top(val, force) {
            return (val !== void 0) ? val : null;
        }
        Tools() {
            return ((obj) => {
                obj.sub = () => this.tools();
                return obj;
            })(new this.$.$mol_view());
        }
        tools() {
            return [];
        }
        Body() {
            return ((obj) => {
                obj.scroll_top = (val) => this.body_scroll_top(val);
                obj.sub = () => this.body();
                return obj;
            })(new this.$.$mol_scroll());
        }
        body_scroll_top(val, force) {
            return (val !== void 0) ? val : 0;
        }
        body() {
            return [];
        }
        Foot() {
            return ((obj) => {
                obj.attr = () => ({
                    "mol_theme": "$mol_theme_base",
                });
                obj.sub = () => this.foot();
                return obj;
            })(new this.$.$mol_view());
        }
        foot() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "event_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "Tools", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "body_scroll_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_page extends $.$mol_page {
            body_scroll_top(next) {
                return $.$mol_state_session.value(`${this}.body_scroll_top()`, next) || 0;
            }
        }
        $$.$mol_page = $mol_page;
        $.$mol_style_define($mol_page, {
            display: 'flex',
            margin: '0',
            flexDirection: 'column',
            flex: '1 1 auto',
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: '100%',
            maxHeight: '100%',
            boxSizing: 'border-box',
            background: "var(--mol_theme_back)",
            color: "var(--mol_theme_text)",
            zIndex: '0',
            overflow: 'hidden',
            boxShadow: `inset 0 0 0 .5px ${"var(--mol_theme_line)"}`,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                flex: '0 0 auto',
                position: 'relative',
                margin: '0',
                minHeight: 'calc( 1.5em + 1rem )',
                padding: '.5rem',
            },
            Title: {
                flex: '1000 1 50%',
                padding: '.5rem',
                wordBreak: 'normal',
                cursor: 'default',
                ':empty': {
                    display: 'none',
                },
            },
            Tools: {
                flex: '1 1 auto',
                display: 'flex',
                justifyContent: 'flex-end',
                ':empty': {
                    display: 'none',
                },
            },
            Body: {
                flex: '1000 1 100%',
                margin: '0',
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: '0 0 auto',
                margin: '0',
                overflow: 'hidden',
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//page.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_page_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_page_demo_title");
        }
        sub() {
            return [this.Page()];
        }
        Page() {
            return ((obj) => {
                obj.tools = () => [this.Button()];
                obj.body = () => [this.Content()];
                obj.foot = () => [this.Foot_content()];
                return obj;
            })(new this.$.$mol_page());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Toolbar Button";
                return obj;
            })(new this.$.$mol_button_minor());
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [this.Text()];
                return obj;
            })(new this.$.$mol_row());
        }
        Text() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
        Foot_content() {
            return ((obj) => {
                obj.sub = () => [this.Foot_text()];
                return obj;
            })(new this.$.$mol_row());
        }
        Foot_text() {
            return ((obj) => {
                obj.sub = () => ["Footer"];
                return obj;
            })(new this.$.$mol_view());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Page", null);
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Text", null);
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Foot_content", null);
    __decorate([
        $.$mol_mem
    ], $mol_page_demo.prototype, "Foot_text", null);
    $.$mol_page_demo = $mol_page_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/paginator/paginator.view.css", "[mol_paginator] {\n\tdisplay: flex;\n}\n\n[mol_paginator_backward] ,\n[mol_paginator_forward] {\n\tpadding: .5rem;\n\tmargin: 0 -.5rem;\n\ttransform: scale( 0 , 0 );\n}\n\n[mol_paginator_value] {\n\tpadding: .5rem;\n\tdisplay: flex;\n    align-items: center;\n}\n\n[mol_paginator]:hover [mol_paginator_backward] ,\n[mol_paginator_backward]:focus {\n\ttransform: scale( -1 , 1 );\n}\n\n[mol_paginator]:hover [mol_paginator_forward] ,\n[mol_paginator_forward]:focus {\n\ttransform: scale( 1 , 1 );\n}\n");
})($ || ($ = {}));
//paginator.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_paginator extends $.$mol_view {
        sub() {
            return [this.Backward(), this.Value(), this.Forward()];
        }
        Backward() {
            return ((obj) => {
                obj.hint = () => this.backward_hint();
                obj.click = (event) => this.backward(event);
                obj.sub = () => [this.Backward_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        backward_hint() {
            return this.$.$mol_locale.text("$mol_paginator_backward_hint");
        }
        backward(event, force) {
            return (event !== void 0) ? event : null;
        }
        Backward_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_chevron());
        }
        Value() {
            return ((obj) => {
                obj.sub = () => [this.value()];
                return obj;
            })(new this.$.$mol_view());
        }
        value(val, force) {
            return (val !== void 0) ? val : 0;
        }
        Forward() {
            return ((obj) => {
                obj.hint = () => this.forward_hint();
                obj.click = (event) => this.forward(event);
                obj.sub = () => [this.Forward_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        forward_hint() {
            return this.$.$mol_locale.text("$mol_paginator_forward_hint");
        }
        forward(event, force) {
            return (event !== void 0) ? event : null;
        }
        Forward_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_chevron());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "Backward", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "backward", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "Backward_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "Value", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "Forward", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "forward", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator.prototype, "Forward_icon", null);
    $.$mol_paginator = $mol_paginator;
})($ || ($ = {}));
//paginator.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paginator extends $.$mol_paginator {
            backward() {
                this.value(this.value() - 1);
            }
            forward() {
                this.value(this.value() + 1);
            }
        }
        $$.$mol_paginator = $mol_paginator;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//paginator.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_paginator_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_paginator_demo_title");
        }
        sub() {
            return [this.Pages()];
        }
        Pages() {
            return ((obj) => {
                obj.value = (val) => this.page(val);
                return obj;
            })(new this.$.$mol_paginator());
        }
        page(val, force) {
            return (val !== void 0) ? val : 0;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_paginator_demo.prototype, "Pages", null);
    __decorate([
        $.$mol_mem
    ], $mol_paginator_demo.prototype, "page", null);
    $.$mol_paginator_demo = $mol_paginator_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/plot/demo/demo.view.css", "[mol_plot_demo_saturation] {\n\tstroke-dasharray: .5% .5%;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plot_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_plot_demo_title");
        }
        count(val, force) {
            return (val !== void 0) ? val : 20;
        }
        sub() {
            return [this.Plot()];
        }
        Plot() {
            return ((obj) => {
                obj.graphs = () => [this.Saturation(), this.Input(), this.Output(), this.Voltage(), this.Time()];
                return obj;
            })(new this.$.$mol_plot_pane());
        }
        Saturation() {
            return ((obj) => {
                obj.series_y = () => this.saturation_series();
                obj.graphs = () => [this.Saturation_fill(), this.Saturation_line()];
                return obj;
            })(new this.$.$mol_plot_group());
        }
        saturation_series() {
            return [];
        }
        Saturation_fill() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_fill());
        }
        Saturation_line() {
            return ((obj) => {
                obj.type = () => "dashed";
                return obj;
            })(new this.$.$mol_plot_line());
        }
        Input() {
            return ((obj) => {
                obj.series_y = () => this.input_series();
                obj.graphs = () => [this.Input_line(), this.Input_dots()];
                return obj;
            })(new this.$.$mol_plot_group());
        }
        input_series() {
            return [];
        }
        Input_line() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_line());
        }
        Input_dots() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_plot_dot());
        }
        Output() {
            return ((obj) => {
                obj.series_y = () => this.output_series();
                return obj;
            })(new this.$.$mol_plot_bar());
        }
        output_series() {
            return [];
        }
        Voltage() {
            return ((obj) => {
                obj.title = () => this.Voltage_title();
                return obj;
            })(new this.$.$mol_plot_ruler_vert());
        }
        Voltage_title() {
            return this.$.$mol_locale.text("$mol_plot_demo_Voltage_title");
        }
        Time() {
            return ((obj) => {
                obj.title = () => this.Time_title();
                return obj;
            })(new this.$.$mol_plot_ruler_hor());
        }
        Time_title() {
            return this.$.$mol_locale.text("$mol_plot_demo_Time_title");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "count", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Plot", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Saturation", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Saturation_fill", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Saturation_line", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Input_line", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Input_dots", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Output", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Voltage", null);
    __decorate([
        $.$mol_mem
    ], $mol_plot_demo.prototype, "Time", null);
    $.$mol_plot_demo = $mol_plot_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_demo extends $.$mol_plot_demo {
            series_x() {
                const next = [];
                for (let i = 0, count = this.count(); i < count; i++)
                    next.push(i);
                return next;
            }
            input_series() {
                return this.series_x().map(i => Math.sin(i / 2) * 2);
            }
            output_series() {
                $.$mol_state_time.now(125);
                return this.input_series().map(input => input * Math.random());
            }
            saturation_series() {
                const input = this.output_series();
                const prev = ($.$mol_atom2_value(() => this.saturation_series()) || []);
                return input.map((val, i) => {
                    const next = (val + 9 * (prev[i] || 0)) / 10;
                    return (Math.abs(next) > Math.abs(val)) ? next : val;
                });
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plot_demo.prototype, "series_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_demo.prototype, "input_series", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_demo.prototype, "output_series", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_demo.prototype, "saturation_series", null);
        $$.$mol_plot_demo = $mol_plot_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_pop_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_pop_demo_title");
        }
        sub() {
            return [this.Pop()];
        }
        Pop() {
            return ((obj) => {
                obj.Anchor = () => this.Show();
                obj.showed = () => this.showed();
                obj.bubble_content = () => [this.Content()];
                return obj;
            })(new this.$.$mol_pop());
        }
        Show() {
            return ((obj) => {
                obj.title = () => this.show_text();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        show_text() {
            return this.$.$mol_locale.text("$mol_pop_demo_show_text");
        }
        showed() {
            return this.focused();
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [this.bubble_hint()];
                return obj;
            })(new this.$.$mol_row());
        }
        bubble_hint() {
            return this.$.$mol_locale.text("$mol_pop_demo_bubble_hint");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_pop_demo.prototype, "Pop", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_demo.prototype, "Show", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_demo.prototype, "Content", null);
    $.$mol_pop_demo = $mol_pop_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/pop/over/over.view.css", "[mol_pop_over]:focus {\r\n\toutline: none;\r\n}");
})($ || ($ = {}));
//over.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_pop_over extends $.$mol_pop {
        showed() {
            return this.hovered();
        }
        hovered(val, force) {
            return (val !== void 0) ? val : false;
        }
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "tabindex": 0 }));
        }
        event() {
            return (Object.assign(Object.assign({}, super.event()), { "mouseenter": (event) => this.event_show(event), "mouseleave": (event) => this.event_hide(event) }));
        }
        event_show(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_hide(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_pop_over.prototype, "hovered", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over.prototype, "event_show", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over.prototype, "event_hide", null);
    $.$mol_pop_over = $mol_pop_over;
})($ || ($ = {}));
//over.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop_over extends $.$mol_pop_over {
            event_show(event) {
                this.hovered(true);
            }
            event_hide(event) {
                this.hovered(false);
            }
            showed() {
                return this.focused() || this.hovered();
            }
        }
        $$.$mol_pop_over = $mol_pop_over;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//over.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_pop_over_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_title");
        }
        sub() {
            return [this.Menu()];
        }
        Menu() {
            return ((obj) => {
                obj.sub = () => [this.File(), this.Help()];
                return obj;
            })(new this.$.$mol_row());
        }
        File() {
            return ((obj) => {
                obj.align = () => "bottom_right";
                obj.Anchor = () => this.file_title();
                obj.bubble_content = () => [this.File_menu()];
                return obj;
            })(new this.$.$mol_pop_over());
        }
        file_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_file_title");
        }
        File_menu() {
            return ((obj) => {
                obj.rows = () => [this.Open(), this.Export(), this.Save()];
                return obj;
            })(new this.$.$mol_list());
        }
        Open() {
            return ((obj) => {
                obj.title = () => this.open_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        open_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_open_title");
        }
        Export() {
            return ((obj) => {
                obj.title = () => this.export_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        export_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_export_title");
        }
        Save() {
            return ((obj) => {
                obj.title = () => this.save_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        save_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_save_title");
        }
        Help() {
            return ((obj) => {
                obj.align = () => "bottom_right";
                obj.Anchor = () => this.help_title();
                obj.bubble_content = () => [this.Help_menu()];
                return obj;
            })(new this.$.$mol_pop_over());
        }
        help_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_help_title");
        }
        Help_menu() {
            return ((obj) => {
                obj.rows = () => [this.Updates(), this.About()];
                return obj;
            })(new this.$.$mol_list());
        }
        Updates() {
            return ((obj) => {
                obj.title = () => this.updates_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        updates_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_updates_title");
        }
        About() {
            return ((obj) => {
                obj.title = () => this.about_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        about_title() {
            return this.$.$mol_locale.text("$mol_pop_over_demo_about_title");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "File", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "File_menu", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Open", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Export", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Save", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Help", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Help_menu", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "Updates", null);
    __decorate([
        $.$mol_mem
    ], $mol_pop_over_demo.prototype, "About", null);
    $.$mol_pop_over_demo = $mol_pop_over_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/pop/over/demo/over.view.css", "[mol_pop_over_demo_file_menu] ,\n[mol_pop_over_demo_help_menu] {\n\talign-items: stretch;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n");
})($ || ($ = {}));
//over.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_portion_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_portion_demo_title");
        }
        sub() {
            return [this.Empty(), this.Partial(), this.Full()];
        }
        Empty() {
            return ((obj) => {
                obj.portion = () => this.fist();
                return obj;
            })(new this.$.$mol_portion());
        }
        fist() {
            return 0;
        }
        Partial() {
            return ((obj) => {
                obj.portion = () => this.second();
                return obj;
            })(new this.$.$mol_portion());
        }
        second() {
            return 0.5;
        }
        Full() {
            return ((obj) => {
                obj.portion = () => this.third();
                return obj;
            })(new this.$.$mol_portion());
        }
        third() {
            return 1;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_portion_demo.prototype, "Empty", null);
    __decorate([
        $.$mol_mem
    ], $mol_portion_demo.prototype, "Partial", null);
    __decorate([
        $.$mol_mem
    ], $mol_portion_demo.prototype, "Full", null);
    $.$mol_portion_demo = $mol_portion_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_row_demo_form extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_row_demo_form_title");
        }
        sub() {
            return [this.Row()];
        }
        Row() {
            return ((obj) => {
                obj.sub = () => [this.Name(), this.Count(), this.Progress(), this.Publish(), this.Drop()];
                return obj;
            })(new this.$.$mol_row());
        }
        Name() {
            return ((obj) => {
                obj.hint = () => this.name_hint();
                obj.query = (val) => this.name(val);
                obj.suggests = () => [this.suggest1(), this.suggest2()];
                return obj;
            })(new this.$.$mol_search());
        }
        name_hint() {
            return this.$.$mol_locale.text("$mol_row_demo_form_name_hint");
        }
        name(val, force) {
            return (val !== void 0) ? val : "";
        }
        suggest1() {
            return this.$.$mol_locale.text("$mol_row_demo_form_suggest1");
        }
        suggest2() {
            return this.$.$mol_locale.text("$mol_row_demo_form_suggest2");
        }
        Count() {
            return ((obj) => {
                obj.hint = () => this.count_hint();
                obj.value = (val) => this.count(val);
                return obj;
            })(new this.$.$mol_number());
        }
        count_hint() {
            return this.$.$mol_locale.text("$mol_row_demo_form_count_hint");
        }
        count(val, force) {
            return (val !== void 0) ? val : null;
        }
        Progress() {
            return ((obj) => {
                obj.portion = () => this.progress();
                return obj;
            })(new this.$.$mol_portion());
        }
        progress() {
            return 0.33;
        }
        Publish() {
            return ((obj) => {
                obj.title = () => this.publish_label();
                obj.checked = (val) => this.publish(val);
                return obj;
            })(new this.$.$mol_check_box());
        }
        publish_label() {
            return this.$.$mol_locale.text("$mol_row_demo_form_publish_label");
        }
        publish(val, force) {
            return (val !== void 0) ? val : false;
        }
        Drop() {
            return ((obj) => {
                obj.title = () => this.drop_title();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        drop_title() {
            return this.$.$mol_locale.text("$mol_row_demo_form_drop_title");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Row", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Name", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "name", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Count", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "count", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Progress", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Publish", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "publish", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_form.prototype, "Drop", null);
    $.$mol_row_demo_form = $mol_row_demo_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_unit extends $.$mol_object {
        constructor(value) {
            super();
            if (value !== undefined)
                this['valueOf()'] = value;
        }
        prefix() {
            return '';
        }
        postfix() {
            return '';
        }
        valueOf() {
            return this['valueOf()'];
        }
        delimiter() {
            return ' ';
        }
        value_view() {
            return this.valueOf().toLocaleString();
        }
        toString() {
            return this.prefix() + this.value_view() + this.postfix();
        }
        static summ(a, b) {
            var Class = a.constructor;
            if (Class !== b.constructor)
                throw new Error(`Not same measure: ${Class} , ${b.constructor}`);
            return new Class(a.valueOf() + b.valueOf());
        }
        mult(m) {
            var Class = this.constructor;
            return new Class(this.valueOf() * m);
        }
    }
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_unit_money extends $.$mol_unit {
    }
    $.$mol_unit_money = $mol_unit_money;
    class $mol_unit_money_usd extends $mol_unit_money {
        prefix() {
            return '$';
        }
    }
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    class $mol_unit_money_rur extends $mol_unit_money {
        postfix() {
            return ' ₽';
        }
    }
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix = '', count = 10, length = 10) {
        if (prefix.length >= length)
            return [];
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        let strings = [];
        for (let i = 0; i < count; i++) {
            let text = prefix;
            for (let j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length = 8) {
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max = 1000) {
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $.$mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_stub_select_random([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_select_random(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_select_random(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_stub_select_random(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_select_random(['Company', 'Corporation', 'Holding']);
        return `A ${type} that makes ${product}`;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_stub_select_random(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_stub_select_random([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_stub_select_random(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_select_random(['Ivanov', 'Petrov', 'Sidorov']);
        return `${first} ${last}`;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift = 60 * 24 * 365) {
        return new $.$mol_time_moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/row/demo/products/products.view.css", "\n[mol_row_demo_products_products] {\n\tdisplay: grid;\n\tgrid-gap: 0.5rem;\n\tgrid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));\n}\n\n[mol_row_demo_products_product] {\n\tpadding: 0.5rem;\n\tmin-height: 90px;\n}\n");
})($ || ($ = {}));
//products.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_row_demo_products extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_row_demo_products_title");
        }
        count() {
            return 500;
        }
        Product(id) {
            return ((obj) => {
                obj.minimal_width = () => 140;
                obj.minimal_height = () => 100;
                obj.content = () => [this.product_title(id)];
                return obj;
            })(new this.$.$mol_card());
        }
        product_title(id) {
            return "";
        }
        sub() {
            return [this.Catalog()];
        }
        Catalog() {
            return ((obj) => {
                obj.sub = () => [this.Products()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        Products() {
            return ((obj) => {
                obj.sub = () => this.products();
                return obj;
            })(new this.$.$mol_row());
        }
        products() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_row_demo_products.prototype, "Product", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_products.prototype, "Catalog", null);
    __decorate([
        $.$mol_mem
    ], $mol_row_demo_products.prototype, "Products", null);
    $.$mol_row_demo_products = $mol_row_demo_products;
})($ || ($ = {}));
//products.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_row_demo_products extends $.$mol_row_demo_products {
            products() {
                return $.$mol_range2(id => this.Product(id), () => this.count());
            }
            product_title(id) {
                return $.$mol_stub_product_name();
            }
        }
        __decorate([
            $.$mol_mem_key
        ], $mol_row_demo_products.prototype, "product_title", null);
        $$.$mol_row_demo_products = $mol_row_demo_products;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//products.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_scroll_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_scroll_demo_title");
        }
        sub() {
            return [this.Scroll()];
        }
        Scroll() {
            return ((obj) => {
                obj.sub = () => [this.Content()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [this.One(), this.Two(), this.Tree()];
                return obj;
            })(new this.$.$mol_row());
        }
        One() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
        Two() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
        Tree() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_scroll_demo.prototype, "Scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll_demo.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll_demo.prototype, "One", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll_demo.prototype, "Two", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll_demo.prototype, "Tree", null);
    $.$mol_scroll_demo = $mol_scroll_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_search_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_search_demo_title");
        }
        sub() {
            return [this.Search()];
        }
        query() {
            return this.Search().query();
        }
        Search() {
            return ((obj) => {
                obj.suggests = () => this.suggests();
                return obj;
            })(new this.$.$mol_search());
        }
        suggests() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_search_demo.prototype, "Search", null);
    $.$mol_search_demo = $mol_search_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search_demo extends $.$mol_search_demo {
            suggests() {
                const query = this.query();
                if (query.length < 2)
                    return [];
                return $.$mol_stub_strings(this.query(), 30);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_search_demo.prototype, "suggests", null);
        $$.$mol_search_demo = $mol_search_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/section/section.view.css", "[mol_section_head] {\n\tfont-size: 1.5rem;\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: flex-end;\n\tflex-wrap: wrap;\n}\n");
})($ || ($ = {}));
//section.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_section extends $.$mol_list {
        rows() {
            return [this.Head(), this.Content()];
        }
        Head() {
            return ((obj) => {
                obj.sub = () => this.head();
                return obj;
            })(new this.$.$mol_view());
        }
        head() {
            return [];
        }
        Content() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_section.prototype, "Head", null);
    $.$mol_section = $mol_section;
})($ || ($ = {}));
//section.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_section_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_section_demo_title");
        }
        sub() {
            return [this.Text()];
        }
        Text() {
            return ((obj) => {
                obj.sub = () => [this.Section()];
                return obj;
            })(new this.$.$mol_row());
        }
        Section() {
            return ((obj) => {
                obj.head = () => ["Section header"];
                obj.Content = () => this.Section_content();
                return obj;
            })(new this.$.$mol_section());
        }
        Section_content() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_filler());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_section_demo.prototype, "Text", null);
    __decorate([
        $.$mol_mem
    ], $mol_section_demo.prototype, "Section", null);
    __decorate([
        $.$mol_mem
    ], $mol_section_demo.prototype, "Section_content", null);
    $.$mol_section_demo = $mol_section_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_colors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
    };
})($ || ($ = {}));
//colors.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/select/demo/colors/colors.view.css", "[mol_select_demo_colors_color_option] {\n\tflex-wrap: nowrap;\n\tjustify-content: flex-start;\n\tpadding: 0 1rem 0 0;\n\tbox-shadow: none;\n\talign-items: center;\n\tmin-height: 2.5rem;\n}\n\n[mol_select_demo_colors_color_preview] {\n\tborder-radius: var(--mol_skin_round);\n\ttext-align: start;\n\tmargin: 0 .5rem 0 0;\n\tpadding: .25rem;\n\talign-self: stretch;\n}\n");
})($ || ($ = {}));
//colors.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_select_demo_colors extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_select_demo_colors_title");
        }
        sub() {
            return [this.Color()];
        }
        Color() {
            return ((obj) => {
                obj.value = (val) => this.color(val);
                obj.dictionary = () => this.colors();
                obj.option_label = (id) => this.color_name(id);
                obj.option_content = (id) => this.option_content(id);
                return obj;
            })(new this.$.$mol_select());
        }
        color(val, force) {
            return (val !== void 0) ? val : "";
        }
        colors() {
            return ({});
        }
        color_name(id) {
            return "";
        }
        option_content(id) {
            return [this.Color_option(id)];
        }
        Color_option(id) {
            return ((obj) => {
                obj.sub = () => [this.Color_preview(id), this.color_name(id)];
                obj.minimal_height = () => 40;
                return obj;
            })(new this.$.$mol_row());
        }
        Color_preview(id) {
            return ((obj) => {
                obj.color = () => this.option_color(id);
                return obj;
            })(new this.$.$mol_select_colors_color_preview());
        }
        option_color(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_colors.prototype, "Color", null);
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_colors.prototype, "color", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_select_demo_colors.prototype, "Color_option", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_select_demo_colors.prototype, "Color_preview", null);
    $.$mol_select_demo_colors = $mol_select_demo_colors;
})($ || ($ = {}));
(function ($) {
    class $mol_select_colors_color_preview extends $.$mol_view {
        style() {
            return (Object.assign(Object.assign({}, super.style()), { "background": this.color() }));
        }
        color() {
            return "";
        }
    }
    $.$mol_select_colors_color_preview = $mol_select_colors_color_preview;
})($ || ($ = {}));
//colors.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_select_demo_colors extends $.$mol_select_demo_colors {
            color_name(id) {
                return id;
            }
            option_color(id) {
                return this.colors()[id];
            }
            colors() {
                return Object.assign({ '': 'transparent' }, $.$mol_colors);
            }
        }
        $$.$mol_select_demo_colors = $mol_select_demo_colors;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//colors.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_select_demo_month extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_select_demo_month_title");
        }
        sub() {
            return [this.Month()];
        }
        Month() {
            return ((obj) => {
                obj.no_options_message = () => "Not found";
                obj.value = (val) => this.month(val);
                obj.dictionary = () => this.months();
                return obj;
            })(new this.$.$mol_select());
        }
        month(val, force) {
            return (val !== void 0) ? val : "jan";
        }
        months() {
            return ({
                "jan": "January",
                "feb": "February",
                "mar": "March",
                "apr": "April",
                "may": "May",
                "jun": "June",
                "jul": "July",
                "aug": "August",
                "sep": "September",
                "oct": "October",
                "nov": "November",
                "dec": "December",
            });
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_month.prototype, "Month", null);
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_month.prototype, "month", null);
    $.$mol_select_demo_month = $mol_select_demo_month;
})($ || ($ = {}));
//month.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_select_demo_priority extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_select_demo_priority_title");
        }
        sub() {
            return [this.Priority()];
        }
        Priority() {
            return ((obj) => {
                obj.Filter = () => null;
                obj.value = (val) => this.priority(val);
                obj.options = () => ["Highest ", "High", "Medium", "Low", "Lowest"];
                return obj;
            })(new this.$.$mol_select());
        }
        priority(val, force) {
            return (val !== void 0) ? val : "Lowest";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_priority.prototype, "Priority", null);
    __decorate([
        $.$mol_mem
    ], $mol_select_demo_priority.prototype, "priority", null);
    $.$mol_select_demo_priority = $mol_select_demo_priority;
})($ || ($ = {}));
//priority.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -.75em;\n\tmin-height: 1em;\n\tmin-width: .5em;\n\tvertical-align: sub;\n\tpadding: .25em .5em;\n\tposition: absolute;\n\tz-index: 2;\n    text-align: center;\n    line-height: 1;\n    display: inline-block;\n\ttext-shadow: 1px 1px 0 black;\n}\n");
})($ || ($ = {}));
//speck.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_speck extends $.$mol_view {
        attr() {
            return ({
                "mol_theme": "$mol_theme_accent",
            });
        }
        sub() {
            return [this.value()];
        }
        value() {
            return null;
        }
    }
    $.$mol_speck = $mol_speck;
})($ || ($ = {}));
//speck.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_settings extends $.$mol_icon {
        path() {
            return "M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
        }
    }
    $.$mol_icon_settings = $mol_icon_settings;
})($ || ($ = {}));
//settings.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_menu extends $.$mol_icon {
        path() {
            return "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
        }
    }
    $.$mol_icon_menu = $mol_icon_menu;
})($ || ($ = {}));
//menu.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_speck_demo extends $.$mol_demo_small {
        sub() {
            return [this.Link(), this.String(), this.Button(), this.Card()];
        }
        Link() {
            return ((obj) => {
                obj.sub = () => [this.Link_speck(), this.Link_icon()];
                return obj;
            })(new this.$.$mol_link());
        }
        Link_speck() {
            return ((obj) => {
                obj.value = () => "β";
                return obj;
            })(new this.$.$mol_speck());
        }
        Link_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_settings());
        }
        String() {
            return ((obj) => {
                obj.sub = () => [this.String_speck(), this.String_field()];
                return obj;
            })(new this.$.$mol_view());
        }
        String_speck() {
            return ((obj) => {
                obj.value = () => this.string_speck();
                return obj;
            })(new this.$.$mol_speck());
        }
        string_speck() {
            return this.$.$mol_locale.text("$mol_speck_demo_string_speck");
        }
        String_field() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_string());
        }
        Button() {
            return ((obj) => {
                obj.sub = () => [this.Button_speck(), this.Button_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        Button_speck() {
            return ((obj) => {
                obj.value = () => this.notification_count();
                return obj;
            })(new this.$.$mol_speck());
        }
        notification_count() {
            return 8;
        }
        Button_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_menu());
        }
        Card() {
            return ((obj) => {
                obj.content = () => [this.Card_speck()];
                obj.status = () => this.card_status();
                return obj;
            })(new this.$.$mol_card());
        }
        Card_speck() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_speck());
        }
        card_status() {
            return this.$.$mol_locale.text("$mol_speck_demo_card_status");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Link", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Link_speck", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Link_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "String", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "String_speck", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "String_field", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Button_speck", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Button_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Card", null);
    __decorate([
        $.$mol_mem
    ], $mol_speck_demo.prototype, "Card_speck", null);
    $.$mol_speck_demo = $mol_speck_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    console.warn('$mol_atom_wait is deprecated. Use $mol_fiber_sync instead.');
    class $mol_atom_wait extends Promise {
        constructor(message = 'Wait...') {
            super(() => { });
            this.message = message;
        }
    }
    $.$mol_atom_wait = $mol_atom_wait;
    $mol_atom_wait.prototype.constructor = Promise;
})($ || ($ = {}));
//wait.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_speech extends $.$mol_plugin {
        static speaker(next, force) {
            const API = window.speechSynthesis;
            if (API.getVoices().length)
                return API;
            const on_voices = (event) => {
                if (!API.getVoices().length)
                    return;
                this.speaker(API, $.$mol_mem_force_cache);
                API.removeEventListener('voiceschanged', on_voices);
            };
            API.addEventListener('voiceschanged', on_voices);
            throw new $.$mol_atom_wait('Waiting for voice..');
        }
        static voices() {
            const lang = this.$.$mol_locale.lang();
            return this.speaker().getVoices().filter(voice => voice.lang.split('-')[0] === lang);
        }
        static say(text) {
            const speaker = this.speaker();
            speaker.cancel();
            speaker.resume();
            const rate = 1;
            const voice = this.voices()[this.voices().length - 1];
            const pitch = 1;
            var utter = new SpeechSynthesisUtterance(text);
            utter.voice = voice;
            utter.rate = rate;
            utter.pitch = pitch;
            speaker.speak(utter);
            return null;
        }
        static speaking(next = true) {
            if (next)
                this.speaker().resume();
            else
                this.speaker().pause();
            return next;
        }
        static hearer() {
            const API = window['SpeechRecognition'] || window['webkitSpeechRecognition'] || window['mozSpeechRecognition'] || window['msSpeechRecognition'];
            const api = new API;
            api.interimResults = true;
            api.maxAlternatives = 1;
            api.continuous = true;
            api.lang = $.$mol_locale.lang();
            api.onnomatch = $.$mol_fiber_root((event) => {
                this.event_result(null);
                return null;
            });
            api.onresult = $.$mol_fiber_root((event) => {
                this.event_result(event);
                return null;
            });
            api.onerror = $.$mol_fiber_root((event) => {
                console.error(new Error(event.error));
                this.event_result(null);
                return null;
            });
            api.onend = (event) => {
                if (this.hearing())
                    api.start();
            };
            return api;
        }
        static hearing(next) {
            if (next === undefined)
                return false;
            if (next) {
                this.hearer().start();
            }
            else {
                this.hearer().stop();
            }
            return next;
        }
        static event_result(event) {
            this.hearer();
            return event || null;
        }
        static recognitions() {
            const result = this.event_result();
            if (!result)
                return [];
            const results = this.event_result().results;
            return [].slice.call(this.event_result().results);
        }
        static commands() {
            return this.recognitions().map(result => result[0].transcript.toLowerCase().trim().replace(/[,\.]/g, ''));
        }
        static text() {
            return this.recognitions().map(result => result[0].transcript).join('');
        }
        commands_skip(next = 0) {
            $mol_speech.hearing();
            return next;
        }
        render() {
            const matchers = this.matchers();
            const commands = $mol_speech.commands();
            for (let i = this.commands_skip(); i < commands.length; ++i) {
                for (let matcher of matchers) {
                    const found = commands[i].match(matcher);
                    if (!found)
                        continue;
                    new $.$mol_defer(() => {
                        this.commands_skip(i + 1);
                        this.event_catch(found.slice(1));
                    });
                    return null;
                }
            }
            return null;
        }
        event_catch(found) {
            console.log(found);
        }
        patterns() {
            return [];
        }
        matchers() {
            return this.patterns().map(pattern => {
                return new RegExp(this.prefix() + pattern + this.suffix(), 'i');
            });
        }
        prefix() {
            return '';
        }
        suffix() {
            return '[,\\s]+(?:please|would you kindly|пожалуйста|пожалуй 100|будь любезен|будь любезна|будь добра?)\.?$';
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_speech.prototype, "commands_skip", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech.prototype, "render", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech.prototype, "matchers", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "speaker", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "voices", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_speech, "say", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "speaking", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "hearer", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "hearing", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "event_result", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "recognitions", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "commands", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech, "text", null);
    $.$mol_speech = $mol_speech;
})($ || ($ = {}));
//speech.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_speech_demo extends $.$mol_demo_small {
        sub() {
            return [this.Toggle(), this.Message(), this.Speak()];
        }
        Toggle() {
            return ((obj) => {
                obj.Icon = () => this.Toggle_icon();
                obj.checked = (val) => this.hearing(val);
                return obj;
            })(new this.$.$mol_check_icon());
        }
        Toggle_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_microphone());
        }
        hearing(val, force) {
            return (val !== void 0) ? val : false;
        }
        Message() {
            return ((obj) => {
                obj.sub = () => [this.message()];
                return obj;
            })(new this.$.$mol_view());
        }
        message() {
            return "";
        }
        Speak() {
            return ((obj) => {
                obj.click = (val) => this.speak(val);
                obj.sub = () => ["Speak"];
                return obj;
            })(new this.$.$mol_button_major());
        }
        speak(val, force) {
            return (val !== void 0) ? val : false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "Toggle", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "Toggle_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "hearing", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "Message", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "Speak", null);
    __decorate([
        $.$mol_mem
    ], $mol_speech_demo.prototype, "speak", null);
    $.$mol_speech_demo = $mol_speech_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_speech_demo extends $.$mol_speech_demo {
            hearing(next) {
                return $.$mol_speech.hearing(next);
            }
            message() {
                let text = $.$mol_speech.text()
                    .replace(/ё/g, 'е')
                    .replace(/^.*? сотри все (пожалуйста|приз|please)\s*/, '')
                    .replace(/\s*точка/g, '.')
                    .replace(/\s*запятая/g, ',')
                    .replace(/\s*восклицательный знак/g, '!')
                    .replace(/\s*вопросительный знак/g, '?')
                    .replace(/\s*точка с запятой/g, ';')
                    .replace(/\s*двоеточие/g, ':')
                    .replace(/\s*тире/g, ' -')
                    .replace(/\s*новая строка/g, ' \n');
                while (true) {
                    let text2 = text
                        .replace(/\s+?\S+ сотри слово (пожалуйста|плиз|please)/, '')
                        .replace(/^(.*?) сотри (\d+) (слово|слова|слов) (пожалуйста|плиз|please)/, (str, text, count) => text.replace(new RegExp(`(\\s\\S+){${count}}$`), ''));
                    if (text === text2)
                        break;
                    text = text2;
                }
                return text
                    .replace(/цитата (.*?) конец цитаты/g, ' "$1"')
                    .replace(/(?:^|[.!?]\s)\S/g, str => str.toUpperCase());
            }
            speak() {
                $.$mol_speech.say(this.message());
            }
        }
        $$.$mol_speech_demo = $mol_speech_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/string/demo/demo.view.css", "[mol_string_demo]>* {\n\tmargin: .5rem\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_string_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_string_demo_title");
        }
        sub() {
            return [this.Simple(), this.Hint(), this.Filled(), this.Disabled()];
        }
        Simple() {
            return ((obj) => {
                obj.value = (val) => this.name(val);
                return obj;
            })(new this.$.$mol_string());
        }
        name(val, force) {
            return (val !== void 0) ? val : "";
        }
        Hint() {
            return ((obj) => {
                obj.hint = () => "Batman";
                obj.value = (val) => this.name(val);
                return obj;
            })(new this.$.$mol_string());
        }
        Filled() {
            return ((obj) => {
                obj.value = (val) => this.name2(val);
                return obj;
            })(new this.$.$mol_string());
        }
        name2(val, force) {
            return (val !== void 0) ? val : "Jocker";
        }
        Disabled() {
            return ((obj) => {
                obj.disabled = () => true;
                obj.value = (val) => this.name2(val);
                return obj;
            })(new this.$.$mol_string());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "Simple", null);
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "name", null);
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "Hint", null);
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "Filled", null);
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "name2", null);
    __decorate([
        $.$mol_mem
    ], $mol_string_demo.prototype, "Disabled", null);
    $.$mol_string_demo = $mol_string_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_switch_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_switch_demo_title");
        }
        sub() {
            return [this.Enabled(), this.Disabled()];
        }
        Enabled() {
            return ((obj) => {
                obj.value = (val) => this.color(val);
                obj.options = () => ({
                    "red": this.option_red(),
                    "green": this.option_green(),
                    "blue": this.option_blue(),
                });
                return obj;
            })(new this.$.$mol_switch());
        }
        color(val, force) {
            return (val !== void 0) ? val : "red";
        }
        option_red() {
            return this.$.$mol_locale.text("$mol_switch_demo_option_red");
        }
        option_green() {
            return this.$.$mol_locale.text("$mol_switch_demo_option_green");
        }
        option_blue() {
            return this.$.$mol_locale.text("$mol_switch_demo_option_blue");
        }
        Disabled() {
            return ((obj) => {
                obj.value = (val) => this.color(val);
                obj.enabled = () => false;
                obj.options = () => ({
                    "red": this.option_red(),
                    "green": this.option_green(),
                    "blue": this.option_blue(),
                });
                return obj;
            })(new this.$.$mol_switch());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_switch_demo.prototype, "Enabled", null);
    __decorate([
        $.$mol_mem
    ], $mol_switch_demo.prototype, "color", null);
    __decorate([
        $.$mol_mem
    ], $mol_switch_demo.prototype, "Disabled", null);
    $.$mol_switch_demo = $mol_switch_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_text_demo extends $.$mol_demo_large {
        title() {
            return this.$.$mol_locale.text("$mol_text_demo_title");
        }
        sub() {
            return [this.Scroll()];
        }
        Scroll() {
            return ((obj) => {
                obj.sub = () => [this.Text()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        Text() {
            return ((obj) => {
                obj.text = () => "# [Benchmarks](app/bench)\n## Benchmark 1\n### Benchmark 1.1\n#### Benchmark 1.1.1\n##### Benchmark 1.1.1.1\n\n* [$mol_app_bench_list](app/bench/list) - Frameworks comparison ([online](http://eigenmethod.github.io/mol/app/bench/#becnh=list#sort=fill#))\n* [ToDoMVC benchmark](https://github.com/eigenmethod/todomvc/tree/master/benchmark) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=http:%2F%2Feigenmethod.github.io%2Ftodomvc%2Fbenchmark%2F#sample=angular2%7Eangularjs%7Eknockoutjs%7Emol%7Epolymer%7Ereact-alt%7Evanillajs%7Evue#sort=fill#))\n* [WebPageTest - Loading progress of ToDOMVC applications on some frameworks](https://www.webpagetest.org/video/compare.php?tests=161217_V8_6RFK%2C161217_G9_6RFM%2C161217_YZ_6RFN%2C161217_DM_6RFP%2C161217_2B_6RFQ%2C161217_RJ_6RFR%2C161217_2R_6RFS%2C161217_H5_6RFT%2C161217_CW_6RFV&thumbSize=150&ival=100&end=all)\n* [Line charts comparison](app/bench/chart/rope) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=chart%2Frope%2F/sort=fill/sample=hcharts~mol))\n* [Bar charts comparison](app/bench/chart/bar) ([online](http://eigenmethod.github.io/mol/app/bench/#bench=chart%2Fbar%2F/sort=fill/sample=hcharts~mol))\n\n# Quick start\n\n**Create MAM project**\n\nEasy way is checkout [this preconfigured ~~PMS~~MAM repository](http://github.com/eigenmethod/mam/) and start dev server:\n\n```sh\ngit clone https://github.com/eigenmethod/mam.git ./mam && cd mam\nnpm start\n```\n\n|           | **Column 1** | **Column 2** | **Column 3**\n|-----------|--------------|--------------|---------\n| **Row 1** | Cell 1x1     | Cell 2x1     | Cell 3x1\n| **Row 2** | Cell 1x2     | Cell 2x2     | Cell 3x2\n| **Row 3** | Cell 1x3     | Cell 2x3     | Cell 3x3\n| **Row 4** | Cell 1x4     | Cell 2x4     | Cell 3x4\n| **Row 5** | Cell 1x5     | Cell 2x5     | Cell 3x5\n| **Row 6** | Cell 1x6     | Cell 2x6     | Cell 3x6\n| **Row 7** | Cell 1x7     | Cell 2x7     | Cell 3x7\n| **Row 8** | Cell 1x8     | Cell 2x8     | Cell 3x8\n| **Row 9** | Cell 1x9     | Cell 2x9     | Cell 3x9\n\nBuild status: [![Build Status](https://travis-ci.org/eigenmethod/mol.svg?branch=master)](https://travis-ci.org/eigenmethod/mol)\n";
                return obj;
            })(new this.$.$mol_text());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_text_demo.prototype, "Scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_text_demo.prototype, "Text", null);
    $.$mol_text_demo = $mol_text_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 1 auto;\n\tdisplay: flex;\n\tflex-direction: column;\n\tposition: relative;\n\tfont-family: var(--mol_skin_font_monospace);\n\tz-index: 0;\n}\n\n[mol_textarea_view] {\n\tmax-width: none;\n\tpadding: 0 .5rem;\n\tpointer-events: none;\n\twhite-space: pre-wrap;\n\tz-index: 1;\n\tbox-shadow: none;\n}\n\n[mol_textarea_edit] {\n\tz-index: -1 !important;\n\tpadding: .5rem 1rem;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tcolor: transparent;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\twhite-space: pre-wrap;\n\ttab-size: 4;\n}\n\n[mol_textarea_edit][mol_textarea_edit] {\n\t/* background: none; */\n}\n");
})($ || ($ = {}));
//textarea.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_textarea extends $.$mol_view {
        event() {
            return ({
                "keydown": (event) => this.press(event),
            });
        }
        press(event, force) {
            return (event !== void 0) ? event : null;
        }
        sub() {
            return [this.Edit(), this.View()];
        }
        Edit() {
            return ((obj) => {
                obj.dom_name = () => "textarea";
                obj.value = (val) => this.value(val);
                obj.hint = () => this.hint();
                obj.debounce = () => 0;
                obj.enabled = () => this.enabled();
                return obj;
            })(new this.$.$mol_string());
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return "";
        }
        enabled() {
            return true;
        }
        View() {
            return ((obj) => {
                obj.text = () => this.text();
                return obj;
            })(new this.$.$mol_text());
        }
        text() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_textarea.prototype, "press", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea.prototype, "Edit", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea.prototype, "View", null);
    $.$mol_textarea = $mol_textarea;
})($ || ($ = {}));
//textarea.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_textarea extends $.$mol_textarea {
            text() {
                return this.value().replace(/^/mg, '\t');
            }
            indent_inc() {
                const el = this.Edit().dom_node();
                const pos = el.selectionStart;
                let text = this.value();
                text = text.substring(0, pos) + '\t' + text.substring(el.selectionEnd);
                this.value(text);
                el.value = text;
                el.selectionStart = el.selectionEnd = pos + 1;
            }
            indent_dec() {
            }
            press(event) {
                switch (event.keyCode) {
                    case $.$mol_keyboard_code.tab:
                        this.indent_inc();
                        break;
                    case event.shiftKey && $.$mol_keyboard_code.tab:
                        this.indent_dec();
                        break;
                    default: return;
                }
                event.preventDefault();
            }
        }
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//textarea.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/textarea/demo/demo.view.css", "[mol_textarea_demo] {\n\talign-self: stretch;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_textarea_demo extends $.$mol_demo_small {
        title() {
            return this.$.$mol_locale.text("$mol_textarea_demo_title");
        }
        sub() {
            return [this.Empty_descr(), this.Filled_descr(), this.Disabled()];
        }
        Empty_descr() {
            return ((obj) => {
                obj.hint = () => "source code";
                obj.value = (val) => this.empty_descr(val);
                return obj;
            })(new this.$.$mol_textarea());
        }
        empty_descr(val, force) {
            return (val !== void 0) ? val : "";
        }
        Filled_descr() {
            return ((obj) => {
                obj.value = (val) => this.filled_descr(val);
                return obj;
            })(new this.$.$mol_textarea());
        }
        filled_descr(val, force) {
            return (val !== void 0) ? val : "function hello( name = 'World' ) {\n\treturn `Hello, ${ name }!`\n}";
        }
        Disabled() {
            return ((obj) => {
                obj.enabled = () => false;
                obj.value = (val) => this.filled_descr(val);
                return obj;
            })(new this.$.$mol_textarea());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_textarea_demo.prototype, "Empty_descr", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea_demo.prototype, "empty_descr", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea_demo.prototype, "Filled_descr", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea_demo.prototype, "filled_descr", null);
    __decorate([
        $.$mol_mem
    ], $mol_textarea_demo.prototype, "Disabled", null);
    $.$mol_textarea_demo = $mol_textarea_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/app/demo/main/main.view.css", "[mol_app_demo_main_description] {\n\tmargin: auto;\n\tbox-shadow: none;\n}\n");
})($ || ($ = {}));
//main.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo_main extends $.$mol_page {
        minimal_width() {
            return 400;
        }
        title() {
            return "$mol libs for web ui";
        }
        project_uri() {
            return "https://github.com/eigenmethod/mol/";
        }
        tools() {
            return [this.Project()];
        }
        Project() {
            return ((obj) => {
                obj.uri = () => this.project_uri();
                obj.title = () => "";
                return obj;
            })(new this.$.$mol_link_iconed());
        }
        body() {
            return [this.Description()];
        }
        Description() {
            return ((obj) => {
                obj.text = () => this.description();
                obj.uri_base = () => this.project_uri();
                return obj;
            })(new this.$.$mol_text());
        }
        description() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_main.prototype, "Project", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_main.prototype, "Description", null);
    $.$mol_app_demo_main = $mol_app_demo_main;
})($ || ($ = {}));
//main.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo_main extends $.$mol_app_demo_main {
            description() {
                return $.$mol_file.relative('mol/readme.md').content();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_app_demo_main.prototype, "description", null);
        $$.$mol_app_demo_main = $mol_app_demo_main;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//main.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_source extends $.$mol_icon {
        path() {
            return "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z";
        }
    }
    $.$mol_icon_source = $mol_icon_source;
})($ || ($ = {}));
//source.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_typeof(value) {
        var str = {}.toString.apply(value);
        var type = str.substring(8, str.length - 1);
        return type;
    }
    $.$mol_typeof = $mol_typeof;
})($ || ($ = {}));
//typeof.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_tree {
        constructor(config = {}) {
            this.type = config.type || '';
            if (config.value !== undefined) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = [...sub, ...(config.sub || [])];
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
        }
        static values(str, baseUri) {
            return str.split('\n').map((data, index) => new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1
            }));
        }
        clone(config = {}) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                value: config.value
            });
        }
        make(config) {
            return new $mol_tree(Object.assign({ baseUri: this.baseUri, row: this.row, col: this.col }, config));
        }
        static fromString(str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var prefix = str.replace(/^\n?(\t*)[\s\S]*/, '$1');
            var lines = str.replace(new RegExp('^\\t{0,' + prefix.length + '}', 'mg'), '').split('\n');
            lines.forEach(line => {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    throw new Error(`Syntax error at ${baseUri}:${row}\n${line}`);
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    throw new Error(`Too many tabs at ${baseUri}:${row}\n${line}`);
                stack.length = deep + 1;
                var parent = stack[deep];
                let col = deep;
                types.forEach(type => {
                    if (!type)
                        throw new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`);
                    var next = new $mol_tree({ type, baseUri, row, col });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                    col += type.length + 1;
                });
                if (data) {
                    var next = new $mol_tree({ data: data.substring(1), baseUri, row, col });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        }
        static fromJSON(json, baseUri = '') {
            var type = $.$mol_typeof(json);
            switch (type) {
                case 'Boolean':
                case 'Null':
                case 'Number':
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case 'String':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case 'Array':
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                    });
                case 'Date':
                    return new $mol_tree({
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                case 'Object':
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        const subsub = $mol_tree.fromJSON(json[key], baseUri);
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
                default: return $.$mol_fail(new Error(`Unsupported type (${type}) at ${baseUri}`));
            }
        }
        get uri() {
            return this.baseUri + '#' + this.row + ':' + this.col;
        }
        toString(prefix = '') {
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type;
                if (this.sub.length == 1) {
                    return output + ' ' + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var child of this.sub) {
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        }
        toJSON() {
            if (!this.type)
                return this.value;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === '*') {
                var obj = {};
                for (var child of this.sub) {
                    if (child.type === '-')
                        continue;
                    var key = child.type || child.clone({ sub: child.sub.slice(0, child.sub.length - 1) }).value;
                    var val = child.sub[child.sub.length - 1].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === '/') {
                var res = [];
                this.sub.forEach(child => {
                    if (child.type === '-')
                        return;
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            if (String(Number(this.type)) == this.type.trim())
                return Number(this.type);
            throw new Error(`Unknown type (${this.type}) at ${this.uri}`);
        }
        get value() {
            var values = [];
            for (var child of this.sub) {
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.sub.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                });
                if (!replaced)
                    sub.push(new $mol_tree({ type }).insert(value, ...path.slice(1)));
                return this.clone({ sub });
            }
            else if (typeof type === 'number') {
                const sub = this.sub.slice();
                sub[type] = (sub[type] || new $mol_tree).insert(value, ...path.slice(1));
                return this.clone({ sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(item => item.insert(value, ...path.slice(1))) });
            }
        }
        select(...path) {
            var next = [this];
            for (var type of path) {
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.sub) {
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push(...item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        }
        filter(path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select(...path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(child => child.value == value);
                }
            });
            return new $mol_tree({ sub: sub });
        }
        transform(visit, stack = []) {
            const sub_stack = [this, ...stack];
            return visit(sub_stack, () => this.sub.map(node => node.transform(visit, sub_stack)).filter(n => n));
        }
        hack(context) {
            const sub = [].concat(...this.sub.map(child => {
                const handle = context[child.type] || context[''];
                if (!handle)
                    $.$mol_fail(child.error('Handler not defined'));
                return handle(child, context);
            }));
            return this.clone({ sub });
        }
        error(message) {
            return new Error(`${message}:\n${this} ${this.baseUri}:${this.row}:${this.col}`);
        }
    }
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(([node], sub) => (node.type === '-') ? null : node.clone({ sub: sub() }));
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        const props = {};
        const catch_prop = (prop, type = '') => {
            let def = prop;
            if (type === '=>') {
                if (prop.sub[0])
                    throw prop.error('Right binding can not have default value');
            }
            else {
                if (prop.sub.length === 0)
                    return;
                if (prop.sub[0].type === '-')
                    return;
                props[prop.type] = props[prop.type];
                def = prop.clone({
                    sub: [prop.sub[0].transform(([node, ...stack], sub) => {
                            if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                                return node.clone({ sub: sub() });
                            catch_prop(node.sub[0], node.type);
                            return node.clone({
                                sub: [node.sub[0].clone({
                                        sub: []
                                    })]
                            });
                        })]
                });
            }
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value' + props[prop.type].error('').message + '\n---');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(sub => catch_prop(sub));
        return def.clone({
            type: '',
            sub: Object.keys(props).map(name => props[name]),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error(`Wrong sub count (${prop.sub.length})`);
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        switch (val.type[0]) {
            case '/': return 'list';
            case '$': return 'object';
        }
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        var content = '';
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            var parent = def.sub[0];
            var propDefs = {};
            var members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needReturn = true;
                    var needCache = false;
                    var keys = [];
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    const getValue = (value, definition) => {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return JSON.stringify(value.value);
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return `this.$.$mol_locale.text( ${JSON.stringify(key)} )`;
                                case (value.type === '-'):
                                    return null;
                                case (value.type[0] === '/'):
                                    const item_type = value.type.substring(1);
                                    var items = [];
                                    value.sub.forEach(item => {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push(`...super.${param.type}()`);
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val);
                                    });
                                    return `[ ${items.join(' , ')} ]` + (item_type ? ` as readonly ( ${item_type} )[]` : ` as readonly any[]`);
                                case (value.type[0] === '$'):
                                    if (!definition)
                                        throw value.error('Objects should be bound');
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(over => {
                                        if (/^[-\/]?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                const [, own_name, own_key, own_next] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.sub[0].sub[0].type);
                                                let own_args = [];
                                                if (own_key)
                                                    own_args.push(` ${own_key} : any `);
                                                if (own_next)
                                                    own_args.push(` ${own_next}? : any `);
                                                let [, their_name, ...their_args] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                                their_args = their_args.filter(Boolean);
                                                members[own_name] = `\t${own_name}(${own_args.join(',')}) {\n\t\treturn this.${param.type}().${their_name}( ${their_args.join(' , ')} )\n\t}\n\n`;
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                        needSet = ns;
                                    });
                                    const object_args = value.select('/', '').sub.map(arg => getValue(arg)).join(' , ');
                                    return '(( obj )=>{\n' + overs.join('') + '\t\t\treturn obj\n\t\t})( new this.$.' + value.type + '( ' + object_args + ' ) )';
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(opt => {
                                        if (opt.type === '-')
                                            return '';
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            return;
                                        }
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        keys.push(key[1]);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push('\t\t\t"' + key[1] + '" : ' + arg + ' ' + v + ' ,\n');
                                        needSet = ns;
                                    });
                                    return '({\n' + opts.join('') + '\t\t})';
                                case (value.type === '<=>'):
                                    needSet = true;
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )';
                                    }
                                    break;
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')';
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return value.type;
                                case 'null':
                                    return 'null as any';
                            }
                            if (Number(value.type).toString() == value.type)
                                return value.type;
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${value}`;
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(child => {
                        var val = getValue(child, true);
                        if (!val)
                            return;
                        propDefs[propName[1]] = param;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_mem_force `);
                        if (needSet && param.sub[0].type !== '<=>')
                            val = (needReturn ? `( ${propName[3]} !== void 0 ) ? ${propName[3]} : ` : `if( ${propName[3]} !== void 0 ) return ${propName[3]}\n\t\t`) + val;
                        if (needReturn)
                            val = 'return ' + val;
                        var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                        if (needCache) {
                            if (propName[2])
                                decl = '\t@ $' + 'mol_mem_key\n' + decl;
                            else
                                decl = '\t@ $' + 'mol_mem\n' + decl;
                        }
                        decl = '\t/**\n\t *  ```\n' + param.toString().trim().replace(/^/mg, '\t *  ') + '\n\t *  ```\n\t **/\n' + decl;
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${param}`;
                    throw err;
                }
            }
            var body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return null as any }\n\t}\n';
            }).join('');
            var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        }
        return { script: content, locales: locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/app/studio/field/field.view.css", "[mol_app_studio_field] {\n\tflex: 1 1 100%;\n}\n\n[mol_app_studio_field_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\n[mol_app_studio_field_tools] {\n\tdisplay: flex;\n}\n\n[mol_app_studio_field_label_icon] {\n\tmargin: .75rem 0;\n}\n\n[mol_app_studio_field_content] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\n[mol_app_studio_field_title] {\n\tflex: 0 1 auto;\n}\n\n[mol_app_studio_field_title_type=\"null\"] ,\n[mol_app_studio_field_title_type=\"bool\"]  ,\n[mol_app_studio_field_title_type=\"number\"] ,\n[mol_app_studio_field_title_type=\"locale\"] ,\n[mol_app_studio_field_title_type=\"string\"] {\n\tcolor: hsl( 140 , 60% , 50% );\n}\n\n[mol_app_studio_field_title_type=\"object\"] {\n\tfont-weight: bolder;\n}\n\n[mol_app_studio_field_title_type=\"list\"] ,\n[mol_app_studio_field_title_type=\"dict\"] {\n\tcolor: hsl( 260 , 60% , 50% );\n}\n\n[mol_app_studio_field_title_type=\"get\"] ,\n[mol_app_studio_field_title_type=\"bind\"] {\n\tcolor: hsl( 320 , 60% , 50% );\n}\n\n[mol_app_studio_field_number] {\n\tflex: 1 1 100%;\n\twidth: auto;\n}\n\n[mol_app_studio_field_number_string] {\n\ttext-align: left;\n}\n\n[mol_app_studio_field_string] {\n\tflex: 1 1 100%;\n\twidth: auto;\n}\n\n[mol_app_studio_field_object] {\n\twidth: auto;\n}\n\n[mol_app_studio_field_bool] {\n\tflex: 1 1 100%;\n\twidth: auto;\n}\n\n[mol_app_studio_field_bind] {\n\tflex: 0 1 auto;\n\twidth: auto;\n}\n\n[mol_app_studio_field_list] {\n\tflex: 1 1 100%;\n}\n\n[mol_app_studio_field_list] > * {\n\tmargin: 1rem;\n}\n\n[mol_app_studio_field_list_trigger_icon] ,\n[mol_app_studio_field_overs_trigger_icon] {\n\tmargin: .5rem;\n}\n\n[mol_app_studio_field_dict] ,\n[mol_app_studio_field_overs] {\n\tflex: 1 1 100%;\n}\n\n[mol_app_studio_field_dict] > * ,\n[mol_app_studio_field_overs] > * {\n\tmargin: 1rem;\n}\n\n[mol_app_studio_field_item] {\n}\n\n[mol_app_studio_field_add] {\n\tmargin: 0;\n}\n");
})($ || ($ = {}));
//field.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_app_studio_field extends $.$mol_expander {
        path() {
            return [];
        }
        Trigger() {
            return ((obj) => {
                obj.checked = (val) => this.expanded(val);
                obj.Title = () => this.Trigger_label();
                obj.type = () => this.type();
                return obj;
            })(new this.$.$mol_app_studio_field_title());
        }
        expanded(val, force) {
            return (val !== void 0) ? val : false;
        }
        Trigger_label() {
            return ((obj) => {
                obj.needle = () => this.highlight();
                obj.haystack = () => this.title();
                return obj;
            })(new this.$.$mol_dimmer());
        }
        highlight() {
            return "";
        }
        Tools() {
            return ((obj) => {
                obj.sub = () => this.tools();
                return obj;
            })(new this.$.$mol_view());
        }
        tools() {
            return [this.Type(), this.Object()];
        }
        Type() {
            return ((obj) => {
                obj.value = (val) => this.type(val);
                obj.hint = () => this.type_hint();
                obj.Trigger_icon = () => null;
                obj.dictionary = () => this.types();
                return obj;
            })(new this.$.$mol_select());
        }
        type(val, force) {
            return (val !== void 0) ? val : "null";
        }
        type_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_type_hint");
        }
        types() {
            return ({
                "get": "<=",
                "bind": "<=>",
                "object": "Object",
                "string": "Text",
                "locale": "Localization",
                "number": "Number",
                "bool": "Flag",
                "list": "List",
                "dict": "Dictionary",
                "null": "None",
            });
        }
        Object() {
            return ((obj) => {
                obj.value = (val) => this.class(val);
                obj.options = () => this.object_options();
                obj.hint = () => this.object_hint();
                obj.Trigger_icon = () => null;
                return obj;
            })(new this.$.$mol_select());
        }
        class(val, force) {
            return (val !== void 0) ? val : null;
        }
        object_options() {
            return [];
        }
        object_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_object_hint");
        }
        content() {
            return [this.Bool(), this.Number(), this.String(), this.Bind(), this.List(), this.Dict(), this.Overs()];
        }
        Bool() {
            return ((obj) => {
                obj.value = (val) => this.value_bool(val);
                obj.options = () => ({
                    "true": "True",
                    "false": "False",
                });
                return obj;
            })(new this.$.$mol_switch());
        }
        value_bool(val, force) {
            return (val !== void 0) ? val : null;
        }
        Number() {
            return ((obj) => {
                obj.value = (val) => this.value_number(val);
                obj.hint = () => this.hint();
                return obj;
            })(new this.$.$mol_number());
        }
        value_number(val, force) {
            return (val !== void 0) ? val : NaN;
        }
        hint() {
            return "";
        }
        String() {
            return ((obj) => {
                obj.value = (val) => this.value_string(val);
                obj.hint = () => this.hint();
                return obj;
            })(new this.$.$mol_textarea());
        }
        value_string(val, force) {
            return (val !== void 0) ? val : null;
        }
        Bind() {
            return ((obj) => {
                obj.value = (val) => this.bind(val);
                obj.options = () => this.bind_options();
                obj.hint = () => this.bind_hint();
                obj.No_options = () => this.Prop_add();
                obj.Trigger_icon = () => null;
                return obj;
            })(new this.$.$mol_select());
        }
        bind(val, force) {
            return (val !== void 0) ? val : null;
        }
        bind_options() {
            return [];
        }
        bind_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_bind_hint");
        }
        Prop_add() {
            return ((obj) => {
                obj.title = () => this.prop_add_label();
                obj.event_click = (val) => this.event_prop_add(val);
                return obj;
            })(new this.$.$mol_button_minor());
        }
        prop_add_label() {
            return this.$.$mol_locale.text("$mol_app_studio_field_prop_add_label");
        }
        event_prop_add(val, force) {
            return (val !== void 0) ? val : null;
        }
        List() {
            return ((obj) => {
                obj.rows = () => this.list_rows();
                return obj;
            })(new this.$.$mol_list());
        }
        list_rows() {
            return [];
        }
        Dict() {
            return ((obj) => {
                obj.rows = () => this.pairs();
                return obj;
            })(new this.$.$mol_list());
        }
        pairs() {
            return [];
        }
        Overs() {
            return ((obj) => {
                obj.rows = () => this.overs();
                return obj;
            })(new this.$.$mol_list());
        }
        overs() {
            return [];
        }
        Add() {
            return ((obj) => {
                obj.hint = () => this.add_hint();
                obj.value = (val) => this.add_item(val);
                obj.dictionary = () => this.item_types();
                obj.Trigger_icon = () => this.List_trigger_icon();
                return obj;
            })(new this.$.$mol_select());
        }
        add_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_add_hint");
        }
        add_item(val, force) {
            return (val !== void 0) ? val : "";
        }
        item_types() {
            return ({
                "get": "<=",
                "string": "Text",
                "number": "Number",
                "bool": "Flag",
                "list": "List",
                "dict": "Dictionary",
                "null": "None",
            });
        }
        List_trigger_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_plus());
        }
        Add_pair() {
            return ((obj) => {
                obj.sub = () => [this.Add_pair_key(), this.Add_pair_submit()];
                return obj;
            })(new this.$.$mol_bar());
        }
        Add_pair_key() {
            return ((obj) => {
                obj.hint = () => this.add_pair_hint();
                obj.query = (val) => this.add_pair_key(val);
                obj.suggests = () => this.key_suggests();
                return obj;
            })(new this.$.$mol_search());
        }
        add_pair_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_add_pair_hint");
        }
        add_pair_key(val, force) {
            return (val !== void 0) ? val : "";
        }
        key_suggests() {
            return [];
        }
        Add_pair_submit() {
            return ((obj) => {
                obj.event_click = (val) => this.add_pair(val);
                obj.sub = () => [this.Add_pair_submit_icon()];
                return obj;
            })(new this.$.$mol_button_minor());
        }
        add_pair(val, force) {
            return (val !== void 0) ? val : "";
        }
        Add_pair_submit_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_plus());
        }
        Add_over() {
            return ((obj) => {
                obj.hint = () => this.add_over_hint();
                obj.value = (val) => this.add_over(val);
                obj.Trigger_icon = () => this.Overs_trigger_icon();
                obj.options = () => this.over_options();
                return obj;
            })(new this.$.$mol_select());
        }
        add_over_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_field_add_over_hint");
        }
        add_over(val, force) {
            return (val !== void 0) ? val : "";
        }
        Overs_trigger_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_plus());
        }
        over_options() {
            return [];
        }
        Prop(id) {
            return ((obj) => {
                obj.path = () => this.prop_path(id);
                obj.prop_arg = (id) => this.prop_arg(id);
                obj.prop = (path, val) => this.prop(path, val);
                obj.props = (name, val) => this.props(name, val);
                obj.prop_value = (id) => this.prop_value(id);
                obj.bind_options = () => this.bind_options();
                obj.prop_add = (val) => this.prop_add(val);
                obj.object_options = () => this.object_options();
                return obj;
            })(new this.$.$mol_app_studio_field());
        }
        prop_path(id) {
            return [];
        }
        prop_arg(id) {
            return ({});
        }
        prop(path, val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
        props(name, val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
        prop_value(id) {
            return null;
        }
        prop_add(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Trigger", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "expanded", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Trigger_label", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Tools", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Type", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Object", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "class", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Bool", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "value_bool", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Number", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "value_number", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "String", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "value_string", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Bind", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "bind", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Prop_add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "event_prop_add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "List", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Dict", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Overs", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "add_item", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "List_trigger_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add_pair", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add_pair_key", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "add_pair_key", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add_pair_submit", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "add_pair", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add_pair_submit_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Add_over", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "add_over", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "Overs_trigger_icon", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio_field.prototype, "Prop", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio_field.prototype, "prop", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio_field.prototype, "props", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_field.prototype, "prop_add", null);
    $.$mol_app_studio_field = $mol_app_studio_field;
})($ || ($ = {}));
(function ($) {
    class $mol_app_studio_field_title extends $.$mol_check_expand {
        attr() {
            return (Object.assign(Object.assign({}, super.attr()), { "mol_app_studio_field_title_type": this.type() }));
        }
        type() {
            return "null";
        }
    }
    $.$mol_app_studio_field_title = $mol_app_studio_field_title;
})($ || ($ = {}));
//field.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_studio_field extends $.$mol_app_studio_field {
            prop_current(next) {
                return this.prop(this.path(), next);
            }
            title() {
                const path = this.path().slice();
                if (['/', '*', '<=', '<=>', '@', '', null].indexOf(path[path.length - 1]) >= 0)
                    path.pop();
                return String(path.pop());
            }
            title_arg() {
                return this.prop_arg(this.path());
            }
            value(next) {
                return this.prop_current(next);
            }
            type(next) {
                if (next) {
                    let val;
                    switch (next) {
                        case 'null':
                            val = new $.$mol_tree({ type: 'null' });
                            break;
                        case 'bool':
                            val = new $.$mol_tree({ type: 'false' });
                            break;
                        case 'number':
                            val = new $.$mol_tree({ type: 'NaN' });
                            break;
                        case 'string':
                            val = new $.$mol_tree({});
                            break;
                        case 'locale':
                            val = new $.$mol_tree({ type: '@', sub: [new $.$mol_tree({})] });
                            break;
                        case 'get':
                            val = new $.$mol_tree({ type: '<=', sub: [new $.$mol_tree({ type: '?' })] });
                            break;
                        case 'bind':
                            val = new $.$mol_tree({ type: '<=>', sub: [new $.$mol_tree({ type: '?' })] });
                            break;
                        case 'list':
                            val = new $.$mol_tree({ type: '/' });
                            break;
                        case 'dict':
                            val = new $.$mol_tree({ type: '*' });
                            break;
                        case 'object':
                            val = new $.$mol_tree({ type: '$mol_view' });
                            break;
                        default: throw new Error(`Unsupported type: ${next}`);
                    }
                    this.value(val);
                }
                const val = this.value();
                if (!val || val.type === '-')
                    return;
                return $.$mol_view_tree_value_type(this.value());
            }
            expanded(next = ['bool', 'number', 'string', 'locale'].indexOf(this.type()) >= 0) {
                return next;
            }
            class(next) {
                return this.value(next && new $.$mol_tree({ type: next })).type;
            }
            bind(next) {
                return this.value(next && this.value().clone({ sub: [new $.$mol_tree({ type: next, sub: [new $.$mol_tree({ type: '-' })] })] })).sub[0].type;
            }
            value_bool(next) {
                return this.value(next === undefined ? null : new $.$mol_tree({ type: String(next) })).type;
            }
            value_number(next) {
                return this.value(next === undefined ? null : new $.$mol_tree({ type: String(next) })).type;
            }
            value_string(next) {
                let next2;
                if (next !== undefined) {
                    next2 = new $.$mol_tree({ value: next });
                    if (this.type() === 'locale')
                        next2 = new $.$mol_tree({ type: '@', sub: [next2] });
                }
                return this.value(next2).value;
            }
            pairs() {
                return [...this.value().sub.map(pair => this.Prop([...this.path(), pair.type, null])), this.Add_pair()];
            }
            overs() {
                return [...this.value().sub.map(over => this.Prop([...this.path(), over.type, null])), this.Add_over()];
            }
            hint() {
                return this.prop_value(this.path());
            }
            tools() {
                const type = this.type();
                return [
                    this.Type(),
                    ...(type === 'get') ? [this.Bind()] : [],
                    ...(type === 'bind') ? [this.Bind()] : [],
                    ...(['object'].indexOf(type) >= 0) ? [this.Object()] : [],
                ];
            }
            content() {
                const type = this.type();
                return [
                    ...(type === 'bool') ? [this.Bool()] : [],
                    ...(type === 'number') ? [this.Number()] : [],
                    ...(type === 'string') ? [this.String()] : [],
                    ...(type === 'locale') ? [this.String()] : [],
                    ...(type === 'list') ? [this.List()] : [],
                    ...(type === 'dict') ? [this.Dict()] : [],
                    ...(type === 'object') ? [this.Overs()] : [],
                    ...(['get', 'bind'].indexOf(type) >= 0 && this.bind()) ? [this.Prop([this.Bind().value(), null])] : [],
                ];
            }
            item_value(index, next) {
                return next;
            }
            item_class(index, next) {
                return next;
            }
            list_rows() {
                return [...this.value().sub.map((item, index) => this.Prop([...this.path(), index])), this.Add()];
            }
            prop_path(path) {
                return path;
            }
            add_item(type) {
                if (!type)
                    return null;
                const items = this.value();
                this.value(items.insert(new $.$mol_tree({ type }), items.sub.length));
                return null;
            }
            over_options() {
                return this.props(this.class()).sub.map(item => item.type);
            }
            add_over(name) {
                if (!name)
                    return;
                this.value(this.value().insert(new $.$mol_tree({ type: name }), name));
            }
            add_pair(event) {
                if (!event)
                    return;
                const name = this.add_pair_key();
                this.add_pair_key('');
                this.value(this.value().insert(new $.$mol_tree, name, null));
            }
            event_prop_add(event) {
                const name = this.Bind().filter_pattern();
                this.prop_add(name);
                this.Bind().value(name);
                this.Bind().filter_pattern('');
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_app_studio_field.prototype, "expanded", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio_field.prototype, "item_value", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio_field.prototype, "item_class", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_studio_field.prototype, "list_rows", null);
        $$.$mol_app_studio_field = $mol_app_studio_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//field.view.js.map
;
"use strict";
var $;
(function ($) {
    console.warn('$mol_http is deprecated. Use $mol_fetch instead.');
    class $mol_http extends $.$mol_object {
        static resource(uri) {
            const resolver = $.$mol_dom_context.document.createElement('a');
            resolver.href = uri;
            return this.resource_absolute(resolver.href);
        }
        static resource_absolute(uri) {
            return $mol_http.make({
                uri: $.$mol_const(uri)
            });
        }
        uri() { return ''; }
        method_get() { return 'Get'; }
        method_put() { return 'Put'; }
        credentials() {
            return null;
        }
        headers() {
            return {};
        }
        response_type() {
            return '';
        }
        response(next, force) {
            const creds = this.credentials();
            const method = (next === void 0) ? this.method_get() : this.method_put();
            const uri = this.uri();
            const headers = this.headers();
            return $.$mol_fetch.response(uri, {
                credentials: creds ? 'include' : undefined,
                method,
                headers,
                body: next
            });
        }
        text(next, force) {
            return this.response(next, force).text();
        }
        xml(next, force) {
            return this.response(next, force).xml();
        }
        json(next, force) {
            const next2 = next && JSON.stringify(next, null, '\t');
            return this.response(next2, force).json();
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_http.prototype, "json", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_http, "resource_absolute", null);
    $.$mol_http = $mol_http;
})($ || ($ = {}));
//http.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_http_resource extends $.$mol_http {
        static item(uri) {
            return $.$mol_http.resource(uri);
        }
    }
    __decorate([
        $.$mol_deprecated('Use $mol_http.resource insted.')
    ], $mol_http_resource, "item", null);
    $.$mol_http_resource = $mol_http_resource;
    class $mol_http_resource_json {
        static item(uri) {
            return $.$mol_http.resource(uri);
        }
    }
    __decorate([
        $.$mol_deprecated('Use $mol_http.resource insted.')
    ], $mol_http_resource_json, "item", null);
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/app/studio/studio.view.css", "[mol_app_studio_preview_page] {\n\tflex: 1000 1 400px; \n\tbackground: var(--mol_theme_field);\n}\n\n[mol_app_studio_editor_page] {\n\tflex: 1000 1 400px;\n}\n\n[mol_app_studio_source_page] {\n\tflex: 1000 1 400px;\n}\n\n[mol_app_studio_crumbs] {\n\tflex: 1000 1 auto;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n[mol_app_studio_crumbs] > * {\n\tmargin: 0;\n}\n\n[mol_app_studio_preview_page_head] {\n\tfilter: brightness(90%);\n}\n\n[mol_app_studio_preview_page_body] {\n\tdisplay: flex;\n\talign-items: stretch;\n}\n\n[mol_app_studio_selector] {\n\tpadding: .5rem;\n\tflex: 1 1 auto;\n\talign-items: flex-start;\n}\n\n[mol_app_studio_editor_page_head] {\n\tflex-wrap: nowrap;\n}\n\n[mol_app_studio_fields] {\n\tmin-height: 1rem;\n}\n\n[mol_app_studio_fields] > * {\n\tmargin: 1rem;\n}\n");
})($ || ($ = {}));
//studio.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_app_studio extends $.$mol_book {
        value_overrided(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        tools_main() {
            return [];
        }
        pages() {
            return [this.Preview_page(), this.Editor_page(), this.Source_page()];
        }
        Preview_page() {
            return ((obj) => {
                obj.title = () => this.preview_title();
                obj.tools = () => this.preview_tools();
                obj.body = () => [this.Selector()];
                obj.minimal_width = () => 400;
                return obj;
            })(new this.$.$mol_page());
        }
        preview_title() {
            return this.$.$mol_locale.text("$mol_app_studio_preview_title");
        }
        preview_tools() {
            return [this.Source_link(), this.Edit()];
        }
        Source_link() {
            return ((obj) => {
                obj.hint = () => this.source_title();
                obj.sub = () => [this.Source_icon()];
                obj.arg = () => this.source_arg();
                return obj;
            })(new this.$.$mol_link());
        }
        Source_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_source());
        }
        source_arg() {
            return ({
                "source": "",
                "path": null,
            });
        }
        Edit() {
            return ((obj) => {
                obj.hint = () => this.editor_title();
                obj.sub = () => [this.Edit_icon()];
                obj.arg = () => ({
                    "path": "",
                    "source": null,
                });
                return obj;
            })(new this.$.$mol_link());
        }
        Edit_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_settings());
        }
        Selector() {
            return ((obj) => {
                obj.sub = () => [this.Block()];
                obj.path = (val) => this.path(val);
                return obj;
            })(new this.$.$mol_app_studio_selector());
        }
        Block() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view());
        }
        path(val, force) {
            return (val !== void 0) ? val : [];
        }
        Editor_page() {
            return ((obj) => {
                obj.plugins = () => [this.Speech_filter()];
                obj.title = () => this.editor_title();
                obj.event_top = (val) => this.event_front_up(val);
                obj.tools = () => [this.Editor_close()];
                obj.body = () => [this.Filter_bar(), this.Fields()];
                obj.minimal_width = () => 400;
                return obj;
            })(new this.$.$mol_page());
        }
        Speech_filter() {
            return ((obj) => {
                obj.event_catch = (val) => this.speech_filter(val);
                obj.patterns = () => this.speech_filter_patterns();
                return obj;
            })(new this.$.$mol_speech());
        }
        speech_filter(val, force) {
            return (val !== void 0) ? val : null;
        }
        speech_filter_patterns() {
            return ["find (.+?)"];
        }
        editor_title() {
            return this.$.$mol_locale.text("$mol_app_studio_editor_title");
        }
        Editor_close() {
            return ((obj) => {
                obj.sub = () => [this.Editor_close_icon()];
                obj.arg = () => this.editor_close_arg();
                return obj;
            })(new this.$.$mol_link());
        }
        Editor_close_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_cross());
        }
        editor_close_arg() {
            return ({
                "path": null,
            });
        }
        Filter_bar() {
            return ((obj) => {
                obj.sub = () => this.filter_bar_items();
                return obj;
            })(new this.$.$mol_bar());
        }
        filter_bar_items() {
            return [this.Filter(), this.Prop_add()];
        }
        Filter() {
            return ((obj) => {
                obj.hint = () => this.filter_hint();
                obj.query = (val) => this.prop_filter(val);
                return obj;
            })(new this.$.$mol_search());
        }
        filter_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_filter_hint");
        }
        prop_filter(val, force) {
            return (val !== void 0) ? val : "";
        }
        Prop_add() {
            return ((obj) => {
                obj.event_click = (val) => this.event_add(val);
                obj.sub = () => [this.Prop_add_icon()];
                obj.hint = () => this.prop_add_hint();
                return obj;
            })(new this.$.$mol_button_minor());
        }
        event_add(val, force) {
            return (val !== void 0) ? val : null;
        }
        Prop_add_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_plus());
        }
        prop_add_hint() {
            return this.$.$mol_locale.text("$mol_app_studio_prop_add_hint");
        }
        Fields() {
            return ((obj) => {
                obj.rows = () => this.fields();
                return obj;
            })(new this.$.$mol_list());
        }
        fields() {
            return [];
        }
        Source_page() {
            return ((obj) => {
                obj.title = () => this.source_title();
                obj.minimal_width = () => 400;
                obj.tools = () => [this.Source_close()];
                obj.body = () => [this.Source()];
                return obj;
            })(new this.$.$mol_page());
        }
        source_title() {
            return this.$.$mol_locale.text("$mol_app_studio_source_title");
        }
        Source_close() {
            return ((obj) => {
                obj.sub = () => [this.Source_close_icon()];
                obj.arg = () => this.source_close_arg();
                return obj;
            })(new this.$.$mol_link());
        }
        Source_close_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_cross());
        }
        source_close_arg() {
            return ({
                "source": null,
            });
        }
        Source() {
            return ((obj) => {
                obj.text = () => this.source();
                return obj;
            })(new this.$.$mol_text());
        }
        source() {
            return "";
        }
        Placeholder() {
            return null;
        }
        Prop(id) {
            return ((obj) => {
                obj.path = () => this.prop_path(id);
                obj.prop = (path, val) => this.prop_default(path, val);
                obj.props = (name, val) => this.props_all(name, val);
                obj.prop_arg = (id) => this.prop_arg(id);
                obj.prop_value = (id) => this.prop_value_base(id);
                obj.bind_options = () => this.prop_options();
                obj.object_options = () => this.view_options();
                obj.prop_add = (val) => this.prop_add(val);
                obj.highlight = () => this.prop_filter();
                return obj;
            })(new this.$.$mol_app_studio_field());
        }
        prop_path(id) {
            return [];
        }
        prop_default(path, val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
        props_all(name, val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
        prop_arg(id) {
            return ({});
        }
        prop_value_base(id) {
            return null;
        }
        prop_options() {
            return [];
        }
        view_options() {
            return [];
        }
        prop_add(val, force) {
            return (val !== void 0) ? val : "";
        }
        class_name_self(val, force) {
            return (val !== void 0) ? val : "App";
        }
        class_name_base(val, force) {
            return (val !== void 0) ? val : "$mol_view";
        }
        class_self(val, force) {
            return (val !== void 0) ? val : ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
        classes() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_tree());
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio.prototype, "value_overrided", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Preview_page", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source_link", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Edit", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Edit_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Selector", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Block", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "path", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Editor_page", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Speech_filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "speech_filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Editor_close", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Editor_close_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Filter_bar", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "prop_filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Prop_add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "event_add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Prop_add_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Fields", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source_page", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source_close", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source_close_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "Source", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio.prototype, "Prop", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio.prototype, "prop_default", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_studio.prototype, "props_all", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "prop_add", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "class_name_self", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "class_name_base", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "class_self", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio.prototype, "classes", null);
    $.$mol_app_studio = $mol_app_studio;
})($ || ($ = {}));
(function ($) {
    class $mol_app_studio_selector extends $.$mol_view {
        event() {
            return ({
                "contextmenu": (event) => this.select(event),
                "dblclick": (event) => this.select(event),
            });
        }
        select(event, force) {
            return (event !== void 0) ? event : null;
        }
        path(val, force) {
            return (val !== void 0) ? val : [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_selector.prototype, "select", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_studio_selector.prototype, "path", null);
    $.$mol_app_studio_selector = $mol_app_studio_selector;
})($ || ($ = {}));
//studio.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_studio extends $.$mol_app_studio {
            pages() {
                return [
                    this.Preview_page(),
                    ...this.source_show()
                        ? [this.Source_page()]
                        : (this.path() == null)
                            ? []
                            : [this.Editor_page()],
                ];
            }
            preview_tools() {
                return [this.Source_link(), this.Edit(), ...this.tools_main()];
            }
            classes_static() {
                const view_tree = '$mol_view $mol_object\n\ttitle \\\n\tsub /\n\tstyle *\n\tattr *\n\tevent *\n\tdom_name \\\n\n';
                const source = view_tree + $.$mol_http.resource('web.view.tree').text();
                return $.$mol_view_tree_classes($.$mol_tree.fromString(source));
            }
            classes(next) {
                if (next)
                    return next;
                return this.classes_static().insert(new $.$mol_tree({ type: this.class_name_base() }), this.class_name_self(), null);
            }
            class(name, next) {
                if (next !== undefined) {
                    this.classes(this.classes().insert(next, name));
                }
                return this.classes().select(name).sub[0] || null;
            }
            class_self(next) {
                return this.class(this.class_name_self(), next);
            }
            props_self(name) {
                const def = this.class(name);
                if (!def)
                    return new $.$mol_tree;
                return $.$mol_view_tree_class_props(def);
            }
            props_all(name, next, force) {
                if (next)
                    return next;
                const props_all = {};
                const collect = (name) => {
                    const sup = this.class(name);
                    if (sup)
                        collect($.$mol_view_tree_super_name(sup));
                    const props = this.props_self(name);
                    for (let prop of props.sub)
                        props_all[prop.type] = prop;
                };
                collect(name);
                return this.classes().clone({ type: '', sub: Object.keys(props_all).map(name => props_all[name]) });
            }
            view_class(name) {
                if (!$[name])
                    throw new Error(`View class not found: ${name}`);
                return $[name];
            }
            filter_bar_items() {
                return [
                    this.Filter(),
                    ...this.prop_filter() ? [this.Prop_add()] : [],
                ];
            }
            fields() {
                const path = this.path();
                return this.props_all(this.prop_class(path)).sub
                    .filter(prop => !$.$mol_view_tree_prop_key(prop))
                    .filter($.$mol_match_text(this.prop_filter(), (prop) => [$.$mol_view_tree_prop_name(prop)]))
                    .map(prop => this.Prop([...path, prop.type, null]));
            }
            prop_overs(path) {
                return this.prop_default(path).sub.map(over => over.type);
            }
            prop_path(path) {
                return path;
            }
            prop_title(path) {
                return path[path.length - 1];
            }
            prop_arg(path) {
                return { path: path.join(',') };
            }
            prop(path, next) {
                const props = this.props_all(this.class_name_self());
                let prop = props.select(path[0]).sub[0] || new $.$mol_tree({ type: String(path[0]) });
                if (next) {
                    prop = prop.insert(next, ...path.slice(1));
                    this.class_self(this.class_self().insert(prop, 0, path[0]));
                    this.props_all(this.class_name_self(), undefined, $.$mol_mem_force_cache);
                }
                return prop.select(...path.slice(1)).sub[0] || null;
            }
            prop_self(path) {
                return this.class_self().select(null, ...path).sub[0] || null;
            }
            prop_type(path) {
                const prop = this.prop(path);
                return (prop && prop.type !== '-') ? $.$mol_view_tree_value_type(prop) : null;
            }
            prop_key(path, next) {
                return $.$mol_view_tree_prop_key(this.prop(path.slice(0, path.length - 1)));
            }
            prop_next(path, next) {
                return $.$mol_view_tree_prop_next(this.prop(path.slice(0, path.length - 1)));
            }
            prop_default(path, next) {
                return this.prop(path, next);
            }
            path(next) {
                const str = $.$mol_state_arg.value(this.state_key('path'), next && next.join(','));
                return (str == null) ? null : (str ? str.split(',') : []);
            }
            view_options() {
                return Object.keys($).filter(name => {
                    if (name.length < 2)
                        return false;
                    if (name[0] !== '$')
                        return false;
                    const val = $[name];
                    if (typeof val !== 'function')
                        return false;
                    if (!(val.prototype instanceof $.$mol_object))
                        return false;
                    return true;
                });
            }
            prop_options() {
                return this.props_all(this.class_name_self()).sub.map(prop => prop.type);
            }
            overrided_all(next) {
                return next || {};
            }
            overrided(key, next) {
                return this.overrided_all((next === undefined) ? undefined : Object.assign(Object.assign({}, this.overrided_all()), { [key]: next }))[key];
            }
            prop_value_base(path, next) {
                const path2 = path.slice();
                while (path2[path2.length - 1] === null)
                    path2.pop();
                const element = this.Element([]);
                const field = String(path2.shift()).replace(/[?!].*/, '');
                let val = element[field] && element[field]['$mol_app_studio_original'];
                if (typeof val === 'function') {
                    val = val.call(element, next);
                    while (val && path2.length) {
                        const field = path2.shift();
                        if (field == null)
                            continue;
                        val = val[field];
                    }
                }
                if (val === undefined)
                    val = null;
                return val;
            }
            prop_class(path, next) {
                if (path.length === 0)
                    return this.class_name_self();
                const over = this.overrided(`prop_class(${JSON.stringify(path)})`, next);
                if (over)
                    return over;
                switch (this.prop_type(path)) {
                    case 'get':
                    case 'bind':
                    case 'object':
                        const def = this.prop_default(path);
                        return def && def.type;
                }
                throw new Error(`Wrong type ${this.prop_type(path)}`);
            }
            prop_value_view(path, next) {
                const over = this.prop_self(path);
                switch (this.prop_type(path)) {
                    case 'bool': return over && (over.type === 'true');
                    case 'string': return over && over.value;
                    case 'locale': return over && over.sub[0].value;
                    case 'number': return over && over.type;
                    case 'get':
                    case 'bind': return over && this.prop_value_view([over.sub[0].type, null]);
                    case 'object': return this.Element(path);
                    case 'list': return over && over.sub.map((item, index) => this.prop_value_view([...path, index]));
                    case 'dict': return over && over.sub.reduce((dict, item) => (Object.assign(Object.assign({}, dict), { [item.type]: this.prop_value_view([...path, item.type, null]) })), {});
                }
                return null;
            }
            Element(path) {
                const prop_self = this.prop_self(path);
                const obj = (path.length && !prop_self)
                    ? this.prop_value_base(path)
                    : new (this.view_class(path.length === 0 ? this.class_name_base() : prop_self.type));
                if (!obj || typeof obj !== 'object')
                    return obj;
                const props = this.props_all(this.prop_class(path));
                for (let prop of props.sub) {
                    if (this.prop_key([...path, prop.type]))
                        continue;
                    const field = prop.type.replace(/[?!].*/, '');
                    let value = obj[field];
                    if (!value || value['$mol_app_studio_original'])
                        continue;
                    obj[field] = (next) => {
                        const val = this.prop_value_view([...path, prop.type, null]);
                        if (next === undefined) {
                            if (val !== null)
                                return val;
                        }
                        return value.call(obj, next);
                    };
                    obj[field]['$mol_app_studio_original'] = value;
                }
                return obj;
            }
            Block() {
                return this.Element([]);
            }
            preview_title() {
                return super.preview_title() + this.Element([]).title();
            }
            event_add(event) {
                this.prop_add(this.prop_filter());
            }
            prop_add(name) {
                this.prop([name], new $.$mol_tree({ type: name, sub: [new $.$mol_tree] }));
            }
            speech_enabled(next) {
                return this.$.$mol_speech.hearing(next);
            }
            speech_filter([filter]) {
                this.prop_filter(filter);
            }
            source_show() {
                return this.$.$mol_state_arg.value(this.state_key('source')) != null;
            }
            source() {
                return '```tree\n' + this.class_self() + '```';
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_app_studio.prototype, "classes_static", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_studio.prototype, "classes", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "class", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "props_self", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "props_all", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_self", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_type", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_key", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_next", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_default", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_studio.prototype, "view_options", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_studio.prototype, "prop_options", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_studio.prototype, "overrided_all", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "prop_value_base", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_studio.prototype, "Element", null);
        $$.$mol_app_studio = $mol_app_studio;
        class $mol_app_studio_selector extends $.$mol_app_studio_selector {
            select(event) {
                const target = event.target.id;
                const self = this.dom_node().id;
                if (target.substring(0, self.length) === self) {
                    const suffix = event.target.id.substring(this.dom_node().id.length + 1);
                    this.path(suffix.replace(/\(.*?\)/g, '').split('.').filter(v => v));
                }
                else {
                    this.path(JSON.parse(target.replace(/^.*?Element\(/g, '').replace(/\).*$/g, '')));
                }
                event.preventDefault();
            }
        }
        $$.$mol_app_studio_selector = $mol_app_studio_selector;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//studio.view.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/status/status.view.css", "[mol_status] {\n\ttext-align: center;\n\tpadding: .5rem;\n\tborder-radius: var(--mol_skin_round);\n\tdisplay: block;\n}\n\n[mol_status]:not([mol_view_error=\"$mol_atom_wait\"]) {\n\tbackground: var(--mol_skin_warn);\n\tcolor: var(--mol_skin_warn_text);\n}\n\n[mol_status]:not([mol_view_error=\"$mol_atom_wait\"]):empty {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//status.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_status extends $.$mol_view {
        status() {
            return null;
        }
        minimal_height() {
            return 24;
        }
        minimal_width() {
            return 0;
        }
        sub() {
            return [this.message()];
        }
        message() {
            return "";
        }
    }
    $.$mol_status = $mol_status;
})($ || ($ = {}));
//status.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_status extends $.$mol_status {
            message() {
                try {
                    let status = this.status();
                    if (status)
                        status.valueOf();
                    return null;
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    return error.message;
                }
            }
        }
        $$.$mol_status = $mol_status;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//status.view.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_dict(config) {
        const store = new $.$mol_object2;
        let keys;
        const get_keys = () => {
            if (!keys) {
                keys = new $.$mol_atom2();
                keys[Symbol.toStringTag] = `Object.keys(${store})`;
                keys.put(0);
            }
            return keys;
        };
        const get_cache = (key) => {
            let cache = store[key];
            if (!cache) {
                cache = new $.$mol_atom2;
                cache.abort = () => {
                    if (config.abort) {
                        if (!config.abort(cache.value, key, proxy))
                            return false;
                    }
                    else {
                        cache.forget();
                    }
                    store[key] = undefined;
                    return true;
                };
                if (config.get)
                    cache.calculate = config.get.bind(null, key, proxy);
                cache[Symbol.toStringTag] = `${store}[${JSON.stringify(key)}]`;
                store[key] = cache;
                if (keys)
                    keys.obsolete_slaves();
            }
            return cache;
        };
        const proxy = new Proxy(store, {
            get(store, key, proxy) {
                if (key in $.$mol_object2.prototype)
                    return store[key];
                return get_cache(key).get();
            },
            set(store, key, value, proxy) {
                if (key in $.$mol_object2.prototype) {
                    store[key] = value;
                }
                else {
                    if (config.set)
                        value = config.set.call(null, value, key, proxy);
                    get_cache(key).push(value);
                }
                return true;
            },
            ownKeys(store) {
                get_keys().get();
                return Object.keys(store);
            },
        });
        return proxy;
    }
    $.$mol_atom2_dict = $mol_atom2_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_style_attach("mol/app/demo/demo.view.css", "[mol_app_demo_menu] {\n\tflex: 1 1 240px;\n}\n\n[mol_app_demo_menu_head] {\n}\n\n[mol_app_demo_menu_tools] {\n\tpadding: 0;\n}\n\n[mol_app_demo_menu_nav] {\n\tflex: auto;\n\talign-self: stretch;\n}\n\n[mol_app_demo_main],\n[mol_app_demo_detail],\n[mol_app_empty_message] {\n\tflex: 1000 1 600px;\n}\n\n[mol_app_demo_detail] {\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_app_demo_menu_filter] {\n\talign-self: stretch;\n\tflex: none;\n}\n\n[mol_app_demo_nav_table] {\n\tpadding: .5rem;\n\twidth: 100%;\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_nav_row] {\n\tdisplay: flex;\n}\n\n[mol_app_demo_nav_option] {\n\tpadding: 0 .5rem 0 0;\n\tdisplay: flex;\n\tflex: 1;\n\talign-items: center;\n\tbox-shadow: none;\n}\n\n[mol_app_demo_nav_expand] {\n\talign-self: stretch;\n\talign-items: center;\n\tpadding-right: .25rem;\n}\n\n[mol_app_demo_nav_content] {\n\tflex-grow: 1;\n}\n\n[mol_app_demo_menu_themes] {\n\tflex: none;\n}\n\n[mol_app_demo_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tpadding: .5rem;\n\talign-content: flex-start;\n\talign-items: flex-start;\n}\n\n[mol_app_demo_screen] {\n\tmax-height: 45%;\n}\n\n[mol_app_demo_detail_body] {\n\tdisplay: flex;\n\talign-items: stretch;\n\tjustify-content: flex-start;\n\tflex-direction: column;\n}\n\n[mol_app_demo_detail_list] {\n\tflex: 1 0 auto;\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: .5rem;\n\theight: calc( 100% - 1rem );\n}\n\n[mol_app_demo_detail_list] > [mol_demo_large] {\n\tmargin: .5rem;\n\theight: calc( 100% - 2rem );\n\twidth: calc( 100% - 1rem );\n}\n\n[mol_app_demo_page_close] {\n\tcolor: inherit;\n\talign-items: center;\n\tpadding: 1rem;\n}\n\n[mol_app_demo_welcome] {\n\tflex: 1 1 auto;\n}\n\n[mol_app_demo_option_link] {\n\tpadding: 0;\n}\n\n[mol_app_demo_sample_large] {\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_detail_empty_message] {\n\tmargin: auto;\n}\n\n[mol_app_demo_chat] {\n\tflex: none;\n}\n");
})($ || ($ = {}));
//demo.view.css.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_app_demo extends $.$mol_book {
        editor_title() {
            return this.detail_title();
        }
        detail_title() {
            return "$mol";
        }
        source_prefix() {
            return "https://github.com/eigenmethod/mol/tree/master/";
        }
        Placeholder() {
            return null;
        }
        Main() {
            return ((obj) => {
                obj.event_top = (event) => this.event_front_up(event);
                return obj;
            })(new this.$.$mol_app_demo_main());
        }
        pages() {
            return this.blocks();
        }
        blocks() {
            return [];
        }
        attr() {
            return ({
                "mol_theme": this.theme(),
            });
        }
        Menu() {
            return ((obj) => {
                obj.hierarchy = () => this.nav_hierarchy();
                obj.option = (id) => this.nav_option(id);
                obj.filter = (val) => this.filter_string(val);
                obj.theme = (val) => this.theme(val);
                obj.event_top = (event) => this.event_front_up(event);
                return obj;
            })(new this.$.$mol_app_demo_menu());
        }
        nav_hierarchy() {
            return null;
        }
        nav_option(id) {
            return null;
        }
        filter_string(val, force) {
            return (val !== void 0) ? val : "";
        }
        theme(val, force) {
            return (val !== void 0) ? val : "$mol_theme_dark";
        }
        Detail() {
            return ((obj) => {
                obj.minimal_width = () => 600;
                obj.title = () => this.detail_title();
                obj.source_link = () => this.source_link();
                obj.body = () => [this.Detail_list()];
                obj.event_top = (val) => this.event_front_up(val);
                return obj;
            })(new this.$.$mol_app_demo_detail());
        }
        source_link() {
            return "";
        }
        Detail_list() {
            return ((obj) => {
                obj.rows = () => this.main_content();
                return obj;
            })(new this.$.$mol_list());
        }
        main_content() {
            return [];
        }
        Editor(id) {
            return ((obj) => {
                obj.minimal_width = () => 1000;
                obj.title = () => this.editor_title();
                obj.class_name_base = () => this.selected_class_name();
                obj.tools_main = () => [this.Close()];
                return obj;
            })(new this.$.$mol_app_studio());
        }
        selected_class_name() {
            return "";
        }
        Close() {
            return ((obj) => {
                obj.sub = () => [this.Close_icon()];
                obj.arg = () => this.close_arg();
                return obj;
            })(new this.$.$mol_link());
        }
        Close_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_cross());
        }
        close_arg() {
            return ({
                "edit": null,
            });
        }
        Welcome() {
            return ((obj) => {
                obj.sub = () => [this.Welcome_text()];
                return obj;
            })(new this.$.$mol_scroll());
        }
        Welcome_text() {
            return ((obj) => {
                obj.text = () => this.welcome_text();
                return obj;
            })(new this.$.$mol_text());
        }
        welcome_text() {
            return "";
        }
        Detail_empty_message() {
            return ((obj) => {
                obj.sub = () => [this.detail_empty_prefix(), this.selected(), this.detail_empty_postfix()];
                return obj;
            })(new this.$.$mol_status());
        }
        detail_empty_prefix() {
            return this.$.$mol_locale.text("$mol_app_demo_detail_empty_prefix");
        }
        selected() {
            return "";
        }
        detail_empty_postfix() {
            return this.$.$mol_locale.text("$mol_app_demo_detail_empty_postfix");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Main", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "filter_string", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "theme", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Detail", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Detail_list", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_demo.prototype, "Editor", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Close", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Close_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Welcome", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Welcome_text", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo.prototype, "Detail_empty_message", null);
    $.$mol_app_demo = $mol_app_demo;
})($ || ($ = {}));
(function ($) {
    class $mol_app_demo_menu extends $.$mol_page {
        minimal_width() {
            return 240;
        }
        title() {
            return this.$.$mol_locale.text("$mol_app_demo_menu_title");
        }
        sub() {
            return [this.Head(), this.Filter(), this.Nav(), this.Themes()];
        }
        Filter() {
            return ((obj) => {
                obj.query = (val) => this.filter(val);
                return obj;
            })(new this.$.$mol_search());
        }
        filter(val, force) {
            return (val !== void 0) ? val : "";
        }
        Nav() {
            return ((obj) => {
                obj.hierarchy = () => this.hierarchy();
                obj.record = (id) => this.option(id);
                obj.needle = () => this.filter();
                return obj;
            })(new this.$.$mol_app_demo_nav());
        }
        hierarchy() {
            return null;
        }
        option(id) {
            return null;
        }
        Themes() {
            return ((obj) => {
                obj.value = (val) => this.theme(val);
                obj.options = () => ({
                    "$mol_theme_light": this.theme_light_title(),
                    "$mol_theme_dark": this.theme_dark_title(),
                });
                return obj;
            })(new this.$.$mol_switch());
        }
        theme(val, force) {
            return (val !== void 0) ? val : "$mol_theme_dark";
        }
        theme_light_title() {
            return this.$.$mol_locale.text("$mol_app_demo_menu_theme_light_title");
        }
        theme_dark_title() {
            return this.$.$mol_locale.text("$mol_app_demo_menu_theme_dark_title");
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_menu.prototype, "Filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_menu.prototype, "filter", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_menu.prototype, "Nav", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_menu.prototype, "Themes", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_menu.prototype, "theme", null);
    $.$mol_app_demo_menu = $mol_app_demo_menu;
})($ || ($ = {}));
(function ($) {
    class $mol_app_demo_detail extends $.$mol_page {
        tools() {
            return [this.Source_link(), this.Edit(), this.Close()];
        }
        Source_link() {
            return ((obj) => {
                obj.title = () => "";
                obj.uri = () => this.source_link();
                obj.target = () => "_blank";
                return obj;
            })(new this.$.$mol_link_iconed());
        }
        source_link() {
            return "";
        }
        Edit() {
            return ((obj) => {
                obj.sub = () => [this.Edit_speck(), this.Edit_icon()];
                obj.arg = () => ({
                    "edit": "",
                    "path": "",
                });
                return obj;
            })(new this.$.$mol_link());
        }
        Edit_speck() {
            return ((obj) => {
                obj.value = () => "β";
                return obj;
            })(new this.$.$mol_speck());
        }
        Edit_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_settings());
        }
        Close() {
            return ((obj) => {
                obj.sub = () => [this.Close_icon()];
                obj.arg = () => this.close_arg();
                return obj;
            })(new this.$.$mol_link());
        }
        Close_icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_cross());
        }
        close_arg() {
            return ({
                "demo": null,
            });
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Source_link", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Edit", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Edit_speck", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Edit_icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Close", null);
    __decorate([
        $.$mol_mem
    ], $mol_app_demo_detail.prototype, "Close_icon", null);
    $.$mol_app_demo_detail = $mol_app_demo_detail;
})($ || ($ = {}));
(function ($) {
    class $mol_app_demo_nav extends $.$mol_grid {
        row_height() {
            return 40;
        }
        hierarchy_col() {
            return "title";
        }
        Head() {
            return null;
        }
        Option(id) {
            return ((obj) => {
                obj.arg = () => this.arg(id);
                obj.sub = () => [this.Expand(id), this.Content(id)];
                return obj;
            })(new this.$.$mol_link());
        }
        arg(id) {
            return ({});
        }
        Expand(id) {
            return ((obj) => {
                obj.expanded = (val) => this.cell_expanded(id, val);
                obj.level = () => this.cell_level(id);
                return obj;
            })(new this.$.$mol_check_expand());
        }
        Content(id) {
            return ((obj) => {
                obj.sub = () => [this.cell_content(id)];
                return obj;
            })(new this.$.$mol_view());
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_app_demo_nav.prototype, "Option", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_demo_nav.prototype, "Expand", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_app_demo_nav.prototype, "Content", null);
    $.$mol_app_demo_nav = $mol_app_demo_nav;
})($ || ($ = {}));
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo extends $.$mol_app_demo {
            detail_title() {
                const selected = this.selected();
                if (selected) {
                    const names = this.names_demo();
                    return `$${selected}`;
                }
                return super.title();
            }
            theme(next) {
                return this.$.$mol_state_local.value('$mol_app_demo_theme', next) || super.theme();
            }
            names_demo_all() {
                var next = [];
                for (var name in this.$) {
                    if (!/^\$.*_demo($|_)/i.test(name))
                        continue;
                    if (/^\$mol_demo/.test(name))
                        continue;
                    if (/^\$mol_app_demo/.test(name))
                        continue;
                    if (typeof this.$[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next.sort();
            }
            names_demo_filtered() {
                const filter = this.filter_string().toLowerCase();
                const names = this.names_demo_all().filter(name => (name.toLowerCase().indexOf(filter) != -1));
                return names;
            }
            nav_hierarchy() {
                const names = this.names_demo_filtered();
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                names.forEach(name => {
                    const chunks = name.split(/(?=[_.-])/);
                    let branch = root;
                    for (let i = 1; i <= chunks.length; ++i) {
                        const prefix = chunks.slice(0, i).join('');
                        if (!hierarchy[prefix]) {
                            branch.sub.push(hierarchy[prefix] = {
                                id: prefix,
                                parent: branch,
                                sub: [],
                            });
                        }
                        branch = hierarchy[prefix];
                    }
                });
                hierarchy[''].sub.map(child => reduce(child));
                function reduce(node) {
                    if (names.indexOf(node.id) >= 0)
                        return node;
                    node.sub = node.sub.map(child => reduce(child));
                    if (node.sub.length !== 1)
                        return node;
                    node.sub[0].parent = node.parent;
                    return node.sub[0];
                }
                return hierarchy;
            }
            nav_option(id) {
                const parent = this.nav_hierarchy()[id].parent;
                const title = `$${id}`
                    .substring(parent.id.length + 1)
                    .replace(/^[-._]|[-._]demo$/g, '')
                    .replace(/_/g, ' ')
                    .replace(/^(\w)/, letter => letter.toUpperCase());
                return { title };
            }
            selected() {
                return $.$mol_state_arg.value('demo') || '';
            }
            selected_class_name() {
                return '$' + this.selected();
            }
            editing() {
                return $.$mol_state_arg.value('edit') != null;
            }
            Widget() {
                return $.$mol_atom2_dict({
                    get: (name) => {
                        const Class = this.$['$' + name];
                        return new Class();
                    }
                });
            }
            names_demo() {
                const selected = this.selected();
                const all = this.names_demo_all();
                const root = this.nav_hierarchy()[selected];
                if (!root)
                    return [];
                const names = [];
                const collect = (node) => {
                    const demo = `${node.id}_demo`;
                    if (all.indexOf(demo) !== -1) {
                        if (names.indexOf(demo) === -1)
                            names.push(demo);
                    }
                    else if (all.indexOf(node.id) !== -1) {
                        if (names.indexOf(node.id) === -1)
                            names.push(node.id);
                    }
                    else {
                        node.sub.forEach(child => collect(child));
                    }
                };
                if (root.sub.length)
                    root.sub.forEach(child => collect(child));
                collect(root);
                return names;
            }
            blocks() {
                let sub = [];
                sub.push(this.Menu());
                if (this.selected()) {
                    if (this.editing() && this.names_demo().length === 1)
                        sub.push(...this.Editor(this.selected()).pages());
                    else
                        sub.push(this.Detail());
                }
                else {
                    sub.push(this.Main());
                }
                return sub;
            }
            main_content() {
                const names = this.names_demo();
                switch (names.length) {
                    case 0:
                        return [this.Detail_empty_message()];
                    default:
                        return this.names_demo().map(name => this.Widget()[name]);
                }
            }
            logo_uri() {
                return $.$mol_file.relative('/mol/logo/logo.svg').path();
            }
            source_link() {
                const demo = $.$mol_state_arg.value('demo');
                if (!demo)
                    return this.source_prefix();
                const pieces = demo.split('_').slice(1);
                const source_link = this.source_prefix() + pieces.join('/');
                return source_link;
            }
            chat_link() {
                return $.$mol_state_arg.make_link({ demo: this.selected() });
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "names_demo_all", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "names_demo_filtered", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "nav_hierarchy", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "Widget", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "names_demo", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_demo.prototype, "main_content", null);
        $$.$mol_app_demo = $mol_app_demo;
        class $mol_app_demo_nav extends $.$mol_app_demo_nav {
            Cell(id) {
                if (id.col === 'title')
                    return this.Option(id);
                return super.cell(id);
            }
            arg(id) {
                return { 'demo': id.row[id.row.length - 1] };
            }
        }
        $$.$mol_app_demo_nav = $mol_app_demo_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map

//# sourceMappingURL=web.js.map
