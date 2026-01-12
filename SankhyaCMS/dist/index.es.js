import fc, { forwardRef as rr, useState as Ne, useEffect as Me, createElement as Tn, useRef as Fe, createContext as ot, useLayoutEffect as hc, useContext as de, useId as dc, useCallback as wa, useMemo as Vn, Fragment as ka, useInsertionEffect as pc, Component as mc } from "react";
import { Link as sr } from "react-router";
import './index.css';function Sa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var cn = { exports: {} }, jt = {};
var ls;
function gc() {
  if (ls) return jt;
  ls = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(i, r, s) {
    var o = null;
    if (s !== void 0 && (o = "" + s), r.key !== void 0 && (o = "" + r.key), "key" in r) {
      s = {};
      for (var a in r)
        a !== "key" && (s[a] = r[a]);
    } else s = r;
    return r = s.ref, {
      $$typeof: e,
      type: i,
      key: o,
      ref: r !== void 0 ? r : null,
      props: s
    };
  }
  return jt.Fragment = t, jt.jsx = n, jt.jsxs = n, jt;
}
var Nt = {};
var us;
function yc() {
  return us || (us = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(C) {
      if (C == null) return null;
      if (typeof C == "function")
        return C.$$typeof === R ? null : C.displayName || C.name || null;
      if (typeof C == "string") return C;
      switch (C) {
        case b:
          return "Fragment";
        case S:
          return "Profiler";
        case x:
          return "StrictMode";
        case w:
          return "Suspense";
        case N:
          return "SuspenseList";
        case V:
          return "Activity";
      }
      if (typeof C == "object")
        switch (typeof C.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), C.$$typeof) {
          case k:
            return "Portal";
          case P:
            return C.displayName || "Context";
          case v:
            return (C._context.displayName || "Context") + ".Consumer";
          case E:
            var B = C.render;
            return C = C.displayName, C || (C = B.displayName || B.name || "", C = C !== "" ? "ForwardRef(" + C + ")" : "ForwardRef"), C;
          case j:
            return B = C.displayName || null, B !== null ? B : e(C.type) || "Memo";
          case O:
            B = C._payload, C = C._init;
            try {
              return e(C(B));
            } catch {
            }
        }
      return null;
    }
    function t(C) {
      return "" + C;
    }
    function n(C) {
      try {
        t(C);
        var B = !1;
      } catch {
        B = !0;
      }
      if (B) {
        B = console;
        var p = B.error, G = typeof Symbol == "function" && Symbol.toStringTag && C[Symbol.toStringTag] || C.constructor.name || "Object";
        return p.call(
          B,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          G
        ), t(C);
      }
    }
    function i(C) {
      if (C === b) return "<>";
      if (typeof C == "object" && C !== null && C.$$typeof === O)
        return "<...>";
      try {
        var B = e(C);
        return B ? "<" + B + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var C = L.A;
      return C === null ? null : C.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function o(C) {
      if (q.call(C, "key")) {
        var B = Object.getOwnPropertyDescriptor(C, "key").get;
        if (B && B.isReactWarning) return !1;
      }
      return C.key !== void 0;
    }
    function a(C, B) {
      function p() {
        W || (W = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          B
        ));
      }
      p.isReactWarning = !0, Object.defineProperty(C, "key", {
        get: p,
        configurable: !0
      });
    }
    function l() {
      var C = e(this.type);
      return U[C] || (U[C] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), C = this.props.ref, C !== void 0 ? C : null;
    }
    function u(C, B, p, G, Te, ie) {
      var J = p.ref;
      return C = {
        $$typeof: m,
        type: C,
        key: B,
        props: p,
        _owner: G
      }, (J !== void 0 ? J : null) !== null ? Object.defineProperty(C, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(C, "ref", { enumerable: !1, value: null }), C._store = {}, Object.defineProperty(C._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(C, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(C, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Te
      }), Object.defineProperty(C, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ie
      }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
    }
    function c(C, B, p, G, Te, ie) {
      var J = B.children;
      if (J !== void 0)
        if (G)
          if (F(J)) {
            for (G = 0; G < J.length; G++)
              f(J[G]);
            Object.freeze && Object.freeze(J);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else f(J);
      if (q.call(B, "key")) {
        J = e(C);
        var he = Object.keys(B).filter(function(qe) {
          return qe !== "key";
        });
        G = 0 < he.length ? "{key: someKey, " + he.join(": ..., ") + ": ...}" : "{key: someKey}", y[J + G] || (he = 0 < he.length ? "{" + he.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          G,
          J,
          he,
          J
        ), y[J + G] = !0);
      }
      if (J = null, p !== void 0 && (n(p), J = "" + p), o(B) && (n(B.key), J = "" + B.key), "key" in B) {
        p = {};
        for (var Le in B)
          Le !== "key" && (p[Le] = B[Le]);
      } else p = B;
      return J && a(
        p,
        typeof C == "function" ? C.displayName || C.name || "Unknown" : C
      ), u(
        C,
        J,
        p,
        r(),
        Te,
        ie
      );
    }
    function f(C) {
      d(C) ? C._store && (C._store.validated = 1) : typeof C == "object" && C !== null && C.$$typeof === O && (C._payload.status === "fulfilled" ? d(C._payload.value) && C._payload.value._store && (C._payload.value._store.validated = 1) : C._store && (C._store.validated = 1));
    }
    function d(C) {
      return typeof C == "object" && C !== null && C.$$typeof === m;
    }
    var h = fc, m = Symbol.for("react.transitional.element"), k = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), v = Symbol.for("react.consumer"), P = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), R = Symbol.for("react.client.reference"), L = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, F = Array.isArray, D = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(C) {
        return C();
      }
    };
    var W, U = {}, Y = h.react_stack_bottom_frame.bind(
      h,
      s
    )(), re = D(i(s)), y = {};
    Nt.Fragment = b, Nt.jsx = function(C, B, p) {
      var G = 1e4 > L.recentlyCreatedOwnerStacks++;
      return c(
        C,
        B,
        p,
        !1,
        G ? Error("react-stack-top-frame") : Y,
        G ? D(i(C)) : re
      );
    }, Nt.jsxs = function(C, B, p) {
      var G = 1e4 > L.recentlyCreatedOwnerStacks++;
      return c(
        C,
        B,
        p,
        !0,
        G ? Error("react-stack-top-frame") : Y,
        G ? D(i(C)) : re
      );
    };
  })()), Nt;
}
var cs;
function xc() {
  return cs || (cs = 1, process.env.NODE_ENV === "production" ? cn.exports = gc() : cn.exports = yc()), cn.exports;
}
var g = xc();
function bc(e, t) {
  const n = e.icons, i = e.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function s(o) {
    if (n[o]) return r[o] = [];
    if (!(o in r)) {
      r[o] = null;
      const a = i[o] && i[o].parent, l = a && s(a);
      l && (r[o] = [a].concat(l));
    }
    return r[o];
  }
  return Object.keys(n).concat(Object.keys(i)).forEach(s), r;
}
const Ta = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
}), Cn = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), or = Object.freeze({
  ...Ta,
  ...Cn
}), vi = Object.freeze({
  ...or,
  body: "",
  hidden: !1
});
function vc(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const i = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return i && (n.rotate = i), n;
}
function fs(e, t) {
  const n = vc(e, t);
  for (const i in vi) i in Cn ? i in e && !(i in n) && (n[i] = Cn[i]) : i in t ? n[i] = t[i] : i in e && (n[i] = e[i]);
  return n;
}
function wc(e, t, n) {
  const i = e.icons, r = e.aliases || /* @__PURE__ */ Object.create(null);
  let s = {};
  function o(a) {
    s = fs(i[a] || r[a], s);
  }
  return o(t), n.forEach(o), fs(e, s);
}
function Ca(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object") return n;
  e.not_found instanceof Array && e.not_found.forEach((r) => {
    t(r, null), n.push(r);
  });
  const i = bc(e);
  for (const r in i) {
    const s = i[r];
    s && (t(r, wc(e, r, s)), n.push(r));
  }
  return n;
}
const kc = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Ta
};
function Hn(e, t) {
  for (const n in t) if (n in e && typeof e[n] != typeof t[n]) return !1;
  return !0;
}
function Pa(e) {
  if (typeof e != "object" || e === null) return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !Hn(e, kc)) return null;
  const n = t.icons;
  for (const r in n) {
    const s = n[r];
    if (!r || typeof s.body != "string" || !Hn(s, vi)) return null;
  }
  const i = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in i) {
    const s = i[r], o = s.parent;
    if (!r || typeof o != "string" || !n[o] && !i[o] || !Hn(s, vi)) return null;
  }
  return t;
}
const hs = /* @__PURE__ */ Object.create(null);
function Sc(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function vt(e, t) {
  const n = hs[e] || (hs[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = Sc(e, t));
}
function Ea(e, t) {
  return Pa(t) ? Ca(t, (n, i) => {
    i ? e.icons[n] = i : e.missing.add(n);
  }) : [];
}
function Tc(e, t, n) {
  try {
    if (typeof n.body == "string")
      return e.icons[t] = { ...n }, !0;
  } catch {
  }
  return !1;
}
const Aa = /^[a-z0-9]+(-[a-z0-9]+)*$/, On = (e, t, n, i = "") => {
  const r = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3) return null;
    i = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length) return null;
  if (r.length > 1) {
    const a = r.pop(), l = r.pop(), u = {
      provider: r.length > 0 ? r[0] : i,
      prefix: l,
      name: a
    };
    return t && !yn(u) ? null : u;
  }
  const s = r[0], o = s.split("-");
  if (o.length > 1) {
    const a = {
      provider: i,
      prefix: o.shift(),
      name: o.join("-")
    };
    return t && !yn(a) ? null : a;
  }
  if (n && i === "") {
    const a = {
      provider: i,
      prefix: "",
      name: s
    };
    return t && !yn(a, n) ? null : a;
  }
  return null;
}, yn = (e, t) => e ? !!((t && e.prefix === "" || e.prefix) && e.name) : !1;
let Yt = !1;
function Ia(e) {
  return typeof e == "boolean" && (Yt = e), Yt;
}
function ds(e) {
  const t = typeof e == "string" ? On(e, !0, Yt) : e;
  if (t) {
    const n = vt(t.provider, t.prefix), i = t.name;
    return n.icons[i] || (n.missing.has(i) ? null : void 0);
  }
}
function Cc(e, t) {
  const n = On(e, !0, Yt);
  if (!n) return !1;
  const i = vt(n.provider, n.prefix);
  return t ? Tc(i, n.name, t) : (i.missing.add(n.name), !0);
}
function Pc(e, t) {
  if (typeof e != "object") return !1;
  if (typeof t != "string" && (t = e.provider || ""), Yt && !t && !e.prefix) {
    let r = !1;
    return Pa(e) && (e.prefix = "", Ca(e, (s, o) => {
      Cc(s, o) && (r = !0);
    })), r;
  }
  const n = e.prefix;
  if (!yn({
    prefix: n,
    name: "a"
  })) return !1;
  const i = vt(t, n);
  return !!Ea(i, e);
}
const Da = Object.freeze({
  width: null,
  height: null
}), ja = Object.freeze({
  ...Da,
  ...Cn
}), Ec = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ac = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ps(e, t, n) {
  if (t === 1) return e;
  if (n = n || 100, typeof e == "number") return Math.ceil(e * t * n) / n;
  if (typeof e != "string") return e;
  const i = e.split(Ec);
  if (i === null || !i.length) return e;
  const r = [];
  let s = i.shift(), o = Ac.test(s);
  for (; ; ) {
    if (o) {
      const a = parseFloat(s);
      isNaN(a) ? r.push(s) : r.push(Math.ceil(a * t * n) / n);
    } else r.push(s);
    if (s = i.shift(), s === void 0) return r.join("");
    o = !o;
  }
}
function Ic(e, t = "defs") {
  let n = "";
  const i = e.indexOf("<" + t);
  for (; i >= 0; ) {
    const r = e.indexOf(">", i), s = e.indexOf("</" + t);
    if (r === -1 || s === -1) break;
    const o = e.indexOf(">", s);
    if (o === -1) break;
    n += e.slice(r + 1, s).trim(), e = e.slice(0, i).trim() + e.slice(o + 1);
  }
  return {
    defs: n,
    content: e
  };
}
function Dc(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function jc(e, t, n) {
  const i = Ic(e);
  return Dc(i.defs, t + i.content + n);
}
const Nc = (e) => e === "unset" || e === "undefined" || e === "none";
function Mc(e, t) {
  const n = {
    ...or,
    ...e
  }, i = {
    ...ja,
    ...t
  }, r = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let s = n.body;
  [n, i].forEach((k) => {
    const b = [], x = k.hFlip, S = k.vFlip;
    let v = k.rotate;
    x ? S ? v += 2 : (b.push("translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"), b.push("scale(-1 1)"), r.top = r.left = 0) : S && (b.push("translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"), b.push("scale(1 -1)"), r.top = r.left = 0);
    let P;
    switch (v < 0 && (v -= Math.floor(v / 4) * 4), v = v % 4, v) {
      case 1:
        P = r.height / 2 + r.top, b.unshift("rotate(90 " + P.toString() + " " + P.toString() + ")");
        break;
      case 2:
        b.unshift("rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")");
        break;
      case 3:
        P = r.width / 2 + r.left, b.unshift("rotate(-90 " + P.toString() + " " + P.toString() + ")");
        break;
    }
    v % 2 === 1 && (r.left !== r.top && (P = r.left, r.left = r.top, r.top = P), r.width !== r.height && (P = r.width, r.width = r.height, r.height = P)), b.length && (s = jc(s, '<g transform="' + b.join(" ") + '">', "</g>"));
  });
  const o = i.width, a = i.height, l = r.width, u = r.height;
  let c, f;
  o === null ? (f = a === null ? "1em" : a === "auto" ? u : a, c = ps(f, l / u)) : (c = o === "auto" ? l : o, f = a === null ? ps(c, u / l) : a === "auto" ? u : a);
  const d = {}, h = (k, b) => {
    Nc(b) || (d[k] = b.toString());
  };
  h("width", c), h("height", f);
  const m = [
    r.left,
    r.top,
    l,
    u
  ];
  return d.viewBox = m.join(" "), {
    attributes: d,
    viewBox: m,
    body: s
  };
}
const Rc = /\sid="(\S+)"/g, Lc = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Vc = 0;
function Oc(e, t = Lc) {
  const n = [];
  let i;
  for (; i = Rc.exec(e); ) n.push(i[1]);
  if (!n.length) return e;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((s) => {
    const o = typeof t == "function" ? t(s) : t + (Vc++).toString(), a = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(new RegExp('([#;"])(' + a + ')([")]|\\.[a-z])', "g"), "$1" + o + r + "$3");
  }), e = e.replace(new RegExp(r, "g"), ""), e;
}
const wi = /* @__PURE__ */ Object.create(null);
function Fc(e, t) {
  wi[e] = t;
}
function ki(e) {
  return wi[e] || wi[""];
}
function ar(e) {
  let t;
  if (typeof e.resources == "string") t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length) return null;
  return {
    resources: t,
    path: e.path || "/",
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const lr = /* @__PURE__ */ Object.create(null), Mt = ["https://api.simplesvg.com", "https://api.unisvg.com"], xn = [];
for (; Mt.length > 0; ) Mt.length === 1 || Math.random() > 0.5 ? xn.push(Mt.shift()) : xn.push(Mt.pop());
lr[""] = ar({ resources: ["https://api.iconify.design"].concat(xn) });
function Bc(e, t) {
  const n = ar(t);
  return n === null ? !1 : (lr[e] = n, !0);
}
function ur(e) {
  return lr[e];
}
const _c = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function") return e;
  } catch {
  }
};
let ms = _c();
function zc(e, t) {
  const n = ur(e);
  if (!n) return 0;
  let i;
  if (!n.maxURL) i = 0;
  else {
    let r = 0;
    n.resources.forEach((o) => {
      r = Math.max(r, o.length);
    });
    const s = t + ".json?icons=";
    i = n.maxURL - r - n.path.length - s.length;
  }
  return i;
}
function $c(e) {
  return e === 404;
}
const Uc = (e, t, n) => {
  const i = [], r = zc(e, t), s = "icons";
  let o = {
    type: s,
    provider: e,
    prefix: t,
    icons: []
  }, a = 0;
  return n.forEach((l, u) => {
    a += l.length + 1, a >= r && u > 0 && (i.push(o), o = {
      type: s,
      provider: e,
      prefix: t,
      icons: []
    }, a = l.length), o.icons.push(l);
  }), i.push(o), i;
};
function Hc(e) {
  if (typeof e == "string") {
    const t = ur(e);
    if (t) return t.path;
  }
  return "/";
}
const Wc = (e, t, n) => {
  if (!ms) {
    n("abort", 424);
    return;
  }
  let i = Hc(t.provider);
  switch (t.type) {
    case "icons": {
      const s = t.prefix, a = t.icons.join(","), l = new URLSearchParams({ icons: a });
      i += s + ".json?" + l.toString();
      break;
    }
    case "custom": {
      const s = t.uri;
      i += s.slice(0, 1) === "/" ? s.slice(1) : s;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let r = 503;
  ms(e + i).then((s) => {
    const o = s.status;
    if (o !== 200) {
      setTimeout(() => {
        n($c(o) ? "abort" : "next", o);
      });
      return;
    }
    return r = 501, s.json();
  }).then((s) => {
    if (typeof s != "object" || s === null) {
      setTimeout(() => {
        s === 404 ? n("abort", s) : n("next", r);
      });
      return;
    }
    setTimeout(() => {
      n("success", s);
    });
  }).catch(() => {
    n("next", r);
  });
}, qc = {
  prepare: Uc,
  send: Wc
};
function Na(e, t) {
  e.forEach((n) => {
    const i = n.loaderCallbacks;
    i && (n.loaderCallbacks = i.filter((r) => r.id !== t));
  });
}
function Gc(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length) return;
    let n = !1;
    const i = e.provider, r = e.prefix;
    t.forEach((s) => {
      const o = s.icons, a = o.pending.length;
      o.pending = o.pending.filter((l) => {
        if (l.prefix !== r) return !0;
        const u = l.name;
        if (e.icons[u]) o.loaded.push({
          provider: i,
          prefix: r,
          name: u
        });
        else if (e.missing.has(u)) o.missing.push({
          provider: i,
          prefix: r,
          name: u
        });
        else
          return n = !0, !0;
        return !1;
      }), o.pending.length !== a && (n || Na([e], s.id), s.callback(o.loaded.slice(0), o.missing.slice(0), o.pending.slice(0), s.abort));
    });
  }));
}
let Kc = 0;
function Yc(e, t, n) {
  const i = Kc++, r = Na.bind(null, n, i);
  if (!t.pending.length) return r;
  const s = {
    id: i,
    icons: t,
    callback: e,
    abort: r
  };
  return n.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(s);
  }), r;
}
function Xc(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((r, s) => r.provider !== s.provider ? r.provider.localeCompare(s.provider) : r.prefix !== s.prefix ? r.prefix.localeCompare(s.prefix) : r.name.localeCompare(s.name));
  let i = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((r) => {
    if (i.name === r.name && i.prefix === r.prefix && i.provider === r.provider) return;
    i = r;
    const s = r.provider, o = r.prefix, a = r.name, l = n[s] || (n[s] = /* @__PURE__ */ Object.create(null)), u = l[o] || (l[o] = vt(s, o));
    let c;
    a in u.icons ? c = t.loaded : o === "" || u.missing.has(a) ? c = t.missing : c = t.pending;
    const f = {
      provider: s,
      prefix: o,
      name: a
    };
    c.push(f);
  }), t;
}
function Qc(e, t = !0, n = !1) {
  const i = [];
  return e.forEach((r) => {
    const s = typeof r == "string" ? On(r, t, n) : r;
    s && i.push(s);
  }), i;
}
const Zc = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Jc(e, t, n, i) {
  const r = e.resources.length, s = e.random ? Math.floor(Math.random() * r) : e.index;
  let o;
  if (e.random) {
    let w = e.resources.slice(0);
    for (o = []; w.length > 1; ) {
      const N = Math.floor(Math.random() * w.length);
      o.push(w[N]), w = w.slice(0, N).concat(w.slice(N + 1));
    }
    o = o.concat(w);
  } else o = e.resources.slice(s).concat(e.resources.slice(0, s));
  const a = Date.now();
  let l = "pending", u = 0, c, f = null, d = [], h = [];
  typeof i == "function" && h.push(i);
  function m() {
    f && (clearTimeout(f), f = null);
  }
  function k() {
    l === "pending" && (l = "aborted"), m(), d.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), d = [];
  }
  function b(w, N) {
    N && (h = []), typeof w == "function" && h.push(w);
  }
  function x() {
    return {
      startTime: a,
      payload: t,
      status: l,
      queriesSent: u,
      queriesPending: d.length,
      subscribe: b,
      abort: k
    };
  }
  function S() {
    l = "failed", h.forEach((w) => {
      w(void 0, c);
    });
  }
  function v() {
    d.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), d = [];
  }
  function P(w, N, j) {
    const O = N !== "success";
    switch (d = d.filter((V) => V !== w), l) {
      case "pending":
        break;
      case "failed":
        if (O || !e.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (N === "abort") {
      c = j, S();
      return;
    }
    if (O) {
      c = j, d.length || (o.length ? E() : S());
      return;
    }
    if (m(), v(), !e.random) {
      const V = e.resources.indexOf(w.resource);
      V !== -1 && V !== e.index && (e.index = V);
    }
    l = "completed", h.forEach((V) => {
      V(j);
    });
  }
  function E() {
    if (l !== "pending") return;
    m();
    const w = o.shift();
    if (w === void 0) {
      if (d.length) {
        f = setTimeout(() => {
          m(), l === "pending" && (v(), S());
        }, e.timeout);
        return;
      }
      S();
      return;
    }
    const N = {
      status: "pending",
      resource: w,
      callback: (j, O) => {
        P(N, j, O);
      }
    };
    d.push(N), u++, f = setTimeout(E, e.rotate), n(w, t, N.callback);
  }
  return setTimeout(E), x;
}
function Ma(e) {
  const t = {
    ...Zc,
    ...e
  };
  let n = [];
  function i() {
    n = n.filter((a) => a().status === "pending");
  }
  function r(a, l, u) {
    const c = Jc(t, a, l, (f, d) => {
      i(), u && u(f, d);
    });
    return n.push(c), c;
  }
  function s(a) {
    return n.find((l) => a(l)) || null;
  }
  return {
    query: r,
    find: s,
    setIndex: (a) => {
      t.index = a;
    },
    getIndex: () => t.index,
    cleanup: i
  };
}
function gs() {
}
const Wn = /* @__PURE__ */ Object.create(null);
function ef(e) {
  if (!Wn[e]) {
    const t = ur(e);
    if (!t) return;
    const n = Ma(t), i = {
      config: t,
      redundancy: n
    };
    Wn[e] = i;
  }
  return Wn[e];
}
function tf(e, t, n) {
  let i, r;
  if (typeof e == "string") {
    const s = ki(e);
    if (!s)
      return n(void 0, 424), gs;
    r = s.send;
    const o = ef(e);
    o && (i = o.redundancy);
  } else {
    const s = ar(e);
    if (s) {
      i = Ma(s);
      const o = e.resources ? e.resources[0] : "", a = ki(o);
      a && (r = a.send);
    }
  }
  return !i || !r ? (n(void 0, 424), gs) : i.query(t, r, n)().abort;
}
function ys() {
}
function nf(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, Gc(e);
  }));
}
function rf(e) {
  const t = [], n = [];
  return e.forEach((i) => {
    (i.match(Aa) ? t : n).push(i);
  }), {
    valid: t,
    invalid: n
  };
}
function Rt(e, t, n) {
  function i() {
    const r = e.pendingIcons;
    t.forEach((s) => {
      r && r.delete(s), e.icons[s] || e.missing.add(s);
    });
  }
  if (n && typeof n == "object") try {
    if (!Ea(e, n).length) {
      i();
      return;
    }
  } catch (r) {
    console.error(r);
  }
  i(), nf(e);
}
function xs(e, t) {
  e instanceof Promise ? e.then((n) => {
    t(n);
  }).catch(() => {
    t(null);
  }) : t(e);
}
function sf(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: n, prefix: i } = e, r = e.iconsToLoad;
    if (delete e.iconsToLoad, !r || !r.length) return;
    const s = e.loadIcon;
    if (e.loadIcons && (r.length > 1 || !s)) {
      xs(e.loadIcons(r, i, n), (c) => {
        Rt(e, r, c);
      });
      return;
    }
    if (s) {
      r.forEach((c) => {
        const f = s(c, i, n);
        xs(f, (d) => {
          const h = d ? {
            prefix: i,
            icons: { [c]: d }
          } : null;
          Rt(e, [c], h);
        });
      });
      return;
    }
    const { valid: o, invalid: a } = rf(r);
    if (a.length && Rt(e, a, null), !o.length) return;
    const l = i.match(Aa) ? ki(n) : null;
    if (!l) {
      Rt(e, o, null);
      return;
    }
    l.prepare(n, i, o).forEach((c) => {
      tf(n, c, (f) => {
        Rt(e, c.icons, f);
      });
    });
  }));
}
const of = (e, t) => {
  const n = Qc(e, !0, Ia()), i = Xc(n);
  if (!i.pending.length) {
    let l = !0;
    return t && setTimeout(() => {
      l && t(i.loaded, i.missing, i.pending, ys);
    }), () => {
      l = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), s = [];
  let o, a;
  return i.pending.forEach((l) => {
    const { provider: u, prefix: c } = l;
    if (c === a && u === o) return;
    o = u, a = c, s.push(vt(u, c));
    const f = r[u] || (r[u] = /* @__PURE__ */ Object.create(null));
    f[c] || (f[c] = []);
  }), i.pending.forEach((l) => {
    const { provider: u, prefix: c, name: f } = l, d = vt(u, c), h = d.pendingIcons || (d.pendingIcons = /* @__PURE__ */ new Set());
    h.has(f) || (h.add(f), r[u][c].push(f));
  }), s.forEach((l) => {
    const u = r[l.provider][l.prefix];
    u.length && sf(l, u);
  }), t ? Yc(t, i, s) : ys;
};
function af(e, t) {
  const n = { ...e };
  for (const i in t) {
    const r = t[i], s = typeof r;
    i in Da ? (r === null || r && (s === "string" || s === "number")) && (n[i] = r) : s === typeof n[i] && (n[i] = i === "rotate" ? r % 4 : r);
  }
  return n;
}
const lf = /[\s,]+/;
function uf(e, t) {
  t.split(lf).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function cf(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function i(r) {
    for (; r < 0; ) r += 4;
    return r % 4;
  }
  if (n === "") {
    const r = parseInt(e);
    return isNaN(r) ? 0 : i(r);
  } else if (n !== e) {
    let r = 0;
    switch (n) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let s = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(s) ? 0 : (s = s / r, s % 1 === 0 ? i(s) : 0);
    }
  }
  return t;
}
function ff(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const i in t) n += " " + i + '="' + t[i] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function hf(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function df(e) {
  return "data:image/svg+xml," + hf(e);
}
function pf(e) {
  return 'url("' + df(e) + '")';
}
let $t;
function mf() {
  try {
    $t = window.trustedTypes.createPolicy("iconify", { createHTML: (e) => e });
  } catch {
    $t = null;
  }
}
function gf(e) {
  return $t === void 0 && mf(), $t ? $t.createHTML(e) : e;
}
const Ra = {
  ...ja,
  inline: !1
}, yf = {
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, xf = {
  display: "inline-block"
}, Si = {
  backgroundColor: "currentColor"
}, La = {
  backgroundColor: "transparent"
}, bs = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, vs = {
  WebkitMask: Si,
  mask: Si,
  background: La
};
for (const e in vs) {
  const t = vs[e];
  for (const n in bs)
    t[e + n] = bs[n];
}
const bf = {
  ...Ra,
  inline: !0
};
function ws(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const vf = (e, t, n) => {
  const i = t.inline ? bf : Ra, r = af(i, t), s = t.mode || "svg", o = {}, a = t.style || {}, l = {
    ...s === "svg" ? yf : {}
  };
  if (n) {
    const b = On(n, !1, !0);
    if (b) {
      const x = ["iconify"], S = [
        "provider",
        "prefix"
      ];
      for (const v of S)
        b[v] && x.push("iconify--" + b[v]);
      l.className = x.join(" ");
    }
  }
  for (let b in t) {
    const x = t[b];
    if (x !== void 0)
      switch (b) {
        // Properties to ignore
        case "icon":
        case "style":
        case "children":
        case "onLoad":
        case "mode":
        case "ssr":
        case "fallback":
          break;
        // Forward ref
        case "_ref":
          l.ref = x;
          break;
        // Merge class names
        case "className":
          l[b] = (l[b] ? l[b] + " " : "") + x;
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          r[b] = x === !0 || x === "true" || x === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof x == "string" && uf(r, x);
          break;
        // Color: copy to style
        case "color":
          o.color = x;
          break;
        // Rotation as string
        case "rotate":
          typeof x == "string" ? r[b] = cf(x) : typeof x == "number" && (r[b] = x);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          x !== !0 && x !== "true" && delete l["aria-hidden"];
          break;
        // Copy missing property if it does not exist in customisations
        default:
          i[b] === void 0 && (l[b] = x);
      }
  }
  const u = Mc(e, r), c = u.attributes;
  if (r.inline && (o.verticalAlign = "-0.125em"), s === "svg") {
    l.style = {
      ...o,
      ...a
    }, Object.assign(l, c);
    let b = 0, x = t.id;
    return typeof x == "string" && (x = x.replace(/-/g, "_")), l.dangerouslySetInnerHTML = {
      __html: gf(Oc(u.body, x ? () => x + "ID" + b++ : "iconifyReact"))
    }, Tn("svg", l);
  }
  const { body: f, width: d, height: h } = e, m = s === "mask" || (s === "bg" ? !1 : f.indexOf("currentColor") !== -1), k = ff(f, {
    ...c,
    width: d + "",
    height: h + ""
  });
  return l.style = {
    ...o,
    "--svg": pf(k),
    width: ws(c.width),
    height: ws(c.height),
    ...xf,
    ...m ? Si : La,
    ...a
  }, Tn("span", l);
};
Ia(!0);
Fc("", qc);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((i) => {
      try {
        // Check if item is an object and not null/array
        (typeof i != "object" || i === null || i instanceof Array || // Check for 'icons' and 'prefix'
        typeof i.icons != "object" || typeof i.prefix != "string" || // Add icon set
        !Pc(i)) && console.error(n);
      } catch {
        console.error(n);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const i = "IconifyProviders[" + n + "] is invalid.";
        try {
          const r = t[n];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          Bc(n, r) || console.error(i);
        } catch {
          console.error(i);
        }
      }
  }
}
function Va(e) {
  const [t, n] = Ne(!!e.ssr), [i, r] = Ne({});
  function s(h) {
    if (h) {
      const m = e.icon;
      if (typeof m == "object")
        return {
          name: "",
          data: m
        };
      const k = ds(m);
      if (k)
        return {
          name: m,
          data: k
        };
    }
    return {
      name: ""
    };
  }
  const [o, a] = Ne(s(!!e.ssr));
  function l() {
    const h = i.callback;
    h && (h(), r({}));
  }
  function u(h) {
    if (JSON.stringify(o) !== JSON.stringify(h))
      return l(), a(h), !0;
  }
  function c() {
    var h;
    const m = e.icon;
    if (typeof m == "object") {
      u({
        name: "",
        data: m
      });
      return;
    }
    const k = ds(m);
    if (u({
      name: m,
      data: k
    }))
      if (k === void 0) {
        const b = of([m], c);
        r({
          callback: b
        });
      } else k && ((h = e.onLoad) === null || h === void 0 || h.call(e, m));
  }
  Me(() => (n(!0), l), []), Me(() => {
    t && c();
  }, [e.icon, t]);
  const { name: f, data: d } = o;
  return d ? vf({
    ...or,
    ...d
  }, e, f) : e.children ? e.children : e.fallback ? e.fallback : Tn("span", {});
}
const ue = rr((e, t) => Va({
  ...e,
  _ref: t
}));
rr((e, t) => Va({
  inline: !0,
  ...e,
  _ref: t
}));
const wf = ({
  title: e,
  subtitle: t,
  items: n,
  className: i = ""
}) => /* @__PURE__ */ g.jsx("section", { className: `bento-grid-section ${i}`, children: /* @__PURE__ */ g.jsxs("div", { className: "bento-grid-container", children: [
  (e || t) && /* @__PURE__ */ g.jsxs("div", { className: "bento-grid-header", children: [
    e && /* @__PURE__ */ g.jsx("h2", { className: "bento-grid-title", children: e }),
    t && /* @__PURE__ */ g.jsx("p", { className: "bento-grid-subtitle", children: t })
  ] }),
  /* @__PURE__ */ g.jsx("div", { className: "bento-grid", children: n.map((r, s) => {
    const o = r.colSpan ? `col-span-${r.colSpan}` : "col-span-1", a = r.rowSpan ? `row-span-${r.rowSpan}` : "row-span-1", l = r.href ? "a" : "div", u = r.href ? { href: r.href, className: `bento-card ${o} ${a} ${r.className || ""} clickable` } : { className: `bento-card ${o} ${a} ${r.className || ""}` };
    return /* @__PURE__ */ g.jsxs(l, { ...u, children: [
      r.image && /* @__PURE__ */ g.jsx("div", { className: "bento-card-image-wrapper", children: /* @__PURE__ */ g.jsx("img", { src: r.image.src, alt: r.image.alt, className: "bento-card-image" }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "bento-card-content", children: [
        r.icon && /* @__PURE__ */ g.jsx("div", { className: "bento-card-icon", children: /* @__PURE__ */ g.jsx(ue, { icon: r.icon, width: "24", height: "24" }) }),
        /* @__PURE__ */ g.jsxs("div", { className: "bento-card-text", children: [
          /* @__PURE__ */ g.jsx("h3", { className: "bento-card-title", children: r.title }),
          r.description && /* @__PURE__ */ g.jsx("p", { className: "bento-card-description", children: r.description })
        ] })
      ] })
    ] }, s);
  }) })
] }) }), Ti = ({
  children: e,
  className: t = "",
  variant: n = "primary",
  size: i = "md",
  fullWidth: r = !1,
  leftIcon: s,
  rightIcon: o,
  isLoading: a = !1,
  disabled: l,
  ...u
}) => {
  const c = [
    "btn",
    `btn-${n}`,
    `btn-${i}`,
    r ? "btn-full" : "",
    t
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsxs("button", { className: c, disabled: l || a, ...u, children: [
    a && /* @__PURE__ */ g.jsx("div", { className: "btn-spinner", "aria-hidden": "true" }),
    !a && s && /* @__PURE__ */ g.jsx(ue, { icon: s, width: "20", height: "20" }),
    /* @__PURE__ */ g.jsx("span", { children: e }),
    !a && o && /* @__PURE__ */ g.jsx(ue, { icon: o, width: "20", height: "20" })
  ] });
}, Oa = ({
  children: e,
  className: t = "",
  variant: n = "default",
  padding: i = "md",
  hoverable: r = !1,
  elevation: s = "sm",
  onClick: o
}) => {
  const a = [
    "card",
    `card-${n}`,
    `card-padding-${i}`,
    kf("elevation", s),
    r ? "card-hoverable" : "",
    t
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsx("div", { className: a, onClick: o, children: e });
}, kf = (e, t) => t && t !== "none" ? `card-${e}-${t}` : "", Fa = ({
  children: e,
  className: t = "",
  position: n = "right",
  label: i = "Toggle menu"
}) => {
  const [r, s] = Ne(!1), o = Fe(null);
  Me(() => {
    const u = (c) => {
      o.current && !o.current.contains(c.target) && s(!1);
    };
    return r && document.addEventListener("mousedown", u), () => {
      document.removeEventListener("mousedown", u);
    };
  }, [r]), Me(() => {
    const u = (c) => {
      c.key === "Escape" && s(!1);
    };
    return r && document.addEventListener("keydown", u), () => {
      document.removeEventListener("keydown", u);
    };
  }, [r]), Me(() => (r ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [r]);
  const a = () => {
    s(!r);
  }, l = (u) => {
    u.target.closest("a") && s(!1);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: `hamburger-menu ${t}`, ref: o, children: [
    /* @__PURE__ */ g.jsx(
      "button",
      {
        className: "hamburger-toggle",
        onClick: a,
        "aria-label": i,
        "aria-expanded": r,
        children: /* @__PURE__ */ g.jsx(
          ue,
          {
            icon: r ? "mdi:close" : "mdi:menu",
            width: "24",
            height: "24"
          }
        )
      }
    ),
    r && /* @__PURE__ */ g.jsx(
      "div",
      {
        className: "hamburger-overlay",
        onClick: () => s(!1)
      }
    ),
    /* @__PURE__ */ g.jsx(
      "div",
      {
        className: `hamburger-content-container ${t} ${n} ${r ? "open" : ""}`,
        onClick: l,
        children: /* @__PURE__ */ g.jsx("div", { className: "hamburger-content", children: e })
      }
    )
  ] });
}, Ba = (e = {}) => {
  const {
    breakpoint: t = 768,
    useActualDetection: n = !0,
    touchClassName: i = "touch-device"
  } = e, [r, s] = Ne(!1), o = Fe(null);
  return Me(() => {
    const a = () => {
      let c = !1;
      n && (c = window.matchMedia("(hover: none) and (pointer: coarse)").matches), !c && window.innerWidth <= t && (c = !0), !c && "ontouchstart" in window && (c = !0), o.current !== c && (s(c), o.current = c, c ? document.documentElement.classList.add(i) : document.documentElement.classList.remove(i));
    };
    a();
    let l;
    const u = () => {
      clearTimeout(l), l = setTimeout(a, 100);
    };
    return window.addEventListener("resize", u), () => {
      window.removeEventListener("resize", u), clearTimeout(l), document.documentElement.classList.remove(i);
    };
  }, [t, n, i]), r;
}, Sf = (e) => {
  const {
    menuBar: t,
    utilityButtons: n,
    sticky: i = !1,
    className: r = "",
    mobileBreakpoint: s = 768,
    logoHref: o,
    logoSrc: a,
    logoTarget: l = "_self",
    logoClassName: u = "",
    altText: c = "Logo"
  } = e, f = Ba({ breakpoint: s });
  return /* @__PURE__ */ g.jsxs("header", { className: `header ${i ? "header-sticky" : ""} ${r}`, children: [
    /* @__PURE__ */ g.jsx("div", { className: "header-logo-wrapper", children: a && /* @__PURE__ */ g.jsx(
      "a",
      {
        href: o || "#",
        target: l,
        className: `${u} hover-lift`,
        "aria-label": "Home",
        children: /* @__PURE__ */ g.jsx(
          "img",
          {
            src: a,
            alt: c,
            className: "header-logo-img"
          }
        )
      }
    ) }),
    /* @__PURE__ */ g.jsxs("div", { className: `header-right ${f ? "hidden" : "flex"}`, children: [
      /* @__PURE__ */ g.jsx("div", { className: "header-nav", children: t }),
      n && n.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "header-utility", children: n })
    ] }),
    f && /* @__PURE__ */ g.jsxs("div", { className: "header-mobile-wrapper md:hidden", children: [
      n && n.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "header-mobile-utility", children: n }),
      /* @__PURE__ */ g.jsx("div", { className: "header-hamburger", children: /* @__PURE__ */ g.jsx(
        Fa,
        {
          position: "right",
          label: "Navigation menu",
          children: /* @__PURE__ */ g.jsxs("div", { className: "header-mobile-menu-content", children: [
            t,
            n && n.length > 0 && /* @__PURE__ */ g.jsx(g.Fragment, { children: /* @__PURE__ */ g.jsxs("div", { className: "header-mobile-settings", children: [
              /* @__PURE__ */ g.jsx("h3", { className: "header-mobile-settings-title", children: "Settings" }),
              n
            ] }) })
          ] })
        }
      ) })
    ] })
  ] });
}, _a = ot({});
function Tf(e) {
  const t = Fe(null);
  return t.current === null && (t.current = e()), t.current;
}
const cr = typeof window < "u", Cf = cr ? hc : Me, fr = /* @__PURE__ */ ot(null);
function hr(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function dr(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const Ue = (e, t, n) => n > t ? t : n < e ? e : n;
function Ci(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let St = () => {
}, He = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (St = (e, t, n) => {
  !e && typeof console < "u" && console.warn(Ci(t, n));
}, He = (e, t, n) => {
  if (!e)
    throw new Error(Ci(t, n));
});
const We = {}, za = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function $a(e) {
  return typeof e == "object" && e !== null;
}
const Ua = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function pr(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Ae = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Pf = (e, t) => (n) => t(e(n)), nn = (...e) => e.reduce(Pf), Xt = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const i = t - e;
  return i === 0 ? 1 : (n - e) / i;
};
class mr {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return hr(this.subscriptions, t), () => dr(this.subscriptions, t);
  }
  notify(t, n, i) {
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](t, n, i);
      else
        for (let s = 0; s < r; s++) {
          const o = this.subscriptions[s];
          o && o(t, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Re = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, Ee = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function Ha(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const ks = /* @__PURE__ */ new Set();
function gr(e, t, n) {
  e || ks.has(t) || (console.warn(Ci(t, n)), ks.add(t));
}
const Wa = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Ef = 1e-7, Af = 12;
function If(e, t, n, i, r) {
  let s, o, a = 0;
  do
    o = t + (n - t) / 2, s = Wa(o, i, r) - e, s > 0 ? n = o : t = o;
  while (Math.abs(s) > Ef && ++a < Af);
  return o;
}
function rn(e, t, n, i) {
  if (e === t && n === i)
    return Ae;
  const r = (s) => If(s, 0, 1, e, n);
  return (s) => s === 0 || s === 1 ? s : Wa(r(s), t, i);
}
const qa = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Ga = (e) => (t) => 1 - e(1 - t), Ka = /* @__PURE__ */ rn(0.33, 1.53, 0.69, 0.99), yr = /* @__PURE__ */ Ga(Ka), Ya = /* @__PURE__ */ qa(yr), Xa = (e) => (e *= 2) < 1 ? 0.5 * yr(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), xr = (e) => 1 - Math.sin(Math.acos(e)), Qa = Ga(xr), Za = qa(xr), Df = /* @__PURE__ */ rn(0.42, 0, 1, 1), jf = /* @__PURE__ */ rn(0, 0, 0.58, 1), Ja = /* @__PURE__ */ rn(0.42, 0, 0.58, 1), Nf = (e) => Array.isArray(e) && typeof e[0] != "number", el = (e) => Array.isArray(e) && typeof e[0] == "number", Ss = {
  linear: Ae,
  easeIn: Df,
  easeInOut: Ja,
  easeOut: jf,
  circIn: xr,
  circInOut: Za,
  circOut: Qa,
  backIn: yr,
  backInOut: Ya,
  backOut: Ka,
  anticipate: Xa
}, Mf = (e) => typeof e == "string", Ts = (e) => {
  if (el(e)) {
    He(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, i, r] = e;
    return rn(t, n, i, r);
  } else if (Mf(e))
    return He(Ss[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Ss[e];
  return e;
}, fn = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Rf(e, t) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), r = !1, s = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    o.has(c) && (u.schedule(c), e()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, f = !1, d = !1) => {
      const m = d && r ? n : i;
      return f && o.add(c), m.has(c) || m.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      i.delete(c), o.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, r) {
        s = !0;
        return;
      }
      r = !0, [n, i] = [i, n], n.forEach(l), n.clear(), r = !1, s && (s = !1, u.process(c));
    }
  };
  return u;
}
const Lf = 40;
function tl(e, t) {
  let n = !1, i = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, s = () => n = !0, o = fn.reduce((v, P) => (v[P] = Rf(s), v), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: f, preRender: d, render: h, postRender: m } = o, k = () => {
    const v = We.useManualTiming ? r.timestamp : performance.now();
    n = !1, We.useManualTiming || (r.delta = i ? 1e3 / 60 : Math.max(Math.min(v - r.timestamp, Lf), 1)), r.timestamp = v, r.isProcessing = !0, a.process(r), l.process(r), u.process(r), c.process(r), f.process(r), d.process(r), h.process(r), m.process(r), r.isProcessing = !1, n && t && (i = !1, e(k));
  }, b = () => {
    n = !0, i = !0, r.isProcessing || e(k);
  };
  return { schedule: fn.reduce((v, P) => {
    const E = o[P];
    return v[P] = (w, N = !1, j = !1) => (n || b(), E.schedule(w, N, j)), v;
  }, {}), cancel: (v) => {
    for (let P = 0; P < fn.length; P++)
      o[fn[P]].cancel(v);
  }, state: r, steps: o };
}
const { schedule: ee, cancel: Ye, state: le, steps: qn } = /* @__PURE__ */ tl(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ae, !0);
let bn;
function Vf() {
  bn = void 0;
}
const ge = {
  now: () => (bn === void 0 && ge.set(le.isProcessing || We.useManualTiming ? le.timestamp : performance.now()), bn),
  set: (e) => {
    bn = e, queueMicrotask(Vf);
  }
}, nl = (e) => (t) => typeof t == "string" && t.startsWith(e), il = /* @__PURE__ */ nl("--"), Of = /* @__PURE__ */ nl("var(--"), br = (e) => Of(e) ? Ff.test(e.split("/*")[0].trim()) : !1, Ff = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Tt = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, Qt = {
  ...Tt,
  transform: (e) => Ue(0, 1, e)
}, hn = {
  ...Tt,
  default: 1
}, Ut = (e) => Math.round(e * 1e5) / 1e5, vr = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Bf(e) {
  return e == null;
}
const _f = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, wr = (e, t) => (n) => !!(typeof n == "string" && _f.test(n) && n.startsWith(e) || t && !Bf(n) && Object.prototype.hasOwnProperty.call(n, t)), rl = (e, t, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [r, s, o, a] = i.match(vr);
  return {
    [e]: parseFloat(r),
    [t]: parseFloat(s),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, zf = (e) => Ue(0, 255, e), Gn = {
  ...Tt,
  transform: (e) => Math.round(zf(e))
}, nt = {
  test: /* @__PURE__ */ wr("rgb", "red"),
  parse: /* @__PURE__ */ rl("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: i = 1 }) => "rgba(" + Gn.transform(e) + ", " + Gn.transform(t) + ", " + Gn.transform(n) + ", " + Ut(Qt.transform(i)) + ")"
};
function $f(e) {
  let t = "", n = "", i = "", r = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), i = e.substring(5, 7), r = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), i = e.substring(3, 4), r = e.substring(4, 5), t += t, n += n, i += i, r += r), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Pi = {
  test: /* @__PURE__ */ wr("#"),
  parse: $f,
  transform: nt.transform
}, sn = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), Ke = /* @__PURE__ */ sn("deg"), Be = /* @__PURE__ */ sn("%"), M = /* @__PURE__ */ sn("px"), Uf = /* @__PURE__ */ sn("vh"), Hf = /* @__PURE__ */ sn("vw"), Cs = {
  ...Be,
  parse: (e) => Be.parse(e) / 100,
  transform: (e) => Be.transform(e * 100)
}, ft = {
  test: /* @__PURE__ */ wr("hsl", "hue"),
  parse: /* @__PURE__ */ rl("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(e) + ", " + Be.transform(Ut(t)) + ", " + Be.transform(Ut(n)) + ", " + Ut(Qt.transform(i)) + ")"
}, oe = {
  test: (e) => nt.test(e) || Pi.test(e) || ft.test(e),
  parse: (e) => nt.test(e) ? nt.parse(e) : ft.test(e) ? ft.parse(e) : Pi.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? nt.transform(e) : ft.transform(e),
  getAnimatableNone: (e) => {
    const t = oe.parse(e);
    return t.alpha = 0, oe.transform(t);
  }
}, Wf = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function qf(e) {
  return isNaN(e) && typeof e == "string" && (e.match(vr)?.length || 0) + (e.match(Wf)?.length || 0) > 0;
}
const sl = "number", ol = "color", Gf = "var", Kf = "var(", Ps = "${}", Yf = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Zt(e) {
  const t = e.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let s = 0;
  const a = t.replace(Yf, (l) => (oe.test(l) ? (i.color.push(s), r.push(ol), n.push(oe.parse(l))) : l.startsWith(Kf) ? (i.var.push(s), r.push(Gf), n.push(l)) : (i.number.push(s), r.push(sl), n.push(parseFloat(l))), ++s, Ps)).split(Ps);
  return { values: n, split: a, indexes: i, types: r };
}
function al(e) {
  return Zt(e).values;
}
function ll(e) {
  const { split: t, types: n } = Zt(e), i = t.length;
  return (r) => {
    let s = "";
    for (let o = 0; o < i; o++)
      if (s += t[o], r[o] !== void 0) {
        const a = n[o];
        a === sl ? s += Ut(r[o]) : a === ol ? s += oe.transform(r[o]) : s += r[o];
      }
    return s;
  };
}
const Xf = (e) => typeof e == "number" ? 0 : oe.test(e) ? oe.getAnimatableNone(e) : e;
function Qf(e) {
  const t = al(e);
  return ll(e)(t.map(Xf));
}
const Xe = {
  test: qf,
  parse: al,
  createTransformer: ll,
  getAnimatableNone: Qf
};
function Kn(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Zf({ hue: e, saturation: t, lightness: n, alpha: i }) {
  e /= 360, t /= 100, n /= 100;
  let r = 0, s = 0, o = 0;
  if (!t)
    r = s = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    r = Kn(l, a, e + 1 / 3), s = Kn(l, a, e), o = Kn(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function Pn(e, t) {
  return (n) => n > 0 ? t : e;
}
const ne = (e, t, n) => e + (t - e) * n, Yn = (e, t, n) => {
  const i = e * e, r = n * (t * t - i) + i;
  return r < 0 ? 0 : Math.sqrt(r);
}, Jf = [Pi, nt, ft], eh = (e) => Jf.find((t) => t.test(e));
function Es(e) {
  const t = eh(e);
  if (St(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === ft && (n = Zf(n)), n;
}
const As = (e, t) => {
  const n = Es(e), i = Es(t);
  if (!n || !i)
    return Pn(e, t);
  const r = { ...n };
  return (s) => (r.red = Yn(n.red, i.red, s), r.green = Yn(n.green, i.green, s), r.blue = Yn(n.blue, i.blue, s), r.alpha = ne(n.alpha, i.alpha, s), nt.transform(r));
}, Ei = /* @__PURE__ */ new Set(["none", "hidden"]);
function th(e, t) {
  return Ei.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function nh(e, t) {
  return (n) => ne(e, t, n);
}
function kr(e) {
  return typeof e == "number" ? nh : typeof e == "string" ? br(e) ? Pn : oe.test(e) ? As : sh : Array.isArray(e) ? ul : typeof e == "object" ? oe.test(e) ? As : ih : Pn;
}
function ul(e, t) {
  const n = [...e], i = n.length, r = e.map((s, o) => kr(s)(s, t[o]));
  return (s) => {
    for (let o = 0; o < i; o++)
      n[o] = r[o](s);
    return n;
  };
}
function ih(e, t) {
  const n = { ...e, ...t }, i = {};
  for (const r in n)
    e[r] !== void 0 && t[r] !== void 0 && (i[r] = kr(e[r])(e[r], t[r]));
  return (r) => {
    for (const s in i)
      n[s] = i[s](r);
    return n;
  };
}
function rh(e, t) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < t.values.length; r++) {
    const s = t.types[r], o = e.indexes[s][i[s]], a = e.values[o] ?? 0;
    n[r] = a, i[s]++;
  }
  return n;
}
const sh = (e, t) => {
  const n = Xe.createTransformer(t), i = Zt(e), r = Zt(t);
  return i.indexes.var.length === r.indexes.var.length && i.indexes.color.length === r.indexes.color.length && i.indexes.number.length >= r.indexes.number.length ? Ei.has(e) && !r.values.length || Ei.has(t) && !i.values.length ? th(e, t) : nn(ul(rh(i, r), r.values), n) : (St(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Pn(e, t));
};
function cl(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? ne(e, t, n) : kr(e)(e, t);
}
const oh = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => ee.update(t, n),
    stop: () => Ye(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => le.isProcessing ? le.timestamp : ge.now()
  };
}, fl = (e, t, n = 10) => {
  let i = "";
  const r = Math.max(Math.round(t / n), 2);
  for (let s = 0; s < r; s++)
    i += Math.round(e(s / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, En = 2e4;
function Sr(e) {
  let t = 0;
  const n = 50;
  let i = e.next(t);
  for (; !i.done && t < En; )
    t += n, i = e.next(t);
  return t >= En ? 1 / 0 : t;
}
function ah(e, t = 100, n) {
  const i = n({ ...e, keyframes: [0, t] }), r = Math.min(Sr(i), En);
  return {
    type: "keyframes",
    ease: (s) => i.next(r * s).value / t,
    duration: /* @__PURE__ */ Ee(r)
  };
}
const lh = 5;
function hl(e, t, n) {
  const i = Math.max(t - lh, 0);
  return Ha(n - e(i), t - i);
}
const te = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Xn = 1e-3;
function uh({ duration: e = te.duration, bounce: t = te.bounce, velocity: n = te.velocity, mass: i = te.mass }) {
  let r, s;
  St(e <= /* @__PURE__ */ Re(te.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = Ue(te.minDamping, te.maxDamping, o), e = Ue(te.minDuration, te.maxDuration, /* @__PURE__ */ Ee(e)), o < 1 ? (r = (u) => {
    const c = u * o, f = c * e, d = c - n, h = Ai(u, o), m = Math.exp(-f);
    return Xn - d / h * m;
  }, s = (u) => {
    const f = u * o * e, d = f * n + n, h = Math.pow(o, 2) * Math.pow(u, 2) * e, m = Math.exp(-f), k = Ai(Math.pow(u, 2), o);
    return (-r(u) + Xn > 0 ? -1 : 1) * ((d - h) * m) / k;
  }) : (r = (u) => {
    const c = Math.exp(-u * e), f = (u - n) * e + 1;
    return -Xn + c * f;
  }, s = (u) => {
    const c = Math.exp(-u * e), f = (n - u) * (e * e);
    return c * f;
  });
  const a = 5 / e, l = fh(r, s, a);
  if (e = /* @__PURE__ */ Re(e), isNaN(l))
    return {
      stiffness: te.stiffness,
      damping: te.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(i * u),
      duration: e
    };
  }
}
const ch = 12;
function fh(e, t, n) {
  let i = n;
  for (let r = 1; r < ch; r++)
    i = i - e(i) / t(i);
  return i;
}
function Ai(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const hh = ["duration", "bounce"], dh = ["stiffness", "damping", "mass"];
function Is(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function ph(e) {
  let t = {
    velocity: te.velocity,
    stiffness: te.stiffness,
    damping: te.damping,
    mass: te.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Is(e, dh) && Is(e, hh))
    if (e.visualDuration) {
      const n = e.visualDuration, i = 2 * Math.PI / (n * 1.2), r = i * i, s = 2 * Ue(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(r);
      t = {
        ...t,
        mass: te.mass,
        stiffness: r,
        damping: s
      };
    } else {
      const n = uh(e);
      t = {
        ...t,
        ...n,
        mass: te.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function An(e = te.visualDuration, t = te.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: i, restDelta: r } = n;
  const s = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: s }, { stiffness: l, damping: u, mass: c, duration: f, velocity: d, isResolvedFromDuration: h } = ph({
    ...n,
    velocity: -/* @__PURE__ */ Ee(n.velocity || 0)
  }), m = d || 0, k = u / (2 * Math.sqrt(l * c)), b = o - s, x = /* @__PURE__ */ Ee(Math.sqrt(l / c)), S = Math.abs(b) < 5;
  i || (i = S ? te.restSpeed.granular : te.restSpeed.default), r || (r = S ? te.restDelta.granular : te.restDelta.default);
  let v;
  if (k < 1) {
    const E = Ai(x, k);
    v = (w) => {
      const N = Math.exp(-k * x * w);
      return o - N * ((m + k * x * b) / E * Math.sin(E * w) + b * Math.cos(E * w));
    };
  } else if (k === 1)
    v = (E) => o - Math.exp(-x * E) * (b + (m + x * b) * E);
  else {
    const E = x * Math.sqrt(k * k - 1);
    v = (w) => {
      const N = Math.exp(-k * x * w), j = Math.min(E * w, 300);
      return o - N * ((m + k * x * b) * Math.sinh(j) + E * b * Math.cosh(j)) / E;
    };
  }
  const P = {
    calculatedDuration: h && f || null,
    next: (E) => {
      const w = v(E);
      if (h)
        a.done = E >= f;
      else {
        let N = E === 0 ? m : 0;
        k < 1 && (N = E === 0 ? /* @__PURE__ */ Re(m) : hl(v, E, w));
        const j = Math.abs(N) <= i, O = Math.abs(o - w) <= r;
        a.done = j && O;
      }
      return a.value = a.done ? o : w, a;
    },
    toString: () => {
      const E = Math.min(Sr(P), En), w = fl((N) => P.next(E * N).value, E, 30);
      return E + "ms " + w;
    },
    toTransition: () => {
    }
  };
  return P;
}
An.applyToOptions = (e) => {
  const t = ah(e, 100, An);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ Re(t.duration), e.type = "keyframes", e;
};
function Ii({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: r = 10, bounceStiffness: s = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const f = e[0], d = {
    done: !1,
    value: f
  }, h = (j) => a !== void 0 && j < a || l !== void 0 && j > l, m = (j) => a === void 0 ? l : l === void 0 || Math.abs(a - j) < Math.abs(l - j) ? a : l;
  let k = n * t;
  const b = f + k, x = o === void 0 ? b : o(b);
  x !== b && (k = x - f);
  const S = (j) => -k * Math.exp(-j / i), v = (j) => x + S(j), P = (j) => {
    const O = S(j), V = v(j);
    d.done = Math.abs(O) <= u, d.value = d.done ? x : V;
  };
  let E, w;
  const N = (j) => {
    h(d.value) && (E = j, w = An({
      keyframes: [d.value, m(d.value)],
      velocity: hl(v, j, d.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: s,
      restDelta: u,
      restSpeed: c
    }));
  };
  return N(0), {
    calculatedDuration: null,
    next: (j) => {
      let O = !1;
      return !w && E === void 0 && (O = !0, P(j), N(j)), E !== void 0 && j >= E ? w.next(j - E) : (!O && P(j), d);
    }
  };
}
function mh(e, t, n) {
  const i = [], r = n || We.mix || cl, s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = r(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Ae : t;
      a = nn(l, a);
    }
    i.push(a);
  }
  return i;
}
function gh(e, t, { clamp: n = !0, ease: i, mixer: r } = {}) {
  const s = e.length;
  if (He(s === t.length, "Both input and output ranges must be the same length", "range-length"), s === 1)
    return () => t[0];
  if (s === 2 && t[0] === t[1])
    return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = mh(t, i, r), l = a.length, u = (c) => {
    if (o && c < e[0])
      return t[0];
    let f = 0;
    if (l > 1)
      for (; f < e.length - 2 && !(c < e[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ Xt(e[f], e[f + 1], c);
    return a[f](d);
  };
  return n ? (c) => u(Ue(e[0], e[s - 1], c)) : u;
}
function yh(e, t) {
  const n = e[e.length - 1];
  for (let i = 1; i <= t; i++) {
    const r = /* @__PURE__ */ Xt(0, t, i);
    e.push(ne(n, 1, r));
  }
}
function xh(e) {
  const t = [0];
  return yh(t, e.length - 1), t;
}
function bh(e, t) {
  return e.map((n) => n * t);
}
function vh(e, t) {
  return e.map(() => t || Ja).splice(0, e.length - 1);
}
function ht({ duration: e = 300, keyframes: t, times: n, ease: i = "easeInOut" }) {
  const r = Nf(i) ? i.map(Ts) : Ts(i), s = {
    done: !1,
    value: t[0]
  }, o = bh(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : xh(t),
    e
  ), a = gh(o, t, {
    ease: Array.isArray(r) ? r : vh(t, r)
  });
  return {
    calculatedDuration: e,
    next: (l) => (s.value = a(l), s.done = l >= e, s)
  };
}
const wh = (e) => e !== null;
function Tr(e, { repeat: t, repeatType: n = "loop" }, i, r = 1) {
  const s = e.filter(wh), a = r < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : s.length - 1;
  return !a || i === void 0 ? s[a] : i;
}
const kh = {
  decay: Ii,
  inertia: Ii,
  tween: ht,
  keyframes: ht,
  spring: An
};
function dl(e) {
  typeof e.type == "string" && (e.type = kh[e.type]);
}
class Cr {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const Sh = (e) => e / 100;
class Pr extends Cr {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== ge.now() && this.tick(ge.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    dl(t);
    const { type: n = ht, repeat: i = 0, repeatDelay: r = 0, repeatType: s, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = n || ht;
    process.env.NODE_ENV !== "production" && l !== ht && He(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== ht && typeof a[0] != "number" && (this.mixKeyframes = nn(Sh, cl(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    s === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = Sr(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + r, this.totalDuration = this.resolvedDuration * (i + 1) - r, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: i, totalDuration: r, mixKeyframes: s, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: f, repeatType: d, repeatDelay: h, type: m, onUpdate: k, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - r / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const x = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), S = this.playbackSpeed >= 0 ? x < 0 : x > r;
    this.currentTime = Math.max(x, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let v = this.currentTime, P = i;
    if (f) {
      const j = Math.min(this.currentTime, r) / a;
      let O = Math.floor(j), V = j % 1;
      !V && j >= 1 && (V = 1), V === 1 && O--, O = Math.min(O, f + 1), !!(O % 2) && (d === "reverse" ? (V = 1 - V, h && (V -= h / a)) : d === "mirror" && (P = o)), v = Ue(0, 1, V) * a;
    }
    const E = S ? { done: !1, value: c[0] } : P.next(v);
    s && (E.value = s(E.value));
    let { done: w } = E;
    !S && l !== null && (w = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const N = this.holdTime === null && (this.state === "finished" || this.state === "running" && w);
    return N && m !== Ii && (E.value = Tr(c, this.options, b, this.speed)), k && k(E.value), N && this.finish(), E;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ Ee(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ee(t);
  }
  get time() {
    return /* @__PURE__ */ Ee(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ Re(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(ge.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ Ee(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = oh, startTime: n } = this.options;
    this.driver || (this.driver = t((r) => this.tick(r))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(ge.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
  }
}
function Th(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const it = (e) => e * 180 / Math.PI, Di = (e) => {
  const t = it(Math.atan2(e[1], e[0]));
  return ji(t);
}, Ch = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: Di,
  rotateZ: Di,
  skewX: (e) => it(Math.atan(e[1])),
  skewY: (e) => it(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, ji = (e) => (e = e % 360, e < 0 && (e += 360), e), Ds = Di, js = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Ns = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), Ph = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: js,
  scaleY: Ns,
  scale: (e) => (js(e) + Ns(e)) / 2,
  rotateX: (e) => ji(it(Math.atan2(e[6], e[5]))),
  rotateY: (e) => ji(it(Math.atan2(-e[2], e[0]))),
  rotateZ: Ds,
  rotate: Ds,
  skewX: (e) => it(Math.atan(e[4])),
  skewY: (e) => it(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Ni(e) {
  return e.includes("scale") ? 1 : 0;
}
function Mi(e, t) {
  if (!e || e === "none")
    return Ni(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, r;
  if (n)
    i = Ph, r = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = Ch, r = a;
  }
  if (!r)
    return Ni(t);
  const s = i[t], o = r[1].split(",").map(Ah);
  return typeof s == "function" ? s(o) : o[s];
}
const Eh = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return Mi(n, t);
};
function Ah(e) {
  return parseFloat(e.trim());
}
const Ct = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Pt = new Set(Ct), Ms = (e) => e === Tt || e === M, Ih = /* @__PURE__ */ new Set(["x", "y", "z"]), Dh = Ct.filter((e) => !Ih.has(e));
function jh(e) {
  const t = [];
  return Dh.forEach((n) => {
    const i = e.getValue(n);
    i !== void 0 && (t.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const rt = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => Mi(t, "x"),
  y: (e, { transform: t }) => Mi(t, "y")
};
rt.translateX = rt.x;
rt.translateY = rt.y;
const st = /* @__PURE__ */ new Set();
let Ri = !1, Li = !1, Vi = !1;
function pl() {
  if (Li) {
    const e = Array.from(st).filter((i) => i.needsMeasurement), t = new Set(e.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const r = jh(i);
      r.length && (n.set(i, r), i.render());
    }), e.forEach((i) => i.measureInitialState()), t.forEach((i) => {
      i.render();
      const r = n.get(i);
      r && r.forEach(([s, o]) => {
        i.getValue(s)?.set(o);
      });
    }), e.forEach((i) => i.measureEndState()), e.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Li = !1, Ri = !1, st.forEach((e) => e.complete(Vi)), st.clear();
}
function ml() {
  st.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Li = !0);
  });
}
function Nh() {
  Vi = !0, ml(), pl(), Vi = !1;
}
class Er {
  constructor(t, n, i, r, s, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = i, this.motionValue = r, this.element = s, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (st.add(this), Ri || (Ri = !0, ee.read(ml), ee.resolveKeyframes(pl))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: i, motionValue: r } = this;
    if (t[0] === null) {
      const s = r?.get(), o = t[t.length - 1];
      if (s !== void 0)
        t[0] = s;
      else if (i && n) {
        const a = i.readValue(n, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), r && s === void 0 && r.set(t[0]);
    }
    Th(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), st.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (st.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Mh = (e) => e.startsWith("--");
function Rh(e, t, n) {
  Mh(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const Lh = /* @__PURE__ */ pr(() => window.ScrollTimeline !== void 0), Vh = {};
function Oh(e, t) {
  const n = /* @__PURE__ */ pr(e);
  return () => Vh[t] ?? n();
}
const gl = /* @__PURE__ */ Oh(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), zt = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`, Rs = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ zt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ zt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ zt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ zt([0.33, 1.53, 0.69, 0.99])
};
function yl(e, t) {
  if (e)
    return typeof e == "function" ? gl() ? fl(e, t) : "ease-out" : el(e) ? zt(e) : Array.isArray(e) ? e.map((n) => yl(n, t) || Rs.easeOut) : Rs[e];
}
function Fh(e, t, n, { delay: i = 0, duration: r = 300, repeat: s = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const f = yl(a, r);
  Array.isArray(f) && (c.easing = f);
  const d = {
    delay: i,
    duration: r,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), e.animate(c, d);
}
function xl(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function Bh({ type: e, ...t }) {
  return xl(e) && gl() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class _h extends Cr {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: n, name: i, keyframes: r, pseudoElement: s, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!s, this.allowFlatten = o, this.options = t, He(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = Bh(t);
    this.animation = Fh(n, i, r, u, s), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !s) {
        const c = Tr(r, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : Rh(n, i, c), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const t = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ Ee(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Ee(t);
  }
  get time() {
    return /* @__PURE__ */ Ee(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Re(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && Lh() ? (this.animation.timeline = t, Ae) : n(this);
  }
}
const bl = {
  anticipate: Xa,
  backInOut: Ya,
  circInOut: Za
};
function zh(e) {
  return e in bl;
}
function $h(e) {
  typeof e.ease == "string" && zh(e.ease) && (e.ease = bl[e.ease]);
}
const Ls = 10;
class Uh extends _h {
  constructor(t) {
    $h(t), dl(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: i, onComplete: r, element: s, ...o } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new Pr({
      ...o,
      autoplay: !1
    }), l = /* @__PURE__ */ Re(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Ls).value, a.sample(l).value, Ls), a.stop();
  }
}
const Vs = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(Xe.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function Hh(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function Wh(e, t, n, i) {
  const r = e[0];
  if (r === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const s = e[e.length - 1], o = Vs(r, t), a = Vs(s, t);
  return St(o === a, `You are trying to animate ${t} from "${r}" to "${s}". "${o ? s : r}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : Hh(e) || (n === "spring" || xl(n)) && i;
}
function Oi(e) {
  e.duration = 0, e.type = "keyframes";
}
const qh = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Gh = /* @__PURE__ */ pr(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Kh(e) {
  const { motionValue: t, name: n, repeatDelay: i, repeatType: r, damping: s, type: o } = e;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return Gh() && n && qh.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && r !== "mirror" && s !== 0 && o !== "inertia";
}
const Yh = 40;
class Xh extends Cr {
  constructor({ autoplay: t = !0, delay: n = 0, type: i = "keyframes", repeat: r = 0, repeatDelay: s = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...f }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = ge.now();
    const d = {
      autoplay: t,
      delay: n,
      type: i,
      repeat: r,
      repeatDelay: s,
      repeatType: o,
      name: l,
      motionValue: u,
      element: c,
      ...f
    }, h = c?.KeyframeResolver || Er;
    this.keyframeResolver = new h(a, (m, k, b) => this.onKeyframesResolved(m, k, d, !b), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, n, i, r) {
    this.keyframeResolver = void 0;
    const { name: s, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = ge.now(), Wh(t, s, o, a) || ((We.instantAnimations || !l) && c?.(Tr(t, i, n)), t[0] = t[t.length - 1], Oi(i), i.repeat = 0);
    const d = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > Yh ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: t
    }, h = !u && Kh(d) ? new Uh({
      ...d,
      element: d.motionValue.owner.current
    }) : new Pr(d);
    h.finished.then(() => this.notifyFinished()).catch(Ae), this.pendingTimeline && (this.stopTimeline = h.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = h;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Nh()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const Qh = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Zh(e) {
  const t = Qh.exec(e);
  if (!t)
    return [,];
  const [, n, i, r] = t;
  return [`--${n ?? i}`, r];
}
const Jh = 4;
function vl(e, t, n = 1) {
  He(n <= Jh, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, r] = Zh(e);
  if (!i)
    return;
  const s = window.getComputedStyle(t).getPropertyValue(i);
  if (s) {
    const o = s.trim();
    return za(o) ? parseFloat(o) : o;
  }
  return br(r) ? vl(r, t, n + 1) : r;
}
function Ar(e, t) {
  return e?.[t] ?? e?.default ?? e;
}
const wl = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ct
]), ed = {
  test: (e) => e === "auto",
  parse: (e) => e
}, kl = (e) => (t) => t.test(e), Sl = [Tt, M, Be, Ke, Hf, Uf, ed], Os = (e) => Sl.find(kl(e));
function td(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || Ua(e) : !0;
}
const nd = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function id(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [i] = n.match(vr) || [];
  if (!i)
    return e;
  const r = n.replace(i, "");
  let s = nd.has(t) ? 1 : 0;
  return i !== n && (s *= 100), t + "(" + s + r + ")";
}
const rd = /\b([a-z-]*)\(.*?\)/gu, Fi = {
  ...Xe,
  getAnimatableNone: (e) => {
    const t = e.match(rd);
    return t ? t.map(id).join(" ") : e;
  }
}, Fs = {
  ...Tt,
  transform: Math.round
}, sd = {
  rotate: Ke,
  rotateX: Ke,
  rotateY: Ke,
  rotateZ: Ke,
  scale: hn,
  scaleX: hn,
  scaleY: hn,
  scaleZ: hn,
  skew: Ke,
  skewX: Ke,
  skewY: Ke,
  distance: M,
  translateX: M,
  translateY: M,
  translateZ: M,
  x: M,
  y: M,
  z: M,
  perspective: M,
  transformPerspective: M,
  opacity: Qt,
  originX: Cs,
  originY: Cs,
  originZ: M
}, Ir = {
  // Border props
  borderWidth: M,
  borderTopWidth: M,
  borderRightWidth: M,
  borderBottomWidth: M,
  borderLeftWidth: M,
  borderRadius: M,
  radius: M,
  borderTopLeftRadius: M,
  borderTopRightRadius: M,
  borderBottomRightRadius: M,
  borderBottomLeftRadius: M,
  // Positioning props
  width: M,
  maxWidth: M,
  height: M,
  maxHeight: M,
  top: M,
  right: M,
  bottom: M,
  left: M,
  inset: M,
  insetBlock: M,
  insetBlockStart: M,
  insetBlockEnd: M,
  insetInline: M,
  insetInlineStart: M,
  insetInlineEnd: M,
  // Spacing props
  padding: M,
  paddingTop: M,
  paddingRight: M,
  paddingBottom: M,
  paddingLeft: M,
  paddingBlock: M,
  paddingBlockStart: M,
  paddingBlockEnd: M,
  paddingInline: M,
  paddingInlineStart: M,
  paddingInlineEnd: M,
  margin: M,
  marginTop: M,
  marginRight: M,
  marginBottom: M,
  marginLeft: M,
  marginBlock: M,
  marginBlockStart: M,
  marginBlockEnd: M,
  marginInline: M,
  marginInlineStart: M,
  marginInlineEnd: M,
  // Misc
  backgroundPositionX: M,
  backgroundPositionY: M,
  ...sd,
  zIndex: Fs,
  // SVG
  fillOpacity: Qt,
  strokeOpacity: Qt,
  numOctaves: Fs
}, od = {
  ...Ir,
  // Color props
  color: oe,
  backgroundColor: oe,
  outlineColor: oe,
  fill: oe,
  stroke: oe,
  // Border props
  borderColor: oe,
  borderTopColor: oe,
  borderRightColor: oe,
  borderBottomColor: oe,
  borderLeftColor: oe,
  filter: Fi,
  WebkitFilter: Fi
}, Tl = (e) => od[e];
function Cl(e, t) {
  let n = Tl(e);
  return n !== Fi && (n = Xe), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const ad = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function ld(e, t, n) {
  let i = 0, r;
  for (; i < e.length && !r; ) {
    const s = e[i];
    typeof s == "string" && !ad.has(s) && Zt(s).values.length && (r = e[i]), i++;
  }
  if (r && n)
    for (const s of t)
      e[s] = Cl(n, r);
}
class ud extends Er {
  constructor(t, n, i, r, s) {
    super(t, n, i, r, s, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), br(u))) {
        const c = vl(u, n.current);
        c !== void 0 && (t[l] = c), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !wl.has(i) || t.length !== 2)
      return;
    const [r, s] = t, o = Os(r), a = Os(s);
    if (o !== a)
      if (Ms(o) && Ms(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else rt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, i = [];
    for (let r = 0; r < t.length; r++)
      (t[r] === null || td(t[r])) && i.push(r);
    i.length && ld(t, i, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = rt[i](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const r = n[n.length - 1];
    r !== void 0 && t.getValue(i, r).jump(r, !1);
  }
  measureEndState() {
    const { element: t, name: n, unresolvedKeyframes: i } = this;
    if (!t || !t.current)
      return;
    const r = t.getValue(n);
    r && r.jump(this.measuredOrigin, !1);
    const s = i.length - 1, o = i[s];
    i[s] = rt[n](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      t.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function cd(e, t, n) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let i = document;
    const r = n?.[e] ?? i.querySelectorAll(e);
    return r ? Array.from(r) : [];
  }
  return Array.from(e);
}
const Pl = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function fd(e) {
  return $a(e) && "offsetHeight" in e;
}
const Bs = 30, hd = (e) => !isNaN(parseFloat(e));
class dd {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const r = ge.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const s of this.dependents)
          s.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = ge.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = hd(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return process.env.NODE_ENV !== "production" && gr(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new mr());
    const i = this.events[t].add(n);
    return t === "change" ? () => {
      i(), ee.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = ge.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Bs)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Bs);
    return Ha(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function wt(e, t) {
  return new dd(e, t);
}
const { schedule: Dr } = /* @__PURE__ */ tl(queueMicrotask, !1), je = {
  x: !1,
  y: !1
};
function El() {
  return je.x || je.y;
}
function pd(e) {
  return e === "x" || e === "y" ? je[e] ? null : (je[e] = !0, () => {
    je[e] = !1;
  }) : je.x || je.y ? null : (je.x = je.y = !0, () => {
    je.x = je.y = !1;
  });
}
function Al(e, t) {
  const n = cd(e), i = new AbortController(), r = {
    passive: !0,
    ...t,
    signal: i.signal
  };
  return [n, r, () => i.abort()];
}
function _s(e) {
  return !(e.pointerType === "touch" || El());
}
function md(e, t, n = {}) {
  const [i, r, s] = Al(e, n), o = (a) => {
    if (!_s(a))
      return;
    const { target: l } = a, u = t(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (f) => {
      _s(f) && (u(f), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, r);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", o, r);
  }), s;
}
const Il = (e, t) => t ? e === t ? !0 : Il(e, t.parentElement) : !1, jr = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, gd = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function yd(e) {
  return gd.has(e.tagName) || e.tabIndex !== -1;
}
const vn = /* @__PURE__ */ new WeakSet();
function zs(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Qn(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const xd = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const i = zs(() => {
    if (vn.has(n))
      return;
    Qn(n, "down");
    const r = zs(() => {
      Qn(n, "up");
    }), s = () => Qn(n, "cancel");
    n.addEventListener("keyup", r, t), n.addEventListener("blur", s, t);
  });
  n.addEventListener("keydown", i, t), n.addEventListener("blur", () => n.removeEventListener("keydown", i), t);
};
function $s(e) {
  return jr(e) && !El();
}
function bd(e, t, n = {}) {
  const [i, r, s] = Al(e, n), o = (a) => {
    const l = a.currentTarget;
    if (!$s(a))
      return;
    vn.add(l);
    const u = t(l, a), c = (h, m) => {
      window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", d), vn.has(l) && vn.delete(l), $s(h) && typeof u == "function" && u(h, { success: m });
    }, f = (h) => {
      c(h, l === window || l === document || n.useGlobalTarget || Il(l, h.target));
    }, d = (h) => {
      c(h, !1);
    };
    window.addEventListener("pointerup", f, r), window.addEventListener("pointercancel", d, r);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, r), fd(a) && (a.addEventListener("focus", (u) => xd(u, r)), !yd(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), s;
}
function Dl(e) {
  return $a(e) && "ownerSVGElement" in e;
}
function vd(e) {
  return Dl(e) && e.tagName === "svg";
}
const ce = (e) => !!(e && e.getVelocity), wd = [...Sl, oe, Xe], kd = (e) => wd.find(kl(e)), jl = ot({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function Sd(e = !0) {
  const t = de(fr);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: r } = t, s = dc();
  Me(() => {
    if (e)
      return r(s);
  }, [e]);
  const o = wa(() => e && i && i(s), [s, i, e]);
  return !n && i ? [!1, o] : [!0];
}
const Nl = ot({ strict: !1 }), Us = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, kt = {};
for (const e in Us)
  kt[e] = {
    isEnabled: (t) => Us[e].some((n) => !!t[n])
  };
function Td(e) {
  for (const t in e)
    kt[t] = {
      ...kt[t],
      ...e[t]
    };
}
const Cd = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function In(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || Cd.has(e);
}
let Ml = (e) => !In(e);
function Pd(e) {
  typeof e == "function" && (Ml = (t) => t.startsWith("on") ? !In(t) : e(t));
}
try {
  Pd(require("@emotion/is-prop-valid").default);
} catch {
}
function Ed(e, t, n) {
  const i = {};
  for (const r in e)
    r === "values" && typeof e.values == "object" || (Ml(r) || n === !0 && In(r) || !t && !In(r) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && r.startsWith("onDrag")) && (i[r] = e[r]);
  return i;
}
const Fn = /* @__PURE__ */ ot({});
function Bn(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Jt(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Nr = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Mr = ["initial", ...Nr];
function _n(e) {
  return Bn(e.animate) || Mr.some((t) => Jt(e[t]));
}
function Rl(e) {
  return !!(_n(e) || e.variants);
}
function Ad(e, t) {
  if (_n(e)) {
    const { initial: n, animate: i } = e;
    return {
      initial: n === !1 || Jt(n) ? n : void 0,
      animate: Jt(i) ? i : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function Id(e) {
  const { initial: t, animate: n } = Ad(e, de(Fn));
  return Vn(() => ({ initial: t, animate: n }), [Hs(t), Hs(n)]);
}
function Hs(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Ws(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const Lt = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (M.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = Ws(e, t.target.x), i = Ws(e, t.target.y);
    return `${n}% ${i}%`;
  }
}, Dd = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const i = e, r = Xe.parse(e);
    if (r.length > 5)
      return i;
    const s = Xe.createTransformer(e), o = typeof r[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    r[0 + o] /= a, r[1 + o] /= l;
    const u = ne(a, l, 0.5);
    return typeof r[2 + o] == "number" && (r[2 + o] /= u), typeof r[3 + o] == "number" && (r[3 + o] /= u), s(r);
  }
}, Bi = {
  borderRadius: {
    ...Lt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Lt,
  borderTopRightRadius: Lt,
  borderBottomLeftRadius: Lt,
  borderBottomRightRadius: Lt,
  boxShadow: Dd
};
function Ll(e, { layout: t, layoutId: n }) {
  return Pt.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Bi[e] || e === "opacity");
}
const jd = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Nd = Ct.length;
function Md(e, t, n) {
  let i = "", r = !0;
  for (let s = 0; s < Nd; s++) {
    const o = Ct[s], a = e[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = Pl(a, Ir[o]);
      if (!l) {
        r = !1;
        const c = jd[o] || o;
        i += `${c}(${u}) `;
      }
      n && (t[o] = u);
    }
  }
  return i = i.trim(), n ? i = n(t, r ? "" : i) : r && (i = "none"), i;
}
function Rr(e, t, n) {
  const { style: i, vars: r, transformOrigin: s } = e;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (Pt.has(l)) {
      o = !0;
      continue;
    } else if (il(l)) {
      r[l] = u;
      continue;
    } else {
      const c = Pl(u, Ir[l]);
      l.startsWith("origin") ? (a = !0, s[l] = c) : i[l] = c;
    }
  }
  if (t.transform || (o || n ? i.transform = Md(t, e.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = s;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Lr = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Vl(e, t, n) {
  for (const i in t)
    !ce(t[i]) && !Ll(i, n) && (e[i] = t[i]);
}
function Rd({ transformTemplate: e }, t) {
  return Vn(() => {
    const n = Lr();
    return Rr(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function Ld(e, t) {
  const n = e.style || {}, i = {};
  return Vl(i, n, e), Object.assign(i, Rd(e, t)), i;
}
function Vd(e, t) {
  const n = {}, i = Ld(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const Od = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Fd = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Bd(e, t, n = 1, i = 0, r = !0) {
  e.pathLength = 1;
  const s = r ? Od : Fd;
  e[s.offset] = M.transform(-i);
  const o = M.transform(t), a = M.transform(n);
  e[s.array] = `${o} ${a}`;
}
const _d = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Ol(e, {
  attrX: t,
  attrY: n,
  attrScale: i,
  pathLength: r,
  pathSpacing: s = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Rr(e, a, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: f, style: d } = e;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = c?.transformBox ?? "fill-box", delete f.transformBox);
  for (const h of _d)
    f[h] !== void 0 && (d[h] = f[h], delete f[h]);
  t !== void 0 && (f.x = t), n !== void 0 && (f.y = n), i !== void 0 && (f.scale = i), r !== void 0 && Bd(f, r, s, o, !1);
}
const Fl = () => ({
  ...Lr(),
  attrs: {}
}), Bl = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function zd(e, t, n, i) {
  const r = Vn(() => {
    const s = Fl();
    return Ol(s, t, Bl(i), e.transformTemplate, e.style), {
      ...s.attrs,
      style: { ...s.style }
    };
  }, [t]);
  if (e.style) {
    const s = {};
    Vl(s, e.style, e), r.style = { ...s, ...r.style };
  }
  return r;
}
const $d = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Vr(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!($d.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function Ud(e, t, n, { latestValues: i }, r, s = !1, o) {
  const l = (o ?? Vr(e) ? zd : Vd)(t, i, r, e), u = Ed(t, typeof e == "string", s), c = e !== ka ? { ...u, ...l, ref: n } : {}, { children: f } = t, d = Vn(() => ce(f) ? f.get() : f, [f]);
  return Tn(e, {
    ...c,
    children: d
  });
}
function qs(e) {
  const t = [{}, {}];
  return e?.values.forEach((n, i) => {
    t[0][i] = n.get(), t[1][i] = n.getVelocity();
  }), t;
}
function Or(e, t, n, i) {
  if (typeof t == "function") {
    const [r, s] = qs(i);
    t = t(n !== void 0 ? n : e.custom, r, s);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [r, s] = qs(i);
    t = t(n !== void 0 ? n : e.custom, r, s);
  }
  return t;
}
function wn(e) {
  return ce(e) ? e.get() : e;
}
function Hd({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, i, r) {
  return {
    latestValues: Wd(n, i, r, e),
    renderState: t()
  };
}
function Wd(e, t, n, i) {
  const r = {}, s = i(e, {});
  for (const d in s)
    r[d] = wn(s[d]);
  let { initial: o, animate: a } = e;
  const l = _n(e), u = Rl(e);
  t && u && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const f = c ? a : o;
  if (f && typeof f != "boolean" && !Bn(f)) {
    const d = Array.isArray(f) ? f : [f];
    for (let h = 0; h < d.length; h++) {
      const m = Or(e, d[h]);
      if (m) {
        const { transitionEnd: k, transition: b, ...x } = m;
        for (const S in x) {
          let v = x[S];
          if (Array.isArray(v)) {
            const P = c ? v.length - 1 : 0;
            v = v[P];
          }
          v !== null && (r[S] = v);
        }
        for (const S in k)
          r[S] = k[S];
      }
    }
  }
  return r;
}
const _l = (e) => (t, n) => {
  const i = de(Fn), r = de(fr), s = () => Hd(e, t, i, r);
  return n ? s() : Tf(s);
};
function Fr(e, t, n) {
  const { style: i } = e, r = {};
  for (const s in i)
    (ce(i[s]) || t.style && ce(t.style[s]) || Ll(s, e) || n?.getValue(s)?.liveStyle !== void 0) && (r[s] = i[s]);
  return r;
}
const qd = /* @__PURE__ */ _l({
  scrapeMotionValuesFromProps: Fr,
  createRenderState: Lr
});
function zl(e, t, n) {
  const i = Fr(e, t, n);
  for (const r in e)
    if (ce(e[r]) || ce(t[r])) {
      const s = Ct.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      i[s] = e[r];
    }
  return i;
}
const Gd = /* @__PURE__ */ _l({
  scrapeMotionValuesFromProps: zl,
  createRenderState: Fl
}), Kd = Symbol.for("motionComponentSymbol");
function dt(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function Gs(e, t) {
  if (typeof e == "function")
    return e(t);
  dt(e) && (e.current = t);
}
function Yd(e, t, n) {
  const i = Fe(null);
  return wa(
    (r) => {
      if (r && e.onMount && e.onMount(r), t && (r ? t.mount(r) : t.unmount()), n)
        if (r) {
          const s = Gs(n, r);
          typeof s == "function" && (i.current = s);
        } else
          i.current ? (i.current(), i.current = null) : Gs(n, r);
    },
    /**
     * Include all dependencies to ensure the callback updates correctly
     */
    [t, e, n]
  );
}
const Br = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Xd = "framerAppearId", $l = "data-" + Br(Xd), Ul = ot({});
function Qd(e, t, n, i, r, s) {
  const { visualElement: o } = de(Fn), a = de(Nl), l = de(fr), u = de(jl).reducedMotion, c = Fe(null);
  i = i || a.renderer, !c.current && i && (c.current = i(e, {
    visualState: t,
    parent: o,
    props: n,
    presenceContext: l,
    blockInitialAnimation: l ? l.initial === !1 : !1,
    reducedMotionConfig: u,
    isSVG: s
  }));
  const f = c.current, d = de(Ul);
  f && !f.projection && r && (f.type === "html" || f.type === "svg") && Zd(c.current, n, r, d);
  const h = Fe(!1);
  pc(() => {
    f && h.current && f.update(n, l);
  });
  const m = n[$l], k = Fe(!!m && !window.MotionHandoffIsComplete?.(m) && window.MotionHasOptimisedAnimation?.(m));
  return Cf(() => {
    f && (h.current = !0, window.MotionIsMounted = !0, f.updateFeatures(), f.scheduleRenderMicrotask(), k.current && f.animationState && f.animationState.animateChanges());
  }), Me(() => {
    f && (!k.current && f.animationState && f.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(m);
    }), k.current = !1), f.enteringChildren = void 0);
  }), f;
}
function Zd(e, t, n, i) {
  const { layoutId: r, layout: s, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Hl(e.parent)), e.projection.setOptions({
    layoutId: r,
    layout: s,
    alwaysMeasureLayout: !!o || a && dt(a),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof s == "string" ? s : "both",
    initialPromotionConfig: i,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function Hl(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : Hl(e.parent);
}
function Zn(e, { forwardMotionProps: t = !1, type: n } = {}, i, r) {
  i && Td(i);
  const s = n ? n === "svg" : Vr(e), o = s ? Gd : qd;
  function a(u, c) {
    let f;
    const d = {
      ...de(jl),
      ...u,
      layoutId: Jd(u)
    }, { isStatic: h } = d, m = Id(u), k = o(u, h);
    if (!h && cr) {
      ep(d, i);
      const b = tp(d);
      f = b.MeasureLayout, m.visualElement = Qd(e, k, d, r, b.ProjectionNode, s);
    }
    return g.jsxs(Fn.Provider, { value: m, children: [f && m.visualElement ? g.jsx(f, { visualElement: m.visualElement, ...d }) : null, Ud(e, u, Yd(k, m.visualElement, c), k, h, t, s)] });
  }
  a.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const l = rr(a);
  return l[Kd] = e, l;
}
function Jd({ layoutId: e }) {
  const t = de(_a).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function ep(e, t) {
  const n = de(Nl).strict;
  if (process.env.NODE_ENV !== "production" && t && n) {
    const i = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    e.ignoreStrict ? St(!1, i, "lazy-strict-mode") : He(!1, i, "lazy-strict-mode");
  }
}
function tp(e) {
  const { drag: t, layout: n } = kt;
  if (!t && !n)
    return {};
  const i = { ...t, ...n };
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function np(e, t) {
  if (typeof Proxy > "u")
    return Zn;
  const n = /* @__PURE__ */ new Map(), i = (s, o) => Zn(s, o, e, t), r = (s, o) => (process.env.NODE_ENV !== "production" && gr(!1, "motion() is deprecated. Use motion.create() instead."), i(s, o));
  return new Proxy(r, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (s, o) => o === "create" ? i : (n.has(o) || n.set(o, Zn(o, void 0, e, t)), n.get(o))
  });
}
function Wl({ top: e, left: t, right: n, bottom: i }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: i }
  };
}
function ip({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function rp(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), i = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function Jn(e) {
  return e === void 0 || e === 1;
}
function _i({ scale: e, scaleX: t, scaleY: n }) {
  return !Jn(e) || !Jn(t) || !Jn(n);
}
function tt(e) {
  return _i(e) || ql(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function ql(e) {
  return Ks(e.x) || Ks(e.y);
}
function Ks(e) {
  return e && e !== "0%";
}
function Dn(e, t, n) {
  const i = e - n, r = t * i;
  return n + r;
}
function Ys(e, t, n, i, r) {
  return r !== void 0 && (e = Dn(e, r, i)), Dn(e, n, i) + t;
}
function zi(e, t = 0, n = 1, i, r) {
  e.min = Ys(e.min, t, n, i, r), e.max = Ys(e.max, t, n, i, r);
}
function Gl(e, { x: t, y: n }) {
  zi(e.x, t.translate, t.scale, t.originPoint), zi(e.y, n.translate, n.scale, n.originPoint);
}
const Xs = 0.999999999999, Qs = 1.0000000000001;
function sp(e, t, n, i = !1) {
  const r = n.length;
  if (!r)
    return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < r; a++) {
    s = n[a], o = s.projectionDelta;
    const { visualElement: l } = s.options;
    l && l.props.style && l.props.style.display === "contents" || (i && s.options.layoutScroll && s.scroll && s !== s.root && mt(e, {
      x: -s.scroll.offset.x,
      y: -s.scroll.offset.y
    }), o && (t.x *= o.x.scale, t.y *= o.y.scale, Gl(e, o)), i && tt(s.latestValues) && mt(e, s.latestValues));
  }
  t.x < Qs && t.x > Xs && (t.x = 1), t.y < Qs && t.y > Xs && (t.y = 1);
}
function pt(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function Zs(e, t, n, i, r = 0.5) {
  const s = ne(e.min, e.max, r);
  zi(e, t, n, s, i);
}
function mt(e, t) {
  Zs(e.x, t.x, t.scaleX, t.scale, t.originX), Zs(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function Kl(e, t) {
  return Wl(rp(e.getBoundingClientRect(), t));
}
function op(e, t, n) {
  const i = Kl(e, n), { scroll: r } = t;
  return r && (pt(i.x, r.offset.x), pt(i.y, r.offset.y)), i;
}
const Js = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), gt = () => ({
  x: Js(),
  y: Js()
}), eo = () => ({ min: 0, max: 0 }), ae = () => ({
  x: eo(),
  y: eo()
}), $i = { current: null }, Yl = { current: !1 };
function ap() {
  if (Yl.current = !0, !!cr)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => $i.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      $i.current = !1;
}
const lp = /* @__PURE__ */ new WeakMap();
function up(e, t, n) {
  for (const i in t) {
    const r = t[i], s = n[i];
    if (ce(r))
      e.addValue(i, r);
    else if (ce(s))
      e.addValue(i, wt(r, { owner: e }));
    else if (s !== r)
      if (e.hasValue(i)) {
        const o = e.getValue(i);
        o.liveStyle === !0 ? o.jump(r) : o.hasAnimated || o.set(r);
      } else {
        const o = e.getStaticValue(i);
        e.addValue(i, wt(o !== void 0 ? o : r, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const to = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class cp {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, i) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: i, reducedMotionConfig: r, blockInitialAnimation: s, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Er, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = ge.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, ee.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = o;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = r, this.options = a, this.blockInitialAnimation = !!s, this.isControllingVariants = _n(n), this.isVariantNode = Rl(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: c, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in f) {
      const h = f[d];
      l[d] !== void 0 && ce(h) && h.set(l[d]);
    }
  }
  mount(t) {
    this.current = t, lp.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Yl.current || ap(), this.shouldReduceMotion = $i.current), process.env.NODE_ENV !== "production" && gr(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), Ye(this.notifyUpdate), Ye(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const i = Pt.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const r = n.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && ee.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let s;
    window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      r(), s && s(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in kt) {
      const n = kt[t];
      if (!n)
        continue;
      const { isEnabled: i, Feature: r } = n;
      if (!this.features[t] && r && i(this.props) && (this.features[t] = new r(this)), this.features[t]) {
        const s = this.features[t];
        s.isMounted ? s.update() : (s.mount(), s.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ae();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < to.length; i++) {
      const r = to[i];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const s = "on" + r, o = t[s];
      o && (this.propEventSubscriptions[r] = this.on(r, o));
    }
    this.prevMotionValues = up(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const i = this.values.get(t);
    n !== i && (i && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let i = this.values.get(t);
    return i === void 0 && n !== void 0 && (i = wt(n === null ? void 0 : n, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (za(i) || Ua(i)) ? i = parseFloat(i) : !kd(i) && Xe.test(n) && (i = Cl(t, n)), this.setBaseTarget(t, ce(i) ? i.get() : i)), ce(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const s = Or(this.props, n, this.presenceContext?.custom);
      s && (i = s[t]);
    }
    if (n && i !== void 0)
      return i;
    const r = this.getBaseTargetFromProps(this.props, t);
    return r !== void 0 && !ce(r) ? r : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new mr()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    Dr.render(this.render);
  }
}
class Xl extends cp {
  constructor() {
    super(...arguments), this.KeyframeResolver = ud;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: i }) {
    delete n[t], delete i[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    ce(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Ql(e, { style: t, vars: n }, i, r) {
  const s = e.style;
  let o;
  for (o in t)
    s[o] = t[o];
  r?.applyProjectionStyles(s, i);
  for (o in n)
    s.setProperty(o, n[o]);
}
function fp(e) {
  return window.getComputedStyle(e);
}
class hp extends Xl {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Ql;
  }
  readValueFromInstance(t, n) {
    if (Pt.has(n))
      return this.projection?.isProjecting ? Ni(n) : Eh(t, n);
    {
      const i = fp(t), r = (il(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Kl(t, n);
  }
  build(t, n, i) {
    Rr(t, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return Fr(t, n, i);
  }
}
const Zl = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function dp(e, t, n, i) {
  Ql(e, t, void 0, i);
  for (const r in t.attrs)
    e.setAttribute(Zl.has(r) ? r : Br(r), t.attrs[r]);
}
class pp extends Xl {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ae;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Pt.has(n)) {
      const i = Tl(n);
      return i && i.default || 0;
    }
    return n = Zl.has(n) ? n : Br(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return zl(t, n, i);
  }
  build(t, n, i) {
    Ol(t, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, n, i, r) {
    dp(t, n, i, r);
  }
  mount(t) {
    this.isSVGTag = Bl(t.tagName), super.mount(t);
  }
}
const mp = (e, t) => t.isSVG ?? Vr(e) ? new pp(t) : new hp(t, {
  allowProjection: e !== ka
});
function yt(e, t, n) {
  const i = e.getProps();
  return Or(i, t, n !== void 0 ? n : i.custom, e);
}
const Ui = (e) => Array.isArray(e);
function gp(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, wt(n));
}
function yp(e) {
  return Ui(e) ? e[e.length - 1] || 0 : e;
}
function xp(e, t) {
  const n = yt(e, t);
  let { transitionEnd: i = {}, transition: r = {}, ...s } = n || {};
  s = { ...s, ...i };
  for (const o in s) {
    const a = yp(s[o]);
    gp(e, o, a);
  }
}
function bp(e) {
  return !!(ce(e) && e.add);
}
function Hi(e, t) {
  const n = e.getValue("willChange");
  if (bp(n))
    return n.add(t);
  if (!n && We.WillChange) {
    const i = new We.WillChange("auto");
    e.addValue("willChange", i), i.add(t);
  }
}
function Jl(e) {
  return e.props[$l];
}
const vp = (e) => e !== null;
function wp(e, { repeat: t, repeatType: n = "loop" }, i) {
  const r = e.filter(vp), s = t && n !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return r[s];
}
const kp = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Sp = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Tp = {
  type: "keyframes",
  duration: 0.8
}, Cp = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Pp = (e, { keyframes: t }) => t.length > 2 ? Tp : Pt.has(e) ? e.startsWith("scale") ? Sp(t[1]) : kp : Cp;
function Ep({ when: e, delay: t, delayChildren: n, staggerChildren: i, staggerDirection: r, repeat: s, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const _r = (e, t, n, i = {}, r, s) => (o) => {
  const a = Ar(i, e) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ Re(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      t.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: s ? void 0 : r
  };
  Ep(a) || Object.assign(c, Pp(e, c)), c.duration && (c.duration = /* @__PURE__ */ Re(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ Re(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let f = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (Oi(c), c.delay === 0 && (f = !0)), (We.instantAnimations || We.skipAnimations) && (f = !0, Oi(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, f && !s && t.get() !== void 0) {
    const d = wp(c.keyframes, a);
    if (d !== void 0) {
      ee.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Pr(c) : new Xh(c);
};
function Ap({ protectedKeys: e, needsAnimating: t }, n) {
  const i = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, i;
}
function eu(e, t, { delay: n = 0, transitionOverride: i, type: r } = {}) {
  let { transition: s = e.getDefaultTransition(), transitionEnd: o, ...a } = t;
  i && (s = i);
  const l = [], u = r && e.animationState && e.animationState.getState()[r];
  for (const c in a) {
    const f = e.getValue(c, e.latestValues[c] ?? null), d = a[c];
    if (d === void 0 || u && Ap(u, c))
      continue;
    const h = {
      delay: n,
      ...Ar(s || {}, c)
    }, m = f.get();
    if (m !== void 0 && !f.isAnimating && !Array.isArray(d) && d === m && !h.velocity)
      continue;
    let k = !1;
    if (window.MotionHandoffAnimation) {
      const x = Jl(e);
      if (x) {
        const S = window.MotionHandoffAnimation(x, c, ee);
        S !== null && (h.startTime = S, k = !0);
      }
    }
    Hi(e, c), f.start(_r(c, f, d, e.shouldReduceMotion && wl.has(c) ? { type: !1 } : h, e, k));
    const b = f.animation;
    b && l.push(b);
  }
  return o && Promise.all(l).then(() => {
    ee.update(() => {
      o && xp(e, o);
    });
  }), l;
}
function tu(e, t, n, i = 0, r = 1) {
  const s = Array.from(e).sort((u, c) => u.sortNodePosition(c)).indexOf(t), o = e.size, a = (o - 1) * i;
  return typeof n == "function" ? n(s, o) : r === 1 ? s * i : a - s * i;
}
function Wi(e, t, n = {}) {
  const i = yt(e, t, n.type === "exit" ? e.presenceContext?.custom : void 0);
  let { transition: r = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (r = n.transitionOverride);
  const s = i ? () => Promise.all(eu(e, i, n)) : () => Promise.resolve(), o = e.variantChildren && e.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: f } = r;
    return Ip(e, t, l, u, c, f, n);
  } : () => Promise.resolve(), { when: a } = r;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [s, o] : [o, s];
    return l().then(() => u());
  } else
    return Promise.all([s(), o(n.delay)]);
}
function Ip(e, t, n = 0, i = 0, r = 0, s = 1, o) {
  const a = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t), a.push(Wi(l, t, {
      ...o,
      delay: n + (typeof i == "function" ? 0 : i) + tu(e.variantChildren, l, i, r, s)
    }).then(() => l.notify("AnimationComplete", t)));
  return Promise.all(a);
}
function Dp(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let i;
  if (Array.isArray(t)) {
    const r = t.map((s) => Wi(e, s, n));
    i = Promise.all(r);
  } else if (typeof t == "string")
    i = Wi(e, t, n);
  else {
    const r = typeof t == "function" ? yt(e, t, n.custom) : t;
    i = Promise.all(eu(e, r, n));
  }
  return i.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function nu(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (t[i] !== e[i])
      return !1;
  return !0;
}
const jp = Mr.length;
function iu(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? iu(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < jp; n++) {
    const i = Mr[n], r = e.props[i];
    (Jt(r) || r === !1) && (t[i] = r);
  }
  return t;
}
const Np = [...Nr].reverse(), Mp = Nr.length;
function Rp(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: i }) => Dp(e, n, i)));
}
function Lp(e) {
  let t = Rp(e), n = no(), i = !0;
  const r = (l) => (u, c) => {
    const f = yt(e, c, l === "exit" ? e.presenceContext?.custom : void 0);
    if (f) {
      const { transition: d, transitionEnd: h, ...m } = f;
      u = { ...u, ...m, ...h };
    }
    return u;
  };
  function s(l) {
    t = l(e);
  }
  function o(l) {
    const { props: u } = e, c = iu(e.parent) || {}, f = [], d = /* @__PURE__ */ new Set();
    let h = {}, m = 1 / 0;
    for (let b = 0; b < Mp; b++) {
      const x = Np[b], S = n[x], v = u[x] !== void 0 ? u[x] : c[x], P = Jt(v), E = x === l ? S.isActive : null;
      E === !1 && (m = b);
      let w = v === c[x] && v !== u[x] && P;
      if (w && i && e.manuallyAnimateOnMount && (w = !1), S.protectedKeys = { ...h }, // If it isn't active and hasn't *just* been set as inactive
      !S.isActive && E === null || // If we didn't and don't have any defined prop for this animation type
      !v && !S.prevProp || // Or if the prop doesn't define an animation
      Bn(v) || typeof v == "boolean")
        continue;
      const N = Vp(S.prevProp, v);
      let j = N || // If we're making this variant active, we want to always make it active
      x === l && S.isActive && !w && P || // If we removed a higher-priority variant (i is in reverse order)
      b > m && P, O = !1;
      const V = Array.isArray(v) ? v : [v];
      let R = V.reduce(r(x), {});
      E === !1 && (R = {});
      const { prevResolvedValues: L = {} } = S, q = {
        ...L,
        ...R
      }, F = (U) => {
        j = !0, d.has(U) && (O = !0, d.delete(U)), S.needsAnimating[U] = !0;
        const Y = e.getValue(U);
        Y && (Y.liveStyle = !1);
      };
      for (const U in q) {
        const Y = R[U], re = L[U];
        if (h.hasOwnProperty(U))
          continue;
        let y = !1;
        Ui(Y) && Ui(re) ? y = !nu(Y, re) : y = Y !== re, y ? Y != null ? F(U) : d.add(U) : Y !== void 0 && d.has(U) ? F(U) : S.protectedKeys[U] = !0;
      }
      S.prevProp = v, S.prevResolvedValues = R, S.isActive && (h = { ...h, ...R }), i && e.blockInitialAnimation && (j = !1);
      const D = w && N;
      j && (!D || O) && f.push(...V.map((U) => {
        const Y = { type: x };
        if (typeof U == "string" && i && !D && e.manuallyAnimateOnMount && e.parent) {
          const { parent: re } = e, y = yt(re, U);
          if (re.enteringChildren && y) {
            const { delayChildren: C } = y.transition || {};
            Y.delay = tu(re.enteringChildren, e, C);
          }
        }
        return {
          animation: U,
          options: Y
        };
      }));
    }
    if (d.size) {
      const b = {};
      if (typeof u.initial != "boolean") {
        const x = yt(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        x && x.transition && (b.transition = x.transition);
      }
      d.forEach((x) => {
        const S = e.getBaseTarget(x), v = e.getValue(x);
        v && (v.liveStyle = !0), b[x] = S ?? null;
      }), f.push({ animation: b });
    }
    let k = !!f.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (k = !1), i = !1, k ? t(f) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    e.variantChildren?.forEach((f) => f.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = o(l);
    for (const f in n)
      n[f].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n,
    reset: () => {
      n = no();
    }
  };
}
function Vp(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !nu(t, e) : !1;
}
function et(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function no() {
  return {
    animate: et(!0),
    whileInView: et(),
    whileHover: et(),
    whileTap: et(),
    whileDrag: et(),
    whileFocus: et(),
    exit: et()
  };
}
class Qe {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
class Op extends Qe {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = Lp(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Bn(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Fp = 0;
class Bp extends Qe {
  constructor() {
    super(...arguments), this.id = Fp++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === i)
      return;
    const r = this.node.animationState.setActive("exit", !t);
    n && !t && r.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const _p = {
  animation: {
    Feature: Op
  },
  exit: {
    Feature: Bp
  }
};
function en(e, t, n, i = { passive: !0 }) {
  return e.addEventListener(t, n, i), () => e.removeEventListener(t, n);
}
function on(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const zp = (e) => (t) => jr(t) && e(t, on(t));
function Ht(e, t, n, i) {
  return en(e, t, zp(n), i);
}
const ru = 1e-4, $p = 1 - ru, Up = 1 + ru, su = 0.01, Hp = 0 - su, Wp = 0 + su;
function pe(e) {
  return e.max - e.min;
}
function qp(e, t, n) {
  return Math.abs(e - t) <= n;
}
function io(e, t, n, i = 0.5) {
  e.origin = i, e.originPoint = ne(t.min, t.max, e.origin), e.scale = pe(n) / pe(t), e.translate = ne(n.min, n.max, e.origin) - e.originPoint, (e.scale >= $p && e.scale <= Up || isNaN(e.scale)) && (e.scale = 1), (e.translate >= Hp && e.translate <= Wp || isNaN(e.translate)) && (e.translate = 0);
}
function Wt(e, t, n, i) {
  io(e.x, t.x, n.x, i ? i.originX : void 0), io(e.y, t.y, n.y, i ? i.originY : void 0);
}
function ro(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + pe(t);
}
function Gp(e, t, n) {
  ro(e.x, t.x, n.x), ro(e.y, t.y, n.y);
}
function so(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + pe(t);
}
function jn(e, t, n) {
  so(e.x, t.x, n.x), so(e.y, t.y, n.y);
}
function Ce(e) {
  return [e("x"), e("y")];
}
const ou = ({ current: e }) => e ? e.ownerDocument.defaultView : null, oo = (e, t) => Math.abs(e - t);
function Kp(e, t) {
  const n = oo(e.x, t.x), i = oo(e.y, t.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class au {
  constructor(t, n, { transformPagePoint: i, contextWindow: r = window, dragSnapToOrigin: s = !1, distanceThreshold: o = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = ti(this.lastMoveEventInfo, this.history), h = this.startEvent !== null, m = Kp(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!h && !m)
        return;
      const { point: k } = d, { timestamp: b } = le;
      this.history.push({ ...k, timestamp: b });
      const { onStart: x, onMove: S } = this.handlers;
      h || (x && x(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), S && S(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, h) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = ei(h, this.transformPagePoint), ee.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, h) => {
      this.end();
      const { onEnd: m, onSessionEnd: k, resumeAnimation: b } = this.handlers;
      if (this.dragSnapToOrigin && b && b(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const x = ti(d.type === "pointercancel" ? this.lastMoveEventInfo : ei(h, this.transformPagePoint), this.history);
      this.startEvent && m && m(d, x), k && k(d, x);
    }, !jr(t))
      return;
    this.dragSnapToOrigin = s, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = o, this.contextWindow = r || window;
    const a = on(t), l = ei(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = le;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: f } = n;
    f && f(t, ti(l, this.history)), this.removeListeners = nn(Ht(this.contextWindow, "pointermove", this.handlePointerMove), Ht(this.contextWindow, "pointerup", this.handlePointerUp), Ht(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), Ye(this.updatePoint);
  }
}
function ei(e, t) {
  return t ? { point: t(e.point) } : e;
}
function ao(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function ti({ point: e }, t) {
  return {
    point: e,
    delta: ao(e, lu(t)),
    offset: ao(e, Yp(t)),
    velocity: Xp(t, 0.1)
  };
}
function Yp(e) {
  return e[0];
}
function lu(e) {
  return e[e.length - 1];
}
function Xp(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, i = null;
  const r = lu(e);
  for (; n >= 0 && (i = e[n], !(r.timestamp - i.timestamp > /* @__PURE__ */ Re(t))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const s = /* @__PURE__ */ Ee(r.timestamp - i.timestamp);
  if (s === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (r.x - i.x) / s,
    y: (r.y - i.y) / s
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function Qp(e, { min: t, max: n }, i) {
  return t !== void 0 && e < t ? e = i ? ne(t, e, i.min) : Math.max(e, t) : n !== void 0 && e > n && (e = i ? ne(n, e, i.max) : Math.min(e, n)), e;
}
function lo(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function Zp(e, { top: t, left: n, bottom: i, right: r }) {
  return {
    x: lo(e.x, n, r),
    y: lo(e.y, t, i)
  };
}
function uo(e, t) {
  let n = t.min - e.min, i = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, i] = [i, n]), { min: n, max: i };
}
function Jp(e, t) {
  return {
    x: uo(e.x, t.x),
    y: uo(e.y, t.y)
  };
}
function em(e, t) {
  let n = 0.5;
  const i = pe(e), r = pe(t);
  return r > i ? n = /* @__PURE__ */ Xt(t.min, t.max - i, e.min) : i > r && (n = /* @__PURE__ */ Xt(e.min, e.max - r, t.min)), Ue(0, 1, n);
}
function tm(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const qi = 0.35;
function nm(e = qi) {
  return e === !1 ? e = 0 : e === !0 && (e = qi), {
    x: co(e, "left", "right"),
    y: co(e, "top", "bottom")
  };
}
function co(e, t, n) {
  return {
    min: fo(e, t),
    max: fo(e, n)
  };
}
function fo(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const im = /* @__PURE__ */ new WeakMap();
class rm {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = ae(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const s = (f) => {
      const { dragSnapToOrigin: d } = this.getProps();
      d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(on(f).point);
    }, o = (f, d) => {
      const { drag: h, dragPropagation: m, onDragStart: k } = this.getProps();
      if (h && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = pd(h), !this.openDragLock))
        return;
      this.latestPointerEvent = f, this.latestPanInfo = d, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Ce((x) => {
        let S = this.getAxisMotionValue(x).get() || 0;
        if (Be.test(S)) {
          const { projection: v } = this.visualElement;
          if (v && v.layout) {
            const P = v.layout.layoutBox[x];
            P && (S = pe(P) * (parseFloat(S) / 100));
          }
        }
        this.originPoint[x] = S;
      }), k && ee.postRender(() => k(f, d)), Hi(this.visualElement, "transform");
      const { animationState: b } = this.visualElement;
      b && b.setActive("whileDrag", !0);
    }, a = (f, d) => {
      this.latestPointerEvent = f, this.latestPanInfo = d;
      const { dragPropagation: h, dragDirectionLock: m, onDirectionLock: k, onDrag: b } = this.getProps();
      if (!h && !this.openDragLock)
        return;
      const { offset: x } = d;
      if (m && this.currentDirection === null) {
        this.currentDirection = sm(x), this.currentDirection !== null && k && k(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, x), this.updateAxis("y", d.point, x), this.visualElement.render(), b && b(f, d);
    }, l = (f, d) => {
      this.latestPointerEvent = f, this.latestPanInfo = d, this.stop(f, d), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => Ce((f) => this.getAnimationState(f) === "paused" && this.getAxisMotionValue(f).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new au(t, {
      onSessionStart: s,
      onStart: o,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: ou(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(t, n) {
    const i = t || this.latestPointerEvent, r = n || this.latestPanInfo, s = this.isDragging;
    if (this.cancel(), !s || !r || !i)
      return;
    const { velocity: o } = r;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && ee.postRender(() => a(i, r));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, i) {
    const { drag: r } = this.getProps();
    if (!i || !dn(t, r, this.currentDirection))
      return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + i[t];
    this.constraints && this.constraints[t] && (o = Qp(o, this.constraints[t], this.elastic[t])), s.set(o);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    t && dt(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && i ? this.constraints = Zp(i.layoutBox, t) : this.constraints = !1, this.elastic = nm(n), r !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && Ce((s) => {
      this.constraints !== !1 && this.getAxisMotionValue(s) && (this.constraints[s] = tm(i.layoutBox[s], this.constraints[s]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !dt(t))
      return !1;
    const i = t.current;
    He(i !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    const s = op(i, r.root, this.visualElement.getTransformPagePoint());
    let o = Jp(r.layout.layoutBox, s);
    if (n) {
      const a = n(ip(o));
      this.hasMutatedConstraints = !!a, a && (o = Wl(a));
    }
    return o;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: i, dragElastic: r, dragTransition: s, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = Ce((c) => {
      if (!dn(c, n, this.currentDirection))
        return;
      let f = l && l[c] || {};
      o && (f = { min: 0, max: 0 });
      const d = r ? 200 : 1e6, h = r ? 40 : 1e7, m = {
        type: "inertia",
        velocity: i ? t[c] : 0,
        bounceStiffness: d,
        bounceDamping: h,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...s,
        ...f
      };
      return this.startAxisValueAnimation(c, m);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const i = this.getAxisMotionValue(t);
    return Hi(this.visualElement, t), i.start(_r(t, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    Ce((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    Ce((t) => this.getAxisMotionValue(t).animation?.pause());
  }
  getAnimationState(t) {
    return this.getAxisMotionValue(t).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, i = this.visualElement.getProps(), r = i[n];
    return r || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    Ce((n) => {
      const { drag: i } = this.getProps();
      if (!dn(n, i, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, s = this.getAxisMotionValue(n);
      if (r && r.layout) {
        const { min: o, max: a } = r.layout.layoutBox[n], l = s.get() || 0;
        s.set(t[n] - ne(o, a, 0.5) + l);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!dt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    Ce((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        r[o] = em({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    this.visualElement.current.style.transform = s ? s({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), Ce((o) => {
      if (!dn(o, t, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
      a.set(ne(l, u, r[o]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    im.set(this.visualElement, this);
    const t = this.visualElement.current, n = Ht(t, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      dt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: r } = this.visualElement, s = r.addEventListener("measure", i);
    r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), ee.read(i);
    const o = en(window, "resize", () => this.scalePositionWithinConstraints()), a = r.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (Ce((c) => {
        const f = this.getAxisMotionValue(c);
        f && (this.originPoint[c] += l[c].translate, f.set(f.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      o(), n(), s(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: r = !1, dragConstraints: s = !1, dragElastic: o = qi, dragMomentum: a = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: r,
      dragConstraints: s,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function dn(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function sm(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class om extends Qe {
  constructor(t) {
    super(t), this.removeGroupControls = Ae, this.removeListeners = Ae, this.controls = new rm(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Ae;
  }
  update() {
    const { dragControls: t } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    t !== n && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const ho = (e) => (t, n) => {
  e && ee.postRender(() => e(t, n));
};
class am extends Qe {
  constructor() {
    super(...arguments), this.removePointerDownListener = Ae;
  }
  onPointerDown(t) {
    this.session = new au(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ou(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: i, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: ho(t),
      onStart: ho(n),
      onMove: i,
      onEnd: (s, o) => {
        delete this.session, r && ee.postRender(() => r(s, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ht(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const kn = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
let ni = !1;
class lm extends mc {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: i, layoutId: r } = this.props, { projection: s } = t;
    s && (n.group && n.group.add(s), i && i.register && r && i.register(s), ni && s.root.didUpdate(), s.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), s.setOptions({
      ...s.options,
      onExitComplete: () => this.safeToRemove()
    })), kn.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: i, drag: r, isPresent: s } = this.props, { projection: o } = i;
    return o && (o.isPresent = s, ni = !0, r || t.layoutDependency !== n || n === void 0 || t.isPresent !== s ? o.willUpdate() : this.safeToRemove(), t.isPresent !== s && (s ? o.promote() : o.relegate() || ee.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), Dr.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: r } = t;
    ni = !0, r && (r.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(r), i && i.deregister && i.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function uu(e) {
  const [t, n] = Sd(), i = de(_a);
  return g.jsx(lm, { ...e, layoutGroup: i, switchLayoutGroup: de(Ul), isPresent: t, safeToRemove: n });
}
function um(e, t, n) {
  const i = ce(e) ? e : wt(e);
  return i.start(_r("", i, t, n)), i.animation;
}
const cm = (e, t) => e.depth - t.depth;
class fm {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    hr(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    dr(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(cm), this.isDirty = !1, this.children.forEach(t);
  }
}
function hm(e, t) {
  const n = ge.now(), i = ({ timestamp: r }) => {
    const s = r - n;
    s >= t && (Ye(i), e(s - t));
  };
  return ee.setup(i, !0), () => Ye(i);
}
const cu = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], dm = cu.length, po = (e) => typeof e == "string" ? parseFloat(e) : e, mo = (e) => typeof e == "number" || M.test(e);
function pm(e, t, n, i, r, s) {
  r ? (e.opacity = ne(0, n.opacity ?? 1, mm(i)), e.opacityExit = ne(t.opacity ?? 1, 0, gm(i))) : s && (e.opacity = ne(t.opacity ?? 1, n.opacity ?? 1, i));
  for (let o = 0; o < dm; o++) {
    const a = `border${cu[o]}Radius`;
    let l = go(t, a), u = go(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || mo(l) === mo(u) ? (e[a] = Math.max(ne(po(l), po(u), i), 0), (Be.test(u) || Be.test(l)) && (e[a] += "%")) : e[a] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = ne(t.rotate || 0, n.rotate || 0, i));
}
function go(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const mm = /* @__PURE__ */ fu(0, 0.5, Qa), gm = /* @__PURE__ */ fu(0.5, 0.95, Ae);
function fu(e, t, n) {
  return (i) => i < e ? 0 : i > t ? 1 : n(/* @__PURE__ */ Xt(e, t, i));
}
function yo(e, t) {
  e.min = t.min, e.max = t.max;
}
function De(e, t) {
  yo(e.x, t.x), yo(e.y, t.y);
}
function xo(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
function bo(e, t, n, i, r) {
  return e -= t, e = Dn(e, 1 / n, i), r !== void 0 && (e = Dn(e, 1 / r, i)), e;
}
function ym(e, t = 0, n = 1, i = 0.5, r, s = e, o = e) {
  if (Be.test(t) && (t = parseFloat(t), t = ne(o.min, o.max, t / 100) - o.min), typeof t != "number")
    return;
  let a = ne(s.min, s.max, i);
  e === s && (a -= t), e.min = bo(e.min, t, n, a, r), e.max = bo(e.max, t, n, a, r);
}
function vo(e, t, [n, i, r], s, o) {
  ym(e, t[n], t[i], t[r], t.scale, s, o);
}
const xm = ["x", "scaleX", "originX"], bm = ["y", "scaleY", "originY"];
function wo(e, t, n, i) {
  vo(e.x, t, xm, n ? n.x : void 0, i ? i.x : void 0), vo(e.y, t, bm, n ? n.y : void 0, i ? i.y : void 0);
}
function ko(e) {
  return e.translate === 0 && e.scale === 1;
}
function hu(e) {
  return ko(e.x) && ko(e.y);
}
function So(e, t) {
  return e.min === t.min && e.max === t.max;
}
function vm(e, t) {
  return So(e.x, t.x) && So(e.y, t.y);
}
function To(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function du(e, t) {
  return To(e.x, t.x) && To(e.y, t.y);
}
function Co(e) {
  return pe(e.x) / pe(e.y);
}
function Po(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class wm {
  constructor() {
    this.members = [];
  }
  add(t) {
    hr(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (dr(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((r) => t === r);
    if (n === 0)
      return !1;
    let i;
    for (let r = n; r >= 0; r--) {
      const s = this.members[r];
      if (s.isPresent !== !1) {
        i = s;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(t, n) {
    const i = this.lead;
    if (t !== i && (this.prevLead = i, this.lead = t, t.show(), i)) {
      i.instance && i.scheduleRender(), t.scheduleRender(), t.resumeFrom = i, n && (t.resumeFrom.preserveOpacity = !0), i.snapshot && (t.snapshot = i.snapshot, t.snapshot.latestValues = i.animationValues || i.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: r } = t.options;
      r === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: i } = t;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function km(e, t, n) {
  let i = "";
  const r = e.x.translate / t.x, s = e.y.translate / t.y, o = n?.z || 0;
  if ((r || s || o) && (i = `translate3d(${r}px, ${s}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (i += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: f, rotateY: d, skewX: h, skewY: m } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), f && (i += `rotateX(${f}deg) `), d && (i += `rotateY(${d}deg) `), h && (i += `skewX(${h}deg) `), m && (i += `skewY(${m}deg) `);
  }
  const a = e.x.scale * t.x, l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const ii = ["", "X", "Y", "Z"], Sm = 1e3;
let Tm = 0;
function ri(e, t, n, i) {
  const { latestValues: r } = t;
  r[e] && (n[e] = r[e], t.setStaticValue(e, 0), i && (i[e] = 0));
}
function pu(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = Jl(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: r, layoutId: s } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", ee, !(r || s));
  }
  const { parent: i } = e;
  i && !i.hasCheckedOptimisedAppear && pu(i);
}
function mu({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: i, resetTransform: r }) {
  return class {
    constructor(o = {}, a = t?.()) {
      this.id = Tm++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Em), this.nodes.forEach(jm), this.nodes.forEach(Nm), this.nodes.forEach(Am);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new fm());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new mr()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o) {
      if (this.instance)
        return;
      this.isSVG = Dl(o) && !vd(o), this.instance = o;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
        let c, f = 0;
        const d = () => this.root.updateBlockedByResize = !1;
        ee.read(() => {
          f = window.innerWidth;
        }), e(o, () => {
          const h = window.innerWidth;
          h !== f && (f = h, this.root.updateBlockedByResize = !0, c && c(), c = hm(d, 250), kn.hasAnimatedSinceResize && (kn.hasAnimatedSinceResize = !1, this.nodes.forEach(Io)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: f, hasRelativeLayoutChanged: d, layout: h }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || u.getDefaultTransition() || Om, { onLayoutAnimationStart: k, onLayoutAnimationComplete: b } = u.getProps(), x = !this.targetLayout || !du(this.targetLayout, h), S = !f && d;
        if (this.options.layoutRoot || this.resumeFrom || S || f && (x || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const v = {
            ...Ar(m, "layout"),
            onPlay: k,
            onComplete: b
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (v.delay = 0, v.type = !1), this.startAnimation(v), this.setAnimationOrigin(c, S);
        } else
          f || Io(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = h;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Ye(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Mm), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && pu(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        f.shouldResetTransform = !0, f.updateScroll("snapshot"), f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Eo);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ao);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Dm), this.nodes.forEach(Cm), this.nodes.forEach(Pm)) : this.nodes.forEach(Ao), this.clearAllSnapshots();
      const a = ge.now();
      le.delta = Ue(0, 1e3 / 60, a - le.timestamp), le.timestamp = a, le.isProcessing = !0, qn.update.process(le), qn.preRender.process(le), qn.render.process(le), le.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Dr.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Im), this.sharedNodes.forEach(Rm);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, ee.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      ee.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !pe(this.snapshot.measuredBox.x) && !pe(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = ae(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
        const l = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!r)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !hu(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      o && this.instance && (a || tt(this.latestValues) || c) && (r(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), Fm(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: o } = this.options;
      if (!o)
        return ae();
      const a = o.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Bm))) {
        const { scroll: u } = this.root;
        u && (pt(a.x, u.offset.x), pt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      const a = ae();
      if (De(a, o), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: f } = u;
        u !== this.root && c && f.layoutScroll && (c.wasRoot && De(a, o), pt(a.x, c.offset.x), pt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = ae();
      De(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && mt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), tt(c.latestValues) && mt(l, c.latestValues);
      }
      return tt(this.latestValues) && mt(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = ae();
      De(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !tt(u.latestValues))
          continue;
        _i(u.latestValues) && u.updateSnapshot();
        const c = ae(), f = u.measurePageBox();
        De(c, f), wo(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return tt(this.latestValues) && wo(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== le.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: f } = this.options;
      if (!this.layout || !(c || f))
        return;
      this.resolvedRelativeTargetAt = le.timestamp;
      const d = this.getClosestProjectingParent();
      d && this.linkedParentVersion !== d.layoutVersion && !d.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (d && d.layout ? this.createRelativeTarget(d, this.layout.layoutBox, d.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = ae(), this.targetWithTransforms = ae()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Gp(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : De(this.target, this.layout.layoutBox), Gl(this.target, this.targetDelta)) : De(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? this.createRelativeTarget(d, this.target, d.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || _i(this.parent.latestValues) || ql(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(o, a, l) {
      this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = ae(), this.relativeTargetOrigin = ae(), jn(this.relativeTargetOrigin, a, l), De(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === le.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      De(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x, d = this.treeScale.y;
      sp(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = ae());
      const { target: h } = o;
      if (!h) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (xo(this.prevProjectionDelta.x, this.projectionDelta.x), xo(this.prevProjectionDelta.y, this.projectionDelta.y)), Wt(this.projectionDelta, this.layoutCorrected, h, this.latestValues), (this.treeScale.x !== f || this.treeScale.y !== d || !Po(this.projectionDelta.x, this.prevProjectionDelta.x) || !Po(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", h));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      if (this.options.visualElement?.scheduleRender(), o) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = gt(), this.projectionDelta = gt(), this.projectionDeltaWithTransform = gt();
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, f = gt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = ae(), h = l ? l.source : void 0, m = this.layout ? this.layout.source : void 0, k = h !== m, b = this.getStack(), x = !b || b.members.length <= 1, S = !!(k && !x && this.options.crossfade === !0 && !this.path.some(Vm));
      this.animationProgress = 0;
      let v;
      this.mixTargetDelta = (P) => {
        const E = P / 1e3;
        Do(f.x, o.x, E), Do(f.y, o.y, E), this.setTargetDelta(f), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (jn(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), Lm(this.relativeTarget, this.relativeTargetOrigin, d, E), v && vm(this.relativeTarget, v) && (this.isProjectionDirty = !1), v || (v = ae()), De(v, this.relativeTarget)), k && (this.animationValues = c, pm(c, u, this.latestValues, E, S, x)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = E;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Ye(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = ee.update(() => {
        kn.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = wt(0)), this.currentAnimation = um(this.motionValue, [0, 1e3], {
          ...o,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), o.onUpdate && o.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Sm), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = o;
      if (!(!a || !l || !u)) {
        if (this !== o && this.layout && u && gu(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || ae();
          const f = pe(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + f;
          const d = pe(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + d;
        }
        De(a, l), mt(a, c), Wt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new wm()), this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: o } = this.options;
      return o ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && ri("z", o, u, this.animationValues);
      for (let c = 0; c < ii.length; c++)
        ri(`rotate${ii[c]}`, o, u, this.animationValues), ri(`skew${ii[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = wn(a?.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = wn(a?.pointerEvents) || ""), this.hasProjected && !tt(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      o.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let f = km(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (f = l(c, f)), o.transform = f;
      const { x: d, y: h } = this.projectionDelta;
      o.transformOrigin = `${d.origin * 100}% ${h.origin * 100}% 0`, u.animationValues ? o.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : o.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const m in Bi) {
        if (c[m] === void 0)
          continue;
        const { correct: k, applyTo: b, isCSSVariable: x } = Bi[m], S = f === "none" ? c[m] : k(c[m], u);
        if (b) {
          const v = b.length;
          for (let P = 0; P < v; P++)
            o[b[P]] = S;
        } else
          x ? this.options.visualElement.renderState.vars[m] = S : o[m] = S;
      }
      this.options.layoutId && (o.pointerEvents = u === this ? wn(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => o.currentAnimation?.stop()), this.root.nodes.forEach(Eo), this.root.sharedNodes.clear();
    }
  };
}
function Cm(e) {
  e.updateLayout();
}
function Pm(e) {
  const t = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = e.layout, { animationType: r } = e.options, s = t.source !== e.layout.source;
    r === "size" ? Ce((c) => {
      const f = s ? t.measuredBox[c] : t.layoutBox[c], d = pe(f);
      f.min = n[c].min, f.max = f.min + d;
    }) : gu(r, t.layoutBox, n) && Ce((c) => {
      const f = s ? t.measuredBox[c] : t.layoutBox[c], d = pe(n[c]);
      f.max = f.min + d, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[c].max = e.relativeTarget[c].min + d);
    });
    const o = gt();
    Wt(o, n, t.layoutBox);
    const a = gt();
    s ? Wt(a, e.applyTransform(i, !0), t.measuredBox) : Wt(a, n, t.layoutBox);
    const l = !hu(o);
    let u = !1;
    if (!e.resumeFrom) {
      const c = e.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: f, layout: d } = c;
        if (f && d) {
          const h = ae();
          jn(h, t.layoutBox, f.layoutBox);
          const m = ae();
          jn(m, n, d.layoutBox), du(h, m) || (u = !0), c.options.layoutRoot && (e.relativeTarget = m, e.relativeTargetOrigin = h, e.relativeParent = c);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: n,
      snapshot: t,
      delta: a,
      layoutDelta: o,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (e.isLead()) {
    const { onExitComplete: n } = e.options;
    n && n();
  }
  e.options.transition = void 0;
}
function Em(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Am(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Im(e) {
  e.clearSnapshot();
}
function Eo(e) {
  e.clearMeasurements();
}
function Ao(e) {
  e.isLayoutDirty = !1;
}
function Dm(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Io(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function jm(e) {
  e.resolveTargetDelta();
}
function Nm(e) {
  e.calcProjection();
}
function Mm(e) {
  e.resetSkewAndRotation();
}
function Rm(e) {
  e.removeLeadSnapshot();
}
function Do(e, t, n) {
  e.translate = ne(t.translate, 0, n), e.scale = ne(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function jo(e, t, n, i) {
  e.min = ne(t.min, n.min, i), e.max = ne(t.max, n.max, i);
}
function Lm(e, t, n, i) {
  jo(e.x, t.x, n.x, i), jo(e.y, t.y, n.y, i);
}
function Vm(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Om = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, No = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Mo = No("applewebkit/") && !No("chrome/") ? Math.round : Ae;
function Ro(e) {
  e.min = Mo(e.min), e.max = Mo(e.max);
}
function Fm(e) {
  Ro(e.x), Ro(e.y);
}
function gu(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !qp(Co(t), Co(n), 0.2);
}
function Bm(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
const _m = mu({
  attachResizeListener: (e, t) => en(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), si = {
  current: void 0
}, yu = mu({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!si.current) {
      const e = new _m({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), si.current = e;
    }
    return si.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), zm = {
  pan: {
    Feature: am
  },
  drag: {
    Feature: om,
    ProjectionNode: yu,
    MeasureLayout: uu
  }
};
function Lo(e, t, n) {
  const { props: i } = e;
  e.animationState && i.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const r = "onHover" + n, s = i[r];
  s && ee.postRender(() => s(t, on(t)));
}
class $m extends Qe {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = md(t, (n, i) => (Lo(this.node, i, "Start"), (r) => Lo(this.node, r, "End"))));
  }
  unmount() {
  }
}
class Um extends Qe {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = nn(en(this.node.current, "focus", () => this.onFocus()), en(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Vo(e, t, n) {
  const { props: i } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && i.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const r = "onTap" + (n === "End" ? "" : n), s = i[r];
  s && ee.postRender(() => s(t, on(t)));
}
class Hm extends Qe {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = bd(t, (n, i) => (Vo(this.node, i, "Start"), (r, { success: s }) => Vo(this.node, r, s ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Gi = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ new WeakMap(), Wm = (e) => {
  const t = Gi.get(e.target);
  t && t(e);
}, qm = (e) => {
  e.forEach(Wm);
};
function Gm({ root: e, ...t }) {
  const n = e || document;
  oi.has(n) || oi.set(n, {});
  const i = oi.get(n), r = JSON.stringify(t);
  return i[r] || (i[r] = new IntersectionObserver(qm, { root: e, ...t })), i[r];
}
function Km(e, t, n) {
  const i = Gm(t);
  return Gi.set(e, n), i.observe(e), () => {
    Gi.delete(e), i.unobserve(e);
  };
}
const Ym = {
  some: 0,
  all: 1
};
class Xm extends Qe {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: i, amount: r = "some", once: s } = t, o = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof r == "number" ? r : Ym[r]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, s && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(), d = u ? c : f;
      d && d(l);
    };
    return Km(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Qm(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Qm({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Zm = {
  inView: {
    Feature: Xm
  },
  tap: {
    Feature: Hm
  },
  focus: {
    Feature: Um
  },
  hover: {
    Feature: $m
  }
}, Jm = {
  layout: {
    ProjectionNode: yu,
    MeasureLayout: uu
  }
}, eg = {
  ..._p,
  ...Zm,
  ...zm,
  ...Jm
}, we = /* @__PURE__ */ np(eg, mp), tg = (e) => {
  const {
    title: t,
    href: n,
    description: i,
    icon: r,
    badge: s,
    isActive: o = !1,
    className: a = "",
    showDescription: l = !0,
    onClick: u,
    target: c = "_self",
    compact: f = !1
  } = e, d = [
    "menu-item",
    o ? "active" : "",
    f ? "compact" : "",
    !i || !l ? "no-description" : "",
    a
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g.jsxs(
    we.a,
    {
      href: n,
      target: c,
      onClick: u,
      className: d,
      whileHover: { scale: 1.01, x: 4 },
      whileTap: { scale: 0.99 },
      transition: { duration: 0.1 },
      children: [
        r && /* @__PURE__ */ g.jsx(
          we.div,
          {
            className: "menu-item-icon",
            whileHover: { rotate: 5 },
            children: /* @__PURE__ */ g.jsx(ue, { icon: r })
          }
        ),
        /* @__PURE__ */ g.jsxs("div", { className: "menu-item-content", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "menu-item-header", children: [
            /* @__PURE__ */ g.jsx("span", { className: "menu-item-title", children: t }),
            s && /* @__PURE__ */ g.jsx(
              we.span,
              {
                className: "menu-item-badge",
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { type: "spring", stiffness: 200 },
                children: s
              }
            )
          ] }),
          i && l && /* @__PURE__ */ g.jsx(
            we.p,
            {
              className: "menu-item-description",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              transition: { duration: 0.2 },
              children: i
            }
          )
        ] })
      ]
    }
  );
}, ng = (e) => {
  const {
    children: t,
    columns: n = 3,
    className: i = "",
    gridClassName: r = ""
  } = e, s = `menu-grid columns-${n} ${r}`;
  return /* @__PURE__ */ g.jsx("div", { className: `menu-grid-container ${i}`, children: /* @__PURE__ */ g.jsx("div", { className: s, children: t }) });
}, ig = (e) => {
  const {
    title: t,
    description: n,
    href: i,
    icon: r,
    badge: s,
    compact: o = !1,
    showDescription: a = !0,
    className: l = ""
    // children
  } = e, u = `menu-grid-item ${o ? "compact" : "regular"} ${l}`;
  return /* @__PURE__ */ g.jsx(
    we.div,
    {
      className: `${u} hover-lift`,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: !0 },
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      children: i.startsWith("http") ? /* @__PURE__ */ g.jsxs("a", { href: i, className: "menu-grid-link", target: "_blank", rel: "noopener noreferrer", children: [
        s && /* @__PURE__ */ g.jsx(
          we.span,
          {
            className: "menu-grid-badge",
            initial: { scale: 0 },
            animate: { scale: 1 },
            children: s
          }
        ),
        /* @__PURE__ */ g.jsxs("div", { className: "menu-grid-header", children: [
          r && /* @__PURE__ */ g.jsx(
            we.div,
            {
              className: "menu-grid-icon",
              whileHover: { rotate: 5, scale: 1.1 },
              children: /* @__PURE__ */ g.jsx(ue, { icon: r })
            }
          ),
          /* @__PURE__ */ g.jsx("span", { className: "menu-grid-title text-truncate", children: t })
        ] }),
        n && a && /* @__PURE__ */ g.jsx("span", { className: "menu-grid-description", children: n })
      ] }) : /* @__PURE__ */ g.jsxs(sr, { to: i, className: "menu-grid-link", children: [
        s && /* @__PURE__ */ g.jsx(
          we.span,
          {
            className: "menu-grid-badge",
            initial: { scale: 0 },
            animate: { scale: 1 },
            children: s
          }
        ),
        /* @__PURE__ */ g.jsxs("div", { className: "menu-grid-header", children: [
          r && /* @__PURE__ */ g.jsx(
            we.div,
            {
              className: "menu-grid-icon",
              whileHover: { rotate: 5, scale: 1.1 },
              children: /* @__PURE__ */ g.jsx(ue, { icon: r })
            }
          ),
          /* @__PURE__ */ g.jsx("span", { className: "menu-grid-title text-truncate", children: t })
        ] }),
        n && a && /* @__PURE__ */ g.jsx("span", { className: "menu-grid-description", children: n })
      ] })
    }
  );
}, rg = (e) => {
  const {
    ButtonText: t,
    Title: n,
    SubTitle: i,
    Link: r,
    className: s = "",
    ImageUrl: o,
    textAlignment: a = "center",
    padding: l = "medium"
  } = e, u = o ? { backgroundImage: `url(${o})` } : {}, c = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
    justify: "text-justify"
  }[a], f = {
    none: "p-2",
    small: "p-4 md:p-6",
    medium: "p-6 md:p-8 lg:p-12",
    large: "p-8 md:p-12 lg:p-16"
  }[l];
  return /* @__PURE__ */ g.jsxs(
    we.div,
    {
      className: `hero-image relative ${s}`,
      style: u,
      initial: { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 1.5, ease: "easeOut" },
      "data-theme": "light",
      children: [
        /* @__PURE__ */ g.jsx("div", { className: "hero-overlay" }),
        /* @__PURE__ */ g.jsxs("div", { className: `hero-text ${c} ${f}`, children: [
          /* @__PURE__ */ g.jsx(
            we.div,
            {
              className: "hero-text-primary hero-title",
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
              children: n
            }
          ),
          i && /* @__PURE__ */ g.jsx(
            we.div,
            {
              className: "hero-text-primary hero-subtitle",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
              children: i
            }
          ),
          t && /* @__PURE__ */ g.jsx("div", { className: "hero-actions", children: /* @__PURE__ */ g.jsx(
            we.a,
            {
              className: "btn hero-btn-primary hover-lift active-scale",
              href: r,
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              whileHover: { scale: 1.05 },
              transition: { duration: 0.6, delay: 0.7, ease: "easeOut" },
              children: t
            }
          ) })
        ] })
      ]
    }
  );
}, xu = ot(void 0), sg = () => {
  const e = de(xu);
  if (!e)
    throw new Error("useDropdownContext must be used within DropdownProvider");
  return e;
}, Uv = ({ children: e }) => {
  const [t, n] = Ne(null);
  return /* @__PURE__ */ g.jsx(xu.Provider, { value: { activeDropdown: t, setActiveDropdown: n }, children: e });
}, bu = (e) => {
  const {
    title: t,
    icon: n,
    iconPosition: i = "left",
    iconSize: r = "1.2rem",
    iconColor: s = "currentColor",
    className: o = "",
    itemGroupClassName: a = "",
    children: l,
    href: u,
    id: c = t || n || "dropdown",
    target: f = "_self"
  } = e, d = Ba({ breakpoint: 768 }), { activeDropdown: h, setActiveDropdown: m } = sg(), [k, b] = Ne(!1), x = Fe(null), S = Fe(null), v = h === c, P = d ? v : v || k;
  Me(() => {
    const V = (R) => {
      S.current && !S.current.contains(R.target) && (b(!1), h === c && m(null));
    };
    return P && !d && document.addEventListener("mousedown", V), () => {
      document.removeEventListener("mousedown", V);
    };
  }, [P, d, h, c, m]);
  const E = (V) => {
    d && (V.preventDefault(), m(v ? null : c)), u && d && !v && V.preventDefault();
  }, w = () => {
    d || (b(!0), m(c));
  }, N = () => {
    d || setTimeout(() => {
      const V = x.current?.matches(":hover"), R = S.current?.matches(":hover");
      !V && !R && (b(!1), m(null));
    }, 100);
  }, j = () => {
    d || (b(!0), m(c));
  }, O = () => {
    d || (b(!1), m(null));
  };
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      ref: S,
      className: "menu",
      onMouseEnter: w,
      onMouseLeave: N,
      children: [
        (t || n) && /* @__PURE__ */ g.jsx(g.Fragment, { children: u ? /* @__PURE__ */ g.jsxs(
          "a",
          {
            href: u,
            onClick: E,
            className: `menu-title ${o} ${v ? "active" : ""}`,
            target: f,
            "aria-haspopup": !!l,
            "aria-expanded": P,
            children: [
              n && i === "left" && /* @__PURE__ */ g.jsx(
                ue,
                {
                  icon: n,
                  style: { width: r, height: r, color: s },
                  className: "icon-left"
                }
              ),
              t && /* @__PURE__ */ g.jsx("span", { children: t }),
              n && i === "right" && /* @__PURE__ */ g.jsx(
                ue,
                {
                  icon: n,
                  style: { width: r, height: r, color: s },
                  className: "icon-right"
                }
              ),
              l && /* @__PURE__ */ g.jsx("span", { className: "arrow", children: P ? "▲" : "▼" })
            ]
          }
        ) : /* @__PURE__ */ g.jsxs(
          "button",
          {
            onClick: E,
            className: `menu-title ${o} ${v ? "active" : ""}`,
            type: "button",
            "aria-haspopup": "true",
            "aria-expanded": P,
            children: [
              n && i === "left" && /* @__PURE__ */ g.jsx(
                ue,
                {
                  icon: n,
                  style: { width: r, height: r, color: s },
                  className: "icon-left"
                }
              ),
              t && /* @__PURE__ */ g.jsx("span", { children: t }),
              n && i === "right" && /* @__PURE__ */ g.jsx(
                ue,
                {
                  icon: n,
                  style: { width: r, height: r, color: s },
                  className: "icon-right"
                }
              ),
              l && /* @__PURE__ */ g.jsx("span", { className: "arrow", children: P ? "▲" : "▼" })
            ]
          }
        ) }),
        /* @__PURE__ */ g.jsx(
          "div",
          {
            ref: x,
            className: `menu-dropdown ${a} ${P ? "show" : ""}`,
            onMouseEnter: j,
            onMouseLeave: O,
            children: l
          }
        )
      ]
    }
  );
}, og = (e) => {
  const {
    icon: t,
    onClick: n,
    ariaLabel: i,
    className: r = "",
    badge: s,
    active: o = !1,
    children: a
  } = e;
  return a ? /* @__PURE__ */ g.jsx(
    bu,
    {
      icon: t,
      className: `utility-button ${o ? "active" : ""} ${r}`,
      id: i || t,
      children: a
    }
  ) : /* @__PURE__ */ g.jsxs(
    "button",
    {
      className: `utility-button ${o ? "active" : ""} ${r}`,
      onClick: n,
      "aria-label": i,
      type: "button",
      children: [
        /* @__PURE__ */ g.jsx(ue, { icon: t, className: "icon-button-icon" }),
        s && /* @__PURE__ */ g.jsx("span", { className: "icon-button-badge", children: s })
      ]
    }
  );
};
function ag(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const lg = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ug = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, cg = {};
function Oo(e, t) {
  return (cg.jsx ? ug : lg).test(e);
}
const fg = /[ \t\n\f\r]/g;
function hg(e) {
  return typeof e == "object" ? e.type === "text" ? Fo(e.value) : !1 : Fo(e);
}
function Fo(e) {
  return e.replace(fg, "") === "";
}
class an {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(t, n, i) {
    this.normal = n, this.property = t, i && (this.space = i);
  }
}
an.prototype.normal = {};
an.prototype.property = {};
an.prototype.space = void 0;
function vu(e, t) {
  const n = {}, i = {};
  for (const r of e)
    Object.assign(n, r.property), Object.assign(i, r.normal);
  return new an(n, i, t);
}
function Ki(e) {
  return e.toLowerCase();
}
class xe {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
}
xe.prototype.attribute = "";
xe.prototype.booleanish = !1;
xe.prototype.boolean = !1;
xe.prototype.commaOrSpaceSeparated = !1;
xe.prototype.commaSeparated = !1;
xe.prototype.defined = !1;
xe.prototype.mustUseProperty = !1;
xe.prototype.number = !1;
xe.prototype.overloadedBoolean = !1;
xe.prototype.property = "";
xe.prototype.spaceSeparated = !1;
xe.prototype.space = void 0;
let dg = 0;
const $ = at(), se = at(), Yi = at(), A = at(), Q = at(), xt = at(), ve = at();
function at() {
  return 2 ** ++dg;
}
const Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: $,
  booleanish: se,
  commaOrSpaceSeparated: ve,
  commaSeparated: xt,
  number: A,
  overloadedBoolean: Yi,
  spaceSeparated: Q
}, Symbol.toStringTag, { value: "Module" })), ai = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Xi)
);
class zr extends xe {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(t, n, i, r) {
    let s = -1;
    if (super(t, n), Bo(this, "space", r), typeof i == "number")
      for (; ++s < ai.length; ) {
        const o = ai[s];
        Bo(this, ai[s], (i & Xi[o]) === Xi[o]);
      }
  }
}
zr.prototype.defined = !0;
function Bo(e, t, n) {
  n && (e[t] = n);
}
function Et(e) {
  const t = {}, n = {};
  for (const [i, r] of Object.entries(e.properties)) {
    const s = new zr(
      i,
      e.transform(e.attributes || {}, i),
      r,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(i) && (s.mustUseProperty = !0), t[i] = s, n[Ki(i)] = i, n[Ki(s.attribute)] = i;
  }
  return new an(t, n, e.space);
}
const wu = Et({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: se,
    ariaAutoComplete: null,
    ariaBusy: se,
    ariaChecked: se,
    ariaColCount: A,
    ariaColIndex: A,
    ariaColSpan: A,
    ariaControls: Q,
    ariaCurrent: null,
    ariaDescribedBy: Q,
    ariaDetails: null,
    ariaDisabled: se,
    ariaDropEffect: Q,
    ariaErrorMessage: null,
    ariaExpanded: se,
    ariaFlowTo: Q,
    ariaGrabbed: se,
    ariaHasPopup: null,
    ariaHidden: se,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Q,
    ariaLevel: A,
    ariaLive: null,
    ariaModal: se,
    ariaMultiLine: se,
    ariaMultiSelectable: se,
    ariaOrientation: null,
    ariaOwns: Q,
    ariaPlaceholder: null,
    ariaPosInSet: A,
    ariaPressed: se,
    ariaReadOnly: se,
    ariaRelevant: null,
    ariaRequired: se,
    ariaRoleDescription: Q,
    ariaRowCount: A,
    ariaRowIndex: A,
    ariaRowSpan: A,
    ariaSelected: se,
    ariaSetSize: A,
    ariaSort: null,
    ariaValueMax: A,
    ariaValueMin: A,
    ariaValueNow: A,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function ku(e, t) {
  return t in e ? e[t] : t;
}
function Su(e, t) {
  return ku(e, t.toLowerCase());
}
const pg = Et({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: xt,
    acceptCharset: Q,
    accessKey: Q,
    action: null,
    allow: null,
    allowFullScreen: $,
    allowPaymentRequest: $,
    allowUserMedia: $,
    alt: null,
    as: null,
    async: $,
    autoCapitalize: null,
    autoComplete: Q,
    autoFocus: $,
    autoPlay: $,
    blocking: Q,
    capture: null,
    charSet: null,
    checked: $,
    cite: null,
    className: Q,
    cols: A,
    colSpan: null,
    content: null,
    contentEditable: se,
    controls: $,
    controlsList: Q,
    coords: A | xt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: $,
    defer: $,
    dir: null,
    dirName: null,
    disabled: $,
    download: Yi,
    draggable: se,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: $,
    formTarget: null,
    headers: Q,
    height: A,
    hidden: Yi,
    high: A,
    href: null,
    hrefLang: null,
    htmlFor: Q,
    httpEquiv: Q,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: $,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: $,
    itemId: null,
    itemProp: Q,
    itemRef: Q,
    itemScope: $,
    itemType: Q,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: $,
    low: A,
    manifest: null,
    max: null,
    maxLength: A,
    media: null,
    method: null,
    min: null,
    minLength: A,
    multiple: $,
    muted: $,
    name: null,
    nonce: null,
    noModule: $,
    noValidate: $,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: $,
    optimum: A,
    pattern: null,
    ping: Q,
    placeholder: null,
    playsInline: $,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: $,
    referrerPolicy: null,
    rel: Q,
    required: $,
    reversed: $,
    rows: A,
    rowSpan: A,
    sandbox: Q,
    scope: null,
    scoped: $,
    seamless: $,
    selected: $,
    shadowRootClonable: $,
    shadowRootDelegatesFocus: $,
    shadowRootMode: null,
    shape: null,
    size: A,
    sizes: null,
    slot: null,
    span: A,
    spellCheck: se,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: A,
    step: null,
    style: null,
    tabIndex: A,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: $,
    useMap: null,
    value: se,
    width: A,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Q,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: A,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: A,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: $,
    // Lists. Use CSS to reduce space between items instead
    declare: $,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: A,
    // `<img>` and `<object>`
    leftMargin: A,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: A,
    // `<body>`
    marginWidth: A,
    // `<body>`
    noResize: $,
    // `<frame>`
    noHref: $,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: $,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: $,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: A,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: se,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: A,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: A,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: $,
    disableRemotePlayback: $,
    prefix: null,
    property: null,
    results: A,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Su
}), mg = Et({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: ve,
    accentHeight: A,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: A,
    amplitude: A,
    arabicForm: null,
    ascent: A,
    attributeName: null,
    attributeType: null,
    azimuth: A,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: A,
    by: null,
    calcMode: null,
    capHeight: A,
    className: Q,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: A,
    diffuseConstant: A,
    direction: null,
    display: null,
    dur: null,
    divisor: A,
    dominantBaseline: null,
    download: $,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: A,
    enableBackground: null,
    end: null,
    event: null,
    exponent: A,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: A,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: xt,
    g2: xt,
    glyphName: xt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: A,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: A,
    horizOriginX: A,
    horizOriginY: A,
    id: null,
    ideographic: A,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: A,
    k: A,
    k1: A,
    k2: A,
    k3: A,
    k4: A,
    kernelMatrix: ve,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: A,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: A,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: A,
    overlineThickness: A,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: A,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Q,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: A,
    pointsAtY: A,
    pointsAtZ: A,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ve,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ve,
    rev: ve,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ve,
    requiredFeatures: ve,
    requiredFonts: ve,
    requiredFormats: ve,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: A,
    specularExponent: A,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: A,
    strikethroughThickness: A,
    string: null,
    stroke: null,
    strokeDashArray: ve,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: A,
    strokeOpacity: A,
    strokeWidth: null,
    style: null,
    surfaceScale: A,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ve,
    tabIndex: A,
    tableValues: null,
    target: null,
    targetX: A,
    targetY: A,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ve,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: A,
    underlineThickness: A,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: A,
    values: null,
    vAlphabetic: A,
    vMathematical: A,
    vectorEffect: null,
    vHanging: A,
    vIdeographic: A,
    version: null,
    vertAdvY: A,
    vertOriginX: A,
    vertOriginY: A,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: A,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: ku
}), Tu = Et({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Cu = Et({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Su
}), Pu = Et({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), gg = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, yg = /[A-Z]/g, _o = /-[a-z]/g, xg = /^data[-\w.:]+$/i;
function bg(e, t) {
  const n = Ki(t);
  let i = t, r = xe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && xg.test(t)) {
    if (t.charAt(4) === "-") {
      const s = t.slice(5).replace(_o, wg);
      i = "data" + s.charAt(0).toUpperCase() + s.slice(1);
    } else {
      const s = t.slice(4);
      if (!_o.test(s)) {
        let o = s.replace(yg, vg);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    r = zr;
  }
  return new r(i, t);
}
function vg(e) {
  return "-" + e.toLowerCase();
}
function wg(e) {
  return e.charAt(1).toUpperCase();
}
const kg = vu([wu, pg, Tu, Cu, Pu], "html"), $r = vu([wu, mg, Tu, Cu, Pu], "svg");
function Sg(e) {
  return e.join(" ").trim();
}
var ut = {}, li, zo;
function Tg() {
  if (zo) return li;
  zo = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, t = /\n/g, n = /^\s*/, i = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, r = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, o = /^[;\s]*/, a = /^\s+|\s+$/g, l = `
`, u = "/", c = "*", f = "", d = "comment", h = "declaration";
  function m(b, x) {
    if (typeof b != "string")
      throw new TypeError("First argument must be a string");
    if (!b) return [];
    x = x || {};
    var S = 1, v = 1;
    function P(F) {
      var D = F.match(t);
      D && (S += D.length);
      var W = F.lastIndexOf(l);
      v = ~W ? F.length - W : v + F.length;
    }
    function E() {
      var F = { line: S, column: v };
      return function(D) {
        return D.position = new w(F), O(), D;
      };
    }
    function w(F) {
      this.start = F, this.end = { line: S, column: v }, this.source = x.source;
    }
    w.prototype.content = b;
    function N(F) {
      var D = new Error(
        x.source + ":" + S + ":" + v + ": " + F
      );
      if (D.reason = F, D.filename = x.source, D.line = S, D.column = v, D.source = b, !x.silent) throw D;
    }
    function j(F) {
      var D = F.exec(b);
      if (D) {
        var W = D[0];
        return P(W), b = b.slice(W.length), D;
      }
    }
    function O() {
      j(n);
    }
    function V(F) {
      var D;
      for (F = F || []; D = R(); )
        D !== !1 && F.push(D);
      return F;
    }
    function R() {
      var F = E();
      if (!(u != b.charAt(0) || c != b.charAt(1))) {
        for (var D = 2; f != b.charAt(D) && (c != b.charAt(D) || u != b.charAt(D + 1)); )
          ++D;
        if (D += 2, f === b.charAt(D - 1))
          return N("End of comment missing");
        var W = b.slice(2, D - 2);
        return v += 2, P(W), b = b.slice(D), v += 2, F({
          type: d,
          comment: W
        });
      }
    }
    function L() {
      var F = E(), D = j(i);
      if (D) {
        if (R(), !j(r)) return N("property missing ':'");
        var W = j(s), U = F({
          type: h,
          property: k(D[0].replace(e, f)),
          value: W ? k(W[0].replace(e, f)) : f
        });
        return j(o), U;
      }
    }
    function q() {
      var F = [];
      V(F);
      for (var D; D = L(); )
        D !== !1 && (F.push(D), V(F));
      return F;
    }
    return O(), q();
  }
  function k(b) {
    return b ? b.replace(a, f) : f;
  }
  return li = m, li;
}
var $o;
function Cg() {
  if ($o) return ut;
  $o = 1;
  var e = ut && ut.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(ut, "__esModule", { value: !0 }), ut.default = n;
  const t = e(Tg());
  function n(i, r) {
    let s = null;
    if (!i || typeof i != "string")
      return s;
    const o = (0, t.default)(i), a = typeof r == "function";
    return o.forEach((l) => {
      if (l.type !== "declaration")
        return;
      const { property: u, value: c } = l;
      a ? r(u, c, l) : c && (s = s || {}, s[u] = c);
    }), s;
  }
  return ut;
}
var Vt = {}, Uo;
function Pg() {
  if (Uo) return Vt;
  Uo = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, t = /-([a-z])/g, n = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, r = /^-(ms)-/, s = function(u) {
    return !u || n.test(u) || e.test(u);
  }, o = function(u, c) {
    return c.toUpperCase();
  }, a = function(u, c) {
    return "".concat(c, "-");
  }, l = function(u, c) {
    return c === void 0 && (c = {}), s(u) ? u : (u = u.toLowerCase(), c.reactCompat ? u = u.replace(r, a) : u = u.replace(i, a), u.replace(t, o));
  };
  return Vt.camelCase = l, Vt;
}
var Ot, Ho;
function Eg() {
  if (Ho) return Ot;
  Ho = 1;
  var e = Ot && Ot.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  }, t = e(Cg()), n = Pg();
  function i(r, s) {
    var o = {};
    return !r || typeof r != "string" || (0, t.default)(r, function(a, l) {
      a && l && (o[(0, n.camelCase)(a, s)] = l);
    }), o;
  }
  return i.default = i, Ot = i, Ot;
}
var Ag = Eg();
const Ig = /* @__PURE__ */ Sa(Ag), Eu = Au("end"), Ur = Au("start");
function Au(e) {
  return t;
  function t(n) {
    const i = n && n.position && n.position[e] || {};
    if (typeof i.line == "number" && i.line > 0 && typeof i.column == "number" && i.column > 0)
      return {
        line: i.line,
        column: i.column,
        offset: typeof i.offset == "number" && i.offset > -1 ? i.offset : void 0
      };
  }
}
function Dg(e) {
  const t = Ur(e), n = Eu(e);
  if (t && n)
    return { start: t, end: n };
}
function qt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Wo(e.position) : "start" in e || "end" in e ? Wo(e) : "line" in e || "column" in e ? Qi(e) : "";
}
function Qi(e) {
  return qo(e && e.line) + ":" + qo(e && e.column);
}
function Wo(e) {
  return Qi(e && e.start) + "-" + Qi(e && e.end);
}
function qo(e) {
  return e && typeof e == "number" ? e : 1;
}
class fe extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, i) {
    super(), typeof n == "string" && (i = n, n = void 0);
    let r = "", s = {}, o = !1;
    if (n && ("line" in n && "column" in n ? s = { place: n } : "start" in n && "end" in n ? s = { place: n } : "type" in n ? s = {
      ancestors: [n],
      place: n.position
    } : s = { ...n }), typeof t == "string" ? r = t : !s.cause && t && (o = !0, r = t.message, s.cause = t), !s.ruleId && !s.source && typeof i == "string") {
      const l = i.indexOf(":");
      l === -1 ? s.ruleId = i : (s.source = i.slice(0, l), s.ruleId = i.slice(l + 1));
    }
    if (!s.place && s.ancestors && s.ancestors) {
      const l = s.ancestors[s.ancestors.length - 1];
      l && (s.place = l.position);
    }
    const a = s.place && "start" in s.place ? s.place.start : s.place;
    this.ancestors = s.ancestors || void 0, this.cause = s.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = a ? a.line : void 0, this.name = qt(s.place) || "1:1", this.place = s.place || void 0, this.reason = this.message, this.ruleId = s.ruleId || void 0, this.source = s.source || void 0, this.stack = o && s.cause && typeof s.cause.stack == "string" ? s.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
fe.prototype.file = "";
fe.prototype.name = "";
fe.prototype.reason = "";
fe.prototype.message = "";
fe.prototype.stack = "";
fe.prototype.column = void 0;
fe.prototype.line = void 0;
fe.prototype.ancestors = void 0;
fe.prototype.cause = void 0;
fe.prototype.fatal = void 0;
fe.prototype.place = void 0;
fe.prototype.ruleId = void 0;
fe.prototype.source = void 0;
const Hr = {}.hasOwnProperty, jg = /* @__PURE__ */ new Map(), Ng = /[A-Z]/g, Mg = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Rg = /* @__PURE__ */ new Set(["td", "th"]), Iu = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Lg(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let i;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    i = Ug(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    i = $g(n, t.jsx, t.jsxs);
  }
  const r = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: i,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? $r : kg,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, s = Du(r, e, void 0);
  return s && typeof s != "string" ? s : r.create(
    e,
    r.Fragment,
    { children: s || void 0 },
    void 0
  );
}
function Du(e, t, n) {
  if (t.type === "element")
    return Vg(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Og(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Bg(e, t, n);
  if (t.type === "mdxjsEsm")
    return Fg(e, t);
  if (t.type === "root")
    return _g(e, t, n);
  if (t.type === "text")
    return zg(e, t);
}
function Vg(e, t, n) {
  const i = e.schema;
  let r = i;
  t.tagName.toLowerCase() === "svg" && i.space === "html" && (r = $r, e.schema = r), e.ancestors.push(t);
  const s = Nu(e, t.tagName, !1), o = Hg(e, t);
  let a = qr(e, t);
  return Mg.has(t.tagName) && (a = a.filter(function(l) {
    return typeof l == "string" ? !hg(l) : !0;
  })), ju(e, o, s, t), Wr(o, a), e.ancestors.pop(), e.schema = i, e.create(t, s, o, n);
}
function Og(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const i = t.data.estree.body[0];
    return i.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(i.expression);
  }
  tn(e, t.position);
}
function Fg(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  tn(e, t.position);
}
function Bg(e, t, n) {
  const i = e.schema;
  let r = i;
  t.name === "svg" && i.space === "html" && (r = $r, e.schema = r), e.ancestors.push(t);
  const s = t.name === null ? e.Fragment : Nu(e, t.name, !0), o = Wg(e, t), a = qr(e, t);
  return ju(e, o, s, t), Wr(o, a), e.ancestors.pop(), e.schema = i, e.create(t, s, o, n);
}
function _g(e, t, n) {
  const i = {};
  return Wr(i, qr(e, t)), e.create(t, e.Fragment, i, n);
}
function zg(e, t) {
  return t.value;
}
function ju(e, t, n, i) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = i);
}
function Wr(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function $g(e, t, n) {
  return i;
  function i(r, s, o, a) {
    const u = Array.isArray(o.children) ? n : t;
    return a ? u(s, o, a) : u(s, o);
  }
}
function Ug(e, t) {
  return n;
  function n(i, r, s, o) {
    const a = Array.isArray(s.children), l = Ur(i);
    return t(
      r,
      s,
      o,
      a,
      {
        columnNumber: l ? l.column - 1 : void 0,
        fileName: e,
        lineNumber: l ? l.line : void 0
      },
      void 0
    );
  }
}
function Hg(e, t) {
  const n = {};
  let i, r;
  for (r in t.properties)
    if (r !== "children" && Hr.call(t.properties, r)) {
      const s = qg(e, r, t.properties[r]);
      if (s) {
        const [o, a] = s;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Rg.has(t.tagName) ? i = a : n[o] = a;
      }
    }
  if (i) {
    const s = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    s[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = i;
  }
  return n;
}
function Wg(e, t) {
  const n = {};
  for (const i of t.attributes)
    if (i.type === "mdxJsxExpressionAttribute")
      if (i.data && i.data.estree && e.evaluater) {
        const s = i.data.estree.body[0];
        s.type;
        const o = s.expression;
        o.type;
        const a = o.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        tn(e, t.position);
    else {
      const r = i.name;
      let s;
      if (i.value && typeof i.value == "object")
        if (i.value.data && i.value.data.estree && e.evaluater) {
          const a = i.value.data.estree.body[0];
          a.type, s = e.evaluater.evaluateExpression(a.expression);
        } else
          tn(e, t.position);
      else
        s = i.value === null ? !0 : i.value;
      n[r] = /** @type {Props[keyof Props]} */
      s;
    }
  return n;
}
function qr(e, t) {
  const n = [];
  let i = -1;
  const r = e.passKeys ? /* @__PURE__ */ new Map() : jg;
  for (; ++i < t.children.length; ) {
    const s = t.children[i];
    let o;
    if (e.passKeys) {
      const l = s.type === "element" ? s.tagName : s.type === "mdxJsxFlowElement" || s.type === "mdxJsxTextElement" ? s.name : void 0;
      if (l) {
        const u = r.get(l) || 0;
        o = l + "-" + u, r.set(l, u + 1);
      }
    }
    const a = Du(e, s, o);
    a !== void 0 && n.push(a);
  }
  return n;
}
function qg(e, t, n) {
  const i = bg(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = i.commaSeparated ? ag(n) : Sg(n)), i.property === "style") {
      let r = typeof n == "object" ? n : Gg(e, String(n));
      return e.stylePropertyNameCase === "css" && (r = Kg(r)), ["style", r];
    }
    return [
      e.elementAttributeNameCase === "react" && i.space ? gg[i.property] || i.property : i.attribute,
      n
    ];
  }
}
function Gg(e, t) {
  try {
    return Ig(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const i = (
      /** @type {Error} */
      n
    ), r = new fe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: i,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw r.file = e.filePath || void 0, r.url = Iu + "#cannot-parse-style-attribute", r;
  }
}
function Nu(e, t, n) {
  let i;
  if (!n)
    i = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const r = t.split(".");
    let s = -1, o;
    for (; ++s < r.length; ) {
      const a = Oo(r[s]) ? { type: "Identifier", name: r[s] } : { type: "Literal", value: r[s] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: a,
        computed: !!(s && a.type === "Literal"),
        optional: !1
      } : a;
    }
    i = o;
  } else
    i = Oo(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (i.type === "Literal") {
    const r = (
      /** @type {string | number} */
      i.value
    );
    return Hr.call(e.components, r) ? e.components[r] : r;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(i);
  tn(e);
}
function tn(e, t) {
  const n = new fe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Iu + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Kg(e) {
  const t = {};
  let n;
  for (n in e)
    Hr.call(e, n) && (t[Yg(n)] = e[n]);
  return t;
}
function Yg(e) {
  let t = e.replace(Ng, Xg);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Xg(e) {
  return "-" + e.toLowerCase();
}
const ui = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, Qg = {};
function Zg(e, t) {
  const n = Qg, i = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, r = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Mu(e, i, r);
}
function Mu(e, t, n) {
  if (Jg(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Go(e.children, t, n);
  }
  return Array.isArray(e) ? Go(e, t, n) : "";
}
function Go(e, t, n) {
  const i = [];
  let r = -1;
  for (; ++r < e.length; )
    i[r] = Mu(e[r], t, n);
  return i.join("");
}
function Jg(e) {
  return !!(e && typeof e == "object");
}
const Ko = document.createElement("i");
function Gr(e) {
  const t = "&" + e + ";";
  Ko.innerHTML = t;
  const n = Ko.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function _e(e, t, n, i) {
  const r = e.length;
  let s = 0, o;
  if (t < 0 ? t = -t > r ? 0 : r + t : t = t > r ? r : t, n = n > 0 ? n : 0, i.length < 1e4)
    o = Array.from(i), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); s < i.length; )
      o = i.slice(s, s + 1e4), o.unshift(t, 0), e.splice(...o), s += 1e4, t += 1e4;
}
function Pe(e, t) {
  return e.length > 0 ? (_e(e, e.length, 0, t), e) : t;
}
const Yo = {}.hasOwnProperty;
function ey(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    ty(t, e[n]);
  return t;
}
function ty(e, t) {
  let n;
  for (n in t) {
    const r = (Yo.call(e, n) ? e[n] : void 0) || (e[n] = {}), s = t[n];
    let o;
    if (s)
      for (o in s) {
        Yo.call(r, o) || (r[o] = []);
        const a = s[o];
        ny(
          // @ts-expect-error Looks like a list.
          r[o],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function ny(e, t) {
  let n = -1;
  const i = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : i).push(t[n]);
  _e(e, 0, 0, i);
}
function Ru(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function bt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Oe = Ze(/[A-Za-z]/), ke = Ze(/[\dA-Za-z]/), iy = Ze(/[#-'*+\--9=?A-Z^-~]/);
function Zi(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Ji = Ze(/\d/), ry = Ze(/[\dA-Fa-f]/), sy = Ze(/[!-/:-@[-`{-~]/);
function _(e) {
  return e !== null && e < -2;
}
function ye(e) {
  return e !== null && (e < 0 || e === 32);
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const oy = Ze(new RegExp("\\p{P}|\\p{S}", "u")), ay = Ze(/\s/);
function Ze(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function At(e) {
  const t = [];
  let n = -1, i = 0, r = 0;
  for (; ++n < e.length; ) {
    const s = e.charCodeAt(n);
    let o = "";
    if (s === 37 && ke(e.charCodeAt(n + 1)) && ke(e.charCodeAt(n + 2)))
      r = 2;
    else if (s < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s)) || (o = String.fromCharCode(s));
    else if (s > 55295 && s < 57344) {
      const a = e.charCodeAt(n + 1);
      s < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(s, a), r = 1) : o = "�";
    } else
      o = String.fromCharCode(s);
    o && (t.push(e.slice(i, n), encodeURIComponent(o)), i = n + r + 1, o = ""), r && (n += r, r = 0);
  }
  return t.join("") + e.slice(i);
}
function Z(e, t, n, i) {
  const r = i ? i - 1 : Number.POSITIVE_INFINITY;
  let s = 0;
  return o;
  function o(l) {
    return K(l) ? (e.enter(n), a(l)) : t(l);
  }
  function a(l) {
    return K(l) && s++ < r ? (e.consume(l), a) : (e.exit(n), t(l));
  }
}
const ly = {
  tokenize: uy
};
function uy(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, i, r);
  let n;
  return t;
  function i(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Z(e, t, "linePrefix");
  }
  function r(a) {
    return e.enter("paragraph"), s(a);
  }
  function s(a) {
    const l = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = l), n = l, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return _(a) ? (e.consume(a), e.exit("chunkText"), s) : (e.consume(a), o);
  }
}
const cy = {
  tokenize: fy
}, Xo = {
  tokenize: hy
};
function fy(e) {
  const t = this, n = [];
  let i = 0, r, s, o;
  return a;
  function a(v) {
    if (i < n.length) {
      const P = n[i];
      return t.containerState = P[1], e.attempt(P[0].continuation, l, u)(v);
    }
    return u(v);
  }
  function l(v) {
    if (i++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, r && S();
      const P = t.events.length;
      let E = P, w;
      for (; E--; )
        if (t.events[E][0] === "exit" && t.events[E][1].type === "chunkFlow") {
          w = t.events[E][1].end;
          break;
        }
      x(i);
      let N = P;
      for (; N < t.events.length; )
        t.events[N][1].end = {
          ...w
        }, N++;
      return _e(t.events, E + 1, 0, t.events.slice(P)), t.events.length = N, u(v);
    }
    return a(v);
  }
  function u(v) {
    if (i === n.length) {
      if (!r)
        return d(v);
      if (r.currentConstruct && r.currentConstruct.concrete)
        return m(v);
      t.interrupt = !!(r.currentConstruct && !r._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Xo, c, f)(v);
  }
  function c(v) {
    return r && S(), x(i), d(v);
  }
  function f(v) {
    return t.parser.lazy[t.now().line] = i !== n.length, o = t.now().offset, m(v);
  }
  function d(v) {
    return t.containerState = {}, e.attempt(Xo, h, m)(v);
  }
  function h(v) {
    return i++, n.push([t.currentConstruct, t.containerState]), d(v);
  }
  function m(v) {
    if (v === null) {
      r && S(), x(0), e.consume(v);
      return;
    }
    return r = r || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: r,
      contentType: "flow",
      previous: s
    }), k(v);
  }
  function k(v) {
    if (v === null) {
      b(e.exit("chunkFlow"), !0), x(0), e.consume(v);
      return;
    }
    return _(v) ? (e.consume(v), b(e.exit("chunkFlow")), i = 0, t.interrupt = void 0, a) : (e.consume(v), k);
  }
  function b(v, P) {
    const E = t.sliceStream(v);
    if (P && E.push(null), v.previous = s, s && (s.next = v), s = v, r.defineSkip(v.start), r.write(E), t.parser.lazy[v.start.line]) {
      let w = r.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          r.events[w][1].start.offset < o && // …and either is not ended yet…
          (!r.events[w][1].end || // …or ends after it.
          r.events[w][1].end.offset > o)
        )
          return;
      const N = t.events.length;
      let j = N, O, V;
      for (; j--; )
        if (t.events[j][0] === "exit" && t.events[j][1].type === "chunkFlow") {
          if (O) {
            V = t.events[j][1].end;
            break;
          }
          O = !0;
        }
      for (x(i), w = N; w < t.events.length; )
        t.events[w][1].end = {
          ...V
        }, w++;
      _e(t.events, j + 1, 0, t.events.slice(N)), t.events.length = w;
    }
  }
  function x(v) {
    let P = n.length;
    for (; P-- > v; ) {
      const E = n[P];
      t.containerState = E[1], E[0].exit.call(t, e);
    }
    n.length = v;
  }
  function S() {
    r.write([null]), s = void 0, r = void 0, t.containerState._closeFlow = void 0;
  }
}
function hy(e, t, n) {
  return Z(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Qo(e) {
  if (e === null || ye(e) || ay(e))
    return 1;
  if (oy(e))
    return 2;
}
function Kr(e, t, n) {
  const i = [];
  let r = -1;
  for (; ++r < e.length; ) {
    const s = e[r].resolveAll;
    s && !i.includes(s) && (t = s(t, n), i.push(s));
  }
  return t;
}
const er = {
  name: "attention",
  resolveAll: dy,
  tokenize: py
};
function dy(e, t) {
  let n = -1, i, r, s, o, a, l, u, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (i = n; i--; )
        if (e[i][0] === "exit" && e[i][1].type === "attentionSequence" && e[i][1]._open && // If the markers are the same:
        t.sliceSerialize(e[i][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[i][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[i][1].end.offset - e[i][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          l = e[i][1].end.offset - e[i][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...e[i][1].end
          }, d = {
            ...e[n][1].start
          };
          Zo(f, -l), Zo(d, l), o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...e[i][1].end
            }
          }, a = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: d
          }, s = {
            type: l > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[i][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, r = {
            type: l > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...a.end
            }
          }, e[i][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...a.end
          }, u = [], e[i][1].end.offset - e[i][1].start.offset && (u = Pe(u, [["enter", e[i][1], t], ["exit", e[i][1], t]])), u = Pe(u, [["enter", r, t], ["enter", o, t], ["exit", o, t], ["enter", s, t]]), u = Pe(u, Kr(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t)), u = Pe(u, [["exit", s, t], ["enter", a, t], ["exit", a, t], ["exit", r, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Pe(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, _e(e, i - 1, n - i + 3, u), n = i + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function py(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, i = this.previous, r = Qo(i);
  let s;
  return o;
  function o(l) {
    return s = l, e.enter("attentionSequence"), a(l);
  }
  function a(l) {
    if (l === s)
      return e.consume(l), a;
    const u = e.exit("attentionSequence"), c = Qo(l), f = !c || c === 2 && r || n.includes(l), d = !r || r === 2 && c || n.includes(i);
    return u._open = !!(s === 42 ? f : f && (r || !d)), u._close = !!(s === 42 ? d : d && (c || !f)), t(l);
  }
}
function Zo(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const my = {
  name: "autolink",
  tokenize: gy
};
function gy(e, t, n) {
  let i = 0;
  return r;
  function r(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), s;
  }
  function s(h) {
    return Oe(h) ? (e.consume(h), o) : h === 64 ? n(h) : u(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || ke(h) ? (i = 1, a(h)) : u(h);
  }
  function a(h) {
    return h === 58 ? (e.consume(h), i = 0, l) : (h === 43 || h === 45 || h === 46 || ke(h)) && i++ < 32 ? (e.consume(h), a) : (i = 0, u(h));
  }
  function l(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Zi(h) ? n(h) : (e.consume(h), l);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : iy(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return ke(h) ? f(h) : n(h);
  }
  function f(h) {
    return h === 46 ? (e.consume(h), i = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : d(h);
  }
  function d(h) {
    if ((h === 45 || ke(h)) && i++ < 63) {
      const m = h === 45 ? d : f;
      return e.consume(h), m;
    }
    return n(h);
  }
}
const zn = {
  partial: !0,
  tokenize: yy
};
function yy(e, t, n) {
  return i;
  function i(s) {
    return K(s) ? Z(e, r, "linePrefix")(s) : r(s);
  }
  function r(s) {
    return s === null || _(s) ? t(s) : n(s);
  }
}
const Lu = {
  continuation: {
    tokenize: by
  },
  exit: vy,
  name: "blockQuote",
  tokenize: xy
};
function xy(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    if (o === 62) {
      const a = i.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), s;
    }
    return n(o);
  }
  function s(o) {
    return K(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function by(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return K(o) ? Z(e, s, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : s(o);
  }
  function s(o) {
    return e.attempt(Lu, t, n)(o);
  }
}
function vy(e) {
  e.exit("blockQuote");
}
const Vu = {
  name: "characterEscape",
  tokenize: wy
};
function wy(e, t, n) {
  return i;
  function i(s) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(s), e.exit("escapeMarker"), r;
  }
  function r(s) {
    return sy(s) ? (e.enter("characterEscapeValue"), e.consume(s), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(s);
  }
}
const Ou = {
  name: "characterReference",
  tokenize: ky
};
function ky(e, t, n) {
  const i = this;
  let r = 0, s, o;
  return a;
  function a(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), l;
  }
  function l(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), s = 31, o = ke, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), s = 6, o = ry, c) : (e.enter("characterReferenceValue"), s = 7, o = Ji, c(f));
  }
  function c(f) {
    if (f === 59 && r) {
      const d = e.exit("characterReferenceValue");
      return o === ke && !Gr(i.sliceSerialize(d)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(f) && r++ < s ? (e.consume(f), c) : n(f);
  }
}
const Jo = {
  partial: !0,
  tokenize: Ty
}, ea = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Sy
};
function Sy(e, t, n) {
  const i = this, r = {
    partial: !0,
    tokenize: E
  };
  let s = 0, o = 0, a;
  return l;
  function l(w) {
    return u(w);
  }
  function u(w) {
    const N = i.events[i.events.length - 1];
    return s = N && N[1].type === "linePrefix" ? N[2].sliceSerialize(N[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(w);
  }
  function c(w) {
    return w === a ? (o++, e.consume(w), c) : o < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), K(w) ? Z(e, f, "whitespace")(w) : f(w));
  }
  function f(w) {
    return w === null || _(w) ? (e.exit("codeFencedFence"), i.interrupt ? t(w) : e.check(Jo, k, P)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), d(w));
  }
  function d(w) {
    return w === null || _(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(w)) : K(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Z(e, h, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e.consume(w), d);
  }
  function h(w) {
    return w === null || _(w) ? f(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || _(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(w)) : w === 96 && w === a ? n(w) : (e.consume(w), m);
  }
  function k(w) {
    return e.attempt(r, P, b)(w);
  }
  function b(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), x;
  }
  function x(w) {
    return s > 0 && K(w) ? Z(e, S, "linePrefix", s + 1)(w) : S(w);
  }
  function S(w) {
    return w === null || _(w) ? e.check(Jo, k, P)(w) : (e.enter("codeFlowValue"), v(w));
  }
  function v(w) {
    return w === null || _(w) ? (e.exit("codeFlowValue"), S(w)) : (e.consume(w), v);
  }
  function P(w) {
    return e.exit("codeFenced"), t(w);
  }
  function E(w, N, j) {
    let O = 0;
    return V;
    function V(D) {
      return w.enter("lineEnding"), w.consume(D), w.exit("lineEnding"), R;
    }
    function R(D) {
      return w.enter("codeFencedFence"), K(D) ? Z(w, L, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(D) : L(D);
    }
    function L(D) {
      return D === a ? (w.enter("codeFencedFenceSequence"), q(D)) : j(D);
    }
    function q(D) {
      return D === a ? (O++, w.consume(D), q) : O >= o ? (w.exit("codeFencedFenceSequence"), K(D) ? Z(w, F, "whitespace")(D) : F(D)) : j(D);
    }
    function F(D) {
      return D === null || _(D) ? (w.exit("codeFencedFence"), N(D)) : j(D);
    }
  }
}
function Ty(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), s);
  }
  function s(o) {
    return i.parser.lazy[i.now().line] ? n(o) : t(o);
  }
}
const ci = {
  name: "codeIndented",
  tokenize: Py
}, Cy = {
  partial: !0,
  tokenize: Ey
};
function Py(e, t, n) {
  const i = this;
  return r;
  function r(u) {
    return e.enter("codeIndented"), Z(e, s, "linePrefix", 5)(u);
  }
  function s(u) {
    const c = i.events[i.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(u) : n(u);
  }
  function o(u) {
    return u === null ? l(u) : _(u) ? e.attempt(Cy, o, l)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || _(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function l(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function Ey(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return i.parser.lazy[i.now().line] ? n(o) : _(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), r) : Z(e, s, "linePrefix", 5)(o);
  }
  function s(o) {
    const a = i.events[i.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : _(o) ? r(o) : n(o);
  }
}
const Ay = {
  name: "codeText",
  previous: Dy,
  resolve: Iy,
  tokenize: jy
};
function Iy(e) {
  let t = e.length - 4, n = 3, i, r;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (i = n; ++i < t; )
      if (e[i][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (i = n - 1, t++; ++i <= t; )
    r === void 0 ? i !== t && e[i][1].type !== "lineEnding" && (r = i) : (i === t || e[i][1].type === "lineEnding") && (e[r][1].type = "codeTextData", i !== r + 2 && (e[r][1].end = e[i - 1][1].end, e.splice(r + 2, i - r - 2), t -= i - r - 2, i = r + 2), r = void 0);
  return e;
}
function Dy(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function jy(e, t, n) {
  let i = 0, r, s;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(f);
  }
  function a(f) {
    return f === 96 ? (e.consume(f), i++, a) : (e.exit("codeTextSequence"), l(f));
  }
  function l(f) {
    return f === null ? n(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), l) : f === 96 ? (s = e.enter("codeTextSequence"), r = 0, c(f)) : _(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || _(f) ? (e.exit("codeTextData"), l(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), r++, c) : r === i ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (s.type = "codeTextData", u(f));
  }
}
class Ny {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const i = n ?? Number.POSITIVE_INFINITY;
    return i < this.left.length ? this.left.slice(t, i) : t > this.left.length ? this.right.slice(this.right.length - i + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - i + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, i) {
    const r = n || 0;
    this.setCursor(Math.trunc(t));
    const s = this.right.splice(this.right.length - r, Number.POSITIVE_INFINITY);
    return i && Ft(this.left, i), s.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Ft(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), Ft(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Ft(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Ft(this.left, n.reverse());
      }
  }
}
function Ft(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Fu(e) {
  const t = {};
  let n = -1, i, r, s, o, a, l, u;
  const c = new Ny(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (i = c.get(n), n && i[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (l = i[1]._tokenizer.events, s = 0, s < l.length && l[s][1].type === "lineEndingBlank" && (s += 2), s < l.length && l[s][1].type === "content"))
      for (; ++s < l.length && l[s][1].type !== "content"; )
        l[s][1].type === "chunkText" && (l[s][1]._isInFirstContentOfListItem = !0, s++);
    if (i[0] === "enter")
      i[1].contentType && (Object.assign(t, My(c, n)), n = t[n], u = !0);
    else if (i[1]._container) {
      for (s = n, r = void 0; s--; )
        if (o = c.get(s), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (r && (c.get(r)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", r = s);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      r && (i[1].end = {
        ...c.get(r)[1].start
      }, a = c.slice(r, n), a.unshift(i), c.splice(r, n - r + 1, a));
    }
  }
  return _e(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function My(e, t) {
  const n = e.get(t)[1], i = e.get(t)[2];
  let r = t - 1;
  const s = [];
  let o = n._tokenizer;
  o || (o = i.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, l = [], u = {};
  let c, f, d = -1, h = n, m = 0, k = 0;
  const b = [k];
  for (; h; ) {
    for (; e.get(++r)[1] !== h; )
      ;
    s.push(r), h._tokenizer || (c = i.sliceStream(h), h.next || c.push(null), f && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = h, h = h.next;
  }
  for (h = n; ++d < a.length; )
    // Find a void token that includes a break.
    a[d][0] === "exit" && a[d - 1][0] === "enter" && a[d][1].type === a[d - 1][1].type && a[d][1].start.line !== a[d][1].end.line && (k = d + 1, b.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : b.pop(), d = b.length; d--; ) {
    const x = a.slice(b[d], b[d + 1]), S = s.pop();
    l.push([S, S + x.length - 1]), e.splice(S, 2, x);
  }
  for (l.reverse(), d = -1; ++d < l.length; )
    u[m + l[d][0]] = m + l[d][1], m += l[d][1] - l[d][0] - 1;
  return u;
}
const Ry = {
  resolve: Vy,
  tokenize: Oy
}, Ly = {
  partial: !0,
  tokenize: Fy
};
function Vy(e) {
  return Fu(e), e;
}
function Oy(e, t) {
  let n;
  return i;
  function i(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), r(a);
  }
  function r(a) {
    return a === null ? s(a) : _(a) ? e.check(Ly, o, s)(a) : (e.consume(a), r);
  }
  function s(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, r;
  }
}
function Fy(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), Z(e, s, "linePrefix");
  }
  function s(o) {
    if (o === null || _(o))
      return n(o);
    const a = i.events[i.events.length - 1];
    return !i.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(o) : e.interrupt(i.parser.constructs.flow, n, t)(o);
  }
}
function Bu(e, t, n, i, r, s, o, a, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(x) {
    return x === 60 ? (e.enter(i), e.enter(r), e.enter(s), e.consume(x), e.exit(s), d) : x === null || x === 32 || x === 41 || Zi(x) ? n(x) : (e.enter(i), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), k(x));
  }
  function d(x) {
    return x === 62 ? (e.enter(s), e.consume(x), e.exit(s), e.exit(r), e.exit(i), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), h(x));
  }
  function h(x) {
    return x === 62 ? (e.exit("chunkString"), e.exit(a), d(x)) : x === null || x === 60 || _(x) ? n(x) : (e.consume(x), x === 92 ? m : h);
  }
  function m(x) {
    return x === 60 || x === 62 || x === 92 ? (e.consume(x), h) : h(x);
  }
  function k(x) {
    return !c && (x === null || x === 41 || ye(x)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(i), t(x)) : c < u && x === 40 ? (e.consume(x), c++, k) : x === 41 ? (e.consume(x), c--, k) : x === null || x === 32 || x === 40 || Zi(x) ? n(x) : (e.consume(x), x === 92 ? b : k);
  }
  function b(x) {
    return x === 40 || x === 41 || x === 92 ? (e.consume(x), k) : k(x);
  }
}
function _u(e, t, n, i, r, s) {
  const o = this;
  let a = 0, l;
  return u;
  function u(h) {
    return e.enter(i), e.enter(r), e.consume(h), e.exit(r), e.enter(s), c;
  }
  function c(h) {
    return a > 999 || h === null || h === 91 || h === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(s), e.enter(r), e.consume(h), e.exit(r), e.exit(i), t) : _(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === null || h === 91 || h === 93 || _(h) || a++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), l || (l = !K(h)), h === 92 ? d : f);
  }
  function d(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), a++, f) : f(h);
  }
}
function zu(e, t, n, i, r, s) {
  let o;
  return a;
  function a(d) {
    return d === 34 || d === 39 || d === 40 ? (e.enter(i), e.enter(r), e.consume(d), e.exit(r), o = d === 40 ? 41 : d, l) : n(d);
  }
  function l(d) {
    return d === o ? (e.enter(r), e.consume(d), e.exit(r), e.exit(i), t) : (e.enter(s), u(d));
  }
  function u(d) {
    return d === o ? (e.exit(s), l(o)) : d === null ? n(d) : _(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), Z(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === o || d === null || _(d) ? (e.exit("chunkString"), u(d)) : (e.consume(d), d === 92 ? f : c);
  }
  function f(d) {
    return d === o || d === 92 ? (e.consume(d), c) : c(d);
  }
}
function Gt(e, t) {
  let n;
  return i;
  function i(r) {
    return _(r) ? (e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), n = !0, i) : K(r) ? Z(e, i, n ? "linePrefix" : "lineSuffix")(r) : t(r);
  }
}
const By = {
  name: "definition",
  tokenize: zy
}, _y = {
  partial: !0,
  tokenize: $y
};
function zy(e, t, n) {
  const i = this;
  let r;
  return s;
  function s(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return _u.call(
      i,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function a(h) {
    return r = bt(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), l) : n(h);
  }
  function l(h) {
    return ye(h) ? Gt(e, u)(h) : u(h);
  }
  function u(h) {
    return Bu(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function c(h) {
    return e.attempt(_y, f, f)(h);
  }
  function f(h) {
    return K(h) ? Z(e, d, "whitespace")(h) : d(h);
  }
  function d(h) {
    return h === null || _(h) ? (e.exit("definition"), i.parser.defined.push(r), t(h)) : n(h);
  }
}
function $y(e, t, n) {
  return i;
  function i(a) {
    return ye(a) ? Gt(e, r)(a) : n(a);
  }
  function r(a) {
    return zu(e, s, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function s(a) {
    return K(a) ? Z(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || _(a) ? t(a) : n(a);
  }
}
const Uy = {
  name: "hardBreakEscape",
  tokenize: Hy
};
function Hy(e, t, n) {
  return i;
  function i(s) {
    return e.enter("hardBreakEscape"), e.consume(s), r;
  }
  function r(s) {
    return _(s) ? (e.exit("hardBreakEscape"), t(s)) : n(s);
  }
}
const Wy = {
  name: "headingAtx",
  resolve: qy,
  tokenize: Gy
};
function qy(e, t) {
  let n = e.length - 2, i = 3, r, s;
  return e[i][1].type === "whitespace" && (i += 2), n - 2 > i && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (i === n - 1 || n - 4 > i && e[n - 2][1].type === "whitespace") && (n -= i + 1 === n ? 2 : 4), n > i && (r = {
    type: "atxHeadingText",
    start: e[i][1].start,
    end: e[n][1].end
  }, s = {
    type: "chunkText",
    start: e[i][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, _e(e, i, n - i + 1, [["enter", r, t], ["enter", s, t], ["exit", s, t], ["exit", r, t]])), e;
}
function Gy(e, t, n) {
  let i = 0;
  return r;
  function r(c) {
    return e.enter("atxHeading"), s(c);
  }
  function s(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && i++ < 6 ? (e.consume(c), o) : c === null || ye(c) ? (e.exit("atxHeadingSequence"), a(c)) : n(c);
  }
  function a(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), l(c)) : c === null || _(c) ? (e.exit("atxHeading"), t(c)) : K(c) ? Z(e, a, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function l(c) {
    return c === 35 ? (e.consume(c), l) : (e.exit("atxHeadingSequence"), a(c));
  }
  function u(c) {
    return c === null || c === 35 || ye(c) ? (e.exit("atxHeadingText"), a(c)) : (e.consume(c), u);
  }
}
const Ky = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], ta = ["pre", "script", "style", "textarea"], Yy = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Zy,
  tokenize: Jy
}, Xy = {
  partial: !0,
  tokenize: tx
}, Qy = {
  partial: !0,
  tokenize: ex
};
function Zy(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Jy(e, t, n) {
  const i = this;
  let r, s, o, a, l;
  return u;
  function u(p) {
    return c(p);
  }
  function c(p) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(p), f;
  }
  function f(p) {
    return p === 33 ? (e.consume(p), d) : p === 47 ? (e.consume(p), s = !0, k) : p === 63 ? (e.consume(p), r = 3, i.interrupt ? t : y) : Oe(p) ? (e.consume(p), o = String.fromCharCode(p), b) : n(p);
  }
  function d(p) {
    return p === 45 ? (e.consume(p), r = 2, h) : p === 91 ? (e.consume(p), r = 5, a = 0, m) : Oe(p) ? (e.consume(p), r = 4, i.interrupt ? t : y) : n(p);
  }
  function h(p) {
    return p === 45 ? (e.consume(p), i.interrupt ? t : y) : n(p);
  }
  function m(p) {
    const G = "CDATA[";
    return p === G.charCodeAt(a++) ? (e.consume(p), a === G.length ? i.interrupt ? t : L : m) : n(p);
  }
  function k(p) {
    return Oe(p) ? (e.consume(p), o = String.fromCharCode(p), b) : n(p);
  }
  function b(p) {
    if (p === null || p === 47 || p === 62 || ye(p)) {
      const G = p === 47, Te = o.toLowerCase();
      return !G && !s && ta.includes(Te) ? (r = 1, i.interrupt ? t(p) : L(p)) : Ky.includes(o.toLowerCase()) ? (r = 6, G ? (e.consume(p), x) : i.interrupt ? t(p) : L(p)) : (r = 7, i.interrupt && !i.parser.lazy[i.now().line] ? n(p) : s ? S(p) : v(p));
    }
    return p === 45 || ke(p) ? (e.consume(p), o += String.fromCharCode(p), b) : n(p);
  }
  function x(p) {
    return p === 62 ? (e.consume(p), i.interrupt ? t : L) : n(p);
  }
  function S(p) {
    return K(p) ? (e.consume(p), S) : V(p);
  }
  function v(p) {
    return p === 47 ? (e.consume(p), V) : p === 58 || p === 95 || Oe(p) ? (e.consume(p), P) : K(p) ? (e.consume(p), v) : V(p);
  }
  function P(p) {
    return p === 45 || p === 46 || p === 58 || p === 95 || ke(p) ? (e.consume(p), P) : E(p);
  }
  function E(p) {
    return p === 61 ? (e.consume(p), w) : K(p) ? (e.consume(p), E) : v(p);
  }
  function w(p) {
    return p === null || p === 60 || p === 61 || p === 62 || p === 96 ? n(p) : p === 34 || p === 39 ? (e.consume(p), l = p, N) : K(p) ? (e.consume(p), w) : j(p);
  }
  function N(p) {
    return p === l ? (e.consume(p), l = null, O) : p === null || _(p) ? n(p) : (e.consume(p), N);
  }
  function j(p) {
    return p === null || p === 34 || p === 39 || p === 47 || p === 60 || p === 61 || p === 62 || p === 96 || ye(p) ? E(p) : (e.consume(p), j);
  }
  function O(p) {
    return p === 47 || p === 62 || K(p) ? v(p) : n(p);
  }
  function V(p) {
    return p === 62 ? (e.consume(p), R) : n(p);
  }
  function R(p) {
    return p === null || _(p) ? L(p) : K(p) ? (e.consume(p), R) : n(p);
  }
  function L(p) {
    return p === 45 && r === 2 ? (e.consume(p), W) : p === 60 && r === 1 ? (e.consume(p), U) : p === 62 && r === 4 ? (e.consume(p), C) : p === 63 && r === 3 ? (e.consume(p), y) : p === 93 && r === 5 ? (e.consume(p), re) : _(p) && (r === 6 || r === 7) ? (e.exit("htmlFlowData"), e.check(Xy, B, q)(p)) : p === null || _(p) ? (e.exit("htmlFlowData"), q(p)) : (e.consume(p), L);
  }
  function q(p) {
    return e.check(Qy, F, B)(p);
  }
  function F(p) {
    return e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), D;
  }
  function D(p) {
    return p === null || _(p) ? q(p) : (e.enter("htmlFlowData"), L(p));
  }
  function W(p) {
    return p === 45 ? (e.consume(p), y) : L(p);
  }
  function U(p) {
    return p === 47 ? (e.consume(p), o = "", Y) : L(p);
  }
  function Y(p) {
    if (p === 62) {
      const G = o.toLowerCase();
      return ta.includes(G) ? (e.consume(p), C) : L(p);
    }
    return Oe(p) && o.length < 8 ? (e.consume(p), o += String.fromCharCode(p), Y) : L(p);
  }
  function re(p) {
    return p === 93 ? (e.consume(p), y) : L(p);
  }
  function y(p) {
    return p === 62 ? (e.consume(p), C) : p === 45 && r === 2 ? (e.consume(p), y) : L(p);
  }
  function C(p) {
    return p === null || _(p) ? (e.exit("htmlFlowData"), B(p)) : (e.consume(p), C);
  }
  function B(p) {
    return e.exit("htmlFlow"), t(p);
  }
}
function ex(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return _(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), s) : n(o);
  }
  function s(o) {
    return i.parser.lazy[i.now().line] ? n(o) : t(o);
  }
}
function tx(e, t, n) {
  return i;
  function i(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(zn, t, n);
  }
}
const nx = {
  name: "htmlText",
  tokenize: ix
};
function ix(e, t, n) {
  const i = this;
  let r, s, o;
  return a;
  function a(y) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(y), l;
  }
  function l(y) {
    return y === 33 ? (e.consume(y), u) : y === 47 ? (e.consume(y), E) : y === 63 ? (e.consume(y), v) : Oe(y) ? (e.consume(y), j) : n(y);
  }
  function u(y) {
    return y === 45 ? (e.consume(y), c) : y === 91 ? (e.consume(y), s = 0, m) : Oe(y) ? (e.consume(y), S) : n(y);
  }
  function c(y) {
    return y === 45 ? (e.consume(y), h) : n(y);
  }
  function f(y) {
    return y === null ? n(y) : y === 45 ? (e.consume(y), d) : _(y) ? (o = f, U(y)) : (e.consume(y), f);
  }
  function d(y) {
    return y === 45 ? (e.consume(y), h) : f(y);
  }
  function h(y) {
    return y === 62 ? W(y) : y === 45 ? d(y) : f(y);
  }
  function m(y) {
    const C = "CDATA[";
    return y === C.charCodeAt(s++) ? (e.consume(y), s === C.length ? k : m) : n(y);
  }
  function k(y) {
    return y === null ? n(y) : y === 93 ? (e.consume(y), b) : _(y) ? (o = k, U(y)) : (e.consume(y), k);
  }
  function b(y) {
    return y === 93 ? (e.consume(y), x) : k(y);
  }
  function x(y) {
    return y === 62 ? W(y) : y === 93 ? (e.consume(y), x) : k(y);
  }
  function S(y) {
    return y === null || y === 62 ? W(y) : _(y) ? (o = S, U(y)) : (e.consume(y), S);
  }
  function v(y) {
    return y === null ? n(y) : y === 63 ? (e.consume(y), P) : _(y) ? (o = v, U(y)) : (e.consume(y), v);
  }
  function P(y) {
    return y === 62 ? W(y) : v(y);
  }
  function E(y) {
    return Oe(y) ? (e.consume(y), w) : n(y);
  }
  function w(y) {
    return y === 45 || ke(y) ? (e.consume(y), w) : N(y);
  }
  function N(y) {
    return _(y) ? (o = N, U(y)) : K(y) ? (e.consume(y), N) : W(y);
  }
  function j(y) {
    return y === 45 || ke(y) ? (e.consume(y), j) : y === 47 || y === 62 || ye(y) ? O(y) : n(y);
  }
  function O(y) {
    return y === 47 ? (e.consume(y), W) : y === 58 || y === 95 || Oe(y) ? (e.consume(y), V) : _(y) ? (o = O, U(y)) : K(y) ? (e.consume(y), O) : W(y);
  }
  function V(y) {
    return y === 45 || y === 46 || y === 58 || y === 95 || ke(y) ? (e.consume(y), V) : R(y);
  }
  function R(y) {
    return y === 61 ? (e.consume(y), L) : _(y) ? (o = R, U(y)) : K(y) ? (e.consume(y), R) : O(y);
  }
  function L(y) {
    return y === null || y === 60 || y === 61 || y === 62 || y === 96 ? n(y) : y === 34 || y === 39 ? (e.consume(y), r = y, q) : _(y) ? (o = L, U(y)) : K(y) ? (e.consume(y), L) : (e.consume(y), F);
  }
  function q(y) {
    return y === r ? (e.consume(y), r = void 0, D) : y === null ? n(y) : _(y) ? (o = q, U(y)) : (e.consume(y), q);
  }
  function F(y) {
    return y === null || y === 34 || y === 39 || y === 60 || y === 61 || y === 96 ? n(y) : y === 47 || y === 62 || ye(y) ? O(y) : (e.consume(y), F);
  }
  function D(y) {
    return y === 47 || y === 62 || ye(y) ? O(y) : n(y);
  }
  function W(y) {
    return y === 62 ? (e.consume(y), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(y);
  }
  function U(y) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), Y;
  }
  function Y(y) {
    return K(y) ? Z(e, re, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(y) : re(y);
  }
  function re(y) {
    return e.enter("htmlTextData"), o(y);
  }
}
const Yr = {
  name: "labelEnd",
  resolveAll: ax,
  resolveTo: lx,
  tokenize: ux
}, rx = {
  tokenize: cx
}, sx = {
  tokenize: fx
}, ox = {
  tokenize: hx
};
function ax(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const i = e[t][1];
    if (n.push(e[t]), i.type === "labelImage" || i.type === "labelLink" || i.type === "labelEnd") {
      const r = i.type === "labelImage" ? 4 : 2;
      i.type = "data", t += r;
    }
  }
  return e.length !== n.length && _e(e, 0, e.length, n), e;
}
function lx(e, t) {
  let n = e.length, i = 0, r, s, o, a;
  for (; n--; )
    if (r = e[n][1], s) {
      if (r.type === "link" || r.type === "labelLink" && r._inactive)
        break;
      e[n][0] === "enter" && r.type === "labelLink" && (r._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (r.type === "labelImage" || r.type === "labelLink") && !r._balanced && (s = n, r.type !== "labelLink")) {
        i = 2;
        break;
      }
    } else r.type === "labelEnd" && (o = n);
  const l = {
    type: e[s][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[s][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[s][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[s + i + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return a = [["enter", l, t], ["enter", u, t]], a = Pe(a, e.slice(s + 1, s + i + 3)), a = Pe(a, [["enter", c, t]]), a = Pe(a, Kr(t.parser.constructs.insideSpan.null, e.slice(s + i + 4, o - 3), t)), a = Pe(a, [["exit", c, t], e[o - 2], e[o - 1], ["exit", u, t]]), a = Pe(a, e.slice(o + 1)), a = Pe(a, [["exit", l, t]]), _e(e, s, e.length, a), e;
}
function ux(e, t, n) {
  const i = this;
  let r = i.events.length, s, o;
  for (; r--; )
    if ((i.events[r][1].type === "labelImage" || i.events[r][1].type === "labelLink") && !i.events[r][1]._balanced) {
      s = i.events[r][1];
      break;
    }
  return a;
  function a(d) {
    return s ? s._inactive ? f(d) : (o = i.parser.defined.includes(bt(i.sliceSerialize({
      start: s.end,
      end: i.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(d), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(d);
  }
  function l(d) {
    return d === 40 ? e.attempt(rx, c, o ? c : f)(d) : d === 91 ? e.attempt(sx, c, o ? u : f)(d) : o ? c(d) : f(d);
  }
  function u(d) {
    return e.attempt(ox, c, f)(d);
  }
  function c(d) {
    return t(d);
  }
  function f(d) {
    return s._balanced = !0, n(d);
  }
}
function cx(e, t, n) {
  return i;
  function i(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), r;
  }
  function r(f) {
    return ye(f) ? Gt(e, s)(f) : s(f);
  }
  function s(f) {
    return f === 41 ? c(f) : Bu(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function o(f) {
    return ye(f) ? Gt(e, l)(f) : c(f);
  }
  function a(f) {
    return n(f);
  }
  function l(f) {
    return f === 34 || f === 39 || f === 40 ? zu(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function u(f) {
    return ye(f) ? Gt(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : n(f);
  }
}
function fx(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return _u.call(i, e, s, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function s(a) {
    return i.parser.defined.includes(bt(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function o(a) {
    return n(a);
  }
}
function hx(e, t, n) {
  return i;
  function i(s) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(s), e.exit("referenceMarker"), r;
  }
  function r(s) {
    return s === 93 ? (e.enter("referenceMarker"), e.consume(s), e.exit("referenceMarker"), e.exit("reference"), t) : n(s);
  }
}
const dx = {
  name: "labelStartImage",
  resolveAll: Yr.resolveAll,
  tokenize: px
};
function px(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), s;
  }
  function s(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : n(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? n(a) : t(a);
  }
}
const mx = {
  name: "labelStartLink",
  resolveAll: Yr.resolveAll,
  tokenize: gx
};
function gx(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), s;
  }
  function s(o) {
    return o === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? n(o) : t(o);
  }
}
const fi = {
  name: "lineEnding",
  tokenize: yx
};
function yx(e, t) {
  return n;
  function n(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), Z(e, t, "linePrefix");
  }
}
const Sn = {
  name: "thematicBreak",
  tokenize: xx
};
function xx(e, t, n) {
  let i = 0, r;
  return s;
  function s(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return r = u, a(u);
  }
  function a(u) {
    return u === r ? (e.enter("thematicBreakSequence"), l(u)) : i >= 3 && (u === null || _(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function l(u) {
    return u === r ? (e.consume(u), i++, l) : (e.exit("thematicBreakSequence"), K(u) ? Z(e, a, "whitespace")(u) : a(u));
  }
}
const me = {
  continuation: {
    tokenize: kx
  },
  exit: Tx,
  name: "list",
  tokenize: wx
}, bx = {
  partial: !0,
  tokenize: Cx
}, vx = {
  partial: !0,
  tokenize: Sx
};
function wx(e, t, n) {
  const i = this, r = i.events[i.events.length - 1];
  let s = r && r[1].type === "linePrefix" ? r[2].sliceSerialize(r[1], !0).length : 0, o = 0;
  return a;
  function a(h) {
    const m = i.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (m === "listUnordered" ? !i.containerState.marker || h === i.containerState.marker : Ji(h)) {
      if (i.containerState.type || (i.containerState.type = m, e.enter(m, {
        _container: !0
      })), m === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(Sn, n, u)(h) : u(h);
      if (!i.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(h);
    }
    return n(h);
  }
  function l(h) {
    return Ji(h) && ++o < 10 ? (e.consume(h), l) : (!i.interrupt || o < 2) && (i.containerState.marker ? h === i.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), i.containerState.marker = i.containerState.marker || h, e.check(
      zn,
      // Can’t be empty when interrupting.
      i.interrupt ? n : c,
      e.attempt(bx, d, f)
    );
  }
  function c(h) {
    return i.containerState.initialBlankLine = !0, s++, d(h);
  }
  function f(h) {
    return K(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), d) : n(h);
  }
  function d(h) {
    return i.containerState.size = s + i.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function kx(e, t, n) {
  const i = this;
  return i.containerState._closeFlow = void 0, e.check(zn, r, s);
  function r(a) {
    return i.containerState.furtherBlankLines = i.containerState.furtherBlankLines || i.containerState.initialBlankLine, Z(e, t, "listItemIndent", i.containerState.size + 1)(a);
  }
  function s(a) {
    return i.containerState.furtherBlankLines || !K(a) ? (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, o(a)) : (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, e.attempt(vx, t, o)(a));
  }
  function o(a) {
    return i.containerState._closeFlow = !0, i.interrupt = void 0, Z(e, e.attempt(me, t, n), "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Sx(e, t, n) {
  const i = this;
  return Z(e, r, "listItemIndent", i.containerState.size + 1);
  function r(s) {
    const o = i.events[i.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === i.containerState.size ? t(s) : n(s);
  }
}
function Tx(e) {
  e.exit(this.containerState.type);
}
function Cx(e, t, n) {
  const i = this;
  return Z(e, r, "listItemPrefixWhitespace", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function r(s) {
    const o = i.events[i.events.length - 1];
    return !K(s) && o && o[1].type === "listItemPrefixWhitespace" ? t(s) : n(s);
  }
}
const na = {
  name: "setextUnderline",
  resolveTo: Px,
  tokenize: Ex
};
function Px(e, t) {
  let n = e.length, i, r, s;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        i = n;
        break;
      }
      e[n][1].type === "paragraph" && (r = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !s && e[n][1].type === "definition" && (s = n);
  const o = {
    type: "setextHeading",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[r][1].type = "setextHeadingText", s ? (e.splice(r, 0, ["enter", o, t]), e.splice(s + 1, 0, ["exit", e[i][1], t]), e[i][1].end = {
    ...e[s][1].end
  }) : e[i][1] = o, e.push(["exit", o, t]), e;
}
function Ex(e, t, n) {
  const i = this;
  let r;
  return s;
  function s(u) {
    let c = i.events.length, f;
    for (; c--; )
      if (i.events[c][1].type !== "lineEnding" && i.events[c][1].type !== "linePrefix" && i.events[c][1].type !== "content") {
        f = i.events[c][1].type === "paragraph";
        break;
      }
    return !i.parser.lazy[i.now().line] && (i.interrupt || f) ? (e.enter("setextHeadingLine"), r = u, o(u)) : n(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === r ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), K(u) ? Z(e, l, "lineSuffix")(u) : l(u));
  }
  function l(u) {
    return u === null || _(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const Ax = {
  tokenize: Ix
};
function Ix(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    zn,
    i,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, r, Z(e, e.attempt(this.parser.constructs.flow, r, e.attempt(Ry, r)), "linePrefix"))
  );
  return n;
  function i(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(s), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const Dx = {
  resolveAll: Uu()
}, jx = $u("string"), Nx = $u("text");
function $u(e) {
  return {
    resolveAll: Uu(e === "text" ? Mx : void 0),
    tokenize: t
  };
  function t(n) {
    const i = this, r = this.parser.constructs[e], s = n.attempt(r, o, a);
    return o;
    function o(c) {
      return u(c) ? s(c) : a(c);
    }
    function a(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), l;
    }
    function l(c) {
      return u(c) ? (n.exit("data"), s(c)) : (n.consume(c), l);
    }
    function u(c) {
      if (c === null)
        return !0;
      const f = r[c];
      let d = -1;
      if (f)
        for (; ++d < f.length; ) {
          const h = f[d];
          if (!h.previous || h.previous.call(i, i.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Uu(e) {
  return t;
  function t(n, i) {
    let r = -1, s;
    for (; ++r <= n.length; )
      s === void 0 ? n[r] && n[r][1].type === "data" && (s = r, r++) : (!n[r] || n[r][1].type !== "data") && (r !== s + 2 && (n[s][1].end = n[r - 1][1].end, n.splice(s + 2, r - s - 2), r = s + 2), s = void 0);
    return e ? e(n, i) : n;
  }
}
function Mx(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const i = e[n - 1][1], r = t.sliceStream(i);
      let s = r.length, o = -1, a = 0, l;
      for (; s--; ) {
        const u = r[s];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o) break;
          o = -1;
        } else if (u === -2)
          l = !0, a++;
        else if (u !== -1) {
          s++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const u = {
          type: n === e.length || l || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: s ? o : i.start._bufferIndex + o,
            _index: i.start._index + s,
            line: i.end.line,
            column: i.end.column - a,
            offset: i.end.offset - a
          },
          end: {
            ...i.end
          }
        };
        i.end = {
          ...u.start
        }, i.start.offset === i.end.offset ? Object.assign(i, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const Rx = {
  42: me,
  43: me,
  45: me,
  48: me,
  49: me,
  50: me,
  51: me,
  52: me,
  53: me,
  54: me,
  55: me,
  56: me,
  57: me,
  62: Lu
}, Lx = {
  91: By
}, Vx = {
  [-2]: ci,
  [-1]: ci,
  32: ci
}, Ox = {
  35: Wy,
  42: Sn,
  45: [na, Sn],
  60: Yy,
  61: na,
  95: Sn,
  96: ea,
  126: ea
}, Fx = {
  38: Ou,
  92: Vu
}, Bx = {
  [-5]: fi,
  [-4]: fi,
  [-3]: fi,
  33: dx,
  38: Ou,
  42: er,
  60: [my, nx],
  91: mx,
  92: [Uy, Vu],
  93: Yr,
  95: er,
  96: Ay
}, _x = {
  null: [er, Dx]
}, zx = {
  null: [42, 95]
}, $x = {
  null: []
}, Ux = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: zx,
  contentInitial: Lx,
  disable: $x,
  document: Rx,
  flow: Ox,
  flowInitial: Vx,
  insideSpan: _x,
  string: Fx,
  text: Bx
}, Symbol.toStringTag, { value: "Module" }));
function Hx(e, t, n) {
  let i = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const r = {}, s = [];
  let o = [], a = [];
  const l = {
    attempt: N(E),
    check: N(w),
    consume: S,
    enter: v,
    exit: P,
    interrupt: N(w, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: m,
    parser: e,
    previous: null,
    sliceSerialize: d,
    sliceStream: h,
    write: f
  };
  let c = t.tokenize.call(u, l);
  return t.resolveAll && s.push(t), u;
  function f(R) {
    return o = Pe(o, R), b(), o[o.length - 1] !== null ? [] : (j(t, 0), u.events = Kr(s, u.events, u), u.events);
  }
  function d(R, L) {
    return qx(h(R), L);
  }
  function h(R) {
    return Wx(o, R);
  }
  function m() {
    const {
      _bufferIndex: R,
      _index: L,
      line: q,
      column: F,
      offset: D
    } = i;
    return {
      _bufferIndex: R,
      _index: L,
      line: q,
      column: F,
      offset: D
    };
  }
  function k(R) {
    r[R.line] = R.column, V();
  }
  function b() {
    let R;
    for (; i._index < o.length; ) {
      const L = o[i._index];
      if (typeof L == "string")
        for (R = i._index, i._bufferIndex < 0 && (i._bufferIndex = 0); i._index === R && i._bufferIndex < L.length; )
          x(L.charCodeAt(i._bufferIndex));
      else
        x(L);
    }
  }
  function x(R) {
    c = c(R);
  }
  function S(R) {
    _(R) ? (i.line++, i.column = 1, i.offset += R === -3 ? 2 : 1, V()) : R !== -1 && (i.column++, i.offset++), i._bufferIndex < 0 ? i._index++ : (i._bufferIndex++, i._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[i._index].length && (i._bufferIndex = -1, i._index++)), u.previous = R;
  }
  function v(R, L) {
    const q = L || {};
    return q.type = R, q.start = m(), u.events.push(["enter", q, u]), a.push(q), q;
  }
  function P(R) {
    const L = a.pop();
    return L.end = m(), u.events.push(["exit", L, u]), L;
  }
  function E(R, L) {
    j(R, L.from);
  }
  function w(R, L) {
    L.restore();
  }
  function N(R, L) {
    return q;
    function q(F, D, W) {
      let U, Y, re, y;
      return Array.isArray(F) ? (
        /* c8 ignore next 1 */
        B(F)
      ) : "tokenize" in F ? (
        // Looks like a construct.
        B([
          /** @type {Construct} */
          F
        ])
      ) : C(F);
      function C(ie) {
        return J;
        function J(he) {
          const Le = he !== null && ie[he], qe = he !== null && ie.null, un = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Le) ? Le : Le ? [Le] : [],
            ...Array.isArray(qe) ? qe : qe ? [qe] : []
          ];
          return B(un)(he);
        }
      }
      function B(ie) {
        return U = ie, Y = 0, ie.length === 0 ? W : p(ie[Y]);
      }
      function p(ie) {
        return J;
        function J(he) {
          return y = O(), re = ie, ie.partial || (u.currentConstruct = ie), ie.name && u.parser.constructs.disable.null.includes(ie.name) ? Te() : ie.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(u), L) : u,
            l,
            G,
            Te
          )(he);
        }
      }
      function G(ie) {
        return R(re, y), D;
      }
      function Te(ie) {
        return y.restore(), ++Y < U.length ? p(U[Y]) : W;
      }
    }
  }
  function j(R, L) {
    R.resolveAll && !s.includes(R) && s.push(R), R.resolve && _e(u.events, L, u.events.length - L, R.resolve(u.events.slice(L), u)), R.resolveTo && (u.events = R.resolveTo(u.events, u));
  }
  function O() {
    const R = m(), L = u.previous, q = u.currentConstruct, F = u.events.length, D = Array.from(a);
    return {
      from: F,
      restore: W
    };
    function W() {
      i = R, u.previous = L, u.currentConstruct = q, u.events.length = F, a = D, V();
    }
  }
  function V() {
    i.line in r && i.column < 2 && (i.column = r[i.line], i.offset += r[i.line] - 1);
  }
}
function Wx(e, t) {
  const n = t.start._index, i = t.start._bufferIndex, r = t.end._index, s = t.end._bufferIndex;
  let o;
  if (n === r)
    o = [e[n].slice(i, s)];
  else {
    if (o = e.slice(n, r), i > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(i) : o.shift();
    }
    s > 0 && o.push(e[r].slice(0, s));
  }
  return o;
}
function qx(e, t) {
  let n = -1;
  const i = [];
  let r;
  for (; ++n < e.length; ) {
    const s = e[n];
    let o;
    if (typeof s == "string")
      o = s;
    else switch (s) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && r) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(s);
    }
    r = s === -2, i.push(o);
  }
  return i.join("");
}
function Gx(e) {
  const i = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ey([Ux, ...(e || {}).extensions || []])
    ),
    content: r(ly),
    defined: [],
    document: r(cy),
    flow: r(Ax),
    lazy: {},
    string: r(jx),
    text: r(Nx)
  };
  return i;
  function r(s) {
    return o;
    function o(a) {
      return Hx(i, s, a);
    }
  }
}
function Kx(e) {
  for (; !Fu(e); )
    ;
  return e;
}
const ia = /[\0\t\n\r]/g;
function Yx() {
  let e = 1, t = "", n = !0, i;
  return r;
  function r(s, o, a) {
    const l = [];
    let u, c, f, d, h;
    for (s = t + (typeof s == "string" ? s.toString() : new TextDecoder(o || void 0).decode(s)), f = 0, t = "", n && (s.charCodeAt(0) === 65279 && f++, n = void 0); f < s.length; ) {
      if (ia.lastIndex = f, u = ia.exec(s), d = u && u.index !== void 0 ? u.index : s.length, h = s.charCodeAt(d), !u) {
        t = s.slice(f);
        break;
      }
      if (h === 10 && f === d && i)
        l.push(-3), i = void 0;
      else
        switch (i && (l.push(-5), i = void 0), f < d && (l.push(s.slice(f, d)), e += d - f), h) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, l.push(-2); e++ < c; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), e = 1;
            break;
          }
          default:
            i = !0, e = 1;
        }
      f = d + 1;
    }
    return a && (i && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const Xx = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Qx(e) {
  return e.replace(Xx, Zx);
}
function Zx(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const r = n.charCodeAt(1), s = r === 120 || r === 88;
    return Ru(n.slice(s ? 2 : 1), s ? 16 : 10);
  }
  return Gr(n) || e;
}
const Hu = {}.hasOwnProperty;
function Jx(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), eb(n)(Kx(Gx(n).document().write(Yx()(e, t, !0))));
}
function eb(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: s(os),
      autolinkProtocol: O,
      autolinkEmail: O,
      atxHeading: s(is),
      blockQuote: s(qe),
      characterEscape: O,
      characterReference: O,
      codeFenced: s(un),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: s(un, o),
      codeText: s(nc, o),
      codeTextData: O,
      data: O,
      codeFlowValue: O,
      definition: s(ic),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: s(rc),
      hardBreakEscape: s(rs),
      hardBreakTrailing: s(rs),
      htmlFlow: s(ss, o),
      htmlFlowData: O,
      htmlText: s(ss, o),
      htmlTextData: O,
      image: s(sc),
      label: o,
      link: s(os),
      listItem: s(oc),
      listItemValue: d,
      listOrdered: s(as, f),
      listUnordered: s(as),
      paragraph: s(ac),
      reference: p,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: s(is),
      strong: s(lc),
      thematicBreak: s(cc)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: E,
      autolink: l(),
      autolinkEmail: Le,
      autolinkProtocol: he,
      blockQuote: l(),
      characterEscapeValue: V,
      characterReferenceMarkerHexadecimal: Te,
      characterReferenceMarkerNumeric: Te,
      characterReferenceValue: ie,
      characterReference: J,
      codeFenced: l(b),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: m,
      codeFlowValue: V,
      codeIndented: l(x),
      codeText: l(D),
      codeTextData: V,
      data: V,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: S,
      definitionTitleString: v,
      emphasis: l(),
      hardBreakEscape: l(L),
      hardBreakTrailing: l(L),
      htmlFlow: l(q),
      htmlFlowData: V,
      htmlText: l(F),
      htmlTextData: V,
      image: l(U),
      label: re,
      labelText: Y,
      lineEnding: R,
      link: l(W),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: G,
      resourceDestinationString: y,
      resourceTitleString: C,
      resource: B,
      setextHeading: l(j),
      setextHeadingLineSequence: N,
      setextHeadingText: w,
      strong: l(),
      thematicBreak: l()
    }
  };
  Wu(t, (e || {}).mdastExtensions || []);
  const n = {};
  return i;
  function i(T) {
    let I = {
      type: "root",
      children: []
    };
    const z = {
      stack: [I],
      tokenStack: [],
      config: t,
      enter: a,
      exit: u,
      buffer: o,
      resume: c,
      data: n
    }, H = [];
    let X = -1;
    for (; ++X < T.length; )
      if (T[X][1].type === "listOrdered" || T[X][1].type === "listUnordered")
        if (T[X][0] === "enter")
          H.push(X);
        else {
          const Ie = H.pop();
          X = r(T, Ie, X);
        }
    for (X = -1; ++X < T.length; ) {
      const Ie = t[T[X][0]];
      Hu.call(Ie, T[X][1].type) && Ie[T[X][1].type].call(Object.assign({
        sliceSerialize: T[X][2].sliceSerialize
      }, z), T[X][1]);
    }
    if (z.tokenStack.length > 0) {
      const Ie = z.tokenStack[z.tokenStack.length - 1];
      (Ie[1] || ra).call(z, void 0, Ie[0]);
    }
    for (I.position = {
      start: Ge(T.length > 0 ? T[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Ge(T.length > 0 ? T[T.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, X = -1; ++X < t.transforms.length; )
      I = t.transforms[X](I) || I;
    return I;
  }
  function r(T, I, z) {
    let H = I - 1, X = -1, Ie = !1, Je, ze, It, Dt;
    for (; ++H <= z; ) {
      const be = T[H];
      switch (be[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          be[0] === "enter" ? X++ : X--, Dt = void 0;
          break;
        }
        case "lineEndingBlank": {
          be[0] === "enter" && (Je && !Dt && !X && !It && (It = H), Dt = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Dt = void 0;
      }
      if (!X && be[0] === "enter" && be[1].type === "listItemPrefix" || X === -1 && be[0] === "exit" && (be[1].type === "listUnordered" || be[1].type === "listOrdered")) {
        if (Je) {
          let lt = H;
          for (ze = void 0; lt--; ) {
            const $e = T[lt];
            if ($e[1].type === "lineEnding" || $e[1].type === "lineEndingBlank") {
              if ($e[0] === "exit") continue;
              ze && (T[ze][1].type = "lineEndingBlank", Ie = !0), $e[1].type = "lineEnding", ze = lt;
            } else if (!($e[1].type === "linePrefix" || $e[1].type === "blockQuotePrefix" || $e[1].type === "blockQuotePrefixWhitespace" || $e[1].type === "blockQuoteMarker" || $e[1].type === "listItemIndent")) break;
          }
          It && (!ze || It < ze) && (Je._spread = !0), Je.end = Object.assign({}, ze ? T[ze][1].start : be[1].end), T.splice(ze || H, 0, ["exit", Je, be[2]]), H++, z++;
        }
        if (be[1].type === "listItemPrefix") {
          const lt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, be[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Je = lt, T.splice(H, 0, ["enter", lt, be[2]]), H++, z++, It = void 0, Dt = !0;
        }
      }
    }
    return T[I][1]._spread = Ie, z;
  }
  function s(T, I) {
    return z;
    function z(H) {
      a.call(this, T(H), H), I && I.call(this, H);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(T, I, z) {
    this.stack[this.stack.length - 1].children.push(T), this.stack.push(T), this.tokenStack.push([I, z || void 0]), T.position = {
      start: Ge(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(T) {
    return I;
    function I(z) {
      T && T.call(this, z), u.call(this, z);
    }
  }
  function u(T, I) {
    const z = this.stack.pop(), H = this.tokenStack.pop();
    if (H)
      H[0].type !== T.type && (I ? I.call(this, T, H[0]) : (H[1] || ra).call(this, T, H[0]));
    else throw new Error("Cannot close `" + T.type + "` (" + qt({
      start: T.start,
      end: T.end
    }) + "): it’s not open");
    z.position.end = Ge(T.end);
  }
  function c() {
    return Zg(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(T) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(T), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = T;
  }
  function m() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = T;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function b() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function x() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = T.replace(/(\r?\n|\r)$/g, "");
  }
  function S(T) {
    const I = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = I, z.identifier = bt(this.sliceSerialize(T)).toLowerCase();
  }
  function v() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = T;
  }
  function P() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = T;
  }
  function E(T) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const z = this.sliceSerialize(T).length;
      I.depth = z;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function N(T) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(T).codePointAt(0) === 61 ? 1 : 2;
  }
  function j() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function O(T) {
    const z = this.stack[this.stack.length - 1].children;
    let H = z[z.length - 1];
    (!H || H.type !== "text") && (H = uc(), H.position = {
      start: Ge(T.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, z.push(H)), this.stack.push(H);
  }
  function V(T) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(T), I.position.end = Ge(T.end);
  }
  function R(T) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const z = I.children[I.children.length - 1];
      z.position.end = Ge(T.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(I.type) && (O.call(this, T), V.call(this, T));
  }
  function L() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = T;
  }
  function F() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = T;
  }
  function D() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = T;
  }
  function W() {
    const T = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = I, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function U() {
    const T = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = I, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function Y(T) {
    const I = this.sliceSerialize(T), z = this.stack[this.stack.length - 2];
    z.label = Qx(I), z.identifier = bt(I).toLowerCase();
  }
  function re() {
    const T = this.stack[this.stack.length - 1], I = this.resume(), z = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, z.type === "link") {
      const H = T.children;
      z.children = H;
    } else
      z.alt = I;
  }
  function y() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = T;
  }
  function C() {
    const T = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = T;
  }
  function B() {
    this.data.inReference = void 0;
  }
  function p() {
    this.data.referenceType = "collapsed";
  }
  function G(T) {
    const I = this.resume(), z = this.stack[this.stack.length - 1];
    z.label = I, z.identifier = bt(this.sliceSerialize(T)).toLowerCase(), this.data.referenceType = "full";
  }
  function Te(T) {
    this.data.characterReferenceType = T.type;
  }
  function ie(T) {
    const I = this.sliceSerialize(T), z = this.data.characterReferenceType;
    let H;
    z ? (H = Ru(I, z === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : H = Gr(I);
    const X = this.stack[this.stack.length - 1];
    X.value += H;
  }
  function J(T) {
    const I = this.stack.pop();
    I.position.end = Ge(T.end);
  }
  function he(T) {
    V.call(this, T);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(T);
  }
  function Le(T) {
    V.call(this, T);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(T);
  }
  function qe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function un() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function nc() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function ic() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function rc() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function is() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function rs() {
    return {
      type: "break"
    };
  }
  function ss() {
    return {
      type: "html",
      value: ""
    };
  }
  function sc() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function os() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function as(T) {
    return {
      type: "list",
      ordered: T.type === "listOrdered",
      start: null,
      spread: T._spread,
      children: []
    };
  }
  function oc(T) {
    return {
      type: "listItem",
      spread: T._spread,
      checked: null,
      children: []
    };
  }
  function ac() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function lc() {
    return {
      type: "strong",
      children: []
    };
  }
  function uc() {
    return {
      type: "text",
      value: ""
    };
  }
  function cc() {
    return {
      type: "thematicBreak"
    };
  }
}
function Ge(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Wu(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const i = t[n];
    Array.isArray(i) ? Wu(e, i) : tb(e, i);
  }
}
function tb(e, t) {
  let n;
  for (n in t)
    if (Hu.call(t, n))
      switch (n) {
        case "canContainEols": {
          const i = t[n];
          i && e[n].push(...i);
          break;
        }
        case "transforms": {
          const i = t[n];
          i && e[n].push(...i);
          break;
        }
        case "enter":
        case "exit": {
          const i = t[n];
          i && Object.assign(e[n], i);
          break;
        }
      }
}
function ra(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + qt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + qt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + qt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function nb(e) {
  const t = this;
  t.parser = n;
  function n(i) {
    return Jx(i, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function ib(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function rb(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function sb(e, t) {
  const n = t.value ? t.value + `
` : "", i = {}, r = t.lang ? t.lang.split(/\s+/) : [];
  r.length > 0 && (i.className = ["language-" + r[0]]);
  let s = {
    type: "element",
    tagName: "code",
    properties: i,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (s.data = { meta: t.meta }), e.patch(t, s), s = e.applyData(t, s), s = { type: "element", tagName: "pre", properties: {}, children: [s] }, e.patch(t, s), s;
}
function ob(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ab(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function lb(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", i = String(t.identifier).toUpperCase(), r = At(i.toLowerCase()), s = e.footnoteOrder.indexOf(i);
  let o, a = e.footnoteCounts.get(i);
  a === void 0 ? (a = 0, e.footnoteOrder.push(i), o = e.footnoteOrder.length) : o = s + 1, a += 1, e.footnoteCounts.set(i, a);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + r,
      id: n + "fnref-" + r + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(t, l);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function ub(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function cb(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function qu(e, t) {
  const n = t.referenceType;
  let i = "]";
  if (n === "collapsed" ? i += "[]" : n === "full" && (i += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + i }];
  const r = e.all(t), s = r[0];
  s && s.type === "text" ? s.value = "[" + s.value : r.unshift({ type: "text", value: "[" });
  const o = r[r.length - 1];
  return o && o.type === "text" ? o.value += i : r.push({ type: "text", value: i }), r;
}
function fb(e, t) {
  const n = String(t.identifier).toUpperCase(), i = e.definitionById.get(n);
  if (!i)
    return qu(e, t);
  const r = { src: At(i.url || ""), alt: t.alt };
  i.title !== null && i.title !== void 0 && (r.title = i.title);
  const s = { type: "element", tagName: "img", properties: r, children: [] };
  return e.patch(t, s), e.applyData(t, s);
}
function hb(e, t) {
  const n = { src: At(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const i = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}
function db(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const i = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, i), e.applyData(t, i);
}
function pb(e, t) {
  const n = String(t.identifier).toUpperCase(), i = e.definitionById.get(n);
  if (!i)
    return qu(e, t);
  const r = { href: At(i.url || "") };
  i.title !== null && i.title !== void 0 && (r.title = i.title);
  const s = {
    type: "element",
    tagName: "a",
    properties: r,
    children: e.all(t)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function mb(e, t) {
  const n = { href: At(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function gb(e, t, n) {
  const i = e.all(t), r = n ? yb(n) : Gu(t), s = {}, o = [];
  if (typeof t.checked == "boolean") {
    const c = i[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, i.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), s.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < i.length; ) {
    const c = i[a];
    (r || a !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !r ? o.push(...c.children) : o.push(c);
  }
  const l = i[i.length - 1];
  l && (r || l.type !== "element" || l.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: s, children: o };
  return e.patch(t, u), e.applyData(t, u);
}
function yb(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let i = -1;
    for (; !t && ++i < n.length; )
      t = Gu(n[i]);
  }
  return t;
}
function Gu(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function xb(e, t) {
  const n = {}, i = e.all(t);
  let r = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++r < i.length; ) {
    const o = i[r];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const s = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(i, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function bb(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function vb(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function wb(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function kb(e, t) {
  const n = e.all(t), i = n.shift(), r = [];
  if (i) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([i], !0)
    };
    e.patch(t.children[0], o), r.push(o);
  }
  if (n.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, a = Ur(t.children[1]), l = Eu(t.children[t.children.length - 1]);
    a && l && (o.position = { start: a, end: l }), r.push(o);
  }
  const s = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(r, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function Sb(e, t, n) {
  const i = n ? n.children : void 0, s = (i ? i.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, a = o ? o.length : t.children.length;
  let l = -1;
  const u = [];
  for (; ++l < a; ) {
    const f = t.children[l], d = {}, h = o ? o[l] : void 0;
    h && (d.align = h);
    let m = { type: "element", tagName: s, properties: d, children: [] };
    f && (m.children = e.all(f), e.patch(f, m), m = e.applyData(f, m)), u.push(m);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function Tb(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const sa = 9, oa = 32;
function Cb(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let i = n.exec(t), r = 0;
  const s = [];
  for (; i; )
    s.push(
      aa(t.slice(r, i.index), r > 0, !0),
      i[0]
    ), r = i.index + i[0].length, i = n.exec(t);
  return s.push(aa(t.slice(r), r > 0, !1)), s.join("");
}
function aa(e, t, n) {
  let i = 0, r = e.length;
  if (t) {
    let s = e.codePointAt(i);
    for (; s === sa || s === oa; )
      i++, s = e.codePointAt(i);
  }
  if (n) {
    let s = e.codePointAt(r - 1);
    for (; s === sa || s === oa; )
      r--, s = e.codePointAt(r - 1);
  }
  return r > i ? e.slice(i, r) : "";
}
function Pb(e, t) {
  const n = { type: "text", value: Cb(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Eb(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Ab = {
  blockquote: ib,
  break: rb,
  code: sb,
  delete: ob,
  emphasis: ab,
  footnoteReference: lb,
  heading: ub,
  html: cb,
  imageReference: fb,
  image: hb,
  inlineCode: db,
  linkReference: pb,
  link: mb,
  listItem: gb,
  list: xb,
  paragraph: bb,
  // @ts-expect-error: root is different, but hard to type.
  root: vb,
  strong: wb,
  table: kb,
  tableCell: Tb,
  tableRow: Sb,
  text: Pb,
  thematicBreak: Eb,
  toml: pn,
  yaml: pn,
  definition: pn,
  footnoteDefinition: pn
};
function pn() {
}
const Ku = -1, $n = 0, Kt = 1, Nn = 2, Xr = 3, Qr = 4, Zr = 5, Jr = 6, Yu = 7, Xu = 8, la = typeof self == "object" ? self : globalThis, Ib = (e, t) => {
  const n = (r, s) => (e.set(s, r), r), i = (r) => {
    if (e.has(r))
      return e.get(r);
    const [s, o] = t[r];
    switch (s) {
      case $n:
      case Ku:
        return n(o, r);
      case Kt: {
        const a = n([], r);
        for (const l of o)
          a.push(i(l));
        return a;
      }
      case Nn: {
        const a = n({}, r);
        for (const [l, u] of o)
          a[i(l)] = i(u);
        return a;
      }
      case Xr:
        return n(new Date(o), r);
      case Qr: {
        const { source: a, flags: l } = o;
        return n(new RegExp(a, l), r);
      }
      case Zr: {
        const a = n(/* @__PURE__ */ new Map(), r);
        for (const [l, u] of o)
          a.set(i(l), i(u));
        return a;
      }
      case Jr: {
        const a = n(/* @__PURE__ */ new Set(), r);
        for (const l of o)
          a.add(i(l));
        return a;
      }
      case Yu: {
        const { name: a, message: l } = o;
        return n(new la[a](l), r);
      }
      case Xu:
        return n(BigInt(o), r);
      case "BigInt":
        return n(Object(BigInt(o)), r);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return n(new DataView(a), o);
      }
    }
    return n(new la[s](o), r);
  };
  return i;
}, ua = (e) => Ib(/* @__PURE__ */ new Map(), e)(0), ct = "", { toString: Db } = {}, { keys: jb } = Object, Bt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [$n, t];
  const n = Db.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Kt, ct];
    case "Object":
      return [Nn, ct];
    case "Date":
      return [Xr, ct];
    case "RegExp":
      return [Qr, ct];
    case "Map":
      return [Zr, ct];
    case "Set":
      return [Jr, ct];
    case "DataView":
      return [Kt, n];
  }
  return n.includes("Array") ? [Kt, n] : n.includes("Error") ? [Yu, n] : [Nn, n];
}, mn = ([e, t]) => e === $n && (t === "function" || t === "symbol"), Nb = (e, t, n, i) => {
  const r = (o, a) => {
    const l = i.push(o) - 1;
    return n.set(a, l), l;
  }, s = (o) => {
    if (n.has(o))
      return n.get(o);
    let [a, l] = Bt(o);
    switch (a) {
      case $n: {
        let c = o;
        switch (l) {
          case "bigint":
            a = Xu, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            c = null;
            break;
          case "undefined":
            return r([Ku], o);
        }
        return r([a, c], o);
      }
      case Kt: {
        if (l) {
          let d = o;
          return l === "DataView" ? d = new Uint8Array(o.buffer) : l === "ArrayBuffer" && (d = new Uint8Array(o)), r([l, [...d]], o);
        }
        const c = [], f = r([a, c], o);
        for (const d of o)
          c.push(s(d));
        return f;
      }
      case Nn: {
        if (l)
          switch (l) {
            case "BigInt":
              return r([l, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return r([l, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return s(o.toJSON());
        const c = [], f = r([a, c], o);
        for (const d of jb(o))
          (e || !mn(Bt(o[d]))) && c.push([s(d), s(o[d])]);
        return f;
      }
      case Xr:
        return r([a, o.toISOString()], o);
      case Qr: {
        const { source: c, flags: f } = o;
        return r([a, { source: c, flags: f }], o);
      }
      case Zr: {
        const c = [], f = r([a, c], o);
        for (const [d, h] of o)
          (e || !(mn(Bt(d)) || mn(Bt(h)))) && c.push([s(d), s(h)]);
        return f;
      }
      case Jr: {
        const c = [], f = r([a, c], o);
        for (const d of o)
          (e || !mn(Bt(d))) && c.push(s(d));
        return f;
      }
    }
    const { message: u } = o;
    return r([a, { name: l, message: u }], o);
  };
  return s;
}, ca = (e, { json: t, lossy: n } = {}) => {
  const i = [];
  return Nb(!(t || n), !!t, /* @__PURE__ */ new Map(), i)(e), i;
}, Mn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? ua(ca(e, t)) : structuredClone(e)
) : (e, t) => ua(ca(e, t));
function Mb(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Rb(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Lb(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Mb, i = e.options.footnoteBackLabel || Rb, r = e.options.footnoteLabel || "Footnotes", s = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!u)
      continue;
    const c = e.all(u), f = String(u.identifier).toUpperCase(), d = At(f.toLowerCase());
    let h = 0;
    const m = [], k = e.footnoteCounts.get(f);
    for (; k !== void 0 && ++h <= k; ) {
      m.length > 0 && m.push({ type: "text", value: " " });
      let S = typeof n == "string" ? n : n(l, h);
      typeof S == "string" && (S = { type: "text", value: S }), m.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + d + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof i == "string" ? i : i(l, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(S) ? S : [S]
      });
    }
    const b = c[c.length - 1];
    if (b && b.type === "element" && b.tagName === "p") {
      const S = b.children[b.children.length - 1];
      S && S.type === "text" ? S.value += " " : b.children.push({ type: "text", value: " " }), b.children.push(...m);
    } else
      c.push(...m);
    const x = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + d },
      children: e.wrap(c, !0)
    };
    e.patch(u, x), a.push(x);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: s,
          properties: {
            ...Mn(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: r }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const es = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(e) {
    if (e == null)
      return Bb;
    if (typeof e == "function")
      return Un(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Vb(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Ob(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Fb(e);
    throw new Error("Expected function, string, or object as test");
  })
);
function Vb(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = es(e[n]);
  return Un(i);
  function i(...r) {
    let s = -1;
    for (; ++s < t.length; )
      if (t[s].apply(this, r)) return !0;
    return !1;
  }
}
function Ob(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Un(n);
  function n(i) {
    const r = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      i
    );
    let s;
    for (s in e)
      if (r[s] !== t[s]) return !1;
    return !0;
  }
}
function Fb(e) {
  return Un(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Un(e) {
  return t;
  function t(n, i, r) {
    return !!(_b(n) && e.call(
      this,
      n,
      typeof i == "number" ? i : void 0,
      r || void 0
    ));
  }
}
function Bb() {
  return !0;
}
function _b(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Qu = [], zb = !0, fa = !1, $b = "skip";
function Zu(e, t, n, i) {
  let r;
  typeof t == "function" && typeof n != "function" ? (i = n, n = t) : r = t;
  const s = es(r), o = i ? -1 : 1;
  a(e, void 0, [])();
  function a(l, u, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof f.type == "string") {
      const h = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (l.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let h = Qu, m, k, b;
      if ((!t || s(l, u, c[c.length - 1] || void 0)) && (h = Ub(n(l, c)), h[0] === fa))
        return h;
      if ("children" in l && l.children) {
        const x = (
          /** @type {UnistParent} */
          l
        );
        if (x.children && h[0] !== $b)
          for (k = (i ? x.children.length : -1) + o, b = c.concat(x); k > -1 && k < x.children.length; ) {
            const S = x.children[k];
            if (m = a(S, k, b)(), m[0] === fa)
              return m;
            k = typeof m[1] == "number" ? m[1] : k + o;
          }
      }
      return h;
    }
  }
}
function Ub(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [zb, e] : e == null ? Qu : [e];
}
function Ju(e, t, n, i) {
  let r, s, o;
  typeof t == "function" && typeof n != "function" ? (s = void 0, o = t, r = n) : (s = t, o = n, r = i), Zu(e, s, a, r);
  function a(l, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(l) : void 0;
    return o(l, f, c);
  }
}
const tr = {}.hasOwnProperty, Hb = {};
function Wb(e, t) {
  const n = t || Hb, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), o = { ...Ab, ...n.handlers }, a = {
    all: u,
    applyData: Gb,
    definitionById: i,
    footnoteById: r,
    footnoteCounts: s,
    footnoteOrder: [],
    handlers: o,
    one: l,
    options: n,
    patch: qb,
    wrap: Yb
  };
  return Ju(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? i : r, d = String(c.identifier).toUpperCase();
      f.has(d) || f.set(d, c);
    }
  }), a;
  function l(c, f) {
    const d = c.type, h = a.handlers[d];
    if (tr.call(a.handlers, d) && h)
      return h(a, c, f);
    if (a.options.passThrough && a.options.passThrough.includes(d)) {
      if ("children" in c) {
        const { children: k, ...b } = c, x = Mn(b);
        return x.children = a.all(c), x;
      }
      return Mn(c);
    }
    return (a.options.unknownHandler || Kb)(a, c, f);
  }
  function u(c) {
    const f = [];
    if ("children" in c) {
      const d = c.children;
      let h = -1;
      for (; ++h < d.length; ) {
        const m = a.one(d[h], c);
        if (m) {
          if (h && d[h - 1].type === "break" && (!Array.isArray(m) && m.type === "text" && (m.value = ha(m.value)), !Array.isArray(m) && m.type === "element")) {
            const k = m.children[0];
            k && k.type === "text" && (k.value = ha(k.value));
          }
          Array.isArray(m) ? f.push(...m) : f.push(m);
        }
      }
    }
    return f;
  }
}
function qb(e, t) {
  e.position && (t.position = Dg(e));
}
function Gb(e, t) {
  let n = t;
  if (e && e.data) {
    const i = e.data.hName, r = e.data.hChildren, s = e.data.hProperties;
    if (typeof i == "string")
      if (n.type === "element")
        n.tagName = i;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: i, properties: {}, children: o };
      }
    n.type === "element" && s && Object.assign(n.properties, Mn(s)), "children" in n && n.children && r !== null && r !== void 0 && (n.children = r);
  }
  return n;
}
function Kb(e, t) {
  const n = t.data || {}, i = "value" in t && !(tr.call(n, "hProperties") || tr.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function Yb(e, t) {
  const n = [];
  let i = -1;
  for (t && n.push({ type: "text", value: `
` }); ++i < e.length; )
    i && n.push({ type: "text", value: `
` }), n.push(e[i]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function ha(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function da(e, t) {
  const n = Wb(e, t), i = n.one(e, void 0), r = Lb(n), s = Array.isArray(i) ? { type: "root", children: i } : i || { type: "root", children: [] };
  return r && s.children.push({ type: "text", value: `
` }, r), s;
}
function Xb(e, t) {
  return e && "run" in e ? async function(n, i) {
    const r = (
      /** @type {HastRoot} */
      da(n, { file: i, ...t })
    );
    await e.run(r, i);
  } : function(n, i) {
    return (
      /** @type {HastRoot} */
      da(n, { file: i, ...e || t })
    );
  };
}
function pa(e) {
  if (e)
    throw e;
}
var hi, ma;
function Qb() {
  if (ma) return hi;
  ma = 1;
  var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, r = function(u) {
    return typeof Array.isArray == "function" ? Array.isArray(u) : t.call(u) === "[object Array]";
  }, s = function(u) {
    if (!u || t.call(u) !== "[object Object]")
      return !1;
    var c = e.call(u, "constructor"), f = u.constructor && u.constructor.prototype && e.call(u.constructor.prototype, "isPrototypeOf");
    if (u.constructor && !c && !f)
      return !1;
    var d;
    for (d in u)
      ;
    return typeof d > "u" || e.call(u, d);
  }, o = function(u, c) {
    n && c.name === "__proto__" ? n(u, c.name, {
      enumerable: !0,
      configurable: !0,
      value: c.newValue,
      writable: !0
    }) : u[c.name] = c.newValue;
  }, a = function(u, c) {
    if (c === "__proto__")
      if (e.call(u, c)) {
        if (i)
          return i(u, c).value;
      } else return;
    return u[c];
  };
  return hi = function l() {
    var u, c, f, d, h, m, k = arguments[0], b = 1, x = arguments.length, S = !1;
    for (typeof k == "boolean" && (S = k, k = arguments[1] || {}, b = 2), (k == null || typeof k != "object" && typeof k != "function") && (k = {}); b < x; ++b)
      if (u = arguments[b], u != null)
        for (c in u)
          f = a(k, c), d = a(u, c), k !== d && (S && d && (s(d) || (h = r(d))) ? (h ? (h = !1, m = f && r(f) ? f : []) : m = f && s(f) ? f : {}, o(k, { name: c, newValue: l(S, m, d) })) : typeof d < "u" && o(k, { name: c, newValue: d }));
    return k;
  }, hi;
}
var Zb = Qb();
const di = /* @__PURE__ */ Sa(Zb);
function nr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Jb() {
  const e = [], t = { run: n, use: i };
  return t;
  function n(...r) {
    let s = -1;
    const o = r.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...r);
    function a(l, ...u) {
      const c = e[++s];
      let f = -1;
      if (l) {
        o(l);
        return;
      }
      for (; ++f < r.length; )
        (u[f] === null || u[f] === void 0) && (u[f] = r[f]);
      r = u, c ? ev(c, a)(...u) : o(null, ...u);
    }
  }
  function i(r) {
    if (typeof r != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + r
      );
    return e.push(r), t;
  }
}
function ev(e, t) {
  let n;
  return i;
  function i(...o) {
    const a = e.length > o.length;
    let l;
    a && o.push(r);
    try {
      l = e.apply(this, o);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (a && n)
        throw c;
      return r(c);
    }
    a || (l && l.then && typeof l.then == "function" ? l.then(s, r) : l instanceof Error ? r(l) : s(l));
  }
  function r(o, ...a) {
    n || (n = !0, t(o, ...a));
  }
  function s(o) {
    r(null, o);
  }
}
const Ve = { basename: tv, dirname: nv, extname: iv, join: rv, sep: "/" };
function tv(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  ln(e);
  let n = 0, i = -1, r = e.length, s;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; r--; )
      if (e.codePointAt(r) === 47) {
        if (s) {
          n = r + 1;
          break;
        }
      } else i < 0 && (s = !0, i = r + 1);
    return i < 0 ? "" : e.slice(n, i);
  }
  if (t === e)
    return "";
  let o = -1, a = t.length - 1;
  for (; r--; )
    if (e.codePointAt(r) === 47) {
      if (s) {
        n = r + 1;
        break;
      }
    } else
      o < 0 && (s = !0, o = r + 1), a > -1 && (e.codePointAt(r) === t.codePointAt(a--) ? a < 0 && (i = r) : (a = -1, i = o));
  return n === i ? i = o : i < 0 && (i = e.length), e.slice(n, i);
}
function nv(e) {
  if (ln(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, i;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (i) {
        t = n;
        break;
      }
    } else i || (i = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function iv(e) {
  ln(e);
  let t = e.length, n = -1, i = 0, r = -1, s = 0, o;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (o) {
        i = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), a === 46 ? r < 0 ? r = t : s !== 1 && (s = 1) : r > -1 && (s = -1);
  }
  return r < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  s === 0 || // The (right-most) trimmed path component is exactly `..`.
  s === 1 && r === n - 1 && r === i + 1 ? "" : e.slice(r, n);
}
function rv(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    ln(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : sv(n);
}
function sv(e) {
  ln(e);
  const t = e.codePointAt(0) === 47;
  let n = ov(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function ov(e, t) {
  let n = "", i = 0, r = -1, s = 0, o = -1, a, l;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      a = e.codePointAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(r === o - 1 || s === 1)) if (r !== o - 1 && s === 2) {
        if (n.length < 2 || i !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", i = 0) : (n = n.slice(0, l), i = n.length - 1 - n.lastIndexOf("/")), r = o, s = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", i = 0, r = o, s = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", i = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(r + 1, o) : n = e.slice(r + 1, o), i = o - r - 1;
      r = o, s = 0;
    } else a === 46 && s > -1 ? s++ : s = -1;
  }
  return n;
}
function ln(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const av = { cwd: lv };
function lv() {
  return "/";
}
function ir(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function uv(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!ir(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return cv(e);
}
function cv(e) {
  if (e.hostname !== "") {
    const i = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw i.code = "ERR_INVALID_FILE_URL_HOST", i;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const i = t.codePointAt(n + 2);
      if (i === 70 || i === 102) {
        const r = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw r.code = "ERR_INVALID_FILE_URL_PATH", r;
      }
    }
  return decodeURIComponent(t);
}
const pi = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class ec {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? ir(t) ? n = { path: t } : typeof t == "string" || fv(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : av.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let i = -1;
    for (; ++i < pi.length; ) {
      const s = pi[i];
      s in n && n[s] !== void 0 && n[s] !== null && (this[s] = s === "history" ? [...n[s]] : n[s]);
    }
    let r;
    for (r in n)
      pi.includes(r) || (this[r] = n[r]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Ve.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    gi(t, "basename"), mi(t, "basename"), this.path = Ve.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Ve.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    ga(this.basename, "dirname"), this.path = Ve.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Ve.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (mi(t, "extname"), ga(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Ve.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    ir(t) && (t = uv(t)), gi(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Ve.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    gi(t, "stem"), mi(t, "stem"), this.path = Ve.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, i) {
    const r = this.message(t, n, i);
    throw r.fatal = !0, r;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, i) {
    const r = this.message(t, n, i);
    return r.fatal = void 0, r;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, i) {
    const r = new fe(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      i
    );
    return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function mi(e, t) {
  if (e && e.includes(Ve.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Ve.sep + "`"
    );
}
function gi(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ga(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function fv(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const hv = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(e) {
    const i = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), r = i[e], s = function() {
      return r.apply(s, arguments);
    };
    return Object.setPrototypeOf(s, i), s;
  })
), dv = {}.hasOwnProperty;
class ts extends hv {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Jb();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new ts()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const i = this.attachers[n];
      t.use(...i);
    }
    return t.data(di(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (bi("data", this.frozen), this.namespace[t] = n, this) : dv.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (bi("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...i] = this.attachers[this.freezeIndex];
      if (i[0] === !1)
        continue;
      i[0] === !0 && (i[0] = void 0);
      const r = n.call(t, ...i);
      typeof r == "function" && this.transformers.use(r);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = gn(t), i = this.parser || this.Parser;
    return yi("parse", i), i(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const i = this;
    return this.freeze(), yi("process", this.parser || this.Parser), xi("process", this.compiler || this.Compiler), n ? r(void 0, n) : new Promise(r);
    function r(s, o) {
      const a = gn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        i.parse(a)
      );
      i.run(l, a, function(c, f, d) {
        if (c || !f || !d)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), m = i.stringify(h, d);
        gv(m) ? d.value = m : d.result = m, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function u(c, f) {
        c || !f ? o(c) : s ? s(f) : n(void 0, f);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, i;
    return this.freeze(), yi("processSync", this.parser || this.Parser), xi("processSync", this.compiler || this.Compiler), this.process(t, r), xa("processSync", "process", n), i;
    function r(s, o) {
      n = !0, pa(s), i = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, i) {
    ya(t), this.freeze();
    const r = this.transformers;
    return !i && typeof n == "function" && (i = n, n = void 0), i ? s(void 0, i) : new Promise(s);
    function s(o, a) {
      const l = gn(n);
      r.run(t, l, u);
      function u(c, f, d) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
        );
        c ? a(c) : o ? o(h) : i(void 0, h, d);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let i = !1, r;
    return this.run(t, n, s), xa("runSync", "run", i), r;
    function s(o, a) {
      pa(o), r = a, i = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const i = gn(n), r = this.compiler || this.Compiler;
    return xi("stringify", r), ya(t), r(t, i);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const i = this.attachers, r = this.namespace;
    if (bi("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function s(u) {
      if (typeof u == "function")
        l(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          l(c, f);
        } else
          o(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function o(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (r.settings = di(!0, r.settings, u.settings));
    }
    function a(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const f = u[c];
          s(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function l(u, c) {
      let f = -1, d = -1;
      for (; ++f < i.length; )
        if (i[f][0] === u) {
          d = f;
          break;
        }
      if (d === -1)
        i.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...m] = c;
        const k = i[d][1];
        nr(k) && nr(h) && (h = di(!0, k, h)), i[d] = [u, h, ...m];
      }
    }
  }
}
const pv = new ts().freeze();
function yi(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function xi(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function bi(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ya(e) {
  if (!nr(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function xa(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function gn(e) {
  return mv(e) ? e : new ec(e);
}
function mv(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function gv(e) {
  return typeof e == "string" || yv(e);
}
function yv(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const xv = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", ba = [], va = { allowDangerousHtml: !0 }, bv = /^(https?|ircs?|mailto|xmpp)$/i, vv = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Rn(e) {
  const t = e.allowedElements, n = e.allowElement, i = e.children || "", r = e.className, s = e.components, o = e.disallowedElements, a = e.rehypePlugins || ba, l = e.remarkPlugins || ba, u = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...va } : va, c = e.skipHtml, f = e.unwrapDisallowed, d = e.urlTransform || wv, h = pv().use(nb).use(l).use(Xb, u).use(a), m = new ec();
  typeof i == "string" && (m.value = i);
  for (const S of vv)
    Object.hasOwn(e, S.from) && ("" + S.from + (S.to ? "use `" + S.to + "` instead" : "remove it") + xv + S.id, void 0);
  const k = h.parse(m);
  let b = h.runSync(k, m);
  return r && (b = {
    type: "element",
    tagName: "div",
    properties: { className: r },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      b.type === "root" ? b.children : [b]
    )
  }), Ju(b, x), Lg(b, {
    Fragment: g.Fragment,
    // @ts-expect-error
    // React components are allowed to return numbers,
    // but not according to the types in hast-util-to-jsx-runtime
    components: s,
    ignoreInvalidStyle: !0,
    jsx: g.jsx,
    jsxs: g.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function x(S, v, P) {
    if (S.type === "raw" && P && typeof v == "number")
      return c ? P.children.splice(v, 1) : P.children[v] = { type: "text", value: S.value }, v;
    if (S.type === "element") {
      let E;
      for (E in ui)
        if (Object.hasOwn(ui, E) && Object.hasOwn(S.properties, E)) {
          const w = S.properties[E], N = ui[E];
          (N === null || N.includes(S.tagName)) && (S.properties[E] = d(String(w || ""), E, S));
        }
    }
    if (S.type === "element") {
      let E = t ? !t.includes(S.tagName) : o ? o.includes(S.tagName) : !1;
      if (!E && n && typeof v == "number" && (E = !n(S, v, P)), E && P && typeof v == "number")
        return f && S.children ? P.children.splice(v, 1, ...S.children) : P.children.splice(v, 1), v;
    }
  }
}
function wv(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), i = e.indexOf("#"), r = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    r !== -1 && t > r || n !== -1 && t > n || i !== -1 && t > i || // It is a protocol, it should be allowed.
    bv.test(e.slice(0, t)) ? e : ""
  );
}
function kv(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Sv(e, t, n) {
  const r = es({}.ignore || []), s = Tv(t);
  let o = -1;
  for (; ++o < s.length; )
    Zu(e, "text", a);
  function a(u, c) {
    let f = -1, d;
    for (; ++f < c.length; ) {
      const h = c[f], m = d ? d.children : void 0;
      if (r(
        h,
        m ? m.indexOf(h) : void 0,
        d
      ))
        return;
      d = h;
    }
    if (d)
      return l(u, c);
  }
  function l(u, c) {
    const f = c[c.length - 1], d = s[o][0], h = s[o][1];
    let m = 0;
    const b = f.children.indexOf(u);
    let x = !1, S = [];
    d.lastIndex = 0;
    let v = d.exec(u.value);
    for (; v; ) {
      const P = v.index, E = {
        index: v.index,
        input: v.input,
        stack: [...c, u]
      };
      let w = h(...v, E);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? d.lastIndex = P + 1 : (m !== P && S.push({
        type: "text",
        value: u.value.slice(m, P)
      }), Array.isArray(w) ? S.push(...w) : w && S.push(w), m = P + v[0].length, x = !0), !d.global)
        break;
      v = d.exec(u.value);
    }
    return x ? (m < u.value.length && S.push({ type: "text", value: u.value.slice(m) }), f.children.splice(b, 1, ...S)) : S = [u], b + S.length;
  }
}
function Tv(e) {
  const t = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e[0] || Array.isArray(e[0]) ? e : [e];
  let i = -1;
  for (; ++i < n.length; ) {
    const r = n[i];
    t.push([Cv(r[0]), Pv(r[1])]);
  }
  return t;
}
function Cv(e) {
  return typeof e == "string" ? new RegExp(kv(e), "g") : e;
}
function Pv(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
function Ev(e) {
  Sv(e, [/\r?\n|\r/g, Av]);
}
function Av() {
  return { type: "break" };
}
function Ln() {
  return function(e) {
    Ev(e);
  };
}
const Iv = ({
  title: e,
  description: t,
  items: n = [],
  image: i,
  imagePosition: r = "right",
  className: s = "",
  primaryActionLabel: o,
  primaryActionHref: a
}) => /* @__PURE__ */ g.jsx("section", { className: `feature-split-section ${s} image-${r}`, children: /* @__PURE__ */ g.jsxs("div", { className: "feature-split-container", children: [
  /* @__PURE__ */ g.jsxs("div", { className: "feature-split-content", children: [
    /* @__PURE__ */ g.jsx("div", { className: "feature-split-title", children: e }),
    t && /* @__PURE__ */ g.jsx("div", { className: "feature-split-description", children: /* @__PURE__ */ g.jsx(Rn, { remarkPlugins: [Ln], children: t }) }),
    n && n.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "feature-split-list", children: n.map((l, u) => /* @__PURE__ */ g.jsxs("div", { className: "feature-split-item", children: [
      l.icon && /* @__PURE__ */ g.jsx("div", { className: "feature-split-icon-wrapper", children: /* @__PURE__ */ g.jsx(ue, { icon: l.icon, width: "24", height: "24" }) }),
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("h3", { className: "feature-split-item-title", children: l.title }),
        /* @__PURE__ */ g.jsx("div", { className: "feature-split-item-description", children: /* @__PURE__ */ g.jsx(Rn, { remarkPlugins: [Ln], children: l.description }) })
      ] })
    ] }, u)) }),
    o && a && /* @__PURE__ */ g.jsx("div", { className: "feature-split-actions", children: /* @__PURE__ */ g.jsx(
      Ti,
      {
        variant: "primary",
        onClick: () => window.location.href = a,
        children: o
      }
    ) })
  ] }),
  /* @__PURE__ */ g.jsx("div", { className: "feature-split-image-wrapper", children: /* @__PURE__ */ g.jsx("img", { src: i.src, alt: i.alt, className: "feature-split-image" }) })
] }) }), Dv = ({
  title: e,
  subtitle: t,
  content: n,
  image: i,
  className: r = ""
}) => /* @__PURE__ */ g.jsx("section", { className: `content-block-section ${r}`, children: /* @__PURE__ */ g.jsxs("div", { className: "content-block-container", children: [
  /* @__PURE__ */ g.jsxs("div", { className: "content-block-header", children: [
    e && /* @__PURE__ */ g.jsx("div", { className: "content-block-title", children: e }),
    t && /* @__PURE__ */ g.jsx("div", { className: "content-block-subtitle", children: t })
  ] }),
  i && /* @__PURE__ */ g.jsxs("div", { className: "content-block-featured-image", children: [
    /* @__PURE__ */ g.jsx("img", { src: i.src, alt: i.alt }),
    i.caption && /* @__PURE__ */ g.jsx("figcaption", { children: i.caption })
  ] }),
  /* @__PURE__ */ g.jsx("div", { className: "content-block-body markdown-body", children: /* @__PURE__ */ g.jsx(Rn, { remarkPlugins: [Ln], children: n }) })
] }) }), tc = ({
  icon: e,
  title: t,
  description: n,
  url: i,
  featureLinkText: r = "Learn more",
  className: s = ""
}) => /* @__PURE__ */ g.jsx(Oa, { hoverable: !0, elevation: "sm", className: `feature-card ${s}`, children: /* @__PURE__ */ g.jsxs("div", { className: "feature-card-content", children: [
  /* @__PURE__ */ g.jsx("div", { className: "feature-icon-wrapper", children: /* @__PURE__ */ g.jsx(ue, { icon: e, width: "24", height: "24" }) }),
  /* @__PURE__ */ g.jsx("h3", { className: "feature-title", children: t }),
  /* @__PURE__ */ g.jsx("div", { className: "feature-description", children: /* @__PURE__ */ g.jsx(Rn, { remarkPlugins: [Ln], children: n }) }),
  i && (i.startsWith("http") ? /* @__PURE__ */ g.jsxs("a", { href: i, className: "feature-link", target: "_blank", rel: "noopener noreferrer", children: [
    r,
    " ",
    /* @__PURE__ */ g.jsx("span", { children: "→" })
  ] }) : /* @__PURE__ */ g.jsxs(sr, { to: i, className: "feature-link", children: [
    r,
    " ",
    /* @__PURE__ */ g.jsx("span", { children: "→" })
  ] }))
] }) }), jv = ({
  title: e,
  subtitle: t,
  features: n,
  children: i,
  className: r = "",
  columns: s,
  featureLinkText: o = "Learn more"
}) => {
  const a = s ? { "--features-columns": s } : {};
  return /* @__PURE__ */ g.jsx("section", { className: `features-section ${r}`, children: /* @__PURE__ */ g.jsxs("div", { className: "features-container", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "features-header", children: [
      /* @__PURE__ */ g.jsx("div", { className: "features-title", children: e }),
      t && /* @__PURE__ */ g.jsx("div", { className: "features-subtitle", children: t })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "features-grid", style: a, children: [
      i,
      n && n.map((l, u) => /* @__PURE__ */ g.jsx(tc, { ...l, featureLinkText: o }, u))
    ] })
  ] }) });
}, Nv = ({ stats: e, className: t = "" }) => /* @__PURE__ */ g.jsx("section", { className: `stats-section ${t}`, children: /* @__PURE__ */ g.jsx("div", { className: "stats-container", children: /* @__PURE__ */ g.jsx("div", { className: "stats-grid", children: e.map((n, i) => /* @__PURE__ */ g.jsxs("div", { className: "stat-item", children: [
  /* @__PURE__ */ g.jsx("span", { className: "stat-value", children: n.value }),
  /* @__PURE__ */ g.jsx("span", { className: "stat-label", children: n.label }),
  n.description && /* @__PURE__ */ g.jsx("span", { className: "stat-description", children: n.description })
] }, i)) }) }) }), Mv = {
  Header: Sf,
  MenuItem: tg,
  MenuGrid: ng,
  MenuGridItem: ig,
  Dropdown: bu,
  Hero: rg,
  IconButton: og,
  HamburgerMenu: Fa,
  FeatureSplit: Iv,
  ContentBlock: Dv,
  FeaturesSection: jv,
  FeatureItem: tc,
  BentoGrid: wf,
  Stats: Nv
};
let ns = { ...Mv };
function Hv(e, t) {
  ns[e] = t;
}
function Rv(e) {
  return ns[e];
}
function Lv(e) {
  return e in ns;
}
function Vv(e) {
  return typeof e == "string" && e.trim().length > 0;
}
const _t = ({
  config: e,
  className: t,
  handlers: n,
  onError: i
}) => {
  if (Array.isArray(e))
    return /* @__PURE__ */ g.jsx(g.Fragment, { children: e.map((h, m) => /* @__PURE__ */ g.jsx(
      _t,
      {
        config: h,
        className: t,
        handlers: n,
        onError: i
      },
      h.id || `item-${m}`
    )) });
  if (!e || typeof e != "object")
    return null;
  const { type: r, data: s, children: o, id: a, ...l } = e, u = a || s?.id || r;
  if (!Vv(r)) {
    const h = new Error(`Invalid component type: "${r}"`);
    return i?.(h, e), console.error(`Invalid component type: "${r}"`), null;
  }
  if (!Lv(r)) {
    const h = new Error(`Component "${r}" is not registered`);
    return i?.(h, e), console.error(`Component "${r}" is not registered`), null;
  }
  const c = Rv(r);
  if (!c) {
    const h = new Error(`Failed to load component: "${r}"`);
    return i?.(h, e), console.error(`Failed to load component: "${r}"`), null;
  }
  const f = {
    ...s,
    ...l,
    id: a || s?.id
  };
  n && Object.keys(f).forEach((h) => {
    const m = f[h];
    if (typeof m == "string" && m.startsWith("@action:")) {
      const k = m.replace("@action:", "");
      n[k] && (f[h] = n[k]);
    }
  }), t && (f.className = s?.className ? `${s.className} ${t}` : t);
  const d = (h) => {
    if (h) {
      if (Array.isArray(h))
        return h.map((m, k) => m && typeof m == "object" && m.type ? /* @__PURE__ */ g.jsx(
          _t,
          {
            config: m,
            handlers: n,
            onError: i
          },
          m.id || `child-${k}`
        ) : m);
      if (h && typeof h == "object" && h.type) {
        const m = h.id || h.data?.id || h.type;
        return /* @__PURE__ */ g.jsx(_t, { config: h, handlers: n, onError: i }, m);
      }
      return h;
    }
  };
  if (o !== void 0)
    if (r === "Header") {
      const h = d(o);
      if (h && Array.isArray(h)) {
        const m = h.filter(
          (b) => b?.props.config.type !== "IconButton"
        ), k = h.filter(
          (b) => b?.props.config.type === "IconButton"
        );
        f.menuBar = m, f.utilityButtons = k;
      }
    } else if (r === "MenuGrid") {
      const h = d(o);
      h && (f.children = h);
    } else if (r === "Dropdown") {
      const h = d(o);
      f.children = h;
    } else f.children = d(o);
  if (s?.items && Array.isArray(s.items) && (f.items = s.items.map((h, m) => h && typeof h == "object" && h.type ? /* @__PURE__ */ g.jsx(
    _t,
    {
      config: h,
      handlers: n,
      onError: i
    },
    h.id || `item-${m}`
  ) : h)), s?.embeddedView && typeof s.embeddedView == "object" && s.embeddedView.type) {
    const h = s.embeddedView.id || s.embeddedView.data?.id || s.embeddedView.type;
    f.embeddedView = /* @__PURE__ */ g.jsx(
      _t,
      {
        config: s.embeddedView,
        handlers: n,
        onError: i
      },
      h
    );
  }
  try {
    return /* @__PURE__ */ g.jsx(c, { ...f }, u);
  } catch (h) {
    const m = h instanceof Error ? h : new Error("Unknown rendering error");
    return i?.(m, e), console.error(`Error rendering component "${r}":`, h), /* @__PURE__ */ g.jsxs("div", { className: "error-boundary", style: {
      border: "1px solid red",
      padding: "1rem",
      color: "red",
      background: "#fee"
    }, children: [
      "Error rendering ",
      r,
      ": ",
      m.message
    ] }, u);
  }
}, Wv = ({
  title: e,
  description: t,
  primaryActionLabel: n,
  secondaryActionLabel: i,
  onPrimaryClick: r,
  onSecondaryClick: s,
  className: o = "",
  backgroundImage: a
}) => {
  const l = a ? { backgroundImage: `url(${a})`, backgroundSize: "cover", backgroundPosition: "center" } : {};
  return /* @__PURE__ */ g.jsx("section", { className: `cta-section ${o}`, style: l, children: /* @__PURE__ */ g.jsxs("div", { className: "cta-container", children: [
    /* @__PURE__ */ g.jsx("h2", { className: "cta-title", children: e }),
    t && /* @__PURE__ */ g.jsx("p", { className: "cta-description", children: t }),
    (n || i) && /* @__PURE__ */ g.jsxs("div", { className: "cta-actions", children: [
      n && /* @__PURE__ */ g.jsx(
        Ti,
        {
          variant: "secondary",
          size: "lg",
          onClick: r,
          children: n
        }
      ),
      i && /* @__PURE__ */ g.jsx(
        Ti,
        {
          variant: "outline",
          size: "lg",
          onClick: s,
          style: { borderColor: "var(--color-primary)", color: "var(--color-primary)" },
          children: i
        }
      )
    ] })
  ] }) });
}, qv = ({
  logoUrl: e,
  companyName: t,
  description: n,
  columns: i,
  socialLinks: r,
  copyright: s,
  inverted: o = !1,
  className: a = ""
}) => {
  const l = `footer ${o ? "theme-inverted" : ""} ${a}`.trim(), u = () => !e && !t ? null : /* @__PURE__ */ g.jsxs("div", { className: "footer-logo-container flex items-center gap-2 text-xl font-bold", children: [
    e && /* @__PURE__ */ g.jsx("img", { src: e, alt: t || "Logo", className: "footer-logo-img h-8 w-auto" }),
    t && /* @__PURE__ */ g.jsx("span", { className: "footer-company-name", children: t })
  ] });
  return /* @__PURE__ */ g.jsx("footer", { className: l, children: /* @__PURE__ */ g.jsxs("div", { className: "footer-container", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "footer-grid", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "footer-brand", children: [
        /* @__PURE__ */ g.jsx("div", { className: "footer-logo", children: u() }),
        n && /* @__PURE__ */ g.jsx("p", { className: "footer-description", children: n }),
        r && /* @__PURE__ */ g.jsx("div", { className: "footer-social", children: r.map((c, f) => /* @__PURE__ */ g.jsx(
          "a",
          {
            href: c.href,
            className: "footer-social-link",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ g.jsx(ue, { icon: c.icon, width: "24", height: "24" })
          },
          f
        )) })
      ] }),
      i.map((c, f) => /* @__PURE__ */ g.jsxs("div", { className: "footer-column", children: [
        /* @__PURE__ */ g.jsx("h4", { className: "footer-column-title", children: c.title }),
        /* @__PURE__ */ g.jsx("div", { className: "footer-links", children: c.links.map((d, h) => d.href.startsWith("http") ? /* @__PURE__ */ g.jsx("a", { href: d.href, className: "footer-link", target: "_blank", rel: "noopener noreferrer", children: d.label }, h) : /* @__PURE__ */ g.jsx(sr, { to: d.href, className: "footer-link", children: d.label }, h)) })
      ] }, f))
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "footer-bottom", children: [
      /* @__PURE__ */ g.jsx("div", { className: "footer-copyright", children: s || `© ${(/* @__PURE__ */ new Date()).getFullYear()} Company Name. All rights reserved.` }),
      /* @__PURE__ */ g.jsx("div", { className: "footer-legal" })
    ] })
  ] }) });
}, Gv = ({
  title: e,
  subtitle: t,
  items: n,
  className: i = "",
  allowMultiple: r = !1
}) => {
  const [s, o] = Ne(/* @__PURE__ */ new Set()), a = Fe({}), l = (u) => {
    o((c) => {
      const f = new Set(r ? c : []);
      return c.has(u) ? f.delete(u) : f.add(u), f;
    });
  };
  return /* @__PURE__ */ g.jsx("section", { className: `accordion-section ${i}`, children: /* @__PURE__ */ g.jsxs("div", { className: "accordion-container", children: [
    (e || t) && /* @__PURE__ */ g.jsxs("div", { className: "accordion-header-section", children: [
      e && /* @__PURE__ */ g.jsx("h2", { className: "accordion-title", children: e }),
      t && /* @__PURE__ */ g.jsx("p", { className: "accordion-subtitle", children: t })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "accordion-list", children: n.map((u) => {
      const c = s.has(u.id);
      return /* @__PURE__ */ g.jsxs("div", { className: `accordion-item ${c ? "open" : ""}`, children: [
        /* @__PURE__ */ g.jsxs(
          "button",
          {
            className: "accordion-trigger",
            onClick: () => l(u.id),
            "aria-expanded": c,
            "aria-controls": `content-${u.id}`,
            children: [
              /* @__PURE__ */ g.jsx("span", { className: "accordion-item-title", children: u.title }),
              /* @__PURE__ */ g.jsx(
                ue,
                {
                  icon: "mdi:chevron-down",
                  width: "24",
                  height: "24",
                  className: `accordion-icon ${c ? "rotate" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ g.jsx(
          "div",
          {
            id: `content-${u.id}`,
            className: "accordion-content",
            style: {
              height: c ? a.current[u.id]?.scrollHeight : 0
            },
            children: /* @__PURE__ */ g.jsx(
              "div",
              {
                ref: (f) => {
                  a.current[u.id] = f;
                },
                className: "accordion-content-inner",
                children: u.content
              }
            )
          }
        )
      ] }, u.id);
    }) })
  ] }) });
}, Kv = ({
  title: e,
  subtitle: t,
  testimonials: n,
  className: i = ""
}) => /* @__PURE__ */ g.jsx("section", { className: `testimonials-section ${i}`, children: /* @__PURE__ */ g.jsxs("div", { className: "testimonials-container", children: [
  /* @__PURE__ */ g.jsxs("div", { className: "testimonials-header", children: [
    /* @__PURE__ */ g.jsx("h2", { className: "testimonials-title", children: e }),
    t && /* @__PURE__ */ g.jsx("p", { className: "testimonials-subtitle", children: t })
  ] }),
  /* @__PURE__ */ g.jsx("div", { className: "testimonials-grid", children: n.map((r) => /* @__PURE__ */ g.jsx(Oa, { elevation: "sm", className: "testimonial-card", children: /* @__PURE__ */ g.jsxs("div", { className: "testimonial-card-content", children: [
    /* @__PURE__ */ g.jsx("div", { className: "testimonial-stars", children: [...Array(r.rating || 5)].map((s, o) => /* @__PURE__ */ g.jsx(ue, { icon: "mdi:star", width: "20", height: "20" }, o)) }),
    /* @__PURE__ */ g.jsxs("blockquote", { className: "testimonial-quote", children: [
      '"',
      r.quote,
      '"'
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "testimonial-author", children: [
      r.avatar ? /* @__PURE__ */ g.jsx(
        "img",
        {
          src: r.avatar,
          alt: r.name,
          className: "testimonial-avatar"
        }
      ) : /* @__PURE__ */ g.jsx("div", { className: "testimonial-avatar-placeholder", children: r.name.charAt(0) }),
      /* @__PURE__ */ g.jsxs("div", { className: "testimonial-author-info", children: [
        /* @__PURE__ */ g.jsx("span", { className: "testimonial-name", children: r.name }),
        /* @__PURE__ */ g.jsxs("span", { className: "testimonial-role", children: [
          r.role,
          " ",
          r.company && `at ${r.company}`
        ] })
      ] })
    ] })
  ] }) }, r.id)) })
] }) });
let Ov;
function Fv({
  endpoint: e,
  storyName: t = "Default",
  params: n = {},
  autoFetch: i = !0,
  apiService: r
  // Allow custom API service per hook instance
}) {
  const [s, o] = Ne(null), [a, l] = Ne(i), [u, c] = Ne(null), f = r || Ov, d = async (h, m) => {
    if (!f) {
      c("API service not configured"), l(!1);
      return;
    }
    const k = h || t;
    l(!0), c(null);
    try {
      const b = new URLSearchParams({
        story: k,
        ...n,
        ...m
      }).toString(), x = b ? `${e}?${b}` : e, S = await f.get(x);
      S.status === 200 ? o(S.data) : c(`Error ${S.status}: ${S.statusText}`);
    } catch (b) {
      console.error(`Failed to fetch from ${e}:`, b), c(b.message || "Failed to fetch configuration");
    } finally {
      l(!1);
    }
  };
  return Me(() => {
    i && f ? d() : i && !f && (c("API service not configured"), l(!1));
  }, [e, t, JSON.stringify(n), i, f]), {
    data: s,
    loading: a,
    error: u,
    refetch: d,
    setData: o
  };
}
const Bv = {
  MenuGridItem: "/menu-grid-item",
  MenuGrid: "/menu-grid",
  Dropdown: "/dropdown",
  Header: "/header",
  HamburgerMenu: "/hamburger-menu",
  Hero: "/hero",
  Card: "/card",
  ItemsAccordion: "/items-accordion",
  Footer: "/footer",
  Stats: "/stats",
  FeatureSplit: "/feature-split",
  ContentBlock: "/content-block",
  FeaturesSection: "/features-section",
  BentoGrid: "/bento-grid"
};
function Se(e) {
  const { component: t, story: n = "Default", variant: i, apiService: r } = e, s = Bv[t], o = {};
  return i && (o.variant = i), Fv({
    endpoint: s,
    storyName: n,
    params: o,
    apiService: r
  });
}
function Yv(e, t, n) {
  return Se({ component: "MenuGridItem", story: e, apiService: t, variant: n });
}
function Xv(e, t, n) {
  return Se({ component: "MenuGrid", story: e, apiService: t, variant: n });
}
function Qv(e, t, n) {
  return Se({ component: "Dropdown", story: e, apiService: t, variant: n });
}
function Zv(e, t, n) {
  return Se({ component: "HamburgerMenu", story: e, apiService: t, variant: n });
}
function Jv(e, t, n) {
  return Se({ component: "Hero", story: e, apiService: t, variant: n });
}
function ew(e, t, n) {
  return Se({ component: "Header", story: e, apiService: t, variant: n });
}
function tw(e, t, n) {
  return Se({ component: "ItemsAccordion", story: e, apiService: t, variant: n });
}
function nw(e, t, n) {
  return Se({ component: "Footer", story: e, apiService: t, variant: n });
}
function iw(e, t, n) {
  return Se({ component: "Stats", story: e, apiService: t, variant: n });
}
function rw(e, t, n) {
  return Se({ component: "FeatureSplit", story: e, apiService: t, variant: n });
}
function sw(e, t, n) {
  return Se({ component: "ContentBlock", story: e, apiService: t, variant: n });
}
function ow(e, t, n) {
  return Se({ component: "FeaturesSection", story: e, apiService: t, variant: n });
}
function aw(e, t, n) {
  return Se({ component: "BentoGrid", story: e, apiService: t, variant: n });
}
export {
  wf as BentoGrid,
  Ti as Button,
  Wv as CTASection,
  Oa as Card,
  Dv as ContentBlock,
  bu as Dropdown,
  Uv as DropdownProvider,
  _t as DynamicRenderer,
  tc as FeatureItem,
  Iv as FeatureSplit,
  jv as FeaturesSection,
  qv as Footer,
  Fa as HamburgerMenu,
  Sf as Header,
  rg as Hero,
  og as IconButton,
  Gv as ItemsAccordion,
  ng as MenuGrid,
  ig as MenuGridItem,
  tg as MenuItem,
  Nv as Stats,
  Kv as Testimonials,
  Mv as baseComponents,
  Rv as getComponent,
  Hv as registerComponent,
  aw as useBentoGridConfig,
  sw as useContentBlockConfig,
  Qv as useDropdownConfig,
  rw as useFeatureSplitConfig,
  ow as useFeaturesSectionConfig,
  nw as useFooterConfig,
  Zv as useHamburgerMenuConfig,
  ew as useHeaderConfig,
  Jv as useHeroConfig,
  tw as useItemsAccordionConfig,
  Xv as useMenuGridConfig,
  Yv as useMenuGridItemConfig,
  iw as useStatsConfig
};
//# sourceMappingURL=index.es.js.map
