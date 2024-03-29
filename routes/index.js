const express = require("express");
const router = express.Router();
const passport = require("passport");

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

router.post(
  "/api/v1/login",
  passport.authenticate("local"),
  login_controller.login_user
);
router.post("/api/v1/token", token_controller.refresh_token);
router.post("/api/v1/signup", register_controller.signup_user);
router.post("/api/v1/logout", logout_controller.log_out);

// #region Campaign URIs
router.get(
  "/api/v1/campaigns/:user_id",
  verifyToken,
  campaign_controller.campaign_list
);
router.get(
  "/api/v1/campaigns/:id",
  verifyToken,
  campaign_controller.campaign_detail_get
);
router.post(
  "/api/v1/campaigns/:user_id/create",
  verifyToken,
  campaign_controller.campaign_create_post
);
router.post(
  "/api/v1/:campaignId/update",
  verifyToken,
  campaign_controller.campaign_update_post
);
router.post(
  "/api/v1/:campaignId/delete",
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
  "/api/v1/:campaignId/characters/:id",
  verifyToken,
  character_controller.character_detail_get
);
router.post(
  "/api/v1/:campaignId/characters/create",
  verifyToken,
  character_controller.character_create_post
);
router.post(
  "/api/v1/:campaignId/characters/:id/update",
  verifyToken,
  character_controller.character_update_post
);
router.post(
  "/api/v1/:campaignId/characaters/:id/delete",
  verifyToken,
  character_controller.character_delete_post
);
// #endregion

// #region Item URIs
router.get("/api/v1/:campaignId/items", verifyToken, item_controller.item_list);
router.get(
  "/api/v1/:campaignId/items/:id",
  verifyToken,
  item_controller.item_detail_get
);
router.post(
  "/api/v1/:campaignId/items/create",
  verifyToken,
  item_controller.item_create_post
);
router.post(
  "/api/v1/:campaignId/items/:id/update",
  verifyToken,
  item_controller.item_update_post
);
router.post(
  "/api/v1/:campaignId/items/:id/delete",
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
  "/api/v1/:campaignId/locations/:id",
  verifyToken,
  location_controller.location_detail_get
);
router.post(
  "/api/v1/:campaignId/locations/create",
  verifyToken,
  location_controller.location_create_post
);
router.post(
  "/api/v1/:campaignId/locations/:id/update",
  verifyToken,
  location_controller.location_update_post
);
router.post(
  "/api/v1/:campaignId/locations/:id/delete",
  verifyToken,
  location_controller.location_delete_post
);
// #endregion

// #region Note URIs
router.get("/api/v1/:campaignId/notes", verifyToken, note_controller.note_list);
router.get(
  "/api/v1/:campaignId/notes/:id",
  verifyToken,
  note_controller.note_detail_get
);
router.post(
  "/api/v1/:campaignId/notes/create",
  verifyToken,
  note_controller.note_create_post
);
router.post(
  "/api/v1/:campaignId/notes/:id/update",
  verifyToken,
  note_controller.note_update_post
);
router.post(
  "/api/v1/:campaignId/notes/:id/delete",
  verifyToken,
  note_controller.note_delete_post
);
// #endregion

module.exports = router;
