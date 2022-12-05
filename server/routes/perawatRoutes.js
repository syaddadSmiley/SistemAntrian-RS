const{
    getLastCalledAntrian,
    getNextAntrian,
    updateCurrAntrian,
} = require("../controllers/perawatController");

const router = require("express").Router();

//ROUTER PERAWAT
router.get("/getLastCalledAntrian", getLastCalledAntrian);
router.post("/getNextAntrian", getNextAntrian);
router.post("/updateCurrAntrian", updateCurrAntrian);

module.exports = router;