/* eslint-disable @typescript-eslint/no-var-requires */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Storage = require('dom-storage');

var dom = new JSDOM('', {
  url: 'https://www.xiaohongshu.com/',
});

const window = dom.window;

const document = window.document;

let localStorage = new Storage('./db.json', { strick: true });
window.localStorage = localStorage;

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
