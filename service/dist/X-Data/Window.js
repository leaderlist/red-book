const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Storage = require('dom-storage');
const { SDT_SOURCE_KEY, INIT_SDT_SOURCE, RC4_SECRET_VERSION_KEY, MINI_BROSWER_INFO_KEY, INIT_STORAGE_VALUES } = require('../headers/constants');
var dom = new JSDOM('', {
    url: 'https://www.xiaohongshu.com/',
});
const window = dom.window;
const document = window.document;
let localStorage = new Storage('./db.json', { strick: true });
window.localStorage = localStorage;
function initLocalStorage() {
    const miniBroswerInfo = window.localStorage.getItem(MINI_BROSWER_INFO_KEY);
    const rc4SecretVersion = window.localStorage.getItem(RC4_SECRET_VERSION_KEY);
    const sdtSource = window.localStorage.getItem(SDT_SOURCE_KEY);
    if (!miniBroswerInfo || !rc4SecretVersion || !sdtSource) {
        window.localStorage.setItem(MINI_BROSWER_INFO_KEY, INIT_STORAGE_VALUES[0]);
        window.localStorage.setItem(RC4_SECRET_VERSION_KEY, INIT_STORAGE_VALUES[1]);
        window.localStorage.setItem(SDT_SOURCE_KEY, JSON.stringify(INIT_SDT_SOURCE));
    }
}
initLocalStorage();
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
    initLocalStorage,
};
//# sourceMappingURL=Window.js.map