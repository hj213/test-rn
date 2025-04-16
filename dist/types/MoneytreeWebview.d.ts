/// <reference types="react" />
export declare enum MoneytreeEventType {
    PAYMENT = "payment"
}
export declare enum MoneytreeMode {
    TEST = "test",
    PROD = "prod"
}
export declare class MoneytreeEvent {
    type: MoneytreeEventType;
    data: any;
    constructor(type: MoneytreeEventType, data: any);
}
export declare const confirmPaymentEvent: (orderId: string) => void;
export declare function MoneytreeWebview({ jwtToken, onInit, onEvent, mode, onPressedBackInMain, }: {
    jwtToken: string;
    onInit: () => void;
    onEvent: (event: MoneytreeEvent) => void;
    mode: MoneytreeMode;
    onPressedBackInMain: () => void;
}): import("react").JSX.Element;
