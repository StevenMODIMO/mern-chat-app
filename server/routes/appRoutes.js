const router = require("express").Router();
const {
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
} = require("../controllers/appControllers");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/profile", getUserInfo);
router.post("/profile/update", editUserInfo);
router.delete("/profile/delete", deleteAccount);
router.get("/chat", getUserRooms);
router.post("/chat/create", createRoom);
router.delete("/chat/delete/:id", deleteRoom)
router.post("/chat/share", shareRoom)
router.post("/chat/join", joinRoom)
router.get("/chat/rooms", joinedRooms)
router.delete("/chat/delete/join/:id", leaveRoom)
router.get("/chat/:room", fetchRoomChats)
module.exports = router;
