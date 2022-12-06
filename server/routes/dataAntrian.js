const{
    getLastCalledAntrian,
    getLastAntrian,
    addAntrian,
} = require("../controllers/dataController");

const router = require("express").Router();

router.get("/getLastCalledAntrian", getLastCalledAntrian);
router.get("/getLastAntrian", getLastAntrian);
router.post("/addAntrian", addAntrian);

module.exports = router;