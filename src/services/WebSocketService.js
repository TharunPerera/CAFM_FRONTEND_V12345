// import SockJS from "sockjs-client";
// import Stomp from "webstomp-client";

// let stompClient = null;

// export const connectWebSocket = () => {
//   const socket = new SockJS("http://localhost:9099/ws");
//   stompClient = Stomp.over(socket);
//   stompClient.connect(
//     {},
//     (frame) => {
//       console.log("WebSocket connected: " + frame);
//     },
//     (error) => {
//       console.error("WebSocket error: ", error);
//     }
//   );
//   return stompClient;
// };

// export const subscribeToDashboard = (contractId, onMessageReceived) => {
//   if (stompClient && stompClient.connected) {
//     stompClient.subscribe(`/topic/dashboard/${contractId}`, (message) => {
//       if (message.body) {
//         onMessageReceived(JSON.parse(message.body));
//       }
//     });
//   } else {
//     // Retry connection if not connected
//     setTimeout(() => {
//       connectWebSocket();
//       if (stompClient && stompClient.connected) {
//         stompClient.subscribe(`/topic/dashboard/${contractId}`, (message) => {
//           if (message.body) {
//             onMessageReceived(JSON.parse(message.body));
//           }
//         });
//       }
//     }, 1000);
//   }
// };

// export const disconnectWebSocket = () => {
//   if (stompClient && stompClient.connected) {
//     stompClient.disconnect();
//     console.log("WebSocket disconnected");
//   }
// };

// import SockJS from "sockjs-client";
// import Stomp from "webstomp-client";

// let stompClient = null;
// let retryCount = 0;
// const maxRetries = 3;

// export const connectWebSocket = () => {
//   try {
//     const token = localStorage.getItem("token");
//     // Append JWT token as a query parameter
//     const socket = new SockJS(`http://localhost:9099/ws?access_token=${token}`);
//     stompClient = Stomp.over(socket);
//     stompClient.connect(
//       {}, // Headers can be empty since token is in query param
//       (frame) => {
//         console.log("WebSocket connected: " + frame);
//         retryCount = 0; // Reset retry count on successful connection
//       },
//       (error) => {
//         console.error("WebSocket error: ", error);
//         if (retryCount < maxRetries) {
//           retryCount++;
//           console.log(
//             `Retrying WebSocket connection (${retryCount}/${maxRetries})...`
//           );
//           setTimeout(connectWebSocket, 1000); // Retry after 1 second
//         } else {
//           console.error("Max WebSocket retries reached. Giving up.");
//         }
//       }
//     );
//     return stompClient;
//   } catch (error) {
//     console.error("Failed to initialize WebSocket:", error);
//     return null;
//   }
// // };
// export const connectWebSocket = () => {
//   try {
//     const token = localStorage.getItem("token");
//     const socket = new SockJS(`http://localhost:9099/ws?access_token=${token}`);
//     stompClient = Stomp.over(socket);
//     stompClient.connect(
//       {
//         "accept-version": "1.2,1.1,1.0", // Add supported STOMP versions
//         "heart-beat": "10000,10000",
//       },
//       (frame) => {
//         console.log("WebSocket connected: " + frame);
//         retryCount = 0;
//       },
//       (error) => {
//         console.error("WebSocket error: ", error);
//         if (retryCount < maxRetries) {
//           retryCount++;
//           console.log(
//             `Retrying WebSocket connection (${retryCount}/${maxRetries})...`
//           );
//           setTimeout(connectWebSocket, 1000);
//         } else {
//           console.error("Max WebSocket retries reached. Giving up.");
//         }
//       }
//     );
//     return stompClient;
//   } catch (error) {
//     console.error("Failed to initialize WebSocket:", error);
//     return null;
//   }
// };
// export const subscribeToDashboard = (contractId, onMessageReceived) => {
//   if (stompClient && stompClient.connected) {
//     stompClient.subscribe(`/topic/dashboard/${contractId}`, (message) => {
//       if (message.body) {
//         try {
//           onMessageReceived(JSON.parse(message.body));
//         } catch (error) {
//           console.error("Failed to parse WebSocket message:", error);
//         }
//       }
//     });
//   } else {
//     // Retry connection if not connected
//     if (retryCount < maxRetries) {
//       retryCount++;
//       console.log(
//         `Retrying WebSocket subscription (${retryCount}/${maxRetries})...`
//       );
//       setTimeout(() => {
//         const client = connectWebSocket();
//         if (client && client.connected) {
//           client.subscribe(`/topic/dashboard/${contractId}`, (message) => {
//             if (message.body) {
//               try {
//                 onMessageReceived(JSON.parse(message.body));
//               } catch (error) {
//                 console.error("Failed to parse WebSocket message:", error);
//               }
//             }
//           });
//         }
//       }, 1000);
//     } else {
//       console.error("Max WebSocket subscription retries reached.");
//     }
//   }
// };

// export const disconnectWebSocket = () => {
//   if (stompClient && stompClient.connected) {
//     try {
//       stompClient.disconnect();
//       console.log("WebSocket disconnected");
//     } catch (error) {
//       console.error("Failed to disconnect WebSocket:", error);
//     }
//   }
//   retryCount = 0; // Reset retry count on disconnect
// };

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
let retryCount = 0;
const maxRetries = 3;

export const connectWebSocket = (onConnectCallback, onErrorCallback) => {
  if (stompClient && stompClient.connected) {
    onConnectCallback(stompClient);
    return stompClient;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found for WebSocket connection");
      onErrorCallback("No token found for WebSocket connection");
      return null;
    }

    const socket = new SockJS(`http://localhost:9099/ws?access_token=${token}`);
    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        "accept-version": "1.2,1.1,1.0",
        "heart-beat": "10000,10000",
      },
      reconnectDelay: 5000, // Increased delay for stability
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    stompClient.onConnect = (frame) => {
      retryCount = 0;
      onConnectCallback(stompClient);
    };

    stompClient.onStompError = (error) => {
      console.error("WebSocket error:", error);
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(
          `Retrying WebSocket connection (${retryCount}/${maxRetries})...`
        );
        setTimeout(() => {
          if (stompClient && !stompClient.connected) {
            stompClient.activate();
          }
        }, 5000);
      } else {
        console.error("Max WebSocket retries reached.");
        onErrorCallback("Failed to establish WebSocket connection");
      }
    };

    stompClient.onWebSocketClose = () => {
      console.log("WebSocket disconnected");
    };

    stompClient.activate();
    return stompClient;
  } catch (error) {
    console.error("Failed to initialize WebSocket:", error);
    onErrorCallback("Failed to initialize WebSocket");
    return null;
  }
};

export const subscribeToDashboard = (
  contractId,
  onMessageReceived,
  onError
) => {
  if (stompClient && stompClient.connected) {
    const subscription = stompClient.subscribe(
      `/topic/dashboard/${contractId}`,
      (message) => {
        if (message.body) {
          try {
            onMessageReceived(JSON.parse(message.body));
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        }
      }
    );
    return subscription;
  } else {
    onError("WebSocket not connected. Subscription failed.");
    return null;
  }
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.active) {
    try {
      stompClient.deactivate();
      stompClient = null;
      retryCount = 0;
    } catch (error) {
      console.error("Failed to disconnect WebSocket:", error);
    }
  }
};
