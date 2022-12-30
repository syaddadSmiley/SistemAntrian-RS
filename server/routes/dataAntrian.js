const{
    getLastCalledAntrian,
    getLastAntrian,
    addAntrian,
    getCetakAntrian,
} = require("../controllers/dataController");

const router = require("express").Router();

router.get("/getLastCalledAntrian", getLastCalledAntrian);
router.get("/getLastAntrian", getLastAntrian);
router.post("/addAntrian", addAntrian);
router.get("/cetak_antrian/:id", getCetakAntrian);


module.exports = router;