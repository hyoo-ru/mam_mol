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
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom_status = $.$mol_atom_status;
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(handler, fail, host, field, key) {
            if (field === void 0) { field = 'value()'; }
            _super.call(this);
            this.handler = handler;
            this.fail = fail;
            this.host = host;
            this.field = field;
            this.key = key;
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
        $mol_atom.prototype.get = function () {
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            this.actualize();
            var value = (this.host || this)[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function () {
            var _this = this;
            if (this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.push(this.pull());
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function () {
            var host = this.host || this;
            try {
                if (this.key !== void 0) {
                    return this.handler.call(host, this.key);
                }
                else {
                    return this.handler.call(host);
                }
            }
            catch (error) {
                if (!error['$mol_atom_catched']) {
                    if (error instanceof $mol_atom_wait) {
                    }
                    else {
                        console.error(error.stack);
                    }
                    error['$mol_atom_catched'] = true;
                }
                return error;
            }
        };
        $mol_atom.prototype.set = function (next, prev) {
            var host = this.host || this;
            var next2;
            if (this.key !== void 0) {
                next2 = this.handler.call(host, this.key, next, prev);
            }
            else {
                next2 = this.handler.call(host, next, prev);
            }
            if (next2 === void 0)
                return host[this.field];
            return this.push(next2);
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host || this;
            var prev = host[this.field];
            if (next instanceof Error && this.fail) {
                if (this.key !== void 0) {
                    next = this.fail.call(host, this.key, host, next);
                }
                else {
                    next = this.fail.call(host, host, next);
                }
            }
            comparing: if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
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
                        }
                    });
                }
                host[this.field] = next;
                this.log(['push', next, prev]);
                this.obsoleteSlaves();
            }
            this.status = $mol_atom_status.actual;
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
    function $mol_atom_task(handler, fail) {
        var atom = new $mol_atom(function () {
            handler();
            atom.destroyed(true);
        }, fail);
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
            descr.value = function (next, prev) {
                var host = this;
                var field = name + "()";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value, config && config.fail, host, field);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                if (next !== void 0)
                    return info.set(next, prev);
                if (prev !== void 0)
                    return info.push(prev);
                return info.get();
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, prev) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value, config && config.fail, host, field, key);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                if (next !== void 0)
                    return info.set(next, prev);
                if (prev !== void 0)
                    return info.push(prev);
                return info.get();
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
            return next || [window.innerWidth, window.innerHeight];
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
        $mol_state_local.value = function (key, next, prev) {
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
window.addEventListener('storage', function (event) { return $.$mol_state_local.value(event.key, void 0, JSON.parse(localStorage.getItem(event.key) || 'null')); });
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
            next.onload = function (event) {
                if (Math.floor(next.status / 100) === 2) {
                    _this.response(void 0, next);
                }
                else {
                    _this.response(void 0, new Error(next.responseText));
                }
            };
            next.onerror = function (event) {
                _this.response(void 0, event.error || new Error('Unknown HTTP error'));
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
        $mol_http_request.prototype.response = function (next, prev) {
            if (next !== void 0)
                return next;
            var creds = this.credentials();
            var native = this.native();
            native.withCredentials = Boolean(creds);
            native.open(this.method(), this.uri(), true, creds && creds.login, creds && creds.password);
            native.send(this.body());
            throw new $.$mol_atom_wait(this.method() + " " + this.uri());
        };
        $mol_http_request.prototype.text = function (next) {
            if (next === null)
                this.response(null);
            else
                return this.response().responseText;
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
        $mol_http_resource.prototype.request = function (method) {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return method; };
            request.uri = function () { return _this.uri(); };
            request.credentials = function () { return _this.credentials(); };
            return request;
        };
        $mol_http_resource.prototype.downloader = function (next) {
            this.dataNext(null);
            return this.request('Get');
        };
        $mol_http_resource.prototype.uploader = function () {
            var body = this.dataNext();
            if (body == null)
                return null;
            var request = this.request('Put');
            request.body = function () { return body; };
            return request;
        };
        $mol_http_resource.prototype.uploaded = function () {
            if (!this.uploader())
                return null;
            this.text(void 0, this.uploader().text());
            return true;
        };
        $mol_http_resource.prototype.text = function (next, prev) {
            if (next === void 0) {
                return this.downloader().text();
            }
            else if (next === null) {
                this.downloader(null);
            }
            else {
                this.dataNext(next);
            }
        };
        $mol_http_resource.prototype.dataNext = function (next) {
            return next;
        };
        $mol_http_resource.prototype.refresh = function () {
            this.downloader(null);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "downloader", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "uploader", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "uploaded", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "text", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "dataNext", null);
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
        $mol_http_resource_json.prototype.json = function (next, prev) {
            if (next === void 0) {
                return JSON.parse(this.text());
            }
            else if (next === null) {
                this.text(null);
            }
            else {
                this.text(JSON.stringify(next, null, '\t'));
            }
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
            return $.$mol_state_local.value('locale', next) || 'en';
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
    $.$mol_viewer_context.$mol_viewer_heightLimit = function () { return $.$mol_window.size()[1] * 1.5; };
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
            var _loop_1 = function(name_1) {
                var handle = events[name_1];
                next2.addEventListener(name_1, function (event) {
                    handle(event);
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
                    var existsNode = ((view instanceof $mol_viewer) ? view.DOMNode() : view);
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
                    node.setAttribute(name_2, name_2);
                }
                else {
                    node.setAttribute(name_2, String(val));
                }
            }
        };
        $mol_viewer.renderFields = function (node, fields) {
            for (var path in fields) {
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
                }
            }
        };
        $mol_viewer.prototype.DOMTree = function (next) {
            var node = this.DOMNode();
            $mol_viewer.renderChilds(node, this.childsVisible());
            $mol_viewer.renderAttrs(node, this.attr());
            $mol_viewer.renderFields(node, this.field());
            return node;
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
            $.$mol_mem({
                fail: function (self, error) {
                    var node = self.DOMNode();
                    if (node)
                        node.setAttribute('mol_viewer_error', error.name);
                    return error;
                }
            })
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
        $mol_scroller.prototype.scrollTop = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollLeft = function () {
            return 0;
        };
        $mol_scroller.prototype.shadowStyle = function () {
            return "";
        };
        $mol_scroller.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function () { return _this.scrollTop(); },
                "scrollLeft": function () { return _this.scrollLeft(); },
                "style.boxShadow": function () { return _this.shadowStyle(); },
            });
        };
        $mol_scroller.prototype.eventScroll = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_scroller.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (next, prev) { return _this.eventScroll(next, prev); },
                "overflow": function (next, prev) { return _this.eventScroll(next, prev); },
                "underflow": function (next, prev) { return _this.eventScroll(next, prev); },
            });
        };
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
        $mol_state_session.value = function (key, next, prev) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next, prev) {
            return $.$mol_state_local.value(this.prefix() + '.' + key, next, prev);
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
                if (next)
                    this.moving(true);
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
                    _this.scrollTop(el.scrollTop);
                    _this.scrollLeft(el.scrollLeft);
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
        $mol_pager.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return [];
        };
        $mol_pager.prototype.bodier = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.body(); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return [];
        };
        $mol_pager.prototype.footer = function (next, prev) {
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
var $;
(function ($) {
    var $mol_statuser = (function (_super) {
        __extends($mol_statuser, _super);
        function $mol_statuser() {
            _super.apply(this, arguments);
        }
        $mol_statuser.prototype.status = function () {
            return null;
        };
        $mol_statuser.prototype.message = function () {
            return "";
        };
        $mol_statuser.prototype.childs = function () {
            return [].concat(this.message());
        };
        return $mol_statuser;
    }($.$mol_viewer));
    $.$mol_statuser = $mol_statuser;
})($ || ($ = {}));
//statuser.view.tree.js.map
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
        var $mol_statuser = (function (_super) {
            __extends($mol_statuser, _super);
            function $mol_statuser() {
                _super.apply(this, arguments);
            }
            $mol_statuser.prototype.message = function () {
                try {
                    this.status();
                    return null;
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    return error.message;
                }
            };
            return $mol_statuser;
        }($.$mol_statuser));
        $mol.$mol_statuser = $mol_statuser;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//statuser.view.js.map
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
var $;
(function ($) {
    var $mol_floater = (function (_super) {
        __extends($mol_floater, _super);
        function $mol_floater() {
            _super.apply(this, arguments);
        }
        $mol_floater.prototype.shiftStyle = function () {
            return "";
        };
        $mol_floater.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.transform": function () { return _this.shiftStyle(); },
            });
        };
        $mol_floater.prototype.scrolling = function () {
            return false;
        };
        $mol_floater.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_floater_scrolling": function () { return _this.scrolling(); },
            });
        };
        return $mol_floater;
    }($.$mol_viewer));
    $.$mol_floater = $mol_floater;
})($ || ($ = {}));
//floater.view.tree.js.map
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
        var $mol_floater = (function (_super) {
            __extends($mol_floater, _super);
            function $mol_floater() {
                _super.apply(this, arguments);
            }
            $mol_floater.prototype.shiftStyle = function () {
                var context = this.context();
                var offset = context.$mol_scroller_scrollTop();
                return "translateY( " + offset + "px )";
            };
            $mol_floater.prototype.scrolling = function () {
                return this.context().$mol_scroller_moving();
            };
            return $mol_floater;
        }($.$mol_floater));
        $mol.$mol_floater = $mol_floater;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//floater.view.js.map
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
        $mol_clicker.prototype.eventClick = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_clicker.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventClick(next, prev); },
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
    var $mol_checker = (function (_super) {
        __extends($mol_checker, _super);
        function $mol_checker() {
            _super.apply(this, arguments);
        }
        $mol_checker.prototype.checked = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_checker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_checker_checked": function (next, prev) { return _this.checked(next, prev); },
            });
        };
        $mol_checker.prototype.icon = function () {
            return null;
        };
        $mol_checker.prototype.label = function () {
            return "";
        };
        $mol_checker.prototype.labeler = function (next, prev) {
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
        $mol_icon.prototype.pather = function (next, prev) {
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
    var $mol_checker_expander = (function (_super) {
        __extends($mol_checker_expander, _super);
        function $mol_checker_expander() {
            _super.apply(this, arguments);
        }
        $mol_checker_expander.prototype.icon = function (next, prev) {
            return new $.$mol_icon_chevron();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander.prototype, "icon", null);
        return $mol_checker_expander;
    }($.$mol_checker));
    $.$mol_checker_expander = $mol_checker_expander;
})($ || ($ = {}));
//expander.view.tree.js.map
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
    var $mol_grider = (function (_super) {
        __extends($mol_grider, _super);
        function $mol_grider() {
            _super.apply(this, arguments);
        }
        $mol_grider.prototype.tagName = function () {
            return "table";
        };
        $mol_grider.prototype.rowHeight = function () {
            return 40;
        };
        $mol_grider.prototype.headerCellers = function () {
            return [];
        };
        $mol_grider.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.headerCellers(); };
            });
        };
        $mol_grider.prototype.rowers = function () {
            return [];
        };
        $mol_grider.prototype.childs = function () {
            return [].concat(this.header(), this.rowers());
        };
        $mol_grider.prototype.gapTop = function () {
            return 0;
        };
        $mol_grider.prototype.gaperTop = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapTop(); };
            });
        };
        $mol_grider.prototype.gapBottom = function () {
            return 0;
        };
        $mol_grider.prototype.gaperBottom = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapBottom(); };
            });
        };
        $mol_grider.prototype.cellers = function (key) {
            return [];
        };
        $mol_grider.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.cellers(key); };
            });
        };
        $mol_grider.prototype.cellerTitle = function (key) {
            return "";
        };
        $mol_grider.prototype.cellerHeader = function (key, next, prev) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellerTitle(key)); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "header", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "gaperTop", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "gaperBottom", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grider.prototype, "rower", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grider.prototype, "cellerHeader", null);
        return $mol_grider;
    }($.$mol_viewer));
    $.$mol_grider = $mol_grider;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_gaper = (function (_super) {
        __extends($mol_grider_gaper, _super);
        function $mol_grider_gaper() {
            _super.apply(this, arguments);
        }
        $mol_grider_gaper.prototype.height = function () {
            return 0;
        };
        $mol_grider_gaper.prototype.heightStyle = function () {
            return "0px";
        };
        $mol_grider_gaper.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.height": function () { return _this.heightStyle(); },
            });
        };
        return $mol_grider_gaper;
    }($.$mol_viewer));
    $.$mol_grider_gaper = $mol_grider_gaper;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_rower = (function (_super) {
        __extends($mol_grider_rower, _super);
        function $mol_grider_rower() {
            _super.apply(this, arguments);
        }
        $mol_grider_rower.prototype.tagName = function () {
            return "tr";
        };
        $mol_grider_rower.prototype.height = function () {
            return 40;
        };
        $mol_grider_rower.prototype.heightStyle = function () {
            return "";
        };
        $mol_grider_rower.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.height": function () { return _this.heightStyle(); },
            });
        };
        $mol_grider_rower.prototype.cellers = function () {
            return [];
        };
        $mol_grider_rower.prototype.childs = function () {
            return this.cellers();
        };
        return $mol_grider_rower;
    }($.$mol_viewer));
    $.$mol_grider_rower = $mol_grider_rower;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_celler = (function (_super) {
        __extends($mol_grider_celler, _super);
        function $mol_grider_celler() {
            _super.apply(this, arguments);
        }
        $mol_grider_celler.prototype.tagName = function () {
            return "td";
        };
        return $mol_grider_celler;
    }($.$mol_viewer));
    $.$mol_grider_celler = $mol_grider_celler;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_number = (function (_super) {
        __extends($mol_grider_number, _super);
        function $mol_grider_number() {
            _super.apply(this, arguments);
        }
        return $mol_grider_number;
    }($.$mol_grider_celler));
    $.$mol_grider_number = $mol_grider_number;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_grider_branch = (function (_super) {
        __extends($mol_app_grider_branch, _super);
        function $mol_app_grider_branch() {
            _super.apply(this, arguments);
        }
        $mol_app_grider_branch.prototype.level = function () {
            return 0;
        };
        $mol_app_grider_branch.prototype.levelStyle = function () {
            return "0px";
        };
        $mol_app_grider_branch.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.paddingLeft": function () { return _this.levelStyle(); },
            });
        };
        $mol_app_grider_branch.prototype.expanded = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_grider_branch.prototype.checked = function (next, prev) {
            return this.expanded(next, prev);
        };
        $mol_app_grider_branch.prototype.expandable = function () {
            return false;
        };
        $mol_app_grider_branch.prototype.enabled = function () {
            return this.expandable();
        };
        $mol_app_grider_branch.prototype.name = function () {
            return "";
        };
        $mol_app_grider_branch.prototype.label = function () {
            return this.name();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_grider_branch.prototype, "expanded", null);
        return $mol_app_grider_branch;
    }($.$mol_checker_expander));
    $.$mol_app_grider_branch = $mol_app_grider_branch;
})($ || ($ = {}));
//grider.view.tree.js.map
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
        var $mol_grider = (function (_super) {
            __extends($mol_grider, _super);
            function $mol_grider() {
                _super.apply(this, arguments);
            }
            $mol_grider.prototype.childs = function () {
                var rowers = this.rowers();
                if (!rowers)
                    return null;
                var viewWindow = this.viewWindow();
                return [].concat(this.header(), (viewWindow.top > 0) ? this.gaperTop() : null, rowers.slice(viewWindow.top, viewWindow.bottom).valueOf(), (viewWindow.bottom < viewWindow.count) ? this.gaperBottom() : null);
            };
            $mol_grider.prototype.viewWindow = function () {
                var rowers = this.rowers();
                if (!rowers)
                    return null;
                var count = rowers.length;
                var context = this.context();
                var scrollTop = context.$mol_scroller_scrollTop();
                var heightLimit = context.$mol_viewer_heightLimit();
                var rowHeight = this.rowHeight();
                var top = Math.max(0, Math.floor((scrollTop) / rowHeight) - 3);
                var bottom = Math.min(Math.ceil(heightLimit / rowHeight), count);
                return { top: top, bottom: bottom, count: count };
            };
            $mol_grider.prototype.gapTop = function () {
                var viewWindow = this.viewWindow();
                return viewWindow.top * this.rowHeight();
            };
            $mol_grider.prototype.gapBottom = function () {
                var viewWindow = this.viewWindow();
                return (viewWindow.count - viewWindow.bottom) * this.rowHeight();
            };
            $mol_grider.prototype.headerCellers = function () {
                var _this = this;
                return this.cellers([]).map(function (celler, index) { return _this.cellerHeader(index); });
            };
            $mol_grider.prototype.cellerTitle = function (index) {
                return this.cellers([])[index].title();
            };
            __decorate([
                $.$mol_mem()
            ], $mol_grider.prototype, "childs", null);
            __decorate([
                $.$mol_mem()
            ], $mol_grider.prototype, "viewWindow", null);
            __decorate([
                $.$mol_mem()
            ], $mol_grider.prototype, "headerCellers", null);
            __decorate([
                $.$mol_mem()
            ], $mol_grider.prototype, "cellerTitle", null);
            return $mol_grider;
        }($.$mol_grider));
        $mol.$mol_grider = $mol_grider;
        var $mol_grider_gaper = (function (_super) {
            __extends($mol_grider_gaper, _super);
            function $mol_grider_gaper() {
                _super.apply(this, arguments);
            }
            $mol_grider_gaper.prototype.heightStyle = function () {
                return this.height() + "px";
            };
            return $mol_grider_gaper;
        }($.$mol_grider_gaper));
        $mol.$mol_grider_gaper = $mol_grider_gaper;
        var $mol_grider_rower = (function (_super) {
            __extends($mol_grider_rower, _super);
            function $mol_grider_rower() {
                _super.apply(this, arguments);
            }
            $mol_grider_rower.prototype.heightStyle = function () {
                return (this.height() - 1) + "px";
            };
            return $mol_grider_rower;
        }($.$mol_grider_rower));
        $mol.$mol_grider_rower = $mol_grider_rower;
        var $mol_app_grider_branch = (function (_super) {
            __extends($mol_app_grider_branch, _super);
            function $mol_app_grider_branch() {
                _super.apply(this, arguments);
            }
            $mol_app_grider_branch.prototype.levelStyle = function () {
                return (this.level() * .75 - 1.5) + "rem";
            };
            $mol_app_grider_branch.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_app_grider_branch;
        }($.$mol_app_grider_branch));
        $mol.$mol_app_grider_branch = $mol_app_grider_branch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//grider.view.js.map
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
    var $mol_texter = (function (_super) {
        __extends($mol_texter, _super);
        function $mol_texter() {
            _super.apply(this, arguments);
        }
        $mol_texter.prototype.text = function () {
            return "";
        };
        $mol_texter.prototype.blockContent = function (key) {
            return [];
        };
        $mol_texter.prototype.blockType = function (key) {
            return "";
        };
        $mol_texter.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_texter_rower().setup(function (obj) {
                obj.childs = function () { return _this.blockContent(key); };
                obj.type = function () { return _this.blockType(key); };
            });
        };
        $mol_texter.prototype.spanner = function (key, next, prev) {
            return new $.$mol_texter_spanner();
        };
        $mol_texter.prototype.linker = function (key, next, prev) {
            return new $.$mol_texter_linker();
        };
        $mol_texter.prototype.imager = function (key, next, prev) {
            return new $.$mol_texter_imager();
        };
        $mol_texter.prototype.tablerHeaderCellers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerRowers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerGrider = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider().setup(function (obj) {
                obj.headerCellers = function () { return _this.tablerHeaderCellers(key); };
                obj.rowers = function () { return _this.tablerRowers(key); };
            });
        };
        $mol_texter.prototype.tabler = function (key, next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.tablerGrider(key)); };
            });
        };
        $mol_texter.prototype.tablerCellers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerRower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.cellers = function () { return _this.tablerCellers(key); };
            });
        };
        $mol_texter.prototype.tablerCellerContent = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerCeller = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_celler().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(key); };
            });
        };
        $mol_texter.prototype.tablerCellerHeader = function (key, next, prev) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(key); };
            });
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "rower", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "spanner", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "linker", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "imager", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "tablerGrider", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "tabler", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "tablerRower", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "tablerCeller", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_texter.prototype, "tablerCellerHeader", null);
        return $mol_texter;
    }($.$mol_lister));
    $.$mol_texter = $mol_texter;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_rower = (function (_super) {
        __extends($mol_texter_rower, _super);
        function $mol_texter_rower() {
            _super.apply(this, arguments);
        }
        $mol_texter_rower.prototype.heightMinimal = function () {
            return 40;
        };
        $mol_texter_rower.prototype.type = function () {
            return "";
        };
        $mol_texter_rower.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function () { return _this.type(); },
            });
        };
        return $mol_texter_rower;
    }($.$mol_viewer));
    $.$mol_texter_rower = $mol_texter_rower;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_spanner = (function (_super) {
        __extends($mol_texter_spanner, _super);
        function $mol_texter_spanner() {
            _super.apply(this, arguments);
        }
        $mol_texter_spanner.prototype.tagName = function () {
            return "span";
        };
        $mol_texter_spanner.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_spanner.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
            });
        };
        $mol_texter_spanner.prototype.content = function (next, prev) {
            return (next !== void 0) ? next : [];
        };
        $mol_texter_spanner.prototype.childs = function (next, prev) {
            return this.content(next, prev);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_spanner.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_spanner.prototype, "content", null);
        return $mol_texter_spanner;
    }($.$mol_viewer));
    $.$mol_texter_spanner = $mol_texter_spanner;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_linker = (function (_super) {
        __extends($mol_texter_linker, _super);
        function $mol_texter_linker() {
            _super.apply(this, arguments);
        }
        $mol_texter_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_texter_linker.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_linker.prototype.link = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
                "href": function (next, prev) { return _this.link(next, prev); },
            });
        };
        $mol_texter_linker.prototype.content = function (next, prev) {
            return (next !== void 0) ? next : [];
        };
        $mol_texter_linker.prototype.childs = function (next, prev) {
            return this.content(next, prev);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "link", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "content", null);
        return $mol_texter_linker;
    }($.$mol_viewer));
    $.$mol_texter_linker = $mol_texter_linker;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_imager = (function (_super) {
        __extends($mol_texter_imager, _super);
        function $mol_texter_imager() {
            _super.apply(this, arguments);
        }
        $mol_texter_imager.prototype.tagName = function () {
            return "img";
        };
        $mol_texter_imager.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.link = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.title = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
                "src": function (next, prev) { return _this.link(next, prev); },
                "alt": function (next, prev) { return _this.title(next, prev); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "link", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "title", null);
        return $mol_texter_imager;
    }($.$mol_viewer));
    $.$mol_texter_imager = $mol_texter_imager;
})($ || ($ = {}));
//texter.view.tree.js.map
;
var $;
(function ($) {
    var $mol_syntax = (function () {
        function $mol_syntax(lexems) {
            this['lexems()'] = lexems;
        }
        $mol_syntax.prototype.lexems = function () {
            return this['lexems()'];
        };
        $mol_syntax.prototype.rules = function () {
            var rules = this['rules()'];
            if (rules)
                return rules;
            rules = [];
            var lexems = this.lexems();
            for (var name_1 in lexems) {
                rules.push({
                    name: name_1,
                    regExp: lexems[name_1],
                    size: RegExp('^$|' + lexems[name_1].source).exec('').length - 1,
                });
            }
            return this['rules()'] = rules;
        };
        $mol_syntax.prototype.regExp = function () {
            var regExp = this['regExp()'];
            if (regExp)
                return regExp;
            var parts = '(' + this.rules().map(function (rule) { return rule.regExp.source; }).join(')|(') + ')';
            regExp = RegExp("([^]*?)(?:(" + parts + ")|$(?![^]))", 'gm');
            return this['regExp()'] = regExp;
        };
        $mol_syntax.prototype.tokenize = function (text) {
            var tokens = [];
            var rules = this.rules();
            var regExp = this.regExp();
            var regExpSize = RegExp('^$|' + regExp.source).exec('').length - 1;
            var position = 0;
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
                    var offset = 4;
                    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                        var rule = rules_1[_i];
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
        };
        return $mol_syntax;
    }());
    $.$mol_syntax = $mol_syntax;
})($ || ($ = {}));
//syntax.js.map
;
var $;
(function ($) {
    $.$mol_syntax_md_flow = new $.$mol_syntax({
        'header': /^(#+)(\s*)(.*?)$([\n\r]*)/,
        'list-item': /^(\s?\*\s+)(.*?)$([\n\r]*)/,
        'code': /^(```)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/,
    });
    $.$mol_syntax_md_line = new $.$mol_syntax({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
    });
})($ || ($ = {}));
//md.js.map
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
        var $mol_texter = (function (_super) {
            __extends($mol_texter, _super);
            function $mol_texter() {
                _super.apply(this, arguments);
            }
            $mol_texter.prototype.tokensFlow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_texter.prototype.rows = function () {
                var _this = this;
                return this.tokensFlow().map(function (token, index) {
                    switch (token.name) {
                        case 'table': return _this.tabler(index);
                    }
                    return _this.rower(index);
                });
            };
            $mol_texter.prototype.blockType = function (index) {
                return this.tokensFlow()[index].name;
            };
            $mol_texter.prototype.cellContents = function (indexBlock) {
                return this.tokensFlow()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(function (row) { return row && !/\|--/.test(row); })
                    .map(function (row, rowId) {
                    return row.split(/\|/g)
                        .filter(function (cell) { return cell; })
                        .map(function (cell, cellId) { return cell.trim(); });
                });
            };
            $mol_texter.prototype.tablerRowers = function (blockId) {
                var _this = this;
                return this.cellContents(blockId)
                    .slice(1)
                    .map(function (row, rowId) { return _this.tablerRower({ block: blockId, row: rowId + 1 }); });
            };
            $mol_texter.prototype.tablerHeaderCellers = function (blockId) {
                var _this = this;
                return this.cellContents(blockId)[0]
                    .map(function (cell, cellId) { return _this.tablerCellerHeader({ block: blockId, row: 0, cell: cellId }); });
            };
            $mol_texter.prototype.tablerCellers = function (id) {
                var _this = this;
                return this.cellContents(id.block)[id.row]
                    .map(function (cell, cellId) { return _this.tablerCeller({ block: id.block, row: id.row, cell: cellId }); });
            };
            $mol_texter.prototype.tablerCellerContent = function (id) {
                return this.text2spans(id.block + "/" + id.row + "/" + id.cell, this.cellContents(id.block)[id.row][id.cell]);
            };
            $mol_texter.prototype.text2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_line.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    switch (token.name) {
                        case 'text-link': {
                            var span_1 = _this.linker(id);
                            span_1.type(token.name);
                            span_1.link(token.chunks[1]);
                            span_1.content(_this.text2spans(id, token.chunks[0]));
                            return span_1;
                        }
                        case 'image-link': {
                            var span_2 = _this.imager(id);
                            span_2.type(token.name);
                            span_2.link(token.chunks[1]);
                            span_2.title(token.chunks[0]);
                            return span_2;
                        }
                        case 'code3':
                        case 'code': {
                            var span_3 = _this.spanner(id);
                            span_3.type('code');
                            span_3.content([token.chunks[0]]);
                            return span_3;
                        }
                    }
                    var span = _this.spanner(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map(function (text, index) { return _this.text2spans(id + "/" + index, text); }))
                        : [token.found]);
                    return span;
                });
            };
            $mol_texter.prototype.blockContent = function (indexBlock) {
                var token = this.tokensFlow()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans("" + indexBlock, token.chunks[2]);
                    case 'list-item': return this.text2spans("" + indexBlock, token.chunks[1]);
                    case 'code': return [token.chunks[2]];
                }
                return this.text2spans("" + indexBlock, token.chunks[0]);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_texter.prototype, "tokensFlow", null);
            __decorate([
                $.$mol_mem()
            ], $mol_texter.prototype, "cellContents", null);
            return $mol_texter;
        }($.$mol_texter));
        $mol.$mol_texter = $mol_texter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//texter.view.js.map
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
    var $mol_app_habhub = (function (_super) {
        __extends($mol_app_habhub, _super);
        function $mol_app_habhub() {
            _super.apply(this, arguments);
        }
        $mol_app_habhub.prototype.title = function () {
            return "HabHub";
        };
        $mol_app_habhub.prototype.gisters = function () {
            return [];
        };
        $mol_app_habhub.prototype.statuser = function (next, prev) {
            var _this = this;
            return new $.$mol_statuser().setup(function (obj) {
                obj.status = function () { return _this.gisters(); };
            });
        };
        $mol_app_habhub.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.gisters(); };
            });
        };
        $mol_app_habhub.prototype.body = function () {
            return [].concat(this.statuser(), this.lister());
        };
        $mol_app_habhub.prototype.gistContent = function (key) {
            return "";
        };
        $mol_app_habhub.prototype.gister = function (key, next, prev) {
            var _this = this;
            return new $.$mol_texter().setup(function (obj) {
                obj.text = function () { return _this.gistContent(key); };
            });
        };
        $mol_app_habhub.prototype.footer = function () {
            return null;
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_habhub.prototype, "statuser", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_habhub.prototype, "lister", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_habhub.prototype, "gister", null);
        return $mol_app_habhub;
    }($.$mol_pager));
    $.$mol_app_habhub = $mol_app_habhub;
})($ || ($ = {}));
//habhub.view.tree.js.map
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
        var $mol_app_habhub = (function (_super) {
            __extends($mol_app_habhub, _super);
            function $mol_app_habhub() {
                _super.apply(this, arguments);
            }
            $mol_app_habhub.prototype.uriSource = function () {
                return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions';
            };
            $mol_app_habhub.prototype.gists = function () {
                return $.$mol_http_resource_json.item(this.uriSource()).json().items;
            };
            $mol_app_habhub.prototype.gisters = function () {
                var _this = this;
                return this.gists().map(function (gist, index) { return _this.gister(index); });
            };
            $mol_app_habhub.prototype.gistContent = function (index) {
                var gist = this.gists()[index];
                return "# " + gist.title + "\n" + gist.body;
            };
            return $mol_app_habhub;
        }($.$mol_app_habhub));
        $mol.$mol_app_habhub = $mol_app_habhub;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//habhub.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_habhub_demo = (function (_super) {
        __extends($mol_app_habhub_demo, _super);
        function $mol_app_habhub_demo() {
            _super.apply(this, arguments);
        }
        return $mol_app_habhub_demo;
    }($.$mol_app_habhub));
    $.$mol_app_habhub_demo = $mol_app_habhub_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=web.js.map