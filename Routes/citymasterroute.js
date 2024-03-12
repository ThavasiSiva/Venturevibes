const Router = require("express")

const router =Router()

const { citymasterget,citymasterinsert,citymasterupdate,citymasterdelete ,cityuploadimage,citymastergetbyid}=require("../Controllers/citymastercontroller")




router.get("/citymasterget",citymasterget);
router.post("/citymasterinsert",citymasterinsert);
router.post("/citymasterupdate/:id",citymasterupdate);
router.post("/citymasterdelete/:id",citymasterdelete);
router.post("/cityuploadimage",cityuploadimage);
router.get("/citymastergetbyid/:id",citymastergetbyid);
module.exports = router;
