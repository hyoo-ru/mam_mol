/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                if (next == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', next);
                }
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = sessionStorage.getItem('$mol_log.filter()');
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.web.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            var self = this;
            return self['name']
                || self['displayName']
                || (self['displayName'] = Function.prototype.toString.call(self)
                    .match(/^function ([a-z0-9_$]*)/)[1]);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (field === void 0) { field = 'value()'; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field || 'value()';
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this['destroyed()'] = true;
                this.log(['.destroyed()', true, 'atom']);
                this.status = $mol_atom_status.obsolete;
                return true;
            }
            else {
                return this['destroyed()'];
            }
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field;
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            this._next = next;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host;
            var prev = host[this.field];
            if (next === void null)
                next = prev;
            comparing: if ((next !== prev) && (next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next['length']; ++i) {
                    if (next[i] !== prev[i])
                        break comparing;
                }
                next = prev;
            }
            if (prev !== next) {
                if (next instanceof $.$mol_object) {
                    next['object_field'](this.field);
                    next['object_owner'](host);
                }
                if ((typeof Proxy === 'function') && (next instanceof Error)) {
                    next = new Proxy(next, {
                        get: function (target) {
                            throw target.valueOf();
                        },
                        ownKeys: function (target) {
                            throw target.valueOf();
                        },
                    });
                }
                host[this.field] = next;
                this.log(['push', next, prev]);
                this.obsolete_slaves();
            }
            this.status = $mol_atom_status.actual;
            this._next = void null;
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(host, handler) {
        var atom = new $mol_atom(host, function () {
            try {
                handler();
            }
            catch (error) {
                if (!(error instanceof $mol_atom_wait))
                    atom.destroyed(true);
                throw error;
            }
            atom.destroyed(true);
        });
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        return $mol_window;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(null);
    });
})($ || ($ = {}));
//window.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context = {};
    $.$mol_view_context.$mol_view_visible_width = function () { return $.$mol_window.size().width; };
    $.$mol_view_context.$mol_view_visible_height = function () { return $.$mol_window.size().height; };
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            return _super.apply(this, arguments) || this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.state_prefix = function () {
            return '';
        };
        $mol_view.prototype.state_prefix = function () {
            var owner = this.object_owner();
            return owner ? owner.state_prefix() : '';
        };
        $mol_view.prototype.state_key = function (postfix) {
            return this.state_prefix() + postfix;
        };
        $mol_view.prototype.context = function (next) {
            return next || $.$mol_view_context;
        };
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.dom_name = function () { return 'div'; };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_height = function () {
            return 0;
        };
        $mol_view.prototype.minimal_width = function () {
            return 0;
        };
        $mol_view.prototype.dom_node = function (next) {
            var _this = this;
            var path = this.toString();
            var next2 = next;
            if (!next2) {
                next2 = this['dom_node()'];
                if (next2)
                    return next2;
                next2 = document.getElementById(path);
                if (next2) {
                    if (next2['$mol_view']) {
                        return this['dom_node()'] = next2;
                    }
                }
                else {
                    next2 = document.createElementNS(this.dom_name_space(), this.dom_name());
                }
            }
            next2.id = path;
            void (next2['$mol_view'] = this);
            this['dom_node()'] = next2;
            var ownerProto = this.object_owner() && Object.getPrototypeOf(this.object_owner());
            if (ownerProto) {
                var suffix = this.object_field().replace(/\(.*/, '');
                var suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                while (ownerProto && (ownerProto instanceof $mol_view) && (suffix in ownerProto)) {
                    var attrName = ownerProto.constructor.toString().replace(/\$/g, '') + suffix2;
                    next2.setAttribute(attrName, '');
                    ownerProto = Object.getPrototypeOf(ownerProto);
                }
            }
            var proto = Object.getPrototypeOf(this);
            while (proto) {
                var attrName = proto.constructor.toString().replace(/\$/g, '').toLowerCase();
                next2.setAttribute(attrName, '');
                if (!(proto instanceof $mol_view))
                    break;
                proto = Object.getPrototypeOf(proto);
            }
            var events = this.event();
            var _loop_1 = function (name_1) {
                var handle = events[name_1];
                next2.addEventListener(name_1, function (event) {
                    $.$mol_atom_task(_this + ".event()['" + name_1 + "']", function () {
                        handle(event);
                    }).get();
                });
            };
            for (var name_1 in events) {
                _loop_1(name_1);
            }
            return next2;
        };
        $mol_view.render_sub = function (node, sub) {
            if (sub == null)
                return;
            var nextNode = node.firstChild;
            for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                var view = sub_1[_i];
                if (view == null) {
                }
                else if (typeof view === 'object') {
                    var existsNode = ((view instanceof $mol_view) ? view.dom_node() : view.valueOf());
                    while (true) {
                        if (!nextNode) {
                            node.appendChild(existsNode);
                            break;
                        }
                        if (nextNode == existsNode) {
                            nextNode = nextNode.nextSibling;
                            break;
                        }
                        else {
                            node.insertBefore(existsNode, nextNode);
                            break;
                        }
                    }
                }
                else {
                    if (nextNode && nextNode.nodeName === '#text') {
                        nextNode.nodeValue = String(view);
                        nextNode = nextNode.nextSibling;
                    }
                    else {
                        var textNode = document.createTextNode(String(view));
                        node.insertBefore(textNode, nextNode);
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                node.removeChild(currNode);
            }
            for (var _a = 0, sub_2 = sub; _a < sub_2.length; _a++) {
                var view = sub_2[_a];
                if (view instanceof $mol_view) {
                    try {
                        view.dom_tree();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        };
        $mol_view.render_attr = function (node, attrs) {
            for (var name_2 in attrs) {
                var val = attrs[name_2]();
                if ((val == null) || (val === false)) {
                    node.removeAttribute(name_2);
                }
                else if (val === true) {
                    node.setAttribute(name_2, 'true');
                }
                else {
                    node.setAttribute(name_2, String(val));
                }
            }
        };
        $mol_view.render_style = function (node, styles) {
            for (var name_3 in styles) {
                var val = styles[name_3]();
                if (typeof val === 'number')
                    val = val + "px";
                var style = node.style;
                style[name_3] = val;
            }
        };
        $mol_view.render_field = function (node, field) {
            var _loop_2 = function (key) {
                var val = field[key]();
                node[key] = val;
                if (node[key] !== val) {
                    node[key] = val;
                    if (node[key] !== val) {
                        new $.$mol_defer(function () { return field[key](node[key]); });
                    }
                }
            };
            for (var key in field) {
                _loop_2(key);
            }
        };
        $mol_view.prototype.dom_tree = function () {
            var node = this.dom_node();
            try {
                $mol_view.render_sub(node, this.sub_visible());
                $mol_view.render_attr(node, this.attr());
                $mol_view.render_style(node, this.style());
                $mol_view.render_field(node, this.field());
                return node;
            }
            catch (error) {
                if (!error['$mol_view_catched']) {
                    node.setAttribute('mol_view_error', error.name);
                    error['$mol_view_catched'] = true;
                }
                throw error;
            }
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': function () { return false; }
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () { return {}; };
        $mol_view.prototype.locale_contexts = function () {
            var contexts = [];
            var proto = Object.getPrototypeOf(this);
            while (proto && (proto instanceof $mol_view)) {
                contexts.push(proto.constructor.toString());
                proto = Object.getPrototypeOf(proto);
            }
            return contexts;
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_view_root]');
        var _loop_1 = function (i) {
            var view = $[nodes.item(i).getAttribute('mol_view_root')].Root(i);
            view.dom_node(nodes.item(i));
            var win = new $.$mol_atom("$mol_view.Root(" + i + ")", function () {
                view.dom_tree();
                document.title = view.title();
                return null;
            });
            new $.$mol_defer(function () { return win.get(); });
        };
        for (var i = nodes.length - 1; i >= 0; --i) {
            _loop_1(i);
        }
        $.$mol_defer.run();
    });
})($ || ($ = {}));
//view.web.js.map
;
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        var result = {};
        for (var key in target)
            result[key] = target[key];
        for (var key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next) {
            if (next)
                history.replaceState(history.state, document.title, "" + next);
            return window.location.search + window.location.hash;
        };
        $mol_state_arg.dict = function (next) {
            var href = this.href(next && this.make(next));
            var chunks = href.split(/[\/\?#!&;]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            var nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), (_a = {}, _a[key] = next, _a));
            return this.dict(nextDict)[key] || null;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            return this.make($.$mol_merge_dict(this.dict(), next));
        };
        $mol_state_arg.make = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            var hash = chunks.join('#');
            return hash ? '#' + hash + '#' : '#';
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        return $mol_state_arg;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
    window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(null); });
})($ || ($ = {}));
//arg.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 36;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "href": function () { return _this.uri(); },
                "mol_link_current": function () { return _this.current(); },
            });
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                var patch = {};
                var arg = this.arg();
                for (var key in arg)
                    patch[key] = arg[key]();
                return new $.$mol_state_arg(this.state_prefix()).link(patch);
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            return $mol_link;
        }($.$mol_link));
        __decorate([
            $.$mol_mem()
        ], $mol_link.prototype, "uri", null);
        $mol.$mol_link = $mol_link;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//linker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var $;
