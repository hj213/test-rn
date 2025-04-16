"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneytreeWebview = exports.confirmPaymentEvent = exports.MoneytreeEvent = exports.MoneytreeMode = exports.MoneytreeEventType = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const ForwardWebview_1 = __importDefault(require("./ForwardWebview"));
const getMoneytreeOrigin = (mode) => {
    return mode === MoneytreeMode.PROD ? 'http://10.20.131.30:3000' : 'http://10.20.131.30:3000';
};
var MoneytreeEventType;
(function (MoneytreeEventType) {
    MoneytreeEventType["PAYMENT"] = "payment";
})(MoneytreeEventType = exports.MoneytreeEventType || (exports.MoneytreeEventType = {}));
var MoneytreeMode;
(function (MoneytreeMode) {
    MoneytreeMode["TEST"] = "test";
    MoneytreeMode["PROD"] = "prod";
})(MoneytreeMode = exports.MoneytreeMode || (exports.MoneytreeMode = {}));
class MoneytreeEvent {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
exports.MoneytreeEvent = MoneytreeEvent;
const confirmPaymentEvent = (orderId) => {
    const ref = (0, react_1.useRef)(null);
    const webview = ref.current;
    // webview?.injectJavaScript(`
    //     window.ReactNativeWebView.confirmPayment(${JSON.stringify(orderId)});
    // `);
};
exports.confirmPaymentEvent = confirmPaymentEvent;
function MoneytreeWebview({ jwtToken, onInit, onEvent, mode, onPressedBackInMain, }) {
    const webviewRef = (0, react_1.useRef)(null);
    const origin = getMoneytreeOrigin(mode);
    (0, react_1.useEffect)(() => {
        if (webviewRef.current) {
            console.log("moneytree webview init");
            onInit();
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const onBackPressed = () => {
            // webviewRef.current?.injectJavaScript(`
            //     window.ReactNativeWebView.replacePathname();
            //     `);
            return true;
        };
        const backHandler = react_native_1.BackHandler.addEventListener('hardwareBackPress', onBackPressed);
        return () => backHandler.remove();
    }, []);
    const handleShouldStartLoadWithRequest = (request) => {
        if (request.url.startsWith(origin)) {
            return true;
        }
        return false;
    };
    const handleMessage = (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            switch (data.event) {
                case 'login':
                    // webviewRef.current?.injectJavaScript(`
                    //       window.ReactNativeWebView.login(${JSON.stringify(jwtToken)}, ${JSON.stringify(SDK_VERSION)});
                    //   `);
                    break;
                case 'payment':
                    const event = new MoneytreeEvent(MoneytreeEventType.PAYMENT, data);
                    onEvent(event);
                    break;
                case 'runOnPressedBackInMain':
                    if (onPressedBackInMain !== null) {
                        onPressedBackInMain();
                    }
                    break;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    // console.log('[webviewRef]', webviewRef.current?.constructor?.name);
    return (<ForwardWebview_1.default source={{ uri: `${origin}/commerce` }} ref={webviewRef} onMessage={handleMessage} onLoadEnd={() => {
            setTimeout(() => {
                var _a;
                if ((_a = webviewRef.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript) {
                    webviewRef.current.injectJavaScript(`
                      alert("webview loaded");
                    `);
                }
                else {
                    console.log('❌ injectJavaScript still not available');
                }
            }, 100); // 100ms 이상 추천
        }} javaScriptEnabled={true} userAgent="moneytree_webview" onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest} style={{ backgroundColor: 'transparent' }}/>);
}
exports.MoneytreeWebview = MoneytreeWebview;
