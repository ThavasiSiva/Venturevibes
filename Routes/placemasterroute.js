const Router = require("express")

const router =Router()

const { placemasterget,placemasterinsert,placemasterupdate,placemasterdelete ,placeuploadimage,placemastergetbyid}=require("../Controllers/placemastercontroller")




router.get("/placemasterget",placemasterget);
router.post("/placemasterinsert",placemasterinsert);
router.post("/placemasterupdate/:id",placemasterupdate);
router.post("/placemasterdelete/:id",placemasterdelete);
router.post("/placeuploadimage",placeuploadimage);
router.get("/placemastergetbyid/:id",placemastergetbyid);
module.exports = router;
