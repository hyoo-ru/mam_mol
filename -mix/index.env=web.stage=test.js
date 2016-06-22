function $mol_test(code) {
    $mol_test_all.push(new $mol_test_case(code));
}
var $mol_test_all = [];
var $mol_test_run = function () {
    for (var _i = 0, $mol_test_all_1 = $mol_test_all; _i < $mol_test_all_1.length; _i++) {
        var test = $mol_test_all_1[_i];
        test.run();
    }
};
var $mol_test_case = (function () {
    function $mol_test_case(code) {
        if (typeof code === 'string') {
            this.code = new Function('test', code);
        }
        else {
            this.code = code;
        }
    }
    $mol_test_case.prototype.run = function () {
        this.code.call(null, this);
    };
    $mol_test_case.prototype.done = function () {
    };
    $mol_test_case.prototype.ok = function (value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    };
    $mol_test_case.prototype.not = function (value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    };
    $mol_test_case.prototype.fail = function (message) {
        throw new Error(message);
    };
    $mol_test_case.prototype.equal = function (a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    };
    $mol_test_case.prototype.unique = function (a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    };
    return $mol_test_case;
}());
//# sourceMappingURL=test.js.map
;
document.addEventListener('DOMContentLoaded', function (event) {
    $mol_test_run();
});
//# sourceMappingURL=test.env=web.stage=test.js.map
;
this['$'] = this['$'] || this;
this['$']['$mol'] = this['$'];
var __extends = function (Sub, Sup) {
    for (var prop in Sup)
        if (Sup.hasOwnProperty(prop))
            Sub[prop] = Sup[prop];
    Sub.prototype = Object.create(Sup.prototype);
    Sub.prototype.constructor = Sub;
    if (Sub.initializer)
        Sub.initializer();
};
//# sourceMappingURL=mol.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$mol_test(function (test) {
    var firstAClass;
    var lastBClass;
    var A = (function () {
        function A() {
        }
        A.initializer = function () {
            firstAClass = firstAClass || this;
        };
        return A;
    }());
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.initializer = function () {
            _super.initializer.call(this);
            lastBClass = this;
        };
        return B;
    }(A));
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    }(B));
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    }(C));
    test.equal(firstAClass, B);
    test.equal(lastBClass, D);
});
//# sourceMappingURL=mol.stage=test.js.map
;
var $jin = this.$jin = {}

