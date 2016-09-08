this['$'] = this['$'] || this;
this['$']['$mol'] = this['$'];
var __extends = function (Sub, Sup) {
    for (var prop in Sup)
        if (Sup.hasOwnProperty(prop))
            Sub[prop] = Sup[prop];
    Sub.prototype = Object.create(Sup.prototype, {
        constructor: {
            configurable: true,
            writable: true,
            value: Sub,
        }
    });
    if (Sub['initializer'])
        Sub['initializer']();
};
//mol.js.map
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
                        return new this({
                            year: duration[0],
                            month: duration[1],
                            day: duration[2],
                            hour: duration[3],
                            minute: duration[4],
                            second: duration[5],
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
                        return new this({
                            year: moment[0],
                            month: moment[1],
                            day: moment[2],
                            hour: moment[3],
                            minute: moment[4],
                            second: moment[5],
                            offset: moment[6],
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
function $mol_log(path, values) {
    var filter = $mol_log.filter();
    if (filter == null)
        return;
    if (path.indexOf(filter) === -1)
        return;
    console.log.apply(console, [$jin.time.moment().toString('hh:mm:ss'), path].concat(values));
}
var $mol_log;
(function ($mol_log) {
    var _filter;
    function filter() {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0) {
            if (diff[0] == null) {
                sessionStorage.removeItem('$mol_log.filter()');
            }
            else {
                sessionStorage.setItem('$mol_log.filter()', diff[0]);
            }
            _filter = diff[0];
        }
        if (_filter !== void 0)
            return _filter;
        return _filter = sessionStorage.getItem('$mol_log.filter()');
    }
    $mol_log.filter = filter;
})($mol_log || ($mol_log = {}));
//log.env=web.js.map
;
var $mol_object = (function () {
    function $mol_object() {
        this['destroyed()'] = false;
    }
    $mol_object.prototype.Class = function () {
        return this.constructor;
    };
    $mol_object.objectPath = function () {
        return this['name']
            || this['displayName']
            || (this['displayName'] = Function.prototype.toString.call(this).match(/^function ([a-z0-9_$]*)/)[1]);
    };
    $mol_object.prototype.objectClassNames = function () {
        if (this.hasOwnProperty('objectClassNames()'))
            return this['objectClassNames()'];
        var names = [];
        var current = this;
        while (typeof current === 'object') {
            if (!current.constructor['objectPath'])
                break;
            var name = current.constructor['objectPath']();
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
    $mol_object.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0)
            return this['destroyed()'];
        this['destroyed()'] = diff[0];
        this.log(['.destroyed()', diff[0]]);
        return diff[0];
    };
    $mol_object.prototype.log = function (values) {
        if ($mol_log.filter() == null)
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
//object.js.map
;
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
//set.js.map
;
var $mol_set = ( typeof Set === 'function' ) ? Set : $mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_defer = (function (_super) {
    __extends($mol_defer, _super);
    function $mol_defer(run) {
        _super.call(this);
        this.run = run;
        $mol_defer.add(this);
    }
    $mol_defer.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0])
            $mol_defer.drop(this);
        return _super.prototype.destroyed.apply(this, diff);
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
}($mol_object));
//defer.js.map
;
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
            entries.push([val, key]);
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
//dict.js.map
;
var $mol_dict = ( typeof Map === 'function' ) ? Map : $mol_dict_shim

;
var $mol_state_stack = new $mol_dict();
//stack.js.map
;
window.addEventListener('error', function (event) {
    var error = event.error;
    var stack = $mol_atom.stack;
    if (error instanceof $mol_atom_wait) {
        event.preventDefault();
    }
    $mol_atom_restore(error);
});
//atom.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_atom_status;
(function ($mol_atom_status) {
    $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
    $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
    $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
})($mol_atom_status || ($mol_atom_status = {}));
var $mol_atom = (function (_super) {
    __extends($mol_atom, _super);
    function $mol_atom(host, field, handler, fail, key) {
        if (field === void 0) { field = 'value()'; }
        _super.call(this);
        this.host = host;
        this.field = field;
        this.handler = handler;
        this.fail = fail;
        this.key = key;
        this.masters = null;
        this.slaves = null;
        this.status = $mol_atom_status.obsolete;
        this.autoFresh = false;
    }
    $mol_atom.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0]) {
            this.unlink();
            var host = this.host || this;
            var value = host[this.field];
            if (value instanceof $mol_object) {
                if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
                    value.destroyed(true);
                }
            }
            host[this.field] = void 0;
            host['$mol_atom_state'][this.field] = void 0;
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
        if ($mol_atom.stack.indexOf(this) !== -1) {
            throw new Error('Recursive dependency! ' + this.objectPath());
        }
        var slave = $mol_atom.stack[$mol_atom.stack.length - 1];
        if (slave)
            this.lead(slave);
        if (slave)
            slave.obey(this);
        this.actualize();
        var value = (this.host || this)[this.field];
        if (value instanceof Error)
            throw value;
        return value;
    };
    $mol_atom.prototype.actualize = function () {
        var _this = this;
        this.log(['actualize']);
        if (this.status === $mol_atom_status.actual)
            return;
        var index = $mol_atom.stack.length;
        $mol_atom.stack.push(this);
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
            this.log(['pull']);
            var oldMasters = this.masters;
            this.masters = null;
            if (oldMasters)
                oldMasters.forEach(function (master) {
                    master.dislead(_this);
                });
            var host = this.host || this;
            if (this.key !== void 0) {
                var next = this.handler.call(host, this.key);
            }
            else {
                var next = this.handler.call(host);
            }
            if (next === void 0)
                next = host[this.field];
            this.push(next);
        }
        $mol_atom.stack.length = index;
    };
    $mol_atom.prototype.set = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var host = this.host || this;
        if (this.key !== void 0) {
            var next = (_a = this.handler).call.apply(_a, [host, this.key].concat(diff));
        }
        else {
            var next = (_b = this.handler).call.apply(_b, [host].concat(diff));
        }
        if (next === void 0)
            return host[this.field];
        return this.push(next);
        var _a, _b;
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
            if (next instanceof $mol_object) {
                next['objectField'](this.field);
                next['objectOwner'](host);
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
            this.log(['checking']);
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
        if (!this.slaves)
            this.slaves = [];
        if (this.slaves.indexOf(slave) !== -1)
            return;
        this.slaves.push(slave);
    };
    $mol_atom.prototype.dislead = function (slave) {
        if (!this.slaves)
            return;
        var index = this.slaves.indexOf(slave);
        if (index !== -1)
            this.slaves.splice(index, 1);
        if (!this.slaves.length) {
            this.slaves = null;
            $mol_atom.reap(this);
        }
    };
    $mol_atom.prototype.obey = function (master) {
        if (!this.masters)
            this.masters = new $mol_set();
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
    $mol_atom.prototype.value = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0) {
            if (diff.length > 1)
                return this.push(diff[1]);
            if (diff.length > 0)
                return this.obsolete();
            return this.get();
        }
        else {
            return this.set.apply(this, diff);
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
    $mol_atom.schedule = function () {
        var _this = this;
        if (this.scheduled)
            return;
        new $mol_defer(function () {
            if (!_this.scheduled)
                return;
            _this.scheduled = false;
            _this.sync();
        });
        this.scheduled = true;
    };
    $mol_atom.sync = function () {
        var _this = this;
        $mol_log('$mol_atom.sync', []);
        this.schedule();
        while (this.updating.length) {
            var atom = this.updating.shift();
            if (!atom.destroyed())
                atom.actualize();
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
    $mol_atom.stack = [];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $mol_set();
    $mol_atom.scheduled = false;
    return $mol_atom;
}($mol_object));
function $mol_atom_restore(error) {
    while ($mol_atom.stack.length) {
        var atom = $mol_atom.stack.pop();
        if (error instanceof Error) {
            error = atom.push(error);
        }
    }
}
$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
var $mol_atom_wait = (function (_super) {
    __extends($mol_atom_wait, _super);
    function $mol_atom_wait(message) {
        if (message === void 0) { message = 'Wait...'; }
        _super.call(this, message);
        this.message = message;
        this.name = '$mol_atom_wait';
    }
    return $mol_atom_wait;
}(Error));
function $mol_atom_task(handler, fail, autoFresh) {
    if (autoFresh === void 0) { autoFresh = true; }
    var atom = new $mol_atom(null, 'value()', handler, fail);
    atom.autoFresh = autoFresh;
    $mol_atom.actualize(atom);
    return atom;
}
//atom.js.map
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
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail, key);
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
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail);
                return info.value.apply(info, diff);
            };
        }
        descr.value['value'] = value;
    };
}
//prop.js.map
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
//local.js.map
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
var $mol_state_history = (function (_super) {
    __extends($mol_state_history, _super);
    function $mol_state_history() {
        _super.apply(this, arguments);
    }
    $mol_state_history.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, ["$mol_state_history:" + this.id() + ":" + key].concat(diff));
    };
    $mol_state_history.prototype.prefix = function () { return ''; };
    $mol_state_history.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    $mol_state_history.id = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (history.state)
            return history.state;
        var id = Date.now().toString(16);
        history.replaceState(id, document.title, document.location.href);
        return id;
    };
    __decorate([
        $mol_prop()
    ], $mol_state_history, "value", null);
    __decorate([
        $mol_prop()
    ], $mol_state_history, "id", null);
    return $mol_state_history;
}($mol_object));
window.addEventListener('hashchange', function (event) { return $mol_state_history.id(void 0); });
//history.js.map
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
            history.replaceState(history.state, document.title, diff[0]);
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
//arg.env=web.js.map
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
    $mol_model.history = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_history.value.apply($mol_state_history, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.history = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_history.value.apply($mol_state_history, [this + "." + key].concat(diff));
    };
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
//model.js.map
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
var $mol_window = (function (_super) {
    __extends($mol_window, _super);
    function $mol_window() {
        _super.apply(this, arguments);
    }
    $mol_window.size = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return [window.innerWidth, window.innerHeight];
    };
    __decorate([
        $mol_prop()
    ], $mol_window, "size", null);
    return $mol_window;
}($mol_object));
window.addEventListener('resize', function () {
    $mol_window.size(void 0);
});
//window.js.map
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
//selection.js.map
;
document.addEventListener('DOMContentLoaded', function (event) {
    var nodes = document.querySelectorAll('[mol_viewer_root]');
    for (var i = nodes.length - 1; i >= 0; --i) {
        var view = window['$'][nodes[i].getAttribute('mol_viewer_root')].root(i);
        view.DOMNode(nodes[i]);
        $mol_atom_task(function () { return view.DOMTree(); });
    }
    $mol_defer.run();
});
//viewer.env=web.js.map
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
    $mol_viewer.prototype.childsVisible = function () {
        var heightAvailable = this.heightAvailable();
        var childs = this.childs();
        if (!childs)
            return childs;
        return childs.filter(function (child) {
            if (child == null)
                return false;
            if (child instanceof $mol_viewer)
                child.heightAvailable(heightAvailable);
            return true;
        });
    };
    $mol_viewer.prototype.heightAvailable = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0] || $mol_window.size()[1];
    };
    $mol_viewer.prototype.heightMinimal = function () {
        return 0;
    };
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
        next['$mol_viewer'] = this;
        this['DOMNode()'] = next;
        var ownerProto = this.objectOwner() && Object.getPrototypeOf(this.objectOwner());
        if (ownerProto && ownerProto['objectClassNames']) {
            for (var _a = 0, _b = ownerProto['objectClassNames'](); _a < _b.length; _a++) {
                var className = _b[_a];
                var attrName = className.replace(/\$/g, '') + '_' + this.objectField().replace(/\(.*/, '');
                next.setAttribute(attrName, '');
                if (className === '$mol_viewer')
                    break;
            }
        }
        var proto = Object.getPrototypeOf(this);
        for (var _c = 0, _d = proto['objectClassNames'](); _c < _d.length; _c++) {
            var className = _d[_c];
            next.setAttribute(className.replace(/\$/g, ''), '');
            if (className === '$mol_viewer')
                break;
        }
        this.event_keys().forEach(function (name) {
            next.addEventListener(name, function (event) {
                _this.event(name, event);
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
        var node = this.DOMNode();
        var childs = this.childsVisible();
        if (childs != null) {
            var childViews = childs;
            var nextNode = node.firstChild;
            for (var i = 0; i < childViews.length; ++i) {
                var view = childViews[i];
                if (typeof view === 'object') {
                    var existsNode = (view instanceof $mol_viewer) ? view.DOMNode() : view;
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
            for (var i = 0; i < childViews.length; ++i) {
                var view = childViews[i];
                if (view instanceof $mol_viewer)
                    view.DOMTree();
            }
        }
        this.attr_keys().forEach(function (name) {
            var n = _this.attr(name);
            if ((n == null) || (n === false)) {
                node.removeAttribute(name);
            }
            else if (n === true) {
                node.setAttribute(name, name);
            }
            else {
                node.setAttribute(name, String(n));
            }
        });
        this.field_keys().forEach(function (path) {
            var names = path.split('.');
            var obj = node;
            for (var i = 0; i < names.length - 1; ++i) {
                if (names[i])
                    obj = obj[names[i]];
            }
            var field = names[names.length - 1];
            var val = _this.field(path);
            if (obj[field] !== val)
                obj[field] = val;
        });
        return node;
    };
    $mol_viewer.prototype.attr_keys = function () { return ['mol_viewer_error']; };
    $mol_viewer.prototype.attr = function (name) {
        if (name === 'mol_viewer_error')
            return false;
        return '';
    };
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
    $mol_viewer.prototype.text = function (text) {
        return text;
    };
    __decorate([
        $mol_prop()
    ], $mol_viewer.prototype, "heightAvailable", null);
    __decorate([
        $mol_prop({
            fail: function (self, error) {
                var node = self.DOMNode();
                if (node) {
                    node.setAttribute('mol_viewer_error', error.name);
                }
                return error;
            }
        })
    ], $mol_viewer.prototype, "DOMTree", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer, "root", null);
    return $mol_viewer;
}($mol_model));
//viewer.js.map
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
        $mol_stacker.prototype.attr = function (key) {
            switch (key) {
                case "mol_stacker_side": return this.side();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_stacker.prototype.attr_keys = function () {
            return ["mol_stacker_side"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_stacker.prototype.main = function () {
            return [].concat();
        };
        $mol_stacker.prototype.mainer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.main()); };
            });
        };
        $mol_stacker.prototype.addon = function () {
            return [].concat();
        };
        $mol_stacker.prototype.addoner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.addon()); };
            });
        };
        $mol_stacker.prototype.childs = function () {
            return [].concat(this.mainer(), this.addoner());
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
//stacker.view.tree.js.map
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
            $mol_stacker.prototype.side = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!this.main())
                    return true;
                return Boolean((_a = this.argument()).value.apply(_a, ['side'].concat(diff)));
                var _a;
            };
            __decorate([
                $mol_prop()
            ], $mol_stacker.prototype, "side", null);
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
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            _super.apply(this, arguments);
        }
        $mol_scroller.prototype.scrollTop = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollLeft = function () {
            return 0;
        };
        $mol_scroller.prototype.field = function (key) {
            switch (key) {
                case "scrollTop": return this.scrollTop();
                case "scrollLeft": return this.scrollLeft();
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_scroller.prototype.field_keys = function () {
            return ["scrollTop", "scrollLeft"].concat(_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []);
        };
        $mol_scroller.prototype.eventScroll = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_scroller.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "scroll": return this.eventScroll.apply(this, diff);
                case "overflow": return this.eventScroll.apply(this, diff);
                case "underflow": return this.eventScroll.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_scroller.prototype.event_keys = function () {
            return ["scroll", "overflow", "underflow"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_scroller.prototype, "eventScroll", null);
        return $mol_scroller;
    }($mol_viewer));
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
                return this.session.apply(this, ['scrollTop()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.session.apply(this, ['scrollLeft()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.eventScroll = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var el = diff[0].target;
                this.scrollTop(el.scrollTop);
                this.scrollLeft(el.scrollLeft);
            };
            $mol_scroller.prototype.childsVisible = function () {
                var heightAvailable = Math.ceil((this.heightAvailable() + this.scrollTop()) / 20) * 20;
                var childs = this.childs();
                if (!childs)
                    return childs;
                var next = [];
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    if (child == null)
                        continue;
                    if (child instanceof $mol_viewer) {
                        void child.heightAvailable(heightAvailable);
                    }
                    next.push(child);
                }
                return next;
            };
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollTop", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollLeft", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "eventScroll", null);
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
        $mol_pager.prototype.title = function () {
            return "";
        };
        $mol_pager.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return null;
        };
        $mol_pager.prototype.bodier = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return [].concat(_this.body()); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return null;
        };
        $mol_pager.prototype.footer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.foot()); };
            });
        };
        $mol_pager.prototype.childs = function () {
            return [].concat(this.header(), this.bodier(), this.footer());
        };
        __decorate([
            $mol_prop()
        ], $mol_pager.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_pager.prototype, "header", null);
        __decorate([
            $mol_prop()
        ], $mol_pager.prototype, "bodier", null);
        __decorate([
            $mol_prop()
        ], $mol_pager.prototype, "footer", null);
        return $mol_pager;
    }($mol_viewer));
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
    var $mol_lister = (function (_super) {
        __extends($mol_lister, _super);
        function $mol_lister() {
            _super.apply(this, arguments);
        }
        $mol_lister.prototype.minHeightStyle = function () {
            return "";
        };
        $mol_lister.prototype.field = function (key) {
            switch (key) {
                case "style.minHeight": return this.minHeightStyle();
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_lister.prototype.field_keys = function () {
            return ["style.minHeight"].concat(_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []);
        };
        $mol_lister.prototype.rows = function () {
            return [].concat();
        };
        $mol_lister.prototype.childs = function () {
            return this.rows();
        };
        return $mol_lister;
    }($mol_viewer));
    $.$mol_lister = $mol_lister;
})($ || ($ = {}));
//lister.view.tree.js.map
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
            $mol_lister.prototype.childsVisible = function () {
                var heightAvailable = this.heightAvailable();
                var childs = this.childs();
                if (!childs)
                    return childs;
                var next = [];
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    if (child == null)
                        continue;
                    if (child instanceof $mol_viewer) {
                        child.heightAvailable(heightAvailable);
                        heightAvailable -= child.heightMinimal();
                    }
                    next.push(child);
                    if (heightAvailable < 0)
                        break;
                }
                return next;
            };
            $mol_lister.prototype.heightMinimal = function () {
                var height = 0;
                var childs = this.childs();
                if (childs)
                    childs.forEach(function (child) {
                        if (child instanceof $mol_viewer) {
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
    var $mol_linker = (function (_super) {
        __extends($mol_linker, _super);
        function $mol_linker() {
            _super.apply(this, arguments);
        }
        $mol_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_linker.prototype.uri = function () {
            return "";
        };
        $mol_linker.prototype.current = function () {
            return (false);
        };
        $mol_linker.prototype.attr = function (key) {
            switch (key) {
                case "href": return this.uri();
                case "mol_linker_current": return this.current();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_linker.prototype.attr_keys = function () {
            return ["href", "mol_linker_current"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_linker.prototype.patch = function () {
            return (null);
        };
        return $mol_linker;
    }($mol_viewer));
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
//linker.view.js.map
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
    }($mol_viewer));
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
        $mol_svg_path.prototype.attr = function (key) {
            switch (key) {
                case "d": return this.geometry();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_svg_path.prototype.attr_keys = function () {
            return ["d"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
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
            return "0 0 48 48";
        };
        $mol_icon.prototype.attr = function (key) {
            switch (key) {
                case "viewBox": return this.viewBox();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_icon.prototype.attr_keys = function () {
            return ["viewBox"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.pather = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_svg_path().setup(function (__) {
                __.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.childs = function () {
            return [].concat(this.pather());
        };
        __decorate([
            $mol_prop()
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
    var $mol_icon_chevron_left = (function (_super) {
        __extends($mol_icon_chevron_left, _super);
        function $mol_icon_chevron_left() {
            _super.apply(this, arguments);
        }
        $mol_icon_chevron_left.prototype.path = function () {
            return "M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z";
        };
        return $mol_icon_chevron_left;
    }($.$mol_icon));
    $.$mol_icon_chevron_left = $mol_icon_chevron_left;
})($ || ($ = {}));
//left.view.tree.js.map
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
    var $mol_demo = (function (_super) {
        __extends($mol_demo, _super);
        function $mol_demo() {
            _super.apply(this, arguments);
        }
        $mol_demo.prototype.name = function () {
            return "$mol_viewer ";
        };
        $mol_demo.prototype.title = function () {
            return this.name();
        };
        $mol_demo.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_demo.prototype.widget = function () {
            return null;
        };
        $mol_demo.prototype.screener = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.widget()); };
            });
        };
        $mol_demo.prototype.childs = function () {
            return [].concat(this.titler(), this.screener());
        };
        __decorate([
            $mol_prop()
        ], $mol_demo.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_demo.prototype, "screener", null);
        return $mol_demo;
    }($mol_viewer));
    $.$mol_demo = $mol_demo;
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
    var $mol;
    (function ($mol) {
        var $mol_demo = (function (_super) {
            __extends($mol_demo, _super);
            function $mol_demo() {
                _super.apply(this, arguments);
            }
            $mol_demo.prototype.widget = function () {
                var Class = $[this.name()];
                return new Class();
            };
            __decorate([
                $mol_prop()
            ], $mol_demo.prototype, "widget", null);
            return $mol_demo;
        }($.$mol_demo));
        $mol.$mol_demo = $mol_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_demo_small = (function (_super) {
        __extends($mol_demo_small, _super);
        function $mol_demo_small() {
            _super.apply(this, arguments);
        }
        return $mol_demo_small;
    }($.$mol_demo));
    $.$mol_demo_small = $mol_demo_small;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_demo_medium = (function (_super) {
        __extends($mol_demo_medium, _super);
        function $mol_demo_medium() {
            _super.apply(this, arguments);
        }
        return $mol_demo_medium;
    }($.$mol_demo));
    $.$mol_demo_medium = $mol_demo_medium;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_demo_large = (function (_super) {
        __extends($mol_demo_large, _super);
        function $mol_demo_large() {
            _super.apply(this, arguments);
        }
        return $mol_demo_large;
    }($.$mol_demo));
    $.$mol_demo_large = $mol_demo_large;
})($ || ($ = {}));
//demo_types.view.tree.js.map
;
function $mol_maybe(value) {
    return (value == null) ? [] : [value];
}
//maybe.js.map
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
        $mol_demo_all.prototype.name = function () {
            return "$mol_viewer";
        };
        $mol_demo_all.prototype.medium = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_demo_medium().setup(function (__) {
                __.name = function () { return _this.name(); };
                __.title = function () { return "Fit to content"; };
            });
        };
        $mol_demo_all.prototype.small = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_demo_small().setup(function (__) {
                __.name = function () { return _this.name(); };
                __.title = function () { return "Minimum screen"; };
            });
        };
        $mol_demo_all.prototype.large = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_demo_large().setup(function (__) {
                __.name = function () { return _this.name(); };
                __.title = function () { return "Maximize to screen"; };
            });
        };
        $mol_demo_all.prototype.childs = function () {
            return [].concat(this.medium(), this.small(), this.large());
        };
        __decorate([
            $mol_prop()
        ], $mol_demo_all.prototype, "medium", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_all.prototype, "small", null);
        __decorate([
            $mol_prop()
        ], $mol_demo_all.prototype, "large", null);
        return $mol_demo_all;
    }($mol_viewer));
    $.$mol_demo_all = $mol_demo_all;
})($ || ($ = {}));
//all.view.tree.js.map
;
function $mol_const(value) {
    var getter = function () { return value; };
    getter['()'] = value;
    return getter;
}
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
    var $mol_app_demo = (function (_super) {
        __extends($mol_app_demo, _super);
        function $mol_app_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_demo.prototype.items = function () {
            return [].concat();
        };
        $mol_app_demo.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return _this.items(); };
            });
        };
        $mol_app_demo.prototype.main = function () {
            return [].concat(this.lister());
        };
        $mol_app_demo.prototype.options = function () {
            return [].concat();
        };
        $mol_app_demo.prototype.optioner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.options(); };
            });
        };
        $mol_app_demo.prototype.addon = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_pager().setup(function (__) {
                __.title = function () { return "Demos"; };
                __.body = function () { return _this.optioner(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_app_demo.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_demo.prototype, "optioner", null);
        __decorate([
            $mol_prop()
        ], $mol_app_demo.prototype, "addon", null);
        return $mol_app_demo;
    }($.$mol_stacker));
    $.$mol_app_demo = $mol_app_demo;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_demo_pager = (function (_super) {
        __extends($mol_app_demo_pager, _super);
        function $mol_app_demo_pager() {
            _super.apply(this, arguments);
        }
        $mol_app_demo_pager.prototype.backerIcon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_icon_chevron_left().setup(function (__) {
            });
        };
        $mol_app_demo_pager.prototype.backPatch = function () {
            return ({ "demo": null });
        };
        $mol_app_demo_pager.prototype.backer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.childs = function () { return [].concat(_this.backerIcon()); };
                __.patch = function () { return _this.backPatch(); };
            });
        };
        $mol_app_demo_pager.prototype.head = function () {
            return [].concat(this.backer(), this.titler());
        };
        __decorate([
            $mol_prop()
        ], $mol_app_demo_pager.prototype, "backerIcon", null);
        __decorate([
            $mol_prop()
        ], $mol_app_demo_pager.prototype, "backer", null);
        return $mol_app_demo_pager;
    }($.$mol_pager));
    $.$mol_app_demo_pager = $mol_app_demo_pager;
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
    var $mol;
    (function ($mol) {
        var $mol_app_demo = (function (_super) {
            __extends($mol_app_demo, _super);
            function $mol_app_demo() {
                _super.apply(this, arguments);
            }
            $mol_app_demo.prototype.main = function () {
                var selected = this.selected();
                if (selected) {
                    return [this.detailer(selected)];
                }
                else {
                    return [];
                }
            };
            $mol_app_demo.prototype.side = function () {
                return this.selected() ? false : true;
            };
            $mol_app_demo.prototype.namesDemo = function () {
                var next = [];
                for (var name in $) {
                    if (!/^\$.*_demo($|_)/i.test(name))
                        continue;
                    if (/^\$mol_demo/.test(name))
                        continue;
                    if (/^\$mol_app_demo/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next;
            };
            $mol_app_demo.prototype.namesApp = function () {
                var next = [];
                for (var name in $) {
                    if (!/^\$.*_app(_[a-z0-9]+)?$/i.test(name))
                        continue;
                    if (/^\$mol_demo/.test(name))
                        continue;
                    if (/^\$mol_app_demo/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next;
            };
            $mol_app_demo.prototype.options = function () {
                var _this = this;
                return this.namesDemo().concat(this.namesApp()).map(function (name) { return _this.option(name); });
            };
            $mol_app_demo.prototype.items = function () {
                var _this = this;
                return this.namesDemo().map(function (name) { return _this.screen(name); });
            };
            $mol_app_demo.prototype.selected = function () {
                return $mol_maybe(this.argument().value('demo'))[0];
            };
            $mol_app_demo.prototype.option = function (name) {
                return new $mol.$mol_linker().setup(function (obj) {
                    obj.childs = function () { return [name ? ('$' + name) : 'All']; };
                    obj.patch = function () { return ({ demo: name }); };
                });
            };
            $mol_app_demo.prototype.screen = function (name) {
                var _this = this;
                return new $.$mol_demo_medium().setup(function (obj) {
                    obj.name = function () { return '$' + name; };
                    obj.argument = function () { return _this.argument().sub(name); };
                });
            };
            $mol_app_demo.prototype.screens = function (name) {
                var _this = this;
                return new $.$mol_demo_all().setup(function (obj) {
                    obj.name = function () { return '$' + name; };
                    obj.argument = function () { return _this.argument().sub(name); };
                });
            };
            $mol_app_demo.prototype.widget = function (name) {
                var _this = this;
                var Class = $['$' + name];
                return new Class().setup(function (obj) {
                    obj.argument = function () { return _this.argument().sub(name); };
                });
            };
            $mol_app_demo.prototype.detailer = function (name) {
                var _this = this;
                return new $.$mol_app_demo_pager().setup(function (obj) {
                    obj.title = $mol_const('$' + name);
                    obj.body = function () { return [_this.widget(name)]; };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "namesDemo", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "namesApp", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "options", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "items", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "option", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "screen", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "screens", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "widget", null);
            __decorate([
                $mol_prop()
            ], $mol_app_demo.prototype, "detailer", null);
            return $mol_app_demo;
        }($.$mol_app_demo));
        $mol.$mol_app_demo = $mol_app_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
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
var $;
(function ($) {
    var $mol_rower_sub = (function (_super) {
        __extends($mol_rower_sub, _super);
        function $mol_rower_sub() {
            _super.apply(this, arguments);
        }
        return $mol_rower_sub;
    }($mol_viewer));
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
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            _super.apply(this, arguments);
        }
        $mol_form.prototype.submitBlocked = function () {
            return (false);
        };
        $mol_form.prototype.formFields = function () {
            return [].concat();
        };
        $mol_form.prototype.barFields = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return _this.formFields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [].concat();
        };
        $mol_form.prototype.barButtons = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.childs = function () {
            return [].concat(this.barFields(), this.barButtons());
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
                $mol_prop()
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
        $mol_form_field.prototype.namer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [].concat();
        };
        $mol_form_field.prototype.errorer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.namer(), _this.errorer()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return (null);
        };
        $mol_form_field.prototype.childs = function () {
            return [].concat(this.label(), this.control());
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
        $mol_stringer.prototype.hint = function () {
            return "";
        };
        $mol_stringer.prototype.type = function () {
            return "text";
        };
        $mol_stringer.prototype.attr = function (key) {
            switch (key) {
                case "placeholder": return this.hint();
                case "type": return this.type();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_stringer.prototype.attr_keys = function () {
            return ["placeholder", "type"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_stringer.prototype.disabled = function () {
            return (false);
        };
        $mol_stringer.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_stringer.prototype.valueChanged = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.value.apply(this, diff);
        };
        $mol_stringer.prototype.field = function (key) {
            switch (key) {
                case "disabled": return this.disabled();
                case "value": return this.valueChanged();
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_stringer.prototype.field_keys = function () {
            return ["disabled", "value"].concat(_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []);
        };
        $mol_stringer.prototype.eventChange = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_stringer.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "input": return this.eventChange.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_stringer.prototype.event_keys = function () {
            return ["input"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_stringer.prototype, "value", null);
        __decorate([
            $mol_prop()
        ], $mol_stringer.prototype, "eventChange", null);
        return $mol_stringer;
    }($mol_viewer));
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
            $mol_stringer.prototype.eventChange = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.value(diff[0].srcElement.value.trim());
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
            return (true);
        };
        $mol_clicker.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_clicker.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.eventClick.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_clicker.prototype.event_keys = function () {
            return ["click"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        $mol_clicker.prototype.disabled = function () {
            return (false);
        };
        $mol_clicker.prototype.attr = function (key) {
            switch (key) {
                case "disabled": return this.disabled();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_clicker.prototype.attr_keys = function () {
            return ["disabled"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker.prototype, "eventClick", null);
        return $mol_clicker;
    }($mol_viewer));
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
//clicker_types.view.tree.js.map
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
            return (false);
        };
        $mol_checker.prototype.attr = function (key) {
            switch (key) {
                case "mol_checker_checked": return this.checked();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_checker.prototype.attr_keys = function () {
            return ["mol_checker_checked"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_checker.prototype.label = function () {
            return "";
        };
        $mol_checker.prototype.childs = function () {
            return [].concat(this.label());
        };
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
            $mol_checker.prototype.eventClick = function () {
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
            ], $mol_checker.prototype, "eventClick", null);
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
    var $mol_switcher = (function (_super) {
        __extends($mol_switcher, _super);
        function $mol_switcher() {
            _super.apply(this, arguments);
        }
        $mol_switcher.prototype.heightMinimal = function () {
            return 44;
        };
        $mol_switcher.prototype.value = function () {
            return null;
        };
        $mol_switcher.prototype.option = function (key) {
            switch (key) {
                default: return _super.prototype["option"] && _super.prototype["option"].call(this, key);
            }
        };
        $mol_switcher.prototype.option_keys = function () {
            return [].concat(_super.prototype["option_keys"] && _super.prototype["option_keys"].call(this) || []);
        };
        $mol_switcher.prototype.items = function () {
            return [].concat();
        };
        $mol_switcher.prototype.childs = function () {
            return this.items();
        };
        return $mol_switcher;
    }($mol_viewer));
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
            $mol_switcher.prototype.value = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.session.apply(this, ['value()'].concat(diff));
            };
            $mol_switcher.prototype.items = function () {
                var _this = this;
                return this.option_keys().map(function (key) { return _this.optioner(key); });
            };
            $mol_switcher.prototype.optioner = function (key) {
                var _this = this;
                return new $mol.$mol_checker().setup(function (obj) {
                    obj.checked = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.optionChecked.apply(_this, [key].concat(diff));
                    };
                    obj.label = function () { return _this.option(key); };
                });
            };
            $mol_switcher.prototype.optionChecked = function (key) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.value() === key;
                this.value(diff[0] ? key : null);
            };
            __decorate([
                $mol_prop()
            ], $mol_switcher.prototype, "value", null);
            __decorate([
                $mol_prop()
            ], $mol_switcher.prototype, "items", null);
            __decorate([
                $mol_prop()
            ], $mol_switcher.prototype, "optioner", null);
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
    var $mol_app_signup = (function (_super) {
        __extends($mol_app_signup, _super);
        function $mol_app_signup() {
            _super.apply(this, arguments);
        }
        $mol_app_signup.prototype.nameFirstErrors = function () {
            return [].concat();
        };
        $mol_app_signup.prototype.nameFirst = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_signup.prototype.nameFirstControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Jack"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameFirst.apply(_this, diff);
                };
            });
        };
        $mol_app_signup.prototype.nameFirstField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "First Name"; };
                __.errors = function () { return _this.nameFirstErrors(); };
                __.control = function () { return _this.nameFirstControl(); };
            });
        };
        $mol_app_signup.prototype.nameNickErrors = function () {
            return [].concat();
        };
        $mol_app_signup.prototype.nameNick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_signup.prototype.nameNickControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Capitan"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameNick.apply(_this, diff);
                };
            });
        };
        $mol_app_signup.prototype.nameNickField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "Nick Name"; };
                __.errors = function () { return _this.nameNickErrors(); };
                __.control = function () { return _this.nameNickControl(); };
            });
        };
        $mol_app_signup.prototype.nameSecondErrors = function () {
            return [].concat();
        };
        $mol_app_signup.prototype.nameSecond = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_signup.prototype.nameSecondControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Sparrow"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.nameSecond.apply(_this, diff);
                };
            });
        };
        $mol_app_signup.prototype.nameSecondField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "Second Name"; };
                __.errors = function () { return _this.nameSecondErrors(); };
                __.control = function () { return _this.nameSecondControl(); };
            });
        };
        $mol_app_signup.prototype.sexErrors = function () {
            return [].concat();
        };
        $mol_app_signup.prototype.sex = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_signup.prototype.sexControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_signup_sexer().setup(function (__) {
                __.sex = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.sex.apply(_this, diff);
                };
            });
        };
        $mol_app_signup.prototype.sexField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "Sex"; };
                __.errors = function () { return _this.sexErrors(); };
                __.control = function () { return [].concat(_this.sexControl()); };
            });
        };
        $mol_app_signup.prototype.formFields = function () {
            return [].concat(this.nameFirstField(), this.nameNickField(), this.nameSecondField(), this.sexField());
        };
        $mol_app_signup.prototype.submitText = function () {
            return "Sign Up";
        };
        $mol_app_signup.prototype.eventSubmit = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_app_signup.prototype.submit = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat(_this.submitText()); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventSubmit.apply(_this, diff);
                };
                __.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_signup.prototype.buttons = function () {
            return [].concat(this.submit());
        };
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameFirst", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameFirstControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameFirstField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameNick", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameNickControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameNickField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameSecond", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameSecondControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "nameSecondField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "sex", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "sexControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "sexField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "eventSubmit", null);
        __decorate([
            $mol_prop()
        ], $mol_app_signup.prototype, "submit", null);
        return $mol_app_signup;
    }($.$mol_form));
    $.$mol_app_signup = $mol_app_signup;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_signup_sexer = (function (_super) {
        __extends($mol_app_signup_sexer, _super);
        function $mol_app_signup_sexer() {
            _super.apply(this, arguments);
        }
        $mol_app_signup_sexer.prototype.sex = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_signup_sexer.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.sex.apply(this, diff);
        };
        $mol_app_signup_sexer.prototype.option = function (key) {
            switch (key) {
                case "male": return "Male";
                case "intersex": return "Intersex";
                case "female": return "Female";
                default: return _super.prototype["option"] && _super.prototype["option"].call(this, key);
            }
        };
        $mol_app_signup_sexer.prototype.option_keys = function () {
            return ["male", "intersex", "female"].concat(_super.prototype["option_keys"] && _super.prototype["option_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_app_signup_sexer.prototype, "sex", null);
        return $mol_app_signup_sexer;
    }($.$mol_switcher));
    $.$mol_app_signup_sexer = $mol_app_signup_sexer;
})($ || ($ = {}));
//signup.view.tree.js.map
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
        var $mol_app_signup = (function (_super) {
            __extends($mol_app_signup, _super);
            function $mol_app_signup() {
                _super.apply(this, arguments);
            }
            $mol_app_signup.prototype.nameFirst = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameFirst()"].concat(diff)) || '';
            };
            $mol_app_signup.prototype.nameFirstErrors = function () {
                return this.nameFirst() ? [] : ['Input required'];
            };
            $mol_app_signup.prototype.nameNick = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameNick()"].concat(diff)) || '';
            };
            $mol_app_signup.prototype.nameSecond = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["nameSecond()"].concat(diff)) || '';
            };
            $mol_app_signup.prototype.nameSecondErrors = function () {
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
            $mol_app_signup.prototype.sex = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ["sex()"].concat(diff)) || '';
            };
            $mol_app_signup.prototype.sexErrors = function () {
                return this.sex() ? [] : ['Input required'];
            };
            $mol_app_signup.prototype.eventSubmit = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert("Hello, " + this.sex() + " " + this.nameFirst() + " (" + this.nameNick() + ") " + this.nameSecond() + "!");
            };
            __decorate([
                $mol_prop()
            ], $mol_app_signup.prototype, "nameFirst", null);
            __decorate([
                $mol_prop()
            ], $mol_app_signup.prototype, "nameNick", null);
            __decorate([
                $mol_prop()
            ], $mol_app_signup.prototype, "nameSecond", null);
            __decorate([
                $mol_prop()
            ], $mol_app_signup.prototype, "sex", null);
            __decorate([
                $mol_prop()
            ], $mol_app_signup.prototype, "eventSubmit", null);
            return $mol_app_signup;
        }($.$mol_app_signup));
        $mol.$mol_app_signup = $mol_app_signup;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//signup.view.js.map
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
        $mol_app_supplies_enter.prototype.entered = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [].concat();
        };
        $mol_app_supplies_enter.prototype.login = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.login.apply(_this, diff);
                };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "Login"; };
                __.errors = function () { return _this.loginErrors(); };
                __.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [].concat();
        };
        $mol_app_supplies_enter.prototype.password = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.password.apply(_this, diff);
                };
                __.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form_field().setup(function (__) {
                __.name = function () { return "Password"; };
                __.errors = function () { return _this.passwordErrors(); };
                __.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitText = function () {
            return "Log In";
        };
        $mol_app_supplies_enter.prototype.eventSubmit = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_supplies_enter.prototype.submitBlocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat(_this.submitText()); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventSubmit.apply(_this, diff);
                };
                __.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_form().setup(function (__) {
                __.formFields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                __.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.childs = function () {
            return [].concat(this.form());
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "login", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "loginControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "loginField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "password", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "passControl", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "passwordField", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "eventSubmit", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "submit", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_enter.prototype, "form", null);
        return $mol_app_supplies_enter;
    }($mol_viewer));
    $.$mol_app_supplies_enter = $mol_app_supplies_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
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
        var $mol_app_supplies_enter = (function (_super) {
            __extends($mol_app_supplies_enter, _super);
            function $mol_app_supplies_enter() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_enter.prototype.entered = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return (diff[0] === void 0) ? false : diff[0];
            };
            $mol_app_supplies_enter.prototype.eventSubmit = function () {
                this.entered(true);
            };
            __decorate([
                $mol_prop()
            ], $mol_app_supplies_enter.prototype, "entered", null);
            return $mol_app_supplies_enter;
        }($.$mol_app_supplies_enter));
        $mol.$mol_app_supplies_enter = $mol_app_supplies_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var $mol_cordova = window['cordova'] || { plugins: {
        barcodeScanner: null
    } };
