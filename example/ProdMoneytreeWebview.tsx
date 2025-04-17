// import { confirmPaymentEvent, MoneytreeEvent, MoneytreeEventType, MoneytreeMode, MoneytreeWebview } from "moneytree-package-test";
import { useEffect } from "react";
import { useState } from "react";
import { MoneytreeWebview, confirmPaymentEvent, MoneytreeEvent, MoneytreeEventType, MoneytreeMode } from "../src/MoneytreeWebview";

const API_URL = "dev-api.moneytree.bz";
const API_KEY = "06b78858-0277-4577-abba-2cd8d7d07c63";

const fetchJwtToken = async () => {
    const response = await fetch(`https://${API_URL}/v1/user/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({
            'uniqueId': 'lumigloo_mason',
            'userId': 'lumigloo_mason',
            'name': 'lumigloo_mason',
            'point': 9999999,
            'phoneNumber': '01052286821'
        }),
    });
    const data = await response.json();
    return data.token;
}

const completeOrder = async (paymentEvent: MoneytreeEvent) => {
    const response = await fetch(`https://${API_URL}/v1/order/complete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify({
            'orderId': paymentEvent.data.data.orderId,
            'usedPoint': paymentEvent.data.data.usedPoint,
            'paidAmount': paymentEvent.data.data.paidAmount,
        }),
    });

    return await response.json();
}

export default function ProdMoneytreeView() {
    const [jwtToken, setJwtToken] = useState<string>("");

    useEffect(() => {
        fetchJwtToken().then(setJwtToken);
    }, []);

    console.log(jwtToken);

    return (
        <MoneytreeWebview
            jwtToken={jwtToken}
            onInit={() => {}}
            onEvent={async (paymentEvent) => {
                if (paymentEvent.type === MoneytreeEventType.PAYMENT) {
                    const orderResult = await completeOrder(paymentEvent);
                    confirmPaymentEvent(orderResult.orderId);
                }
            }}
            mode={MoneytreeMode.PROD}
            onPressedBackInMain={() => {console.log("onPressedBackInMain")}}
        />
    );
}