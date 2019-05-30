"use strict";
var _stringify = require("babel-runtime/core-js/json/stringify"),
    _stringify2 = _interopRequireDefault(_stringify),
    _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
    _classCallCheck3 = _interopRequireDefault(_classCallCheck2),
    _createClass2 = require("babel-runtime/helpers/createClass"),
    _createClass3 = _interopRequireDefault(_createClass2),
    _getIterator2 = require("babel-runtime/core-js/get-iterator"),
    _getIterator3 = _interopRequireDefault(_getIterator2),
    _regenerator = require("babel-runtime/regenerator"),
    _regenerator2 = _interopRequireDefault(_regenerator),
    _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
    _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2),
    constants = require("./framework/helpers/constants.js"),
    loadModels = function() {
        var e = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e(r) {
            var t, a, n, o, s, i, p;
            return _regenerator2.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, helpers.PIFY(fs.readdir)(r);
                    case 2:
                        t = e.sent, e.t0 = _regenerator2.default.keys(t);
                    case 4:
                        if ((e.t1 = e.t0()).done) {
                            e.next = 17;
                            break
                        }
                        return a = e.t1.value, n = t[a], app.logger.info("loading model", n), o = path.basename(n, ".js"), s = changeCase.pascalCase(o), i = path.join(r, n), p = require(i), app.model[s] = app.db.define(changeCase.snakeCase(o), p, {
                            timestamps: !1
                        }), e.next = 15, app.model[s].sync();
                    case 15:
                        e.next = 4;
                        break;
                    case 17:
                    case "end":
                        return e.stop()
                }
            }, e, this)
        }));
        return function(r) {
            return e.apply(this, arguments)
        }
    }(),
    loadContracts = function() {
        var e = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e(r) {
            var t, a, n, o, s, i, p;
            return _regenerator2.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, helpers.PIFY(fs.readdir)(r);
                    case 2:
                        for (a in t = e.sent) n = t[a], app.logger.info("loading contract", n), o = path.basename(n, ".js"), s = changeCase.snakeCase(o), i = path.join(r, n), p = require(i), "index.js" !== n && (app.contract[s] = p);
                    case 4:
                    case "end":
                        return e.stop()
                }
            }, e, this)
        }));
        return function(r) {
            return e.apply(this, arguments)
        }
    }(),
    loadInterfaces = function() {
        var e = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e(r) {
            var t, a, n, o, s, i, p;
            return _regenerator2.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2, helpers.PIFY(fs.readdir)(r);
                    case 2:
                        for (t = e.sent, a = !0, n = !1, o = void 0, e.prev = 6, s = (0, _getIterator3.default)(t); !(a = (i = s.next()).done); a = !0) p = i.value, app.logger.info("loading interface", p), require(path.join(r, p));
                        e.next = 14;
                        break;
                    case 10:
                        e.prev = 10, e.t0 = e.catch(6), n = !0, o = e.t0;
                    case 14:
                        e.prev = 14, e.prev = 15, !a && s.return && s.return();
                    case 17:
                        if (e.prev = 17, !n) {
                            e.next = 20;
                            break
                        }
                        throw o;
                    case 20:
                        return e.finish(17);
                    case 21:
                        return e.finish(14);
                    case 22:
                    case "end":
                        return e.stop()
                }
            }, e, this, [
                [6, 10, 14, 22],
                [15, , 17, 21]
            ])
        }));
        return function(r) {
            return e.apply(this, arguments)
        }
    }(),
    main = function() {
        var e = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e() {
            return _regenerator2.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return global.app = {
                            db: null,
                            sdb: null,
                            balances: null,
                            model: {},
                            contract: {},
                            rootDir: dappRootDir,
                            config: require(path.join(dappRootDir, "config.json")),
                            contractTypeMapping: {},
                            feeMapping: {},
                            defaultFee: {
                                currency: constants.defaultCurrency,
                                min: "10000000"
                            },
                            feePool: null,
                            hooks: {},
                            custom: {},
                            logger: logger
                        }, app.validators = {
                            amount: function(e) {
                                return amountHelper.validate(e)
                            },
                            string: function(e, r) {
                                return r.length ? (0, _stringify2.default)(validate({
                                    data: e
                                }, {
                                    data: {
                                        length: r.length
                                    }
                                })) : r.isEmail ? (0, _stringify2.default)(validate({
                                    email: e
                                }, {
                                    email: {
                                        email: !0
                                    }
                                })) : r.url ? (0, _stringify2.default)(validate({
                                    url: e
                                }, {
                                    url: {
                                        url: r.url
                                    }
                                })) : r.number ? (0, _stringify2.default)(validate({
                                    number: e
                                }, {
                                    number: {
                                        numericality: r.number
                                    }
                                })) : void 0
                            },
                            array: function(e, r) {
                                if (r.length) {
                                    if (!(0, _stringify2.default)(validate.isArray(e))) return "Is not an array";
                                    if ((0, _stringify2.default)(validate({
                                            data: e
                                        }, {
                                            data: {
                                                length: r.length
                                            }
                                        }))) return "Arrary lentgh is incorrect,correct length is " + (0, _stringify2.default)(r.length)
                                }
                            }
                        }, app.validate = function(e, r, t) {
                            if (!app.validators[e]) throw new Error("Validator not found: " + e);
                            var a = app.validators[e](r, t);
                            if (a) throw new Error(a)
                        }, app.registerContract = function(e, r) {
                            if (e < 1e3) throw new Error("Contract types that small than 1000 are reserved");
                            app.contractTypeMapping[e] = r
                        }, app.getContractName = function(e) {
                            return app.contractTypeMapping[e]
                        }, app.registerFee = function(e, r, t) {
                            app.feeMapping[e] = {
                                currency: t || app.defaultFee.currency,
                                min: r
                            }
                        }, app.getFee = function(e) {
                            return app.feeMapping[e]
                        }, app.setDefaultFee = function(e, r) {
                            app.defaultFee.currency = r, app.defaultFee.min = e
                        }, app.getRealTime = function(e) {
                            return slots.getRealTime(e)
                        }, app.db = new ORM("", "", "", {
                            dialect: "sqlite",
                            storage: path.join(dappRootDir, "blockchain.db"),
                            logging: !1
                        }), app.registerHook = function(e, r) {
                            app.hooks[e] = r
                        }, app.verifyBytes = function(e, r, t) {
                            return app.api.crypto.verify(r, t, e)
                        }, app.sdb = new SmartDB(app), app.balances = new BalanceManager(app.sdb), app.autoID = new AutoIncrement(app.sdb), app.feePool = new FeePool(app.sdb), app.route = new Route, app.events = new EventEmitter, e.next = 20, loadModels(path.join(rootDir, "model"));
                    case 20:
                        return e.next = 22, loadModels(path.join(dappRootDir, "model"));
                    case 22:
                        return e.next = 24, loadContracts(path.join(rootDir, "contract"));
                    case 24:
                        return e.next = 26, loadContracts(path.join(dappRootDir, "contract"));
                    case 26:
                        return e.next = 28, loadInterfaces(path.join(rootDir, "interface"));
                    case 28:
                        return e.next = 30, loadInterfaces(path.join(dappRootDir, "interface"));
                    case 30:
                        return e.next = 32, app.sdb.load("Balance", app.model.Balance.fields(), [
                            ["address", "currency"]
                        ]);
                    case 32:
                        return e.next = 34, app.sdb.load("Variable", ["key", "value"], ["key"]);
                    case 34:
                        return e.next = 36, app.sdb.load("RoundFee", app.model.RoundFee.fields(), [
                            ["round", "currency"]
                        ]);
                    case 36:
                        app.contractTypeMapping[1] = "core.deposit", app.contractTypeMapping[2] = "core.withdrawal", app.contractTypeMapping[3] = "core.transfer", app.contractTypeMapping[4] = "core.setNickname", run2(global.app);
                    case 41:
                    case "end":
                        return e.stop()
                }
            }, e, this)
        }));
        return function() {
            return e.apply(this, arguments)
        }
    }();

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
var fs = require("fs"),
    path = require("path"),
    EventEmitter = require("events").EventEmitter,
    NodeVM = require("./vm2").NodeVM,
    changeCase = require("change-case"),
    tracer = require("tracer"),
    validate = require("validate.js"),
    helpers = require("./framework/helpers"),
    slots = require("./framework/helpers/slots"),
    amountHelper = require("./framework/helpers/amount"),
    ORM = require("./framework/helpers/orm"),
    SmartDB = require("./framework/helpers/smartdb"),
    BalanceManager = require("./framework/helpers/balance-manager"),
    AutoIncrement = require("./framework/helpers/auto-increment"),
    FeePool = require("./framework/helpers/fee-pool"),
    rootDir = path.join(__dirname, "framework"),
    entryFile = path.join(rootDir, "index.js"),
    dappRootDir = process.argv[2],
    secrets = process.argv.slice(3),
    logger = tracer.dailyfile({
        root: path.join(dappRootDir, "logs"),
        maxLogFiles: 10,
        allLogsFileName: "debug"
    });

