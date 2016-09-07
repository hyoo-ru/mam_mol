document.addEventListener('DOMContentLoaded', function (event) {
    $mol_test_run();
});
//test.env=web.stage=test.js.map
;
$mol_test(function (test) {
    test.ok(1);
    test.not(0);
    test.equal(2, 2);
    test.unique([3], [3]);
    test.done();
});
//test.stage=test.js.map
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
//mol.stage=test.js.map
;
$mol_test(function scalars(test) {
    test.equal($jin_type(void 0), 'Undefined');
    test.equal($jin_type(null), 'Null');
    test.equal($jin_type(0), 'Number');
    test.equal($jin_type(''), 'String');
    test.equal($jin_type(false), 'Boolean');
});
$mol_test(function common_objects(test) {
    test.equal($jin_type({}), 'Object');
    test.equal($jin_type([]), 'Array');
    test.equal($jin_type(arguments), 'Arguments');
});
$mol_test(function special_objects(test) {
    test.equal($jin_type(function () { return this; }()), 'Global');
    test.equal($jin_type(new Date), 'Date');
    test.equal($jin_type(new RegExp('')), 'RegExp');
});
//type_tests.test.js.map
;
$mol_test(function parse_n_serial(test) {
    test.equal($jin.time.duration('P42.1Y').toString(), 'P42.1YT');
    test.equal($jin.time.duration('P42.1M').toString(), 'P42.1MT');
    test.equal($jin.time.duration('P42.1D').toString(), 'P42.1DT');
    test.equal($jin.time.duration('PT42.1h').toString(), 'PT42.1H');
    test.equal($jin.time.duration('PT42.1m').toString(), 'PT42.1M');
    test.equal($jin.time.duration('PT42.1s').toString(), 'PT42.1S');
    test.equal($jin.time.duration('P1Y2M3DT4h5m6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
});
$mol_test(function format_typed(test) {
    test.equal($jin.time.duration('P1Y2M3DT4h5m6s').toString('P#Y#M#DT#h#m#s'), 'P1Y2M3DT4H5M6S');
});
//duration_tests.stage=dev.js.map
;
$mol_test(function parse_n_serial(test) {
    test.equal($jin.time.moment('2014').toString(), '2014');
    test.equal($jin.time.moment('2014-01').toString(), '2014-01');
    test.equal($jin.time.moment('2014-01-02').toString(), '2014-01-02');
    test.equal($jin.time.moment('2014-01-02T03').toString(), '2014-01-02T03');
    test.equal($jin.time.moment('2014-01-02T03:04').toString(), '2014-01-02T03:04');
    test.equal($jin.time.moment('2014-01-02T03:04:05').toString(), '2014-01-02T03:04:05');
    test.equal($jin.time.moment('2014-01-02T03:04:05.006').toString(), '2014-01-02T03:04:05.006');
    test.equal($jin.time.moment('2014-01-02T03:04:05.006Z').toString(), '2014-01-02T03:04:05.006+00:00');
    test.equal($jin.time.moment('2014-01-02T03:04:05.006+07:00').toString(), '2014-01-02T03:04:05.006+07:00');
    test.equal($jin.time.moment('2014-01-02T03:04:05+07:08').toString(), '2014-01-02T03:04:05+07:08');
    test.equal($jin.time.moment('2014-01-02T03:04+07:08').toString(), '2014-01-02T03:04+07:08');
    test.equal($jin.time.moment('T03:04+07:08').toString(), 'T03:04+07:08');
    test.equal($jin.time.moment('T03:04:05').toString(), 'T03:04:05');
    test.equal($jin.time.moment('T03:04').toString(), 'T03:04');
    test.equal($jin.time.moment('T03').toString(), 'T03');
});
$mol_test(function format_simple(test) {
    test.equal($jin.time.moment('2014-01-02T01:02:03.000').toString('AD YY-M-D h:m:s'), '21 14-1-2 1:2:3');
});
$mol_test(function format_padded(test) {
    test.equal($jin.time.moment('2014-01-02T01:02:03.000').toString('YYYY-MM-DD hh:mm:ss'), '2014-01-02 01:02:03');
});
$mol_test(function format_time_zone(test) {
    test.equal($jin.time.moment('2014-01-02T01:02:03+05:00').toString('Z'), '+05:00');
});
$mol_test(function format_names(test) {
    test.equal($jin.time.moment('2014-01-02T01:02:03.000').toString('Month Mon | WeekDay WD'), 'January Jan | Thursday Thu');
});
$mol_test(function shifting(test) {
    test.equal($jin.time.moment('T15:54:58.243+03:00').shift({}).toString(), 'T15:54:58.243+03:00');
    test.equal($jin.time.moment('2014-01-02').shift('P1Y').toString(), '2015-01-02');
    test.equal($jin.time.moment('2014-01-02').shift('P12M').toString(), '2015-01-02');
    test.equal($jin.time.moment('2014-01-02').shift('P365D').toString(), '2015-01-02');
    test.equal($jin.time.moment('2014-01-02').shift('PT8760h').toString(), '2015-01-02');
    test.equal($jin.time.moment('2014-01').shift('PT8760h').toString(), '2015-01');
    test.equal($jin.time.moment('2014-01').shift('PT-8760h').toString(), '2013-01');
});
$mol_test(function normalization(test) {
    test.equal($jin.time.moment('2015-07-35').normal.toString(), '2015-08-04');
});
//moment_tests.stage=dev.js.map
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
//object.stage=test.js.map
;
$mol_test(function (test) {
    var set = new $mol_set_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    set.add(obj1);
    set.add(obj2);
    test.equal(set.size, 2);
    test.ok(set.has(obj1));
    test.ok(set.has(obj2));
    test.not(set.has(obj3));
    var entries = set.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], obj1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], obj2);
    test.equal(entries[1][1], obj2);
    set.delete(obj2);
    test.not(set.has(obj2));
});
//set.stage=test.js.map
;
$mol_test(function (test) {
    var dict = new $mol_dict_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    dict.set(obj1, 1);
    dict.set(obj2, 2);
    test.equal(dict.size, 2);
    test.ok(dict.has(obj1));
    test.ok(dict.has(obj2));
    test.not(dict.has(obj3));
    test.equal(dict.get(obj1), 1);
    test.equal(dict.get(obj2), 2);
    test.equal(dict.get(obj3), void 0);
    var entries = dict.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], 1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], 2);
    test.equal(entries[1][1], obj2);
    dict.delete(obj2);
    test.not(dict.has(obj2));
});
//dict.stage=test.js.map
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
    $mol_defer.run();
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
        $mol_atom_restore(error);
        test.equal(error.message, 'Recursive dependency! .foo()');
    }
});
$mol_test(function (test) {
    var foo;
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
            return foo = new $mol_object;
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
    b.bar();
    $mol_defer.run();
    test.ok(foo.destroyed());
    test.ok(bar.destroyed());
    test.not(b.bar());
    b.showing(true);
    $mol_defer.run();
    test.unique(b.bar(), bar);
});
//prop.stage=test.js.map
;
$mol_test(function (test) {
    var key = '$mol_state_local_test:' + Math.random();
    test.equal($mol_state_local.value(key), null);
    $mol_state_local.value(key, 123);
    test.equal($mol_state_local.value(key), 123);
    $mol_state_local.value(key, null);
    test.equal($mol_state_local.value(key), null);
});
//local.stage=test.js.map
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
    test.equal(x.DOMNode().id, '');
    test.equal(x.element(0).DOMNode().id, '.element(0)');
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
    test.equal(x.DOMNode(), x.DOMNode());
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
    var node = x.DOMTree();
    test.equal(node.innerHTML, 'lol5');
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
    test.equal(x.DOMNode().getAttribute('mol_viewer_test_block'), '');
    test.equal(x.DOMNode().getAttribute('mol_viewer'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_block_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_item'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer'), '');
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
    var node = x.DOMTree();
    test.equal(node.getAttribute('href'), '#haha');
    test.equal(node.getAttribute('required'), '');
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
    var node = x.DOMTree();
    test.equal(node.style.top, '10px');
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
                case 'click': return this.eventClick.apply(this, diff);
            }
            return _super.prototype.event.apply(this, [name].concat(diff));
        };
        $mol_viewer_test.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            clicked = true;
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    node.click();
    test.ok(clicked);
});
//viewer.stage=test.js.map
;
$mol_test(function (test) {
    test.equal($mol_maybe(0)[0], 0);
    test.equal($mol_maybe(false)[0], false);
    test.equal($mol_maybe(null)[0], void 0);
    test.equal($mol_maybe(void 0)[0], void 0);
    test.equal($mol_maybe(void 0).map(function (v) { return v.toString(); })[0], void 0);
    test.equal($mol_maybe(0).map(function (v) { return v.toString(); })[0], '0');
});
//maybe.stage=test.js.map
;
$mol_test(function (test) {
    var unit = new $mol_unit_money_usd(5);
    test.equal(unit.valueOf(), 5);
    test.equal(unit * 2, 10);
    test.equal(unit + '', '5');
    test.equal("" + unit, '5');
    test.equal(unit.toString(), '$5');
    test.equal(String(unit), '$5');
});
$mol_test(function (test) {
    var usd1 = new $mol_unit_money_usd(5);
    var usd2 = new $mol_unit_money_usd(10);
    var rur = new $mol_unit_money_rur(5);
    test.equal($mol_unit.summ(usd1, usd2).toString(), '$15');
    test.equal(usd1.mult(2).toString(), '$10');
});
//unit.stage=test.js.map
;
$mol_test(function (test) {
    var graph = new $mol_graph();
    graph.link('A', 'B', { priority: 0 });
    graph.link('B', 'C', { priority: -2 });
    graph.link('C', 'D', { priority: 0 });
    graph.link('D', 'A', { priority: -1 });
    test.equal(graph.sorted(function (edge) { return edge.priority; }).join(''), 'BADC');
});
//graph.stage=test.js.map
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
//range.stage=test.js.map
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
//tree.stage=test.js.map
//# sourceMappingURL=web.test.js.map