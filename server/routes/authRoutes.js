const router = require("express").Router()
const { validateUser,signupUser, loginUser, editUserInfo, getUserInfo, deleteAccount } = require("../controllers/authControllers")

router.post("/validate", validateUser)
router.post("/signup",signupUser)
router.post("/login", loginUser)


module.exports = router
 