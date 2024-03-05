function get_payload(lm) {
  let payload = '';
  for (let i = 0; i < lm.length; i++) {
    let code = lm.charCodeAt(i);
    let nums = [code >> 4, code & 15];
    let num;
    for (num of nums) {
      if (num >= 10) {
        payload += String.fromCharCode((num % 10) + 97);
      } else {
        payload += num;
      }
    }
  }
  return payload;
}

function getXYW(payload) {
  let in1 = `{"signSvn":"51","signType":"x1","payload":"${payload}"}`;
  let XYW = 'XYW_';
  let iter = [];
  for (let i = 0; i < in1.length; i = i + 3) {
    let num1 = in1[i].charCodeAt(0);
    let num2 = in1[i + 1] === undefined ? undefined : in1[i + 1].charCodeAt(0);
    let num3 = in1[i + 2] === undefined ? undefined : in1[i + 2].charCodeAt(0);
    iter.push(num1 >> 2);
    num2 && iter.push(((num1 & 3) << 4) | (num2 >> 4));
    num3 && iter.push(((num2 & 15) << 2) | (num3 >> 6));
    num3 && iter.push(num3 & 63);
  }
  for (i of iter) {
    let code =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    XYW += code.charAt(i);
  }
  return {
    'X-s': XYW,
    'X-t': new Date().getTime(),
  };
}

function decode(j) {
  if (!j) {
    return '';
  }
  var n = function (e) {
    var f = [],
      t = e.length;
    var u = 0;
    for (var u = 0; u < t; u++) {
      var w = e.charCodeAt(u);
      if (((w >> 7) & 255) == 0) {
        f.push(e.charAt(u));
      } else {
        if (((w >> 5) & 255) == 6) {
          var b = e.charCodeAt(++u);
          var a = (w & 31) << 6;
          var c = b & 63;
          var v = a | c;
          f.push(String.fromCharCode(v));
        } else {
          if (((w >> 4) & 255) == 14) {
            var b = e.charCodeAt(++u);
            var d = e.charCodeAt(++u);
            var a = (w << 4) | ((b >> 2) & 15);
            var c = ((b & 3) << 6) | (d & 63);
            var v = ((a & 255) << 8) | c;
            f.push(String.fromCharCode(v));
          }
        }
      }
    }
    return f.join('');
  };
  var k =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
      '',
    );
  var p = j.length;
  var l = 0;
  var m = [];
  while (l < p) {
    var s = k.indexOf(j.charAt(l++));
    var r = k.indexOf(j.charAt(l++));
    var q = k.indexOf(j.charAt(l++));
    var o = k.indexOf(j.charAt(l++));
    var i = (s << 2) | (r >> 4);
    var h = ((r & 15) << 4) | (q >> 2);
    var g = ((q & 3) << 6) | o;
    m.push(String.fromCharCode(i));
    if (q != 64) {
      m.push(String.fromCharCode(h));
    }
    if (o != 64) {
      m.push(String.fromCharCode(g));
    }
  }
  return n(m.join(''));
}
