import Rt, { app as bn, BrowserWindow as il } from "electron";
import { fileURLToPath as Af } from "node:url";
import lt from "node:path";
import mt from "fs";
import Sf from "constants";
import Ur from "stream";
import fo from "util";
import ol from "assert";
import re from "path";
import Mn from "child_process";
import al from "events";
import kr from "crypto";
import sl from "tty";
import Bn from "os";
import tr from "url";
import Tf from "string_decoder";
import ll from "zlib";
import Cf from "http";
var Ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, jn = {}, Nt = {}, Ce = {};
Ce.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ce.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var nt = Sf, bf = process.cwd, An = null, $f = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return An || (An = bf.call(process)), An;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var la = process.chdir;
  process.chdir = function(e) {
    An = null, la.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, la);
}
var Of = If;
function If(e) {
  nt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, f, h, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), $f === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function f(h, g, _) {
      var y = Date.now(), A = 0;
      c(h, g, function T(S) {
        if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(g, function(D, x) {
              D && D.code === "ENOENT" ? c(h, g, T) : _(S);
            });
          }, A), A < 100 && (A += 10);
          return;
        }
        _ && _(S);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function f(h, g, _, y, A, T) {
      var S;
      if (T && typeof T == "function") {
        var D = 0;
        S = function(x, Q, oe) {
          if (x && x.code === "EAGAIN" && D < 10)
            return D++, c.call(e, h, g, _, y, A, S);
          T.apply(this, arguments);
        };
      }
      return c.call(e, h, g, _, y, A, S);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(f, h, g, _, y) {
      for (var A = 0; ; )
        try {
          return c.call(e, f, h, g, _, y);
        } catch (T) {
          if (T.code === "EAGAIN" && A < 10) {
            A++;
            continue;
          }
          throw T;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(f, h, g) {
      c.open(
        f,
        nt.O_WRONLY | nt.O_SYMLINK,
        h,
        function(_, y) {
          if (_) {
            g && g(_);
            return;
          }
          c.fchmod(y, h, function(A) {
            c.close(y, function(T) {
              g && g(A || T);
            });
          });
        }
      );
    }, c.lchmodSync = function(f, h) {
      var g = c.openSync(f, nt.O_WRONLY | nt.O_SYMLINK, h), _ = !0, y;
      try {
        y = c.fchmodSync(g, h), _ = !1;
      } finally {
        if (_)
          try {
            c.closeSync(g);
          } catch {
          }
        else
          c.closeSync(g);
      }
      return y;
    };
  }
  function r(c) {
    nt.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(f, h, g, _) {
      c.open(f, nt.O_SYMLINK, function(y, A) {
        if (y) {
          _ && _(y);
          return;
        }
        c.futimes(A, h, g, function(T) {
          c.close(A, function(S) {
            _ && _(T || S);
          });
        });
      });
    }, c.lutimesSync = function(f, h, g) {
      var _ = c.openSync(f, nt.O_SYMLINK), y, A = !0;
      try {
        y = c.futimesSync(_, h, g), A = !1;
      } finally {
        if (A)
          try {
            c.closeSync(_);
          } catch {
          }
        else
          c.closeSync(_);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(f, h, g, _) {
      _ && process.nextTick(_);
    }, c.lutimesSync = function() {
    });
  }
  function n(c) {
    return c && function(f, h, g) {
      return c.call(e, f, h, function(_) {
        m(_) && (_ = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(f, h) {
      try {
        return c.call(e, f, h);
      } catch (g) {
        if (!m(g)) throw g;
      }
    };
  }
  function o(c) {
    return c && function(f, h, g, _) {
      return c.call(e, f, h, g, function(y) {
        m(y) && (y = null), _ && _.apply(this, arguments);
      });
    };
  }
  function a(c) {
    return c && function(f, h, g) {
      try {
        return c.call(e, f, h, g);
      } catch (_) {
        if (!m(_)) throw _;
      }
    };
  }
  function s(c) {
    return c && function(f, h, g) {
      typeof h == "function" && (g = h, h = null);
      function _(y, A) {
        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return h ? c.call(e, f, h, _) : c.call(e, f, _);
    };
  }
  function l(c) {
    return c && function(f, h) {
      var g = h ? c.call(e, f, h) : c.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function m(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var ca = Ur.Stream, Rf = Pf;
function Pf(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    ca.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var m = a[s];
      this[m] = i[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, f) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    ca.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Nf = Ff, Df = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Ff(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Df(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var te = mt, xf = Of, Lf = Rf, Uf = Nf, an = fo, me, $n;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (me = Symbol.for("graceful-fs.queue"), $n = Symbol.for("graceful-fs.previous")) : (me = "___graceful-fs.queue", $n = "___graceful-fs.previous");
function kf() {
}
function cl(e, t) {
  Object.defineProperty(e, me, {
    get: function() {
      return t;
    }
  });
}
var Ot = kf;
an.debuglog ? Ot = an.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Ot = function() {
  var e = an.format.apply(an, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!te[me]) {
  var Mf = Ae[me] || [];
  cl(te, Mf), te.close = function(e) {
    function t(r, n) {
      return e.call(te, r, function(i) {
        i || ua(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, $n, {
      value: e
    }), t;
  }(te.close), te.closeSync = function(e) {
    function t(r) {
      e.apply(te, arguments), ua();
    }
    return Object.defineProperty(t, $n, {
      value: e
    }), t;
  }(te.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Ot(te[me]), ol.equal(te[me].length, 0);
  });
}
Ae[me] || cl(Ae, te[me]);
var be = ho(Uf(te));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !te.__patched && (be = ho(te), te.__patched = !0);
function ho(e) {
  xf(e), e.gracefulify = ho, e.createReadStream = Q, e.createWriteStream = oe;
  var t = e.readFile;
  e.readFile = r;
  function r(E, q, B) {
    return typeof q == "function" && (B = q, q = null), M(E, q, B);
    function M(z, I, $, P) {
      return t(z, I, function(b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE") ? Lt([M, [z, I, $], b, P || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), z(E, q, B, M);
    function z(I, $, P, b, N) {
      return n(I, $, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Lt([z, [I, $, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), z(E, q, B, M);
    function z(I, $, P, b, N) {
      return o(I, $, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Lt([z, [I, $, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, q, B, M) {
    return typeof B == "function" && (M = B, B = 0), z(E, q, B, M);
    function z(I, $, P, b, N) {
      return s(I, $, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Lt([z, [I, $, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = f;
  var c = /^v[0-5]\./;
  function f(E, q, B) {
    typeof q == "function" && (B = q, q = null);
    var M = c.test(process.version) ? function($, P, b, N) {
      return m($, z(
        $,
        P,
        b,
        N
      ));
    } : function($, P, b, N) {
      return m($, P, z(
        $,
        P,
        b,
        N
      ));
    };
    return M(E, q, B);
    function z(I, $, P, b) {
      return function(N, R) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Lt([
          M,
          [I, $, P],
          N,
          b || Date.now(),
          Date.now()
        ]) : (R && R.sort && R.sort(), typeof P == "function" && P.call(this, N, R));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = Lf(e);
    T = h.ReadStream, D = h.WriteStream;
  }
  var g = e.ReadStream;
  g && (T.prototype = Object.create(g.prototype), T.prototype.open = S);
  var _ = e.WriteStream;
  _ && (D.prototype = Object.create(_.prototype), D.prototype.open = x), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return T;
    },
    set: function(E) {
      T = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return D;
    },
    set: function(E) {
      D = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = T;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(E) {
      y = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = D;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return A;
    },
    set: function(E) {
      A = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function T(E, q) {
    return this instanceof T ? (g.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function S() {
    var E = this;
    Ne(E.path, E.flags, E.mode, function(q, B) {
      q ? (E.autoClose && E.destroy(), E.emit("error", q)) : (E.fd = B, E.emit("open", B), E.read());
    });
  }
  function D(E, q) {
    return this instanceof D ? (_.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
  }
  function x() {
    var E = this;
    Ne(E.path, E.flags, E.mode, function(q, B) {
      q ? (E.destroy(), E.emit("error", q)) : (E.fd = B, E.emit("open", B));
    });
  }
  function Q(E, q) {
    return new e.ReadStream(E, q);
  }
  function oe(E, q) {
    return new e.WriteStream(E, q);
  }
  var W = e.open;
  e.open = Ne;
  function Ne(E, q, B, M) {
    return typeof B == "function" && (M = B, B = null), z(E, q, B, M);
    function z(I, $, P, b, N) {
      return W(I, $, P, function(R, k) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Lt([z, [I, $, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  return e;
}
function Lt(e) {
  Ot("ENQUEUE", e[0].name, e[1]), te[me].push(e), po();
}
var sn;
function ua() {
  for (var e = Date.now(), t = 0; t < te[me].length; ++t)
    te[me][t].length > 2 && (te[me][t][3] = e, te[me][t][4] = e);
  po();
}
function po() {
  if (clearTimeout(sn), sn = void 0, te[me].length !== 0) {
    var e = te[me].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Ot("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Ot("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), m = Math.min(l * 1.2, 100);
      s >= m ? (Ot("RETRY", t.name, r), t.apply(null, r.concat([i]))) : te[me].push(e);
    }
    sn === void 0 && (sn = setTimeout(po, 0));
  }
}
(function(e) {
  const t = Ce.fromCallback, r = be, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, m) {
    return typeof m == "function" ? r.read(i, o, a, s, l, m) : new Promise((c, f) => {
      r.read(i, o, a, s, l, (h, g, _) => {
        if (h) return f(h);
        c({ bytesRead: g, buffer: _ });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (m, c, f) => {
        if (m) return l(m);
        s({ bytesWritten: c, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Nt);
var mo = {}, ul = {};
const Bf = re;
ul.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Bf.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const fl = Nt, { checkPath: dl } = ul, hl = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
mo.makeDir = async (e, t) => (dl(e), fl.mkdir(e, {
  mode: hl(t),
  recursive: !0
}));
mo.makeDirSync = (e, t) => (dl(e), fl.mkdirSync(e, {
  mode: hl(t),
  recursive: !0
}));
const jf = Ce.fromPromise, { makeDir: Hf, makeDirSync: yi } = mo, vi = jf(Hf);
var Ye = {
  mkdirs: vi,
  mkdirsSync: yi,
  // alias
  mkdirp: vi,
  mkdirpSync: yi,
  ensureDir: vi,
  ensureDirSync: yi
};
const qf = Ce.fromPromise, pl = Nt;
function Gf(e) {
  return pl.access(e).then(() => !0).catch(() => !1);
}
var Dt = {
  pathExists: qf(Gf),
  pathExistsSync: pl.existsSync
};
const Xt = be;
function Vf(e, t, r, n) {
  Xt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Xt.futimes(o, t, r, (a) => {
      Xt.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function Wf(e, t, r) {
  const n = Xt.openSync(e, "r+");
  return Xt.futimesSync(n, t, r), Xt.closeSync(n);
}
var ml = {
  utimesMillis: Vf,
  utimesMillisSync: Wf
};
const Jt = Nt, fe = re, Yf = fo;
function zf(e, t, r) {
  const n = r.dereference ? (i) => Jt.stat(i, { bigint: !0 }) : (i) => Jt.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Xf(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Jt.statSync(a, { bigint: !0 }) : (a) => Jt.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function Kf(e, t, r, n, i) {
  Yf.callbackify(zf)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Mr(s, l)) {
        const m = fe.basename(e), c = fe.basename(t);
        return r === "move" && m !== c && m.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && go(e, t) ? i(new Error(Hn(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function Jf(e, t, r, n) {
  const { srcStat: i, destStat: o } = Xf(e, t, n);
  if (o) {
    if (Mr(i, o)) {
      const a = fe.basename(e), s = fe.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && go(e, t))
    throw new Error(Hn(e, t, r));
  return { srcStat: i, destStat: o };
}
function gl(e, t, r, n, i) {
  const o = fe.resolve(fe.dirname(e)), a = fe.resolve(fe.dirname(r));
  if (a === o || a === fe.parse(a).root) return i();
  Jt.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Mr(t, l) ? i(new Error(Hn(e, r, n))) : gl(e, t, a, n, i));
}
function El(e, t, r, n) {
  const i = fe.resolve(fe.dirname(e)), o = fe.resolve(fe.dirname(r));
  if (o === i || o === fe.parse(o).root) return;
  let a;
  try {
    a = Jt.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Mr(t, a))
    throw new Error(Hn(e, r, n));
  return El(e, t, o, n);
}
function Mr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function go(e, t) {
  const r = fe.resolve(e).split(fe.sep).filter((i) => i), n = fe.resolve(t).split(fe.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Hn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var rr = {
  checkPaths: Kf,
  checkPathsSync: Jf,
  checkParentPaths: gl,
  checkParentPathsSync: El,
  isSrcSubdir: go,
  areIdentical: Mr
};
const Re = be, Ar = re, Qf = Ye.mkdirs, Zf = Dt.pathExists, ed = ml.utimesMillis, Sr = rr;
function td(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Sr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Sr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? yl(fa, s, e, t, r, n) : fa(s, e, t, r, n));
  });
}
function fa(e, t, r, n, i) {
  const o = Ar.dirname(r);
  Zf(o, (a, s) => {
    if (a) return i(a);
    if (s) return On(e, t, r, n, i);
    Qf(o, (l) => l ? i(l) : On(e, t, r, n, i));
  });
}
function yl(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function rd(e, t, r, n, i) {
  return n.filter ? yl(On, e, t, r, n, i) : On(e, t, r, n, i);
}
function On(e, t, r, n, i) {
  (n.dereference ? Re.stat : Re.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? cd(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? nd(s, e, t, r, n, i) : s.isSymbolicLink() ? dd(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function nd(e, t, r, n, i, o) {
  return t ? id(e, r, n, i, o) : vl(e, r, n, i, o);
}
function id(e, t, r, n, i) {
  if (n.overwrite)
    Re.unlink(r, (o) => o ? i(o) : vl(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function vl(e, t, r, n, i) {
  Re.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? od(e.mode, t, r, i) : qn(r, e.mode, i));
}
function od(e, t, r, n) {
  return ad(e) ? sd(r, e, (i) => i ? n(i) : da(e, t, r, n)) : da(e, t, r, n);
}
function ad(e) {
  return (e & 128) === 0;
}
function sd(e, t, r) {
  return qn(e, t | 128, r);
}
function da(e, t, r, n) {
  ld(t, r, (i) => i ? n(i) : qn(r, e, n));
}
function qn(e, t, r) {
  return Re.chmod(e, t, r);
}
function ld(e, t, r) {
  Re.stat(e, (n, i) => n ? r(n) : ed(t, i.atime, i.mtime, r));
}
function cd(e, t, r, n, i, o) {
  return t ? wl(r, n, i, o) : ud(e.mode, r, n, i, o);
}
function ud(e, t, r, n, i) {
  Re.mkdir(r, (o) => {
    if (o) return i(o);
    wl(t, r, n, (a) => a ? i(a) : qn(r, e, i));
  });
}
function wl(e, t, r, n) {
  Re.readdir(e, (i, o) => i ? n(i) : _l(o, e, t, r, n));
}
function _l(e, t, r, n, i) {
  const o = e.pop();
  return o ? fd(e, o, t, r, n, i) : i();
}
function fd(e, t, r, n, i, o) {
  const a = Ar.join(r, t), s = Ar.join(n, t);
  Sr.checkPaths(a, s, "copy", i, (l, m) => {
    if (l) return o(l);
    const { destStat: c } = m;
    rd(c, a, s, i, (f) => f ? o(f) : _l(e, r, n, i, o));
  });
}
function dd(e, t, r, n, i) {
  Re.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Ar.resolve(process.cwd(), a)), e)
      Re.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Re.symlink(a, r, i) : i(s) : (n.dereference && (l = Ar.resolve(process.cwd(), l)), Sr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Sr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : hd(a, r, i)));
    else
      return Re.symlink(a, r, i);
  });
}
function hd(e, t, r) {
  Re.unlink(t, (n) => n ? r(n) : Re.symlink(e, t, r));
}
var pd = td;
const ve = be, Tr = re, md = Ye.mkdirsSync, gd = ml.utimesMillisSync, Cr = rr;
function Ed(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Cr.checkPathsSync(e, t, "copy", r);
  return Cr.checkParentPathsSync(e, n, t, "copy"), yd(i, e, t, r);
}
function yd(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Tr.dirname(r);
  return ve.existsSync(i) || md(i), Al(e, t, r, n);
}
function vd(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Al(e, t, r, n);
}
function Al(e, t, r, n) {
  const o = (n.dereference ? ve.statSync : ve.lstatSync)(t);
  if (o.isDirectory()) return bd(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return wd(o, e, t, r, n);
  if (o.isSymbolicLink()) return Id(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function wd(e, t, r, n, i) {
  return t ? _d(e, r, n, i) : Sl(e, r, n, i);
}
function _d(e, t, r, n) {
  if (n.overwrite)
    return ve.unlinkSync(r), Sl(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Sl(e, t, r, n) {
  return ve.copyFileSync(t, r), n.preserveTimestamps && Ad(e.mode, t, r), Eo(r, e.mode);
}
function Ad(e, t, r) {
  return Sd(e) && Td(r, e), Cd(t, r);
}
function Sd(e) {
  return (e & 128) === 0;
}
function Td(e, t) {
  return Eo(e, t | 128);
}
function Eo(e, t) {
  return ve.chmodSync(e, t);
}
function Cd(e, t) {
  const r = ve.statSync(e);
  return gd(t, r.atime, r.mtime);
}
function bd(e, t, r, n, i) {
  return t ? Tl(r, n, i) : $d(e.mode, r, n, i);
}
function $d(e, t, r, n) {
  return ve.mkdirSync(r), Tl(t, r, n), Eo(r, e);
}
function Tl(e, t, r) {
  ve.readdirSync(e).forEach((n) => Od(n, e, t, r));
}
function Od(e, t, r, n) {
  const i = Tr.join(t, e), o = Tr.join(r, e), { destStat: a } = Cr.checkPathsSync(i, o, "copy", n);
  return vd(a, i, o, n);
}
function Id(e, t, r, n) {
  let i = ve.readlinkSync(t);
  if (n.dereference && (i = Tr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = ve.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return ve.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Tr.resolve(process.cwd(), o)), Cr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (ve.statSync(r).isDirectory() && Cr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Rd(i, r);
  } else
    return ve.symlinkSync(i, r);
}
function Rd(e, t) {
  return ve.unlinkSync(t), ve.symlinkSync(e, t);
}
var Pd = Ed;
const Nd = Ce.fromCallback;
var yo = {
  copy: Nd(pd),
  copySync: Pd
};
const ha = be, Cl = re, K = ol, br = process.platform === "win32";
function bl(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || ha[r], r = r + "Sync", e[r] = e[r] || ha[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function vo(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), K(e, "rimraf: missing path"), K.strictEqual(typeof e, "string", "rimraf: path should be a string"), K.strictEqual(typeof r, "function", "rimraf: callback function required"), K(t, "rimraf: invalid options argument provided"), K.strictEqual(typeof t, "object", "rimraf: options should be object"), bl(t), pa(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => pa(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function pa(e, t, r) {
  K(e), K(t), K(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && br)
      return ma(e, t, n, r);
    if (i && i.isDirectory())
      return Sn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return br ? ma(e, t, o, r) : Sn(e, t, o, r);
        if (o.code === "EISDIR")
          return Sn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function ma(e, t, r, n) {
  K(e), K(t), K(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? Sn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function ga(e, t, r) {
  let n;
  K(e), K(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Tn(e, t, r) : t.unlinkSync(e);
}
function Sn(e, t, r, n) {
  K(e), K(t), K(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Dd(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function Dd(e, t, r) {
  K(e), K(t), K(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      vo(Cl.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function $l(e, t) {
  let r;
  t = t || {}, bl(t), K(e, "rimraf: missing path"), K.strictEqual(typeof e, "string", "rimraf: path should be a string"), K(t, "rimraf: missing options"), K.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && br && ga(e, t, n);
  }
  try {
    r && r.isDirectory() ? Tn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return br ? ga(e, t, n) : Tn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Tn(e, t, n);
  }
}
function Tn(e, t, r) {
  K(e), K(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      Fd(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function Fd(e, t) {
  if (K(e), K(t), t.readdirSync(e).forEach((r) => $l(Cl.join(e, r), t)), br) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var xd = vo;
vo.sync = $l;
const In = be, Ld = Ce.fromCallback, Ol = xd;
function Ud(e, t) {
  if (In.rm) return In.rm(e, { recursive: !0, force: !0 }, t);
  Ol(e, t);
}
function kd(e) {
  if (In.rmSync) return In.rmSync(e, { recursive: !0, force: !0 });
  Ol.sync(e);
}
var Gn = {
  remove: Ld(Ud),
  removeSync: kd
};
const Md = Ce.fromPromise, Il = Nt, Rl = re, Pl = Ye, Nl = Gn, Ea = Md(async function(t) {
  let r;
  try {
    r = await Il.readdir(t);
  } catch {
    return Pl.mkdirs(t);
  }
  return Promise.all(r.map((n) => Nl.remove(Rl.join(t, n))));
});
function ya(e) {
  let t;
  try {
    t = Il.readdirSync(e);
  } catch {
    return Pl.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Rl.join(e, r), Nl.removeSync(r);
  });
}
var Bd = {
  emptyDirSync: ya,
  emptydirSync: ya,
  emptyDir: Ea,
  emptydir: Ea
};
const jd = Ce.fromCallback, Dl = re, at = be, Fl = Ye;
function Hd(e, t) {
  function r() {
    at.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  at.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Dl.dirname(e);
    at.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? Fl.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : at.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function qd(e) {
  let t;
  try {
    t = at.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Dl.dirname(e);
  try {
    at.statSync(r).isDirectory() || at.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Fl.mkdirsSync(r);
    else throw n;
  }
  at.writeFileSync(e, "");
}
var Gd = {
  createFile: jd(Hd),
  createFileSync: qd
};
const Vd = Ce.fromCallback, xl = re, ot = be, Ll = Ye, Wd = Dt.pathExists, { areIdentical: Ul } = rr;
function Yd(e, t, r) {
  function n(i, o) {
    ot.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  ot.lstat(t, (i, o) => {
    ot.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Ul(s, o)) return r(null);
      const l = xl.dirname(t);
      Wd(l, (m, c) => {
        if (m) return r(m);
        if (c) return n(e, t);
        Ll.mkdirs(l, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function zd(e, t) {
  let r;
  try {
    r = ot.lstatSync(t);
  } catch {
  }
  try {
    const o = ot.lstatSync(e);
    if (r && Ul(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = xl.dirname(t);
  return ot.existsSync(n) || Ll.mkdirsSync(n), ot.linkSync(e, t);
}
var Xd = {
  createLink: Vd(Yd),
  createLinkSync: zd
};
const st = re, yr = be, Kd = Dt.pathExists;
function Jd(e, t, r) {
  if (st.isAbsolute(e))
    return yr.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = st.dirname(t), i = st.join(n, e);
    return Kd(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : yr.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: st.relative(n, e)
    })));
  }
}
function Qd(e, t) {
  let r;
  if (st.isAbsolute(e)) {
    if (r = yr.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = st.dirname(t), i = st.join(n, e);
    if (r = yr.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = yr.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: st.relative(n, e)
    };
  }
}
var Zd = {
  symlinkPaths: Jd,
  symlinkPathsSync: Qd
};
const kl = be;
function eh(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  kl.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function th(e, t) {
  let r;
  if (t) return t;
  try {
    r = kl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var rh = {
  symlinkType: eh,
  symlinkTypeSync: th
};
const nh = Ce.fromCallback, Ml = re, Me = Nt, Bl = Ye, ih = Bl.mkdirs, oh = Bl.mkdirsSync, jl = Zd, ah = jl.symlinkPaths, sh = jl.symlinkPathsSync, Hl = rh, lh = Hl.symlinkType, ch = Hl.symlinkTypeSync, uh = Dt.pathExists, { areIdentical: ql } = rr;
function fh(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Me.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Me.stat(e),
      Me.stat(t)
    ]).then(([a, s]) => {
      if (ql(a, s)) return n(null);
      va(e, t, r, n);
    }) : va(e, t, r, n);
  });
}
function va(e, t, r, n) {
  ah(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, lh(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = Ml.dirname(t);
      uh(l, (m, c) => {
        if (m) return n(m);
        if (c) return Me.symlink(e, t, s, n);
        ih(l, (f) => {
          if (f) return n(f);
          Me.symlink(e, t, s, n);
        });
      });
    });
  });
}
function dh(e, t, r) {
  let n;
  try {
    n = Me.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Me.statSync(e), l = Me.statSync(t);
    if (ql(s, l)) return;
  }
  const i = sh(e, t);
  e = i.toDst, r = ch(i.toCwd, r);
  const o = Ml.dirname(t);
  return Me.existsSync(o) || oh(o), Me.symlinkSync(e, t, r);
}
var hh = {
  createSymlink: nh(fh),
  createSymlinkSync: dh
};
const { createFile: wa, createFileSync: _a } = Gd, { createLink: Aa, createLinkSync: Sa } = Xd, { createSymlink: Ta, createSymlinkSync: Ca } = hh;
var ph = {
  // file
  createFile: wa,
  createFileSync: _a,
  ensureFile: wa,
  ensureFileSync: _a,
  // link
  createLink: Aa,
  createLinkSync: Sa,
  ensureLink: Aa,
  ensureLinkSync: Sa,
  // symlink
  createSymlink: Ta,
  createSymlinkSync: Ca,
  ensureSymlink: Ta,
  ensureSymlinkSync: Ca
};
function mh(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function gh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var wo = { stringify: mh, stripBom: gh };
let Qt;
try {
  Qt = be;
} catch {
  Qt = mt;
}
const Vn = Ce, { stringify: Gl, stripBom: Vl } = wo;
async function Eh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Qt, n = "throws" in t ? t.throws : !0;
  let i = await Vn.fromCallback(r.readFile)(e, t);
  i = Vl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const yh = Vn.fromPromise(Eh);
function vh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Qt, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Vl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function wh(e, t, r = {}) {
  const n = r.fs || Qt, i = Gl(t, r);
  await Vn.fromCallback(n.writeFile)(e, i, r);
}
const _h = Vn.fromPromise(wh);
function Ah(e, t, r = {}) {
  const n = r.fs || Qt, i = Gl(t, r);
  return n.writeFileSync(e, i, r);
}
const Sh = {
  readFile: yh,
  readFileSync: vh,
  writeFile: _h,
  writeFileSync: Ah
};
var Th = Sh;
const ln = Th;
var Ch = {
  // jsonfile exports
  readJson: ln.readFile,
  readJsonSync: ln.readFileSync,
  writeJson: ln.writeFile,
  writeJsonSync: ln.writeFileSync
};
const bh = Ce.fromCallback, vr = be, Wl = re, Yl = Ye, $h = Dt.pathExists;
function Oh(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Wl.dirname(e);
  $h(i, (o, a) => {
    if (o) return n(o);
    if (a) return vr.writeFile(e, t, r, n);
    Yl.mkdirs(i, (s) => {
      if (s) return n(s);
      vr.writeFile(e, t, r, n);
    });
  });
}
function Ih(e, ...t) {
  const r = Wl.dirname(e);
  if (vr.existsSync(r))
    return vr.writeFileSync(e, ...t);
  Yl.mkdirsSync(r), vr.writeFileSync(e, ...t);
}
var _o = {
  outputFile: bh(Oh),
  outputFileSync: Ih
};
const { stringify: Rh } = wo, { outputFile: Ph } = _o;
async function Nh(e, t, r = {}) {
  const n = Rh(t, r);
  await Ph(e, n, r);
}
var Dh = Nh;
const { stringify: Fh } = wo, { outputFileSync: xh } = _o;
function Lh(e, t, r) {
  const n = Fh(t, r);
  xh(e, n, r);
}
var Uh = Lh;
const kh = Ce.fromPromise, Te = Ch;
Te.outputJson = kh(Dh);
Te.outputJsonSync = Uh;
Te.outputJSON = Te.outputJson;
Te.outputJSONSync = Te.outputJsonSync;
Te.writeJSON = Te.writeJson;
Te.writeJSONSync = Te.writeJsonSync;
Te.readJSON = Te.readJson;
Te.readJSONSync = Te.readJsonSync;
var Mh = Te;
const Bh = be, zi = re, jh = yo.copy, zl = Gn.remove, Hh = Ye.mkdirp, qh = Dt.pathExists, ba = rr;
function Gh(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  ba.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    ba.checkParentPaths(e, s, t, "move", (m) => {
      if (m) return n(m);
      if (Vh(t)) return $a(e, t, i, l, n);
      Hh(zi.dirname(t), (c) => c ? n(c) : $a(e, t, i, l, n));
    });
  });
}
function Vh(e) {
  const t = zi.dirname(e);
  return zi.parse(t).root === t;
}
function $a(e, t, r, n, i) {
  if (n) return wi(e, t, r, i);
  if (r)
    return zl(t, (o) => o ? i(o) : wi(e, t, r, i));
  qh(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : wi(e, t, r, i));
}
function wi(e, t, r, n) {
  Bh.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : Wh(e, t, r, n) : n());
}
function Wh(e, t, r, n) {
  jh(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : zl(e, n));
}
var Yh = Gh;
const Xl = be, Xi = re, zh = yo.copySync, Kl = Gn.removeSync, Xh = Ye.mkdirpSync, Oa = rr;
function Kh(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Oa.checkPathsSync(e, t, "move", r);
  return Oa.checkParentPathsSync(e, i, t, "move"), Jh(t) || Xh(Xi.dirname(t)), Qh(e, t, n, o);
}
function Jh(e) {
  const t = Xi.dirname(e);
  return Xi.parse(t).root === t;
}
function Qh(e, t, r, n) {
  if (n) return _i(e, t, r);
  if (r)
    return Kl(t), _i(e, t, r);
  if (Xl.existsSync(t)) throw new Error("dest already exists.");
  return _i(e, t, r);
}
function _i(e, t, r) {
  try {
    Xl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Zh(e, t, r);
  }
}
function Zh(e, t, r) {
  return zh(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Kl(e);
}
var ep = Kh;
const tp = Ce.fromCallback;
var rp = {
  move: tp(Yh),
  moveSync: ep
}, gt = {
  // Export promiseified graceful-fs:
  ...Nt,
  // Export extra methods:
  ...yo,
  ...Bd,
  ...ph,
  ...Mh,
  ...Ye,
  ...rp,
  ..._o,
  ...Dt,
  ...Gn
}, Qe = {}, ut = {}, de = {}, ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.CancellationError = ft.CancellationToken = void 0;
const np = al;
class ip extends np.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Ki());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Ki());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
ft.CancellationToken = ip;
class Ki extends Error {
  constructor() {
    super("cancelled");
  }
}
ft.CancellationError = Ki;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.newError = op;
function op(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Se = {}, Ji = { exports: {} }, cn = { exports: {} }, Ai, Ia;
function ap() {
  if (Ia) return Ai;
  Ia = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  Ai = function(c, f) {
    f = f || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return a(c);
    if (h === "number" && isFinite(c))
      return f.long ? l(c) : s(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (f) {
        var h = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(c) {
    var f = Math.abs(c);
    return f >= n ? Math.round(c / n) + "d" : f >= r ? Math.round(c / r) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var f = Math.abs(c);
    return f >= n ? m(c, f, n, "day") : f >= r ? m(c, f, r, "hour") : f >= t ? m(c, f, t, "minute") : f >= e ? m(c, f, e, "second") : c + " ms";
  }
  function m(c, f, h, g) {
    var _ = f >= h * 1.5;
    return Math.round(c / h) + " " + g + (_ ? "s" : "");
  }
  return Ai;
}
var Si, Ra;
function Jl() {
  if (Ra) return Si;
  Ra = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = m, n.disable = s, n.enable = o, n.enabled = l, n.humanize = ap(), n.destroy = c, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let h = 0;
      for (let g = 0; g < f.length; g++)
        h = (h << 5) - h + f.charCodeAt(g), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let h, g = null, _, y;
      function A(...T) {
        if (!A.enabled)
          return;
        const S = A, D = Number(/* @__PURE__ */ new Date()), x = D - (h || D);
        S.diff = x, S.prev = h, S.curr = D, h = D, T[0] = n.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
        let Q = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, (W, Ne) => {
          if (W === "%%")
            return "%";
          Q++;
          const E = n.formatters[Ne];
          if (typeof E == "function") {
            const q = T[Q];
            W = E.call(S, q), T.splice(Q, 1), Q--;
          }
          return W;
        }), n.formatArgs.call(S, T), (S.log || n.log).apply(S, T);
      }
      return A.namespace = f, A.useColors = n.useColors(), A.color = n.selectColor(f), A.extend = i, A.destroy = n.destroy, Object.defineProperty(A, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (_ !== n.namespaces && (_ = n.namespaces, y = n.enabled(f)), y),
        set: (T) => {
          g = T;
        }
      }), typeof n.init == "function" && n.init(A), A;
    }
    function i(f, h) {
      const g = n(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const g of h)
        g[0] === "-" ? n.skips.push(g.slice(1)) : n.names.push(g);
    }
    function a(f, h) {
      let g = 0, _ = 0, y = -1, A = 0;
      for (; g < f.length; )
        if (_ < h.length && (h[_] === f[g] || h[_] === "*"))
          h[_] === "*" ? (y = _, A = g, _++) : (g++, _++);
        else if (y !== -1)
          _ = y + 1, A++, g = A;
        else
          return !1;
      for (; _ < h.length && h[_] === "*"; )
        _++;
      return _ === h.length;
    }
    function s() {
      const f = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), f;
    }
    function l(f) {
      for (const h of n.skips)
        if (a(f, h))
          return !1;
      for (const h of n.names)
        if (a(f, h))
          return !0;
      return !1;
    }
    function m(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Si = e, Si;
}
var Pa;
function sp() {
  return Pa || (Pa = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let c = 0, f = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (f = c));
      }), l.splice(f, 0, m);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Jl()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(cn, cn.exports)), cn.exports;
}
var un = { exports: {} }, Ti, Na;
function lp() {
  return Na || (Na = 1, Ti = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Ti;
}
var Ci, Da;
function cp() {
  if (Da) return Ci;
  Da = 1;
  const e = Bn, t = sl, r = lp(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, m) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !m && i === void 0)
      return 0;
    const c = i || 0;
    if (n.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : c;
  }
  function s(l) {
    const m = a(l, l && l.isTTY);
    return o(m);
  }
  return Ci = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, Ci;
}
var Fa;
function up() {
  return Fa || (Fa = 1, function(e, t) {
    const r = sl, n = fo;
    t.init = c, t.log = s, t.formatArgs = o, t.save = l, t.load = m, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = cp();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, g) => {
      const _ = g.substring(6).toLowerCase().replace(/_([a-z])/g, (A, T) => T.toUpperCase());
      let y = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), h[_] = y, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: g, useColors: _ } = this;
      if (_) {
        const y = this.color, A = "\x1B[3" + (y < 8 ? y : "8;5;" + y), T = `  ${A};1m${g} \x1B[0m`;
        h[0] = T + h[0].split(`
`).join(`
` + T), h.push(A + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + g + " " + h[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < g.length; _++)
        h.inspectOpts[g[_]] = t.inspectOpts[g[_]];
    }
    e.exports = Jl()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(un, un.exports)), un.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ji.exports = sp() : Ji.exports = up();
var fp = Ji.exports, Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.ProgressCallbackTransform = void 0;
const dp = Ur;
class hp extends dp.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Br.ProgressCallbackTransform = hp;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.DigestTransform = Se.HttpExecutor = Se.HttpError = void 0;
Se.createHttpError = Qi;
Se.parseJson = _p;
Se.configureRequestOptionsFromUrl = Zl;
Se.configureRequestUrl = So;
Se.safeGetHeader = Kt;
Se.configureRequestOptions = Pn;
Se.safeStringifyJson = Nn;
const pp = kr, mp = fp, gp = mt, Ep = Ur, Ql = tr, yp = ft, xa = nr, vp = Br, fr = (0, mp.default)("electron-builder");
function Qi(e, t = null) {
  return new Ao(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Nn(e.headers), t);
}
const wp = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class Ao extends Error {
  constructor(t, r = `HTTP error: ${wp.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Se.HttpError = Ao;
function _p(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Rn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new yp.CancellationToken(), n) {
    Pn(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      fr(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return fr.enabled && fr(`Request: ${Nn(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, r, o, a, i, n);
        } catch (c) {
          a(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (m) => {
        this.doApiRequest(m, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var l;
    if (fr.enabled && fr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Nn(r)}`), t.statusCode === 404) {
      o(Qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = m >= 300 && m < 400, f = Kt(t, "location");
    if (c && f != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Rn.prepareRedirectUrlOptions(f, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (g) => h += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = Kt(t, "content-type"), _ = g != null && (Array.isArray(g) ? g.find((y) => y.includes("json")) != null : g.includes("json"));
          o(Qi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${_ ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (g) {
        o(g);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      So(t, s), Pn(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, m) => {
          let c = 0;
          l.on("data", (f) => {
            if (c += f.length, c > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(f);
          }), l.on("end", () => {
            m(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = Kt(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(Rn.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Sp(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Zl(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new Ql.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof Ao && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Se.HttpExecutor = Rn;
function Zl(e, t) {
  const r = Pn(t);
  return So(new Ql.URL(e), r), r;
}
function So(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Zi extends Ep.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, pp.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, xa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, xa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Se.DigestTransform = Zi;
function Ap(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Kt(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Sp(e, t) {
  if (!Ap(Kt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = Kt(t, "content-length");
    a != null && r.push(new vp.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Zi(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Zi(e.options.sha2, "sha256", "hex"));
  const i = (0, gp.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Pn(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Nn(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.MemoLazy = void 0;
class Tp {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && ec(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Wn.MemoLazy = Tp;
function ec(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => ec(e[a], t[a]));
  }
  return e === t;
}
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.githubUrl = Cp;
Yn.getS3LikeProviderBaseUrl = bp;
function Cp(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function bp(e) {
  const t = e.provider;
  if (t === "s3")
    return $p(e);
  if (t === "spaces")
    return Op(e);
  throw new Error(`Not supported provider: ${t}`);
}
function $p(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return tc(t, e.path);
}
function tc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Op(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return tc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
To.retry = rc;
const Ip = ft;
async function rc(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new Ip.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((m) => setTimeout(m, r + n * i)), await rc(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.parseDn = Rp;
function Rp(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.nil = Zt.UUID = void 0;
const nc = kr, ic = nr, Pp = "options.name must be either a string or a Buffer", La = (0, nc.randomBytes)(16);
La[0] = La[0] | 1;
const Cn = {}, V = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Cn[t] = e, V[e] = t;
}
class Pt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Pt.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Np(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Dp(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Cn[t[14] + t[15]] & 240) >> 4,
        variant: Ua((Cn[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Ua((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, ic.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Cn[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Zt.UUID = Pt;
Pt.OID = Pt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Ua(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var wr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(wr || (wr = {}));
function Np(e, t, r, n, i = wr.ASCII) {
  const o = (0, nc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, ic.newError)(Pp, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case wr.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case wr.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new Pt(s);
      break;
    default:
      l = V[s[0]] + V[s[1]] + V[s[2]] + V[s[3]] + "-" + V[s[4]] + V[s[5]] + "-" + V[s[6] & 15 | r] + V[s[7]] + "-" + V[s[8] & 63 | 128] + V[s[9]] + "-" + V[s[10]] + V[s[11]] + V[s[12]] + V[s[13]] + V[s[14]] + V[s[15]];
      break;
  }
  return l;
}
function Dp(e) {
  return V[e[0]] + V[e[1]] + V[e[2]] + V[e[3]] + "-" + V[e[4]] + V[e[5]] + "-" + V[e[6]] + V[e[7]] + "-" + V[e[8]] + V[e[9]] + "-" + V[e[10]] + V[e[11]] + V[e[12]] + V[e[13]] + V[e[14]] + V[e[15]];
}
Zt.nil = new Pt("00000000-0000-0000-0000-000000000000");
var jr = {}, oc = {};
(function(e) {
  (function(t) {
    t.parser = function(d, u) {
      return new n(d, u);
    }, t.SAXParser = n, t.SAXStream = c, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(d, u) {
      if (!(this instanceof n))
        return new n(d, u);
      var C = this;
      o(C), C.q = C.c = "", C.bufferCheckPosition = t.MAX_BUFFER_LENGTH, C.opt = u || {}, C.opt.lowercase = C.opt.lowercase || C.opt.lowercasetags, C.looseCase = C.opt.lowercase ? "toLowerCase" : "toUpperCase", C.tags = [], C.closed = C.closedRoot = C.sawRoot = !1, C.tag = C.error = null, C.strict = !!d, C.noscript = !!(d || C.opt.noscript), C.state = E.BEGIN, C.strictEntities = C.opt.strictEntities, C.ENTITIES = C.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), C.attribList = [], C.opt.xmlns && (C.ns = Object.create(y)), C.opt.unquotedAttributeValues === void 0 && (C.opt.unquotedAttributeValues = !d), C.trackPosition = C.opt.position !== !1, C.trackPosition && (C.position = C.line = C.column = 0), B(C, "onready");
    }
    Object.create || (Object.create = function(d) {
      function u() {
      }
      u.prototype = d;
      var C = new u();
      return C;
    }), Object.keys || (Object.keys = function(d) {
      var u = [];
      for (var C in d) d.hasOwnProperty(C) && u.push(C);
      return u;
    });
    function i(d) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), C = 0, w = 0, Y = r.length; w < Y; w++) {
        var Z = d[r[w]].length;
        if (Z > u)
          switch (r[w]) {
            case "textNode":
              z(d);
              break;
            case "cdata":
              M(d, "oncdata", d.cdata), d.cdata = "";
              break;
            case "script":
              M(d, "onscript", d.script), d.script = "";
              break;
            default:
              $(d, "Max buffer length exceeded: " + r[w]);
          }
        C = Math.max(C, Z);
      }
      var ne = t.MAX_BUFFER_LENGTH - C;
      d.bufferCheckPosition = ne + d.position;
    }
    function o(d) {
      for (var u = 0, C = r.length; u < C; u++)
        d[r[u]] = "";
    }
    function a(d) {
      z(d), d.cdata !== "" && (M(d, "oncdata", d.cdata), d.cdata = ""), d.script !== "" && (M(d, "onscript", d.script), d.script = "");
    }
    n.prototype = {
      end: function() {
        P(this);
      },
      write: qe,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(d) {
      return d !== "error" && d !== "end";
    });
    function m(d, u) {
      return new c(d, u);
    }
    function c(d, u) {
      if (!(this instanceof c))
        return new c(d, u);
      s.apply(this), this._parser = new n(d, u), this.writable = !0, this.readable = !0;
      var C = this;
      this._parser.onend = function() {
        C.emit("end");
      }, this._parser.onerror = function(w) {
        C.emit("error", w), C._parser.error = null;
      }, this._decoder = null, l.forEach(function(w) {
        Object.defineProperty(C, "on" + w, {
          get: function() {
            return C._parser["on" + w];
          },
          set: function(Y) {
            if (!Y)
              return C.removeAllListeners(w), C._parser["on" + w] = Y, Y;
            C.on(w, Y);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    c.prototype = Object.create(s.prototype, {
      constructor: {
        value: c
      }
    }), c.prototype.write = function(d) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d)) {
        if (!this._decoder) {
          var u = Tf.StringDecoder;
          this._decoder = new u("utf8");
        }
        d = this._decoder.write(d);
      }
      return this._parser.write(d.toString()), this.emit("data", d), !0;
    }, c.prototype.end = function(d) {
      return d && d.length && this.write(d), this._parser.end(), !0;
    }, c.prototype.on = function(d, u) {
      var C = this;
      return !C._parser["on" + d] && l.indexOf(d) !== -1 && (C._parser["on" + d] = function() {
        var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        w.splice(0, 0, d), C.emit.apply(C, w);
      }), s.prototype.on.call(C, d, u);
    };
    var f = "[CDATA[", h = "DOCTYPE", g = "http://www.w3.org/XML/1998/namespace", _ = "http://www.w3.org/2000/xmlns/", y = { xml: g, xmlns: _ }, A = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function x(d) {
      return d === " " || d === `
` || d === "\r" || d === "	";
    }
    function Q(d) {
      return d === '"' || d === "'";
    }
    function oe(d) {
      return d === ">" || x(d);
    }
    function W(d, u) {
      return d.test(u);
    }
    function Ne(d, u) {
      return !W(d, u);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(d) {
      var u = t.ENTITIES[d], C = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[d] = C;
    });
    for (var q in t.STATE)
      t.STATE[t.STATE[q]] = q;
    E = t.STATE;
    function B(d, u, C) {
      d[u] && d[u](C);
    }
    function M(d, u, C) {
      d.textNode && z(d), B(d, u, C);
    }
    function z(d) {
      d.textNode = I(d.opt, d.textNode), d.textNode && B(d, "ontext", d.textNode), d.textNode = "";
    }
    function I(d, u) {
      return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function $(d, u) {
      return z(d), d.trackPosition && (u += `
Line: ` + d.line + `
Column: ` + d.column + `
Char: ` + d.c), u = new Error(u), d.error = u, B(d, "onerror", u), d;
    }
    function P(d) {
      return d.sawRoot && !d.closedRoot && b(d, "Unclosed root tag"), d.state !== E.BEGIN && d.state !== E.BEGIN_WHITESPACE && d.state !== E.TEXT && $(d, "Unexpected end"), z(d), d.c = "", d.closed = !0, B(d, "onend"), n.call(d, d.strict, d.opt), d;
    }
    function b(d, u) {
      if (typeof d != "object" || !(d instanceof n))
        throw new Error("bad call to strictFail");
      d.strict && $(d, u);
    }
    function N(d) {
      d.strict || (d.tagName = d.tagName[d.looseCase]());
      var u = d.tags[d.tags.length - 1] || d, C = d.tag = { name: d.tagName, attributes: {} };
      d.opt.xmlns && (C.ns = u.ns), d.attribList.length = 0, M(d, "onopentagstart", C);
    }
    function R(d, u) {
      var C = d.indexOf(":"), w = C < 0 ? ["", d] : d.split(":"), Y = w[0], Z = w[1];
      return u && d === "xmlns" && (Y = "xmlns", Z = ""), { prefix: Y, local: Z };
    }
    function k(d) {
      if (d.strict || (d.attribName = d.attribName[d.looseCase]()), d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName)) {
        d.attribName = d.attribValue = "";
        return;
      }
      if (d.opt.xmlns) {
        var u = R(d.attribName, !0), C = u.prefix, w = u.local;
        if (C === "xmlns")
          if (w === "xml" && d.attribValue !== g)
            b(
              d,
              "xml: prefix must be bound to " + g + `
Actual: ` + d.attribValue
            );
          else if (w === "xmlns" && d.attribValue !== _)
            b(
              d,
              "xmlns: prefix must be bound to " + _ + `
Actual: ` + d.attribValue
            );
          else {
            var Y = d.tag, Z = d.tags[d.tags.length - 1] || d;
            Y.ns === Z.ns && (Y.ns = Object.create(Z.ns)), Y.ns[w] = d.attribValue;
          }
        d.attribList.push([d.attribName, d.attribValue]);
      } else
        d.tag.attributes[d.attribName] = d.attribValue, M(d, "onattribute", {
          name: d.attribName,
          value: d.attribValue
        });
      d.attribName = d.attribValue = "";
    }
    function G(d, u) {
      if (d.opt.xmlns) {
        var C = d.tag, w = R(d.tagName);
        C.prefix = w.prefix, C.local = w.local, C.uri = C.ns[w.prefix] || "", C.prefix && !C.uri && (b(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), C.uri = w.prefix);
        var Y = d.tags[d.tags.length - 1] || d;
        C.ns && Y.ns !== C.ns && Object.keys(C.ns).forEach(function(Kr) {
          M(d, "onopennamespace", {
            prefix: Kr,
            uri: C.ns[Kr]
          });
        });
        for (var Z = 0, ne = d.attribList.length; Z < ne; Z++) {
          var he = d.attribList[Z], Ee = he[0], Ze = he[1], se = R(Ee, !0), Ue = se.prefix, ui = se.local, Xr = Ue === "" ? "" : C.ns[Ue] || "", ar = {
            name: Ee,
            value: Ze,
            prefix: Ue,
            local: ui,
            uri: Xr
          };
          Ue && Ue !== "xmlns" && !Xr && (b(d, "Unbound namespace prefix: " + JSON.stringify(Ue)), ar.uri = Ue), d.tag.attributes[Ee] = ar, M(d, "onattribute", ar);
        }
        d.attribList.length = 0;
      }
      d.tag.isSelfClosing = !!u, d.sawRoot = !0, d.tags.push(d.tag), M(d, "onopentag", d.tag), u || (!d.noscript && d.tagName.toLowerCase() === "script" ? d.state = E.SCRIPT : d.state = E.TEXT, d.tag = null, d.tagName = ""), d.attribName = d.attribValue = "", d.attribList.length = 0;
    }
    function j(d) {
      if (!d.tagName) {
        b(d, "Weird empty close tag."), d.textNode += "</>", d.state = E.TEXT;
        return;
      }
      if (d.script) {
        if (d.tagName !== "script") {
          d.script += "</" + d.tagName + ">", d.tagName = "", d.state = E.SCRIPT;
          return;
        }
        M(d, "onscript", d.script), d.script = "";
      }
      var u = d.tags.length, C = d.tagName;
      d.strict || (C = C[d.looseCase]());
      for (var w = C; u--; ) {
        var Y = d.tags[u];
        if (Y.name !== w)
          b(d, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        b(d, "Unmatched closing tag: " + d.tagName), d.textNode += "</" + d.tagName + ">", d.state = E.TEXT;
        return;
      }
      d.tagName = C;
      for (var Z = d.tags.length; Z-- > u; ) {
        var ne = d.tag = d.tags.pop();
        d.tagName = d.tag.name, M(d, "onclosetag", d.tagName);
        var he = {};
        for (var Ee in ne.ns)
          he[Ee] = ne.ns[Ee];
        var Ze = d.tags[d.tags.length - 1] || d;
        d.opt.xmlns && ne.ns !== Ze.ns && Object.keys(ne.ns).forEach(function(se) {
          var Ue = ne.ns[se];
          M(d, "onclosenamespace", { prefix: se, uri: Ue });
        });
      }
      u === 0 && (d.closedRoot = !0), d.tagName = d.attribValue = d.attribName = "", d.attribList.length = 0, d.state = E.TEXT;
    }
    function X(d) {
      var u = d.entity, C = u.toLowerCase(), w, Y = "";
      return d.ENTITIES[u] ? d.ENTITIES[u] : d.ENTITIES[C] ? d.ENTITIES[C] : (u = C, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), w = parseInt(u, 16), Y = w.toString(16)) : (u = u.slice(1), w = parseInt(u, 10), Y = w.toString(10))), u = u.replace(/^0+/, ""), isNaN(w) || Y.toLowerCase() !== u ? (b(d, "Invalid character entity"), "&" + d.entity + ";") : String.fromCodePoint(w));
    }
    function ce(d, u) {
      u === "<" ? (d.state = E.OPEN_WAKA, d.startTagPosition = d.position) : x(u) || (b(d, "Non-whitespace before first tag."), d.textNode = u, d.state = E.TEXT);
    }
    function U(d, u) {
      var C = "";
      return u < d.length && (C = d.charAt(u)), C;
    }
    function qe(d) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return $(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (d === null)
        return P(u);
      typeof d == "object" && (d = d.toString());
      for (var C = 0, w = ""; w = U(d, C++), u.c = w, !!w; )
        switch (u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case E.BEGIN:
            if (u.state = E.BEGIN_WHITESPACE, w === "\uFEFF")
              continue;
            ce(u, w);
            continue;
          case E.BEGIN_WHITESPACE:
            ce(u, w);
            continue;
          case E.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var Y = C - 1; w && w !== "<" && w !== "&"; )
                w = U(d, C++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += d.substring(Y, C - 1);
            }
            w === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : (!x(w) && (!u.sawRoot || u.closedRoot) && b(u, "Text data outside of root node."), w === "&" ? u.state = E.TEXT_ENTITY : u.textNode += w);
            continue;
          case E.SCRIPT:
            w === "<" ? u.state = E.SCRIPT_ENDING : u.script += w;
            continue;
          case E.SCRIPT_ENDING:
            w === "/" ? u.state = E.CLOSE_TAG : (u.script += "<" + w, u.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (w === "!")
              u.state = E.SGML_DECL, u.sgmlDecl = "";
            else if (!x(w)) if (W(A, w))
              u.state = E.OPEN_TAG, u.tagName = w;
            else if (w === "/")
              u.state = E.CLOSE_TAG, u.tagName = "";
            else if (w === "?")
              u.state = E.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (b(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var Z = u.position - u.startTagPosition;
                w = new Array(Z).join(" ") + w;
              }
              u.textNode += "<" + w, u.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (u.sgmlDecl + w === "--") {
              u.state = E.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = E.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + w, u.sgmlDecl = "") : (u.sgmlDecl + w).toUpperCase() === f ? (M(u, "onopencdata"), u.state = E.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + w).toUpperCase() === h ? (u.state = E.DOCTYPE, (u.doctype || u.sawRoot) && b(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : w === ">" ? (M(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = E.TEXT) : (Q(w) && (u.state = E.SGML_DECL_QUOTED), u.sgmlDecl += w);
            continue;
          case E.SGML_DECL_QUOTED:
            w === u.q && (u.state = E.SGML_DECL, u.q = ""), u.sgmlDecl += w;
            continue;
          case E.DOCTYPE:
            w === ">" ? (u.state = E.TEXT, M(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += w, w === "[" ? u.state = E.DOCTYPE_DTD : Q(w) && (u.state = E.DOCTYPE_QUOTED, u.q = w));
            continue;
          case E.DOCTYPE_QUOTED:
            u.doctype += w, w === u.q && (u.q = "", u.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            w === "]" ? (u.doctype += w, u.state = E.DOCTYPE) : w === "<" ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : Q(w) ? (u.doctype += w, u.state = E.DOCTYPE_DTD_QUOTED, u.q = w) : u.doctype += w;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            u.doctype += w, w === u.q && (u.state = E.DOCTYPE_DTD, u.q = "");
            continue;
          case E.COMMENT:
            w === "-" ? u.state = E.COMMENT_ENDING : u.comment += w;
            continue;
          case E.COMMENT_ENDING:
            w === "-" ? (u.state = E.COMMENT_ENDED, u.comment = I(u.opt, u.comment), u.comment && M(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + w, u.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            w !== ">" ? (b(u, "Malformed comment"), u.comment += "--" + w, u.state = E.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = E.DOCTYPE_DTD : u.state = E.TEXT;
            continue;
          case E.CDATA:
            w === "]" ? u.state = E.CDATA_ENDING : u.cdata += w;
            continue;
          case E.CDATA_ENDING:
            w === "]" ? u.state = E.CDATA_ENDING_2 : (u.cdata += "]" + w, u.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            w === ">" ? (u.cdata && M(u, "oncdata", u.cdata), M(u, "onclosecdata"), u.cdata = "", u.state = E.TEXT) : w === "]" ? u.cdata += "]" : (u.cdata += "]]" + w, u.state = E.CDATA);
            continue;
          case E.PROC_INST:
            w === "?" ? u.state = E.PROC_INST_ENDING : x(w) ? u.state = E.PROC_INST_BODY : u.procInstName += w;
            continue;
          case E.PROC_INST_BODY:
            if (!u.procInstBody && x(w))
              continue;
            w === "?" ? u.state = E.PROC_INST_ENDING : u.procInstBody += w;
            continue;
          case E.PROC_INST_ENDING:
            w === ">" ? (M(u, "onprocessinginstruction", {
              name: u.procInstName,
              body: u.procInstBody
            }), u.procInstName = u.procInstBody = "", u.state = E.TEXT) : (u.procInstBody += "?" + w, u.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            W(T, w) ? u.tagName += w : (N(u), w === ">" ? G(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : (x(w) || b(u, "Invalid character in tag name"), u.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            w === ">" ? (G(u, !0), j(u)) : (b(u, "Forward-slash in opening tag not followed by >"), u.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (x(w))
              continue;
            w === ">" ? G(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : W(A, w) ? (u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            w === "=" ? u.state = E.ATTRIB_VALUE : w === ">" ? (b(u, "Attribute without value"), u.attribValue = u.attribName, k(u), G(u)) : x(w) ? u.state = E.ATTRIB_NAME_SAW_WHITE : W(T, w) ? u.attribName += w : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (w === "=")
              u.state = E.ATTRIB_VALUE;
            else {
              if (x(w))
                continue;
              b(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", M(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", w === ">" ? G(u) : W(A, w) ? (u.attribName = w, u.state = E.ATTRIB_NAME) : (b(u, "Invalid attribute name"), u.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (x(w))
              continue;
            Q(w) ? (u.q = w, u.state = E.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || $(u, "Unquoted attribute value"), u.state = E.ATTRIB_VALUE_UNQUOTED, u.attribValue = w);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (w !== u.q) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_Q : u.attribValue += w;
              continue;
            }
            k(u), u.q = "", u.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            x(w) ? u.state = E.ATTRIB : w === ">" ? G(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : W(A, w) ? (b(u, "No whitespace between attributes"), u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!oe(w)) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_U : u.attribValue += w;
              continue;
            }
            k(u), w === ">" ? G(u) : u.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (u.tagName)
              w === ">" ? j(u) : W(T, w) ? u.tagName += w : u.script ? (u.script += "</" + u.tagName, u.tagName = "", u.state = E.SCRIPT) : (x(w) || b(u, "Invalid tagname in closing tag"), u.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (x(w))
                continue;
              Ne(A, w) ? u.script ? (u.script += "</" + w, u.state = E.SCRIPT) : b(u, "Invalid tagname in closing tag.") : u.tagName = w;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (x(w))
              continue;
            w === ">" ? j(u) : b(u, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var ne, he;
            switch (u.state) {
              case E.TEXT_ENTITY:
                ne = E.TEXT, he = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                ne = E.ATTRIB_VALUE_QUOTED, he = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                ne = E.ATTRIB_VALUE_UNQUOTED, he = "attribValue";
                break;
            }
            if (w === ";") {
              var Ee = X(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ee) ? (u.entity = "", u.state = ne, u.write(Ee)) : (u[he] += Ee, u.entity = "", u.state = ne);
            } else W(u.entity.length ? D : S, w) ? u.entity += w : (b(u, "Invalid character in entity name"), u[he] += "&" + u.entity + w, u.entity = "", u.state = ne);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var d = String.fromCharCode, u = Math.floor, C = function() {
        var w = 16384, Y = [], Z, ne, he = -1, Ee = arguments.length;
        if (!Ee)
          return "";
        for (var Ze = ""; ++he < Ee; ) {
          var se = Number(arguments[he]);
          if (!isFinite(se) || // `NaN`, `+Infinity`, or `-Infinity`
          se < 0 || // not a valid Unicode code point
          se > 1114111 || // not a valid Unicode code point
          u(se) !== se)
            throw RangeError("Invalid code point: " + se);
          se <= 65535 ? Y.push(se) : (se -= 65536, Z = (se >> 10) + 55296, ne = se % 1024 + 56320, Y.push(Z, ne)), (he + 1 === Ee || Y.length > w) && (Ze += d.apply(null, Y), Y.length = 0);
        }
        return Ze;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: C,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = C;
    }();
  })(e);
})(oc);
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.XElement = void 0;
jr.parseXml = Up;
const Fp = oc, fn = nr;
class ac {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, fn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Lp(t))
      throw (0, fn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, fn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, fn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (ka(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => ka(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
jr.XElement = ac;
const xp = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Lp(e) {
  return xp.test(e);
}
function ka(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Up(e) {
  let t = null;
  const r = Fp.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new ac(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = ft;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = nr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Se;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Wn;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Br;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var a = Yn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return a.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return a.githubUrl;
  } });
  var s = To;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var l = Co;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var m = Zt;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var c = jr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(de);
var ge = {}, bo = {}, Be = {};
function sc(e) {
  return typeof e > "u" || e === null;
}
function kp(e) {
  return typeof e == "object" && e !== null;
}
function Mp(e) {
  return Array.isArray(e) ? e : sc(e) ? [] : [e];
}
function Bp(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function jp(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Hp(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Be.isNothing = sc;
Be.isObject = kp;
Be.toArray = Mp;
Be.repeat = jp;
Be.isNegativeZero = Hp;
Be.extend = Bp;
function lc(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function $r(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = lc(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
$r.prototype = Object.create(Error.prototype);
$r.prototype.constructor = $r;
$r.prototype.toString = function(t) {
  return this.name + ": " + lc(this, t);
};
var Hr = $r, gr = Be;
function bi(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function $i(e, t) {
  return gr.repeat(" ", t - e.length) + e;
}
function qp(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, m, c = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + c + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    m = bi(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      f
    ), s = gr.repeat(" ", t.indent) + $i((e.line - l + 1).toString(), c) + " | " + m.str + `
` + s;
  for (m = bi(e.buffer, n[a], i[a], e.position, f), s += gr.repeat(" ", t.indent) + $i((e.line + 1).toString(), c) + " | " + m.str + `
`, s += gr.repeat("-", t.indent + c + 3 + m.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    m = bi(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      f
    ), s += gr.repeat(" ", t.indent) + $i((e.line + l + 1).toString(), c) + " | " + m.str + `
`;
  return s.replace(/\n$/, "");
}
var Gp = qp, Ma = Hr, Vp = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Wp = [
  "scalar",
  "sequence",
  "mapping"
];
function Yp(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function zp(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Vp.indexOf(r) === -1)
      throw new Ma('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Yp(t.styleAliases || null), Wp.indexOf(this.kind) === -1)
    throw new Ma('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var $e = zp, dr = Hr, Oi = $e;
function Ba(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function Xp() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function eo(e) {
  return this.extend(e);
}
eo.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Oi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new dr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof Oi))
      throw new dr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new dr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new dr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof Oi))
      throw new dr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(eo.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Ba(i, "implicit"), i.compiledExplicit = Ba(i, "explicit"), i.compiledTypeMap = Xp(i.compiledImplicit, i.compiledExplicit), i;
};
var cc = eo, Kp = $e, uc = new Kp("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Jp = $e, fc = new Jp("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Qp = $e, dc = new Qp("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Zp = cc, hc = new Zp({
  explicit: [
    uc,
    fc,
    dc
  ]
}), em = $e;
function tm(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function rm() {
  return null;
}
function nm(e) {
  return e === null;
}
var pc = new em("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: tm,
  construct: rm,
  predicate: nm,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), im = $e;
function om(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function am(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function sm(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var mc = new im("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: om,
  construct: am,
  predicate: sm,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), lm = Be, cm = $e;
function um(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function fm(e) {
  return 48 <= e && e <= 55;
}
function dm(e) {
  return 48 <= e && e <= 57;
}
function hm(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!um(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!fm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!dm(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function pm(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function mm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !lm.isNegativeZero(e);
}
var gc = new cm("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: hm,
  construct: pm,
  predicate: mm,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Ec = Be, gm = $e, Em = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ym(e) {
  return !(e === null || !Em.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function vm(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var wm = /^[-+]?[0-9]+e/;
function _m(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Ec.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), wm.test(r) ? r.replace("e", ".e") : r;
}
function Am(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Ec.isNegativeZero(e));
}
var yc = new gm("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ym,
  construct: vm,
  predicate: Am,
  represent: _m,
  defaultStyle: "lowercase"
}), vc = hc.extend({
  implicit: [
    pc,
    mc,
    gc,
    yc
  ]
}), wc = vc, Sm = $e, _c = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Ac = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Tm(e) {
  return e === null ? !1 : _c.exec(e) !== null || Ac.exec(e) !== null;
}
function Cm(e) {
  var t, r, n, i, o, a, s, l = 0, m = null, c, f, h;
  if (t = _c.exec(e), t === null && (t = Ac.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (c = +t[10], f = +(t[11] || 0), m = (c * 60 + f) * 6e4, t[9] === "-" && (m = -m)), h = new Date(Date.UTC(r, n, i, o, a, s, l)), m && h.setTime(h.getTime() - m), h;
}
function bm(e) {
  return e.toISOString();
}
var Sc = new Sm("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Tm,
  construct: Cm,
  instanceOf: Date,
  represent: bm
}), $m = $e;
function Om(e) {
  return e === "<<" || e === null;
}
var Tc = new $m("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Om
}), Im = $e, $o = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Rm(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = $o;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Pm(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = $o, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Nm(e) {
  var t = "", r = 0, n, i, o = e.length, a = $o;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Dm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Cc = new Im("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Rm,
  construct: Pm,
  predicate: Dm,
  represent: Nm
}), Fm = $e, xm = Object.prototype.hasOwnProperty, Lm = Object.prototype.toString;
function Um(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, Lm.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (xm.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function km(e) {
  return e !== null ? e : [];
}
var bc = new Fm("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Um,
  construct: km
}), Mm = $e, Bm = Object.prototype.toString;
function jm(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Bm.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Hm(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var $c = new Mm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: jm,
  construct: Hm
}), qm = $e, Gm = Object.prototype.hasOwnProperty;
function Vm(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (Gm.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function Wm(e) {
  return e !== null ? e : {};
}
var Oc = new qm("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Vm,
  construct: Wm
}), Oo = wc.extend({
  implicit: [
    Sc,
    Tc
  ],
  explicit: [
    Cc,
    bc,
    $c,
    Oc
  ]
}), bt = Be, Ic = Hr, Ym = Gp, zm = Oo, dt = Object.prototype.hasOwnProperty, Dn = 1, Rc = 2, Pc = 3, Fn = 4, Ii = 1, Xm = 2, ja = 3, Km = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Jm = /[\x85\u2028\u2029]/, Qm = /[,\[\]\{\}]/, Nc = /^(?:!|!!|![a-z\-]+!)$/i, Dc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Ha(e) {
  return Object.prototype.toString.call(e);
}
function We(e) {
  return e === 10 || e === 13;
}
function It(e) {
  return e === 9 || e === 32;
}
function Pe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Gt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Zm(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function eg(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function tg(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function qa(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function rg(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Fc = new Array(256), xc = new Array(256);
for (var Ut = 0; Ut < 256; Ut++)
  Fc[Ut] = qa(Ut) ? 1 : 0, xc[Ut] = qa(Ut);
function ng(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || zm, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Lc(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Ym(r), new Ic(t, r);
}
function L(e, t) {
  throw Lc(e, t);
}
function xn(e, t) {
  e.onWarning && e.onWarning.call(null, Lc(e, t));
}
var Ga = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && L(t, "duplication of %YAML directive"), n.length !== 1 && L(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && L(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && xn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && L(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Nc.test(i) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), dt.call(t.tagMap, i) && L(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Dc.test(o) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      L(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function ct(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || L(e, "expected valid JSON character");
    else Km.test(s) && L(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Va(e, t, r, n) {
  var i, o, a, s;
  for (bt.isObject(r) || L(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], dt.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Vt(e, t, r, n, i, o, a, s, l) {
  var m, c;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), m = 0, c = i.length; m < c; m += 1)
      Array.isArray(i[m]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && Ha(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  if (typeof i == "object" && Ha(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (m = 0, c = o.length; m < c; m += 1)
        Va(e, t, o[m], r);
    else
      Va(e, t, o, r);
  else
    !e.json && !dt.call(r, i) && dt.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, L(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Io(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ae(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; It(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (We(i))
      for (Io(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && xn(e, "deficient indentation"), n;
}
function zn(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Pe(r)));
}
function Ro(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += bt.repeat(`
`, t - 1));
}
function ig(e, t, r) {
  var n, i, o, a, s, l, m, c, f = e.kind, h = e.result, g;
  if (g = e.input.charCodeAt(e.position), Pe(g) || Gt(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (i = e.input.charCodeAt(e.position + 1), Pe(i) || r && Gt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; g !== 0; ) {
    if (g === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Pe(i) || r && Gt(i))
        break;
    } else if (g === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Pe(n))
        break;
    } else {
      if (e.position === e.lineStart && zn(e) || r && Gt(g))
        break;
      if (We(g))
        if (l = e.line, m = e.lineStart, c = e.lineIndent, ae(e, !1, -1), e.lineIndent >= t) {
          s = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = m, e.lineIndent = c;
          break;
        }
    }
    s && (ct(e, o, a, !1), Ro(e, e.line - l), o = a = e.position, s = !1), It(g) || (a = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return ct(e, o, a, !1), e.result ? !0 : (e.kind = f, e.result = h, !1);
}
function og(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (ct(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else We(r) ? (ct(e, n, i, !0), Ro(e, ae(e, !1, t)), n = i = e.position) : e.position === e.lineStart && zn(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function ag(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return ct(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (ct(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), We(s))
        ae(e, !1, t);
      else if (s < 256 && Fc[s])
        e.result += xc[s], e.position++;
      else if ((a = eg(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = Zm(s)) >= 0 ? o = (o << 4) + a : L(e, "expected hexadecimal character");
        e.result += rg(o), e.position++;
      } else
        L(e, "unknown escape sequence");
      r = n = e.position;
    } else We(s) ? (ct(e, r, n, !0), Ro(e, ae(e, !1, t)), r = n = e.position) : e.position === e.lineStart && zn(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function sg(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, m, c, f, h, g, _ = /* @__PURE__ */ Object.create(null), y, A, T, S;
  if (S = e.input.charCodeAt(e.position), S === 91)
    c = 93, g = !1, s = [];
  else if (S === 123)
    c = 125, g = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), S = e.input.charCodeAt(++e.position); S !== 0; ) {
    if (ae(e, !0, t), S = e.input.charCodeAt(e.position), S === c)
      return e.position++, e.tag = a, e.anchor = l, e.kind = g ? "mapping" : "sequence", e.result = s, !0;
    r ? S === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), A = y = T = null, f = h = !1, S === 63 && (m = e.input.charCodeAt(e.position + 1), Pe(m) && (f = h = !0, e.position++, ae(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, er(e, t, Dn, !1, !0), A = e.tag, y = e.result, ae(e, !0, t), S = e.input.charCodeAt(e.position), (h || e.line === n) && S === 58 && (f = !0, S = e.input.charCodeAt(++e.position), ae(e, !0, t), er(e, t, Dn, !1, !0), T = e.result), g ? Vt(e, s, _, A, y, T, n, i, o) : f ? s.push(Vt(e, null, _, A, y, T, n, i, o)) : s.push(y), ae(e, !0, t), S = e.input.charCodeAt(e.position), S === 44 ? (r = !0, S = e.input.charCodeAt(++e.position)) : r = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function lg(e, t) {
  var r, n, i = Ii, o = !1, a = !1, s = t, l = 0, m = !1, c, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      Ii === i ? i = f === 43 ? ja : Xm : L(e, "repeat of a chomping mode identifier");
    else if ((c = tg(f)) >= 0)
      c === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? L(e, "repeat of an indentation width identifier") : (s = t + c - 1, a = !0);
    else
      break;
  if (It(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (It(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!We(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (Io(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), We(f)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === ja ? e.result += bt.repeat(`
`, o ? 1 + l : l) : i === Ii && o && (e.result += `
`);
      break;
    }
    for (n ? It(f) ? (m = !0, e.result += bt.repeat(`
`, o ? 1 + l : l)) : m ? (m = !1, e.result += bt.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += bt.repeat(`
`, l) : e.result += bt.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !We(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    ct(e, r, e.position, !1);
  }
  return !0;
}
function Wa(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !Pe(a)))); ) {
    if (s = !0, e.position++, ae(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, er(e, t, Pc, !1, !0), o.push(e.result), ae(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function cg(e, t, r) {
  var n, i, o, a, s, l, m = e.tag, c = e.anchor, f = {}, h = /* @__PURE__ */ Object.create(null), g = null, _ = null, y = null, A = !1, T = !1, S;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), S = e.input.charCodeAt(e.position); S !== 0; ) {
    if (!A && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (S === 63 || S === 58) && Pe(n))
      S === 63 ? (A && (Vt(e, f, h, g, _, null, a, s, l), g = _ = y = null), T = !0, A = !0, i = !0) : A ? (A = !1, i = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, S = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !er(e, r, Rc, !1, !0))
        break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); It(S); )
          S = e.input.charCodeAt(++e.position);
        if (S === 58)
          S = e.input.charCodeAt(++e.position), Pe(S) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), A && (Vt(e, f, h, g, _, null, a, s, l), g = _ = y = null), T = !0, A = !1, i = !1, g = e.tag, _ = e.result;
        else if (T)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = m, e.anchor = c, !0;
      } else if (T)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = m, e.anchor = c, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (A && (a = e.line, s = e.lineStart, l = e.position), er(e, t, Fn, !0, i) && (A ? _ = e.result : y = e.result), A || (Vt(e, f, h, g, _, y, a, s, l), g = _ = y = null), ae(e, !0, -1), S = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && S !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return A && Vt(e, f, h, g, _, null, a, s, l), T && (e.tag = m, e.anchor = c, e.kind = "mapping", e.result = f), T;
}
function ug(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && L(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Pe(a); )
      a === 33 && (n ? L(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Nc.test(i) || L(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), Qm.test(o) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Dc.test(o) && L(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    L(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : dt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : L(e, 'undeclared tag handle "' + i + '"'), !0;
}
function fg(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && L(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Pe(r) && !Gt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function dg(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Pe(n) && !Gt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && L(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), dt.call(e.anchorMap, r) || L(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ae(e, !0, -1), !0;
}
function er(e, t, r, n, i) {
  var o, a, s, l = 1, m = !1, c = !1, f, h, g, _, y, A;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = Fn === r || Pc === r, n && ae(e, !0, -1) && (m = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; ug(e) || fg(e); )
      ae(e, !0, -1) ? (m = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = m || i), (l === 1 || Fn === r) && (Dn === r || Rc === r ? y = t : y = t + 1, A = e.position - e.lineStart, l === 1 ? s && (Wa(e, A) || cg(e, A, y)) || sg(e, y) ? c = !0 : (a && lg(e, y) || og(e, y) || ag(e, y) ? c = !0 : dg(e) ? (c = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : ig(e, y, Dn === r) && (c = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (c = s && Wa(e, A))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, h = e.implicitTypes.length; f < h; f += 1)
      if (_ = e.implicitTypes[f], _.resolve(e.result)) {
        e.result = _.construct(e.result), e.tag = _.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (dt.call(e.typeMap[e.kind || "fallback"], e.tag))
      _ = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (_ = null, g = e.typeMap.multi[e.kind || "fallback"], f = 0, h = g.length; f < h; f += 1)
        if (e.tag.slice(0, g[f].tag.length) === g[f].tag) {
          _ = g[f];
          break;
        }
    _ || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && _.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'), _.resolve(e.result, e.tag) ? (e.result = _.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
}
function hg(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (ae(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Pe(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && L(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; It(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !We(a));
        break;
      }
      if (We(a)) break;
      for (r = e.position; a !== 0 && !Pe(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Io(e), dt.call(Ga, n) ? Ga[n](e, n, i) : xn(e, 'unknown document directive "' + n + '"');
  }
  if (ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ae(e, !0, -1)) : o && L(e, "directives end mark is expected"), er(e, e.lineIndent - 1, Fn, !1, !0), ae(e, !0, -1), e.checkLineBreaks && Jm.test(e.input.slice(t, e.position)) && xn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && zn(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ae(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    L(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Uc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new ng(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, L(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    hg(r);
  return r.documents;
}
function pg(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Uc(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function mg(e, t) {
  var r = Uc(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Ic("expected a single document in the stream, but found more");
  }
}
bo.loadAll = pg;
bo.load = mg;
var kc = {}, Xn = Be, qr = Hr, gg = Oo, Mc = Object.prototype.toString, Bc = Object.prototype.hasOwnProperty, Po = 65279, Eg = 9, Or = 10, yg = 13, vg = 32, wg = 33, _g = 34, to = 35, Ag = 37, Sg = 38, Tg = 39, Cg = 42, jc = 44, bg = 45, Ln = 58, $g = 61, Og = 62, Ig = 63, Rg = 64, Hc = 91, qc = 93, Pg = 96, Gc = 123, Ng = 124, Vc = 125, we = {};
we[0] = "\\0";
we[7] = "\\a";
we[8] = "\\b";
we[9] = "\\t";
we[10] = "\\n";
we[11] = "\\v";
we[12] = "\\f";
we[13] = "\\r";
we[27] = "\\e";
we[34] = '\\"';
we[92] = "\\\\";
we[133] = "\\N";
we[160] = "\\_";
we[8232] = "\\L";
we[8233] = "\\P";
var Dg = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Fg = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function xg(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Bc.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function Lg(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new qr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Xn.repeat("0", n - t.length) + t;
}
var Ug = 1, Ir = 2;
function kg(e) {
  this.schema = e.schema || gg, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Xn.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = xg(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ir : Ug, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ya(e, t) {
  for (var r = Xn.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function ro(e, t) {
  return `
` + Xn.repeat(" ", e.indent * t);
}
function Mg(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Un(e) {
  return e === vg || e === Eg;
}
function Rr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Po || 65536 <= e && e <= 1114111;
}
function za(e) {
  return Rr(e) && e !== Po && e !== yg && e !== Or;
}
function Xa(e, t, r) {
  var n = za(e), i = n && !Un(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== jc && e !== Hc && e !== qc && e !== Gc && e !== Vc) && e !== to && !(t === Ln && !i) || za(t) && !Un(t) && e === to || t === Ln && i
  );
}
function Bg(e) {
  return Rr(e) && e !== Po && !Un(e) && e !== bg && e !== Ig && e !== Ln && e !== jc && e !== Hc && e !== qc && e !== Gc && e !== Vc && e !== to && e !== Sg && e !== Cg && e !== wg && e !== Ng && e !== $g && e !== Og && e !== Tg && e !== _g && e !== Ag && e !== Rg && e !== Pg;
}
function jg(e) {
  return !Un(e) && e !== Ln;
}
function Er(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Wc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Yc = 1, no = 2, zc = 3, Xc = 4, qt = 5;
function Hg(e, t, r, n, i, o, a, s) {
  var l, m = 0, c = null, f = !1, h = !1, g = n !== -1, _ = -1, y = Bg(Er(e, 0)) && jg(Er(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Er(e, l), !Rr(m))
        return qt;
      y = y && Xa(m, c, s), c = m;
    }
  else {
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = Er(e, l), m === Or)
        f = !0, g && (h = h || // Foldable line = too long, and not more-indented.
        l - _ - 1 > n && e[_ + 1] !== " ", _ = l);
      else if (!Rr(m))
        return qt;
      y = y && Xa(m, c, s), c = m;
    }
    h = h || g && l - _ - 1 > n && e[_ + 1] !== " ";
  }
  return !f && !h ? y && !a && !i(e) ? Yc : o === Ir ? qt : no : r > 9 && Wc(e) ? qt : a ? o === Ir ? qt : no : h ? Xc : zc;
}
function qg(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ir ? '""' : "''";
    if (!e.noCompatMode && (Dg.indexOf(t) !== -1 || Fg.test(t)))
      return e.quotingType === Ir ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(m) {
      return Mg(e, m);
    }
    switch (Hg(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Yc:
        return t;
      case no:
        return "'" + t.replace(/'/g, "''") + "'";
      case zc:
        return "|" + Ka(t, e.indent) + Ja(Ya(t, o));
      case Xc:
        return ">" + Ka(t, e.indent) + Ja(Ya(Gg(t, a), o));
      case qt:
        return '"' + Vg(t) + '"';
      default:
        throw new qr("impossible error: invalid scalar style");
    }
  }();
}
function Ka(e, t) {
  var r = Wc(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Ja(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Gg(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var m = e.indexOf(`
`);
    return m = m !== -1 ? m : e.length, r.lastIndex = m, Qa(e.slice(0, m), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Qa(l, t), i = o;
  }
  return n;
}
function Qa(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function Vg(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Er(e, i), n = we[r], !n && Rr(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || Lg(r);
  return t;
}
function Wg(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Je(e, t, s, !1, !1) || typeof s > "u" && Je(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Za(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (Je(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Je(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += ro(e, t)), e.dump && Or === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function Yg(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, m, c;
  for (a = 0, s = o.length; a < s; a += 1)
    c = "", n !== "" && (c += ", "), e.condenseFlow && (c += '"'), l = o[a], m = r[l], e.replacer && (m = e.replacer.call(r, l, m)), Je(e, t, l, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Je(e, t, m, !1, !1) && (c += e.dump, n += c));
  e.tag = i, e.dump = "{" + n + "}";
}
function zg(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, m, c, f, h;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new qr("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += ro(e, t)), m = a[s], c = r[m], e.replacer && (c = e.replacer.call(r, m, c)), Je(e, t + 1, m, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Or === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, f && (h += ro(e, t)), Je(e, t + 1, c, !0, f) && (e.dump && Or === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function es(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, Mc.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (Bc.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new qr("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Je(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, es(e, r, !1) || es(e, r, !0);
  var s = Mc.call(e.dump), l = n, m;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var c = s === "[object Object]" || s === "[object Array]", f, h;
  if (c && (f = e.duplicates.indexOf(r), h = f !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (c && h && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (zg(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (Yg(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? Za(e, t - 1, e.dump, i) : Za(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (Wg(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && qg(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new qr("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (m = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? m = "!" + m : m.slice(0, 18) === "tag:yaml.org,2002:" ? m = "!!" + m.slice(18) : m = "!<" + m + ">", e.dump = m + " " + e.dump);
  }
  return !0;
}
function Xg(e, t) {
  var r = [], n = [], i, o;
  for (io(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function io(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        io(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        io(e[n[i]], t, r);
}
function Kg(e, t) {
  t = t || {};
  var r = new kg(t);
  r.noRefs || Xg(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Je(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
kc.dump = Kg;
var Kc = bo, Jg = kc;
function No(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
ge.Type = $e;
ge.Schema = cc;
ge.FAILSAFE_SCHEMA = hc;
ge.JSON_SCHEMA = vc;
ge.CORE_SCHEMA = wc;
ge.DEFAULT_SCHEMA = Oo;
ge.load = Kc.load;
ge.loadAll = Kc.loadAll;
ge.dump = Jg.dump;
ge.YAMLException = Hr;
ge.types = {
  binary: Cc,
  float: yc,
  map: dc,
  null: pc,
  pairs: $c,
  set: Oc,
  timestamp: Sc,
  bool: mc,
  int: gc,
  merge: Tc,
  omap: bc,
  seq: fc,
  str: uc
};
ge.safeLoad = No("safeLoad", "load");
ge.safeLoadAll = No("safeLoadAll", "loadAll");
ge.safeDump = No("safeDump", "dump");
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.Lazy = void 0;
class Qg {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Kn.Lazy = Qg;
var oo = { exports: {} };
const Zg = "2.0.0", Jc = 256, e0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, t0 = 16, r0 = Jc - 6, n0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Jn = {
  MAX_LENGTH: Jc,
  MAX_SAFE_COMPONENT_LENGTH: t0,
  MAX_SAFE_BUILD_LENGTH: r0,
  MAX_SAFE_INTEGER: e0,
  RELEASE_TYPES: n0,
  SEMVER_SPEC_VERSION: Zg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const i0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Qn = i0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Jn, o = Qn;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], m = t.safeSrc = [], c = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], _ = (A) => {
    for (const [T, S] of g)
      A = A.split(`${T}*`).join(`${T}{0,${S}}`).split(`${T}+`).join(`${T}{1,${S}}`);
    return A;
  }, y = (A, T, S) => {
    const D = _(T), x = f++;
    o(A, x, T), c[A] = x, l[x] = T, m[x] = D, a[x] = new RegExp(T, S ? "g" : void 0), s[x] = new RegExp(D, S ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${h}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(oo, oo.exports);
var Gr = oo.exports;
const o0 = Object.freeze({ loose: !0 }), a0 = Object.freeze({}), s0 = (e) => e ? typeof e != "object" ? o0 : e : a0;
var Do = s0;
const ts = /^[0-9]+$/, Qc = (e, t) => {
  const r = ts.test(e), n = ts.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, l0 = (e, t) => Qc(t, e);
var Zc = {
  compareIdentifiers: Qc,
  rcompareIdentifiers: l0
};
const dn = Qn, { MAX_LENGTH: rs, MAX_SAFE_INTEGER: hn } = Jn, { safeRe: pn, t: mn } = Gr, c0 = Do, { compareIdentifiers: kt } = Zc;
let u0 = class Ve {
  constructor(t, r) {
    if (r = c0(r), t instanceof Ve) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > rs)
      throw new TypeError(
        `version is longer than ${rs} characters`
      );
    dn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? pn[mn.LOOSE] : pn[mn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > hn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > hn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > hn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < hn)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (dn("SemVer.compare", this.version, this.options, t), !(t instanceof Ve)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Ve(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Ve || (t = new Ve(t, this.options)), kt(this.major, t.major) || kt(this.minor, t.minor) || kt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Ve || (t = new Ve(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (dn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return kt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Ve || (t = new Ve(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (dn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return kt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? pn[mn.PRERELEASELOOSE] : pn[mn.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), kt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Oe = u0;
const ns = Oe, f0 = (e, t, r = !1) => {
  if (e instanceof ns)
    return e;
  try {
    return new ns(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var ir = f0;
const d0 = ir, h0 = (e, t) => {
  const r = d0(e, t);
  return r ? r.version : null;
};
var p0 = h0;
const m0 = ir, g0 = (e, t) => {
  const r = m0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var E0 = g0;
const is = Oe, y0 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new is(
      e instanceof is ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var v0 = y0;
const os = ir, w0 = (e, t) => {
  const r = os(e, null, !0), n = os(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return r.major !== n.major ? c + "major" : r.minor !== n.minor ? c + "minor" : r.patch !== n.patch ? c + "patch" : "prerelease";
};
var _0 = w0;
const A0 = Oe, S0 = (e, t) => new A0(e, t).major;
var T0 = S0;
const C0 = Oe, b0 = (e, t) => new C0(e, t).minor;
var $0 = b0;
const O0 = Oe, I0 = (e, t) => new O0(e, t).patch;
var R0 = I0;
const P0 = ir, N0 = (e, t) => {
  const r = P0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var D0 = N0;
const as = Oe, F0 = (e, t, r) => new as(e, r).compare(new as(t, r));
var je = F0;
const x0 = je, L0 = (e, t, r) => x0(t, e, r);
var U0 = L0;
const k0 = je, M0 = (e, t) => k0(e, t, !0);
var B0 = M0;
const ss = Oe, j0 = (e, t, r) => {
  const n = new ss(e, r), i = new ss(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var Fo = j0;
const H0 = Fo, q0 = (e, t) => e.sort((r, n) => H0(r, n, t));
var G0 = q0;
const V0 = Fo, W0 = (e, t) => e.sort((r, n) => V0(n, r, t));
var Y0 = W0;
const z0 = je, X0 = (e, t, r) => z0(e, t, r) > 0;
var Zn = X0;
const K0 = je, J0 = (e, t, r) => K0(e, t, r) < 0;
var xo = J0;
const Q0 = je, Z0 = (e, t, r) => Q0(e, t, r) === 0;
var eu = Z0;
const eE = je, tE = (e, t, r) => eE(e, t, r) !== 0;
var tu = tE;
const rE = je, nE = (e, t, r) => rE(e, t, r) >= 0;
var Lo = nE;
const iE = je, oE = (e, t, r) => iE(e, t, r) <= 0;
var Uo = oE;
const aE = eu, sE = tu, lE = Zn, cE = Lo, uE = xo, fE = Uo, dE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return aE(e, r, n);
    case "!=":
      return sE(e, r, n);
    case ">":
      return lE(e, r, n);
    case ">=":
      return cE(e, r, n);
    case "<":
      return uE(e, r, n);
    case "<=":
      return fE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var ru = dE;
const hE = Oe, pE = ir, { safeRe: gn, t: En } = Gr, mE = (e, t) => {
  if (e instanceof hE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? gn[En.COERCEFULL] : gn[En.COERCE]);
  else {
    const l = t.includePrerelease ? gn[En.COERCERTLFULL] : gn[En.COERCERTL];
    let m;
    for (; (m = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || m.index + m[0].length !== r.index + r[0].length) && (r = m), l.lastIndex = m.index + m[1].length + m[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return pE(`${n}.${i}.${o}${a}${s}`, t);
};
var gE = mE;
class EE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var yE = EE, Ri, ls;
function He() {
  if (ls) return Ri;
  ls = 1;
  const e = /\s+/g;
  class t {
    constructor($, P) {
      if (P = i(P), $ instanceof t)
        return $.loose === !!P.loose && $.includePrerelease === !!P.includePrerelease ? $ : new t($.raw, P);
      if ($ instanceof o)
        return this.raw = $.value, this.set = [[$]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = $.trim().replace(e, " "), this.set = this.raw.split("||").map((b) => this.parseRange(b.trim())).filter((b) => b.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const b = this.set[0];
        if (this.set = this.set.filter((N) => !y(N[0])), this.set.length === 0)
          this.set = [b];
        else if (this.set.length > 1) {
          for (const N of this.set)
            if (N.length === 1 && A(N[0])) {
              this.set = [N];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let $ = 0; $ < this.set.length; $++) {
          $ > 0 && (this.formatted += "||");
          const P = this.set[$];
          for (let b = 0; b < P.length; b++)
            b > 0 && (this.formatted += " "), this.formatted += P[b].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange($) {
      const b = ((this.options.includePrerelease && g) | (this.options.loose && _)) + ":" + $, N = n.get(b);
      if (N)
        return N;
      const R = this.options.loose, k = R ? l[m.HYPHENRANGELOOSE] : l[m.HYPHENRANGE];
      $ = $.replace(k, M(this.options.includePrerelease)), a("hyphen replace", $), $ = $.replace(l[m.COMPARATORTRIM], c), a("comparator trim", $), $ = $.replace(l[m.TILDETRIM], f), a("tilde trim", $), $ = $.replace(l[m.CARETTRIM], h), a("caret trim", $);
      let G = $.split(" ").map((U) => S(U, this.options)).join(" ").split(/\s+/).map((U) => B(U, this.options));
      R && (G = G.filter((U) => (a("loose invalid filter", U, this.options), !!U.match(l[m.COMPARATORLOOSE])))), a("range list", G);
      const j = /* @__PURE__ */ new Map(), X = G.map((U) => new o(U, this.options));
      for (const U of X) {
        if (y(U))
          return [U];
        j.set(U.value, U);
      }
      j.size > 1 && j.has("") && j.delete("");
      const ce = [...j.values()];
      return n.set(b, ce), ce;
    }
    intersects($, P) {
      if (!($ instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((b) => T(b, P) && $.set.some((N) => T(N, P) && b.every((R) => N.every((k) => R.intersects(k, P)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test($) {
      if (!$)
        return !1;
      if (typeof $ == "string")
        try {
          $ = new s($, this.options);
        } catch {
          return !1;
        }
      for (let P = 0; P < this.set.length; P++)
        if (z(this.set[P], $, this.options))
          return !0;
      return !1;
    }
  }
  Ri = t;
  const r = yE, n = new r(), i = Do, o = ei(), a = Qn, s = Oe, {
    safeRe: l,
    t: m,
    comparatorTrimReplace: c,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = Gr, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: _ } = Jn, y = (I) => I.value === "<0.0.0-0", A = (I) => I.value === "", T = (I, $) => {
    let P = !0;
    const b = I.slice();
    let N = b.pop();
    for (; P && b.length; )
      P = b.every((R) => N.intersects(R, $)), N = b.pop();
    return P;
  }, S = (I, $) => (a("comp", I, $), I = oe(I, $), a("caret", I), I = x(I, $), a("tildes", I), I = Ne(I, $), a("xrange", I), I = q(I, $), a("stars", I), I), D = (I) => !I || I.toLowerCase() === "x" || I === "*", x = (I, $) => I.trim().split(/\s+/).map((P) => Q(P, $)).join(" "), Q = (I, $) => {
    const P = $.loose ? l[m.TILDELOOSE] : l[m.TILDE];
    return I.replace(P, (b, N, R, k, G) => {
      a("tilde", I, b, N, R, k, G);
      let j;
      return D(N) ? j = "" : D(R) ? j = `>=${N}.0.0 <${+N + 1}.0.0-0` : D(k) ? j = `>=${N}.${R}.0 <${N}.${+R + 1}.0-0` : G ? (a("replaceTilde pr", G), j = `>=${N}.${R}.${k}-${G} <${N}.${+R + 1}.0-0`) : j = `>=${N}.${R}.${k} <${N}.${+R + 1}.0-0`, a("tilde return", j), j;
    });
  }, oe = (I, $) => I.trim().split(/\s+/).map((P) => W(P, $)).join(" "), W = (I, $) => {
    a("caret", I, $);
    const P = $.loose ? l[m.CARETLOOSE] : l[m.CARET], b = $.includePrerelease ? "-0" : "";
    return I.replace(P, (N, R, k, G, j) => {
      a("caret", I, N, R, k, G, j);
      let X;
      return D(R) ? X = "" : D(k) ? X = `>=${R}.0.0${b} <${+R + 1}.0.0-0` : D(G) ? R === "0" ? X = `>=${R}.${k}.0${b} <${R}.${+k + 1}.0-0` : X = `>=${R}.${k}.0${b} <${+R + 1}.0.0-0` : j ? (a("replaceCaret pr", j), R === "0" ? k === "0" ? X = `>=${R}.${k}.${G}-${j} <${R}.${k}.${+G + 1}-0` : X = `>=${R}.${k}.${G}-${j} <${R}.${+k + 1}.0-0` : X = `>=${R}.${k}.${G}-${j} <${+R + 1}.0.0-0`) : (a("no pr"), R === "0" ? k === "0" ? X = `>=${R}.${k}.${G}${b} <${R}.${k}.${+G + 1}-0` : X = `>=${R}.${k}.${G}${b} <${R}.${+k + 1}.0-0` : X = `>=${R}.${k}.${G} <${+R + 1}.0.0-0`), a("caret return", X), X;
    });
  }, Ne = (I, $) => (a("replaceXRanges", I, $), I.split(/\s+/).map((P) => E(P, $)).join(" ")), E = (I, $) => {
    I = I.trim();
    const P = $.loose ? l[m.XRANGELOOSE] : l[m.XRANGE];
    return I.replace(P, (b, N, R, k, G, j) => {
      a("xRange", I, b, N, R, k, G, j);
      const X = D(R), ce = X || D(k), U = ce || D(G), qe = U;
      return N === "=" && qe && (N = ""), j = $.includePrerelease ? "-0" : "", X ? N === ">" || N === "<" ? b = "<0.0.0-0" : b = "*" : N && qe ? (ce && (k = 0), G = 0, N === ">" ? (N = ">=", ce ? (R = +R + 1, k = 0, G = 0) : (k = +k + 1, G = 0)) : N === "<=" && (N = "<", ce ? R = +R + 1 : k = +k + 1), N === "<" && (j = "-0"), b = `${N + R}.${k}.${G}${j}`) : ce ? b = `>=${R}.0.0${j} <${+R + 1}.0.0-0` : U && (b = `>=${R}.${k}.0${j} <${R}.${+k + 1}.0-0`), a("xRange return", b), b;
    });
  }, q = (I, $) => (a("replaceStars", I, $), I.trim().replace(l[m.STAR], "")), B = (I, $) => (a("replaceGTE0", I, $), I.trim().replace(l[$.includePrerelease ? m.GTE0PRE : m.GTE0], "")), M = (I) => ($, P, b, N, R, k, G, j, X, ce, U, qe) => (D(b) ? P = "" : D(N) ? P = `>=${b}.0.0${I ? "-0" : ""}` : D(R) ? P = `>=${b}.${N}.0${I ? "-0" : ""}` : k ? P = `>=${P}` : P = `>=${P}${I ? "-0" : ""}`, D(X) ? j = "" : D(ce) ? j = `<${+X + 1}.0.0-0` : D(U) ? j = `<${X}.${+ce + 1}.0-0` : qe ? j = `<=${X}.${ce}.${U}-${qe}` : I ? j = `<${X}.${ce}.${+U + 1}-0` : j = `<=${j}`, `${P} ${j}`.trim()), z = (I, $, P) => {
    for (let b = 0; b < I.length; b++)
      if (!I[b].test($))
        return !1;
    if ($.prerelease.length && !P.includePrerelease) {
      for (let b = 0; b < I.length; b++)
        if (a(I[b].semver), I[b].semver !== o.ANY && I[b].semver.prerelease.length > 0) {
          const N = I[b].semver;
          if (N.major === $.major && N.minor === $.minor && N.patch === $.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ri;
}
var Pi, cs;
function ei() {
  if (cs) return Pi;
  cs = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, f) {
      if (f = r(f), c instanceof t) {
        if (c.loose === !!f.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), a("comparator", c, f), this.options = f, this.loose = !!f.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(c) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = c.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (a("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new s(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, f) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, f).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, f).test(c.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, f) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, f) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Pi = t;
  const r = Do, { safeRe: n, t: i } = Gr, o = ru, a = Qn, s = Oe, l = He();
  return Pi;
}
const vE = He(), wE = (e, t, r) => {
  try {
    t = new vE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ti = wE;
const _E = He(), AE = (e, t) => new _E(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var SE = AE;
const TE = Oe, CE = He(), bE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new CE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new TE(n, r));
  }), n;
};
var $E = bE;
const OE = Oe, IE = He(), RE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new IE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new OE(n, r));
  }), n;
};
var PE = RE;
const Ni = Oe, NE = He(), us = Zn, DE = (e, t) => {
  e = new NE(e, t);
  let r = new Ni("0.0.0");
  if (e.test(r) || (r = new Ni("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Ni(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || us(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || us(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var FE = DE;
const xE = He(), LE = (e, t) => {
  try {
    return new xE(e, t).range || "*";
  } catch {
    return null;
  }
};
var UE = LE;
const kE = Oe, nu = ei(), { ANY: ME } = nu, BE = He(), jE = ti, fs = Zn, ds = xo, HE = Uo, qE = Lo, GE = (e, t, r, n) => {
  e = new kE(e, n), t = new BE(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = fs, o = HE, a = ds, s = ">", l = ">=";
      break;
    case "<":
      i = ds, o = qE, a = fs, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (jE(e, t, n))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const c = t.set[m];
    let f = null, h = null;
    if (c.forEach((g) => {
      g.semver === ME && (g = new nu(">=0.0.0")), f = f || g, h = h || g, i(g.semver, f.semver, n) ? f = g : a(g.semver, h.semver, n) && (h = g);
    }), f.operator === s || f.operator === l || (!h.operator || h.operator === s) && o(e, h.semver))
      return !1;
    if (h.operator === l && a(e, h.semver))
      return !1;
  }
  return !0;
};
var ko = GE;
const VE = ko, WE = (e, t, r) => VE(e, t, ">", r);
var YE = WE;
const zE = ko, XE = (e, t, r) => zE(e, t, "<", r);
var KE = XE;
const hs = He(), JE = (e, t, r) => (e = new hs(e, r), t = new hs(t, r), e.intersects(t, r));
var QE = JE;
const ZE = ti, ey = je;
var ty = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((c, f) => ey(c, f, r));
  for (const c of a)
    ZE(c, t, r) ? (o = c, i || (i = c)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [c, f] of n)
    c === f ? s.push(c) : !f && c === a[0] ? s.push("*") : f ? c === a[0] ? s.push(`<=${f}`) : s.push(`${c} - ${f}`) : s.push(`>=${c}`);
  const l = s.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < m.length ? l : t;
};
const ps = He(), Mo = ei(), { ANY: Di } = Mo, hr = ti, Bo = je, ry = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new ps(e, r), t = new ps(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = iy(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, ny = [new Mo(">=0.0.0-0")], ms = [new Mo(">=0.0.0")], iy = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Di) {
    if (t.length === 1 && t[0].semver === Di)
      return !0;
    r.includePrerelease ? e = ny : e = ms;
  }
  if (t.length === 1 && t[0].semver === Di) {
    if (r.includePrerelease)
      return !0;
    t = ms;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = gs(i, g, r) : g.operator === "<" || g.operator === "<=" ? o = Es(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Bo(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (i && !hr(g, String(i), r) || o && !hr(g, String(o), r))
      return null;
    for (const _ of t)
      if (!hr(g, String(_), r))
        return !1;
    return !0;
  }
  let s, l, m, c, f = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (c = c || g.operator === ">" || g.operator === ">=", m = m || g.operator === "<" || g.operator === "<=", i) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === ">" || g.operator === ">=") {
        if (s = gs(i, g, r), s === g && s !== i)
          return !1;
      } else if (i.operator === ">=" && !hr(i.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (l = Es(o, g, r), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !hr(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && m && !o && a !== 0 || o && c && !i && a !== 0 || h || f);
}, gs = (e, t, r) => {
  if (!e)
    return t;
  const n = Bo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Es = (e, t, r) => {
  if (!e)
    return t;
  const n = Bo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var oy = ry;
const Fi = Gr, ys = Jn, ay = Oe, vs = Zc, sy = ir, ly = p0, cy = E0, uy = v0, fy = _0, dy = T0, hy = $0, py = R0, my = D0, gy = je, Ey = U0, yy = B0, vy = Fo, wy = G0, _y = Y0, Ay = Zn, Sy = xo, Ty = eu, Cy = tu, by = Lo, $y = Uo, Oy = ru, Iy = gE, Ry = ei(), Py = He(), Ny = ti, Dy = SE, Fy = $E, xy = PE, Ly = FE, Uy = UE, ky = ko, My = YE, By = KE, jy = QE, Hy = ty, qy = oy;
var iu = {
  parse: sy,
  valid: ly,
  clean: cy,
  inc: uy,
  diff: fy,
  major: dy,
  minor: hy,
  patch: py,
  prerelease: my,
  compare: gy,
  rcompare: Ey,
  compareLoose: yy,
  compareBuild: vy,
  sort: wy,
  rsort: _y,
  gt: Ay,
  lt: Sy,
  eq: Ty,
  neq: Cy,
  gte: by,
  lte: $y,
  cmp: Oy,
  coerce: Iy,
  Comparator: Ry,
  Range: Py,
  satisfies: Ny,
  toComparators: Dy,
  maxSatisfying: Fy,
  minSatisfying: xy,
  minVersion: Ly,
  validRange: Uy,
  outside: ky,
  gtr: My,
  ltr: By,
  intersects: jy,
  simplifyRange: Hy,
  subset: qy,
  SemVer: ay,
  re: Fi.re,
  src: Fi.src,
  tokens: Fi.t,
  SEMVER_SPEC_VERSION: ys.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: ys.RELEASE_TYPES,
  compareIdentifiers: vs.compareIdentifiers,
  rcompareIdentifiers: vs.rcompareIdentifiers
}, Vr = {}, kn = { exports: {} };
kn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", m = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", h = "[object Error]", g = "[object Function]", _ = "[object GeneratorFunction]", y = "[object Map]", A = "[object Number]", T = "[object Null]", S = "[object Object]", D = "[object Promise]", x = "[object Proxy]", Q = "[object RegExp]", oe = "[object Set]", W = "[object String]", Ne = "[object Symbol]", E = "[object Undefined]", q = "[object WeakMap]", B = "[object ArrayBuffer]", M = "[object DataView]", z = "[object Float32Array]", I = "[object Float64Array]", $ = "[object Int8Array]", P = "[object Int16Array]", b = "[object Int32Array]", N = "[object Uint8Array]", R = "[object Uint8ClampedArray]", k = "[object Uint16Array]", G = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, X = /^\[object .+?Constructor\]$/, ce = /^(?:0|[1-9]\d*)$/, U = {};
  U[z] = U[I] = U[$] = U[P] = U[b] = U[N] = U[R] = U[k] = U[G] = !0, U[s] = U[l] = U[B] = U[c] = U[M] = U[f] = U[h] = U[g] = U[y] = U[A] = U[S] = U[Q] = U[oe] = U[W] = U[q] = !1;
  var qe = typeof Ae == "object" && Ae && Ae.Object === Object && Ae, d = typeof self == "object" && self && self.Object === Object && self, u = qe || d || Function("return this")(), C = t && !t.nodeType && t, w = C && !0 && e && !e.nodeType && e, Y = w && w.exports === C, Z = Y && qe.process, ne = function() {
    try {
      return Z && Z.binding && Z.binding("util");
    } catch {
    }
  }(), he = ne && ne.isTypedArray;
  function Ee(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length, J = 0, H = []; ++O < F; ) {
      var ie = p[O];
      v(ie, O, p) && (H[J++] = ie);
    }
    return H;
  }
  function Ze(p, v) {
    for (var O = -1, F = v.length, J = p.length; ++O < F; )
      p[J + O] = v[O];
    return p;
  }
  function se(p, v) {
    for (var O = -1, F = p == null ? 0 : p.length; ++O < F; )
      if (v(p[O], O, p))
        return !0;
    return !1;
  }
  function Ue(p, v) {
    for (var O = -1, F = Array(p); ++O < p; )
      F[O] = v(O);
    return F;
  }
  function ui(p) {
    return function(v) {
      return p(v);
    };
  }
  function Xr(p, v) {
    return p.has(v);
  }
  function ar(p, v) {
    return p == null ? void 0 : p[v];
  }
  function Kr(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F, J) {
      O[++v] = [J, F];
    }), O;
  }
  function vu(p, v) {
    return function(O) {
      return p(v(O));
    };
  }
  function wu(p) {
    var v = -1, O = Array(p.size);
    return p.forEach(function(F) {
      O[++v] = F;
    }), O;
  }
  var _u = Array.prototype, Au = Function.prototype, Jr = Object.prototype, fi = u["__core-js_shared__"], Go = Au.toString, Ge = Jr.hasOwnProperty, Vo = function() {
    var p = /[^.]+$/.exec(fi && fi.keys && fi.keys.IE_PROTO || "");
    return p ? "Symbol(src)_1." + p : "";
  }(), Wo = Jr.toString, Su = RegExp(
    "^" + Go.call(Ge).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Yo = Y ? u.Buffer : void 0, Qr = u.Symbol, zo = u.Uint8Array, Xo = Jr.propertyIsEnumerable, Tu = _u.splice, yt = Qr ? Qr.toStringTag : void 0, Ko = Object.getOwnPropertySymbols, Cu = Yo ? Yo.isBuffer : void 0, bu = vu(Object.keys, Object), di = xt(u, "DataView"), sr = xt(u, "Map"), hi = xt(u, "Promise"), pi = xt(u, "Set"), mi = xt(u, "WeakMap"), lr = xt(Object, "create"), $u = _t(di), Ou = _t(sr), Iu = _t(hi), Ru = _t(pi), Pu = _t(mi), Jo = Qr ? Qr.prototype : void 0, gi = Jo ? Jo.valueOf : void 0;
  function vt(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Nu() {
    this.__data__ = lr ? lr(null) : {}, this.size = 0;
  }
  function Du(p) {
    var v = this.has(p) && delete this.__data__[p];
    return this.size -= v ? 1 : 0, v;
  }
  function Fu(p) {
    var v = this.__data__;
    if (lr) {
      var O = v[p];
      return O === n ? void 0 : O;
    }
    return Ge.call(v, p) ? v[p] : void 0;
  }
  function xu(p) {
    var v = this.__data__;
    return lr ? v[p] !== void 0 : Ge.call(v, p);
  }
  function Lu(p, v) {
    var O = this.__data__;
    return this.size += this.has(p) ? 0 : 1, O[p] = lr && v === void 0 ? n : v, this;
  }
  vt.prototype.clear = Nu, vt.prototype.delete = Du, vt.prototype.get = Fu, vt.prototype.has = xu, vt.prototype.set = Lu;
  function ze(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Uu() {
    this.__data__ = [], this.size = 0;
  }
  function ku(p) {
    var v = this.__data__, O = en(v, p);
    if (O < 0)
      return !1;
    var F = v.length - 1;
    return O == F ? v.pop() : Tu.call(v, O, 1), --this.size, !0;
  }
  function Mu(p) {
    var v = this.__data__, O = en(v, p);
    return O < 0 ? void 0 : v[O][1];
  }
  function Bu(p) {
    return en(this.__data__, p) > -1;
  }
  function ju(p, v) {
    var O = this.__data__, F = en(O, p);
    return F < 0 ? (++this.size, O.push([p, v])) : O[F][1] = v, this;
  }
  ze.prototype.clear = Uu, ze.prototype.delete = ku, ze.prototype.get = Mu, ze.prototype.has = Bu, ze.prototype.set = ju;
  function wt(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.clear(); ++v < O; ) {
      var F = p[v];
      this.set(F[0], F[1]);
    }
  }
  function Hu() {
    this.size = 0, this.__data__ = {
      hash: new vt(),
      map: new (sr || ze)(),
      string: new vt()
    };
  }
  function qu(p) {
    var v = tn(this, p).delete(p);
    return this.size -= v ? 1 : 0, v;
  }
  function Gu(p) {
    return tn(this, p).get(p);
  }
  function Vu(p) {
    return tn(this, p).has(p);
  }
  function Wu(p, v) {
    var O = tn(this, p), F = O.size;
    return O.set(p, v), this.size += O.size == F ? 0 : 1, this;
  }
  wt.prototype.clear = Hu, wt.prototype.delete = qu, wt.prototype.get = Gu, wt.prototype.has = Vu, wt.prototype.set = Wu;
  function Zr(p) {
    var v = -1, O = p == null ? 0 : p.length;
    for (this.__data__ = new wt(); ++v < O; )
      this.add(p[v]);
  }
  function Yu(p) {
    return this.__data__.set(p, n), this;
  }
  function zu(p) {
    return this.__data__.has(p);
  }
  Zr.prototype.add = Zr.prototype.push = Yu, Zr.prototype.has = zu;
  function et(p) {
    var v = this.__data__ = new ze(p);
    this.size = v.size;
  }
  function Xu() {
    this.__data__ = new ze(), this.size = 0;
  }
  function Ku(p) {
    var v = this.__data__, O = v.delete(p);
    return this.size = v.size, O;
  }
  function Ju(p) {
    return this.__data__.get(p);
  }
  function Qu(p) {
    return this.__data__.has(p);
  }
  function Zu(p, v) {
    var O = this.__data__;
    if (O instanceof ze) {
      var F = O.__data__;
      if (!sr || F.length < r - 1)
        return F.push([p, v]), this.size = ++O.size, this;
      O = this.__data__ = new wt(F);
    }
    return O.set(p, v), this.size = O.size, this;
  }
  et.prototype.clear = Xu, et.prototype.delete = Ku, et.prototype.get = Ju, et.prototype.has = Qu, et.prototype.set = Zu;
  function ef(p, v) {
    var O = rn(p), F = !O && gf(p), J = !O && !F && Ei(p), H = !O && !F && !J && aa(p), ie = O || F || J || H, ue = ie ? Ue(p.length, String) : [], pe = ue.length;
    for (var ee in p)
      Ge.call(p, ee) && !(ie && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ee == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      J && (ee == "offset" || ee == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      H && (ee == "buffer" || ee == "byteLength" || ee == "byteOffset") || // Skip index properties.
      ff(ee, pe))) && ue.push(ee);
    return ue;
  }
  function en(p, v) {
    for (var O = p.length; O--; )
      if (ra(p[O][0], v))
        return O;
    return -1;
  }
  function tf(p, v, O) {
    var F = v(p);
    return rn(p) ? F : Ze(F, O(p));
  }
  function cr(p) {
    return p == null ? p === void 0 ? E : T : yt && yt in Object(p) ? cf(p) : mf(p);
  }
  function Qo(p) {
    return ur(p) && cr(p) == s;
  }
  function Zo(p, v, O, F, J) {
    return p === v ? !0 : p == null || v == null || !ur(p) && !ur(v) ? p !== p && v !== v : rf(p, v, O, F, Zo, J);
  }
  function rf(p, v, O, F, J, H) {
    var ie = rn(p), ue = rn(v), pe = ie ? l : tt(p), ee = ue ? l : tt(v);
    pe = pe == s ? S : pe, ee = ee == s ? S : ee;
    var De = pe == S, ke = ee == S, ye = pe == ee;
    if (ye && Ei(p)) {
      if (!Ei(v))
        return !1;
      ie = !0, De = !1;
    }
    if (ye && !De)
      return H || (H = new et()), ie || aa(p) ? ea(p, v, O, F, J, H) : sf(p, v, pe, O, F, J, H);
    if (!(O & i)) {
      var Fe = De && Ge.call(p, "__wrapped__"), xe = ke && Ge.call(v, "__wrapped__");
      if (Fe || xe) {
        var rt = Fe ? p.value() : p, Xe = xe ? v.value() : v;
        return H || (H = new et()), J(rt, Xe, O, F, H);
      }
    }
    return ye ? (H || (H = new et()), lf(p, v, O, F, J, H)) : !1;
  }
  function nf(p) {
    if (!oa(p) || hf(p))
      return !1;
    var v = na(p) ? Su : X;
    return v.test(_t(p));
  }
  function of(p) {
    return ur(p) && ia(p.length) && !!U[cr(p)];
  }
  function af(p) {
    if (!pf(p))
      return bu(p);
    var v = [];
    for (var O in Object(p))
      Ge.call(p, O) && O != "constructor" && v.push(O);
    return v;
  }
  function ea(p, v, O, F, J, H) {
    var ie = O & i, ue = p.length, pe = v.length;
    if (ue != pe && !(ie && pe > ue))
      return !1;
    var ee = H.get(p);
    if (ee && H.get(v))
      return ee == v;
    var De = -1, ke = !0, ye = O & o ? new Zr() : void 0;
    for (H.set(p, v), H.set(v, p); ++De < ue; ) {
      var Fe = p[De], xe = v[De];
      if (F)
        var rt = ie ? F(xe, Fe, De, v, p, H) : F(Fe, xe, De, p, v, H);
      if (rt !== void 0) {
        if (rt)
          continue;
        ke = !1;
        break;
      }
      if (ye) {
        if (!se(v, function(Xe, At) {
          if (!Xr(ye, At) && (Fe === Xe || J(Fe, Xe, O, F, H)))
            return ye.push(At);
        })) {
          ke = !1;
          break;
        }
      } else if (!(Fe === xe || J(Fe, xe, O, F, H))) {
        ke = !1;
        break;
      }
    }
    return H.delete(p), H.delete(v), ke;
  }
  function sf(p, v, O, F, J, H, ie) {
    switch (O) {
      case M:
        if (p.byteLength != v.byteLength || p.byteOffset != v.byteOffset)
          return !1;
        p = p.buffer, v = v.buffer;
      case B:
        return !(p.byteLength != v.byteLength || !H(new zo(p), new zo(v)));
      case c:
      case f:
      case A:
        return ra(+p, +v);
      case h:
        return p.name == v.name && p.message == v.message;
      case Q:
      case W:
        return p == v + "";
      case y:
        var ue = Kr;
      case oe:
        var pe = F & i;
        if (ue || (ue = wu), p.size != v.size && !pe)
          return !1;
        var ee = ie.get(p);
        if (ee)
          return ee == v;
        F |= o, ie.set(p, v);
        var De = ea(ue(p), ue(v), F, J, H, ie);
        return ie.delete(p), De;
      case Ne:
        if (gi)
          return gi.call(p) == gi.call(v);
    }
    return !1;
  }
  function lf(p, v, O, F, J, H) {
    var ie = O & i, ue = ta(p), pe = ue.length, ee = ta(v), De = ee.length;
    if (pe != De && !ie)
      return !1;
    for (var ke = pe; ke--; ) {
      var ye = ue[ke];
      if (!(ie ? ye in v : Ge.call(v, ye)))
        return !1;
    }
    var Fe = H.get(p);
    if (Fe && H.get(v))
      return Fe == v;
    var xe = !0;
    H.set(p, v), H.set(v, p);
    for (var rt = ie; ++ke < pe; ) {
      ye = ue[ke];
      var Xe = p[ye], At = v[ye];
      if (F)
        var sa = ie ? F(At, Xe, ye, v, p, H) : F(Xe, At, ye, p, v, H);
      if (!(sa === void 0 ? Xe === At || J(Xe, At, O, F, H) : sa)) {
        xe = !1;
        break;
      }
      rt || (rt = ye == "constructor");
    }
    if (xe && !rt) {
      var nn = p.constructor, on = v.constructor;
      nn != on && "constructor" in p && "constructor" in v && !(typeof nn == "function" && nn instanceof nn && typeof on == "function" && on instanceof on) && (xe = !1);
    }
    return H.delete(p), H.delete(v), xe;
  }
  function ta(p) {
    return tf(p, vf, uf);
  }
  function tn(p, v) {
    var O = p.__data__;
    return df(v) ? O[typeof v == "string" ? "string" : "hash"] : O.map;
  }
  function xt(p, v) {
    var O = ar(p, v);
    return nf(O) ? O : void 0;
  }
  function cf(p) {
    var v = Ge.call(p, yt), O = p[yt];
    try {
      p[yt] = void 0;
      var F = !0;
    } catch {
    }
    var J = Wo.call(p);
    return F && (v ? p[yt] = O : delete p[yt]), J;
  }
  var uf = Ko ? function(p) {
    return p == null ? [] : (p = Object(p), Ee(Ko(p), function(v) {
      return Xo.call(p, v);
    }));
  } : wf, tt = cr;
  (di && tt(new di(new ArrayBuffer(1))) != M || sr && tt(new sr()) != y || hi && tt(hi.resolve()) != D || pi && tt(new pi()) != oe || mi && tt(new mi()) != q) && (tt = function(p) {
    var v = cr(p), O = v == S ? p.constructor : void 0, F = O ? _t(O) : "";
    if (F)
      switch (F) {
        case $u:
          return M;
        case Ou:
          return y;
        case Iu:
          return D;
        case Ru:
          return oe;
        case Pu:
          return q;
      }
    return v;
  });
  function ff(p, v) {
    return v = v ?? a, !!v && (typeof p == "number" || ce.test(p)) && p > -1 && p % 1 == 0 && p < v;
  }
  function df(p) {
    var v = typeof p;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? p !== "__proto__" : p === null;
  }
  function hf(p) {
    return !!Vo && Vo in p;
  }
  function pf(p) {
    var v = p && p.constructor, O = typeof v == "function" && v.prototype || Jr;
    return p === O;
  }
  function mf(p) {
    return Wo.call(p);
  }
  function _t(p) {
    if (p != null) {
      try {
        return Go.call(p);
      } catch {
      }
      try {
        return p + "";
      } catch {
      }
    }
    return "";
  }
  function ra(p, v) {
    return p === v || p !== p && v !== v;
  }
  var gf = Qo(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Qo : function(p) {
    return ur(p) && Ge.call(p, "callee") && !Xo.call(p, "callee");
  }, rn = Array.isArray;
  function Ef(p) {
    return p != null && ia(p.length) && !na(p);
  }
  var Ei = Cu || _f;
  function yf(p, v) {
    return Zo(p, v);
  }
  function na(p) {
    if (!oa(p))
      return !1;
    var v = cr(p);
    return v == g || v == _ || v == m || v == x;
  }
  function ia(p) {
    return typeof p == "number" && p > -1 && p % 1 == 0 && p <= a;
  }
  function oa(p) {
    var v = typeof p;
    return p != null && (v == "object" || v == "function");
  }
  function ur(p) {
    return p != null && typeof p == "object";
  }
  var aa = he ? ui(he) : of;
  function vf(p) {
    return Ef(p) ? ef(p) : af(p);
  }
  function wf() {
    return [];
  }
  function _f() {
    return !1;
  }
  e.exports = yf;
})(kn, kn.exports);
var Gy = kn.exports;
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.DownloadedUpdateHelper = void 0;
Vr.createTempUpdateFile = Xy;
const Vy = kr, Wy = mt, ws = Gy, Tt = gt, _r = re;
class Yy {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return _r.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return ws(this.versionInfo, r) && ws(this.fileInfo.info, n.info) && await (0, Tt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, Tt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Tt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Tt.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, Tt.readJson)(n);
    } catch (m) {
      let c = "No cached update info available";
      return m.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${m.message})`), r.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = _r.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Tt.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await zy(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return _r.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Vr.DownloadedUpdateHelper = Yy;
function zy(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, Vy.createHash)(t);
    a.on("error", o).setEncoding(r), (0, Wy.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function Xy(e, t, r) {
  let n = 0, i = _r.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Tt.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = _r.join(t, `${n++}-${e}`);
    }
  return i;
}
var ri = {}, jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.getAppCacheDir = Jy;
const xi = re, Ky = Bn;
function Jy() {
  const e = (0, Ky.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || xi.join(e, "AppData", "Local") : process.platform === "darwin" ? t = xi.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || xi.join(e, ".cache"), t;
}
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.ElectronAppAdapter = void 0;
const _s = re, Qy = jo;
class Zy {
  constructor(t = Rt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? _s.join(process.resourcesPath, "app-update.yml") : _s.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Qy.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
ri.ElectronAppAdapter = Zy;
var ou = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = de;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Rt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, m, c) => {
        const f = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: a,
          options: s,
          onCancel: c,
          callback: (h) => {
            h == null ? l(a) : m(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Rt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, m) {
      o.on("redirect", (c, f, h) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(ou);
var Wr = {}, Le = {}, ev = "[object Symbol]", au = /[\\^$.*+?()[\]{}|]/g, tv = RegExp(au.source), rv = typeof Ae == "object" && Ae && Ae.Object === Object && Ae, nv = typeof self == "object" && self && self.Object === Object && self, iv = rv || nv || Function("return this")(), ov = Object.prototype, av = ov.toString, As = iv.Symbol, Ss = As ? As.prototype : void 0, Ts = Ss ? Ss.toString : void 0;
function sv(e) {
  if (typeof e == "string")
    return e;
  if (cv(e))
    return Ts ? Ts.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function lv(e) {
  return !!e && typeof e == "object";
}
function cv(e) {
  return typeof e == "symbol" || lv(e) && av.call(e) == ev;
}
function uv(e) {
  return e == null ? "" : sv(e);
}
function fv(e) {
  return e = uv(e), e && tv.test(e) ? e.replace(au, "\\$&") : e;
}
var dv = fv;
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.newBaseUrl = pv;
Le.newUrlFromBase = ao;
Le.getChannelFilename = mv;
Le.blockmapFiles = gv;
const su = tr, hv = dv;
function pv(e) {
  const t = new su.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function ao(e, t, r = !1) {
  const n = new su.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function mv(e) {
  return `${e}.yml`;
}
function gv(e, t, r) {
  const n = ao(`${e.pathname}.blockmap`, e);
  return [ao(`${e.pathname.replace(new RegExp(hv(r), "g"), t)}.blockmap`, e), n];
}
var le = {};
Object.defineProperty(le, "__esModule", { value: !0 });
le.Provider = void 0;
le.findFile = vv;
le.parseUpdateInfo = wv;
le.getFileList = lu;
le.resolveFiles = _v;
const ht = de, Ev = ge, Cs = Le;
class yv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, ht.configureRequestUrl)(t, n), n;
  }
}
le.Provider = yv;
function vv(e, t, r) {
  if (e.length === 0)
    throw (0, ht.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function wv(e, t, r) {
  if (e == null)
    throw (0, ht.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, Ev.load)(e);
  } catch (i) {
    throw (0, ht.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function lu(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, ht.newError)(`No files provided: ${(0, ht.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function _v(e, t, r = (n) => n) {
  const i = lu(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, ht.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ht.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Cs.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Cs.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.GenericProvider = void 0;
const bs = de, Li = Le, Ui = le;
class Av extends Ui.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Li.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Li.getChannelFilename)(this.channel), r = (0, Li.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Ui.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof bs.HttpError && i.statusCode === 404)
          throw (0, bs.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Ui.resolveFiles)(t, this.baseUrl);
  }
}
Wr.GenericProvider = Av;
var ni = {}, ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.BitbucketProvider = void 0;
const $s = de, ki = Le, Mi = le;
class Sv extends Mi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ki.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new $s.CancellationToken(), r = (0, ki.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ki.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Mi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, $s.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Mi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ii.BitbucketProvider = Sv;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.GitHubProvider = pt.BaseGitHubProvider = void 0;
pt.computeReleaseNotes = uu;
const Ke = de, Wt = iu, Tv = tr, Yt = Le, so = le, Bi = /\/tag\/([^/]+)$/;
class cu extends so.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Yt.newBaseUrl)((0, Ke.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Yt.newBaseUrl)((0, Ke.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
pt.BaseGitHubProvider = cu;
class Cv extends cu {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new Ke.CancellationToken(), s = await this.httpRequest((0, Yt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, Ke.parseXml)(s);
    let m = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const A = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Wt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (A === null)
          c = Bi.exec(m.element("link").attribute("href"))[1];
        else
          for (const T of l.getElements("entry")) {
            const S = Bi.exec(T.element("link").attribute("href"));
            if (S === null)
              continue;
            const D = S[1], x = ((n = Wt.prerelease(D)) === null || n === void 0 ? void 0 : n[0]) || null, Q = !A || ["alpha", "beta"].includes(A), oe = x !== null && !["alpha", "beta"].includes(String(x));
            if (Q && !oe && !(A === "beta" && x === "alpha")) {
              c = D;
              break;
            }
            if (x && x === A) {
              c = D;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(a);
        for (const A of l.getElements("entry"))
          if (Bi.exec(A.element("link").attribute("href"))[1] === c) {
            m = A;
            break;
          }
      }
    } catch (A) {
      throw (0, Ke.newError)(`Cannot parse releases feed: ${A.stack || A.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Ke.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", g = "";
    const _ = async (A) => {
      h = (0, Yt.getChannelFilename)(A), g = (0, Yt.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const T = this.createRequestOptions(g);
      try {
        return await this.executor.request(T, a);
      } catch (S) {
        throw S instanceof Ke.HttpError && S.statusCode === 404 ? (0, Ke.newError)(`Cannot find ${h} in the latest release artifacts (${g}): ${S.stack || S.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : S;
      }
    };
    try {
      let A = this.channel;
      this.updater.allowPrerelease && (!((i = Wt.prerelease(c)) === null || i === void 0) && i[0]) && (A = this.getCustomChannelName(String((o = Wt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), f = await _(A);
    } catch (A) {
      if (this.updater.allowPrerelease)
        f = await _(this.getDefaultChannelName());
      else
        throw A;
    }
    const y = (0, so.parseUpdateInfo)(f, h, g);
    return y.releaseName == null && (y.releaseName = m.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = uu(this.updater.currentVersion, this.updater.fullChangelog, l, m)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Yt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Tv.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Ke.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, so.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
pt.GitHubProvider = Cv;
function Os(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function uu(e, t, r, n) {
  if (!t)
    return Os(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Wt.lt(e, a) && i.push({
      version: a,
      note: Os(o)
    });
  }
  return i.sort((o, a) => Wt.rcompare(o.version, a.version));
}
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.KeygenProvider = void 0;
const Is = de, ji = Le, Hi = le;
class bv extends Hi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, ji.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Is.CancellationToken(), r = (0, ji.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ji.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Hi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Is.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Hi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
oi.KeygenProvider = bv;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.PrivateGitHubProvider = void 0;
const Mt = de, $v = ge, Ov = re, Rs = tr, Ps = Le, Iv = pt, Rv = le;
class Pv extends Iv.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Mt.CancellationToken(), r = (0, Ps.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Mt.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Rs.URL(i.url);
    let a;
    try {
      a = (0, $v.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Mt.HttpError && s.statusCode === 404 ? (0, Mt.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Ps.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Mt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Rv.getFileList)(t).map((r) => {
      const n = Ov.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Mt.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Rs.URL(i.url),
        info: r
      };
    });
  }
}
ai.PrivateGitHubProvider = Pv;
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.isUrlProbablySupportMultiRangeRequests = fu;
ni.createClient = Lv;
const yn = de, Nv = ii, Ns = Wr, Dv = pt, Fv = oi, xv = ai;
function fu(e) {
  return !e.includes("s3.amazonaws.com");
}
function Lv(e, t, r) {
  if (typeof e == "string")
    throw (0, yn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Dv.GitHubProvider(i, t, r) : new xv.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Nv.BitbucketProvider(e, t, r);
    case "keygen":
      return new Fv.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Ns.GenericProvider({
        provider: "generic",
        url: (0, yn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Ns.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && fu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, yn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, yn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var si = {}, Yr = {}, or = {}, Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.OperationKind = void 0;
Ft.computeOperations = Uv;
var $t;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})($t || (Ft.OperationKind = $t = {}));
function Uv(e, t, r) {
  const n = Fs(e.files), i = Fs(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, m = n.get(l);
  if (m == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: g } = Mv(n.get(l), m.offset, r);
  let _ = a.offset;
  for (let y = 0; y < c.checksums.length; _ += c.sizes[y], y++) {
    const A = c.sizes[y], T = c.checksums[y];
    let S = h.get(T);
    S != null && g.get(T) !== A && (r.warn(`Checksum ("${T}") matches, but size differs (old: ${g.get(T)}, new: ${A})`), S = void 0), S === void 0 ? (f++, o != null && o.kind === $t.DOWNLOAD && o.end === _ ? o.end += A : (o = {
      kind: $t.DOWNLOAD,
      start: _,
      end: _ + A
      // oldBlocks: null,
    }, Ds(o, s, T, y))) : o != null && o.kind === $t.COPY && o.end === S ? o.end += A : (o = {
      kind: $t.COPY,
      start: S,
      end: S + A
      // oldBlocks: [checksum]
    }, Ds(o, s, T, y));
  }
  return f > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${f} changed blocks`), s;
}
const kv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Ds(e, t, r, n) {
  if (kv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${$t[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function Mv(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], m = i.get(s);
    if (m === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const c = m === l ? "(same size)" : `(size: ${m}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Fs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(or, "__esModule", { value: !0 });
or.DataSplitter = void 0;
or.copyData = du;
const vn = de, Bv = mt, jv = Ur, Hv = Ft, xs = Buffer.from(`\r
\r
`);
var it;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(it || (it = {}));
function du(e, t, r, n, i) {
  const o = (0, Bv.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class qv extends jv.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = it.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, vn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === it.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = it.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === it.BODY)
          this.readState = it.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, vn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, vn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = it.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== Hv.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        du(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(xs, r);
    if (n !== -1)
      return n + xs.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, vn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
or.DataSplitter = qv;
var li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.executeTasksUsingMultipleRangeRequests = Gv;
li.checkIsRangesSupported = co;
const lo = de, Ls = or, Us = Ft;
function Gv(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    Vv(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function Vv(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let f = t.start; f < t.end; f++) {
    const h = t.tasks[f];
    h.kind === Us.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, s.set(a, f), a++, l.push(h.end - h.start));
  }
  if (a <= 1) {
    const f = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const g = t.tasks[h++];
      if (g.kind === Us.OperationKind.COPY)
        (0, Ls.copyData)(g, r, t.oldFileFd, i, () => f(h));
      else {
        const _ = e.createRequestOptions();
        _.headers.Range = `bytes=${g.start}-${g.end - 1}`;
        const y = e.httpExecutor.createRequest(_, (A) => {
          co(A, i) && (A.pipe(r, {
            end: !1
          }), A.once("end", () => f(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    f(t.start);
    return;
  }
  const m = e.createRequestOptions();
  m.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(m, (f) => {
    if (!co(f, i))
      return;
    const h = (0, lo.safeGetHeader)(f, "content-type"), g = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (g == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const _ = new Ls.DataSplitter(r, t, s, g[1] || g[2], l, n);
    _.on("error", i), f.pipe(_), f.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function co(e, t) {
  if (e.statusCode >= 400)
    return t((0, lo.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, lo.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.ProgressDifferentialDownloadCallbackTransform = void 0;
const Wv = Ur;
var zt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(zt || (zt = {}));
class Yv extends Wv.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = zt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == zt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = zt.COPY;
  }
  beginRangeDownload() {
    this.operationType = zt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
ci.ProgressDifferentialDownloadCallbackTransform = Yv;
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.DifferentialDownloader = void 0;
const pr = de, qi = gt, zv = mt, Xv = or, Kv = tr, wn = Ft, ks = li, Jv = ci;
class Qv {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, pr.configureRequestUrl)(this.options.newUrl, t), (0, pr.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, wn.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const m = l.end - l.start;
      l.kind === wn.OperationKind.DOWNLOAD ? o += m : a += m;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Ms(s)}, To download: ${Ms(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, qi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, qi.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, qi.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, zv.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const T = [];
        let S = 0;
        for (const x of t)
          x.kind === wn.OperationKind.DOWNLOAD && (T.push(x.end - x.start), S += x.end - x.start);
        const D = {
          expectedByteCounts: T,
          grandTotal: S
        };
        m = new Jv.ProgressDifferentialDownloadCallbackTransform(D, this.options.cancellationToken, this.options.onProgress), l.push(m);
      }
      const c = new pr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            c.validate();
          } catch (T) {
            s(T);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let f = null;
      for (const T of l)
        T.on("error", s), f == null ? f = T : f = f.pipe(T);
      const h = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, ks.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), g(0);
        return;
      }
      let _ = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const A = this.createRequestOptions();
      A.redirect = "manual", g = (T) => {
        var S, D;
        if (T >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const x = t[T++];
        if (x.kind === wn.OperationKind.COPY) {
          m && m.beginFileCopy(), (0, Xv.copyData)(x, h, n, s, () => g(T));
          return;
        }
        const Q = `bytes=${x.start}-${x.end - 1}`;
        A.headers.range = Q, (D = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null || D === void 0 || D.call(S, `download range: ${Q}`), m && m.beginRangeDownload();
        const oe = this.httpExecutor.createRequest(A, (W) => {
          W.on("error", s), W.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), W.statusCode >= 400 && s((0, pr.createHttpError)(W)), W.pipe(h, {
            end: !1
          }), W.once("end", () => {
            m && m.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => g(T), 1e3)) : g(T);
          });
        });
        oe.on("redirect", (W, Ne, E) => {
          this.logger.info(`Redirect to ${Zv(E)}`), y = E, (0, pr.configureRequestUrl)(new Kv.URL(y), A), oe.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(oe, s), oe.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, ks.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Yr.DifferentialDownloader = Qv;
function Ms(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Zv(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(si, "__esModule", { value: !0 });
si.GenericDifferentialDownloader = void 0;
const ew = Yr;
class tw extends ew.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
si.GenericDifferentialDownloader = tw;
var Et = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = de;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      n(this.emitter, "login", o);
    }
    progress(o) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      n(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      n(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = r;
  function n(i, o, a) {
    i.on(o, a);
  }
})(Et);
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.NoOpLogger = ut.AppUpdater = void 0;
const _e = de, rw = kr, nw = Bn, iw = al, Bt = gt, ow = ge, Gi = Kn, St = re, Ct = iu, Bs = Vr, aw = ri, js = ou, sw = Wr, Vi = ni, lw = ll, cw = Le, uw = si, jt = Et;
class Ho extends iw.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, _e.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, _e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, js.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new hu();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Gi.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new jt.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this.clientPromise = null, this.stagingUserIdPromise = new Gi.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Gi.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), r == null ? (this.app = new aw.ElectronAppAdapter(), this.httpExecutor = new js.ElectronHttpExecutor((o, a) => this.emit("login", o, a))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Ct.parse)(n);
    if (i == null)
      throw (0, _e.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = fw(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new sw.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, Vi.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, Vi.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = Ho.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Rt.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, a = _e.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${a}, user id: ${i}`), a < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Ct.parse)(t.version);
    if (r == null)
      throw (0, _e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Ct.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const o = (0, Ct.gt)(r, n), a = (0, Ct.lt)(r, n);
    return o ? !0 : this.allowDowngrade && a;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, nw.release)();
    if (r)
      try {
        if ((0, Ct.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, Vi.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new _e.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, _e.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new _e.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, _e.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof _e.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(jt.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, ow.load)(await (0, Bt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = St.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, Bt.readFile)(t, "utf-8");
      if (_e.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = _e.UUID.v5((0, rw.randomBytes)(4096), _e.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, Bt.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = St.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Bs.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(jt.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (S) => this.emit(jt.DOWNLOAD_PROGRESS, S));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, a = r.packageInfo;
    function s() {
      const S = decodeURIComponent(t.fileInfo.url.pathname);
      return S.endsWith(`.${t.fileExtension}`) ? St.basename(S) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), m = l.cacheDirForPendingUpdate;
    await (0, Bt.mkdir)(m, { recursive: !0 });
    const c = s();
    let f = St.join(m, c);
    const h = a == null ? null : St.join(m, `package-${o}${St.extname(a.path) || ".7z"}`), g = async (S) => (await l.setDownloadedFile(f, h, i, r, c, S), await t.done({
      ...i,
      downloadedFile: f
    }), h == null ? [f] : [f, h]), _ = this._logger, y = await l.validateDownloadedPath(f, i, r, _);
    if (y != null)
      return f = y, await g(!1);
    const A = async () => (await l.clear().catch(() => {
    }), await (0, Bt.unlink)(f).catch(() => {
    })), T = await (0, Bs.createTempUpdateFile)(`temp-${c}`, m, _);
    try {
      await t.task(T, n, h, A), await (0, _e.retry)(() => (0, Bt.rename)(T, f), 60, 500, 0, 0, (S) => S instanceof Error && /^EBUSY:/.test(S.message));
    } catch (S) {
      throw await A(), S instanceof _e.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), S;
    }
    return _.info(`New version ${o} has been downloaded to ${f}`), await g(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = (0, cw.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${a[0]}", new: ${a[1]})`);
      const s = async (c) => {
        const f = await this.httpExecutor.downloadToBuffer(c, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (f == null || f.length === 0)
          throw new Error(`Blockmap "${c.href}" is empty`);
        try {
          return JSON.parse((0, lw.gunzipSync)(f).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${c.href}", error: ${h}`);
        }
      }, l = {
        newUrl: t.url,
        oldFile: St.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(jt.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (c) => this.emit(jt.DOWNLOAD_PROGRESS, c));
      const m = await Promise.all(a.map((c) => s(c)));
      return await new uw.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(m[0], m[1]), !1;
    } catch (a) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
ut.AppUpdater = Ho;
function fw(e) {
  const t = (0, Ct.prerelease)(e);
  return t != null && t.length > 0;
}
class hu {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
ut.NoOpLogger = hu;
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.BaseUpdater = void 0;
const Hs = Mn, dw = ut;
class hw extends dw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Rt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, o = n == null ? null : n.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (a) {
      return this.dispatchError(a), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, Hs.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: o, status: a, stdout: s, stderr: l } = i;
    if (o != null)
      throw this._logger.error(l), o;
    if (a != null && a !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${a}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((o, a) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, l = (0, Hs.spawn)(t, r, s);
        l.on("error", (m) => {
          a(m);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (s) {
        a(s);
      }
    });
  }
}
Qe.BaseUpdater = hw;
var Pr = {}, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Ht = gt, pw = Yr, mw = ll;
class gw extends pw.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = pu(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await Ew(this.options.oldFile), i);
  }
}
zr.FileWithEmbeddedBlockMapDifferentialDownloader = gw;
function pu(e) {
  return JSON.parse((0, mw.inflateRawSync)(e).toString());
}
async function Ew(e) {
  const t = await (0, Ht.open)(e, "r");
  try {
    const r = (await (0, Ht.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Ht.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Ht.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ht.close)(t), pu(i);
  } catch (r) {
    throw await (0, Ht.close)(t), r;
  }
}
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.AppImageUpdater = void 0;
const qs = de, Gs = Mn, yw = gt, vw = mt, mr = re, ww = Qe, _w = zr, Aw = le, Vs = Et;
class Sw extends ww.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Aw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const a = process.env.APPIMAGE;
        if (a == null)
          throw (0, qs.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, a, i, r, t)) && await this.httpExecutor.download(n.url, i, o), await (0, yw.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, o) {
    try {
      const a = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(Vs.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(Vs.DOWNLOAD_PROGRESS, s)), await new _w.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, a).download(), !1;
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, qs.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, vw.unlinkSync)(r);
    let n;
    const i = mr.basename(r), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    mr.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = mr.join(mr.dirname(r), mr.basename(o)), (0, Gs.execFileSync)("mv", ["-f", o, n]), n !== r && this.emit("appimage-filename-updated", n);
    const a = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], a) : (a.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Gs.execFileSync)(n, [], { env: a })), !0;
  }
}
Pr.AppImageUpdater = Sw;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.DebUpdater = void 0;
const Tw = Qe, Cw = le, Ws = Et;
class bw extends Tw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Cw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Ws.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Ws.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Nr.DebUpdater = bw;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.PacmanUpdater = void 0;
const $w = Qe, Ys = Et, Ow = le;
class Iw extends $w.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Ow.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Ys.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(Ys.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const o = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Dr.PacmanUpdater = Iw;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.RpmUpdater = void 0;
const Rw = Qe, zs = Et, Pw = le;
class Nw extends Rw.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Pw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(zs.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(zs.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(n.url, i, o);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let a;
    return i ? a = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : a = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${a.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Fr.RpmUpdater = Nw;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.MacUpdater = void 0;
const Xs = de, Wi = gt, Dw = mt, Ks = re, Fw = Cf, xw = ut, Lw = le, Js = Mn, Qs = kr;
class Uw extends xw.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Rt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, Js.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let a = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, Js.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), a = a || h;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    a = a || process.arch === "arm64" || o;
    const s = (f) => {
      var h;
      return f.url.pathname.includes("arm64") || ((h = f.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    a && r.some(s) ? r = r.filter((f) => a === s(f)) : r = r.filter((f) => !s(f));
    const l = (0, Lw.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, Xs.newError)(`ZIP file not provided: ${(0, Xs.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const m = t.updateInfoAndProvider.provider, c = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (f, h) => {
        const g = Ks.join(this.downloadedUpdateHelper.cacheDir, c), _ = () => (0, Wi.pathExistsSync)(g) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let y = !0;
        _() && (y = await this.differentialDownloadInstaller(l, t, f, m, c)), y && await this.httpExecutor.download(l.url, f, h);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = Ks.join(this.downloadedUpdateHelper.cacheDir, c);
            await (0, Wi.copyFile)(f.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Wi.stat)(i)).size, a = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, Fw.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      a.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const l = (m) => {
      const c = m.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((m, c) => {
      const f = (0, Qs.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, Qs.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, y) => {
        const A = _.url;
        if (a.info(`${A} requested`), A === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("No authenthication info");
            return;
          }
          const D = _.headers.authorization.split(" ")[1], x = Buffer.from(D, "base64").toString("ascii"), [Q, oe] = x.split(":");
          if (Q !== "autoupdater" || oe !== f) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), a.warn("Invalid authenthication credentials");
            return;
          }
          const W = Buffer.from(`{ "url": "${l(this.server)}${g}" }`);
          y.writeHead(200, { "Content-Type": "application/json", "Content-Length": W.length }), y.end(W);
          return;
        }
        if (!A.startsWith(g)) {
          a.warn(`${A} requested, but not supported`), y.writeHead(404), y.end();
          return;
        }
        a.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let T = !1;
        y.on("finish", () => {
          T || (this.nativeUpdater.removeListener("error", c), m([]));
        });
        const S = (0, Dw.createReadStream)(i);
        S.on("error", (D) => {
          try {
            y.end();
          } catch (x) {
            a.warn(`cannot end response: ${x}`);
          }
          T = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${D}`));
        }), y.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), S.pipe(y);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : m([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
xr.MacUpdater = Uw;
var Lr = {}, qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
qo.verifySignature = Mw;
const Zs = de, mu = Mn, kw = Bn, el = re;
function Mw(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, mu.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var m;
      try {
        if (a != null || l) {
          Yi(r, a, l, i), n(null);
          return;
        }
        const c = Bw(s);
        if (c.Status === 0) {
          try {
            const _ = el.normalize(c.Path), y = el.normalize(t);
            if (r.info(`LiteralPath: ${_}. Update Path: ${y}`), _ !== y) {
              Yi(r, new Error(`LiteralPath of ${_} is different than ${y}`), l, i), n(null);
              return;
            }
          } catch (_) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = _.message) !== null && m !== void 0 ? m : _.stack}`);
          }
          const h = (0, Zs.parseDn)(c.SignerCertificate.Subject);
          let g = !1;
          for (const _ of e) {
            const y = (0, Zs.parseDn)(_);
            if (y.size ? g = Array.from(y.keys()).every((T) => y.get(T) === h.get(T)) : _ === h.get("CN") && (r.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (h, g) => h === "RawData" ? void 0 : g, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (c) {
        Yi(r, c, null, i), n(null);
        return;
      }
    });
  });
}
function Bw(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Yi(e, t, r, n) {
  if (jw()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, mu.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function jw() {
  const e = kw.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.NsisUpdater = void 0;
const _n = de, tl = re, Hw = Qe, qw = zr, rl = Et, Gw = le, Vw = gt, Ww = qo, nl = tr;
class Yw extends Hw.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, Ww.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, Gw.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, o, a, s) => {
        const l = n.packageInfo, m = l != null && a != null;
        if (m && t.disableWebInstaller)
          throw (0, _n.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, _n.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await s(), (0, _n.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, l, a, r))
          try {
            await this.httpExecutor.download(new nl.URL(l.path), a, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (f) {
            try {
              await (0, Vw.unlink)(a);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(tl.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((a) => this.dispatchError(a));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(r, n).catch((a) => {
      const s = a.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${a.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? o() : s === "ENOENT" ? Rt.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(a);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new nl.URL(r.path),
        oldFile: tl.join(this.downloadedUpdateHelper.cacheDir, _n.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(rl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(rl.DOWNLOAD_PROGRESS, a)), await new qw.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Lr.NsisUpdater = Yw;
(function(e) {
  var t = Ae && Ae.__createBinding || (Object.create ? function(A, T, S, D) {
    D === void 0 && (D = S);
    var x = Object.getOwnPropertyDescriptor(T, S);
    (!x || ("get" in x ? !T.__esModule : x.writable || x.configurable)) && (x = { enumerable: !0, get: function() {
      return T[S];
    } }), Object.defineProperty(A, D, x);
  } : function(A, T, S, D) {
    D === void 0 && (D = S), A[D] = T[S];
  }), r = Ae && Ae.__exportStar || function(A, T) {
    for (var S in A) S !== "default" && !Object.prototype.hasOwnProperty.call(T, S) && t(T, A, S);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = gt, i = re;
  var o = Qe;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var a = ut;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return a.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return a.NoOpLogger;
  } });
  var s = le;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var l = Pr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var m = Nr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var c = Dr;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var f = Fr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = xr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var g = Lr;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), r(Et, e);
  let _;
  function y() {
    if (process.platform === "win32")
      _ = new Lr.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new xr.MacUpdater();
    else {
      _ = new Pr.AppImageUpdater();
      try {
        const A = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(A))
          return _;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const T = (0, n.readFileSync)(A).toString().trim();
        switch (console.info("Found package-type:", T), T) {
          case "deb":
            _ = new Nr.DebUpdater();
            break;
          case "rpm":
            _ = new Fr.RpmUpdater();
            break;
          case "pacman":
            _ = new Dr.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (A) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", A.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || y()
  });
})(jn);
const gu = lt.dirname(Af(import.meta.url));
process.env.APP_ROOT = lt.join(gu, "..");
const uo = process.env.VITE_DEV_SERVER_URL, d_ = lt.join(process.env.APP_ROOT, "dist-electron"), Eu = lt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = uo ? lt.join(process.env.APP_ROOT, "public") : Eu;
let Ie;
function yu() {
  Ie = new il({
    icon: lt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: lt.join(gu, "preload.mjs")
    }
  }), Ie.webContents.on("did-finish-load", () => {
    Ie == null || Ie.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), uo ? Ie.loadURL(uo) : Ie.loadFile(lt.join(Eu, "index.html")), jn.autoUpdater.checkForUpdatesAndNotify();
}
jn.autoUpdater.on("update-available", () => {
  Ie == null || Ie.webContents.send("update_available");
});
jn.autoUpdater.on("update-downloaded", () => {
  Ie == null || Ie.webContents.send("update_downloaded");
});
bn.on("window-all-closed", () => {
  process.platform !== "darwin" && (bn.quit(), Ie = null);
});
bn.on("activate", () => {
  il.getAllWindows().length === 0 && yu();
});
bn.whenReady().then(yu);
export {
  d_ as MAIN_DIST,
  Eu as RENDERER_DIST,
  uo as VITE_DEV_SERVER_URL
};
