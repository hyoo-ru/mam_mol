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
        $mol_object.prototype.objectClassNames = function () {
            if (this.hasOwnProperty('objectClassNames()'))
                return this['objectClassNames()'];
            var names = [];
            var current = this;
            while (current) {
                var name = current.constructor.toString();
                if (!name)
                    continue;
                names.push(name);
                current = Object.getPrototypeOf(current);
            }
            return this['objectClassNames()'] = names;
        };
        $mol_object.prototype.objectOwner = function (next) {
            if (this['objectOwner()'])
                return this['objectOwner()'];
            return this['objectOwner()'] = next;
        };
        $mol_object.prototype.objectField = function (next) {
            if (this['objectField()'])
                return this['objectField()'] || '';
            return this['objectField()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.objectOwner();
            if (owner)
                path = owner.toString();
            var field = this.objectField();
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
                    if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
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
            this.disobeyAll();
            this.checkSlaves();
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
                    next['objectField'](this.field);
                    next['objectOwner'](host);
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
                this.obsoleteSlaves();
            }
            this.status = $mol_atom_status.actual;
            this._next = void null;
            return next;
        };
        $mol_atom.prototype.obsoleteSlaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.checkSlaves = function () {
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
                this.checkSlaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.checkSlaves();
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
        $mol_atom.prototype.disobeyAll = function () {
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
    $.$mol_viewer_context = {};
    $.$mol_viewer_context.$mol_viewer_heightLimit = function () { return $.$mol_window.size().height; };
    var $mol_viewer = (function (_super) {
        __extends($mol_viewer, _super);
        function $mol_viewer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_viewer.root = function (id) {
            return new this;
        };
        $mol_viewer.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_viewer.statePrefix = function () {
            return '';
        };
        $mol_viewer.prototype.statePrefix = function () {
            var owner = this.objectOwner();
            return owner ? owner.statePrefix() : '';
        };
        $mol_viewer.prototype.stateKey = function (postfix) {
            return this.statePrefix() + postfix;
        };
        $mol_viewer.prototype.context = function (next) {
            return next || $.$mol_viewer_context;
        };
        $mol_viewer.prototype.contextSub = function () {
            return this.context();
        };
        $mol_viewer.prototype.tagName = function () { return 'div'; };
        $mol_viewer.prototype.nameSpace = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_viewer.prototype.childs = function () {
            return null;
        };
        $mol_viewer.prototype.childsVisible = function () {
            var childs = this.childs();
            if (!childs)
                return childs;
            var context = this.contextSub();
            childs.forEach(function (child) {
                if (child instanceof $mol_viewer) {
                    child.context(context);
                }
            });
            return childs;
        };
        $mol_viewer.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_viewer.prototype.DOMNode = function (next) {
            var _this = this;
            var path = this.toString();
            var next2 = next;
            if (!next2) {
                next2 = this['DOMNode()'];
                if (next2)
                    return next2;
                next2 = document.getElementById(path);
                if (next2) {
                    if (next2['$mol_viewer']) {
                        return this['DOMNode()'] = next2;
                    }
                }
                else {
                    next2 = document.createElementNS(this.nameSpace(), this.tagName());
                }
            }
            next2.id = path;
            void (next2['$mol_viewer'] = this);
            this['DOMNode()'] = next2;
            var ownerProto = this.objectOwner() && Object.getPrototypeOf(this.objectOwner());
            if (ownerProto && ownerProto['objectClassNames']) {
                var suffix = '_' + this.objectField().replace(/\(.*/, '');
                for (var _i = 0, _a = ownerProto['objectClassNames'](); _i < _a.length; _i++) {
                    var className = _a[_i];
                    var attrName = className.replace(/\$/g, '') + suffix;
                    next2.setAttribute(attrName, '');
                    if (className === '$mol_viewer')
                        break;
                }
            }
            var proto = Object.getPrototypeOf(this);
            for (var _b = 0, _c = proto['objectClassNames'](); _b < _c.length; _b++) {
                var className = _c[_b];
                next2.setAttribute(className.replace(/\$/g, ''), '');
                if (className === '$mol_viewer')
                    break;
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
        $mol_viewer.renderChilds = function (node, childs) {
            if (childs == null)
                return;
            var nextNode = node.firstChild;
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var view = childs_1[_i];
                if (view == null) {
                }
                else if (typeof view === 'object') {
                    var existsNode = ((view instanceof $mol_viewer) ? view.DOMNode() : view.valueOf());
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
            for (var _a = 0, childs_2 = childs; _a < childs_2.length; _a++) {
                var view = childs_2[_a];
                if (view instanceof $mol_viewer)
                    view.DOMTree();
            }
        };
        $mol_viewer.renderAttrs = function (node, attrs) {
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
        $mol_viewer.renderFields = function (node, fields) {
            var _loop_2 = function (path) {
                var names = path.split('.');
                var obj = node;
                for (var i = 0; i < names.length - 1; ++i) {
                    if (names[i])
                        obj = obj[names[i]];
                }
                var field = names[names.length - 1];
                var val = fields[path]();
                if (obj[field] !== val) {
                    obj[field] = val;
                    if (obj[field] !== val) {
                        new $.$mol_defer(function () { return fields[path](obj[field]); });
                    }
                }
            };
            for (var path in fields) {
                _loop_2(path);
            }
        };
        $mol_viewer.prototype.DOMTree = function () {
            var node = this.DOMNode();
            try {
                $mol_viewer.renderChilds(node, this.childsVisible());
                $mol_viewer.renderAttrs(node, this.attr());
                $mol_viewer.renderFields(node, this.field());
                return node;
            }
            catch (error) {
                if (!error['$mol_viewer_catched']) {
                    node.setAttribute('mol_viewer_error', error.name);
                    error['$mol_viewer_catched'] = true;
                }
                throw error;
            }
        };
        $mol_viewer.prototype.attr = function () {
            return {
                'mol_viewer_error': function () { return false; }
            };
        };
        $mol_viewer.prototype.field = function () {
            return {};
        };
        $mol_viewer.prototype.event = function () { return {}; };
        $mol_viewer.prototype.localizationContexts = function () {
            return Object.getPrototypeOf(this).objectClassNames();
        };
        return $mol_viewer;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_viewer.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_viewer.prototype, "DOMTree", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_viewer, "root", null);
    $.$mol_viewer = $mol_viewer;
})($ || ($ = {}));
//viewer.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_viewer_root]');
        var _loop_1 = function (i) {
            var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
            view.DOMNode(nodes.item(i));
            var win = new $.$mol_atom("$mol_viewer.root(" + i + ")", function () {
                view.DOMTree();
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
//viewer.web.js.map
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
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroller.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollTop = function (next) {
            return (next !== void 0) ? next : 0;
        };
        $mol_scroller.prototype.scrollLeft = function (next) {
            return (next !== void 0) ? next : 0;
        };
        $mol_scroller.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function (next) { return _this.scrollTop(next); },
                "scrollLeft": function (next) { return _this.scrollLeft(next); },
            });
        };
        $mol_scroller.prototype.eventScroll = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_scroller.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (next) { return _this.eventScroll(next); },
                "overflow": function (next) { return _this.eventScroll(next); },
                "underflow": function (next) { return _this.eventScroll(next); },
            });
        };
        return $mol_scroller;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "scrollTop", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "scrollLeft", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "eventScroll", null);
    $.$mol_scroller = $mol_scroller;
})($ || ($ = {}));
//scroller.view.tree.js.map
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
    $.$mol_viewer_context.$mol_scroller_scrollTop = function () { return 0; };
    $.$mol_viewer_context.$mol_scroller_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                return _super.apply(this, arguments) || this;
            }
            $mol_scroller.prototype.scrollTop = function (next) {
                return $.$mol_state_session.value(this + ".scrollTop()", next) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function (next) {
                return $.$mol_state_session.value(this + ".scrollLeft()", next) || 0;
            };
            $mol_scroller.prototype.scrollBottom = function (next) {
                return next || 0;
            };
            $mol_scroller.prototype.scrollRight = function (next) {
                return next || 0;
            };
            $mol_scroller.prototype.eventScroll = function (next) {
                var _this = this;
                this.moving(true);
                new $.$mol_defer(function () {
                    var el = _this.DOMNode();
                    _this.scrollTop(Math.max(0, el.scrollTop));
                    _this.scrollLeft(Math.max(0, el.scrollLeft));
                    _this.scrollBottom(Math.max(0, el.scrollHeight - el.scrollTop - el.offsetHeight));
                    _this.scrollRight(Math.max(0, el.scrollWidth - el.scrollLeft - el.offsetWidth));
                });
            };
            $mol_scroller.prototype.moving = function (next) {
                var _this = this;
                if (next) {
                    setTimeout(function () {
                        _this.moving(false);
                    });
                }
                return next || false;
            };
            $mol_scroller.prototype.contextSub = function () {
                var _this = this;
                var subContext = Object.create(this.context());
                subContext.$mol_viewer_heightLimit = function () { return _this.context().$mol_viewer_heightLimit() + _this.scrollTop(); };
                subContext.$mol_scroller_scrollTop = function () { return _this.scrollTop(); };
                subContext.$mol_scroller_moving = function () { return _this.moving(); };
                return subContext;
            };
            $mol_scroller.prototype.shadowStyle = function () {
                var shadows = [];
                if (this.scrollTop() > 0)
                    shadows.push('inset 0 6px 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollLeft() > 0)
                    shadows.push('inset 6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollBottom() > 0)
                    shadows.push('inset 0 -6px 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollRight() > 0)
                    shadows.push('inset -6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )');
                return shadows.join(' , ');
            };
            return $mol_scroller;
        }($.$mol_scroller));
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollBottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollRight", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "contextSub", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "shadowStyle", null);
        $mol.$mol_scroller = $mol_scroller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroller.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_lister = (function (_super) {
        __extends($mol_lister, _super);
        function $mol_lister() {
            return _super.apply(this, arguments) || this;
        }
        $mol_lister.prototype.minHeightStyle = function () {
            return "";
        };
        $mol_lister.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.minHeight": function () { return _this.minHeightStyle(); },
            });
        };
        $mol_lister.prototype.rows = function () {
            return [];
        };
        $mol_lister.prototype.childs = function () {
            return this.rows();
        };
        return $mol_lister;
    }($.$mol_viewer));
    $.$mol_lister = $mol_lister;
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
        var $mol_lister = (function (_super) {
            __extends($mol_lister, _super);
            function $mol_lister() {
                return _super.apply(this, arguments) || this;
            }
            $mol_lister.prototype.rowOffsets = function () {
                var childs = this.childs();
                if (!childs)
                    return null;
                var heightLimit = this.contextSub().$mol_viewer_heightLimit();
                var offset = 0;
                var next = [];
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_viewer) {
                        offset += child.heightMinimal();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_lister.prototype.rowContext = function (index) {
                var _this = this;
                var context = this.contextSub();
                var next = Object.create(context);
                next.$mol_viewer_heightLimit = function () { return context.$mol_viewer_heightLimit() - _this.rowOffsets()[index]; };
                return next;
            };
            $mol_lister.prototype.childsVisible = function () {
                var childs = this.childs();
                if (!childs)
                    return childs;
                var limit = this.rowOffsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = childs[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_viewer) {
                        child.context(this.rowContext(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_lister.prototype.heightMinimal = function () {
                var height = 0;
                var childs = this.childs();
                if (childs)
                    childs.forEach(function (child) {
                        if (child instanceof $.$mol_viewer) {
                            height += child.heightMinimal();
                        }
                    });
                return height;
            };
            $mol_lister.prototype.minHeightStyle = function () {
                return this.heightMinimal() + 'px';
            };
            return $mol_lister;
        }($.$mol_lister));
        __decorate([
            $.$mol_mem()
        ], $mol_lister.prototype, "rowOffsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_lister.prototype, "rowContext", null);
        __decorate([
            $.$mol_mem()
        ], $mol_lister.prototype, "childsVisible", null);
        $mol.$mol_lister = $mol_lister;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//lister.view.js.map
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
    var $mol_perf_uibench = (function (_super) {
        __extends($mol_perf_uibench, _super);
        function $mol_perf_uibench() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench.prototype.page = function () {
            return null;
        };
        $mol_perf_uibench.prototype.childs = function () {
            return [].concat(this.page());
        };
        $mol_perf_uibench.prototype.stateTable = function () {
            return null;
        };
        $mol_perf_uibench.prototype.table = function (next) {
            var _this = this;
            return new $.$mol_perf_uibench_table().setup(function (obj) {
                obj.state = function () { return _this.stateTable(); };
            });
        };
        $mol_perf_uibench.prototype.stateAnim = function () {
            return null;
        };
        $mol_perf_uibench.prototype.anim = function (next) {
            var _this = this;
            return new $.$mol_perf_uibench_anim().setup(function (obj) {
                obj.state = function () { return _this.stateAnim(); };
            });
        };
        $mol_perf_uibench.prototype.stateTree = function () {
            return null;
        };
        $mol_perf_uibench.prototype.tree = function (next) {
            var _this = this;
            return new $.$mol_perf_uibench_tree().setup(function (obj) {
                obj.state = function () { return _this.stateTree(); };
            });
        };
        return $mol_perf_uibench;
    }($.$mol_scroller));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "anim", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "tree", null);
    $.$mol_perf_uibench = $mol_perf_uibench;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table = (function (_super) {
        __extends($mol_perf_uibench_table, _super);
        function $mol_perf_uibench_table() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table.prototype.tagName = function () {
            return "table";
        };
        $mol_perf_uibench_table.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Table"; },
            });
        };
        $mol_perf_uibench_table.prototype.rows = function () {
            return [];
        };
        $mol_perf_uibench_table.prototype.childs = function () {
            return this.rows();
        };
        return $mol_perf_uibench_table;
    }($.$mol_lister));
    $.$mol_perf_uibench_table = $mol_perf_uibench_table;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table_row = (function (_super) {
        __extends($mol_perf_uibench_table_row, _super);
        function $mol_perf_uibench_table_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table_row.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table_row.prototype.heightMinimal = function () {
            return 20;
        };
        $mol_perf_uibench_table_row.prototype.tagName = function () {
            return "tr";
        };
        $mol_perf_uibench_table_row.prototype.className = function () {
            return "TableRow";
        };
        $mol_perf_uibench_table_row.prototype.id = function () {
            return 0;
        };
        $mol_perf_uibench_table_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return _this.className(); },
                "data-id": function () { return _this.id(); },
            });
        };
        $mol_perf_uibench_table_row.prototype.headerText = function () {
            return "";
        };
        $mol_perf_uibench_table_row.prototype.header = function (next) {
            var _this = this;
            return new $.$mol_perf_uibench_table_cell().setup(function (obj) {
                obj.text = function () { return _this.headerText(); };
            });
        };
        $mol_perf_uibench_table_row.prototype.cells = function () {
            return [];
        };
        $mol_perf_uibench_table_row.prototype.childs = function () {
            return [].concat(this.header(), this.cells());
        };
        return $mol_perf_uibench_table_row;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_table_row.prototype, "header", null);
    $.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table_cell = (function (_super) {
        __extends($mol_perf_uibench_table_cell, _super);
        function $mol_perf_uibench_table_cell() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table_cell.prototype.tagName = function () {
            return "td";
        };
        $mol_perf_uibench_table_cell.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_table_cell.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TableCell"; },
                "data-text": function () { return _this.text(); },
            });
        };
        $mol_perf_uibench_table_cell.prototype.eventClick = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_perf_uibench_table_cell.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next) { return _this.eventClick(next); },
            });
        };
        $mol_perf_uibench_table_cell.prototype.childs = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_table_cell;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_table_cell.prototype, "eventClick", null);
    $.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_anim = (function (_super) {
        __extends($mol_perf_uibench_anim, _super);
        function $mol_perf_uibench_anim() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_anim.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_anim.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Anim"; },
            });
        };
        $mol_perf_uibench_anim.prototype.items = function () {
            return [];
        };
        $mol_perf_uibench_anim.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim;
    }($.$mol_viewer));
    $.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_anim_box = (function (_super) {
        __extends($mol_perf_uibench_anim_box, _super);
        function $mol_perf_uibench_anim_box() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_anim_box.prototype.id = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "AnimBox"; },
                "data-id": function () { return _this.id(); },
            });
        };
        $mol_perf_uibench_anim_box.prototype.styleRadius = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.styleColor = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.borderRadius": function () { return _this.styleRadius(); },
                "style.background": function () { return _this.styleColor(); },
            });
        };
        $mol_perf_uibench_anim_box.prototype.items = function () {
            return [];
        };
        $mol_perf_uibench_anim_box.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim_box;
    }($.$mol_viewer));
    $.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree = (function (_super) {
        __extends($mol_perf_uibench_tree, _super);
        function $mol_perf_uibench_tree() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Tree"; },
            });
        };
        $mol_perf_uibench_tree.prototype.stateRoot = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.root = function (next) {
            var _this = this;
            return new $.$mol_perf_uibench_tree_branch().setup(function (obj) {
                obj.state = function () { return _this.stateRoot(); };
            });
        };
        $mol_perf_uibench_tree.prototype.childs = function () {
            return [].concat(this.root());
        };
        return $mol_perf_uibench_tree;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_tree.prototype, "root", null);
    $.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree_branch = (function (_super) {
        __extends($mol_perf_uibench_tree_branch, _super);
        function $mol_perf_uibench_tree_branch() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree_branch.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree_branch.prototype.tagName = function () {
            return "ul";
        };
        $mol_perf_uibench_tree_branch.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TreeNode"; },
            });
        };
        return $mol_perf_uibench_tree_branch;
    }($.$mol_lister));
    $.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree_leaf = (function (_super) {
        __extends($mol_perf_uibench_tree_leaf, _super);
        function $mol_perf_uibench_tree_leaf() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree_leaf.prototype.heightMinimal = function () {
            return 25;
        };
        $mol_perf_uibench_tree_leaf.prototype.tagName = function () {
            return "li";
        };
        $mol_perf_uibench_tree_leaf.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TreeLeaf"; },
            });
        };
        $mol_perf_uibench_tree_leaf.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_tree_leaf.prototype.childs = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_tree_leaf;
    }($.$mol_viewer));
    $.$mol_perf_uibench_tree_leaf = $mol_perf_uibench_tree_leaf;
})($ || ($ = {}));
//uibench.view.tree.js.map
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
        var $mol_perf_uibench = (function (_super) {
            __extends($mol_perf_uibench, _super);
            function $mol_perf_uibench() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench.prototype.state = function (next) {
                return next || {};
            };
            $mol_perf_uibench.prototype.stateTable = function () {
                return this.state().table;
            };
            $mol_perf_uibench.prototype.stateAnim = function () {
                return this.state().anim;
            };
            $mol_perf_uibench.prototype.stateTree = function () {
                return this.state().tree;
            };
            $mol_perf_uibench.prototype.page = function () {
                switch (this.state().location) {
                    case 'table': return this.table();
                    case 'anim': return this.anim();
                    case 'tree': return this.tree();
                }
                return null;
            };
            return $mol_perf_uibench;
        }($.$mol_perf_uibench));
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "state", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateTable", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateAnim", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateTree", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "page", null);
        $mol.$mol_perf_uibench = $mol_perf_uibench;
        var $mol_perf_uibench_table = (function (_super) {
            __extends($mol_perf_uibench_table, _super);
            function $mol_perf_uibench_table() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table.prototype.state = function () {
                return { items: [] };
            };
            $mol_perf_uibench_table.prototype.rows = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.row(i); });
            };
            $mol_perf_uibench_table.prototype.row = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_row().setup(function (obj) {
                    obj.state = function () { return _this.state().items[id] || []; };
                });
            };
            return $mol_perf_uibench_table;
        }($.$mol_perf_uibench_table));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_table.prototype, "row", null);
        $mol.$mol_perf_uibench_table = $mol_perf_uibench_table;
        var $mol_perf_uibench_table_row = (function (_super) {
            __extends($mol_perf_uibench_table_row, _super);
            function $mol_perf_uibench_table_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table_row.prototype.state = function () {
                return { props: [], active: false, id: 0 };
            };
            $mol_perf_uibench_table_row.prototype.headerText = function () {
                return '#' + this.id();
            };
            $mol_perf_uibench_table_row.prototype.id = function () {
                return this.state().id;
            };
            $mol_perf_uibench_table_row.prototype.className = function () {
                return _super.prototype.className.call(this) + (this.state().active ? ' active' : '');
            };
            $mol_perf_uibench_table_row.prototype.cells = function () {
                var _this = this;
                return (this.state().props || []).map(function (v, j) { return _this.cell(j); });
            };
            $mol_perf_uibench_table_row.prototype.cell = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_cell().setup(function (obj) {
                    obj.text = function () { return _this.state().props[id]; };
                });
            };
            return $mol_perf_uibench_table_row;
        }($.$mol_perf_uibench_table_row));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_table_row.prototype, "cell", null);
        $mol.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
        var $mol_perf_uibench_table_cell = (function (_super) {
            __extends($mol_perf_uibench_table_cell, _super);
            function $mol_perf_uibench_table_cell() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table_cell.prototype.eventClick = function (next) {
                console.log('Click', this.text());
                next.preventDefault();
                next.stopPropagation();
            };
            return $mol_perf_uibench_table_cell;
        }($.$mol_perf_uibench_table_cell));
        $mol.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
        var $mol_perf_uibench_anim = (function (_super) {
            __extends($mol_perf_uibench_anim, _super);
            function $mol_perf_uibench_anim() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_anim.prototype.state = function () {
                return { items: [] };
            };
            $mol_perf_uibench_anim.prototype.items = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.item(i); });
            };
            $mol_perf_uibench_anim.prototype.item = function (i) {
                var _this = this;
                return new $mol_perf_uibench_anim_box().setup(function (obj) {
                    obj.state = function () { return _this.state().items[i] || { id: '', time: 0 }; };
                });
            };
            return $mol_perf_uibench_anim;
        }($.$mol_perf_uibench_anim));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_anim.prototype, "item", null);
        $mol.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
        var $mol_perf_uibench_anim_box = (function (_super) {
            __extends($mol_perf_uibench_anim_box, _super);
            function $mol_perf_uibench_anim_box() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_anim_box.prototype.state = function () {
                return { id: '', time: 0 };
            };
            $mol_perf_uibench_anim_box.prototype.id = function () {
                return this.state().id;
            };
            $mol_perf_uibench_anim_box.prototype.time = function () {
                return this.state().time;
            };
            $mol_perf_uibench_anim_box.prototype.styleRadius = function () {
                return this.time() % 10 + "px";
            };
            $mol_perf_uibench_anim_box.prototype.styleColor = function () {
                return "rgba(0,0,0," + (0.5 + ((this.time() % 10) / 10)) + ")";
            };
            return $mol_perf_uibench_anim_box;
        }($.$mol_perf_uibench_anim_box));
        $mol.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
        var $mol_perf_uibench_tree = (function (_super) {
            __extends($mol_perf_uibench_tree, _super);
            function $mol_perf_uibench_tree() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_tree.prototype.state = function () {
                return { root: null };
            };
            $mol_perf_uibench_tree.prototype.stateRoot = function () {
                return this.state().root || { children: [] };
            };
            return $mol_perf_uibench_tree;
        }($.$mol_perf_uibench_tree));
        $mol.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
        var $mol_perf_uibench_tree_branch = (function (_super) {
            __extends($mol_perf_uibench_tree_branch, _super);
            function $mol_perf_uibench_tree_branch() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_tree_branch.prototype.state = function () {
                return { children: [] };
            };
            $mol_perf_uibench_tree_branch.prototype.childs = function () {
                var _this = this;
                return (this.state().children || []).map(function (child, i) {
                    return child.container ? _this.branch(i) : _this.leaf(i);
                });
            };
            $mol_perf_uibench_tree_branch.prototype.branch = function (i) {
                var _this = this;
                return new $mol_perf_uibench_tree_branch().setup(function (obj) {
                    obj.state = function () { return _this.state().children[i] || { children: [] }; };
                });
            };
            $mol_perf_uibench_tree_branch.prototype.leaf = function (i) {
                var _this = this;
                return new $.$mol_perf_uibench_tree_leaf().setup(function (obj) {
                    obj.text = function () { return ((_this.state().children || [])[i] || {}).id; };
                });
            };
            return $mol_perf_uibench_tree_branch;
        }($.$mol_perf_uibench_tree_branch));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_tree_branch.prototype, "branch", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_tree_branch.prototype, "leaf", null);
        $mol.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//uibench.view.js.map
//# sourceMappingURL=web.js.map