(function ($) {
    window.addEventListener('storage', function (event) {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force);
    });
})($ || ($ = {}));
//local.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_request = (function (_super) {
        __extends($mol_http_request, _super);
        function $mol_http_request() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_request.prototype.uri = function () { return ''; };
        $mol_http_request.prototype.method = function () { return 'Get'; };
        $mol_http_request.prototype.credentials = function () {
            return null;
        };
        $mol_http_request.prototype.body = function () { return null; };
        $mol_http_request.prototype.native = function () {
            var _this = this;
            if (this['native()'])
                return this['native()'];
            var next = this['native()'] = $.$mol_http_request_native();
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if (Math.floor(next.status / 100) === 2) {
                    _this.response(next.responseText, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http_request.prototype.destroyed = function (next) {
            if (next) {
                var native = this['native()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http_request.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.native();
            var method = (next === void 0) ? 'Get' : this.method();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            native.send(next);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http_request.prototype.text = function (next, force) {
            return this.response(next, force);
        };
        return $mol_http_request;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_request.prototype, "response", null);
    $.$mol_http_request = $mol_http_request;
})($ || ($ = {}));
//request.js.map
;
var $;
(function ($) {
    $.$mol_http_request_native = function () { return new XMLHttpRequest; };
})($ || ($ = {}));
//request.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return new $mol_http_resource().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource.prototype.uri = function () { return ''; };
        $mol_http_resource.prototype.credentials = function () {
            return null;
        };
        $mol_http_resource.prototype.request = function () {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return 'Put'; };
            request.uri = function () { return _this.uri(); };
            request.credentials = function () { return _this.credentials(); };
            return request;
        };
        $mol_http_resource.prototype.text = function (next, force) {
            return this.request().text(next, force);
        };
        return $mol_http_resource;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "request", null);
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource, "item", null);
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, force) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t'), force));
        };
        return $mol_http_resource_json;
    }($mol_http_resource));
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource_json, "item", null);
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super.apply(this, arguments) || this;
        }
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_state_arg.value('locale') || 'en';
        };
        $mol_locale.texts = function () {
            var uri = "-/web.locale=" + this.lang() + ".json";
            var resource = $.$mol_http_resource_json.item(uri);
            return resource.json();
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler = (function (_super) {
        __extends($mol_labeler, _super);
        function $mol_labeler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_labeler.prototype.dom_name = function () {
            return "label";
        };
        $mol_labeler.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        return $mol_labeler;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit = (function (_super) {
        __extends($mol_unit, _super);
        function $mol_unit(value) {
            var _this = _super.call(this) || this;
            _this['valueOf()'] = value;
            return _this;
        }
        $mol_unit.prototype.prefix = function () {
            return '';
        };
        $mol_unit.prototype.postfix = function () {
            return '';
        };
        $mol_unit.prototype.valueOf = function () {
            return this['valueOf()'];
        };
        $mol_unit.prototype.delimiter = function () {
            return ' ';
        };
        $mol_unit.prototype.value_view = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.value_view() + this.postfix();
        };
        $mol_unit.summ = function (a, b) {
            var Class = a.Class();
            if (Class !== b.Class())
                throw new Error("Not same measure: " + Class + " , " + b.Class());
            return new Class(a.valueOf() + b.valueOf());
        };
        $mol_unit.prototype.mult = function (m) {
            var Class = this.Class();
            return new Class(this.valueOf() * m);
        };
        return $mol_unit;
    }($.$mol_object));
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit_money = (function (_super) {
        __extends($mol_unit_money, _super);
        function $mol_unit_money() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_usd.prototype.prefix = function () {
            return '$';
        };
        return $mol_unit_money_usd;
    }($mol_unit_money));
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    var $mol_unit_money_rur = (function (_super) {
        __extends($mol_unit_money_rur, _super);
        function $mol_unit_money_rur() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_rur.prototype.postfix = function () {
            return ' ₽';
        };
        return $mol_unit_money_rur;
    }($mol_unit_money));
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_cost = (function (_super) {
        __extends($mol_cost, _super);
        function $mol_cost() {
            return _super.apply(this, arguments) || this;
        }
        $mol_cost.prototype.value = function () {
            return null;
        };
        $mol_cost.prototype.prefix = function () {
            return "";
        };
        $mol_cost.prototype.Prefix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_cost.prototype.value_view = function () {
            return "";
        };
        $mol_cost.prototype.Value = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.value_view()); };
            });
        };
        $mol_cost.prototype.postfix = function () {
            return "";
        };
        $mol_cost.prototype.Postfix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_cost.prototype.sub = function () {
            return [].concat(this.Prefix(), this.Value(), this.Postfix());
        };
        return $mol_cost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Prefix", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Postfix", null);
    $.$mol_cost = $mol_cost;
})($ || ($ = {}));
//cost.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_cost = (function (_super) {
            __extends($mol_cost, _super);
            function $mol_cost() {
                return _super.apply(this, arguments) || this;
            }
            $mol_cost.prototype.value = function () {
                return null;
            };
            $mol_cost.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_cost.prototype.value_view = function () {
                return this.value().value_view();
            };
            $mol_cost.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_cost;
        }($.$mol_cost));
        $mol.$mol_cost = $mol_cost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//cost.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_row.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "minHeight": function () { return _this.minimal_height(); },
            });
        };
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
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
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            return $mol_row;
        }($.$mol_row));
        __decorate([
            $.$mol_mem()
        ], $mol_row.prototype, "item_offsets_top", null);
        $mol.$mol_row = $mol_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_list = (function (_super) {
        __extends($mol_list, _super);
        function $mol_list() {
            return _super.apply(this, arguments) || this;
        }
        $mol_list.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "minHeight": function () { return _this.minimal_height(); },
            });
        };
        $mol_list.prototype.rows = function () {
            return [];
        };
        $mol_list.prototype.sub = function () {
            return this.rows();
        };
        return $mol_list;
    }($.$mol_view));
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_list = (function (_super) {
            __extends($mol_list, _super);
            function $mol_list() {
                return _super.apply(this, arguments) || this;
            }
            $mol_list.prototype.row_offsets = function () {
                var sub = this.sub();
                if (!sub)
                    return null;
                var heightLimit = this.context().$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_list.prototype.row_context = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_view_visible_height = function () {
                    var limit = context.$mol_view_visible_height();
                    return limit - _this.row_offsets()[index];
                };
                return next;
            };
            $mol_list.prototype.sub_visible = function () {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.context(this.row_context(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_list.prototype.minimal_height = function () {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(function (child) {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            };
            return $mol_list;
        }($.$mol_list));
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "sub_visible", null);
        $mol.$mol_list = $mol_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//list.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_card = (function (_super) {
        __extends($mol_card, _super);
        function $mol_card() {
            return _super.apply(this, arguments) || this;
        }
        $mol_card.prototype.status = function () {
            return "";
        };
        $mol_card.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_card_status_type": function () { return _this.status(); },
            });
        };
        $mol_card.prototype.content = function () {
            return [];
        };
        $mol_card.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.content(); };
            });
        };
        $mol_card.prototype.status_text = function () {
            return this.status();
        };
        $mol_card.prototype.Status = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.minimal_height = function () { return 30; };
                obj.sub = function () { return [].concat(_this.status_text()); };
            });
        };
        $mol_card.prototype.rows = function () {
            return [].concat(this.Content(), this.Status());
        };
        return $mol_card;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Status", null);
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var $jin = this.$jin = {}

