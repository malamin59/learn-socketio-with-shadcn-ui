import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "https://chat-rho-amber.vercel.app",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message", data);
    io.emit("receiverMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>console.log(`socket server running port in ${PORT}`))
