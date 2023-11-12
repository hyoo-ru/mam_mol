"use strict";
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

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
//mol/log3/log3.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//mol/ambient/ambient.ts
;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));
//mol/delegate/delegate.ts
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
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
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
//mol/owning/owning.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            if (Symbol.toStringTag in this)
                return this[Symbol.toStringTag];
            return this.name;
        }
        destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '()';
        }
        toJSON() {
            return this.toString();
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//mol/object2/object2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = `${this.uri}#${this.row}:${this.col}/${this.length}`;
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message}${this}`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(`Begin value '${begin}' out of range ${this}`);
            if (end < 0 || end > len)
                this.$.$mol_fail(`End value '${end}' out of range ${this}`);
            if (end < begin)
                this.$.$mol_fail(`End value '${end}' can't be less than begin value ${this}`);
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));
//mol/span/span.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));
//mol/tree2/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
                }
                return this.clone(sub);
            }
            else if (typeof type === 'number') {
                const sub = this.kids.slice();
                sub[type] = (sub[type] || this.list([]))
                    .insert(value, ...path.slice(1));
                return this.clone(sub.filter(Boolean));
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .map(item => item.insert(value, ...path.slice(1)))
                    .filter(Boolean);
                return this.clone(kids);
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => {
                let handle = belt[child.type] || belt[''];
                if (!handle || handle === Object.prototype[child.type]) {
                    handle = (input, belt, context) => [
                        input.clone(input.hack(belt, context), context.span)
                    ];
                }
                try {
                    return handle(child, belt, context);
                }
                catch (error) {
                    error.message += `\n${child.clone([])}${child.span}`;
                    $mol_fail_hidden(error);
                }
            }));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));
//mol/tree2/tree2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));
//mol/error/syntax/syntax.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));
//mol/tree2/from/string/string.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            return $mol_tree2.data(String.fromCharCode(...buf), [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));
//mol/tree2/from/json/json.ts
;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));
//mol/term/color/color.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { time: new Date().toISOString(), ...event };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));
//mol/log3/log3.node.ts
;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));
//mol/wire/cursor/cursor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.pop();
            this.data.pop();
            if (this.data.length === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));
//mol/wire/wire.ts
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
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
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        if (typeof obj !== 'object' && typeof obj !== 'function')
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
        return $mol_dev_format_element('span', {
            'vertical-align': '8%',
            ...style,
        }, ...content);
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
//mol/dev/format/format.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
                this.data.pop();
                this.data.pop();
            }
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let tail = 0;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.data.length - 2, cursor);
                    this.data.pop();
                    this.data.pop();
                }
                else {
                    ++tail;
                }
            }
            for (; tail; --tail) {
                this.data.pop();
                this.data.pop();
            }
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/pub/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
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
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        return val && typeof val.then === 'function';
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));
//mol/promise/like/like.ts
;
"use strict";
var $;
(function ($) {
    const handled = new WeakSet();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_frame(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        [Symbol.toStringTag];
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(cursor + ' '), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    const put = (res) => {
                        if (this.cache === result)
                            this.put(res);
                        return res;
                    };
                    result = Object.assign(result.then(put, put), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result) && !handled.has(result)) {
                    result = Object.assign(result.finally(() => {
                        if (this.cache === result)
                            this.absorb();
                    }), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    sub.destructor();
                };
            });
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));
//mol/wire/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && left.stack === right.stack;
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap([[right, true]]);
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));
//mol/compare/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                return new $mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}(#)`, task, host, args);
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));
//mol/wire/task/task.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));
//mol/wire/async/async.ts
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//mol/func/name/name.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));
//mol/guid/guid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    function $mol_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));
//mol/key/key.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));
//mol/wire/method/method.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
//mol/type/foot/foot.ts
;
"use strict";
var $;
(function ($) {
    const catched = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.get(error))
            return false;
        catched.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//mol/fail/catch/catch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = `${prefix}.${field}`;
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const id = `${prefix}.${task.name}(${$mol_key(key).replace(/^"|"$/g, "'")})`;
            if (dict) {
                const existen = dict.get(id);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(id, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            const prev = this.cache;
            if ($mol_owning_check(this, prev)) {
                prev.destructor();
            }
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete(this[Symbol.toStringTag]);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));
//mol/wire/atom/atom.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));
//mol/wire/solo/solo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));
//mol/wire/plex/plex.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
//mol/mem/mem.ts
;
"use strict";
//mol/charset/encoding/encoding.ts
;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));
//mol/charset/decode/decode.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        const mod = target.require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        const path = target.require('path');
        const fs = target.require('fs');
        let dir = path.resolve('.');
        const suffix = `./node_modules/${name}`;
        const $$ = $;
        while (!fs.existsSync(path.join(dir, suffix))) {
            const parent = path.resolve(dir, '..');
            if (parent === dir) {
                $$.$mol_exec('.', 'npm', 'install', '--omit=dev', name);
                try {
                    $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '@types/' + name);
                }
                catch { }
                break;
            }
            else {
                dir = parent;
            }
        }
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);
//node/node.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));
//mol/env/env.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));
//mol/env/env.node.ts
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
            env: this.$mol_env(),
        });
        if (res.status || res.error)
            return $mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = Buffer.from([]);
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//mol/exec/exec.node.ts
;
"use strict";
var $;
(function ($) {
    const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder;
    const encoder = new TextEncoder();
    function $mol_charset_encode(value) {
        return encoder.encode(value);
    }
    $.$mol_charset_encode = $mol_charset_encode;
})($ || ($ = {}));
//mol/charset/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file_not_found extends Error {
    }
    $.$mol_file_not_found = $mol_file_not_found;
    class $mol_file extends $mol_object {
        static absolute(path) {
            throw new Error('Not implemented yet');
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        reset() {
            try {
                this.stat(null);
            }
            catch (error) {
                if (error instanceof $mol_file_not_found)
                    return;
                return $mol_fail_hidden(error);
            }
        }
        version() {
            return this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
        }
        watcher() {
            console.warn('$mol_file_web.watcher() not implemented');
            return {
                destructor() { }
            };
        }
        exists(next) {
            let exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next)
                this.parent().exists(true);
            this.ensure();
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (virt) {
                const now = new Date;
                this.stat({
                    type: 'file',
                    size: 0,
                    atime: now,
                    mtime: now,
                    ctime: now,
                }, 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer(undefined));
            }
            else {
                const buffer = next === undefined ? undefined : $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//mol/file/file.ts
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//mol/const/const.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));
//mol/wire/probe/probe.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));
//mol/compare/array/array.ts
;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    class $mol_file_node extends $mol_file {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher() {
            const watcher = $node.chokidar.watch(this.path(), {
                persistent: true,
                ignored: /(^\.|___$)/,
                depth: 0,
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                },
            });
            watcher
                .on('all', (type, path) => {
                const file = $mol_file.relative(path.replace(/\\/g, '/'));
                file.reset();
                if (type === 'change') {
                    this.stat(null);
                }
                else {
                    file.parent().reset();
                }
            })
                .on('error', $mol_fail_log);
            return {
                destructor() {
                    watcher.close();
                }
            };
        }
        stat(next, virt) {
            let stat = next;
            const path = this.path();
            this.parent().watcher();
            if (virt)
                return next;
            try {
                stat = next ?? stat_convert($node.fs.statSync(path, { throwIfNoEntry: false }));
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    error = new $mol_file_not_found(`File not found`);
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return stat;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path);
            }
            catch (e) {
                e.message += '\n' + path;
                this.$.$mol_fail_hidden(e);
            }
        }
        buffer(next) {
            const path = this.path();
            if (next === undefined) {
                if (!this.stat())
                    return new Uint8Array;
                try {
                    const prev = $mol_mem_cached(() => this.buffer());
                    next = buffer_normalize($node.fs.readFileSync(path));
                    if (prev !== undefined && !$mol_compare_array(prev, next)) {
                        this.$.$mol_log3_rise({
                            place: `$mol_file_node..buffer()`,
                            message: 'Changed',
                            path: this.relate(),
                        });
                    }
                    return next;
                }
                catch (error) {
                    error.message += '\n' + path;
                    return this.$.$mol_fail_hidden(error);
                }
            }
            this.parent().exists(true);
            const now = new Date;
            this.stat({
                type: 'file',
                size: next.length,
                atime: now,
                mtime: now,
                ctime: now,
            }, 'virt');
            try {
                $node.fs.writeFileSync(path, next);
            }
            catch (error) {
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return next;
        }
        sub() {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            const path = this.path();
            this.stat();
            try {
                return $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor.relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        append(next) {
            const path = this.path();
            try {
                $node.fs.appendFileSync(path, next);
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "buffer", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node, "absolute", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));
//mol/file/file.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_tree_convert = Symbol('$mol_tree_convert');
    class $mol_tree extends $mol_object2 {
        type;
        data;
        sub;
        baseUri;
        row;
        col;
        length;
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
            return new $mol_tree({
                baseUri: this.baseUri,
                row: this.row,
                col: this.col,
                length: this.length,
                ...config,
            });
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
                        json = { ...json, name, message, stack };
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
            const numb = Number(this.type);
            if (!Number.isNaN(numb) || this.type === 'NaN')
                return numb;
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
                    $mol_fail(child.error('Handler not defined'));
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
//mol/tree/tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_error extends Error {
        spans;
        constructor(message, spans) {
            super(message);
            this.spans = spans;
        }
        toJSON() {
            return {
                message: this.message,
                spans: this.spans
            };
        }
    }
    $.$mol_view_tree2_error = $mol_view_tree2_error;
    class $mol_view_tree2_error_suggestions {
        suggestions;
        constructor(suggestions) {
            this.suggestions = suggestions;
        }
        toString() {
            return this.suggestions.map(suggestion => `\`${suggestion}\``).join(', ');
        }
        toJSON() {
            return this.suggestions;
        }
    }
    $.$mol_view_tree2_error_suggestions = $mol_view_tree2_error_suggestions;
    function $mol_view_tree2_error_str(strings, ...parts) {
        const spans = [];
        for (const part of parts) {
            if (part instanceof $mol_span)
                spans.push(part);
            if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span)
                spans.push(...part);
        }
        return new $mol_view_tree2_error(join(strings, parts), spans);
    }
    $.$mol_view_tree2_error_str = $mol_view_tree2_error_str;
    function join(strings, objects) {
        let result = '';
        let obj_pos = 0;
        let obj_len = objects.length;
        for (const str of strings) {
            result += str;
            if (obj_pos < obj_len) {
                const obj = objects[obj_pos++];
                if (Array.isArray(obj))
                    result += obj.map(item => `\`${item}\``).join(', ');
                else
                    result += `\`${String(obj)}\``;
            }
        }
        return result;
    }
})($ || ($ = {}));
//mol/view/tree2/error.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_child(tree) {
        if (tree.kids.length === 0) {
            return this.$mol_fail($mol_view_tree2_error_str `Required one child at ${tree.span}`);
        }
        if (tree.kids.length > 1) {
            return this.$mol_fail($mol_view_tree2_error_str `Should be only one child at ${tree.span}`);
        }
        return tree.kids[0];
    }
    $.$mol_view_tree2_child = $mol_view_tree2_child;
})($ || ($ = {}));
//mol/view/tree2/child.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_classes(defs) {
        return defs.clone(defs.hack({
            '-': () => []
        }));
    }
    $.$mol_view_tree2_classes = $mol_view_tree2_classes;
})($ || ($ = {}));
//mol/view/tree2/classes.ts
;
"use strict";
var $;
(function ($_1) {
    class $mol_view_tree2_context extends $mol_object2 {
        parents;
        locales;
        methods;
        types;
        added_nodes;
        array;
        constructor($, parents, locales, methods, types = true, added_nodes = new Map(), array) {
            super();
            this.parents = parents;
            this.locales = locales;
            this.methods = methods;
            this.types = types;
            this.added_nodes = added_nodes;
            this.array = array;
            this.$ = $;
        }
        clone(prefixes, array) {
            return new this.$.$mol_view_tree2_context(this.$, prefixes, this.locales, this.methods, this.types, this.added_nodes, array);
        }
        parent(prefix) {
            const parents = this.parents.slice();
            parents.push(prefix);
            return this.clone(parents, this.array);
        }
        root() {
            return this.clone(this.parents.slice(0, 1));
        }
        locale_disable(array) {
            if (this.array)
                return this;
            return this.clone(this.parents, array);
        }
        get_method({ name, src, key, next }) {
            const prev = this.added_nodes.get(name.value);
            if (!prev)
                return;
            if ((prev.key && !key) || (!prev.key && key) || (prev.next && !next) || (!prev.next && next))
                return this.$.$mol_fail($mol_view_tree2_error_str `Method ${src.type} at ${src.span} is not same as ${prev.src.type} at ${prev.src.span}`);
            const current_default = src.kids.length > 0 ? src.kids[0] : undefined;
            const prev_default = prev.src.kids.length > 0 ? prev.src.kids[0] : undefined;
            if (prev_default?.toString() !== current_default?.toString())
                return this.$.$mol_fail($mol_view_tree2_error_str `Method ${name.value} at ${current_default?.span ?? name.span} already defined with another default value at ${prev_default?.span ?? prev.name.span}`);
            return prev;
        }
        check_scope_vars({ name, key, next }) {
            let finded_key;
            let finded_next;
            const parents = this.parents;
            for (let i = 1; i < parents.length; i++) {
                const parent = parents[i];
                if (next && parent.next)
                    finded_next = parent.next;
            }
            if (next && !finded_next)
                return this.$.$mol_fail($mol_view_tree2_error_str `Next ${next.value} at ${next.span} not found at ${this.parents.map(parent => parent.src.span)}`);
            const first_method = parents.length > 1 ? parents[1] : undefined;
            if (name.value === first_method?.name.value)
                return this.$.$mol_fail($mol_view_tree2_error_str `Method ${name.value} at ${name.span} already defined at ${first_method.name.span}`);
        }
        index(owner) {
            this.added_nodes.set(owner.name.value, owner);
            const index = this.methods.length;
            return index;
        }
        method(index, method) {
            this.methods.push(...method);
        }
        locale_nodes = new Map();
        locale(operator) {
            const parents = this.parents;
            const val = operator.kids.length === 1 ? operator.kids[0] : undefined;
            if (!val)
                return this.$.$mol_fail($mol_view_tree2_error_str `Need a one child at ${operator.span}, use \`some @ \\localized value\``);
            if (this.array)
                return this.$.$mol_fail($mol_view_tree2_error_str `Can\'t use \`@\` at ${operator.span} inside array at ${this.array.span}`);
            let key = '';
            const body = [];
            const last = parents.length > 0 ? parents[parents.length - 1] : undefined;
            for (const parent of parents) {
                body.push(parent.name);
                key += parent.name.value;
                if (parent === last)
                    break;
                body.push(parent.name.data('_'));
                key += '_';
            }
            const prev = this.locale_nodes.get(key);
            if (prev)
                return this.$.$mol_fail($mol_view_tree2_error_str `Locale key \`${key}\` at ${operator.span} conflicts with same at ${prev.span}`);
            this.locale_nodes.set(key, val);
            this.locales[key] = val.text();
            return operator.struct('line', body);
        }
    }
    $_1.$mol_view_tree2_context = $mol_view_tree2_context;
})($ || ($ = {}));
//mol/view/tree2/context.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_normalize(defs) {
        return defs.clone($mol_view_tree2_classes(defs).kids.map(cl => cl.clone([
            this.$mol_view_tree2_class_super(cl).clone(this.$mol_view_tree2_class_props(cl))
        ])));
    }
    $.$mol_view_tree2_normalize = $mol_view_tree2_normalize;
})($ || ($ = {}));
//mol/view/tree2/normalize.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_super(klass) {
        if (!class_regex.test(klass.type))
            return this.$mol_fail(err `Wrong class name at ${klass.span}`);
        const superclass = klass.kids.length === 1 ? klass.kids[0] : undefined;
        if (!superclass)
            return this.$mol_fail(err `No super class at ${klass.span}`);
        if (!class_regex.test(superclass.type))
            return this.$mol_fail(err `Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`);
        return superclass;
    }
    $.$mol_view_tree2_class_super = $mol_view_tree2_class_super;
    const class_regex = /^[$A-Z]\w+$/;
})($ || ($ = {}));
//mol/view/tree2/class/super.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_props(klass) {
        let props = this.$mol_view_tree2_class_super(klass);
        props = props.clone(props.hack({
            '': (node, belt) => {
                const normal = node.type.replace(/!\w+/, '*');
                if (node.type === normal)
                    return [node.clone(node.hack(belt))];
                return [node.struct(normal, node.hack(belt))];
            }
        }));
        const props_inner = [];
        const props_root = props.hack({
            '<=': (operator, belt) => {
                const prop = this.$mol_view_tree2_child(operator);
                const defs = prop.hack(belt);
                if (defs.length)
                    props_inner.push(prop.clone(defs));
                return [operator.clone([prop.clone([])])];
            },
            '<=>': (operator, belt) => {
                const prop = this.$mol_view_tree2_child(operator);
                const defs = prop.hack(belt);
                if (defs.length)
                    props_inner.push(prop.clone(defs));
                return [operator.clone([prop.clone([])])];
            },
        });
        return [...props_root, ...props_inner];
    }
    $.$mol_view_tree2_class_props = $mol_view_tree2_class_props;
})($ || ($ = {}));
//mol/view/tree2/class/props.ts
;
"use strict";
//mol/type/equals/equals.ts
;
"use strict";
//mol/type/merge/merge.ts
;
"use strict";
//mol/type/intersect/intersect.ts
;
"use strict";
//mol/type/override/override.ts
;
"use strict";
//mol/unicode/unicode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_regexp extends RegExp {
        groups;
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static vary(sources) {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, '', groups);
        }
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));
//mol/regexp/regexp.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_prop_split(src) {
        const prop_name = src.type;
        if (!prop_name)
            return { src, name: src.data(src.value) };
        let key_pos = prop_name.indexOf('*');
        let next_pos = prop_name.indexOf('?');
        let next_pos_orig = next_pos;
        if (next_pos === -1)
            next_pos = prop_name.length;
        const name_end = (key_pos === -1) ? next_pos : key_pos;
        if (key_pos > next_pos)
            return this.$mol_fail(err `Index argument must be before next argument at ${src.span}, use ${example1}`);
        const name = prop_name.substring(0, name_end);
        const key = key_pos < 0 ? '' : prop_name.substring(key_pos + 1, next_pos);
        const next = prop_name.substring(next_pos + 1);
        if ((key && !regular_regex.test(key))
            || (next && !regular_regex.test(next)))
            return this.$mol_fail(err `Only regular chars and digits allowed ${key} ${next} at ${src.span}, use ${example2}`);
        return {
            src,
            name: $mol_tree2.data(name, [], src.span.slice(0, name.length)),
            key: key_pos >= 0 ? $mol_tree2.data(key ? JSON.stringify(key) : 'id', [], src.span.slice(key_pos, key_pos + key.length)) : undefined,
            next: next_pos_orig >= 0 ? $mol_tree2.data(next || 'next', [], src.span.slice(next_pos, next_pos + next.length)) : undefined
        };
    }
    $.$mol_view_tree2_prop_split = $mol_view_tree2_prop_split;
    const regular_regex = /^\w+$/;
    const example1 = new $mol_view_tree2_error_suggestions([
        'having!key?next <= owner!key?next'
    ]);
    const example2 = new $mol_view_tree2_error_suggestions([
        'having#',
        'having#key',
        'having#key?next',
        'having',
    ]);
})($ || ($ = {}));
//mol/view/tree2/prop/split.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_prop_name(prop) {
        return this.$mol_view_tree2_prop_split(prop).name.value;
    }
    $.$mol_view_tree2_prop_name = $mol_view_tree2_prop_name;
    function $mol_view_tree2_prop_key(prop) {
        return this.$mol_view_tree2_prop_split(prop).key?.value;
    }
    $.$mol_view_tree2_prop_key = $mol_view_tree2_prop_key;
    function $mol_view_tree2_prop_next(prop) {
        return this.$mol_view_tree2_prop_split(prop).next?.value;
    }
    $.$mol_view_tree2_prop_next = $mol_view_tree2_prop_next;
})($ || ($ = {}));
//mol/view/tree2/prop/prop.ts
;
"use strict";
var $;
(function ($) {
    const regular_regex = /^\w+$/;
    function $mol_view_tree2_prop_quote(name) {
        if (regular_regex.test(name.value))
            return name;
        return name.data(JSON.stringify(name.value));
    }
    $.$mol_view_tree2_prop_quote = $mol_view_tree2_prop_quote;
})($ || ($ = {}));
//mol/view/tree2/prop/quote.ts
;
"use strict";
var $;
(function ($) {
    const { begin, end, latin_only: letter, optional, repeat_greedy } = $mol_regexp;
    $.$mol_view_tree2_prop_signature = $mol_regexp.from([
        begin,
        { name: repeat_greedy(letter, 1) },
        { key: optional(['*', repeat_greedy(letter, 0)]) },
        { next: optional(['?', repeat_greedy(letter, 0)]) },
        end,
    ]);
})($ || ($ = {}));
//mol/view/tree2/prop/signature.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_value_type(val) {
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
        const first_char = val.type && val.type[0];
        if (first_char === '/')
            return 'list';
        if (Number(val.type).toString() == val.type)
            return 'number';
        if (/^[$A-Z]/.test(first_char))
            return 'object';
        return this.$mol_fail(err `Unknown value type ${val.type} at ${val.span}`);
    }
    $.$mol_view_tree2_value_type = $mol_view_tree2_value_type;
})($ || ($ = {}));
//mol/view/tree2/value/type.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_value(value) {
        const type = value.type;
        const kids = value.kids;
        if (type === '') {
            if (kids.length === 0)
                return value.data(JSON.stringify(value.value));
            return value.data(JSON.stringify(kids.map(node => node.value).join('\n')));
        }
        if (kids.length !== 0)
            return this.$mol_fail(err `Kids are not allowed at ${value.span}, use ${example}`);
        if (type === 'false' || type === 'true')
            return value.data(type);
        if (type === 'null')
            return value.data(type);
        if (Number(type).toString() === type.replace(/^\+/, ''))
            return value.data(type);
        return this.$mol_fail(err `Value ${value.toString()} not allowed at ${value.span}, use ${example}`);
    }
    $.$mol_view_tree2_value = $mol_view_tree2_value;
    const example = new $mol_view_tree2_error_suggestions([
        'false',
        'true',
        '123',
        'null',
        '\\some'
    ]);
})($ || ($ = {}));
//mol/view/tree2/value/value.ts
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//mol/dom/context/context.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return null;
        }
        static persisted(next) {
            return false;
        }
        static estimate() {
            return 0;
        }
        static dir() {
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));
//mol/storage/storage.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
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
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//mol/state/local/local.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                const fiber = temp(self, args);
                return fiber.sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