function runDapp(e) {
    var r = new NodeVM({
        console: "inherit",
        sandbox: {},
        require: {
            external: !0,
            context: "sandbox",
            builtin: ["assert", "crypto", "events", "os", "path", "punycode", "querystring", "string_decoder", "url", "util", "zlib", "async", "bignumber", "bytebuffer", "change-case", "sodium", "extend", "ip", "z-schema", "protocol-buffers", "asch-js"],
            root: [rootDir, dappRootDir]
        }
    }).run(fs.readFileSync(entryFile), entryFile);
    process.on("SIGTERM", function() {}), process.on("SIGINT", function() {}), process.on("message", function(e) {
        r.processParentMessage(e)
    }), r.on("message", function(e) {
        process.send(e)
    }), r.on("exit", function(r) {
        var t = this;
        (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function r() {
            return _regenerator2.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                    case 0:
                        return r.prev = 0, r.next = 3, e.db.close();
                    case 3:
                        r.next = 8;
                        break;
                    case 5:
                        r.prev = 5, r.t0 = r.catch(0), e.logger.error("Failed to close db:", r.t0);
                    case 8:
                    case "end":
                        return r.stop()
                }
            }, r, t, [
                [0, 5]
            ])
        }))(), process.exit(r)
    }), r.run(e), process.send("__sandbox_inner_ready__")
}

