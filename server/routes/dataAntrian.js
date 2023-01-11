const{
    getLastCalledAntrian,
    getLastAntrian,
    addAntrian,
    getCetakAntrian,
    execCommand,
} = require("../controllers/dataController");

const router = require("express").Router();

router.get("/getLastCalledAntrian", getLastCalledAntrian);
router.get("/getLastAntrian", getLastAntrian);
router.post("/addAntrian", addAntrian);
router.get("/cetak_antrian/:id", getCetakAntrian);
// router.get("/execRestart", execCommand);


module.exports = router;