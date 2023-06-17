const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    users: [
      {
        name: String,
        userid: String,
      },
    ],
    chats: [
      {
        sender: String,
        message: String,
        time: String
      }
    ]
  },
  { timestamps: true }
);

chatSchema.statics.createRoom = async function createRoom(userid, roomName) {
  if (!roomName) {
    throw Error("Field must be filled");
  }

  const exists = await this.findOne({ roomName });

  if (exists) {
    throw Error("Room is taken");
  }

  const newRoom = await this.create({ admin: userid, roomName: roomName });
  return newRoom;
};
module.exports = mongoose.model("Chat", chatSchema);
