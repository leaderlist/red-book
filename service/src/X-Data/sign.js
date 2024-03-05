import { MD5 } from './MD5';
import { __webpack_require__ } from './webpack';

export function sign(window, params) {
  var r = 'A4NjFqYu5wPHsO0XTdDgMa2r1ZQocVte9UJBvk6/7=yRnhISGKblCWi+LpfE8xzm3',
    n = 'iamspam',
    o = new Date().getTime(),
    i = 'undefined' == typeof window ? __webpack_require__.g : window;
  void 0 !== i && i && i.navigator && i.navigator.userAgent && i.alert && (n = 'test');
  var a =
    '[object Object]' === Object.prototype.toString.call(params) ||
    '[object Array]' === Object.prototype.toString.call(params);
  return {
    'X-s': (function (t) {
      var e,
        n,
        o,
        i,
        a,
        u,
        c,
        s = '',
        l = 0;
      for (
        t = (function (t) {
          t = t.replace(/\r\n/g, '\n');
          for (var e = '', r = 0; r < t.length; r++) {
            var n = t.charCodeAt(r);
            n < 128
              ? (e += String.fromCharCode(n))
              : n > 127 && n < 2048
              ? ((e += String.fromCharCode((n >> 6) | 192)), (e += String.fromCharCode((63 & n) | 128)))
              : ((e += String.fromCharCode((n >> 12) | 224)),
                (e += String.fromCharCode(((n >> 6) & 63) | 128)),
                (e += String.fromCharCode((63 & n) | 128)));
          }
          return e;
        })(t);
        l < t.length;

      )
        (i = (e = t.charCodeAt(l++)) >> 2),
          (a = ((3 & e) << 4) | ((n = t.charCodeAt(l++)) >> 4)),
          (u = ((15 & n) << 2) | ((o = t.charCodeAt(l++)) >> 6)),
          (c = 63 & o),
          isNaN(n) ? (u = c = 64) : isNaN(o) && (c = 64),
          (s = s + r.charAt(i) + r.charAt(a) + r.charAt(u) + r.charAt(c));
      return s;
    })(MD5([o, n, window, a ? JSON.stringify(params) : ''].join(''))),
    'X-t': o,
  };
}
