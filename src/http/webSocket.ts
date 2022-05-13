import SockJS from "sockjs-client";
import {Client, over} from "stompjs";

export let stompClient: Client = null;

export function connectStompClient(authToken: string) {
    const sockJS = new SockJS('http://localhost:8081/api/ws');
    stompClient = over(sockJS);

    stompClient.connect({'auth_token': authToken},
        () => console.log('WEB SOCKET CONNECTED'),
        () => console.log('WEB SOCKET ERROR')
    );
}