const { JSDOM } = require('jsdom');
// const { params } = require('./constant');
// const { encrypt_MD5 } = require('./encrypt_MD5');

var dom = new JSDOM('', {
  url: 'https://www.xiaohongshu.com/',
});

window = dom.window;

var document = window.document;

var HTMLCanvasElement = (window.HTMLCanvasElement = function () {
  return {};
});

HTMLCanvasElement.prototype.getContext = function () {
  return {};
};

module.exports = {
  window,
  HTMLCanvasElement,
  document,
};
