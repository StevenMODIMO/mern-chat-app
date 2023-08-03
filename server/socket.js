const { Server } = require("socket.io");
const Chat = require("./models/chatModel");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "https://chat-app-3fog.onrender.com",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join-room", (data) => {
      socket.join(data);
      const room = io.sockets.adapter.rooms;
      socket.emit("room-joined", { room: data });
    });

    socket.on("message", async (data) => {
      io.to(data.room).emit("received", data);
      await Chat.findOneAndUpdate(
        { roomName: data.room },
        {
          $push: {
            chats: {
              sender: data.sender,
              message: data.message,
              time: data.time,
            },
          },
        }
      );
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};