//mol/wire/sync/sync.ts
;
"use strict";
//hyoo/hyoo.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//mol/dom/parse/parse.ts
;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object2 {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        message() {
            return this.native.statusText || `HTTP Error ${this.code()}`;
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
            return $mol_wire_sync(this.native).json();
        }
        buffer() {
            return $mol_wire_sync(this.native).arrayBuffer();
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch extends $mol_object2 {
        static request(input, init = {}) {
            const native = globalThis.fetch ?? $node['undici'].fetch;
            const controller = new AbortController();
            let done = false;
            const promise = native(input, {
                ...init,
                signal: controller.signal,
            }).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        static response(input, init) {
            return new $mol_fetch_response($mol_wire_sync(this).request(input, init));
        }
        static success(input, init) {
            const response = this.response(input, init);
            if (response.status() === 'success')
                return response;
            throw new Error(response.message());
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "response", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "success", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "json", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "html", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));
//mol/fetch/fetch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_huggingface_run(space, method, ...data) {
        while (true) {
            try {
                if (typeof method === 'number') {
                    return $mol_wire_sync(this).$mol_huggingface_ws(space, method, ...data);
                }
                else {
                    return this.$mol_huggingface_rest(space, method, ...data);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                if (error instanceof Error && error.message === `Queue full`) {
                    $mol_fail_log(error);
                    continue;
                }
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_huggingface_run = $mol_huggingface_run;
    function $mol_huggingface_rest(space, method, ...data) {
        const uri = `https://${space}.hf.space/run/${method}`;
        const response = $mol_fetch.json(uri, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        });
        if ('error' in response) {
            $mol_fail(new Error(response.error ?? 'Unknown API error'));
        }
        return response.data;
    }
    $.$mol_huggingface_rest = $mol_huggingface_rest;
    function $mol_huggingface_ws(space, fn_index, ...data) {
        const session_hash = $mol_guid();
        const socket = new WebSocket(`wss://${space}.hf.space/queue/join`);
        const promise = new Promise((done, fail) => {
            socket.onclose = event => {
                if (event.reason)
                    fail(new Error(event.reason));
            };
            socket.onerror = event => {
                fail(new Error(`Socket error`));
            };
            socket.onmessage = event => {
                const message = JSON.parse(event.data);
                switch (message.msg) {
                    case 'send_hash':
                        return socket.send(JSON.stringify({ session_hash, fn_index }));
                    case 'estimation': return;
                    case 'queue_full':
                        fail(new Error(`Queue full`));
                    case 'send_data':
                        return socket.send(JSON.stringify({ session_hash, fn_index, data }));
                    case 'process_starts': return;
                    case 'process_completed':
                        if (message.success) {
                            return done(message.output.data);
                        }
                        else {
                            return fail(new Error(message.output.error ?? `Unknown API error`));
                        }
                    default:
                        return fail(new Error(`Unknown message type: ${message.msg}`));
                }
            };
        });
        return Object.assign(promise, {
            destructor: () => socket.close()
        });
    }
    $.$mol_huggingface_ws = $mol_huggingface_ws;
})($ || ($ = {}));
//mol/huggingface/huggingface.ts
;
"use strict";
var $;
(function ($) {
    function $hyoo_lingua_translate(lang, text) {
        if (!text.trim())
            return '';
        const cache_key = `$hyoo_lingua_translate(${JSON.stringify(lang)},${JSON.stringify(text)})`;
        const cached = this.$mol_state_local.value(cache_key);
        if (cached)
            return String(cached);
        const translated = this.$mol_huggingface_run('hyoo-translate', 0, lang, text)[0];
        return this.$mol_state_local.value(cache_key, translated);
    }
    $.$hyoo_lingua_translate = $hyoo_lingua_translate;
})($ || ($ = {}));
//hyoo/lingua/translate/translate.ts
;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            try {
                return $mol_wire_sync($hyoo_lingua_translate).call(this.$, lang, en);
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//mol/locale/locale.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string(text) {
        let res = '';
        function visit(text, prefix, inline) {
            if (text.type === 'indent') {
                if (inline)
                    res += '\n';
                for (let kid of text.kids) {
                    visit(kid, prefix + '\t', false);
                }
                if (inline)
                    res += prefix;
            }
            else if (text.type === 'line') {
                if (!inline)
                    res += prefix;
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    res += '\n';
            }
            else {
                if (!inline)
                    res += prefix;
                res += text.text();
                if (!inline)
                    res += '\n';
            }
        }
        for (let kid of text.kids) {
            visit(kid, '', false);
        }
        return res;
    }
    $.$mol_tree2_text_to_string = $mol_tree2_text_to_string;
})($ || ($ = {}));
//mol/tree2/text/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_bind_both_parts(operator) {
        if (operator.type !== '<=>')
            return this.$mol_fail(err `Need an \`<=>\` at ${operator.span}, use ${example}`);
        const owner = operator.kids.length === 1 ? operator.kids[0] : undefined;
        if (!owner)
            return this.$mol_fail(err `Need an owner part at ${operator.span}, use ${example}`);
        if (owner.kids.length > 1)
            return this.$mol_fail(err `Only one sub allowed at ${owner.span}, use ${example}`);
        const owner_parts = this.$mol_view_tree2_prop_split(owner);
        if (!owner_parts.next)
            return this.$mol_fail(err `Next argument required at ${owner.span}, use ${example}`);
        const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined;
        return {
            owner_parts,
            default_value
        };
    }
    $.$mol_view_tree2_bind_both_parts = $mol_view_tree2_bind_both_parts;
    const example = new $mol_view_tree2_error_suggestions([
        'having?next <=> owner?next',
        'having?next <=> owner?next \\default',
        'having!key?next <=> owner!key?next',
    ]);
})($ || ($ = {}));
//mol/view/tree2/bind/both_parts.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_bind_left_parts(operator, having_parts) {
        if (operator.type !== '<=')
            return this.$mol_fail(err `Need an \`<=\` at ${operator.span}`);
        const owner = operator.kids.length === 1 ? operator.kids[0] : undefined;
        if (!owner)
            return this.$mol_fail(err `Need an owner part at ${operator.span}`);
        if (owner.kids.length > 1)
            return this.$mol_fail(err `Owner at ${owner.span} can't have more that 1 value, given ${owner.kids.map(node => node.span)}`);
        const default_value = owner.kids.length === 1 ? owner.kids[0] : undefined;
        const owner_parts = this.$mol_view_tree2_prop_split(owner);
        const owner_call_parts = owner_parts.next
            ? { ...owner_parts, next: undefined }
            : owner_parts;
        return {
            default_value,
            owner_call_parts,
            owner_parts
        };
    }
    $.$mol_view_tree2_bind_left_parts = $mol_view_tree2_bind_left_parts;
})($ || ($ = {}));
//mol/view/tree2/bind/left_parts.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_bind_right_parts(operator, having_parts, factory) {
        if (operator.type !== '=>')
            return this.$mol_fail(err `Need an \`=>\` at ${operator.span}, use ${example}`);
        const owner = operator.kids.length === 1 ? operator.kids[0] : undefined;
        if (!owner)
            return this.$mol_fail(err `Need an owner part at ${operator.span}, use ${example}`);
        if (owner.kids.length !== 0)
            return this.$mol_fail(err `Owner at ${owner.span} can\'t have values at ${owner.kids.map(node => node.span)}, use ${example}`);
        const owner_parts = this.$mol_view_tree2_prop_split(owner);
        const owner_key = owner_parts.key;
        const having_key = having_parts.key;
        if (owner_key && having_key && having_key.data !== owner_key.data)
            return this.$mol_fail(err `Key ${owner_key.value} at ${owner_key.span} must be equal to key ${having_key.span} at ${having_key.span}, ${example}`);
        if (!owner_key && having_key)
            return this.$mol_fail(err `Name ${owner_parts.name.value} at ${owner_parts.name.span} need a key like ${having_key.value} at ${having_key.span}, ${example}`);
        if (owner_key && (!having_key && !factory.key))
            return this.$mol_fail(err `Can't use key ${owner_key.value} at ${owner_key.span} without key at ${having_parts.name.span} or at ${factory.src.span}, ${example}`);
        const owner_next = owner_parts.next;
        const having_next = having_parts.next;
        if (owner_next && !having_next)
            return this.$mol_fail(err `Can't use next ${owner_next.value} at ${owner_next.span} without next at ${having_parts.name.span}, ${example}`);
        return {
            owner_parts
        };
    }
    $.$mol_view_tree2_bind_right_parts = $mol_view_tree2_bind_right_parts;
    const example = new $mol_view_tree2_error_suggestions([
        'having => owner',
        'having?next => owner?next',
        'having!key => owner!key',
        'having!key?next => owner!key?next'
    ]);
})($ || ($ = {}));
//mol/view/tree2/bind/right_parts.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_bind_both(operator, context) {
        const { owner_parts, default_value } = this.$mol_view_tree2_bind_both_parts(operator);
        context.check_scope_vars(owner_parts);
        if (default_value && !context.get_method(owner_parts)) {
            this.$mol_view_tree2_ts_method_body(owner_parts, context.root());
        }
        return [operator.struct('line', [
                owner_parts.name.data('this.'),
                this.$mol_view_tree2_ts_function_call(owner_parts),
            ])];
    }
    $.$mol_view_tree2_ts_bind_both = $mol_view_tree2_ts_bind_both;
    const example = new $mol_view_tree2_error_suggestions([
        'having?next <=> owner?next',
        'having?next <=> owner?next \\default',
        'having!key?next <=> owner!key?next',
    ]);
})($ || ($ = {}));
//mol/view/tree2/ts/bind/both.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_bind_left(operator, context, having_parts) {
        const { default_value, owner_parts, owner_call_parts } = this.$mol_view_tree2_bind_left_parts(operator, having_parts);
        context.check_scope_vars(owner_call_parts);
        if (default_value && !context.get_method(owner_parts)) {
            this.$mol_view_tree2_ts_method_body(owner_parts, context.root());
        }
        return [operator.struct('line', [
                owner_parts.name.data('this.'),
                this.$mol_view_tree2_ts_function_call(owner_call_parts),
            ])];
    }
    $.$mol_view_tree2_ts_bind_left = $mol_view_tree2_ts_bind_left;
})($ || ($ = {}));
//mol/view/tree2/ts/bind/left.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_bind_right(operator, having_parts, factory, context) {
        const { owner_parts } = this.$mol_view_tree2_bind_right_parts(operator, having_parts, factory);
        const prev = context.get_method(owner_parts);
        if (prev)
            return this.$mol_fail(err `Method ${owner_parts.name.value} at ${owner_parts.name.span} already defined at ${prev.src.span}, ${example}`);
        const index = context.index(owner_parts);
        const body = operator.struct('indent', [
            operator.struct('line', [
                owner_parts.name.data('return this.'),
                this.$mol_view_tree2_ts_function_call({ ...factory, key: factory.key?.data('id') }),
                owner_parts.name.data('.'),
                this.$mol_view_tree2_ts_function_call(having_parts),
            ])
        ]);
        const method = [
            ...this.$mol_view_tree2_ts_comment_doc(owner_parts.src),
            operator.struct('line', [
                owner_parts.name,
                $mol_view_tree2_ts_function_declaration(owner_parts, context.types),
                owner_parts.name.data(' {'),
            ]),
            body,
            owner_parts.name.data('}'),
        ];
        context.method(index, method);
    }
    $.$mol_view_tree2_ts_bind_right = $mol_view_tree2_ts_bind_right;
    const example = new $mol_view_tree2_error_suggestions([
        'having => owner',
        'having?next => owner?next',
        'having!key => owner!key',
        'having!key?next => owner!key?next'
    ]);
})($ || ($ = {}));
//mol/view/tree2/ts/bind/right.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_class(klass, locales) {
        const superclass = this.$mol_view_tree2_class_super(klass);
        const body = [];
        const class_parts = this.$mol_view_tree2_prop_split(klass);
        const context = new $mol_view_tree2_context(this, [class_parts], locales, body);
        const props = this.$mol_view_tree2_class_props(klass);
        for (const having of props) {
            const having_parts = this.$mol_view_tree2_prop_split(having);
            if (context.get_method(having_parts))
                continue;
            this.$mol_view_tree2_ts_method_body(having_parts, context);
        }
        return klass.struct('indent', [
            klass.struct('line', [
                klass.data('export class '),
                klass.data(klass.type),
                klass.data(' extends '),
                superclass.data(superclass.type),
                klass.data(' {'),
            ]),
            klass.struct('indent', body),
            klass.data('}'),
            klass.data(''),
        ]);
    }
    $.$mol_view_tree2_ts_class = $mol_view_tree2_ts_class;
})($ || ($ = {}));
//mol/view/tree2/ts/class.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_value(src) {
        const converted = this.$mol_view_tree2_value(src);
        if (src.type === 'null')
            return [converted.struct('line', [
                    converted.data(converted.value),
                    converted.data(' as any'),
                ])];
        return [converted];
    }
    $.$mol_view_tree2_ts_value = $mol_view_tree2_ts_value;
})($ || ($ = {}));
//mol/view/tree2/ts/value.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_locale(operator, context) {
        return [operator.struct('line', [
                operator.data('this.$.$mol_locale.text( \''),
                context.locale(operator),
                operator.data('\' )'),
            ])];
    }
    $.$mol_view_tree2_ts_locale = $mol_view_tree2_ts_locale;
})($ || ($ = {}));
//mol/view/tree2/ts/locale.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_module(tree2_module, locales) {
        tree2_module = $mol_view_tree2_classes(tree2_module);
        const classes = [
            tree2_module.data('namespace $ {')
        ];
        let has_data = false;
        for (const item of tree2_module.kids) {
            const class_node = this.$mol_view_tree2_ts_class(item, locales);
            classes.push(class_node);
            has_data = true;
        }
        classes.push(tree2_module.data('}'), tree2_module.data(''));
        return tree2_module.list(has_data ? classes : []);
    }
    $.$mol_view_tree2_ts_module = $mol_view_tree2_ts_module;
})($ || ($ = {}));
//mol/view/tree2/ts/module.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_function_declaration({ name, key, next }, types = false) {
        const sub = [name.data('(')];
        if (key)
            sub.push(key.data('id'));
        if (types && key)
            sub.push(key.data(': any'));
        if (key && next)
            sub.push(name.data(', '));
        if (next)
            sub.push(next);
        if (types && next)
            sub.push(next.data('?: any'));
        sub.push(name.data(')'));
        return name.struct('line', sub);
    }
    $.$mol_view_tree2_ts_function_declaration = $mol_view_tree2_ts_function_declaration;
    function $mol_view_tree2_ts_function_call({ name, key, next }) {
        const sub = [
            name,
            name.data('('),
        ];
        if (key)
            sub.push(key);
        if (next && key)
            sub.push(key.data(', '));
        if (next)
            sub.push(next);
        sub.push(name.data(')'));
        return name.struct('line', sub);
    }
    $.$mol_view_tree2_ts_function_call = $mol_view_tree2_ts_function_call;
})($ || ($ = {}));
//mol/view/tree2/ts/function.ts
;
"use strict";
var $;
(function ($_1) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_spread(spread_prop) {
        const spread_prop_parts = this.$mol_view_tree2_prop_split(spread_prop);
        return spread_prop.struct('line', [
            spread_prop.data('...this.'),
            this.$mol_view_tree2_ts_function_call(spread_prop_parts)
        ]);
    }
    $_1.$mol_view_tree2_ts_spread = $mol_view_tree2_ts_spread;
    class $mol_view_tree2_ts_spread_factory extends $mol_object2 {
        prop_parts;
        super_spread = undefined;
        constructor($, prop_parts) {
            super();
            this.prop_parts = prop_parts;
            this.$ = $;
        }
        create(prop) {
            const spread_prop = prop.kids.length === 1 ? prop.kids[0] : undefined;
            if (spread_prop)
                return this.$.$mol_view_tree2_ts_spread(spread_prop);
            const super_spread = this.super_spread;
            if (super_spread)
                return this.$.$mol_fail(err `Only one \`^\` operator allowed at ${prop.span}, first was at ${super_spread.span}`);
            if (!this.prop_parts)
                return this.$.$mol_fail(err `Operator \`^\` not allowed at ${prop.span}`);
            this.super_spread = prop.struct('line', [
                prop.data('...super.'),
                this.$.$mol_view_tree2_ts_function_call(this.prop_parts)
            ]);
            return this.super_spread;
        }
    }
    $_1.$mol_view_tree2_ts_spread_factory = $mol_view_tree2_ts_spread_factory;
})($ || ($ = {}));
//mol/view/tree2/ts/spread.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_comment(item) {
        return item.kids.map(chunk => item.data('// ' + chunk.type));
    }
    $.$mol_view_tree2_ts_comment = $mol_view_tree2_ts_comment;
    function $mol_view_tree2_ts_comment_doc(item) {
        const chunks = item.toString().trim().split('\n');
        return [
            item.data(''),
            item.data('/**'),
            item.data(' * ```tree'),
            ...chunks.map(chunk => item.data(' * ' + chunk)),
            item.data(' * ```'),
            item.data(' */'),
        ];
    }
    $.$mol_view_tree2_ts_comment_doc = $mol_view_tree2_ts_comment_doc;
})($ || ($ = {}));
//mol/view/tree2/ts/comment.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_compile(tree2_module) {
        const locales = {};
        const ts_module = this.$mol_view_tree2_ts_module(tree2_module, locales);
        const script = this.$mol_tree2_text_to_string(ts_module);
        return { script, locales };
    }
    $.$mol_view_tree2_ts_compile = $mol_view_tree2_ts_compile;
})($ || ($ = {}));
//mol/view/tree2/ts/compile.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_dictionary(dictionary, dictionary_context, super_method) {
        if (dictionary.type !== '*')
            return this.$mol_fail(err `Need a \`*\` operator at ${dictionary.span}`);
        const sub = [];
        const kids = dictionary.kids;
        const last = kids.length > 0 ? kids[kids.length - 1] : undefined;
        const spread_factory = new this.$mol_view_tree2_ts_spread_factory(this, super_method);
        for (const opt of kids) {
            let value;
            const info = this.$mol_view_tree2_prop_split(opt);
            if (opt.type === '^') {
                const child_sub = [spread_factory.create(opt)];
                if (opt !== last)
                    child_sub.push(opt.data(','));
                sub.push(opt.struct('line', child_sub));
                continue;
            }
            const context = dictionary_context.parent(info);
            const operator = opt.kids.length > 0 ? opt.kids[opt.kids.length - 1] : undefined;
            if (!operator)
                return this.$mol_fail(err `Need an operator at ${opt.span}`);
            const type = operator.type;
            if (type === '<=')
                value = this.$mol_view_tree2_ts_bind_left(operator, context);
            else if (type === '*')
                value = this.$mol_view_tree2_ts_dictionary(operator, context);
            else if (type[0] === '/')
                value = this.$mol_view_tree2_ts_array(operator, context);
            else if (type === '<=>')
                value = this.$mol_view_tree2_ts_bind_both(operator, context);
            else if (type === '@')
                value = this.$mol_view_tree2_ts_locale(operator, context);
            else
                value = this.$mol_view_tree2_ts_value(operator);
            const child_sub = [
                $mol_view_tree2_prop_quote(info.name),
                info.name.data(': '),
            ];
            if (info.next || info.key)
                child_sub.push($mol_view_tree2_ts_function_declaration(info, context.types), opt.data(' => '));
            child_sub.push(...value);
            if (opt !== last)
                child_sub.push(opt.data(','));
            sub.push(opt.struct('line', child_sub));
        }
        return [
            dictionary.data('{'),
            dictionary.struct('indent', sub),
            dictionary.data('} as Record< string, any >'),
        ];
    }
    $.$mol_view_tree2_ts_dictionary = $mol_view_tree2_ts_dictionary;
})($ || ($ = {}));
//mol/view/tree2/ts/dictionary.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_factory(klass, factory, factory_context) {
        if (!/^[$A-Z]/.test(klass.type))
            return this.$mol_fail(err `Need a valid class name at ${klass.span}, use ${example}`);
        const obj_node = klass.data('obj');
        const body = [];
        let last_array;
        let constructor_args;
        for (const child of klass.kids) {
            const child_parts = this.$mol_view_tree2_prop_split(child);
            const context = factory_context.parent(child_parts);
            if (child.type[0] === '/') {
                if (last_array)
                    return this.$mol_fail(err `Only one \`/\` operator allowed in factory at ${child.span}, prev at ${last_array.span}`);
                last_array = child;
                constructor_args = this.$mol_view_tree2_ts_array_body(child, context);
                continue;
            }
            const operator = this.$mol_view_tree2_child(child);
            const type = operator.type;
            let value;
            if (type === '<=')
                value = this.$mol_view_tree2_ts_bind_left(operator, context, child_parts);
            else if (type === '<=>')
                value = this.$mol_view_tree2_ts_bind_both(operator, context);
            else if (type === '=>') {
                this.$mol_view_tree2_ts_bind_right(operator, child_parts, factory, factory_context);
                continue;
            }
            else if (type === '@')
                value = this.$mol_view_tree2_ts_locale(operator, context);
            else if (type === '*')
                value = [child.struct('line', [
                        child.data('('),
                        ...this.$mol_view_tree2_ts_dictionary(operator, context),
                        child.data(')'),
                    ])];
            else if (type[0] === '/')
                value = this.$mol_view_tree2_ts_array(operator, context);
            else
                value = this.$mol_view_tree2_ts_value(operator);
            const call = child.struct('line', [
                obj_node,
                child.data('.'),
                child_parts.name,
                child_parts.name.data(' = '),
                $mol_view_tree2_ts_function_declaration(child_parts, context.types),
                child.data(' => '),
                ...value,
            ]);
            body.push(call);
        }
        const init = [
            klass.data('const '),
            obj_node,
            klass.data(' = new this.$.'),
            klass.data(klass.type),
        ];
        if (constructor_args)
            init.push(klass.data('('), constructor_args, klass.data(')'));
        else
            init.push(klass.data('()'));
        const sub = [
            klass.struct('line', init),
            klass.data(''),
        ];
        if (body.length > 0)
            sub.push(...body);
        if (body.length > 0 && !constructor_args)
            sub.push(klass.data(''));
        sub.push(obj_node.struct('line', [
            klass.data('return '),
            obj_node
        ]));
        return klass.struct('indent', sub);
    }
    $.$mol_view_tree2_ts_factory = $mol_view_tree2_ts_factory;
    const example = new $mol_view_tree2_error_suggestions([
        'Factory_name!key?next $' + 'my_class'
    ]);
})($ || ($ = {}));
//mol/view/tree2/ts/factory.ts
;
"use strict";
var $;
(function ($) {
    class $mol_graph {
        nodes = new Set();
        edges_out = new Map();
        edges_in = new Map();
        link_out(from, to, edge) {
            let pair = this.edges_out.get(from);
            if (!pair) {
                pair = new Map();
                this.edges_out.set(from, pair);
                this.nodes.add(from);
            }
            pair.set(to, edge);
            this.nodes.add(to);
        }
        link_in(to, from, edge) {
            let pair = this.edges_in.get(to);
            if (!pair) {
                pair = new Map();
                this.edges_in.set(to, pair);
                this.nodes.add(to);
            }
            pair.set(from, edge);
            this.nodes.add(to);
        }
        edge_out(from, to) {
            return this.edges_out.get(from)?.get(to) ?? null;
        }
        edge_in(to, from) {
            return this.edges_in.get(to)?.get(from) ?? null;
        }
        link(from, to, edge) {
            this.link_out(from, to, edge);
            this.link_in(to, from, edge);
        }
        unlink(from, to) {
            this.edges_in.get(to)?.delete(from);
            this.edges_out.get(from)?.delete(to);
        }
        acyclic(get_weight) {
            const checked = [];
            for (const start of this.nodes) {
                const path = [];
                const visit = (from) => {
                    if (checked.includes(from))
                        return Number.MAX_SAFE_INTEGER;
                    const index = path.lastIndexOf(from);
                    if (index > -1) {
                        const cycle = path.slice(index);
                        return cycle.reduce((weight, node, index) => Math.min(weight, get_weight(this.edge_out(node, cycle[(index + 1) % cycle.length]))), Number.MAX_SAFE_INTEGER);
                    }
                    path.push(from);
                    dive: try {
                        const deps = this.edges_out.get(from);
                        if (!deps)
                            break dive;
                        for (const [to, edge] of deps) {
                            if (to === from) {
                                this.unlink(from, to);
                                continue;
                            }
                            const weight_out = get_weight(edge);
                            const min = visit(to);
                            if (weight_out > min)
                                return min;
                            if (weight_out === min) {
                                this.unlink(from, to);
                                if (path.length > 1) {
                                    const enter = path[path.length - 2];
                                    this.link(enter, to, edge);
                                }
                            }
                        }
                    }
                    finally {
                        path.pop();
                    }
                    checked.push(from);
                    return Number.MAX_SAFE_INTEGER;
                };
                visit(start);
            }
        }
        get sorted() {
            const sorted = new Set();
            const visit = (node) => {
                if (sorted.has(node))
                    return;
                const deps = this.edges_out.get(node);
                if (deps) {
                    for (const [dep] of deps)
                        visit(dep);
                }
                sorted.add(node);
            };
            for (const node of this.nodes) {
                visit(node);
            }
            return sorted;
        }
        get roots() {
            const roots = [];
            for (const node of this.nodes) {
                if (this.edges_in.get(node)?.size)
                    continue;
                roots.push(node);
            }
            return roots;
        }
        depth(select) {
            const stat = new Map();
            const visit = (node, depth = 0) => {
                if (stat.has(node))
                    stat.set(node, select(depth, stat.get(node)));
                else
                    stat.set(node, depth);
                for (const kid of this.edges_out.get(node)?.keys() ?? [])
                    visit(kid, depth + 1);
            };
            for (const root of this.roots)
                visit(root);
            return stat;
        }
        get depth_min() {
            return this.depth(Math.min);
        }
        get depth_max() {
            return this.depth(Math.max);
        }
        group_depth(select) {
            const groups = [];
            for (const [node, depth] of this.depth(select).entries()) {
                if (groups[depth])
                    groups[depth].push(node);
                else
                    groups[depth] = [node];
            }
            return groups;
        }
        get group_depth_min() {
            return this.group_depth(Math.min);
        }
        get proup_depth_max() {
            return this.group_depth(Math.max);
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));
//mol/graph/graph.ts
;
"use strict";
var $;
(function ($) {
    const sourcemap_codec = $node['sourcemap-codec'];
    const path = $node.path;
    class $mol_sourcemap_builder {
        separator;
        file;
        version = 3;
        sourceRoot;
        separator_count;
        constructor(dir, separator = '', file) {
            this.separator = separator;
            this.file = file;
            this.sourceRoot = dir && dir !== '.' ? (dir + '/') : '';
            this.separator += '\n';
            this.separator_count = separator.split('\n').length - 2;
        }
        chunks = [];
        segment_lines = [];
        sources = [];
        source_indexes = new Map();
        names = [];
        name_indexes = new Map();
        sourceContent = [];
        get content() {
            return this.chunks.join('');
        }
        get sourcemap() {
            return {
                version: this.version,
                sources: this.sources,
                names: this.names,
                sourceRoot: this.sourceRoot || undefined,
                mappings: sourcemap_codec.encode(this.segment_lines),
                file: this.file,
                sourcesContent: this.sourceContent,
            };
        }
        toJSON() {
            return this.sourcemap;
        }
        toString() {
            return JSON.stringify(this.toJSON());
        }
        add_chunk(content) {
            const { segment_lines, chunks, separator_count } = this;
            if (chunks.length !== 0) {
                chunks.push(this.separator);
                for (let i = 0; i < separator_count; i++)
                    segment_lines.push([]);
            }
            chunks.push(content);
        }
        add_content(content, file) {
            const { source_indexes, sources, segment_lines } = this;
            this.add_chunk(content);
            let sourceIndex;
            if (file) {
                sourceIndex = source_indexes.get(file);
                if (sourceIndex === undefined) {
                    sourceIndex = sources.length;
                    sources.push(file);
                    source_indexes.set(file, sourceIndex);
                    this.sourceContent.push(null);
                }
            }
            const linesCount = content.split('\n').length;
            for (let originalLine = 0; originalLine < linesCount; originalLine++) {
                if (!file)
                    segment_lines.push([]);
                else
                    segment_lines.push([
                        [
                            0,
                            sourceIndex,
                            originalLine,
                            0,
                        ]
                    ]);
            }
        }
        add(content, file, raw) {
            const { name_indexes, names, source_indexes, sources, segment_lines } = this;
            const bundleSourceRoot = this.sourceRoot;
            if (!content)
                throw new Error(`No content: ${file}, ${raw}`);
            if (typeof raw === 'string')
                raw = JSON.parse(raw);
            if (!raw || !raw.mappings || raw.mappings.length === 0) {
                this.add_content(content, file);
                return;
            }
            this.add_chunk(content);
            let sourceRoot = file ? path.dirname(file) : (raw.sourceRoot || '');
            if (sourceRoot === '.')
                sourceRoot = '';
            else if (sourceRoot)
                sourceRoot += '/';
            const lines = typeof raw.mappings === 'string' ? sourcemap_codec.decode(raw.mappings) : raw.mappings;
            for (let line of lines) {
                const mergedLine = [];
                for (let segment of line) {
                    const mergedSegment = [segment[0]];
                    if (segment.length >= 2) {
                        const sourceIndex = segment[1];
                        const source = bundleSourceRoot + sourceRoot + raw.sources[sourceIndex];
                        let mergedSourceIndex = source_indexes.get(source);
                        if (mergedSourceIndex === undefined) {
                            mergedSourceIndex = sources.length;
                            source_indexes.set(source, mergedSourceIndex);
                            sources.push(source);
                            if (raw.sourcesContent)
                                this.sourceContent.push(raw.sourcesContent[sourceIndex]);
                        }
                        mergedSegment.push(mergedSourceIndex);
                    }
                    if (segment.length >= 3)
                        mergedSegment.push(segment[2]);
                    if (segment.length >= 4)
                        mergedSegment.push(segment[3]);
                    if (segment.length >= 5) {
                        const nameIndex = segment[4];
                        const name = raw.names[nameIndex];
                        let mergedNameIndex = name_indexes.get(name);
                        if (mergedNameIndex === undefined) {
                            mergedNameIndex = names.length;
                            name_indexes.set(name, mergedNameIndex);
                            names.push(name);
                        }
                        mergedSegment.push(mergedNameIndex);
                    }
                    mergedLine.push(mergedSegment);
                }
                segment_lines.push(mergedLine);
            }
            const lineCount = content.split('\n').length;
            for (let i = lines.length; i < lineCount; i++)
                segment_lines.push([]);
        }
    }
    $.$mol_sourcemap_builder = $mol_sourcemap_builder;
})($ || ($ = {}));
//mol/sourcemap/sourcemap.ts
;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode(src) {
        throw new Error('Not implemented');
    }
    $.$mol_base64_encode = $mol_base64_encode;
})($ || ($ = {}));
//mol/base64/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode_node(str) {
        if (!str)
            return '';
        if (Buffer.isBuffer(str))
            return str.toString('base64');
        return Buffer.from(str).toString('base64');
    }
    $.$mol_base64_encode_node = $mol_base64_encode_node;
    $.$mol_base64_encode = $mol_base64_encode_node;
})($ || ($ = {}));
//mol/base64/encode/encode.node.ts
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
//mol/diff/path/path.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_mix extends Error {
        errors;
        constructor(message, ...errors) {
            super(message);
            this.errors = errors;
            if (errors.length) {
                const stacks = [...errors.map(error => error.stack), this.stack];
                const diff = $mol_diff_path(...stacks.map(stack => {
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
//mol/error/mix/mix.ts
;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));
//mol/html/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    function attrs_belt(separator) {
        return {
            '': (input) => [
                input.data(' '),
                input.data($mol_html_encode(input.type)),
                ...input.value ? [
                    input.data('"'),
                    input.data($mol_html_encode(input.value)),
                    input.data('"'),
                ] : [],
                ...input.hack({
                    '': (input) => {
                        if (!input.type)
                            return [
                                input.data(separator),
                                input.data('"'),
                                input.data($mol_html_encode(input.text())),
                                input.data('"'),
                            ];
                        $mol_fail(new SyntaxError('Wrong attribute value'));
                    },
                }),
            ],
        };
    }
    function $mol_tree2_xml_to_text(xml) {
        return xml.list(xml.hack({
            '@': (input, belt) => [],
            '--': (input, belt) => [
                xml.struct('line', [
                    input.data('<!-- '),
                    ...input.hack(belt),
                    input.data(' -->'),
                ]),
            ],
            '?': (input, belt) => [
                xml.struct('line', [
                    input.data('<?'),
                    input.kids[0].data(input.kids[0].type),
                    ...input.kids[0].hack(attrs_belt('=')),
                    input.data('?>'),
                ]),
            ],
            '!': (input, belt) => [
                xml.struct('line', [
                    input.data('<!'),
                    input.kids[0].data(input.kids[0].type),
                    ...input.kids[0].hack(attrs_belt(' ')),
                    input.data('>'),
                ]),
            ],
            '': (input, belt) => {
                if (!input.type)
                    return [
                        input.data($mol_html_encode(input.text())),
                    ];
                const attrs = input.select('@', null).hack(attrs_belt('='));
                const content = input.hack(belt);
                return [
                    input.struct('line', [
                        input.data(`<`),
                        input.data(input.type),
                        ...attrs,
                        ...content.length ? [
                            input.data(`>`),
                            input.struct('indent', content),
                            input.data(`</`),
                            input.data(input.type),
                            input.data(`>`),
                        ] : [
                            input.data(` />`),
                        ]
                    ]),
                ];
            },
        }));
    }
    $.$mol_tree2_xml_to_text = $mol_tree2_xml_to_text;
})($ || ($ = {}));
//mol/tree2/xml/to/text/text.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_array_body(operator, parent_context, super_method) {
        if (operator.type[0] !== '/')
            return this.$mol_fail(err `Need a \`/\` at ${operator.span}`);
        const spread = new this.$mol_view_tree2_ts_spread_factory(this, super_method);
        const context = parent_context.locale_disable(operator);
        const kids = operator.kids;
        const last = kids.length > 0 ? kids[kids.length - 1] : undefined;
        const sub = [];
        for (const opt of kids) {
            const type = opt.type;
            let value;
            if (type === '^')
                value = [spread.create(opt)];
            else if (type === '<=')
                value = this.$mol_view_tree2_ts_bind_left(opt, context);
            else if (type === '*')
                value = this.$mol_view_tree2_ts_dictionary(opt, context);
            else if (type[0] === '/')
                value = this.$mol_view_tree2_ts_array(opt, context);
            else
                value = this.$mol_view_tree2_ts_value(opt);
            const child_sub = value;
            if (opt !== last)
                child_sub.push(operator.data(','));
            sub.push(opt.struct('line', child_sub));
        }
        return operator.struct('indent', sub);
    }
    $.$mol_view_tree2_ts_array_body = $mol_view_tree2_ts_array_body;
})($ || ($ = {}));
//mol/view/tree2/ts/array/body.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_array(operator, context, super_method) {
        if (operator.type[0] !== '/')
            return this.$mol_fail(err `Need a \`/\` at ${operator.span}`);
        const type_str = operator.type.substring(1);
        const type_body = [
            operator.data('] as '),
        ];
        if (type_str === '') {
            type_body.push(operator.data('readonly any[]'));
        }
        else if (type_str === 'const') {
            type_body.push(operator.data('const'));
        }
        else {
            const type = $mol_tree2.data(type_str, [], operator.span.slice(1, type_str.length));
            const is_array = type.value.indexOf('[') !== -1;
            type_body.push(operator.data('readonly '));
            if (is_array)
                type_body.push(operator.data('('));
            type_body.push(type);
            if (is_array)
                type_body.push(operator.data(')'));
            type_body.push(operator.data('[]'));
        }
        const body = this.$mol_view_tree2_ts_array_body(operator, context, super_method);
        return [
            operator.data('['),
            body,
            operator.struct('line', type_body)
        ];
    }
    $.$mol_view_tree2_ts_array = $mol_view_tree2_ts_array;
})($ || ($ = {}));
//mol/view/tree2/ts/array/array.ts
;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_ts_method_body(having_parts, parent_context) {
        const context = parent_context.parent(having_parts);
        const having = having_parts.src;
        const operator = having.kids.length === 1 ? having.kids[0] : undefined;
        if (!operator)
            return this.$mol_fail(err `Need an child part in a class body at ${having.span}`);
        const type = operator.type;
        const index = context.index(having_parts);
        let body;
        if (type === '<=')
            body = add_return(operator, this.$mol_view_tree2_ts_bind_left(operator, context, having_parts));
        else if (type === '<=>')
            body = add_return(operator, this.$mol_view_tree2_ts_bind_both(operator, context));
        else if (type === '@')
            body = add_return(operator, this.$mol_view_tree2_ts_locale(operator, context));
        else if (type === '*')
            body = add_return(operator, this.$mol_view_tree2_ts_dictionary(operator, context, having_parts));
        else if (type[0] === '/')
            body = add_return(operator, this.$mol_view_tree2_ts_array(operator, context, having_parts));
        else if (/^[$A-Z]/.test(type))
            body = this.$mol_view_tree2_ts_factory(operator, having_parts, context);
        else
            body = add_return(operator, this.$mol_view_tree2_ts_value(operator));
        const method = this.$mol_view_tree2_ts_method(having_parts, body, context.types);
        context.method(index, method);
    }
    $.$mol_view_tree2_ts_method_body = $mol_view_tree2_ts_method_body;
    function add_return(op, value) {
        return op.struct('indent', [
            op.struct('line', [
                op.data('return '),
                ...value
            ])
        ]);
    }
})($ || ($ = {}));
//mol/view/tree2/ts/method/body.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_ts_method(owner_parts, body, types = false) {
        const { name, key, next, src } = owner_parts;
        const operator = src.kids.length === 1 ? src.kids[0] : undefined;
        const type = operator?.type;
        const is_class = type && /^[$A-Z]/.test(type);
        const is_delegate = type === '<=' || type === '<=>';
        let need_cache = false;
        if (is_delegate)
            need_cache = false;
        else if (next !== undefined)
            need_cache = true;
        else if (is_class)
            need_cache = true;
        const sub = this.$mol_view_tree2_ts_comment_doc(src);
        if (need_cache && key)
            sub.push(name.data(`@ $${''}mol_mem_key`));
        if (need_cache && !key)
            sub.push(name.data(`@ $${''}mol_mem`));
        sub.push(name.struct('line', [
            name,
            $mol_view_tree2_ts_function_declaration(owner_parts, types),
            name.data(' {'),
        ]));
        if (next && need_cache)
            sub.push(next.struct('indent', [
                next.struct('line', [
                    next.data('if ( '),
                    next,
                    next.data(' !== undefined ) return '),
                    next,
                    next.data(' as never'),
                ])
            ]));
        sub.push(body, name.data('}'));
        return sub;
    }
    $.$mol_view_tree2_ts_method = $mol_view_tree2_ts_method;
})($ || ($ = {}));
//mol/view/tree2/ts/method/method.ts
;
"use strict";
var $;
(function ($) {
    function $mol_build_start(paths) {
        var build = $mol_build.relative('.');
        if (paths.length > 0) {
            try {
                paths.forEach((path) => {
                    path = build.root().resolve(path).path();
                    return build.bundleAll({ path });
                });
                process.exit(0);
            }
            catch (error) {
                this.$mol_log3_fail({
                    place: '$mol_build_start',
                    message: error.message,
                    trace: error.stack,
                });
                process.exit(1);
            }
        }
        else {
            Promise.resolve().then(() => build.server().start());
        }
    }
    $.$mol_build_start = $mol_build_start;
    setTimeout(() => $mol_wire_async($mol_ambient({})).$mol_build_start(process.argv.slice(2)));
    class $mol_build extends $mol_object {
        static root(path) {
            return this.make({
                root: () => $mol_file.absolute(path),
            });
        }
        static relative(path) {
            return $mol_build.root($mol_file.relative(path).path());
        }
        server() {
            return $mol_build_server.make({
                build: $mol_const(this),
            });
        }
        root() {
            return $mol_file.relative('.');
        }
        metaTreeTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const tree = $mol_tree.fromString(file.text(), file.path());
            let content = '';
            for (const step of tree.select('build', '').sub) {
                const res = this.$.$mol_exec(file.parent().path(), step.value).stdout.toString().trim();
                if (step.type)
                    content += `let ${step.type} = ${JSON.stringify(res)}`;
            }
            if (!content)
                return [];
            const script = file.parent().resolve(`-meta.tree/${name}.ts`);
            script.text(content);
            return [script];
        }
        viewTreeTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const script = file.parent().resolve(`-view.tree/${name}.ts`);
            const sourceMap = file.parent().resolve(`-view.tree/${name}.map`);
            const locale = file.parent().resolve(`-view.tree/${name}.locale=en.json`);
            const text = file.text();
            const tree = this.$.$mol_tree2_from_string(text, file.path());
            const res = this.$.$mol_view_tree2_ts_compile(tree);
            script.text(res.script);
            locale.text(JSON.stringify(res.locales, null, '\t'));
            return [script, locale];
        }
        cssTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const script = file.parent().resolve(`-css/${name}.ts`);
            const id = file.relate(this.root());
            const styles = file.text();
            const code = 'namespace $ { $' + `mol_style_attach( ${JSON.stringify(id)},\n ${JSON.stringify(styles)}\n) }`;
            script.text(code);
            return [script];
        }
        glslTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const type = name.match(/\.(vert|frag)\./)?.[1] ?? 'both';
            const script = file.parent().resolve(`-glsl/${name}.ts`);
            const styles = file.text();
            const code = `namespace $ { $.$` + `mol_3d_glsl_${type} += ${JSON.stringify(styles)} }\n`;
            script.text(code);
            return [script];
        }
        mods({ path, exclude }) {
            const parent = $mol_file.absolute(path);
            const mods = [];
            parent.sub().slice().sort((a, b) => a.name().length - b.name().length).forEach(child => {
                const name = child.name();
                if (!/^[a-z0-9]/i.test(name))
                    return false;
                if (exclude && RegExp('[.=](' + exclude.join('|') + ')[.]', 'i').test(name))
                    return false;
                if (/(meta\.tree)$/.test(name)) {
                    mods.push(...this.metaTreeTranspile(child.path()));
                }
                else if (/(view\.tree)$/.test(name)) {
                    mods.push(...this.viewTreeTranspile(child.path()));
                }
                else if (/(\.css)$/.test(name)) {
                    mods.push(...this.cssTranspile(child.path()));
                }
                else if (/(\.glsl)$/.test(name)) {
                    mods.push(...this.glslTranspile(child.path()));
                }
                mods.push(child);
                return true;
            });
            return mods;
        }
        sources({ path, exclude }) {
            const mod = $mol_file.absolute(path);
            if (!mod.exists())
                return [];
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    return this.mods({ path, exclude }).filter(mod => mod.type() === 'file');
                default:
                    return [];
            }
        }
        sourcesSorted({ path, exclude }) {
            const mod = $mol_file.absolute(path);
            const graph = new $mol_graph();
            const sources = this.sources({ path, exclude });
            for (let src of sources) {
                graph.nodes.add(src.relate(this.root()));
            }
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let p in deps) {
                    var names;
                    if (p[0] === '/') {
                        names = p.substring(1).split('/');
                    }
                    else if (p[0] === '.') {
                        names = mod.resolve(p).relate(this.root()).split('/');
                    }
                    else {
                        names = ['node_modules', ...p.split('/')];
                    }
                    let files = [this.root()];
                    for (let name of names) {
                        let nextFiles = [];
                        for (let file of files) {
                            let validName = new RegExp(`^(${file.name()})?${name}(?![a-z0-9])`, 'i');
                            for (let child of this.mods({ path: file.path(), exclude })) {
                                if (!child.name().match(validName))
                                    continue;
                                nextFiles.push(child);
                            }
                        }
                        if (nextFiles.length === 0)
                            break;
                        files = nextFiles;
                    }
                    for (let file of files) {
                        if (file === this.root())
                            continue;
                        const from = src.relate(this.root());
                        if (!graph.nodes.has(from))
                            continue;
                        const to = file.relate(this.root());
                        if (!graph.nodes.has(to))
                            continue;
                        graph.link(from, to, { priority: deps[p] });
                    }
                }
            }
            graph.acyclic(edge => edge.priority);
            let next = [...graph.sorted].map(name => this.root().resolve(name));
            return next;
        }
        sourcesAll({ path, exclude }) {
            const sortedPaths = this.graph({ path, exclude }).sorted;
            const sources = new Set();
            sortedPaths.forEach(path => {
                const mod = this.root().resolve(path);
                this.sourcesSorted({ path: mod.path(), exclude }).forEach(src => {
                    sources.add(src);
                });
            });
            return [...sources];
        }
        tsOptions() {
            const rawOptions = JSON.parse(this.root().resolve('tsconfig.json').text() + '').compilerOptions;
            const res = $node.typescript.convertCompilerOptionsFromJson(rawOptions, ".", 'tsconfig.json');
            if (res.errors.length)
                throw res.errors;
            return res.options;
        }
        tsSource({ path, target }) {
            const content = $mol_file.absolute(path).text();
            return $node.typescript.createSourceFile(path, content, target);
        }
        tsPaths({ path, exclude, bundle }) {
            const sources = this.sourcesAll({ path, exclude }).filter(src => /tsx?$/.test(src.ext()));
            if (sources.length && bundle === 'node') {
                const types = [];
                for (let dep of this.nodeDeps({ path, exclude })) {
                    types.push('\t' + JSON.stringify(dep) + ' : typeof import( ' + JSON.stringify(dep) + ' )');
                }
                const node_types = $mol_file.absolute(path).resolve(`-node/deps.d.ts`);
                node_types.text('interface $node {\n ' + types.join('\n') + '\n}');
                sources.push(node_types);
            }
            return sources.map(src => src.path());
        }
        tsHost({ path, exclude, bundle }) {
            const host = $node.typescript.createCompilerHost(this.tsOptions());
            host.fileExists = (path) => $mol_file.relative(path).exists();
            host.readFile = (path) => $mol_file.relative(path).text();
            host.writeFile = (path, text) => $mol_file.relative(path).text(text, 'virt');
            return host;
        }
        tsTranspiler({ path, exclude, bundle }) {
            return $node.typescript.createProgram(this.tsPaths({ path, exclude, bundle }), this.tsOptions(), this.tsHost({ path, exclude, bundle }));
        }
        tsTranspile({ path, exclude, bundle }) {
            const res = this.tsTranspiler({ path, exclude, bundle }).emit();
            return res;
        }
        tsService({ path, exclude, bundle }) {
            const paths = this.tsPaths({ path, exclude, bundle });
            if (!paths.length)
                return null;
            const watchers = new Map();
            let run = () => { };
            var host = $node.typescript.createWatchCompilerHost(paths, {
                ...this.tsOptions(),
                emitDeclarationOnly: true,
            }, {
                ...$node.typescript.sys,
                watchDirectory: () => {
                    return { close() { } };
                },
                writeFile: (path, data) => {
                    $mol_file.relative(path).text(data, 'virt');
                },
                setTimeout: (cb) => {
                    run = cb;
                },
                watchFile: (path, cb) => {
                    return { close() { } };
                },
            }, $node.typescript.createSemanticDiagnosticsBuilderProgram, (diagnostic) => {
                if (diagnostic.file) {
                    const error = $node.typescript.formatDiagnostic(diagnostic, {
                        getCurrentDirectory: () => this.root().path(),
                        getCanonicalFileName: (path) => path.toLowerCase(),
                        getNewLine: () => '\n',
                    });
                    this.js_error(diagnostic.file.getSourceFile().fileName, error);
                }
                else {
                    this.$.$mol_log3_fail({
                        place: `${this}.tsService()`,
                        message: String(diagnostic.messageText),
                    });
                }
            }, () => { }, [], {
                synchronousWatchDirectory: false,
                watchFile: 4,
                watchDirectory: 0,
            });
            const service = $node.typescript.createWatchProgram(host);
            const versions = {};
            return {
                recheck: () => {
                    run();
                },
                destructor: () => service.close()
            };
        }
        js_error(path, next = null) {
            this.js_content(path);
            return next;
        }
        js_content(path) {
            const src = $mol_file.absolute(path);
            if (/\.tsx?$/.test(src.name())) {
                const res = $node.typescript.transpileModule(src.text(), { compilerOptions: this.tsOptions() });
                if (res.diagnostics?.length) {
                    return $mol_fail(new Error($node.typescript.formatDiagnostic(res.diagnostics[0], {
                        getCurrentDirectory: () => this.root().path(),
                        getCanonicalFileName: (path) => path.toLowerCase(),
                        getNewLine: () => '\n',
                    })));
                }
                const map = JSON.parse(res.sourceMapText);
                map.file = src.relate();
                map.sources = [src.relate()];
                return {
                    text: res.outputText.replace(/^\/\/#\ssourceMappingURL=[^\n]*/mg, '//' + src.relate()) + '\n',
                    map: map,
                };
            }
            else {
                const srcMap = src.parent().resolve(src.name() + '.map');
                return {
                    text: src.text().replace(/^\/\/#\ssourceMappingURL=/mg, '//') + '\n',
                    map: srcMap.exists() ? JSON.parse(srcMap.text()) : undefined
                };
            }
        }
        sources_js({ path, exclude }) {
            var sources = this.sourcesAll({ path, exclude });
            const types = {
                'svg': 'image/svg+xml',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'webp': 'image/webp',
                'bin': 'application/octet-stream',
            };
            sources = sources.map(src => {
                const ext = src.ext().replace(/^.*\./, '');
                if (types[ext]) {
                    const script = src.parent().resolve(`-bin/${src.name()}.js`);
                    const payload = $mol_base64_encode(src.buffer());
                    const path = src.relate(this.root());
                    const uri = `data:${types[ext]};base64,${payload}`;
                    script.text(`var $node = $node || {} ; $node[ ${JSON.stringify('/' + path)} ] = ${JSON.stringify(uri)}\n`);
                    return script;
                }
                if (/^[jt]sx?$/.test(ext)) {
                    return src;
                }
            }).filter(Boolean);
            return sources;
        }
        sourcesDTS({ path, exclude }) {
            let sources = this.sourcesAll({ path, exclude });
            sources = sources.filter(src => /(tsx?)$/.test(src.ext()));
            sources = sources.map(src => src.parent().resolve(src.name().replace(/(\.d)?\.tsx?$/, '.d.ts')));
            return sources;
        }
        sourcesCSS({ path, exclude }) {
            return this.sourcesAll({ path, exclude }).filter(src => /(css)$/.test(src.ext()));
        }
        static dependors = {};
        srcDeps(path) {
            const src = $mol_file.absolute(path);
            let ext = src.ext();
            if (!ext)
                return {};
            let dependencies;
            while (!dependencies) {
                dependencies = $mol_build.dependors[ext];
                if (dependencies)
                    break;
                var extShort = ext.replace(/^[^.]*\./, '');
                if (ext === extShort)
                    break;
                ext = extShort;
            }
            return dependencies ? dependencies(src) : {};
        }
        modDeps({ path, exclude }) {
            const mod = $mol_file.absolute(path);
            const depends = mod === this.root()
                ? {}
                : { '..': Number.MIN_SAFE_INTEGER };
            for (var src of this.sources({ path, exclude })) {
                $mol_build_depsMerge(depends, this.srcDeps(src.path()));
            }
            return depends;
        }
        dependencies({ path, exclude }) {
            var mod = $mol_file.absolute(path);
            if (!mod.exists())
                return {};
            switch (mod.type()) {
                case 'file':
                    return this.srcDeps(path);
                case 'dir':
                    return this.modDeps({ path, exclude });
                default:
                    return {};
            }
        }
        modEnsure(path) {
            var mod = $mol_file.absolute(path);
            var parent = mod.parent();
            if (mod !== this.root())
                this.modEnsure(parent.path());
            var mapping = mod === this.root()
                ? $mol_tree.fromString(`pack ${mod.name()} git \\https://github.com/hyoo-ru/mam.git\n`)
                : this.modMeta(parent.path());
            if (mod.exists()) {
                try {
                    if (mod.type() !== 'dir')
                        return false;
                    const git_dir = mod.resolve('.git');
                    if (git_dir.exists())
                        return false;
                    for (let repo of mapping.select('pack', mod.name(), 'git').sub) {
                        this.$.$mol_exec(mod.path(), 'git', 'init');
                        const res = this.$.$mol_exec(mod.path(), 'git', 'remote', 'show', repo.value);
                        const matched = res.stdout.toString().match(/HEAD branch: (.*?)\n/);
                        const head_branch_name = res instanceof Error || matched === null || !matched[1]
                            ? 'master'
                            : matched[1];
                        this.$.$mol_exec(mod.path(), 'git', 'remote', 'add', '--track', head_branch_name, 'origin', repo.value);
                        this.$.$mol_exec(mod.path(), 'git', 'pull');
                        mod.reset();
                        for (const sub of mod.sub()) {
                            sub.reset();
                        }
                        return true;
                    }
                }
                catch (error) {
                    this.$.$mol_log3_fail({
                        place: `${this}.modEnsure()`,
                        path,
                        message: error.message,
                    });
                }
                return false;
            }
            for (let repo of mapping.select('pack', mod.name(), 'git').sub) {
                this.$.$mol_exec(this.root().path(), 'git', 'clone', repo.value, mod.relate(this.root()));
                mod.reset();
                return true;
            }
            if (parent === this.root()) {
                throw new Error(`Root package "${mod.relate(this.root())}" not found`);
            }
            if (!mod.name().startsWith('@')
                && (parent.name() === 'node_modules'
                    || (parent === this.root().resolve('node')) && (mod.name() !== 'node'))) {
                $node[mod.name()];
            }
            if (parent.name().startsWith('@') && parent.parent().name() === 'node_modules') {
                $node[`${parent.name()}/${mod.name()}`];
            }
            return false;
        }
        modMeta(path) {
            const decls = [];
            const pack = $mol_file.absolute(path);
            for (const file of pack.sub()) {
                if (!/\.meta\.tree$/.test(file.name()))
                    continue;
                decls.push(...$mol_tree.fromString(file.text(), file.path()).sub);
            }
            return new $mol_tree({ sub: decls });
        }
        graph({ path, exclude }) {
            let graph = new $mol_graph();
            let added = {};
            var addMod = (mod) => {
                if (added[mod.path()])
                    return;
                added[mod.path()] = true;
                graph.nodes.add(mod.relate(this.root()));
                const checkDep = (p) => {
                    const isFile = /\.\w+$/.test(p);
                    var dep = (p[0] === '/')
                        ? this.root().resolve(p + (isFile ? '' : '/' + p.replace(/.*\//, '')))
                        : (p[0] === '.')
                            ? mod.resolve(p)
                            : this.root().resolve('node_modules').resolve('./' + p);
                    try {
                        this.modEnsure(dep.path());
                    }
                    catch (error) {
                        error.message = `${error.message}\nDependency "${p}" -> "${dep.relate(this.root())}" from "${mod.relate(this.root())}" `;
                        $mol_fail_hidden(error);
                    }
                    while (!dep.exists())
                        dep = dep.parent();
                    if (dep.type() === 'dir' && dep.name() !== 'index') {
                        let index = dep.resolve('index.js');
                        if (index.exists())
                            dep = index;
                    }
                    if (mod === dep)
                        return;
                    const from = mod.relate(this.root());
                    const to = dep.relate(this.root());
                    const edge = graph.edges_out.get(from)?.get(to);
                    if (!edge || (deps[p] > edge.priority)) {
                        graph.link(from, to, { priority: deps[p] });
                    }
                    addMod(dep);
                };
                let deps = this.dependencies({ path: mod.path(), exclude });
                for (let p in deps) {
                    checkDep(p);
                }
            };
            this.modEnsure(path);
            addMod($mol_file.absolute(path));
            graph.acyclic(edge => edge.priority);
            return graph;
        }
        bundleAllWeb({ path }) {
            this.bundle({ path, bundle: 'web.deps.json' });
            this.bundle({ path, bundle: 'web.css' });
            this.bundle({ path, bundle: 'web.js' });
            this.bundle({ path, bundle: 'web.test.js' });
            this.bundle({ path, bundle: 'web.test.html' });
            this.bundle({ path, bundle: 'web.view.tree' });
            this.bundle({ path, bundle: 'web.meta.tree' });
            this.bundle({ path, bundle: 'web.locale=en.json' });
            return null;
        }
        bundleAllWebAudit({ path }) {
            this.bundle({ path, bundle: 'web.audit.js' });
            this.bundle({ path, bundle: 'web.d.ts' });
        }
        bundleAllNode({ path }) {
            this.bundle({ path, bundle: 'node.deps.json' });
            this.bundle({ path, bundle: 'node.js' });
            this.bundle({ path, bundle: 'node.test.js' });
            this.bundle({ path, bundle: 'node.view.tree' });
            this.bundle({ path, bundle: 'node.meta.tree' });
            this.bundle({ path, bundle: 'node.locale=en.json' });
            return null;
        }
        bundleAllNodeAudit({ path }) {
            this.bundle({ path, bundle: 'node.audit.js' });
            this.bundle({ path, bundle: 'node.d.ts' });
        }
        bundleAll({ path }) {
            this.bundle({ path, bundle: 'index.html' });
            this.bundle({ path, bundle: 'test.html' });
            this.bundleAllWeb({ path });
            this.bundleAllWebAudit({ path });
            this.bundleAllNode({ path });
            this.bundleAllNodeAudit({ path });
            this.bundle({ path, bundle: 'package.json' });
            this.bundle({ path, bundle: 'readme.md' });
            this.bundleFiles({ path, exclude: ['node'] });
            this.bundleCordova({ path, exclude: ['node'] });
            return null;
        }
        bundle({ path, bundle = '' }) {
            bundle = bundle && bundle.replace(/\.map$/, '');
            var envsDef = ['web', 'node'];
            var envs = bundle ? [] : envsDef.slice();
            var stages = ['test', 'dev'];
            if (bundle) {
                var [bundle, tags, type, locale] = /^(.*?)(?:\.(audit\.js|test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(bundle);
                tags.split('.').forEach(tag => {
                    if (envsDef.indexOf(tag) !== -1)
                        envs = [tag];
                });
            }
            var res = [];
            envs.forEach(env => {
                var exclude = envsDef.filter(e => e !== env).concat(stages);
                if (!type || type === 'deps.json') {
                    res = res.concat(this.bundleDepsJSON({ path, exclude, bundle: env }));
                }
                if (!type || type === 'css') {
                    res = res.concat(this.bundleCSS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'js') {
                    res = res.concat(this.bundleJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'mjs') {
                    res = res.concat(this.bundleMJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'test.js') {
                    res = res.concat(this.bundleTestJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'audit.js') {
                    res = res.concat(this.bundleAuditJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'd.ts') {
                    res = res.concat(this.bundleDTS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'view.tree') {
                    res = res.concat(this.bundleViewTree({ path, exclude, bundle: env }));
                }
                if (!type || type === 'meta.tree') {
                    res = res.concat(this.bundleMetaTree({ path, exclude, bundle: env }));
                }
                if (!type || /^locale=(\w+).json$/.test(type)) {
                    res = res.concat(this.bundleLocale({
                        path,
                        exclude,
                        bundle: env
                    }));
                }
            });
            if (!bundle || bundle === 'package.json') {
                res = res.concat(this.bundlePackageJSON({ path, exclude: ['web', 'test'] }));
            }
            if (!bundle || bundle === 'readme.md') {
                res = res.concat(this.bundleReadmeMd({ path, exclude: ['web'] }));
            }
            if (!bundle || bundle === 'index.html') {
                res = res.concat(this.bundleIndexHtml({ path }));
            }
            if (!bundle || bundle === 'test.html') {
                res = res.concat(this.bundleTestHtml({ path }));
            }
            if (!bundle || /\//.test(bundle)) {
                res = res.concat(this.bundleFiles({ path, exclude: ['node'] }));
            }
            return res;
        }
        logBundle(target, duration) {
            const path = target.relate(this.root());
            this.$.$mol_log3_done({
                place: this,
                duration: `${duration}ms`,
                message: `Built`,
                path,
            });
        }
        bundleJS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var targetJS = pack.resolve(`-/${bundle}.js`);
            var sources = this.sources_js({ path, exclude });
            if (sources.length === 0)
                return [];
            var concater = new $mol_sourcemap_builder(this.root().relate(targetJS.parent()), ';');
            concater.add('"use strict"');
            if (bundle === 'node') {
                concater.add('var exports = void 0');
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
            }
            const errors = [];
            sources.forEach((src) => {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(this.root()))) {
                        return;
                    }
                }
                try {
                    const content = this.js_content(src.path());
                    const isCommonJs = /typeof +exports|module\.exports|\bexports\.\w+\s*=/.test(content.text);
                    if (isCommonJs) {
                        concater.add(`\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "` + src.parent().relate(this.root().resolve('node_modules')) + `/" ) ] }; \n`, '-');
                    }
                    concater.add(content.text, '', content.map);
                    if (isCommonJs) {
                        const idFull = src.relate(this.root().resolve('node_modules'));
                        const idShort = idFull.replace(/\/index\.js$/, '').replace(/\.js$/, '');
                        concater.add(`\n$${''}node[ "${idShort}" ] = $${''}node[ "${idFull}" ] = module.${''}exports }.call( {} , {} )\n`, '-');
                    }
                }
                catch (error) {
                    errors.push(error);
                }
            });
            if (errors.length)
                $mol_fail_hidden(new $mol_error_mix(`Build fail ${path}`, ...errors));
            var targetJSMap = pack.resolve(`-/${bundle}.js.map`);
            targetJS.text(concater.content + '\n//# sourceMappingURL=' + targetJSMap.relate(targetJS.parent()) + '\n');
            targetJSMap.text(concater.toString());
            this.logBundle(targetJS, Date.now() - start);
            return [targetJS, targetJSMap];
        }
        bundleMJS({ path, exclude, bundle }) {
            const start = Date.now();
            const [targetJS, targetJSMap] = this.bundleJS({ path, exclude, bundle });
            if (!targetJS)
                return [];
            const targetMJS = targetJS.parent().resolve(targetJS.name().replace(/\.js$/, '.mjs'));
            targetMJS.text(targetJS.text().replace(/(^\/\/# sourceMappingURL.*)/m, 'export default $\n$1'));
            this.logBundle(targetMJS, Date.now() - start);
            return [targetMJS, targetJSMap];
        }
        bundleAuditJS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.audit.js`);
            var exclude_ext = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            this.tsService({ path, exclude: exclude_ext, bundle })?.recheck();
            const errors = [];
            const paths = this.tsPaths({ path, exclude: exclude_ext, bundle });
            for (const path of paths) {
                this.js_content(path);
                const error = this.js_error(path);
                if (!error)
                    continue;
                errors.push(new Error(error));
                this.js_error(path, null);
            }
            this.logBundle(target, Date.now() - start);
            if (errors.length) {
                $mol_fail_hidden(new $mol_error_mix(`Build fail ${path}`, ...errors));
            }
            target.text('console.info("Audit passed")');
            return [target];
        }
        bundleTestJS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var root = this.root();
            var target = pack.resolve(`-/${bundle}.test.js`);
            var targetMap = pack.resolve(`-/${bundle}.test.js.map`);
            var concater = new $mol_sourcemap_builder(this.root().relate(target.parent()), ';');
            concater.add('"use strict"');
            var exclude_ext = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            var sources = this.sources_js({ path, exclude: exclude_ext });
            var sourcesNoTest = new Set(this.sources_js({ path, exclude }));
            var sourcesTest = sources.filter(src => !sourcesNoTest.has(src));
            if (bundle === 'node') {
                sourcesTest = [...sourcesNoTest, ...sourcesTest];
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
            }
            if (sources.length === 0)
                return [];
            const errors = [];
            sourcesTest.forEach((src) => {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(root))) {
                        return;
                    }
                }
                try {
                    const content = this.js_content(src.path());
                    concater.add(content.text, '', content.map);
                }
                catch (error) {
                    errors.push(error);
                }
            });
            target.text(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()) + '\n');
            targetMap.text(concater.toString());
            this.logBundle(target, Date.now() - start);
            if (errors.length)
                $mol_fail_hidden(new $mol_error_mix(`Build fail ${path}`, ...errors));
            if (bundle === 'node') {
                this.$.$mol_exec(this.root().path(), 'node', '--trace-uncaught', target.relate(this.root()));
            }
            return [target, targetMap];
        }
        bundleTestHtml({ path }) {
            const start = Date.now();
            const pack = $mol_file.absolute(path);
            const source = pack.resolve('index.html');
            const target = pack.resolve(`-/test.html`);
            let content = source.exists()
                ? source.text()
                : `<!doctype html><meta charset="utf-8" /><body><script src="web.js" charset="utf-8"></script>`;
            content = content.replace(/(<\/body>|$)/, `
				<script src="/mol/build/client/client.js" charset="utf-8"></script>
				<script src="web.test.js" charset="utf-8"></script>
				<script>
					addEventListener( 'load', ()=> setTimeout( ()=> {
						const audit =  document.createElement( 'script' )
						audit.src = 'web.audit.js'
						document.head.appendChild( audit )
					}, 500 ) )
				</script>
				$1`);
            target.text(content);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleDTS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.d.ts`);
            var sources = this.sourcesDTS({ path, exclude });
            if (sources.length === 0)
                return [];
            var concater = new $mol_sourcemap_builder(target.parent().path());
            sources.forEach(function (src) {
                if (!src.exists() || !src.text())
                    return;
                concater.add(src.text(), src.relate(target.parent()));
            });
            target.text(concater.content + '\nexport = $;');
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleViewTree({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.view.tree`);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /view.tree$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            target.text(sources.map(src => src.text()).join('\n'));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleMetaTree({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.meta.tree`);
            const sortedPaths = this.graph({ path, exclude }).sorted;
            const namedMetas = [];
            sortedPaths.forEach(path => {
                const meta = this.modMeta(this.root().resolve(path).path());
                if (meta.sub.length > 0) {
                    namedMetas.push(meta.clone({ value: '/' + path }));
                }
            });
            if (namedMetas.length === 0)
                return [];
            target.text(new $mol_tree({ sub: namedMetas }).toString());
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        nodeDeps({ path, exclude }) {
            var res = new Set();
            var sources = this.sourcesAll({ path, exclude });
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let dep in deps) {
                    if (!/^\/node(?:_modules)?\//.test(dep))
                        continue;
                    let mod = dep.replace(/^\/node(?:_modules)?\//, '').replace(/\/.*/g, '');
                    res.add(mod);
                }
            }
            return [...res];
        }
        bundleReadmeMd({ path, exclude }) {
            const start = Date.now();
            const root = this.root();
            const pack = $mol_file.absolute(path);
            let mod = pack;
            let source;
            while (true) {
                source = mod.resolve('README.md');
                if (source.exists())
                    break;
                source = mod.resolve('readme.md');
                if (source.exists())
                    break;
                if (mod === root)
                    break;
                mod = mod.parent();
            }
            const target = pack.resolve('-/README.md');
            target.text(source?.text() ?? path);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundlePackageJSON({ path, exclude }) {
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            const source = pack.resolve(`package.json`);
            const target = pack.resolve(`-/package.json`);
            let name = pack.relate(this.root()).replace(/\//g, '_');
            let json = {
                name,
                version: '0.0.0',
                exports: {
                    node: {
                        import: './node.mjs',
                        default: './node.js'
                    },
                    types: './web.d.ts',
                    import: './web.mjs',
                    default: './web.js'
                },
                main: './web.js',
                module: './web.mjs',
                browser: './web.js',
                types: './web.d.ts',
                keywords: [],
                dependencies: {}
            };
            if (source.exists()) {
                Object.assign(json, JSON.parse(source.text()));
            }
            let version = json.version.split('.').map(Number);
            name = json.name || name;
            try {
                const published = [].concat(JSON.parse(this.$.$mol_exec('', 'npm', 'view', name, 'versions', '--json').stdout.toString())).slice(-1)[0].split('.').map(Number);
                if (published[0] > version[0]) {
                    version = published;
                }
                else if (published[0] === version[0] && published[1] > version[1]) {
                    version[1] = published[1];
                }
                if (!(published[2] <= version[2])) {
                    version[2] = published[2];
                }
            }
            catch { }
            ++version[2];
            json.version = version.join('.');
            json.dependencies = {};
            for (let dep of this.nodeDeps({ path, exclude })) {
                if (require('module').builtinModules.includes(dep))
                    continue;
                json.dependencies[dep] = `*`;
            }
            json.keywords = [...this.graph({ path, exclude }).nodes]
                .filter(Boolean)
                .filter(path => !/[.-]/.test(path))
                .map(path => '$' + path.replaceAll('/', '_'));
            target.text(JSON.stringify(json, null, '  '));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleIndexHtml({ path, exclude }) {
            const pack = $mol_file.absolute(path);
            const targets = [];
            const start = Date.now();
            const html = pack.resolve('index.html');
            const tree = pack.resolve('index.xml.tree');
            const target = pack.resolve('-/index.html');
            if (tree.exists()) {
                const xml_tree = this.$.$mol_tree2_from_string(tree.text());
                const text = this.$.$mol_tree2_xml_to_text(xml_tree);
                const xml = this.$.$mol_tree2_text_to_string(text);
                target.text(xml);
            }
            else if (html.exists()) {
                target.text(html.text());
            }
            if (target.exists()) {
                targets.push(target);
                this.logBundle(target, Date.now() - start);
            }
            return targets;
        }
        bundleFiles({ path, exclude }) {
            const root = this.root();
            const pack = $mol_file.absolute(path);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /meta.tree$/.test(src.ext()));
            const targets = [];
            sources.forEach(source => {
                const tree = $mol_tree.fromString(source.text(), source.path());
                const pushFile = (file) => {
                    const start = Date.now();
                    const target = pack.resolve(`-/${file.relate(root)}`);
                    target.buffer(file.buffer());
                    targets.push(target);
                    this.logBundle(target, Date.now() - start);
                };
                const addFilesRecursive = (file) => {
                    if (!file.exists())
                        return;
                    if (file.type() === 'dir') {
                        file.sub().forEach(sub => {
                            addFilesRecursive(sub);
                        });
                    }
                    else {
                        pushFile(file);
                    }
                };
                tree.select('deploy').sub.forEach(deploy => {
                    addFilesRecursive(root.resolve(deploy.value.replace(/^\//, '')));
                });
            });
            return targets;
        }
        bundleCordova({ path, exclude }) {
            const start = Date.now();
            const pack = $mol_file.absolute(path);
            const cordovaOut = pack.resolve('-');
            const cordova = pack.resolve('-cordova');
            const config = pack.resolve('config.xml');
            if (!config.exists())
                return [];
            const config_target = cordova.resolve('config.xml');
            config_target.text(config.text());
            const targets = [config_target];
            const sources = pack.resolve('-').find().filter(src => src.type() === 'file');
            for (const source of sources) {
                const target = cordova.resolve(`www/${source.relate(cordovaOut)}`);
                target.text(source.text());
                targets.push(target);
            }
            this.logBundle(cordova, Date.now() - start);
            return targets;
        }
        bundleCSS({ path, exclude, bundle }) {
            if (bundle === 'node')
                return [];
            const start = Date.now();
            var pack = $mol_file.absolute(path);
            var sources = [];
            var target = pack.resolve(`-/${bundle}.css`);
            var targetMap = pack.resolve(`-/${bundle}.css.map`);
            const result = {
                css: '/* CSS compiles into js bundle now! */',
                map: '/* CSS compiles into js bundle now! */',
            };
            target.text(result.css);
            targetMap.text(JSON.stringify(result.map, null, '\t'));
            this.logBundle(target, Date.now() - start);
            return [target, targetMap];
        }
        bundleLocale({ path, exclude, bundle }) {
            const pack = $mol_file.absolute(path);
            const sources = this.sourcesAll({ path, exclude }).filter(src => /(locale=(\w+)\.json)$/.test(src.name()));
            if (!sources.length)
                return [];
            const locales = {};
            sources.forEach(src => {
                const [ext, lang] = /locale=(\w+)\.json$/.exec(src.name());
                if (!locales[lang])
                    locales[lang] = {};
                const loc = JSON.parse(src.text());
                for (let key in loc) {
                    locales[lang][key] = loc[key];
                }
            });
            const targets = Object.keys(locales).map(lang => {
                const start = Date.now();
                const target = pack.resolve(`-/${bundle}.locale=${lang}.json`);
                const locale = locales[lang];
                if (lang !== 'en' && locales['en']) {
                    for (let key in locale) {
                        if (key in locales['en'])
                            continue;
                        delete locale[key];
                        this.$.$mol_log3_warn({
                            place: `${this}.buildLocale()`,
                            message: `Excess locale key`,
                            hint: 'May be you forgot to remove this key?',
                            lang,
                            key,
                        });
                    }
                }
                const locale_sorted = {};
                for (let key of Object.keys(locale).sort()) {
                    locale_sorted[key] = locale[key];
                }
                target.text(JSON.stringify(locale_sorted, null, '\t'));
                this.logBundle(target, Date.now() - start);
                return target;
            });
            return targets;
        }
        bundleDepsJSON({ path, exclude, bundle }) {
            const start = Date.now();
            const pack = $mol_file.absolute(path);
            const list = this.sourcesAll({ path, exclude });
            if (!list.length)
                return [];
            const origs = list.filter(src => !/\/-/.test(src.path()));
            const sloc = {};
            for (const src of origs) {
                const ext = src.name().replace(/^.*\./, '');
                const count = src.text().trim().split(/[\n\r]\s*/).length;
                sloc[ext] = (sloc[ext] || 0) + count;
            }
            const graph = this.graph({ path, exclude });
            const deps = {};
            for (let dep of graph.nodes) {
                deps[dep] = this.dependencies({ path: this.root().resolve(dep).path(), exclude });
            }
            const deps_in = {};
            for (const [dep, pair] of graph.edges_in) {
                if (!deps_in[dep]) {
                    deps_in[dep] = {};
                }
                for (const [mod, edge] of pair) {
                    deps_in[dep][mod] = edge.priority;
                }
            }
            const deps_out = {};
            for (const [mod, pair] of graph.edges_out) {
                if (!deps_out[mod]) {
                    deps_out[mod] = {};
                }
                for (const [dep, edge] of pair) {
                    deps_out[mod][dep] = edge.priority;
                }
            }
            const data = {
                files: list.map(src => src.relate(this.root())),
                mods: graph.sorted,
                deps_in,
                deps_out,
                sloc,
                deps
            };
            const target = pack.resolve(`-/${bundle}.deps.json`);
            target.text(JSON.stringify(data));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_build.prototype, "server", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "metaTreeTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "viewTreeTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "cssTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "glslTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "mods", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sources", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesSorted", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesAll", null);
    __decorate([
        $mol_mem
    ], $mol_build.prototype, "tsOptions", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsSource", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsPaths", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsHost", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsTranspiler", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsService", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "js_error", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "js_content", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sources_js", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesDTS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesCSS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "srcDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "dependencies", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modEnsure", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modMeta", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "graph", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllWeb", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllWebAudit", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllNode", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllNodeAudit", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAll", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundle", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleMJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleAuditJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleTestJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleTestHtml", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleDTS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleViewTree", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleMetaTree", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "nodeDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleReadmeMd", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundlePackageJSON", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleIndexHtml", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleFiles", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleCordova", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleCSS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleLocale", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleDepsJSON", null);
    __decorate([
        $mol_mem_key
    ], $mol_build, "root", null);
    $.$mol_build = $mol_build;
    function $mol_build_depsMerge(target, source) {
        for (var path in source) {
            if (target[path] >= source[path])
                continue;
            target[path] = source[path];
        }
        return target;
    }
    $mol_build.dependors['js'] = source => {
        var depends = {};
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
                path = path.replace(/(\/[^\/.]+)$/, '$1.js').replace(/\/$/, '/index.js');
                if (path[0] === '.')
                    path = '../' + path;
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['ts'] = $mol_build.dependors['tsx'] = $mol_build.dependors['jam.js'] = source => {
        var depends = {};
        var lines = String(source.text())
            .replace(/\/\*(?!\*)[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\$([a-z0-9]{2,})(?:((?:[\._A-Z0-9][a-z0-9]+)+)|\[\s*['"]([^'"]+?)['"]\s*\])?/g, (str, pack, path, name) => {
                if (path)
                    path = '/' + pack + path.replace(/(?=[A-Z])/g, '_').toLowerCase().replace(/[_.\[\]'"]+/g, '/');
                if (name)
                    name = '/' + pack + '/' + name;
                pack = '/' + pack;
                $mol_build_depsMerge(depends, { [path || name || pack]: priority });
                return str;
            });
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['view.ts'] = source => {
        var treeName = './' + source.name().replace(/ts$/, 'tree');
        var depends = { [treeName]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
    };
    $mol_build.dependors['node.ts'] = $mol_build.dependors['web.ts'] = source => {
        var common = './' + source.name().replace(/\.(node|web)\.ts$/, '.ts');
        var depends = { [common]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
    };
    $mol_build.dependors['view.css'] = source => {
        var treeName = './' + source.name().replace(/css$/, 'tree');
        var depends = { [treeName]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['css'](source));
        return depends;
    };
    $mol_build.dependors['css'] = source => {
        var depends = {
            '/mol/style/attach': 0,
        };
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/(?:--|\[)([a-z][a-z0-9]+(?:[_][a-z0-9]+)+)/ig, (str, name) => {
                $mol_build_depsMerge(depends, { ['/' + name.replace(/[._-]/g, '/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['glsl'] = source => {
        var depends = {
            '/mol/3d/glsl': 0,
        };
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/([a-z][a-z0-9]+(?:_+[a-z0-9]+)+)/ig, (str, name) => {
                const path = name.split(/_+/g);
                if (path[0] === 'gl')
                    return str;
                $mol_build_depsMerge(depends, { ['/' + path.join('/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['meta.tree'] = source => {
        const depends = {};
        const tree = $mol_tree.fromString(source.text(), source.path());
        tree.select('require').sub.forEach(leaf => {
            depends[leaf.value] = 0;
        });
        tree.select('include').sub.forEach(leaf => {
            depends[leaf.value] = -9000;
        });
        return depends;
    };
    $mol_build.dependors['view.tree'] = source => {
        return {
            [`/${source.parent().relate()}/-view.tree/${source.name()}.ts`]: 0,
        };
    };
})($ || ($ = {}));
//mol/build/build.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_server extends $mol_object {
        express() {
            var express = $node['express']();
            this.expressHandlers().forEach(plugin => express.use(plugin));
            return express;
        }
        internal_ip() {
            const nets = $node.os.networkInterfaces();
            const results = Object.create(null);
            for (const name of Object.keys(nets)) {
                for (const net of nets[name]) {
                    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
                    if (net.family === familyV4Value && !net.internal) {
                        if (!results[name]) {
                            results[name] = [];
                        }
                        results[name].push(net.address);
                    }
                }
            }
            const internal = Object.values(results).at(-1);
            return internal[0];
        }
        http() {
            const server = $node.http.createServer(this.express());
            $node['portastic'].find({
                min: this.port(),
                max: this.port() + 1000,
                retrieve: 1
            }).then((ports) => {
                server.listen(ports[0]);
                this.$.$mol_log3_done({
                    place: `${this}`,
                    message: `Started`,
                    network: `http://${this.internal_ip()}:${ports[0]}/`,
                    loopback: `http://localhost:${ports[0]}/`,
                });
            });
            return server;
        }
        connections = new Set();
        socket() {
            const socket = new $node.ws.Server({
                server: this.http(),
            });
            socket.on('connection', line => {
                this.connections.add(line);
                line.on('message', (message, isBinary) => {
                    for (const other of this.connections) {
                        if (line === other)
                            continue;
                        other.send(message, { binary: isBinary });
                    }
                });
            });
            return socket;
        }
        expressHandlers() {
            return [
                this.expressCors(),
                this.expressCompressor(),
                this.expressBodier(),
                this.expressGenerator(),
                this.expressIndex(),
                this.expressFiler(),
                this.expressDirector(),
            ];
        }
        expressCompressor() {
            return $node['compression']();
        }
        expressCors() {
            return $node.cors();
        }
        expressBodier() {
            return $node['body-parser'].json({
                limit: this.bodyLimit()
            });
        }
        expressFiler() {
            return $node.express.static($node.path.resolve(this.rootPublic()), {
                maxAge: this.cacheTime()
            });
        }
        expressDirector() {
            return $node['serve-index'](this.rootPublic(), { icons: true });
        }
        expressIndex() {
            return (req, res, next) => next();
        }
        expressGenerator() {
            return (req, res, next) => next();
        }
        bodyLimit() {
            return '1mb';
        }
        cacheTime() {
            return 1000 * 60 * 60 * 24 * 365 * 1000;
        }
        port() {
            return 80;
        }
        rootPublic() {
            return '.';
        }
    }
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "express", null);
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "http", null);
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "socket", null);
    $.$mol_server = $mol_server;
})($ || ($ = {}));
//mol/server/server.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        const current = $mol_wire_auto();
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    function $mol_compare_text(item = (item) => String(item)) {
        return (a, b) => {
            const text_a = item(a).trim().toLowerCase();
            const text_b = item(b).trim().toLowerCase();
            const parts_a = text_a.split(/(\d+)/);
            const parts_b = text_b.split(/(\d+)/);
            const count = Math.max(parts_a.length, parts_b.length);
            for (let i = 0; i < count; ++i) {
                const part_a = parts_a[i] || '';
                const part_b = parts_b[i] || '';
                const diff = Number(part_a) - Number(part_b);
                if (diff)
                    return diff;
                if (part_a > part_b)
                    return 1;
                if (part_a < part_b)
                    return -1;
            }
            return parts_a.length - parts_b.length;
        };
    }
    $.$mol_compare_text = $mol_compare_text;
})($ || ($ = {}));
//mol/compare/text/text.ts
;
"use strict";
var $;
(function ($) {
    class $mol_build_server extends $mol_server {
        static trace = false;
        expressGenerator() {
            const self = $mol_wire_async(this);
            return function (req, res, next) {
                return self.handleRequest.call(self, req, res, next);
            };
        }
        handleRequest(req, res, next) {
            res.set('Cache-Control', 'must-revalidate, public, ');
            try {
                return this.generate(req.url) && Promise.resolve().then(next);
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    this.$.$mol_log3_fail({
                        place: `${this}.handleRequest()`,
                        uri: req.path,
                        message: error.message,
                        stack: error.stack,
                    });
                }
                if (req.url.match(/\.js$/)) {
                    const script = error.message.split('\n\n').map(msg => {
                        return `console.error( ${JSON.stringify(msg)} )`;
                    }).join('\n');
                    res.send(script).end();
                }
                else {
                    if (!this.$.$mol_build_server.trace) {
                        error.message += '\n' + 'Set $mol_build_server.trace = true for stacktraces';
                    }
                    res.status(500).send(error.toString()).end();
                    this.$.$mol_log3_fail({
                        place: `${this}.handleRequest()`,
                        uri: req.path,
                        stack: this.$.$mol_build_server.trace ? error.stack : undefined,
                        message: error.message,
                    });
                }
            }
        }
        build() {
            return $mol_fail(new Error('Not implemented'));
        }
        generate(url) {
            $mol_wire_solid();
            const matched = url.match(/^(.*)\/-\/(\w+(?:.\w+)+)$/);
            if (!matched)
                return [];
            const build = this.build();
            const [, rawpath, bundle] = matched;
            const mod = build.root().resolve(rawpath);
            if (bundle === 'web.css') {
                this.$.$mol_log3_warn({
                    place: `${this}.generate()`,
                    message: 'CSS compiles into JS bundle now',
                    hint: 'Remove link to web.css',
                });
            }
            const path = mod.path();
            return build.bundle({ path, bundle });
        }
        expressIndex() {
            return (req, res, next) => {
                const root = $mol_file.absolute(this.rootPublic());
                const dir = root.resolve(req.path);
                const build = this.build();
                build.modEnsure(dir.path());
                const match = req.url.match(/(\/|.*[^\-]\/)([\?#].*)?$/);
                if (!match)
                    return next();
                const file = root.resolve(`${req.path}index.html`);
                if (file.exists()) {
                    return res.redirect(301, `${match[1]}-/test.html${match[2] ?? ''}`);
                }
                if (dir.type() === 'dir') {
                    const files = [{ name: '-', type: 'dir' }];
                    for (const file of dir.sub()) {
                        if (!files.find(({ name }) => name === file.name())) {
                            files.push({ name: file.name(), type: file.type() });
                        }
                        if (/\.meta\.tree$/.test(file.name())) {
                            const meta = $$.$mol_tree2_from_string(file.text());
                            for (const pack of meta.select('pack', null).kids) {
                                if (!files.find(({ name }) => name === pack.type))
                                    files.push({ name: pack.type, type: 'dir' });
                            }
                        }
                    }
                    const html = `
						<style>
							body {
								display: flex;
								flex-direction: column;
								flex-wrap: wrap;
								font: 1rem/1.5rem sans-serif;
								height: 100%;
								margin: 0;
								padding: 0.75rem;
								box-sizing: border-box;
							}
							a {
								text-decoration: none;
								color: rgb(57, 115, 172);
								font-weight: bolder;
							}
							a:hover {
								background: hsl( 0deg, 0%, 0%, .05 )
							}
							a[href^="."], a[href^="-"], a[href="node_modules"] {
								opacity: 0.5;
							}
							a[href=".."], a[href="-"] {
								opacity: 1;
							}
						</style>
						<link href="/_logo.png" rel="icon" />
						<a href="..">&#x1F4C1; ..</a>
						` + files
                        .sort($mol_compare_text((item) => item.type))
                        .map(file => `<a href="${file.name}">${file.type === 'dir' ? '&#x1F4C1;' : '&#128196;'} ${file.name}</a>`)
                        .join('\n');
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*',
                    });
                    return res.end(html);
                }
                return next();
            };
        }
        port() {
            return 9080;
        }
        lines(next = new Map()) {
            return next;
        }
        socket() {
            return super.socket().on('connection', (line, req) => {
                const path = req.url.replace(/\/-.*/, '').substring(1);
                this.$.$mol_log3_rise({
                    place: this,
                    message: `Connect`,
                    path,
                });
                this.lines(new Map([...this.lines(), [line, path]]));
                line.on('close', () => {
                    const lines = new Map(this.lines());
                    lines.delete(line);
                    this.lines(lines);
                });
            });
        }
        start() {
            const socket = this.socket();
            for (const [line, path] of this.lines()) {
                this.notify([line, path]);
            }
            return socket;
        }
        notify([line, path]) {
            try {
                const build = this.build();
                const bundle = build.root().resolve(path);
                const sources = build.sourcesAll({ path: bundle.path(), exclude: ['node'] });
                for (const src of sources)
                    src.buffer();
            }
            catch (error) {
                this.$.$mol_log3_fail({
                    place: `${this}`,
                    message: error?.message,
                    path
                });
            }
            if (!$mol_mem_cached(() => this.notify([line, path])))
                return true;
            this.$.$mol_log3_rise({
                place: `${this}`,
                message: `$mol_build_obsolete`,
                path
            });
            line.send('$mol_build_obsolete');
            return true;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "generate", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "lines", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "socket", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "start", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "notify", null);
    $.$mol_build_server = $mol_build_server;
})($ || ($ = {}));
//mol/build/server/server.node.ts
;
"use strict";
var $;
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
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
            const res = test(context);
            if ($mol_promise_like(res)) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
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
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
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
//mol/test/test.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
        process.exit(0);
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));
//mol/test/test.node.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));
//mol/log3/log3.test.ts
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
            if (view instanceof $mol_dom_context.Node) {
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
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
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
//mol/dom/render/children/children.ts
;
"use strict";
//mol/type/error/error.ts
;
"use strict";
//mol/type/assert/assert.ts
;
"use strict";
//mol/type/assert/assert.test.ts
;
"use strict";
//mol/type/partial/deep/deep.ts
;
"use strict";
//mol/type/partial/deep/deep.test.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));
//mol/jsx/jsx.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));
//mol/jsx/jsx.test.tsx
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
                    if (index < 0)
                        return undefined;
                    if (index >= size())
                        return undefined;
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return target[field];
            },
            set(target, field) {
                return $mol_fail(new TypeError(`Lazy range is read only (trying to set field ${JSON.stringify(field)})`));
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
        toReversed() {
            return $mol_range2(index => this[this.length - 1 - index], () => this.length);
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
        reverse() {
            return $mol_fail(new TypeError(`Mutable reverse is forbidden. Use toReversed instead.`));
        }
        sort() {
            return $mol_fail(new TypeError(`Mutable sort is forbidden. Use toSorted instead.`));
        }
        [Symbol.toPrimitive]() {
            return $mol_guid();
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));
//mol/range2/range2.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'lazy calls'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 10);
            $mol_assert_equal(list[-1], undefined);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[9], 9);
            $mol_assert_equal(list[9.5], undefined);
            $mol_assert_equal(list[10], undefined);
            $mol_assert_equal(calls, 2);
        },
        'infinity list'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index));
            $mol_assert_equal(list.length, Number.POSITIVE_INFINITY);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER);
            $mol_assert_equal(list[Number.POSITIVE_INFINITY], undefined);
            $mol_assert_equal(calls, 3);
        },
        'stringify'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
            $mol_assert_equal(list.join(';'), '0;1;2;3;4');
        },
        'for-of'() {
            let log = '';
            for (let i of $mol_range2(i => i + 1, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '12345');
        },
        'for-in'() {
            let log = '';
            for (let i in $mol_range2(i => i, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '01234');
        },
        'forEach'() {
            let log = '';
            $mol_range2(i => i, () => 5).forEach(i => log += i);
            $mol_assert_equal(log, '01234');
        },
        'lazy concat'() {
            let calls1 = 0;
            let calls2 = 0;
            const list = $mol_range2(index => (++calls1, index), () => 5).concat([0, 1, 2, 3, 4], $mol_range2(index => (++calls2, index), () => 5));
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 15);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[5], 0);
            $mol_assert_equal(list[9], 4);
            $mol_assert_equal(list[10], 0);
            $mol_assert_equal(list[14], 4);
            $mol_assert_equal(list[15], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'filter'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).filter(v => v % 2).slice(0, 3);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 1);
            $mol_assert_equal(list[2], 5);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 10);
        },
        'reverse'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).toReversed().slice(0, 3);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 9);
            $mol_assert_equal(list[2], 7);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 2);
        },
        'reduce'() {
            let calls = 0;
            const list = $mol_range2().slice(1, 6);
            $mol_assert_equal(list.reduce((s, v) => s + v), 15);
            $mol_assert_equal(list.reduce((s, v) => s + v, 5), 20);
        },
        'lazy map'() {
            let calls1 = 0;
            let calls2 = 0;
            const source = $mol_range2(index => (++calls1, index), () => 5);
            const target = source.map((item, index, self) => {
                ++calls2;
                $mol_assert_equal(source, self);
                return index + 10;
            }, () => 5);
            $mol_assert_ok(target instanceof Array);
            $mol_assert_equal(target.length, 5);
            $mol_assert_equal(target[0], 10);
            $mol_assert_equal(target[4], 14);
            $mol_assert_equal(target[5], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy slice'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).slice(3, 7);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(list[0], 3);
            $mol_assert_equal(list[3], 6);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy some'() {
            let calls = 0;
            $mol_assert_ok($mol_range2(index => (++calls, index), () => 5).some(v => v >= 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_not($mol_range2(i => i, () => 0).some(v => true));
            $mol_assert_ok($mol_range2(i => i).some(v => v > 5));
        },
        'lazy every'() {
            let calls = 0;
            $mol_assert_not($mol_range2(index => (++calls, index), () => 5).every(v => v < 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_ok($mol_range2(i => i, () => 0).every(v => false));
            $mol_assert_not($mol_range2(i => i).every(v => v < 5));
        },
        'lazyfy'() {
            let calls = 0;
            const list = new $mol_range2_array(...[0, 1, 2, 3, 4, 5]).map(i => (++calls, i + 10)).slice(2);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(calls, 0);
            $mol_assert_equal(list[0], 12);
            $mol_assert_equal(list[3], 15);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'prevent modification'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_fail(() => list.push(4), TypeError);
            $mol_assert_fail(() => list.pop(), TypeError);
            $mol_assert_fail(() => list.unshift(4), TypeError);
            $mol_assert_fail(() => list.shift(), TypeError);
            $mol_assert_fail(() => list.splice(1, 2), TypeError);
            $mol_assert_fail(() => list[1] = 2, TypeError);
            $mol_assert_fail(() => list.reverse(), TypeError);
            $mol_assert_fail(() => list.sort(), TypeError);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
        }
    });
})($ || ($ = {}));
//mol/range2/range2.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_not($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
            $mol_assert_ok($mol_compare_deep(Object.create(null), Object.create(null)));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
            $mol_assert_not($mol_compare_deep($mol_range2().slice(0, 0), new Array()));
            $mol_assert_not($mol_compare_deep($mol_range2(), $mol_range2()));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'POJO with symbols'() {
            const sym = Symbol();
            $mol_assert_ok($mol_compare_deep({ [sym]: true }, { [sym]: true }));
            $mol_assert_not($mol_compare_deep({ [Symbol()]: true }, { [Symbol()]: true }));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Serializale'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
        'Iterable'() {
            $mol_assert_ok($mol_compare_deep(new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' })));
        },
    });
})($ || ($ = {}));
//mol/compare/deep/deep.test.tsx
;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));
//mol/dom/serialize/serialize.ts
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
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
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message, ErrorRight);
            }
            else {
                $mol_assert_ok(error instanceof ErrorRight);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed'));
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
                    $mol_fail(new Error(`Not equal (${i + 1}:${j + 1})\n${args[i]}\n${args[j]}`));
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
                    $mol_fail(new Error(`args[${i}] = args[${j}] = ${args[i]}`));
                }
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    function $mol_assert_like(head, ...tail) {
        for (let [index, value] of Object.entries(tail)) {
            if (!$mol_compare_deep(value, head)) {
                const print = (val) => {
                    if (!val)
                        return val;
                    if (typeof val !== 'object')
                        return val;
                    if ('outerHTML' in val)
                        return val.outerHTML;
                    try {
                        return JSON.stringify(val, null, '\t');
                    }
                    catch (error) {
                        console.error(error);
                        return val;
                    }
                };
                return $mol_fail(new Error(`Not like (1:${+index + 2})\n${print(head)}\n---\n${print(value)}`));
            }
        }
    }
    $.$mol_assert_like = $mol_assert_like;
    function $mol_assert_dom(left, right) {
        $mol_assert_equal($mol_dom_serialize(left), $mol_dom_serialize(right));
    }
    $.$mol_assert_dom = $mol_assert_dom;
})($ || ($ = {}));
//mol/assert/assert.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([3], [3], [3]);
        },
        'two must be alike'() {
            $mol_assert_like([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_like([3], [3], [3]);
        },
        'two object must be alike'() {
            $mol_assert_like({ a: 1 }, { a: 1 });
        },
        'three object must be alike'() {
            $mol_assert_like({ a: 1 }, { a: 1 }, { a: 1 });
        },
    });
})($ || ($ = {}));
//mol/assert/assert.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));
//mol/func/name/name.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));
//mol/wire/pub/sub/sub.test.ts
;
"use strict";
//mol/type/equals/equals.test.ts
;
"use strict";
//mol/type/writable/writable.test.ts
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
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
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
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));
//mol/after/mock/mock.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));
//mol/after/timeout/timeout.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/frame/frame.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));
//mol/wire/fiber/fiber.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return Promise.resolve('');
                }
                static b() {
                    return $mol_wire_sync(this).a();
                }
            }
        },
    });
})($ || ($ = {}));
//mol/wire/sync/sync.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise() {
        let done;
        let fail;
        const promise = new Promise((d, f) => {
            done = d;
            fail = f;
        });
        return Object.assign(promise, {
            done,
            fail,
        });
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));
//mol/promise/promise/promise.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));
//mol/wait/timeout/timeout.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return '';
                }
                static b() {
                    return $mol_wire_async(this).a();
                }
            }
        },
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    this.$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(NameLogger.first, ['john', 'jin']);
            $mol_assert_like(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(first, ['john', 'jin']);
            $mol_assert_like(last, ['jin']);
        },
    });
})($ || ($ = {}));
//mol/wire/async/async.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//mol/object/object.test.ts
;
"use strict";
//mol/type/tail/tail.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static source(next = 1) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.source() : 0;
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.source(10);
            $mol_assert_equal(App.result(), 11);
            $mol_assert_equal(App.counter, 2);
            App.condition(false);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            $mol_wire_fiber.sync();
            $mol_assert_equal(App.source(), 1);
            App.source(20);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            App.condition(true);
            $mol_assert_equal(App.result(), 23);
            $mol_assert_equal(App.counter, 4);
        },
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow();
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result());
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
                static test() {
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title()');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));
//mol/wire/solo/solo.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Error caching'($) {
            const next_cached = 123;
            class Some extends $mol_object2 {
                static $ = $;
                static data(id, next) {
                    if (next)
                        return next;
                    setTimeout(() => {
                        $mol_wire_async(this).data(id, next_cached);
                    }, 10);
                    $mol_fail_hidden(new Promise(() => { }));
                }
                static run() {
                    return this.data('1');
                }
            }
            __decorate([
                $mol_wire_plex
            ], Some, "data", null);
            __decorate([
                $mol_wire_method
            ], Some, "run", null);
            const val = await $mol_wire_async(Some).run();
            $mol_assert_equal(val, next_cached);
        },
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like(123)');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation([123,[456]])');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));
//mol/wire/plex/plex.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));
//mol/wire/probe/probe.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));
//mol/charset/decode/decode.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_like($mol_charset_encode(str), encoded);
        },
    });
})($ || ($ = {}));
//mol/charset/encode/encode.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//mol/const/const.test.ts
;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));
//mol/compare/array/array.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'() {
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $mol_assert_equal($mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $mol_assert_equal($mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $mol_assert_equal($mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $mol_assert_equal($mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting'() {
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, null, null, null).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        },
        'fromJSON'() {
            $mol_assert_equal($mol_tree.fromJSON([]).toString(), '/\n');
            $mol_assert_equal($mol_tree.fromJSON([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $mol_assert_equal($mol_tree.fromJSON([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $mol_assert_equal($mol_tree.fromJSON(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $mol_assert_equal($mol_tree.fromJSON({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
        'toJSON'() {
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n').sub[0]), '[]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\tfalse\n\ttrue\n').sub[0]), '[false,true]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t0\n\t1\n\t2.3\n').sub[0]), '[0,1,2.3]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n').sub[0]), '["","foo","bar\\nbaz"]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n').sub[0]), '{"foo":false,"bar\\nbaz":"lol"}');
        },
        'hack'() {
            const res = $mol_tree.fromString(`foo bar xxx`).hack({
                '': (tree, context) => [tree.hack(context)],
                'bar': (tree, context) => [tree.hack(context).clone({ type: '777' })],
            });
            $mol_assert_equal(res.toString(), new $mol_tree({ type: 'foo 777 xxx' }).toString());
        },
        'errors handling'($) {
            const errors = [];
            class Tree extends $mol_tree {
                static $ = $.$mol_ambient({
                    $mol_fail: error => errors.push(error.message)
                });
            }
            Tree.fromString(`
				\t \tfoo
				bar \\data
			`, 'test');
            $mol_assert_like(errors, ['Syntax error at test:2\n \tfoo']);
        },
    });
})($ || ($ = {}));
//mol/tree/tree.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));
//mol/delegate/delegate.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'span for same uri'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.span(4, 5, 8);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 4);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 8);
        },
        'span after of given position'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.after(11);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 7);
            $mol_assert_equal(child.length, 11);
        },
        'slice span - regular'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(1, 4);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 4);
            $mol_assert_equal(child.length, 3);
            const child2 = span.slice(2, 2);
            $mol_assert_equal(child2.col, 5);
            $mol_assert_equal(child2.length, 0);
        },
        'slice span - negative'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(-3, -1);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 2);
        },
        'slice span - out of range'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            $mol_assert_fail(() => span.slice(-1, 3));
            $mol_assert_fail(() => span.slice(1, 6));
            $mol_assert_fail(() => span.slice(1, 10));
        },
        'error handling'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const error = span.error('Some error\n');
            $mol_assert_equal(error.message, 'Some error\ntest.ts#1:3/4');
        }
    });
})($ || ($ = {}));
//mol/span/span.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'inserting'($) {
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), 'a', 'b', 'c')
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), 'a', 'b', 'c', 'd')
                .toString(), 'a b c x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), 0, 0, 0)
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), 0, 0, 0, 0)
                .toString(), 'a b \\\n\tx\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), null, null, null)
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), null, null, null, null)
                .toString(), 'a b \\\n\tx\n');
        },
        'deleting'($) {
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert(null, 'a', 'b', 'c')
                .toString(), 'a b\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert(null, 0, 0, 0)
                .toString(), 'a b\n');
        },
        'hack'($) {
            const res = $.$mol_tree2_from_string(`foo bar xxx\n`)
                .hack({
                'bar': (input, belt) => [input.struct('777', input.hack(belt))],
            });
            $mol_assert_equal(res.toString(), 'foo 777 xxx\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/tree2.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'($) {
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids[1].type, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo\n\n\n").kids.length, 1);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids[1].value, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar \\pol\n").kids[0].kids[0].kids[0].value, "pol");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar\n\t\\pol\n\t\\men\n").kids[0].kids[0].kids[1].value, "men");
            $mol_assert_equal($.$mol_tree2_from_string('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'Too many tabs'($) {
            const tree = `
				foo
						bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too many tabs\ntest#3:1/6\n!!!!!!\n\t\t\t\t\t\tbar');
        },
        'Too few tabs'($) {
            const tree = `
					foo
				bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too few tabs\ntest#3:1/4\n!!!!\n\t\t\t\tbar');
        },
        'Wrong nodes separator at start'($) {
            const tree = `foo\n \tbar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#2:1/2\n!!\n \tbar');
        },
        'Wrong nodes separator in the middle'($) {
            const tree = `foo  bar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar');
        },
        'Unexpected EOF, LF required'($) {
            const tree = `	foo`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Unexpected EOF, LF required\ntest#1:5/1\n	   !\n	foo');
        },
        'Errors skip and collect'($) {
            const tree = `foo  bar`;
            const errors = [];
            const $$ = $.$mol_ambient({
                $mol_fail: (error) => {
                    errors.push(error.message);
                    return null;
                }
            });
            const res = $$.$mol_tree2_from_string(tree, 'test');
            $mol_assert_like(errors, [
                'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar',
                'Unexpected EOF, LF required\ntest#1:9/1\n        !\nfoo  bar',
            ]);
            $mol_assert_equal(res.toString(), 'foo bar\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/from/string/string.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//mol/window/window.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        promise;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
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
//mol/after/tick/tick.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/tick/tick.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//mol/view/selection/selection.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
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
//mol/wrapper/wrapper.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
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
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));
//mol/wrapper/wrapper.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            return function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));
//mol/memo/memo.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));
//mol/memo/memo.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));
//mol/dom/qname/qname.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                toJSON() { return { name: this.name }; }
            }
            $mol_assert_equal($mol_key(new User('jin', 18)), '{"name":"jin"}');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'null');
            $mol_assert_equal($mol_key(new Date('2001-01-02T03:04:05.678Z')), '"2001-01-02T03:04:05.678Z"');
            $mol_assert_equal($mol_key(/./), '"/./"');
            $mol_assert_equal($mol_key(/\./gimsu), '"/\\\\./gimsu"');
        },
    });
})($ || ($ = {}));
//mol/key/key.test.tsx
;
"use strict";
//mol/type/foot/foot.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (fiber.host === this)
                return next;
            if ($mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: '💧 Same',
                    place: fiber,
                });
            }
            else if (prev !== undefined) {
                this.$.$mol_log3_rise({
                    message: '🔥 Next',
                    place: fiber,
                    prev,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));
//mol/wire/log/log.ts
;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));
//mol/wire/atom/atom.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));
//mol/wire/watch/watch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//mol/dom/render/attributes/attributes.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));
//mol/dom/render/events/events.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//mol/dom/render/styles/styles.ts
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
//mol/dom/render/fields/fields.ts
;
"use strict";
//mol/type/keys/extract/extract.ts
;
"use strict";
//mol/type/keys/extract/extract.test.ts
;
"use strict";
//mol/type/pick/pick.ts
;
"use strict";
var $;
(function ($) {
    let all = [];
    let el = null;
    let timer = null;
    function $mol_style_attach_force() {
        if (all.length) {
            el.innerHTML += '\n' + all.join('\n\n');
            all = [];
        }
        timer = null;
        return el;
    }
    $.$mol_style_attach_force = $mol_style_attach_force;
    function $mol_style_attach(id, text) {
        all.push(`/* ${id} */\n\n${text}`);
        if (timer)
            return el;
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        el = doc.createElement('style');
        el.id = `$mol_style_attach`;
        doc.head.appendChild(el);
        timer = new $mol_after_tick($mol_style_attach_force);
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));
//mol/style/attach/attach.ts
;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));
//mol/decor/decor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));
//mol/style/unit/unit.ts
;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));
//mol/style/func/func.ts
;
"use strict";
//mol/style/properties/properties.ts
;
"use strict";
var $;
(function ($) {
    function $mol_style_prop(prefix, postfixes) {
        const record = postfixes.reduce((record_obj, postfix) => {
            record_obj[postfix] = $mol_style_func.vary(`--${prefix}_${postfix}`);
            return record_obj;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));
//mol/style/prop/prop.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
    ]);
})($ || ($ = {}));
//mol/theme/theme.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 210deg;\n\t--mol_theme_hue_spread: 90deg;\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .2 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n\t/* --mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 0% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .2 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 120deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 80% .2 calc( var(--mol_theme_hue) - 60deg ) );\n\t--mol_theme_special: oklch( 80% .3 calc( var(--mol_theme_hue) + 60deg ) ); */\n\n}\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 99% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 90%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .2 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\t\n\t/* --mol_theme_back: oklch( 93% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 100% .02 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 70% 0 var(--mol_theme_hue) / .2 );\n\t--mol_theme_focus: oklch( 20% .8 calc( var(--mol_theme_hue) + 120deg ) );\n\t\n\t--mol_theme_control: oklch( 45% .25 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 45% .5 calc( var(--mol_theme_hue) - 60deg ) );\n\t--mol_theme_special: oklch( 45% .5 calc( var(--mol_theme_hue) + 60deg ) ); */\n\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50%, 30% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 40%, 20%, .25 );\n\t/* --mol_theme_back: oklch( 25% .05 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 ); */\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50%, 80% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 80%, 95%, .25 );\n\t/* --mol_theme_back: oklch( 95% .02 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 80% .05 var(--mol_theme_hue) / .25 ); */\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 180deg ), 90%, 30% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + 180deg ), 80%, 20%, .25 );\n\t/* --mol_theme_back: oklch( 40% .2 calc( var(--mol_theme_hue) + 120deg ) );\n\t--mol_theme_card: oklch( 50% .3 calc( var(--mol_theme_hue) + 120deg ) / .25 ); */\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 180deg ), 90%, 75% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + 180deg ), 80%, 90%, .25 );\n\t/* --mol_theme_back: oklch( 90% .03 calc( var(--mol_theme_hue) + 120deg ) );\n\t--mol_theme_card: oklch( 80% .05 calc( var(--mol_theme_hue) + 120deg ) / .25 ); */\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 50%, 30% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 40%, 20%, .25 );\n\t/* --mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - 60deg ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - 60deg ) / .25 ); */\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 50%, 80% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 95%, .25 );\n\t/* --mol_theme_back: oklch( 95% .02 calc( var(--mol_theme_hue) - 60deg ) );\n\t--mol_theme_card: oklch( 80% .05 calc( var(--mol_theme_hue) - 60deg ) / .25 ); */\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 50%, 30% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 40%, 20%, .25 );\n\t/* --mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + 60deg ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + 60deg ) / .25 ); */\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 50%, 80% );\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 95%, .25 );\n\t/* --mol_theme_back: oklch( 95% .02 calc( var(--mol_theme_hue) + 60deg ) );\n\t--mol_theme_card: oklch( 80% .05 calc( var(--mol_theme_hue) + 60deg ) / .25 ); */\n}\n");
})($ || ($ = {}));
//mol/theme/-css/theme.css.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'block',
        'text',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));