;
//# sourceMappingURL=dumb.js.map
;
function $jin2_log() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i - 0] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    console.log(console, arguments);
    return arguments[0];
}
function $jin2_log_info(message) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    if (!$jin2_log_filter.test(message))
        return;
    console.log(message, values);
}
function $jin2_log_warn(message) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    if (!$jin2_log_filter.test(message))
        return;
    return console.warn.apply(console, arguments);
}
function $jin2_log_error(error) {
    if (typeof console === 'undefined')
        return;
    if (error.jin_log_isLogged)
        return;
    var message = error.stack || error;
    if (console['exception'])
        console['exception'](error);
    else if (console.error)
        console.error(message);
    else if (console.log)
        console.log(message);
    error.jin_log_isLogged = true;
}
function $jin2_log_error_ignore(error) {
    error.jin_log_isLogged = true;
    return error;
}
var $jin2_log_filter = /^$/;
//# sourceMappingURL=log.env=web.js.map
;
function $mol_log(path, values) {
    var filter = $mol_log.filter();
    if (!filter || !filter.test(path))
        return;
    var date = new Date;
    console.log.apply(console, [date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(), path].concat(values));
    return path;
}
var $mol_log;
(function ($mol_log) {
    var _filter;
    function filter() {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff.length) {
            sessionStorage['$mol_log.filter()'] = diff[0].source;
            _filter = diff[0];
        }
        if (_filter)
            return _filter;
        var source = sessionStorage['$mol_log.filter()'];
        if (!source)
            return null;
        return _filter = RegExp(source, 'i');
    }
    $mol_log.filter = filter;
})($mol_log || ($mol_log = {}));
$jin2_log;
//# sourceMappingURL=log.js.map
;
var $mol_object = (function () {
    function $mol_object() {
    }
    $mol_object.objectPath = function () {
        return this['name'];
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
    $mol_object.prototype.destroy = function () {
        this.log(['destroy']);
    };
    $mol_object.prototype.log = function (values) {
        if (!$mol_log.filter())
            return;
        $mol_log(this.objectPath(), values);
    };
    $mol_object.toString = function () {
        return this.objectPath();
    };
    $mol_object.prototype.toString = function () {
        return this.objectPath();
    };
    return $mol_object;
}());
//# sourceMappingURL=object.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return 1;
        };
        return X;
    }($mol_object));
    var x = new X().setup(function (obj) {
        obj.foo = function () { return 2; };
    });
    test.equal(x.foo(), 2);
});
$mol_test(function (test) {
    var x = new $mol_object;
    test.equal(x.objectPath(), '');
    x.objectField('foo()');
    test.equal(x.objectPath(), '.foo()');
    x.objectField('bar()');
    test.equal(x.objectPath(), '.foo()');
});
//# sourceMappingURL=object.stage=test.js.map
;
var $mol_state_stack = new Map();
//# sourceMappingURL=stack.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_atom = (function (_super) {
    __extends($mol_atom, _super);
    function $mol_atom(host, field, handler, fail) {
        _super.call(this);
        this.host = host;
        this.field = field;
        this.handler = handler;
        this.fail = fail;
        this.mastersDeep = 0;
    }
    $mol_atom.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unlink();
        var value = this.host[this.field];
        if (value instanceof $mol_object) {
            if (value.objectPath() === this.objectPath()) {
                value.destroy();
            }
        }
        this.host[this.field] = void 0;
    };
    $mol_atom.prototype.unlink = function () {
        this.disobeyAll();
        this.notifySlaves();
    };
    $mol_atom.prototype.objectPath = function () {
        return this.host.objectPath() + '.' + this.field;
    };
    $mol_atom.prototype.get = function () {
        if ($mol_atom.stack.indexOf(this) !== -1) {
            throw new Error('Recursive dependency! ' + this.objectPath());
        }
        var slave = $mol_atom.stack[$mol_atom.stack.length - 1];
        if (slave)
            this.lead(slave);
        if (slave)
            slave.obey(this);
        var value = this.host[this.field];
        if (value === void 0) {
            value = this.pull();
        }
        if (value instanceof Error)
            throw value;
        else
            return value;
    };
    $mol_atom.prototype.pull = function () {
        var _this = this;
        this.log(['pull']);
        var level = $mol_atom.plan[this.mastersDeep];
        if (level)
            level.delete(this);
        var oldMasters = this.masters;
        this.masters = null;
        this.mastersDeep = 0;
        var index = $mol_atom.stack.length;
        $mol_atom.stack.push(this);
        var next = this.handler();
        if (next === void 0)
            next = this.host[this.field];
        $mol_atom.stack.length = index;
        if (oldMasters)
            oldMasters.forEach(function (master) {
                if (_this.masters && _this.masters.has(master))
                    return;
                master.dislead(_this);
            });
        return this.push(next);
    };
    $mol_atom.prototype.set = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return this.push(this.handler.apply(this, diff));
    };
    $mol_atom.prototype.push = function (next) {
        var prev = this.host[this.field];
        if (next instanceof Error && this.fail)
            next = this.fail(next);
        if (prev !== next) {
            if (next instanceof $mol_object) {
                next['objectField'](this.field);
                next['objectOwner'](this.host);
            }
            this.host[this.field] = next;
            this.log(['push', next, prev]);
            this.notifySlaves();
        }
        return next;
    };
    $mol_atom.prototype.notifySlaves = function () {
        if (this.slaves) {
            this.slaves.forEach(function (slave) {
                if ($mol_atom.stack[$mol_atom.stack.length - 1] === slave)
                    return;
                slave.update();
            });
        }
    };
    $mol_atom.prototype.update = function () {
        $mol_atom.actualize(this);
    };
    $mol_atom.prototype.lead = function (slave) {
        if (!this.slaves)
            this.slaves = new Set();
        this.slaves.add(slave);
    };
    $mol_atom.prototype.dislead = function (slave) {
        if (!this.slaves)
            return;
        this.slaves.delete(slave);
        if (!this.slaves.size) {
            this.slaves = null;
            this.destroy();
        }
    };
    $mol_atom.prototype.obey = function (master) {
        if (!this.masters)
            this.masters = new Set();
        this.masters.add(master);
        var masterDeep = master.mastersDeep;
        if (this.mastersDeep <= masterDeep) {
            this.mastersDeep = masterDeep + 1;
        }
    };
    $mol_atom.prototype.disobey = function (master) {
        if (!this.masters)
            return;
        this.masters.delete(master);
        if (!this.masters.size)
            this.masters = null;
    };
    $mol_atom.prototype.disobeyAll = function () {
        var _this = this;
        if (!this.masters)
            return;
        this.masters.forEach(function (master) { return master.dislead(_this); });
        this.masters = null;
        this.mastersDeep = 0;
    };
    $mol_atom.prototype.value = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0) {
            if (diff.length > 1)
                return this.push(diff[1]);
            if (diff.length > 0)
                this.update();
            return this.get();
        }
        else {
            return this.set.apply(this, diff);
        }
    };
    $mol_atom.actualize = function (atom) {
        var deep = atom.mastersDeep;
        var plan = $mol_atom.plan;
        var level = plan[deep];
        if (!level)
            level = plan[deep] = new Set();
        level.add(atom);
        $mol_atom.schedule();
    };
    $mol_atom.schedule = function () {
        if ($mol_atom.scheduled)
            return;
        requestAnimationFrame(function () {
            $mol_atom.scheduled = false;
            $mol_atom_sync();
        });
        $mol_atom.scheduled = true;
    };
    $mol_atom.stack = [];
    $mol_atom.plan = [];
    $mol_atom.scheduled = false;
    return $mol_atom;
}($mol_object));
$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
var $mol_atom_wait = (function (_super) {
    __extends($mol_atom_wait, _super);
    function $mol_atom_wait(message) {
        if (message === void 0) { message = 'Wait...'; }
        _super.call(this, message);
        this.message = message;
    }
    return $mol_atom_wait;
}(Error));
function $mol_atom_sync() {
    for (var i = 0; i < $mol_atom.plan.length; ++i) {
        var level = $mol_atom.plan[i];
        if (!level)
            continue;
        while (level.size) {
            level.forEach(function (atom) {
                level.delete(atom);
                atom.pull();
            });
        }
        $mol_atom.plan[i] = null;
    }
}
function $mol_atom_restore() {
    $mol_atom.stack.splice(0, $mol_atom.stack.length);
}
//# sourceMappingURL=atom.js.map
;
window.addEventListener('error', function (event) {
    var error = event.error;
    var stack = $mol_atom.stack;
    while (stack.length) {
        var atom = stack.pop();
        if (error instanceof Error) {
            error = atom.push(error);
        }
    }
});
//# sourceMappingURL=atom.env=web.js.map
;
function $mol_prop(config) {
    return function (obj, name, descr) {
        var value = descr.value;
        if (value.length) {
            descr.value = function (key) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value.bind(host, key), config && config.fail.bind(null, host));
                return info.value.apply(info, diff);
            };
        }
        else {
            descr.value = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var host = this;
                var field = name + "()";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value.bind(host), config && config.fail.bind(null, host));
                return info.value.apply(info, diff);
            };
        }
        descr.value['value'] = value;
    };
}
//# sourceMappingURL=prop.js.map
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
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (id) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            if (diff[0] === void 0)
                return new Number(123);
            return new Number(diff[0]);
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo(0).valueOf(), 123);
    test.equal(x.foo(0), x.foo(0));
    test.unique(x.foo(0), x.foo(1));
    x.foo(0, 321);
    test.equal(x.foo(0).valueOf(), 321);
    x.foo(0, void 0);
    $mol_atom_sync();
    test.equal(x.foo(0).valueOf(), 123);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (ids) {
            return Math.random();
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo([0, 1]), x.foo([0, 1]));
    test.unique(x.foo([0, 1]), x.foo([0, 2]));
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || 1;
        };
        X.prototype.bar = function () {
            return this.foo() + 1;
        };
        X.prototype.xxx = function () {
            return this.bar() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "bar", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "xxx", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.bar(), 2);
    test.equal(x.xxx(), 3);
    x.foo(5);
    test.equal(x.bar(), 2);
    test.equal(x.xxx(), 3);
    $mol_atom_sync();
    test.equal(x.bar(), 6);
    test.equal(x.xxx(), 7);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return this.foo() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    try {
        x.foo();
        test.fail('Not tracked recursive dependency');
    }
    catch (error) {
        $mol_atom_restore();
        test.equal(error.message, 'Recursive dependency! .foo()');
    }
});
$mol_test(function (test) {
    var destroyed = false;
    var A = (function (_super) {
        __extends(A, _super);
        function A() {
            _super.apply(this, arguments);
        }
        A.prototype.destroy = function () {
            destroyed = true;
        };
        return A;
    }($mol_object));
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.prototype.showing = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] === void 0)
                return true;
            return diff[0];
        };
        B.prototype.foo = function () {
            return new A;
        };
        B.prototype.bar = function () {
            return this.showing() ? this.foo() : null;
        };
        __decorate([
            $mol_prop()
        ], B.prototype, "showing", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "bar", null);
        return B;
    }($mol_object));
    var b = new B;
    var bar = b.bar();
    test.ok(bar);
    b.showing(false);
    $mol_atom_sync();
    test.ok(destroyed);
    test.not(b.bar());
    b.showing(true);
    $mol_atom_sync();
    test.unique(b.bar(), bar);
});
//# sourceMappingURL=prop.stage=test.js.map
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
var $mol_state_local = (function (_super) {
    __extends($mol_state_local, _super);
    function $mol_state_local() {
        _super.apply(this, arguments);
    }
    $mol_state_local.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return JSON.parse(localStorage.getItem(key) || 'null');
        if (diff[0] === null)
            localStorage.removeItem(key);
        else
            localStorage.setItem(key, JSON.stringify(diff[0]));
        return diff[0];
    };
    $mol_state_local.prototype.prefix = function () { return ''; };
    $mol_state_local.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    __decorate([
        $mol_prop()
    ], $mol_state_local, "value", null);
    return $mol_state_local;
}($mol_object));
window.addEventListener('storage', function (event) { return $mol_state_local.value(event.key, void 0); });
//# sourceMappingURL=local.js.map
;
$mol_test(function (test) {
    var key = '$mol_state_local_test:' + Math.random();
    test.equal($mol_state_local.value(key), null);
    $mol_state_local.value(key, 123);
    test.equal($mol_state_local.value(key), 123);
    $mol_state_local.value(key, null);
    test.equal($mol_state_local.value(key), null);
});
//# sourceMappingURL=local.stage=test.js.map
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
var $mol_state_session = (function (_super) {
    __extends($mol_state_session, _super);
    function $mol_state_session() {
        _super.apply(this, arguments);
    }
    $mol_state_session.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return JSON.parse(sessionStorage.getItem(key) || 'null');
        if (diff[0] === null)
            localStorage.removeItem(key);
        else
            sessionStorage.setItem(key, JSON.stringify(diff[0]));
        return diff[0];
    };
    $mol_state_session.prototype.prefix = function () { return ''; };
    $mol_state_session.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    __decorate([
        $mol_prop()
    ], $mol_state_session, "value", null);
    return $mol_state_session;
}($mol_object));
//# sourceMappingURL=session.js.map
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
var $mol_state_arg = (function (_super) {
    __extends($mol_state_arg, _super);
    function $mol_state_arg(prefix) {
        if (prefix === void 0) { prefix = ''; }
        _super.call(this);
        this.prefix = prefix;
    }
    $mol_state_arg.href = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            history.replaceState(null, document.title, diff[0]);
        return window.location.search + window.location.hash;
    };
    $mol_state_arg.dict = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            this.href(this.make(diff[0]));
        var href = this.href();
        var chunks = href.split(/[\/\?#!&;]/g);
        var params = {};
        chunks.forEach(function (chunk) {
            if (!chunk)
                return;
            var vals = chunk.split(/[:=]/).map(decodeURIComponent);
            params[vals.shift()] = vals;
        });
        return params;
    };
    $mol_state_arg.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return this.dict()[key] || null;
        this.href(this.link((_a = {}, _a[key] = diff[0], _a)));
        return diff[0];
        var _a;
    };
    $mol_state_arg.link = function (next) {
        var params = {};
        var prev = this.dict();
        for (var key in prev) {
            params[key] = prev[key];
        }
        for (var key in next) {
            params[key] = next[key];
        }
        return this.make(params);
    };
    $mol_state_arg.make = function (next) {
        var chunks = [];
        for (var key in next) {
            if (null == next[key])
                continue;
            chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
        }
        return '#' + chunks.join('#');
    };
    $mol_state_arg.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this.prefix + key].concat(diff));
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
        $mol_prop()
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "value", null);
    return $mol_state_arg;
}($mol_object));
window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(void 0); });
//# sourceMappingURL=arg.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_model = (function (_super) {
    __extends($mol_model, _super);
    function $mol_model() {
        _super.apply(this, arguments);
    }
    $mol_model.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.argument = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.argument = function () {
        var owner = this.objectOwner();
        if (owner instanceof $mol_model)
            return owner.argument();
        return new $mol_state_arg;
    };
    return $mol_model;
}($mol_object));
//# sourceMappingURL=model.js.map
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
var $mol_viewer_selection = (function (_super) {
    __extends($mol_viewer_selection, _super);
    function $mol_viewer_selection() {
        _super.apply(this, arguments);
    }
    $mol_viewer_selection.focused = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0] || null;
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
            while (!el.id)
                el = el.parentElement;
            var meter = new Range;
            meter.selectNodeContents(el);
            meter.setEnd(range.startContainer, range.startOffset);
            var startOffset = meter.toString().length;
            meter.setEnd(range.endContainer, range.endOffset);
            var endOffset = meter.toString().length;
            return { id: el.id, start: startOffset, end: endOffset };
        }
    };
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "focused", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "position", null);
    return $mol_viewer_selection;
}($mol_object));
document.addEventListener('selectionchange', function (event) {
    $mol_viewer_selection.position(void 0);
});
document.addEventListener('focusin', function (event) {
    $mol_viewer_selection.focused(event.srcElement);
});
document.addEventListener('focusout', function (event) {
    $mol_viewer_selection.focused(null);
});
//# sourceMappingURL=selection.js.map
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
var $mol_viewer = (function (_super) {
    __extends($mol_viewer, _super);
    function $mol_viewer() {
        _super.apply(this, arguments);
    }
    $mol_viewer.root = function (id) {
        return new this;
    };
    $mol_viewer.prototype.tagName = function () { return 'div'; };
    $mol_viewer.prototype.nameSpace = function () { return 'http://www.w3.org/1999/xhtml'; };
    $mol_viewer.prototype.childs = function () {
        return null;
    };
    $mol_viewer.prototype.childsInner = function () { return this.childs(); };
    $mol_viewer.prototype.DOMNode = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var path = this.objectPath();
        var next = diff[0];
        if (!next) {
            next = this['DOMNode()'];
            if (next)
                return next;
            next = document.getElementById(path);
            if (!next) {
                next = document.createElementNS(this.nameSpace(), this.tagName());
            }
        }
        next.id = path;
        this['DOMNode()'] = next;
        var proto1 = this.objectOwner();
        while (typeof proto1 === 'object') {
            var className = proto1.constructor['objectPath']();
            if (!className)
                continue;
            var attrName = className.replace(/\$/g, '') + '_' + this.objectField().replace(/\(.*/, '');
            next.setAttribute(attrName, '');
            if (proto1 === $mol_viewer.prototype)
                break;
            proto1 = Object.getPrototypeOf(proto1);
        }
        var proto2 = this;
        while (proto2) {
            var className = proto2.constructor['objectPath']();
            if (!className)
                continue;
            next.setAttribute(className.replace(/\$/g, ''), '');
            if (proto2 === $mol_viewer.prototype)
                break;
            proto2 = Object.getPrototypeOf(proto2);
        }
        this.event_keys().forEach(function (name) {
            next.addEventListener(name, function (event) {
                _this.event(name, event);
                $mol_atom_sync();
                $mol_viewer_selection.position(null);
                $mol_viewer_selection.position($mol_viewer_selection.position());
            });
        });
        return next;
    };
    $mol_viewer.prototype.DOMTree = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var prev = this.DOMNode();
        this.attr_keys().forEach(function (name) {
            var n = _this.attr(name);
            if (n == null) {
                prev.removeAttribute(name);
            }
            else {
                prev.setAttribute(name, String(n));
            }
        });
        var childs = this.childsInner();
        if (childs != null) {
            var childViews = childs;
            var nextNode = prev.firstChild;
            for (var i = 0; i < childViews.length; ++i) {
                var view = childViews[i];
                if (view != null) {
                    if (typeof view === 'object') {
                        var existsNode = (view instanceof $mol_viewer) ? view.DOMTree() : view;
                        while (true) {
                            if (!nextNode) {
                                prev.appendChild(existsNode);
                                break;
                            }
                            if (nextNode == existsNode) {
                                nextNode = nextNode.nextSibling;
                                break;
                            }
                            else {
                                if (childViews.indexOf(nextNode) === -1) {
                                    var nn = nextNode.nextSibling;
                                    prev.removeChild(nextNode);
                                    nextNode = nn;
                                }
                                else {
                                    prev.insertBefore(existsNode, nextNode);
                                    break;
                                }
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
                            prev.insertBefore(textNode, nextNode);
                        }
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                prev.removeChild(currNode);
            }
        }
        this.field_keys().forEach(function (path) {
            var names = path.split('.');
            var obj = prev;
            for (var i = 0; i < names.length - 1; ++i) {
                if (names[i])
                    obj = obj[names[i]];
            }
            var field = names[names.length - 1];
            var val = _this.field(path);
            obj[field] = val;
        });
        prev.removeAttribute('mol_viewer_error');
        return prev;
    };
    $mol_viewer.prototype.attr_keys = function () { return []; };
    $mol_viewer.prototype.attr = function (name) { return ''; };
    $mol_viewer.prototype.event_keys = function () { return []; };
    $mol_viewer.prototype.event = function (name) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return null;
    };
    $mol_viewer.prototype.field_keys = function () { return []; };
    $mol_viewer.prototype.field = function (path) { return null; };
    $mol_viewer.prototype.focused = function () {
        return $mol_viewer_selection.focused() === this.DOMNode();
    };
    __decorate([
        $mol_prop({
            fail: function (self, error) {
                self.attr_keys();
                var node = self.DOMNode();
                if (node)
                    node.setAttribute('mol_viewer_error', error.message);
            }
        })
    ], $mol_viewer.prototype, "DOMTree", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer, "root", null);
    return $mol_viewer;
}($mol_model));
document.addEventListener('DOMContentLoaded', function (event) {
    var nodes = document.querySelectorAll('[mol_viewer_root]');
    for (var i = nodes.length - 1; i >= 0; --i) {
        var view = window['$'][nodes[i].getAttribute('mol_viewer_root')].root(i);
        view.DOMNode(nodes[i]);
        view.DOMTree(void 0);
    }
});
//# sourceMappingURL=viewer.env=web.js.map
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
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMTree().id, '');
    test.equal(x.element(0).DOMTree().id, '.element(0)');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMTree(), x.DOMTree());
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.childs = function () {
            return ['lol', 5];
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMTree().innerHTML, 'lol5');
});
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMTree().getAttribute('mol_viewer_test_block'), '');
    test.equal(x.DOMTree().getAttribute('mol_viewer'), '');
    test.equal(x.element(0).DOMTree().getAttribute('mol_viewer_test_block_element'), '');
    test.equal(x.element(0).DOMTree().getAttribute('mol_viewer_element'), '');
    test.equal(x.element(0).DOMTree().getAttribute('mol_viewer_test_item'), '');
    test.equal(x.element(0).DOMTree().getAttribute('mol_viewer'), '');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.attr_keys = function () {
            return _super.prototype.attr_keys.call(this).concat('href', 'required');
        };
        $mol_viewer_test.prototype.attr = function (name) {
            switch (name) {
                case 'href': return '#haha';
            }
            return _super.prototype.attr.call(this, name);
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMTree().getAttribute('href'), '#haha');
    test.equal(x.DOMTree().getAttribute('required'), '');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.field_keys = function () {
            return _super.prototype.field_keys.call(this).concat('style.top');
        };
        $mol_viewer_test.prototype.field = function (name) {
            switch (name) {
                case 'style.top': return '10px';
            }
            return _super.prototype.field.call(this, name);
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMTree().style.top, '10px');
});
$mol_test(function (test) {
    var clicked = false;
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.event_keys = function () {
            return _super.prototype.event_keys.call(this).concat('click');
        };
        $mol_viewer_test.prototype.event = function (name) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (name) {
                case 'click': return this.clicks.apply(this, diff);
            }
            return _super.prototype.event.apply(this, [name].concat(diff));
        };
        $mol_viewer_test.prototype.clicks = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            clicked = true;
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    x.DOMTree().click();
    test.ok(clicked);
});
//# sourceMappingURL=viewer.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_clicker = (function (_super) {
        __extends($mol_clicker, _super);
        function $mol_clicker() {
            _super.apply(this, arguments);
        }
        $mol_clicker.prototype.clicks = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_clicker.prototype.everyClicks = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.clicks.apply(this, diff);
        };
        $mol_clicker.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.everyClicks.apply(this, diff);
                default: return _super.prototype.event.call(this, key);
            }
        };
        $mol_clicker.prototype.event_keys = function () {
            return (_super.prototype.event_keys.call(this) || []).concat(["click"]);
        };
        $mol_clicker.prototype.enabled = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (true);
        };
        $mol_clicker.prototype.tabIndex = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_clicker.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "mol_clicker_enabled": return this.enabled();
                case "tabindex": return this.tabIndex();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_clicker.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["mol_clicker_enabled", "tabindex"]);
        };
        return $mol_clicker;
    }($mol_viewer));
    $.$mol_clicker = $mol_clicker;
})($ || ($ = {}));
//# sourceMappingURL=clicker.view.tree.js.map
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
            $mol_clicker.prototype.everyClicks = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (this.enabled())
                    this.clicks.apply(this, diff);
            };
            $mol_clicker.prototype.tabIndex = function () {
                return this.enabled() ? 0 : null;
            };
            return $mol_clicker;
        }($.$mol_clicker));
        $mol.$mol_clicker = $mol_clicker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=clicker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_major;
    }($.$mol_clicker));
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
    }($.$mol_clicker));
    $.$mol_clicker_minor = $mol_clicker_minor;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_warn = (function (_super) {
        __extends($mol_clicker_warn, _super);
        function $mol_clicker_warn() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_warn;
    }($.$mol_clicker));
    $.$mol_clicker_warn = $mol_clicker_warn;
})($ || ($ = {}));
//# sourceMappingURL=clicker_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_checker = (function (_super) {
        __extends($mol_checker, _super);
        function $mol_checker() {
            _super.apply(this, arguments);
        }
        $mol_checker.prototype.checked = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_checker.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "mol_checker_checked": return this.checked();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_checker.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["mol_checker_checked"]);
        };
        return $mol_checker;
    }($.$mol_clicker));
    $.$mol_checker = $mol_checker;
})($ || ($ = {}));
//# sourceMappingURL=checker.view.tree.js.map
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
        var $mol_checker = (function (_super) {
            __extends($mol_checker, _super);
            function $mol_checker() {
                _super.apply(this, arguments);
            }
            $mol_checker.prototype.checked = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || false;
            };
            $mol_checker.prototype.clicks = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.checked(!this.checked());
                diff[0].preventDefault();
            };
            __decorate([
                $mol_prop()
            ], $mol_checker.prototype, "checked", null);
            __decorate([
                $mol_prop()
            ], $mol_checker.prototype, "clicks", null);
            return $mol_checker;
        }($.$mol_checker));
        $mol.$mol_checker = $mol_checker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=checker.view.js.map
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
    }($mol_viewer));
    $.$mol_rower = $mol_rower;
})($ || ($ = {}));
//# sourceMappingURL=rower.view.tree.js.map
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
    var $mol_checker_demo = (function (_super) {
        __extends($mol_checker_demo, _super);
        function $mol_checker_demo() {
            _super.apply(this, arguments);
        }
        $mol_checker_demo.prototype.one = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
            });
        };
        $mol_checker_demo.prototype.two = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (true);
                };
            });
        };
        $mol_checker_demo.prototype.three = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Unchecked").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_checker_demo.prototype.four = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Checked").map(function (val) { return val.valueOf(); })[0]);
                };
                _.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (true);
                };
            });
        };
        $mol_checker_demo.prototype.five = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
            });
        };
        $mol_checker_demo.prototype.six = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Disabled").map(function (val) { return val.valueOf(); })[0]);
                };
                _.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (true);
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
            });
        };
        $mol_checker_demo.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.one()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.two()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.three()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.four()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.five()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.six()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "one", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "two", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "three", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "four", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "five", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "six", null);
        return $mol_checker_demo;
    }($.$mol_rower));
    $.$mol_checker_demo = $mol_checker_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
    var $mol_doc = (function (_super) {
        __extends($mol_doc, _super);
        function $mol_doc() {
            _super.apply(this, arguments);
        }
        $mol_doc.prototype.title = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_doc.prototype.head = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.title()).map(function (val) { return val.valueOf(); })[0]);
        };
        $mol_doc.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.head();
                };
            });
        };
        $mol_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_doc.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.header()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.body()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_doc.prototype, "header", null);
        return $mol_doc;
    }($mol_viewer));
    $.$mol_doc = $mol_doc;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_doc_text = (function (_super) {
        __extends($mol_doc_text, _super);
        function $mol_doc_text() {
            _super.apply(this, arguments);
        }
        return $mol_doc_text;
    }($mol_viewer));
    $.$mol_doc_text = $mol_doc_text;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
        var $mol_doc = (function (_super) {
            __extends($mol_doc, _super);
            function $mol_doc() {
                _super.apply(this, arguments);
            }
            $mol_doc.prototype.title = function () {
                return this.constructor.objectPath();
            };
            return $mol_doc;
        }($.$mol_doc));
        $mol.$mol_doc = $mol_doc;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=doc.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_doc_screen = (function (_super) {
        __extends($mol_doc_screen, _super);
        function $mol_doc_screen() {
            _super.apply(this, arguments);
        }
        $mol_doc_screen.prototype.name = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "$mol_viewer";
        };
        $mol_doc_screen.prototype.widget = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_doc_screen.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.widget()).map(function (val) { return val.valueOf(); })[0]);
        };
        return $mol_doc_screen;
    }($mol_viewer));
    $.$mol_doc_screen = $mol_doc_screen;
})($ || ($ = {}));
//# sourceMappingURL=screen.view.tree.js.map
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
        var $mol_doc_screen = (function (_super) {
            __extends($mol_doc_screen, _super);
            function $mol_doc_screen() {
                _super.apply(this, arguments);
            }
            $mol_doc_screen.prototype.widget = function () {
                var Class = $[this.name()];
                return new Class();
            };
            __decorate([
                $mol_prop()
            ], $mol_doc_screen.prototype, "widget", null);
            return $mol_doc_screen;
        }($.$mol_doc_screen));
        $mol.$mol_doc_screen = $mol_doc_screen;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=screen.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_doc_screen_small = (function (_super) {
        __extends($mol_doc_screen_small, _super);
        function $mol_doc_screen_small() {
            _super.apply(this, arguments);
        }
        return $mol_doc_screen_small;
    }($.$mol_doc_screen));
    $.$mol_doc_screen_small = $mol_doc_screen_small;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_doc_screen_medium = (function (_super) {
        __extends($mol_doc_screen_medium, _super);
        function $mol_doc_screen_medium() {
            _super.apply(this, arguments);
        }
        return $mol_doc_screen_medium;
    }($.$mol_doc_screen));
    $.$mol_doc_screen_medium = $mol_doc_screen_medium;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_doc_screen_large = (function (_super) {
        __extends($mol_doc_screen_large, _super);
        function $mol_doc_screen_large() {
            _super.apply(this, arguments);
        }
        return $mol_doc_screen_large;
    }($.$mol_doc_screen));
    $.$mol_doc_screen_large = $mol_doc_screen_large;
})($ || ($ = {}));
//# sourceMappingURL=screen_types.view.tree.js.map
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
    var $mol_doc_screen_all = (function (_super) {
        __extends($mol_doc_screen_all, _super);
        function $mol_doc_screen_all() {
            _super.apply(this, arguments);
        }
        $mol_doc_screen_all.prototype.name = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "$mol_viewer";
        };
        $mol_doc_screen_all.prototype.small = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_medium().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name();
                };
            });
        };
        $mol_doc_screen_all.prototype.medium = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_small().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name();
                };
            });
        };
        $mol_doc_screen_all.prototype.large = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_large().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name();
                };
            });
        };
        $mol_doc_screen_all.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.small()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.medium()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.large()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_doc_screen_all.prototype, "small", null);
        __decorate([
            $mol_prop()
        ], $mol_doc_screen_all.prototype, "medium", null);
        __decorate([
            $mol_prop()
        ], $mol_doc_screen_all.prototype, "large", null);
        return $mol_doc_screen_all;
    }($mol_viewer));
    $.$mol_doc_screen_all = $mol_doc_screen_all;
})($ || ($ = {}));
//# sourceMappingURL=all.view.tree.js.map
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
    var $mol_checker_doc = (function (_super) {
        __extends($mol_checker_doc, _super);
        function $mol_checker_doc() {
            _super.apply(this, arguments);
        }
        $mol_checker_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Кнопка, переключающая состояние булевого свойства checked().").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Визуально показывает это состояние.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Изменяемость состояния определяется свойством enabled().").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_checker_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_checker_demo";
                };
            });
        };
        $mol_checker_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_checker_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_doc.prototype, "screens", null);
        return $mol_checker_doc;
    }($.$mol_doc));
    $.$mol_checker_doc = $mol_checker_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
    var $mol_clicker_demo_toolbar = (function (_super) {
        __extends($mol_clicker_demo_toolbar, _super);
        function $mol_clicker_demo_toolbar() {
            _super.apply(this, arguments);
        }
        $mol_clicker_demo_toolbar.prototype.events = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_clicker_demo_toolbar.prototype.major = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_major().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Click me!").map(function (val) { return val.valueOf(); })[0]);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.majorDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_major().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Click me!").map(function (val) { return val.valueOf(); })[0]);
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.minor = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_minor().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Or click me..").map(function (val) { return val.valueOf(); })[0]);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.minorDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_minor().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Or click me..").map(function (val) { return val.valueOf(); })[0]);
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.warn = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_warn().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Be attentive!").map(function (val) { return val.valueOf(); })[0]);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.warnDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_warn().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Be attentive!").map(function (val) { return val.valueOf(); })[0]);
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo_toolbar.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.major()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.majorDisabled()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.minor()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.minorDisabled()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.warn()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.warnDisabled()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "major", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "majorDisabled", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "minor", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "minorDisabled", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "warn", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo_toolbar.prototype, "warnDisabled", null);
        return $mol_clicker_demo_toolbar;
    }($.$mol_rower));
    $.$mol_clicker_demo_toolbar = $mol_clicker_demo_toolbar;
})($ || ($ = {}));
//# sourceMappingURL=toolbar.view.tree.js.map
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
        var $mol_clicker_demo_toolbar = (function (_super) {
            __extends($mol_clicker_demo_toolbar, _super);
            function $mol_clicker_demo_toolbar() {
                _super.apply(this, arguments);
            }
            $mol_clicker_demo_toolbar.prototype.events = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert(diff[0].srcElement.id);
            };
            return $mol_clicker_demo_toolbar;
        }($.$mol_clicker_demo_toolbar));
        $mol.$mol_clicker_demo_toolbar = $mol_clicker_demo_toolbar;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=toolbar.view.js.map
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
    var $mol_clicker_doc = (function (_super) {
        __extends($mol_clicker_doc, _super);
        function $mol_clicker_doc() {
            _super.apply(this, arguments);
        }
        $mol_clicker_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Кнопка.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Имеет различные вариации: major, minor, warn.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Кликабельность определяется своством enabled().").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_clicker_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_clicker_demo_toolbar";
                };
            });
        };
        $mol_clicker_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_doc.prototype, "screens", null);
        return $mol_clicker_doc;
    }($.$mol_doc));
    $.$mol_clicker_doc = $mol_clicker_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
        $mol_stacker.prototype.mainerFocused = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (true);
        };
        $mol_stacker.prototype.main = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_stacker.prototype.mainer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stacker_panel().setup(function (_) {
                _.focused = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.mainerFocused.apply(_this, diff);
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.main()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_stacker.prototype.addonerFocused = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_stacker.prototype.addon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_stacker.prototype.addoner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stacker_panel().setup(function (_) {
                _.focused = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.addonerFocused.apply(_this, diff);
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.addon()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_stacker.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.mainer()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.addoner()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_stacker.prototype, "mainer", null);
        __decorate([
            $mol_prop()
        ], $mol_stacker.prototype, "addoner", null);
        return $mol_stacker;
    }($mol_viewer));
    $.$mol_stacker = $mol_stacker;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_stacker_panel = (function (_super) {
        __extends($mol_stacker_panel, _super);
        function $mol_stacker_panel() {
            _super.apply(this, arguments);
        }
        $mol_stacker_panel.prototype.focused = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_stacker_panel.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "mol_stacker_focused": return this.focused();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_stacker_panel.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["mol_stacker_focused"]);
        };
        $mol_stacker_panel.prototype.focuses = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_stacker_panel.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.focuses.apply(this, diff);
                case "touchmove": return this.focuses.apply(this, diff);
                default: return _super.prototype.event.call(this, key);
            }
        };
        $mol_stacker_panel.prototype.event_keys = function () {
            return (_super.prototype.event_keys.call(this) || []).concat(["click", "touchmove"]);
        };
        return $mol_stacker_panel;
    }($mol_viewer));
    $.$mol_stacker_panel = $mol_stacker_panel;
})($ || ($ = {}));
//# sourceMappingURL=stacker.view.tree.js.map
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
        var $mol_stacker = (function (_super) {
            __extends($mol_stacker, _super);
            function $mol_stacker() {
                _super.apply(this, arguments);
            }
            $mol_stacker.prototype.addonerFocused = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.argument().link({});
                return diff[0] || false;
            };
            $mol_stacker.prototype.mainerFocused = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return !this.addonerFocused.apply(this, diff.map(function (v) { return !v; }));
            };
            __decorate([
                $mol_prop()
            ], $mol_stacker.prototype, "addonerFocused", null);
            return $mol_stacker;
        }($.$mol_stacker));
        $mol.$mol_stacker = $mol_stacker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_stacker_panel = (function (_super) {
            __extends($mol_stacker_panel, _super);
            function $mol_stacker_panel() {
                _super.apply(this, arguments);
            }
            $mol_stacker_panel.prototype.focuses = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.focused(true);
            };
            return $mol_stacker_panel;
        }($.$mol_stacker_panel));
        $mol.$mol_stacker_panel = $mol_stacker_panel;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=stacker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            _super.apply(this, arguments);
        }
        $mol_scroller.prototype.scrollTop = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_scroller.prototype.scrollLeft = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_scroller.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "scrollTop": return this.scrollTop();
                case "scrollLeft": return this.scrollLeft();
                default: return _super.prototype.field.call(this, key);
            }
        };
        $mol_scroller.prototype.field_keys = function () {
            return (_super.prototype.field_keys.call(this) || []).concat(["scrollTop", "scrollLeft"]);
        };
        $mol_scroller.prototype.scrolls = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_scroller.prototype.wheels = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_scroller.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "scroll": return this.scrolls.apply(this, diff);
                case "overflow": return this.scrolls.apply(this, diff);
                case "underflow": return this.scrolls.apply(this, diff);
                case "wheel": return this.wheels.apply(this, diff);
                default: return _super.prototype.event.call(this, key);
            }
        };
        $mol_scroller.prototype.event_keys = function () {
            return (_super.prototype.event_keys.call(this) || []).concat(["scroll", "overflow", "underflow", "wheel"]);
        };
        return $mol_scroller;
    }($mol_viewer));
    $.$mol_scroller = $mol_scroller;
})($ || ($ = {}));
//# sourceMappingURL=scroller.view.tree.js.map
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
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                _super.apply(this, arguments);
            }
            $mol_scroller.prototype.scrollTop = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ['scrollTop()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ['scrollLeft()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrolls = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var el = diff[0].target;
                this.scrollTop(el.scrollTop);
                this.scrollLeft(el.scrollLeft);
                diff[0].preventDefault();
            };
            $mol_scroller.prototype.wheels = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0].defaultPrevented)
                    return;
                var target = this.DOMNode();
                if ((target.scrollHeight > target.offsetHeight) || (target.scrollWidth > target.offsetWidth)) {
                    diff[0].preventDefault();
                    target.scrollTop -= diff[0].wheelDeltaY;
                    target.scrollLeft -= diff[0].wheelDeltaX;
                }
            };
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollTop", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollLeft", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrolls", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "wheels", null);
            return $mol_scroller;
        }($.$mol_scroller));
        $mol.$mol_scroller = $mol_scroller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=scroller.view.js.map
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
        $mol_linker.prototype.tagName = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "a";
        };
        $mol_linker.prototype.uri = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_linker.prototype.current = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_linker.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "href": return this.uri();
                case "mol_linker_current": return this.current();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_linker.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["href", "mol_linker_current"]);
        };
        $mol_linker.prototype.patch = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        return $mol_linker;
    }($mol_viewer));
    $.$mol_linker = $mol_linker;
})($ || ($ = {}));
//# sourceMappingURL=linker.view.tree.js.map
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
                return this.argument().link(this.patch());
            };
            $mol_linker.prototype.current = function () {
                return this.uri() === $mol_state_arg.link({});
            };
            __decorate([
                $mol_prop()
            ], $mol_linker.prototype, "uri", null);
            return $mol_linker;
        }($.$mol_linker));
        $mol.$mol_linker = $mol_linker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=linker.view.js.map
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
    var $mol_demo_all = (function (_super) {
        __extends($mol_demo_all, _super);
        function $mol_demo_all() {
            _super.apply(this, arguments);
        }
        $mol_demo_all.prototype.items = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_all.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_scroller().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.items();
                };
            });
        };
        $mol_demo_all.prototype.main = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.lister();
        };
        $mol_demo_all.prototype.options = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_all.prototype.optioner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_scroller().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.options();
                };
            });
        };
        $mol_demo_all.prototype.addon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.optioner();
        };
        __decorate([
            $mol_prop()
        ], $mol_demo_all.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_all.prototype, "optioner", null);
        return $mol_demo_all;
    }($.$mol_stacker));
    $.$mol_demo_all = $mol_demo_all;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_demo_all_item = (function (_super) {
        __extends($mol_demo_all_item, _super);
        function $mol_demo_all_item() {
            _super.apply(this, arguments);
        }
        $mol_demo_all_item.prototype.widget = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_demo_all_item.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.widget()).map(function (val) { return val.valueOf(); })[0]);
        };
        return $mol_demo_all_item;
    }($.$mol_scroller));
    $.$mol_demo_all_item = $mol_demo_all_item;
})($ || ($ = {}));
//# sourceMappingURL=all.view.tree.js.map
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
        var $mol_demo_all = (function (_super) {
            __extends($mol_demo_all, _super);
            function $mol_demo_all() {
                _super.apply(this, arguments);
            }
            $mol_demo_all.prototype.namesDemo = function () {
                var names = [];
                for (var name in $) {
                    if (!/^\$.*_demo($|_)/.test(name))
                        continue;
                    if (/^\$mol_demo_all/.test(name))
                        continue;
                    if (/^\$mol_doc/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    names.push(name.substring(1));
                }
                return names;
            };
            $mol_demo_all.prototype.namesDoc = function () {
                var names = [];
                for (var name in $) {
                    if (!/^\$.*_doc($|_)/.test(name))
                        continue;
                    if (/^\$mol_demo_all/.test(name))
                        continue;
                    if (/^\$mol_doc/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    names.push(name.substring(1));
                }
                return names;
            };
            $mol_demo_all.prototype.options = function () {
                var _this = this;
                return [null].concat(this.namesDoc()).map(function (name) { return _this.option(name); });
            };
            $mol_demo_all.prototype.items = function () {
                var _this = this;
                var selected = this.selected();
                if (selected) {
                    return [
                        this.widget(selected[0])
                    ];
                }
                else {
                    return this.namesDemo().map(function (name) { return _this.item(name); });
                }
            };
            $mol_demo_all.prototype.selected = function () {
                return this.argument().value('details');
            };
            $mol_demo_all.prototype.option = function (name) {
                return new $mol.$mol_linker().setup(function (obj) {
                    obj.childs = function () { return [name ? ('$' + name) : 'All']; };
                    obj.patch = function () { return ({ details: name }); };
                });
            };
            $mol_demo_all.prototype.item = function (name) {
                var _this = this;
                return new $.$mol_demo_all_item().setup(function (obj) {
                    obj.widget = function () { return [].concat(_this.widget(name)); };
                });
            };
            $mol_demo_all.prototype.itemLarge = function (name) {
                var _this = this;
                return new $.$mol_demo_all_item().setup(function (obj) {
                    obj.widget = function () { return [].concat(_this.widget(name + '-large')); };
                });
            };
            $mol_demo_all.prototype.itemMedium = function (name) {
                var _this = this;
                return new $.$mol_demo_all_item().setup(function (obj) {
                    obj.widget = function () { return [].concat(_this.widget(name + '-medium')); };
                });
            };
            $mol_demo_all.prototype.itemSmall = function (name) {
                var _this = this;
                return new $.$mol_demo_all_item().setup(function (obj) {
                    obj.widget = function () { return [].concat(_this.widget(name + '-small')); };
                });
            };
            $mol_demo_all.prototype.widget = function (name) {
                var _this = this;
                var Demo = $['$' + name.split('-')[0]];
                return new Demo().setup(function (obj) {
                    obj.argument = function () { return _this.argument().sub(name); };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "namesDemo", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "namesDoc", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "options", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "items", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "option", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "item", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "itemLarge", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "itemMedium", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "itemSmall", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_all.prototype, "widget", null);
            return $mol_demo_all;
        }($.$mol_demo_all));
        $mol.$mol_demo_all = $mol_demo_all;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=all.view.js.map
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
        $mol_form.prototype.submitAllow = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_form.prototype.formFields = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_form.prototype.barFields = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.formFields();
                };
            });
        };
        $mol_form.prototype.buttons = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_form.prototype.barButtons = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.buttons();
                };
            });
        };
        $mol_form.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.barFields()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.barButtons()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_form.prototype, "barFields", null);
        __decorate([
            $mol_prop()
        ], $mol_form.prototype, "barButtons", null);
        return $mol_form;
    }($mol_viewer));
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//# sourceMappingURL=form.view.tree.js.map
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
            $mol_form.prototype.submitAllow = function () {
                return this.formFields().every(function (field) { return field.errors().length === 0; });
            };
            __decorate([
                $mol_prop()
            ], $mol_form.prototype, "submitAllow", null);
            return $mol_form;
        }($.$mol_form));
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=form.view.js.map
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
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_form_field.prototype.namer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.name()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_form_field.prototype.errors = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_form_field.prototype.errorer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.errors();
                };
            });
        };
        $mol_form_field.prototype.label = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.namer()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.errorer()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_form_field.prototype.control = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_form_field.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.label()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.control()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_form_field.prototype, "namer", null);
        __decorate([
            $mol_prop()
        ], $mol_form_field.prototype, "errorer", null);
        __decorate([
            $mol_prop()
        ], $mol_form_field.prototype, "label", null);
        return $mol_form_field;
    }($mol_viewer));
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//# sourceMappingURL=field.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_stringer = (function (_super) {
        __extends($mol_stringer, _super);
        function $mol_stringer() {
            _super.apply(this, arguments);
        }
        $mol_stringer.prototype.hint = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_stringer.prototype.tabIndex = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_stringer.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "mol_stringer_hint": return this.hint();
                case "tabindex": return this.tabIndex();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_stringer.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["mol_stringer_hint", "tabindex"]);
        };
        $mol_stringer.prototype.editable = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (true);
        };
        $mol_stringer.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_stringer.prototype.valueChanged = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.value();
        };
        $mol_stringer.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "contentEditable": return this.editable();
                case "textContent": return this.valueChanged();
                default: return _super.prototype.field.call(this, key);
            }
        };
        $mol_stringer.prototype.field_keys = function () {
            return (_super.prototype.field_keys.call(this) || []).concat(["contentEditable", "textContent"]);
        };
        $mol_stringer.prototype.changes = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_stringer.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "input": return this.changes.apply(this, diff);
                default: return _super.prototype.event.call(this, key);
            }
        };
        $mol_stringer.prototype.event_keys = function () {
            return (_super.prototype.event_keys.call(this) || []).concat(["input"]);
        };
        return $mol_stringer;
    }($mol_viewer));
    $.$mol_stringer = $mol_stringer;
})($ || ($ = {}));
//# sourceMappingURL=stringer.view.tree.js.map
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
        var $mol_stringer = (function (_super) {
            __extends($mol_stringer, _super);
            function $mol_stringer() {
                _super.apply(this, arguments);
            }
            $mol_stringer.prototype.valueChanged = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.focused() ? void 0 : this.value();
            };
            $mol_stringer.prototype.changes = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.value(diff[0].srcElement.textContent.trim());
            };
            $mol_stringer.prototype.tabIndex = function () {
                return this.editable() ? 0 : null;
            };
            __decorate([
                $mol_prop()
            ], $mol_stringer.prototype, "valueChanged", null);
            return $mol_stringer;
        }($.$mol_stringer));
        $mol.$mol_stringer = $mol_stringer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=stringer.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_switcher = (function (_super) {
        __extends($mol_switcher, _super);
        function $mol_switcher() {
            _super.apply(this, arguments);
        }
        $mol_switcher.prototype.valueSelf = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_switcher.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.valueSelf()).map(function (val) { return val.valueOf(); })[0]);
        };
        $mol_switcher.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        return $mol_switcher;
    }($.$mol_checker));
    $.$mol_switcher = $mol_switcher;
})($ || ($ = {}));
//# sourceMappingURL=switcher.view.tree.js.map
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
            $mol_switcher.prototype.checked = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0] === void 0) {
                    return this.value() === this.valueSelf();
                }
                else {
                    return this.value(diff[0] ? this.valueSelf() : null);
                }
            };
            __decorate([
                $mol_prop()
            ], $mol_switcher.prototype, "checked", null);
            return $mol_switcher;
        }($.$mol_switcher));
        $mol.$mol_switcher = $mol_switcher;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=switcher.view.js.map
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
    var $mol_demo_signup = (function (_super) {
        __extends($mol_demo_signup, _super);
        function $mol_demo_signup() {
            _super.apply(this, arguments);
        }
        $mol_demo_signup.prototype.nameFirstErrors = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_signup.prototype.nameFirst = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_demo_signup.prototype.nameFirstControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Jack";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameFirst.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.nameFirstField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_form_field().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "First Name";
                };
                _.errors = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameFirstErrors();
                };
                _.control = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameFirstControl();
                };
            });
        };
        $mol_demo_signup.prototype.nameNickErrors = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_signup.prototype.nameNick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_demo_signup.prototype.nameNickControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Capitan";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameNick.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.nameNickField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_form_field().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Nick Name";
                };
                _.errors = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameNickErrors();
                };
                _.control = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameNickControl();
                };
            });
        };
        $mol_demo_signup.prototype.nameSecondErrors = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_signup.prototype.nameSecond = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_demo_signup.prototype.nameSecondControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Sparrow";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameSecond.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.nameSecondField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_form_field().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Second Name";
                };
                _.errors = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameSecondErrors();
                };
                _.control = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameSecondControl();
                };
            });
        };
        $mol_demo_signup.prototype.sexErrors = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_demo_signup.prototype.sex = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_demo_signup.prototype.sexOptionMale = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "male";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.sex.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.sexOptionFemale = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "female";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.sex.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.sexOptionCastrate = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "castrate";
                };
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.sex.apply(_this, diff);
                };
            });
        };
        $mol_demo_signup.prototype.sexField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_form_field().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Sex";
                };
                _.errors = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.sexErrors();
                };
                _.control = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.sexOptionMale()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.sexOptionFemale()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.sexOptionCastrate()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_demo_signup.prototype.formFields = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.nameFirstField()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.nameNickField()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.nameSecondField()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.sexField()).map(function (val) { return val.valueOf(); })[0]);
        };
        $mol_demo_signup.prototype.submitText = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "Sign Up";
        };
        $mol_demo_signup.prototype.submits = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_demo_signup.prototype.submit = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_major().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.submitText()).map(function (val) { return val.valueOf(); })[0]);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.submits.apply(_this, diff);
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.submitAllow();
                };
            });
        };
        $mol_demo_signup.prototype.buttons = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.submit()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameFirstControl", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameFirstField", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameNickControl", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameNickField", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameSecondControl", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "nameSecondField", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "sexOptionMale", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "sexOptionFemale", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "sexOptionCastrate", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "sexField", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_signup.prototype, "submit", null);
        return $mol_demo_signup;
    }($.$mol_form));
    $.$mol_demo_signup = $mol_demo_signup;
})($ || ($ = {}));
//# sourceMappingURL=signup.view.tree.js.map
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
        var $mol_demo_signup = (function (_super) {
            __extends($mol_demo_signup, _super);
            function $mol_demo_signup() {
                _super.apply(this, arguments);
            }
            $mol_demo_signup.prototype.nameFirst = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameFirst()"].concat(diff)) || '';
            };
            $mol_demo_signup.prototype.nameFirstErrors = function () {
                return this.nameFirst() ? [] : ['Input required'];
            };
            $mol_demo_signup.prototype.nameNick = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameNick()"].concat(diff)) || '';
            };
            $mol_demo_signup.prototype.nameSecond = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameSecond()"].concat(diff)) || '';
            };
            $mol_demo_signup.prototype.nameSecondErrors = function () {
                var value = this.nameSecond();
                if (value.length === 0)
                    return ['Input required'];
                var errors = [];
                if (value.length < 3)
                    errors.push('More then 2 letter required');
                if (value.indexOf(' ') !== -1)
                    errors.push('Spaces are forbidden');
                return errors;
            };
            $mol_demo_signup.prototype.sex = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["sex()"].concat(diff)) || '';
            };
            $mol_demo_signup.prototype.sexErrors = function () {
                return this.sex() ? [] : ['Input required'];
            };
            $mol_demo_signup.prototype.submits = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert("Hello, " + this.sex() + " " + this.nameFirst() + " (" + this.nameNick() + ") " + this.nameSecond() + "!");
            };
            __decorate([
                $mol_prop()
            ], $mol_demo_signup.prototype, "nameFirst", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_signup.prototype, "nameNick", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_signup.prototype, "nameSecond", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_signup.prototype, "sex", null);
            __decorate([
                $mol_prop()
            ], $mol_demo_signup.prototype, "submits", null);
            return $mol_demo_signup;
        }($.$mol_demo_signup));
        $mol.$mol_demo_signup = $mol_demo_signup;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=signup.view.js.map
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
    var $mol_linker_demo = (function (_super) {
        __extends($mol_linker_demo, _super);
        function $mol_linker_demo() {
            _super.apply(this, arguments);
        }
        $mol_linker_demo.prototype.linkRed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_linker().setup(function (_) {
                _.patch = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return ({ "color": "red" });
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Red").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_linker_demo.prototype.linkGreen = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_linker().setup(function (_) {
                _.patch = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return ({ "color": "green" });
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Green").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_linker_demo.prototype.linkBlue = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_linker().setup(function (_) {
                _.patch = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return ({ "color": "blue" });
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Blue").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_linker_demo.prototype.linkExternal = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_linker().setup(function (_) {
                _.uri = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "http://example.org";
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("example.org").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_linker_demo.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.linkRed()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.linkGreen()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.linkBlue()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.linkExternal()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_linker_demo.prototype, "linkRed", null);
        __decorate([
            $mol_prop()
        ], $mol_linker_demo.prototype, "linkGreen", null);
        __decorate([
            $mol_prop()
        ], $mol_linker_demo.prototype, "linkBlue", null);
        __decorate([
            $mol_prop()
        ], $mol_linker_demo.prototype, "linkExternal", null);
        return $mol_linker_demo;
    }($.$mol_rower));
    $.$mol_linker_demo = $mol_linker_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
    var $mol_linker_doc = (function (_super) {
        __extends($mol_linker_doc, _super);
        function $mol_linker_doc() {
            _super.apply(this, arguments);
        }
        $mol_linker_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Ссылка, умеющая парчить ссылку на текущую страницу.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Патч задаётся свойством patch() в виде словаря.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Также можно задать ссылку напрямую, через свойство uri().").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Ссылка, ведущая на текущую страницу, визуализируется некликабельной.").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_linker_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_linker_demo";
                };
            });
        };
        $mol_linker_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_linker_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_linker_doc.prototype, "screens", null);
        return $mol_linker_doc;
    }($.$mol_doc));
    $.$mol_linker_doc = $mol_linker_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
    var $mol_lister = (function (_super) {
        __extends($mol_lister, _super);
        function $mol_lister() {
            _super.apply(this, arguments);
        }
        $mol_lister.prototype.rowHeightMin = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (32);
        };
        $mol_lister.prototype.rows = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_lister.prototype.rowsVisible = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.rows();
        };
        $mol_lister.prototype.gap = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_lister.prototype.gapper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_lister_gapper().setup(function (_) {
                _.size = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.gap();
                };
            });
        };
        $mol_lister.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.rowsVisible()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.gapper()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_lister.prototype, "gapper", null);
        return $mol_lister;
    }($.$mol_scroller));
    $.$mol_lister = $mol_lister;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_lister_gapper = (function (_super) {
        __extends($mol_lister_gapper, _super);
        function $mol_lister_gapper() {
            _super.apply(this, arguments);
        }
        $mol_lister_gapper.prototype.size = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_lister_gapper.prototype.heightStyle = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "0";
        };
        $mol_lister_gapper.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "style.height": return this.heightStyle();
                default: return _super.prototype.field.call(this, key);
            }
        };
        $mol_lister_gapper.prototype.field_keys = function () {
            return (_super.prototype.field_keys.call(this) || []).concat(["style.height"]);
        };
        return $mol_lister_gapper;
    }($mol_viewer));
    $.$mol_lister_gapper = $mol_lister_gapper;
})($ || ($ = {}));
//# sourceMappingURL=lister.view.tree.js.map
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
        var $mol_lister = (function (_super) {
            __extends($mol_lister, _super);
            function $mol_lister() {
                _super.apply(this, arguments);
            }
            $mol_lister.prototype.rowsVisible = function () {
                var count = Math.ceil((this.scrollTop() + screen.height) / this.rowHeightMin());
                return this.rows().slice(0, count);
            };
            $mol_lister.prototype.gap = function () {
                var all = this.rows().length;
                var visible = this.rowsVisible().length;
                return (all - visible) * this.rowHeightMin();
            };
            return $mol_lister;
        }($.$mol_lister));
        $mol.$mol_lister = $mol_lister;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_lister_gapper = (function (_super) {
            __extends($mol_lister_gapper, _super);
            function $mol_lister_gapper() {
                _super.apply(this, arguments);
            }
            $mol_lister_gapper.prototype.heightStyle = function () {
                return this.size() + 'px';
            };
            return $mol_lister_gapper;
        }($.$mol_lister_gapper));
        $mol.$mol_lister_gapper = $mol_lister_gapper;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=lister.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_range_common = (function (_super) {
    __extends($mol_range_common, _super);
    function $mol_range_common() {
        _super.apply(this, arguments);
        this.length = 0;
    }
    $mol_range_common.prototype.get = function (id) {
        return;
    };
    Object.defineProperty($mol_range_common.prototype, '0', {
        get: function () {
            throw new Error('Direct access to items not supported. Use get( id : number ) method instead.');
        },
        enumerable: true,
        configurable: true
    });
    $mol_range_common.prototype.forEach = function (handle) {
        var length = this.length;
        for (var i = 0; i < length; ++i) {
            handle(this.get(i), i);
        }
    };
    $mol_range_common.prototype.valueOf = function () {
        var list = [];
        this.forEach(function (val) { return list.push(val); });
        return list;
    };
    $mol_range_common.prototype.concat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var ranges = args.map(function (range) { return range.valueOf(); });
        return (_a = this.valueOf()).concat.apply(_a, ranges);
        var _a;
    };
    $mol_range_common.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        var source = this;
        return new $mol_range_lazy({
            get: function (id) {
                return source.get(id + start);
            },
            get length() {
                return Math.min(end, source.length) - start;
            }
        });
    };
    $mol_range_common.prototype.join = function (delim) {
        if (delim === void 0) { delim = ','; }
        var list = [];
        this.forEach(function (val) { return list.push(val); });
        return list.join(delim);
    };
    $mol_range_common.prototype.every = function (check) {
        var res = true;
        this.forEach(function (val, id) {
            if (!res)
                return;
            res = check(val, id);
        });
        return res;
    };
    $mol_range_common.prototype.some = function (check) {
        var res = false;
        this.forEach(function (val, id) {
            if (res)
                return;
            res = check(val, id);
        });
        return res;
    };
    return $mol_range_common;
}(Array));
var $mol_range_lazy = (function (_super) {
    __extends($mol_range_lazy, _super);
    function $mol_range_lazy(source) {
        if (source === void 0) { source = {
            get: function (id) { return; },
            length: 0
        }; }
        _super.call(this);
        this.source = source;
    }
    $mol_range_lazy.prototype.get = function (id) {
        return this.source.get(id);
    };
    Object.defineProperty($mol_range_lazy.prototype, "length", {
        get: function () {
            return this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    return $mol_range_lazy;
}($mol_range_common));
//# sourceMappingURL=range.js.map
;
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 5; },
    });
    test.equal(list.valueOf()[2], 4);
    test.equal(list.valueOf()[5], void 0);
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return Number.POSITIVE_INFINITY; },
    });
    list = list.slice(2, 5);
    test.equal(list.join(), '4,6,8');
});
$mol_test(function (test) {
    var list1 = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; },
    });
    var list2 = new $mol_range_lazy({
        get: function (id) { return id * 3; },
        get length() { return 3; },
    });
    var list3 = new $mol_range_lazy({
        get: function (id) { return id * 4; },
        get length() { return 3; },
    });
    test.equal(list1.concat(list2, list3).join(), '0,2,4,0,3,6,0,4,8');
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; }
    });
    test.equal(list.every(function (v) { return v >= 0; }), true);
    test.equal(list.every(function (v) { return v > 0; }), false);
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; }
    });
    test.equal(list.some(function (v) { return v > 100; }), false);
    test.equal(list.some(function (v) { return v === 0; }), true);
});
//# sourceMappingURL=range.stage=test.js.map
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
    var $mol_rower_demo = (function (_super) {
        __extends($mol_rower_demo, _super);
        function $mol_rower_demo() {
            _super.apply(this, arguments);
        }
        $mol_rower_demo.prototype.publisher = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_checker().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Publish").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_rower_demo.prototype.hint = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "Title";
        };
        $mol_rower_demo.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.hint();
                };
            });
        };
        $mol_rower_demo.prototype.addButton = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_clicker_minor().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Add").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_rower_demo.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.publisher()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.titler()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.addButton()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "publisher", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "addButton", null);
        return $mol_rower_demo;
    }($.$mol_rower));
    $.$mol_rower_demo = $mol_rower_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
        var $mol_rower_demo = (function (_super) {
            __extends($mol_rower_demo, _super);
            function $mol_rower_demo() {
                _super.apply(this, arguments);
            }
            $mol_rower_demo.prototype.events = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert(diff[0].target.id);
            };
            return $mol_rower_demo;
        }($.$mol_rower_demo));
        $mol.$mol_rower_demo = $mol_rower_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_lister_demo = (function (_super) {
        __extends($mol_lister_demo, _super);
        function $mol_lister_demo() {
            _super.apply(this, arguments);
        }
        $mol_lister_demo.prototype.rowHeightMin = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (50);
        };
        return $mol_lister_demo;
    }($.$mol_lister));
    $.$mol_lister_demo = $mol_lister_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
        var $mol_lister_demo = (function (_super) {
            __extends($mol_lister_demo, _super);
            function $mol_lister_demo() {
                _super.apply(this, arguments);
            }
            $mol_lister_demo.prototype.rows = function () {
                var _this = this;
                return new $mol_range_lazy({
                    get: function (id) { return _this.rower(id + 1); },
                    length: 1000,
                });
            };
            $mol_lister_demo.prototype.rower = function (id) {
                return new $mol.$mol_rower_demo().setup(function (obj) {
                    obj.hint = function () { return ("Title #" + id); };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_lister_demo.prototype, "rower", null);
            return $mol_lister_demo;
        }($.$mol_lister_demo));
        $mol.$mol_lister_demo = $mol_lister_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=demo.view.js.map
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
    var $mol_lister_doc = (function (_super) {
        __extends($mol_lister_doc, _super);
        function $mol_lister_doc() {
            _super.apply(this, arguments);
        }
        $mol_lister_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Спискок строк с ленивым рендерингом.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Минимальная высота строки задаётся свойством rowHeightMin() ").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" На его основе определяется сколько рендерить строк, чтобы заполнить видимую область с учётом скроллинга.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Список строк задаётся свойством rows() и может представлять из себя как массив так и ленивый диапазон ($mol_range).").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_lister_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_lister_demo";
                };
            });
        };
        $mol_lister_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_lister_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_lister_doc.prototype, "screens", null);
        return $mol_lister_doc;
    }($.$mol_doc));
    $.$mol_lister_doc = $mol_lister_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