function $mol_cordova_camera() {
    return navigator['camera'];
}
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
    var $mol_coder = (function (_super) {
        __extends($mol_coder, _super);
        function $mol_coder() {
            _super.apply(this, arguments);
        }
        $mol_coder.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_coder.prototype.format = function () {
            return "";
        };
        $mol_coder.prototype.hint = function () {
            return this.format();
        };
        $mol_coder.prototype.manualer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.value.apply(_this, diff);
                };
                __.hint = function () { return _this.hint(); };
            });
        };
        $mol_coder.prototype.eventScan = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_coder.prototype.labelScan = function () {
            return "Scan";
        };
        $mol_coder.prototype.scanner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker().setup(function (__) {
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventScan.apply(_this, diff);
                };
                __.childs = function () { return [].concat(_this.labelScan()); };
            });
        };
        $mol_coder.prototype.childs = function () {
            return [].concat(this.manualer(), this.scanner());
        };
        __decorate([
            $mol_prop()
        ], $mol_coder.prototype, "value", null);
        __decorate([
            $mol_prop()
        ], $mol_coder.prototype, "manualer", null);
        __decorate([
            $mol_prop()
        ], $mol_coder.prototype, "eventScan", null);
        __decorate([
            $mol_prop()
        ], $mol_coder.prototype, "scanner", null);
        return $mol_coder;
    }($mol_viewer));
    $.$mol_coder = $mol_coder;
})($ || ($ = {}));
//coder.view.tree.js.map
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
                return Boolean($mol_cordova.plugins.barcodeScanner);
            };
            $mol_coder.prototype.scanner = function () {
                return this.supportScan() ? _super.prototype.scanner.call(this) : null;
            };
            $mol_coder.prototype.eventScan = function () {
                var _this = this;
                $mol_cordova.plugins.barcodeScanner.scan(function (result) {
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
}($mol_object));
//unit.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_unit_money = (function (_super) {
    __extends($mol_unit_money, _super);
    function $mol_unit_money() {
        _super.apply(this, arguments);
    }
    return $mol_unit_money;
}($mol_unit));
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
//money.js.map
;
function $mol_stub_selectRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function $mol_stub_code(length) {
    if (length === void 0) { length = 8; }
    var max = Math.pow(16, length);
    var min = Math.pow(16, length - 1);
    var value = min + Math.floor(Math.random() * (max - min));
    return value.toString(16).toUpperCase();
}
function $mol_stub_price(max) {
    if (max === void 0) { max = 1000; }
    var min = Math.floor(max / 16 / 16);
    var value = min + Math.floor(Math.random() * (max - min));
    return new $mol_unit_money_usd(value);
}
function $mol_stub_productName() {
    var name = $mol_stub_selectRandom(['Monitor 15"', 'Monitor 17"', 'Monitor 19"', 'Graphics card', 'Frame grabber card']);
    var port = $mol_stub_selectRandom(['D-SUB', 'DVI', 'HDMI']);
    var resolution = $mol_stub_selectRandom(['VGA', 'Full HD', '4K']);
    return [name, port, resolution].join(', ');
}
function $mol_stub_companyNameBig() {
    var product = $mol_stub_selectRandom(['Everything', 'Something', 'Anything', 'Nothing']);
    var type = $mol_stub_selectRandom(['Company', 'Corporation', 'Holding']);
    return "A " + type + " that makes " + product;
}
function $mol_stub_companyNameSmall() {
    return $mol_stub_selectRandom(['ACME inc.', 'Dream Company', 'Just Company']);
}
function $mol_stub_companyName() {
    return $mol_stub_selectRandom([$mol_stub_companyNameSmall, $mol_stub_companyNameBig])();
}
function $mol_stub_personName() {
    var first = $mol_stub_selectRandom(['Ivan', 'Petr', 'Sidor']);
    var last = $mol_stub_selectRandom(['Ivanov', 'Petrov', 'Sidorov']);
    return first + " " + last;
}
function $mol_stub_city() {
    return $mol_stub_selectRandom(['Moscow', 'London', 'Washington', 'Buenos Aires']);
}
function $mol_stub_time(maxShift) {
    if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
    return $jin.time.moment().shift({ minute: Math.round(Math.random() * maxShift) });
}
//stub.js.map
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
var $mol_app_supplies_domain_provider = (function (_super) {
    __extends($mol_app_supplies_domain_provider, _super);
    function $mol_app_supplies_domain_provider() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_provider;
}($mol_model));
var $mol_app_supplies_domain_supply_group = (function (_super) {
    __extends($mol_app_supplies_domain_supply_group, _super);
    function $mol_app_supplies_domain_supply_group() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_supply_group.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_supply_group.prototype.name = function () { return void 0; };
    $mol_app_supplies_domain_supply_group.prototype.manager = function () { return void 0; };
    return $mol_app_supplies_domain_supply_group;
}($mol_model));
var $mol_app_supplies_domain_supply_division = (function (_super) {
    __extends($mol_app_supplies_domain_supply_division, _super);
    function $mol_app_supplies_domain_supply_division() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_supply_division;
}($mol_model));
var $mol_app_supplies_domain_payMethod = (function (_super) {
    __extends($mol_app_supplies_domain_payMethod, _super);
    function $mol_app_supplies_domain_payMethod() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_payMethod.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_payMethod.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_payMethod;
}($mol_model));
var $mol_app_supplies_domain_debitor = (function (_super) {
    __extends($mol_app_supplies_domain_debitor, _super);
    function $mol_app_supplies_domain_debitor() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_debitor;
}($mol_model));
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
}($mol_model));
var $mol_app_supplies_domain_attachment = (function (_super) {
    __extends($mol_app_supplies_domain_attachment, _super);
    function $mol_app_supplies_domain_attachment() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_attachment.prototype.urlThumb = function () { return void 0; };
    $mol_app_supplies_domain_attachment.prototype.urlLoad = function () { return void 0; };
    return $mol_app_supplies_domain_attachment;
}($mol_model));
var $mol_app_supplies_domain_person = (function (_super) {
    __extends($mol_app_supplies_domain_person, _super);
    function $mol_app_supplies_domain_person() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_person;
}($mol_model));
var $mol_app_supplies_domain_contract = (function (_super) {
    __extends($mol_app_supplies_domain_contract, _super);
    function $mol_app_supplies_domain_contract() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
    return $mol_app_supplies_domain_contract;
}($mol_model));
var $mol_app_supplies_domain_ballanceUnit = (function (_super) {
    __extends($mol_app_supplies_domain_ballanceUnit, _super);
    function $mol_app_supplies_domain_ballanceUnit() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_ballanceUnit.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_ballanceUnit.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_ballanceUnit;
}($mol_model));
var $mol_app_supplies_domain_consumer = (function (_super) {
    __extends($mol_app_supplies_domain_consumer, _super);
    function $mol_app_supplies_domain_consumer() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_consumer;
}($mol_model));
var $mol_app_supplies_domain_store = (function (_super) {
    __extends($mol_app_supplies_domain_store, _super);
    function $mol_app_supplies_domain_store() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
    return $mol_app_supplies_domain_store;
}($mol_model));
var $mol_app_supplies_domain_supply = (function (_super) {
    __extends($mol_app_supplies_domain_supply, _super);
    function $mol_app_supplies_domain_supply() {
        _super.apply(this, arguments);
    }
    $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.status = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0];
    };
    $mol_app_supplies_domain_supply.prototype.ballanceUnit = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.payMethod = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
    $mol_app_supplies_domain_supply.prototype.attachments = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0] || [];
    };
    $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_supply.prototype, "status", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
    return $mol_app_supplies_domain_supply;
}($mol_model));
var $mol_app_supplies_domain_supply_status;
(function ($mol_app_supplies_domain_supply_status) {
    $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
    $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
})($mol_app_supplies_domain_supply_status || ($mol_app_supplies_domain_supply_status = {}));
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
            next.push(this.position({ supply: supply, position: (i * 123456789 % 987654321).toString(16).toUpperCase() }));
        }
        return next;
    };
    $mol_app_supplies_domain_mock.prototype.supply = function (id) {
        var _this = this;
        return new $mol_app_supplies_domain_supply().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.cost = function () { return new $mol_unit_money_usd(_this.positions(id).reduce(function (sum, pos) { return sum + pos.cost().valueOf(); }, 0)); };
            obj.status(void 0, $mol_app_supplies_domain_supply_status[$mol_stub_selectRandom(['pending', 'approved'])]);
            obj.provider = $mol_const(_this.provider($mol_stub_code(2)));
            obj.consumer = $mol_const(_this.consumer($mol_stub_code(2)));
            obj.group = $mol_const(_this.supplyGroup($mol_stub_code(2)));
            obj.contract = $mol_const(_this.contract($mol_stub_code(8)));
            obj.manager = $mol_const(_this.person($mol_stub_code(2)));
            obj.ballanceUnit = $mol_const(_this.ballanceUnit($mol_stub_code(2)));
            obj.payMethod = $mol_const(_this.payMethod($mol_stub_code(1)));
            obj.debitor = $mol_const(_this.debitor($mol_stub_code(2)));
            obj.positions = function () { return _this.positions(id); };
            obj.attachments = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return _this.attachments.apply(_this, [id].concat(diff));
            };
        });
    };
    $mol_app_supplies_domain_mock.prototype.provider = function (id) {
        return new $mol_app_supplies_domain_provider().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_companyName());
        });
    };
    $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
        return new $mol_app_supplies_domain_consumer().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_companyName());
        });
    };
    $mol_app_supplies_domain_mock.prototype.ballanceUnit = function (id) {
        return new $mol_app_supplies_domain_ballanceUnit().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_selectRandom(['ACME Enterprise', 'ACME Customer', 'ACME Inside']));
        });
    };
    $mol_app_supplies_domain_mock.prototype.division = function (id) {
        return new $mol_app_supplies_domain_supply_division().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_code(4));
        });
    };
    $mol_app_supplies_domain_mock.prototype.supplyGroup = function (id) {
        return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_personName() + ' Group');
        });
    };
    $mol_app_supplies_domain_mock.prototype.store = function (id) {
        return new $mol_app_supplies_domain_store().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_city() + ' #' + $mol_stub_code(2));
        });
    };
    $mol_app_supplies_domain_mock.prototype.person = function (id) {
        return new $mol_app_supplies_domain_person().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_personName());
        });
    };
    $mol_app_supplies_domain_mock.prototype.contract = function (id) {
        return new $mol_app_supplies_domain_person().setup(function (obj) {
            obj.id = $mol_const(id);
        });
    };
    $mol_app_supplies_domain_mock.prototype.payMethod = function (id) {
        return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_selectRandom(['Accounting', 'Cash']));
        });
    };
    $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
        return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
            obj.id = $mol_const(id);
            obj.name = $mol_const($mol_stub_companyName());
        });
    };
    $mol_app_supplies_domain_mock.prototype.position = function (id) {
        var _this = this;
        return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
            obj.name = $mol_const($mol_stub_productName());
            obj.supplyMoment = $mol_const($mol_stub_time(60 * 24 * 365));
            obj.store = $mol_const(_this.store($mol_stub_code(2)));
            obj.division = $mol_const(_this.division($mol_stub_code(2)));
            obj.price = $mol_const($mol_stub_price(1000));
            obj.quantity = $mol_const(Math.round(Math.random() * 30));
            obj.cost = $mol_const(obj.price().mult(obj.quantity()));
        });
    };
    $mol_app_supplies_domain_mock.prototype.attachments = function (id) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return diff[0] || [];
    };
    $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
        return new $mol_app_supplies_domain_attachment().setup(function (obj) {
            obj.urlThumb = obj.urlLoad = $mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
        });
    };
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "positions", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "supply", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "provider", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "consumer", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "ballanceUnit", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "division", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "supplyGroup", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "store", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "person", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "contract", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "payMethod", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "debitor", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "position", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "attachments", null);
    __decorate([
        $mol_prop()
    ], $mol_app_supplies_domain_mock.prototype, "attachment", null);
    return $mol_app_supplies_domain_mock;
}($mol_model));
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
    var $mol_carder = (function (_super) {
        __extends($mol_carder, _super);
        function $mol_carder() {
            _super.apply(this, arguments);
        }
        $mol_carder.prototype.status = function () {
            return "";
        };
        $mol_carder.prototype.attr = function (key) {
            switch (key) {
                case "mol_carder_status": return this.status();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_carder.prototype.attr_keys = function () {
            return ["mol_carder_status"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_carder.prototype.content = function () {
            return null;
        };
        $mol_carder.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_carder.prototype.statusText = function () {
            return this.status();
        };
        $mol_carder.prototype.statuser = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.statusText()); };
            });
        };
        $mol_carder.prototype.childs = function () {
            return [].concat(this.contenter(), this.statuser());
        };
        __decorate([
            $mol_prop()
        ], $mol_carder.prototype, "contenter", null);
        __decorate([
            $mol_prop()
        ], $mol_carder.prototype, "statuser", null);
        return $mol_carder;
    }($mol_viewer));
    $.$mol_carder = $mol_carder;
})($ || ($ = {}));
//carder.view.tree.js.map
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
        $mol_labeler.prototype.title = function () {
            return "";
        };
        $mol_labeler.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.childs = function () {
            return [].concat(this.titler(), this.contenter());
        };
        __decorate([
            $mol_prop()
        ], $mol_labeler.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_labeler.prototype, "contenter", null);
        return $mol_labeler;
    }($mol_viewer));
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
        $mol_coster.prototype.prefixer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_coster.prototype.valueView = function () {
            return "";
        };
        $mol_coster.prototype.mainer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.valueView()); };
            });
        };
        $mol_coster.prototype.postfix = function () {
            return "";
        };
        $mol_coster.prototype.postfixer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_coster.prototype.childs = function () {
            return [].concat(this.prefixer(), this.mainer(), this.postfixer());
        };
        __decorate([
            $mol_prop()
        ], $mol_coster.prototype, "prefixer", null);
        __decorate([
            $mol_prop()
        ], $mol_coster.prototype, "mainer", null);
        __decorate([
            $mol_prop()
        ], $mol_coster.prototype, "postfixer", null);
        return $mol_coster;
    }($mol_viewer));
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
        $mol_app_supplies_carder.prototype.patch = function () {
            return ({});
        };
        $mol_app_supplies_carder.prototype.linker = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.patch = function () { return _this.patch(); };
            });
        };
        $mol_app_supplies_carder.prototype.childs = function () {
            return [].concat(this.contenter(), this.statuser(), this.linker());
        };
        $mol_app_supplies_carder.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.codeItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Code"; };
                __.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_carder.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money().setup(function (__) {
                __.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_carder.prototype.coster = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coster().setup(function (__) {
                __.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_carder.prototype.costItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Cost"; };
                __.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_carder.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.providerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Provider"; };
                __.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_carder.prototype.items = function () {
            return [].concat(this.codeItem(), this.costItem(), this.providerItem());
        };
        $mol_app_supplies_carder.prototype.grouper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_carder.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "linker", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "codeItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "cost", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "coster", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "costItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_carder.prototype, "providerItem", null);
        __decorate([
            $mol_prop()
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
    var $mol_app_supplies_lister = (function (_super) {
        __extends($mol_app_supplies_lister, _super);
        function $mol_app_supplies_lister() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_lister.prototype.supplies = function () {
            return [].concat();
        };
        $mol_app_supplies_lister.prototype.title = function () {
            return "Supplies";
        };
        $mol_app_supplies_lister.prototype.searcherHint = function () {
            return "Search by bar code";
        };
        $mol_app_supplies_lister.prototype.supplyId = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_supplies_lister.prototype.searcher = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.hint = function () { return _this.searcherHint(); };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.supplyId.apply(_this, diff);
                };
            });
        };
        $mol_app_supplies_lister.prototype.searchPanel = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.searcher()); };
            });
        };
        $mol_app_supplies_lister.prototype.childs = function () {
            return [].concat(this.header(), this.searchPanel(), this.bodier());
        };
        $mol_app_supplies_lister.prototype.supplyRows = function () {
            return [].concat();
        };
        $mol_app_supplies_lister.prototype.body = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.supplyRows(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_lister.prototype, "supplyId", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_lister.prototype, "searcher", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_lister.prototype, "searchPanel", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_lister.prototype, "body", null);
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
                    obj.patch = function () { return ({
                        supply: _this.supplies()[index].id(),
                        side: null
                    }); };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_app_supplies_lister.prototype, "supplyRows", null);
            __decorate([
                $mol_prop()
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
            return [].concat();
        };
        $mol_decker.prototype.itemCurrent = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_decker.prototype.switcher = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_switcher().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.itemCurrent.apply(_this, diff);
                };
            });
        };
        $mol_decker.prototype.content = function () {
            return null;
        };
        $mol_decker.prototype.rows = function () {
            return [].concat(this.switcher(), this.content());
        };
        __decorate([
            $mol_prop()
        ], $mol_decker.prototype, "itemCurrent", null);
        __decorate([
            $mol_prop()
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
    }($mol_object));
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
            $mol_decker.prototype.current = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.session.apply(this, ['value()'].concat(diff)) || '0';
            };
            $mol_decker.prototype.switcher = function () {
                var _this = this;
                return new $mol.$mol_switcher().setup(function (obj) {
                    obj.value = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.current.apply(_this, diff);
                    };
                    obj.option_keys = function () { return _this.items().map(function (item, index) { return String(index); }); };
                    obj.option = function (key) { return _this.items()[key].title(); };
                });
            };
            $mol_decker.prototype.content = function () {
                return this.items()[this.current()].content();
            };
            __decorate([
                $mol_prop()
            ], $mol_decker.prototype, "current", null);
            __decorate([
                $mol_prop()
            ], $mol_decker.prototype, "switcher", null);
            __decorate([
                $mol_prop()
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
        $mol_sectioner.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_sectioner.prototype.content = function () {
            return null;
        };
        $mol_sectioner.prototype.rows = function () {
            return [].concat(this.header(), this.content());
        };
        __decorate([
            $mol_prop()
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
            return [].concat();
        };
        $mol_tiler.prototype.childs = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($mol_viewer));
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
            return "M33 12v23c0 4.42-3.58 8-8 8s-8-3.58-8-8V10c0-2.76 2.24-5 5-5s5 2.24 5 5v21c0 1.1-.89 2-2 2-1.11 0-2-.9-2-2V12h-3v19c0 2.76 2.24 5 5 5s5-2.24 5-5V10c0-4.42-3.58-8-8-8s-8 3.58-8 8v25c0 6.08 4.93 11 11 11s11-4.92 11-11V12h-3z";
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
        $mol_attacher.prototype.items = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : [].concat();
        };
        $mol_attacher.prototype.attachNew = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_attacher.prototype.adder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher_adder().setup(function (__) {
                __.fileNew = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.attachNew.apply(_this, diff);
                };
            });
        };
        $mol_attacher.prototype.content = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat(this.items.apply(this, diff), this.adder());
        };
        $mol_attacher.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_tiler().setup(function (__) {
                __.items = function () { return _this.content(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_attacher.prototype, "items", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher.prototype, "attachNew", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher.prototype, "adder", null);
        __decorate([
            $mol_prop()
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
        $mol_attacher_item.prototype.urlThumb = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_attacher_item.prototype.urlLoad = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_attacher_item.prototype.uri = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.urlLoad.apply(this, diff);
        };
        $mol_attacher_item.prototype.styleBG = function () {
            return "";
        };
        $mol_attacher_item.prototype.field = function (key) {
            switch (key) {
                case "style.backgroundImage": return this.styleBG();
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_attacher_item.prototype.field_keys = function () {
            return ["style.backgroundImage"].concat(_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []);
        };
        $mol_attacher_item.prototype.loadable = function () {
            return true;
        };
        $mol_attacher_item.prototype.attr = function (key) {
            switch (key) {
                case "download": return this.loadable();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_attacher_item.prototype.attr_keys = function () {
            return ["download"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_attacher_item.prototype, "urlThumb", null);
        __decorate([
            $mol_prop()
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
        $mol_attacher_adder.prototype.icon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_icon_attach().setup(function (__) {
            });
        };
        $mol_attacher_adder.prototype.eventCapture = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_attacher_adder.prototype.eventPicked = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_attacher_adder.prototype.input = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher_adder_input().setup(function (__) {
                __.eventCapture = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventCapture.apply(_this, diff);
                };
                __.eventPicked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventPicked.apply(_this, diff);
                };
            });
        };
        $mol_attacher_adder.prototype.childs = function () {
            return [].concat(this.icon(), this.input());
        };
        __decorate([
            $mol_prop()
        ], $mol_attacher_adder.prototype, "icon", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher_adder.prototype, "eventCapture", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher_adder.prototype, "eventPicked", null);
        __decorate([
            $mol_prop()
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
        $mol_attacher_adder_input.prototype.attr = function (key) {
            switch (key) {
                case "type": return this.type();
                case "accept": return this.accept();
                case "multiple": return this.multiple();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_attacher_adder_input.prototype.attr_keys = function () {
            return ["type", "accept", "multiple"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_attacher_adder_input.prototype.eventCapture = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_attacher_adder_input.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.eventCapture.apply(this, diff);
        };
        $mol_attacher_adder_input.prototype.eventPicked = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_attacher_adder_input.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "change": return this.eventPicked.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_attacher_adder_input.prototype.event_keys = function () {
            return ["change"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_attacher_adder_input.prototype, "eventCapture", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher_adder_input.prototype, "eventPicked", null);
        return $mol_attacher_adder_input;
    }($mol_viewer));
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
            $mol_attacher.prototype.attachNew = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var items = this.items();
                var itemer = this.itemer(items.length);
                itemer.urlThumb(diff[0]);
                itemer.urlLoad(diff[0]);
                this.items(items.concat(itemer));
            };
            $mol_attacher.prototype.itemer = function (id) {
                return new $mol_attacher_item();
            };
            __decorate([
                $mol_prop()
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
            $mol_attacher_adder.prototype.fileNew = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0];
            };
            $mol_attacher_adder.prototype.eventCapture = function () {
                var _this = this;
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!$mol_cordova_camera())
                    return;
                diff[0].preventDefault();
                $mol_cordova_camera().getPicture(function (url) {
                    _this.fileNew(url);
                }, function (error) {
                    _this.fileNew(error);
                }, {
                    quality: 50
                });
            };
            $mol_attacher_adder.prototype.eventPicked = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var files = [].slice.call(diff[0].target.files);
                for (var _a = 0, files_1 = files; _a < files_1.length; _a++) {
                    var file = files_1[_a];
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
            return 80;
        };
        $mol_app_supplies_positioner.prototype.productName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.productItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Product"; };
                __.content = function () { return _this.productName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money().setup(function (__) {
                __.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.coster = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coster().setup(function (__) {
                __.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_positioner.prototype.costItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Cost"; };
                __.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_positioner.prototype.mainGroup = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.productItem(), _this.costItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.divisionName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.divisionItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Division"; };
                __.content = function () { return _this.divisionName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.price = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money().setup(function (__) {
                __.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.pricer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coster().setup(function (__) {
                __.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_positioner.prototype.priceItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Price"; };
                __.content = function () { return _this.pricer(); };
            });
        };
        $mol_app_supplies_positioner.prototype.addonGroup = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.divisionItem(), _this.priceItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.quantityItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Quantity"; };
                __.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyDate = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.supplyDateItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Supply date"; };
                __.content = function () { return _this.supplyDate(); };
            });
        };
        $mol_app_supplies_positioner.prototype.storeName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.storeItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Store"; };
                __.content = function () { return _this.storeName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyGroup = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.quantityItem(), _this.supplyDateItem(), _this.storeItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.grouper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.mainGroup(), _this.addonGroup(), _this.supplyGroup()); };
            });
        };
        $mol_app_supplies_positioner.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "productItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "cost", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "coster", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "costItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "mainGroup", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "divisionItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "price", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "pricer", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "priceItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "addonGroup", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "quantityItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "supplyDateItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "storeItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner.prototype, "supplyGroup", null);
        __decorate([
            $mol_prop()
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
    var $mol_app_supplies_detailer = (function (_super) {
        __extends($mol_app_supplies_detailer, _super);
        function $mol_app_supplies_detailer() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_detailer.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detailer.prototype.title = function () {
            return "Supply";
        };
        $mol_app_supplies_detailer.prototype.backIcon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_icon_chevron_left().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer.prototype.backPatch = function () {
            return ({ "side": [], "supply": null });
        };
        $mol_app_supplies_detailer.prototype.backer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.childs = function () { return [].concat(_this.backIcon()); };
                __.patch = function () { return _this.backPatch(); };
            });
        };
        $mol_app_supplies_detailer.prototype.head = function () {
            return [].concat(this.backer(), this.titler());
        };
        $mol_app_supplies_detailer.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.providerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Provider"; };
                __.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consumerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.consumerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Consumer"; };
                __.content = function () { return _this.consumerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.supplyGroupName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.supplyGroupItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Supply Group"; };
                __.content = function () { return _this.supplyGroupName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Ballance Unit"; };
                __.content = function () { return _this.ballanceUnitName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItems = function () {
            return [].concat(this.providerItem(), this.consumerItem(), this.supplyGroupItem(), this.ballanceUnitItem());
        };
        $mol_app_supplies_detailer.prototype.orgContent = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.orgItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "Organization"; };
                __.content = function () { return _this.orgContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.contractId = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.contractItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Contract"; };
                __.content = function () { return _this.contractId(); };
            });
        };
        $mol_app_supplies_detailer.prototype.payMethodName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.payMethodItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Pay Method"; };
                __.content = function () { return _this.payMethodName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.managerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.managerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Manager"; };
                __.content = function () { return _this.managerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.debitorName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.debitorItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Debitor"; };
                __.content = function () { return _this.debitorName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItems = function () {
            return [].concat(this.contractItem(), this.payMethodItem(), this.managerItem(), this.debitorItem());
        };
        $mol_app_supplies_detailer.prototype.consContent = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.consItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "Consumer"; };
                __.content = function () { return _this.consContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrDecker = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker().setup(function (__) {
                __.items = function () { return [].concat(_this.orgItem(), _this.consItem()); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrCarder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_carder().setup(function (__) {
                __.content = function () { return _this.descrDecker(); };
            });
        };
        $mol_app_supplies_detailer.prototype.attachHead = function () {
            return "Attachments";
        };
        $mol_app_supplies_detailer.prototype.attachments = function () {
            return [].concat();
        };
        $mol_app_supplies_detailer.prototype.attachNew = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_supplies_detailer.prototype.attacher = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher().setup(function (__) {
                __.items = function () { return _this.attachments(); };
                __.attachNew = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.attachNew.apply(_this, diff);
                };
            });
        };
        $mol_app_supplies_detailer.prototype.attachCarder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_sectioner().setup(function (__) {
                __.head = function () { return _this.attachHead(); };
                __.content = function () { return _this.attacher(); };
            });
        };
        $mol_app_supplies_detailer.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money().setup(function (__) {
                __.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detailer.prototype.coster = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coster().setup(function (__) {
                __.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detailer.prototype.costItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Cost"; };
                __.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_detailer.prototype.posListerHead = function () {
            return [].concat("Positions", this.costItem());
        };
        $mol_app_supplies_detailer.prototype.positions = function () {
            return [].concat();
        };
        $mol_app_supplies_detailer.prototype.posLister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_sectioner().setup(function (__) {
                __.head = function () { return _this.posListerHead(); };
                __.content = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detailer.prototype.content = function () {
            return [].concat(this.descrCarder(), this.attachCarder(), this.posLister());
        };
        $mol_app_supplies_detailer.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detailer.prototype.body = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return [].concat(_this.contenter()); };
            });
        };
        $mol_app_supplies_detailer.prototype.approved = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_app_supplies_detailer.prototype.approver = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.approved.apply(_this, diff);
                };
                __.childs = function () { return [].concat("Approved"); };
            });
        };
        $mol_app_supplies_detailer.prototype.tools = function () {
            return [].concat(this.approver());
        };
        $mol_app_supplies_detailer.prototype.foot = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.tools(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "backIcon", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "backer", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "providerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "consumerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "supplyGroupItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "ballanceUnitItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "orgContent", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "orgItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "contractItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "payMethodItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "managerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "debitorItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "consContent", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "consItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "descrDecker", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "descrCarder", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "attachNew", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "attacher", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "attachCarder", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "cost", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "coster", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "costItem", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "posLister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "contenter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "body", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "approved", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "approver", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer.prototype, "foot", null);
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
            $mol_app_supplies_detailer.prototype.approved = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.supply().status() === $mol_app_supplies_domain_supply_status.approved;
                this.supply().status(diff[0]
                    ? $mol_app_supplies_domain_supply_status.approved
                    : $mol_app_supplies_domain_supply_status.pending);
                return diff[0];
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
            $mol_app_supplies_detailer.prototype.attachNew = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var supply = this.supply();
                var list = supply.attachments();
                var url = $mol_const(diff[0]);
                list = list.concat(new $mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.urlThumb = obj.urlLoad = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detailer.prototype.bodier = function () {
                var _this = this;
                return new $mol.$mol_scroller().setup(function (obj) {
                    obj.childs = function () { return [_this.body()]; };
                    obj.scrollTop = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.scrollTop.apply(_this, diff);
                    };
                });
            };
            $mol_app_supplies_detailer.prototype.scrollTop = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var supplyId = this.supply() && this.supply().id();
                return this.session.apply(this, ["scrollTop(\"" + supplyId + "\")"].concat(diff));
            };
            __decorate([
                $mol_prop()
            ], $mol_app_supplies_detailer.prototype, "position", null);
            __decorate([
                $mol_prop()
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
    var $mol_app_supplies = (function (_super) {
        __extends($mol_app_supplies, _super);
        function $mol_app_supplies() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies.prototype.entered = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_app_supplies.prototype.enter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_enter().setup(function (__) {
                __.entered = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.entered.apply(_this, diff);
                };
            });
        };
        $mol_app_supplies.prototype.supplies = function () {
            return [].concat();
        };
        $mol_app_supplies.prototype.supplyId = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_supplies.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_lister().setup(function (__) {
                __.supplies = function () { return _this.supplies(); };
                __.supplyId = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.supplyId.apply(_this, diff);
                };
            });
        };
        $mol_app_supplies.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies.prototype.detailer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_detailer().setup(function (__) {
                __.supply = function () { return _this.supply(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies.prototype, "entered", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies.prototype, "enter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies.prototype, "supplyId", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies.prototype, "detailer", null);
        return $mol_app_supplies;
    }($.$mol_stacker));
    $.$mol_app_supplies = $mol_app_supplies;
})($ || ($ = {}));
//supplies.view.tree.js.map
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
        var $mol_app_supplies = (function (_super) {
            __extends($mol_app_supplies, _super);
            function $mol_app_supplies() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies.prototype.entered = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.session.apply(this, ['entered()'].concat(diff)) || false;
            };
            $mol_app_supplies.prototype.childs = function () {
                return [
                    this.entered()
                        ? this.mainer()
                        : null,
                    this.addoner()
                ];
            };
            $mol_app_supplies.prototype.main = function () {
                return this.supply()
                    ? [this.detailer()]
                    : null;
            };
            $mol_app_supplies.prototype.addon = function () {
                return this.entered()
                    ? this.lister()
                    : this.enter();
            };
            $mol_app_supplies.prototype.domain = function () {
                return new $mol_app_supplies_domain_mock();
            };
            $mol_app_supplies.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies.prototype.supplyId = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var next = (_a = this.argument()).value.apply(_a, ['supply'].concat(diff));
                return next && String(next);
                var _a;
            };
            $mol_app_supplies.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supplyId();
                return id ? this.domain().supply(id) : null;
            };
            __decorate([
                $mol_prop()
            ], $mol_app_supplies.prototype, "domain", null);
            return $mol_app_supplies;
        }($.$mol_app_supplies));
        $mol.$mol_app_supplies = $mol_app_supplies;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//supplies.view.js.map
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
            return "NorNikel";
        };
        $mol_app_supplies_carder_demo_pending.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_usd().setup(function (__) {
                __.valueOf = function () { return 1000000; };
            });
        };
        $mol_app_supplies_carder_demo_pending.prototype.status = function () {
            return "pending";
        };
        __decorate([
            $mol_prop()
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
            return "Gazprom";
        };
        $mol_app_supplies_carder_demo_approved.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_rur().setup(function (__) {
                __.valueOf = function () { return 3000000; };
            });
        };
        $mol_app_supplies_carder_demo_approved.prototype.status = function () {
            return "approved";
        };
        __decorate([
            $mol_prop()
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
            return "NorNikel";
        };
        $mol_app_supplies_carder_demo_selected.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_usd().setup(function (__) {
                __.valueOf = function () { return 900000; };
            });
        };
        $mol_app_supplies_carder_demo_selected.prototype.status = function () {
            return "selected";
        };
        __decorate([
            $mol_prop()
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
    var $mol_app_supplies_positioner_demo = (function (_super) {
        __extends($mol_app_supplies_positioner_demo, _super);
        function $mol_app_supplies_positioner_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_positioner_demo.prototype.productName = function () {
            return "Bread";
        };
        $mol_app_supplies_positioner_demo.prototype.price = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_usd().setup(function (__) {
                __.valueOf = function () { return 1; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.quantity = function () {
            return "100";
        };
        $mol_app_supplies_positioner_demo.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_usd().setup(function (__) {
                __.valueOf = function () { return 100; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.supplyDate = function () {
            return "2016-01-13";
        };
        $mol_app_supplies_positioner_demo.prototype.divisionName = function () {
            return "Food";
        };
        $mol_app_supplies_positioner_demo.prototype.storeName = function () {
            return "Main office";
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_positioner_demo.prototype, "price", null);
        __decorate([
            $mol_prop()
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
            return "Supply 31337";
        };
        $mol_app_supplies_detailer_demo.prototype.approved = function () {
            return false;
        };
        $mol_app_supplies_detailer_demo.prototype.providerName = function () {
            return "ACME Provider Inc.";
        };
        $mol_app_supplies_detailer_demo.prototype.cost = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_unit_money_rur().setup(function (__) {
                __.valueOf = function () { return 1234567; };
            });
        };
        $mol_app_supplies_detailer_demo.prototype.consumerName = function () {
            return "ACME Consumer Inc.";
        };
        $mol_app_supplies_detailer_demo.prototype.supplyGroupName = function () {
            return "Ivanov PI";
        };
        $mol_app_supplies_detailer_demo.prototype.ballanceUnitName = function () {
            return "ACME Consumer Inc.";
        };
        $mol_app_supplies_detailer_demo.prototype.contractId = function () {
            return "123675234";
        };
        $mol_app_supplies_detailer_demo.prototype.payMethodName = function () {
            return "Accounting";
        };
        $mol_app_supplies_detailer_demo.prototype.managerName = function () {
            return "Petrov IV";
        };
        $mol_app_supplies_detailer_demo.prototype.debitorName = function () {
            return "12432311 - ACME Finance";
        };
        $mol_app_supplies_detailer_demo.prototype.pos1 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_positioner_demo().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer_demo.prototype.pos2 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_positioner_demo().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer_demo.prototype.pos3 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_positioner_demo().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer_demo.prototype.pos4 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_positioner_demo().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer_demo.prototype.pos5 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_supplies_positioner_demo().setup(function (__) {
            });
        };
        $mol_app_supplies_detailer_demo.prototype.positions = function () {
            return [].concat(this.pos1(), this.pos2(), this.pos3(), this.pos4(), this.pos5());
        };
        $mol_app_supplies_detailer_demo.prototype.attachments = function () {
            return [].concat();
        };
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "cost", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "pos1", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "pos2", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "pos3", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "pos4", null);
        __decorate([
            $mol_prop()
        ], $mol_app_supplies_detailer_demo.prototype, "pos5", null);
        return $mol_app_supplies_detailer_demo;
    }($.$mol_app_supplies_detailer));
    $.$mol_app_supplies_detailer_demo = $mol_app_supplies_detailer_demo;
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
    var $mol_app_todomvc = (function (_super) {
        __extends($mol_app_todomvc, _super);
        function $mol_app_todomvc() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc.prototype.title = function () {
            return "todos";
        };
        $mol_app_todomvc.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_todomvc.prototype.allCompleted = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_app_todomvc.prototype.allCompleter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.allCompleted.apply(_this, diff);
                };
                __.childs = function () { return [].concat("❯"); };
            });
        };
        $mol_app_todomvc.prototype.taskNewTitle = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_todomvc.prototype.eventAdd = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_todomvc.prototype.adder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_todomvc_taskRow_adder().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.taskNewTitle.apply(_this, diff);
                };
                __.eventDone = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventAdd.apply(_this, diff);
                };
            });
        };
        $mol_app_todomvc.prototype.headerContent = function () {
            return [].concat(this.allCompleter(), this.adder());
        };
        $mol_app_todomvc.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.headerContent(); };
            });
        };
        $mol_app_todomvc.prototype.taskRows = function () {
            return [].concat();
        };
        $mol_app_todomvc.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.taskRows(); };
            });
        };
        $mol_app_todomvc.prototype.pendingCount = function () {
            return 0;
        };
        $mol_app_todomvc.prototype.pendingCounter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.pendingCount()); };
            });
        };
        $mol_app_todomvc.prototype.pendingTail = function () {
            return " items left";
        };
        $mol_app_todomvc.prototype.pendingMessage = function () {
            return [].concat(this.pendingCounter(), this.pendingTail());
        };
        $mol_app_todomvc.prototype.pendinger = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return _this.pendingMessage(); };
            });
        };
        $mol_app_todomvc.prototype.filterAll = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.childs = function () { return [].concat("All"); };
                __.patch = function () { return ({ "completed": null }); };
            });
        };
        $mol_app_todomvc.prototype.filterActive = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.childs = function () { return [].concat("Active"); };
                __.patch = function () { return ({ "completed": false }); };
            });
        };
        $mol_app_todomvc.prototype.filterCompleted = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.childs = function () { return [].concat("Completed"); };
                __.patch = function () { return ({ "completed": true }); };
            });
        };
        $mol_app_todomvc.prototype.filterOptions = function () {
            return [].concat(this.filterAll(), this.filterActive(), this.filterCompleted());
        };
        $mol_app_todomvc.prototype.filter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.filterOptions(); };
            });
        };
        $mol_app_todomvc.prototype.sanitizerEnabled = function () {
            return true;
        };
        $mol_app_todomvc.prototype.eventSanitize = function () {
            return null;
        };
        $mol_app_todomvc.prototype.sanitizerMessage = function () {
            return "Clear completed";
        };
        $mol_app_todomvc.prototype.sanitizer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.enabled = function () { return _this.sanitizerEnabled(); };
                __.eventClick = function () { return _this.eventSanitize(); };
                __.childs = function () { return [].concat(_this.sanitizerMessage()); };
            });
        };
        $mol_app_todomvc.prototype.footerContent = function () {
            return [].concat(this.pendinger(), this.filter(), this.sanitizer());
        };
        $mol_app_todomvc.prototype.footer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return _this.footerContent(); };
            });
        };
        $mol_app_todomvc.prototype.paneler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return [].concat(_this.header(), _this.lister(), _this.footer()); };
            });
        };
        $mol_app_todomvc.prototype.childs = function () {
            return [].concat(this.titler(), this.paneler());
        };
        $mol_app_todomvc.prototype.taskCompleted = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_app_todomvc.prototype.taskTitle = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_todomvc.prototype.eventTaskDrop = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_todomvc.prototype.taskRow = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_todomvc_taskRow().setup(function (__) {
                __.completed = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.taskCompleted.apply(_this, [key].concat(diff));
                };
                __.title = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.taskTitle.apply(_this, [key].concat(diff));
                };
                __.eventDrop = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventTaskDrop.apply(_this, [key].concat(diff));
                };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "allCompleted", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "allCompleter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "taskNewTitle", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "eventAdd", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "adder", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "header", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "pendingCounter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "pendinger", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "filterAll", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "filterActive", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "filterCompleted", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "filter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "sanitizer", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "footer", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "paneler", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "taskCompleted", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "taskTitle", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "eventTaskDrop", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc.prototype, "taskRow", null);
        return $mol_app_todomvc;
    }($.$mol_scroller));
    $.$mol_app_todomvc = $mol_app_todomvc;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_todomvc_ghost = (function (_super) {
        __extends($mol_app_todomvc_ghost, _super);
        function $mol_app_todomvc_ghost() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc_ghost.prototype.visible = function () {
            return true;
        };
        $mol_app_todomvc_ghost.prototype.attr = function (key) {
            switch (key) {
                case "mol_app_todomvc_ghost_visible": return this.visible();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_app_todomvc_ghost.prototype.attr_keys = function () {
            return ["mol_app_todomvc_ghost_visible"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        return $mol_app_todomvc_ghost;
    }($mol_viewer));
    $.$mol_app_todomvc_ghost = $mol_app_todomvc_ghost;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_todomvc_taskRow_adder = (function (_super) {
        __extends($mol_app_todomvc_taskRow_adder, _super);
        function $mol_app_todomvc_taskRow_adder() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc_taskRow_adder.prototype.hint = function () {
            return "What needs to be done?";
        };
        $mol_app_todomvc_taskRow_adder.prototype.eventPress = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_todomvc_taskRow_adder.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "keyup": return this.eventPress.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_app_todomvc_taskRow_adder.prototype.event_keys = function () {
            return ["keyup"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        $mol_app_todomvc_taskRow_adder.prototype.eventDone = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow_adder.prototype, "eventPress", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow_adder.prototype, "eventDone", null);
        return $mol_app_todomvc_taskRow_adder;
    }($.$mol_stringer));
    $.$mol_app_todomvc_taskRow_adder = $mol_app_todomvc_taskRow_adder;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_todomvc_taskRow = (function (_super) {
        __extends($mol_app_todomvc_taskRow, _super);
        function $mol_app_todomvc_taskRow() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc_taskRow.prototype.heightMinimal = function () {
            return 60;
        };
        $mol_app_todomvc_taskRow.prototype.completed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_app_todomvc_taskRow.prototype.completer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.completed.apply(_this, diff);
                };
            });
        };
        $mol_app_todomvc_taskRow.prototype.title = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_todomvc_taskRow.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Task title"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.title.apply(_this, diff);
                };
            });
        };
        $mol_app_todomvc_taskRow.prototype.eventDrop = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_todomvc_taskRow.prototype.dropper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker().setup(function (__) {
                __.childs = function () { return [].concat("✖"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventDrop.apply(_this, diff);
                };
            });
        };
        $mol_app_todomvc_taskRow.prototype.childs = function () {
            return [].concat(this.completer(), this.titler(), this.dropper());
        };
        $mol_app_todomvc_taskRow.prototype.attr = function (key) {
            switch (key) {
                case "mol_app_todomvc_taskRow_completed": return this.completed();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_app_todomvc_taskRow.prototype.attr_keys = function () {
            return ["mol_app_todomvc_taskRow_completed"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "completed", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "completer", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "title", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "eventDrop", null);
        __decorate([
            $mol_prop()
        ], $mol_app_todomvc_taskRow.prototype, "dropper", null);
        return $mol_app_todomvc_taskRow;
    }($.$mol_rower));
    $.$mol_app_todomvc_taskRow = $mol_app_todomvc_taskRow;
})($ || ($ = {}));
//todomvc.view.tree.js.map
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
        var $mol_app_todomvc_taskRow_adder = (function (_super) {
            __extends($mol_app_todomvc_taskRow_adder, _super);
            function $mol_app_todomvc_taskRow_adder() {
                _super.apply(this, arguments);
            }
            $mol_app_todomvc_taskRow_adder.prototype.eventPress = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                switch (diff[0]['code'] || diff[0].key) {
                    case 'Enter': return this.eventDone(event);
                }
            };
            return $mol_app_todomvc_taskRow_adder;
        }($.$mol_app_todomvc_taskRow_adder));
        $mol.$mol_app_todomvc_taskRow_adder = $mol_app_todomvc_taskRow_adder;
        var $mol_app_todomvc = (function (_super) {
            __extends($mol_app_todomvc, _super);
            function $mol_app_todomvc() {
                _super.apply(this, arguments);
            }
            $mol_app_todomvc.prototype.tasksAll = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ['tasksAll'].concat(diff)) || [{ completed: false, title: 'hello' }];
            };
            $mol_app_todomvc.prototype.argCompleted = function () {
                var val = this.argument().value('completed');
                return val && (val[0]);
            };
            $mol_app_todomvc.prototype.groupsByCompleted = function () {
                var groups = { 'true': [], 'false': [] };
                this.tasksAll().forEach(function (task) {
                    groups[String(task.completed)].push(task);
                });
                return groups;
            };
            $mol_app_todomvc.prototype.tasks = function () {
                var completed = this.argCompleted();
                if (completed) {
                    return this.groupsByCompleted()[completed] || [];
                }
                else {
                    return this.tasksAll();
                }
            };
            $mol_app_todomvc.prototype.pendingCount = function () {
                return this.groupsByCompleted()['false'].length;
            };
            $mol_app_todomvc.prototype.completedCount = function () {
                return this.groupsByCompleted()['true'].length;
            };
            $mol_app_todomvc.prototype.allCompleted = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.pendingCount() === 0;
                this.tasksAll(this.tasksAll().map(function (task) {
                    if (task.completed === diff[0])
                        return task;
                    return { title: task.title, completed: diff[0] };
                }));
                return diff[0];
            };
            $mol_app_todomvc.prototype.pendingTail = function () {
                return (this.pendingCount() === 1) ? ' item left' : ' items left';
            };
            $mol_app_todomvc.prototype.eventAdd = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var title = this.taskNewTitle();
                if (!title)
                    return;
                this.tasksAll(this.tasksAll().concat({ completed: false, title: title }));
                this.taskNewTitle('');
            };
            $mol_app_todomvc.prototype.taskRows = function () {
                var _this = this;
                return this.tasks().map(function (task, id) { return _this.taskRow(id); });
            };
            $mol_app_todomvc.prototype.task = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.tasksAll()[id] || { title: '', completed: false };
                var tasks = this.tasksAll();
                tasks = tasks.slice(0, id).concat($mol_maybe(diff[0])).concat(tasks.slice(id + 1, tasks.length));
                this.tasksAll(tasks);
                return diff[0];
            };
            $mol_app_todomvc.prototype.taskCompleted = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                var task = this.task(id);
                if (diff[0] === void 0)
                    return task.completed;
                if (diff[0] === task.completed)
                    return task.completed;
                this.task(id, { title: task.title, completed: diff[0] });
                return diff[0];
            };
            $mol_app_todomvc.prototype.taskTitle = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                var task = this.task(id);
                if (diff[0] === void 0)
                    return task.title;
                if (diff[0] === task.title)
                    return task.title;
                this.task(id, { title: diff[0], completed: task.completed });
                return diff[0];
            };
            $mol_app_todomvc.prototype.eventTaskDrop = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                this.task(id, null);
            };
            $mol_app_todomvc.prototype.eventSanitize = function () {
                this.tasksAll(this.tasksAll().filter(function (task) { return !task.completed; }));
            };
            $mol_app_todomvc.prototype.sanitizerMessage = function () {
                var count = this.completedCount();
                var message = "Clear completed";
                if (count)
                    message += " (" + count + ")";
                return message;
            };
            $mol_app_todomvc.prototype.footerVisible = function () {
                return this.tasksAll().length > 0;
            };
            $mol_app_todomvc.prototype.sanitizerEnabled = function () {
                return this.completedCount() > 0;
            };
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "tasksAll", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "groupsByCompleted", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "tasks", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "allCompleted", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "pendingTail", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "eventAdd", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "taskRows", null);
            __decorate([
                $mol_prop()
            ], $mol_app_todomvc.prototype, "eventTaskDrop", null);
            return $mol_app_todomvc;
        }($.$mol_app_todomvc));
        $mol.$mol_app_todomvc = $mol_app_todomvc;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//todomvc.view.js.map
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
var $mol_http_request = (function (_super) {
    __extends($mol_http_request, _super);
    function $mol_http_request() {
        _super.apply(this, arguments);
    }
    $mol_http_request.prototype.uri = function () { return ''; };
    $mol_http_request.prototype.method = function () { return 'get'; };
    $mol_http_request.prototype.body = function () { return null; };
    $mol_http_request.prototype.native = function () {
        var _this = this;
        if (this['native()'])
            return this['native()'];
        var next = this['native()'] = new (this.Class().XMLHttpRequest);
        next.open(this.method(), this.uri());
        next.onload = function (event) {
            if (Math.floor(next.status / 100) === 2) {
                _this.response(void 0, next);
            }
            else {
                _this.response(void 0, new Error(next.responseText));
            }
            $mol_defer.run();
        };
        next.onerror = function (event) {
            _this.response(void 0, event.error || new Error('Unknown HTTP error'));
            $mol_defer.run();
        };
        next.send(this.body());
        return next;
    };
    $mol_http_request.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0]) {
            var native = this['native()'];
            if (native)
                native.abort();
        }
        return _super.prototype.destroyed.apply(this, diff);
    };
    $mol_http_request.prototype.response = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            return diff[0];
        this.native();
        throw new $mol_atom_wait(this.method() + " " + this.uri());
    };
    $mol_http_request.prototype.text = function () {
        return this.response().responseText;
    };
    $mol_http_request.prototype.xml = function () {
        return this.response().responseXML.documentElement;
    };
    $mol_http_request.prototype.json = function () {
        return JSON.parse(this.text());
    };
    $mol_http_request.prototype.csv = function () {
        var lines = this.text().split(/\r?\n/g);
        var header = lines.shift().split(';');
        var next = [];
        lines.forEach(function (line) {
            if (!line)
                return;
            var row = {};
            line.split(';').forEach(function (val, index) {
                row[header[index]] = val;
            });
            next.push(row);
        });
        return next;
    };
    $mol_http_request.XMLHttpRequest = XMLHttpRequest;
    __decorate([
        $mol_prop()
    ], $mol_http_request.prototype, "response", null);
    return $mol_http_request;
}($mol_object));
//request.js.map
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
var $mol_http_resource = (function (_super) {
    __extends($mol_http_resource, _super);
    function $mol_http_resource() {
        _super.apply(this, arguments);
    }
    $mol_http_resource.item = function (uri) {
        return new this().setup(function (obj) {
            obj.uri = function () { return uri; };
        });
    };
    $mol_http_resource.prototype.uri = function () { return ''; };
    $mol_http_resource.prototype.request = function (method) {
        var _this = this;
        return new $mol_http_request().setup(function (obj) {
            obj.method = function () { return method; };
            obj.uri = function () { return _this.uri(); };
        });
    };
    $mol_http_resource.prototype.latency = function () {
        return 200;
    };
    $mol_http_resource.prototype.downloader = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        setTimeout(function () {
            _this.downloader(void 0, _this.request('get'));
        }, this.latency());
        throw new $mol_atom_wait('Throttling...');
    };
    $mol_http_resource.prototype.uploader = function () {
        var body = this.jsonNext();
        if (body === void 0)
            return null;
        return this.request('put').setup(function (obj) {
            obj.body = function () { return body; };
        });
    };
    $mol_http_resource.prototype.uploaded = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (!this.uploader())
            return null;
        return this.json(void 0, this.uploader().json());
    };
    $mol_http_resource.prototype.json = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0) {
            return this.downloader.apply(this, diff).json();
        }
        else {
            this.jsonNext(diff[0]);
        }
    };
    $mol_http_resource.prototype.jsonNext = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0];
    };
    $mol_http_resource.prototype.refresh = function () {
        this.downloader(void 0);
        this.jsonNext(void 0, void 0);
    };
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "downloader", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "uploader", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "uploaded", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "json", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "jsonNext", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource, "item", null);
    return $mol_http_resource;
}($mol_object));
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
    var $mol_app_users = (function (_super) {
        __extends($mol_app_users, _super);
        function $mol_app_users() {
            _super.apply(this, arguments);
        }
        $mol_app_users.prototype.searchQuery = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_users.prototype.filter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Search users on GitHub"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.searchQuery.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.userRows = function () {
            return [].concat();
        };
        $mol_app_users.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.userRows(); };
            });
        };
        $mol_app_users.prototype.body = function () {
            return [].concat(this.lister());
        };
        $mol_app_users.prototype.bodier = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return _this.body(); };
            });
        };
        $mol_app_users.prototype.eventReload = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_users.prototype.reloader = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () { return [].concat("Reload"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventReload.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.loaded = function () {
            return false;
        };
        $mol_app_users.prototype.eventAdd = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_users.prototype.adder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.enabled = function () { return _this.loaded(); };
                __.childs = function () { return [].concat("Add"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventAdd.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.changed = function () {
            return false;
        };
        $mol_app_users.prototype.eventSave = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_users.prototype.saver = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.enabled = function () { return _this.changed(); };
                __.childs = function () { return [].concat("Save"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventSave.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.saverResult = function () {
            return "";
        };
        $mol_app_users.prototype.messager = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.saverResult()); };
            });
        };
        $mol_app_users.prototype.controller = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () { return [].concat(_this.reloader(), _this.adder(), _this.saver(), _this.messager()); };
            });
        };
        $mol_app_users.prototype.childs = function () {
            return [].concat(this.filter(), this.bodier(), this.controller());
        };
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "searchQuery", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "filter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "bodier", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventReload", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "reloader", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventAdd", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "adder", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventSave", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "saver", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "messager", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "controller", null);
        return $mol_app_users;
    }($mol_viewer));
    $.$mol_app_users = $mol_app_users;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_users_item = (function (_super) {
        __extends($mol_app_users_item, _super);
        function $mol_app_users_item() {
            _super.apply(this, arguments);
        }
        $mol_app_users_item.prototype.title = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_users_item.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.title.apply(_this, diff);
                };
            });
        };
        $mol_app_users_item.prototype.eventDrop = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_app_users_item.prototype.dropper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () { return [].concat("Drop"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventDrop.apply(_this, diff);
                };
            });
        };
        $mol_app_users_item.prototype.childs = function () {
            return [].concat(this.titler(), this.dropper());
        };
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "title", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "eventDrop", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "dropper", null);
        return $mol_app_users_item;
    }($.$mol_rower));
    $.$mol_app_users_item = $mol_app_users_item;
})($ || ($ = {}));
//users.view.tree.js.map
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
var $mol_app_users_github = (function (_super) {
    __extends($mol_app_users_github, _super);
    function $mol_app_users_github() {
        _super.apply(this, arguments);
    }
    $mol_app_users_github.search = function (query) {
        return new this().setup(function (obj) {
            obj.uri = function () { return 'https://api.github.com/search/users?per_page=100&q=' + encodeURIComponent(query); };
        });
    };
    $mol_app_users_github.prototype.users = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff.length === 0) {
            return this.json().items.map(function (_a) {
                var login = _a.login;
                return login;
            });
        }
        this.json(diff[0] && { items: diff[0].map(function (login) { return ({ login: login }); }) });
    };
    $mol_app_users_github.prototype.latency = function () {
        return 1000;
    };
    __decorate([
        $mol_prop()
    ], $mol_app_users_github.prototype, "users", null);
    __decorate([
        $mol_prop()
    ], $mol_app_users_github, "search", null);
    return $mol_app_users_github;
}($mol_http_resource));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_users = (function (_super) {
            __extends($mol_app_users, _super);
            function $mol_app_users() {
                _super.apply(this, arguments);
            }
            $mol_app_users.prototype.searchQuery = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return String((_a = this.argument()).value.apply(_a, ['query'].concat(diff)) || '');
                var _a;
            };
            $mol_app_users.prototype.master = function () {
                var query = this.searchQuery();
                if (!query)
                    return null;
                return $mol_app_users_github.search(query);
            };
            $mol_app_users.prototype.childs = function () {
                var next = [this.filter()];
                if (this.master())
                    next = [].concat(next, this.bodier(), this.controller());
                return next;
            };
            $mol_app_users.prototype.users = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || this.usersMaster();
            };
            $mol_app_users.prototype.usersMaster = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!this.searchQuery())
                    return [];
                return (_a = this.master()).users.apply(_a, diff);
                var _a;
            };
            $mol_app_users.prototype.saverResult = function () {
                if (!this.master())
                    return null;
                if (!this.master().uploaded())
                    return null;
                if (this.changed())
                    return null;
                return 'Saved.';
            };
            $mol_app_users.prototype.eventReload = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.master().refresh();
            };
            $mol_app_users.prototype.eventAdd = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.users(this.users().concat(''));
            };
            $mol_app_users.prototype.eventUserDrop = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                this.users(this.users().filter(function (name, i) { return (i !== id); }));
            };
            $mol_app_users.prototype.changed = function () {
                return JSON.stringify(this.usersMaster()) !== JSON.stringify(this.users());
            };
            $mol_app_users.prototype.loaded = function () {
                return Boolean(this.users());
            };
            $mol_app_users.prototype.eventSave = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!this.changed())
                    return;
                this.usersMaster(this.users());
            };
            $mol_app_users.prototype.body = function () {
                if (this.users().length) {
                    return [this.lister()];
                }
                else {
                    return ['Users not found'];
                }
            };
            $mol_app_users.prototype.userRows = function () {
                var _this = this;
                return this.users().map(function (user, id) { return _this.userRow(id); });
            };
            $mol_app_users.prototype.userRow = function (id) {
                var _this = this;
                return new $.$mol_app_users_item().setup(function (obj) {
                    obj.title = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.userName.apply(_this, [id].concat(diff));
                    };
                    obj.eventDrop = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.eventUserDrop.apply(_this, [id].concat(diff));
                    };
                });
            };
            $mol_app_users.prototype.userName = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.users()[id] || '';
                this.users(this.users().map(function (name, i) { return (i === id) ? diff[0] : name; }));
                return diff[0];
            };
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "users", null);
            __decorate([
                $mol_prop({
                    fail: function (view, error) {
                        if (error instanceof $mol_atom_wait)
                            return error;
                        return error.message;
                    }
                })
            ], $mol_app_users.prototype, "saverResult", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userRows", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userRow", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userName", null);
            return $mol_app_users;
        }($.$mol_app_users));
        $mol.$mol_app_users = $mol_app_users;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//users.view.js.map
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
    var $mol_attacher_demo = (function (_super) {
        __extends($mol_attacher_demo, _super);
        function $mol_attacher_demo() {
            _super.apply(this, arguments);
        }
        return $mol_attacher_demo;
    }($.$mol_attacher));
    $.$mol_attacher_demo = $mol_attacher_demo;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_demo_filled = (function (_super) {
        __extends($mol_attacher_demo_filled, _super);
        function $mol_attacher_demo_filled() {
            _super.apply(this, arguments);
        }
        $mol_attacher_demo_filled.prototype.item0 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher_item().setup(function (__) {
                __.urlThumb = function () { return "/mol/logo/logo.svg"; };
                __.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.item1 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher_item().setup(function (__) {
                __.urlThumb = function () { return "/mol/logo/logo.svg"; };
                __.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.item2 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_attacher_item().setup(function (__) {
                __.urlThumb = function () { return "/mol/logo/logo.svg"; };
                __.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.items = function () {
            return [].concat(this.item0(), this.item1(), this.item2());
        };
        __decorate([
            $mol_prop()
        ], $mol_attacher_demo_filled.prototype, "item0", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher_demo_filled.prototype, "item1", null);
        __decorate([
            $mol_prop()
        ], $mol_attacher_demo_filled.prototype, "item2", null);
        return $mol_attacher_demo_filled;
    }($.$mol_attacher));
    $.$mol_attacher_demo_filled = $mol_attacher_demo_filled;
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
    var $mol_rower_demo = (function (_super) {
        __extends($mol_rower_demo, _super);
        function $mol_rower_demo() {
            _super.apply(this, arguments);
        }
        $mol_rower_demo.prototype.heightMinimal = function () {
            return 50;
        };
        $mol_rower_demo.prototype.title = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_rower_demo.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () { return "Title"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.title.apply(_this, diff);
                };
            });
        };
        $mol_rower_demo.prototype.publish = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_rower_demo.prototype.publisher = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.childs = function () { return [].concat("Shared"); };
                __.checked = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.publish.apply(_this, diff);
                };
            });
        };
        $mol_rower_demo.prototype.eventLog = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_rower_demo.prototype.buttonDrop = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () { return [].concat("Drop"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventLog.apply(_this, diff);
                };
            });
        };
        $mol_rower_demo.prototype.childs = function () {
            return [].concat(this.titler(), this.publisher(), this.buttonDrop());
        };
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "title", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "publish", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "publisher", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "eventLog", null);
        __decorate([
            $mol_prop()
        ], $mol_rower_demo.prototype, "buttonDrop", null);
        return $mol_rower_demo;
    }($.$mol_rower));
    $.$mol_rower_demo = $mol_rower_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
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
            $mol_rower_demo.prototype.eventLog = function () {
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
//demo.view.js.map
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
    var $mol_carder_demo_base = (function (_super) {
        __extends($mol_carder_demo_base, _super);
        function $mol_carder_demo_base() {
            _super.apply(this, arguments);
        }
        $mol_carder_demo_base.prototype.content = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower_demo().setup(function (__) {
            });
        };
        $mol_carder_demo_base.prototype.status = function () {
            return "pending";
        };
        __decorate([
            $mol_prop()
        ], $mol_carder_demo_base.prototype, "content", null);
        return $mol_carder_demo_base;
    }($.$mol_carder));
    $.$mol_carder_demo_base = $mol_carder_demo_base;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_carder_demo_selected = (function (_super) {
        __extends($mol_carder_demo_selected, _super);
        function $mol_carder_demo_selected() {
            _super.apply(this, arguments);
        }
        $mol_carder_demo_selected.prototype.content = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower_demo().setup(function (__) {
            });
        };
        $mol_carder_demo_selected.prototype.status = function () {
            return "selected";
        };
        __decorate([
            $mol_prop()
        ], $mol_carder_demo_selected.prototype, "content", null);
        return $mol_carder_demo_selected;
    }($.$mol_carder));
    $.$mol_carder_demo_selected = $mol_carder_demo_selected;
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
    var $mol_checker_demo = (function (_super) {
        __extends($mol_checker_demo, _super);
        function $mol_checker_demo() {
            _super.apply(this, arguments);
        }
        $mol_checker_demo.prototype.c1 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.childs = function () { return [].concat("Unchecked"); };
            });
        };
        $mol_checker_demo.prototype.c2 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.childs = function () { return [].concat("Checked"); };
                __.checked = function () { return (true); };
            });
        };
        $mol_checker_demo.prototype.c3 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
            });
        };
        $mol_checker_demo.prototype.c4 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.checked = function () { return (true); };
            });
        };
        $mol_checker_demo.prototype.c5 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.disabled = function () { return (true); };
            });
        };
        $mol_checker_demo.prototype.c6 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker().setup(function (__) {
                __.childs = function () { return [].concat("Disabled"); };
                __.checked = function () { return (true); };
                __.disabled = function () { return (true); };
            });
        };
        $mol_checker_demo.prototype.childs = function () {
            return [].concat(this.c1(), this.c2(), this.c3(), this.c4(), this.c5(), this.c6());
        };
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c1", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c2", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c3", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c4", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c5", null);
        __decorate([
            $mol_prop()
        ], $mol_checker_demo.prototype, "c6", null);
        return $mol_checker_demo;
    }($.$mol_rower));
    $.$mol_checker_demo = $mol_checker_demo;
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
    var $mol_clicker_demo = (function (_super) {
        __extends($mol_clicker_demo, _super);
        function $mol_clicker_demo() {
            _super.apply(this, arguments);
        }
        $mol_clicker_demo.prototype.events = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_clicker_demo.prototype.major = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat("Click me!"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.majorDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat("Click me!"); };
                __.disabled = function () { return (true); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.minor = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () { return [].concat("Or click me.."); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.minorDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () { return [].concat("Or click me.."); };
                __.disabled = function () { return (true); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.warn = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_warn().setup(function (__) {
                __.childs = function () { return [].concat("Be attentive!"); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.warnDisabled = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_warn().setup(function (__) {
                __.childs = function () { return [].concat("Be attentive!"); };
                __.disabled = function () { return (true); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.events.apply(_this, diff);
                };
            });
        };
        $mol_clicker_demo.prototype.childs = function () {
            return [].concat(this.major(), this.majorDisabled(), this.minor(), this.minorDisabled(), this.warn(), this.warnDisabled());
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "events", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "major", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "majorDisabled", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "minor", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "minorDisabled", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "warn", null);
        __decorate([
            $mol_prop()
        ], $mol_clicker_demo.prototype, "warnDisabled", null);
        return $mol_clicker_demo;
    }($.$mol_rower));
    $.$mol_clicker_demo = $mol_clicker_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
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
        var $mol_clicker_demo = (function (_super) {
            __extends($mol_clicker_demo, _super);
            function $mol_clicker_demo() {
                _super.apply(this, arguments);
            }
            $mol_clicker_demo.prototype.events = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert(diff[0].srcElement.id);
            };
            return $mol_clicker_demo;
        }($.$mol_clicker_demo));
        $mol.$mol_clicker_demo = $mol_clicker_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
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
    var $mol_coder_demo = (function (_super) {
        __extends($mol_coder_demo, _super);
        function $mol_coder_demo() {
            _super.apply(this, arguments);
        }
        $mol_coder_demo.prototype.coder1 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "QR_CODE"; };
            });
        };
        $mol_coder_demo.prototype.coder2 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "DATA_MATRIX"; };
            });
        };
        $mol_coder_demo.prototype.coder3 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "UPC_E"; };
            });
        };
        $mol_coder_demo.prototype.coder4 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "UPC_A"; };
            });
        };
        $mol_coder_demo.prototype.coder5 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "EAN_8"; };
            });
        };
        $mol_coder_demo.prototype.coder6 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "EAN_13"; };
            });
        };
        $mol_coder_demo.prototype.coder7 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "CODE_128"; };
            });
        };
        $mol_coder_demo.prototype.coder8 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "CODE_39"; };
            });
        };
        $mol_coder_demo.prototype.coder9 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_coder().setup(function (__) {
                __.format = function () { return "ITF"; };
            });
        };
        $mol_coder_demo.prototype.childs = function () {
            return [].concat(this.coder1(), this.coder2(), this.coder3(), this.coder4(), this.coder5(), this.coder6(), this.coder7(), this.coder8(), this.coder9());
        };
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder1", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder2", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder3", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder4", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder5", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder6", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder7", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder8", null);
        __decorate([
            $mol_prop()
        ], $mol_coder_demo.prototype, "coder9", null);
        return $mol_coder_demo;
    }($.$mol_rower));
    $.$mol_coder_demo = $mol_coder_demo;
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
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_stringer_demo.prototype.one = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
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
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name.apply(_this, diff);
                };
                __.hint = function () { return "Batman"; };
            });
        };
        $mol_stringer_demo.prototype.three = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.name.apply(_this, diff);
                };
                __.hint = function () { return "Jocker"; };
                __.disabled = function () { return (true); };
            });
        };
        $mol_stringer_demo.prototype.childs = function () {
            return [].concat(this.one(), this.two(), this.three());
        };
        __decorate([
            $mol_prop()
        ], $mol_stringer_demo.prototype, "name", null);
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
//demo.view.js.map
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
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_switcher_demo.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.color.apply(this, diff);
        };
        $mol_switcher_demo.prototype.option = function (key) {
            switch (key) {
                case "red": return "Red";
                case "green": return "Green";
                case "blue": return "Blue";
                default: return _super.prototype["option"] && _super.prototype["option"].call(this, key);
            }
        };
        $mol_switcher_demo.prototype.option_keys = function () {
            return ["red", "green", "blue"].concat(_super.prototype["option_keys"] && _super.prototype["option_keys"].call(this) || []);
        };
        __decorate([
            $mol_prop()
        ], $mol_switcher_demo.prototype, "color", null);
        return $mol_switcher_demo;
    }($.$mol_switcher));
    $.$mol_switcher_demo = $mol_switcher_demo;
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
    var $mol_decker_demo = (function (_super) {
        __extends($mol_decker_demo, _super);
        function $mol_decker_demo() {
            _super.apply(this, arguments);
        }
        $mol_decker_demo.prototype.stringerContent = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer_demo().setup(function (__) {
            });
        };
        $mol_decker_demo.prototype.stringerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "String fields"; };
                __.content = function () { return _this.stringerContent(); };
            });
        };
        $mol_decker_demo.prototype.clickerContent = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_demo().setup(function (__) {
            });
        };
        $mol_decker_demo.prototype.clickerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "Buttons"; };
                __.content = function () { return _this.clickerContent(); };
            });
        };
        $mol_decker_demo.prototype.checkerContent = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_checker_demo().setup(function (__) {
            });
        };
        $mol_decker_demo.prototype.checkerItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "Check boxes"; };
                __.content = function () { return _this.checkerContent(); };
            });
        };
        $mol_decker_demo.prototype.switcherContent = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_switcher_demo().setup(function (__) {
            });
        };
        $mol_decker_demo.prototype.switcherItem = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_decker_item().setup(function (__) {
                __.title = function () { return "Radio buttons"; };
                __.content = function () { return _this.switcherContent(); };
            });
        };
        $mol_decker_demo.prototype.items = function () {
            return [].concat(this.stringerItem(), this.clickerItem(), this.checkerItem(), this.switcherItem());
        };
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "stringerContent", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "stringerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "clickerContent", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "clickerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "checkerContent", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "checkerItem", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "switcherContent", null);
        __decorate([
            $mol_prop()
        ], $mol_decker_demo.prototype, "switcherItem", null);
        return $mol_decker_demo;
    }($.$mol_decker));
    $.$mol_decker_demo = $mol_decker_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_filler = (function (_super) {
        __extends($mol_filler, _super);
        function $mol_filler() {
            _super.apply(this, arguments);
        }
        $mol_filler.prototype.childs = function () {
            return [].concat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.");
        };
        return $mol_filler;
    }($mol_viewer));
    $.$mol_filler = $mol_filler;
})($ || ($ = {}));
//filler.view.tree.js.map
;
var $mol_graph = (function () {
    function $mol_graph() {
        this.nodes = {};
        this.edgesOut = {};
        this.edgesIn = {};
    }
    $mol_graph.prototype.nodeEnsure = function (id) {
        if (this.nodes.hasOwnProperty(id))
            return;
        this.nodes[id] = null;
    };
    $mol_graph.prototype.linkOut = function (from, to, edge) {
        if (!this.edgesOut[from]) {
            this.edgesOut[from] = {};
            this.nodeEnsure(from);
        }
        this.edgesOut[from][to] = edge;
        this.nodeEnsure(to);
    };
    $mol_graph.prototype.linkIn = function (to, from, edge) {
        if (!this.edgesIn[to]) {
            this.edgesIn[to] = {};
            this.nodeEnsure(to);
        }
        this.edgesIn[to][from] = edge;
        this.nodeEnsure(from);
    };
    $mol_graph.prototype.edgeOut = function (from, to) {
        return this.edgesOut[from] && this.edgesOut[from][to];
    };
    $mol_graph.prototype.edgeIn = function (to, from) {
        return this.edgesIn[to] && this.edgesIn[to][from];
    };
    $mol_graph.prototype.link = function (one, two, edge) {
        this.linkOut(one, two, edge);
        this.linkIn(two, one, edge);
    };
    $mol_graph.prototype.sorted = function (getWeight) {
        var _this = this;
        var pending = Object.keys(this.nodes);
        var visited = [];
        var weights = [];
        var sorted = [];
        var visit = function (id, weight) {
            var index = visited.lastIndexOf(id);
            if (index >= 0) {
                if (index === visited.length - 1)
                    return;
                if (weight <= weights[index + 1])
                    return;
            }
            if (weight != null) {
                visited.push(id);
                weights.push(weight);
            }
            var deps = _this.edgesOut[id];
            for (var dep in deps) {
                visit(dep, getWeight(deps[dep]));
            }
            if (sorted.indexOf(id) === -1)
                sorted.push(id);
        };
        pending.forEach(function (id) { return visit(id, null); });
        return sorted;
    };
    return $mol_graph;
}());
//graph.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_demo = (function (_super) {
        __extends($mol_icon_demo, _super);
        function $mol_icon_demo() {
            _super.apply(this, arguments);
        }
        $mol_icon_demo.prototype.icons = function () {
            return [].concat();
        };
        $mol_icon_demo.prototype.childs = function () {
            return this.icons();
        };
        return $mol_icon_demo;
    }($.$mol_rower));
    $.$mol_icon_demo = $mol_icon_demo;
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
    var $mol;
    (function ($mol) {
        var $mol_icon_demo = (function (_super) {
            __extends($mol_icon_demo, _super);
            function $mol_icon_demo() {
                _super.apply(this, arguments);
            }
            $mol_icon_demo.prototype.names = function () {
                var next = [];
                for (var name in $) {
                    if (!/^\$mol_icon_/i.test(name))
                        continue;
                    if (/^\$mol_icon_demo/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next;
            };
            $mol_icon_demo.prototype.icons = function () {
                var _this = this;
                return this.names().map(function (name) { return _this.icon(name); });
            };
            $mol_icon_demo.prototype.icon = function (name) {
                var Class = $['$' + name];
                return new Class();
            };
            __decorate([
                $mol_prop()
            ], $mol_icon_demo.prototype, "names", null);
            __decorate([
                $mol_prop()
            ], $mol_icon_demo.prototype, "icons", null);
            __decorate([
                $mol_prop()
            ], $mol_icon_demo.prototype, "icon", null);
            return $mol_icon_demo;
        }($.$mol_icon_demo));
        $mol.$mol_icon_demo = $mol_icon_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
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
    var $mol_labeler_demo = (function (_super) {
        __extends($mol_labeler_demo, _super);
        function $mol_labeler_demo() {
            _super.apply(this, arguments);
        }
        $mol_labeler_demo.prototype.labeler1 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Provider"; };
                __.content = function () { return "ACME Provider Inc."; };
            });
        };
        $mol_labeler_demo.prototype.labeler2 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Cost"; };
                __.content = function () { return new $.$mol_coster().setup(function (__) {
                    __.value = function () { return new $mol_unit_money_usd().setup(function (__) {
                        __.valueOf = function () { return 1234567; };
                    }); };
                }); };
            });
        };
        $mol_labeler_demo.prototype.labeler3 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Consumer"; };
                __.content = function () { return "ACME Consumer Inc."; };
            });
        };
        $mol_labeler_demo.prototype.labeler4 = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_labeler().setup(function (__) {
                __.title = function () { return "Remark"; };
                __.content = function () { return new $.$mol_stringer().setup(function (__) {
                    __.value = function () { return "Remind me later"; };
                }); };
            });
        };
        $mol_labeler_demo.prototype.childs = function () {
            return [].concat(this.labeler1(), this.labeler2(), this.labeler3(), this.labeler4());
        };
        __decorate([
            $mol_prop()
        ], $mol_labeler_demo.prototype, "labeler1", null);
        __decorate([
            $mol_prop()
        ], $mol_labeler_demo.prototype, "labeler2", null);
        __decorate([
            $mol_prop()
        ], $mol_labeler_demo.prototype, "labeler3", null);
        __decorate([
            $mol_prop()
        ], $mol_labeler_demo.prototype, "labeler4", null);
        return $mol_labeler_demo;
    }($.$mol_rower));
    $.$mol_labeler_demo = $mol_labeler_demo;
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
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.patch = function () { return ({ "color": "red" }); };
                __.childs = function () { return [].concat("Red"); };
            });
        };
        $mol_linker_demo.prototype.linkGreen = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.patch = function () { return ({ "color": "green" }); };
                __.childs = function () { return [].concat("Green"); };
            });
        };
        $mol_linker_demo.prototype.linkBlue = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.patch = function () { return ({ "color": "blue" }); };
                __.childs = function () { return [].concat("Blue"); };
            });
        };
        $mol_linker_demo.prototype.linkExternal = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_linker().setup(function (__) {
                __.uri = function () { return "http://example.org"; };
                __.childs = function () { return [].concat("example.org"); };
            });
        };
        $mol_linker_demo.prototype.childs = function () {
            return [].concat(this.linkRed(), this.linkGreen(), this.linkBlue(), this.linkExternal());
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
//demo.view.tree.js.map
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
        return $mol_lister_demo;
    }($.$mol_lister));
    $.$mol_lister_demo = $mol_lister_demo;
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
    var $mol;
    (function ($mol) {
        var $mol_lister_demo = (function (_super) {
            __extends($mol_lister_demo, _super);
            function $mol_lister_demo() {
                _super.apply(this, arguments);
            }
            $mol_lister_demo.prototype.rows = function () {
                var next = [];
                for (var id = 0; id < 1000; ++id) {
                    next.push(this.rower(id));
                }
                return next;
            };
            $mol_lister_demo.prototype.rower = function (id) {
                return new $mol.$mol_rower_demo().setup(function (obj) {
                    obj.title = function () { return ("Title #" + id); };
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
//demo.view.js.map
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
    var $mol_pager_demo = (function (_super) {
        __extends($mol_pager_demo, _super);
        function $mol_pager_demo() {
            _super.apply(this, arguments);
        }
        $mol_pager_demo.prototype.title = function () {
            return "Sign Up";
        };
        $mol_pager_demo.prototype.body = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_signup().setup(function (__) {
            });
        };
        $mol_pager_demo.prototype.foot = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower_demo().setup(function (__) {
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_pager_demo.prototype, "body", null);
        __decorate([
            $mol_prop()
        ], $mol_pager_demo.prototype, "foot", null);
        return $mol_pager_demo;
    }($.$mol_pager));
    $.$mol_pager_demo = $mol_pager_demo;
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
    var $mol_perf_render = (function (_super) {
        __extends($mol_perf_render, _super);
        function $mol_perf_render() {
            _super.apply(this, arguments);
        }
        $mol_perf_render.prototype.title = function () {
            return "$mol";
        };
        $mol_perf_render.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.tagName = function () { return "h2"; };
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_perf_render.prototype.runnerLabel = function () {
            return "Run";
        };
        $mol_perf_render.prototype.eventRun = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_perf_render.prototype.runner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat(_this.runnerLabel()); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventRun.apply(_this, diff);
                };
            });
        };
        $mol_perf_render.prototype.head = function () {
            return [].concat(this.titler(), this.runner());
        };
        $mol_perf_render.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_perf_render.prototype.rows = function () {
            return [].concat();
        };
        $mol_perf_render.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.rows(); };
            });
        };
        $mol_perf_render.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return [].concat(_this.lister()); };
            });
        };
        $mol_perf_render.prototype.childs = function () {
            return [].concat(this.header(), this.contenter());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "eventRun", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "runner", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "header", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "contenter", null);
        return $mol_perf_render;
    }($mol_viewer));
    $.$mol_perf_render = $mol_perf_render;
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
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_perf_render_row.prototype.heightMinimal = function () {
            return 24;
        };
        $mol_perf_render_row.prototype.attr = function (key) {
            switch (key) {
                case "mol_perf_render_row_selected": return this.selected();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_render_row.prototype.attr_keys = function () {
            return ["mol_perf_render_row_selected"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_render_row.prototype.eventToggle = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_perf_render_row.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.eventToggle.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_perf_render_row.prototype.event_keys = function () {
            return ["click"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        $mol_perf_render_row.prototype.label = function () {
            return "";
        };
        $mol_perf_render_row.prototype.bar = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_perf_render_row.prototype.childs = function () {
            return [].concat(this.bar());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "selected", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "eventToggle", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "bar", null);
        return $mol_perf_render_row;
    }($mol_viewer));
    $.$mol_perf_render_row = $mol_perf_render_row;
})($ || ($ = {}));
//render.view.tree.js.map
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
            $mol_perf_render.prototype.eventRun = function () {
                var _this = this;
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                requestAnimationFrame(function () {
                    var data = window['_buildData']();
                    var date = Date.now();
                    _this.data(data);
                    _this.selectedItem(null);
                    $mol_defer.run();
                    setTimeout(function () { return _this.runnerLabel((Date.now() - date) + " ms"); });
                });
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
            $mol_perf_render_row.prototype.eventToggle = function () {
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
//render.view.js.map
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
            _super.apply(this, arguments);
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
        $mol_perf_uibench.prototype.table = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_perf_uibench_table().setup(function (__) {
                __.state = function () { return _this.stateTable(); };
            });
        };
        $mol_perf_uibench.prototype.stateAnim = function () {
            return null;
        };
        $mol_perf_uibench.prototype.anim = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_perf_uibench_anim().setup(function (__) {
                __.state = function () { return _this.stateAnim(); };
            });
        };
        $mol_perf_uibench.prototype.stateTree = function () {
            return null;
        };
        $mol_perf_uibench.prototype.tree = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_perf_uibench_tree().setup(function (__) {
                __.state = function () { return _this.stateTree(); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench.prototype, "table", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench.prototype, "anim", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench.prototype, "tree", null);
        return $mol_perf_uibench;
    }($.$mol_scroller));
    $.$mol_perf_uibench = $mol_perf_uibench;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table = (function (_super) {
        __extends($mol_perf_uibench_table, _super);
        function $mol_perf_uibench_table() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_table.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table.prototype.tagName = function () {
            return "table";
        };
        $mol_perf_uibench_table.prototype.attr = function (key) {
            switch (key) {
                case "class": return "Table";
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_table.prototype.attr_keys = function () {
            return ["class"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_table.prototype.rows = function () {
            return [].concat();
        };
        $mol_perf_uibench_table.prototype.childs = function () {
            return this.rows();
        };
        return $mol_perf_uibench_table;
    }($.$mol_lister));
    $.$mol_perf_uibench_table = $mol_perf_uibench_table;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table_row = (function (_super) {
        __extends($mol_perf_uibench_table_row, _super);
        function $mol_perf_uibench_table_row() {
            _super.apply(this, arguments);
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
        $mol_perf_uibench_table_row.prototype.attr = function (key) {
            switch (key) {
                case "class": return this.className();
                case "data-id": return this.id();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_table_row.prototype.attr_keys = function () {
            return ["class", "data-id"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_table_row.prototype.headerText = function () {
            return "";
        };
        $mol_perf_uibench_table_row.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_perf_uibench_table_cell().setup(function (__) {
                __.text = function () { return _this.headerText(); };
            });
        };
        $mol_perf_uibench_table_row.prototype.cells = function () {
            return [].concat();
        };
        $mol_perf_uibench_table_row.prototype.childs = function () {
            return [].concat(this.header(), this.cells());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench_table_row.prototype, "header", null);
        return $mol_perf_uibench_table_row;
    }($mol_viewer));
    $.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table_cell = (function (_super) {
        __extends($mol_perf_uibench_table_cell, _super);
        function $mol_perf_uibench_table_cell() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_table_cell.prototype.tagName = function () {
            return "td";
        };
        $mol_perf_uibench_table_cell.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_table_cell.prototype.attr = function (key) {
            switch (key) {
                case "class": return "TableCell";
                case "data-text": return this.text();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_table_cell.prototype.attr_keys = function () {
            return ["class", "data-text"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_table_cell.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_perf_uibench_table_cell.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.eventClick.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].apply(this, [key].concat(diff));
            }
        };
        $mol_perf_uibench_table_cell.prototype.event_keys = function () {
            return ["click"].concat(_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []);
        };
        $mol_perf_uibench_table_cell.prototype.childs = function () {
            return [].concat(this.text());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench_table_cell.prototype, "eventClick", null);
        return $mol_perf_uibench_table_cell;
    }($mol_viewer));
    $.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_anim = (function (_super) {
        __extends($mol_perf_uibench_anim, _super);
        function $mol_perf_uibench_anim() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_anim.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_anim.prototype.attr = function (key) {
            switch (key) {
                case "class": return "Anim";
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_anim.prototype.attr_keys = function () {
            return ["class"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_anim.prototype.items = function () {
            return [].concat();
        };
        $mol_perf_uibench_anim.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim;
    }($mol_viewer));
    $.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_anim_box = (function (_super) {
        __extends($mol_perf_uibench_anim_box, _super);
        function $mol_perf_uibench_anim_box() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_anim_box.prototype.id = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.attr = function (key) {
            switch (key) {
                case "class": return "AnimBox";
                case "data-id": return this.id();
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_anim_box.prototype.attr_keys = function () {
            return ["class", "data-id"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_anim_box.prototype.styleRadius = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.styleColor = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.field = function (key) {
            switch (key) {
                case "style.borderRadius": return this.styleRadius();
                case "style.background": return this.styleColor();
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_perf_uibench_anim_box.prototype.field_keys = function () {
            return ["style.borderRadius", "style.background"].concat(_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []);
        };
        $mol_perf_uibench_anim_box.prototype.items = function () {
            return [].concat();
        };
        $mol_perf_uibench_anim_box.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim_box;
    }($mol_viewer));
    $.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree = (function (_super) {
        __extends($mol_perf_uibench_tree, _super);
        function $mol_perf_uibench_tree() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_tree.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.attr = function (key) {
            switch (key) {
                case "class": return "Tree";
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_tree.prototype.attr_keys = function () {
            return ["class"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_tree.prototype.stateRoot = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.root = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_perf_uibench_tree_branch().setup(function (__) {
                __.state = function () { return _this.stateRoot(); };
            });
        };
        $mol_perf_uibench_tree.prototype.childs = function () {
            return [].concat(this.root());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_uibench_tree.prototype, "root", null);
        return $mol_perf_uibench_tree;
    }($mol_viewer));
    $.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree_branch = (function (_super) {
        __extends($mol_perf_uibench_tree_branch, _super);
        function $mol_perf_uibench_tree_branch() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_tree_branch.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree_branch.prototype.tagName = function () {
            return "ul";
        };
        $mol_perf_uibench_tree_branch.prototype.attr = function (key) {
            switch (key) {
                case "class": return "TreeNode";
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_tree_branch.prototype.attr_keys = function () {
            return ["class"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        return $mol_perf_uibench_tree_branch;
    }($.$mol_lister));
    $.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree_leaf = (function (_super) {
        __extends($mol_perf_uibench_tree_leaf, _super);
        function $mol_perf_uibench_tree_leaf() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_tree_leaf.prototype.heightMinimal = function () {
            return 25;
        };
        $mol_perf_uibench_tree_leaf.prototype.tagName = function () {
            return "li";
        };
        $mol_perf_uibench_tree_leaf.prototype.attr = function (key) {
            switch (key) {
                case "class": return "TreeLeaf";
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_perf_uibench_tree_leaf.prototype.attr_keys = function () {
            return ["class"].concat(_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []);
        };
        $mol_perf_uibench_tree_leaf.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_tree_leaf.prototype.childs = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_tree_leaf;
    }($mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_perf_uibench.prototype.state = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || {};
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
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench.prototype, "state", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench.prototype, "stateTable", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench.prototype, "stateAnim", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench.prototype, "stateTree", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench.prototype, "page", null);
            return $mol_perf_uibench;
        }($.$mol_perf_uibench));
        $mol.$mol_perf_uibench = $mol_perf_uibench;
        var $mol_perf_uibench_table = (function (_super) {
            __extends($mol_perf_uibench_table, _super);
            function $mol_perf_uibench_table() {
                _super.apply(this, arguments);
            }
            $mol_perf_uibench_table.prototype.state = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || { items: [] };
            };
            $mol_perf_uibench_table.prototype.dict = function () {
                var dict = {};
                this.state().items.forEach(function (val) { return dict[val.id] = val; });
                return dict;
            };
            $mol_perf_uibench_table.prototype.rows = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.row(v.id); });
            };
            $mol_perf_uibench_table.prototype.row = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_row().setup(function (obj) {
                    obj.state = function () { return _this.dict()[id] || []; };
                });
            };
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table.prototype, "state", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table.prototype, "dict", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table.prototype, "rows", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table.prototype, "row", null);
            return $mol_perf_uibench_table;
        }($.$mol_perf_uibench_table));
        $mol.$mol_perf_uibench_table = $mol_perf_uibench_table;
        var $mol_perf_uibench_table_row = (function (_super) {
            __extends($mol_perf_uibench_table_row, _super);
            function $mol_perf_uibench_table_row() {
                _super.apply(this, arguments);
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
            $mol_perf_uibench_table_row.prototype.active = function () {
                return false;
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
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table_row.prototype, "cells", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_table_row.prototype, "cell", null);
            return $mol_perf_uibench_table_row;
        }($.$mol_perf_uibench_table_row));
        $mol.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
        var $mol_perf_uibench_table_cell = (function (_super) {
            __extends($mol_perf_uibench_table_cell, _super);
            function $mol_perf_uibench_table_cell() {
                _super.apply(this, arguments);
            }
            $mol_perf_uibench_table_cell.prototype.eventClick = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                console.log('Click', this.text());
                diff[0].preventDefault();
                diff[0].stopPropagation();
            };
            return $mol_perf_uibench_table_cell;
        }($.$mol_perf_uibench_table_cell));
        $mol.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
        var $mol_perf_uibench_anim = (function (_super) {
            __extends($mol_perf_uibench_anim, _super);
            function $mol_perf_uibench_anim() {
                _super.apply(this, arguments);
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
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_anim.prototype, "item", null);
            return $mol_perf_uibench_anim;
        }($.$mol_perf_uibench_anim));
        $mol.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
        var $mol_perf_uibench_anim_box = (function (_super) {
            __extends($mol_perf_uibench_anim_box, _super);
            function $mol_perf_uibench_anim_box() {
                _super.apply(this, arguments);
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
                _super.apply(this, arguments);
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
                _super.apply(this, arguments);
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
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_tree_branch.prototype, "branch", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_uibench_tree_branch.prototype, "leaf", null);
            return $mol_perf_uibench_tree_branch;
        }($.$mol_perf_uibench_tree_branch));
        $mol.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//uibench.view.js.map
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
//range.js.map
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
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_pager_demo().setup(function (__) {
            });
        };
        $mol_stacker_demo.prototype.signup = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_signup().setup(function (__) {
            });
        };
        $mol_stacker_demo.prototype.addon = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return [].concat(_this.signup()); };
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_stacker_demo.prototype, "main", null);
        __decorate([
            $mol_prop()
        ], $mol_stacker_demo.prototype, "signup", null);
        __decorate([
            $mol_prop()
        ], $mol_stacker_demo.prototype, "addon", null);
        return $mol_stacker_demo;
    }($.$mol_stacker));
    $.$mol_stacker_demo = $mol_stacker_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
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
$mol_test(function (test) {
    test.ok(1);
    test.not(0);
    test.equal(2, 2);
    test.unique([3], [3]);
    test.done();
});
//test.js.map
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
//tree.js.map
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
        function addProp(param, needCache) {
            if (needCache === void 0) { needCache = false; }
            var needKey = false;
            var needSet = false;
            var needReturn = true;
            var keys = [];
            if (param.type === '>') {
                needCache = true;
                param = param.childs[0];
            }
            if (param.type === '<') {
                needCache = false;
                param = param.childs[0];
            }
            if (!param.type || /^-/.test(param.type))
                return;
            function getValue(value) {
                switch (value.type[0]) {
                    case void 0:
                        return JSON.stringify(value.value);
                    case '-':
                        return null;
                    case '/':
                        var items = [];
                        value.childs.forEach(function (item) {
                            if (item.type === '-')
                                return;
                            var val = getValue(item);
                            if (val)
                                items.push(val);
                        });
                        return '[].concat( ' + items.join(' , ') + ' )';
                    case '$':
                        needCache = true;
                        var overs = [];
                        value.childs.forEach(function (over) {
                            if (/^(-|$)/.test(over.type))
                                return '';
                            var ns = needSet;
                            var v = getValue(over.childs[0]);
                            overs.push('\t\t\t__.' + over.type + ' = (' + (needSet ? ' ...diff ' : '') + ') => ' + v + '\n');
                            needSet = ns;
                        });
                        return 'new ' + value.type + '().setup( __ => { \n' + overs.join('') + '\t\t} )';
                    case '*':
                        needKey = true;
                        needReturn = false;
                        var opts = [];
                        value.childs.forEach(function (opt) {
                            if (/^(-|$)/.test(opt.type))
                                return '';
                            keys.push(opt.type);
                            opts.push('\t\t\tcase "' + opt.type + '" : return ' + getValue(opt.childs[0]) + '\n');
                        });
                        return 'switch( key ){\n' + opts.join('') + '\t\t\tdefault: return super["' + param.type + '"] && super["' + param.type + '"]( key' + (needSet ? ' , ...diff' : '') + ' )\n\t\t}';
                    case ':':
                        return '( ' + JSON.stringify(value.childs[0]) + ' )';
                    case '>':
                        needSet = true;
                        if (value.childs.length === 1) {
                            addProp(value.childs[0], true);
                            var type = /(.*?)(#?)$/.exec(value.childs[0].type);
                            return 'this.' + type[1] + '( ' + (type[2] ? 'key ,' : '') + ' ...diff )';
                        }
                    case '<':
                        if (value.childs.length === 1) {
                            addProp(value.childs[0]);
                            var type = /(.*?)(#?)$/.exec(value.childs[0].type);
                            return 'this.' + type[1] + '(' + (type[2] ? ' key ' : '') + ')';
                        }
                }
                switch (value.type) {
                    case 'true':
                    case 'false':
                    case 'null':
                        return value.type;
                }
                if (Number(value.type) == value.type)
                    return value.type;
                throw new Error('Wrong value: ' + value + value.uri);
            }
            if (param.childs.length > 1)
                throw new Error('Too more childs: ' + param + param.uri);
            param.childs.forEach(function (child) {
                var val = getValue(child);
                var propName = /(.*?)(#?)$/.exec(param.type);
                var args = [];
                if (needKey || propName[2])
                    args.push(' key ');
                if (needCache || needSet)
                    args.push(' ...diff ');
                if (needCache)
                    val = (needReturn ? '( diff[0] !== void 0 ) ? diff[0] : ' : 'if( diff[0] !== void 0 ) return diff[0]\n\t\t') + val;
                if (needReturn)
                    val = 'return ' + val;
                var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                if (needCache)
                    decl = '\t@ $' + 'mol_prop()\n' + decl;
                decl = source(param).toString().trim().replace(/^/gm, '\t/// ') + '\n' + decl;
                members[propName[1]] = decl;
                if (needKey) {
                    members[propName[1] + '_keys'] = '\t' + propName[1] + '_keys(){\n\t\treturn ' + JSON.stringify(keys) + '.concat( super["' + propName[1] + '_keys"] && super["' + propName[1] + '_keys"]() || [] )\n\t}\n\n';
                }
            });
            function source(root) {
                if (['>', '<'].indexOf(root.type) !== -1) {
                    return root.clone({
                        childs: root.childs.map(function (name) { return name.clone({
                            childs: []
                        }); })
                    });
                }
                return root.clone({ childs: root.childs.map(source) });
            }
            return needSet;
        }
        var body = Object.keys(members).map(function (name) {
            return members[name] || '\t' + name + '() { return null }\n\t}\n';
        }).join('');
        var classes = 'module $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
        content += classes + '\n';
    });
    return content;
}
//tree2ts.js.map
//# sourceMappingURL=web.js.map