//mol/gap/gap.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));
//mol/gap/-css/gap.css.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    const error_showed = new WeakMap();
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        autorun() {
            try {
                this.dom_tree();
                document.title = this.title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        static autobind() {
            const nodes = $mol_dom_context.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])');
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
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString();
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error) ? 'Promise' : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                if ((error_showed.get(error) ?? this) !== this)
                    break render;
                try {
                    const message = error.message || error;
                    node.innerText = message.replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
                error_showed.set(error, this);
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            $mol_dom_render_styles(node, this.style_size());
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return null;
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next = null) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme() ?? undefined,
            };
        }
        style_size() {
            return {
                minHeight: this.minimal_height(),
                minWidth: this.minimal_width(),
            };
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
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (check(this))
                return yield [...path, this];
            try {
                for (const item of this.sub()) {
                    if (item instanceof $mol_view) {
                        yield* item.view_find(check, [...path, this]);
                    }
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            catch (err) {
                $mol_fail_log(err);
            }
            view.dom_node().scrollIntoView({ block: align });
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            new this.$.$mol_after_frame(() => {
                this.dom_node().scrollIntoView({ block: 'start', inline: 'nearest' });
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "autorun", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "theme", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//mol/view/view/view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\toverscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps( 20, end ) infinite;\n}\n");
})($ || ($ = {}));
//mol/view/view/-css/view.css.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//mol/view/view/view.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_simple extends $mol_view {
        some() {
            return 1;
        }
        bool() {
            return true;
        }
        str() {
            return "test";
        }
        arr() {
            return [];
        }
        arr_string() {
            return [];
        }
    }
    $.$mol_view_tree_test_simple = $mol_view_tree_test_simple;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/simple.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding extends $mol_view {
        value(next) {
            return this.task_title_new(next);
        }
        enabled() {
            return this.head_complete_enabled();
        }
        task_title_new(next) {
            if (next !== undefined)
                return next;
            return "123";
        }
        head_complete_enabled() {
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding.prototype, "task_title_new", null);
    $.$mol_view_tree_test_binding = $mol_view_tree_test_binding;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_super extends $mol_view {
        some() {
            return {
                a: 0,
                b: 2
            };
        }
    }
    $.$mol_view_tree_test_attributes_super = $mol_view_tree_test_attributes_super;
    class $mol_view_tree_test_attributes extends $mol_view_tree_test_attributes_super {
        some() {
            return {
                ...super.some(),
                a: 1
            };
        }
    }
    $.$mol_view_tree_test_attributes = $mol_view_tree_test_attributes;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/attributes.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_subcomponent extends $mol_view {
        Page(id) {
            const obj = new this.$.$mol_view_tree_test_attributes_subcomponent_page();
            obj.Sub = () => this.page(id);
            return obj;
        }
        page(id) {
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_view_tree_test_attributes_subcomponent.prototype, "Page", null);
    $.$mol_view_tree_test_attributes_subcomponent = $mol_view_tree_test_attributes_subcomponent;
    class $mol_view_tree_test_attributes_subcomponent_page extends $mol_view {
        Sub() {
            return null;
        }
    }
    $.$mol_view_tree_test_attributes_subcomponent_page = $mol_view_tree_test_attributes_subcomponent_page;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/subcomponent.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding_right extends $mol_view {
        outer_width(v) {
            return this.Test().width(v);
        }
        Test() {
            const obj = new this.$.$mol_view_tree_test_binding_right_test();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right.prototype, "Test", null);
    $.$mol_view_tree_test_binding_right = $mol_view_tree_test_binding_right;
    class $mol_view_tree_test_binding_right_test extends $mol_view {
        width(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right_test.prototype, "width", null);
    $.$mol_view_tree_test_binding_right_test = $mol_view_tree_test_binding_right_test;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding_right.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//mol/plugin/plugin.ts
;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'simple props'($) {
                const app = $mol_view_tree_test_simple.make({ $ });
                $mol_assert_equal(app.some(), 1);
                $mol_assert_equal(app.bool(), true);
                $mol_assert_equal(app.str(), 'test');
                $mol_assert_ok(Array.isArray(app.arr()));
                $mol_assert_ok(Array.isArray(app.arr_string()));
            },
            'default value'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_equal(app.value(), '123');
            },
            'both binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_ok(app.value() !== '1');
                app.value('1');
                $mol_assert_equal(app.value(), '1');
            },
            'left binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_not(app.head_complete_enabled());
                $mol_assert_not(app.enabled());
            },
            'sub component'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                $mol_assert_ok(app.Test() instanceof $mol_view_tree_test_binding_right_test);
            },
            'right binding - change owner property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.outer_width(val);
                $mol_assert_equal(app.outer_width(), val);
                $mol_assert_equal(app.Test().width(), val);
            },
            'right binding - change part property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.Test().width(val);
                $mol_assert_equal(app.Test().width(), val);
                $mol_assert_equal(app.outer_width(), val);
            },
            'attributes merging'($) {
                const app = $mol_view_tree_test_attributes.make({ $ });
                $mol_assert_like(app.some(), { a: 1, b: 2 });
            },
            'subcomponent indexed'($) {
                const app = $mol_view_tree_test_attributes_subcomponent.make({ $ });
                const val = 123;
                app.page = (index) => index;
                $mol_assert_equal(app.Page(val).Sub(), val);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/view/tree/test/tree.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//mol/state/local/local.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));
//mol/state/local/local.mock.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_locale_mock extends $mol_locale {
            lang(next = 'en') { return next; }
            static source(lang) {
                return {};
            }
        }
        __decorate([
            $mol_mem
        ], $mol_locale_mock.prototype, "lang", null);
        __decorate([
            $mol_mem_key
        ], $mol_locale_mock, "source", null);
        $.$mol_locale = $mol_locale_mock;
    });
})($ || ($ = {}));
//mol/locale/locale.test.ts
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
        const splittedUri = tree.uri.split(/[#\\\/]/);
        splittedUri.pop();
        const fileName = splittedUri.pop();
        const SourceNode = (row, col, fileName, text) => text;
        var content = [];
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            const parent = def.sub[0];
            const members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needCache = false;
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
                                    return [JSON.stringify(value.value)];
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return [`this.$.$mol_locale.text( ${JSON.stringify(key)} )`];
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
                                            items.push(val.join(""));
                                    });
                                    return [`[`, items.join(' , '), `]`, (item_type ? ` as ( ${item_type} )[]` : ` as any[]`)];
                                case (value.type[0] === '$'):
                                    if (!definition)
                                        throw value.error('Objects should be bound');
                                    needCache = true;
                                    const overs = [];
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
                                                members[own_name] = [`\t${own_name}(${own_args.join(',')}) {\n\t\treturn this.${propName[1]}(${propName[2] || ''}).${their_name}( ${their_args.join(' , ')} )\n\t}\n\n`];
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push(...['\t\t\tobj.', SourceNode(over.row, over.col, fileName, overName[1]), ' = (', args.join(','), ') => ', ...(v || []), '\n']);
                                        needSet = ns;
                                    });
                                    const object_args = value.select('/', '').sub.map(arg => getValue(arg)).join(' , ');
                                    return ['(( obj )=>{\n', ...overs, '\t\t\treturn obj\n\t\t})( new this.$.', SourceNode(value.row, value.col, fileName, value.type), '( ', object_args, ' ) )'];
                                case (value.type === '*'):
                                    const opts = [];
                                    for (const opt of value.sub) {
                                        if (opt.type === '-')
                                            continue;
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            continue;
                                        }
                                        const key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        const ns = needSet;
                                        const v = getValue(opt.sub[0]);
                                        const arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push(...[
                                            '\t\t\t"',
                                            SourceNode(opt.row, opt.col, fileName, key[1] + '" : '),
                                            arg,
                                            ' ',
                                            ...(v || []),
                                            ' ,\n'
                                        ]);
                                        needSet = ns;
                                    }
                                    return ['({\n', opts.join(''), '\t\t})'];
                                case (value.type === '<=>'):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )'];
                                    }
                                    break;
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')'];
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return [value.type];
                                case 'null':
                                    return ['null as any'];
                            }
                            if (Number(value.type).toString() == value.type)
                                return [value.type];
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(child => {
                        var val = getValue(child, true);
                        if (!val)
                            return;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_mem_force `);
                        if (needSet)
                            val = [
                                `( ${propName[3]} !== void 0 ) ? ${propName[3]} : `,
                                ...val
                            ];
                        val = ['return ', ...val];
                        let decl = ['\t', SourceNode(param.row, param.col, fileName, propName[1]), '(', args.join(','), ') {\n\t\t', ...val, '\n\t}\n\n'];
                        if (needCache) {
                            if (propName[2])
                                decl = ['\t@ $', 'mol_mem_key\n', ...decl];
                            else
                                decl = ['\t@ $', 'mol_mem\n', ...decl];
                        }
                        decl = ['\t/**\n\t *  ```\n', param.toString().trim().replace(/^/mg, '\t *  '), '\n\t *  ```\n\t **/\n', ...decl];
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    throw err;
                }
            }
            var body = Object.keys(members).reduce(function (acc, name) {
                const items = members[name] ? members[name] : ['\t', name, '() { return null as any }\n\t}\n'];
                return [...acc, ...items];
            }, []);
            var classes = ['namespace $ { export class ', SourceNode(def.row, def.col, fileName, def.type), ' extends ', SourceNode(parent.row, parent.col, fileName, parent.type), ' {\n\n', ...body, '} }\n'];
            content = [...content, ...classes];
        }
        return { script: content.join(''), locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//mol/view/tree/tree.ts
;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        const src = `
		$${''}my_test $${''}my_super
			title @ \\title
			sub /
				<= Title $${''}mol_view
					sub /
						<= title
				<= Close $${''}mol_button
					title \close
					click?event <=> close?event null
			plugins /
				<= Speech $${''}mol_speech
					text => speech
	`;
        const dest = $$.$mol_tree2_from_string(`
		title @ \\title
		sub /
			<= Title
			<= Close
		plugins / <= Speech
		Title $${''}mol_view sub / <= title
		close?event null
		Close $${''}mol_button
			title \close
			click?event <=> close?event
		Speech $${''}mol_speech text => speech
	`, 'reference');
        $mol_test({
            'props'($) {
                const mod = $.$mol_tree2_from_string(src, '/mol/view/tree2/class/props.test.ts');
                const result = $.$mol_view_tree2_class_props(mod.kids[0]).join('');
                $mol_assert_equal(result, dest.toString());
            }
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/view/tree2/class/props.test.ts
;
"use strict";
//mol/type/merge/merge.test.ts
;
"use strict";
//mol/type/intersect/intersect.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'escape'() {
            const specials = $mol_regexp.from('.*+?^${}()|[]\\');
            $mol_assert_equal(specials.source, '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        },
        'char code'() {
            const space = $mol_regexp.from(32);
            $mol_assert_like(' '.match(space), [' ']);
        },
        'repeat fixed'() {
            const { repeat, decimal_only: digit } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            $mol_assert_like('#2020#'.match(year), ['2020']);
        },
        'greedy repeat'() {
            const { repeat, repeat_greedy, latin_only: letter } = $mol_regexp;
            $mol_assert_like('abc'.match(repeat(letter, 1, 2)), ['a', 'b', 'c']);
            $mol_assert_like('abc'.match(repeat_greedy(letter, 1, 2)), ['ab', 'c']);
        },
        'repeat range'() {
            const { repeat_greedy, decimal_only: digit } = $mol_regexp;
            const year = repeat_greedy(digit, 2, 4);
            $mol_assert_like('#2#'.match(year), null);
            $mol_assert_like('#20#'.match(year), ['20']);
            $mol_assert_like('#2020#'.match(year), ['2020']);
            $mol_assert_like('#20201#'.match(year), ['2020']);
        },
        'repeat from'() {
            const { repeat_greedy, latin_only: letter } = $mol_regexp;
            const name = repeat_greedy(letter, 2);
            $mol_assert_like('##'.match(name), null);
            $mol_assert_like('#a#'.match(name), null);
            $mol_assert_like('#ab#'.match(name), ['ab']);
            $mol_assert_like('#abc#'.match(name), ['abc']);
        },
        'from string'() {
            const regexp = $mol_regexp.from('[\\d]');
            $mol_assert_equal(regexp.source, '\\[\\\\d\\]');
            $mol_assert_equal(regexp.flags, 'gsu');
        },
        'from regexp'() {
            const regexp = $mol_regexp.from(/[\d]/i);
            $mol_assert_equal(regexp.source, '[\\d]');
            $mol_assert_equal(regexp.flags, 'i');
        },
        'split'() {
            const regexp = $mol_regexp.from(';');
            $mol_assert_like('aaa;bbb;ccc'.split(regexp), ['aaa', ';', 'bbb', ';', 'ccc']);
            $mol_assert_like('aaa;;ccc'.split(regexp), ['aaa', ';', '', ';', 'ccc']);
            $mol_assert_like('aaa'.split(regexp), ['aaa']);
            $mol_assert_like(''.split(regexp), ['']);
        },
        'test for matching'() {
            const regexp = $mol_regexp.from('foo');
            $mol_assert_like(regexp.test(''), false);
            $mol_assert_like(regexp.test('fo'), false);
            $mol_assert_like(regexp.test('foo'), true);
            $mol_assert_like(regexp.test('foobar'), true);
            $mol_assert_like(regexp.test('barfoo'), true);
        },
        'case ignoring'() {
            const xxx = $mol_regexp.from('x', { ignoreCase: true });
            $mol_assert_like(xxx.flags, 'gisu');
            $mol_assert_like(xxx.exec('xx')[0], 'x');
            $mol_assert_like(xxx.exec('XX')[0], 'X');
        },
        'multiline mode'() {
            const { end, from } = $mol_regexp;
            const xxx = from(['x', end], { multiline: true });
            $mol_assert_like(xxx.exec('x\ny')[0], 'x');
            $mol_assert_like(xxx.flags, 'gmsu');
        },
        'flags override'() {
            const triplet = $mol_regexp.from($mol_regexp.from(/.../, { ignoreCase: true }), { multiline: true });
            $mol_assert_like(triplet.toString(), '/.../gmsu');
        },
        'sequence'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const date = from([begin, year, dash, month, dash, day, end]);
            $mol_assert_like(date.exec('2020-01-02')[0], '2020-01-02');
        },
        'optional'() {
            const name = $mol_regexp.from(['A', ['4']]);
            $mol_assert_equal('AB'.match(name)[0], 'A');
            $mol_assert_equal('A4'.match(name)[0], 'A4');
        },
        'anon variants'() {
            const name = $mol_regexp.from(['A', $mol_regexp.vary(['4', '5'])]);
            $mol_assert_equal('AB'.match(name), null);
            $mol_assert_equal('A4'.match(name)[0], 'A4');
            $mol_assert_equal('A5'.match(name)[0], 'A5');
        },
        'only groups'() {
            const regexp = $mol_regexp.from({ dog: '@' });
            $mol_assert_like([...'#'.matchAll(regexp)][0].groups, undefined);
            $mol_assert_like([...'@'.matchAll(regexp)][0].groups, { dog: '@' });
        },
        'catch skipped'() {
            const regexp = $mol_regexp.from(/(@)(\d?)/g);
            $mol_assert_like([...'[[@]]'.matchAll(regexp)].map(f => [...f]), [
                ['[['],
                ['@', '@', ''],
                [']]'],
            ]);
        },
        'enum variants'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from(Sex);
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'trans'.matchAll(sexism)][0].groups, undefined);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { male: '', female: 'female' });
        },
        'recursive only groups'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from({ Sex });
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { Sex: 'male', male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { Sex: 'female', male: '', female: 'female' });
        },
        'sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([begin, { year }, dash, { month }, dash, { day }, end]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'sequence with groups of mixed type'() {
            const prefix = '/';
            const postfix = '/';
            const regexp = $mol_regexp.from([{ prefix }, /(\w+)/, { postfix }, /([gumi]*)/]);
            $mol_assert_like([...'/foo/mi'.matchAll(regexp)], [
                Object.assign(["/foo/mi", "/", "foo", "/", "mi"], {
                    groups: {
                        prefix: '/',
                        postfix: '/',
                    },
                    index: 0,
                    input: "/",
                }),
            ]);
        },
        'recursive sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([
                begin, { date: [{ year }, dash, { month }] }, dash, { day }, end
            ]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                date: '2020-01',
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'parse multiple'() {
            const { decimal_only: digit, from } = $mol_regexp;
            const regexp = from({ digit });
            $mol_assert_like([...'123'.matchAll(regexp)].map(f => f.groups), [
                { digit: '1' },
                { digit: '2' },
                { digit: '3' },
            ]);
        },
        'named variants'() {
            const { begin, or, end, from } = $mol_regexp;
            const sexism = from([
                begin, 'sex = ', { sex: ['male', or, 'female'] }, end
            ]);
            $mol_assert_like([...'sex = male'.matchAll(sexism)][0].groups, { sex: 'male' });
            $mol_assert_like([...'sex = female'.matchAll(sexism)][0].groups, { sex: 'female' });
            $mol_assert_like([...'sex = malefemale'.matchAll(sexism)][0].groups, undefined);
        },
        'force after'() {
            const { latin_only: letter, force_after, from } = $mol_regexp;
            const regexp = from([letter, force_after('.')]);
            $mol_assert_like('x.'.match(regexp), ['x']);
            $mol_assert_like('x,'.match(regexp), null);
        },
        'forbid after'() {
            const { latin_only: letter, forbid_after, from } = $mol_regexp;
            const regexp = from([letter, forbid_after('.')]);
            $mol_assert_like('x.'.match(regexp), null);
            $mol_assert_like('x,'.match(regexp), ['x']);
        },
        'char except'() {
            const { char_except, latin_only, tab } = $mol_regexp;
            const name = char_except(latin_only, tab);
            $mol_assert_like('a'.match(name), null);
            $mol_assert_like('\t'.match(name), null);
            $mol_assert_like('('.match(name), ['(']);
        },
        'unicode only'() {
            const { unicode_only, from } = $mol_regexp;
            const name = from([
                unicode_only('Script', 'Cyrillic'),
                unicode_only('Hex_Digit'),
            ]);
            $mol_assert_like('FF'.match(name), null);
            $mol_assert_like('ФG'.match(name), null);
            $mol_assert_like('ФF'.match(name), ['ФF']);
        },
        'generate by optional with inner group'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { dog: '@' }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: false }), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'generate by optional with inner group with variants'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { animal: { dog: '@', fox: '&' } }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_equal(animals.generate({ fox: true }), '#^&');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'complex example'() {
            const { begin, end, char_only, char_range, latin_only, slash_back, repeat_greedy, from, } = $mol_regexp;
            const atom_char = char_only(latin_only, "!#$%&'*+/=?^`{|}~-");
            const atom = repeat_greedy(atom_char, 1);
            const dot_atom = from([atom, repeat_greedy(['.', atom])]);
            const name_letter = char_only(char_range(0x01, 0x08), 0x0b, 0x0c, char_range(0x0e, 0x1f), 0x21, char_range(0x23, 0x5b), char_range(0x5d, 0x7f));
            const quoted_pair = from([
                slash_back,
                char_only(char_range(0x01, 0x09), 0x0b, 0x0c, char_range(0x0e, 0x7f))
            ]);
            const name = repeat_greedy({ name_letter, quoted_pair });
            const quoted_name = from(['"', { name }, '"']);
            const local_part = from({ dot_atom, quoted_name });
            const domain = dot_atom;
            const mail = from([begin, local_part, '@', { domain }, end]);
            $mol_assert_equal('foo..bar@example.org'.match(mail), null);
            $mol_assert_equal('foo..bar"@example.org'.match(mail), null);
            $mol_assert_like([...'foo.bar@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "foo.bar",
                quoted_name: "",
                name: "",
                name_letter: "",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_like([...'"foo..bar"@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "",
                quoted_name: '"foo..bar"',
                name: "foo..bar",
                name_letter: "r",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_equal(mail.generate({ dot_atom: 'foo.bar', domain: 'example.org' }), 'foo.bar@example.org');
            $mol_assert_equal(mail.generate({ name: 'foo..bar', domain: 'example.org' }), '"foo..bar"@example.org');
            $mol_assert_fail(() => mail.generate({ dot_atom: 'foo..bar', domain: 'example.org' }), 'Wrong param: dot_atom=foo..bar');
        },
    });
})($ || ($ = {}));
//mol/regexp/regexp.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode(base64) {
        throw new Error('Not implemented');
    }
    $.$mol_base64_decode = $mol_base64_decode;
})($ || ($ = {}));
//mol/base64/decode/decode.ts
;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode_node(base64Str) {
        base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
        const buffer = Buffer.from(base64Str, 'base64');
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    $.$mol_base64_decode_node = $mol_base64_decode_node;
    $.$mol_base64_decode = $mol_base64_decode_node;
})($ || ($ = {}));
//mol/base64/decode/decode.node.ts
;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    $mol_test({
        'base64 decode string'() {
            $mol_assert_like($mol_base64_decode('SGVsbG8sIM6nzqjOqdCr'), new TextEncoder().encode('Hello, ΧΨΩЫ'));
        },
        'base64 decode binary'() {
            $mol_assert_like($mol_base64_decode('GgoASUh42g=='), png);
        },
    });
})($ || ($ = {}));
//mol/base64/decode/decode.test.ts
;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/simple.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3Rfc2ltcGxlICRtb2xfdmlldwoJc3RyIFxzb21lCgludW0gMTIzMTcKCWJvb2wgdHJ1ZQoJbnVsIG51bGwKCWxvY2FsaXplZCBAIFxsb2NhbGl6ZWQgdmFsdWUKCW11bHRpX3N0ciBcCgkJXG9uZQoJCVx0d28KCXNhbWU/IFwKCS0gY29tbWVudGVkX25vZGUgLwoJCTw9IE5vdGVzX3BhZ2VfdGl0bGUhdGFnCg=="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/simple.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X3NpbXBsZSBleHRlbmRzICRtb2xfdmlldyB7CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHN0ciBcc29tZQoJCSAqIGBgYAoJCSAqLwoJCXN0cigpIHsKCQkJcmV0dXJuICJzb21lIgoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogbnVtIDEyMzE3CgkJICogYGBgCgkJICovCgkJbnVtKCkgewoJCQlyZXR1cm4gMTIzMTcKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGJvb2wgdHJ1ZQoJCSAqIGBgYAoJCSAqLwoJCWJvb2woKSB7CgkJCXJldHVybiB0cnVlCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBudWwgbnVsbAoJCSAqIGBgYAoJCSAqLwoJCW51bCgpIHsKCQkJcmV0dXJuIG51bGwgYXMgYW55CgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBsb2NhbGl6ZWQgQCBcbG9jYWxpemVkIHZhbHVlCgkJICogYGBgCgkJICovCgkJbG9jYWxpemVkKCkgewoJCQlyZXR1cm4gdGhpcy4kLiRtb2xfbG9jYWxlLnRleHQoICckbW9sX3ZpZXdfdHJlZTJfdHNfdGVzdF9zaW1wbGVfbG9jYWxpemVkJyApCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBtdWx0aV9zdHIgXAoJCSAqIAlcb25lCgkJICogCVx0d28KCQkgKiBgYGAKCQkgKi8KCQltdWx0aV9zdHIoKSB7CgkJCXJldHVybiAib25lXG50d28iCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBzYW1lPyBcCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCXNhbWUobmV4dD86IGFueSkgewoJCQlpZiAoIG5leHQgIT09IHVuZGVmaW5lZCApIHJldHVybiBuZXh0IGFzIG5ldmVyCgkJCXJldHVybiAiIgoJCX0KCX0KCQp9Cgo="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/array.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2FycmF5IGV4dGVuZHMgJG1vbF92aWV3IHsKCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogdHlwZWQgL3N0cmluZwoJCSAqIAlcc29tZTEKCQkgKiAJXHNvbWUyCgkJICogYGBgCgkJICovCgkJdHlwZWQoKSB7CgkJCXJldHVybiBbCgkJCQkic29tZTEiLAoJCQkJInNvbWUyIgoJCQldIGFzIHJlYWRvbmx5IHN0cmluZ1tdCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjb25zdCAvY29uc3QKCQkgKiAJXHNvbWUxCgkJICogCVxzb21lMgoJCSAqIGBgYAoJCSAqLwoJCWNvbnN0KCkgewoJCQlyZXR1cm4gWwoJCQkJInNvbWUxIiwKCQkJCSJzb21lMiIKCQkJXSBhcyBjb25zdAoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogc3VwZXJfcHJvcCAvCgkJICogCVxzb21lMQoJCSAqIAleCgkJICogCVxzb21lMgoJCSAqIAleIHRlc3QKCQkgKiBgYGAKCQkgKi8KCQlzdXBlcl9wcm9wKCkgewoJCQlyZXR1cm4gWwoJCQkJInNvbWUxIiwKCQkJCS4uLnN1cGVyLnN1cGVyX3Byb3AoKSwKCQkJCSJzb21lMiIsCgkJCQkuLi50aGlzLnRlc3QoKQoJCQldIGFzIHJlYWRvbmx5IGFueVtdCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBzaW1wbGUgLwoJCSAqIAlcc29tZQoJCSAqIAkxMjMxNwoJCSAqIAl0cnVlCgkJICogCW51bGwKCQkgKiBgYGAKCQkgKi8KCQlzaW1wbGUoKSB7CgkJCXJldHVybiBbCgkJCQkic29tZSIsCgkJCQkxMjMxNywKCQkJCXRydWUsCgkJCQludWxsIGFzIGFueQoJCQldIGFzIHJlYWRvbmx5IGFueVtdCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBhcnIgL3JlYWRvbmx5KG51bWJlcilbXQoJCSAqIGBgYAoJCSAqLwoJCWFycigpIHsKCQkJcmV0dXJuIFsKCQkJXSBhcyByZWFkb25seSAocmVhZG9ubHkobnVtYmVyKVtdKVtdCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjb21wbGV4IC8KCQkgKiAJLwoJCSAqIAkJXHRlc3QxCgkJICogCQlcdGVzdDIKCQkgKiAJKgoJCSAqIAkJc3RyIFxzb21lCgkJICogCQludWwgbnVsbAoJCSAqIGBgYAoJCSAqLwoJCWNvbXBsZXgoKSB7CgkJCXJldHVybiBbCgkJCQlbCgkJCQkJInRlc3QxIiwKCQkJCQkidGVzdDIiCgkJCQldIGFzIHJlYWRvbmx5IGFueVtdLAoJCQkJewoJCQkJCXN0cjogInNvbWUiLAoJCQkJCW51bDogbnVsbCBhcyBhbnkKCQkJCX0gYXMgUmVjb3JkPCBzdHJpbmcsIGFueSA+CgkJCV0gYXMgcmVhZG9ubHkgYW55W10KCQl9Cgl9CgkKfQoK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/array.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYXJyYXkgJG1vbF92aWV3Cgl0eXBlZCAvc3RyaW5nCgkJXHNvbWUxCgkJXHNvbWUyCgljb25zdCAvY29uc3QKCQlcc29tZTEKCQlcc29tZTIKCXN1cGVyX3Byb3AgLwoJCVxzb21lMQoJCV4KCQlcc29tZTIKCQleIHRlc3QKCXNpbXBsZSAvCgkJXHNvbWUKCQkxMjMxNwoJCXRydWUKCQludWxsCglhcnIgL3JlYWRvbmx5KG51bWJlcilbXQoJY29tcGxleCAvCgkJLwoJCQlcdGVzdDEKCQkJXHRlc3QyCgkJKgoJCQlzdHIgXHNvbWUKCQkJbnVsIG51bGwK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/factory.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2ZhY3RvcnkgZXh0ZW5kcyAkbW9sX3ZpZXcgewoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBTaW1wbGUgJG1vbF92aWV3CgkJICogCXN0ciBcc29tZQoJCSAqIAludW0gMTIzMTcKCQkgKiAJYm9vbCB0cnVlCgkJICogCW51bCBudWxsCgkJICogCWxvY2FsaXplZCBAIFxsb2NhbGl6ZWQgdmFsdWUKCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtCgkJU2ltcGxlKCkgewoJCQljb25zdCBvYmogPSBuZXcgdGhpcy4kLiRtb2xfdmlldygpCgkJCQoJCQlvYmouc3RyID0gKCkgPT4gInNvbWUiCgkJCW9iai5udW0gPSAoKSA9PiAxMjMxNwoJCQlvYmouYm9vbCA9ICgpID0+IHRydWUKCQkJb2JqLm51bCA9ICgpID0+IG51bGwgYXMgYW55CgkJCW9iai5sb2NhbGl6ZWQgPSAoKSA9PiB0aGlzLiQuJG1vbF9sb2NhbGUudGV4dCggJyRtb2xfdmlld190cmVlMl90c190ZXN0X2ZhY3RvcnlfU2ltcGxlX2xvY2FsaXplZCcgKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogQ29tcGxleCAkbW9sX3ZpZXcKCQkgKiAJYXJyIC8KCQkgKiAJCVx0ZXN0MQoJCSAqIAkJXHRlc3QyCgkJICogCWRpY3QgKgoJCSAqIAkJc3RyIFxzb21lMgoJCSAqIAkJbG9jYWxpemVkIEAgXGxvY2FsaXplZCB2YWx1ZQoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQlDb21wbGV4KCkgewoJCQljb25zdCBvYmogPSBuZXcgdGhpcy4kLiRtb2xfdmlldygpCgkJCQoJCQlvYmouYXJyID0gKCkgPT4gWwoJCQkJInRlc3QxIiwKCQkJCSJ0ZXN0MiIKCQkJXSBhcyByZWFkb25seSBhbnlbXQoJCQlvYmouZGljdCA9ICgpID0+ICh7CgkJCQlzdHI6ICJzb21lMiIsCgkJCQlsb2NhbGl6ZWQ6IHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfZmFjdG9yeV9Db21wbGV4X2RpY3RfbG9jYWxpemVkJyApCgkJCX0gYXMgUmVjb3JkPCBzdHJpbmcsIGFueSA+KQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogQXJyICRtb2xfdmVjdG9yXzJkIC8KCQkgKiAJPD0gdmlld3BvcnRfeAoJCSAqIAk8PSB2aWV3cG9ydF95CgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCUFycigpIHsKCQkJY29uc3Qgb2JqID0gbmV3IHRoaXMuJC4kbW9sX3ZlY3Rvcl8yZCgKCQkJCXRoaXMudmlld3BvcnRfeCgpLAoJCQkJdGhpcy52aWV3cG9ydF95KCkKCQkJKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogdmlld3BvcnRfeCAkbW9sX3ZlY3Rvcl9yYW5nZSAvCgkJICogCUluZmluaXR5CgkJICogCS1JbmZpbml0eQoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQl2aWV3cG9ydF94KCkgewoJCQljb25zdCBvYmogPSBuZXcgdGhpcy4kLiRtb2xfdmVjdG9yX3JhbmdlKAoJCQkJSW5maW5pdHksCgkJCQktSW5maW5pdHkKCQkJKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogdmlld3BvcnRfeSAkbW9sX3ZlY3Rvcl9yYW5nZSAvCgkJICogCUluZmluaXR5CgkJICogCS1JbmZpbml0eQoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQl2aWV3cG9ydF95KCkgewoJCQljb25zdCBvYmogPSBuZXcgdGhpcy4kLiRtb2xfdmVjdG9yX3JhbmdlKAoJCQkJSW5maW5pdHksCgkJCQktSW5maW5pdHkKCQkJKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCX0KCQp9Cgo="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/factory.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfZmFjdG9yeSAkbW9sX3ZpZXcKCVNpbXBsZSAkbW9sX3ZpZXcKCQlzdHIgXHNvbWUKCQludW0gMTIzMTcKCQlib29sIHRydWUKCQludWwgbnVsbAoJCWxvY2FsaXplZCBAIFxsb2NhbGl6ZWQgdmFsdWUKCUNvbXBsZXggJG1vbF92aWV3CgkJYXJyIC8KCQkJXHRlc3QxCgkJCVx0ZXN0MgoJCWRpY3QgKgoJCQlzdHIgXHNvbWUyCgkJCWxvY2FsaXplZCBAIFxsb2NhbGl6ZWQgdmFsdWUKCUFyciAkbW9sX3ZlY3Rvcl8yZCAvCgkJPD0gdmlld3BvcnRfeCAkbW9sX3ZlY3Rvcl9yYW5nZSAvCgkJCUluZmluaXR5CgkJCS1JbmZpbml0eQoJCTw9IHZpZXdwb3J0X3kgJG1vbF92ZWN0b3JfcmFuZ2UgLwoJCQlJbmZpbml0eQoJCQktSW5maW5pdHkK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/dictionary.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2RpY3Rpb25hcnkgZXh0ZW5kcyAkbW9sX3ZpZXcgewoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBzdXBlcl9wcm9wICoKCQkgKiAJc3RyIFxzb21lCgkJICogCV4KCQkgKiAJc3RyMiBcc29tZQoJCSAqIAleIHRlc3QKCQkgKiBgYGAKCQkgKi8KCQlzdXBlcl9wcm9wKCkgewoJCQlyZXR1cm4gewoJCQkJc3RyOiAic29tZSIsCgkJCQkuLi5zdXBlci5zdXBlcl9wcm9wKCksCgkJCQlzdHIyOiAic29tZSIsCgkJCQkuLi50aGlzLnRlc3QoKQoJCQl9IGFzIFJlY29yZDwgc3RyaW5nLCBhbnkgPgoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogc2ltcGxlICoKCQkgKiAJJHN0ciBcc29tZQoJCSAqIAluLXVtIDEyMzE3CgkJICogCWJvb2wgdHJ1ZQoJCSAqIAludWwgbnVsbAoJCSAqIAlsb2NhbGl6ZWQgQCBcbG9jYWxpemVkIHZhbHVlMQoJCSAqIGBgYAoJCSAqLwoJCXNpbXBsZSgpIHsKCQkJcmV0dXJuIHsKCQkJCSIkc3RyIjogInNvbWUiLAoJCQkJIm4tdW0iOiAxMjMxNywKCQkJCWJvb2w6IHRydWUsCgkJCQludWw6IG51bGwgYXMgYW55LAoJCQkJbG9jYWxpemVkOiB0aGlzLiQuJG1vbF9sb2NhbGUudGV4dCggJyRtb2xfdmlld190cmVlMl90c190ZXN0X2RpY3Rpb25hcnlfc2ltcGxlX2xvY2FsaXplZCcgKQoJCQl9IGFzIFJlY29yZDwgc3RyaW5nLCBhbnkgPgoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogY29tcGxleCAqCgkJICogCWFyciAvCgkJICogCQlcdGVzdDEKCQkgKiAJCVx0ZXN0MgoJCSAqIAljaGlsZCAqCgkJICogCQlzdHIgXHNvbWUKCQkgKiAJCW51bSAxMjMxNwoJCSAqIAkJYm9vbCB0cnVlCgkJICogCQludWwgbnVsbAoJCSAqIAkJbG9jYWxpemVkIEAgXGxvY2FsaXplZCB2YWx1ZTIKCQkgKiBgYGAKCQkgKi8KCQljb21wbGV4KCkgewoJCQlyZXR1cm4gewoJCQkJYXJyOiBbCgkJCQkJInRlc3QxIiwKCQkJCQkidGVzdDIiCgkJCQldIGFzIHJlYWRvbmx5IGFueVtdLAoJCQkJY2hpbGQ6IHsKCQkJCQlzdHI6ICJzb21lIiwKCQkJCQludW06IDEyMzE3LAoJCQkJCWJvb2w6IHRydWUsCgkJCQkJbnVsOiBudWxsIGFzIGFueSwKCQkJCQlsb2NhbGl6ZWQ6IHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfZGljdGlvbmFyeV9jb21wbGV4X2NoaWxkX2xvY2FsaXplZCcgKQoJCQkJfSBhcyBSZWNvcmQ8IHN0cmluZywgYW55ID4KCQkJfSBhcyBSZWNvcmQ8IHN0cmluZywgYW55ID4KCQl9Cgl9CgkKfQoK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/dictionary.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfZGljdGlvbmFyeSAkbW9sX3ZpZXcKCXN1cGVyX3Byb3AgKgoJCXN0ciBcc29tZQoJCV4KCQlzdHIyIFxzb21lCgkJXiB0ZXN0CglzaW1wbGUgKgoJCSRzdHIgXHNvbWUKCQluLXVtIDEyMzE3CgkJYm9vbCB0cnVlCgkJbnVsIG51bGwKCQlsb2NhbGl6ZWQgQCBcbG9jYWxpemVkIHZhbHVlMQoJY29tcGxleCAqCgkJYXJyIC8KCQkJXHRlc3QxCgkJCVx0ZXN0MgoJCWNoaWxkICoKCQkJc3RyIFxzb21lCgkJCW51bSAxMjMxNwoJCQlib29sIHRydWUKCQkJbnVsIG51bGwKCQkJbG9jYWxpemVkIEAgXGxvY2FsaXplZCB2YWx1ZTIK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/multiple_class.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X211bHRpcGxlX2NsYXNzX2EgZXh0ZW5kcyAkbW9sX3ZpZXcgewoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBzdHIgXHNvbWUKCQkgKiBgYGAKCQkgKi8KCQlzdHIoKSB7CgkJCXJldHVybiAic29tZSIKCQl9Cgl9CgkKCWV4cG9ydCBjbGFzcyAkbW9sX3ZpZXdfdHJlZTJfdHNfdGVzdF9tdWx0aXBsZV9jbGFzc19iIGV4dGVuZHMgJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfbXVsdGlwbGVfY2xhc3NfYSB7CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHN0ciBcc29tZTIKCQkgKiBgYGAKCQkgKi8KCQlzdHIoKSB7CgkJCXJldHVybiAic29tZTIiCgkJfQoJfQoJCn0KCg=="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/multiple_class.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfbXVsdGlwbGVfY2xhc3NfYSAkbW9sX3ZpZXcKCXN0ciBcc29tZQoKJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfbXVsdGlwbGVfY2xhc3NfYiAkbW9sX3ZpZXdfdHJlZTJfdHNfdGVzdF9tdWx0aXBsZV9jbGFzc19hCglzdHIgXHNvbWUyCg=="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/left.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9sZWZ0ICRtb2xfdmlldwoJZGVmYXVsdCA8PSBkZWZhdWx0X293bmVyIFx0ZXN0CgllbXB0eSA8PSBlbXB0eV9vd25lcgoJaW5kZXhlZCFrZXkgPD0gaW5kZXhlZF9vd25lciFrZXkKCWluZGV4ZWRfZGVmYXVsdCFrZXkgPD0gaW5kZXhlZF9kZWZhdWx0X293bmVyIWtleSBudWxsCgljbGFzcyA8PSBjbGFzc19vd25lciAkbW9sX3ZpZXcKCXR3aWNlIG51bGwKCXdyaXRhYmxlIDw9IHdyaXRhYmxlX293bmVyPyBcCgljbGFzc19pbmRleGVkIWtleSA8PSBjbGFzc19pbmRleGVkX293bmVyIWtleSAkbW9sX3ZpZXcKCQl0aXRsZSBAIFxzb21lMQoJCXNhbWUgPD0gc2FtZT8gXAoJCXNvbWUgPD0gdHdpY2UKCQlsb2NhbGl6ZWQgPD0gbG9jYWxpemVkX293bmVyIWtleSBAIFxzb21lMQoJCWNoYWluIDw9IGNoYWluMSA8PSBjaGFpbjIgbnVsbAoJYXJyIC8KCQk8PSBEZXRhaWxfbGlzdCAkbW9sX2xpc3QKCQkJcm93cyA8PSBtYWluX2NvbnRlbnQgLwoJCSoKCQkJbG9jIDw9IGxvY19vdXRlciBAIFx0ZXN0IGxvY2FsaXplCgkJKgoJCQlsb2MgPD0gbG9jX291dGVyIEAgXHRlc3QgbG9jYWxpemUKCXNhbWUyIEAgXFNvbWUKCVNhbWUKCQk8PSBTdWIgJG1vbF92aWV3CgkJCXNhbWUgPD0gc2FtZTIgLQo="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/left.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2JpbmRfbGVmdCBleHRlbmRzICRtb2xfdmlldyB7CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGRlZmF1bHQgPD0gZGVmYXVsdF9vd25lcgoJCSAqIGBgYAoJCSAqLwoJCWRlZmF1bHQoKSB7CgkJCXJldHVybiB0aGlzLmRlZmF1bHRfb3duZXIoKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogZW1wdHkgPD0gZW1wdHlfb3duZXIKCQkgKiBgYGAKCQkgKi8KCQllbXB0eSgpIHsKCQkJcmV0dXJuIHRoaXMuZW1wdHlfb3duZXIoKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogaW5kZXhlZCogPD0gaW5kZXhlZF9vd25lcioKCQkgKiBgYGAKCQkgKi8KCQlpbmRleGVkKGlkOiBhbnkpIHsKCQkJcmV0dXJuIHRoaXMuaW5kZXhlZF9vd25lcihpZCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGluZGV4ZWRfZGVmYXVsdCogPD0gaW5kZXhlZF9kZWZhdWx0X293bmVyKgoJCSAqIGBgYAoJCSAqLwoJCWluZGV4ZWRfZGVmYXVsdChpZDogYW55KSB7CgkJCXJldHVybiB0aGlzLmluZGV4ZWRfZGVmYXVsdF9vd25lcihpZCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzIDw9IGNsYXNzX293bmVyCgkJICogYGBgCgkJICovCgkJY2xhc3MoKSB7CgkJCXJldHVybiB0aGlzLmNsYXNzX293bmVyKCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHR3aWNlIG51bGwKCQkgKiBgYGAKCQkgKi8KCQl0d2ljZSgpIHsKCQkJcmV0dXJuIG51bGwgYXMgYW55CgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiB3cml0YWJsZSA8PSB3cml0YWJsZV9vd25lcj8KCQkgKiBgYGAKCQkgKi8KCQl3cml0YWJsZSgpIHsKCQkJcmV0dXJuIHRoaXMud3JpdGFibGVfb3duZXIoKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogY2xhc3NfaW5kZXhlZCogPD0gY2xhc3NfaW5kZXhlZF9vd25lcioKCQkgKiBgYGAKCQkgKi8KCQljbGFzc19pbmRleGVkKGlkOiBhbnkpIHsKCQkJcmV0dXJuIHRoaXMuY2xhc3NfaW5kZXhlZF9vd25lcihpZCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGFyciAvCgkJICogCTw9IERldGFpbF9saXN0CgkJICogCSogbG9jIDw9IGxvY19vdXRlcgoJCSAqIAkqIGxvYyA8PSBsb2Nfb3V0ZXIKCQkgKiBgYGAKCQkgKi8KCQlhcnIoKSB7CgkJCXJldHVybiBbCgkJCQl0aGlzLkRldGFpbF9saXN0KCksCgkJCQl7CgkJCQkJbG9jOiB0aGlzLmxvY19vdXRlcigpCgkJCQl9IGFzIFJlY29yZDwgc3RyaW5nLCBhbnkgPiwKCQkJCXsKCQkJCQlsb2M6IHRoaXMubG9jX291dGVyKCkKCQkJCX0gYXMgUmVjb3JkPCBzdHJpbmcsIGFueSA+CgkJCV0gYXMgcmVhZG9ubHkgYW55W10KCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHNhbWUyIEAgXFNvbWUKCQkgKiBgYGAKCQkgKi8KCQlzYW1lMigpIHsKCQkJcmV0dXJuIHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9sZWZ0X3NhbWUyJyApCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBTYW1lIDw9IFN1YgoJCSAqIGBgYAoJCSAqLwoJCVNhbWUoKSB7CgkJCXJldHVybiB0aGlzLlN1YigpCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBkZWZhdWx0X293bmVyIFx0ZXN0CgkJICogYGBgCgkJICovCgkJZGVmYXVsdF9vd25lcigpIHsKCQkJcmV0dXJuICJ0ZXN0IgoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogaW5kZXhlZF9kZWZhdWx0X293bmVyKiBudWxsCgkJICogYGBgCgkJICovCgkJaW5kZXhlZF9kZWZhdWx0X293bmVyKGlkOiBhbnkpIHsKCQkJcmV0dXJuIG51bGwgYXMgYW55CgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjbGFzc19vd25lciAkbW9sX3ZpZXcKCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtCgkJY2xhc3Nfb3duZXIoKSB7CgkJCWNvbnN0IG9iaiA9IG5ldyB0aGlzLiQuJG1vbF92aWV3KCkKCQkJCgkJCXJldHVybiBvYmoKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHdyaXRhYmxlX293bmVyPyBcCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCXdyaXRhYmxlX293bmVyKG5leHQ/OiBhbnkpIHsKCQkJaWYgKCBuZXh0ICE9PSB1bmRlZmluZWQgKSByZXR1cm4gbmV4dCBhcyBuZXZlcgoJCQlyZXR1cm4gIiIKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHNhbWU/IFwKCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtCgkJc2FtZShuZXh0PzogYW55KSB7CgkJCWlmICggbmV4dCAhPT0gdW5kZWZpbmVkICkgcmV0dXJuIG5leHQgYXMgbmV2ZXIKCQkJcmV0dXJuICIiCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBsb2NhbGl6ZWRfb3duZXIqIEAgXHNvbWUxCgkJICogYGBgCgkJICovCgkJbG9jYWxpemVkX293bmVyKGlkOiBhbnkpIHsKCQkJcmV0dXJuIHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9sZWZ0X2xvY2FsaXplZF9vd25lcicgKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogY2hhaW4yIG51bGwKCQkgKiBgYGAKCQkgKi8KCQljaGFpbjIoKSB7CgkJCXJldHVybiBudWxsIGFzIGFueQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogY2hhaW4xIDw9IGNoYWluMgoJCSAqIGBgYAoJCSAqLwoJCWNoYWluMSgpIHsKCQkJcmV0dXJuIHRoaXMuY2hhaW4yKCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzX2luZGV4ZWRfb3duZXIqICRtb2xfdmlldwoJCSAqIAl0aXRsZSBAIFxzb21lMQoJCSAqIAlzYW1lIDw9IHNhbWU/CgkJICogCXNvbWUgPD0gdHdpY2UKCQkgKiAJbG9jYWxpemVkIDw9IGxvY2FsaXplZF9vd25lcioKCQkgKiAJY2hhaW4gPD0gY2hhaW4xCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbV9rZXkKCQljbGFzc19pbmRleGVkX293bmVyKGlkOiBhbnkpIHsKCQkJY29uc3Qgb2JqID0gbmV3IHRoaXMuJC4kbW9sX3ZpZXcoKQoJCQkKCQkJb2JqLnRpdGxlID0gKCkgPT4gdGhpcy4kLiRtb2xfbG9jYWxlLnRleHQoICckbW9sX3ZpZXdfdHJlZTJfdHNfdGVzdF9iaW5kX2xlZnRfY2xhc3NfaW5kZXhlZF9vd25lcl90aXRsZScgKQoJCQlvYmouc2FtZSA9ICgpID0+IHRoaXMuc2FtZSgpCgkJCW9iai5zb21lID0gKCkgPT4gdGhpcy50d2ljZSgpCgkJCW9iai5sb2NhbGl6ZWQgPSAoKSA9PiB0aGlzLmxvY2FsaXplZF9vd25lcihpZCkKCQkJb2JqLmNoYWluID0gKCkgPT4gdGhpcy5jaGFpbjEoKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogbWFpbl9jb250ZW50IC8KCQkgKiBgYGAKCQkgKi8KCQltYWluX2NvbnRlbnQoKSB7CgkJCXJldHVybiBbCgkJCV0gYXMgcmVhZG9ubHkgYW55W10KCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIERldGFpbF9saXN0ICRtb2xfbGlzdCByb3dzIDw9IG1haW5fY29udGVudAoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQlEZXRhaWxfbGlzdCgpIHsKCQkJY29uc3Qgb2JqID0gbmV3IHRoaXMuJC4kbW9sX2xpc3QoKQoJCQkKCQkJb2JqLnJvd3MgPSAoKSA9PiB0aGlzLm1haW5fY29udGVudCgpCgkJCQoJCQlyZXR1cm4gb2JqCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBsb2Nfb3V0ZXIgQCBcdGVzdCBsb2NhbGl6ZQoJCSAqIGBgYAoJCSAqLwoJCWxvY19vdXRlcigpIHsKCQkJcmV0dXJuIHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9sZWZ0X2xvY19vdXRlcicgKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogU3ViICRtb2xfdmlldyBzYW1lIDw9IHNhbWUyCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCVN1YigpIHsKCQkJY29uc3Qgb2JqID0gbmV3IHRoaXMuJC4kbW9sX3ZpZXcoKQoJCQkKCQkJb2JqLnNhbWUgPSAoKSA9PiB0aGlzLnNhbWUyKCkKCQkJCgkJCXJldHVybiBvYmoKCQl9Cgl9CgkKfQoK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/right.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9yaWdodCAkbW9sX3ZpZXcKCUNscyAkbW9sX3ZpZXcKCQlpbm5lciA9PiBvdXRlcgoJCXdyaXRhYmxlPyA9PiB3cml0YWJsZV9vdXRlcj8KCQlpbmRleGVkIWtleSA9PiBpbmRleGVkX291dGVyIWtleQoJCWluZGV4ZWRfd3JpdGFibGUha2V5PyA9PiBpbmRleGVkX3dyaXRhYmxlX291dGVyIWtleT8KCXEgPD0gQ2xzMiAkbW9sX3ZpZXcKCQlpbm5lciA9PiBvdXRlclEKCUluZGV4ZWQhaW5kZXggJG1vbF92aWV3CgkJVGl0bGUgPT4gT3V0ZXJfdGl0bGUhaW5kZXgK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/right.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2JpbmRfcmlnaHQgZXh0ZW5kcyAkbW9sX3ZpZXcgewoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBvdXRlcgoJCSAqIGBgYAoJCSAqLwoJCW91dGVyKCkgewoJCQlyZXR1cm4gdGhpcy5DbHMoKS5pbm5lcigpCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiB3cml0YWJsZV9vdXRlcj8KCQkgKiBgYGAKCQkgKi8KCQl3cml0YWJsZV9vdXRlcihuZXh0PzogYW55KSB7CgkJCXJldHVybiB0aGlzLkNscygpLndyaXRhYmxlKG5leHQpCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBpbmRleGVkX291dGVyKgoJCSAqIGBgYAoJCSAqLwoJCWluZGV4ZWRfb3V0ZXIoaWQ6IGFueSkgewoJCQlyZXR1cm4gdGhpcy5DbHMoKS5pbmRleGVkKGlkKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogaW5kZXhlZF93cml0YWJsZV9vdXRlcio/CgkJICogYGBgCgkJICovCgkJaW5kZXhlZF93cml0YWJsZV9vdXRlcihpZDogYW55LCBuZXh0PzogYW55KSB7CgkJCXJldHVybiB0aGlzLkNscygpLmluZGV4ZWRfd3JpdGFibGUoaWQsIG5leHQpCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBDbHMgJG1vbF92aWV3CgkJICogCWlubmVyID0+IG91dGVyCgkJICogCXdyaXRhYmxlPyA9PiB3cml0YWJsZV9vdXRlcj8KCQkgKiAJaW5kZXhlZCogPT4gaW5kZXhlZF9vdXRlcioKCQkgKiAJaW5kZXhlZF93cml0YWJsZSo/ID0+IGluZGV4ZWRfd3JpdGFibGVfb3V0ZXIqPwoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQlDbHMoKSB7CgkJCWNvbnN0IG9iaiA9IG5ldyB0aGlzLiQuJG1vbF92aWV3KCkKCQkJCgkJCXJldHVybiBvYmoKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHEgPD0gQ2xzMgoJCSAqIGBgYAoJCSAqLwoJCXEoKSB7CgkJCXJldHVybiB0aGlzLkNsczIoKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogT3V0ZXJfdGl0bGUqCgkJICogYGBgCgkJICovCgkJT3V0ZXJfdGl0bGUoaWQ6IGFueSkgewoJCQlyZXR1cm4gdGhpcy5JbmRleGVkKGlkKS5UaXRsZSgpCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBJbmRleGVkKiAkbW9sX3ZpZXcgVGl0bGUgPT4gT3V0ZXJfdGl0bGUqCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbV9rZXkKCQlJbmRleGVkKGlkOiBhbnkpIHsKCQkJY29uc3Qgb2JqID0gbmV3IHRoaXMuJC4kbW9sX3ZpZXcoKQoJCQkKCQkJcmV0dXJuIG9iagoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogb3V0ZXJRCgkJICogYGBgCgkJICovCgkJb3V0ZXJRKCkgewoJCQlyZXR1cm4gdGhpcy5DbHMyKCkuaW5uZXIoKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogQ2xzMiAkbW9sX3ZpZXcgaW5uZXIgPT4gb3V0ZXJRCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCUNsczIoKSB7CgkJCWNvbnN0IG9iaiA9IG5ldyB0aGlzLiQuJG1vbF92aWV3KCkKCQkJCgkJCXJldHVybiBvYmoKCQl9Cgl9CgkKfQoK"

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/both.view.tree.bin" ] = "data:application/octet-stream;base64,JG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9ib3RoICRtb2xfdmlldwoJd3JpdGFibGU/IDw9PiB3cml0YWJsZV9vd25lcj8KCXdyaXRhYmxlX2RlZmF1bHQ/IDw9PiB3cml0YWJsZV9kZWZhdWx0X293bmVyPyBudWxsCgljbGFzcz8gPD0+IGNsYXNzX293bmVyPyAkbW9sX3ZpZXcKCWluZGV4ZWQha2V5PyA8PT4gaW5kZXhlZF9vd25lciFrZXk/IG51bGwKCXR3aWNlIG51bGwKCWNsYXNzX2luZGV4ZWQha2V5PyAkbW9sX3ZpZXcKCQlleHBhbmRlZCA8PT4gY2VsbF9leHBhbmRlZCFrZXk/CgljbGFzc193cml0YWJsZT8gPD0+IGNsYXNzX3dyaXRhYmxlX293bmVyPyAkbW9sX3ZpZXcKCQlzb21lPyA8PT4gdHdpY2U/CgkJbG9jYWxpemVkPyA8PT4gbG9jYWxpemVkX293bmVyPyBAIFxzb21lMQoJCWNoYWluP3YgPD0+IGNoYWluMT92IDw9PiBjaGFpbjI/diBudWxsCglhcnIgLwoJCSoKCQkJbG9jP3YgPD0+IGxvY19vdXRlcj92IEAgXHRlc3QgbG9jYWxpemUKCQkqCgkJCWxvYz92IDw9PiBsb2Nfb3V0ZXI/diBAIFx0ZXN0IGxvY2FsaXplCglzd2lwZV90b19sZWZ0P2V2ZW50IDw9PiBldmVudF9uZXh0P2V2ZW50IG51bGwKCWV2ZW50X2NhdGNoPyA8PT4gZXZlbnRfbmV4dD8gbnVsbAo="

