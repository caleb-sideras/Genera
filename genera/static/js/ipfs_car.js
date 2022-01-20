var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (e,t,r)=>t in e ? __defProp(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
}) : e[t] = r, __spreadValues = (e,t)=>{
    for (var r in t || (t = {}))
        __hasOwnProp.call(t, r) && __defNormalProp(e, r, t[r]);
    if (__getOwnPropSymbols)
        for (var r of __getOwnPropSymbols(t))
            __propIsEnum.call(t, r) && __defNormalProp(e, r, t[r]);
    return e
}
, __spreadProps = (e,t)=>__defProps(e, __getOwnPropDescs(t)), n, u$1, i$2, t$1, r$1 = {}, f$1 = [], e$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function c$1(e, t) {
    for (var r in t)
        e[r] = t[r];
    return e
}
function s(e) {
    var t = e.parentNode;
    t && t.removeChild(e)
}
function a$1(e, t, r) {
    var n, i, o, s = arguments, a = {};
    for (o in t)
        "key" == o ? n = t[o] : "ref" == o ? i = t[o] : a[o] = t[o];
    if (arguments.length > 3)
        for (r = [r],
        o = 3; o < arguments.length; o++)
            r.push(s[o]);
    if (null != r && (a.children = r),
    "function" == typeof e && null != e.defaultProps)
        for (o in e.defaultProps)
            void 0 === a[o] && (a[o] = e.defaultProps[o]);
    return v$3(e, a, n, i, null)
}
function v$3(e, t, r, i, o) {
    var s = {
        type: e,
        props: t,
        key: r,
        ref: i,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++n.__v : o
    };
    return null != n.vnode && n.vnode(s),
    s
}
function y$1(e) {
    return e.children
}
function p$1(e, t) {
    this.props = e,
    this.context = t
}
function d(e, t) {
    if (null == t)
        return e.__ ? d(e.__, e.__.__k.indexOf(e) + 1) : null;
    for (var r; t < e.__k.length; t++)
        if (null != (r = e.__k[t]) && null != r.__e)
            return r.__e;
    return "function" == typeof e.type ? d(e) : null
}
function _(e) {
    var t, r;
    if (null != (e = e.__) && null != e.__c) {
        for (e.__e = e.__c.base = null,
        t = 0; t < e.__k.length; t++)
            if (null != (r = e.__k[t]) && null != r.__e) {
                e.__e = e.__c.base = r.__e;
                break
            }
        return _(e)
    }
}
function k$1(e) {
    (!e.__d && (e.__d = !0) && u$1.push(e) && !b$1.__r++ || t$1 !== n.debounceRendering) && ((t$1 = n.debounceRendering) || i$2)(b$1)
}
function b$1() {
    for (var e; b$1.__r = u$1.length; )
        e = u$1.sort((function(e, t) {
            return e.__v.__b - t.__v.__b
        }
        )),
        u$1 = [],
        e.some((function(e) {
            var t, r, n, i, o, s;
            e.__d && (o = (i = (t = e).__v).__e,
            (s = t.__P) && (r = [],
            (n = c$1({}, i)).__v = i.__v + 1,
            I(s, i, n, t.__n, void 0 !== s.ownerSVGElement, null != i.__h ? [o] : null, r, null == o ? d(i) : o, i.__h),
            T(r, i),
            i.__e != o && _(i)))
        }
        ))
}
function m$3(e, t, r, n, i, o, s, a, c, u) {
    var l, f, h, p, y, b, g, m = n && n.__k || f$1, k = m.length;
    for (r.__k = [],
    l = 0; l < t.length; l++)
        if (null != (p = r.__k[l] = null == (p = t[l]) || "boolean" == typeof p ? null : "string" == typeof p || "number" == typeof p || "bigint" == typeof p ? v$3(null, p, null, null, p) : Array.isArray(p) ? v$3(y$1, {
            children: p
        }, null, null, null) : p.__b > 0 ? v$3(p.type, p.props, p.key, null, p.__v) : p)) {
            if (p.__ = r,
            p.__b = r.__b + 1,
            null === (h = m[l]) || h && p.key == h.key && p.type === h.type)
                m[l] = void 0;
            else
                for (f = 0; f < k; f++) {
                    if ((h = m[f]) && p.key == h.key && p.type === h.type) {
                        m[f] = void 0;
                        break
                    }
                    h = null
                }
            I(e, p, h = h || r$1, i, o, s, a, c, u),
            y = p.__e,
            (f = p.ref) && h.ref != f && (g || (g = []),
            h.ref && g.push(h.ref, null, p),
            g.push(f, p.__c || y, p)),
            null != y ? (null == b && (b = y),
            "function" == typeof p.type && null != p.__k && p.__k === h.__k ? p.__d = c = g$1(p, c, e) : c = x$1(e, p, h, m, y, c),
            u || "option" !== r.type ? "function" == typeof r.type && (r.__d = c) : e.value = "") : c && h.__e == c && c.parentNode != e && (c = d(h))
        }
    for (r.__e = b,
    l = k; l--; )
        null != m[l] && ("function" == typeof r.type && null != m[l].__e && m[l].__e == r.__d && (r.__d = d(n, l + 1)),
        L(m[l], m[l]));
    if (g)
        for (l = 0; l < g.length; l++)
            z(g[l], g[++l], g[++l])
}
function g$1(e, t, r) {
    var n, i;
    for (n = 0; n < e.__k.length; n++)
        (i = e.__k[n]) && (i.__ = e,
        t = "function" == typeof i.type ? g$1(i, t, r) : x$1(r, i, i, e.__k, i.__e, t));
    return t
}
function x$1(e, t, r, n, i, o) {
    var s, a, c;
    if (void 0 !== t.__d)
        s = t.__d,
        t.__d = void 0;
    else if (null == r || i != o || null == i.parentNode)
        e: if (null == o || o.parentNode !== e)
            e.appendChild(i),
            s = null;
        else {
            for (a = o,
            c = 0; (a = a.nextSibling) && c < n.length; c += 2)
                if (a == i)
                    break e;
            e.insertBefore(i, o),
            s = o
        }
    return void 0 !== s ? s : i.nextSibling
}
function A(e, t, r, n, i) {
    var o;
    for (o in r)
        "children" === o || "key" === o || o in t || C(e, o, null, r[o], n);
    for (o in t)
        i && "function" != typeof t[o] || "children" === o || "key" === o || "value" === o || "checked" === o || r[o] === t[o] || C(e, o, t[o], r[o], n)
}
function P(e, t, r) {
    "-" === t[0] ? e.setProperty(t, r) : e[t] = null == r ? "" : "number" != typeof r || e$1.test(t) ? r : r + "px"
}
function C(e, t, r, n, i) {
    var o;
    e: if ("style" === t)
        if ("string" == typeof r)
            e.style.cssText = r;
        else {
            if ("string" == typeof n && (e.style.cssText = n = ""),
            n)
                for (t in n)
                    r && t in r || P(e.style, t, "");
            if (r)
                for (t in r)
                    n && r[t] === n[t] || P(e.style, t, r[t])
        }
    else if ("o" === t[0] && "n" === t[1])
        o = t !== (t = t.replace(/Capture$/, "")),
        t = t.toLowerCase()in e ? t.toLowerCase().slice(2) : t.slice(2),
        e.l || (e.l = {}),
        e.l[t + o] = r,
        r ? n || e.addEventListener(t, o ? H : $, o) : e.removeEventListener(t, o ? H : $, o);
    else if ("dangerouslySetInnerHTML" !== t) {
        if (i)
            t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e)
            try {
                e[t] = null == r ? "" : r;
                break e
            } catch (s) {}
        "function" == typeof r || (null != r && (!1 !== r || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, r) : e.removeAttribute(t))
    }
}
function $(e) {
    this.l[e.type + !1](n.event ? n.event(e) : e)
}
function H(e) {
    this.l[e.type + !0](n.event ? n.event(e) : e)
}
function I(e, t, r, i, o, s, a, c, u) {
    var l, f, h, d, p, y, b, g, m, k, w, _ = t.type;
    if (void 0 !== t.constructor)
        return null;
    null != r.__h && (u = r.__h,
    c = t.__e = r.__e,
    t.__h = null,
    s = [c]),
    (l = n.__b) && l(t);
    try {
        e: if ("function" == typeof _) {
            if (g = t.props,
            m = (l = _.contextType) && i[l.__c],
            k = l ? m ? m.props.value : l.__ : i,
            r.__c ? b = (f = t.__c = r.__c).__ = f.__E : ("prototype"in _ && _.prototype.render ? t.__c = f = new _(g,k) : (t.__c = f = new p$1(g,k),
            f.constructor = _,
            f.render = M),
            m && m.sub(f),
            f.props = g,
            f.state || (f.state = {}),
            f.context = k,
            f.__n = i,
            h = f.__d = !0,
            f.__h = []),
            null == f.__s && (f.__s = f.state),
            null != _.getDerivedStateFromProps && (f.__s == f.state && (f.__s = c$1({}, f.__s)),
            c$1(f.__s, _.getDerivedStateFromProps(g, f.__s))),
            d = f.props,
            p = f.state,
            h)
                null == _.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(),
                null != f.componentDidMount && f.__h.push(f.componentDidMount);
            else {
                if (null == _.getDerivedStateFromProps && g !== d && null != f.componentWillReceiveProps && f.componentWillReceiveProps(g, k),
                !f.__e && null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(g, f.__s, k) || t.__v === r.__v) {
                    f.props = g,
                    f.state = f.__s,
                    t.__v !== r.__v && (f.__d = !1),
                    f.__v = t,
                    t.__e = r.__e,
                    t.__k = r.__k,
                    t.__k.forEach((function(e) {
                        e && (e.__ = t)
                    }
                    )),
                    f.__h.length && a.push(f);
                    break e
                }
                null != f.componentWillUpdate && f.componentWillUpdate(g, f.__s, k),
                null != f.componentDidUpdate && f.__h.push((function() {
                    f.componentDidUpdate(d, p, y)
                }
                ))
            }
            f.context = k,
            f.props = g,
            f.state = f.__s,
            (l = n.__r) && l(t),
            f.__d = !1,
            f.__v = t,
            f.__P = e,
            l = f.render(f.props, f.state, f.context),
            f.state = f.__s,
            null != f.getChildContext && (i = c$1(c$1({}, i), f.getChildContext())),
            h || null == f.getSnapshotBeforeUpdate || (y = f.getSnapshotBeforeUpdate(d, p)),
            w = null != l && l.type === y$1 && null == l.key ? l.props.children : l,
            m$3(e, Array.isArray(w) ? w : [w], t, r, i, o, s, a, c, u),
            f.base = t.__e,
            t.__h = null,
            f.__h.length && a.push(f),
            b && (f.__E = f.__ = null),
            f.__e = !1
        } else
            null == s && t.__v === r.__v ? (t.__k = r.__k,
            t.__e = r.__e) : t.__e = j$1(r.__e, t, r, i, o, s, a, u);
        (l = n.diffed) && l(t)
    } catch ($) {
        t.__v = null,
        (u || null != s) && (t.__e = c,
        t.__h = !!u,
        s[s.indexOf(c)] = null),
        n.__e($, t, r)
    }
}
function T(e, t) {
    n.__c && n.__c(t, e),
    e.some((function(t) {
        try {
            e = t.__h,
            t.__h = [],
            e.some((function(e) {
                e.call(t)
            }
            ))
        } catch (r) {
            n.__e(r, t.__v)
        }
    }
    ))
}
function j$1(e, t, r, n, i, o, a, c) {
    var u, l, f, h, d = r.props, p = t.props, y = t.type, b = 0;
    if ("svg" === y && (i = !0),
    null != o)
        for (; b < o.length; b++)
            if ((u = o[b]) && (u === e || (y ? u.localName == y : 3 == u.nodeType))) {
                e = u,
                o[b] = null;
                break
            }
    if (null == e) {
        if (null === y)
            return document.createTextNode(p);
        e = i ? document.createElementNS("http://www.w3.org/2000/svg", y) : document.createElement(y, p.is && p),
        o = null,
        c = !1
    }
    if (null === y)
        d === p || c && e.data === p || (e.data = p);
    else {
        if (o = o && f$1.slice.call(e.childNodes),
        l = (d = r.props || r$1).dangerouslySetInnerHTML,
        f = p.dangerouslySetInnerHTML,
        !c) {
            if (null != o)
                for (d = {},
                h = 0; h < e.attributes.length; h++)
                    d[e.attributes[h].name] = e.attributes[h].value;
            (f || l) && (f && (l && f.__html == l.__html || f.__html === e.innerHTML) || (e.innerHTML = f && f.__html || ""))
        }
        if (A(e, p, d, i, c),
        f)
            t.__k = [];
        else if (b = t.props.children,
        m$3(e, Array.isArray(b) ? b : [b], t, r, n, i && "foreignObject" !== y, o, a, e.firstChild, c),
        null != o)
            for (b = o.length; b--; )
                null != o[b] && s(o[b]);
        c || ("value"in p && void 0 !== (b = p.value) && (b !== e.value || "progress" === y && !b) && C(e, "value", b, d.value, !1),
        "checked"in p && void 0 !== (b = p.checked) && b !== e.checked && C(e, "checked", b, d.checked, !1))
    }
    return e
}
function z(e, t, r) {
    try {
        "function" == typeof e ? e(t) : e.current = t
    } catch (i) {
        n.__e(i, r)
    }
}
function L(e, t, r) {
    var i, o, a;
    if (n.unmount && n.unmount(e),
    (i = e.ref) && (i.current && i.current !== e.__e || z(i, null, t)),
    r || "function" == typeof e.type || (r = null != (o = e.__e)),
    e.__e = e.__d = void 0,
    null != (i = e.__c)) {
        if (i.componentWillUnmount)
            try {
                i.componentWillUnmount()
            } catch (c) {
                n.__e(c, t)
            }
        i.base = i.__P = null
    }
    if (i = e.__k)
        for (a = 0; a < i.length; a++)
            i[a] && L(i[a], t, r);
    null != o && s(o)
}
function M(e, t, r) {
    return this.constructor(e, r)
}
function N(e, t, r) {
    var i, o, s;
    n.__ && n.__(e, t),
    o = (i = "function" == typeof r) ? null : r && r.__k || t.__k,
    s = [],
    I(t, e = (!i && r || t).__k = a$1(y$1, null, [e]), o || r$1, r$1, void 0 !== t.ownerSVGElement, !i && r ? [r] : o ? null : t.firstChild ? f$1.slice.call(t.childNodes) : null, s, !i && r ? r : o ? o.__e : t.firstChild, i),
    T(s, e)
}
n = {
    __e: function(e, t) {
        for (var r, n, i; t = t.__; )
            if ((r = t.__c) && !r.__)
                try {
                    if ((n = r.constructor) && null != n.getDerivedStateFromError && (r.setState(n.getDerivedStateFromError(e)),
                    i = r.__d),
                    null != r.componentDidCatch && (r.componentDidCatch(e),
                    i = r.__d),
                    i)
                        return r.__E = r
                } catch (o) {
                    e = o
                }
        throw e
    },
    __v: 0
},
p$1.prototype.setState = function(e, t) {
    var r;
    r = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c$1({}, this.state),
    "function" == typeof e && (e = e(c$1({}, r), this.props)),
    e && c$1(r, e),
    null != e && this.__v && (t && this.__h.push(t),
    k$1(this))
}
,
p$1.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0,
    e && this.__h.push(e),
    k$1(this))
}
,
p$1.prototype.render = y$1,
u$1 = [],
i$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
b$1.__r = 0;
var t, u, r, o = 0, i$1 = [], c = n.__b, f = n.__r, e = n.diffed, a = n.__c, v$2 = n.unmount;
function m$2(e, t) {
    n.__h && n.__h(u, e, o || t),
    o = 0;
    var r = u.__H || (u.__H = {
        __: [],
        __h: []
    });
    return e >= r.__.length && r.__.push({}),
    r.__[e]
}
function l(e) {
    return o = 1,
    p(w, e)
}
function p(e, r, n) {
    var i = m$2(t++, 2);
    return i.t = e,
    i.__c || (i.__ = [n ? n(r) : w(void 0, r), function(e) {
        var t = i.t(i.__[0], e);
        i.__[0] !== t && (i.__ = [t, i.__[1]],
        i.__c.setState({}))
    }
    ],
    i.__c = u),
    i.__
}
function y(e, r) {
    var i = m$2(t++, 3);
    !n.__s && k(i.__H, r) && (i.__ = e,
    i.__H = r,
    u.__H.__h.push(i))
}
function x() {
    i$1.forEach((function(e) {
        if (e.__P)
            try {
                e.__H.__h.forEach(g),
                e.__H.__h.forEach(j),
                e.__H.__h = []
            } catch (t) {
                e.__H.__h = [],
                n.__e(t, e.__v)
            }
    }
    )),
    i$1 = []
}
n.__b = function(e) {
    u = null,
    c && c(e)
}
,
n.__r = function(e) {
    f && f(e),
    t = 0;
    var r = (u = e.__c).__H;
    r && (r.__h.forEach(g),
    r.__h.forEach(j),
    r.__h = [])
}
,
n.diffed = function(t) {
    e && e(t);
    var i = t.__c;
    i && i.__H && i.__H.__h.length && (1 !== i$1.push(i) && r === n.requestAnimationFrame || ((r = n.requestAnimationFrame) || function(e) {
        var t, r = function() {
            clearTimeout(n),
            b && cancelAnimationFrame(t),
            setTimeout(e)
        }, n = setTimeout(r, 100);
        b && (t = requestAnimationFrame(r))
    }
    )(x)),
    u = void 0
}
,
n.__c = function(e, t) {
    t.some((function(e) {
        try {
            e.__h.forEach(g),
            e.__h = e.__h.filter((function(e) {
                return !e.__ || j(e)
            }
            ))
        } catch (r) {
            t.some((function(e) {
                e.__h && (e.__h = [])
            }
            )),
            t = [],
            n.__e(r, e.__v)
        }
    }
    )),
    a && a(e, t)
}
,
n.unmount = function(e) {
    v$2 && v$2(e);
    var t = e.__c;
    if (t && t.__H)
        try {
            t.__H.__.forEach(g)
        } catch (r) {
            n.__e(r, t.__v)
        }
}
;
var b = "function" == typeof requestAnimationFrame;
function g(e) {
    var t = u;
    "function" == typeof e.__c && e.__c(),
    u = t
}
function j(e) {
    var t = u;
    e.__c = e.__(),
    u = t
}
function k(e, t) {
    return !e || e.length !== t.length || t.some((function(t, r) {
        return t !== e[r]
    }
    ))
}
function w(e, t) {
    return "function" == typeof t ? t(e) : t
}
var encode_1$3 = encode$f
  , MSB$6 = 128
  , REST$6 = 127
  , MSBALL$3 = ~REST$6
  , INT$3 = Math.pow(2, 31);
function encode$f(e, t, r) {
    t = t || [];
    for (var n = r = r || 0; e >= INT$3; )
        t[r++] = 255 & e | MSB$6,
        e /= 128;
    for (; e & MSBALL$3; )
        t[r++] = 255 & e | MSB$6,
        e >>>= 7;
    return t[r] = 0 | e,
    encode$f.bytes = r - n + 1,
    t
}
var decode$c = read$3
  , MSB$1$1 = 128
  , REST$1$1 = 127;
function read$3(e, t) {
    var r, n = 0, i = 0, o = t = t || 0, s = e.length;
    do {
        if (o >= s)
            throw read$3.bytes = 0,
            new RangeError("Could not decode varint");
        r = e[o++],
        n += i < 28 ? (r & REST$1$1) << i : (r & REST$1$1) * Math.pow(2, i),
        i += 7
    } while (r >= MSB$1$1);
    return read$3.bytes = o - t,
    n
}
var N1$3 = Math.pow(2, 7)
  , N2$3 = Math.pow(2, 14)
  , N3$3 = Math.pow(2, 21)
  , N4$3 = Math.pow(2, 28)
  , N5$3 = Math.pow(2, 35)
  , N6$3 = Math.pow(2, 42)
  , N7$3 = Math.pow(2, 49)
  , N8$3 = Math.pow(2, 56)
  , N9$3 = Math.pow(2, 63)
  , length$3 = function(e) {
    return e < N1$3 ? 1 : e < N2$3 ? 2 : e < N3$3 ? 3 : e < N4$3 ? 4 : e < N5$3 ? 5 : e < N6$3 ? 6 : e < N7$3 ? 7 : e < N8$3 ? 8 : e < N9$3 ? 9 : 10
}
  , varint$6 = {
    encode: encode_1$3,
    decode: decode$c,
    encodingLength: length$3
}
  , _brrp_varint = varint$6;
const decode$b = e=>[_brrp_varint.decode(e), _brrp_varint.decode.bytes]
  , encodeTo = (e,t,r=0)=>(_brrp_varint.encode(e, t, r),
t)
  , encodingLength = e=>_brrp_varint.encodingLength(e)
  , equals$3 = (e,t)=>{
    if (e === t)
        return !0;
    if (e.byteLength !== t.byteLength)
        return !1;
    for (let r = 0; r < e.byteLength; r++)
        if (e[r] !== t[r])
            return !1;
    return !0
}
  , coerce = e=>{
    if (e instanceof Uint8Array && "Uint8Array" === e.constructor.name)
        return e;
    if (e instanceof ArrayBuffer)
        return new Uint8Array(e);
    if (ArrayBuffer.isView(e))
        return new Uint8Array(e.buffer,e.byteOffset,e.byteLength);
    throw new Error("Unknown type, must be binary type")
}
  , create$5 = (e,t)=>{
    const r = t.byteLength
      , n = encodingLength(e)
      , i = n + encodingLength(r)
      , o = new Uint8Array(i + r);
    return encodeTo(e, o, 0),
    encodeTo(r, o, n),
    o.set(t, i),
    new Digest(e,r,t,o)
}
  , decode$a = e=>{
    const t = coerce(e)
      , [r,n] = decode$b(t)
      , [i,o] = decode$b(t.subarray(n))
      , s = t.subarray(n + o);
    if (s.byteLength !== i)
        throw new Error("Incorrect length");
    return new Digest(r,i,s,t)
}
  , equals$2 = (e,t)=>e === t || e.code === t.code && e.size === t.size && equals$3(e.bytes, t.bytes);
class Digest {
    constructor(e, t, r, n) {
        this.code = e,
        this.size = t,
        this.digest = r,
        this.bytes = n
    }
}
function base$2(e) {
    if (e.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), r = 0; r < t.length; r++)
        t[r] = 255;
    for (var n = 0; n < e.length; n++) {
        var i = e.charAt(n)
          , o = i.charCodeAt(0);
        if (255 !== t[o])
            throw new TypeError(i + " is ambiguous");
        t[o] = n
    }
    var s = e.length
      , a = e.charAt(0)
      , c = Math.log(s) / Math.log(256)
      , u = Math.log(256) / Math.log(s);
    function l(e) {
        if ("string" != typeof e)
            throw new TypeError("Expected String");
        if (0 === e.length)
            return new Uint8Array;
        var r = 0;
        if (" " !== e[r]) {
            for (var n = 0, i = 0; e[r] === a; )
                n++,
                r++;
            for (var o = (e.length - r) * c + 1 >>> 0, u = new Uint8Array(o); e[r]; ) {
                var l = t[e.charCodeAt(r)];
                if (255 === l)
                    return;
                for (var f = 0, h = o - 1; (0 !== l || f < i) && -1 !== h; h--,
                f++)
                    l += s * u[h] >>> 0,
                    u[h] = l % 256 >>> 0,
                    l = l / 256 >>> 0;
                if (0 !== l)
                    throw new Error("Non-zero carry");
                i = f,
                r++
            }
            if (" " !== e[r]) {
                for (var d = o - i; d !== o && 0 === u[d]; )
                    d++;
                for (var p = new Uint8Array(n + (o - d)), y = n; d !== o; )
                    p[y++] = u[d++];
                return p
            }
        }
    }
    return {
        encode: function(t) {
            if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))),
            !(t instanceof Uint8Array))
                throw new TypeError("Expected Uint8Array");
            if (0 === t.length)
                return "";
            for (var r = 0, n = 0, i = 0, o = t.length; i !== o && 0 === t[i]; )
                i++,
                r++;
            for (var c = (o - i) * u + 1 >>> 0, l = new Uint8Array(c); i !== o; ) {
                for (var f = t[i], h = 0, d = c - 1; (0 !== f || h < n) && -1 !== d; d--,
                h++)
                    f += 256 * l[d] >>> 0,
                    l[d] = f % s >>> 0,
                    f = f / s >>> 0;
                if (0 !== f)
                    throw new Error("Non-zero carry");
                n = h,
                i++
            }
            for (var p = c - n; p !== c && 0 === l[p]; )
                p++;
            for (var y = a.repeat(r); p < c; ++p)
                y += e.charAt(l[p]);
            return y
        },
        decodeUnsafe: l,
        decode: function(e) {
            var t = l(e);
            if (t)
                return t;
            throw new Error("Non-base" + s + " character")
        }
    }
}
var src$a = base$2
  , _brrp__multiformats_scope_baseX = src$a;
class Encoder {
    constructor(e, t, r) {
        this.name = e,
        this.prefix = t,
        this.baseEncode = r
    }
    encode(e) {
        if (e instanceof Uint8Array)
            return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type")
    }
}
class Decoder {
    constructor(e, t, r) {
        this.name = e,
        this.prefix = t,
        this.baseDecode = r
    }
    decode(e) {
        if ("string" != typeof e)
            throw Error("Can only multibase decode strings");
        switch (e[0]) {
        case this.prefix:
            return this.baseDecode(e.slice(1));
        default:
            throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`)
        }
    }
    or(e) {
        const t = __spreadValues({
            [this.prefix]: this
        }, e.decoders || {
            [e.prefix]: e
        });
        return new ComposedDecoder(t)
    }
}
class ComposedDecoder {
    constructor(e) {
        this.decoders = e
    }
    or(e) {
        const t = e.decoders || {
            [e.prefix]: e
        };
        return new ComposedDecoder(__spreadValues(__spreadValues({}, this.decoders), t))
    }
    decode(e) {
        const t = e[0]
          , r = this.decoders[t];
        if (r)
            return r.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
}
class Codec {
    constructor(e, t, r, n) {
        this.name = e,
        this.prefix = t,
        this.baseEncode = r,
        this.baseDecode = n,
        this.encoder = new Encoder(e,t,r),
        this.decoder = new Decoder(e,t,n)
    }
    encode(e) {
        return this.encoder.encode(e)
    }
    decode(e) {
        return this.decoder.decode(e)
    }
}
const withAlphabet = ({name: e, prefix: t, encode: r, decode: n, alphabet: i})=>from$1({
    name: e,
    prefix: t,
    encode: e=>r(e, i),
    decode: t=>{
        for (const r of t)
            if (i.indexOf(r) < 0)
                throw new Error(`invalid ${e} character`);
        return n(t, i)
    }
})
  , from$1 = ({name: e, prefix: t, encode: r, decode: n})=>new Codec(e,t,r,n)
  , implement = e=>{
    const {encode: t, decode: r} = _brrp__multiformats_scope_baseX(e);
    return {
        encode: t,
        decode: e=>coerce(r(e))
    }
}
  , base58btc = from$1(__spreadValues({
    name: "base58btc",
    prefix: "z"
}, implement("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")));
function decode$9(e, t) {
    const r = (e = e.replace(/=/g, "")).length;
    let n = 0
      , i = 0
      , o = 0;
    const s = new Uint8Array(5 * r / 8 | 0);
    for (let a = 0; a < r; a++)
        i = i << 5 | t.indexOf(e[a]),
        n += 5,
        n >= 8 && (s[o++] = i >>> n - 8 & 255,
        n -= 8);
    return s
}
function encode$e(e, t) {
    const r = e.byteLength
      , n = new Uint8Array(e)
      , i = t.indexOf("=") === t.length - 1;
    i && (t = t.substring(0, t.length - 1));
    let o = 0
      , s = 0
      , a = "";
    for (let c = 0; c < r; c++)
        for (s = s << 8 | n[c],
        o += 8; o >= 5; )
            a += t[s >>> o - 5 & 31],
            o -= 5;
    if (o > 0 && (a += t[s << 5 - o & 31]),
    i)
        for (; a.length % 8 != 0; )
            a += "=";
    return a
}
from$1(__spreadValues({
    name: "base58flickr",
    prefix: "Z"
}, implement("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ")));
const base32 = withAlphabet({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    encode: encode$e,
    decode: decode$9
});
withAlphabet({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    encode: encode$e,
    decode: decode$9
}),
withAlphabet({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    encode: encode$e,
    decode: decode$9
}),
withAlphabet({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    encode: encode$e,
    decode: decode$9
}),
withAlphabet({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    encode: encode$e,
    decode: decode$9
});
class CID$1 {
    constructor(e, t, r, n) {
        this.code = t,
        this.version = e,
        this.multihash = r,
        this.bytes = n,
        this.byteOffset = n.byteOffset,
        this.byteLength = n.byteLength,
        this.asCID = this,
        this._baseCache = new Map,
        Object.defineProperties(this, {
            byteOffset: hidden,
            byteLength: hidden,
            code: readonly,
            version: readonly,
            multihash: readonly,
            bytes: readonly,
            _baseCache: hidden,
            asCID: hidden
        })
    }
    toV0() {
        switch (this.version) {
        case 0:
            return this;
        default:
            {
                const {code: e, multihash: t} = this;
                if (e !== DAG_PB_CODE)
                    throw new Error("Cannot convert a non dag-pb CID to CIDv0");
                if (t.code !== SHA_256_CODE)
                    throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
                return CID$1.createV0(t)
            }
        }
    }
    toV1() {
        switch (this.version) {
        case 0:
            {
                const {code: e, digest: t} = this.multihash
                  , r = create$5(e, t);
                return CID$1.createV1(this.code, r)
            }
        case 1:
            return this;
        default:
            throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`)
        }
    }
    equals(e) {
        return e && this.code === e.code && this.version === e.version && equals$2(this.multihash, e.multihash)
    }
    toString(e) {
        const {bytes: t, version: r, _baseCache: n} = this;
        switch (r) {
        case 0:
            return toStringV0(t, n, e || base58btc.encoder);
        default:
            return toStringV1(t, n, e || base32.encoder)
        }
    }
    toJSON() {
        return {
            code: this.code,
            version: this.version,
            hash: this.multihash.bytes
        }
    }
    get[Symbol.toStringTag]() {
        return "CID"
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")"
    }
    static isCID(e) {
        return deprecate(/^0\.0/, IS_CID_DEPRECATION),
        !(!e || !e[cidSymbol] && e.asCID !== e)
    }
    get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()")
    }
    get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead')
    }
    get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead")
    }
    get multibaseName() {
        throw new Error('"multibaseName" property is deprecated')
    }
    get prefix() {
        throw new Error('"prefix" property is deprecated')
    }
    static asCID(e) {
        if (e instanceof CID$1)
            return e;
        if (null != e && e.asCID === e) {
            const {version: t, code: r, multihash: n, bytes: i} = e;
            return new CID$1(t,r,n,i || encodeCID(t, r, n.bytes))
        }
        if (null != e && !0 === e[cidSymbol]) {
            const {version: t, multihash: r, code: n} = e
              , i = decode$a(r);
            return CID$1.create(t, n, i)
        }
        return null
    }
    static create(e, t, r) {
        if ("number" != typeof t)
            throw new Error("String codecs are no longer supported");
        switch (e) {
        case 0:
            if (t !== DAG_PB_CODE)
                throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
            return new CID$1(e,t,r,r.bytes);
        case 1:
            {
                const n = encodeCID(e, t, r.bytes);
                return new CID$1(e,t,r,n)
            }
        default:
            throw new Error("Invalid version")
        }
    }
    static createV0(e) {
        return CID$1.create(0, DAG_PB_CODE, e)
    }
    static createV1(e, t) {
        return CID$1.create(1, e, t)
    }
    static decode(e) {
        const [t,r] = CID$1.decodeFirst(e);
        if (r.length)
            throw new Error("Incorrect length");
        return t
    }
    static decodeFirst(e) {
        const t = CID$1.inspectBytes(e)
          , r = t.size - t.multihashSize
          , n = coerce(e.subarray(r, r + t.multihashSize));
        if (n.byteLength !== t.multihashSize)
            throw new Error("Incorrect length");
        const i = n.subarray(t.multihashSize - t.digestSize)
          , o = new Digest(t.multihashCode,t.digestSize,i,n);
        return [0 === t.version ? CID$1.createV0(o) : CID$1.createV1(t.codec, o), e.subarray(t.size)]
    }
    static inspectBytes(e) {
        let t = 0;
        const r = ()=>{
            const [r,n] = decode$b(e.subarray(t));
            return t += n,
            r
        }
        ;
        let n = r()
          , i = DAG_PB_CODE;
        if (18 === n)
            n = 0,
            t = 0;
        else if (1 === n)
            i = r();
        else if (1 !== n)
            throw new RangeError(`Invalid CID version ${n}`);
        const o = t
          , s = r()
          , a = r()
          , c = t + a;
        return {
            version: n,
            codec: i,
            multihashCode: s,
            digestSize: a,
            multihashSize: c - o,
            size: c
        }
    }
    static parse(e, t) {
        const [r,n] = parseCIDtoBytes(e, t)
          , i = CID$1.decode(n);
        return i._baseCache.set(r, e),
        i
    }
}
const parseCIDtoBytes = (e,t)=>{
    switch (e[0]) {
    case "Q":
        {
            const r = t || base58btc;
            return [base58btc.prefix, r.decode(`${base58btc.prefix}${e}`)]
        }
    case base58btc.prefix:
        {
            const r = t || base58btc;
            return [base58btc.prefix, r.decode(e)]
        }
    case base32.prefix:
        {
            const r = t || base32;
            return [base32.prefix, r.decode(e)]
        }
    default:
        if (null == t)
            throw Error("To parse non base32 or base56btc encoded CID multibase decoder must be provided");
        return [e[0], t.decode(e)]
    }
}
  , toStringV0 = (e,t,r)=>{
    const {prefix: n} = r;
    if (n !== base58btc.prefix)
        throw Error(`Cannot string encode V0 in ${r.name} encoding`);
    const i = t.get(n);
    if (null == i) {
        const i = r.encode(e).slice(1);
        return t.set(n, i),
        i
    }
    return i
}
  , toStringV1 = (e,t,r)=>{
    const {prefix: n} = r
      , i = t.get(n);
    if (null == i) {
        const i = r.encode(e);
        return t.set(n, i),
        i
    }
    return i
}
  , DAG_PB_CODE = 112
  , SHA_256_CODE = 18
  , encodeCID = (e,t,r)=>{
    const n = encodingLength(e)
      , i = n + encodingLength(t)
      , o = new Uint8Array(i + r.byteLength);
    return encodeTo(e, o, 0),
    encodeTo(t, o, n),
    o.set(r, i),
    o
}
  , cidSymbol = Symbol.for("@ipld/js-cid/CID")
  , readonly = {
    writable: !1,
    configurable: !1,
    enumerable: !0
}
  , hidden = {
    writable: !1,
    enumerable: !1,
    configurable: !1
}
  , version = "0.0.0-dev"
  , deprecate = (e,t)=>{
    if (!e.test(version))
        throw new Error(t);
    console.warn(t)
}
  , IS_CID_DEPRECATION = "CID.isCID(v) is deprecated and will be removed in the next major release.\nFollowing code pattern:\n\nif (CID.isCID(value)) {\n  doSomethingWithCID(value)\n}\n\nIs replaced with:\n\nconst cid = CID.asCID(value)\nif (cid) {\n  // Make sure to use cid instead of value\n  doSomethingWithCID(cid)\n}\n";
var cid = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    CID: CID$1
})
  , commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function getAugmentedNamespace(e) {
    if (e.__esModule)
        return e;
    var t = Object.defineProperty({}, "__esModule", {
        value: !0
    });
    return Object.keys(e).forEach((function(r) {
        var n = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(t, r, n.get ? n : {
            enumerable: !0,
            get: function() {
                return e[r]
            }
        })
    }
    )),
    t
}
var encode_1$2 = encode$d
  , MSB$5 = 128
  , REST$5 = 127
  , MSBALL$2 = ~REST$5
  , INT$2 = Math.pow(2, 31);
function encode$d(e, t, r) {
    if (Number.MAX_SAFE_INTEGER && e > Number.MAX_SAFE_INTEGER)
        throw encode$d.bytes = 0,
        new RangeError("Could not encode varint");
    t = t || [];
    for (var n = r = r || 0; e >= INT$2; )
        t[r++] = 255 & e | MSB$5,
        e /= 128;
    for (; e & MSBALL$2; )
        t[r++] = 255 & e | MSB$5,
        e >>>= 7;
    return t[r] = 0 | e,
    encode$d.bytes = r - n + 1,
    t
}
var decode$8 = read$2
  , MSB$4 = 128
  , REST$4 = 127;
function read$2(e, t) {
    var r, n = 0, i = 0, o = t = t || 0, s = e.length;
    do {
        if (o >= s || i > 49)
            throw read$2.bytes = 0,
            new RangeError("Could not decode varint");
        r = e[o++],
        n += i < 28 ? (r & REST$4) << i : (r & REST$4) * Math.pow(2, i),
        i += 7
    } while (r >= MSB$4);
    return read$2.bytes = o - t,
    n
}
var N1$2 = Math.pow(2, 7)
  , N2$2 = Math.pow(2, 14)
  , N3$2 = Math.pow(2, 21)
  , N4$2 = Math.pow(2, 28)
  , N5$2 = Math.pow(2, 35)
  , N6$2 = Math.pow(2, 42)
  , N7$2 = Math.pow(2, 49)
  , N8$2 = Math.pow(2, 56)
  , N9$2 = Math.pow(2, 63)
  , length$2 = function(e) {
    return e < N1$2 ? 1 : e < N2$2 ? 2 : e < N3$2 ? 3 : e < N4$2 ? 4 : e < N5$2 ? 5 : e < N6$2 ? 6 : e < N7$2 ? 7 : e < N8$2 ? 8 : e < N9$2 ? 9 : 10
}
  , varint$5 = {
    encode: encode_1$2,
    decode: decode$8,
    encodingLength: length$2
};
const typeofs = ["string", "number", "bigint", "symbol"]
  , objectTypeNames = ["Function", "Generator", "AsyncGenerator", "GeneratorFunction", "AsyncGeneratorFunction", "AsyncFunction", "Observable", "Array", "Buffer", "Object", "RegExp", "Date", "Error", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Promise", "URL", "HTMLElement", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
function is(e) {
    if (null === e)
        return "null";
    if (void 0 === e)
        return "undefined";
    if (!0 === e || !1 === e)
        return "boolean";
    const t = typeof e;
    if (typeofs.includes(t))
        return t;
    if ("function" === t)
        return "Function";
    if (Array.isArray(e))
        return "Array";
    if (isBuffer$1(e))
        return "Buffer";
    const r = getObjectType(e);
    return r || "Object"
}
function isBuffer$1(e) {
    return e && e.constructor && e.constructor.isBuffer && e.constructor.isBuffer.call(null, e)
}
function getObjectType(e) {
    const t = Object.prototype.toString.call(e).slice(8, -1);
    if (objectTypeNames.includes(t))
        return t
}
class Type {
    constructor(e, t, r) {
        this.major = e,
        this.majorEncoded = e << 5,
        this.name = t,
        this.terminal = r
    }
    toString() {
        return `Type[${this.major}].${this.name}`
    }
    compare(e) {
        return this.major < e.major ? -1 : this.major > e.major ? 1 : 0
    }
}
Type.uint = new Type(0,"uint",!0),
Type.negint = new Type(1,"negint",!0),
Type.bytes = new Type(2,"bytes",!0),
Type.string = new Type(3,"string",!0),
Type.array = new Type(4,"array",!1),
Type.map = new Type(5,"map",!1),
Type.tag = new Type(6,"tag",!1),
Type.float = new Type(7,"float",!0),
Type.false = new Type(7,"false",!0),
Type.true = new Type(7,"true",!0),
Type.null = new Type(7,"null",!0),
Type.undefined = new Type(7,"undefined",!0),
Type.break = new Type(7,"break",!0);
class Token {
    constructor(e, t, r) {
        this.type = e,
        this.value = t,
        this.encodedLength = r,
        this.encodedBytes = void 0
    }
    toString() {
        return `Token[${this.type}].${this.value}`
    }
}
const useBuffer = globalThis.process && !globalThis.process.browser && globalThis.Buffer && "function" == typeof globalThis.Buffer.isBuffer
  , textDecoder$2 = new TextDecoder
  , textEncoder$3 = new TextEncoder;
function isBuffer(e) {
    return useBuffer && globalThis.Buffer.isBuffer(e)
}
function asU8A(e) {
    return e instanceof Uint8Array ? isBuffer(e) ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : e : Uint8Array.from(e)
}
const toString$1 = useBuffer ? (e,t,r)=>r - t > 64 ? globalThis.Buffer.from(e.subarray(t, r)).toString("utf8") : utf8Slice(e, t, r) : (e,t,r)=>r - t > 64 ? textDecoder$2.decode(e.subarray(t, r)) : utf8Slice(e, t, r)
  , fromString$1 = useBuffer ? e=>e.length > 64 ? globalThis.Buffer.from(e) : utf8ToBytes(e) : e=>e.length > 64 ? textEncoder$3.encode(e) : utf8ToBytes(e)
  , fromArray = e=>Uint8Array.from(e)
  , slice = useBuffer ? (e,t,r)=>isBuffer(e) ? new Uint8Array(e.subarray(t, r)) : e.slice(t, r) : (e,t,r)=>e.slice(t, r)
  , concat$2 = useBuffer ? (e,t)=>(e = e.map((e=>e instanceof Uint8Array ? e : globalThis.Buffer.from(e))),
asU8A(globalThis.Buffer.concat(e, t))) : (e,t)=>{
    const r = new Uint8Array(t);
    let n = 0;
    for (let i of e)
        n + i.length > r.length && (i = i.subarray(0, r.length - n)),
        r.set(i, n),
        n += i.length;
    return r
}
  , alloc = useBuffer ? e=>globalThis.Buffer.allocUnsafe(e) : e=>new Uint8Array(e);
function compare(e, t) {
    if (isBuffer(e) && isBuffer(t))
        return e.compare(t);
    for (let r = 0; r < e.length; r++)
        if (e[r] !== t[r])
            return e[r] < t[r] ? -1 : 1;
    return 0
}
function utf8ToBytes(e, t=1 / 0) {
    let r;
    const n = e.length;
    let i = null;
    const o = [];
    for (let s = 0; s < n; ++s) {
        if (r = e.charCodeAt(s),
        r > 55295 && r < 57344) {
            if (!i) {
                if (r > 56319) {
                    (t -= 3) > -1 && o.push(239, 191, 189);
                    continue
                }
                if (s + 1 === n) {
                    (t -= 3) > -1 && o.push(239, 191, 189);
                    continue
                }
                i = r;
                continue
            }
            if (r < 56320) {
                (t -= 3) > -1 && o.push(239, 191, 189),
                i = r;
                continue
            }
            r = 65536 + (i - 55296 << 10 | r - 56320)
        } else
            i && (t -= 3) > -1 && o.push(239, 191, 189);
        if (i = null,
        r < 128) {
            if ((t -= 1) < 0)
                break;
            o.push(r)
        } else if (r < 2048) {
            if ((t -= 2) < 0)
                break;
            o.push(r >> 6 | 192, 63 & r | 128)
        } else if (r < 65536) {
            if ((t -= 3) < 0)
                break;
            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
        } else {
            if (!(r < 1114112))
                throw new Error("Invalid code point");
            if ((t -= 4) < 0)
                break;
            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
        }
    }
    return o
}
function utf8Slice(e, t, r) {
    const n = [];
    for (; t < r; ) {
        const i = e[t];
        let o = null
          , s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
        if (t + s <= r) {
            let r, n, a, c;
            switch (s) {
            case 1:
                i < 128 && (o = i);
                break;
            case 2:
                r = e[t + 1],
                128 == (192 & r) && (c = (31 & i) << 6 | 63 & r,
                c > 127 && (o = c));
                break;
            case 3:
                r = e[t + 1],
                n = e[t + 2],
                128 == (192 & r) && 128 == (192 & n) && (c = (15 & i) << 12 | (63 & r) << 6 | 63 & n,
                c > 2047 && (c < 55296 || c > 57343) && (o = c));
                break;
            case 4:
                r = e[t + 1],
                n = e[t + 2],
                a = e[t + 3],
                128 == (192 & r) && 128 == (192 & n) && 128 == (192 & a) && (c = (15 & i) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & a,
                c > 65535 && c < 1114112 && (o = c))
            }
        }
        null === o ? (o = 65533,
        s = 1) : o > 65535 && (o -= 65536,
        n.push(o >>> 10 & 1023 | 55296),
        o = 56320 | 1023 & o),
        n.push(o),
        t += s
    }
    return decodeCodePointsArray(n)
}
const MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(e) {
    const t = e.length;
    if (t <= MAX_ARGUMENTS_LENGTH)
        return String.fromCharCode.apply(String, e);
    let r = ""
      , n = 0;
    for (; n < t; )
        r += String.fromCharCode.apply(String, e.slice(n, n += MAX_ARGUMENTS_LENGTH));
    return r
}
const defaultChunkSize = 256;
class Bl {
    constructor(e=defaultChunkSize) {
        this.chunkSize = e,
        this.cursor = 0,
        this.maxCursor = -1,
        this.chunks = [],
        this._initReuseChunk = null
    }
    reset() {
        this.chunks = [],
        this.cursor = 0,
        this.maxCursor = -1,
        null !== this._initReuseChunk && (this.chunks.push(this._initReuseChunk),
        this.maxCursor = this._initReuseChunk.length - 1)
    }
    push(e) {
        let t = this.chunks[this.chunks.length - 1];
        if (this.cursor + e.length <= this.maxCursor + 1) {
            const r = t.length - (this.maxCursor - this.cursor) - 1;
            t.set(e, r)
        } else {
            if (t) {
                const e = t.length - (this.maxCursor - this.cursor) - 1;
                e < t.length && (this.chunks[this.chunks.length - 1] = t.subarray(0, e),
                this.maxCursor = this.cursor - 1)
            }
            e.length < 64 && e.length < this.chunkSize ? (t = alloc(this.chunkSize),
            this.chunks.push(t),
            this.maxCursor += t.length,
            null === this._initReuseChunk && (this._initReuseChunk = t),
            t.set(e, 0)) : (this.chunks.push(e),
            this.maxCursor += e.length)
        }
        this.cursor += e.length
    }
    toBytes(e=!1) {
        let t;
        if (1 === this.chunks.length) {
            const r = this.chunks[0];
            e && this.cursor > r.length / 2 ? (t = this.cursor === r.length ? r : r.subarray(0, this.cursor),
            this._initReuseChunk = null,
            this.chunks = []) : t = slice(r, 0, this.cursor)
        } else
            t = concat$2(this.chunks, this.cursor);
        return e && this.reset(),
        t
    }
}
const decodeErrPrefix = "CBOR decode error:"
  , encodeErrPrefix = "CBOR encode error:";
function assertEnoughData(e, t, r) {
    if (e.length - t < r)
        throw new Error(`${decodeErrPrefix} not enough data for type`)
}
const uintBoundaries = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function readUint8(e, t, r) {
    assertEnoughData(e, t, 1);
    const n = e[t];
    if (!0 === r.strict && n < uintBoundaries[0])
        throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    return n
}
function readUint16(e, t, r) {
    assertEnoughData(e, t, 2);
    const n = e[t] << 8 | e[t + 1];
    if (!0 === r.strict && n < uintBoundaries[1])
        throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    return n
}
function readUint32(e, t, r) {
    assertEnoughData(e, t, 4);
    const n = 16777216 * e[t] + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3];
    if (!0 === r.strict && n < uintBoundaries[2])
        throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    return n
}
function readUint64(e, t, r) {
    assertEnoughData(e, t, 8);
    const n = 16777216 * e[t] + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3]
      , i = 16777216 * e[t + 4] + (e[t + 5] << 16) + (e[t + 6] << 8) + e[t + 7]
      , o = (BigInt(n) << BigInt(32)) + BigInt(i);
    if (!0 === r.strict && o < uintBoundaries[3])
        throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    if (o <= Number.MAX_SAFE_INTEGER)
        return Number(o);
    if (!0 === r.allowBigInt)
        return o;
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`)
}
function decodeUint8(e, t, r, n) {
    return new Token(Type.uint,readUint8(e, t + 1, n),2)
}
function decodeUint16(e, t, r, n) {
    return new Token(Type.uint,readUint16(e, t + 1, n),3)
}
function decodeUint32(e, t, r, n) {
    return new Token(Type.uint,readUint32(e, t + 1, n),5)
}
function decodeUint64(e, t, r, n) {
    return new Token(Type.uint,readUint64(e, t + 1, n),9)
}
function encodeUint(e, t) {
    return encodeUintValue(e, 0, t.value)
}
function encodeUintValue(e, t, r) {
    if (r < uintBoundaries[0]) {
        const n = Number(r);
        e.push([t | n])
    } else if (r < uintBoundaries[1]) {
        const n = Number(r);
        e.push([24 | t, n])
    } else if (r < uintBoundaries[2]) {
        const n = Number(r);
        e.push([25 | t, n >>> 8, 255 & n])
    } else if (r < uintBoundaries[3]) {
        const n = Number(r);
        e.push([26 | t, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n])
    } else {
        const n = BigInt(r);
        if (!(n < uintBoundaries[4]))
            throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
        {
            const r = [27 | t, 0, 0, 0, 0, 0, 0, 0];
            let i = Number(n & BigInt(4294967295))
              , o = Number(n >> BigInt(32) & BigInt(4294967295));
            r[8] = 255 & i,
            i >>= 8,
            r[7] = 255 & i,
            i >>= 8,
            r[6] = 255 & i,
            i >>= 8,
            r[5] = 255 & i,
            r[4] = 255 & o,
            o >>= 8,
            r[3] = 255 & o,
            o >>= 8,
            r[2] = 255 & o,
            o >>= 8,
            r[1] = 255 & o,
            e.push(r)
        }
    }
}
function decodeNegint8(e, t, r, n) {
    return new Token(Type.negint,-1 - readUint8(e, t + 1, n),2)
}
function decodeNegint16(e, t, r, n) {
    return new Token(Type.negint,-1 - readUint16(e, t + 1, n),3)
}
function decodeNegint32(e, t, r, n) {
    return new Token(Type.negint,-1 - readUint32(e, t + 1, n),5)
}
encodeUint.encodedSize = function(e) {
    return encodeUintValue.encodedSize(e.value)
}
,
encodeUintValue.encodedSize = function(e) {
    return e < uintBoundaries[0] ? 1 : e < uintBoundaries[1] ? 2 : e < uintBoundaries[2] ? 3 : e < uintBoundaries[3] ? 5 : 9
}
,
encodeUint.compareTokens = function(e, t) {
    return e.value < t.value ? -1 : e.value > t.value ? 1 : 0
}
;
const neg1b = BigInt(-1)
  , pos1b = BigInt(1);
function decodeNegint64(e, t, r, n) {
    const i = readUint64(e, t + 1, n);
    if ("bigint" != typeof i) {
        const e = -1 - i;
        if (e >= Number.MIN_SAFE_INTEGER)
            return new Token(Type.negint,e,9)
    }
    if (!0 !== n.allowBigInt)
        throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
    return new Token(Type.negint,neg1b - BigInt(i),9)
}
function encodeNegint(e, t) {
    const r = t.value
      , n = "bigint" == typeof r ? r * neg1b - pos1b : -1 * r - 1;
    encodeUintValue(e, t.type.majorEncoded, n)
}
function toToken$3(e, t, r, n) {
    assertEnoughData(e, t, r + n);
    const i = slice(e, t + r, t + r + n);
    return new Token(Type.bytes,i,r + n)
}
function decodeBytesCompact(e, t, r, n) {
    return toToken$3(e, t, 1, r)
}
function decodeBytes8(e, t, r, n) {
    return toToken$3(e, t, 2, readUint8(e, t + 1, n))
}
function decodeBytes16(e, t, r, n) {
    return toToken$3(e, t, 3, readUint16(e, t + 1, n))
}
function decodeBytes32(e, t, r, n) {
    return toToken$3(e, t, 5, readUint32(e, t + 1, n))
}
function decodeBytes64(e, t, r, n) {
    const i = readUint64(e, t + 1, n);
    if ("bigint" == typeof i)
        throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
    return toToken$3(e, t, 9, i)
}
function tokenBytes(e) {
    return void 0 === e.encodedBytes && (e.encodedBytes = e.type === Type.string ? fromString$1(e.value) : e.value),
    e.encodedBytes
}
function encodeBytes(e, t) {
    const r = tokenBytes(t);
    encodeUintValue(e, t.type.majorEncoded, r.length),
    e.push(r)
}
function compareBytes(e, t) {
    return e.length < t.length ? -1 : e.length > t.length ? 1 : compare(e, t)
}
function toToken$2(e, t, r, n) {
    const i = r + n;
    return assertEnoughData(e, t, i),
    new Token(Type.string,toString$1(e, t + r, t + i),i)
}
function decodeStringCompact(e, t, r, n) {
    return toToken$2(e, t, 1, r)
}
function decodeString8(e, t, r, n) {
    return toToken$2(e, t, 2, readUint8(e, t + 1, n))
}
function decodeString16(e, t, r, n) {
    return toToken$2(e, t, 3, readUint16(e, t + 1, n))
}
function decodeString32(e, t, r, n) {
    return toToken$2(e, t, 5, readUint32(e, t + 1, n))
}
function decodeString64(e, t, r, n) {
    const i = readUint64(e, t + 1, n);
    if ("bigint" == typeof i)
        throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
    return toToken$2(e, t, 9, i)
}
encodeNegint.encodedSize = function(e) {
    const t = e.value
      , r = "bigint" == typeof t ? t * neg1b - pos1b : -1 * t - 1;
    return r < uintBoundaries[0] ? 1 : r < uintBoundaries[1] ? 2 : r < uintBoundaries[2] ? 3 : r < uintBoundaries[3] ? 5 : 9
}
,
encodeNegint.compareTokens = function(e, t) {
    return e.value < t.value ? 1 : e.value > t.value ? -1 : 0
}
,
encodeBytes.encodedSize = function(e) {
    const t = tokenBytes(e);
    return encodeUintValue.encodedSize(t.length) + t.length
}
,
encodeBytes.compareTokens = function(e, t) {
    return compareBytes(tokenBytes(e), tokenBytes(t))
}
;
const encodeString = encodeBytes;
function toToken$1(e, t, r, n) {
    return new Token(Type.array,n,r)
}
function decodeArrayCompact(e, t, r, n) {
    return toToken$1(e, t, 1, r)
}
function decodeArray8(e, t, r, n) {
    return toToken$1(e, t, 2, readUint8(e, t + 1, n))
}
function decodeArray16(e, t, r, n) {
    return toToken$1(e, t, 3, readUint16(e, t + 1, n))
}
function decodeArray32(e, t, r, n) {
    return toToken$1(e, t, 5, readUint32(e, t + 1, n))
}
function decodeArray64(e, t, r, n) {
    const i = readUint64(e, t + 1, n);
    if ("bigint" == typeof i)
        throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
    return toToken$1(e, t, 9, i)
}
function decodeArrayIndefinite(e, t, r, n) {
    if (!1 === n.allowIndefinite)
        throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    return toToken$1(e, t, 1, 1 / 0)
}
function encodeArray(e, t) {
    encodeUintValue(e, Type.array.majorEncoded, t.value)
}
function toToken(e, t, r, n) {
    return new Token(Type.map,n,r)
}
function decodeMapCompact(e, t, r, n) {
    return toToken(e, t, 1, r)
}
function decodeMap8(e, t, r, n) {
    return toToken(e, t, 2, readUint8(e, t + 1, n))
}
function decodeMap16(e, t, r, n) {
    return toToken(e, t, 3, readUint16(e, t + 1, n))
}
function decodeMap32(e, t, r, n) {
    return toToken(e, t, 5, readUint32(e, t + 1, n))
}
function decodeMap64(e, t, r, n) {
    const i = readUint64(e, t + 1, n);
    if ("bigint" == typeof i)
        throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
    return toToken(e, t, 9, i)
}
function decodeMapIndefinite(e, t, r, n) {
    if (!1 === n.allowIndefinite)
        throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    return toToken(e, t, 1, 1 / 0)
}
function encodeMap(e, t) {
    encodeUintValue(e, Type.map.majorEncoded, t.value)
}
function decodeTagCompact(e, t, r, n) {
    return new Token(Type.tag,r,1)
}
function decodeTag8(e, t, r, n) {
    return new Token(Type.tag,readUint8(e, t + 1, n),2)
}
function decodeTag16(e, t, r, n) {
    return new Token(Type.tag,readUint16(e, t + 1, n),3)
}
function decodeTag32(e, t, r, n) {
    return new Token(Type.tag,readUint32(e, t + 1, n),5)
}
function decodeTag64(e, t, r, n) {
    return new Token(Type.tag,readUint64(e, t + 1, n),9)
}
function encodeTag(e, t) {
    encodeUintValue(e, Type.tag.majorEncoded, t.value)
}
encodeArray.compareTokens = encodeUint.compareTokens,
encodeMap.compareTokens = encodeUint.compareTokens,
encodeTag.compareTokens = encodeUint.compareTokens;
const MINOR_FALSE = 20
  , MINOR_TRUE = 21
  , MINOR_NULL = 22
  , MINOR_UNDEFINED = 23;
function decodeUndefined(e, t, r, n) {
    if (!1 === n.allowUndefined)
        throw new Error(`${decodeErrPrefix} undefined values are not supported`);
    return new Token(Type.undefined,void 0,1)
}
function decodeBreak(e, t, r, n) {
    if (!1 === n.allowIndefinite)
        throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    return new Token(Type.break,void 0,1)
}
function createToken(e, t, r) {
    if (r) {
        if (!1 === r.allowNaN && Number.isNaN(e))
            throw new Error(`${decodeErrPrefix} NaN values are not supported`);
        if (!1 === r.allowInfinity && (e === 1 / 0 || e === -1 / 0))
            throw new Error(`${decodeErrPrefix} Infinity values are not supported`)
    }
    return new Token(Type.float,e,t)
}
function decodeFloat16(e, t, r, n) {
    return createToken(readFloat16(e, t + 1), 3, n)
}
function decodeFloat32(e, t, r, n) {
    return createToken(readFloat32(e, t + 1), 5, n)
}
function decodeFloat64(e, t, r, n) {
    return createToken(readFloat64(e, t + 1), 9, n)
}
function encodeFloat(e, t, r) {
    const n = t.value;
    if (!1 === n)
        e.push([Type.float.majorEncoded | MINOR_FALSE]);
    else if (!0 === n)
        e.push([Type.float.majorEncoded | MINOR_TRUE]);
    else if (null === n)
        e.push([Type.float.majorEncoded | MINOR_NULL]);
    else if (void 0 === n)
        e.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
    else {
        let t, i = !1;
        r && !0 === r.float64 || (encodeFloat16(n),
        t = readFloat16(ui8a, 1),
        n === t || Number.isNaN(n) ? (ui8a[0] = 249,
        e.push(ui8a.slice(0, 3)),
        i = !0) : (encodeFloat32(n),
        t = readFloat32(ui8a, 1),
        n === t && (ui8a[0] = 250,
        e.push(ui8a.slice(0, 5)),
        i = !0))),
        i || (encodeFloat64(n),
        t = readFloat64(ui8a, 1),
        ui8a[0] = 251,
        e.push(ui8a.slice(0, 9)))
    }
}
encodeFloat.encodedSize = function(e, t) {
    const r = e.value;
    if (!1 === r || !0 === r || null == r)
        return 1;
    let n;
    if (!t || !0 !== t.float64) {
        if (encodeFloat16(r),
        n = readFloat16(ui8a, 1),
        r === n || Number.isNaN(r))
            return 3;
        if (encodeFloat32(r),
        n = readFloat32(ui8a, 1),
        r === n)
            return 5
    }
    return 9
}
;
const buffer$1 = new ArrayBuffer(9)
  , dataView = new DataView(buffer$1,1)
  , ui8a = new Uint8Array(buffer$1,0);
function encodeFloat16(e) {
    if (e === 1 / 0)
        dataView.setUint16(0, 31744, !1);
    else if (e === -1 / 0)
        dataView.setUint16(0, 64512, !1);
    else if (Number.isNaN(e))
        dataView.setUint16(0, 32256, !1);
    else {
        dataView.setFloat32(0, e);
        const t = dataView.getUint32(0)
          , r = (2139095040 & t) >> 23
          , n = 8388607 & t;
        if (255 === r)
            dataView.setUint16(0, 31744, !1);
        else if (0 === r)
            dataView.setUint16(0, (2147483648 & e) >> 16 | n >> 13, !1);
        else {
            const e = r - 127;
            e < -24 ? dataView.setUint16(0, 0) : e < -14 ? dataView.setUint16(0, (2147483648 & t) >> 16 | 1 << 24 + e, !1) : dataView.setUint16(0, (2147483648 & t) >> 16 | e + 15 << 10 | n >> 13, !1)
        }
    }
}
function readFloat16(e, t) {
    if (e.length - t < 2)
        throw new Error(`${decodeErrPrefix} not enough data for float16`);
    const r = (e[t] << 8) + e[t + 1];
    if (31744 === r)
        return 1 / 0;
    if (64512 === r)
        return -1 / 0;
    if (32256 === r)
        return NaN;
    const n = r >> 10 & 31
      , i = 1023 & r;
    let o;
    return o = 0 === n ? i * 2 ** -24 : 31 !== n ? (i + 1024) * 2 ** (n - 25) : 0 === i ? 1 / 0 : NaN,
    32768 & r ? -o : o
}
function encodeFloat32(e) {
    dataView.setFloat32(0, e, !1)
}
function readFloat32(e, t) {
    if (e.length - t < 4)
        throw new Error(`${decodeErrPrefix} not enough data for float32`);
    const r = (e.byteOffset || 0) + t;
    return new DataView(e.buffer,r,4).getFloat32(0, !1)
}
function encodeFloat64(e) {
    dataView.setFloat64(0, e, !1)
}
function readFloat64(e, t) {
    if (e.length - t < 8)
        throw new Error(`${decodeErrPrefix} not enough data for float64`);
    const r = (e.byteOffset || 0) + t;
    return new DataView(e.buffer,r,8).getFloat64(0, !1)
}
function invalidMinor(e, t, r) {
    throw new Error(`${decodeErrPrefix} encountered invalid minor (${r}) for major ${e[t] >>> 5}`)
}
function errorer(e) {
    return ()=>{
        throw new Error(`${decodeErrPrefix} ${e}`)
    }
}
encodeFloat.compareTokens = encodeUint.compareTokens;
const jump = [];
for (let h = 0; h <= 23; h++)
    jump[h] = invalidMinor;
jump[24] = decodeUint8,
jump[25] = decodeUint16,
jump[26] = decodeUint32,
jump[27] = decodeUint64,
jump[28] = invalidMinor,
jump[29] = invalidMinor,
jump[30] = invalidMinor,
jump[31] = invalidMinor;
for (let h = 32; h <= 55; h++)
    jump[h] = invalidMinor;
jump[56] = decodeNegint8,
jump[57] = decodeNegint16,
jump[58] = decodeNegint32,
jump[59] = decodeNegint64,
jump[60] = invalidMinor,
jump[61] = invalidMinor,
jump[62] = invalidMinor,
jump[63] = invalidMinor;
for (let h = 64; h <= 87; h++)
    jump[h] = decodeBytesCompact;
jump[88] = decodeBytes8,
jump[89] = decodeBytes16,
jump[90] = decodeBytes32,
jump[91] = decodeBytes64,
jump[92] = invalidMinor,
jump[93] = invalidMinor,
jump[94] = invalidMinor,
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let h = 96; h <= 119; h++)
    jump[h] = decodeStringCompact;
jump[120] = decodeString8,
jump[121] = decodeString16,
jump[122] = decodeString32,
jump[123] = decodeString64,
jump[124] = invalidMinor,
jump[125] = invalidMinor,
jump[126] = invalidMinor,
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let h = 128; h <= 151; h++)
    jump[h] = decodeArrayCompact;
jump[152] = decodeArray8,
jump[153] = decodeArray16,
jump[154] = decodeArray32,
jump[155] = decodeArray64,
jump[156] = invalidMinor,
jump[157] = invalidMinor,
jump[158] = invalidMinor,
jump[159] = decodeArrayIndefinite;
for (let h = 160; h <= 183; h++)
    jump[h] = decodeMapCompact;
jump[184] = decodeMap8,
jump[185] = decodeMap16,
jump[186] = decodeMap32,
jump[187] = decodeMap64,
jump[188] = invalidMinor,
jump[189] = invalidMinor,
jump[190] = invalidMinor,
jump[191] = decodeMapIndefinite;
for (let h = 192; h <= 215; h++)
    jump[h] = decodeTagCompact;
jump[216] = decodeTag8,
jump[217] = decodeTag16,
jump[218] = decodeTag32,
jump[219] = decodeTag64,
jump[220] = invalidMinor,
jump[221] = invalidMinor,
jump[222] = invalidMinor,
jump[223] = invalidMinor;
for (let h = 224; h <= 243; h++)
    jump[h] = errorer("simple values are not supported");
jump[244] = invalidMinor,
jump[245] = invalidMinor,
jump[246] = invalidMinor,
jump[247] = decodeUndefined,
jump[248] = errorer("simple values are not supported"),
jump[249] = decodeFloat16,
jump[250] = decodeFloat32,
jump[251] = decodeFloat64,
jump[252] = invalidMinor,
jump[253] = invalidMinor,
jump[254] = invalidMinor,
jump[255] = decodeBreak;
const quick = [];
for (let h = 0; h < 24; h++)
    quick[h] = new Token(Type.uint,h,1);
for (let h = -1; h >= -24; h--)
    quick[31 - h] = new Token(Type.negint,h,1);
function quickEncodeToken(e) {
    switch (e.type) {
    case Type.false:
        return fromArray([244]);
    case Type.true:
        return fromArray([245]);
    case Type.null:
        return fromArray([246]);
    case Type.bytes:
        return e.value.length ? void 0 : fromArray([64]);
    case Type.string:
        return "" === e.value ? fromArray([96]) : void 0;
    case Type.array:
        return 0 === e.value ? fromArray([128]) : void 0;
    case Type.map:
        return 0 === e.value ? fromArray([160]) : void 0;
    case Type.uint:
        return e.value < 24 ? fromArray([Number(e.value)]) : void 0;
    case Type.negint:
        if (e.value >= -24)
            return fromArray([31 - Number(e.value)])
    }
}
quick[64] = new Token(Type.bytes,new Uint8Array(0),1),
quick[96] = new Token(Type.string,"",1),
quick[128] = new Token(Type.array,0,1),
quick[160] = new Token(Type.map,0,1),
quick[244] = new Token(Type.false,!1,1),
quick[245] = new Token(Type.true,!0,1),
quick[246] = new Token(Type.null,null,1);
const defaultEncodeOptions = {
    float64: !1,
    mapSorter: mapSorter,
    quickEncodeToken: quickEncodeToken
}
  , cborEncoders = [];
cborEncoders[Type.uint.major] = encodeUint,
cborEncoders[Type.negint.major] = encodeNegint,
cborEncoders[Type.bytes.major] = encodeBytes,
cborEncoders[Type.string.major] = encodeString,
cborEncoders[Type.array.major] = encodeArray,
cborEncoders[Type.map.major] = encodeMap,
cborEncoders[Type.tag.major] = encodeTag,
cborEncoders[Type.float.major] = encodeFloat;
const buf = new Bl;
class Ref {
    constructor(e, t) {
        this.obj = e,
        this.parent = t
    }
    includes(e) {
        let t = this;
        do {
            if (t.obj === e)
                return !0
        } while (t = t.parent);
        return !1
    }
    static createCheck(e, t) {
        if (e && e.includes(t))
            throw new Error(`${encodeErrPrefix} object contains circular references`);
        return new Ref(t,e)
    }
}
const simpleTokens = {
    null: new Token(Type.null,null),
    undefined: new Token(Type.undefined,void 0),
    true: new Token(Type.true,!0),
    false: new Token(Type.false,!1),
    emptyArray: new Token(Type.array,0),
    emptyMap: new Token(Type.map,0)
}
  , typeEncoders = {
    number: (e,t,r,n)=>Number.isInteger(e) && Number.isSafeInteger(e) ? new Token(e >= 0 ? Type.uint : Type.negint,e) : new Token(Type.float,e),
    bigint: (e,t,r,n)=>e >= BigInt(0) ? new Token(Type.uint,e) : new Token(Type.negint,e),
    Uint8Array: (e,t,r,n)=>new Token(Type.bytes,e),
    string: (e,t,r,n)=>new Token(Type.string,e),
    boolean: (e,t,r,n)=>e ? simpleTokens.true : simpleTokens.false,
    null: (e,t,r,n)=>simpleTokens.null,
    undefined: (e,t,r,n)=>simpleTokens.undefined,
    ArrayBuffer: (e,t,r,n)=>new Token(Type.bytes,new Uint8Array(e)),
    DataView: (e,t,r,n)=>new Token(Type.bytes,new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),
    Array(e, t, r, n) {
        if (!e.length)
            return !0 === r.addBreakTokens ? [simpleTokens.emptyArray, new Token(Type.break)] : simpleTokens.emptyArray;
        n = Ref.createCheck(n, e);
        const i = [];
        let o = 0;
        for (const s of e)
            i[o++] = objectToTokens(s, r, n);
        return r.addBreakTokens ? [new Token(Type.array,e.length), i, new Token(Type.break)] : [new Token(Type.array,e.length), i]
    },
    Object(e, t, r, n) {
        const i = "Object" !== t
          , o = i ? e.keys() : Object.keys(e)
          , s = i ? e.size : o.length;
        if (!s)
            return !0 === r.addBreakTokens ? [simpleTokens.emptyMap, new Token(Type.break)] : simpleTokens.emptyMap;
        n = Ref.createCheck(n, e);
        const a = [];
        let c = 0;
        for (const u of o)
            a[c++] = [objectToTokens(u, r, n), objectToTokens(i ? e.get(u) : e[u], r, n)];
        return sortMapEntries(a, r),
        r.addBreakTokens ? [new Token(Type.map,s), a, new Token(Type.break)] : [new Token(Type.map,s), a]
    }
};
typeEncoders.Map = typeEncoders.Object,
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const h of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" "))
    typeEncoders[`${h}Array`] = typeEncoders.DataView;
function objectToTokens(e, t={}, r) {
    const n = is(e)
      , i = t && t.typeEncoders && t.typeEncoders[n] || typeEncoders[n];
    if ("function" == typeof i) {
        const o = i(e, n, t, r);
        if (null != o)
            return o
    }
    const o = typeEncoders[n];
    if (!o)
        throw new Error(`${encodeErrPrefix} unsupported type: ${n}`);
    return o(e, n, t, r)
}
function sortMapEntries(e, t) {
    t.mapSorter && e.sort(t.mapSorter)
}
function mapSorter(e, t) {
    const r = Array.isArray(e[0]) ? e[0][0] : e[0]
      , n = Array.isArray(t[0]) ? t[0][0] : t[0];
    if (r.type !== n.type)
        return r.type.compare(n.type);
    const i = r.type.major
      , o = cborEncoders[i].compareTokens(r, n);
    return 0 === o && console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone"),
    o
}
function tokensToEncoded(e, t, r, n) {
    if (Array.isArray(t))
        for (const i of t)
            tokensToEncoded(e, i, r, n);
    else
        r[t.type.major](e, t, n)
}
function encodeCustom(e, t, r) {
    const n = objectToTokens(e, r);
    if (!Array.isArray(n) && r.quickEncodeToken) {
        const e = r.quickEncodeToken(n);
        if (e)
            return e;
        const i = t[n.type.major];
        if (i.encodedSize) {
            const e = i.encodedSize(n, r)
              , t = new Bl(e);
            if (i(t, n, r),
            1 !== t.chunks.length)
                throw new Error(`Unexpected error: pre-calculated length for ${n} was wrong`);
            return asU8A(t.chunks[0])
        }
    }
    return tokensToEncoded(buf, n, t, r),
    buf.toBytes(!0)
}
function encode$c(e, t) {
    return t = Object.assign({}, defaultEncodeOptions, t),
    encodeCustom(e, cborEncoders, t)
}
const defaultDecodeOptions = {
    strict: !1,
    allowIndefinite: !0,
    allowUndefined: !0,
    allowBigInt: !0
};
class Tokeniser {
    constructor(e, t={}) {
        this.pos = 0,
        this.data = e,
        this.options = t
    }
    done() {
        return this.pos >= this.data.length
    }
    next() {
        const e = this.data[this.pos];
        let t = quick[e];
        if (void 0 === t) {
            const r = jump[e];
            if (!r)
                throw new Error(`${decodeErrPrefix} no decoder for major type ${e >>> 5} (byte 0x${e.toString(16).padStart(2, "0")})`);
            const n = 31 & e;
            t = r(this.data, this.pos, n, this.options)
        }
        return this.pos += t.encodedLength,
        t
    }
}
const DONE = Symbol.for("DONE")
  , BREAK = Symbol.for("BREAK");
function tokenToArray(e, t, r) {
    const n = [];
    for (let i = 0; i < e.value; i++) {
        const o = tokensToObject(t, r);
        if (o === BREAK) {
            if (e.value === 1 / 0)
                break;
            throw new Error(`${decodeErrPrefix} got unexpected break to lengthed array`)
        }
        if (o === DONE)
            throw new Error(`${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${e.value})`);
        n[i] = o
    }
    return n
}
function tokenToMap(e, t, r) {
    const n = !0 === r.useMaps
      , i = n ? void 0 : {}
      , o = n ? new Map : void 0;
    for (let s = 0; s < e.value; s++) {
        const a = tokensToObject(t, r);
        if (a === BREAK) {
            if (e.value === 1 / 0)
                break;
            throw new Error(`${decodeErrPrefix} got unexpected break to lengthed map`)
        }
        if (a === DONE)
            throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${s} [no key], expected ${e.value})`);
        if (!0 !== n && "string" != typeof a)
            throw new Error(`${decodeErrPrefix} non-string keys not supported (got ${typeof a})`);
        const c = tokensToObject(t, r);
        if (c === DONE)
            throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${s} [no value], expected ${e.value})`);
        n ? o.set(a, c) : i[a] = c
    }
    return n ? o : i
}
function tokensToObject(e, t) {
    if (e.done())
        return DONE;
    const r = e.next();
    if (r.type === Type.break)
        return BREAK;
    if (r.type.terminal)
        return r.value;
    if (r.type === Type.array)
        return tokenToArray(r, e, t);
    if (r.type === Type.map)
        return tokenToMap(r, e, t);
    if (r.type === Type.tag) {
        if (t.tags && "function" == typeof t.tags[r.value]) {
            const n = tokensToObject(e, t);
            return t.tags[r.value](n)
        }
        throw new Error(`${decodeErrPrefix} tag not supported (${r.value})`)
    }
    throw new Error("unsupported")
}
function decode$7(e, t) {
    if (!(e instanceof Uint8Array))
        throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
    const r = (t = Object.assign({}, defaultDecodeOptions, t)).tokenizer || new Tokeniser(e,t)
      , n = tokensToObject(r, t);
    if (n === DONE)
        throw new Error(`${decodeErrPrefix} did not find any content to decode`);
    if (n === BREAK)
        throw new Error(`${decodeErrPrefix} got unexpected break`);
    if (!r.done())
        throw new Error(`${decodeErrPrefix} too many terminals, data makes no sense`);
    return n
}
const CID_CBOR_TAG = 42;
function cidEncoder(e) {
    if (e.asCID !== e)
        return null;
    const t = CID$1.asCID(e);
    if (!t)
        return null;
    const r = new Uint8Array(t.bytes.byteLength + 1);
    return r.set(t.bytes, 1),
    [new Token(Type.tag,CID_CBOR_TAG), new Token(Type.bytes,r)]
}
function undefinedEncoder() {
    throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded")
}
function numberEncoder(e) {
    if (Number.isNaN(e))
        throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
    if (e === 1 / 0 || e === -1 / 0)
        throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
    return null
}
const encodeOptions = {
    float64: !0,
    typeEncoders: {
        Object: cidEncoder,
        undefined: undefinedEncoder,
        number: numberEncoder
    }
};
function cidDecoder(e) {
    if (0 !== e[0])
        throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
    return CID$1.decode(e.subarray(1))
}
const decodeOptions = {
    allowIndefinite: !1,
    allowUndefined: !1,
    allowNaN: !1,
    allowInfinity: !1,
    allowBigInt: !0,
    strict: !0,
    useMaps: !1,
    tags: []
};
decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
const encode$b = e=>encode$c(e, encodeOptions)
  , decode$6 = e=>decode$7(e, decodeOptions);
function createHeader(e) {
    const t = encode$b({
        version: 1,
        roots: e
    })
      , r = varint$5.encode(t.length)
      , n = new Uint8Array(r.length + t.length);
    return n.set(r, 0),
    n.set(t, r.length),
    n
}
function createEncoder(e) {
    return {
        async setRoots(t) {
            const r = createHeader(t);
            await e.write(r)
        },
        async writeBlock(t) {
            const {cid: r, bytes: n} = t;
            await e.write(new Uint8Array(varint$5.encode(r.bytes.length + n.length))),
            await e.write(r.bytes),
            await e.write(n)
        },
        close: async()=>e.end()
    }
}
function noop$1() {}
function create$4() {
    const e = [];
    let t = null
      , r = noop$1
      , n = !1
      , i = null
      , o = noop$1;
    const s = ()=>(t || (t = new Promise((e=>{
        r = ()=>{
            t = null,
            r = noop$1,
            e()
        }
    }
    ))),
    t)
      , a = {
        async next() {
            const t = e.shift();
            return t ? (0 === e.length && r(),
            {
                done: !1,
                value: t
            }) : n ? (r(),
            {
                done: !0,
                value: void 0
            }) : (i || (i = new Promise((e=>{
                o = ()=>(i = null,
                o = noop$1,
                e(a.next()))
            }
            ))),
            i)
        }
    };
    return {
        writer: {
            write(t) {
                e.push(t);
                const r = s();
                return o(),
                r
            },
            async end() {
                n = !0;
                const e = s();
                return o(),
                e
            }
        },
        iterator: a
    }
}
async function readVarint(e) {
    const t = await e.upTo(8)
      , r = varint$5.decode(t);
    return e.seek(varint$5.decode.bytes),
    r
}
async function readHeader(e) {
    const t = await readVarint(e)
      , r = await e.exactly(t);
    return e.seek(t),
    decode$6(r)
}
function bytesReader(e) {
    let t = 0;
    return {
        upTo: async r=>e.subarray(t, t + Math.min(r, e.length - t)),
        async exactly(r) {
            if (r > e.length - t)
                throw new Error("Unexpected end of data");
            return e.subarray(t, t + r)
        },
        seek(e) {
            t += e
        },
        get pos() {
            return t
        }
    }
}
class CarWriter {
    constructor(e, t) {
        this._encoder = t,
        this._mutex = t.setRoots(e),
        this._ended = !1
    }
    async put(e) {
        if (!(e.bytes instanceof Uint8Array && e.cid))
            throw new TypeError("Can only write {cid, binary} objects");
        if (this._ended)
            throw new Error("Already closed");
        const t = CID$1.asCID(e.cid);
        if (!t)
            throw new TypeError("Can only write {cid, binary} objects");
        return this._mutex = this._mutex.then((()=>this._encoder.writeBlock({
            cid: t,
            bytes: e.bytes
        }))),
        this._mutex
    }
    async close() {
        if (this._ended)
            throw new Error("Already closed");
        return await this._mutex,
        this._ended = !0,
        this._encoder.close()
    }
    static create(e) {
        e = toRoots(e);
        const {encoder: t, iterator: r} = encodeWriter();
        return {
            writer: new CarWriter(e,t),
            out: new CarWriterOut(r)
        }
    }
    static createAppender() {
        const {encoder: e, iterator: t} = encodeWriter();
        e.setRoots = ()=>Promise.resolve();
        return {
            writer: new CarWriter([],e),
            out: new CarWriterOut(t)
        }
    }
    static async updateRootsInBytes(e, t) {
        const r = bytesReader(e);
        await readHeader(r);
        const n = createHeader(t);
        if (r.pos !== n.length)
            throw new Error(`updateRoots() can only overwrite a header of the same length (old header is ${r.pos} bytes, new header is ${n.length} bytes)`);
        return e.set(n, 0),
        e
    }
}
class CarWriterOut {
    constructor(e) {
        this._iterator = e
    }
    [Symbol.asyncIterator]() {
        if (this._iterating)
            throw new Error("Multiple iterator not supported");
        return this._iterating = !0,
        this._iterator
    }
}
function encodeWriter() {
    const e = create$4()
      , {writer: t, iterator: r} = e;
    return {
        encoder: createEncoder(t),
        iterator: r
    }
}
function toRoots(e) {
    if (void 0 === e)
        return [];
    if (!Array.isArray(e)) {
        const t = CID$1.asCID(e);
        if (!t)
            throw new TypeError("roots must be a single CID or an array of CIDs");
        return [t]
    }
    const t = [];
    for (const r of e) {
        const e = CID$1.asCID(r);
        if (!e)
            throw new TypeError("roots must be a single CID or an array of CIDs");
        t.push(e)
    }
    return t
}
async function *batch$3(e, t=1) {
    let r = [];
    t < 1 && (t = 1);
    for await(const n of e)
        for (r.push(n); r.length >= t; )
            yield r.slice(0, t),
            r = r.slice(t);
    for (; r.length; )
        yield r.slice(0, t),
        r = r.slice(t)
}
var itBatch = batch$3;
const batch$2 = itBatch;
async function *parallelBatch$2(e, t=1) {
    for await(const r of batch$2(e, t)) {
        const e = r.map((e=>e().then((e=>({
            ok: !0,
            value: e
        })), (e=>({
            ok: !1,
            err: e
        })))));
        for (let t = 0; t < e.length; t++) {
            const r = await e[t];
            if (!r.ok)
                throw r.err;
            yield r.value
        }
    }
}
var itParallelBatch = parallelBatch$2
  , isPlainObj = e=>{
    if ("[object Object]" !== Object.prototype.toString.call(e))
        return !1;
    const t = Object.getPrototypeOf(e);
    return null === t || t === Object.prototype
}
;
const isOptionObject = isPlainObj
  , {hasOwnProperty: hasOwnProperty} = Object.prototype
  , {propertyIsEnumerable: propertyIsEnumerable} = Object
  , defineProperty = (e,t,r)=>Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
})
  , globalThis$1 = commonjsGlobal
  , defaultMergeOptions = {
    concatArrays: !1,
    ignoreUndefined: !1
}
  , getEnumerableOwnPropertyKeys = e=>{
    const t = [];
    for (const r in e)
        hasOwnProperty.call(e, r) && t.push(r);
    if (Object.getOwnPropertySymbols) {
        const r = Object.getOwnPropertySymbols(e);
        for (const n of r)
            propertyIsEnumerable.call(e, n) && t.push(n)
    }
    return t
}
;
function clone(e) {
    return Array.isArray(e) ? cloneArray(e) : isOptionObject(e) ? cloneOptionObject(e) : e
}
function cloneArray(e) {
    const t = e.slice(0, 0);
    return getEnumerableOwnPropertyKeys(e).forEach((r=>{
        defineProperty(t, r, clone(e[r]))
    }
    )),
    t
}
function cloneOptionObject(e) {
    const t = null === Object.getPrototypeOf(e) ? Object.create(null) : {};
    return getEnumerableOwnPropertyKeys(e).forEach((r=>{
        defineProperty(t, r, clone(e[r]))
    }
    )),
    t
}
const mergeKeys = (e,t,r,n)=>(r.forEach((r=>{
    void 0 === t[r] && n.ignoreUndefined || (r in e && e[r] !== Object.getPrototypeOf(e) ? defineProperty(e, r, merge(e[r], t[r], n)) : defineProperty(e, r, clone(t[r])))
}
)),
e)
  , concatArrays = (e,t,r)=>{
    let n = e.slice(0, 0)
      , i = 0;
    return [e, t].forEach((t=>{
        const o = [];
        for (let r = 0; r < t.length; r++)
            hasOwnProperty.call(t, r) && (o.push(String(r)),
            defineProperty(n, i++, t === e ? t[r] : clone(t[r])));
        n = mergeKeys(n, t, getEnumerableOwnPropertyKeys(t).filter((e=>!o.includes(e))), r)
    }
    )),
    n
}
;
function merge(e, t, r) {
    return r.concatArrays && Array.isArray(e) && Array.isArray(t) ? concatArrays(e, t, r) : isOptionObject(t) && isOptionObject(e) ? mergeKeys(e, t, getEnumerableOwnPropertyKeys(t), r) : clone(t)
}
var mergeOptions$1 = function(...e) {
    const t = merge(clone(defaultMergeOptions), this !== globalThis$1 && this || {}, defaultMergeOptions);
    let r = {
        _: {}
    };
    for (const n of e)
        if (void 0 !== n) {
            if (!isOptionObject(n))
                throw new TypeError("`" + n + "` is not an Option Object");
            r = merge(r, {
                _: n
            }, t)
        }
    return r._
};
function assign(e, t) {
    for (const r in t)
        Object.defineProperty(e, r, {
            value: t[r],
            enumerable: !0,
            configurable: !0
        });
    return e
}
function createError(e, t, r) {
    if (!e || "string" == typeof e)
        throw new TypeError("Please pass an Error to err-code");
    r || (r = {}),
    "object" == typeof t && (r = t,
    t = ""),
    t && (r.code = t);
    try {
        return assign(e, r)
    } catch (n) {
        r.message = e.message,
        r.stack = e.stack;
        const t = function() {};
        t.prototype = Object.create(Object.getPrototypeOf(e));
        return assign(new t, r)
    }
}
var errCode$3 = createError
  , src$9 = {
    exports: {}
};
function base$1(e) {
    if (e.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), r = 0; r < t.length; r++)
        t[r] = 255;
    for (var n = 0; n < e.length; n++) {
        var i = e.charAt(n)
          , o = i.charCodeAt(0);
        if (255 !== t[o])
            throw new TypeError(i + " is ambiguous");
        t[o] = n
    }
    var s = e.length
      , a = e.charAt(0)
      , c = Math.log(s) / Math.log(256)
      , u = Math.log(256) / Math.log(s);
    function l(e) {
        if ("string" != typeof e)
            throw new TypeError("Expected String");
        if (0 === e.length)
            return new Uint8Array;
        var r = 0;
        if (" " !== e[r]) {
            for (var n = 0, i = 0; e[r] === a; )
                n++,
                r++;
            for (var o = (e.length - r) * c + 1 >>> 0, u = new Uint8Array(o); e[r]; ) {
                var l = t[e.charCodeAt(r)];
                if (255 === l)
                    return;
                for (var f = 0, h = o - 1; (0 !== l || f < i) && -1 !== h; h--,
                f++)
                    l += s * u[h] >>> 0,
                    u[h] = l % 256 >>> 0,
                    l = l / 256 >>> 0;
                if (0 !== l)
                    throw new Error("Non-zero carry");
                i = f,
                r++
            }
            if (" " !== e[r]) {
                for (var d = o - i; d !== o && 0 === u[d]; )
                    d++;
                for (var p = new Uint8Array(n + (o - d)), y = n; d !== o; )
                    p[y++] = u[d++];
                return p
            }
        }
    }
    return {
        encode: function(t) {
            if (t instanceof Uint8Array || (ArrayBuffer.isView(t) ? t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength) : Array.isArray(t) && (t = Uint8Array.from(t))),
            !(t instanceof Uint8Array))
                throw new TypeError("Expected Uint8Array");
            if (0 === t.length)
                return "";
            for (var r = 0, n = 0, i = 0, o = t.length; i !== o && 0 === t[i]; )
                i++,
                r++;
            for (var c = (o - i) * u + 1 >>> 0, l = new Uint8Array(c); i !== o; ) {
                for (var f = t[i], h = 0, d = c - 1; (0 !== f || h < n) && -1 !== d; d--,
                h++)
                    f += 256 * l[d] >>> 0,
                    l[d] = f % s >>> 0,
                    f = f / s >>> 0;
                if (0 !== f)
                    throw new Error("Non-zero carry");
                n = h,
                i++
            }
            for (var p = c - n; p !== c && 0 === l[p]; )
                p++;
            for (var y = a.repeat(r); p < c; ++p)
                y += e.charAt(l[p]);
            return y
        },
        decodeUnsafe: l,
        decode: function(e) {
            var t = l(e);
            if (t)
                return t;
            throw new Error("Non-base" + s + " character")
        }
    }
}
var src$8 = base$1;
const textDecoder$1 = new TextDecoder
  , decodeText$1 = e=>textDecoder$1.decode(e)
  , textEncoder$2 = new TextEncoder
  , encodeText$2 = e=>textEncoder$2.encode(e);
function concat$1(e, t) {
    const r = new Uint8Array(t);
    let n = 0;
    for (const i of e)
        r.set(i, n),
        n += i.length;
    return r
}
var util$b = {
    decodeText: decodeText$1,
    encodeText: encodeText$2,
    concat: concat$1
};
const {encodeText: encodeText$1} = util$b;
class Base$1 {
    constructor(e, t, r, n) {
        this.name = e,
        this.code = t,
        this.codeBuf = encodeText$1(this.code),
        this.alphabet = n,
        this.codec = r(n)
    }
    encode(e) {
        return this.codec.encode(e)
    }
    decode(e) {
        for (const t of e)
            if (this.alphabet && this.alphabet.indexOf(t) < 0)
                throw new Error(`invalid character '${t}' in '${e}'`);
        return this.codec.decode(e)
    }
}
var base = Base$1;
const decode$5 = (e,t,r)=>{
    const n = {};
    for (let u = 0; u < t.length; ++u)
        n[t[u]] = u;
    let i = e.length;
    for (; "=" === e[i - 1]; )
        --i;
    const o = new Uint8Array(i * r / 8 | 0);
    let s = 0
      , a = 0
      , c = 0;
    for (let u = 0; u < i; ++u) {
        const t = n[e[u]];
        if (void 0 === t)
            throw new SyntaxError("Invalid character " + e[u]);
        a = a << r | t,
        s += r,
        s >= 8 && (s -= 8,
        o[c++] = 255 & a >> s)
    }
    if (s >= r || 255 & a << 8 - s)
        throw new SyntaxError("Unexpected end of data");
    return o
}
  , encode$a = (e,t,r)=>{
    const n = "=" === t[t.length - 1]
      , i = (1 << r) - 1;
    let o = ""
      , s = 0
      , a = 0;
    for (let c = 0; c < e.length; ++c)
        for (a = a << 8 | e[c],
        s += 8; s > r; )
            s -= r,
            o += t[i & a >> s];
    if (s && (o += t[i & a << r - s]),
    n)
        for (; o.length * r & 7; )
            o += "=";
    return o
}
  , rfc4648$1 = e=>t=>({
    encode: r=>encode$a(r, t, e),
    decode: r=>decode$5(r, t, e)
});
var rfc4648_1 = {
    rfc4648: rfc4648$1
};
const baseX = src$8
  , Base = base
  , {rfc4648: rfc4648} = rfc4648_1
  , {decodeText: decodeText, encodeText: encodeText} = util$b
  , identity$1 = ()=>({
    encode: decodeText,
    decode: encodeText
})
  , constants$1 = [["identity", "\0", identity$1, ""], ["base2", "0", rfc4648(1), "01"], ["base8", "7", rfc4648(3), "01234567"], ["base10", "9", baseX, "0123456789"], ["base16", "f", rfc4648(4), "0123456789abcdef"], ["base16upper", "F", rfc4648(4), "0123456789ABCDEF"], ["base32hex", "v", rfc4648(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", rfc4648(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", rfc4648(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", rfc4648(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", rfc4648(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", rfc4648(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", rfc4648(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", rfc4648(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", rfc4648(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", baseX, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", baseX, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", baseX, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", baseX, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", rfc4648(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", rfc4648(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", rfc4648(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", rfc4648(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]]
  , names$2 = constants$1.reduce(((e,t)=>(e[t[0]] = new Base(t[0],t[1],t[2],t[3]),
e)), {})
  , codes$1 = constants$1.reduce(((e,t)=>(e[t[1]] = names$2[t[0]],
e)), {});
var constants_1 = {
    names: names$2,
    codes: codes$1
};
!function(e, t) {
    const r = constants_1
      , {encodeText: n, decodeText: i, concat: o} = util$b;
    function s(e) {
        if (Object.prototype.hasOwnProperty.call(r.names, e))
            return r.names[e];
        if (Object.prototype.hasOwnProperty.call(r.codes, e))
            return r.codes[e];
        throw new Error(`Unsupported encoding: ${e}`)
    }
    (t = e.exports = function(e, t) {
        if (!t)
            throw new Error("requires an encoded Uint8Array");
        const {name: r, codeBuf: n} = s(e);
        return function(e, t) {
            s(e).decode(i(t))
        }(r, t),
        o([n, t], n.length + t.length)
    }
    ).encode = function(e, t) {
        const r = s(e)
          , i = n(r.encode(t));
        return o([r.codeBuf, i], r.codeBuf.length + i.length)
    }
    ,
    t.decode = function(e) {
        e instanceof Uint8Array && (e = i(e));
        const t = e[0];
        return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(t) && (e = e.toLowerCase()),
        s(e[0]).decode(e.substring(1))
    }
    ,
    t.isEncoded = function(e) {
        if (e instanceof Uint8Array && (e = i(e)),
        "[object String]" !== Object.prototype.toString.call(e))
            return !1;
        try {
            return s(e[0]).name
        } catch (t) {
            return !1
        }
    }
    ,
    t.encoding = s,
    t.encodingFromData = function(e) {
        return e instanceof Uint8Array && (e = i(e)),
        s(e[0])
    }
    ;
    const a = Object.freeze(r.names)
      , c = Object.freeze(r.codes);
    t.names = a,
    t.codes = c
}(src$9, src$9.exports);
var encode_1$1 = encode$9
  , MSB$3 = 128
  , REST$3 = 127
  , MSBALL$1 = ~REST$3
  , INT$1 = Math.pow(2, 31);
function encode$9(e, t, r) {
    t = t || [];
    for (var n = r = r || 0; e >= INT$1; )
        t[r++] = 255 & e | MSB$3,
        e /= 128;
    for (; e & MSBALL$1; )
        t[r++] = 255 & e | MSB$3,
        e >>>= 7;
    return t[r] = 0 | e,
    encode$9.bytes = r - n + 1,
    t
}
var decode$4 = read$1
  , MSB$2 = 128
  , REST$2 = 127;
function read$1(e, t) {
    var r, n = 0, i = 0, o = t = t || 0, s = e.length;
    do {
        if (o >= s)
            throw read$1.bytes = 0,
            new RangeError("Could not decode varint");
        r = e[o++],
        n += i < 28 ? (r & REST$2) << i : (r & REST$2) * Math.pow(2, i),
        i += 7
    } while (r >= MSB$2);
    return read$1.bytes = o - t,
    n
}
var N1$1 = Math.pow(2, 7)
  , N2$1 = Math.pow(2, 14)
  , N3$1 = Math.pow(2, 21)
  , N4$1 = Math.pow(2, 28)
  , N5$1 = Math.pow(2, 35)
  , N6$1 = Math.pow(2, 42)
  , N7$1 = Math.pow(2, 49)
  , N8$1 = Math.pow(2, 56)
  , N9$1 = Math.pow(2, 63)
  , length$1 = function(e) {
    return e < N1$1 ? 1 : e < N2$1 ? 2 : e < N3$1 ? 3 : e < N4$1 ? 4 : e < N5$1 ? 5 : e < N6$1 ? 6 : e < N7$1 ? 7 : e < N8$1 ? 8 : e < N9$1 ? 9 : 10
}
  , varint$4 = {
    encode: encode_1$1,
    decode: decode$4,
    encodingLength: length$1
};
const names$1 = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
});
var constants = {
    names: names$1
};
const {encoding: getCodec$2} = src$9.exports
  , utf8Decoder = new TextDecoder("utf8");
function uint8ArrayToAsciiString(e) {
    let t = "";
    for (let r = 0; r < e.length; r++)
        t += String.fromCharCode(e[r]);
    return t
}
function toString(e, t="utf8") {
    return "utf8" === t || "utf-8" === t ? utf8Decoder.decode(e) : "ascii" === t ? uint8ArrayToAsciiString(e) : getCodec$2(t).encode(e)
}
var toString_1 = toString;
const {encoding: getCodec$1} = src$9.exports
  , utf8Encoder = new TextEncoder;
function asciiStringToUint8Array(e) {
    const t = new Uint8Array(e.length);
    for (let r = 0; r < e.length; r++)
        t[r] = e.charCodeAt(r);
    return t
}
function fromString(e, t="utf8") {
    return "utf8" === t || "utf-8" === t ? utf8Encoder.encode(e) : "ascii" === t ? asciiStringToUint8Array(e) : getCodec$1(t).decode(e)
}
var fromString_1 = fromString;
function concat(e, t) {
    t || (t = e.reduce(((e,t)=>e + t.length), 0));
    const r = new Uint8Array(t);
    let n = 0;
    for (const i of e)
        r.set(i, n),
        n += i.length;
    return r
}
var concat_1 = concat;
const multibase = src$9.exports
  , varint$3 = varint$4
  , {names: names} = constants
  , uint8ArrayToString$1 = toString_1
  , uint8ArrayFromString$4 = fromString_1
  , uint8ArrayConcat$2 = concat_1
  , codes = {};
for (const h in names) {
    const e = h;
    codes[names[e]] = e
}
function toHexString(e) {
    if (!(e instanceof Uint8Array))
        throw new Error("must be passed a Uint8Array");
    return uint8ArrayToString$1(e, "base16")
}
function fromHexString(e) {
    return uint8ArrayFromString$4(e, "base16")
}
function toB58String(e) {
    if (!(e instanceof Uint8Array))
        throw new Error("must be passed a Uint8Array");
    return uint8ArrayToString$1(multibase.encode("base58btc", e)).slice(1)
}
function fromB58String(e) {
    const t = e instanceof Uint8Array ? uint8ArrayToString$1(e) : e;
    return multibase.decode("z" + t)
}
function decode$3(e) {
    if (!(e instanceof Uint8Array))
        throw new Error("multihash must be a Uint8Array");
    if (e.length < 2)
        throw new Error("multihash too short. must be > 2 bytes.");
    const t = varint$3.decode(e);
    if (!isValidCode(t))
        throw new Error(`multihash unknown function code: 0x${t.toString(16)}`);
    e = e.slice(varint$3.decode.bytes);
    const r = varint$3.decode(e);
    if (r < 0)
        throw new Error(`multihash invalid length: ${r}`);
    if ((e = e.slice(varint$3.decode.bytes)).length !== r)
        throw new Error(`multihash length inconsistent: 0x${uint8ArrayToString$1(e, "base16")}`);
    return {
        code: t,
        name: codes[t],
        length: r,
        digest: e
    }
}
function encode$8(e, t, r) {
    if (!e || void 0 === t)
        throw new Error("multihash encode requires at least two args: digest, code");
    const n = coerceCode(t);
    if (!(e instanceof Uint8Array))
        throw new Error("digest should be a Uint8Array");
    if (null == r && (r = e.length),
    r && e.length !== r)
        throw new Error("digest length should be equal to specified length.");
    const i = varint$3.encode(n)
      , o = varint$3.encode(r);
    return uint8ArrayConcat$2([i, o, e], i.length + o.length + e.length)
}
function coerceCode(e) {
    let t = e;
    if ("string" == typeof e) {
        if (void 0 === names[e])
            throw new Error(`Unrecognized hash function named: ${e}`);
        t = names[e]
    }
    if ("number" != typeof t)
        throw new Error(`Hash function code should be a number. Got: ${t}`);
    if (void 0 === codes[t] && !isAppCode(t))
        throw new Error(`Unrecognized function code: ${t}`);
    return t
}
function isAppCode(e) {
    return e > 0 && e < 16
}
function isValidCode(e) {
    return !!isAppCode(e) || !!codes[e]
}
function validate$1(e) {
    decode$3(e)
}
function prefix(e) {
    return validate$1(e),
    e.subarray(0, 2)
}
Object.freeze(codes);
var src$7 = {
    names: names,
    codes: codes,
    toHexString: toHexString,
    fromHexString: fromHexString,
    toB58String: toB58String,
    fromB58String: fromB58String,
    decode: decode$3,
    encode: encode$8,
    coerceCode: coerceCode,
    isAppCode: isAppCode,
    validate: validate$1,
    prefix: prefix,
    isValidCode: isValidCode
}, sha3$1 = {
    exports: {}
}, module;
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
module = sha3$1,
function() {
    var e = "input is invalid type"
      , t = "object" == typeof window
      , r = t ? window : {};
    r.JS_SHA3_NO_WINDOW && (t = !1);
    var n = !t && "object" == typeof self;
    !r.JS_SHA3_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node ? r = commonjsGlobal : n && (r = self);
    var i = !r.JS_SHA3_NO_COMMON_JS && module.exports
      , o = !r.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer
      , s = "0123456789abcdef".split("")
      , a = [4, 1024, 262144, 67108864]
      , c = [0, 8, 16, 24]
      , u = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]
      , l = [224, 256, 384, 512]
      , f = [128, 256]
      , h = ["hex", "buffer", "arrayBuffer", "array", "digest"]
      , d = {
        128: 168,
        256: 136
    };
    !r.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    ),
    !o || !r.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
        return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
    }
    );
    for (var p = function(e, t, r) {
        return function(n) {
            return new I(e,t,e).update(n)[r]()
        }
    }, y = function(e, t, r) {
        return function(n, i) {
            return new I(e,t,i).update(n)[r]()
        }
    }, b = function(e, t, r) {
        return function(t, n, i, o) {
            return _["cshake" + e].update(t, n, i, o)[r]()
        }
    }, g = function(e, t, r) {
        return function(t, n, i, o) {
            return _["kmac" + e].update(t, n, i, o)[r]()
        }
    }, m = function(e, t, r, n) {
        for (var i = 0; i < h.length; ++i) {
            var o = h[i];
            e[o] = t(r, n, o)
        }
        return e
    }, k = function(e, t) {
        var r = p(e, t, "hex");
        return r.create = function() {
            return new I(e,t,e)
        }
        ,
        r.update = function(e) {
            return r.create().update(e)
        }
        ,
        m(r, p, e, t)
    }, w = [{
        name: "keccak",
        padding: [1, 256, 65536, 16777216],
        bits: l,
        createMethod: k
    }, {
        name: "sha3",
        padding: [6, 1536, 393216, 100663296],
        bits: l,
        createMethod: k
    }, {
        name: "shake",
        padding: [31, 7936, 2031616, 520093696],
        bits: f,
        createMethod: function(e, t) {
            var r = y(e, t, "hex");
            return r.create = function(r) {
                return new I(e,t,r)
            }
            ,
            r.update = function(e, t) {
                return r.create(t).update(e)
            }
            ,
            m(r, y, e, t)
        }
    }, {
        name: "cshake",
        padding: a,
        bits: f,
        createMethod: function(e, t) {
            var r = d[e]
              , n = b(e, 0, "hex");
            return n.create = function(n, i, o) {
                return i || o ? new I(e,t,n).bytepad([i, o], r) : _["shake" + e].create(n)
            }
            ,
            n.update = function(e, t, r, i) {
                return n.create(t, r, i).update(e)
            }
            ,
            m(n, b, e, t)
        }
    }, {
        name: "kmac",
        padding: a,
        bits: f,
        createMethod: function(e, t) {
            var r = d[e]
              , n = g(e, 0, "hex");
            return n.create = function(n, i, o) {
                return new C(e,t,i).bytepad(["KMAC", o], r).bytepad([n], r)
            }
            ,
            n.update = function(e, t, r, i) {
                return n.create(e, r, i).update(t)
            }
            ,
            m(n, g, e, t)
        }
    }], _ = {}, $ = [], v = 0; v < w.length; ++v)
        for (var A = w[v], T = A.bits, B = 0; B < T.length; ++B) {
            var E = A.name + "_" + T[B];
            if ($.push(E),
            _[E] = A.createMethod(T[B], A.padding),
            "sha3" !== A.name) {
                var S = A.name + T[B];
                $.push(S),
                _[S] = _[E]
            }
        }
    function I(e, t, r) {
        this.blocks = [],
        this.s = [],
        this.padding = t,
        this.outputBits = r,
        this.reset = !0,
        this.finalized = !1,
        this.block = 0,
        this.start = 0,
        this.blockCount = 1600 - (e << 1) >> 5,
        this.byteCount = this.blockCount << 2,
        this.outputBlocks = r >> 5,
        this.extraBytes = (31 & r) >> 3;
        for (var n = 0; n < 50; ++n)
            this.s[n] = 0
    }
    function C(e, t, r) {
        I.call(this, e, t, r)
    }
    I.prototype.update = function(t) {
        if (this.finalized)
            throw new Error("finalize already called");
        var r, n = typeof t;
        if ("string" !== n) {
            if ("object" !== n)
                throw new Error(e);
            if (null === t)
                throw new Error(e);
            if (o && t.constructor === ArrayBuffer)
                t = new Uint8Array(t);
            else if (!(Array.isArray(t) || o && ArrayBuffer.isView(t)))
                throw new Error(e);
            r = !0
        }
        for (var i, s, a = this.blocks, u = this.byteCount, l = t.length, f = this.blockCount, h = 0, d = this.s; h < l; ) {
            if (this.reset)
                for (this.reset = !1,
                a[0] = this.block,
                i = 1; i < f + 1; ++i)
                    a[i] = 0;
            if (r)
                for (i = this.start; h < l && i < u; ++h)
                    a[i >> 2] |= t[h] << c[3 & i++];
            else
                for (i = this.start; h < l && i < u; ++h)
                    (s = t.charCodeAt(h)) < 128 ? a[i >> 2] |= s << c[3 & i++] : s < 2048 ? (a[i >> 2] |= (192 | s >> 6) << c[3 & i++],
                    a[i >> 2] |= (128 | 63 & s) << c[3 & i++]) : s < 55296 || s >= 57344 ? (a[i >> 2] |= (224 | s >> 12) << c[3 & i++],
                    a[i >> 2] |= (128 | s >> 6 & 63) << c[3 & i++],
                    a[i >> 2] |= (128 | 63 & s) << c[3 & i++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++h)),
                    a[i >> 2] |= (240 | s >> 18) << c[3 & i++],
                    a[i >> 2] |= (128 | s >> 12 & 63) << c[3 & i++],
                    a[i >> 2] |= (128 | s >> 6 & 63) << c[3 & i++],
                    a[i >> 2] |= (128 | 63 & s) << c[3 & i++]);
            if (this.lastByteIndex = i,
            i >= u) {
                for (this.start = i - u,
                this.block = a[f],
                i = 0; i < f; ++i)
                    d[i] ^= a[i];
                x(d),
                this.reset = !0
            } else
                this.start = i
        }
        return this
    }
    ,
    I.prototype.encode = function(e, t) {
        var r = 255 & e
          , n = 1
          , i = [r];
        for (r = 255 & (e >>= 8); r > 0; )
            i.unshift(r),
            r = 255 & (e >>= 8),
            ++n;
        return t ? i.push(n) : i.unshift(n),
        this.update(i),
        i.length
    }
    ,
    I.prototype.encodeString = function(t) {
        var r, n = typeof t;
        if ("string" !== n) {
            if ("object" !== n)
                throw new Error(e);
            if (null === t)
                throw new Error(e);
            if (o && t.constructor === ArrayBuffer)
                t = new Uint8Array(t);
            else if (!(Array.isArray(t) || o && ArrayBuffer.isView(t)))
                throw new Error(e);
            r = !0
        }
        var i = 0
          , s = t.length;
        if (r)
            i = s;
        else
            for (var a = 0; a < t.length; ++a) {
                var c = t.charCodeAt(a);
                c < 128 ? i += 1 : c < 2048 ? i += 2 : c < 55296 || c >= 57344 ? i += 3 : (c = 65536 + ((1023 & c) << 10 | 1023 & t.charCodeAt(++a)),
                i += 4)
            }
        return i += this.encode(8 * i),
        this.update(t),
        i
    }
    ,
    I.prototype.bytepad = function(e, t) {
        for (var r = this.encode(t), n = 0; n < e.length; ++n)
            r += this.encodeString(e[n]);
        var i = t - r % t
          , o = [];
        return o.length = i,
        this.update(o),
        this
    }
    ,
    I.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks
              , t = this.lastByteIndex
              , r = this.blockCount
              , n = this.s;
            if (e[t >> 2] |= this.padding[3 & t],
            this.lastByteIndex === this.byteCount)
                for (e[0] = e[r],
                t = 1; t < r + 1; ++t)
                    e[t] = 0;
            for (e[r - 1] |= 2147483648,
            t = 0; t < r; ++t)
                n[t] ^= e[t];
            x(n)
        }
    }
    ,
    I.prototype.toString = I.prototype.hex = function() {
        this.finalize();
        for (var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, a = 0, c = ""; a < n; ) {
            for (o = 0; o < t && a < n; ++o,
            ++a)
                e = r[o],
                c += s[e >> 4 & 15] + s[15 & e] + s[e >> 12 & 15] + s[e >> 8 & 15] + s[e >> 20 & 15] + s[e >> 16 & 15] + s[e >> 28 & 15] + s[e >> 24 & 15];
            a % t == 0 && (x(r),
            o = 0)
        }
        return i && (e = r[o],
        c += s[e >> 4 & 15] + s[15 & e],
        i > 1 && (c += s[e >> 12 & 15] + s[e >> 8 & 15]),
        i > 2 && (c += s[e >> 20 & 15] + s[e >> 16 & 15])),
        c
    }
    ,
    I.prototype.arrayBuffer = function() {
        this.finalize();
        var e, t = this.blockCount, r = this.s, n = this.outputBlocks, i = this.extraBytes, o = 0, s = 0, a = this.outputBits >> 3;
        e = i ? new ArrayBuffer(n + 1 << 2) : new ArrayBuffer(a);
        for (var c = new Uint32Array(e); s < n; ) {
            for (o = 0; o < t && s < n; ++o,
            ++s)
                c[s] = r[o];
            s % t == 0 && x(r)
        }
        return i && (c[o] = r[o],
        e = e.slice(0, a)),
        e
    }
    ,
    I.prototype.buffer = I.prototype.arrayBuffer,
    I.prototype.digest = I.prototype.array = function() {
        this.finalize();
        for (var e, t, r = this.blockCount, n = this.s, i = this.outputBlocks, o = this.extraBytes, s = 0, a = 0, c = []; a < i; ) {
            for (s = 0; s < r && a < i; ++s,
            ++a)
                e = a << 2,
                t = n[s],
                c[e] = 255 & t,
                c[e + 1] = t >> 8 & 255,
                c[e + 2] = t >> 16 & 255,
                c[e + 3] = t >> 24 & 255;
            a % r == 0 && x(n)
        }
        return o && (e = a << 2,
        t = n[s],
        c[e] = 255 & t,
        o > 1 && (c[e + 1] = t >> 8 & 255),
        o > 2 && (c[e + 2] = t >> 16 & 255)),
        c
    }
    ,
    C.prototype = new I,
    C.prototype.finalize = function() {
        return this.encode(this.outputBits, !0),
        I.prototype.finalize.call(this)
    }
    ;
    var x = function(e) {
        var t, r, n, i, o, s, a, c, l, f, h, d, p, y, b, g, m, k, w, _, $, v, A, T, B, E, S, I, C, x, U, N, D, O, L, R, M, F, j, P, z, H, V, G, W, q, Y, K, J, Z, X, Q, ee, te, re, ne, ie, oe, se, ae, ce, ue, le;
        for (n = 0; n < 48; n += 2)
            i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40],
            o = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41],
            s = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42],
            a = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43],
            c = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44],
            l = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45],
            f = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46],
            h = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47],
            t = (d = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (s << 1 | a >>> 31),
            r = (p = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (a << 1 | s >>> 31),
            e[0] ^= t,
            e[1] ^= r,
            e[10] ^= t,
            e[11] ^= r,
            e[20] ^= t,
            e[21] ^= r,
            e[30] ^= t,
            e[31] ^= r,
            e[40] ^= t,
            e[41] ^= r,
            t = i ^ (c << 1 | l >>> 31),
            r = o ^ (l << 1 | c >>> 31),
            e[2] ^= t,
            e[3] ^= r,
            e[12] ^= t,
            e[13] ^= r,
            e[22] ^= t,
            e[23] ^= r,
            e[32] ^= t,
            e[33] ^= r,
            e[42] ^= t,
            e[43] ^= r,
            t = s ^ (f << 1 | h >>> 31),
            r = a ^ (h << 1 | f >>> 31),
            e[4] ^= t,
            e[5] ^= r,
            e[14] ^= t,
            e[15] ^= r,
            e[24] ^= t,
            e[25] ^= r,
            e[34] ^= t,
            e[35] ^= r,
            e[44] ^= t,
            e[45] ^= r,
            t = c ^ (d << 1 | p >>> 31),
            r = l ^ (p << 1 | d >>> 31),
            e[6] ^= t,
            e[7] ^= r,
            e[16] ^= t,
            e[17] ^= r,
            e[26] ^= t,
            e[27] ^= r,
            e[36] ^= t,
            e[37] ^= r,
            e[46] ^= t,
            e[47] ^= r,
            t = f ^ (i << 1 | o >>> 31),
            r = h ^ (o << 1 | i >>> 31),
            e[8] ^= t,
            e[9] ^= r,
            e[18] ^= t,
            e[19] ^= r,
            e[28] ^= t,
            e[29] ^= r,
            e[38] ^= t,
            e[39] ^= r,
            e[48] ^= t,
            e[49] ^= r,
            y = e[0],
            b = e[1],
            q = e[11] << 4 | e[10] >>> 28,
            Y = e[10] << 4 | e[11] >>> 28,
            I = e[20] << 3 | e[21] >>> 29,
            C = e[21] << 3 | e[20] >>> 29,
            ae = e[31] << 9 | e[30] >>> 23,
            ce = e[30] << 9 | e[31] >>> 23,
            H = e[40] << 18 | e[41] >>> 14,
            V = e[41] << 18 | e[40] >>> 14,
            O = e[2] << 1 | e[3] >>> 31,
            L = e[3] << 1 | e[2] >>> 31,
            g = e[13] << 12 | e[12] >>> 20,
            m = e[12] << 12 | e[13] >>> 20,
            K = e[22] << 10 | e[23] >>> 22,
            J = e[23] << 10 | e[22] >>> 22,
            x = e[33] << 13 | e[32] >>> 19,
            U = e[32] << 13 | e[33] >>> 19,
            ue = e[42] << 2 | e[43] >>> 30,
            le = e[43] << 2 | e[42] >>> 30,
            te = e[5] << 30 | e[4] >>> 2,
            re = e[4] << 30 | e[5] >>> 2,
            R = e[14] << 6 | e[15] >>> 26,
            M = e[15] << 6 | e[14] >>> 26,
            k = e[25] << 11 | e[24] >>> 21,
            w = e[24] << 11 | e[25] >>> 21,
            Z = e[34] << 15 | e[35] >>> 17,
            X = e[35] << 15 | e[34] >>> 17,
            N = e[45] << 29 | e[44] >>> 3,
            D = e[44] << 29 | e[45] >>> 3,
            T = e[6] << 28 | e[7] >>> 4,
            B = e[7] << 28 | e[6] >>> 4,
            ne = e[17] << 23 | e[16] >>> 9,
            ie = e[16] << 23 | e[17] >>> 9,
            F = e[26] << 25 | e[27] >>> 7,
            j = e[27] << 25 | e[26] >>> 7,
            _ = e[36] << 21 | e[37] >>> 11,
            $ = e[37] << 21 | e[36] >>> 11,
            Q = e[47] << 24 | e[46] >>> 8,
            ee = e[46] << 24 | e[47] >>> 8,
            G = e[8] << 27 | e[9] >>> 5,
            W = e[9] << 27 | e[8] >>> 5,
            E = e[18] << 20 | e[19] >>> 12,
            S = e[19] << 20 | e[18] >>> 12,
            oe = e[29] << 7 | e[28] >>> 25,
            se = e[28] << 7 | e[29] >>> 25,
            P = e[38] << 8 | e[39] >>> 24,
            z = e[39] << 8 | e[38] >>> 24,
            v = e[48] << 14 | e[49] >>> 18,
            A = e[49] << 14 | e[48] >>> 18,
            e[0] = y ^ ~g & k,
            e[1] = b ^ ~m & w,
            e[10] = T ^ ~E & I,
            e[11] = B ^ ~S & C,
            e[20] = O ^ ~R & F,
            e[21] = L ^ ~M & j,
            e[30] = G ^ ~q & K,
            e[31] = W ^ ~Y & J,
            e[40] = te ^ ~ne & oe,
            e[41] = re ^ ~ie & se,
            e[2] = g ^ ~k & _,
            e[3] = m ^ ~w & $,
            e[12] = E ^ ~I & x,
            e[13] = S ^ ~C & U,
            e[22] = R ^ ~F & P,
            e[23] = M ^ ~j & z,
            e[32] = q ^ ~K & Z,
            e[33] = Y ^ ~J & X,
            e[42] = ne ^ ~oe & ae,
            e[43] = ie ^ ~se & ce,
            e[4] = k ^ ~_ & v,
            e[5] = w ^ ~$ & A,
            e[14] = I ^ ~x & N,
            e[15] = C ^ ~U & D,
            e[24] = F ^ ~P & H,
            e[25] = j ^ ~z & V,
            e[34] = K ^ ~Z & Q,
            e[35] = J ^ ~X & ee,
            e[44] = oe ^ ~ae & ue,
            e[45] = se ^ ~ce & le,
            e[6] = _ ^ ~v & y,
            e[7] = $ ^ ~A & b,
            e[16] = x ^ ~N & T,
            e[17] = U ^ ~D & B,
            e[26] = P ^ ~H & O,
            e[27] = z ^ ~V & L,
            e[36] = Z ^ ~Q & G,
            e[37] = X ^ ~ee & W,
            e[46] = ae ^ ~ue & te,
            e[47] = ce ^ ~le & re,
            e[8] = v ^ ~y & g,
            e[9] = A ^ ~b & m,
            e[18] = N ^ ~T & E,
            e[19] = D ^ ~B & S,
            e[28] = H ^ ~O & R,
            e[29] = V ^ ~L & M,
            e[38] = Q ^ ~G & q,
            e[39] = ee ^ ~W & Y,
            e[48] = ue ^ ~te & ne,
            e[49] = le ^ ~re & ie,
            e[0] ^= u[n],
            e[1] ^= u[n + 1]
    };
    if (i)
        module.exports = _;
    else
        for (v = 0; v < $.length; ++v)
            r[$[v]] = _[$[v]]
}();
var murmurHash3js = {
    exports: {}
};
!function(e, t) {
    !function(r, n) {
        var i = {
            version: "3.0.0",
            x86: {},
            x64: {},
            inputValidation: !0
        };
        function o(e) {
            if (!Array.isArray(e) && !ArrayBuffer.isView(e))
                return !1;
            for (var t = 0; t < e.length; t++)
                if (!Number.isInteger(e[t]) || e[t] < 0 || e[t] > 255)
                    return !1;
            return !0
        }
        function s(e, t) {
            return (65535 & e) * t + (((e >>> 16) * t & 65535) << 16)
        }
        function a(e, t) {
            return e << t | e >>> 32 - t
        }
        function c(e) {
            return e = s(e ^= e >>> 16, 2246822507),
            e = s(e ^= e >>> 13, 3266489909),
            e ^= e >>> 16
        }
        function u(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
            t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var r = [0, 0, 0, 0];
            return r[3] += e[3] + t[3],
            r[2] += r[3] >>> 16,
            r[3] &= 65535,
            r[2] += e[2] + t[2],
            r[1] += r[2] >>> 16,
            r[2] &= 65535,
            r[1] += e[1] + t[1],
            r[0] += r[1] >>> 16,
            r[1] &= 65535,
            r[0] += e[0] + t[0],
            r[0] &= 65535,
            [r[0] << 16 | r[1], r[2] << 16 | r[3]]
        }
        function l(e, t) {
            e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
            t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
            var r = [0, 0, 0, 0];
            return r[3] += e[3] * t[3],
            r[2] += r[3] >>> 16,
            r[3] &= 65535,
            r[2] += e[2] * t[3],
            r[1] += r[2] >>> 16,
            r[2] &= 65535,
            r[2] += e[3] * t[2],
            r[1] += r[2] >>> 16,
            r[2] &= 65535,
            r[1] += e[1] * t[3],
            r[0] += r[1] >>> 16,
            r[1] &= 65535,
            r[1] += e[2] * t[2],
            r[0] += r[1] >>> 16,
            r[1] &= 65535,
            r[1] += e[3] * t[1],
            r[0] += r[1] >>> 16,
            r[1] &= 65535,
            r[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
            r[0] &= 65535,
            [r[0] << 16 | r[1], r[2] << 16 | r[3]]
        }
        function f(e, t) {
            return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32,
            [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
        }
        function h(e, t) {
            return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
        }
        function d(e, t) {
            return [e[0] ^ t[0], e[1] ^ t[1]]
        }
        function p(e) {
            return e = d(e, [0, e[0] >>> 1]),
            e = d(e = l(e, [4283543511, 3981806797]), [0, e[0] >>> 1]),
            e = d(e = l(e, [3301882366, 444984403]), [0, e[0] >>> 1])
        }
        i.x86.hash32 = function(e, t) {
            if (i.inputValidation && !o(e))
                return n;
            t = t || 0;
            for (var r = e.length % 4, u = e.length - r, l = t, f = 0, h = 3432918353, d = 461845907, p = 0; p < u; p += 4)
                f = s(f = e[p] | e[p + 1] << 8 | e[p + 2] << 16 | e[p + 3] << 24, h),
                f = s(f = a(f, 15), d),
                l = s(l = a(l ^= f, 13), 5) + 3864292196;
            switch (f = 0,
            r) {
            case 3:
                f ^= e[p + 2] << 16;
            case 2:
                f ^= e[p + 1] << 8;
            case 1:
                f = s(f ^= e[p], h),
                l ^= f = s(f = a(f, 15), d)
            }
            return (l = c(l ^= e.length)) >>> 0
        }
        ,
        i.x86.hash128 = function(e, t) {
            if (i.inputValidation && !o(e))
                return n;
            t = t || 0;
            for (var r = e.length % 16, u = e.length - r, l = t, f = t, h = t, d = t, p = 0, y = 0, b = 0, g = 0, m = 597399067, k = 2869860233, w = 951274213, _ = 2716044179, $ = 0; $ < u; $ += 16)
                p = e[$] | e[$ + 1] << 8 | e[$ + 2] << 16 | e[$ + 3] << 24,
                y = e[$ + 4] | e[$ + 5] << 8 | e[$ + 6] << 16 | e[$ + 7] << 24,
                b = e[$ + 8] | e[$ + 9] << 8 | e[$ + 10] << 16 | e[$ + 11] << 24,
                g = e[$ + 12] | e[$ + 13] << 8 | e[$ + 14] << 16 | e[$ + 15] << 24,
                p = a(p = s(p, m), 15),
                l = a(l ^= p = s(p, k), 19),
                l = s(l += f, 5) + 1444728091,
                y = a(y = s(y, k), 16),
                f = a(f ^= y = s(y, w), 17),
                f = s(f += h, 5) + 197830471,
                b = a(b = s(b, w), 17),
                h = a(h ^= b = s(b, _), 15),
                h = s(h += d, 5) + 2530024501,
                g = a(g = s(g, _), 18),
                d = a(d ^= g = s(g, m), 13),
                d = s(d += l, 5) + 850148119;
            switch (p = 0,
            y = 0,
            b = 0,
            g = 0,
            r) {
            case 15:
                g ^= e[$ + 14] << 16;
            case 14:
                g ^= e[$ + 13] << 8;
            case 13:
                g = s(g ^= e[$ + 12], _),
                d ^= g = s(g = a(g, 18), m);
            case 12:
                b ^= e[$ + 11] << 24;
            case 11:
                b ^= e[$ + 10] << 16;
            case 10:
                b ^= e[$ + 9] << 8;
            case 9:
                b = s(b ^= e[$ + 8], w),
                h ^= b = s(b = a(b, 17), _);
            case 8:
                y ^= e[$ + 7] << 24;
            case 7:
                y ^= e[$ + 6] << 16;
            case 6:
                y ^= e[$ + 5] << 8;
            case 5:
                y = s(y ^= e[$ + 4], k),
                f ^= y = s(y = a(y, 16), w);
            case 4:
                p ^= e[$ + 3] << 24;
            case 3:
                p ^= e[$ + 2] << 16;
            case 2:
                p ^= e[$ + 1] << 8;
            case 1:
                p = s(p ^= e[$], m),
                l ^= p = s(p = a(p, 15), k)
            }
            return l ^= e.length,
            l += f ^= e.length,
            l += h ^= e.length,
            f += l += d ^= e.length,
            h += l,
            d += l,
            l = c(l),
            l += f = c(f),
            l += h = c(h),
            f += l += d = c(d),
            h += l,
            d += l,
            ("00000000" + (l >>> 0).toString(16)).slice(-8) + ("00000000" + (f >>> 0).toString(16)).slice(-8) + ("00000000" + (h >>> 0).toString(16)).slice(-8) + ("00000000" + (d >>> 0).toString(16)).slice(-8)
        }
        ,
        i.x64.hash128 = function(e, t) {
            if (i.inputValidation && !o(e))
                return n;
            t = t || 0;
            for (var r = e.length % 16, s = e.length - r, a = [0, t], c = [0, t], y = [0, 0], b = [0, 0], g = [2277735313, 289559509], m = [1291169091, 658871167], k = 0; k < s; k += 16)
                y = [e[k + 4] | e[k + 5] << 8 | e[k + 6] << 16 | e[k + 7] << 24, e[k] | e[k + 1] << 8 | e[k + 2] << 16 | e[k + 3] << 24],
                b = [e[k + 12] | e[k + 13] << 8 | e[k + 14] << 16 | e[k + 15] << 24, e[k + 8] | e[k + 9] << 8 | e[k + 10] << 16 | e[k + 11] << 24],
                y = f(y = l(y, g), 31),
                a = u(a = f(a = d(a, y = l(y, m)), 27), c),
                a = u(l(a, [0, 5]), [0, 1390208809]),
                b = f(b = l(b, m), 33),
                c = u(c = f(c = d(c, b = l(b, g)), 31), a),
                c = u(l(c, [0, 5]), [0, 944331445]);
            switch (y = [0, 0],
            b = [0, 0],
            r) {
            case 15:
                b = d(b, h([0, e[k + 14]], 48));
            case 14:
                b = d(b, h([0, e[k + 13]], 40));
            case 13:
                b = d(b, h([0, e[k + 12]], 32));
            case 12:
                b = d(b, h([0, e[k + 11]], 24));
            case 11:
                b = d(b, h([0, e[k + 10]], 16));
            case 10:
                b = d(b, h([0, e[k + 9]], 8));
            case 9:
                b = l(b = d(b, [0, e[k + 8]]), m),
                c = d(c, b = l(b = f(b, 33), g));
            case 8:
                y = d(y, h([0, e[k + 7]], 56));
            case 7:
                y = d(y, h([0, e[k + 6]], 48));
            case 6:
                y = d(y, h([0, e[k + 5]], 40));
            case 5:
                y = d(y, h([0, e[k + 4]], 32));
            case 4:
                y = d(y, h([0, e[k + 3]], 24));
            case 3:
                y = d(y, h([0, e[k + 2]], 16));
            case 2:
                y = d(y, h([0, e[k + 1]], 8));
            case 1:
                y = l(y = d(y, [0, e[k]]), g),
                a = d(a, y = l(y = f(y, 31), m))
            }
            return a = u(a = d(a, [0, e.length]), c = d(c, [0, e.length])),
            c = u(c, a),
            a = u(a = p(a), c = p(c)),
            c = u(c, a),
            ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8)
        }
        ,
        e.exports && (t = e.exports = i),
        t.murmurHash3 = i
    }()
}(murmurHash3js, murmurHash3js.exports);
var murmurhash3jsRevisited = murmurHash3js.exports;
const multihash$1 = src$7
  , crypto$3 = self.crypto || self.msCrypto
  , digest = async(e,t)=>{
    if ("undefined" == typeof self || !crypto$3)
        throw new Error("Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context");
    switch (t) {
    case "sha1":
        return new Uint8Array(await crypto$3.subtle.digest({
            name: "SHA-1"
        }, e));
    case "sha2-256":
        return new Uint8Array(await crypto$3.subtle.digest({
            name: "SHA-256"
        }, e));
    case "sha2-512":
        return new Uint8Array(await crypto$3.subtle.digest({
            name: "SHA-512"
        }, e));
    case "dbl-sha2-256":
        {
            const t = await crypto$3.subtle.digest({
                name: "SHA-256"
            }, e);
            return new Uint8Array(await crypto$3.subtle.digest({
                name: "SHA-256"
            }, t))
        }
    default:
        throw new Error(`${t} is not a supported algorithm`)
    }
}
;
var sha_browser = {
    factory: e=>async t=>digest(t, e),
    digest: digest,
    multihashing: async(e,t,r)=>{
        const n = await digest(e, t);
        return multihash$1.encode(n, t, r)
    }
};
const fromNumberTo32BitBuf$1 = e=>{
    const t = new Uint8Array(4);
    for (let r = 0; r < 4; r++)
        t[r] = 255 & e,
        e >>= 8;
    return t
}
;
var utils = {
    fromNumberTo32BitBuf: fromNumberTo32BitBuf$1
}
  , ERROR_MSG_INPUT = "Input must be an string, Buffer or Uint8Array";
function normalizeInput(e) {
    var t;
    if (e instanceof Uint8Array)
        t = e;
    else if (e instanceof Buffer)
        t = new Uint8Array(e);
    else {
        if ("string" != typeof e)
            throw new Error(ERROR_MSG_INPUT);
        t = new Uint8Array(Buffer.from(e, "utf8"))
    }
    return t
}
function toHex(e) {
    return Array.prototype.map.call(e, (function(e) {
        return (e < 16 ? "0" : "") + e.toString(16)
    }
    )).join("")
}
function uint32ToHex(e) {
    return (4294967296 + e).toString(16).substring(1)
}
function debugPrint(e, t, r) {
    for (var n = "\n" + e + " = ", i = 0; i < t.length; i += 2) {
        if (32 === r)
            n += uint32ToHex(t[i]).toUpperCase(),
            n += " ",
            n += uint32ToHex(t[i + 1]).toUpperCase();
        else {
            if (64 !== r)
                throw new Error("Invalid size " + r);
            n += uint32ToHex(t[i + 1]).toUpperCase(),
            n += uint32ToHex(t[i]).toUpperCase()
        }
        i % 6 == 4 ? n += "\n" + new Array(e.length + 4).join(" ") : i < t.length - 2 && (n += " ")
    }
    console.log(n)
}
function testSpeed(e, t, r) {
    for (var n = (new Date).getTime(), i = new Uint8Array(t), o = 0; o < t; o++)
        i[o] = o % 256;
    var s = (new Date).getTime();
    for (console.log("Generated random input in " + (s - n) + "ms"),
    n = s,
    o = 0; o < r; o++) {
        var a = e(i)
          , c = (new Date).getTime()
          , u = c - n;
        n = c,
        console.log("Hashed in " + u + "ms: " + a.substring(0, 20) + "..."),
        console.log(Math.round(t / (1 << 20) / (u / 1e3) * 100) / 100 + " MB PER SECOND")
    }
}
var util$a = {
    normalizeInput: normalizeInput,
    toHex: toHex,
    debugPrint: debugPrint,
    testSpeed: testSpeed
}
  , util$9 = util$a;
function ADD64AA(e, t, r) {
    var n = e[t] + e[r]
      , i = e[t + 1] + e[r + 1];
    n >= 4294967296 && i++,
    e[t] = n,
    e[t + 1] = i
}
function ADD64AC(e, t, r, n) {
    var i = e[t] + r;
    r < 0 && (i += 4294967296);
    var o = e[t + 1] + n;
    i >= 4294967296 && o++,
    e[t] = i,
    e[t + 1] = o
}
function B2B_GET32(e, t) {
    return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24
}
function B2B_G(e, t, r, n, i, o) {
    var s = m$1[i]
      , a = m$1[i + 1]
      , c = m$1[o]
      , u = m$1[o + 1];
    ADD64AA(v$1, e, t),
    ADD64AC(v$1, e, s, a);
    var l = v$1[n] ^ v$1[e]
      , f = v$1[n + 1] ^ v$1[e + 1];
    v$1[n] = f,
    v$1[n + 1] = l,
    ADD64AA(v$1, r, n),
    l = v$1[t] ^ v$1[r],
    f = v$1[t + 1] ^ v$1[r + 1],
    v$1[t] = l >>> 24 ^ f << 8,
    v$1[t + 1] = f >>> 24 ^ l << 8,
    ADD64AA(v$1, e, t),
    ADD64AC(v$1, e, c, u),
    l = v$1[n] ^ v$1[e],
    f = v$1[n + 1] ^ v$1[e + 1],
    v$1[n] = l >>> 16 ^ f << 16,
    v$1[n + 1] = f >>> 16 ^ l << 16,
    ADD64AA(v$1, r, n),
    l = v$1[t] ^ v$1[r],
    f = v$1[t + 1] ^ v$1[r + 1],
    v$1[t] = f >>> 31 ^ l << 1,
    v$1[t + 1] = l >>> 31 ^ f << 1
}
var BLAKE2B_IV32 = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225])
  , SIGMA8 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]
  , SIGMA82 = new Uint8Array(SIGMA8.map((function(e) {
    return 2 * e
}
)))
  , v$1 = new Uint32Array(32)
  , m$1 = new Uint32Array(32);
function blake2bCompress(e, t) {
    var r = 0;
    for (r = 0; r < 16; r++)
        v$1[r] = e.h[r],
        v$1[r + 16] = BLAKE2B_IV32[r];
    for (v$1[24] = v$1[24] ^ e.t,
    v$1[25] = v$1[25] ^ e.t / 4294967296,
    t && (v$1[28] = ~v$1[28],
    v$1[29] = ~v$1[29]),
    r = 0; r < 32; r++)
        m$1[r] = B2B_GET32(e.b, 4 * r);
    for (r = 0; r < 12; r++)
        B2B_G(0, 8, 16, 24, SIGMA82[16 * r + 0], SIGMA82[16 * r + 1]),
        B2B_G(2, 10, 18, 26, SIGMA82[16 * r + 2], SIGMA82[16 * r + 3]),
        B2B_G(4, 12, 20, 28, SIGMA82[16 * r + 4], SIGMA82[16 * r + 5]),
        B2B_G(6, 14, 22, 30, SIGMA82[16 * r + 6], SIGMA82[16 * r + 7]),
        B2B_G(0, 10, 20, 30, SIGMA82[16 * r + 8], SIGMA82[16 * r + 9]),
        B2B_G(2, 12, 22, 24, SIGMA82[16 * r + 10], SIGMA82[16 * r + 11]),
        B2B_G(4, 14, 16, 26, SIGMA82[16 * r + 12], SIGMA82[16 * r + 13]),
        B2B_G(6, 8, 18, 28, SIGMA82[16 * r + 14], SIGMA82[16 * r + 15]);
    for (r = 0; r < 16; r++)
        e.h[r] = e.h[r] ^ v$1[r] ^ v$1[r + 16]
}
function blake2bInit(e, t) {
    if (0 === e || e > 64)
        throw new Error("Illegal output length, expected 0 < length <= 64");
    if (t && t.length > 64)
        throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
    for (var r = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        c: 0,
        outlen: e
    }, n = 0; n < 16; n++)
        r.h[n] = BLAKE2B_IV32[n];
    var i = t ? t.length : 0;
    return r.h[0] ^= 16842752 ^ i << 8 ^ e,
    t && (blake2bUpdate(r, t),
    r.c = 128),
    r
}
function blake2bUpdate(e, t) {
    for (var r = 0; r < t.length; r++)
        128 === e.c && (e.t += e.c,
        blake2bCompress(e, !1),
        e.c = 0),
        e.b[e.c++] = t[r]
}
function blake2bFinal(e) {
    for (e.t += e.c; e.c < 128; )
        e.b[e.c++] = 0;
    blake2bCompress(e, !0);
    for (var t = new Uint8Array(e.outlen), r = 0; r < e.outlen; r++)
        t[r] = e.h[r >> 2] >> 8 * (3 & r);
    return t
}
function blake2b$1(e, t, r) {
    r = r || 64,
    e = util$9.normalizeInput(e);
    var n = blake2bInit(r, t);
    return blake2bUpdate(n, e),
    blake2bFinal(n)
}
function blake2bHex(e, t, r) {
    var n = blake2b$1(e, t, r);
    return util$9.toHex(n)
}
var blake2b_1 = {
    blake2b: blake2b$1,
    blake2bHex: blake2bHex,
    blake2bInit: blake2bInit,
    blake2bUpdate: blake2bUpdate,
    blake2bFinal: blake2bFinal
}
  , util$8 = util$a;
function B2S_GET32(e, t) {
    return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24
}
function B2S_G(e, t, r, n, i, o) {
    v[e] = v[e] + v[t] + i,
    v[n] = ROTR32(v[n] ^ v[e], 16),
    v[r] = v[r] + v[n],
    v[t] = ROTR32(v[t] ^ v[r], 12),
    v[e] = v[e] + v[t] + o,
    v[n] = ROTR32(v[n] ^ v[e], 8),
    v[r] = v[r] + v[n],
    v[t] = ROTR32(v[t] ^ v[r], 7)
}
function ROTR32(e, t) {
    return e >>> t ^ e << 32 - t
}
var BLAKE2S_IV = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
  , SIGMA = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0])
  , v = new Uint32Array(16)
  , m = new Uint32Array(16);
function blake2sCompress(e, t) {
    var r = 0;
    for (r = 0; r < 8; r++)
        v[r] = e.h[r],
        v[r + 8] = BLAKE2S_IV[r];
    for (v[12] ^= e.t,
    v[13] ^= e.t / 4294967296,
    t && (v[14] = ~v[14]),
    r = 0; r < 16; r++)
        m[r] = B2S_GET32(e.b, 4 * r);
    for (r = 0; r < 10; r++)
        B2S_G(0, 4, 8, 12, m[SIGMA[16 * r + 0]], m[SIGMA[16 * r + 1]]),
        B2S_G(1, 5, 9, 13, m[SIGMA[16 * r + 2]], m[SIGMA[16 * r + 3]]),
        B2S_G(2, 6, 10, 14, m[SIGMA[16 * r + 4]], m[SIGMA[16 * r + 5]]),
        B2S_G(3, 7, 11, 15, m[SIGMA[16 * r + 6]], m[SIGMA[16 * r + 7]]),
        B2S_G(0, 5, 10, 15, m[SIGMA[16 * r + 8]], m[SIGMA[16 * r + 9]]),
        B2S_G(1, 6, 11, 12, m[SIGMA[16 * r + 10]], m[SIGMA[16 * r + 11]]),
        B2S_G(2, 7, 8, 13, m[SIGMA[16 * r + 12]], m[SIGMA[16 * r + 13]]),
        B2S_G(3, 4, 9, 14, m[SIGMA[16 * r + 14]], m[SIGMA[16 * r + 15]]);
    for (r = 0; r < 8; r++)
        e.h[r] ^= v[r] ^ v[r + 8]
}
function blake2sInit(e, t) {
    if (!(e > 0 && e <= 32))
        throw new Error("Incorrect output length, should be in [1, 32]");
    var r = t ? t.length : 0;
    if (t && !(r > 0 && r <= 32))
        throw new Error("Incorrect key length, should be in [1, 32]");
    var n = {
        h: new Uint32Array(BLAKE2S_IV),
        b: new Uint32Array(64),
        c: 0,
        t: 0,
        outlen: e
    };
    return n.h[0] ^= 16842752 ^ r << 8 ^ e,
    r > 0 && (blake2sUpdate(n, t),
    n.c = 64),
    n
}
function blake2sUpdate(e, t) {
    for (var r = 0; r < t.length; r++)
        64 === e.c && (e.t += e.c,
        blake2sCompress(e, !1),
        e.c = 0),
        e.b[e.c++] = t[r]
}
function blake2sFinal(e) {
    for (e.t += e.c; e.c < 64; )
        e.b[e.c++] = 0;
    blake2sCompress(e, !0);
    for (var t = new Uint8Array(e.outlen), r = 0; r < e.outlen; r++)
        t[r] = e.h[r >> 2] >> 8 * (3 & r) & 255;
    return t
}
function blake2s$1(e, t, r) {
    r = r || 32,
    e = util$8.normalizeInput(e);
    var n = blake2sInit(r, t);
    return blake2sUpdate(n, e),
    blake2sFinal(n)
}
function blake2sHex(e, t, r) {
    var n = blake2s$1(e, t, r);
    return util$8.toHex(n)
}
var blake2s_1 = {
    blake2s: blake2s$1,
    blake2sHex: blake2sHex,
    blake2sInit: blake2sInit,
    blake2sUpdate: blake2sUpdate,
    blake2sFinal: blake2sFinal
}
  , b2b = blake2b_1
  , b2s = blake2s_1
  , blakejs = {
    blake2b: b2b.blake2b,
    blake2bHex: b2b.blake2bHex,
    blake2bInit: b2b.blake2bInit,
    blake2bUpdate: b2b.blake2bUpdate,
    blake2bFinal: b2b.blake2bFinal,
    blake2s: b2s.blake2s,
    blake2sHex: b2s.blake2sHex,
    blake2sInit: b2s.blake2sInit,
    blake2sUpdate: b2s.blake2sUpdate,
    blake2sFinal: b2s.blake2sFinal
};
const blake = blakejs
  , minB = 45569
  , minS = 45633
  , blake2b = {
    init: blake.blake2bInit,
    update: blake.blake2bUpdate,
    digest: blake.blake2bFinal
}
  , blake2s = {
    init: blake.blake2sInit,
    update: blake.blake2sUpdate,
    digest: blake.blake2sFinal
}
  , makeB2Hash = (e,t)=>async r=>{
    const n = t.init(e, null);
    return t.update(n, r),
    t.digest(n)
}
;
var blake_1 = e=>{
    for (let t = 0; t < 64; t++)
        e[minB + t] = makeB2Hash(t + 1, blake2b);
    for (let t = 0; t < 32; t++)
        e[minS + t] = makeB2Hash(t + 1, blake2s)
}
;
const sha3 = sha3$1.exports
  , mur = murmurhash3jsRevisited
  , {factory: sha$1} = sha_browser
  , {fromNumberTo32BitBuf: fromNumberTo32BitBuf} = utils
  , uint8ArrayFromString$3 = fromString_1
  , hash = e=>async t=>{
    switch (e) {
    case "sha3-224":
        return new Uint8Array(sha3.sha3_224.arrayBuffer(t));
    case "sha3-256":
        return new Uint8Array(sha3.sha3_256.arrayBuffer(t));
    case "sha3-384":
        return new Uint8Array(sha3.sha3_384.arrayBuffer(t));
    case "sha3-512":
        return new Uint8Array(sha3.sha3_512.arrayBuffer(t));
    case "shake-128":
        return new Uint8Array(sha3.shake128.create(128).update(t).arrayBuffer());
    case "shake-256":
        return new Uint8Array(sha3.shake256.create(256).update(t).arrayBuffer());
    case "keccak-224":
        return new Uint8Array(sha3.keccak224.arrayBuffer(t));
    case "keccak-256":
        return new Uint8Array(sha3.keccak256.arrayBuffer(t));
    case "keccak-384":
        return new Uint8Array(sha3.keccak384.arrayBuffer(t));
    case "keccak-512":
        return new Uint8Array(sha3.keccak512.arrayBuffer(t));
    case "murmur3-128":
        return uint8ArrayFromString$3(mur.x64.hash128(t), "base16");
    case "murmur3-32":
        return fromNumberTo32BitBuf(mur.x86.hash32(t));
    default:
        throw new TypeError(`${e} is not a supported algorithm`)
    }
}
  , identity = e=>e;
var crypto$2 = {
    identity: identity,
    sha1: sha$1("sha1"),
    sha2256: sha$1("sha2-256"),
    sha2512: sha$1("sha2-512"),
    dblSha2256: sha$1("dbl-sha2-256"),
    sha3224: hash("sha3-224"),
    sha3256: hash("sha3-256"),
    sha3384: hash("sha3-384"),
    sha3512: hash("sha3-512"),
    shake128: hash("shake-128"),
    shake256: hash("shake-256"),
    keccak224: hash("keccak-224"),
    keccak256: hash("keccak-256"),
    keccak384: hash("keccak-384"),
    keccak512: hash("keccak-512"),
    murmur3128: hash("murmur3-128"),
    murmur332: hash("murmur3-32"),
    addBlake: blake_1
};
function equals$1(e, t) {
    if (e === t)
        return !0;
    if (e.byteLength !== t.byteLength)
        return !1;
    for (let r = 0; r < e.byteLength; r++)
        if (e[r] !== t[r])
            return !1;
    return !0
}
var equals_1 = equals$1;
const errcode$2 = errCode$3
  , multihash = src$7
  , crypto$1 = crypto$2
  , equals = equals_1;
async function Multihashing(e, t, r) {
    const n = await Multihashing.digest(e, t, r);
    return multihash.encode(n, t, r)
}
Multihashing.multihash = multihash,
Multihashing.digest = async(e,t,r)=>{
    const n = Multihashing.createHash(t)
      , i = await n(e);
    return r ? i.slice(0, r) : i
}
,
Multihashing.createHash = function(e) {
    if (!e) {
        throw errcode$2(new Error("hash algorithm must be specified"), "ERR_HASH_ALGORITHM_NOT_SPECIFIED")
    }
    const t = multihash.coerceCode(e);
    if (!Multihashing.functions[t])
        throw errcode$2(new Error(`multihash function '${e}' not yet supported`), "ERR_HASH_ALGORITHM_NOT_SUPPORTED");
    return Multihashing.functions[t]
}
,
Multihashing.functions = {
    0: crypto$1.identity,
    17: crypto$1.sha1,
    18: crypto$1.sha2256,
    19: crypto$1.sha2512,
    20: crypto$1.sha3512,
    21: crypto$1.sha3384,
    22: crypto$1.sha3256,
    23: crypto$1.sha3224,
    24: crypto$1.shake128,
    25: crypto$1.shake256,
    26: crypto$1.keccak224,
    27: crypto$1.keccak256,
    28: crypto$1.keccak384,
    29: crypto$1.keccak512,
    34: crypto$1.murmur3128,
    35: crypto$1.murmur332,
    86: crypto$1.dblSha2256
},
crypto$1.addBlake(Multihashing.functions),
Multihashing.validate = async(e,t)=>{
    const r = await Multihashing(e, multihash.decode(t).name);
    return equals(t, r)
}
;
var src$6 = Multihashing;
const from = ({name: e, code: t, encode: r})=>new Hasher(e,t,r);
class Hasher {
    constructor(e, t, r) {
        this.name = e,
        this.code = t,
        this.encode = r
    }
    async digest(e) {
        if (e instanceof Uint8Array) {
            const t = await this.encode(e);
            return create$5(this.code, t)
        }
        throw Error("Unknown type, must be binary type")
    }
}
const sha = e=>async t=>new Uint8Array(await crypto.subtle.digest(e, t))
  , sha256$1 = from({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256")
})
  , sha512 = from({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512")
})
  , __browser = !0;
var sha2Browser = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    sha256: sha256$1,
    sha512: sha512,
    __browser: __browser
})
  , require$$2 = getAugmentedNamespace(sha2Browser);
const mergeOptions = mergeOptions$1.bind({
    ignoreUndefined: !0
})
  , multihashing = src$6
  , {sha256: sha256} = require$$2;
async function hamtHashFn(e) {
    const t = (await multihashing(e, "murmur3-128")).slice(2, 10)
      , r = t.length
      , n = new Uint8Array(r);
    for (let i = 0; i < r; i++)
        n[r - i - 1] = t[i];
    return n
}
const defaultOptions$1 = {
    chunker: "fixed",
    strategy: "balanced",
    rawLeaves: !1,
    onlyHash: !1,
    reduceSingleLeafToSelf: !0,
    hasher: sha256,
    leafType: "file",
    cidVersion: 0,
    progress: ()=>()=>{}
    ,
    shardSplitThreshold: 1e3,
    fileImportConcurrency: 50,
    blockWriteConcurrency: 10,
    minChunkSize: 262144,
    maxChunkSize: 262144,
    avgChunkSize: 262144,
    window: 16,
    polynomial: 0x3df305dfb2a804,
    maxChildrenPerNode: 174,
    layerRepeat: 4,
    wrapWithDirectory: !1,
    pin: !1,
    recursive: !1,
    hidden: !1,
    preload: !1,
    timeout: void 0,
    hamtHashFn: hamtHashFn,
    hamtHashCode: 34,
    hamtBucketBits: 8
};
var options = function(e={}) {
    return mergeOptions(defaultOptions$1, e)
}
  , indexMinimal = {}
  , minimal$1 = {}
  , aspromise = asPromise;
function asPromise(e, t) {
    for (var r = new Array(arguments.length - 1), n = 0, i = 2, o = !0; i < arguments.length; )
        r[n++] = arguments[i++];
    return new Promise((function(i, s) {
        r[n] = function(e) {
            if (o)
                if (o = !1,
                e)
                    s(e);
                else {
                    for (var t = new Array(arguments.length - 1), r = 0; r < t.length; )
                        t[r++] = arguments[r];
                    i.apply(null, t)
                }
        }
        ;
        try {
            e.apply(t || null, r)
        } catch (a) {
            o && (o = !1,
            s(a))
        }
    }
    ))
}
var base64$1 = {};
!function(e) {
    var t = base64$1;
    t.length = function(e) {
        var t = e.length;
        if (!t)
            return 0;
        for (var r = 0; --t % 4 > 1 && "=" === e.charAt(t); )
            ++r;
        return Math.ceil(3 * e.length) / 4 - r
    }
    ;
    for (var r = new Array(64), n = new Array(123), i = 0; i < 64; )
        n[r[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    t.encode = function(e, t, n) {
        for (var i, o = null, s = [], a = 0, c = 0; t < n; ) {
            var u = e[t++];
            switch (c) {
            case 0:
                s[a++] = r[u >> 2],
                i = (3 & u) << 4,
                c = 1;
                break;
            case 1:
                s[a++] = r[i | u >> 4],
                i = (15 & u) << 2,
                c = 2;
                break;
            case 2:
                s[a++] = r[i | u >> 6],
                s[a++] = r[63 & u],
                c = 0
            }
            a > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, s)),
            a = 0)
        }
        return c && (s[a++] = r[i],
        s[a++] = 61,
        1 === c && (s[a++] = 61)),
        o ? (a && o.push(String.fromCharCode.apply(String, s.slice(0, a))),
        o.join("")) : String.fromCharCode.apply(String, s.slice(0, a))
    }
    ;
    var o = "invalid encoding";
    t.decode = function(e, t, r) {
        for (var i, s = r, a = 0, c = 0; c < e.length; ) {
            var u = e.charCodeAt(c++);
            if (61 === u && a > 1)
                break;
            if (void 0 === (u = n[u]))
                throw Error(o);
            switch (a) {
            case 0:
                i = u,
                a = 1;
                break;
            case 1:
                t[r++] = i << 2 | (48 & u) >> 4,
                i = u,
                a = 2;
                break;
            case 2:
                t[r++] = (15 & i) << 4 | (60 & u) >> 2,
                i = u,
                a = 3;
                break;
            case 3:
                t[r++] = (3 & i) << 6 | u,
                a = 0
            }
        }
        if (1 === a)
            throw Error(o);
        return r - s
    }
    ,
    t.test = function(e) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
    }
}();
var eventemitter = EventEmitter;
function EventEmitter() {
    this._listeners = {}
}
EventEmitter.prototype.on = function(e, t, r) {
    return (this._listeners[e] || (this._listeners[e] = [])).push({
        fn: t,
        ctx: r || this
    }),
    this
}
,
EventEmitter.prototype.off = function(e, t) {
    if (void 0 === e)
        this._listeners = {};
    else if (void 0 === t)
        this._listeners[e] = [];
    else
        for (var r = this._listeners[e], n = 0; n < r.length; )
            r[n].fn === t ? r.splice(n, 1) : ++n;
    return this
}
,
EventEmitter.prototype.emit = function(e) {
    var t = this._listeners[e];
    if (t) {
        for (var r = [], n = 1; n < arguments.length; )
            r.push(arguments[n++]);
        for (n = 0; n < t.length; )
            t[n].fn.apply(t[n++].ctx, r)
    }
    return this
}
;
var float = factory(factory);
function factory(e) {
    return "undefined" != typeof Float32Array ? function() {
        var t = new Float32Array([-0])
          , r = new Uint8Array(t.buffer)
          , n = 128 === r[3];
        function i(e, n, i) {
            t[0] = e,
            n[i] = r[0],
            n[i + 1] = r[1],
            n[i + 2] = r[2],
            n[i + 3] = r[3]
        }
        function o(e, n, i) {
            t[0] = e,
            n[i] = r[3],
            n[i + 1] = r[2],
            n[i + 2] = r[1],
            n[i + 3] = r[0]
        }
        function s(e, n) {
            return r[0] = e[n],
            r[1] = e[n + 1],
            r[2] = e[n + 2],
            r[3] = e[n + 3],
            t[0]
        }
        function a(e, n) {
            return r[3] = e[n],
            r[2] = e[n + 1],
            r[1] = e[n + 2],
            r[0] = e[n + 3],
            t[0]
        }
        e.writeFloatLE = n ? i : o,
        e.writeFloatBE = n ? o : i,
        e.readFloatLE = n ? s : a,
        e.readFloatBE = n ? a : s
    }() : function() {
        function t(e, t, r, n) {
            var i = t < 0 ? 1 : 0;
            if (i && (t = -t),
            0 === t)
                e(1 / t > 0 ? 0 : 2147483648, r, n);
            else if (isNaN(t))
                e(2143289344, r, n);
            else if (t > 34028234663852886e22)
                e((i << 31 | 2139095040) >>> 0, r, n);
            else if (t < 11754943508222875e-54)
                e((i << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, r, n);
            else {
                var o = Math.floor(Math.log(t) / Math.LN2);
                e((i << 31 | o + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -o) * 8388608)) >>> 0, r, n)
            }
        }
        function r(e, t, r) {
            var n = e(t, r)
              , i = 2 * (n >> 31) + 1
              , o = n >>> 23 & 255
              , s = 8388607 & n;
            return 255 === o ? s ? NaN : i * (1 / 0) : 0 === o ? 1401298464324817e-60 * i * s : i * Math.pow(2, o - 150) * (s + 8388608)
        }
        e.writeFloatLE = t.bind(null, writeUintLE),
        e.writeFloatBE = t.bind(null, writeUintBE),
        e.readFloatLE = r.bind(null, readUintLE),
        e.readFloatBE = r.bind(null, readUintBE)
    }(),
    "undefined" != typeof Float64Array ? function() {
        var t = new Float64Array([-0])
          , r = new Uint8Array(t.buffer)
          , n = 128 === r[7];
        function i(e, n, i) {
            t[0] = e,
            n[i] = r[0],
            n[i + 1] = r[1],
            n[i + 2] = r[2],
            n[i + 3] = r[3],
            n[i + 4] = r[4],
            n[i + 5] = r[5],
            n[i + 6] = r[6],
            n[i + 7] = r[7]
        }
        function o(e, n, i) {
            t[0] = e,
            n[i] = r[7],
            n[i + 1] = r[6],
            n[i + 2] = r[5],
            n[i + 3] = r[4],
            n[i + 4] = r[3],
            n[i + 5] = r[2],
            n[i + 6] = r[1],
            n[i + 7] = r[0]
        }
        function s(e, n) {
            return r[0] = e[n],
            r[1] = e[n + 1],
            r[2] = e[n + 2],
            r[3] = e[n + 3],
            r[4] = e[n + 4],
            r[5] = e[n + 5],
            r[6] = e[n + 6],
            r[7] = e[n + 7],
            t[0]
        }
        function a(e, n) {
            return r[7] = e[n],
            r[6] = e[n + 1],
            r[5] = e[n + 2],
            r[4] = e[n + 3],
            r[3] = e[n + 4],
            r[2] = e[n + 5],
            r[1] = e[n + 6],
            r[0] = e[n + 7],
            t[0]
        }
        e.writeDoubleLE = n ? i : o,
        e.writeDoubleBE = n ? o : i,
        e.readDoubleLE = n ? s : a,
        e.readDoubleBE = n ? a : s
    }() : function() {
        function t(e, t, r, n, i, o) {
            var s = n < 0 ? 1 : 0;
            if (s && (n = -n),
            0 === n)
                e(0, i, o + t),
                e(1 / n > 0 ? 0 : 2147483648, i, o + r);
            else if (isNaN(n))
                e(0, i, o + t),
                e(2146959360, i, o + r);
            else if (n > 17976931348623157e292)
                e(0, i, o + t),
                e((s << 31 | 2146435072) >>> 0, i, o + r);
            else {
                var a;
                if (n < 22250738585072014e-324)
                    e((a = n / 5e-324) >>> 0, i, o + t),
                    e((s << 31 | a / 4294967296) >>> 0, i, o + r);
                else {
                    var c = Math.floor(Math.log(n) / Math.LN2);
                    1024 === c && (c = 1023),
                    e(4503599627370496 * (a = n * Math.pow(2, -c)) >>> 0, i, o + t),
                    e((s << 31 | c + 1023 << 20 | 1048576 * a & 1048575) >>> 0, i, o + r)
                }
            }
        }
        function r(e, t, r, n, i) {
            var o = e(n, i + t)
              , s = e(n, i + r)
              , a = 2 * (s >> 31) + 1
              , c = s >>> 20 & 2047
              , u = 4294967296 * (1048575 & s) + o;
            return 2047 === c ? u ? NaN : a * (1 / 0) : 0 === c ? 5e-324 * a * u : a * Math.pow(2, c - 1075) * (u + 4503599627370496)
        }
        e.writeDoubleLE = t.bind(null, writeUintLE, 0, 4),
        e.writeDoubleBE = t.bind(null, writeUintBE, 4, 0),
        e.readDoubleLE = r.bind(null, readUintLE, 0, 4),
        e.readDoubleBE = r.bind(null, readUintBE, 4, 0)
    }(),
    e
}
function writeUintLE(e, t, r) {
    t[r] = 255 & e,
    t[r + 1] = e >>> 8 & 255,
    t[r + 2] = e >>> 16 & 255,
    t[r + 3] = e >>> 24
}
function writeUintBE(e, t, r) {
    t[r] = e >>> 24,
    t[r + 1] = e >>> 16 & 255,
    t[r + 2] = e >>> 8 & 255,
    t[r + 3] = 255 & e
}
function readUintLE(e, t) {
    return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0
}
function readUintBE(e, t) {
    return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0
}
var inquire_1 = inquire;
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
            return mod
    } catch (e2) {}
    return null
}
var utf8$2 = {}, utf82;
utf82 = utf8$2,
utf82.length = function(e) {
    for (var t = 0, r = 0, n = 0; n < e.length; ++n)
        (r = e.charCodeAt(n)) < 128 ? t += 1 : r < 2048 ? t += 2 : 55296 == (64512 & r) && 56320 == (64512 & e.charCodeAt(n + 1)) ? (++n,
        t += 4) : t += 3;
    return t
}
,
utf82.read = function(e, t, r) {
    if (r - t < 1)
        return "";
    for (var n, i = null, o = [], s = 0; t < r; )
        (n = e[t++]) < 128 ? o[s++] = n : n > 191 && n < 224 ? o[s++] = (31 & n) << 6 | 63 & e[t++] : n > 239 && n < 365 ? (n = ((7 & n) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536,
        o[s++] = 55296 + (n >> 10),
        o[s++] = 56320 + (1023 & n)) : o[s++] = (15 & n) << 12 | (63 & e[t++]) << 6 | 63 & e[t++],
        s > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, o)),
        s = 0);
    return i ? (s && i.push(String.fromCharCode.apply(String, o.slice(0, s))),
    i.join("")) : String.fromCharCode.apply(String, o.slice(0, s))
}
,
utf82.write = function(e, t, r) {
    for (var n, i, o = r, s = 0; s < e.length; ++s)
        (n = e.charCodeAt(s)) < 128 ? t[r++] = n : n < 2048 ? (t[r++] = n >> 6 | 192,
        t[r++] = 63 & n | 128) : 55296 == (64512 & n) && 56320 == (64512 & (i = e.charCodeAt(s + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & i),
        ++s,
        t[r++] = n >> 18 | 240,
        t[r++] = n >> 12 & 63 | 128,
        t[r++] = n >> 6 & 63 | 128,
        t[r++] = 63 & n | 128) : (t[r++] = n >> 12 | 224,
        t[r++] = n >> 6 & 63 | 128,
        t[r++] = 63 & n | 128);
    return r - o
}
;
var pool_1 = pool;
function pool(e, t, r) {
    var n = r || 8192
      , i = n >>> 1
      , o = null
      , s = n;
    return function(r) {
        if (r < 1 || r > i)
            return e(r);
        s + r > n && (o = e(n),
        s = 0);
        var a = t.call(o, s, s += r);
        return 7 & s && (s = 1 + (7 | s)),
        a
    }
}
var longbits = LongBits$2
  , util$7 = minimal$1;
function LongBits$2(e, t) {
    this.lo = e >>> 0,
    this.hi = t >>> 0
}
var zero = LongBits$2.zero = new LongBits$2(0,0);
zero.toNumber = function() {
    return 0
}
,
zero.zzEncode = zero.zzDecode = function() {
    return this
}
,
zero.length = function() {
    return 1
}
;
var zeroHash = LongBits$2.zeroHash = "\0\0\0\0\0\0\0\0";
LongBits$2.fromNumber = function(e) {
    if (0 === e)
        return zero;
    var t = e < 0;
    t && (e = -e);
    var r = e >>> 0
      , n = (e - r) / 4294967296 >>> 0;
    return t && (n = ~n >>> 0,
    r = ~r >>> 0,
    ++r > 4294967295 && (r = 0,
    ++n > 4294967295 && (n = 0))),
    new LongBits$2(r,n)
}
,
LongBits$2.from = function(e) {
    if ("number" == typeof e)
        return LongBits$2.fromNumber(e);
    if (util$7.isString(e)) {
        if (!util$7.Long)
            return LongBits$2.fromNumber(parseInt(e, 10));
        e = util$7.Long.fromString(e)
    }
    return e.low || e.high ? new LongBits$2(e.low >>> 0,e.high >>> 0) : zero
}
,
LongBits$2.prototype.toNumber = function(e) {
    if (!e && this.hi >>> 31) {
        var t = 1 + ~this.lo >>> 0
          , r = ~this.hi >>> 0;
        return t || (r = r + 1 >>> 0),
        -(t + 4294967296 * r)
    }
    return this.lo + 4294967296 * this.hi
}
,
LongBits$2.prototype.toLong = function(e) {
    return util$7.Long ? new util$7.Long(0 | this.lo,0 | this.hi,Boolean(e)) : {
        low: 0 | this.lo,
        high: 0 | this.hi,
        unsigned: Boolean(e)
    }
}
;
var charCodeAt = String.prototype.charCodeAt;
LongBits$2.fromHash = function(e) {
    return e === zeroHash ? zero : new LongBits$2((charCodeAt.call(e, 0) | charCodeAt.call(e, 1) << 8 | charCodeAt.call(e, 2) << 16 | charCodeAt.call(e, 3) << 24) >>> 0,(charCodeAt.call(e, 4) | charCodeAt.call(e, 5) << 8 | charCodeAt.call(e, 6) << 16 | charCodeAt.call(e, 7) << 24) >>> 0)
}
,
LongBits$2.prototype.toHash = function() {
    return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
}
,
LongBits$2.prototype.zzEncode = function() {
    var e = this.hi >> 31;
    return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0,
    this.lo = (this.lo << 1 ^ e) >>> 0,
    this
}
,
LongBits$2.prototype.zzDecode = function() {
    var e = -(1 & this.lo);
    return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0,
    this.hi = (this.hi >>> 1 ^ e) >>> 0,
    this
}
,
LongBits$2.prototype.length = function() {
    var e = this.lo
      , t = (this.lo >>> 28 | this.hi << 4) >>> 0
      , r = this.hi >>> 24;
    return 0 === r ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : r < 128 ? 9 : 10
}
,
function(e) {
    var t = minimal$1;
    function r(e, t, r) {
        for (var n = Object.keys(t), i = 0; i < n.length; ++i)
            void 0 !== e[n[i]] && r || (e[n[i]] = t[n[i]]);
        return e
    }
    function n(e) {
        function t(e, n) {
            if (!(this instanceof t))
                return new t(e,n);
            Object.defineProperty(this, "message", {
                get: function() {
                    return e
                }
            }),
            Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
                value: (new Error).stack || ""
            }),
            n && r(this, n)
        }
        return (t.prototype = Object.create(Error.prototype)).constructor = t,
        Object.defineProperty(t.prototype, "name", {
            get: function() {
                return e
            }
        }),
        t.prototype.toString = function() {
            return this.name + ": " + this.message
        }
        ,
        t
    }
    t.asPromise = aspromise,
    t.base64 = base64$1,
    t.EventEmitter = eventemitter,
    t.float = float,
    t.inquire = inquire_1,
    t.utf8 = utf8$2,
    t.pool = pool_1,
    t.LongBits = longbits,
    t.isNode = Boolean(void 0 !== commonjsGlobal && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node),
    t.global = t.isNode && commonjsGlobal || "undefined" != typeof window && window || "undefined" != typeof self && self || commonjsGlobal,
    t.emptyArray = Object.freeze ? Object.freeze([]) : [],
    t.emptyObject = Object.freeze ? Object.freeze({}) : {},
    t.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
    ,
    t.isString = function(e) {
        return "string" == typeof e || e instanceof String
    }
    ,
    t.isObject = function(e) {
        return e && "object" == typeof e
    }
    ,
    t.isset = t.isSet = function(e, t) {
        var r = e[t];
        return !(null == r || !e.hasOwnProperty(t)) && ("object" != typeof r || (Array.isArray(r) ? r.length : Object.keys(r).length) > 0)
    }
    ,
    t.Buffer = function() {
        try {
            var e = t.inquire("buffer").Buffer;
            return e.prototype.utf8Write ? e : null
        } catch (r) {
            return null
        }
    }(),
    t._Buffer_from = null,
    t._Buffer_allocUnsafe = null,
    t.newBuffer = function(e) {
        return "number" == typeof e ? t.Buffer ? t._Buffer_allocUnsafe(e) : new t.Array(e) : t.Buffer ? t._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e)
    }
    ,
    t.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array,
    t.Long = t.global.dcodeIO && t.global.dcodeIO.Long || t.global.Long || t.inquire("long"),
    t.key2Re = /^true|false|0|1$/,
    t.key32Re = /^-?(?:0|[1-9][0-9]*)$/,
    t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,
    t.longToHash = function(e) {
        return e ? t.LongBits.from(e).toHash() : t.LongBits.zeroHash
    }
    ,
    t.longFromHash = function(e, r) {
        var n = t.LongBits.fromHash(e);
        return t.Long ? t.Long.fromBits(n.lo, n.hi, r) : n.toNumber(Boolean(r))
    }
    ,
    t.merge = r,
    t.lcFirst = function(e) {
        return e.charAt(0).toLowerCase() + e.substring(1)
    }
    ,
    t.newError = n,
    t.ProtocolError = n("ProtocolError"),
    t.oneOfGetter = function(e) {
        for (var t = {}, r = 0; r < e.length; ++r)
            t[e[r]] = 1;
        return function() {
            for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
                if (1 === t[e[r]] && void 0 !== this[e[r]] && null !== this[e[r]])
                    return e[r]
        }
    }
    ,
    t.oneOfSetter = function(e) {
        return function(t) {
            for (var r = 0; r < e.length; ++r)
                e[r] !== t && delete this[e[r]]
        }
    }
    ,
    t.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
    },
    t._configure = function() {
        var e = t.Buffer;
        e ? (t._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, r) {
            return new e(t,r)
        }
        ,
        t._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
            return new e(t)
        }
        ) : t._Buffer_from = t._Buffer_allocUnsafe = null
    }
}();
var writer = Writer$1, util$6 = minimal$1, BufferWriter$1, LongBits$1 = util$6.LongBits, base64 = util$6.base64, utf8$1 = util$6.utf8;
function Op(e, t, r) {
    this.fn = e,
    this.len = t,
    this.next = void 0,
    this.val = r
}
function noop() {}
function State(e) {
    this.head = e.head,
    this.tail = e.tail,
    this.len = e.len,
    this.next = e.states
}
function Writer$1() {
    this.len = 0,
    this.head = new Op(noop,0,0),
    this.tail = this.head,
    this.states = null
}
var create$3 = function() {
    return util$6.Buffer ? function() {
        return (Writer$1.create = function() {
            return new BufferWriter$1
        }
        )()
    }
    : function() {
        return new Writer$1
    }
};
function writeByte(e, t, r) {
    t[r] = 255 & e
}
function writeVarint32(e, t, r) {
    for (; e > 127; )
        t[r++] = 127 & e | 128,
        e >>>= 7;
    t[r] = e
}
function VarintOp(e, t) {
    this.len = e,
    this.next = void 0,
    this.val = t
}
function writeVarint64(e, t, r) {
    for (; e.hi; )
        t[r++] = 127 & e.lo | 128,
        e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0,
        e.hi >>>= 7;
    for (; e.lo > 127; )
        t[r++] = 127 & e.lo | 128,
        e.lo = e.lo >>> 7;
    t[r++] = e.lo
}
function writeFixed32(e, t, r) {
    t[r] = 255 & e,
    t[r + 1] = e >>> 8 & 255,
    t[r + 2] = e >>> 16 & 255,
    t[r + 3] = e >>> 24
}
Writer$1.create = create$3(),
Writer$1.alloc = function(e) {
    return new util$6.Array(e)
}
,
util$6.Array !== Array && (Writer$1.alloc = util$6.pool(Writer$1.alloc, util$6.Array.prototype.subarray)),
Writer$1.prototype._push = function(e, t, r) {
    return this.tail = this.tail.next = new Op(e,t,r),
    this.len += t,
    this
}
,
VarintOp.prototype = Object.create(Op.prototype),
VarintOp.prototype.fn = writeVarint32,
Writer$1.prototype.uint32 = function(e) {
    return this.len += (this.tail = this.tail.next = new VarintOp((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5,e)).len,
    this
}
,
Writer$1.prototype.int32 = function(e) {
    return e < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(e)) : this.uint32(e)
}
,
Writer$1.prototype.sint32 = function(e) {
    return this.uint32((e << 1 ^ e >> 31) >>> 0)
}
,
Writer$1.prototype.uint64 = function(e) {
    var t = LongBits$1.from(e);
    return this._push(writeVarint64, t.length(), t)
}
,
Writer$1.prototype.int64 = Writer$1.prototype.uint64,
Writer$1.prototype.sint64 = function(e) {
    var t = LongBits$1.from(e).zzEncode();
    return this._push(writeVarint64, t.length(), t)
}
,
Writer$1.prototype.bool = function(e) {
    return this._push(writeByte, 1, e ? 1 : 0)
}
,
Writer$1.prototype.fixed32 = function(e) {
    return this._push(writeFixed32, 4, e >>> 0)
}
,
Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32,
Writer$1.prototype.fixed64 = function(e) {
    var t = LongBits$1.from(e);
    return this._push(writeFixed32, 4, t.lo)._push(writeFixed32, 4, t.hi)
}
,
Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64,
Writer$1.prototype.float = function(e) {
    return this._push(util$6.float.writeFloatLE, 4, e)
}
,
Writer$1.prototype.double = function(e) {
    return this._push(util$6.float.writeDoubleLE, 8, e)
}
;
var writeBytes = util$6.Array.prototype.set ? function(e, t, r) {
    t.set(e, r)
}
: function(e, t, r) {
    for (var n = 0; n < e.length; ++n)
        t[r + n] = e[n]
}
;
Writer$1.prototype.bytes = function(e) {
    var t = e.length >>> 0;
    if (!t)
        return this._push(writeByte, 1, 0);
    if (util$6.isString(e)) {
        var r = Writer$1.alloc(t = base64.length(e));
        base64.decode(e, r, 0),
        e = r
    }
    return this.uint32(t)._push(writeBytes, t, e)
}
,
Writer$1.prototype.string = function(e) {
    var t = utf8$1.length(e);
    return t ? this.uint32(t)._push(utf8$1.write, t, e) : this._push(writeByte, 1, 0)
}
,
Writer$1.prototype.fork = function() {
    return this.states = new State(this),
    this.head = this.tail = new Op(noop,0,0),
    this.len = 0,
    this
}
,
Writer$1.prototype.reset = function() {
    return this.states ? (this.head = this.states.head,
    this.tail = this.states.tail,
    this.len = this.states.len,
    this.states = this.states.next) : (this.head = this.tail = new Op(noop,0,0),
    this.len = 0),
    this
}
,
Writer$1.prototype.ldelim = function() {
    var e = this.head
      , t = this.tail
      , r = this.len;
    return this.reset().uint32(r),
    r && (this.tail.next = e.next,
    this.tail = t,
    this.len += r),
    this
}
,
Writer$1.prototype.finish = function() {
    for (var e = this.head.next, t = this.constructor.alloc(this.len), r = 0; e; )
        e.fn(e.val, t, r),
        r += e.len,
        e = e.next;
    return t
}
,
Writer$1._configure = function(e) {
    BufferWriter$1 = e,
    Writer$1.create = create$3(),
    BufferWriter$1._configure()
}
;
var writer_buffer = BufferWriter
  , Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util$5 = minimal$1;
function BufferWriter() {
    Writer.call(this)
}
function writeStringBuffer(e, t, r) {
    e.length < 40 ? util$5.utf8.write(e, t, r) : t.utf8Write ? t.utf8Write(e, r) : t.write(e, r)
}
BufferWriter._configure = function() {
    BufferWriter.alloc = util$5._Buffer_allocUnsafe,
    BufferWriter.writeBytesBuffer = util$5.Buffer && util$5.Buffer.prototype instanceof Uint8Array && "set" === util$5.Buffer.prototype.set.name ? function(e, t, r) {
        t.set(e, r)
    }
    : function(e, t, r) {
        if (e.copy)
            e.copy(t, r, 0, e.length);
        else
            for (var n = 0; n < e.length; )
                t[r++] = e[n++]
    }
}
,
BufferWriter.prototype.bytes = function(e) {
    util$5.isString(e) && (e = util$5._Buffer_from(e, "base64"));
    var t = e.length >>> 0;
    return this.uint32(t),
    t && this._push(BufferWriter.writeBytesBuffer, t, e),
    this
}
,
BufferWriter.prototype.string = function(e) {
    var t = util$5.Buffer.byteLength(e);
    return this.uint32(t),
    t && this._push(writeStringBuffer, t, e),
    this
}
,
BufferWriter._configure();
var reader = Reader$1, util$4 = minimal$1, BufferReader$1, LongBits = util$4.LongBits, utf8 = util$4.utf8;
function indexOutOfRange(e, t) {
    return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len)
}
function Reader$1(e) {
    this.buf = e,
    this.pos = 0,
    this.len = e.length
}
var create_array = "undefined" != typeof Uint8Array ? function(e) {
    if (e instanceof Uint8Array || Array.isArray(e))
        return new Reader$1(e);
    throw Error("illegal buffer")
}
: function(e) {
    if (Array.isArray(e))
        return new Reader$1(e);
    throw Error("illegal buffer")
}
, create$2 = function() {
    return util$4.Buffer ? function(e) {
        return (Reader$1.create = function(e) {
            return util$4.Buffer.isBuffer(e) ? new BufferReader$1(e) : create_array(e)
        }
        )(e)
    }
    : create_array
}, value;
function readLongVarint() {
    var e = new LongBits(0,0)
      , t = 0;
    if (!(this.len - this.pos > 4)) {
        for (; t < 3; ++t) {
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
            this.buf[this.pos++] < 128)
                return e
        }
        return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0,
        e
    }
    for (; t < 4; ++t)
        if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
        this.buf[this.pos++] < 128)
            return e;
    if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0,
    e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0,
    this.buf[this.pos++] < 128)
        return e;
    if (t = 0,
    this.len - this.pos > 4) {
        for (; t < 5; ++t)
            if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
            this.buf[this.pos++] < 128)
                return e
    } else
        for (; t < 5; ++t) {
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
            this.buf[this.pos++] < 128)
                return e
        }
    throw Error("invalid varint encoding")
}
function readFixed32_end(e, t) {
    return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
}
function readFixed64() {
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
    return new LongBits(readFixed32_end(this.buf, this.pos += 4),readFixed32_end(this.buf, this.pos += 4))
}
Reader$1.create = create$2(),
Reader$1.prototype._slice = util$4.Array.prototype.subarray || util$4.Array.prototype.slice,
Reader$1.prototype.uint32 = (value = 4294967295,
function() {
    if (value = (127 & this.buf[this.pos]) >>> 0,
    this.buf[this.pos++] < 128)
        return value;
    if (value = (value | (127 & this.buf[this.pos]) << 7) >>> 0,
    this.buf[this.pos++] < 128)
        return value;
    if (value = (value | (127 & this.buf[this.pos]) << 14) >>> 0,
    this.buf[this.pos++] < 128)
        return value;
    if (value = (value | (127 & this.buf[this.pos]) << 21) >>> 0,
    this.buf[this.pos++] < 128)
        return value;
    if (value = (value | (15 & this.buf[this.pos]) << 28) >>> 0,
    this.buf[this.pos++] < 128)
        return value;
    if ((this.pos += 5) > this.len)
        throw this.pos = this.len,
        indexOutOfRange(this, 10);
    return value
}
),
Reader$1.prototype.int32 = function() {
    return 0 | this.uint32()
}
,
Reader$1.prototype.sint32 = function() {
    var e = this.uint32();
    return e >>> 1 ^ -(1 & e) | 0
}
,
Reader$1.prototype.bool = function() {
    return 0 !== this.uint32()
}
,
Reader$1.prototype.fixed32 = function() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4)
}
,
Reader$1.prototype.sfixed32 = function() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    return 0 | readFixed32_end(this.buf, this.pos += 4)
}
,
Reader$1.prototype.float = function() {
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
    var e = util$4.float.readFloatLE(this.buf, this.pos);
    return this.pos += 4,
    e
}
,
Reader$1.prototype.double = function() {
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
    var e = util$4.float.readDoubleLE(this.buf, this.pos);
    return this.pos += 8,
    e
}
,
Reader$1.prototype.bytes = function() {
    var e = this.uint32()
      , t = this.pos
      , r = this.pos + e;
    if (r > this.len)
        throw indexOutOfRange(this, e);
    return this.pos += e,
    Array.isArray(this.buf) ? this.buf.slice(t, r) : t === r ? new this.buf.constructor(0) : this._slice.call(this.buf, t, r)
}
,
Reader$1.prototype.string = function() {
    var e = this.bytes();
    return utf8.read(e, 0, e.length)
}
,
Reader$1.prototype.skip = function(e) {
    if ("number" == typeof e) {
        if (this.pos + e > this.len)
            throw indexOutOfRange(this, e);
        this.pos += e
    } else
        do {
            if (this.pos >= this.len)
                throw indexOutOfRange(this)
        } while (128 & this.buf[this.pos++]);
    return this
}
,
Reader$1.prototype.skipType = function(e) {
    switch (e) {
    case 0:
        this.skip();
        break;
    case 1:
        this.skip(8);
        break;
    case 2:
        this.skip(this.uint32());
        break;
    case 3:
        for (; 4 != (e = 7 & this.uint32()); )
            this.skipType(e);
        break;
    case 5:
        this.skip(4);
        break;
    default:
        throw Error("invalid wire type " + e + " at offset " + this.pos)
    }
    return this
}
,
Reader$1._configure = function(e) {
    BufferReader$1 = e,
    Reader$1.create = create$2(),
    BufferReader$1._configure();
    var t = util$4.Long ? "toLong" : "toNumber";
    util$4.merge(Reader$1.prototype, {
        int64: function() {
            return readLongVarint.call(this)[t](!1)
        },
        uint64: function() {
            return readLongVarint.call(this)[t](!0)
        },
        sint64: function() {
            return readLongVarint.call(this).zzDecode()[t](!1)
        },
        fixed64: function() {
            return readFixed64.call(this)[t](!0)
        },
        sfixed64: function() {
            return readFixed64.call(this)[t](!1)
        }
    })
}
;
var reader_buffer = BufferReader
  , Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util$3 = minimal$1;
function BufferReader(e) {
    Reader.call(this, e)
}
BufferReader._configure = function() {
    util$3.Buffer && (BufferReader.prototype._slice = util$3.Buffer.prototype.slice)
}
,
BufferReader.prototype.string = function() {
    var e = this.uint32();
    return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len))
}
,
BufferReader._configure();
var rpc = {}
  , service = Service
  , util$2 = minimal$1;
function Service(e, t, r) {
    if ("function" != typeof e)
        throw TypeError("rpcImpl must be a function");
    util$2.EventEmitter.call(this),
    this.rpcImpl = e,
    this.requestDelimited = Boolean(t),
    this.responseDelimited = Boolean(r)
}
(Service.prototype = Object.create(util$2.EventEmitter.prototype)).constructor = Service,
Service.prototype.rpcCall = function e(t, r, n, i, o) {
    if (!i)
        throw TypeError("request must be specified");
    var s = this;
    if (!o)
        return util$2.asPromise(e, s, t, r, n, i);
    if (s.rpcImpl)
        try {
            return s.rpcImpl(t, r[s.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), (function(e, r) {
                if (e)
                    return s.emit("error", e, t),
                    o(e);
                if (null !== r) {
                    if (!(r instanceof n))
                        try {
                            r = n[s.responseDelimited ? "decodeDelimited" : "decode"](r)
                        } catch (i) {
                            return s.emit("error", i, t),
                            o(i)
                        }
                    return s.emit("data", r, t),
                    o(null, r)
                }
                s.end(!0)
            }
            ))
        } catch (a) {
            return s.emit("error", a, t),
            void setTimeout((function() {
                o(a)
            }
            ), 0)
        }
    else
        setTimeout((function() {
            o(Error("already ended"))
        }
        ), 0)
}
,
Service.prototype.end = function(e) {
    return this.rpcImpl && (e || this.rpcImpl(null, null, null),
    this.rpcImpl = null,
    this.emit("end").off()),
    this
}
,
rpc.Service = service;
var roots = {};
!function(e) {
    var t = indexMinimal;
    function r() {
        t.util._configure(),
        t.Writer._configure(t.BufferWriter),
        t.Reader._configure(t.BufferReader)
    }
    t.build = "minimal",
    t.Writer = writer,
    t.BufferWriter = writer_buffer,
    t.Reader = reader,
    t.BufferReader = reader_buffer,
    t.util = minimal$1,
    t.rpc = rpc,
    t.roots = roots,
    t.configure = r,
    r()
}();
var minimal = indexMinimal
  , $protobuf = minimal
  , $Reader = $protobuf.Reader
  , $Writer = $protobuf.Writer
  , $util = $protobuf.util
  , $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});
$root.Data = function() {
    function e(e) {
        if (this.blocksizes = [],
        e)
            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                null != e[t[r]] && (this[t[r]] = e[t[r]])
    }
    var t, r;
    return e.prototype.Type = 0,
    e.prototype.Data = $util.newBuffer([]),
    e.prototype.filesize = $util.Long ? $util.Long.fromBits(0, 0, !0) : 0,
    e.prototype.blocksizes = $util.emptyArray,
    e.prototype.hashType = $util.Long ? $util.Long.fromBits(0, 0, !0) : 0,
    e.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, !0) : 0,
    e.prototype.mode = 0,
    e.prototype.mtime = null,
    e.encode = function(e, t) {
        if (t || (t = $Writer.create()),
        t.uint32(8).int32(e.Type),
        null != e.Data && Object.hasOwnProperty.call(e, "Data") && t.uint32(18).bytes(e.Data),
        null != e.filesize && Object.hasOwnProperty.call(e, "filesize") && t.uint32(24).uint64(e.filesize),
        null != e.blocksizes && e.blocksizes.length)
            for (var r = 0; r < e.blocksizes.length; ++r)
                t.uint32(32).uint64(e.blocksizes[r]);
        return null != e.hashType && Object.hasOwnProperty.call(e, "hashType") && t.uint32(40).uint64(e.hashType),
        null != e.fanout && Object.hasOwnProperty.call(e, "fanout") && t.uint32(48).uint64(e.fanout),
        null != e.mode && Object.hasOwnProperty.call(e, "mode") && t.uint32(56).uint32(e.mode),
        null != e.mtime && Object.hasOwnProperty.call(e, "mtime") && $root.UnixTime.encode(e.mtime, t.uint32(66).fork()).ldelim(),
        t
    }
    ,
    e.decode = function(e, t) {
        e instanceof $Reader || (e = $Reader.create(e));
        for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.Data; e.pos < r; ) {
            var i = e.uint32();
            switch (i >>> 3) {
            case 1:
                n.Type = e.int32();
                break;
            case 2:
                n.Data = e.bytes();
                break;
            case 3:
                n.filesize = e.uint64();
                break;
            case 4:
                if (n.blocksizes && n.blocksizes.length || (n.blocksizes = []),
                2 == (7 & i))
                    for (var o = e.uint32() + e.pos; e.pos < o; )
                        n.blocksizes.push(e.uint64());
                else
                    n.blocksizes.push(e.uint64());
                break;
            case 5:
                n.hashType = e.uint64();
                break;
            case 6:
                n.fanout = e.uint64();
                break;
            case 7:
                n.mode = e.uint32();
                break;
            case 8:
                n.mtime = $root.UnixTime.decode(e, e.uint32());
                break;
            default:
                e.skipType(7 & i)
            }
        }
        if (!n.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", {
                instance: n
            });
        return n
    }
    ,
    e.fromObject = function(e) {
        if (e instanceof $root.Data)
            return e;
        var t = new $root.Data;
        switch (e.Type) {
        case "Raw":
        case 0:
            t.Type = 0;
            break;
        case "Directory":
        case 1:
            t.Type = 1;
            break;
        case "File":
        case 2:
            t.Type = 2;
            break;
        case "Metadata":
        case 3:
            t.Type = 3;
            break;
        case "Symlink":
        case 4:
            t.Type = 4;
            break;
        case "HAMTShard":
        case 5:
            t.Type = 5
        }
        if (null != e.Data && ("string" == typeof e.Data ? $util.base64.decode(e.Data, t.Data = $util.newBuffer($util.base64.length(e.Data)), 0) : e.Data.length && (t.Data = e.Data)),
        null != e.filesize && ($util.Long ? (t.filesize = $util.Long.fromValue(e.filesize)).unsigned = !0 : "string" == typeof e.filesize ? t.filesize = parseInt(e.filesize, 10) : "number" == typeof e.filesize ? t.filesize = e.filesize : "object" == typeof e.filesize && (t.filesize = new $util.LongBits(e.filesize.low >>> 0,e.filesize.high >>> 0).toNumber(!0))),
        e.blocksizes) {
            if (!Array.isArray(e.blocksizes))
                throw TypeError(".Data.blocksizes: array expected");
            t.blocksizes = [];
            for (var r = 0; r < e.blocksizes.length; ++r)
                $util.Long ? (t.blocksizes[r] = $util.Long.fromValue(e.blocksizes[r])).unsigned = !0 : "string" == typeof e.blocksizes[r] ? t.blocksizes[r] = parseInt(e.blocksizes[r], 10) : "number" == typeof e.blocksizes[r] ? t.blocksizes[r] = e.blocksizes[r] : "object" == typeof e.blocksizes[r] && (t.blocksizes[r] = new $util.LongBits(e.blocksizes[r].low >>> 0,e.blocksizes[r].high >>> 0).toNumber(!0))
        }
        if (null != e.hashType && ($util.Long ? (t.hashType = $util.Long.fromValue(e.hashType)).unsigned = !0 : "string" == typeof e.hashType ? t.hashType = parseInt(e.hashType, 10) : "number" == typeof e.hashType ? t.hashType = e.hashType : "object" == typeof e.hashType && (t.hashType = new $util.LongBits(e.hashType.low >>> 0,e.hashType.high >>> 0).toNumber(!0))),
        null != e.fanout && ($util.Long ? (t.fanout = $util.Long.fromValue(e.fanout)).unsigned = !0 : "string" == typeof e.fanout ? t.fanout = parseInt(e.fanout, 10) : "number" == typeof e.fanout ? t.fanout = e.fanout : "object" == typeof e.fanout && (t.fanout = new $util.LongBits(e.fanout.low >>> 0,e.fanout.high >>> 0).toNumber(!0))),
        null != e.mode && (t.mode = e.mode >>> 0),
        null != e.mtime) {
            if ("object" != typeof e.mtime)
                throw TypeError(".Data.mtime: object expected");
            t.mtime = $root.UnixTime.fromObject(e.mtime)
        }
        return t
    }
    ,
    e.toObject = function(e, t) {
        t || (t = {});
        var r = {};
        if ((t.arrays || t.defaults) && (r.blocksizes = []),
        t.defaults) {
            if (r.Type = t.enums === String ? "Raw" : 0,
            t.bytes === String ? r.Data = "" : (r.Data = [],
            t.bytes !== Array && (r.Data = $util.newBuffer(r.Data))),
            $util.Long) {
                var n = new $util.Long(0,0,!0);
                r.filesize = t.longs === String ? n.toString() : t.longs === Number ? n.toNumber() : n
            } else
                r.filesize = t.longs === String ? "0" : 0;
            if ($util.Long) {
                n = new $util.Long(0,0,!0);
                r.hashType = t.longs === String ? n.toString() : t.longs === Number ? n.toNumber() : n
            } else
                r.hashType = t.longs === String ? "0" : 0;
            if ($util.Long) {
                n = new $util.Long(0,0,!0);
                r.fanout = t.longs === String ? n.toString() : t.longs === Number ? n.toNumber() : n
            } else
                r.fanout = t.longs === String ? "0" : 0;
            r.mode = 0,
            r.mtime = null
        }
        if (null != e.Type && e.hasOwnProperty("Type") && (r.Type = t.enums === String ? $root.Data.DataType[e.Type] : e.Type),
        null != e.Data && e.hasOwnProperty("Data") && (r.Data = t.bytes === String ? $util.base64.encode(e.Data, 0, e.Data.length) : t.bytes === Array ? Array.prototype.slice.call(e.Data) : e.Data),
        null != e.filesize && e.hasOwnProperty("filesize") && ("number" == typeof e.filesize ? r.filesize = t.longs === String ? String(e.filesize) : e.filesize : r.filesize = t.longs === String ? $util.Long.prototype.toString.call(e.filesize) : t.longs === Number ? new $util.LongBits(e.filesize.low >>> 0,e.filesize.high >>> 0).toNumber(!0) : e.filesize),
        e.blocksizes && e.blocksizes.length) {
            r.blocksizes = [];
            for (var i = 0; i < e.blocksizes.length; ++i)
                "number" == typeof e.blocksizes[i] ? r.blocksizes[i] = t.longs === String ? String(e.blocksizes[i]) : e.blocksizes[i] : r.blocksizes[i] = t.longs === String ? $util.Long.prototype.toString.call(e.blocksizes[i]) : t.longs === Number ? new $util.LongBits(e.blocksizes[i].low >>> 0,e.blocksizes[i].high >>> 0).toNumber(!0) : e.blocksizes[i]
        }
        return null != e.hashType && e.hasOwnProperty("hashType") && ("number" == typeof e.hashType ? r.hashType = t.longs === String ? String(e.hashType) : e.hashType : r.hashType = t.longs === String ? $util.Long.prototype.toString.call(e.hashType) : t.longs === Number ? new $util.LongBits(e.hashType.low >>> 0,e.hashType.high >>> 0).toNumber(!0) : e.hashType),
        null != e.fanout && e.hasOwnProperty("fanout") && ("number" == typeof e.fanout ? r.fanout = t.longs === String ? String(e.fanout) : e.fanout : r.fanout = t.longs === String ? $util.Long.prototype.toString.call(e.fanout) : t.longs === Number ? new $util.LongBits(e.fanout.low >>> 0,e.fanout.high >>> 0).toNumber(!0) : e.fanout),
        null != e.mode && e.hasOwnProperty("mode") && (r.mode = e.mode),
        null != e.mtime && e.hasOwnProperty("mtime") && (r.mtime = $root.UnixTime.toObject(e.mtime, t)),
        r
    }
    ,
    e.prototype.toJSON = function() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }
    ,
    e.DataType = (t = {},
    (r = Object.create(t))[t[0] = "Raw"] = 0,
    r[t[1] = "Directory"] = 1,
    r[t[2] = "File"] = 2,
    r[t[3] = "Metadata"] = 3,
    r[t[4] = "Symlink"] = 4,
    r[t[5] = "HAMTShard"] = 5,
    r),
    e
}(),
$root.UnixTime = function() {
    function e(e) {
        if (e)
            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                null != e[t[r]] && (this[t[r]] = e[t[r]])
    }
    return e.prototype.Seconds = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
    e.prototype.FractionalNanoseconds = 0,
    e.encode = function(e, t) {
        return t || (t = $Writer.create()),
        t.uint32(8).int64(e.Seconds),
        null != e.FractionalNanoseconds && Object.hasOwnProperty.call(e, "FractionalNanoseconds") && t.uint32(21).fixed32(e.FractionalNanoseconds),
        t
    }
    ,
    e.decode = function(e, t) {
        e instanceof $Reader || (e = $Reader.create(e));
        for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.UnixTime; e.pos < r; ) {
            var i = e.uint32();
            switch (i >>> 3) {
            case 1:
                n.Seconds = e.int64();
                break;
            case 2:
                n.FractionalNanoseconds = e.fixed32();
                break;
            default:
                e.skipType(7 & i)
            }
        }
        if (!n.hasOwnProperty("Seconds"))
            throw $util.ProtocolError("missing required 'Seconds'", {
                instance: n
            });
        return n
    }
    ,
    e.fromObject = function(e) {
        if (e instanceof $root.UnixTime)
            return e;
        var t = new $root.UnixTime;
        return null != e.Seconds && ($util.Long ? (t.Seconds = $util.Long.fromValue(e.Seconds)).unsigned = !1 : "string" == typeof e.Seconds ? t.Seconds = parseInt(e.Seconds, 10) : "number" == typeof e.Seconds ? t.Seconds = e.Seconds : "object" == typeof e.Seconds && (t.Seconds = new $util.LongBits(e.Seconds.low >>> 0,e.Seconds.high >>> 0).toNumber())),
        null != e.FractionalNanoseconds && (t.FractionalNanoseconds = e.FractionalNanoseconds >>> 0),
        t
    }
    ,
    e.toObject = function(e, t) {
        t || (t = {});
        var r = {};
        if (t.defaults) {
            if ($util.Long) {
                var n = new $util.Long(0,0,!1);
                r.Seconds = t.longs === String ? n.toString() : t.longs === Number ? n.toNumber() : n
            } else
                r.Seconds = t.longs === String ? "0" : 0;
            r.FractionalNanoseconds = 0
        }
        return null != e.Seconds && e.hasOwnProperty("Seconds") && ("number" == typeof e.Seconds ? r.Seconds = t.longs === String ? String(e.Seconds) : e.Seconds : r.Seconds = t.longs === String ? $util.Long.prototype.toString.call(e.Seconds) : t.longs === Number ? new $util.LongBits(e.Seconds.low >>> 0,e.Seconds.high >>> 0).toNumber() : e.Seconds),
        null != e.FractionalNanoseconds && e.hasOwnProperty("FractionalNanoseconds") && (r.FractionalNanoseconds = e.FractionalNanoseconds),
        r
    }
    ,
    e.prototype.toJSON = function() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }
    ,
    e
}(),
$root.Metadata = function() {
    function e(e) {
        if (e)
            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                null != e[t[r]] && (this[t[r]] = e[t[r]])
    }
    return e.prototype.MimeType = "",
    e.encode = function(e, t) {
        return t || (t = $Writer.create()),
        null != e.MimeType && Object.hasOwnProperty.call(e, "MimeType") && t.uint32(10).string(e.MimeType),
        t
    }
    ,
    e.decode = function(e, t) {
        e instanceof $Reader || (e = $Reader.create(e));
        for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.Metadata; e.pos < r; ) {
            var i = e.uint32();
            switch (i >>> 3) {
            case 1:
                n.MimeType = e.string();
                break;
            default:
                e.skipType(7 & i)
            }
        }
        return n
    }
    ,
    e.fromObject = function(e) {
        if (e instanceof $root.Metadata)
            return e;
        var t = new $root.Metadata;
        return null != e.MimeType && (t.MimeType = String(e.MimeType)),
        t
    }
    ,
    e.toObject = function(e, t) {
        t || (t = {});
        var r = {};
        return t.defaults && (r.MimeType = ""),
        null != e.MimeType && e.hasOwnProperty("MimeType") && (r.MimeType = e.MimeType),
        r
    }
    ,
    e.prototype.toJSON = function() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }
    ,
    e
}();
var unixfs = $root;
const {Data: PBData} = unixfs
  , errcode$1 = errCode$3
  , types = ["raw", "directory", "file", "metadata", "symlink", "hamt-sharded-directory"]
  , dirTypes = ["directory", "hamt-sharded-directory"]
  , DEFAULT_FILE_MODE = parseInt("0644", 8)
  , DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
function parseMode(e) {
    if (null != e)
        return "number" == typeof e ? 4095 & e : "0" === (e = e.toString()).substring(0, 1) ? 4095 & parseInt(e, 8) : 4095 & parseInt(e, 10)
}
function parseMtime(e) {
    if (null == e)
        return;
    let t;
    if (null != e.secs && (t = {
        secs: e.secs,
        nsecs: e.nsecs
    }),
    null != e.Seconds && (t = {
        secs: e.Seconds,
        nsecs: e.FractionalNanoseconds
    }),
    Array.isArray(e) && (t = {
        secs: e[0],
        nsecs: e[1]
    }),
    e instanceof Date) {
        const r = e.getTime()
          , n = Math.floor(r / 1e3);
        t = {
            secs: n,
            nsecs: 1e3 * (r - 1e3 * n)
        }
    }
    if (Object.prototype.hasOwnProperty.call(t, "secs")) {
        if (null != t && null != t.nsecs && (t.nsecs < 0 || t.nsecs > 999999999))
            throw errcode$1(new Error("mtime-nsecs must be within the range [0,999999999]"), "ERR_INVALID_MTIME_NSECS");
        return t
    }
}
class Data {
    static unmarshal(e) {
        const t = PBData.decode(e)
          , r = PBData.toObject(t, {
            defaults: !1,
            arrays: !0,
            longs: Number,
            objects: !1
        })
          , n = new Data({
            type: types[r.Type],
            data: r.Data,
            blockSizes: r.blocksizes,
            mode: r.mode,
            mtime: r.mtime ? {
                secs: r.mtime.Seconds,
                nsecs: r.mtime.FractionalNanoseconds
            } : void 0
        });
        return n._originalMode = r.mode || 0,
        n
    }
    constructor(e={
        type: "file"
    }) {
        const {type: t, data: r, blockSizes: n, hashType: i, fanout: o, mtime: s, mode: a} = e;
        if (t && !types.includes(t))
            throw errcode$1(new Error("Type: " + t + " is not valid"), "ERR_INVALID_TYPE");
        this.type = t || "file",
        this.data = r,
        this.hashType = i,
        this.fanout = o,
        this.blockSizes = n || [],
        this._originalMode = 0,
        this.mode = parseMode(a),
        s && (this.mtime = parseMtime(s),
        this.mtime && !this.mtime.nsecs && (this.mtime.nsecs = 0))
    }
    set mode(e) {
        this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE;
        const t = parseMode(e);
        void 0 !== t && (this._mode = t)
    }
    get mode() {
        return this._mode
    }
    isDirectory() {
        return Boolean(this.type && dirTypes.includes(this.type))
    }
    addBlockSize(e) {
        this.blockSizes.push(e)
    }
    removeBlockSize(e) {
        this.blockSizes.splice(e, 1)
    }
    fileSize() {
        if (this.isDirectory())
            return 0;
        let e = 0;
        return this.blockSizes.forEach((t=>{
            e += t
        }
        )),
        this.data && (e += this.data.length),
        e
    }
    marshal() {
        let e;
        switch (this.type) {
        case "raw":
            e = PBData.DataType.Raw;
            break;
        case "directory":
            e = PBData.DataType.Directory;
            break;
        case "file":
            e = PBData.DataType.File;
            break;
        case "metadata":
            e = PBData.DataType.Metadata;
            break;
        case "symlink":
            e = PBData.DataType.Symlink;
            break;
        case "hamt-sharded-directory":
            e = PBData.DataType.HAMTShard;
            break;
        default:
            throw errcode$1(new Error("Type: " + e + " is not valid"), "ERR_INVALID_TYPE")
        }
        let t, r, n = this.data;
        if (this.data && this.data.length || (n = void 0),
        null != this.mode && (t = 4294963200 & this._originalMode | (parseMode(this.mode) || 0),
        t !== DEFAULT_FILE_MODE || this.isDirectory() || (t = void 0),
        t === DEFAULT_DIRECTORY_MODE && this.isDirectory() && (t = void 0)),
        null != this.mtime) {
            const e = parseMtime(this.mtime);
            e && (r = {
                Seconds: e.secs,
                FractionalNanoseconds: e.nsecs
            },
            0 === r.FractionalNanoseconds && delete r.FractionalNanoseconds)
        }
        const i = {
            Type: e,
            Data: n,
            filesize: this.isDirectory() ? void 0 : this.fileSize(),
            blocksizes: this.blockSizes,
            hashType: this.hashType,
            fanout: this.fanout,
            mode: t,
            mtime: r
        };
        return PBData.encode(i).finish()
    }
}
var src$5 = {
    UnixFS: Data,
    parseMode: parseMode,
    parseMtime: parseMtime
}
  , encode_1 = encode$7
  , MSB$1 = 128
  , REST$1 = 127
  , MSBALL = ~REST$1
  , INT = Math.pow(2, 31);
function encode$7(e, t, r) {
    t = t || [];
    for (var n = r = r || 0; e >= INT; )
        t[r++] = 255 & e | MSB$1,
        e /= 128;
    for (; e & MSBALL; )
        t[r++] = 255 & e | MSB$1,
        e >>>= 7;
    return t[r] = 0 | e,
    encode$7.bytes = r - n + 1,
    t
}
var decode$2 = read
  , MSB = 128
  , REST = 127;
function read(e, t) {
    var r, n = 0, i = 0, o = t = t || 0, s = e.length;
    do {
        if (o >= s)
            throw read.bytes = 0,
            new RangeError("Could not decode varint");
        r = e[o++],
        n += i < 28 ? (r & REST) << i : (r & REST) * Math.pow(2, i),
        i += 7
    } while (r >= MSB);
    return read.bytes = o - t,
    n
}
var N1 = Math.pow(2, 7)
  , N2 = Math.pow(2, 14)
  , N3 = Math.pow(2, 21)
  , N4 = Math.pow(2, 28)
  , N5 = Math.pow(2, 35)
  , N6 = Math.pow(2, 42)
  , N7 = Math.pow(2, 49)
  , N8 = Math.pow(2, 56)
  , N9 = Math.pow(2, 63)
  , length = function(e) {
    return e < N1 ? 1 : e < N2 ? 2 : e < N3 ? 3 : e < N4 ? 4 : e < N5 ? 5 : e < N6 ? 6 : e < N7 ? 7 : e < N8 ? 8 : e < N9 ? 9 : 10
}
  , varint$2 = {
    encode: encode_1,
    decode: decode$2,
    encodingLength: length
};
const varint$1 = varint$2
  , uint8ArrayToString = toString_1
  , uint8ArrayFromString$2 = fromString_1;
var util$1 = {
    numberToUint8Array: numberToUint8Array,
    uint8ArrayToNumber: uint8ArrayToNumber,
    varintUint8ArrayEncode: varintUint8ArrayEncode,
    varintEncode: varintEncode$1
};
function uint8ArrayToNumber(e) {
    return parseInt(uint8ArrayToString(e, "base16"), 16)
}
function numberToUint8Array(e) {
    let t = e.toString(16);
    return t.length % 2 == 1 && (t = "0" + t),
    uint8ArrayFromString$2(t, "base16")
}
function varintUint8ArrayEncode(e) {
    return Uint8Array.from(varint$1.encode(uint8ArrayToNumber(e)))
}
function varintEncode$1(e) {
    return Uint8Array.from(varint$1.encode(e))
}
const baseTable$1 = Object.freeze({
    identity: 0,
    cidv1: 1,
    cidv2: 2,
    cidv3: 3,
    ip4: 4,
    tcp: 6,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    dccp: 33,
    "murmur3-128": 34,
    "murmur3-32": 35,
    ip6: 41,
    ip6zone: 42,
    path: 47,
    multicodec: 48,
    multihash: 49,
    multiaddr: 50,
    multibase: 51,
    dns: 53,
    dns4: 54,
    dns6: 55,
    dnsaddr: 56,
    protobuf: 80,
    cbor: 81,
    raw: 85,
    "dbl-sha2-256": 86,
    rlp: 96,
    bencode: 99,
    "dag-pb": 112,
    "dag-cbor": 113,
    "libp2p-key": 114,
    "git-raw": 120,
    "torrent-info": 123,
    "torrent-file": 124,
    "leofcoin-block": 129,
    "leofcoin-tx": 130,
    "leofcoin-pr": 131,
    sctp: 132,
    "dag-jose": 133,
    "dag-cose": 134,
    "eth-block": 144,
    "eth-block-list": 145,
    "eth-tx-trie": 146,
    "eth-tx": 147,
    "eth-tx-receipt-trie": 148,
    "eth-tx-receipt": 149,
    "eth-state-trie": 150,
    "eth-account-snapshot": 151,
    "eth-storage-trie": 152,
    "bitcoin-block": 176,
    "bitcoin-tx": 177,
    "bitcoin-witness-commitment": 178,
    "zcash-block": 192,
    "zcash-tx": 193,
    docid: 206,
    "stellar-block": 208,
    "stellar-tx": 209,
    md4: 212,
    md5: 213,
    bmt: 214,
    "decred-block": 224,
    "decred-tx": 225,
    "ipld-ns": 226,
    "ipfs-ns": 227,
    "swarm-ns": 228,
    "ipns-ns": 229,
    zeronet: 230,
    "secp256k1-pub": 231,
    "bls12_381-g1-pub": 234,
    "bls12_381-g2-pub": 235,
    "x25519-pub": 236,
    "ed25519-pub": 237,
    "bls12_381-g1g2-pub": 238,
    "dash-block": 240,
    "dash-tx": 241,
    "swarm-manifest": 250,
    "swarm-feed": 251,
    udp: 273,
    "p2p-webrtc-star": 275,
    "p2p-webrtc-direct": 276,
    "p2p-stardust": 277,
    "p2p-circuit": 290,
    "dag-json": 297,
    udt: 301,
    utp: 302,
    unix: 400,
    thread: 406,
    p2p: 421,
    ipfs: 421,
    https: 443,
    onion: 444,
    onion3: 445,
    garlic64: 446,
    garlic32: 447,
    tls: 448,
    quic: 460,
    ws: 477,
    wss: 478,
    "p2p-websocket-star": 479,
    http: 480,
    json: 512,
    messagepack: 513,
    "libp2p-peer-record": 769,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    "p256-pub": 4608,
    "p384-pub": 4609,
    "p521-pub": 4610,
    "ed448-pub": 4611,
    "x448-pub": 4612,
    "ed25519-priv": 4864,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082,
    "zeroxcert-imprint-256": 52753,
    "fil-commitment-unsealed": 61697,
    "fil-commitment-sealed": 61698,
    "holochain-adr-v0": 8417572,
    "holochain-adr-v1": 8483108,
    "holochain-key-v0": 9728292,
    "holochain-key-v1": 9793828,
    "holochain-sig-v0": 10645796,
    "holochain-sig-v1": 10711332,
    "skynet-ns": 11639056
});
var generatedTable = {
    baseTable: baseTable$1
};
const {baseTable: baseTable} = generatedTable
  , varintEncode = util$1.varintEncode
  , nameToVarint$1 = {}
  , constantToCode$1 = {}
  , codeToName$1 = {};
for (const h in baseTable) {
    const e = h
      , t = baseTable[e];
    nameToVarint$1[e] = varintEncode(t);
    const r = e.toUpperCase().replace(/-/g, "_");
    constantToCode$1[r] = t,
    codeToName$1[t] || (codeToName$1[t] = e)
}
Object.freeze(nameToVarint$1),
Object.freeze(constantToCode$1),
Object.freeze(codeToName$1);
const nameToCode$1 = Object.freeze(baseTable);
var maps = {
    nameToVarint: nameToVarint$1,
    constantToCode: constantToCode$1,
    nameToCode: nameToCode$1,
    codeToName: codeToName$1
};
const varint = varint$2
  , uint8ArrayConcat$1 = concat_1
  , util = util$1
  , {nameToVarint: nameToVarint, constantToCode: constantToCode, nameToCode: nameToCode, codeToName: codeToName} = maps;
function addPrefix(e, t) {
    let r;
    if (e instanceof Uint8Array)
        r = util.varintUint8ArrayEncode(e);
    else {
        if (!nameToVarint[e])
            throw new Error("multicodec not recognized");
        r = nameToVarint[e]
    }
    return uint8ArrayConcat$1([r, t], r.length + t.length)
}
function rmPrefix(e) {
    return varint.decode(e),
    e.slice(varint.decode.bytes)
}
function getNameFromData(e) {
    const t = varint.decode(e)
      , r = codeToName[t];
    if (void 0 === r)
        throw new Error(`Code "${t}" not found`);
    return r
}
function getNameFromCode(e) {
    return codeToName[e]
}
function getCodeFromName(e) {
    const t = nameToCode[e];
    if (void 0 === t)
        throw new Error(`Codec "${e}" not found`);
    return t
}
function getCodeFromData(e) {
    return varint.decode(e)
}
function getVarintFromName(e) {
    const t = nameToVarint[e];
    if (void 0 === t)
        throw new Error(`Codec "${e}" not found`);
    return t
}
function getVarintFromCode(e) {
    return util.varintEncode(e)
}
function getCodec(e) {
    return getNameFromData(e)
}
function getName(e) {
    return getNameFromCode(e)
}
function getNumber(e) {
    return getCodeFromName(e)
}
function getCode(e) {
    return getCodeFromData(e)
}
function getCodeVarint(e) {
    return getVarintFromName(e)
}
function getVarint(e) {
    return Array.from(getVarintFromCode(e))
}
var src$4 = __spreadProps(__spreadValues({
    addPrefix: addPrefix,
    rmPrefix: rmPrefix,
    getNameFromData: getNameFromData,
    getNameFromCode: getNameFromCode,
    getCodeFromName: getCodeFromName,
    getCodeFromData: getCodeFromData,
    getVarintFromName: getVarintFromName,
    getVarintFromCode: getVarintFromCode,
    getCodec: getCodec,
    getName: getName,
    getNumber: getNumber,
    getCode: getCode,
    getCodeVarint: getCodeVarint,
    getVarint: getVarint
}, constantToCode), {
    nameToVarint: nameToVarint,
    nameToCode: nameToCode,
    codeToName: codeToName
})
  , require$$1 = getAugmentedNamespace(cid);
const mc$2 = src$4
  , {CID: CID} = require$$1
  , persist$5 = async(e,t,r)=>{
    if (!r.hasher)
        throw new Error("Hasher must be specified.");
    r.codec || (r.codec = mc$2.DAG_PB),
    void 0 === r.cidVersion && (r.cidVersion = 1);
    const n = await r.hasher.digest(e)
      , i = CID.create(r.cidVersion, r.codec, n);
    return r.onlyHash || await t.put({
        bytes: e,
        cid: i
    }, {
        pin: r.pin,
        preload: r.preload,
        timeout: r.timeout
    }),
    i
}
;
var persist_1 = persist$5;
const textDecoder = new TextDecoder;
function decodeVarint(e, t) {
    let r = 0;
    for (let n = 0; ; n += 7) {
        if (n >= 64)
            throw new Error("protobuf: varint overflow");
        if (t >= e.length)
            throw new Error("protobuf: unexpected end of data");
        const i = e[t++];
        if (r += n < 28 ? (127 & i) << n : (127 & i) * 2 ** n,
        i < 128)
            break
    }
    return [r, t]
}
function decodeBytes(e, t) {
    let r;
    [r,t] = decodeVarint(e, t);
    const n = t + r;
    if (r < 0 || n < 0)
        throw new Error("protobuf: invalid length");
    if (n > e.length)
        throw new Error("protobuf: unexpected end of data");
    return [e.subarray(t, n), n]
}
function decodeKey(e, t) {
    let r;
    return [r,t] = decodeVarint(e, t),
    [7 & r, r >> 3, t]
}
function decodeLink(e) {
    const t = {}
      , r = e.length;
    let n = 0;
    for (; n < r; ) {
        let r, i;
        if ([r,i,n] = decodeKey(e, n),
        1 === i) {
            if (t.Hash)
                throw new Error("protobuf: (PBLink) duplicate Hash section");
            if (2 !== r)
                throw new Error(`protobuf: (PBLink) wrong wireType (${r}) for Hash`);
            if (void 0 !== t.Name)
                throw new Error("protobuf: (PBLink) invalid order, found Name before Hash");
            if (void 0 !== t.Tsize)
                throw new Error("protobuf: (PBLink) invalid order, found Tsize before Hash");
            [t.Hash,n] = decodeBytes(e, n)
        } else if (2 === i) {
            if (void 0 !== t.Name)
                throw new Error("protobuf: (PBLink) duplicate Name section");
            if (2 !== r)
                throw new Error(`protobuf: (PBLink) wrong wireType (${r}) for Name`);
            if (void 0 !== t.Tsize)
                throw new Error("protobuf: (PBLink) invalid order, found Tsize before Name");
            let i;
            [i,n] = decodeBytes(e, n),
            t.Name = textDecoder.decode(i)
        } else {
            if (3 !== i)
                throw new Error(`protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${i}`);
            if (void 0 !== t.Tsize)
                throw new Error("protobuf: (PBLink) duplicate Tsize section");
            if (0 !== r)
                throw new Error(`protobuf: (PBLink) wrong wireType (${r}) for Tsize`);
            [t.Tsize,n] = decodeVarint(e, n)
        }
    }
    if (n > r)
        throw new Error("protobuf: (PBLink) unexpected end of data");
    return t
}
function decodeNode(e) {
    const t = e.length;
    let r, n, i = 0, o = !1;
    for (; i < t; ) {
        let t, s;
        if ([t,s,i] = decodeKey(e, i),
        2 !== t)
            throw new Error(`protobuf: (PBNode) invalid wireType, expected 2, got ${t}`);
        if (1 === s) {
            if (n)
                throw new Error("protobuf: (PBNode) duplicate Data section");
            [n,i] = decodeBytes(e, i),
            r && (o = !0)
        } else {
            if (2 !== s)
                throw new Error(`protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${s}`);
            {
                if (o)
                    throw new Error("protobuf: (PBNode) duplicate Links section");
                let t;
                r || (r = []),
                [t,i] = decodeBytes(e, i),
                r.push(decodeLink(t))
            }
        }
    }
    if (i > t)
        throw new Error("protobuf: (PBNode) unexpected end of data");
    const s = {};
    return n && (s.Data = n),
    s.Links = r || [],
    s
}
const textEncoder$1 = new TextEncoder
  , maxInt32 = 2 ** 32
  , maxUInt32 = 2 ** 31;
function encodeLink(e, t) {
    let r = t.length;
    if ("number" == typeof e.Tsize) {
        if (e.Tsize < 0)
            throw new Error("Tsize cannot be negative");
        if (!Number.isSafeInteger(e.Tsize))
            throw new Error("Tsize too large for encoding");
        r = encodeVarint(t, r, e.Tsize) - 1,
        t[r] = 24
    }
    if ("string" == typeof e.Name) {
        const n = textEncoder$1.encode(e.Name);
        r -= n.length,
        t.set(n, r),
        r = encodeVarint(t, r, n.length) - 1,
        t[r] = 18
    }
    return e.Hash && (r -= e.Hash.length,
    t.set(e.Hash, r),
    r = encodeVarint(t, r, e.Hash.length) - 1,
    t[r] = 10),
    t.length - r
}
function encodeNode(e) {
    const t = sizeNode(e)
      , r = new Uint8Array(t);
    let n = t;
    if (e.Data && (n -= e.Data.length,
    r.set(e.Data, n),
    n = encodeVarint(r, n, e.Data.length) - 1,
    r[n] = 10),
    e.Links)
        for (let i = e.Links.length - 1; i >= 0; i--) {
            const t = encodeLink(e.Links[i], r.subarray(0, n));
            n -= t,
            n = encodeVarint(r, n, t) - 1,
            r[n] = 18
        }
    return r
}
function sizeLink(e) {
    let t = 0;
    if (e.Hash) {
        const r = e.Hash.length;
        t += 1 + r + sov(r)
    }
    if ("string" == typeof e.Name) {
        const r = textEncoder$1.encode(e.Name).length;
        t += 1 + r + sov(r)
    }
    return "number" == typeof e.Tsize && (t += 1 + sov(e.Tsize)),
    t
}
function sizeNode(e) {
    let t = 0;
    if (e.Data) {
        const r = e.Data.length;
        t += 1 + r + sov(r)
    }
    if (e.Links)
        for (const r of e.Links) {
            const e = sizeLink(r);
            t += 1 + e + sov(e)
        }
    return t
}
function encodeVarint(e, t, r) {
    const n = t -= sov(r);
    for (; r >= maxUInt32; )
        e[t++] = 127 & r | 128,
        r /= 128;
    for (; r >= 128; )
        e[t++] = 127 & r | 128,
        r >>>= 7;
    return e[t] = r,
    n
}
function sov(e) {
    return e % 2 == 0 && e++,
    Math.floor((len64(e) + 6) / 7)
}
function len64(e) {
    let t = 0;
    return e >= maxInt32 && (e /= maxInt32,
    t = 32),
    e >= 65536 && (e >>= 16,
    t += 16),
    e >= 256 && (e >>= 8,
    t += 8),
    t + len8tab[e]
}
const len8tab = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  , name$1 = "dag-pb"
  , code$2 = 112
  , pbNodeProperties = ["Data", "Links"]
  , pbLinkProperties = ["Hash", "Name", "Tsize"]
  , textEncoder = new TextEncoder;
function linkComparator(e, t) {
    if (e === t)
        return 0;
    const r = e.Name ? textEncoder.encode(e.Name) : []
      , n = t.Name ? textEncoder.encode(t.Name) : [];
    let i = r.length
      , o = n.length;
    for (let s = 0, a = Math.min(i, o); s < a; ++s)
        if (r[s] !== n[s]) {
            i = r[s],
            o = n[s];
            break
        }
    return i < o ? -1 : o < i ? 1 : 0
}
function hasOnlyProperties(e, t) {
    return !Object.keys(e).some((e=>!t.includes(e)))
}
function asLink(e) {
    if ("object" == typeof e.asCID) {
        const t = CID$1.asCID(e);
        if (!t)
            throw new TypeError("Invalid DAG-PB form");
        return {
            Hash: t
        }
    }
    if ("object" != typeof e || Array.isArray(e))
        throw new TypeError("Invalid DAG-PB form");
    const t = {};
    if (e.Hash) {
        let n = CID$1.asCID(e.Hash);
        try {
            n || ("string" == typeof e.Hash ? n = CID$1.parse(e.Hash) : e.Hash instanceof Uint8Array && (n = CID$1.decode(e.Hash)))
        } catch (r) {
            throw new TypeError(`Invalid DAG-PB form: ${r.message}`)
        }
        n && (t.Hash = n)
    }
    if (!t.Hash)
        throw new TypeError("Invalid DAG-PB form");
    return "string" == typeof e.Name && (t.Name = e.Name),
    "number" == typeof e.Tsize && (t.Tsize = e.Tsize),
    t
}
function prepare$5(e) {
    if ((e instanceof Uint8Array || "string" == typeof e) && (e = {
        Data: e
    }),
    "object" != typeof e || Array.isArray(e))
        throw new TypeError("Invalid DAG-PB form");
    const t = {};
    return e.Data && ("string" == typeof e.Data ? t.Data = textEncoder.encode(e.Data) : e.Data instanceof Uint8Array && (t.Data = e.Data)),
    e.Links && Array.isArray(e.Links) && e.Links.length ? (t.Links = e.Links.map(asLink),
    t.Links.sort(linkComparator)) : t.Links = [],
    t
}
function validate(e) {
    if (!e || "object" != typeof e || Array.isArray(e))
        throw new TypeError("Invalid DAG-PB form");
    if (!hasOnlyProperties(e, pbNodeProperties))
        throw new TypeError("Invalid DAG-PB form (extraneous properties)");
    if (void 0 !== e.Data && !(e.Data instanceof Uint8Array))
        throw new TypeError("Invalid DAG-PB form (Data must be a Uint8Array)");
    if (!Array.isArray(e.Links))
        throw new TypeError("Invalid DAG-PB form (Links must be an array)");
    for (let t = 0; t < e.Links.length; t++) {
        const r = e.Links[t];
        if (!r || "object" != typeof r || Array.isArray(r))
            throw new TypeError("Invalid DAG-PB form (bad link object)");
        if (!hasOnlyProperties(r, pbLinkProperties))
            throw new TypeError("Invalid DAG-PB form (extraneous properties on link object)");
        if (!r.Hash)
            throw new TypeError("Invalid DAG-PB form (link must have a Hash)");
        if (r.Hash.asCID !== r.Hash)
            throw new TypeError("Invalid DAG-PB form (link Hash must be a CID)");
        if (void 0 !== r.Name && "string" != typeof r.Name)
            throw new TypeError("Invalid DAG-PB form (link Name must be a string)");
        if (void 0 !== r.Tsize && ("number" != typeof r.Tsize || r.Tsize % 1 != 0))
            throw new TypeError("Invalid DAG-PB form (link Tsize must be an integer)");
        if (t > 0 && -1 === linkComparator(r, e.Links[t - 1]))
            throw new TypeError("Invalid DAG-PB form (links must be sorted by Name bytes)")
    }
}
function encode$6(e) {
    validate(e);
    const t = {};
    return e.Links && (t.Links = e.Links.map((e=>{
        const t = {};
        return e.Hash && (t.Hash = e.Hash.bytes),
        void 0 !== e.Name && (t.Name = e.Name),
        void 0 !== e.Tsize && (t.Tsize = e.Tsize),
        t
    }
    ))),
    e.Data && (t.Data = e.Data),
    encodeNode(t)
}
function decode$1(e) {
    const t = decodeNode(e)
      , r = {};
    return t.Data && (r.Data = t.Data),
    t.Links && (r.Links = t.Links.map((e=>{
        const t = {};
        try {
            t.Hash = CID$1.decode(e.Hash)
        } catch (r) {}
        if (!t.Hash)
            throw new Error("Invalid Hash field found in link, expected CID");
        return void 0 !== e.Name && (t.Name = e.Name),
        void 0 !== e.Tsize && (t.Tsize = e.Tsize),
        t
    }
    ))),
    r
}
var src$3 = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    name: name$1,
    code: code$2,
    prepare: prepare$5,
    validate: validate,
    encode: encode$6,
    decode: decode$1
})
  , require$$0 = getAugmentedNamespace(src$3);
const {UnixFS: UnixFS$4} = src$5
  , persist$4 = persist_1
  , {encode: encode$5, prepare: prepare$4} = require$$0
  , dirBuilder$1 = async(e,t,r)=>{
    const n = new UnixFS$4({
        type: "directory",
        mtime: e.mtime,
        mode: e.mode
    })
      , i = encode$5(prepare$4({
        Data: n.marshal()
    }));
    return {
        cid: await persist$4(i, t, r),
        path: e.path,
        unixfs: n,
        size: i.length
    }
}
;
var dir$1 = dirBuilder$1;
const raw = e=>coerce(e)
  , {name: name, code: code$1, encode: encode$4, decode: decode} = {
    name: "raw",
    code: 85,
    decode: raw,
    encode: raw
};
var raw$1 = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    name: name,
    code: code$1,
    encode: encode$4,
    decode: decode
})
  , require$$6 = getAugmentedNamespace(raw$1);
const all$1 = async e=>{
    const t = [];
    for await(const r of e)
        t.push(r);
    return t
}
;
var itAll = all$1;
const all = itAll;
var flat = async function(e, t) {
    return t(await all(e))
};
const batch$1 = itBatch;
function balanced(e, t, r) {
    return reduceToParents(e, t, r)
}
async function reduceToParents(e, t, r) {
    const n = [];
    for await(const i of batch$1(e, r.maxChildrenPerNode))
        n.push(await t(i));
    return n.length > 1 ? reduceToParents(n, t, r) : n[0]
}
var balanced_1 = balanced;
const batch = itBatch;
var trickle = async function(e, t, r) {
    const n = new Root(r.layerRepeat);
    let i = 0
      , o = 1
      , s = n;
    for await(const a of batch(e, r.maxChildrenPerNode))
        s.isFull() && (s !== n && n.addChild(await s.reduce(t)),
        i && i % r.layerRepeat == 0 && o++,
        s = new SubTree(o,r.layerRepeat,i),
        i++),
        s.append(a);
    return s && s !== n && n.addChild(await s.reduce(t)),
    n.reduce(t)
};
class SubTree {
    constructor(e, t, r=0) {
        this.maxDepth = e,
        this.layerRepeat = t,
        this.currentDepth = 1,
        this.iteration = r,
        this.root = this.node = this.parent = {
            children: [],
            depth: this.currentDepth,
            maxDepth: e,
            maxChildren: (this.maxDepth - this.currentDepth) * this.layerRepeat
        }
    }
    isFull() {
        if (!this.root.data)
            return !1;
        if (this.currentDepth < this.maxDepth && this.node.maxChildren)
            return this._addNextNodeToParent(this.node),
            !1;
        const e = this._findParent(this.node, this.currentDepth);
        return !e || (this._addNextNodeToParent(e),
        !1)
    }
    _addNextNodeToParent(e) {
        this.parent = e;
        const t = {
            children: [],
            depth: e.depth + 1,
            parent: e,
            maxDepth: this.maxDepth,
            maxChildren: Math.floor(e.children.length / this.layerRepeat) * this.layerRepeat
        };
        e.children.push(t),
        this.currentDepth = t.depth,
        this.node = t
    }
    append(e) {
        this.node.data = e
    }
    reduce(e) {
        return this._reduce(this.root, e)
    }
    async _reduce(e, t) {
        let r = [];
        return e.children.length && (r = await Promise.all(e.children.filter((e=>e.data)).map((e=>this._reduce(e, t))))),
        t((e.data || []).concat(r))
    }
    _findParent(e, t) {
        const r = e.parent;
        if (r && 0 !== r.depth)
            return r.children.length !== r.maxChildren && r.maxChildren ? r : this._findParent(r, t)
    }
}
class Root extends SubTree {
    constructor(e) {
        super(0, e),
        this.root.depth = 0,
        this.currentDepth = 1
    }
    addChild(e) {
        this.root.children.push(e)
    }
    reduce(e) {
        return e((this.root.data || []).concat(this.root.children))
    }
}
const {UnixFS: UnixFS$3} = src$5
  , persist$3 = persist_1
  , {encode: encode$3, prepare: prepare$3} = require$$0
  , mc$1 = src$4;
async function *bufferImporter(e, t, r) {
    for await(let n of e.content)
        yield async()=>{
            let i;
            r.progress(n.length, e.path);
            const o = {
                codec: mc$1.DAG_PB,
                cidVersion: r.cidVersion,
                hasher: r.hasher,
                onlyHash: r.onlyHash
            };
            return r.rawLeaves ? (o.codec = mc$1.RAW,
            o.cidVersion = 1) : (i = new UnixFS$3({
                type: r.leafType,
                data: n,
                mtime: e.mtime,
                mode: e.mode
            }),
            n = encode$3(prepare$3({
                Data: i.marshal()
            }))),
            {
                cid: await persist$3(n, t, o),
                unixfs: i,
                size: n.length
            }
        }
}
var bufferImporter_1 = bufferImporter;
const errCode$2 = errCode$3
  , {UnixFS: UnixFS$2} = src$5
  , persist$2 = persist_1
  , {encode: encode$2, prepare: prepare$2} = require$$0
  , parallelBatch$1 = itParallelBatch
  , mc = src$4
  , rawCodec = require$$6
  , dagBuilders = {
    flat: flat,
    balanced: balanced_1,
    trickle: trickle
};
async function *buildFileBatch(e, t, r) {
    let n, i, o = -1;
    i = "function" == typeof r.bufferImporter ? r.bufferImporter : bufferImporter_1;
    for await(const s of parallelBatch$1(i(e, t, r), r.blockWriteConcurrency))
        o++,
        0 !== o ? (1 === o && n && (yield n,
        n = null),
        yield s) : n = s;
    n && (n.single = !0,
    yield n)
}
const reduce = (e,t,r)=>async function(n) {
    if (1 === n.length && n[0].single && r.reduceSingleLeafToSelf) {
        const i = n[0];
        if (i.cid.code === rawCodec.code && (void 0 !== e.mtime || void 0 !== e.mode)) {
            let {bytes: n} = await t.get(i.cid, r);
            i.unixfs = new UnixFS$2({
                type: "file",
                mtime: e.mtime,
                mode: e.mode,
                data: n
            }),
            n = encode$2(prepare$2({
                Data: i.unixfs.marshal()
            })),
            i.cid = await persist$2(n, t, __spreadProps(__spreadValues({}, r), {
                codec: mc.DAG_PB,
                hasher: r.hasher,
                cidVersion: r.cidVersion
            })),
            i.size = n.length
        }
        return {
            cid: i.cid,
            path: e.path,
            unixfs: i.unixfs,
            size: i.size
        }
    }
    const i = new UnixFS$2({
        type: "file",
        mtime: e.mtime,
        mode: e.mode
    })
      , o = n.filter((e=>!(e.cid.code !== rawCodec.code || !e.size) || (!(!e.unixfs || e.unixfs.data || !e.unixfs.fileSize()) || Boolean(e.unixfs && e.unixfs.data && e.unixfs.data.length)))).map((e=>e.cid.code === rawCodec.code ? (i.addBlockSize(e.size),
    {
        Name: "",
        Tsize: e.size,
        Hash: e.cid
    }) : (e.unixfs && e.unixfs.data ? i.addBlockSize(e.unixfs.data.length) : i.addBlockSize(e.unixfs && e.unixfs.fileSize() || 0),
    {
        Name: "",
        Tsize: e.size,
        Hash: e.cid
    })))
      , s = {
        Data: i.marshal(),
        Links: o
    }
      , a = encode$2(prepare$2(s));
    return {
        cid: await persist$2(a, t, r),
        path: e.path,
        unixfs: i,
        size: a.length + s.Links.reduce(((e,t)=>e + t.Tsize), 0)
    }
}
;
function fileBuilder$1(e, t, r) {
    const n = dagBuilders[r.strategy];
    if (!n)
        throw errCode$2(new Error(`Unknown importer build strategy name: ${r.strategy}`), "ERR_BAD_STRATEGY");
    return n(buildFileBatch(e, t, r), reduce(e, t, r), r)
}
var file = fileBuilder$1
  , buffer = {}
  , base64Js = {};
base64Js.byteLength = byteLength,
base64Js.toByteArray = toByteArray,
base64Js.fromByteArray = fromByteArray;
for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i)
    lookup[i] = code[i],
    revLookup[code.charCodeAt(i)] = i;
function getLens(e) {
    var t = e.length;
    if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    var r = e.indexOf("=");
    return -1 === r && (r = t),
    [r, r === t ? 0 : 4 - r % 4]
}
function byteLength(e) {
    var t = getLens(e)
      , r = t[0]
      , n = t[1];
    return 3 * (r + n) / 4 - n
}
function _byteLength(e, t, r) {
    return 3 * (t + r) / 4 - r
}
function toByteArray(e) {
    var t, r, n = getLens(e), i = n[0], o = n[1], s = new Arr(_byteLength(e, i, o)), a = 0, c = o > 0 ? i - 4 : i;
    for (r = 0; r < c; r += 4)
        t = revLookup[e.charCodeAt(r)] << 18 | revLookup[e.charCodeAt(r + 1)] << 12 | revLookup[e.charCodeAt(r + 2)] << 6 | revLookup[e.charCodeAt(r + 3)],
        s[a++] = t >> 16 & 255,
        s[a++] = t >> 8 & 255,
        s[a++] = 255 & t;
    return 2 === o && (t = revLookup[e.charCodeAt(r)] << 2 | revLookup[e.charCodeAt(r + 1)] >> 4,
    s[a++] = 255 & t),
    1 === o && (t = revLookup[e.charCodeAt(r)] << 10 | revLookup[e.charCodeAt(r + 1)] << 4 | revLookup[e.charCodeAt(r + 2)] >> 2,
    s[a++] = t >> 8 & 255,
    s[a++] = 255 & t),
    s
}
function tripletToBase64(e) {
    return lookup[e >> 18 & 63] + lookup[e >> 12 & 63] + lookup[e >> 6 & 63] + lookup[63 & e]
}
function encodeChunk(e, t, r) {
    for (var n, i = [], o = t; o < r; o += 3)
        n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]),
        i.push(tripletToBase64(n));
    return i.join("")
}
function fromByteArray(e) {
    for (var t, r = e.length, n = r % 3, i = [], o = 16383, s = 0, a = r - n; s < a; s += o)
        i.push(encodeChunk(e, s, s + o > a ? a : s + o));
    return 1 === n ? (t = e[r - 1],
    i.push(lookup[t >> 2] + lookup[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1],
    i.push(lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "=")),
    i.join("")
}
revLookup["-".charCodeAt(0)] = 62,
revLookup["_".charCodeAt(0)] = 63;
var ieee754 = {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    read: function(e, t, r, n, i) {
        var o, s, a = 8 * i - n - 1, c = (1 << a) - 1, u = c >> 1, l = -7, f = r ? i - 1 : 0, h = r ? -1 : 1, d = e[t + f];
        for (f += h,
        o = d & (1 << -l) - 1,
        d >>= -l,
        l += a; l > 0; o = 256 * o + e[t + f],
        f += h,
        l -= 8)
            ;
        for (s = o & (1 << -l) - 1,
        o >>= -l,
        l += n; l > 0; s = 256 * s + e[t + f],
        f += h,
        l -= 8)
            ;
        if (0 === o)
            o = 1 - u;
        else {
            if (o === c)
                return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, n),
            o -= u
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - n)
    },
    write: function(e, t, r, n, i, o) {
        var s, a, c, u = 8 * o - i - 1, l = (1 << u) - 1, f = l >> 1, h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n ? 0 : o - 1, p = n ? 1 : -1, y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t),
        isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0,
        s = l) : (s = Math.floor(Math.log(t) / Math.LN2),
        t * (c = Math.pow(2, -s)) < 1 && (s--,
        c *= 2),
        (t += s + f >= 1 ? h / c : h * Math.pow(2, 1 - f)) * c >= 2 && (s++,
        c /= 2),
        s + f >= l ? (a = 0,
        s = l) : s + f >= 1 ? (a = (t * c - 1) * Math.pow(2, i),
        s += f) : (a = t * Math.pow(2, f - 1) * Math.pow(2, i),
        s = 0)); i >= 8; e[r + d] = 255 & a,
        d += p,
        a /= 256,
        i -= 8)
            ;
        for (s = s << i | a,
        u += i; u > 0; e[r + d] = 255 & s,
        d += p,
        s /= 256,
        u -= 8)
            ;
        e[r + d - p] |= 128 * y
    }
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
!function(e) {
    const t = base64Js
      , r = ieee754
      , n = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
    e.Buffer = s,
    e.SlowBuffer = function(e) {
        +e != e && (e = 0);
        return s.alloc(+e)
    }
    ,
    e.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    function o(e) {
        if (e > i)
            throw new RangeError('The value "' + e + '" is invalid for option "size"');
        const t = new Uint8Array(e);
        return Object.setPrototypeOf(t, s.prototype),
        t
    }
    function s(e, t, r) {
        if ("number" == typeof e) {
            if ("string" == typeof t)
                throw new TypeError('The "string" argument must be of type string. Received type number');
            return u(e)
        }
        return a(e, t, r)
    }
    function a(e, t, r) {
        if ("string" == typeof e)
            return function(e, t) {
                "string" == typeof t && "" !== t || (t = "utf8");
                if (!s.isEncoding(t))
                    throw new TypeError("Unknown encoding: " + t);
                const r = 0 | d(e, t);
                let n = o(r);
                const i = n.write(e, t);
                i !== r && (n = n.slice(0, i));
                return n
            }(e, t);
        if (ArrayBuffer.isView(e))
            return function(e) {
                if (q(e, Uint8Array)) {
                    const t = new Uint8Array(e);
                    return f(t.buffer, t.byteOffset, t.byteLength)
                }
                return l(e)
            }(e);
        if (null == e)
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
        if (q(e, ArrayBuffer) || e && q(e.buffer, ArrayBuffer))
            return f(e, t, r);
        if ("undefined" != typeof SharedArrayBuffer && (q(e, SharedArrayBuffer) || e && q(e.buffer, SharedArrayBuffer)))
            return f(e, t, r);
        if ("number" == typeof e)
            throw new TypeError('The "value" argument must not be of type number. Received type number');
        const n = e.valueOf && e.valueOf();
        if (null != n && n !== e)
            return s.from(n, t, r);
        const i = function(e) {
            if (s.isBuffer(e)) {
                const t = 0 | h(e.length)
                  , r = o(t);
                return 0 === r.length || e.copy(r, 0, 0, t),
                r
            }
            if (void 0 !== e.length)
                return "number" != typeof e.length || Y(e.length) ? o(0) : l(e);
            if ("Buffer" === e.type && Array.isArray(e.data))
                return l(e.data)
        }(e);
        if (i)
            return i;
        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive])
            return s.from(e[Symbol.toPrimitive]("string"), t, r);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
    }
    function c(e) {
        if ("number" != typeof e)
            throw new TypeError('"size" argument must be of type number');
        if (e < 0)
            throw new RangeError('The value "' + e + '" is invalid for option "size"')
    }
    function u(e) {
        return c(e),
        o(e < 0 ? 0 : 0 | h(e))
    }
    function l(e) {
        const t = e.length < 0 ? 0 : 0 | h(e.length)
          , r = o(t);
        for (let n = 0; n < t; n += 1)
            r[n] = 255 & e[n];
        return r
    }
    function f(e, t, r) {
        if (t < 0 || e.byteLength < t)
            throw new RangeError('"offset" is outside of buffer bounds');
        if (e.byteLength < t + (r || 0))
            throw new RangeError('"length" is outside of buffer bounds');
        let n;
        return n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e,t) : new Uint8Array(e,t,r),
        Object.setPrototypeOf(n, s.prototype),
        n
    }
    function h(e) {
        if (e >= i)
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
        return 0 | e
    }
    function d(e, t) {
        if (s.isBuffer(e))
            return e.length;
        if (ArrayBuffer.isView(e) || q(e, ArrayBuffer))
            return e.byteLength;
        if ("string" != typeof e)
            throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
        const r = e.length
          , n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r)
            return 0;
        let i = !1;
        for (; ; )
            switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
                return V(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return G(e).length;
            default:
                if (i)
                    return n ? -1 : V(e).length;
                t = ("" + t).toLowerCase(),
                i = !0
            }
    }
    function p(e, t, r) {
        let n = !1;
        if ((void 0 === t || t < 0) && (t = 0),
        t > this.length)
            return "";
        if ((void 0 === r || r > this.length) && (r = this.length),
        r <= 0)
            return "";
        if ((r >>>= 0) <= (t >>>= 0))
            return "";
        for (e || (e = "utf8"); ; )
            switch (e) {
            case "hex":
                return S(this, t, r);
            case "utf8":
            case "utf-8":
                return A(this, t, r);
            case "ascii":
                return B(this, t, r);
            case "latin1":
            case "binary":
                return E(this, t, r);
            case "base64":
                return v(this, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return I(this, t, r);
            default:
                if (n)
                    throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(),
                n = !0
            }
    }
    function y(e, t, r) {
        const n = e[t];
        e[t] = e[r],
        e[r] = n
    }
    function b(e, t, r, n, i) {
        if (0 === e.length)
            return -1;
        if ("string" == typeof r ? (n = r,
        r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
        Y(r = +r) && (r = i ? 0 : e.length - 1),
        r < 0 && (r = e.length + r),
        r >= e.length) {
            if (i)
                return -1;
            r = e.length - 1
        } else if (r < 0) {
            if (!i)
                return -1;
            r = 0
        }
        if ("string" == typeof t && (t = s.from(t, n)),
        s.isBuffer(t))
            return 0 === t.length ? -1 : g(e, t, r, n, i);
        if ("number" == typeof t)
            return t &= 255,
            "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : g(e, [t], r, n, i);
        throw new TypeError("val must be string, number or Buffer")
    }
    function g(e, t, r, n, i) {
        let o, s = 1, a = e.length, c = t.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
            if (e.length < 2 || t.length < 2)
                return -1;
            s = 2,
            a /= 2,
            c /= 2,
            r /= 2
        }
        function u(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }
        if (i) {
            let n = -1;
            for (o = r; o < a; o++)
                if (u(e, o) === u(t, -1 === n ? 0 : o - n)) {
                    if (-1 === n && (n = o),
                    o - n + 1 === c)
                        return n * s
                } else
                    -1 !== n && (o -= o - n),
                    n = -1
        } else
            for (r + c > a && (r = a - c),
            o = r; o >= 0; o--) {
                let r = !0;
                for (let n = 0; n < c; n++)
                    if (u(e, o + n) !== u(t, n)) {
                        r = !1;
                        break
                    }
                if (r)
                    return o
            }
        return -1
    }
    function m(e, t, r, n) {
        r = Number(r) || 0;
        const i = e.length - r;
        n ? (n = Number(n)) > i && (n = i) : n = i;
        const o = t.length;
        let s;
        for (n > o / 2 && (n = o / 2),
        s = 0; s < n; ++s) {
            const n = parseInt(t.substr(2 * s, 2), 16);
            if (Y(n))
                return s;
            e[r + s] = n
        }
        return s
    }
    function k(e, t, r, n) {
        return W(V(t, e.length - r), e, r, n)
    }
    function w(e, t, r, n) {
        return W(function(e) {
            const t = [];
            for (let r = 0; r < e.length; ++r)
                t.push(255 & e.charCodeAt(r));
            return t
        }(t), e, r, n)
    }
    function _(e, t, r, n) {
        return W(G(t), e, r, n)
    }
    function $(e, t, r, n) {
        return W(function(e, t) {
            let r, n, i;
            const o = [];
            for (let s = 0; s < e.length && !((t -= 2) < 0); ++s)
                r = e.charCodeAt(s),
                n = r >> 8,
                i = r % 256,
                o.push(i),
                o.push(n);
            return o
        }(t, e.length - r), e, r, n)
    }
    function v(e, r, n) {
        return 0 === r && n === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(r, n))
    }
    function A(e, t, r) {
        r = Math.min(e.length, r);
        const n = [];
        let i = t;
        for (; i < r; ) {
            const t = e[i];
            let o = null
              , s = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
            if (i + s <= r) {
                let r, n, a, c;
                switch (s) {
                case 1:
                    t < 128 && (o = t);
                    break;
                case 2:
                    r = e[i + 1],
                    128 == (192 & r) && (c = (31 & t) << 6 | 63 & r,
                    c > 127 && (o = c));
                    break;
                case 3:
                    r = e[i + 1],
                    n = e[i + 2],
                    128 == (192 & r) && 128 == (192 & n) && (c = (15 & t) << 12 | (63 & r) << 6 | 63 & n,
                    c > 2047 && (c < 55296 || c > 57343) && (o = c));
                    break;
                case 4:
                    r = e[i + 1],
                    n = e[i + 2],
                    a = e[i + 3],
                    128 == (192 & r) && 128 == (192 & n) && 128 == (192 & a) && (c = (15 & t) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & a,
                    c > 65535 && c < 1114112 && (o = c))
                }
            }
            null === o ? (o = 65533,
            s = 1) : o > 65535 && (o -= 65536,
            n.push(o >>> 10 & 1023 | 55296),
            o = 56320 | 1023 & o),
            n.push(o),
            i += s
        }
        return function(e) {
            const t = e.length;
            if (t <= T)
                return String.fromCharCode.apply(String, e);
            let r = ""
              , n = 0;
            for (; n < t; )
                r += String.fromCharCode.apply(String, e.slice(n, n += T));
            return r
        }(n)
    }
    e.kMaxLength = i,
    s.TYPED_ARRAY_SUPPORT = function() {
        try {
            const e = new Uint8Array(1)
              , t = {
                foo: function() {
                    return 42
                }
            };
            return Object.setPrototypeOf(t, Uint8Array.prototype),
            Object.setPrototypeOf(e, t),
            42 === e.foo()
        } catch (e) {
            return !1
        }
    }(),
    s.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
    Object.defineProperty(s.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (s.isBuffer(this))
                return this.buffer
        }
    }),
    Object.defineProperty(s.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (s.isBuffer(this))
                return this.byteOffset
        }
    }),
    s.poolSize = 8192,
    s.from = function(e, t, r) {
        return a(e, t, r)
    }
    ,
    Object.setPrototypeOf(s.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(s, Uint8Array),
    s.alloc = function(e, t, r) {
        return function(e, t, r) {
            return c(e),
            e <= 0 ? o(e) : void 0 !== t ? "string" == typeof r ? o(e).fill(t, r) : o(e).fill(t) : o(e)
        }(e, t, r)
    }
    ,
    s.allocUnsafe = function(e) {
        return u(e)
    }
    ,
    s.allocUnsafeSlow = function(e) {
        return u(e)
    }
    ,
    s.isBuffer = function(e) {
        return null != e && !0 === e._isBuffer && e !== s.prototype
    }
    ,
    s.compare = function(e, t) {
        if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)),
        q(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)),
        !s.isBuffer(e) || !s.isBuffer(t))
            throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === t)
            return 0;
        let r = e.length
          , n = t.length;
        for (let i = 0, o = Math.min(r, n); i < o; ++i)
            if (e[i] !== t[i]) {
                r = e[i],
                n = t[i];
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }
    ,
    s.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
        }
    }
    ,
    s.concat = function(e, t) {
        if (!Array.isArray(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length)
            return s.alloc(0);
        let r;
        if (void 0 === t)
            for (t = 0,
            r = 0; r < e.length; ++r)
                t += e[r].length;
        const n = s.allocUnsafe(t);
        let i = 0;
        for (r = 0; r < e.length; ++r) {
            let t = e[r];
            if (q(t, Uint8Array))
                i + t.length > n.length ? (s.isBuffer(t) || (t = s.from(t)),
                t.copy(n, i)) : Uint8Array.prototype.set.call(n, t, i);
            else {
                if (!s.isBuffer(t))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                t.copy(n, i)
            }
            i += t.length
        }
        return n
    }
    ,
    s.byteLength = d,
    s.prototype._isBuffer = !0,
    s.prototype.swap16 = function() {
        const e = this.length;
        if (e % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let t = 0; t < e; t += 2)
            y(this, t, t + 1);
        return this
    }
    ,
    s.prototype.swap32 = function() {
        const e = this.length;
        if (e % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let t = 0; t < e; t += 4)
            y(this, t, t + 3),
            y(this, t + 1, t + 2);
        return this
    }
    ,
    s.prototype.swap64 = function() {
        const e = this.length;
        if (e % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let t = 0; t < e; t += 8)
            y(this, t, t + 7),
            y(this, t + 1, t + 6),
            y(this, t + 2, t + 5),
            y(this, t + 3, t + 4);
        return this
    }
    ,
    s.prototype.toString = function() {
        const e = this.length;
        return 0 === e ? "" : 0 === arguments.length ? A(this, 0, e) : p.apply(this, arguments)
    }
    ,
    s.prototype.toLocaleString = s.prototype.toString,
    s.prototype.equals = function(e) {
        if (!s.isBuffer(e))
            throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === s.compare(this, e)
    }
    ,
    s.prototype.inspect = function() {
        let t = "";
        const r = e.INSPECT_MAX_BYTES;
        return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(),
        this.length > r && (t += " ... "),
        "<Buffer " + t + ">"
    }
    ,
    n && (s.prototype[n] = s.prototype.inspect),
    s.prototype.compare = function(e, t, r, n, i) {
        if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)),
        !s.isBuffer(e))
            throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (void 0 === t && (t = 0),
        void 0 === r && (r = e ? e.length : 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = this.length),
        t < 0 || r > e.length || n < 0 || i > this.length)
            throw new RangeError("out of range index");
        if (n >= i && t >= r)
            return 0;
        if (n >= i)
            return -1;
        if (t >= r)
            return 1;
        if (this === e)
            return 0;
        let o = (i >>>= 0) - (n >>>= 0)
          , a = (r >>>= 0) - (t >>>= 0);
        const c = Math.min(o, a)
          , u = this.slice(n, i)
          , l = e.slice(t, r);
        for (let s = 0; s < c; ++s)
            if (u[s] !== l[s]) {
                o = u[s],
                a = l[s];
                break
            }
        return o < a ? -1 : a < o ? 1 : 0
    }
    ,
    s.prototype.includes = function(e, t, r) {
        return -1 !== this.indexOf(e, t, r)
    }
    ,
    s.prototype.indexOf = function(e, t, r) {
        return b(this, e, t, r, !0)
    }
    ,
    s.prototype.lastIndexOf = function(e, t, r) {
        return b(this, e, t, r, !1)
    }
    ,
    s.prototype.write = function(e, t, r, n) {
        if (void 0 === t)
            n = "utf8",
            r = this.length,
            t = 0;
        else if (void 0 === r && "string" == typeof t)
            n = t,
            r = this.length,
            t = 0;
        else {
            if (!isFinite(t))
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t >>>= 0,
            isFinite(r) ? (r >>>= 0,
            void 0 === n && (n = "utf8")) : (n = r,
            r = void 0)
        }
        const i = this.length - t;
        if ((void 0 === r || r > i) && (r = i),
        e.length > 0 && (r < 0 || t < 0) || t > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        let o = !1;
        for (; ; )
            switch (n) {
            case "hex":
                return m(this, e, t, r);
            case "utf8":
            case "utf-8":
                return k(this, e, t, r);
            case "ascii":
            case "latin1":
            case "binary":
                return w(this, e, t, r);
            case "base64":
                return _(this, e, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return $(this, e, t, r);
            default:
                if (o)
                    throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(),
                o = !0
            }
    }
    ,
    s.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
    ;
    const T = 4096;
    function B(e, t, r) {
        let n = "";
        r = Math.min(e.length, r);
        for (let i = t; i < r; ++i)
            n += String.fromCharCode(127 & e[i]);
        return n
    }
    function E(e, t, r) {
        let n = "";
        r = Math.min(e.length, r);
        for (let i = t; i < r; ++i)
            n += String.fromCharCode(e[i]);
        return n
    }
    function S(e, t, r) {
        const n = e.length;
        (!t || t < 0) && (t = 0),
        (!r || r < 0 || r > n) && (r = n);
        let i = "";
        for (let o = t; o < r; ++o)
            i += K[e[o]];
        return i
    }
    function I(e, t, r) {
        const n = e.slice(t, r);
        let i = "";
        for (let o = 0; o < n.length - 1; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        return i
    }
    function C(e, t, r) {
        if (e % 1 != 0 || e < 0)
            throw new RangeError("offset is not uint");
        if (e + t > r)
            throw new RangeError("Trying to access beyond buffer length")
    }
    function x(e, t, r, n, i, o) {
        if (!s.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < o)
            throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length)
            throw new RangeError("Index out of range")
    }
    function U(e, t, r, n, i) {
        j(t, n, i, e, r, 7);
        let o = Number(t & BigInt(4294967295));
        e[r++] = o,
        o >>= 8,
        e[r++] = o,
        o >>= 8,
        e[r++] = o,
        o >>= 8,
        e[r++] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return e[r++] = s,
        s >>= 8,
        e[r++] = s,
        s >>= 8,
        e[r++] = s,
        s >>= 8,
        e[r++] = s,
        r
    }
    function N(e, t, r, n, i) {
        j(t, n, i, e, r, 7);
        let o = Number(t & BigInt(4294967295));
        e[r + 7] = o,
        o >>= 8,
        e[r + 6] = o,
        o >>= 8,
        e[r + 5] = o,
        o >>= 8,
        e[r + 4] = o;
        let s = Number(t >> BigInt(32) & BigInt(4294967295));
        return e[r + 3] = s,
        s >>= 8,
        e[r + 2] = s,
        s >>= 8,
        e[r + 1] = s,
        s >>= 8,
        e[r] = s,
        r + 8
    }
    function D(e, t, r, n, i, o) {
        if (r + n > e.length)
            throw new RangeError("Index out of range");
        if (r < 0)
            throw new RangeError("Index out of range")
    }
    function O(e, t, n, i, o) {
        return t = +t,
        n >>>= 0,
        o || D(e, 0, n, 4),
        r.write(e, t, n, i, 23, 4),
        n + 4
    }
    function L(e, t, n, i, o) {
        return t = +t,
        n >>>= 0,
        o || D(e, 0, n, 8),
        r.write(e, t, n, i, 52, 8),
        n + 8
    }
    s.prototype.slice = function(e, t) {
        const r = this.length;
        (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
        (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        t < e && (t = e);
        const n = this.subarray(e, t);
        return Object.setPrototypeOf(n, s.prototype),
        n
    }
    ,
    s.prototype.readUintLE = s.prototype.readUIntLE = function(e, t, r) {
        e >>>= 0,
        t >>>= 0,
        r || C(e, t, this.length);
        let n = this[e]
          , i = 1
          , o = 0;
        for (; ++o < t && (i *= 256); )
            n += this[e + o] * i;
        return n
    }
    ,
    s.prototype.readUintBE = s.prototype.readUIntBE = function(e, t, r) {
        e >>>= 0,
        t >>>= 0,
        r || C(e, t, this.length);
        let n = this[e + --t]
          , i = 1;
        for (; t > 0 && (i *= 256); )
            n += this[e + --t] * i;
        return n
    }
    ,
    s.prototype.readUint8 = s.prototype.readUInt8 = function(e, t) {
        return e >>>= 0,
        t || C(e, 1, this.length),
        this[e]
    }
    ,
    s.prototype.readUint16LE = s.prototype.readUInt16LE = function(e, t) {
        return e >>>= 0,
        t || C(e, 2, this.length),
        this[e] | this[e + 1] << 8
    }
    ,
    s.prototype.readUint16BE = s.prototype.readUInt16BE = function(e, t) {
        return e >>>= 0,
        t || C(e, 2, this.length),
        this[e] << 8 | this[e + 1]
    }
    ,
    s.prototype.readUint32LE = s.prototype.readUInt32LE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }
    ,
    s.prototype.readUint32BE = s.prototype.readUInt32BE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }
    ,
    s.prototype.readBigUInt64LE = J((function(e) {
        P(e >>>= 0, "offset");
        const t = this[e]
          , r = this[e + 7];
        void 0 !== t && void 0 !== r || z(e, this.length - 8);
        const n = t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24
          , i = this[++e] + 256 * this[++e] + 65536 * this[++e] + r * 2 ** 24;
        return BigInt(n) + (BigInt(i) << BigInt(32))
    }
    )),
    s.prototype.readBigUInt64BE = J((function(e) {
        P(e >>>= 0, "offset");
        const t = this[e]
          , r = this[e + 7];
        void 0 !== t && void 0 !== r || z(e, this.length - 8);
        const n = t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e]
          , i = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r;
        return (BigInt(n) << BigInt(32)) + BigInt(i)
    }
    )),
    s.prototype.readIntLE = function(e, t, r) {
        e >>>= 0,
        t >>>= 0,
        r || C(e, t, this.length);
        let n = this[e]
          , i = 1
          , o = 0;
        for (; ++o < t && (i *= 256); )
            n += this[e + o] * i;
        return i *= 128,
        n >= i && (n -= Math.pow(2, 8 * t)),
        n
    }
    ,
    s.prototype.readIntBE = function(e, t, r) {
        e >>>= 0,
        t >>>= 0,
        r || C(e, t, this.length);
        let n = t
          , i = 1
          , o = this[e + --n];
        for (; n > 0 && (i *= 256); )
            o += this[e + --n] * i;
        return i *= 128,
        o >= i && (o -= Math.pow(2, 8 * t)),
        o
    }
    ,
    s.prototype.readInt8 = function(e, t) {
        return e >>>= 0,
        t || C(e, 1, this.length),
        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }
    ,
    s.prototype.readInt16LE = function(e, t) {
        e >>>= 0,
        t || C(e, 2, this.length);
        const r = this[e] | this[e + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    s.prototype.readInt16BE = function(e, t) {
        e >>>= 0,
        t || C(e, 2, this.length);
        const r = this[e + 1] | this[e] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    s.prototype.readInt32LE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }
    ,
    s.prototype.readInt32BE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }
    ,
    s.prototype.readBigInt64LE = J((function(e) {
        P(e >>>= 0, "offset");
        const t = this[e]
          , r = this[e + 7];
        void 0 !== t && void 0 !== r || z(e, this.length - 8);
        const n = this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24);
        return (BigInt(n) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
    }
    )),
    s.prototype.readBigInt64BE = J((function(e) {
        P(e >>>= 0, "offset");
        const t = this[e]
          , r = this[e + 7];
        void 0 !== t && void 0 !== r || z(e, this.length - 8);
        const n = (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
        return (BigInt(n) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r)
    }
    )),
    s.prototype.readFloatLE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        r.read(this, e, !0, 23, 4)
    }
    ,
    s.prototype.readFloatBE = function(e, t) {
        return e >>>= 0,
        t || C(e, 4, this.length),
        r.read(this, e, !1, 23, 4)
    }
    ,
    s.prototype.readDoubleLE = function(e, t) {
        return e >>>= 0,
        t || C(e, 8, this.length),
        r.read(this, e, !0, 52, 8)
    }
    ,
    s.prototype.readDoubleBE = function(e, t) {
        return e >>>= 0,
        t || C(e, 8, this.length),
        r.read(this, e, !1, 52, 8)
    }
    ,
    s.prototype.writeUintLE = s.prototype.writeUIntLE = function(e, t, r, n) {
        if (e = +e,
        t >>>= 0,
        r >>>= 0,
        !n) {
            x(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
        }
        let i = 1
          , o = 0;
        for (this[t] = 255 & e; ++o < r && (i *= 256); )
            this[t + o] = e / i & 255;
        return t + r
    }
    ,
    s.prototype.writeUintBE = s.prototype.writeUIntBE = function(e, t, r, n) {
        if (e = +e,
        t >>>= 0,
        r >>>= 0,
        !n) {
            x(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
        }
        let i = r - 1
          , o = 1;
        for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
            this[t + i] = e / o & 255;
        return t + r
    }
    ,
    s.prototype.writeUint8 = s.prototype.writeUInt8 = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 1, 255, 0),
        this[t] = 255 & e,
        t + 1
    }
    ,
    s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 2, 65535, 0),
        this[t] = 255 & e,
        this[t + 1] = e >>> 8,
        t + 2
    }
    ,
    s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 2, 65535, 0),
        this[t] = e >>> 8,
        this[t + 1] = 255 & e,
        t + 2
    }
    ,
    s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 4, 4294967295, 0),
        this[t + 3] = e >>> 24,
        this[t + 2] = e >>> 16,
        this[t + 1] = e >>> 8,
        this[t] = 255 & e,
        t + 4
    }
    ,
    s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 4, 4294967295, 0),
        this[t] = e >>> 24,
        this[t + 1] = e >>> 16,
        this[t + 2] = e >>> 8,
        this[t + 3] = 255 & e,
        t + 4
    }
    ,
    s.prototype.writeBigUInt64LE = J((function(e, t=0) {
        return U(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
    }
    )),
    s.prototype.writeBigUInt64BE = J((function(e, t=0) {
        return N(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
    }
    )),
    s.prototype.writeIntLE = function(e, t, r, n) {
        if (e = +e,
        t >>>= 0,
        !n) {
            const n = Math.pow(2, 8 * r - 1);
            x(this, e, t, r, n - 1, -n)
        }
        let i = 0
          , o = 1
          , s = 0;
        for (this[t] = 255 & e; ++i < r && (o *= 256); )
            e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1),
            this[t + i] = (e / o >> 0) - s & 255;
        return t + r
    }
    ,
    s.prototype.writeIntBE = function(e, t, r, n) {
        if (e = +e,
        t >>>= 0,
        !n) {
            const n = Math.pow(2, 8 * r - 1);
            x(this, e, t, r, n - 1, -n)
        }
        let i = r - 1
          , o = 1
          , s = 0;
        for (this[t + i] = 255 & e; --i >= 0 && (o *= 256); )
            e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1),
            this[t + i] = (e / o >> 0) - s & 255;
        return t + r
    }
    ,
    s.prototype.writeInt8 = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 1, 127, -128),
        e < 0 && (e = 255 + e + 1),
        this[t] = 255 & e,
        t + 1
    }
    ,
    s.prototype.writeInt16LE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 2, 32767, -32768),
        this[t] = 255 & e,
        this[t + 1] = e >>> 8,
        t + 2
    }
    ,
    s.prototype.writeInt16BE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 2, 32767, -32768),
        this[t] = e >>> 8,
        this[t + 1] = 255 & e,
        t + 2
    }
    ,
    s.prototype.writeInt32LE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 4, 2147483647, -2147483648),
        this[t] = 255 & e,
        this[t + 1] = e >>> 8,
        this[t + 2] = e >>> 16,
        this[t + 3] = e >>> 24,
        t + 4
    }
    ,
    s.prototype.writeInt32BE = function(e, t, r) {
        return e = +e,
        t >>>= 0,
        r || x(this, e, t, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        this[t] = e >>> 24,
        this[t + 1] = e >>> 16,
        this[t + 2] = e >>> 8,
        this[t + 3] = 255 & e,
        t + 4
    }
    ,
    s.prototype.writeBigInt64LE = J((function(e, t=0) {
        return U(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    }
    )),
    s.prototype.writeBigInt64BE = J((function(e, t=0) {
        return N(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    }
    )),
    s.prototype.writeFloatLE = function(e, t, r) {
        return O(this, e, t, !0, r)
    }
    ,
    s.prototype.writeFloatBE = function(e, t, r) {
        return O(this, e, t, !1, r)
    }
    ,
    s.prototype.writeDoubleLE = function(e, t, r) {
        return L(this, e, t, !0, r)
    }
    ,
    s.prototype.writeDoubleBE = function(e, t, r) {
        return L(this, e, t, !1, r)
    }
    ,
    s.prototype.copy = function(e, t, r, n) {
        if (!s.isBuffer(e))
            throw new TypeError("argument should be a Buffer");
        if (r || (r = 0),
        n || 0 === n || (n = this.length),
        t >= e.length && (t = e.length),
        t || (t = 0),
        n > 0 && n < r && (n = r),
        n === r)
            return 0;
        if (0 === e.length || 0 === this.length)
            return 0;
        if (t < 0)
            throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)
            throw new RangeError("Index out of range");
        if (n < 0)
            throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length),
        e.length - t < n - r && (n = e.length - t + r);
        const i = n - r;
        return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, r, n) : Uint8Array.prototype.set.call(e, this.subarray(r, n), t),
        i
    }
    ,
    s.prototype.fill = function(e, t, r, n) {
        if ("string" == typeof e) {
            if ("string" == typeof t ? (n = t,
            t = 0,
            r = this.length) : "string" == typeof r && (n = r,
            r = this.length),
            void 0 !== n && "string" != typeof n)
                throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !s.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n);
            if (1 === e.length) {
                const t = e.charCodeAt(0);
                ("utf8" === n && t < 128 || "latin1" === n) && (e = t)
            }
        } else
            "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
        if (t < 0 || this.length < t || this.length < r)
            throw new RangeError("Out of range index");
        if (r <= t)
            return this;
        let i;
        if (t >>>= 0,
        r = void 0 === r ? this.length : r >>> 0,
        e || (e = 0),
        "number" == typeof e)
            for (i = t; i < r; ++i)
                this[i] = e;
        else {
            const o = s.isBuffer(e) ? e : s.from(e, n)
              , a = o.length;
            if (0 === a)
                throw new TypeError('The value "' + e + '" is invalid for argument "value"');
            for (i = 0; i < r - t; ++i)
                this[i + t] = o[i % a]
        }
        return this
    }
    ;
    const R = {};
    function M(e, t, r) {
        R[e] = class extends r {
            constructor() {
                super(),
                Object.defineProperty(this, "message", {
                    value: t.apply(this, arguments),
                    writable: !0,
                    configurable: !0
                }),
                this.name = `${this.name} [${e}]`,
                this.stack,
                delete this.name
            }
            get code() {
                return e
            }
            set code(e) {
                Object.defineProperty(this, "code", {
                    configurable: !0,
                    enumerable: !0,
                    value: e,
                    writable: !0
                })
            }
            toString() {
                return `${this.name} [${e}]: ${this.message}`
            }
        }
    }
    function F(e) {
        let t = ""
          , r = e.length;
        const n = "-" === e[0] ? 1 : 0;
        for (; r >= n + 4; r -= 3)
            t = `_${e.slice(r - 3, r)}${t}`;
        return `${e.slice(0, r)}${t}`
    }
    function j(e, t, r, n, i, o) {
        if (e > r || e < t) {
            const n = "bigint" == typeof t ? "n" : "";
            let i;
            throw i = o > 3 ? 0 === t || t === BigInt(0) ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}` : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ${8 * (o + 1) - 1}${n}` : `>= ${t}${n} and <= ${r}${n}`,
            new R.ERR_OUT_OF_RANGE("value",i,e)
        }
        !function(e, t, r) {
            P(t, "offset"),
            void 0 !== e[t] && void 0 !== e[t + r] || z(t, e.length - (r + 1))
        }(n, i, o)
    }
    function P(e, t) {
        if ("number" != typeof e)
            throw new R.ERR_INVALID_ARG_TYPE(t,"number",e)
    }
    function z(e, t, r) {
        if (Math.floor(e) !== e)
            throw P(e, r),
            new R.ERR_OUT_OF_RANGE(r || "offset","an integer",e);
        if (t < 0)
            throw new R.ERR_BUFFER_OUT_OF_BOUNDS;
        throw new R.ERR_OUT_OF_RANGE(r || "offset",`>= ${r ? 1 : 0} and <= ${t}`,e)
    }
    M("ERR_BUFFER_OUT_OF_BOUNDS", (function(e) {
        return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
    }
    ), RangeError),
    M("ERR_INVALID_ARG_TYPE", (function(e, t) {
        return `The "${e}" argument must be of type number. Received type ${typeof t}`
    }
    ), TypeError),
    M("ERR_OUT_OF_RANGE", (function(e, t, r) {
        let n = `The value of "${e}" is out of range.`
          , i = r;
        return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = F(String(r)) : "bigint" == typeof r && (i = String(r),
        (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = F(i)),
        i += "n"),
        n += ` It must be ${t}. Received ${i}`,
        n
    }
    ), RangeError);
    const H = /[^+/0-9A-Za-z-_]/g;
    function V(e, t) {
        let r;
        t = t || 1 / 0;
        const n = e.length;
        let i = null;
        const o = [];
        for (let s = 0; s < n; ++s) {
            if (r = e.charCodeAt(s),
            r > 55295 && r < 57344) {
                if (!i) {
                    if (r > 56319) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        (t -= 3) > -1 && o.push(239, 191, 189);
                        continue
                    }
                    i = r;
                    continue
                }
                if (r < 56320) {
                    (t -= 3) > -1 && o.push(239, 191, 189),
                    i = r;
                    continue
                }
                r = 65536 + (i - 55296 << 10 | r - 56320)
            } else
                i && (t -= 3) > -1 && o.push(239, 191, 189);
            if (i = null,
            r < 128) {
                if ((t -= 1) < 0)
                    break;
                o.push(r)
            } else if (r < 2048) {
                if ((t -= 2) < 0)
                    break;
                o.push(r >> 6 | 192, 63 & r | 128)
            } else if (r < 65536) {
                if ((t -= 3) < 0)
                    break;
                o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
            } else {
                if (!(r < 1114112))
                    throw new Error("Invalid code point");
                if ((t -= 4) < 0)
                    break;
                o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
            }
        }
        return o
    }
    function G(e) {
        return t.toByteArray(function(e) {
            if ((e = (e = e.split("=")[0]).trim().replace(H, "")).length < 2)
                return "";
            for (; e.length % 4 != 0; )
                e += "=";
            return e
        }(e))
    }
    function W(e, t, r, n) {
        let i;
        for (i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i)
            t[i + r] = e[i];
        return i
    }
    function q(e, t) {
        return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
    }
    function Y(e) {
        return e != e
    }
    const K = function() {
        const e = "0123456789abcdef"
          , t = new Array(256);
        for (let r = 0; r < 16; ++r) {
            const n = 16 * r;
            for (let i = 0; i < 16; ++i)
                t[n + i] = e[r] + e[i]
        }
        return t
    }();
    function J(e) {
        return "undefined" == typeof BigInt ? Z : e
    }
    function Z() {
        throw new Error("BigInt not supported")
    }
}(buffer);
const {Buffer: Buffer$1} = buffer
  , symbol = Symbol.for("BufferList");
function BufferList$2(e) {
    if (!(this instanceof BufferList$2))
        return new BufferList$2(e);
    BufferList$2._init.call(this, e)
}
BufferList$2._init = function(e) {
    Object.defineProperty(this, symbol, {
        value: !0
    }),
    this._bufs = [],
    this.length = 0,
    e && this.append(e)
}
,
BufferList$2.prototype._new = function(e) {
    return new BufferList$2(e)
}
,
BufferList$2.prototype._offset = function(e) {
    if (0 === e)
        return [0, 0];
    let t = 0;
    for (let r = 0; r < this._bufs.length; r++) {
        const n = t + this._bufs[r].length;
        if (e < n || r === this._bufs.length - 1)
            return [r, e - t];
        t = n
    }
}
,
BufferList$2.prototype._reverseOffset = function(e) {
    const t = e[0];
    let r = e[1];
    for (let n = 0; n < t; n++)
        r += this._bufs[n].length;
    return r
}
,
BufferList$2.prototype.get = function(e) {
    if (e > this.length || e < 0)
        return;
    const t = this._offset(e);
    return this._bufs[t[0]][t[1]]
}
,
BufferList$2.prototype.slice = function(e, t) {
    return "number" == typeof e && e < 0 && (e += this.length),
    "number" == typeof t && t < 0 && (t += this.length),
    this.copy(null, 0, e, t)
}
,
BufferList$2.prototype.copy = function(e, t, r, n) {
    if (("number" != typeof r || r < 0) && (r = 0),
    ("number" != typeof n || n > this.length) && (n = this.length),
    r >= this.length)
        return e || Buffer$1.alloc(0);
    if (n <= 0)
        return e || Buffer$1.alloc(0);
    const i = !!e
      , o = this._offset(r)
      , s = n - r;
    let a = s
      , c = i && t || 0
      , u = o[1];
    if (0 === r && n === this.length) {
        if (!i)
            return 1 === this._bufs.length ? this._bufs[0] : Buffer$1.concat(this._bufs, this.length);
        for (let t = 0; t < this._bufs.length; t++)
            this._bufs[t].copy(e, c),
            c += this._bufs[t].length;
        return e
    }
    if (a <= this._bufs[o[0]].length - u)
        return i ? this._bufs[o[0]].copy(e, t, u, u + a) : this._bufs[o[0]].slice(u, u + a);
    i || (e = Buffer$1.allocUnsafe(s));
    for (let l = o[0]; l < this._bufs.length; l++) {
        const t = this._bufs[l].length - u;
        if (!(a > t)) {
            this._bufs[l].copy(e, c, u, u + a),
            c += t;
            break
        }
        this._bufs[l].copy(e, c, u),
        c += t,
        a -= t,
        u && (u = 0)
    }
    return e.length > c ? e.slice(0, c) : e
}
,
BufferList$2.prototype.shallowSlice = function(e, t) {
    if (e = e || 0,
    t = "number" != typeof t ? this.length : t,
    e < 0 && (e += this.length),
    t < 0 && (t += this.length),
    e === t)
        return this._new();
    const r = this._offset(e)
      , n = this._offset(t)
      , i = this._bufs.slice(r[0], n[0] + 1);
    return 0 === n[1] ? i.pop() : i[i.length - 1] = i[i.length - 1].slice(0, n[1]),
    0 !== r[1] && (i[0] = i[0].slice(r[1])),
    this._new(i)
}
,
BufferList$2.prototype.toString = function(e, t, r) {
    return this.slice(t, r).toString(e)
}
,
BufferList$2.prototype.consume = function(e) {
    if (e = Math.trunc(e),
    Number.isNaN(e) || e <= 0)
        return this;
    for (; this._bufs.length; ) {
        if (!(e >= this._bufs[0].length)) {
            this._bufs[0] = this._bufs[0].slice(e),
            this.length -= e;
            break
        }
        e -= this._bufs[0].length,
        this.length -= this._bufs[0].length,
        this._bufs.shift()
    }
    return this
}
,
BufferList$2.prototype.duplicate = function() {
    const e = this._new();
    for (let t = 0; t < this._bufs.length; t++)
        e.append(this._bufs[t]);
    return e
}
,
BufferList$2.prototype.append = function(e) {
    if (null == e)
        return this;
    if (e.buffer)
        this._appendBuffer(Buffer$1.from(e.buffer, e.byteOffset, e.byteLength));
    else if (Array.isArray(e))
        for (let t = 0; t < e.length; t++)
            this.append(e[t]);
    else if (this._isBufferList(e))
        for (let t = 0; t < e._bufs.length; t++)
            this.append(e._bufs[t]);
    else
        "number" == typeof e && (e = e.toString()),
        this._appendBuffer(Buffer$1.from(e));
    return this
}
,
BufferList$2.prototype._appendBuffer = function(e) {
    this._bufs.push(e),
    this.length += e.length
}
,
BufferList$2.prototype.indexOf = function(e, t, r) {
    if (void 0 === r && "string" == typeof t && (r = t,
    t = void 0),
    "function" == typeof e || Array.isArray(e))
        throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
    if ("number" == typeof e ? e = Buffer$1.from([e]) : "string" == typeof e ? e = Buffer$1.from(e, r) : this._isBufferList(e) ? e = e.slice() : Array.isArray(e.buffer) ? e = Buffer$1.from(e.buffer, e.byteOffset, e.byteLength) : Buffer$1.isBuffer(e) || (e = Buffer$1.from(e)),
    t = Number(t || 0),
    isNaN(t) && (t = 0),
    t < 0 && (t = this.length + t),
    t < 0 && (t = 0),
    0 === e.length)
        return t > this.length ? this.length : t;
    const n = this._offset(t);
    let i = n[0]
      , o = n[1];
    for (; i < this._bufs.length; i++) {
        const t = this._bufs[i];
        for (; o < t.length; ) {
            if (t.length - o >= e.length) {
                const r = t.indexOf(e, o);
                if (-1 !== r)
                    return this._reverseOffset([i, r]);
                o = t.length - e.length + 1
            } else {
                const t = this._reverseOffset([i, o]);
                if (this._match(t, e))
                    return t;
                o++
            }
        }
        o = 0
    }
    return -1
}
,
BufferList$2.prototype._match = function(e, t) {
    if (this.length - e < t.length)
        return !1;
    for (let r = 0; r < t.length; r++)
        if (this.get(e + r) !== t[r])
            return !1;
    return !0
}
,
function() {
    const e = {
        readDoubleBE: 8,
        readDoubleLE: 8,
        readFloatBE: 4,
        readFloatLE: 4,
        readInt32BE: 4,
        readInt32LE: 4,
        readUInt32BE: 4,
        readUInt32LE: 4,
        readInt16BE: 2,
        readInt16LE: 2,
        readUInt16BE: 2,
        readUInt16LE: 2,
        readInt8: 1,
        readUInt8: 1,
        readIntBE: null,
        readIntLE: null,
        readUIntBE: null,
        readUIntLE: null
    };
    for (const t in e)
        !function(t) {
            BufferList$2.prototype[t] = null === e[t] ? function(e, r) {
                return this.slice(e, e + r)[t](0, r)
            }
            : function(r=0) {
                return this.slice(r, r + e[t])[t](0)
            }
        }(t)
}(),
BufferList$2.prototype._isBufferList = function(e) {
    return e instanceof BufferList$2 || BufferList$2.isBufferList(e)
}
,
BufferList$2.isBufferList = function(e) {
    return null != e && e[symbol]
}
;
var BufferList_1 = BufferList$2;
class Rabin$1 {
    constructor(e, t=12, r=8192, n=32768, i=64, o) {
        this.bits = t,
        this.min = r,
        this.max = n,
        this.asModule = e,
        this.rabin = new e.Rabin(t,r,n,i,o),
        this.polynomial = o
    }
    fingerprint(e) {
        const {__retain: t, __release: r, __allocArray: n, __getInt32Array: i, Int32Array_ID: o, Uint8Array_ID: s} = this.asModule
          , a = t(n(o, new Int32Array(Math.ceil(e.length / this.min))))
          , c = t(n(s, e))
          , u = i(this.rabin.fingerprint(c, a));
        r(c),
        r(a);
        const l = u.indexOf(0);
        return l >= 0 ? u.subarray(0, l) : u
    }
}
var rabin$1 = Rabin$1
  , loader = {};
const ID_OFFSET = -8
  , SIZE_OFFSET = -4
  , ARRAYBUFFER_ID = 0
  , STRING_ID = 1
  , ARRAYBUFFERVIEW = 1
  , ARRAY = 2
  , VAL_ALIGN_OFFSET = 5
  , VAL_SIGNED = 1024
  , VAL_FLOAT = 2048
  , VAL_MANAGED = 8192
  , ARRAYBUFFERVIEW_BUFFER_OFFSET = 0
  , ARRAYBUFFERVIEW_DATASTART_OFFSET = 4
  , ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8
  , ARRAYBUFFERVIEW_SIZE = 12
  , ARRAY_LENGTH_OFFSET = 12
  , ARRAY_SIZE = 16
  , BIGINT = "undefined" != typeof BigUint64Array
  , THIS = Symbol()
  , CHUNKSIZE = 1024;
function getStringImpl(e, t) {
    const r = new Uint32Array(e)
      , n = new Uint16Array(e);
    var i = r[t + SIZE_OFFSET >>> 2] >>> 1
      , o = t >>> 1;
    if (i <= CHUNKSIZE)
        return String.fromCharCode.apply(String, n.subarray(o, o + i));
    const s = [];
    do {
        const e = n[o + CHUNKSIZE - 1]
          , t = e >= 55296 && e < 56320 ? CHUNKSIZE - 1 : CHUNKSIZE;
        s.push(String.fromCharCode.apply(String, n.subarray(o, o += t))),
        i -= t
    } while (i > CHUNKSIZE);
    return s.join("") + String.fromCharCode.apply(String, n.subarray(o, o + i))
}
function preInstantiate(e) {
    const t = {};
    function r(e, t) {
        return e ? getStringImpl(e.buffer, t) : "<yet unknown>"
    }
    const n = e.env = e.env || {};
    return n.abort = n.abort || function(e, i, o, s) {
        const a = t.memory || n.memory;
        throw Error("abort: " + r(a, e) + " at " + r(a, i) + ":" + o + ":" + s)
    }
    ,
    n.trace = n.trace || function(e, i) {
        const o = t.memory || n.memory;
        console.log("trace: " + r(o, e) + (i ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + i).join(", "))
    }
    ,
    e.Math = e.Math || Math,
    e.Date = e.Date || Date,
    t
}
function postInstantiate(e, t) {
    const r = t.exports
      , n = r.memory
      , i = r.table
      , o = r.__alloc
      , s = r.__retain
      , a = r.__rtti_base || -1;
    function c(e) {
        const t = new Uint32Array(n.buffer);
        if ((e >>>= 0) >= t[a >>> 2])
            throw Error("invalid id: " + e);
        return t[(a + 4 >>> 2) + 2 * e]
    }
    function u(e) {
        const t = new Uint32Array(n.buffer);
        if ((e >>>= 0) >= t[a >>> 2])
            throw Error("invalid id: " + e);
        return t[(a + 4 >>> 2) + 2 * e + 1]
    }
    function l(e) {
        return 31 - Math.clz32(e >>> VAL_ALIGN_OFFSET & 31)
    }
    function f(e, t, r) {
        const i = n.buffer;
        if (r)
            switch (e) {
            case 2:
                return new Float32Array(i);
            case 3:
                return new Float64Array(i)
            }
        else
            switch (e) {
            case 0:
                return new (t ? Int8Array : Uint8Array)(i);
            case 1:
                return new (t ? Int16Array : Uint16Array)(i);
            case 2:
                return new (t ? Int32Array : Uint32Array)(i);
            case 3:
                return new (t ? BigInt64Array : BigUint64Array)(i)
            }
        throw Error("unsupported align: " + e)
    }
    function h(e) {
        const t = new Uint32Array(n.buffer)
          , r = t[e + ID_OFFSET >>> 2]
          , i = c(r);
        if (!(i & ARRAYBUFFERVIEW))
            throw Error("not an array: " + r);
        const o = l(i);
        var s = t[e + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        const a = i & ARRAY ? t[e + ARRAY_LENGTH_OFFSET >>> 2] : t[s + SIZE_OFFSET >>> 2] >>> o;
        return f(o, i & VAL_SIGNED, i & VAL_FLOAT).subarray(s >>>= o, s + a)
    }
    function d(e, t, r) {
        return new e(p(e, t, r))
    }
    function p(e, t, r) {
        const i = n.buffer
          , o = new Uint32Array(i)
          , s = o[r + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        return new e(i,s,o[s + SIZE_OFFSET >>> 2] >>> t)
    }
    return e.__allocString = function(e) {
        const t = e.length
          , r = o(t << 1, STRING_ID)
          , i = new Uint16Array(n.buffer);
        for (var s = 0, a = r >>> 1; s < t; ++s)
            i[a + s] = e.charCodeAt(s);
        return r
    }
    ,
    e.__getString = function(e) {
        const t = n.buffer;
        if (new Uint32Array(t)[e + ID_OFFSET >>> 2] !== STRING_ID)
            throw Error("not a string: " + e);
        return getStringImpl(t, e)
    }
    ,
    e.__allocArray = function(e, t) {
        const r = c(e);
        if (!(r & (ARRAYBUFFERVIEW | ARRAY)))
            throw Error("not an array: " + e + " @ " + r);
        const i = l(r)
          , a = t.length
          , u = o(a << i, ARRAYBUFFER_ID)
          , h = o(r & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, e)
          , d = new Uint32Array(n.buffer);
        d[h + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = s(u),
        d[h + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = u,
        d[h + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = a << i,
        r & ARRAY && (d[h + ARRAY_LENGTH_OFFSET >>> 2] = a);
        const p = f(i, r & VAL_SIGNED, r & VAL_FLOAT);
        if (r & VAL_MANAGED)
            for (let n = 0; n < a; ++n)
                p[(u >>> i) + n] = s(t[n]);
        else
            p.set(t, u >>> i);
        return h
    }
    ,
    e.__getArrayView = h,
    e.__getArray = function(e) {
        const t = h(e)
          , r = t.length
          , n = new Array(r);
        for (let i = 0; i < r; i++)
            n[i] = t[i];
        return n
    }
    ,
    e.__getArrayBuffer = function(e) {
        const t = n.buffer
          , r = new Uint32Array(t)[e + SIZE_OFFSET >>> 2];
        return t.slice(e, e + r)
    }
    ,
    e.__getInt8Array = d.bind(null, Int8Array, 0),
    e.__getInt8ArrayView = p.bind(null, Int8Array, 0),
    e.__getUint8Array = d.bind(null, Uint8Array, 0),
    e.__getUint8ArrayView = p.bind(null, Uint8Array, 0),
    e.__getUint8ClampedArray = d.bind(null, Uint8ClampedArray, 0),
    e.__getUint8ClampedArrayView = p.bind(null, Uint8ClampedArray, 0),
    e.__getInt16Array = d.bind(null, Int16Array, 1),
    e.__getInt16ArrayView = p.bind(null, Int16Array, 1),
    e.__getUint16Array = d.bind(null, Uint16Array, 1),
    e.__getUint16ArrayView = p.bind(null, Uint16Array, 1),
    e.__getInt32Array = d.bind(null, Int32Array, 2),
    e.__getInt32ArrayView = p.bind(null, Int32Array, 2),
    e.__getUint32Array = d.bind(null, Uint32Array, 2),
    e.__getUint32ArrayView = p.bind(null, Uint32Array, 2),
    BIGINT && (e.__getInt64Array = d.bind(null, BigInt64Array, 3),
    e.__getInt64ArrayView = p.bind(null, BigInt64Array, 3),
    e.__getUint64Array = d.bind(null, BigUint64Array, 3),
    e.__getUint64ArrayView = p.bind(null, BigUint64Array, 3)),
    e.__getFloat32Array = d.bind(null, Float32Array, 2),
    e.__getFloat32ArrayView = p.bind(null, Float32Array, 2),
    e.__getFloat64Array = d.bind(null, Float64Array, 3),
    e.__getFloat64ArrayView = p.bind(null, Float64Array, 3),
    e.__instanceof = function(e, t) {
        const r = new Uint32Array(n.buffer);
        var i = r[e + ID_OFFSET >>> 2];
        if (i <= r[a >>> 2])
            do {
                if (i == t)
                    return !0
            } while (i = u(i));
        return !1
    }
    ,
    e.memory = e.memory || n,
    e.table = e.table || i,
    demangle(r, e)
}
function isResponse(e) {
    return "undefined" != typeof Response && e instanceof Response
}
async function instantiate$1(e, t) {
    return isResponse(e = await e) ? instantiateStreaming(e, t) : postInstantiate(preInstantiate(t || (t = {})), await WebAssembly.instantiate(e instanceof WebAssembly.Module ? e : await WebAssembly.compile(e), t))
}
function instantiateSync(e, t) {
    return postInstantiate(preInstantiate(t || (t = {})), new WebAssembly.Instance(e instanceof WebAssembly.Module ? e : new WebAssembly.Module(e),t))
}
async function instantiateStreaming(e, t) {
    return WebAssembly.instantiateStreaming ? postInstantiate(preInstantiate(t || (t = {})), (await WebAssembly.instantiateStreaming(e, t)).instance) : instantiate$1(isResponse(e = await e) ? e.arrayBuffer() : e, t)
}
function demangle(e, t) {
    var r = t ? Object.create(t) : {}
      , n = e.__argumentsLength ? function(t) {
        e.__argumentsLength.value = t
    }
    : e.__setArgumentsLength || e.__setargc || function() {}
    ;
    for (let i in e) {
        if (!Object.prototype.hasOwnProperty.call(e, i))
            continue;
        const t = e[i];
        let o = i.split(".")
          , s = r;
        for (; o.length > 1; ) {
            let e = o.shift();
            Object.prototype.hasOwnProperty.call(s, e) || (s[e] = {}),
            s = s[e]
        }
        let a = o[0]
          , c = a.indexOf("#");
        if (c >= 0) {
            let r = a.substring(0, c)
              , o = s[r];
            if (void 0 === o || !o.prototype) {
                let e = function(...t) {
                    return e.wrap(e.prototype.constructor(0, ...t))
                };
                e.prototype = {
                    valueOf: function() {
                        return this[THIS]
                    }
                },
                e.wrap = function(t) {
                    return Object.create(e.prototype, {
                        [THIS]: {
                            value: t,
                            writable: !1
                        }
                    })
                }
                ,
                o && Object.getOwnPropertyNames(o).forEach((t=>Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t)))),
                s[r] = e
            }
            if (a = a.substring(c + 1),
            s = s[r].prototype,
            /^(get|set):/.test(a)) {
                if (!Object.prototype.hasOwnProperty.call(s, a = a.substring(4))) {
                    let t = e[i.replace("set:", "get:")]
                      , r = e[i.replace("get:", "set:")];
                    Object.defineProperty(s, a, {
                        get: function() {
                            return t(this[THIS])
                        },
                        set: function(e) {
                            r(this[THIS], e)
                        },
                        enumerable: !0
                    })
                }
            } else
                "constructor" === a ? (s[a] = (...e)=>(n(e.length),
                t(...e))).original = t : (s[a] = function(...e) {
                    return n(e.length),
                    t(this[THIS], ...e)
                }
                ).original = t
        } else
            /^(get|set):/.test(a) ? Object.prototype.hasOwnProperty.call(s, a = a.substring(4)) || Object.defineProperty(s, a, {
                get: e[i.replace("set:", "get:")],
                set: e[i.replace("get:", "set:")],
                enumerable: !0
            }) : "function" == typeof t && t !== n ? (s[a] = (...e)=>(n(e.length),
            t(...e))).original = t : s[a] = t
    }
    return r
}
loader.instantiate = instantiate$1,
loader.instantiateSync = instantiateSync,
loader.instantiateStreaming = instantiateStreaming,
loader.demangle = demangle;
const {instantiate: instantiate} = loader;
function loadWebAssembly(e={}) {
    if (!loadWebAssembly.supported)
        return null;
    var t = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 78, 14, 96, 2, 127, 126, 0, 96, 1, 127, 1, 126, 96, 2, 127, 127, 0, 96, 1, 127, 1, 127, 96, 1, 127, 0, 96, 2, 127, 127, 1, 127, 96, 3, 127, 127, 127, 1, 127, 96, 0, 0, 96, 3, 127, 127, 127, 0, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 0, 96, 5, 127, 127, 127, 127, 127, 1, 127, 96, 1, 126, 1, 127, 96, 2, 126, 126, 1, 126, 2, 13, 1, 3, 101, 110, 118, 5, 97, 98, 111, 114, 116, 0, 10, 3, 54, 53, 2, 2, 8, 9, 3, 5, 2, 8, 6, 5, 3, 4, 2, 6, 9, 12, 13, 2, 5, 11, 3, 2, 3, 2, 3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 6, 7, 7, 4, 4, 5, 3, 1, 0, 1, 6, 47, 9, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 3, 11, 127, 0, 65, 4, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 240, 2, 11, 127, 0, 65, 6, 11, 7, 240, 5, 41, 6, 109, 101, 109, 111, 114, 121, 2, 0, 7, 95, 95, 97, 108, 108, 111, 99, 0, 10, 8, 95, 95, 114, 101, 116, 97, 105, 110, 0, 11, 9, 95, 95, 114, 101, 108, 101, 97, 115, 101, 0, 12, 9, 95, 95, 99, 111, 108, 108, 101, 99, 116, 0, 51, 11, 95, 95, 114, 116, 116, 105, 95, 98, 97, 115, 101, 3, 7, 13, 73, 110, 116, 51, 50, 65, 114, 114, 97, 121, 95, 73, 68, 3, 2, 13, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 95, 73, 68, 3, 3, 6, 100, 101, 103, 114, 101, 101, 0, 16, 3, 109, 111, 100, 0, 17, 5, 82, 97, 98, 105, 110, 3, 8, 16, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 105, 110, 100, 111, 119, 0, 21, 16, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 105, 110, 100, 111, 119, 0, 22, 21, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 105, 110, 100, 111, 119, 95, 115, 105, 122, 101, 0, 23, 21, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 105, 110, 100, 111, 119, 95, 115, 105, 122, 101, 0, 24, 14, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 112, 111, 115, 0, 25, 14, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 112, 111, 115, 0, 26, 15, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 111, 117, 110, 116, 0, 27, 15, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 111, 117, 110, 116, 0, 28, 13, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 112, 111, 115, 0, 29, 13, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 112, 111, 115, 0, 30, 15, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 115, 116, 97, 114, 116, 0, 31, 15, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 115, 116, 97, 114, 116, 0, 32, 16, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 100, 105, 103, 101, 115, 116, 0, 33, 16, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 100, 105, 103, 101, 115, 116, 0, 34, 21, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 115, 116, 97, 114, 116, 0, 35, 21, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 115, 116, 97, 114, 116, 0, 36, 22, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 108, 101, 110, 103, 116, 104, 0, 37, 22, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 108, 101, 110, 103, 116, 104, 0, 38, 31, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 99, 117, 116, 95, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 39, 31, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 99, 117, 116, 95, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 40, 20, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 112, 111, 108, 121, 110, 111, 109, 105, 97, 108, 0, 41, 20, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 112, 111, 108, 121, 110, 111, 109, 105, 97, 108, 0, 42, 17, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 105, 110, 115, 105, 122, 101, 0, 43, 17, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 105, 110, 115, 105, 122, 101, 0, 44, 17, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 97, 120, 115, 105, 122, 101, 0, 45, 17, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 97, 120, 115, 105, 122, 101, 0, 46, 14, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 97, 115, 107, 0, 47, 14, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 97, 115, 107, 0, 48, 17, 82, 97, 98, 105, 110, 35, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 0, 20, 17, 82, 97, 98, 105, 110, 35, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 49, 8, 1, 50, 10, 165, 31, 53, 199, 1, 1, 4, 127, 32, 1, 40, 2, 0, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 33, 4, 65, 0, 5, 32, 2, 65, 31, 32, 2, 103, 107, 34, 3, 65, 4, 107, 118, 65, 16, 115, 33, 4, 32, 3, 65, 7, 107, 11, 33, 3, 32, 1, 40, 2, 20, 33, 2, 32, 1, 40, 2, 16, 34, 5, 4, 64, 32, 5, 32, 2, 54, 2, 20, 11, 32, 2, 4, 64, 32, 2, 32, 5, 54, 2, 16, 11, 32, 1, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 70, 4, 64, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 32, 2, 54, 2, 96, 32, 2, 69, 4, 64, 32, 0, 32, 3, 65, 2, 116, 106, 32, 0, 32, 3, 65, 2, 116, 106, 40, 2, 4, 65, 1, 32, 4, 116, 65, 127, 115, 113, 34, 1, 54, 2, 4, 32, 1, 69, 4, 64, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 3, 116, 65, 127, 115, 113, 54, 2, 0, 11, 11, 11, 11, 226, 2, 1, 6, 127, 32, 1, 40, 2, 0, 33, 3, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 34, 5, 65, 1, 113, 4, 64, 32, 3, 65, 124, 113, 65, 16, 106, 32, 5, 65, 124, 113, 106, 34, 2, 65, 240, 255, 255, 255, 3, 73, 4, 64, 32, 0, 32, 4, 16, 1, 32, 1, 32, 2, 32, 3, 65, 3, 113, 114, 34, 3, 54, 2, 0, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 33, 5, 11, 11, 32, 3, 65, 2, 113, 4, 64, 32, 1, 65, 4, 107, 40, 2, 0, 34, 2, 40, 2, 0, 34, 6, 65, 124, 113, 65, 16, 106, 32, 3, 65, 124, 113, 106, 34, 7, 65, 240, 255, 255, 255, 3, 73, 4, 64, 32, 0, 32, 2, 16, 1, 32, 2, 32, 7, 32, 6, 65, 3, 113, 114, 34, 3, 54, 2, 0, 32, 2, 33, 1, 11, 11, 32, 4, 32, 5, 65, 2, 114, 54, 2, 0, 32, 4, 65, 4, 107, 32, 1, 54, 2, 0, 32, 0, 32, 3, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 33, 4, 65, 0, 5, 32, 2, 65, 31, 32, 2, 103, 107, 34, 2, 65, 4, 107, 118, 65, 16, 115, 33, 4, 32, 2, 65, 7, 107, 11, 34, 3, 65, 4, 116, 32, 4, 106, 65, 2, 116, 106, 40, 2, 96, 33, 2, 32, 1, 65, 0, 54, 2, 16, 32, 1, 32, 2, 54, 2, 20, 32, 2, 4, 64, 32, 2, 32, 1, 54, 2, 16, 11, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 32, 1, 54, 2, 96, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 3, 116, 114, 54, 2, 0, 32, 0, 32, 3, 65, 2, 116, 106, 32, 0, 32, 3, 65, 2, 116, 106, 40, 2, 4, 65, 1, 32, 4, 116, 114, 54, 2, 4, 11, 119, 1, 1, 127, 32, 2, 2, 127, 32, 0, 40, 2, 160, 12, 34, 2, 4, 64, 32, 2, 32, 1, 65, 16, 107, 70, 4, 64, 32, 2, 40, 2, 0, 33, 3, 32, 1, 65, 16, 107, 33, 1, 11, 11, 32, 1, 11, 107, 34, 2, 65, 48, 73, 4, 64, 15, 11, 32, 1, 32, 3, 65, 2, 113, 32, 2, 65, 32, 107, 65, 1, 114, 114, 54, 2, 0, 32, 1, 65, 0, 54, 2, 16, 32, 1, 65, 0, 54, 2, 20, 32, 1, 32, 2, 106, 65, 16, 107, 34, 2, 65, 2, 54, 2, 0, 32, 0, 32, 2, 54, 2, 160, 12, 32, 0, 32, 1, 16, 2, 11, 155, 1, 1, 3, 127, 35, 0, 34, 0, 69, 4, 64, 65, 1, 63, 0, 34, 0, 74, 4, 127, 65, 1, 32, 0, 107, 64, 0, 65, 0, 72, 5, 65, 0, 11, 4, 64, 0, 11, 65, 176, 3, 34, 0, 65, 0, 54, 2, 0, 65, 208, 15, 65, 0, 54, 2, 0, 3, 64, 32, 1, 65, 23, 73, 4, 64, 32, 1, 65, 2, 116, 65, 176, 3, 106, 65, 0, 54, 2, 4, 65, 0, 33, 2, 3, 64, 32, 2, 65, 16, 73, 4, 64, 32, 1, 65, 4, 116, 32, 2, 106, 65, 2, 116, 65, 176, 3, 106, 65, 0, 54, 2, 96, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 65, 176, 3, 65, 224, 15, 63, 0, 65, 16, 116, 16, 3, 65, 176, 3, 36, 0, 11, 32, 0, 11, 45, 0, 32, 0, 65, 240, 255, 255, 255, 3, 79, 4, 64, 65, 32, 65, 224, 0, 65, 201, 3, 65, 29, 16, 0, 0, 11, 32, 0, 65, 15, 106, 65, 112, 113, 34, 0, 65, 16, 32, 0, 65, 16, 75, 27, 11, 169, 1, 1, 1, 127, 32, 0, 32, 1, 65, 128, 2, 73, 4, 127, 32, 1, 65, 4, 118, 33, 1, 65, 0, 5, 32, 1, 65, 248, 255, 255, 255, 1, 73, 4, 64, 32, 1, 65, 1, 65, 27, 32, 1, 103, 107, 116, 106, 65, 1, 107, 33, 1, 11, 32, 1, 65, 31, 32, 1, 103, 107, 34, 2, 65, 4, 107, 118, 65, 16, 115, 33, 1, 32, 2, 65, 7, 107, 11, 34, 2, 65, 2, 116, 106, 40, 2, 4, 65, 127, 32, 1, 116, 113, 34, 1, 4, 127, 32, 0, 32, 1, 104, 32, 2, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 32, 0, 40, 2, 0, 65, 127, 32, 2, 65, 1, 106, 116, 113, 34, 1, 4, 127, 32, 0, 32, 0, 32, 1, 104, 34, 0, 65, 2, 116, 106, 40, 2, 4, 104, 32, 0, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 65, 0, 11, 11, 11, 111, 1, 1, 127, 63, 0, 34, 2, 32, 1, 65, 248, 255, 255, 255, 1, 73, 4, 127, 32, 1, 65, 1, 65, 27, 32, 1, 103, 107, 116, 65, 1, 107, 106, 5, 32, 1, 11, 65, 16, 32, 0, 40, 2, 160, 12, 32, 2, 65, 16, 116, 65, 16, 107, 71, 116, 106, 65, 255, 255, 3, 106, 65, 128, 128, 124, 113, 65, 16, 118, 34, 1, 32, 2, 32, 1, 74, 27, 64, 0, 65, 0, 72, 4, 64, 32, 1, 64, 0, 65, 0, 72, 4, 64, 0, 11, 11, 32, 0, 32, 2, 65, 16, 116, 63, 0, 65, 16, 116, 16, 3, 11, 113, 1, 2, 127, 32, 1, 40, 2, 0, 34, 3, 65, 124, 113, 32, 2, 107, 34, 4, 65, 32, 79, 4, 64, 32, 1, 32, 2, 32, 3, 65, 2, 113, 114, 54, 2, 0, 32, 2, 32, 1, 65, 16, 106, 106, 34, 1, 32, 4, 65, 16, 107, 65, 1, 114, 54, 2, 0, 32, 0, 32, 1, 16, 2, 5, 32, 1, 32, 3, 65, 126, 113, 54, 2, 0, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 40, 2, 0, 65, 125, 113, 54, 2, 0, 11, 11, 91, 1, 2, 127, 32, 0, 32, 1, 16, 5, 34, 4, 16, 6, 34, 3, 69, 4, 64, 65, 1, 36, 1, 65, 0, 36, 1, 32, 0, 32, 4, 16, 6, 34, 3, 69, 4, 64, 32, 0, 32, 4, 16, 7, 32, 0, 32, 4, 16, 6, 33, 3, 11, 11, 32, 3, 65, 0, 54, 2, 4, 32, 3, 32, 2, 54, 2, 8, 32, 3, 32, 1, 54, 2, 12, 32, 0, 32, 3, 16, 1, 32, 0, 32, 3, 32, 4, 16, 8, 32, 3, 11, 13, 0, 16, 4, 32, 0, 32, 1, 16, 9, 65, 16, 106, 11, 33, 1, 1, 127, 32, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 11, 18, 0, 32, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 16, 52, 11, 11, 140, 3, 1, 1, 127, 2, 64, 32, 1, 69, 13, 0, 32, 0, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 65, 1, 107, 65, 0, 58, 0, 0, 32, 1, 65, 2, 77, 13, 0, 32, 0, 65, 1, 106, 65, 0, 58, 0, 0, 32, 0, 65, 2, 106, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 34, 2, 65, 2, 107, 65, 0, 58, 0, 0, 32, 2, 65, 3, 107, 65, 0, 58, 0, 0, 32, 1, 65, 6, 77, 13, 0, 32, 0, 65, 3, 106, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 65, 4, 107, 65, 0, 58, 0, 0, 32, 1, 65, 8, 77, 13, 0, 32, 1, 65, 0, 32, 0, 107, 65, 3, 113, 34, 1, 107, 33, 2, 32, 0, 32, 1, 106, 34, 0, 65, 0, 54, 2, 0, 32, 0, 32, 2, 65, 124, 113, 34, 1, 106, 65, 4, 107, 65, 0, 54, 2, 0, 32, 1, 65, 8, 77, 13, 0, 32, 0, 65, 4, 106, 65, 0, 54, 2, 0, 32, 0, 65, 8, 106, 65, 0, 54, 2, 0, 32, 0, 32, 1, 106, 34, 2, 65, 12, 107, 65, 0, 54, 2, 0, 32, 2, 65, 8, 107, 65, 0, 54, 2, 0, 32, 1, 65, 24, 77, 13, 0, 32, 0, 65, 12, 106, 65, 0, 54, 2, 0, 32, 0, 65, 16, 106, 65, 0, 54, 2, 0, 32, 0, 65, 20, 106, 65, 0, 54, 2, 0, 32, 0, 65, 24, 106, 65, 0, 54, 2, 0, 32, 0, 32, 1, 106, 34, 2, 65, 28, 107, 65, 0, 54, 2, 0, 32, 2, 65, 24, 107, 65, 0, 54, 2, 0, 32, 2, 65, 20, 107, 65, 0, 54, 2, 0, 32, 2, 65, 16, 107, 65, 0, 54, 2, 0, 32, 0, 32, 0, 65, 4, 113, 65, 24, 106, 34, 2, 106, 33, 0, 32, 1, 32, 2, 107, 33, 1, 3, 64, 32, 1, 65, 32, 79, 4, 64, 32, 0, 66, 0, 55, 3, 0, 32, 0, 65, 8, 106, 66, 0, 55, 3, 0, 32, 0, 65, 16, 106, 66, 0, 55, 3, 0, 32, 0, 65, 24, 106, 66, 0, 55, 3, 0, 32, 1, 65, 32, 107, 33, 1, 32, 0, 65, 32, 106, 33, 0, 12, 1, 11, 11, 11, 11, 178, 1, 1, 3, 127, 32, 1, 65, 240, 255, 255, 255, 3, 32, 2, 118, 75, 4, 64, 65, 144, 1, 65, 192, 1, 65, 23, 65, 56, 16, 0, 0, 11, 32, 1, 32, 2, 116, 34, 3, 65, 0, 16, 10, 34, 2, 32, 3, 16, 13, 32, 0, 69, 4, 64, 65, 12, 65, 2, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 11, 32, 0, 65, 0, 54, 2, 0, 32, 0, 65, 0, 54, 2, 4, 32, 0, 65, 0, 54, 2, 8, 32, 2, 34, 1, 32, 0, 40, 2, 0, 34, 4, 71, 4, 64, 32, 1, 65, 172, 3, 75, 4, 64, 32, 1, 65, 16, 107, 34, 5, 32, 5, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 4, 16, 12, 11, 32, 0, 32, 1, 54, 2, 0, 32, 0, 32, 2, 54, 2, 4, 32, 0, 32, 3, 54, 2, 8, 32, 0, 11, 46, 1, 2, 127, 65, 12, 65, 5, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 65, 128, 2, 65, 3, 16, 14, 11, 9, 0, 65, 63, 32, 0, 121, 167, 107, 11, 49, 1, 2, 127, 65, 63, 32, 1, 121, 167, 107, 33, 2, 3, 64, 65, 63, 32, 0, 121, 167, 107, 32, 2, 107, 34, 3, 65, 0, 78, 4, 64, 32, 0, 32, 1, 32, 3, 172, 134, 133, 33, 0, 12, 1, 11, 11, 32, 0, 11, 40, 0, 32, 1, 32, 0, 40, 2, 8, 79, 4, 64, 65, 128, 2, 65, 192, 2, 65, 163, 1, 65, 44, 16, 0, 0, 11, 32, 1, 32, 0, 40, 2, 4, 106, 65, 0, 58, 0, 0, 11, 38, 0, 32, 1, 32, 0, 40, 2, 8, 79, 4, 64, 65, 128, 2, 65, 192, 2, 65, 152, 1, 65, 44, 16, 0, 0, 11, 32, 1, 32, 0, 40, 2, 4, 106, 45, 0, 0, 11, 254, 5, 2, 1, 127, 4, 126, 32, 0, 69, 4, 64, 65, 232, 0, 65, 6, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 5, 32, 5, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 11, 32, 0, 65, 0, 54, 2, 0, 32, 0, 65, 0, 54, 2, 4, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 24, 32, 0, 66, 0, 55, 3, 32, 32, 0, 66, 0, 55, 3, 40, 32, 0, 66, 0, 55, 3, 48, 32, 0, 66, 0, 55, 3, 56, 32, 0, 66, 0, 55, 3, 64, 32, 0, 66, 0, 55, 3, 72, 32, 0, 66, 0, 55, 3, 80, 32, 0, 66, 0, 55, 3, 88, 32, 0, 66, 0, 55, 3, 96, 32, 0, 32, 2, 173, 55, 3, 80, 32, 0, 32, 3, 173, 55, 3, 88, 65, 12, 65, 4, 16, 10, 34, 2, 65, 172, 3, 75, 4, 64, 32, 2, 65, 16, 107, 34, 3, 32, 3, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 32, 4, 65, 0, 16, 14, 33, 2, 32, 0, 40, 2, 0, 16, 12, 32, 0, 32, 2, 54, 2, 0, 32, 0, 32, 4, 54, 2, 4, 32, 0, 66, 1, 32, 1, 173, 134, 66, 1, 125, 55, 3, 96, 32, 0, 66, 243, 130, 183, 218, 216, 230, 232, 30, 55, 3, 72, 35, 4, 69, 4, 64, 65, 0, 33, 2, 3, 64, 32, 2, 65, 128, 2, 72, 4, 64, 32, 2, 65, 255, 1, 113, 173, 33, 6, 32, 0, 41, 3, 72, 34, 7, 33, 8, 65, 63, 32, 7, 121, 167, 107, 33, 1, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 1, 107, 34, 3, 65, 0, 78, 4, 64, 32, 6, 32, 8, 32, 3, 172, 134, 133, 33, 6, 12, 1, 11, 11, 65, 0, 33, 4, 3, 64, 32, 4, 32, 0, 40, 2, 4, 65, 1, 107, 72, 4, 64, 32, 6, 66, 8, 134, 33, 6, 32, 0, 41, 3, 72, 34, 7, 33, 8, 65, 63, 32, 7, 121, 167, 107, 33, 1, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 1, 107, 34, 3, 65, 0, 78, 4, 64, 32, 6, 32, 8, 32, 3, 172, 134, 133, 33, 6, 12, 1, 11, 11, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 35, 6, 40, 2, 4, 32, 2, 65, 3, 116, 106, 32, 6, 55, 3, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 65, 63, 32, 0, 41, 3, 72, 121, 167, 107, 172, 33, 7, 65, 0, 33, 2, 3, 64, 32, 2, 65, 128, 2, 72, 4, 64, 35, 5, 33, 1, 32, 2, 172, 32, 7, 134, 34, 8, 33, 6, 65, 63, 32, 0, 41, 3, 72, 34, 9, 121, 167, 107, 33, 3, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 3, 107, 34, 4, 65, 0, 78, 4, 64, 32, 6, 32, 9, 32, 4, 172, 134, 133, 33, 6, 12, 1, 11, 11, 32, 1, 40, 2, 4, 32, 2, 65, 3, 116, 106, 32, 6, 32, 8, 132, 55, 3, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 65, 1, 36, 4, 11, 32, 0, 66, 0, 55, 3, 24, 32, 0, 66, 0, 55, 3, 32, 65, 0, 33, 2, 3, 64, 32, 2, 32, 0, 40, 2, 4, 72, 4, 64, 32, 0, 40, 2, 0, 32, 2, 16, 18, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 0, 66, 0, 55, 3, 40, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 40, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 1, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 65, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 1, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 6, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 6, 66, 8, 134, 66, 1, 132, 133, 55, 3, 40, 32, 0, 11, 38, 1, 1, 127, 32, 0, 40, 2, 0, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 11, 55, 1, 2, 127, 32, 1, 32, 0, 40, 2, 0, 34, 2, 71, 4, 64, 32, 1, 65, 172, 3, 75, 4, 64, 32, 1, 65, 16, 107, 34, 3, 32, 3, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 16, 12, 11, 32, 0, 32, 1, 54, 2, 0, 11, 7, 0, 32, 0, 40, 2, 4, 11, 9, 0, 32, 0, 32, 1, 54, 2, 4, 11, 7, 0, 32, 0, 40, 2, 8, 11, 9, 0, 32, 0, 32, 1, 54, 2, 8, 11, 7, 0, 32, 0, 41, 3, 16, 11, 9, 0, 32, 0, 32, 1, 55, 3, 16, 11, 7, 0, 32, 0, 41, 3, 24, 11, 9, 0, 32, 0, 32, 1, 55, 3, 24, 11, 7, 0, 32, 0, 41, 3, 32, 11, 9, 0, 32, 0, 32, 1, 55, 3, 32, 11, 7, 0, 32, 0, 41, 3, 40, 11, 9, 0, 32, 0, 32, 1, 55, 3, 40, 11, 7, 0, 32, 0, 41, 3, 48, 11, 9, 0, 32, 0, 32, 1, 55, 3, 48, 11, 7, 0, 32, 0, 41, 3, 56, 11, 9, 0, 32, 0, 32, 1, 55, 3, 56, 11, 7, 0, 32, 0, 41, 3, 64, 11, 9, 0, 32, 0, 32, 1, 55, 3, 64, 11, 7, 0, 32, 0, 41, 3, 72, 11, 9, 0, 32, 0, 32, 1, 55, 3, 72, 11, 7, 0, 32, 0, 41, 3, 80, 11, 9, 0, 32, 0, 32, 1, 55, 3, 80, 11, 7, 0, 32, 0, 41, 3, 88, 11, 9, 0, 32, 0, 32, 1, 55, 3, 88, 11, 7, 0, 32, 0, 41, 3, 96, 11, 9, 0, 32, 0, 32, 1, 55, 3, 96, 11, 172, 4, 2, 5, 127, 1, 126, 32, 2, 65, 172, 3, 75, 4, 64, 32, 2, 65, 16, 107, 34, 4, 32, 4, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 33, 4, 65, 0, 33, 2, 32, 1, 40, 2, 8, 33, 5, 32, 1, 40, 2, 4, 33, 6, 3, 64, 2, 127, 65, 0, 33, 3, 3, 64, 32, 3, 32, 5, 72, 4, 64, 32, 3, 32, 6, 106, 45, 0, 0, 33, 1, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 7, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 32, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 7, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 8, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 1, 173, 32, 8, 66, 8, 134, 132, 133, 55, 3, 40, 32, 0, 32, 0, 41, 3, 16, 66, 1, 124, 55, 3, 16, 32, 0, 32, 0, 41, 3, 24, 66, 1, 124, 55, 3, 24, 32, 0, 41, 3, 16, 32, 0, 41, 3, 80, 90, 4, 127, 32, 0, 41, 3, 40, 32, 0, 41, 3, 96, 131, 80, 5, 65, 0, 11, 4, 127, 65, 1, 5, 32, 0, 41, 3, 16, 32, 0, 41, 3, 88, 90, 11, 4, 64, 32, 0, 32, 0, 41, 3, 32, 55, 3, 48, 32, 0, 32, 0, 41, 3, 16, 55, 3, 56, 32, 0, 32, 0, 41, 3, 40, 55, 3, 64, 65, 0, 33, 1, 3, 64, 32, 1, 32, 0, 40, 2, 4, 72, 4, 64, 32, 0, 40, 2, 0, 32, 1, 16, 18, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 32, 0, 66, 0, 55, 3, 40, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 40, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 1, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 65, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 1, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 8, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 8, 66, 8, 134, 66, 1, 132, 133, 55, 3, 40, 32, 3, 65, 1, 106, 12, 3, 11, 32, 3, 65, 1, 106, 33, 3, 12, 1, 11, 11, 65, 127, 11, 34, 1, 65, 0, 78, 4, 64, 32, 5, 32, 1, 107, 33, 5, 32, 1, 32, 6, 106, 33, 6, 32, 2, 34, 1, 65, 1, 106, 33, 2, 32, 4, 40, 2, 4, 32, 1, 65, 2, 116, 106, 32, 0, 41, 3, 56, 62, 2, 0, 12, 1, 11, 11, 32, 4, 11, 10, 0, 16, 15, 36, 5, 16, 15, 36, 6, 11, 3, 0, 1, 11, 73, 1, 2, 127, 32, 0, 40, 2, 4, 34, 1, 65, 255, 255, 255, 255, 0, 113, 34, 2, 65, 1, 70, 4, 64, 32, 0, 65, 16, 106, 16, 53, 32, 0, 32, 0, 40, 2, 0, 65, 1, 114, 54, 2, 0, 35, 0, 32, 0, 16, 2, 5, 32, 0, 32, 2, 65, 1, 107, 32, 1, 65, 128, 128, 128, 128, 127, 113, 114, 54, 2, 4, 11, 11, 58, 0, 2, 64, 2, 64, 2, 64, 32, 0, 65, 8, 107, 40, 2, 0, 14, 7, 0, 0, 1, 1, 1, 1, 1, 2, 11, 15, 11, 32, 0, 40, 2, 0, 34, 0, 4, 64, 32, 0, 65, 172, 3, 79, 4, 64, 32, 0, 65, 16, 107, 16, 52, 11, 11, 15, 11, 0, 11, 11, 137, 3, 7, 0, 65, 16, 11, 55, 40, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 40, 0, 0, 0, 97, 0, 108, 0, 108, 0, 111, 0, 99, 0, 97, 0, 116, 0, 105, 0, 111, 0, 110, 0, 32, 0, 116, 0, 111, 0, 111, 0, 32, 0, 108, 0, 97, 0, 114, 0, 103, 0, 101, 0, 65, 208, 0, 11, 45, 30, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 108, 0, 115, 0, 102, 0, 46, 0, 116, 0, 115, 0, 65, 128, 1, 11, 43, 28, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 28, 0, 0, 0, 73, 0, 110, 0, 118, 0, 97, 0, 108, 0, 105, 0, 100, 0, 32, 0, 108, 0, 101, 0, 110, 0, 103, 0, 116, 0, 104, 0, 65, 176, 1, 11, 53, 38, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 98, 0, 117, 0, 102, 0, 102, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 240, 1, 11, 51, 36, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 36, 0, 0, 0, 73, 0, 110, 0, 100, 0, 101, 0, 120, 0, 32, 0, 111, 0, 117, 0, 116, 0, 32, 0, 111, 0, 102, 0, 32, 0, 114, 0, 97, 0, 110, 0, 103, 0, 101, 0, 65, 176, 2, 11, 51, 36, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 36, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 116, 0, 121, 0, 112, 0, 101, 0, 100, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 46, 0, 116, 0, 115, 0, 65, 240, 2, 11, 53, 7, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 145, 4, 0, 0, 2, 0, 0, 0, 49, 0, 0, 0, 2, 0, 0, 0, 17, 1, 0, 0, 2, 0, 0, 0, 16, 0, 34, 16, 115, 111, 117, 114, 99, 101, 77, 97, 112, 112, 105, 110, 103, 85, 82, 76, 16, 46, 47, 114, 97, 98, 105, 110, 46, 119, 97, 115, 109, 46, 109, 97, 112]);
    return instantiate(new Response(new Blob([t],{
        type: "application/wasm"
    })), e)
}
loadWebAssembly.supported = "undefined" != typeof WebAssembly;
var rabinWasm = loadWebAssembly;
const Rabin = rabin$1
  , getRabin = rabinWasm
  , create$1 = async(e,t,r,n,i)=>{
    const o = await getRabin();
    return new Rabin(o,e,t,r,n,i)
}
;
var src$2 = {
    Rabin: Rabin,
    create: create$1
};
const BufferList$1 = BufferList_1
  , {create: create} = src$2
  , errcode = errCode$3;
var rabin_1 = async function*(e, t) {
    let r, n, i;
    if (t.minChunkSize && t.maxChunkSize && t.avgChunkSize)
        i = t.avgChunkSize,
        r = t.minChunkSize,
        n = t.maxChunkSize;
    else {
        if (!t.avgChunkSize)
            throw errcode(new Error("please specify an average chunk size"), "ERR_INVALID_AVG_CHUNK_SIZE");
        i = t.avgChunkSize,
        r = i / 3,
        n = i + i / 2
    }
    if (r < 16)
        throw errcode(new Error("rabin min must be greater than 16"), "ERR_INVALID_MIN_CHUNK_SIZE");
    n < r && (n = r),
    i < r && (i = r);
    const o = Math.floor(Math.log2(i));
    for await(const s of rabin(e, {
        min: r,
        max: n,
        bits: o,
        window: t.window,
        polynomial: t.polynomial
    }))
        yield s
};
async function *rabin(e, t) {
    const r = await create(t.bits, t.min, t.max, t.window)
      , n = new BufferList$1;
    for await(const i of e) {
        n.append(i);
        const e = r.fingerprint(i);
        for (let t = 0; t < e.length; t++) {
            const r = e[t]
              , i = n.slice(0, r);
            n.consume(r),
            yield i
        }
    }
    n.length && (yield n.slice(0))
}
const BufferList = BufferList_1;
var fixedSize = async function*(e, t) {
    let r = new BufferList
      , n = 0
      , i = !1;
    const o = t.maxChunkSize;
    for await(const s of e)
        for (r.append(s),
        n += s.length; n >= o; )
            if (yield r.slice(0, o),
            i = !0,
            o === r.length)
                r = new BufferList,
                n = 0;
            else {
                const e = new BufferList;
                e.append(r.shallowSlice(o)),
                r = e,
                n -= o
            }
    i && !n || (yield r.slice(0, n))
};
const errCode$1 = errCode$3
  , uint8ArrayFromString$1 = fromString_1;
async function *validateChunks(e) {
    for await(const t of e) {
        if (void 0 === t.length)
            throw errCode$1(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
        if ("string" == typeof t || t instanceof String)
            yield uint8ArrayFromString$1(t.toString());
        else if (Array.isArray(t))
            yield Uint8Array.from(t);
        else {
            if (!(t instanceof Uint8Array))
                throw errCode$1(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
            yield t
        }
    }
}
var validateChunks_1 = validateChunks;
const dirBuilder = dir$1
  , fileBuilder = file
  , errCode = errCode$3;
function isIterable(e) {
    return Symbol.iterator in e
}
function isAsyncIterable(e) {
    return Symbol.asyncIterator in e
}
function contentAsAsyncIterable(e) {
    try {
        if (e instanceof Uint8Array)
            return async function*() {
                yield e
            }();
        if (isIterable(e))
            return async function*() {
                yield*e
            }();
        if (isAsyncIterable(e))
            return e
    } catch {
        throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT")
    }
    throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT")
}
async function *dagBuilder(e, t, r) {
    for await(const n of e)
        if (n.path && ("./" === n.path.substring(0, 2) && (r.wrapWithDirectory = !0),
        n.path = n.path.split("/").filter((e=>e && "." !== e)).join("/")),
        n.content) {
            let e, i;
            e = "function" == typeof r.chunker ? r.chunker : "rabin" === r.chunker ? rabin_1 : fixedSize,
            i = "function" == typeof r.chunkValidator ? r.chunkValidator : validateChunks_1;
            const o = {
                path: n.path,
                mtime: n.mtime,
                mode: n.mode,
                content: e(i(contentAsAsyncIterable(n.content), r), r)
            };
            yield()=>fileBuilder(o, t, r)
        } else {
            if (!n.path)
                throw new Error("Import candidate must have content or path or both");
            {
                const e = {
                    path: n.path,
                    mtime: n.mtime,
                    mode: n.mode
                };
                yield()=>dirBuilder(e, t, r)
            }
        }
}
var dagBuilder_1 = dagBuilder;
class Dir$3 {
    constructor(e, t) {
        this.options = t || {},
        this.root = e.root,
        this.dir = e.dir,
        this.path = e.path,
        this.dirty = e.dirty,
        this.flat = e.flat,
        this.parent = e.parent,
        this.parentKey = e.parentKey,
        this.unixfs = e.unixfs,
        this.mode = e.mode,
        this.mtime = e.mtime,
        this.cid = void 0,
        this.size = void 0
    }
    async put(e, t) {}
    get(e) {
        return Promise.resolve(this)
    }
    async*eachChildSeries() {}
    async*flush(e) {}
}
var dir = Dir$3;
const {encode: encode$1, prepare: prepare$1} = require$$0
  , {UnixFS: UnixFS$1} = src$5
  , Dir$2 = dir
  , persist$1 = persist_1;
class DirFlat$2 extends Dir$2 {
    constructor(e, t) {
        super(e, t),
        this._children = {}
    }
    async put(e, t) {
        this.cid = void 0,
        this.size = void 0,
        this._children[e] = t
    }
    get(e) {
        return Promise.resolve(this._children[e])
    }
    childCount() {
        return Object.keys(this._children).length
    }
    directChildrenCount() {
        return this.childCount()
    }
    onlyChild() {
        return this._children[Object.keys(this._children)[0]]
    }
    async*eachChildSeries() {
        const e = Object.keys(this._children);
        for (let t = 0; t < e.length; t++) {
            const r = e[t];
            yield{
                key: r,
                child: this._children[r]
            }
        }
    }
    async*flush(e) {
        const t = Object.keys(this._children)
          , r = [];
        for (let c = 0; c < t.length; c++) {
            let n = this._children[t[c]];
            if (n instanceof Dir$2)
                for await(const t of n.flush(e))
                    n = t,
                    yield n;
            null != n.size && n.cid && r.push({
                Name: t[c],
                Tsize: n.size,
                Hash: n.cid
            })
        }
        const n = new UnixFS$1({
            type: "directory",
            mtime: this.mtime,
            mode: this.mode
        })
          , i = {
            Data: n.marshal(),
            Links: r
        }
          , o = encode$1(prepare$1(i))
          , s = await persist$1(o, e, this.options)
          , a = o.length + i.Links.reduce(((e,t)=>e + (null == t.Tsize ? 0 : t.Tsize)), 0);
        this.cid = s,
        this.size = a,
        yield{
            cid: s,
            unixfs: n,
            path: this.path,
            size: a
        }
    }
}
var dirFlat = DirFlat$2;
const BITS_PER_BYTE = 7;
var sparseArray = class {
    constructor() {
        this._bitArrays = [],
        this._data = [],
        this._length = 0,
        this._changedLength = !1,
        this._changedData = !1
    }
    set(e, t) {
        let r = this._internalPositionFor(e, !1);
        if (void 0 === t)
            -1 !== r && (this._unsetInternalPos(r),
            this._unsetBit(e),
            this._changedLength = !0,
            this._changedData = !0);
        else {
            let n = !1;
            -1 === r ? (r = this._data.length,
            this._setBit(e),
            this._changedData = !0) : n = !0,
            this._setInternalPos(r, e, t, n),
            this._changedLength = !0
        }
    }
    unset(e) {
        this.set(e, void 0)
    }
    get(e) {
        this._sortData();
        const t = this._internalPositionFor(e, !0);
        if (-1 !== t)
            return this._data[t][1]
    }
    push(e) {
        return this.set(this.length, e),
        this.length
    }
    get length() {
        if (this._sortData(),
        this._changedLength) {
            const e = this._data[this._data.length - 1];
            this._length = e ? e[0] + 1 : 0,
            this._changedLength = !1
        }
        return this._length
    }
    forEach(e) {
        let t = 0;
        for (; t < this.length; )
            e(this.get(t), t, this),
            t++
    }
    map(e) {
        let t = 0
          , r = new Array(this.length);
        for (; t < this.length; )
            r[t] = e(this.get(t), t, this),
            t++;
        return r
    }
    reduce(e, t) {
        let r = 0
          , n = t;
        for (; r < this.length; ) {
            n = e(n, this.get(r), r),
            r++
        }
        return n
    }
    find(e) {
        let t, r, n = 0;
        for (; n < this.length && !t; )
            r = this.get(n),
            t = e(r),
            n++;
        return t ? r : void 0
    }
    _internalPositionFor(e, t) {
        const r = this._bytePosFor(e, t);
        if (r >= this._bitArrays.length)
            return -1;
        const n = this._bitArrays[r]
          , i = e - r * BITS_PER_BYTE;
        if (!((n & 1 << i) > 0))
            return -1;
        return this._bitArrays.slice(0, r).reduce(popCountReduce, 0) + popCount(n & ~(4294967295 << i + 1)) - 1
    }
    _bytePosFor(e, t) {
        const r = Math.floor(e / BITS_PER_BYTE)
          , n = r + 1;
        for (; !t && this._bitArrays.length < n; )
            this._bitArrays.push(0);
        return r
    }
    _setBit(e) {
        const t = this._bytePosFor(e, !1);
        this._bitArrays[t] |= 1 << e - t * BITS_PER_BYTE
    }
    _unsetBit(e) {
        const t = this._bytePosFor(e, !1);
        this._bitArrays[t] &= ~(1 << e - t * BITS_PER_BYTE)
    }
    _setInternalPos(e, t, r, n) {
        const i = this._data
          , o = [t, r];
        if (n)
            this._sortData(),
            i[e] = o;
        else {
            if (i.length)
                if (i[i.length - 1][0] >= t)
                    i.push(o);
                else if (i[0][0] <= t)
                    i.unshift(o);
                else {
                    const e = Math.round(i.length / 2);
                    this._data = i.slice(0, e).concat(o).concat(i.slice(e))
                }
            else
                this._data.push(o);
            this._changedData = !0,
            this._changedLength = !0
        }
    }
    _unsetInternalPos(e) {
        this._data.splice(e, 1)
    }
    _sortData() {
        this._changedData && this._data.sort(sortInternal),
        this._changedData = !1
    }
    bitField() {
        const e = [];
        let t, r = 8, n = 0, i = 0;
        const o = this._bitArrays.slice();
        for (; o.length || n; ) {
            0 === n && (t = o.shift(),
            n = 7);
            const s = Math.min(n, r);
            i |= (t & ~(255 << s)) << 8 - r,
            t >>>= s,
            n -= s,
            r -= s,
            r && (n || o.length) || (e.push(i),
            i = 0,
            r = 8)
        }
        for (var s = e.length - 1; s > 0; s--) {
            if (0 !== e[s])
                break;
            e.pop()
        }
        return e
    }
    compactArray() {
        return this._sortData(),
        this._data.map(valueOnly)
    }
}
;
function popCountReduce(e, t) {
    return e + popCount(t)
}
function popCount(e) {
    let t = e;
    return t -= t >> 1 & 1431655765,
    t = (858993459 & t) + (t >> 2 & 858993459),
    16843009 * (t + (t >> 4) & 252645135) >> 24
}
function sortInternal(e, t) {
    return e[0] - t[0]
}
function valueOnly(e) {
    return e[1]
}
const SparseArray = sparseArray
  , uint8ArrayFromString = fromString_1;
class Bucket$2 {
    constructor(e, t, r=0) {
        this._options = e,
        this._popCount = 0,
        this._parent = t,
        this._posAtParent = r,
        this._children = new SparseArray,
        this.key = null
    }
    async put(e, t) {
        const r = await this._findNewBucketAndPos(e);
        await r.bucket._putAt(r, e, t)
    }
    async get(e) {
        const t = await this._findChild(e);
        if (t)
            return t.value
    }
    async del(e) {
        const t = await this._findPlace(e)
          , r = t.bucket._at(t.pos);
        r && r.key === e && t.bucket._delAt(t.pos)
    }
    leafCount() {
        return this._children.compactArray().reduce(((e,t)=>t instanceof Bucket$2 ? e + t.leafCount() : e + 1), 0)
    }
    childrenCount() {
        return this._children.length
    }
    onlyChild() {
        return this._children.get(0)
    }
    *eachLeafSeries() {
        const e = this._children.compactArray();
        for (const t of e)
            t instanceof Bucket$2 ? yield*t.eachLeafSeries() : yield t;
        return []
    }
    serialize(e, t) {
        return t(this._children.reduce(((r,n,i)=>(n && (n instanceof Bucket$2 ? r.push(n.serialize(e, t)) : r.push(e(n, i))),
        r)), []))
    }
    asyncTransform(e, t) {
        return asyncTransformBucket(this, e, t)
    }
    toJSON() {
        return this.serialize(mapNode, reduceNodes)
    }
    prettyPrint() {
        return JSON.stringify(this.toJSON(), null, "  ")
    }
    tableSize() {
        return Math.pow(2, this._options.bits)
    }
    async _findChild(e) {
        const t = await this._findPlace(e)
          , r = t.bucket._at(t.pos);
        if (!(r instanceof Bucket$2))
            return r && r.key === e ? r : void 0
    }
    async _findPlace(e) {
        const t = this._options.hash("string" == typeof e ? uint8ArrayFromString(e) : e)
          , r = await t.take(this._options.bits)
          , n = this._children.get(r);
        return n instanceof Bucket$2 ? n._findPlace(t) : {
            bucket: this,
            pos: r,
            hash: t,
            existingChild: n
        }
    }
    async _findNewBucketAndPos(e) {
        const t = await this._findPlace(e);
        if (t.existingChild && t.existingChild.key !== e) {
            const e = new Bucket$2(this._options,t.bucket,t.pos);
            t.bucket._putObjectAt(t.pos, e);
            const r = await e._findPlace(t.existingChild.hash);
            return r.bucket._putAt(r, t.existingChild.key, t.existingChild.value),
            e._findNewBucketAndPos(t.hash)
        }
        return t
    }
    _putAt(e, t, r) {
        this._putObjectAt(e.pos, {
            key: t,
            value: r,
            hash: e.hash
        })
    }
    _putObjectAt(e, t) {
        this._children.get(e) || this._popCount++,
        this._children.set(e, t)
    }
    _delAt(e) {
        if (-1 === e)
            throw new Error("Invalid position");
        this._children.get(e) && this._popCount--,
        this._children.unset(e),
        this._level()
    }
    _level() {
        if (this._parent && this._popCount <= 1)
            if (1 === this._popCount) {
                const e = this._children.find(exists);
                if (e && !(e instanceof Bucket$2)) {
                    const t = e.hash;
                    t.untake(this._options.bits);
                    const r = {
                        pos: this._posAtParent,
                        hash: t,
                        bucket: this._parent
                    };
                    this._parent._putAt(r, e.key, e.value)
                }
            } else
                this._parent._delAt(this._posAtParent)
    }
    _at(e) {
        return this._children.get(e)
    }
}
function exists(e) {
    return Boolean(e)
}
function mapNode(e, t) {
    return e.key
}
function reduceNodes(e) {
    return e
}
async function asyncTransformBucket(e, t, r) {
    const n = [];
    for (const i of e._children.compactArray())
        if (i instanceof Bucket$2)
            await asyncTransformBucket(i, t, r);
        else {
            const r = await t(i);
            n.push({
                bitField: e._children.bitField(),
                children: r
            })
        }
    return r(n)
}
var bucket = Bucket$2
  , consumableHash = {
    exports: {}
};
const START_MASKS = [255, 254, 252, 248, 240, 224, 192, 128]
  , STOP_MASKS = [1, 3, 7, 15, 31, 63, 127, 255];
var consumableBuffer = class {
    constructor(e) {
        this._value = e,
        this._currentBytePos = e.length - 1,
        this._currentBitPos = 7
    }
    availableBits() {
        return this._currentBitPos + 1 + 8 * this._currentBytePos
    }
    totalBits() {
        return 8 * this._value.length
    }
    take(e) {
        let t = e
          , r = 0;
        for (; t && this._haveBits(); ) {
            const e = this._value[this._currentBytePos]
              , n = this._currentBitPos + 1
              , i = Math.min(n, t);
            r = (r << i) + byteBitsToInt(e, n - i, i),
            t -= i,
            this._currentBitPos -= i,
            this._currentBitPos < 0 && (this._currentBitPos = 7,
            this._currentBytePos--)
        }
        return r
    }
    untake(e) {
        for (this._currentBitPos += e; this._currentBitPos > 7; )
            this._currentBitPos -= 8,
            this._currentBytePos += 1
    }
    _haveBits() {
        return this._currentBytePos >= 0
    }
}
;
function byteBitsToInt(e, t, r) {
    return (e & maskFor(t, r)) >>> t
}
function maskFor(e, t) {
    return START_MASKS[e] & STOP_MASKS[Math.min(t + e - 1, 7)]
}
const ConsumableBuffer = consumableBuffer
  , uint8ArrayConcat = concat_1;
function wrapHash$1(e) {
    return function(t) {
        return t instanceof InfiniteHash ? t : new InfiniteHash(t,e)
    }
}
class InfiniteHash {
    constructor(e, t) {
        if (!(e instanceof Uint8Array))
            throw new Error("can only hash Uint8Arrays");
        this._value = e,
        this._hashFn = t,
        this._depth = -1,
        this._availableBits = 0,
        this._currentBufferIndex = 0,
        this._buffers = []
    }
    async take(e) {
        let t = e;
        for (; this._availableBits < t; )
            await this._produceMoreBits();
        let r = 0;
        for (; t > 0; ) {
            const e = this._buffers[this._currentBufferIndex]
              , n = Math.min(e.availableBits(), t);
            r = (r << n) + e.take(n),
            t -= n,
            this._availableBits -= n,
            0 === e.availableBits() && this._currentBufferIndex++
        }
        return r
    }
    untake(e) {
        let t = e;
        for (; t > 0; ) {
            const e = this._buffers[this._currentBufferIndex]
              , r = Math.min(e.totalBits() - e.availableBits(), t);
            e.untake(r),
            t -= r,
            this._availableBits += r,
            this._currentBufferIndex > 0 && e.totalBits() === e.availableBits() && (this._depth--,
            this._currentBufferIndex--)
        }
    }
    async _produceMoreBits() {
        this._depth++;
        const e = this._depth ? uint8ArrayConcat([this._value, Uint8Array.from([this._depth])]) : this._value
          , t = await this._hashFn(e)
          , r = new ConsumableBuffer(t);
        this._buffers.push(r),
        this._availableBits += r.availableBits()
    }
}
consumableHash.exports = wrapHash$1,
consumableHash.exports.InfiniteHash = InfiniteHash;
const Bucket$1 = bucket
  , wrapHash = consumableHash.exports;
function createHAMT$1(e) {
    if (!e || !e.hashFn)
        throw new Error("please define an options.hashFn");
    const t = {
        bits: e.bits || 8,
        hash: wrapHash(e.hashFn)
    };
    return new Bucket$1(t)
}
var src$1 = {
    createHAMT: createHAMT$1,
    Bucket: Bucket$1
};
const {encode: encode, prepare: prepare} = require$$0
  , {UnixFS: UnixFS} = src$5
  , Dir$1 = dir
  , persist = persist_1
  , {createHAMT: createHAMT, Bucket: Bucket} = src$1;
class DirSharded$1 extends Dir$1 {
    constructor(e, t) {
        super(e, t),
        this._bucket = createHAMT({
            hashFn: t.hamtHashFn,
            bits: t.hamtBucketBits
        })
    }
    async put(e, t) {
        await this._bucket.put(e, t)
    }
    get(e) {
        return this._bucket.get(e)
    }
    childCount() {
        return this._bucket.leafCount()
    }
    directChildrenCount() {
        return this._bucket.childrenCount()
    }
    onlyChild() {
        return this._bucket.onlyChild()
    }
    async*eachChildSeries() {
        for await(const {key: e, value: t} of this._bucket.eachLeafSeries())
            yield{
                key: e,
                child: t
            }
    }
    async*flush(e) {
        for await(const t of flush(this._bucket, e, this, this.options))
            yield __spreadProps(__spreadValues({}, t), {
                path: this.path
            })
    }
}
var dirSharded = DirSharded$1;
async function *flush(e, t, r, n) {
    const i = e._children
      , o = [];
    let s = 0;
    for (let d = 0; d < i.length; d++) {
        const e = i.get(d);
        if (!e)
            continue;
        const r = d.toString(16).toUpperCase().padStart(2, "0");
        if (e instanceof Bucket) {
            let i;
            for await(const r of await flush(e, t, null, n))
                i = r;
            if (!i)
                throw new Error("Could not flush sharded directory, no subshard found");
            o.push({
                Name: r,
                Tsize: i.size,
                Hash: i.cid
            }),
            s += i.size
        } else if ("function" == typeof e.value.flush) {
            const n = e.value;
            let i;
            for await(const e of n.flush(t))
                i = e,
                yield i;
            const a = r + e.key;
            o.push({
                Name: a,
                Tsize: i.size,
                Hash: i.cid
            }),
            s += i.size
        } else {
            const t = e.value;
            if (!t.cid)
                continue;
            const n = r + e.key
              , i = t.size;
            o.push({
                Name: n,
                Tsize: i,
                Hash: t.cid
            }),
            s += i
        }
    }
    const a = Uint8Array.from(i.bitField().reverse())
      , c = new UnixFS({
        type: "hamt-sharded-directory",
        data: a,
        fanout: e.tableSize(),
        hashType: n.hamtHashCode,
        mtime: r && r.mtime,
        mode: r && r.mode
    })
      , u = {
        Data: c.marshal(),
        Links: o
    }
      , l = encode(prepare(u))
      , f = await persist(l, t, n)
      , h = l.length + s;
    yield{
        cid: f,
        unixfs: c,
        size: h
    }
}
const DirSharded = dirSharded
  , DirFlat$1 = dirFlat;
var flatToShard$1 = async function e(t, r, n, i) {
    let o = r;
    r instanceof DirFlat$1 && r.directChildrenCount() >= n && (o = await convertToShard(r, i));
    const s = o.parent;
    if (s) {
        if (o !== r) {
            if (t && (t.parent = o),
            !o.parentKey)
                throw new Error("No parent key found");
            await s.put(o.parentKey, o)
        }
        return e(o, s, n, i)
    }
    return o
};
async function convertToShard(e, t) {
    const r = new DirSharded({
        root: e.root,
        dir: !0,
        parent: e.parent,
        parentKey: e.parentKey,
        path: e.path,
        dirty: e.dirty,
        flat: !1,
        mtime: e.mtime,
        mode: e.mode
    },t);
    for await(const {key: n, child: i} of e.eachChildSeries())
        await r.put(n, i);
    return r
}
const toPathComponents$1 = (e="")=>(e.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean);
var toPathComponents_1 = toPathComponents$1;
const DirFlat = dirFlat
  , flatToShard = flatToShard$1
  , Dir = dir
  , toPathComponents = toPathComponents_1;
async function addToTree(e, t, r) {
    const n = toPathComponents(e.path || "")
      , i = n.length - 1;
    let o = t
      , s = "";
    for (let a = 0; a < n.length; a++) {
        const c = n[a];
        s += `${s ? "/" : ""}${c}`;
        const u = a === i;
        if (o.dirty = !0,
        o.cid = void 0,
        o.size = void 0,
        u)
            await o.put(c, e),
            t = await flatToShard(null, o, r.shardSplitThreshold, r);
        else {
            let e = await o.get(c);
            e && e instanceof Dir || (e = new DirFlat({
                root: !1,
                dir: !0,
                parent: o,
                parentKey: c,
                path: s,
                dirty: !0,
                flat: !0,
                mtime: e && e.unixfs && e.unixfs.mtime,
                mode: e && e.unixfs && e.unixfs.mode
            },r)),
            await o.put(c, e),
            o = e
        }
    }
    return t
}
async function *flushAndYield(e, t) {
    e instanceof Dir ? yield*e.flush(t) : e && e.unixfs && e.unixfs.isDirectory() && (yield e)
}
async function *treeBuilder(e, t, r) {
    let n = new DirFlat({
        root: !0,
        dir: !0,
        path: "",
        dirty: !0,
        flat: !0
    },r);
    for await(const i of e)
        i && (n = await addToTree(i, n, r),
        i.unixfs && i.unixfs.isDirectory() || (yield i));
    if (r.wrapWithDirectory)
        yield*flushAndYield(n, t);
    else
        for await(const i of n.eachChildSeries())
            i && (yield*flushAndYield(i.child, t))
}
var treeBuilder_1 = treeBuilder;
const parallelBatch = itParallelBatch
  , defaultOptions = options;
async function *importer(e, t, r={}) {
    const n = defaultOptions(r);
    let i, o, s;
    i = "function" == typeof r.dagBuilder ? r.dagBuilder : dagBuilder_1,
    o = "function" == typeof r.treeBuilder ? r.treeBuilder : treeBuilder_1,
    s = Symbol.asyncIterator in e || Symbol.iterator in e ? e : [e];
    for await(const a of o(parallelBatch(i(s, t, n), n.fileImportConcurrency), t, n))
        yield{
            cid: a.cid,
            path: a.path,
            unixfs: a.unixfs,
            size: a.size
        }
}
var src = {
    importer: importer
};
async function *browserReadableStreamToIt(e, t={}) {
    const r = e.getReader();
    try {
        for (; ; ) {
            const e = await r.read();
            if (e.done)
                return;
            yield e.value
        }
    } finally {
        !0 !== t.preventCancel && r.cancel(),
        r.releaseLock()
    }
}
var browserReadablestreamToIt = browserReadableStreamToIt;
export {CarWriter as C, N, a$1 as a, browserReadablestreamToIt as b, l, src as s, y};
