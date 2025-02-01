import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8080";
export const socket = io(SOCKET_URL, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("🟢 Connected to WebSocket server", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from WebSocket server");
});

// Listen for friend request confirmation
socket.on("friend-request-sent", (data) => {
  console.log("📩 Friend request successfully sent:", data);
  alert(`✅ ${data.message}`);
});

// Listen for friend request notification
socket.on("friend-request-received", (data) => {
    console.log("🔔 Friend request notification received:", data);
    alert(`📨 ${data.message} from User ID: ${data.senderId}`);
  });
