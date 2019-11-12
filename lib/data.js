"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file 一张图片所包含的数据，程序中以 JS 形式存在，最终导出为 XML
 */
var path_1 = __importDefault(require("path"));
var gm_1 = __importDefault(require("gm"));
/**
 * 获取图片尺寸
 * @param picturePath 图片地址
 */
function getPictureSize(picturePath) {
    return __awaiter(this, void 0, void 0, function () {
        var pictureResolvePath, size, _a, width, height, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pictureResolvePath = path_1.default.resolve(picturePath);
                    size = {
                        width: 0,
                        height: 0,
                        depth: 3
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            gm_1.default(pictureResolvePath).size(function (error, value) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve(value);
                                }
                            });
                        })];
                case 2:
                    _a = _b.sent(), width = _a.width, height = _a.height;
                    size.width = width;
                    size.height = height;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log("get picture data error: " + error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, size];
            }
        });
    });
}
/**
 * 获取图片的数据
 */
function getPictureData(picturePath, componentName) {
    return __awaiter(this, void 0, void 0, function () {
        var resolvePath, pathObject, base, 
        // 目录的绝对路径
        dir, folder, size, width, height, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resolvePath = path_1.default.resolve(picturePath);
                    pathObject = path_1.default.parse(resolvePath);
                    base = pathObject.base, dir = pathObject.dir;
                    folder = path_1.default.basename(dir);
                    return [4 /*yield*/, getPictureSize(resolvePath)];
                case 1:
                    size = _a.sent();
                    width = size.width, height = size.height;
                    data = {
                        folder: folder,
                        filename: base,
                        path: resolvePath,
                        source: {
                            database: 'Unknown'
                        },
                        size: size,
                        segmented: 0,
                        object: {
                            name: componentName,
                            pose: 'Unspecified',
                            truncated: 0,
                            difficult: 0,
                            bndbox: {
                                // 框框的尺寸好像不能超过图片的尺寸，所以距离边缘都设为 1
                                xmin: 1,
                                ymin: 1,
                                xmax: width - 1,
                                ymax: height - 1
                            }
                        }
                    };
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getPictureData = getPictureData;