;
var $node = $node || {} ; $node[ "/mol/view/tree2/ts/test/bind/both.view.ts.bin" ] = "data:application/octet-stream;base64,bmFtZXNwYWNlICQgewoJZXhwb3J0IGNsYXNzICRtb2xfdmlld190cmVlMl90c190ZXN0X2JpbmRfYm90aCBleHRlbmRzICRtb2xfdmlldyB7CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHdyaXRhYmxlPyA8PT4gd3JpdGFibGVfb3duZXI/CgkJICogYGBgCgkJICovCgkJd3JpdGFibGUobmV4dD86IGFueSkgewoJCQlyZXR1cm4gdGhpcy53cml0YWJsZV9vd25lcihuZXh0KQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogd3JpdGFibGVfZGVmYXVsdD8gPD0+IHdyaXRhYmxlX2RlZmF1bHRfb3duZXI/CgkJICogYGBgCgkJICovCgkJd3JpdGFibGVfZGVmYXVsdChuZXh0PzogYW55KSB7CgkJCXJldHVybiB0aGlzLndyaXRhYmxlX2RlZmF1bHRfb3duZXIobmV4dCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzPyA8PT4gY2xhc3Nfb3duZXI/CgkJICogYGBgCgkJICovCgkJY2xhc3MobmV4dD86IGFueSkgewoJCQlyZXR1cm4gdGhpcy5jbGFzc19vd25lcihuZXh0KQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogaW5kZXhlZCo/IDw9PiBpbmRleGVkX293bmVyKj8KCQkgKiBgYGAKCQkgKi8KCQlpbmRleGVkKGlkOiBhbnksIG5leHQ/OiBhbnkpIHsKCQkJcmV0dXJuIHRoaXMuaW5kZXhlZF9vd25lcihpZCwgbmV4dCkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIHR3aWNlIG51bGwKCQkgKiBgYGAKCQkgKi8KCQl0d2ljZSgpIHsKCQkJcmV0dXJuIG51bGwgYXMgYW55CgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjbGFzc19pbmRleGVkKj8gJG1vbF92aWV3IGV4cGFuZGVkIDw9PiBjZWxsX2V4cGFuZGVkKj8KCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtX2tleQoJCWNsYXNzX2luZGV4ZWQoaWQ6IGFueSwgbmV4dD86IGFueSkgewoJCQlpZiAoIG5leHQgIT09IHVuZGVmaW5lZCApIHJldHVybiBuZXh0IGFzIG5ldmVyCgkJCWNvbnN0IG9iaiA9IG5ldyB0aGlzLiQuJG1vbF92aWV3KCkKCQkJCgkJCW9iai5leHBhbmRlZCA9ICgpID0+IHRoaXMuY2VsbF9leHBhbmRlZChpZCwgbmV4dCkKCQkJCgkJCXJldHVybiBvYmoKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzX3dyaXRhYmxlPyA8PT4gY2xhc3Nfd3JpdGFibGVfb3duZXI/CgkJICogYGBgCgkJICovCgkJY2xhc3Nfd3JpdGFibGUobmV4dD86IGFueSkgewoJCQlyZXR1cm4gdGhpcy5jbGFzc193cml0YWJsZV9vd25lcihuZXh0KQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogYXJyIC8KCQkgKiAJKiBsb2M/diA8PT4gbG9jX291dGVyP3YKCQkgKiAJKiBsb2M/diA8PT4gbG9jX291dGVyP3YKCQkgKiBgYGAKCQkgKi8KCQlhcnIoKSB7CgkJCXJldHVybiBbCgkJCQl7CgkJCQkJbG9jOiAodj86IGFueSkgPT4gdGhpcy5sb2Nfb3V0ZXIodikKCQkJCX0gYXMgUmVjb3JkPCBzdHJpbmcsIGFueSA+LAoJCQkJewoJCQkJCWxvYzogKHY/OiBhbnkpID0+IHRoaXMubG9jX291dGVyKHYpCgkJCQl9IGFzIFJlY29yZDwgc3RyaW5nLCBhbnkgPgoJCQldIGFzIHJlYWRvbmx5IGFueVtdCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBzd2lwZV90b19sZWZ0P2V2ZW50IDw9PiBldmVudF9uZXh0P2V2ZW50CgkJICogYGBgCgkJICovCgkJc3dpcGVfdG9fbGVmdChldmVudD86IGFueSkgewoJCQlyZXR1cm4gdGhpcy5ldmVudF9uZXh0KGV2ZW50KQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogZXZlbnRfY2F0Y2g/IDw9PiBldmVudF9uZXh0PwoJCSAqIGBgYAoJCSAqLwoJCWV2ZW50X2NhdGNoKG5leHQ/OiBhbnkpIHsKCQkJcmV0dXJuIHRoaXMuZXZlbnRfbmV4dChuZXh0KQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogd3JpdGFibGVfZGVmYXVsdF9vd25lcj8gbnVsbAoJCSAqIGBgYAoJCSAqLwoJCUAgJG1vbF9tZW0KCQl3cml0YWJsZV9kZWZhdWx0X293bmVyKG5leHQ/OiBhbnkpIHsKCQkJaWYgKCBuZXh0ICE9PSB1bmRlZmluZWQgKSByZXR1cm4gbmV4dCBhcyBuZXZlcgoJCQlyZXR1cm4gbnVsbCBhcyBhbnkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzX293bmVyPyAkbW9sX3ZpZXcKCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtCgkJY2xhc3Nfb3duZXIobmV4dD86IGFueSkgewoJCQlpZiAoIG5leHQgIT09IHVuZGVmaW5lZCApIHJldHVybiBuZXh0IGFzIG5ldmVyCgkJCWNvbnN0IG9iaiA9IG5ldyB0aGlzLiQuJG1vbF92aWV3KCkKCQkJCgkJCXJldHVybiBvYmoKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGluZGV4ZWRfb3duZXIqPyBudWxsCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbV9rZXkKCQlpbmRleGVkX293bmVyKGlkOiBhbnksIG5leHQ/OiBhbnkpIHsKCQkJaWYgKCBuZXh0ICE9PSB1bmRlZmluZWQgKSByZXR1cm4gbmV4dCBhcyBuZXZlcgoJCQlyZXR1cm4gbnVsbCBhcyBhbnkKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGxvY2FsaXplZF9vd25lcj8gQCBcc29tZTEKCQkgKiBgYGAKCQkgKi8KCQlAICRtb2xfbWVtCgkJbG9jYWxpemVkX293bmVyKG5leHQ/OiBhbnkpIHsKCQkJaWYgKCBuZXh0ICE9PSB1bmRlZmluZWQgKSByZXR1cm4gbmV4dCBhcyBuZXZlcgoJCQlyZXR1cm4gdGhpcy4kLiRtb2xfbG9jYWxlLnRleHQoICckbW9sX3ZpZXdfdHJlZTJfdHNfdGVzdF9iaW5kX2JvdGhfbG9jYWxpemVkX293bmVyJyApCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjaGFpbjI/diBudWxsCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCWNoYWluMih2PzogYW55KSB7CgkJCWlmICggdiAhPT0gdW5kZWZpbmVkICkgcmV0dXJuIHYgYXMgbmV2ZXIKCQkJcmV0dXJuIG51bGwgYXMgYW55CgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBjaGFpbjE/diA8PT4gY2hhaW4yP3YKCQkgKiBgYGAKCQkgKi8KCQljaGFpbjEodj86IGFueSkgewoJCQlyZXR1cm4gdGhpcy5jaGFpbjIodikKCQl9CgkJCgkJLyoqCgkJICogYGBgdHJlZQoJCSAqIGNsYXNzX3dyaXRhYmxlX293bmVyPyAkbW9sX3ZpZXcKCQkgKiAJc29tZT8gPD0+IHR3aWNlPwoJCSAqIAlsb2NhbGl6ZWQ/IDw9PiBsb2NhbGl6ZWRfb3duZXI/CgkJICogCWNoYWluP3YgPD0+IGNoYWluMT92CgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCWNsYXNzX3dyaXRhYmxlX293bmVyKG5leHQ/OiBhbnkpIHsKCQkJaWYgKCBuZXh0ICE9PSB1bmRlZmluZWQgKSByZXR1cm4gbmV4dCBhcyBuZXZlcgoJCQljb25zdCBvYmogPSBuZXcgdGhpcy4kLiRtb2xfdmlldygpCgkJCQoJCQlvYmouc29tZSA9IChuZXh0PzogYW55KSA9PiB0aGlzLnR3aWNlKG5leHQpCgkJCW9iai5sb2NhbGl6ZWQgPSAobmV4dD86IGFueSkgPT4gdGhpcy5sb2NhbGl6ZWRfb3duZXIobmV4dCkKCQkJb2JqLmNoYWluID0gKHY/OiBhbnkpID0+IHRoaXMuY2hhaW4xKHYpCgkJCQoJCQlyZXR1cm4gb2JqCgkJfQoJCQoJCS8qKgoJCSAqIGBgYHRyZWUKCQkgKiBsb2Nfb3V0ZXI/diBAIFx0ZXN0IGxvY2FsaXplCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCWxvY19vdXRlcih2PzogYW55KSB7CgkJCWlmICggdiAhPT0gdW5kZWZpbmVkICkgcmV0dXJuIHYgYXMgbmV2ZXIKCQkJcmV0dXJuIHRoaXMuJC4kbW9sX2xvY2FsZS50ZXh0KCAnJG1vbF92aWV3X3RyZWUyX3RzX3Rlc3RfYmluZF9ib3RoX2xvY19vdXRlcicgKQoJCX0KCQkKCQkvKioKCQkgKiBgYGB0cmVlCgkJICogZXZlbnRfbmV4dD9ldmVudCBudWxsCgkJICogYGBgCgkJICovCgkJQCAkbW9sX21lbQoJCWV2ZW50X25leHQoZXZlbnQ/OiBhbnkpIHsKCQkJaWYgKCBldmVudCAhPT0gdW5kZWZpbmVkICkgcmV0dXJuIGV2ZW50IGFzIG5ldmVyCgkJCXJldHVybiBudWxsIGFzIGFueQoJCX0KCX0KCQp9Cgo="

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        function text(uri) {
            return $mol_charset_decode($mol_base64_decode(uri.replace(/^.*,/, '')));
        }
        $mol_test({
            async 'localized - simple'($) {
                const view = text(require('/mol/view/tree2/ts/test/simple.view.tree.bin'));
                const ts = text(require('/mol/view/tree2/ts/test/simple.view.ts.bin'));
                const tree = $.$mol_tree2_from_string(view, 'factory.view.tree');
                const res = $.$mol_view_tree2_ts_compile(tree);
                $mol_assert_equal(res.locales['$mol_view_tree2_ts_test_simple_localized'], 'localized value');
                $mol_assert_equal(res.script, ts);
            },
            async 'localized - factory'($) {
                const view = text(require('/mol/view/tree2/ts/test/factory.view.tree.bin'));
                const ts = text(require('/mol/view/tree2/ts/test/factory.view.ts.bin'));
                const tree = $.$mol_tree2_from_string(view, 'factory.view.tree');
                const res = $.$mol_view_tree2_ts_compile(tree);
                $mol_assert_equal(res.locales['$mol_view_tree2_ts_test_factory_Simple_localized'], 'localized value');
                $mol_assert_equal(res.script, ts);
            },
            async 'compiled'($) {
                const samples = new Map([
                    [
                        '',
                        '',
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/simple.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/simple.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/factory.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/factory.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/array.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/array.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/dictionary.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/dictionary.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/multiple_class.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/multiple_class.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/bind/left.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/bind/left.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/bind/right.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/bind/right.view.ts.bin')),
                    ],
                    [
                        text(require('/mol/view/tree2/ts/test/bind/both.view.tree.bin')),
                        text(require('/mol/view/tree2/ts/test/bind/both.view.ts.bin')),
                    ],
                ]);
                for (const [view, ts] of samples) {
                    const tree = $.$mol_tree2_from_string(view, 'factory.view.tree');
                    const res = $.$mol_view_tree2_ts_compile(tree);
                    $mol_assert_equal(res.script, ts);
                }
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/view/tree2/ts/ts.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'ordered links'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 'E');
            $mol_assert_equal(graph.edge_out('A', 'B'), 'E');
            $mol_assert_equal(graph.edge_in('B', 'A'), 'E');
            $mol_assert_equal(graph.edge_out('B', 'A'), null);
            $mol_assert_equal(graph.edge_in('A', 'B'), null);
        },
        'nodes without edges'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.acyclic(edge => 0);
            $mol_assert_equal([...graph.sorted].join(''), 'ABCD');
        },
        'partial ordering'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.link('B', 'C', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'ACBD');
        },
        'sorting must cut cycles at low priority edges A'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges B'() {
            var graph = new $mol_graph();
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges C'() {
            var graph = new $mol_graph();
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges D'() {
            var graph = new $mol_graph();
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must group cutted cycles'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 0);
            graph.link('B', 'C', 0);
            graph.link('C', 'D', -2);
            graph.link('D', 'E', 0);
            graph.link('E', 'C', 0);
            graph.acyclic(edge => edge);
            $mol_assert_equal([...graph.sorted].join(''), 'CEDBA');
        },
    });
})($ || ($ = {}));
//mol/graph/graph.test.ts
;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    $mol_test({
        'base64 encode string'() {
            $mol_assert_equal($mol_base64_encode('Hello, ΧΨΩЫ'), 'SGVsbG8sIM6nzqjOqdCr');
        },
        'base64 encode binary'() {
            $mol_assert_equal($mol_base64_encode(png), 'GgoASUh42g==');
        },
    });
})($ || ($ = {}));
//mol/base64/encode/encode.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'equal paths'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]);
            $mol_assert_like(diff, {
                prefix: [1, 2, 3, 4],
                suffix: [[], [], []],
            });
        },
        'different suffix'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 5, 4]);
            $mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [3, 5], [5, 4]],
            });
        },
        'one contains other'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2], [1, 2, 3]);
            $mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [], [3]],
            });
        },
        'fully different'() {
            const diff = $mol_diff_path([1, 2], [3, 4], [5, 6]);
            $mol_assert_like(diff, {
                prefix: [],
                suffix: [[1, 2], [3, 4], [5, 6]],
            });
        },
    });
})($ || ($ = {}));
//mol/diff/path/path.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'fromJSON'() {
            $mol_assert_equal($mol_tree2_from_json([]).toString(), '/\n');
            $mol_assert_equal($mol_tree2_from_json([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $mol_assert_equal($mol_tree2_from_json([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $mol_assert_equal($mol_tree2_from_json(new Uint16Array([1, 10, 256])).toString(), '\\\x01\x00\n\\\x00\x00\x01\n');
            $mol_assert_equal($mol_tree2_from_json(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $mol_assert_equal($mol_tree2_from_json({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/from/json/json.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'simple sort'() {
            const list = ['abc', 'ac', 'ab'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'ab,abc,ac');
        },
        'sort ignoring spaces around'() {
            const list = [' a', '\tb', ' b'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, ' a,\tb, b');
        },
        'sort ignoring letter case'() {
            const list = ['A', 'B', 'a'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'A,a,B');
        },
        'sort with custom serializer'() {
            const list = ['abc', 'ab', 'ac'];
            list.sort($mol_compare_text(str => str.split('').reverse().join('')));
            $mol_assert_equal(`${list}`, 'ab,ac,abc');
        },
    });
})($ || ($ = {}));
//mol/compare/text/text.test.ts

//# sourceMappingURL=node.test.js.map