;
function $mol_maybe(value) {
    return (value == null) ? [] : [value];
}
//# sourceMappingURL=maybe.js.map
;
$mol_test(function (test) {
    test.equal($mol_maybe(0)[0], 0);
    test.equal($mol_maybe(false)[0], false);
    test.equal($mol_maybe(null)[0], void 0);
    test.equal($mol_maybe(void 0)[0], void 0);
    test.equal($mol_maybe(void 0).map(String)[0], void 0);
    test.equal($mol_maybe(0).map(function (v) { return v.toString(); })[0], '0');
});
//# sourceMappingURL=maybe.stage=test.js.map
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
    var $mol_perf_render = (function (_super) {
        __extends($mol_perf_render, _super);
        function $mol_perf_render() {
            _super.apply(this, arguments);
        }
        $mol_perf_render.prototype.titler = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_perf_render_titler().setup(function (_) {
            });
        };
        $mol_perf_render.prototype.runnerLabel = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "Run";
        };
        $mol_perf_render.prototype.runs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_perf_render.prototype.runner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_perf_render_runner().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.runnerLabel()).map(function (val) { return val.valueOf(); })[0]);
                };
                _.clicks = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.runs.apply(_this, diff);
                };
            });
        };
        $mol_perf_render.prototype.head = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.titler()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.runner()).map(function (val) { return val.valueOf(); })[0]);
        };
        $mol_perf_render.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.head()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_perf_render.prototype.rows = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_perf_render.prototype.rower = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.rows()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_perf_render.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.header()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.rower()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "runner", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "header", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "rower", null);
        return $mol_perf_render;
    }($mol_viewer));
    $.$mol_perf_render = $mol_perf_render;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_render_titler = (function (_super) {
        __extends($mol_perf_render_titler, _super);
        function $mol_perf_render_titler() {
            _super.apply(this, arguments);
        }
        $mol_perf_render_titler.prototype.tagName = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "h2";
        };
        $mol_perf_render_titler.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe("$mol").map(function (val) { return val.valueOf(); })[0]);
        };
        return $mol_perf_render_titler;
    }($mol_viewer));
    $.$mol_perf_render_titler = $mol_perf_render_titler;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_render_runner = (function (_super) {
        __extends($mol_perf_render_runner, _super);
        function $mol_perf_render_runner() {
            _super.apply(this, arguments);
        }
        $mol_perf_render_runner.prototype.tagName = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "button";
        };
        return $mol_perf_render_runner;
    }($.$mol_clicker_major));
    $.$mol_perf_render_runner = $mol_perf_render_runner;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_render_row = (function (_super) {
        __extends($mol_perf_render_row, _super);
        function $mol_perf_render_row() {
            _super.apply(this, arguments);
        }
        $mol_perf_render_row.prototype.selected = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_perf_render_row.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "mol_perf_render_row_selected": return this.selected();
                default: return _super.prototype.attr.call(this, key);
            }
        };
        $mol_perf_render_row.prototype.attr_keys = function () {
            return (_super.prototype.attr_keys.call(this) || []).concat(["mol_perf_render_row_selected"]);
        };
        $mol_perf_render_row.prototype.toggles = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (null);
        };
        $mol_perf_render_row.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.toggles.apply(this, diff);
                default: return _super.prototype.event.call(this, key);
            }
        };
        $mol_perf_render_row.prototype.event_keys = function () {
            return (_super.prototype.event_keys.call(this) || []).concat(["click"]);
        };
        $mol_perf_render_row.prototype.label = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_perf_render_row.prototype.bar = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $mol_viewer().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.label()).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_perf_render_row.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.bar()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "bar", null);
        return $mol_perf_render_row;
    }($mol_viewer));
    $.$mol_perf_render_row = $mol_perf_render_row;
})($ || ($ = {}));
//# sourceMappingURL=render.view.tree.js.map
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
        var $mol_perf_render = (function (_super) {
            __extends($mol_perf_render, _super);
            function $mol_perf_render() {
                _super.apply(this, arguments);
            }
            $mol_perf_render.prototype.runnerLabel = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || 'Run';
            };
            $mol_perf_render.prototype.runs = function () {
                var _this = this;
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var data = window['_buildData']();
                var date = Date.now();
                this.data(data);
                this.selectedItem(null);
                setTimeout(function () { return _this.runnerLabel((Date.now() - date) + " ms"); });
            };
            $mol_perf_render.prototype.rows = function () {
                var _this = this;
                return this.data().map(function (_, id) { return _this.row(id); });
            };
            $mol_perf_render.prototype.row = function (id) {
                var _this = this;
                return new $mol_perf_render_row().setup(function (obj) {
                    obj.data = function () { return _this.data()[id]; };
                    obj.selected = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        if (diff[0] !== void 0)
                            _this.selectedItem(diff[0] === void 0 ? null : id);
                        return _this.selectedItem() === id;
                    };
                });
            };
            $mol_perf_render.prototype.data = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || [];
            };
            $mol_perf_render.prototype.selectedItem = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return (diff[0] === void 0) ? null : diff[0];
            };
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "runnerLabel", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "rows", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "row", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "data", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "selectedItem", null);
            return $mol_perf_render;
        }($.$mol_perf_render));
        $mol.$mol_perf_render = $mol_perf_render;
        var $mol_perf_render_row = (function (_super) {
            __extends($mol_perf_render_row, _super);
            function $mol_perf_render_row() {
                _super.apply(this, arguments);
            }
            $mol_perf_render_row.prototype.data = function () { return { id: 0, label: '' }; };
            $mol_perf_render_row.prototype.label = function () { return this.data().label; };
            $mol_perf_render_row.prototype.toggles = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.selected(!this.selected());
            };
            return $mol_perf_render_row;
        }($.$mol_perf_render_row));
        $mol.$mol_perf_render_row = $mol_perf_render_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=render.view.js.map
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
    var $mol_rower_doc = (function (_super) {
        __extends($mol_rower_doc, _super);
        function $mol_rower_doc() {
            _super.apply(this, arguments);
        }
        $mol_rower_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Горизонтальный список блоков с отступами между элементами.").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_rower_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_rower_demo";
                };
            });
        };
        $mol_rower_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_rower_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_doc.prototype, "screens", null);
        return $mol_rower_doc;
    }($.$mol_doc));
    $.$mol_rower_doc = $mol_rower_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
    var $mol_stacker_demo = (function (_super) {
        __extends($mol_stacker_demo, _super);
        function $mol_stacker_demo() {
            _super.apply(this, arguments);
        }
        $mol_stacker_demo.prototype.main = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_lister_demo().setup(function (_) {
            });
        };
        $mol_stacker_demo.prototype.addon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_rower().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Navigation menu").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_stacker_demo.prototype, "main", null);
        __decorate([
            $mol_prop()
        ], $mol_stacker_demo.prototype, "addon", null);
        return $mol_stacker_demo;
    }($.$mol_stacker));
    $.$mol_stacker_demo = $mol_stacker_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
    var $mol_stacker_doc = (function (_super) {
        __extends($mol_stacker_doc, _super);
        function $mol_stacker_doc() {
            _super.apply(this, arguments);
        }
        $mol_stacker_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Используется для разделения экрана на две панели: основную (mainer) и дополнительную (addoner).").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" При нехватке пространства, дополнительная панель схлопывается в узкую полосу.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Развернуть дополнительную панель и свернуть обратно можно кликом или свайпом.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Размер дополнительной панели подстраивается под размер содержимого, но не превышает половины экрана.").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_stacker_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_stacker_demo";
                };
            });
        };
        $mol_stacker_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_stacker_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_stacker_doc.prototype, "screens", null);
        return $mol_stacker_doc;
    }($.$mol_doc));
    $.$mol_stacker_doc = $mol_stacker_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
    var $mol_stringer_demo = (function (_super) {
        __extends($mol_stringer_demo, _super);
        function $mol_stringer_demo() {
            _super.apply(this, arguments);
        }
        $mol_stringer_demo.prototype.name = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_stringer_demo.prototype.one = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name.apply(_this, diff);
                };
            });
        };
        $mol_stringer_demo.prototype.two = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name.apply(_this, diff);
                };
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Batman";
                };
            });
        };
        $mol_stringer_demo.prototype.three = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_stringer().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name.apply(_this, diff);
                };
                _.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Jocker";
                };
                _.editable = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
            });
        };
        $mol_stringer_demo.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.one()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.two()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.three()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_stringer_demo.prototype, "one", null);
        __decorate([
            $mol_prop()
        ], $mol_stringer_demo.prototype, "two", null);
        __decorate([
            $mol_prop()
        ], $mol_stringer_demo.prototype, "three", null);
        return $mol_stringer_demo;
    }($.$mol_rower));
    $.$mol_stringer_demo = $mol_stringer_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
        var $mol_stringer_demo = (function (_super) {
            __extends($mol_stringer_demo, _super);
            function $mol_stringer_demo() {
                _super.apply(this, arguments);
            }
            $mol_stringer_demo.prototype.name = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || '';
            };
            __decorate([
                $mol_prop()
            ], $mol_stringer_demo.prototype, "name", null);
            return $mol_stringer_demo;
        }($.$mol_stringer_demo));
        $mol.$mol_stringer_demo = $mol_stringer_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=demo.view.js.map
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
    var $mol_stringer_doc = (function (_super) {
        __extends($mol_stringer_doc, _super);
        function $mol_stringer_doc() {
            _super.apply(this, arguments);
        }
        $mol_stringer_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Поле ввода одной строки текста.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Текущее значение доступно через свойство value().").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Пустому полю можно задать подсказку через свойство hint().").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Редактируемость определяется свойством editable().").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_stringer_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_stringer_demo";
                };
            });
        };
        $mol_stringer_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_stringer_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_stringer_doc.prototype, "screens", null);
        return $mol_stringer_doc;
    }($.$mol_doc));
    $.$mol_stringer_doc = $mol_stringer_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
    var $mol_switcher_demo = (function (_super) {
        __extends($mol_switcher_demo, _super);
        function $mol_switcher_demo() {
            _super.apply(this, arguments);
        }
        $mol_switcher_demo.prototype.color = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_switcher_demo.prototype.one = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.color.apply(_this, diff);
                };
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "red";
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("red (default)").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_switcher_demo.prototype.two = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.color.apply(_this, diff);
                };
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "green";
                };
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("green").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_switcher_demo.prototype.three = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.color.apply(_this, diff);
                };
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "";
                };
            });
        };
        $mol_switcher_demo.prototype.four = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_switcher().setup(function (_) {
                _.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.color.apply(_this, diff);
                };
                _.valueSelf = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "black";
                };
                _.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (false);
                };
            });
        };
        $mol_switcher_demo.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.one()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.two()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.three()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.four()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_switcher_demo.prototype, "one", null);
        __decorate([
            $mol_prop()
        ], $mol_switcher_demo.prototype, "two", null);
        __decorate([
            $mol_prop()
        ], $mol_switcher_demo.prototype, "three", null);
        __decorate([
            $mol_prop()
        ], $mol_switcher_demo.prototype, "four", null);
        return $mol_switcher_demo;
    }($.$mol_rower));
    $.$mol_switcher_demo = $mol_switcher_demo;
})($ || ($ = {}));
//# sourceMappingURL=demo.view.tree.js.map
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
        var $mol_switcher_demo = (function (_super) {
            __extends($mol_switcher_demo, _super);
            function $mol_switcher_demo() {
                _super.apply(this, arguments);
            }
            $mol_switcher_demo.prototype.color = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return 'red';
                return diff[0];
            };
            __decorate([
                $mol_prop()
            ], $mol_switcher_demo.prototype, "color", null);
            return $mol_switcher_demo;
        }($.$mol_switcher_demo));
        $mol.$mol_switcher_demo = $mol_switcher_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=demo.view.js.map
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
    var $mol_switcher_doc = (function (_super) {
        __extends($mol_switcher_doc, _super);
        function $mol_switcher_doc() {
            _super.apply(this, arguments);
        }
        $mol_switcher_doc.prototype.description = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_text().setup(function (_) {
                _.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(" Кнопки, переключающие состояние свойства value() на основе собственного значения valueSelf().").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Визуально показывают, эквивалентны ли эти два значения друг другу.").map(function (val) { return val.valueOf(); })[0], $mol_maybe(" Изменяемость состояния определяется свойством editable().").map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_switcher_doc.prototype.screens = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return new $.$mol_doc_screen_all().setup(function (_) {
                _.name = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "$mol_switcher_demo";
                };
            });
        };
        $mol_switcher_doc.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.description()).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.screens()).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_switcher_doc.prototype, "description", null);
        __decorate([
            $mol_prop()
        ], $mol_switcher_doc.prototype, "screens", null);
        return $mol_switcher_doc;
    }($.$mol_doc));
    $.$mol_switcher_doc = $mol_switcher_doc;
})($ || ($ = {}));
//# sourceMappingURL=doc.view.tree.js.map
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
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_tiler.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.items()).map(function (val) { return val.valueOf(); })[0]);
        };
        return $mol_tiler;
    }($mol_viewer));
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//# sourceMappingURL=tiler.view.tree.js.map
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
                return new $mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupItems(path); };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "childs", null);
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "groupItems", null);
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "groupChilds", null);
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "child", null);
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "group", null);
            __decorate([
                $mol_prop()
            ], $mol_tiler.prototype, "item", null);
            return $mol_tiler;
        }($.$mol_tiler));
        $mol.$mol_tiler = $mol_tiler;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=tiler.view.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//# sourceMappingURL=type.js.map
