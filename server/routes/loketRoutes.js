const{
    getLoket,
} = require("../controllers/loketController");

const router = require("express").Router();

router.get("/getLoket", getLoket);

module.exports = router;