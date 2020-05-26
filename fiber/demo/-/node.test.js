require( "source-map-support" ).install()
;
process.on( 'unhandledRejection' , up => { throw up } );
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var globalThis = globalThis || global || self || this
var $ = ( typeof module === 'object' ) ? Object.setPrototypeOf( module['export'+'s'] , globalThis ) : globalThis
$.$$ = $
$.$mol = $  // deprecated

;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Error.stackTraceLimit = Infinity;
module.exports;
//mol.js.map
;
"use strict";
var $;
(function ($) {
    let $$;
    (function ($$_1) {
    })($$ = $.$$ || ($.$$ = {}));
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//ambient.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));
//log3.js.map
;
"use strict";
var $node = new Proxy({}, { get(target, name, wrapper) {
        const path = require('path');
        const fs = require('fs');
        const mod = require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return require(name);
        let dir = path.resolve('.');
        const suffix = `./node_modules/${name}`;
        const $$ = $;
        while (!fs.existsSync(path.join(dir, suffix))) {
            const parent = path.resolve(dir, '..');
            if (parent === dir) {
                $$.$mol_exec('.', 'npm', 'install', name);
                try {
                    $$.$mol_exec('.', 'npm', 'install', '@types/' + name);
                }
                catch (_a) { }
                break;
            }
            else {
                dir = parent;
            }
        }
        return require(name);
    } });
//node.node.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object')
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch (_a) {
            return false;
        }
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
//writable.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_object2 = (() => {
        var _a;
        class $mol_object2 {
            constructor(init) {
                this[_a] = null;
                if (init)
                    init(this);
            }
            get $() {
                if (this[$.$mol_ambient_ref])
                    return this[$.$mol_ambient_ref];
                const owner = $.$mol_owning_get(this);
                return this[$.$mol_ambient_ref] = (owner === null || owner === void 0 ? void 0 : owner.$) || $mol_object2.$;
            }
            set $(next) {
                if (this[$.$mol_ambient_ref])
                    $.$mol_fail_hidden(new Error('Context already defined'));
                this[$.$mol_ambient_ref] = next;
            }
            static create(init) {
                return new this(init);
            }
            static toString() { return this[Symbol.toStringTag] || this.name; }
            destructor() { }
            toString() {
                return this[Symbol.toStringTag] || this.constructor.name + '()';
            }
            toJSON() {
                return this.toString();
            }
        }
        _a = $.$mol_ambient_ref;
        $mol_object2.$ = $;
        return $mol_object2;
    })();
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//object2.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_deprecated(message) {
        return (host, field, descr) => {
            const value = descr.value;
            let warned = false;
            descr.value = function $mol_deprecated_wrapper(...args) {
                if (!warned) {
                    this.$.$mol_log3_warn({
                        place: `${host.constructor.name}::${field}`,
                        message: `Deprecated`,
                        hint: message,
                    });
                    warned = true;
                }
                return value.call(this, ...args);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_tree_convert = Symbol('$mol_tree_convert');
    let $mol_tree = (() => {
        class $mol_tree extends $.$mol_object2 {
            constructor(config = {}) {
                super();
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
                this.length = config.length || 0;
            }
            static values(str, baseUri) {
                return str.split('\n').map((data, index) => new $mol_tree({
                    data: data,
                    baseUri: baseUri,
                    row: index + 1,
                    length: data.length,
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
                    length: ('length' in config) ? config.length : this.length,
                    value: config.value
                });
            }
            make(config) {
                return new $mol_tree(Object.assign({ baseUri: this.baseUri, row: this.row, col: this.col, length: this.length }, config));
            }
            make_data(value, sub) {
                return this.make({ value, sub });
            }
            make_struct(type, sub) {
                return this.make({ type, sub });
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
                        return this.$.$mol_fail(new Error(`Syntax error at ${baseUri}:${row}\n${line}`));
                    var indent = chunks[1];
                    var path = chunks[2];
                    var data = chunks[3];
                    var deep = indent.length;
                    var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                    if (stack.length <= deep)
                        return this.$.$mol_fail(new Error(`Too many tabs at ${baseUri}:${row}\n${line}`));
                    stack.length = deep + 1;
                    var parent = stack[deep];
                    let col = deep;
                    types.forEach(type => {
                        if (!type)
                            return this.$.$mol_fail(new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`));
                        var next = new $mol_tree({ type, baseUri, row, col, length: type.length });
                        const parent_sub = parent.sub;
                        parent_sub.push(next);
                        parent = next;
                        col += type.length + 1;
                    });
                    if (data) {
                        var next = new $mol_tree({ data: data.substring(1), baseUri, row, col, length: data.length });
                        const parent_sub = parent.sub;
                        parent_sub.push(next);
                        parent = next;
                    }
                    stack.push(parent);
                });
                return root;
            }
            static fromJSON(json, baseUri = '') {
                switch (true) {
                    case typeof json === 'boolean':
                    case typeof json === 'number':
                    case json === null:
                        return new $mol_tree({
                            type: String(json),
                            baseUri: baseUri
                        });
                    case typeof json === 'string':
                        return new $mol_tree({
                            value: json,
                            baseUri: baseUri
                        });
                    case Array.isArray(json):
                        return new $mol_tree({
                            type: "/",
                            sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                        });
                    case json instanceof Date:
                        return new $mol_tree({
                            value: json.toISOString(),
                            baseUri: baseUri
                        });
                    default:
                        if (typeof json[$.$mol_tree_convert] === 'function') {
                            return json[$.$mol_tree_convert]();
                        }
                        if (typeof json.toJSON === 'function') {
                            return $mol_tree.fromJSON(json.toJSON());
                        }
                        if (json instanceof Error) {
                            const { name, message, stack } = json;
                            json = Object.assign(Object.assign({}, json), { name, message, stack });
                        }
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
        __decorate([
            $.$mol_deprecated('Use $mol_tree:hack')
        ], $mol_tree.prototype, "transform", null);
        return $mol_tree;
    })();
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = Object.assign({ time: new Date().toISOString() }, event);
            const tree = this.$mol_tree.fromJSON(event).clone({ type });
            let str = tree.toString();
            if (process[output].isTTY) {
                str = $node.colorette[color + 'Bright'](str);
            }
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', 'blue');
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', 'green');
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', 'red');
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', 'yellow');
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', 'magenta');
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', 'cyan');
})($ || ($ = {}));
//log3.node.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $.$mol_object2 {
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
        static get field() {
            return (obj, name, descr) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//wrapper.js.map
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
    $.$mol_conform_array = $mol_conform_array;
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
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', Object.assign({ 'vertical-align': '8%' }, style), ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
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
    function $mol_fiber_defer(calculate) {
        const fiber = new $mol_fiber;
        fiber.calculate = calculate;
        fiber[Symbol.toStringTag] = calculate.name;
        fiber.schedule();
        return fiber;
    }
    $.$mol_fiber_defer = $mol_fiber_defer;
    function $mol_fiber_func(calculate) {
        $.$mol_ambient({}).$mol_log3_warn({
            place: '$mol_fiber_func',
            message: 'Deprecated',
            hint: 'Use $mol_fiber.func instead',
        });
        return $mol_fiber.func(calculate);
    }
    $.$mol_fiber_func = $mol_fiber_func;
    function $mol_fiber_root(calculate) {
        const wrapper = function (...args) {
            const fiber = new $mol_fiber();
            fiber.calculate = calculate.bind(this, ...args);
            fiber[Symbol.toStringTag] = wrapper[Symbol.toStringTag];
            return fiber.wake();
        };
        wrapper[Symbol.toStringTag] = calculate.name;
        return wrapper;
    }
    $.$mol_fiber_root = $mol_fiber_root;
    function $mol_fiber_method(obj, name, descr) {
        $.$mol_ambient({}).$mol_log3_warn({
            place: '$mol_fiber_method',
            message: 'Deprecated',
            hint: 'Use $mol_fiber.method instead',
        });
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
                master.error = request.call(this, ...args).then((next) => master.push(next), (error) => master.fail(error));
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
    class $mol_fiber_solid extends $.$mol_wrapper {
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
    }
    $.$mol_fiber_solid = $mol_fiber_solid;
    let $mol_fiber = (() => {
        class $mol_fiber extends $.$mol_wrapper {
            constructor() {
                super(...arguments);
                this.value = undefined;
                this.error = null;
                this.cursor = 0;
                this.masters = [];
            }
            static wrap(task) {
                return function $mol_fiber_wrapper(...args) {
                    const slave = $mol_fiber.current;
                    let master = slave && slave.master;
                    if (!master || master.constructor !== $mol_fiber) {
                        master = new $mol_fiber;
                        master.calculate = task.bind(this, ...args);
                        const prefix = slave ? `${slave}/${slave.cursor / 2}:` : '/';
                        master[Symbol.toStringTag] = `${prefix}${task.name}`;
                    }
                    return master.get();
                };
            }
            static async tick() {
                while ($mol_fiber.queue.length > 0) {
                    const now = Date.now();
                    if (now >= $mol_fiber.deadline) {
                        $mol_fiber.schedule();
                        $mol_fiber.liveline = now;
                        return;
                    }
                    const task = $mol_fiber.queue.shift();
                    await task();
                }
            }
            static schedule() {
                if (!$mol_fiber.scheduled) {
                    $mol_fiber.scheduled = new $.$mol_after_tick(async () => {
                        const now = Date.now();
                        let quant = $mol_fiber.quant;
                        if ($mol_fiber.liveline) {
                            quant = Math.max(quant, Math.floor((now - $mol_fiber.liveline) / 2));
                            $mol_fiber.liveline = 0;
                        }
                        $mol_fiber.deadline = now + quant;
                        $mol_fiber.scheduled = null;
                        await $mol_fiber.tick();
                    });
                }
                const promise = new this.$.Promise(done => this.queue.push(() => (done(), promise)));
                return promise;
            }
            schedule() {
                $mol_fiber.schedule().then(() => this.wake());
            }
            wake() {
                const unscoupe = this.$.$mol_log3_area_lazy({
                    place: this,
                    message: 'Wake'
                });
                try {
                    if (this.cursor > -2)
                        return this.get();
                }
                catch (error) {
                    if ('then' in error)
                        return;
                    $.$mol_fail_hidden(error);
                }
                finally {
                    unscoupe();
                }
            }
            push(value) {
                value = this.$.$mol_conform(value, this.value);
                if (this.error || !Object.is(this.value, value)) {
                    if ($mol_fiber.logs)
                        this.$.$mol_log3_done({
                            place: this,
                            message: 'Changed',
                            next: value,
                            value: this.value,
                            error: this.error,
                        });
                    this.obsolete_slaves();
                    this.forget();
                }
                else {
                    if ($mol_fiber.logs)
                        this.$.$mol_log3_done({
                            place: this,
                            message: 'Same value',
                            value,
                        });
                }
                this.error = null;
                this.value = value;
                this.complete();
                return value;
            }
            fail(error) {
                this.complete();
                if ($mol_fiber.logs)
                    this.$.$mol_log3_fail({
                        place: this,
                        message: error.message,
                    });
                this.error = error;
                this.obsolete_slaves();
                return error;
            }
            wait(promise) {
                this.error = promise;
                if ($mol_fiber.logs)
                    this.$.$mol_log3_warn({
                        place: this,
                        message: `Wait`,
                        hint: `Don't panic, it's normal`,
                        promise,
                    });
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
                if ($mol_fiber.logs)
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Pull',
                    });
                this.push(this.calculate());
            }
            update() {
                const slave = $mol_fiber.current;
                try {
                    $mol_fiber.current = this;
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
                    $mol_fiber.current = slave;
                }
            }
            get() {
                if (this.cursor > 0) {
                    this.$.$mol_fail(new Error(`Cyclic dependency at ${this}`));
                }
                const slave = $mol_fiber.current;
                if (slave)
                    slave.master = this;
                if (this.cursor > -2)
                    this.update();
                if (this.error)
                    return this.$.$mol_fail_hidden(this.error);
                return this.value;
            }
            limit() {
                if (!$mol_fiber.deadline)
                    return;
                if (!$mol_fiber.current)
                    return;
                if (Date.now() < $mol_fiber.deadline)
                    return;
                this.$.$mol_fail_hidden($mol_fiber.schedule());
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
                if ($mol_fiber.logs)
                    this.$.$mol_log3_done({
                        place: this,
                        message: 'Destructed',
                    });
                this.complete();
            }
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_native(this);
            }
        }
        $mol_fiber.logs = false;
        $mol_fiber.quant = 16;
        $mol_fiber.deadline = 0;
        $mol_fiber.liveline = 0;
        $mol_fiber.current = null;
        $mol_fiber.scheduled = null;
        $mol_fiber.queue = [];
        return $mol_fiber;
    })();
    $.$mol_fiber = $mol_fiber;
})($ || ($ = {}));
//fiber.js.map
;
"use strict";
//deep.js.map
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
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//context.node.js.map
;
"use strict";
//jsx d.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElement: (name) => $.$mol_dom_context.document.createElement(name)
    };
})($ || ($ = {}));
//jsx.js.map
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
    function $mol_jsx_make(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        if ($.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $.$mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(id)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        const guid = $.$mol_jsx_prefix + id;
        let node = guid && $.$mol_jsx_document.getElementById(guid);
        if (typeof Elem !== 'string') {
            if (Elem.prototype) {
                const view = node && node[Elem] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                node = view.valueOf();
                node[Elem] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                }
            }
        }
        if (!node)
            node = $.$mol_jsx_document.createElement(Elem);
        $.$mol_dom_render_children(node, [].concat(...childNodes));
        for (const key in props) {
            if (typeof props[key] === 'string') {
                node.setAttribute(key, props[key]);
            }
            else if (props[key] && props[key]['constructor'] === Object) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            node[key] = props[key];
        }
        if (guid)
            node.id = guid;
        return node;
    }
    $.$mol_jsx_make = $mol_jsx_make;
})($ || ($ = {}));
//make.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_fiber_demo = (() => {
        class $mol_fiber_demo extends $.$mol_object2 {
            static step(sandbox) {
                if (Math.random() > .999)
                    throw new Error('Test error');
                sandbox.appendChild($.$mol_jsx_make("video", null));
            }
            static walk(sandbox) {
                try {
                    let start = this.now();
                    for (let i = 0; i < 200; ++i)
                        this.step(sandbox);
                    sandbox.innerText = String(Date.now() - start);
                }
                catch (error) {
                    if ('then' in error)
                        $.$mol_fail_hidden(error);
                    sandbox.innerText = error.message;
                    $.$mol_fail_hidden(error);
                }
            }
            static red_task() { this.walk(document.getElementById('red')); }
            static green_task() { this.walk(document.getElementById('green')); }
            static blue_task() { this.walk(document.getElementById('blue')); }
            static load_source() {
                document.getElementById('source').innerText += ' ' + this.load('index.html').length;
            }
            static run() {
                if (this.loading)
                    this.loading.destructor();
                this.loading = $.$mol_fiber_defer(() => this.load_source());
                $.$mol_fiber_defer(() => this.red_task());
                $.$mol_fiber_defer(() => this.green_task());
                $.$mol_fiber_defer(() => this.blue_task());
            }
        }
        $mol_fiber_demo.now = $.$mol_fiber.func(Date.now);
        $mol_fiber_demo.load = $.$mol_fiber_sync(async (uri) => (await fetch(uri)).text());
        __decorate([
            $.$mol_fiber_solid.method
        ], $mol_fiber_demo, "step", null);
        __decorate([
            $.$mol_fiber.method
        ], $mol_fiber_demo, "walk", null);
        return $mol_fiber_demo;
    })();
    $.$mol_fiber_demo = $mol_fiber_demo;
})($ || ($ = {}));
//demo.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        let [app, ...args0] = command.split(' ');
        args = [...args0, ...args];
        this.$mol_log3_come({
            place: '$mol_exec',
            dir: $node.path.relative('', dir),
            message: 'Run',
            command: `${app} ${args.join(' ')}`,
        });
        var res = $node['child_process'].spawnSync(app, args, {
            cwd: $node.path.resolve(dir),
            shell: true,
        });
        if (res.status || res.error)
            return $.$mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = new Buffer('');
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//exec.node.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_jsx_view extends $.$mol_object2 {
        static of(node) {
            return node[this];
        }
        valueOf() {
            const prefix = $.$mol_jsx_prefix;
            const booked = $.$mol_jsx_booked;
            const document = $.$mol_jsx_document;
            try {
                $.$mol_jsx_prefix = this[Symbol.toStringTag];
                $.$mol_jsx_booked = new Set;
                $.$mol_jsx_document = this.ownerDocument;
                return this.render();
            }
            finally {
                $.$mol_jsx_prefix = prefix;
                $.$mol_jsx_booked = booked;
                $.$mol_jsx_document = document;
            }
        }
        render() {
            return $.$mol_fail(new Error('dom_tree() not implemented'));
        }
    }
    $.$mol_jsx_view = $mol_jsx_view;
})($ || ($ = {}));
//view.js.map
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
    let debug;
    function $mol_log_debug(next = debug) {
        return debug = next;
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.node.js.map
;
"use strict";
var $;
(function ($) {
    let filter;
    $.$mol_log_filter = function $mol_log_filter(next = filter) {
        return filter = next;
    };
})($ || ($ = {}));
//log_filter.node.js.map
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
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push($_1.$mol_log_group(name, test));
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            await test(context);
        }
        $_1.$mol_ambient({}).$mol_log3_done({
            place: '$mol_test',
            message: 'Completed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout($_1.$mol_log_group('$mol_test', () => {
            scheduled = false;
            $mol_test_run();
        }), 0);
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $_1.$mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $_1.$mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));
//test.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));
//log3.test.js.map
;
"use strict";
//assert.test.js.map
;
"use strict";
//assert.js.map
;
"use strict";
//deep.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'Make empty div'() {
            $.$mol_assert_equal(($.$mol_jsx_make("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $.$mol_jsx_make("input", { value: '123' });
            $.$mol_assert_equal(dom.outerHTML, '<input value="123">');
            $.$mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $.$mol_jsx_make("div", { classList: ['foo bar'] });
            $.$mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $.$mol_jsx_make("div", { style: { color: 'red' } });
            $.$mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $.$mol_jsx_make("div", { dataset: { foo: 'bar' } });
            $.$mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $.$mol_jsx_make("div", { lang: "ru", hidden: true });
            $.$mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $.$mol_jsx_make("div", null,
                "hello",
                $.$mol_jsx_make("strong", null, "world"),
                "!");
            $.$mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Function as component'() {
            const Button = ({ hint }, target) => {
                return $.$mol_jsx_make("button", { title: hint }, target());
            };
            const dom = $.$mol_jsx_make(Button, { id: "/foo", hint: "click me" }, () => 'hey!');
            $.$mol_assert_equal(dom.outerHTML, '<button title="click me" id="/foo">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $.$mol_jsx_make("div", null,
                    $.$mol_jsx_make(Bar, { id: "/bar" },
                        $.$mol_jsx_make("img", { id: "/icon" })));
            };
            const Bar = (props, icon) => {
                return $.$mol_jsx_make("span", null, icon);
            };
            const dom = $.$mol_jsx_make(Foo, { id: "/foo" });
            $.$mol_assert_equal(dom.outerHTML, '<div id="/foo"><span id="/foo/bar"><img id="/foo/icon"></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $.$mol_jsx_make("div", null,
                    $.$mol_jsx_make("span", { id: "/bar" }),
                    $.$mol_jsx_make("span", { id: "/bar" }));
            };
            $.$mol_assert_fail(() => $.$mol_jsx_make(App, { id: "/foo" }), 'JSX already has tag with id "/bar"');
        },
    });
})($ || ($ = {}));
//make.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'nulls & undefineds'() {
            $.$mol_assert_ok($.$mol_compare_deep(null, null));
            $.$mol_assert_ok($.$mol_compare_deep(undefined, undefined));
            $.$mol_assert_not($.$mol_compare_deep(undefined, null));
            $.$mol_assert_not($.$mol_compare_deep({}, null));
        },
        'number'() {
            $.$mol_assert_ok($.$mol_compare_deep(1, 1));
            $.$mol_assert_ok($.$mol_compare_deep(Number.NaN, Number.NaN));
            $.$mol_assert_not($.$mol_compare_deep(1, 2));
        },
        'Number'() {
            $.$mol_assert_ok($.$mol_compare_deep(Object(1), Object(1)));
            $.$mol_assert_ok($.$mol_compare_deep(Object(Number.NaN), Object(Number.NaN)));
            $.$mol_assert_not($.$mol_compare_deep(Object(1), Object(2)));
        },
        'empty POJOs'() {
            $.$mol_assert_ok($.$mol_compare_deep({}, {}));
        },
        'different POJOs'() {
            $.$mol_assert_not($.$mol_compare_deep({ a: 1 }, { b: 2 }));
        },
        'different POJOs with same keys but different values'() {
            $.$mol_assert_not($.$mol_compare_deep({ a: 1 }, { a: 2 }));
        },
        'different POJOs with different keys but same values'() {
            $.$mol_assert_not($.$mol_compare_deep({}, { a: undefined }));
        },
        'Array'() {
            $.$mol_assert_ok($.$mol_compare_deep([], []));
            $.$mol_assert_ok($.$mol_compare_deep([1, [2]], [1, [2]]));
            $.$mol_assert_not($.$mol_compare_deep([1, 2], [1, 3]));
            $.$mol_assert_not($.$mol_compare_deep([1, 2,], [1, 3, undefined]));
        },
        'same POJO trees'() {
            $.$mol_assert_ok($.$mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
        },
        'different classes with same values'() {
            class Obj {
                constructor() {
                    this.foo = 1;
                }
            }
            const a = new Obj;
            const b = new class extends Obj {
            };
            $.$mol_assert_not($.$mol_compare_deep(a, b));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $.$mol_assert_ok($.$mol_compare_deep(a, b));
        },
        'empty Element'() {
            $.$mol_assert_ok($.$mol_compare_deep($.$mol_jsx_make("div", null), $.$mol_jsx_make("div", null)));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", null), $.$mol_jsx_make("span", null)));
        },
        'Element with attributes'() {
            $.$mol_assert_ok($.$mol_compare_deep($.$mol_jsx_make("div", { dir: "rtl" }), $.$mol_jsx_make("div", { dir: "rtl" })));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", { dir: "rtl" }), $.$mol_jsx_make("div", null)));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", { dir: "rtl" }), $.$mol_jsx_make("div", { dir: "ltr" })));
        },
        'Element with styles'() {
            $.$mol_assert_ok($.$mol_compare_deep($.$mol_jsx_make("div", { style: { color: 'red' } }), $.$mol_jsx_make("div", { style: { color: 'red' } })));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", { style: { color: 'red' } }), $.$mol_jsx_make("div", { style: {} })));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", { style: { color: 'red' } }), $.$mol_jsx_make("div", { style: { color: 'blue' } })));
        },
        'Element with content'() {
            $.$mol_assert_ok($.$mol_compare_deep($.$mol_jsx_make("div", null,
                "foo",
                $.$mol_jsx_make("br", null)), $.$mol_jsx_make("div", null,
                "foo",
                $.$mol_jsx_make("br", null))));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", null,
                "foo",
                $.$mol_jsx_make("br", null)), $.$mol_jsx_make("div", null,
                "bar",
                $.$mol_jsx_make("br", null))));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", null,
                "foo",
                $.$mol_jsx_make("br", null)), $.$mol_jsx_make("div", null,
                "foo",
                $.$mol_jsx_make("hr", null))));
        },
        'Element with handlers'() {
            $.$mol_assert_ok($.$mol_compare_deep($.$mol_jsx_make("div", { onclick: () => 1 }), $.$mol_jsx_make("div", { onclick: () => 1 })));
            $.$mol_assert_not($.$mol_compare_deep($.$mol_jsx_make("div", { onclick: () => 1 }), $.$mol_jsx_make("div", { onclick: () => 2 })));
        },
        'Date'() {
            $.$mol_assert_ok($.$mol_compare_deep(new Date(12345), new Date(12345)));
            $.$mol_assert_not($.$mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $.$mol_assert_ok($.$mol_compare_deep(/\x22/mig, /\x22/mig));
            $.$mol_assert_not($.$mol_compare_deep(/\x22/mig, /\x21/mig));
            $.$mol_assert_not($.$mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Map'() {
            $.$mol_assert_ok($.$mol_compare_deep(new Map, new Map));
            $.$mol_assert_ok($.$mol_compare_deep(new Map([[[1], [2]]]), new Map([[[1], [2]]])));
            $.$mol_assert_not($.$mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
        },
        'Set'() {
            $.$mol_assert_ok($.$mol_compare_deep(new Set, new Set));
            $.$mol_assert_ok($.$mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $.$mol_assert_not($.$mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $.$mol_assert_ok($.$mol_compare_deep(new Uint8Array, new Uint8Array));
            $.$mol_assert_ok($.$mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $.$mol_assert_not($.$mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
    });
})($ || ($ = {}));
//deep.test.js.map
;
"use strict";
var $;
(function ($) {
    const a_stack = [];
    const b_stack = [];
    let cache = null;
    function $mol_compare_deep(a, b) {
        if (Object.is(a, b))
            return true;
        const a_type = typeof a;
        const b_type = typeof b;
        if (a_type !== b_type)
            return false;
        if (a_type === 'function')
            return String(a) === String(b);
        if (a_type !== 'object')
            return false;
        if (!a || !b)
            return false;
        if (a instanceof Error)
            return false;
        if (a['constructor'] !== b['constructor'])
            return false;
        if (a instanceof RegExp)
            return Object.is(String(a), String(b));
        const ref = a_stack.indexOf(a);
        if (ref >= 0) {
            return Object.is(b_stack[ref], b);
        }
        if (!cache)
            cache = new WeakMap;
        let a_cache = cache.get(a);
        if (a_cache) {
            const b_cache = a_cache.get(b);
            if (typeof b_cache === 'boolean')
                return b_cache;
        }
        else {
            a_cache = new WeakMap();
            cache.set(a, a_cache);
        }
        a_stack.push(a);
        b_stack.push(b);
        let result;
        try {
            if (a[Symbol.iterator]) {
                const a_iter = a[Symbol.iterator]();
                const b_iter = b[Symbol.iterator]();
                while (true) {
                    const a_next = a_iter.next();
                    const b_next = b_iter.next();
                    if (a_next.done !== a_next.done)
                        return result = false;
                    if (a_next.done)
                        break;
                    if (!$mol_compare_deep(a_next.value, b_next.value))
                        return result = false;
                }
                return result = true;
            }
            let count = 0;
            for (let key in a) {
                try {
                    if (!$mol_compare_deep(a[key], b[key]))
                        return result = false;
                }
                catch (error) {
                    $.$mol_fail_hidden(new $.$mol_error_mix(`Failed ${JSON.stringify(key)} fields comparison of ${a} and ${b}`, error));
                }
                ++count;
            }
            for (let key in b) {
                --count;
                if (count < 0)
                    return result = false;
            }
            const a_val = a['valueOf']();
            if (Object.is(a_val, a))
                return result = true;
            const b_val = b['valueOf']();
            if (!Object.is(a_val, b_val))
                return result = false;
            return result = true;
        }
        finally {
            a_stack.pop();
            b_stack.pop();
            if (a_stack.length === 0) {
                cache = null;
            }
            else {
                a_cache.set(b, result);
            }
        }
    }
    $.$mol_compare_deep = $mol_compare_deep;
})($ || ($ = {}));
//deep.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'must be false'() {
            $.$mol_assert_not(0);
        },
        'must be true'() {
            $.$mol_assert_ok(1);
        },
        'two must be equal'() {
            $.$mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $.$mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $.$mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $.$mol_assert_unique([3], [3], [3]);
        },
        'two must be alike'() {
            $.$mol_assert_like([3], [3]);
        },
        'three must be alike'() {
            $.$mol_assert_like([3], [3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        $.$mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        $.$mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            if (!ErrorRight)
                return error;
            if (typeof ErrorRight === 'string') {
                if (error.message !== ErrorRight)
                    throw error;
            }
            else {
                if (!(error instanceof ErrorRight))
                    throw error;
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $.$mol_fail(new Error('Not failed'));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (Number.isNaN(args[i]) && Number.isNaN(args[j]))
                    continue;
                if (args[i] !== args[j])
                    $.$mol_fail(new Error(`Not equal\n${args[i]}\n${args[j]}`));
            }
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] === args[j] || (Number.isNaN(args[i]) && Number.isNaN(args[j]))) {
                    $.$mol_fail(new Error(`args[${i}] = args[${j}] = ${args[i]}`));
                }
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    function $mol_assert_like(head, ...tail) {
        for (let value of tail) {
            if ($.$mol_compare_deep(value, head)) {
                head = value;
            }
            else {
                const print = (val) => {
                    if (!val)
                        return val;
                    if (typeof val !== 'object')
                        return val;
                    if ('outerHTML' in val)
                        return val.outerHTML;
                    return JSON.stringify(val);
                };
                return $.$mol_fail(new Error(`Not like\n${print(head)}\n---\n${print(value)}`));
            }
        }
    }
    $.$mol_assert_like = $mol_assert_like;
})($ || ($ = {}));
//assert.js.map
;
"use strict";
//writable.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'run callback'() {
            class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $.$mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $.$mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            let Plus1 = (() => {
                class Plus1 extends $.$mol_wrapper {
                    static wrap(task) {
                        return function (...args) {
                            return Plus1.last = (task.call(this, ...args) || 0) + 1;
                        };
                    }
                }
                Plus1.last = 0;
                return Plus1;
            })();
            let Foo = (() => {
                class Foo {
                    static get two() {
                        return 1;
                    }
                    static set two(next) { }
                }
                __decorate([
                    Plus1.field
                ], Foo, "two", null);
                return Foo;
            })();
            $.$mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $.$mol_assert_equal(Plus1.last, 2);
            $.$mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            let Foo1 = (() => {
                class Foo1 {
                    constructor() {
                        this.level = 2;
                    }
                    pow(a) {
                        return a ** this.level;
                    }
                }
                __decorate([
                    Plus1.method
                ], Foo1.prototype, "pow", null);
                return Foo1;
            })();
            const Foo2 = Foo1;
            const foo = new Foo2;
            $.$mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            let Foo = (() => {
                class Foo {
                    static pow(a) {
                        return a ** this.level;
                    }
                }
                Foo.level = 2;
                __decorate([
                    Plus1.method
                ], Foo, "pow", null);
                return Foo;
            })();
            $.$mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = (() => {
                let Foo = class Foo {
                    constructor(bar) {
                        this.bar = bar;
                    }
                };
                Foo = __decorate([
                    BarInc.class
                ], Foo);
                return Foo;
            })();
            $.$mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));
//wrapper.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $.$mol_object2 {
        constructor(task) {
            super();
            this.task = task;
            this.promise = Promise.resolve();
            this.cancelled = false;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));
//mock.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push($ => {
        $.$mol_after_tick = $_1.$mol_after_mock_commmon;
    });
})($ || ($ = {}));
//tick.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'objects by reference'() {
            $.$mol_assert_equal($.$mol_compare_any({}, {}), false);
        },
        'primitives by value'() {
            $.$mol_assert_equal($.$mol_compare_any('a', 'a'), true);
        },
        'NaN by value'() {
            $.$mol_assert_equal($.$mol_compare_any(Number.NaN, Number.NaN), true);
        },
        'NaN not equal zero'() {
            $.$mol_assert_equal($.$mol_compare_any(Number.NaN, 0), false);
        },
    });
})($ || ($ = {}));
//any.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'return source when same object'() {
            const target = {};
            $.$mol_assert_equal($.$mol_conform(target, target), target);
        },
        'return target when some is not object'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(true, obj), true);
            $.$mol_assert_equal($.$mol_conform(obj, true), obj);
        },
        'return target when some is null'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(null, obj), null);
            $.$mol_assert_equal($.$mol_conform(obj, null), obj);
        },
        'return target when some is undefined'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(undefined, obj), undefined);
            $.$mol_assert_equal($.$mol_conform(obj, undefined), obj);
        },
        'return target when different keys count'() {
            const target = [1, 2, 3];
            const source = [1, 2, 3, undefined];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when array values are strong equal'() {
            const source = [1, 2, 3];
            $.$mol_assert_equal($.$mol_conform([1, 2, 3], source), source);
        },
        'return source when object values are strong equal'() {
            const source = { a: 1, b: 2 };
            $.$mol_assert_equal($.$mol_conform({ a: 1, b: 2 }, source), source);
        },
        'return target when some values are not equal'() {
            const target = [1, 2, 3];
            const source = [1, 2, 5];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when values are deep equal'() {
            const source = { foo: { bar: 1 } };
            $.$mol_assert_equal($.$mol_conform({ foo: { bar: 1 } }, source), source);
        },
        'return target with equal values from source and not equal from target'() {
            const source = { foo: { xxx: 1 }, bar: { xxx: 2 } };
            const target = { foo: { xxx: 1 }, bar: { xxx: 3 } };
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.foo, source.foo);
            $.$mol_assert_equal(result.bar, target.bar);
        },
        'return target when equal but with different class'() {
            const target = { '0': 1 };
            $.$mol_assert_equal($.$mol_conform(target, [1]), target);
        },
        'return target when conformer for class is not defined'() {
            const Obj = class {
            };
            const source = new Obj;
            const target = new Obj;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
        },
        'return target when has cyclic reference'() {
            const source = { foo: {} };
            source['self'] = source;
            const target = { foo: {} };
            target['self'] = target;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result['self'], target);
            $.$mol_assert_equal(result.foo, source.foo);
        },
        'return source when equal dates'() {
            const source = new Date(12345);
            const target = new Date(12345);
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return source when equal regular expressions'() {
            const source = /\x22/mig;
            const target = /\x22/mig;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return cached value if already conformed'() {
            const source = { foo: { xxx: 1 }, bar: { xxx: 3 } };
            const target = { foo: { xxx: 2 }, bar: { xxx: 3 } };
            const result = $.$mol_conform(target, source);
            target.foo.xxx = 1;
            $.$mol_assert_equal($.$mol_conform(target.foo, source.foo), target.foo);
        },
        'skip readlony fields'() {
            const source = { foo: {}, bar: {} };
            const target = { foo: {}, bar: {} };
            Object.defineProperty(target, 'bar', { value: {}, writable: false });
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.foo, source.foo);
            $.$mol_assert_equal(result.bar, target.bar);
        },
        'object with NaN'() {
            const source = { foo: Number.NaN };
            const target = { foo: Number.NaN };
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'array with NaN'() {
            const source = [Number.NaN];
            const target = [Number.NaN];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
    });
})($ || ($ = {}));
//conform.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'trim array'() {
            const array = [undefined, null, 0, false, null, undefined, undefined];
            const correct = [undefined, null, 0, false, null];
            $.$mol_array_trim(array);
            $.$mol_assert_like(array, correct);
        }
    });
})($ || ($ = {}));
//trim.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push(async ($) => {
        await $_1.$mol_fiber_warp();
        $_1.$mol_fiber.deadline = Date.now() + 100;
    });
})($ || ($ = {}));
//fiber.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test({
        'tree parsing'() {
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $_1.$mol_assert_equal($_1.$mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting'() {
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b c d').insert(new $_1.$mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b').insert(new $_1.$mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b c d').insert(new $_1.$mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b').insert(new $_1.$mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b c d').insert(new $_1.$mol_tree, null, null, null).toString(), 'a b \\\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromString('a b').insert(new $_1.$mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        },
        'fromJSON'() {
            $_1.$mol_assert_equal($_1.$mol_tree.fromJSON([]).toString(), '/\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromJSON([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromJSON([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromJSON(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $_1.$mol_assert_equal($_1.$mol_tree.fromJSON({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
        'toJSON'() {
            $_1.$mol_assert_equal(JSON.stringify($_1.$mol_tree.fromString('/\n').sub[0]), '[]');
            $_1.$mol_assert_equal(JSON.stringify($_1.$mol_tree.fromString('/\n\tfalse\n\ttrue\n').sub[0]), '[false,true]');
            $_1.$mol_assert_equal(JSON.stringify($_1.$mol_tree.fromString('/\n\t0\n\t1\n\t2.3\n').sub[0]), '[0,1,2.3]');
            $_1.$mol_assert_equal(JSON.stringify($_1.$mol_tree.fromString('/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n').sub[0]), '["","foo","bar\\nbaz"]');
            $_1.$mol_assert_equal(JSON.stringify($_1.$mol_tree.fromString('*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n').sub[0]), '{"foo":false,"bar\\nbaz":"lol"}');
        },
        'hack'() {
            const res = $_1.$mol_tree.fromString(`foo bar xxx`).hack({
                '': (tree, context) => [tree.hack(context)],
                'bar': (tree, context) => [tree.hack(context).clone({ type: '777' })],
            });
            $_1.$mol_assert_equal(res.toString(), new $_1.$mol_tree({ type: 'foo 777 xxx' }).toString());
        },
        'errors handling'($) {
            const errors = [];
            let Tree = (() => {
                class Tree extends $_1.$mol_tree {
                }
                Tree.$ = $.$mol_ambient({
                    $mol_fail: error => errors.push(error.message)
                });
                return Tree;
            })();
            Tree.fromString(`
				\t \tfoo
				bar \\data
			`, 'test');
            $_1.$mol_assert_like(errors, ['Syntax error at test:2\n \tfoo']);
        },
    });
})($ || ($ = {}));
//tree.test.js.map
;
"use strict";
//equals.test.js.map
;
"use strict";
//equals.js.map
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
var $;
(function ($) {
    $.$mol_test({
        'Attach to document'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            $.$mol_jsx_attach(doc, () => $.$mol_jsx_make("body", { id: "/foo" }, "bar"));
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
    });
})($ || ($ = {}));
//attach.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_jsx_attach(next, action) {
        const prev = $.$mol_jsx_document;
        try {
            $.$mol_jsx_document = next;
            return action();
        }
        finally {
            $.$mol_jsx_document = prev;
        }
    }
    $.$mol_jsx_attach = $mol_jsx_attach;
})($ || ($ = {}));
//attach.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'init with overload'() {
            class X extends $.$mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $_1.$mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_defer = (() => {
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
        return $mol_defer;
    })();
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push($ => {
        $.$mol_after_timeout = $_1.$mol_after_mock_timeout;
    });
})($ || ($ = {}));
//timeout.test.js.map
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
    class $mol_after_frame extends $.$mol_after_timeout {
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//frame.node.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push($ => {
        $.$mol_after_frame = $_1.$mol_after_mock_commmon;
    });
})($ || ($ = {}));
//frame.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test({
        'Value has js-path name'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get title() { return new $_1.$mol_object2; }
                }
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "title", null);
                return App;
            })();
            $_1.$mol_assert_equal(`${App.title}`, 'App.title');
        },
        'Simple property'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                }
                App.value = 1;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "value", void 0);
                return App;
            })();
            $_1.$mol_assert_equal(App.value, 1);
            App.value = 2;
            $_1.$mol_assert_equal(App.value, 2);
        },
        'Instant actualization'() {
            let Source = (() => {
                class Source extends $_1.$mol_object2 {
                    constructor() {
                        super(...arguments);
                        this.value = 1;
                    }
                }
                __decorate([
                    $_1.$mol_atom2_field
                ], Source.prototype, "value", void 0);
                return Source;
            })();
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get source() { return Source.create(); }
                    static get value() { return this.source.value + 1; }
                }
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "source", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "value", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.value, 2);
            App.source.value = 2;
            $_1.$mol_assert_equal(App.value, 3);
        },
        'Access to cached value'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get value() { return 1; }
                }
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "value", null);
                return App;
            })();
            $_1.$mol_assert_equal($_1.$mol_atom2_value(() => App.value), undefined);
            $_1.$mol_assert_equal(App.value, 1);
            $_1.$mol_assert_equal($_1.$mol_atom2_value(() => App.value), 1);
        },
        'Do not recalc slaves on equal changes'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get result() { return this.first[0] + this.counter++; }
                }
                App.first = [1];
                App.counter = 0;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 1);
            App.first = [1];
            $_1.$mol_assert_equal(App.result, 1);
        },
        'Do not recalc grand slave on equal direct slave result '() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get second() { return Math.abs(this.first); }
                    static get result() { return this.second + ++this.counter; }
                }
                App.first = 1;
                App.counter = 0;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "second", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 2);
            App.first = -1;
            $_1.$mol_assert_equal(App.result, 2);
        },
        'Recalc when [not changed master] changes [following master]'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get second() {
                        this.third = this.first;
                        return 0;
                    }
                    static get result() { return this.second + this.third + ++this.counter; }
                }
                App.first = 1;
                App.third = 0;
                App.counter = 0;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "second", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "third", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 2);
            App.first = 5;
            $_1.$mol_assert_equal(App.result, 7);
        },
        'Branch switching'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get second() { return 2; }
                    static get result() {
                        return (this.condition ? this.first : this.second) + this.counter++;
                    }
                }
                App.first = 1;
                App.condition = true;
                App.counter = 0;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "second", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "condition", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 1);
            App.condition = false;
            $_1.$mol_assert_equal(App.result, 3);
            App.first = 10;
            $_1.$mol_assert_equal(App.result, 3);
        },
        'Forbidden self invalidation'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get second() { return this.first + 1; }
                    static get result() {
                        this.second;
                        return this.first++;
                    }
                }
                App.first = 1;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "second", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_fail(() => App.result);
        },
        'Side effect inside computation'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static increase() { return ++this.first; }
                    static get result() {
                        return this.increase() + 1;
                    }
                }
                App.first = 1;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", void 0);
                __decorate([
                    $_1.$mol_fiber.method
                ], App, "increase", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 3);
        },
        'Forbidden cyclic dependency'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get first() { return this.second - 1; }
                    static get second() { return this.first + 1; }
                }
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "first", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "second", null);
                return App;
            })();
            $_1.$mol_assert_fail(() => App.first);
        },
        'Forget sub fibers on complete'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static count() { return this.counter++; }
                    static get result() { return this.count() + this.data; }
                }
                App.counter = 0;
                App.data = 1;
                __decorate([
                    $_1.$mol_fiber.method
                ], App, "count", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "data", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 1);
            App.data = 2;
            $_1.$mol_assert_equal(App.result, 3);
        },
        async 'Automatic destroy owned value on self destruction'() {
            let counter = 0;
            class Having extends $_1.$mol_object2 {
                destructor() { counter++; }
            }
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get having() { return Having.create(); }
                    static get result() {
                        if (this.condition)
                            this.having;
                        return 0;
                    }
                }
                App.condition = true;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "having", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "condition", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            App.result;
            App.condition = false;
            App.result;
            $_1.$mol_assert_equal(counter, 0);
            await $_1.$mol_fiber_warp();
            $_1.$mol_assert_equal(counter, 1);
        },
        async 'Do not destroy putted value'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get target() {
                        return this.condition ? this.source : 0;
                    }
                }
                App.condition = true;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "source", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "condition", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "target", null);
                return App;
            })();
            App.source = 1;
            $_1.$mol_assert_equal(App.target, 1);
            App.condition = false;
            $_1.$mol_assert_equal(App.target, 0);
            await $_1.$mol_fiber_warp();
            App.condition = true;
            $_1.$mol_assert_equal(App.target, 1);
        },
        'Restore after error'() {
            let App = (() => {
                class App extends $_1.$mol_object2 {
                    static get broken() {
                        if (this.condition)
                            $_1.$mol_fail(new Error('test error'));
                        return 1;
                    }
                    static get result() { return this.broken; }
                }
                App.condition = false;
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "condition", void 0);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "broken", null);
                __decorate([
                    $_1.$mol_atom2_field
                ], App, "result", null);
                return App;
            })();
            $_1.$mol_assert_equal(App.result, 1);
            App.condition = true;
            $_1.$mol_assert_fail(() => App.result);
            App.condition = false;
            $_1.$mol_assert_equal(App.result, 1);
        },
        async 'auto fresh only when alive'($) {
            let state = 1;
            const monitor = new $.$mol_atom2;
            monitor.calculate = () => {
                new $.$mol_after_frame($_1.$mol_atom2.current.fresh);
                return state;
            };
            $_1.$mol_assert_equal(monitor.get(), 1);
            state = 2;
            $_1.$mol_assert_equal(monitor.get(), 1);
            $.$mol_after_mock_warp();
            $_1.$mol_assert_equal(monitor.get(), 2);
            state = 3;
            $_1.$mol_assert_equal(monitor.get(), 2);
            monitor.destructor();
            $_1.$mol_assert_equal(monitor.value, undefined);
            $.$mol_after_mock_warp();
            await $.$mol_fiber_warp();
            $_1.$mol_assert_equal(monitor.value, undefined);
        },
    });
})($ || ($ = {}));
//atom2.test.js.map
;
"use strict";
var $;
(function ($) {
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
    let $mol_atom2 = (() => {
        class $mol_atom2 extends $.$mol_fiber {
            constructor() {
                super(...arguments);
                this.slaves = [];
                this._value = undefined;
                this._error = null;
            }
            static get current() {
                const atom = $.$mol_fiber.current;
                if (atom instanceof $mol_atom2)
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
                if (!(master instanceof $mol_atom2))
                    return;
                const master_index = this.masters.length;
                const slave_index = this.masters[cursor + 1] + 1;
                master.slaves[slave_index] = master_index;
                this.masters.push(master, this.masters[cursor + 1]);
            }
            get() {
                if ($mol_atom2.cached)
                    return this.value;
                const value = super.get();
                if (value === undefined)
                    $.$mol_fail(new Error(`Not defined: ${this}`));
                return value;
            }
            pull() {
                if (this.cursor === 0)
                    return super.pull();
                if ($mol_atom2.logs)
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Check doubt masters',
                    });
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
                    if ($mol_atom2.logs)
                        this.$.$mol_log3_done({
                            place: this,
                            message: 'Obsoleted while checking',
                        });
                    return super.pull();
                }
                if ($mol_atom2.logs)
                    this.$.$mol_log3_done({
                        place: this,
                        message: 'Masters not changed',
                    });
                this.cursor = -2;
            }
            get value() { return this._value; }
            set value(next) {
                const prev = this._value;
                if (prev && this.$.$mol_owning_check(this, prev))
                    prev.destructor();
                if (next && this.$.$mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch (_a) { }
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
                if (this.masters[master_index] instanceof $mol_atom2) {
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
                if ($mol_atom2.logs)
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Leads',
                        slave,
                    });
                const slave_index = this.slaves.length;
                this.slaves[slave_index] = slave;
                this.slaves[slave_index + 1] = master_index;
                return slave_index;
            }
            dislead(slave_index) {
                if (slave_index < 0)
                    return;
                if ($mol_atom2.logs)
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Disleads',
                        slave: this.slaves[slave_index],
                    });
                this.slaves[slave_index] = undefined;
                this.slaves[slave_index + 1] = undefined;
                $.$mol_array_trim(this.slaves);
                if (this.cursor > -3 && this.alone)
                    $mol_atom2.reap(this);
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
                if ($mol_atom2.logs)
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Obsoleted',
                    });
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
                if ($mol_atom2.logs)
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Doubted',
                    });
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
                return () => {
                    if (this.cursor !== -2)
                        return;
                    this.cursor = 0;
                    $.$mol_fiber_solid.run(() => this.update());
                };
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
                if ($mol_atom2.logs)
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Destructed'
                    });
                this.cursor = -3;
                for (let index = 0; index < this.masters.length; index += 2) {
                    this.complete_master(index);
                }
            }
        }
        $mol_atom2.logs = false;
        $mol_atom2.cached = false;
        $mol_atom2.reap_task = null;
        $mol_atom2.reap_queue = [];
        return $mol_atom2;
    })();
    $.$mol_atom2 = $mol_atom2;
})($ || ($ = {}));
//atom2.js.map
;
"use strict";
//result.test.js.map
;
"use strict";
//result.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_mem_force = (() => {
        class $mol_mem_force extends Object {
            constructor() {
                super();
                this.$mol_mem_force = true;
            }
            static toString() { return this.name; }
        }
        $mol_mem_force.$mol_mem_force = true;
        return $mol_mem_force;
    })();
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
    $.$mol_test({
        'Property method'() {
            let App = (() => {
                class App extends $.$mol_object2 {
                    static value(next = 1) { return next + 1; }
                }
                __decorate([
                    $.$mol_mem
                ], App, "value", null);
                return App;
            })();
            $.$mol_assert_equal(App.value(), 2);
            App.value(2);
            $.$mol_assert_equal(App.value(), 3);
        },
        'auto sync of properties'() {
            let X = (() => {
                class X extends $.$mol_object2 {
                    foo(next) {
                        return next || 1;
                    }
                    bar() {
                        return this.foo() + 1;
                    }
                    xxx() {
                        return this.bar() + 1;
                    }
                }
                __decorate([
                    $.$mol_mem
                ], X.prototype, "foo", null);
                __decorate([
                    $.$mol_mem
                ], X.prototype, "bar", null);
                __decorate([
                    $.$mol_mem
                ], X.prototype, "xxx", null);
                return X;
            })();
            const x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        async 'must be deferred destroyed when no longer referenced'() {
            let foo;
            let foo_destroyed = false;
            let B = (() => {
                class B extends $.$mol_object2 {
                    showing(next) {
                        if (next === void 0)
                            return true;
                        return next;
                    }
                    foo() {
                        return foo = new class extends $.$mol_object {
                            destructor() {
                                foo_destroyed = true;
                            }
                        };
                    }
                    bar() {
                        return this.showing() ? this.foo() : null;
                    }
                }
                __decorate([
                    $.$mol_mem
                ], B.prototype, "showing", null);
                __decorate([
                    $.$mol_mem
                ], B.prototype, "foo", null);
                __decorate([
                    $.$mol_mem
                ], B.prototype, "bar", null);
                return B;
            })();
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            await $.$mol_fiber_warp();
            $.$mol_assert_ok(foo_destroyed);
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        async 'wait for data'() {
            let Test = (() => {
                class Test extends $.$mol_object2 {
                    source() {
                        return $.$mol_fiber_sync(() => new Promise(done => done('Jin')))();
                    }
                    middle() {
                        return this.source();
                    }
                    target() {
                        return this.middle();
                    }
                }
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "source", null);
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "middle", null);
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "target", null);
                return Test;
            })();
            const t = new Test;
            $.$mol_assert_fail(() => t.target().valueOf(), Promise);
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $.$mol_atom2_value;
    function $mol_mem_persist() {
        const atom = $.$mol_atom2.current;
        if (!atom)
            return;
        if (atom.hasOwnProperty('destructor'))
            return;
        atom.destructor = () => { };
    }
    $.$mol_mem_persist = $mol_mem_persist;
    function $mol_mem(proto, name, descr) {
        const orig = descr.value;
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
            cache2.calculate = orig.bind(host);
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
        function value(next, force) {
            if (next === undefined) {
                const cache = get_cache(this);
                if (force === $.$mol_mem_force_cache)
                    return cache.obsolete(Number.NaN);
                if ($.$mol_atom2.current)
                    return cache.get();
                else
                    return $.$mol_fiber.run(() => cache.get());
            }
            return $.$mol_fiber.run(() => {
                if (force === $.$mol_mem_force_fail)
                    return get_cache(this).fail(next);
                if (force !== $.$mol_mem_force_cache)
                    next = orig.call(this, next);
                return get_cache(this).put(next);
            });
        }
        return Object.assign(Object.assign({}, descr || {}), { value: Object.assign(value, { orig }) });
    }
    $.$mol_mem = $mol_mem;
})($ || ($ = {}));
//mem.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'const returns stored value'() {
            const foo = { bar: $.$mol_const(Math.random()) };
            $.$mol_assert_equal(foo.bar(), foo.bar());
            $.$mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//const.test.js.map
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
(function ($) {
    $.$mol_test({
        async 'Autorun'() {
            let App = (() => {
                class App extends $.$mol_object2 {
                    static get init() {
                        ++this.counter;
                        return this.state;
                    }
                }
                App.state = 1;
                App.counter = 0;
                __decorate([
                    $.$mol_atom2_field
                ], App, "state", void 0);
                __decorate([
                    $.$mol_atom2_field
                ], App, "init", null);
                return App;
            })();
            const autorun = $.$mol_atom2_autorun(() => App.init);
            try {
                await $.$mol_fiber_warp();
                $.$mol_assert_equal(App.counter, 1);
                App.state = 2;
                $.$mol_assert_equal(App.counter, 1);
                await $.$mol_fiber_warp();
                $.$mol_assert_equal(App.counter, 2);
                App.state = 3;
            }
            finally {
                autorun.destructor();
            }
            App.state = 4;
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(App.counter, 2);
        },
    });
})($ || ($ = {}));
//autorun.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_autorun(calculate) {
        return $.$mol_atom2.create(atom => {
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
    $.$mol_test({
        'Class as component'() {
            class Foo extends $.$mol_jsx_view {
                constructor() {
                    super(...arguments);
                    this.title = '';
                }
                render() {
                    return $.$mol_jsx_make("div", null,
                        this.title,
                        " ",
                        this.childNodes.join('-'));
                }
            }
            const dom = $.$mol_jsx_make(Foo, { id: "/foo", title: "bar" },
                "xxx",
                123);
            $.$mol_assert_equal(dom.outerHTML, '<div id="/foo">bar xxx-123</div>');
        },
        'View by element'() {
            class Br extends $.$mol_jsx_view {
                render() {
                    view = this;
                    return $.$mol_jsx_make("br", { id: "/foo" });
                }
            }
            let view;
            $.$mol_assert_equal(Br.of($.$mol_jsx_make(Br, null)), view);
        },
        'Attached view rerender'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            class Title extends $.$mol_jsx_view {
                constructor() {
                    super(...arguments);
                    this.value = 'foo';
                }
                render() {
                    return $.$mol_jsx_make("div", null, this.value);
                }
            }
            const dom = $.$mol_jsx_attach(doc, () => $.$mol_jsx_make(Title, { id: "/foo" }));
            const title = Title.of(dom);
            $.$mol_assert_equal(title.ownerDocument, doc);
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">foo</body></html>');
            title.value = 'bar';
            title.valueOf();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
        async 'Reactive attached view'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            let Task = (() => {
                class Task {
                    title(next) { return next || 'foo'; }
                }
                __decorate([
                    $.$mol_mem
                ], Task.prototype, "title", null);
                return Task;
            })();
            let App = (() => {
                class App extends $.$mol_jsx_view {
                    task() { return new Task; }
                    valueOf() {
                        return super.valueOf();
                    }
                    render() {
                        return $.$mol_jsx_make("div", null, this.task().title());
                    }
                }
                __decorate([
                    $.$mol_mem
                ], App.prototype, "task", null);
                __decorate([
                    $.$mol_mem
                ], App.prototype, "valueOf", null);
                return App;
            })();
            const task = new Task;
            $.$mol_atom2_autorun(() => $.$mol_jsx_attach(doc, () => $.$mol_jsx_make(App, { id: "/foo", task: () => task })));
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">foo</body></html>');
            task.title('bar');
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'equal paths'() {
            const diff = $.$mol_diff_path([1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]);
            $.$mol_assert_like(diff, {
                prefix: [1, 2, 3, 4],
                suffix: [[], [], []],
            });
        },
        'different suffix'() {
            const diff = $.$mol_diff_path([1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 5, 4]);
            $.$mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [3, 5], [5, 4]],
            });
        },
        'one contains other'() {
            const diff = $.$mol_diff_path([1, 2, 3, 4], [1, 2], [1, 2, 3]);
            $.$mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [], [3]],
            });
        },
        'fully different'() {
            const diff = $.$mol_diff_path([1, 2], [3, 4], [5, 6]);
            $.$mol_assert_like(diff, {
                prefix: [],
                suffix: [[1, 2], [3, 4], [5, 6]],
            });
        },
    });
})($ || ($ = {}));
//path.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_diff_path(...paths) {
        const limit = Math.min(...paths.map(path => path.length));
        lookup: for (var i = 0; i < limit; ++i) {
            const first = paths[0][i];
            for (let j = 1; j < paths.length; ++j) {
                if (paths[j][i] !== first)
                    break lookup;
            }
        }
        return {
            prefix: paths[0].slice(0, i),
            suffix: paths.map(path => path.slice(i)),
        };
    }
    $.$mol_diff_path = $mol_diff_path;
})($ || ($ = {}));
//path.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_error_mix extends Error {
        constructor(message, ...errors) {
            super(message);
            this.errors = errors;
            if (errors.length) {
                const stacks = [...errors.map(error => error.message), this.stack];
                const diff = $.$mol_diff_path(...stacks.map(stack => {
                    if (!stack)
                        return [];
                    return stack.split('\n').reverse();
                }));
                const head = diff.prefix.reverse().join('\n');
                const tails = diff.suffix.map(path => path.reverse().map(line => line.replace(/^(?!\s+at)/, '\tat (.) ')).join('\n')).join('\n\tat (.) -----\n');
                this.stack = `Error: ${this.constructor.name}\n\tat (.) /"""\\\n${tails}\n\tat (.) \\___/\n${head}`;
                this.message += errors.map(error => '\n' + error.message).join('');
            }
        }
        toJSON() {
            return this.message;
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));
//mix.js.map

//# sourceMappingURL=node.test.js.map