;
var $mol_tree = (function () {
    function $mol_tree(config) {
        this.type = config.type || '';
        if (config.value) {
            var childs = $mol_tree.values(config.value);
            if (config.type || childs.length > 1) {
                this.childs = childs.concat(config.childs || []);
                this.data = config.data || '';
            }
            else {
                this.data = childs[0].data;
                this.childs = config.childs || [];
            }
        }
        else {
            this.data = config.data || '';
            this.childs = config.childs || [];
        }
        this.baseUri = config.baseUri || '';
        this.row = config.row || 0;
        this.col = config.col || 0;
    }
    $mol_tree.values = function (str, baseUri) {
        return str.split('\n').map(function (data, index) { return new $mol_tree({
            data: data,
            baseUri: baseUri,
            row: index + 1
        }); });
    };
    $mol_tree.prototype.clone = function (config) {
        return new $mol_tree({
            type: ('type' in config) ? config.type : this.type,
            data: ('data' in config) ? config.data : this.data,
            childs: ('childs' in config) ? config.childs : this.childs,
            baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
            row: ('row' in config) ? config.row : this.row,
            col: ('col' in config) ? config.col : this.col,
            value: config.value
        });
    };
    $mol_tree.fromString = function (str, baseUri) {
        var root = new $mol_tree({ baseUri: baseUri });
        var stack = [root];
        var row = 0;
        var lines = String(str).split(/\n/);
        lines.forEach(function (line) {
            ++row;
            var chunks = /^(\t*)((?:[^\n\t= ]+ *)*)(=[^\n]*)?/.exec(line);
            if (!chunks)
                new Error("Syntax error at " + baseUri + "#" + row + "\n" + line);
            var indent = chunks[1];
            var path = chunks[2];
            var data = chunks[3];
            var deep = indent.length;
            var types = path ? path.split(/ +/) : [];
            if (stack.length < deep)
                throw new Error("Too many tabs at " + baseUri + "#" + row + "\n" + line);
            stack.length = deep + 1;
            var parent = stack[deep];
            types.forEach(function (type) {
                if (!type)
                    return;
                var next = new $mol_tree({
                    type: type,
                    baseUri: baseUri,
                    row: row
                });
                parent.childs.push(next);
                parent = next;
            });
            if (data) {
                var next = new $mol_tree({
                    data: data.substring(1),
                    baseUri: baseUri,
                    row: row
                });
                parent.childs.push(next);
                parent = next;
            }
            stack.push(parent);
        });
        return root;
    };
    $mol_tree.fromJSON = function (json, baseUri) {
        if (baseUri === void 0) { baseUri = ''; }
        var type = $jin_type(json);
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
                    type: "list",
                    childs: json.map(function (json) { return $mol_tree.fromJSON(json, baseUri); })
                });
            case 'Date':
                return new $mol_tree({
                    type: "time",
                    value: json.toISOString(),
                    baseUri: baseUri
                });
            case 'Object':
                var childs = [];
                for (var key in json) {
                    if (json[key] === undefined)
                        continue;
                    if (/^[^\n\t= ]+$/.test(key)) {
                        var child = new $mol_tree({
                            type: key,
                            baseUri: baseUri
                        });
                    }
                    else {
                        var child = new $mol_tree({
                            value: key,
                            baseUri: baseUri
                        });
                    }
                    child.childs.push(new $mol_tree({
                        type: ":",
                        childs: [$mol_tree.fromJSON(json[key], baseUri)],
                        baseUri: baseUri
                    }));
                    childs.push(child);
                }
                return new $mol_tree({
                    type: "dict",
                    childs: childs,
                    baseUri: baseUri
                });
            default:
                throw new Error("Unsupported type (" + type + ") at " + baseUri);
        }
    };
    Object.defineProperty($mol_tree.prototype, "uri", {
        get: function () {
            return this.baseUri + '#' + this.row + ':' + this.col;
        },
        enumerable: true,
        configurable: true
    });
    $mol_tree.prototype.toString = function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        var output = '';
        if (this.type.length) {
            if (!prefix.length) {
                prefix = "\t";
            }
            output += this.type + " ";
            if (this.childs.length == 1) {
                return output + this.childs[0].toString(prefix);
            }
            output += "\n";
        }
        else if (this.data.length || prefix.length) {
            output += "=" + this.data + "\n";
        }
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var child = _a[_i];
            output += prefix;
            output += child.toString(prefix + "\t");
        }
        return output;
    };
    $mol_tree.prototype.toJSON = function () {
        if (!this.type)
            return this.value;
        if (this.type === '//')
            return undefined;
        if (this.type === 'true')
            return true;
        if (this.type === 'false')
            return false;
        if (this.type === 'null')
            return null;
        if (this.type === 'dict') {
            var obj = {};
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                var key = child.type || child.value;
                if (key === '//')
                    continue;
                var colon = child.select([':']).childs[0];
                if (!colon)
                    throw new Error("Required colon after key at " + child.uri);
                var val = colon.childs[0].toJSON();
                if (val !== undefined)
                    obj[key] = val;
            }
            return obj;
        }
        if (this.type === 'list') {
            var res = [];
            this.childs.forEach(function (child) {
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
        throw new Error("Unknown type (" + this.type + ") at " + this.uri);
    };
    Object.defineProperty($mol_tree.prototype, "value", {
        get: function () {
            var values = [];
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        },
        enumerable: true,
        configurable: true
    });
    $mol_tree.prototype.select = function (path) {
        if (typeof path === 'string')
            path = path.split(/ +/);
        var next = [this];
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var type = path_1[_i];
            if (!next.length)
                break;
            var prev = next;
            next = [];
            for (var _a = 0, prev_1 = prev; _a < prev_1.length; _a++) {
                var item = prev_1[_a];
                for (var _b = 0, _c = item.childs; _b < _c.length; _b++) {
                    var child = _c[_b];
                    if (child.type == type) {
                        next.push(child);
                    }
                }
            }
        }
        return new $mol_tree({ childs: next });
    };
    $mol_tree.prototype.filter = function (path, value) {
        if (typeof path === 'string')
            path = path.split(/ +/);
        var childs = this.childs.filter(function (item) {
            var found = item.select(path);
            if (value == null) {
                return Boolean(found.childs.length);
            }
            else {
                return found.childs.some(function (child) { return child.value == value; });
            }
        });
        return new $mol_tree({ childs: childs });
    };
    return $mol_tree;
}());
//# sourceMappingURL=tree.js.map
;
$mol_test(function (test) {
    test.equal($mol_tree.fromString("foo\nbar\n").childs.length, 2);
    test.equal($mol_tree.fromString("foo\nbar\n").childs[1].type, "bar");
    test.equal($mol_tree.fromString("foo\n\n\n").childs.length, 1);
    test.equal($mol_tree.fromString("=foo\n=bar\n").childs.length, 2);
    test.equal($mol_tree.fromString("=foo\n=bar\n").childs[1].data, "bar");
    test.equal($mol_tree.fromString("foo bar =pol").childs[0].childs[0].childs[0].data, "pol");
    test.equal($mol_tree.fromString("foo bar\n\t=pol\n\t=men").childs[0].childs[0].childs[1].data, "men");
    test.equal($mol_tree.fromString('foo bar =text\n').toString(), 'foo bar =text\n');
});
//# sourceMappingURL=tree.stage=test.js.map
;
function $mol_viewer_tree2ts(tree) {
    var content = '';
    tree.childs.forEach(function (def) {
        if (!def.type || /^-/.test(def.type))
            return;
        if (!/^\$\w+$/.test(def.type))
            throw new Error('Wrong component name: ' + def + def.uri);
        var parent = def.childs[0];
        var members = {};
        parent.childs.forEach(function (param) { addProp(param); });
        function addProp(param) {
            if (!param.type || /^-/.test(param.type))
                return;
            var needKey = false;
            var needSet = true;
            var needCache = false;
            var needReturn = true;
            var keys = [];
            function getValue(value) {
                switch (value.type[0]) {
                    case void 0:
                        return JSON.stringify(value.value);
                    case '-':
                        return null;
                    case '/':
                        var items = [];
                        value.childs.forEach(function (item) {
                            var val = getValue(item);
                            if (val)
                                items.push('$' + 'mol_maybe(' + val + ').map( val => val.valueOf() )[0]');
                        });
                        return '[].concat( ' + items.join(' , ') + ' )';
                    case '$':
                        needCache = true;
                        var overs = [];
                        value.childs.forEach(function (over) {
                            if (/^(-|$)/.test(over.type))
                                return '';
                            overs.push('\t\t_.' + over.type + ' = ( ...diff : any[] ) => ' + getValue(over.childs[0]) + '\n');
                        });
                        return 'new ' + value.type + '().setup( _ => { \n' + overs.join('') + '\t} )';
                    case '*':
                        needKey = true;
                        needReturn = false;
                        var opts = [];
                        value.childs.forEach(function (opt) {
                            if (/^(-|$)/.test(opt.type))
                                return '';
                            keys.push(opt.type);
                            opts.push('\t\tcase "' + opt.type + '" : return ' + getValue(opt.childs[0]) + '\n');
                        });
                        return 'switch( key ){\n' + opts.join('') + '\t\tdefault: return super.' + param.type + '( key )\n\t}';
                    case ':':
                        return '( ' + JSON.stringify(value.childs[0]) + ' )';
                    case '>':
                        needSet = true;
                        if (value.childs.length === 1) {
                            addProp(value.childs[0]);
                            return 'this.' + value.childs[0].type + '( ...diff )';
                        }
                    case '<':
                        if (value.childs.length === 1) {
                            addProp(value.childs[0]);
                            return 'this.' + value.childs[0].type + '()';
                        }
                    default:
                        throw new Error('Wrong value: ' + value + value.uri);
                }
            }
            if (param.childs.length > 1)
                throw new Error('Too more childs: ' + param + param.uri);
            param.childs.forEach(function (child) {
                var val = getValue(child);
                var args = [];
                if (needKey)
                    args.push(' key : any ');
                if (needSet)
                    args.push(' ...diff : any[] ');
                if (needReturn)
                    val = 'return ' + val;
                var decl = '\t' + param.type + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                if (needCache)
                    decl = '\t@ $' + 'mol_prop()\n' + decl;
                members[param.type] = decl;
                if (needKey) {
                    members[param.type + '_keys'] = '\t' + param.type + '_keys(){\n\t\treturn ( super.' + param.type + '_keys() || [] ).concat( ' + JSON.stringify(keys) + ' )\n\t}\n\n';
                }
            });
        }
        var body = Object.keys(members).map(function (name) {
            return members[name] || '\t' + name + '() { return null }\n\t}\n';
        }).join('');
        var classes = 'module $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
        content += classes + '\n';
    });
    return content;
}
//# sourceMappingURL=tree2ts.js.map
//# sourceMappingURL=index.env=web.stage=test.js.map