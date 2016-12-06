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
    var $mol_log;
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
        $mol_object.objectPath = function () {
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
            while (typeof current === 'object') {
                if (!current.constructor.objectPath)
                    break;
                var name = current.constructor.objectPath();
                if (!name)
                    continue;
                names.push(name);
                if (current === null)
                    break;
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
        $mol_object.prototype.objectPath = function (next) {
            var path = '';
            var owner = this.objectOwner();
            if (owner)
                path = owner.objectPath();
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
            $.$mol_log(this.objectPath(), values);
        };
        $mol_object.toString = function () {
            return this.objectPath();
        };
        $mol_object.prototype.toString = function () {
            return this.objectPath();
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
            _super.call(this);
            this.run = run;
            $mol_defer.add(this);
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
        $mol_defer.all = [];
        $mol_defer.timer = 0;
        $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
            ? function (handler) { return requestAnimationFrame(handler); }
            : function (handler) { return setTimeout(handler, 16); };
        return $mol_defer;
    }($.$mol_object));
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
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom_status = $.$mol_atom_status;
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(handler, host, field) {
            if (field === void 0) { field = 'value()'; }
            _super.call(this);
            this.handler = handler;
            this.host = host;
            this.field = field;
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.autoFresh = true;
            this['value()'] = void 0;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host || this;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
                        value.destroyed(true);
                    }
                }
                if (this.host) {
                    host[this.field] = void 0;
                    host['$mol_atom_state'][this.field] = void 0;
                }
                this['destroyed()'] = true;
                this.log(['.destroyed()', true, 'atom']);
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
        $mol_atom.prototype.objectPath = function () {
            return this.host ? this.host.objectPath() + '.' + this.field : this.field;
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this.objectPath());
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = (this.host || this)[this.field];
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
            var host = this.host || this;
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (!error['$mol_atom_catched']) {
                    if (error instanceof $mol_atom_wait) {
                    }
                    else {
                        if (error instanceof Error) {
                            console.error(error.stack);
                        }
                        else {
                            throw error;
                        }
                    }
                    void (error['$mol_atom_catched'] = true);
                }
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            this._next = next;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host || this;
            var prev = host[this.field];
            if (next === void 0)
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
            this._next = void 0;
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
            return void 0;
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
            if (next === void 0) {
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
        $mol_atom.stack = [null];
        $mol_atom.updating = [];
        $mol_atom.reaping = new $.$mol_set();
        $mol_atom.scheduled = false;
        return $mol_atom;
    }($.$mol_object));
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            _super.call(this, message);
            this.message = message;
            this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            _super.apply(this, arguments);
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(handler) {
        var atom = new $mol_atom(function () {
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
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value.bind(host), host, field);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                return info.value(next, force);
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
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value.bind(host, key), host, field);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                return info.value(next, force);
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
            _super.apply(this, arguments);
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        __decorate([
            $.$mol_mem()
        ], $mol_window, "size", null);
        return $mol_window;
    }($.$mol_object));
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
            _super.apply(this, arguments);
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
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_local, "value", null);
        return $mol_state_local;
    }($.$mol_object));
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
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            _super.call(this);
            this.prefix = prefix;
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
        __decorate([
            $.$mol_mem()
        ], $mol_state_arg, "href", null);
        __decorate([
            $.$mol_mem()
        ], $mol_state_arg, "dict", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_arg, "value", null);
        return $mol_state_arg;
    }($.$mol_object));
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
            _super.apply(this, arguments);
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
            native.open(method, this.uri(), true, creds && creds.login, creds && creds.password);
            native.send(next);
            throw new $.$mol_atom_wait(this.method() + " " + this.uri());
        };
        $mol_http_request.prototype.text = function (next, force) {
            return this.response(next, force);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_http_request.prototype, "response", null);
        return $mol_http_request;
    }($.$mol_object));
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
            _super.apply(this, arguments);
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
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "request", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "text", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_http_resource, "item", null);
        return $mol_http_resource;
    }($.$mol_object));
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            _super.apply(this, arguments);
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, force) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t'), force));
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_http_resource_json, "item", null);
        return $mol_http_resource_json;
    }($mol_http_resource));
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
            _super.apply(this, arguments);
        }
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_state_arg.value('locale') || 'en';
        };
        $mol_locale.texts = function () {
            var uri = "-/web.locale=" + this.lang() + ".json";
            var resource = $.$mol_http_resource_json.item(uri);
            return resource.json();
        };
        $mol_locale.text = function (context, key) {
            return this.texts()[(context + "_" + key)];
        };
        __decorate([
            $.$mol_mem()
        ], $mol_locale, "lang", null);
        return $mol_locale;
    }($.$mol_object));
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
    $.$mol_viewer_context = {};
    $.$mol_viewer_context.$mol_viewer_heightLimit = function () { return $.$mol_window.size().height; };
    var $mol_viewer = (function (_super) {
        __extends($mol_viewer, _super);
        function $mol_viewer() {
            _super.apply(this, arguments);
        }
        $mol_viewer.root = function (id) {
            return new this;
        };
        $mol_viewer.prototype.title = function () {
            return this.Class().objectPath();
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
            var path = this.objectPath();
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
                    next2.setAttribute(attrName.toLowerCase(), '');
                    if (className === '$mol_viewer')
                        break;
                }
            }
            var proto = Object.getPrototypeOf(this);
            for (var _b = 0, _c = proto['objectClassNames'](); _b < _c.length; _b++) {
                var className = _c[_b];
                next2.setAttribute(className.replace(/\$/g, '').toLowerCase(), '');
                if (className === '$mol_viewer')
                    break;
            }
            var events = this.event();
            var _loop_1 = function(name_1) {
                var handle = events[name_1];
                next2.addEventListener(name_1, function (event) {
                    $.$mol_atom_task(function () {
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
            var _loop_2 = function(path) {
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
        $mol_viewer.prototype.DOMTree = function (next) {
            var node = this.DOMNode();
            try {
                $mol_viewer.renderChilds(node, this.childsVisible());
                $mol_viewer.renderAttrs(node, this.attr());
                $mol_viewer.renderFields(node, this.field());
                return node;
            }
            catch (error) {
                node.setAttribute('mol_viewer_error', error.name);
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
        $mol_viewer.prototype.focused = function () {
            return $.$mol_viewer_selection.focused().indexOf(this.DOMNode()) !== -1;
        };
        $mol_viewer.prototype.localizedText = function (postfix) {
            var contexts = Object.getPrototypeOf(this).objectClassNames();
            for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
                var context = contexts_1[_i];
                var text = $.$mol_locale.text(context, postfix);
                if (text != null)
                    return text;
            }
            throw new Error("Locale text not found: [" + contexts.join('|') + "]_" + postfix);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_viewer.prototype, "context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_viewer.prototype, "DOMTree", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_viewer, "root", null);
        return $mol_viewer;
    }($.$mol_object));
    $.$mol_viewer = $mol_viewer;
})($ || ($ = {}));
//viewer.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_viewer_root]');
        var _loop_1 = function(i) {
            var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
            view.DOMNode(nodes.item(i));
            var win = new $.$mol_atom(function () {
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
    var $mol_viewer_selection = (function (_super) {
        __extends($mol_viewer_selection, _super);
        function $mol_viewer_selection() {
            _super.apply(this, arguments);
        }
        $mol_viewer_selection.focused = function (next) {
            return next || [];
        };
        $mol_viewer_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_viewer_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_viewer_selection.focused(parents);
        };
        $mol_viewer_selection.onBlur = function (event) {
            $mol_viewer_selection.focused([]);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_viewer_selection, "focused", null);
        __decorate([
            $.$mol_mem()
        ], $mol_viewer_selection, "position", null);
        return $mol_viewer_selection;
    }($.$mol_object));
    $.$mol_viewer_selection = $mol_viewer_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    document.addEventListener('selectionchange', function (event) {
        $.$mol_viewer_selection.position(void 0);
    });
    document.addEventListener('focusin', $.$mol_viewer_selection.onFocus);
    document.addEventListener('focus', $.$mol_viewer_selection.onFocus, true);
    document.addEventListener('focusout', $.$mol_viewer_selection.onBlur);
    document.addEventListener('blur', $.$mol_viewer_selection.onBlur, true);
})($ || ($ = {}));
//selection.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_linker = (function (_super) {
        __extends($mol_linker, _super);
        function $mol_linker() {
            _super.apply(this, arguments);
        }
        $mol_linker.prototype.heightMinimal = function () {
            return 36;
        };
        $mol_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_linker.prototype.uri = function () {
            return "";
        };
        $mol_linker.prototype.current = function () {
            return false;
        };
        $mol_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "href": function () { return _this.uri(); },
                "mol_linker_current": function () { return _this.current(); },
            });
        };
        $mol_linker.prototype.arg = function () {
            return ({});
        };
        return $mol_linker;
    }($.$mol_viewer));
    $.$mol_linker = $mol_linker;
})($ || ($ = {}));
//linker.view.tree.js.map
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
        var $mol_linker = (function (_super) {
            __extends($mol_linker, _super);
            function $mol_linker() {
                _super.apply(this, arguments);
            }
            $mol_linker.prototype.uri = function () {
                var patch = {};
                var arg = this.arg();
                for (var key in arg)
                    patch[key] = arg[key]();
                return new $.$mol_state_arg(this.statePrefix()).link(patch);
            };
            $mol_linker.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            __decorate([
                $.$mol_mem()
            ], $mol_linker.prototype, "uri", null);
            return $mol_linker;
        }($.$mol_linker));
        $mol.$mol_linker = $mol_linker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//linker.view.js.map
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
            _super.apply(this, arguments);
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
                _super.apply(this, arguments);
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
            __decorate([
                $.$mol_mem()
            ], $mol_lister.prototype, "rowOffsets", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_lister.prototype, "rowContext", null);
            __decorate([
                $.$mol_mem()
            ], $mol_lister.prototype, "childsVisible", null);
            return $mol_lister;
        }($.$mol_lister));
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
    var $mol_carder = (function (_super) {
        __extends($mol_carder, _super);
        function $mol_carder() {
            _super.apply(this, arguments);
        }
        $mol_carder.prototype.status = function () {
            return "";
        };
        $mol_carder.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_carder_status": function () { return _this.status(); },
            });
        };
        $mol_carder.prototype.content = function () {
            return null;
        };
        $mol_carder.prototype.contenter = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_carder.prototype.statusText = function () {
            return this.status();
        };
        $mol_carder.prototype.statuser = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.statusText()); };
            });
        };
        $mol_carder.prototype.rows = function () {
            return [].concat(this.contenter(), this.statuser());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_carder.prototype, "contenter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_carder.prototype, "statuser", null);
        return $mol_carder;
    }($.$mol_lister));
    $.$mol_carder = $mol_carder;
})($ || ($ = {}));
//carder.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_rower = (function (_super) {
        __extends($mol_rower, _super);
        function $mol_rower() {
            _super.apply(this, arguments);
        }
        return $mol_rower;
    }($.$mol_viewer));
    $.$mol_rower = $mol_rower;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_rower_sub = (function (_super) {
        __extends($mol_rower_sub, _super);
        function $mol_rower_sub() {
            _super.apply(this, arguments);
        }
        return $mol_rower_sub;
    }($.$mol_viewer));
    $.$mol_rower_sub = $mol_rower_sub;
})($ || ($ = {}));
//rower.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_labeler.prototype.titler = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.contenter = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.childs = function () {
            return [].concat(this.titler(), this.contenter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_labeler.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_labeler.prototype, "contenter", null);
        return $mol_labeler;
    }($.$mol_viewer));
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
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
    var $mol_coster = (function (_super) {
        __extends($mol_coster, _super);
        function $mol_coster() {
            _super.apply(this, arguments);
        }
        $mol_coster.prototype.value = function () {
            return null;
        };
        $mol_coster.prototype.prefix = function () {
            return "";
        };
        $mol_coster.prototype.prefixer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_coster.prototype.valueView = function () {
            return "";
        };
        $mol_coster.prototype.mainer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.valueView()); };
            });
        };
        $mol_coster.prototype.postfix = function () {
            return "";
        };
        $mol_coster.prototype.postfixer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_coster.prototype.childs = function () {
            return [].concat(this.prefixer(), this.mainer(), this.postfixer());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "prefixer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "mainer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "postfixer", null);
        return $mol_coster;
    }($.$mol_viewer));
    $.$mol_coster = $mol_coster;
})($ || ($ = {}));
//coster.view.tree.js.map
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
            _super.call(this);
            this['valueOf()'] = value;
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
        $mol_unit.prototype.valueView = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.valueView() + this.postfix();
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
            _super.apply(this, arguments);
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_coster = (function (_super) {
            __extends($mol_coster, _super);
            function $mol_coster() {
                _super.apply(this, arguments);
            }
            $mol_coster.prototype.value = function () {
                return null;
            };
            $mol_coster.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_coster.prototype.valueView = function () {
                return this.value().valueView();
            };
            $mol_coster.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_coster;
        }($.$mol_coster));
        $mol.$mol_coster = $mol_coster;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//coster.view.js.map
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
            base_class.patterns = {};
            return base_class;
        }());
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
                _super.call(this);
                this._year = config.year && Number(config.year) || 0;
                this._month = config.month && Number(config.month) || 0;
                this._day = config.day && Number(config.day) || 0;
                this._hour = config.hour && Number(config.hour) || 0;
                this._minute = config.minute && Number(config.minute) || 0;
                this._second = config.second && Number(config.second) || 0;
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
            return duration_class;
        }($jin.time.base_class));
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
                _super.call(this);
                this._year = config.year && Number(config.year);
                this._month = config.month && Number(config.month);
                this._day = config.day && Number(config.day);
                this._hour = config.hour && Number(config.hour);
                this._minute = config.minute && Number(config.minute);
                this._second = config.second && Number(config.second);
                this._offset = config.offset && this.constructor.duration_class.make(config.offset);
                this._native = null;
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
            return moment_class;
        }($jin.time.base_class));
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                _super.apply(this, arguments);
            }
            moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            return moment_class_ru;
        }(moment_class));
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_selectRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_selectRandom = $mol_stub_selectRandom;
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
                text += $mol_stub_selectRandom(possible);
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
    function $mol_stub_productName() {
        var name = $mol_stub_selectRandom([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_selectRandom(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_selectRandom(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_productName = $mol_stub_productName;
    function $mol_stub_companyNameBig() {
        var product = $mol_stub_selectRandom(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_selectRandom(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_companyNameBig = $mol_stub_companyNameBig;
    function $mol_stub_companyNameSmall() {
        return $mol_stub_selectRandom(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_companyNameSmall = $mol_stub_companyNameSmall;
    function $mol_stub_companyName() {
        return $mol_stub_selectRandom([$mol_stub_companyNameSmall, $mol_stub_companyNameBig])();
    }
    $.$mol_stub_companyName = $mol_stub_companyName;
    function $mol_stub_personName() {
        var first = $mol_stub_selectRandom(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_selectRandom(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_personName = $mol_stub_personName;
    function $mol_stub_city() {
        return $mol_stub_selectRandom(['Moscow', 'London', 'Washington', 'Buenos Aires']);
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_payMethod = (function (_super) {
        __extends($mol_app_supplies_domain_payMethod, _super);
        function $mol_app_supplies_domain_payMethod() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_payMethod.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_payMethod.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_payMethod;
    }($.$mol_object));
    $.$mol_app_supplies_domain_payMethod = $mol_app_supplies_domain_payMethod;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supplyMoment = function () { return void 0; };
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_attachment.prototype.urlThumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.urlLoad = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballanceUnit = (function (_super) {
        __extends($mol_app_supplies_domain_ballanceUnit, _super);
        function $mol_app_supplies_domain_ballanceUnit() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_ballanceUnit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballanceUnit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballanceUnit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballanceUnit = $mol_app_supplies_domain_ballanceUnit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballanceUnit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.payMethod = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_supply.prototype, "status", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status;
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            _super.apply(this, arguments);
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
        $mol_app_supplies_domain_mock.prototype.supplyStatus = function (id, next) {
            return next || $.$mol_stub_selectRandom([
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
                obj.status = function (next) { return _this.supplyStatus(id, next); };
                obj.provider = $.$mol_const(_this.provider($.$mol_stub_code(2)));
                obj.consumer = $.$mol_const(_this.consumer($.$mol_stub_code(2)));
                obj.group = $.$mol_const(_this.supplyGroup($.$mol_stub_code(2)));
                obj.contract = $.$mol_const(_this.contract($.$mol_stub_code(8)));
                obj.manager = $.$mol_const(_this.person($.$mol_stub_code(2)));
                obj.ballanceUnit = $.$mol_const(_this.ballanceUnit($.$mol_stub_code(2)));
                obj.payMethod = $.$mol_const(_this.payMethod($.$mol_stub_code(1)));
                obj.debitor = $.$mol_const(_this.debitor($.$mol_stub_code(2)));
                obj.positions = function () { return _this.positions(id); };
                obj.attachments = function (next) { return _this.attachments(id, next); };
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return new $mol_app_supplies_domain_provider().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return new $mol_app_supplies_domain_consumer().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballanceUnit = function (id) {
            return new $mol_app_supplies_domain_ballanceUnit().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_selectRandom([
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
        $mol_app_supplies_domain_mock.prototype.supplyGroup = function (id) {
            return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_personName() + ' Group');
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
                obj.name = $.$mol_const($.$mol_stub_personName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
            });
        };
        $mol_app_supplies_domain_mock.prototype.payMethod = function (id) {
            return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_selectRandom(['Accounting', 'Cash']));
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
                obj.name = $.$mol_const($.$mol_stub_productName());
                obj.supplyMoment = $.$mol_const($.$mol_stub_time(60 * 24 * 365));
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
                obj.urlThumb = obj.urlLoad = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "positions", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "supplyStatus", null);
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
        ], $mol_app_supplies_domain_mock.prototype, "ballanceUnit", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "division", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "supplyGroup", null);
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
        ], $mol_app_supplies_domain_mock.prototype, "payMethod", null);
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
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
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
    var $mol_app_supplies_carder = (function (_super) {
        __extends($mol_app_supplies_carder, _super);
        function $mol_app_supplies_carder() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_carder.prototype.heightMinimal = function () {
            return 100;
        };
        $mol_app_supplies_carder.prototype.arg = function () {
            return ({});
        };
        $mol_app_supplies_carder.prototype.linker = function (next) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return _this.arg(); };
            });
        };
        $mol_app_supplies_carder.prototype.childs = function () {
            return [].concat(this.contenter(), this.statuser(), this.linker());
        };
        $mol_app_supplies_carder.prototype.codeTitle = function () {
            return this.localizedText("codeTitle");
        };
        $mol_app_supplies_carder.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.codeItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.codeTitle(); };
                obj.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_carder.prototype.costTitle = function () {
            return this.localizedText("costTitle");
        };
        $mol_app_supplies_carder.prototype.cost = function (next) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_carder.prototype.coster = function (next) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_carder.prototype.costItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costTitle(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_carder.prototype.providerTitle = function () {
            return this.localizedText("providerTitle");
        };
        $mol_app_supplies_carder.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.providerItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.providerTitle(); };
                obj.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_carder.prototype.items = function () {
            return [].concat(this.codeItem(), this.costItem(), this.providerItem());
        };
        $mol_app_supplies_carder.prototype.grouper = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_carder.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "linker", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "codeItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "providerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "grouper", null);
        return $mol_app_supplies_carder;
    }($.$mol_carder));
    $.$mol_app_supplies_carder = $mol_app_supplies_carder;
})($ || ($ = {}));
//carder.view.tree.js.map
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
        var $mol_app_supplies_carder = (function (_super) {
            __extends($mol_app_supplies_carder, _super);
            function $mol_app_supplies_carder() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_carder.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_carder.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_carder.prototype.providerName = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_carder.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_carder.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_carder;
        }($.$mol_app_supplies_carder));
        $mol.$mol_app_supplies_carder = $mol_app_supplies_carder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//carder.view.js.map
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
    var $mol_app_supplies_carder_demo_pending = (function (_super) {
        __extends($mol_app_supplies_carder_demo_pending, _super);
        function $mol_app_supplies_carder_demo_pending() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_pending.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_carder_demo_pending.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_pending.prototype.cost = function (next) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1000000; };
            });
        };
        $mol_app_supplies_carder_demo_pending.prototype.status = function () {
            return "pending";
        };
        $mol_app_supplies_carder_demo_pending.prototype.arg = function () {
            return ({
                "supply": function () { return "1"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_pending.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_pending;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_pending = $mol_app_supplies_carder_demo_pending;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_supplies_carder_demo_approved = (function (_super) {
        __extends($mol_app_supplies_carder_demo_approved, _super);
        function $mol_app_supplies_carder_demo_approved() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_approved.prototype.code = function () {
            return "43434232";
        };
        $mol_app_supplies_carder_demo_approved.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_approved.prototype.cost = function (next) {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 3000000; };
            });
        };
        $mol_app_supplies_carder_demo_approved.prototype.status = function () {
            return "approved";
        };
        $mol_app_supplies_carder_demo_approved.prototype.arg = function () {
            return ({
                "supply": function () { return "2"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_approved.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_approved;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_approved = $mol_app_supplies_carder_demo_approved;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_supplies_carder_demo_selected = (function (_super) {
        __extends($mol_app_supplies_carder_demo_selected, _super);
        function $mol_app_supplies_carder_demo_selected() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_selected.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_carder_demo_selected.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_selected.prototype.cost = function (next) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 900000; };
            });
        };
        $mol_app_supplies_carder_demo_selected.prototype.status = function () {
            return "selected";
        };
        $mol_app_supplies_carder_demo_selected.prototype.arg = function () {
            return ({
                "supply": function () { return "3"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_selected.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_selected;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_selected = $mol_app_supplies_carder_demo_selected;
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
    var $mol_stacker = (function (_super) {
        __extends($mol_stacker, _super);
        function $mol_stacker() {
            _super.apply(this, arguments);
        }
        $mol_stacker.prototype.side = function () {
            return false;
        };
        $mol_stacker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_stacker_side": function () { return _this.side(); },
            });
        };
        $mol_stacker.prototype.main = function () {
            return [];
        };
        $mol_stacker.prototype.mainer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.main(); };
            });
        };
        $mol_stacker.prototype.addon = function () {
            return [];
        };
        $mol_stacker.prototype.addoner = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.addon(); };
            });
        };
        $mol_stacker.prototype.childs = function () {
            return [].concat(this.mainer(), this.addoner());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stacker.prototype, "mainer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stacker.prototype, "addoner", null);
        return $mol_stacker;
    }($.$mol_viewer));
    $.$mol_stacker = $mol_stacker;
})($ || ($ = {}));
//stacker.view.tree.js.map
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
        var $mol_stacker = (function (_super) {
            __extends($mol_stacker, _super);
            function $mol_stacker() {
                _super.apply(this, arguments);
            }
            $mol_stacker.prototype.side = function (next) {
                if (!this.main())
                    return true;
                var arg = (next === void 0) ? void 0 : next ? '' : null;
                return $.$mol_state_arg.value(this.stateKey('side'), arg) != null;
            };
            return $mol_stacker;
        }($.$mol_stacker));
        $mol.$mol_stacker = $mol_stacker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stacker.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_form.prototype.submitBlocked = function () {
            return false;
        };
        $mol_form.prototype.formFields = function () {
            return [];
        };
        $mol_form.prototype.barFields = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.formFields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.barButtons = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.childs = function () {
            return [].concat(this.barFields(), this.barButtons());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "barFields", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "barButtons", null);
        return $mol_form;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_form.prototype.submitBlocked = function () {
                return this.formFields().some(function (field) { return field.errors().length !== 0; });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_form.prototype, "submitBlocked", null);
            return $mol_form;
        }($.$mol_form));
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
            _super.apply(this, arguments);
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.namer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.errorer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.namer(), _this.errorer()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.childs = function () {
            return [].concat(this.label(), this.control());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "namer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "errorer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "label", null);
        return $mol_form_field;
    }($.$mol_viewer));
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
    var $mol_stringer = (function (_super) {
        __extends($mol_stringer, _super);
        function $mol_stringer() {
            _super.apply(this, arguments);
        }
        $mol_stringer.prototype.tagName = function () {
            return "input";
        };
        $mol_stringer.prototype.enabled = function () {
            return true;
        };
        $mol_stringer.prototype.hint = function () {
            return "";
        };
        $mol_stringer.prototype.type = function () {
            return "text";
        };
        $mol_stringer.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "placeholder": function () { return _this.hint(); },
                "type": function () { return _this.type(); },
            });
        };
        $mol_stringer.prototype.disabled = function () {
            return false;
        };
        $mol_stringer.prototype.value = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_stringer.prototype.valueChanged = function (next) {
            return this.value(next);
        };
        $mol_stringer.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "disabled": function () { return _this.disabled(); },
                "value": function () { return _this.valueChanged(); },
            });
        };
        $mol_stringer.prototype.eventChange = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_stringer.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "input": function (next) { return _this.eventChange(next); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stringer.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stringer.prototype, "eventChange", null);
        return $mol_stringer;
    }($.$mol_viewer));
    $.$mol_stringer = $mol_stringer;
})($ || ($ = {}));
//stringer.view.tree.js.map
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
        var $mol_stringer = (function (_super) {
            __extends($mol_stringer, _super);
            function $mol_stringer() {
                _super.apply(this, arguments);
            }
            $mol_stringer.prototype.eventChange = function (next) {
                this.value(this.DOMNode().value.trim());
            };
            $mol_stringer.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_stringer;
        }($.$mol_stringer));
        $mol.$mol_stringer = $mol_stringer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stringer.view.js.map
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
    var $mol_clicker = (function (_super) {
        __extends($mol_clicker, _super);
        function $mol_clicker() {
            _super.apply(this, arguments);
        }
        $mol_clicker.prototype.tagName = function () {
            return "button";
        };
        $mol_clicker.prototype.enabled = function () {
            return true;
        };
        $mol_clicker.prototype.eventClick = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_clicker.prototype.eventActivate = function (next) {
            return this.eventClick(next);
        };
        $mol_clicker.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next) { return _this.eventActivate(next); },
            });
        };
        $mol_clicker.prototype.disabled = function () {
            return false;
        };
        $mol_clicker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
                "tabindex": function () { return "0"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_clicker.prototype, "eventClick", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker.prototype, "eventActivate", null);
        return $mol_clicker;
    }($.$mol_viewer));
    $.$mol_clicker = $mol_clicker;
})($ || ($ = {}));
//clicker.view.tree.js.map
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
        var $mol_clicker = (function (_super) {
            __extends($mol_clicker, _super);
            function $mol_clicker() {
                _super.apply(this, arguments);
            }
            $mol_clicker.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_clicker.prototype.eventActivate = function (next) {
                if (!this.enabled())
                    return;
                this.eventClick(next);
            };
            return $mol_clicker;
        }($.$mol_clicker));
        $mol.$mol_clicker = $mol_clicker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//clicker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_clicker_button = (function (_super) {
        __extends($mol_clicker_button, _super);
        function $mol_clicker_button() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_button;
    }($.$mol_clicker));
    $.$mol_clicker_button = $mol_clicker_button;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_major;
    }($.$mol_clicker_button));
    $.$mol_clicker_major = $mol_clicker_major;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_minor = (function (_super) {
        __extends($mol_clicker_minor, _super);
        function $mol_clicker_minor() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_minor;
    }($.$mol_clicker_button));
    $.$mol_clicker_minor = $mol_clicker_minor;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_danger = (function (_super) {
        __extends($mol_clicker_danger, _super);
        function $mol_clicker_danger() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_danger;
    }($.$mol_clicker_button));
    $.$mol_clicker_danger = $mol_clicker_danger;
})($ || ($ = {}));
//clicker_types.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_enter.prototype.entered = function (next) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return this.localizedText("loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.login = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function (next) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next) { return _this.login(next); };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function (next) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return this.localizedText("passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.password = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function (next) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next) { return _this.password(next); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function (next) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return this.localizedText("submitLabel");
        };
        $mol_app_supplies_enter.prototype.eventSubmit = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_supplies_enter.prototype.submitBlocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function (next) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitLabel()); };
                obj.eventClick = function (next) { return _this.eventSubmit(next); };
                obj.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function (next) {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.formFields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.childs = function () {
            return [].concat(this.form());
        };
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
        ], $mol_app_supplies_enter.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_enter.prototype, "submit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_enter.prototype, "form", null);
        return $mol_app_supplies_enter;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_app_supplies_enter.prototype.eventSubmit = function () {
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
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            _super.apply(this, arguments);
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
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollTop", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollLeft", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "eventScroll", null);
        return $mol_scroller;
    }($.$mol_viewer));
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
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            _super.apply(this, arguments);
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
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_session, "value", null);
        return $mol_state_session;
    }($.$mol_object));
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
    $.$mol_viewer_context.$mol_scroller_scrollTop = function () { return 0; };
    $.$mol_viewer_context.$mol_scroller_moving = function () { return false; };
})($ || ($ = {}));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                _super.apply(this, arguments);
            }
            $mol_scroller.prototype.scrollTop = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.scrollTop()', next) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.scrollLeft()', next) || 0;
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
            return $mol_scroller;
        }($.$mol_scroller));
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_pager = (function (_super) {
        __extends($mol_pager, _super);
        function $mol_pager() {
            _super.apply(this, arguments);
        }
        $mol_pager.prototype.titler = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return [];
        };
        $mol_pager.prototype.bodier = function (next) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.body(); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return [];
        };
        $mol_pager.prototype.footer = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.foot(); };
            });
        };
        $mol_pager.prototype.childs = function () {
            return [].concat(this.header(), this.bodier(), this.footer());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_pager.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_pager.prototype, "header", null);
        __decorate([
            $.$mol_mem()
        ], $mol_pager.prototype, "bodier", null);
        __decorate([
            $.$mol_mem()
        ], $mol_pager.prototype, "footer", null);
        return $mol_pager;
    }($.$mol_viewer));
    $.$mol_pager = $mol_pager;
})($ || ($ = {}));
//pager.view.tree.js.map
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
    var $mol_coder = (function (_super) {
        __extends($mol_coder, _super);
        function $mol_coder() {
            _super.apply(this, arguments);
        }
        $mol_coder.prototype.value = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_coder.prototype.format = function () {
            return "";
        };
        $mol_coder.prototype.hint = function () {
            return this.format();
        };
        $mol_coder.prototype.manualer = function (next) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next) { return _this.value(next); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_coder.prototype.eventScan = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_coder.prototype.labelScan = function () {
            return this.localizedText("labelScan");
        };
        $mol_coder.prototype.scanner = function (next) {
            var _this = this;
            return new $.$mol_clicker().setup(function (obj) {
                obj.eventClick = function (next) { return _this.eventScan(next); };
                obj.childs = function () { return [].concat(_this.labelScan()); };
            });
        };
        $mol_coder.prototype.childs = function () {
            return [].concat(this.manualer(), this.scanner());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "manualer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "eventScan", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "scanner", null);
        return $mol_coder;
    }($.$mol_viewer));
    $.$mol_coder = $mol_coder;
})($ || ($ = {}));
//coder.view.tree.js.map
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
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_coder = (function (_super) {
            __extends($mol_coder, _super);
            function $mol_coder() {
                _super.apply(this, arguments);
            }
            $mol_coder.prototype.supportScan = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_coder.prototype.scanner = function () {
                return this.supportScan() ? _super.prototype.scanner.call(this) : null;
            };
            $mol_coder.prototype.eventScan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_coder;
        }($.$mol_coder));
        $mol.$mol_coder = $mol_coder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//coder.view.js.map
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
    var $mol_app_supplies_lister = (function (_super) {
        __extends($mol_app_supplies_lister, _super);
        function $mol_app_supplies_lister() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_lister.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_lister.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_lister.prototype.searcherHint = function () {
            return this.localizedText("searcherHint");
        };
        $mol_app_supplies_lister.prototype.searchQuery = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_lister.prototype.searcher = function (next) {
            var _this = this;
            return new $.$mol_coder().setup(function (obj) {
                obj.hint = function () { return _this.searcherHint(); };
                obj.value = function (next) { return _this.searchQuery(next); };
            });
        };
        $mol_app_supplies_lister.prototype.searchPanel = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.searcher()); };
            });
        };
        $mol_app_supplies_lister.prototype.childs = function () {
            return [].concat(this.header(), this.searchPanel(), this.bodier());
        };
        $mol_app_supplies_lister.prototype.supplyRows = function () {
            return [];
        };
        $mol_app_supplies_lister.prototype.lister = function (next) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.supplyRows(); };
            });
        };
        $mol_app_supplies_lister.prototype.body = function () {
            return [].concat(this.lister());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searchQuery", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searcher", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searchPanel", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "lister", null);
        return $mol_app_supplies_lister;
    }($.$mol_pager));
    $.$mol_app_supplies_lister = $mol_app_supplies_lister;
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
        var $mol_app_supplies_lister = (function (_super) {
            __extends($mol_app_supplies_lister, _super);
            function $mol_app_supplies_lister() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_lister.prototype.requests = function () {
                return [];
            };
            $mol_app_supplies_lister.prototype.supplyRows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.supplyRow(index); });
            };
            $mol_app_supplies_lister.prototype.supplyRow = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_carder().setup(function (obj) {
                    obj.supply = function () { return _this.supplies()[index]; };
                    obj.arg = function () { return ({
                        supply: function () { return _this.supplies()[index].id(); },
                        side: function () { return null; }
                    }); };
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_lister.prototype, "supplyRows", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_lister.prototype, "supplyRow", null);
            return $mol_app_supplies_lister;
        }($.$mol_app_supplies_lister));
        $mol.$mol_app_supplies_lister = $mol_app_supplies_lister;
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
            _super.apply(this, arguments);
        }
        $mol_svg.prototype.tagName = function () {
            return "svg";
        };
        $mol_svg.prototype.nameSpace = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_viewer));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            _super.apply(this, arguments);
        }
        $mol_svg_path.prototype.tagName = function () {
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
            _super.apply(this, arguments);
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
        $mol_icon.prototype.pather = function (next) {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.childs = function () {
            return [].concat(this.pather());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_icon.prototype, "pather", null);
        return $mol_icon;
    }($.$mol_svg));
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
            _super.apply(this, arguments);
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
    var $mol_checker = (function (_super) {
        __extends($mol_checker, _super);
        function $mol_checker() {
            _super.apply(this, arguments);
        }
        $mol_checker.prototype.checked = function (next) {
            return (next !== void 0) ? next : false;
        };
        $mol_checker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_checker_checked": function (next) { return _this.checked(next); },
            });
        };
        $mol_checker.prototype.icon = function () {
            return null;
        };
        $mol_checker.prototype.label = function () {
            return [];
        };
        $mol_checker.prototype.labeler = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_checker.prototype.childs = function () {
            return [].concat(this.icon(), this.labeler());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker.prototype, "checked", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker.prototype, "labeler", null);
        return $mol_checker;
    }($.$mol_clicker));
    $.$mol_checker = $mol_checker;
})($ || ($ = {}));
//checker.view.tree.js.map
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
        var $mol_checker = (function (_super) {
            __extends($mol_checker, _super);
            function $mol_checker() {
                _super.apply(this, arguments);
            }
            $mol_checker.prototype.eventClick = function (next) {
                this.checked(!this.checked());
                next.preventDefault();
            };
            return $mol_checker;
        }($.$mol_checker));
        $mol.$mol_checker = $mol_checker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//checker.view.js.map
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
    var $mol_switcher = (function (_super) {
        __extends($mol_switcher, _super);
        function $mol_switcher() {
            _super.apply(this, arguments);
        }
        $mol_switcher.prototype.heightMinimal = function () {
            return 44;
        };
        $mol_switcher.prototype.enabled = function () {
            return true;
        };
        $mol_switcher.prototype.optionChecked = function (key, next) {
            return (next !== void 0) ? next : false;
        };
        $mol_switcher.prototype.optionLabel = function (key) {
            return "";
        };
        $mol_switcher.prototype.optioner = function (key, next) {
            var _this = this;
            return new $.$mol_checker().setup(function (obj) {
                obj.checked = function (next) { return _this.optionChecked(key, next); };
                obj.label = function () { return [].concat(_this.optionLabel(key)); };
                obj.enabled = function () { return _this.enabled(); };
            });
        };
        $mol_switcher.prototype.value = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_switcher.prototype.options = function () {
            return ({});
        };
        $mol_switcher.prototype.items = function () {
            return [];
        };
        $mol_switcher.prototype.childs = function () {
            return this.items();
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_switcher.prototype, "optionChecked", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_switcher.prototype, "optioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_switcher.prototype, "value", null);
        return $mol_switcher;
    }($.$mol_viewer));
    $.$mol_switcher = $mol_switcher;
})($ || ($ = {}));
//switcher.view.tree.js.map
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
        var $mol_switcher = (function (_super) {
            __extends($mol_switcher, _super);
            function $mol_switcher() {
                _super.apply(this, arguments);
            }
            $mol_switcher.prototype.value = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.value()', next);
            };
            $mol_switcher.prototype.options = function () {
                return {};
            };
            $mol_switcher.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.optioner(key); });
            };
            $mol_switcher.prototype.optionLabel = function (key) {
                return this.options()[key]();
            };
            $mol_switcher.prototype.optionChecked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_switcher.prototype, "items", null);
            return $mol_switcher;
        }($.$mol_switcher));
        $mol.$mol_switcher = $mol_switcher;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switcher.view.js.map
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
    var $mol_decker = (function (_super) {
        __extends($mol_decker, _super);
        function $mol_decker() {
            _super.apply(this, arguments);
        }
        $mol_decker.prototype.items = function () {
            return [];
        };
        $mol_decker.prototype.current = function (next) {
            return (next !== void 0) ? next : "0";
        };
        $mol_decker.prototype.switcherOptions = function () {
            return ({});
        };
        $mol_decker.prototype.switcher = function (next) {
            var _this = this;
            return new $.$mol_switcher().setup(function (obj) {
                obj.value = function (next) { return _this.current(next); };
                obj.options = function () { return _this.switcherOptions(); };
            });
        };
        $mol_decker.prototype.content = function () {
            return null;
        };
        $mol_decker.prototype.rows = function () {
            return [].concat(this.switcher(), this.content());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_decker.prototype, "current", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker.prototype, "switcher", null);
        return $mol_decker;
    }($.$mol_lister));
    $.$mol_decker = $mol_decker;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_decker_item = (function (_super) {
        __extends($mol_decker_item, _super);
        function $mol_decker_item() {
            _super.apply(this, arguments);
        }
        $mol_decker_item.prototype.title = function () {
            return "";
        };
        $mol_decker_item.prototype.content = function () {
            return null;
        };
        return $mol_decker_item;
    }($.$mol_object));
    $.$mol_decker_item = $mol_decker_item;
})($ || ($ = {}));
//decker.view.tree.js.map
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
        var $mol_decker = (function (_super) {
            __extends($mol_decker, _super);
            function $mol_decker() {
                _super.apply(this, arguments);
            }
            $mol_decker.prototype.current = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.current()', next) || '0';
            };
            $mol_decker.prototype.switcherOptions = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = function () { return item.title(); };
                });
                return options;
            };
            $mol_decker.prototype.content = function () {
                return this.items()[this.current()].content();
            };
            __decorate([
                $.$mol_mem()
            ], $mol_decker.prototype, "content", null);
            return $mol_decker;
        }($.$mol_decker));
        $mol.$mol_decker = $mol_decker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//decker.view.js.map
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
    var $mol_sectioner = (function (_super) {
        __extends($mol_sectioner, _super);
        function $mol_sectioner() {
            _super.apply(this, arguments);
        }
        $mol_sectioner.prototype.head = function () {
            return null;
        };
        $mol_sectioner.prototype.header = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_sectioner.prototype.content = function () {
            return null;
        };
        $mol_sectioner.prototype.rows = function () {
            return [].concat(this.header(), this.content());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_sectioner.prototype, "header", null);
        return $mol_sectioner;
    }($.$mol_lister));
    $.$mol_sectioner = $mol_sectioner;
})($ || ($ = {}));
//sectioner.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_tiler.prototype.items = function () {
            return [];
        };
        $mol_tiler.prototype.childs = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_tiler.prototype.childs = function () {
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
                return new $.$mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $.$mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupItems(path); };
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_tiler.prototype, "childs", null);
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
            return $mol_tiler;
        }($.$mol_tiler));
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
            _super.apply(this, arguments);
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
    var $mol_attacher = (function (_super) {
        __extends($mol_attacher, _super);
        function $mol_attacher() {
            _super.apply(this, arguments);
        }
        $mol_attacher.prototype.items = function (next) {
            return (next !== void 0) ? next : [];
        };
        $mol_attacher.prototype.attachNew = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher.prototype.adder = function (next) {
            var _this = this;
            return new $.$mol_attacher_adder().setup(function (obj) {
                obj.fileNew = function (next) { return _this.attachNew(next); };
            });
        };
        $mol_attacher.prototype.content = function (next) {
            return (next !== void 0) ? next : [].concat(this.items(next), this.adder());
        };
        $mol_attacher.prototype.contenter = function (next) {
            var _this = this;
            return new $.$mol_tiler().setup(function (obj) {
                obj.items = function () { return _this.content(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "items", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "attachNew", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "adder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "contenter", null);
        return $mol_attacher;
    }($.$mol_carder));
    $.$mol_attacher = $mol_attacher;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_item = (function (_super) {
        __extends($mol_attacher_item, _super);
        function $mol_attacher_item() {
            _super.apply(this, arguments);
        }
        $mol_attacher_item.prototype.urlThumb = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher_item.prototype.urlLoad = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher_item.prototype.uri = function (next) {
            return this.urlLoad(next);
        };
        $mol_attacher_item.prototype.styleBG = function () {
            return "";
        };
        $mol_attacher_item.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.backgroundImage": function () { return _this.styleBG(); },
            });
        };
        $mol_attacher_item.prototype.loadable = function () {
            return true;
        };
        $mol_attacher_item.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "download": function () { return _this.loadable(); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_item.prototype, "urlThumb", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_item.prototype, "urlLoad", null);
        return $mol_attacher_item;
    }($.$mol_linker));
    $.$mol_attacher_item = $mol_attacher_item;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_adder = (function (_super) {
        __extends($mol_attacher_adder, _super);
        function $mol_attacher_adder() {
            _super.apply(this, arguments);
        }
        $mol_attacher_adder.prototype.tagName = function () {
            return "div";
        };
        $mol_attacher_adder.prototype.fileNew = function () {
            return "";
        };
        $mol_attacher_adder.prototype.icon = function (next) {
            return new $.$mol_icon_attach();
        };
        $mol_attacher_adder.prototype.eventCapture = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder.prototype.eventPicked = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder.prototype.input = function (next) {
            var _this = this;
            return new $.$mol_attacher_adder_input().setup(function (obj) {
                obj.eventCapture = function (next) { return _this.eventCapture(next); };
                obj.eventPicked = function (next) { return _this.eventPicked(next); };
            });
        };
        $mol_attacher_adder.prototype.childs = function () {
            return [].concat(this.icon(), this.input());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "icon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "eventCapture", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "eventPicked", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "input", null);
        return $mol_attacher_adder;
    }($.$mol_clicker));
    $.$mol_attacher_adder = $mol_attacher_adder;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_adder_input = (function (_super) {
        __extends($mol_attacher_adder_input, _super);
        function $mol_attacher_adder_input() {
            _super.apply(this, arguments);
        }
        $mol_attacher_adder_input.prototype.tagName = function () {
            return "input";
        };
        $mol_attacher_adder_input.prototype.type = function () {
            return "file";
        };
        $mol_attacher_adder_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attacher_adder_input.prototype.multiple = function () {
            return true;
        };
        $mol_attacher_adder_input.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "type": function () { return _this.type(); },
                "accept": function () { return _this.accept(); },
                "multiple": function () { return _this.multiple(); },
            });
        };
        $mol_attacher_adder_input.prototype.eventCapture = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder_input.prototype.eventClick = function (next) {
            return this.eventCapture(next);
        };
        $mol_attacher_adder_input.prototype.eventPicked = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder_input.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "change": function (next) { return _this.eventPicked(next); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder_input.prototype, "eventCapture", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder_input.prototype, "eventPicked", null);
        return $mol_attacher_adder_input;
    }($.$mol_viewer));
    $.$mol_attacher_adder_input = $mol_attacher_adder_input;
})($ || ($ = {}));
//attacher.view.tree.js.map
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
        var $mol_attacher = (function (_super) {
            __extends($mol_attacher, _super);
            function $mol_attacher() {
                _super.apply(this, arguments);
            }
            $mol_attacher.prototype.attachNew = function (next) {
                var items = this.items();
                var itemer = this.itemer(items.length);
                itemer.urlThumb(next);
                itemer.urlLoad(next);
                this.items(items.concat(itemer));
                return void 0;
            };
            $mol_attacher.prototype.itemer = function (id) {
                return new $mol_attacher_item();
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_attacher.prototype, "itemer", null);
            return $mol_attacher;
        }($.$mol_attacher));
        $mol.$mol_attacher = $mol_attacher;
        var $mol_attacher_item = (function (_super) {
            __extends($mol_attacher_item, _super);
            function $mol_attacher_item() {
                _super.apply(this, arguments);
            }
            $mol_attacher_item.prototype.styleBG = function () {
                return "url(\"" + this.urlThumb() + "\")";
            };
            return $mol_attacher_item;
        }($.$mol_attacher_item));
        $mol.$mol_attacher_item = $mol_attacher_item;
        var $mol_attacher_adder = (function (_super) {
            __extends($mol_attacher_adder, _super);
            function $mol_attacher_adder() {
                _super.apply(this, arguments);
            }
            $mol_attacher_adder.prototype.fileNew = function (next) {
                return next;
            };
            $mol_attacher_adder.prototype.eventCapture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.fileNew(url);
                }, function (error) {
                    _this.fileNew(error);
                }, {
                    quality: 50
                });
            };
            $mol_attacher_adder.prototype.eventPicked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.fileNew(URL.createObjectURL(file));
                }
            };
            return $mol_attacher_adder;
        }($.$mol_attacher_adder));
        $mol.$mol_attacher_adder = $mol_attacher_adder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//attacher.view.js.map
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
            _super.apply(this, arguments);
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
    var $mol_checker_ticker = (function (_super) {
        __extends($mol_checker_ticker, _super);
        function $mol_checker_ticker() {
            _super.apply(this, arguments);
        }
        $mol_checker_ticker.prototype.icon = function (next) {
            return new $.$mol_icon_tick();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker.prototype, "icon", null);
        return $mol_checker_ticker;
    }($.$mol_checker));
    $.$mol_checker_ticker = $mol_checker_ticker;
})($ || ($ = {}));
//ticker.view.tree.js.map
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
    var $mol_app_supplies_detailer = (function (_super) {
        __extends($mol_app_supplies_detailer, _super);
        function $mol_app_supplies_detailer() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_detailer.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detailer.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_detailer.prototype.backer_icon = function (next) {
            return new $.$mol_icon_chevron();
        };
        $mol_app_supplies_detailer.prototype.backArg = function () {
            return ({
                "side": function () { return ""; },
                "supply": function () { return null; },
            });
        };
        $mol_app_supplies_detailer.prototype.backer = function (next) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.backer_icon()); };
                obj.arg = function () { return _this.backArg(); };
            });
        };
        $mol_app_supplies_detailer.prototype.head = function () {
            return [].concat(this.backer(), this.titler());
        };
        $mol_app_supplies_detailer.prototype.orgLabel = function () {
            return this.localizedText("orgLabel");
        };
        $mol_app_supplies_detailer.prototype.providerLabel = function () {
            return this.localizedText("providerLabel");
        };
        $mol_app_supplies_detailer.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.providerItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.providerLabel(); };
                obj.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.customerLabel = function () {
            return this.localizedText("customerLabel");
        };
        $mol_app_supplies_detailer.prototype.consumerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.consumerItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.customerLabel(); };
                obj.content = function () { return _this.consumerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.supplyGroupLabel = function () {
            return this.localizedText("supplyGroupLabel");
        };
        $mol_app_supplies_detailer.prototype.supplyGroupName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.supplyGroupItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supplyGroupLabel(); };
                obj.content = function () { return _this.supplyGroupName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitLabel = function () {
            return this.localizedText("ballanceUnitLabel");
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.ballanceUnitLabel(); };
                obj.content = function () { return _this.ballanceUnitName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItems = function () {
            return [].concat(this.providerItem(), this.consumerItem(), this.supplyGroupItem(), this.ballanceUnitItem());
        };
        $mol_app_supplies_detailer.prototype.orgContent = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.orgItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItem = function (next) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.orgLabel(); };
                obj.content = function () { return _this.orgContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consLabel = function () {
            return this.localizedText("consLabel");
        };
        $mol_app_supplies_detailer.prototype.contractLabel = function () {
            return this.localizedText("contractLabel");
        };
        $mol_app_supplies_detailer.prototype.contractId = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.contractItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.contractLabel(); };
                obj.content = function () { return _this.contractId(); };
            });
        };
        $mol_app_supplies_detailer.prototype.payMethodLabel = function () {
            return this.localizedText("payMethodLabel");
        };
        $mol_app_supplies_detailer.prototype.payMethodName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.payMethodItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.payMethodLabel(); };
                obj.content = function () { return _this.payMethodName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.managerLabel = function () {
            return this.localizedText("managerLabel");
        };
        $mol_app_supplies_detailer.prototype.managerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.managerItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.managerLabel(); };
                obj.content = function () { return _this.managerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.debitodLabel = function () {
            return this.localizedText("debitodLabel");
        };
        $mol_app_supplies_detailer.prototype.debitorName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.debitorItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.debitodLabel(); };
                obj.content = function () { return _this.debitorName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItems = function () {
            return [].concat(this.contractItem(), this.payMethodItem(), this.managerItem(), this.debitorItem());
        };
        $mol_app_supplies_detailer.prototype.consContent = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.consItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItem = function (next) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.consLabel(); };
                obj.content = function () { return _this.consContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrDecker = function (next) {
            var _this = this;
            return new $.$mol_decker().setup(function (obj) {
                obj.items = function () { return [].concat(_this.orgItem(), _this.consItem()); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrCarder = function (next) {
            var _this = this;
            return new $.$mol_carder().setup(function (obj) {
                obj.content = function () { return _this.descrDecker(); };
            });
        };
        $mol_app_supplies_detailer.prototype.attachTitle = function () {
            return this.localizedText("attachTitle");
        };
        $mol_app_supplies_detailer.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detailer.prototype.attachNew = function (next) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_supplies_detailer.prototype.attacher = function (next) {
            var _this = this;
            return new $.$mol_attacher().setup(function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attachNew = function (next) { return _this.attachNew(next); };
            });
        };
        $mol_app_supplies_detailer.prototype.attachCarder = function (next) {
            var _this = this;
            return new $.$mol_sectioner().setup(function (obj) {
                obj.head = function () { return _this.attachTitle(); };
                obj.content = function () { return _this.attacher(); };
            });
        };
        $mol_app_supplies_detailer.prototype.positionsTitle = function () {
            return this.localizedText("positionsTitle");
        };
        $mol_app_supplies_detailer.prototype.costLabel = function () {
            return this.localizedText("costLabel");
        };
        $mol_app_supplies_detailer.prototype.cost = function (next) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detailer.prototype.coster = function (next) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detailer.prototype.costItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costLabel(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_detailer.prototype.posListerHead = function () {
            return [].concat(this.positionsTitle(), this.costItem());
        };
        $mol_app_supplies_detailer.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detailer.prototype.posLister = function (next) {
            var _this = this;
            return new $.$mol_sectioner().setup(function (obj) {
                obj.head = function () { return _this.posListerHead(); };
                obj.content = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detailer.prototype.content = function () {
            return [].concat(this.descrCarder(), this.attachCarder(), this.posLister());
        };
        $mol_app_supplies_detailer.prototype.contenter = function (next) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detailer.prototype.lister = function (next) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.contenter()); };
            });
        };
        $mol_app_supplies_detailer.prototype.body = function () {
            return [].concat(this.lister());
        };
        $mol_app_supplies_detailer.prototype.approved = function (next) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_detailer.prototype.approvedLabel = function () {
            return this.localizedText("approvedLabel");
        };
        $mol_app_supplies_detailer.prototype.approver = function (next) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.checked = function (next) { return _this.approved(next); };
                obj.label = function () { return [].concat(_this.approvedLabel()); };
            });
        };
        $mol_app_supplies_detailer.prototype.tools = function () {
            return [].concat(this.approver());
        };
        $mol_app_supplies_detailer.prototype.controller = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.tools(); };
            });
        };
        $mol_app_supplies_detailer.prototype.foot = function () {
            return [].concat(this.controller());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "backer_icon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "backer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "providerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consumerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "supplyGroupItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "ballanceUnitItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "orgContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "orgItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "contractItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "payMethodItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "managerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "debitorItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "descrDecker", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "descrCarder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attachNew", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attacher", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attachCarder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "posLister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "contenter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "approved", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "approver", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "controller", null);
        return $mol_app_supplies_detailer;
    }($.$mol_pager));
    $.$mol_app_supplies_detailer = $mol_app_supplies_detailer;
})($ || ($ = {}));
//detailer.view.tree.js.map
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
    var $mol_app_supplies_positioner = (function (_super) {
        __extends($mol_app_supplies_positioner, _super);
        function $mol_app_supplies_positioner() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_positioner.prototype.heightMinimal = function () {
            return 51;
        };
        $mol_app_supplies_positioner.prototype.productLabel = function () {
            return this.localizedText("productLabel");
        };
        $mol_app_supplies_positioner.prototype.productName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.productItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.productLabel(); };
                obj.content = function () { return _this.productName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.costlabel = function () {
            return this.localizedText("costlabel");
        };
        $mol_app_supplies_positioner.prototype.cost = function (next) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.coster = function (next) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_positioner.prototype.costItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costlabel(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_positioner.prototype.mainGroup = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.productItem(), _this.costItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.divisionLabel = function () {
            return this.localizedText("divisionLabel");
        };
        $mol_app_supplies_positioner.prototype.divisionName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.divisionItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.divisionLabel(); };
                obj.content = function () { return _this.divisionName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.priceLabel = function () {
            return this.localizedText("priceLabel");
        };
        $mol_app_supplies_positioner.prototype.price = function (next) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.pricer = function (next) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_positioner.prototype.priceItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.priceLabel(); };
                obj.content = function () { return _this.pricer(); };
            });
        };
        $mol_app_supplies_positioner.prototype.addonGroup = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.divisionItem(), _this.priceItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.quantityLabel = function () {
            return this.localizedText("quantityLabel");
        };
        $mol_app_supplies_positioner.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.quantityItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.quantityLabel(); };
                obj.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyDateLabel = function () {
            return this.localizedText("supplyDateLabel");
        };
        $mol_app_supplies_positioner.prototype.supplyDate = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.supplyDateItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supplyDateLabel(); };
                obj.content = function () { return _this.supplyDate(); };
            });
        };
        $mol_app_supplies_positioner.prototype.storeLabel = function () {
            return this.localizedText("storeLabel");
        };
        $mol_app_supplies_positioner.prototype.storeName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.storeItem = function (next) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.storeLabel(); };
                obj.content = function () { return _this.storeName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyGroup = function (next) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.quantityItem(), _this.supplyDateItem(), _this.storeItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.grouper = function (next) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.mainGroup(), _this.addonGroup(), _this.supplyGroup()); };
            });
        };
        $mol_app_supplies_positioner.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "productItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "mainGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "divisionItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "price", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "pricer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "priceItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "addonGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "quantityItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "supplyDateItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "storeItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "supplyGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "grouper", null);
        return $mol_app_supplies_positioner;
    }($.$mol_carder));
    $.$mol_app_supplies_positioner = $mol_app_supplies_positioner;
})($ || ($ = {}));
//positioner.view.tree.js.map
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
        var $mol_app_supplies_positioner = (function (_super) {
            __extends($mol_app_supplies_positioner, _super);
            function $mol_app_supplies_positioner() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_positioner.prototype.position = function () {
                return null;
            };
            $mol_app_supplies_positioner.prototype.productName = function () {
                return this.position().name();
            };
            $mol_app_supplies_positioner.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_positioner.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_positioner.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_positioner.prototype.supplyDate = function () {
                return this.position().supplyMoment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_positioner.prototype.divisionName = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_positioner.prototype.storeName = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_positioner;
        }($.$mol_app_supplies_positioner));
        $mol.$mol_app_supplies_positioner = $mol_app_supplies_positioner;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//positioner.view.js.map
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
        var $mol_app_supplies_detailer = (function (_super) {
            __extends($mol_app_supplies_detailer, _super);
            function $mol_app_supplies_detailer() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_detailer.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detailer.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detailer.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detailer.prototype.providerName = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detailer.prototype.consumerName = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detailer.prototype.ballanceUnitName = function () {
                return this.supply().ballanceUnit().name();
            };
            $mol_app_supplies_detailer.prototype.supplyGroupName = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detailer.prototype.managerName = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detailer.prototype.payMethodName = function () {
                return this.supply().payMethod().name();
            };
            $mol_app_supplies_detailer.prototype.debitorName = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detailer.prototype.contractId = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detailer.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detailer.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detailer.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.position(index); });
            };
            $mol_app_supplies_detailer.prototype.position = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_positioner().setup(function (obj) {
                    obj.position = function () { return _this.supply().positions()[index]; };
                });
            };
            $mol_app_supplies_detailer.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.attachment(index); });
            };
            $mol_app_supplies_detailer.prototype.attachment = function (index) {
                var _this = this;
                return new $mol.$mol_attacher_item().setup(function (obj) {
                    obj.urlThumb = function () { return _this.supply().attachments()[index].urlThumb(); };
                    obj.urlLoad = function () { return _this.supply().attachments()[index].urlLoad(); };
                });
            };
            $mol_app_supplies_detailer.prototype.attachNew = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat(new $.$mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.urlThumb = obj.urlLoad = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detailer.prototype.bodier = function () {
                var _this = this;
                return new $mol.$mol_scroller().setup(function (obj) {
                    obj.childs = function () { return _this.body(); };
                    obj.scrollTop = function (next) { return _this.scrollTop(next); };
                });
            };
            $mol_app_supplies_detailer.prototype.scrollTop = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this.objectPath() + (".scrollTop(" + supplyId + ")"), next);
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_detailer.prototype, "position", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_detailer.prototype, "attachment", null);
            return $mol_app_supplies_detailer;
        }($.$mol_app_supplies_detailer));
        $mol.$mol_app_supplies_detailer = $mol_app_supplies_detailer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//detailer.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_root.prototype.entered = function (next) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_root.prototype.enter = function (next) {
            var _this = this;
            return new $.$mol_app_supplies_enter().setup(function (obj) {
                obj.entered = function (next) { return _this.entered(next); };
            });
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.searchQuery = function (next) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_root.prototype.lister = function (next) {
            var _this = this;
            return new $.$mol_app_supplies_lister().setup(function (obj) {
                obj.supplies = function () { return _this.supplies(); };
                obj.searchQuery = function (next) { return _this.searchQuery(next); };
            });
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.detailer = function (next) {
            var _this = this;
            return new $.$mol_app_supplies_detailer().setup(function (obj) {
                obj.supply = function () { return _this.supply(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "entered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "enter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "searchQuery", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "detailer", null);
        return $mol_app_supplies_root;
    }($.$mol_stacker));
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
                _super.apply(this, arguments);
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.entered()', next) || false;
            };
            $mol_app_supplies_root.prototype.childs = function () {
                return [
                    this.entered()
                        ? this.mainer()
                        : null,
                    this.addoner()
                ];
            };
            $mol_app_supplies_root.prototype.main = function () {
                return this.supply()
                    ? [this.detailer()]
                    : null;
            };
            $mol_app_supplies_root.prototype.addon = function () {
                return this.entered()
                    ? [this.lister()]
                    : [this.enter()];
            };
            $mol_app_supplies_root.prototype.title = function () {
                return (this.main() || this.addon())[0].title();
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supplyId = function (next) {
                return $.$mol_state_arg.value(this.stateKey('supply'), next);
            };
            $mol_app_supplies_root.prototype.searchQuery = function (next) {
                if (!next)
                    return '';
                if (next.length < 7)
                    return next;
                this.supplyId(next);
                return '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supplyId();
                return id ? this.domain().supply(id) : null;
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_root.prototype, "domain", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_root.prototype, "searchQuery", null);
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
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
            _super.apply(this, arguments);
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
    var $mol_app_supplies_positioner_demo = (function (_super) {
        __extends($mol_app_supplies_positioner_demo, _super);
        function $mol_app_supplies_positioner_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_positioner_demo.prototype.productName = function () {
            return this.localizedText("productName");
        };
        $mol_app_supplies_positioner_demo.prototype.price = function (next) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.quantity = function () {
            return "100";
        };
        $mol_app_supplies_positioner_demo.prototype.cost = function (next) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 100; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.supplyDate = function () {
            return "2016-01-13";
        };
        $mol_app_supplies_positioner_demo.prototype.divisionName = function () {
            return this.localizedText("divisionName");
        };
        $mol_app_supplies_positioner_demo.prototype.storeName = function () {
            return this.localizedText("storeName");
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner_demo.prototype, "price", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner_demo.prototype, "cost", null);
        return $mol_app_supplies_positioner_demo;
    }($.$mol_app_supplies_positioner));
    $.$mol_app_supplies_positioner_demo = $mol_app_supplies_positioner_demo;
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
    var $mol_app_supplies_detailer_demo = (function (_super) {
        __extends($mol_app_supplies_detailer_demo, _super);
        function $mol_app_supplies_detailer_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_detailer_demo.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_detailer_demo.prototype.approved = function (next) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_detailer_demo.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_detailer_demo.prototype.cost = function (next) {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 1234567; };
            });
        };
        $mol_app_supplies_detailer_demo.prototype.consumerName = function () {
            return this.localizedText("consumerName");
        };
        $mol_app_supplies_detailer_demo.prototype.supplyGroupName = function () {
            return this.localizedText("supplyGroupName");
        };
        $mol_app_supplies_detailer_demo.prototype.ballanceUnitName = function () {
            return this.localizedText("ballanceUnitName");
        };
        $mol_app_supplies_detailer_demo.prototype.contractId = function () {
            return "123675234";
        };
        $mol_app_supplies_detailer_demo.prototype.payMethodName = function () {
            return this.localizedText("payMethodName");
        };
        $mol_app_supplies_detailer_demo.prototype.managerName = function () {
            return this.localizedText("managerName");
        };
        $mol_app_supplies_detailer_demo.prototype.debitorName = function () {
            return this.localizedText("debitorName");
        };
        $mol_app_supplies_detailer_demo.prototype.pos1 = function (next) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos2 = function (next) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos3 = function (next) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos4 = function (next) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos5 = function (next) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.positions = function () {
            return [].concat(this.pos1(), this.pos2(), this.pos3(), this.pos4(), this.pos5());
        };
        $mol_app_supplies_detailer_demo.prototype.attachments = function () {
            return [];
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "approved", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos3", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos4", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos5", null);
        return $mol_app_supplies_detailer_demo;
    }($.$mol_app_supplies_detailer));
    $.$mol_app_supplies_detailer_demo = $mol_app_supplies_detailer_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=web.js.map