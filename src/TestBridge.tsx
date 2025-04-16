import { bridge } from "@webview-bridge/react-native";

export const appBridge = bridge({
    async getMessage() {
      return "Hello, I'm native";
    },
    async sum(a: number, b: number) {
      return a + b;
    },
    async openInAppBrowser(url: string) {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url);
      }
    },
    // ... Add more functions as needed
  });

export type AppBridge = typeof appBridge;
