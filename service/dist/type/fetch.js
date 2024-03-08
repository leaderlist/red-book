"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFilter = exports.RefreshType = exports.Category = exports.CardType = exports.ModelType = exports.SendType = void 0;
var SendType;
(function (SendType) {
    SendType["Login"] = "login";
})(SendType || (exports.SendType = SendType = {}));
var ModelType;
(function (ModelType) {
    ModelType["Note"] = "note";
})(ModelType || (exports.ModelType = ModelType = {}));
var CardType;
(function (CardType) {
    CardType["Video"] = "video";
})(CardType || (exports.CardType = CardType = {}));
var Category;
(function (Category) {
    Category["Recommend"] = "homefeed_recommend";
})(Category || (exports.Category = Category = {}));
var RefreshType;
(function (RefreshType) {
    RefreshType[RefreshType["Change"] = 1] = "Change";
    RefreshType[RefreshType["Drop"] = 3] = "Drop";
})(RefreshType || (exports.RefreshType = RefreshType = {}));
var ImageFilter;
(function (ImageFilter) {
    ImageFilter["Jpg"] = "jpg";
    ImageFilter["Webp"] = "webp";
    ImageFilter["Avif"] = "avif";
})(ImageFilter || (exports.ImageFilter = ImageFilter = {}));
//# sourceMappingURL=fetch.js.map