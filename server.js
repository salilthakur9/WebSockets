import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(message, sender) {
    wss.clients.forEach((client) => {
        if (client.readyState === 1 && client !== sender) {
            client.send(message);
        }
    });
}

wss.on("connection", (ws) => {
    console.log("😞 connected");

    ws.on("message", (msg) => {
        const data = msg.toString();
        if (data.startsWith("typing")) {
            broadcast("Someone is typing...😒", ws);
        } else {
            broadcast(`${data}`, ws);
        }
    });

    ws.on("close", () => {
        console.log("User is Disconnected 😉");
    });
});

server.listen(3000, () => {
    console.log("running at 3k 😭");
});