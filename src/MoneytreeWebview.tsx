import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { SDK_VERSION } from "./version";
import ForwardingWebView from "./ForwardWebview";

const getMoneytreeOrigin = (mode: MoneytreeMode) => {
return mode === MoneytreeMode.PROD ? 'http://192.168.0.42:3000' : 'http://192.168.0.42:3000';
};

export enum MoneytreeEventType {
    PAYMENT = 'payment',
}
  
export enum MoneytreeMode {
    TEST = 'test',
    PROD = 'prod',
}

export class MoneytreeEvent {
    type: MoneytreeEventType;
    data: any;

    constructor(type: MoneytreeEventType, data: any) {
        this.type = type;
        this.data = data;
    }
}

export const confirmPaymentEvent = (orderId: string) => {
    const ref = useRef<WebView>(null);
    const webview = ref.current;
    // webview?.injectJavaScript(`
    //     window.ReactNativeWebView.confirmPayment(${JSON.stringify(orderId)});
    // `);
}


export function MoneytreeWebview({
    jwtToken,
    onInit,
    onEvent,
    mode,
    onPressedBackInMain,
} : {
    jwtToken: string,
    onInit: () => void,
    onEvent: (event: MoneytreeEvent) => void,
    mode: MoneytreeMode,    
    onPressedBackInMain: () => void,
}) {
    const webviewRef = useRef<WebView>(null);
    const origin = getMoneytreeOrigin(mode);

    useEffect(() => {
        if (webviewRef.current) {
            console.log("moneytree webview init");
            onInit();
        }
    }, []);

    useEffect(() => {
        const onBackPressed = () => {
            // webviewRef.current?.injectJavaScript(`
            //     window.ReactNativeWebView.replacePathname();
            //     `);
            return true;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPressed);
        return () => backHandler.remove();
    }, []);

    const handleShouldStartLoadWithRequest = (request: any) => {
        if (request.url.startsWith(origin)) {
            return true;
        }
        return false;
    }

    const handleMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            switch (data.event) {
                case 'login':
                    // webviewRef.current?.injectJavaScript(`
                    //       window.ReactNativeWebView.login(${JSON.stringify(jwtToken)}, ${JSON.stringify(SDK_VERSION)});
                    //   `);
                    break;
                case 'payment':
                    const event = new MoneytreeEvent(
                        MoneytreeEventType.PAYMENT,
                        data,
                    );
                    onEvent(event);
                    break;
                case 'runOnPressedBackInMain':
                    if (onPressedBackInMain !== null) {
                        onPressedBackInMain();
                    }
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }
    // console.log('[webviewRef]', webviewRef.current?.constructor?.name);
    return (
        <WebView 
            source={{uri: `${origin}/commerce`}} 
            ref={webviewRef} 
            onMessage={handleMessage} 
            javaScriptEnabled={true}
            userAgent="moneytree_webview"
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            style={{backgroundColor: 'transparent'}}
            // injectedJavaScript={'window.testMoneytree = "test";'}
        />
    );
}