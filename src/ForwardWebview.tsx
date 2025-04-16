// ForwardWebview.tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { WebView, WebViewProps } from 'react-native-webview';

const ForwardingWebView = forwardRef<any, WebViewProps>((props, ref) => {
  const innerRef = useRef<any>(null);

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

  console.log(innerRef.current?.constructor.name);

  return <WebView ref={(ref) => {
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
  }} {...props} />;
});

export default ForwardingWebView;