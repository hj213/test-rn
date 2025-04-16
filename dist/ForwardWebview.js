"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// ForwardWebview.tsx
const react_1 = __importStar(require("react"));
const react_native_webview_1 = require("react-native-webview");
const ForwardingWebView = (0, react_1.forwardRef)((props, ref) => {
    var _a;
    const innerRef = (0, react_1.useRef)(null);
    //   useImperativeHandle(ref, () => ({
    //     injectJavaScript: (script: string) =>
    //       innerRef.current?.injectJavaScript(script),
    //     goBack: () => innerRef.current?.goBack(),
    //     goForward: () => innerRef.current?.goForward(),
    //     reload: () => innerRef.current?.reload(),
    //     stopLoading: () => innerRef.current?.stopLoading(),
    //     requestFocus: () => innerRef.current?.requestFocus(),
    //     postMessage: (msg: string) => innerRef.current?.postMessage(msg),
    //   }));
    console.log((_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.constructor.name);
    return <react_native_webview_1.WebView ref={(ref) => {
            // console.log("[ref]", ref);
            // if (ref && ref.injectJavaScript) {
            //     console.log('=========================================start');
            //     console.log(ref);
            //     console.log(typeof ref.injectJavaScript)
            //     // setTimeout(() => {
            //     //     ref.injectJavaScript('alert("test");');
            //     // }, 0);
            //     console.log('=========================================end');
            // //   ref.injectJavaScript('alert("test");');
            // }
            innerRef.current = ref;
        }} {...props}/>;
});
exports.default = ForwardingWebView;
