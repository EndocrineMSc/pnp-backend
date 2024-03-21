const express = require("express");
const router = express.Router();

const campaign_controller = require("../controllers/campaignController");
const character_controller = require("../controllers/characterController");
const item_controller = require("../controllers/itemController");
const location_controller = require("../controllers/locationController");
const login_controller = require("../controllers/loginController");
const note_controller = require("../controllers/noteController");

router.get("/api/v1/login", login_controller);

// #region Campaign URIs
router.get("/api/v1/campaigns/:user_id", campaign_controller.campaign_list);
router.get("/api/v1/campaigns/:id", campaign_controller.campaign_detail_get);
router.post(
  "/api/v1/campaigns/:user_id/create",
  campaign_controller.campaign_create_post
);
router.post(
  "/api/v1/:campaignId/update",
  campaign_controller.campaign_update_post
);
router.post(
  "/api/v1/:campaignId/delete",
  campaign_controller.campaign_delete_post
);
// #endregion

// #region Character URIs
router.get(
  "/api/v1/:campaignId/characters",
  character_controller.character_list
);
router.get(
  "/api/v1/:campaignId/characters/:id",
  character_controller.character_detail_get
);
router.post(
  "/api/v1/:campaignId/characters/create",
  character_controller.character_create_post
);
router.post(
  "/api/v1/:campaignId/characters/:id/update",
  character_controller.character_update_post
);
router.post(
  "/api/v1/:campaignId/characaters/:id/delete",
  character_controller.character_delete_post
);
// #endregion

// #region Item URIs
router.get("/api/v1/:campaignId/items", item_controller.item_list);
router.get("/api/v1/:campaignId/items/:id", item_controller.item_detail_get);
router.post(
  "/api/v1/:campaignId/items/create",
  item_controller.item_create_post
);
router.post(
  "/api/v1/:campaignId/items/:id/update",
  item_controller.item_update_post
);
router.post(
  "/api/v1/:campaignId/items/:id/delete",
  item_controller.item_delete_post
);
// #endregion

// #region Location URIs
router.get("/api/v1/:campaignId/locations", location_controller.location_list);
router.get(
  "/api/v1/:campaignId/locations/:id",
  location_controller.location_detail_get
);
router.post(
  "/api/v1/:campaignId/locations/create",
  location_controller.location_create_post
);
router.post(
  "/api/v1/:campaignId/locations/:id/update",
  location_controller.location_update_post
);
router.post(
  "/api/v1/:campaignId/locations/:id/delete",
  location_controller.location_update_delete
);
// #endregion

// #region Note URIs
router.get("/api/v1/:campaignId/notes", note_controller.note_list);
router.get("/api/v1/:campaignId/notes/:id", note_controller.note_detail_get);
router.post(
  "/api/v1/:campaignId/notes/create",
  note_controller.note_create_post
);
router.post(
  "/api/v1/:campaignId/notes/:id/update",
  note_controller.note_update_post
);
router.post(
  "/api/v1/:campaignId/notes/:id/delete",
  note_controller.note_delete_post
);
// #endregion

module.exports = router;
