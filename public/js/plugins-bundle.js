if (! function (t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function (t, e) {
        function n(t) {
            var e = t.length,
                n = Z.type(t);
            return "function" !== n && !Z.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
        }

        function r(t, e, n) {
            if (Z.isFunction(e)) return Z.grep(t, function (t, r) {
                return !!e.call(t, r, t) !== n
            });
            if (e.nodeType) return Z.grep(t, function (t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (st.test(e)) return Z.filter(e, t, n);
                e = Z.filter(e, t)
            }
            return Z.grep(t, function (t) {
                return V.call(e, t) >= 0 !== n
            })
        }

        function i(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function o(t) {
            var e = ht[t] = {};
            return Z.each(t.match(pt) || [], function (t, n) {
                e[n] = !0
            }), e
        }

        function a() {
            Q.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1), Z.ready()
        }

        function s() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function () {
                    return {}
                }
            }), this.expando = Z.expando + s.uid++
        }

        function l(t, e, n) {
            var r;
            if (void 0 === n && 1 === t.nodeType)
                if (r = "data-" + e.replace(wt, "-$1").toLowerCase(), n = t.getAttribute(r), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : bt.test(n) ? Z.parseJSON(n) : n)
                    } catch (i) {}
                    yt.set(t, e, n)
                } else n = void 0;
            return n
        }

        function u() {
            return !0
        }

        function c() {
            return !1
        }

        function d() {
            try {
                return Q.activeElement
            } catch (t) {}
        }

        function f(t, e) {
            return Z.nodeName(t, "table") && Z.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function p(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function h(t) {
            var e = Rt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function g(t, e) {
            for (var n = 0, r = t.length; r > n; n++) mt.set(t[n], "globalEval", !e || mt.get(e[n], "globalEval"))
        }

        function v(t, e) {
            var n, r, i, o, a, s, l, u;
            if (1 === e.nodeType) {
                if (mt.hasData(t) && (o = mt.access(t), a = mt.set(e, o), u = o.events)) {
                    delete a.handle, a.events = {};
                    for (i in u)
                        for (n = 0, r = u[i].length; r > n; n++) Z.event.add(e, i, u[i][n])
                }
                yt.hasData(t) && (s = yt.access(t), l = Z.extend({}, s), yt.set(e, l))
            }
        }

        function m(t, e) {
            var n = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
            return void 0 === e || e && Z.nodeName(t, e) ? Z.merge([t], n) : n
        }

        function y(t, e) {
            var n = e.nodeName.toLowerCase();
            "input" === n && Ct.test(t.type) ? e.checked = t.checked : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
        }

        function b(e, n) {
            var r, i = Z(n.createElement(e)).appendTo(n.body),
                o = t.getDefaultComputedStyle && (r = t.getDefaultComputedStyle(i[0])) ? r.display : Z.css(i[0], "display");
            return i.detach(), o
        }

        function w(t) {
            var e = Q,
                n = qt[t];
            return n || (n = b(t, e), "none" !== n && n || (Ht = (Ht || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = Ht[0].contentDocument, e.write(), e.close(), n = b(t, e), Ht.detach()), qt[t] = n), n
        }

        function x(t, e, n) {
            var r, i, o, a, s = t.style;
            return n = n || Wt(t), n && (a = n.getPropertyValue(e) || n[e]), n && ("" !== a || Z.contains(t.ownerDocument, t) || (a = Z.style(t, e)), Ut.test(a) && Mt.test(e) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function S(t, e) {
            return {
                get: function () {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function T(t, e) {
            if (e in t) return e;
            for (var n = e[0].toUpperCase() + e.slice(1), r = e, i = Gt.length; i--;)
                if (e = Gt[i] + n, e in t) return e;
            return r
        }

        function C(t, e, n) {
            var r = zt.exec(e);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
        }

        function D(t, e, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += Z.css(t, n + St[o], !0, i)), r ? ("content" === n && (a -= Z.css(t, "padding" + St[o], !0, i)), "margin" !== n && (a -= Z.css(t, "border" + St[o] + "Width", !0, i))) : (a += Z.css(t, "padding" + St[o], !0, i), "padding" !== n && (a += Z.css(t, "border" + St[o] + "Width", !0, i)));
            return a
        }

        function _(t, e, n) {
            var r = !0,
                i = "width" === e ? t.offsetWidth : t.offsetHeight,
                o = Wt(t),
                a = "border-box" === Z.css(t, "boxSizing", !1, o);
            if (0 >= i || null == i) {
                if (i = x(t, e, o), (0 > i || null == i) && (i = t.style[e]), Ut.test(i)) return i;
                r = a && (Y.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
            }
            return i + D(t, e, n || (a ? "border" : "content"), r, o) + "px"
        }

        function A(t, e) {
            for (var n, r, i, o = [], a = 0, s = t.length; s > a; a++) r = t[a], r.style && (o[a] = mt.get(r, "olddisplay"), n = r.style.display, e ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Tt(r) && (o[a] = mt.access(r, "olddisplay", w(r.nodeName)))) : (i = Tt(r), "none" === n && i || mt.set(r, "olddisplay", i ? n : Z.css(r, "display"))));
            for (a = 0; s > a; a++) r = t[a], r.style && (e && "none" !== r.style.display && "" !== r.style.display || (r.style.display = e ? o[a] || "" : "none"));
            return t
        }

        function $(t, e, n, r, i) {
            return new $.prototype.init(t, e, n, r, i)
        }

        function E() {
            return setTimeout(function () {
                Yt = void 0
            }), Yt = Z.now()
        }

        function I(t, e) {
            var n, r = 0,
                i = {
                    height: t
                };
            for (e = e ? 1 : 0; 4 > r; r += 2 - e) n = St[r], i["margin" + n] = i["padding" + n] = t;
            return e && (i.opacity = i.width = t), i
        }

        function k(t, e, n) {
            for (var r, i = (ne[e] || []).concat(ne["*"]), o = 0, a = i.length; a > o; o++)
                if (r = i[o].call(n, e, t)) return r
        }

        function j(t, e, n) {
            var r, i, o, a, s, l, u, c, d = this,
                f = {},
                p = t.style,
                h = t.nodeType && Tt(t),
                g = mt.get(t, "fxshow");
            n.queue || (s = Z._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                s.unqueued || l()
            }), s.unqueued++, d.always(function () {
                d.always(function () {
                    s.unqueued--, Z.queue(t, "fx").length || s.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = Z.css(t, "display"), c = "none" === u ? mt.get(t, "olddisplay") || w(t.nodeName) : u, "inline" === c && "none" === Z.css(t, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function () {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (r in e)
                if (i = e[r], Kt.exec(i)) {
                    if (delete e[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                        if ("show" !== i || !g || void 0 === g[r]) continue;
                        h = !0
                    }
                    f[r] = g && g[r] || Z.style(t, r)
                } else u = void 0;
            if (Z.isEmptyObject(f)) "inline" === ("none" === u ? w(t.nodeName) : u) && (p.display = u);
            else {
                g ? "hidden" in g && (h = g.hidden) : g = mt.access(t, "fxshow", {}), o && (g.hidden = !h), h ? Z(t).show() : d.done(function () {
                    Z(t).hide()
                }), d.done(function () {
                    var e;
                    mt.remove(t, "fxshow");
                    for (e in f) Z.style(t, e, f[e])
                });
                for (r in f) a = k(h ? g[r] : 0, r, d), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
            }
        }

        function N(t, e) {
            var n, r, i, o, a;
            for (n in t)
                if (r = Z.camelCase(n), i = e[r], o = t[n], Z.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), a = Z.cssHooks[r], a && "expand" in a) {
                    o = a.expand(o), delete t[r];
                    for (n in o) n in t || (t[n] = o[n], e[n] = i)
                } else e[r] = i
        }

        function O(t, e, n) {
            var r, i, o = 0,
                a = ee.length,
                s = Z.Deferred().always(function () {
                    delete l.elem
                }),
                l = function () {
                    if (i) return !1;
                    for (var e = Yt || E(), n = Math.max(0, u.startTime + u.duration - e), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
                    return s.notifyWith(t, [u, o, n]), 1 > o && l ? n : (s.resolveWith(t, [u]), !1)
                },
                u = s.promise({
                    elem: t,
                    props: Z.extend({}, e),
                    opts: Z.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: Yt || E(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (e, n) {
                        var r = Z.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                        return u.tweens.push(r), r
                    },
                    stop: function (e) {
                        var n = 0,
                            r = e ? u.tweens.length : 0;
                        if (i) return this;
                        for (i = !0; r > n; n++) u.tweens[n].run(1);
                        return e ? s.resolveWith(t, [u, e]) : s.rejectWith(t, [u, e]), this
                    }
                }),
                c = u.props;
            for (N(c, u.opts.specialEasing); a > o; o++)
                if (r = ee[o].call(u, t, c, u.opts)) return r;
            return Z.map(c, k, u), Z.isFunction(u.opts.start) && u.opts.start.call(t, u), Z.fx.timer(Z.extend(l, {
                elem: t,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function L(t) {
            return function (e, n) {
                "string" != typeof e && (n = e, e = "*");
                var r, i = 0,
                    o = e.toLowerCase().match(pt) || [];
                if (Z.isFunction(n))
                    for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
            }
        }

        function R(t, e, n, r) {
            function i(s) {
                var l;
                return o[s] = !0, Z.each(t[s] || [], function (t, s) {
                    var u = s(e, n, r);
                    return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (e.dataTypes.unshift(u), i(u), !1)
                }), l
            }
            var o = {},
                a = t === be;
            return i(e.dataTypes[0]) || !o["*"] && i("*")
        }

        function P(t, e) {
            var n, r, i = Z.ajaxSettings.flatOptions || {};
            for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
            return r && Z.extend(!0, t, r), t
        }

        function F(t, e, n) {
            for (var r, i, o, a, s = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
            if (r)
                for (i in s)
                    if (s[i] && s[i].test(r)) {
                        l.unshift(i);
                        break
                    } if (l[0] in n) o = l[0];
            else {
                for (i in n) {
                    if (!l[0] || t.converters[i + " " + l[0]]) {
                        o = i;
                        break
                    }
                    a || (a = i)
                }
                o = o || a
            }
            return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
        }

        function H(t, e, n, r) {
            var i, o, a, s, l, u = {},
                c = t.dataTypes.slice();
            if (c[1])
                for (a in t.converters) u[a.toLowerCase()] = t.converters[a];
            for (o = c.shift(); o;)
                if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (a = u[l + " " + o] || u["* " + o], !a)
                    for (i in u)
                        if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                            a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                            break
                        } if (a !== !0)
                    if (a && t["throws"]) e = a(e);
                    else try {
                        e = a(e)
                    } catch (d) {
                        return {
                            state: "parsererror",
                            error: a ? d : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function q(t, e, n, r) {
            var i;
            if (Z.isArray(e)) Z.each(e, function (e, i) {
                n || Ce.test(t) ? r(t, i) : q(t + "[" + ("object" == typeof i ? e : "") + "]", i, n, r)
            });
            else if (n || "object" !== Z.type(e)) r(t, e);
            else
                for (i in e) q(t + "[" + i + "]", e[i], n, r)
        }

        function M(t) {
            return Z.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
        }
        var U = [],
            W = U.slice,
            B = U.concat,
            z = U.push,
            V = U.indexOf,
            X = {},
            J = X.toString,
            G = X.hasOwnProperty,
            Y = {},
            Q = t.document,
            K = "2.1.3",
            Z = function (t, e) {
                return new Z.fn.init(t, e)
            },
            tt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            et = /^-ms-/,
            nt = /-([\da-z])/gi,
            rt = function (t, e) {
                return e.toUpperCase()
            };
        Z.fn = Z.prototype = {
            jquery: K,
            constructor: Z,
            selector: "",
            length: 0,
            toArray: function () {
                return W.call(this)
            },
            get: function (t) {
                return null != t ? 0 > t ? this[t + this.length] : this[t] : W.call(this)
            },
            pushStack: function (t) {
                var e = Z.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function (t, e) {
                return Z.each(this, t, e)
            },
            map: function (t) {
                return this.pushStack(Z.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function () {
                return this.pushStack(W.apply(this, arguments))
            },
            first: function () {
                return this.eq(0)
            },
            last: function () {
                return this.eq(-1)
            },
            eq: function (t) {
                var e = this.length,
                    n = +t + (0 > t ? e : 0);
                return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
            },
            end: function () {
                return this.prevObject || this.constructor(null)
            },
            push: z,
            sort: U.sort,
            splice: U.splice
        }, Z.extend = Z.fn.extend = function () {
            var t, e, n, r, i, o, a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                u = !1;
            for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || Z.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)
                if (null != (t = arguments[s]))
                    for (e in t) n = a[e], r = t[e], a !== r && (u && r && (Z.isPlainObject(r) || (i = Z.isArray(r))) ? (i ? (i = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, a[e] = Z.extend(u, o, r)) : void 0 !== r && (a[e] = r));
            return a
        }, Z.extend({
            expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (t) {
                throw new Error(t)
            },
            noop: function () {},
            isFunction: function (t) {
                return "function" === Z.type(t)
            },
            isArray: Array.isArray,
            isWindow: function (t) {
                return null != t && t === t.window
            },
            isNumeric: function (t) {
                return !Z.isArray(t) && t - parseFloat(t) + 1 >= 0
            },
            isPlainObject: function (t) {
                return "object" === Z.type(t) && !t.nodeType && !Z.isWindow(t) && !(t.constructor && !G.call(t.constructor.prototype, "isPrototypeOf"))
            },
            isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            type: function (t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? X[J.call(t)] || "object" : typeof t
            },
            globalEval: function (t) {
                var e, n = eval;
                t = Z.trim(t), t && (1 === t.indexOf("use strict") ? (e = Q.createElement("script"), e.text = t, Q.head.appendChild(e).parentNode.removeChild(e)) : n(t))
            },
            camelCase: function (t) {
                return t.replace(et, "ms-").replace(nt, rt)
            },
            nodeName: function (t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function (t, e, r) {
                var i, o = 0,
                    a = t.length,
                    s = n(t);
                if (r) {
                    if (s)
                        for (; a > o && (i = e.apply(t[o], r), i !== !1); o++);
                    else
                        for (o in t)
                            if (i = e.apply(t[o], r), i === !1) break
                } else if (s)
                    for (; a > o && (i = e.call(t[o], o, t[o]), i !== !1); o++);
                else
                    for (o in t)
                        if (i = e.call(t[o], o, t[o]), i === !1) break;
                return t
            },
            trim: function (t) {
                return null == t ? "" : (t + "").replace(tt, "")
            },
            makeArray: function (t, e) {
                var r = e || [];
                return null != t && (n(Object(t)) ? Z.merge(r, "string" == typeof t ? [t] : t) : z.call(r, t)), r
            },
            inArray: function (t, e, n) {
                return null == e ? -1 : V.call(e, t, n)
            },
            merge: function (t, e) {
                for (var n = +e.length, r = 0, i = t.length; n > r; r++) t[i++] = e[r];
                return t.length = i, t
            },
            grep: function (t, e, n) {
                for (var r, i = [], o = 0, a = t.length, s = !n; a > o; o++) r = !e(t[o], o), r !== s && i.push(t[o]);
                return i
            },
            map: function (t, e, r) {
                var i, o = 0,
                    a = t.length,
                    s = n(t),
                    l = [];
                if (s)
                    for (; a > o; o++) i = e(t[o], o, r), null != i && l.push(i);
                else
                    for (o in t) i = e(t[o], o, r), null != i && l.push(i);
                return B.apply([], l)
            },
            guid: 1,
            proxy: function (t, e) {
                var n, r, i;
                return "string" == typeof e && (n = t[e], e = t, t = n), Z.isFunction(t) ? (r = W.call(arguments, 2), i = function () {
                    return t.apply(e || this, r.concat(W.call(arguments)))
                }, i.guid = t.guid = t.guid || Z.guid++, i) : void 0
            },
            now: Date.now,
            support: Y
        }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
            X["[object " + e + "]"] = e.toLowerCase()
        });
        var it = function (t) {
            function e(t, e, n, r) {
                var i, o, a, s, l, u, d, p, h, g;
                if ((e ? e.ownerDocument || e : q) !== j && k(e), e = e || j, n = n || [], s = e.nodeType, "string" != typeof t || !t || 1 !== s && 9 !== s && 11 !== s) return n;
                if (!r && O) {
                    if (11 !== s && (i = yt.exec(t)))
                        if (a = i[1]) {
                            if (9 === s) {
                                if (o = e.getElementById(a), !o || !o.parentNode) return n;
                                if (o.id === a) return n.push(o), n
                            } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(a)) && F(e, o) && o.id === a) return n.push(o), n
                        } else {
                            if (i[2]) return K.apply(n, e.getElementsByTagName(t)), n;
                            if ((a = i[3]) && x.getElementsByClassName) return K.apply(n, e.getElementsByClassName(a)), n
                        } if (x.qsa && (!L || !L.test(t))) {
                        if (p = d = H, h = e, g = 1 !== s && t, 1 === s && "object" !== e.nodeName.toLowerCase()) {
                            for (u = D(t), (d = e.getAttribute("id")) ? p = d.replace(wt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = u.length; l--;) u[l] = p + f(u[l]);
                            h = bt.test(t) && c(e.parentNode) || e, g = u.join(",")
                        }
                        if (g) try {
                            return K.apply(n, h.querySelectorAll(g)), n
                        } catch (v) {} finally {
                            d || e.removeAttribute("id")
                        }
                    }
                }
                return A(t.replace(lt, "$1"), e, n, r)
            }

            function n() {
                function t(n, r) {
                    return e.push(n + " ") > S.cacheLength && delete t[e.shift()], t[n + " "] = r
                }
                var e = [];
                return t
            }

            function r(t) {
                return t[H] = !0, t
            }

            function i(t) {
                var e = j.createElement("div");
                try {
                    return !!t(e)
                } catch (n) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var n = t.split("|"), r = t.length; r--;) S.attrHandle[n[r]] = e
            }

            function a(t, e) {
                var n = e && t,
                    r = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === e) return -1;
                return t ? 1 : -1
            }

            function s(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return "input" === n && e.type === t
                }
            }

            function l(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function u(t) {
                return r(function (e) {
                    return e = +e, r(function (n, r) {
                        for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function c(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function d() {}

            function f(t) {
                for (var e = 0, n = t.length, r = ""; n > e; e++) r += t[e].value;
                return r
            }

            function p(t, e, n) {
                var r = e.dir,
                    i = n && "parentNode" === r,
                    o = U++;
                return e.first ? function (e, n, o) {
                    for (; e = e[r];)
                        if (1 === e.nodeType || i) return t(e, n, o)
                } : function (e, n, a) {
                    var s, l, u = [M, o];
                    if (a) {
                        for (; e = e[r];)
                            if ((1 === e.nodeType || i) && t(e, n, a)) return !0
                    } else
                        for (; e = e[r];)
                            if (1 === e.nodeType || i) {
                                if (l = e[H] || (e[H] = {}), (s = l[r]) && s[0] === M && s[1] === o) return u[2] = s[2];
                                if (l[r] = u, u[2] = t(e, n, a)) return !0
                            }
                }
            }

            function h(t) {
                return t.length > 1 ? function (e, n, r) {
                    for (var i = t.length; i--;)
                        if (!t[i](e, n, r)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, n, r) {
                for (var i = 0, o = n.length; o > i; i++) e(t, n[i], r);
                return r
            }

            function v(t, e, n, r, i) {
                for (var o, a = [], s = 0, l = t.length, u = null != e; l > s; s++)(o = t[s]) && (!n || n(o, r, i)) && (a.push(o), u && e.push(s));
                return a
            }

            function m(t, e, n, i, o, a) {
                return i && !i[H] && (i = m(i)), o && !o[H] && (o = m(o, a)), r(function (r, a, s, l) {
                    var u, c, d, f = [],
                        p = [],
                        h = a.length,
                        m = r || g(e || "*", s.nodeType ? [s] : s, []),
                        y = !t || !r && e ? m : v(m, f, t, s, l),
                        b = n ? o || (r ? t : h || i) ? [] : a : y;
                    if (n && n(y, b, s, l), i)
                        for (u = v(b, p), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[p[c]] = !(y[p[c]] = d));
                    if (r) {
                        if (o || t) {
                            if (o) {
                                for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                                o(null, b = [], u, l)
                            }
                            for (c = b.length; c--;)(d = b[c]) && (u = o ? tt(r, d) : f[c]) > -1 && (r[u] = !(a[u] = d))
                        }
                    } else b = v(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, l) : K.apply(a, b)
                })
            }

            function y(t) {
                for (var e, n, r, i = t.length, o = S.relative[t[0].type], a = o || S.relative[" "], s = o ? 1 : 0, l = p(function (t) {
                        return t === e
                    }, a, !0), u = p(function (t) {
                        return tt(e, t) > -1
                    }, a, !0), c = [function (t, n, r) {
                        var i = !o && (r || n !== $) || ((e = n).nodeType ? l(t, n, r) : u(t, n, r));
                        return e = null, i
                    }]; i > s; s++)
                    if (n = S.relative[t[s].type]) c = [p(h(c), n)];
                    else {
                        if (n = S.filter[t[s].type].apply(null, t[s].matches), n[H]) {
                            for (r = ++s; i > r && !S.relative[t[r].type]; r++);
                            return m(s > 1 && h(c), s > 1 && f(t.slice(0, s - 1).concat({
                                value: " " === t[s - 2].type ? "*" : ""
                            })).replace(lt, "$1"), n, r > s && y(t.slice(s, r)), i > r && y(t = t.slice(r)), i > r && f(t))
                        }
                        c.push(n)
                    } return h(c)
            }

            function b(t, n) {
                var i = n.length > 0,
                    o = t.length > 0,
                    a = function (r, a, s, l, u) {
                        var c, d, f, p = 0,
                            h = "0",
                            g = r && [],
                            m = [],
                            y = $,
                            b = r || o && S.find.TAG("*", u),
                            w = M += null == y ? 1 : Math.random() || .1,
                            x = b.length;
                        for (u && ($ = a !== j && a); h !== x && null != (c = b[h]); h++) {
                            if (o && c) {
                                for (d = 0; f = t[d++];)
                                    if (f(c, a, s)) {
                                        l.push(c);
                                        break
                                    } u && (M = w)
                            }
                            i && ((c = !f && c) && p--, r && g.push(c))
                        }
                        if (p += h, i && h !== p) {
                            for (d = 0; f = n[d++];) f(g, m, a, s);
                            if (r) {
                                if (p > 0)
                                    for (; h--;) g[h] || m[h] || (m[h] = Y.call(l));
                                m = v(m)
                            }
                            K.apply(l, m), u && !r && m.length > 0 && p + n.length > 1 && e.uniqueSort(l)
                        }
                        return u && (M = w, $ = y), g
                    };
                return i ? r(a) : a
            }
            var w, x, S, T, C, D, _, A, $, E, I, k, j, N, O, L, R, P, F, H = "sizzle" + 1 * new Date,
                q = t.document,
                M = 0,
                U = 0,
                W = n(),
                B = n(),
                z = n(),
                V = function (t, e) {
                    return t === e && (I = !0), 0
                },
                X = 1 << 31,
                J = {}.hasOwnProperty,
                G = [],
                Y = G.pop,
                Q = G.push,
                K = G.push,
                Z = G.slice,
                tt = function (t, e) {
                    for (var n = 0, r = t.length; r > n; n++)
                        if (t[n] === e) return n;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                nt = "[\\x20\\t\\r\\n\\f]",
                rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                it = rt.replace("w", "w#"),
                ot = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
                at = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
                st = new RegExp(nt + "+", "g"),
                lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                ut = new RegExp("^" + nt + "*," + nt + "*"),
                ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                dt = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
                ft = new RegExp(at),
                pt = new RegExp("^" + it + "$"),
                ht = {
                    ID: new RegExp("^#(" + rt + ")"),
                    CLASS: new RegExp("^\\.(" + rt + ")"),
                    TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + ot),
                    PSEUDO: new RegExp("^" + at),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                },
                gt = /^(?:input|select|textarea|button)$/i,
                vt = /^h\d$/i,
                mt = /^[^{]+\{\s*\[native \w/,
                yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                bt = /[+~]/,
                wt = /'|\\/g,
                xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                St = function (t, e, n) {
                    var r = "0x" + e - 65536;
                    return r !== r || n ? e : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                },
                Tt = function () {
                    k()
                };
            try {
                K.apply(G = Z.call(q.childNodes), q.childNodes), G[q.childNodes.length].nodeType
            } catch (Ct) {
                K = {
                    apply: G.length ? function (t, e) {
                        Q.apply(t, Z.call(e))
                    } : function (t, e) {
                        for (var n = t.length, r = 0; t[n++] = e[r++];);
                        t.length = n - 1
                    }
                }
            }
            x = e.support = {}, C = e.isXML = function (t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, k = e.setDocument = function (t) {
                var e, n, r = t ? t.ownerDocument || t : q;
                return r !== j && 9 === r.nodeType && r.documentElement ? (j = r, N = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), O = !C(r), x.attributes = i(function (t) {
                    return t.className = "i", !t.getAttribute("className")
                }), x.getElementsByTagName = i(function (t) {
                    return t.appendChild(r.createComment("")), !t.getElementsByTagName("*").length
                }), x.getElementsByClassName = mt.test(r.getElementsByClassName), x.getById = i(function (t) {
                    return N.appendChild(t).id = H, !r.getElementsByName || !r.getElementsByName(H).length
                }), x.getById ? (S.find.ID = function (t, e) {
                    if ("undefined" != typeof e.getElementById && O) {
                        var n = e.getElementById(t);
                        return n && n.parentNode ? [n] : []
                    }
                }, S.filter.ID = function (t) {
                    var e = t.replace(xt, St);
                    return function (t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete S.find.ID, S.filter.ID = function (t) {
                    var e = t.replace(xt, St);
                    return function (t) {
                        var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), S.find.TAG = x.getElementsByTagName ? function (t, e) {
                    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
                } : function (t, e) {
                    var n, r = [],
                        i = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, S.find.CLASS = x.getElementsByClassName && function (t, e) {
                    return O ? e.getElementsByClassName(t) : void 0
                }, R = [], L = [], (x.qsa = mt.test(r.querySelectorAll)) && (i(function (t) {
                    N.appendChild(t).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || L.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + H + "-]").length || L.push("~="), t.querySelectorAll(":checked").length || L.push(":checked"), t.querySelectorAll("a#" + H + "+*").length || L.push(".#.+[+~]")
                }), i(function (t) {
                    var e = r.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && L.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), L.push(",.*:")
                })), (x.matchesSelector = mt.test(P = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && i(function (t) {
                    x.disconnectedMatch = P.call(t, "div"), P.call(t, "[s!='']:x"), R.push("!=", at)
                }), L = L.length && new RegExp(L.join("|")), R = R.length && new RegExp(R.join("|")), e = mt.test(N.compareDocumentPosition), F = e || mt.test(N.contains) ? function (t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        r = e && e.parentNode;
                    return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                } : function (t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, V = e ? function (t, e) {
                    if (t === e) return I = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === r || t.ownerDocument === q && F(q, t) ? -1 : e === r || e.ownerDocument === q && F(q, e) ? 1 : E ? tt(E, t) - tt(E, e) : 0 : 4 & n ? -1 : 1)
                } : function (t, e) {
                    if (t === e) return I = !0, 0;
                    var n, i = 0,
                        o = t.parentNode,
                        s = e.parentNode,
                        l = [t],
                        u = [e];
                    if (!o || !s) return t === r ? -1 : e === r ? 1 : o ? -1 : s ? 1 : E ? tt(E, t) - tt(E, e) : 0;
                    if (o === s) return a(t, e);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (n = e; n = n.parentNode;) u.unshift(n);
                    for (; l[i] === u[i];) i++;
                    return i ? a(l[i], u[i]) : l[i] === q ? -1 : u[i] === q ? 1 : 0
                }, r) : j
            }, e.matches = function (t, n) {
                return e(t, null, null, n)
            }, e.matchesSelector = function (t, n) {
                if ((t.ownerDocument || t) !== j && k(t), n = n.replace(dt, "='$1']"), !(!x.matchesSelector || !O || R && R.test(n) || L && L.test(n))) try {
                    var r = P.call(t, n);
                    if (r || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                } catch (i) {}
                return e(n, j, null, [t]).length > 0
            }, e.contains = function (t, e) {
                return (t.ownerDocument || t) !== j && k(t), F(t, e)
            }, e.attr = function (t, e) {
                (t.ownerDocument || t) !== j && k(t);
                var n = S.attrHandle[e.toLowerCase()],
                    r = n && J.call(S.attrHandle, e.toLowerCase()) ? n(t, e, !O) : void 0;
                return void 0 !== r ? r : x.attributes || !O ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
            }, e.error = function (t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function (t) {
                var e, n = [],
                    r = 0,
                    i = 0;
                if (I = !x.detectDuplicates, E = !x.sortStable && t.slice(0), t.sort(V), I) {
                    for (; e = t[i++];) e === t[i] && (r = n.push(i));
                    for (; r--;) t.splice(n[r], 1)
                }
                return E = null, t
            }, T = e.getText = function (t) {
                var e, n = "",
                    r = 0,
                    i = t.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += T(t)
                    } else if (3 === i || 4 === i) return t.nodeValue
                } else
                    for (; e = t[r++];) n += T(e);
                return n
            }, S = e.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: ht,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (t) {
                        return t[1] = t[1].replace(xt, St), t[3] = (t[3] || t[4] || t[5] || "").replace(xt, St), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function (t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function (t) {
                        var e, n = !t[6] && t[2];
                        return ht.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ft.test(n) && (e = D(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (t) {
                        var e = t.replace(xt, St).toLowerCase();
                        return "*" === t ? function () {
                            return !0
                        } : function (t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function (t) {
                        var e = W[t + " "];
                        return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && W(t, function (t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (t, n, r) {
                        return function (i) {
                            var o = e.attr(i, t);
                            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(st, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function (t, e, n, r, i) {
                        var o = "nth" !== t.slice(0, 3),
                            a = "last" !== t.slice(-4),
                            s = "of-type" === e;
                        return 1 === r && 0 === i ? function (t) {
                            return !!t.parentNode
                        } : function (e, n, l) {
                            var u, c, d, f, p, h, g = o !== a ? "nextSibling" : "previousSibling",
                                v = e.parentNode,
                                m = s && e.nodeName.toLowerCase(),
                                y = !l && !s;
                            if (v) {
                                if (o) {
                                    for (; g;) {
                                        for (d = e; d = d[g];)
                                            if (s ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                        h = g = "only" === t && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                    for (c = v[H] || (v[H] = {}), u = c[t] || [], p = u[0] === M && u[1], f = u[0] === M && u[2], d = p && v.childNodes[p]; d = ++p && d && d[g] || (f = p = 0) || h.pop();)
                                        if (1 === d.nodeType && ++f && d === e) {
                                            c[t] = [M, p, f];
                                            break
                                        }
                                } else if (y && (u = (e[H] || (e[H] = {}))[t]) && u[0] === M) f = u[1];
                                else
                                    for (;
                                        (d = ++p && d && d[g] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++f || (y && ((d[H] || (d[H] = {}))[t] = [M, f]), d !== e)););
                                return f -= i, f === r || f % r === 0 && f / r >= 0
                            }
                        }
                    },
                    PSEUDO: function (t, n) {
                        var i, o = S.pseudos[t] || S.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[H] ? o(n) : o.length > 1 ? (i = [t, t, "", n], S.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function (t, e) {
                            for (var r, i = o(t, n), a = i.length; a--;) r = tt(t, i[a]), t[r] = !(e[r] = i[a])
                        }) : function (t) {
                            return o(t, 0, i)
                        }) : o
                    }
                },
                pseudos: {
                    not: r(function (t) {
                        var e = [],
                            n = [],
                            i = _(t.replace(lt, "$1"));
                        return i[H] ? r(function (t, e, n, r) {
                            for (var o, a = i(t, null, r, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                        }) : function (t, r, o) {
                            return e[0] = t, i(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: r(function (t) {
                        return function (n) {
                            return e(t, n).length > 0
                        }
                    }),
                    contains: r(function (t) {
                        return t = t.replace(xt, St),
                            function (e) {
                                return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                            }
                    }),
                    lang: r(function (t) {
                        return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(xt, St).toLowerCase(),
                            function (e) {
                                var n;
                                do
                                    if (n = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function (e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function (t) {
                        return t === N
                    },
                    focus: function (t) {
                        return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function (t) {
                        return t.disabled === !1
                    },
                    disabled: function (t) {
                        return t.disabled === !0
                    },
                    checked: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function (t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    },
                    empty: function (t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function (t) {
                        return !S.pseudos.empty(t)
                    },
                    header: function (t) {
                        return vt.test(t.nodeName)
                    },
                    input: function (t) {
                        return gt.test(t.nodeName)
                    },
                    button: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function (t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: u(function () {
                        return [0]
                    }),
                    last: u(function (t, e) {
                        return [e - 1]
                    }),
                    eq: u(function (t, e, n) {
                        return [0 > n ? n + e : n]
                    }),
                    even: u(function (t, e) {
                        for (var n = 0; e > n; n += 2) t.push(n);
                        return t
                    }),
                    odd: u(function (t, e) {
                        for (var n = 1; e > n; n += 2) t.push(n);
                        return t
                    }),
                    lt: u(function (t, e, n) {
                        for (var r = 0 > n ? n + e : n; --r >= 0;) t.push(r);
                        return t
                    }),
                    gt: u(function (t, e, n) {
                        for (var r = 0 > n ? n + e : n; ++r < e;) t.push(r);
                        return t
                    })
                }
            }, S.pseudos.nth = S.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) S.pseudos[w] = s(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) S.pseudos[w] = l(w);
            return d.prototype = S.filters = S.pseudos, S.setFilters = new d, D = e.tokenize = function (t, n) {
                var r, i, o, a, s, l, u, c = B[t + " "];
                if (c) return n ? 0 : c.slice(0);
                for (s = t, l = [], u = S.preFilter; s;) {
                    (!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = ct.exec(s)) && (r = i.shift(), o.push({
                        value: r,
                        type: i[0].replace(lt, " ")
                    }), s = s.slice(r.length));
                    for (a in S.filter) !(i = ht[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                        value: r,
                        type: a,
                        matches: i
                    }), s = s.slice(r.length));
                    if (!r) break
                }
                return n ? s.length : s ? e.error(t) : B(t, l).slice(0)
            }, _ = e.compile = function (t, e) {
                var n, r = [],
                    i = [],
                    o = z[t + " "];
                if (!o) {
                    for (e || (e = D(t)), n = e.length; n--;) o = y(e[n]), o[H] ? r.push(o) : i.push(o);
                    o = z(t, b(i, r)), o.selector = t
                }
                return o
            }, A = e.select = function (t, e, n, r) {
                var i, o, a, s, l, u = "function" == typeof t && t,
                    d = !r && D(t = u.selector || t);
                if (n = n || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === e.nodeType && O && S.relative[o[1].type]) {
                        if (e = (S.find.ID(a.matches[0].replace(xt, St), e) || [])[0], !e) return n;
                        u && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (i = ht.needsContext.test(t) ? 0 : o.length; i-- && (a = o[i], !S.relative[s = a.type]);)
                        if ((l = S.find[s]) && (r = l(a.matches[0].replace(xt, St), bt.test(o[0].type) && c(e.parentNode) || e))) {
                            if (o.splice(i, 1), t = r.length && f(o), !t) return K.apply(n, r), n;
                            break
                        }
                }
                return (u || _(t, d))(r, e, !O, n, bt.test(t) && c(e.parentNode) || e), n
            }, x.sortStable = H.split("").sort(V).join("") === H, x.detectDuplicates = !!I, k(), x.sortDetached = i(function (t) {
                return 1 & t.compareDocumentPosition(j.createElement("div"))
            }), i(function (t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (t, e, n) {
                return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), x.attributes && i(function (t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function (t, e, n) {
                return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
            }), i(function (t) {
                return null == t.getAttribute("disabled")
            }) || o(et, function (t, e, n) {
                var r;
                return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
            }), e
        }(t);
        Z.find = it, Z.expr = it.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = it.uniqueSort, Z.text = it.getText, Z.isXMLDoc = it.isXML, Z.contains = it.contains;
        var ot = Z.expr.match.needsContext,
            at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            st = /^.[^:#\[\.,]*$/;
        Z.filter = function (t, e, n) {
            var r = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? Z.find.matchesSelector(r, t) ? [r] : [] : Z.find.matches(t, Z.grep(e, function (t) {
                return 1 === t.nodeType
            }))
        }, Z.fn.extend({
            find: function (t) {
                var e, n = this.length,
                    r = [],
                    i = this;
                if ("string" != typeof t) return this.pushStack(Z(t).filter(function () {
                    for (e = 0; n > e; e++)
                        if (Z.contains(i[e], this)) return !0
                }));
                for (e = 0; n > e; e++) Z.find(t, i[e], r);
                return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + t : t, r
            },
            filter: function (t) {
                return this.pushStack(r(this, t || [], !1))
            },
            not: function (t) {
                return this.pushStack(r(this, t || [], !0))
            },
            is: function (t) {
                return !!r(this, "string" == typeof t && ot.test(t) ? Z(t) : t || [], !1).length
            }
        });
        var lt, ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ct = Z.fn.init = function (t, e) {
                var n, r;
                if (!t) return this;
                if ("string" == typeof t) {
                    if (n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : ut.exec(t), !n || !n[1] && e) return !e || e.jquery ? (e || lt).find(t) : this.constructor(e).find(t);
                    if (n[1]) {
                        if (e = e instanceof Z ? e[0] : e, Z.merge(this, Z.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : Q, !0)), at.test(n[1]) && Z.isPlainObject(e))
                            for (n in e) Z.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                        return this
                    }
                    return r = Q.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = Q, this.selector = t, this
                }
                return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : Z.isFunction(t) ? "undefined" != typeof lt.ready ? lt.ready(t) : t(Z) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), Z.makeArray(t, this))
            };
        ct.prototype = Z.fn, lt = Z(Q);
        var dt = /^(?:parents|prev(?:Until|All))/,
            ft = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        Z.extend({
            dir: function (t, e, n) {
                for (var r = [], i = void 0 !== n;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (i && Z(t).is(n)) break;
                        r.push(t)
                    } return r
            },
            sibling: function (t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            }
        }), Z.fn.extend({
            has: function (t) {
                var e = Z(t, this),
                    n = e.length;
                return this.filter(function () {
                    for (var t = 0; n > t; t++)
                        if (Z.contains(this, e[t])) return !0
                })
            },
            closest: function (t, e) {
                for (var n, r = 0, i = this.length, o = [], a = ot.test(t) || "string" != typeof t ? Z(t, e || this.context) : 0; i > r; r++)
                    for (n = this[r]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, t))) {
                            o.push(n);
                            break
                        } return this.pushStack(o.length > 1 ? Z.unique(o) : o)
            },
            index: function (t) {
                return t ? "string" == typeof t ? V.call(Z(t), this[0]) : V.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function (t, e) {
                return this.pushStack(Z.unique(Z.merge(this.get(), Z(t, e))))
            },
            addBack: function (t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), Z.each({
            parent: function (t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function (t) {
                return Z.dir(t, "parentNode")
            },
            parentsUntil: function (t, e, n) {
                return Z.dir(t, "parentNode", n)
            },
            next: function (t) {
                return i(t, "nextSibling")
            },
            prev: function (t) {
                return i(t, "previousSibling")
            },
            nextAll: function (t) {
                return Z.dir(t, "nextSibling")
            },
            prevAll: function (t) {
                return Z.dir(t, "previousSibling")
            },
            nextUntil: function (t, e, n) {
                return Z.dir(t, "nextSibling", n)
            },
            prevUntil: function (t, e, n) {
                return Z.dir(t, "previousSibling", n)
            },
            siblings: function (t) {
                return Z.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function (t) {
                return Z.sibling(t.firstChild)
            },
            contents: function (t) {
                return t.contentDocument || Z.merge([], t.childNodes)
            }
        }, function (t, e) {
            Z.fn[t] = function (n, r) {
                var i = Z.map(this, e, n);
                return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = Z.filter(r, i)), this.length > 1 && (ft[t] || Z.unique(i), dt.test(t) && i.reverse()), this.pushStack(i)
            }
        });
        var pt = /\S+/g,
            ht = {};
        Z.Callbacks = function (t) {
            t = "string" == typeof t ? ht[t] || o(t) : Z.extend({}, t);
            var e, n, r, i, a, s, l = [],
                u = !t.once && [],
                c = function (o) {
                    for (e = t.memory && o, n = !0, s = i || 0, i = 0, a = l.length, r = !0; l && a > s; s++)
                        if (l[s].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                            e = !1;
                            break
                        } r = !1, l && (u ? u.length && c(u.shift()) : e ? l = [] : d.disable())
                },
                d = {
                    add: function () {
                        if (l) {
                            var n = l.length;
                            ! function o(e) {
                                Z.each(e, function (e, n) {
                                    var r = Z.type(n);
                                    "function" === r ? t.unique && d.has(n) || l.push(n) : n && n.length && "string" !== r && o(n)
                                })
                            }(arguments), r ? a = l.length : e && (i = n, c(e))
                        }
                        return this
                    },
                    remove: function () {
                        return l && Z.each(arguments, function (t, e) {
                            for (var n;
                                (n = Z.inArray(e, l, n)) > -1;) l.splice(n, 1), r && (a >= n && a--, s >= n && s--)
                        }), this
                    },
                    has: function (t) {
                        return t ? Z.inArray(t, l) > -1 : !(!l || !l.length)
                    },
                    empty: function () {
                        return l = [], a = 0, this
                    },
                    disable: function () {
                        return l = u = e = void 0, this
                    },
                    disabled: function () {
                        return !l
                    },
                    lock: function () {
                        return u = void 0, e || d.disable(), this
                    },
                    locked: function () {
                        return !u
                    },
                    fireWith: function (t, e) {
                        return !l || n && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], r ? u.push(e) : c(e)), this
                    },
                    fire: function () {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function () {
                        return !!n
                    }
                };
            return d
        }, Z.extend({
            Deferred: function (t) {
                var e = [
                        ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Z.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function () {
                            return n
                        },
                        always: function () {
                            return i.done(arguments).fail(arguments), this
                        },
                        then: function () {
                            var t = arguments;
                            return Z.Deferred(function (n) {
                                Z.each(e, function (e, o) {
                                    var a = Z.isFunction(t[e]) && t[e];
                                    i[o[1]](function () {
                                        var t = a && a.apply(this, arguments);
                                        t && Z.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function (t) {
                            return null != t ? Z.extend(t, r) : r
                        }
                    },
                    i = {};
                return r.pipe = r.then, Z.each(e, function (t, o) {
                    var a = o[2],
                        s = o[3];
                    r[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, e[1 ^ t][2].disable, e[2][2].lock), i[o[0]] = function () {
                        return i[o[0] + "With"](this === i ? r : this, arguments), this
                    }, i[o[0] + "With"] = a.fireWith
                }), r.promise(i), t && t.call(i, i), i
            },
            when: function (t) {
                var e, n, r, i = 0,
                    o = W.call(arguments),
                    a = o.length,
                    s = 1 !== a || t && Z.isFunction(t.promise) ? a : 0,
                    l = 1 === s ? t : Z.Deferred(),
                    u = function (t, n, r) {
                        return function (i) {
                            n[t] = this, r[t] = arguments.length > 1 ? W.call(arguments) : i, r === e ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                        }
                    };
                if (a > 1)
                    for (e = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && Z.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, e)) : --s;
                return s || l.resolveWith(r, o), l.promise()
            }
        });
        var gt;
        Z.fn.ready = function (t) {
            return Z.ready.promise().done(t), this
        }, Z.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (t) {
                t ? Z.readyWait++ : Z.ready(!0)
            },
            ready: function (t) {
                (t === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, t !== !0 && --Z.readyWait > 0 || (gt.resolveWith(Q, [Z]), Z.fn.triggerHandler && (Z(Q).triggerHandler("ready"), Z(Q).off("ready"))))
            }
        }), Z.ready.promise = function (e) {
            return gt || (gt = Z.Deferred(), "complete" === Q.readyState ? setTimeout(Z.ready) : (Q.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1))), gt.promise(e)
        }, Z.ready.promise();
        var vt = Z.access = function (t, e, n, r, i, o, a) {
            var s = 0,
                l = t.length,
                u = null == n;
            if ("object" === Z.type(n)) {
                i = !0;
                for (s in n) Z.access(t, e, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, Z.isFunction(r) || (a = !0), u && (a ? (e.call(t, r), e = null) : (u = e, e = function (t, e, n) {
                    return u.call(Z(t), n)
                })), e))
                for (; l > s; s++) e(t[s], n, a ? r : r.call(t[s], s, e(t[s], n)));
            return i ? t : u ? e.call(t) : l ? e(t[0], n) : o
        };
        Z.acceptData = function (t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
        }, s.uid = 1, s.accepts = Z.acceptData, s.prototype = {
            key: function (t) {
                if (!s.accepts(t)) return 0;
                var e = {},
                    n = t[this.expando];
                if (!n) {
                    n = s.uid++;
                    try {
                        e[this.expando] = {
                            value: n
                        }, Object.defineProperties(t, e)
                    } catch (r) {
                        e[this.expando] = n, Z.extend(t, e)
                    }
                }
                return this.cache[n] || (this.cache[n] = {}), n
            },
            set: function (t, e, n) {
                var r, i = this.key(t),
                    o = this.cache[i];
                if ("string" == typeof e) o[e] = n;
                else if (Z.isEmptyObject(o)) Z.extend(this.cache[i], e);
                else
                    for (r in e) o[r] = e[r];
                return o
            },
            get: function (t, e) {
                var n = this.cache[this.key(t)];
                return void 0 === e ? n : n[e]
            },
            access: function (t, e, n) {
                var r;
                return void 0 === e || e && "string" == typeof e && void 0 === n ? (r = this.get(t, e), void 0 !== r ? r : this.get(t, Z.camelCase(e))) : (this.set(t, e, n), void 0 !== n ? n : e)
            },
            remove: function (t, e) {
                var n, r, i, o = this.key(t),
                    a = this.cache[o];
                if (void 0 === e) this.cache[o] = {};
                else {
                    Z.isArray(e) ? r = e.concat(e.map(Z.camelCase)) : (i = Z.camelCase(e), e in a ? r = [e, i] : (r = i, r = r in a ? [r] : r.match(pt) || [])), n = r.length;
                    for (; n--;) delete a[r[n]]
                }
            },
            hasData: function (t) {
                return !Z.isEmptyObject(this.cache[t[this.expando]] || {})
            },
            discard: function (t) {
                t[this.expando] && delete this.cache[t[this.expando]]
            }
        };
        var mt = new s,
            yt = new s,
            bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            wt = /([A-Z])/g;
        Z.extend({
            hasData: function (t) {
                return yt.hasData(t) || mt.hasData(t)
            },
            data: function (t, e, n) {
                return yt.access(t, e, n)
            },
            removeData: function (t, e) {
                yt.remove(t, e)
            },
            _data: function (t, e, n) {
                return mt.access(t, e, n)
            },
            _removeData: function (t, e) {
                mt.remove(t, e)
            }
        }), Z.fn.extend({
            data: function (t, e) {
                var n, r, i, o = this[0],
                    a = o && o.attributes;
                if (void 0 === t) {
                    if (this.length && (i = yt.get(o), 1 === o.nodeType && !mt.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), l(o, r, i[r])));
                        mt.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof t ? this.each(function () {
                    yt.set(this, t)
                }) : vt(this, function (e) {
                    var n, r = Z.camelCase(t);
                    if (o && void 0 === e) {
                        if (n = yt.get(o, t), void 0 !== n) return n;
                        if (n = yt.get(o, r), void 0 !== n) return n;
                        if (n = l(o, r, void 0), void 0 !== n) return n
                    } else this.each(function () {
                        var n = yt.get(this, r);
                        yt.set(this, r, e), -1 !== t.indexOf("-") && void 0 !== n && yt.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function (t) {
                return this.each(function () {
                    yt.remove(this, t)
                })
            }
        }), Z.extend({
            queue: function (t, e, n) {
                var r;
                return t ? (e = (e || "fx") + "queue", r = mt.get(t, e), n && (!r || Z.isArray(n) ? r = mt.access(t, e, Z.makeArray(n)) : r.push(n)), r || []) : void 0
            },
            dequeue: function (t, e) {
                e = e || "fx";
                var n = Z.queue(t, e),
                    r = n.length,
                    i = n.shift(),
                    o = Z._queueHooks(t, e),
                    a = function () {
                        Z.dequeue(t, e)
                    };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function (t, e) {
                var n = e + "queueHooks";
                return mt.get(t, n) || mt.access(t, n, {
                    empty: Z.Callbacks("once memory").add(function () {
                        mt.remove(t, [e + "queue", n])
                    })
                })
            }
        }), Z.fn.extend({
            queue: function (t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? Z.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                    var n = Z.queue(this, t, e);
                    Z._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && Z.dequeue(this, t)
                })
            },
            dequeue: function (t) {
                return this.each(function () {
                    Z.dequeue(this, t)
                })
            },
            clearQueue: function (t) {
                return this.queue(t || "fx", [])
            },
            promise: function (t, e) {
                var n, r = 1,
                    i = Z.Deferred(),
                    o = this,
                    a = this.length,
                    s = function () {
                        --r || i.resolveWith(o, [o])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = mt.get(o[a], t + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
                return s(), i.promise(e)
            }
        });
        var xt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            St = ["Top", "Right", "Bottom", "Left"],
            Tt = function (t, e) {
                return t = e || t, "none" === Z.css(t, "display") || !Z.contains(t.ownerDocument, t)
            },
            Ct = /^(?:checkbox|radio)$/i;
        ! function () {
            var t = Q.createDocumentFragment(),
                e = t.appendChild(Q.createElement("div")),
                n = Q.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), Y.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
        }();
        var Dt = "undefined";
        Y.focusinBubbles = "onfocusin" in t;
        var _t = /^key/,
            At = /^(?:mouse|pointer|contextmenu)|click/,
            $t = /^(?:focusinfocus|focusoutblur)$/,
            Et = /^([^.]*)(?:\.(.+)|)$/;
        Z.event = {
            global: {},
            add: function (t, e, n, r, i) {
                var o, a, s, l, u, c, d, f, p, h, g, v = mt.get(t);
                if (v)
                    for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Z.guid++), (l = v.events) || (l = v.events = {}), (a = v.handle) || (a = v.handle = function (e) {
                            return typeof Z !== Dt && Z.event.triggered !== e.type ? Z.event.dispatch.apply(t, arguments) : void 0
                        }), e = (e || "").match(pt) || [""], u = e.length; u--;) s = Et.exec(e[u]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p && (d = Z.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = Z.event.special[p] || {}, c = Z.extend({
                        type: p,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && Z.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, d.setup && d.setup.call(t, r, h, a) !== !1 || t.addEventListener && t.addEventListener(p, a, !1)), d.add && (d.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), Z.event.global[p] = !0)
            },
            remove: function (t, e, n, r, i) {
                var o, a, s, l, u, c, d, f, p, h, g, v = mt.hasData(t) && mt.get(t);
                if (v && (l = v.events)) {
                    for (e = (e || "").match(pt) || [""], u = e.length; u--;)
                        if (s = Et.exec(e[u]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
                            for (d = Z.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, f = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(t, c));
                            a && !f.length && (d.teardown && d.teardown.call(t, h, v.handle) !== !1 || Z.removeEvent(t, p, v.handle), delete l[p])
                        } else
                            for (p in l) Z.event.remove(t, p + e[u], n, r, !0);
                    Z.isEmptyObject(l) && (delete v.handle, mt.remove(t, "events"))
                }
            },
            trigger: function (e, n, r, i) {
                var o, a, s, l, u, c, d, f = [r || Q],
                    p = G.call(e, "type") ? e.type : e,
                    h = G.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = s = r = r || Q, 3 !== r.nodeType && 8 !== r.nodeType && !$t.test(p + Z.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), u = p.indexOf(":") < 0 && "on" + p, e = e[Z.expando] ? e : new Z.Event(p, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = h.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : Z.makeArray(n, [e]), d = Z.event.special[p] || {}, i || !d.trigger || d.trigger.apply(r, n) !== !1)) {
                    if (!i && !d.noBubble && !Z.isWindow(r)) {
                        for (l = d.delegateType || p, $t.test(l + p) || (a = a.parentNode); a; a = a.parentNode) f.push(a), s = a;
                        s === (r.ownerDocument || Q) && f.push(s.defaultView || s.parentWindow || t)
                    }
                    for (o = 0;
                        (a = f[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? l : d.bindType || p, c = (mt.get(a, "events") || {})[e.type] && mt.get(a, "handle"), c && c.apply(a, n), c = u && a[u], c && c.apply && Z.acceptData(a) && (e.result = c.apply(a, n), e.result === !1 && e.preventDefault());
                    return e.type = p, i || e.isDefaultPrevented() || d._default && d._default.apply(f.pop(), n) !== !1 || !Z.acceptData(r) || u && Z.isFunction(r[p]) && !Z.isWindow(r) && (s = r[u], s && (r[u] = null), Z.event.triggered = p, r[p](), Z.event.triggered = void 0, s && (r[u] = s)), e.result
                }
            },
            dispatch: function (t) {
                t = Z.event.fix(t);
                var e, n, r, i, o, a = [],
                    s = W.call(arguments),
                    l = (mt.get(this, "events") || {})[t.type] || [],
                    u = Z.event.special[t.type] || {};
                if (s[0] = t, t.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                    for (a = Z.event.handlers.call(this, t, l), e = 0;
                        (i = a[e++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = i.elem, n = 0;
                            (o = i.handlers[n++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(o.namespace)) && (t.handleObj = o, t.data = o.data, r = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (t.result = r) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, t), t.result
                }
            },
            handlers: function (t, e) {
                var n, r, i, o, a = [],
                    s = e.delegateCount,
                    l = t.target;
                if (s && l.nodeType && (!t.button || "click" !== t.type))
                    for (; l !== this; l = l.parentNode || this)
                        if (l.disabled !== !0 || "click" !== t.type) {
                            for (r = [], n = 0; s > n; n++) o = e[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Z(i, this).index(l) >= 0 : Z.find(i, this, null, [l]).length), r[i] && r.push(o);
                            r.length && a.push({
                                elem: l,
                                handlers: r
                            })
                        } return s < e.length && a.push({
                    elem: this,
                    handlers: e.slice(s)
                }), a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (t, e) {
                    var n, r, i, o = e.button;
                    return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || Q, r = n.documentElement, i = n.body, t.pageX = e.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            fix: function (t) {
                if (t[Z.expando]) return t;
                var e, n, r, i = t.type,
                    o = t,
                    a = this.fixHooks[i];
                for (a || (this.fixHooks[i] = a = At.test(i) ? this.mouseHooks : _t.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, t = new Z.Event(o), e = r.length; e--;) n = r[e], t[n] = o[n];
                return t.target || (t.target = Q), 3 === t.target.nodeType && (t.target = t.target.parentNode), a.filter ? a.filter(t, o) : t
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function () {
                        return this !== d() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        return this === d() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function () {
                        return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function (t) {
                        return Z.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function (t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function (t, e, n, r) {
                var i = Z.extend(new Z.Event, n, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                r ? Z.event.trigger(i, null, e) : Z.event.dispatch.call(e, i), i.isDefaultPrevented() && n.preventDefault()
            }
        }, Z.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n, !1)
        }, Z.Event = function (t, e) {
            return this instanceof Z.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? u : c) : this.type = t, e && Z.extend(this, e), this.timeStamp = t && t.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(t, e)
        }, Z.Event.prototype = {
            isDefaultPrevented: c,
            isPropagationStopped: c,
            isImmediatePropagationStopped: c,
            preventDefault: function () {
                var t = this.originalEvent;
                this.isDefaultPrevented = u, t && t.preventDefault && t.preventDefault()
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                this.isPropagationStopped = u, t && t.stopPropagation && t.stopPropagation()
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = u, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, Z.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (t, e) {
            Z.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function (t) {
                    var n, r = this,
                        i = t.relatedTarget,
                        o = t.handleObj;
                    return (!i || i !== r && !Z.contains(r, i)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), Y.focusinBubbles || Z.each({
            focus: "focusin",
            blur: "focusout"
        }, function (t, e) {
            var n = function (t) {
                Z.event.simulate(e, t.target, Z.event.fix(t), !0)
            };
            Z.event.special[e] = {
                setup: function () {
                    var r = this.ownerDocument || this,
                        i = mt.access(r, e);
                    i || r.addEventListener(t, n, !0), mt.access(r, e, (i || 0) + 1)
                },
                teardown: function () {
                    var r = this.ownerDocument || this,
                        i = mt.access(r, e) - 1;
                    i ? mt.access(r, e, i) : (r.removeEventListener(t, n, !0), mt.remove(r, e))
                }
            }
        }), Z.fn.extend({
            on: function (t, e, n, r, i) {
                var o, a;
                if ("object" == typeof t) {
                    "string" != typeof e && (n = n || e, e = void 0);
                    for (a in t) this.on(a, e, n, t[a], i);
                    return this
                }
                if (null == n && null == r ? (r = e, n = e = void 0) : null == r && ("string" == typeof e ? (r = n, n = void 0) : (r = n, n = e, e = void 0)), r === !1) r = c;
                else if (!r) return this;
                return 1 === i && (o = r, r = function (t) {
                    return Z().off(t), o.apply(this, arguments)
                }, r.guid = o.guid || (o.guid = Z.guid++)), this.each(function () {
                    Z.event.add(this, t, r, n, e)
                })
            },
            one: function (t, e, n, r) {
                return this.on(t, e, n, r, 1)
            },
            off: function (t, e, n) {
                var r, i;
                if (t && t.preventDefault && t.handleObj) return r = t.handleObj, Z(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" == typeof t) {
                    for (i in t) this.off(i, e, t[i]);
                    return this
                }
                return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = c), this.each(function () {
                    Z.event.remove(this, t, n, e)
                })
            },
            trigger: function (t, e) {
                return this.each(function () {
                    Z.event.trigger(t, e, this)
                })
            },
            triggerHandler: function (t, e) {
                var n = this[0];
                return n ? Z.event.trigger(t, e, n, !0) : void 0
            }
        });
        var It = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            kt = /<([\w:]+)/,
            jt = /<|&#?\w+;/,
            Nt = /<(?:script|style|link)/i,
            Ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Lt = /^$|\/(?:java|ecma)script/i,
            Rt = /^true\/(.*)/,
            Pt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Ft = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ft.optgroup = Ft.option, Ft.tbody = Ft.tfoot = Ft.colgroup = Ft.caption = Ft.thead, Ft.th = Ft.td, Z.extend({
            clone: function (t, e, n) {
                var r, i, o, a, s = t.cloneNode(!0),
                    l = Z.contains(t.ownerDocument, t);
                if (!(Y.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || Z.isXMLDoc(t)))
                    for (a = m(s), o = m(t), r = 0, i = o.length; i > r; r++) y(o[r], a[r]);
                if (e)
                    if (n)
                        for (o = o || m(t), a = a || m(s), r = 0, i = o.length; i > r; r++) v(o[r], a[r]);
                    else v(t, s);
                return a = m(s, "script"), a.length > 0 && g(a, !l && m(t, "script")), s
            },
            buildFragment: function (t, e, n, r) {
                for (var i, o, a, s, l, u, c = e.createDocumentFragment(), d = [], f = 0, p = t.length; p > f; f++)
                    if (i = t[f], i || 0 === i)
                        if ("object" === Z.type(i)) Z.merge(d, i.nodeType ? [i] : i);
                        else if (jt.test(i)) {
                    for (o = o || c.appendChild(e.createElement("div")), a = (kt.exec(i) || ["", ""])[1].toLowerCase(), s = Ft[a] || Ft._default, o.innerHTML = s[1] + i.replace(It, "<$1></$2>") + s[2], u = s[0]; u--;) o = o.lastChild;
                    Z.merge(d, o.childNodes), o = c.firstChild, o.textContent = ""
                } else d.push(e.createTextNode(i));
                for (c.textContent = "", f = 0; i = d[f++];)
                    if ((!r || -1 === Z.inArray(i, r)) && (l = Z.contains(i.ownerDocument, i), o = m(c.appendChild(i), "script"), l && g(o), n))
                        for (u = 0; i = o[u++];) Lt.test(i.type || "") && n.push(i);
                return c
            },
            cleanData: function (t) {
                for (var e, n, r, i, o = Z.event.special, a = 0; void 0 !== (n = t[a]); a++) {
                    if (Z.acceptData(n) && (i = n[mt.expando], i && (e = mt.cache[i]))) {
                        if (e.events)
                            for (r in e.events) o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, e.handle);
                        mt.cache[i] && delete mt.cache[i]
                    }
                    delete yt.cache[n[yt.expando]]
                }
            }
        }), Z.fn.extend({
            text: function (t) {
                return vt(this, function (t) {
                    return void 0 === t ? Z.text(this) : this.empty().each(function () {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function () {
                return this.domManip(arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function () {
                return this.domManip(arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function () {
                return this.domManip(arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function () {
                return this.domManip(arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function (t, e) {
                for (var n, r = t ? Z.filter(t, this) : this, i = 0; null != (n = r[i]); i++) e || 1 !== n.nodeType || Z.cleanData(m(n)), n.parentNode && (e && Z.contains(n.ownerDocument, n) && g(m(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (Z.cleanData(m(t, !1)), t.textContent = "");
                return this
            },
            clone: function (t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function () {
                    return Z.clone(this, t, e)
                })
            },
            html: function (t) {
                return vt(this, function (t) {
                    var e = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Nt.test(t) && !Ft[(kt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = t.replace(It, "<$1></$2>");
                        try {
                            for (; r > n; n++) e = this[n] || {}, 1 === e.nodeType && (Z.cleanData(m(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (i) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function () {
                var t = arguments[0];
                return this.domManip(arguments, function (e) {
                    t = this.parentNode, Z.cleanData(m(this)), t && t.replaceChild(e, this)
                }), t && (t.length || t.nodeType) ? this : this.remove()
            },
            detach: function (t) {
                return this.remove(t, !0)
            },
            domManip: function (t, e) {
                t = B.apply([], t);
                var n, r, i, o, a, s, l = 0,
                    u = this.length,
                    c = this,
                    d = u - 1,
                    f = t[0],
                    g = Z.isFunction(f);
                if (g || u > 1 && "string" == typeof f && !Y.checkClone && Ot.test(f)) return this.each(function (n) {
                    var r = c.eq(n);
                    g && (t[0] = f.call(this, n, r.html())), r.domManip(t, e)
                });
                if (u && (n = Z.buildFragment(t, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                    for (i = Z.map(m(n, "script"), p), o = i.length; u > l; l++) a = n, l !== d && (a = Z.clone(a, !0, !0), o && Z.merge(i, m(a, "script"))), e.call(this[l], a, l);
                    if (o)
                        for (s = i[i.length - 1].ownerDocument, Z.map(i, h), l = 0; o > l; l++) a = i[l], Lt.test(a.type || "") && !mt.access(a, "globalEval") && Z.contains(s, a) && (a.src ? Z._evalUrl && Z._evalUrl(a.src) : Z.globalEval(a.textContent.replace(Pt, "")))
                }
                return this
            }
        }), Z.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (t, e) {
            Z.fn[t] = function (t) {
                for (var n, r = [], i = Z(t), o = i.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), Z(i[a])[e](n), z.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var Ht, qt = {},
            Mt = /^margin/,
            Ut = new RegExp("^(" + xt + ")(?!px)[a-z%]+$", "i"),
            Wt = function (e) {
                return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
            };
        ! function () {
            function e() {
                a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", i.appendChild(o);
                var e = t.getComputedStyle(a, null);
                n = "1%" !== e.top, r = "4px" === e.width, i.removeChild(o)
            }
            var n, r, i = Q.documentElement,
                o = Q.createElement("div"),
                a = Q.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), t.getComputedStyle && Z.extend(Y, {
                pixelPosition: function () {
                    return e(), n
                },
                boxSizingReliable: function () {
                    return null == r && e(), r
                },
                reliableMarginRight: function () {
                    var e, n = a.appendChild(Q.createElement("div"));
                    return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", i.appendChild(o), e = !parseFloat(t.getComputedStyle(n, null).marginRight), i.removeChild(o), a.removeChild(n), e
                }
            }))
        }(), Z.swap = function (t, e, n, r) {
            var i, o, a = {};
            for (o in e) a[o] = t.style[o], t.style[o] = e[o];
            i = n.apply(t, r || []);
            for (o in e) t.style[o] = a[o];
            return i
        };
        var Bt = /^(none|table(?!-c[ea]).+)/,
            zt = new RegExp("^(" + xt + ")(.*)$", "i"),
            Vt = new RegExp("^([+-])=(" + xt + ")", "i"),
            Xt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Jt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Gt = ["Webkit", "O", "Moz", "ms"];
        Z.extend({
            cssHooks: {
                opacity: {
                    get: function (t, e) {
                        if (e) {
                            var n = x(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function (t, e, n, r) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var i, o, a, s = Z.camelCase(e),
                        l = t.style;
                    return e = Z.cssProps[s] || (Z.cssProps[s] = T(l, s)), a = Z.cssHooks[e] || Z.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(t, !1, r)) ? i : l[e] : (o = typeof n, "string" === o && (i = Vt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Z.css(t, e)), o = "number"), void(null != n && n === n && ("number" !== o || Z.cssNumber[s] || (n += "px"), Y.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, r)) || (l[e] = n))))
                }
            },
            css: function (t, e, n, r) {
                var i, o, a, s = Z.camelCase(e);
                return e = Z.cssProps[s] || (Z.cssProps[s] = T(t.style, s)), a = Z.cssHooks[e] || Z.cssHooks[s], a && "get" in a && (i = a.get(t, !0, n)), void 0 === i && (i = x(t, e, r)), "normal" === i && e in Jt && (i = Jt[e]), "" === n || n ? (o = parseFloat(i), n === !0 || Z.isNumeric(o) ? o || 0 : i) : i
            }
        }), Z.each(["height", "width"], function (t, e) {
            Z.cssHooks[e] = {
                get: function (t, n, r) {
                    return n ? Bt.test(Z.css(t, "display")) && 0 === t.offsetWidth ? Z.swap(t, Xt, function () {
                        return _(t, e, r)
                    }) : _(t, e, r) : void 0
                },
                set: function (t, n, r) {
                    var i = r && Wt(t);
                    return C(t, n, r ? D(t, e, r, "border-box" === Z.css(t, "boxSizing", !1, i), i) : 0)
                }
            }
        }), Z.cssHooks.marginRight = S(Y.reliableMarginRight, function (t, e) {
            return e ? Z.swap(t, {
                display: "inline-block"
            }, x, [t, "marginRight"]) : void 0
        }), Z.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (t, e) {
            Z.cssHooks[t + e] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[t + St[r] + e] = o[r] || o[r - 2] || o[0];
                    return i
                }
            }, Mt.test(t) || (Z.cssHooks[t + e].set = C)
        }), Z.fn.extend({
            css: function (t, e) {
                return vt(this, function (t, e, n) {
                    var r, i, o = {},
                        a = 0;
                    if (Z.isArray(e)) {
                        for (r = Wt(t), i = e.length; i > a; a++) o[e[a]] = Z.css(t, e[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? Z.style(t, e, n) : Z.css(t, e)
                }, t, e, arguments.length > 1)
            },
            show: function () {
                return A(this, !0)
            },
            hide: function () {
                return A(this)
            },
            toggle: function (t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                    Tt(this) ? Z(this).show() : Z(this).hide()
                })
            }
        }), Z.Tween = $, $.prototype = {
            constructor: $,
            init: function (t, e, n, r, i, o) {
                this.elem = t, this.prop = n, this.easing = i || "swing", this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Z.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var t = $.propHooks[this.prop];
                return t && t.get ? t.get(this) : $.propHooks._default.get(this)
            },
            run: function (t) {
                var e, n = $.propHooks[this.prop];
                return this.pos = e = this.options.duration ? Z.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : $.propHooks._default.set(this), this
            }
        }, $.prototype.init.prototype = $.prototype, $.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = Z.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function (t) {
                    Z.fx.step[t.prop] ? Z.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[Z.cssProps[t.prop]] || Z.cssHooks[t.prop]) ? Z.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
            set: function (t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, Z.easing = {
            linear: function (t) {
                return t
            },
            swing: function (t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, Z.fx = $.prototype.init, Z.fx.step = {};
        var Yt, Qt, Kt = /^(?:toggle|show|hide)$/,
            Zt = new RegExp("^(?:([+-])=|)(" + xt + ")([a-z%]*)$", "i"),
            te = /queueHooks$/,
            ee = [j],
            ne = {
                "*": [function (t, e) {
                    var n = this.createTween(t, e),
                        r = n.cur(),
                        i = Zt.exec(e),
                        o = i && i[3] || (Z.cssNumber[t] ? "" : "px"),
                        a = (Z.cssNumber[t] || "px" !== o && +r) && Zt.exec(Z.css(n.elem, t)),
                        s = 1,
                        l = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], i = i || [], a = +r || 1;
                        do s = s || ".5", a /= s, Z.style(n.elem, t, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l)
                    }
                    return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
                }]
            };
        Z.Animation = Z.extend(O, {
                tweener: function (t, e) {
                    Z.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                    for (var n, r = 0, i = t.length; i > r; r++) n = t[r], ne[n] = ne[n] || [], ne[n].unshift(e)
                },
                prefilter: function (t, e) {
                    e ? ee.unshift(t) : ee.push(t)
                }
            }), Z.speed = function (t, e, n) {
                var r = t && "object" == typeof t ? Z.extend({}, t) : {
                    complete: n || !n && e || Z.isFunction(t) && t,
                    duration: t,
                    easing: n && e || e && !Z.isFunction(e) && e
                };
                return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                    Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue)
                }, r
            }, Z.fn.extend({
                fadeTo: function (t, e, n, r) {
                    return this.filter(Tt).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, n, r)
                },
                animate: function (t, e, n, r) {
                    var i = Z.isEmptyObject(t),
                        o = Z.speed(e, n, r),
                        a = function () {
                            var e = O(this, Z.extend({}, t), o);
                            (i || mt.get(this, "finish")) && e.stop(!0)
                        };
                    return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function (t, e, n) {
                    var r = function (t) {
                        var e = t.stop;
                        delete t.stop, e(n)
                    };
                    return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                        var e = !0,
                            i = null != t && t + "queueHooks",
                            o = Z.timers,
                            a = mt.get(this);
                        if (i) a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a) a[i] && a[i].stop && te.test(i) && r(a[i]);
                        for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = !1, o.splice(i, 1));
                        (e || !n) && Z.dequeue(this, t)
                    })
                },
                finish: function (t) {
                    return t !== !1 && (t = t || "fx"), this.each(function () {
                        var e, n = mt.get(this),
                            r = n[t + "queue"],
                            i = n[t + "queueHooks"],
                            o = Z.timers,
                            a = r ? r.length : 0;
                        for (n.finish = !0, Z.queue(this, t, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; a > e; e++) r[e] && r[e].finish && r[e].finish.call(this);
                        delete n.finish
                    })
                }
            }), Z.each(["toggle", "show", "hide"], function (t, e) {
                var n = Z.fn[e];
                Z.fn[e] = function (t, r, i) {
                    return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(I(e, !0), t, r, i)
                }
            }), Z.each({
                slideDown: I("show"),
                slideUp: I("hide"),
                slideToggle: I("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function (t, e) {
                Z.fn[t] = function (t, n, r) {
                    return this.animate(e, t, n, r)
                }
            }), Z.timers = [], Z.fx.tick = function () {
                var t, e = 0,
                    n = Z.timers;
                for (Yt = Z.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
                n.length || Z.fx.stop(), Yt = void 0
            }, Z.fx.timer = function (t) {
                Z.timers.push(t), t() ? Z.fx.start() : Z.timers.pop()
            }, Z.fx.interval = 13, Z.fx.start = function () {
                Qt || (Qt = setInterval(Z.fx.tick, Z.fx.interval))
            }, Z.fx.stop = function () {
                clearInterval(Qt), Qt = null
            }, Z.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, Z.fn.delay = function (t, e) {
                return t = Z.fx ? Z.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function (e, n) {
                    var r = setTimeout(e, t);
                    n.stop = function () {
                        clearTimeout(r)
                    }
                })
            },
            function () {
                var t = Q.createElement("input"),
                    e = Q.createElement("select"),
                    n = e.appendChild(Q.createElement("option"));
                t.type = "checkbox", Y.checkOn = "" !== t.value, Y.optSelected = n.selected, e.disabled = !0, Y.optDisabled = !n.disabled, t = Q.createElement("input"), t.value = "t", t.type = "radio", Y.radioValue = "t" === t.value
            }();
        var re, ie, oe = Z.expr.attrHandle;
        Z.fn.extend({
            attr: function (t, e) {
                return vt(this, Z.attr, t, e, arguments.length > 1)
            },
            removeAttr: function (t) {
                return this.each(function () {
                    Z.removeAttr(this, t)
                })
            }
        }), Z.extend({
            attr: function (t, e, n) {
                var r, i, o = t.nodeType;
                if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === Dt ? Z.prop(t, e, n) : (1 === o && Z.isXMLDoc(t) || (e = e.toLowerCase(), r = Z.attrHooks[e] || (Z.expr.match.bool.test(e) ? ie : re)), void 0 === n ? r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = Z.find.attr(t, e), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : void Z.removeAttr(t, e))
            },
            removeAttr: function (t, e) {
                var n, r, i = 0,
                    o = e && e.match(pt);
                if (o && 1 === t.nodeType)
                    for (; n = o[i++];) r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (t[r] = !1), t.removeAttribute(n)
            },
            attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!Y.radioValue && "radio" === e && Z.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            }
        }), ie = {
            set: function (t, e, n) {
                return e === !1 ? Z.removeAttr(t, n) : t.setAttribute(n, n), n
            }
        }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = oe[e] || Z.find.attr;
            oe[e] = function (t, e, r) {
                var i, o;
                return r || (o = oe[e], oe[e] = i, i = null != n(t, e, r) ? e.toLowerCase() : null, oe[e] = o), i
            }
        });
        var ae = /^(?:input|select|textarea|button)$/i;
        Z.fn.extend({
            prop: function (t, e) {
                return vt(this, Z.prop, t, e, arguments.length > 1)
            },
            removeProp: function (t) {
                return this.each(function () {
                    delete this[Z.propFix[t] || t]
                })
            }
        }), Z.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function (t, e, n) {
                var r, i, o, a = t.nodeType;
                if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !Z.isXMLDoc(t), o && (e = Z.propFix[e] || e, i = Z.propHooks[e]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function (t) {
                        return t.hasAttribute("tabindex") || ae.test(t.nodeName) || t.href ? t.tabIndex : -1
                    }
                }
            }
        }), Y.optSelected || (Z.propHooks.selected = {
            get: function (t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            }
        }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            Z.propFix[this.toLowerCase()] = this
        });
        var se = /[\t\r\n\f]/g;
        Z.fn.extend({
            addClass: function (t) {
                var e, n, r, i, o, a, s = "string" == typeof t && t,
                    l = 0,
                    u = this.length;
                if (Z.isFunction(t)) return this.each(function (e) {
                    Z(this).addClass(t.call(this, e, this.className))
                });
                if (s)
                    for (e = (t || "").match(pt) || []; u > l; l++)
                        if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(se, " ") : " ")) {
                            for (o = 0; i = e[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            a = Z.trim(r), n.className !== a && (n.className = a)
                        } return this
            },
            removeClass: function (t) {
                var e, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof t && t,
                    l = 0,
                    u = this.length;
                if (Z.isFunction(t)) return this.each(function (e) {
                    Z(this).removeClass(t.call(this, e, this.className))
                });
                if (s)
                    for (e = (t || "").match(pt) || []; u > l; l++)
                        if (n = this[l], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(se, " ") : "")) {
                            for (o = 0; i = e[o++];)
                                for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                            a = t ? Z.trim(r) : "", n.className !== a && (n.className = a)
                        } return this
            },
            toggleClass: function (t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : this.each(Z.isFunction(t) ? function (n) {
                    Z(this).toggleClass(t.call(this, n, this.className, e), e)
                } : function () {
                    if ("string" === n)
                        for (var e, r = 0, i = Z(this), o = t.match(pt) || []; e = o[r++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                    else(n === Dt || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : mt.get(this, "__className__") || "")
                })
            },
            hasClass: function (t) {
                for (var e = " " + t + " ", n = 0, r = this.length; r > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(se, " ").indexOf(e) >= 0) return !0;
                return !1
            }
        });
        var le = /\r/g;
        Z.fn.extend({
            val: function (t) {
                var e, n, r, i = this[0];
                return arguments.length ? (r = Z.isFunction(t), this.each(function (n) {
                    var i;
                    1 === this.nodeType && (i = r ? t.call(this, n, Z(this).val()) : t, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function (t) {
                        return null == t ? "" : t + ""
                    })), e = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, i, "value") || (this.value = i))
                })) : i ? (e = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(le, "") : null == n ? "" : n)) : void 0
            }
        }), Z.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = Z.find.attr(t, "value");
                        return null != e ? e : Z.trim(Z.text(t))
                    }
                },
                select: {
                    get: function (t) {
                        for (var e, n, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; s > l; l++)
                            if (n = r[l], !(!n.selected && l !== i || (Y.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                                if (e = Z(n).val(), o) return e;
                                a.push(e)
                            } return a
                    },
                    set: function (t, e) {
                        for (var n, r, i = t.options, o = Z.makeArray(e), a = i.length; a--;) r = i[a], (r.selected = Z.inArray(r.value, o) >= 0) && (n = !0);
                        return n || (t.selectedIndex = -1), o
                    }
                }
            }
        }), Z.each(["radio", "checkbox"], function () {
            Z.valHooks[this] = {
                set: function (t, e) {
                    return Z.isArray(e) ? t.checked = Z.inArray(Z(t).val(), e) >= 0 : void 0
                }
            }, Y.checkOn || (Z.valHooks[this].get = function (t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
            Z.fn[e] = function (t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), Z.fn.extend({
            hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function (t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function (t, e) {
                return this.off(t, null, e)
            },
            delegate: function (t, e, n, r) {
                return this.on(e, t, n, r)
            },
            undelegate: function (t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            }
        });
        var ue = Z.now(),
            ce = /\?/;
        Z.parseJSON = function (t) {
            return JSON.parse(t + "")
        }, Z.parseXML = function (t) {
            var e, n;
            if (!t || "string" != typeof t) return null;
            try {
                n = new DOMParser, e = n.parseFromString(t, "text/xml")
            } catch (r) {
                e = void 0
            }
            return (!e || e.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + t), e
        };
        var de = /#.*$/,
            fe = /([?&])_=[^&]*/,
            pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            he = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            ge = /^(?:GET|HEAD)$/,
            ve = /^\/\//,
            me = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            ye = {},
            be = {},
            we = "*/".concat("*"),
            xe = t.location.href,
            Se = me.exec(xe.toLowerCase()) || [];
        Z.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: xe,
                type: "GET",
                isLocal: he.test(Se[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": we,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": Z.parseJSON,
                    "text xml": Z.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (t, e) {
                return e ? P(P(t, Z.ajaxSettings), e) : P(Z.ajaxSettings, t)
            },
            ajaxPrefilter: L(ye),
            ajaxTransport: L(be),
            ajax: function (t, e) {
                function n(t, e, n, a) {
                    var l, c, m, y, w, S = e;
                    2 !== b && (b = 2, s && clearTimeout(s), r = void 0, o = a || "", x.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, n && (y = F(d, x, n)), y = H(d, y, x, l), l ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (Z.lastModified[i] = w), w = x.getResponseHeader("etag"), w && (Z.etag[i] = w)), 204 === t || "HEAD" === d.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = y.state, c = y.data, m = y.error, l = !m)) : (m = S, (t || !S) && (S = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (e || S) + "", l ? h.resolveWith(f, [c, S, x]) : h.rejectWith(f, [x, S, m]), x.statusCode(v), v = void 0, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [x, d, l ? c : m]), g.fireWith(f, [x, S]), u && (p.trigger("ajaxComplete", [x, d]), --Z.active || Z.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var r, i, o, a, s, l, u, c, d = Z.ajaxSetup({}, e),
                    f = d.context || d,
                    p = d.context && (f.nodeType || f.jquery) ? Z(f) : Z.event,
                    h = Z.Deferred(),
                    g = Z.Callbacks("once memory"),
                    v = d.statusCode || {},
                    m = {},
                    y = {},
                    b = 0,
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function (t) {
                            var e;
                            if (2 === b) {
                                if (!a)
                                    for (a = {}; e = pe.exec(o);) a[e[1].toLowerCase()] = e[2];
                                e = a[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function () {
                            return 2 === b ? o : null
                        },
                        setRequestHeader: function (t, e) {
                            var n = t.toLowerCase();
                            return b || (t = y[n] = y[n] || t, m[t] = e), this
                        },
                        overrideMimeType: function (t) {
                            return b || (d.mimeType = t), this
                        },
                        statusCode: function (t) {
                            var e;
                            if (t)
                                if (2 > b)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else x.always(t[x.status]);
                            return this
                        },
                        abort: function (t) {
                            var e = t || w;
                            return r && r.abort(e), n(0, e), this
                        }
                    };
                if (h.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((t || d.url || xe) + "").replace(de, "").replace(ve, Se[1] + "//"), d.type = e.method || e.type || d.method || d.type, d.dataTypes = Z.trim(d.dataType || "*").toLowerCase().match(pt) || [""], null == d.crossDomain && (l = me.exec(d.url.toLowerCase()), d.crossDomain = !(!l || l[1] === Se[1] && l[2] === Se[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (Se[3] || ("http:" === Se[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = Z.param(d.data, d.traditional)), R(ye, d, e, x), 2 === b) return x;
                u = Z.event && d.global, u && 0 === Z.active++ && Z.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !ge.test(d.type), i = d.url, d.hasContent || (d.data && (i = d.url += (ce.test(i) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = fe.test(i) ? i.replace(fe, "$1_=" + ue++) : i + (ce.test(i) ? "&" : "?") + "_=" + ue++)), d.ifModified && (Z.lastModified[i] && x.setRequestHeader("If-Modified-Since", Z.lastModified[i]), Z.etag[i] && x.setRequestHeader("If-None-Match", Z.etag[i])), (d.data && d.hasContent && d.contentType !== !1 || e.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + we + "; q=0.01" : "") : d.accepts["*"]);
                for (c in d.headers) x.setRequestHeader(c, d.headers[c]);
                if (d.beforeSend && (d.beforeSend.call(f, x, d) === !1 || 2 === b)) return x.abort();
                w = "abort";
                for (c in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[c](d[c]);
                if (r = R(be, d, e, x)) {
                    x.readyState = 1, u && p.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                        x.abort("timeout")
                    }, d.timeout));
                    try {
                        b = 1, r.send(m, n)
                    } catch (S) {
                        if (!(2 > b)) throw S;
                        n(-1, S)
                    }
                } else n(-1, "No Transport");
                return x
            },
            getJSON: function (t, e, n) {
                return Z.get(t, e, n, "json")
            },
            getScript: function (t, e) {
                return Z.get(t, void 0, e, "script")
            }
        }), Z.each(["get", "post"], function (t, e) {
            Z[e] = function (t, n, r, i) {
                return Z.isFunction(n) && (i = i || r, r = n, n = void 0), Z.ajax({
                    url: t,
                    type: e,
                    dataType: i,
                    data: n,
                    success: r
                })
            }
        }), Z._evalUrl = function (t) {
            return Z.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, Z.fn.extend({
            wrapAll: function (t) {
                var e;
                return Z.isFunction(t) ? this.each(function (e) {
                    Z(this).wrapAll(t.call(this, e))
                }) : (this[0] && (e = Z(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this)
            },
            wrapInner: function (t) {
                return this.each(Z.isFunction(t) ? function (e) {
                    Z(this).wrapInner(t.call(this, e))
                } : function () {
                    var e = Z(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function (t) {
                var e = Z.isFunction(t);
                return this.each(function (n) {
                    Z(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
                }).end()
            }
        }), Z.expr.filters.hidden = function (t) {
            return t.offsetWidth <= 0 && t.offsetHeight <= 0
        }, Z.expr.filters.visible = function (t) {
            return !Z.expr.filters.hidden(t)
        };
        var Te = /%20/g,
            Ce = /\[\]$/,
            De = /\r?\n/g,
            _e = /^(?:submit|button|image|reset|file)$/i,
            Ae = /^(?:input|select|textarea|keygen)/i;
        Z.param = function (t, e) {
            var n, r = [],
                i = function (t, e) {
                    e = Z.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (void 0 === e && (e = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(t) || t.jquery && !Z.isPlainObject(t)) Z.each(t, function () {
                i(this.name, this.value)
            });
            else
                for (n in t) q(n, t[n], e, i);
            return r.join("&").replace(Te, "+")
        }, Z.fn.extend({
            serialize: function () {
                return Z.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map(function () {
                    var t = Z.prop(this, "elements");
                    return t ? Z.makeArray(t) : this
                }).filter(function () {
                    var t = this.type;
                    return this.name && !Z(this).is(":disabled") && Ae.test(this.nodeName) && !_e.test(t) && (this.checked || !Ct.test(t))
                }).map(function (t, e) {
                    var n = Z(this).val();
                    return null == n ? null : Z.isArray(n) ? Z.map(n, function (t) {
                        return {
                            name: e.name,
                            value: t.replace(De, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(De, "\r\n")
                    }
                }).get()
            }
        }), Z.ajaxSettings.xhr = function () {
            try {
                return new XMLHttpRequest
            } catch (t) {}
        };
        var $e = 0,
            Ee = {},
            Ie = {
                0: 200,
                1223: 204
            },
            ke = Z.ajaxSettings.xhr();
        t.attachEvent && t.attachEvent("onunload", function () {
            for (var t in Ee) Ee[t]()
        }), Y.cors = !!ke && "withCredentials" in ke, Y.ajax = ke = !!ke, Z.ajaxTransport(function (t) {
            var e;
            return Y.cors || ke && !t.crossDomain ? {
                send: function (n, r) {
                    var i, o = t.xhr(),
                        a = ++$e;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (i in t.xhrFields) o[i] = t.xhrFields[i];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) o.setRequestHeader(i, n[i]);
                    e = function (t) {
                        return function () {
                            e && (delete Ee[a], e = o.onload = o.onerror = null, "abort" === t ? o.abort() : "error" === t ? r(o.status, o.statusText) : r(Ie[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                                text: o.responseText
                            } : void 0, o.getAllResponseHeaders()))
                        }
                    }, o.onload = e(), o.onerror = e("error"), e = Ee[a] = e("abort");
                    try {
                        o.send(t.hasContent && t.data || null)
                    } catch (s) {
                        if (e) throw s
                    }
                },
                abort: function () {
                    e && e()
                }
            } : void 0
        }), Z.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (t) {
                    return Z.globalEval(t), t
                }
            }
        }), Z.ajaxPrefilter("script", function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), Z.ajaxTransport("script", function (t) {
            if (t.crossDomain) {
                var e, n;
                return {
                    send: function (r, i) {
                        e = Z("<script>").prop({
                            async: !0,
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", n = function (t) {
                            e.remove(), n = null, t && i("error" === t.type ? 404 : 200, t.type)
                        }), Q.head.appendChild(e[0])
                    },
                    abort: function () {
                        n && n()
                    }
                }
            }
        });
        var je = [],
            Ne = /(=)\?(?=&|$)|\?\?/;
        Z.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var t = je.pop() || Z.expando + "_" + ue++;
                return this[t] = !0, t
            }
        }), Z.ajaxPrefilter("json jsonp", function (e, n, r) {
            var i, o, a, s = e.jsonp !== !1 && (Ne.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ne.test(e.data) && "data");
            return s || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = Z.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Ne, "$1" + i) : e.jsonp !== !1 && (e.url += (ce.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
                return a || Z.error(i + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = t[i], t[i] = function () {
                a = arguments
            }, r.always(function () {
                t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, je.push(i)), a && Z.isFunction(o) && o(a[0]), a = o = void 0
            }), "script") : void 0
        }), Z.parseHTML = function (t, e, n) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (n = e, e = !1), e = e || Q;
            var r = at.exec(t),
                i = !n && [];
            return r ? [e.createElement(r[1])] : (r = Z.buildFragment([t], e, i), i && i.length && Z(i).remove(), Z.merge([], r.childNodes))
        };
        var Oe = Z.fn.load;
        Z.fn.load = function (t, e, n) {
            if ("string" != typeof t && Oe) return Oe.apply(this, arguments);
            var r, i, o, a = this,
                s = t.indexOf(" ");
            return s >= 0 && (r = Z.trim(t.slice(s)), t = t.slice(0, s)), Z.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (i = "POST"), a.length > 0 && Z.ajax({
                url: t,
                type: i,
                dataType: "html",
                data: e
            }).done(function (t) {
                o = arguments, a.html(r ? Z("<div>").append(Z.parseHTML(t)).find(r) : t)
            }).complete(n && function (t, e) {
                a.each(n, o || [t.responseText, e, t])
            }), this
        }, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
            Z.fn[e] = function (t) {
                return this.on(e, t)
            }
        }), Z.expr.filters.animated = function (t) {
            return Z.grep(Z.timers, function (e) {
                return t === e.elem
            }).length
        };
        var Le = t.document.documentElement;
        Z.offset = {
            setOffset: function (t, e, n) {
                var r, i, o, a, s, l, u, c = Z.css(t, "position"),
                    d = Z(t),
                    f = {};
                "static" === c && (t.style.position = "relative"), s = d.offset(), o = Z.css(t, "top"), l = Z.css(t, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), Z.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (f.top = e.top - s.top + a), null != e.left && (f.left = e.left - s.left + i), "using" in e ? e.using.call(t, f) : d.css(f)
            }
        }, Z.fn.extend({
            offset: function (t) {
                if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                    Z.offset.setOffset(this, t, e)
                });
                var e, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    },
                    o = r && r.ownerDocument;
                return o ? (e = o.documentElement, Z.contains(e, r) ? (typeof r.getBoundingClientRect !== Dt && (i = r.getBoundingClientRect()), n = M(o), {
                    top: i.top + n.pageYOffset - e.clientTop,
                    left: i.left + n.pageXOffset - e.clientLeft
                }) : i) : void 0
            },
            position: function () {
                if (this[0]) {
                    var t, e, n = this[0],
                        r = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === Z.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), Z.nodeName(t[0], "html") || (r = t.offset()), r.top += Z.css(t[0], "borderTopWidth", !0), r.left += Z.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - r.top - Z.css(n, "marginTop", !0),
                        left: e.left - r.left - Z.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || Le; t && !Z.nodeName(t, "html") && "static" === Z.css(t, "position");) t = t.offsetParent;
                    return t || Le
                })
            }
        }), Z.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (e, n) {
            var r = "pageYOffset" === n;
            Z.fn[e] = function (i) {
                return vt(this, function (e, i, o) {
                    var a = M(e);
                    return void 0 === o ? a ? a[n] : e[i] : void(a ? a.scrollTo(r ? t.pageXOffset : o, r ? o : t.pageYOffset) : e[i] = o)
                }, e, i, arguments.length, null)
            }
        }), Z.each(["top", "left"], function (t, e) {
            Z.cssHooks[e] = S(Y.pixelPosition, function (t, n) {
                return n ? (n = x(t, e), Ut.test(n) ? Z(t).position()[e] + "px" : n) : void 0
            })
        }), Z.each({
            Height: "height",
            Width: "width"
        }, function (t, e) {
            Z.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function (n, r) {
                Z.fn[r] = function (r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r),
                        a = n || (r === !0 || i === !0 ? "margin" : "border");
                    return vt(this, function (e, n, r) {
                        var i;
                        return Z.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === r ? Z.css(e, n, a) : Z.style(e, n, r, a)
                    }, e, o ? r : void 0, o, null)
                }
            })
        }), Z.fn.size = function () {
            return this.length
        }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return Z
        });
        var Re = t.jQuery,
            Pe = t.$;
        return Z.noConflict = function (e) {
            return t.$ === Z && (t.$ = Pe), e && t.jQuery === Z && (t.jQuery = Re), Z
        }, typeof e === Dt && (t.jQuery = t.$ = Z), Z
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in e)
            if (void 0 !== t.style[n]) return {
                end: e[n]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function (e) {
        var n = !1,
            r = this;
        t(this).one("bsTransitionEnd", function () {
            n = !0
        });
        var i = function () {
            n || t(r).trigger(t.support.transition.end)
        };
        return setTimeout(i, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this),
                i = n.data("bs.alert");
            i || n.data("bs.alert", i = new r(this)), "string" == typeof e && i[e].call(n)
        })
    }
    var n = '[data-dismiss="alert"]',
        r = function (e) {
            t(e).on("click", n, this.close)
        };
    r.VERSION = "3.3.4", r.TRANSITION_DURATION = 150, r.prototype.close = function (e) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var i = t(this),
            o = i.attr("data-target");
        o || (o = i.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(), a.length || (a = i.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(r.TRANSITION_DURATION) : n())
    };
    var i = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = r, t.fn.alert.noConflict = function () {
        return t.fn.alert = i, this
    }, t(document).on("click.bs.alert.data-api", n, r.prototype.close)
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.button"),
                o = "object" == typeof e && e;
            i || r.data("bs.button", i = new n(this, o)), "toggle" == e ? i.toggle() : e && i.setState(e)
        })
    }
    var n = function (e, r) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, r), this.isLoading = !1
    };
    n.VERSION = "3.3.4", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function (e) {
        var n = "disabled",
            r = this.$element,
            i = r.is("input") ? "val" : "html",
            o = r.data();
        e += "Text", null == o.resetText && r.data("resetText", r[i]()), setTimeout(t.proxy(function () {
            r[i](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, r.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, r.removeClass(n).removeAttr(n))
        }, this), 0)
    }, n.prototype.toggle = function () {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var r = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function () {
        return t.fn.button = r, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (n) {
        var r = t(n.target);
        r.hasClass("btn") || (r = r.closest(".btn")), e.call(r, "toggle"), n.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.carousel"),
                o = t.extend({}, n.DEFAULTS, r.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            i || r.data("bs.carousel", i = new n(this, o)), "number" == typeof e ? i.to(e) : a ? i[a]() : o.interval && i.pause().cycle()
        })
    }
    var n = function (e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function (t, e) {
        var n = this.getItemIndex(e),
            r = "prev" == t && 0 === n || "next" == t && n == this.$items.length - 1;
        if (r && !this.options.wrap) return e;
        var i = "prev" == t ? -1 : 1,
            o = (n + i) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function (t) {
        var e = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, n.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, n.prototype.slide = function (e, r) {
        var i = this.$element.find(".item.active"),
            o = r || this.getItemForDirection(e, i),
            a = this.interval,
            s = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var u = o[0],
            c = t.Event("slide.bs.carousel", {
                relatedTarget: u,
                direction: s
            });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(o)]);
                d && d.addClass("active")
            }
            var f = t.Event("slid.bs.carousel", {
                relatedTarget: u,
                direction: s
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, i.addClass(s), o.addClass(s), i.one("bsTransitionEnd", function () {
                o.removeClass([e, s].join(" ")).addClass("active"), i.removeClass(["active", s].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(f)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (i.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(f)), a && this.cycle(), this
        }
    };
    var r = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = r, this
    };
    var i = function (n) {
        var r, i = t(this),
            o = t(i.attr("data-target") || (r = i.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), i.data()),
                s = i.attr("data-slide-to");
            s && (a.interval = !1), e.call(o, a), s && o.data("bs.carousel").to(s), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", i).on("click.bs.carousel.data-api", "[data-slide-to]", i), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        var n, r = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(r)
    }

    function n(e) {
        return this.each(function () {
            var n = t(this),
                i = n.data("bs.collapse"),
                o = t.extend({}, r.DEFAULTS, n.data(), "object" == typeof e && e);
            !i && o.toggle && /show|hide/.test(e) && (o.toggle = !1), i || n.data("bs.collapse", i = new r(this, o)), "string" == typeof e && i[e]()
        })
    }
    var r = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, r.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    r.VERSION = "3.3.4", r.TRANSITION_DURATION = 350, r.DEFAULTS = {
        toggle: !0
    }, r.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, r.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(i && i.length && (e = i.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    i && i.length && (n.call(i, "hide"), e || i.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return s.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, r.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var i = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION) : i.call(this)
            }
        }
    }, r.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, r.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (n, r) {
            var i = t(r);
            this.addAriaAndCollapsedClass(e(i), i)
        }, this)).end()
    }, r.prototype.addAriaAndCollapsedClass = function (t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var i = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = r, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (r) {
        var i = t(this);
        i.attr("data-target") || r.preventDefault();
        var o = e(i),
            a = o.data("bs.collapse"),
            s = a ? "toggle" : i.data();
        n.call(o, s)
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(i).remove(), t(o).each(function () {
            var r = t(this),
                i = n(r),
                o = {
                    relatedTarget: this
                };
            i.hasClass("open") && (i.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (r.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function n(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && t(n);
        return r && r.length ? r : e.parent()
    }

    function r(e) {
        return this.each(function () {
            var n = t(this),
                r = n.data("bs.dropdown");
            r || n.data("bs.dropdown", r = new a(this)), "string" == typeof e && r[e].call(n)
        })
    }
    var i = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        a = function (e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.4", a.prototype.toggle = function (r) {
        var i = t(this);
        if (!i.is(".disabled, :disabled")) {
            var o = n(i),
                a = o.hasClass("open");
            if (e(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var s = {
                    relatedTarget: this
                };
                if (o.trigger(r = t.Event("show.bs.dropdown", s)), r.isDefaultPrevented()) return;
                i.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", s)
            }
            return !1
        }
    }, a.prototype.keydown = function (e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var r = t(this);
            if (e.preventDefault(), e.stopPropagation(), !r.is(".disabled, :disabled")) {
                var i = n(r),
                    a = i.hasClass("open");
                if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && i.find(o).trigger("focus"), r.trigger("click");
                var s = " li:not(.disabled):visible a",
                    l = i.find('[role="menu"]' + s + ', [role="listbox"]' + s);
                if (l.length) {
                    var u = l.index(e.target);
                    38 == e.which && u > 0 && u--, 40 == e.which && u < l.length - 1 && u++, ~u || (u = 0), l.eq(u).trigger("focus")
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = r, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', a.prototype.keydown)
}(jQuery), + function (t) {
    "use strict";

    function e(e, r) {
        return this.each(function () {
            var i = t(this),
                o = i.data("bs.modal"),
                a = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            o || i.data("bs.modal", o = new n(this, a)), "string" == typeof e ? o[e](r) : a.show && o.show(r)
        })
    }
    var n = function (e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function (e) {
        var r = this,
            i = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            r.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(r.$element) && (r.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var i = t.support.transition && r.$element.hasClass("fade");
            r.$element.parent().length || r.$element.appendTo(r.$body), r.$element.show().scrollTop(0), r.adjustDialog(), i && r.$element[0].offsetWidth, r.$element.addClass("in").attr("aria-hidden", !1), r.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            i ? r.$dialog.one("bsTransitionEnd", function () {
                r.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(o)
        }))
    }, n.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function (e) {
        var r = this,
            i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && i;
            if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function () {
                r.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, n.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, n.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var r = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function () {
        return t.fn.modal = r, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (n) {
        var r = t(this),
            i = r.attr("href"),
            o = t(r.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(i) && i
            }, o.data(), r.data());
        r.is("a") && n.preventDefault(), o.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                r.is(":visible") && r.trigger("focus")
            })
        }), e.call(o, a, this)
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.tooltip"),
                o = "object" == typeof e && e;
            !i && /destroy|hide/.test(e) || (i || r.data("bs.tooltip", i = new n(this, o)), "string" == typeof e && i[e]())
        })
    }
    var n = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, n.prototype.init = function (e, n, r) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(r), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
            var a = i[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, n.prototype.getDelegateOptions = function () {
        var e = {},
            n = this.getDefaults();
        return this._options && t.each(this._options, function (t, r) {
            n[t] != r && (e[t] = r)
        }), e
    }, n.prototype.enter = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n && n.$tip && n.$tip.is(":visible") ? void(n.hoverState = "in") : (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function () {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.leave = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function () {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, n.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var r = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !r) return;
            var i = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                u = l.test(s);
            u && (s = s.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var c = this.getPosition(),
                d = o[0].offsetWidth,
                f = o[0].offsetHeight;
            if (u) {
                var p = s,
                    h = this.options.container ? t(this.options.container) : this.$element.parent(),
                    g = this.getPosition(h);
                s = "bottom" == s && c.bottom + f > g.bottom ? "top" : "top" == s && c.top - f < g.top ? "bottom" : "right" == s && c.right + d > g.width ? "left" : "left" == s && c.left - d < g.left ? "right" : s, o.removeClass(p).addClass(s)
            }
            var v = this.getCalculatedOffset(s, c, d, f);
            this.applyPlacement(v, s);
            var m = function () {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(n.TRANSITION_DURATION) : m()
        }
    }, n.prototype.applyPlacement = function (e, n) {
        var r = this.tip(),
            i = r[0].offsetWidth,
            o = r[0].offsetHeight,
            a = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, t.offset.setOffset(r[0], t.extend({
            using: function (t) {
                r.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), r.addClass("in");
        var l = r[0].offsetWidth,
            u = r[0].offsetHeight;
        "top" == n && u != o && (e.top = e.top + o - u);
        var c = this.getViewportAdjustedDelta(n, e, l, u);
        c.left ? e.left += c.left : e.top += c.top;
        var d = /top|bottom/.test(n),
            f = d ? 2 * c.left - i + l : 2 * c.top - o + u,
            p = d ? "offsetWidth" : "offsetHeight";
        r.offset(e), this.replaceArrow(f, r[0][p], d)
    }, n.prototype.replaceArrow = function (t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function (e) {
        function r() {
            "in" != i.hoverState && o.detach(), i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), e && e()
        }
        var i = this,
            o = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(a), !a.isDefaultPrevented()) return o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(), this.hoverState = null, this
    }, n.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function () {
        return this.getTitle()
    }, n.prototype.getPosition = function (e) {
        e = e || this.$element;
        var n = e[0],
            r = "BODY" == n.tagName,
            i = n.getBoundingClientRect();
        null == i.width && (i = t.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var o = r ? {
                top: 0,
                left: 0
            } : e.offset(),
            a = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            s = r ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, i, a, s, o)
    }, n.prototype.getCalculatedOffset = function (t, e, n, r) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - r,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - r / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - r / 2,
            left: e.left + e.width
        }
    }, n.prototype.getViewportAdjustedDelta = function (t, e, n, r) {
        var i = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return i;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var s = e.top - o - a.scroll,
                l = e.top + o - a.scroll + r;
            s < a.top ? i.top = a.top - s : l > a.top + a.height && (i.top = a.top + a.height - l)
        } else {
            var u = e.left - o,
                c = e.left + o + n;
            u < a.left ? i.left = a.left - u : c > a.width && (i.left = a.left + a.width - c)
        }
        return i
    }, n.prototype.getTitle = function () {
        var t, e = this.$element,
            n = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
    }, n.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, n.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function () {
        this.enabled = !0
    }, n.prototype.disable = function () {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function (e) {
        var n = this;
        e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var r = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = r, this
    }
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.popover"),
                o = "object" == typeof e && e;
            !i && /destroy|hide/.test(e) || (i || r.data("bs.popover", i = new n(this, o)), "string" == typeof e && i[e]())
        })
    }
    var n = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.4", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle(),
            n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function () {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var r = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function () {
        return t.fn.popover = r, this
    }
}(jQuery), + function (t) {
    "use strict";

    function e(n, r) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, r), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            i || r.data("bs.scrollspy", i = new e(this, o)), "string" == typeof n && i[n]()
        })
    }
    e.VERSION = "3.3.4", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this,
            n = "offset",
            r = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", r = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this),
                i = e.data("target") || e.attr("href"),
                o = /^#./.test(i) && t(i);
            return o && o.length && o.is(":visible") && [
                [o[n]().top + r, i]
            ] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            r = this.options.offset + n - this.$scrollElement.height(),
            i = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= r) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < i[0]) return this.activeTarget = null, this.clear();
        for (t = i.length; t--;) a != o[t] && e >= i[t] && (void 0 === i[t + 1] || e < i[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            r = t(n).parents("li").addClass("active");
        r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = r, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.tab");
            i || r.data("bs.tab", i = new n(this)), "string" == typeof e && i[e]()
        })
    }
    var n = function (e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 150, n.prototype.show = function () {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            r = e.data("target");
        if (r || (r = e.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var i = n.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: i[0]
                });
            if (i.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = t(r);
                this.activate(e.closest("li"), n), this.activate(s, s.parent(), function () {
                    i.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function (e, r, i) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), i && i()
        }
        var a = r.find("> .active"),
            s = i && t.support.transition && (a.length && a.hasClass("fade") || !!r.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var r = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function () {
        return t.fn.tab = r, this
    };
    var i = function (n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery), + function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var r = t(this),
                i = r.data("bs.affix"),
                o = "object" == typeof e && e;
            i || r.data("bs.affix", i = new n(this, o)), "string" == typeof e && i[e]()
        })
    }
    var n = function (e, r) {
        this.options = t.extend({}, n.DEFAULTS, r), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.4", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function (t, e, n, r) {
        var i = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != n && "top" == this.affixed) return i < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(i + this.unpin <= o.top) && "bottom" : !(i + a <= t - r) && "bottom";
        var s = null == this.affixed,
            l = s ? i : o.top,
            u = s ? a : e;
        return null != n && i <= n ? "top" : null != r && l + u >= t - r && "bottom"
    }, n.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                r = this.options.offset,
                i = r.top,
                o = r.bottom,
                a = t(document.body).height();
            "object" != typeof r && (o = i = r), "function" == typeof i && (i = r.top(this.$element)), "function" == typeof o && (o = r.bottom(this.$element));
            var s = this.getState(a, e, i, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (s ? "-" + s : ""),
                    u = t.Event(l + ".bs.affix");
                if (this.$element.trigger(u), u.isDefaultPrevented()) return;
                this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var r = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function () {
        return t.fn.affix = r, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var n = t(this),
                r = n.data();
            r.offset = r.offset || {}, null != r.offsetBottom && (r.offset.bottom = r.offsetBottom), null != r.offsetTop && (r.offset.top = r.offsetTop), e.call(n, r)
        })
    })
}(jQuery),
function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
    var e = function () {
            if (t && t.fn && t.fn.select2 && t.fn.select2.amd) var e = t.fn.select2.amd;
            var e;
            return function () {
                if (!e || !e.requirejs) {
                    e ? n = e : e = {};
                    var t, n, r;
                    ! function (e) {
                        function i(t, e) {
                            return w.call(t, e)
                        }

                        function o(t, e) {
                            var n, r, i, o, a, s, l, u, c, d, f, p = e && e.split("/"),
                                h = y.map,
                                g = h && h["*"] || {};
                            if (t && "." === t.charAt(0))
                                if (e) {
                                    for (p = p.slice(0, p.length - 1), t = t.split("/"), a = t.length - 1, y.nodeIdCompat && S.test(t[a]) && (t[a] = t[a].replace(S, "")), t = p.concat(t), c = 0; c < t.length; c += 1)
                                        if (f = t[c], "." === f) t.splice(c, 1), c -= 1;
                                        else if (".." === f) {
                                        if (1 === c && (".." === t[2] || ".." === t[0])) break;
                                        c > 0 && (t.splice(c - 1, 2), c -= 2)
                                    }
                                    t = t.join("/")
                                } else 0 === t.indexOf("./") && (t = t.substring(2));
                            if ((p || g) && h) {
                                for (n = t.split("/"), c = n.length; c > 0; c -= 1) {
                                    if (r = n.slice(0, c).join("/"), p)
                                        for (d = p.length; d > 0; d -= 1)
                                            if (i = h[p.slice(0, d).join("/")], i && (i = i[r])) {
                                                o = i, s = c;
                                                break
                                            } if (o) break;
                                    !l && g && g[r] && (l = g[r], u = c)
                                }!o && l && (o = l, s = u), o && (n.splice(0, s, o), t = n.join("/"))
                            }
                            return t
                        }

                        function a(t, n) {
                            return function () {
                                return p.apply(e, x.call(arguments, 0).concat([t, n]))
                            }
                        }

                        function s(t) {
                            return function (e) {
                                return o(e, t)
                            }
                        }

                        function l(t) {
                            return function (e) {
                                v[t] = e
                            }
                        }

                        function u(t) {
                            if (i(m, t)) {
                                var n = m[t];
                                delete m[t], b[t] = !0, f.apply(e, n)
                            }
                            if (!i(v, t) && !i(b, t)) throw new Error("No " + t);
                            return v[t]
                        }

                        function c(t) {
                            var e, n = t ? t.indexOf("!") : -1;
                            return n > -1 && (e = t.substring(0, n), t = t.substring(n + 1, t.length)), [e, t]
                        }

                        function d(t) {
                            return function () {
                                return y && y.config && y.config[t] || {}
                            }
                        }
                        var f, p, h, g, v = {},
                            m = {},
                            y = {},
                            b = {},
                            w = Object.prototype.hasOwnProperty,
                            x = [].slice,
                            S = /\.js$/;
                        h = function (t, e) {
                            var n, r = c(t),
                                i = r[0];
                            return t = r[1], i && (i = o(i, e), n = u(i)), i ? t = n && n.normalize ? n.normalize(t, s(e)) : o(t, e) : (t = o(t, e), r = c(t), i = r[0], t = r[1], i && (n = u(i))), {
                                f: i ? i + "!" + t : t,
                                n: t,
                                pr: i,
                                p: n
                            }
                        }, g = {
                            require: function (t) {
                                return a(t)
                            },
                            exports: function (t) {
                                var e = v[t];
                                return "undefined" != typeof e ? e : v[t] = {}
                            },
                            module: function (t) {
                                return {
                                    id: t,
                                    uri: "",
                                    exports: v[t],
                                    config: d(t)
                                }
                            }
                        }, f = function (t, n, r, o) {
                            var s, c, d, f, p, y, w = [],
                                x = typeof r;
                            if (o = o || t, "undefined" === x || "function" === x) {
                                for (n = !n.length && r.length ? ["require", "exports", "module"] : n, p = 0; p < n.length; p += 1)
                                    if (f = h(n[p], o), c = f.f, "require" === c) w[p] = g.require(t);
                                    else if ("exports" === c) w[p] = g.exports(t), y = !0;
                                else if ("module" === c) s = w[p] = g.module(t);
                                else if (i(v, c) || i(m, c) || i(b, c)) w[p] = u(c);
                                else {
                                    if (!f.p) throw new Error(t + " missing " + c);
                                    f.p.load(f.n, a(o, !0), l(c), {}), w[p] = v[c]
                                }
                                d = r ? r.apply(v[t], w) : void 0, t && (s && s.exports !== e && s.exports !== v[t] ? v[t] = s.exports : d === e && y || (v[t] = d))
                            } else t && (v[t] = r)
                        }, t = n = p = function (t, n, r, i, o) {
                            if ("string" == typeof t) return g[t] ? g[t](n) : u(h(t, n).f);
                            if (!t.splice) {
                                if (y = t, y.deps && p(y.deps, y.callback), !n) return;
                                n.splice ? (t = n, n = r, r = null) : t = e
                            }
                            return n = n || function () {}, "function" == typeof r && (r = i, i = o), i ? f(e, t, n, r) : setTimeout(function () {
                                f(e, t, n, r)
                            }, 4), p
                        }, p.config = function (t) {
                            return p(t)
                        }, t._defined = v, r = function (t, e, n) {
                            e.splice || (n = e, e = []), i(v, t) || i(m, t) || (m[t] = [t, e, n])
                        }, r.amd = {
                            jQuery: !0
                        }
                    }(), e.requirejs = t, e.require = n, e.define = r
                }
            }(), e.define("almond", function () {}), e.define("jquery", [], function () {
                var e = t || $;
                return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e
            }), e.define("select2/utils", ["jquery"], function (t) {
                function e(t) {
                    var e = t.prototype,
                        n = [];
                    for (var r in e) {
                        var i = e[r];
                        "function" == typeof i && "constructor" !== r && n.push(r)
                    }
                    return n
                }
                var n = {};
                n.Extend = function (t, e) {
                    function n() {
                        this.constructor = t
                    }
                    var r = {}.hasOwnProperty;
                    for (var i in e) r.call(e, i) && (t[i] = e[i]);
                    return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                }, n.Decorate = function (t, n) {
                    function r() {
                        var e = Array.prototype.unshift,
                            r = n.prototype.constructor.length,
                            i = t.prototype.constructor;
                        r > 0 && (e.call(arguments, t.prototype.constructor), i = n.prototype.constructor), i.apply(this, arguments)
                    }

                    function i() {
                        this.constructor = r
                    }
                    var o = e(n),
                        a = e(t);
                    n.displayName = t.displayName, r.prototype = new i;
                    for (var s = 0; s < a.length; s++) {
                        var l = a[s];
                        r.prototype[l] = t.prototype[l]
                    }
                    for (var u = (function (t) {
                            var e = function () {};
                            t in r.prototype && (e = r.prototype[t]);
                            var i = n.prototype[t];
                            return function () {
                                var t = Array.prototype.unshift;
                                return t.call(arguments, e), i.apply(this, arguments)
                            }
                        }), c = 0; c < o.length; c++) {
                        var d = o[c];
                        r.prototype[d] = u(d)
                    }
                    return r
                };
                var r = function () {
                    this.listeners = {}
                };
                return r.prototype.on = function (t, e) {
                    this.listeners = this.listeners || {}, t in this.listeners ? this.listeners[t].push(e) : this.listeners[t] = [e]
                }, r.prototype.trigger = function (t) {
                    var e = Array.prototype.slice;
                    this.listeners = this.listeners || {}, t in this.listeners && this.invoke(this.listeners[t], e.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                }, r.prototype.invoke = function (t, e) {
                    for (var n = 0, r = t.length; n < r; n++) t[n].apply(this, e)
                }, n.Observable = r, n.generateChars = function (t) {
                    for (var e = "", n = 0; n < t; n++) {
                        var r = Math.floor(36 * Math.random());
                        e += r.toString(36)
                    }
                    return e
                }, n.bind = function (t, e) {
                    return function () {
                        t.apply(e, arguments)
                    }
                }, n._convertData = function (t) {
                    for (var e in t) {
                        var n = e.split("-"),
                            r = t;
                        if (1 !== n.length) {
                            for (var i = 0; i < n.length; i++) {
                                var o = n[i];
                                o = o.substring(0, 1).toLowerCase() + o.substring(1), o in r || (r[o] = {}), i == n.length - 1 && (r[o] = t[e]), r = r[o]
                            }
                            delete t[e]
                        }
                    }
                    return t
                }, n.hasScroll = function (e, n) {
                    var r = t(n),
                        i = n.style.overflowX,
                        o = n.style.overflowY;
                    return (i !== o || "hidden" !== o && "visible" !== o) && ("scroll" === i || "scroll" === o || (r.innerHeight() < n.scrollHeight || r.innerWidth() < n.scrollWidth))
                }, n.escapeMarkup = function (t) {
                    var e = {
                        "\\": "&#92;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "/": "&#47;"
                    };
                    return "string" != typeof t ? t : String(t).replace(/[&<>"'\/\\]/g, function (t) {
                        return e[t]
                    })
                }, n.appendMany = function (e, n) {
                    if ("1.7" === t.fn.jquery.substr(0, 3)) {
                        var r = t();
                        t.map(n, function (t) {
                            r = r.add(t)
                        }), n = r
                    }
                    e.append(n)
                }, n
            }), e.define("select2/results", ["jquery", "./utils"], function (t, e) {
                function n(t, e, r) {
                    this.$element = t, this.data = r, this.options = e, n.__super__.constructor.call(this)
                }
                return e.Extend(n, e.Observable), n.prototype.render = function () {
                    var e = t('<ul class="select2-results__options" role="tree"></ul>');
                    return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e, e
                }, n.prototype.clear = function () {
                    this.$results.empty()
                }, n.prototype.displayMessage = function (e) {
                    var n = this.options.get("escapeMarkup");
                    this.clear(), this.hideLoading();
                    var r = t('<li role="treeitem" class="select2-results__option"></li>'),
                        i = this.options.get("translations").get(e.message);
                    r.append(n(i(e.args))), this.$results.append(r)
                }, n.prototype.append = function (t) {
                    this.hideLoading();
                    var e = [];
                    if (null == t.results || 0 === t.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", {
                        message: "noResults"
                    }));
                    t.results = this.sort(t.results);
                    for (var n = 0; n < t.results.length; n++) {
                        var r = t.results[n],
                            i = this.option(r);
                        e.push(i)
                    }
                    this.$results.append(e)
                }, n.prototype.position = function (t, e) {
                    var n = e.find(".select2-results");
                    n.append(t)
                }, n.prototype.sort = function (t) {
                    var e = this.options.get("sorter");
                    return e(t)
                }, n.prototype.setClasses = function () {
                    var e = this;
                    this.data.current(function (n) {
                        var r = t.map(n, function (t) {
                                return t.id.toString()
                            }),
                            i = e.$results.find(".select2-results__option[aria-selected]");
                        i.each(function () {
                            var e = t(this),
                                n = t.data(this, "data"),
                                i = "" + n.id;
                            null != n.element && n.element.selected || null == n.element && t.inArray(i, r) > -1 ? e.attr("aria-selected", "true") : e.attr("aria-selected", "false")
                        });
                        var o = i.filter("[aria-selected=true]");
                        o.length > 0 ? o.first().trigger("mouseenter") : i.first().trigger("mouseenter")
                    })
                }, n.prototype.showLoading = function (t) {
                    this.hideLoading();
                    var e = this.options.get("translations").get("searching"),
                        n = {
                            disabled: !0,
                            loading: !0,
                            text: e(t)
                        },
                        r = this.option(n);
                    r.className += " loading-results", this.$results.prepend(r)
                }, n.prototype.hideLoading = function () {
                    this.$results.find(".loading-results").remove()
                }, n.prototype.option = function (e) {
                    var n = document.createElement("li");
                    n.className = "select2-results__option";
                    var r = {
                        role: "treeitem",
                        "aria-selected": "false"
                    };
                    e.disabled && (delete r["aria-selected"], r["aria-disabled"] = "true"), null == e.id && delete r["aria-selected"], null != e._resultId && (n.id = e._resultId), e.title && (n.title = e.title), e.children && (r.role = "group", r["aria-label"] = e.text, delete r["aria-selected"]);
                    for (var i in r) {
                        var o = r[i];
                        n.setAttribute(i, o)
                    }
                    if (e.children) {
                        var a = t(n),
                            s = document.createElement("strong");
                        s.className = "select2-results__group";
                        t(s);
                        this.template(e, s);
                        for (var l = [], u = 0; u < e.children.length; u++) {
                            var c = e.children[u],
                                d = this.option(c);
                            l.push(d)
                        }
                        var f = t("<ul></ul>", {
                            "class": "select2-results__options select2-results__options--nested"
                        });
                        f.append(l), a.append(s), a.append(f)
                    } else this.template(e, n);
                    return t.data(n, "data", e), n
                }, n.prototype.bind = function (e, n) {
                    var r = this,
                        i = e.id + "-results";
                    this.$results.attr("id", i), e.on("results:all", function (t) {
                        r.clear(), r.append(t.data), e.isOpen() && r.setClasses()
                    }), e.on("results:append", function (t) {
                        r.append(t.data), e.isOpen() && r.setClasses()
                    }), e.on("query", function (t) {
                        r.showLoading(t)
                    }), e.on("select", function () {
                        e.isOpen() && r.setClasses()
                    }), e.on("unselect", function () {
                        e.isOpen() && r.setClasses()
                    }), e.on("open", function () {
                        r.$results.attr("aria-expanded", "true"), r.$results.attr("aria-hidden", "false"), r.setClasses(), r.ensureHighlightVisible()
                    }), e.on("close", function () {
                        r.$results.attr("aria-expanded", "false"), r.$results.attr("aria-hidden", "true"), r.$results.removeAttr("aria-activedescendant")
                    }), e.on("results:toggle", function () {
                        var t = r.getHighlightedResults();
                        0 !== t.length && t.trigger("mouseup")
                    }), e.on("results:select", function () {
                        var t = r.getHighlightedResults();
                        if (0 !== t.length) {
                            var e = t.data("data");
                            "true" == t.attr("aria-selected") ? r.trigger("close") : r.trigger("select", {
                                data: e
                            })
                        }
                    }), e.on("results:previous", function () {
                        var t = r.getHighlightedResults(),
                            e = r.$results.find("[aria-selected]"),
                            n = e.index(t);
                        if (0 !== n) {
                            var i = n - 1;
                            0 === t.length && (i = 0);
                            var o = e.eq(i);
                            o.trigger("mouseenter");
                            var a = r.$results.offset().top,
                                s = o.offset().top,
                                l = r.$results.scrollTop() + (s - a);
                            0 === i ? r.$results.scrollTop(0) : s - a < 0 && r.$results.scrollTop(l)
                        }
                    }), e.on("results:next", function () {
                        var t = r.getHighlightedResults(),
                            e = r.$results.find("[aria-selected]"),
                            n = e.index(t),
                            i = n + 1;
                        if (!(i >= e.length)) {
                            var o = e.eq(i);
                            o.trigger("mouseenter");
                            var a = r.$results.offset().top + r.$results.outerHeight(!1),
                                s = o.offset().top + o.outerHeight(!1),
                                l = r.$results.scrollTop() + s - a;
                            0 === i ? r.$results.scrollTop(0) : s > a && r.$results.scrollTop(l)
                        }
                    }), e.on("results:focus", function (t) {
                        t.element.addClass("select2-results__option--highlighted")
                    }), e.on("results:message", function (t) {
                        r.displayMessage(t)
                    }), t.fn.mousewheel && this.$results.on("mousewheel", function (t) {
                        var e = r.$results.scrollTop(),
                            n = r.$results.get(0).scrollHeight - r.$results.scrollTop() + t.deltaY,
                            i = t.deltaY > 0 && e - t.deltaY <= 0,
                            o = t.deltaY < 0 && n <= r.$results.height();
                        i ? (r.$results.scrollTop(0), t.preventDefault(), t.stopPropagation()) : o && (r.$results.scrollTop(r.$results.get(0).scrollHeight - r.$results.height()), t.preventDefault(), t.stopPropagation())
                    }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (e) {
                        var n = t(this),
                            i = n.data("data");
                        return "true" === n.attr("aria-selected") ? void(r.options.get("multiple") ? r.trigger("unselect", {
                            originalEvent: e,
                            data: i
                        }) : r.trigger("close")) : void r.trigger("select", {
                            originalEvent: e,
                            data: i
                        })
                    }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (e) {
                        var n = t(this).data("data");
                        r.getHighlightedResults().removeClass("select2-results__option--highlighted"), r.trigger("results:focus", {
                            data: n,
                            element: t(this)
                        })
                    })
                }, n.prototype.getHighlightedResults = function () {
                    var t = this.$results.find(".select2-results__option--highlighted");
                    return t
                }, n.prototype.destroy = function () {
                    this.$results.remove()
                }, n.prototype.ensureHighlightVisible = function () {
                    var t = this.getHighlightedResults();
                    if (0 !== t.length) {
                        var e = this.$results.find("[aria-selected]"),
                            n = e.index(t),
                            r = this.$results.offset().top,
                            i = t.offset().top,
                            o = this.$results.scrollTop() + (i - r),
                            a = i - r;
                        o -= 2 * t.outerHeight(!1), n <= 2 ? this.$results.scrollTop(0) : (a > this.$results.outerHeight() || a < 0) && this.$results.scrollTop(o)
                    }
                }, n.prototype.template = function (e, n) {
                    var r = this.options.get("templateResult"),
                        i = this.options.get("escapeMarkup"),
                        o = r(e);
                    null == o ? n.style.display = "none" : "string" == typeof o ? n.innerHTML = i(o) : t(n).append(o)
                }, n
            }), e.define("select2/keys", [], function () {
                var t = {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    ESC: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    DELETE: 46
                };
                return t
            }), e.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (t, e, n) {
                function r(t, e) {
                    this.$element = t, this.options = e, r.__super__.constructor.call(this)
                }
                return e.Extend(r, e.Observable), r.prototype.render = function () {
                    var e = t('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');
                    return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), this.$selection = e, e
                }, r.prototype.bind = function (t, e) {
                    var r = this,
                        i = (t.id + "-container", t.id + "-results");
                    this.container = t, this.$selection.on("focus", function (t) {
                        r.trigger("focus", t)
                    }), this.$selection.on("blur", function (t) {
                        r.trigger("blur", t)
                    }), this.$selection.on("keydown", function (t) {
                        r.trigger("keypress", t), t.which === n.SPACE && t.preventDefault()
                    }), t.on("results:focus", function (t) {
                        r.$selection.attr("aria-activedescendant", t.data._resultId)
                    }), t.on("selection:update", function (t) {
                        r.update(t.data)
                    }), t.on("open", function () {
                        r.$selection.attr("aria-expanded", "true"), r.$selection.attr("aria-owns", i), r._attachCloseHandler(t)
                    }), t.on("close", function () {
                        r.$selection.attr("aria-expanded", "false"), r.$selection.removeAttr("aria-activedescendant"), r.$selection.removeAttr("aria-owns"), r.$selection.focus(), r._detachCloseHandler(t)
                    }), t.on("enable", function () {
                        r.$selection.attr("tabindex", r._tabindex)
                    }), t.on("disable", function () {
                        r.$selection.attr("tabindex", "-1")
                    })
                }, r.prototype._attachCloseHandler = function (e) {
                    t(document.body).on("mousedown.select2." + e.id, function (e) {
                        var n = t(e.target),
                            r = n.closest(".select2"),
                            i = t(".select2.select2-container--open");
                        i.each(function () {
                            var e = t(this);
                            if (this != r[0]) {
                                var n = e.data("element");
                                n.select2("close")
                            }
                        })
                    })
                }, r.prototype._detachCloseHandler = function (e) {
                    t(document.body).off("mousedown.select2." + e.id)
                }, r.prototype.position = function (t, e) {
                    var n = e.find(".selection");
                    n.append(t)
                }, r.prototype.destroy = function () {
                    this._detachCloseHandler(this.container)
                }, r.prototype.update = function (t) {
                    throw new Error("The `update` method must be defined in child classes.")
                }, r
            }), e.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (t, e, n, r) {
                function i() {
                    i.__super__.constructor.apply(this, arguments)
                }
                return n.Extend(i, e), i.prototype.render = function () {
                    var t = i.__super__.render.call(this);
                    return t.addClass("select2-selection--single"), t.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), t
                }, i.prototype.bind = function (t, e) {
                    var n = this;
                    i.__super__.bind.apply(this, arguments);
                    var r = t.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", r), this.$selection.attr("aria-labelledby", r), this.$selection.on("mousedown", function (t) {
                        1 === t.which && n.trigger("toggle", {
                            originalEvent: t
                        })
                    }), this.$selection.on("focus", function (t) {}), this.$selection.on("blur", function (t) {}), t.on("selection:update", function (t) {
                        n.update(t.data)
                    })
                }, i.prototype.clear = function () {
                    this.$selection.find(".select2-selection__rendered").empty()
                }, i.prototype.display = function (t) {
                    var e = this.options.get("templateSelection"),
                        n = this.options.get("escapeMarkup");
                    return n(e(t))
                }, i.prototype.selectionContainer = function () {
                    return t("<span></span>")
                }, i.prototype.update = function (t) {
                    if (0 === t.length) return void this.clear();
                    var e = t[0],
                        n = this.display(e),
                        r = this.$selection.find(".select2-selection__rendered");
                    r.empty().append(n), r.prop("title", e.title || e.text)
                }, i
            }), e.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (t, e, n) {
                function r(t, e) {
                    r.__super__.constructor.apply(this, arguments)
                }
                return n.Extend(r, e), r.prototype.render = function () {
                    var t = r.__super__.render.call(this);
                    return t.addClass("select2-selection--multiple"), t.html('<ul class="select2-selection__rendered"></ul>'), t
                }, r.prototype.bind = function (e, n) {
                    var i = this;
                    r.__super__.bind.apply(this, arguments), this.$selection.on("click", function (t) {
                        i.trigger("toggle", {
                            originalEvent: t
                        })
                    }), this.$selection.on("click", ".select2-selection__choice__remove", function (e) {
                        var n = t(this),
                            r = n.parent(),
                            o = r.data("data");
                        i.trigger("unselect", {
                            originalEvent: e,
                            data: o
                        })
                    })
                }, r.prototype.clear = function () {
                    this.$selection.find(".select2-selection__rendered").empty()
                }, r.prototype.display = function (t) {
                    var e = this.options.get("templateSelection"),
                        n = this.options.get("escapeMarkup");
                    return n(e(t))
                }, r.prototype.selectionContainer = function () {
                    var e = t('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                    return e
                }, r.prototype.update = function (t) {
                    if (this.clear(), 0 !== t.length) {
                        for (var e = [], r = 0; r < t.length; r++) {
                            var i = t[r],
                                o = this.display(i),
                                a = this.selectionContainer();
                            a.append(o), a.prop("title", i.title || i.text), a.data("data", i), e.push(a)
                        }
                        var s = this.$selection.find(".select2-selection__rendered");
                        n.appendMany(s, e)
                    }
                }, r
            }), e.define("select2/selection/placeholder", ["../utils"], function (t) {
                function e(t, e, n) {
                    this.placeholder = this.normalizePlaceholder(n.get("placeholder")), t.call(this, e, n)
                }
                return e.prototype.normalizePlaceholder = function (t, e) {
                    return "string" == typeof e && (e = {
                        id: "",
                        text: e
                    }), e
                }, e.prototype.createPlaceholder = function (t, e) {
                    var n = this.selectionContainer();
                    return n.html(this.display(e)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n
                }, e.prototype.update = function (t, e) {
                    var n = 1 == e.length && e[0].id != this.placeholder.id,
                        r = e.length > 1;
                    if (r || n) return t.call(this, e);
                    this.clear();
                    var i = this.createPlaceholder(this.placeholder);
                    this.$selection.find(".select2-selection__rendered").append(i)
                }, e
            }), e.define("select2/selection/allowClear", ["jquery", "../keys"], function (t, e) {
                function n() {}
                return n.prototype.bind = function (t, e, n) {
                    var r = this;
                    t.call(this, e, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (t) {
                        r._handleClear(t)
                    }), e.on("keypress", function (t) {
                        r._handleKeyboardClear(t, e)
                    })
                }, n.prototype._handleClear = function (t, e) {
                    if (!this.options.get("disabled")) {
                        var n = this.$selection.find(".select2-selection__clear");
                        if (0 !== n.length) {
                            e.stopPropagation();
                            for (var r = n.data("data"), i = 0; i < r.length; i++) {
                                var o = {
                                    data: r[i]
                                };
                                if (this.trigger("unselect", o), o.prevented) return
                            }
                            this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle")
                        }
                    }
                }, n.prototype._handleKeyboardClear = function (t, n, r) {
                    r.isOpen() || n.which != e.DELETE && n.which != e.BACKSPACE || this._handleClear(n)
                }, n.prototype.update = function (e, n) {
                    if (e.call(this, n), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === n.length)) {
                        var r = t('<span class="select2-selection__clear">&times;</span>');
                        r.data("data", n), this.$selection.find(".select2-selection__rendered").prepend(r)
                    }
                }, n
            }), e.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (t, e, n) {
                function r(t, e, n) {
                    t.call(this, e, n)
                }
                return r.prototype.render = function (e) {
                    var n = t('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');
                    this.$searchContainer = n, this.$search = n.find("input");
                    var r = e.call(this);
                    return r
                }, r.prototype.bind = function (t, e, r) {
                    var i = this;
                    t.call(this, e, r), e.on("open", function () {
                        i.$search.attr("tabindex", 0), i.$search.focus()
                    }), e.on("close", function () {
                        i.$search.attr("tabindex", -1), i.$search.val(""), i.$search.focus()
                    }), e.on("enable", function () {
                        i.$search.prop("disabled", !1)
                    }), e.on("disable", function () {
                        i.$search.prop("disabled", !0)
                    }), this.$selection.on("focusin", ".select2-search--inline", function (t) {
                        i.trigger("focus", t)
                    }), this.$selection.on("focusout", ".select2-search--inline", function (t) {
                        i.trigger("blur", t)
                    }), this.$selection.on("keydown", ".select2-search--inline", function (t) {
                        t.stopPropagation(), i.trigger("keypress", t), i._keyUpPrevented = t.isDefaultPrevented();
                        var e = t.which;
                        if (e === n.BACKSPACE && "" === i.$search.val()) {
                            var r = i.$searchContainer.prev(".select2-selection__choice");
                            if (r.length > 0) {
                                var o = r.data("data");
                                i.searchRemoveChoice(o), t.preventDefault()
                            }
                        }
                    }), this.$selection.on("input", ".select2-search--inline", function (t) {
                        i.$selection.off("keyup.search")
                    }), this.$selection.on("keyup.search input", ".select2-search--inline", function (t) {
                        i.handleSearch(t)
                    })
                }, r.prototype.createPlaceholder = function (t, e) {
                    this.$search.attr("placeholder", e.text)
                }, r.prototype.update = function (t, e) {
                    this.$search.attr("placeholder", ""), t.call(this, e), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch()
                }, r.prototype.handleSearch = function () {
                    if (this.resizeSearch(), !this._keyUpPrevented) {
                        var t = this.$search.val();
                        this.trigger("query", {
                            term: t
                        })
                    }
                    this._keyUpPrevented = !1
                }, r.prototype.searchRemoveChoice = function (t, e) {
                    this.trigger("unselect", {
                        data: e
                    }), this.trigger("open"), this.$search.val(e.text + " ")
                }, r.prototype.resizeSearch = function () {
                    this.$search.css("width", "25px");
                    var t = "";
                    if ("" !== this.$search.attr("placeholder")) t = this.$selection.find(".select2-selection__rendered").innerWidth();
                    else {
                        var e = this.$search.val().length + 1;
                        t = .75 * e + "em"
                    }
                    this.$search.css("width", t)
                }, r
            }), e.define("select2/selection/eventRelay", ["jquery"], function (t) {
                function e() {}
                return e.prototype.bind = function (e, n, r) {
                    var i = this,
                        o = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                        a = ["opening", "closing", "selecting", "unselecting"];
                    e.call(this, n, r), n.on("*", function (e, n) {
                        if (t.inArray(e, o) !== -1) {
                            n = n || {};
                            var r = t.Event("select2:" + e, {
                                params: n
                            });
                            i.$element.trigger(r), t.inArray(e, a) !== -1 && (n.prevented = r.isDefaultPrevented())
                        }
                    })
                }, e
            }), e.define("select2/translation", ["jquery", "require"], function (t, e) {
                function n(t) {
                    this.dict = t || {}
                }
                return n.prototype.all = function () {
                    return this.dict
                }, n.prototype.get = function (t) {
                    return this.dict[t]
                }, n.prototype.extend = function (e) {
                    this.dict = t.extend({}, e.all(), this.dict)
                }, n._cache = {}, n.loadPath = function (t) {
                    if (!(t in n._cache)) {
                        var r = e(t);
                        n._cache[t] = r
                    }
                    return new n(n._cache[t])
                }, n
            }), e.define("select2/diacritics", [], function () {
                var t = {
                    "Ⓐ": "A",
                    "Ａ": "A",
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ầ": "A",
                    "Ấ": "A",
                    "Ẫ": "A",
                    "Ẩ": "A",
                    "Ã": "A",
                    "Ā": "A",
                    "Ă": "A",
                    "Ằ": "A",
                    "Ắ": "A",
                    "Ẵ": "A",
                    "Ẳ": "A",
                    "Ȧ": "A",
                    "Ǡ": "A",
                    "Ä": "A",
                    "Ǟ": "A",
                    "Ả": "A",
                    "Å": "A",
                    "Ǻ": "A",
                    "Ǎ": "A",
                    "Ȁ": "A",
                    "Ȃ": "A",
                    "Ạ": "A",
                    "Ậ": "A",
                    "Ặ": "A",
                    "Ḁ": "A",
                    "Ą": "A",
                    "Ⱥ": "A",
                    "Ɐ": "A",
                    "Ꜳ": "AA",
                    "Æ": "AE",
                    "Ǽ": "AE",
                    "Ǣ": "AE",
                    "Ꜵ": "AO",
                    "Ꜷ": "AU",
                    "Ꜹ": "AV",
                    "Ꜻ": "AV",
                    "Ꜽ": "AY",
                    "Ⓑ": "B",
                    "Ｂ": "B",
                    "Ḃ": "B",
                    "Ḅ": "B",
                    "Ḇ": "B",
                    "Ƀ": "B",
                    "Ƃ": "B",
                    "Ɓ": "B",
                    "Ⓒ": "C",
                    "Ｃ": "C",
                    "Ć": "C",
                    "Ĉ": "C",
                    "Ċ": "C",
                    "Č": "C",
                    "Ç": "C",
                    "Ḉ": "C",
                    "Ƈ": "C",
                    "Ȼ": "C",
                    "Ꜿ": "C",
                    "Ⓓ": "D",
                    "Ｄ": "D",
                    "Ḋ": "D",
                    "Ď": "D",
                    "Ḍ": "D",
                    "Ḑ": "D",
                    "Ḓ": "D",
                    "Ḏ": "D",
                    "Đ": "D",
                    "Ƌ": "D",
                    "Ɗ": "D",
                    "Ɖ": "D",
                    "Ꝺ": "D",
                    "Ǳ": "DZ",
                    "Ǆ": "DZ",
                    "ǲ": "Dz",
                    "ǅ": "Dz",
                    "Ⓔ": "E",
                    "Ｅ": "E",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ề": "E",
                    "Ế": "E",
                    "Ễ": "E",
                    "Ể": "E",
                    "Ẽ": "E",
                    "Ē": "E",
                    "Ḕ": "E",
                    "Ḗ": "E",
                    "Ĕ": "E",
                    "Ė": "E",
                    "Ë": "E",
                    "Ẻ": "E",
                    "Ě": "E",
                    "Ȅ": "E",
                    "Ȇ": "E",
                    "Ẹ": "E",
                    "Ệ": "E",
                    "Ȩ": "E",
                    "Ḝ": "E",
                    "Ę": "E",
                    "Ḙ": "E",
                    "Ḛ": "E",
                    "Ɛ": "E",
                    "Ǝ": "E",
                    "Ⓕ": "F",
                    "Ｆ": "F",
                    "Ḟ": "F",
                    "Ƒ": "F",
                    "Ꝼ": "F",
                    "Ⓖ": "G",
                    "Ｇ": "G",
                    "Ǵ": "G",
                    "Ĝ": "G",
                    "Ḡ": "G",
                    "Ğ": "G",
                    "Ġ": "G",
                    "Ǧ": "G",
                    "Ģ": "G",
                    "Ǥ": "G",
                    "Ɠ": "G",
                    "Ꞡ": "G",
                    "Ᵹ": "G",
                    "Ꝿ": "G",
                    "Ⓗ": "H",
                    "Ｈ": "H",
                    "Ĥ": "H",
                    "Ḣ": "H",
                    "Ḧ": "H",
                    "Ȟ": "H",
                    "Ḥ": "H",
                    "Ḩ": "H",
                    "Ḫ": "H",
                    "Ħ": "H",
                    "Ⱨ": "H",
                    "Ⱶ": "H",
                    "Ɥ": "H",
                    "Ⓘ": "I",
                    "Ｉ": "I",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ĩ": "I",
                    "Ī": "I",
                    "Ĭ": "I",
                    "İ": "I",
                    "Ï": "I",
                    "Ḯ": "I",
                    "Ỉ": "I",
                    "Ǐ": "I",
                    "Ȉ": "I",
                    "Ȋ": "I",
                    "Ị": "I",
                    "Į": "I",
                    "Ḭ": "I",
                    "Ɨ": "I",
                    "Ⓙ": "J",
                    "Ｊ": "J",
                    "Ĵ": "J",
                    "Ɉ": "J",
                    "Ⓚ": "K",
                    "Ｋ": "K",
                    "Ḱ": "K",
                    "Ǩ": "K",
                    "Ḳ": "K",
                    "Ķ": "K",
                    "Ḵ": "K",
                    "Ƙ": "K",
                    "Ⱪ": "K",
                    "Ꝁ": "K",
                    "Ꝃ": "K",
                    "Ꝅ": "K",
                    "Ꞣ": "K",
                    "Ⓛ": "L",
                    "Ｌ": "L",
                    "Ŀ": "L",
                    "Ĺ": "L",
                    "Ľ": "L",
                    "Ḷ": "L",
                    "Ḹ": "L",
                    "Ļ": "L",
                    "Ḽ": "L",
                    "Ḻ": "L",
                    "Ł": "L",
                    "Ƚ": "L",
                    "Ɫ": "L",
                    "Ⱡ": "L",
                    "Ꝉ": "L",
                    "Ꝇ": "L",
                    "Ꞁ": "L",
                    "Ǉ": "LJ",
                    "ǈ": "Lj",
                    "Ⓜ": "M",
                    "Ｍ": "M",
                    "Ḿ": "M",
                    "Ṁ": "M",
                    "Ṃ": "M",
                    "Ɱ": "M",
                    "Ɯ": "M",
                    "Ⓝ": "N",
                    "Ｎ": "N",
                    "Ǹ": "N",
                    "Ń": "N",
                    "Ñ": "N",
                    "Ṅ": "N",
                    "Ň": "N",
                    "Ṇ": "N",
                    "Ņ": "N",
                    "Ṋ": "N",
                    "Ṉ": "N",
                    "Ƞ": "N",
                    "Ɲ": "N",
                    "Ꞑ": "N",
                    "Ꞥ": "N",
                    "Ǌ": "NJ",
                    "ǋ": "Nj",
                    "Ⓞ": "O",
                    "Ｏ": "O",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Ồ": "O",
                    "Ố": "O",
                    "Ỗ": "O",
                    "Ổ": "O",
                    "Õ": "O",
                    "Ṍ": "O",
                    "Ȭ": "O",
                    "Ṏ": "O",
                    "Ō": "O",
                    "Ṑ": "O",
                    "Ṓ": "O",
                    "Ŏ": "O",
                    "Ȯ": "O",
                    "Ȱ": "O",
                    "Ö": "O",
                    "Ȫ": "O",
                    "Ỏ": "O",
                    "Ő": "O",
                    "Ǒ": "O",
                    "Ȍ": "O",
                    "Ȏ": "O",
                    "Ơ": "O",
                    "Ờ": "O",
                    "Ớ": "O",
                    "Ỡ": "O",
                    "Ở": "O",
                    "Ợ": "O",
                    "Ọ": "O",
                    "Ộ": "O",
                    "Ǫ": "O",
                    "Ǭ": "O",
                    "Ø": "O",
                    "Ǿ": "O",
                    "Ɔ": "O",
                    "Ɵ": "O",
                    "Ꝋ": "O",
                    "Ꝍ": "O",
                    "Ƣ": "OI",
                    "Ꝏ": "OO",
                    "Ȣ": "OU",
                    "Ⓟ": "P",
                    "Ｐ": "P",
                    "Ṕ": "P",
                    "Ṗ": "P",
                    "Ƥ": "P",
                    "Ᵽ": "P",
                    "Ꝑ": "P",
                    "Ꝓ": "P",
                    "Ꝕ": "P",
                    "Ⓠ": "Q",
                    "Ｑ": "Q",
                    "Ꝗ": "Q",
                    "Ꝙ": "Q",
                    "Ɋ": "Q",
                    "Ⓡ": "R",
                    "Ｒ": "R",
                    "Ŕ": "R",
                    "Ṙ": "R",
                    "Ř": "R",
                    "Ȑ": "R",
                    "Ȓ": "R",
                    "Ṛ": "R",
                    "Ṝ": "R",
                    "Ŗ": "R",
                    "Ṟ": "R",
                    "Ɍ": "R",
                    "Ɽ": "R",
                    "Ꝛ": "R",
                    "Ꞧ": "R",
                    "Ꞃ": "R",
                    "Ⓢ": "S",
                    "Ｓ": "S",
                    "ẞ": "S",
                    "Ś": "S",
                    "Ṥ": "S",
                    "Ŝ": "S",
                    "Ṡ": "S",
                    "Š": "S",
                    "Ṧ": "S",
                    "Ṣ": "S",
                    "Ṩ": "S",
                    "Ș": "S",
                    "Ş": "S",
                    "Ȿ": "S",
                    "Ꞩ": "S",
                    "Ꞅ": "S",
                    "Ⓣ": "T",
                    "Ｔ": "T",
                    "Ṫ": "T",
                    "Ť": "T",
                    "Ṭ": "T",
                    "Ț": "T",
                    "Ţ": "T",
                    "Ṱ": "T",
                    "Ṯ": "T",
                    "Ŧ": "T",
                    "Ƭ": "T",
                    "Ʈ": "T",
                    "Ⱦ": "T",
                    "Ꞇ": "T",
                    "Ꜩ": "TZ",
                    "Ⓤ": "U",
                    "Ｕ": "U",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ũ": "U",
                    "Ṹ": "U",
                    "Ū": "U",
                    "Ṻ": "U",
                    "Ŭ": "U",
                    "Ü": "U",
                    "Ǜ": "U",
                    "Ǘ": "U",
                    "Ǖ": "U",
                    "Ǚ": "U",
                    "Ủ": "U",
                    "Ů": "U",
                    "Ű": "U",
                    "Ǔ": "U",
                    "Ȕ": "U",
                    "Ȗ": "U",
                    "Ư": "U",
                    "Ừ": "U",
                    "Ứ": "U",
                    "Ữ": "U",
                    "Ử": "U",
                    "Ự": "U",
                    "Ụ": "U",
                    "Ṳ": "U",
                    "Ų": "U",
                    "Ṷ": "U",
                    "Ṵ": "U",
                    "Ʉ": "U",
                    "Ⓥ": "V",
                    "Ｖ": "V",
                    "Ṽ": "V",
                    "Ṿ": "V",
                    "Ʋ": "V",
                    "Ꝟ": "V",
                    "Ʌ": "V",
                    "Ꝡ": "VY",
                    "Ⓦ": "W",
                    "Ｗ": "W",
                    "Ẁ": "W",
                    "Ẃ": "W",
                    "Ŵ": "W",
                    "Ẇ": "W",
                    "Ẅ": "W",
                    "Ẉ": "W",
                    "Ⱳ": "W",
                    "Ⓧ": "X",
                    "Ｘ": "X",
                    "Ẋ": "X",
                    "Ẍ": "X",
                    "Ⓨ": "Y",
                    "Ｙ": "Y",
                    "Ỳ": "Y",
                    "Ý": "Y",
                    "Ŷ": "Y",
                    "Ỹ": "Y",
                    "Ȳ": "Y",
                    "Ẏ": "Y",
                    "Ÿ": "Y",
                    "Ỷ": "Y",
                    "Ỵ": "Y",
                    "Ƴ": "Y",
                    "Ɏ": "Y",
                    "Ỿ": "Y",
                    "Ⓩ": "Z",
                    "Ｚ": "Z",
                    "Ź": "Z",
                    "Ẑ": "Z",
                    "Ż": "Z",
                    "Ž": "Z",
                    "Ẓ": "Z",
                    "Ẕ": "Z",
                    "Ƶ": "Z",
                    "Ȥ": "Z",
                    "Ɀ": "Z",
                    "Ⱬ": "Z",
                    "Ꝣ": "Z",
                    "ⓐ": "a",
                    "ａ": "a",
                    "ẚ": "a",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ầ": "a",
                    "ấ": "a",
                    "ẫ": "a",
                    "ẩ": "a",
                    "ã": "a",
                    "ā": "a",
                    "ă": "a",
                    "ằ": "a",
                    "ắ": "a",
                    "ẵ": "a",
                    "ẳ": "a",
                    "ȧ": "a",
                    "ǡ": "a",
                    "ä": "a",
                    "ǟ": "a",
                    "ả": "a",
                    "å": "a",
                    "ǻ": "a",
                    "ǎ": "a",
                    "ȁ": "a",
                    "ȃ": "a",
                    "ạ": "a",
                    "ậ": "a",
                    "ặ": "a",
                    "ḁ": "a",
                    "ą": "a",
                    "ⱥ": "a",
                    "ɐ": "a",
                    "ꜳ": "aa",
                    "æ": "ae",
                    "ǽ": "ae",
                    "ǣ": "ae",
                    "ꜵ": "ao",
                    "ꜷ": "au",
                    "ꜹ": "av",
                    "ꜻ": "av",
                    "ꜽ": "ay",
                    "ⓑ": "b",
                    "ｂ": "b",
                    "ḃ": "b",
                    "ḅ": "b",
                    "ḇ": "b",
                    "ƀ": "b",
                    "ƃ": "b",
                    "ɓ": "b",
                    "ⓒ": "c",
                    "ｃ": "c",
                    "ć": "c",
                    "ĉ": "c",
                    "ċ": "c",
                    "č": "c",
                    "ç": "c",
                    "ḉ": "c",
                    "ƈ": "c",
                    "ȼ": "c",
                    "ꜿ": "c",
                    "ↄ": "c",
                    "ⓓ": "d",
                    "ｄ": "d",
                    "ḋ": "d",
                    "ď": "d",
                    "ḍ": "d",
                    "ḑ": "d",
                    "ḓ": "d",
                    "ḏ": "d",
                    "đ": "d",
                    "ƌ": "d",
                    "ɖ": "d",
                    "ɗ": "d",
                    "ꝺ": "d",
                    "ǳ": "dz",
                    "ǆ": "dz",
                    "ⓔ": "e",
                    "ｅ": "e",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ề": "e",
                    "ế": "e",
                    "ễ": "e",
                    "ể": "e",
                    "ẽ": "e",
                    "ē": "e",
                    "ḕ": "e",
                    "ḗ": "e",
                    "ĕ": "e",
                    "ė": "e",
                    "ë": "e",
                    "ẻ": "e",
                    "ě": "e",
                    "ȅ": "e",
                    "ȇ": "e",
                    "ẹ": "e",
                    "ệ": "e",
                    "ȩ": "e",
                    "ḝ": "e",
                    "ę": "e",
                    "ḙ": "e",
                    "ḛ": "e",
                    "ɇ": "e",
                    "ɛ": "e",
                    "ǝ": "e",
                    "ⓕ": "f",
                    "ｆ": "f",
                    "ḟ": "f",
                    "ƒ": "f",
                    "ꝼ": "f",
                    "ⓖ": "g",
                    "ｇ": "g",
                    "ǵ": "g",
                    "ĝ": "g",
                    "ḡ": "g",
                    "ğ": "g",
                    "ġ": "g",
                    "ǧ": "g",
                    "ģ": "g",
                    "ǥ": "g",
                    "ɠ": "g",
                    "ꞡ": "g",
                    "ᵹ": "g",
                    "ꝿ": "g",
                    "ⓗ": "h",
                    "ｈ": "h",
                    "ĥ": "h",
                    "ḣ": "h",
                    "ḧ": "h",
                    "ȟ": "h",
                    "ḥ": "h",
                    "ḩ": "h",
                    "ḫ": "h",
                    "ẖ": "h",
                    "ħ": "h",
                    "ⱨ": "h",
                    "ⱶ": "h",
                    "ɥ": "h",
                    "ƕ": "hv",
                    "ⓘ": "i",
                    "ｉ": "i",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ĩ": "i",
                    "ī": "i",
                    "ĭ": "i",
                    "ï": "i",
                    "ḯ": "i",
                    "ỉ": "i",
                    "ǐ": "i",
                    "ȉ": "i",
                    "ȋ": "i",
                    "ị": "i",
                    "į": "i",
                    "ḭ": "i",
                    "ɨ": "i",
                    "ı": "i",
                    "ⓙ": "j",
                    "ｊ": "j",
                    "ĵ": "j",
                    "ǰ": "j",
                    "ɉ": "j",
                    "ⓚ": "k",
                    "ｋ": "k",
                    "ḱ": "k",
                    "ǩ": "k",
                    "ḳ": "k",
                    "ķ": "k",
                    "ḵ": "k",
                    "ƙ": "k",
                    "ⱪ": "k",
                    "ꝁ": "k",
                    "ꝃ": "k",
                    "ꝅ": "k",
                    "ꞣ": "k",
                    "ⓛ": "l",
                    "ｌ": "l",
                    "ŀ": "l",
                    "ĺ": "l",
                    "ľ": "l",
                    "ḷ": "l",
                    "ḹ": "l",
                    "ļ": "l",
                    "ḽ": "l",
                    "ḻ": "l",
                    "ſ": "l",
                    "ł": "l",
                    "ƚ": "l",
                    "ɫ": "l",
                    "ⱡ": "l",
                    "ꝉ": "l",
                    "ꞁ": "l",
                    "ꝇ": "l",
                    "ǉ": "lj",
                    "ⓜ": "m",
                    "ｍ": "m",
                    "ḿ": "m",
                    "ṁ": "m",
                    "ṃ": "m",
                    "ɱ": "m",
                    "ɯ": "m",
                    "ⓝ": "n",
                    "ｎ": "n",
                    "ǹ": "n",
                    "ń": "n",
                    "ñ": "n",
                    "ṅ": "n",
                    "ň": "n",
                    "ṇ": "n",
                    "ņ": "n",
                    "ṋ": "n",
                    "ṉ": "n",
                    "ƞ": "n",
                    "ɲ": "n",
                    "ŉ": "n",
                    "ꞑ": "n",
                    "ꞥ": "n",
                    "ǌ": "nj",
                    "ⓞ": "o",
                    "ｏ": "o",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "ồ": "o",
                    "ố": "o",
                    "ỗ": "o",
                    "ổ": "o",
                    "õ": "o",
                    "ṍ": "o",
                    "ȭ": "o",
                    "ṏ": "o",
                    "ō": "o",
                    "ṑ": "o",
                    "ṓ": "o",
                    "ŏ": "o",
                    "ȯ": "o",
                    "ȱ": "o",
                    "ö": "o",
                    "ȫ": "o",
                    "ỏ": "o",
                    "ő": "o",
                    "ǒ": "o",
                    "ȍ": "o",
                    "ȏ": "o",
                    "ơ": "o",
                    "ờ": "o",
                    "ớ": "o",
                    "ỡ": "o",
                    "ở": "o",
                    "ợ": "o",
                    "ọ": "o",
                    "ộ": "o",
                    "ǫ": "o",
                    "ǭ": "o",
                    "ø": "o",
                    "ǿ": "o",
                    "ɔ": "o",
                    "ꝋ": "o",
                    "ꝍ": "o",
                    "ɵ": "o",
                    "ƣ": "oi",
                    "ȣ": "ou",
                    "ꝏ": "oo",
                    "ⓟ": "p",
                    "ｐ": "p",
                    "ṕ": "p",
                    "ṗ": "p",
                    "ƥ": "p",
                    "ᵽ": "p",
                    "ꝑ": "p",
                    "ꝓ": "p",
                    "ꝕ": "p",
                    "ⓠ": "q",
                    "ｑ": "q",
                    "ɋ": "q",
                    "ꝗ": "q",
                    "ꝙ": "q",
                    "ⓡ": "r",
                    "ｒ": "r",
                    "ŕ": "r",
                    "ṙ": "r",
                    "ř": "r",
                    "ȑ": "r",
                    "ȓ": "r",
                    "ṛ": "r",
                    "ṝ": "r",
                    "ŗ": "r",
                    "ṟ": "r",
                    "ɍ": "r",
                    "ɽ": "r",
                    "ꝛ": "r",
                    "ꞧ": "r",
                    "ꞃ": "r",
                    "ⓢ": "s",
                    "ｓ": "s",
                    "ß": "s",
                    "ś": "s",
                    "ṥ": "s",
                    "ŝ": "s",
                    "ṡ": "s",
                    "š": "s",
                    "ṧ": "s",
                    "ṣ": "s",
                    "ṩ": "s",
                    "ș": "s",
                    "ş": "s",
                    "ȿ": "s",
                    "ꞩ": "s",
                    "ꞅ": "s",
                    "ẛ": "s",
                    "ⓣ": "t",
                    "ｔ": "t",
                    "ṫ": "t",
                    "ẗ": "t",
                    "ť": "t",
                    "ṭ": "t",
                    "ț": "t",
                    "ţ": "t",
                    "ṱ": "t",
                    "ṯ": "t",
                    "ŧ": "t",
                    "ƭ": "t",
                    "ʈ": "t",
                    "ⱦ": "t",
                    "ꞇ": "t",
                    "ꜩ": "tz",
                    "ⓤ": "u",
                    "ｕ": "u",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ũ": "u",
                    "ṹ": "u",
                    "ū": "u",
                    "ṻ": "u",
                    "ŭ": "u",
                    "ü": "u",
                    "ǜ": "u",
                    "ǘ": "u",
                    "ǖ": "u",
                    "ǚ": "u",
                    "ủ": "u",
                    "ů": "u",
                    "ű": "u",
                    "ǔ": "u",
                    "ȕ": "u",
                    "ȗ": "u",
                    "ư": "u",
                    "ừ": "u",
                    "ứ": "u",
                    "ữ": "u",
                    "ử": "u",
                    "ự": "u",
                    "ụ": "u",
                    "ṳ": "u",
                    "ų": "u",
                    "ṷ": "u",
                    "ṵ": "u",
                    "ʉ": "u",
                    "ⓥ": "v",
                    "ｖ": "v",
                    "ṽ": "v",
                    "ṿ": "v",
                    "ʋ": "v",
                    "ꝟ": "v",
                    "ʌ": "v",
                    "ꝡ": "vy",
                    "ⓦ": "w",
                    "ｗ": "w",
                    "ẁ": "w",
                    "ẃ": "w",
                    "ŵ": "w",
                    "ẇ": "w",
                    "ẅ": "w",
                    "ẘ": "w",
                    "ẉ": "w",
                    "ⱳ": "w",
                    "ⓧ": "x",
                    "ｘ": "x",
                    "ẋ": "x",
                    "ẍ": "x",
                    "ⓨ": "y",
                    "ｙ": "y",
                    "ỳ": "y",
                    "ý": "y",
                    "ŷ": "y",
                    "ỹ": "y",
                    "ȳ": "y",
                    "ẏ": "y",
                    "ÿ": "y",
                    "ỷ": "y",
                    "ẙ": "y",
                    "ỵ": "y",
                    "ƴ": "y",
                    "ɏ": "y",
                    "ỿ": "y",
                    "ⓩ": "z",
                    "ｚ": "z",
                    "ź": "z",
                    "ẑ": "z",
                    "ż": "z",
                    "ž": "z",
                    "ẓ": "z",
                    "ẕ": "z",
                    "ƶ": "z",
                    "ȥ": "z",
                    "ɀ": "z",
                    "ⱬ": "z",
                    "ꝣ": "z",
                    "Ά": "Α",
                    "Έ": "Ε",
                    "Ή": "Η",
                    "Ί": "Ι",
                    "Ϊ": "Ι",
                    "Ό": "Ο",
                    "Ύ": "Υ",
                    "Ϋ": "Υ",
                    "Ώ": "Ω",
                    "ά": "α",
                    "έ": "ε",
                    "ή": "η",
                    "ί": "ι",
                    "ϊ": "ι",
                    "ΐ": "ι",
                    "ό": "ο",
                    "ύ": "υ",
                    "ϋ": "υ",
                    "ΰ": "υ",
                    "ω": "ω",
                    "ς": "σ"
                };
                return t
            }), e.define("select2/data/base", ["../utils"], function (t) {
                function e(t, n) {
                    e.__super__.constructor.call(this)
                }
                return t.Extend(e, t.Observable), e.prototype.current = function (t) {
                    throw new Error("The `current` method must be defined in child classes.")
                }, e.prototype.query = function (t, e) {
                    throw new Error("The `query` method must be defined in child classes.")
                }, e.prototype.bind = function (t, e) {}, e.prototype.destroy = function () {}, e.prototype.generateResultId = function (e, n) {
                    var r = e.id + "-result-";
                    return r += t.generateChars(4), r += null != n.id ? "-" + n.id.toString() : "-" + t.generateChars(4)
                }, e
            }), e.define("select2/data/select", ["./base", "../utils", "jquery"], function (t, e, n) {
                function r(t, e) {
                    this.$element = t, this.options = e, r.__super__.constructor.call(this)
                }
                return e.Extend(r, t), r.prototype.current = function (t) {
                    var e = [],
                        r = this;
                    this.$element.find(":selected").each(function () {
                        var t = n(this),
                            i = r.item(t);
                        e.push(i)
                    }), t(e)
                }, r.prototype.select = function (t) {
                    var e = this;
                    if (t.selected = !0, n(t.element).is("option")) return t.element.selected = !0, void this.$element.trigger("change");
                    if (this.$element.prop("multiple")) this.current(function (r) {
                        var i = [];
                        t = [t], t.push.apply(t, r);
                        for (var o = 0; o < t.length; o++) {
                            var a = t[o].id;
                            n.inArray(a, i) === -1 && i.push(a)
                        }
                        e.$element.val(i), e.$element.trigger("change")
                    });
                    else {
                        var r = t.id;
                        this.$element.val(r), this.$element.trigger("change")
                    }
                }, r.prototype.unselect = function (t) {
                    var e = this;
                    if (this.$element.prop("multiple")) return t.selected = !1, n(t.element).is("option") ? (t.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (r) {
                        for (var i = [], o = 0; o < r.length; o++) {
                            var a = r[o].id;
                            a !== t.id && n.inArray(a, i) === -1 && i.push(a)
                        }
                        e.$element.val(i), e.$element.trigger("change")
                    })
                }, r.prototype.bind = function (t, e) {
                    var n = this;
                    this.container = t, t.on("select", function (t) {
                        n.select(t.data)
                    }), t.on("unselect", function (t) {
                        n.unselect(t.data)
                    })
                }, r.prototype.destroy = function () {
                    this.$element.find("*").each(function () {
                        n.removeData(this, "data")
                    })
                }, r.prototype.query = function (t, e) {
                    var r = [],
                        i = this,
                        o = this.$element.children();
                    o.each(function () {
                        var e = n(this);
                        if (e.is("option") || e.is("optgroup")) {
                            var o = i.item(e),
                                a = i.matches(t, o);
                            null !== a && r.push(a)
                        }
                    }), e({
                        results: r
                    })
                }, r.prototype.addOptions = function (t) {
                    e.appendMany(this.$element, t)
                }, r.prototype.option = function (t) {
                    var e;
                    t.children ? (e = document.createElement("optgroup"), e.label = t.text) : (e = document.createElement("option"), void 0 !== e.textContent ? e.textContent = t.text : e.innerText = t.text), t.id && (e.value = t.id), t.disabled && (e.disabled = !0), t.selected && (e.selected = !0), t.title && (e.title = t.title);
                    var r = n(e),
                        i = this._normalizeItem(t);
                    return i.element = e, n.data(e, "data", i), r
                }, r.prototype.item = function (t) {
                    var e = {};
                    if (e = n.data(t[0], "data"), null != e) return e;
                    if (t.is("option")) e = {
                        id: t.val(),
                        text: t.text(),
                        disabled: t.prop("disabled"),
                        selected: t.prop("selected"),
                        title: t.prop("title")
                    };
                    else if (t.is("optgroup")) {
                        e = {
                            text: t.prop("label"),
                            children: [],
                            title: t.prop("title")
                        };
                        for (var r = t.children("option"), i = [], o = 0; o < r.length; o++) {
                            var a = n(r[o]),
                                s = this.item(a);
                            i.push(s)
                        }
                        e.children = i
                    }
                    return e = this._normalizeItem(e), e.element = t[0], n.data(t[0], "data", e), e
                }, r.prototype._normalizeItem = function (t) {
                    n.isPlainObject(t) || (t = {
                        id: t,
                        text: t
                    }), t = n.extend({}, {
                        text: ""
                    }, t);
                    var e = {
                        selected: !1,
                        disabled: !1
                    };
                    return null != t.id && (t.id = t.id.toString()), null != t.text && (t.text = t.text.toString()), null == t._resultId && t.id && null != this.container && (t._resultId = this.generateResultId(this.container, t)), n.extend({}, e, t)
                }, r.prototype.matches = function (t, e) {
                    var n = this.options.get("matcher");
                    return n(t, e)
                }, r
            }), e.define("select2/data/array", ["./select", "../utils", "jquery"], function (t, e, n) {
                function r(t, e) {
                    var n = e.get("data") || [];
                    r.__super__.constructor.call(this, t, e), this.addOptions(this.convertToOptions(n))
                }
                return e.Extend(r, t), r.prototype.select = function (t) {
                    var e = this.$element.find("option").filter(function (e, n) {
                        return n.value == t.id.toString()
                    });
                    0 === e.length && (e = this.option(t), this.addOptions(e)), r.__super__.select.call(this, t)
                }, r.prototype.convertToOptions = function (t) {
                    function r(t) {
                        return function () {
                            return n(this).val() == t.id
                        }
                    }
                    for (var i = this, o = this.$element.find("option"), a = o.map(function () {
                            return i.item(n(this)).id
                        }).get(), s = [], l = 0; l < t.length; l++) {
                        var u = this._normalizeItem(t[l]);
                        if (n.inArray(u.id, a) >= 0) {
                            var c = o.filter(r(u)),
                                d = this.item(c),
                                f = (n.extend(!0, {}, d, u), this.option(d));
                            c.replaceWith(f)
                        } else {
                            var p = this.option(u);
                            if (u.children) {
                                var h = this.convertToOptions(u.children);
                                e.appendMany(p, h)
                            }
                            s.push(p)
                        }
                    }
                    return s
                }, r
            }), e.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (t, e, n) {
                function r(e, n) {
                    this.ajaxOptions = this._applyDefaults(n.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), t.__super__.constructor.call(this, e, n)
                }
                return e.Extend(r, t), r.prototype._applyDefaults = function (t) {
                    var e = {
                        data: function (t) {
                            return {
                                q: t.term
                            }
                        },
                        transport: function (t, e, r) {
                            var i = n.ajax(t);
                            return i.then(e), i.fail(r), i
                        }
                    };
                    return n.extend({}, e, t, !0)
                }, r.prototype.processResults = function (t) {
                    return t
                }, r.prototype.query = function (t, e) {
                    function r() {
                        var r = o.transport(o, function (r) {
                            var o = i.processResults(r, t);
                            i.options.get("debug") && window.console && console.error && (o && o.results && n.isArray(o.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), e(o)
                        }, function () {});
                        i._request = r
                    }
                    var i = this;
                    null != this._request && (n.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                    var o = n.extend({
                        type: "GET"
                    }, this.ajaxOptions);
                    "function" == typeof o.url && (o.url = o.url(t)), "function" == typeof o.data && (o.data = o.data(t)), this.ajaxOptions.delay && "" !== t.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(r, this.ajaxOptions.delay)) : r()
                }, r
            }), e.define("select2/data/tags", ["jquery"], function (t) {
                function e(e, n, r) {
                    var i = r.get("tags"),
                        o = r.get("createTag");
                    if (void 0 !== o && (this.createTag = o), e.call(this, n, r), t.isArray(i))
                        for (var a = 0; a < i.length; a++) {
                            var s = i[a],
                                l = this._normalizeItem(s),
                                u = this.option(l);
                            this.$element.append(u)
                        }
                }
                return e.prototype.query = function (t, e, n) {
                    function r(t, o) {
                        for (var a = t.results, s = 0; s < a.length; s++) {
                            var l = a[s],
                                u = null != l.children && !r({
                                    results: l.children
                                }, !0),
                                c = l.text === e.term;
                            if (c || u) return !o && (t.data = a, void n(t))
                        }
                        if (o) return !0;
                        var d = i.createTag(e);
                        if (null != d) {
                            var f = i.option(d);
                            f.attr("data-select2-tag", !0), i.addOptions([f]), i.insertTag(a, d)
                        }
                        t.results = a, n(t)
                    }
                    var i = this;
                    return this._removeOldTags(), null == e.term || null != e.page ? void t.call(this, e, n) : void t.call(this, e, r)
                }, e.prototype.createTag = function (e, n) {
                    var r = t.trim(n.term);
                    return "" === r ? null : {
                        id: r,
                        text: r
                    }
                }, e.prototype.insertTag = function (t, e, n) {
                    e.unshift(n)
                }, e.prototype._removeOldTags = function (e) {
                    var n = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                    n.each(function () {
                        this.selected || t(this).remove()
                    })
                }, e
            }), e.define("select2/data/tokenizer", ["jquery"], function (t) {
                function e(t, e, n) {
                    var r = n.get("tokenizer");
                    void 0 !== r && (this.tokenizer = r), t.call(this, e, n)
                }
                return e.prototype.bind = function (t, e, n) {
                    t.call(this, e, n), this.$search = e.dropdown.$search || e.selection.$search || n.find(".select2-search__field")
                }, e.prototype.query = function (t, e, n) {
                    function r(t) {
                        i.select(t)
                    }
                    var i = this;
                    e.term = e.term || "";
                    var o = this.tokenizer(e, this.options, r);
                    o.term !== e.term && (this.$search.length && (this.$search.val(o.term), this.$search.focus()), e.term = o.term), t.call(this, e, n)
                }, e.prototype.tokenizer = function (e, n, r, i) {
                    for (var o = r.get("tokenSeparators") || [], a = n.term, s = 0, l = this.createTag || function (t) {
                            return {
                                id: t.term,
                                text: t.term
                            }
                        }; s < a.length;) {
                        var u = a[s];
                        if (t.inArray(u, o) !== -1) {
                            var c = a.substr(0, s),
                                d = t.extend({}, n, {
                                    term: c
                                }),
                                f = l(d);
                            i(f), a = a.substr(s + 1) || "", s = 0
                        } else s++
                    }
                    return {
                        term: a
                    }
                }, e
            }), e.define("select2/data/minimumInputLength", [], function () {
                function t(t, e, n) {
                    this.minimumInputLength = n.get("minimumInputLength"), t.call(this, e, n)
                }
                return t.prototype.query = function (t, e, n) {
                    return e.term = e.term || "", e.term.length < this.minimumInputLength ? void this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {
                            minimum: this.minimumInputLength,
                            input: e.term,
                            params: e
                        }
                    }) : void t.call(this, e, n)
                }, t
            }), e.define("select2/data/maximumInputLength", [], function () {
                function t(t, e, n) {
                    this.maximumInputLength = n.get("maximumInputLength"), t.call(this, e, n)
                }
                return t.prototype.query = function (t, e, n) {
                    return e.term = e.term || "", this.maximumInputLength > 0 && e.term.length > this.maximumInputLength ? void this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {
                            maximum: this.maximumInputLength,
                            input: e.term,
                            params: e
                        }
                    }) : void t.call(this, e, n)
                }, t
            }), e.define("select2/data/maximumSelectionLength", [], function () {
                function t(t, e, n) {
                    this.maximumSelectionLength = n.get("maximumSelectionLength"), t.call(this, e, n)
                }
                return t.prototype.query = function (t, e, n) {
                    var r = this;
                    this.current(function (i) {
                        var o = null != i ? i.length : 0;
                        return r.maximumSelectionLength > 0 && o >= r.maximumSelectionLength ? void r.trigger("results:message", {
                            message: "maximumSelected",
                            args: {
                                maximum: r.maximumSelectionLength
                            }
                        }) : void t.call(r, e, n)
                    })
                }, t
            }), e.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
                function n(t, e) {
                    this.$element = t, this.options = e, n.__super__.constructor.call(this)
                }
                return e.Extend(n, e.Observable), n.prototype.render = function () {
                    var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                    return e.attr("dir", this.options.get("dir")), this.$dropdown = e, e
                }, n.prototype.position = function (t, e) {}, n.prototype.destroy = function () {
                    this.$dropdown.remove()
                }, n
            }), e.define("select2/dropdown/search", ["jquery", "../utils"], function (t, e) {
                function n() {}
                return n.prototype.render = function (e) {
                    var n = e.call(this),
                        r = t('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                    return this.$searchContainer = r, this.$search = r.find("input"), n.prepend(r), n
                }, n.prototype.bind = function (e, n, r) {
                    var i = this;
                    e.call(this, n, r), this.$search.on("keydown", function (t) {
                        i.trigger("keypress", t), i._keyUpPrevented = t.isDefaultPrevented()
                    }), this.$search.on("input", function (e) {
                        t(this).off("keyup")
                    }), this.$search.on("keyup input", function (t) {
                        i.handleSearch(t)
                    }), n.on("open", function () {
                        i.$search.attr("tabindex", 0), i.$search.focus(), window.setTimeout(function () {
                            i.$search.focus()
                        }, 0)
                    }), n.on("close", function () {
                        i.$search.attr("tabindex", -1), i.$search.val("")
                    }), n.on("results:all", function (t) {
                        if (null == t.query.term || "" === t.query.term) {
                            var e = i.showSearch(t);
                            e ? i.$searchContainer.removeClass("select2-search--hide") : i.$searchContainer.addClass("select2-search--hide")
                        }
                    })
                }, n.prototype.handleSearch = function (t) {
                    if (!this._keyUpPrevented) {
                        var e = this.$search.val();
                        this.trigger("query", {
                            term: e
                        })
                    }
                    this._keyUpPrevented = !1
                }, n.prototype.showSearch = function (t, e) {
                    return !0
                }, n
            }), e.define("select2/dropdown/hidePlaceholder", [], function () {
                function t(t, e, n, r) {
                    this.placeholder = this.normalizePlaceholder(n.get("placeholder")), t.call(this, e, n, r)
                }
                return t.prototype.append = function (t, e) {
                    e.results = this.removePlaceholder(e.results), t.call(this, e)
                }, t.prototype.normalizePlaceholder = function (t, e) {
                    return "string" == typeof e && (e = {
                        id: "",
                        text: e
                    }), e
                }, t.prototype.removePlaceholder = function (t, e) {
                    for (var n = e.slice(0), r = e.length - 1; r >= 0; r--) {
                        var i = e[r];
                        this.placeholder.id === i.id && n.splice(r, 1)
                    }
                    return n
                }, t
            }), e.define("select2/dropdown/infiniteScroll", ["jquery"], function (t) {
                function e(t, e, n, r) {
                    this.lastParams = {}, t.call(this, e, n, r), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                }
                return e.prototype.append = function (t, e) {
                    this.$loadingMore.remove(), this.loading = !1, t.call(this, e), this.showLoadingMore(e) && this.$results.append(this.$loadingMore)
                }, e.prototype.bind = function (e, n, r) {
                    var i = this;
                    e.call(this, n, r), n.on("query", function (t) {
                        i.lastParams = t, i.loading = !0
                    }), n.on("query:append", function (t) {
                        i.lastParams = t, i.loading = !0
                    }), this.$results.on("scroll", function () {
                        var e = t.contains(document.documentElement, i.$loadingMore[0]);
                        if (!i.loading && e) {
                            var n = i.$results.offset().top + i.$results.outerHeight(!1),
                                r = i.$loadingMore.offset().top + i.$loadingMore.outerHeight(!1);
                            n + 50 >= r && i.loadMore()
                        }
                    })
                }, e.prototype.loadMore = function () {
                    this.loading = !0;
                    var e = t.extend({}, {
                        page: 1
                    }, this.lastParams);
                    e.page++, this.trigger("query:append", e)
                }, e.prototype.showLoadingMore = function (t, e) {
                    return e.pagination && e.pagination.more
                }, e.prototype.createLoadingMore = function () {
                    var e = t('<li class="option load-more" role="treeitem"></li>'),
                        n = this.options.get("translations").get("loadingMore");
                    return e.html(n(this.lastParams)), e
                }, e
            }), e.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (t, e) {
                function n(t, e, n) {
                    this.$dropdownParent = n.get("dropdownParent") || document.body, t.call(this, e, n)
                }
                return n.prototype.bind = function (t, e, n) {
                    var r = this,
                        i = !1;
                    t.call(this, e, n), e.on("open", function () {
                        r._showDropdown(), r._attachPositioningHandler(e), i || (i = !0, e.on("results:all", function () {
                            r._positionDropdown(), r._resizeDropdown()
                        }), e.on("results:append", function () {
                            r._positionDropdown(), r._resizeDropdown()
                        }))
                    }), e.on("close", function () {
                        r._hideDropdown(), r._detachPositioningHandler(e)
                    }), this.$dropdownContainer.on("mousedown", function (t) {
                        t.stopPropagation()
                    })
                }, n.prototype.position = function (t, e, n) {
                    e.attr("class", n.attr("class")), e.removeClass("select2"), e.addClass("select2-container--open"), e.css({
                        position: "absolute",
                        top: -999999
                    }), this.$container = n
                }, n.prototype.render = function (e) {
                    var n = t("<span></span>"),
                        r = e.call(this);
                    return n.append(r), this.$dropdownContainer = n, n
                }, n.prototype._hideDropdown = function (t) {
                    this.$dropdownContainer.detach()
                }, n.prototype._attachPositioningHandler = function (n) {
                    var r = this,
                        i = "scroll.select2." + n.id,
                        o = "resize.select2." + n.id,
                        a = "orientationchange.select2." + n.id,
                        s = this.$container.parents().filter(e.hasScroll);
                    s.each(function () {
                        t(this).data("select2-scroll-position", {
                            x: t(this).scrollLeft(),
                            y: t(this).scrollTop()
                        })
                    }), s.on(i, function (e) {
                        var n = t(this).data("select2-scroll-position");
                        t(this).scrollTop(n.y)
                    }), t(window).on(i + " " + o + " " + a, function (t) {
                        r._positionDropdown(), r._resizeDropdown()
                    })
                }, n.prototype._detachPositioningHandler = function (n) {
                    var r = "scroll.select2." + n.id,
                        i = "resize.select2." + n.id,
                        o = "orientationchange.select2." + n.id,
                        a = this.$container.parents().filter(e.hasScroll);
                    a.off(r), t(window).off(r + " " + i + " " + o)
                }, n.prototype._positionDropdown = function () {
                    var e = t(window),
                        n = this.$dropdown.hasClass("select2-dropdown--above"),
                        r = this.$dropdown.hasClass("select2-dropdown--below"),
                        i = null,
                        o = (this.$container.position(), this.$container.offset());
                    o.bottom = o.top + this.$container.outerHeight(!1);
                    var a = {
                        height: this.$container.outerHeight(!1)
                    };
                    a.top = o.top, a.bottom = o.top + a.height;
                    var s = {
                            height: this.$dropdown.outerHeight(!1)
                        },
                        l = {
                            top: e.scrollTop(),
                            bottom: e.scrollTop() + e.height()
                        },
                        u = l.top < o.top - s.height,
                        c = l.bottom > o.bottom + s.height,
                        d = {
                            left: o.left,
                            top: a.bottom
                        };
                    n || r || (i = "below"), c || !u || n ? !u && c && n && (i = "below") : i = "above", ("above" == i || n && "below" !== i) && (d.top = a.top - s.height), null != i && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + i), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + i)), this.$dropdownContainer.css(d)
                }, n.prototype._resizeDropdown = function () {
                    this.$dropdownContainer.width();
                    var t = {
                        width: this.$container.outerWidth(!1) + "px"
                    };
                    this.options.get("dropdownAutoWidth") && (t.minWidth = t.width, t.width = "auto"), this.$dropdown.css(t)
                }, n.prototype._showDropdown = function (t) {
                    this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                }, n
            }), e.define("select2/dropdown/minimumResultsForSearch", [], function () {
                function t(e) {
                    for (var n = 0, r = 0; r < e.length; r++) {
                        var i = e[r];
                        i.children ? n += t(i.children) : n++
                    }
                    return n
                }

                function e(t, e, n, r) {
                    this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), t.call(this, e, n, r)
                }
                return e.prototype.showSearch = function (e, n) {
                    return !(t(n.data.results) < this.minimumResultsForSearch) && e.call(this, n)
                }, e
            }), e.define("select2/dropdown/selectOnClose", [], function () {
                function t() {}
                return t.prototype.bind = function (t, e, n) {
                    var r = this;
                    t.call(this, e, n), e.on("close", function () {
                        r._handleSelectOnClose()
                    })
                }, t.prototype._handleSelectOnClose = function () {
                    var t = this.getHighlightedResults();
                    t.length < 1 || this.trigger("select", {
                        data: t.data("data")
                    })
                }, t
            }), e.define("select2/dropdown/closeOnSelect", [], function () {
                function t() {}
                return t.prototype.bind = function (t, e, n) {
                    var r = this;
                    t.call(this, e, n), e.on("select", function (t) {
                        r._selectTriggered(t)
                    }), e.on("unselect", function (t) {
                        r._selectTriggered(t)
                    })
                }, t.prototype._selectTriggered = function (t, e) {
                    var n = e.originalEvent;
                    n && n.ctrlKey || this.trigger("close")
                }, t
            }), e.define("select2/i18n/en", [], function () {
                return {
                    errorLoading: function () {
                        return "The results could not be loaded."
                    },
                    inputTooLong: function (t) {
                        var e = t.input.length - t.maximum,
                            n = "Please delete " + e + " character";
                        return 1 != e && (n += "s"), n
                    },
                    inputTooShort: function (t) {
                        var e = t.minimum - t.input.length,
                            n = "Please enter " + e + " or more characters";
                        return n
                    },
                    loadingMore: function () {
                        return "Loading more results…"
                    },
                    maximumSelected: function (t) {
                        var e = "You can only select " + t.maximum + " item";
                        return 1 != t.maximum && (e += "s"), e
                    },
                    noResults: function () {
                        return "No results found"
                    },
                    searching: function () {
                        return "Searching…"
                    }
                }
            }), e.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (t, e, n, r, i, o, a, s, l, u, c, d, f, p, h, g, v, m, y, b, w, x, S, T, C, D, _, A, $) {
                function E() {
                    this.reset()
                }
                E.prototype.apply = function (d) {
                    if (d = t.extend({}, this.defaults, d), null == d.dataAdapter) {
                        if (null != d.ajax ? d.dataAdapter = h : null != d.data ? d.dataAdapter = p : d.dataAdapter = f, d.minimumInputLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, m)), d.maximumInputLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, y)), d.maximumSelectionLength > 0 && (d.dataAdapter = u.Decorate(d.dataAdapter, b)), d.tags && (d.dataAdapter = u.Decorate(d.dataAdapter, g)), null == d.tokenSeparators && null == d.tokenizer || (d.dataAdapter = u.Decorate(d.dataAdapter, v)), null != d.query) {
                            var $ = e(d.amdBase + "compat/query");
                            d.dataAdapter = u.Decorate(d.dataAdapter, $)
                        }
                        if (null != d.initSelection) {
                            var E = e(d.amdBase + "compat/initSelection");
                            d.dataAdapter = u.Decorate(d.dataAdapter, E)
                        }
                    }
                    if (null == d.resultsAdapter && (d.resultsAdapter = n, null != d.ajax && (d.resultsAdapter = u.Decorate(d.resultsAdapter, T)), null != d.placeholder && (d.resultsAdapter = u.Decorate(d.resultsAdapter, S)), d.selectOnClose && (d.resultsAdapter = u.Decorate(d.resultsAdapter, _))), null == d.dropdownAdapter) {
                        if (d.multiple) d.dropdownAdapter = w;
                        else {
                            var I = u.Decorate(w, x);
                            d.dropdownAdapter = I
                        }
                        if (0 !== d.minimumResultsForSearch && (d.dropdownAdapter = u.Decorate(d.dropdownAdapter, D)), d.closeOnSelect && (d.dropdownAdapter = u.Decorate(d.dropdownAdapter, A)), null != d.dropdownCssClass || null != d.dropdownCss || null != d.adaptDropdownCssClass) {
                            var k = e(d.amdBase + "compat/dropdownCss");
                            d.dropdownAdapter = u.Decorate(d.dropdownAdapter, k)
                        }
                        d.dropdownAdapter = u.Decorate(d.dropdownAdapter, C)
                    }
                    if (null == d.selectionAdapter) {
                        if (d.multiple ? d.selectionAdapter = i : d.selectionAdapter = r, null != d.placeholder && (d.selectionAdapter = u.Decorate(d.selectionAdapter, o)), d.allowClear && (d.selectionAdapter = u.Decorate(d.selectionAdapter, a)), d.multiple && (d.selectionAdapter = u.Decorate(d.selectionAdapter, s)), null != d.containerCssClass || null != d.containerCss || null != d.adaptContainerCssClass) {
                            var j = e(d.amdBase + "compat/containerCss");
                            d.selectionAdapter = u.Decorate(d.selectionAdapter, j)
                        }
                        d.selectionAdapter = u.Decorate(d.selectionAdapter, l)
                    }
                    if ("string" == typeof d.language)
                        if (d.language.indexOf("-") > 0) {
                            var N = d.language.split("-"),
                                O = N[0];
                            d.language = [d.language, O]
                        } else d.language = [d.language];
                    if (t.isArray(d.language)) {
                        var L = new c;
                        d.language.push("en");
                        for (var R = d.language, P = 0; P < R.length; P++) {
                            var F = R[P],
                                H = {};
                            try {
                                H = c.loadPath(F)
                            } catch (q) {
                                try {
                                    F = this.defaults.amdLanguageBase + F, H = c.loadPath(F)
                                } catch (M) {
                                    d.debug && window.console && console.warn && console.warn('Select2: The language file for "' + F + '" could not be automatically loaded. A fallback will be used instead.');
                                    continue
                                }
                            }
                            L.extend(H)
                        }
                        d.translations = L
                    } else {
                        var U = c.loadPath(this.defaults.amdLanguageBase + "en"),
                            W = new c(d.language);
                        W.extend(U), d.translations = W
                    }
                    return d
                }, E.prototype.reset = function () {
                    function e(t) {
                        function e(t) {
                            return d[t] || t
                        }
                        return t.replace(/[^\u0000-\u007E]/g, e)
                    }

                    function n(r, i) {
                        if ("" === t.trim(r.term)) return i;
                        if (i.children && i.children.length > 0) {
                            for (var o = t.extend(!0, {}, i), a = i.children.length - 1; a >= 0; a--) {
                                var s = i.children[a],
                                    l = n(r, s);
                                null == l && o.children.splice(a, 1)
                            }
                            return o.children.length > 0 ? o : n(r, o)
                        }
                        var u = e(i.text).toUpperCase(),
                            c = e(r.term).toUpperCase();
                        return u.indexOf(c) > -1 ? i : null
                    }
                    this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: !0,
                        debug: !1,
                        dropdownAutoWidth: !1,
                        escapeMarkup: u.escapeMarkup,
                        language: $,
                        matcher: n,
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: !1,
                        sorter: function (t) {
                            return t
                        },
                        templateResult: function (t) {
                            return t.text
                        },
                        templateSelection: function (t) {
                            return t.text
                        },
                        theme: "default",
                        width: "resolve"
                    }
                }, E.prototype.set = function (e, n) {
                    var r = t.camelCase(e),
                        i = {};
                    i[r] = n;
                    var o = u._convertData(i);
                    t.extend(this.defaults, o)
                };
                var I = new E;
                return I
            }), e.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (t, e, n, r) {
                function i(e, i) {
                    if (this.options = e, null != i && this.fromElement(i), this.options = n.apply(this.options), i && i.is("input")) {
                        var o = t(this.get("amdBase") + "compat/inputData");
                        this.options.dataAdapter = r.Decorate(this.options.dataAdapter, o)
                    }
                }
                return i.prototype.fromElement = function (t) {
                    var n = ["select2"];
                    null == this.options.multiple && (this.options.multiple = t.prop("multiple")), null == this.options.disabled && (this.options.disabled = t.prop("disabled")), null == this.options.language && (t.prop("lang") ? this.options.language = t.prop("lang").toLowerCase() : t.closest("[lang]").prop("lang") && (this.options.language = t.closest("[lang]").prop("lang"))), null == this.options.dir && (t.prop("dir") ? this.options.dir = t.prop("dir") : t.closest("[dir]").prop("dir") ? this.options.dir = t.closest("[dir]").prop("dir") : this.options.dir = "ltr"), t.prop("disabled", this.options.disabled), t.prop("multiple", this.options.multiple), t.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), t.data("data", t.data("select2Tags")), t.data("tags", !0)), t.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), t.attr("ajax--url", t.data("ajaxUrl")), t.data("ajax--url", t.data("ajaxUrl")));
                    var i = {};
                    i = e.fn.jquery && "1." == e.fn.jquery.substr(0, 2) && t[0].dataset ? e.extend(!0, {}, t[0].dataset, t.data()) : t.data();
                    var o = e.extend(!0, {}, i);
                    o = r._convertData(o);
                    for (var a in o) e.inArray(a, n) > -1 || (e.isPlainObject(this.options[a]) ? e.extend(this.options[a], o[a]) : this.options[a] = o[a]);
                    return this
                }, i.prototype.get = function (t) {
                    return this.options[t]
                }, i.prototype.set = function (t, e) {
                    this.options[t] = e
                }, i
            }), e.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (t, e, n, r) {
                var i = function (t, n) {
                    null != t.data("select2") && t.data("select2").destroy(), this.$element = t, this.id = this._generateId(t), n = n || {}, this.options = new e(n, t), i.__super__.constructor.call(this);
                    var r = t.attr("tabindex") || 0;
                    t.data("old-tabindex", r), t.attr("tabindex", "-1");
                    var o = this.options.get("dataAdapter");
                    this.dataAdapter = new o(t, this.options);
                    var a = this.render();
                    this._placeContainer(a);
                    var s = this.options.get("selectionAdapter");
                    this.selection = new s(t, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, a);
                    var l = this.options.get("dropdownAdapter");
                    this.dropdown = new l(t, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, a);
                    var u = this.options.get("resultsAdapter");
                    this.results = new u(t, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                    var c = this;
                    this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (t) {
                        c.trigger("selection:update", {
                            data: t
                        })
                    }), t.addClass("select2-hidden-accessible"), t.attr("aria-hidden", "true"), this._syncAttributes(), t.data("select2", this)
                };
                return n.Extend(i, n.Observable), i.prototype._generateId = function (t) {
                    var e = "";
                    return e = null != t.attr("id") ? t.attr("id") : null != t.attr("name") ? t.attr("name") + "-" + n.generateChars(2) : n.generateChars(4), e = "select2-" + e
                }, i.prototype._placeContainer = function (t) {
                    t.insertAfter(this.$element);
                    var e = this._resolveWidth(this.$element, this.options.get("width"));
                    null != e && t.css("width", e)
                }, i.prototype._resolveWidth = function (t, e) {
                    var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                    if ("resolve" == e) {
                        var r = this._resolveWidth(t, "style");
                        return null != r ? r : this._resolveWidth(t, "element")
                    }
                    if ("element" == e) {
                        var i = t.outerWidth(!1);
                        return i <= 0 ? "auto" : i + "px"
                    }
                    if ("style" == e) {
                        var o = t.attr("style");
                        if ("string" != typeof o) return null;
                        for (var a = o.split(";"), s = 0, l = a.length; s < l; s += 1) {
                            var u = a[s].replace(/\s/g, ""),
                                c = u.match(n);
                            if (null !== c && c.length >= 1) return c[1]
                        }
                        return null
                    }
                    return e
                }, i.prototype._bindAdapters = function () {
                    this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                }, i.prototype._registerDomEvents = function () {
                    var e = this;
                    this.$element.on("change.select2", function () {
                        e.dataAdapter.current(function (t) {
                            e.trigger("selection:update", {
                                data: t
                            })
                        })
                    }), this._sync = n.bind(this._syncAttributes, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._sync);
                    var r = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    null != r ? (this._observer = new r(function (n) {
                        t.each(n, e._sync)
                    }), this._observer.observe(this.$element[0], {
                        attributes: !0,
                        subtree: !1
                    })) : this.$element[0].addEventListener && this.$element[0].addEventListener("DOMAttrModified", e._sync, !1)
                }, i.prototype._registerDataEvents = function () {
                    var t = this;
                    this.dataAdapter.on("*", function (e, n) {
                        t.trigger(e, n)
                    })
                }, i.prototype._registerSelectionEvents = function () {
                    var e = this,
                        n = ["toggle"];
                    this.selection.on("toggle", function () {
                        e.toggleDropdown()
                    }), this.selection.on("*", function (r, i) {
                        t.inArray(r, n) === -1 && e.trigger(r, i)
                    })
                }, i.prototype._registerDropdownEvents = function () {
                    var t = this;
                    this.dropdown.on("*", function (e, n) {
                        t.trigger(e, n)
                    })
                }, i.prototype._registerResultsEvents = function () {
                    var t = this;
                    this.results.on("*", function (e, n) {
                        t.trigger(e, n)
                    })
                }, i.prototype._registerEvents = function () {
                    var t = this;
                    this.on("open", function () {
                        t.$container.addClass("select2-container--open")
                    }), this.on("close", function () {
                        t.$container.removeClass("select2-container--open")
                    }), this.on("enable", function () {
                        t.$container.removeClass("select2-container--disabled")
                    }), this.on("disable", function () {
                        t.$container.addClass("select2-container--disabled")
                    }), this.on("focus", function () {
                        t.$container.addClass("select2-container--focus")
                    }), this.on("blur", function () {
                        t.$container.removeClass("select2-container--focus")
                    }), this.on("query", function (e) {
                        t.isOpen() || t.trigger("open"), this.dataAdapter.query(e, function (n) {
                            t.trigger("results:all", {
                                data: n,
                                query: e
                            })
                        })
                    }), this.on("query:append", function (e) {
                        this.dataAdapter.query(e, function (n) {
                            t.trigger("results:append", {
                                data: n,
                                query: e
                            })
                        })
                    }), this.on("keypress", function (e) {
                        var n = e.which;
                        t.isOpen() ? n === r.ENTER ? (t.trigger("results:select"), e.preventDefault()) : n === r.SPACE && e.ctrlKey ? (t.trigger("results:toggle"), e.preventDefault()) : n === r.UP ? (t.trigger("results:previous"), e.preventDefault()) : n === r.DOWN ? (t.trigger("results:next"), e.preventDefault()) : n !== r.ESC && n !== r.TAB || (t.close(), e.preventDefault()) : (n === r.ENTER || n === r.SPACE || (n === r.DOWN || n === r.UP) && e.altKey) && (t.open(), e.preventDefault())
                    })
                }, i.prototype._syncAttributes = function () {
                    this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable")) : this.trigger("enable")
                }, i.prototype.trigger = function (t, e) {
                    var n = i.__super__.trigger,
                        r = {
                            open: "opening",
                            close: "closing",
                            select: "selecting",
                            unselect: "unselecting"
                        };
                    if (t in r) {
                        var o = r[t],
                            a = {
                                prevented: !1,
                                name: t,
                                args: e
                            };
                        if (n.call(this, o, a), a.prevented) return void(e.prevented = !0)
                    }
                    n.call(this, t, e)
                }, i.prototype.toggleDropdown = function () {
                    this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                }, i.prototype.open = function () {
                    this.isOpen() || (this.trigger("query", {}), this.trigger("open"))
                }, i.prototype.close = function () {
                    this.isOpen() && this.trigger("close")
                }, i.prototype.isOpen = function () {
                    return this.$container.hasClass("select2-container--open")
                }, i.prototype.enable = function (t) {
                    this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != t && 0 !== t.length || (t = [!0]);
                    var e = !t[0];
                    this.$element.prop("disabled", e)
                }, i.prototype.data = function () {
                    this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                    var t = [];
                    return this.dataAdapter.current(function (e) {
                        t = e
                    }), t
                }, i.prototype.val = function (e) {
                    if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length) return this.$element.val();
                    var n = e[0];
                    t.isArray(n) && (n = t.map(n, function (t) {
                        return t.toString()
                    })), this.$element.val(n).trigger("change")
                }, i.prototype.destroy = function () {
                    this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._sync), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && this.$element[0].removeEventListener("DOMAttrModified", this._sync, !1), this._sync = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                }, i.prototype.render = function () {
                    var e = t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                    return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container.addClass("select2-container--" + this.options.get("theme")), e.data("element", this.$element), e
                }, i
            }), e.define("jquery.select2", ["jquery", "require", "./select2/core", "./select2/defaults"], function (t, e, n, r) {
                if (e("jquery.mousewheel"), null == t.fn.select2) {
                    var i = ["open", "close", "destroy"];
                    t.fn.select2 = function (e) {
                        if (e = e || {}, "object" == typeof e) return this.each(function () {
                            var r = t.extend({}, e, !0);
                            new n(t(this), r)
                        }), this;
                        if ("string" == typeof e) {
                            var r = this.data("select2");
                            null == r && window.console && console.error && console.error("The select2('" + e + "') method was called on an element that is not using Select2.");
                            var o = Array.prototype.slice.call(arguments, 1),
                                a = r[e](o);
                            return t.inArray(e, i) > -1 ? this : a
                        }
                        throw new Error("Invalid arguments for Select2: " + e)
                    }
                }
                return null == t.fn.select2.defaults && (t.fn.select2.defaults = r), n
            }), e.define("jquery.mousewheel", ["jquery"], function (t) {
                return t
            }), {
                define: e.define,
                require: e.require
            }
        }(),
        n = e.require("jquery.select2");
    return t.fn.select2.amd = e, n
}),
function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = function (e, n) {
        return e || (e = window), n || (n = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(n, e, e.document)
    } : t(jQuery, window, document)
}(function (t, e, n, r) {
    function i(e) {
        var n, r, o = {};
        t.each(e, function (t) {
            (n = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(n[1] + " ") && (r = t.replace(n[0], n[2].toLowerCase()), o[r] = t, "o" === n[1] && i(e[t]))
        }), e._hungarianMap = o
    }

    function o(e, n, a) {
        e._hungarianMap || i(e);
        var s;
        t.each(n, function (i) {
            s = e._hungarianMap[i], s === r || !a && n[s] !== r || ("o" === s.charAt(0) ? (n[s] || (n[s] = {}), t.extend(!0, n[s], n[i]), o(e[s], n[s], a)) : n[s] = n[i])
        })
    }

    function a(t) {
        var e = Vt.defaults.oLanguage,
            n = t.sZeroRecords;
        !t.sEmptyTable && n && "No data available in table" === e.sEmptyTable && kt(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && n && "Loading..." === e.sLoadingRecords && kt(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands && (t.sThousands = t.sInfoThousands), (t = t.sDecimal) && qt(t)
    }

    function s(t) {
        if (ue(t, "ordering", "bSort"), ue(t, "orderMulti", "bSortMulti"), ue(t, "orderClasses", "bSortClasses"), ue(t, "orderCellsTop", "bSortCellsTop"), ue(t, "order", "aaSorting"), ue(t, "orderFixed", "aaSortingFixed"), ue(t, "paging", "bPaginate"), ue(t, "pagingType", "sPaginationType"), ue(t, "pageLength", "iDisplayLength"), ue(t, "searching", "bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : ""), t = t.aoSearchCols)
            for (var e = 0, n = t.length; e < n; e++) t[e] && o(Vt.models.oSearch, t[e])
    }

    function l(e) {
        ue(e, "orderable", "bSortable"), ue(e, "orderData", "aDataSort"), ue(e, "orderSequence", "asSorting"), ue(e, "orderDataType", "sortDataType");
        var n = e.aDataSort;
        n && !t.isArray(n) && (e.aDataSort = [n])
    }

    function u(n) {
        if (!Vt.__browser) {
            var r = {};
            Vt.__browser = r;
            var i = t("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: -1 * t(e).scrollLeft(),
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(t("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(t("<div/>").css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                o = i.children(),
                a = o.children();
            r.barWidth = o[0].offsetWidth - o[0].clientWidth, r.bScrollOversize = 100 === a[0].offsetWidth && 100 !== o[0].clientWidth, r.bScrollbarLeft = 1 !== Math.round(a.offset().left), r.bBounding = !!i[0].getBoundingClientRect().width, i.remove()
        }
        t.extend(n.oBrowser, Vt.__browser), n.oScroll.iBarWidth = Vt.__browser.barWidth
    }

    function c(t, e, n, i, o, a) {
        var s, l = !1;
        for (n !== r && (s = n, l = !0); i !== o;) t.hasOwnProperty(i) && (s = l ? e(s, t[i], i, t) : t[i], l = !0, i += a);
        return s
    }

    function d(e, r) {
        var i = Vt.defaults.column,
            o = e.aoColumns.length,
            i = t.extend({}, Vt.models.oColumn, i, {
                nTh: r ? r : n.createElement("th"),
                sTitle: i.sTitle ? i.sTitle : r ? r.innerHTML : "",
                aDataSort: i.aDataSort ? i.aDataSort : [o],
                mData: i.mData ? i.mData : o,
                idx: o
            });
        e.aoColumns.push(i), i = e.aoPreSearchCols, i[o] = t.extend({}, Vt.models.oSearch, i[o]), f(e, o, t(r).data())
    }

    function f(e, n, i) {
        var n = e.aoColumns[n],
            a = e.oClasses,
            s = t(n.nTh);
        if (!n.sWidthOrig) {
            n.sWidthOrig = s.attr("width") || null;
            var u = (s.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            u && (n.sWidthOrig = u[1])
        }
        i !== r && null !== i && (l(i), o(Vt.defaults.column, i), i.mDataProp !== r && !i.mData && (i.mData = i.mDataProp), i.sType && (n._sManualType = i.sType), i.className && !i.sClass && (i.sClass = i.className), t.extend(n, i), kt(n, i, "sWidth", "sWidthOrig"), i.iDataSort !== r && (n.aDataSort = [i.iDataSort]), kt(n, i, "aDataSort"));
        var c = n.mData,
            d = D(c),
            f = n.mRender ? D(n.mRender) : null,
            i = function (t) {
                return "string" == typeof t && -1 !== t.indexOf("@")
            };
        n._bAttrSrc = t.isPlainObject(c) && (i(c.sort) || i(c.type) || i(c.filter)), n._setter = null, n.fnGetData = function (t, e, n) {
            var i = d(t, e, r, n);
            return f && e ? f(i, e, t, n) : i
        }, n.fnSetData = function (t, e, n) {
            return _(c)(t, e, n)
        }, "number" != typeof c && (e._rowReadObject = !0), e.oFeatures.bSort || (n.bSortable = !1, s.addClass(a.sSortableNone)), e = -1 !== t.inArray("asc", n.asSorting), i = -1 !== t.inArray("desc", n.asSorting), n.bSortable && (e || i) ? e && !i ? (n.sSortingClass = a.sSortableAsc, n.sSortingClassJUI = a.sSortJUIAscAllowed) : !e && i ? (n.sSortingClass = a.sSortableDesc, n.sSortingClassJUI = a.sSortJUIDescAllowed) : (n.sSortingClass = a.sSortable, n.sSortingClassJUI = a.sSortJUI) : (n.sSortingClass = a.sSortableNone, n.sSortingClassJUI = "")
    }

    function p(t) {
        if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            gt(t);
            for (var n = 0, r = e.length; n < r; n++) e[n].nTh.style.width = e[n].sWidth
        }
        e = t.oScroll, ("" !== e.sY || "" !== e.sX) && pt(t), Lt(t, null, "column-sizing", [t])
    }

    function h(t, e) {
        var n = m(t, "bVisible");
        return "number" == typeof n[e] ? n[e] : null
    }

    function g(e, n) {
        var r = m(e, "bVisible"),
            r = t.inArray(n, r);
        return -1 !== r ? r : null
    }

    function v(e) {
        var n = 0;
        return t.each(e.aoColumns, function (e, r) {
            r.bVisible && "none" !== t(r.nTh).css("display") && n++
        }), n
    }

    function m(e, n) {
        var r = [];
        return t.map(e.aoColumns, function (t, e) {
            t[n] && r.push(e)
        }), r
    }

    function y(t) {
        var e, n, i, o, a, s, l, u, c, d = t.aoColumns,
            f = t.aoData,
            p = Vt.ext.type.detect;
        for (e = 0, n = d.length; e < n; e++)
            if (l = d[e], c = [], !l.sType && l._sManualType) l.sType = l._sManualType;
            else if (!l.sType) {
            for (i = 0, o = p.length; i < o; i++) {
                for (a = 0, s = f.length; a < s && (c[a] === r && (c[a] = S(t, a, e, "type")), u = p[i](c[a], t), u || i === p.length - 1) && "html" !== u; a++);
                if (u) {
                    l.sType = u;
                    break
                }
            }
            l.sType || (l.sType = "string")
        }
    }

    function b(e, n, i, o) {
        var a, s, l, u, c, f, p = e.aoColumns;
        if (n)
            for (a = n.length - 1; 0 <= a; a--) {
                f = n[a];
                var h = f.targets !== r ? f.targets : f.aTargets;
                for (t.isArray(h) || (h = [h]), s = 0, l = h.length; s < l; s++)
                    if ("number" == typeof h[s] && 0 <= h[s]) {
                        for (; p.length <= h[s];) d(e);
                        o(h[s], f)
                    } else if ("number" == typeof h[s] && 0 > h[s]) o(p.length + h[s], f);
                else if ("string" == typeof h[s])
                    for (u = 0, c = p.length; u < c; u++)("_all" == h[s] || t(p[u].nTh).hasClass(h[s])) && o(u, f)
            }
        if (i)
            for (a = 0, e = i.length; a < e; a++) o(a, i[a])
    }

    function w(e, n, i, o) {
        var a = e.aoData.length,
            s = t.extend(!0, {}, Vt.models.oRow, {
                src: i ? "dom" : "data",
                idx: a
            });
        s._aData = n, e.aoData.push(s);
        for (var l = e.aoColumns, u = 0, c = l.length; u < c; u++) l[u].sType = null;
        return e.aiDisplayMaster.push(a), n = e.rowIdFn(n), n !== r && (e.aIds[n] = s), (i || !e.oFeatures.bDeferRender) && j(e, a, i, o), a
    }

    function x(e, n) {
        var r;
        return n instanceof t || (n = t(n)), n.map(function (t, n) {
            return r = k(e, n), w(e, r.data, n, r.cells)
        })
    }

    function S(t, e, n, i) {
        var o = t.iDraw,
            a = t.aoColumns[n],
            s = t.aoData[e]._aData,
            l = a.sDefaultContent,
            u = a.fnGetData(s, i, {
                settings: t,
                row: e,
                col: n
            });
        if (u === r) return t.iDrawError != o && null === l && (It(t, 0, "Requested unknown parameter " + ("function" == typeof a.mData ? "{function}" : "'" + a.mData + "'") + " for row " + e + ", column " + n, 4), t.iDrawError = o), l;
        if (u !== s && null !== u || null === l || i === r) {
            if ("function" == typeof u) return u.call(s)
        } else u = l;
        return null === u && "display" == i ? "" : u
    }

    function T(t, e, n, r) {
        t.aoColumns[n].fnSetData(t.aoData[e]._aData, r, {
            settings: t,
            row: e,
            col: n
        })
    }

    function C(e) {
        return t.map(e.match(/(\\.|[^\.])+/g) || [""], function (t) {
            return t.replace(/\\\./g, ".")
        })
    }

    function D(e) {
        if (t.isPlainObject(e)) {
            var n = {};
            return t.each(e, function (t, e) {
                    e && (n[t] = D(e))
                }),
                function (t, e, i, o) {
                    var a = n[e] || n._;
                    return a !== r ? a(t, e, i, o) : t
                }
        }
        if (null === e) return function (t) {
            return t
        };
        if ("function" == typeof e) return function (t, n, r, i) {
            return e(t, n, r, i)
        };
        if ("string" == typeof e && (-1 !== e.indexOf(".") || -1 !== e.indexOf("[") || -1 !== e.indexOf("("))) {
            var i = function (e, n, o) {
                var a, s;
                if ("" !== o) {
                    s = C(o);
                    for (var l = 0, u = s.length; l < u; l++) {
                        if (o = s[l].match(ce), a = s[l].match(de), o) {
                            if (s[l] = s[l].replace(ce, ""), "" !== s[l] && (e = e[s[l]]), a = [], s.splice(0, l + 1), s = s.join("."), t.isArray(e))
                                for (l = 0, u = e.length; l < u; l++) a.push(i(e[l], n, s));
                            e = o[0].substring(1, o[0].length - 1), e = "" === e ? a : a.join(e);
                            break
                        }
                        if (a) s[l] = s[l].replace(de, ""), e = e[s[l]]();
                        else {
                            if (null === e || e[s[l]] === r) return r;
                            e = e[s[l]]
                        }
                    }
                }
                return e
            };
            return function (t, n) {
                return i(t, n, e)
            }
        }
        return function (t) {
            return t[e]
        }
    }

    function _(e) {
        if (t.isPlainObject(e)) return _(e._);
        if (null === e) return function () {};
        if ("function" == typeof e) return function (t, n, r) {
            e(t, "set", n, r)
        };
        if ("string" == typeof e && (-1 !== e.indexOf(".") || -1 !== e.indexOf("[") || -1 !== e.indexOf("("))) {
            var n = function (e, i, o) {
                var a, o = C(o);
                a = o[o.length - 1];
                for (var s, l, u = 0, c = o.length - 1; u < c; u++) {
                    if (s = o[u].match(ce), l = o[u].match(de), s) {
                        if (o[u] = o[u].replace(ce, ""), e[o[u]] = [], a = o.slice(), a.splice(0, u + 1), s = a.join("."), t.isArray(i))
                            for (l = 0, c = i.length; l < c; l++) a = {}, n(a, i[l], s), e[o[u]].push(a);
                        else e[o[u]] = i;
                        return
                    }
                    l && (o[u] = o[u].replace(de, ""), e = e[o[u]](i)), null !== e[o[u]] && e[o[u]] !== r || (e[o[u]] = {}), e = e[o[u]]
                }
                a.match(de) ? e[a.replace(de, "")](i) : e[a.replace(ce, "")] = i
            };
            return function (t, r) {
                return n(t, r, e)
            }
        }
        return function (t, n) {
            t[e] = n
        }
    }

    function A(t) {
        return ie(t.aoData, "_aData")
    }

    function $(t) {
        t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}
    }

    function E(t, e, n) {
        for (var i = -1, o = 0, a = t.length; o < a; o++) t[o] == e ? i = o : t[o] > e && t[o]--; - 1 != i && n === r && t.splice(i, 1)
    }

    function I(t, e, n, i) {
        var o, a = t.aoData[e],
            s = function (n, r) {
                for (; n.childNodes.length;) n.removeChild(n.firstChild);
                n.innerHTML = S(t, e, r, "display")
            };
        if ("dom" !== n && (n && "auto" !== n || "dom" !== a.src)) {
            var l = a.anCells;
            if (l)
                if (i !== r) s(l[i], i);
                else
                    for (n = 0, o = l.length; n < o; n++) s(l[n], n)
        } else a._aData = k(t, a, i, i === r ? r : a._aData).data;
        if (a._aSortData = null, a._aFilterData = null, s = t.aoColumns, i !== r) s[i].sType = null;
        else {
            for (n = 0, o = s.length; n < o; n++) s[n].sType = null;
            N(t, a)
        }
    }

    function k(e, n, i, o) {
        var a, s, l, u = [],
            c = n.firstChild,
            d = 0,
            f = e.aoColumns,
            p = e._rowReadObject,
            o = o !== r ? o : p ? {} : [],
            h = function (t, e) {
                if ("string" == typeof t) {
                    var n = t.indexOf("@"); - 1 !== n && (n = t.substring(n + 1), _(t)(o, e.getAttribute(n)))
                }
            },
            g = function (e) {
                i !== r && i !== d || (s = f[d], l = t.trim(e.innerHTML), s && s._bAttrSrc ? (_(s.mData._)(o, l), h(s.mData.sort, e), h(s.mData.type, e), h(s.mData.filter, e)) : p ? (s._setter || (s._setter = _(s.mData)), s._setter(o, l)) : o[d] = l), d++
            };
        if (c)
            for (; c;) a = c.nodeName.toUpperCase(), "TD" != a && "TH" != a || (g(c), u.push(c)), c = c.nextSibling;
        else
            for (u = n.anCells, c = 0, a = u.length; c < a; c++) g(u[c]);
        return (n = n.firstChild ? n : n.nTr) && (n = n.getAttribute("id")) && _(e.rowId)(o, n), {
            data: o,
            cells: u
        }
    }

    function j(e, r, i, o) {
        var a, s, l, u, c, d = e.aoData[r],
            f = d._aData,
            p = [];
        if (null === d.nTr) {
            for (a = i || n.createElement("tr"), d.nTr = a, d.anCells = p, a._DT_RowIndex = r, N(e, d), u = 0, c = e.aoColumns.length; u < c; u++) l = e.aoColumns[u], s = i ? o[u] : n.createElement(l.sCellType), s._DT_CellIndex = {
                row: r,
                column: u
            }, p.push(s), i && !l.mRender && l.mData === u || t.isPlainObject(l.mData) && l.mData._ === u + ".display" || (s.innerHTML = S(e, r, u, "display")), l.sClass && (s.className += " " + l.sClass), l.bVisible && !i ? a.appendChild(s) : !l.bVisible && i && s.parentNode.removeChild(s), l.fnCreatedCell && l.fnCreatedCell.call(e.oInstance, s, S(e, r, u), f, r, u);
            Lt(e, "aoRowCreatedCallback", null, [a, f, r])
        }
        d.nTr.setAttribute("role", "row")
    }

    function N(e, n) {
        var r = n.nTr,
            i = n._aData;
        if (r) {
            var o = e.rowIdFn(i);
            o && (r.id = o), i.DT_RowClass && (o = i.DT_RowClass.split(" "), n.__rowc = n.__rowc ? le(n.__rowc.concat(o)) : o, t(r).removeClass(n.__rowc.join(" ")).addClass(i.DT_RowClass)), i.DT_RowAttr && t(r).attr(i.DT_RowAttr), i.DT_RowData && t(r).data(i.DT_RowData)
        }
    }

    function O(e) {
        var n, r, i, o, a, s = e.nTHead,
            l = e.nTFoot,
            u = 0 === t("th, td", s).length,
            c = e.oClasses,
            d = e.aoColumns;
        for (u && (o = t("<tr/>").appendTo(s)), n = 0, r = d.length; n < r; n++) a = d[n], i = t(a.nTh).addClass(a.sClass), u && i.appendTo(o), e.oFeatures.bSort && (i.addClass(a.sSortingClass), !1 !== a.bSortable && (i.attr("tabindex", e.iTabIndex).attr("aria-controls", e.sTableId), Ct(e, a.nTh, n))), a.sTitle != i[0].innerHTML && i.html(a.sTitle), Pt(e, "header")(e, i, a, c);
        if (u && H(e.aoHeader, s), t(s).find(">tr").attr("role", "row"), t(s).find(">tr>th, >tr>td").addClass(c.sHeaderTH), t(l).find(">tr>th, >tr>td").addClass(c.sFooterTH), null !== l)
            for (e = e.aoFooter[0], n = 0, r = e.length; n < r; n++) a = d[n], a.nTf = e[n].cell, a.sClass && t(a.nTf).addClass(a.sClass)
    }

    function L(e, n, i) {
        var o, a, s, l, u = [],
            c = [],
            d = e.aoColumns.length;
        if (n) {
            for (i === r && (i = !1), o = 0, a = n.length; o < a; o++) {
                for (u[o] = n[o].slice(), u[o].nTr = n[o].nTr, s = d - 1; 0 <= s; s--) !e.aoColumns[s].bVisible && !i && u[o].splice(s, 1);
                c.push([])
            }
            for (o = 0, a = u.length; o < a; o++) {
                if (e = u[o].nTr)
                    for (; s = e.firstChild;) e.removeChild(s);
                for (s = 0, n = u[o].length; s < n; s++)
                    if (l = d = 1, c[o][s] === r) {
                        for (e.appendChild(u[o][s].cell), c[o][s] = 1; u[o + d] !== r && u[o][s].cell == u[o + d][s].cell;) c[o + d][s] = 1, d++;
                        for (; u[o][s + l] !== r && u[o][s].cell == u[o][s + l].cell;) {
                            for (i = 0; i < d; i++) c[o + i][s + l] = 1;
                            l++
                        }
                        t(u[o][s].cell).attr("rowspan", d).attr("colspan", l)
                    }
            }
        }
    }

    function R(e) {
        var n = Lt(e, "aoPreDrawCallback", "preDraw", [e]);
        if (-1 !== t.inArray(!1, n)) dt(e, !1);
        else {
            var n = [],
                i = 0,
                o = e.asStripeClasses,
                a = o.length,
                s = e.oLanguage,
                l = e.iInitDisplayStart,
                u = "ssp" == Ft(e),
                c = e.aiDisplay;
            e.bDrawing = !0, l !== r && -1 !== l && (e._iDisplayStart = u ? l : l >= e.fnRecordsDisplay() ? 0 : l, e.iInitDisplayStart = -1);
            var l = e._iDisplayStart,
                d = e.fnDisplayEnd();
            if (e.bDeferLoading) e.bDeferLoading = !1, e.iDraw++, dt(e, !1);
            else if (u) {
                if (!e.bDestroying && !U(e)) return
            } else e.iDraw++;
            if (0 !== c.length)
                for (s = u ? e.aoData.length : d, u = u ? 0 : l; u < s; u++) {
                    var f = c[u],
                        p = e.aoData[f];
                    if (null === p.nTr && j(e, f), f = p.nTr, 0 !== a) {
                        var h = o[i % a];
                        p._sRowStripe != h && (t(f).removeClass(p._sRowStripe).addClass(h), p._sRowStripe = h)
                    }
                    Lt(e, "aoRowCallback", null, [f, p._aData, i, u]), n.push(f), i++
                } else i = s.sZeroRecords, 1 == e.iDraw && "ajax" == Ft(e) ? i = s.sLoadingRecords : s.sEmptyTable && 0 === e.fnRecordsTotal() && (i = s.sEmptyTable), n[0] = t("<tr/>", {
                    "class": a ? o[0] : ""
                }).append(t("<td />", {
                    valign: "top",
                    colSpan: v(e),
                    "class": e.oClasses.sRowEmpty
                }).html(i))[0];
            Lt(e, "aoHeaderCallback", "header", [t(e.nTHead).children("tr")[0], A(e), l, d, c]), Lt(e, "aoFooterCallback", "footer", [t(e.nTFoot).children("tr")[0], A(e), l, d, c]), o = t(e.nTBody), o.children().detach(), o.append(t(n)), Lt(e, "aoDrawCallback", "draw", [e]), e.bSorted = !1, e.bFiltered = !1, e.bDrawing = !1
        }
    }

    function P(t, e) {
        var n = t.oFeatures,
            r = n.bFilter;
        n.bSort && xt(t), r ? X(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), !0 !== e && (t._iDisplayStart = 0), t._drawHold = e, R(t), t._drawHold = !1
    }

    function F(e) {
        var n = e.oClasses,
            r = t(e.nTable),
            r = t("<div/>").insertBefore(r),
            i = e.oFeatures,
            o = t("<div/>", {
                id: e.sTableId + "_wrapper",
                "class": n.sWrapper + (e.nTFoot ? "" : " " + n.sNoFooter)
            });
        e.nHolding = r[0], e.nTableWrapper = o[0], e.nTableReinsertBefore = e.nTable.nextSibling;
        for (var a, s, l, u, c, d, f = e.sDom.split(""), p = 0; p < f.length; p++) {
            if (a = null, s = f[p], "<" == s) {
                if (l = t("<div/>")[0], u = f[p + 1], "'" == u || '"' == u) {
                    for (c = "", d = 2; f[p + d] != u;) c += f[p + d], d++;
                    "H" == c ? c = n.sJUIHeader : "F" == c && (c = n.sJUIFooter), -1 != c.indexOf(".") ? (u = c.split("."), l.id = u[0].substr(1, u[0].length - 1), l.className = u[1]) : "#" == c.charAt(0) ? l.id = c.substr(1, c.length - 1) : l.className = c, p += d
                }
                o.append(l), o = t(l)
            } else if (">" == s) o = o.parent();
            else if ("l" == s && i.bPaginate && i.bLengthChange) a = st(e);
            else if ("f" == s && i.bFilter) a = V(e);
            else if ("r" == s && i.bProcessing) a = ct(e);
            else if ("t" == s) a = ft(e);
            else if ("i" == s && i.bInfo) a = et(e);
            else if ("p" == s && i.bPaginate) a = lt(e);
            else if (0 !== Vt.ext.feature.length)
                for (l = Vt.ext.feature, d = 0, u = l.length; d < u; d++)
                    if (s == l[d].cFeature) {
                        a = l[d].fnInit(e);
                        break
                    } a && (l = e.aanFeatures, l[s] || (l[s] = []), l[s].push(a), o.append(a))
        }
        r.replaceWith(o), e.nHolding = null
    }

    function H(e, n) {
        var r, i, o, a, s, l, u, c, d, f, p = t(n).children("tr");
        for (e.splice(0, e.length), o = 0, l = p.length; o < l; o++) e.push([]);
        for (o = 0, l = p.length; o < l; o++)
            for (r = p[o], i = r.firstChild; i;) {
                if ("TD" == i.nodeName.toUpperCase() || "TH" == i.nodeName.toUpperCase()) {
                    for (c = 1 * i.getAttribute("colspan"), d = 1 * i.getAttribute("rowspan"), c = c && 0 !== c && 1 !== c ? c : 1, d = d && 0 !== d && 1 !== d ? d : 1, a = 0, s = e[o]; s[a];) a++;
                    for (u = a, f = 1 === c, s = 0; s < c; s++)
                        for (a = 0; a < d; a++) e[o + a][u + s] = {
                            cell: i,
                            unique: f
                        }, e[o + a].nTr = r
                }
                i = i.nextSibling
            }
    }

    function q(t, e, n) {
        var r = [];
        n || (n = t.aoHeader, e && (n = [], H(n, e)));
        for (var e = 0, i = n.length; e < i; e++)
            for (var o = 0, a = n[e].length; o < a; o++) !n[e][o].unique || r[o] && t.bSortCellsTop || (r[o] = n[e][o].cell);
        return r
    }

    function M(e, n, r) {
        if (Lt(e, "aoServerParams", "serverParams", [n]), n && t.isArray(n)) {
            var i = {},
                o = /(.*?)\[\]$/;
            t.each(n, function (t, e) {
                var n = e.name.match(o);
                n ? (n = n[0], i[n] || (i[n] = []), i[n].push(e.value)) : i[e.name] = e.value
            }), n = i
        }
        var a, s = e.ajax,
            l = e.oInstance,
            u = function (t) {
                Lt(e, null, "xhr", [e, t, e.jqXHR]), r(t)
            };
        if (t.isPlainObject(s) && s.data) {
            a = s.data;
            var c = t.isFunction(a) ? a(n, e) : a,
                n = t.isFunction(a) && c ? c : t.extend(!0, n, c);
            delete s.data
        }
        c = {
            data: n,
            success: function (t) {
                var n = t.error || t.sError;
                n && It(e, 0, n), e.json = t, u(t)
            },
            dataType: "json",
            cache: !1,
            type: e.sServerMethod,
            error: function (n, r) {
                var i = Lt(e, null, "xhr", [e, null, e.jqXHR]); - 1 === t.inArray(!0, i) && ("parsererror" == r ? It(e, 0, "Invalid JSON response", 1) : 4 === n.readyState && It(e, 0, "Ajax error", 7)), dt(e, !1)
            }
        }, e.oAjaxData = n, Lt(e, null, "preXhr", [e, n]), e.fnServerData ? e.fnServerData.call(l, e.sAjaxSource, t.map(n, function (t, e) {
            return {
                name: e,
                value: t
            }
        }), u, e) : e.sAjaxSource || "string" == typeof s ? e.jqXHR = t.ajax(t.extend(c, {
            url: s || e.sAjaxSource
        })) : t.isFunction(s) ? e.jqXHR = s.call(l, n, u, e) : (e.jqXHR = t.ajax(t.extend(c, s)), s.data = a)
    }

    function U(t) {
        return !t.bAjaxDataGet || (t.iDraw++, dt(t, !0), M(t, W(t), function (e) {
            B(t, e)
        }), !1)
    }

    function W(e) {
        var n, r, i, o, a = e.aoColumns,
            s = a.length,
            l = e.oFeatures,
            u = e.oPreviousSearch,
            c = e.aoPreSearchCols,
            d = [],
            f = wt(e);
        n = e._iDisplayStart, r = !1 !== l.bPaginate ? e._iDisplayLength : -1;
        var p = function (t, e) {
            d.push({
                name: t,
                value: e
            })
        };
        p("sEcho", e.iDraw), p("iColumns", s), p("sColumns", ie(a, "sName").join(",")), p("iDisplayStart", n), p("iDisplayLength", r);
        var h = {
            draw: e.iDraw,
            columns: [],
            order: [],
            start: n,
            length: r,
            search: {
                value: u.sSearch,
                regex: u.bRegex
            }
        };
        for (n = 0; n < s; n++) i = a[n], o = c[n], r = "function" == typeof i.mData ? "function" : i.mData, h.columns.push({
            data: r,
            name: i.sName,
            searchable: i.bSearchable,
            orderable: i.bSortable,
            search: {
                value: o.sSearch,
                regex: o.bRegex
            }
        }), p("mDataProp_" + n, r), l.bFilter && (p("sSearch_" + n, o.sSearch), p("bRegex_" + n, o.bRegex), p("bSearchable_" + n, i.bSearchable)), l.bSort && p("bSortable_" + n, i.bSortable);
        return l.bFilter && (p("sSearch", u.sSearch), p("bRegex", u.bRegex)), l.bSort && (t.each(f, function (t, e) {
            h.order.push({
                column: e.col,
                dir: e.dir
            }), p("iSortCol_" + t, e.col), p("sSortDir_" + t, e.dir)
        }), p("iSortingCols", f.length)), a = Vt.ext.legacy.ajax, null === a ? e.sAjaxSource ? d : h : a ? d : h
    }

    function B(t, e) {
        var n = z(t, e),
            i = e.sEcho !== r ? e.sEcho : e.draw,
            o = e.iTotalRecords !== r ? e.iTotalRecords : e.recordsTotal,
            a = e.iTotalDisplayRecords !== r ? e.iTotalDisplayRecords : e.recordsFiltered;
        if (i) {
            if (1 * i < t.iDraw) return;
            t.iDraw = 1 * i
        }
        for ($(t), t._iRecordsTotal = parseInt(o, 10), t._iRecordsDisplay = parseInt(a, 10), i = 0, o = n.length; i < o; i++) w(t, n[i]);
        t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, R(t), t._bInitComplete || ot(t, e), t.bAjaxDataGet = !0, dt(t, !1)
    }

    function z(e, n) {
        var i = t.isPlainObject(e.ajax) && e.ajax.dataSrc !== r ? e.ajax.dataSrc : e.sAjaxDataProp;
        return "data" === i ? n.aaData || n[i] : "" !== i ? D(i)(n) : n
    }

    function V(e) {
        var r = e.oClasses,
            i = e.sTableId,
            o = e.oLanguage,
            a = e.oPreviousSearch,
            s = e.aanFeatures,
            l = '<input type="search" class="' + r.sFilterInput + '"/>',
            u = o.sSearch,
            u = u.match(/_INPUT_/) ? u.replace("_INPUT_", l) : u + l,
            r = t("<div/>", {
                id: s.f ? null : i + "_filter",
                "class": r.sFilter
            }).append(t("<label/>").append(u)),
            s = function () {
                var t = this.value ? this.value : "";
                t != a.sSearch && (X(e, {
                    sSearch: t,
                    bRegex: a.bRegex,
                    bSmart: a.bSmart,
                    bCaseInsensitive: a.bCaseInsensitive
                }), e._iDisplayStart = 0, R(e))
            },
            l = null !== e.searchDelay ? e.searchDelay : "ssp" === Ft(e) ? 400 : 0,
            c = t("input", r).val(a.sSearch).attr("placeholder", o.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", l ? ve(s, l) : s).on("keypress.DT", function (t) {
                if (13 == t.keyCode) return !1
            }).attr("aria-controls", i);
        return t(e.nTable).on("search.dt.DT", function (t, r) {
            if (e === r) try {
                c[0] !== n.activeElement && c.val(a.sSearch)
            } catch (i) {}
        }), r[0]
    }

    function X(t, e, n) {
        var i = t.oPreviousSearch,
            o = t.aoPreSearchCols,
            a = function (t) {
                i.sSearch = t.sSearch, i.bRegex = t.bRegex, i.bSmart = t.bSmart, i.bCaseInsensitive = t.bCaseInsensitive
            };
        if (y(t), "ssp" != Ft(t)) {
            for (Y(t, e.sSearch, n, e.bEscapeRegex !== r ? !e.bEscapeRegex : e.bRegex, e.bSmart, e.bCaseInsensitive), a(e), e = 0; e < o.length; e++) G(t, o[e].sSearch, e, o[e].bEscapeRegex !== r ? !o[e].bEscapeRegex : o[e].bRegex, o[e].bSmart, o[e].bCaseInsensitive);
            J(t)
        } else a(e);
        t.bFiltered = !0, Lt(t, null, "search", [t])
    }

    function J(e) {
        for (var n, r, i = Vt.ext.search, o = e.aiDisplay, a = 0, s = i.length; a < s; a++) {
            for (var l = [], u = 0, c = o.length; u < c; u++) r = o[u], n = e.aoData[r], i[a](e, n._aFilterData, r, n._aData, u) && l.push(r);
            o.length = 0, t.merge(o, l)
        }
    }

    function G(t, e, n, r, i, o) {
        if ("" !== e) {
            for (var a = [], s = t.aiDisplay, r = Q(e, r, i, o), i = 0; i < s.length; i++) e = t.aoData[s[i]]._aFilterData[n], r.test(e) && a.push(s[i]);
            t.aiDisplay = a
        }
    }

    function Y(t, e, n, r, i, o) {
        var a, r = Q(e, r, i, o),
            o = t.oPreviousSearch.sSearch,
            s = t.aiDisplayMaster,
            i = [];
        if (0 !== Vt.ext.search.length && (n = !0), a = K(t), 0 >= e.length) t.aiDisplay = s.slice();
        else {
            for ((a || n || o.length > e.length || 0 !== e.indexOf(o) || t.bSorted) && (t.aiDisplay = s.slice()), e = t.aiDisplay, n = 0; n < e.length; n++) r.test(t.aoData[e[n]]._sFilterRow) && i.push(e[n]);
            t.aiDisplay = i
        }
    }

    function Q(e, n, r, i) {
        return e = n ? e : fe(e), r && (e = "^(?=.*?" + t.map(e.match(/"[^"]+"|[^ ]+/g) || [""], function (t) {
            if ('"' === t.charAt(0)) var e = t.match(/^"(.*)"$/),
                t = e ? e[1] : t;
            return t.replace('"', "")
        }).join(")(?=.*?") + ").*$"), RegExp(e, i ? "i" : "")
    }

    function K(t) {
        var e, n, r, i, o, a, s, l, u = t.aoColumns,
            c = Vt.ext.type.search;
        for (e = !1, n = 0, i = t.aoData.length; n < i; n++)
            if (l = t.aoData[n], !l._aFilterData) {
                for (a = [], r = 0, o = u.length; r < o; r++) e = u[r], e.bSearchable ? (s = S(t, n, r, "filter"), c[e.sType] && (s = c[e.sType](s)), null === s && (s = ""), "string" != typeof s && s.toString && (s = s.toString())) : s = "", s.indexOf && -1 !== s.indexOf("&") && (pe.innerHTML = s, s = he ? pe.textContent : pe.innerText), s.replace && (s = s.replace(/[\r\n]/g, "")), a.push(s);
                l._aFilterData = a, l._sFilterRow = a.join("  "), e = !0
            } return e
    }

    function Z(t) {
        return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive
        }
    }

    function tt(t) {
        return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive
        }
    }

    function et(e) {
        var n = e.sTableId,
            r = e.aanFeatures.i,
            i = t("<div/>", {
                "class": e.oClasses.sInfo,
                id: r ? null : n + "_info"
            });
        return r || (e.aoDrawCallback.push({
            fn: nt,
            sName: "information"
        }), i.attr("role", "status").attr("aria-live", "polite"), t(e.nTable).attr("aria-describedby", n + "_info")), i[0]
    }

    function nt(e) {
        var n = e.aanFeatures.i;
        if (0 !== n.length) {
            var r = e.oLanguage,
                i = e._iDisplayStart + 1,
                o = e.fnDisplayEnd(),
                a = e.fnRecordsTotal(),
                s = e.fnRecordsDisplay(),
                l = s ? r.sInfo : r.sInfoEmpty;
            s !== a && (l += " " + r.sInfoFiltered), l += r.sInfoPostFix, l = rt(e, l), r = r.fnInfoCallback, null !== r && (l = r.call(e.oInstance, e, i, o, a, s, l)), t(n).html(l)
        }
    }

    function rt(t, e) {
        var n = t.fnFormatNumber,
            r = t._iDisplayStart + 1,
            i = t._iDisplayLength,
            o = t.fnRecordsDisplay(),
            a = -1 === i;
        return e.replace(/_START_/g, n.call(t, r)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, a ? 1 : Math.ceil(r / i))).replace(/_PAGES_/g, n.call(t, a ? 1 : Math.ceil(o / i)))
    }

    function it(t) {
        var e, n, r, i = t.iInitDisplayStart,
            o = t.aoColumns;
        n = t.oFeatures;
        var a = t.bDeferLoading;
        if (t.bInitialised) {
            for (F(t), O(t), L(t, t.aoHeader), L(t, t.aoFooter), dt(t, !0), n.bAutoWidth && gt(t), e = 0, n = o.length; e < n; e++) r = o[e], r.sWidth && (r.nTh.style.width = bt(r.sWidth));
            Lt(t, null, "preInit", [t]), P(t), o = Ft(t), ("ssp" != o || a) && ("ajax" == o ? M(t, [], function (n) {
                var r = z(t, n);
                for (e = 0; e < r.length; e++) w(t, r[e]);
                t.iInitDisplayStart = i, P(t), dt(t, !1), ot(t, n)
            }, t) : (dt(t, !1), ot(t)))
        } else setTimeout(function () {
            it(t)
        }, 200)
    }

    function ot(t, e) {
        t._bInitComplete = !0, (e || t.oInit.aaData) && p(t), Lt(t, null, "plugin-init", [t, e]), Lt(t, "aoInitComplete", "init", [t, e])
    }

    function at(t, e) {
        var n = parseInt(e, 10);
        t._iDisplayLength = n, Rt(t), Lt(t, null, "length", [t, n])
    }

    function st(e) {
        for (var n = e.oClasses, r = e.sTableId, i = e.aLengthMenu, o = t.isArray(i[0]), a = o ? i[0] : i, i = o ? i[1] : i, o = t("<select/>", {
                name: r + "_length",
                "aria-controls": r,
                "class": n.sLengthSelect
            }), s = 0, l = a.length; s < l; s++) o[0][s] = new Option(i[s], a[s]);
        var u = t("<div><label/></div>").addClass(n.sLength);
        return e.aanFeatures.l || (u[0].id = r + "_length"), u.children().append(e.oLanguage.sLengthMenu.replace("_MENU_", o[0].outerHTML)), t("select", u).val(e._iDisplayLength).on("change.DT", function () {
            at(e, t(this).val()), R(e)
        }), t(e.nTable).on("length.dt.DT", function (n, r, i) {
            e === r && t("select", u).val(i)
        }), u[0]
    }

    function lt(e) {
        var n = e.sPaginationType,
            r = Vt.ext.pager[n],
            i = "function" == typeof r,
            o = function (t) {
                R(t)
            },
            n = t("<div/>").addClass(e.oClasses.sPaging + n)[0],
            a = e.aanFeatures;
        return i || r.fnInit(e, n, o), a.p || (n.id = e.sTableId + "_paginate", e.aoDrawCallback.push({
            fn: function (t) {
                if (i) {
                    var e, n = t._iDisplayStart,
                        s = t._iDisplayLength,
                        l = t.fnRecordsDisplay(),
                        u = -1 === s,
                        n = u ? 0 : Math.ceil(n / s),
                        s = u ? 1 : Math.ceil(l / s),
                        l = r(n, s),
                        u = 0;
                    for (e = a.p.length; u < e; u++) Pt(t, "pageButton")(t, a.p[u], u, l, n, s)
                } else r.fnUpdate(t, o)
            },
            sName: "pagination"
        })), n
    }

    function ut(t, e, n) {
        var r = t._iDisplayStart,
            i = t._iDisplayLength,
            o = t.fnRecordsDisplay();
        return 0 === o || -1 === i ? r = 0 : "number" == typeof e ? (r = e * i, r > o && (r = 0)) : "first" == e ? r = 0 : "previous" == e ? (r = 0 <= i ? r - i : 0, 0 > r && (r = 0)) : "next" == e ? r + i < o && (r += i) : "last" == e ? r = Math.floor((o - 1) / i) * i : It(t, 0, "Unknown paging action: " + e, 5), e = t._iDisplayStart !== r, t._iDisplayStart = r, e && (Lt(t, null, "page", [t]), n && R(t)), e
    }

    function ct(e) {
        return t("<div/>", {
            id: e.aanFeatures.r ? null : e.sTableId + "_processing",
            "class": e.oClasses.sProcessing
        }).html(e.oLanguage.sProcessing).insertBefore(e.nTable)[0]
    }

    function dt(e, n) {
        e.oFeatures.bProcessing && t(e.aanFeatures.r).css("display", n ? "block" : "none"), Lt(e, null, "processing", [e, n])
    }

    function ft(e) {
        var n = t(e.nTable);
        n.attr("role", "grid");
        var r = e.oScroll;
        if ("" === r.sX && "" === r.sY) return e.nTable;
        var i = r.sX,
            o = r.sY,
            a = e.oClasses,
            s = n.children("caption"),
            l = s.length ? s[0]._captionSide : null,
            u = t(n[0].cloneNode(!1)),
            c = t(n[0].cloneNode(!1)),
            d = n.children("tfoot");
        d.length || (d = null), u = t("<div/>", {
            "class": a.sScrollWrapper
        }).append(t("<div/>", {
            "class": a.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: i ? i ? bt(i) : null : "100%"
        }).append(t("<div/>", {
            "class": a.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: r.sXInner || "100%"
        }).append(u.removeAttr("id").css("margin-left", 0).append("top" === l ? s : null).append(n.children("thead"))))).append(t("<div/>", {
            "class": a.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: i ? bt(i) : null
        }).append(n)), d && u.append(t("<div/>", {
            "class": a.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: i ? i ? bt(i) : null : "100%"
        }).append(t("<div/>", {
            "class": a.sScrollFootInner
        }).append(c.removeAttr("id").css("margin-left", 0).append("bottom" === l ? s : null).append(n.children("tfoot")))));
        var n = u.children(),
            f = n[0],
            a = n[1],
            p = d ? n[2] : null;
        return i && t(a).on("scroll.DT", function () {
            var t = this.scrollLeft;
            f.scrollLeft = t, d && (p.scrollLeft = t)
        }), t(a).css(o && r.bCollapse ? "max-height" : "height", o), e.nScrollHead = f, e.nScrollBody = a, e.nScrollFoot = p, e.aoDrawCallback.push({
            fn: pt,
            sName: "scrolling"
        }), u[0]
    }

    function pt(e) {
        var n, i, o, a, s, l = e.oScroll,
            u = l.sX,
            c = l.sXInner,
            d = l.sY,
            l = l.iBarWidth,
            f = t(e.nScrollHead),
            g = f[0].style,
            v = f.children("div"),
            m = v[0].style,
            y = v.children("table"),
            v = e.nScrollBody,
            b = t(v),
            w = v.style,
            x = t(e.nScrollFoot).children("div"),
            S = x.children("table"),
            T = t(e.nTHead),
            C = t(e.nTable),
            D = C[0],
            _ = D.style,
            A = e.nTFoot ? t(e.nTFoot) : null,
            $ = e.oBrowser,
            E = $.bScrollOversize,
            I = ie(e.aoColumns, "nTh"),
            k = [],
            j = [],
            N = [],
            O = [],
            L = function (t) {
                t = t.style, t.paddingTop = "0", t.paddingBottom = "0", t.borderTopWidth = "0", t.borderBottomWidth = "0", t.height = 0
            };
        i = v.scrollHeight > v.clientHeight, e.scrollBarVis !== i && e.scrollBarVis !== r ? (e.scrollBarVis = i, p(e)) : (e.scrollBarVis = i, C.children("thead, tfoot").remove(), A && (o = A.clone().prependTo(C), n = A.find("tr"), o = o.find("tr")), a = T.clone().prependTo(C), T = T.find("tr"), i = a.find("tr"), a.find("th, td").removeAttr("tabindex"), u || (w.width = "100%", f[0].style.width = "100%"), t.each(q(e, a), function (t, n) {
            s = h(e, t), n.style.width = e.aoColumns[s].sWidth
        }), A && ht(function (t) {
            t.style.width = ""
        }, o), f = C.outerWidth(), "" === u ? (_.width = "100%", E && (C.find("tbody").height() > v.offsetHeight || "scroll" == b.css("overflow-y")) && (_.width = bt(C.outerWidth() - l)), f = C.outerWidth()) : "" !== c && (_.width = bt(c), f = C.outerWidth()), ht(L, i), ht(function (e) {
            N.push(e.innerHTML), k.push(bt(t(e).css("width")))
        }, i), ht(function (e, n) {
            t.inArray(e, I) !== -1 && (e.style.width = k[n])
        }, T), t(i).height(0), A && (ht(L, o), ht(function (e) {
            O.push(e.innerHTML), j.push(bt(t(e).css("width")))
        }, o), ht(function (t, e) {
            t.style.width = j[e]
        }, n), t(o).height(0)), ht(function (t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + N[e] + "</div>", t.style.width = k[e]
        }, i), A && ht(function (t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + O[e] + "</div>", t.style.width = j[e]
        }, o), C.outerWidth() < f ? (n = v.scrollHeight > v.offsetHeight || "scroll" == b.css("overflow-y") ? f + l : f, E && (v.scrollHeight > v.offsetHeight || "scroll" == b.css("overflow-y")) && (_.width = bt(n - l)), ("" === u || "" !== c) && It(e, 1, "Possible column misalignment", 6)) : n = "100%", w.width = bt(n), g.width = bt(n), A && (e.nScrollFoot.style.width = bt(n)), !d && E && (w.height = bt(D.offsetHeight + l)), u = C.outerWidth(), y[0].style.width = bt(u), m.width = bt(u), c = C.height() > v.clientHeight || "scroll" == b.css("overflow-y"), d = "padding" + ($.bScrollbarLeft ? "Left" : "Right"), m[d] = c ? l + "px" : "0px", A && (S[0].style.width = bt(u), x[0].style.width = bt(u), x[0].style[d] = c ? l + "px" : "0px"), C.children("colgroup").insertBefore(C.children("thead")), b.scroll(), !e.bSorted && !e.bFiltered || e._drawHold || (v.scrollTop = 0))
    }

    function ht(t, e, n) {
        for (var r, i, o = 0, a = 0, s = e.length; a < s;) {
            for (r = e[a].firstChild, i = n ? n[a].firstChild : null; r;) 1 === r.nodeType && (n ? t(r, i, o) : t(r, o), o++), r = r.nextSibling, i = n ? i.nextSibling : null;
            a++
        }
    }

    function gt(n) {
        var r, i, o = n.nTable,
            a = n.aoColumns,
            s = n.oScroll,
            l = s.sY,
            u = s.sX,
            c = s.sXInner,
            d = a.length,
            f = m(n, "bVisible"),
            g = t("th", n.nTHead),
            y = o.getAttribute("width"),
            b = o.parentNode,
            w = !1,
            x = n.oBrowser,
            s = x.bScrollOversize;
        for ((r = o.style.width) && -1 !== r.indexOf("%") && (y = r), r = 0; r < f.length; r++) i = a[f[r]], null !== i.sWidth && (i.sWidth = vt(i.sWidthOrig, b), w = !0);
        if (s || !w && !u && !l && d == v(n) && d == g.length)
            for (r = 0; r < d; r++) f = h(n, r), null !== f && (a[f].sWidth = bt(g.eq(r).width()));
        else {
            d = t(o).clone().css("visibility", "hidden").removeAttr("id"), d.find("tbody tr").remove();
            var S = t("<tr/>").appendTo(d.find("tbody"));
            for (d.find("thead, tfoot").remove(), d.append(t(n.nTHead).clone()).append(t(n.nTFoot).clone()), d.find("tfoot th, tfoot td").css("width", ""), g = q(n, d.find("thead")[0]), r = 0; r < f.length; r++) i = a[f[r]], g[r].style.width = null !== i.sWidthOrig && "" !== i.sWidthOrig ? bt(i.sWidthOrig) : "", i.sWidthOrig && u && t(g[r]).append(t("<div/>").css({
                width: i.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (n.aoData.length)
                for (r = 0; r < f.length; r++) w = f[r], i = a[w], t(mt(n, w)).clone(!1).append(i.sContentPadding).appendTo(S);
            for (t("[name]", d).removeAttr("name"), i = t("<div/>").css(u || l ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(d).appendTo(b), u && c ? d.width(c) : u ? (d.css("width", "auto"), d.removeAttr("width"), d.width() < b.clientWidth && y && d.width(b.clientWidth)) : l ? d.width(b.clientWidth) : y && d.width(y), r = l = 0; r < f.length; r++) b = t(g[r]), c = b.outerWidth() - b.width(), b = x.bBounding ? Math.ceil(g[r].getBoundingClientRect().width) : b.outerWidth(), l += b, a[f[r]].sWidth = bt(b - c);
            o.style.width = bt(l), i.remove()
        }
        y && (o.style.width = bt(y)), !y && !u || n._reszEvt || (o = function () {
            t(e).on("resize.DT-" + n.sInstance, ve(function () {
                p(n)
            }))
        }, s ? setTimeout(o, 1e3) : o(), n._reszEvt = !0)
    }

    function vt(e, r) {
        if (!e) return 0;
        var i = t("<div/>").css("width", bt(e)).appendTo(r || n.body),
            o = i[0].offsetWidth;
        return i.remove(), o
    }

    function mt(e, n) {
        var r = yt(e, n);
        if (0 > r) return null;
        var i = e.aoData[r];
        return i.nTr ? i.anCells[n] : t("<td/>").html(S(e, r, n, "display"))[0]
    }

    function yt(t, e) {
        for (var n, r = -1, i = -1, o = 0, a = t.aoData.length; o < a; o++) n = S(t, o, e, "display") + "", n = n.replace(ge, ""), n = n.replace(/&nbsp;/g, " "), n.length > r && (r = n.length, i = o);
        return i
    }

    function bt(t) {
        return null === t ? "0px" : "number" == typeof t ? 0 > t ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
    }

    function wt(e) {
        var n, i, o, a, s, l, u = [],
            c = e.aoColumns;
        n = e.aaSortingFixed, i = t.isPlainObject(n);
        var d = [];
        for (o = function (e) {
                e.length && !t.isArray(e[0]) ? d.push(e) : t.merge(d, e)
            }, t.isArray(n) && o(n), i && n.pre && o(n.pre), o(e.aaSorting), i && n.post && o(n.post), e = 0; e < d.length; e++)
            for (l = d[e][0], o = c[l].aDataSort, n = 0, i = o.length; n < i; n++) a = o[n], s = c[a].sType || "string", d[e]._idx === r && (d[e]._idx = t.inArray(d[e][1], c[a].asSorting)), u.push({
                src: l,
                col: a,
                dir: d[e][1],
                index: d[e]._idx,
                type: s,
                formatter: Vt.ext.type.order[s + "-pre"]
            });
        return u
    }

    function xt(t) {
        var e, n, r, i, o = [],
            a = Vt.ext.type.order,
            s = t.aoData,
            l = 0,
            u = t.aiDisplayMaster;
        for (y(t), i = wt(t), e = 0, n = i.length; e < n; e++) r = i[e], r.formatter && l++, _t(t, r.col);
        if ("ssp" != Ft(t) && 0 !== i.length) {
            for (e = 0, n = u.length; e < n; e++) o[u[e]] = e;
            l === i.length ? u.sort(function (t, e) {
                var n, r, a, l, u = i.length,
                    c = s[t]._aSortData,
                    d = s[e]._aSortData;
                for (a = 0; a < u; a++)
                    if (l = i[a], n = c[l.col], r = d[l.col], n = n < r ? -1 : n > r ? 1 : 0, 0 !== n) return "asc" === l.dir ? n : -n;
                return n = o[t], r = o[e], n < r ? -1 : n > r ? 1 : 0
            }) : u.sort(function (t, e) {
                var n, r, l, u, c = i.length,
                    d = s[t]._aSortData,
                    f = s[e]._aSortData;
                for (l = 0; l < c; l++)
                    if (u = i[l], n = d[u.col], r = f[u.col], u = a[u.type + "-" + u.dir] || a["string-" + u.dir], n = u(n, r), 0 !== n) return n;
                return n = o[t], r = o[e], n < r ? -1 : n > r ? 1 : 0
            })
        }
        t.bSorted = !0
    }

    function St(t) {
        for (var e, n, r = t.aoColumns, i = wt(t), t = t.oLanguage.oAria, o = 0, a = r.length; o < a; o++) {
            n = r[o];
            var s = n.asSorting;
            e = n.sTitle.replace(/<.*?>/g, "");
            var l = n.nTh;
            l.removeAttribute("aria-sort"), n.bSortable && (0 < i.length && i[0].col == o ? (l.setAttribute("aria-sort", "asc" == i[0].dir ? "ascending" : "descending"), n = s[i[0].index + 1] || s[0]) : n = s[0], e += "asc" === n ? t.sSortAscending : t.sSortDescending), l.setAttribute("aria-label", e)
        }
    }

    function Tt(e, n, i, o) {
        var a = e.aaSorting,
            s = e.aoColumns[n].asSorting,
            l = function (e, n) {
                var i = e._idx;
                return i === r && (i = t.inArray(e[1], s)), i + 1 < s.length ? i + 1 : n ? null : 0
            };
        "number" == typeof a[0] && (a = e.aaSorting = [a]), i && e.oFeatures.bSortMulti ? (i = t.inArray(n, ie(a, "0")), -1 !== i ? (n = l(a[i], !0), null === n && 1 === a.length && (n = 0), null === n ? a.splice(i, 1) : (a[i][1] = s[n], a[i]._idx = n)) : (a.push([n, s[0], 0]), a[a.length - 1]._idx = 0)) : a.length && a[0][0] == n ? (n = l(a[0]), a.length = 1, a[0][1] = s[n], a[0]._idx = n) : (a.length = 0, a.push([n, s[0]]), a[0]._idx = 0), P(e), "function" == typeof o && o(e)
    }

    function Ct(t, e, n, r) {
        var i = t.aoColumns[n];
        Nt(e, {}, function (e) {
            !1 !== i.bSortable && (t.oFeatures.bProcessing ? (dt(t, !0), setTimeout(function () {
                Tt(t, n, e.shiftKey, r), "ssp" !== Ft(t) && dt(t, !1)
            }, 0)) : Tt(t, n, e.shiftKey, r))
        })
    }

    function Dt(e) {
        var n, r, i = e.aLastSort,
            o = e.oClasses.sSortColumn,
            a = wt(e),
            s = e.oFeatures;
        if (s.bSort && s.bSortClasses) {
            for (s = 0, n = i.length; s < n; s++) r = i[s].src, t(ie(e.aoData, "anCells", r)).removeClass(o + (2 > s ? s + 1 : 3));
            for (s = 0, n = a.length; s < n; s++) r = a[s].src, t(ie(e.aoData, "anCells", r)).addClass(o + (2 > s ? s + 1 : 3))
        }
        e.aLastSort = a
    }

    function _t(t, e) {
        var n, r = t.aoColumns[e],
            i = Vt.ext.order[r.sSortDataType];
        i && (n = i.call(t.oInstance, t, e, g(t, e)));
        for (var o, a = Vt.ext.type.order[r.sType + "-pre"], s = 0, l = t.aoData.length; s < l; s++) r = t.aoData[s], r._aSortData || (r._aSortData = []), (!r._aSortData[e] || i) && (o = i ? n[s] : S(t, s, e, "sort"), r._aSortData[e] = a ? a(o) : o)
    }

    function At(e) {
        if (e.oFeatures.bStateSave && !e.bDestroying) {
            var n = {
                time: +new Date,
                start: e._iDisplayStart,
                length: e._iDisplayLength,
                order: t.extend(!0, [], e.aaSorting),
                search: Z(e.oPreviousSearch),
                columns: t.map(e.aoColumns, function (t, n) {
                    return {
                        visible: t.bVisible,
                        search: Z(e.aoPreSearchCols[n])
                    }
                })
            };
            Lt(e, "aoStateSaveParams", "stateSaveParams", [e, n]), e.oSavedState = n, e.fnStateSaveCallback.call(e.oInstance, e, n)
        }
    }

    function $t(e, n, i) {
        var o, a, s = e.aoColumns,
            n = function (n) {
                if (n && n.time) {
                    var u = Lt(e, "aoStateLoadParams", "stateLoadParams", [e, l]);
                    if (-1 === t.inArray(!1, u) && (u = e.iStateDuration, !(0 < u && n.time < +new Date - 1e3 * u || n.columns && s.length !== n.columns.length))) {
                        if (e.oLoadedState = t.extend(!0, {}, l), n.start !== r && (e._iDisplayStart = n.start, e.iInitDisplayStart = n.start), n.length !== r && (e._iDisplayLength = n.length), n.order !== r && (e.aaSorting = [], t.each(n.order, function (t, n) {
                                e.aaSorting.push(n[0] >= s.length ? [0, n[1]] : n)
                            })), n.search !== r && t.extend(e.oPreviousSearch, tt(n.search)), n.columns)
                            for (o = 0, a = n.columns.length; o < a; o++) u = n.columns[o], u.visible !== r && (s[o].bVisible = u.visible), u.search !== r && t.extend(e.aoPreSearchCols[o], tt(u.search));
                        Lt(e, "aoStateLoaded", "stateLoaded", [e, l])
                    }
                }
                i()
            };
        if (e.oFeatures.bStateSave) {
            var l = e.fnStateLoadCallback.call(e.oInstance, e, n);
            l !== r && n(l)
        } else i()
    }

    function Et(e) {
        var n = Vt.settings,
            e = t.inArray(e, ie(n, "nTable"));
        return -1 !== e ? n[e] : null
    }

    function It(t, n, r, i) {
        if (r = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + r, i && (r += ". For more information about this error, please see http://datatables.net/tn/" + i), n) e.console && console.log && console.log(r);
        else if (n = Vt.ext, n = n.sErrMode || n.errMode, t && Lt(t, null, "error", [t, i, r]), "alert" == n) alert(r);
        else {
            if ("throw" == n) throw Error(r);
            "function" == typeof n && n(t, i, r)
        }
    }

    function kt(e, n, i, o) {
        t.isArray(i) ? t.each(i, function (r, i) {
            t.isArray(i) ? kt(e, n, i[0], i[1]) : kt(e, n, i)
        }) : (o === r && (o = i), n[i] !== r && (e[o] = n[i]))
    }

    function jt(e, n, r) {
        var i, o;
        for (o in n) n.hasOwnProperty(o) && (i = n[o], t.isPlainObject(i) ? (t.isPlainObject(e[o]) || (e[o] = {}), t.extend(!0, e[o], i)) : e[o] = r && "data" !== o && "aaData" !== o && t.isArray(i) ? i.slice() : i);
        return e
    }

    function Nt(e, n, r) {
        t(e).on("click.DT", n, function (t) {
            e.blur(), r(t)
        }).on("keypress.DT", n, function (t) {
            13 === t.which && (t.preventDefault(), r(t))
        }).on("selectstart.DT", function () {
            return !1
        })
    }

    function Ot(t, e, n, r) {
        n && t[e].push({
            fn: n,
            sName: r
        })
    }

    function Lt(e, n, r, i) {
        var o = [];
        return n && (o = t.map(e[n].slice().reverse(), function (t) {
            return t.fn.apply(e.oInstance, i)
        })), null !== r && (n = t.Event(r + ".dt"), t(e.nTable).trigger(n, i), o.push(n.result)), o
    }

    function Rt(t) {
        var e = t._iDisplayStart,
            n = t.fnDisplayEnd(),
            r = t._iDisplayLength;
        e >= n && (e = n - r), e -= e % r, (-1 === r || 0 > e) && (e = 0), t._iDisplayStart = e
    }

    function Pt(e, n) {
        var r = e.renderer,
            i = Vt.ext.renderer[n];
        return t.isPlainObject(r) && r[n] ? i[r[n]] || i._ : "string" == typeof r ? i[r] || i._ : i._
    }

    function Ft(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
    }

    function Ht(t, e) {
        var n = [],
            n = Ne.numbers_length,
            r = Math.floor(n / 2);
        return e <= n ? n = ae(0, e) : t <= r ? (n = ae(0, n - 2), n.push("ellipsis"), n.push(e - 1)) : (t >= e - 1 - r ? n = ae(e - (n - 2), e) : (n = ae(t - r + 2, t + r - 1), n.push("ellipsis"), n.push(e - 1)), n.splice(0, 0, "ellipsis"), n.splice(0, 0, 0)), n.DT_el = "span", n
    }

    function qt(e) {
        t.each({
            num: function (t) {
                return Oe(t, e)
            },
            "num-fmt": function (t) {
                return Oe(t, e, Kt)
            },
            "html-num": function (t) {
                return Oe(t, e, Gt)
            },
            "html-num-fmt": function (t) {
                return Oe(t, e, Gt, Kt)
            }
        }, function (t, n) {
            Ut.type.order[t + e + "-pre"] = n, t.match(/^html\-/) && (Ut.type.search[t + e] = Ut.type.search.html)
        })
    }

    function Mt(t) {
        return function () {
            var e = [Et(this[Vt.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return Vt.ext.internal[t].apply(this, e)
        }
    }
    var Ut, Wt, Bt, zt, Vt = function (e) {
            this.$ = function (t, e) {
                return this.api(!0).$(t, e)
            }, this._ = function (t, e) {
                return this.api(!0).rows(t, e).data()
            }, this.api = function (t) {
                return new Wt(t ? Et(this[Ut.iApiIndex]) : this)
            }, this.fnAddData = function (e, n) {
                var i = this.api(!0),
                    o = t.isArray(e) && (t.isArray(e[0]) || t.isPlainObject(e[0])) ? i.rows.add(e) : i.row.add(e);
                return (n === r || n) && i.draw(), o.flatten().toArray()
            }, this.fnAdjustColumnSizing = function (t) {
                var e = this.api(!0).columns.adjust(),
                    n = e.settings()[0],
                    i = n.oScroll;
                t === r || t ? e.draw(!1) : ("" !== i.sX || "" !== i.sY) && pt(n)
            }, this.fnClearTable = function (t) {
                var e = this.api(!0).clear();
                (t === r || t) && e.draw()
            }, this.fnClose = function (t) {
                this.api(!0).row(t).child.hide()
            }, this.fnDeleteRow = function (t, e, n) {
                var i = this.api(!0),
                    t = i.rows(t),
                    o = t.settings()[0],
                    a = o.aoData[t[0][0]];
                return t.remove(), e && e.call(this, o, a), (n === r || n) && i.draw(), a
            }, this.fnDestroy = function (t) {
                this.api(!0).destroy(t)
            }, this.fnDraw = function (t) {
                this.api(!0).draw(t)
            }, this.fnFilter = function (t, e, n, i, o, a) {
                o = this.api(!0), null === e || e === r ? o.search(t, n, i, a) : o.column(e).search(t, n, i, a), o.draw()
            }, this.fnGetData = function (t, e) {
                var n = this.api(!0);
                if (t !== r) {
                    var i = t.nodeName ? t.nodeName.toLowerCase() : "";
                    return e !== r || "td" == i || "th" == i ? n.cell(t, e).data() : n.row(t).data() || null
                }
                return n.data().toArray()
            }, this.fnGetNodes = function (t) {
                var e = this.api(!0);
                return t !== r ? e.row(t).node() : e.rows().nodes().flatten().toArray()
            }, this.fnGetPosition = function (t) {
                var e = this.api(!0),
                    n = t.nodeName.toUpperCase();
                return "TR" == n ? e.row(t).index() : "TD" == n || "TH" == n ? (t = e.cell(t).index(), [t.row, t.columnVisible, t.column]) : null
            }, this.fnIsOpen = function (t) {
                return this.api(!0).row(t).child.isShown()
            }, this.fnOpen = function (t, e, n) {
                return this.api(!0).row(t).child(e, n).show().child()[0]
            }, this.fnPageChange = function (t, e) {
                var n = this.api(!0).page(t);
                (e === r || e) && n.draw(!1)
            }, this.fnSetColumnVis = function (t, e, n) {
                t = this.api(!0).column(t).visible(e), (n === r || n) && t.columns.adjust().draw()
            }, this.fnSettings = function () {
                return Et(this[Ut.iApiIndex])
            }, this.fnSort = function (t) {
                this.api(!0).order(t).draw()
            }, this.fnSortListener = function (t, e, n) {
                this.api(!0).order.listener(t, e, n)
            }, this.fnUpdate = function (t, e, n, i, o) {
                var a = this.api(!0);
                return n === r || null === n ? a.row(e).data(t) : a.cell(e, n).data(t), (o === r || o) && a.columns.adjust(), (i === r || i) && a.draw(), 0
            }, this.fnVersionCheck = Ut.fnVersionCheck;
            var n = this,
                i = e === r,
                c = this.length;
            i && (e = {}), this.oApi = this.internal = Ut.internal;
            for (var p in Vt.ext.internal) p && (this[p] = Mt(p));
            return this.each(function () {
                var p, h = {},
                    g = 1 < c ? jt(h, e, !0) : e,
                    v = 0,
                    h = this.getAttribute("id"),
                    m = !1,
                    y = Vt.defaults,
                    S = t(this);
                if ("table" != this.nodeName.toLowerCase()) It(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    s(y), l(y.column), o(y, y, !0), o(y.column, y.column, !0), o(y, t.extend(g, S.data()));
                    var T = Vt.settings,
                        v = 0;
                    for (p = T.length; v < p; v++) {
                        var C = T[v];
                        if (C.nTable == this || C.nTHead.parentNode == this || C.nTFoot && C.nTFoot.parentNode == this) {
                            var _ = g.bRetrieve !== r ? g.bRetrieve : y.bRetrieve;
                            if (i || _) return C.oInstance;
                            if (g.bDestroy !== r ? g.bDestroy : y.bDestroy) {
                                C.oInstance.fnDestroy();
                                break
                            }
                            return void It(C, 0, "Cannot reinitialise DataTable", 3)
                        }
                        if (C.sTableId == this.id) {
                            T.splice(v, 1);
                            break
                        }
                    }
                    null !== h && "" !== h || (this.id = h = "DataTables_Table_" + Vt.ext._unique++);
                    var A = t.extend(!0, {}, Vt.models.oSettings, {
                        sDestroyWidth: S[0].style.width,
                        sInstance: h,
                        sTableId: h
                    });
                    A.nTable = this, A.oApi = n.internal, A.oInit = g, T.push(A), A.oInstance = 1 === n.length ? n : S.dataTable(), s(g), g.oLanguage && a(g.oLanguage), g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = t.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]), g = jt(t.extend(!0, {}, y), g), kt(A.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")), kt(A, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"],
                        ["bJQueryUI", "bJUI"]
                    ]), kt(A.oScroll, g, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]), kt(A.oLanguage, g, "fnInfoCallback"), Ot(A, "aoDrawCallback", g.fnDrawCallback, "user"), Ot(A, "aoServerParams", g.fnServerParams, "user"), Ot(A, "aoStateSaveParams", g.fnStateSaveParams, "user"), Ot(A, "aoStateLoadParams", g.fnStateLoadParams, "user"), Ot(A, "aoStateLoaded", g.fnStateLoaded, "user"), Ot(A, "aoRowCallback", g.fnRowCallback, "user"), Ot(A, "aoRowCreatedCallback", g.fnCreatedRow, "user"), Ot(A, "aoHeaderCallback", g.fnHeaderCallback, "user"), Ot(A, "aoFooterCallback", g.fnFooterCallback, "user"), Ot(A, "aoInitComplete", g.fnInitComplete, "user"), Ot(A, "aoPreDrawCallback", g.fnPreDrawCallback, "user"), A.rowIdFn = D(g.rowId), u(A);
                    var $ = A.oClasses;
                    g.bJQueryUI ? (t.extend($, Vt.ext.oJUIClasses, g.oClasses), g.sDom === y.sDom && "lfrtip" === y.sDom && (A.sDom = '<"H"lfr>t<"F"ip>'), A.renderer ? t.isPlainObject(A.renderer) && !A.renderer.header && (A.renderer.header = "jqueryui") : A.renderer = "jqueryui") : t.extend($, Vt.ext.classes, g.oClasses), S.addClass($.sTable), A.iInitDisplayStart === r && (A.iInitDisplayStart = g.iDisplayStart, A._iDisplayStart = g.iDisplayStart), null !== g.iDeferLoading && (A.bDeferLoading = !0, h = t.isArray(g.iDeferLoading), A._iRecordsDisplay = h ? g.iDeferLoading[0] : g.iDeferLoading, A._iRecordsTotal = h ? g.iDeferLoading[1] : g.iDeferLoading);
                    var E = A.oLanguage;
                    t.extend(!0, E, g.oLanguage), E.sUrl && (t.ajax({
                        dataType: "json",
                        url: E.sUrl,
                        success: function (e) {
                            a(e), o(y.oLanguage, e), t.extend(!0, E, e), it(A)
                        },
                        error: function () {
                            it(A)
                        }
                    }), m = !0), null === g.asStripeClasses && (A.asStripeClasses = [$.sStripeOdd, $.sStripeEven]);
                    var h = A.asStripeClasses,
                        I = S.children("tbody").find("tr").eq(0);
                    if (-1 !== t.inArray(!0, t.map(h, function (t) {
                            return I.hasClass(t)
                        })) && (t("tbody tr", this).removeClass(h.join(" ")), A.asDestroyStripes = h.slice()), h = [], T = this.getElementsByTagName("thead"), 0 !== T.length && (H(A.aoHeader, T[0]), h = q(A)), null === g.aoColumns)
                        for (T = [], v = 0, p = h.length; v < p; v++) T.push(null);
                    else T = g.aoColumns;
                    for (v = 0, p = T.length; v < p; v++) d(A, h ? h[v] : null);
                    if (b(A, g.aoColumnDefs, T, function (t, e) {
                            f(A, t, e)
                        }), I.length) {
                        var k = function (t, e) {
                            return null !== t.getAttribute("data-" + e) ? e : null
                        };
                        t(I[0]).children("th, td").each(function (t, e) {
                            var n = A.aoColumns[t];
                            if (n.mData === t) {
                                var i = k(e, "sort") || k(e, "order"),
                                    o = k(e, "filter") || k(e, "search");
                                null === i && null === o || (n.mData = {
                                    _: t + ".display",
                                    sort: null !== i ? t + ".@data-" + i : r,
                                    type: null !== i ? t + ".@data-" + i : r,
                                    filter: null !== o ? t + ".@data-" + o : r
                                }, f(A, t))
                            }
                        })
                    }
                    var j = A.oFeatures,
                        h = function () {
                            if (g.aaSorting === r) {
                                var e = A.aaSorting;
                                for (v = 0, p = e.length; v < p; v++) e[v][1] = A.aoColumns[v].asSorting[0]
                            }
                            Dt(A), j.bSort && Ot(A, "aoDrawCallback", function () {
                                if (A.bSorted) {
                                    var e = wt(A),
                                        n = {};
                                    t.each(e, function (t, e) {
                                        n[e.src] = e.dir
                                    }), Lt(A, null, "order", [A, e, n]), St(A)
                                }
                            }), Ot(A, "aoDrawCallback", function () {
                                (A.bSorted || "ssp" === Ft(A) || j.bDeferRender) && Dt(A)
                            }, "sc");
                            var e = S.children("caption").each(function () {
                                    this._captionSide = t(this).css("caption-side")
                                }),
                                n = S.children("thead");
                            if (0 === n.length && (n = t("<thead/>").appendTo(S)), A.nTHead = n[0], n = S.children("tbody"), 0 === n.length && (n = t("<tbody/>").appendTo(S)), A.nTBody = n[0], n = S.children("tfoot"), 0 === n.length && e.length > 0 && ("" !== A.oScroll.sX || "" !== A.oScroll.sY) && (n = t("<tfoot/>").appendTo(S)), 0 === n.length || 0 === n.children().length ? S.addClass($.sNoFooter) : n.length > 0 && (A.nTFoot = n[0], H(A.aoFooter, A.nTFoot)), g.aaData)
                                for (v = 0; v < g.aaData.length; v++) w(A, g.aaData[v]);
                            else(A.bDeferLoading || "dom" == Ft(A)) && x(A, t(A.nTBody).children("tr"));
                            A.aiDisplay = A.aiDisplayMaster.slice(), A.bInitialised = !0, m === !1 && it(A)
                        };
                    g.bStateSave ? (j.bStateSave = !0, Ot(A, "aoDrawCallback", At, "state_save"), $t(A, g, h)) : h()
                }
            }), n = null, this
        },
        Xt = {},
        Jt = /[\r\n]/g,
        Gt = /<.*?>/g,
        Yt = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        Qt = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        Kt = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
        Zt = function (t) {
            return !t || !0 === t || "-" === t
        },
        te = function (t) {
            var e = parseInt(t, 10);
            return !isNaN(e) && isFinite(t) ? e : null
        },
        ee = function (t, e) {
            return Xt[e] || (Xt[e] = RegExp(fe(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(Xt[e], ".") : t
        },
        ne = function (t, e, n) {
            var r = "string" == typeof t;
            return !!Zt(t) || (e && r && (t = ee(t, e)), n && r && (t = t.replace(Kt, "")), !isNaN(parseFloat(t)) && isFinite(t))
        },
        re = function (t, e, n) {
            return !!Zt(t) || (Zt(t) || "string" == typeof t ? !!ne(t.replace(Gt, ""), e, n) || null : null)
        },
        ie = function (t, e, n) {
            var i = [],
                o = 0,
                a = t.length;
            if (n !== r)
                for (; o < a; o++) t[o] && t[o][e] && i.push(t[o][e][n]);
            else
                for (; o < a; o++) t[o] && i.push(t[o][e]);
            return i
        },
        oe = function (t, e, n, i) {
            var o = [],
                a = 0,
                s = e.length;
            if (i !== r)
                for (; a < s; a++) t[e[a]][n] && o.push(t[e[a]][n][i]);
            else
                for (; a < s; a++) o.push(t[e[a]][n]);
            return o
        },
        ae = function (t, e) {
            var n, i = [];
            e === r ? (e = 0, n = t) : (n = e, e = t);
            for (var o = e; o < n; o++) i.push(o);
            return i
        },
        se = function (t) {
            for (var e = [], n = 0, r = t.length; n < r; n++) t[n] && e.push(t[n]);
            return e
        },
        le = function (t) {
            var e, n, r, i = [],
                o = t.length,
                a = 0;
            n = 0;
            t: for (; n < o; n++) {
                for (e = t[n], r = 0; r < a; r++)
                    if (i[r] === e) continue t;
                i.push(e), a++
            }
            return i
        };
    Vt.util = {
        throttle: function (t, e) {
            var n, i, o = e !== r ? e : 200;
            return function () {
                var e = this,
                    a = +new Date,
                    s = arguments;
                n && a < n + o ? (clearTimeout(i), i = setTimeout(function () {
                    n = r, t.apply(e, s)
                }, o)) : (n = a, t.apply(e, s))
            }
        },
        escapeRegex: function (t) {
            return t.replace(Qt, "\\$1")
        }
    };
    var ue = function (t, e, n) {
            t[e] !== r && (t[n] = t[e])
        },
        ce = /\[.*?\]$/,
        de = /\(\)$/,
        fe = Vt.util.escapeRegex,
        pe = t("<div>")[0],
        he = pe.textContent !== r,
        ge = /<.*?>/g,
        ve = Vt.util.throttle,
        me = [],
        ye = Array.prototype,
        be = function (e) {
            var n, r, i = Vt.settings,
                o = t.map(i, function (t) {
                    return t.nTable
                });
            return e ? e.nTable && e.oApi ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? (n = t.inArray(e, o), -1 !== n ? [i[n]] : null) : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ? r = t(e) : e instanceof t && (r = e), r ? r.map(function () {
                return n = t.inArray(this, o), -1 !== n ? i[n] : null
            }).toArray() : void 0) : []
        };
    Wt = function (e, n) {
        if (!(this instanceof Wt)) return new Wt(e, n);
        var r = [],
            i = function (t) {
                (t = be(t)) && (r = r.concat(t))
            };
        if (t.isArray(e))
            for (var o = 0, a = e.length; o < a; o++) i(e[o]);
        else i(e);
        this.context = le(r), n && t.merge(this, n), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, Wt.extend(this, this, me)
    }, Vt.Api = Wt, t.extend(Wt.prototype, {
        any: function () {
            return 0 !== this.count()
        },
        concat: ye.concat,
        context: [],
        count: function () {
            return this.flatten().length
        },
        each: function (t) {
            for (var e = 0, n = this.length; e < n; e++) t.call(this, this[e], e, this);
            return this
        },
        eq: function (t) {
            var e = this.context;
            return e.length > t ? new Wt(e[t], this[t]) : null
        },
        filter: function (t) {
            var e = [];
            if (ye.filter) e = ye.filter.call(this, t, this);
            else
                for (var n = 0, r = this.length; n < r; n++) t.call(this, this[n], n, this) && e.push(this[n]);
            return new Wt(this.context, e)
        },
        flatten: function () {
            var t = [];
            return new Wt(this.context, t.concat.apply(t, this.toArray()))
        },
        join: ye.join,
        indexOf: ye.indexOf || function (t, e) {
            for (var n = e || 0, r = this.length; n < r; n++)
                if (this[n] === t) return n;
            return -1
        },
        iterator: function (t, e, n, i) {
            var o, a, s, l, u, c, d, f = [],
                p = this.context,
                h = this.selector;
            for ("string" == typeof t && (i = n, n = e, e = t, t = !1), a = 0, s = p.length; a < s; a++) {
                var g = new Wt(p[a]);
                if ("table" === e) o = n.call(g, p[a], a), o !== r && f.push(o);
                else if ("columns" === e || "rows" === e) o = n.call(g, p[a], this[a], a), o !== r && f.push(o);
                else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e)
                    for (d = this[a], "column-rows" === e && (c = Ce(p[a], h.opts)), l = 0, u = d.length; l < u; l++) o = d[l], o = "cell" === e ? n.call(g, p[a], o.row, o.column, a, l) : n.call(g, p[a], o, a, l, c), o !== r && f.push(o)
            }
            return f.length || i ? (t = new Wt(p, t ? f.concat.apply([], f) : f), e = t.selector, e.rows = h.rows, e.cols = h.cols, e.opts = h.opts, t) : this
        },
        lastIndexOf: ye.lastIndexOf || function (t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function (t) {
            var e = [];
            if (ye.map) e = ye.map.call(this, t, this);
            else
                for (var n = 0, r = this.length; n < r; n++) e.push(t.call(this, this[n], n));
            return new Wt(this.context, e)
        },
        pluck: function (t) {
            return this.map(function (e) {
                return e[t]
            })
        },
        pop: ye.pop,
        push: ye.push,
        reduce: ye.reduce || function (t, e) {
            return c(this, t, e, 0, this.length, 1)
        },
        reduceRight: ye.reduceRight || function (t, e) {
            return c(this, t, e, this.length - 1, -1, -1)
        },
        reverse: ye.reverse,
        selector: null,
        shift: ye.shift,
        sort: ye.sort,
        splice: ye.splice,
        toArray: function () {
            return ye.slice.call(this)
        },
        to$: function () {
            return t(this)
        },
        toJQuery: function () {
            return t(this)
        },
        unique: function () {
            return new Wt(this.context, le(this))
        },
        unshift: ye.unshift
    }), Wt.extend = function (e, n, r) {
        if (r.length && n && (n instanceof Wt || n.__dt_wrapper)) {
            var i, o, a, s = function (t, e, n) {
                return function () {
                    var r = e.apply(t, arguments);
                    return Wt.extend(r, r, n.methodExt), r
                }
            };
            for (i = 0, o = r.length; i < o; i++) a = r[i], n[a.name] = "function" == typeof a.val ? s(e, a.val, a) : t.isPlainObject(a.val) ? {} : a.val, n[a.name].__dt_wrapper = !0, Wt.extend(e, n[a.name], a.propExt)
        }
    }, Wt.register = Bt = function (e, n) {
        if (t.isArray(e))
            for (var r = 0, i = e.length; r < i; r++) Wt.register(e[r], n);
        else
            for (var o, a, s = e.split("."), l = me, r = 0, i = s.length; r < i; r++) {
                o = (a = -1 !== s[r].indexOf("()")) ? s[r].replace("()", "") : s[r];
                var u;
                t: {
                    u = 0;
                    for (var c = l.length; u < c; u++)
                        if (l[u].name === o) {
                            u = l[u];
                            break t
                        } u = null
                }
                u || (u = {
                    name: o,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, l.push(u)), r === i - 1 ? u.val = n : l = a ? u.methodExt : u.propExt
            }
    }, Wt.registerPlural = zt = function (e, n, i) {
        Wt.register(e, i), Wt.register(n, function () {
            var e = i.apply(this, arguments);
            return e === this ? this : e instanceof Wt ? e.length ? t.isArray(e[0]) ? new Wt(e.context, e[0]) : e[0] : r : e
        })
    }, Bt("tables()", function (e) {
        var n;
        if (e) {
            n = Wt;
            var r = this.context;
            if ("number" == typeof e) e = [r[e]];
            else var i = t.map(r, function (t) {
                    return t.nTable
                }),
                e = t(i).filter(e).map(function () {
                    var e = t.inArray(this, i);
                    return r[e]
                }).toArray();
            n = new n(e)
        } else n = this;
        return n
    }), Bt("table()", function (t) {
        var t = this.tables(t),
            e = t.context;
        return e.length ? new Wt(e[0]) : t
    }), zt("tables().nodes()", "table().node()", function () {
        return this.iterator("table", function (t) {
            return t.nTable
        }, 1)
    }), zt("tables().body()", "table().body()", function () {
        return this.iterator("table", function (t) {
            return t.nTBody
        }, 1)
    }), zt("tables().header()", "table().header()", function () {
        return this.iterator("table", function (t) {
            return t.nTHead
        }, 1)
    }), zt("tables().footer()", "table().footer()", function () {
        return this.iterator("table", function (t) {
            return t.nTFoot
        }, 1)
    }), zt("tables().containers()", "table().container()", function () {
        return this.iterator("table", function (t) {
            return t.nTableWrapper
        }, 1)
    }), Bt("draw()", function (t) {
        return this.iterator("table", function (e) {
            "page" === t ? R(e) : ("string" == typeof t && (t = "full-hold" !== t), P(e, !1 === t))
        })
    }), Bt("page()", function (t) {
        return t === r ? this.page.info().page : this.iterator("table", function (e) {
            ut(e, t)
        })
    }), Bt("page.info()", function () {
        if (0 === this.context.length) return r;
        var t = this.context[0],
            e = t._iDisplayStart,
            n = t.oFeatures.bPaginate ? t._iDisplayLength : -1,
            i = t.fnRecordsDisplay(),
            o = -1 === n;
        return {
            page: o ? 0 : Math.floor(e / n),
            pages: o ? 1 : Math.ceil(i / n),
            start: e,
            end: t.fnDisplayEnd(),
            length: n,
            recordsTotal: t.fnRecordsTotal(),
            recordsDisplay: i,
            serverSide: "ssp" === Ft(t)
        }
    }), Bt("page.len()", function (t) {
        return t === r ? 0 !== this.context.length ? this.context[0]._iDisplayLength : r : this.iterator("table", function (e) {
            at(e, t)
        })
    });
    var we = function (t, e, n) {
        if (n) {
            var r = new Wt(t);
            r.one("draw", function () {
                n(r.ajax.json())
            })
        }
        if ("ssp" == Ft(t)) P(t, e);
        else {
            dt(t, !0);
            var i = t.jqXHR;
            i && 4 !== i.readyState && i.abort(), M(t, [], function (n) {
                $(t);
                for (var n = z(t, n), r = 0, i = n.length; r < i; r++) w(t, n[r]);
                P(t, e), dt(t, !1)
            })
        }
    };
    Bt("ajax.json()", function () {
        var t = this.context;
        if (0 < t.length) return t[0].json
    }), Bt("ajax.params()", function () {
        var t = this.context;
        if (0 < t.length) return t[0].oAjaxData
    }), Bt("ajax.reload()", function (t, e) {
        return this.iterator("table", function (n) {
            we(n, !1 === e, t)
        })
    }), Bt("ajax.url()", function (e) {
        var n = this.context;
        return e === r ? 0 === n.length ? r : (n = n[0], n.ajax ? t.isPlainObject(n.ajax) ? n.ajax.url : n.ajax : n.sAjaxSource) : this.iterator("table", function (n) {
            t.isPlainObject(n.ajax) ? n.ajax.url = e : n.ajax = e
        })
    }), Bt("ajax.url().load()", function (t, e) {
        return this.iterator("table", function (n) {
            we(n, !1 === e, t)
        })
    });
    var xe = function (e, n, i, o, a) {
            var s, l, u, c, d, f, p = [];
            for (u = typeof n, n && "string" !== u && "function" !== u && n.length !== r || (n = [n]), u = 0, c = n.length; u < c; u++)
                for (l = n[u] && n[u].split && !n[u].match(/[\[\(:]/) ? n[u].split(",") : [n[u]], d = 0, f = l.length; d < f; d++)(s = i("string" == typeof l[d] ? t.trim(l[d]) : l[d])) && s.length && (p = p.concat(s));
            if (e = Ut.selector[e], e.length)
                for (u = 0, c = e.length; u < c; u++) p = e[u](o, a, p);
            return le(p)
        },
        Se = function (e) {
            return e || (e = {}), e.filter && e.search === r && (e.search = e.filter), t.extend({
                search: "none",
                order: "current",
                page: "all"
            }, e)
        },
        Te = function (t) {
            for (var e = 0, n = t.length; e < n; e++)
                if (0 < t[e].length) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;
            return t.length = 0, t
        },
        Ce = function (e, n) {
            var r, i, o, a = [],
                s = e.aiDisplay;
            r = e.aiDisplayMaster;
            var l = n.search;
            if (i = n.order, o = n.page, "ssp" == Ft(e)) return "removed" === l ? [] : ae(0, r.length);
            if ("current" == o)
                for (r = e._iDisplayStart, i = e.fnDisplayEnd(); r < i; r++) a.push(s[r]);
            else if ("current" == i || "applied" == i) a = "none" == l ? r.slice() : "applied" == l ? s.slice() : t.map(r, function (e) {
                return -1 === t.inArray(e, s) ? e : null
            });
            else if ("index" == i || "original" == i)
                for (r = 0, i = e.aoData.length; r < i; r++) "none" == l ? a.push(r) : (o = t.inArray(r, s), (-1 === o && "removed" == l || 0 <= o && "applied" == l) && a.push(r));
            return a
        };
    Bt("rows()", function (e, n) {
        e === r ? e = "" : t.isPlainObject(e) && (n = e, e = "");
        var n = Se(n),
            i = this.iterator("table", function (i) {
                var o, a = n;
                return xe("row", e, function (e) {
                    var n = te(e);
                    if (null !== n && !a) return [n];
                    if (o || (o = Ce(i, a)), null !== n && t.inArray(n, o) !== -1) return [n];
                    if (null === e || e === r || "" === e) return o;
                    if ("function" == typeof e) return t.map(o, function (t) {
                        var n = i.aoData[t];
                        return e(t, n._aData, n.nTr) ? t : null
                    });
                    if (n = se(oe(i.aoData, o, "nTr")), e.nodeName) return e._DT_RowIndex !== r ? [e._DT_RowIndex] : e._DT_CellIndex ? [e._DT_CellIndex.row] : (n = t(e).closest("*[data-dt-row]"), n.length ? [n.data("dt-row")] : []);
                    if ("string" == typeof e && "#" === e.charAt(0)) {
                        var s = i.aIds[e.replace(/^#/, "")];
                        if (s !== r) return [s.idx]
                    }
                    return t(n).filter(e).map(function () {
                        return this._DT_RowIndex
                    }).toArray()
                }, i, a)
            }, 1);
        return i.selector.rows = e, i.selector.opts = n, i
    }), Bt("rows().nodes()", function () {
        return this.iterator("row", function (t, e) {
            return t.aoData[e].nTr || r
        }, 1)
    }), Bt("rows().data()", function () {
        return this.iterator(!0, "rows", function (t, e) {
            return oe(t.aoData, e, "_aData")
        }, 1)
    }), zt("rows().cache()", "row().cache()", function (t) {
        return this.iterator("row", function (e, n) {
            var r = e.aoData[n];
            return "search" === t ? r._aFilterData : r._aSortData
        }, 1)
    }), zt("rows().invalidate()", "row().invalidate()", function (t) {
        return this.iterator("row", function (e, n) {
            I(e, n, t)
        })
    }), zt("rows().indexes()", "row().index()", function () {
        return this.iterator("row", function (t, e) {
            return e
        }, 1)
    }), zt("rows().ids()", "row().id()", function (t) {
        for (var e = [], n = this.context, r = 0, i = n.length; r < i; r++)
            for (var o = 0, a = this[r].length; o < a; o++) {
                var s = n[r].rowIdFn(n[r].aoData[this[r][o]]._aData);
                e.push((!0 === t ? "#" : "") + s)
            }
        return new Wt(n, e)
    }), zt("rows().remove()", "row().remove()", function () {
        var t = this;
        return this.iterator("row", function (e, n, i) {
            var o, a, s, l, u, c = e.aoData,
                d = c[n];
            for (c.splice(n, 1), o = 0, a = c.length; o < a; o++)
                if (s = c[o], u = s.anCells, null !== s.nTr && (s.nTr._DT_RowIndex = o), null !== u)
                    for (s = 0, l = u.length; s < l; s++) u[s]._DT_CellIndex.row = o;
            E(e.aiDisplayMaster, n), E(e.aiDisplay, n), E(t[i], n, !1), Rt(e), n = e.rowIdFn(d._aData), n !== r && delete e.aIds[n]
        }), this.iterator("table", function (t) {
            for (var e = 0, n = t.aoData.length; e < n; e++) t.aoData[e].idx = e
        }), this
    }), Bt("rows.add()", function (e) {
        var n = this.iterator("table", function (t) {
                var n, r, i, o = [];
                for (r = 0, i = e.length; r < i; r++) n = e[r], n.nodeName && "TR" === n.nodeName.toUpperCase() ? o.push(x(t, n)[0]) : o.push(w(t, n));
                return o
            }, 1),
            r = this.rows(-1);
        return r.pop(), t.merge(r, n), r
    }), Bt("row()", function (t, e) {
        return Te(this.rows(t, e))
    }), Bt("row().data()", function (t) {
        var e = this.context;
        return t === r ? e.length && this.length ? e[0].aoData[this[0]]._aData : r : (e[0].aoData[this[0]]._aData = t, I(e[0], this[0], "data"), this)
    }), Bt("row().node()", function () {
        var t = this.context;
        return t.length && this.length ? t[0].aoData[this[0]].nTr || null : null
    }), Bt("row.add()", function (e) {
        e instanceof t && e.length && (e = e[0]);
        var n = this.iterator("table", function (t) {
            return e.nodeName && "TR" === e.nodeName.toUpperCase() ? x(t, e)[0] : w(t, e)
        });
        return this.row(n[0])
    });
    var De = function (t, e) {
            var n = t.context;
            n.length && (n = n[0].aoData[e !== r ? e : t[0]]) && n._details && (n._details.remove(), n._detailsShow = r, n._details = r)
        },
        _e = function (t, e) {
            var n = t.context;
            if (n.length && t.length) {
                var r = n[0].aoData[t[0]];
                if (r._details) {
                    (r._detailsShow = e) ? r._details.insertAfter(r.nTr): r._details.detach();
                    var i = n[0],
                        o = new Wt(i),
                        a = i.aoData;
                    o.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"), 0 < ie(a, "_details").length && (o.on("draw.dt.DT_details", function (t, e) {
                        i === e && o.rows({
                            page: "current"
                        }).eq(0).each(function (t) {
                            t = a[t], t._detailsShow && t._details.insertAfter(t.nTr)
                        })
                    }), o.on("column-visibility.dt.DT_details", function (t, e) {
                        if (i === e)
                            for (var n, r = v(e), o = 0, s = a.length; o < s; o++) n = a[o], n._details && n._details.children("td[colspan]").attr("colspan", r)
                    }), o.on("destroy.dt.DT_details", function (t, e) {
                        if (i === e)
                            for (var n = 0, r = a.length; n < r; n++) a[n]._details && De(o, n)
                    }))
                }
            }
        };
    Bt("row().child()", function (e, n) {
        var i = this.context;
        if (e === r) return i.length && this.length ? i[0].aoData[this[0]]._details : r;
        if (!0 === e) this.child.show();
        else if (!1 === e) De(this);
        else if (i.length && this.length) {
            var o = i[0],
                i = i[0].aoData[this[0]],
                a = [],
                s = function (e, n) {
                    if (t.isArray(e) || e instanceof t)
                        for (var r = 0, i = e.length; r < i; r++) s(e[r], n);
                    else e.nodeName && "tr" === e.nodeName.toLowerCase() ? a.push(e) : (r = t("<tr><td/></tr>").addClass(n), t("td", r).addClass(n).html(e)[0].colSpan = v(o), a.push(r[0]))
                };
            s(e, n), i._details && i._details.detach(), i._details = t(a), i._detailsShow && i._details.insertAfter(i.nTr)
        }
        return this
    }), Bt(["row().child.show()", "row().child().show()"], function () {
        return _e(this, !0), this
    }), Bt(["row().child.hide()", "row().child().hide()"], function () {
        return _e(this, !1), this
    }), Bt(["row().child.remove()", "row().child().remove()"], function () {
        return De(this), this
    }), Bt("row().child.isShown()", function () {
        var t = this.context;
        return !(!t.length || !this.length) && (t[0].aoData[this[0]]._detailsShow || !1)
    });
    var Ae = /^([^:]+):(name|visIdx|visible)$/,
        $e = function (t, e, n, r, i) {
            for (var n = [], r = 0, o = i.length; r < o; r++) n.push(S(t, i[r], e));
            return n
        };
    Bt("columns()", function (e, n) {
        e === r ? e = "" : t.isPlainObject(e) && (n = e, e = "");
        var n = Se(n),
            i = this.iterator("table", function (r) {
                var i = e,
                    o = n,
                    a = r.aoColumns,
                    s = ie(a, "sName"),
                    l = ie(a, "nTh");
                return xe("column", i, function (e) {
                    var n = te(e);
                    if ("" === e) return ae(a.length);
                    if (null !== n) return [n >= 0 ? n : a.length + n];
                    if ("function" == typeof e) {
                        var i = Ce(r, o);
                        return t.map(a, function (t, n) {
                            return e(n, $e(r, n, 0, 0, i), l[n]) ? n : null
                        })
                    }
                    var u = "string" == typeof e ? e.match(Ae) : "";
                    if (u) switch (u[2]) {
                        case "visIdx":
                        case "visible":
                            if (n = parseInt(u[1], 10), n < 0) {
                                var c = t.map(a, function (t, e) {
                                    return t.bVisible ? e : null
                                });
                                return [c[c.length + n]]
                            }
                            return [h(r, n)];
                        case "name":
                            return t.map(s, function (t, e) {
                                return t === u[1] ? e : null
                            });
                        default:
                            return []
                    }
                    return e.nodeName && e._DT_CellIndex ? [e._DT_CellIndex.column] : (n = t(l).filter(e).map(function () {
                        return t.inArray(this, l)
                    }).toArray(), n.length || !e.nodeName ? n : (n = t(e).closest("*[data-dt-column]"), n.length ? [n.data("dt-column")] : []))
                }, r, o)
            }, 1);
        return i.selector.cols = e, i.selector.opts = n, i
    }), zt("columns().header()", "column().header()", function () {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].nTh
        }, 1)
    }), zt("columns().footer()", "column().footer()", function () {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].nTf
        }, 1)
    }), zt("columns().data()", "column().data()", function () {
        return this.iterator("column-rows", $e, 1)
    }), zt("columns().dataSrc()", "column().dataSrc()", function () {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].mData
        }, 1)
    }), zt("columns().cache()", "column().cache()", function (t) {
        return this.iterator("column-rows", function (e, n, r, i, o) {
            return oe(e.aoData, o, "search" === t ? "_aFilterData" : "_aSortData", n)
        }, 1)
    }), zt("columns().nodes()", "column().nodes()", function () {
        return this.iterator("column-rows", function (t, e, n, r, i) {
            return oe(t.aoData, i, "anCells", e)
        }, 1)
    }), zt("columns().visible()", "column().visible()", function (e, n) {
        var i = this.iterator("column", function (n, i) {
            if (e === r) return n.aoColumns[i].bVisible;
            var o, a, s, l = n.aoColumns,
                u = l[i],
                c = n.aoData;
            if (e !== r && u.bVisible !== e) {
                if (e) {
                    var d = t.inArray(!0, ie(l, "bVisible"), i + 1);
                    for (o = 0, a = c.length; o < a; o++) s = c[o].nTr, l = c[o].anCells, s && s.insertBefore(l[i], l[d] || null)
                } else t(ie(n.aoData, "anCells", i)).detach();
                u.bVisible = e, L(n, n.aoHeader), L(n, n.aoFooter), At(n)
            }
        });
        return e !== r && (this.iterator("column", function (t, r) {
            Lt(t, null, "column-visibility", [t, r, e, n])
        }), (n === r || n) && this.columns.adjust()), i
    }), zt("columns().indexes()", "column().index()", function (t) {
        return this.iterator("column", function (e, n) {
            return "visible" === t ? g(e, n) : n
        }, 1)
    }), Bt("columns.adjust()", function () {
        return this.iterator("table", function (t) {
            p(t)
        }, 1)
    }), Bt("column.index()", function (t, e) {
        if (0 !== this.context.length) {
            var n = this.context[0];
            if ("fromVisible" === t || "toData" === t) return h(n, e);
            if ("fromData" === t || "toVisible" === t) return g(n, e)
        }
    }), Bt("column()", function (t, e) {
        return Te(this.columns(t, e))
    }), Bt("cells()", function (e, n, i) {
        if (t.isPlainObject(e) && (e.row === r ? (i = e, e = null) : (i = n, n = null)), t.isPlainObject(n) && (i = n, n = null), null === n || n === r) return this.iterator("table", function (n) {
            var o, a, s, l, u, c, d, f = e,
                p = Se(i),
                h = n.aoData,
                g = Ce(n, p),
                v = se(oe(h, g, "anCells")),
                m = t([].concat.apply([], v)),
                y = n.aoColumns.length;
            return xe("cell", f, function (e) {
                var i = "function" == typeof e;
                if (null === e || e === r || i) {
                    for (a = [], s = 0, l = g.length; s < l; s++)
                        for (o = g[s], u = 0; u < y; u++) c = {
                            row: o,
                            column: u
                        }, i ? (d = h[o], e(c, S(n, o, u), d.anCells ? d.anCells[u] : null) && a.push(c)) : a.push(c);
                    return a
                }
                return t.isPlainObject(e) ? [e] : (i = m.filter(e).map(function (t, e) {
                    return {
                        row: e._DT_CellIndex.row,
                        column: e._DT_CellIndex.column
                    }
                }).toArray(), i.length || !e.nodeName ? i : (d = t(e).closest("*[data-dt-row]"), d.length ? [{
                    row: d.data("dt-row"),
                    column: d.data("dt-column")
                }] : []))
            }, n, p)
        });
        var o, a, s, l, u, c = this.columns(n, i),
            d = this.rows(e, i),
            f = this.iterator("table", function (t, e) {
                for (o = [], a = 0, s = d[e].length; a < s; a++)
                    for (l = 0, u = c[e].length; l < u; l++) o.push({
                        row: d[e][a],
                        column: c[e][l]
                    });
                return o
            }, 1);
        return t.extend(f.selector, {
            cols: n,
            rows: e,
            opts: i
        }), f
    }), zt("cells().nodes()", "cell().node()", function () {
        return this.iterator("cell", function (t, e, n) {
            return (t = t.aoData[e]) && t.anCells ? t.anCells[n] : r
        }, 1)
    }), Bt("cells().data()", function () {
        return this.iterator("cell", function (t, e, n) {
            return S(t, e, n)
        }, 1)
    }), zt("cells().cache()", "cell().cache()", function (t) {
        return t = "search" === t ? "_aFilterData" : "_aSortData", this.iterator("cell", function (e, n, r) {
            return e.aoData[n][t][r]
        }, 1)
    }), zt("cells().render()", "cell().render()", function (t) {
        return this.iterator("cell", function (e, n, r) {
            return S(e, n, r, t)
        }, 1)
    }), zt("cells().indexes()", "cell().index()", function () {
        return this.iterator("cell", function (t, e, n) {
            return {
                row: e,
                column: n,
                columnVisible: g(t, n)
            }
        }, 1)
    }), zt("cells().invalidate()", "cell().invalidate()", function (t) {
        return this.iterator("cell", function (e, n, r) {
            I(e, n, t, r)
        })
    }), Bt("cell()", function (t, e, n) {
        return Te(this.cells(t, e, n))
    }), Bt("cell().data()", function (t) {
        var e = this.context,
            n = this[0];
        return t === r ? e.length && n.length ? S(e[0], n[0].row, n[0].column) : r : (T(e[0], n[0].row, n[0].column, t), I(e[0], n[0].row, "data", n[0].column), this)
    }), Bt("order()", function (e, n) {
        var i = this.context;
        return e === r ? 0 !== i.length ? i[0].aaSorting : r : ("number" == typeof e ? e = [
            [e, n]
        ] : e.length && !t.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator("table", function (t) {
            t.aaSorting = e.slice()
        }))
    }), Bt("order.listener()", function (t, e, n) {
        return this.iterator("table", function (r) {
            Ct(r, t, e, n)
        })
    }), Bt("order.fixed()", function (e) {
        if (!e) {
            var n = this.context,
                n = n.length ? n[0].aaSortingFixed : r;
            return t.isArray(n) ? {
                pre: n
            } : n
        }
        return this.iterator("table", function (n) {
            n.aaSortingFixed = t.extend(!0, {}, e)
        })
    }), Bt(["columns().order()", "column().order()"], function (e) {
        var n = this;
        return this.iterator("table", function (r, i) {
            var o = [];
            t.each(n[i], function (t, n) {
                o.push([n, e])
            }), r.aaSorting = o
        })
    }), Bt("search()", function (e, n, i, o) {
        var a = this.context;
        return e === r ? 0 !== a.length ? a[0].oPreviousSearch.sSearch : r : this.iterator("table", function (r) {
            r.oFeatures.bFilter && X(r, t.extend({}, r.oPreviousSearch, {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === i || i,
                bCaseInsensitive: null === o || o
            }), 1)
        })
    }), zt("columns().search()", "column().search()", function (e, n, i, o) {
        return this.iterator("column", function (a, s) {
            var l = a.aoPreSearchCols;
            return e === r ? l[s].sSearch : void(a.oFeatures.bFilter && (t.extend(l[s], {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === i || i,
                bCaseInsensitive: null === o || o
            }), X(a, a.oPreviousSearch, 1)))
        })
    }), Bt("state()", function () {
        return this.context.length ? this.context[0].oSavedState : null
    }), Bt("state.clear()", function () {
        return this.iterator("table", function (t) {
            t.fnStateSaveCallback.call(t.oInstance, t, {})
        })
    }), Bt("state.loaded()", function () {
        return this.context.length ? this.context[0].oLoadedState : null
    }), Bt("state.save()", function () {
        return this.iterator("table", function (t) {
            At(t)
        })
    }), Vt.versionCheck = Vt.fnVersionCheck = function (t) {
        for (var e, n, r = Vt.version.split("."), t = t.split("."), i = 0, o = t.length; i < o; i++)
            if (e = parseInt(r[i], 10) || 0, n = parseInt(t[i], 10) || 0, e !== n) return e > n;
        return !0
    }, Vt.isDataTable = Vt.fnIsDataTable = function (e) {
        var n = t(e).get(0),
            r = !1;
        return e instanceof Vt.Api || (t.each(Vt.settings, function (e, i) {
            var o = i.nScrollHead ? t("table", i.nScrollHead)[0] : null,
                a = i.nScrollFoot ? t("table", i.nScrollFoot)[0] : null;
            i.nTable !== n && o !== n && a !== n || (r = !0)
        }), r)
    }, Vt.tables = Vt.fnTables = function (e) {
        var n = !1;
        t.isPlainObject(e) && (n = e.api, e = e.visible);
        var r = t.map(Vt.settings, function (n) {
            if (!e || e && t(n.nTable).is(":visible")) return n.nTable
        });
        return n ? new Wt(r) : r
    }, Vt.camelToHungarian = o, Bt("$()", function (e, n) {
        var r = this.rows(n).nodes(),
            r = t(r);
        return t([].concat(r.filter(e).toArray(), r.find(e).toArray()))
    }), t.each(["on", "one", "off"], function (e, n) {
        Bt(n + "()", function () {
            var e = Array.prototype.slice.call(arguments);
            e[0] = t.map(e[0].split(/\s/), function (t) {
                return t.match(/\.dt\b/) ? t : t + ".dt"
            }).join(" ");
            var r = t(this.tables().nodes());
            return r[n].apply(r, e), this
        })
    }), Bt("clear()", function () {
        return this.iterator("table", function (t) {
            $(t)
        })
    }), Bt("settings()", function () {
        return new Wt(this.context, this.context)
    }), Bt("init()", function () {
        var t = this.context;
        return t.length ? t[0].oInit : null
    }), Bt("data()", function () {
        return this.iterator("table", function (t) {
            return ie(t.aoData, "_aData")
        }).flatten()
    }), Bt("destroy()", function (n) {
        return n = n || !1, this.iterator("table", function (r) {
            var i, o = r.nTableWrapper.parentNode,
                a = r.oClasses,
                s = r.nTable,
                l = r.nTBody,
                u = r.nTHead,
                c = r.nTFoot,
                d = t(s),
                l = t(l),
                f = t(r.nTableWrapper),
                p = t.map(r.aoData, function (t) {
                    return t.nTr
                });
            r.bDestroying = !0, Lt(r, "aoDestroyCallback", "destroy", [r]), n || new Wt(r).columns().visible(!0), f.off(".DT").find(":not(tbody *)").off(".DT"), t(e).off(".DT-" + r.sInstance), s != u.parentNode && (d.children("thead").detach(), d.append(u)), c && s != c.parentNode && (d.children("tfoot").detach(), d.append(c)), r.aaSorting = [], r.aaSortingFixed = [], Dt(r), t(p).removeClass(r.asStripeClasses.join(" ")), t("th, td", u).removeClass(a.sSortable + " " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone), r.bJUI && (t("th span." + a.sSortIcon + ", td span." + a.sSortIcon, u).detach(), t("th, td", u).each(function () {
                var e = t("div." + a.sSortJUIWrapper, this);
                t(this).append(e.contents()), e.detach()
            })), l.children().detach(), l.append(p), u = n ? "remove" : "detach", d[u](), f[u](), !n && o && (o.insertBefore(s, r.nTableReinsertBefore), d.css("width", r.sDestroyWidth).removeClass(a.sTable), (i = r.asDestroyStripes.length) && l.children().each(function (e) {
                t(this).addClass(r.asDestroyStripes[e % i])
            })), o = t.inArray(r, Vt.settings), -1 !== o && Vt.settings.splice(o, 1)
        })
    }), t.each(["column", "row", "cell"], function (t, e) {
        Bt(e + "s().every()", function (t) {
            var n = this.selector.opts,
                i = this;
            return this.iterator(e, function (o, a, s, l, u) {
                t.call(i[e](a, "cell" === e ? s : n, "cell" === e ? n : r), a, s, l, u)
            })
        })
    }), Bt("i18n()", function (e, n, i) {
        var o = this.context[0],
            e = D(e)(o.oLanguage);
        return e === r && (e = n), i !== r && t.isPlainObject(e) && (e = e[i] !== r ? e[i] : e._), e.replace("%d", i)
    }), Vt.version = "1.10.13", Vt.settings = [], Vt.models = {}, Vt.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, Vt.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, Vt.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, Vt.defaults = {
        aaData: null,
        aaSorting: [
            [0, "asc"]
        ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bJQueryUI: !1,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function (t) {
            return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function (t) {
            try {
                return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
            } catch (e) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function (t, e) {
            try {
                (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
            } catch (n) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: t.extend({}, Vt.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, i(Vt.defaults), Vt.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, i(Vt.defaults.column), Vt.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: r,
        oAjaxData: r,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        bJUI: null,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function () {
            return "ssp" == Ft(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function () {
            return "ssp" == Ft(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function () {
            var t = this._iDisplayLength,
                e = this._iDisplayStart,
                n = e + t,
                r = this.aiDisplay.length,
                i = this.oFeatures,
                o = i.bPaginate;
            return i.bServerSide ? !1 === o || -1 === t ? e + r : Math.min(e + t, this._iRecordsDisplay) : !o || n > r || -1 === t ? r : n
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, Vt.ext = Ut = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: Vt.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: Vt.version
    }, t.extend(Ut, {
        afnFiltering: Ut.search,
        aTypes: Ut.type.detect,
        ofnSearch: Ut.type.search,
        oSort: Ut.type.order,
        afnSortData: Ut.order,
        aoFeatures: Ut.feature,
        oApi: Ut.internal,
        oStdClasses: Ut.classes,
        oPagination: Ut.pager
    }), t.extend(Vt.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    });
    var Ee = "",
        Ee = "",
        Ie = Ee + "ui-state-default",
        ke = Ee + "css_right ui-icon ui-icon-",
        je = Ee + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
    t.extend(Vt.ext.oJUIClasses, Vt.ext.classes, {
        sPageButton: "fg-button ui-button " + Ie,
        sPageButtonActive: "ui-state-disabled",
        sPageButtonDisabled: "ui-state-disabled",
        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
        sSortAsc: Ie + " sorting_asc",
        sSortDesc: Ie + " sorting_desc",
        sSortable: Ie + " sorting",
        sSortableAsc: Ie + " sorting_asc_disabled",
        sSortableDesc: Ie + " sorting_desc_disabled",
        sSortableNone: Ie + " sorting_disabled",
        sSortJUIAsc: ke + "triangle-1-n",
        sSortJUIDesc: ke + "triangle-1-s",
        sSortJUI: ke + "carat-2-n-s",
        sSortJUIAscAllowed: ke + "carat-1-n",
        sSortJUIDescAllowed: ke + "carat-1-s",
        sSortJUIWrapper: "DataTables_sort_wrapper",
        sSortIcon: "DataTables_sort_icon",
        sScrollHead: "dataTables_scrollHead " + Ie,
        sScrollFoot: "dataTables_scrollFoot " + Ie,
        sHeaderTH: Ie,
        sFooterTH: Ie,
        sJUIHeader: je + " ui-corner-tl ui-corner-tr",
        sJUIFooter: je + " ui-corner-bl ui-corner-br"
    });
    var Ne = Vt.ext.pager;
    t.extend(Ne, {
        simple: function () {
            return ["previous", "next"]
        },
        full: function () {
            return ["first", "previous", "next", "last"]
        },
        numbers: function (t, e) {
            return [Ht(t, e)]
        },
        simple_numbers: function (t, e) {
            return ["previous", Ht(t, e), "next"]
        },
        full_numbers: function (t, e) {
            return ["first", "previous", Ht(t, e), "next", "last"]
        },
        first_last_numbers: function (t, e) {
            return ["first", Ht(t, e), "last"]
        },
        _numbers: Ht,
        numbers_length: 7
    }), t.extend(!0, Vt.ext.renderer, {
        pageButton: {
            _: function (e, i, o, a, s, l) {
                var u, c, d, f = e.oClasses,
                    p = e.oLanguage.oPaginate,
                    h = e.oLanguage.oAria.paginate || {},
                    g = 0,
                    v = function (n, r) {
                        var i, a, d, m, y = function (t) {
                            ut(e, t.data.action, !0)
                        };
                        for (i = 0, a = r.length; i < a; i++)
                            if (m = r[i], t.isArray(m)) d = t("<" + (m.DT_el || "div") + "/>").appendTo(n), v(d, m);
                            else {
                                switch (u = null, c = "", m) {
                                    case "ellipsis":
                                        n.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        u = p.sFirst, c = m + (s > 0 ? "" : " " + f.sPageButtonDisabled);
                                        break;
                                    case "previous":
                                        u = p.sPrevious, c = m + (s > 0 ? "" : " " + f.sPageButtonDisabled);
                                        break;
                                    case "next":
                                        u = p.sNext, c = m + (s < l - 1 ? "" : " " + f.sPageButtonDisabled);
                                        break;
                                    case "last":
                                        u = p.sLast, c = m + (s < l - 1 ? "" : " " + f.sPageButtonDisabled);
                                        break;
                                    default:
                                        u = m + 1, c = s === m ? f.sPageButtonActive : ""
                                }
                                null !== u && (d = t("<a>", {
                                    "class": f.sPageButton + " " + c,
                                    "aria-controls": e.sTableId,
                                    "aria-label": h[m],
                                    "data-dt-idx": g,
                                    tabindex: e.iTabIndex,
                                    id: 0 === o && "string" == typeof m ? e.sTableId + "_" + m : null
                                }).html(u).appendTo(n), Nt(d, {
                                    action: m
                                }, y), g++)
                            }
                    };
                try {
                    d = t(i).find(n.activeElement).data("dt-idx")
                } catch (m) {}
                v(t(i).empty(), a), d !== r && t(i).find("[data-dt-idx=" + d + "]").focus()
            }
        }
    }), t.extend(Vt.ext.type.detect, [function (t, e) {
        var n = e.oLanguage.sDecimal;
        return ne(t, n) ? "num" + n : null
    }, function (t) {
        if (t && !(t instanceof Date) && !Yt.test(t)) return null;
        var e = Date.parse(t);
        return null !== e && !isNaN(e) || Zt(t) ? "date" : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return ne(t, n, !0) ? "num-fmt" + n : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return re(t, n) ? "html-num" + n : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return re(t, n, !0) ? "html-num-fmt" + n : null
    }, function (t) {
        return Zt(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null
    }]), t.extend(Vt.ext.type.search, {
        html: function (t) {
            return Zt(t) ? t : "string" == typeof t ? t.replace(Jt, " ").replace(Gt, "") : ""
        },
        string: function (t) {
            return Zt(t) ? t : "string" == typeof t ? t.replace(Jt, " ") : t
        }
    });
    var Oe = function (t, e, n, r) {
        return 0 === t || t && "-" !== t ? (e && (t = ee(t, e)), t.replace && (n && (t = t.replace(n, "")), r && (t = t.replace(r, ""))), 1 * t) : -(1 / 0)
    };
    t.extend(Ut.type.order, {
        "date-pre": function (t) {
            return Date.parse(t) || -(1 / 0)
        },
        "html-pre": function (t) {
            return Zt(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
        },
        "string-pre": function (t) {
            return Zt(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
        },
        "string-asc": function (t, e) {
            return t < e ? -1 : t > e ? 1 : 0
        },
        "string-desc": function (t, e) {
            return t < e ? 1 : t > e ? -1 : 0
        }
    }), qt(""), t.extend(!0, Vt.ext.renderer, {
        header: {
            _: function (e, n, r, i) {
                t(e.nTable).on("order.dt.DT", function (t, o, a, s) {
                    e === o && (t = r.idx, n.removeClass(r.sSortingClass + " " + i.sSortAsc + " " + i.sSortDesc).addClass("asc" == s[t] ? i.sSortAsc : "desc" == s[t] ? i.sSortDesc : r.sSortingClass))
                })
            },
            jqueryui: function (e, n, r, i) {
                t("<div/>").addClass(i.sSortJUIWrapper).append(n.contents()).append(t("<span/>").addClass(i.sSortIcon + " " + r.sSortingClassJUI)).appendTo(n), t(e.nTable).on("order.dt.DT", function (t, o, a, s) {
                    e === o && (t = r.idx, n.removeClass(i.sSortAsc + " " + i.sSortDesc).addClass("asc" == s[t] ? i.sSortAsc : "desc" == s[t] ? i.sSortDesc : r.sSortingClass), n.find("span." + i.sSortIcon).removeClass(i.sSortJUIAsc + " " + i.sSortJUIDesc + " " + i.sSortJUI + " " + i.sSortJUIAscAllowed + " " + i.sSortJUIDescAllowed).addClass("asc" == s[t] ? i.sSortJUIAsc : "desc" == s[t] ? i.sSortJUIDesc : r.sSortingClassJUI))
                })
            }
        }
    });
    var Le = function (t) {
        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
    };
    return Vt.render = {
        number: function (t, e, n, r, i) {
            return {
                display: function (o) {
                    if ("number" != typeof o && "string" != typeof o) return o;
                    var a = 0 > o ? "-" : "",
                        s = parseFloat(o);
                    return isNaN(s) ? Le(o) : (s = s.toFixed(n), o = Math.abs(s), s = parseInt(o, 10), o = n ? e + (o - s).toFixed(n).substring(2) : "", a + (r || "") + s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t) + o + (i || ""))
                }
            }
        },
        text: function () {
            return {
                display: Le
            }
        }
    }, t.extend(Vt.ext.internal, {
        _fnExternApiFunc: Mt,
        _fnBuildAjax: M,
        _fnAjaxUpdate: U,
        _fnAjaxParameters: W,
        _fnAjaxUpdateDraw: B,
        _fnAjaxDataSrc: z,
        _fnAddColumn: d,
        _fnColumnOptions: f,
        _fnAdjustColumnSizing: p,
        _fnVisibleToColumnIndex: h,
        _fnColumnIndexToVisible: g,
        _fnVisbleColumns: v,
        _fnGetColumns: m,
        _fnColumnTypes: y,
        _fnApplyColumnDefs: b,
        _fnHungarianMap: i,
        _fnCamelToHungarian: o,
        _fnLanguageCompat: a,
        _fnBrowserDetect: u,
        _fnAddData: w,
        _fnAddTr: x,
        _fnNodeToDataIndex: function (t, e) {
            return e._DT_RowIndex !== r ? e._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function (e, n, r) {
            return t.inArray(r, e.aoData[n].anCells)
        },
        _fnGetCellData: S,
        _fnSetCellData: T,
        _fnSplitObjNotation: C,
        _fnGetObjectDataFn: D,
        _fnSetObjectDataFn: _,
        _fnGetDataMaster: A,
        _fnClearTable: $,
        _fnDeleteIndex: E,
        _fnInvalidate: I,
        _fnGetRowElements: k,
        _fnCreateTr: j,
        _fnBuildHead: O,
        _fnDrawHead: L,
        _fnDraw: R,
        _fnReDraw: P,
        _fnAddOptionsHtml: F,
        _fnDetectHeader: H,
        _fnGetUniqueThs: q,
        _fnFeatureHtmlFilter: V,
        _fnFilterComplete: X,
        _fnFilterCustom: J,
        _fnFilterColumn: G,
        _fnFilter: Y,
        _fnFilterCreateSearch: Q,
        _fnEscapeRegex: fe,
        _fnFilterData: K,
        _fnFeatureHtmlInfo: et,
        _fnUpdateInfo: nt,
        _fnInfoMacros: rt,
        _fnInitialise: it,
        _fnInitComplete: ot,
        _fnLengthChange: at,
        _fnFeatureHtmlLength: st,
        _fnFeatureHtmlPaginate: lt,
        _fnPageChange: ut,
        _fnFeatureHtmlProcessing: ct,
        _fnProcessingDisplay: dt,
        _fnFeatureHtmlTable: ft,
        _fnScrollDraw: pt,
        _fnApplyToChildren: ht,
        _fnCalculateColumnWidths: gt,
        _fnThrottle: ve,
        _fnConvertToWidth: vt,
        _fnGetWidestNode: mt,
        _fnGetMaxLenString: yt,
        _fnStringToCss: bt,
        _fnSortFlatten: wt,
        _fnSort: xt,
        _fnSortAria: St,
        _fnSortListener: Tt,
        _fnSortAttachListener: Ct,
        _fnSortingClasses: Dt,
        _fnSortData: _t,
        _fnSaveState: At,
        _fnLoadState: $t,
        _fnSettingsFromNode: Et,
        _fnLog: It,
        _fnMap: kt,
        _fnBindAction: Nt,
        _fnCallbackReg: Ot,
        _fnCallbackFire: Lt,
        _fnLengthOverflow: Rt,
        _fnRenderer: Pt,
        _fnDataSource: Ft,
        _fnRowAttributes: N,
        _fnCalculateEnd: function () {}
    }), t.fn.dataTable = Vt, Vt.$ = t, t.fn.dataTableSettings = Vt.settings, t.fn.dataTableExt = Vt.ext, t.fn.DataTable = function (e) {
        return t(this).dataTable(e).api()
    }, t.each(Vt, function (e, n) {
        t.fn.DataTable[e] = n
    }), t.fn.dataTable
}),
function () {
    function t(t) {
        function e(e, n, r, i, o, a) {
            for (; o >= 0 && o < a; o += t) {
                var s = i ? i[o] : o;
                r = n(r, e[s], s, e)
            }
            return r
        }
        return function (n, r, i, o) {
            r = b(r, o, 4);
            var a = !_(n) && y.keys(n),
                s = (a || n).length,
                l = t > 0 ? 0 : s - 1;
            return arguments.length < 3 && (i = n[a ? a[l] : l], l += t), e(n, r, i, a, l, s)
        }
    }

    function e(t) {
        return function (e, n, r) {
            n = w(n, r);
            for (var i = D(e), o = t > 0 ? 0 : i - 1; o >= 0 && o < i; o += t)
                if (n(e[o], o, e)) return o;
            return -1
        }
    }

    function n(t, e, n) {
        return function (r, i, o) {
            var a = 0,
                s = D(r);
            if ("number" == typeof o) t > 0 ? a = o >= 0 ? o : Math.max(o + s, a) : s = o >= 0 ? Math.min(o + 1, s) : o + s + 1;
            else if (n && o && s) return o = n(r, i), r[o] === i ? o : -1;
            if (i !== i) return o = e(c.call(r, a, s), y.isNaN), o >= 0 ? o + a : -1;
            for (o = t > 0 ? a : s - 1; o >= 0 && o < s; o += t)
                if (r[o] === i) return o;
            return -1
        }
    }

    function r(t, e) {
        var n = k.length,
            r = t.constructor,
            i = y.isFunction(r) && r.prototype || s,
            o = "constructor";
        for (y.has(t, o) && !y.contains(e, o) && e.push(o); n--;) o = k[n], o in t && t[o] !== i[o] && !y.contains(e, o) && e.push(o)
    }
    var i = this,
        o = i._,
        a = Array.prototype,
        s = Object.prototype,
        l = Function.prototype,
        u = a.push,
        c = a.slice,
        d = s.toString,
        f = s.hasOwnProperty,
        p = Array.isArray,
        h = Object.keys,
        g = l.bind,
        v = Object.create,
        m = function () {},
        y = function (t) {
            return t instanceof y ? t : this instanceof y ? void(this._wrapped = t) : new y(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y), exports._ = y) : i._ = y, y.VERSION = "1.8.3";
    var b = function (t, e, n) {
            if (void 0 === e) return t;
            switch (null == n ? 3 : n) {
                case 1:
                    return function (n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function (n, r) {
                        return t.call(e, n, r)
                    };
                case 3:
                    return function (n, r, i) {
                        return t.call(e, n, r, i)
                    };
                case 4:
                    return function (n, r, i, o) {
                        return t.call(e, n, r, i, o)
                    }
            }
            return function () {
                return t.apply(e, arguments)
            }
        },
        w = function (t, e, n) {
            return null == t ? y.identity : y.isFunction(t) ? b(t, e, n) : y.isObject(t) ? y.matcher(t) : y.property(t)
        };
    y.iteratee = function (t, e) {
        return w(t, e, 1 / 0)
    };
    var x = function (t, e) {
            return function (n) {
                var r = arguments.length;
                if (r < 2 || null == n) return n;
                for (var i = 1; i < r; i++)
                    for (var o = arguments[i], a = t(o), s = a.length, l = 0; l < s; l++) {
                        var u = a[l];
                        e && void 0 !== n[u] || (n[u] = o[u])
                    }
                return n
            }
        },
        S = function (t) {
            if (!y.isObject(t)) return {};
            if (v) return v(t);
            m.prototype = t;
            var e = new m;
            return m.prototype = null, e
        },
        T = function (t) {
            return function (e) {
                return null == e ? void 0 : e[t]
            }
        },
        C = Math.pow(2, 53) - 1,
        D = T("length"),
        _ = function (t) {
            var e = D(t);
            return "number" == typeof e && e >= 0 && e <= C
        };
    y.each = y.forEach = function (t, e, n) {
        e = b(e, n);
        var r, i;
        if (_(t))
            for (r = 0, i = t.length; r < i; r++) e(t[r], r, t);
        else {
            var o = y.keys(t);
            for (r = 0, i = o.length; r < i; r++) e(t[o[r]], o[r], t)
        }
        return t
    }, y.map = y.collect = function (t, e, n) {
        e = w(e, n);
        for (var r = !_(t) && y.keys(t), i = (r || t).length, o = Array(i), a = 0; a < i; a++) {
            var s = r ? r[a] : a;
            o[a] = e(t[s], s, t)
        }
        return o
    }, y.reduce = y.foldl = y.inject = t(1), y.reduceRight = y.foldr = t(-1), y.find = y.detect = function (t, e, n) {
        var r;
        if (r = _(t) ? y.findIndex(t, e, n) : y.findKey(t, e, n), void 0 !== r && r !== -1) return t[r]
    }, y.filter = y.select = function (t, e, n) {
        var r = [];
        return e = w(e, n), y.each(t, function (t, n, i) {
            e(t, n, i) && r.push(t)
        }), r
    }, y.reject = function (t, e, n) {
        return y.filter(t, y.negate(w(e)), n)
    }, y.every = y.all = function (t, e, n) {
        e = w(e, n);
        for (var r = !_(t) && y.keys(t), i = (r || t).length, o = 0; o < i; o++) {
            var a = r ? r[o] : o;
            if (!e(t[a], a, t)) return !1
        }
        return !0
    }, y.some = y.any = function (t, e, n) {
        e = w(e, n);
        for (var r = !_(t) && y.keys(t), i = (r || t).length, o = 0; o < i; o++) {
            var a = r ? r[o] : o;
            if (e(t[a], a, t)) return !0
        }
        return !1
    }, y.contains = y.includes = y.include = function (t, e, n, r) {
        return _(t) || (t = y.values(t)), ("number" != typeof n || r) && (n = 0), y.indexOf(t, e, n) >= 0
    }, y.invoke = function (t, e) {
        var n = c.call(arguments, 2),
            r = y.isFunction(e);
        return y.map(t, function (t) {
            var i = r ? e : t[e];
            return null == i ? i : i.apply(t, n)
        })
    }, y.pluck = function (t, e) {
        return y.map(t, y.property(e))
    }, y.where = function (t, e) {
        return y.filter(t, y.matcher(e))
    }, y.findWhere = function (t, e) {
        return y.find(t, y.matcher(e))
    }, y.max = function (t, e, n) {
        var r, i, o = -(1 / 0),
            a = -(1 / 0);
        if (null == e && null != t) {
            t = _(t) ? t : y.values(t);
            for (var s = 0, l = t.length; s < l; s++) r = t[s], r > o && (o = r)
        } else e = w(e, n), y.each(t, function (t, n, r) {
            i = e(t, n, r), (i > a || i === -(1 / 0) && o === -(1 / 0)) && (o = t, a = i)
        });
        return o
    }, y.min = function (t, e, n) {
        var r, i, o = 1 / 0,
            a = 1 / 0;
        if (null == e && null != t) {
            t = _(t) ? t : y.values(t);
            for (var s = 0, l = t.length; s < l; s++) r = t[s], r < o && (o = r)
        } else e = w(e, n), y.each(t, function (t, n, r) {
            i = e(t, n, r), (i < a || i === 1 / 0 && o === 1 / 0) && (o = t, a = i)
        });
        return o
    }, y.shuffle = function (t) {
        for (var e, n = _(t) ? t : y.values(t), r = n.length, i = Array(r), o = 0; o < r; o++) e = y.random(0, o), e !== o && (i[o] = i[e]), i[e] = n[o];
        return i
    }, y.sample = function (t, e, n) {
        return null == e || n ? (_(t) || (t = y.values(t)), t[y.random(t.length - 1)]) : y.shuffle(t).slice(0, Math.max(0, e))
    }, y.sortBy = function (t, e, n) {
        return e = w(e, n), y.pluck(y.map(t, function (t, n, r) {
            return {
                value: t,
                index: n,
                criteria: e(t, n, r)
            }
        }).sort(function (t, e) {
            var n = t.criteria,
                r = e.criteria;
            if (n !== r) {
                if (n > r || void 0 === n) return 1;
                if (n < r || void 0 === r) return -1
            }
            return t.index - e.index
        }), "value")
    };
    var A = function (t) {
        return function (e, n, r) {
            var i = {};
            return n = w(n, r), y.each(e, function (r, o) {
                var a = n(r, o, e);
                t(i, r, a)
            }), i
        }
    };
    y.groupBy = A(function (t, e, n) {
        y.has(t, n) ? t[n].push(e) : t[n] = [e]
    }), y.indexBy = A(function (t, e, n) {
        t[n] = e
    }), y.countBy = A(function (t, e, n) {
        y.has(t, n) ? t[n]++ : t[n] = 1
    }), y.toArray = function (t) {
        return t ? y.isArray(t) ? c.call(t) : _(t) ? y.map(t, y.identity) : y.values(t) : []
    }, y.size = function (t) {
        return null == t ? 0 : _(t) ? t.length : y.keys(t).length
    }, y.partition = function (t, e, n) {
        e = w(e, n);
        var r = [],
            i = [];
        return y.each(t, function (t, n, o) {
            (e(t, n, o) ? r : i).push(t)
        }), [r, i]
    }, y.first = y.head = y.take = function (t, e, n) {
        if (null != t) return null == e || n ? t[0] : y.initial(t, t.length - e)
    }, y.initial = function (t, e, n) {
        return c.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
    }, y.last = function (t, e, n) {
        if (null != t) return null == e || n ? t[t.length - 1] : y.rest(t, Math.max(0, t.length - e))
    }, y.rest = y.tail = y.drop = function (t, e, n) {
        return c.call(t, null == e || n ? 1 : e)
    }, y.compact = function (t) {
        return y.filter(t, y.identity)
    };
    var $ = function (t, e, n, r) {
        for (var i = [], o = 0, a = r || 0, s = D(t); a < s; a++) {
            var l = t[a];
            if (_(l) && (y.isArray(l) || y.isArguments(l))) {
                e || (l = $(l, e, n));
                var u = 0,
                    c = l.length;
                for (i.length += c; u < c;) i[o++] = l[u++]
            } else n || (i[o++] = l)
        }
        return i
    };
    y.flatten = function (t, e) {
        return $(t, e, !1)
    }, y.without = function (t) {
        return y.difference(t, c.call(arguments, 1))
    }, y.uniq = y.unique = function (t, e, n, r) {
        y.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = w(n, r));
        for (var i = [], o = [], a = 0, s = D(t); a < s; a++) {
            var l = t[a],
                u = n ? n(l, a, t) : l;
            e ? (a && o === u || i.push(l), o = u) : n ? y.contains(o, u) || (o.push(u), i.push(l)) : y.contains(i, l) || i.push(l)
        }
        return i
    }, y.union = function () {
        return y.uniq($(arguments, !0, !0))
    }, y.intersection = function (t) {
        for (var e = [], n = arguments.length, r = 0, i = D(t); r < i; r++) {
            var o = t[r];
            if (!y.contains(e, o)) {
                for (var a = 1; a < n && y.contains(arguments[a], o); a++);
                a === n && e.push(o)
            }
        }
        return e
    }, y.difference = function (t) {
        var e = $(arguments, !0, !0, 1);
        return y.filter(t, function (t) {
            return !y.contains(e, t)
        })
    }, y.zip = function () {
        return y.unzip(arguments)
    }, y.unzip = function (t) {
        for (var e = t && y.max(t, D).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = y.pluck(t, r);
        return n
    }, y.object = function (t, e) {
        for (var n = {}, r = 0, i = D(t); r < i; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
        return n
    }, y.findIndex = e(1), y.findLastIndex = e(-1), y.sortedIndex = function (t, e, n, r) {
        n = w(n, r, 1);
        for (var i = n(e), o = 0, a = D(t); o < a;) {
            var s = Math.floor((o + a) / 2);
            n(t[s]) < i ? o = s + 1 : a = s
        }
        return o
    }, y.indexOf = n(1, y.findIndex, y.sortedIndex), y.lastIndexOf = n(-1, y.findLastIndex), y.range = function (t, e, n) {
        null == e && (e = t || 0, t = 0), n = n || 1;
        for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), o = 0; o < r; o++, t += n) i[o] = t;
        return i
    };
    var E = function (t, e, n, r, i) {
        if (!(r instanceof e)) return t.apply(n, i);
        var o = S(t.prototype),
            a = t.apply(o, i);
        return y.isObject(a) ? a : o
    };
    y.bind = function (t, e) {
        if (g && t.bind === g) return g.apply(t, c.call(arguments, 1));
        if (!y.isFunction(t)) throw new TypeError("Bind must be called on a function");
        var n = c.call(arguments, 2),
            r = function () {
                return E(t, r, e, this, n.concat(c.call(arguments)))
            };
        return r
    }, y.partial = function (t) {
        var e = c.call(arguments, 1),
            n = function () {
                for (var r = 0, i = e.length, o = Array(i), a = 0; a < i; a++) o[a] = e[a] === y ? arguments[r++] : e[a];
                for (; r < arguments.length;) o.push(arguments[r++]);
                return E(t, n, this, this, o)
            };
        return n
    }, y.bindAll = function (t) {
        var e, n, r = arguments.length;
        if (r <= 1) throw new Error("bindAll must be passed function names");
        for (e = 1; e < r; e++) n = arguments[e], t[n] = y.bind(t[n], t);
        return t
    }, y.memoize = function (t, e) {
        var n = function (r) {
            var i = n.cache,
                o = "" + (e ? e.apply(this, arguments) : r);
            return y.has(i, o) || (i[o] = t.apply(this, arguments)), i[o]
        };
        return n.cache = {}, n
    }, y.delay = function (t, e) {
        var n = c.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, n)
        }, e)
    }, y.defer = y.partial(y.delay, y, 1), y.throttle = function (t, e, n) {
        var r, i, o, a = null,
            s = 0;
        n || (n = {});
        var l = function () {
            s = n.leading === !1 ? 0 : y.now(), a = null, o = t.apply(r, i), a || (r = i = null)
        };
        return function () {
            var u = y.now();
            s || n.leading !== !1 || (s = u);
            var c = e - (u - s);
            return r = this, i = arguments, c <= 0 || c > e ? (a && (clearTimeout(a), a = null), s = u, o = t.apply(r, i), a || (r = i = null)) : a || n.trailing === !1 || (a = setTimeout(l, c)), o
        }
    }, y.debounce = function (t, e, n) {
        var r, i, o, a, s, l = function () {
            var u = y.now() - a;
            u < e && u >= 0 ? r = setTimeout(l, e - u) : (r = null, n || (s = t.apply(o, i), r || (o = i = null)))
        };
        return function () {
            o = this, i = arguments, a = y.now();
            var u = n && !r;
            return r || (r = setTimeout(l, e)), u && (s = t.apply(o, i), o = i = null), s
        }
    }, y.wrap = function (t, e) {
        return y.partial(e, t)
    }, y.negate = function (t) {
        return function () {
            return !t.apply(this, arguments)
        }
    }, y.compose = function () {
        var t = arguments,
            e = t.length - 1;
        return function () {
            for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
            return r
        }
    }, y.after = function (t, e) {
        return function () {
            if (--t < 1) return e.apply(this, arguments)
        }
    }, y.before = function (t, e) {
        var n;
        return function () {
            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
        }
    }, y.once = y.partial(y.before, 2);
    var I = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        k = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    y.keys = function (t) {
        if (!y.isObject(t)) return [];
        if (h) return h(t);
        var e = [];
        for (var n in t) y.has(t, n) && e.push(n);
        return I && r(t, e), e
    }, y.allKeys = function (t) {
        if (!y.isObject(t)) return [];
        var e = [];
        for (var n in t) e.push(n);
        return I && r(t, e), e
    }, y.values = function (t) {
        for (var e = y.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = t[e[i]];
        return r
    }, y.mapObject = function (t, e, n) {
        e = w(e, n);
        for (var r, i = y.keys(t), o = i.length, a = {}, s = 0; s < o; s++) r = i[s], a[r] = e(t[r], r, t);
        return a
    }, y.pairs = function (t) {
        for (var e = y.keys(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = [e[i], t[e[i]]];
        return r
    }, y.invert = function (t) {
        for (var e = {}, n = y.keys(t), r = 0, i = n.length; r < i; r++) e[t[n[r]]] = n[r];
        return e
    }, y.functions = y.methods = function (t) {
        var e = [];
        for (var n in t) y.isFunction(t[n]) && e.push(n);
        return e.sort()
    }, y.extend = x(y.allKeys), y.extendOwn = y.assign = x(y.keys), y.findKey = function (t, e, n) {
        e = w(e, n);
        for (var r, i = y.keys(t), o = 0, a = i.length; o < a; o++)
            if (r = i[o], e(t[r], r, t)) return r
    }, y.pick = function (t, e, n) {
        var r, i, o = {},
            a = t;
        if (null == a) return o;
        y.isFunction(e) ? (i = y.allKeys(a), r = b(e, n)) : (i = $(arguments, !1, !1, 1), r = function (t, e, n) {
            return e in n
        }, a = Object(a));
        for (var s = 0, l = i.length; s < l; s++) {
            var u = i[s],
                c = a[u];
            r(c, u, a) && (o[u] = c)
        }
        return o
    }, y.omit = function (t, e, n) {
        if (y.isFunction(e)) e = y.negate(e);
        else {
            var r = y.map($(arguments, !1, !1, 1), String);
            e = function (t, e) {
                return !y.contains(r, e)
            }
        }
        return y.pick(t, e, n)
    }, y.defaults = x(y.allKeys, !0), y.create = function (t, e) {
        var n = S(t);
        return e && y.extendOwn(n, e), n
    }, y.clone = function (t) {
        return y.isObject(t) ? y.isArray(t) ? t.slice() : y.extend({}, t) : t
    }, y.tap = function (t, e) {
        return e(t), t
    }, y.isMatch = function (t, e) {
        var n = y.keys(e),
            r = n.length;
        if (null == t) return !r;
        for (var i = Object(t), o = 0; o < r; o++) {
            var a = n[o];
            if (e[a] !== i[a] || !(a in i)) return !1
        }
        return !0
    };
    var j = function (t, e, n, r) {
        if (t === e) return 0 !== t || 1 / t === 1 / e;
        if (null == t || null == e) return t === e;
        t instanceof y && (t = t._wrapped), e instanceof y && (e = e._wrapped);
        var i = d.call(t);
        if (i !== d.call(e)) return !1;
        switch (i) {
            case "[object RegExp]":
            case "[object String]":
                return "" + t == "" + e;
            case "[object Number]":
                return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
            case "[object Date]":
            case "[object Boolean]":
                return +t === +e
        }
        var o = "[object Array]" === i;
        if (!o) {
            if ("object" != typeof t || "object" != typeof e) return !1;
            var a = t.constructor,
                s = e.constructor;
            if (a !== s && !(y.isFunction(a) && a instanceof a && y.isFunction(s) && s instanceof s) && "constructor" in t && "constructor" in e) return !1
        }
        n = n || [], r = r || [];
        for (var l = n.length; l--;)
            if (n[l] === t) return r[l] === e;
        if (n.push(t), r.push(e), o) {
            if (l = t.length, l !== e.length) return !1;
            for (; l--;)
                if (!j(t[l], e[l], n, r)) return !1
        } else {
            var u, c = y.keys(t);
            if (l = c.length, y.keys(e).length !== l) return !1;
            for (; l--;)
                if (u = c[l], !y.has(e, u) || !j(t[u], e[u], n, r)) return !1
        }
        return n.pop(), r.pop(), !0
    };
    y.isEqual = function (t, e) {
        return j(t, e)
    }, y.isEmpty = function (t) {
        return null == t || (_(t) && (y.isArray(t) || y.isString(t) || y.isArguments(t)) ? 0 === t.length : 0 === y.keys(t).length)
    }, y.isElement = function (t) {
        return !(!t || 1 !== t.nodeType)
    }, y.isArray = p || function (t) {
        return "[object Array]" === d.call(t)
    }, y.isObject = function (t) {
        var e = typeof t;
        return "function" === e || "object" === e && !!t
    }, y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (t) {
        y["is" + t] = function (e) {
            return d.call(e) === "[object " + t + "]"
        }
    }), y.isArguments(arguments) || (y.isArguments = function (t) {
        return y.has(t, "callee")
    }), "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function (t) {
        return "function" == typeof t || !1
    }), y.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, y.isNaN = function (t) {
        return y.isNumber(t) && t !== +t
    }, y.isBoolean = function (t) {
        return t === !0 || t === !1 || "[object Boolean]" === d.call(t)
    }, y.isNull = function (t) {
        return null === t
    }, y.isUndefined = function (t) {
        return void 0 === t
    }, y.has = function (t, e) {
        return null != t && f.call(t, e)
    }, y.noConflict = function () {
        return i._ = o, this
    }, y.identity = function (t) {
        return t
    }, y.constant = function (t) {
        return function () {
            return t
        }
    }, y.noop = function () {}, y.property = T, y.propertyOf = function (t) {
        return null == t ? function () {} : function (e) {
            return t[e]
        }
    }, y.matcher = y.matches = function (t) {
        return t = y.extendOwn({}, t),
            function (e) {
                return y.isMatch(e, t)
            }
    }, y.times = function (t, e, n) {
        var r = Array(Math.max(0, t));
        e = b(e, n, 1);
        for (var i = 0; i < t; i++) r[i] = e(i);
        return r
    }, y.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    }, y.now = Date.now || function () {
        return (new Date).getTime()
    };
    var N = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        O = y.invert(N),
        L = function (t) {
            var e = function (e) {
                    return t[e]
                },
                n = "(?:" + y.keys(t).join("|") + ")",
                r = RegExp(n),
                i = RegExp(n, "g");
            return function (t) {
                return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t
            }
        };
    y.escape = L(N), y.unescape = L(O), y.result = function (t, e, n) {
        var r = null == t ? void 0 : t[e];
        return void 0 === r && (r = n), y.isFunction(r) ? r.call(t) : r
    };
    var R = 0;
    y.uniqueId = function (t) {
        var e = ++R + "";
        return t ? t + e : e
    }, y.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var P = /(.)^/,
        F = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        H = /\\|'|\r|\n|\u2028|\u2029/g,
        q = function (t) {
            return "\\" + F[t]
        };
    y.template = function (t, e, n) {
        !e && n && (e = n), e = y.defaults({}, e, y.templateSettings);
        var r = RegExp([(e.escape || P).source, (e.interpolate || P).source, (e.evaluate || P).source].join("|") + "|$", "g"),
            i = 0,
            o = "__p+='";
        t.replace(r, function (e, n, r, a, s) {
            return o += t.slice(i, s).replace(H, q), i = s + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"), e
        }), o += "';\n", e.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            var a = new Function(e.variable || "obj", "_", o)
        } catch (s) {
            throw s.source = o, s
        }
        var l = function (t) {
                return a.call(this, t, y)
            },
            u = e.variable || "obj";
        return l.source = "function(" + u + "){\n" + o + "}", l
    }, y.chain = function (t) {
        var e = y(t);
        return e._chain = !0, e
    };
    var M = function (t, e) {
        return t._chain ? y(e).chain() : e
    };
    y.mixin = function (t) {
        y.each(y.functions(t), function (e) {
            var n = y[e] = t[e];
            y.prototype[e] = function () {
                var t = [this._wrapped];
                return u.apply(t, arguments), M(this, n.apply(y, t))
            }
        })
    }, y.mixin(y), y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = a[t];
        y.prototype[t] = function () {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], M(this, n)
        }
    }), y.each(["concat", "join", "slice"], function (t) {
        var e = a[t];
        y.prototype[t] = function () {
            return M(this, e.apply(this._wrapped, arguments))
        }
    }), y.prototype.value = function () {
        return this._wrapped
    }, y.prototype.valueOf = y.prototype.toJSON = y.prototype.value, y.prototype.toString = function () {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return y
    })
}.call(this);