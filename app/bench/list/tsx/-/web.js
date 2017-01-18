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
    function $mol_dom_make(config) {
        var tag = config.tagName || 'div';
        var ns = config.namespaceURI || 'http://www.w3.org/1999/xhtml';
        var el = document.getElementById(config.id) || document.createElementNS(ns, tag);
        if (config.childNodes) {
            var i = 0;
            while (true) {
                if (i >= config.childNodes.length) {
                    for (var child = void 0; child = el.childNodes[i];) {
                        el.removeChild(child);
                    }
                    break;
                }
                if (i >= el.childNodes.length) {
                    for (; i < config.childNodes.length; ++i) {
                        var child = config.childNodes[i];
                        if (typeof child === 'string') {
                            el.appendChild(document.createTextNode(child));
                        }
                        else {
                            el.appendChild(child instanceof Node ? child : $mol_dom_make(child));
                        }
                    }
                    break;
                }
                var childPrev = el.childNodes[i] || null;
                var childNext = config.childNodes[i];
                if (typeof childNext === 'string') {
                    if (childPrev instanceof Text) {
                        childPrev.nodeValue = childNext;
                        childNext = childPrev;
                    }
                    else {
                        childNext = document.createTextNode(childNext);
                    }
                }
                else if (!(childNext instanceof Node)) {
                    childNext = $mol_dom_make(childNext);
                }
                if (childNext !== childPrev) {
                    el.insertBefore(childNext, childPrev);
                }
                ++i;
            }
        }
        for (var key in config) {
            switch (key) {
                case 'tagName':
                case 'namespaceURI':
                case 'childNodes':
                    break;
                default:
                    el[key] = config[key];
            }
        }
        return el;
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    function $mol_dom_jsx(tagName, props) {
        var childNodes = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childNodes[_i - 2] = arguments[_i];
        }
        var config = __assign({ tagName: tagName, childNodes: [].concat.apply([], childNodes) }, props);
        return $.$mol_dom_make(config);
    }
    $.$mol_dom_jsx = $mol_dom_jsx;
})($ || ($ = {}));
//jsx.js.map
;
var $;
(function ($) {
    var $mol_app_bench_list_tsx = (function () {
        function $mol_app_bench_list_tsx() {
        }
        $mol_app_bench_list_tsx.onClick = function (item, event) {
            this.selected = item.id;
            this.render();
        };
        $mol_app_bench_list_tsx.render = function () {
            var _this = this;
            return ($.$mol_dom_jsx("div", { id: "list", className: "list" },
                $.$mol_dom_jsx("div", { id: "list-header", className: "list-header" }, this.data.sample),
                " ,",
                this.data.items.map(function (item) { return ($.$mol_dom_jsx("div", { id: 'list-item#' + item.id, className: "list-item list-item-selected-" + (_this.selected === item.id), onclick: _this.onClick.bind(_this, item) },
                    $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-title', className: "list-item-title" }, item.title),
                    $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-content', className: "list-item-content", childNodes: [item.content] }, item.content))); })));
        };
        return $mol_app_bench_list_tsx;
    }());
    $mol_app_bench_list_tsx.data = {
        sample: '',
        items: []
    };
    $mol_app_bench_list_tsx.selected = null;
    $.$mol_app_bench_list_tsx = $mol_app_bench_list_tsx;
})($ || ($ = {}));
//index.js.map
//# sourceMappingURL=web.js.map