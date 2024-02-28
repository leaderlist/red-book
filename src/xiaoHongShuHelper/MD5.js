import { modules } from './webpack';

// The module cache
var installedModules = {};

// objects to store loaded and loading chunks
var installedChunks = {
  8: 0,
};

// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
  });

  // Execute the module function
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

  // Flag the module as loaded
  module.l = true;

  // Return the exports of the module
  return module.exports;
}

__webpack_require__.r = function (exports) {
  object.defineProperty(exports, '__esModule', { value: true });
};

// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function (module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module['default'];
        }
      : function getModuleExports() {
          return module;
        };
  __webpack_require__.d(getter, 'a', getter);
  return getter;
};

// define getter function for harmony exports
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, {
      configurable: false,
      enumerable: true,
      get: getter,
    });
  }
};

// Object.prototype.hasOwnProperty.call
__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};

__webpack_require__.e = function requireEnsure(chunkId) {
  // promises 队列，等待多个异步 chunk 都加载完成才执行回调
  var promises = [];

  // JSONP chunk loading for javascript
  var installedChunkData = installedChunks[chunkId];
  // 0 代表已经 installed
  if (installedChunkData !== 0) {
    // 0 means "already installed".

    // a Promise means "currently loading".
    // 目标chunk正在加载，则将 promise push到 promises 数组
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // setup Promise in chunk cache
      // 利用Promise去异步加载目标chunk
      var promise = new Promise(function (resolve, reject) {
        // 设置 installedChunks[chunkId]
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      // i设置chunk加载的三种状态并缓存在 installedChunks 中，防止chunk重复加载
      // nstalledChunks[chunkId]  = [resolve, reject, promise]
      promises.push((installedChunkData[2] = promise));
      // start chunk loading
      // 使用 JSONP
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');

      script.charset = 'utf-8';
      script.timeout = 120;

      if (__webpack_require__.nc) {
        script.setAttribute('nonce', __webpack_require__.nc);
      }
      // 获取目标chunk的地址，__webpack_require__.p 表示设置的publicPath，默认为空串
      script.src = __webpack_require__.p + '' + chunkId + '.bundle.js';
      // 请求超时的时候直接调用方法结束，时间为 120 s
      var timeout = setTimeout(function () {
        onScriptComplete({ type: 'timeout', target: script });
      }, 120000);
      script.onerror = script.onload = onScriptComplete;
      // 设置加载完成或者错误的回调
      function onScriptComplete(event) {
        // avoid mem leaks in IE.
        // 防止 IE 内存泄露
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        // 如果为 0 则表示已加载，主要逻辑看 webpackJsonpCallback 函数
        if (chunk !== 0) {
          if (chunk) {
            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;
            var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      }
      head.appendChild(script);
    }
  }
  return Promise.all(promises);
};

const define_property_default = __webpack_require__.n();

const stringify = __webpack_require__(46254);
export const stringify_default = __webpack_require__.n(stringify);

export const MD5 = (function (t) {
  function e(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = {
      i: n,
      l: !1,
      exports: {},
    });
    return t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
  }
  var r = {};
  return (
    (e.m = t),
    (e.c = r),
    (e.i = function (t) {
      return t;
    }),
    (e.d = function (t, r, n) {
      e.o(t, r) ||
        define_property_default()(t, r, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (e.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(r, 'a', r), r;
    }),
    (e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (e.p = ''),
    e((e.s = 4))
  );
})([
  function (t, e) {
    var r = {
      utf8: {
        stringToBytes: function (t) {
          return r.bin.stringToBytes(unescape(encodeURIComponent(t)));
        },
        bytesToString: function (t) {
          return decodeURIComponent(escape(r.bin.bytesToString(t)));
        },
      },
      bin: {
        stringToBytes: function (t) {
          for (var e = [], r = 0; r < t.length; r++) e.push(255 & t.charCodeAt(r));
          return e;
        },
        bytesToString: function (t) {
          for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));
          return e.join('');
        },
      },
    };
    t.exports = r;
  },
  function (t, e, r) {
    !(function () {
      var e = r(2),
        n = r(0).utf8,
        o = r(3),
        i = r(0).bin,
        a = function t(r, a) {
          r.constructor == String
            ? (r = a && 'binary' === a.encoding ? i.stringToBytes(r) : n.stringToBytes(r))
            : o(r)
            ? (r = slice_default()(Array.prototype).call(r, 0))
            : is_array_default()(r) || (r = r.toString());
          for (
            var u = e.bytesToWords(r),
              c = 8 * r.length,
              s = 1732584193,
              l = -271733879,
              f = -1732584194,
              p = 271733878,
              h = 0;
            h < u.length;
            h++
          )
            u[h] = (16711935 & ((u[h] << 8) | (u[h] >>> 24))) | (4278255360 & ((u[h] << 24) | (u[h] >>> 8)));
          (u[c >>> 5] |= 128 << c % 32), (u[14 + (((c + 64) >>> 9) << 4)] = c);
          var d = t._ff,
            v = t._gg,
            g = t._hh,
            m = t._ii;
          for (h = 0; h < u.length; h += 16) {
            var y = s,
              w = l,
              b = f,
              _ = p;
            (s = d(s, l, f, p, u[h + 0], 7, -680876936)),
              (p = d(p, s, l, f, u[h + 1], 12, -389564586)),
              (f = d(f, p, s, l, u[h + 2], 17, 606105819)),
              (l = d(l, f, p, s, u[h + 3], 22, -1044525330)),
              (s = d(s, l, f, p, u[h + 4], 7, -176418897)),
              (p = d(p, s, l, f, u[h + 5], 12, 1200080426)),
              (f = d(f, p, s, l, u[h + 6], 17, -1473231341)),
              (l = d(l, f, p, s, u[h + 7], 22, -45705983)),
              (s = d(s, l, f, p, u[h + 8], 7, 1770035416)),
              (p = d(p, s, l, f, u[h + 9], 12, -1958414417)),
              (f = d(f, p, s, l, u[h + 10], 17, -42063)),
              (l = d(l, f, p, s, u[h + 11], 22, -1990404162)),
              (s = d(s, l, f, p, u[h + 12], 7, 1804603682)),
              (p = d(p, s, l, f, u[h + 13], 12, -40341101)),
              (f = d(f, p, s, l, u[h + 14], 17, -1502002290)),
              (s = v(s, (l = d(l, f, p, s, u[h + 15], 22, 1236535329)), f, p, u[h + 1], 5, -165796510)),
              (p = v(p, s, l, f, u[h + 6], 9, -1069501632)),
              (f = v(f, p, s, l, u[h + 11], 14, 643717713)),
              (l = v(l, f, p, s, u[h + 0], 20, -373897302)),
              (s = v(s, l, f, p, u[h + 5], 5, -701558691)),
              (p = v(p, s, l, f, u[h + 10], 9, 38016083)),
              (f = v(f, p, s, l, u[h + 15], 14, -660478335)),
              (l = v(l, f, p, s, u[h + 4], 20, -405537848)),
              (s = v(s, l, f, p, u[h + 9], 5, 568446438)),
              (p = v(p, s, l, f, u[h + 14], 9, -1019803690)),
              (f = v(f, p, s, l, u[h + 3], 14, -187363961)),
              (l = v(l, f, p, s, u[h + 8], 20, 1163531501)),
              (s = v(s, l, f, p, u[h + 13], 5, -1444681467)),
              (p = v(p, s, l, f, u[h + 2], 9, -51403784)),
              (f = v(f, p, s, l, u[h + 7], 14, 1735328473)),
              (s = g(s, (l = v(l, f, p, s, u[h + 12], 20, -1926607734)), f, p, u[h + 5], 4, -378558)),
              (p = g(p, s, l, f, u[h + 8], 11, -2022574463)),
              (f = g(f, p, s, l, u[h + 11], 16, 1839030562)),
              (l = g(l, f, p, s, u[h + 14], 23, -35309556)),
              (s = g(s, l, f, p, u[h + 1], 4, -1530992060)),
              (p = g(p, s, l, f, u[h + 4], 11, 1272893353)),
              (f = g(f, p, s, l, u[h + 7], 16, -155497632)),
              (l = g(l, f, p, s, u[h + 10], 23, -1094730640)),
              (s = g(s, l, f, p, u[h + 13], 4, 681279174)),
              (p = g(p, s, l, f, u[h + 0], 11, -358537222)),
              (f = g(f, p, s, l, u[h + 3], 16, -722521979)),
              (l = g(l, f, p, s, u[h + 6], 23, 76029189)),
              (s = g(s, l, f, p, u[h + 9], 4, -640364487)),
              (p = g(p, s, l, f, u[h + 12], 11, -421815835)),
              (f = g(f, p, s, l, u[h + 15], 16, 530742520)),
              (s = m(s, (l = g(l, f, p, s, u[h + 2], 23, -995338651)), f, p, u[h + 0], 6, -198630844)),
              (p = m(p, s, l, f, u[h + 7], 10, 1126891415)),
              (f = m(f, p, s, l, u[h + 14], 15, -1416354905)),
              (l = m(l, f, p, s, u[h + 5], 21, -57434055)),
              (s = m(s, l, f, p, u[h + 12], 6, 1700485571)),
              (p = m(p, s, l, f, u[h + 3], 10, -1894986606)),
              (f = m(f, p, s, l, u[h + 10], 15, -1051523)),
              (l = m(l, f, p, s, u[h + 1], 21, -2054922799)),
              (s = m(s, l, f, p, u[h + 8], 6, 1873313359)),
              (p = m(p, s, l, f, u[h + 15], 10, -30611744)),
              (f = m(f, p, s, l, u[h + 6], 15, -1560198380)),
              (l = m(l, f, p, s, u[h + 13], 21, 1309151649)),
              (s = m(s, l, f, p, u[h + 4], 6, -145523070)),
              (p = m(p, s, l, f, u[h + 11], 10, -1120210379)),
              (f = m(f, p, s, l, u[h + 2], 15, 718787259)),
              (l = m(l, f, p, s, u[h + 9], 21, -343485551)),
              (s = (s + y) >>> 0),
              (l = (l + w) >>> 0),
              (f = (f + b) >>> 0),
              (p = (p + _) >>> 0);
          }
          return e.endian([s, l, f, p]);
        };
      (a._ff = function (t, e, r, n, o, i, a) {
        var u = t + ((e & r) | (~e & n)) + (o >>> 0) + a;
        return ((u << i) | (u >>> (32 - i))) + e;
      }),
        (a._gg = function (t, e, r, n, o, i, a) {
          var u = t + ((e & n) | (r & ~n)) + (o >>> 0) + a;
          return ((u << i) | (u >>> (32 - i))) + e;
        }),
        (a._hh = function (t, e, r, n, o, i, a) {
          var u = t + (e ^ r ^ n) + (o >>> 0) + a;
          return ((u << i) | (u >>> (32 - i))) + e;
        }),
        (a._ii = function (t, e, r, n, o, i, a) {
          var u = t + (r ^ (e | ~n)) + (o >>> 0) + a;
          return ((u << i) | (u >>> (32 - i))) + e;
        }),
        (a._blocksize = 16),
        (a._digestsize = 16),
        (t.exports = function (t, r) {
          if (null == t) throw new Error('Illegal argument ' + t);
          var n = e.wordsToBytes(a(t, r));
          return r && r.asBytes ? n : r && r.asString ? i.bytesToString(n) : e.bytesToHex(n);
        });
    })();
  },
  function (t, e) {
    !(function () {
      var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        r = {
          rotl: function (t, e) {
            return (t << e) | (t >>> (32 - e));
          },
          rotr: function (t, e) {
            return (t << (32 - e)) | (t >>> e);
          },
          endian: function (t) {
            if (t.constructor == Number) return (16711935 & r.rotl(t, 8)) | (4278255360 & r.rotl(t, 24));
            for (var e = 0; e < t.length; e++) t[e] = r.endian(t[e]);
            return t;
          },
          randomBytes: function (t) {
            for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));
            return e;
          },
          bytesToWords: function (t) {
            for (var e = [], r = 0, n = 0; r < t.length; r++, n += 8) e[n >>> 5] |= t[r] << (24 - (n % 32));
            return e;
          },
          wordsToBytes: function (t) {
            for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push((t[r >>> 5] >>> (24 - (r % 32))) & 255);
            return e;
          },
          bytesToHex: function (t) {
            for (var e = [], r = 0; r < t.length; r++)
              e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));
            return e.join('');
          },
          hexToBytes: function (t) {
            for (var e = [], r = 0; r < t.length; r += 2) e.push(parse_int_default()(t.substr(r, 2), 16));
            return e;
          },
          bytesToBase64: function (t) {
            for (var r = [], n = 0; n < t.length; n += 3)
              for (var o = (t[n] << 16) | (t[n + 1] << 8) | t[n + 2], i = 0; i < 4; i++)
                8 * n + 6 * i <= 8 * t.length ? r.push(e.charAt((o >>> (6 * (3 - i))) & 63)) : r.push('=');
            return r.join('');
          },
          base64ToBytes: function (t) {
            t = t.replace(/[^A-Z0-9+\/]/gi, '');
            for (var r = [], n = 0, o = 0; n < t.length; o = ++n % 4)
              0 != o &&
                r.push(
                  ((index_of_default()(e).call(e, t.charAt(n - 1)) & (Math.pow(2, -2 * o + 8) - 1)) << (2 * o)) |
                    (index_of_default()(e).call(e, t.charAt(n)) >>> (6 - 2 * o)),
                );
            return r;
          },
        };
      t.exports = r;
    })();
  },
  function (t, e) {
    function r(t) {
      return !!t.constructor && 'function' == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
    }
    t.exports = function (t) {
      return (
        null != t &&
        (r(t) ||
          (function (t) {
            return (
              'function' == typeof t.readFloatLE &&
              'function' == typeof slice_default()(t) &&
              r(slice_default()(t).call(t, 0, 0))
            );
          })(t) ||
          !!t._isBuffer)
      );
    };
  },
  function (t, e, r) {
    t.exports = r(1);
  },
]);