;
var $jin;
(function ($jin) {
    function concater(funcs) {
        switch (funcs.length) {
            case 0:
                return function (value) { return value; };
            case 1:
                return funcs[0];
            default:
                var mid = Math.ceil(funcs.length / 2);
                var first = $jin.concater(funcs.slice(0, mid));
                var second = $jin.concater(funcs.slice(mid));
                return function (value) {
                    return first(value) + second(value);
                };
        }
    }
    $jin.concater = concater;
})($jin || ($jin = {}));
//jin-concater.js.map
;
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var base_class = (function () {
            function base_class() {
            }
            base_class.formatter = function (pattern) {
                var _this = this;
                if (this.patterns[pattern])
                    return this.patterns[pattern];
                var tokens = Object.keys(this.patterns)
                    .sort()
                    .reverse()
                    .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
                var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
                var funcs = [];
                pattern.replace(lexer, function (str, text, token) {
                    if (text)
                        funcs.push(function () { return text; });
                    if (token)
                        funcs.push(_this.patterns[token]);
                    return str;
                });
                return this.patterns[pattern] = $jin.concater(funcs);
            };
            base_class.prototype.toString = function (pattern) {
                var Base = this.constructor;
                var formatter = Base.formatter(pattern);
                return formatter.call(Base, this);
            };
            return base_class;
        }());
        base_class.patterns = {};
        time.base_class = base_class;
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//base.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//type.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var duration_class = (function (_super) {
            __extends(duration_class, _super);
            function duration_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year) || 0;
                _this._month = config.month && Number(config.month) || 0;
                _this._day = config.day && Number(config.day) || 0;
                _this._hour = config.hour && Number(config.hour) || 0;
                _this._minute = config.minute && Number(config.minute) || 0;
                _this._second = config.second && Number(config.second) || 0;
                return _this;
            }
            duration_class.make = function (duration) {
                if (!arguments.length)
                    duration = [];
                var type = $jin_type(duration);
                switch (type) {
                    case 'Number':
                        return new this({ second: duration / 1000 });
                    case 'Array':
                        var dur = duration;
                        return new this({
                            year: dur[0],
                            month: dur[1],
                            day: dur[2],
                            hour: dur[3],
                            minute: dur[4],
                            second: dur[5],
                        });
                    case 'Object':
                        if (duration instanceof this)
                            return duration;
                        return new this(duration);
                    case 'String':
                        if (duration === 'Z') {
                            return new this({});
                        }
                        var parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                year: found[1],
                                month: found[2],
                                day: found[3],
                                hour: found[4],
                                minute: found[5],
                                second: found[6],
                            });
                        }
                        var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                hour: found[1],
                                minute: found[2],
                            });
                        }
                        throw new Error('Can not parse time duration (' + duration + ')');
                    default:
                        throw new Error('Wrong type of time duration (' + type + ')');
                }
            };
            Object.defineProperty(duration_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            duration_class.prototype.summ = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year + duration.year,
                    month: this.month + duration.month,
                    day: this.day + duration.day,
                    hour: this.hour + duration.hour,
                    minute: this.minute + duration.minute,
                    second: this.second + duration.second,
                });
            };
            duration_class.prototype.sub = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year - duration.year,
                    month: this.month - duration.month,
                    day: this.day - duration.day,
                    hour: this.hour - duration.hour,
                    minute: this.minute - duration.minute,
                    second: this.second - duration.second,
                });
            };
            duration_class.prototype.valueOf = function () {
                var day = this.year * 365 + this.month * 30.4 + this.day;
                var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
                return second * 1000;
            };
            duration_class.prototype.toJSON = function () { return this.toString(); };
            duration_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return duration_class;
        }($jin.time.base_class));
        duration_class.patterns = {
            '#Y': function (duration) {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': function (duration) {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': function (duration) {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': function (duration) {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': function (duration) {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': function (duration) {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            '+hh': function (duration) {
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
            'mm': function (duration) {
                return (duration.minute < 10)
                    ? ('0' + duration.minute)
                    : String(duration.minute);
            },
        };
        time.duration_class = duration_class;
        time.duration = duration_class.make.bind(duration_class);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//duration.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var moment_class = (function (_super) {
            __extends(moment_class, _super);
            function moment_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year);
                _this._month = config.month && Number(config.month);
                _this._day = config.day && Number(config.day);
                _this._hour = config.hour && Number(config.hour);
                _this._minute = config.minute && Number(config.minute);
                _this._second = config.second && Number(config.second);
                _this._offset = config.offset && _this.constructor.duration_class.make(config.offset);
                _this._native = null;
                return _this;
            }
            moment_class.make = function (moment) {
                if (!arguments.length)
                    moment = new Date;
                var type = $jin_type(moment);
                switch (type) {
                    case 'Number':
                        moment = new Date(moment);
                    case 'Date':
                        var native = moment;
                        var offset = -native.getTimezoneOffset();
                        return new this({
                            year: native.getFullYear(),
                            month: native.getMonth(),
                            day: native.getDate() - 1,
                            hour: native.getHours(),
                            minute: native.getMinutes(),
                            second: native.getSeconds() + native.getMilliseconds() / 1000,
                            offset: {
                                hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                                minute: offset % 60
                            }
                        });
                    case 'String':
                        var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(moment);
                        if (!parsed)
                            throw new Error('Can not parse time moment (' + moment + ')');
                        return new this({
                            year: parsed[1],
                            month: parsed[2] ? (Number(parsed[2]) - 1) : void 0,
                            day: parsed[3] ? (Number(parsed[3]) - 1) : void 0,
                            hour: parsed[4],
                            minute: parsed[5],
                            second: parsed[6],
                            offset: parsed[7]
                        });
                    case 'Array':
                        var mom = moment;
                        return new this({
                            year: mom[0],
                            month: mom[1],
                            day: mom[2],
                            hour: mom[3],
                            minute: mom[4],
                            second: mom[5],
                            offset: mom[6],
                        });
                    case 'Object':
                        if (moment instanceof this)
                            return moment;
                        return new this(moment);
                    default:
                        throw new Error('Wrong type of time moment (' + type + ')');
                }
            };
            Object.defineProperty(moment_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "offset", {
                get: function () { return this._offset; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "native", {
                get: function () {
                    if (this._native)
                        return this._native;
                    var utc = this.toOffset('Z');
                    return this._native = new Date(Date.UTC(utc.year || 0, utc.month || 0, (utc.day || 0) + 1, utc.hour || 0, utc.minute || 0, utc.second && Math.ceil(utc.second) || 0, utc.second && (utc.second - Math.ceil(utc.second)) || 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "normal", {
                get: function () {
                    return this.constructor.make(this.native).merge({
                        year: (this._year === void 0) ? null : void 0,
                        month: (this._month === void 0) ? null : void 0,
                        day: (this._day === void 0) ? null : void 0,
                        hour: (this._hour === void 0) ? null : void 0,
                        minute: (this._minute === void 0) ? null : void 0,
                        second: (this._second === void 0) ? null : void 0,
                        offset: (this._offset === void 0) ? null : void 0,
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "weekDay", {
                get: function () {
                    return this.native.getDay();
                },
                enumerable: true,
                configurable: true
            });
            moment_class.prototype.merge = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                return new Moment({
                    year: (moment.year === void 0)
                        ? this._year
                        : (moment.year === null)
                            ? void 0
                            : moment.year,
                    month: (moment.month === void 0)
                        ? this._month
                        : (moment.month === null)
                            ? void 0
                            : moment.month,
                    day: (moment.day === void 0)
                        ? this._day
                        : (moment.day === null)
                            ? void 0
                            : moment.day,
                    hour: (moment.hour === void 0)
                        ? this._hour
                        : (moment.hour === null)
                            ? void 0
                            : moment.hour,
                    minute: (moment.minute === void 0)
                        ? this._minute
                        : (moment.minute === null)
                            ? void 0
                            : moment.minute,
                    second: (moment.second === void 0)
                        ? this._second
                        : (moment.second === null)
                            ? void 0
                            : moment.second,
                    offset: (moment.offset === void 0)
                        ? this._offset
                        : (moment.offset === null)
                            ? void 0
                            : moment.offset,
                });
            };
            moment_class.prototype.shift = function (config) {
                var Moment = this.constructor;
                var duration = Moment.duration_class.make(config);
                var moment = Moment.make().merge(this);
                var second = moment.second + duration.second;
                var native = new Date(moment.year + duration.year, moment.month + duration.month, moment.day + duration.day + 1, moment.hour + duration.hour, moment.minute + duration.minute, Math.floor(second), (second - Math.floor(second)) * 1000);
                if (isNaN(native.valueOf()))
                    throw new Error('Wrong time');
                return new Moment({
                    year: (this._year === void 0) ? void 0 : native.getFullYear(),
                    month: (this._month === void 0) ? void 0 : native.getMonth(),
                    day: (this._day === void 0) ? void 0 : native.getDate() - 1,
                    hour: (this._hour === void 0) ? void 0 : native.getHours(),
                    minute: (this._minute === void 0) ? void 0 : native.getMinutes(),
                    second: (this._second === void 0) ? void 0 : native.getSeconds() + native.getMilliseconds() / 1000,
                    offset: this.offset,
                });
            };
            moment_class.prototype.sub = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                var dur = {
                    year: (moment.year === void 0)
                        ? this.year
                        : (this.year || 0) - moment.year,
                    month: (moment.month === void 0)
                        ? this.month
                        : (this.month || 0) - moment.month,
                    day: (moment.day === void 0)
                        ? this.day
                        : (this.day || 0) - moment.day,
                    hour: (moment.hour === void 0)
                        ? this.hour
                        : (this.hour || 0) - moment.hour,
                    minute: (moment.minute === void 0)
                        ? this.minute
                        : (this.minute || 0) - moment.minute,
                    second: (moment.second === void 0)
                        ? this.second
                        : (this.second || 0) - moment.second,
                };
                return new Moment.duration_class(dur);
            };
            moment_class.prototype.toOffset = function (duration) {
                if (this._offset) {
                    var Moment = this.constructor;
                    return this
                        .shift(Moment.duration_class.make(duration).sub(this._offset))
                        .merge({ offset: duration });
                }
                else {
                    return this.merge({ offset: duration });
                }
            };
            moment_class.prototype.valueOf = function () { return this.native.getTime(); };
            moment_class.prototype.toJSON = function () { return this.toString(); };
            moment_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return moment_class;
        }($jin.time.base_class));
        moment_class.duration_class = $jin.time.duration_class;
        moment_class.patterns = {
            'YYYY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': function (moment) {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthLong[moment.month];
            },
            'Mon': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthShort[moment.month];
            },
            '-MM': function (moment) {
                if (moment.month == null)
                    return '';
                return '-' + moment.constructor.patterns['MM'](moment);
            },
            'MM': function (moment) {
                if (moment.month == null)
                    return '';
                var month = moment.month + 1;
                return (month < 10)
                    ? ('0' + month)
                    : ('' + month);
            },
            'M': function (moment) {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayLong[moment.weekDay];
            },
            'WD': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayShort[moment.weekDay];
            },
            '-DD': function (moment) {
                if (moment.day == null)
                    return '';
                return '-' + moment.constructor.patterns['DD'](moment);
            },
            'DD': function (moment) {
                if (moment.day == null)
                    return '';
                var day = moment.day + 1;
                return (day < 10)
                    ? ('0' + day)
                    : String(day);
            },
            'D': function (moment) {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': function (moment) {
                if (moment.hour == null)
                    return '';
                return 'T' + moment.constructor.patterns['hh'](moment);
            },
            'hh': function (moment) {
                if (moment.hour == null)
                    return '';
                return (moment.hour < 10)
                    ? ('0' + moment.hour)
                    : String(moment.hour);
            },
            'h': function (moment) {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return ':' + moment.constructor.patterns['mm'](moment);
            },
            'mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return (moment.minute < 10)
                    ? ('0' + moment.minute)
                    : String(moment.minute);
            },
            'm': function (moment) {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': function (moment) {
                if (moment.second == null)
                    return '';
                return ':' + moment.constructor.patterns['ss'](moment);
            },
            'ss': function (moment) {
                if (moment.second == null)
                    return '';
                var second = Math.floor(moment.second);
                return (second < 10)
                    ? ('0' + second)
                    : String(second);
            },
            's': function (moment) {
                if (moment.second == null)
                    return '';
                return String(Math.floor(moment.second));
            },
            '.sss': function (moment) {
                if (moment.second == null)
                    return '';
                if (moment.second - Math.floor(moment.second) === 0)
                    return '';
                return '.' + moment.constructor.patterns['sss'](moment);
            },
            'sss': function (moment) {
                if (moment.second == null)
                    return '';
                var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return (millisecond < 10)
                    ? ('00' + millisecond)
                    : (millisecond < 100)
                        ? ('0' + millisecond)
                        : String(millisecond);
            },
            'Z': function (moment) {
                var offset = moment.offset;
                if (!offset)
                    return '';
                return offset.toString('+hh:mm');
            }
        };
        moment_class.monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        moment_class.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        moment_class.weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        moment_class.weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                return _super.apply(this, arguments) || this;
            }
            return moment_class_ru;
        }(moment_class));
        moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix, count, length) {
        if (prefix === void 0) { prefix = ''; }
        if (count === void 0) { count = 10; }
        if (length === void 0) { length = 10; }
        if (prefix.length >= length)
            return [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        var strings = [];
        for (var i = 0; i < count; i++) {
            var text = prefix;
            for (var j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length) {
        if (length === void 0) { length = 8; }
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max) {
        if (max === void 0) { max = 1000; }
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
        return "A " + type + " that makes " + product;
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
        return first + " " + last;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift) {
        if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
        return $jin.time.moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
;
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (function () { return value; });
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_domain_provider = (function (_super) {
        __extends($mol_app_supplies_domain_provider, _super);
        function $mol_app_supplies_domain_provider() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_group.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.manager = function () { return void 0; };
        return $mol_app_supplies_domain_supply_group;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_group = $mol_app_supplies_domain_supply_group;
    var $mol_app_supplies_domain_supply_division = (function (_super) {
        __extends($mol_app_supplies_domain_supply_division, _super);
        function $mol_app_supplies_domain_supply_division() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_pay_method = (function (_super) {
        __extends($mol_app_supplies_domain_pay_method, _super);
        function $mol_app_supplies_domain_pay_method() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_pay_method.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_pay_method.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_pay_method;
    }($.$mol_object));
    $.$mol_app_supplies_domain_pay_method = $mol_app_supplies_domain_pay_method;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supply_moment = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.division = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.store = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.price = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.quantity = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply_position;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_position = $mol_app_supplies_domain_supply_position;
    var $mol_app_supplies_domain_attachment = (function (_super) {
        __extends($mol_app_supplies_domain_attachment, _super);
        function $mol_app_supplies_domain_attachment() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_attachment.prototype.url_thumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.url_load = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballance_unit = (function (_super) {
        __extends($mol_app_supplies_domain_ballance_unit, _super);
        function $mol_app_supplies_domain_ballance_unit() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_ballance_unit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballance_unit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballance_unit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballance_unit = $mol_app_supplies_domain_ballance_unit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballance_unit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.pay_method = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    var $mol_app_supplies_domain_supply_status;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_mock.prototype.supplies = function () {
            var next = [];
            for (var i = 1; i <= 100; ++i) {
                next.push(this.supply((i * 123456789 % 987654321).toString(16).toUpperCase()));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.positions = function (supply) {
            var next = [];
            var count = 10 + Math.floor(Math.random() * 30);
            for (var i = 1; i <= count; ++i) {
                next.push(this.position({
                    supply: supply,
                    position: (i * 123456789 % 987654321).toString(16).toUpperCase()
                }));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.supply_status = function (id, next) {
            return next || $.$mol_stub_select_random([
                $mol_app_supplies_domain_supply_status.pending,
                $mol_app_supplies_domain_supply_status.approved
            ]);
        };
        $mol_app_supplies_domain_mock.prototype.supply = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.cost = function () { return new $.$mol_unit_money_usd(_this.positions(id)
                    .reduce(function (sum, pos) { return sum + pos.cost().valueOf(); }, 0)); };
                obj.status = function (next) { return _this.supply_status(id, next); };
                obj.provider = $.$mol_const(_this.provider($.$mol_stub_code(2)));
                obj.consumer = $.$mol_const(_this.consumer($.$mol_stub_code(2)));
                obj.group = $.$mol_const(_this.supply_group($.$mol_stub_code(2)));
                obj.contract = $.$mol_const(_this.contract($.$mol_stub_code(8)));
                obj.manager = $.$mol_const(_this.person($.$mol_stub_code(2)));
                obj.ballance_unit = $.$mol_const(_this.ballance_unit($.$mol_stub_code(2)));
                obj.pay_method = $.$mol_const(_this.pay_method($.$mol_stub_code(1)));
                obj.debitor = $.$mol_const(_this.debitor($.$mol_stub_code(2)));
                obj.positions = function () { return _this.positions(id); };
                obj.attachments = function (next) { return _this.attachments(id, next); };
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return new $mol_app_supplies_domain_provider().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return new $mol_app_supplies_domain_consumer().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballance_unit = function (id) {
            return new $mol_app_supplies_domain_ballance_unit().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random([
                    'ACME Enterprise',
                    'ACME Customer',
                    'ACME Inside'
                ]));
            });
        };
        $mol_app_supplies_domain_mock.prototype.division = function (id) {
            return new $mol_app_supplies_domain_supply_division().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_code(4));
            });
        };
        $mol_app_supplies_domain_mock.prototype.supply_group = function (id) {
            return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name() + ' Group');
            });
        };
        $mol_app_supplies_domain_mock.prototype.store = function (id) {
            return new $mol_app_supplies_domain_store().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_city() + ' #' + $.$mol_stub_code(2));
            });
        };
        $mol_app_supplies_domain_mock.prototype.person = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
            });
        };
        $mol_app_supplies_domain_mock.prototype.pay_method = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random(['Accounting', 'Cash']));
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
                obj.name = $.$mol_const($.$mol_stub_product_name());
                obj.supply_moment = $.$mol_const($.$mol_stub_time(60 * 24 * 365));
                obj.store = $.$mol_const(_this.store($.$mol_stub_code(2)));
                obj.division = $.$mol_const(_this.division($.$mol_stub_code(2)));
                obj.price = $.$mol_const($.$mol_stub_price(1000));
                obj.quantity = $.$mol_const(Math.round(Math.random() * 30));
                obj.cost = $.$mol_const(obj.price().mult(obj.quantity()));
            });
        };
        $mol_app_supplies_domain_mock.prototype.attachments = function (id, next) {
            return next || [];
        };
        $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
            return new $mol_app_supplies_domain_attachment().setup(function (obj) {
                obj.url_thumb = obj.url_load = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            });
        };
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "positions", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_status", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "provider", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "consumer", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "ballance_unit", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "division", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_group", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "store", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "person", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "contract", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "pay_method", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "debitor", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "position", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachments", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachment", null);
    $.$mol_app_supplies_domain_mock = $mol_app_supplies_domain_mock;
})($ || ($ = {}));
//domain.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_card = (function (_super) {
        __extends($mol_app_supplies_card, _super);
        function $mol_app_supplies_card() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_card.prototype.status = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.code_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_title");
        };
        $mol_app_supplies_card.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Code_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.code_title(); };
                obj.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_card.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_card.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_card.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_card.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_card.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_card.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Provider_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_card.prototype.items = function () {
            return [].concat(this.Code_item(), this.Cost_item(), this.Provider_item());
        };
        $mol_app_supplies_card.prototype.Group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_card.prototype.Card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.status = function () { return _this.status(); };
                obj.Content = function () { return _this.Group(); };
            });
        };
        $mol_app_supplies_card.prototype.sub = function () {
            return [].concat(this.Card());
        };
        return $mol_app_supplies_card;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Code_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Provider_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Card", null);
    $.$mol_app_supplies_card = $mol_app_supplies_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_card = (function (_super) {
            __extends($mol_app_supplies_card, _super);
            function $mol_app_supplies_card() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_card.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_card.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_card.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_card.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_card.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_card;
        }($.$mol_app_supplies_card));
        $mol.$mol_app_supplies_card = $mol_app_supplies_card;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//card.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_card_demo_pending = (function (_super) {
        __extends($mol_app_supplies_card_demo_pending, _super);
        function $mol_app_supplies_card_demo_pending() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card_demo_pending.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_card_demo_pending.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_card_demo_pending.prototype.cost = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1000000; };
            });
        };
        $mol_app_supplies_card_demo_pending.prototype.status = function () {
            return "pending";
        };
        $mol_app_supplies_card_demo_pending.prototype.arg = function () {
            return $.$mol_merge_dict(_super.prototype.arg.call(this), {
                "supply": function () { return "1"; },
            });
        };
        return $mol_app_supplies_card_demo_pending;
    }($.$mol_app_supplies_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card_demo_pending.prototype, "cost", null);
    $.$mol_app_supplies_card_demo_pending = $mol_app_supplies_card_demo_pending;
})($ || ($ = {}));
(function ($) {
    var $mol_app_supplies_card_demo_approved = (function (_super) {
        __extends($mol_app_supplies_card_demo_approved, _super);
        function $mol_app_supplies_card_demo_approved() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card_demo_approved.prototype.code = function () {
            return "43434232";
        };
        $mol_app_supplies_card_demo_approved.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_card_demo_approved.prototype.cost = function () {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 3000000; };
            });
        };
        $mol_app_supplies_card_demo_approved.prototype.status = function () {
            return "approved";
        };
        $mol_app_supplies_card_demo_approved.prototype.arg = function () {
            return $.$mol_merge_dict(_super.prototype.arg.call(this), {
                "supply": function () { return "2"; },
            });
        };
        return $mol_app_supplies_card_demo_approved;
    }($.$mol_app_supplies_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card_demo_approved.prototype, "cost", null);
    $.$mol_app_supplies_card_demo_approved = $mol_app_supplies_card_demo_approved;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_stack = (function (_super) {
        __extends($mol_stack, _super);
        function $mol_stack() {
            return _super.apply(this, arguments) || this;
        }
        $mol_stack.prototype.side = function () {
            return false;
        };
        $mol_stack.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_stack_side": function () { return _this.side(); },
            });
        };
        $mol_stack.prototype.main = function () {
            return [];
        };
        $mol_stack.prototype.Main = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.main(); };
            });
        };
        $mol_stack.prototype.addon = function () {
            return [];
        };
        $mol_stack.prototype.Addon = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.addon(); };
            });
        };
        $mol_stack.prototype.sub = function () {
            return [].concat(this.Main(), this.Addon());
        };
        return $mol_stack;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_stack.prototype, "Main", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stack.prototype, "Addon", null);
    $.$mol_stack = $mol_stack;
})($ || ($ = {}));
//stack.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_stack = (function (_super) {
            __extends($mol_stack, _super);
            function $mol_stack() {
                return _super.apply(this, arguments) || this;
            }
            $mol_stack.prototype.side = function (next) {
                if (!this.main())
                    return true;
                if (this.main().length === 0)
                    return true;
                var arg = (next === void 0) ? void 0 : next ? '' : null;
                return $.$mol_state_arg.value(this.state_key('side'), arg) != null;
            };
            return $mol_stack;
        }($.$mol_stack));
        $mol.$mol_stack = $mol_stack;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stack.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "placeholder": function () { return _this.hint(); },
                "type": function () { return _this.type(); },
            });
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val) {
            return this.value(val);
        };
        $mol_string.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "disabled": function () { return _this.disabled(); },
                "value": function () { return _this.value_changed(); },
            });
        };
        $mol_string.prototype.event_change = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "input": function (event) { return _this.event_change(event); },
            });
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                return _super.apply(this, arguments) || this;
            }
            $mol_string.prototype.event_change = function (next) {
                this.value(this.dom_node().value.trim());
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.barFields = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.form_fields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.barButtons = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.barFields(), this.barButtons());
        };
        return $mol_form;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barFields", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barButtons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            return $mol_form;
        }($.$mol_form));
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "submit_blocked", null);
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//form.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.namer = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.bider = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.namer(), _this.bider()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.sub = function () {
            return [].concat(this.label(), this.control());
        };
        return $mol_form_field;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "namer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "bider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "label", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event) {
            return this.event_click(event);
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (event) { return _this.event_activate(event); },
            });
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
                "role": function () { return "button"; },
                "tabindex": function () { return _this.tab_index(); },
            });
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_enter = (function (_super) {
        __extends($mol_app_supplies_enter, _super);
        function $mol_app_supplies_enter() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_enter.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.login = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.password = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_supplies_enter.prototype.event_submit = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_enter.prototype.submit_blocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.sub = function () {
            return [].concat(this.form());
        };
        return $mol_app_supplies_enter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "form", null);
    $.$mol_app_supplies_enter = $mol_app_supplies_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_enter = (function (_super) {
            __extends($mol_app_supplies_enter, _super);
            function $mol_app_supplies_enter() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_enter.prototype.event_submit = function () {
                this.entered(true);
            };
            return $mol_app_supplies_enter;
        }($.$mol_app_supplies_enter));
        $mol.$mol_app_supplies_enter = $mol_app_supplies_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                sessionStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function (val) { return _this.scroll_top(val); },
                "scrollLeft": function (val) { return _this.scroll_left(val); },
            });
        };
        $mol_scroll.prototype.event_scroll = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (event) { return _this.event_scroll(event); },
                "overflow": function (event) { return _this.event_scroll(event); },
                "underflow": function (event) { return _this.event_scroll(event); },
            });
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context.$mol_scroll_scroll_top = function () { return 0; };
    $.$mol_view_context.$mol_scroll_scroll_left = function () { return 0; };
    $.$mol_view_context.$mol_scroll_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                return _super.apply(this, arguments) || this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_top(Math.max(0, el.scrollTop));
                    _this.scroll_left(Math.max(0, el.scrollLeft));
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - el.scrollTop - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - el.scrollLeft - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                var _this = this;
                if (next) {
                    setTimeout(function () {
                        _this.moving(false);
                    });
                }
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_code = (function (_super) {
        __extends($mol_code, _super);
        function $mol_code() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_code.prototype.format = function () {
            return "";
        };
        $mol_code.prototype.hint = function () {
            return this.format();
        };
        $mol_code.prototype.Manual = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_code.prototype.event_scan = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_code.prototype.scan_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "scan_label");
        };
        $mol_code.prototype.Scan = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_scan(val); };
                obj.sub = function () { return [].concat(_this.scan_label()); };
            });
        };
        $mol_code.prototype.sub = function () {
            return [].concat(this.Manual(), this.Scan());
        };
        return $mol_code;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Manual", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "event_scan", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Scan", null);
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_code = (function (_super) {
            __extends($mol_code, _super);
            function $mol_code() {
                return _super.apply(this, arguments) || this;
            }
            $mol_code.prototype.scan_support = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_code.prototype.Scan = function () {
                return this.scan_support() ? _super.prototype.Scan.call(this) : null;
            };
            $mol_code.prototype.event_scan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_code;
        }($.$mol_code));
        $mol.$mol_code = $mol_code;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//code.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_list = (function (_super) {
        __extends($mol_app_supplies_list, _super);
        function $mol_app_supplies_list() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_list.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_list.prototype.search_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "search_hint");
        };
        $mol_app_supplies_list.prototype.search_query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_list.prototype.Search = function () {
            var _this = this;
            return new $.$mol_code().setup(function (obj) {
                obj.hint = function () { return _this.search_hint(); };
                obj.value = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_list.prototype.Search_panel = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Search()); };
            });
        };
        $mol_app_supplies_list.prototype.sub = function () {
            return [].concat(this.Head(), this.Search_panel(), this.Body());
        };
        $mol_app_supplies_list.prototype.supply_rows = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.Supply_rows = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.supply_rows(); };
            });
        };
        $mol_app_supplies_list.prototype.body = function () {
            return [].concat(this.Supply_rows());
        };
        return $mol_app_supplies_list;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Search", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Search_panel", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Supply_rows", null);
    $.$mol_app_supplies_list = $mol_app_supplies_list;
})($ || ($ = {}));
//lister.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_list = (function (_super) {
            __extends($mol_app_supplies_list, _super);
            function $mol_app_supplies_list() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_list.prototype.requests = function () {
                return [];
            };
            $mol_app_supplies_list.prototype.supply_rows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.Supply_row(index); });
            };
            $mol_app_supplies_list.prototype.Supply_row = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_card().setup(function (obj) {
                    obj.supply = function () { return _this.supplies()[index]; };
                    obj.arg = function () { return ({
                        supply: function () { return _this.supplies()[index].id(); },
                        side: function () { return null; }
                    }); };
                });
            };
            return $mol_app_supplies_list;
        }($.$mol_app_supplies_list));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_list.prototype, "supply_rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_list.prototype, "Supply_row", null);
        $mol.$mol_app_supplies_list = $mol_app_supplies_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//lister.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.viewBox = function () {
            return "0 0 100 100 ";
        };
        $mol_svg_root.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "viewBox": function () { return _this.viewBox(); },
            });
        };
        return $mol_svg_root;
    }($.$mol_view));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        $mol_svg_path.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "d": function () { return _this.geometry(); },
            });
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.radius = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "r": function () { return _this.radius(); },
                "cx": function () { return _this.pos_x(); },
                "cy": function () { return _this.pos_y(); },
            });
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.viewBox = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "viewBox": function () { return _this.viewBox(); },
            });
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.pather = function () {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.pather());
        };
        return $mol_icon;
    }($.$mol_svg));
    __decorate([
        $.$mol_mem()
    ], $mol_icon.prototype, "pather", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_chevron = (function (_super) {
        __extends($mol_icon_chevron, _super);
        function $mol_icon_chevron() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_chevron.prototype.path = function () {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        };
        return $mol_icon_chevron;
    }($.$mol_icon));
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.checked = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_check_checked": function () { return _this.checked(); },
                "aria-checked": function () { return _this.checked(); },
                "role": function () { return "checkbox"; },
            });
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [];
        };
        $mol_check.prototype.Label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        return $mol_check;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "Label", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
            };
            return $mol_check;
        }($.$mol_check));
        $mol.$mol_check = $mol_check;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch = (function (_super) {
        __extends($mol_switch, _super);
        function $mol_switch() {
            return _super.apply(this, arguments) || this;
        }
        $mol_switch.prototype.minimal_height = function () {
            return 44;
        };
        $mol_switch.prototype.option_checked = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_switch.prototype.option_title = function (id) {
            return "";
        };
        $mol_switch.prototype.enabled = function () {
            return true;
        };
        $mol_switch.prototype.option_enabled = function (id) {
            return this.enabled();
        };
        $mol_switch.prototype.Option = function (id) {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.checked = function (val) { return _this.option_checked(id, val); };
                obj.label = function () { return [].concat(_this.option_title(id)); };
                obj.enabled = function () { return _this.option_enabled(id); };
            });
        };
        $mol_switch.prototype.value = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_switch.prototype.options = function () {
            return ({});
        };
        $mol_switch.prototype.items = function () {
            return [];
        };
        $mol_switch.prototype.sub = function () {
            return this.items();
        };
        return $mol_switch;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_switch = (function (_super) {
            __extends($mol_switch, _super);
            function $mol_switch() {
                return _super.apply(this, arguments) || this;
            }
            $mol_switch.prototype.value = function (next) {
                return $.$mol_state_session.value(this + ".value()", next);
            };
            $mol_switch.prototype.options = function () {
                return {};
            };
            $mol_switch.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.Option(key); });
            };
            $mol_switch.prototype.option_title = function (key) {
                return this.options()[key]();
            };
            $mol_switch.prototype.option_checked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            return $mol_switch;
        }($.$mol_switch));
        __decorate([
            $.$mol_mem()
        ], $mol_switch.prototype, "items", null);
        $mol.$mol_switch = $mol_switch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switch.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_deck = (function (_super) {
        __extends($mol_deck, _super);
        function $mol_deck() {
            return _super.apply(this, arguments) || this;
        }
        $mol_deck.prototype.items = function () {
            return [];
        };
        $mol_deck.prototype.current = function (val) {
            return (val !== void 0) ? val : "0";
        };
        $mol_deck.prototype.switch_options = function () {
            return ({});
        };
        $mol_deck.prototype.Switch = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.current(val); };
                obj.options = function () { return _this.switch_options(); };
            });
        };
        $mol_deck.prototype.Content = function () {
            return null;
        };
        $mol_deck.prototype.rows = function () {
            return [].concat(this.Switch(), this.Content());
        };
        return $mol_deck;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "current", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "Switch", null);
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
(function ($) {
    var $mol_deck_item = (function (_super) {
        __extends($mol_deck_item, _super);
        function $mol_deck_item() {
            return _super.apply(this, arguments) || this;
        }
        $mol_deck_item.prototype.title = function () {
            return "";
        };
        $mol_deck_item.prototype.Content = function () {
            return null;
        };
        return $mol_deck_item;
    }($.$mol_object));
    $.$mol_deck_item = $mol_deck_item;
})($ || ($ = {}));
//deck.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_deck = (function (_super) {
            __extends($mol_deck, _super);
            function $mol_deck() {
                return _super.apply(this, arguments) || this;
            }
            $mol_deck.prototype.current = function (next) {
                return $.$mol_state_session.value(this + ".current()", next) || '0';
            };
            $mol_deck.prototype.switch_options = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = function () { return item.title(); };
                });
                return options;
            };
            $mol_deck.prototype.Content = function () {
                return this.items()[this.current()].Content();
            };
            return $mol_deck;
        }($.$mol_deck));
        __decorate([
            $.$mol_mem()
        ], $mol_deck.prototype, "Content", null);
        $mol.$mol_deck = $mol_deck;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//deck.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_tiler = (function (_super) {
        __extends($mol_tiler, _super);
        function $mol_tiler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_tiler.prototype.items = function () {
            return [];
        };
        $mol_tiler.prototype.sub = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($.$mol_view));
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//tiler.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_tiler = (function (_super) {
            __extends($mol_tiler, _super);
            function $mol_tiler() {
                return _super.apply(this, arguments) || this;
            }
            $mol_tiler.prototype.sub = function () {
                return this.groupChilds([]);
            };
            $mol_tiler.prototype.groupItems = function (path) {
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
            };
            $mol_tiler.prototype.groupChilds = function (path) {
                var _this = this;
                var items = this.groupItems(path);
                if (items.length <= 2)
                    return items.map(function (_, index) { return _this.item(path.concat(index)); });
                return [
                    this.child(path.concat(0)),
                    this.child(path.concat(1)),
                ];
            };
            $mol_tiler.prototype.child = function (path) {
                return (this.groupItems(path).length > 1)
                    ? this.group(path)
                    : this.item(path);
            };
            $mol_tiler.prototype.group = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupItems(path); };
                });
            };
            return $mol_tiler;
        }($.$mol_tiler));
        __decorate([
            $.$mol_mem()
        ], $mol_tiler.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupItems", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupChilds", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "child", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "group", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "item", null);
        $mol.$mol_tiler = $mol_tiler;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//tiler.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_attach = (function (_super) {
        __extends($mol_icon_attach, _super);
        function $mol_icon_attach() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_attach.prototype.path = function () {
            return "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z";
        };
        return $mol_icon_attach;
    }($.$mol_icon));
    $.$mol_icon_attach = $mol_icon_attach;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_attach = (function (_super) {
        __extends($mol_attach, _super);
        function $mol_attach() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach.prototype.items = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_attach.prototype.attach_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach.prototype.Add = function () {
            var _this = this;
            return new $.$mol_attach_add().setup(function (obj) {
                obj.file_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_attach.prototype.content = function () {
            return [].concat(this.items(), this.Add());
        };
        $mol_attach.prototype.Content = function () {
            var _this = this;
            return new $.$mol_tiler().setup(function (obj) {
                obj.items = function () { return _this.content(); };
            });
        };
        $mol_attach.prototype.Item = function (id) {
            return new $.$mol_attach_item();
        };
        return $mol_attach;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "items", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Content", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_attach.prototype, "Item", null);
    $.$mol_attach = $mol_attach;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_item = (function (_super) {
        __extends($mol_attach_item, _super);
        function $mol_attach_item() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_item.prototype.url_thumb = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.url_load = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.uri = function (val) {
            return this.url_load(val);
        };
        $mol_attach_item.prototype.style_bg = function () {
            return "";
        };
        $mol_attach_item.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "backgroundImage": function () { return _this.style_bg(); },
            });
        };
        $mol_attach_item.prototype.loadable = function () {
            return true;
        };
        $mol_attach_item.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "download": function () { return _this.loadable(); },
            });
        };
        return $mol_attach_item;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_thumb", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_load", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "uri", null);
    $.$mol_attach_item = $mol_attach_item;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add = (function (_super) {
        __extends($mol_attach_add, _super);
        function $mol_attach_add() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_add.prototype.dom_name = function () {
            return "div";
        };
        $mol_attach_add.prototype.file_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_add.prototype.Icon = function () {
            return new $.$mol_icon_attach();
        };
        $mol_attach_add.prototype.event_capture = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.event_picked = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.Input = function () {
            var _this = this;
            return new $.$mol_attach_add_input().setup(function (obj) {
                obj.event_capture = function (val) { return _this.event_capture(val); };
                obj.event_picked = function (val) { return _this.event_picked(val); };
            });
        };
        $mol_attach_add.prototype.sub = function () {
            return [].concat(this.Icon(), this.Input());
        };
        return $mol_attach_add;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "file_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_picked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Input", null);
    $.$mol_attach_add = $mol_attach_add;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add_input = (function (_super) {
        __extends($mol_attach_add_input, _super);
        function $mol_attach_add_input() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_add_input.prototype.dom_name = function () {
            return "input";
        };
        $mol_attach_add_input.prototype.type = function () {
            return "file";
        };
        $mol_attach_add_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attach_add_input.prototype.multiple = function () {
            return true;
        };
        $mol_attach_add_input.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "type": function () { return _this.type(); },
                "accept": function () { return _this.accept(); },
                "multiple": function () { return _this.multiple(); },
            });
        };
        $mol_attach_add_input.prototype.event_capture = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event_click = function (val) {
            return this.event_capture(val);
        };
        $mol_attach_add_input.prototype.event_picked = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "change": function (val) { return _this.event_picked(val); },
            });
        };
        return $mol_attach_add_input;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_picked", null);
    $.$mol_attach_add_input = $mol_attach_add_input;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_attach = (function (_super) {
            __extends($mol_attach, _super);
            function $mol_attach() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach.prototype.attach_new = function (next) {
                var items = this.items();
                var item = this.Item(items.length);
                item.url_thumb(next);
                item.url_load(next);
                this.items(items.concat(item));
                return void 0;
            };
            return $mol_attach;
        }($.$mol_attach));
        $mol.$mol_attach = $mol_attach;
        var $mol_attach_item = (function (_super) {
            __extends($mol_attach_item, _super);
            function $mol_attach_item() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach_item.prototype.style_bg = function () {
                return "url(\"" + this.url_thumb() + "\")";
            };
            return $mol_attach_item;
        }($.$mol_attach_item));
        $mol.$mol_attach_item = $mol_attach_item;
        var $mol_attach_add = (function (_super) {
            __extends($mol_attach_add, _super);
            function $mol_attach_add() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach_add.prototype.file_new = function (next) {
                return next;
            };
            $mol_attach_add.prototype.event_capture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.file_new(url);
                }, function (error) {
                    _this.file_new(error);
                }, {
                    quality: 50
                });
            };
            $mol_attach_add.prototype.event_picked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.file_new(URL.createObjectURL(file));
                }
            };
            return $mol_attach_add;
        }($.$mol_attach_add));
        $mol.$mol_attach_add = $mol_attach_add;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//attach.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_section = (function (_super) {
        __extends($mol_section, _super);
        function $mol_section() {
            return _super.apply(this, arguments) || this;
        }
        $mol_section.prototype.head = function () {
            return null;
        };
        $mol_section.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.head()); };
            });
        };
        $mol_section.prototype.Content = function () {
            return null;
        };
        $mol_section.prototype.rows = function () {
            return [].concat(this.Head(), this.Content());
        };
        return $mol_section;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_section.prototype, "Head", null);
    $.$mol_section = $mol_section;
})($ || ($ = {}));
//section.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_tick.prototype.path = function () {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        };
        return $mol_icon_tick;
    }($.$mol_icon));
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_box = (function (_super) {
        __extends($mol_check_box, _super);
        function $mol_check_box() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box.prototype.Icon = function () {
            return new $.$mol_icon_tick();
        };
        return $mol_check_box;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position = (function (_super) {
        __extends($mol_app_supplies_position, _super);
        function $mol_app_supplies_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position.prototype.minimal_height = function () {
            return 51;
        };
        $mol_app_supplies_position.prototype.product_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_title");
        };
        $mol_app_supplies_position.prototype.product_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Product_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.product_title(); };
                obj.content = function () { return _this.product_name(); };
            });
        };
        $mol_app_supplies_position.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_position.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Main_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Product_item(), _this.Cost_item()); };
            });
        };
        $mol_app_supplies_position.prototype.division_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_title");
        };
        $mol_app_supplies_position.prototype.division_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Division_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.division_title(); };
                obj.content = function () { return _this.division_name(); };
            });
        };
        $mol_app_supplies_position.prototype.price_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "price_label");
        };
        $mol_app_supplies_position.prototype.price = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Price = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_position.prototype.Price_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.price_label(); };
                obj.content = function () { return _this.Price(); };
            });
        };
        $mol_app_supplies_position.prototype.Addon_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Division_item(), _this.Price_item()); };
            });
        };
        $mol_app_supplies_position.prototype.quantity_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "quantity_title");
        };
        $mol_app_supplies_position.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Quantity_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.quantity_title(); };
                obj.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_position.prototype.supply_date_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_date_title");
        };
        $mol_app_supplies_position.prototype.supply_date = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Supply_date_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_date_title(); };
                obj.content = function () { return _this.supply_date(); };
            });
        };
        $mol_app_supplies_position.prototype.store_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_title");
        };
        $mol_app_supplies_position.prototype.store_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Store_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.store_title(); };
                obj.content = function () { return _this.store_name(); };
            });
        };
        $mol_app_supplies_position.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Quantity_item(), _this.Supply_date_item(), _this.Store_item()); };
            });
        };
        $mol_app_supplies_position.prototype.Row = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Main_group(), _this.Addon_group(), _this.Supply_group()); };
            });
        };
        $mol_app_supplies_position.prototype.Content = function () {
            return this.Row();
        };
        return $mol_app_supplies_position;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Product_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Main_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Division_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Addon_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Quantity_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_date_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Store_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Row", null);
    $.$mol_app_supplies_position = $mol_app_supplies_position;
})($ || ($ = {}));
//position.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_position = (function (_super) {
            __extends($mol_app_supplies_position, _super);
            function $mol_app_supplies_position() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_position.prototype.position = function () {
                return null;
            };
            $mol_app_supplies_position.prototype.product_name = function () {
                return this.position().name();
            };
            $mol_app_supplies_position.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_position.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_position.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_position.prototype.supply_date = function () {
                return this.position().supply_moment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_position.prototype.division_name = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_position.prototype.store_name = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_position;
        }($.$mol_app_supplies_position));
        $mol.$mol_app_supplies_position = $mol_app_supplies_position;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//position.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_detail = (function (_super) {
        __extends($mol_app_supplies_detail, _super);
        function $mol_app_supplies_detail() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detail.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail.prototype.Back_icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_app_supplies_detail.prototype.backArg = function () {
            return ({
                "side": function () { return ""; },
                "supply": function () { return null; },
            });
        };
        $mol_app_supplies_detail.prototype.Back = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Back_icon()); };
                obj.arg = function () { return _this.backArg(); };
            });
        };
        $mol_app_supplies_detail.prototype.head = function () {
            return [].concat(this.Back(), this.Title());
        };
        $mol_app_supplies_detail.prototype.org_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "org_title");
        };
        $mol_app_supplies_detail.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_detail.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Provider = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.customer_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "customer_label");
        };
        $mol_app_supplies_detail.prototype.consumer_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Consumer = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.customer_label(); };
                obj.content = function () { return _this.consumer_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.supply_group_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_title");
        };
        $mol_app_supplies_detail.prototype.supply_group_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_group_title(); };
                obj.content = function () { return _this.supply_group_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.ballance_unit_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_title");
        };
        $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Ballance_unit_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.ballance_unit_title(); };
                obj.content = function () { return _this.ballance_unit_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.org_items = function () {
            return [].concat(this.Provider(), this.Consumer(), this.Supply_group(), this.Ballance_unit_item());
        };
        $mol_app_supplies_detail.prototype.Org_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.org_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Org = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.org_title(); };
                obj.Content = function () { return _this.Org_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cons_title");
        };
        $mol_app_supplies_detail.prototype.contract_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "contract_title");
        };
        $mol_app_supplies_detail.prototype.contract_id = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Contract = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.contract_title(); };
                obj.content = function () { return _this.contract_id(); };
            });
        };
        $mol_app_supplies_detail.prototype.pay_method_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_title");
        };
        $mol_app_supplies_detail.prototype.pay_method_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Pay_method = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.pay_method_title(); };
                obj.content = function () { return _this.pay_method_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.manager_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_title");
        };
        $mol_app_supplies_detail.prototype.manager_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Manager = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.manager_title(); };
                obj.content = function () { return _this.manager_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.debitod_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitod_title");
        };
        $mol_app_supplies_detail.prototype.debitor_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Debitor = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.debitod_title(); };
                obj.content = function () { return _this.debitor_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_items = function () {
            return [].concat(this.Contract(), this.Pay_method(), this.Manager(), this.Debitor());
        };
        $mol_app_supplies_detail.prototype.Cons_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.cons_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cons = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.cons_title(); };
                obj.Content = function () { return _this.Cons_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_deck = function () {
            var _this = this;
            return new $.$mol_deck().setup(function (obj) {
                obj.items = function () { return [].concat(_this.Org(), _this.Cons()); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.Content = function () { return _this.Descr_deck(); };
            });
        };
        $mol_app_supplies_detail.prototype.attach_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "attach_title");
        };
        $mol_app_supplies_detail.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.attach_new = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_detail.prototype.Attach = function () {
            var _this = this;
            return new $.$mol_attach().setup(function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attach_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_app_supplies_detail.prototype.Attach_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.attach_title(); };
                obj.Content = function () { return _this.Attach(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "positions_title");
        };
        $mol_app_supplies_detail.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_detail.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detail.prototype.Cost_value = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost_value(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_head = function () {
            return [].concat(this.positions_title(), this.Cost());
        };
        $mol_app_supplies_detail.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.Positions = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.Positions_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.positions_head(); };
                obj.Content = function () { return _this.Positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.content = function () {
            return [].concat(this.Descr_card(), this.Attach_section(), this.Positions_section());
        };
        $mol_app_supplies_detail.prototype.Content = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detail.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.Content()); };
            });
        };
        $mol_app_supplies_detail.prototype.body = function () {
            return [].concat(this.List());
        };
        $mol_app_supplies_detail.prototype.approved = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail.prototype.approved_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "approved_title");
        };
        $mol_app_supplies_detail.prototype.Approve = function () {
            var _this = this;
            return new $.$mol_check_box().setup(function (obj) {
                obj.checked = function (val) { return _this.approved(val); };
                obj.label = function () { return [].concat(_this.approved_title()); };
            });
        };
        $mol_app_supplies_detail.prototype.tools = function () {
            return [].concat(this.Approve());
        };
        $mol_app_supplies_detail.prototype.Tools = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.tools(); };
            });
        };
        $mol_app_supplies_detail.prototype.foot = function () {
            return [].concat(this.Tools());
        };
        return $mol_app_supplies_detail;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Back_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Back", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Provider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Consumer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Ballance_unit_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Contract", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Pay_method", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Manager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Debitor", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_deck", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_card", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost_value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "List", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "approved", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Approve", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Tools", null);
    $.$mol_app_supplies_detail = $mol_app_supplies_detail;
})($ || ($ = {}));
//detail.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_detail = (function (_super) {
            __extends($mol_app_supplies_detail, _super);
            function $mol_app_supplies_detail() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_detail.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detail.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detail.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detail.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detail.prototype.consumer_name = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
                return this.supply().ballance_unit().name();
            };
            $mol_app_supplies_detail.prototype.supply_group_name = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detail.prototype.manager_name = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detail.prototype.pay_method_name = function () {
                return this.supply().pay_method().name();
            };
            $mol_app_supplies_detail.prototype.debitor_name = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detail.prototype.contract_id = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detail.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detail.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detail.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.Position(index); });
            };
            $mol_app_supplies_detail.prototype.Position = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_position().setup(function (obj) {
                    obj.position = function () { return _this.supply().positions()[index]; };
                });
            };
            $mol_app_supplies_detail.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.Attachment(index); });
            };
            $mol_app_supplies_detail.prototype.Attachment = function (index) {
                var _this = this;
                return new $mol.$mol_attach_item().setup(function (obj) {
                    obj.url_thumb = function () { return _this.supply().attachments()[index].url_thumb(); };
                    obj.url_load = function () { return _this.supply().attachments()[index].url_load(); };
                });
            };
            $mol_app_supplies_detail.prototype.attach_new = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat(new $.$mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.url_thumb = obj.url_load = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detail.prototype.Body = function () {
                var _this = this;
                return new $mol.$mol_scroll().setup(function (obj) {
                    obj.sub = function () { return _this.body(); };
                    obj.scroll_top = function (next) { return _this.scroll_top(next); };
                });
            };
            $mol_app_supplies_detail.prototype.scroll_top = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this + ".scroll_top(" + supplyId + ")", next);
            };
            return $mol_app_supplies_detail;
        }($.$mol_app_supplies_detail));
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Position", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Attachment", null);
        $mol.$mol_app_supplies_detail = $mol_app_supplies_detail;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//detail.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_root = (function (_super) {
        __extends($mol_app_supplies_root, _super);
        function $mol_app_supplies_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_root.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_root.prototype.enter = function () {
            var _this = this;
            return new $.$mol_app_supplies_enter().setup(function (obj) {
                obj.entered = function (val) { return _this.entered(val); };
            });
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.search_query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_root.prototype.lister = function () {
            var _this = this;
            return new $.$mol_app_supplies_list().setup(function (obj) {
                obj.supplies = function () { return _this.supplies(); };
                obj.search_query = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.detailer = function () {
            var _this = this;
            return new $.$mol_app_supplies_detail().setup(function (obj) {
                obj.supply = function () { return _this.supply(); };
            });
        };
        return $mol_app_supplies_root;
    }($.$mol_stack));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "lister", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "detailer", null);
    $.$mol_app_supplies_root = $mol_app_supplies_root;
})($ || ($ = {}));
//root.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_root = (function (_super) {
            __extends($mol_app_supplies_root, _super);
            function $mol_app_supplies_root() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this + ".entered()", next) || false;
            };
            $mol_app_supplies_root.prototype.sub = function () {
                return [
                    this.entered()
                        ? this.Main()
                        : null,
                    this.Addon()
                ];
            };
            $mol_app_supplies_root.prototype.main = function () {
                return this.supply()
                    ? [this.detailer()]
                    : [];
            };
            $mol_app_supplies_root.prototype.addon = function () {
                return this.entered()
                    ? [this.lister()]
                    : [this.enter()];
            };
            $mol_app_supplies_root.prototype.title = function () {
                return (this.main()[0] || this.addon()[0]).title();
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supply_id = function (next) {
                return $.$mol_state_arg.value(this.state_key('supply'), next);
            };
            $mol_app_supplies_root.prototype.search_query = function (next) {
                if (!next)
                    return '';
                if (next.length < 7)
                    return next;
                this.supply_id(next);
                return '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supply_id();
                return id ? this.domain().supply(id) : null;
            };
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "domain", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "search_query", null);
        $mol.$mol_app_supplies_root = $mol_app_supplies_root;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//root.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_supplies_demo = (function (_super) {
        __extends($mol_app_supplies_demo, _super);
        function $mol_app_supplies_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_supplies_demo;
    }($.$mol_app_supplies_root));
    $.$mol_app_supplies_demo = $mol_app_supplies_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position_demo = (function (_super) {
        __extends($mol_app_supplies_position_demo, _super);
        function $mol_app_supplies_position_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position_demo.prototype.product_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_name");
        };
        $mol_app_supplies_position_demo.prototype.price = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1; };
            });
        };
        $mol_app_supplies_position_demo.prototype.quantity = function () {
            return "100";
        };
        $mol_app_supplies_position_demo.prototype.cost = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 100; };
            });
        };
        $mol_app_supplies_position_demo.prototype.supply_date = function () {
            return "2016-01-13";
        };
        $mol_app_supplies_position_demo.prototype.division_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_name");
        };
        $mol_app_supplies_position_demo.prototype.store_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_name");
        };
        return $mol_app_supplies_position_demo;
    }($.$mol_app_supplies_position));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position_demo.prototype, "price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position_demo.prototype, "cost", null);
    $.$mol_app_supplies_position_demo = $mol_app_supplies_position_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_detail_demo = (function (_super) {
        __extends($mol_app_supplies_detail_demo, _super);
        function $mol_app_supplies_detail_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail_demo.prototype.approved = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail_demo.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_detail_demo.prototype.cost = function () {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 1234567; };
            });
        };
        $mol_app_supplies_detail_demo.prototype.consumer_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "consumer_name");
        };
        $mol_app_supplies_detail_demo.prototype.supply_group_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_name");
        };
        $mol_app_supplies_detail_demo.prototype.ballance_unit_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_name");
        };
        $mol_app_supplies_detail_demo.prototype.contract_id = function () {
            return "123675234";
        };
        $mol_app_supplies_detail_demo.prototype.pay_method_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_name");
        };
        $mol_app_supplies_detail_demo.prototype.manager_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_name");
        };
        $mol_app_supplies_detail_demo.prototype.debitor_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitor_name");
        };
        $mol_app_supplies_detail_demo.prototype.Pos1 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos2 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos3 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos4 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos5 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.positions = function () {
            return [].concat(this.Pos1(), this.Pos2(), this.Pos3(), this.Pos4(), this.Pos5());
        };
        $mol_app_supplies_detail_demo.prototype.attachments = function () {
            return [];
        };
        return $mol_app_supplies_detail_demo;
    }($.$mol_app_supplies_detail));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "approved", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos3", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos4", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos5", null);
    $.$mol_app_supplies_detail_demo = $mol_app_supplies_detail_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=web.js.map