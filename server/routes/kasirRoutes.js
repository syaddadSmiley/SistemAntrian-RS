const {
    getLastCalledAntrian,
    getNextAntrian,
    updateCurrAntrian,
} = require("../controllers/kasirController");

const router = require("express").Router();

router.get("/getLastCalledAntrian", getLastCalledAntrian);
router.post("/getNextAntrian", getNextAntrian);
router.post("/updateCurrAntrian", updateCurrAntrian);

module.exports = router;