function run2(e) {
    var r = require(entryFile);
    process.on("SIGTERM", function() {}), process.on("SIGINT", function() {}), process.on("message", function(e) {
        r.processParentMessage(e)
    }), r.on("message", function(e) {
        process.send(e)
    }), r.on("exit", function(r) {
        var t = this;
        (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function r() {
            return _regenerator2.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                    case 0:
                        return r.prev = 0, r.next = 3, e.db.close();
                    case 3:
                        r.next = 8;
                        break;
                    case 5:
                        r.prev = 5, r.t0 = r.catch(0), e.logger.error("Failed to close db:", r.t0);
                    case 8:
                    case "end":
                        return r.stop()
                }
            }, r, t, [
                [0, 5]
            ])
        }))(), process.exit(r)
    }), r.run(e), process.send("__sandbox_inner_ready__")
}
logger.setLevel = tracer.setLevel, "/" !== dappRootDir[0] && (dappRootDir = path.join(process.cwd(), dappRootDir)), console.log("dappRootDir", dappRootDir);
var Route = function() {
    function e() {
        (0, _classCallCheck3.default)(this, e), this.routes = []
    }
    return (0, _createClass3.default)(e, [{
        key: "get",
        value: function(e, r) {
            this.routes.push({
                path: e,
                method: "get",
                handler: r
            })
        }
    }, {
        key: "put",
        value: function(e, r) {
            this.routes.push({
                path: e,
                method: "put",
                handler: r
            })
        }
    }, {
        key: "post",
        value: function(e, r) {
            this.routes.push({
                path: e,
                method: "post",
                handler: r
            })
        }
    }, {
        key: "getRoutes",
        value: function() {
            return this.routes
        }
    }]), e
}();
(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e() {
    return _regenerator2.default.wrap(function(e) {
        for (;;) switch (e.prev = e.next) {
            case 0:
                try {
                    main()
                } catch (e) {
                    app.logger.error("Failed to initialize app sandbox"), process.exit(1)
                }
            case 1:
            case "end":
                return e.stop()
        }
    }, e, this)
}))();
