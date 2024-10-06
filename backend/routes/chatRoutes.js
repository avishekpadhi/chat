const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const protect = require("../middleware/auth");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(createGroupChat);
router.route("/rename").put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);

module.exports = router;
