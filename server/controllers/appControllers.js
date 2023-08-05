require("dotenv").config();
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const getUserInfo = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editUserInfo = async (req, res) => {
  const { email, username } = req.body;
  const user_id = req.user._id;
  try {
    const update = await User.edit(email, username, user_id);
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const user_id = req.user.id;
  try {
    const deletedAccount = await User.findByIdAndDelete(user_id);
    res.status(200).json("Deleted Account");
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserRooms = async (req, res) => {
  const userid = req.user._id;
  try {
    const userRooms = await Chat.find({ admin: userid }).sort({
      createdAt: -1,
    });
    res.status(200).json(userRooms);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createRoom = async (req, res) => {
  const userid = req.user._id;
  const { roomName } = req.body;
  try {
    const newRoom = await Chat.createRoom(userid, roomName);
    res.status(200).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_blog = await Chat.findByIdAndDelete(id);
    res.status(200).json(deleted_blog);
  } catch (error) {
    res.status(400).json(error);
  }
};

const shareRoom = async (req, res) => {
  const { receiverEmail, RoomID } = req.body;

  if (!receiverEmail || !RoomID) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const message = {
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: "Your Friend is Inviting you join in a Chat",
      text: `Use this ID to join on the chat: ===>>>  ${RoomID} via the link https://chat-app-3fog.onrender.com`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        throw Error(err);
      } else {
        res.status(200).json("Successfully");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const { name } = req.body;
  const userid = req.user._id;
  if (!roomId) {
    return res.status(400).json({ error: "Field must be filled" });
  }

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(404).json({ error: "Invalid Id" });
  }

  const room = await Chat.findById(roomId);
  if (!room) {
    return res.status(400).json({ error: "Room doesn't exists" });
  }
  if (room.admin == req.user._id) {
    return res.status(400).json({ error: "You created this room" });
  }
  const exists = room.users.some((user) => user.userid == req.user._id);
  if (exists) {
    return res.status(400).json({ error: "Already joined this room" });
  }

  try {
    const newUser = await Chat.findByIdAndUpdate(roomId, {
      $push: { users: { name: name, userid: userid } },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const joinedRooms = async (req, res) => {
  const userid = req.user._id;
  const userRooms = [];
  try {
    const rooms = await Chat.find();
    rooms.map((room) => {
      room.users.map((rm) => {
        if (rm.userid == userid) {
          userRooms.push(room);
        }
      });
    });
    return res.status(200).json(userRooms);
  } catch (error) {
    res.status(400).json(error);
  }
};

const leaveRoom = async (req, res) => {
  const userid = req.user._id;
  const { id } = req.params;
  try {
    const newUser = await Chat.findByIdAndUpdate(id, {
      $pull: { users: { userid: userid } },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const fetchRoomChats = async (req, res) => {
  const { room } = req.params;
  try {
    const roomChats = await Chat.findOne({ roomName: room });
    res.status(200).json(roomChats.chats);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getUserInfo,
  editUserInfo,
  deleteAccount,
  getUserRooms,
  createRoom,
  deleteRoom,
  shareRoom,
  joinRoom,
  joinedRooms,
  leaveRoom,
  fetchRoomChats,
};
