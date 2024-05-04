const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const campaign_controller = require("../controllers/campaignController");
const character_controller = require("../controllers/characterController");
const item_controller = require("../controllers/itemController");
const location_controller = require("../controllers/locationController");
const note_controller = require("../controllers/noteController");
const login_controller = require("../controllers/loginController");
const logout_controller = require("../controllers/logoutController");
const register_controller = require("../controllers/registerController");
const token_controller = require("../controllers/tokenRefreshController");

const { verifyToken } = require("../verifyToken");

cloudinary.config({
  secure: true,
});

router.post("/api/v1/login", login_controller.login_user);
router.post("/api/v1/token", token_controller.refresh_token);
router.post("/api/v1/signup", register_controller.signup_user);
router.post("/api/v1/logout", logout_controller.log_out);

// #region Campaign URIs
router.get(
  "/api/v1/:user_id/campaigns",
  verifyToken,
  campaign_controller.campaign_list
);
router.get(
  "/api/v1/campaign/:id",
  verifyToken,
  campaign_controller.campaign_detail_get
);
router.post(
  "/api/v1/:user_id/campaign/create",
  verifyToken,
  campaign_controller.campaign_create_post
);
router.post(
  "/api/v1/campaign/:campaignId/update",
  verifyToken,
  campaign_controller.campaign_update_post
);
router.post(
  "/api/v1/campaign/:campaignId/delete",
  verifyToken,
  campaign_controller.campaign_delete_post
);
// #endregion

// #region Character URIs
router.get(
  "/api/v1/:campaignId/characters",
  verifyToken,
  character_controller.character_list
);
router.get(
  "/api/v1/character/:id",
  verifyToken,
  character_controller.character_detail_get
);
router.post(
  "/api/v1/:campaignId/character/create",
  verifyToken,
  character_controller.character_create_post
);
router.post(
  "/api/v1/character/:id/update",
  verifyToken,
  character_controller.character_update_post
);
router.post(
  "/api/v1/character/:id/delete",
  verifyToken,
  character_controller.character_delete_post
);
// #endregion

// #region Item URIs
router.get(
  "/api/v1/:campaignId/objects",
  verifyToken,
  item_controller.item_list
);
router.get("/api/v1/object/:id", verifyToken, item_controller.item_detail_get);
router.post(
  "/api/v1/:campaignId/object/create",
  verifyToken,
  item_controller.item_create_post
);
router.post(
  "/api/v1/object/:id/update",
  verifyToken,
  item_controller.item_update_post
);
router.post(
  "/api/v1/object/:id/delete",
  verifyToken,
  item_controller.item_delete_post
);
// #endregion

// #region Location URIs
router.get(
  "/api/v1/:campaignId/locations",
  verifyToken,
  location_controller.location_list
);
router.get(
  "/api/v1/location/:id",
  verifyToken,
  location_controller.location_detail_get
);
router.post(
  "/api/v1/:campaignId/location/create",
  verifyToken,
  location_controller.location_create_post
);
router.post(
  "/api/v1/location/:id/update",
  verifyToken,
  location_controller.location_update_post
);
router.post(
  "/api/v1/location/:id/delete",
  verifyToken,
  location_controller.location_delete_post
);
// #endregion

// #region Note URIs
router.get("/api/v1/:campaignId/notes", verifyToken, note_controller.note_list);
router.get("/api/v1/note/:id", verifyToken, note_controller.note_detail_get);
router.post(
  "/api/v1/:campaignId/note/create",
  verifyToken,
  note_controller.note_create_post
);
router.post(
  "/api/v1/note/:id/update",
  verifyToken,
  note_controller.note_update_post
);
router.post(
  "/api/v1/note/:id/delete",
  verifyToken,
  note_controller.note_delete_post
);
// #endregion

module.exports = router;
